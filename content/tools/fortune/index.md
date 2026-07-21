---
title: "오늘의 운세 — 띠별 무료 운세 (재물·애정·건강·행운)"
description: "생년월일이나 띠를 고르면 오늘의 총운·재물운·애정운·건강운과 행운의 숫자·색깔을 알려드립니다. 매일 바뀌는 무료 운세."
date: 2026-07-21
slug: "fortune"
categories: ["도구"]
tags: ["오늘의 운세", "띠별 운세", "무료 운세", "오늘 운세", "행운의 숫자"]
toc: false
readingTime: false
---

띠를 고르면 **오늘의 총운·재물운·애정운·건강운**과 **행운의 숫자·색깔·방향**을 알려드려요. 같은 날엔 몇 번을 봐도 같은 결과가 나오고, 내일이면 새로운 운세로 바뀝니다. (재미로 봐주세요 😊)

<div id="fortune" style="max-width:560px;margin:0 auto;">
  <div style="text-align:center;">
    <div style="font-weight:700;margin-bottom:10px;" id="ft-date"></div>
    <div style="font-size:14px;color:#888;margin-bottom:8px;">당신의 띠를 골라주세요</div>
    <div id="ft-zodiac" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;"></div>
  </div>
  <div id="ft-result" style="display:none;margin-top:22px;"></div>
</div>

