---
title: "기질·성격 유형 테스트 — 28문항으로 보는 나의 7가지 기질 (무료)"
description: "자극추구·위험회피·사회적 민감성·인내력·자율성·연대감·자기초월, 7가지 축으로 내 기질과 성격 성향을 알아보세요. 28문항, 무료, 회원가입 없음. 재미로 보는 자체 제작 테스트예요."
date: 2026-08-22
slug: "temperament-character"
aliases: ["/tools/temperament-character/"]
categories: ["심리테스트"]
tags: ["기질 성격 테스트", "기질 유형", "성격 테스트", "무료 심리테스트", "성향 테스트"]
toc: false
readingTime: false
---

사람의 타고난 **기질** 4가지(자극추구·위험회피·사회적 민감성·인내력)와 살면서 다듬어지는 **성격** 3가지(자율성·연대감·자기초월), 총 **7가지 축**으로 나를 들여다보는 28문항 테스트입니다. 재미로 보는 **자체 제작 테스트**로, 정식 기질·성격 검사(TCI 등)가 아니며 진단이 아니에요. 답변은 저장·전송되지 않습니다.

<div id="tctest" style="max-width:600px;margin:0 auto;">
  <div id="tc-intro" style="text-align:center;">
    <button id="tc-start" style="padding:16px 40px;border:0;border-radius:12px;background:#059669;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작하기 (약 4분)</button>
  </div>
  <div id="tc-quiz" style="display:none;">
    <div style="height:8px;background:#e5e7eb;border-radius:4px;margin-bottom:18px;"><div id="tc-bar" style="height:8px;width:0%;background:#059669;border-radius:4px;transition:width .3s;"></div></div>
    <div id="tc-qnum" style="font-size:13px;color:#888;margin-bottom:6px;"></div>
    <div id="tc-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:60px;"></div>
    <div id="tc-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="tc-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 문항: [질문, A선택지(높은 극), B선택지(낮은 극), 축]. A를 고르면 그 축 +1.
