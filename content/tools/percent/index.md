---
title: "퍼센트 계산기 — % 구하기·증감률·전체값 한번에"
description: "X는 Y의 몇 %인지, Y의 X%는 얼마인지, 증감률과 전체값까지 한 번에. 할인율·시험점수·연봉인상률에 바로 쓰는 무료 퍼센트 계산기."
date: 2026-08-13
slug: "percent"
categories: ["도구"]
tags: ["퍼센트 계산기", "퍼센트 구하기", "증감률 계산", "비율 계산기", "할인율 계산"]
toc: false
readingTime: false
---

퍼센트가 헷갈릴 때 네 가지를 한 번에. **몇 %인지·X%가 얼마인지·증감률·전체값**을 입력만 하면 바로 계산해요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div id="pc-tabs" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">
    <button data-t="a" class="pc-tab" style="flex:1 1 45%;padding:10px;border:2px solid #059669;border-radius:10px;background:#059669;color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;">X는 Y의 몇 %?</button>
    <button data-t="b" class="pc-tab" style="flex:1 1 45%;padding:10px;border:2px solid #ccc;border-radius:10px;background:#fff;color:#333;font-size:13.5px;font-weight:700;cursor:pointer;">Y의 X%는?</button>
    <button data-t="c" class="pc-tab" style="flex:1 1 45%;padding:10px;border:2px solid #ccc;border-radius:10px;background:#fff;color:#333;font-size:13.5px;font-weight:700;cursor:pointer;">몇 % 증가/감소?</button>
    <button data-t="d" class="pc-tab" style="flex:1 1 45%;padding:10px;border:2px solid #ccc;border-radius:10px;background:#fff;color:#333;font-size:13.5px;font-weight:700;cursor:pointer;">전체값 구하기</button>
  </div>
  <div id="pc-a" class="pc-pane">
    <div style="font-weight:700;margin-bottom:8px;color:#333;">X는 Y의 몇 %인가요?</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">부분값 X</span><input type="tel" id="pc-a-x" inputmode="decimal" placeholder="예: 45" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">전체값 Y</span><input type="tel" id="pc-a-y" inputmode="decimal" placeholder="예: 180" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
    </div>
  </div>
  <div id="pc-b" class="pc-pane" style="display:none;">
    <div style="font-weight:700;margin-bottom:8px;color:#333;">Y의 X%는 얼마인가요?</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">전체값 Y</span><input type="tel" id="pc-b-y" inputmode="decimal" placeholder="예: 50000" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">비율 X (%)</span><input type="tel" id="pc-b-x" inputmode="decimal" placeholder="예: 15" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
    </div>
  </div>
  <div id="pc-c" class="pc-pane" style="display:none;">
    <div style="font-weight:700;margin-bottom:8px;color:#333;">X에서 Y로, 몇 % 증가/감소했나요?</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">이전값 X</span><input type="tel" id="pc-c-x" inputmode="decimal" placeholder="예: 4000" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">이후값 Y</span><input type="tel" id="pc-c-y" inputmode="decimal" placeholder="예: 4600" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
    </div>
  </div>
  <div id="pc-d" class="pc-pane" style="display:none;">
    <div style="font-weight:700;margin-bottom:8px;color:#333;">X가 전체의 P%일 때, 전체는?</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">부분값 X</span><input type="tel" id="pc-d-x" inputmode="decimal" placeholder="예: 30" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
      <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">비율 P (%)</span><input type="tel" id="pc-d-p" inputmode="decimal" placeholder="예: 20" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;color:#111;"></label>
    </div>
  </div>
  <div id="pc-out" style="margin-top:16px;text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;font-size:20px;color:#047857;font-weight:800;min-height:26px;">숫자를 입력하면 바로 계산돼요</div>
  <div id="pc-sub" style="text-align:center;font-size:13px;color:#6b7280;margin-top:8px;min-height:16px;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var tab='a';
