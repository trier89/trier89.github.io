---
title: "칼로리·기초대사량(BMR) 계산기 — 유지·다이어트 칼로리"
description: "성별·나이·키·몸무게·활동량을 입력하면 기초대사량(BMR)과 하루 유지·다이어트·증량 칼로리를 계산합니다. 무료 다이어트 계산기."
date: 2026-07-22
slug: "calorie"
categories: ["도구"]
tags: ["기초대사량 계산기", "칼로리 계산기", "BMR", "다이어트 칼로리", "유지 칼로리"]
toc: false
readingTime: false
---

성별·나이·키·몸무게·활동량을 넣으면 **기초대사량(BMR)**과 하루 **유지/다이어트/증량 칼로리**를 계산합니다. (Mifflin-St Jeor 공식)

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <div style="display:flex;gap:10px;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">성별</span>
      <select id="cl-sex" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;"><option value="m">남성</option><option value="f">여성</option></select></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">나이</span><input type="tel" id="cl-age" inputmode="numeric" placeholder="30" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <div style="display:flex;gap:10px;margin-top:12px;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">키 (cm)</span><input type="tel" id="cl-h" inputmode="decimal" placeholder="170" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">몸무게 (kg)</span><input type="tel" id="cl-w" inputmode="decimal" placeholder="65" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">활동량</span>
    <select id="cl-act" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;">
      <option value="1.2">거의 안 함 (좌식 생활)</option>
      <option value="1.375">가벼운 운동 (주 1~3회)</option>
      <option value="1.55" selected>보통 운동 (주 3~5회)</option>
      <option value="1.725">활발한 운동 (주 6~7회)</option>
      <option value="1.9">매우 활발 (육체노동·운동선수)</option>
    </select></label>
  <button id="cl-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="cl-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">하루 유지 칼로리 (TDEE)</div>
      <div id="cl-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="cl-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 기초대사량(BMR)=가만히 있어도 쓰는 최소 칼로리. 유지 칼로리(TDEE)=BMR×활동계수. 다이어트는 유지−500(주 약 0.5kg 감량), 증량은 유지+300~500. 개인차가 있으니 2주 체중변화로 보정하세요.</div>
  </div>
</div>
<style>#cl-rows td{padding:9px 6px;border-bottom:1px solid #eee;}#cl-rows td:last-child{text-align:right;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
$('cl-go').onclick=function(){
  var sex=$('cl-sex').value, age=parseFloat($('cl-age').value)||0, h=parseFloat($('cl-h').value)||0, w=parseFloat($('cl-w').value)||0, act=parseFloat($('cl-act').value);
  if(!age||!h||!w){alert('나이·키·몸무게를 입력해 주세요');return;}
  var bmr=10*w+6.25*h-5*age+(sex==='m'?5:-161);
  var tdee=bmr*act;
  $('cl-big').textContent=Math.round(tdee).toLocaleString()+' kcal';
  function row(l,v,c){return '<tr><td style="color:#555;">'+l+'</td><td'+(c?' style="color:'+c+';"':'')+'>'+v+'</td></tr>';}
  $('cl-rows').innerHTML=
    row('기초대사량 (BMR)', Math.round(bmr).toLocaleString()+' kcal')
   +row('하루 유지 칼로리 (TDEE)', Math.round(tdee).toLocaleString()+' kcal')
   +row('다이어트 (−500)', Math.round(tdee-500).toLocaleString()+' kcal','#dc2626')
   +row('완만한 감량 (−300)', Math.round(tdee-300).toLocaleString()+' kcal')
   +row('증량 (+400)', Math.round(tdee+400).toLocaleString()+' kcal','#1d4ed8')
   +row('권장 단백질 (체중×1.6g)', Math.round(w*1.6)+' g');
  $('cl-out').style.display='block';
};
})();
</script>

## 칼로리, 이렇게 잡으세요

- **기초대사량(BMR)**: 숨쉬고 심장 뛰는 데만 쓰는 최소 에너지. 근육이 많을수록 높아요.
- **유지 칼로리(TDEE)** = BMR × 활동계수. 이만큼 먹으면 체중이 유지돼요.
- **다이어트**: 유지 칼로리에서 **하루 500kcal 덜** 먹으면 주 약 0.5kg 빠져요. 너무 적게(BMR 이하) 먹으면 근손실·요요가 와요.
- **증량**: 유지 + 300~500kcal + 근력운동.
- **단백질**: 체중 1kg당 1.6~2.2g이 근육 유지·증가에 좋아요.
- [BMI(비만도)](/tools/bmi/)도 함께 확인해 보세요.
