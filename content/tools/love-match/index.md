---
title: "이름궁합·MBTI 궁합 — 우리 잘 맞을까?"
description: "두 사람 이름으로 보는 이름궁합과 MBTI 유형으로 보는 궁합을 재미로 확인해요. 같은 입력엔 같은 결과가 나오는 무료 궁합 테스트."
date: 2026-07-22
slug: "love-match"
categories: ["도구"]
tags: ["이름궁합", "MBTI 궁합", "궁합 테스트", "연애 궁합", "이름 궁합 계산기"]
toc: false
readingTime: false
---

두 사람 이름으로 보는 **이름궁합**과 MBTI 유형으로 보는 **MBTI 궁합**을 재미로 확인해요. (같은 입력엔 항상 같은 결과가 나와요)

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <div style="font-weight:700;color:#be185d;">💗 이름궁합</div>
  <div style="display:flex;gap:10px;margin-top:8px;">
    <input type="text" id="lm-n1" placeholder="내 이름" style="flex:1;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
    <input type="text" id="lm-n2" placeholder="상대 이름" style="flex:1;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  </div>
  <button id="lm-name-go" style="width:100%;margin-top:10px;padding:12px;border:0;border-radius:10px;background:#be185d;color:#fff;font-weight:700;cursor:pointer;">이름궁합 보기</button>
  <div id="lm-name-out" style="display:none;margin-top:12px;padding:16px;border-radius:12px;background:#fdf2f8;text-align:center;"></div>

  <div style="font-weight:700;color:#7c3aed;margin-top:22px;">🧠 MBTI 궁합</div>
  <div style="display:flex;gap:10px;margin-top:8px;">
    <select id="lm-m1" style="flex:1;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;background:#fff;"></select>
    <select id="lm-m2" style="flex:1;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:15px;box-sizing:border-box;background:#fff;"></select>
  </div>
  <button id="lm-mbti-go" style="width:100%;margin-top:10px;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer;">MBTI 궁합 보기</button>
  <div id="lm-mbti-out" style="display:none;margin-top:12px;padding:16px;border-radius:12px;background:#f5f3ff;text-align:center;"></div>
  <div style="font-size:12px;color:#6b7280;margin-top:12px;">※ 재미로 보는 궁합이에요. 이름궁합은 이름을 숫자로 바꿔 계산하는 놀이고, MBTI 궁합은 유형 성향을 단순화한 참고용이에요. 진짜 궁합은 서로 대화로 만들어가는 거예요 😊</div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function hash(s){var h=7;for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))%1000003;}return h;}
// 이름궁합
$('lm-name-go').onclick=function(){
  var a=($('lm-n1').value||'').trim(), b=($('lm-n2').value||'').trim();
  if(!a||!b){alert('두 사람 이름을 입력해 주세요');return;}
  var key=[a,b].sort().join('♥');
  var pct=hash(key)%60+40;   // 40~99
  var msg = pct>=90?'천생연분! 서로에게 딱이에요 💞':pct>=75?'꽤 잘 어울려요. 좋은 인연이에요 💗':pct>=60?'노력하면 잘 맞아요. 대화가 열쇠예요 🙂':'다른 매력이 끌릴 수 있어요. 천천히 알아가요 🌱';
  $('lm-name-out').innerHTML='<div style="font-size:14px;color:#555;">'+esc(a)+' ♥ '+esc(b)+'</div><div style="font-size:38px;font-weight:800;color:#be185d;margin:4px 0;">'+pct+'%</div><div style="font-size:14px;color:#333;">'+msg+'</div>';
  $('lm-name-out').style.display='block';
};
// MBTI
var TYPES=['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
var s1=$('lm-m1'),s2=$('lm-m2');
TYPES.forEach(function(t){s1.add(new Option(t,t));s2.add(new Option(t,t));});
s2.selectedIndex=7;
function mbtiScore(a,b){
  var sc=55;
  if(a[0]!==b[0])sc+=10; else sc+=4;      // E/I 상호보완
  if(a[1]===b[1])sc+=16; else sc-=4;       // S/N 세계관 공유가 큼
  if(a[2]!==b[2])sc+=8; else sc+=6;        // T/F
  if(a[3]!==b[3])sc+=8; else sc+=6;        // J/P
  return Math.max(40,Math.min(99,sc));
}
$('lm-mbti-go').onclick=function(){
  var a=s1.value,b=s2.value;
  var pct=mbtiScore(a,b);
  var msg=pct>=88?'환상의 케미! 서로 배우고 채워줘요 ✨':pct>=74?'잘 맞는 편이에요. 대화가 잘 통해요 👍':pct>=60?'다르지만 그래서 끌려요. 존중이 포인트 🤝':'많이 달라요. 서로의 방식을 이해하려 노력해요 🌿';
  $('lm-mbti-out').innerHTML='<div style="font-size:15px;color:#555;font-weight:700;">'+a+' ✕ '+b+'</div><div style="font-size:38px;font-weight:800;color:#7c3aed;margin:4px 0;">'+pct+'%</div><div style="font-size:14px;color:#333;">'+msg+'</div>';
  $('lm-mbti-out').style.display='block';
};
})();
</script>

## 궁합, 재미로 보는 법

- **이름궁합**은 옛날부터 하던 놀이예요. 두 이름을 숫자로 바꿔 더해가며 % 를 내는 방식인데, 이 계산기는 같은 이름 조합엔 **항상 같은 결과**가 나오게 만들었어요.
- **MBTI 궁합**은 유형의 성향을 단순화한 참고예요. 보통 **세계관(S/N)이 같으면** 대화가 잘 통하고, **에너지 방향(E/I)이 다르면** 서로를 채워준다고들 해요.
- 진짜 궁합은 성격 유형이나 이름이 아니라, **서로를 이해하려는 노력**에서 나와요. 가볍게 웃으며 즐겨주세요 😊
- [성격유형 테스트](/tests/personality-test/)와 [연애 스타일 테스트](/tests/love-style/)도 있어요.