function fmt(n){if(!isFinite(n))return '-';var r=Math.round(n*10000)/10000;return r.toLocaleString(undefined,{maximumFractionDigits:4});}
var out=$('pc-out'), sub=$('pc-sub');
function show(main,detail){out.textContent=main;sub.textContent=detail||'';}
function calc(){
  if(tab==='a'){
    var x=parseFloat($('pc-a-x').value), y=parseFloat($('pc-a-y').value);
    if(isNaN(x)||isNaN(y)||y===0){show('숫자를 입력하면 바로 계산돼요','');return;}
    var p=x/y*100;
    show(fmt(x)+'는 '+fmt(y)+'의 '+fmt(p)+'%','공식: X ÷ Y × 100 = '+fmt(x)+' ÷ '+fmt(y)+' × 100');
  }else if(tab==='b'){
    var y2=parseFloat($('pc-b-y').value), x2=parseFloat($('pc-b-x').value);
    if(isNaN(y2)||isNaN(x2)){show('숫자를 입력하면 바로 계산돼요','');return;}
    var v=y2*x2/100;
    show(fmt(y2)+'의 '+fmt(x2)+'% = '+fmt(v),'공식: Y × X ÷ 100 = '+fmt(y2)+' × '+fmt(x2)+' ÷ 100');
  }else if(tab==='c'){
    var cx=parseFloat($('pc-c-x').value), cy=parseFloat($('pc-c-y').value);
    if(isNaN(cx)||isNaN(cy)||cx===0){show('숫자를 입력하면 바로 계산돼요','');return;}
    var rate=(cy-cx)/cx*100;
    var word=rate>0?'증가':(rate<0?'감소':'변화 없음');
    show(fmt(Math.abs(rate))+'% '+word,'공식: (Y − X) ÷ X × 100 = ('+fmt(cy)+' − '+fmt(cx)+') ÷ '+fmt(cx)+' × 100');
  }else{
    var dx=parseFloat($('pc-d-x').value), dp=parseFloat($('pc-d-p').value);
    if(isNaN(dx)||isNaN(dp)||dp===0){show('숫자를 입력하면 바로 계산돼요','');return;}
    var whole=dx/dp*100;
    show('전체값 = '+fmt(whole),'공식: X ÷ P × 100 = '+fmt(dx)+' ÷ '+fmt(dp)+' × 100');
  }
}
var tabs=document.querySelectorAll('.pc-tab');
for(var i=0;i<tabs.length;i++){
  tabs[i].addEventListener('click',function(){
    tab=this.getAttribute('data-t');
    for(var j=0;j<tabs.length;j++){tabs[j].style.background='#fff';tabs[j].style.color='#333';tabs[j].style.borderColor='#ccc';}
    this.style.background='#059669';this.style.color='#fff';this.style.borderColor='#059669';
    var panes=document.querySelectorAll('.pc-pane');
    for(var k=0;k<panes.length;k++){panes[k].style.display='none';}
    $('pc-'+tab).style.display='block';
    calc();
  });
}
var inputs=document.querySelectorAll('.pf-tool input');
for(var m=0;m<inputs.length;m++){inputs[m].addEventListener('input',calc);}
})();
</script>

## 퍼센트 계산, 이렇게 해요

퍼센트(%)는 "전체를 100으로 봤을 때 얼마인가"를 나타내는 비율이에요. 헷갈릴 때는 아래 네 가지 공식만 기억하면 대부분 해결돼요.

- **X는 Y의 몇 %?** → `X ÷ Y × 100`. 시험에서 180점 만점에 45점을 받았다면 `45 ÷ 180 × 100 = 25%`예요.
- **Y의 X%는?** → `Y × X ÷ 100`. 5만원짜리 옷이 15% 할인이면 할인액은 `50000 × 15 ÷ 100 = 7,500원`, 결제액은 42,500원이에요.
- **X에서 Y로 몇 % 증가/감소?** → `(Y − X) ÷ X × 100`. 연봉이 4,000만원에서 4,600만원이 됐다면 `(4600 − 4000) ÷ 4000 × 100 = 15% 인상`이에요.
- **X가 전체의 P%일 때 전체는?** → `X ÷ P × 100`. 계약금 30만원이 전체의 20%라면 전체 금액은 `30 ÷ 20 × 100 = 150만원`이에요.

