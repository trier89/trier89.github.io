---
title: "로또 번호 생성기 — 확률 기반 추천 5게임"
description: "역대 당첨번호를 분석해 확률 가중(최근+역대 블렌드)으로 이번 주 5게임을 추천해요. 로또는 무작위 추첨이라 당첨을 보장하지 않는 재미·참고용 도구."
date: 2026-07-29
slug: "lotto"
categories: ["도구"]
tags: ["로또 번호 생성기", "로또 번호 추천", "로또 통계", "로또 당첨번호", "로또 확률"]
toc: false
readingTime: false
---

<div class="pf-tool" id="lt-tool"><div id="lt-loading" style="text-align:center;padding:40px 0;color:#999;">불러오는 중…</div><div id="lt-body" style="display:none;"><div id="lt-reco"></div><div class="lt-honest">🎲 로또는 완전한 <b>무작위 추첨</b>이에요. 이 추천은 <b>재미·참고용</b>이며 <b>당첨을 보장하지 않아요.</b></div><section class="lt-sec"><h3 class="lt-sec-h">🔢 꼭 넣을 번호 <span>(선택 · 최대 6개)</span></h3><div id="lt-fix"></div></section><section class="lt-sec"><h3 class="lt-sec-h">⚙️ 생성 설정</h3><div id="lt-set"></div></section><section class="lt-sec"><h3 class="lt-sec-h">📋 요약 실적 <span>(과거 백테스트)</span></h3><div id="lt-summary" class="lt-summary"></div></section><section class="lt-sec"><h3 class="lt-sec-h">📊 번호 통계 <span>(역대 누적)</span></h3><div id="lt-stats"></div></section></div></div>

