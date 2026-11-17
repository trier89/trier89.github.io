---
title: "성격 5요인 테스트 (Big Five) 50문항: 외향성·친화성·성실성·정서 안정성·개방성"
description: "심리학에서 가장 널리 쓰이는 성격 5요인(Big Five) 틀로 내 성격을 5각형 그래프로 보는 무료 테스트. 공개 문항(IPIP) 50개, 외향성·친화성·성실성·정서 안정성·개방성 점수와 해설, 친구와 그래프 겹쳐 보기까지. 회원가입 없음."
date: 2026-11-17
slug: "big-five"
aliases: ["/tools/big-five/"]
categories: ["심리테스트"]
tags: ["성격 5요인 테스트", "Big Five 테스트", "빅파이브 성격 테스트", "무료 성격 테스트", "OCEAN 테스트"]
toc: false
readingTime: false
faq:
  - q: "성격 5요인(Big Five)이 뭔가요?"
    a: "사람의 성격 차이를 외향성·친화성·성실성·정서 안정성(신경성의 반대)·개방성 다섯 가지 축으로 설명하는 틀입니다. 성격 심리학 연구에서 가장 널리 쓰입니다."
  - q: "이 테스트 문항은 어디서 왔나요?"
    a: "누구나 자유롭게 쓸 수 있도록 공개된 문항 모음(IPIP)의 성격 5요인 50문항을 우리말로 옮긴 것입니다. 한국어 번역은 자체 번역이라 표준화된 한국판은 아닙니다."
  - q: "점수가 높으면 좋은 건가요?"
    a: "아닙니다. 다섯 요인 모두 높고 낮음에 각각 강점과 주의점이 있습니다. 점수는 문항 응답의 합을 0~100으로 바꾼 값이고, 다른 사람들 속 순위(백분위)가 아닙니다."
  - q: "답변이 저장되나요?"
    a: "저장되지 않습니다. 계산은 브라우저 안에서만 이루어지고 서버로 전송되지 않습니다. 공유 링크에는 다섯 요인 점수만 들어갑니다."
---

성격을 한 가지 유형으로 나누지 않고 **다섯 요인의 높낮이**로 봅니다. 성격 심리학 연구에서 가장 널리 쓰이는 성격 5요인(Big Five) 틀이고, 문항은 공개 문항 모음(IPIP)의 50문항을 우리말로 옮겼습니다. 정식 성격 검사나 진단이 아니며, 답변은 저장·전송되지 않습니다.

