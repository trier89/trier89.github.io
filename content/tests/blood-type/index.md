---
title: "혈액형 성격 테스트 — 나는 진짜 무슨 형?"
emoji: "🩸"
description: "무료 혈액형 성격 테스트 — 12문항으로 알아보는 나의 혈액형 성격 유형. A형·B형·O형·AB형 성격 중 나는 어떤 스타일일까? 진짜 혈액형과 다르게 나올수록 재밌는 재미 심리테스트, 결과는 바로 공유돼요."
date: 2026-08-13
slug: "blood-type"
categories: ["심리테스트"]
tags: ["혈액형 성격", "혈액형 테스트", "A형 B형 O형 AB형", "혈액형 성격 유형", "심리테스트"]
toc: false
readingTime: false
---

혈액형으로 성격을 맞힌다고? 진짜 혈액형을 입력하는 게 아니라, **12개의 질문으로 내 성격이 어떤 혈액형 스타일에 가장 가까운지** 찾아주는 테스트예요. A형·B형·O형·AB형 성격 유형 중 내 타입은? 실제 혈액형과 다르게 나올수록 더 재밌답니다. (혈액형 성격설은 과학적 근거가 없는 재미 콘텐츠예요 🩸)

<div id="bt" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:22px 18px;color:#2b2b2b;box-shadow:0 2px 16px rgba(0,0,0,.15);">
  <div id="bt-intro" style="text-align:center;">
    <button id="bt-start" style="padding:16px 40px;border:0;border-radius:12px;background:#d92d20;color:#fff;font-size:18px;font-weight:800;cursor:pointer;">내 혈액형 성격 유형 보기 (약 1분)</button>
  </div>
  <div id="bt-quiz" style="display:none;">
    <div style="height:8px;background:#ffd9d4;border-radius:4px;margin-bottom:18px;"><div id="bt-bar" style="height:8px;width:0;background:#d92d20;border-radius:4px;transition:width .3s;"></div></div>
    <div id="bt-qn" style="font-size:13px;color:#9ca3af;margin-bottom:6px;"></div>
    <div id="bt-q" style="font-size:19px;font-weight:700;line-height:1.5;min-height:56px;color:#2b2b2b;"></div>
    <div id="bt-opts" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;"></div>
  </div>
  <div id="bt-result" style="display:none;color:#2b2b2b;"></div>
