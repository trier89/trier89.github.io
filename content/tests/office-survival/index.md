---
title: "직장에서 나의 생존 유형 — 나는 어떤 사회생활러?"
description: "9문항으로 알아보는 직장 생존 유형. 5가지 유형 중 나는 누구? 결과는 동료에게 바로 공유돼요."
date: 2026-07-22
slug: "office-survival"
categories: ["심리테스트"]
tags: ["직장 생존 유형", "직장인 심리테스트", "사회생활 유형", "회사 유형 테스트", "심리테스트"]
toc: false
readingTime: false
---

9개의 질문으로 알아보는 **직장에서 나의 생존 유형**. 5가지 유형 중 나는 누구일까요? (재미로 봐주세요 ☕)

<div id="os" style="max-width:600px;margin:0 auto;">
  <div id="os-intro" style="text-align:center;">
    <button id="os-start" style="padding:16px 40px;border:0;border-radius:12px;background:#d97757;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 1분)</button>
  </div>
  <div id="os-quiz" style="display:none;">
    <div style="height:8px;background:#f5e3db;border-radius:4px;margin-bottom:18px;"><div id="os-bar" style="height:8px;width:0;background:#d97757;border-radius:4px;transition:width .3s;"></div></div>
    <div id="os-qn" style="font-size:13px;color:#6b7280;margin-bottom:6px;"></div>
    <div id="os-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="os-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="os-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 5가지 직장 생존 유형: 각 선택지가 유형에 점수를 줌
