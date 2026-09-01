---
title: "2027 공휴일 달력 · 연차 황금연휴 추천 — 최소 연차로 최장 연휴"
description: "2027년 대한민국 법정공휴일·대체공휴일을 달력으로 한눈에. 공휴일과 주말을 이어 붙여 연차를 가장 적게 쓰고 가장 길게 쉬는 '황금연휴' 연차 사용일을 자동 추천합니다. 설날·추석·제헌절 부활까지 반영."
date: 2027-01-01
lastmod: 2026-09-01
slug: "holiday-2027"
categories: ["도구"]
tags: ["2027 공휴일", "2027 달력", "연차 추천", "황금연휴", "대체공휴일", "징검다리 연휴"]
aliases: ["/tools/chuseok/"]
toc: false
readingTime: false
---

2027년 **법정공휴일과 대체공휴일**을 달력으로 보여주고, 공휴일·주말을 이어 붙여 **연차를 가장 적게 쓰고 가장 길게 쉬는 날**을 자동으로 추천해요. (제헌절 공휴일 부활 반영)

<div class="pf-tool" style="max-width:940px;margin:0 auto;">
  <div id="h27-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:22px;"></div>
  <h2 style="font-size:19px;margin:6px 0 4px;">🏖️ 연차 황금연휴 추천</h2>
  <div style="font-size:13.5px;color:#6b7280;margin-bottom:12px;">공휴일 앞뒤 평일에 연차를 쓰면 며칠을 연속으로 쉴 수 있는지 계산했어요. 효율(연차 1일당 쉬는 날)이 높은 순서로 보여드려요.</div>
  <div id="h27-budget" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;"></div>
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
</style>
<script>
(function(){
var HOL={"2027-01-01":"신정","2027-02-06":"설날 연휴","2027-02-07":"설날","2027-02-08":"설날 연휴","2027-02-09":"설날 대체","2027-03-01":"삼일절","2027-05-05":"어린이날","2027-05-13":"부처님오신날","2027-06-06":"현충일","2027-07-17":"제헌절","2027-07-19":"제헌절 대체","2027-08-15":"광복절","2027-08-16":"광복절 대체","2027-09-14":"추석 연휴","2027-09-15":"추석","2027-09-16":"추석 연휴","2027-10-03":"개천절","2027-10-04":"개천절 대체","2027-10-09":"한글날","2027-10-11":"한글날 대체","2027-12-25":"성탄절","2027-12-27":"성탄절 대체"};
var WD=["일","월","화","수","목","금","토"];
function iso(dt){var m=(dt.getMonth()+1),d=dt.getDate();return "2027-"+(m<10?"0"+m:m)+"-"+(d<10?"0"+d:d);}
function fmt(dt){return (dt.getMonth()+1)+"/"+dt.getDate()+"("+WD[dt.getDay()]+")";}
var days=[];var dt=new Date(2027,0,1);
while(dt.getFullYear()===2027){var g=dt.getDay(),is=iso(dt),h=HOL[is]||null;days.push({dt:new Date(dt),iso:is,off:(g===0||g===6||!!h),hol:h,dow:g});dt.setDate(dt.getDate()+1);}
var n=days.length;
var totalOff=days.filter(function(x){return x.off;}).length;
var weekend=days.filter(function(x){return x.dow===0||x.dow===6;}).length;
var lawKeys=Object.keys(HOL);var subCount=lawKeys.filter(function(k){return HOL[k].indexOf("대체")>=0;}).length;
var weekdayHol=lawKeys.filter(function(k){var g=new Date(k).getDay();return g>=1&&g<=5;}).length;
var stats=[["법정공휴일",lawKeys.length+"일","대체공휴일 "+subCount+"일 포함"],["평일 공휴일",weekdayHol+"일","주말과 안 겹쳐 '진짜' 쉬는 빨간날"],["연간 쉬는 날",totalOff+"일","주말 "+weekend+"일 + 공휴일"],["최장 연휴 잠재력","최대 10일","연차 4일로 10월 황금연휴"]];
document.getElementById("h27-stats").innerHTML=stats.map(function(s){return '<div class="h27-stat"><div class="n">'+s[1]+'</div><div class="l">'+s[0]+'</div><div class="l" style="color:#8a8a8a;font-size:11px;">'+s[2]+'</div></div>';}).join("");
var blocks=[];var i=0;
while(i<n){if(days[i].off){var j=i;while(j<n&&days[j].off)j++;blocks.push([i,j-1]);i=j;}else i++;}
function hasHol(a,b){for(var k=a;k<=b;k++)if(days[k].hol)return true;return false;}
var cands=[];
for(var a=0;a<blocks.length;a++){var cost=0,leaves=[];for(var b=a+1;b<blocks.length;b++){var gs=blocks[b-1][1]+1,ge=blocks[b][0]-1;cost+=(ge-gs+1);for(var g=gs;g<=ge;g++)leaves.push(g);if(cost>4)break;if(hasHol(blocks[a][0],blocks[b][1])){var s=blocks[a][0],e=blocks[b][1];cands.push({cost:cost,tot:e-s+1,s:s,e:e,lv:leaves.slice()});}}}
cands.sort(function(p,q){return (q.tot/q.cost)-(p.tot/p.cost)||q.tot-p.tot;});
var picked=[],used={};
cands.forEach(function(c){for(var t=0;t<c.lv.length;t++)if(used[c.lv[t]])return;picked.push(c);c.lv.forEach(function(l){used[l]=1;});});
picked.sort(function(p,q){return p.s-q.s;});
function stars(r){return r>=4?"🔥🔥🔥":r>=2.5?"🔥🔥":"🔥";}
var cal=document.getElementById("h27-cal");var html="";
for(var mo=0;mo<12;mo++){var first=new Date(2027,mo,1);var start=first.getDay();var dim=new Date(2027,mo+1,0).getDate();html+='<div class="h27-mon"><h3>'+(mo+1)+'월</h3><div class="h27-grid">';for(var w=0;w<7;w++)html+='<div class="hd" style="color:'+(w===0?"#dc2626":w===6?"#2563eb":"#999")+'">'+WD[w]+'</div>';for(var e2=0;e2<start;e2++)html+='<div class="h27-cell empty"></div>';for(var dd=1;dd<=dim;dd++){var cd=new Date(2027,mo,dd);var g2=cd.getDay();var is2=iso(cd);var h2=HOL[is2];var cls="h27-cell"+(g2===0?" sun":g2===6?" sat":"")+(h2?" hol":"");html+='<div class="'+cls+'" data-iso="'+is2+'"><div class="dn">'+dd+'</div>'+(h2?'<div class="hn">'+h2+'</div>':'')+'</div>';}html+='</div></div>';}
cal.innerHTML=html;
function highlight(list){[].forEach.call(cal.querySelectorAll(".h27-cell.leave"),function(el){el.classList.remove("leave");var hn=el.querySelector(".hn.tag");if(hn)hn.remove();});list.forEach(function(c){c.lv.forEach(function(k){var el=cal.querySelector('[data-iso="'+days[k].iso+'"]');if(el){el.classList.add("leave");if(!el.querySelector(".hn")){var t=document.createElement("div");t.className="hn tag";t.textContent="연차";el.appendChild(t);}}});});}
function renderReco(v){var box=document.getElementById("h27-reco");var list=(v==="all")?picked:picked.filter(function(c){return c.cost===v;});if(!list.length){box.innerHTML='<div style="color:#888;font-size:14px;">연차 '+v+'일로 만드는 추천이 없어요.</div>';highlight([]);return;}box.innerHTML=list.map(function(c){var r=c.tot/c.cost;var lv=c.lv.map(function(k){return fmt(days[k].dt);}).join(", ");return '<div class="h27-card"><div class="top"><span class="rng">'+fmt(days[c.s].dt)+' ~ '+fmt(days[c.e].dt)+' · '+c.tot+'일 연속</span><span class="eff">'+stars(r)+' 효율 '+r.toFixed(1)+' (연차 '+c.cost+'일)</span></div><div class="lv">연차 쓸 날: <b>'+lv+'</b></div></div>';}).join("");highlight(list);}
var budgets=[["all","전체"],[1,"1일"],[2,"2일"],[3,"3일"],[4,"4일"]];
var bbox=document.getElementById("h27-budget");
bbox.innerHTML=budgets.map(function(b,idx){return '<button class="h27-b'+(idx===0?" on":"")+'" data-c="'+b[0]+'">'+b[1]+'</button>';}).join("");
bbox.addEventListener("click",function(ev){var t=ev.target;if(t.tagName!=="BUTTON")return;[].forEach.call(bbox.children,function(x){x.classList.remove("on");});t.classList.add("on");var v=t.getAttribute("data-c");renderReco(v==="all"?"all":+v);});
renderReco("all");
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
