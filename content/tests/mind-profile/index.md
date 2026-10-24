---
title: "다면 성격 프로필 테스트 — 48문항으로 보는 마음의 8가지 축 + 솔직성 지표 (무료)"
description: "기분 흔들림·걱정과 긴장·몸의 신호·사람 경계·에너지·규칙과 거리·혼자가 편함·완벽과 통제, 8가지 축의 높낮이를 막대 그래프로 보는 다면 성격 프로필. 답변을 좋게 꾸몄는지 보는 솔직성 지표와 응답 일관성 체크까지. 48문항, 무료, 회원가입 없음."
date: 2026-10-24
slug: "mind-profile"
aliases: ["/tools/mind-profile/"]
categories: ["심리테스트"]
tags: ["다면 성격 테스트", "성격 프로필", "심리 프로필 테스트", "무료 심리테스트", "마음 상태 테스트"]
toc: false
readingTime: false
---

한 가지 유형으로 딱 잘라 말하는 대신, 마음을 **8가지 축**으로 나눠 각각 얼마나 높은지 **막대 그래프 프로필**로 보여주는 테스트예요. 기분 흔들림·걱정과 긴장·몸의 신호·사람 경계·에너지와 추진·규칙과 거리·혼자가 편함·완벽과 통제, 여기에 답을 좋게 꾸미지 않았는지 보는 **솔직성 지표**와 **응답 일관성** 체크가 붙습니다. 재미로 보는 **자체 제작 테스트**로, 병원·상담실에서 쓰는 정식 다면 인성 검사(MMPI 등)가 아니며 어떤 진단도 아니에요. 답변은 저장·전송되지 않습니다.

<div id="mptest" style="max-width:620px;margin:0 auto;">
  <div id="mp-intro" style="text-align:center;">
    <div style="margin-bottom:14px;padding:12px 14px;border-radius:10px;background:#f0fdf4;color:#1f2937;font-size:14.5px;line-height:1.6;text-align:left;">💡 <b>잘 보는 법</b> — 정답은 없어요. "남들이 보는 나"가 아니라 <b>요즘 몇 주 동안의 나</b>를 떠올리며, 너무 오래 고민하지 말고 처음 드는 느낌으로 고르세요. 좋게 보이려고 고르면 솔직성 지표에 잡힙니다 😉</div>
    <button id="mp-start" style="padding:16px 40px;border:0;border-radius:12px;background:#059669;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작하기 (약 6분)</button>
  </div>
  <div id="mp-quiz" style="display:none;">
    <div style="height:8px;background:#e5e7eb;border-radius:4px;margin-bottom:18px;"><div id="mp-bar" style="height:8px;width:0%;background:#059669;border-radius:4px;transition:width .3s;"></div></div>
    <div id="mp-qnum" style="font-size:13px;color:#888;margin-bottom:6px;"></div>
    <div id="mp-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:60px;"></div>
    <div id="mp-opts" style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div>
    <button id="mp-prev" style="margin-top:14px;border:0;background:none;color:#6b7280;font-size:13px;cursor:pointer;text-decoration:underline;">← 이전 문항</button>
  </div>
  <div id="mp-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var AXK=['MD','AX','SO','TR','EN','RB','SI','PF'];
