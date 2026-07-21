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
  <label style="display:block;margin-top:14px;"><span style="display:block;font-weight:700;margin-bottom:6px;">원천징수세율 <span style="color:#999;font-weight:400;font-size:13px;">(회사에 신청한 비율)</span></span>
    <select id="yt-withhold" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;background:#fff;">
      <option value="100" selected>100% (기본 — 대부분 여기)</option>
      <option value="80">80% (매달 덜 떼고 연말에 덜 환급)</option>
      <option value="120">120% (매달 더 떼고 연말에 더 환급)</option>
    </select></label>
  <label style="display:block;margin-top:10px;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">이미 낸 세금 (기납부·원천징수 총액, 만원) <span style="color:#999;">— 급여명세서 있으면 입력, 없으면 자동추정</span></span>
    <input type="tel" id="yt-prepaid" inputmode="numeric" placeholder="비우면 원천징수세율로 자동 계산" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;box-sizing:border-box;"></label>
  <div style="margin-top:14px;font-weight:700;color:#059669;">💳 카드·현금 소득공제 (연간 사용액, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;">
    <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">신용카드 <span style="color:#999;">15%</span></span><input type="tel" id="yt-card" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">체크카드·현금 <span style="color:#999;">30%</span></span><input type="tel" id="yt-cash" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
    <label style="flex:1 1 30%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">전통시장 <span style="color:#999;">40%</span></span><input type="tel" id="yt-market" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 30%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">대중교통 <span style="color:#999;">40%</span></span><input type="tel" id="yt-transit" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 30%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">문화비·도서·공연·헬스장 <span style="color:#999;">30%·7천↓</span></span><input type="tel" id="yt-culture" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <div style="font-size:12px;color:#6b7280;margin-top:5px;line-height:1.5;">※ 전통시장·대중교통·문화비는 <b>총급여 25% 초과분에 한해</b> 위 공제율로 <b>각 100만원까지 추가공제</b>돼요 (문화비·도서·공연·영화·박물관·미술관·헬스장·수영장은 총급여 7천만원 이하만).</div>
  <div style="margin-top:14px;font-weight:700;color:#2563eb;">🧾 세액공제 (연간 납입액, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">연금저축 <span style="color:#999;">(한도 600만)</span></span><input type="tel" id="yt-pension" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">IRP <span style="color:#999;">(연금저축 합산 900만)</span></span><input type="tel" id="yt-irp" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">보장성 보험료</span><input type="tel" id="yt-ins" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">의료비</span><input type="tel" id="yt-med" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">기부금</span><input type="tel" id="yt-donate" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">월세액 (연간)</span><input type="tel" id="yt-rent" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">고향사랑기부금</span><input type="tel" id="yt-hometown" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:14px;color:#333;cursor:pointer;"><input type="checkbox" id="yt-marry" style="width:18px;height:18px;"> 올해(2024~2026) 혼인신고했어요 <span style="color:#999;font-size:12px;">— 결혼세액공제 50만원(생애 1회)</span></label>
  <div style="margin-top:14px;font-weight:700;color:#7c3aed;">🏠 추가 소득공제 (연간, 만원)</div>
  <div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;">
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">장기주택저당 이자상환</span><input type="tel" id="yt-mortgage" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">주택청약저축 <span style="color:#999;">(무주택)</span></span><input type="tel" id="yt-housing" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">청년형 장기펀드 <span style="color:#999;">(청년)</span></span><input type="tel" id="yt-youthfund" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
    <label style="flex:1 1 45%;"><span style="display:block;font-size:13px;color:#555;margin-bottom:4px;">국민성장펀드 <span style="color:#999;">(3천↓40%·~5천20%·~7천10%)</span></span><input type="tel" id="yt-kgf" inputmode="numeric" placeholder="0" style="width:100%;padding:10px;border:2px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>
  </div>
  <button id="yt-go" style="width:100%;margin-top:16px;padding:14px;border:0;border-radius:10px;background:#059669;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  <div id="yt-out" style="display:none;margin-top:20px;">
    <div style="text-align:center;padding:20px;border-radius:12px;" id="yt-card2">
      <div id="yt-big-label" style="font-size:15px;color:#555;"></div>
      <div id="yt-big" style="font-size:36px;font-weight:800;line-height:1.2;"></div>
    </div>
    <table style="width:100%;margin-top:12px;font-size:14.5px;border-collapse:collapse;"><tbody id="yt-rows"></tbody></table>
    <div id="yt-tips" style="margin-top:16px;"></div>
    <div style="font-size:12px;color:#6b7280;margin-top:8px;">※ \'환급/추가납부\'는 <b>매달 미리 낸 세금(기납부) − 결정세액</b>이에요. 기납부는 급여명세서 원천징수액을 직접 넣으면 정확하고, 안 넣으면 원천징수세율(80/100/120%)로 간이세액을 추정해요. 카드공제 초과분 배분·의료비 문턱(3%)·표준세액공제 등은 근사치라 홈택스 실제값과 차이가 납니다. 정확한 금액은 국세청 홈택스 연말정산 미리보기에서 확인하세요.</div>
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
  // 신용카드 등 소득공제: 총급여 25% 초과분에 공제율(신용15·체크현금30·전통시장40·대중교통40·문화비30)
  // 최저사용금액(25%)은 공제율 낮은 것부터 차감(신용→체크현금/문화→시장/교통) = 납세자 유리
  var thr=g*0.25;
  var credit=v('yt-card'), cash=v('yt-cash'), market=v('yt-market'), transit=v('yt-transit');
  var cultureUse=g<=70000000?v('yt-culture'):0;   // 문화비는 총급여 7천 이하만
  var bk=[{u:credit,r:0.15,g:'base'},{u:cash,r:0.30,g:'base'},{u:cultureUse,r:0.30,g:'add',n:'culture'},{u:market,r:0.40,g:'add',n:'market'},{u:transit,r:0.40,g:'add',n:'transit'}];
  bk.sort(function(a,b){return a.r-b.r;});
  var rem=thr; bk.forEach(function(x){var t=Math.min(x.u,rem); x.ded=(x.u-t)*x.r; rem-=t;});
  var baseCap=g<=70000000?3000000:2500000;                 // 기본 한도(7천↓ 300만 / 초과 250만)
  var addCap =g<=70000000?3000000:2000000;                 // 추가 한도(시장+교통+문화, 7천↓ 300만 / 초과 200만)
  var baseFull=bk.filter(function(x){return x.g==='base';}).reduce(function(s,x){return s+x.ded;},0);
  var baseDed=Math.min(baseFull,baseCap);
  var addFull=bk.filter(function(x){return x.g==='add';}).reduce(function(s,x){return s+Math.min(x.ded,1000000);},0); // 각 항목 100만 한도
  var addDed=Math.min(addFull,addCap);
  var cardDed=baseDed+addDed;
  var cardUse=credit+cash, cardFull=baseFull, cardCap=baseCap; // 팁·표시용(기본 카드 기준)
  var baseCapPoint=thr+baseCap/0.15;   // 신용카드만으로 기본한도 채우는 사용액(이상이면 카드종류 무관)
  // 과세표준
  var mortgage=Math.min(v('yt-mortgage'),18000000);   // 장기주택저당 이자 소득공제(한도 근사 1,800만)
  var housing=Math.min(v('yt-housing'),3000000)*0.40;  // 주택청약: 납입 40%, 연 300만 한도(무주택 세대주)
  var youthfund=Math.min(v('yt-youthfund'),6000000)*0.40; // 청년형 장기펀드: 납입 40%, 연 600만 한도(총급여 5천↓ 청년)
  // 국민성장펀드: 투자액 차등 소득공제(3천↓40%·3~5천20%·5~7천10%), 공제한도 1,800만
  var kgfUse=v('yt-kgf');
  var kgf=(Math.min(kgfUse,30000000)*0.40)+(Math.max(Math.min(kgfUse,50000000)-30000000,0)*0.20)+(Math.max(Math.min(kgfUse,70000000)-50000000,0)*0.10);
  kgf=Math.min(kgf,18000000);
  var base=g-earnDed(g)-perDed-cardDed-mortgage-housing-youthfund-kgf;
  var calcTax=tax(base);                   // 산출세액
  // 세액공제
  // 연금저축 단독 600만 한도 + IRP 포함 합산 900만 한도
  var pensionSaving=Math.min(v('yt-pension'),6000000);
  var irpAmt=v('yt-irp');
  var pension=Math.min(pensionSaving+irpAmt,9000000);
  var pensionCr=pension*(g<=55000000?0.165:0.132);
  var ins=Math.min(v('yt-ins'),1000000);
  var insCr=ins*0.12;
  var med=v('yt-med'); var medBase=Math.max(med-g*0.03,0); var medCr=medBase*0.15;
  var donate=v('yt-donate'); var donCr=Math.min(donate,g*0.3)*0.15;
  // 자녀세액공제(2025년 귀속 상향): 1명 25만, 2명 55만, 3명↑ 55만+40만/인 (8~20세)
  var childCr=child<=0?0:child===1?250000:child===2?550000:550000+(child-2)*400000;
  // 결혼세액공제(2024~2026 혼인신고분, 생애 1회 50만원)
  var marryCr=$('yt-marry').checked?500000:0;
  // 월세 세액공제: 총급여 5,500만↓ 17%, 7,000만↓ 15%, 한도 1,000만
  var rent=Math.min(v('yt-rent'),10000000);
  var rentCr=g<=55000000?rent*0.17:(g<=70000000?rent*0.15:0);
  // 고향사랑기부: 10만원 이하 전액, 초과분 15%(상한 500만)
  var home=Math.min(v('yt-hometown'),5000000);
  var homeCr=Math.min(home,100000)+Math.max(home-100000,0)*0.15;
  var credits=pensionCr+insCr+medCr+donCr+childCr+rentCr+homeCr+marryCr;
  var stdCredit=130000;                    // 표준세액공제(특별공제 없을때) 근사
  var appliedCredit=Math.max(credits,stdCredit);
  var decided=Math.max(calcTax-appliedCredit,0);      // 결정세액
  // 기납부(원천징수 총액) = 간이세액표 근사 × 선택 비율(80/100/120%)
  // 간이세액 ≈ 근로소득공제+본인공제150만만 반영한 산출세액 - 표준세액공제 13만
  var simpleTax=Math.max(tax(g-earnDed(g)-1500000)-130000,0);
  var wtRate=parseFloat($('yt-withhold').value)||100;
  var prepaidInput=v('yt-prepaid');   // 사용자가 직접 입력한 기납부(있으면 우선)
  var prepaidAuto=Math.round(simpleTax*wtRate/100);
  var noDeductTax=prepaidInput>0?prepaidInput:prepaidAuto;   // 기납부(원천징수)
  var prepaidManual=prepaidInput>0;
  var refund=noDeductTax-decided;
  $('yt-big-label').textContent=refund>=0?'예상 환급 (원천징수 '+wtRate+'% 기준)':'예상 추가납부 (원천징수 '+wtRate+'% 기준)';
  $('yt-big').textContent=won(Math.abs(refund));
  $('yt-big').style.color=refund>=0?'#047857':'#dc2626';
  $('yt-card2').style.background=refund>=0?'#ecfdf5':'#fef2f2';
  function sec(t){return '<tr><td colspan="2" style="padding-top:14px;font-weight:800;color:#111;border-bottom:2px solid #ddd;">'+t+'</td></tr>';}
  function row(l,val,neg){return '<tr><td style="color:#555;">'+l+'</td><td style="'+(neg?'color:#dc2626;':'')+'">'+(neg?'-':'')+won(val)+'</td></tr>';}
  var incDedSum=earnDed(g)+perDed+cardDed+mortgage+housing+youthfund+kgf;
  var html=sec('① 소득')+row('총급여 (연봉)',g);
  html+=sec('② 소득공제 (소득을 줄여줘요)')
    +row('근로소득공제',earnDed(g),1)+row('인적공제 ('+fam+'명)',perDed,1)
    +(baseDed>0?row('신용/체크카드'+(baseFull>baseCap?' (한도도달)':''),baseDed,1):'')
    +(addDed>0?row('전통시장·대중교통·문화비 추가'+(addFull>addCap?' (한도도달)':''),addDed,1):'')
    +(mortgage>0?row('장기주택저당 이자',mortgage,1):'')
    +(housing>0?row('주택청약저축',housing,1):'')
    +(youthfund>0?row('청년형 장기펀드',youthfund,1):'')
    +(kgf>0?row('국민성장펀드',kgf,1):'')
    +'<tr style="border-top:1px solid #eee;"><td style="color:#111;font-weight:700;">소득공제 합계</td><td style="color:#dc2626;font-weight:700;">-'+won(incDedSum)+'</td></tr>'
    +'<tr class="hl"><td>③ 과세표준</td><td>'+won(base)+'</td></tr>';
  html+=sec('④ 산출세액 (과세표준 × 세율)')+row('과세표준 '+won(base)+' 기준',calcTax);
  html+=sec('⑤ 세액공제 (세금을 직접 깎아줘요)')
    +(pensionCr>0?row('연금저축·IRP',pensionCr,1):'')
    +(rentCr>0?row('월세',rentCr,1):'')
    +(insCr>0?row('보장성 보험료',insCr,1):'')
    +(medCr>0?row('의료비',medCr,1):'')
    +(donCr>0?row('기부금',donCr,1):'')
    +(homeCr>0?row('고향사랑기부',homeCr,1):'')
    +(childCr>0?row('자녀 ('+child+'명)',childCr,1):'')
    +(marryCr>0?row('결혼세액공제',marryCr,1):'')
    +(credits<stdCredit?row('표준세액공제 (특별공제 대신)',stdCredit,1):'')
    +'<tr style="border-top:1px solid #eee;"><td style="color:#111;font-weight:700;">세액공제 합계</td><td style="color:#dc2626;font-weight:700;">-'+won(appliedCredit)+'</td></tr>'
    +'<tr class="hl"><td>⑥ 결정세액 (실제 낼 세금)</td><td>'+won(decided)+'</td></tr>';
  html+=sec('⑦ 환급 계산')
    +row('기납부 ('+(prepaidManual?'직접입력':'원천징수 '+wtRate+'% 자동추정')+', 매달 미리 낸 세금)',noDeductTax)
    +row('결정세액 (실제 낼 세금)',decided)
    +'<tr class="hl"><td>'+(refund>=0?'→ 예상 환급':'→ 예상 추가납부')+'</td><td>'+won(Math.abs(refund))+'</td></tr>';
  $('yt-rows').innerHTML=html;
  // ── 맞춤 절세 팁 (입력값 기반) ──
  var tips=[];
  // 세액공제 vs 소득공제 우선순위
  var myRate=base<=14000000?6:base<=50000000?15:base<=88000000?24:base<=150000000?35:38;
  tips.push('💡 <b>세액공제가 소득공제보다 유리</b>해요. 소득공제는 내 세율('+myRate+'%)만큼만 줄지만, 세액공제(연금저축·월세 등)는 낸 세금에서 직접 깎여요. 여윳돈은 세액공제 항목부터 채우세요.');
  // 연금저축 한도 여유
  if(pension<9000000){var room=(9000000-pension)/10000;var rate2=g<=55000000?16.5:13.2;
    tips.push('🏦 <b>연금저축·IRP 한도가 '+Math.round(room).toLocaleString()+'만원 남았어요.</b> 여기 더 넣으면 '+rate2+'% ('+Math.round(room*rate2/100).toLocaleString()+'만원)를 돌려받아요. 절세율 최고 항목이에요.');}
  // 연금저축 vs IRP 우선순위
  tips.push('🥇 <b>연금저축 vs IRP, 뭐부터?</b> 세액공제율은 둘 다 같아요(16.5%/13.2%). 그래서 <b>연금저축부터 600만원 채우고, 남는 건 IRP로</b>(합산 900만). 이유: 연금저축은 ①중간에 일부만 인출 가능 ②주식형 100%까지 가능. IRP는 ①중도해지 시 세금 페널티가 크고 ②위험자산 70%까지만 담을 수 있어요. 유동성·운용자유도에서 연금저축이 유리해요.');
  // 국민성장펀드 안내
  if(kgfUse>0){
    tips.push('🇰🇷 <b>국민성장펀드</b>로 <b>'+won(kgf)+'</b> 소득공제 받았어요(투자액 차등: 3천↓40%·5천↓20%·7천↓10%, 공제한도 1,800만). 단 <b>5년 폐쇄형이라 중도해지가 안 되고</b>, 배당은 9% 분리과세예요. 여윳돈으로만 하세요.');}
  else if(g>=30000000){
    tips.push('🇰🇷 <b>국민성장펀드</b>는 투자액의 최대 40%까지 소득공제(3천만↓ 40%·~5천 20%·~7천 10%, 한도 1,800만)에 배당 9% 분리과세예요. 대신 5년 묶이는 폐쇄형이라 여유자금일 때만 고려하세요.');}
  // 신용카드 최적화
  var totalSpend=credit+cash+market+transit+cultureUse;
  if(totalSpend<thr){var need=(thr-totalSpend)/10000;
    tips.push('💳 카드·현금 사용액이 아직 <b>총급여의 25%('+Math.round(thr/10000).toLocaleString()+'만원)에 '+Math.round(need).toLocaleString()+'만원 부족</b>해요. 여기 넘어야 카드 공제가 시작돼요.');}
  else if(baseFull>=baseCap){
    tips.push('💳 기본 카드공제가 <b>이미 한도('+Math.round(baseCap/10000)+'만원)에 도달</b>했어요. 이 이상은 신용이든 체크든 공제가 안 늘어나니, <b>적립·혜택 좋은 신용카드를 쓰는 게 이득</b>이에요.');}
  else{
    tips.push('💳 25%는 넘겼고 한도는 남았어요. 이 구간은 <b>체크카드·현금영수증이 공제율 2배(30%)</b>라 유리해요. 참고로 <b>신용+체크·현금 합산이 '+Math.round(baseCapPoint/10000).toLocaleString()+'만원</b>을 넘으면 그 뒤론 신용카드만 써도 공제가 똑같아져서, 그때부턴 혜택 좋은 신용카드가 이득이에요.');}
  // 전통시장·대중교통·문화비 추가공제 안내
  if(market+transit+cultureUse>0){
    tips.push('🚌 <b>전통시장·대중교통(각 40%)·문화비(30%, 총급여 7천↓)</b>는 25% 초과분에 한해 각 100만원까지 추가공제돼요. 지금 추가공제로 <b>'+won(addDed)+'</b> 빠졌어요. 대중교통은 후불교통카드면 자동 집계돼요.');}
  else{
    tips.push('🚌 <b>대중교통·전통시장</b> 쓴 게 있으면 따로 입력하세요. 신용카드(15%)보다 공제율이 높아요(각 40%, 100만원 한도). 다만 한도를 다 채우려면 그 항목에 250만원 넘게 써야 해서, 실제 절세는 크지 않아요.');}
  // 의료비 문턱
  if(med>0&&med<=g*0.03){
    tips.push('🏥 의료비는 <b>총급여의 3%('+Math.round(g*0.03/10000).toLocaleString()+'만원)를 넘는 금액만</b> 공제돼요. 지금은 문턱 미달이라 공제가 0이에요.');}
  // 월세 자격 리마인더
  if(rent>0){tips.push('🏠 월세 세액공제는 <b>무주택 세대주(총급여 8천만↓·기준시가 4억↓ 주택)</b> 조건이에요. 자격 확인하세요.');}
  // 청년형 장기펀드 / 주택청약 팁
  if(g<=50000000 && v('yt-youthfund')===0){
    tips.push('🌱 <b>청년(만19~34세)이고 총급여 5천만원 이하</b>면 「청년형 장기펀드」에 넣은 돈의 40%(연 600만원 한도 → 최대 240만원)를 소득공제받아요. 정부 지원 상품이에요.');}
  if(v('yt-housing')===0){
    tips.push('🏠 <b>무주택 세대주</b>라면 「주택청약종합저축」 납입액의 40%(연 300만원 한도)를 소득공제받아요. 청약 기회 + 절세 둘 다 챙기세요.');}
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
- **주택청약종합저축**: 무주택 세대주면 납입액의 40%를 소득공제 (연 300만원 한도).
- **청년형 장기펀드(소득공제 장기펀드)**: 정부가 청년 자산형성을 돕는 상품. 만 19~34세·총급여 5천만원 이하면 납입액의 40%(연 600만원 한도 → 최대 240만원)를 소득공제받아요.

> 이 계산기는 주요 항목만 반영한 **간이 추정**이에요. 실제 연말정산은 훨씬 많은 규정이 적용되니, 정확한 금액은 [국세청 홈택스 연말정산 미리보기](https://www.hometax.go.kr)에서 확인하세요.
