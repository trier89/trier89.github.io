---
title: "만나이 계산기 — 만 나이·띠·별자리·정년·국민연금 D-day 한번에"
description: "생년월일만 입력하면 만 나이, 연 나이, 띠, 별자리, 생일 D-day에 정년(만 60세)·국민연금 수급 개시까지 남은 날짜를 한 번에 계산해 드립니다. 만 나이 통일법 기준."
date: 2026-07-21
slug: "age-calculator"
categories: ["도구"]
tags: ["만나이 계산기", "나이 계산", "만 나이", "띠 계산", "별자리", "디데이"]
toc: false
readingTime: false
---

생년월일을 입력하면 **만 나이**(만 나이 통일법 기준), 연 나이, 살아온 날수, 띠, 별자리, 다음 생일까지 남은 날짜를 한 번에 계산합니다. 모든 계산은 브라우저 안에서만 이루어지며 입력한 정보는 어디에도 저장·전송되지 않습니다.

<div id="agecalc" style="max-width:560px;margin:0 auto;">
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;">
    <div style="flex:1 1 100%;">
      <span style="display:block;font-weight:700;margin-bottom:6px;">생년월일 <span style="font-weight:400;color:#888;font-size:13px;">— 숫자 8자리로 입력</span></span>
      <input type="tel" id="ac-birth" inputmode="numeric" placeholder="예: 19900514" maxlength="10"
             style="width:100%;padding:14px;border:2px solid #ccc;border-radius:10px;font-size:18px;letter-spacing:1px;box-sizing:border-box;">
    </div>
    <label style="flex:1 1 220px;display:block;">
      <span style="display:block;font-weight:700;margin-bottom:6px;">기준일 (기본: 오늘)</span>
      <input type="date" id="ac-base" style="width:100%;padding:12px;border:2px solid #ccc;border-radius:10px;font-size:16px;">
    </label>
    <button id="ac-go" style="flex:1 1 100%;padding:14px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">계산하기</button>
  </div>
  <div id="ac-out" style="display:none;margin-top:18px;">
    <div style="text-align:center;padding:18px;border-radius:12px;background:#eff6ff;">
      <div style="font-size:15px;color:#555;">만 나이 <span style="color:#999;font-size:13px;">(만 나이 통일법 · 일명 "윤석열 나이")</span></div>
      <div id="ac-age" style="font-size:42px;font-weight:800;color:#1d4ed8;line-height:1.2;"></div>
      <div id="ac-agesub" style="font-size:14px;color:#666;"></div>
    </div>
    <table style="width:100%;margin-top:14px;border-collapse:collapse;font-size:15px;">
      <tbody>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">세는 나이 (기존 한국 나이)</td><td id="ac-kage" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">연 나이 (올해 − 출생연도)</td><td id="ac-yage" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">살아온 날</td><td id="ac-days" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">띠</td><td id="ac-zodiac" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">별자리</td><td id="ac-star" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">다음 생일까지</td><td id="ac-bday" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">정년(만 60세)까지</td><td id="ac-retire" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
        <tr><td style="padding:9px 6px;border-bottom:1px solid #eee;color:#555;">국민연금 수급 개시</td><td id="ac-pension" style="padding:9px 6px;border-bottom:1px solid #eee;font-weight:700;text-align:right;"></td></tr>
      </tbody>
    </table>
    <button id="ac-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">📤 내 결과 공유하기</button>
    <div style="margin-top:12px;padding:14px;border-radius:10px;background:#f5f3ff;font-size:14.5px;">
      🎂 내가 태어난 날 무슨 일이 있었는지, 나와 생일 같은 유명인이 궁금하다면 → <a href="/tools/my-birthday/">내 생일엔 무슨 일이?</a>
    </div>
  </div>
</div>

