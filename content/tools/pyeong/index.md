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
