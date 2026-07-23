---
title: "나와 닮은 올림포스 12신은? — 신화로 보는 나의 신성(神性)"
description: "12개의 신화적 질문으로 알아보는 나와 닮은 올림포스 12신. 제우스·헤라·포세이돈·데메테르·아테나·아폴론·아르테미스·아레스·아프로디테·헤파이스토스·헤르메스·디오니소스 중 나의 신은? 결과는 친구에게 바로 공유돼요."
date: 2026-07-23
slug: "greek-god"
categories: ["심리테스트"]
tags: ["올림포스 12신 테스트", "나는 무슨 신", "그리스 신 유형", "그리스 로마 신화", "심리테스트"]
toc: false
readingTime: false
---

당신이 만약 신이었다면, 어느 신전에 이름이 새겨졌을까요? 12개의 신화적 질문으로 알아보는 **나와 닮은 올림포스 12신**. (재미로 봐주세요 ⚡)

<div id="gg" style="max-width:600px;margin:0 auto;">
  <div id="gg-intro" style="text-align:center;">
    <button id="gg-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">신탁 받으러 가기 (약 2분)</button>
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
// 올림포스 12신 — 점수 합산형(질문마다 신들에게 점수 배분, 최고점 = 나의 신)
var TYPES={
  zeus:{n:"제우스",emoji:"⚡",d:"하늘과 신들을 다스리는 왕. 타고난 위엄과 결단으로 판을 이끌어요. 사람들이 자연히 기대게 되는, 책임을 짊어지는 리더입니다.",good:["압도하는 존재감","위기에 강한 결단력","넓게 보는 시야"],watch:["독단이 될 수 있음","권위보다 신뢰로","약함을 보여도 괜찮아"],like:"판을 주도하는 순간, 인정과 존중"},
  hera:{n:"헤라",emoji:"👑",d:"신들의 여왕. 자존심과 품격, 그리고 소중한 것을 향한 흔들림 없는 신의가 있어요. 격을 지키고 관계의 질서를 소중히 하는 사람입니다.",good:["기품 있는 자존감","한번 정한 신의","관계에 대한 책임감"],watch:["질투·서운함 조심","놓아줄 줄도 알기","완벽한 관계는 없어"],like:"진심 어린 존중, 격이 지켜지는 관계"},
  posei:{n:"포세이돈",emoji:"🌊",d:"바다와 폭풍의 신. 겉은 잔잔해도 안엔 거대한 파도가 있어요. 감정과 힘의 진폭이 크고, 한번 움직이면 세상을 뒤흔드는 사람입니다.",good:["깊고 강한 에너지","솔직한 감정","한번 정하면 거침없음"],watch:["감정의 파도 다스리기","충동 전 한 박자","고요할 때 힘 비축"],like:"온전히 몰아치는 열정, 광활한 자유"},
  deme:{n:"데메테르",emoji:"🌾",d:"대지와 수확의 여신. 곁의 사람을 먹이고 키우고 지켜요. 드러나지 않아도 모두가 기대는, 따뜻하고 헌신적인 안식처 같은 사람입니다.",good:["깊은 돌봄과 헌신","한결같은 안정감","단단한 책임감"],watch:["나부터 챙기기","다 떠안지 않기","서운함은 말로"],like:"소중한 이들의 평안, 정성이 닿는 순간"},
  athena:{n:"아테나",emoji:"🦉",d:"지혜와 전략의 여신. 감정에 앞서 판을 읽고 최선의 수를 둬요. 냉철하면서도 공정한, 문제를 꿰뚫는 전략가입니다.",good:["탁월한 통찰과 판단","침착한 위기대응","공정한 균형감"],watch:["너무 이성적으로 비침","감정도 데이터야","완벽주의 완화"],like:"논리적인 대화, 난제를 풀어내는 쾌감"},
  apollo:{n:"아폴론",emoji:"☀️",d:"빛·예술·진리의 신. 재능이 많고 표현이 빛나며, 사람들 앞에서 환하게 존재감을 드러내요. 아름다움과 완성을 추구하는 사람입니다.",good:["빛나는 재능과 감각","뛰어난 표현력","높은 기준"],watch:["완벽주의 부담","실수도 과정이야","자신에게 관대하게"],like:"창작과 무대, 진심 어린 감탄"},
  arte:{n:"아르테미스",emoji:"🏹",d:"달과 사냥의 여신. 독립적이고 자기 세계가 뚜렷해요. 혼자여도 강하고, 무엇보다 자유와 소신을 지키는 사람입니다.",good:["강한 독립심","뚜렷한 소신","흔들리지 않는 중심"],watch:["가끔 곁을 내주기","도움 청해도 돼","고집 살짝 풀기"],like:"내 페이스, 자연과 자유"},
  ares:{n:"아레스",emoji:"⚔️",d:"전쟁과 투지의 신. 뜨겁고 직진하며, 물러섬 없이 부딪혀요. 불의를 못 참고 원하는 걸 향해 온몸으로 달려드는 사람입니다.",good:["불타는 추진력","솔직한 열정","두려움 없는 도전"],watch:["욱하기 전 심호흡","전략도 무기야","다 이길 필욘 없어"],like:"정면승부, 승리의 짜릿함"},
  aphro:{n:"아프로디테",emoji:"🌹",d:"사랑과 아름다움의 여신. 사람을 끌어당기는 매력과 풍부한 감성이 있어요. 관계와 설렘 속에서 가장 빛나는 사교형입니다.",good:["타고난 매력과 친화력","섬세한 감성","분위기를 밝힘"],watch:["감정 기복 다독이기","혼자 시간도 필요","거절도 연습"],like:"설레는 인연, 진심 어린 애정"},
  hepha:{n:"헤파이스토스",emoji:"🔨",d:"불과 장인의 신. 화려하지 않아도 묵묵히 몰입해 세상에 없던 걸 만들어내요. 손끝의 완성도로 말하는, 진국인 사람입니다.",good:["깊은 몰입과 끈기","무언가를 만드는 힘","묵직한 성실함"],watch:["나를 낮추지 말기","자랑도 필요해","혼자만 애쓰지 않기"],like:"몰입의 시간, 결과물이 완성되는 순간"},
  herm:{n:"헤르메스",emoji:"🪽",d:"전령·여행·기지의 신. 빠르고 영리하며 어디든 가볍게 넘나들어요. 재치로 상황을 풀고 새로움을 즐기는 자유로운 재간꾼입니다.",good:["번뜩이는 기지","뛰어난 소통력","유연한 적응력"],watch:["한 곳에 깊이도","가벼움과 진지함 균형","마무리도 챙기기"],like:"새로운 자극, 재치가 통하는 순간"},
  dio:{n:"디오니소스",emoji:"🍷",d:"포도주와 축제의 신. 어디서든 흥과 해방을 만들어요. 틀을 깨고 순간을 만끽하며, 사람들을 즐겁게 물들이는 낙천적 자유인입니다.",good:["넘치는 흥과 에너지","즐거움을 전파","틀을 깨는 발상"],watch:["즉흥에만 기대지 않기","절제의 균형","뒷정리도 챙기기"],like:"축제 같은 자리, 경계를 넘는 해방감"}
};
var IMG={zeus:'zeus',hera:'hera',posei:'poseidon',deme:'demeter',athena:'athena',apollo:'apollo',arte:'artemis',ares:'ares',aphro:'aphrodite',hepha:'hephaestus',herm:'hermes',dio:'dionysus'};
var CODEMAP={zeus:'a',hera:'b',posei:'c',deme:'d',athena:'e',apollo:'f',arte:'g',ares:'h',aphro:'i',hepha:'j',herm:'k',dio:'l'};
var FROMCODE={a:'zeus',b:'hera',c:'posei',d:'deme',e:'athena',f:'apollo',g:'arte',h:'ares',i:'aphro',j:'hepha',k:'herm',l:'dio'};
// 우선순위(동점 시 앞선 신 선택)
var ORDER=['zeus','athena','apollo','arte','aphro','poseidon','hera','deme','ares','hepha','herm','dio'].map(function(x){return x==='poseidon'?'posei':x;});
// 질문: 각 선택지 = [문구, 주신(+2), 부신(+1)] — 가치·욕망·반응 기반(행동 체크리스트 아님)
var QS=[
 ["신들이 당신에게 신전을 지어준다면, 정문에 새길 단 한 단어는?",
   ["군림 — 다스리는 자",'zeus','hera'],["예지 — 꿰뚫는 자",'athena','hepha'],["매혹 — 이끌리게 하는 자",'aphro','deme'],["해방 — 얽매이지 않는 자",'arte','dio']],
 ["인간들이 밤마다 당신에게 올리는 기도는?",
   ["'저희를 이끌 강한 힘을 주소서'",'zeus','ares'],["'풍요와 안식을 지켜주소서'",'deme','hera'],["'영감과 재능을 내려주소서'",'apollo','hepha'],["'운명 같은 인연을 만나게 하소서'",'aphro','herm']],
 ["당신에게 단 하나의 신적 권능이 주어진다면?",
   ["폭풍과 바다를 뒤흔드는 힘",'posei','zeus'],["전장을 가르는 불굴의 투지",'ares','arte'],["모든 진실을 꿰뚫는 지혜",'athena','apollo'],["무엇이든 빚어내는 손",'hepha','deme']],
 ["올림포스의 축제, 그 밤의 당신은?",
   ["잔을 들고 흥을 이끄는 중심",'dio','zeus'],["사람들 사이를 재치있게 누비는 이",'herm','aphro'],["조용한 자리에서 밤을 음미하는 이",'arte','hepha'],["곁의 몇몇과 깊이 마음 나누는 이",'deme','hera']],
 ["누군가 당신이 가장 아끼는 것을 넘봤다. 당신은?",
   ["정면으로 맞서 응징한다",'ares','zeus'],["자존심을 걸고 끝까지 지킨다",'hera','posei'],["허를 찌르는 한 수로 되받는다",'herm','athena'],["미련 없이 내 길을 간다",'arte','dio']],
 ["당신의 진짜 매력은 어디서 흘러나올까?",
   ["타고난 위엄과 존재감",'zeus','hera'],["빛나는 재능과 감각",'apollo','aphro'],["깊은 통찰과 실력",'athena','hepha'],["얽매이지 않는 자유로움",'dio','arte']],
 ["세상에 단 하나를 남긴다면?",
   ["질서와 번영의 시대",'zeus','deme'],["길이 남을 걸작 하나",'hepha','apollo'],["누군가를 살린 따뜻한 손길",'deme','aphro'],["아무도 못 가본 길의 첫 발자국",'herm','posei']],
 ["가장 '나다운' 성역(聖域)은?",
   ["모두가 우러르는 드높은 궁전",'zeus','hera'],["달빛 스민 깊은 숲",'arte','apollo'],["파도가 부서지는 거친 바닷가",'posei','ares'],["불꽃 튀는 작업장",'hepha','dio']],
 ["함께 모험할 동료로서 당신은?",
   ["앞장서 이끄는 대장",'zeus','ares'],["판을 읽는 전략가",'athena','herm'],["모두를 챙기는 버팀목",'deme','hera'],["분위기를 살리는 자유인",'dio','aphro']],
 ["당신이 도저히 못 견디는 것은?",
   ["무시당하는 것",'hera','zeus'],["불의와 비겁함",'ares','athena'],["구속과 통제",'arte','dio'],["무성의와 대충함",'hepha','apollo']],
 ["당신을 움직이는 가장 큰 원동력은?",
   ["기어이 이기고 싶은 승부욕",'ares','zeus'],["사랑하고 사랑받고 싶은 마음",'aphro','hera'],["더 알고 더 잘하고 싶은 열망",'athena','apollo'],["새로움을 향한 설렘",'herm','dio']],
 ["훗날 사람들이 당신을 이렇게 기억했으면?",
   ["위대하고 강했던 사람",'zeus','posei'],["지혜롭고 우아했던 사람",'athena','hera'],["따뜻하고 다정했던 사람",'deme','aphro'],["자유롭고 특별했던 사람",'arte','herm']]
];
var idx=0, score={};for(var k in TYPES)score[k]=0;
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
    b.onclick=function(){score[opt[1]]+=2;score[opt[2]]+=1;idx++;idx<QS.length?show():result();};
    o.appendChild(b);
  });
}
function winnerKey(){
  var best=ORDER[0],mx=-1;
  ORDER.forEach(function(k){if(score[k]>mx){mx=score[k];best=k;}});
  return best;
}
function render(key,shared){
  $('gg-intro').style.display='none';$('gg-quiz').style.display='none';
  var t=TYPES[key]||TYPES.zeus;
  function list(a){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  $('gg-result').innerHTML=
    '<div style="text-align:center;padding:24px;border-radius:14px;background:#f5f3ff;">'
    +'<img src="/tests/greek-god/'+(IMG[key]||'zeus')+'.jpg" alt="'+t.n+'" style="width:220px;max-width:70%;aspect-ratio:3/4;object-fit:cover;object-position:top center;border-radius:14px;box-shadow:0 6px 20px rgba(91,33,182,.28);margin-bottom:12px;" loading="lazy">'
    +'<div style="font-size:30px;">'+t.emoji+'</div>'
    +'<div style="font-size:26px;font-weight:800;color:#5b21b6;">나는 '+t.n+'型</div></div>'
    +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 ⚡ 당신과 닮은 신은?</div>':'')
    +'<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>'
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">✨ 이런 게 매력</h3>'+list(t.good)
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">⚠️ 이런 건 조심</h3>'+list(t.watch)
    +'<h3 style="margin:18px 0 6px;color:#5b21b6;">💜 좋아하는 것</h3><div style="line-height:1.7;">'+t.like+'</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="gg-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 신탁 받기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#5b21b6;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="gg-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">그리스 신화 영상도 보러가기 → <a href="https://www.youtube.com/@%EB%8B%A4%EB%9D%BD%EB%B0%A9" target="_blank" rel="noopener">유튜브</a> · 다른 테스트 → <a href="/tests/">심리테스트</a></div>';
  $('gg-result').style.display='block';
  if(shared){var mine=$('gg-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('gg-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODEMAP[key];
    var txt='나랑 닮은 올림포스 신은 '+t.emoji+' '+t.n+'! 너는 무슨 신? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('gg').offsetTop-20,behavior:'smooth'});
}
function result(){render(winnerKey(),false);}
$('gg-start').onclick=function(){$('gg-intro').style.display='none';$('gg-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([a-l])/);if(m){render(FROMCODE[m[1]],true);}})();
})();
</script>

## 올림포스 12신 테스트에 대하여

가치·욕망·반응을 묻는 12개의 신화적 질문에 답하면, 선택마다 **올림포스 12신**에게 점수가 쌓여 가장 높은 점수의 신이 당신과 닮은 신으로 나와요. 제우스·헤라·포세이돈·데메테르·아테나·아폴론·아르테미스·아레스·아프로디테·헤파이스토스·헤르메스·디오니소스 — 나의 신은 누구일까요? 재미와 자기이해를 위한 콘텐츠이며, 답변은 저장되지 않습니다.