<script>
(function(){
  var $=function(id){return document.getElementById(id);};
  $('ac-base').value = new Date().toISOString().slice(0,10);
  // 생년월일 = 숫자 8자리 직접 입력(YYYYMMDD) — 기기별 date picker/드롭다운 이슈 원천 회피
  var birthEl=$('ac-birth');
  birthEl.addEventListener('input',function(){
    var v=this.value.replace(/[^0-9]/g,'').slice(0,8);
    if(v.length>6)v=v.slice(0,4)+'.'+v.slice(4,6)+'.'+v.slice(6);
    else if(v.length>4)v=v.slice(0,4)+'.'+v.slice(4);
    this.value=v;
  });
  function parseBirth(){
    var v=birthEl.value.replace(/[^0-9]/g,'');
    if(v.length!==8)return null;
    var y=+v.slice(0,4), m=+v.slice(4,6), d=+v.slice(6,8);
    if(y<1900||y>new Date().getFullYear()||m<1||m>12)return null;
    if(d<1||d>new Date(y,m,0).getDate())return null;
    return new Date(y,m-1,d);
  }
  var ANIMALS=['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'];
  var STARS=[[120,'염소자리'],[219,'물병자리'],[321,'물고기자리'],[420,'양자리'],[521,'황소자리'],[622,'쌍둥이자리'],[723,'게자리'],[823,'사자자리'],[923,'처녀자리'],[1023,'천칭자리'],[1123,'전갈자리'],[1222,'사수자리'],[1232,'염소자리']];
  function star(m,d){var k=m*100+d;for(var i=0;i<STARS.length;i++){if(k<STARS[i][0])return STARS[i][1];}return '염소자리';}
  $('ac-go').onclick=function(){
    var s=$('ac-base').value;
    var bd=parseBirth();
    if(!bd){alert('생년월일을 숫자 8자리로 입력해 주세요 (예: 19900514)');return;}
    var sd=new Date((s||new Date().toISOString().slice(0,10))+'T00:00:00');
    if(sd<bd){alert('기준일이 생년월일보다 빠릅니다');return;}
    var age=sd.getFullYear()-bd.getFullYear();
    var hadBirthday=(sd.getMonth()>bd.getMonth())||(sd.getMonth()===bd.getMonth()&&sd.getDate()>=bd.getDate());
    if(!hadBirthday)age--;
    var months=(sd.getFullYear()-bd.getFullYear())*12+(sd.getMonth()-bd.getMonth());
    if(sd.getDate()<bd.getDate())months--;
    var days=Math.floor((sd-bd)/86400000);
    var nb=new Date(sd.getFullYear(),bd.getMonth(),bd.getDate());
    if(nb<=sd)nb=new Date(sd.getFullYear()+1,bd.getMonth(),bd.getDate());
    var dleft=Math.round((nb-sd)/86400000);
    $('ac-age').textContent='만 '+age+'세';
    $('ac-agesub').textContent='만 '+months+'개월 · '+(hadBirthday?'올해 생일 지남':'올해 생일 전');
    $('ac-kage').textContent=(sd.getFullYear()-bd.getFullYear()+1)+'살';
    $('ac-yage').textContent=(sd.getFullYear()-bd.getFullYear())+'세';
    $('ac-days').textContent=days.toLocaleString()+'일째';
    $('ac-zodiac').textContent=ANIMALS[bd.getFullYear()%12]+'띠 ('+bd.getFullYear()+'년생)';
    $('ac-star').textContent=star(bd.getMonth()+1,bd.getDate());
    $('ac-bday').textContent=dleft===0?'오늘이 생일! 🎉':'D-'+dleft+' ('+(nb.getMonth()+1)+'월 '+nb.getDate()+'일)';
    // 은퇴 카운트다운 — 법정 정년 60세(고령자고용법) + 국민연금 개시연령(출생연도별)
    function dday(target){return Math.ceil((target-sd)/86400000);}
    var r60=new Date(bd.getFullYear()+60,bd.getMonth(),bd.getDate());
    $('ac-retire').textContent = r60<=sd ? '이미 지남 (만 60세)' :
      'D-'+dday(r60).toLocaleString()+' ('+r60.getFullYear()+'년 '+(r60.getMonth()+1)+'월)';
    var py=bd.getFullYear(), pAge = py<=1952?60 : py<=1956?61 : py<=1960?62 : py<=1964?63 : py<=1968?64 : 65;
    var pd=new Date(py+pAge,bd.getMonth(),bd.getDate());
    $('ac-pension').textContent = pd<=sd ? '이미 수급 연령 (만 '+pAge+'세)' :
      '만 '+pAge+'세 · D-'+dday(pd).toLocaleString()+' ('+pd.getFullYear()+'년)';
    $('ac-out').style.display='block';
    var _share=document.getElementById('ac-share');
    _share.onclick=function(){
      var _d=(''+(+ySel.value)).padStart(4,'0')+(''+(+mSel.value)).padStart(2,'0')+(''+(+dSel.value)).padStart(2,'0');
      var t='나는 '+$('ac-age').textContent+'! ('+$('ac-zodiac').textContent+' · '+$('ac-star').textContent+') 만나이·띠·별자리 확인 👉 '+location.origin+location.pathname+'?d='+_d;
      if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}
    };
  };
})();
</script>

## 만 나이 계산 방법

2023년 6월 28일부터 시행된 **만 나이 통일법**에 따라 법적·행정적 나이는 모두 만 나이를 사용합니다. 만 나이는 태어난 날을 0세로 시작해 **생일이 지날 때마다 한 살씩** 더하는 방식입니다.

- **만 나이** = 현재 연도 − 출생 연도 (단, 올해 생일이 아직 안 지났으면 1을 뺌)
- **연 나이** = 현재 연도 − 출생 연도 (병역법·청소년보호법 등 일부 법령에서 사용)
- **세는 나이**(기존 한국 나이): 태어나자마자 1살, 새해마다 +1. 공식적으론 폐지됐지만 일상에선 여전히 쓰입니다.
- 만 나이 통일법으로 한두 살 "어려진" 나이를 흔히 **"윤석열 나이"**라고 부르기도 합니다 — 위 계산기의 만 나이가 바로 그것입니다.

### 자주 묻는 질문

**Q. 술·담배 구매 가능 나이는 만 나이인가요?**
아니요. 청소년보호법은 **연 나이 19세**(그 해 1월 1일 기준)를 사용합니다. 생일과 무관하게 해당 연도에 19세가 되는 사람부터 구매할 수 있습니다.

**Q. 초등학교 입학은요?**
초·중등교육법 기준, **만 6세가 된 날이 속한 해의 다음 해 3월**에 입학합니다.

**Q. 정년과 국민연금 나이는 어떻게 계산하나요?**
법정 정년은 「고령자고용법」에 따라 **만 60세 이상**입니다(회사 규정에 따라 더 길 수 있음). 국민연금(노령연금) 수급 개시 연령은 출생연도별로 다릅니다: 1952년 이전 60세 / 1953~56년 61세 / 1957~60년 62세 / 1961~64년 63세 / 1965~68년 64세 / **1969년 이후 65세**.

**Q. 띠는 양력? 음력?**
전통적으로 띠는 음력 설(입춘) 기준이지만, 현재는 양력 1월 1일 기준으로 보는 경우가 많습니다. 이 계산기는 양력 출생 연도 기준으로 표시하므로 1~2월 초 출생자는 전년도 띠일 수 있습니다.
