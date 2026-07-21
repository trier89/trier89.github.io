---
title: "연말정산 계산기 — 예상 환급금·결정세액 간편 계산 (2026)"
description: "연봉과 주요 공제(부양가족·신용카드·의료비·보험료·연금저축 등)를 입력하면 예상 결정세액과 환급/추가납부액을 간편하게 계산해요."
date: 2026-07-21
slug: "year-end-tax"
categories: ["도구"]
tags: ["연말정산 계산기", "연말정산 환급금", "결정세액", "소득공제", "세액공제"]
toc: false
readingTime: false
---

연봉과 주요 공제 항목을 입력하면 **예상 결정세액**과 **환급/추가납부 예상액**을 간편하게 계산해요. (국세청 2026년 세율·공제 기준 — 간이 계산이라 실제와 차이가 날 수 있어요)

<div class="pf-tool" style="max-width:560px;margin:0 auto;">
  <label style="display:block;font-weight:700;margin-bottom:6px;">총급여 (연봉, 만원)</label>
  <input type="tel" id="yt-salary" inputmode="numeric" placeholder="예: 5000" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;">
  <div style="display:flex;gap:10px;margin-top:12px;">
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">부양가족 (본인 포함)</span><input type="tel" id="yt-fam" inputmode="numeric" value="1" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-weight:700;margin-bottom:6px;">20세 이하 자녀</span><input type="tel" id="yt-child" inputmode="numeric" value="0" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  </div>
  <div style="margin-top:14px;font-weight:700;color:#059669;">💳 소득공제 (연간 사용액, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;">
    <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">신용카드</span><input type="tel" id="yt-card" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">체크카드·현금</span><input type="tel" id="yt-cash" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <div style="margin-top:14px;font-weight:700;color:#2563eb;">🧾 세액공제 (연간 납입액, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">연금저축·IRP</span><input type="tel" id="yt-pension" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">보장성 보험료</span><input type="tel" id="yt-ins" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">의료비</span><input type="tel" id="yt-med" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">기부금</span><input type="tel" id="yt-donate" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">월세액 (연간)</span><input type="tel" id="yt-rent" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">고향사랑기부금</span><input type="tel" id="yt-hometown" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <div style="margin-top:14px;font-weight:700;color:#7c3aed;">🏠 추가 소득공제 (연간, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">장기주택저당 이자상환</span><input type="tel" id="yt-mortgage" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">문화비·헬스장 <span style="color:#999;">(총급여 7천↓)</span></span><input type="tel" id="yt-culture" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <button id="yt-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="yt-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;" id="yt-card2">
      <div id="yt-big-label" style="font-size:15px;color:#555;"></div>
      <div id="yt-big" style="font-size:36px;font-weight:800;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="yt-rows"></tbody></table>
    <div id="yt-tips" style="margin-top:16px;"></div>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ 간이 계산이에요. 신용카드 공제·의료비 문턱(총급여 3%)·표준세액공제 등 세부 규정으로 실제와 차이가 납니다. 정확한 금액은 국세청 홈택스 연말정산 미리보기에서 확인하세요.</div>
    <button id="yt-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#059669;color:#fff;font-weight:700;cursor:pointer;">📤 공유하기</button>
  </div>
</div>
<style>#yt-rows td{padding:8px 6px;border-bottom:1px solid #eee;}#yt-rows td:last-child{text-align:right;font-weight:700;}#yt-rows tr.hl td{color:#047857;border-top:2px solid #059669;}</style>
<script>
(function(){
var $=function(id){return document.getElementById(id);};
var v=function(id){return (parseFloat($(id).value)||0)*10000;}; // 만원→원
function earnDed(g){return g<=5000000?g*0.7:g<=15000000?3500000+(g-5000000)*0.4:g<=45000000?7500000+(g-15000000)*0.15:g<=100000000?12000000+(g-45000000)*0.05:14750000+(g-100000000)*0.02;}
function tax(base){base=Math.max(base,0);
  // 2026 종합소득세 누진공제(국세청): 6/15/24/35/38/40/42/45%
  if(base<=14000000)return base*0.06;
  if(base<=50000000)return base*0.15-1260000;
  if(base<=88000000)return base*0.24-5760000;
  if(base<=150000000)return base*0.35-15440000;
  if(base<=300000000)return base*0.38-19940000;
  if(base<=500000000)return base*0.40-25940000;
  if(base<=1000000000)return base*0.42-35940000;
  return base*0.45-65940000;}
function won(w){if(w>=100000000){return (w/100000000).toFixed(2).replace(/\.?0+$/,'')+'억원';}return Math.round(w).toLocaleString()+'원';}
$('yt-go').onclick=function(){
  var g=v('yt-salary');
  if(!g){alert('총급여(연봉, 만원)를 입력해 주세요');return;}
  var fam=Math.max(parseInt($('yt-fam').value)||1,1), child=parseInt($('yt-child').value)||0;
  // 소득공제
  var perDed=1500000*fam;                 // 인적공제 150만/인
  // 신용카드: 총급여 25% 초과분의 15%(신용)·30%(체크현금), 한도 단순 300만
  var thr=g*0.25;
  var cardUse=v('yt-card'), cashUse=v('yt-cash');
  var over=Math.max(cardUse+cashUse-thr,0);
  var cardCap=g<=70000000?3000000:(g<=120000000?2500000:2000000); // 총급여별 카드공제 한도
  var cardDed=0, cardFull=0;
  if(over>0){var cashPart=Math.min(cashUse,over);var cardPart=over-cashPart;cardFull=cardPart*0.15+cashPart*0.30;cardDed=Math.min(cardFull,cardCap);}
  // 과세표준
  var mortgage=Math.min(v('yt-mortgage'),18000000);   // 장기주택저당 이자 소득공제(한도 근사 1,800만)
  var culture=g<=70000000?v('yt-culture')*0.30:0;      // 문화비·체육시설 30% 소득공제(총급여 7천 이하만)
  var base=g-earnDed(g)-perDed-cardDed-mortgage-culture;
  var calcTax=tax(base);                   // 산출세액
  // 세액공제
  var pension=Math.min(v('yt-pension'),9000000); // 연금저축+IRP 한도 900만 근사
  var pensionCr=pension*(g<=55000000?0.165:0.132);
  var ins=Math.min(v('yt-ins'),1000000);
  var insCr=ins*0.12;
  var med=v('yt-med'); var medBase=Math.max(med-g*0.03,0); var medCr=medBase*0.15;
  var donate=v('yt-donate'); var donCr=Math.min(donate,g*0.3)*0.15;
  // 자녀세액공제(국세청 2024 개정): 1명 15만, 2명 35만, 3명↑ 35만+30만/인
  var childCr=child<=0?0:child===1?150000:child===2?350000:350000+(child-2)*300000;
  // 월세 세액공제: 총급여 5,500만↓ 17%, 7,000만↓ 15%, 한도 1,000만
  var rent=Math.min(v('yt-rent'),10000000);
  var rentCr=g<=55000000?rent*0.17:(g<=70000000?rent*0.15:0);
  // 고향사랑기부: 10만원 이하 전액, 초과분 15%(상한 500만)
  var home=Math.min(v('yt-hometown'),5000000);
  var homeCr=Math.min(home,100000)+Math.max(home-100000,0)*0.15;
  var credits=pensionCr+insCr+medCr+donCr+childCr+rentCr+homeCr;
  var stdCredit=130000;                    // 표준세액공제(특별공제 없을때) 근사
  var appliedCredit=Math.max(credits,stdCredit);
  var decided=Math.max(calcTax-appliedCredit,0);      // 결정세액
  // 기납부(원천징수) 근사 = 공제 없이 기본만 반영한 세액 ≈ 간이세액 연환산
  var basePrepaid=Math.max(tax(g-earnDed(g)-1500000)-stdCredit,0);
  var refund=basePrepaid-decided;
  $('yt-big-label').textContent=refund>=0?'예상 환급액':'예상 추가납부';
  $('yt-big').textContent=won(Math.abs(refund));
  $('yt-big').style.color=refund>=0?'#047857':'#dc2626';
  $('yt-card2').style.background=refund>=0?'#ecfdf5':'#fef2f2';
  $('yt-rows').innerHTML=
    '<tr><td style="color:#555;">근로소득공제</td><td>-'+won(earnDed(g))+'</td></tr>'
    +'<tr><td style="color:#555;">인적공제 ('+fam+'명)</td><td>-'+won(perDed)+'</td></tr>'
    +(cardDed>0?'<tr><td style="color:#555;">신용/체크카드 공제'+(cardFull>=cardCap?' (한도도달)':'')+'</td><td>-'+won(cardDed)+'</td></tr>':'')
    +(mortgage>0?'<tr><td style="color:#555;">장기주택저당 이자</td><td>-'+won(mortgage)+'</td></tr>':'')
    +(culture>0?'<tr><td style="color:#555;">문화비·체육시설 공제</td><td>-'+won(culture)+'</td></tr>':'')
    +'<tr><td style="color:#555;">과세표준</td><td>'+won(base)+'</td></tr>'
    +'<tr><td style="color:#555;">산출세액</td><td>'+won(calcTax)+'</td></tr>'
    +'<tr><td style="color:#555;">세액공제 합계</td><td>-'+won(appliedCredit)+'</td></tr>'
    +'<tr class="hl"><td>결정세액</td><td>'+won(decided)+'</td></tr>';
  // ── 맞춤 절세 팁 (입력값 기반) ──
  var tips=[];
  // 세액공제 vs 소득공제 우선순위
  var myRate=base<=14000000?6:base<=50000000?15:base<=88000000?24:base<=150000000?35:38;
  tips.push('💡 <b>세액공제가 소득공제보다 유리</b>해요. 소득공제는 내 세율('+myRate+'%)만큼만 줄지만, 세액공제(연금저축·월세 등)는 낸 세금에서 직접 깎여요. 여윳돈은 세액공제 항목부터 채우세요.');
  // 연금저축 한도 여유
  if(pension<9000000){var room=(9000000-pension)/10000;var rate2=g<=55000000?16.5:13.2;
    tips.push('🏦 <b>연금저축·IRP 한도가 '+Math.round(room).toLocaleString()+'만원 남았어요.</b> 여기 더 넣으면 '+rate2+'% ('+Math.round(room*rate2/100).toLocaleString()+'만원)를 돌려받아요. 절세율 최고 항목이에요.');}
  // 신용카드 최적화
  if(cardUse+cashUse<thr){var need=(thr-(cardUse+cashUse))/10000;
    tips.push('💳 카드 사용액이 아직 <b>총급여의 25%('+Math.round(thr/10000).toLocaleString()+'만원)에 '+Math.round(need).toLocaleString()+'만원 부족</b>해요. 여기 넘어야 카드 공제가 시작돼요.');}
  else if(cardFull>=cardCap){
    tips.push('💳 카드 공제가 <b>이미 한도('+Math.round(cardCap/10000)+'만원)에 도달</b>했어요. 이 이상은 체크카드로 써도 소득공제가 안 늘어나니, <b>혜택 좋은 신용카드를 써도 똑같아요.</b>');}
  else if(cashUse<over){
    tips.push('💳 25%는 넘겼고 한도는 남았어요. 이 구간에선 <b>체크카드·현금영수증이 공제율 2배(30%)</b>라 유리해요. 앞으로 지출은 체크카드로!');}
  // 의료비 문턱
  if(med>0&&med<=g*0.03){
    tips.push('🏥 의료비는 <b>총급여의 3%('+Math.round(g*0.03/10000).toLocaleString()+'만원)를 넘는 금액만</b> 공제돼요. 지금은 문턱 미달이라 공제가 0이에요.');}
  // 월세 자격 리마인더
  if(rent>0){tips.push('🏠 월세 세액공제는 <b>무주택 세대주(총급여 8천만↓·기준시가 4억↓ 주택)</b> 조건이에요. 자격 확인하세요.');}
  // 고향사랑 꿀팁
  if(home===0){tips.push('🎁 <b>고향사랑기부 10만원</b>은 전액 세액공제 + 답례품(3만원 상당)까지 받아요. 사실상 이득이라 안 하면 손해!');}
  $('yt-tips').innerHTML='<div style="font-weight:700;color:#b45309;margin-bottom:8px;">🎯 나를 위한 절세 팁</div>'+tips.map(function(x){return '<div style="padding:10px 12px;background:#fffbeb;border-radius:8px;margin-bottom:6px;font-size:14px;line-height:1.6;">'+x+'</div>';}).join('');
  $('yt-out').style.display='block';
  $('yt-share').onclick=function(){var t=(refund>=0?'연말정산 예상 환급 '+won(Math.abs(refund)):'연말정산 추가납부 '+won(Math.abs(refund)))+'! 나도 계산 👉 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
};
})();
</script>

## 연말정산, 간단히 이해하기

연말정산은 1년 동안 미리 낸 세금(원천징수)과 실제로 내야 할 세금(결정세액)을 비교해, 더 냈으면 **환급**받고 덜 냈으면 **추가납부**하는 절차예요.

- **소득공제**(과세표준을 줄임): 인적공제, 신용카드·체크카드 사용액, 주택자금 등
- **세액공제**(세금을 직접 깎음): 연금저축·IRP, 보장성 보험료, 의료비, 기부금, 자녀세액공제 등

### 환급을 늘리려면?

- **연금저축·IRP**가 세액공제율이 높아요(13.2~16.5%). 노후 준비 + 절세 두 마리 토끼.
- **체크카드·현금영수증**은 신용카드보다 공제율이 2배(30%). 총급여 25% 넘게 쓰는 구간부터는 체크카드가 유리.
- **의료비**는 총급여 3%를 넘는 금액만 공제돼요.
- **월세 세액공제**: 무주택 세대주(총급여 8천만↓·기준시가 4억↓ 주택)면 연 월세액의 15~17%를 세금에서 깎아줘요 (한도 1,000만원).
- **고향사랑기부금**: 10만원까지는 전액 세액공제(사실상 낸 만큼 돌려받음)+답례품, 초과분은 15%.
- **문화비·헬스장**: 총급여 7,000만원 이하면 도서·공연·영화·헬스장·수영장 결제액에 30% 소득공제 (신용카드 공제에 추가).

> 이 계산기는 주요 항목만 반영한 **간이 추정**이에요. 실제 연말정산은 훨씬 많은 규정이 적용되니, 정확한 금액은 [국세청 홈택스 연말정산 미리보기](https://www.hometax.go.kr)에서 확인하세요.
