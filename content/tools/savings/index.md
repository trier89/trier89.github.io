---
title: "예금·적금 이자 계산기 — 만기 수령액·세후 이자"
description: "예금 원금 또는 적금 월납입액과 연이율·기간을 넣으면 세전이자·이자과세·세후 실수령 이자와 만기 수령액을 계산합니다. 무료 예금 이자 계산기·적금 계산기."
date: 2026-08-13
slug: "savings"
categories: ["도구"]
tags: ["예금 이자 계산기", "적금 계산기", "만기수령액", "세후 이자", "복리 계산기"]
toc: false
readingTime: false
---

**정기예금**은 목돈을 한 번에 예치하고, **정기적금**은 매월 나눠 납입해요. 원금·연이율·기간을 넣으면 세전이자·세금·**세후 실수령 이자**와 만기 수령액을 계산해 줍니다.

<div class="pf-tool" style="max-width:520px;margin:0 auto;background:#fff;color:#111;border:1px solid #e5e7eb;border-radius:14px;padding:18px;">
  <div style="display:flex;gap:8px;margin-bottom:14px;">
    <button id="sv-mode-dep" class="sv-tab sv-on" style="flex:1;padding:12px;border:2px solid #059669;border-radius:10px;background:#059669;color:#fff;font-size:15px;font-weight:700;cursor:pointer;">정기예금 · 목돈</button>
    <button id="sv-mode-sav" class="sv-tab" style="flex:1;padding:12px;border:2px solid #ccc;border-radius:10px;background:#fff;color:#111;font-size:15px;font-weight:700;cursor:pointer;">정기적금 · 매월</button>
  </div>
  <label style="display:block;"><span id="sv-amt-lb" style="display:block;font-weight:700;margin-bottom:6px;">예치 원금 (만원)</span><input type="tel" id="sv-amt" inputmode="numeric" placeholder="예: 1000 (1천만원)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;color:#111;"></label>
  <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">연 이율 (%)</span><input type="tel" id="sv-rate" inputmode="decimal" placeholder="예: 3.5" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;color:#111;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-weight:700;margin-bottom:6px;">기간 (개월)</span><input type="tel" id="sv-mon" inputmode="numeric" placeholder="예: 12" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;color:#111;"></label>
  </div>
  <div style="margin-top:12px;">
    <span style="display:block;font-weight:700;margin-bottom:6px;">이자 방식</span>
    <label style="margin-right:14px;font-size:15px;cursor:pointer;"><input type="radio" name="sv-comp" value="s" checked> 단리</label>
    <label style="font-size:15px;cursor:pointer;"><input type="radio" name="sv-comp" value="c"> 월복리</label>
  </div>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">세금</span>
    <select id="sv-tax" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;color:#111;">
      <option value="15.4">일반과세 15.4% (소득세14%+지방세1.4%)</option>
      <option value="9.5">세금우대 9.5%</option>
      <option value="0">비과세 0%</option>
    </select>
  </label>
  <button id="sv-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">이자 계산하기</button>
  <div id="sv-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:13px;color:#555;">만기 수령액 (세후)</div>
      <div id="sv-final" style="font-size:26px;font-weight:800;color:#047857;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="sv-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 적금 이자는 매월 넣은 돈이 만기까지 남은 개월만큼만 이자가 붙어요(먼저 넣을수록 이자↑). 세금은 이자에만 부과돼요. 실제 지급액은 은행 이자 계산 방식·우대조건에 따라 조금 달라질 수 있어요.</div>
  </div>
