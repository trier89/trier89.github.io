---
title: "환율 계산기 — 달러·엔·유로 원화 환산 (실시간)"
description: "달러·엔·유로·위안·파운드를 원화로, 원화를 외화로 바로 환산합니다. 실시간 환율을 불러와 계산하는 무료 환율 계산기·달러 계산기."
date: 2026-08-13
slug: "exchange"
categories: ["도구"]
tags: ["환율 계산기", "달러 계산기", "실시간 환율", "달러 환율", "엔화 계산기"]
toc: false
readingTime: false
---

달러·엔·유로·위안·파운드를 **원화로**, 반대로 **원화를 외화로** 바로 환산합니다. 페이지를 열면 **실시간 환율**을 자동으로 불러와 계산해요. (엔화는 100엔 기준으로 표시)

<div class="pf-tool" style="max-width:520px;margin:0 auto;">
  <label style="display:block;"><span style="display:block;font-weight:700;margin-bottom:6px;">통화 선택</span>
    <select id="ex-cur" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;">
      <option value="USD">🇺🇸 미국 달러 (USD)</option>
      <option value="JPY">🇯🇵 일본 엔 (JPY, 100엔 기준)</option>
      <option value="EUR">🇪🇺 유로 (EUR)</option>
      <option value="CNY">🇨🇳 중국 위안 (CNY)</option>
      <option value="GBP">🇬🇧 영국 파운드 (GBP)</option>
    </select>
  </label>
  <div style="margin-top:14px;">
    <span id="ex-fromlab" style="display:block;font-weight:700;margin-bottom:6px;">달러 (USD)</span>
    <input type="tel" id="ex-amt" inputmode="decimal" value="100" placeholder="금액 입력" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  </div>
  <div style="text-align:center;margin:12px 0;">
    <button id="ex-swap" style="padding:9px 16px;border:2px solid #059669;border-radius:10px;background:#ecfdf5;color:#047857;font-size:14px;font-weight:700;cursor:pointer;">⇅ 방향 바꾸기</button>
  </div>
  <div style="text-align:center;padding:18px;border-radius:12px;background:#ecfdf5;">
    <div id="ex-tolab" style="font-size:14px;color:#555;">원화 (KRW)</div>
    <div id="ex-out" style="font-size:34px;font-weight:800;color:#047857;line-height:1.2;">–</div>
  </div>
  <div id="ex-base" style="font-size:12.5px;color:#6b7280;margin-top:10px;text-align:center;">환율을 불러오는 중…</div>
  <div style="font-size:12px;color:#9ca3af;margin-top:8px;">※ 은행·카드사 실제 환전에는 스프레드·수수료가 붙어 이 값과 달라요. 매매기준율 기준 참고용입니다.</div>
</div>
<style>#ex-swap:hover{background:#d1fae5;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var CUR={USD:{ko:'달러',per:1},JPY:{ko:'엔',per:100},EUR:{ko:'유로',per:1},CNY:{ko:'위안',per:1},GBP:{ko:'파운드',per:1}};
// KRW per 1 unit — 하드코딩 폴백(참고값). 실시간 fetch 성공 시 덮어씀
var RATE={USD:1400,JPY:9,EUR:1500,CNY:195,GBP:1750};
var RDATE='', LIVE=false, dir='fx2krw';
function fmtWon(n){return Math.round(n).toLocaleString()+'원';}
function fmtFx(n){return n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function relabel(){
  var fx=$('ex-cur').value, ko=CUR[fx].ko;
  if(dir==='fx2krw'){$('ex-fromlab').textContent=ko+' ('+fx+')';$('ex-tolab').textContent='원화 (KRW)';}
  else{$('ex-fromlab').textContent='원화 (KRW)';$('ex-tolab').textContent=ko+' ('+fx+')';}
}
function baseNote(){
  var fx=$('ex-cur').value, rate=RATE[fx], per=CUR[fx].per;
  var head=per===100?('100 '+fx+' = '+fmtWon(rate*100)):('1 '+fx+' = '+fmtWon(rate));
  if(LIVE){$('ex-base').textContent='기준 환율: '+head+' ('+RDATE+' 기준)';}
  else{$('ex-base').textContent='기준 환율: '+head+' · 환율을 못 불러와 참고값을 씁니다';}
}
function calc(){
  var fx=$('ex-cur').value, rate=RATE[fx];
  var amt=parseFloat(($('ex-amt').value||'').replace(/[^0-9.]/g,''));
  if(isNaN(amt)){$('ex-out').textContent='–';return;}
  if(dir==='fx2krw'){$('ex-out').textContent=fmtWon(amt*rate);}
  else{$('ex-out').textContent=fmtFx(amt/rate)+' '+fx;}
}
function refresh(){relabel();baseNote();calc();}
$('ex-cur').onchange=refresh;
$('ex-amt').oninput=calc;
$('ex-swap').onclick=function(){dir=(dir==='fx2krw')?'krw2fx':'fx2krw';refresh();};
refresh();
fetch('https://api.frankfurter.app/latest?from=USD&to=KRW,JPY,EUR,CNY,GBP').then(function(r){return r.json();}).then(function(d){
  var kr=d.rates.KRW;
  if(!kr){throw new Error('no krw');}
  RATE={USD:kr,JPY:kr/d.rates.JPY,EUR:kr/d.rates.EUR,CNY:kr/d.rates.CNY,GBP:kr/d.rates.GBP};
  RDATE=d.date;LIVE=true;baseNote();calc();
}).catch(function(){LIVE=false;baseNote();calc();});
})();
</script>

