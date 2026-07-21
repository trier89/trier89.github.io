---
title: "오늘의 운세 — 별자리·띠별·타로"
description: "별자리와 띠별 오늘의 운세(총운·애정·금전·건강)와 타로 한 장 뽑기를 무료로 봐요. 매일 바뀌는 오늘의 운세."
date: 2026-07-22
slug: "horoscope"
categories: ["도구"]
tags: ["오늘의 운세", "별자리 운세", "띠별 운세", "타로", "무료 운세"]
toc: false
readingTime: false
---

**별자리·띠별 오늘의 운세**와 **타로 한 장 뽑기**를 봐요. 운세는 날짜 기준이라 하루 동안 같은 결과가 나와요.

<div class="pf-tool" style="max-width:500px;margin:0 auto;">
  <div style="display:flex;gap:6px;margin-bottom:12px;">
    <button class="hs-tab" data-t="star" style="flex:1;padding:10px;border:0;border-radius:8px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">⭐ 별자리</button>
    <button class="hs-tab" data-t="zodiac" style="flex:1;padding:10px;border:0;border-radius:8px;background:#e5e7eb;color:#333;font-weight:700;cursor:pointer;">🐭 띠별</button>
    <button class="hs-tab" data-t="tarot" style="flex:1;padding:10px;border:0;border-radius:8px;background:#e5e7eb;color:#333;font-weight:700;cursor:pointer;">🃏 타로</button>
  </div>
  <div id="hs-star" class="hs-panel">
    <select id="hs-star-sel" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;"></select>
    <button class="hs-go" data-t="star" style="width:100%;margin-top:10px;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">오늘의 운세 보기</button>
  </div>
  <div id="hs-zodiac" class="hs-panel" style="display:none;">
    <select id="hs-zodiac-sel" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;"></select>
    <button class="hs-go" data-t="zodiac" style="width:100%;margin-top:10px;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">오늘의 운세 보기</button>
  </div>
  <div id="hs-tarot" class="hs-panel" style="display:none;">
    <div style="text-align:center;color:#555;font-size:14px;margin-bottom:10px;">마음속으로 질문을 떠올리고 카드를 뽑으세요</div>
    <button class="hs-go" data-t="tarot" style="width:100%;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer;">🃏 카드 한 장 뽑기</button>
  </div>
  <div id="hs-out" style="display:none;margin-top:16px;padding:18px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var STARS=['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'];
