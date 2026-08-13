---
title: "단위 변환기 — 길이·무게·넓이·부피·온도·속도"
description: "길이·무게·넓이·부피·온도·속도를 실시간으로 변환합니다. m/km/inch, kg/근/돈, ㎡/평, L/되, ℃/℉, km/h 등 한국 단위까지 지원하는 무료 단위 변환기."
date: 2026-07-22
slug: "unit-converter"
categories: ["도구"]
tags: ["단위 변환기", "평 계산", "무게 변환", "온도 변환", "길이 변환"]
toc: false
readingTime: false
---

**길이·무게·넓이·부피·온도·속도**를 입력하는 즉시 실시간으로 변환해요. 평·근·돈·되·척 같은 한국 단위도 지원해요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div id="uc-cats" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;"></div>
  <div style="display:flex;gap:8px;align-items:flex-end;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;font-size:13px;color:#555;">값</span><input type="tel" id="uc-val" inputmode="decimal" value="1" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;font-size:13px;color:#555;">단위</span><select id="uc-from" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;"></select></label>
  </div>
  <div id="uc-out" style="margin-top:16px;">
    <table style="width:100%;font-size:15px;border-collapse:collapse;"><tbody id="uc-rows"></tbody></table>
  </div>
</div>
<style>.uc-cat{padding:9px 12px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-weight:700;font-size:13.5px;cursor:pointer;}.uc-cat.on{border-color:#d97757;background:#fdf5f2;color:#c65f3f;}#uc-rows td{padding:9px 6px;border-bottom:1px solid #eee;}#uc-rows td:first-child{color:#555;}#uc-rows td:last-child{text-align:right;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 각 카테고리: 기준단위(1) 대비 배율. 값 v(단위 a) → 기준 = v*factor[a]; 목표 b = 기준/factor[b].
var CATS={
 '길이':{base:'m',units:{'m':1,'km':1000,'cm':0.01,'mm':0.001,'inch':0.0254,'feet':0.3048,'mile':1609.344,'척(자)':0.303}},
 '무게':{base:'kg',units:{'kg':1,'g':0.001,'mg':0.000001,'ton':1000,'근(600g)':0.6,'돈':0.00375,'파운드':0.45359237,'온스':0.0283495}},
 '넓이':{base:'㎡',units:{'㎡':1,'평':3.305785,'㏊':10000,'에이커':4046.8564,'㎢':1000000}},
 '부피':{base:'L',units:{'L':1,'mL':0.001,'㎥':1000,'갤런(US)':3.785412,'되':1.8039}},
 '속도':{base:'m/s',units:{'m/s':1,'km/h':0.2777778,'mph':0.44704}}
};
// 온도는 별도 처리
function fmtNum(x){
  if(x===0) return '0';
  var a=Math.abs(x);
  var s;
  if(a>=1e9||a<1e-4) s=x.toPrecision(6);
  else s=(Math.round(x*1e6)/1e6).toString();
  return parseFloat(s).toLocaleString(undefined,{maximumFractionDigits:6});
}
var cur='길이';
function toC(u,v){return u==='℃'?v:u==='℉'?(v-32)*5/9:v-273.15;} // 임의단위→℃
function fromC(u,c){return u==='℃'?c:u==='℉'?c*9/5+32:c+273.15;}
function buildCats(){
  var html='';
  Object.keys(CATS).forEach(function(k){html+='<button class="uc-cat" data-c="'+k+'">'+k+'</button>';});
  html+='<button class="uc-cat" data-c="온도">온도</button>';
  $('uc-cats').innerHTML=html;
  [].forEach.call(document.querySelectorAll('.uc-cat'),function(b){b.onclick=function(){cur=b.dataset.c;selectCat();};});
}
function selectCat(){
  document.querySelectorAll('.uc-cat').forEach(function(x){x.classList.toggle('on',x.dataset.c===cur);});
  var sel=$('uc-from'),opts='';
  var units = cur==='온도'?['℃','℉','K']:Object.keys(CATS[cur].units);
  units.forEach(function(u){opts+='<option value="'+u+'">'+u+'</option>';});
  sel.innerHTML=opts;
  calc();
}
function calc(){
  var v=parseFloat(($('uc-val').value||'').replace(/,/g,''));
  var from=$('uc-from').value;
  var rows='';
  if(isNaN(v)){$('uc-rows').innerHTML='<tr><td colspan="2" style="color:#888;">숫자를 입력하세요</td></tr>';return;}
  if(cur==='온도'){
    var c=toC(from,v);
    ['℃','℉','K'].forEach(function(u){if(u!==from)rows+='<tr><td>'+u+'</td><td>'+fmtNum(fromC(u,c))+'</td></tr>';});
  }else{
    var f=CATS[cur].units, baseVal=v*f[from];
    Object.keys(f).forEach(function(u){if(u!==from)rows+='<tr><td>'+u+'</td><td>'+fmtNum(baseVal/f[u])+'</td></tr>';});
  }
  $('uc-rows').innerHTML=rows;
}
$('uc-val').addEventListener('input',calc);
$('uc-from').addEventListener('change',calc);
buildCats();selectCat();
})();
</script>

