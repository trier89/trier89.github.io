---
title: "기질·성격 유형 테스트 — 28문항으로 보는 나의 7가지 기질 (무료)"
description: "자극추구·위험회피·사회적 민감성·인내력·자율성·연대감·자기초월, 7가지 축으로 보는 16가지 기질 유형. 축별 자세한 해설, 연애·직장·공부 해석, 기질 궁합, 친구와 결과 비교까지. 28문항, 무료, 회원가입 없음."
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
function tcbar(hi,lo,p){
  return '<div style="margin:10px 0;"><div style="display:flex;justify-content:space-between;font-size:13px;color:#555;"><span>'+lo+'</span><span style="font-weight:700;color:#047857;">'+hi+' '+p+'%</span></div><div style="height:10px;background:#e5e7eb;border-radius:5px;"><div style="height:10px;width:'+p+'%;background:#059669;border-radius:5px;"></div></div></div>';
}
function note(label,p,hi,lo){
  return '<li><b>'+label+'</b> — '+(p>=50?hi:lo)+'</li>';
}
// ---- 16유형(인내력 추가) 보조 데이터
var SUB={
"1111":["끝장형","감정이 출렁여도 한번 빠진 일은 끝까지 붙잡아요. 불안할수록 포기 대신 더 파고드는 타입이라, 번아웃만 조심하면 깊이 있는 결과를 냅니다."],
"1110":["전환형","설렘이 식으면 다음 설렘으로 옮겨가요. 다양한 경험이 자산이지만, 하다 만 일이 쌓이면 불안도 커지니 '하나는 끝내기' 규칙이 도움돼요."],
"1101":["끝장형","오래 고민하지만 일단 시작하면 끝까지 갑니다. 준비가 길어 출발은 늦어도 완주율은 높아요."],
"1100":["전환형","계획은 많은데 시작 전에 다른 관심사로 넘어가기 쉬워요. 작게 시작해 빨리 결과를 보는 방식이 잘 맞아요."],
"1011":["끝장형","에너지와 끈기를 다 가진 추진력의 끝판왕. 사람을 모아 끝까지 밀어붙이는 리더형이지만, 주변이 지치지 않게 속도 조절을."],
"1010":["전환형","시작의 천재. 판을 벌이고 분위기를 띄우는 데 최고고, 마무리는 꼼꼼한 파트너와 나누면 더 빛나요."],
"1001":["끝장형","자기 방식으로 끝까지 가는 고집 있는 개척자. 남이 안 가는 길도 혼자서 완주해요."],
"1000":["전환형","흥미를 따라 자유롭게 흘러다니는 여행자. 넓게 경험하는 게 강점이고, 꾸준함이 필요한 일은 마감·동료 같은 환경으로 보완해요."],
"0111":["끝장형","맡은 일과 사람을 끝까지 책임지는 든든한 버팀목. 혼자 다 짊어지지만 않으면 돼요."],
"0110":["전환형","분위기와 관계를 살피며 유연하게 맞춰가요. 무리하지 않는 대신 결정이 늦어질 수 있어요."],
"0101":["끝장형","완성도에 대한 집념이 가장 강한 조합. 장인 기질이지만 '완벽해야 시작'은 내려놓기."],
"0100":["전환형","신중하지만 고집하지 않아 현실적으로 타협할 줄 알아요. 큰 그림보다 당장 할 일을 정리하는 데 강해요."],
"0011":["끝장형","느긋해 보여도 꾸준함으로 결국 해내는 거북이형. 오래가는 관계와 습관이 강점이에요."],
"0010":["전환형","흐름에 몸을 맡기는 여유파. 스트레스는 적지만 목표가 흐려지기 쉬우니 가벼운 루틴 하나를."],
"0001":["끝장형","조용히, 흔들림 없이 끝까지 가는 냉철한 완주자. 위기에 가장 믿음직해요."],
"0000":["전환형","필요한 만큼만 담백하게 하는 효율주의자. 에너지 낭비가 없지만 무관심해 보일 수 있어요."]
};
// 실생활: 공부·일하는 법, 부딪히기 쉬운 기질
var LIFE={
"111":{st:"짧게 몰입하는 스프린트 + 피드백·칭찬을 받을 수 있는 스터디 모임",x:["100","정 많은 나와 달리 자유로운 상대의 연락·표현 온도에 서운해지기 쉬워요"],mw:"나의 출렁임을 받아주는 안정감"},
"110":{st:"충분히 계획하되 '첫 단계'만은 오늘 하기, 혼자 집중할 수 있는 환경",x:["101","상대의 속도에 끌려가는 느낌이 들기 쉬워요"],mw:"재촉하지 않고 기다려주는 여유"},
"101":{st:"사람들과 함께, 목표를 잘게 쪼개 게임처럼 보상 주기",x:["110","나의 속도와 즉흥이 상대에겐 부담이 되기 쉬워요"],mw:"벌여놓은 일을 차분히 다듬어주는 꼼꼼함"},
"100":{st:"자율성이 큰 프로젝트형, 직접 해보며 배우기",x:["111","감정 표현의 온도 차이로 서로 지치기 쉬워요"],mw:"자유를 존중하면서 따뜻하게 챙겨주는 마음"},
"011":{st:"안정된 루틴 + 함께하는 사람이 있을 때 꾸준해요",x:["000","표현이 적은 상대에게 서운함이 쌓이기 쉬워요"],mw:"새로운 세계로 데려가 주는 대담함"},
"010":{st:"체계적인 계획표와 체크리스트, 조용한 환경",x:["100","규칙과 자유가 자주 부딪혀요"],mw:"딱딱해진 일상에 활력을 불어넣는 에너지"},
"001":{st:"부담 없이 꾸준하게, 친구와 같이 하면 더 좋아요",x:["010","나의 느긋함과 상대의 꼼꼼함이 서로 답답할 수 있어요"],mw:"편안함 속에 적당한 긴장을 더해주는 신중함"},
"000":{st:"혼자 효율적으로, 목표와 이유가 분명할 때 강해요",x:["011","연락·표현 빈도 차이로 상대가 서운해하기 쉬워요"],mw:"담백한 나를 감정이 풍부한 세계로 이끄는 열정"}
};
// 7개 축 구간별 해설: [축 이름, {hi:[한줄,강점,주의,조언], mid:[...], lo:[...]}]
var AX=[
["NS","자극추구",{hi:["새로움에 끌리는 탐험가","호기심과 추진력","쉽게 싫증 나고 충동적일 수 있음","큰 결정은 하룻밤 재우고 내리기"],mid:["새것도 익숙한 것도 괜찮은 균형형","상황에 맞춰 도전과 안정을 고름","가끔 어느 쪽인지 스스로도 헷갈림","하고 싶은 쪽을 먼저 적어보기"],lo:["검증된 길을 좋아하는 안정 추구형","꾸준함과 신중함","변화가 필요할 때 시작이 늦음","한 달에 하나, 작은 새로움 시도하기"]}],
["HA","위험회피",{hi:["미리 걱정하고 대비하는 신중형","실수가 적고 준비성이 좋음","불안과 피로가 쉽게 쌓임","걱정하는 시간을 하루 15분으로 정해두기"],mid:["조심할 땐 조심, 부딪힐 땐 부딪히는 형","위험을 적당히 계산함","컨디션 따라 걱정이 커지기도","걱정되면 최악·최선·현실 세 가지로 적기"],lo:["낙천적이고 대담한 형","낯선 상황에도 금방 편안함","위험 신호를 가볍게 넘길 수 있음","중요한 결정엔 체크리스트 한 장"]}],
["RD","사회적 민감성",{hi:["사람에게서 에너지를 얻는 공감형","정이 많고 관계를 잘 챙김","거절·평가에 쉽게 상처받음","인정은 남에게서만이 아니라 내 안에서도"],mid:["함께도 좋고 혼자도 괜찮은 형","관계와 독립의 균형","가끔 서운함을 말하지 못함","서운하면 그날 안에 한 문장으로 말하기"],lo:["혼자서도 잘 지내는 독립형","남의 시선에 덜 흔들림","차갑다는 오해를 받기도","고마움은 말로 한 번 더 표현하기"]}],
["P","인내력",{hi:["한번 잡으면 끝을 보는 끈기형","완성도와 책임감","안 되는 일에도 너무 오래 매달림","그만둘 기준도 시작할 때 정해두기"],mid:["필요할 땐 버티고 아니면 접는 형","끈기와 유연함의 균형","흥미 없는 일엔 쉽게 늘어짐","재미없는 일은 작게 쪼개 보상 붙이기"],lo:["아니다 싶으면 빠르게 방향을 트는 유연형","전환이 빠르고 미련이 적음","마무리가 약하다는 소리를 듣기도","끝낼 날짜를 남에게 선언하기"]}],
["SD","자율성",{hi:["내 삶을 스스로 운전하는 주도형","목표 설정과 자기 책임","남에게도 엄격해질 수 있음","도움을 청하는 것도 능력이에요"],mid:["상황에 따라 주도와 맞춤을 오가는 형","현실적인 자기 관리","남의 기대에 휘둘릴 때가 있음","이번 주 내가 정한 목표 하나 적기"],lo:["아직 방향을 찾는 중인 형","주변에 잘 맞춰주는 유연함","무력감이나 남 탓이 생기기 쉬움","작은 목표 하나를 끝까지 해보는 경험부터"]}],
["C","연대감",{hi:["타인을 헤아리는 협력형","배려와 팀워크","내 주장을 삼키기 쉬움","거절도 관계의 일부예요"],mid:["협력하되 내 기준도 있는 형","균형 잡힌 관계","갈등을 피하려 넘어갈 때가 있음","의견 차이는 사실·감정 나눠 말하기"],lo:["내 기준이 뚜렷한 소신형","독립적인 판단","고집스러워 보일 수 있음","상대 입장을 한 문장으로 요약해보기"]}],
["ST","자기초월",{hi:["큰 흐름에 몰입하는 감성·의미형","몰입과 영감","현실 감각이 흐려질 때가 있음","꿈에도 마감일을 붙이기"],mid:["현실과 의미를 오가는 형","실용과 감성의 균형","가끔 의미를 잃은 듯한 시기","하루 10분, 좋아하는 것에 그냥 빠져보기"],lo:["두 발을 땅에 딛는 현실형","실용적이고 객관적","의미나 보람이 옅어질 수 있음","가끔은 이유 없는 경험도 해보기"]}]
];
function band(p){return p>=75?'hi':(p<=25?'lo':'mid');}
var BL={hi:'높음',mid:'중간',lo:'낮음'};
function enc(sc){return [sc.NS,sc.HA,sc.RD,sc.P,sc.SD,sc.C,sc.ST].join('');}
function dec(s){var k=['NS','HA','RD','P','SD','C','ST'],o={};for(var i=0;i<7;i++)o[k[i]]=Math.round((+s[i]||0)/4*100);return o;}
function keyOf(P){return (P.NS>=50?'1':'0')+(P.HA>=50?'1':'0')+(P.RD>=50?'1':'0')+(P.P>=50?'1':'0');}
function fullName(k4){var t=TYPES[k4.slice(0,3)]||TYPES['001'];var s=SUB[k4];return t.n+(s?' · '+s[0]:'');}
function store(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function load(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}}

