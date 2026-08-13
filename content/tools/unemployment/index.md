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

## 신청은 이런 순서로 진행돼요

- **이직 확인**: 퇴사하면 회사가 고용보험에 '이직확인서'와 상실 신고를 해요. 이게 처리돼야 신청이 가능하니, 처리 여부를 먼저 확인하세요.
- **워크넷 구직등록 + 수급자격 신청**: [고용24](https://www.work24.go.kr)에서 구직 등록을 하고, 온라인 교육을 들은 뒤 고용센터를 방문해 수급자격을 신청해요.
- **인정과 지급**: 수급자격이 인정되면, 이후 정해진 주기마다 **실업인정**(구직활동을 했다는 확인)을 받아야 그 기간분이 지급돼요. 활동 없이 자동으로 나오는 게 아니라는 점이 중요해요.
- **팁**: 퇴사가 예정돼 있다면 [퇴직금 계산기](/tools/severance/)로 목돈을, 이 계산기로 매달 들어올 구직급여를 함께 계산해 두면 실직 기간 생활비 계획을 세우기 좋아요.

## 자주 묻는 질문

**Q. 위 계산기 금액이 실제 받는 금액과 같나요?**
1일 상·하한과 나이·가입기간별 소정급여일수를 반영한 **예상치**예요. 실제 지급액은 이직 전 평균임금 산정 방식과 개별 사정에 따라 달라질 수 있으니, 확정 금액은 고용센터·고용24에서 확인하세요.

**Q. 자발적으로 퇴사하면 정말 못 받나요?**
원칙적으로는 비자발적 이직(권고사직·계약만료·경영상 해고 등)만 대상이에요. 다만 임금체불, 통근 곤란, 질병 등 법에서 정한 '정당한 사유'가 있으면 자발적 퇴사라도 인정되는 경우가 있으니 사유를 잘 기록해 두세요.

**Q. 왜 평균임금의 60%인데 상한·하한이 있나요?**
'평균임금의 60%'가 원칙이지만, 고소득자에게 너무 많이 나가지 않도록 **상한**을, 저소득자가 너무 적게 받지 않도록 **하한**을 둬요. 그래서 급여가 아주 높으면 상한에, 아주 낮으면 하한에 걸려요.

**Q. 소정급여일수는 어떻게 정해지나요?**
**나이(만 50세 기준)와 고용보험 가입기간**에 따라 정해져요. 나이가 많고 오래 가입했을수록 받는 기간이 길어지는 구조예요. 위 계산기에서 두 값을 고르면 자동으로 반영돼요.

**Q. 받는 도중에 취업하면 남은 금액은 사라지나요?**
소정급여일수가 남았는데 재취업하면, 요건을 채운 경우 **조기재취업수당** 등으로 일부를 받을 수 있어요. 자세한 조건은 고용센터에서 확인하세요.
