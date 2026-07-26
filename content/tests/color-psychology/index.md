---
title: "색채 심리테스트 — 내가 끌리는 색이 말해주는 진짜 성격"
description: "8개의 색 선택으로 알아보는 나의 색채 성격. 지금 끌리는 색이 내 무의식을 비춰요. 레드·블루·옐로·그린·퍼플·블랙 6가지 색채 유형 중 나는? 결과는 친구에게 바로 공유돼요."
date: 2026-07-24
slug: "color-psychology"
categories: ["심리테스트"]
tags: ["색채 심리테스트", "컬러 심리", "성격 색깔", "심리테스트", "무의식 테스트"]
toc: false
readingTime: false
---

끌리는 색은 그날의 마음을 비춰요. 8개의 색을 고르면 나의 **색채 성격**이 나옵니다. 지금 손이 먼저 가는 색을 골라보세요. (재미로 봐주세요 🎨)

<div id="cp" style="max-width:600px;margin:0 auto;">
  <div id="cp-intro" style="text-align:center;">
    <button id="cp-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">색으로 알아보기 (약 1분)</button>
  </div>
  <div id="cp-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:18px;"><div id="cp-bar" style="height:8px;width:0;background:#7c3aed;border-radius:4px;transition:width .3s;"></div></div>
    <div id="cp-qn" style="font-size:13px;color:#6b7280;margin-bottom:6px;"></div>
    <div id="cp-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:52px;"></div>
    <div id="cp-opts" style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div>
  </div>
  <div id="cp-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPES={
  red:{n:"레드",emoji:"🔴",hex:"#e0463c",d:"열정과 추진의 사람. 목표가 생기면 곧장 몸이 움직여요. 에너지가 넘치고, 사람들을 끌고 가는 힘이 있습니다.",good:["뜨거운 추진력","솔직한 열정","두려움 없는 도전"],watch:["욱하기 전 한 박자","페이스 조절","남의 속도도 존중"],like:"짜릿한 도전, 승리의 순간"},
  blue:{n:"블루",emoji:"🔵",hex:"#3b6fd6",d:"신뢰와 깊이의 사람. 차분하게 멀리 보고, 약속을 지켜요. 곁에 있으면 안심되는, 단단한 사람입니다.",good:["흔들림 없는 신뢰","깊은 사고","침착한 판단"],watch:["가끔 마음도 표현","완벽주의 완화","너무 담아두지 않기"],like:"진솔한 대화, 믿음이 쌓이는 관계"},
  yellow:{n:"옐로",emoji:"🟡",hex:"#f2c53d",d:"밝음과 사교의 사람. 어디서든 분위기를 환하게 만들어요. 호기심 많고 낙천적인, 곁에 두고 싶은 사람입니다.",good:["밝은 긍정 에너지","뛰어난 사교성","반짝이는 호기심"],watch:["산만함 주의","혼자 시간도 필요","마무리 챙기기"],like:"즐거운 모임, 새로운 자극"},
  green:{n:"그린",emoji:"🟢",hex:"#2fa96a",d:"균형과 배려의 사람. 다투기보다 조율하고, 곁의 사람을 편하게 해줘요. 모두가 기대는 안식처 같은 존재입니다.",good:["따뜻한 배려","안정된 균형감","한결같은 편안함"],watch:["나부터 챙기기","거절도 연습","서운함은 말로"],like:"평화로운 분위기, 마음 맞는 사람"},
  purple:{n:"퍼플",emoji:"🟣",hex:"#8b5cf6",d:"감성과 독창의 사람. 남들과 다른 시선으로 세상을 봐요. 예민한 만큼 깊고, 창조적인 매력이 있습니다.",good:["독창적인 감각","풍부한 감성","깊은 직관"],watch:["감정 기복 다독이기","현실감도 챙기기","혼자 침잠 주의"],like:"영감을 주는 것, 나만의 세계"},
  black:{n:"블랙",emoji:"⚫",hex:"#2b2b30",d:"강인과 절제의 사람. 흔들리지 않는 중심과 카리스마가 있어요. 말수는 적어도 존재감이 강한, 신뢰가 가는 사람입니다.",good:["강한 자기 중심","절제된 카리스마","묵직한 존재감"],watch:["마음의 벽 낮추기","도움 청해도 돼","가끔은 가볍게"],like:"내 원칙이 지켜지는 것, 조용한 신뢰"}
};
var CODEMAP={red:'a',blue:'b',yellow:'c',green:'d',purple:'e',black:'f'};
var FROMCODE={a:'red',b:'blue',c:'yellow',d:'green',e:'purple',f:'black'};
var ORDER=['red','blue','yellow','green','purple','black'];
function C(name){return TYPES[name];}
// 질문: [문구, [색키...선택지]]  — 각 선택지는 색 스와치로 렌더, 선택 시 그 색 +1(일부 문항은 역채점)
var QS=[
 ["지금 가장 손이 먼저 가는 색은?", ["red","blue","yellow","green","purple","black"], 1],
 ["내 방 벽을 칠한다면?", ["blue","green","yellow","purple","red","black"], 1],
 ["마음이 힘들 때 감싸이고 싶은 색은?", ["blue","green","purple","yellow","black","red"], 1],
 ["나를 표현하는 옷 색은?", ["black","red","blue","green","purple","yellow"], 1],
 ["끌리는 여행지 풍경의 색은?", ["blue","green","yellow","purple","red","black"], 1],
 ["에너지가 솟구치는 색은?", ["red","yellow","purple","green","blue","black"], 1],
 ["'사랑'을 색으로 칠한다면?", ["red","purple","yellow","blue","green","black"], 1],
 ["가장 '나답다'고 느끼는 색은?", ["red","blue","yellow","green","purple","black"], 1]
];
// white_as_green 같은 변형 방지: 실제로는 6색만 사용
var idx=0, score={};ORDER.forEach(function(k){score[k]=0;});
function swatch(key){
  var t=TYPES[key]||TYPES.green;
  var b=document.createElement('button');
  b.style.cssText='display:flex;align-items:center;gap:10px;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;background:#fff;cursor:pointer;font-size:15px;font-weight:700;';
  var dot=document.createElement('span');
  dot.style.cssText='width:26px;height:26px;border-radius:50%;flex:0 0 auto;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12);background:'+t.hex+';';
  var lab=document.createElement('span');lab.textContent=t.n;lab.style.color='#333';
  b.appendChild(dot);b.appendChild(lab);
  b.onmouseover=function(){b.style.borderColor=t.hex;};
  b.onmouseout=function(){b.style.borderColor='#e5e7eb';};
  b.onclick=function(){score[key]++;idx++;idx<QS.length?show():result();};
  return b;
}
function show(){
  var q=QS[idx];
  $('cp-qn').textContent=(idx+1)+' / '+QS.length;
  $('cp-bar').style.width=(idx/QS.length*100)+'%';
  $('cp-q').textContent=q[0];
  var o=$('cp-opts');o.innerHTML='';
  // 매 문항 색 순서를 문항 정의대로 (편향 방지 위해 문항별 순서 다르게 정의됨)
  var keys=q[1].filter(function(k){return TYPES[k];});
  keys.forEach(function(k){o.appendChild(swatch(k));});
}
function winnerKey(){var best=ORDER[0],mx=-1;ORDER.forEach(function(k){if(score[k]>mx){mx=score[k];best=k;}});return best;}
function render(key,shared){
  $('cp-intro').style.display='none';$('cp-quiz').style.display='none';
  var t=TYPES[key]||TYPES.green;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('cp-result').innerHTML=
    '<div style="text-align:center;padding:26px 20px;border-radius:16px;background:linear-gradient(160deg,'+t.hex+'22,'+t.hex+'08);border:1px solid '+t.hex+'55;">'
    +'<div style="width:76px;height:76px;border-radius:50%;margin:0 auto 12px;background:'+t.hex+';box-shadow:0 6px 20px '+t.hex+'55;"></div>'
    +'<div style="font-size:26px;font-weight:800;color:#222;">'+t.emoji+' '+t.n+'型</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🎨 당신의 색은?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:'+t.hex+';">✨ 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:'+t.hex+';">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:'+t.hex+';">💜 좋아하는 것</h3><div style="line-height:1.7;">'+t.like+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="cp-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 해보기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#5b21b6;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="cp-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트 → <a href="/tests/">심리테스트</a> · 도구 → <a href="/tools/">도구방</a></div>';
  $('cp-result').style.display='block';
  if(shared){var m=$('cp-mine');if(m)m.onclick=function(){location.href=location.pathname;};}
  else{$('cp-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODEMAP[key];
    var txt='내 색채 성격은 '+t.emoji+' '+t.n+'! 너는 무슨 색? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('cp').offsetTop-20,behavior:'smooth'});
}
function result(){render(winnerKey(),false);}
$('cp-start').onclick=function(){$('cp-intro').style.display='none';$('cp-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([a-f])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 색채 심리테스트에 대하여

지금 끌리는 색은 무의식의 상태를 비춘다고 해요. 이 테스트는 뤼셔 색채검사의 원리를 참고한 **재미용 콘텐츠**로, 8개의 색 선택을 모아 레드·블루·옐로·그린·퍼플·블랙 6가지 색채 성격 중 나와 가장 가까운 유형을 알려드려요. 진단이 아닌 자기이해와 재미를 위한 것이며, 답변은 저장되지 않습니다.
