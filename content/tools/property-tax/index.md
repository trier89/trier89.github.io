---
title: "재산세 계산기 — 주택 공시가격으로 재산세·도시지역분·지방교육세"
description: "주택 공시가격과 1주택자 여부를 입력하면 과세표준, 재산세 본세(누진세율), 도시지역분, 지방교육세, 총 납부액을 계산합니다. 9월 재산세 2기분 납부기간(9/16~9/30) 확인. 2026년 기준 무료 재산세 계산기."
date: 2026-07-22
slug: "property-tax"
categories: ["도구"]
tags: ["재산세 계산기", "주택 재산세", "재산세 과세표준", "1주택자 특례", "도시지역분"]
toc: false
readingTime: false
---

주택 **공시가격**과 **1세대 1주택자** 여부를 넣으면 과세표준·재산세 본세·도시지역분·지방교육세와 **총 납부액**을 계산합니다. (2026년 주택 기준)

> 📅 **9월은 재산세 2기분 납부의 달!** 주택 재산세 **2기분 납부기간은 9월 16일~9월 30일**이에요(1기분은 7/16~7/31). 기한을 넘기면 3%의 납부지연가산세가 붙으니 잊지 말고 챙기세요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">주택 공시가격 (만원)</span><input type="tel" id="pt-price" inputmode="numeric" placeholder="예: 30000 (3억원)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <label style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:14px;"><input type="checkbox" id="pt-one" style="width:17px;height:17px;"> 1세대 1주택자 (공정시장가액비율 특례 43~45%)</label>
  <label style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px;"><input type="checkbox" id="pt-urban" checked style="width:17px;height:17px;"> 도시지역(재산세 도시지역분 부과)</label>
  <button id="pt-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#d97757;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="pt-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#fdf5f2;">
      <div style="font-size:15px;color:#555;">총 납부액 (재산세+도시지역분+지방교육세)</div>
      <div id="pt-big" style="font-size:30px;font-weight:800;color:#c65f3f;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="pt-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 과세표준=공시가격×공정시장가액비율(주택 60%, 1주택 특례 3억↓ 43%·3억~6억 44%·6억↑ 45%). 재산세 본세=주택 누진세율(6천만↓ 0.1%, ~1.5억 0.15%, ~3억 0.25%, 3억↑ 0.4%). 도시지역분=과세표준×0.14%. 지방교육세=재산세 본세×20%. 1주택 특례세율(0.05~0.4%)은 별도로, 여기선 표준세율 기준입니다.</div>
  </div>
</div>
<style>#pt-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#pt-rows td:last-child{text-align:right;font-weight:700;}#pt-rows tr.hl td{color:#c65f3f;border-top:2px solid #d97757;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){return Math.round(w).toLocaleString()+'원';}
// 주택 표준세율 누진(과세표준 기준), 누진공제 방식
// 6천만↓ 0.1% / ~1.5억 0.15%(-3만) / ~3억 0.25%(-18만) / 3억↑ 0.4%(-63만)
function propTax(base){
  if(base<=60000000) return base*0.001;
  if(base<=150000000) return base*0.0015-30000;
  if(base<=300000000) return base*0.0025-180000;
  return base*0.004-630000;
}
function fmvRate(price,one){
  if(!one) return 0.60;
  if(price<=300000000) return 0.43;
  if(price<=600000000) return 0.44;
  return 0.45;
}
$('pt-go').onclick=function(){
  var price=(parseFloat($('pt-price').value)||0)*10000;
  if(price<=0){alert('공시가격(만원)을 입력해 주세요');return;}
  var one=$('pt-one').checked, urban=$('pt-urban').checked;
  var rate=fmvRate(price,one);
  var base=price*rate;
  var main=propTax(base);
  var urbanTax=urban?base*0.0014:0;
  var eduTax=main*0.20;
  var total=main+urbanTax+eduTax;
  $('pt-big').textContent=won(total);
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('pt-rows').innerHTML=
    row('공시가격', won(price))
   +row('공정시장가액비율', (rate*100)+'%'+(one?' (1주택 특례)':' (일반)'))
   +row('과세표준', won(base))
   +row('재산세 본세', won(main))
   +(urban?row('도시지역분 (과표×0.14%)', won(urbanTax)):'')
   +row('지방교육세 (본세×20%)', won(eduTax))
   +row('총 납부액', won(total), true);
  $('pt-out').style.display='block';
};
})();
</script>

## 주택 재산세, 이렇게 붙어요 (2026년 기준)

