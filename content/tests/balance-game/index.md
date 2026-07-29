---
title: "극한의 밸런스게임 — 나는 어떤 인간일까? (본성 유형 테스트)"
emoji: "⚖️"
description: "둘 중 하나만 골라! 12개의 극한 딜레마로 밝혀지는 내 진짜 본성. 4가지 유형 중 나는 도파민 헌터? 마이웨이 고양이? 결과는 친구에게 바로 공유돼요."
date: 2026-07-29
slug: "balance-game"
categories: ["심리테스트"]
tags: ["밸런스게임", "밸런스게임 질문", "심리테스트", "본성 유형 테스트", "성격 테스트"]
toc: false
readingTime: false
---

둘 중 **딱 하나만** 골라야 해요. 고민할수록 재밌는 12개의 극한 딜레마! 당신의 손가락이 먼저 반응하는 쪽에 진짜 본성이 숨어 있어요. 나는 4가지 유형 중 누구일까요? ⚖️ (1도 안 진지하니 편하게 골라요 😎)

<div id="bg" style="max-width:600px;margin:0 auto;">
  <div id="bg-intro" style="text-align:center;padding:8px 0 4px;">
    <div style="font-size:52px;line-height:1;margin-bottom:6px;">⚖️</div>
    <p style="color:var(--dim);font-size:14px;margin:6px 0 18px;line-height:1.6;">둘 중 하나를 고르는 12번의 극한 선택.<br>1분이면 끝나요. 정답은 없으니 끌리는 대로!</p>
    <button id="bg-start" style="padding:15px 44px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-size:17px;font-weight:800;cursor:pointer;">밸런스게임 시작 →</button>
  </div>
  <div id="bg-quiz" style="display:none;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span id="bg-qn" style="font-size:13px;font-weight:700;color:var(--coral-soft);"></span>
      <span id="bg-skip" style="font-size:12px;color:var(--dim);">고민은 3초까지만 😏</span>
    </div>
    <div style="height:8px;background:var(--line);border-radius:4px;margin-bottom:18px;overflow:hidden;"><div id="bg-bar" style="height:8px;width:0;background:var(--coral);border-radius:4px;transition:width .3s;"></div></div>
    <div id="bg-q" style="text-align:center;font-size:19px;font-weight:800;line-height:1.5;color:var(--txt);min-height:56px;margin-bottom:16px;"></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <button id="bg-a" class="bg-choice" style="padding:24px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:17px;font-weight:700;line-height:1.45;cursor:pointer;transition:all .12s;"></button>
      <div style="text-align:center;font-size:14px;font-weight:900;color:var(--coral);letter-spacing:2px;">VS</div>
      <button id="bg-b" class="bg-choice" style="padding:24px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:17px;font-weight:700;line-height:1.45;cursor:pointer;transition:all .12s;"></button>
    </div>
  </div>
  <div id="bg-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 4가지 본성 유형 — 밸런스게임 선택으로 밝혀지는 진짜 나
