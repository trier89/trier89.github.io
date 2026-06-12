import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

const $ = (id) => document.getElementById(id);

/* ---------------------------------------------------------------- renderer */
const canvas = $('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const BG_DARK = 0x14171c, BG_LIGHT = 0xdde3ec;
scene.background = new THREE.Color(BG_DARK);

const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 5000);
camera.position.set(15, 12, 15);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4150, 1.1));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
dirLight.position.set(30, 50, 20);
scene.add(dirLight);

const grid = new THREE.GridHelper(100, 100, 0x4a5468, 0x2b313d);
scene.add(grid);
const axes = new THREE.AxesHelper(3);
scene.add(axes);

/* ----------------------------------------------------------------- layers */
// 각 레이어: group(사용자 정렬 변환) > axis(Z-up 보정/단위) > 실제 객체들
function makeLayer(name) {
  const group = new THREE.Group();
  const axis = new THREE.Group();
  group.name = name;
  group.add(axis);
  scene.add(group);
  return { group, axis, files: [] };
}
const layers = {
  model: makeLayer('model'),
  cloud: makeLayer('cloud'),
  video: makeLayer('video'),
};

/* ------------------------------------------------------------ transform UI */
const gizmo = new TransformControls(camera, canvas);
gizmo.addEventListener('dragging-changed', (e) => { controls.enabled = !e.value; });
gizmo.addEventListener('objectChange', syncTransformInputs);
scene.add(gizmo);

let gizmoTarget = null;
$('gizmo-target').addEventListener('change', (e) => {
  const key = e.target.value;
  gizmo.detach();
  gizmoTarget = key ? layers[key].group : null;
  if (gizmoTarget) gizmo.attach(gizmoTarget);
  syncTransformInputs();
});

document.querySelectorAll('button.mode').forEach((btn) => {
  btn.addEventListener('click', () => setGizmoMode(btn.dataset.mode));
});
function setGizmoMode(mode) {
  gizmo.setMode(mode);
  document.querySelectorAll('button.mode').forEach((b) =>
    b.classList.toggle('active', b.dataset.mode === mode));
}
setGizmoMode('translate');

const tIds = ['tx', 'ty', 'tz', 'rx', 'ry', 'rz', 'sc'];
function syncTransformInputs() {
  if (!gizmoTarget) { tIds.forEach((id) => { $(id).value = id === 'sc' ? 1 : 0; }); return; }
  const g = gizmoTarget;
  $('tx').value = g.position.x.toFixed(3);
  $('ty').value = g.position.y.toFixed(3);
  $('tz').value = g.position.z.toFixed(3);
  $('rx').value = THREE.MathUtils.radToDeg(g.rotation.x).toFixed(1);
  $('ry').value = THREE.MathUtils.radToDeg(g.rotation.y).toFixed(1);
  $('rz').value = THREE.MathUtils.radToDeg(g.rotation.z).toFixed(1);
  $('sc').value = g.scale.x.toFixed(4);
}
tIds.forEach((id) => $(id).addEventListener('change', () => {
  if (!gizmoTarget) return;
  const v = (i) => parseFloat($(i).value) || 0;
  gizmoTarget.position.set(v('tx'), v('ty'), v('tz'));
  gizmoTarget.rotation.set(
    THREE.MathUtils.degToRad(v('rx')),
    THREE.MathUtils.degToRad(v('ry')),
    THREE.MathUtils.degToRad(v('rz')));
  const s = Math.max(parseFloat($('sc').value) || 1, 0.0001);
  gizmoTarget.scale.setScalar(s);
}));

/* --------------------------------------------------------- 정렬 저장/복원 */
$('align-save').addEventListener('click', () => {
  const dump = {};
  for (const [k, l] of Object.entries(layers)) {
    dump[k] = {
      position: l.group.position.toArray(),
      rotation: [l.group.rotation.x, l.group.rotation.y, l.group.rotation.z],
      scale: l.group.scale.toArray(),
    };
  }
  dump.videoYaw = parseFloat($('video-yaw').value);
  dump.videoRadius = parseFloat($('video-radius').value);
  downloadBlob(new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' }),
    'alignment.json');
  setStatus('정렬값을 alignment.json 으로 저장했습니다');
});
$('align-load').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const dump = JSON.parse(await file.text());
    for (const [k, l] of Object.entries(layers)) {
      if (!dump[k]) continue;
      l.group.position.fromArray(dump[k].position);
      l.group.rotation.set(...dump[k].rotation);
      l.group.scale.fromArray(dump[k].scale);
    }
    if (dump.videoYaw !== undefined) { $('video-yaw').value = dump.videoYaw; applyVideoYaw(); }
    if (dump.videoRadius !== undefined) { $('video-radius').value = dump.videoRadius; applyVideoRadius(); }
    syncTransformInputs();
    setStatus('정렬값을 불러왔습니다');
  } catch (err) { setStatus('정렬 파일을 읽지 못했습니다: ' + err.message); }
  e.target.value = '';
});