function result(){
  var sc={NS:0,HA:0,RD:0,P:0,SD:0,C:0,ST:0};
  QS.forEach(function(q,i){ if(ans[i]===0) sc[q[3]]+=1; });
  var s=enc(sc), P=dec(s);
  renderResult(keyOf(P),P,false,s);
}

function cardImage(k4,P){
  var c=document.createElement('canvas');c.width=1080;c.height=1350;var x=c.getContext('2d');
  var g=x.createLinearGradient(0,0,0,1350);g.addColorStop(0,'#ecfdf5');g.addColorStop(1,'#d1fae5');x.fillStyle=g;x.fillRect(0,0,1080,1350);
  x.fillStyle='#047857';x.textAlign='center';
  x.font='500 40px sans-serif';x.fillText('나의 기질 유형은',540,150);
  var t=TYPES[k4.slice(0,3)],s=SUB[k4];
  x.font='800 92px sans-serif';x.fillText(t.n,540,270);
  if(s){x.font='700 52px sans-serif';x.fillStyle='#059669';x.fillText('· '+s[0]+' ·',540,350);}
  var rows=[['자극추구',P.NS],['위험회피',P.HA],['사회적 민감성',P.RD],['인내력',P.P],['자율성',P.SD],['연대감',P.C],['자기초월',P.ST]];
  rows.forEach(function(r,i){var y=470+i*105;x.textAlign='left';x.fillStyle='#1f2937';x.font='600 38px sans-serif';x.fillText(r[0],110,y);
    x.textAlign='right';x.fillStyle='#047857';x.fillText(r[1]+'%',970,y);
    x.fillStyle='#ffffff';x.fillRect(110,y+20,860,26);x.fillStyle='#059669';x.fillRect(110,y+20,860*r[1]/100,26);});
  x.textAlign='center';x.fillStyle='#6b7280';x.font='500 34px sans-serif';x.fillText('planfully.ai.kr · 기질·성격 유형 테스트',540,1290);
  return c;
}

