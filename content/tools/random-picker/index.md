---
title: "랜덤 뽑기·사다리타기 — 제비뽑기·순서·팀 나누기"
description: "이름을 넣고 랜덤으로 한 명 뽑기, 순서 섞기, 팀 나누기, 사다리타기(랜덤 배정)를 할 수 있어요. 모임·회식·내기 무료 도구."
date: 2026-07-22
slug: "random-picker"
categories: ["도구"]
tags: ["랜덤 뽑기", "제비뽑기", "사다리타기", "팀 나누기", "순서 정하기"]
toc: false
readingTime: false
---

이름을 넣고 **랜덤 한 명 뽑기 · 순서 섞기 · 팀 나누기 · 사다리타기(랜덤 배정)**를 할 수 있어요. 회식·내기·조 편성에 쓰세요.

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">참가자 (줄바꿈 또는 쉼표로 구분)</span>
    <textarea id="rp-names" rows="4" placeholder="철수&#10;영희&#10;민수&#10;지영" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;resize:vertical;"></textarea></label>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
    <button class="rp-btn" data-m="pick" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">🎯 한 명 뽑기</button>
    <button class="rp-btn" data-m="order" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;">🔀 순서 섞기</button>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center;">
    <button class="rp-btn" data-m="team" style="flex:1 1 45%;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer;">👥 팀 나누기</button>
    <input type="tel" id="rp-teams" inputmode="numeric" value="2" style="width:56px;padding:10px;border:2px solid #ccc;border-radius:8px;text-align:center;">
    <span style="font-size:13px;color:#555;">개 팀</span>
  </div>
  <div style="margin-top:8px;">
    <div style="font-size:13px;color:#555;font-weight:700;margin-bottom:4px;">🪜 사다리타기 (결과를 참가자에 랜덤 배정)</div>
    <textarea id="rp-results" rows="3" placeholder="결과 목록 (참가자 수와 같게)&#10;청소&#10;설거지&#10;커피&#10;당첨" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;font-size:14px;box-sizing:border-box;resize:vertical;"></textarea>
    <button class="rp-btn" data-m="ladder" style="width:100%;margin-top:6px;padding:12px;border:0;border-radius:10px;background:#d97706;color:#fff;font-weight:700;cursor:pointer;">🪜 사다리 돌리기</button>
  </div>
  <div id="rp-out" style="display:none;margin-top:18px;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function parse(t){return (t.value||'').split(/[\n,]/).map(function(s){return s.trim();}).filter(Boolean);}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
var out=$('rp-out');
function show(html){out.innerHTML=html;out.style.display='block';}
[].forEach.call(document.querySelectorAll('.rp-btn'),function(b){
  b.onclick=function(){
    var names=parse($('rp-names'));
    if(names.length<1){alert('참가자를 입력해 주세요');return;}
    var m=b.getAttribute('data-m');
    if(m==='pick'){
      var w=names[Math.floor(Math.random()*names.length)];
      show('<div style="text-align:center;"><div style="font-size:14px;color:#555;">🎯 당첨</div><div style="font-size:32px;font-weight:800;color:#059669;margin-top:4px;">'+esc(w)+'</div></div>');
    } else if(m==='order'){
      var s=shuffle(names);
      show('<div style="font-weight:700;margin-bottom:6px;">🔀 순서</div>'+s.map(function(n,i){return '<div style="padding:5px 0;border-bottom:1px solid #eee;"><b>'+(i+1)+'.</b> '+esc(n)+'</div>';}).join(''));
    } else if(m==='team'){
      var k=Math.max(parseInt($('rp-teams').value)||2,2);
      var s=shuffle(names), teams=[];for(var i=0;i<k;i++)teams.push([]);
      s.forEach(function(n,i){teams[i%k].push(n);});
      show('<div style="font-weight:700;margin-bottom:6px;">👥 '+k+'개 팀</div>'+teams.map(function(t,i){return '<div style="margin-bottom:8px;"><b style="color:#7c3aed;">'+(i+1)+'팀</b> : '+t.map(esc).join(', ')+'</div>';}).join(''));
    } else if(m==='ladder'){
      var results=parse($('rp-results'));
      if(results.length!==names.length){alert('결과 개수('+results.length+')를 참가자 수('+names.length+')와 같게 맞춰 주세요');return;}
      var sr=shuffle(results);
      show('<div style="font-weight:700;margin-bottom:6px;">🪜 사다리 결과</div>'+names.map(function(n,i){return '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;"><span>'+esc(n)+'</span><b style="color:#d97706;">'+esc(sr[i])+'</b></div>';}).join(''));
    }
  };
});
})();
</script>

## 이럴 때 써요

- **한 명 뽑기**: 오늘 계산할 사람, 발표자, 당첨자 랜덤으로.
- **순서 섞기**: 발표·게임 순서 공정하게.
- **팀 나누기**: 인원을 원하는 팀 수로 랜덤 배정.
- **사다리타기**: 참가자 수만큼 결과(청소·당첨·꽝 등)를 넣으면 랜덤으로 배정해요. 손으로 사다리 그릴 필요 없어요.
- 결과는 매번 새로 섞여요. 공정한 랜덤이라 내기·회식·조 편성에 딱이에요.
