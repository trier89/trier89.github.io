---
title: "실업급여 계산기 — 1일 수령액·소정급여일수·총액 (2026)"
description: "이직 전 급여와 나이·고용보험 가입기간을 입력하면 실업급여(구직급여) 1일 수령액과 받는 기간, 총 예상액을 계산합니다. 2026년 상·하한 반영 무료 계산기."
date: 2026-07-22
slug: "unemployment"
categories: ["도구"]
tags: ["실업급여 계산기", "구직급여", "실업급여 조건", "소정급여일수", "실업급여 수령액"]
toc: false
readingTime: false
---

이직 전 급여와 **나이·고용보험 가입기간**을 넣으면 실업급여(구직급여) 1일 수령액과 받는 기간, 총 예상액을 계산합니다. (2026년 상한 66,000원·하한 63,104원 기준)

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">이직 전 월평균 급여 (세전, 만원)</span><input type="tel" id="ue-pay" inputmode="numeric" placeholder="예: 300" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">이직 당시 나이</span>
      <select id="ue-age" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;">
        <option value="0">만 50세 미만</option>
        <option value="1">만 50세 이상 · 장애인</option>
      </select></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">고용보험 가입기간</span>
      <select id="ue-yr" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;">
        <option value="0">1년 미만</option>
        <option value="1">1년~3년</option>
        <option value="2">3년~5년</option>
        <option value="3">5년~10년</option>
        <option value="4">10년 이상</option>
      </select></label>
  </div>
  <button id="ue-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">실업급여 계산하기</button>
  <div id="ue-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">총 예상 실업급여</div>
      <div id="ue-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="ue-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 1일 구직급여 = 이직 전 1일 평균임금의 60% (2026년 상한 66,000원·하한 63,104원). 소정급여일수는 나이·가입기간별. 실제 수급은 <b>이직 사유(비자발적)</b>·적극적 구직활동 등 요건 충족 시에만 지급돼요. 정확한 금액은 고용24(고용보험) 사이트에서 확인하세요.</div>
  </div>
</div>
<style>#ue-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#ue-rows td:last-child{text-align:right;font-weight:700;}#ue-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){if(w>=100000000)return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';return Math.round(w).toLocaleString()+'원';}
// 소정급여일수 [나이<50, 나이>=50][가입기간 index]
var DAYS=[[120,150,180,210,240],[120,180,210,240,270]];
var CAP=66000, FLOOR=63104;  // 2026 1일 상·하한
$('ue-go').onclick=function(){
  var pay=(parseFloat($('ue-pay').value)||0)*10000;
  if(!pay){alert('이직 전 월평균 급여를 입력해 주세요');return;}
  var age=parseInt($('ue-age').value), yr=parseInt($('ue-yr').value);
  var avgDaily=pay/30;                         // 1일 평균임금
  var raw=avgDaily*0.6;                          // 60%
  var daily=Math.min(Math.max(raw,FLOOR),CAP);   // 상·하한 적용
  var sday=DAYS[age][yr];
  var total=daily*sday;
  $('ue-big').textContent=won(total);
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  var capNote = raw>CAP?' (상한 적용)':(raw<FLOOR?' (하한 적용)':'');
  $('ue-rows').innerHTML=
    row('1일 평균임금', won(avgDaily))
   +row('1일 구직급여 (평균임금×60%)'+capNote, won(daily))
   +row('소정급여일수', sday+'일 (약 '+Math.round(sday/30*10)/10+'개월)')
   +row('총 예상 수령액', won(total), true)
   +row('월 환산(30일 기준)', won(daily*30));
  $('ue-out').style.display='block';
};
})();
</script>

## 실업급여, 이렇게 정해져요

- **1일 구직급여** = 이직 전 1일 평균임금 × **60%**. 단 2026년 기준 **상한 66,000원 / 하한 63,104원** 안에서.
- **소정급여일수**(받는 기간)는 나이와 고용보험 가입기간에 따라 **120일~270일**.
  - 만 50세 미만: 120 / 150 / 180 / 210 / 240일
  - 만 50세 이상·장애인: 120 / 180 / 210 / 240 / 270일
- **받을 수 있는 조건**: 비자발적 이직(권고사직·계약만료 등), 고용보험 180일 이상 가입, 적극적 재취업 활동. 자발적 퇴사는 원칙적으로 제외돼요.
- 정확한 신청·수급은 [고용24](https://www.work24.go.kr) 또는 고용센터에서 확인하세요.