var AXN={MD:'기분 흔들림',AX:'걱정과 긴장',SO:'몸의 신호',TR:'사람 경계',EN:'에너지와 추진',RB:'규칙과 거리',SI:'혼자가 편함',PF:'완벽과 통제'};
// 문항: [문장, 축, 역채점(1이면 '그렇다'일수록 낮게)]. L=솔직성, C1/C2=일관성 쌍.
var ITEMS=[
["요즘 특별한 이유 없이 마음이 가라앉을 때가 많다","MD",0],
["예전에 재미있던 일이 요즘은 시들하다","MD",0],
["아침에 일어나면 하루가 기대된다","MD",1],
["나 자신이 별로 쓸모없게 느껴질 때가 있다","MD",0],
["웬만한 일에는 금방 기분이 회복된다","MD",1],
["아직 일어나지 않은 일을 미리 걱정하느라 지친다","AX",0],
["중요한 일을 앞두면 잠을 설친다","AX",0],
["사소한 실수도 머릿속에서 계속 되감긴다","AX",0],
["긴장되는 상황에서도 비교적 침착한 편이다","AX",1],
["마음이 조마조마해서 가만히 있기 힘들 때가 있다","AX",0],
["스트레스를 받으면 두통이나 소화불량이 먼저 온다","SO",0],
["몸이 조금만 이상해도 큰 병은 아닌지 신경 쓰인다","SO",0],
["피곤한데 이유를 모르겠는 날이 많다","SO",0],
["내 몸 상태는 대체로 든든하다고 느낀다","SO",1],
["어깨나 목이 굳어 있는 걸 자주 느낀다","SO",0],
["사람들이 겉으로는 친절해도 속마음은 다를 거라 생각한다","TR",0],
["누가 나에 대해 수군거리는 것 같을 때가 있다","TR",0],
["처음 만난 사람도 대체로 믿는 편이다","TR",1],
["호의를 받으면 뭘 바라는 건지 먼저 생각하게 된다","TR",0],
["한번 상처 준 사람은 쉽게 용서가 안 된다","TR",0],
["아이디어가 한꺼번에 쏟아져 따라가기 벅찰 때가 있다","EN",0],
["잠을 조금만 자도 하루 종일 쌩쌩한 날이 있다","EN",0],
["한번 신나면 말이 빨라지고 계획이 커진다","EN",0],
["새 일을 벌이는 것보다 하던 일을 유지하는 게 편하다","EN",1],
["한꺼번에 여러 일을 벌여놓는 편이다","EN",0],
["규칙은 상황에 따라 어겨도 된다고 생각한다","RB",0],
["하고 싶은 게 생기면 결과를 따지기 전에 먼저 한다","RB",0],
["지루한 걸 참는 게 제일 힘들다","RB",0],
["정해진 절차를 따르는 게 마음 편하다","RB",1],
["남들이 말리는 일일수록 더 해보고 싶다","RB",0],
["모임이 끝나면 혼자 있는 시간으로 충전해야 한다","SI",0],
["여러 사람 앞에서 말하는 건 되도록 피한다","SI",0],
["낯선 사람과도 금방 말을 트는 편이다","SI",1],
["주말엔 약속 없이 집에 있는 게 가장 좋다","SI",0],
["내 이야기를 꺼내기까지 시간이 오래 걸린다","SI",0],
["물건이 제자리에 없으면 신경이 쓰여 일이 안 된다","PF",0],
["다 끝낸 일도 한 번 더 확인해야 마음이 놓인다","PF",0],
["계획이 틀어지면 하루가 망가진 기분이 든다","PF",0],
["대충 넘어가는 것도 필요하다고 생각한다","PF",1],
["내 기준에 못 미치면 남이 괜찮다고 해도 불편하다","PF",0],
["나는 지금까지 거짓말을 한 번도 한 적이 없다","L",0],
["나는 모든 사람을 똑같이 좋아한다","L",0],
["화가 나도 짜증을 낸 적이 한 번도 없다","L",0],
["약속 시간에 늦은 적이 한 번도 없다","L",0],
["작은 일에도 쉽게 지치는 편이다","C1",0],
["작은 일로는 잘 지치지 않는 편이다","C1",1],
["사람들과 있을 때 에너지가 생긴다","C2",0],
["사람들과 있으면 에너지가 빠진다","C2",1]
];
// 같은 축이 연달아 나오지 않게 섞은 출제 순서
var ORDER=[0,5,10,15,20,25,30,35,40,44,1,6,11,16,21,26,31,36,41,46,2,7,12,17,22,27,32,37,42,3,8,13,18,23,28,33,38,45,4,9,14,19,24,29,34,39,43,47];
var OPTS=[['전혀 아니다',0],['아니다',1],['그렇다',2],['매우 그렇다',3]];
var BAND={hi:'높음',mid:'보통',lo:'낮음'};
function band(p){return p>=67?'hi':(p<=33?'lo':'mid');}
// 축별 해설 [한 줄, 강점, 주의, 한 가지 해볼 것] × 높음/보통/낮음
var AX={
MD:{hi:["요즘 마음이 자주 가라앉고 재미가 시들한 편","감정에 솔직하고 깊이 느끼는 사람이에요","의욕 저하를 '내 탓'으로 돌리기 쉬워요","햇빛 보며 10분 걷기처럼 작고 확실한 행동 하나를 매일. 2주 넘게 이어지면 전문가와 이야기해 보세요"],mid:["기분이 오르내리지만 대체로 회복되는 편","가라앉아도 스스로 올라오는 힘이 있어요","피곤이 쌓이면 가라앉는 날이 길어질 수 있어요","기분이 떨어질 때 나를 올려주는 것 3가지를 적어 두기"],lo:["기분이 비교적 안정적이고 하루가 기대되는 편","정서적 바닥이 단단해 주변에 안정감을 줘요","가라앉은 사람의 마음을 '왜 저래?'로 보기 쉬워요","힘든 사람 옆에선 해결책보다 '그랬구나'가 먼저"]},
AX:{hi:["걱정이 앞서고 긴장이 몸에 남는 편","준비성이 뛰어나고 위험을 먼저 봐요","아직 안 일어난 일에 에너지를 다 써버려요","걱정을 종이에 쓰고 '내가 지금 할 수 있는 것'에만 동그라미"],mid:["긴장할 땐 하지만 대체로 다룰 수 있는 편","적당한 긴장이 집중력이 돼요","큰 일 앞에선 잠이 흔들릴 수 있어요","중요한 날 전날은 준비를 '끝'내고 일부러 쉬기"],lo:["웬만해선 조마조마하지 않는 편","침착해서 위기 때 믿음직해요","남들의 불안을 과소평가하거나 준비가 느슨해질 수 있어요","중요한 일은 체크리스트 한 장으로 보완"]},
SO:{hi:["스트레스가 몸의 증상으로 먼저 나타나는 편","몸의 신호를 잘 알아차리는 섬세함이 있어요","마음의 피로를 몸 탓으로만 돌릴 수 있어요","증상이 나타난 날의 '마음 상태'를 같이 기록해 보기"],mid:["가끔 몸으로 반응하지만 대체로 괜찮은 편","몸과 마음의 연결을 느낄 줄 알아요","바쁠 때 몸 신호를 무시하기 쉬워요","어깨가 올라가 있으면 한 번 내려놓는 습관"],lo:["몸 상태가 든든하고 통증에 둔감한 편","체력이 받쳐 줘서 추진력이 좋아요","아픈 걸 늦게 알아차릴 수 있어요","정기 검진은 느낌과 상관없이 날짜로"]},
TR:{hi:["사람을 쉽게 믿지 않고 의도를 먼저 살피는 편","눈치가 빠르고 속지 않아요","호의까지 의심하다 가까운 사람이 지칠 수 있어요","'증거 없는 의심'은 하루 보류해 보기"],mid:["믿되 확인하는, 균형 잡힌 편","신뢰와 경계의 균형이 좋아요","한번 데이면 경계가 오래 갈 수 있어요","용서는 상대보다 나를 위한 것"],lo:["사람을 잘 믿고 호의를 그대로 받는 편","관계를 빨리 만들고 따뜻한 분위기를 만들어요","이용당해도 늦게 알아차릴 수 있어요","돈·중요한 결정은 하루 자고 나서"]},
EN:{hi:["아이디어와 추진력이 넘치고 쉽게 들뜨는 편","시작하는 힘이 크고 주변을 끌고 가요","벌여놓은 일이 많아 마무리가 안 되고 잠이 줄 수 있어요","새 일을 시작하기 전 '지금 진행 중인 것'부터 세어 보기"],mid:["필요할 때 시동이 걸리고 평소엔 안정적인 편","속도 조절이 되는 지속 가능한 에너지예요","가끔 과하게 벌일 수 있어요","큰 계획은 일주일 뒤에 다시 보고 결정"],lo:["차분하고 하던 일을 유지하는 게 편한 편","꾸준함과 안정감이 강점이에요","새 기회 앞에서 움직임이 늦을 수 있어요","한 달에 하나는 '안 해본 것'을 작게"]},
RB:{hi:["규칙보다 하고 싶은 것이 먼저인 자유형","틀에 얽매이지 않는 추진력과 독창성이 있어요","충동적 결정의 뒷수습이 따라와요","'하고 싶다'와 '한다' 사이에 24시간 두기"],mid:["규칙은 지키되 융통성도 있는 편","원칙과 유연함의 균형이 좋아요","지루하면 딴 길로 새기 쉬워요","지루한 일은 시간을 잘게 쪼개 게임처럼"],lo:["정해진 절차가 편하고 규칙을 잘 지키는 편","신뢰받는 성실함이 강점이에요","규칙이 없는 상황에서 멈춰 설 수 있어요","가끔은 '정답 없는 일'을 일부러 해보기"]},
SI:{hi:["혼자 있는 시간으로 충전하는 조용한 내향형","깊이 있는 관계와 집중력이 강점이에요","필요한 도움도 혼자 끌어안을 수 있어요","한 사람에게 한 가지 부탁을 해보기"],mid:["사람도 혼자도 다 괜찮은 편","상황에 따라 에너지를 쓸 줄 알아요","모임이 길어지면 소진될 수 있어요","모임 뒤 '혼자 시간'을 미리 잡아 두기"],lo:["사람과 있을 때 힘이 나는 외향형","친화력과 발표력이 강점이에요","혼자 있는 시간을 못 견뎌 쉬지 못할 수 있어요","일주일에 한 번은 약속 없는 저녁"]},
PF:{hi:["기준이 높고 확인을 거듭해야 마음이 놓이는 편","완성도와 꼼꼼함이 남달라요","계획이 틀어지면 하루가 흔들리고 피로가 쌓여요","'80%면 넘긴다' 규칙을 작은 일부터"],mid:["꼼꼼하지만 적당히 넘길 줄도 아는 편","완성도와 효율의 균형이 좋아요","중요한 일에선 확인이 늘어날 수 있어요","확인은 두 번까지로 정하기"],lo:["대충 넘어갈 줄 알고 틀어져도 괜찮은 편","유연하고 스트레스가 적어요","실수나 누락이 늦게 발견될 수 있어요","중요한 건 체크리스트로 보완"]}
};
// 가장 높은 축으로 프로필 이름
var TOP={MD:["구름 낀 날의 마음","요즘 마음의 날씨가 흐린 편이에요. 흐린 날이 길어지면 햇빛이 필요합니다."],AX:["미리 걱정하는 마음","일어나지 않은 일까지 미리 준비하는 마음. 그 에너지의 절반만 지금 할 일에 써도 충분해요."],SO:["몸으로 말하는 마음","마음이 힘들면 몸이 먼저 신호를 보내는 타입. 몸의 소리를 마음의 번역기로 쓰면 됩니다."],TR:["경계를 세운 마음","쉽게 속지 않는 눈을 가졌어요. 다만 울타리가 높으면 좋은 사람도 못 들어옵니다."],EN:["달리는 엔진","아이디어와 추진력이 넘치는 사람. 브레이크만 같이 챙기면 멀리 가요."],RB:["울타리 밖 마음","규칙보다 마음이 먼저인 자유로운 사람. 뒷수습 비용만 계산하면 그 자유는 재능이에요."],SI:["조용한 방의 마음","혼자 있는 시간에서 힘을 얻는 사람. 세상이 시끄러울수록 당신의 조용함이 귀해집니다."],PF:["자로 잰 마음","기준이 높고 꼼꼼한 사람. 자가 너무 정확하면 나를 재는 데도 쓰이니 가끔은 눈대중으로."],NONE:["잔잔한 호수","어느 축도 크게 튀지 않는 안정 프로필이에요. 지금의 균형을 만든 습관이 무엇인지 알아 두면, 흔들릴 때 돌아올 길이 됩니다."]};
var idx=0, ans=[];
function show(){
  var it=ITEMS[ORDER[idx]];
  $('mp-qnum').textContent=(idx+1)+' / '+ORDER.length;
  $('mp-bar').style.width=(idx/ORDER.length*100)+'%';
  $('mp-q').textContent=it[0];
  var opts=$('mp-opts'); opts.innerHTML='';
  OPTS.forEach(function(o){
    var b=document.createElement('button');
    b.textContent=o[0];
    var sel=ans[idx]===o[1];
    b.style.cssText='padding:14px 8px;border:2px solid '+(sel?'#059669':'#d1d5db')+';border-radius:10px;background:'+(sel?'#ecfdf5':'#fff')+';font-size:15.5px;cursor:pointer;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#059669';};
    b.onmouseout=function(){b.style.borderColor=sel?'#059669':'#d1d5db';};
    b.onclick=function(){ans[idx]=o[1]; idx++; idx<ORDER.length?show():result();};
    opts.appendChild(b);
  });
  $('mp-prev').style.visibility=idx>0?'visible':'hidden';
}
function score(){
  var raw={},L=0,C=0;
  AXK.forEach(function(k){raw[k]=0;});
  var pair={};
  ORDER.forEach(function(q,i){
    var it=ITEMS[q], v=ans[i]; if(v==null) v=0;
    var s=it[2]?3-v:v;
    if(AXK.indexOf(it[1])>=0) raw[it[1]]+=s;
    else if(it[1]==='L') L+=v;
    else { pair[it[1]]=(pair[it[1]]||0)+s; }
  });
  // 일관성: 쌍의 (정+역) 합이 3이면 완전 일관, 0 또는 6이면 모순
  C=Math.abs((pair.C1||0)-3)+Math.abs((pair.C2||0)-3);
  return {raw:raw,L:L,C:C};
}
function enc(r){return AXK.map(function(k){return r.raw[k].toString(16);}).join('')+r.L.toString(16)+r.C.toString(16);}
function dec(s){if(!/^[0-9a-f]{10}$/.test(s))return null;var r={raw:{},L:parseInt(s[8],16),C:parseInt(s[9],16)};AXK.forEach(function(k,i){r.raw[k]=Math.min(15,parseInt(s[i],16));});return r;}
function pct(n){return Math.round(n/15*100);}
function bar(k,p){
  var col=p>=67?'#dc2626':(p<=33?'#2563eb':'#059669');
  return '<div style="margin:9px 0;"><div style="display:flex;justify-content:space-between;font-size:14px;"><span style="font-weight:700;">'+AXN[k]+'</span><span style="color:'+col+';font-weight:700;">'+p+'% · '+BAND[band(p)]+'</span></div><div style="height:12px;background:#e5e7eb;border-radius:6px;margin-top:3px;position:relative;"><div style="height:12px;width:'+p+'%;background:'+col+';border-radius:6px;"></div><div style="position:absolute;left:33%;top:0;width:1px;height:12px;background:#9ca3af;"></div><div style="position:absolute;left:67%;top:0;width:1px;height:12px;background:#9ca3af;"></div></div></div>';
}
function drawChart(P,title){
  var c=$('mp-chart'); if(!c) return; var dpr=window.devicePixelRatio||1;
  var W=640,H=360; c.width=W*dpr; c.height=H*dpr; c.style.width='100%'; c.style.maxWidth=W+'px';
  var x=c.getContext('2d'); x.scale(dpr,dpr);
  x.fillStyle='#fff'; x.fillRect(0,0,W,H);
  var L=44,R=16,T=36,B=64, pw=W-L-R, ph=H-T-B;
  function Y(p){return T+ph-(p/100)*ph;}
  x.fillStyle='#fee2e2'; x.fillRect(L,Y(100),pw,Y(67)-Y(100));
  x.fillStyle='#f0fdf4'; x.fillRect(L,Y(67),pw,Y(33)-Y(67));
  x.fillStyle='#eff6ff'; x.fillRect(L,Y(33),pw,Y(0)-Y(33));
  x.strokeStyle='#d1d5db'; x.lineWidth=1; x.font='11px sans-serif'; x.fillStyle='#6b7280'; x.textAlign='right';
  [0,33,50,67,100].forEach(function(v){x.beginPath();x.moveTo(L,Y(v));x.lineTo(L+pw,Y(v));x.stroke();x.fillText(v+'%',L-6,Y(v)+4);});
  x.textAlign='left'; x.fillStyle='#b91c1c'; x.fillText('높음',L+4,Y(100)+12); x.fillStyle='#047857'; x.fillText('보통',L+4,Y(67)+12); x.fillStyle='#1d4ed8'; x.fillText('낮음',L+4,Y(33)+12);
  var n=AXK.length, step=pw/n;
  x.strokeStyle='#059669'; x.lineWidth=3; x.beginPath();
  AXK.forEach(function(k,i){var px=L+step*(i+0.5), py=Y(P[k]); i?x.lineTo(px,py):x.moveTo(px,py);}); x.stroke();
  AXK.forEach(function(k,i){var px=L+step*(i+0.5), py=Y(P[k]), p=P[k];
    x.fillStyle=p>=67?'#dc2626':(p<=33?'#2563eb':'#059669'); x.beginPath(); x.arc(px,py,6,0,Math.PI*2); x.fill();
    x.fillStyle='#fff'; x.beginPath(); x.arc(px,py,2.5,0,Math.PI*2); x.fill();
    x.fillStyle='#111827'; x.font='bold 12px sans-serif'; x.textAlign='center'; x.fillText(p+'%',px,py-11);
    x.fillStyle='#374151'; x.font='11.5px sans-serif'; var nm=AXN[k].split(' '); x.fillText(nm[0],px,T+ph+16); if(nm[1]) x.fillText(nm.slice(1).join(' '),px,T+ph+30);
  });
  x.fillStyle='#047857'; x.font='bold 13px sans-serif'; x.textAlign='left'; x.fillText('마음 프로필 · '+title,L,T-14);
  x.fillStyle='#9ca3af'; x.font='10.5px sans-serif'; x.textAlign='right'; x.fillText('planfully.ai.kr/tests/mind-profile',L+pw,H-6);
}
function render(r,shared){
  var P={}; AXK.forEach(function(k){P[k]=pct(r.raw[k]);});
  var topk='NONE',topv=49;
  AXK.forEach(function(k){if(P[k]>topv){topv=P[k];topk=k;}});
  var t=TOP[topk];
  var hiList=AXK.filter(function(k){return P[k]>=67;}).map(function(k){return AXN[k];});
  var loList=AXK.filter(function(k){return P[k]<=33;}).map(function(k){return AXN[k];});
  function h3(s){return '<h3 style="margin:22px 0 6px;font-size:17px;">'+s+'</h3>';}
  var bars=''; AXK.forEach(function(k){bars+=bar(k,P[k]);});
  var axes='<div style="display:flex;flex-direction:column;gap:8px;">';
  AXK.forEach(function(k){var d=AX[k][band(P[k])];
    axes+='<details style="border:1px solid #d1fae5;border-radius:10px;padding:10px 12px;background:#fff;color:#1f2937;"><summary style="cursor:pointer;font-weight:700;color:#1f2937;">'+AXN[k]+' <span style="color:#047857;">'+P[k]+'% · '+BAND[band(P[k])]+'</span> — <span style="font-weight:400;">'+d[0]+'</span></summary><div style="margin-top:8px;line-height:1.7;font-size:14.5px;color:#1f2937;">👍 <b>강점</b> '+d[1]+'<br>👀 <b>주의</b> '+d[2]+'<br>💡 <b>해볼 것</b> '+d[3]+'</div></details>';});
  axes+='</div>';
  var Lmsg,Lcol;
  if(r.L>=9){Lmsg='<b>좋게 보이려는 경향이 높아요.</b> "한 번도 ~한 적 없다"에 많이 동의했어요. 실제보다 프로필이 평온하게 나왔을 수 있으니, 다시 할 땐 조금 더 솔직하게 😊';Lcol='#fef3c7';}
  else if(r.L>=5){Lmsg='<b>약간 좋게 보이려는 경향</b>이 있어요. 흔한 수준이라 결과는 참고할 만해요.';Lcol='#fef9c3';}
  else{Lmsg='<b>솔직하게 답했어요.</b> 인간적인 약점을 인정하는 답이 많아, 프로필을 믿고 봐도 됩니다.';Lcol='#ecfdf5';}
  var Cmsg=r.C>=4?'<b>응답 일관성이 낮아요.</b> 같은 뜻의 문항에 반대로 답한 곳이 있어요. 급하게 눌렀거나 집중이 흐트러졌다면 다시 해보세요.':(r.C>=2?'응답 일관성 <b>보통</b>. 비슷한 문항에서 조금 흔들렸지만 결과는 볼 만해요.':'응답 일관성 <b>좋음</b>. 같은 뜻의 문항에 같은 방향으로 답했어요.');
  var html=
   '<div style="text-align:center;padding:22px;border-radius:14px;background:#ecfdf5;color:#1f2937;">'
   +'<div style="font-size:14px;color:#555;">'+(shared?'친구의 마음 프로필은':'당신의 마음 프로필은')+'</div>'
   +'<div style="font-size:30px;font-weight:800;color:#047857;margin-top:4px;">'+t[0]+'</div>'
   +'<div style="font-size:12.5px;color:#6b7280;margin-top:8px;">'+(topk==='NONE'?'모든 축 보통 이하':'가장 높은 축: '+AXN[topk]+' '+topv+'%')+'</div></div>'
   +(shared?'<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🎁 당신의 프로필도 궁금하죠?</div>':'')
   +'<p style="line-height:1.7;margin-top:14px;">'+t[1]+'</p>'
   +h3('📈 프로필 그래프')+'<canvas id="mp-chart" style="display:block;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;"></canvas>'+'<div style="text-align:center;margin-top:6px;"><button id="mp-save" style="border:1px solid #059669;background:#fff;color:#047857;border-radius:8px;padding:6px 14px;font-size:13px;cursor:pointer;">그래프 이미지 저장</button></div>'+h3('📊 축별 막대')+'<div style="font-size:12.5px;color:#6b7280;margin-bottom:4px;">빨강=높음(67% 이상), 초록=보통, 파랑=낮음(33% 이하). 높다고 나쁘고 낮다고 좋은 게 아니라, 각각 강점과 주의점이 있어요.</div>'+bars
   +(hiList.length?'<div style="margin-top:8px;padding:10px 12px;border-radius:10px;background:#fef2f2;color:#1f2937;font-size:14.5px;">🔴 <b>두드러진 축</b>: '+hiList.join(' · ')+'</div>':'')
   +(loList.length?'<div style="margin-top:6px;padding:10px 12px;border-radius:10px;background:#eff6ff;color:#1f2937;font-size:14.5px;">🔵 <b>잔잔한 축</b>: '+loList.join(' · ')+'</div>':'')
   +h3('🔍 축별 자세한 해설')+axes
   +h3('🧪 답변 신뢰도')+'<div style="padding:12px 14px;border-radius:10px;background:'+Lcol+';color:#1f2937;line-height:1.7;font-size:14.5px;">솔직성 지표 '+r.L+'/12 — '+Lmsg+'</div>'
   +'<div style="margin-top:8px;padding:12px 14px;border-radius:10px;background:#f3f4f6;color:#1f2937;line-height:1.7;font-size:14.5px;">일관성 체크 — '+Cmsg+'</div>'
   +'<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;">'
   +(shared
      ?'<button id="mp-mine" style="flex:1;min-width:200px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button id="mp-share" style="flex:1;min-width:140px;padding:13px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 링크 공유</button>'
       +'<button onclick="location.href=location.pathname" style="flex:1;min-width:140px;padding:13px;border:2px solid #059669;border-radius:10px;background:#fff;color:#047857;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>')
   +'</div>'
   +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;color:#1f2937;font-size:14.5px;">🧠 다른 테스트 → <a href="/tests/temperament-character/">기질·성격 유형</a> · <a href="/tests/cognitive-profile/">인지능력 프로필</a> · <a href="/tests/eq-test/">공감능력(EQ)</a></div>'
   +'<p style="margin-top:14px;font-size:12.5px;color:#6b7280;line-height:1.6;">※ 재미로 보는 자체 제작 테스트예요. 병원·상담실에서 쓰는 정식 다면 인성 검사(MMPI 등)와는 문항·척도·해석이 전혀 다르며, 어떤 심리·정신건강 진단도 아닙니다. 기분 흔들림이나 걱정이 2주 넘게 일상을 방해한다면 전문가와 상담하세요. 답변은 저장·전송되지 않습니다.</p>';
  $('mp-quiz').style.display='none'; $('mp-intro').style.display='none';
  $('mp-result').innerHTML=html; $('mp-result').style.display='block';
  window.scrollTo({top:$('mptest').offsetTop-20,behavior:'smooth'});
  drawChart(P,t[0]);
  $('mp-save').onclick=function(){var c=$('mp-chart');var a=document.createElement('a');a.download='mind-profile.png';a.href=c.toDataURL('image/png');a.click();};
  if(shared){ $('mp-mine').onclick=function(){location.href=location.pathname;}; }
  else{
    $('mp-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+enc(r);
      var txt='내 마음 프로필은 「'+t[0]+'」 — 8축 다면 성격 프로필 테스트 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(function(){$('mp-share').textContent='링크 복사됨! 붙여넣어 보내세요';});}
    };
  }
}
function result(){ render(score(),false); }
$('mp-start').onclick=function(){$('mp-intro').style.display='none';$('mp-quiz').style.display='block';show();};
$('mp-prev').onclick=function(){if(idx>0){idx--;show();}};
(function(){
  var m=location.search.match(/[?&]r=([0-9a-f]{10})/);
  if(m){var r=dec(m[1]); if(r) render(r,true);}
})();
})();
</script>

