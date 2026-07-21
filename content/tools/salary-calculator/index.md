---
title: "연봉계산기 — 실수령액·4대보험 (연봉 역산 지원)"
description: "연봉을 입력하면 4대보험·소득세를 뗀 실수령액을, 반대로 실수령액이나 건강보험료를 입력하면 연봉을 역으로 계산합니다. 2026년 기준 무료 계산기."
date: 2026-07-21
slug: "salary-calculator"
categories: ["도구"]
tags: ["연봉 실수령액", "연봉 계산기", "실수령액 계산", "4대보험 계산기", "세후 월급"]
toc: false
readingTime: false
---

연봉을 입력하면 국민연금·건강보험·장기요양·고용보험과 소득세를 뗀 **실수령액**을 계산합니다. 반대로 **실수령액이나 건강보험료로 연봉을 역산**할 수도 있어요. (2026년 요율 기준, 비과세 월 20만원 가정)

<div id="salc" style="max-width:560px;margin:0 auto;">
  <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;">
    <button class="sc-tab" data-m="salary" style="flex:1;">연봉 → 실수령</button>
    <button class="sc-tab" data-m="net" style="flex:1;">실수령 → 연봉</button>
    <button class="sc-tab" data-m="health" style="flex:1;">건보료 → 연봉</button>
    <button class="sc-tab" data-m="pension" style="flex:1;">국민연금 → 연봉</button>
  </div>
  <div id="sc-inrow">
    <label style="display:block;font-weight:700;margin-bottom:6px;" id="sc-label">연봉 (세전, 만원)</label>
    <div style="display:flex;gap:8px;">
      <input type="tel" id="sc-val" inputmode="numeric" placeholder="예: 4000" style="flex:1;padding:13px;border:2px solid #ccc;border-radius:10px;font-size:17px;">
      <span id="sc-unit" style="align-self:center;color:#888;font-size:14px;">만원</span>
    </div>
    <div style="margin-top:10px;font-size:13px;color:#888;">부양가족 <input type="tel" id="sc-fam" inputmode="numeric" value="1" style="width:44px;padding:5px 8px;border:1px solid #ccc;border-radius:6px;text-align:center;">명 (본인 포함) · 20세 이하 자녀 <input type="tel" id="sc-child" inputmode="numeric" value="0" style="width:44px;padding:5px 8px;border:1px solid #ccc;border-radius:6px;text-align:center;">명</div>
    <button id="sc-go" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  </div>
  <div id="sc-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;">
      <div id="sc-big-label" style="font-size:14px;color:#555;">월 실수령액</div>
      <div id="sc-big" style="font-size:38px;font-weight:800;color:#047857;line-height:1.2;"></div>
      <div id="sc-big-sub" style="font-size:14px;color:#666;margin-top:2px;"></div>
    </div>
    <table style="width:100%;margin-top:14px;border-collapse:collapse;font-size:14.5px;">
      <tbody id="sc-rows"></tbody>
    </table>
  </div>
</div>