<style>
.ft-z{padding:12px 4px;border:2px solid #d1d5db;border-radius:10px;background:#fff;cursor:pointer;font-size:14px;font-weight:700;transition:all .12s;}
.ft-z:hover{border-color:#7c3aed;background:#f5f3ff;}
.ft-z .em{font-size:24px;display:block;}
.ft-card{padding:16px 18px;border-radius:12px;margin-bottom:12px;}
.ft-bar{height:8px;background:#e5e7eb;border-radius:4px;margin-top:6px;overflow:hidden;}
.ft-bar > div{height:8px;border-radius:4px;}
</style>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var Z=[['쥐','🐭'],['소','🐮'],['호랑이','🐯'],['토끼','🐰'],['용','🐲'],['뱀','🐍'],['말','🐴'],['양','🐑'],['원숭이','🐵'],['닭','🐔'],['개','🐶'],['돼지','🐷']];
var now=new Date();
var dstr=(now.getMonth()+1)+'월 '+now.getDate()+'일';
$('ft-date').textContent='🔮 '+now.getFullYear()+'년 '+dstr+' 오늘의 운세';
var daySeed=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate();

// 결정론적 유사난수 (같은 날+같은 띠 = 같은 결과)
function rng(seed){var x=Math.sin(seed)*10000;return x-Math.floor(x);}

var TOTAL=[
 '막힌 일이 술술 풀리는 날이에요. 미뤄둔 일에 도전해보세요.',
 '조용하지만 알찬 하루. 작은 성취가 쌓입니다.',
 '뜻밖의 좋은 소식이 찾아올 수 있어요. 연락을 기다려보세요.',
 '서두르면 실수가 생겨요. 오늘은 천천히 가는 게 이득입니다.',
 '주변의 도움으로 일이 잘 풀려요. 감사 인사를 잊지 마세요.',
 '새로운 인연이나 기회가 문을 두드립니다. 마음을 열어보세요.',
 '컨디션이 좋아 무엇을 해도 흐름을 탑니다. 자신감을 가지세요.',
 '작은 오해가 생길 수 있으니 말은 한 번 더 생각하고 하세요.'
];
var MONEY=['예상치 못한 지출 주의! 오늘은 지갑을 닫으세요.','작은 재물운이 들어와요. 미뤄둔 정산을 챙기세요.','투자·계약은 하루 미루는 게 좋아요.','생각지 못한 곳에서 이득이 생깁니다.'];
var LOVE=['솔직한 표현이 관계를 가깝게 만들어요.','혼자만의 시간이 오히려 매력을 키우는 날.','오래 연락 없던 사람에게서 소식이 올 수도.','작은 배려가 큰 감동으로 돌아옵니다.'];
var HEALTH=['가벼운 산책이 컨디션을 끌어올려요.','충분한 수분과 휴식이 필요한 날.','눈과 어깨의 피로에 신경 쓰세요.','평소보다 활력이 넘치는 하루입니다.'];
var COLORS=['빨강','주황','노랑','초록','파랑','보라','흰색','검정','분홍','하늘'];
var DIRS=['동쪽','서쪽','남쪽','북쪽','동남쪽','남서쪽'];

$('ft-zodiac').innerHTML=Z.map(function(z,i){return '<button class="ft-z" data-i="'+i+'"><span class="em">'+z[1]+'</span>'+z[0]+'띠</button>';}).join('');
[].forEach.call(document.querySelectorAll('.ft-z'),function(b){
  b.onclick=function(){show(parseInt(b.dataset.i));};
});
function bar(label,score,color){
  return '<div style="margin:8px 0;"><div style="display:flex;justify-content:space-between;font-size:13.5px;"><span>'+label+'</span><span style="color:'+color+';font-weight:700;">'+'★'.repeat(score)+'☆'.repeat(5-score)+'</span></div><div class="ft-bar"><div style="width:'+(score*20)+'%;background:'+color+';"></div></div></div>';
}
function pick(arr,seed){return arr[Math.floor(rng(seed)*arr.length)];}
function score(seed){return 1+Math.floor(rng(seed)*5);}
function show(zi){
  var base=daySeed+zi*97;
  var z=Z[zi];
  var sTot=score(base+1),sMon=score(base+2),sLov=score(base+3),sHea=score(base+4);
  var luckyNum=1+Math.floor(rng(base+5)*45);
  var color=pick(COLORS,base+6), dir=pick(DIRS,base+7);
  var html='<div class="ft-card" style="background:#f5f3ff;text-align:center;">'
    +'<div style="font-size:30px;">'+z[1]+'</div>'
    +'<div style="font-weight:800;font-size:18px;color:#5b21b6;">'+z[0]+'띠 오늘의 운세</div>'
    +'<div style="margin-top:8px;font-size:15px;line-height:1.7;">'+pick(TOTAL,base+8)+'</div>'
    +'</div>';
  html+='<div class="ft-card" style="background:#fafafa;border:1px solid #eee;">'
    +bar('총운','+'.length&&sTot,'#7c3aed')
    +bar('재물운',sMon,'#059669')
    +bar('애정운',sLov,'#e11d48')
    +bar('건강운',sHea,'#0891b2')
    +'<div style="margin-top:10px;font-size:14px;line-height:1.8;color:#444;">'
      +'💰 '+pick(MONEY,base+9)+'<br>'
      +'💕 '+pick(LOVE,base+10)+'<br>'
      +'🌿 '+pick(HEALTH,base+11)
    +'</div></div>';
  html+='<div class="ft-card" style="background:#ecfdf5;display:flex;justify-content:space-around;text-align:center;font-size:14px;">'
    +'<div><div style="color:#888;font-size:12px;">행운의 숫자</div><b style="font-size:20px;color:#047857;">'+luckyNum+'</b></div>'
    +'<div><div style="color:#888;font-size:12px;">행운의 색</div><b style="font-size:18px;color:#047857;">'+color+'</b></div>'
    +'<div><div style="color:#888;font-size:12px;">행운의 방향</div><b style="font-size:18px;color:#047857;">'+dir+'</b></div>'
    +'</div>';
  html+='<div style="display:flex;gap:10px;margin-top:8px;">'
    +'<button id="ft-again" style="flex:1;padding:12px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#5b21b6;font-weight:700;cursor:pointer;">다른 띠 보기</button>'
    +'<button id="ft-share" style="flex:1;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer;">운세 공유</button>'
    +'</div>';
  html+='<div style="margin-top:14px;padding:12px;border-radius:10px;background:#eff6ff;font-size:13.5px;">더 많은 도구: <a href="/tools/">도구방</a> · 게임 한판 <a href="/games/">게임방</a></div>';
  $('ft-result').innerHTML=html;
  $('ft-result').style.display='block';
  $('ft-again').onclick=function(){$('ft-result').style.display='none';window.scrollTo({top:$('fortune').offsetTop-20,behavior:'smooth'});};
  $('ft-share').onclick=function(){
    var url=location.origin+location.pathname+'?z='+zi;
    var t=z[0]+'띠 '+dstr+' 운세: '+pick(TOTAL,base+8)+' 행운의 숫자 '+luckyNum+' 🔮 너도 봐 👉 '+url;
    if(navigator.share)navigator.share({text:t});else navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});
  };
  window.scrollTo({top:$('ft-result').offsetTop-40,behavior:'smooth'});
}
// 공유 링크(?z=띠index)로 들어오면 그 띠 운세를 바로 표시
(function(){var m=location.search.match(/[?&]z=(\d{1,2})/);if(m){var zi=parseInt(m[1]);if(zi>=0&&zi<12)show(zi);}})();
})();
</script>

## 오늘의 운세는 어떻게 만드나요?

이 운세는 **오늘 날짜와 띠를 조합한 규칙**으로 생성됩니다. 그래서 같은 날에는 몇 번을 다시 봐도 결과가 같고, 날짜가 바뀌면 새로운 운세가 나와요. 재미와 하루의 기분 전환을 위한 콘텐츠이며, 실제 사주·명리학과는 다릅니다.

- **띠** 12지신 기준 (양력 연도로 간편 계산)
- 총운·재물운·애정운·건강운을 별점으로, 행운의 숫자(1~45)·색·방향까지
- 입력한 정보는 저장되지 않고, 모든 계산은 브라우저에서 이루어집니다.
