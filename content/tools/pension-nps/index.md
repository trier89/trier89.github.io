---
title: "국민연금 예상 수령액 계산기 — 가입기간·소득 기준"
description: "국민연금 가입기간과 평균 소득을 입력하면 예상 노령연금 월 수령액을 계산합니다. 소득대체율·A값 반영 무료 계산기."
date: 2026-07-22
slug: "pension-nps"
categories: ["도구"]
tags: ["국민연금 예상수령액", "국민연금 계산기", "노령연금", "국민연금 수령액", "연금 계산"]
toc: false
readingTime: false
---

국민연금 **가입기간**과 **평균 소득**을 넣으면 예상 노령연금 월 수령액을 계산합니다. (기본연금액 산식 기준 추정)

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">총 가입기간 (년)</span><input type="tel" id="np-yr" inputmode="numeric" placeholder="예: 30" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">가입기간 평균 월소득 (만원)</span><input type="tel" id="np-inc" inputmode="numeric" placeholder="예: 300" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"><span style="font-size:12px;color:#999;">신고소득(기준소득월액) 평균. 잘 모르면 지금 월급 정도로.</span></label>
  <button id="np-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">예상연금 계산하기</button>
  <div id="np-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">예상 노령연금 (월, 현재가치)</div>
      <div id="np-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="np-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 기본연금액 = 상수(2026 약 1.245) × (A값 + 본인평균소득) × (1 + 0.05×(가입년수−20)) ÷ 12. A값(전체 가입자 평균소득)은 약 299만원(2025)으로 가정. 실제는 소득 재평가·부양가족연금·물가상승 등으로 달라지니, 정확한 건 <b>국민연금공단 '내 연금 알아보기'</b>에서 확인하세요.</div>
  </div>
</div>
<style>#np-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#np-rows td:last-child{text-align:right;font-weight:700;}#np-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){return Math.round(w).toLocaleString()+'원';}
var A=2989237, C=1.245;
$('np-go').onclick=function(){
  var y=parseFloat($('np-yr').value)||0;
  var B=(parseFloat($('np-inc').value)||0)*10000;
  if(!y||!B){alert('가입기간과 평균 소득을 입력해 주세요');return;}
  if(y<10){
    $('np-out').style.display='block';
    $('np-big').textContent='연금 대상 아님';
    $('np-rows').innerHTML='<tr><td colspan="2" style="color:#b91c1c;padding:10px;">가입기간이 10년(120개월) 미만이라 노령연금이 아니라 <b>반환일시금</b> 대상이에요. 10년만 채우면 평생 연금을 받아요.</td></tr>';
    return;
  }
  var yearBase=C*(A+B)*(1+0.05*(y-20));   // 연 기본연금액
  var monthly=yearBase/12;
  var rate=B>0?(monthly*12/(B*12)*100):0;  // 대략 소득대체율
  $('np-big').textContent=won(monthly);
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('np-rows').innerHTML=
    row('가입기간', y+'년')
   +row('본인 평균 월소득', won(B))
   +row('A값(전체 평균, 가정)', won(A))
   +row('연 기본연금액', won(yearBase))
   +row('예상 월 연금', won(monthly), true)
   +row('내 소득 대비 대체율', Math.round(rate)+'%');
  $('np-out').style.display='block';
};
})();
</script>

## 국민연금, 얼마나 받을까?

- **노령연금**은 **가입 10년(120개월) 이상**이면 만 65세부터(출생연도별 차등) 평생 받아요. 10년 미만이면 반환일시금이에요.
- **많이 받는 법**: 가입기간이 길수록 유리해요. 20년 넘으면 **1년마다 5%씩** 연금액이 늘어요.
- **소득 재분배**: 산식에 전체 가입자 평균소득(A값)이 들어가서, **소득이 낮을수록 낸 돈 대비 더 많이** 받는 구조예요.
- 이 계산기는 추정치예요. 소득 재평가율·물가상승·부양가족연금 등으로 실제와 차이나니, [국민연금공단 내 연금 알아보기](https://www.nps.or.kr)에서 정확히 확인하세요.
- 노후 준비는 국민연금 + [연금저축·IRP](/tools/year-end-tax/) + [배당](/tools/dividend/)를 함께 보면 좋아요.
