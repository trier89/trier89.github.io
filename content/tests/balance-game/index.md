---
title: "극한의 밸런스게임 — 나는 어떤 인간일까? (본성 유형 테스트)"
emoji: "⚖️"
description: "둘 중 하나만 골라! 진짜 고민되는 12개의 매콤한 극한 딜레마로 밝혀지는 내 본성. 4가지 유형 중 나는 도파민 헌터? 마이웨이 고양이? 결과는 친구에게 바로 공유돼요."
date: 2026-07-29
slug: "balance-game"
categories: ["심리테스트"]
tags: ["밸런스게임", "밸런스게임 질문", "심리테스트", "본성 유형 테스트", "성격 테스트"]
toc: false
readingTime: false
---

둘 중 **딱 하나만** 골라야 해요. 진짜로 고민되는 12개의 극한·매콤 딜레마! 🌶️ 머리로 재기 전에 손가락이 먼저 반응하는 쪽에 진짜 본성이 숨어 있어요. 나는 4가지 유형 중 누구일까요? ⚖️ (골라놓고 후회해도 몰라요 😈)

<div id="bg" style="max-width:600px;margin:0 auto;">
  <div id="bg-intro" style="text-align:center;padding:8px 0 4px;">
    <div style="font-size:52px;line-height:1;margin-bottom:6px;">⚖️</div>
    <p style="color:var(--dim);font-size:14px;margin:6px 0 18px;line-height:1.6;">둘 중 하나를 골라야 하는 12번의 매콤한 선택. 🌶️<br>정답은 없어요. 그냥 더 끌리는(덜 싫은) 쪽으로!</p>
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
     line:"설렘은 잠깐, 원금은 영원히."},
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
 ["길에서 주운 지갑, 안에 현금 30만원과 신분증이 들어 있다",["현금만 쏙 빼고 지갑은 우체통에 넣는다","c"],["군말 없이 통째로 경찰서에 갖다준다","i"]],
 ["평생 둘 중 하나로만 살아야 한다면?",["평생 방귀를 단 한 번도 못 뀌고 꾹 참기","s"],["언제 어디서든 참지 않고 시원하게, 남들이 다 들어도","c"]],
 ["절친의 1급 비밀을 폭로하면 통장에 1,000만원이 꽂힌다",["미안하지만… 폭로하고 1,000만원 받는다","i"],["돈은 됐고, 무덤까지 입 꾹 다문다","s"]],
 ["오늘 밤 둘 중 하나는 반드시 벌어진다",["내 연애 흑역사 전부가 지금 애인에게 공개됨","c"],["애인의 연애 흑역사 전부를 내가 알게 됨","f"]],
 ["관계를 시험하는 딱 한 번의 선택",["애인 몰래 전 애인과 단둘이 저녁 (절대 안 걸림 보장)","f"],["애인이 전 애인과 단둘이 밥 먹는 걸 옆 테이블에서 지켜보기","s"]],
 ["카페 옆자리에서 누가 내 험담을 하는 걸 들어버렸다",["못 들은 척 조용히 자리를 뜬다, 평화가 최고","s"],["'저 여기 있는데요?' 바로 다가가 눈을 마주친다","c"]],
 ["눈앞에 버튼이 하나 놓여 있다",["누르면 50% 확률로 5억, 50% 확률로 전 재산 0원","f"],["안 누르고 무조건 안전하게 3천만원 챙긴다","i"]],
 ["평생 딱 한 가지 소비 습관만 가질 수 있다면?",["매달 착실히 저축, 재미없지만 60살에 건물주","i"],["매달 짜릿한 즉흥 소비, 통장은 늘 아슬아슬","f"]],
 ["결혼 상대를 딱 한 명만 골라야 한다",["미친 듯이 설레지만 경제관념 0, 통장은 마이너스","f"],["설렘은 없지만 연봉·성실·미래가 완벽한 사람","i"]],
 ["친구들과 간 핫플, 갑자기 무대 위 즉석 댄스 타임이 열렸다",["구석에서 안전하게 사진·영상만 찍어준다","i"],["즉흥으로 무대 위로, 인생샷 아니면 평생 흑역사","f"]],
 ["명백히 친구가 잘못했는데 나머지가 다 그 친구 편이다",["분위기 봐서 그냥 다 같이 고개를 끄덕인다","s"],["혼자라도 '그건 네가 틀렸어' 직언한다","c"]],
 ["애인의 새 헤어스타일이 솔직히 정말 별로다",["'완전 잘 어울려!' 평화를 위한 거짓 리액션","s"],["'솔직히… 전이 나았어' 팩트를 전한다","c"]]
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
