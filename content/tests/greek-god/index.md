---
title: "나와 닮은 그리스 신은? — 성향으로 알아보는 나의 올림포스 신"
description: "12문항으로 알아보는 나와 닮은 그리스 신. 제우스·아테나·아폴론·아르테미스·아프로디테·디오니소스·하데스·헤스티아 8신 중 나는 누구? 결과는 친구에게 바로 공유돼요."
date: 2026-07-23
slug: "greek-god"
categories: ["심리테스트"]
tags: ["그리스 신 테스트", "나는 무슨 신", "올림포스 신 유형", "그리스 로마 신화", "심리테스트"]
toc: false
readingTime: false
---

12개의 질문으로 알아보는 **나와 닮은 그리스 신**. 올림포스의 8신 중 나는 누구일까요? (재미로 봐주세요 ⚡)

<div id="gg" style="max-width:600px;margin:0 auto;">
  <div id="gg-intro" style="text-align:center;">
    <button id="gg-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 2분)</button>
  </div>
  <div id="gg-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:18px;"><div id="gg-bar" style="height:8px;width:0;background:#7c3aed;border-radius:4px;transition:width .3s;"></div></div>
    <div id="gg-qn" style="font-size:13px;color:#6b7280;margin-bottom:6px;"></div>
    <div id="gg-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="gg-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="gg-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 2축: 에너지(E외향/I내향) × 영역(P힘·리더 / W지혜 / L사랑·감성 / F자유·모험)
