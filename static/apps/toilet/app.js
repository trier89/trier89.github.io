/* 급할 땐 · 지하철 화장실 — 스캐폴드(목업). 실데이터=data.go.kr 키 연결 예정 */
const $=s=>document.querySelector(s);
const LANG={
 ko:{map:'지도',line:'노선도',title:'급할 땐',sub:'지하철 화장실',toilet:'화장실',esc:'에스컬레이터',elv:'엘리베이터',inGate:'게이트 안',outGate:'게이트 밖',gateUnknown:'게이트 정보없음',floor:'층',nearCar:'가까운 칸',hours:'이용시간',type:'구성',wc:'휠체어 접근',lineNo:'호선',route:'길찾기',mine:'내 화장실',addMine:'내 화장실 추가',nudgeShop:'상가 화장실은 이용 시 음료 한 잔 어때요? ☕',pw:'비밀번호',hasPw:'비번 있음',noPw:'비번 없음',note:'비고',save:'저장',loc:'위치',near:'근처 공공화장실',search:'역 검색',stationMap:'역 구내 안내도',undo:'실행취소'},
 en:{map:'Map',line:'Lines',title:'Gotta Go',sub:'Subway Toilets',toilet:'Toilet',esc:'Escalator',elv:'Elevator',inGate:'Inside gate',outGate:'Outside gate',gateUnknown:'Gate n/a',floor:'Floor',nearCar:'Nearest car',hours:'Hours',type:'Type',wc:'Wheelchair',lineNo:' Line',route:'Route',mine:'My spots',addMine:'Add my toilet',nudgeShop:'Buy a drink if you use a shop toilet ☕',pw:'Password',hasPw:'Has code',noPw:'No code',note:'Notes',save:'Save',loc:'Location',near:'Nearby public toilets',search:'Search station',stationMap:'Station map',undo:'Undo'},
 ja:{map:'地図',line:'路線',title:'急な時',sub:'地下鉄トイレ',toilet:'トイレ',esc:'エスカレーター',elv:'エレベーター',inGate:'改札内',outGate:'改札外',gateUnknown:'改札不明',floor:'階',nearCar:'近い車両',hours:'利用時間',type:'構成',wc:'車椅子',lineNo:'号線',route:'ルート',mine:'マイ',addMine:'マイトイレ追加',nudgeShop:'店舗トイレは一杯どうぞ ☕',pw:'暗証番号',hasPw:'番号あり',noPw:'番号なし',note:'メモ',save:'保存',loc:'場所',near:'近くの公衆トイレ',search:'駅を検索',stationMap:'構内図',undo:'元に戻す'},
 zh:{map:'地图',line:'线路',title:'急需时',sub:'地铁厕所',toilet:'厕所',esc:'扶梯',elv:'电梯',inGate:'闸内',outGate:'闸外',gateUnknown:'闸机未知',floor:'层',nearCar:'最近车厢',hours:'开放时间',type:'构成',wc:'轮椅',lineNo:'号线',route:'路线',mine:'我的',addMine:'添加厕所',nudgeShop:'用商铺厕所买杯饮料吧 ☕',pw:'密码',hasPw:'有密码',noPw:'无密码',note:'备注',save:'保存',loc:'位置',near:'附近公厕',search:'搜索车站',stationMap:'站内地图',undo:'撤销'}
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

// 화장실 카테고리 색상
const CAT={
 station:{c:'#2f7de1',emoji:'🚇',label:'지하철역'},
 linked:{c:'#12b5cb',emoji:'🔵',label:'지하철 연결'},
 public:{c:'#2f9e6b',emoji:'🟢',label:'야외 공공'},
 starbucks:{c:'#00704A',emoji:'☕',label:'스타벅스'},
 dept:{c:'#c2185b',emoji:'🏬',label:'백화점'},
 mart:{c:'#e67e22',emoji:'🛒',label:'대형마트'},
 mine:{c:'#8a4fd6',emoji:'🔑',label:'내 등록'}
};
const toiletCat=p=>/역|지하상가|지하도|지하철|환승|스테이션/.test((p.nm||'')+(p.addr||''))?'linked':'public';
// 프리미엄 카테고리 핀 마커(앱 아이콘 통일)
const MARKER_ICONS={};
['station','linked','public','starbucks','dept','mart','mine'].forEach(function(k){MARKER_ICONS[k]=L.icon({iconUrl:'marker-'+k+'.png',iconSize:[36,36],iconAnchor:[18,34],tooltipAnchor:[0,-30]});});
let publicToilets=null, _ptLoad=null; // 지연 로드(무거운 파일)
function loadPublic(){
 if(publicToilets)return Promise.resolve(publicToilets);
 if(_ptLoad)return _ptLoad;
 _ptLoad=fetch('public_toilets.json').then(r=>r.json()).then(d=>{publicToilets=(d.toilets||[]).map(p=>(p.cat=toiletCat(p),p));return publicToilets;}).catch(()=>{publicToilets=[];return publicToilets;});
 return _ptLoad;
}
let places=null, _plLoad=null; // 스타벅스·백화점·대형마트(카카오)
function loadPlaces(){
 if(places)return Promise.resolve(places);
 if(_plLoad)return _plLoad;
 _plLoad=fetch('places.json').then(r=>r.json()).then(d=>{places=d.places||[];return places;}).catch(()=>{places=[];return places;});
 return _plLoad;
}

// 토스트(실행취소 등)
let _toastT=null;
function showToast(msg, btnLabel, onBtn, ms){
 const el=$('#toast'), b=$('#toastBtn');
 $('#toastMsg').textContent=msg;
 if(btnLabel){b.textContent=btnLabel;b.onclick=()=>{onBtn&&onBtn();hideToast();};}else{b.textContent='';}
 el.classList.add('on'); clearTimeout(_toastT); _toastT=setTimeout(hideToast, ms||3000);
}
function hideToast(){$('#toast').classList.remove('on');}
const kmDist=(a,b,c,d)=>{const R=6371,r=Math.PI/180,dLa=(c-a)*r,dLo=(d-b)*r,x=Math.sin(dLa/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
const GAP=2.6; // km: 인접역이 이보다 멀면 지선 점프로 보고 선 끊음

// 호선별 노선 엣지 = 최소신장트리(MST). 트리라서 갈림길(지선)은 뻗고 삼각형/지름길은 안 생김.
// CAP 넘는 엣지는 제외(동떨어진 역은 억지 연결 안 함). 호선당 보통 1개 트리로 완전 연결.
function lineEdges(){
 const byLine={};
 DATA.stations.forEach(s=>{if(s.lat)(byLine[s.line]=byLine[s.line]||[]).push(s);});
 const CAP=4.0;
 const out=[];
 Object.keys(byLine).forEach(ln=>{
  const a=byLine[ln],n=a.length,E=[];
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const dd=kmDist(a[i].lat,a[i].lng,a[j].lat,a[j].lng);if(dd<=CAP)E.push([dd,i,j]);}
  E.sort((x,y)=>x[0]-y[0]);
  const par=a.map((_,i)=>i);
  const find=x=>{while(par[x]!==x){par[x]=par[par[x]];x=par[x];}return x;};
  for(const e of E){const ri=find(e[1]),rj=find(e[2]);if(ri!==rj){par[ri]=rj;out.push({line:ln,seg:[[a[e[1]].lat,a[e[1]].lng],[a[e[2]].lat,a[e[2]].lng]]});}}
 });
 return out;
}

// 노선+역 그리기(지도/노선도 공용). labels=true면 역이름 상시표시.
function drawNetwork(layer,opts){
 opts=opts||{};
 lineEdges().forEach(o=>L.polyline(o.seg,{color:lineColor(o.line),weight:opts.weight||4,opacity:.85,lineJoin:'round'}).addTo(layer));
 DATA.stations.forEach(st=>{
  if(!st.lat)return;
  const mk=L.circleMarker([st.lat,st.lng],{radius:opts.radius||5,color:lineColor(st.line),weight:2.5,fillColor:'#fff',fillOpacity:1})
   .on('click',()=>showStation(st));
  if(opts.labels)mk.bindTooltip(nm(st),{permanent:true,direction:'right',offset:[4,0],className:'net-lbl'});
  else mk.bindTooltip(nm(st),{direction:'top',offset:[0,-6],className:'st-tip'});
  mk.addTo(layer);
 });
}

function mineIcon(active){return L.divIcon({html:'<div class="pin" style="background:'+(active?'#e08a2f':CAT.mine.c)+';'+(active?'box-shadow:0 0 0 4px rgba(224,138,47,.35),0 2px 6px rgba(0,0,0,.3);':'')+'"><b>🔑</b></div>',className:'',iconSize:[30,30],iconAnchor:[15,28]});}
function addMineMarker(m){
 const mk=L.marker([m.lat,m.lng],{draggable:false,icon:mineIcon(false)}).addTo(pinLayer);
 mk.on('click',()=>{if(!mk.__moving)showMine(m);});
 mk.on('contextmenu',e=>{if(e.originalEvent)e.originalEvent.preventDefault();enterMove(mk,m);}); // 길게누르기(모바일)/우클릭
 return mk;
}
function enterMove(mk,m){
 if(mk.__moving)return;
 mk.__moving=true; const oldPos={lat:m.lat,lng:m.lng};
 mk.setIcon(mineIcon(true)); mk.dragging.enable();
 showToast('✊ 핀을 옮긴 후 손을 떼세요','',null,3000);
 mk.once('dragend',()=>{
  const ll=mk.getLatLng();
  const arr=mine(); const t=arr.find(x=>x.id===m.id); if(t){t.lat=ll.lat;t.lng=ll.lng;} saveMine(arr);
  m.lat=ll.lat; m.lng=ll.lng;
  mk.dragging.disable(); mk.setIcon(mineIcon(false));
  setTimeout(()=>{mk.__moving=false;},250);
  showToast('📍 위치를 옮겼어요', t('undo'), ()=>{
   const a2=mine(); const t2=a2.find(x=>x.id===m.id); if(t2){t2.lat=oldPos.lat;t2.lng=oldPos.lng;} saveMine(a2);
   m.lat=oldPos.lat; m.lng=oldPos.lng; mk.setLatLng(oldPos);
  }, 6000);
 });
}
function renderPins(){
 pinLayer.clearLayers();
 drawNetwork(pinLayer,{labels:false});
 mine().forEach(m=>addMineMarker(m));
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
 const elv=(st.elevator||[]).length?`<div class="kv"><b>${t('elv')}</b><span>${st.elevator.map(e=>`${e.from}↔${e.to}${e.pos?` · ${e.pos}`:''}`).join('<br>')}</span></div>`:'';
 openSheet(`
  <div class="row"><h2>${nm(st)}</h2><span class="tag" style="background:#eef3fb;color:var(--accent)">${st.line}${t('lineNo')}</span></div>
  <h3 style="margin-top:12px">🚻 ${t('toilet')} ${st.toilets.length}</h3>
  ${toilets}
  ${(esc||elv)?`<div class="card">${elv?('🛗 '+elv):''}${(elv&&esc)?'<div style="height:6px"></div>':''}${esc?('↗ '+esc):''}</div>`:''}
  ${st.mapImg?`<div class="card"><b>🗺 ${t('stationMap')}</b><a href="${st.mapImg}" target="_blank" rel="noopener"><img src="${st.mapImg}" alt="${t('stationMap')}" style="width:100%;border-radius:8px;margin-top:6px" loading="lazy"></a></div>`:''}
  <button class="btn" style="background:#e0392f" onclick="routeTo(${st.lat},${st.lng},'${nm(st).replace(/'/g,'')}')">🧭 여기로 도보 경로</button>
  <div id="tr-reviews" style="margin-top:14px"></div>
 `);
 if(window.TReviews)TReviews.render($('#tr-reviews'), 'st_'+st.id, nm(st));
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

let placeMarker=null;
function addModal(){
 go('map');
 if(placeMarker){placeMarker.remove();placeMarker=null;}
 const c=map.getCenter();
 placeMarker=L.marker(c,{draggable:true,icon:mineIcon(true)}).addTo(map);
 $('#modalBody').innerHTML=`
  <h2>＋ ${t('addMine')}</h2>
  <p class="hint">📍 주황 핀을 드래그해 정확한 위치로 옮긴 뒤 저장하세요</p>
  <label>${t('loc')} 메모</label><input id="mLoc" placeholder="예: OO빌딩 3층 카페 안쪽">
  <label>${t('note')}</label><input id="mNote" placeholder="예: 직원에게 문의, 층수">
  <label><input type="checkbox" id="mHasPw" style="width:auto;margin-right:6px">${t('hasPw')}</label>
  <input id="mPw" placeholder="${t('pw')} (예: 1234*)">
  <div class="nudge">${t('nudgeShop')}</div>
  <button class="btn" id="mSave">${t('save')}</button>
  <button class="btn ghost" id="mCancel">닫기</button>`;
 $('#modal').classList.add('on');
 const close=()=>{if(placeMarker){placeMarker.remove();placeMarker=null;}$('#modal').classList.remove('on');};
 $('#mCancel').onclick=close;
 $('#mSave').onclick=()=>{
  const ll=placeMarker.getLatLng();
  const arr=mine();
  arr.push({id:'m'+Date.now(),name:$('#mLoc').value.slice(0,16)||'내 화장실',locText:$('#mLoc').value,note:$('#mNote').value,hasPw:$('#mHasPw').checked,pw:$('#mPw').value,lat:ll.lat,lng:ll.lng});
  saveMine(arr);close();renderPins();
  showToast('✅ 내 화장실을 등록했어요','',null,2500);
 };
}
$('#addBtn').onclick=addModal;

/* 📍 내 주변 화장실 (현위치 기준 가까운 순) */
let nearLayer=L.layerGroup().addTo(map), userMk=null;
$('#nearBtn').onclick=()=>{
 if(!navigator.geolocation){showToast('위치 기능을 쓸 수 없어요','',null,3000);return;}
 $('#nearBtn').textContent='⏳';
 Promise.all([
  new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:10000,maximumAge:30000})),
  loadPublic(), loadPlaces()
 ]).then(([pos])=>{
  $('#nearBtn').textContent='📍'; go('map');
  const la=pos.coords.latitude, lo=pos.coords.longitude;
  lastUserPos=[la,lo];
  if(userMk)userMk.remove();
  userMk=L.marker([la,lo],{icon:L.divIcon({html:'<div style="width:16px;height:16px;border-radius:50%;background:#e0392f;border:3px solid #fff;box-shadow:0 0 0 4px rgba(224,57,47,.3)"></div>',className:'',iconSize:[16,16],iconAnchor:[8,8]})}).addTo(map);
  const cand=[];
  DATA.stations.forEach(s=>{if(s.lat)cand.push({cat:'station',name:nm(s)+' '+s.line+t('lineNo'),lat:s.lat,lng:s.lng,d:kmDist(la,lo,s.lat,s.lng),st:s});});
  publicToilets.forEach(p=>cand.push({cat:p.cat||'public',name:p.nm||'공중화장실',lat:p.lat,lng:p.lng,d:kmDist(la,lo,p.lat,p.lng),addr:p.addr,hr:p.hr}));
  (places||[]).forEach(p=>cand.push({cat:p.cat,name:p.nm,lat:p.lat,lng:p.lng,d:kmDist(la,lo,p.lat,p.lng),addr:p.addr}));
  mine().forEach(m=>cand.push({cat:'mine',name:m.name||'내 화장실',lat:m.lat,lng:m.lng,d:kmDist(la,lo,m.lat,m.lng),mineObj:m}));
  cand.sort((a,b)=>a.d-b.d);
  const near=cand.slice(0,30); window._near=near;
  nearLayer.clearLayers();
  near.forEach((c,i)=>{
   L.marker([c.lat,c.lng],{icon:MARKER_ICONS[c.cat]||MARKER_ICONS.public})
    .bindTooltip(c.name,{direction:'top'}).on('click',()=>showToiletInfo(c)).addTo(nearLayer);});
  map.setView([la,lo],16);
  showLegend(true);
  const rows=near.slice(0,15).map((c,i)=>{const dist=c.d<1?Math.round(c.d*1000)+'m':c.d.toFixed(1)+'km';
   return `<div class="card" style="cursor:pointer" onclick="showToiletInfo(window._near[${i}])">
     <div class="row"><span class="tag" style="background:${CAT[c.cat].c};color:#fff">${CAT[c.cat].emoji} ${CAT[c.cat].label}</span><b style="margin-left:auto;color:var(--accent)">${dist}</b></div>
     <div style="font-weight:700;margin-top:4px">${c.name}</div>${c.addr?`<div class="hint">${c.addr}</div>`:''}
     <div class="hint" style="color:var(--accent);margin-top:4px">탭하면 정보·별점·경로 ›</div></div>`;}).join('');
  const tip=TIPS[Math.floor((la*1000+lo*1000))%TIPS.length];
  const tipCard=`<div class="nudge" style="cursor:pointer" onclick="showTips()">💡 ${tip} <span style="color:var(--accent);font-weight:700">팁 더보기 ›</span></div>`;
  openSheet(`<div class="row"><h2>📍 내 주변 화장실</h2></div><p class="hint">가까운 순 · ${near.length}곳</p>${tipCard}${rows}`);
 }).catch(()=>{$('#nearBtn').textContent='📍';showToast('위치 권한을 허용해주세요','',null,3500);});
};
/* 화장실 정보 시트(카테고리별) + 인앱 도보 경로(OSRM) */
let lastUserPos=null;
let routeLayer=L.layerGroup().addTo(map);
function showToiletInfo(c){
 if(c.cat==='station'&&c.st){showStation(c.st);return;}
 if(c.cat==='mine'&&c.mineObj){showMine(c.mineObj);return;}
 // 공중/백화점/스타벅스 등 상세
 openSheet(`
  <div class="row"><h2>${c.name}</h2><span class="tag" style="background:${CAT[c.cat].c};color:#fff">${CAT[c.cat].emoji} ${CAT[c.cat].label}</span></div>
  ${(c.addr||c.hr)?`<div class="card">${c.addr?`<div class="kv"><b>주소</b><span>${c.addr}</span></div>`:''}${c.hr?`<div class="kv"><b>개방</b><span>${c.hr}</span></div>`:''}</div>`:''}
  <button class="btn" id="route-btn" style="background:#e0392f">🧭 여기로 도보 경로</button>
  <div id="tr-reviews" style="margin-top:14px"></div>
 `);
 $('#route-btn').onclick=()=>routeTo(c.lat,c.lng,c.name);
 if(window.TReviews)TReviews.render($('#tr-reviews'), 'pt_'+c.lat.toFixed(5)+'_'+c.lng.toFixed(5), c.name);
}
window.showToiletInfo=showToiletInfo;
function routeTo(lat,lng,name){
 if(!lastUserPos){showToast('먼저 📍버튼으로 현위치를 잡아주세요','',null,3500);return;}
 showToast('🚶 경로 계산 중…','',null,8000);
 const ula=lastUserPos[0], ulo=lastUserPos[1];
 fetch(`https://router.project-osrm.org/route/v1/foot/${ulo},${ula};${lng},${lat}?overview=full&geometries=geojson`)
  .then(r=>r.json()).then(d=>{
   if(d.code!=='Ok'||!d.routes.length){showToast('경로를 찾을 수 없어요','',null,3000);return;}
   const rt=d.routes[0], coords=rt.geometry.coordinates.map(x=>[x[1],x[0]]);
   routeLayer.clearLayers();
   L.polyline(coords,{color:'#e0392f',weight:6,opacity:.85,lineJoin:'round'}).addTo(routeLayer);
   L.circleMarker([ula,ulo],{radius:7,color:'#fff',weight:3,fillColor:'#e0392f',fillOpacity:1}).addTo(routeLayer);
   go('map'); closeSheet(); map.fitBounds(coords,{padding:[70,70]});
   const mins=Math.max(1,Math.round(rt.duration/60)), dist=rt.distance<1000?Math.round(rt.distance)+'m':(rt.distance/1000).toFixed(1)+'km';
   showToast(`🚶 ${name} · 도보 ${dist} 약 ${mins}분`, '경로 지우기', ()=>routeLayer.clearLayers(), 9000);
  }).catch(()=>showToast('경로 요청 실패','',null,3000));
}
window.routeTo=routeTo;

