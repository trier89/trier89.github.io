---
title: "디데이 계산기 — D-day·기념일 며칠 남았나 (100일·1주년)"
description: "목표 날짜까지 며칠 남았는지, 특정 날짜로부터 며칠 지났는지 계산해요. 100일·200일·1주년 기념일 날짜도 자동으로 알려드립니다."
date: 2026-07-21
slug: "dday"
categories: ["도구"]
tags: ["디데이 계산기", "디데이", "기념일 계산기", "100일 계산", "날짜 계산"]
toc: false
readingTime: false
---

목표 날짜까지 **며칠 남았는지(D-day)**, 시작일로부터 **며칠 지났는지**, 그리고 **100일·200일·1주년 기념일** 날짜까지 한 번에 계산해요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div style="display:flex;gap:6px;margin-bottom:14px;">
    <button class="dd-tab" data-m="until" style="flex:1;">목표일까지 D-day</button>
    <button class="dd-tab" data-m="since" style="flex:1;">시작일부터 며칠째</button>
  </div>
  <label style="display:block;font-weight:700;margin-bottom:6px;" id="dd-label">목표 날짜</label>
  <input type="tel" id="dd-date" inputmode="numeric" placeholder="예: 20261225 (숫자 8자리)" maxlength="10" style="width:100%;padding:13px;border:2px solid #ccc;border-radius:10px;font-size:17px;box-sizing:border-box;">
  <button id="dd-go" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="dd-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#eff6ff;">
      <div id="dd-big" style="font-size:38px;font-weight:800;color:#1d4ed8;"></div>
      <div id="dd-sub" style="font-size:14px;color:#555;margin-top:4px;"></div>
    </div>
    <div id="dd-mile" style="margin-top:14px;"></div>
    <button id="dd-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;">📤 공유하기</button>
  </div>
</div>
<style>.dd-tab{padding:11px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-weight:700;font-size:13.5px;cursor:pointer;}.dd-tab.on{border-color:#2563eb;background:#eff6ff;color:#1d4ed8;}#dd-mile div{padding:8px 6px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;font-size:14.5px;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var mode='until';
function fmt(d){return d.getFullYear()+'.'+(d.getMonth()+1)+'.'+d.getDate();}
function parse(v){v=(v||'').replace(/[^0-9]/g,'');if(v.length!==8)return null;var y=+v.slice(0,4),m=+v.slice(4,6),d=+v.slice(6,8);if(m<1||m>12||d<1||d>31)return null;return new Date(y,m-1,d);}
$('dd-date').addEventListener('input',function(){var v=this.value.replace(/[^0-9]/g,'').slice(0,8);if(v.length>6)v=v.slice(0,4)+'.'+v.slice(4,6)+'.'+v.slice(6);else if(v.length>4)v=v.slice(0,4)+'.'+v.slice(4);this.value=v;});
[].forEach.call(document.querySelectorAll('.dd-tab'),function(b){b.onclick=function(){mode=b.dataset.m;document.querySelectorAll('.dd-tab').forEach(function(x){x.classList.toggle('on',x===b);});$('dd-label').textContent=mode==='until'?'목표 날짜':'시작 날짜';};});
document.querySelector('.dd-tab').classList.add('on');
$('dd-go').onclick=function(){
  var d=parse($('dd-date').value);if(!d){alert('날짜를 숫자 8자리로 입력해 주세요 (예: 20261225)');return;}
  var today=new Date();today.setHours(0,0,0,0);
  var diff=Math.round((d-today)/86400000);
  if(mode==='until'){
    $('dd-big').textContent=diff===0?'D-Day 🎉':diff>0?'D-'+diff:'D+'+(-diff);
    $('dd-sub').textContent=fmt(d)+' '+['일','월','화','수','목','금','토'][d.getDay()]+'요일'+(diff>0?' · '+diff+'일 남음':diff<0?' · '+(-diff)+'일 지남':' · 오늘이에요!');
    $('dd-mile').innerHTML='';
  }else{
    var since=Math.round((today-d)/86400000)+1;
    $('dd-big').textContent=since+'일째';
    $('dd-sub').textContent=fmt(d)+' 시작 · 오늘로 '+since+'일째';
    // 기념일
    var miles=[[100,'100일'],[200,'200일'],[300,'300일'],[365,'1주년'],[500,'500일'],[730,'2주년'],[1000,'1000일']];
    var html='';
    miles.forEach(function(m){var md=new Date(d);md.setDate(md.getDate()+m[0]-1);var dleft=Math.round((md-today)/86400000);html+='<div><span>'+m[1]+'</span><span style="font-weight:700;">'+fmt(md)+' '+(dleft>0?'(D-'+dleft+')':dleft===0?'(오늘!)':'(지남)')+'</span></div>';});
    $('dd-mile').innerHTML='<div style="font-weight:700;margin-bottom:6px;color:#1d4ed8;">🎯 기념일</div>'+html;
  }
  $('dd-out').style.display='block';
  $('dd-share').onclick=function(){var t=$('dd-big').textContent+' — '+$('dd-sub').textContent+' 📅 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
};
})();
</script>

## 디데이 계산기 사용법

- **목표일까지 D-day**: 시험·기념일·전역일 등 다가오는 날까지 며칠 남았는지 계산해요.
- **시작일부터 며칠째**: 연애·금연·다이어트 시작일로부터 오늘이 며칠째인지, 그리고 100일·1주년 등 기념일 날짜를 자동으로 알려드려요.

모든 계산은 브라우저에서 이루어지며 입력값은 저장되지 않습니다.