## 환율, 이렇게 봐요

뉴스에 나오는 "원·달러 환율 1,400원" 같은 숫자는 보통 **매매기준율**이에요. 은행끼리 거래하는 도매 가격에 가까운 기준값으로, 이 계산기도 이 기준율을 사용해요. 그런데 실제로 은행에서 돈을 바꾸면 이 값 그대로 적용되지 않아요.

- **매매기준율**: 그날의 기준이 되는 환율이에요. 뉴스·포털에서 보는 숫자가 대개 이 값이에요.
- **현찰 살 때**: 내가 원화를 주고 달러 지폐를 받을 때 적용돼요. 기준율보다 **높게** 매겨져요.
- **현찰 팔 때**: 내가 가진 달러 지폐를 원화로 바꿀 때 적용돼요. 기준율보다 **낮게** 매겨져요.
- **스프레드**: 현찰 살 때와 팔 때의 차이예요. 이 폭만큼이 사실상 환전 비용이라, 스프레드가 좁을수록 유리해요.

즉 **살 때는 조금 비싸게, 팔 때는 조금 싸게** 적용되는 구조라, 실제 환전 금액은 이 계산기 결과보다 불리하게 나오는 게 정상이에요. 정확한 적용 환율과 우대율은 거래하는 은행·앱에서 그때그때 확인하세요.

## 이 계산기의 환율은 어디서 오나요

페이지를 열면 유럽중앙은행(ECB) 기준 공개 환율 데이터를 실시간으로 불러와 계산해요. 달러는 원화 환율을 직접, 나머지 통화(엔·유로·위안·파운드)는 달러를 거쳐 원화로 교차 환산해요. 혹시 네트워크 문제로 환율을 못 불러오면 미리 넣어둔 **참고값**으로 계산하고, 그 사실을 화면에 표시해요. 참고값은 대략적인 어림값이라, 이때는 실제 거래 판단에 쓰지 말고 감을 잡는 용도로만 보세요.

## 자주 묻는 질문

**Q. 은행에서 바꾸면 왜 계산기보다 더 비싼가요?**
이 계산기는 매매기준율로 계산하는데, 실제 환전에는 은행의 스프레드(살 때·팔 때 차이)와 수수료가 더해지기 때문이에요. 그래서 현찰로 살 때는 기준율보다 조금 더 내는 게 일반적이에요. 환전 우대율을 받으면 이 차이를 줄일 수 있어요.

**Q. 엔화는 왜 100엔 기준으로 보나요?**
엔은 1엔의 원화 가치가 작아서, 관례적으로 **100엔 = 몇 원** 형태로 표시해요. 뉴스도 "100엔당 900원"처럼 말하죠. 이 계산기도 기준 환율은 100엔 기준으로 보여주되, 금액 계산은 입력한 엔 금액 그대로 정확히 환산해요.

**Q. 카드 해외결제 환율은 이 값과 같나요?**
아니에요. 해외 카드 결제는 결제일이 아니라 매입일(며칠 뒤) 환율이 적용되고, 국제 브랜드 수수료(비자·마스터 등)와 해외이용 수수료가 별도로 붙어요. 그래서 최종 청구액은 이 계산기 값과 차이가 날 수 있어요.

**Q. 실시간이라는데 얼마나 자주 바뀌나요?**
불러오는 공개 데이터는 영업일 기준으로 갱신돼요. 화면의 "기준 환율" 옆 날짜가 데이터 기준일이니, 그 날짜를 확인하면 돼요. 주말·공휴일에는 직전 영업일 값이 유지될 수 있어요.

**Q. 환전 수수료를 아끼려면요?**
주거래은행 환전 우대, 환전 전용 앱·트래블 카드의 무료 환전 구간 등을 활용하면 스프레드 부담을 줄일 수 있어요. 큰 금액일수록 우대율 차이가 크게 벌어지니, 계산기로 대략의 금액을 잡은 뒤 실제 우대 조건을 비교해 보세요.

해외 수입·급여를 원화로 가늠할 땐 [연봉 실수령액 계산기](/tools/salary-calculator/)를, 외화 배당을 원화로 환산할 땐 [배당금 계산기](/tools/dividend/)를 함께 써보세요.
</content>
</invoke>