var QS=[
["새로운 가게가 생기면","일단 가봐야 직성이 풀린다","검증된 단골집이 마음 편하다","NS"],
["여행은 어떤 게 좋나","즉흥으로 떠나 모험하는 맛","미리 알아보고 안전하게","NS"],
["반복되는 일상이","지루해서 자꾸 새 자극을 찾는다","안정적이라 오히려 편하다","NS"],
["더 끌리는 사람은","예측 불가능한 자유로운 사람","한결같고 차분한 사람","NS"],
["처음 하는 일 앞에서 나는","잘못될까 봐 걱정이 앞선다","일단 부딪혀보면 된다고 여긴다","HA"],
["낯선 상황에 들어가면","긴장돼서 몸이 굳는다","대체로 금방 편안해진다","HA"],
["결정을 내릴 때","최악의 경우부터 대비한다","잘 될 거라 낙관한다","HA"],
["체력·기운은","쉽게 지치고 회복이 더딘 편","웬만해선 에너지가 넘치는 편","HA"],
["칭찬이나 인정을 받으면","크게 힘이 나고 오래 기억한다","고맙지만 크게 좌우되진 않는다","RD"],
["누군가와 멀어질 때","정 때문에 마음이 오래 남는다","쿨하게 각자의 길을 간다","RD"],
["다른 사람의 감정 변화를","예민하게 잘 알아차린다","잘 눈치채지 못하는 편","RD"],
["힘든 일이 있을 때","누군가에게 기대고 싶다","혼자 소화하는 게 편하다","RD"],
["잘 안 풀리는 일은","될 때까지 붙잡고 있는다","안 되면 빨리 접고 다른 걸 한다","P"],
["목표를 세우면","지치더라도 끝까지 밀어붙인다","상황 봐서 유연하게 조정한다","P"],
["지루하고 반복적인 연습을","묵묵히 견디는 편","금방 흥미를 잃는 편","P"],
["누가 알아주지 않아도","내 기준을 채울 때까지 한다","보람 없으면 굳이 안 한다","P"],
["일이 안 풀렸을 때","내가 바꿀 수 있는 걸 먼저 찾는다","환경이나 운을 탓하게 된다","SD"],
["내 삶의 방향은","내가 정하고 책임진다","상황에 떠밀려 흘러가는 편","SD"],
["목표가 있을 때 나는","스스로 계획하고 실행한다","누가 시켜야 겨우 움직인다","SD"],
["나 자신에 대해","대체로 만족하고 신뢰한다","부족하게 느껴 자주 흔들린다","SD"],
["의견이 다른 사람을 보면","그럴 만한 이유가 있겠거니 이해한다","답답하고 틀렸다고 느낀다","C"],
["다른 사람을 도울 때","기꺼이 내 것을 나눈다","손해 보는 건 아닌지 먼저 따진다","C"],
["팀으로 일할 때","전체의 조화를 먼저 생각한다","내 몫과 성과가 우선이다","C"],
["누가 실수했을 때","너그럽게 넘어가는 편","짚고 넘어가야 직성이 풀린다","C"],
["자연이나 예술 앞에서","나를 잊고 벅차게 몰입한다","좋긴 해도 담담한 편","ST"],
["세상 속의 나는","큰 흐름의 일부라고 느낀다","결국 각자도생이라 생각한다","ST"],
["설명 못 할 인연이나 직감을","믿고 따르는 편","근거 없으면 잘 안 믿는다","ST"],
["무언가에 깊이 빠지면","시간·자아를 잊는 몰입을 자주 겪는다","그런 몰입은 드문 편","ST"],
];
// 기질 3축(NS/HA/RD 높낮이)으로 8가지 유형. key = NS,HA,RD 각 高(1)/低(0).
var TYPES={
"111":{n:"예민한 열정가",d:"새로운 걸 갈망하면서도 걱정이 많고, 사람에게 정을 깊이 주는 사람. 감정의 진폭이 커서 뜨거웠다 식었다 하지만, 그만큼 세상을 생생하게 느낍니다. 설렘과 불안이 늘 함께 다녀요.",g:["풍부한 감수성과 공감","새로움을 즐기는 호기심","사람을 아끼는 따뜻함"],b:["감정 기복이 큼","걱정·후회가 많음","거절·평가에 예민"],c:["설레서 벌인 일에 불안이 겹쳐 지치지 않게 — 쉬는 것도 일정에 넣기","모두에게 사랑받으려다 나를 소진하지 않기"],r:{s:"과하게 밝다가 훅 가라앉고, 위로해줄 사람을 찾음",l:"빠르게 빠지고 깊게 몰입 — 상대의 반응 하나하나에 흔들림",w:"새 프로젝트엔 제일 신나지만 피드백엔 제일 예민"},like:"나를 다독여주는 안정감 있는 사람, 새롭지만 따뜻한 경험",m:"001"},
"110":{n:"조심스런 모험가",d:"새로운 걸 원하지만 함부로 뛰어들진 않는 신중한 개척자. 하고 싶은 마음과 걱정하는 마음이 줄다리기를 하고, 관계에선 자기 페이스를 지킵니다. 준비된 모험을 즐겨요.",g:["신중한 도전 정신","리스크를 계산하는 균형감","독립적인 자기 관리"],b:["망설이다 타이밍을 놓침","혼자 끌어안고 고민","우유부단해 보일 수 있음"],c:["'조금 더 준비되면'이 영영 안 올 수도 — 작게라도 시작하기","걱정은 혼자 말고 밖으로 꺼내기"],r:{s:"혼자 시뮬레이션을 돌리며 최악을 대비",l:"천천히 재보다가 확신 서면 훅 들어감",w:"새 아이디어는 좋아하되 위험 검토를 꼭 붙이는 사람"},like:"안전이 확보된 새로움, 강요하지 않고 기다려주는 사람",m:"001"},
"101":{n:"열정 사교가",d:"새로움을 사랑하고, 겁 없이 부딪히며, 사람들과의 정으로 충전되는 인싸 에너지. 어디서든 분위기를 살리고 도전을 두려워하지 않아요. 지루한 걸 제일 싫어합니다.",g:["넘치는 활력과 추진력","붙임성과 친화력","도전을 즐기는 대담함"],b:["금방 싫증","즉흥적이라 뒷수습 필요","혼자만의 시간 관리 소홀"],c:["'이것도 저것도'보다 하나를 끝까지 — 마무리가 신뢰가 됩니다","텐션이 항상 정답은 아니에요, 조용한 사람도 챙기기"],r:{s:"사람들 만나 떠들며 털어버림",l:"화끈하게 다가가고 이벤트에 진심",w:"킥오프·회식 분위기 메이커, 반복 업무엔 영혼 가출"},like:"즉흥 번개, 리액션 좋은 사람, 새로운 도전",m:"010"},
"100":{n:"자유 모험가",d:"새로움과 자유가 인생의 연료. 대담하게 부딪히고, 관계에도 얽매이지 않는 독립적인 영혼. 규칙과 간섭을 못 견디고, 자기 방식대로 세상을 탐험합니다.",g:["거침없는 실행력","높은 자립심","위기에서의 배짱"],b:["구속·루틴에 약함","관계를 가볍게 여긴다는 오해","충동적 결정"],c:["자유가 회피가 되지 않게 — 책임도 자유의 일부","가까운 사람에겐 표현이 필요합니다"],r:{s:"훌쩍 어디론가 떠나거나 새 일을 벌임",l:"밀당의 고수지만 구속엔 도망가고 싶어함",w:"현장·실전엔 강하고, 반복 보고서엔 최후의 순간에"},like:"각자의 공간 존중, 즉흥 여행, 규칙 없는 자유",m:"011"},
"011":{n:"따뜻한 신중가",d:"안정을 좋아하고 조심스러우면서, 사람에게 정을 깊이 주는 배려형. 나서기보다 곁에서 챙기고, 관계의 온도를 늘 살핍니다. 걱정이 많지만 그만큼 사려 깊어요.",g:["세심한 배려와 공감","성실하고 믿음직함","관계를 소중히 함"],b:["자기주장이 약함","서운함을 속에 쌓음","변화에 스트레스"],c:["부탁을 거절해도 관계는 안 무너져요","희생을 당연히 여기는 사람은 거르기"],r:{s:"싫은 티를 못 내고 혼자 삭임",l:"티 안 나게 챙기고 기념일을 다 기억",w:"팀 분위기와 사람들 컨디션을 먼저 신경 쓰는 사람"},like:"안정적인 관계, 고마움의 표현, 소소하고 확실한 행복",m:"100"},
"010":{n:"신중한 완벽주의자",d:"차분하고 조심스러우며, 자기 세계가 뚜렷한 독립형. 검증된 방식과 질서를 신뢰하고, 맡은 일은 꼼꼼히 끝까지 챙깁니다. 요란하진 않아도 안이 단단해요.",g:["꼼꼼함과 책임감","흔들리지 않는 원칙","높은 완성도"],b:["변화에 보수적","융통성 부족","혼자 끙끙 앓음"],c:["'원래 방식'이 늘 정답은 아니에요","완벽하지 않아도 시작해보기 — 80%면 충분할 때가 많아요"],r:{s:"루틴을 더 꽉 잡으며 통제감을 회복",l:"표현은 적지만 약속·기념일은 확실히 지킴",w:"조용히 일 잘하지만 마감 어기는 동료는 이해 불가"},like:"예측 가능한 일정, 조용한 성실을 알아봐주는 것, 명확한 기준",m:"101"},
"001":{n:"편안한 화합가",d:"느긋하고 낙천적이면서 사람과의 정을 즐기는 따뜻한 사교형. 웬만한 일엔 담담하고, 주변을 편안하게 만드는 재주가 있어요. 함께 있으면 마음이 놓이는 사람.",g:["안정적인 정서","따뜻한 친화력","여유와 낙천"],b:["갈등을 피하려 참음","추진력이 약할 때","편한 것에 안주"],c:["좋은 게 좋은 거라 넘기다 할 말을 놓치지 않기","가끔은 나를 위한 도전도 필요해요"],r:{s:"사람들과 수다·맛있는 것으로 회복",l:"편안하고 다정한 연애, 큰 굴곡 없이 오래",w:"팀의 윤활유 — 분위기 험해지면 먼저 풀어주는 사람"},like:"화기애애한 모임, 편안한 사람, 소소한 행복",m:"110"},
"000":{n:"쿨한 독립가",d:"안정적이고 대담하며, 관계에도 초연한 담백한 독립형. 감정에 잘 휘둘리지 않고 자기 페이스로 삽니다. 무심해 보여도 필요할 땐 누구보다 침착해요.",g:["흔들리지 않는 평정심","높은 독립성","냉철한 판단"],b:["정 없어 보인다는 오해","감정 표현 인색","혼자 다 하려 함"],c:["담백함과 무관심은 달라요 — 가까운 사람에겐 표현하기","도움을 청하는 것도 능력입니다"],r:{s:"혼자만의 시간으로 조용히 재정비",l:"말보다 행동으로 챙기는 무뚝뚝한 다정",w:"위기에 제일 침착, 사적인 얘긴 잘 안 함"},like:"각자의 시간 존중, 담백한 관계, 간섭 없는 신뢰",m:"111"},
};
var idx=0, ans=[];
function show(){
  var q=QS[idx];
  $('tc-qnum').textContent=(idx+1)+' / '+QS.length;
  $('tc-bar').style.width=(idx/QS.length*100)+'%';
  $('tc-q').textContent=q[0];
  var opts=$('tc-opts'); opts.innerHTML='';
  [q[1],q[2]].forEach(function(t,i){
    var b=document.createElement('button');
    b.textContent=t;
    b.style.cssText='padding:14px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-size:15.5px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#059669';};
    b.onmouseout=function(){b.style.borderColor='#d1d5db';};
    b.onclick=function(){ans[idx]=i; idx++; idx<QS.length?show():result();};
    opts.appendChild(b);
  });
}
function result(){
  var sc={NS:0,HA:0,RD:0,P:0,SD:0,C:0,ST:0};
  QS.forEach(function(q,i){ if(ans[i]===0) sc[q[3]]+=1; });
  function pct(a){return Math.round(sc[a]/4*100);}
  var key=(sc.NS>=2?'1':'0')+(sc.HA>=2?'1':'0')+(sc.RD>=2?'1':'0');
  renderResult(key,{NS:pct('NS'),HA:pct('HA'),RD:pct('RD'),P:pct('P'),SD:pct('SD'),C:pct('C'),ST:pct('ST')},false);
}
function tcbar(hi,lo,p){
  return '<div style="margin:10px 0;"><div style="display:flex;justify-content:space-between;font-size:13px;color:#555;"><span>'+lo+'</span><span style="font-weight:700;color:#047857;">'+hi+' '+p+'%</span></div><div style="height:10px;background:#e5e7eb;border-radius:5px;"><div style="height:10px;width:'+p+'%;background:#059669;border-radius:5px;"></div></div></div>';
}
function note(label,p,hi,lo){
  return '<li><b>'+label+'</b> — '+(p>=50?hi:lo)+'</li>';
}
function renderResult(key,P,shared){
  $('tc-intro').style.display='none';$('tc-quiz').style.display='none';
  if(!TYPES[key])key='001';
  var t=TYPES[key];
  function list(arr){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+arr.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  var barsHtml = P ? (
     '<h3 style="margin:20px 0 6px;font-size:17px;">🧭 나의 7가지 기질 프로파일</h3>'
     +tcbar('자극추구','신중·절제',P.NS)
     +tcbar('위험회피','대담·낙천',P.HA)
     +tcbar('사회적 민감성','초연·독립',P.RD)
     +tcbar('인내력','유연·전환',P.P)
     +tcbar('자율성','상황 의존',P.SD)
     +tcbar('연대감','자기 소신',P.C)
     +tcbar('자기초월','현실 지향',P.ST)
     +'<h3 style="margin:20px 0 6px;font-size:17px;">🌱 성격 성향 한 줄</h3>'
     +'<ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">'
     + note('인내력',P.P,'한번 잡으면 끝을 보는 끈기형','안 되면 빠르게 방향을 트는 유연형')
     + note('자율성',P.SD,'내 삶을 스스로 운전하는 주도형','아직 방향을 찾는 중 — 작은 선택부터 내 손으로')
     + note('연대감',P.C,'타인의 입장을 헤아리는 공감형','내 기준이 뚜렷한 소신형 (가끔은 한 발 양보도)')
     + note('자기초월',P.ST,'큰 흐름에 몰입하는 감성·몰입형','두 발을 땅에 딛는 현실형')
     +'</ul>'
  ) : '';
  $('tc-result').innerHTML=
   '<div style="text-align:center;padding:22px;border-radius:14px;background:#ecfdf5;">'
   +'<div style="font-size:14px;color:#555;">당신의 기질 유형은</div>'
   +'<div style="font-size:30px;font-weight:800;color:#047857;margin-top:4px;">'+t.n+'</div>'
   +'</div>'
   +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🎁 당신의 기질도 궁금하죠?</div>':barsHtml)
   +'<p style="line-height:1.7;margin-top:14px;">'+t.d+'</p>'
   +'<h3 style="margin:20px 0 6px;font-size:17px;">👍 강점</h3>'+list(t.g)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">👀 약점</h3>'+list(t.b)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">⚠️ 조심할 것</h3>'+list(t.c)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">🎬 이럴 때 이런 반응</h3>'
   +list(['스트레스 받으면: '+t.r.s,'연애할 때: '+t.r.l,'회사에서: '+t.r.w])
   +'<h3 style="margin:20px 0 6px;font-size:17px;">💚 선호하는 스타일</h3><div style="line-height:1.7;">'+t.like+'</div>'
   +'<h3 style="margin:20px 0 6px;font-size:17px;">💞 잘 맞는 기질</h3><div style="line-height:1.7;"><b>'+TYPES[t.m].n+'</b> — 서로의 빈 곳을 채워주는 조합으로 자주 꼽혀요 (재미로 봐주세요!)</div>'
   +'<div style="display:flex;gap:10px;margin-top:22px;">'
   +(shared
      ?'<button id="tc-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="tc-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
   +'</div>'
   +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14.5px;">🧠 다른 테스트도 → <a href="/tests/personality-test/">성격유형(MBTI식) 테스트</a> · <a href="/tests/eq-test/">공감능력(EQ) 테스트</a></div>'
   +'<p style="margin-top:14px;font-size:12.5px;color:#6b7280;line-height:1.6;">※ 재미로 보는 자체 제작 테스트예요. 정식 기질·성격 검사(TCI 등)나 심리 진단이 아닙니다. 마음이 힘들 땐 전문가와 상담하세요.</p>';
  $('tc-result').style.display='block';
  if(shared){
    var mine=$('tc-mine'); if(mine)mine.onclick=function(){location.href=location.pathname;};
  }else{
    $('tc-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+key;
      var txt='나의 기질 유형은 "'+t.n+'"! 너의 기질도 궁금해 👉 '+url;
      if(navigator.share){navigator.share({text:txt});}
      else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요! 붙여넣기로 공유하세요.');});}
    };
  }
  window.scrollTo({top:$('tctest').offsetTop-20,behavior:'smooth'});
}
$('tc-start').onclick=function(){$('tc-intro').style.display='none';$('tc-quiz').style.display='block';show();};
// 공유 링크(?r=###)로 들어오면 그 유형을 바로 보여줌
(function(){
  var m=(location.search.match(/[?&]r=([01]{3})/));
  if(m){renderResult(m[1],null,true);}
})();
})();
</script>

## 이 테스트에 대하여

- **7가지 축**: 타고난 **기질** 4가지 — 자극추구(새로움을 얼마나 좇는지), 위험회피(걱정·조심의 정도), 사회적 민감성(관계·인정에 반응하는 정도), 인내력(끈기) — 과, 살면서 다듬어지는 **성격** 3가지 — 자율성(내 삶의 주도권), 연대감(타인과의 협력·공감), 자기초월(나를 넘어선 몰입) — 으로 나를 봅니다.
- 기질 3축(자극추구·위험회피·사회적 민감성)의 조합으로 **8가지 유형**이 나오고, 나머지 축은 프로파일 막대와 한 줄 해설로 보여드려요.
- 이 테스트는 위 **기질·성격 모델의 틀만 참고한 자체 제작 28문항**입니다. 심리학자 로버트 클로닌저의 기질·성격 이론에서 개념을 빌렸을 뿐, 정식 TCI® 검사(한국판 저작권 보유 기관)와는 무관하며 그 문항을 쓰지 않았습니다.
- 재미와 자기이해를 위한 테스트예요. **의학적·심리학적 진단이 아닙니다.** 답변과 결과는 브라우저 안에서만 처리되고 어디에도 저장되지 않습니다.
