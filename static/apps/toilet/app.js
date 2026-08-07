/* 급할 땐 · 지하철 화장실 — 스캐폴드(목업). 실데이터=data.go.kr 키 연결 예정 */
const $=s=>document.querySelector(s);
const LANG={
 ko:{map:'지도',line:'노선도',title:'급할 땐',sub:'지하철 화장실',toilet:'화장실',esc:'에스컬레이터',inGate:'게이트 안',outGate:'게이트 밖',gateUnknown:'게이트 정보없음',floor:'층',nearCar:'가까운 칸',hours:'이용시간',type:'구성',wc:'휠체어 접근',lineNo:'호선',route:'길찾기',mine:'내 화장실',addMine:'내 화장실 추가',nudgeShop:'상가 화장실은 이용 시 음료 한 잔 어때요? ☕',pw:'비밀번호',hasPw:'비번 있음',noPw:'비번 없음',note:'비고',save:'저장',loc:'위치',near:'근처 공공화장실',search:'역 검색'},
 en:{map:'Map',line:'Lines',title:'Gotta Go',sub:'Subway Toilets',toilet:'Toilet',esc:'Escalator',inGate:'Inside gate',outGate:'Outside gate',gateUnknown:'Gate n/a',floor:'Floor',nearCar:'Nearest car',hours:'Hours',type:'Type',wc:'Wheelchair',lineNo:' Line',route:'Route',mine:'My spots',addMine:'Add my toilet',nudgeShop:'Buy a drink if you use a shop toilet ☕',pw:'Password',hasPw:'Has code',noPw:'No code',note:'Notes',save:'Save',loc:'Location',near:'Nearby public toilets',search:'Search station'},
 ja:{map:'地図',line:'路線',title:'急な時',sub:'地下鉄トイレ',toilet:'トイレ',esc:'エスカレーター',inGate:'改札内',outGate:'改札外',gateUnknown:'改札不明',floor:'階',nearCar:'近い車両',hours:'利用時間',type:'構成',wc:'車椅子',lineNo:'号線',route:'ルート',mine:'マイ',addMine:'マイトイレ追加',nudgeShop:'店舗トイレは一杯どうぞ ☕',pw:'暗証番号',hasPw:'番号あり',noPw:'番号なし',note:'メモ',save:'保存',loc:'場所',near:'近くの公衆トイレ',search:'駅を検索'},
 zh:{map:'地图',line:'线路',title:'急需时',sub:'地铁厕所',toilet:'厕所',esc:'扶梯',inGate:'闸内',outGate:'闸外',gateUnknown:'闸机未知',floor:'层',nearCar:'最近车厢',hours:'开放时间',type:'构成',wc:'轮椅',lineNo:'号线',route:'路线',mine:'我的',addMine:'添加厕所',nudgeShop:'用商铺厕所买杯饮料吧 ☕',pw:'密码',hasPw:'有密码',noPw:'无密码',note:'备注',save:'保存',loc:'位置',near:'附近公厕',search:'搜索车站'}
};
let lang='ko', DATA={stations:[]};
const t=k=>(LANG[lang]&&LANG[lang][k])||LANG.ko[k]||k;
const nm=st=>st['name'+(lang==='ko'?'':'_'+lang)]||st.name;

/* 지도 */
const map=L.map('map',{zoomControl:true,attributionControl:false}).setView([37.5326,127.0246],12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19}).addTo(map);
const pinLayer=L.layerGroup().addTo(map);

function renderPins(){
 pinLayer.clearLayers();
 DATA.stations.forEach(st=>{
  const html=`<div class="pin"><b>🚻</b></div>`;
  L.marker([st.lat,st.lng],{icon:L.divIcon({html,className:'',iconSize:[30,30],iconAnchor:[15,28]})})
   .on('click',()=>showStation(st)).addTo(pinLayer);
 });
 // 내 화장실
 mine().forEach(m=>{
  L.marker([m.lat,m.lng],{icon:L.divIcon({html:'<div class="pin" style="background:#8a7fd6"><b>🔑</b></div>',className:'',iconSize:[30,30],iconAnchor:[15,28]})})
   .on('click',()=>showMine(m)).addTo(pinLayer);
 });
}

/* 시트 */
function openSheet(h){$('#sheetBody').innerHTML=h;$('#sheet').classList.add('up');}
function closeSheet(){const s=$('#sheet');s.style.transform='';s.classList.remove('up');}
map.on('click',closeSheet);

function showStation(st){
 const gicon=g=>g==='in'?'🟢':g==='out'?'🟣':'⚪';
 const glabel=g=>g==='in'?t('inGate'):g==='out'?t('outGate'):t('gateUnknown');
 const toilets=(st.toilets||[]).map(x=>`
  <div class="card">
   <h3>${gicon(x.gate)} <span class="tag ${x.gate||''}">${glabel(x.gate)}</span>${x.wheelchair==='Y'?` <span class="tag" title="${t('wc')}">♿</span>`:''}</h3>
   ${x.loc?`<div class="kv"><b>${t('loc')}</b><span>${x.loc}</span></div>`:''}
   <div class="kv"><b>${t('floor')}</b><span>${x.floor||'-'}</span></div>
   ${x.info?`<div class="kv"><b>${t('type')}</b><span>${x.info}</span></div>`:''}
  </div>`).join('');
 const esc=(st.escalator||[]).length?`<div class="kv"><b>${t('esc')}</b><span>${st.escalator.map(e=>e.from+'↔'+e.to).join(', ')}</span></div>`:'';
 openSheet(`
  <div class="row"><h2>${nm(st)}</h2><span class="tag" style="background:#eef3fb;color:var(--accent)">${st.line}${t('lineNo')}</span></div>
  <h3 style="margin-top:12px">🚻 ${t('toilet')} ${st.toilets.length}</h3>
  ${toilets}
  ${esc?`<div class="card">${esc}</div>`:''}
  <button class="btn ghost" onclick="alert('길찾기: 도보네트워크 API 연결 예정')">🧭 ${t('route')}</button>
 `);
}