/* ------------------------------------------------------------- 모델 로딩 */
const gltfLoader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
gltfLoader.setDRACOLoader(draco);

async function loadModelFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const url = URL.createObjectURL(file);
  showLoading(`모델 불러오는 중: ${file.name}`);
  try {
    let object;
    if (ext === 'glb' || ext === 'gltf') {
      const gltf = await gltfLoader.loadAsync(url);
      object = gltf.scene;
    } else if (ext === 'fbx') {
      object = await new FBXLoader().loadAsync(url);
    } else if (ext === 'obj') {
      object = await new OBJLoader().loadAsync(url);
    } else {
      throw new Error('지원하지 않는 모델 형식: ' + ext +
        (ext === 'nwd' || ext === 'nwc' || ext === 'nwf'
          ? ' — Navisworks에서 FBX로 내보낸 뒤 불러오세요.' : ''));
    }
    object.traverse((o) => {
      if (o.isMesh && !o.geometry.attributes.normal) o.geometry.computeVertexNormals();
    });
    layers.model.axis.add(object);
    layers.model.files.push(file.name);
    refreshFileList('model');
    applyModelOpacity();
    const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3());
    setStatus(`모델 로드 완료: ${file.name} (크기 ${size.x.toFixed(1)}×${size.y.toFixed(1)}×${size.z.toFixed(1)})`);
    updateStats();
    fitView();
  } catch (err) {
    setStatus('모델 로드 실패: ' + err.message);
  } finally {
    hideLoading();
    URL.revokeObjectURL(url);
  }
}

$('model-unit').addEventListener('change', (e) => {
  layers.model.axis.scale.setScalar(parseFloat(e.target.value));
});
$('model-zup').addEventListener('change', (e) => {
  layers.model.axis.rotation.x = e.target.checked ? -Math.PI / 2 : 0;
});
$('model-visible').addEventListener('change', (e) => { layers.model.group.visible = e.target.checked; });
$('model-opacity').addEventListener('input', applyModelOpacity);
function applyModelOpacity() {
  const op = parseFloat($('model-opacity').value);
  layers.model.axis.traverse((o) => {
    if (!o.isMesh) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach((m) => {
      m.transparent = op < 1;
      m.opacity = op;
      m.depthWrite = op >= 0.55; // 반투명일 때 뒤 레이어가 비치도록
      m.needsUpdate = true;
    });
  });
}
$('clear-model').addEventListener('click', () => clearLayer('model'));

/* ----------------------------------------------------- 포인트클라우드 로딩 */
const MAX_POINTS = 4_000_000;

async function loadCloudFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  showLoading(`포인트클라우드 불러오는 중: ${file.name}`);
  try {
    let object;
    if (ext === 'las' || ext === 'laz') {
      object = parseLAS(await file.arrayBuffer(), file.name);
    } else if (ext === 'ply') {
      const geo = new PLYLoader().parse(await file.arrayBuffer());
      object = geometryToObject(geo);
    } else if (ext === 'pcd') {
      object = new PCDLoader().parse(await file.arrayBuffer());
      object.material = makePointsMaterial(!!object.geometry.attributes.color);
    } else if (ext === 'xyz' || ext === 'pts' || ext === 'txt') {
      object = parseXYZ(await file.text());
    } else {
      throw new Error('지원하지 않는 포인트클라우드 형식: ' + ext);
    }
    centerObject(object);
    layers.cloud.axis.add(object);
    layers.cloud.files.push(file.name);
    refreshFileList('cloud');
    applyCloudStyle();
    const n = object.geometry.attributes.position.count;
    setStatus(`포인트클라우드 로드 완료: ${file.name} (${n.toLocaleString()} 점)`);
    updateStats();
    fitView();
  } catch (err) {
    setStatus('포인트클라우드 로드 실패: ' + err.message);
  } finally {
    hideLoading();
  }
}

