---
title: "로또 번호 생성기 — 확률 기반 추천 + 실적 추적표"
description: "역대 1234회 당첨번호를 분석해 확률 가중(최근+역대 블렌드)으로 이번 주 5게임을 추천하고, 지난 회차 추천이 실제로 몇 개 맞았는지 실적표로 정직하게 보여줘요. 로또는 무작위 추첨이라 당첨을 보장하지 않는 재미·참고용 도구."
date: 2026-07-29
slug: "lotto"
categories: ["도구"]
tags: ["로또 번호 생성기", "로또 번호 추천", "로또 통계", "로또 당첨번호", "로또 확률"]
toc: false
readingTime: false
---

역대 로또 당첨번호(1회~최신)를 모아 **번호별 출현 확률**을 계산하고, 단순 랜덤이 아니라 **최근 회차 + 역대 전체 출현확률을 블렌드한 확률 가중**으로 이번 주 5게임을 추천해요. 그리고 지난 회차에 대해 **그 추천이 실제로 몇 개 맞았는지** 실적표로 있는 그대로 보여줘요.

<div class="lt-warn" id="lt-top-warn"><b>⚠️ 먼저 읽어주세요</b><span>로또는 완전한 <b>무작위 추첨</b>이에요. 과거 통계·패턴은 미래 당첨을 예측하지 못하며, 이 도구는 <b>재미·참고용</b>입니다. 어떤 방식도 <b>당첨을 보장하지 않아요.</b> 아래 실적표를 보면 확률 가중 추천도 실제로는 대부분 미당첨이라는 걸 정직하게 확인할 수 있어요.</span></div>
<div class="pf-tool" id="lt-tool"><div id="lt-loading" style="text-align:center;padding:30px 0;color:#888;">데이터를 불러오는 중…</div><div id="lt-body" style="display:none;"><div id="lt-latest"></div><div id="lt-reco"></div><div id="lt-track"></div><details id="lt-stats-wrap" style="margin-top:22px;"><summary style="cursor:pointer;font-weight:800;font-size:15px;color:#111;padding:8px 0;">📊 통계 대시보드 (핫·콜드 / 홀짝 / 합계 / 구간 / 연속 / 궁합수) 열기</summary><div id="lt-stats" style="margin-top:12px;"></div></details></div></div>
<div class="lt-warn lt-warn-b" id="lt-bot-warn"><b>🎲 정직 고지</b><span>다시 한 번 — 로또 1등 확률은 약 <b>814만분의 1</b>로 고정이에요. 특정 번호를 고른다고 확률이 오르지 않습니다. 이 도구의 통계·추천은 <b>오락 목적</b>이며 <b>당첨을 보장하지 않아요.</b> 과도한 구매는 삼가고 즐기는 선에서만 이용하세요. · 데이터 출처: 동행복권 공식 발표 당첨번호.</span></div>