- **과세표준** = 공시가격 × **공정시장가액비율**.
  - 일반 주택은 **60%**, 1세대 1주택자는 특례로 **공시가격 3억 이하 43% · 3억~6억 44% · 6억 초과 45%**로 더 낮게 적용돼요.
- **재산세 본세(주택 표준 누진세율)**: 과세표준 기준
  - 6,000만원 이하 **0.1%** · 6,000만~1.5억 **0.15%** · 1.5억~3억 **0.25%** · 3억 초과 **0.4%** (각 구간 초과분 누진).
- **도시지역분** = 과세표준 × **0.14%** (도시계획구역 내 주택에 추가).
- **지방교육세** = 재산세 본세 × **20%**.
- 주택 재산세는 **7월(1기분)·9월(2기분)에 반씩** 나눠 내요(세액 20만원 이하면 7월에 한 번에).
- 이 계산기는 **표준세율** 기준이에요. 1세대 1주택 특례세율(0.05~0.4%)이 적용되면 본세가 더 줄 수 있어요. 정확한 세액은 지자체 고지서·위택스로 확인하세요.

> 세율·비율은 [심플택스 2026 재산세율표](https://simpletax.kr/taxRate/propertyTaxRate)와 [지방세법 시행령](https://www.law.go.kr/LSW/lumLsLinkPop.do?lspttninfSeq=120262), 2026년 1주택자 공정시장가액비율 특례 기준을 참고했어요.

## 계산 흐름 한눈에 보기

재산세는 "공시가격 → 과세표준 → 세액" 순서로 계산돼요. 이 흐름만 이해하면 고지서를 봐도 당황하지 않아요.

1. **공시가격 확인**: 매년 발표되는 주택 공시가격이 출발점이에요. 위 계산기에는 이 값을 만원 단위로 넣으면 돼요.
2. **과세표준 산출**: 공시가격에 공정시장가액비율을 곱해 과세표준을 구해요. 1주택자면 특례 비율이 적용돼 과세표준이 더 낮아져요.
3. **세액 계산**: 과세표준에 누진세율을 적용해 재산세 본세를 구하고, 여기에 도시지역분과 지방교육세가 더해져 최종 납부액이 나와요.

직접 손으로 계산하려면 구간별 누진공제까지 챙겨야 해서 실수하기 쉬워요. 위 계산기에 값만 넣으면 각 단계 금액을 한 번에 보여주니 그대로 확인하시면 돼요.

## 세금 낼 때 알아두면 좋은 팁

- **납부 시기를 미리 챙기세요**: 주택 재산세는 7월과 9월에 나눠 부과돼요. 자동이체나 카드 납부를 걸어두면 놓치지 않아요.
- **공시가격 이의신청 기간을 확인하세요**: 공시가격이 실제 시세보다 지나치게 높다고 느껴지면 열람·의견제출 기간에 이의를 낼 수 있어요.
- **1주택 여부는 세대 기준**: 특례는 개인이 아니라 세대 단위로 판단해요. 세대원이 다른 집을 갖고 있으면 특례 대상이 아닐 수 있으니 정확한 판정은 지자체나 위택스에서 확인하세요.
- 자동차를 보유 중이라면 [자동차세 계산기](/tools/car-tax/)로 함께 확인해두면 한 해 세금 계획을 세우기 편해요. 연말 절세가 궁금하면 [연말정산 계산기](/tools/year-end-tax/)도 참고하세요.

## 자주 묻는 질문

**Q. 공시가격과 실거래가는 다른가요?**
네, 달라요. 재산세는 시세가 아니라 정부가 정한 공시가격을 기준으로 계산해요. 보통 공시가격이 실거래가보다 낮게 형성돼요.

**Q. 이 계산기 결과가 고지서와 정확히 같나요?**
참고용 근사치예요. 위 계산기는 표준세율 기준이라, 1세대 1주택 특례세율이나 세부담 상한이 적용되면 실제 고지액이 달라질 수 있어요. 정확한 금액은 위택스나 지자체 고지서로 확인하세요.

**Q. 도시지역분은 왜 붙나요?**
도시계획구역 안에 있는 주택에 도시계획사업 재원 명목으로 추가 부과되는 항목이에요. 계산기에서 도시지역 체크를 해제하면 이 부분이 빠진 금액을 볼 수 있어요.

**Q. 재산세를 카드로 낼 수 있나요?**
네, 위택스나 지방세 납부 채널에서 신용카드·간편결제로 납부할 수 있어요. 무이자 할부 혜택이 있는 카드사도 있으니 확인해보세요.
