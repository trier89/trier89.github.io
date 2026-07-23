---
title: "그림 심리테스트 — 얼룩 그림 보고 떠오르는 것으로 알아보는 무의식"
description: "6개의 추상 얼룩 그림(잉크블롯)을 보고 떠오르는 것을 고르면 나의 무의식 성향이 보여요. 로르샤흐 투사검사 원리를 응용한 그림 심리테스트. 결과는 친구에게 바로 공유돼요."
date: 2026-07-24
slug: "image-projection"
categories: ["심리테스트"]
tags: ["그림 심리테스트", "로르샤흐 테스트", "잉크블롯 테스트", "투사검사", "무의식 테스트", "심리테스트"]
toc: false
readingTime: false
---

같은 얼룩 그림도 사람마다 다르게 보여요. 그 "먼저 떠오르는 것"에 무의식이 비칩니다. 6장의 그림을 보고 가장 먼저 떠오르는 걸 골라보세요 — 정답은 없어요. (재미로 봐주세요 🖼️)

<div id="ip" style="max-width:600px;margin:0 auto;">
  <div id="ip-intro" style="text-align:center;">
    <button id="ip-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">그림 보러가기 (약 1분)</button>
  </div>
  <div id="ip-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:16px;"><div id="ip-bar" style="height:8px;width:0;background:#7c3aed;border-radius:4px;transition:width .3s;"></div></div>
    <div id="ip-qn" style="font-size:13px;color:#6b7280;margin-bottom:8px;"></div>
    <img id="ip-img" alt="잉크블롯" style="width:100%;max-width:460px;display:block;margin:0 auto 6px;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,.08);">
    <div id="ip-q" style="font-size:17px;font-weight:700;text-align:center;margin:8px 0;">가장 먼저 떠오르는 것은?</div>
    <div id="ip-opts" style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div>
  </div>
  <div id="ip-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPES={
  emotion:{n:"감정탐색가",emoji:"💧",c:"#3b82f6",d:"그림에서 얼굴·마음·깊은 것을 먼저 본 당신. 감정의 결을 섬세하게 읽고, 내면을 깊이 들여다보는 사람이에요. 공감 능력이 크고, 관계의 정서를 잘 헤아려요.",good:["섬세한 공감력","깊은 내면 탐구","풍부한 감수성"],watch:["감정에 잠기지 않기","나부터 돌보기","경계 세우기"],like:"진심이 오가는 순간, 깊은 대화"},
  drive:{n:"성취추진가",emoji:"🔥",c:"#e0463c",d:"힘·움직임·타오르는 것을 먼저 본 당신. 목표를 향해 직진하는 추진력의 소유자예요. 에너지가 넘치고, 정체되는 걸 못 견뎌요.",good:["강한 추진력","목표 집중","도전 정신"],watch:["번아웃 주의","쉬어가기","과정도 즐기기"],like:"목표 달성, 앞으로 나아가는 감각"},
  rel:{n:"관계조율가",emoji:"🤝",c:"#16b979",d:"두 사람·맞닿음·연결을 먼저 본 당신. 사람 사이를 잇고 조율하는 데 능해요. 함께일 때 빛나고, 곁의 사람을 편하게 만들어요.",good:["뛰어난 조화력","따뜻한 친화력","관계 통찰"],watch:["나 의견도 내기","모두 만족은 불가","혼자 시간도"],like:"함께하는 시간, 마음이 통하는 관계"},
  free:{n:"자유몽상가",emoji:"🕊️",c:"#8b5cf6",d:"날개·비상·우주 같은 걸 먼저 본 당신. 틀을 넘어 상상하는 자유로운 영혼이에요. 새로움에 끌리고, 얽매이는 걸 싫어해요.",good:["자유로운 상상력","독창적 발상","열린 마음"],watch:["현실감도 챙기기","마무리 신경","산만함 주의"],like:"새로운 경험, 무한한 가능성"},
  stab:{n:"안정수호자",emoji:"🌿",c:"#2fa96a",d:"꽃·나무·자연을 먼저 본 당신. 균형과 안정을 지키는 든든한 사람이에요. 차분하고, 주변을 편안하게 감싸요.",good:["단단한 안정감","꾸준한 성실함","평화로운 조화"],watch:["변화도 받아들이기","도전도 가끔","자기표현 늘리기"],like:"평온한 일상, 오래가는 것"},
  insight:{n:"통찰관찰자",emoji:"🔍",c:"#e0b878",d:"대칭·구조·정교한 무늬를 먼저 본 당신. 패턴을 읽고 본질을 꿰뚫는 분석가예요. 냉철하고, 숨은 질서를 발견해요.",good:["예리한 통찰","논리적 분석","객관적 시야"],watch:["감정도 살피기","완벽주의 완화","직관도 믿기"],like:"본질을 파악하는 순간, 지적인 발견"}
};
var CODEMAP={emotion:'a',drive:'b',rel:'c',free:'d',stab:'e',insight:'f'};
var FROMCODE={a:'emotion',b:'drive',c:'rel',d:'free',e:'stab',f:'insight'};
var ORDER=['emotion','drive','rel','free','stab','insight'];
// 각 문항: {img, opts:[[문구,type],...]}
var QS=[
 {img:'inkblot1.jpg',opts:[["나비나 날개","free"],["마주 본 두 사람","rel"],["피어나는 꽃","stab"],["타오르는 불꽃","drive"]]},
 {img:'inkblot2.jpg',opts:[["신비로운 가면","insight"],["날개 편 새","free"],["물속의 생명체","emotion"],["맞닿은 두 손","rel"]]},
 {img:'inkblot3.jpg',opts:[["빛나는 왕관","drive"],["나무와 뿌리","stab"],["춤추는 사람","free"],["심장, 감정","emotion"]]},
 {img:'inkblot4.jpg',opts:[["우주나 은하","free"],["신비한 꽃","stab"],["어떤 표정","emotion"],["대칭 무늬","insight"]]},
 {img:'inkblot5.jpg',opts:[["숲이나 정원","stab"],["웅크린 동물","emotion"],["뻗어나가는 힘","drive"],["기댄 두 형상","rel"]]},
 {img:'inkblot6.jpg',opts:[["강렬한 짐승","drive"],["정교한 설계","insight"],["마주 선 둘","rel"],["미지의 심연","emotion"]]}
];
var idx=0, score={};ORDER.forEach(function(k){score[k]=0;});
function show(){
  var q=QS[idx];
  $('ip-qn').textContent=(idx+1)+' / '+QS.length;
  $('ip-bar').style.width=(idx/QS.length*100)+'%';
  $('ip-img').src='/tests/image-projection/'+q.img;
  var o=$('ip-opts');o.innerHTML='';
  q.opts.forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 12px;border:2px solid #ddd6fe;border-radius:10px;background:#fff;font-size:15px;font-weight:600;cursor:pointer;';
    b.onmouseover=function(){b.style.borderColor='#7c3aed';};
    b.onmouseout=function(){b.style.borderColor='#ddd6fe';};
    b.onclick=function(){score[opt[1]]++;idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
  window.scrollTo({top:$('ip').offsetTop-16,behavior:'smooth'});
}
function winnerKey(){var best=ORDER[0],mx=-1;ORDER.forEach(function(k){if(score[k]>mx){mx=score[k];best=k;}});return best;}
function render(key,shared){
  $('ip-intro').style.display='none';$('ip-quiz').style.display='none';
  var t=TYPES[key]||TYPES.emotion;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('ip-result').innerHTML=
    '<div style="text-align:center;padding:26px 20px;border-radius:16px;background:linear-gradient(160deg,'+t.c+'18,'+t.c+'06);border:1px solid '+t.c+'44;">'
    +'<div style="font-size:38px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:'+t.c+';margin-top:4px;">'+t.n+'</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🖼️ 당신은 뭐가 보이나요?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:'+t.c+';">✨ 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:'+t.c+';">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:'+t.c+';">💜 좋아하는 것</h3><div style="line-height:1.7;">'+t.like+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="ip-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 해보기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#5b21b6;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="ip-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트 → <a href="/tests/">심리테스트</a> · 도구 → <a href="/tools/">도구방</a></div>';
  $('ip-result').style.display='block';
  if(shared){var m=$('ip-mine');if(m)m.onclick=function(){location.href=location.pathname;};}
  else{$('ip-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODEMAP[key];
    var txt='그림 심리테스트 결과, 나는 '+t.emoji+' '+t.n+'! 너는 뭐가 보여? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('ip').offsetTop-20,behavior:'smooth'});
}
function result(){render(winnerKey(),false);}
$('ip-start').onclick=function(){$('ip-intro').style.display='none';$('ip-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([a-f])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 그림 심리테스트에 대하여

같은 추상 그림도 보는 사람에 따라 다르게 해석돼요. 이렇게 모호한 자극에 자기 마음을 투영하는 원리를 **투사검사**라 하고, 대표적으로 **로르샤흐 잉크블롯 검사**가 있어요. 이 테스트는 그 원리를 재미있게 응용한 콘텐츠로, 6장의 그림에서 먼저 떠오른 것을 모아 감정탐색가·성취추진가·관계조율가·자유몽상가·안정수호자·통찰관찰자 6가지 무의식 성향 중 나와 가까운 유형을 알려드려요. 실제 심리 진단이 아니며, 재미와 자기이해를 위한 것입니다.