<style>
#lt-tool{max-width:640px;}
.lt-warn{max-width:600px;margin:16px auto;background:#fff8e6;border:1px solid #f2d888;border-left:4px solid #e0a800;border-radius:12px;padding:14px 16px;font-size:13px;line-height:1.6;color:#5c4a12;}
.lt-warn b{color:#8a6d00;}
.lt-warn>b{display:block;font-size:13.5px;margin-bottom:4px;}
.lt-warn-b{background:#f4f6f8;border-color:#d5dbe0;border-left-color:#8894a0;color:#42505c;}
.lt-warn-b b{color:#2f3a44;}
#lt-tool h3.lt-h{color:#111;font-size:17px;font-weight:800;margin:22px 0 4px;}
#lt-tool .lt-sub{color:#666;font-size:12.5px;margin-bottom:12px;}
.lt-balls{display:flex;gap:7px;flex-wrap:wrap;align-items:center;}
.lt-ball{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.18);flex:0 0 auto;}
.lt-ball.sm{width:28px;height:28px;font-size:12px;box-shadow:0 1px 2px rgba(0,0,0,.15);}
.lt-ball.c1{background:#fbc400;color:#5c4700;}
.lt-ball.c2{background:#69c8f2;color:#08405c;}
.lt-ball.c3{background:#ff7272;}
.lt-ball.c4{background:#8b95a1;}
.lt-ball.c5{background:#b0d840;color:#3a4d0a;}
.lt-ball.miss{opacity:.32;filter:grayscale(.4);}
.lt-ball.hit{outline:3px solid #16a34a;outline-offset:1px;}
.lt-bonus-sep{color:#bbb;font-weight:800;margin:0 2px;font-size:18px;}
.lt-game{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:9px 0;border-bottom:1px solid #f0f0f0;}
.lt-game .idx{font-weight:800;color:#d97706;width:26px;flex:0 0 auto;font-size:13px;}
.lt-game .tag{font-size:11.5px;color:#777;margin-left:auto;background:#f5f5f5;border-radius:20px;padding:3px 10px;white-space:nowrap;}
#lt-reco{background:#fffaf5;border:1px solid #ffe2cc;border-radius:14px;padding:16px 16px 8px;margin-top:8px;}
.lt-ctrl{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0 14px;font-size:12.5px;color:#555;}
.lt-ctrl input[type=range]{flex:1;min-width:120px;accent-color:#d97706;}
.lt-regen{background:#d97706;color:#fff;border:0;border-radius:10px;padding:9px 16px;font-weight:700;font-size:13px;cursor:pointer;}
.lt-note{font-size:12px;color:#8a6d00;background:#fff8e6;border-radius:8px;padding:8px 10px;margin-top:6px;}
.lt-track-tbl{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px;}
.lt-track-tbl th,.lt-track-tbl td{border-bottom:1px solid #eee;padding:8px 6px;text-align:left;vertical-align:middle;}
.lt-track-tbl th{color:#888;font-weight:700;font-size:11.5px;border-bottom:2px solid #e5e5e5;}
.lt-rowhi{background:#f0fdf4;}
.lt-badge{display:inline-block;border-radius:20px;padding:2px 9px;font-size:11.5px;font-weight:800;}
.lt-badge.win{background:#16a34a;color:#fff;}
.lt-badge.none{background:#eee;color:#999;}
.lt-hicard{background:linear-gradient(135deg,#fff7ed,#fef2f2);border:1px solid #fed7aa;border-radius:14px;padding:16px;margin:10px 0 16px;}
.lt-hicard .lt-hi-top{font-size:12.5px;color:#9a3412;font-weight:800;margin-bottom:8px;}
.lt-more{background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;padding:9px 16px;font-weight:700;font-size:13px;cursor:pointer;color:#374151;margin-top:10px;width:100%;}
.lt-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:520px){.lt-stat-grid{grid-template-columns:1fr;}}
.lt-stat-box{background:#fafafa;border:1px solid #eee;border-radius:10px;padding:12px;}
.lt-stat-box h4{margin:0 0 8px;font-size:13px;color:#333;font-weight:800;}
.lt-bar{height:9px;border-radius:5px;background:#e5e7eb;overflow:hidden;margin:3px 0;}
.lt-bar>i{display:block;height:100%;border-radius:5px;background:#d97706;}
.lt-kv{display:flex;justify-content:space-between;font-size:12px;color:#555;padding:2px 0;}
.lt-chip{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;background:#f1f5f9;border-radius:20px;padding:3px 9px;margin:2px 3px 2px 0;color:#334155;}
</style>
<script>
(function(){
"use strict";
/* ===== lotto-core (결정론적 확률가중 추천 + 채점) ===== */
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
function recommend(history,R,opts){opts=opts||{};var N=opts.N==null?100:opts.N;var G=5;var K=opts.K==null?3:opts.K;var alpha=opts.alpha==null?0.45:opts.alpha;var seed=opts.seed==null?R:opts.seed;var rng=mulberry32(seed);var weights=buildWeights(history,R,N,alpha);var lastDraw=null;for(var i=history.length-1;i>=0;i--)if(history[i].round<R){lastDraw=history[i].nums.slice().sort(function(a,b){return a-b;});break;}var games=[],seen={};for(var gi=0;gi<G;gi++){var g=null;for(var level=0;level<=3;level++){for(var t=0;t<120;t++){var cand=drawGame(weights,rng,K);var key=cand.join(",");if(passes(cand,lastDraw,level)&&!seen[key]){g=cand;break;}}if(g)break;}if(!g)g=drawGame(weights,rng,K);seen[g.join(",")]=1;games.push({nums:g,odd:oddCount(g),even:6-oddCount(g),sum:sumOf(g),K:K});}return{round:R,N:N,G:G,K:K,alpha:alpha,games:games,weights:weights};}
function grade(gameNums,actualNums,bonus){var set={},i;for(i=0;i<actualNums.length;i++)set[actualNums[i]]=1;var m=0;for(i=0;i<gameNums.length;i++)if(set[gameNums[i]])m++;var bonusMatch=gameNums.indexOf(bonus)>=0;var rank=0;if(m===6)rank=1;else if(m===5&&bonusMatch)rank=2;else if(m===5)rank=3;else if(m===4)rank=4;else if(m===3)rank=5;return{match:m,bonusMatch:bonusMatch,rank:rank};}
var RANKNAME={0:"미당첨",5:"5등",4:"4등",3:"3등",2:"2등",1:"1등"};

/* ===== UI ===== */
var $=function(id){return document.getElementById(id);};
function ballClass(n){return n<=10?"c1":n<=20?"c2":n<=30?"c3":n<=40?"c4":"c5";}
function ball(n,extra){return '<div class="lt-ball '+ballClass(n)+(extra?' '+extra:'')+'">'+n+'</div>';}
function ballsHtml(nums,bonus,opt){opt=opt||{};var h='<div class="lt-balls">';nums.forEach(function(n){var cls=opt.hitset?(opt.hitset[n]?'hit':'miss'):'';h+=ball(n,(opt.sm?'sm ':'')+cls);});if(bonus!=null){h+='<span class="lt-bonus-sep">+</span>'+ball(bonus,(opt.sm?'sm ':'')+(opt.hitset&&opt.hitset[bonus]?'hit':opt.hitset?'miss':''));}return h+'</div>';}
function fmtDate(d){return d?d.replace(/-/g,'.'):'';}

var H=null, LATEST=null, N_DEFAULT=100, K_DEFAULT=3, curN=100, curK=3;

function render(N,K){
  curN=N;curK=K;
  var latest=H[H.length-1];
  LATEST=latest;
  /* --- 최신 당첨 --- */
  $('lt-latest').innerHTML='<h3 class="lt-h">🏆 최근 당첨번호 · '+latest.round+'회</h3>'+
    '<div class="lt-sub">'+fmtDate(latest.date)+' 추첨</div>'+ballsHtml(latest.nums,latest.bonus,{});

  /* --- 이번 주 추천 1세트 = 5게임 (다음 회차, 결정론적) --- */
  var nextR=latest.round+1;
  var rec=recommend(H,nextR,{N:N,K:K});
  var kopt='';for(var kk=0;kk<=6;kk++)kopt+='<option value="'+kk+'"'+(kk===K?' selected':'')+'>'+kk+'개</option>';
  var html='<h3 class="lt-h">🎯 이번 주 추천 · '+nextR+'회 (1세트 = 5게임)</h3>'+
    '<div class="lt-sub">한 게임(6개) 중 <b>'+K+'개는 출현 확률 기반</b>(최근 '+N+'회 + 역대 전체 확률을 블렌드, α=0.45), 나머지 <b>'+(6-K)+'개는 순수 랜덤</b>으로 채우고 홀짝·합계·연속 균형 규칙을 적용했어요.'+(K===0?' <b>(지금 K=0 = 완전 랜덤)</b>':'')+'</div>'+
    '<div id="lt-reco-inner">';
  rec.games.forEach(function(g,i){
    html+='<div class="lt-game"><span class="idx">'+(String.fromCharCode(65+i))+'</span>'+ballsHtml(g.nums,null,{})+
      '<span class="tag">확률 '+K+'·랜덤 '+(6-K)+' · 홀짝 '+g.odd+':'+g.even+' · 합 '+g.sum+'</span></div>';
  });
  html+='</div>'+
    '<div class="lt-ctrl"><span>확률 번호 수(K): </span><select id="lt-kselect" style="padding:5px 8px;border:1px solid #ddd;border-radius:8px;font:inherit;font-size:12.5px;">'+kopt+'</select>'+
    '<span style="margin-left:6px;">최근 창(N): <b id="lt-nval">'+N+'</b>회</span>'+
    '<input type="range" id="lt-nslider" min="30" max="300" step="10" value="'+N+'"></div>'+
    '<div class="lt-note">💡 같은 회차·같은 설정이면 추천이 <b>항상 동일</b>하게 재현돼요(결정론적 시드). 그래야 지난주 추천을 아래 실적표에서 그대로 검증할 수 있어요. <b>K=0은 완전 랜덤</b>이라, K를 올려도 실적이 눈에 띄게 좋아지지 않는다는 걸 실적표에서 직접 확인해 보세요.</div>';
  $('lt-reco').innerHTML=html;
  $('lt-nslider').addEventListener('input',function(){$('lt-nval').textContent=this.value;});
  $('lt-nslider').addEventListener('change',function(){render(parseInt(this.value,10),curK);});
  $('lt-kselect').addEventListener('change',function(){render(curN,parseInt(this.value,10));});

  /* --- 실적 트랙레코드 --- */
  renderTrack(N,K);
  /* --- 통계 --- */
  if(!$('lt-stats').getAttribute('data-done')){renderStats();$('lt-stats').setAttribute('data-done','1');}
}

function gradeRow(R,N,K){
  var rec=recommend(H,R,{N:N,K:K});
  var actual=H.find(function(x){return x.round===R;});
  var hitset={};actual.nums.forEach(function(n){hitset[n]=1;});
  var best={match:-1,rank:0};
  rec.games.forEach(function(g){var gr=grade(g.nums,actual.nums,actual.bonus);if(gr.match>best.match)best.match=gr.match;if(gr.rank&&(best.rank===0||gr.rank<best.rank))best.rank=gr.rank;});
  return {R:R,rec:rec,actual:actual,hitset:hitset,best:best};
}

var trackShown=10;
function renderTrack(N,K){
  var latest=H[H.length-1].round;
  /* 최근 완료 회차 하이라이트 */
  var hi=gradeRow(latest,N,K);
  var badge=hi.best.rank?'<span class="lt-badge win">'+RANKNAME[hi.best.rank]+' 당첨! ('+hi.best.match+'개 일치)</span>':'<span class="lt-badge none">미당첨 · 최고 '+hi.best.match+'개 일치</span>';
  var hihtml='<h3 class="lt-h">📈 실적 추적표 (백테스트)</h3>'+
    '<div class="lt-sub">과거 각 회차에 대해 <b>그 회차 직전까지의 데이터만</b>으로 추천 5게임을 결정론적으로 재현 → 실제 당첨번호와 대조한 정직한 성적표예요.</div>'+
    '<div class="lt-hicard"><div class="lt-hi-top">가장 최근 완료 · '+latest+'회 결과</div>'+
    '<div style="margin-bottom:8px;">실제 당첨: '+ballsHtml(hi.actual.nums,hi.actual.bonus,{sm:true})+'</div>'+
    '<div style="font-weight:800;margin-bottom:6px;">추천 5게임 채점 → '+badge+'</div>';
  hi.rec.games.forEach(function(g,i){
    var gr=grade(g.nums,hi.actual.nums,hi.actual.bonus);
    hihtml+='<div class="lt-game" style="border-bottom:1px dashed #f0d9c4;"><span class="idx">'+String.fromCharCode(65+i)+'</span>'+
      ballsHtml(g.nums,null,{sm:true,hitset:hi.hitset})+
      '<span class="tag">'+(gr.rank?'<b style="color:#16a34a;">'+gr.match+'개 · '+RANKNAME[gr.rank]+'!</b>':'일치 '+gr.match+'개')+'</span></div>';
  });
  hihtml+='</div>';

  /* 표 */
  var tbl='<table class="lt-track-tbl"><thead><tr><th>회차</th><th>추천 최고성적</th><th>실제 당첨번호</th></tr></thead><tbody>';
  for(var R=latest;R>latest-trackShown&&R>=1;R--){
    var row=gradeRow(R,N,K);
    var rk=row.best.rank?'<span class="lt-badge win">'+RANKNAME[row.best.rank]+'</span> '+row.best.match+'개':'<span class="lt-badge none">'+row.best.match+'개</span>';
    tbl+='<tr class="'+(row.best.rank?'lt-rowhi':'')+'"><td><b>'+R+'</b><br><span style="color:#aaa;font-size:11px;">'+fmtDate(row.actual.date)+'</span></td>'+
      '<td>'+rk+'</td><td>'+ballsHtml(row.actual.nums,row.actual.bonus,{sm:true})+'</td></tr>';
  }
  tbl+='</tbody></table>';
  var more=trackShown<latest?'<button class="lt-more" id="lt-more">더 보기 (다음 20회차)</button>':'';
  $('lt-track').innerHTML=hihtml+tbl+more;
  var mb=$('lt-more');if(mb)mb.addEventListener('click',function(){trackShown=Math.min(trackShown+20,latest);renderTrack(curN,curK);});
}

function renderStats(){
  var all=counts(H), s=$('lt-stats');
  /* 핫/콜드 */
  var arr=[];for(var i=1;i<=45;i++)arr.push({n:i,c:all[i]});
  arr.sort(function(a,b){return b.c-a.c;});
  var hot=arr.slice(0,6), cold=arr.slice(-6).reverse();
  var maxc=arr[0].c;
  function freqRow(list){return list.map(function(x){return '<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">'+ball(x.n,'sm')+'<div class="lt-bar" style="flex:1;"><i style="width:'+(100*x.c/maxc)+'%;"></i></div><span style="font-size:11.5px;color:#777;width:64px;text-align:right;">'+x.c+'회</span></div>';}).join('');}
  /* 홀짝 */
  var oe={};H.forEach(function(r){var o=oddCount(r.nums);oe[o]=(oe[o]||0)+1;});
  var oeH='';for(var o=6;o>=0;o--){if(!oe[o])continue;oeH+='<div class="lt-kv"><span>홀 '+o+' : 짝 '+(6-o)+'</span><span>'+oe[o]+'회 ('+(100*oe[o]/H.length).toFixed(0)+'%)</span></div>';}
  /* 합계 분포 */
  var buckets={};H.forEach(function(r){var s=sumOf(r.nums);var b=Math.floor(s/20)*20;buckets[b]=(buckets[b]||0)+1;});
  var bk=Object.keys(buckets).map(Number).sort(function(a,b){return a-b;});
  var maxb=Math.max.apply(null,bk.map(function(k){return buckets[k];}));
  var sumH=bk.map(function(k){return '<div style="display:flex;align-items:center;gap:6px;margin:3px 0;"><span style="width:64px;font-size:11px;color:#777;">'+k+'~'+(k+19)+'</span><div class="lt-bar" style="flex:1;"><i style="width:'+(100*buckets[k]/maxb)+'%;'+((k>=100&&k<=175)?'background:#16a34a;':'')+'"></i></div></div>';}).join('');
  /* 구간 분포 */
  var seg=[0,0,0,0,0];H.forEach(function(r){r.nums.forEach(function(n){seg[Math.min(Math.floor((n-1)/10),4)]++;});});
  var segTot=seg.reduce(function(a,b){return a+b;},0),segMax=Math.max.apply(null,seg);
  var segLbl=['1-10','11-20','21-30','31-40','41-45'];
  var segH=seg.map(function(v,i){return '<div style="display:flex;align-items:center;gap:6px;margin:3px 0;"><span style="width:52px;font-size:11px;color:#777;">'+segLbl[i]+'</span><div class="lt-bar" style="flex:1;"><i style="width:'+(100*v/segMax)+'%;"></i></div><span style="font-size:11px;color:#999;width:44px;text-align:right;">'+(100*v/segTot).toFixed(0)+'%</span></div>';}).join('');
  /* 연속번호 등장률 */
  var consec=0;H.forEach(function(r){var g=r.nums.slice().sort(function(a,b){return a-b;});if(maxRun(g)>=2)consec++;});
  /* 궁합수(자주 함께) */
  var pair={};H.forEach(function(r){var g=r.nums;for(var a=0;a<6;a++)for(var b=a+1;b<6;b++){var k=g[a]<g[b]?g[a]+'-'+g[b]:g[b]+'-'+g[a];pair[k]=(pair[k]||0)+1;}});
  var parr=Object.keys(pair).map(function(k){return{k:k,c:pair[k]};}).sort(function(x,y){return y.c-x.c;}).slice(0,8);
  var pairH=parr.map(function(p){var ab=p.k.split('-');return '<span class="lt-chip">'+ball(+ab[0],'sm')+ball(+ab[1],'sm')+' '+p.c+'회</span>';}).join('');

  s.innerHTML='<div class="lt-stat-grid">'+
    '<div class="lt-stat-box"><h4>🔥 핫넘버 (역대 최다 출현)</h4>'+freqRow(hot)+'</div>'+
    '<div class="lt-stat-box"><h4>❄️ 콜드넘버 (역대 최소 출현)</h4>'+freqRow(cold)+'</div>'+
    '<div class="lt-stat-box"><h4>⚖️ 홀짝 비율 분포</h4>'+oeH+'</div>'+
    '<div class="lt-stat-box"><h4>➕ 번호 합계 분포 <span style="font-weight:400;color:#16a34a;font-size:11px;">(초록=정상 100~175)</span></h4>'+sumH+'</div>'+
    '<div class="lt-stat-box"><h4>📊 번호대별 구간 분포</h4>'+segH+'</div>'+
    '<div class="lt-stat-box"><h4>🔗 연속번호 · 궁합수</h4><div class="lt-kv"><span>연속번호 2개↑ 포함 회차</span><span>'+(100*consec/H.length).toFixed(0)+'%</span></div><div style="margin-top:8px;font-size:11.5px;color:#777;">자주 함께 나온 번호쌍</div><div style="margin-top:4px;">'+pairH+'</div></div>'+
    '</div>';
}

/* ===== 데이터 로드 ===== */
fetch('/data/lotto_history.json').then(function(r){return r.json();}).then(function(data){
  H=data.slice().sort(function(a,b){return a.round-b.round;});
  $('lt-loading').style.display='none';$('lt-body').style.display='block';
  render(N_DEFAULT,K_DEFAULT);
}).catch(function(e){$('lt-loading').innerHTML='데이터를 불러오지 못했어요 😢 잠시 후 다시 시도해 주세요.';});
})();
</script>

## 이 도구는 이렇게 만들었어요

- **역대 당첨번호 수집**: 동행복권이 공식 발표한 1회부터 최신 회차까지의 당첨번호(6개 + 보너스)를 모아 통계를 냈어요.
- **확률 가중 + 랜덤 혼합**: 추천은 **1세트(5게임)** 고정이에요. 각 게임의 6개 번호 중 **K개(기본 3개)는 확률 기반**으로 채워요 — 각 번호의 **최근 100회 출현확률**과 **역대 전체 출현확률**을 반반 가까이(α=0.45) 섞은 가중치로 뽑죠. 나머지 **(6−K)개는 순수 랜덤**이에요. 여기에 **홀짝 균형 · 합계 정상범위(100~175) · 과도한 연속수 회피** 규칙을 적용해요. K를 0으로 두면 완전 랜덤이 됩니다.
- **결정론적 재현 + 실적표**: 회차 번호를 시드로 써서 같은 회차는 항상 같은 추천이 나와요. 덕분에 "지난주 추천이 실제로 몇 개 맞았나"를 조작 없이 그대로 검증해 실적표로 보여줄 수 있어요.

> **꼭 기억하세요.** 로또는 완전한 무작위 추첨이라, 이렇게 정교하게 확률을 계산해도 **당첨 확률이 오르지 않습니다.** 실적표를 보면 대부분 미당첨이라는 게 정직한 현실이에요. 이 도구는 번호 고르는 재미와 통계 구경을 위한 것이지, 당첨을 보장하지 않아요. 즐기는 선에서만 이용하세요. 🎲