## 8가지 축은 무엇을 보나요?

이 테스트는 "당신은 ○○형"이라고 한 단어로 정리하지 않습니다. 사람의 마음은 한 축이 아니라 **여러 축이 동시에** 움직이기 때문이에요. 같은 "내향적인 사람"이라도 걱정이 많은 내향과 느긋한 내향은 전혀 다르게 삽니다. 그래서 8가지 축을 따로 재고, 그 **높낮이의 모양(프로필)** 을 봅니다.

| 축 | 높으면 | 낮으면 |
|---|---|---|
| 기분 흔들림 | 요즘 가라앉고 재미가 시들함 | 기분이 안정적이고 회복이 빠름 |
| 걱정과 긴장 | 미리 걱정하고 긴장이 몸에 남음 | 침착하고 조마조마하지 않음 |
| 몸의 신호 | 스트레스가 두통·소화불량으로 먼저 옴 | 몸이 든든하고 통증에 둔감 |
| 사람 경계 | 의도를 먼저 살피고 쉽게 믿지 않음 | 사람을 잘 믿고 호의를 그대로 받음 |
| 에너지와 추진 | 아이디어가 넘치고 쉽게 들뜸 | 차분하고 유지하는 게 편함 |
| 규칙과 거리 | 하고 싶은 게 규칙보다 먼저 | 절차가 편하고 규칙을 잘 지킴 |
| 혼자가 편함 | 혼자 있는 시간으로 충전 | 사람과 있을 때 힘이 남 |
| 완벽과 통제 | 기준이 높고 확인을 거듭함 | 대충 넘길 줄 알고 유연함 |

