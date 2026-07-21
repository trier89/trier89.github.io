---
title: "출산 예정일·배란일 계산기 — 임신 주수·가임기"
description: "마지막 생리 시작일과 생리주기를 입력하면 출산 예정일, 현재 임신 주수, 배란일과 가임기를 계산합니다. 무료 임신 계산기."
date: 2026-07-22
slug: "due-date"
categories: ["도구"]
tags: ["출산예정일 계산기", "배란일 계산기", "임신 주수", "가임기 계산", "임신 계산기"]
toc: false
readingTime: false
---

마지막 생리 시작일과 **생리주기**를 넣으면 출산 예정일·현재 임신 주수·배란일·가임기를 계산합니다. (네겔레 법칙 기준)

<div class="pf-tool" style="max-width:480px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">마지막 생리 시작일 (LMP)</span><input type="date" id="dd-lmp" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <label style="display:block;margin-top:12px;"><span style="display:block;font-weight:700;margin-bottom:6px;">평균 생리주기 (일)</span><input type="tel" id="dd-cyc" inputmode="numeric" value="28" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <button id="dd-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="dd-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#fdf2f8;">
      <div style="font-size:15px;color:#555;">출산 예정일</div>
      <div id="dd-big" style="font-size:30px;font-weight:800;color:#be185d;line-height:1.2;"></div>
      <div id="dd-week" style="font-size:14px;color:#6b7280;margin-top:6px;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="dd-rows"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 출산예정일 = 마지막 생리 시작일 + 280일(40주). 배란일·가임기는 주기 기준 추정이라 개인차가 커요. 정확한 건 산부인과 초음파로 확인하세요.</div>
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
  var due=new Date(lmp); due.setDate(due.getDate()+280);
  var ov=new Date(lmp); ov.setDate(ov.getDate()+(cyc-14));
  var fs=new Date(ov); fs.setDate(fs.getDate()-5);
  var fe=new Date(ov); fe.setDate(fe.getDate()+1);
  var today=new Date(); today.setHours(0,0,0,0);
  var daysPreg=Math.floor((today-lmp)/86400000);
  var w=Math.floor(daysPreg/7), d=daysPreg%7;
  var ddDay=Math.round((due-today)/86400000);
  $('dd-big').textContent=fmt(due);
  if(daysPreg>=0 && daysPreg<=294) $('dd-week').textContent='현재 임신 '+w+'주 '+d+'일차 · 출산까지 D-'+ddDay;
  else $('dd-week').textContent='출산까지 D-'+ddDay;
  function row(l,v){return '<tr><td style="color:#555;">'+l+'</td><td>'+v+'</td></tr>';}
  $('dd-rows').innerHTML=
    row('배란 예상일', fmt(ov))
   +row('가임기 (임신 잘 되는 기간)', fmt(fs)+' ~ '+fmt(fe))
   +row('임신 12주(안정기)', fmt(new Date(lmp.getTime()+84*86400000)))
   +row('출산 예정일 (40주)', fmt(due));
  $('dd-out').style.display='block';
};
})();
</script>

## 임신 계산, 이렇게 해요

- **출산 예정일** = 마지막 생리 시작일(LMP) + **280일(40주)**. 네겔레 법칙: LMP에서 3개월 빼고 7일 더하고 1년 더해요.
- **임신 주수**는 배란·수정일이 아니라 **마지막 생리 시작일**부터 세요. 그래서 배란(약 2주 후) 전에도 "임신 2주"로 계산돼요.
- **배란일** ≈ 다음 생리 예정일 14일 전. 주기가 28일이면 LMP + 14일, 30일이면 LMP + 16일이에요.
- **가임기**: 배란일 앞 5일 ~ 뒤 1일. 정자는 최대 5일, 난자는 하루 정도 살아요.
- 실제 예정일은 초음파(태아 크기)로 보정하며, 정상 출산은 예정일 ±2주예요.
