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

const LINE_COLORS={'1':'#0052A4','2':'#00A84D','3':'#EF7C1C','4':'#00A5DE','5':'#996CAC','6':'#CD7C2F','7':'#747F00','8':'#E6186C'};
const lineColor=l=>LINE_COLORS[l]||'#888';
const kmDist=(a,b,c,d)=>{const R=6371,r=Math.PI/180,dLa=(c-a)*r,dLo=(d-b)*r,x=Math.sin(dLa/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
const GAP=2.6; // km: 인접역이 이보다 멀면 지선 점프로 보고 선 끊음

// 호선별 폴리라인 세그먼트 계산(지선/순환 대응: stnNo순 vs 최근접 중 조각 적은쪽)
function lineSegments(){
 const byLine={};
 DATA.stations.forEach(s=>{if(s.lat)(byLine[s.line]=byLine[s.line]||[]).push(s);});
 const segByOrder=arr=>{const out=[];let seg=[];for(const s of arr){if(seg.length&&kmDist(seg[seg.length-1][0],seg[seg.length-1][1],s.lat,s.lng)>GAP){if(seg.length>1)out.push(seg);seg=[];}seg.push([s.lat,s.lng]);}if(seg.length>1)out.push(seg);return out;};
 const segByNN=arr=>{const p=arr.map(s=>[s.lat,s.lng]);const used=Array(p.length).fill(false);const out=[];let cur=0;for(let i=1;i<p.length;i++)if(p[i][1]+p[i][0]<p[cur][1]+p[cur][0])cur=i;let seg=[cur];used[cur]=true;let rem=p.length-1;while(rem>0){const last=seg[seg.length-1];let best=-1,bd=1e9;for(let j=0;j<p.length;j++){if(used[j])continue;const dd=kmDist(p[last][0],p[last][1],p[j][0],p[j][1]);if(dd<bd){bd=dd;best=j;}}if(bd>GAP){if(seg.length>1)out.push(seg.map(i=>p[i]));seg=[best];}else seg.push(best);used[best]=true;rem--;}if(seg.length>1)out.push(seg.map(i=>p[i]));return out;};
 const res=[];
 Object.keys(byLine).forEach(ln=>{
  const arr=byLine[ln].slice().sort((a,b)=>(a.no||0)-(b.no||0));
  const a=segByOrder(arr),b=segByNN(arr);
  (b.length<a.length?b:a).forEach(seg=>res.push({line:ln,seg}));
 });
 return res;
}

// 노선+역 그리기(지도/노선도 공용). labels=true면 역이름 상시표시.
function drawNetwork(layer,opts){
 opts=opts||{};
 lineSegments().forEach(o=>L.polyline(o.seg,{color:lineColor(o.line),weight:opts.weight||4,opacity:.85,lineJoin:'round'}).addTo(layer));
 DATA.stations.forEach(st=>{
  if(!st.lat)return;
  const mk=L.circleMarker([st.lat,st.lng],{radius:opts.radius||5,color:lineColor(st.line),weight:2.5,fillColor:'#fff',fillOpacity:1})
   .on('click',()=>showStation(st));
  if(opts.labels)mk.bindTooltip(nm(st),{permanent:true,direction:'right',offset:[4,0],className:'net-lbl'});
  else mk.bindTooltip(nm(st),{direction:'top',offset:[0,-6],className:'st-tip'});
  mk.addTo(layer);
 });
}

function renderPins(){
 pinLayer.clearLayers();
 drawNetwork(pinLayer,{labels:false});
 mine().forEach(m=>{
  L.marker([m.lat,m.lng],{icon:L.divIcon({html:'<div class="pin" style="background:#8a7fd6"><b>🔑</b></div>',className:'',iconSize:[30,30],iconAnchor:[15,28]})})
   .on('click',()=>showMine(m)).addTo(pinLayer);
 });
}

// 노선도 탭 = 타일 없는 지도(흰 배경) + 색깔 노선 + 역이름
let netMap=null, netLayer=null;
function renderLine(){
 if(!netMap){
  netMap=L.map('lineMap',{zoomControl:true,attributionControl:false,minZoom:10,maxZoom:16}).setView([37.55,127.02],11);
  netLayer=L.layerGroup().addTo(netMap);
 }
 netLayer.clearLayers();
 drawNetwork(netLayer,{labels:true,radius:5});
 setTimeout(()=>{netMap.invalidateSize();
  const pts=DATA.stations.filter(s=>s.lat).map(s=>[s.lat,s.lng]);
  if(pts.length)netMap.fitBounds(pts,{padding:[30,30]});
 },60);
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
 const se=$('#search');if(se)se.placeholder=t('search');
 renderPins();
 if(netMap)renderLine();
}
$('#lang').onchange=e=>{lang=e.target.value;applyLang();};

/* 시트 드래그 */
(function(){const z=$('#grabz'),s=$('#sheet');let sy=0,dy=0,on=false,mv=false;
 z.addEventListener('pointerdown',e=>{on=true;mv=false;sy=e.clientY;dy=0;s.style.transition='none';try{z.setPointerCapture(e.pointerId)}catch(_){};e.preventDefault();});
 z.addEventListener('pointermove',e=>{if(!on)return;dy=Math.max(0,e.clientY-sy);if(dy>4)mv=true;s.style.transform='translateY('+dy+'px)';});
 z.addEventListener('pointerup',()=>{if(!on)return;on=false;s.style.transition='';s.style.transform='';if(dy>70||!mv)closeSheet();});
})();

/* 역 검색 */
const searchEl=$('#search'),suggEl=$('#suggest');
function doSearch(q){
 q=(q||'').trim().toLowerCase();
 if(!q){suggEl.classList.remove('on');suggEl.innerHTML='';return;}
 const seen={},res=[];
 for(const s of DATA.stations){
  if((s.name||'').toLowerCase().includes(q)){const k=s.name+'|'+s.line;if(!seen[k]){seen[k]=1;res.push(s);}}
  if(res.length>=12)break;
 }
 if(!res.length){suggEl.innerHTML='<div class="sg" style="color:#9ca3af">검색 결과 없음</div>';suggEl.classList.add('on');return;}
 suggEl.innerHTML=res.map(s=>`<div class="sg" data-id="${s.id}"><span class="ln" style="background:${lineColor(s.line)}">${s.line}</span>${nm(s)}<span style="margin-left:auto;color:#9ca3af;font-size:12px">🚻${s.toilets.length}</span></div>`).join('');
 suggEl.classList.add('on');
 suggEl.querySelectorAll('.sg[data-id]').forEach(el=>el.onclick=()=>{
  const s=DATA.stations.find(x=>x.id===el.dataset.id);
  if(s){searchEl.value='';suggEl.classList.remove('on');go('map');map.setView([s.lat,s.lng],16);showStation(s);}
 });
}
searchEl.addEventListener('input',e=>doSearch(e.target.value));
searchEl.addEventListener('focus',e=>{if(e.target.value)doSearch(e.target.value);});
document.addEventListener('click',e=>{if(!$('#searchWrap').contains(e.target))suggEl.classList.remove('on');});

/* 부팅 */
fetch('data.json').then(r=>r.json()).then(d=>{DATA=d;renderPins();applyLang();})
 .catch(()=>{DATA={stations:[]};applyLang();});
