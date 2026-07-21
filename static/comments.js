// planfully.ai.kr 익명 댓글 위젯 (Firebase Firestore + 익명 인증)
// 로그인 없이 닉네임+내용만. 서버 규칙으로 크기 제한(닉20/내용500), 30초 쿨다운, 수정·삭제 금지.
(function(){
  var PAGE = location.pathname.replace(/\/$/, '') || '/';
  var mount = document.getElementById('planfully-comments');
  if (!mount) return;

  var cfg = {
    apiKey: "AIzaSyDkV9Lngwtkw6s8o_ZusDRBL5qjkHOv9vA",
    authDomain: "planfully-b373d.firebaseapp.com",
    projectId: "planfully-b373d",
    appId: "1:566910734200:web:67f29f307dd52a90f4028d"
  };

  function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}

  mount.innerHTML = '<div style="color:#9c9a94;font-size:14px;padding:12px 0;">💬 댓글 불러오는 중…</div>';

  Promise.all([
    load('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'),
    load('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'),
    load('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js')
  ]).then(function(){
    firebase.initializeApp(cfg);
    var db = firebase.firestore();
    try{ db.settings({experimentalAutoDetectLongPolling:true, merge:true}); }catch(e){}
    var auth = firebase.auth();
    auth.signInAnonymously().catch(function(e){console.warn('anon auth',e);});

    var esc=function(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;};
    var COOL=30000;

    mount.innerHTML =
      '<div style="border-top:1px dashed #3e3e3a;margin-top:28px;padding-top:20px;">'
      +'<div style="font-weight:700;color:#d97757;font-size:16px;margin-bottom:12px;">💬 댓글 <span id="pf-count" style="color:#9c9a94;font-weight:400;font-size:13px;"></span></div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">'
      +'<input id="pf-nick" maxlength="20" placeholder="닉네임" style="flex:0 0 130px;background:#1f1f1d;border:1px solid #3e3e3a;border-radius:8px;color:#e8e6e3;padding:9px 12px;font:inherit;font-size:14px;">'
      +'<textarea id="pf-text" maxlength="500" rows="2" placeholder="따뜻한 댓글을 남겨주세요 (최대 500자)" style="flex:1 1 240px;background:#1f1f1d;border:1px solid #3e3e3a;border-radius:8px;color:#e8e6e3;padding:9px 12px;font:inherit;font-size:14px;resize:vertical;"></textarea>'
      +'</div>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;">'
      +'<span id="pf-msg" style="font-size:12.5px;color:#9c9a94;"></span>'
      +'<button id="pf-send" style="background:#d97757;border:0;border-radius:8px;color:#1e1e2e;font:inherit;font-weight:700;padding:9px 20px;cursor:pointer;">등록</button>'
      +'</div>'
      +'<div id="pf-list" style="margin-top:18px;"></div>'
      +'</div>';

    var listEl=document.getElementById('pf-list');
    // 읽기는 REST(안정) — SDK Listen 스트림은 일부 네트워크서 막힘. 쓰기만 SDK.
    var REST='https://firestore.googleapis.com/v1/projects/'+cfg.projectId+'/databases/(default)/documents/comments?pageSize=300&key='+cfg.apiKey;
    function gv(f){f=f||{};return f.stringValue!==undefined?f.stringValue:(f.timestampValue!==undefined?f.timestampValue:'');}
    function loadComments(){
      fetch(REST).then(function(r){return r.json();}).then(function(d){
        var arr=(d.documents||[]).map(function(x){var f=x.fields||{};return {page:gv(f.page),nick:gv(f.nick),text:gv(f.text),ts:gv(f.ts)};})
          .filter(function(c){return c.page===PAGE;});
        arr.sort(function(a,b){return (b.ts||'').localeCompare(a.ts||'');});
        document.getElementById('pf-count').textContent='('+arr.length+')';
        if(!arr.length){listEl.innerHTML='<div style="color:#9c9a94;font-size:14px;padding:8px 0;">첫 댓글을 남겨보세요 ✨</div>';return;}
        var html='';
        arr.forEach(function(c){
          var when=c.ts?new Date(c.ts):new Date();
          var ds=(when.getMonth()+1)+'.'+when.getDate()+' '+('0'+when.getHours()).slice(-2)+':'+('0'+when.getMinutes()).slice(-2);
          html+='<div style="border-bottom:1px solid #2e2e2c;padding:10px 0;">'
              +'<div style="font-size:13px;"><b style="color:#7ea6e0;">'+esc(c.nick||'익명')+'</b> <span style="color:#7f7d77;font-size:12px;">'+ds+'</span></div>'
              +'<div style="font-size:14.5px;color:#e8e6e3;margin-top:3px;white-space:pre-wrap;word-break:break-word;">'+esc(c.text||'')+'</div>'
              +'</div>';
        });
        listEl.innerHTML=html;
      }).catch(function(err){listEl.innerHTML='<div style="color:#e07e7e;font-size:14px;">댓글을 불러오지 못했어요.</div>';console.warn(err);});
    }
    loadComments();

    document.getElementById('pf-send').onclick=function(){
      var nick=document.getElementById('pf-nick').value.trim();
      var text=document.getElementById('pf-text').value.trim();
      var msg=document.getElementById('pf-msg');
      if(!auth.currentUser){msg.textContent='잠시 후 다시 시도해주세요.';return;}
      if(nick.length<1){msg.textContent='닉네임을 입력해주세요.';return;}
      if(text.length<1){msg.textContent='내용을 입력해주세요.';return;}
      var last=+localStorage.getItem('pf_last')||0;
      if(Date.now()-last<COOL){msg.textContent=Math.ceil((COOL-(Date.now()-last))/1000)+'초 후에 다시 작성할 수 있어요.';return;}
      var btn=document.getElementById('pf-send');btn.disabled=true;msg.textContent='등록 중…';
      db.collection('comments').add({
        page:PAGE, nick:nick.slice(0,20), text:text.slice(0,500),
        uid:auth.currentUser.uid, ts:firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        localStorage.setItem('pf_last',Date.now());
        document.getElementById('pf-text').value='';
        msg.textContent='등록됐어요! 고마워요 😊';btn.disabled=false;setTimeout(loadComments,900);
      }).catch(function(e){msg.textContent='등록 실패 — 내용이 너무 길거나 잠시 후 시도해주세요.';btn.disabled=false;console.warn(e);});
    };
  }).catch(function(e){mount.innerHTML='<div style="color:#9c9a94;font-size:14px;">댓글 기능을 불러오지 못했어요.</div>';console.warn(e);});
})();
