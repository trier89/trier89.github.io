---
title: "무료 IQ 테스트 — 15분 만에 알아보는 내 지능지수"
emoji: "🧩"
description: "무료 IQ 테스트 — 패턴인식·논리추론·수열·공간지각·언어유추 20문항으로 알아보는 내 지능지수(IQ) 추정치와 백분위, 강점 영역. 재미로 보는 자가진단."
date: 2026-07-30
slug: "iq-test"
categories: ["심리테스트"]
tags: ["무료 IQ 테스트", "IQ 테스트", "지능지수 테스트", "아이큐 테스트", "심리테스트"]
toc: false
readingTime: false
---

패턴인식·논리추론·수열·공간지각·언어유추 **20문항**으로 알아보는 나의 **IQ 추정치**와 백분위, 그리고 어떤 사고 영역이 강한지 확인해요. 난이도는 뒤로 갈수록 조금씩 올라갑니다. (재미로 보는 자가진단이에요 🧩)

<div id="iq" style="max-width:600px;margin:0 auto;">
  <div id="iq-intro" style="text-align:center;">
    <div style="margin:0 0 14px;padding:12px 14px;border-radius:10px;background:#fef3c7;color:#92400e;font-size:13.5px;line-height:1.6;">⚠️ 이 테스트는 <b>재미·자가진단용</b>이에요. 웩슬러(WAIS) 같은 정식 IQ 검사가 아니며, 점수는 재미로 보는 <b>추정치</b>입니다. 천재 판별이나 정확한 지능 측정과는 관계가 없어요.</div>
    <button id="iq-start" style="padding:16px 40px;border:0;border-radius:12px;background:#7c3aed;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">테스트 시작 (약 5~10분)</button>
  </div>
  <div id="iq-quiz" style="display:none;">
    <div style="height:8px;background:#ede9fe;border-radius:4px;margin-bottom:18px;"><div id="iq-bar" style="height:8px;width:0;background:#7c3aed;border-radius:4px;transition:width .3s;"></div></div>
    <div id="iq-qn" style="font-size:13px;color:#6b7280;margin-bottom:6px;"></div>
    <div id="iq-cat" style="display:inline-block;font-size:12px;color:#6d28d9;background:#f5f3ff;border-radius:999px;padding:3px 10px;margin-bottom:8px;"></div>
    <div id="iq-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;"></div>
    <div id="iq-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="iq-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 사고 영역 5종
