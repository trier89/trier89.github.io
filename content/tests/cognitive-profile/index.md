---
title: "인지능력 프로필 테스트 — 언어이해·지각추론·작업기억·처리속도 4지표 (무료)"
emoji: "🧠"
description: "언어이해·지각추론·작업기억·처리속도 네 가지 인지 지표로 내 머리가 어떤 방식으로 잘 돌아가는지 알아보는 무료 테스트. 숫자 거꾸로 외우기·기호 짝짓기 실전 과제 포함. 회원가입 없음, 재미로 보는 자체 제작 테스트."
date: 2026-09-08
slug: "cognitive-profile"
aliases: ["/tools/cognitive-profile/"]
categories: ["심리테스트"]
tags: ["인지능력 테스트", "지능 유형 테스트", "작업기억 테스트", "처리속도 테스트", "무료 심리테스트"]
toc: false
readingTime: false
---

지능을 하나의 숫자로 줄이는 대신, **언어이해 · 지각추론 · 작업기억 · 처리속도** 네 가지 축으로 나누어 **내 머리가 어떤 방식으로 잘 돌아가는지** 프로필을 그려보는 테스트입니다. 객관식만 푸는 게 아니라 **숫자를 거꾸로 외우고**, **60초 동안 기호를 짝짓는** 실전 과제가 들어 있어요. 재미로 보는 **자체 제작 테스트**로, 웩슬러(WAIS·WISC) 등 정식 지능검사가 아니며 IQ 점수를 내지 않습니다. 답변은 저장·전송되지 않습니다.

<div id="cg" style="max-width:640px;margin:0 auto;">
  <div id="cg-intro" style="text-align:center;">
    <div style="margin:0 0 14px;padding:12px 14px;border-radius:10px;background:#fef3c7;color:#92400e;font-size:13.5px;line-height:1.6;">⚠️ 재미로 보는 <b>자체 제작 테스트</b>예요. 웩슬러(WAIS·WISC) 등 <b>정식 지능검사가 아니며</b>, IQ 점수를 산출하지 않습니다. 임상적 진단·영재 판별과는 관계가 없어요.</div>
    <div style="text-align:left;margin:0 0 16px;padding:14px;border-radius:10px;background:#ecfdf5;font-size:14px;line-height:1.7;color:#065f46;">
      <b>4개 파트로 진행돼요</b><br>
      1️⃣ 언어이해 — 말과 개념을 다루는 힘 (8문항)<br>
      2️⃣ 지각추론 — 규칙과 패턴을 찾는 힘 (8문항)<br>
      3️⃣ 작업기억 — 머릿속에 붙잡아 두는 힘 (숫자 거꾸로 말하기)<br>
      4️⃣ 처리속도 — 단순 작업을 빠르고 정확히 (60초 기호 짝짓기)<br>
      <span style="color:#047857;">※ 3·4번은 실제로 해보는 과제예요. 조용한 곳에서 하시면 좋아요.</span>
    </div>
    <button id="cg-start" style="padding:16px 40px;border:0;border-radius:12px;background:#059669;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작하기 (약 7분)</button>
  </div>
  <div id="cg-stage" style="display:none;">
    <div style="height:8px;background:#e5e7eb;border-radius:4px;margin-bottom:8px;"><div id="cg-bar" style="height:8px;width:0%;background:#059669;border-radius:4px;transition:width .3s;"></div></div>
    <div id="cg-phase" style="font-size:13px;color:#6b7280;margin-bottom:14px;font-weight:700;"></div>
    <div id="cg-body"></div>
  </div>
  <div id="cg-result" style="display:none;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var VCI=[
