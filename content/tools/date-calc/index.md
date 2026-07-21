---
title: "날짜 계산기 — 며칠 후 날짜·날짜 사이 일수 계산"
description: "오늘부터 며칠 후·며칠 전이 무슨 날짜인지, 두 날짜 사이가 며칠인지 계산해요. 주수·평일 계산까지."
date: 2026-07-21
slug: "date-calc"
categories: ["도구"]
tags: ["날짜 계산기", "날짜 계산", "며칠 후 날짜", "날짜 사이 일수", "디데이"]
toc: false
readingTime: false
---

**며칠 후/며칠 전이 무슨 날짜인지**, 또는 **두 날짜 사이가 며칠인지** 계산해요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <div style="display:flex;gap:6px;margin-bottom:14px;">
    <button class="dc-tab" data-m="add" style="flex:1;">며칠 후/전 날짜</button>
    <button class="dc-tab" data-m="between" style="flex:1;">두 날짜 사이</button>
  </div>
  <div id="dc-add">
    <label style="display:block;font-weight:700;margin-bottom:6px;">기준 날짜</label>
    <input type="tel" id="dc-base" inputmode="numeric" placeholder="예: 20260721" maxlength="10" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
    <label style="display:block;font-weight:700;margin:12px 0 6px;">며칠 (예: 100, 뒤로 가려면 -100)</label>
    <input type="tel" id="dc-days" inputmode="numeric" placeholder="100" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  </div>
  <div id="dc-between" style="display:none;">
    <label style="display:block;font-weight:700;margin-bottom:6px;">시작 날짜</label>
    <input type="tel" id="dc-d1" inputmode="numeric" placeholder="예: 20260101" maxlength="10" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
    <label style="display:block;font-weight:700;margin:12px 0 6px;">끝 날짜</label>
    <input type="tel" id="dc-d2" inputmode="numeric" placeholder="예: 20261231" maxlength="10" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  </div>
  <button id="dc-go" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="dc-out" style="display:none;margin-top:20px;text-align:center;padding:20px;border-radius:12px;background:#f5f3ff;">
    <div id="dc-big" style="font-size:30px;font-weight:800;color:#6d28d9;line-height:1.3;"></div>
    <div id="dc-sub" style="font-size:14px;color:#555;margin-top:6px;"></div>
  </div>
</div>
<style>.dc-tab{padding:11px;border:2px solid #d1d5db;border-radius:10px;background:#fff;font-weight:700;font-size:13.5px;cursor:pointer;}.dc-tab.on{border-color:#7c3aed;background:#f5f3ff;color:#6d28d9;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var DOW=['일','월','화','수','목','금','토'];
function parse(v){v=(v||'').replace(/[^0-9]/g,'');if(v.length!==8)return null;var y=+v.slice(0,4),m=+v.slice(4,6),d=+v.slice(6,8);if(m<1||m>12||d<1||d>31)return null;return new Date(y,m-1,d);}
function fmt(d){return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일 ('+DOW[d.getDay()]+')';}
['dc-base','dc-d1','dc-d2'].forEach(function(id){$(id).addEventListener('input',function(){var v=this.value.replace(/[^0-9]/g,'').slice(0,8);if(v.length>6)v=v.slice(0,4)+'.'+v.slice(4,6)+'.'+v.slice(6);else if(v.length>4)v=v.slice(0,4)+'.'+v.slice(4);this.value=v;});});
var mode='add';
[].forEach.call(document.querySelectorAll('.dc-tab'),function(b){b.onclick=function(){mode=b.dataset.m;document.querySelectorAll('.dc-tab').forEach(function(x){x.classList.toggle('on',x===b);});$('dc-add').style.display=mode==='add'?'block':'none';$('dc-between').style.display=mode==='between'?'block':'none';};});
document.querySelector('.dc-tab').classList.add('on');
$('dc-go').onclick=function(){
  if(mode==='add'){
    var base=parse($('dc-base').value),n=parseInt(($('dc-days').value||'').replace(/[^0-9-]/g,''));
    if(!base||isNaN(n)){alert('기준 날짜(8자리)와 일수를 입력해 주세요');return;}
    var r=new Date(base);r.setDate(r.getDate()+n);
    $('dc-big').textContent=fmt(r);
    $('dc-sub').textContent=fmt(base)+' 에서 '+(n>=0?n+'일 후':(-n)+'일 전');
  }else{
    var d1=parse($('dc-d1').value),d2=parse($('dc-d2').value);
    if(!d1||!d2){alert('두 날짜를 8자리로 입력해 주세요');return;}
    var days=Math.abs(Math.round((d2-d1)/86400000));
    $('dc-big').textContent=days.toLocaleString()+'일';
    $('dc-sub').textContent=fmt(d1)+' ~ '+fmt(d2)+'<br>약 '+Math.floor(days/7)+'주 '+(days%7)+'일 · '+(days/365).toFixed(1)+'년';
    $('dc-sub').innerHTML=$('dc-sub').textContent.replace('<br>','<br>');
  }
  $('dc-out').style.display='block';
};
})();
</script>

## 날짜 계산기 사용법

- **며칠 후/전 날짜**: 기준 날짜에서 며칠 후(또는 전, 음수 입력)가 무슨 요일·날짜인지 알려드려요.
- **두 날짜 사이**: 두 날짜 사이가 며칠인지, 몇 주 며칠인지, 몇 년인지 계산해요.

계산 결과는 브라우저에서 처리되며 입력값은 저장되지 않습니다.
