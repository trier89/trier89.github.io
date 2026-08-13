---
title: "랜덤 뽑기·사다리타기 — 제비뽑기·순서·팀 나누기"
description: "이름을 넣고 두근두근 뽑기(슬롯 스핀)와 직접 만드는 사다리타기 애니메이션으로 랜덤 뽑기·순서·팀·배정을 정해요. 모임·회식·내기 무료 도구."
date: 2026-07-22
slug: "random-picker"
categories: ["도구"]
tags: ["랜덤 뽑기", "제비뽑기", "사다리타기", "팀 나누기", "순서 정하기"]
toc: false
readingTime: false
---

이름을 넣고 **두근두근 뽑기 · 순서 섞기 · 팀 나누기 · 사다리타기**로 정해요. 사다리는 직접 선을 그어 만들 수 있어요.

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
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button id="rp-ladder-make" style="flex:1;padding:12px;border:0;border-radius:10px;background:#d97706;color:#fff;font-weight:700;cursor:pointer;">🪜 사다리 만들기</button>
      <button id="rp-ladder-run" style="flex:1;padding:12px;border:0;border-radius:10px;background:#dc2626;color:#fff;font-weight:700;cursor:pointer;">▶️ 돌리기</button>
    </div>
    <div id="rp-ladder-hint" style="display:none;font-size:12.5px;color:#d97706;margin-top:6px;">👆 가로줄 자리를 <b>탭/클릭</b>해서 직접 사다리를 추가하세요. 다 그렸으면 ▶️ 돌리기!</div>
    <canvas id="rp-canvas" style="display:none;width:100%;margin-top:10px;background:#fffdf7;border-radius:10px;border:1px solid #f0e6d2;touch-action:manipulation;"></canvas>
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
var COLORS=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16'];
var out=$('rp-out'), slot=$('rp-slot');
function show(html){out.innerHTML=html;out.style.display='block';}
function spinPick(names){
  slot.style.display='block'; out.style.display='none';
  slot.style.color='#fff';
  var start=Date.now(), DUR=4200;
  function tick(){
    var el=Date.now()-start, prog=el/DUR;
    slot.textContent=names[Math.floor(Math.random()*names.length)];
    if(prog<1){
      var delay=40+Math.pow(prog,3.2)*520;
      setTimeout(tick, delay);
    } else {
      var w=names[Math.floor(Math.random()*names.length)];
      setTimeout(function(){
        slot.innerHTML='🎉 <span style="color:#fbbf24;">'+esc(w)+'</span> 🎉';
        slot.animate([{transform:'scale(1.35)'},{transform:'scale(0.95)'},{transform:'scale(1)'}],{duration:520});
      }, 260);
    }
  }
  tick();
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
var cv=$('rp-canvas'), ctx=cv.getContext('2d');
var L=null;
function X(c){return L.MX+c*L.gapX;}
function Yr(r){return L.topY+(r+1)*L.rowH;}
function drawBase(){
  ctx.clearRect(0,0,L.cssW,L.cssH);
  ctx.strokeStyle='#d6cbb0'; ctx.lineWidth=3; ctx.lineCap='round';
  for(var c=0;c<L.n;c++){ctx.beginPath();ctx.moveTo(X(c),L.topY);ctx.lineTo(X(c),L.botY);ctx.stroke();}
  for(var r=0;r<L.rows;r++){for(var c=0;c<L.n-1;c++){if(L.rung[r][c]){ctx.strokeStyle='#c2410c';ctx.beginPath();ctx.moveTo(X(c),Yr(r));ctx.lineTo(X(c+1),Yr(r));ctx.stroke();ctx.strokeStyle='#d6cbb0';}}}
  ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
  for(var c2=0;c2<L.n;c2++){ctx.fillStyle='#111';ctx.fillText(L.names[c2].slice(0,5),X(c2),L.topY-12);ctx.fillStyle='#999';ctx.fillText(L.revealed?L.results[L.endOf[c2]].slice(0,6):'?',X(c2),L.botY+22);}
}
function buildLadder(random){
  var names=parse($('rp-names')), results=parse($('rp-results'));
  if(names.length<2){alert('참가자를 2명 이상 입력해 주세요');return null;}
  if(results.length!==names.length){alert('결과 개수('+results.length+')를 참가자 수('+names.length+')와 같게 맞춰 주세요');return null;}
  var n=names.length, DPR=window.devicePixelRatio||1;
  var cssW=Math.min(cv.parentElement.clientWidth,480);
  var rows=Math.max(n*4,18);                        // 더 긴 사다리
  var cssH=54+rows*26+54;
  cv.style.height=cssH+'px'; cv.width=cssW*DPR; cv.height=cssH*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
  cv.style.display='block';
  var MX=cssW*0.5/n+10, topY=54, botY=cssH-54, gapX=(cssW-2*MX)/(n-1), rowH=(botY-topY)/(rows+1);
  var rung=[];for(var r=0;r<rows;r++){var row=[];for(var c=0;c<n-1;c++){row.push(random && Math.random()<0.28 && !(c>0&&row[c-1]));}rung.push(row);}
  L={names:names,results:results,n:n,rows:rows,cssW:cssW,cssH:cssH,MX:MX,topY:topY,botY:botY,gapX:gapX,rowH:rowH,rung:rung,revealed:false,endOf:names.map(function(_,i){return i;})};
  drawBase();
  return L;
}
$('rp-ladder-make').onclick=function(){
  $('rp-ladder-out').style.display='none';
  if(buildLadder(true)){ $('rp-ladder-hint').style.display='block'; }
};
cv.addEventListener('click',function(e){
  if(!L||L.revealed)return;
  var rect=cv.getBoundingClientRect();
  var x=(e.clientX-rect.left), y=(e.clientY-rect.top);
  // 가장 가까운 row
  var r=Math.round((y-L.topY)/L.rowH)-1; if(r<0||r>=L.rows)return;
  // 가장 가까운 칸(col과 col+1 사이)
  var c=Math.floor((x-L.MX)/L.gapX); if(c<0||c>=L.n-1)return;
  // 인접 겹침 방지
  if(!L.rung[r][c]){ if((c>0&&L.rung[r][c-1])||(c<L.n-2&&L.rung[r][c+1]))return; }
  L.rung[r][c]=!L.rung[r][c];
  drawBase();
});
$('rp-ladder-run').onclick=function(){
  if(!L){ if(!buildLadder(true))return; }
  $('rp-ladder-hint').style.display='none';
  function path(start){
    var c=start, pts=[{x:X(c),y:L.topY}];
    for(var r=0;r<L.rows;r++){var y=Yr(r);pts.push({x:X(c),y:y});
      if(c<L.n-1&&L.rung[r][c]){c++;pts.push({x:X(c),y:y});}
      else if(c>0&&L.rung[r][c-1]){c--;pts.push({x:X(c),y:y});}}
    pts.push({x:X(c),y:L.botY});return {pts:pts,end:c};
  }
  var paths=[];for(var i=0;i<L.n;i++)paths.push(path(i));
  L.endOf=paths.map(function(p){return p.end;});
  var t0=null, DUR=Math.max(2600,L.rows*160);
  function seg(pts,prog){
    var total=0,seglen=[];for(var i=1;i<pts.length;i++){var dx=pts[i].x-pts[i-1].x,dy=pts[i].y-pts[i-1].y;var l=Math.sqrt(dx*dx+dy*dy);seglen.push(l);total+=l;}
    var target=total*prog,acc=0,cur=pts[0],drawn=[pts[0]];
    for(var i=1;i<pts.length;i++){if(acc+seglen[i-1]>=target){var f=(target-acc)/seglen[i-1];cur={x:pts[i-1].x+(pts[i].x-pts[i-1].x)*f,y:pts[i-1].y+(pts[i].y-pts[i-1].y)*f};drawn.push(cur);break;}acc+=seglen[i-1];drawn.push(pts[i]);}
    return {cur:cur,drawn:drawn};
  }
  function frame(ts){
    if(!t0)t0=ts;var prog=Math.min((ts-t0)/DUR,1);
    L.revealed=false; drawBase();
    ctx.lineWidth=4;ctx.lineCap='round';
    for(var i=0;i<L.n;i++){var col=COLORS[i%COLORS.length];var s=seg(paths[i].pts,prog);ctx.strokeStyle=col;ctx.beginPath();for(var k=0;k<s.drawn.length;k++){var p=s.drawn[k];if(k===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.stroke();ctx.fillStyle=col;ctx.beginPath();ctx.arc(s.cur.x,s.cur.y,6,0,7);ctx.fill();}
    if(prog<1){requestAnimationFrame(frame);}
    else{
      L.revealed=true; drawBase();
      ctx.font='bold 13px sans-serif';ctx.textAlign='center';
      for(var i=0;i<L.n;i++){ctx.fillStyle=COLORS[i%COLORS.length];ctx.fillText(L.results[paths[i].end].slice(0,6),X(paths[i].end),L.botY+22);}
      var html='<div style="font-weight:700;margin-bottom:4px;">🪜 결과</div>'+L.names.map(function(nm,i){return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;"><span style="color:'+COLORS[i%COLORS.length]+';font-weight:700;">'+esc(nm)+'</span><b>'+esc(L.results[paths[i].end])+'</b></div>';}).join('');
      $('rp-ladder-out').innerHTML=html;$('rp-ladder-out').style.display='block';
    }
  }
  requestAnimationFrame(frame);
};
})();
</script>

## 이럴 때 써요

- **두근두근 뽑기**: 이름이 슬롯머신처럼 빠르게 돌다가 **점점 느려지며** 멈춰요. 당첨자 발표에 긴장감이 확 살아요.
- **순서 섞기 · 팀 나누기**: 발표 순서, 조 편성을 공정하게 랜덤으로.
- **사다리타기**: 「사다리 만들기」로 기본 사다리를 만든 뒤, **가로줄 자리를 직접 탭/클릭해 사다리를 추가**할 수 있어요. 다 그렸으면 「▶️ 돌리기」로 색깔 선이 내려가며 결과를 찾아가요. 사다리가 길어서 더 두근두근해요.
- 결과는 매번 새로 섞여요. 공정한 랜덤이라 내기·회식·조 편성에 딱이에요.

## 네 가지 기능, 상황별로 골라 쓰기

같은 참가자 명단으로 네 가지 방식을 모두 돌려볼 수 있어요. 상황에 맞는 걸 고르면 돼요.

- **두근두근 뽑기**: 한 명만 정할 때 좋아요. 오늘의 당번, 커피 쏘는 사람, 경품 당첨자처럼 "딱 한 명"을 극적으로 뽑고 싶을 때 슬롯이 돌다 멈추는 연출이 분위기를 살려요.
- **순서 섞기**: 발표 순서, 게임 차례, 노래방 순번처럼 전원에게 겹치지 않는 번호를 매길 때 써요.
- **팀 나누기**: 인원을 원하는 팀 수로 고르게 갈라줘요. 풋살, 보드게임, 조별 과제 편성에 편해요.
- **사다리타기**: 참가자와 결과를 짝지을 때 최고예요. 청소·설거지·커피처럼 역할을 배정하거나, 벌칙·상품을 나눌 때 선을 직접 그어가며 즐길 수 있어요.

## 더 재미있게 쓰는 팁

- **참가자는 줄바꿈이나 쉼표로 구분**하면 돼요. 복사해온 명단을 그대로 붙여넣어도 알아서 나눠줘요.
- **사다리는 직접 손대야 진짜예요**: 「사다리 만들기」로 기본 형태를 만든 뒤 가로줄을 탭해서 추가하면, 참가자들이 보는 앞에서 "조작 안 했다"는 신뢰가 생겨요.
- **결과 개수는 참가자 수와 똑같이** 맞춰야 사다리가 돌아가요. 꽝이나 벌칙을 넣어 인원수를 채우면 돼요.
- 오늘 뭐 먹을지 못 정하겠으면 메뉴 이름을 넣고 두근두근 뽑기를 돌려보세요. 운에 맡기고 싶은 다른 결정은 [로또 번호 생성기](/tools/lotto/)로도 기분 전환해보세요. 심심풀이 [테스트 모음](/tests/)도 함께 즐겨보세요.

## 자주 묻는 질문

**Q. 정말 공정한 랜덤인가요?**
네, 브라우저의 난수를 이용해 매번 새로 섞어요. 누가 유리하거나 불리하게 조작되지 않고, 돌릴 때마다 결과가 달라져요.

**Q. 몇 명까지 넣을 수 있나요?**
소규모 모임부터 학급 단위까지 넉넉히 넣을 수 있어요. 다만 사다리타기는 인원이 너무 많으면 화면이 복잡해지니, 두근두근 뽑기나 팀 나누기를 활용하는 게 편해요.

**Q. 결과를 저장할 수 있나요?**
따로 저장 기능은 없지만, 결과 화면을 캡처하면 기록으로 남길 수 있어요. 다시 돌리면 새 결과가 나와요.

**Q. 사다리 결과가 미리 정해져 있나요?**
아니에요. 「돌리기」를 누르는 순간의 사다리 모양에 따라 결과가 결정돼요. 가로줄을 하나 더 그으면 결과도 바뀌어요.
