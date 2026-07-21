---
title: "16 성격유형 테스트 — 24문항으로 알아보는 내 유형 (무료)"
description: "MBTI로 널리 알려진 4가지 성격 지표에 확신형/민감형(A/T) 축까지, 24문항으로 내 유형·장단점·조심할 점·상황별 리액션·궁합을 알아보세요. 무료, 광고식 회원가입 없음."
date: 2026-07-21
slug: "personality-test"
categories: ["도구"]
tags: ["성격유형 테스트", "MBTI", "성격 테스트", "무료 성격검사", "16가지 성격"]
toc: false
readingTime: false
---

흔히 **MBTI**로 알려진 4가지 성격 지표(E/I·S/N·T/F·J/P)에 **확신형/민감형(-A/-T)** 축까지 더한 24문항 테스트입니다. 본 테스트는 자체 제작 문항으로, 공식 MBTI® 검사가 아닙니다. 답변은 저장·전송되지 않아요.

<div id="ptest" style="max-width:600px;margin:0 auto;">
  <div id="pt-intro" style="text-align:center;">
    <button id="pt-start" style="padding:16px 40px;border:0;border-radius:12px;background:#059669;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작하기 (약 3분)</button>
  </div>
  <div id="pt-quiz" style="display:none;">
    <div style="height:8px;background:#e5e7eb;border-radius:4px;margin-bottom:18px;"><div id="pt-bar" style="height:8px;width:0%;background:#059669;border-radius:4px;transition:width .3s;"></div></div>
    <div id="pt-qnum" style="font-size:13px;color:#888;margin-bottom:6px;"></div>
    <div id="pt-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:60px;"></div>
    <div id="pt-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="pt-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 문항: [질문, A선택지, B선택지, 축, A가 가리키는 극]
