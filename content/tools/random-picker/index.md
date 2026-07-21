---
title: "랜덤 뽑기·사다리타기 — 제비뽑기·순서·팀 나누기"
description: "이름을 넣고 두근두근 뽑기(슬롯 스핀)와 진짜 사다리타기 애니메이션으로 랜덤 뽑기·순서·팀·배정을 정해요. 모임·회식·내기 무료 도구."
date: 2026-07-22
slug: "random-picker"
categories: ["도구"]
tags: ["랜덤 뽑기", "제비뽑기", "사다리타기", "팀 나누기", "순서 정하기"]
toc: false
readingTime: false
---

이름을 넣고 **두근두근 뽑기 · 순서 섞기 · 팀 나누기 · 사다리타기 애니메이션**으로 정해요. 회식·내기·조 편성에 딱이에요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">참가자 (줄바꿈 또는 쉼표로 구분)</span>
    <textarea id="rp-names" rows="4" placeholder="철수&#10;영희&#10;민수&#10;지영" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;resize:vertical;">철수
영희
민수
지영</textarea></label>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
    <button class="rp-btn" data-m="pick" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">🎯 두근두근 뽑기</button>
    <button class="rp-btn" data-m="order" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;">🔀 순서 섞기</button>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center;">
    <button class="rp-btn" data-m="team" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer;">👥 팀 나누기</button>
    <input type="tel" id="rp-teams" inputmode="numeric" value="2" style="width:56px;padding:10px;border:2px solid #ccc;border-radius:8px;text-align:center;">
    <span style="font-size:13px;color:#555;">개 팀</span>
  </div>
  <div id="rp-slot" style="display:none;margin-top:14px;text-align:center;padding:26px 10px;border-radius:14px;background:#0f172a;color:#fff;font-size:32px;font-weight:800;letter-spacing:1px;min-height:44px;"></div>
  <div style="margin-top:14px;padding-top:12px;border-top:1px dashed #ddd;">
    <div style="font-size:13px;color:#555;font-weight:700;margin-bottom:4px;">🪜 사다리타기 (결과를 참가자에 랜덤 배정)</div>
    <textarea id="rp-results" rows="3" placeholder="결과 목록 (참가자 수와 같게)&#10;청소&#10;설거지&#10;커피&#10;당첨" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;font-size:14px;box-sizing:border-box;resize:vertical;">청소
설거지
커피
꽝</textarea>
    <button id="rp-ladder-make" style="width:100%;margin-top:6px;padding:12px;border:0;border-radius:10px;background:#d97706;color:#fff;font-weight:700;cursor:pointer;">🪜 사다리 만들고 돌리기</button>
    <canvas id="rp-canvas" style="display:none;width:100%;margin-top:12px;background:#fffdf7;border-radius:10px;border:1px solid #f0e6d2;"></canvas>
    <div id="rp-ladder-out" style="display:none;margin-top:8px;"></div>
  </div>
  <div id="rp-out" style="display:none;margin-top:14px;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function parse(t){return (t.value||'').split(/[\n,]/).map(function(s){return s.trim();}).filter(Boolean);}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
