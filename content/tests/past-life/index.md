---
title: "전생 테스트 — 나의 전생은 어떤 사람이었을까?"
emoji: "🔮"
description: "무료 전생 테스트 — 12문항으로 알아보는 나의 전생. 왕족·전사·학자·예술가·치유사·방랑자 6가지 전생 유형 중 나는? 성격으로 풀어보는 재미있는 전생 심리테스트, 결과는 바로 공유돼요."
date: 2026-08-07
slug: "past-life"
categories: ["심리테스트"]
tags: ["전생 테스트", "전생 심리테스트", "나의 전생", "성격 유형 테스트", "심리테스트"]
toc: false
readingTime: false
---

12개의 질문으로 풀어보는 **나의 전생**. 아주 먼 옛날, 나는 한 나라를 다스리던 왕이었을까 — 아니면 세상을 떠돌던 방랑자였을까? 지금 나의 성격 속에 남아있는 전생의 흔적을 따라가 보세요. (재미로 보는 심리테스트예요 🔮)

<div id="pl" style="max-width:600px;margin:0 auto;">
  <div id="pl-intro" style="text-align:center;">
    <button id="pl-start" style="padding:16px 40px;border:0;border-radius:12px;background:#b8862f;color:#fff;font-size:18px;font-weight:700;cursor:pointer;">전생 확인하기 (약 1분)</button>
  </div>
  <div id="pl-quiz" style="display:none;">
    <div style="height:8px;background:#f3e9d5;border-radius:4px;margin-bottom:18px;"><div id="pl-bar" style="height:8px;width:0;background:#b8862f;border-radius:4px;transition:width .3s;"></div></div>
    <div id="pl-qn" style="font-size:13px;color:#9ca3af;margin-bottom:6px;"></div>
    <div id="pl-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;color:#2b2b2b;"></div>
    <div id="pl-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="pl-result" style="display:none;color:#2b2b2b;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPE={
  R:{n:"한 나라의 왕족",emoji:"👑",color:"#c99a2e",d:"전생의 당신은 한 나라를 다스리던 왕, 혹은 여왕이었어요. 사람들은 당신의 결정을 따랐고, 당신은 그 무게를 기꺼이 짊어졌죠. 타고난 카리스마와 책임감, 그리고 무리를 이끄는 리더십은 지금의 당신에게도 고스란히 남아있어요.",now:"지금도 어딜 가나 중심에 서고, 사람들이 은근히 당신을 따라요.",good:"⚔️ 전사 · 📜 학자"},
  W:{n:"용맹한 전사",emoji:"⚔️",color:"#a5482f",d:"전생의 당신은 나라를 지키던 용맹한 전사였어요. 불의를 보면 참지 못하고, 약한 이를 위해 기꺼이 앞장섰죠. 두려움 앞에서도 물러서지 않던 그 용기와 정의감이, 지금 당신의 곧은 심지 속에 흐르고 있어요.",now:"불의를 못 참고, 소중한 사람을 지키려는 마음이 누구보다 강해요.",good:"👑 왕족 · 🧭 방랑자"},
  S:{n:"지혜로운 학자",emoji:"📜",color:"#3f7de1",d:"전생의 당신은 세상의 이치를 탐구하던 학자이자 현자였어요. 밤을 새워 책을 읽고, 어려운 문제 앞에서 오히려 눈을 반짝였죠. 깊이 사고하고 본질을 꿰뚫는 통찰력이, 지금의 당신을 남다르게 만들어요.",now:"궁금한 건 끝까지 파고들고, 사람들이 조언을 구하러 와요.",good:"👑 왕족 · 🎨 예술가"},
  A:{n:"자유로운 예술가",emoji:"🎨",color:"#8a5cd6",d:"전생의 당신은 세상을 아름다움으로 물들이던 예술가, 음유시인이었어요. 남들이 못 보는 것을 보고, 마음을 울리는 것을 만들어냈죠. 풍부한 감성과 상상력, 자유로운 영혼이 지금도 당신 안에서 반짝이고 있어요.",now:"감수성이 풍부하고, 나만의 감각과 취향이 뚜렷해요.",good:"📜 학자 · 🌿 치유사"},
  H:{n:"따뜻한 치유사",emoji:"🌿",color:"#2f9e6b",d:"전생의 당신은 아픈 이를 보살피던 치유사이자 약초꾼이었어요. 상처받은 몸과 마음을 어루만지고, 조용히 곁을 지켰죠. 남을 돌보는 따뜻함과 헌신, 그 다정한 손길이 지금의 당신에게도 그대로 남아있어요.",now:"힘든 사람을 그냥 못 지나치고, 곁에 있으면 마음이 편해져요.",good:"🎨 예술가 · 🧭 방랑자"},
  V:{n:"세상을 떠돈 방랑자",emoji:"🧭",color:"#c96a2e",d:"전생의 당신은 지도에도 없는 길을 걷던 방랑자이자 탐험가였어요. 한곳에 머무르기보다 새로운 세상을 향해 떠났고, 낯선 것 앞에서 설렜죠. 그 자유로운 발걸음과 끝없는 호기심이 지금의 당신을 움직여요.",now:"얽매이는 걸 싫어하고, 새로운 경험과 여행을 늘 꿈꿔요.",good:"⚔️ 전사 · 🌿 치유사"}
};
var ORDER=['R','W','S','A','H','V'];
var Q=[
 ["낯선 마을에 도착했다. 가장 먼저 하는 일은?",[["사람들을 모아 상황을 정리","R"],["오래된 책과 기록부터 찾기","S"],["구석구석 둘러보며 지도 그리기","V"],["아픈 사람은 없나 살피기","H"]]],
 ["위기가 닥쳤다. 나의 대응은?",[["앞장서서 사람들을 지휘","R"],["무기 들고 맞서 싸움","W"],["원인을 분석해 해법을 찾음","S"],["사람들을 안전히 대피시킴","H"]]],
 ["여유로운 하루, 뭘 할까?",[["새로운 곳으로 훌쩍 떠남","V"],["그림 그리거나 노래 만들기","A"],["책 읽으며 사색","S"],["정원 가꾸고 차 끓이기","H"]]],
 ["사람들이 나를 이렇게 봐요.",[["믿음직한 리더","R"],["정의롭고 용감한 사람","W"],["똑똑하고 박식한 사람","S"],["감성적이고 독특한 사람","A"]]],
 ["가장 견디기 힘든 것은?",[["무능하고 우유부단한 것","R"],["불의를 보고 참는 것","W"],["얽매이고 갇히는 것","V"],["차갑고 매정한 것","H"]]],
 ["보물 지도를 얻었다면?",[["원정대를 꾸려 지휘","R"],["위험을 뚫고 직접 모험","V"],["암호와 단서부터 해독","S"],["그 여정을 기록하고 그림","A"]]],
 ["친구가 힘들어할 때 나는?",[["해결책을 딱 제시","S"],["곁에서 조용히 위로","H"],["기분 전환하러 데리고 나감","V"],["마음을 담은 편지·노래를 줌","A"]]],
 ["타고났다고 느끼는 재능은?",[["사람을 이끄는 힘","R"],["위기에 강한 담대함","W"],["빠른 이해와 통찰","S"],["남다른 감각과 표현력","A"]]],
 ["살고 싶은 곳은?",[["사람들이 모이는 성·궁전","R"],["책으로 가득한 서재","S"],["숲속 조용한 오두막","H"],["정처 없는 길 위","V"]]],
 ["새로운 일 앞에서 나는?",[["큰 그림을 그리고 지시","R"],["일단 부딪혀 봄","W"],["충분히 조사한 뒤 시작","S"],["내 방식대로 자유롭게","A"]]],
 ["사람들과 있을 때 나는?",[["자연스럽게 중심이 됨","R"],["약한 사람 편을 듦","W"],["듣고 관찰하는 편","S"],["분위기를 따뜻하게 함","H"]]],
 ["삶에서 가장 소중한 것은?",[["명예와 책임","R"],["신념과 정의","W"],["자유와 새로움","V"],["사랑과 온기","H"]]]
];
var sums={R:0,W:0,S:0,A:0,H:0,V:0}, i=0;
function show(){
 var q=Q[i];
 $('pl-qn').textContent=(i+1)+' / '+Q.length;
 $('pl-q').textContent=q[0];
 $('pl-bar').style.width=(i/Q.length*100)+'%';
 var box=$('pl-opts');box.innerHTML='';
 q[1].forEach(function(o){
  var b=document.createElement('button');
  b.textContent=o[0];
  b.style.cssText='padding:14px 16px;border:1.5px solid #ecdcb8;border-radius:12px;background:#fff;color:#2b2b2b;font-size:16px;text-align:left;cursor:pointer;line-height:1.4;';
  b.onmouseover=function(){b.style.background='#fbf3e1';};
  b.onmouseout=function(){b.style.background='#fff';};
  b.onclick=function(){sums[o[1]]++;i++;if(i<Q.length)show();else result();};
  box.appendChild(b);
 });
}
function top(){var best='R',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function render(key,shared){
 var t=TYPE[key];
 var html='<div style="text-align:center;padding:22px 16px;border-radius:16px;background:linear-gradient(160deg,'+t.color+'22,'+t.color+'08);">'
  +'<div style="font-size:64px;">'+t.emoji+'</div>'
  +'<div style="font-size:13px;color:'+t.color+';font-weight:700;margin-top:4px;">당신의 전생은</div>'
  +'<div style="font-size:26px;font-weight:800;margin:2px 0 0;color:'+t.color+';">'+t.n+'</div></div>'
  +'<div style="line-height:1.75;margin:18px 4px;font-size:15px;">'+t.d+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#fbf3e1;font-size:14px;line-height:1.7;"><b>✨ 지금의 나에게 남은 흔적</b><br>'+t.now+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f5f7fb;font-size:14px;line-height:1.7;"><b>🤝 전생의 인연</b><br>'+t.good+'</div>';
 html+='<div style="display:flex;gap:10px;margin-top:20px;">'
  +(shared
    ?'<button onclick="location.href=location.pathname" style="flex:1;padding:14px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:16px;cursor:pointer;">나의 전생도 보기 →</button>'
    :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid '+t.color+';border-radius:10px;background:#fff;color:'+t.color+';font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
     +'<button id="pl-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:700;font-size:15px;cursor:pointer;">결과 공유하기</button>')
  +'</div>'
  +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14px;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/love-cell/">연애세포</a> · <a href="/tests/greek-god/">그리스 신</a></div>'
  +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미로 보는 자가진단이며 전문 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
 $('pl-result').innerHTML=html;
 $('pl-result').style.display='block';
 if(!shared){var sb=$('pl-share');if(sb)sb.onclick=function(){
  var url=location.origin+location.pathname+'?r='+key;
  var txt='내 전생은 '+t.emoji+' '+t.n+'! 너의 전생은? 👉 '+url;
  if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
 };}
 window.scrollTo({top:$('pl').offsetTop-20,behavior:'smooth'});
}
function result(){$('pl-quiz').style.display='none';render(top(),false);}
$('pl-start').onclick=function(){$('pl-intro').style.display='none';$('pl-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([RWSAHV])/);if(m){$('pl-intro').style.display='none';render(m[1],true);}})();
})();
</script>

## 전생 테스트에 대하여

우리의 성격 속에는 아주 오래된 이야기가 담겨 있는지도 몰라요. 이 테스트는 12개의 상황 질문에 답하면, 당신의 성향을 바탕으로 **왕족·전사·학자·예술가·치유사·방랑자** 여섯 가지 전생 유형 중 하나를 찾아드려요.

각 선택에 따라 유형별 점수가 쌓이고, 가장 높게 나온 전생이 당신의 결과가 됩니다. 결과에는 전생 이야기, 지금의 나에게 남은 흔적, 잘 맞는 전생의 인연이 함께 나오고 친구에게 바로 공유할 수 있어요. 재미와 자기이해를 위한 콘텐츠이며 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
