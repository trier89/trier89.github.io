---
title: "대출 이자 계산기 — 원리금균등·원금균등 월상환액 비교"
description: "대출금·이자율·기간을 입력하면 원리금균등과 원금균등 방식의 월 상환액과 총 이자를 비교합니다. 무료 대출 상환 계산기."
date: 2026-07-22
slug: "loan"
categories: ["도구"]
tags: ["대출 이자 계산기", "원리금균등", "원금균등", "월 상환액", "대출 계산기"]
toc: false
readingTime: false
---

대출금·이자율·기간을 넣으면 **원리금균등**과 **원금균등** 두 방식의 월 상환액과 총 이자를 나란히 비교합니다.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">대출 금액 (만원)</span><input type="tel" id="ln-amt" inputmode="numeric" placeholder="예: 10000 (1억)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">연 이자율 (%)</span><input type="tel" id="ln-rate" inputmode="decimal" placeholder="예: 4.5" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">기간 (개월)</span><input type="tel" id="ln-mon" inputmode="numeric" placeholder="예: 360 (30년)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <button id="ln-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">상환액 계산하기</button>
  <div id="ln-out" style="display:none;margin-top:20px;">
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <div style="flex:1 1 45%;text-align:center;padding:16px;border-radius:12px;background:#ecfdf5;">
        <div style="font-size:13px;color:#555;">원리금균등 · 매월</div>
        <div id="ln-eq" style="font-size:22px;font-weight:800;color:#047857;"></div>
        <div id="ln-eq-int" style="font-size:12px;color:#6b7280;margin-top:4px;"></div>
      </div>
      <div style="flex:1 1 45%;text-align:center;padding:16px;border-radius:12px;background:#eff6ff;">
        <div style="font-size:13px;color:#555;">원금균등 · 첫달→막달</div>
        <div id="ln-pr" style="font-size:19px;font-weight:800;color:#1d4ed8;"></div>
        <div id="ln-pr-int" style="font-size:12px;color:#6b7280;margin-top:4px;"></div>
      </div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="ln-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 원리금균등=매월 같은 금액(원금+이자) / 원금균등=매월 원금은 같고 이자가 줄어 상환액이 점점 감소. 총이자는 보통 원금균등이 적어요. 중도상환수수료·거치기간은 미반영. 실제는 은행 조건에 따라 달라요.</div>
  </div>
</div>
<style>#ln-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#ln-rows td:last-child{text-align:right;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function won(w){if(w>=100000000)return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';if(w>=10000)return Math.round(w/10000).toLocaleString()+'만원';return Math.round(w).toLocaleString()+'원';}
$('ln-go').onclick=function(){
  var P=(parseFloat($('ln-amt').value)||0)*10000;
  var ann=parseFloat($('ln-rate').value)||0;
  var n=parseInt($('ln-mon').value)||0;
  if(!P||!n){alert('대출금과 기간을 입력해 주세요');return;}
  var r=ann/100/12;
  // 원리금균등
  var eqM = r>0 ? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : P/n;
  var eqTotalInt = eqM*n - P;
  // 원금균등
  var prin=P/n;
  var prFirst=prin + P*r;
  var prLast=prin + prin*r;
  var prTotalInt = r>0 ? P*r*(n+1)/2 : 0;
  $('ln-eq').textContent=won(eqM);
  $('ln-eq-int').textContent='총이자 '+won(eqTotalInt);
  $('ln-pr').textContent=won(prFirst)+' → '+won(prLast);
  $('ln-pr-int').textContent='총이자 '+won(prTotalInt);
  function row(l,v){return '<tr><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  var diff=eqTotalInt-prTotalInt;
  $('ln-rows').innerHTML=
    row('대출 원금', won(P))
   +row('연 이자율 / 기간', ann+'% / '+n+'개월 ('+(n/12).toFixed(n%12?1:0)+'년)')
   +row('원리금균등 총 상환액', won(P+eqTotalInt))
   +row('원금균등 총 상환액', won(P+prTotalInt))
   +row('원금균등이 아끼는 총이자', won(diff)+' 절약');
  $('ln-out').style.display='block';
};
})();
</script>

## 원리금균등 vs 원금균등, 뭐가 유리해?

- **원리금균등상환**: 매월 갚는 금액(원금+이자)이 **똑같아요**. 매달 나가는 돈이 일정해서 계획 세우기 편해요. 초반엔 이자 비중이 크고 원금이 천천히 줄어요.
- **원금균등상환**: 매월 **원금은 같고**, 남은 원금에 대한 이자만 붙어서 **상환액이 점점 줄어요**. 초반 부담이 크지만 **총 이자는 더 적어요**.
- **총이자 비교**: 같은 조건이면 보통 **원금균등이 총이자가 적어요**. 대신 초반 월 상환 부담이 큽니다. 여유가 되면 원금균등, 초반 부담을 낮추려면 원리금균등.
- 실제 대출은 중도상환수수료·거치기간·변동금리 등이 있으니 은행 상담과 함께 참고하세요.
