---
title: "내 생일엔 무슨 일이? — 그날의 사건과 생일이 같은 유명인"
description: "생년월일 8자리만 입력하면 내가 태어난 날 일어난 역사적 사건, 나와 생일이 같은 유명인(유명한 순), 태어난 요일까지 한 번에 보여드립니다."
date: 2026-07-21
slug: "my-birthday"
categories: ["도구"]
tags: ["생일", "내가 태어난 날", "생일 같은 유명인", "오늘의 역사", "생일 운세"]
toc: false
readingTime: false
---

생년월일을 입력하면 **내가 태어난 날 세상에서 일어난 일**과 **나와 생일이 같은 유명인**(요즘 사람들이 많이 찾아보는 순서)을 보여드립니다. 입력한 정보는 어디에도 저장되지 않아요.

<div id="bdaytool" style="max-width:560px;margin:0 auto;">
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <div style="flex:1 1 100%;">
      <span style="display:block;font-weight:700;margin-bottom:6px;">생년월일 <span style="font-weight:400;color:#888;font-size:13px;">— 숫자 8자리로 입력</span></span>
      <input type="tel" id="bd-birth" inputmode="numeric" placeholder="예: 19880818" maxlength="10"
             style="width:100%;padding:14px;border:2px solid #ccc;border-radius:10px;font-size:18px;letter-spacing:1px;box-sizing:border-box;">
    </div>
    <button id="bd-go" style="flex:1 1 100%;padding:14px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-size:17px;font-weight:700;cursor:pointer;">내 생일 이야기 보기</button>
  </div>
  <div id="bd-out" style="display:none;margin-top:18px;">
    <div style="text-align:center;padding:16px;border-radius:12px;background:#f5f3ff;">
      <div id="bd-head" style="font-size:20px;font-weight:800;color:#5b21b6;"></div>
      <div id="bd-sub" style="font-size:14px;color:#666;margin-top:4px;"></div>
    </div>
    <h3 style="font-size:18px;margin:18px 0 10px;">📰 내가 태어난 날, 세상에선</h3>
    <div id="bd-events" style="font-size:14.5px;line-height:1.65;"></div>
    <h3 style="font-size:18px;margin:18px 0 10px;">🎂 나와 생일이 같은 유명인</h3>
    <div id="bd-births" style="font-size:14.5px;line-height:1.65;"></div>
    <div style="font-size:12px;color:#6b7280;margin-top:10px;">출처: 한국어 위키백과 · 최근 60일 문서 조회수 기준 유명한 순</div>
    <button id="bd-share" style="width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#7c3aed;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">📤 내 생일 이야기 공유하기</button>
    <div style="margin-top:16px;padding:14px;border-radius:10px;background:#eff6ff;font-size:14.5px;">
      🔢 내 <b>만 나이·띠·별자리·생일 D-day</b>가 궁금하다면 → <a href="/tools/age-calculator/">만나이 계산기</a>
    </div>
  </div>
</div>