<style>
.sc-tab{padding:11px 8px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-weight:700;font-size:13.5px;cursor:pointer;}
.sc-tab.on{border-color:#059669;background:#ecfdf5;color:#047857;}
#sc-rows td{padding:9px 6px;border-bottom:1px solid #eee;}
#sc-rows td:last-child{text-align:right;font-weight:700;}
#sc-rows tr.tot td{border-top:2px solid #059669;border-bottom:none;color:#047857;font-weight:800;padding-top:12px;}
</style>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var mode='salary';
// 2026 요율 (근로자 부담분)
var NP=0.045, HI=0.03545, LTC=0.1295, EI=0.009;  // 국민연금4.5·건보3.545·장기요양(건보의12.95%)·고용0.9
var NP_CAP=6170000; // 국민연금 상한 기준소득월액(근사)
function won(n){return Math.round(n).toLocaleString()+'원';}
function manToWon(m){return m*10000;}
// 간이 소득세(월) — 근로소득 간이세액 근사(부양가족·자녀 반영 단순화)
function incomeTax(monthlyGross, fam, child){
  var taxable=Math.max(monthlyGross-200000,0); // 비과세 20만 가정
  // 과세표준 근사: 연 환산 후 근로소득공제·인적공제 반영
  var annual=taxable*12;
  var earnDed = annual<=5000000?annual*0.7 : annual<=15000000?3500000+(annual-5000000)*0.4 : annual<=45000000?7500000+(annual-15000000)*0.15 : annual<=100000000?12000000+(annual-45000000)*0.05 : 14750000+(annual-100000000)*0.02;
  var base=annual-earnDed-1500000*fam-1500000*child; // 기본공제 150만/인
  base=Math.max(base,0);
  var tax = base<=14000000?base*0.06 : base<=50000000?840000+(base-14000000)*0.15 : base<=88000000?6240000+(base-50000000)*0.24 : base<=150000000?15360000+(base-88000000)*0.35 : base*0.38;
  tax=Math.max(tax,0);
  var local=tax*0.1;
  return (tax+local)/12;
}
function deductions(monthlyGross, fam, child){
  var npBase=Math.min(monthlyGross,NP_CAP);
  var np=npBase*NP;
  var hi=monthlyGross*HI;
  var ltc=hi*LTC;
  var ei=monthlyGross*EI;
  var tax=incomeTax(monthlyGross,fam,child);
  return {np:np,hi:hi,ltc:ltc,ei:ei,tax:tax,total:np+hi+ltc+ei+tax};
}
function netFromGrossMonthly(g,fam,child){var d=deductions(g,fam,child);return g-d.total;}
// 역산: 목표 월실수령 → 세전 월급 (이분탐색)
function grossFromNet(targetNet,fam,child){
  var lo=targetNet, hi=targetNet*2.2;
  for(var i=0;i<40;i++){var m=(lo+hi)/2; if(netFromGrossMonthly(m,fam,child)<targetNet)lo=m;else hi=m;}
  return (lo+hi)/2;
}
// 역산: 월 건강보험료 → 세전 월급
function grossFromHealth(monthlyHI){ return monthlyHI/HI; }
// 역산: 월 국민연금 → 세전 월급 (상한 반영)
function grossFromPension(monthlyNP){ var g=monthlyNP/NP; return g>NP_CAP? (function(){alert("국민연금 상한(기준소득월액 "+NP_CAP.toLocaleString()+"원)을 초과해 정확한 역산이 어려워요. 상한 기준으로 표시합니다.");return NP_CAP;})() : g; }

var tabs=document.querySelectorAll('.sc-tab');
function setMode(m){
  mode=m;
  tabs.forEach(function(t){t.classList.toggle('on',t.dataset.m===m);});
  var lab=$('sc-label'),unit=$('sc-unit');
  if(m==='salary'){lab.textContent='연봉 (세전, 만원)';unit.textContent='만원';$('sc-val').placeholder='예: 4000';}
  if(m==='net'){lab.textContent='희망 월 실수령액 (만원)';unit.textContent='만원';$('sc-val').placeholder='예: 300';}
  if(m==='health'){lab.textContent='월 건강보험료 (원)';unit.textContent='원';$('sc-val').placeholder='예: 150000';}
  if(m==='pension'){lab.textContent='월 국민연금 (원)';unit.textContent='원';$('sc-val').placeholder='예: 180000';}
}
tabs.forEach(function(t){t.onclick=function(){setMode(t.dataset.m);};});
setMode('salary');

$('sc-go').onclick=function(){
  var v=parseFloat(($('sc-val').value||'').replace(/[^0-9.]/g,''));
  if(!v){alert('값을 입력해 주세요');return;}
  var fam=Math.max(parseInt($('sc-fam').value)||1,1), child=parseInt($('sc-child').value)||0;
  var gm; // 세전 월급
  if(mode==='salary'){gm=manToWon(v)/12;}
  else if(mode==='net'){gm=grossFromNet(manToWon(v),fam,child);}
  else if(mode==='health'){gm=grossFromHealth(v);}
  else {gm=grossFromPension(v);}
  var d=deductions(gm,fam,child);
  var net=gm-d.total;
  var annualGross=gm*12;
  $('sc-big-label').textContent='월 실수령액';
  $('sc-big').textContent=won(net);
  $('sc-big-sub').textContent='세전 연봉 '+won(annualGross)+' · 월급 '+won(gm);
  var rows=[
    ['세전 월급',won(gm)],
    ['국민연금 (4.5%)','-'+won(d.np)],
    ['건강보험 (3.545%)','-'+won(d.hi)],
    ['장기요양 (건보의 12.95%)','-'+won(d.ltc)],
    ['고용보험 (0.9%)','-'+won(d.ei)],
    ['소득세+지방세 (간이)','-'+won(d.tax)],
    ['공제 합계','-'+won(d.total)]
  ];
  var html='';
  rows.forEach(function(r){html+='<tr><td style="color:#555;">'+r[0]+'</td><td>'+r[1]+'</td></tr>';});
  html+='<tr class="tot"><td>월 실수령액</td><td>'+won(net)+'</td></tr>';
  html+='<tr class="tot"><td>연 실수령액</td><td>'+won(net*12)+'</td></tr>';
  $('sc-rows').innerHTML=html;
  $('sc-out').style.display='block';
};
})();
</script>

## 계산 기준 (2026년)

- **국민연금** 4.5%(근로자분, 기준소득월액 상한 있음) · **건강보험** 3.545% · **장기요양보험** 건강보험료의 12.95% · **고용보험** 0.9%
- **소득세**는 근로소득 간이세액을 근사 계산합니다(부양가족·자녀 수 반영). 실제 원천징수액은 회사 설정과 연말정산에서 달라질 수 있어요.
- **비과세**는 식대 등 월 20만원을 가정했습니다. 비과세 항목이 다르면 실수령액이 달라집니다.

### 역계산은 이렇게 써요

- **실수령 → 연봉**: "월 300만원 받으려면 연봉이 얼마여야 하지?"를 계산합니다.
- **건보료 → 연봉**: 건강보험료 고지서의 월 보험료로 대략적인 세전 소득을 역산합니다(직장가입자 보수월액 기준).

> 이 계산기는 참고용 근사치입니다. 정확한 금액은 국세청 홈택스·4대사회보험 정보연계센터에서 확인하세요.