<style>
#b5test{max-width:620px;margin:22px auto 0;color:var(--txt);}
#b5test button{font-family:inherit;}
.b5-meta{display:flex;border:1px solid var(--line);border-radius:4px;}
.b5-meta div{flex:1;padding:12px 6px;text-align:center;border-left:1px solid var(--line);}
.b5-meta div:first-child{border-left:0;}
.b5-meta b{display:block;font-size:20px;color:var(--txt);font-weight:700;}
.b5-meta span{font-size:12px;color:var(--dim);}
.b5-note{font-size:13.5px;color:var(--dim);line-height:1.7;margin:14px 0 18px;}
.b5-friend{font-size:13.5px;color:var(--blue);border-left:2px solid var(--blue);padding:2px 0 2px 10px;margin:0 0 16px;}
.b5-btn{display:block;width:100%;padding:15px;border:1px solid var(--coral);border-radius:4px;background:var(--coral);color:#1f1f1d;font-size:16px;font-weight:700;cursor:pointer;}
.b5-btn.ghost{background:none;color:var(--coral-soft);}
.b5-btn.small{display:inline-block;width:auto;padding:7px 14px;font-size:12.5px;font-weight:400;background:none;color:var(--dim);border-color:var(--line);}
.b5-top{display:flex;justify-content:space-between;font-size:12.5px;color:var(--dim);}
.b5-track{height:2px;background:var(--line);margin:8px 0 26px;}
.b5-track i{display:block;height:2px;width:0;background:var(--coral);transition:width .25s;}
.b5-stem{font-size:13px;color:var(--dim);}
.b5-q{font-size:20px;font-weight:700;line-height:1.5;min-height:92px;margin-top:4px;}
.b5-scale{display:flex;border:1px solid var(--line);border-radius:4px;overflow:hidden;}
.b5-scale button{flex:1;padding:14px 2px 12px;border:0;border-left:1px solid var(--line);background:none;color:var(--txt);cursor:pointer;}
.b5-scale button:first-child{border-left:0;}
.b5-scale button b{display:block;font-size:19px;font-weight:700;}
.b5-scale button span{display:block;font-size:11px;color:var(--dim);margin-top:3px;letter-spacing:-.3px;}
.b5-scale button.on{background:var(--coral);color:#1f1f1d;}
.b5-scale button.on span{color:#1f1f1d;}
@media(hover:hover){.b5-scale button:hover{background:var(--panel);}.b5-scale button.on:hover{background:var(--coral);}}
.b5-prev{margin-top:16px;border:0;background:none;color:var(--dim);font-size:12.5px;cursor:pointer;padding:6px 0;}
.b5-label{font-size:12px;color:var(--dim);letter-spacing:.5px;}
.b5-head{font-size:26px;font-weight:700;line-height:1.35;margin:6px 0 10px;}
.b5-lead{font-size:14.5px;line-height:1.75;color:var(--txt);}
.b5-sec{margin-top:30px;padding-top:14px;border-top:1px solid var(--line);}
.b5-sec>.b5-label{margin-bottom:12px;}
#b5-chart{display:block;margin:0 auto;border:1px solid var(--line);border-radius:4px;}
.b5-row{display:flex;align-items:center;gap:10px;padding:9px 0;font-size:14px;}
.b5-row .n{width:84px;flex:none;}
.b5-row .t{flex:1;height:6px;background:var(--line);position:relative;}
.b5-row .t i{position:absolute;left:0;top:0;height:6px;background:var(--coral);}
.b5-row .t u{position:absolute;top:-4px;width:2px;height:14px;background:var(--blue);}
.b5-row .v{width:34px;flex:none;text-align:right;font-weight:700;}
.b5-row .f{width:34px;flex:none;text-align:right;color:var(--blue);}
.b5-fine{font-size:12px;color:var(--dim);line-height:1.7;margin-top:8px;}
.b5-fx{padding:14px 0;border-top:1px solid var(--line);}
.b5-label+.b5-fx{border-top:0;padding-top:0;}
.b5-fx h4{margin:0;font-size:15.5px;color:var(--txt);display:flex;justify-content:space-between;}
.b5-fx h4 span{color:var(--coral-soft);font-weight:400;font-size:13.5px;}
.b5-fx p{margin:6px 0 8px;font-size:14.5px;line-height:1.7;}
.b5-fx dl{margin:0;display:grid;grid-template-columns:60px 1fr;row-gap:4px;font-size:13.5px;line-height:1.65;}
.b5-fx dt{color:var(--dim);}
.b5-fx dd{margin:0;}
.b5-cmp{font-size:14.5px;line-height:1.9;}
.b5-cmp b{color:var(--blue);}
.b5-acts{display:flex;gap:10px;margin-top:30px;}
.b5-acts .b5-btn{flex:1;font-size:15px;padding:13px;}
.b5-more{margin-top:18px;font-size:13.5px;color:var(--dim);}
</style>
<div id="b5test">
  <div id="b5-intro">
    <div class="b5-meta"><div><b>50</b><span>문항</span></div><div><b>6분</b><span>걸리는 시간</span></div><div><b>5</b><span>요인 점수</span></div></div>
    <p class="b5-note">정답은 없습니다. 되고 싶은 모습이 아니라 평소의 모습을 기준으로, 오래 고민하지 말고 고르면 됩니다.</p>
    <p id="b5-friend" class="b5-friend" style="display:none;">친구 결과와 비교하는 중입니다. 끝나면 두 사람의 그래프가 겹쳐 나옵니다.</p>
    <button id="b5-start" class="b5-btn">시작</button>
  </div>
  <div id="b5-quiz" style="display:none;">
    <div class="b5-top"><span id="b5-qnum"></span><span>성격 5요인</span></div>
    <div class="b5-track"><i id="b5-bar"></i></div>
    <div class="b5-stem">나는</div>
    <div id="b5-q" class="b5-q"></div>
    <div id="b5-opts" class="b5-scale"></div>
    <button id="b5-prev" class="b5-prev">이전 문항으로</button>
  </div>
  <div id="b5-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var FK=['E','A','C','S','O'];
var FN={E:'외향성',A:'친화성',C:'성실성',S:'정서 안정성',O:'개방성'};
// 문항: [문장, 요인, 역채점]. 공개 문항 모음(IPIP) 성격 5요인 50문항의 우리말 번역.
var ITEMS=[
["모임에서 분위기를 띄우는 편이다","E",0],
["사람들 사이에 있으면 편안하다","E",0],
["내가 먼저 말을 거는 편이다","E",0],
["모임에서 여러 사람과 두루 이야기한다","E",0],
["관심이 나에게 쏠려도 개의치 않는다","E",0],
["말수가 적은 편이다","E",1],
["눈에 띄지 않게 뒤에 있는 편이다","E",1],
["딱히 할 말이 없을 때가 많다","E",1],
["내게 시선이 쏠리는 것을 좋아하지 않는다","E",1],
["낯선 사람들 앞에서는 조용해진다","E",1],
["사람들에게 관심이 많다","A",0],
["다른 사람의 감정에 공감한다","A",0],
["마음이 여린 편이다","A",0],
["다른 사람을 위해 시간을 낸다","A",0],
["다른 사람의 감정을 함께 느낀다","A",0],
["사람들을 편안하게 해 준다","A",0],
["다른 사람에게 별로 관심이 없다","A",1],
["사람들에게 모욕적인 말을 할 때가 있다","A",1],
["남의 문제에는 관심이 없다","A",1],
["다른 사람을 별로 걱정하지 않는다","A",1],
["항상 준비가 되어 있다","C",0],
["세세한 부분까지 신경 쓴다","C",0],
["해야 할 잡일은 바로 해치운다","C",0],
["정리 정돈된 상태를 좋아한다","C",0],
["계획표대로 움직인다","C",0],
["내 일에 엄격하고 꼼꼼하다","C",0],
["내 물건을 여기저기 늘어놓는다","C",1],
["일을 엉망으로 만들 때가 많다","C",1],
["물건을 제자리에 돌려놓는 것을 자주 잊는다","C",1],
["내가 맡은 일을 피할 때가 있다","C",1],
["대부분의 시간에 마음이 느긋하다","S",0],
["우울한 기분이 드는 일이 드물다","S",0],
["스트레스를 쉽게 받는다","S",1],
["이런저런 일을 걱정한다","S",1],
["쉽게 마음이 흐트러진다","S",1],
["쉽게 속상해한다","S",1],
["기분이 자주 바뀐다","S",1],
["감정 기복이 심하다","S",1],
["쉽게 짜증이 난다","S",1],
["자주 우울한 기분이 든다","S",1],
["아는 어휘가 풍부하다","O",0],
["상상력이 생생하다","O",0],
["뛰어난 아이디어가 있다","O",0],
["무엇이든 빨리 이해한다","O",0],
["어려운 단어를 쓴다","O",0],
["무언가를 곰곰이 생각하며 시간을 보낸다","O",0],
["아이디어가 넘친다","O",0],
["추상적인 개념을 이해하기 어렵다","O",1],
["추상적인 개념에는 관심이 없다","O",1],
["상상력이 풍부하지 않다","O",1]
];
// 출제 순서: 다섯 요인이 번갈아 나오고, 요인 안에서도 문항 방향이 섞이게
var SEQ=[0,5,1,6,2,7,3,8,4,9], ORDER=[];
SEQ.forEach(function(s){for(var f=0;f<5;f++){ORDER.push(f*10+s);}});
var OPTS=['전혀 아니다','아니다','보통','그렇다','매우 그렇다'];
var BAND={hi:'높음',mid:'보통',lo:'낮음'};
function band(p){return p>=67?'hi':(p<=33?'lo':'mid');}
// 요인별 해설 [한 줄, 강점, 주의, 해볼 것] × 높음/보통/낮음
var TX={
E:{hi:["사람들 속에서 힘을 얻고 먼저 다가가는 편입니다.","분위기를 만들고 관계를 빨리 넓힙니다.","혼자 있는 시간이 길면 처지고, 말이 생각보다 앞설 때가 있습니다.","대화에서 질문을 먼저 던지고 끝까지 듣기."],mid:["사람과 있는 것도, 혼자 있는 것도 괜찮은 편입니다.","어울릴 때와 물러날 때를 고를 수 있습니다.","컨디션에 따라 사교성이 크게 달라 보일 수 있습니다.","모임 앞뒤로 혼자 쉬는 시간을 미리 잡아 두기."],lo:["조용하고, 적은 사람과 깊게 지내는 편입니다.","집중력이 좋고 남의 말을 잘 듣습니다.","의견이 있어도 말하지 않아 묻힐 수 있습니다.","회의나 모임에서 한 번은 먼저 말하기."]},
A:{hi:["공감이 빠르고 남을 먼저 챙기는 편입니다.","사람들이 편하게 기대고, 갈등을 부드럽게 풉니다.","거절을 못 해 자기 몫이 줄어들 수 있습니다.","부탁을 받으면 바로 답하지 않고 하루 두기."],mid:["챙길 때는 챙기고 선도 지키는 편입니다.","배려와 자기주장 사이에서 균형을 잡습니다.","가까운 사람에게 오히려 무심해질 수 있습니다.","고마운 사람 한 명에게 이번 주 안에 말로 전하기."],lo:["감정보다 사실과 논리를 먼저 보는 편입니다.","냉정한 판단이 필요한 자리에서 믿을 만합니다.","직설적인 말이 차갑게 들릴 수 있습니다.","지적하기 전에 잘된 점 하나를 먼저 말하기."]},
C:{hi:["계획하고 준비해서 끝까지 해내는 편입니다.","맡기면 끝내는 꾸준함이 있습니다.","계획이 틀어지면 스트레스가 크고, 쉬는 것을 미룹니다.","일정표에 쉬는 시간도 일정으로 적기."],mid:["중요한 일은 꼼꼼히, 나머지는 적당히 넘기는 편입니다.","효율과 완성도 사이에서 균형을 잡습니다.","바쁠 때 작은 일이 밀려 쌓일 수 있습니다.","2분 안에 끝나는 일은 바로 하기."],lo:["즉흥적이고 틀에 덜 얽매이는 편입니다.","유연하고 변화에 빨리 적응합니다.","마감과 정리가 늦어 신뢰를 잃을 수 있습니다.","하루 할 일을 3개만 적고 그것만 끝내기."]},
S:{hi:["웬만한 일에 흔들리지 않고 느긋한 편입니다.","위기에서 침착하고 주변을 안정시킵니다.","남의 걱정을 가볍게 넘기거나 위험 신호를 늦게 볼 수 있습니다.","힘들어하는 사람에게는 해결책보다 듣기를 먼저."],mid:["흔들릴 때는 흔들리지만 대체로 회복하는 편입니다.","적당한 긴장이 준비와 집중으로 이어집니다.","피로가 쌓이면 걱정과 짜증이 늘 수 있습니다.","기분이 가라앉을 때 도움이 되는 것 3가지 적어 두기."],lo:["감정을 크게 느끼고 걱정이 많은 편입니다.","위험을 먼저 알아차리고 감정 변화에 민감합니다.","아직 일어나지 않은 일에 힘을 많이 씁니다.","걱정을 종이에 적고, 지금 할 수 있는 것만 표시하기."]},
O:{hi:["새로운 생각과 상상을 즐기는 편입니다.","아이디어가 많고 낯선 것을 빨리 받아들입니다.","관심이 넓어 하나를 끝까지 파기 어려울 수 있습니다.","떠오른 것 중 하나만 골라 이번 주에 작게 해 보기."],mid:["새로운 것과 익숙한 것을 고루 좋아하는 편입니다.","현실 감각과 호기심을 함께 갖고 있습니다.","바쁘면 익숙한 방식에만 머물 수 있습니다.","한 달에 한 번은 안 해 본 것 하나."],lo:["익숙하고 실용적인 것을 좋아하는 편입니다.","현실적이고, 검증된 방법으로 꾸준히 합니다.","새로운 방식 앞에서 움직임이 늦을 수 있습니다.","낯선 제안을 바로 거절하지 않고 작게 한 번 해 보기."]}
};
var idx=0, ans=[], friend=null;
function show(){
  var it=ITEMS[ORDER[idx]];
  $('b5-qnum').textContent=(idx<9?'0':'')+(idx+1)+' / '+ORDER.length;
  $('b5-bar').style.width=(idx/ORDER.length*100)+'%';
  $('b5-q').textContent=it[0];
  var opts=$('b5-opts'); opts.innerHTML='';
  OPTS.forEach(function(o,v){
    var b=document.createElement('button');
    b.innerHTML='<b>'+(v+1)+'</b><span>'+o+'</span>';
    if(ans[idx]===v) b.className='on';
    b.onclick=function(){ans[idx]=v; idx++; idx<ORDER.length?show():render(score(),false);};
    opts.appendChild(b);
  });
  $('b5-prev').style.visibility=idx>0?'visible':'hidden';
}
function score(){
  var raw={}; FK.forEach(function(k){raw[k]=0;});
  ORDER.forEach(function(q,i){var it=ITEMS[q], v=ans[i]; if(v==null) v=2; raw[it[1]]+=it[2]?4-v:v;});
  return raw;
}
function hx(n){return (n<16?'0':'')+n.toString(16);}
function enc(r){return FK.map(function(k){return hx(r[k]);}).join('');}
function dec(s){if(!/^[0-9a-f]{10}$/.test(s))return null;var r={};for(var i=0;i<5;i++){var v=parseInt(s.substr(i*2,2),16);if(v>40)return null;r[FK[i]]=v;}return r;}
function pct(n){return Math.round(n/40*100);}
function row(k,p,fp){
  return '<div class="b5-row"><span class="n">'+FN[k]+'</span><span class="t"><i style="width:'+p+'%"></i>'+(fp!=null?'<u style="left:calc('+fp+'% - 1px)"></u>':'')+'</span><span class="v">'+p+'</span>'+(fp!=null?'<span class="f">'+fp+'</span>':'')+'</div>';
}
function drawChart(P,FP){
  var c=$('b5-chart'); if(!c) return; var dpr=window.devicePixelRatio||1;
  var W=560,H=440; c.width=W*dpr; c.height=H*dpr; c.style.width='100%'; c.style.maxWidth=W+'px';
  var x=c.getContext('2d'); x.scale(dpr,dpr);
  var FONT='"Apple SD Gothic Neo","Malgun Gothic",sans-serif';
  x.fillStyle='#1f1f1d'; x.fillRect(0,0,W,H);
  var cx=W/2, cy=228, R=150;
  function pt(i,p){var a=-Math.PI/2+i*2*Math.PI/5; return [cx+Math.cos(a)*R*p/100, cy+Math.sin(a)*R*p/100];}
  function poly(vals){x.beginPath(); for(var i=0;i<5;i++){var q=pt(i,vals[i]); i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);} x.closePath();}
  x.strokeStyle='#3e3e3a'; x.lineWidth=1;
  [25,50,75,100].forEach(function(v){poly([v,v,v,v,v]); x.stroke();});
  for(var i=0;i<5;i++){var q=pt(i,100); x.beginPath(); x.moveTo(cx,cy); x.lineTo(q[0],q[1]); x.stroke();}
  x.fillStyle='#6f6d68'; x.font='10px '+FONT; x.textAlign='left';
  [50,100].forEach(function(v){x.fillText(v,cx+4,cy-R*v/100+11);});
  if(FP){var fv=FK.map(function(k){return FP[k];}); poly(fv); x.fillStyle='rgba(126,166,224,0.10)'; x.fill(); x.strokeStyle='#7ea6e0'; x.lineWidth=1.5; x.stroke();}
  var mv=FK.map(function(k){return P[k];}); poly(mv); x.fillStyle='rgba(217,119,87,0.18)'; x.fill(); x.strokeStyle='#d97757'; x.lineWidth=2; x.stroke();
  FK.forEach(function(k,i){var q=pt(i,P[k]); x.fillStyle='#d97757'; x.beginPath(); x.arc(q[0],q[1],3.5,0,Math.PI*2); x.fill();
    var l=pt(i,124); x.textAlign='center'; x.fillStyle='#e8e6e3'; x.font='13px '+FONT; x.fillText(FN[k],l[0],l[1]-2);
    x.font='bold 13px '+FONT; x.fillStyle='#e89b7f';
    if(FP){var a=String(P[k]), b=' / '+FP[k], wa=x.measureText(a).width, wb=x.measureText(b).width, sx=l[0]-(wa+wb)/2; x.textAlign='left'; x.fillText(a,sx,l[1]+15); x.fillStyle='#7ea6e0'; x.fillText(b,sx+wa,l[1]+15);}
    else{x.fillText(P[k],l[0],l[1]+15);}});
  x.textAlign='left'; x.font='11px '+FONT;
  if(FP){x.fillStyle='#d97757'; x.fillRect(14,18,12,2); x.fillStyle='#9c9a94'; x.fillText('나',31,23); x.fillStyle='#7ea6e0'; x.fillRect(50,18,12,2); x.fillStyle='#9c9a94'; x.fillText('친구',67,23);}
  x.fillStyle='#6f6d68'; x.font='10px '+FONT; x.textAlign='right'; x.fillText('planfully.ai.kr/tests/big-five',W-12,H-10);
}
function render(r,shared){
  var P={}; FK.forEach(function(k){P[k]=pct(r[k]);});
  var FP=null; if(friend&&!shared){FP={}; FK.forEach(function(k){FP[k]=pct(friend[k]);});}
  var topk=FK[0], lowk=FK[0];
  FK.forEach(function(k){if(P[k]>P[topk])topk=k; if(P[k]<P[lowk])lowk=k;});
  var flat=(P[topk]-P[lowk])<=10;
  var head=flat?'다섯 요인이 고른 편':FN[topk]+'이 가장 높고, '+FN[lowk]+'이 가장 낮음';
  var lead=flat?'다섯 요인의 점수 차이가 10점 안쪽입니다. 한쪽으로 치우치지 않은 모양입니다.':TX[topk][band(P[topk])][0]+' '+TX[lowk][band(P[lowk])][0];
  var rows=''; FK.forEach(function(k){rows+=row(k,P[k],FP?FP[k]:null);});
  var fx=''; FK.forEach(function(k){var d=TX[k][band(P[k])];
    fx+='<div class="b5-fx"><h4>'+FN[k]+'<span>'+P[k]+' · '+BAND[band(P[k])]+'</span></h4><p>'+d[0]+'</p><dl><dt>강점</dt><dd>'+d[1]+'</dd><dt>주의</dt><dd>'+d[2]+'</dd><dt>해볼 것</dt><dd>'+d[3]+'</dd></dl></div>';});
  var cmp='';
  if(FP){
    var far=FK[0], near=FK[0];
    FK.forEach(function(k){var d=Math.abs(P[k]-FP[k]); if(d>Math.abs(P[far]-FP[far]))far=k; if(d<Math.abs(P[near]-FP[near]))near=k;});
    var sum=0; FK.forEach(function(k){sum+=Math.abs(P[k]-FP[k]);}); var avg=Math.round(sum/5);
    cmp='<div class="b5-sec"><div class="b5-label">친구와 비교</div><div class="b5-cmp">가장 비슷한 요인은 '+FN[near]+' (차이 '+Math.abs(P[near]-FP[near])+'점)<br>가장 다른 요인은 '+FN[far]+' (나 '+P[far]+', 친구 <b>'+FP[far]+'</b>)<br>다섯 요인 평균 차이 '+avg+'점. '+(avg<=10?'모양이 많이 닮았습니다.':(avg<=22?'닮은 곳과 다른 곳이 섞여 있습니다.':'서로 꽤 다른 모양입니다.'))+'</div></div>';
  }
  var html=
   '<div class="b5-label">'+(shared?'친구의 결과':'결과')+'</div>'
   +'<div class="b5-head">'+head+'</div>'
   +'<p class="b5-lead">'+lead+'</p>'
   +(shared?'<p class="b5-friend">친구가 공유한 결과입니다. 테스트를 마치면 두 사람의 그래프를 겹쳐 볼 수 있습니다.</p>':'')
   +'<div class="b5-sec"><canvas id="b5-chart"></canvas><div style="text-align:right;margin-top:8px;"><button id="b5-save" class="b5-btn small">이미지로 저장</button></div></div>'
   +cmp
   +'<div class="b5-sec"><div class="b5-label">요인별 점수 (0~100)'+(FP?' · 파란 표시는 친구':'')+'</div>'+rows+'<p class="b5-fine">문항 응답의 합을 0~100으로 바꾼 값입니다. 67 이상은 높음, 33 이하는 낮음으로 표시합니다. 다른 사람들 속 순위가 아닙니다.</p></div>'
   +'<div class="b5-sec"><div class="b5-label">요인별 해설</div>'+fx+'</div>'
   +'<div class="b5-acts">'
   +(shared
      ?'<button id="b5-mine" class="b5-btn">나도 하고 비교하기</button>'
      :'<button id="b5-share" class="b5-btn">결과 링크 공유</button><button id="b5-again" class="b5-btn ghost">다시 하기</button>')
   +'</div>'
   +'<p class="b5-more">다른 테스트: <a href="/tests/temperament-character/">기질·성격 유형</a> · <a href="/tests/mind-profile/">다면 성격 프로필</a> · <a href="/tests/personality-test/">16 성격유형</a></p>'
   +'<p class="b5-fine">문항은 공개 문항 모음(IPIP)의 성격 5요인 50문항을 자체 번역한 것으로, 표준화된 한국판이 아니고 규준도 없습니다. 정식 성격 검사나 진단이 아닙니다. 답변은 저장·전송되지 않습니다.</p>';
  $('b5-quiz').style.display='none'; $('b5-intro').style.display='none';
  $('b5-result').innerHTML=html; $('b5-result').style.display='block';
  window.scrollTo(0,Math.max(0,$('b5test').getBoundingClientRect().top+window.pageYOffset-16));
  drawChart(P,FP);
  $('b5-save').onclick=function(){var c=$('b5-chart');var a=document.createElement('a');a.download='big-five.png';a.href=c.toDataURL('image/png');a.click();};
  if(shared){ $('b5-mine').onclick=function(){location.href=location.pathname+'?f='+enc(r);}; }
  else{
    $('b5-again').onclick=function(){location.href=location.pathname;};
    $('b5-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+enc(r);
      var txt='내 성격 5요인: '+head+'. 테스트하면 그래프를 겹쳐 볼 수 있음 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(function(){$('b5-share').textContent='링크를 복사했습니다';});}
    };
  }
}
$('b5-start').onclick=function(){$('b5-intro').style.display='none';$('b5-quiz').style.display='block';show();};
$('b5-prev').onclick=function(){if(idx>0){idx--;show();}};
(function(){
  var m=location.search.match(/[?&]r=([0-9a-f]{10})/);
  if(m){var r=dec(m[1]); if(r){render(r,true);return;}}
  var f=location.search.match(/[?&]f=([0-9a-f]{10})/);
  if(f){friend=dec(f[1]); if(friend) $('b5-friend').style.display='block';}
})();
})();
</script>

