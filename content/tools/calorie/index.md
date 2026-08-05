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
  <div style="margin-top:16px;padding:14px;border:1px dashed #cbd5e1;border-radius:10px;background:#f8fafc;">
    <div style="font-weight:700;margin-bottom:8px;">🎯 감량 목표 (선택)</div>
    <div style="display:flex;gap:10px;">
      <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">빼고 싶은 무게 (kg)</span><input type="tel" id="cl-goal" inputmode="decimal" placeholder="5" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
      <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:6px;">기간 (주)</span><input type="tel" id="cl-weeks" inputmode="numeric" placeholder="8" style="width:100%;padding:11px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    </div>
    <div style="font-size:12px;color:#6b7280;margin-top:7px;">목표를 넣으면 하루 몇 kcal 적자로 먹어야 하는지·건강한 페이스인지 알려드려요.</div>
  </div>
  <button id="cl-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="cl-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:15px;color:#555;">하루 유지 칼로리 (TDEE)</div>
      <div id="cl-big" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="cl-rows"></tbody></table>
    <div id="cl-goalbox" style="display:none;margin-top:14px;padding:16px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">
      <div style="font-weight:800;color:#c2410c;font-size:15px;margin-bottom:8px;">🎯 감량 목표 플랜</div>
      <table style="width:100%;font-size:14.5px;border-collapse:collapse;"><tbody id="cl-goalrows"></tbody></table>
      <div id="cl-goalwarn" style="font-size:13px;margin-top:10px;line-height:1.6;"></div>
    </div>
    <div id="cl-macro" style="display:none;margin-top:14px;padding:16px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;">
      <div style="font-weight:800;color:#1d4ed8;font-size:15px;margin-bottom:8px;">🍱 하루 영양소 배분 (다이어트 칼로리 기준)</div>
      <table style="width:100%;font-size:14.5px;border-collapse:collapse;"><tbody id="cl-macrorows"></tbody></table>
      <div style="font-size:12px;color:#6b7280;margin-top:9px;line-height:1.6;">근손실 방지의 핵심은 <b>단백질을 충분히(체중×1.6~2.2g)</b> 먹으면서 <b>근력운동</b>을 병행하는 거예요. 단백질을 지키면 빠지는 무게 대부분이 지방이 됩니다(칼로리만 줄이고 단백질·운동이 부족하면 근육도 같이 빠져요).</div>
    </div>
    <div style="font-size:12px;color:#6b7280;margin-top:10px;">※ 기초대사량(BMR)=가만히 있어도 쓰는 최소 칼로리. 유지 칼로리(TDEE)=BMR×활동계수. 지방 1kg≈7,700kcal. 개인차가 있으니 2주 체중변화로 보정하세요.</div>
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

  // 감량 목표 플랜
  var goal=parseFloat($('cl-goal').value)||0, weeks=parseFloat($('cl-weeks').value)||0;
  if(goal>0 && weeks>0){
    var dailyDeficit=Math.round(goal*7700/(weeks*7));   // 지방1kg=7700kcal
    var target=Math.round(tdee-dailyDeficit);
    var paceKgWk=goal/weeks, pacePct=paceKgWk/w*100;
    function grow(l,v,c){return '<tr><td style="color:#555;">'+l+'</td><td style="text-align:right;font-weight:700;'+(c?'color:'+c+';':'')+'">'+v+'</td></tr>';}
    $('cl-goalrows').innerHTML=
      grow('목표', goal+'kg 감량 / '+weeks+'주')
     +grow('필요한 하루 적자', '−'+dailyDeficit.toLocaleString()+' kcal')
     +grow('하루 섭취 목표', target.toLocaleString()+' kcal','#c2410c')
     +grow('주간 감량 페이스', paceKgWk.toFixed(2)+'kg/주 (체중의 '+pacePct.toFixed(1)+'%)');
    var warn='', wc='#166534';
    if(target < bmr){ warn='⚠️ 이 목표는 하루 섭취가 <b>기초대사량('+Math.round(bmr).toLocaleString()+'kcal)보다 낮아요</b>. 근손실·요요 위험이 커요. 기간을 늘리거나 목표를 줄이세요.'; wc='#b91c1c'; }
    else if(pacePct > 1){ warn='⚠️ 주 '+pacePct.toFixed(1)+'%는 다소 빠른 페이스예요(권장 0.5~1%/주). 근손실 방지엔 조금 완만하게가 좋아요.'; wc='#b45309'; }
    else { warn='✅ 건강한 감량 페이스예요(주 0.5~1% 권장 범위). 단백질·근력운동 챙기면 지방 위주로 빠져요.'; wc='#166534'; }
    $('cl-goalwarn').innerHTML=warn; $('cl-goalwarn').style.color=wc;
    $('cl-goalbox').style.display='block';

    // 매크로 배분(다이어트 목표칼로리 기준): 단백질 체중×1.8g, 지방 25%, 나머지 탄수
    var dietCal=Math.max(target, Math.round(bmr));   // BMR 밑으론 안 내려가게 표시
    var pg=Math.round(w*1.8), pk=pg*4;
    var fk=Math.round(dietCal*0.25), fg=Math.round(fk/9);
    var ck=Math.max(0, dietCal-pk-fk), cg=Math.round(ck/4);
    function mrow(l,g,k,c){return '<tr><td style="color:#555;">'+l+'</td><td style="text-align:right;font-weight:700;color:'+c+';">'+g+'g <span style="color:#9ca3af;font-weight:400;">('+k.toLocaleString()+'kcal)</span></td></tr>';}
    $('cl-macrorows').innerHTML=
      mrow('단백질 (체중×1.8g)', pg, pk, '#059669')
     +mrow('지방 (25%)', fg, fk, '#d97706')
     +mrow('탄수화물 (나머지)', cg, ck, '#2563eb');
    $('cl-macro').style.display='block';
  } else { $('cl-goalbox').style.display='none'; $('cl-macro').style.display='none'; }

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