["'지우개'와 '삭제 버튼'의 공통점은?",["있던 것을 없앤다","손으로 쥔다","글씨를 쓴다","값이 싸다"],0],
["'약속'과 '계약'에 공통으로 들어 있는 것은?",["지키기로 한 합의","돈이 오간다","문서로 남는다","법이 강제한다"],0],
["\"그 사람 손이 크다\"는 말의 뜻은?",["씀씀이가 넉넉하다","실제로 손이 크다","일을 잘한다","욕심이 많다"],0],
["나침반 : 방향 = 온도계 : ?",["온도","날씨","계절","바람"],0],
["'희소하다'와 뜻이 가장 가까운 말은?",["드물다","값지다","작다","낡다"],0],
["다음 중 성격이 다른 하나는?",["책상","기쁨","슬픔","분노"],0],
["'설상가상'이 뜻하는 상황은?",["나쁜 일에 나쁜 일이 겹침","눈이 많이 내림","좋은 일이 이어짐","위기를 넘김"],0],
["'가설'이 '이론'과 다른 점은?",["아직 검증되지 않았다","더 복잡하다","숫자로 되어 있다","오래되었다"],0]];
var PRI=[
["2, 4, 8, 16, ?",["32","24","20","18"],0],
["1, 1, 2, 3, 5, 8, ?",["13","11","10","16"],0],
["81, 64, 49, 36, ?",["25","24","30","16"],0],
["A, C, F, J, ?",["O","N","M","P"],0],
["3, 6, 5, 10, 9, 18, ?",["17","20","16","19"],0],
["● ○ ● ● ○ ● ● ● ○ 다음에 올 것은?",["●","○","●●","○○"],0],
["2, 3, 5, 7, 11, ?",["13","12","14","15"],0],
["정사각형을 시계 방향으로 90도씩 4번 돌리면?",["처음과 같다","좌우가 뒤집힌다","위아래가 뒤집힌다","마름모가 된다"],0]];
var WM_LENS=[3,3,4,4,5,5,6,6,7,7];
var SYMS=["◆","▲","●","■","★","✚"];
var st={vi:0,vc:0,pi:0,pc:0,wi:0,wc:0,ps:0,pt:0,seq:[],psTimer:null,psLeft:60,psCur:0};
var TOTAL=8+8+10+1;
function prog(n){$("cg-bar").style.width=Math.round(n/TOTAL*100)+"%";}
function done(){return st.vi+st.pi+st.wi+(st.ps>0?1:0);}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function mcq(list,idx,phase,onPick){
  $("cg-phase").textContent=phase;
  var q=list[idx];
  var h='<div style="font-size:13px;color:#9ca3af;margin-bottom:6px;">'+(idx+1)+' / '+list.length+'</div>';
  h+='<div style="font-size:19px;font-weight:700;line-height:1.6;min-height:56px;">'+esc(q[0])+'</div>';
  h+='<div style="margin-top:16px;display:flex;flex-direction:column;gap:10px;">';
  var order=[0,1,2,3];
  for(var i=order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=order[i];order[i]=order[j];order[j]=t;}
  order.forEach(function(oi){
    h+='<button class="cg-opt" data-i="'+oi+'" style="padding:14px 16px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-size:16px;text-align:left;cursor:pointer;line-height:1.5;">'+esc(q[1][oi])+'</button>';
  });
  h+='</div>';
  $("cg-body").innerHTML=h;
  var btns=$("cg-body").getElementsByClassName("cg-opt");
  for(var k=0;k<btns.length;k++){
    btns[k].onclick=function(){onPick(parseInt(this.getAttribute("data-i"),10)===q[2]);};
  }
  prog(done());
}
function stepV(){
  if(st.vi>=VCI.length){stepP();return;}
  mcq(VCI,st.vi,"1️⃣ 언어이해",function(ok){if(ok)st.vc++;st.vi++;stepV();});
}
function stepP(){
  if(st.pi>=PRI.length){introWM();return;}
  mcq(PRI,st.pi,"2️⃣ 지각추론",function(ok){if(ok)st.pc++;st.pi++;stepP();});
}
function introWM(){
  $("cg-phase").textContent="3️⃣ 작업기억";
  $("cg-body").innerHTML='<div style="padding:18px;border-radius:12px;background:#ecfdf5;font-size:15px;line-height:1.8;color:#065f46;">숫자가 잠깐 나타났다 사라집니다.<br>사라진 뒤 <b>거꾸로</b> 입력하세요.<br><span style="color:#047857;">예) 화면에 <b>4 7 2</b> → 입력 <b>274</b></span><br>총 10회, 자릿수가 점점 늘어납니다.</div><button id="cg-wmgo" style="margin-top:18px;width:100%;padding:15px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:17px;cursor:pointer;">시작</button>';
  $("cg-wmgo").onclick=function(){st.wi=0;stepWM();};
}
function stepWM(){
  if(st.wi>=WM_LENS.length){introPS();return;}
  var n=WM_LENS[st.wi];
  st.seq=[];
  for(var i=0;i<n;i++){st.seq.push(Math.floor(Math.random()*10));}
  $("cg-phase").textContent="3️⃣ 작업기억 — "+(st.wi+1)+" / "+WM_LENS.length;
  $("cg-body").innerHTML='<div style="text-align:center;padding:34px 0;"><div style="font-size:13px;color:#9ca3af;margin-bottom:14px;">외우세요 ('+n+'자리)</div><div id="cg-digits" style="font-size:46px;font-weight:800;letter-spacing:14px;color:#111827;min-height:60px;">'+st.seq.join(" ")+'</div></div>';
  prog(done());
  setTimeout(askWM,700+n*750);
}
function askWM(){
  var n=st.seq.length;
  $("cg-body").innerHTML='<div style="text-align:center;padding:20px 0;"><div style="font-size:15px;font-weight:700;margin-bottom:14px;">거꾸로 입력하세요</div><input id="cg-wmin" inputmode="numeric" autocomplete="off" maxlength="'+n+'" style="width:220px;padding:14px;font-size:26px;text-align:center;letter-spacing:8px;border:2px solid #059669;border-radius:10px;outline:none;"><div><button id="cg-wmok" style="margin-top:16px;padding:13px 40px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">확인</button></div></div>';
  var inp=$("cg-wmin");inp.focus();
  var submit=function(){
    var want=st.seq.slice().reverse().join("");
    if(inp.value.replace(/\D/g,"")===want)st.wc++;
    st.wi++;stepWM();
  };
  $("cg-wmok").onclick=submit;
  inp.onkeydown=function(e){if(e.key==="Enter")submit();};
}
function introPS(){
  $("cg-phase").textContent="4️⃣ 처리속도";
  var key='<div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:14px 0;">';
  SYMS.forEach(function(s,i){key+='<div style="width:52px;text-align:center;border:2px solid #059669;border-radius:8px;padding:6px 0;background:#fff;"><div style="font-size:22px;line-height:1.1;">'+s+'</div><div style="font-size:15px;font-weight:800;color:#059669;">'+(i+1)+'</div></div>';});
  key+='</div>';
  $("cg-body").innerHTML='<div style="padding:18px;border-radius:12px;background:#ecfdf5;font-size:15px;line-height:1.8;color:#065f46;">아래 <b>대응표</b>를 보고, 화면에 뜨는 기호에 맞는 숫자를 누르세요.<br><b>60초</b> 동안 맞힌 개수를 셉니다. 표는 계속 보여요.</div>'+key+'<button id="cg-psgo" style="margin-top:12px;width:100%;padding:15px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:17px;cursor:pointer;">시작 (60초)</button>';
  $("cg-psgo").onclick=startPS;
}
function startPS(){
  st.ps=0;st.pt=0;st.psLeft=60;
  var key='<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;">';
  SYMS.forEach(function(s,i){key+='<div style="width:46px;text-align:center;border:1px solid #a7f3d0;border-radius:6px;padding:4px 0;background:#f0fdf4;"><div style="font-size:18px;line-height:1.1;">'+s+'</div><div style="font-size:13px;font-weight:800;color:#059669;">'+(i+1)+'</div></div>';});
  key+='</div>';
  var pad='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px;">';
  for(var i=1;i<=6;i++){pad+='<button class="cg-pk" data-n="'+i+'" style="padding:18px 0;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-size:22px;font-weight:800;cursor:pointer;">'+i+'</button>';}
  pad+='</div>';
  $("cg-body").innerHTML=key+'<div style="text-align:center;"><div id="cg-time" style="font-size:14px;font-weight:800;color:#059669;">60초</div><div id="cg-sym" style="font-size:64px;line-height:1.3;min-height:88px;"></div><div id="cg-cnt" style="font-size:13px;color:#9ca3af;">맞힘 0</div></div>'+pad;
  var btns=$("cg-body").getElementsByClassName("cg-pk");
  for(var k=0;k<btns.length;k++){
    btns[k].onclick=function(){
      var n=parseInt(this.getAttribute("data-n"),10);
      st.pt++;
      if(n===st.psCur+1){st.ps++;}
      $("cg-cnt").textContent="맞힘 "+st.ps;
      nextSym();
    };
  }
  nextSym();
  st.psTimer=setInterval(function(){
    st.psLeft--;
    if(st.psLeft<=0){clearInterval(st.psTimer);result();return;}
    $("cg-time").textContent=st.psLeft+"초";
  },1000);
  prog(done());
}
function nextSym(){
  st.psCur=Math.floor(Math.random()*SYMS.length);
  $("cg-sym").textContent=SYMS[st.psCur];
}
var IDX={
 V:{n:"언어이해",e:"💬",d:"말과 개념을 다루는 힘. 어휘·비유·관계를 빠르게 잡아냅니다.",hi:"설명을 잘하고, 추상적인 개념을 말로 정리하는 데 강해요. 글·기획·상담처럼 언어가 도구인 일에서 힘을 발휘합니다.",lo:"머릿속엔 있는데 말로 옮기는 데 시간이 걸릴 수 있어요. 읽고 요약해 보는 습관이 잘 듣습니다."},
 P:{n:"지각추론",e:"🧩",d:"규칙과 패턴을 찾아내는 힘. 처음 보는 문제의 구조를 파악합니다.",hi:"경험이 없는 문제에서도 규칙을 먼저 찾아냅니다. 설계·분석·문제해결에 강해요.",lo:"낯선 규칙을 처음부터 세우는 건 부담스러울 수 있어요. 예시를 여러 개 놓고 비교하면 훨씬 잘 풀립니다."},
 W:{n:"작업기억",e:"🧠",d:"여러 정보를 머릿속에 붙잡아 두고 조작하는 힘.",hi:"암산·복잡한 지시 수행·여러 갈래를 동시에 따라가는 데 강해요. 회의에서 흐름을 놓치지 않습니다.",lo:"한꺼번에 여러 개를 들고 있으면 흘러내릴 수 있어요. 메모와 체크리스트가 실제로 성과를 크게 올려줍니다."},
 S:{n:"처리속도",e:"⚡",d:"단순한 판단을 빠르고 정확하게 반복하는 힘.",hi:"반복 작업을 빠르게 쳐냅니다. 마감·실무 처리량에서 강점이 나와요.",lo:"속도보다 정확도로 승부하는 편이에요. 급하게 몰아치는 환경보다 충분히 생각할 시간이 있을 때 훨씬 잘합니다."}};