var TYPES={
  ace:{n:"성과로 말하는 에이스",emoji:"🏆",d:"목표가 정해지면 끝까지 밀어붙이는 실력파. 회의에서든 실무에서든 결과로 존재감을 증명해요. 인정받을 때 가장 신이 나고, 성장이 멈추면 답답해지는 스타일이에요. 든든하지만 가끔은 스스로를 몰아붙이기도 해요.",good:["뛰어난 추진력","결과로 증명","위기에 강함"],watch:["번아웃 주의","동료 속도 존중","완벽주의 완화"],match:{n:"분위기 메이커",emoji:"🎉"},mismatch:{n:"조용한 실속러",emoji:"🐢"},tip:"성과도 좋지만 잠깐 쉬어가도 무너지지 않아요. 가끔은 과정을 즐겨보세요."},
  mood:{n:"팀의 분위기 메이커",emoji:"🎉",d:"어색한 회식도 당신이 앉으면 편해져요. 사람과 사람을 잇고, 굳은 공기를 부드럽게 푸는 관계의 달인이에요. 정이 많아 남의 일도 내 일처럼 챙기지만, 그만큼 감정 소모도 커요. 팀에 당신이 없으면 다들 허전해합니다.",good:["최고의 친화력","갈등 중재","긍정 에너지 전파"],watch:["거절 연습 필요","혼자 시간도 챙기기","마음 상처 관리"],match:{n:"조용한 실속러",emoji:"🐢"},mismatch:{n:"성과로 말하는 에이스",emoji:"🏆"},tip:"모두를 챙기느라 정작 나를 놓치지 마세요. 내 감정도 소중해요."},
  turtle:{n:"조용한 실속러",emoji:"🐢",d:"떠들지 않지만 맡은 일은 야무지게 끝내는 믿음의 아이콘이에요. 화려하진 않아도 없으면 티가 확 나는, 팀의 숨은 기둥이죠. 조용히 관찰하며 핵심을 파악하고, 필요할 때 정확히 한마디를 던져요. 은근히 다들 당신 의견을 궁금해합니다.",good:["묵묵한 성실함","높은 신뢰도","핵심을 꿰뚫음"],watch:["표현을 더 하기","성과 어필도 필요","혼자 떠안지 않기"],match:{n:"성과로 말하는 에이스",emoji:"🏆"},mismatch:{n:"자유로운 아이디어뱅크",emoji:"💡"},tip:"묵묵함이 무기지만, 가끔은 내 공을 스스로 말해도 괜찮아요."},
  idea:{n:"자유로운 아이디어뱅크",emoji:"💡",d:"남들이 못 보는 각도를 발견하는 창의력의 소유자예요. 정해진 틀보다 새로운 방식을 좋아하고, 회의에서 종종 판을 뒤집는 한마디를 던지죠. 반복 업무엔 쉽게 지치지만, 흥미로운 문제 앞에선 눈이 반짝여요. 자유가 보장될 때 진가를 발휘합니다.",good:["톡톡 튀는 창의력","유연한 사고","새 시도를 주도"],watch:["마무리 챙기기","현실성도 고려","루틴에 지치지 않기"],match:{n:"차분한 조율가",emoji:"🧭"},mismatch:{n:"팀의 분위기 메이커",emoji:"🎉"},tip:"아이디어를 끝까지 완성하면 당신의 가치는 두 배가 돼요."},
  guide:{n:"모두를 살피는 차분한 조율가",emoji:"🧭",d:"판을 넓게 보고 흐름을 정리하는 균형의 리더예요. 서로 다른 의견 사이에서 접점을 찾고, 조용히 방향을 잡아주죠. 튀지 않지만 팀이 흔들릴 때 중심을 잡는 사람이에요. 신중한 만큼 결정이 늦어질 때도 있지만, 그 판단은 대체로 옳아요.",good:["넓은 시야","탁월한 조율력","안정적인 판단"],watch:["결정 미루지 않기","자기 의견도 내기","완벽 대신 실행"],match:{n:"자유로운 아이디어뱅크",emoji:"💡"},mismatch:{n:"팀의 분위기 메이커",emoji:"🎉"},tip:"균형 감각이 강점이에요. 가끔은 과감하게 밀어붙여도 좋아요."}
};
var CODE={ace:'a',mood:'m',turtle:'t',idea:'i',guide:'g'};
var FROMCODE={a:'ace',m:'mood',t:'turtle',i:'idea',g:'guide'};
var QS=[
 ["새 프로젝트가 시작됐다. 나는?",["일단 목표부터 잡고 달림","ace"],["팀 분위기부터 살핌","mood"],["조용히 내 몫을 파악","turtle"],["재밌는 방향이 없나 궁리","idea"],["전체 그림부터 그림","guide"]],
 ["회의에서 나는 주로?",["결론과 데이터로 밀어붙임","ace"],["딱딱한 공기를 풀어줌","mood"],["듣다가 핵심만 한마디","turtle"],["엉뚱하지만 신선한 제안","idea"],["의견들을 정리·중재","guide"]],
 ["점심시간에 나는?",["빨리 먹고 일 마무리","ace"],["동료들과 수다 삼매경","mood"],["조용히 혼밥이 편함","turtle"],["새로 생긴 맛집 탐험","idea"],["다 같이 갈 곳을 정해줌","guide"]],
 ["갑자기 사고가 터졌다!",["앞장서서 해결책 실행","ace"],["다들 진정시키고 역할 분담","mood"],["침착하게 원인부터 파악","turtle"],["의외의 우회로를 제안","idea"],["상황 전체를 조율","guide"]],
 ["가장 듣고 싶은 칭찬은?",["'역시 실력 있어'","ace"],["'너 있어서 든든해'","mood"],["'믿고 맡길 수 있어'","turtle"],["'아이디어가 참신해'","idea"],["'네 덕에 정리됐어'","guide"]],
 ["야근을 하게 됐다. 나는?",["끝을 봐야 직성이 풀림","ace"],["같이 남은 동료를 챙김","mood"],["묵묵히 내 일을 마침","turtle"],["효율적 딴 방법을 찾음","idea"],["일정을 다시 조율함","guide"]],
 ["팀에 갈등이 생기면?",["결과로 상황을 정리","ace"],["양쪽 마음을 다독임","mood"],["한 발 물러나 지켜봄","turtle"],["관점을 바꿔 풀어봄","idea"],["접점을 찾아 중재","guide"]],
 ["이상적인 업무 환경은?",["도전과 성장이 있는 곳","ace"],["사람들이 따뜻한 곳","mood"],["방해 없이 몰입되는 곳","turtle"],["자유롭게 시도하는 곳","idea"],["균형 잡힌 조직","guide"]],
 ["동료들이 보는 나는?",["믿음직한 해결사","ace"],["없으면 허전한 분위기꾼","mood"],["조용하지만 야무진 사람","turtle"],["재밌는 아이디어맨","idea"],["중심을 잡아주는 사람","guide"]]
];
var idx=0, tally={ace:0,mood:0,turtle:0,idea:0,guide:0};
function show(){
  var q=QS[idx];
  $('os-qn').textContent=(idx+1)+' / '+QS.length;
  $('os-bar').style.width=(idx/QS.length*100)+'%';
  $('os-q').textContent=q[0];
  var o=$('os-opts');o.innerHTML='';
  q.slice(1).forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 15px;border:2px solid #f0d4c8;border-radius:10px;background:#fff;font-size:15px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#d97757';};
    b.onmouseout=function(){b.style.borderColor='#f0d4c8';};
    b.onclick=function(){tally[opt[1]]++;idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
}
function winner(){var best='ace',mx=-1;for(var k in tally){if(tally[k]>mx){mx=tally[k];best=k;}}return best;}
function render(typeKey,shared){
  $('os-intro').style.display='none';$('os-quiz').style.display='none';
  var t=TYPES[typeKey]||TYPES.ace;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('os-result').innerHTML=
    '<div style="text-align:center;padding:24px;border-radius:14px;background:#fdf2ec;">'
    +'<div style="font-size:48px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:#b45f42;">'+t.n+'</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">동료가 공유한 결과예요 ☕ 당신의 직장 생존 유형은?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:#b45f42;">✨ 이런 게 강점</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:#b45f42;">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:#b45f42;">🤝 잘 맞는 동료</h3><div style="line-height:1.7;"><b>'+t.match.n+'</b> '+t.match.emoji+' — 서로를 채워주는 찰떡 조합이에요</div>'
    +'<h3 style="margin:18px 0 6px;color:#b45f42;">💥 조금 삐걱대는 유형</h3><div style="line-height:1.7;"><b>'+t.mismatch.n+'</b> '+t.mismatch.emoji+' — 스타일이 달라 이해가 필요해요</div>'
    +'<h3 style="margin:18px 0 6px;color:#b45f42;">💡 오늘의 처세 꿀팁</h3><div style="line-height:1.7;">'+t.tip+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="os-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#d97757;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #d97757;border-radius:10px;background:#fff;color:#b45f42;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="os-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#d97757;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/personality-test/">16 성격유형</a> · <a href="/tests/animal/">나는 무슨 동물</a></div>';
  $('os-result').style.display='block';
  if(shared){var mine=$('os-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('os-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODE[typeKey];
    var txt='내 직장 생존 유형은 '+t.emoji+' '+t.n+'! 너는? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('os').offsetTop-20,behavior:'smooth'});
}
function result(){render(winner(),false);}
$('os-start').onclick=function(){$('os-intro').style.display='none';$('os-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([amtig])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 직장에서 나의 생존 유형 테스트에 대하여

9개의 직장 상황 질문에 답하면 **성과로 말하는 에이스·팀의 분위기 메이커·조용한 실속러·자유로운 아이디어뱅크·차분한 조율가** 5가지 유형 중 나에게 가장 가까운 스타일을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 답변은 저장되지 않고 브라우저에서만 처리됩니다.