var COLORS=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','# ec4899','#14b8a6','#f97316','#6366f1','#84cc16'].map(function(c){return c.replace(/\s/g,'');});
var out=$('rp-out'), slot=$('rp-slot');
function show(html){out.innerHTML=html;out.style.display='block';}
// ── 두근두근 뽑기(슬롯 스핀) ──
function spinPick(names){
  slot.style.display='block'; out.style.display='none';
  var t=0, dur=1800, start=Date.now();
  var timer=setInterval(function(){
    var el=Date.now()-start;
    slot.textContent=names[Math.floor(Math.random()*names.length)];
    slot.style.color='#fff';
    if(el>=dur){
      clearInterval(timer);
      var w=names[Math.floor(Math.random()*names.length)];
      slot.innerHTML='🎉 <span style="color:#fbbf24;">'+esc(w)+'</span> 🎉';
      slot.animate([{transform:'scale(1.3)'},{transform:'scale(1)'}],{duration:400});
    }
  },70);
  // 점점 느려지게
  var slow=setInterval(function(){if(Date.now()-start>dur){clearInterval(slow);}},10);
}
[].forEach.call(document.querySelectorAll('.rp-btn'),function(b){
  b.onclick=function(){
    var names=parse($('rp-names'));
    if(names.length<1){alert('참가자를 입력해 주세요');return;}
    var m=b.getAttribute('data-m');
    if(m==='pick'){ spinPick(names); return; }
    slot.style.display='none';
    if(m==='order'){
      var s=shuffle(names);
      show('<div style="font-weight:700;margin-bottom:6px;">🔀 순서</div>'+s.map(function(n,i){return '<div style="padding:5px 0;border-bottom:1px solid #eee;"><b>'+(i+1)+'.</b> '+esc(n)+'</div>';}).join(''));
    } else if(m==='team'){
      var k=Math.max(parseInt($('rp-teams').value)||2,2);
      var s=shuffle(names), teams=[];for(var i=0;i<k;i++)teams.push([]);
      s.forEach(function(n,i){teams[i%k].push(n);});
      show('<div style="font-weight:700;margin-bottom:6px;">👥 '+k+'개 팀</div>'+teams.map(function(t,i){return '<div style="margin-bottom:8px;"><b style="color:#7c3aed;">'+(i+1)+'팀</b> : '+t.map(esc).join(', ')+'</div>';}).join(''));
    }
  };
});
// ── 사다리타기(캔버스 애니메이션) ──
var cv=$('rp-canvas'), ctx=cv.getContext('2d');
$('rp-ladder-make').onclick=function(){
  var names=parse($('rp-names')), results=parse($('rp-results'));
  if(names.length<2){alert('참가자를 2명 이상 입력해 주세요');return;}
  if(results.length!==names.length){alert('결과 개수('+results.length+')를 참가자 수('+names.length+')와 같게 맞춰 주세요');return;}
  $('rp-ladder-out').style.display='none';
  var n=names.length;
  var DPR=window.devicePixelRatio||1;
  var cssW=Math.min(cv.parentElement.clientWidth,480), cssH=60+Math.max(n*38,180)+60;
  cv.style.height=cssH+'px';
  cv.width=cssW*DPR; cv.height=cssH*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
  cv.style.display='block';
  var MX=cssW*0.5/n+10, topY=54, botY=cssH-54;
  var gapX=(cssW-2*MX)/(n-1);
  var X=function(c){return MX+c*gapX;};
  var rows=Math.max(n*2,7);
  var rung=[];
  for(var r=0;r<rows;r++){var row=[];for(var c=0;c<n-1;c++){row.push(Math.random()<0.4 && !(c>0&&row[c-1]));}rung.push(row);}
  var rowH=(botY-topY)/(rows+1);
  // 경로 계산
  function path(start){
    var c=start, pts=[{x:X(c),y:topY}];
    for(var r=0;r<rows;r++){
      var y=topY+(r+1)*rowH;
      pts.push({x:X(c),y:y});
      if(c<n-1&&rung[r][c]){c++;pts.push({x:X(c),y:y});}
      else if(c>0&&rung[r][c-1]){c--;pts.push({x:X(c),y:y});}
    }
    pts.push({x:X(c),y:botY});
    return {pts:pts,end:c};
  }
  var paths=[]; for(var i=0;i<n;i++)paths.push(path(i));
  // 정적 사다리 그리기
  function drawBase(){
    ctx.clearRect(0,0,cssW,cssH);
    ctx.strokeStyle='#d6cbb0'; ctx.lineWidth=3; ctx.lineCap='round';
    for(var c=0;c<n;c++){ctx.beginPath();ctx.moveTo(X(c),topY);ctx.lineTo(X(c),botY);ctx.stroke();}
    for(var r=0;r<rows;r++){var y=topY+(r+1)*rowH;for(var c=0;c<n-1;c++){if(rung[r][c]){ctx.beginPath();ctx.moveTo(X(c),y);ctx.lineTo(X(c+1),y);ctx.stroke();}}}
    ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    for(var c2=0;c2<n;c2++){
      ctx.fillStyle='#111'; ctx.fillText(names[c2].slice(0,5),X(c2),topY-12);
      ctx.fillStyle='#999'; ctx.fillText('?',X(c2),botY+22);
    }
  }
  drawBase();
  // 애니메이션(전체 동시)
  var t0=null, DUR=2200;
  function seg(pts,prog){ // prog 0~1 → 위치 + 그린 선
    var total=0, seglen=[];
    for(var i=1;i<pts.length;i++){var dx=pts[i].x-pts[i-1].x,dy=pts[i].y-pts[i-1].y;var l=Math.sqrt(dx*dx+dy*dy);seglen.push(l);total+=l;}
    var target=total*prog, acc=0, cur=pts[0];
    var drawn=[pts[0]];
    for(var i=1;i<pts.length;i++){
      if(acc+seglen[i-1]>=target){var f=(target-acc)/seglen[i-1];cur={x:pts[i-1].x+(pts[i].x-pts[i-1].x)*f,y:pts[i-1].y+(pts[i].y-pts[i-1].y)*f};drawn.push(cur);break;}
      acc+=seglen[i-1]; drawn.push(pts[i]);
    }
    return {cur:cur,drawn:drawn};
  }
  function frame(ts){
    if(!t0)t0=ts; var prog=Math.min((ts-t0)/DUR,1);
    drawBase();
    ctx.lineWidth=4; ctx.lineCap='round';
    for(var i=0;i<n;i++){
      var col=COLORS[i%COLORS.length];
      var s=seg(paths[i].pts,prog);
      ctx.strokeStyle=col; ctx.beginPath();
      for(var k=0;k<s.drawn.length;k++){var p=s.drawn[k];if(k===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}
      ctx.stroke();
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(s.cur.x,s.cur.y,6,0,7); ctx.fill();
    }
    if(prog<1){requestAnimationFrame(frame);}
    else{
      ctx.font='bold 13px sans-serif';ctx.textAlign='center';
      for(var i=0;i<n;i++){ctx.fillStyle=COLORS[i%COLORS.length];ctx.fillText(results[paths[i].end].slice(0,6),X(paths[i].end),botY+22);}
      var html='<div style="font-weight:700;margin-bottom:4px;">🪜 결과</div>'+names.map(function(nm,i){return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;"><span style="color:'+COLORS[i%COLORS.length]+';font-weight:700;">'+esc(nm)+'</span><b>'+esc(results[paths[i].end])+'</b></div>';}).join('');
      $('rp-ladder-out').innerHTML=html; $('rp-ladder-out').style.display='block';
    }
  }
  requestAnimationFrame(frame);
};
})();
</script>

## 이럴 때 써요

- **두근두근 뽑기**: 이름이 슬롯머신처럼 빠르게 돌다가 멈춰요. 당첨자 발표에 긴장감이 확 살아요.
- **순서 섞기 · 팀 나누기**: 발표 순서, 조 편성을 공정하게 랜덤으로.
- **사다리타기**: 진짜 사다리를 그려서 각자 색깔 선이 내려가며 결과를 찾아가요. 손으로 그릴 필요 없이 애니메이션으로 두근두근.
- 결과는 매번 새로 섞여요. 공정한 랜덤이라 내기·회식·조 편성에 딱이에요.