</div>
<style>#sv-rows td{padding:8px 6px;border-bottom:1px solid #eee;color:#111;}#sv-rows td:last-child{text-align:right;font-weight:700;}.sv-tab{transition:all .1s;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var mode='dep';
function won(w){w=Math.round(w);if(w>=100000000)return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';if(w>=10000){var man=Math.floor(w/10000);var rem=w%10000;return man.toLocaleString()+'만'+(rem?' '+rem.toLocaleString()+'원':'원');}return w.toLocaleString()+'원';}
function setMode(m){
  mode=m;
  var dep=$('sv-mode-dep'),sav=$('sv-mode-sav');
  if(m==='dep'){
    dep.style.background='#059669';dep.style.color='#fff';dep.style.borderColor='#059669';
    sav.style.background='#fff';sav.style.color='#111';sav.style.borderColor='#ccc';
    $('sv-amt-lb').textContent='예치 원금 (만원)';$('sv-amt').placeholder='예: 1000 (1천만원)';
  }else{
    sav.style.background='#059669';sav.style.color='#fff';sav.style.borderColor='#059669';
    dep.style.background='#fff';dep.style.color='#111';dep.style.borderColor='#ccc';
    $('sv-amt-lb').textContent='월 납입액 (만원)';$('sv-amt').placeholder='예: 50 (매월 50만원)';
  }
}
$('sv-mode-dep').onclick=function(){setMode('dep');};
$('sv-mode-sav').onclick=function(){setMode('sav');};
$('sv-go').onclick=function(){
  var amt=(parseFloat($('sv-amt').value)||0)*10000;
  var ann=parseFloat($('sv-rate').value)||0;
  var n=parseInt($('sv-mon').value)||0;
  var comp=document.querySelector('input[name=sv-comp]:checked').value;
  var taxR=parseFloat($('sv-tax').value)/100;
  if(!amt||!n){alert('금액과 기간(개월)을 입력해 주세요');return;}
  var i=ann/100/12;
  var principal,gross;
  if(mode==='dep'){
    principal=amt;
    if(comp==='c'){gross=amt*Math.pow(1+i,n)-amt;}
    else{gross=amt*(ann/100)*(n/12);}
  }else{
    principal=amt*n;
    if(comp==='c'){
      var fv=0;for(var k=1;k<=n;k++){fv+=amt*Math.pow(1+i,n-k+1);}
      gross=fv-principal;
    }else{
      gross=amt*(ann/100)*(n*(n+1)/2)/12;
    }
  }
  var tax=gross*taxR;
  var net=gross-tax;
  var payout=principal+net;
  $('sv-final').textContent=won(payout);
  function row(l,v){return '<tr><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  var label=mode==='dep'?'예치 원금':'원금 합계 (월'+won(amt)+'×'+n+')';
  $('sv-rows').innerHTML=
    row(label, won(principal))
   +row('연 이율 / 기간 / 방식', ann+'% / '+n+'개월 / '+(comp==='c'?'월복리':'단리'))
   +row('세전 이자', won(gross))
   +row('이자과세 ('+(taxR*100).toFixed(taxR*100%1?1:0)+'%)', '-'+won(tax))
   +row('세후 실수령 이자', won(net))
   +row('만기 수령액', won(payout));
  $('sv-out').style.display='block';
};
})();
</script>

## 예금과 적금, 이자가 왜 다를까요

같은 연 이율이라도 **예금과 적금은 실제로 받는 이자가 크게 달라요.**

**정기예금**은 목돈을 처음에 한 번에 넣어두기 때문에, 그 원금 전체가 예치 기간 내내 이자를 받아요. 예를 들어 1,000만원을 연 3.5%로 1년 예치하면, 세전 이자는 1,000만원 × 3.5% = 35만원이에요. 계산이 단순하죠.

**정기적금**은 매월 조금씩 나눠 넣기 때문에 이야기가 달라져요. 첫 달에 넣은 돈은 12개월 내내 이자가 붙지만, **마지막 달에 넣은 돈은 딱 한 달치 이자만** 받아요. 그래서 "매월 50만원, 연 3.5%, 12개월" 적금의 세전 이자는 표면금리로 상상하는 것보다 훨씬 적어요. 실제로는 각 달 납입금이 남은 개월 수만큼만 이자를 받는 구조라, 이자는 `월납입액 × 연이율 × (개월×(개월+1)/2) ÷ 12`로 계산돼요. 위 예시라면 세전 이자가 약 11만 원 정도로, **총 납입액 600만원 기준으로 보면 표면금리 3.5%의 절반 남짓한 체감 수익률**이 나와요.

