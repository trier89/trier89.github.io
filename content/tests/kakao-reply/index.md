---
title: "카톡 답장 스타일 심리테스트 — 나는 어떤 답장 유형?"
emoji: "💬"
description: "무료 카톡 답장 스타일 심리테스트 — 12문항으로 알아보는 나의 메신저 성격. 칼답·읽씹·장문·이모티콘·무심·폭풍 6가지 답장 유형 중 내 타입은? 결과는 친구에게 바로 공유돼요."
date: 2026-08-13
slug: "kakao-reply"
categories: ["심리테스트"]
tags: ["카톡 답장 스타일", "메신저 성격 테스트", "카톡 유형", "답장 심리테스트", "심리테스트"]
toc: false
readingTime: false
---

카톡 답장에는 그 사람의 성격이 다 드러나요. 나는 알림 뜨자마자 칼답하는 타입일까, 읽고도 뭉개는 읽씹러일까, 소설 쓰는 장문러일까? 12개의 질문으로 알아보는 **내 카톡 답장 스타일**, 6가지 유형 중 내 타입을 찾아보세요. (재미로 보는 심리테스트예요 💬)

<div id="kr" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:22px 18px;color:#2b2b2b;box-shadow:0 2px 16px rgba(0,0,0,.15);">
  <div id="kr-intro" style="text-align:center;">
    <button id="kr-start" style="padding:16px 40px;border:0;border-radius:12px;background:#fae100;color:#3a1d1d;font-size:18px;font-weight:800;cursor:pointer;">내 카톡 답장 유형 보기 (약 1분)</button>
  </div>
  <div id="kr-quiz" style="display:none;">
    <div style="height:8px;background:#fff3b0;border-radius:4px;margin-bottom:18px;"><div id="kr-bar" style="height:8px;width:0;background:#fae100;border-radius:4px;transition:width .3s;"></div></div>
    <div id="kr-qn" style="font-size:13px;color:#9ca3af;margin-bottom:6px;"></div>
    <div id="kr-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;color:#2b2b2b;"></div>
    <div id="kr-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="kr-result" style="display:none;color:#2b2b2b;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPE={
  Q:{n:"칼답형",emoji:"⚡",color:"#e8a000",one:"즉답 · 대화 리듬 · 텐션",d:"알림이 뜨자마자 손이 먼저 나가는 대화의 불꽃. 답장 속도가 곧 애정이라 믿고, 대화가 끊기는 걸 못 견뎌요. 함께 톡하면 리듬이 착착 맞아서 심심할 틈이 없죠. 톡방에서 제일 먼저 반응하는 건 언제나 당신이에요.",pro:"답장이 빠르고 대화가 끊기지 않아, 함께 톡하면 신나고 든든해요.",con:"상대가 나만큼 빠르지 않아도 서운해하지 않기! 답장 재촉은 살짝 참아요.",match:"🌪️ 폭풍형 (텐션이 찰떡) · 🐰 이모티콘형 (대화가 화사해져요)"},
  I:{n:"읽씹형",emoji:"👀",color:"#7c5cd6",one:"읽씹 장인 · 마이페이스 · 뒤늦은 진심",d:"읽긴 읽었는데… 답장은 나중에. 무시하는 게 아니라 뭐라 답할지 고르다 타이밍을 놓치는 스타일이에요. 머릿속으론 이미 답장을 세 번쯤 썼다 지웠죠. 답이 느릴 뿐, 마음은 언제나 거기 있어요.",pro:"즉흥적으로 말을 뱉지 않고, 답장할 땐 곱씹은 진심을 담아요.",con:"너무 오래 묵히면 상대가 서운할 수 있어요. '읽었어, 이따 답할게' 한 줄이면 충분!",match:"⚡ 칼답형 (대신 대화를 이끌어줘요) · 🗿 무심형 (서로의 텀을 이해해요)"},
  L:{n:"장문형",emoji:"📜",color:"#2f8fe0",one:"장문러 · 진심 소설가 · 정성 애정",d:"카톡 한 통이 곧 편지 한 장. 할 말이 생기면 문단으로 정리해 마음을 꾹꾹 눌러 담아요. 짧게 못 보내는 게 아니라, 제대로 전하고 싶어서예요. 당신의 장문을 받은 사람은 은근한 정성에 감동하곤 하죠.",pro:"표현이 풍부하고 진심이 잘 전해져서, 깊은 대화를 나누기 좋아요.",con:"가끔은 상대가 스크롤에 지칠 수도. 핵심만 짧게 보내는 것도 연습해봐요.",match:"🐰 이모티콘형 (긴 글에 리액션 팡팡) · ⚡ 칼답형 (바로바로 받아줘요)"},
  E:{n:"이모티콘형",emoji:"🐰",color:"#e05a94",one:"이모티콘 부자 · 짤 장인 · 분위기 메이커",d:"말보다 이모티콘이 먼저 나가는 감정 표현의 달인. 웃긴 짤, 귀여운 캐릭터로 대화를 화사하게 채워요. 글자 없이도 대화가 통하는 신기한 재주가 있죠. 당신과의 톡방은 늘 알록달록 즐거워요.",pro:"리액션이 풍부해서 함께 톡하면 기분이 좋아지고 대화가 부드러워요.",con:"진지한 얘기엔 이모티콘만으론 부족할 때도. 가끔은 말로도 표현해요.",match:"📜 장문형 (당신의 리액션이 반가워요) · ⚡ 칼답형 (텐션이 두 배)"},
  N:{n:"무심형",emoji:"🗿",color:"#667085",one:"단답 장인 · ㅇㅇ · 쿨한 효율파",d:"'ㅇㅇ' 'ㅇㅋ' '굿' 세 글자면 대화 끝. 무뚝뚝해 보여도 사실은 효율을 사랑하는 쿨한 스타일이에요. 필요한 말만 딱, 군더더기 없이. 그래서 당신이 길게 답장하면 상대는 '오늘 무슨 일 있나?' 하고 놀라죠.",pro:"쓸데없는 말이 없어 깔끔하고, 결정이 빨라 약속 잡을 때 편해요.",con:"단답만 오가면 상대가 서운할 수도. 가끔은 한 문장만 더 붙여봐요.",match:"👀 읽씹형 (서로 편한 거리 유지) · ⚡ 칼답형 (대화를 살려줘요)"},
  S:{n:"폭풍형",emoji:"🌪️",color:"#2f9e8a",one:"연타 전송 · 실시간 중계 · 생각의 폭포",d:"한 문장을 다섯 조각으로 나눠 보내는 실시간 중계의 달인. 생각날 때마다 톡이 우르르 쏟아지고, 상대 폰은 알림 진동이 멈추질 않죠. 정신없어 보여도 그만큼 나눌 얘기가 많다는 뜻. 당신의 톡방은 언제나 생기가 넘쳐요.",pro:"숨김없이 실시간으로 마음을 나눠, 함께 있으면 지루할 틈이 없어요.",con:"한 번에 몰아 보내면 상대가 덜 놀라요. 알림 폭탄은 살짝만 조절!",match:"⚡ 칼답형 (속도가 착착 맞아요) · 🐰 이모티콘형 (같이 왁자지껄)"}
};
var ORDER=['Q','I','L','E','N','S'];
var Q=[
 ["카톡 알림이 울렸다. 나의 반응은?",[["바로 확인하고 즉시 답장","Q"],["확인은 했는데 답은 나중에","I"],["이모티콘부터 하나 툭 보냄","E"],["할 말 있으면 답, 아니면 패스","N"]]],
 ["친구가 장문의 고민 톡을 보냈다.",[["진심 담아 긴 답장을 씀","L"],["뭐라 답할지 고민하다 늦어짐","I"],["'헐 진짜?' 짧게 리액션","N"],["공감 이모티콘 폭탄 발사","E"]]],
 ["나의 답장 텀은?",[["1분 안에 칼답","Q"],["생각날 때마다 여러 번 나눠서","S"],["몇 시간~다음 날","I"],["짧게 그때그때","N"]]],
 ["대화 중 할 말이 많으면?",[["문단으로 길게 정리해 한 번에","L"],["짧은 톡 여러 개로 연타","S"],["요약해서 딱 한 줄","N"],["이모티콘+짧은 말 섞어서","E"]]],
 ["상대가 'ㅇㅇ'만 보내면?",[["나도 'ㅇㅇ'","N"],["무슨 일 있나 길게 물어봄","L"],["재밌는 짤로 분위기 살림","E"],["바로 다른 얘기로 톡 이어감","Q"]]],
 ["단톡방에서 나는?",[["흐름 놓치면 읽고 그냥 지나감","I"],["짤·이모티콘 담당","E"],["생각날 때마다 톡 여러 개","S"],["필요할 때만 한마디","N"]]],
 ["좋아하는 사람과 카톡할 때?",[["답장 최대한 빨리, 대화 이어감","Q"],["진심 꾹꾹 담은 장문","L"],["귀여운 이모티콘 총동원","E"],["답장 뭐라 할지 30분 고민","I"]]],
 ["카톡 프로필·상태메시지는?",[["자주 바꾸고 이모티콘 가득","E"],["별로 신경 안 씀, 기본 그대로","N"],["하고 싶은 말 길게 적어둠","L"],["기분 따라 수시로 여러 번 바꿈","S"]]],
 ["답장하기 귀찮을 때?",[["그냥 안 읽은 척 나중에","I"],["'ㅇㅋ' 한 방","N"],["이모티콘 하나로 퉁침","E"],["그래도 바로바로는 함","Q"]]],
 ["친구가 밤에 '자니?' 보냈다.",[["바로 'ㄴㄴ 왜?'","Q"],["아침에 발견하고 답장","I"],["무슨 일인지 길게 물어봄","L"],["생각나는 대로 톡 우르르","S"]]],
 ["나의 카톡을 한마디로?",[["대화의 불꽃, 칼답","Q"],["읽씹 장인","I"],["소설 쓰는 장문러","L"],["이모티콘 없으면 말 못 함","E"]]],
 ["그룹 약속을 잡을 때 나는?",[["빠르게 정리해서 공지","Q"],["조용히 읽고 따라감","I"],["의견을 길게 남김","L"],["톡 여러 개로 실시간 중계","S"]]]
];
var sums={Q:0,I:0,L:0,E:0,N:0,S:0}, i=0;
function show(){
 var q=Q[i];
 $('kr-qn').textContent=(i+1)+' / '+Q.length;
 $('kr-q').textContent=q[0];
 $('kr-bar').style.width=(i/Q.length*100)+'%';
 var box=$('kr-opts');box.innerHTML='';
 q[1].forEach(function(o){
  var b=document.createElement('button');
  b.textContent=o[0];
  b.style.cssText='padding:14px 16px;border:1.5px solid #f0e08a;border-radius:12px;background:#fff;color:#2b2b2b;font-size:16px;text-align:left;cursor:pointer;line-height:1.4;';
  b.onmouseover=function(){b.style.background='#fffbe0';};
  b.onmouseout=function(){b.style.background='#fff';};
  b.onclick=function(){sums[o[1]]++;i++;if(i<Q.length)show();else result();};
  box.appendChild(b);
 });
}
function top(){var best='Q',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function render(key,shared){
 var t=TYPE[key];
 var html='<div style="text-align:center;padding:24px 16px;border-radius:16px;background:linear-gradient(160deg,'+t.color+'26,'+t.color+'08);">'
  +'<div style="font-size:64px;">'+t.emoji+'</div>'
  +'<div style="font-size:13px;color:'+t.color+';font-weight:700;margin-top:4px;">내 카톡 답장 유형은</div>'
  +'<div style="font-size:27px;font-weight:800;margin:2px 0 0;color:'+t.color+';">'+t.n+'</div>'
  +'<div style="display:inline-block;margin-top:10px;padding:5px 14px;border-radius:20px;background:'+t.color+';color:#fff;font-size:13px;font-weight:700;">'+t.one+'</div></div>'
  +'<div style="line-height:1.75;margin:18px 4px;font-size:15px;color:#2b2b2b;">'+t.d+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f4fbef;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>👍 이런 게 강점</b><br>'+t.pro+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#fff7ed;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>⚠️ 조심할 점</b><br>'+t.con+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f5f7fb;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>🤝 잘 맞는 유형</b><br>'+t.match+'</div>';
 html+='<div style="display:flex;gap:10px;margin-top:20px;">'
  +(shared
    ?'<button onclick="location.href=location.pathname" style="flex:1;padding:14px;border:0;border-radius:10px;background:#fae100;color:#3a1d1d;font-weight:800;font-size:16px;cursor:pointer;">나도 테스트하기 →</button>'
    :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid '+t.color+';border-radius:10px;background:#fff;color:'+t.color+';font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
     +'<button id="kr-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:#fae100;color:#3a1d1d;font-weight:800;font-size:15px;cursor:pointer;">결과 공유하기</button>')
  +'</div>'
  +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#fffbe0;font-size:14px;color:#2b2b2b;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/love-cell/">연애세포</a> · <a href="/tests/aura-color/">아우라 컬러</a></div>'
  +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 재미로 보는 자가진단이며 전문 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
 $('kr-result').innerHTML=html;
 $('kr-result').style.display='block';
 if(!shared){var sb=$('kr-share');if(sb)sb.onclick=function(){
  var url=location.origin+location.pathname+'?r='+key;
  var txt='내 카톡 답장 유형은 '+t.emoji+' '+t.n+'! 너는 어떤 답장 유형? 👉 '+url;
  if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
 };}
 window.scrollTo({top:$('kr').offsetTop-20,behavior:'smooth'});
}
function result(){$('kr-quiz').style.display='none';render(top(),false);}
$('kr-start').onclick=function(){$('kr-intro').style.display='none';$('kr-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([QILENS])/);if(m){$('kr-intro').style.display='none';render(m[1],true);}})();
})();
</script>

## 카톡 답장 스타일 심리테스트에 대하여

같은 카톡을 받아도 답장하는 방식은 사람마다 제각각이에요. 누군가는 1분 안에 칼답을 날리고, 누군가는 읽고도 한참 뒤에야 답하죠. 이 테스트는 12개의 상황 질문에 답하면 **칼답형·읽씹형·장문형·이모티콘형·무심형·폭풍형** 여섯 가지 답장 유형 중 나에게 가장 강한 타입을 찾아드려요.

각 질문의 선택에 따라 유형별 점수가 쌓이고, 가장 높게 나온 유형이 나의 카톡 답장 스타일이 됩니다. 결과에는 유형 설명, 강점, 조심할 점, 잘 맞는 유형이 함께 나오고 친구에게 바로 공유할 수 있어요. 재미와 자기이해를 위한 콘텐츠이며 전문·임상 심리 진단이 아닙니다. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
