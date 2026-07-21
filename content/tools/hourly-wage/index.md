---
title: "주휴수당·시급 계산기 — 주급·월급 환산 (2026 최저 10,320원)"
description: "시급과 주 근로시간을 입력하면 주휴수당과 주급·월급 환산액을 계산합니다. 2026년 최저임금 10,320원 기준 알바·파트타임 무료 계산기."
date: 2026-07-22
slug: "hourly-wage"
categories: ["도구"]
tags: ["주휴수당 계산기", "시급 계산기", "최저임금 2026", "알바 월급", "주급 계산"]
toc: false
readingTime: false
---

시급과 **주 근로시간**을 넣으면 주휴수당과 주급·월급 환산액을 계산합니다. 2026년 최저임금은 **시간당 10,320원**이에요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">시급 (원)</span><input type="tel" id="hw-rate" inputmode="numeric" value="10320" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">주 근로시간</span><input type="tel" id="hw-hrs" inputmode="decimal" placeholder="예: 20" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <button id="hw-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="hw-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">주휴수당 포함 · 월급 환산</div>
      <div id="hw-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="hw-rows"></tbody></table>
    <div id="hw-tip" style="margin-top:12px;font-size:13.5px;"></div>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 주휴수당 = (주 근로시간 ÷ 40) × 8 × 시급, <b>주 15시간 이상</b> 근무 시 지급. 월급 환산은 주급 × 4.345주(=52.14주/12개월). 4대보험·세금 공제 전 금액이에요.</div>
  </div>
</div>
<style>#hw-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#hw-rows td:last-child{text-align:right;font-weight:700;}#hw-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){return Math.round(w).toLocaleString()+'원';}
var MIN=10320;
$('hw-go').onclick=function(){
  var rate=parseFloat($('hw-rate').value)||0;
  var hrs=parseFloat($('hw-hrs').value)||0;
  if(!rate||!hrs){alert('시급과 주 근로시간을 입력해 주세요');return;}
  var weekWork=rate*hrs;
  var holiHours = hrs>=15 ? Math.min(hrs,40)/40*8 : 0;
  var holiPay=holiHours*rate;
  var weekTotal=weekWork+holiPay;
  var month=weekTotal*4.345;
  $('hw-big').textContent=won(month);
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('hw-rows').innerHTML=
    row('주 근로수당 ('+hrs+'시간)', won(weekWork))
   +row('주휴수당'+(hrs>=15?' ('+holiHours.toFixed(1)+'시간분)':' (주15시간 미만=없음)'), won(holiPay))
   +row('주급 (주휴 포함)', won(weekTotal), true)
   +row('월급 환산 (×4.345주)', won(month))
   +row('연봉 환산', won(month*12));
  var tips=[];
  if(rate<MIN) tips.push('<div style="padding:10px 12px;background:#fef2f2;border-radius:8px;color:#b91c1c;">⚠️ 시급이 2026년 최저임금(10,320원)보다 낮아요. 최저임금 위반일 수 있어요.</div>');
  if(hrs>=15) tips.push('<div style="padding:10px 12px;background:#fffbeb;border-radius:8px;">💡 주 15시간 이상이라 <b>주휴수당</b>을 받을 수 있어요. 안 주면 임금체불이에요.</div>');
  else tips.push('<div style="padding:10px 12px;background:#fffbeb;border-radius:8px;">💡 주 15시간 미만은 주휴수당이 없어요. 15시간만 넘겨도 주휴수당이 붙어요.</div>');
  if(hrs>40) tips.push('<div style="padding:10px 12px;background:#eff6ff;border-radius:8px;">📌 주 40시간 초과분은 <b>연장근로수당(1.5배)</b> 대상이에요(5인 이상 사업장). 이 계산기엔 미반영.</div>');
  $('hw-tip').innerHTML=tips.join('');
  $('hw-out').style.display='block';
};
})();
</script>

## 주휴수당, 놓치지 마세요

- **주휴수당**이란: 1주 동안 정해진 근무일을 다 채우면, **일하지 않은 하루치 임금**을 더 주는 제도예요.
- **조건**: 1주 **소정근로시간 15시간 이상** + 그 주의 소정근로일을 개근.
- **계산**: `주휴수당 = (주 근로시간 ÷ 40) × 8 × 시급`. 주 40시간이면 8시간분, 주 20시간이면 4시간분이에요.
- **2026년 최저임금**: 시간당 **10,320원**(2025년보다 2.9% 인상). 주 40시간+주휴 기준 월 약 215만 원.
- 알바·파트타임도 주휴수당 대상이에요. 안 주면 임금체불로 신고할 수 있어요.
