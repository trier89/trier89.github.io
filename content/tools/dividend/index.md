---
title: "배당금 계산기 — 월 배당 목표로 필요 원금·월 적립액 (노후·파이어족)"
description: "원하는 월 배당액을 입력하면 필요한 투자 원금과, 목표 기간 동안 매달 얼마씩 모아야 하는지 계산해요. 고배당주·배당ETF 예시 참고."
date: 2026-07-21
slug: "dividend"
categories: ["도구"]
tags: ["배당금 계산기", "배당 계산기", "월 배당", "노후 준비", "파이어족", "고배당주"]
toc: false
readingTime: false
---

원하는 **월 배당액**을 입력하면 필요한 **투자 원금**과, 목표 기간 동안 **매달 얼마씩** 모아야 하는지 계산해요. 노후·파이어(FIRE) 준비 설계에 참고하세요.

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;font-weight:700;margin-bottom:6px;">목표: 월 배당액 (만원)</label>
  <input type="tel" id="dv-target" inputmode="numeric" placeholder="예: 100 (월 100만원)" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  <div style="display:flex;gap:10px;margin-top:12px;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">배당수익률 (연 %)</span>
      <select id="dv-yield" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;background:#fff;">
        <option value="3">3% (안정 배당ETF)</option>
        <option value="4" selected>4% (일반 고배당)</option>
        <option value="5">5% (고배당주)</option>
        <option value="6">6% (초고배당·리츠)</option>
        <option value="8">8% (커버드콜 등)</option>
      </select></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">모으는 기간 (년)</span>
      <input type="tel" id="dv-years" inputmode="numeric" placeholder="20" value="20" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <label style="display:block;font-weight:700;margin:12px 0 6px;">예상 연 주가 상승률 (%) <span style="font-weight:400;color:#6b7280;font-size:13px;">— 배당과 별도, 모으는 동안 복리</span></label>
  <select id="dv-growth" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;background:#fff;">
    <option value="0">0% (상승 없다고 보수적으로)</option>
    <option value="3">3% (안정적)</option>
    <option value="5" selected>5% (장기 평균 근사)</option>
    <option value="7">7% (성장 기대)</option>
    <option value="10">10% (공격적)</option>
  </select>
  <div style="margin-top:8px;font-size:13px;color:#6b7280;">이미 모은 돈이 있다면 (만원, 선택) <input type="tel" id="dv-have" inputmode="numeric" placeholder="0" style="width:90px;padding:5px 8px;border:1px solid #ccc;border-radius:6px;"></div>
  <button id="dv-go" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="dv-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;background:#ecfdf5;">
      <div style="font-size:14px;color:#555;">내가 실제로 넣는 총 투입 원금</div>
      <div id="dv-principal" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;"></div>
      <div id="dv-monthly" style="font-size:16px;color:#065f46;font-weight:700;margin-top:6px;"></div>
      <div id="dv-asset" style="font-size:14px;color:#065f46;margin-top:8px;padding-top:8px;border-top:1px dashed #a7f3d0;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="dv-rows"></tbody></table>
    <div style="margin-top:16px;font-weight:700;color:#047857;">📋 고배당 예시 (참고용)</div>
    <table style="width:100%;margin-top:6px;font-size:14px;border-collapse:collapse;"><tbody id="dv-list"></tbody></table>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 예시일 뿐이며 투자 권유가 아닙니다. 실제 배당률·주가는 수시로 바뀌니 증권사에서 확인하세요.</div>
    <button id="dv-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">📤 내 노후설계 공유</button>
  </div>