var ORDER=["V","P","W","S"];
var CODE={V:"V",P:"P",W:"W",S:"S"};
function render(top,shared,sc){
  var t=IDX[top];
  var h='<div style="text-align:center;padding:26px 18px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);">';
  h+='<div style="font-size:13px;color:#047857;font-weight:700;">'+(shared?"친구의":"내")+' 인지 프로필 강점</div>';
  h+='<div style="font-size:50px;margin:8px 0;">'+t.e+'</div>';
  h+='<div style="font-size:26px;font-weight:800;color:#065f46;">'+t.n+'</div>';
  h+='<div style="margin-top:8px;font-size:15px;color:#065f46;line-height:1.7;">'+t.d+'</div></div>';
  if(!shared){
    h+='<div style="margin-top:20px;">';
    ORDER.forEach(function(k){
      var p=sc[k];
      h+='<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;"><span>'+IDX[k].e+' '+IDX[k].n+'</span><span style="color:#059669;font-weight:800;">'+p+'</span></div><div style="height:10px;background:#d1fae5;border-radius:5px;overflow:hidden;"><div style="height:10px;width:'+p+'%;background:#059669;border-radius:5px;"></div></div></div>';
    });
    h+='</div>';
    var lowk=ORDER.slice().sort(function(a,b){return sc[a]-sc[b];})[0];
    h+='<div style="margin-top:8px;padding:16px;border-radius:12px;background:#f0fdf4;font-size:15px;line-height:1.8;color:#065f46;"><b>'+t.e+' 강점 — '+t.n+'</b><br>'+t.hi+'<br><br><b>'+IDX[lowk].e+' 보완하면 좋은 축 — '+IDX[lowk].n+'</b><br>'+IDX[lowk].lo+'</div>';
    var spread=Math.max(sc.V,sc.P,sc.W,sc.S)-Math.min(sc.V,sc.P,sc.W,sc.S);
    var shape=spread<=20?"네 축이 고르게 발달한 <b>균형형</b>이에요. 어느 상황에서도 크게 흔들리지 않는 대신, 한 분야에서 압도적인 무기를 만들려면 의식적으로 한 축을 파고들 필요가 있어요.":(spread>=45?"축 사이 편차가 큰 <b>뾰족형</b>이에요. 잘하는 방식으로 일할 때 성과가 확 올라갑니다. 약한 축은 보완하려 애쓰기보다 도구와 습관으로 대신하는 편이 효율적이에요.":"강점과 약점이 자연스럽게 나뉜 <b>일반형</b>이에요. 강한 축을 주 무기로 쓰고 약한 축은 메모·체크리스트 같은 장치로 받쳐주면 잘 굴러갑니다.");
    h+='<div style="margin-top:12px;padding:16px;border-radius:12px;background:#eff6ff;font-size:15px;line-height:1.8;">📐 '+shape+'</div>';
    h+='<div style="margin-top:14px;padding:14px;border-radius:10px;background:#fef3c7;color:#92400e;font-size:13.5px;line-height:1.65;">⚠️ 이 결과는 <b>재미로 보는 자체 제작 테스트</b>의 결과예요. 웩슬러(WAIS·WISC) 등 정식 지능검사가 아니고 IQ 점수도 아닙니다. 문항 수가 적고 기기·환경(화면 크기, 터치 반응)에 따라 특히 처리속도 점수가 크게 달라져요. 진단이나 능력 판별로 쓰지 마세요.</div>';
  }
  h+='<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="cg-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button><button id="cg-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>';
  h+='<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/iq-test/">IQ 테스트</a> · <a href="/tests/temperament-character/">기질·성격 유형</a></div>';
  h+='<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미와 자기이해를 위한 자가진단이며 전문·임상 검사가 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 계산돼요.</div>';
  $("cg-result").innerHTML=h;
  $("cg-stage").style.display="none";
  $("cg-result").style.display="block";
  if(shared){var mine=$("cg-mine");if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$("cg-share").onclick=function(){
    var url=location.origin+location.pathname+"?r="+CODE[top];
    var txt="내 인지 프로필 강점은 "+t.e+" "+t.n+"! 너는 어떤 머리를 가졌을까? 👉 "+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert("결과가 복사됐어요!");});}
  };}
  window.scrollTo({top:$("cg").offsetTop-20,behavior:"smooth"});
}
function result(){
  var sc={
    V:Math.round(st.vc/VCI.length*100),
    P:Math.round(st.pc/PRI.length*100),
    W:Math.round(st.wc/WM_LENS.length*100),
    S:Math.min(100,Math.round(st.ps/45*100))
  };
  var top=ORDER[0];
  ORDER.forEach(function(k){if(sc[k]>sc[top])top=k;});
  render(top,false,sc);
}
$("cg-start").onclick=function(){$("cg-intro").style.display="none";$("cg-stage").style.display="block";stepV();};
(function(){var m=location.search.match(/[?&]r=([VPWS])/);if(m){$("cg-intro").style.display="none";render(m[1],true,{});}})();
})();
</script>
## 네 가지 인지 지표에 대하여

