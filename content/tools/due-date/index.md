---
title: "배란일·가임기 계산기 — 배란 예상일·가임 기간"
description: "마지막 생리 시작일과 생리주기를 입력하면 배란 예상일과 가임기(임신 잘 되는 기간), 다음 생리 예정일을 계산합니다. 무료 배란일 계산기."
date: 2026-07-22
slug: "due-date"
categories: ["도구"]
tags: ["배란일 계산기", "가임기 계산", "배란 예상일", "생리주기 계산", "다음 생리일"]
toc: false
readingTime: false
---

마지막 생리 시작일과 **생리주기**를 넣으면 **배란 예상일·가임기·다음 생리 예정일**을 계산합니다. (주기 기준 추정)

<div class="pf-tool" style="max-width:480px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">마지막 생리 시작일 (LMP)</span><input type="date" id="dd-lmp" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">평균 생리주기 (일)</span><input type="tel" id="dd-cyc" inputmode="numeric" value="28" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <button id="dd-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="dd-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#fdf2f8;">
      <div style="font-size:15px;color:#555;">배란 예상일</div>
      <div id="dd-big" style="font-size:30px;font-weight:800;color:#be185d;line-height:1.2;"></div>
      <div id="dd-week" style="font-size:14px;color:#6b7280;margin-top:6px;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="dd-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 배란일 ≈ 다음 생리 예정일 14일 전. 가임기·배란일은 주기 기준 추정이라 개인차가 커요. 정확한 건 배란테스트기·산부인과 진료로 확인하세요.</div>
  </div>
</div>
<style>#dd-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#dd-rows td:last-child{text-align:right;font-weight:700;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var W=['일','월','화','수','목','금','토'];
function fmt(d){return d.getFullYear()+'.'+(d.getMonth()+1)+'.'+d.getDate()+' ('+W[d.getDay()]+')';}
$('dd-go').onclick=function(){
  var lmpv=$('dd-lmp').value; if(!lmpv){alert('마지막 생리 시작일을 입력해 주세요');return;}
  var cyc=parseInt($('dd-cyc').value)||28;
  var lmp=new Date(lmpv);
  var ov=new Date(lmp); ov.setDate(ov.getDate()+(cyc-14));
  var fs=new Date(ov); fs.setDate(fs.getDate()-5);
  var fe=new Date(ov); fe.setDate(fe.getDate()+1);
  var next=new Date(lmp); next.setDate(next.getDate()+cyc);
  var today=new Date(); today.setHours(0,0,0,0);
  var ovDay=Math.round((ov-today)/86400000);
  $('dd-big').textContent=fmt(ov);
  $('dd-week').textContent=ovDay>=0?('배란일까지 D-'+ovDay):('배란 예상일 '+(-ovDay)+'일 지남');
  function row(l,v){return '<tr><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('dd-rows').innerHTML=
    row('배란 예상일', fmt(ov))
   +row('가임기 (임신 잘 되는 기간)', fmt(fs)+' ~ '+fmt(fe))
   +row('다음 생리 예정일', fmt(next))
   +row('생리주기', cyc+'일');
  $('dd-out').style.display='block';
};
})();
</script>

## 배란일·가임기, 이렇게 계산해요

- **배란일** ≈ 다음 생리 예정일 **14일 전**. 주기가 28일이면 마지막 생리 시작일(LMP) + 14일, 30일이면 LMP + 16일이에요.
- **가임기**: 배란일 앞 5일 ~ 뒤 1일. 정자는 최대 5일, 난자는 하루 정도 살아 이 기간에 임신 확률이 가장 높아요.
- **다음 생리 예정일** = 마지막 생리 시작일 + 평균 생리주기.
- 주기가 불규칙하면 추정 오차가 커요. 배란테스트기(LH 검사)나 기초체온 측정을 함께 쓰면 더 정확해요.
- 계산 결과는 브라우저에서 처리되며 입력값은 저장되지 않습니다.

## 가임기를 넓게 보는 이유

계산기는 배란 예상일의 **앞 5일부터 뒤 1일까지**를 가임기로 잡아요. 배란 순간에만 임신이 되는 게 아니라, 정자가 몸속에서 최대 5일 정도 살아 있을 수 있어서 배란 며칠 전에 관계가 있어도 임신으로 이어질 수 있기 때문이에요. 반대로 난자는 배란 후 하루 남짓이면 수정 능력을 잃어요. 그래서 '배란일 하루'보다 그 앞쪽 며칠을 함께 챙기는 게 핵심이에요. 다만 이 창은 주기가 규칙적일수록 잘 맞고, 주기가 들쭉날쭉하면 배란일 자체가 앞뒤로 크게 움직일 수 있어요.

## 더 정확하게 보려면

- **최근 3~6개월 주기를 평균 내세요.** 매달 주기가 조금씩 다르면 평균값을 넣는 게 단순히 28일을 쓰는 것보다 오차가 적어요.
- **배란테스트기(LH)를 병행하세요.** 소변으로 배란 직전 호르몬 급증을 잡아줘서 계산 추정과 겹쳐 보면 훨씬 든든해요.
- **기초체온을 기록해 보세요.** 배란 후 체온이 살짝 오르는 패턴이 몇 달 쌓이면 내 몸의 리듬이 보여요.
- 임신을 계획 중이라면 계산은 참고로만 두고, 컨디션 관리와 함께 산부인과 상담을 받아보는 걸 권해요.

## 자주 묻는 질문

**Q. 배란일은 어떻게 정해지나요?**
'다음 생리 예정일 14일 전'을 기준으로 잡아요. 주기가 28일이면 마지막 생리 시작일 + 14일, 30일이면 + 16일이 되는 식이에요. 정확한 날짜는 위 계산기에 내 정보를 넣어 확인하세요.

**Q. 주기가 불규칙한데 믿어도 되나요?**
주기가 매달 크게 바뀌면 추정 오차도 커져요. 이럴 땐 계산 결과를 '대략의 범위'로만 참고하고 배란테스트기를 함께 쓰는 게 좋아요.

**Q. 가임기가 지나면 임신이 안 되나요?**
가임기는 임신 확률이 가장 높은 구간일 뿐, 창을 벗어났다고 100% 안 된다는 뜻은 아니에요. 어디까지나 통계적 추정이라는 점을 기억해 주세요.

**Q. 다른 날짜 계산도 해보고 싶어요.**
출산 예정일이 지나면 아기의 백일·돌 같은 기념일이 궁금해지죠. 그럴 땐 [디데이 계산기](/tools/dday/)나 [날짜 계산기](/tools/date-calc/)로 원하는 날까지 며칠 남았는지 쉽게 세어볼 수 있어요.

※ 이 도구는 재미와 참고를 위한 것으로 의학적 진단이 아니에요.