function makePointsMaterial(vertexColors) {
  return new THREE.PointsMaterial({
    size: parseFloat($('cloud-size').value),
    vertexColors,
    color: vertexColors ? 0xffffff : 0xffb84d,
    sizeAttenuation: true,
    transparent: true,
    opacity: parseFloat($('cloud-opacity').value),
  });
}

function geometryToObject(geo) {
  if (geo.index && geo.index.count > 0) { // 메시 PLY
    if (!geo.attributes.normal) geo.computeVertexNormals();
    return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      vertexColors: !!geo.attributes.color, color: 0xcccccc, side: THREE.DoubleSide,
    }));
  }
  return new THREE.Points(geo, makePointsMaterial(!!geo.attributes.color));
}

// 원점에서 멀리 떨어진 측량 좌표를 0 근처로 이동(부동소수점 정밀도 확보)
function centerObject(object) {
  const geo = object.geometry;
  geo.computeBoundingBox();
  const c = geo.boundingBox.getCenter(new THREE.Vector3());
  if (c.length() > 100) {
    geo.translate(-c.x, -c.y, -c.z);
    object.userData.worldOffset = c.toArray();
    setStatus(`측량 좌표 원점 이동: (${c.x.toFixed(1)}, ${c.y.toFixed(1)}, ${c.z.toFixed(1)})`);
  }
}

