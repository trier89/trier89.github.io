---
title: "나는 무슨 동물? — 성향으로 알아보는 내 동물 유형"
description: "12문항으로 알아보는 나와 닮은 동물. 8가지 동물 유형 중 나는 누구? 결과는 친구에게 바로 공유돼요."
date: 2026-07-21
slug: "animal"
categories: ["심리테스트"]
tags: ["나는 무슨 동물", "동물 테스트", "성격 동물", "심리테스트"]
toc: false
readingTime: false
---

12개의 질문으로 알아보는 **나와 닮은 동물**. 8가지 동물 유형 중 나는 누구일까요? (재미로 봐주세요 🐾)

<div id="an" style="max-width:600px;margin:0 auto;">
  <div id="an-intro" style="text-align:center;">
    <button id="an-start" style="padding:16px 40px;border:0;border-radius:12px;background:#0891b2;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 2분)</button>
  </div>
  <div id="an-quiz" style="display:none;">
    <div style="height:8px;background:#e0f2fe;border-radius:4px;margin-bottom:18px;"><div id="an-bar" style="height:8px;width:0;background:#0891b2;border-radius:4px;transition:width .3s;"></div></div>
    <div id="an-qn" style="font-size:13px;color:#999;margin-bottom:6px;"></div>
    <div id="an-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="an-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="an-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 2축으로 8동물: 에너지(E외향/I내향) × 성향(리더L/화합H/탐구T/자유F)