## 솔직성 지표와 일관성 체크는 왜 있나요?

성격 테스트의 가장 큰 적은 "좋게 보이고 싶은 마음"이에요. 그래서 전문 인성 검사들은 답변 태도를 재는 **타당도 척도**를 따로 둡니다. 이 테스트도 같은 아이디어를 가볍게 빌렸습니다.

- **솔직성 지표** — "거짓말을 한 번도 한 적 없다", "모든 사람을 똑같이 좋아한다"처럼, 사실이기 어려운 문장에 얼마나 동의했는지 봅니다. 많이 동의할수록 다른 답도 실제보다 좋게 꾸몄을 가능성이 있어요.
- **일관성 체크** — 같은 뜻을 반대로 쓴 문항 쌍에 서로 모순되게 답했는지 봅니다. 급하게 눌렀거나 집중이 흐트러졌을 때 잡힙니다.

## 자주 묻는 질문

**Q. 높음이 나쁜 건가요?**
아니에요. 걱정과 긴장이 높은 사람은 준비성이 뛰어나고, 완벽과 통제가 높은 사람은 완성도가 남다릅니다. 축마다 강점과 주의점이 같이 있어서, 결과에서 둘 다 보여드려요.

**Q. 결과가 매번 조금씩 달라요.**
"요즘 몇 주"를 기준으로 답하기 때문에 상황에 따라 달라지는 게 정상이에요. 특히 기분 흔들림·걱정과 긴장·몸의 신호는 컨디션을 많이 탑니다. 한 달 뒤에 다시 해서 모양이 어떻게 바뀌는지 보는 것도 재미있어요.

**Q. 정식 검사(MMPI 등)와 같은 건가요?**
전혀 다릅니다. 정식 다면 인성 검사는 수백 문항과 전문가의 해석이 필요한 임상 도구이고, 이 테스트는 그 "여러 축을 동시에 본다"는 아이디어만 참고해 **문항·척도·해석을 모두 새로 만든** 재미용 테스트예요. 진단이 아니니 결과로 자신이나 남을 규정하지 마세요.

**Q. 답변이 어디에 저장되나요?**
저장되지 않아요. 모든 계산은 지금 보고 있는 브라우저 안에서만 이루어지고, 서버로 전송되지 않습니다. 공유 링크에는 8축 점수와 신뢰도 숫자만 들어갑니다.
