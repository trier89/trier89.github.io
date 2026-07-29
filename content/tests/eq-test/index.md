---
title: "무료 EQ 감성지능 테스트 — 나의 마음 지능은 몇 점?"
emoji: "💗"
description: "무료 EQ 감성지능 테스트 — 20문항으로 알아보는 내 감성지능(EQ). 5가지 감정 능력의 강점·약점과 나의 EQ 유형을 확인하세요. 재미로 보는 자가진단."
date: 2026-07-30
slug: "eq-test"
categories: ["심리테스트"]
tags: ["EQ 테스트", "감성지능 테스트", "감정지능", "공감 능력 테스트", "심리테스트"]
toc: false
readingTime: false
---

20개의 문항으로 알아보는 **나의 감성지능(EQ)**. 감정을 다루는 5가지 힘 — 자기인식·자기조절·동기부여·공감·사회적기술 — 중 나의 강점과 약점은? (재미로 보는 자가진단이에요 💗)

<div id="eq" style="max-width:600px;margin:0 auto;">
  <div id="eq-intro" style="text-align:center;">
    <button id="eq-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 2분)</button>
  </div>
  <div id="eq-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:18px;"><div id="eq-bar" style="height:8px;width:0;background:#7c3aed;border-radius:4px;transition:width .3s;"></div></div>
    <div id="eq-qn" style="font-size:13px;color:#6b7280;margin-bottom:6px;"></div>
    <div id="eq-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="eq-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="eq-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 골먼(Goleman)의 감성지능 5요소