/* LAS 1.2~1.4 바이너리 파서 (포인트 포맷 0~3, 6~8) */
function parseLAS(buf, name) {
  const dv = new DataView(buf);
  const sig = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if (sig !== 'LASF') throw new Error('LAS 시그니처가 없습니다');
  const minor = dv.getUint8(25);
  const offsetToPoints = dv.getUint32(96, true);
  const formatRaw = dv.getUint8(104);
  if (formatRaw & 0x80 || name.toLowerCase().endsWith('.laz')) {
    throw new Error('LAZ(압축)는 미지원입니다. CloudCompare 등에서 LAS로 변환하세요.');
  }
  const format = formatRaw & 0x3f;
  const recLen = dv.getUint16(105, true);
  let count = dv.getUint32(107, true);
  if (count === 0 && minor >= 4) count = Number(dv.getBigUint64(247, true));
  if (!count) throw new Error('포인트 수가 0입니다');

  const sx = dv.getFloat64(131, true), sy = dv.getFloat64(139, true), sz = dv.getFloat64(147, true);
  const ox = dv.getFloat64(155, true), oy = dv.getFloat64(163, true), oz = dv.getFloat64(171, true);
  // 헤더의 min/max 로 중심 계산 (단일 패스 재중심화)
  const maxX = dv.getFloat64(179, true), minX = dv.getFloat64(187, true);
  const maxY = dv.getFloat64(195, true), minY = dv.getFloat64(203, true);
  const maxZ = dv.getFloat64(211, true), minZ = dv.getFloat64(219, true);
  const cx = (maxX + minX) / 2, cy = (maxY + minY) / 2, cz = (maxZ + minZ) / 2;

  const colorOffset = { 2: 20, 3: 28, 5: 28, 7: 30, 8: 30 }[format] ?? -1;
  const stride = Math.max(1, Math.ceil(count / MAX_POINTS));
  const outCount = Math.floor((count - 1) / stride) + 1;

  const positions = new Float32Array(outCount * 3);
  const colors = new Float32Array(outCount * 3);
  let maxColor = 0, maxIntensity = 0;
  let zMin = Infinity, zMax = -Infinity;

  for (let i = 0, j = 0; i < count; i += stride, j++) {
    const p = offsetToPoints + i * recLen;
    if (p + recLen > buf.byteLength) break;
    const x = dv.getInt32(p, true) * sx + ox;
    const y = dv.getInt32(p + 4, true) * sy + oy;
    const z = dv.getInt32(p + 8, true) * sz + oz;
    positions[j * 3] = x - cx;
    positions[j * 3 + 1] = y - cy;
    positions[j * 3 + 2] = z - cz;
    if (z < zMin) zMin = z; if (z > zMax) zMax = z;
    if (colorOffset >= 0) {
      const r = dv.getUint16(p + colorOffset, true);
      const g = dv.getUint16(p + colorOffset + 2, true);
      const b = dv.getUint16(p + colorOffset + 4, true);
      colors[j * 3] = r; colors[j * 3 + 1] = g; colors[j * 3 + 2] = b;
      maxColor = Math.max(maxColor, r, g, b);
    } else {
      const inten = dv.getUint16(p + 12, true);
      colors[j * 3] = inten;
      maxIntensity = Math.max(maxIntensity, inten);
    }
  }

  if (colorOffset >= 0 && maxColor > 0) {
    const div = maxColor > 255 ? 65535 : 255;
    for (let k = 0; k < colors.length; k++) colors[k] /= div;
  } else if (maxIntensity > 0) {
    for (let j = 0; j < outCount; j++) {
      const v = 0.15 + 0.85 * (colors[j * 3] / maxIntensity);
      colors[j * 3] = v; colors[j * 3 + 1] = v; colors[j * 3 + 2] = v;
    }
  } else { // 색·강도 없음 → 높이 그라데이션
    const span = Math.max(zMax - zMin, 1e-6);
    const tmp = new THREE.Color();
    for (let j = 0; j < outCount; j++) {
      const t = ((positions[j * 3 + 2] + cz) - zMin) / span;
      tmp.setHSL(0.66 - 0.66 * t, 0.85, 0.55);
      colors[j * 3] = tmp.r; colors[j * 3 + 1] = tmp.g; colors[j * 3 + 2] = tmp.b;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(geo, makePointsMaterial(true));
  points.userData.worldOffset = [cx, cy, cz];
  if (stride > 1) setStatus(`대용량 스캔 → 1/${stride} 표본 추출 (${outCount.toLocaleString()} 점 표시)`);
  return points;
}

/* XYZ / PTS 텍스트 파서: "x y z [r g b]" 또는 "x y z intensity r g b" */
function parseXYZ(text) {
  const lines = text.split('\n');
  const pos = [], col = [];
  let hasColor = false;
  for (const line of lines) {
    const t = line.trim();
    if (!t || /[a-df-zA-DF-Z]/.test(t[0])) continue; // 헤더/주석 줄 스킵
    const parts = t.split(/[\s,;]+/).map(Number);
    if (parts.length < 3 || parts.some((v, i) => i < 3 && !isFinite(v))) continue;
    pos.push(parts[0], parts[1], parts[2]);
    if (parts.length >= 6) {
      hasColor = true;
      const o = parts.length >= 7 ? parts.length - 3 : 3; // intensity 칼럼 보정
      col.push(parts[o], parts[o + 1], parts[o + 2]);
    } else col.push(1, 1, 1);
  }
  if (!pos.length) throw new Error('점 데이터를 찾지 못했습니다');
  const positions = new Float32Array(pos);
  const colors = new Float32Array(col);
  if (hasColor) {
    let max = 0;
    for (const v of colors) max = Math.max(max, v);
    if (max > 1) for (let i = 0; i < colors.length; i++) colors[i] /= max > 255 ? 65535 : 255;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(geo, makePointsMaterial(true));
}

$('cloud-visible').addEventListener('change', (e) => { layers.cloud.group.visible = e.target.checked; });
$('cloud-zup').addEventListener('change', applyCloudUp);
function applyCloudUp() {
  layers.cloud.axis.rotation.x = $('cloud-zup').checked ? -Math.PI / 2 : 0;
}
applyCloudUp();
$('cloud-opacity').addEventListener('input', applyCloudStyle);
$('cloud-size').addEventListener('input', applyCloudStyle);
function applyCloudStyle() {
  const op = parseFloat($('cloud-opacity').value);
  const size = parseFloat($('cloud-size').value);
  layers.cloud.axis.traverse((o) => {
    if (o.isPoints) { o.material.size = size; o.material.opacity = op; }
    else if (o.isMesh) {
      o.material.transparent = op < 1; o.material.opacity = op; o.material.needsUpdate = true;
    }
  });
}
$('clear-cloud').addEventListener('click', () => clearLayer('cloud'));

/* --------------------------------------------------------------- 360 영상 */
const videoEl = document.createElement('video');
videoEl.loop = true;
videoEl.muted = true;
videoEl.playsInline = true;
videoEl.crossOrigin = 'anonymous';

let videoSphere = null;
let savedCamState = null;

$('file-video').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) loadVideoFile(file);
  e.target.value = '';
});