</div>
<style>#dv-rows td{padding:9px 6px;border-bottom:1px solid #eee;}#dv-rows td:last-child{text-align:right;font-weight:700;}#dv-list td{padding:7px 6px;border-bottom:1px solid #f0f0f0;}#dv-list td:last-child{text-align:right;font-weight:700;color:#047857;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
// 고배당 예시(참고용·고정) — 대표 유형별. 실시간 아님.
var LIST=[['배당ETF (S&P500 배당귀족류)','약 2~3%'],['국내 고배당주 (통신·금융·정유)','약 4~6%'],['리츠(REITs)','약 5~7%'],['미국 배당성장주','약 2~4%'],['커버드콜 ETF','약 7~12%'],['월배당 ETF','약 4~8%']];
function won(man){ // 만원 단위 → 보기 좋은 문자열
  var w=man*10000;
  if(w>=100000000){var eok=Math.floor(w/100000000);var rest=Math.round((w%100000000)/10000);return eok+'억'+(rest?' '+rest.toLocaleString()+'만':'')+'원';}
  return Math.round(man).toLocaleString()+'만원';
}
$('dv-go').onclick=function(){
  var tgt=parseFloat($('dv-target').value); // 월 배당 만원
  var y=parseFloat($('dv-yield').value)/100;
  var years=parseFloat($('dv-years').value)||20;
  var have=parseFloat($('dv-have').value)||0; // 만원
  var g=parseFloat($('dv-growth').value)/100; // 연 주가상승률
  if(!tgt||tgt<=0){alert('원하는 월 배당액(만원)을 입력해 주세요');return;}
  var annualDiv=tgt*12; // 만원/년
  var principal=annualDiv/y; // 필요 원금(만원) — 목표 배당을 내려면 이만큼 필요
  // 모으는 동안 총수익률 = 배당 재투자 + 주가상승 (복리)
  var total=y+g;
  var r=total/12, n=years*12;
  var fvHave=have*Math.pow(1+r,n); // 기존 자금의 미래가치
  var remain=Math.max(principal-fvHave,0);
  var monthly = r>0 ? remain*r/(Math.pow(1+r,n)-1) : remain/n; // 적립식 미래가치 역산 (만원)
  var totalIn=monthly*n+have; // 실제 총 투입
  $('dv-principal').textContent=won(totalIn);
  $('dv-monthly').textContent=years+'년간 매달 '+won(Math.ceil(monthly))+' 씩'+(have>0?' (+시작자금 '+won(have)+')':'');
  $('dv-asset').innerHTML='💰 '+years+'년 뒤 주식 자산: <b>'+won(principal)+'</b> <span style="color:#059669;">(내 돈 '+won(totalIn)+' → 복리로 '+won(principal)+')</span><br>🔄 이 자산이 매달 '+won(tgt)+' 배당을 만들고, 배당은 모으는 동안 전액 재투자돼요';
  $('dv-rows').innerHTML=
    '<tr><td style="color:#555;">목표 월 배당</td><td>'+won(tgt)+'</td></tr>'
    +'<tr><td style="color:#555;">연 배당 (세전)</td><td>'+won(annualDiv)+'</td></tr>'
    +'<tr><td style="color:#555;">가정 배당수익률</td><td>연 '+($('dv-yield').value)+'%</td></tr>'
    +'<tr><td style="color:#555;">가정 주가상승률</td><td>연 '+($('dv-growth').value)+'% (모으는 동안)</td></tr>'
    +'<tr><td style="color:#555;">배당 재투자</td><td style="color:#047857;">✓ 전액 재투자(복리)</td></tr>'
    +'<tr><td style="color:#555;">모으는 동안 총수익률</td><td>연 '+((y+g)*100).toFixed(1)+'% <span style="color:#6b7280;font-weight:400;">(배당'+($('dv-yield').value)+'%+상승'+($('dv-growth').value)+'%)</span></td></tr>'
    +'<tr><td style="color:#555;">목표 자산 (배당 발생 원천)</td><td>'+won(principal)+'</td></tr>'
    +(have>0?'<tr><td style="color:#555;">현재 보유</td><td>'+won(have)+'</td></tr>':'')
    +'<tr><td style="color:#555;">매달 적립액 ('+years+'년)</td><td>'+won(Math.ceil(monthly))+'</td></tr>'
    +'<tr><td style="color:#555;">'+years+'년간 총 납입 원금</td><td>'+won(monthly*n+have)+'</td></tr>'
    +'<tr style="background:#ecfdf5;"><td style="color:#047857;font-weight:700;">'+years+'년 뒤 주식 자산가치</td><td style="color:#047857;">'+won(principal)+'</td></tr>'
    +'<tr><td style="color:#555;">└ 그중 순수익(복리)</td><td>+'+won(principal-(monthly*n+have))+'</td></tr>';
  $('dv-list').innerHTML=LIST.map(function(x){return '<tr><td style="color:#444;">'+x[0]+'</td><td>'+x[1]+'</td></tr>';}).join('');
  $('dv-out').style.display='block';
  $('dv-share').onclick=function(){
    var url=location.origin+location.pathname+'?t='+tgt+'&y='+$('dv-yield').value+'&g='+$('dv-growth').value+'&n='+years+(have>0?'&h='+have:'');
    var t='월 배당 '+won(tgt)+' 받으려면 원금 '+won(principal)+', '+years+'년간 매달 '+won(Math.ceil(monthly))+'! 내 노후설계 👉 '+url;
    if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('결과 링크가 복사됐어요! 저장·공유하세요.');});}};
};
// 공유 링크(?t=&y=&g=&n=&h=)로 들어오면 값 채우고 자동 계산 (결과 저장·재현)
(function(){
  var p=new URLSearchParams(location.search);
  if(p.get('t')){
    $('dv-target').value=p.get('t');
    if(p.get('y'))$('dv-yield').value=p.get('y');
    if(p.get('g'))$('dv-growth').value=p.get('g');
    if(p.get('n'))$('dv-years').value=p.get('n');
    if(p.get('h'))$('dv-have').value=p.get('h');
    $('dv-go').click();
  }
})();
})();
</script>