## 단위 변환기 사용법

- 위에서 **카테고리**(길이·무게·넓이·부피·온도·속도)를 고르고, **값과 단위**를 입력하면 나머지 단위로 **즉시 변환**돼요.
- **한국 전통 단위**도 지원해요: 척(자)=0.303m, 근=600g, 돈=3.75g, 평=3.306㎡, 되=1.8039L.
- **넓이**: 1평 ≈ 3.306㎡, 1㏊=10,000㎡, 1에이커 ≈ 4,046.86㎡.
- **온도**: 섭씨(℃)·화씨(℉)·켈빈(K) 사이를 정확한 공식으로 환산해요(℉ = ℃×9/5+32).
- **속도**: m/s, km/h, mph를 서로 바꿔요.

계산 결과는 브라우저에서 처리되며 입력값은 저장되지 않습니다.

## 단위는 어떻게 변환될까요

단위 변환의 원리는 간단해요. 각 단위를 **하나의 기준 단위**(길이는 m, 무게는 kg, 넓이는 ㎡ 등)로 바꾼 뒤, 다시 원하는 단위로 나눠 주는 방식이에요. 예를 들어 길이는 모든 값을 미터로 환산했다가 목표 단위로 변환하죠. 그래서 어떤 단위를 넣어도 나머지가 한 번에 계산돼요.

- **길이**: 1인치 = 2.54cm, 1피트 = 30.48cm, 1마일 ≈ 1,609m로 고정된 값이에요.
- **무게**: 1근 = 600g, 1돈 = 3.75g, 1파운드 ≈ 453.6g. 금·한약재는 돈·근을, 수입 표기는 파운드·온스를 자주 써요.
- **온도**는 배율이 아니라 공식으로 바꿔요. 섭씨↔화씨는 `℉ = ℃×9/5+32`, 켈빈은 `K = ℃+273.15`라서 0을 곱하는 다른 단위와 계산 방식이 달라요.

## 이럴 때 쓰면 편해요

- **부동산·인테리어**: 평↔㎡ 변환이 잦죠. 전용면적이나 가구 배치를 가늠할 때 유용해요. 평 계산만 자주 한다면 [평↔㎡ 변환기](/tools/pyeong/)가 더 간편해요.
- **해외 직구·레시피**: 파운드·온스·갤런처럼 해외 단위로 적힌 무게·부피를 우리 단위로 바꿀 때 좋아요.
- **여행·운동**: mph로 표시된 속도를 km/h로, 화씨 기온을 섭씨로 바꿔 감을 잡을 수 있어요.
- 키·몸무게 단위를 정리했다면 [BMI 계산기](/tools/bmi/)로 건강 지표까지 확인해 보세요.

## 자주 묻는 질문

**Q. 1평은 정확히 몇 ㎡인가요?**
1평 ≈ **3.306㎡**예요(정확히는 400/121㎡). 반대로 1㎡ ≈ 0.3025평이에요. 이 값은 관습적으로 정해진 환산율이라 늘 동일해요.

**Q. 근이 600g인데 왜 과일 가게는 다르게 쓰나요?**
전통적으로 고기·한약재의 1근은 **600g**, 채소·과일은 **375g**을 쓰는 관습이 남아 있어요. 이 변환기는 무게 단위의 근을 600g 기준으로 계산하니, 시장에서 쓰는 근과 다를 수 있어요.

**Q. 결과 숫자가 소수점에서 반올림되나요?**
네, 화면에서는 보기 좋게 일정 자리에서 반올림해 표시해요. 아주 작은 값이나 큰 값은 유효숫자 형태로 보여줄 수 있어서, 정밀 계산이 필요하면 원본 값을 따로 확인하세요.

**Q. 온도는 왜 켈빈이 음수가 안 되나요?**
켈빈(K)은 절대영도(-273.15℃)를 0으로 삼는 절대온도라, 이론상 0K보다 낮은 값이 없어요. 그래서 아주 낮은 섭씨를 넣어도 켈빈은 양수로 나와요.