/* 💡 화장실 찾기 팁 */
const TIPS=[
 '지하철역 화장실은 대부분 개찰구 <b>밖(무료구역)</b>에 있어요. 게이트 안이면 다시 나오기 번거로우니 "게이트 밖"을 먼저 확인하세요.',
 '급할 땐 대형 프랜차이즈 카페(스타벅스 등)·백화점·대형마트 화장실이 개방적이에요.',
 '주유소와 대형 편의점(GS25·CU 등)도 화장실을 쓸 수 있는 곳이 많아요.',
 '지하상가·지하도와 연결된 역은 지상보다 화장실이 더 가까울 수 있어요.',
 '지하철역·공원 화장실은 대개 첫차~막차 시간에 열려 있어요.',
 '아이 동반·장애인은 <b>다목적(가족)화장실</b>을 찾으면 편해요. 역마다 위치가 달라요.',
 '기차역·터미널·고속도로 휴게소는 화장실이 크고 회전이 빨라요.',
 '평일 낮이라면 주민센터·구청 같은 관공서 화장실도 개방돼요.',
 '상가 화장실을 이용했다면 음료 한 잔 사주는 센스! ☕ (다음 사람을 위해)'
];
function showTips(){openSheet('<div class="row"><h2>💡 화장실 찾기 팁</h2></div>'+TIPS.map(x=>`<div class="card" style="font-size:14px;line-height:1.6">${x}</div>`).join(''));}
window.showTips=showTips;

function showLegend(on){const el=$('#legend');if(!on){el.classList.remove('on');return;}
 el.innerHTML=Object.keys(CAT).map(k=>`<div class="lg"><i style="background:${CAT[k].c}"></i>${CAT[k].label}</div>`).join('');
 el.classList.add('on');}

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
