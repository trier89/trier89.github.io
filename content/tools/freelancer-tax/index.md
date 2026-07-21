---
title: "프리랜서 3.3%·종합소득세 계산기 — 원천징수·5월 정산"
description: "프리랜서·사업소득의 3.3% 원천징수액과 5월 종합소득세 예상 납부·환급액을 계산합니다. 2026년 세율 기준 무료 계산기."
date: 2026-07-22
slug: "freelancer-tax"
categories: ["도구"]
tags: ["프리랜서 세금", "3.3% 계산기", "종합소득세 계산기", "사업소득 세금", "프리랜서 환급"]
toc: false
readingTime: false
---

프리랜서·사업소득의 **3.3% 원천징수**액과 5월 **종합소득세** 예상 납부·환급액을 계산합니다. (2026년 종합소득세율 기준)

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">연 총수입 (세전, 만원)</span><input type="tel" id="fl-inc" inputmode="numeric" placeholder="예: 4000" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">필요경비 (만원)</span><input type="tel" id="fl-exp" inputmode="numeric" placeholder="예: 1000" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"><span style="font-size:12px;color:#999;">실제 경비 또는 업종별 경비율 적용액. 모르면 수입의 60~70% 정도로.</span></label>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">기타 소득공제 (만원, 선택)</span><input type="tel" id="fl-ded" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"><span style="font-size:12px;color:#999;">국민연금·노란우산·인적공제 추가분 등</span></label>
  <button id="fl-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">세금 계산하기</button>
  <div id="fl-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;" id="fl-card">
      <div id="fl-lbl" style="font-size:15px;color:#555;"></div>
      <div id="fl-big" style="font-size:34px;font-weight:800;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="fl-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 3.3%(소득세 3%+지방세 0.3%)는 미리 뗀 세금(기납부). 5월 종합소득세 신고로 실제 세금과 정산해요. 여기선 본인 기본공제(150만)만 반영한 간이 계산이라, 다른 공제·세액공제로 실제와 차이나요. 성실신고·경비 증빙이 중요해요.</div>
  </div>
</div>
<style>#fl-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#fl-rows td:last-child{text-align:right;font-weight:700;}#fl-rows tr.hl td{border-top:2px solid #059669;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){if(w>=100000000)return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';return Math.round(w).toLocaleString()+'원';}
function tax(base){base=Math.max(base,0);
  if(base<=14000000)return base*0.06;
  if(base<=50000000)return base*0.15-1260000;
  if(base<=88000000)return base*0.24-5760000;
  if(base<=150000000)return base*0.35-15440000;
  if(base<=300000000)return base*0.38-19940000;
  if(base<=500000000)return base*0.40-25940000;
  if(base<=1000000000)return base*0.42-35940000;
  return base*0.45-65940000;}
$('fl-go').onclick=function(){
  var inc=(parseFloat($('fl-inc').value)||0)*10000;
  var exp=(parseFloat($('fl-exp').value)||0)*10000;
  var ded=(parseFloat($('fl-ded').value)||0)*10000;
  if(!inc){alert('연 총수입을 입력해 주세요');return;}
  var income=Math.max(inc-exp,0);              // 사업소득금액
  var base=Math.max(income-1500000-ded,0);      // 과세표준(본인 150만+기타)
  var calc=tax(base);                            // 산출세액(소득세)
  var local=calc*0.1;                            // 지방소득세 10%
  var decided=calc+local;
  var prepaid=inc*0.033;                         // 3.3% 기납부
  var refund=prepaid-decided;
  $('fl-lbl').textContent=refund>=0?'5월 예상 환급':'5월 예상 추가납부';
  $('fl-big').textContent=won(Math.abs(refund));
  $('fl-big').style.color=refund>=0?'#047857':'#dc2626';
  $('fl-card').style.background=refund>=0?'#ecfdf5':'#fef2f2';
  function row(l,v,hl){return '<tr'+(hl?' class="hl"':'')+'><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('fl-rows').innerHTML=
    row('연 총수입', won(inc))
   +row('필요경비', '-'+won(exp))
   +row('사업소득금액', won(income))
   +row('과세표준 (공제 후)', won(base))
   +row('산출세액(소득세)', won(calc))
   +row('지방소득세 (10%)', won(local))
   +row('결정세액 합계', won(decided), true)
   +row('3.3% 기납부(원천징수)', won(prepaid))
   +row(refund>=0?'→ 환급':'→ 추가납부', won(Math.abs(refund)), true);
  $('fl-out').style.display='block';
};
})();
</script>

## 프리랜서 세금, 두 단계예요

- **1단계 — 3.3% 원천징수**: 대금을 받을 때 지급처가 **3.3%(소득세 3% + 지방세 0.3%)**를 미리 떼요. 이건 "미리 낸 세금"이에요.
- **2단계 — 5월 종합소득세 신고**: 1년치 수입에서 **필요경비**를 빼고 실제 세금을 계산해, 미리 낸 3.3%와 정산해요. 더 냈으면 환급, 덜 냈으면 추가납부.
- **경비가 핵심**: 사업 관련 지출(장비·통신·임차료 등)을 경비로 인정받으면 소득금액이 줄어 세금이 줄어요. **증빙(세금계산서·영수증)**을 챙기세요.
- 소득이 낮은 프리랜서는 3.3%를 많이 떼여서 **5월에 환급**받는 경우가 많아요. 신고 안 하면 그 돈을 못 돌려받아요.
- 연 수입 규모에 따라 단순경비율/기준경비율/장부작성 방식이 달라요. 정확한 건 홈택스나 세무사와 확인하세요.