function compareHtml(me,fr){
  var names={NS:'자극추구',HA:'위험회피',RD:'사회적 민감성',P:'인내력',SD:'자율성',C:'연대감',ST:'자기초월'};
  var keys=['NS','HA','RD','P','SD','C','ST'],tot=0,maxk='NS',maxd=-1,h='';
  keys.forEach(function(k){var d=Math.abs(me[k]-fr.P[k]);tot+=d;if(d>maxd){maxd=d;maxk=k;}
    h+='<div style="margin:9px 0;"><div style="font-size:13px;color:#4b5563;display:flex;justify-content:space-between;"><span>'+names[k]+'</span><span><b style="color:#047857">나 '+me[k]+'%</b> · <b style="color:#7c3aed">친구 '+fr.P[k]+'%</b></span></div>'
     +'<div style="height:8px;background:#e5e7eb;border-radius:4px;margin-top:3px;"><div style="height:8px;width:'+me[k]+'%;background:#059669;border-radius:4px;"></div></div>'
     +'<div style="height:8px;background:#e5e7eb;border-radius:4px;margin-top:3px;"><div style="height:8px;width:'+fr.P[k]+'%;background:#8b5cf6;border-radius:4px;"></div></div></div>';});
  var sim=Math.round(100-tot/keys.length);
  var myk=keyOf(me).slice(0,3),frk=fr.key.slice(0,3),rel;
  if(TYPES[myk].m===frk||TYPES[frk].m===myk)rel='💞 서로의 빈 곳을 채워주는 <b>환상의 짝</b> 조합이에요.';
  else if(LIFE[myk].x[0]===frk||LIFE[frk].x[0]===myk)rel='🌡️ 온도 차가 생기기 쉬운 조합이에요. 다른 점을 알고 있으면 오히려 잘 지낼 수 있어요.';
  else if(myk===frk)rel='🪞 기질이 닮은 조합이에요. 말 안 해도 통하지만, 같은 약점도 공유해요.';
  else rel='🤝 비슷한 듯 다른 조합이에요. 서로에게 배울 점이 많아요.';
  return '<div style="margin-top:22px;padding:16px;border-radius:14px;background:#f5f3ff;border:1px solid #ddd6fe;color:#1f2937;">'
   +'<h3 style="margin:0 0 6px;font-size:18px;color:#5b21b6;">👥 친구와 비교</h3>'
   +'<div style="font-size:15px;color:#1f2937;">친구: <b>'+fullName(fr.key)+'</b> · 닮은 정도 <b style="color:#7c3aed;font-size:18px;">'+sim+'%</b></div>'
   +'<div style="margin-top:6px;line-height:1.6;color:#1f2937;">'+rel+'</div>'
   +'<div style="margin-top:6px;font-size:14px;color:#555;">가장 다른 부분은 <b>'+names[maxk]+'</b>('+maxd+'%p 차이)예요.</div>'+h
   +'<button id="tc-clearf" style="margin-top:8px;border:0;background:none;color:#7c3aed;font-size:13px;cursor:pointer;text-decoration:underline;">비교 지우기</button></div>';
}