지능을 하나의 숫자로 요약하면 편하지만, 실제로 사람의 머리는 **여러 갈래로 다르게 잘 돌아갑니다.** 어떤 사람은 개념을 말로 정리하는 데 탁월하고, 어떤 사람은 처음 보는 규칙을 순식간에 파악하며, 어떤 사람은 복잡한 지시를 하나도 놓치지 않고 따라가고, 어떤 사람은 단순한 일을 남들보다 두 배 빠르게 처리합니다. 이 테스트는 그 네 갈래를 나눠서 봅니다.

**💬 언어이해** — 어휘, 비유, 개념 사이의 관계를 다루는 힘입니다. 설명·기획·상담처럼 언어가 곧 도구인 일에서 직접적으로 쓰입니다.

**🧩 지각추론** — 배운 적 없는 문제에서 규칙과 패턴을 찾아내는 힘입니다. 수열, 도형, 구조 파악이 여기 들어갑니다.

**🧠 작업기억** — 정보를 머릿속에 붙잡아 둔 채로 조작하는 힘입니다. 이 테스트에서는 숫자를 **거꾸로** 말하게 하는 방식으로 재봅니다. 그냥 따라 외우는 것보다 훨씬 어려운데, 외우는 동시에 순서를 뒤집는 조작을 해야 하기 때문이에요.

**⚡ 처리속도** — 단순한 판단을 빠르고 정확하게 반복하는 힘입니다. 기호와 숫자를 짝짓는 60초 과제로 재봅니다. 머리가 좋고 나쁨보다는 **손과 눈과 판단이 붙는 속도**에 가깝습니다.

네 축의 **편차**도 함께 봐주세요. 고르게 발달한 사람은 어떤 상황에서도 크게 흔들리지 않고, 편차가 큰 사람은 자기 방식대로 일할 때 성과가 확 올라갑니다. 약한 축은 억지로 끌어올리기보다 **메모·체크리스트·도구**로 대신하는 편이 실제로는 더 효율적입니다.

**중요:** 이 테스트는 재미와 자기이해를 위한 **자체 제작 콘텐츠**입니다. 웩슬러 지능검사(WAIS·WISC)를 비롯한 정식 지능검사는 훈련받은 전문가가 표준화된 도구로 대면 실시하며, 이 테스트와는 문항·방식·해석이 전혀 다릅니다. 여기서는 **IQ 점수를 산출하지 않습니다.** 특히 처리속도는 화면 크기, 터치 반응, 마우스 사용 여부에 따라 점수가 크게 달라지니 참고로만 봐주세요. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
