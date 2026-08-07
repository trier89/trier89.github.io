---
title: "연애세포 유형 테스트 — 내 안의 연애세포는 무슨 타입?"
emoji: "💘"
description: "무료 연애세포 유형 테스트 — 12문항으로 알아보는 나의 연애 스타일. 순정·돌직구·밀당·철벽·자유·짝사랑 6가지 연애세포 중 내 타입은? 결과는 친구에게 바로 공유돼요."
date: 2026-08-07
slug: "love-cell"
categories: ["심리테스트"]
tags: ["연애세포 테스트", "연애 스타일 테스트", "연애 유형", "썸 테스트", "심리테스트"]
toc: false
readingTime: false
---

12개의 질문으로 알아보는 **내 안의 연애세포 유형**. 좋아하는 사람 앞에서 나는 순정파일까, 돌직구일까, 밀당의 고수일까? 6가지 연애세포 중 내 타입을 찾아보세요. (재미로 보는 자가진단이에요 💘)

<div id="lc" style="max-width:600px;margin:0 auto;">
  <div id="lc-intro" style="text-align:center;">
    <button id="lc-start" style="padding:16px 40px;border:0;border-radius:12px;background:#e0518a;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 1분)</button>
  </div>
  <div id="lc-quiz" style="display:none;">
    <div style="height:8px;background:#fbe4ee;border-radius:4px;margin-bottom:18px;"><div id="lc-bar" style="height:8px;width:0;background:#e0518a;border-radius:4px;transition:width .3s;"></div></div>
    <div id="lc-qn" style="font-size:13px;color:#9ca3af;margin-bottom:6px;"></div>
    <div id="lc-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;color:#2b2b2b;"></div>
    <div id="lc-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="lc-result" style="display:none;color:#2b2b2b;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPE={
  S:{n:"순정만화 세포",emoji:"💘",color:"#e0518a",d:"한 번 마음을 주면 진심으로 올인하는 로맨티스트. 사소한 이벤트도 정성껏 챙기고, 상대의 말 한마디를 오래 곱씹어요. 밀당 같은 건 잘 못 해요 — 좋으면 좋은 거니까. 진짜 인연을 만나면 세상에서 제일 다정한 연인이 돼요.",good:"🎯 돌직구 세포 · 🐰 짝사랑 세포",tip:"진심은 최고의 무기예요. 다만 다 주고 지치지 않게, 내 마음도 아껴주세요."},
  J:{n:"돌직구 세포",emoji:"🎯",color:"#e8632f",d:"좋으면 좋다고, 보고 싶으면 보고 싶다고 바로 말하는 직진형. 재고 따지기보다 마음 가는 대로 표현해서, 상대가 내 마음을 헷갈릴 일이 없어요. 그 솔직함이 매력이자 추진력. 고백도 내가 먼저 하는 편.",good:"🎭 밀당 세포 · 💘 순정 세포",tip:"솔직함이 강점. 가끔은 상대 속도도 기다려주면 더 좋아요."},
  M:{n:"밀당 세포",emoji:"🎭",color:"#8a5cd6",d:"연애의 밀당을 즐길 줄 아는 여유파. 티 나게 좋아하기보다 적당한 거리에서 상대를 설레게 하는 센스가 있어요. 답장 타이밍, 표현의 완급 조절이 자연스러워서 상대를 은근히 애태우게 만들죠.",good:"🎯 돌직구 세포 · 🛡️ 철벽 세포",tip:"밀당도 좋지만, 진심일 땐 타이밍 놓치지 않게. 너무 재면 놓칠 수도 있어요."},
  C:{n:"철벽 세포",emoji:"🛡️",color:"#3f7de1",d:"쉽게 마음을 열지 않는 신중형. 상처받는 게 싫어서 확신이 설 때까지 천천히, 재고 또 재요. 대신 한 번 마음을 열면 누구보다 깊고 진중한 관계를 만들어요. 겉은 차가워 보여도 속은 따뜻한 반전 매력.",good:"💘 순정 세포 · 🎭 밀당 세포",tip:"신중함은 미덕이에요. 다만 벽이 너무 높으면 좋은 인연도 지나칠 수 있으니, 가끔 용기 내보세요."},
  F:{n:"자유연애 세포",emoji:"🦋",color:"#2f9e8a",d:"얽매이는 걸 싫어하는 자유로운 영혼. 연애도 나답게, 서로의 공간을 존중하는 관계를 좋아해요. 집착이나 과한 간섭은 딱 질색. 함께여도 각자 빛나는, 쿨하면서도 은근히 다정한 스타일이에요.",good:"🛡️ 철벽 세포 · 🎯 돌직구 세포",tip:"자유로운 게 매력. 다만 상대가 외로워하지 않게, 표현은 아끼지 마세요."},
  R:{n:"짝사랑 세포",emoji:"🐰",color:"#d68a2f",d:"좋아하는 마음을 속으로 삭이는 수줍음의 대명사. 티 안 내려 애쓰지만 눈빛이 다 말해주죠. 상대의 SNS를 몰래 챙겨보고, 우연을 가장한 마주침을 계획해요. 순수하고 설렘 가득하지만, 표현이 서툴러 혼자 앓는 타입.",good:"💘 순정 세포 · 🎯 돌직구 세포",tip:"설레는 마음, 이제 조금만 용기 내서 표현해봐요. 짝사랑도 좋지만 이뤄지면 더 좋잖아요."}
};
var ORDER=['S','J','M','C','F','R'];
var Q=[
 ["좋아하는 사람이 생겼다. 나의 첫 반응은?",[["티 안 내려 하지만 눈빛이 다 티 남","R"],["바로 다가가서 말을 걺","J"],["상대 반응 보며 조금씩 접근","M"],["진짜 인연일까 신중히 관찰","C"]]],
 ["썸 탈 때 카톡 스타일은?",[["답장 바로바로, 하루종일 대화","S"],["일부러 좀 늦게, 여유 있게","M"],["할 말 있을 때만 편하게","F"],["폰 보며 답장 몇 번씩 고쳐 씀","R"]]],
 ["고백은 누가?",[["당연히 내가 먼저, 직진","J"],["확신 설 때까지 기다렸다가","C"],["분위기 무르익으면 자연스럽게","M"],["상대가 해주길 속으로 기다림","R"]]],
 ["연인에게 가장 바라는 건?",[["매일 다정한 표현과 애정","S"],["솔직하고 시원한 소통","J"],["서로의 공간을 존중해주기","F"],["믿음직하고 한결같은 신뢰","C"]]],
 ["데이트 코스는?",[["기념일 챙기고 이벤트 가득","S"],["즉흥적으로 발길 닿는 대로","F"],["요즘 핫한 곳 미리 리서치","M"],["조용하고 편안한 곳에서 대화","C"]]],
 ["상대가 연락이 뜸해지면?",[["무슨 일 있나 바로 연락","S"],["나도 쿨하게 내 할 일 함","F"],["일부러 나도 텀 두고 밀당","M"],["혼자 온갖 상상하며 앓음","R"]]],
 ["연애에서 제일 무서운 건?",[["내 진심이 안 통하는 것","S"],["표현했다 거절당하는 것","R"],["상처받고 배신당하는 것","C"],["자유를 잃고 얽매이는 것","F"]]],
 ["짝사랑 중이라면 나는?",[["티 내며 어떻게든 다가감","J"],["몰래 SNS 챙겨보며 앓음","R"],["우연을 가장한 만남 설계","M"],["마음 접고 담담한 척","C"]]],
 ["연인과 싸웠을 때?",[["먼저 사과하고 풀고 싶어함","S"],["할 말은 바로 다 해버림","J"],["시간 두고 각자 생각 정리","F"],["속으로만 끙끙, 표현 서툼","R"]]],
 ["이상형에 가까운 말은?",[["나만 바라봐주는 다정한 사람","S"],["솔직하고 화끈한 사람","J"],["밀당 통하는 매력적인 사람","M"],["나를 자유롭게 두는 쿨한 사람","F"]]],
 ["연애 시작까지 걸리는 시간은?",[["끌리면 빠르게 직진","J"],["확신 들 때까지 아주 천천히","C"],["밀당하며 서서히 무르익게","M"],["혼자 좋아하다 타이밍 놓침","R"]]],
 ["친구들이 말하는 나의 연애는?",[["콩깍지 제대로 씌는 순정파","S"],["좋으면 바로 표현하는 직진남녀","J"],["밀당 고수, 여유로운 스타일","M"],["철벽인데 알고 보면 따뜻함","C"]]]
];
var sums={S:0,J:0,M:0,C:0,F:0,R:0}, i=0;
function show(){
 var q=Q[i];
 $('lc-qn').textContent=(i+1)+' / '+Q.length;
 $('lc-q').textContent=q[0];
 $('lc-bar').style.width=(i/Q.length*100)+'%';
 var box=$('lc-opts');box.innerHTML='';
 q[1].forEach(function(o){
  var b=document.createElement('button');
  b.textContent=o[0];
  b.style.cssText='padding:14px 16px;border:1.5px solid #f3d5e2;border-radius:12px;background:#fff;color:#2b2b2b;font-size:16px;text-align:left;cursor:pointer;line-height:1.4;';
  b.onmouseover=function(){b.style.background='#fdeef4';};
  b.onmouseout=function(){b.style.background='#fff';};
  b.onclick=function(){sums[o[1]]++;i++;if(i<Q.length)show();else result();};
  box.appendChild(b);
 });
}
function top(){var best='S',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function render(key,shared){
 var t=TYPE[key];
 var html='<div style="text-align:center;padding:22px 16px;border-radius:16px;background:linear-gradient(160deg,'+t.color+'22,'+t.color+'08);">'
  +'<div style="font-size:64px;">'+t.emoji+'</div>'
  +'<div style="font-size:13px;color:'+t.color+';font-weight:700;margin-top:4px;">내 연애세포는</div>'
  +'<div style="font-size:26px;font-weight:800;margin:2px 0 0;color:'+t.color+';">'+t.n+'</div></div>'
  +'<div style="line-height:1.75;margin:18px 4px;font-size:15px;">'+t.d+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#fdeef4;font-size:14px;line-height:1.7;"><b>💞 잘 맞는 세포</b><br>'+t.good+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f5f7fb;font-size:14px;line-height:1.7;"><b>💡 연애 팁</b><br>'+t.tip+'</div>';
 html+='<div style="display:flex;gap:10px;margin-top:20px;">'
  +(shared
    ?'<button onclick="location.href=location.pathname" style="flex:1;padding:14px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
    :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid '+t.color+';border-radius:10px;background:#fff;color:'+t.color+';font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
     +'<button id="lc-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
  +'</div>'
  +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/eq-test/">EQ 감성지능</a> · <a href="/tests/color-psychology/">색채 심리</a></div>'
  +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미로 보는 자가진단이며 전문 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
 $('lc-result').innerHTML=html;
 $('lc-result').style.display='block';
 if(!shared){var sb=$('lc-share');if(sb)sb.onclick=function(){
  var url=location.origin+location.pathname+'?r='+key;
  var txt='내 연애세포는 '+t.emoji+' '+t.n+'! 너의 연애세포는? 👉 '+url;
  if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
 };}
 window.scrollTo({top:$('lc').offsetTop-20,behavior:'smooth'});
}
function result(){$('lc-quiz').style.display='none';render(top(),false);}
$('lc-start').onclick=function(){$('lc-intro').style.display='none';$('lc-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([SJMCFR])/);if(m){$('lc-intro').style.display='none';render(m[1],true);}})();
})();
</script>

## 연애세포 유형 테스트에 대하여

좋아하는 사람 앞에서 우리는 저마다 다른 모습이 됩니다. 누군가는 좋으면 좋다고 바로 표현하는 돌직구가 되고, 누군가는 상처받을까 봐 마음을 꼭꼭 숨기는 철벽이 되죠. 이 테스트는 12개의 상황 질문에 답하면 **순정만화·돌직구·밀당·철벽·자유연애·짝사랑** 여섯 가지 연애세포 중 나에게 가장 강한 타입을 찾아드려요.

각 질문의 선택에 따라 세포별 점수가 쌓이고, 가장 높게 나온 세포가 나의 연애 유형이 됩니다. 결과에는 유형 설명, 잘 맞는 연애세포, 연애 팁이 함께 나오고 친구에게 바로 공유할 수 있어요. 재미와 자기이해를 위한 콘텐츠이며 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