function renderResult(k4,P,shared,scode){
  $('tc-intro').style.display='none';$('tc-quiz').style.display='none';
  if(k4.length===3)k4=k4+'1';
  var k3=k4.slice(0,3); if(!TYPES[k3]){k3='001';k4='0011';}
  var t=TYPES[k3],sub=SUB[k4],L=LIFE[k3];
  function list(arr){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+arr.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  function h3(s){return '<h3 style="margin:22px 0 6px;font-size:17px;">'+s+'</h3>';}
  var bars='',axes='';
  if(P){
    bars=h3('🧭 나의 7가지 기질 프로파일')
     +tcbar('자극추구','신중·절제',P.NS)+tcbar('위험회피','대담·낙천',P.HA)+tcbar('사회적 민감성','초연·독립',P.RD)+tcbar('인내력','유연·전환',P.P)
     +tcbar('자율성','상황 의존',P.SD)+tcbar('연대감','자기 소신',P.C)+tcbar('자기초월','현실 지향',P.ST);
    axes=h3('🔍 축별 자세한 해설')+'<div style="display:flex;flex-direction:column;gap:8px;">';
    AX.forEach(function(a){var b=band(P[a[0]]),d=a[2][b];
      axes+='<details style="border:1px solid #d1fae5;border-radius:10px;padding:10px 12px;background:#fff;color:#1f2937;"><summary style="cursor:pointer;font-weight:700;color:#1f2937;">'+a[1]+' <span style="color:#047857;">'+P[a[0]]+'% · '+BL[b]+'</span> — <span style="font-weight:400;">'+d[0]+'</span></summary>'
       +'<div style="margin-top:8px;line-height:1.7;font-size:14.5px;color:#1f2937;">👍 <b>강점</b> '+d[1]+'<br>👀 <b>주의</b> '+d[2]+'<br>💡 <b>조언</b> '+d[3]+'</div></details>';});
    axes+='</div>';
  }
  var fr=load('tc-friend');
  $('tc-result').innerHTML=
   '<div style="text-align:center;padding:22px;border-radius:14px;background:#ecfdf5;">'
   +'<div style="font-size:14px;color:#555;">'+(shared?'친구의 기질 유형은':'당신의 기질 유형은')+'</div>'
   +'<div style="font-size:30px;font-weight:800;color:#047857;margin-top:4px;">'+t.n+'</div>'
   +(sub?'<div style="display:inline-block;margin-top:6px;padding:3px 12px;border-radius:999px;background:#059669;color:#fff;font-weight:700;font-size:14px;">'+sub[0]+'</div>':'')
   +'<div style="font-size:12.5px;color:#6b7280;margin-top:8px;">16가지 유형 중 하나 · 기질 3축 + 인내력</div>'
   +'</div>'
   +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🎁 '+(P?'나도 테스트하면 친구와 비교해 드려요!':'당신의 기질도 궁금하죠?')+'</div>':'')
   +'<p style="line-height:1.7;margin-top:14px;">'+t.d+'</p>'
   +(sub?'<p style="line-height:1.7;padding:12px 14px;border-radius:10px;background:#f0fdf4;border-left:4px solid #059669;color:#1f2937;"><b>'+sub[0]+'</b> — '+sub[1]+'</p>':'')
   +bars+axes
   +h3('👍 강점')+list(t.g)+h3('👀 약점')+list(t.b)+h3('⚠️ 조심할 것')+list(t.c)
   +h3('🏠 실생활에서는')
   +list(['😣 스트레스 받으면: '+t.r.s,'💕 연애할 때: '+t.r.l,'💼 회사에서: '+t.r.w,'📚 공부·일하는 법: '+L.st])
   +h3('💚 선호하는 스타일')+'<div style="line-height:1.7;">'+t.like+'</div>'
   +h3('💞 기질 궁합')
   +'<div style="line-height:1.8;">잘 맞는 기질: <b>'+TYPES[t.m].n+'</b> — '+L.mw+'<br>부딪히기 쉬운 기질: <b>'+TYPES[L.x[0]].n+'</b> — '+L.x[1]+'<br><span style="font-size:13px;color:#6b7280;">(재미로 봐주세요! 다른 점을 알면 어떤 조합이든 잘 지낼 수 있어요)</span></div>'
   +(!shared&&fr&&P?compareHtml(P,fr):'')
   +'<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;">'
   +(shared
      ?'<button id="tc-mine" style="flex:1;min-width:200px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">'+(P?'나도 하고 친구와 비교하기 →':'나도 테스트하기 →')+'</button>'
      :'<button id="tc-share" style="flex:1;min-width:140px;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">친구에게 공유·비교</button>'
       +'<button id="tc-img" style="flex:1;min-width:140px;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">결과 이미지 저장</button>'
       +'<button onclick="location.href=location.pathname" style="flex-basis:100%;padding:11px;border:0;border-radius:10px;background:#f3f4f6;color:#374151;font-size:14px;cursor:pointer;">다시 하기</button>')
   +'</div>'
   +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14.5px;">📖 <a href="/guide/temperament-types/">기질 4가지·16유형 해설 읽기</a> · <a href="/guide/mbti-vs-temperament/">MBTI와 뭐가 다를까?</a><br>🧠 다른 테스트 → <a href="/tests/personality-test/">성격유형(MBTI식)</a> · <a href="/tests/eq-test/">공감능력(EQ)</a></div>'
   +'<p style="margin-top:14px;font-size:12.5px;color:#6b7280;line-height:1.6;">※ 재미로 보는 자체 제작 테스트예요. 정식 기질·성격 검사(TCI 등)나 심리 진단이 아닙니다. 마음이 힘들 땐 전문가와 상담하세요.</p>';
  $('tc-result').style.display='block';
  if(shared){
    $('tc-mine').onclick=function(){location.href=location.pathname;};
  }else{
    $('tc-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+k4+(scode?'&s='+scode:'');
      var txt='나의 기질 유형은 "'+fullName(k4)+'"! 너도 해보고 나랑 비교해봐 👉 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(function(){$('tc-share').textContent='링크 복사됨! 붙여넣어 보내세요';});}
    };
    $('tc-img').onclick=function(){
      var c=cardImage(k4,P||dec('2222222'));
      c.toBlob(function(b){
        var f=new File([b],'my-temperament.png',{type:'image/png'});
        if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:fullName(k4)}).catch(function(){});}
        else{var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='my-temperament.png';document.body.appendChild(a);a.click();a.remove();}
      },'image/png');
    };
    var cf=$('tc-clearf'); if(cf)cf.onclick=function(){store('tc-friend',null);cf.parentNode.remove();};
  }
  window.scrollTo({top:$('tctest').offsetTop-20,behavior:'smooth'});
}
$('tc-start').onclick=function(){$('tc-intro').style.display='none';$('tc-quiz').style.display='block';show();};
// 공유 링크: ?r=####(16유형) 또는 ?r=###(옛 8유형), &s=7자리(친구 점수) → 친구 결과 보여주고 비교용으로 저장
(function(){
  var m=location.search.match(/[?&]r=([01]{3,4})/), s=location.search.match(/[?&]s=([0-4]{7})/);
  if(m){
    var P=s?dec(s[1]):null;
    if(P) store('tc-friend',{key:keyOf(P),P:P});
    renderResult(m[1],P,true);
  }
})();
})();
</script>