function loadVideoFile(file) {
  videoEl.src = URL.createObjectURL(file);
  videoEl.load();
  if (!videoSphere) {
    const tex = new THREE.VideoTexture(videoEl);
    tex.colorSpace = THREE.SRGBColorSpace;
    const geo = new THREE.SphereGeometry(1, 64, 48);
    geo.scale(-1, 1, 1); // 내부에서 보이도록 반전
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true,
      opacity: parseFloat($('video-opacity').value),
      depthWrite: false,
    });
    videoSphere = new THREE.Mesh(geo, mat);
    videoSphere.name = 'videoSphere';
    layers.video.axis.add(videoSphere);
    applyVideoRadius();
    applyVideoYaw();
    applyVideoFront();
  }
  layers.video.group.position.set(0, 1.6, 0); // 일반적인 카메라 높이
  syncTransformInputs();
  setStatus(`360 영상 로드: ${file.name} — '시점 진입'으로 영상 안에서 검토하세요`);
}

$('video-visible').addEventListener('change', (e) => { layers.video.group.visible = e.target.checked; });
$('video-opacity').addEventListener('input', () => {
  if (videoSphere) videoSphere.material.opacity = parseFloat($('video-opacity').value);
});
$('video-radius').addEventListener('input', applyVideoRadius);
function applyVideoRadius() {
  if (videoSphere) videoSphere.scale.setScalar(parseFloat($('video-radius').value));
}
$('video-yaw').addEventListener('input', applyVideoYaw);
function applyVideoYaw() {
  if (videoSphere) videoSphere.rotation.y = THREE.MathUtils.degToRad(parseFloat($('video-yaw').value));
}
$('video-front').addEventListener('change', applyVideoFront);
function applyVideoFront() {
  if (!videoSphere) return;
  const front = $('video-front').checked;
  videoSphere.material.depthTest = !front;
  videoSphere.renderOrder = front ? 999 : 0;
}

$('video-place').addEventListener('click', () => {
  if (!videoSphere) { setStatus('먼저 360 영상을 불러오세요'); return; }
  layers.video.group.position.copy(controls.target);
  syncTransformInputs();
  setStatus('현재 시점 중심에 360 구체를 배치했습니다 — 기즈모로 미세 조정하세요');
});

$('video-enter').addEventListener('click', enter360);
$('video-exit').addEventListener('click', exit360);

function enter360() {
  if (!videoSphere) { setStatus('먼저 360 영상을 불러오세요'); return; }
  if (!savedCamState) {
    savedCamState = {
      pos: camera.position.clone(),
      target: controls.target.clone(),
      rotateSpeed: controls.rotateSpeed,
    };
  }
  const center = layers.video.group.getWorldPosition(new THREE.Vector3());
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
  controls.target.copy(center);
  camera.position.copy(center).addScaledVector(dir, 0.01);
  controls.rotateSpeed = -0.35; // 파노라마식 드래그
  controls.enablePan = false;
  $('exit-360').classList.remove('hidden');
  videoEl.play().catch(() => {});
  setStatus('360 시점 — 드래그로 둘러보고, 투명도 슬라이더로 모델·스캔과 비교하세요');
}
function exit360() {
  if (!savedCamState) return;
  camera.position.copy(savedCamState.pos);
  controls.target.copy(savedCamState.target);
  controls.rotateSpeed = savedCamState.rotateSpeed;
  controls.enablePan = true;
  savedCamState = null;
  $('exit-360').classList.add('hidden');
  setStatus('360 시점에서 나왔습니다');
}

/* 재생 컨트롤 */
$('video-play').addEventListener('click', () => {
  if (videoEl.paused) videoEl.play(); else videoEl.pause();
});
videoEl.addEventListener('play', () => { $('video-play').textContent = '⏸'; });
videoEl.addEventListener('pause', () => { $('video-play').textContent = '▶'; });
videoEl.addEventListener('timeupdate', () => {
  if (videoEl.duration) {
    $('video-seek').value = (videoEl.currentTime / videoEl.duration) * 100;
    $('video-time').textContent = fmtTime(videoEl.currentTime);
  }
});
$('video-seek').addEventListener('input', (e) => {
  if (videoEl.duration) videoEl.currentTime = (parseFloat(e.target.value) / 100) * videoEl.duration;
});
function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

/* ------------------------------------------------------------- 거리 측정 */
let measuring = false;
let measureStart = null;
const measureGroup = new THREE.Group();
scene.add(measureGroup);
const labels = []; // { worldPos, el }
const raycaster = new THREE.Raycaster();

