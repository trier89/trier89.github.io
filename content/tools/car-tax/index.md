---
title: "자동차세·취득세 계산기 — 배기량·차령별 연세액"
description: "배기량과 차령을 입력하면 연간 자동차세(지방교육세 포함)와 차령 할인을, 취득가액으로 자동차 취득세를 계산합니다. 무료 계산기."
date: 2026-07-22
slug: "car-tax"
categories: ["도구"]
tags: ["자동차세 계산기", "자동차 취득세", "자동차세 조회", "차령 할인", "취득세 계산"]
toc: false
readingTime: false
---

배기량과 **차령(등록 후 연수)**을 넣으면 연간 자동차세(지방교육세 포함)를, 취득가액으로 취득세를 계산합니다. (비영업용 승용차 기준)

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <div style="font-weight:700;color:#059669;">🚗 자동차세 (연간)</div>
  <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">배기량 (cc)</span><input type="tel" id="ct-cc" inputmode="numeric" placeholder="예: 1998" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">차령 (등록 후 연수)</span><input type="tel" id="ct-age" inputmode="numeric" placeholder="예: 3" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <label style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px;"><input type="checkbox" id="ct-ev" style="width:17px;height:17px;"> 전기차·수소차 (정액 13만원)</label>
  <div style="font-weight:700;color:#2563eb;margin-top:16px;">💰 취득세 (구입 시 1회)</div>
  <label style="display:block;margin-top:8px;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">차량 취득가액 (만원)</span><input type="tel" id="ct-price" inputmode="numeric" placeholder="예: 3000" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  <label style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px;"><input type="checkbox" id="ct-light" style="width:17px;height:17px;"> 경차 (취득세 4%)</label>
  <button id="ct-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="ct-out" style="display:none;margin-top:20px;">
    <table style="width:100%;font-size:14.5px;border-collapse:collapse;"><tbody id="ct-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 자동차세=배기량×cc당 세율(≤1000cc 80원·≤1600cc 140원·초과 200원)+지방교육세 30%. 차령 3년차부터 매년 5%씩 최대 50% 할인. 취득세=취득가액×7%(경차 4%·전기차 감면 별도). 연납 신청 시 자동차세 할인.</div>
  </div>
</div>
<style>#ct-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#ct-rows td:last-child{text-align:right;font-weight:700;}#ct-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){return Math.round(w).toLocaleString()+'원';}
$('ct-go').onclick=function(){
  var cc=parseInt($('ct-cc').value)||0;
  var age=parseInt($('ct-age').value)||0;
  var ev=$('ct-ev').checked;
  var price=(parseFloat($('ct-price').value)||0)*10000;
  var light=$('ct-light').checked;
  var rows='';
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  // 자동차세
  if(ev){
    var evTax=130000*1.3;
    rows+=row('자동차세 (전기·수소차 정액)', won(130000))
        + row('지방교육세 (30%)', won(130000*0.3))
        + row('연 자동차세 합계', won(evTax), true);
  } else if(cc>0){
    var per = cc<=1000?80:(cc<=1600?140:200);
    var base=cc*per;
    var edu=base*0.3;
    var full=base+edu;
    // 차령 할인: 3년차 5%, 최대 50%(12년차)
    var disc=age>=3?Math.min((age-2)*5,50):0;
    var final=full*(1-disc/100);
    rows+=row('cc당 세율', per+'원 × '+cc.toLocaleString()+'cc')
        + row('자동차세 (본세)', won(base))
        + row('지방교육세 (30%)', won(edu))
        + row('차령 할인', disc+'% (차령 '+age+'년)')
        + row('연 자동차세 (할인 후)', won(final), true);
  }
  // 취득세
  if(price>0){
    var rate=light?0.04:0.07;
    rows+=row('취득세율', (rate*100)+'%'+(light?' (경차)':''))
        + row('취득세 (구입 시 1회)', won(price*rate), true);
  }
  $('ct-rows').innerHTML=rows||'<tr><td>배기량 또는 취득가액을 입력해 주세요</td></tr>';
  $('ct-out').style.display='block';
};
})();
</script>

## 자동차세, 이렇게 붙어요

- **자동차세(연간)** = 배기량 × cc당 세율 + 지방교육세(30%).
  - 1,000cc 이하: 80원/cc · 1,600cc 이하: 140원/cc · 1,600cc 초과: 200원/cc
- **차령 할인**: 등록 후 3년차부터 매년 5%씩 깎여서 **최대 50%**(12년차 이상)까지 줄어요.
- **연납 할인**: 1월에 1년치를 한 번에 내면 일정액을 할인해줘요(매년 할인율 변동).
- **취득세(구입 시 1회)**: 취득가액의 **7%**(경차 4%). 전기차·다자녀 등은 감면이 있어요.
- 전기·수소차는 배기량이 없어 **정액 13만원**(비영업용)이에요.

## 자동차세는 언제, 어떻게 낼까요

자동차세는 보유 기간에 매기는 세금이라, 보통 **상반기(6월)와 하반기(12월)** 두 번에 나눠서 고지돼요. 대신 연초에 1년치를 미리 내는 **연납**을 신청하면 일정액을 할인받을 수 있어요(할인율은 매년 달라져요). 중간에 차를 팔면 보유한 날짜만큼만 계산해서 정산돼요.

- 세액은 **배기량이 클수록** 커져요. 위 계산기의 cc당 세율 구간을 그대로 반영했어요.
- **차령 할인**은 오래 탈수록 커져서, 등록 3년차부터 매년 5%씩 최대 50%까지 깎여요. 같은 차라도 연식이 쌓이면 자동차세가 줄어드는 이유예요.
- 취득세는 살 때 **딱 한 번** 내는 세금이라 매년 내는 자동차세와는 별개예요.

## 취득세, 살 때 한 번 챙기세요

취득세는 차량 취득가액에 세율을 곱해서 나와요. 위 계산기는 비영업용 승용차 기준 세율을 반영했고, 경차는 더 낮은 세율이 적용돼요. 전기차나 다자녀 가구 등은 별도 감면 제도가 있으니, 정확한 감면액은 구입처나 지자체를 통해 확인하는 게 좋아요. 정확한 금액은 위 계산기에 배기량·차령·취득가액을 넣어 보세요.

## 자주 묻는 질문

**Q. 차령은 어떻게 세나요?**
등록(신규 등록)한 뒤 지난 연수예요. 차령 할인은 3년차부터 시작되니, 오래된 차일수록 자동차세가 줄어들어요.

**Q. 연납하면 얼마나 아끼나요?**
연초에 1년치를 미리 내면 일정 비율을 할인해 줘요. 다만 할인율은 해마다 조정되니, 정확한 금액은 그해 고지서나 위택스에서 확인하세요.

**Q. 전기차는 자동차세가 왜 정액인가요?**
전기·수소차는 배기량(cc)이 없어서 배기량 기준으로 매길 수 없어요. 그래서 비영업용은 정액 13만원(+지방교육세)으로 부과돼요.

**Q. 다른 세금도 미리 계산해 보고 싶어요.**
집을 가지고 있다면 [재산세 계산기](/tools/property-tax/), 연말정산이 궁금하면 [연말정산 계산기](/tools/year-end-tax/)도 함께 써 보세요.
