---
title: "가치관 딜레마 월드컵 — 상황 선택 월드컵"
emoji: "⚖️"
description: "정답 없는 딜레마를 하나씩 골라내다 보면 드러나는 내 판단의 무게중심. 나는 무엇을 먼저 지키는 사람일까?"
date: 2026-07-29
slug: "value-dilemma"
categories: ["심리테스트"]
tags:
  - "가치관 딜레마"
  - "딜레마 테스트"
  - "심리테스트"
  - "이상형 월드컵"
toc: false
readingTime: false
---

16개의 상황이 토너먼트로 맞붙는 **가치관 딜레마 월드컵**! 마음이 더 가는 쪽을 하나씩 고르다 보면 최후의 1개와 함께 나의 성향 유형까지 알 수 있어요. ⚖️ (재미로 봐주세요)

<div id="wc" style="max-width:640px;margin:0 auto;">
  <div id="wc-intro" style="text-align:center;padding:10px 0;">
    <div style="font-size:52px;line-height:1;margin-bottom:6px;">⚖️</div>
    <p style="color:var(--dim);font-size:14px;margin:8px 0 18px;">16개의 상황이 1:1로 맞붙어요. 마음이 더 가는 쪽을 골라 최후의 1개를 뽑아보세요. (15번만 선택하면 끝!)</p>
    <button id="wc-start" style="padding:15px 42px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-size:17px;font-weight:800;cursor:pointer;">월드컵 시작하기</button>
  </div>
  <div id="wc-game" style="display:none;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span id="wc-round" style="font-size:13px;font-weight:700;color:var(--coral-soft);"></span>
      <span id="wc-count" style="font-size:12px;color:var(--dim);"></span>
    </div>
    <div style="height:8px;background:var(--line);border-radius:4px;margin-bottom:20px;overflow:hidden;">
      <div id="wc-bar" style="height:8px;width:0;background:var(--coral);border-radius:4px;transition:width .3s;"></div>
    </div>
    <div id="wc-prompt" style="text-align:center;font-size:16px;font-weight:700;color:var(--txt);margin-bottom:16px;"></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <button id="wc-a" class="wc-choice" style="padding:26px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:18px;font-weight:700;line-height:1.4;cursor:pointer;transition:all .12s;"></button>
      <div style="text-align:center;font-size:14px;font-weight:800;color:var(--coral);letter-spacing:1px;">VS</div>
      <button id="wc-b" class="wc-choice" style="padding:26px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:18px;font-weight:700;line-height:1.4;cursor:pointer;transition:all .12s;"></button>
    </div>
  </div>
  <div id="wc-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var D={"noun":"가치관 저울","prompt":"둘 중 그래도 이쪽이라면?","types":{"truth":{"n":"원칙을 지키는 사람","e":"📏","line":"당신은 손해를 봐도 옳음을 택하는 원칙형 스타일이시군요!"},"kind":{"n":"마음을 살피는 사람","e":"💗","line":"당신은 규칙보다 사람의 사정을 먼저 보는 다정한 스타일이시군요!"},"real":{"n":"실리를 챙기는 사람","e":"🎯","line":"당신은 감정보다 결과를 냉정히 계산하는 실리형 스타일이시군요!"},"brave":{"n":"소신을 밀어붙이는 사람","e":"🔥","line":"당신은 눈치보다 신념이 먼저인 소신형 스타일이시군요!"}},"items":[{"t":"규칙을 어긴 친구를 신고한다","g":"truth"},{"t":"손해 봐도 거짓말은 안 한다","g":"truth"},{"t":"공정하게 모두 똑같은 대우","g":"truth"},{"t":"약속은 무슨 일이 있어도 지킨다","g":"truth"},{"t":"사정을 봐주고 눈감아 준다","g":"kind"},{"t":"힘든 사람 먼저 챙긴다","g":"kind"},{"t":"옳음보다 상처 안 주기","g":"kind"},{"t":"원칙보다 그날의 마음","g":"kind"},{"t":"감정 빼고 이득으로 판단","g":"real"},{"t":"안 되는 건 빨리 포기한다","g":"real"},{"t":"최소 노력 최대 효율","g":"real"},{"t":"명분보다 실제 성과","g":"real"},{"t":"다수가 반대해도 내 소신대로","g":"brave"},{"t":"불의를 보면 그냥 못 지나침","g":"brave"},{"t":"할 말은 하고 산다","g":"brave"},{"t":"안전보다 신념을 택한다","g":"brave"}]};
var TYPES=D.types, ITEMS=D.items, NOUN=D.noun, PROMPT=D.prompt;
var TOTAL=ITEMS.length-1; // 총 대결 수(16강=15)
var pool, nextPool, mi, pick, tally, champ;

function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function roundLabel(n){return n>=16?'16강':n>=8?'8강':n>=4?'4강':'결승';}

function start(){
  pool=shuffle(ITEMS.slice()); nextPool=[]; mi=0; pick=0; champ=null;
  tally={}; for(var k in TYPES)tally[k]=0;
  $('wc-intro').style.display='none';
  $('wc-result').style.display='none';
  $('wc-game').style.display='block';
  showMatch();
}