<style>
#lt-tool{max-width:560px;}
#lt-tool h3.lt-h{color:#111;font-size:16px;font-weight:800;margin:2px 0 14px;text-align:center;}
.lt-balls{display:flex;gap:7px;flex-wrap:wrap;align-items:center;}
.lt-ball{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.18);flex:0 0 auto;}
.lt-ball.sm{width:26px;height:26px;font-size:11.5px;box-shadow:0 1px 2px rgba(0,0,0,.15);}
.lt-ball.c1{background:#fbc400;color:#5c4700;}
.lt-ball.c2{background:#69c8f2;color:#08405c;}
.lt-ball.c3{background:#ff7272;}
.lt-ball.c4{background:#8b95a1;}
.lt-ball.c5{background:#b0d840;color:#3a4d0a;}
.lt-game{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 4px;border-bottom:1px solid #f1f1f1;}
.lt-game:last-child{border-bottom:none;}
.lt-game .idx{font-weight:800;color:#d97706;width:22px;flex:0 0 auto;font-size:16px;}
.lt-game .tag{font-size:11px;color:#aaa;margin-left:auto;white-space:nowrap;}
#lt-reco{background:#fffaf5;border:1px solid #ffe2cc;border-radius:14px;padding:20px 16px 14px;}
.lt-sec{margin-top:22px;padding-top:16px;border-top:1px solid #eee;}
.lt-sec-h{margin:0 0 12px;font-size:13.5px;font-weight:800;color:#333;}
.lt-sec-h span{font-weight:400;font-size:11.5px;color:#aaa;}
.lt-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12.5px;color:#555;margin:6px 0;}
.lt-ctrl select{padding:5px 8px;border:1px solid #ddd;border-radius:8px;font:inherit;font-size:12.5px;}
.lt-fix-help{font-size:12px;color:#888;margin-bottom:9px;line-height:1.5;}
.lt-fix-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:5px;max-width:420px;}
@media(max-width:480px){.lt-fix-grid{grid-template-columns:repeat(7,1fr);}}
.lt-fc{border:1px solid #e2e2e2;background:#fff;border-radius:8px;padding:7px 0;font:inherit;font-size:12.5px;font-weight:700;color:#666;cursor:pointer;text-align:center;}
.lt-fc:hover{border-color:#d97706;}
.lt-fc.on{color:#fff;border-color:transparent;box-shadow:0 1px 3px rgba(0,0,0,.2);}
.lt-fc.on.c1{background:#fbc400;color:#5c4700;}.lt-fc.on.c2{background:#69c8f2;color:#08405c;}.lt-fc.on.c3{background:#ff7272;color:#fff;}.lt-fc.on.c4{background:#8b95a1;color:#fff;}.lt-fc.on.c5{background:#b0d840;color:#3a4d0a;}
.lt-fix-sel{margin-top:11px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#555;}
.lt-fix-clear{background:#f3f4f6;border:1px solid #e5e7eb;border-radius:8px;padding:5px 11px;font:inherit;font-size:12px;cursor:pointer;color:#555;}
.lt-fix-note6{margin-top:9px;font-size:11.5px;color:#b45309;background:#fff7ed;border-radius:8px;padding:8px 11px;}
.lt-ctrl input[type=range]{flex:1;min-width:120px;accent-color:#d97706;}
.lt-ctrl select{padding:5px 8px;border:1px solid #ddd;border-radius:8px;font:inherit;font-size:12.5px;}
.lt-set-note{font-size:11.5px;color:#999;margin-top:8px;line-height:1.6;}
.lt-honest{margin-top:14px;font-size:12px;line-height:1.6;color:#8a6d00;background:#fff8e6;border-radius:10px;padding:11px 13px;text-align:center;}
.lt-honest b{color:#8a6d00;}
.lt-summary{margin-top:12px;font-size:12.5px;color:#555;}
.lt-summary .lt-sum-head{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-weight:700;color:#444;}
.lt-summary select{padding:3px 6px;border:1px solid #ddd;border-radius:7px;font:inherit;font-size:12px;}
.lt-summary .lt-sum-body{margin-top:7px;display:flex;flex-wrap:wrap;gap:6px;}
.lt-summary .lt-sum-body span{background:#f4f6f8;border-radius:20px;padding:3px 10px;font-size:12px;color:#42505c;}
.lt-summary .lt-sum-body span.hit{background:#eef6ee;color:#4b7a52;font-weight:600;}
.lt-summary .lt-sum-body span.hit4{background:#fef3c7;color:#92400e;font-weight:800;border:1px solid #fcd34d;}
.lt-summary .lt-sum-note{margin-top:6px;font-size:11px;color:#aaa;line-height:1.5;}
.lt-auto-btn{margin-top:10px;background:#fff;border:1px solid #d97706;color:#b45309;border-radius:9px;padding:8px 14px;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;}
.lt-auto-btn:hover{background:#fff7ed;}
.lt-auto-btn:disabled{opacity:.6;cursor:default;}
.lt-auto-msg{margin-top:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:10px 12px;font-size:12px;color:#166534;line-height:1.55;}
.lt-auto-msg b{color:#15803d;}
.lt-auto-warn{margin-top:5px;font-size:11px;color:#92600a;line-height:1.5;}
.lt-auto-warn b{color:#92600a;}
.lt-auto-warn-strong{margin-top:7px;font-size:11.5px;color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:7px 10px;line-height:1.55;}
.lt-auto-warn-strong b{color:#b91c1c;}
.lt-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:520px){.lt-stat-grid{grid-template-columns:1fr;}}
.lt-stat-box{background:#fff;border:1px solid #eee;border-radius:10px;padding:12px;}
.lt-stat-box h4{margin:0 0 8px;font-size:12.5px;color:#333;font-weight:800;}
.lt-bar{height:9px;border-radius:5px;background:#e5e7eb;overflow:hidden;margin:3px 0;}
.lt-bar>i{display:block;height:100%;border-radius:5px;background:#d97706;}
.lt-kv{display:flex;justify-content:space-between;font-size:12px;color:#555;padding:2px 0;}
.lt-chip{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;background:#f1f5f9;border-radius:20px;padding:3px 9px;margin:2px 3px 2px 0;color:#334155;}
</style>
<script>
(function(){
"use strict";
/* ===== 결정론적 확률가중 추천 (순수 JS) ===== */
function mulberry32(seed){var a=seed>>>0;return function(){a|=0;a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return ((t^(t>>>14))>>>0)/4294967296;};}
function counts(rounds){var c=new Array(46).fill(0);for(var i=0;i<rounds.length;i++){var ns=rounds[i].nums;for(var k=0;k<ns.length;k++)c[ns[k]]++;}return c;}
function normalize(c){var s=0,out=new Array(46).fill(0),i;for(i=1;i<=45;i++)s+=c[i];if(s===0){for(i=1;i<=45;i++)out[i]=1/45;return out;}for(i=1;i<=45;i++)out[i]=c[i]/s;return out;}
/* 회차 누적빈도표: CUM[r][n] = 1..r회에서 번호 n 출현수. buildWeights를 O(45)로 만들어 큰 N/전체도 가볍게. */
var CUM=null;
function buildCum(){var latest=H[H.length-1].round,byR={};H.forEach(function(r){byR[r.round]=r;});CUM=new Array(latest+1);CUM[0]=new Array(46).fill(0);for(var r=1;r<=latest;r++){var c=CUM[r-1].slice(),row=byR[r];if(row)row.nums.forEach(function(n){c[n]++;});CUM[r]=c;}}
function buildWeights(history,R,N,alpha){var prevLen=R-1;if(prevLen<=0){var u=new Array(46).fill(0);for(var j=1;j<=45;j++)u[j]=1/45;return u;}var pc=CUM[prevLen],recentStart=(N&&N<prevLen)?(prevLen-N):0,rb=CUM[recentStart];var allC=new Array(46).fill(0),recC=new Array(46).fill(0),i;for(i=1;i<=45;i++){allC[i]=pc[i];recC[i]=pc[i]-rb[i];}var allN=normalize(allC),recN=normalize(recC);var w=new Array(46).fill(0),sum=0,k;for(k=1;k<=45;k++){w[k]=alpha*recN[k]+(1-alpha)*allN[k];sum+=w[k];}for(k=1;k<=45;k++)w[k]/=sum;return w;}
function drawGame(weights,rng,K,fixed){var pool=[],w=[],i;for(i=1;i<=45;i++){pool.push(i);w.push(weights[i]);}var pick=[];
/* 1) 고정번호 먼저 포함(풀에서 제거) */
(fixed||[]).forEach(function(f){var ix=pool.indexOf(f);if(ix>=0){pick.push(f);pool.splice(ix,1);w.splice(ix,1);}});
/* 2) 남은 슬롯 중 K개까지 확률기반, 나머지 랜덤 */
var remaining=6-pick.length,probCount=Math.min(K,remaining);
for(var d=0;d<probCount&&pick.length<6;d++){var tot=0,j;for(j=0;j<w.length;j++)tot+=w[j];var r=rng()*tot,acc=0,sel=0;for(j=0;j<w.length;j++){acc+=w[j];if(r<=acc){sel=j;break;}}pick.push(pool[sel]);pool.splice(sel,1);w.splice(sel,1);}
while(pick.length<6&&pool.length>0){var idx=Math.floor(rng()*pool.length);pick.push(pool[idx]);pool.splice(idx,1);w.splice(idx,1);}return pick.sort(function(a,b){return a-b;});}
function oddCount(g){var n=0;for(var i=0;i<g.length;i++)if(g[i]%2===1)n++;return n;}
function sumOf(g){var s=0;for(var i=0;i<g.length;i++)s+=g[i];return s;}
function maxRun(g){var mx=1,run=1;for(var i=1;i<g.length;i++){if(g[i]===g[i-1]+1){run++;if(run>mx)mx=run;}else run=1;}return mx;}
function sameSet(a,b){for(var i=0;i<6;i++)if(a[i]!==b[i])return false;return true;}
function passes(g,lastDraw,level){if(level>=3)return true;var oc=oddCount(g),sm=sumOf(g);if(level<2){if(maxRun(g)>=3)return false;}if(level<1){if(oc<2||oc>4)return false;if(sm<100||sm>175)return false;if(lastDraw&&sameSet(g,lastDraw))return false;}else{if(oc<1||oc>5)return false;if(sm<90||sm>185)return false;}return true;}
function recommend(history,R,opts){opts=opts||{};var N=opts.N==null?100:opts.N;var G=5;var K=opts.K==null?3:opts.K;var alpha=opts.alpha==null?0.45:opts.alpha;var fixed=opts.fixed||[];var seed=opts.seed==null?R:opts.seed;for(var fi=0;fi<fixed.length;fi++)seed=(seed*33+fixed[fi])|0;var rng=mulberry32(seed);var weights=buildWeights(history,R,N,alpha);var lastDraw=null;for(var i=history.length-1;i>=0;i--)if(history[i].round<R){lastDraw=history[i].nums.slice().sort(function(a,b){return a-b;});break;}var games=[],seen={};for(var gi=0;gi<G;gi++){var g=null;for(var level=0;level<=3;level++){for(var t=0;t<120;t++){var cand=drawGame(weights,rng,K,fixed);var key=cand.join(",");if(passes(cand,lastDraw,level)&&!seen[key]){g=cand;break;}}if(g)break;}if(!g)g=drawGame(weights,rng,K,fixed);seen[g.join(",")]=1;games.push({nums:g,odd:oddCount(g),even:6-oddCount(g),sum:sumOf(g),K:K});}return{round:R,N:N,G:G,K:K,alpha:alpha,games:games};}
/* 게임 채점 → 등수(6=1등,5+보너스=2등,5=3등,4=4등,3=5등,else 0) */
function grade(gameNums,actualNums,bonus){var set={},i;for(i=0;i<actualNums.length;i++)set[actualNums[i]]=1;var m=0;for(i=0;i<gameNums.length;i++)if(set[gameNums[i]])m++;var bonusMatch=gameNums.indexOf(bonus)>=0;var rank=0;if(m===6)rank=1;else if(m===5&&bonusMatch)rank=2;else if(m===5)rank=3;else if(m===4)rank=4;else if(m===3)rank=5;return{match:m,rank:rank};}

/* ===== UI ===== */
var $=function(id){return document.getElementById(id);};
function ballClass(n){return n<=10?"c1":n<=20?"c2":n<=30?"c3":n<=40?"c4":"c5";}
function ball(n,extra){return '<div class="lt-ball '+ballClass(n)+(extra?' '+extra:'')+'">'+n+'</div>';}
function ballsHtml(nums,sm){var h='<div class="lt-balls">';nums.forEach(function(n){h+=ball(n,sm?'sm':'');});return h+'</div>';}
function nLabel(n){return n>=9999?'전체':n;}

var H=null, curN=100, curK=3, curM=20, autoMsg="", autoStrong=false, fixedNums=[];
var N_OPTS=[30,50,100,200,300,500,9999];

/* 현재 선택 구간(최근 M경기)에서 K∈{0..6}×N∈{30,50,100,200,300} 전수 백테스트 →
   우선순위: 5등↑ 맞은 회차 수 → 게임당 평균 일치. 최고 조합을 설정에 자동 적용. */
function runAutoFind(){
  var latest=H[H.length-1].round;
  var M=Math.min(curM,latest-1);
  var best=null;
  [0,1,2,3,4,5,6].forEach(function(K){
    var Ns=K===0?[100]:[30,50,100,200,300,500,9999]; /* K=0(완전랜덤)은 N 무의미 → 1회만 */
    Ns.forEach(function(N){
      var win4=0,win5=0,matchTot=0;
      for(var R=latest;R>latest-M&&R>=2;R--){
        var rec=recommend(H,R,{N:N,K:K}),actual=H[R-1],bestRank=0;
        rec.games.forEach(function(g){var gr=grade(g.nums,actual.nums,actual.bonus);matchTot+=gr.match;if(gr.rank&&(bestRank===0||gr.rank<bestRank))bestRank=gr.rank;});
        if(bestRank){win5++;if(bestRank<=4)win4++;} /* bestRank<=4 = 4개↑ 일치 = 4등↑ */
      }
      /* 우선순위: 4등↑ 회차수 → 5등↑ 회차수 → 게임당 평균일치 */
      var cand={K:K,N:N,win4:win4,win5:win5,avg:matchTot/(M*5)};
      if(!best||cand.win4>best.win4||(cand.win4===best.win4&&cand.win5>best.win5)||(cand.win4===best.win4&&cand.win5===best.win5&&cand.avg>best.avg))best=cand;
    });
  });
  curK=best.K;curN=best.N;
  if(best.win4>0){
    autoStrong=true;
    autoMsg='최근 '+M+'경기 기준 <b>4등↑ 최다: K='+best.K+', N='+nLabel(best.N)+'</b>'+(best.K===0?' (완전 랜덤)':'')+' — 4등↑ '+best.win4+'회 · 5등↑ '+best.win5+'회 · 게임당 평균 '+best.avg.toFixed(2)+'개 (과거 기준·예측 아님)';
  }else{
    autoStrong=false;
    autoMsg='이 구간엔 <b>4등↑(4개 일치) 기록이 없어</b> 5등(3개↑) 기준으로 대체했어요: <b>K='+best.K+', N='+nLabel(best.N)+'</b>'+(best.K===0?' (완전 랜덤)':'')+' — 5등↑ '+best.win5+'회 · 게임당 평균 '+best.avg.toFixed(2)+'개 (과거 기준·예측 아님)';
  }
  renderReco();
}

/* 최근 M경기(회차) 요약 실적: 현재 K·N 설정으로 각 회차를 결정론적 재현 → 등수별 집계만 */
function renderSummary(){
  var latest=H[H.length-1].round;
  var maxM=latest-1;
  var opts=[10,20,50,100,200,300,500,99999].filter(function(m){return m<=maxM||m===99999;});
  if(opts.indexOf(curM)<0)curM=20;
  var M=(curM===99999)?maxM:Math.min(curM,maxM);
  var tally={1:0,2:0,3:0,4:0,5:0,none:0}, bestMatchCnt=0;
  for(var R=latest;R>latest-M&&R>=2;R--){
    var rec=recommend(H,R,{N:curN,K:curK});
    var actual=H[R-1];
    var bestRank=0,bestMatch=0;
    rec.games.forEach(function(g){var gr=grade(g.nums,actual.nums,actual.bonus);if(gr.match>bestMatch)bestMatch=gr.match;if(gr.rank&&(bestRank===0||gr.rank<bestRank))bestRank=gr.rank;});
    if(bestRank)tally[bestRank]++;else tally.none++;
    if(bestMatch>=3)bestMatchCnt++;
  }
  var mopt=opts.map(function(m){return '<option value="'+m+'"'+(m===curM?' selected':'')+'>'+(m===99999?'전체':m)+'</option>';}).join('');
  function chip(label,cnt,strong){var cls=cnt>0?(strong?' class="hit4"':' class="hit"'):'';return '<span'+cls+'>'+label+' '+cnt+'회</span>';}
  var body=chip('🥇1등',tally[1],true)+chip('🥈2등',tally[2],true)+chip('🥉3등',tally[3],true)+chip('4등',tally[4],true)+chip('5등',tally[5],false)+'<span>미당첨 '+tally.none+'회</span>';
  var strongWarn=autoStrong?'<div class="lt-auto-warn lt-auto-warn-strong">⚠️ <b>4등+는 매우 드물어서</b>(게임당 약 1/733) 이 “최고 K·N”은 사실상 <b>과거의 우연</b>이에요. 다음 회차 확률과 무관합니다.</div>':'';
  var autoBlock=autoMsg?'<div class="lt-auto-msg">✅ '+autoMsg+strongWarn+'<div class="lt-auto-warn">⚠️ 이 값은 고른 구간의 <b>과거 결과에 맞춘 것</b>이라 다음 회차 당첨확률을 높이지 않아요(과최적화).</div></div>':'';
  var fixNote=fixedNums.length?' 이 집계·자동찾기는 <b>고정번호를 뺀 순수 로직</b> 기준이에요.':'';
  $('lt-summary').innerHTML='<div class="lt-sum-head">📋 최근 <select id="lt-mselect">'+mopt+'</select>경기 이 추천의 성적 <span style="font-weight:400;color:#999;">(K='+curK+'·N='+nLabel(curN)+')</span></div>'+
    '<div class="lt-sum-body">'+body+'</div>'+
    '<div class="lt-sum-note">현재 설정으로 과거 회차를 그대로 재현해 실제 당첨과 대조한 집계예요(3개 이상 맞은 회차 '+bestMatchCnt+'회). 로또는 무작위라 대부분 미당첨입니다.'+fixNote+'</div>'+
    '<button id="lt-auto" class="lt-auto-btn">🔍 최고 K·N 자동 찾기</button>'+autoBlock;
  $('lt-mselect').addEventListener('change',function(){curM=parseInt(this.value,10);autoMsg="";renderSummary();});
  $('lt-auto').addEventListener('click',function(){var b=this;b.textContent='계산 중…';b.disabled=true;setTimeout(runAutoFind,20);});
}

/* 고정번호 픽커: 1~45 칩 토글, 최대 6개 */
function renderFix(){
  var chips='';
  for(var n=1;n<=45;n++){var on=fixedNums.indexOf(n)>=0;chips+='<button class="lt-fc'+(on?' on '+ballClass(n):'')+'" data-n="'+n+'">'+n+'</button>';}
  var sel=fixedNums.length?'<div class="lt-fix-sel">선택 '+fixedNums.length+'개: '+ballsHtml(fixedNums,true)+'<button class="lt-fix-clear" id="lt-fix-clear">모두 지우기</button></div>':'';
  var note6=fixedNums.length===6?'<div class="lt-fix-note6">⚠️ 6개를 다 지정하면 5게임이 모두 똑같아져요.</div>':'';
  $('lt-fix').innerHTML='<div class="lt-fix-help">넣고 싶은 번호를 눌러 고르세요. 각 추천 게임에 반드시 포함돼요. (비우면 일반 생성)</div><div class="lt-fix-grid">'+chips+'</div>'+sel+note6;
  [].forEach.call(document.querySelectorAll('.lt-fc'),function(b){b.addEventListener('click',function(){var n=parseInt(b.getAttribute('data-n'),10);var ix=fixedNums.indexOf(n);if(ix>=0)fixedNums.splice(ix,1);else{if(fixedNums.length>=6)return;fixedNums.push(n);fixedNums.sort(function(a,b){return a-b;});}autoMsg="";renderFix();renderReco();});});
  var cl=$('lt-fix-clear');if(cl)cl.addEventListener('click',function(){fixedNums=[];autoMsg="";renderFix();renderReco();});
}

function renderReco(){
  var nextR=H[H.length-1].round+1;
  var rec=recommend(H,nextR,{N:curN,K:curK,fixed:fixedNums});
  var html='<h3 class="lt-h">🎯 이번 주 추천 5게임 · '+nextR+'회</h3>';
  rec.games.forEach(function(g,i){
    html+='<div class="lt-game"><span class="idx">'+String.fromCharCode(65+i)+'</span>'+ballsHtml(g.nums,false)+
      '<span class="tag">홀짝 '+g.odd+':'+g.even+' · 합 '+g.sum+'</span></div>';
  });
  $('lt-reco').innerHTML=html;
  var kopt='';for(var kk=0;kk<=6;kk++)kopt+='<option value="'+kk+'"'+(kk===curK?' selected':'')+'>'+kk+'개</option>';
  var nopt=N_OPTS.map(function(nn){return '<option value="'+nn+'"'+(nn===curN?' selected':'')+'>'+nLabel(nn)+(nn>=9999?'':'회')+'</option>';}).join('');
  var fixCnt=fixedNums.length,remain=6-fixCnt,probShown=Math.min(curK,remain);
  $('lt-set').innerHTML='<div class="lt-ctrl"><span>확률 기반 번호 수(K):</span><select id="lt-kselect">'+kopt+'</select><span style="color:#aaa;">/ 6개 중</span></div>'+
    '<div class="lt-ctrl"><span>최근 표본(N):</span><select id="lt-nselect">'+nopt+'</select><span style="color:#aaa;">역대 '+H.length+'회까지</span></div>'+
    '<div class="lt-set-note">한 게임 6개 중 '+(fixCnt?('고정 '+fixCnt+'개 + '):'')+probShown+'개는 최근 '+nLabel(curN)+(curN>=9999?' 회차':'회')+'+역대 전체 출현확률 블렌드로, 나머지 '+(remain-probShown)+'개는 랜덤으로 채워요(K=0이면 완전 랜덤). 같은 설정·입력이면 추천이 항상 동일해요.</div>';
  $('lt-kselect').addEventListener('change',function(){curK=parseInt(this.value,10);autoMsg="";renderReco();});
  $('lt-nselect').addEventListener('change',function(){curN=parseInt(this.value,10);autoMsg="";renderReco();});
  renderSummary();
}

var statsDone=false;
function renderStats(){
  if(statsDone)return; statsDone=true;
  var all=counts(H), s=$('lt-stats');
  var arr=[];for(var i=1;i<=45;i++)arr.push({n:i,c:all[i]});
  arr.sort(function(a,b){return b.c-a.c;});
  var hot=arr.slice(0,6), cold=arr.slice(-6).reverse(), maxc=arr[0].c;
  function freqRow(list){return list.map(function(x){return '<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">'+ball(x.n,'sm')+'<div class="lt-bar" style="flex:1;"><i style="width:'+(100*x.c/maxc)+'%;"></i></div><span style="font-size:11px;color:#888;width:52px;text-align:right;">'+x.c+'회</span></div>';}).join('');}
  var oe={};H.forEach(function(r){var o=oddCount(r.nums);oe[o]=(oe[o]||0)+1;});
  var oeH='';for(var o=6;o>=0;o--){if(!oe[o])continue;oeH+='<div class="lt-kv"><span>홀 '+o+' : 짝 '+(6-o)+'</span><span>'+(100*oe[o]/H.length).toFixed(0)+'%</span></div>';}
  var bkt={};H.forEach(function(r){var b=Math.floor(sumOf(r.nums)/20)*20;bkt[b]=(bkt[b]||0)+1;});
  var bk=Object.keys(bkt).map(Number).sort(function(a,b){return a-b;});
  var maxb=Math.max.apply(null,bk.map(function(k){return bkt[k];}));
  var sumH=bk.map(function(k){return '<div style="display:flex;align-items:center;gap:6px;margin:3px 0;"><span style="width:60px;font-size:11px;color:#888;">'+k+'~'+(k+19)+'</span><div class="lt-bar" style="flex:1;"><i style="width:'+(100*bkt[k]/maxb)+'%;'+((k>=100&&k<=175)?'background:#16a34a;':'')+'"></i></div></div>';}).join('');
  var seg=[0,0,0,0,0];H.forEach(function(r){r.nums.forEach(function(n){seg[Math.min(Math.floor((n-1)/10),4)]++;});});
  var segTot=seg.reduce(function(a,b){return a+b;},0),segMax=Math.max.apply(null,seg),segLbl=['1-10','11-20','21-30','31-40','41-45'];
  var segH=seg.map(function(v,i){return '<div style="display:flex;align-items:center;gap:6px;margin:3px 0;"><span style="width:48px;font-size:11px;color:#888;">'+segLbl[i]+'</span><div class="lt-bar" style="flex:1;"><i style="width:'+(100*v/segMax)+'%;"></i></div><span style="font-size:11px;color:#aaa;width:40px;text-align:right;">'+(100*v/segTot).toFixed(0)+'%</span></div>';}).join('');
  var consec=0;H.forEach(function(r){if(maxRun(r.nums.slice().sort(function(a,b){return a-b;}))>=2)consec++;});
  var pair={};H.forEach(function(r){var g=r.nums;for(var a=0;a<6;a++)for(var b=a+1;b<6;b++){var k=g[a]<g[b]?g[a]+'-'+g[b]:g[b]+'-'+g[a];pair[k]=(pair[k]||0)+1;}});
  var parr=Object.keys(pair).map(function(k){return{k:k,c:pair[k]};}).sort(function(x,y){return y.c-x.c;}).slice(0,6);
  var pairH=parr.map(function(p){var ab=p.k.split('-');return '<span class="lt-chip">'+ball(+ab[0],'sm')+ball(+ab[1],'sm')+' '+p.c+'회</span>';}).join('');
  s.innerHTML='<div class="lt-stat-grid">'+
    '<div class="lt-stat-box"><h4>🔥 핫넘버 (최다)</h4>'+freqRow(hot)+'</div>'+
    '<div class="lt-stat-box"><h4>❄️ 콜드넘버 (최소)</h4>'+freqRow(cold)+'</div>'+
    '<div class="lt-stat-box"><h4>⚖️ 홀짝 분포</h4>'+oeH+'</div>'+
    '<div class="lt-stat-box"><h4>➕ 합계 분포 <span style="font-weight:400;color:#16a34a;font-size:10.5px;">(초록=100~175)</span></h4>'+sumH+'</div>'+
    '<div class="lt-stat-box"><h4>📊 구간 분포</h4>'+segH+'</div>'+
    '<div class="lt-stat-box"><h4>🔗 연속·궁합수</h4><div class="lt-kv"><span>연속 2개↑ 포함 회차</span><span>'+(100*consec/H.length).toFixed(0)+'%</span></div><div style="margin-top:6px;">'+pairH+'</div></div>'+
    '</div><div style="font-size:11px;color:#aaa;margin-top:10px;text-align:center;">역대 '+H.length+'회 누적 통계 · 재미·참고용이며 미래 당첨과 무관합니다.</div>';
}

fetch('/data/lotto_history.json').then(function(r){return r.json();}).then(function(data){
  H=data.slice().sort(function(a,b){return a.round-b.round;});
  buildCum();
  $('lt-loading').style.display='none';$('lt-body').style.display='block';
  renderFix();
  renderReco();
  renderStats();
}).catch(function(){$('lt-loading').innerHTML='데이터를 불러오지 못했어요 😢 잠시 후 다시 시도해 주세요.';});
})();
</script>