$('tool-measure').addEventListener('click', () => {
  measuring = !measuring;
  measureStart = null;
  $('tool-measure').classList.toggle('active', measuring);
  canvas.style.cursor = measuring ? 'crosshair' : '';
  setStatus(measuring ? '측정 모드: 두 점을 클릭하세요' : '측정 모드 종료');
});
$('tool-clearmeasure').addEventListener('click', clearMeasurements);
function clearMeasurements() {
  measureGroup.clear();
  labels.forEach((l) => l.el.remove());
  labels.length = 0;
  measureStart = null;
}

canvas.addEventListener('pointerdown', (e) => {
  if (!measuring || e.button !== 0) return;
  const rect = canvas.getBoundingClientRect();
  const ndc = new THREE.Vector2(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  raycaster.params.Points.threshold = Math.max(parseFloat($('cloud-size').value) * 2, 0.08);
  const targets = [];
  layers.model.group.visible && targets.push(layers.model.group);
  layers.cloud.group.visible && targets.push(layers.cloud.group);
  const hits = raycaster.intersectObjects(targets, true);
  if (!hits.length) { setStatus('측정: 모델/포인트클라우드 위를 클릭하세요'); return; }
  const p = hits[0].point.clone();
  if (!measureStart) {
    measureStart = p;
    addMeasureDot(p);
    setStatus('측정: 두 번째 점을 클릭하세요');
  } else {
    addMeasureDot(p);
    addMeasureLine(measureStart, p);
    measureStart = null;
  }
});

function addMeasureDot(p) {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd76b, depthTest: false }));
  dot.position.copy(p);
  dot.renderOrder = 1000;
  measureGroup.add(dot);
}
function addMeasureLine(a, b) {
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([a, b]),
    new THREE.LineBasicMaterial({ color: 0xffd76b, depthTest: false }));
  line.renderOrder = 1000;
  measureGroup.add(line);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const el = document.createElement('div');
  el.className = 'mlabel';
  el.textContent = a.distanceTo(b).toFixed(3) + ' m';
  $('labels').appendChild(el);
  labels.push({ worldPos: mid, el });
  setStatus(`측정 거리: ${a.distanceTo(b).toFixed(3)} m`);
}
function updateLabels() {
  const rect = canvas.getBoundingClientRect();
  for (const l of labels) {
    const v = l.worldPos.clone().project(camera);
    const visible = v.z < 1;
    l.el.style.display = visible ? '' : 'none';
    if (visible) {
      l.el.style.left = ((v.x + 1) / 2) * rect.width + 'px';
      l.el.style.top = ((-v.y + 1) / 2) * rect.height + 'px';
    }
  }
}

/* --------------------------------------------------------------- 단면/뷰 */
const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3);
$('clip-enable').addEventListener('change', applyClip);
$('clip-height').addEventListener('input', applyClip);
function applyClip() {
  clipPlane.constant = parseFloat($('clip-height').value);
  renderer.clippingPlanes = $('clip-enable').checked ? [clipPlane] : [];
}

$('show-grid').addEventListener('change', (e) => {
  grid.visible = e.target.checked; axes.visible = e.target.checked;
});
$('bg-light').addEventListener('change', (e) => {
  scene.background.set(e.target.checked ? BG_LIGHT : BG_DARK);
});

$('tool-fit').addEventListener('click', fitView);
function fitView() {
  if (savedCamState) return; // 360 시점 중엔 유지
  const box = new THREE.Box3();
  let any = false;
  for (const key of ['model', 'cloud']) {
    if (layers[key].group.visible && layers[key].axis.children.length) {
      box.expandByObject(layers[key].group);
      any = true;
    }
  }
  if (!any) return;
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length() || 10;
  controls.target.copy(center);
  camera.position.copy(center).add(new THREE.Vector3(0.6, 0.45, 0.6).multiplyScalar(size));
  camera.near = Math.max(size / 5000, 0.01);
  camera.far = size * 50;
  camera.updateProjectionMatrix();
  // 단면 슬라이더 범위를 데이터에 맞춤
  $('clip-height').min = (box.min.y - 1).toFixed(1);
  $('clip-height').max = (box.max.y + 1).toFixed(1);
}

$('tool-shot').addEventListener('click', () => {
  renderer.render(scene, camera);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `검토캡처_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.png`);
  });
  setStatus('화면을 PNG로 캡처했습니다');
});