var FACT={
  aware:{n:"자기인식",emoji:"🔍"},
  regul:{n:"자기조절",emoji:"🧘"},
  motiv:{n:"동기부여",emoji:"🔥"},
  empath:{n:"공감",emoji:"💗"},
  social:{n:"사회적 기술",emoji:"🤝"}
};
var ORDER=['aware','regul','motiv','empath','social'];
// 요소별 대표 유형(강점이 가장 높은 요소일 때 부여)
var TYPES={
  aware:{n:"속마음 탐정",emoji:"🔍",d:"내 감정의 결을 누구보다 잘 읽어내는 사람. 지금 기분이 화인지 서운함인지, 왜 이런 마음이 드는지 스스로 정확히 짚어내요. 자기 자신을 잘 아는 만큼 흔들려도 금방 중심을 찾아요.",tip:"내 마음을 잘 아는 건 큰 무기예요. 이제 그 이해를 상대의 마음을 읽는 데까지 넓혀보세요."},
  regul:{n:"평정심 마스터",emoji:"🧘",d:"욱하는 순간에도 한 박자 쉬어갈 줄 아는 사람. 감정에 휩쓸리기보다 다스리는 쪽이라 위기에서 더 빛나요. '기분이 태도가 되지 않는' 어른의 여유가 있어요.",tip:"차분함이 최고의 강점. 다만 너무 눌러 담다 보면 지칠 수 있으니, 가끔은 감정을 솔직히 꺼내도 괜찮아요."},
  motiv:{n:"불꽃 동기부여러",emoji:"🔥",d:"넘어져도 다시 일어나는 회복 탄력의 소유자. 당장 힘들어도 목표를 향해 스스로를 끌고 가는 내적 엔진이 강해요. 누가 알아주지 않아도 나만의 이유로 나아갑니다.",tip:"추진력이 대단해요. 다만 스스로를 너무 몰아붙이지 말고, 쉬어가는 것도 계획에 넣어두세요."},
  empath:{n:"공감형 힐러",emoji:"💗",d:"친구가 울면 나도 같이 먹먹해지는 따뜻한 사람. 표정과 분위기만으로 상대의 마음을 알아채고, 곁에 있는 것만으로 위로가 돼요. 사람들이 힘들 때 가장 먼저 찾는 존재예요.",tip:"공감력은 귀한 재능이에요. 다만 남의 감정을 다 떠안다 지치지 않게, 내 마음도 꼭 챙기세요."},
  social:{n:"소셜 마에스트로",emoji:"🤝",d:"처음 본 사람과도 스르륵 대화가 통하고, 어색한 공기를 부드럽게 푸는 관계의 달인. 갈등 사이에서 접점을 찾고, 할 말도 상대 기분 상하지 않게 전하는 센스가 있어요.",tip:"사람을 잇는 힘이 탁월해요. 다만 모두를 맞추느라 정작 내 감정을 놓치지 않도록 균형을 잡아보세요."}
};
var CODE={aware:'A',regul:'R',motiv:'M',empath:'E',social:'S'};
var FROMCODE={A:'aware',R:'regul',M:'motiv',E:'empath',S:'social'};
// [질문, 요소, 역채점여부]  (역채점=낮을수록 좋은 문항)
var QS=[
 ["기분이 안 좋을 때, 그 이유가 뭔지 스스로 꽤 잘 안다.","aware",0],
 ["지금 내가 화난 건지 서운한 건지, 감정을 구분할 수 있다.","aware",0],
 ["나의 장점과 약점을 솔직하게 알고 있다.","aware",0],
 ["어떤 상황이 나를 예민하게 만드는지 미리 안다.","aware",0],
 ["욱하는 순간에도 말을 내뱉기 전에 한 박자 멈춘다.","regul",0],
 ["화가 나도 시간이 지나면 스스로 잘 가라앉힌다.","regul",0],
 ["스트레스를 받아도 해야 할 일은 결국 해낸다.","regul",0],
 ["기분이 안 좋으면 나도 모르게 남에게 티를 내는 편이다.","regul",1],
 ["당장은 손해여도 목표를 위해 참고 기다릴 수 있다.","motiv",0],
 ["실패하거나 거절당해도 다시 도전하는 편이다.","motiv",0],
 ["누가 알아주지 않아도, 스스로 세운 목표를 향해 간다.","motiv",0],
 ["일이 잘 안 풀리면 금방 의욕을 잃고 포기한다.","motiv",1],
 ["친구가 눈물을 보이면, 나도 마음이 같이 먹먹해진다.","empath",0],
 ["상대의 표정만 봐도 기분을 대충 알아챈다.","empath",0],
 ["남의 고민을 들으면 그 사람 입장이 잘 상상된다.","empath",0],
 ["말로 표현 안 해도 분위기로 상대의 마음을 눈치챈다.","empath",0],
 ["처음 만난 사람과도 어렵지 않게 대화를 이어간다.","social",0],
 ["갈등이 생기면 중간에서 잘 풀어주는 편이다.","social",0],
 ["내 생각을 상대 기분 상하지 않게 전달할 수 있다.","social",0],
 ["여럿이 모인 자리의 분위기를 부드럽게 만드는 역할을 한다.","social",0]
];
var SCALE=[["매우 그렇다",5],["그런 편이다",4],["보통이다",3],["아닌 편이다",2],["전혀 아니다",1]];
var idx=0, sums={aware:0,regul:0,motiv:0,empath:0,social:0};
function show(){
  var q=QS[idx];
  $('eq-qn').textContent=(idx+1)+' / '+QS.length;
  $('eq-bar').style.width=(idx/QS.length*100)+'%';
  $('eq-q').textContent=q[0];
  var o=$('eq-opts');o.innerHTML='';
  SCALE.forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt[0];
    b.style.cssText='padding:13px 15px;border:2px solid #ddd6fe;border-radius:10px;background:#fff;font-size:15px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#7c3aed';};
    b.onmouseout=function(){b.style.borderColor='#ddd6fe';};
    b.onclick=function(){
      var v=q[2]?(6-opt[1]):opt[1]; // 역채점 처리
      sums[q[1]]+=v;
      idx++;idx<QS.length?show():result();
    };
    o.appendChild(b);
  });
}
function level(total){ // 총점 20~100
  if(total>=84) return {n:"EQ 고수",emoji:"🌟",c:"감정을 읽고 다루는 힘이 아주 안정적이에요."};
  if(total>=68) return {n:"안정적인 EQ",emoji:"🙂",c:"대체로 감정을 잘 다루는 균형 잡힌 편이에요."};
  if(total>=52) return {n:"성장 중인 EQ",emoji:"🌱",c:"강점은 살리고 약한 부분만 다듬으면 쑥 오를 거예요."};
  return {n:"무럭무럭 클 EQ",emoji:"🌾",c:"지금부터 감정을 알아차리는 연습을 하면 충분히 자라요."};
}
function strongest(){var best='empath',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function weakest(){var w='aware',mn=99;ORDER.forEach(function(k){if(sums[k]<mn){mn=sums[k];w=k;}});return w;}
function render(typeKey,shared,data){
  $('eq-intro').style.display='none';$('eq-quiz').style.display='none';
  var t=TYPES[typeKey]||TYPES.empath;
  var html='';
  html+='<div style="text-align:center;padding:24px;border-radius:14px;background:#f5f3ff;">'
    +'<div style="font-size:48px;">'+t.emoji+'</div>'
    +'<div style="font-size:15px;color:#7c3aed;font-weight:600;">나의 EQ 유형</div>'
    +'<div style="font-size:26px;font-weight:800;color:#6d28d9;">'+t.n+'</div></div>';
  if(shared){
    html+='<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 💗 당신의 감성지능은 어떤 유형일까요?</div>';
    html+='<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>';
    html+='<h3 style="margin:18px 0 6px;color:#6d28d9;">💡 한 걸음 더</h3><div style="line-height:1.7;">'+t.tip+'</div>';
  } else {
    var total=data.total, lv=level(total);
    // 총점 + 레벨
    html+='<div style="text-align:center;margin-top:14px;padding:16px;border-radius:12px;background:#faf5ff;">'
      +'<div style="font-size:14px;color:#6b7280;">나의 EQ 점수</div>'
      +'<div style="font-size:34px;font-weight:800;color:#6d28d9;">'+total+'<span style="font-size:16px;color:#9ca3af;"> / 100</span></div>'
      +'<div style="font-size:17px;font-weight:700;margin-top:2px;">'+lv.emoji+' '+lv.n+'</div>'
      +'<div style="font-size:13px;color:#6b7280;margin-top:4px;">'+lv.c+'</div></div>';
    // 5요소 바그래프
    html+='<h3 style="margin:20px 0 8px;color:#6d28d9;">📊 5가지 감정 능력</h3>';
    ORDER.forEach(function(k){
      var pct=Math.round(sums[k]/20*100);
      var f=FACT[k];
      html+='<div style="margin-bottom:10px;">'
        +'<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:3px;"><span>'+f.emoji+' '+f.n+'</span><span style="color:#7c3aed;font-weight:700;">'+pct+'</span></div>'
        +'<div style="height:10px;background:#ede9fe;border-radius:5px;overflow:hidden;"><div style="height:10px;width:'+pct+'%;background:#7c3aed;border-radius:5px;"></div></div></div>';
    });
    // 강점 / 약점
    var s=data.str, w=data.weak;
    html+='<h3 style="margin:20px 0 6px;color:#6d28d9;">💪 나의 강점</h3>'
      +'<div style="line-height:1.7;"><b>'+FACT[s].emoji+' '+FACT[s].n+'</b> — 가장 도드라지는 힘이에요. '+t.d+'</div>';
    html+='<h3 style="margin:18px 0 6px;color:#6d28d9;">🌱 키우면 좋을 부분</h3>'
      +'<div style="line-height:1.7;"><b>'+FACT[w].emoji+' '+FACT[w].n+'</b> — 조금 낮게 나온 영역이에요. 부족한 게 아니라, 여기를 다듬으면 EQ가 한층 균형 잡혀요.</div>';
    html+='<h3 style="margin:18px 0 6px;color:#6d28d9;">💡 한 걸음 더</h3><div style="line-height:1.7;">'+t.tip+'</div>';
  }
  html+='<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="eq-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#6d28d9;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="eq-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/personality-test/">16 성격유형</a> · <a href="/tests/love-style/">연애 스타일</a></div>'
    +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미와 자기이해를 위한 자가진단이며, 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
  $('eq-result').innerHTML=html;
  $('eq-result').style.display='block';
  if(shared){var mine=$('eq-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('eq-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODE[typeKey];
    var txt='내 EQ 유형은 '+t.emoji+' '+t.n+' ('+data.total+'점)! 너의 감성지능은? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('eq').offsetTop-20,behavior:'smooth'});
}
function result(){
  var total=0;ORDER.forEach(function(k){total+=sums[k];});
  render(strongest(),false,{total:total,str:strongest(),weak:weakest()});
}
$('eq-start').onclick=function(){$('eq-intro').style.display='none';$('eq-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([ARMES])/);if(m){render(FROMCODE[m[1]],true,{});}})();
})();
</script>

## EQ 감성지능 테스트에 대하여

20개의 문항에 5점 척도로 답하면, 심리학자 대니얼 골먼(Daniel Goleman)이 제시한 감성지능의 5가지 요소 — **자기인식·자기조절·동기부여·공감·사회적 기술** — 별로 점수를 내어 나의 EQ 총점과 유형(속마음 탐정·평정심 마스터·불꽃 동기부여러·공감형 힐러·소셜 마에스트로)을 알려드려요.

가장 높게 나온 요소가 나의 강점 유형이 되고, 가장 낮은 요소는 키우면 좋을 부분으로 안내해 드립니다. 재미와 자기이해를 위한 자가진단 콘텐츠이며, 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