## 성격 5요인(Big Five)이란

사람의 성격 차이를 다섯 가지 큰 축으로 설명하는 틀입니다. 여러 언어에서 사람을 묘사하는 낱말을 모아 통계로 묶었더니 반복해서 다섯 묶음이 나왔다는 연구에서 출발했고, 지금은 성격 심리학 연구에서 가장 널리 쓰입니다. 영어 머리글자를 따서 OCEAN이라고도 부릅니다.

| 요인 | 높으면 | 낮으면 |
|---|---|---|
| 외향성 | 사람들 속에서 힘을 얻고 먼저 다가감 | 조용하고 적은 사람과 깊게 지냄 |
| 친화성 | 공감이 빠르고 남을 먼저 챙김 | 사실과 논리를 먼저 봄 |
| 성실성 | 계획하고 준비해서 끝까지 해냄 | 즉흥적이고 틀에 덜 얽매임 |
| 정서 안정성 | 쉽게 흔들리지 않고 느긋함 | 감정을 크게 느끼고 걱정이 많음 |
| 개방성 | 새로운 생각과 상상을 즐김 | 익숙하고 실용적인 것을 좋아함 |

정서 안정성은 다른 자료에서 **신경성**이라는 이름으로 거꾸로 표시하기도 합니다. 정서 안정성이 낮다는 말과 신경성이 높다는 말은 같은 뜻입니다.

