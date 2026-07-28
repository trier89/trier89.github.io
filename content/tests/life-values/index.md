---
title: "인생에서 가장 중요한 가치 월드컵 — 상황 선택 월드컵"
emoji: "🌟"
description: "16가지 인생 가치를 두고 하나씩 골라내는 이상형 월드컵. 마지막에 내가 진짜 좇는 가치관 유형까지 알려드려요."
date: 2026-07-28
slug: "life-values"
categories: ["심리테스트"]
tags:
  - "인생 가치관"
  - "가치관 테스트"
  - "이상형 월드컵"
  - "심리테스트"
toc: false
readingTime: false
---

16개의 상황이 토너먼트로 맞붙는 **인생에서 가장 중요한 가치 월드컵**! 마음이 더 가는 쪽을 하나씩 고르다 보면 최후의 1개와 함께 나의 성향 유형까지 알 수 있어요. 🌟 (재미로 봐주세요)

<div id="wc" style="max-width:640px;margin:0 auto;">
  <div id="wc-intro" style="text-align:center;padding:10px 0;">
    <div style="font-size:52px;line-height:1;margin-bottom:6px;">🌟</div>
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
var D={"noun":"인생 가치관","prompt":"인생에서 더 포기 못 할 쪽은?","types":{"free":{"n":"자유를 좇는 사람","e":"🕊️","line":"당신은 무엇에도 매이지 않는 자유로운 스타일이시군요!"},"bond":{"n":"관계를 좇는 사람","e":"🤝","line":"당신은 곁의 사람을 가장 아끼는 따뜻한 스타일이시군요!"},"grow":{"n":"성장을 좇는 사람","e":"🌱","line":"당신은 어제보다 나은 오늘을 사는 성장형 스타일이시군요!"},"peace":{"n":"평온을 좇는 사람","e":"🍵","line":"당신은 마음의 고요를 지키는 평온한 스타일이시군요!"}},"items":[{"t":"언제든 훌쩍 떠날 수 있는 자유","g":"free"},{"t":"누구의 허락도 필요 없는 결정권","g":"free"},{"t":"정해진 틀 없는 열린 미래","g":"free"},{"t":"내 방식대로 살 권리","g":"free"},{"t":"평생 함께할 진짜 친구","g":"bond"},{"t":"언제나 내 편인 가족","g":"bond"},{"t":"마음을 나눌 사랑하는 사람","g":"bond"},{"t":"나를 알아봐 주는 공동체","g":"bond"},{"t":"매년 새로워지는 나","g":"grow"},{"t":"도전을 부르는 큰 목표","g":"grow"},{"t":"끝없이 배울 수 있는 환경","g":"grow"},{"t":"실패해도 다시 서는 근성","g":"grow"},{"t":"걱정 없는 잔잔한 일상","g":"peace"},{"t":"마음이 편안한 안식처","g":"peace"},{"t":"서두르지 않아도 되는 하루","g":"peace"},{"t":"흔들리지 않는 내면의 고요","g":"peace"}]};
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

## 인생에서 가장 중요한 가치 월드컵에 대하여

16가지 상황을 1:1 토너먼트(16강→8강→4강→결승)로 골라내며 총 15번을 선택하면, 선택한 상황들의 성향을 모아 **자유를 좇는 사람 · 관계를 좇는 사람 · 성장을 좇는 사람 · 평온을 좇는 사람** 중 나에게 가장 가까운 유형을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 모든 선택은 저장되지 않고 브라우저에서만 처리됩니다.
