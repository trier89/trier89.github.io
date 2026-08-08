---
title: "아우라 컬러 테스트 — 내 영혼의 색은 무슨 색일까?"
emoji: "🌈"
description: "무료 아우라 컬러 테스트 — 12문항으로 알아보는 나를 감싼 영혼의 색. 레드·오렌지·옐로·그린·블루·퍼플·핑크 7가지 아우라 색 중 내 색은? 성격으로 풀어보는 재미있는 색 심리테스트, 결과는 바로 공유돼요."
date: 2026-08-07
slug: "aura-color"
categories: ["심리테스트"]
tags: ["아우라 컬러", "아우라 색 테스트", "퍼스널 컬러 심리", "색 심리테스트", "심리테스트"]
toc: false
readingTime: false
---

색을 고르는 게 아니라, **나를 감싼 색을 찾아주는** 테스트예요. 12개의 질문에 답하면 지금 당신의 에너지가 어떤 빛깔을 내뿜고 있는지 — 일곱 가지 아우라 컬러 중 내 색을 찾아드려요. (재미로 보는 심리테스트예요 🌈)

<div id="au" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:22px 18px;color:#2b2b2b;box-shadow:0 2px 16px rgba(0,0,0,.15);">
  <div id="au-intro" style="text-align:center;">
    <button id="au-start" style="padding:16px 40px;border:0;border-radius:12px;background:#6d28d9;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">내 아우라 색 찾기 (약 1분)</button>
  </div>
  <div id="au-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:18px;"><div id="au-bar" style="height:8px;width:0;background:#6d28d9;border-radius:4px;transition:width .3s;"></div></div>
    <div id="au-qn" style="font-size:13px;color:#9ca3af;margin-bottom:6px;"></div>
    <div id="au-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;color:#2b2b2b;"></div>
    <div id="au-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="au-result" style="display:none;color:#2b2b2b;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPE={
  R:{n:"레드 아우라",emoji:"🔴",color:"#e0392f",d:"당신을 감싼 색은 뜨거운 레드예요. 어디에 있든 존재감이 확 드러나고, 하고 싶은 게 생기면 곧장 몸이 먼저 움직이죠. 열정과 추진력, 그리고 사람들을 끌어당기는 강한 에너지가 당신의 빛깔이에요.",key:"열정 · 추진력 · 리더십",love:"함께 있으면 심장이 뛰게 만드는 사람",match:"🔵 블루 아우라 (당신의 열기를 차분히 받쳐줘요)"},
  O:{n:"오렌지 아우라",emoji:"🟠",color:"#f0821e",d:"당신을 감싼 색은 따뜻한 오렌지예요. 낯선 자리에서도 금세 웃음을 만들고, 사람들 사이에 있을 때 가장 빛나죠. 낙천적인 활력과 사교성, 곁에 있으면 기분 좋아지는 온기가 당신의 색이에요.",key:"사교성 · 낙천 · 활력",love:"곁에 있으면 늘 즐거운 사람",match:"🟢 그린 아우라 (당신의 에너지에 안정감을 더해줘요)"},
  Y:{n:"옐로 아우라",emoji:"🟡",color:"#e8b60e",d:"당신을 감싼 색은 반짝이는 옐로예요. 호기심이 많아 늘 새로운 걸 궁리하고, 번뜩이는 아이디어로 주변을 놀라게 하죠. 밝은 지성과 창의력, 톡톡 튀는 생기가 당신의 빛깔이에요.",key:"창의 · 지성 · 명랑",love:"이야기가 끊이지 않는 재미있는 사람",match:"🟣 퍼플 아우라 (당신의 상상에 깊이를 더해줘요)"},
  G:{n:"그린 아우라",emoji:"🟢",color:"#2f9e6b",d:"당신을 감싼 색은 편안한 그린이에요. 곁에 있으면 마음이 놓이고, 힘든 사람을 그냥 지나치지 못하죠. 사람을 치유하는 따뜻함과 균형 감각, 꾸준히 자라나는 안정감이 당신의 색이에요.",key:"치유 · 균형 · 배려",love:"기대고 싶어지는 든든한 사람",match:"🔴 레드 아우라 (당신의 안정 위에 활력을 불어넣어요)"},
  B:{n:"블루 아우라",emoji:"🔵",color:"#2f6fe0",d:"당신을 감싼 색은 깊은 블루예요. 감정에 휩쓸리기보다 한 발 물러나 차분히 바라보고, 믿음직한 말과 태도로 사람들에게 신뢰를 주죠. 침착함과 진솔한 소통이 당신의 빛깔이에요.",key:"차분 · 신뢰 · 소통",love:"대화가 잘 통하는 편안한 사람",match:"🔴 레드 아우라 (당신의 차분함에 설렘을 더해줘요)"},
  V:{n:"퍼플 아우라",emoji:"🟣",color:"#8a4fd6",d:"당신을 감싼 색은 신비로운 퍼플이에요. 남들이 못 보는 걸 느끼고, 나만의 세계와 감각이 뚜렷하죠. 예민한 직관과 예술적 감수성, 알수록 빠져드는 깊이가 당신의 색이에요.",key:"직관 · 예술 · 신비",love:"알수록 궁금해지는 매력적인 사람",match:"🟡 옐로 아우라 (당신의 세계를 밝게 열어줘요)"},
  P:{n:"핑크 아우라",emoji:"🩷",color:"#e05a94",d:"당신을 감싼 색은 사랑스러운 핑크예요. 다정한 말 한마디로 사람 마음을 녹이고, 곁을 부드럽게 감싸주죠. 따뜻한 애정과 섬세한 배려, 포근한 다정함이 당신의 빛깔이에요.",key:"다정 · 사랑 · 부드러움",love:"함께 있으면 마음이 포근해지는 사람",match:"🟠 오렌지 아우라 (당신의 다정함에 활기를 더해줘요)"}
};
var ORDER=['R','O','Y','G','B','V','P'];
var Q=[
 ["처음 만난 사람들 사이에서 나는?",[["먼저 다가가 분위기를 이끔","R"],["농담하며 금세 친해짐","O"],["재밌는 이야깃거리를 던짐","Y"],["조용히 듣고 관찰함","B"]]],
 ["주말에 가장 하고 싶은 건?",[["새로운 도전·운동","R"],["친구들과 왁자지껄 모임","O"],["전시·공연 보러 가기","V"],["집에서 편히 재충전","G"]]],
 ["스트레스를 받으면 나는?",[["몸을 움직여 풀어버림","R"],["수다로 털어냄","O"],["혼자 조용히 가라앉힘","B"],["좋아하는 걸로 마음 달램","P"]]],
 ["친구들이 말하는 나의 매력은?",[["에너지가 넘친다","R"],["같이 있으면 즐겁다","O"],["아이디어가 반짝인다","Y"],["마음이 따뜻하다","G"]]],
 ["끌리는 분위기는?",[["강렬하고 화려한","R"],["밝고 경쾌한","Y"],["차분하고 세련된","B"],["몽환적이고 신비로운","V"]]],
 ["새 프로젝트가 생기면?",[["일단 앞장서 이끈다","R"],["아이디어를 마구 낸다","Y"],["차근차근 계획한다","B"],["팀 분위기를 챙긴다","G"]]],
 ["힘든 친구에게 나는?",[["기운 나게 이끌어줌","R"],["웃겨서 기분전환","O"],["곁에서 조용히 위로","G"],["따뜻한 말로 감싸줌","P"]]],
 ["나를 표현하는 한 단어는?",[["열정","R"],["호기심","Y"],["평온","G"],["감성","V"]]],
 ["갖고 싶은 능력은?",[["누구든 이끄는 카리스마","R"],["어디서든 분위기 메이커","O"],["번뜩이는 창의력","Y"],["사람 마음을 읽는 직관","V"]]],
 ["연애할 때 나는?",[["적극적으로 표현","R"],["다정하게 챙김","P"],["편하게 대화 많이","B"],["은은하게 곁을 지킴","G"]]],
 ["여행지를 고른다면?",[["액티비티 가득한 곳","R"],["활기찬 축제의 도시","O"],["미술관·감성 골목","V"],["숲·바다의 힐링 스팟","G"]]],
 ["삶에서 가장 소중한 건?",[["도전과 성취","R"],["즐거움과 사람","O"],["새로움과 배움","Y"],["사랑과 따뜻함","P"]]]
];
var sums={R:0,O:0,Y:0,G:0,B:0,V:0,P:0}, i=0;
function show(){
 var q=Q[i];
 $('au-qn').textContent=(i+1)+' / '+Q.length;
 $('au-q').textContent=q[0];
 $('au-bar').style.width=(i/Q.length*100)+'%';
 var box=$('au-opts');box.innerHTML='';
 q[1].forEach(function(o){
  var b=document.createElement('button');
  b.textContent=o[0];
  b.style.cssText='padding:14px 16px;border:1.5px solid #e5d9f7;border-radius:12px;background:#fff;color:#2b2b2b;font-size:16px;text-align:left;cursor:pointer;line-height:1.4;';
  b.onmouseover=function(){b.style.background='#f6f0fe';};
  b.onmouseout=function(){b.style.background='#fff';};
  b.onclick=function(){sums[o[1]]++;i++;if(i<Q.length)show();else result();};
  box.appendChild(b);
 });
}
function top(){var best='R',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function render(key,shared){
 var t=TYPE[key];
 var html='<div style="text-align:center;padding:24px 16px;border-radius:16px;background:linear-gradient(160deg,'+t.color+'26,'+t.color+'08);">'
  +'<div style="font-size:64px;">'+t.emoji+'</div>'
  +'<div style="font-size:13px;color:'+t.color+';font-weight:700;margin-top:4px;">당신을 감싼 색은</div>'
  +'<div style="font-size:27px;font-weight:800;margin:2px 0 0;color:'+t.color+';">'+t.n+'</div>'
  +'<div style="display:inline-block;margin-top:10px;padding:5px 14px;border-radius:20px;background:'+t.color+';color:#fff;font-size:13px;font-weight:700;">'+t.key+'</div></div>'
  +'<div style="line-height:1.75;margin:18px 4px;font-size:15px;">'+t.d+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#faf6ff;font-size:14px;line-height:1.7;"><b>💗 연애할 때 당신은</b><br>'+t.love+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f5f7fb;font-size:14px;line-height:1.7;"><b>🤝 잘 맞는 아우라</b><br>'+t.match+'</div>';
 html+='<div style="display:flex;gap:10px;margin-top:20px;">'
  +(shared
    ?'<button onclick="location.href=location.pathname" style="flex:1;padding:14px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:16px;cursor:pointer;">내 아우라 색도 보기 →</button>'
    :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid '+t.color+';border-radius:10px;background:#fff;color:'+t.color+';font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
     +'<button id="au-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
  +'</div>'
  +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/love-cell/">연애세포</a> · <a href="/tests/past-life/">전생</a></div>'
  +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미로 보는 자가진단이며 전문 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
 $('au-result').innerHTML=html;
 $('au-result').style.display='block';
 if(!shared){var sb=$('au-share');if(sb)sb.onclick=function(){
  var url=location.origin+location.pathname+'?r='+key;
  var txt='내 아우라 색은 '+t.emoji+' '+t.n+'! 너의 색은? 👉 '+url;
  if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
 };}
 window.scrollTo({top:$('au').offsetTop-20,behavior:'smooth'});
}
function result(){$('au-quiz').style.display='none';render(top(),false);}
$('au-start').onclick=function(){$('au-intro').style.display='none';$('au-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([ROYGBVP])/);if(m){$('au-intro').style.display='none';render(m[1],true);}})();
})();
</script>

## 아우라 컬러 테스트에 대하여

아우라는 사람마다 다르게 뿜어져 나오는 고유의 에너지 색이라고들 해요. 이 테스트는 직접 색을 고르는 대신, 12개의 성격·상황 질문에 답하면 지금 당신의 에너지가 어떤 빛깔을 내는지 찾아드려요. **레드·오렌지·옐로·그린·블루·퍼플·핑크** 일곱 가지 아우라 컬러 중 하나가 결과로 나옵니다.

각 선택마다 색깔별 점수가 쌓이고, 가장 높은 색이 당신의 아우라가 됩니다. 결과에는 색의 의미, 연애할 때의 모습, 잘 맞는 아우라 색이 함께 나오고 친구에게 바로 공유할 수 있어요. 재미와 자기이해를 위한 콘텐츠이며 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