var CAT={
  num:{n:"수열·수리",emoji:"🔢"},
  pat:{n:"패턴인식",emoji:"🔍"},
  ver:{n:"언어유추",emoji:"📚"},
  log:{n:"논리추론",emoji:"🧩"},
  spa:{n:"공간지각",emoji:"🧊"}
};
var ORDER=['num','pat','ver','log','spa'];
// 강점 영역별 유형(정답률이 가장 높은 영역)
var TYPES={
  num:{n:"수리 감각러",emoji:"🔢",d:"숫자 사이에 숨은 규칙을 순식간에 낚아채는 사람. 수열만 봐도 다음 숫자가 먼저 보이고, 계산과 규칙 찾기에서 특히 빛나요."},
  pat:{n:"패턴 스캐너",emoji:"🔍",d:"반복과 흐름을 귀신같이 알아채는 눈. 어수선함 속에서도 '아, 이렇게 돌아가는구나'를 남보다 빨리 잡아내요."},
  ver:{n:"언어 마에스트로",emoji:"📚",d:"단어와 단어 사이의 관계를 능숙하게 잇는 사람. 개념을 빠르게 연결하고, 비유·유추로 생각을 확장하는 데 강해요."},
  log:{n:"논리 해결사",emoji:"🧩",d:"전제에서 결론까지 빈틈없이 따라가는 사람. '그래서 뭐가 참이지?'를 침착하게 가려내는 추론이 무기예요."},
  spa:{n:"공간 설계자",emoji:"🧊",d:"머릿속에서 도형을 자유자재로 돌려보는 사람. 눈에 안 보이는 3차원 구조도 상상만으로 척척 다뤄요."}
};
var CODE={num:'N',pat:'P',ver:'V',log:'L',spa:'S'};
var FROMCODE={N:'num',P:'pat',V:'ver',L:'log',S:'spa'};
// [질문, [보기...], 정답인덱스, 영역]  — 난이도 점증
var QS=[
 ["다음 수열의 빈칸에 올 숫자는?  2, 4, 6, 8, ?",["9","10","11","12"],1,"num"],
 ["규칙을 보고 다음에 올 것은?  🔴 🔵 🔴 🔵 🔴 ?",["🔴","🔵","🟢","🟡"],1,"pat"],
 ["'새'와 '하늘'의 관계처럼, '물고기'에 어울리는 것은?",["나무","바다","하늘","땅"],1,"ver"],
 ["모든 고양이는 동물이다. 나비(고양이 이름)는 고양이다. 따라서 나비는?",["식물이다","동물이다","새다","알 수 없다"],1,"log"],
 ["다음 수열의 빈칸은?  3, 6, 12, 24, ?",["30","36","42","48"],3,"num"],
 ["화살표가 시계 방향으로 돌아요.  ↑ → ↓ ← 다음은?",["↑","→","↓","←"],0,"spa"],
 ["'의사 : 병원'의 관계와 같은 것은?  '교사 : ?'",["학생","학교","교실","칠판"],1,"ver"],
 ["다음 수열의 빈칸은?  1, 1, 2, 3, 5, 8, ?",["11","12","13","15"],2,"num"],
 ["도형 규칙의 다음 차례는?  △ ○ □ △ ○ □ △ ?",["△","○","□","◇"],1,"pat"],
 ["다음 중 성격이 다른 하나는?",["사과","바나나","당근","포도"],2,"log"],
 ["다음 수열의 빈칸은?  1, 4, 9, 16, 25, ?",["30","32","36","49"],2,"num"],
 ["반원이 일정하게 회전해요.  ◐ ◓ ◑ ◒ 다음은?",["◐","◓","◑","◒"],0,"spa"],
 ["'덥다 ↔ 춥다'와 같은 관계인 짝은?",["크다-거대하다","밝다-어둡다","걷다-달리다","보다-바라보다"],1,"ver"],
 ["A는 B보다 무겁고, C는 A보다 무겁다. 가장 가벼운 것은?",["A","B","C","알 수 없다"],1,"log"],
 ["다음 수열의 빈칸은?  2, 3, 5, 7, 11, ?",["12","13","14","15"],1,"num"],
 ["작은 정육면체 27개로 만든 3×3×3 큰 정육면체. 겉면이 하나도 없는(완전히 안쪽) 블록은 몇 개?",["1","3","6","9"],0,"spa"],
 ["다음 수열의 빈칸은?  1, 2, 6, 24, 120, ?",["240","360","600","720"],3,"num"],
 ["어떤 학생은 안경을 쓴다. 안경을 쓴 사람은 모두 책을 읽는다. 반드시 참인 것은?",["모든 학생은 책을 읽는다","어떤 학생은 책을 읽는다","책 읽는 사람은 모두 학생이다","학생은 안경을 안 쓴다"],1,"log"],
 ["규칙을 찾아 빈칸을 채워요.  100, 96, 88, 72, ?",["40","48","56","64"],0,"pat"],
 ["'시계 : 시간'의 관계와 같은 것은?  '온도계 : ?'",["날씨","온도","계절","숫자"],1,"ver"]
];
var idx=0;
var got={num:0,pat:0,ver:0,log:0,spa:0};   // 영역별 정답 수
var tot={num:0,pat:0,ver:0,log:0,spa:0};    // 영역별 문항 수
QS.forEach(function(q){tot[q[3]]++;});
var correct=0;
var LET=['A','B','C','D'];
function show(){
  var q=QS[idx];
  $('iq-qn').textContent=(idx+1)+' / '+QS.length;
  $('iq-bar').style.width=(idx/QS.length*100)+'%';
  $('iq-cat').textContent=CAT[q[3]].emoji+' '+CAT[q[3]].n;
  $('iq-q').textContent=q[0];
  var o=$('iq-opts');o.innerHTML='';
  q[1].forEach(function(opt,i){
    var b=document.createElement('button');
    b.innerHTML='<b style="color:#7c3aed;margin-right:8px;">'+LET[i]+'</b>'+opt;
    b.style.cssText='padding:13px 15px;border:2px solid #ddd6fe;border-radius:10px;background:#fff;font-size:16px;cursor:pointer;text-align:left;line-height:1.4;';
    b.onmouseover=function(){b.style.borderColor='#7c3aed';};
    b.onmouseout=function(){b.style.borderColor='#ddd6fe';};
    b.onclick=function(){
      if(i===q[2]){got[q[3]]++;correct++;}
      idx++;idx<QS.length?show():result();
    };
    o.appendChild(b);
  });
}
// 정답률 → IQ 추정치(85~145, 종형분포 느낌)
function toIQ(rate){return Math.round(85+rate*60);}
// 정규분포 CDF (평균100, 표준편차15) — 백분위 계산용
function erf(x){var s=x<0?-1:1;x=Math.abs(x);var t=1/(1+0.3275911*x);
  var y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);
  return s*y;}
