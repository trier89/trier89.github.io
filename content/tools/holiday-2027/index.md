---
title: "2027 공휴일 달력 · 연차 황금연휴 추천 — 최소 연차로 최장 연휴"
description: "2027년 대한민국 법정공휴일·대체공휴일을 달력으로 한눈에. 공휴일과 주말을 이어 붙여 연차를 가장 적게 쓰고 가장 길게 쉬는 '황금연휴' 연차 사용일을 자동 추천합니다. 내 연차 개수·쉴 수 없는 날·꼭 쉬어야 하는 날까지 넣으면 최적 조합을 짜줍니다. 제헌절·노동절 공휴일 반영."
date: 2027-01-01
lastmod: 2026-09-22
slug: "holiday-2027"
categories: ["도구"]
tags: ["2027 공휴일", "2027 달력", "연차 추천", "황금연휴", "대체공휴일", "징검다리 연휴"]
aliases: ["/tools/chuseok/"]
toc: false
readingTime: false
---

2027년 **법정공휴일과 대체공휴일**을 달력으로 보여주고, 공휴일·주말을 이어 붙여 **연차를 가장 적게 쓰고 가장 길게 쉬는 날**을 자동으로 추천해요. **쓸 수 있는 연차 개수**를 넣으면 그 안에서 가장 길게 쉬는 조합을 짜드려요. 연차를 쓸 수 없는 날과 꼭 쉬어야 하는 날도 반영합니다. (제헌절·노동절 공휴일 반영)

<div class="pf-tool" style="max-width:940px;margin:0 auto;">
  <div id="h27-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:22px;"></div>
  <h2 style="font-size:19px;margin:6px 0 4px;">🏖️ 내 연차로 짜는 최적 조합</h2>
  <div style="font-size:13.5px;color:#6b7280;margin-bottom:12px;">쓸 수 있는 연차 개수를 넣으면, 그 안에서 가장 길게 쉬는 조합을 계산해요. 연차를 쓸 수 없는 날과 꼭 쉬어야 하는 날도 넣을 수 있어요.</div>
  <div class="h27-panel">
    <div class="h27-row"><label for="h27-n"><b>쓸 수 있는 연차</b></label><input id="h27-n" type="number" min="0" max="30" step="1" value="10"><span>일</span><button id="h27-run" class="h27-go">최적 조합 계산</button></div>
    <div class="h27-row"><label for="h27-blk1">연차 쓸 수 없는 날</label><input id="h27-blk1" type="date" min="2027-01-01" max="2027-12-31"><span>~</span><input id="h27-blk2" type="date" min="2027-01-01" max="2027-12-31"><button class="h27-add" data-add="blk">추가</button></div>
    <div id="h27-blk-list" class="h27-chips"></div>
    <div class="h27-row"><label for="h27-must1">꼭 쉬어야 하는 날</label><input id="h27-must1" type="date" min="2027-01-01" max="2027-12-31"><span>~</span><input id="h27-must2" type="date" min="2027-01-01" max="2027-12-31"><button class="h27-add" data-add="must">추가</button></div>
    <div id="h27-must-list" class="h27-chips"></div>
  </div>
  <div id="h27-sum" class="h27-sum"></div>
  <div id="h27-reco" style="display:flex;flex-direction:column;gap:10px;"></div>
  <h2 style="font-size:19px;margin:30px 0 6px;">📅 2027년 달력</h2>
  <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;color:#555;margin-bottom:12px;"><span><span style="display:inline-block;width:11px;height:11px;background:#fdecec;border:1px solid #f3b4b4;border-radius:3px;vertical-align:-1px;"></span> 공휴일</span><span><span style="display:inline-block;width:11px;height:11px;background:#cdefe0;border:1px solid #58c69a;border-radius:3px;vertical-align:-1px;"></span> 연차 추천일</span><span style="color:#dc2626;">■</span> 일요일 <span style="color:#2563eb;">■</span> 토요일</div>
  <div id="h27-cal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;"></div>