var ZOD=['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
var TAROT=[['The Fool 바보','새로운 시작, 자유로운 도전. 두려움 없이 첫발을 내디뎌요.'],['The Magician 마법사','능력과 기회. 원하는 걸 실현할 힘이 있어요.'],['The High Priestess 여사제','직관과 비밀. 마음의 소리에 귀 기울여요.'],['The Empress 여황제','풍요와 사랑. 돌봄과 결실의 시기예요.'],['The Emperor 황제','안정과 리더십. 계획대로 밀고 나가요.'],['The Lovers 연인','사랑과 선택. 마음이 가는 쪽을 믿어요.'],['The Chariot 전차','의지와 승리. 흔들리지 않으면 이겨요.'],['Strength 힘','용기와 인내. 부드러움이 강함을 이겨요.'],['The Hermit 은둔자','성찰의 시간. 잠시 멈추고 나를 돌아봐요.'],['Wheel of Fortune 운명의 수레바퀴','전환점. 흐름이 당신 편으로 돌아와요.'],['Justice 정의','균형과 공정. 뿌린 대로 거둬요.'],['The Star 별','희망과 치유. 어둠 뒤 빛이 와요.'],['The Sun 태양','기쁨과 성공. 밝은 에너지가 가득해요.'],['The Moon 달','불안과 착각. 보이는 게 전부가 아니에요.'],['The World 세계','완성과 성취. 한 챕터가 아름답게 마무리돼요.']];
var GEN=['새로운 기회가 다가와요. 열린 마음이 행운을 부릅니다.','생각을 정리하기 좋은 날. 서두르지 말고 차근차근.','주변의 도움을 받게 돼요. 먼저 손 내밀어 보세요.','작은 성취가 있는 날. 스스로를 칭찬해 주세요.','예상 밖의 소식이 들려와요. 유연하게 대응해요.','에너지가 넘치는 하루. 미뤄둔 일을 시작하기 좋아요.','신중함이 필요한 날. 중요한 결정은 한 번 더 생각을.','인연이 닿는 날. 사람과의 만남에서 힌트를 얻어요.'];
var LOVE=['설레는 신호가 있어요. 솔직한 표현이 통해요.','오해가 풀릴 기회. 먼저 다가가면 좋아요.','안정감 있는 하루. 소소한 대화가 사이를 데워요.','밀당보다 진심. 있는 그대로 보여주세요.','새로운 만남의 예감. 평소와 다른 길로 가보세요.','혼자의 시간도 소중해요. 나를 채우면 매력이 올라가요.'];
var MONEY=['지출을 점검하기 좋은 날. 새는 돈을 잡아요.','뜻밖의 수입 가능성. 기회를 놓치지 마세요.','투자는 신중히. 확실한 것만 보세요.','아끼면 목돈이 보여요. 작은 절약이 쌓여요.','금전 정보가 들어와요. 메모해 두면 도움 돼요.','계획 소비가 유리한 날. 충동구매 주의.'];
var HEALTH=['가벼운 산책이 컨디션을 살려요.','수분 섭취와 휴식이 필요해요.','스트레칭으로 몸을 풀어주세요.','충분한 수면이 최고의 보약이에요.','과식 주의. 소화에 신경 써요.','마음의 여유가 몸을 편하게 해요.'];
var COLORS=['빨강','주황','노랑','초록','파랑','보라','흰색','검정','분홍','하늘'];
STARS.forEach(function(s){$('hs-star-sel').add(new Option(s,s));});
ZOD.forEach(function(s){$('hs-zodiac-sel').add(new Option(s+'띠',s));});
function hash(s){var h=5;for(var i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))%2000003;return h;}
function todaySeed(){var d=new Date();return ''+d.getFullYear()+(d.getMonth()+1)+d.getDate();}
function pick(arr,seed){return arr[hash(seed)%arr.length];}
var out=$('hs-out');
// 탭
[].forEach.call(document.querySelectorAll('.hs-tab'),function(b){b.onclick=function(){
  [].forEach.call(document.querySelectorAll('.hs-tab'),function(x){x.style.background='#e5e7eb';x.style.color='#333';});
  b.style.background=b.getAttribute('data-t')==='tarot'?'#7c3aed':'#059669';b.style.color='#fff';
  ['star','zodiac','tarot'].forEach(function(t){$('hs-'+t).style.display=t===b.getAttribute('data-t')?'block':'none';});
  out.style.display='none';
};});
[].forEach.call(document.querySelectorAll('.hs-go'),function(b){b.onclick=function(){
  var t=b.getAttribute('data-t'), seed=todaySeed();
  if(t==='tarot'){
    var c=TAROT[Math.floor(Math.random()*TAROT.length)];
    out.innerHTML='<div style="text-align:center;"><div style="font-size:40px;">🃏</div><div style="font-size:19px;font-weight:800;color:#7c3aed;margin:6px 0;">'+c[0]+'</div><div style="font-size:15px;color:#333;line-height:1.6;">'+c[1]+'</div></div>';
  } else {
    var sel=$('hs-'+t+'-sel').value, s=seed+sel;
    var score=hash(s+'g')%41+59; // 59~99
    out.innerHTML='<div style="font-weight:800;font-size:17px;margin-bottom:8px;">'+ (t==='zodiac'?sel+'띠':sel) +' · 오늘의 운세</div>'
      +'<div style="text-align:center;font-size:30px;font-weight:800;color:#059669;margin-bottom:10px;">'+score+'점</div>'
      +'<div style="line-height:1.9;font-size:14.5px;">'
      +'🌈 <b>총운</b> '+pick(GEN,s+'gen')+'<br>'
      +'💗 <b>애정</b> '+pick(LOVE,s+'love')+'<br>'
      +'💰 <b>금전</b> '+pick(MONEY,s+'money')+'<br>'
      +'🩺 <b>건강</b> '+pick(HEALTH,s+'health')+'</div>'
      +'<div style="margin-top:10px;font-size:13px;color:#555;">행운의 숫자 <b>'+(hash(s+'num')%9+1)+'</b> · 행운의 색 <b>'+pick(COLORS,s+'col')+'</b></div>';
  }
  out.style.display='block';
};});
})();
</script>

## 오늘의 운세, 어떻게 봐요

- **별자리·띠별 운세**는 날짜 기준으로 정해져서 **하루 동안 같은 결과**가 나와요. 내일이면 새로 바뀌어요.
- **총운·애정·금전·건강** 네 가지와 행운의 숫자·색을 함께 봐요.
- **타로**는 뽑을 때마다 한 장씩 나와요. 마음속 질문을 떠올리고 뽑아 보세요.
- 재미로 보는 운세예요. 좋은 운세는 힘을 주고, 아쉬운 운세는 조심하라는 신호로 가볍게 받아들여요 🍀
- 생년월일로 보는 [사주·운세](/tools/fortune/)도 있어요.