var TYPES={
  P1:{n:"제우스",emoji:"⚡",d:"하늘을 다스리는 왕. 타고난 카리스마와 결단력으로 사람들을 이끌어요. 판을 주도하고 책임지는 리더형입니다.",good:["강력한 리더십","결단력과 추진력","위기에 당당함"],watch:["독단적이 될 수 있음","남의 의견도 경청","권위보다 신뢰로"],like:"주도하는 자리, 인정받는 순간"},
  P2:{n:"하데스",emoji:"🖤",d:"보이지 않는 곳에서 세상을 움직이는 조용한 실력자. 과묵하지만 내면의 힘이 깊고, 한번 정한 건 끝까지 지켜요.",good:["묵직한 존재감","깊은 인내심","흔들리지 않는 소신"],watch:["마음의 벽이 높음","먼저 마음 열기","혼자 짊어지지 않기"],like:"내 영역이 존중되는 것, 조용한 신뢰"},
  W1:{n:"아폴론",emoji:"☀️",d:"빛과 예술의 신. 밝고 재능이 많으며 표현력이 뛰어나요. 사람들 앞에서 빛나는 지적인 매력의 소유자.",good:["뛰어난 표현력","다재다능함","밝은 지성"],watch:["완벽주의 부담","실수도 괜찮아","자기 인정하기"],like:"창작과 무대, 지적인 감탄"},
  W2:{n:"아테나",emoji:"🦉",d:"지혜와 전략의 여신. 냉철하게 판단하고 깊이 사고해요. 감정보다 논리로 문제를 꿰뚫는 전략가입니다.",good:["탁월한 통찰력","침착한 판단","전략적 사고"],watch:["너무 이성적으로 보임","감정 표현 연습","완벽주의 완화"],like:"논리적인 대화, 문제를 풀어내는 순간"},
  L1:{n:"아프로디테",emoji:"🌹",d:"사랑과 아름다움의 여신. 사람을 끌어당기는 매력과 따뜻한 감성이 있어요. 관계 속에서 빛나는 사교형입니다.",good:["뛰어난 매력과 친화력","풍부한 감성","분위기를 밝힘"],watch:["감정 기복 주의","혼자 시간도 필요","거절도 연습"],like:"설레는 만남, 진심 어린 애정"},
  L2:{n:"헤스티아",emoji:"🔥",d:"화로의 여신. 조용하고 다정하며 주변을 따뜻하게 감싸요. 드러나지 않지만 모두가 기대는 안식처 같은 사람.",good:["깊은 배려와 공감","편안한 안정감","한결같은 따뜻함"],watch:["자기주장 약함","서운함 표현하기","나를 먼저 챙기기"],like:"포근한 공간, 마음 맞는 소수"},
  F1:{n:"디오니소스",emoji:"🍷",d:"자유와 흥의 신. 어디서든 즐거움을 만들고 순간을 만끽해요. 틀에 얽매이지 않는 낙천적 자유인입니다.",good:["넘치는 에너지","즐거움을 전파","자유로운 발상"],watch:["즉흥에 치우침","마무리도 챙기기","절제의 균형"],like:"축제 같은 자리, 새로운 자극"},
  F2:{n:"아르테미스",emoji:"🏹",d:"사냥과 달의 여신. 독립적이고 자기 세계가 뚜렷해요. 혼자여도 강하고, 자유를 무엇보다 소중히 여깁니다.",good:["강한 독립심","뚜렷한 소신","자유로운 정신"],watch:["거리를 두는 편","가끔 곁을 내주기","고집 완화"],like:"내 페이스, 자연과 자유"}
};
// 각 신의 캐릭터 이미지 (우리 그리스신화 영상 캐릭터 아트)
var IMG={P1:'zeus',P2:'hades',W1:'apollo',W2:'athena',L1:'aphrodite',L2:'hestia',F1:'dionysus',F2:'artemis'};
var CODEMAP={P1:'a',P2:'b',W1:'c',W2:'d',L1:'e',L2:'f',F1:'g',F2:'h'};
var FROMCODE={a:'P1',b:'P2',c:'W1',d:'W2',e:'L1',f:'L2',g:'F1',h:'F2'};
// 각 선택지 = (에너지 E/I, 영역 P/W/L/F) 태그
var QS=[
 ["처음 간 모임에서 나는?",["먼저 나서서 분위기를 이끔","E","P"],["조용히 사람들을 관찰","I","W"],["마음 맞는 사람과 도란도란","E","L"],["재밌어 보이는 쪽으로 훌쩍","E","F"]],
 ["문제가 생기면?",["앞장서서 결단","P"],["차분히 분석·전략","W"],["사람들과 마음 나눔","L"],["일단 부딪히며 길 찾기","F"]],
 ["주말의 나는?",["사람들과 약속 가득","E"],["집에서 혼자 충전","I"],["새로운 곳 탐험","F"],["관심사 깊이 파기","W"]],
 ["듣고 싶은 칭찬은?",["'믿음직해'","P"],["'너 참 똑똑해'","W"],["'같이 있으면 따뜻해'","L"],["'너 진짜 자유롭다'","F"]],
 ["에너지가 채워지는 순간?",["사람들과 어울릴 때","E"],["혼자만의 시간","I"],["목표를 이룰 때","P"],["새로운 경험","F"]],
 ["친구가 고민을 털어놓으면?",["방향을 정해줌","P"],["가만히 공감하고 다독임","L"],["객관적으로 분석","W"],["기분 전환시켜줌","F"]],
 ["나의 대화 스타일은?",["활발하게 리드","E"],["듣는 편","I"],["논리적으로","W"],["유쾌하게 툭툭","F"]],
 ["팀에서 내 역할은?",["리더","P"],["분위기·화합 담당","L"],["아이디어·전략","W"],["돌발상황 해결사","F"]],
 ["새로운 도전 앞에서?",["앞장서 시작","P"],["신중히 계획","W"],["함께할 사람부터","L"],["설레며 뛰어듦","F"]],
 ["나는 어느 쪽?",["활동적·사교적","E"],["차분·내향적","I"],["주도적·책임감","P"],["즉흥적·자유로움","F"]],
 ["스트레스 풀 때?",["사람들과 수다","E"],["혼자 조용히","I"],["몸을 움직이며","F"],["생각을 정리하며","W"]],
 ["내 매력 포인트는?",["카리스마","P"],["따뜻함","L"],["지성","W"],["자유로운 개성","F"]]
];
var idx=0, e={E:0,I:0}, dm={P:0,W:0,L:0,F:0};
function show(){
  var q=QS[idx];
  $('gg-qn').textContent=(idx+1)+' / '+QS.length;
  $('gg-bar').style.width=(idx/QS.length*100)+'%';
  $('gg-q').textContent=q[0];
  var o=$('gg-opts');o.innerHTML='';
  q.slice(1).forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 15px;border:2px solid #ddd6fe;border-radius:10px;background:#fff;font-size:15px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#7c3aed';};
    b.onmouseout=function(){b.style.borderColor='#ddd6fe';};
    b.onclick=function(){opt.slice(1).forEach(function(tag){if(tag==='E'||tag==='I')e[tag]++;else dm[tag]++;});idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
}
function winnerKey(){
  var dom='P',mx=-1;for(var k in dm){if(dm[k]>mx){mx=dm[k];dom=k;}}
  var eng=e.E>=e.I?1:2;
  return dom+eng;
}
function render(key,shared){
  $('gg-intro').style.display='none';$('gg-quiz').style.display='none';
  var t=TYPES[key]||TYPES.L1;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('gg-result').innerHTML=
    '<div style="text-align:center;padding:24px;border-radius:14px;background:#f5f3ff;">'
    +'<img src="/tests/greek-god/'+(IMG[key]||'zeus')+'.jpg" alt="'+t.n+'" style="width:180px;height:180px;object-fit:cover;border-radius:14px;box-shadow:0 4px 16px rgba(91,33,182,.25);margin-bottom:10px;" loading="lazy">'
    +'<div style="font-size:30px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:#5b21b6;">나는 '+t.n+'型</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 ⚡ 당신과 닮은 신은?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">✨ 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">💜 좋아하는 것</h3><div style="line-height:1.7;">'+t.like+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="gg-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#5b21b6;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="gg-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">그리스 신화 영상도 보러가기 → <a href="https://www.youtube.com/@%EB%8B%A4%EB%9D%BD%EB%B0%A9" target="_blank" rel="noopener">유튜브</a> · 다른 테스트 → <a href="/tests/">심리테스트</a></div>';
  $('gg-result').style.display='block';
  if(shared){var mine=$('gg-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('gg-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODEMAP[key];
    var txt='나랑 닮은 그리스 신은 '+t.emoji+' '+t.n+'! 너는 무슨 신? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('gg').offsetTop-20,behavior:'smooth'});
}
function result(){render(winnerKey(),false);}
$('gg-start').onclick=function(){$('gg-intro').style.display='none';$('gg-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([a-h])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 나와 닮은 그리스 신 테스트에 대하여

성향을 두 축(에너지 방향 × 힘·지혜·사랑·자유)으로 분석해 **제우스·하데스·아폴론·아테나·아프로디테·헤스티아·디오니소스·아르테미스** 8신 중 나와 가장 닮은 유형을 알려드려요. 재미와 자기이해를 위한 콘텐츠이며, 답변은 저장되지 않습니다.