</div>
<style>
#h27-stats .h27-stat{background:#fdf5f2;border-radius:12px;padding:14px 12px;text-align:center;}
#h27-stats .h27-stat .n{font-size:26px;font-weight:800;color:#c65f3f;line-height:1.15;}
#h27-stats .h27-stat .l{font-size:12.5px;color:#555;margin-top:3px;}
.h27-b{border:1px solid #d97757;background:#fff;color:#c65f3f;border-radius:16px;padding:6px 13px;font:inherit;font-size:13px;cursor:pointer;}
.h27-b.on{background:#d97757;color:#fff;}
.h27-card{border:1px solid #eee;border-left:4px solid #d97757;border-radius:10px;padding:12px 14px;}
.h27-card .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap;}
.h27-card .rng{font-size:16px;font-weight:800;color:#c65f3f;}
.h27-card .eff{font-size:12.5px;color:#6b7280;white-space:nowrap;}
.h27-card .lv{font-size:13.5px;color:#333;margin-top:5px;}
.h27-card .lv b{color:#1d4ed8;}
.h27-mon{border:1px solid #eee;border-radius:12px;padding:12px 12px 14px;}
.h27-mon h3{font-size:15px;font-weight:800;margin:0 0 8px;color:#333;}
.h27-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
.h27-grid .hd{font-size:11px;text-align:center;color:#999;padding:2px 0;font-weight:700;}
.h27-cell{min-height:44px;border-radius:6px;padding:3px 2px 2px;font-size:12px;text-align:center;position:relative;}
.h27-cell .dn{font-weight:700;font-size:13px;}
.h27-cell .hn{font-size:9px;line-height:1.1;color:#c65f3f;margin-top:1px;word-break:keep-all;}
.h27-cell.sun .dn{color:#dc2626;}
.h27-cell.sat .dn{color:#2563eb;}
.h27-cell.hol{background:#fdecec;}
.h27-cell.hol .dn{color:#dc2626;}
.h27-cell.leave{background:#cdefe0;box-shadow:inset 0 0 0 1px #58c69a;}
.h27-cell.leave .dn{color:#0f9d63;}
.h27-cell.leave .hn{color:#0f9d63;}
.h27-cell.empty{background:transparent;}
.h27-panel{background:#fbf7f5;border:1px solid #f0e4de;border-radius:12px;padding:14px 14px 10px;margin-bottom:16px;}
.h27-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;font-size:13.5px;color:#444;}
.h27-row label{min-width:112px;}
.h27-row input[type=number]{width:72px;padding:6px 8px;border:1px solid #ddd;border-radius:8px;font:inherit;font-size:14px;}
.h27-row input[type=date]{padding:6px 8px;border:1px solid #ddd;border-radius:8px;font:inherit;font-size:13px;}
.h27-add{border:1px solid #d9d0cb;background:#fff;color:#555;border-radius:16px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;}
.h27-go{border:0;background:#d97757;color:#fff;border-radius:18px;padding:8px 18px;font:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-left:auto;}
.h27-chips{display:flex;gap:6px;flex-wrap:wrap;margin:-4px 0 10px;}
.h27-chip{background:#fff;border:1px solid #e3d8d2;border-radius:14px;padding:4px 10px;font-size:12.5px;color:#555;display:flex;align-items:center;gap:6px;}
.h27-chip.must{border-color:#9ecfb6;color:#0f7a51;}
.h27-chip button{border:0;background:none;color:#aaa;font-size:15px;line-height:1;cursor:pointer;padding:0;}
.h27-sum{background:#fff;border:1px solid #eee;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:14px;color:#333;display:none;}
.h27-sum b{color:#c65f3f;}
.h27-sum .warn{color:#b45309;font-size:13px;margin-top:6px;display:block;}
.h27-cell.must{background:#e6f0ff;box-shadow:inset 0 0 0 1px #7aa7e8;}
.h27-cell.must .dn{color:#1d4ed8;}
.h27-cell.blk{opacity:.45;}
@media(max-width:480px){.h27-row label{min-width:100%;}.h27-go{margin-left:0;width:100%;}}
</style>
<script>
(function(){
var HOL={"2027-01-01":"신정","2027-02-06":"설날 연휴","2027-02-07":"설날","2027-02-08":"설날 연휴","2027-02-09":"설날 대체","2027-03-01":"삼일절","2027-05-01":"노동절","2027-05-03":"노동절 대체","2027-05-05":"어린이날","2027-05-13":"부처님오신날","2027-06-06":"현충일","2027-07-17":"제헌절","2027-07-19":"제헌절 대체","2027-08-15":"광복절","2027-08-16":"광복절 대체","2027-09-14":"추석 연휴","2027-09-15":"추석","2027-09-16":"추석 연휴","2027-10-03":"개천절","2027-10-04":"개천절 대체","2027-10-09":"한글날","2027-10-11":"한글날 대체","2027-12-25":"성탄절","2027-12-27":"성탄절 대체"};
var WD=["일","월","화","수","목","금","토"];
var LS="pf_h27_v2";
function pad(n){return n<10?"0"+n:""+n;}
function iso(dt){return "2027-"+pad(dt.getMonth()+1)+"-"+pad(dt.getDate());}
function fmt(dt){return (dt.getMonth()+1)+"/"+dt.getDate()+"("+WD[dt.getDay()]+")";}
function parseIso(v){var p=v.split("-");return new Date(+p[0],+p[1]-1,+p[2]);}
var blkRanges=[],mustRanges=[];
function expand(list){var out={};list.forEach(function(r){var d=parseIso(r[0]),e=parseIso(r[1]);while(d<=e){if(d.getFullYear()===2027)out[iso(d)]=1;d.setDate(d.getDate()+1);}});return out;}
function save(){try{localStorage.setItem(LS,JSON.stringify({n:document.getElementById("h27-n").value,b:blkRanges,m:mustRanges}));}catch(e){}}
function load(){try{var v=JSON.parse(localStorage.getItem(LS)||"null");if(!v)return;if(v.n)document.getElementById("h27-n").value=v.n;if(v.b)blkRanges=v.b;if(v.m)mustRanges=v.m;}catch(e){}}
function build(mustSet){var days=[],dt=new Date(2027,0,1);while(dt.getFullYear()===2027){var g=dt.getDay(),is=iso(dt),h=HOL[is]||null;var base=(g===0||g===6||!!h);days.push({dt:new Date(dt),iso:is,dow:g,hol:h,base:base,off:base||!!mustSet[is]});dt.setDate(dt.getDate()+1);}return days;}
var baseDays=build({});
var totalOff=baseDays.filter(function(x){return x.base;}).length;
var weekend=baseDays.filter(function(x){return x.dow===0||x.dow===6;}).length;
var lawKeys=Object.keys(HOL),subCount=lawKeys.filter(function(k){return HOL[k].indexOf("대체")>=0;}).length;
var weekdayHol=lawKeys.filter(function(k){var g=parseIso(k).getDay();return g>=1&&g<=5;}).length;
var stats=[["법정공휴일",lawKeys.length+"일","대체공휴일 "+subCount+"일 포함"],["평일 공휴일",weekdayHol+"일","주말과 안 겹쳐 '진짜' 쉬는 빨간날"],["연간 쉬는 날",totalOff+"일","주말 "+weekend+"일 + 공휴일"],["최장 연휴 잠재력","최대 10일","연차 4일로 10월 황금연휴"]];
document.getElementById("h27-stats").innerHTML=stats.map(function(s){return '<div class="h27-stat"><div class="n">'+s[1]+'</div><div class="l">'+s[0]+'</div><div class="l" style="color:#8a8a8a;font-size:11px;">'+s[2]+'</div></div>';}).join("");
var cal=document.getElementById("h27-cal"),html="";
for(var mo=0;mo<12;mo++){var first=new Date(2027,mo,1),start=first.getDay(),dim=new Date(2027,mo+1,0).getDate();html+='<div class="h27-mon"><h3>'+(mo+1)+'월</h3><div class="h27-grid">';for(var w=0;w<7;w++)html+='<div class="hd" style="color:'+(w===0?"#dc2626":w===6?"#2563eb":"#999")+'">'+WD[w]+'</div>';for(var e2=0;e2<start;e2++)html+='<div class="h27-cell empty"></div>';for(var dd=1;dd<=dim;dd++){var cd=new Date(2027,mo,dd),g2=cd.getDay(),is2=iso(cd),h2=HOL[is2];var cls="h27-cell"+(g2===0?" sun":g2===6?" sat":"")+(h2?" hol":"");html+='<div class="'+cls+'" data-iso="'+is2+'"><div class="dn">'+dd+'</div>'+(h2?'<div class="hn">'+h2+'</div>':'')+'</div>';}html+='</div></div>';}
cal.innerHTML=html;
function paint(leaves,mustSet,blkSet){[].forEach.call(cal.querySelectorAll(".h27-cell"),function(el){el.classList.remove("leave","must","blk");var t=el.querySelector(".hn.tag");if(t)t.remove();});function tag(is,cls,label){var el=cal.querySelector('[data-iso="'+is+'"]');if(!el)return;el.classList.add(cls);if(label&&!el.querySelector(".hn")){var d=document.createElement("div");d.className="hn tag";d.textContent=label;el.appendChild(d);}}
Object.keys(blkSet).forEach(function(is){tag(is,"blk",null);});leaves.forEach(function(is){tag(is,"leave","연차");});Object.keys(mustSet).forEach(function(is){tag(is,"must","필수");});}
function chips(){var bl=document.getElementById("h27-blk-list"),ml=document.getElementById("h27-must-list");function row(list,cls){return list.map(function(r,i){var t=r[0]===r[1]?r[0].slice(5).replace("-","/"):r[0].slice(5).replace("-","/")+"~"+r[1].slice(5).replace("-","/");return '<span class="h27-chip '+cls+'">'+t+'<button data-k="'+cls+'" data-i="'+i+'">×</button></span>';}).join("");}
bl.innerHTML=row(blkRanges,"blk");ml.innerHTML=row(mustRanges,"must");}
function solve(){var N=Math.max(0,Math.min(30,parseInt(document.getElementById("h27-n").value,10)||0));
var blkSet=expand(blkRanges),mustSetRaw=expand(mustRanges),mustSet={};
Object.keys(mustSetRaw).forEach(function(is){var d=parseIso(is),g=d.getDay();if(g!==0&&g!==6&&!HOL[is])mustSet[is]=1;});
var conflict=Object.keys(mustSet).filter(function(is){return blkSet[is];});
var days=build(mustSet),n=days.length,mustCost=Object.keys(mustSet).length,rem=N-mustCost;
var blocks=[],i=0;while(i<n){if(days[i].off){var j=i;while(j<n&&days[j].off)j++;blocks.push([i,j-1]);i=j;}else i++;}
var m=blocks.length,cands=[];
for(var a2=0;a2<m;a2++){var cost=0,lv=[],ok=true;for(var b2=a2+1;b2<m&&cost<=Math.max(rem,0);b2++){var gs=blocks[b2-1][1]+1,ge=blocks[b2][0]-1;for(var g2=gs;g2<=ge;g2++){if(blkSet[days[g2].iso]){ok=false;break;}lv.push(g2);}cost=lv.length;if(!ok)break;if(cost>rem)break;cands.push({a:a2,b:b2,cost:cost,s:blocks[a2][0],e:blocks[b2][1],tot:blocks[b2][1]-blocks[a2][0]+1,lv:lv.slice()});}}
var byStart={};cands.forEach(function(c){(byStart[c.a]=byStart[c.a]||[]).push(c);});
var memo={};
function best(bi,budget){if(bi>=m)return{tot:0,pick:[]};var key=bi+"|"+budget;if(memo[key])return memo[key];var r=best(bi+1,budget),out={tot:r.tot,pick:r.pick};var list=byStart[bi]||[];for(var k=0;k<list.length;k++){var c=list[k];if(c.cost>budget||c.cost===0)continue;var nx=best(c.b+1,budget-c.cost);var t=c.tot+nx.tot;if(t>out.tot||(t===out.tot&&false)){out={tot:t,pick:[c].concat(nx.pick)};}}memo[key]=out;return out;}
var res=(rem>0&&m>0)?best(0,rem):{tot:0,pick:[]};
var picks=res.pick,usedLeave=[];picks.forEach(function(c){c.lv.forEach(function(k){usedLeave.push(days[k].iso);});});
var box=document.getElementById("h27-reco"),sum=document.getElementById("h27-sum");
var longest=0;picks.forEach(function(c){if(c.tot>longest)longest=c.tot;});
var mustList=Object.keys(mustSet).sort();
var runTotal=picks.reduce(function(x,c){return x+c.tot;},0);
sum.style.display="block";
var parts=['연차 <b>'+N+'일</b> 중 <b>'+(usedLeave.length+mustCost)+'일</b>을 썼어요.'];
if(mustCost)parts.push('(필수 지정 '+mustCost+'일 포함)');
if(picks.length)parts.push('연휴 <b>'+picks.length+'개</b>를 만들었고, 가장 긴 연휴는 <b>'+longest+'일</b>이에요. 이 연휴들로 쉬는 날은 모두 <b>'+runTotal+'일</b>이에요.');
else parts.push('연차로 이어 붙일 수 있는 연휴가 없어요. 연차 개수를 늘리거나 제외 구간을 줄여보세요.');
var warn="";
if(rem<0)warn+='<span class="warn">⚠️ 꼭 쉬어야 하는 날('+mustCost+'일)이 연차 개수보다 많아요. 연차를 '+(mustCost-N)+'일 더 써야 합니다.</span>';
if(conflict.length)warn+='<span class="warn">⚠️ '+conflict.map(function(x){return x.slice(5).replace("-","/");}).join(", ")+'은(는) 쓸 수 없는 날인데 필수로도 지정돼 있어요. 필수를 우선했습니다.</span>';
sum.innerHTML=parts.join(" ")+warn;
box.innerHTML=picks.length?picks.map(function(c){var r=(c.tot/c.cost),lv=c.lv.map(function(k){return fmt(days[k].dt);}).join(", ");var star=r>=4?"🔥🔥🔥":r>=2.5?"🔥🔥":"🔥";return '<div class="h27-card"><div class="top"><span class="rng">'+fmt(days[c.s].dt)+' ~ '+fmt(days[c.e].dt)+' · '+c.tot+'일 연속</span><span class="eff">'+star+' 효율 '+r.toFixed(1)+' (연차 '+c.cost+'일)</span></div><div class="lv">연차 쓸 날: <b>'+lv+'</b></div></div>';}).join(""):"";
if(mustList.length)box.innerHTML+='<div class="h27-card" style="border-left-color:#7aa7e8;"><div class="top"><span class="rng" style="color:#1d4ed8;">필수 연차 '+mustCost+'일</span></div><div class="lv">'+mustList.map(function(is){return fmt(parseIso(is));}).join(", ")+'</div></div>';
paint(usedLeave,mustSet,blkSet);save();}
document.querySelector(".h27-panel").addEventListener("click",function(ev){var t=ev.target;if(t.classList.contains("h27-add")){var k=t.getAttribute("data-add");var i1=document.getElementById(k==="blk"?"h27-blk1":"h27-must1"),i2=document.getElementById(k==="blk"?"h27-blk2":"h27-must2");var v1=i1.value,v2=i2.value||i1.value;if(!v1)return;if(v2<v1){var tmp=v1;v1=v2;v2=tmp;}(k==="blk"?blkRanges:mustRanges).push([v1,v2]);i1.value="";i2.value="";chips();solve();}}
);
document.addEventListener("click",function(ev){var t=ev.target;if(t.tagName==="BUTTON"&&t.getAttribute("data-i")!==null&&t.getAttribute("data-k")){var k=t.getAttribute("data-k"),i=+t.getAttribute("data-i");(k==="blk"?blkRanges:mustRanges).splice(i,1);chips();solve();}});
document.getElementById("h27-run").addEventListener("click",solve);
document.getElementById("h27-n").addEventListener("change",solve);
load();chips();solve();
})();
</script>

## 2027년 공휴일, 이렇게 활용하세요

- **설날 (2/6~2/9)**: 토·일·월 연휴에 일요일이 겹쳐 **2/9(화)가 대체공휴일**이에요. 2/10~2/12 사흘 연차를 붙이면 **2/6부터 2/14까지 9일 연속** 쉴 수 있어요.
- **추석 (9/14~9/16)**: 화·수·목이라 앞뒤로 연차 하루씩만 붙여도 큰 연휴가 돼요. **9/13(금) 하루 연차면 9/11~9/16 6일**, 반대로 **9/17(금) 하루면 9/14~9/19 6일**입니다.
- **10월 황금연휴**: 개천절(10/3)·한글날(10/9)이 몰려 있어 **10/5~10/8 나흘 연차로 10/2부터 10/11까지 무려 10일**을 이어 쉴 수 있어요.
- **제헌절 부활**: 2026년 법 개정으로 **7월 17일 제헌절이 18년 만에 공휴일로 부활**했어요. 2027년엔 토요일이라 **7/19(월)이 대체공휴일**이 됩니다.

## 자주 묻는 질문

**2027년 공휴일은 며칠인가요?**
대체공휴일 6일을 포함해 법정공휴일은 총 22일이에요. 이 중 주말과 겹치지 않고 평일에 놓여 실제로 하루를 더 쉬게 해주는 '빨간날'은 위 계산기의 요약에서 확인할 수 있어요.

**대체공휴일은 어떻게 정해지나요?**
설날·추석 연휴, 삼일절, 어린이날, 부처님오신날, 광복절, 개천절, 한글날, 제헌절, 성탄절이 토요일·일요일 또는 다른 공휴일과 겹치면 그다음 첫 평일이 대체공휴일이 돼요. 다만 **신정과 현충일은 대체공휴일이 적용되지 않아요.**

**연차를 며칠 쓰는 게 가장 효율적인가요?**
공휴일과 주말 사이에 낀 평일(징검다리)에 연차를 쓰는 게 가장 이득이에요. 위 추천은 '연차 1일당 며칠을 쉬는지(효율)'가 높은 순서로 정렬돼 있으니, 효율 숫자가 큰 것부터 챙기면 적은 연차로 길게 쉴 수 있어요.

---

📅 관련 도구 → [디데이 계산기](/tools/dday/) · [날짜 계산기](/tools/date-calc/) · [만 나이 계산기](/tools/age-calculator/)
