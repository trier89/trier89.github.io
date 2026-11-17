---
title: "성격 5요인 테스트 (Big Five) — 50문항으로 보는 외향성·친화성·성실성·정서 안정성·개방성 (무료)"
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
    a: "사람의 성격 차이를 외향성·친화성·성실성·정서 안정성(신경성의 반대)·개방성 다섯 가지 축으로 설명하는 틀입니다. 성격 심리학 연구에서 가장 널리 쓰이는 틀이에요."
  - q: "이 테스트 문항은 어디서 왔나요?"
    a: "누구나 자유롭게 쓸 수 있도록 공개된 문항 모음(IPIP)의 성격 5요인 50문항을 우리말로 옮긴 것입니다. 한국어 번역은 자체 번역이라 표준화된 한국판은 아닙니다."
  - q: "점수가 높으면 좋은 건가요?"
    a: "아니에요. 다섯 요인 모두 높고 낮음에 각각 강점과 주의점이 있습니다. 점수는 문항 응답의 합을 0~100으로 바꾼 값이고, 다른 사람들 속 순위(백분위)가 아닙니다."
  - q: "답변이 저장되나요?"
    a: "저장되지 않습니다. 계산은 브라우저 안에서만 이루어지고 서버로 전송되지 않습니다. 공유 링크에는 다섯 요인 점수만 들어갑니다."
---

성격을 "○○형" 한 단어로 나누지 않고, **다섯 가지 축의 높낮이**로 보는 테스트예요. 성격 심리학 연구에서 가장 널리 쓰이는 **성격 5요인(Big Five)** 틀을 따릅니다. 문항은 누구나 쓸 수 있게 공개된 문항 모음(IPIP)의 50문항을 우리말로 옮겼고, 결과는 **5각형 그래프**로 보여드려요. 친구가 보낸 링크로 들어와 테스트하면 **두 사람 그래프를 겹쳐서** 볼 수 있습니다. 재미로 보는 테스트로, 전문 기관의 정식 성격 검사나 진단이 아니에요. 답변은 저장·전송되지 않습니다.

