// 화장실 평가/리뷰 모듈 (Firebase Firestore + 익명 인증, 블로그와 동일 프로젝트 재사용)
// window.TReviews.render(container, tid, title) 로 특정 화장실 리뷰 섹션 렌더.
// 컬렉션 toilet_reviews: {tid,rating(1~5),text,nick,uid,ts}. 읽기=REST runQuery(tid필터), 쓰기=SDK.
(function(){
 var cfg={apiKey:"AIzaSyDkV9Lngwtkw6s8o_ZusDRBL5qjkHOv9vA",authDomain:"planfully-b373d.firebaseapp.com",projectId:"planfully-b373d",appId:"1:566910734200:web:67f29f307dd52a90f4028d"};
 var ready=null, db=null, myUid=null, lastSent=0;
 function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
 function init(){
  if(ready)return ready;
  ready=Promise.all([
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'),
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'),
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js')
  ]).then(function(){
   firebase.initializeApp(cfg); db=firebase.firestore();
   try{db.settings({experimentalAutoDetectLongPolling:true,merge:true});}catch(e){}
   return firebase.auth().signInAnonymously().then(function(c){myUid=c.user.uid;}).catch(function(){});
  });
  return ready;
 }
 var esc=function(t){var d=document.createElement('div');d.textContent=t||'';return d.innerHTML;};
 function stars(n,cls){var s='';for(var i=1;i<=5;i++)s+='<span'+(cls?' data-v="'+i+'"':'')+' style="cursor:'+(cls?'pointer':'default')+'">'+(i<=n?'★':'☆')+'</span>';return s;}
 function fmt(ts){var w=ts?new Date(ts):new Date();return (w.getMonth()+1)+'.'+w.getDate()+' '+('0'+w.getHours()).slice(-2)+':'+('0'+w.getMinutes()).slice(-2);}

 // REST runQuery: tid로 필터
 function fetchReviews(tid){
  var url='https://firestore.googleapis.com/v1/projects/'+cfg.projectId+'/databases/(default)/documents:runQuery?key='+cfg.apiKey;
  var body={structuredQuery:{from:[{collectionId:'toilet_reviews'}],where:{fieldFilter:{field:{fieldPath:'tid'},op:'EQUAL',value:{stringValue:tid}}},limit:100}};
  return fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json();}).then(function(rows){
   var out=[];(rows||[]).forEach(function(x){if(!x.document)return;var f=x.document.fields||{};out.push({
    rating:parseInt((f.rating&&f.rating.integerValue)||0,10),
    text:(f.text&&f.text.stringValue)||'',nick:(f.nick&&f.nick.stringValue)||'익명',
    uid:(f.uid&&f.uid.stringValue)||'',ts:(f.ts&&f.ts.timestampValue)||'',
    id:x.document.name.split('/').pop()});});
   out.sort(function(a,b){return (b.ts||'').localeCompare(a.ts||'');});
   return out;
  }).catch(function(){return [];});
 }

 function render(container, tid, title){
  container.innerHTML='<div style="color:#9ca3af;font-size:13px;padding:8px 0">⭐ 평가 불러오는 중…</div>';
  init().then(function(){return fetchReviews(tid);}).then(function(list){
   var avg=list.length?(list.reduce(function(s,r){return s+r.rating;},0)/list.length):0;
   var sel=0; // 선택한 별점
   var head='<div style="display:flex;align-items:center;gap:8px;margin:4px 0 10px"><b style="font-size:15px">⭐ 화장실 평가</b>'
    +(list.length?'<span style="color:#e8a020;font-weight:800">'+avg.toFixed(1)+'</span><span style="color:#9ca3af;font-size:12px">('+list.length+')</span>':'<span style="color:#9ca3af;font-size:12px">첫 평가를 남겨보세요</span>')+'</div>';
   var form='<div class="card" style="background:#faf9f6">'
    +'<div style="font-size:13px;color:#7b828a;margin-bottom:4px">별점</div>'
    +'<div id="tr-stars" style="font-size:26px;color:#e8a020;letter-spacing:2px">'+stars(0,true)+'</div>'
    +'<input id="tr-nick" maxlength="16" placeholder="닉네임" style="margin-top:8px">'
    +'<textarea id="tr-text" maxlength="200" rows="2" placeholder="화장실 어땠나요? (청결·위치 등, 최대 200자)"></textarea>'
    +'<div style="display:flex;align-items:center;gap:8px"><span id="tr-msg" style="font-size:12px;color:#9ca3af;flex:1"></span>'
    +'<button class="btn" id="tr-send" style="width:auto;margin:0;padding:9px 18px">등록</button></div></div>';
   var items=list.map(function(r){
    var mine=r.uid&&r.uid===myUid;
    return '<div style="padding:9px 0;border-bottom:1px solid #f0f2f4">'
     +'<div style="display:flex;align-items:center;gap:6px"><span style="color:#e8a020">'+stars(r.rating)+'</span>'
     +'<b style="font-size:13px">'+esc(r.nick)+'</b><span style="color:#9ca3af;font-size:11px;margin-left:auto">'+fmt(r.ts)+'</span></div>'
     +(r.text?'<div style="font-size:14px;margin-top:3px">'+esc(r.text)+'</div>':'')
     +(mine?'<button data-del="'+r.id+'" style="border:0;background:none;color:#e0392f;font-size:12px;padding:2px 0;margin-top:2px">삭제</button>':'')
     +'</div>';
   }).join('');
   container.innerHTML=head+form+'<div id="tr-list" style="margin-top:6px">'+items+'</div>';
   // 별점 선택
   container.querySelectorAll('#tr-stars span').forEach(function(sp){sp.onclick=function(){sel=parseInt(sp.getAttribute('data-v'),10);container.querySelector('#tr-stars').innerHTML=stars(sel,true);container.querySelectorAll('#tr-stars span').forEach(function(s2){s2.onclick=sp.onclick;});
    // rebind after innerHTML replace
    var sps=container.querySelectorAll('#tr-stars span');sps.forEach(function(s3){s3.onclick=function(){sel=parseInt(s3.getAttribute('data-v'),10);var box=container.querySelector('#tr-stars');box.innerHTML=stars(sel,true);bindStars();};});
   };});
   function bindStars(){container.querySelectorAll('#tr-stars span').forEach(function(s3){s3.onclick=function(){sel=parseInt(s3.getAttribute('data-v'),10);container.querySelector('#tr-stars').innerHTML=stars(sel,true);bindStars();};});}
   bindStars();
   // 삭제
   container.querySelectorAll('[data-del]').forEach(function(b){b.onclick=function(){db.collection('toilet_reviews').doc(b.getAttribute('data-del')).delete().then(function(){render(container,tid,title);}).catch(function(){alert('삭제 실패');});};});
   // 등록
   container.querySelector('#tr-send').onclick=function(){
    var msg=container.querySelector('#tr-msg');
    if(!sel){msg.textContent='별점을 선택해주세요';return;}
    if(Date.now()-lastSent<20000){msg.textContent='잠시 후 다시 시도해주세요';return;}
    var nick=(container.querySelector('#tr-nick').value||'익명').slice(0,16);
    var text=(container.querySelector('#tr-text').value||'').slice(0,200);
    container.querySelector('#tr-send').disabled=true;
    db.collection('toilet_reviews').add({tid:tid,rating:sel,text:text,nick:nick,uid:myUid,ts:firebase.firestore.FieldValue.serverTimestamp()})
     .then(function(){lastSent=Date.now();render(container,tid,title);})
     .catch(function(e){msg.textContent='등록 실패 (규칙 게시 필요)';container.querySelector('#tr-send').disabled=false;});
   };
  });
 }
 window.TReviews={render:render};
})();