## 이 테스트에 대하여

- **7가지 축**: 타고난 **기질** 4가지 — 자극추구(새로움을 얼마나 좇는지), 위험회피(걱정·조심의 정도), 사회적 민감성(관계·인정에 반응하는 정도), 인내력(끈기) — 과, 살면서 다듬어지는 **성격** 3가지 — 자율성(내 삶의 주도권), 연대감(타인과의 협력·공감), 자기초월(나를 넘어선 몰입) — 으로 나를 봅니다.
- 기질 3축(자극추구·위험회피·사회적 민감성)으로 8가지 기본 유형을 나누고, **인내력**이 높으면 '끝장형', 낮으면 '전환형'으로 나눠 **16가지 유형**이 나와요. 7개 축 모두 점수 구간별 해설(강점·주의·조언)과 실생활 해석, 기질 궁합을 보여드려요.
- 결과를 친구에게 보내면, 친구가 테스트를 마친 뒤 **두 사람의 7개 축을 나란히 비교**해 드려요. 결과 이미지 카드로 저장할 수도 있어요.
- 이 테스트는 위 **기질·성격 모델의 틀만 참고한 자체 제작 28문항**입니다. 심리학자 로버트 클로닌저의 기질·성격 이론에서 개념을 빌렸을 뿐, 정식 TCI® 검사(한국판 저작권 보유 기관)와는 무관하며 그 문항을 쓰지 않았습니다.
- 재미와 자기이해를 위한 테스트예요. **의학적·심리학적 진단이 아닙니다.** 답변과 결과는 브라우저 안에서만 처리되고 어디에도 저장되지 않습니다.