<div id="b5test" style="max-width:620px;margin:0 auto;">
  <div id="b5-intro" style="text-align:center;">
    <div style="margin-bottom:14px;padding:12px 14px;border-radius:10px;background:#f0fdf4;color:#1f2937;font-size:14.5px;line-height:1.6;text-align:left;">💡 <b>잘 보는 법</b> — 정답은 없어요. "되고 싶은 나"가 아니라 <b>평소의 나</b>를 떠올리고, 비슷한 또래의 다른 사람들과 견주어 처음 드는 느낌으로 고르세요.</div>
    <div id="b5-friend" style="display:none;margin-bottom:14px;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구 결과와 비교하는 중이에요 🎁 끝나면 두 사람 그래프가 겹쳐서 나옵니다.</div>
    <button id="b5-start" style="padding:16px 40px;border:0;border-radius:12px;background:#059669;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작하기 (약 6분)</button>
  </div>
  <div id="b5-quiz" style="display:none;">
    <div style="height:8px;background:#e5e7eb;border-radius:4px;margin-bottom:18px;"><div id="b5-bar" style="height:8px;width:0%;background:#059669;border-radius:4px;transition:width .3s;"></div></div>
    <div id="b5-qnum" style="font-size:13px;color:#888;margin-bottom:6px;"></div>
    <div style="font-size:13px;color:#888;">나는…</div>
    <div id="b5-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:60px;"></div>
    <div id="b5-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:8px;"></div>
    <button id="b5-prev" style="margin-top:14px;border:0;background:none;color:#6b7280;font-size:13px;cursor:pointer;text-decoration:underline;">← 이전 문항</button>
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
var OPTS=[['전혀 아니다',0],['아니다',1],['보통이다',2],['그렇다',3],['매우 그렇다',4]];
var BAND={hi:'높음',mid:'보통',lo:'낮음'};
function band(p){return p>=67?'hi':(p<=33?'lo':'mid');}
// 요인별 해설 [한 줄, 강점, 주의, 해볼 것] × 높음/보통/낮음
var TX={
E:{hi:["사람들 속에서 힘이 나고 먼저 다가가는 편","분위기를 만들고 관계를 빨리 넓혀요","혼자 있는 시간이 길어지면 처지고, 말이 앞설 수 있어요","대화에서 질문 하나를 먼저 던지고 끝까지 들어 보기"],mid:["사람도 좋고 혼자도 괜찮은, 상황에 맞추는 편","어울릴 때와 물러날 때를 고를 수 있어요","컨디션에 따라 사교성이 크게 달라 보일 수 있어요","모임 전후로 혼자 쉬는 시간을 미리 잡아 두기"],lo:["조용하고 소수와 깊게 지내는 편","집중력이 좋고 잘 듣는 사람이에요","의견이 있어도 말하지 않아 묻힐 수 있어요","회의나 모임에서 한 번은 먼저 말하기로 정하기"]},
A:{hi:["공감이 빠르고 남을 먼저 챙기는 편","사람들이 편하게 기대고 갈등을 부드럽게 풀어요","거절을 못 해 내 몫이 줄어들 수 있어요","부탁을 받으면 '생각해 보고 답할게'로 하루 벌기"],mid:["챙길 땐 챙기고 선도 지키는 편","배려와 자기주장 사이 균형이 좋아요","가까운 사람에게만 무심해질 수 있어요","고마운 사람 한 명에게 이번 주에 말로 전하기"],lo:["감정보다 사실과 논리를 먼저 보는 편","냉정한 판단이 필요한 자리에서 믿음직해요","직설적인 말이 차갑게 들릴 수 있어요","지적하기 전에 잘된 점 하나를 먼저 말하기"]},
C:{hi:["계획하고 준비하고 끝까지 해내는 편","믿고 맡길 수 있는 꾸준함이 있어요","계획이 틀어지면 스트레스가 크고 쉬는 걸 미뤄요","일정표에 '아무것도 안 하는 시간'도 적어 두기"],mid:["중요한 일엔 꼼꼼하고 나머지는 적당히 넘기는 편","효율과 완성도 사이 균형이 좋아요","바쁠 때 작은 일이 밀려 쌓일 수 있어요","2분 안에 끝나는 일은 바로 하기"],lo:["즉흥적이고 틀에 덜 얽매이는 편","유연하고 변화에 빨리 적응해요","마감과 정리가 늦어 신뢰를 잃을 수 있어요","할 일을 하루 3개만 적고 그것만 끝내기"]},
S:{hi:["웬만한 일에 흔들리지 않고 느긋한 편","위기 때 침착해서 주변에 안정감을 줘요","남의 걱정을 가볍게 여기거나 위험 신호를 늦게 볼 수 있어요","힘들어하는 사람에겐 해결책보다 '그랬구나'를 먼저"],mid:["흔들릴 땐 흔들리지만 대체로 회복하는 편","적당한 긴장이 준비와 집중으로 이어져요","피로가 쌓이면 걱정과 짜증이 늘 수 있어요","기분이 가라앉을 때 나를 올려 주는 것 3가지 적어 두기"],lo:["감정을 크게 느끼고 걱정이 많은 편","위험을 먼저 알아차리고 감정에 민감해요","아직 일어나지 않은 일에 에너지를 많이 써요","걱정을 종이에 쓰고 지금 할 수 있는 것에만 동그라미"]},
O:{hi:["새로운 생각과 상상을 즐기는 편","아이디어가 많고 낯선 것을 빨리 받아들여요","관심이 넓어 하나를 끝까지 파기 어려울 수 있어요","떠오른 아이디어 중 하나만 골라 이번 주에 작게 실행"],mid:["새로운 것과 익숙한 것을 골고루 좋아하는 편","현실 감각과 호기심을 같이 가졌어요","바쁘면 익숙한 방식에만 머물 수 있어요","한 달에 한 번은 안 해 본 것 하나"],lo:["익숙하고 실용적인 것을 좋아하는 편","현실적이고 검증된 방법으로 꾸준히 해요","새로운 방식 앞에서 움직임이 늦을 수 있어요","낯선 제안은 '안 돼' 대신 '작게 한번'으로 받아 보기"]}
};
// 가장 높은 요인으로 붙이는 이름
var TOP={E:["사람 속에서 빛나는 사람","다섯 요인 가운데 외향성이 가장 높아요. 사람들과 부딪치며 힘을 얻는 쪽입니다."],A:["마음을 먼저 읽는 사람","다섯 요인 가운데 친화성이 가장 높아요. 관계와 공감이 중심에 있는 쪽입니다."],C:["끝까지 해내는 사람","다섯 요인 가운데 성실성이 가장 높아요. 계획과 책임이 중심에 있는 쪽입니다."],S:["잔잔한 물 같은 사람","다섯 요인 가운데 정서 안정성이 가장 높아요. 쉽게 흔들리지 않는 쪽입니다."],O:["생각이 멀리 가는 사람","다섯 요인 가운데 개방성이 가장 높아요. 상상과 새로운 생각이 중심에 있는 쪽입니다."]};
var idx=0, ans=[], friend=null;
function show(){
  var it=ITEMS[ORDER[idx]];
  $('b5-qnum').textContent=(idx+1)+' / '+ORDER.length;
  $('b5-bar').style.width=(idx/ORDER.length*100)+'%';
  $('b5-q').textContent=it[0];
  var opts=$('b5-opts'); opts.innerHTML='';
  OPTS.forEach(function(o){
    var b=document.createElement('button');
    b.textContent=o[0];
    var sel=ans[idx]===o[1];
    b.style.cssText='padding:13px 8px;border:2px solid '+(sel?'#059669':'#d1d5db')+';border-radius:10px;background:'+(sel?'#ecfdf5':'#fff')+';color:#1f2937;font-size:15.5px;cursor:pointer;line-height:1.4;';
    b.onclick=function(){ans[idx]=o[1]; idx++; idx<ORDER.length?show():render(score(),false);};
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
function bar(k,p,fp){
  var col=p>=67?'#059669':(p<=33?'#2563eb':'#0d9488');
  return '<div style="margin:9px 0;"><div style="display:flex;justify-content:space-between;font-size:14px;"><span style="font-weight:700;">'+FN[k]+'</span><span style="color:'+col+';font-weight:700;">'+p+'점 · '+BAND[band(p)]+(fp!=null?' <span style="color:#ea580c;">(친구 '+fp+'점)</span>':'')+'</span></div><div style="height:12px;background:#e5e7eb;border-radius:6px;margin-top:3px;position:relative;"><div style="height:12px;width:'+p+'%;background:'+col+';border-radius:6px;"></div>'+(fp!=null?'<div style="position:absolute;left:calc('+fp+'% - 2px);top:-3px;width:4px;height:18px;background:#ea580c;border-radius:2px;"></div>':'')+'</div></div>';
}
function drawChart(P,FP,title){
  var c=$('b5-chart'); if(!c) return; var dpr=window.devicePixelRatio||1;
  var W=560,H=470; c.width=W*dpr; c.height=H*dpr; c.style.width='100%'; c.style.maxWidth=W+'px';
  var x=c.getContext('2d'); x.scale(dpr,dpr);
  x.fillStyle='#fff'; x.fillRect(0,0,W,H);
  var cx=W/2, cy=250, R=160;
  function pt(i,p){var a=-Math.PI/2+i*2*Math.PI/5; return [cx+Math.cos(a)*R*p/100, cy+Math.sin(a)*R*p/100];}
  function poly(vals){x.beginPath(); for(var i=0;i<5;i++){var q=pt(i,vals[i]); i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);} x.closePath();}
  x.strokeStyle='#d1d5db'; x.lineWidth=1;
  [25,50,75,100].forEach(function(v){poly([v,v,v,v,v]); x.stroke();});
  for(var i=0;i<5;i++){var q=pt(i,100); x.beginPath(); x.moveTo(cx,cy); x.lineTo(q[0],q[1]); x.stroke();}
  x.fillStyle='#9ca3af'; x.font='10.5px sans-serif'; x.textAlign='left';
  [50,100].forEach(function(v){x.fillText(v,cx+4,cy-R*v/100+11);});
  if(FP){var fv=FK.map(function(k){return FP[k];}); poly(fv); x.fillStyle='rgba(234,88,12,0.12)'; x.fill(); x.strokeStyle='#ea580c'; x.lineWidth=2.5; x.setLineDash([6,4]); x.stroke(); x.setLineDash([]);}
  var mv=FK.map(function(k){return P[k];}); poly(mv); x.fillStyle='rgba(5,150,105,0.22)'; x.fill(); x.strokeStyle='#059669'; x.lineWidth=3; x.stroke();
  FK.forEach(function(k,i){var q=pt(i,P[k]); x.fillStyle='#059669'; x.beginPath(); x.arc(q[0],q[1],5,0,Math.PI*2); x.fill();
    var l=pt(i,122); x.textAlign='center'; x.fillStyle='#111827'; x.font='bold 13.5px sans-serif'; x.fillText(FN[k],l[0],l[1]-2);
    x.fillStyle='#047857'; x.font='bold 12.5px sans-serif'; x.fillText(P[k]+'점'+(FP?' / '+FP[k]+'점':''),l[0],l[1]+15);});
  x.textAlign='left'; x.fillStyle='#047857'; x.font='bold 13px sans-serif'; x.fillText('성격 5요인 · '+title,16,24);
  if(FP){x.fillStyle='#059669'; x.fillRect(16,36,14,4); x.fillStyle='#374151'; x.font='11.5px sans-serif'; x.fillText('나',34,42); x.fillStyle='#ea580c'; x.fillRect(56,36,14,4); x.fillStyle='#374151'; x.fillText('친구',74,42);}
  x.fillStyle='#9ca3af'; x.font='10.5px sans-serif'; x.textAlign='right'; x.fillText('planfully.ai.kr/tests/big-five',W-12,H-8);
}
function render(r,shared){
  var P={}; FK.forEach(function(k){P[k]=pct(r[k]);});
  var FP=null; if(friend&&!shared){FP={}; FK.forEach(function(k){FP[k]=pct(friend[k]);});}
  var topk=FK[0], lowk=FK[0];
  FK.forEach(function(k){if(P[k]>P[topk])topk=k; if(P[k]<P[lowk])lowk=k;});
  var flat=(P[topk]-P[lowk])<=10;
  var t=flat?["고르게 균형 잡힌 사람","다섯 요인의 점수 차이가 크지 않아요. 어느 한쪽으로 치우치지 않고 상황에 맞춰 움직이는 쪽입니다."]:TOP[topk];
  function h3(s){return '<h3 style="margin:22px 0 6px;font-size:17px;">'+s+'</h3>';}
  var bars=''; FK.forEach(function(k){bars+=bar(k,P[k],FP?FP[k]:null);});
  var axes='<div style="display:flex;flex-direction:column;gap:8px;">';
  FK.forEach(function(k){var d=TX[k][band(P[k])];
    axes+='<details open style="border:1px solid #d1fae5;border-radius:10px;padding:10px 12px;background:#fff;color:#1f2937;"><summary style="cursor:pointer;font-weight:700;color:#1f2937;">'+FN[k]+' <span style="color:#047857;">'+P[k]+'점 · '+BAND[band(P[k])]+'</span> — <span style="font-weight:400;">'+d[0]+'</span></summary><div style="margin-top:8px;line-height:1.7;font-size:14.5px;color:#1f2937;">👍 <b>강점</b> '+d[1]+'<br>👀 <b>주의</b> '+d[2]+'<br>💡 <b>해볼 것</b> '+d[3]+'</div></details>';});
  axes+='</div>';
  var cmp='';
  if(FP){
    var far=FK[0], near=FK[0];
    FK.forEach(function(k){var d=Math.abs(P[k]-FP[k]); if(d>Math.abs(P[far]-FP[far]))far=k; if(d<Math.abs(P[near]-FP[near]))near=k;});
    var sum=0; FK.forEach(function(k){sum+=Math.abs(P[k]-FP[k]);}); var avg=Math.round(sum/5);
    cmp=h3('👥 친구와 비교')+'<div style="padding:12px 14px;border-radius:10px;background:#fff7ed;color:#1f2937;line-height:1.8;font-size:14.5px;">가장 비슷한 요인: <b>'+FN[near]+'</b> (차이 '+Math.abs(P[near]-FP[near])+'점)<br>가장 다른 요인: <b>'+FN[far]+'</b> (나 '+P[far]+'점 · 친구 '+FP[far]+'점)<br>다섯 요인 평균 차이: <b>'+avg+'점</b> — '+(avg<=10?'성격 모양이 많이 닮았어요.':(avg<=22?'닮은 곳과 다른 곳이 섞여 있어요.':'서로 꽤 다른 모양이에요. 다른 만큼 서로 못 보는 걸 봐 줄 수 있어요.'))+'</div>';
  }
  var html=
   '<div style="text-align:center;padding:22px;border-radius:14px;background:#ecfdf5;color:#1f2937;">'
   +'<div style="font-size:14px;color:#555;">'+(shared?'친구의 성격 5요인은':'당신의 성격 5요인은')+'</div>'
   +'<div style="font-size:28px;font-weight:800;color:#047857;margin-top:4px;">'+t[0]+'</div>'
   +'<div style="font-size:12.5px;color:#6b7280;margin-top:8px;">가장 높은 요인: '+FN[topk]+' '+P[topk]+'점 · 가장 낮은 요인: '+FN[lowk]+' '+P[lowk]+'점</div></div>'
   +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🎁 테스트하면 두 사람 그래프를 겹쳐서 볼 수 있어요.</div>':'')
   +'<p style="line-height:1.7;margin-top:14px;">'+t[1]+'</p>'
   +h3('🕸 5각형 그래프')+'<canvas id="b5-chart" style="display:block;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;"></canvas>'+'<div style="text-align:center;margin-top:6px;"><button id="b5-save" style="border:1px solid #059669;background:#fff;color:#047857;border-radius:8px;padding:6px 14px;font-size:13px;cursor:pointer;">그래프 이미지 저장</button></div>'
   +cmp
   +h3('📊 요인별 점수')+'<div style="font-size:12.5px;color:#6b7280;margin-bottom:4px;">점수는 문항 응답의 합을 0~100으로 바꾼 값이에요(67점 이상 높음, 33점 이하 낮음). 다른 사람들 속 순위가 아니며, 높다고 좋고 낮다고 나쁜 게 아닙니다.</div>'+bars
   +h3('🔍 요인별 해설')+axes
   +'<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;">'
   +(shared
      ?'<button id="b5-mine" style="flex:1;min-width:200px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하고 비교하기 →</button>'
      :'<button id="b5-share" style="flex:1;min-width:140px;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 링크 공유</button>'
       +'<button onclick="location.href=location.pathname" style="flex:1;min-width:140px;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>')
   +'</div>'
   +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;color:#1f2937;font-size:14.5px;">🧠 다른 테스트 → <a href="/tests/temperament-character/">기질·성격 유형</a> · <a href="/tests/mind-profile/">다면 성격 프로필</a> · <a href="/tests/personality-test/">16 성격유형</a></div>'
   +'<p style="margin-top:14px;font-size:12.5px;color:#6b7280;line-height:1.6;">※ 재미로 보는 테스트예요. 문항은 공개 문항 모음(IPIP)의 성격 5요인 50문항을 자체 번역한 것으로, 표준화된 한국판이 아니고 규준(다른 사람들과의 비교 기준)도 없습니다. 전문 기관의 정식 성격 검사나 어떤 진단도 아니에요. 답변은 저장·전송되지 않습니다.</p>';
  $('b5-quiz').style.display='none'; $('b5-intro').style.display='none';
  $('b5-result').innerHTML=html; $('b5-result').style.display='block';
  window.scrollTo({top:$('b5test').offsetTop-20,behavior:'smooth'});
  drawChart(P,FP,t[0]);
  $('b5-save').onclick=function(){var c=$('b5-chart');var a=document.createElement('a');a.download='big-five.png';a.href=c.toDataURL('image/png');a.click();};
  if(shared){ $('b5-mine').onclick=function(){location.href=location.pathname+'?f='+enc(r);}; }
  else{
    $('b5-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+enc(r);
      var txt='내 성격 5요인은 「'+t[0]+'」 — 테스트하면 내 그래프와 겹쳐 볼 수 있어요 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(function(){$('b5-share').textContent='링크 복사됨! 붙여넣어 보내세요';});}
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

## 성격 5요인(Big Five)이란?

사람의 성격 차이를 다섯 가지 큰 축으로 설명하는 틀이에요. 여러 언어에서 사람을 묘사하는 낱말들을 모아 통계로 묶어 보니 반복해서 다섯 묶음이 나왔다는 연구에서 출발했고, 지금은 성격 심리학 연구에서 가장 널리 쓰입니다. 영어 머리글자를 따서 OCEAN이라고도 불러요.

| 요인 | 높으면 | 낮으면 |
|---|---|---|
| 외향성 | 사람들 속에서 힘이 나고 먼저 다가감 | 조용하고 소수와 깊게 지냄 |
| 친화성 | 공감이 빠르고 남을 먼저 챙김 | 사실과 논리를 먼저 봄 |
| 성실성 | 계획하고 준비하고 끝까지 해냄 | 즉흥적이고 틀에 덜 얽매임 |
| 정서 안정성 | 쉽게 흔들리지 않고 느긋함 | 감정을 크게 느끼고 걱정이 많음 |
| 개방성 | 새로운 생각과 상상을 즐김 | 익숙하고 실용적인 것을 좋아함 |

정서 안정성은 다른 자료에서 **신경성**이라는 이름으로 거꾸로 표시하기도 해요. 정서 안정성이 낮다는 말과 신경성이 높다는 말은 같은 뜻입니다.

## 유형 테스트와 무엇이 다른가요?

유형 테스트는 사람을 몇 가지 상자 중 하나에 넣습니다. 성격 5요인은 상자 대신 **다섯 개의 눈금**을 써요. 외향성이 55점인 사람과 95점인 사람은 유형 테스트에서 같은 "외향형"이 되지만, 여기서는 다르게 보입니다. 그래서 결과가 한 단어로 떨어지지 않고 5각형 모양으로 나옵니다.

## 친구와 비교하는 법

결과 화면의 **결과 링크 공유**로 링크를 보내면, 친구는 내 5각형을 먼저 보고 **나도 테스트하고 비교하기**를 누를 수 있어요. 친구가 끝까지 답하면 두 사람의 5각형이 한 그래프에 겹쳐 나오고, 가장 비슷한 요인과 가장 다른 요인을 알려 줍니다. 링크에는 다섯 요인 점수만 들어가고 개별 답변은 들어가지 않아요.

## 자주 묻는 질문

**Q. 점수가 높으면 좋은 건가요?**
아니에요. 성실성이 높으면 믿음직하지만 쉬는 걸 미루기 쉽고, 낮으면 마감이 늦어질 수 있지만 변화에 유연합니다. 다섯 요인 모두 높고 낮음에 강점과 주의점이 같이 있어서 결과에서 둘 다 보여드려요.

**Q. 점수는 다른 사람들과 비교한 값인가요?**
아니에요. 요인마다 10문항의 응답을 합쳐 0~100으로 바꾼 값입니다. "상위 몇 %" 같은 순위가 아니니, 내 다섯 요인 사이의 높낮이와 친구와의 차이를 보는 용도로 쓰세요.

**Q. 문항은 어디서 왔나요?**
누구나 자유롭게 쓸 수 있도록 공개된 문항 모음(IPIP, International Personality Item Pool)의 성격 5요인 50문항을 우리말로 옮겼습니다. 번역은 자체 번역이라 표준화 연구를 거친 한국판이 아니에요.

**Q. 답변이 어디에 저장되나요?**
저장되지 않아요. 모든 계산은 지금 보고 있는 브라우저 안에서만 이루어지고 서버로 전송되지 않습니다.
