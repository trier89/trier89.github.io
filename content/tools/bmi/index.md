---
title: "BMI 계산기 — 비만도·표준체중·적정체중 (2026)"
description: "키와 몸무게로 BMI(체질량지수)와 비만도 단계, 나에게 맞는 표준·적정 체중 범위를 계산해요. 대한비만학회 기준."
date: 2026-07-21
slug: "bmi"
categories: ["도구"]
tags: ["BMI 계산기", "비만도 계산기", "표준체중", "체질량지수", "적정체중"]
toc: false
readingTime: false
---

키와 몸무게를 입력하면 **BMI(체질량지수)**, 비만도 단계, 그리고 나에게 맞는 **표준·적정 체중 범위**를 알려드려요. (대한비만학회 기준)

<div class="pf-tool" style="max-width:480px;margin:0 auto;">
  <div style="display:flex;gap:10px;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">키 (cm)</span><input type="tel" id="bmi-h" inputmode="decimal" placeholder="170" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">몸무게 (kg)</span><input type="tel" id="bmi-w" inputmode="decimal" placeholder="65" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <button id="bmi-go" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="bmi-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;" id="bmi-card">
      <div style="font-size:14px;color:#555;">나의 BMI</div>
      <div id="bmi-val" style="font-size:40px;font-weight:800;line-height:1.2;"></div>
      <div id="bmi-cat" style="font-size:18px;font-weight:700;"></div>
    </div>
    <div id="bmi-scale" style="margin-top:14px;"></div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="bmi-rows"></tbody></table>
    <button id="bmi-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">📤 공유하기</button>
  </div>
</div>
<style>#bmi-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#bmi-rows td:last-child{text-align:right;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 대한비만학회: 저체중<18.5, 정상18.5~23, 과체중23~25, 비만1단계25~30, 2단계30~35, 3단계35+
var CATS=[[18.5,'저체중','#0891b2'],[23,'정상','#059669'],[25,'과체중','#e0c07e'],[30,'비만 1단계','#f59e0b'],[35,'비만 2단계','#ef4444'],[999,'비만 3단계','#b91c1c']];
$('bmi-go').onclick=function(){
  var h=parseFloat($('bmi-h').value),w=parseFloat($('bmi-w').value);
  if(!h||!w||h<80||h>250||w<20||w>300){alert('키(cm)와 몸무게(kg)를 정확히 입력해 주세요');return;}
  var m=h/100, bmi=w/(m*m);
  var cat='',color='';for(var i=0;i<CATS.length;i++){if(bmi<CATS[i][0]){cat=CATS[i][1];color=CATS[i][2];break;}}
  $('bmi-val').textContent=bmi.toFixed(1);$('bmi-val').style.color=color;
  $('bmi-cat').textContent=cat;$('bmi-cat').style.color=color;
  $('bmi-card').style.background=color+'22';
  // 정상 체중범위 18.5~23
  var lo=(18.5*m*m),hi=(23*m*m),std=(22*m*m);
  $('bmi-rows').innerHTML=
    '<tr><td style="color:#555;">정상 체중 범위</td><td>'+lo.toFixed(1)+' ~ '+hi.toFixed(1)+' kg</td></tr>'
    +'<tr><td style="color:#555;">표준 체중 (BMI 22)</td><td>'+std.toFixed(1)+' kg</td></tr>'
    +'<tr><td style="color:#555;">현재와의 차이</td><td>'+(w>hi?'+'+(w-hi).toFixed(1)+'kg 감량 권장':w<lo?(lo-w).toFixed(1)+'kg 증량 여유':'정상 범위 ✓')+'</td></tr>';
  $('bmi-out').style.display='block';
  $('bmi-share').onclick=function(){var t='내 BMI는 '+bmi.toFixed(1)+' ('+cat+')! 너도 확인 👉 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
};
})();
</script>

## BMI란?

BMI(Body Mass Index, 체질량지수)는 몸무게(kg)를 키(m)의 제곱으로 나눈 값으로, 비만 정도를 간단히 가늠하는 지표예요.

| BMI | 판정 (대한비만학회) |
|---|---|
| 18.5 미만 | 저체중 |
| 18.5 ~ 23 | 정상 |
| 23 ~ 25 | 과체중 |
| 25 ~ 30 | 비만 1단계 |
| 30 ~ 35 | 비만 2단계 |
| 35 이상 | 비만 3단계 |

> BMI는 근육량·체지방을 구분하지 못해요. 운동선수처럼 근육이 많으면 실제보다 높게 나올 수 있으니 참고용으로만 봐주세요.
