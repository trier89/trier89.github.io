// planfully.ai.kr 게임 리더보드 위젯 (Firebase Firestore + 익명 인증)
// window.PFRank.end(gameId, score, opts) 로 게임오버 시 호출.
//   opts: {label:'게임표시명', lowerBetter:false, unit:'점'}
// 읽기는 REST(공개), 쓰기는 SDK(익명 uid). 댓글 위젯과 같은 Firebase를 재사용하되
// 충돌 방지를 위해 별도의 'pfrank' named app 을 사용한다.
(function(){
  var cfg = {
    apiKey: "AIzaSyDkV9Lngwtkw6s8o_ZusDRBL5qjkHOv9vA",
    authDomain: "planfully-b373d.firebaseapp.com",
    projectId: "planfully-b373d",
    appId: "1:566910734200:web:67f29f307dd52a90f4028d"
  };
  var COOL = 30000;                       // 30초 쿨다운
  var LAST_KEY = 'pfrank_last';
  var NICK_KEY = 'pfrank_nick';
  var SDK = {
    app:'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
    auth:'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
    firestore:'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'
  };
  var REST = 'https://firestore.googleapis.com/v1/projects/'+cfg.projectId+'/databases/(default)/documents/scores?pageSize=300&key='+cfg.apiKey;

  var _ready=null, app=null, db=null, auth=null, myUid=null;

  function loadScript(src){
    return new Promise(function(res,rej){
      var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);
    });
  }
  // Firebase SDK 로드 + 익명 로그인 (한 번만). 별도 named app 사용 → 댓글 위젯의 default app 과 무충돌.
  function ensureSDK(){
    if(_ready) return _ready;
    _ready = Promise.resolve()
      .then(function(){ if(!window.firebase||!firebase.initializeApp) return loadScript(SDK.app); })
      .then(function(){ if(!window.firebase.auth) return loadScript(SDK.auth); })
      .then(function(){ if(!window.firebase.firestore) return loadScript(SDK.firestore); })
      .then(function(){
        var existing=(firebase.apps||[]).filter(function(a){return a.name==='pfrank';})[0];
        app = existing || firebase.initializeApp(cfg,'pfrank');
        db = firebase.firestore(app);
        try{ db.settings({experimentalAutoDetectLongPolling:true, merge:true}); }catch(e){}
        auth = firebase.auth(app);
        return auth.signInAnonymously();
      })
      .then(function(cred){
        myUid = (auth.currentUser&&auth.currentUser.uid) || (cred&&cred.user&&cred.user.uid) || null;
        return true;
      });
    return _ready;
  }

  // ── REST 응답 파서 ──
  function sv(f){ return (f&&f.stringValue!==undefined)?f.stringValue:''; }
  function nv(f){ if(!f)return 0; if(f.integerValue!==undefined)return +f.integerValue; if(f.doubleValue!==undefined)return +f.doubleValue; return 0; }
  function tv(f){ return (f&&f.timestampValue!==undefined)?f.timestampValue:''; }
  function esc(t){ var d=document.createElement('div');d.textContent=(t==null?'':t);return d.innerHTML; }

  function fetchScores(gameId){
    return fetch(REST).then(function(r){return r.json();}).then(function(d){
      return (d.documents||[]).map(function(x){
        var f=x.fields||{};
        return {id:(x.name||'').split('/').pop(),game:sv(f.game),nick:sv(f.nick),score:nv(f.score),uid:sv(f.uid),ts:tv(f.ts)};
      }).filter(function(s){return s.game===gameId;});
    });
  }

  // ── 스타일(1회 주입) ──
  var STYLE = ''
  +'.pfr-ov{position:fixed;inset:0;z-index:99999;background:rgba(10,10,13,.82);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"SF Mono","D2Coding",Menlo,Consolas,"Apple SD Gothic Neo",monospace;-webkit-tap-highlight-color:transparent;}'
  +'.pfr-box{position:relative;width:min(420px,94vw);max-height:88vh;overflow-y:auto;background:#262624;border:1px solid #3e3e3a;border-radius:16px;padding:22px 20px 20px;box-shadow:0 24px 70px rgba(0,0,0,.55);color:#e8e6e3;}'
  +'.pfr-x{position:absolute;top:12px;right:12px;width:30px;height:30px;background:transparent;border:1px solid #3e3e3a;border-radius:8px;color:#9c9a94;font-size:15px;line-height:1;cursor:pointer;padding:0;}'
  +'.pfr-x:hover{color:#e8e6e3;border-color:#5a5852;}'
  +'.pfr-h{color:#d97757;font-weight:800;font-size:18px;text-align:center;margin-bottom:4px;}'
  +'.pfr-score{text-align:center;font-size:34px;font-weight:800;color:#e0c07e;margin:6px 0 2px;letter-spacing:1px;}'
  +'.pfr-label{text-align:center;color:#9c9a94;font-size:13px;margin-bottom:16px;}'
  +'.pfr-nick{display:block;width:100%;background:#1f1f1d;border:1px solid #3e3e3a;border-radius:10px;color:#e8e6e3;padding:12px 14px;font:inherit;font-size:15px;margin-bottom:8px;}'
  +'.pfr-nick:focus{outline:none;border-color:#d97757;}'
  +'.pfr-msg{min-height:18px;font-size:12.5px;color:#9c9a94;text-align:center;margin-bottom:8px;}'
  +'.pfr-btns{display:flex;gap:8px;}'
  +'.pfr-submit{flex:1;background:#d97757;border:0;border-radius:10px;color:#fff;font:inherit;font-weight:800;padding:12px;cursor:pointer;font-size:15px;}'
  +'.pfr-submit:hover{background:#e89b7f;}.pfr-submit:disabled{opacity:.6;cursor:default;}'
  +'.pfr-skip{flex:0 0 auto;background:transparent;border:1px solid #3e3e3a;border-radius:10px;color:#9c9a94;font:inherit;padding:12px 16px;cursor:pointer;font-size:14px;}'
  +'.pfr-skip:hover{color:#e8e6e3;border-color:#5a5852;}'
  +'.pfr-rank{margin-top:16px;}'
  +'.pfr-rank-h{color:#d97757;font-weight:800;font-size:14px;margin-bottom:10px;display:flex;align-items:center;gap:6px;}'
  +'.pfr-row{display:flex;align-items:center;gap:10px;padding:8px 8px;border-radius:8px;font-size:14px;border-bottom:1px solid #2e2e2c;}'
  +'.pfr-row.me{background:#2a201c;border:1px solid #d97757;}'
  +'.pfr-rk{flex:0 0 26px;text-align:center;color:#9c9a94;font-weight:700;}'
  +'.pfr-nm{flex:1 1 auto;color:#e8e6e3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
  +'.pfr-sc{flex:0 0 auto;color:#e0c07e;font-weight:700;}'
  +'.pfr-empty{color:#9c9a94;font-size:13px;text-align:center;padding:14px 0;}'
  +'.pfr-close2{display:block;width:100%;margin-top:14px;background:transparent;border:1px solid #3e3e3a;border-radius:10px;color:#e8e6e3;font:inherit;padding:11px;cursor:pointer;}'
  +'.pfr-close2:hover{border-color:#5a5852;}';

  var styleInjected=false;
  function injectStyle(){ if(styleInjected)return; var st=document.createElement('style');st.textContent=STYLE;document.head.appendChild(st);styleInjected=true; }

  var root=null;
  function closeModal(){ if(root&&root.parentNode)root.parentNode.removeChild(root); root=null; }

  function medal(rk){ return rk===1?'🥇':rk===2?'🥈':rk===3?'🥉':rk; }

  // ── 랭킹 렌더 ──
  function renderRanking(container, gameId, opts, highlightId){
    container.innerHTML='<div class="pfr-rank-h">🏆 '+esc(opts.label||'랭킹')+' TOP 10</div><div class="pfr-empty">랭킹 불러오는 중…</div>';
    fetchScores(gameId).then(function(arr){
      arr.sort(function(a,b){
        if(a.score!==b.score) return opts.lowerBetter?(a.score-b.score):(b.score-a.score);
        return (a.ts||'').localeCompare(b.ts||''); // 동점이면 먼저 등록한 사람 우위
      });
      var top=arr.slice(0,10);
      var h='<div class="pfr-rank-h">🏆 '+esc(opts.label||'랭킹')+' TOP 10</div>';
      if(!top.length){
        h+='<div class="pfr-empty">아직 기록이 없어요. 첫 주인공이 되어보세요 ✨</div>';
      } else {
        top.forEach(function(s,i){
          var mine=(highlightId&&s.id===highlightId)||(myUid&&s.uid===myUid);
          h+='<div class="pfr-row'+(mine?' me':'')+'">'
            +'<span class="pfr-rk">'+medal(i+1)+'</span>'
            +'<span class="pfr-nm">'+esc(s.nick||'익명')+'</span>'
            +'<span class="pfr-sc">'+s.score+(opts.unit||'')+'</span>'
            +'</div>';
        });
      }
      h+='<button class="pfr-close2">닫기</button>';
      container.innerHTML=h;
      var cb=container.querySelector('.pfr-close2'); if(cb)cb.onclick=closeModal;
    }).catch(function(err){
      container.innerHTML='<div class="pfr-rank-h">🏆 '+esc(opts.label||'랭킹')+' TOP 10</div>'
        +'<div class="pfr-empty">랭킹을 불러오지 못했어요.</div>'
        +'<button class="pfr-close2">닫기</button>';
      var cb=container.querySelector('.pfr-close2'); if(cb)cb.onclick=closeModal;
      console.warn('[PFRank] fetch',err);
    });
  }

  function end(gameId, score, opts){
    opts=opts||{};
    if(opts.unit===undefined)opts.unit='점';
    score=Number(score); if(!isFinite(score))score=0;
    score=Math.round(score);
    if(!gameId)return;
    injectStyle();
    ensureSDK().catch(function(e){console.warn('[PFRank] sdk',e);}); // 미리 로그인 워밍

    closeModal();
    root=document.createElement('div');
    root.className='pfr-ov';
    root.innerHTML=''
      +'<div class="pfr-box">'
      +'<button class="pfr-x" aria-label="닫기">✕</button>'
      +'<div class="pfr-h">게임 종료!</div>'
      +'<div class="pfr-score">'+score+esc(opts.unit)+'</div>'
      +'<div class="pfr-label">'+esc(opts.label||'')+'</div>'
      +'<div class="pfr-form">'
      +'<input class="pfr-nick" maxlength="20" placeholder="닉네임 (최대 20자)">'
      +'<div class="pfr-msg"></div>'
      +'<div class="pfr-btns"><button class="pfr-submit">🏆 등록</button><button class="pfr-skip">건너뛰기</button></div>'
      +'</div>'
      +'<div class="pfr-rank"></div>'
      +'</div>';
    document.body.appendChild(root);

    var box=root.querySelector('.pfr-box');
    var nickEl=root.querySelector('.pfr-nick');
    var msgEl=root.querySelector('.pfr-msg');
    var submitEl=root.querySelector('.pfr-submit');
    var skipEl=root.querySelector('.pfr-skip');
    var formEl=root.querySelector('.pfr-form');
    var rankEl=root.querySelector('.pfr-rank');

    try{ nickEl.value=(localStorage.getItem(NICK_KEY)||'').slice(0,20); }catch(e){}
    setTimeout(function(){ try{nickEl.focus();}catch(e){} },50);

    root.querySelector('.pfr-x').onclick=closeModal;
    root.addEventListener('mousedown',function(e){ if(e.target===root)closeModal(); });

    skipEl.onclick=function(){ formEl.style.display='none'; renderRanking(rankEl,gameId,opts,null); };

    function doSubmit(){
      var nick=(nickEl.value||'').trim();
      if(nick.length<1){ msgEl.textContent='닉네임을 입력해주세요.'; return; }
      nick=nick.slice(0,20);
      var last=0; try{ last=+localStorage.getItem(LAST_KEY)||0; }catch(e){}
      if(Date.now()-last<COOL){ msgEl.textContent=Math.ceil((COOL-(Date.now()-last))/1000)+'초 후에 다시 등록할 수 있어요.'; return; }
      submitEl.disabled=true; msgEl.textContent='등록 중…';
      try{ localStorage.setItem(NICK_KEY,nick); }catch(e){}
      ensureSDK().then(function(){
        return db.collection('scores').add({
          game:String(gameId).slice(0,30), nick:nick, score:score, uid:myUid,
          ts:firebase.firestore.FieldValue.serverTimestamp()
        });
      }).then(function(ref){
        try{ localStorage.setItem(LAST_KEY,Date.now()); }catch(e){}
        formEl.style.display='none';
        renderRanking(rankEl,gameId,opts, ref&&ref.id);
      }).catch(function(err){
        submitEl.disabled=false;
        msgEl.textContent='등록 실패 — 잠시 후 다시 시도해주세요.';
        console.warn('[PFRank] submit',err);
      });
    }
    submitEl.onclick=doSubmit;
    nickEl.addEventListener('keydown',function(e){ if(e.key==='Enter')doSubmit(); });
  }

  window.PFRank={ end:end };
})();