## 배당금 계산기, 이렇게 계산해요

- **필요 원금** = 목표 월 배당 × 12 ÷ 배당수익률. 예를 들어 월 100만원(연 1,200만원)을 연 4% 배당으로 받으려면 원금 **3억원**이 필요해요.
- 🔄 **배당 재투자**: 모으는 동안 받은 배당은 전액 다시 투자한다고 가정해요. 그래서 "모으는 동안 총수익률 = 배당률 + 주가상승률"로 복리 계산됩니다. (은퇴 후에는 배당을 생활비로 쓰는 구조)
- **N년 뒤 주식 자산가치** = 목표 원금에 도달한 그 자산이 곧 노후 자산이에요. 이 자산이 매달 목표 배당을 만들어내죠. 총 납입 원금과 복리 순수익도 함께 보여드려요.
- **월 적립액** = 목표 기간 동안 그 원금을 모으기 위해 매달 넣어야 하는 금액. **모으는 동안의 총수익률(배당 재투자 + 주가 상승)**을 복리로 반영해 계산해요. 주가 상승률을 높게 잡을수록 매달 넣어야 할 돈은 줄어듭니다.

### 꼭 알아두세요

- **배당수익률은 직접 골라 입력**하세요. 실제 종목·ETF의 배당률과 주가는 수시로 바뀝니다.
- 아래 예시 리스트는 **유형별 참고용**이며 특정 종목 매수를 권유하지 않습니다. 세금(배당소득세 15.4%)·환율·주가 변동은 반영되지 않은 단순 계산이에요.
- 실제 투자 결정 전에는 반드시 증권사·전문가와 상담하세요.

## 배당수익률, 어떻게 골라야 할까요

같은 목표 배당이라도 배당수익률을 몇 %로 잡느냐에 따라 필요 원금이 크게 달라져요. 위 계산기의 선택지처럼 **안정 배당ETF는 3% 안팎, 일반 고배당은 4%대, 고배당주·리츠는 5~6%대, 커버드콜류는 그 이상**으로 층이 나뉘어요. 여기서 중요한 건 "높은 수익률 = 무조건 좋다"가 아니라는 점이에요. 배당률이 유난히 높으면 주가가 그만큼 눌려 있거나 배당이 줄어들 위험이 함께 커지는 경우가 많아요. 그래서 목표 배당을 너무 높은 수익률에 기대어 잡으면, 원금 계산은 작아 보여도 실제로는 배당 삭감이나 주가 하락으로 목표가 흔들릴 수 있어요.

## 이렇게 활용해 보세요

- **적립 기간을 늘려보세요.** 같은 목표라도 모으는 기간이 길수록 복리가 일을 대신 해줘서 매달 넣어야 할 금액이 줄어들어요. 계산기에서 기간만 바꿔 비교해 보면 체감이 확 와요.
- **주가 상승률은 보수적으로.** 배당과 별도로 잡는 주가 상승률을 높게 넣으면 필요 적립액이 확 줄지만, 그건 어디까지나 가정이에요. 0%나 3%로도 한 번 돌려보고 "최소한 이만큼은 필요하구나"를 확인해 두면 마음이 편해요.
- **세금·물가는 별도예요.** 배당소득세(15.4%)나 물가 상승은 이 계산에 안 들어가 있어요. 실제 손에 쥐는 배당은 세후로 줄어드니 목표를 살짝 여유 있게 잡는 걸 추천해요.

## 자주 묻는 질문

**Q. 필요 원금은 어떻게 나오나요?**
목표 월 배당에 12를 곱해 연 배당을 구하고, 그걸 배당수익률로 나눈 값이에요. 계산 방식이 단순해서 수익률만 정하면 바로 나와요. 정확한 내 숫자는 위 계산기에 직접 넣어 확인하세요.

**Q. 배당은 세금을 얼마나 떼나요?**
국내 배당은 배당소득세 15.4%(소득세 14% + 지방세 1.4%)가 원천징수돼요. 계산기 결과는 세전 기준이니 실제 수령액은 이보다 줄어든다고 보면 돼요.

**Q. 지금 모은 돈이 없어도 계산되나요?**
네, '이미 모은 돈'은 선택 입력이라 0이어도 돼요. 시작 자금이 있으면 그만큼 매달 적립액이 줄어드니, 목돈이 생기면 다시 넣어 비교해 보세요.

**Q. 노후·은퇴 시점 계산도 같이 하고 싶어요.**
목표까지 몇 년 남았는지 함께 보려면 [만나이 계산기](/tools/age-calculator/)나 [디데이 계산기](/tools/dday/)로 남은 기간을 확인한 뒤, 그 연수를 이 계산기의 '모으는 기간'에 넣으면 설계가 한결 또렷해져요.