var TYPES={
  L1:{n:"사자",emoji:"🦁",d:"타고난 리더. 자신감 있고 결단력이 강해 무리를 이끌어요. 책임감이 크고 위기에 강합니다.",good:["강한 리더십","결단력과 추진력","위기에 침착"],watch:["독단적이 될 수 있음","남의 속도도 존중","가끔은 쉬어가기"],like:"목표가 뚜렷한 일, 인정받는 순간"},
  L2:{n:"늑대",emoji:"🐺",d:"조용한 카리스마의 전략가. 혼자서도 강하지만 신뢰하는 소수와 깊게 뭉쳐요. 충성심이 깊습니다.",good:["전략적 사고","깊은 충성심","독립적이면서 협동"],watch:["마음의 벽이 높음","먼저 다가가 보기","완벽주의 완화"],like:"믿을 수 있는 팀, 자율적인 환경"},
  H1:{n:"강아지",emoji:"🐶",d:"에너지 넘치는 분위기 메이커. 사람을 좋아하고 정이 많아, 함께 있으면 즐거워요. 순수한 열정형.",good:["친화력 최고","긍정 에너지","진심 어린 애정"],watch:["상처를 쉽게 받음","혼자 시간도 필요","거절도 연습"],like:"함께 노는 시간, 따뜻한 칭찬"},
  H2:{n:"토끼",emoji:"🐰",d:"다정하고 섬세한 평화주의자. 주변을 세심히 살피고 배려해요. 조용하지만 마음이 깊습니다.",good:["세심한 배려","공감 능력","부드러운 조율"],watch:["자기주장 약함","서운함 표현하기","거절 못함 주의"],like:"편안한 사람, 갈등 없는 분위기"},
  T1:{n:"부엉이",emoji:"🦉",d:"지혜로운 사색가. 관찰력이 뛰어나고 깊이 생각해요. 조용히 통찰을 쌓는 지식형입니다.",good:["뛰어난 통찰력","차분한 판단","깊은 지식"],watch:["생각만 하다 늦음","감정 표현 연습","완벽주의 완화"],like:"혼자만의 탐구, 지적인 대화"},
  T2:{n:"고양이",emoji:"🐱",d:"도도한 독립가. 자기만의 세계가 뚜렷하고, 관심 있는 것엔 몰입해요. 마이페이스의 매력.",good:["독립적이고 쿨함","호기심과 몰입","자기 확신"],watch:["무심해 보임","가끔 표현하기","고집 완화"],like:"내 페이스 존중, 편안한 거리감"},
  F1:{n:"돌고래",emoji:"🐬",d:"자유로운 낙천가. 어디서든 잘 어울리고 새로운 걸 즐겨요. 함께 있으면 즐거운 모험형.",good:["밝은 사교성","적응력 최고","즐거움을 전파"],watch:["집중력 분산","약속 지키기","깊이도 챙기기"],like:"즉흥 여행, 새로운 만남"},
  F2:{n:"여우",emoji:"🦊",d:"재치 있는 자유인. 눈치가 빠르고 임기응변에 강해요. 재미있고 영리한 개성파입니다.",good:["빠른 재치","임기응변","개성과 매력"],watch:["싫증을 잘 냄","진득함 기르기","진심도 보이기","약속 지키기"],like:"자유로운 분위기, 재미있는 사람"}
};
var CODEMAP={L1:'a',L2:'b',H1:'c',H2:'d',T1:'e',T2:'f',F1:'g',F2:'h'};
var FROMCODE={a:'L1',b:'L2',c:'H1',d:'H2',e:'T1',f:'T2',g:'F1',h:'F2'};
// 질문: 각 선택지가 (에너지 E/I, 성향 L/H/T/F) 점수
var QS=[
 ["처음 간 모임에서 나는?",["먼저 말 걸며 분위기 주도","E","H"],["조용히 관찰부터","I","T"],["주도해서 판을 짬","E","L"],["재밌어 보이는 사람 찾아 다님","E","F"]],
 ["문제가 생기면?",["앞장서서 해결","L"],["여러 각도로 분석","T"],["사람들과 상의","H"],["일단 부딪혀보며 방법 찾기","F"]],
 ["주말에 나는?",["사람들과 약속 가득","E"],["집에서 혼자 충전","I"],["새로운 곳 탐험","F"],["관심사 깊이 파기","T"]],
 ["칭찬받고 싶은 말은?",["'믿음직해'","L"],["'너 참 똑똑해'","T"],["'같이 있으면 편해'","H"],["'너 진짜 재밌어'","F"]],
 ["에너지가 채워지는 건?",["사람들과 어울릴 때","E"],["혼자만의 시간","I"],["목표를 이룰 때","L"],["새로운 경험","F"]],
 ["친구가 고민을 말하면?",["해결책을 제시","L"],["가만히 들어주고 공감","H"],["객관적으로 분석","T"],["기분 전환시켜줌","F"]],
 ["나의 대화 스타일은?",["활발하게 리드","E"],["듣는 편","I"],["논리적으로","T"],["농담 섞어 유쾌하게","F"]],
 ["팀에서 내 역할은?",["리더","L"],["분위기 담당","H"],["아이디어·분석","T"],["돌발상황 해결","F"]],
 ["새로운 도전 앞에서?",["앞장서 시작","L"],["신중히 계획","T"],["함께할 사람 모음","H"],["설레며 뛰어듦","F"]],
 ["나는 어느 쪽?",["활동적·사교적","E"],["차분·내향적","I"],["계획적·주도적","L"],["즉흥적·자유로움","F"]],
 ["스트레스 풀 때?",["사람들 만나 수다","E"],["혼자 조용히","I"],["운동·활동","F"],["생각 정리","T"]],
 ["내 매력 포인트는?",["카리스마","L"],["따뜻함","H"],["똑똑함","T"],["재치와 유쾌함","F"]]
];
var idx=0, e={E:0,I:0}, tr={L:0,H:0,T:0,F:0};
function show(){
  var q=QS[idx];
  $('an-qn').textContent=(idx+1)+' / '+QS.length;
  $('an-bar').style.width=(idx/QS.length*100)+'%';
  $('an-q').textContent=q[0];
  var o=$('an-opts');o.innerHTML='';
  q.slice(1).forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 15px;border:2px solid #bae6fd;border-radius:10px;background:#fff;font-size:15px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#0891b2';};
    b.onmouseout=function(){b.style.borderColor='#bae6fd';};
    b.onclick=function(){opt.slice(1).forEach(function(tag){if(tag==='E'||tag==='I')e[tag]++;else tr[tag]++;});idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
}
function winnerKey(){
  var trait='L',mx=-1;for(var k in tr){if(tr[k]>mx){mx=tr[k];trait=k;}}
  var eng=e.E>=e.I?1:2;
  // 에너지 높으면 각 성향의 대표(1), 낮으면 (2) 동물
  return trait+eng;
}
function render(key,shared){
  $('an-intro').style.display='none';$('an-quiz').style.display='none';
  var t=TYPES[key]||TYPES.H1;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('an-result').innerHTML=
    '<div style="text-align:center;padding:24px;border-radius:14px;background:#ecfeff;">'
    +'<div style="font-size:52px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:#0e7490;">나는 '+t.n+'상</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🐾 당신은 무슨 동물일까요?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:#0e7490;">✨ 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:#0e7490;">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:#0e7490;">💙 좋아하는 것</h3><div style="line-height:1.7;">'+t.like+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="an-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#0891b2;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #0891b2;border-radius:10px;background:#fff;color:#0e7490;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="an-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#0891b2;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a></div>';
  $('an-result').style.display='block';
  if(shared){var mine=$('an-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('an-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODEMAP[key];
    var txt='나랑 닮은 동물은 '+t.emoji+' '+t.n+'! 너는 무슨 동물? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('an').offsetTop-20,behavior:'smooth'});
}
function result(){render(winnerKey(),false);}
$('an-start').onclick=function(){$('an-intro').style.display='none';$('an-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([a-h])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 나는 무슨 동물? 테스트에 대하여

성향을 두 축(에너지 방향 × 리더/화합/탐구/자유)으로 분석해 **사자·늑대·강아지·토끼·부엉이·고양이·돌고래·여우** 8가지 동물 중 나와 가장 닮은 유형을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 답변은 저장되지 않습니다.