### 실생활 예시

- **할인율**: 정가 대비 얼마나 깎였는지는 (할인액 ÷ 정가 × 100)으로 구해요. 정가 8만원 상품을 6만원에 샀다면 `(80000 − 60000) ÷ 80000 × 100 = 25% 할인`이에요. 위 계산기의 '증감률' 탭에 이전값·이후값을 넣으면 바로 나와요.
- **시험 점수·정답률**: 맞힌 개수 ÷ 전체 문항 × 100. 40문제 중 34개를 맞혔다면 85%예요. '몇 %?' 탭을 쓰면 돼요.
- **연봉 인상률**: 작년 연봉과 올해 연봉을 '증감률' 탭에 넣으면 인상률이 바로 계산돼요. 실제로 손에 쥐는 금액이 궁금하면 인상 후 연봉을 [연봉 실수령액 계산기](/tools/salary-calculator/)에 넣어 세후 금액까지 확인해 보세요.

### 자주 틀리는 포인트

- **증가율과 비중을 헷갈리지 마세요.** "20% 올랐다"와 "전체의 20%다"는 완전히 다른 계산이에요. 오른 정도는 증감률 탭, 차지하는 비중은 '몇 %?' 탭을 써요.
- **%p(퍼센트포인트)와 %는 달라요.** 금리가 3%에서 4%가 되면 "1%p 상승"이지 "1% 상승"이 아니에요. 증가율로 따지면 `(4 − 3) ÷ 3 × 100 ≈ 33.3%` 상승이에요.
- **할인 후 같은 %를 더해도 원래 가격이 안 돼요.** 1만원에서 20% 깎으면 8천원, 여기서 다시 20%를 더하면 9,600원이라 원래대로 돌아오지 않아요. 기준값이 달라졌기 때문이에요.

## 자주 묻는 질문

**Q. 25%는 소수로 얼마인가요?**
퍼센트를 100으로 나누면 소수가 돼요. 25% = 0.25, 7.5% = 0.075예요. 반대로 소수에 100을 곱하면 퍼센트가 돼요.

**Q. 할인율은 어떻게 구하나요?**
`(정가 − 판매가) ÷ 정가 × 100`이에요. 정가 5만원을 4만원에 팔면 `(50000 − 40000) ÷ 50000 × 100 = 20% 할인`이에요. 위 계산기의 '증감률' 탭에 이전값 5만, 이후값 4만을 넣으면 20% 감소로 나와요.

**Q. %와 %p(퍼센트포인트)는 뭐가 다른가요?**
두 퍼센트 값의 **차이**는 %p로 말해요. 실업률이 3%에서 5%가 되면 "2%p 상승"이에요. 반면 증가한 **비율**을 따지면 `(5 − 3) ÷ 3 × 100 ≈ 66.7%` 상승이에요. 상황에 맞게 구분해서 써야 오해가 없어요.

**Q. 부가세 10%가 포함된 가격에서 원래 금액을 알려면요?**
부가세 포함가에서 공급가를 구하려면 1.1로 나눠요. 11,000원(부가세 포함)이면 공급가는 `11000 ÷ 1.1 = 10,000원`, 부가세는 1,000원이에요. 매달 나가는 돈이나 대출 이자를 함께 계획하려면 [대출 이자 계산기](/tools/loan/)도 참고해 보세요.

**Q. 계산 결과의 소수점은 어디까지 나오나요?**
이 계산기는 소수점 넷째 자리까지 반올림해 보여줘요. 더 정밀한 값이 필요하면 공식에 직접 대입해 계산해 주세요.