<script>
(function(){
  var $=function(id){return document.getElementById(id);};
  var birthEl=$('bd-birth');
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
  function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}
  function cleanWiki(t){
    return t.replace(/<ref[^>]*\/>/g,'').replace(/<ref[\s\S]*?<\/ref>/g,'')
            .replace(/\{\{[\s\S]*?\}\}/g,'')
            .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g,'$1')
            .replace(/'''?/g,'').replace(/<[^>]+>/g,'').trim();
  }
  function parseSection(wt,name){
    var re=new RegExp('==\\s*'+name+'\\s*==\\n([\\s\\S]*?)(?:\\n==|$)');
    var m=wt.match(re); if(!m)return [];
    var out=[], curYear=null;
    function push(year,body){
      var title=null, lre=/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, l;
      while((l=lre.exec(body))){ if(!/^\d+년|^\d+월|^\d+일/.test(l[1])){ title=l[1]; break; } }
      var txt=cleanWiki(body).replace(/[.。]\s*$/,'');
      if(txt)out.push({year:year,text:txt,title:title});
    }
    m[1].split('\n').forEach(function(line){
      var one=line.match(/^\*\s*\[\[(\d{3,4})년\]\]\s*[-–—]\s*(.+)/);
      if(one){curYear=+one[1];push(+one[1],one[2]);return;}
      var yr=line.match(/^\*\s*\[\[(\d{3,4})년\]\]\s*$/);
      if(yr){curYear=+yr[1];return;}
      var sub=line.match(/^\*\*\s*(.+)/);
      if(sub&&curYear)push(curYear,sub[1]);
    });
    return out;
  }
  function fetchViews(titles){
    var chunks=[]; for(var i=0;i<titles.length;i+=50)chunks.push(titles.slice(i,i+50));
    function fetchChunk(ch){
      var base='https://ko.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageviews&redirects=1&titles='+encodeURIComponent(ch.join('|'));
      var merged={pages:{},redirects:[]};
      function step(cont,n){
        var u=base+(cont?Object.keys(cont).map(function(k){return '&'+k+'='+encodeURIComponent(cont[k]);}).join(''):'');
        return fetch(u).then(function(r){return r.json();}).then(function(j){
          if(!j||!j.query)return merged;
          (j.query.redirects||[]).forEach(function(rd){merged.redirects.push(rd);});
          Object.keys(j.query.pages).forEach(function(pid){
            var pg=j.query.pages[pid];
            if(!merged.pages[pid])merged.pages[pid]={title:pg.title,pageviews:{}};
            var pv=pg.pageviews||{};
            Object.keys(pv).forEach(function(k){if(pv[k])merged.pages[pid].pageviews[k]=pv[k];});
          });
          if(j.continue&&n<6)return step(j.continue,n+1);
          return merged;
        });
      }
      return step(null,0).catch(function(){return merged;});
    }
    return Promise.all(chunks.map(fetchChunk)).then(function(results){
      var map={};
      results.forEach(function(res){
        res.redirects.forEach(function(rd){map['@'+rd.to]=rd.from;});
        Object.keys(res.pages).forEach(function(pid){
          var pg=res.pages[pid], tot=0;
          Object.keys(pg.pageviews).forEach(function(k){tot+=pg.pageviews[k];});
          map[pg.title]=tot;
          if(map['@'+pg.title])map[map['@'+pg.title]]=tot;
        });
      });
      return map;
    });
  }
  function rankRender(list, el, color, unit, topN){
    var titles=list.filter(function(e){return e.title;}).map(function(e){return e.title;});
    var done=function(sorted){
      el.innerHTML=sorted.length?sorted.map(function(e){
        return '<div style="margin-bottom:6px;"><b style="color:'+color+';">'+e.year+unit+'</b> · '+esc(e.text)+'</div>';
      }).join(''):'이 날짜의 데이터가 없어요';
    };
    if(!titles.length){done(list.slice(0,topN));return;}
    fetchViews(titles).then(function(views){
      list.forEach(function(e){e.v=(e.title&&views[e.title])||0;});
      list.sort(function(a,b){return b.v-a.v;});
      done(list.slice(0,topN));
    }).catch(function(){done(list.slice(0,topN));});
  }
  var DOW=['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
  var lastBirth=null, lastTopCeleb='';
  $('bd-go').onclick=function(){
    var bd=parseBirth();
    if(!bd){alert('생년월일을 숫자 8자리로 입력해 주세요 (예: 19880818)');return;}
    lastBirth=bd;
    $('bd-out').style.display='block';
    $('bd-head').textContent=bd.getFullYear()+'년 '+(bd.getMonth()+1)+'월 '+bd.getDate()+'일 '+DOW[bd.getDay()];
    $('bd-sub').textContent='당신은 '+DOW[bd.getDay()]+'에 태어났어요';
    $('bd-events').innerHTML='불러오는 중…'; $('bd-births').innerHTML='불러오는 중…';
    var title=(bd.getMonth()+1)+'월_'+bd.getDate()+'일';
    fetch('https://ko.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=wikitext&page='+encodeURIComponent(title))
      .then(function(r){return r.json();}).then(function(j){
        var wt=j.parse.wikitext['*'];
        rankRender(parseSection(wt,'사건').filter(function(e){return e.year>=1930;}), $('bd-events'), '#1d4ed8', '', 6);
        var _bl=parseSection(wt,'탄생').filter(function(e){return e.year>=1930;});
        rankRender(_bl, $('bd-births'), '#7c3aed', '년생', 10);
        var _tv=_bl.filter(function(e){return e.title;});
        if(_tv.length){fetchViews(_tv.map(function(e){return e.title;})).then(function(v){_tv.sort(function(a,b){return (v[b.title]||0)-(v[a.title]||0);});lastTopCeleb=(_tv[0].text||'').replace(/^[^ ]+의 /,'');});}
      }).catch(function(){
        $('bd-events').textContent='불러오기 실패 — 잠시 후 다시 시도해 주세요';
        $('bd-births').textContent='불러오기 실패 — 잠시 후 다시 시도해 주세요';
      });
  };
  document.getElementById('bd-share').onclick=function(){
    if(!lastBirth)return;
    var d=lastBirth;
    var DOWk=['일','월','화','수','목','금','토'][d.getDay()];
    var t=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일('+DOWk+')에 태어난 나!'+(lastTopCeleb?' 나랑 생일 같은 유명인은 '+lastTopCeleb+' 🎂':'')+' 너도 확인해봐 👉 '+location.origin+location.pathname;
    if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요! 붙여넣기로 공유하세요.');});}
  };
})();
</script>

## 이 도구는 어떻게 만들었나요?

- **그날의 사건·탄생 인물**: 한국어 위키백과의 날짜 문서(예: "8월 18일")에 정리된 사건·탄생 목록을 실시간으로 불러옵니다.
- **유명한 순 정렬**: 각 인물의 위키백과 문서가 최근 60일간 얼마나 조회됐는지를 기준으로 정렬합니다. 지금 사람들이 실제로 많이 찾아보는 인물이 위로 올라옵니다.
- 모든 계산과 조회는 여러분의 브라우저에서 직접 이루어지며, 입력한 생년월일은 서버로 전송되지 않습니다.
