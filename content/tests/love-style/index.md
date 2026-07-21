---
title: "연애 스타일 테스트 — 나는 어떤 연애를 할까?"
description: "12문항으로 알아보는 내 연애 스타일. 4가지 유형 중 나는 누구? 결과는 친구에게 바로 공유돼요."
date: 2026-07-21
slug: "love-style"
categories: ["심리테스트"]
tags: ["연애 스타일 테스트", "연애 심리테스트", "연애 유형", "심리테스트"]
toc: false
readingTime: false
---

12개의 질문으로 알아보는 **내 연애 스타일**. 나는 4가지 유형 중 누구일까요? (재미로 봐주세요 💕)

<div id="lt" style="max-width:600px;margin:0 auto;">
  <div id="lt-intro" style="text-align:center;">
    <button id="lt-start" style="padding:16px 40px;border:0;border-radius:12px;background:#e11d48;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 2분)</button>
  </div>
  <div id="lt-quiz" style="display:none;">
    <div style="height:8px;background:#f1e5e8;border-radius:4px;margin-bottom:18px;"><div id="lt-bar" style="height:8px;width:0;background:#e11d48;border-radius:4px;transition:width .3s;"></div></div>
    <div id="lt-qn" style="font-size:13px;color:#999;margin-bottom:6px;"></div>
    <div id="lt-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="lt-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="lt-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 각 선택지가 어떤 유형에 점수를 주는지: [질문, [선택지A,유형], [선택지B,유형], ...]