## 유형 테스트와 다른 점

유형 테스트는 사람을 몇 가지 유형 중 하나로 분류합니다. 성격 5요인은 분류하지 않고 다섯 개의 눈금으로 잽니다. 외향성이 55점인 사람과 95점인 사람은 유형 테스트에서 같은 외향형이 되지만, 여기서는 다르게 나옵니다. 그래서 결과가 한 단어가 아니라 5각형 모양입니다.

## 친구와 비교하는 법

결과 화면에서 **결과 링크 공유**로 링크를 보냅니다. 친구는 내 5각형을 먼저 보고 **나도 하고 비교하기**를 누릅니다. 친구가 끝까지 답하면 두 사람의 5각형이 한 그래프에 겹쳐 나오고, 가장 비슷한 요인과 가장 다른 요인이 표시됩니다. 링크에는 다섯 요인 점수만 들어가고 개별 답변은 들어가지 않습니다.

## 자주 묻는 질문

**점수가 높으면 좋은 건가요?**
아닙니다. 성실성이 높으면 맡은 일을 끝내지만 쉬는 것을 미루기 쉽고, 낮으면 마감이 늦어질 수 있지만 변화에 유연합니다. 다섯 요인 모두 높고 낮음에 강점과 주의점이 함께 있습니다.

**점수는 다른 사람들과 비교한 값인가요?**
아닙니다. 요인마다 10문항의 응답을 합쳐 0~100으로 바꾼 값입니다. 상위 몇 퍼센트 같은 순위가 아니므로, 내 다섯 요인 사이의 높낮이와 친구와의 차이를 보는 데 쓰면 됩니다.

**문항은 어디서 왔나요?**
누구나 자유롭게 쓸 수 있도록 공개된 문항 모음(IPIP, International Personality Item Pool)의 성격 5요인 50문항을 우리말로 옮겼습니다. 자체 번역이라 표준화 연구를 거친 한국판은 아닙니다.

**답변이 어디에 저장되나요?**
저장되지 않습니다. 모든 계산은 지금 보고 있는 브라우저 안에서만 이루어지고 서버로 전송되지 않습니다.