이게 흔히 "적금 이자가 생각보다 짜다"고 느끼는 이유예요. 적금의 표면금리가 예금보다 조금 높게 붙는 것도, 이렇게 이자가 붙는 기간이 짧다는 점을 감안한 거예요. 두 상품을 비교할 때는 **표면금리가 아니라 만기에 실제로 받는 돈**을 기준으로 봐야 해요. 이 계산기로 예금 모드와 적금 모드를 각각 돌려서 세후 실수령 이자를 나란히 비교해 보세요.

**단리와 월복리**도 차이를 만들어요. 단리는 원금에만 이자가 붙고, 월복리는 매달 붙은 이자가 다시 원금에 더해져 이자가 이자를 낳아요. 기간이 짧으면 차이가 작지만, 여러 해 굴리면 복리의 힘이 커져요. 마지막으로 세금이 있어요. 이자소득에는 **일반과세 15.4%**(소득세 14% + 지방세 1.4%)가 원천징수되므로, 세전 이자에서 이만큼을 빼야 통장에 실제로 찍히는 세후 이자가 나와요.

## 자주 묻는 질문

**Q. 적금 실이자가 왜 표면금리의 절반쯤밖에 안 되나요?**
매월 넣은 돈이 만기까지 남은 기간만큼만 이자를 받기 때문이에요. 첫 달 납입금은 전체 기간, 마지막 달 납입금은 한 달만 이자가 붙어요. 그래서 총 납입액 대비 실효 수익률은 표면금리의 절반 남짓이 되는 게 정상이에요. 목돈이 있다면 같은 금리라도 예금이 이자가 더 많아요.

**Q. 단리와 복리 중 뭐가 유리한가요?**
같은 금리·기간이라면 복리가 항상 더 많아요. 매달 붙은 이자가 원금에 더해져 다음 달 이자를 다시 낳기 때문이에요. 다만 1년 이하 단기 상품은 차이가 크지 않고, 기간이 길수록 복리 효과가 커져요. 은행 상품이 단리인지 복리인지 확인하고 방식 버튼을 맞춰 계산하세요.

**Q. 이자에서 떼는 15.4% 세금은 뭔가요?**
이자소득세예요. 소득세 14%에 지방소득세 1.4%(소득세의 10%)를 더해 총 15.4%를 원천징수해요. 예를 들어 세전 이자가 35만원이면 약 5.39만원이 세금으로 빠지고 29.6만원 정도를 받아요. 이 계산기는 세전 이자·세금·세후 이자를 모두 나눠서 보여줘요.

**Q. 비과세·세금우대는 뭔가요?**
청년우대형·조합예탁금 등 특정 조건을 충족하면 이자소득세가 면제(비과세)되거나 9.5%로 낮아지는(세금우대) 혜택이 있어요. 자격과 한도가 정해져 있으니 가입 전 은행에 확인하세요. 세금 항목을 바꿔가며 계산하면 세후 이자가 얼마나 달라지는지 눈으로 볼 수 있어요.

**Q. 계산 결과가 실제 지급액과 똑같나요?**
개념 이해와 비교를 위한 참고용이에요. 은행마다 이자 계산 방식(일할 계산 등), 이자 지급 시점, 우대금리 조건이 달라 실제 금액은 조금 차이가 날 수 있어요. 이율은 정해진 값이 없으니 본인이 가입할 상품의 실제 금리를 직접 입력해야 정확해요.

---

돈 관리에 함께 쓰면 좋은 도구: [대출 이자 계산기](/tools/loan/)로 대출 상환 계획을, [배당금 계산기](/tools/dividend/)로 배당 투자 목표를 세워 보세요.