</div>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var TYPE={
  A:{n:"A형 성격",emoji:"🌸",color:"#2f6fe0",one:"꼼꼼 · 신중 · 세심한 배려왕",d:"겉으론 조용해도 속은 누구보다 섬세한 살림꾼. 계획 없이 움직이는 걸 못 견디고, 작은 디테일까지 챙겨야 마음이 놓여요. 눈치가 빠르고 배려가 몸에 배어 있어서, 곁에 있으면 은근히 든든한 사람이에요. 속정은 깊은데 표현이 서툴러 가끔 오해를 받기도 하죠.",pro:"성실하고 책임감이 강해 맡은 일은 끝까지 야무지게 해내요. 세심한 배려로 주변을 편안하게 만들죠.",con:"너무 완벽하려다 혼자 끙끙 앓기 쉬워요. 가끔은 '이 정도면 됐어' 하고 힘을 빼도 괜찮아요.",match:"🔥 O형 성격 (시원하게 리드해줘요) · 🌀 AB형 성격 (의외로 죽이 잘 맞아요)"},
  B:{n:"B형 성격",emoji:"🎈",color:"#f0821e",one:"자유 · 마이웨이 · 열정 만렙",d:"하고 싶은 건 해야 직성이 풀리는 자유로운 영혼. 남 시선보다 내 기분이 먼저고, 꽂히면 무섭게 몰입했다가 금세 다른 데로 튀기도 해요. 솔직하고 감정 표현이 시원시원해서 함께 있으면 지루할 틈이 없죠. 틀에 갇히는 걸 세상에서 제일 싫어해요.",pro:"호기심과 열정이 넘쳐 새로운 일에 겁 없이 뛰어들어요. 솔직담백해서 곁에 있으면 편하고 즐거워요.",con:"기분파라 변덕처럼 보일 때가 있어요. 시작한 일의 마무리까지 챙기면 매력이 두 배가 돼요.",match:"😎 O형 성격 (통 크게 받아줘요) · 🌸 A형 성격 (부족한 디테일을 채워줘요)"},
  O:{n:"O형 성격",emoji:"🔥",color:"#e0392f",one:"대범 · 리더십 · 정 많은 두목",d:"어딜 가든 자연스레 중심이 되는 타고난 리더. 통이 크고 정이 많아 사람을 잘 챙기고, 목표가 생기면 저돌적으로 밀어붙여요. 사소한 건 대충 넘겨도 큰 그림은 정확하게 보죠. 승부욕이 강하지만 뒤끝은 없는 화끈한 스타일이에요.",pro:"추진력과 리더십이 강해 무리를 든든하게 이끌어요. 정이 많고 화끈해서 사람들이 잘 따르죠.",con:"가끔 밀어붙이는 힘이 세서 주변이 숨찰 수 있어요. 남의 속도도 살펴주면 완벽해요.",match:"🌸 A형 성격 (세심하게 뒷받침해줘요) · 🎈 B형 성격 (같이 신나게 질러요)"},
  C:{n:"AB형 성격",emoji:"🌀",color:"#8a4fd6",one:"천재 · 4차원 · 반전 매력",d:"논리와 감성을 오가는 종잡을 수 없는 반전 캐릭터. 냉철하다가도 갑자기 엉뚱하고, 남들이 못 보는 각도로 세상을 봐요. 혼자만의 시간을 사랑하지만 필요할 땐 누구보다 사교적이죠. 알수록 새로운 면이 나오는, 질리지 않는 사람이에요.",pro:"독창적이고 아이디어가 반짝여 남다른 관점을 내놔요. 상황에 맞춰 유연하게 변신하는 재주가 있어요.",con:"속을 잘 안 보여줘 신비주의처럼 보일 때가 있어요. 가끔은 마음을 슬쩍 열어 보여도 좋아요.",match:"🌸 A형 성격 (안정감을 더해줘요) · 🎈 B형 성격 (같은 자유로움을 나눠요)"}
};
var ORDER=['A','B','O','C'];
var Q=[
 ["여행 계획을 세울 때 나는?",[["분 단위 일정표를 완성해둠","A"],["일단 떠나고 즉흥으로","B"],["큰 동선만 잡고 밀어붙임","O"],["관심 가는 것만 골라 나만의 코스","C"]]],
 ["단체 모임에서 내 자리는?",[["구석에서 조용히 챙기는 역할","A"],["분위기 띄우는 자유로운 텐션","B"],["자연스럽게 분위기를 주도","O"],["관찰하다 한마디로 좌중 정리","C"]]],
 ["갑자기 계획이 틀어지면?",[["머릿속이 복잡해져 대비책 고민","A"],["오히려 잘됐네, 다른 거 하지 뭐","B"],["바로 새 판을 짠다","O"],["흥미로운데? 하고 관찰한다","C"]]],
 ["방 청소 스타일은?",[["구역 나눠 각 잡고 정리","A"],["기분 내킬 때 몰아서","B"],["손님 오기 전 후딱 밀어버림","O"],["나만 아는 규칙으로 배치","C"]]],
 ["친구가 고민을 털어놓으면?",[["진지하게 같이 걱정해줌","A"],["'그냥 질러!' 시원한 조언","B"],["해결책부터 딱 제시","O"],["의외의 관점을 훅 던짐","C"]]],
 ["새로운 일에 도전할 때?",[["철저히 알아보고 신중하게","A"],["재밌겠다! 일단 시작","B"],["목표 정하고 돌진","O"],["나만의 방식으로 실험","C"]]],
 ["나를 표현하는 한 단어는?",[["섬세","A"],["자유","B"],["대범","O"],["4차원","C"]]],
 ["카톡 답장 스타일은?",[["오타 없이 꼼꼼하게","A"],["기분 따라 들쭉날쭉","B"],["핵심만 시원하게","O"],["가끔 심오한 한 줄","C"]]],
 ["스트레스를 받으면 나는?",[["혼자 곱씹으며 정리","A"],["훌쩍 나가서 발산","B"],["운동·활동으로 화끈하게","O"],["나만의 세계로 잠수","C"]]],
 ["연애할 때 나는?",[["세심하게 하나하나 챙김","A"],["감정 표현이 솔직하고 화끈","B"],["듬직하게 리드","O"],["밀당인 듯 아닌 듯 종잡을 수 없음","C"]]],
 ["돈을 쓸 때 나는?",[["가계부 쓰며 계획 소비","A"],["꽂히면 바로 지르는 편","B"],["쓸 땐 통 크게","O"],["남들 안 사는 독특한 데 투자","C"]]],
 ["친구들이 말하는 나는?",[["믿음직한 꼼꼼이","A"],["못 말리는 자유인","B"],["의리 있는 대장","O"],["알다가도 모를 천재","C"]]]
];
var sums={A:0,B:0,O:0,C:0}, i=0;
function show(){
 var q=Q[i];
 $('bt-qn').textContent=(i+1)+' / '+Q.length;
 $('bt-q').textContent=q[0];
 $('bt-bar').style.width=(i/Q.length*100)+'%';
 var box=$('bt-opts');box.innerHTML='';
 q[1].forEach(function(o){
  var b=document.createElement('button');
  b.textContent=o[0];
  b.style.cssText='padding:14px 16px;border:1.5px solid #f5cabf;border-radius:12px;background:#fff;color:#2b2b2b;font-size:16px;text-align:left;cursor:pointer;line-height:1.4;';
  b.onmouseover=function(){b.style.background='#fff3f0';};
  b.onmouseout=function(){b.style.background='#fff';};
  b.onclick=function(){sums[o[1]]++;i++;if(i<Q.length)show();else result();};
  box.appendChild(b);
 });
}
function top(){var best='A',mx=-1;ORDER.forEach(function(k){if(sums[k]>mx){mx=sums[k];best=k;}});return best;}
function render(key,shared){
 var t=TYPE[key];
 var html='<div style="text-align:center;padding:24px 16px;border-radius:16px;background:linear-gradient(160deg,'+t.color+'26,'+t.color+'08);">'
  +'<div style="font-size:64px;">'+t.emoji+'</div>'
  +'<div style="font-size:13px;color:'+t.color+';font-weight:700;margin-top:4px;">내 성격에 가장 가까운 혈액형은</div>'
  +'<div style="font-size:27px;font-weight:800;margin:2px 0 0;color:'+t.color+';">'+t.n+'</div>'
  +'<div style="display:inline-block;margin-top:10px;padding:5px 14px;border-radius:20px;background:'+t.color+';color:#fff;font-size:13px;font-weight:700;">'+t.one+'</div></div>'
  +'<div style="line-height:1.75;margin:18px 4px;font-size:15px;color:#2b2b2b;">'+t.d+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f4fbef;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>👍 이런 게 강점</b><br>'+t.pro+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#fff7ed;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>⚠️ 조심할 점</b><br>'+t.con+'</div>'
  +'<div style="margin:14px 0;padding:14px;border-radius:12px;background:#f5f7fb;font-size:14px;line-height:1.7;color:#2b2b2b;"><b>🤝 잘 맞는 유형</b><br>'+t.match+'</div>';
 html+='<div style="display:flex;gap:10px;margin-top:20px;">'
  +(shared
    ?'<button onclick="location.href=location.pathname" style="flex:1;padding:14px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:800;font-size:16px;cursor:pointer;">내 혈액형 성격도 보기 →</button>'
    :'<button onclick="location.href=location.pathname" style="flex:1;padding:13px;border:2px solid '+t.color+';border-radius:10px;background:#fff;color:'+t.color+';font-weight:700;font-size:15px;cursor:pointer;">다시 하기</button>'
     +'<button id="bt-share" style="flex:1;padding:13px;border:0;border-radius:10px;background:'+t.color+';color:#fff;font-weight:800;font-size:15px;cursor:pointer;">결과 공유하기</button>')
  +'</div>'
  +'<div style="margin-top:16px;padding:14px;border-radius:10px;background:#fff1f0;font-size:14px;color:#2b2b2b;">다른 테스트도 → <a href="/tests/">심리테스트</a> · <a href="/tests/kakao-reply/">카톡 답장</a> · <a href="/tests/aura-color/">아우라 컬러</a></div>'
  +'<div style="margin-top:12px;font-size:12px;color:#9ca3af;line-height:1.6;">※ 혈액형 성격설은 과학적 근거가 없는 속설이며, 재미로 보는 콘텐츠예요. 답변은 저장·전송되지 않고 브라우저에서만 처리돼요.</div>';
 $('bt-result').innerHTML=html;
 $('bt-result').style.display='block';
 if(!shared){var sb=$('bt-share');if(sb)sb.onclick=function(){
  var url=location.origin+location.pathname+'?r='+key;
  var txt='내 성격은 '+t.emoji+' '+t.n+'에 가까웠어요! 너는 무슨 형? 👉 '+url;
  if(navigator.share){navigator.share({text:txt});}else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
 };}
 window.scrollTo({top:$('bt').offsetTop-20,behavior:'smooth'});
}
function result(){$('bt-quiz').style.display='none';render(top(),false);}
$('bt-start').onclick=function(){$('bt-intro').style.display='none';$('bt-quiz').style.display='block';show();};
(function(){var m=location.search.match(/[?&]r=([ABOC])/);if(m){$('bt-intro').style.display='none';render(m[1],true);}})();
})();
</script>

## 혈액형 성격 테스트에 대하여

한국에서 A형은 꼼꼼하고 신중, B형은 자유롭고 마이웨이, O형은 대범하고 리더십, AB형은 천재적이고 4차원이라는 **혈액형 성격 속설**은 오래전부터 재미있는 이야깃거리였어요. 이 테스트는 진짜 혈액형을 입력하는 게 아니라, 12개의 성격·상황 질문에 답하면 내 성격이 **A형·B형·O형·AB형** 네 가지 혈액형 스타일 중 어디에 가장 가까운지 찾아드려요.

각 선택마다 유형별 점수가 쌓이고, 가장 높은 유형이 내 혈액형 성격이 됩니다. 실제 내 혈액형과 다르게 나올 수도 있는데, 오히려 그게 이 테스트의 재미 포인트예요. 결과에는 유형 설명, 강점, 조심할 점, 잘 맞는 유형이 함께 나오고 친구에게 바로 공유할 수 있어요. 다만 혈액형이 성격을 결정한다는 주장은 과학적으로 입증된 바가 없는 속설이니, 어디까지나 재미와 대화거리로 즐겨 주세요. 답변은 저장·전송되지 않고 브라우저 안에서만 계산됩니다.
</content>
</invoke>
