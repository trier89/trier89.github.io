// planfully.ai.kr 익명 댓글 위젯 (Firebase Firestore + 익명 인증)
// 로그인 없이 닉네임+내용만. 서버 규칙으로 크기 제한(닉20/내용500), 30초 쿨다운, 수정 금지.
// 대댓글(단일 계층: 댓글→답글) 지원. 본인이 쓴 댓글·답글만 삭제 가능(익명 uid 일치).
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
    var myUid=null;   // 익명 인증 uid — 본인 글 삭제버튼 판단용

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

    function fmt(ts){var w=ts?new Date(ts):new Date();return (w.getMonth()+1)+'.'+w.getDate()+' '+('0'+w.getHours()).slice(-2)+':'+('0'+w.getMinutes()).slice(-2);}

    // 댓글 한 건 렌더(대댓글은 isReply=true → 들여쓰기)
    function renderItem(c,isReply){
      var mine=(c.uid&&c.uid===myUid);
      var wrap = isReply
        ? 'margin:8px 0 0 0;padding:8px 0 8px 12px;border-left:2px solid #3a3a37;'
        : 'border-bottom:1px solid #2e2e2c;padding:10px 0;';
      var h='<div class="pf-item" style="'+wrap+'">'
        +'<div style="font-size:13px;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
        +'<span>'+(isReply?'<span style="color:#7f7d77;">↳ </span>':'')+'<b style="color:#7ea6e0;">'+esc(c.nick||'익명')+'</b> <span style="color:#7f7d77;font-size:12px;">'+fmt(c.ts)+'</span></span>'
        +'<span style="flex:0 0 auto;display:flex;gap:6px;">'
        +(isReply?'':'<button class="pf-reply" data-id="'+esc(c.id)+'" style="background:transparent;border:1px solid #3e5a3e;color:#8fbf8f;font:inherit;font-size:11px;padding:2px 9px;border-radius:6px;cursor:pointer;">답글</button>')
        +(mine?'<button class="pf-del" data-id="'+esc(c.id)+'" style="background:transparent;border:1px solid #5a3a3a;color:#e07e7e;font:inherit;font-size:11px;padding:2px 9px;border-radius:6px;cursor:pointer;">삭제</button>':'')
        +'</span>'
        +'</div>'
        +'<div style="font-size:14.5px;color:#e8e6e3;margin-top:3px;white-space:pre-wrap;word-break:break-word;">'+esc(c.text||'')+'</div>';
      // 최상위 댓글엔 숨김 답글폼
      if(!isReply){
        h+='<div class="pf-replybox" data-for="'+esc(c.id)+'" style="display:none;margin:8px 0 2px 12px;padding-left:12px;border-left:2px solid #3a3a37;">'
          +'<div style="display:flex;gap:6px;flex-wrap:wrap;">'
          +'<input class="pf-rnick" maxlength="20" placeholder="닉네임" style="flex:0 0 110px;background:#1f1f1d;border:1px solid #3e3e3a;border-radius:8px;color:#e8e6e3;padding:7px 10px;font:inherit;font-size:13px;">'
          +'<textarea class="pf-rtext" maxlength="500" rows="1" placeholder="답글을 입력하세요" style="flex:1 1 200px;background:#1f1f1d;border:1px solid #3e3e3a;border-radius:8px;color:#e8e6e3;padding:7px 10px;font:inherit;font-size:13px;resize:vertical;"></textarea>'
          +'</div>'
          +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;">'
          +'<span class="pf-rmsg" style="font-size:12px;color:#9c9a94;"></span>'
          +'<button class="pf-rsend" data-id="'+esc(c.id)+'" style="background:#d97757;border:0;border-radius:7px;color:#1e1e2e;font:inherit;font-weight:700;font-size:13px;padding:6px 14px;cursor:pointer;">답글 등록</button>'
          +'</div>'
          +'</div>';
      }
      h+='</div>';
      return h;
    }

    function loadComments(){
      fetch(REST).then(function(r){return r.json();}).then(function(d){
        var all=(d.documents||[]).map(function(x){var f=x.fields||{};return {id:(x.name||'').split('/').pop(),page:gv(f.page),nick:gv(f.nick),text:gv(f.text),ts:gv(f.ts),uid:gv(f.uid),parent:gv(f.parent)};})
          .filter(function(c){return c.page===PAGE;});
        document.getElementById('pf-count').textContent='('+all.length+')';
        var tops=all.filter(function(c){return !c.parent;});
        var kids={};
        all.forEach(function(c){ if(c.parent){ (kids[c.parent]=kids[c.parent]||[]).push(c); }});
        tops.sort(function(a,b){return (b.ts||'').localeCompare(a.ts||'');});       // 최상위: 최신순
        Object.keys(kids).forEach(function(k){ kids[k].sort(function(a,b){return (a.ts||'').localeCompare(b.ts||'');}); }); // 답글: 오래된순(대화순)
        if(!tops.length){listEl.innerHTML='<div style="color:#9c9a94;font-size:14px;padding:8px 0;">첫 댓글을 남겨보세요 ✨</div>';return;}
        var html='';
        tops.forEach(function(c){
          html+=renderItem(c,false);
          (kids[c.id]||[]).forEach(function(r){ html+=renderItem(r,true); });
        });
        listEl.innerHTML=html;
      }).catch(function(err){listEl.innerHTML='<div style="color:#e07e7e;font-size:14px;">댓글을 불러오지 못했어요.</div>';console.warn(err);});
    }
    loadComments();
    // 익명 인증 완료되면 재렌더(본인 글에 삭제버튼 노출)
    auth.onAuthStateChanged(function(u){myUid=u?u.uid:null;loadComments();});

    function cooldownLeft(){var last=+localStorage.getItem('pf_last')||0;return COOL-(Date.now()-last);}

    // 이벤트 위임: 삭제 / 답글토글 / 답글등록
    listEl.addEventListener('click',function(e){
      var t=e.target; if(!t||!t.closest)return;
      // 삭제(댓글·답글 공통)
      var del=t.closest('.pf-del');
      if(del){
        var id=del.getAttribute('data-id');
        if(!id||!auth.currentUser)return;
        if(!confirm('이 글을 삭제할까요?'))return;
        del.disabled=true;del.textContent='삭제 중…';
        db.collection('comments').doc(id).delete().then(function(){loadComments();})
          .catch(function(err){del.disabled=false;del.textContent='삭제';alert('삭제하지 못했어요 — 본인이 작성한 글만 삭제할 수 있어요.');console.warn(err);});
        return;
      }
      // 답글 폼 토글
      var rep=t.closest('.pf-reply');
      if(rep){
        var pid=rep.getAttribute('data-id');
        var box=listEl.querySelector('.pf-replybox[data-for="'+pid+'"]');
        if(box){var open=box.style.display!=='none';box.style.display=open?'none':'block';if(!open){var ta=box.querySelector('.pf-rtext');if(ta)ta.focus();}}
        return;
      }
      // 답글 등록
      var rsend=t.closest('.pf-rsend');
      if(rsend){
        var parentId=rsend.getAttribute('data-id');
        var box2=listEl.querySelector('.pf-replybox[data-for="'+parentId+'"]');
        if(!box2)return;
        var nick=box2.querySelector('.pf-rnick').value.trim();
        var text=box2.querySelector('.pf-rtext').value.trim();
        var rmsg=box2.querySelector('.pf-rmsg');
        if(!auth.currentUser){rmsg.textContent='잠시 후 다시 시도해주세요.';return;}
        if(nick.length<1){rmsg.textContent='닉네임을 입력해주세요.';return;}
        if(text.length<1){rmsg.textContent='내용을 입력해주세요.';return;}
        if(cooldownLeft()>0){rmsg.textContent=Math.ceil(cooldownLeft()/1000)+'초 후에 다시 작성할 수 있어요.';return;}
        rsend.disabled=true;rmsg.textContent='등록 중…';
        db.collection('comments').add({
          page:PAGE, nick:nick.slice(0,20), text:text.slice(0,500), parent:parentId,
          uid:auth.currentUser.uid, ts:firebase.firestore.FieldValue.serverTimestamp()
        }).then(function(){
          localStorage.setItem('pf_last',Date.now());
          rmsg.textContent='답글이 등록됐어요 😊';setTimeout(loadComments,900);
        }).catch(function(e){rsend.disabled=false;rmsg.textContent='등록 실패 — 내용이 너무 길거나 잠시 후 시도해주세요.';console.warn(e);});
        return;
      }
    });

    document.getElementById('pf-send').onclick=function(){
      var nick=document.getElementById('pf-nick').value.trim();
      var text=document.getElementById('pf-text').value.trim();
      var msg=document.getElementById('pf-msg');
      if(!auth.currentUser){msg.textContent='잠시 후 다시 시도해주세요.';return;}
      if(nick.length<1){msg.textContent='닉네임을 입력해주세요.';return;}
      if(text.length<1){msg.textContent='내용을 입력해주세요.';return;}
      if(cooldownLeft()>0){msg.textContent=Math.ceil(cooldownLeft()/1000)+'초 후에 다시 작성할 수 있어요.';return;}
      var btn=document.getElementById('pf-send');btn.disabled=true;msg.textContent='등록 중…';
      // 최상위 댓글은 parent 필드를 아예 안 보냄 → 구 규칙에서도 그대로 동작(하위호환). 답글만 parent 사용.
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