function showMatch(){
  $('wc-round').textContent=roundLabel(pool.length)+(pool.length>2?(' · '+(mi/2+1)+'경기'):'');
  $('wc-count').textContent=(pick+1)+' / '+TOTAL;
  $('wc-bar').style.width=(pick/TOTAL*100)+'%';
  $('wc-prompt').textContent=PROMPT;
  var a=pool[mi], b=pool[mi+1];
  var ba=$('wc-a'), bb=$('wc-b');
  ba.textContent=a.t; bb.textContent=b.t;
  ba.onclick=function(){pickWinner(a);};
  bb.onclick=function(){pickWinner(b);};
}

function pickWinner(item){
  tally[item.g]=(tally[item.g]||0)+1;
  nextPool.push(item);
  mi+=2; pick++;
  if(mi>=pool.length){ pool=nextPool; nextPool=[]; mi=0; }
  if(pool.length===1){ champ=pool[0]; showResult(); return; }
  showMatch();
}

function winnerType(){
  var best=null,mx=-1;
  for(var k in tally){ if(tally[k]>mx){mx=tally[k];best=k;} }
  if(champ && tally[champ.g]===mx) best=champ.g; // 동점이면 우승 상황의 성향 우선
  return best;
}

function render(typeKey, shared){
  var t=TYPES[typeKey]||TYPES[Object.keys(TYPES)[0]];
  $('wc-intro').style.display='none';
  $('wc-game').style.display='none';
  var champBlock = (!shared && champ)
    ? '<div style="margin:14px 0;padding:13px 16px;border-radius:12px;background:rgba(217,119,87,.10);border:1px solid var(--line);font-size:15px;">🏆 내가 뽑은 최고의 선택 &nbsp;<b style="color:var(--coral-soft);">'+champ.t+'</b></div>'
    : '';
  var sharedNote = shared
    ? '<div style="margin:10px 0;padding:11px;border-radius:10px;background:rgba(126,166,224,.10);color:var(--blue);font-size:14px;text-align:center;">친구가 공유한 결과예요 💌 당신은 어떤 유형일까요?</div>'
    : '';
  $('wc-result').innerHTML=
    '<div style="text-align:center;padding:26px 18px;border-radius:16px;background:var(--panel);border:1px solid var(--line);">'
     +'<div style="font-size:56px;line-height:1;">'+t.e+'</div>'
     +'<div style="font-size:26px;font-weight:800;color:var(--coral-soft);margin-top:8px;">'+t.n+'</div>'
    +'</div>'
    +sharedNote
    +'<p style="text-align:center;font-size:17px;line-height:1.7;margin:18px 6px;font-weight:600;">'+t.line+'</p>'
    +champBlock
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
       ? '<button id="wc-mine" style="flex:1;padding:15px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:16px;cursor:pointer;">나도 해보기 →</button>'
       : '<button id="wc-again" style="flex:1;padding:14px;border:2px solid var(--coral);border-radius:12px;background:transparent;color:var(--coral-soft);font-weight:800;font-size:15px;cursor:pointer;">다시 하기</button>'
         +'<button id="wc-share" style="flex:1;padding:14px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:12px;background:var(--panel);border:1px solid var(--line);font-size:14px;color:var(--dim);">다른 테스트도 즐겨보세요 → <a href="/tests/">심리테스트 전체</a></div>';
  $('wc-result').style.display='block';

  if(shared){
    var mine=$('wc-mine'); if(mine)mine.onclick=start;
  } else {
    $('wc-again').onclick=start;
    $('wc-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+typeKey;
      var txt='나의 '+NOUN+' 결과: '+t.e+' '+t.n+'! 너도 해봐 👉 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
    };
  }
  try{ window.scrollTo({top:$('wc').offsetTop-20,behavior:'smooth'}); }catch(e){}
}

function showResult(){ render(winnerType(), false); }

// 선택지 hover 효과
document.querySelectorAll('.wc-choice').forEach(function(b){
  b.onmouseover=function(){b.style.borderColor='var(--coral)';};
  b.onmouseout=function(){b.style.borderColor='var(--line)';};
});

$('wc-start').onclick=start;

// 공유 링크(?r=타입키)로 들어오면 해당 결과 먼저 보여주기
(function(){
  var m=location.search.match(/[?&]r=([a-zA-Z]+)/);
  if(m && TYPES[m[1]]){ render(m[1], true); }
})();
})();
</script>

## 가치관 딜레마 월드컵에 대하여

16가지 상황을 1:1 토너먼트(16강→8강→4강→결승)로 골라내며 총 15번을 선택하면, 선택한 상황들의 성향을 모아 **원칙을 지키는 사람 · 마음을 살피는 사람 · 실리를 챙기는 사람 · 소신을 밀어붙이는 사람** 중 나에게 가장 가까운 유형을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 모든 선택은 저장되지 않고 브라우저에서만 처리됩니다.