var TYPES={
  f:{n:"질러버리는 도파민 헌터",e:"🔥",
     d:"'참을 인'은 남의 나라 얘기. 지금 이 순간 재밌으면 그게 정답인 사람이에요. 통장 잔고와 내일의 나는 미래의 내가 알아서 하겠지~ 하며 일단 저지르고 봅니다. 함께 있으면 심심할 틈이 없지만, 옆 사람 심장은 가끔 쫄깃해져요.",
     match:{k:"c",t:"둘이 만나면 세상 뒤집는 대형 사고 콤비"},
     mis:{k:"i",t:"'그거 계획은 있어?' 소리에 숨이 턱 막힘"},
     line:"인생은 한 방, 후회는 내일의 내가!"},
  i:{n:"계산기 두드리는 갓생 설계자",e:"🧊",
     d:"손해 보는 건 죽어도 못 참는 효율의 화신. 뭘 하든 가성비·본전·플랜B까지 계산이 끝나 있어요. 즉흥이요? 그건 그냥 데이터가 부족한 상태일 뿐이죠. 덕분에 사고는 절대 안 치지만, 가끔 '그냥 좀 질러보면 안 돼?' 소리를 듣습니다.",
     match:{k:"s",t:"서로 무리 안 하는 편안하고 안정적인 케미"},
     mis:{k:"f",t:"텅장 예약하는 모습에 내 속이 다 타들어감"},
     line:"느낌보다 팩트, 대충보다 계획!"},
  s:{n:"눈치 백단 평화 다람쥐",e:"🐿️",
     d:"튀는 거요? 절대 사절입니다. 다 같이 좋은 게 세상에서 제일 좋은 사람이에요. 속으론 할 말이 백 개라도 분위기를 위해 꿀꺽 삼키는 리액션 장인. '착하다'는 소리를 자주 듣지만, 가끔은 내 속도 곪는다는 걸 아무도 모른답니다.",
     match:{k:"f",t:"내가 못 지르는 걸 대신 저질러주는 짜릿한 대리만족"},
     mis:{k:"c",t:"직설 팩폭 한 방에 마음이 사르르 시무룩"},
     line:"제발… 다들 사이좋게 지내자…"},
  c:{n:"내 맘대로 마이웨이 고양이",e:"😼",
     d:"남이 뭐라든 내 세상은 내가 정합니다. 솔직하고 당당해서 할 말은 하고 사는 타입이에요. 눈치 안 보고 사니 속은 편하지만, 그 솔직함이 가끔 팩트폭력이 되어 주변을 얼려버리기도 하죠. 그래도 이 쿨함, 은근 멋있지 않나요?",
     match:{k:"f",t:"함께라면 못 할 게 없는 환상의 사고뭉치 듀오"},
     mis:{k:"s",t:"내 팩폭에 상처받아 조용히 시무룩해짐"},
     line:"남 눈치 볼 시간에 내 인생이나 산다."}
};
// [질문, [A선택지, 유형], [B선택지, 유형]]
var QS=[
 ["인생 마지막 로또, 1등에 당첨됐다!",["일단 지르고 본다, 통장은 텅장 예약","f"],["엑셀 켜고 자산배분표부터 짠다","i"]],
 ["단톡방에서 나 혼자 안 웃긴 드립을 쳤다",["쿨하게 '아 노잼이었지 ㅋㅋ' 셀프 수습","c"],["조용히 이불킥, 당분간 드립 봉인","s"]],
 ["큰맘 먹고 온 호텔 뷔페!",["본전 뽑을 때까지 접시 무한 왕복","f"],["비싼 회·초밥만 골라 담는 게 이득","i"]],
 ["친구가 '나 요즘 살쪘지?' 하고 물어본다",["'어… 좀?' 솔직하게 팩트 전달","c"],["'전혀! 어디가!' 일단 평화 사수","s"]],
 ["드디어 떠나는 여행!",["계획? 발길 닿는 대로가 국룰","f"],["분 단위 일정표에 맛집 예약까지 완비","i"]],
 ["회식 자리, 상사의 재미없는 얘기 30분째",["리액션 장인 모드 가동, 분위기는 내가 산다","s"],["표정 관리 실패, 이미 딴생각 여행 중","f"]],
 ["새로 산 옷을 보고 친구가 '음… 별론데?'",["'난 맘에 드는데?' 그냥 입고 다닌다","c"],["바로 장롱 깊숙이 봉인, 다신 안 꺼냄","s"]],
 ["제출 마감이 코앞이다",["벼락치기의 신, 마감 직전 각성한다","f"],["미리 다 끝내둬야 발 뻗고 잔다","i"]],
 ["소개팅 상대가 첫인상부터 영 아니다",["밥값은 뽑자, 디저트까지 알차게","i"],["30분 만에 '먼저 일어날게요'","c"]],
 ["카페에서 누가 대놓고 새치기를 했다",["'저기요, 줄 있는데요?' 바로 지적","c"],["속으로만 부글부글, 겉으론 미소","s"]],
 ["갑자기 생긴 꿀 같은 3일 연차!",["지금 당장 비행기표 끊는다, 즉흥 여행 고고","f"],["알뜰하게 집콕 호캉스, 통장은 지킨다","i"]],
 ["친구들이 '오늘 뭐 먹지?' 물어본다",["'난 이거!' 확실하게 내 취향 어필","c"],["'아무거나~ 다 좋아' 무한 양보","s"]]
];
var idx=0, tally={f:0,i:0,s:0,c:0}, order=['f','i','s','c'];
function paint(btn,on){btn.style.borderColor=on?'var(--coral)':'var(--line)';btn.style.background=on?'rgba(217,119,87,.12)':'var(--panel)';}
function show(){
  var q=QS[idx];
  $('bg-qn').textContent='Q'+(idx+1)+' / '+QS.length;
  $('bg-bar').style.width=(idx/QS.length*100)+'%';
  $('bg-q').textContent=q[0];
  var a=$('bg-a'), b=$('bg-b');
  a.textContent=q[1][0]; b.textContent=q[2][0];
  paint(a,false); paint(b,false);
  a.onmouseover=function(){paint(a,true);};a.onmouseout=function(){paint(a,false);};
  b.onmouseover=function(){paint(b,true);};b.onmouseout=function(){paint(b,false);};
  a.onclick=function(){pick(q[1][1]);};
  b.onclick=function(){pick(q[2][1]);};
}
function pick(t){tally[t]++;idx++;idx<QS.length?show():result();}
function winner(){var best='f',mx=-1;order.forEach(function(k){if(tally[k]>mx){mx=tally[k];best=k;}});return best;}
function render(typeKey,shared){
  $('bg-intro').style.display='none';$('bg-quiz').style.display='none';
  var t=TYPES[typeKey]||TYPES.f;
  var total=0;order.forEach(function(k){total+=tally[k];});
  // 본성 지분 (공유로 들어오면 우승 유형만 100%로 표시)
  var pct={};order.forEach(function(k){pct[k]=total?Math.round(tally[k]/total*100):(k===typeKey?100:0);});
  var bars=order.map(function(k){var tt=TYPES[k];var on=(k===typeKey);
    return '<div style="display:flex;align-items:center;gap:8px;margin:7px 0;">'
      +'<span style="width:150px;font-size:13px;'+(on?'font-weight:800;color:var(--coral-soft);':'color:var(--dim);')+'">'+tt.e+' '+tt.n+'</span>'
      +'<span style="flex:1;height:9px;background:var(--line);border-radius:5px;overflow:hidden;"><span style="display:block;height:9px;width:'+pct[k]+'%;background:'+(on?'var(--coral)':'#6a6a66')+';border-radius:5px;"></span></span>'
      +'<span style="width:38px;text-align:right;font-size:12px;'+(on?'font-weight:800;color:var(--coral-soft);':'color:var(--dim);')+'">'+pct[k]+'%</span></div>';
  }).join('');
  var mt=TYPES[t.match.k], ms=TYPES[t.mis.k];
  $('bg-result').innerHTML=
    '<div style="text-align:center;padding:26px 18px;border-radius:16px;background:var(--panel);border:1px solid var(--line);">'
     +'<div style="font-size:15px;color:var(--dim);margin-bottom:4px;">나의 본성 유형은…</div>'
     +'<div style="font-size:58px;line-height:1;">'+t.e+'</div>'
     +'<div style="font-size:26px;font-weight:900;color:var(--coral-soft);margin-top:8px;">'+t.n+'</div>'
    +'</div>'
    +(shared?'<div style="margin:10px 0;padding:11px;border-radius:10px;background:rgba(126,166,224,.10);color:var(--blue);font-size:14px;text-align:center;">친구가 공유한 결과예요 💌 당신의 본성은 무엇일까요?</div>':'')
    +'<p style="line-height:1.8;margin:18px 4px;font-size:15.5px;">'+t.d+'</p>'
    +'<div style="margin:20px 0;padding:16px;border-radius:12px;background:var(--panel);border:1px solid var(--line);">'
      +'<div style="font-size:14px;font-weight:800;color:var(--coral-soft);margin-bottom:10px;">📊 나의 본성 지분</div>'+bars
    +'</div>'
    +'<div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;">'
      +'<div style="flex:1 1 240px;padding:13px 15px;border-radius:12px;background:rgba(217,119,87,.10);border:1px solid var(--line);font-size:14px;line-height:1.55;"><b style="color:var(--coral-soft);">🤝 찰떡궁합 '+mt.e+' '+mt.n+'</b><br>'+t.match.t+'</div>'
      +'<div style="flex:1 1 240px;padding:13px 15px;border-radius:12px;background:rgba(126,166,224,.10);border:1px solid var(--line);font-size:14px;line-height:1.55;"><b style="color:var(--blue);">⚡ 극과 극 '+ms.e+' '+ms.n+'</b><br>'+t.mis.t+'</div>'
    +'</div>'
    +'<div style="text-align:center;margin:20px 4px;padding:16px;border-radius:12px;background:var(--panel);border:1px dashed var(--coral);font-size:17px;font-weight:800;color:var(--coral-soft);line-height:1.5;">💬 “'+t.line+'”</div>'
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="bg-mine" style="flex:1;padding:15px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:16px;cursor:pointer;">나도 해보기 →</button>'
      :'<button id="bg-again" style="flex:1;padding:14px;border:2px solid var(--coral);border-radius:12px;background:transparent;color:var(--coral-soft);font-weight:800;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="bg-share" style="flex:1;padding:14px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:12px;background:var(--panel);border:1px solid var(--line);font-size:14px;color:var(--dim);">다른 테스트도 → <a href="/tests/">심리테스트 전체</a> · <a href="/tests/love-style/">연애 스타일</a> · <a href="/tests/office-survival/">직장 생존 유형</a></div>';
  $('bg-result').style.display='block';
  if(shared){var mine=$('bg-mine');if(mine)mine.onclick=restart;}
  else{
    $('bg-again').onclick=restart;
    $('bg-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+typeKey;
      var txt='내 본성 유형은 '+t.e+' '+t.n+'! 너는? 밸런스게임 ㄱㄱ 👉 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요! 친구에게 붙여넣기 하세요 😎');});}
    };
  }
  window.scrollTo({top:$('bg').offsetTop-20,behavior:'smooth'});
}
function result(){render(winner(),false);}
function restart(){idx=0;tally={f:0,i:0,s:0,c:0};$('bg-result').style.display='none';$('bg-intro').style.display='none';$('bg-quiz').style.display='block';show();window.scrollTo({top:$('bg').offsetTop-20,behavior:'smooth'});}
$('bg-start').onclick=function(){$('bg-intro').style.display='none';$('bg-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([fisc])/);if(m){render(m[1],true);}})();
})();
</script>

## 극한의 밸런스게임에 대하여

**밸런스게임**은 둘 중 하나를 반드시 골라야 하는 선택 놀이예요. 이 테스트는 12개의 극한 딜레마에 답하면 **🔥 질러버리는 도파민 헌터 · 🧊 계산기 두드리는 갓생 설계자 · 🐿️ 눈치 백단 평화 다람쥐 · 😼 내 맘대로 마이웨이 고양이** 4가지 본성 유형 중 나에게 가장 가까운 쪽을 알려드려요. 순수하게 재미를 위한 콘텐츠이며, 답변은 저장되지 않고 브라우저에서만 처리됩니다. 친구·연인·동료와 서로 결과를 맞혀보며 즐겨보세요!