function cdf(iq){return 0.5*(1+erf((iq-100)/(15*Math.SQRT2)));}
function iqLevel(iq){
  if(iq>=130) return {n:"최상위권 추정",emoji:"🌟",c:"놀라운 결과예요! 그래도 이건 재미로만 봐요 😉"};
  if(iq>=115) return {n:"평균 이상",emoji:"😎",c:"논리·추론 감각이 또렷한 편이에요."};
  if(iq>=100) return {n:"평균권",emoji:"🙂",c:"딱 균형 잡힌 사고력을 보여줬어요."};
  if(iq>=93)  return {n:"평균 근처",emoji:"🌱",c:"몇 유형만 익숙해지면 금방 오를 여지가 있어요."};
  return {n:"성장 여지 충분",emoji:"🌾",c:"오늘은 몸풀기! 유형에 익숙해지면 점수는 달라져요."};
}
function best(){var b='num',mx=-1;ORDER.forEach(function(k){var r=got[k]/tot[k];if(r>mx){mx=r;b=k;}});return b;}
function render(typeKey,shared,data){
  $('iq-intro').style.display='none';$('iq-quiz').style.display='none';
  var t=TYPES[typeKey]||TYPES.num;
  var html='';
  if(shared){
    html+='<div style="text-align:center;padding:24px;border-radius:14px;background:#f5f3ff;">'
      +'<div style="font-size:48px;">'+t.emoji+'</div>'
      +'<div style="font-size:15px;color:#7c3aed;font-weight:600;">친구의 강점 사고 유형</div>'
      +'<div style="font-size:26px;font-weight:800;color:#6d28d9;">'+t.n+'</div></div>';
    html+='<div style="text-align:center;margin:10px 0;padding:10px;border-radius:10px;background:#fff7ed;color:#9a3412;font-size:14px;">친구가 공유한 결과예요 🧩 당신의 두뇌는 어떤 유형일까요?</div>';
    html+='<p style="line-height:1.75;margin-top:14px;">'+t.d+'</p>';
  } else {
    var iq=data.iq, lv=iqLevel(iq);
    var top=Math.max(0.1,Math.round((1-cdf(iq))*1000)/10); // 상위 %
    var pct=Math.min(99.9,Math.max(0.1,Math.round(cdf(iq)*1000)/10)); // 백분위
    // 대문짝 IQ 점수
    html+='<div style="text-align:center;padding:26px 20px;border-radius:16px;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;">'
      +'<div style="font-size:14px;opacity:.85;">나의 IQ 추정치</div>'
      +'<div style="font-size:64px;font-weight:900;line-height:1.05;margin:2px 0;">'+iq+'</div>'
      +'<div style="font-size:17px;font-weight:700;">'+lv.emoji+' '+lv.n+'</div>'
      +'<div style="font-size:13px;opacity:.9;margin-top:4px;">'+lv.c+'</div></div>';
    // 백분위 + 정답수
    html+='<div style="display:flex;gap:10px;margin-top:12px;">'
      +'<div style="flex:1;text-align:center;padding:14px;border-radius:12px;background:#faf5ff;"><div style="font-size:13px;color:#6b7280;">백분위</div><div style="font-size:22px;font-weight:800;color:#6d28d9;">상위 '+top+'%</div><div style="font-size:11px;color:#9ca3af;">100명 중 약 '+Math.max(1,Math.round(top))+'등 느낌</div></div>'
      +'<div style="flex:1;text-align:center;padding:14px;border-radius:12px;background:#faf5ff;"><div style="font-size:13px;color:#6b7280;">맞힌 문항</div><div style="font-size:22px;font-weight:800;color:#6d28d9;">'+data.correct+' / '+QS.length+'</div><div style="font-size:11px;color:#9ca3af;">정답률 '+Math.round(data.correct/QS.length*100)+'%</div></div>'
      +'</div>';
    // 강점 유형
    html+='<div style="text-align:center;margin-top:14px;padding:18px;border-radius:14px;background:#f5f3ff;">'
      +'<div style="font-size:42px;">'+t.emoji+'</div>'
      +'<div style="font-size:14px;color:#7c3aed;font-weight:600;">나의 강점 사고 유형</div>'
      +'<div style="font-size:23px;font-weight:800;color:#6d28d9;">'+t.n+'</div>'
      +'<p style="line-height:1.7;margin-top:8px;text-align:left;">'+t.d+'</p></div>';
    // 영역별 바그래프
    html+='<h3 style="margin:20px 0 8px;color:#6d28d9;">📊 영역별 정답률</h3>';
    ORDER.forEach(function(k){
      var p=Math.round(got[k]/tot[k]*100);
      var c=CAT[k];
      html+='<div style="margin-bottom:10px;">'
        +'<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:3px;"><span>'+c.emoji+' '+c.n+'</span><span style="color:#7c3aed;font-weight:700;">'+got[k]+'/'+tot[k]+' ('+p+'%)</span></div>'
        +'<div style="height:10px;background:#ede9fe;border-radius:5px;overflow:hidden;"><div style="height:10px;width:'+p+'%;background:#7c3aed;border-radius:5px;"></div></div></div>';
    });
    html+='<div style="margin-top:14px;padding:14px;border-radius:10px;background:#fef3c7;color:#92400e;font-size:13.5px;line-height:1.65;">⚠️ 이 점수는 <b>재미로 보는 추정치</b>예요. 웩슬러(WAIS) 등 정식 IQ 검사가 아니며, 문항 수가 적고 종형분포를 흉내 낸 간이 환산이라 실제 지능지수와 다를 수 있어요. 정확한 지능 측정이나 천재 판별용이 아닙니다.</div>';
  }
  html+='<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
      ?'<button id="iq-mine" style="flex:1;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
      :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid #7c3aed;border-radius:10px;background:#fff;color:#6d28d9;font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
       +'<button id="iq-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/eq-test/">EQ 감성지능</a> · <a href="/tests/personality-test/">16 성격유형</a></div>'
    +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미와 자기이해를 위한 자가진단이며, 전문·임상 지능 검사가 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 계산돼요.</div>';
  $('iq-result').innerHTML=html;
  $('iq-result').style.display='block';
  if(shared){var mine=$('iq-mine');if(mine)mine.onclick=function(){location.href=location.pathname;};}
  else{$('iq-share').onclick=function(){
    var url=location.origin+location.pathname+'?r='+CODE[typeKey];
    var txt='내 IQ 추정치는 '+data.iq+'점, 강점은 '+t.emoji+' '+t.n+'! 너의 지능지수는? 👉 '+url;
    if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
  };}
  window.scrollTo({top:$('iq').offsetTop-20,behavior:'smooth'});
}
function result(){
  var rate=correct/QS.length;
  render(best(),false,{iq:toIQ(rate),correct:correct});
}
$('iq-start').onclick=function(){$('iq-intro').style.display='none';$('iq-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([NPVLS])/);if(m){render(FROMCODE[m[1]],true,{});}})();
})();
</script>

## 무료 IQ 테스트에 대하여

이 **무료 IQ 테스트**는 **패턴인식·논리추론·수열·공간지각·언어유추** 다섯 가지 사고 영역의 20문항(객관식)으로 구성돼 있어요. 뒤로 갈수록 난이도가 조금씩 올라가고, 맞힌 문항의 비율을 바탕으로 **IQ 추정치(85~145 범위)**와 **백분위**, 그리고 어떤 영역이 강한지를 알려드립니다.

점수는 정답률을 종형분포(평균 100, 표준편차 15) 느낌으로 매핑한 **간이 환산치**입니다. 정식 IQ 검사(웩슬러 WAIS·스탠퍼드-비네 등)는 훈련받은 전문가가 대면으로 여러 하위검사를 통해 측정하며, 이 테스트와는 방식·정확도가 전혀 다릅니다.

**중요:** 본 테스트는 재미와 자기이해를 위한 **자가진단 콘텐츠**이며, 정확한 지능 측정이나 천재·영재 판별 용도가 아닙니다. 문항 수가 적어 점수는 어디까지나 **재미로 보는 추정치**로만 받아들여 주세요. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