/* 내 화장실(프라이빗, localStorage) */
function mine(){try{return JSON.parse(localStorage.getItem('st_mine')||'[]')}catch(e){return[]}}
function saveMine(a){localStorage.setItem('st_mine',JSON.stringify(a))}
function showMine(m){
 openSheet(`
  <div class="row"><h2>🔑 ${m.name||t('mine')}</h2></div>
  <div class="nudge">${t('nudgeShop')}</div>
  <div class="card">
   <div class="kv"><b>${t('loc')}</b><span>${m.locText||'-'}</span></div>
   <div class="kv"><b>${t('pw')}</b><span>${m.hasPw?('🔒 '+(m.pw||t('hasPw'))):t('noPw')}</span></div>
   <div class="kv"><b>${t('note')}</b><span>${m.note||'-'}</span></div>
  </div>
  <button class="btn ghost" onclick="delMine('${m.id}')">삭제</button>
 `);
}
window.delMine=id=>{saveMine(mine().filter(x=>x.id!==id));renderPins();closeSheet();};

function addModal(){
 const c=map.getCenter();
 $('#modalBody').innerHTML=`
  <h2>＋ ${t('addMine')}</h2>
  <p class="hint">지도 중앙 위치로 저장돼요 (실버전=탭 지정/현위치)</p>
  <label>${t('loc')} 메모</label><input id="mLoc" placeholder="예: OO빌딩 3층 카페 안쪽">
  <label>${t('note')}</label><input id="mNote" placeholder="예: 직원에게 문의, 층수">
  <label><input type="checkbox" id="mHasPw" style="width:auto;margin-right:6px">${t('hasPw')}</label>
  <input id="mPw" placeholder="${t('pw')} (예: 1234*)">
  <div class="nudge">${t('nudgeShop')}</div>
  <button class="btn" id="mSave">${t('save')}</button>
  <button class="btn ghost" onclick="$('#modal').classList.remove('on')">닫기</button>`;
 $('#modal').classList.add('on');
 $('#mSave').onclick=()=>{
  const arr=mine();
  arr.push({id:'m'+Date.now(),name:$('#mLoc').value.slice(0,16)||'내 화장실',locText:$('#mLoc').value,note:$('#mNote').value,hasPw:$('#mHasPw').checked,pw:$('#mPw').value,lat:c.lat,lng:c.lng});
  saveMine(arr);renderPins();$('#modal').classList.remove('on');
 };
}
$('#addBtn').onclick=addModal;

/* 노선도(간단 리스트형) */
function renderLine(){
 const byLine={};
 DATA.stations.forEach(s=>{(byLine[s.line]=byLine[s.line]||[]).push(s);});
 $('#lineMap').innerHTML=Object.keys(byLine).sort().map(ln=>`
  <div style="margin-bottom:18px">
   <h3>${ln}호선</h3>
   <div class="line-col">${byLine[ln].map(s=>`
    <div class="line-st" onclick="__pick('${s.id}')"><span class="dot"></span><span class="lbl">${nm(s)}</span>
     <span class="mini">🚻 ${s.toilets.length}</span></div>`).join('')}</div>
  </div>`).join('')||'<p class="hint">데이터 로딩 중…</p>';
}
window.__pick=id=>{const s=DATA.stations.find(x=>x.id===id);if(s){go('map');map.setView([s.lat,s.lng],15);showStation(s);}};

/* 뷰 전환 */
function go(v){
 document.querySelectorAll('.view').forEach(x=>x.classList.toggle('on',x.id==='v-'+v));
 document.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));
 if(v==='map')setTimeout(()=>map.invalidateSize(),50);
 if(v==='line')renderLine();
}
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>go(b.dataset.v));

/* 다국어 */
function applyLang(){
 document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));
 $('#title').childNodes[0].nodeValue=t('title')+' 🚻';
 $('#subtitle').textContent=t('sub');
 renderPins();
}
$('#lang').onchange=e=>{lang=e.target.value;applyLang();};

/* 시트 드래그 */
(function(){const z=$('#grabz'),s=$('#sheet');let sy=0,dy=0,on=false,mv=false;
 z.addEventListener('pointerdown',e=>{on=true;mv=false;sy=e.clientY;dy=0;s.style.transition='none';try{z.setPointerCapture(e.pointerId)}catch(_){};e.preventDefault();});
 z.addEventListener('pointermove',e=>{if(!on)return;dy=Math.max(0,e.clientY-sy);if(dy>4)mv=true;s.style.transform='translateY('+dy+'px)';});
 z.addEventListener('pointerup',()=>{if(!on)return;on=false;s.style.transition='';s.style.transform='';if(dy>70||!mv)closeSheet();});
})();

/* 부팅 */
fetch('data.json').then(r=>r.json()).then(d=>{DATA=d;renderPins();applyLang();})
 .catch(()=>{DATA={stations:[]};applyLang();});
