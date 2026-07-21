---
title: "퇴직금 계산기 — 평균임금 기준 예상 퇴직금 (2026)"
description: "입사일·퇴사일과 최근 3개월 급여를 입력하면 1일 평균임금과 예상 퇴직금을 자동 계산합니다. 상여금·연차수당 반영, 2026년 기준 무료 계산기."
date: 2026-07-22
slug: "severance"
categories: ["도구"]
tags: ["퇴직금 계산기", "퇴직금 계산", "평균임금", "퇴직금 지급기준", "퇴직정산"]
toc: false
readingTime: false
---

입사일·퇴사일과 **최근 3개월 급여**를 넣으면 1일 평균임금과 예상 퇴직금을 계산합니다. 상여금·연차수당도 법정 방식대로 반영해요. (근로기준법 평균임금 기준 근사 계산)

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">입사일</span><input type="date" id="sv-in" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">퇴사일(마지막 근무 다음날)</span><input type="date" id="sv-out" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;"></label>
  </div>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">최근 3개월 급여 총액 (세전, 만원)</span><input type="tel" id="sv-pay" inputmode="numeric" placeholder="예: 900 (월300×3)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">연간 상여금 (만원, 선택)</span><input type="tel" id="sv-bonus" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">연차수당 (만원, 선택)</span><input type="tel" id="sv-annual" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <button id="sv-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">퇴직금 계산하기</button>
  <div id="sv-out2" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">예상 퇴직금 (세전)</div>
      <div id="sv-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="sv-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 1일 평균임금 = (3개월 급여 + 상여금×3/12 + 연차수당×3/12) ÷ 3개월 총일수. 퇴직금 = 1일 평균임금 × 30 × (재직일수 ÷ 365). 회사 규정·통상임금 비교 등으로 실제와 차이날 수 있어요. 1년 미만 근무는 퇴직금 대상이 아닙니다.</div>
  </div>
</div>
<style>#sv-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#sv-rows td:last-child{text-align:right;font-weight:700;}#sv-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){if(w>=100000000)return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';return Math.round(w).toLocaleString()+'원';}
$('sv-go').onclick=function(){
  var din=$('sv-in').value, dout=$('sv-out').value;
  var pay=(parseFloat($('sv-pay').value)||0)*10000;
  var bonus=(parseFloat($('sv-bonus').value)||0)*10000;
  var annual=(parseFloat($('sv-annual').value)||0)*10000;
  if(!din||!dout){alert('입사일과 퇴사일을 입력해 주세요');return;}
  var d1=new Date(din), d2=new Date(dout);
  var days=Math.round((d2-d1)/86400000);
  if(days<=0){alert('퇴사일이 입사일보다 뒤여야 해요');return;}
  if(days<365){alert('재직 1년 미만은 법정 퇴직금 대상이 아니에요 (재직일수 '+days+'일)');return;}
  // 최근 3개월 총일수(퇴사일 기준 역산 3개월)
  var d3=new Date(d2); d3.setMonth(d3.getMonth()-3);
  var months3=Math.round((d2-d3)/86400000);
  var base3=pay + bonus*3/12 + annual*3/12;
  var avgDaily=base3/months3;              // 1일 평균임금
  var severance=avgDaily*30*(days/365);
  $('sv-big').textContent=won(severance);
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  var yy=Math.floor(days/365), mm=Math.floor((days%365)/30);
  $('sv-rows').innerHTML=
    row('재직일수', days.toLocaleString()+'일 (약 '+yy+'년 '+mm+'개월)')
   +row('최근 3개월 총일수', months3+'일')
   +row('평균임금 산정 총액', won(base3))
   +row('1일 평균임금', won(avgDaily))
   +row('30일분 × (재직일수/365)', '30 × '+(days/365).toFixed(2))
   +row('예상 퇴직금', won(severance), true);
  $('sv-out2').style.display='block';
};
})();
</script>

## 퇴직금, 이렇게 계산돼요

- **대상**: 1주 15시간 이상, **1년 이상** 계속 근로한 근로자(정규·계약·알바 무관).
- **공식**: `퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)`
- **1일 평균임금**: 퇴직 전 **3개월간 받은 임금 총액**을 그 기간의 총일수로 나눈 값. 여기에 상여금·연차수당은 **연간액의 3/12**만큼 더해요.
- **통상임금과 비교**: 평균임금이 통상임금보다 적으면 통상임금으로 계산해요(근로자에게 유리한 쪽).
- 실제 지급은 회사 규정·퇴직연금(DC/DB) 형태에 따라 달라질 수 있어요. 정확한 금액은 [고용노동부 퇴직금 계산기](https://www.moel.go.kr/retirementpayCal.do)에서도 확인하세요.