/* -------------------------------------------------------------- 공통 유틸 */
function clearLayer(key) {
  layers[key].axis.clear();
  layers[key].files.length = 0;
  if (key === 'video') { videoSphere = null; videoEl.pause(); videoEl.removeAttribute('src'); }
  refreshFileList(key);
  updateStats();
}
function refreshFileList(key) {
  const ul = $('list-' + key);
  if (!ul) return;
  ul.innerHTML = '';
  layers[key].files.forEach((f) => {
    const li = document.createElement('li');
    li.textContent = f;
    ul.appendChild(li);
  });
}
function updateStats() {
  let tris = 0, pts = 0;
  scene.traverse((o) => {
    if (o.isMesh && o.geometry) {
      const idx = o.geometry.index;
      tris += (idx ? idx.count : o.geometry.attributes.position?.count || 0) / 3;
    } else if (o.isPoints && o.geometry) {
      pts += o.geometry.attributes.position?.count || 0;
    }
  });
  $('status-stats').textContent =
    `삼각형 ${Math.round(tris).toLocaleString()} · 점 ${Math.round(pts).toLocaleString()}`;
}
function setStatus(msg) { $('status-msg').textContent = msg; }
function showLoading(msg) { $('loading-msg').textContent = msg; $('loading').classList.remove('hidden'); }
function hideLoading() { $('loading').classList.add('hidden'); }
function downloadBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/* ----------------------------------------------------------- 파일 입력 */
$('file-model').addEventListener('change', async (e) => {
  for (const f of e.target.files) await loadModelFile(f);
  e.target.value = '';
});
$('file-cloud').addEventListener('change', async (e) => {
  for (const f of e.target.files) await loadCloudFile(f);
  e.target.value = '';
});

/* 드래그&드롭: 확장자로 자동 라우팅 */
const MODEL_EXT = ['glb', 'gltf', 'fbx', 'obj'];
const CLOUD_EXT = ['las', 'laz', 'ply', 'pcd', 'xyz', 'pts', 'txt'];
const VIDEO_EXT = ['mp4', 'webm', 'mov', 'm4v'];
window.addEventListener('dragover', (e) => {
  e.preventDefault();
  $('drophint').classList.remove('hidden');
});
window.addEventListener('dragleave', (e) => {
  if (!e.relatedTarget) $('drophint').classList.add('hidden');
});
window.addEventListener('drop', async (e) => {
  e.preventDefault();
  $('drophint').classList.add('hidden');
  for (const f of e.dataTransfer.files) {
    const ext = f.name.split('.').pop().toLowerCase();
    if (MODEL_EXT.includes(ext)) await loadModelFile(f);
    else if (CLOUD_EXT.includes(ext)) await loadCloudFile(f);
    else if (VIDEO_EXT.includes(ext)) loadVideoFile(f);
    else if (ext === 'json') {
      // 정렬 파일로 시도
      const dt = new DataTransfer();
      dt.items.add(f);
      $('align-load').files = dt.files;
      $('align-load').dispatchEvent(new Event('change'));
    } else if (['nwd', 'nwc', 'nwf', 'rvt'].includes(ext)) {
      setStatus(`${ext.toUpperCase()}는 직접 열 수 없습니다 — Navisworks/Revit에서 FBX·glTF로 내보내세요`);
    } else setStatus('지원하지 않는 파일: ' + f.name);
  }
});

/* ------------------------------------------------------------- 키보드 */
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  switch (e.key.toLowerCase()) {
    case 'w': setGizmoMode('translate'); break;
    case 'e': setGizmoMode('rotate'); break;
    case 'r': setGizmoMode('scale'); break;
    case 'f': fitView(); break;
    case ' ':
      if (videoEl.src) { e.preventDefault(); $('video-play').click(); }
      break;
    case 'escape':
      if (savedCamState) exit360();
      else if (measuring) $('tool-measure').click();
      else { gizmo.detach(); gizmoTarget = null; $('gizmo-target').value = ''; }
      break;
  }
});

/* ------------------------------------------------------------ 렌더 루프 */
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== Math.floor(w * renderer.getPixelRatio()) ||
      canvas.height !== Math.floor(h * renderer.getPixelRatio())) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}
window.addEventListener('resize', resize);

renderer.setAnimationLoop(() => {
  resize();
  controls.update();
  updateLabels();
  renderer.render(scene, camera);
});
resize();
setStatus('모델·포인트클라우드·360영상 파일을 불러오거나 화면에 드래그하세요');
