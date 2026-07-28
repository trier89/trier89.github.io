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

<div class="pf-tool" id="lt-tool"><div id="lt-loading" style="text-align:center;padding:40px 0;color:#999;">불러오는 중…</div><div id="lt-body" style="display:none;"><div id="lt-reco"></div><div id="lt-summary" class="lt-summary"></div><div class="lt-honest">🎲 로또는 완전한 <b>무작위 추첨</b>이에요. 이 추천은 <b>재미·참고용</b>이며 <b>당첨을 보장하지 않아요.</b></div><details id="lt-set-wrap" class="lt-fold"><summary>⚙️ 설정 (확률 번호 수·표본 범위)</summary><div id="lt-set" class="lt-fold-in"></div></details><details id="lt-stats-wrap" class="lt-fold"><summary>📊 번호 통계 자세히 보기</summary><div id="lt-stats" class="lt-fold-in"></div></details></div></div>

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
.lt-fold{margin-top:12px;border:1px solid #eee;border-radius:10px;background:#fafafa;}
.lt-fold>summary{cursor:pointer;font-weight:700;font-size:13px;color:#666;padding:11px 14px;list-style:none;}
.lt-fold>summary::-webkit-details-marker{display:none;}
.lt-fold>summary::before{content:"▸ ";color:#bbb;}
.lt-fold[open]>summary::before{content:"▾ ";}
.lt-fold-in{padding:2px 14px 14px;}
.lt-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12.5px;color:#555;margin:6px 0;}
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
.lt-summary .lt-sum-body span.hit{background:#dcfce7;color:#166534;font-weight:700;}
.lt-summary .lt-sum-note{margin-top:6px;font-size:11px;color:#aaa;line-height:1.5;}
.lt-auto-btn{margin-top:10px;background:#fff;border:1px solid #d97706;color:#b45309;border-radius:9px;padding:8px 14px;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;}
.lt-auto-btn:hover{background:#fff7ed;}
.lt-auto-btn:disabled{opacity:.6;cursor:default;}
.lt-auto-msg{margin-top:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:10px 12px;font-size:12px;color:#166534;line-height:1.55;}
.lt-auto-msg b{color:#15803d;}
.lt-auto-warn{margin-top:5px;font-size:11px;color:#92600a;line-height:1.5;}
.lt-auto-warn b{color:#92600a;}
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
function buildWeights(history,R,N,alpha){var prev=[];for(var i=0;i<history.length;i++)if(history[i].round<R)prev.push(history[i]);if(prev.length===0){var u=new Array(46).fill(0);for(var j=1;j<=45;j++)u[j]=1/45;return u;}var recent=(N&&N<prev.length)?prev.slice(prev.length-N):prev;var allN=normalize(counts(prev));var recN=normalize(counts(recent));var w=new Array(46).fill(0),sum=0,k;for(k=1;k<=45;k++){w[k]=alpha*recN[k]+(1-alpha)*allN[k];sum+=w[k];}for(k=1;k<=45;k++)w[k]/=sum;return w;}
function drawGame(weights,rng,K){var pool=[],w=[],i;for(i=1;i<=45;i++){pool.push(i);w.push(weights[i]);}var pick=[];for(var d=0;d<K&&pick.length<6;d++){var tot=0,j;for(j=0;j<w.length;j++)tot+=w[j];var r=rng()*tot,acc=0,sel=0;for(j=0;j<w.length;j++){acc+=w[j];if(r<=acc){sel=j;break;}}pick.push(pool[sel]);pool.splice(sel,1);w.splice(sel,1);}while(pick.length<6&&pool.length>0){var idx=Math.floor(rng()*pool.length);pick.push(pool[idx]);pool.splice(idx,1);w.splice(idx,1);}return pick.sort(function(a,b){return a-b;});}
function oddCount(g){var n=0;for(var i=0;i<g.length;i++)if(g[i]%2===1)n++;return n;}
function sumOf(g){var s=0;for(var i=0;i<g.length;i++)s+=g[i];return s;}
function maxRun(g){var mx=1,run=1;for(var i=1;i<g.length;i++){if(g[i]===g[i-1]+1){run++;if(run>mx)mx=run;}else run=1;}return mx;}
function sameSet(a,b){for(var i=0;i<6;i++)if(a[i]!==b[i])return false;return true;}
function passes(g,lastDraw,level){if(level>=3)return true;var oc=oddCount(g),sm=sumOf(g);if(level<2){if(maxRun(g)>=3)return false;}if(level<1){if(oc<2||oc>4)return false;if(sm<100||sm>175)return false;if(lastDraw&&sameSet(g,lastDraw))return false;}else{if(oc<1||oc>5)return false;if(sm<90||sm>185)return false;}return true;}
function recommend(history,R,opts){opts=opts||{};var N=opts.N==null?100:opts.N;var G=5;var K=opts.K==null?3:opts.K;var alpha=opts.alpha==null?0.45:opts.alpha;var seed=opts.seed==null?R:opts.seed;var rng=mulberry32(seed);var weights=buildWeights(history,R,N,alpha);var lastDraw=null;for(var i=history.length-1;i>=0;i--)if(history[i].round<R){lastDraw=history[i].nums.slice().sort(function(a,b){return a-b;});break;}var games=[],seen={};for(var gi=0;gi<G;gi++){var g=null;for(var level=0;level<=3;level++){for(var t=0;t<120;t++){var cand=drawGame(weights,rng,K);var key=cand.join(",");if(passes(cand,lastDraw,level)&&!seen[key]){g=cand;break;}}if(g)break;}if(!g)g=drawGame(weights,rng,K);seen[g.join(",")]=1;games.push({nums:g,odd:oddCount(g),even:6-oddCount(g),sum:sumOf(g),K:K});}return{round:R,N:N,G:G,K:K,alpha:alpha,games:games};}
/* 게임 채점 → 등수(6=1등,5+보너스=2등,5=3등,4=4등,3=5등,else 0) */
function grade(gameNums,actualNums,bonus){var set={},i;for(i=0;i<actualNums.length;i++)set[actualNums[i]]=1;var m=0;for(i=0;i<gameNums.length;i++)if(set[gameNums[i]])m++;var bonusMatch=gameNums.indexOf(bonus)>=0;var rank=0;if(m===6)rank=1;else if(m===5&&bonusMatch)rank=2;else if(m===5)rank=3;else if(m===4)rank=4;else if(m===3)rank=5;return{match:m,rank:rank};}

/* ===== UI ===== */
var $=function(id){return document.getElementById(id);};
function ballClass(n){return n<=10?"c1":n<=20?"c2":n<=30?"c3":n<=40?"c4":"c5";}
function ball(n,extra){return '<div class="lt-ball '+ballClass(n)+(extra?' '+extra:'')+'">'+n+'</div>';}
function ballsHtml(nums,sm){var h='<div class="lt-balls">';nums.forEach(function(n){h+=ball(n,sm?'sm':'');});return h+'</div>';}

var H=null, curN=100, curK=3, curM=20, autoMsg="";

/* 현재 선택 구간(최근 M경기)에서 K∈{0..6}×N∈{30,50,100,200,300} 전수 백테스트 →
   우선순위: 5등↑ 맞은 회차 수 → 게임당 평균 일치. 최고 조합을 설정에 자동 적용. */
function runAutoFind(){
  var latest=H[H.length-1].round;
  var M=Math.min(curM,latest-1);
  var best=null;
  [0,1,2,3,4,5,6].forEach(function(K){
    var Ns=K===0?[100]:[30,50,100,200,300]; /* K=0(완전랜덤)은 N 무의미 → 1회만 */
    Ns.forEach(function(N){
      var win=0,matchTot=0;
      for(var R=latest;R>latest-M&&R>=2;R--){
        var rec=recommend(H,R,{N:N,K:K}),actual=H[R-1],bestRank=0;
        rec.games.forEach(function(g){var gr=grade(g.nums,actual.nums,actual.bonus);matchTot+=gr.match;if(gr.rank&&(bestRank===0||gr.rank<bestRank))bestRank=gr.rank;});
        if(bestRank)win++;
      }
      var cand={K:K,N:N,win:win,avg:matchTot/(M*5)};
      if(!best||cand.win>best.win||(cand.win===best.win&&cand.avg>best.avg))best=cand;
    });
  });
  curK=best.K;curN=best.N;
  autoMsg='최근 '+M+'경기 기준 최고 성적: <b>K='+best.K+', N='+best.N+'</b>'+(best.K===0?' (완전 랜덤)':'')+' — 5등↑ '+best.win+'회 · 게임당 평균 '+best.avg.toFixed(2)+'개 (과거 기준·예측 아님)';
  renderReco();
}

/* 최근 M경기(회차) 요약 실적: 현재 K·N 설정으로 각 회차를 결정론적 재현 → 등수별 집계만 */
function renderSummary(){
  var latest=H[H.length-1].round;
  var maxM=latest-1;
  var opts=[10,20,50,100].filter(function(m){return m<=maxM;});
  if(opts.indexOf(curM)<0)curM=opts[0]||10;
  var M=Math.min(curM,maxM);
  var tally={1:0,2:0,3:0,4:0,5:0,none:0}, bestMatchCnt=0;
  for(var R=latest;R>latest-M&&R>=2;R--){
    var rec=recommend(H,R,{N:curN,K:curK});
    var actual=H[R-1];
    var bestRank=0,bestMatch=0;
    rec.games.forEach(function(g){var gr=grade(g.nums,actual.nums,actual.bonus);if(gr.match>bestMatch)bestMatch=gr.match;if(gr.rank&&(bestRank===0||gr.rank<bestRank))bestRank=gr.rank;});
    if(bestRank)tally[bestRank]++;else tally.none++;
    if(bestMatch>=3)bestMatchCnt++;
  }
  var mopt=opts.map(function(m){return '<option value="'+m+'"'+(m===curM?' selected':'')+'>'+m+'</option>';}).join('');
  function chip(label,cnt){return '<span'+(cnt>0?' class="hit"':'')+'>'+label+' '+cnt+'회</span>';}
  var body=chip('🥇1등',tally[1])+chip('🥈2등',tally[2])+chip('🥉3등',tally[3])+chip('4등',tally[4])+chip('5등',tally[5])+'<span>미당첨 '+tally.none+'회</span>';
  var autoBlock=autoMsg?'<div class="lt-auto-msg">✅ '+autoMsg+'<div class="lt-auto-warn">⚠️ 이 값은 고른 구간의 <b>과거 결과에 맞춘 것</b>이라 다음 회차 당첨확률을 높이지 않아요(과최적화).</div></div>':'';
  $('lt-summary').innerHTML='<div class="lt-sum-head">📋 최근 <select id="lt-mselect">'+mopt+'</select>경기 이 추천의 성적 <span style="font-weight:400;color:#999;">(K='+curK+'·N='+curN+')</span></div>'+
    '<div class="lt-sum-body">'+body+'</div>'+
    '<div class="lt-sum-note">현재 설정으로 과거 회차를 그대로 재현해 실제 당첨과 대조한 집계예요(3개 이상 맞은 회차 '+bestMatchCnt+'회). 로또는 무작위라 대부분 미당첨입니다.</div>'+
    '<button id="lt-auto" class="lt-auto-btn">🔍 최고 K·N 자동 찾기</button>'+autoBlock;
  $('lt-mselect').addEventListener('change',function(){curM=parseInt(this.value,10);autoMsg="";renderSummary();});
  $('lt-auto').addEventListener('click',function(){var b=this;b.textContent='계산 중…';b.disabled=true;setTimeout(runAutoFind,20);});
}

function renderReco(){
  var nextR=H[H.length-1].round+1;
  var rec=recommend(H,nextR,{N:curN,K:curK});
  var html='<h3 class="lt-h">🎯 이번 주 추천 5게임 · '+nextR+'회</h3>';
  rec.games.forEach(function(g,i){
    html+='<div class="lt-game"><span class="idx">'+String.fromCharCode(65+i)+'</span>'+ballsHtml(g.nums,false)+
      '<span class="tag">홀짝 '+g.odd+':'+g.even+' · 합 '+g.sum+'</span></div>';
  });
  $('lt-reco').innerHTML=html;
  var kopt='';for(var kk=0;kk<=6;kk++)kopt+='<option value="'+kk+'"'+(kk===curK?' selected':'')+'>'+kk+'개</option>';
  $('lt-set').innerHTML='<div class="lt-ctrl"><span>확률 기반 번호 수(K):</span><select id="lt-kselect">'+kopt+'</select></div>'+
    '<div class="lt-ctrl"><span>최근 표본(N): <b id="lt-nval">'+curN+'</b>회</span><input type="range" id="lt-nslider" min="30" max="300" step="10" value="'+curN+'"></div>'+
    '<div class="lt-set-note">한 게임 6개 중 K개는 최근 '+curN+'회+역대 전체 출현확률 블렌드로, 나머지 '+(6-curK)+'개는 랜덤으로 채워요(K=0이면 완전 랜덤). 같은 회차·설정이면 추천이 항상 동일해요.</div>';
  $('lt-kselect').addEventListener('change',function(){curK=parseInt(this.value,10);autoMsg="";renderReco();});
  $('lt-nslider').addEventListener('input',function(){$('lt-nval').textContent=this.value;});
  $('lt-nslider').addEventListener('change',function(){curN=parseInt(this.value,10);autoMsg="";renderReco();});
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
  $('lt-loading').style.display='none';$('lt-body').style.display='block';
  renderReco();
  $('lt-stats-wrap').addEventListener('toggle',function(){if(this.open)renderStats();});
}).catch(function(){$('lt-loading').innerHTML='데이터를 불러오지 못했어요 😢 잠시 후 다시 시도해 주세요.';});
})();
</script>
