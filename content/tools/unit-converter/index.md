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