var TYPES={
  romantic:{n:"낭만파 연애가",emoji:"🌹",d:"연애의 설렘과 이벤트를 사랑하는 사람. 기념일을 챙기고 표현이 풍부해요. 상대에게 온 마음을 쏟는 열정형이에요.",good:["표현이 풍부하고 다정함","기념일·이벤트를 잘 챙김","사랑에 진심"],watch:["기대가 크면 실망도 큼","상대 페이스도 존중하기","혼자 서운함 쌓지 않기"],match:"안정파",tip:"솔직한 표현이 무기예요. 다만 상대가 표현이 서툴러도 사랑이 아닌 게 아니란 걸 기억하세요."},
  cool:{n:"쿨한 독립러",emoji:"🧊",d:"연애도 좋지만 내 시간과 공간이 중요한 사람. 집착 없이 담백하게, 각자의 삶을 존중하는 어른 연애를 해요.",good:["집착 없이 쿨함","각자의 시간 존중","감정 기복이 적음"],watch:["무심해 보일 수 있음","표현을 조금 더 하기","상대의 애정 표현 받아주기"],match:"낭만파",tip:"독립성은 매력이지만, 가끔은 먼저 연락하고 표현하면 관계가 더 단단해져요."},
  stable:{n:"안정파 지킴이",emoji:"🏡",d:"오래가는 편안한 사랑을 추구하는 사람. 화려하진 않아도 믿음직하고, 관계를 꾸준히 가꿔가는 신뢰형이에요.",good:["믿음직하고 한결같음","갈등을 잘 봉합","장기 연애에 강함"],watch:["가끔은 설렘도 필요","매너리즘 주의","새로운 시도 해보기"],match:"낭만파",tip:"안정감이 최고의 강점. 여기에 작은 이벤트 하나만 더하면 완벽해요."},
  free:{n:"자유로운 모험가",emoji:"🦋",d:"연애도 재미있어야 하는 사람. 새로운 경험과 즉흥적인 데이트를 즐기고, 함께 성장하는 관계를 좋아해요.",good:["함께 있으면 즐거움","새로운 경험 주도","지루할 틈이 없음"],watch:["즉흥이 지나칠 때 주의","약속은 지키기","상대의 안정 욕구 배려"],match:"안정파",tip:"에너지가 매력이에요. 다만 상대가 예측 가능함을 원할 수도 있다는 걸 기억하세요."}
};
var CODE={romantic:'R',cool:'C',stable:'S',free:'F'};
var FROMCODE={R:'romantic',C:'cool',S:'stable',F:'free'};
var QS=[
 ["이상적인 데이트는?",["분위기 좋은 레스토랑에서 대화","romantic"],["각자 좋아하는 거 하다 저녁에 만남","cool"],["늘 가던 편한 단골집","stable"],["즉흥 드라이브·새로운 곳 탐험","free"]],
 ["연락 스타일은?",["하루 종일 자주 주고받아야 안심","romantic"],["필요할 때만, 부담 없이","cool"],["아침·자기 전 규칙적으로","stable"],["기분 내킬 때 길게 통화","free"]],
 ["기념일이 다가오면?",["몇 주 전부터 이벤트 준비","romantic"],["당일에 가볍게 챙김","cool"],["매년 하던 대로 조용히","stable"],["깜짝 여행 같은 걸 계획","free"]],
 ["싸웠을 때 나는?",["감정을 다 표현하고 풀어야 함","romantic"],["일단 혼자 시간을 가짐","cool"],["대화로 차분히 봉합","stable"],["분위기 바꿔 툭툭 털어냄","free"]],
 ["상대에게 바라는 건?",["애정 표현을 자주 해주기","romantic"],["내 공간을 존중해주기","cool"],["한결같은 믿음","stable"],["새로운 걸 함께 즐기기","free"]],
 ["주말에 연인과?",["종일 붙어서 데이트","romantic"],["오후에 잠깐, 나머진 각자","cool"],["집에서 편하게 함께","stable"],["안 가본 곳으로 나들이","free"]],
 ["'사랑'이란?",["표현하고 확인하는 것","romantic"],["편안한 거리감","cool"],["오래 쌓는 신뢰","stable"],["함께 성장하는 모험","free"]],
 ["연인의 SNS를?",["자주 보고 반응함","romantic"],["딱히 신경 안 씀","cool"],["가끔 챙겨봄","stable"],["같이 찍은 거 올리는 게 좋음","free"]],
 ["데이트 비용은?",["번갈아 서프라이즈로 쏨","romantic"],["철저히 반반","cool"],["형편 맞춰 꾸준히","stable"],["그날 기분따라 자유롭게","free"]],
 ["질투가 나면?",["솔직히 말하고 확인","romantic"],["티 안 내고 넘김","cool"],["믿으니까 크게 안 남","stable"],["오히려 더 잘해줌","free"]],
 ["이별 후 나는?",["한동안 여운이 김","romantic"],["빠르게 일상 복귀","cool"],["천천히 정리","stable"],["새 경험으로 극복","free"]],
 ["연애에서 제일 중요한 건?",["설렘과 애정","romantic"],["서로의 자유","cool"],["안정과 신뢰","stable"],["즐거움과 성장","free"]]
];
var idx=0, tally={romantic:0,cool:0,stable:0,free:0};
function show(){
  var q=QS[idx];
  $('lt-qn').textContent=(idx+1)+' / '+QS.length;
  $('lt-bar').style.width=(idx/QS.length*100)+'%';
  $('lt-q').textContent=q[0];
  var o=$('lt-opts');o.innerHTML='';
  q.slice(1).forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 15px;border:2px solid #f1d5dc;border-radius:10px;background:#fff;font-size:15px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#e11d48';};
    b.onmouseout=function(){b.style.borderColor='#f1d5dc';};
    b.onclick=function(){tally[opt[1]]++;idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
}
function winner(){var best='romantic',mx=-1;for(var k in tally){if(tally[k]>mx){mx=tally[k];best=k;}}return best;}
function render(typeKey,shared){
  $('lt-intro').style.display='none';$('lt-quiz').style.display='none';
  var t=TYPES[typeKey]||TYPES.romantic;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  var mn=TYPES[{romantic:'stable',cool:'romantic',stable:'romantic',free:'stable'}[typeKey]||'stable'];
  $('lt-result').innerHTML=
    '<div style="text-align:center;padding:24px;border-radius:14px;background:#fff1f3;">'
    +'<div style="font-size:40px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:#be123c;">'+t.n+'</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 💌 당신은 어떤 연애 스타일일까요?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:#be123c;">💗 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:#be123c;">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:#be123c;">💞 잘 맞는 유형</h3><div style="line-height:1.7;"><b>'+mn.n+'</b> '+mn.emoji+' — 서로를 채워주는 조합이에요</div>'
    +'<h3 style="margin:18px 0 6px;color:#be123c;">💡 연애 꿀팁</h3><div style="line-height:1.7;">'+t.tip+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="lt-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#e11d48;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #e11d48;border-radius:10px;background:#fff;color:#be123c;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="lt-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#e11d48;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tools/personality-test/">16 성격유형</a></div>';
  $('lt-result').style.display='block';
  if(shared){var mine=$('lt-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('lt-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODE[typeKey];
    var txt='내 연애 스타일은 '+t.emoji+' '+t.n+'! 너는? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('lt').offsetTop-20,behavior:'smooth'});
}
function result(){render(winner(),false);}
$('lt-start').onclick=function(){$('lt-intro').style.display='none';$('lt-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([RCSF])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 연애 스타일 테스트에 대하여

12개의 상황 질문에 답하면 **낭만파·쿨한 독립러·안정파·자유로운 모험가** 4가지 유형 중 나에게 가장 가까운 스타일을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 답변은 저장되지 않고 브라우저에서만 처리됩니다.