var QS=[
["모임이 끝나고 집에 오면","기 빨려서 혼자만의 시간이 필요하다","아쉬워서 또 만날 약속을 잡고 싶다","EI","I"],
["주말에 갑자기 약속이 취소되면","속으로 쾌재를 부른다","심심해서 다른 약속을 찾는다","EI","I"],
["처음 보는 사람들과의 자리에서 나는","주로 듣는 편이다","주로 말을 꺼내는 편이다","EI","I"],
["에너지가 충전되는 순간은","혼자 조용히 보낼 때","사람들과 어울릴 때","EI","I"],
["설명서를 볼 때 나는","순서대로 차근차근 읽는다","대충 훑고 일단 해본다","SN","S"],
["대화할 때 더 흥미로운 주제는","실제 있었던 일, 경험담","만약에~ 같은 상상과 아이디어","SN","S"],
["새로운 일을 배울 때","검증된 방법을 따르는 게 편하다","내 방식대로 실험해보고 싶다","SN","S"],
["나는 어느 쪽에 가까운가","현실적이고 구체적인 사람","공상적이고 아이디어가 많은 사람","SN","S"],
["친구가 고민을 털어놓으면 먼저","해결 방법부터 생각한다","마음이 얼마나 힘들지 공감부터 한다","TF","T"],
["결정을 내릴 때 더 중요한 것은","논리적으로 맞는가","관련된 사람들의 마음","TF","T"],
["\"너 요즘 살쪘어?\"라는 말을 들으면","사실인지 아닌지부터 생각한다","기분이 상한다","TF","T"],
["영화를 보고 나면","설정의 개연성을 따져본다","인물의 감정에 여운이 남는다","TF","T"],
["여행 갈 때 나는","일정표를 미리 짜야 마음이 편하다","그때그때 발길 닿는 대로 간다","JP","J"],
["과제나 일은","마감 훨씬 전에 끝내놓는 편","마감 직전에 몰아서 하는 편","JP","J"],
["내 책상(또는 폴더)은","정리돼 있어야 일이 된다","어질러져 있어도 다 찾을 수 있다","JP","J"],
["계획이 틀어지면","스트레스를 받는다","오히려 재미있다고 느낀다","JP","J"],
["결정을 내린 후 나는","뒤돌아보지 않는 편이다","\"그때 다르게 할걸\" 자주 곱씹는다","AT","A"],
["다른 사람의 평가에","크게 흔들리지 않는다","꽤 신경 쓰인다","AT","A"],
["스트레스 상황에서 나는","비교적 침착함을 유지한다","감정 기복이 심해진다","AT","A"],
["나 자신에게","이만하면 잘하고 있다고 생각한다","늘 부족하다고 느껴 채찍질한다","AT","A"],
["단체 프로젝트에서 나는","조율하고 진행시키는 역할","아이디어를 던지는 역할","EI","E"],
["기억에 남는 것은","오감으로 겪은 생생한 장면","그때 떠올랐던 생각과 의미","SN","S"],
["갈등 상황에서 나는","할 말은 해야 풀린다","분위기가 상할까 봐 참는 편","TF","T"],
["쇼핑할 때","살 것을 정해두고 그것만 산다","둘러보다 꽂히면 산다","JP","J"],
];
// 21번(EI) A=E: 진행형 역할=E 성향
var TYPES={
INTJ:{n:"용의주도한 전략가",d:"머릿속에 항상 큰 그림이 있는 사람. 비효율을 못 참고, 목표가 생기면 조용히 그러나 확실하게 판을 짭니다. 겉은 차가워 보여도 아끼는 사람에겐 진심입니다.",g:["장기 계획과 실행력","독립적인 문제 해결","본질을 꿰뚫는 통찰"],b:["감정 표현에 서툶","융통성 부족","타인에게도 높은 잣대"],c:["'내가 다 맞다'는 확신이 관계를 상하게 할 수 있어요","쉬는 것도 전략입니다 — 번아웃 주의"],r:{s:"말수가 급격히 줄고 혼자 정리할 시간을 찾음",l:"표현은 적지만 행동으로 챙기는 스타일",w:"회의에서 결론 없이 빙빙 돌면 속으로 한숨"},like:"결론 있는 대화, 계획대로 흘러가는 하루, 간섭 없는 신뢰",m:"ENFP",celeb:null},
INTP:{n:"논리적인 사색가",d:"'왜?'가 인생의 기본값. 관심 분야엔 무서운 집중력을 보이지만 흥미가 식으면 눈길도 안 줍니다. 규칙보다 원리를, 결론보다 가능성을 좋아합니다.",g:["뛰어난 분석력","독창적인 관점","지적 호기심"],b:["실행이 느림","일상 관리 소홀","감정 대화 회피"],c:["생각만 하다 기회를 놓칠 수 있어요 — 일단 시작","'그건 비논리적인데'를 입 밖에 내기 전에 한 번 참기"],r:{s:"게임·위키·유튜브 토끼굴로 도피",l:"좋아하는 사람 앞에서 갑자기 아는 것을 다 설명함",w:"관심 없는 회의에선 영혼이 육체를 떠남"},like:"혼자만의 탐구 시간, 지적인 농담이 통하는 사람, 자율성",m:"ENTJ",celeb:null},
ENTJ:{n:"대담한 통솔자",d:"태어날 때부터 리더 자리가 어색하지 않은 사람. 목표를 세우면 자원과 사람을 조직해 밀어붙입니다. 효율과 성장이 인생의 키워드.",g:["추진력과 결단력","조직을 움직이는 능력","목표 달성 집착"],b:["타인의 페이스를 못 기다림","감정 배려 부족","워커홀릭 경향"],c:["모두가 당신 속도로 달릴 수는 없어요","'이기는 것'보다 중요한 관계도 있습니다"],r:{s:"더 일에 몰두하며 통제감을 회복하려 함",l:"연애도 프로젝트처럼 — 데이트 코스가 완벽함",w:"비효율적인 프로세스를 보면 손이 근질거림"},like:"유능한 동료, 빠른 의사결정, 성장하는 느낌",m:"INTP",celeb:null},
ENTP:{n:"뜨거운 논쟁을 즐기는 변론가",d:"토론이 놀이인 사람. 고정관념을 뒤집는 게 취미이고, 아이디어가 샘솟지만 마무리는 종종 남의 몫입니다. 지루한 게 세상에서 제일 싫습니다.",g:["빠른 두뇌 회전","창의적 발상","위기에서의 순발력"],b:["벌인 일을 안 끝냄","논쟁을 이기려다 상처 줌","루틴에 취약"],c:["'반박 본능'이 소중한 사람을 지치게 할 수 있어요","시작한 일 3개 중 1개는 끝내보기"],r:{s:"더 말이 많아지고 아이디어가 폭주함",l:"티키타카가 되는 사람에게 급속도로 빠짐",w:"브레인스토밍에선 에이스, 정산 서류 앞에선 실종"},like:"티키타카 대화, 새로운 도전, 규칙 없는 자유",m:"INFJ",celeb:null},
INFJ:{n:"선의의 옹호자",d:"조용하지만 신념이 깊은 사람. 사람들의 마음을 잘 읽고, 의미 없는 일엔 움직이지 않습니다. 소수의 깊은 관계를 인생의 보물로 여깁니다.",g:["깊은 공감과 통찰","신념과 실행의 결합","경청 능력"],b:["혼자 끙끙 앓음","완벽주의","갑자기 손절(인프제 문닫기)"],c:["모두를 구할 수는 없어요 — 자신부터 챙기기","서운함은 쌓기 전에 말하기"],r:{s:"괜찮은 척하다가 혼자 무너짐",l:"천천히 마음을 열지만 한번 열면 올인",w:"겉으론 조용히 일하지만 속으론 조직의 모든 관계도를 파악 중"},like:"깊은 대화, 의미 있는 일, 조용한 단둘의 시간",m:"ENTP",celeb:null},
INFP:{n:"열정적인 중재자",d:"겉은 잔잔한 호수, 속은 우주. 자기만의 가치관이 뚜렷하고, 좋아하는 것 앞에서는 놀라운 열정을 보입니다. 세상의 아픔에 쉽게 마음이 움직입니다.",g:["풍부한 상상력","진정성","다른 사람의 가능성을 봐줌"],b:["현실 감각 부족","비판에 쉽게 상처","시작이 어려움"],c:["이상과 현실의 간극에 자책하지 말기","거절도 연습이 필요해요"],r:{s:"이불 속에서 상상 회로를 돌리며 세계관 구축",l:"짝사랑 소설 한 편을 마음속으로 완결냄",w:"조용히 있다가 가치관을 건드리면 의외로 단호함"},like:"내 세계를 존중해주는 사람, 감성적인 콘텐츠, 마감 없는 창작",m:"ENTJ",celeb:null},
ENFJ:{n:"정의로운 사회운동가",d:"사람을 살리는 말을 할 줄 아는 타고난 멘토. 분위기를 읽고 모두를 챙기며, 사람들의 성장에서 보람을 느낍니다. 정작 자기 부탁은 잘 못합니다.",g:["사람을 이끄는 카리스마","공감형 리더십","조직의 윤활유"],b:["오지랖으로 오해받음","거절을 못함","인정 욕구"],c:["모두에게 좋은 사람일 필요는 없어요","남 챙기다 내 일정이 무너지지 않게"],r:{s:"사람들 앞에선 웃고 집에서 방전됨",l:"상대의 꿈을 나의 꿈처럼 응원함",w:"팀 분위기가 안 좋으면 일보다 그게 더 신경 쓰임"},like:"함께 성장하는 관계, 고마움을 표현해주는 사람, 화목한 분위기",m:"INFP",celeb:null},
ENFP:{n:"재기발랄한 활동가",d:"에너지와 아이디어가 넘치는 분위기 메이커. 사람과 가능성을 사랑하고, 어제 꽂힌 것과 오늘 꽂힌 게 다릅니다. 진지할 땐 누구보다 깊습니다.",g:["긍정 에너지 전파","공감+창의의 조합","적응력"],b:["금방 싫증","계획성 부족","혼자만의 시간도 필요하면서 못 챙김"],c:["'이것도 저것도'가 아니라 하나를 끝까지","기분이 태도가 되지 않게"],r:{s:"평소보다 더 오버해서 밝다가 훅 다운됨",l:"온 우주가 이 사람을 중심으로 돌기 시작",w:"새 프로젝트 킥오프 때 제일 신나 있는 사람"},like:"즉흥 여행, 리액션 좋은 사람, 자유로운 분위기",m:"INTJ",celeb:null},
ISTJ:{n:"청렴결백한 논리주의자",d:"말보다 기록, 약속하면 지키는 사람. 화려하진 않아도 조직이 굴러가는 건 이런 사람 덕분입니다. 검증된 방식과 명확한 규칙을 신뢰합니다.",g:["신뢰의 아이콘","꼼꼼한 일처리","책임감"],b:["변화에 보수적","감정 표현 인색","융통성 부족"],c:["'원래 하던 방식'이 항상 정답은 아니에요","고생을 알아달라고 말해도 됩니다"],r:{s:"루틴을 더 꽉 잡으며 버팀",l:"기념일을 캘린더에 3주 전 알림으로 설정",w:"마감을 어기는 동료를 이해할 수 없음"},like:"명확한 지시, 예측 가능한 일정, 조용한 성실함을 알아봐주는 것",m:"ESFP",celeb:null},
ISFJ:{n:"용감한 수호자",d:"티 안 나게 모두를 챙기는 사람. 기억력이 좋아 사소한 취향까지 기억하고, 헌신적이지만 그만큼 서운함도 조용히 쌓입니다.",g:["세심한 배려","성실함","실용적인 도움"],b:["자기주장 약함","변화 스트레스","서운함 누적"],c:["부탁을 거절해도 관계는 무너지지 않아요","희생을 당연하게 여기는 사람은 거르기"],r:{s:"싫은 티를 못 내고 속으로 삭임",l:"상대가 지나가듯 말한 것을 기억했다 챙겨줌",w:"사무실 비품이 떨어지기 전에 채워놓는 사람"},like:"안정적인 관계, 고마움 표현, 소소하고 확실한 행복",m:"ESTP",celeb:null},
ESTJ:{n:"엄격한 관리자",d:"일이 되게 만드는 사람. 체계를 세우고 역할을 나누고 결과를 챙깁니다. 원칙에 어긋나는 걸 보면 그냥 못 넘어갑니다.",g:["실행력과 조직력","공정한 기준","현실적 판단"],b:["딱딱하다는 오해","내 방식 고집","감성 커뮤니케이션 약함"],c:["효율보다 사람이 먼저인 순간이 있어요","'맞는 말'도 따뜻하게 하면 더 잘 먹힙니다"],r:{s:"할 일 목록을 만들며 통제감 회복",l:"연인의 문제를 대신 해결해주려 함",w:"주간회의를 실제로 좋아하는 유일한 사람"},like:"계획대로 되는 것, 명확한 역할 분담, 결과로 말하기",m:"ISFP",celeb:null},
ESFJ:{n:"사교적인 외교관",d:"모임의 총무이자 분위기 담당. 사람들 사이의 조화를 중요하게 여기고, 챙김받는 것보다 챙기는 게 익숙합니다. 인정과 감사에 힘이 납니다.",g:["뛰어난 사교성","협동 정신","실질적인 챙김"],b:["평가에 민감","갈등 회피","트렌드·시선 의식"],c:["모두의 기대를 다 맞출 수는 없어요","싫은 소리도 필요할 때가 있습니다"],r:{s:"사람들을 만나 수다로 풀어야 회복됨",l:"기념일·이벤트를 잘 챙기는 로맨티스트",w:"회식 장소 예약과 메뉴 통일을 담당하는 사람"},like:"함께하는 식사, 감사 인사, 화기애애한 모임",m:"ISTP",celeb:null},
ISTP:{n:"만능 재주꾼",d:"말은 없지만 손으로 다 해결하는 사람. 위기 상황에서 제일 침착하고, 관심 없는 일엔 극도로 에너지를 아낍니다. 간섭받는 걸 매우 싫어합니다.",g:["위기 대처 능력","손재주와 도구 감각","쿨한 합리성"],b:["귀차니즘","감정 교류 회피","장기 계획 무관심"],c:["'귀찮아'가 소중한 기회도 거를 수 있어요","가까운 사람에겐 표현이 필요합니다"],r:{s:"말수가 0에 수렴, 혼자 정비하는 시간",l:"말로는 츤츤대도 고장 난 건 다 고쳐줌",w:"일은 빨리 끝내고 조용히 사라지는 스타일"},like:"각자의 시간 존중, 실용적인 선물, 몸으로 하는 취미",m:"ESFJ",celeb:null},
ISFP:{n:"호기심 많은 예술가",d:"겉은 무심해 보여도 감성이 풍부한 사람. 자기만의 미감이 있고, 좋아하는 것과 사람에겐 조용히 진심을 다합니다. 나서는 건 싫지만 무대는 즐깁니다.",g:["미적 감각","겸손하고 따뜻함","현재를 즐길 줄 앎"],b:["계획·정리 약함","갈등 회피","게으름과 여유 사이"],c:["미루다 보면 하고 싶은 것도 놓쳐요","싫은 건 싫다고 말해도 괜찮습니다"],r:{s:"좋아하는 것들 속으로 숨음 (음악·침대·맛집)",l:"손편지나 사진 같은 감성 표현에 강함",w:"조용히 일 잘하다가 갑자기 연차 쓰고 여행 감"},like:"느긋한 하루, 감각적인 공간, 강요하지 않는 사람",m:"ESTJ",celeb:{name:"유재석", note:"'놀면 뭐하니?'에서 본인이 ISFP라고 공개"}},
ESTP:{n:"모험을 즐기는 사업가",d:"지금 이 순간을 사는 사람. 눈치가 빠르고 행동이 먼저 나갑니다. 이론 수업보다 현장 실습, 긴 회의보다 바로 실행이 체질입니다.",g:["순발력과 배짱","현실 감각","분위기 주도"],b:["뒷일 생각 부족","디테일에 약함","지루함을 못 참음"],c:["스릴이 항상 이득은 아니에요 — 큰 결정은 하루 재우기","말이 앞서다 신뢰를 잃지 않게"],r:{s:"몸을 움직이며 풀어버림 (운동·드라이브)",l:"밀당의 고수, 이벤트는 화끈하게",w:"영업·현장에선 에이스, 보고서 작성은 최후의 순간에"},like:"스릴 있는 활동, 화끈한 사람, 즉흥 번개",m:"ISFJ",celeb:null},
ESFP:{n:"자유로운 영혼의 연예인",d:"있는 곳이 무대가 되는 사람. 흥과 정이 많고, 오늘의 행복을 내일로 미루지 않습니다. 진지한 얘기엔 약하지만 힘든 친구 옆엔 제일 먼저 갑니다.",g:["타고난 흥과 유머","친화력","긍정 마인드"],b:["계획·저축 약함","비판에 상처","깊은 고민 회피"],c:["즐거움과 도피는 다릅니다 — 미룬 일은 사라지지 않아요","통장 잔고도 가끔 봐주기"],r:{s:"일단 놀러 나가서 잊으려 함",l:"연인을 세상에서 제일 웃게 해주고 싶어함",w:"점심 메뉴 선정과 사내 분위기 담당"},like:"즉흥 파티, 맛있는 것, 리액션 큰 친구",m:"ISTJ",celeb:null},
};
var AT_DESC={A:{tag:"-A 확신형",txt:"자기 확신이 있고 스트레스에 비교적 담담한 편이에요. 결정을 내리면 잘 돌아보지 않죠. 다만 가끔은 주변의 피드백에 귀 기울이면 더 좋아요."},T:{tag:"-T 민감형",txt:"자기 기준이 높고 발전 욕구가 강한 완벽주의 성향이에요. 그만큼 성장하지만 자기비판이 심해질 수 있으니, 스스로에게 조금 관대해지세요."}};
var idx=0, ans=[];
function show(){
  var q=QS[idx];
  $('pt-qnum').textContent=(idx+1)+' / '+QS.length;
  $('pt-bar').style.width=(idx/QS.length*100)+'%';
  $('pt-q').textContent=q[0];
  var opts=$('pt-opts'); opts.innerHTML='';
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
  $('pt-quiz').style.display='none';
  var score={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0,A:0,Tu:0};
  QS.forEach(function(q,i){
    var axis=q[3], apole=q[4], pick=ans[i];
    var poles={EI:['E','I'],SN:['S','N'],TF:['T','F'],JP:['J','P'],AT:['A','Tu']};
    var pair=poles[axis];
    var other=pair[0]===apole?pair[1]:pair[0];
    // A선택지=apole극, B선택지=반대극
    score[pick===0?apole:(apole==='A'?'Tu':other)] += 1;
    if(apole==='A'&&pick!==0)score['Tu']+=0; // guard
  });
  function pct(a,b){var t=score[a]+score[b];return t?Math.round(score[a]/t*100):50;}
  var code=(score.E>=score.I?'E':'I')+(score.S>=score.N?'S':'N')+(score.T>=score.F?'T':'F')+(score.J>=score.P?'J':'P');
  var ident=score.A>=score.Tu?'A':'T';
  var t=TYPES[code], at=AT_DESC[ident];
  function bar(l1,l2,p){
    return '<div style="margin:8px 0;"><div style="display:flex;justify-content:space-between;font-size:13px;color:#555;"><span>'+l1+' '+p+'%</span><span>'+l2+' '+(100-p)+'%</span></div><div style="height:10px;background:#e5e7eb;border-radius:5px;"><div style="height:10px;width:'+p+'%;background:#059669;border-radius:5px;"></div></div></div>';
  }
  function list(arr){return '<ul style="margin:6px 0 0;padding-left:20px;line-height:1.7;">'+arr.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
  var celebHtml = t.celeb ? '<h3 style="margin:20px 0 6px;font-size:17px;">⭐ 같은 유형 유명인</h3><div style="line-height:1.7;">'+t.celeb.name+' — '+t.celeb.note+'</div><div style="font-size:12px;color:#999;">방송·인터뷰에서 본인이 직접 밝힌 경우만 싣습니다 (계속 추가 중)</div>' : '<div style="font-size:12px;color:#999;margin-top:16px;">⭐ 같은 유형 유명인: 본인이 직접 밝힌 사례를 확인해 추가 중입니다</div>';
  $('pt-result').innerHTML=
   '<div style="text-align:center;padding:22px;border-radius:14px;background:#ecfdf5;">'
   +'<div style="font-size:14px;color:#555;">당신의 유형은</div>'
   +'<div style="font-size:44px;font-weight:800;color:#047857;">'+code+'-'+ident+'</div>'
   +'<div style="font-size:19px;font-weight:700;margin-top:2px;">'+t.n+' <span style="color:#059669;font-size:15px;">'+at.tag+'</span></div>'
   +'</div>'
   +bar('내향 I','외향 E',pct('I','E'))
   +bar('현실 S','직관 N',pct('S','N'))
   +bar('사고 T','감정 F',pct('T','F'))
   +bar('계획 J','즉흥 P',pct('J','P'))
   +bar('확신 A','민감 T',pct('A','Tu'))
   +'<p style="line-height:1.7;margin-top:14px;">'+t.d+'</p>'
   +'<p style="line-height:1.7;font-size:14.5px;color:#555;">'+at.txt+'</p>'
   +'<h3 style="margin:20px 0 6px;font-size:17px;">👍 장점</h3>'+list(t.g)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">👀 단점</h3>'+list(t.b)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">⚠️ 조심할 것</h3>'+list(t.c)
   +'<h3 style="margin:20px 0 6px;font-size:17px;">🎬 이럴 때 이런 리액션</h3>'
   +list(['스트레스 받으면: '+t.r.s,'연애할 때: '+t.r.l,'회사에서: '+t.r.w])
   +'<h3 style="margin:20px 0 6px;font-size:17px;">💚 선호하는 스타일</h3><div style="line-height:1.7;">'+t.like+'</div>'
   +'<h3 style="margin:20px 0 6px;font-size:17px;">💞 잘 맞는 유형</h3><div style="line-height:1.7;"><b>'+t.m+'</b> ('+TYPES[t.m].n+') — 서로의 빈 곳을 채워주는 조합으로 자주 꼽혀요 (재미로 봐주세요!)</div>'
   +celebHtml
   +'<div style="display:flex;gap:10px;margin-top:22px;">'
   +'<button onclick="location.reload()" style="flex:1;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
   +'<button id="pt-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>'
   +'</div>'
   +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14.5px;">🎂 내 생일엔 무슨 일이? → <a href="/tools/my-birthday/">생일 이야기 보기</a> · 🔢 <a href="/tools/age-calculator/">만나이 계산기</a></div>';
  $('pt-result').style.display='block';
  $('pt-share').onclick=function(){
    var txt='나의 성격유형은 '+code+'-'+ident+' '+t.n+'! 너도 해봐 👉 '+location.origin+location.pathname;
    if(navigator.share){navigator.share({text:txt});}
    else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요! 붙여넣기로 공유하세요.');});}
  };
  window.scrollTo({top:document.getElementById('ptest').offsetTop-20,behavior:'smooth'});
}
$('pt-start').onclick=function(){$('pt-intro').style.display='none';$('pt-quiz').style.display='block';show();};
})();
</script>

## 이 테스트에 대하여

- **4+1 지표**: 에너지 방향(E/I), 인식 방식(S/N), 판단 기준(T/F), 생활 양식(J/P)의 4가지 지표에, 16personalities 방식으로 널리 쓰이는 **정체성 축(-A 확신형 / -T 민감형)**을 더해 총 32가지 결과가 나옵니다.
- 본 테스트는 재미와 자기이해를 위한 **자체 제작 24문항**이며, 공식 MBTI® 검사(마이어스-브릭스 재단)와는 무관합니다. 정식 검사는 공인 기관에서 받으실 수 있습니다.
- 유형별 유명인은 **방송·인터뷰에서 본인이 직접 밝힌 경우만** 확인 후 싣습니다.
- 답변과 결과는 브라우저 안에서만 처리되며 어디에도 저장되지 않습니다.
