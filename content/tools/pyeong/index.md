---
title: "평수 ↔ ㎡ 변환기 — 평 제곱미터 자동 계산"
description: "평수를 제곱미터(㎡)로, 제곱미터를 평수로 바로 변환합니다. 아파트·부동산 면적 변환 무료 계산기."
date: 2026-07-22
slug: "pyeong"
categories: ["도구"]
tags: ["평수 계산기", "평 제곱미터 변환", "㎡ 평 변환", "면적 변환", "아파트 평수"]
toc: false
readingTime: false
---

평수를 **제곱미터(㎡)**로, 제곱미터를 **평수**로 바로 변환합니다. (1평 = 3.3058㎡)

<div class="pf-tool" style="max-width:460px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">평 (평수)</span><input type="tel" id="py-p" inputmode="decimal" placeholder="예: 34" style="width:100%;padding:14px;border:2px solid #ccc;border-radius:10px;font-size:18px;box-sizing:border-box;"></label>
  <div style="text-align:center;color:#059669;font-size:22px;margin:8px 0;">⇅</div>
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">제곱미터 (㎡)</span><input type="tel" id="py-m" inputmode="decimal" placeholder="예: 112.4" style="width:100%;padding:14px;border:2px solid #ccc;border-radius:10px;font-size:18px;box-sizing:border-box;"></label>
  <div id="py-out" style="margin-top:16px;text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;font-size:17px;color:#047857;font-weight:700;min-height:24px;"></div>
  <div id="py-quick" style="margin-top:14px;"></div>
  <div style="font-size:12px;color:#6b7280;margin-top:10px;">※ 1평 = 3.305785㎡ (= 400/121). 아파트 분양·등기부 면적은 ㎡로 표기해요. "국민평형 84㎡ = 약 25.4평(전용면적)".</div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var K=3.3057851;
var p=$('py-p'), m=$('py-m'), out=$('py-out');
function fmt(n){return (Math.round(n*100)/100).toLocaleString();}
p.addEventListener('input',function(){
  var v=parseFloat(p.value);
  if(isNaN(v)){m.value='';out.textContent='';return;}
  var mm=v*K; m.value=fmt(mm);
  out.textContent=fmt(v)+'평 = '+fmt(mm)+'㎡';
});
m.addEventListener('input',function(){
  var v=parseFloat(m.value);
  if(isNaN(v)){p.value='';out.textContent='';return;}
  var pp=v/K; p.value=fmt(pp);
  out.textContent=fmt(v)+'㎡ = '+fmt(pp)+'평';
});
// 자주 찾는 평형 빠른 표
var rows=[[59,'전용 59㎡'],[74,'전용 74㎡'],[84,'국민평형 84㎡'],[101,'전용 101㎡'],[114,'전용 114㎡']];
$('py-quick').innerHTML='<div style="font-size:13px;color:#555;margin-bottom:6px;font-weight:700;">자주 찾는 아파트 평형</div>'+
  rows.map(function(r){return '<div style="display:flex;justify-content:space-between;padding:6px 4px;border-bottom:1px solid #eee;font-size:14px;"><span>'+r[1]+'</span><b>약 '+fmt(r[0]/K)+'평</b></div>';}).join('');
})();
</script>

## 평수 변환, 이것만 알면 돼요

- **1평 = 3.3058㎡** (정확히는 400/121㎡). 반대로 **1㎡ = 0.3025평**.
- **빠른 암산**: ㎡에 **0.3**을 곱하면 대략 평수예요. (84㎡ × 0.3 ≈ 25평)
- **전용면적 vs 공급면적**: 아파트 "84㎡"는 보통 **전용면적**(약 25.4평)이고, 분양 광고의 "34평"은 발코니·공용부 포함 **공급면적**인 경우가 많아 서로 달라요.
- 등기부·분양계약서는 ㎡가 공식 단위예요.

## 왜 아직도 "평"을 쓸까요

공식 단위는 2007년부터 ㎡로 통일됐지만, 실생활에서는 여전히 "몇 평이냐"로 집 크기를 가늠하는 경우가 많아요. 오래 써온 감각이라 "34평이면 방 세 개에 거실이 넉넉하다"는 식으로 바로 그림이 그려지기 때문이에요. 그래서 부동산 앱이나 등기부에는 ㎡로 적혀 있지만, 머릿속에서는 평으로 바꿔 이해하는 분이 많아요. 위 변환기에 ㎡ 값을 넣으면 바로 평수로 바꿔주니, 매물을 볼 때 한 번씩 확인해두면 감을 잡기 편해요.

## 헷갈리기 쉬운 면적 개념

- **전용면적**: 현관 안쪽, 우리 집만 실제로 쓰는 공간이에요. 방·거실·주방·화장실이 여기 포함돼요. 아파트의 "84㎡"는 보통 이 전용면적이에요.
- **공급면적**: 전용면적에 계단·복도 같은 주거공용면적을 더한 값이에요. 분양 광고의 "34평"은 대개 이 공급면적 기준이라 전용면적보다 커요.
- **계약면적**: 공급면적에 지하주차장 같은 기타공용면적까지 더한 가장 넓은 개념이에요.

그래서 같은 집이라도 "전용 84㎡"와 "34평 아파트"가 동시에 쓰일 수 있어요. 매물을 비교할 때는 반드시 같은 기준(전용은 전용끼리)으로 견줘야 정확해요.

## 자주 묻는 질문

**Q. 84㎡는 몇 평인가요?**
전용 84㎡는 약 25.4평이에요. 다만 분양에서 "국민평형 84㎡"를 흔히 "34평형"이라 부르는데, 이건 공용면적까지 더한 공급면적 기준이라 그래요.

**Q. ㎡를 평으로 빠르게 암산하는 법이 있나요?**
㎡에 약 0.3을 곱하면 대략적인 평수가 나와요. 예를 들어 100㎡면 약 30평 정도예요. 정확한 값은 위 변환기로 확인하세요.

**Q. 평과 제곱미터 중 어느 게 공식 단위인가요?**
㎡가 법정 계량 단위예요. 등기부등본, 분양계약서, 공공 서류는 모두 ㎡로 표기해요. 평은 관습적으로만 쓰여요.

**Q. 부동산 세금 낼 때 평과 관련이 있나요?**
세금은 면적이 아니라 공시가격을 기준으로 계산돼요. 주택 보유세가 궁금하면 [재산세 계산기](/tools/property-tax/)로 확인해보세요.
