#!/usr/bin/env python3
"""게임 HTML 생성기 — 공용 셸(다크테마·nav·AdSense·GA·공유) + 게임별 canvas 로직.
사용: python3 build_games.py  → static/games/<slug>/index.html 생성.
"""
import pathlib
BASE = pathlib.Path(__file__).resolve().parent.parent / "static" / "games"

NAV = '''<!--pf-topnav-injected-->
<div style="max-width:760px;margin:0 auto 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;border-bottom:1px solid #3e3e3a;padding:10px 12px 12px;">
  <a href="/" style="color:#d97757;font-weight:800;font-size:15px;text-decoration:none;">✻ 계획대로 느긋하게</a>
  <nav style="display:flex;gap:5px;flex-wrap:wrap;">
    <a href="/tools/" style="color:#e8e6e3;text-decoration:none;border:1px solid #3e3e3a;border-radius:14px;padding:4px 10px;font-size:12px;background:#1f1f1d;">🧰 도구방</a>
    <a href="/games/" style="color:#d97757;text-decoration:none;border:1px solid #d97757;border-radius:14px;padding:4px 10px;font-size:12px;background:#1f1f1d;">🎮 게임방</a>
    <a href="/tests/" style="color:#e8e6e3;text-decoration:none;border:1px solid #3e3e3a;border-radius:14px;padding:4px 10px;font-size:12px;background:#1f1f1d;">🧠 심리테스트</a>
    <a href="/categories/뉴스/" style="color:#e8e6e3;text-decoration:none;border:1px solid #3e3e3a;border-radius:14px;padding:4px 10px;font-size:12px;background:#1f1f1d;">📰 뉴스</a>
    <a href="/darak-company/" style="color:#e8e6e3;text-decoration:none;border:1px solid #3e3e3a;border-radius:14px;padding:4px 10px;font-size:12px;background:#1f1f1d;">🏢 다락방컴퍼니</a>
  </nav>
</div>'''

def shell(slug, title, desc, h1, sub, body, js):
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>{title} — 에디슨의 놀이터 | 계획대로 느긋하게</title>
<meta name="description" content="{desc}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3894434364783200" crossorigin="anonymous"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-E8ECH6NV3Y"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-E8ECH6NV3Y');</script>
<style>
:root{{--bg:#262624;--panel:#1f1f1d;--line:#3e3e3a;--txt:#e8e6e3;--dim:#9c9a94;--coral:#d97757;--coral-soft:#e89b7f;--yellow:#e0c07e;}}
*{{margin:0;padding:0;box-sizing:border-box;}}
body{{background:var(--bg);color:var(--txt);font-family:'SF Mono','D2Coding',Menlo,Consolas,'Apple SD Gothic Neo',monospace;font-size:15px;line-height:1.6;min-height:100vh;padding:20px 14px;text-align:center;}}
h1{{font-size:22px;margin-top:6px;}}
.sub{{color:var(--dim);font-size:13px;margin:6px 0 14px;}}
canvas{{background:#0d0d10;border:2px solid var(--line);border-radius:10px;display:block;margin:0 auto;max-width:100%;touch-action:none;}}
#wrap{{position:relative;display:inline-block;}}
#overlay{{position:absolute;inset:0;background:rgba(13,13,16,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:10px;padding:20px;}}
#overlay h2{{color:var(--coral);font-size:22px;margin-bottom:10px;}}
#overlay p{{color:var(--dim);font-size:13.5px;margin-bottom:16px;line-height:1.7;}}
button{{background:var(--coral);border:0;border-radius:8px;color:#fff;font:inherit;font-weight:700;padding:11px 22px;cursor:pointer;}}
button:hover{{background:var(--coral-soft);}}
.hud{{display:flex;gap:18px;justify-content:center;margin-top:14px;color:var(--dim);font-size:14px;flex-wrap:wrap;}}
.hud b{{color:var(--yellow);}}
.foot{{margin-top:28px;padding-top:16px;border-top:1px dashed var(--line);color:var(--dim);font-size:13px;}}
.foot a{{color:var(--coral);text-decoration:none;}}
</style>
</head>
<body>
{NAV}
<h1>{h1}</h1>
<div class="sub">{sub}</div>
{body}
<div class="foot"><div>🎮 <a href="/games/">게임방</a> · 🏠 <a href="/">에디슨의 놀이터</a></div></div>
<div style="max-width:760px;margin:22px auto 0;padding:0 12px;"><h3 style="text-align:center;color:#e8e6e3;font-size:15px;margin-bottom:8px;">💬 방명록</h3><div id="planfully-comments"></div><script src="/comments.js?v=1" defer></script></div>
<script>
{js}
</script>
</body>
</html>'''

def write(slug, html):
    d = BASE / slug
    d.mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(html, encoding="utf-8")
    print(f"생성: games/{slug}/index.html ({len(html)}b)")

# ─────────────────────────────────────────────────────────────
# 🐍 스네이크 (지렁이 꼬리물기)
# ─────────────────────────────────────────────────────────────
SNAKE_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var N=20, S=cv.width/N;
var snake,dir,ndir,food,score,hi=+localStorage.getItem('snake_hi')||0,state='ready',tick,acc,speed;
var scE=document.getElementById('sc'),hiE=document.getElementById('hi'),ov=document.getElementById('overlay'),btn=document.getElementById('start');
hiE.textContent=hi;
function place(){var ok=false;while(!ok){food={x:(Math.random()*N)|0,y:(Math.random()*N)|0};ok=!snake.some(function(s){return s.x===food.x&&s.y===food.y;});}}
function reset(){snake=[{x:8,y:10},{x:7,y:10},{x:6,y:10}];dir={x:1,y:0};ndir=dir;score=0;speed=115;acc=0;place();sync();}
function sync(){scE.textContent=score;}
function step(){
  dir=ndir;
  var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  if(head.x<0||head.x>=N||head.y<0||head.y>=N||snake.some(function(s){return s.x===head.x&&s.y===head.y;})){return over();}
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){score+=10;sync();if(speed>50)speed-=4.5;place();}
  else snake.pop();
}
function draw(){
  ctx.fillStyle='#0d0d10';ctx.fillRect(0,0,cv.width,cv.height);
  ctx.fillStyle='#d97757';ctx.beginPath();ctx.arc((food.x+.5)*S,(food.y+.5)*S,S*0.38,0,7);ctx.fill();
  for(var i=0;i<snake.length;i++){ctx.fillStyle=i===0?'#e0c07e':'#7fb069';var s=snake[i];ctx.fillRect(s.x*S+1,s.y*S+1,S-2,S-2);}
}
function loop(t){
  if(state!=='play')return;
  if(!tick)tick=t;acc+=t-tick;tick=t;
  while(acc>=speed){step();acc-=speed;if(state!=='play')return;}
  draw();requestAnimationFrame(loop);
}
function over(){state='over';if(score>hi){hi=score;localStorage.setItem('snake_hi',hi);hiE.textContent=hi;}
  ov.style.display='flex';ov.querySelector('h2').textContent='GAME OVER';
  ov.querySelector('p').innerHTML='점수 <b style="color:#e0c07e">'+score+'</b><br>최고기록 '+hi;
  share('스네이크에서 '+score+'점');btn.textContent='다시 도전';}
function start(){ov.style.display='none';reset();state='play';tick=0;requestAnimationFrame(loop);}
btn.onclick=start;
function set(x,y){if(x===-dir.x&&y===-dir.y)return;ndir={x:x,y:y};}
document.addEventListener('keydown',function(e){var k=e.key;
  if(k==='ArrowUp'||k==='w')set(0,-1);else if(k==='ArrowDown'||k==='s')set(0,1);
  else if(k==='ArrowLeft'||k==='a')set(-1,0);else if(k==='ArrowRight'||k==='d')set(1,0);
  else return;e.preventDefault();
  if(state==='ready'||state==='over')start();});
var tx,ty;
cv.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
cv.addEventListener('touchmove',function(e){if(tx==null)return;var dx=e.touches[0].clientX-tx,dy=e.touches[0].clientY-ty;
  if(Math.abs(dx)+Math.abs(dy)<24)return;if(Math.abs(dx)>Math.abs(dy))set(dx>0?1:-1,0);else set(0,dy>0?1:-1);tx=null;e.preventDefault();},{passive:false});
function share(msg){var b=document.getElementById('g-share');if(!b){b=document.createElement('button');b.id='g-share';b.style.cssText='margin-top:10px;background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:9px 18px;border-radius:8px;cursor:pointer;font:inherit;';ov.appendChild(b);}
  b.textContent='📤 점수 자랑하기';b.onclick=function(){var t=msg+'! 나 이겨봐 🐍 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};}
})();
'''
SNAKE_BODY = '''<div id="wrap">
  <canvas id="cv" width="400" height="400"></canvas>
  <div id="overlay">
    <h2>SNAKE</h2>
    <p>방향키·WASD 또는 화면을 쓸어 방향을 바꿔요.<br>먹이를 먹으면 길어지고, 벽·몸에 부딪히면 끝!</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span>SCORE <b id="sc">0</b></span><span>BEST <b id="hi">0</b></span></div>'''

write("snake", shell("snake", "지렁이 게임(스네이크)",
    "먹이를 먹고 몸을 늘리는 클래식 스네이크(지렁이) 게임. 방향키·스와이프로 조작하는 무료 웹게임.",
    "🐍 지렁이 게임", "방향키·WASD 또는 스와이프로 조작 · 먹이를 먹고 길어져요",
    SNAKE_BODY, SNAKE_JS))

# ─────────────────────────────────────────────────────────────
# 🃏 카드 뒤집기 (메모리)
# ─────────────────────────────────────────────────────────────
MEM_JS = r'''
(function(){
var EMOJI=['🍎','🍌','🍇','🍒','🥝','🍑','🍉','🍓','🥥','🍍','🥑','🍋','🍈','🫐','🍊','🥭','🍅','🌶'];
var grid=document.getElementById('grid'),movesE=document.getElementById('mv'),hiE=document.getElementById('hi'),ov=document.getElementById('overlay'),btn=document.getElementById('start');
var hi=+localStorage.getItem('mem_hi')||0; hiE.textContent=hi?hi:'-';
var cards,first,lock,moves,matched,size=6;
function build(){
  var pairs=size*size/2, pool=EMOJI.slice(0,pairs), deck=pool.concat(pool);
  for(var i=deck.length-1;i>0;i--){var j=(Math.random()*(i+1))|0;var t=deck[i];deck[i]=deck[j];deck[j]=t;}
  grid.style.gridTemplateColumns='repeat('+size+',1fr)';
  grid.innerHTML=''; cards=[]; first=null; lock=false; moves=0; matched=0; movesE.textContent=0;
  deck.forEach(function(em,i){
    var c=document.createElement('div'); c.className='mcard'; c.dataset.em=em;
    c.innerHTML='<div class="mfront">?</div><div class="mback">'+em+'</div>';
    c.onclick=function(){flip(c);}; grid.appendChild(c); cards.push(c);
  });
}
function flip(c){
  if(lock||c.classList.contains('open')||c.classList.contains('done'))return;
  c.classList.add('open');
  if(!first){first=c;return;}
  moves++; movesE.textContent=moves; lock=true;
  if(first.dataset.em===c.dataset.em){
    first.classList.add('done');c.classList.add('done');matched+=2;first=null;lock=false;
    if(matched===cards.length)win();
  } else {
    var a=first,b=c;setTimeout(function(){a.classList.remove('open');b.classList.remove('open');first=null;lock=false;},600);
  }
}
function win(){
  if(!hi||moves<hi){hi=moves;localStorage.setItem('mem_hi',hi);hiE.textContent=hi;}
  ov.style.display='flex';ov.querySelector('h2').textContent='CLEAR! 🎉';
  ov.querySelector('p').innerHTML='<b style="color:#e0c07e">'+moves+'</b>번 만에 완성!<br>최소 기록 '+hi+'번';
  var b=document.getElementById('g-share');if(!b){b=document.createElement('button');b.id='g-share';b.style.cssText='margin-top:10px;background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:9px 18px;border-radius:8px;cursor:pointer;font:inherit;';ov.appendChild(b);}
  b.textContent='📤 자랑하기';b.onclick=function(){var t='카드뒤집기 '+moves+'번 클리어! 🃏 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
  btn.textContent='다시 하기';
}
btn.onclick=function(){ov.style.display='none';build();};
build();
})();
'''
MEM_BODY = '''<div id="wrap">
  <div id="grid" style="display:grid;gap:8px;width:340px;max-width:92vw;margin:0 auto;"></div>
  <div id="overlay">
    <h2>카드 뒤집기</h2>
    <p>같은 그림 카드 2장을 찾아 짝을 맞춰요.<br>적은 횟수로 모두 맞추면 최고기록!</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span>MOVES <b id="mv">0</b></span><span>BEST <b id="hi">-</b></span></div>
<style>#grid .mcard{aspect-ratio:1;position:relative;cursor:pointer;}
#grid .mfront,#grid .mback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:26px;backface-visibility:hidden;transition:transform .3s;}
#grid .mfront{background:#1f1f1d;border:2px solid #3e3e3a;color:#9c9a94;}
#grid .mback{background:#2b2b28;border:2px solid #d97757;transform:rotateY(180deg);}
#grid .mcard.open .mfront,#grid .mcard.done .mfront{transform:rotateY(180deg);}
#grid .mcard.open .mback,#grid .mcard.done .mback{transform:rotateY(360deg);}
#grid .mcard.done{opacity:.5;}</style>'''
write("memory", shell("memory", "카드 뒤집기(메모리 게임)",
    "같은 그림을 찾아 짝을 맞추는 카드 뒤집기(메모리) 게임. 적은 횟수로 클리어하는 무료 웹게임.",
    "🃏 카드 뒤집기", "같은 그림 2장을 찾아 짝을 맞춰요 · 적은 횟수가 최고기록",
    MEM_BODY, MEM_JS))

# ─────────────────────────────────────────────────────────────
# ⚫ 오목 (2인 번갈아, 5목 승리)
# ─────────────────────────────────────────────────────────────
GOMOKU_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var N=15,PAD=18,S=(cv.width-PAD*2)/(N-1);
var board,turn,over,turnE=document.getElementById('turn');
function reset(){board=[];for(var i=0;i<N;i++){board.push(new Array(N).fill(0));}turn=1;over=false;draw();upd();}
function upd(){turnE.innerHTML=over?'':'차례: <b style="color:'+(turn===1?'#e8e6e3':'#e0c07e')+'">'+(turn===1?'⚫ 흑':'⚪ 백')+'</b>';}
function draw(){
  ctx.fillStyle='#d9b98a';ctx.fillRect(0,0,cv.width,cv.height);
  ctx.strokeStyle='#5c4a30';ctx.lineWidth=1;
  for(var i=0;i<N;i++){ctx.beginPath();ctx.moveTo(PAD,PAD+i*S);ctx.lineTo(cv.width-PAD,PAD+i*S);ctx.stroke();ctx.beginPath();ctx.moveTo(PAD+i*S,PAD);ctx.lineTo(PAD+i*S,cv.height-PAD);ctx.stroke();}
  for(var y=0;y<N;y++)for(var x=0;x<N;x++){if(board[y][x]){ctx.beginPath();ctx.arc(PAD+x*S,PAD+y*S,S*0.42,0,7);ctx.fillStyle=board[y][x]===1?'#1a1a1a':'#f5f5f5';ctx.fill();ctx.strokeStyle='#555';ctx.stroke();}}
}
function win(x,y,p){var dirs=[[1,0],[0,1],[1,1],[1,-1]];for(var d=0;d<4;d++){var cnt=1;for(var s=-1;s<=1;s+=2){var nx=x+dirs[d][0]*s,ny=y+dirs[d][1]*s;while(nx>=0&&nx<N&&ny>=0&&ny<N&&board[ny][nx]===p){cnt++;nx+=dirs[d][0]*s;ny+=dirs[d][1]*s;}}if(cnt>=5)return true;}return false;}
cv.addEventListener('click',function(e){
  if(over)return;var rect=cv.getBoundingClientRect();var sx=cv.width/rect.width;
  var x=Math.round(((e.clientX-rect.left)*sx-PAD)/S),y=Math.round(((e.clientY-rect.top)*sx-PAD)/S);
  if(x<0||x>=N||y<0||y>=N||board[y][x])return;
  board[y][x]=turn;draw();
  if(win(x,y,turn)){over=true;turnE.innerHTML='<b style="color:#d97757">'+(turn===1?'⚫ 흑':'⚪ 백')+' 승리! 🎉</b>';return;}
  turn=turn===1?2:1;upd();
});
document.getElementById('start').onclick=function(){document.getElementById('overlay').style.display='none';reset();};
document.getElementById('rst').onclick=reset;
reset();
})();
'''
GOMOKU_BODY = '''<div id="wrap">
  <canvas id="cv" width="450" height="450"></canvas>
  <div id="overlay">
    <h2>오목 (2인)</h2>
    <p>한 화면에서 번갈아 두는 오목이에요.<br>가로·세로·대각선으로 <b>5개</b>를 먼저 이으면 승리!</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span id="turn"></span><button id="rst" style="background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:6px 14px;border-radius:8px;font:inherit;cursor:pointer;">다시</button></div>'''
write("gomoku", shell("gomoku", "오목 게임(2인)",
    "한 화면에서 번갈아 두는 오목 게임. 5개를 먼저 이으면 승리하는 무료 웹게임.",
    "⚫ 오목", "2인이 번갈아 두기 · 5개를 먼저 이으면 승리",
    GOMOKU_BODY, GOMOKU_JS))

# ─────────────────────────────────────────────────────────────
# 🏃 러너 (점프 — 장애물 피하기, 거리 기록)
# ─────────────────────────────────────────────────────────────
RUNNER_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var W=cv.width,H=cv.height,GY=H-40;
var py,vy,onG,dist,speed,obs,plats,spawn,platspawn,state='ready',hi=+localStorage.getItem('run_hi')||0,last;
var hiE=document.getElementById('hi'),dE=document.getElementById('ds'),ov=document.getElementById('overlay'),btn=document.getElementById('start');
hiE.textContent=hi;
function reset(){py=GY-30;vy=0;onG=true;dist=0;speed=5.2;obs=[];plats=[];spawn=55;platspawn=70;}
function jump(){if(state==='play'&&onG){vy=-11.5;onG=false;}else if(state==='ready'||state==='over'){start();}}
function addObs(){var tall=Math.random()<0.35;var h=tall?(46+Math.random()*34):(18+Math.random()*26);obs.push({x:W+10,w:16+Math.random()*18,h:h});if(Math.random()<0.25)obs.push({x:W+10+42+Math.random()*44,w:14+Math.random()*16,h:16+Math.random()*26});}
function addPlat(){var y=GY-42-Math.random()*70;plats.push({x:W+10,y:y,w:48+Math.random()*52});}
function loop(t){
  if(state!=='play')return;
  if(!last)last=t;var dt=Math.min((t-last)/16.7,3);last=t;
  var prevBottom=py+30;
  vy+=0.62*dt;py+=vy*dt;onG=false;
  if(py>=GY-30){py=GY-30;vy=0;onG=true;}
  // 공중 디딤판 착지(낙하 중 위에서 내려올 때)
  if(vy>0){for(var i=0;i<plats.length;i++){var pp=plats[i];if(34+26>pp.x&&34<pp.x+pp.w&&prevBottom<=pp.y+7&&py+30>=pp.y){py=pp.y-30;vy=0;onG=true;break;}}}
  dist+=speed*dt*0.1;speed+=0.0027*dt;
  spawn-=dt;if(spawn<=0){addObs();spawn=Math.max(26,72-speed*3);}
  platspawn-=dt;if(platspawn<=0){addPlat();platspawn=52+Math.random()*40;}
  for(var i=obs.length-1;i>=0;i--){obs[i].x-=speed*dt;if(obs[i].x<-40)obs.splice(i,1);}
  for(var i=plats.length-1;i>=0;i--){plats[i].x-=speed*dt;if(plats[i].x<-120)plats.splice(i,1);}
  // 충돌(장애물)
  var pl={x:34,y:py,w:26,h:30};
  for(var i=0;i<obs.length;i++){var o=obs[i];if(pl.x<o.x+o.w&&pl.x+pl.w>o.x&&pl.y+pl.h>GY-o.h){return over();}}
  draw();dE.textContent=Math.floor(dist)+'m';requestAnimationFrame(loop);
}
function draw(){
  ctx.fillStyle='#0d0d10';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#3e3e3a';ctx.beginPath();ctx.moveTo(0,GY+10);ctx.lineTo(W,GY+10);ctx.stroke();
  ctx.fillStyle='#5a65ad';for(var j=0;j<plats.length;j++){var pp=plats[j];ctx.fillRect(pp.x,pp.y,pp.w,8);ctx.fillStyle='#7f8ad0';ctx.fillRect(pp.x,pp.y,pp.w,2);ctx.fillStyle='#5a65ad';}
  ctx.fillStyle='#e0c07e';ctx.fillRect(34,py,26,30);ctx.fillStyle='#0d0d10';ctx.fillRect(50,py+7,5,5);
  ctx.fillStyle='#d97757';for(var i=0;i<obs.length;i++){var o=obs[i];ctx.fillRect(o.x,GY-o.h+10,o.w,o.h);}
  ctx.fillStyle='#9c9a94';ctx.font='14px monospace';ctx.textAlign='left';ctx.fillText(Math.floor(dist)+'m',10,24);
}
function over(){state='over';var d=Math.floor(dist);if(d>hi){hi=d;localStorage.setItem('run_hi',hi);hiE.textContent=hi;}
  ov.style.display='flex';ov.querySelector('h2').textContent='GAME OVER';
  ov.querySelector('p').innerHTML='<b style="color:#e0c07e">'+d+'m</b> 달렸어요!<br>최고기록 '+hi+'m';
  var b=document.getElementById('g-share');if(!b){b=document.createElement('button');b.id='g-share';b.style.cssText='margin-top:10px;background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:9px 18px;border-radius:8px;cursor:pointer;font:inherit;';ov.appendChild(b);}
  b.textContent='📤 자랑하기';b.onclick=function(){var t='러너에서 '+d+'m 달렸어요! 🏃 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
  btn.textContent='다시 도전';}
function start(){ov.style.display='none';reset();state='play';last=0;requestAnimationFrame(loop);}
btn.onclick=start;
document.addEventListener('keydown',function(e){if(e.key===' '||e.key==='ArrowUp'){e.preventDefault();jump();}});
cv.addEventListener('touchstart',function(e){e.preventDefault();jump();},{passive:false});
cv.addEventListener('mousedown',function(){jump();});
reset();draw();
})();
'''
RUNNER_BODY = '''<div id="wrap">
  <canvas id="cv" width="480" height="240"></canvas>
  <div id="overlay">
    <h2>RUNNER</h2>
    <p>스페이스·↑·화면 탭으로 점프!<br>공중 디딤판을 밟고 장애물을 피해 멀리 달려요.</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span>거리 <b id="ds">0m</b></span><span>BEST <b id="hi">0</b></span></div>'''
write("runner", shell("runner", "점프 러너 게임",
    "장애물을 점프로 피하며 멀리 달리는 러너 게임. 스페이스·터치로 점프하는 무료 웹게임.",
    "🏃 점프 러너", "스페이스·↑·탭으로 점프 · 멀리 달릴수록 기록",
    RUNNER_BODY, RUNNER_JS))

# ─────────────────────────────────────────────────────────────
# ⚪ 오셀로 (리버시, vs 컴퓨터)
# ─────────────────────────────────────────────────────────────
OTHELLO_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var N=8,S=cv.width/N,bd,turn,over,info=document.getElementById('info');
var DIRS=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
function reset(){bd=[];for(var i=0;i<N;i++)bd.push(new Array(N).fill(0));bd[3][3]=2;bd[4][4]=2;bd[3][4]=1;bd[4][3]=1;turn=1;over=false;draw();status();}
function flips(b,x,y,p){if(b[y][x])return[];var res=[];for(var d=0;d<8;d++){var dx=DIRS[d][0],dy=DIRS[d][1],nx=x+dx,ny=y+dy,line=[];while(nx>=0&&nx<N&&ny>=0&&ny<N&&b[ny][nx]===3-p){line.push([nx,ny]);nx+=dx;ny+=dy;}if(line.length&&nx>=0&&nx<N&&ny>=0&&ny<N&&b[ny][nx]===p)res=res.concat(line);}return res;}
function moves(b,p){var m=[];for(var y=0;y<N;y++)for(var x=0;x<N;x++){if(flips(b,x,y,p).length)m.push([x,y]);}return m;}
function play(x,y,p){var f=flips(bd,x,y,p);if(!f.length)return false;bd[y][x]=p;f.forEach(function(c){bd[c[1]][c[0]]=p;});return true;}
function count(p){var c=0;for(var y=0;y<N;y++)for(var x=0;x<N;x++)if(bd[y][x]===p)c++;return c;}
function draw(){
  ctx.fillStyle='#1b6b3a';ctx.fillRect(0,0,cv.width,cv.height);
  ctx.strokeStyle='#0d3d20';for(var i=0;i<=N;i++){ctx.beginPath();ctx.moveTo(i*S,0);ctx.lineTo(i*S,cv.height);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*S);ctx.lineTo(cv.width,i*S);ctx.stroke();}
  var mv=over?[]:moves(bd,1);
  for(var y=0;y<N;y++)for(var x=0;x<N;x++){if(bd[y][x]){ctx.beginPath();ctx.arc(x*S+S/2,y*S+S/2,S*0.4,0,7);ctx.fillStyle=bd[y][x]===1?'#1a1a1a':'#f5f5f5';ctx.fill();}}
  ctx.fillStyle='rgba(255,255,255,.25)';mv.forEach(function(m){ctx.beginPath();ctx.arc(m[0]*S+S/2,m[1]*S+S/2,S*0.12,0,7);ctx.fill();});
}
function status(){info.innerHTML='⚫ 나 <b>'+count(1)+'</b> : <b>'+count(2)+'</b> 컴퓨터 ⚪';}
function next(){
  status();
  if(!moves(bd,1).length&&!moves(bd,2).length){return end();}
  if(turn===2){setTimeout(ai,550);}
}
var WT=[[120,-25,20,5,5,20,-25,120],[-25,-45,-5,-3,-3,-5,-45,-25],[20,-5,15,3,3,15,-5,20],[5,-3,3,3,3,3,-3,5],[5,-3,3,3,3,3,-3,5],[20,-5,15,3,3,15,-5,20],[-25,-45,-5,-3,-3,-5,-45,-25],[120,-25,20,5,5,20,-25,120]];
function applyB(b,x,y,p){var nb=b.map(function(r){return r.slice();});var f=flips(nb,x,y,p);nb[y][x]=p;f.forEach(function(c){nb[c[1]][c[0]]=p;});return nb;}
function evalB(b){var s=0,e=0;for(var y=0;y<N;y++)for(var x=0;x<N;x++){if(b[y][x]===2){s+=WT[y][x];e++;}else if(b[y][x]===1){s-=WT[y][x];e--;}}
  s+=(moves(b,2).length-moves(b,1).length)*6;                 // 기동력
  return s;}
function mm(b,p,depth,al,be){
  var m1=moves(b,1).length,m2=moves(b,2).length;
  if(depth===0||(!m1&&!m2))return evalB(b);
  var mv=moves(b,p);
  if(!mv.length)return mm(b,3-p,depth-1,al,be);
  if(p===2){var best=-1e9;for(var i=0;i<mv.length;i++){var v=mm(applyB(b,mv[i][0],mv[i][1],2),1,depth-1,al,be);if(v>best)best=v;if(best>al)al=best;if(al>=be)break;}return best;}
  var w=1e9;for(var i=0;i<mv.length;i++){var v=mm(applyB(b,mv[i][0],mv[i][1],1),2,depth-1,al,be);if(v<w)w=v;if(w<be)be=w;if(al>=be)break;}return w;}
function ai(){
  var mv=moves(bd,2);
  if(!mv.length){turn=1;draw();next();return;}
  var empties=0;for(var y=0;y<N;y++)for(var x=0;x<N;x++)if(!bd[y][x])empties++;
  var depth=empties<=10?empties:4;                            // 종반엔 완전탐색
  var best=mv[0],bv=-1e9;
  for(var i=0;i<mv.length;i++){var v=mm(applyB(bd,mv[i][0],mv[i][1],2),1,depth,-1e9,1e9);if(v>bv){bv=v;best=mv[i];}}
  play(best[0],best[1],2);turn=1;draw();
  if(!moves(bd,1).length&&moves(bd,2).length){turn=2;draw();next();}else next();
}
function end(){over=true;draw();var a=count(1),b=count(2);info.innerHTML='<b style="color:#d97757">'+(a>b?'🎉 승리!':a<b?'아쉽게 패배':'무승부')+'</b> ('+a+':'+b+')';}
cv.addEventListener('click',function(e){
  if(over||turn!==1)return;var rect=cv.getBoundingClientRect();var sx=cv.width/rect.width;
  var x=(((e.clientX-rect.left)*sx)/S)|0,y=(((e.clientY-rect.top)*sx)/S)|0;
  if(play(x,y,1)){turn=2;draw();next();}
});
document.getElementById('start').onclick=function(){document.getElementById('overlay').style.display='none';reset();};
document.getElementById('rst').onclick=reset;
reset();
})();
'''
OTHELLO_BODY = '''<div id="wrap">
  <canvas id="cv" width="400" height="400"></canvas>
  <div id="overlay">
    <h2>오셀로 (리버시)</h2>
    <p>상대 돌을 내 돌로 양쪽에서 감싸면 뒤집혀요.<br>컴퓨터와 대결 — 돌이 더 많으면 승리!</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span id="info"></span><button id="rst" style="background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:6px 14px;border-radius:8px;font:inherit;cursor:pointer;">다시</button></div>'''
write("othello", shell("othello", "오셀로(리버시) 게임",
    "컴퓨터와 대결하는 오셀로(리버시) 게임. 돌을 뒤집어 더 많이 차지하면 승리하는 무료 웹게임.",
    "⚪ 오셀로", "컴퓨터와 대결 · 상대 돌을 감싸 뒤집어요 · 흰 점이 둘 수 있는 자리",
    OTHELLO_BODY, OTHELLO_JS))

# ─────────────────────────────────────────────────────────────
# 🟦 테트리스
# ─────────────────────────────────────────────────────────────
TETRIS_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var COLS=10,ROWS=20,B=cv.width/COLS;
var COLORS=['','#31c7ef','#f7d308','#ad4d9c','#42b642','#ef2029','#5a65ad','#ef7921'];
var SHAPES=[[],
[[1,1,1,1]],                 // I
[[2,2],[2,2]],               // O
[[0,3,0],[3,3,3]],           // T
[[0,4,4],[4,4,0]],           // S
[[5,5,0],[0,5,5]],           // Z
[[6,0,0],[6,6,6]],           // J
[[0,0,7],[7,7,7]]];          // L
var grid,cur,px,py,score,lines,level,hi=+localStorage.getItem('tetris_hi')||0,state='ready',drop,acc,bag=[];
var scE=document.getElementById('sc'),lnE=document.getElementById('ln'),lvE=document.getElementById('lv'),hiE=document.getElementById('hi'),ov=document.getElementById('overlay'),btn=document.getElementById('start');
hiE.textContent=hi;
function newGrid(){grid=[];for(var y=0;y<ROWS;y++)grid.push(new Array(COLS).fill(0));}
function nextPiece(){if(!bag.length){bag=[1,2,3,4,5,6,7];for(var i=bag.length-1;i>0;i--){var j=(Math.random()*(i+1))|0;var t=bag[i];bag[i]=bag[j];bag[j]=t;}}return bag.pop();}
function spawn(){cur=SHAPES[nextPiece()].map(function(r){return r.slice();});px=((COLS-cur[0].length)/2)|0;py=0;if(collide(px,py,cur))over();}
function collide(nx,ny,sh){for(var y=0;y<sh.length;y++)for(var x=0;x<sh[y].length;x++){if(sh[y][x]){var gx=nx+x,gy=ny+y;if(gx<0||gx>=COLS||gy>=ROWS||(gy>=0&&grid[gy][gx]))return true;}}return false;}
function merge(){for(var y=0;y<cur.length;y++)for(var x=0;x<cur[y].length;x++){if(cur[y][x]&&py+y>=0)grid[py+y][px+x]=cur[y][x];}}
function rotate(){var n=cur.length,m=cur[0].length,r=[];for(var x=0;x<m;x++){r.push([]);for(var y=n-1;y>=0;y--)r[x].push(cur[y][x]);}
  var nx=px;if(collide(px,py,r)){if(!collide(px-1,py,r))nx=px-1;else if(!collide(px+1,py,r))nx=px+1;else return;}px=nx;cur=r;}
function clearLines(){var c=0;for(var y=ROWS-1;y>=0;y--){if(grid[y].every(function(v){return v;})){grid.splice(y,1);grid.unshift(new Array(COLS).fill(0));c++;y++;}}
  if(c){lines+=c;score+=[0,100,300,500,800][c]*level;level=1+((lines/8)|0);drop=Math.max(55,460-(level-1)*45);sync();}}
function sync(){scE.textContent=score;lnE.textContent=lines;lvE.textContent=level;}
function down(){if(collide(px,py+1,cur)){merge();clearLines();spawn();}else py++;}
function hard(){while(!collide(px,py+1,cur))py++;down();}
function draw(){
  ctx.fillStyle='#0d0d10';ctx.fillRect(0,0,cv.width,cv.height);
  for(var y=0;y<ROWS;y++)for(var x=0;x<COLS;x++){if(grid[y][x])cell(x,y,grid[y][x]);}
  if(cur)for(var y=0;y<cur.length;y++)for(var x=0;x<cur[y].length;x++){if(cur[y][x])cell(px+x,py+y,cur[y][x]);}
}
function cell(x,y,c){ctx.fillStyle=COLORS[c];ctx.fillRect(x*B+1,y*B+1,B-2,B-2);ctx.fillStyle='rgba(255,255,255,.15)';ctx.fillRect(x*B+1,y*B+1,B-2,3);}
function loop(t){if(state!=='play')return;if(!acc)acc=t;if(t-acc>drop){down();acc=t;}draw();requestAnimationFrame(loop);}
function over(){state='over';if(score>hi){hi=score;localStorage.setItem('tetris_hi',hi);hiE.textContent=hi;}
  ov.style.display='flex';ov.querySelector('h2').textContent='GAME OVER';
  ov.querySelector('p').innerHTML='점수 <b style="color:#e0c07e">'+score+'</b> · '+lines+'줄<br>최고기록 '+hi;
  var b=document.getElementById('g-share');if(!b){b=document.createElement('button');b.id='g-share';b.style.cssText='margin-top:10px;background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:9px 18px;border-radius:8px;cursor:pointer;font:inherit;';ov.appendChild(b);}
  b.textContent='📤 자랑하기';b.onclick=function(){var t='테트리스 '+score+'점! 🟦 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
  btn.textContent='다시 도전';}
function start(){ov.style.display='none';newGrid();score=0;lines=0;level=1;drop=460;acc=0;bag=[];sync();spawn();state='play';requestAnimationFrame(loop);}
btn.onclick=start;
document.addEventListener('keydown',function(e){if(state!=='play')return;var k=e.key;
  if(k==='ArrowLeft'){if(!collide(px-1,py,cur))px--;}else if(k==='ArrowRight'){if(!collide(px+1,py,cur))px++;}
  else if(k==='ArrowDown'){down();}else if(k==='ArrowUp'){rotate();}else if(k===' '){hard();}else return;e.preventDefault();draw();});
function bind(id,fn){var b=document.getElementById(id);if(b)b.onclick=function(){if(state!=='play')return;fn();draw();};}
bind('t-l',function(){if(!collide(px-1,py,cur))px--;});bind('t-r',function(){if(!collide(px+1,py,cur))px++;});
bind('t-rot',rotate);bind('t-d',down);bind('t-drop',hard);
})();
'''
TETRIS_BODY = '''<div id="wrap">
  <canvas id="cv" width="240" height="480"></canvas>
  <div id="overlay">
    <h2>TETRIS</h2>
    <p>← → 이동 · ↑ 회전 · ↓ 내리기 · 스페이스 한번에<br>줄을 꽉 채우면 사라져요!</p>
    <button id="start">게임 시작</button>
  </div>
</div>
<div class="hud"><span>SCORE <b id="sc">0</b></span><span>LINES <b id="ln">0</b></span><span>LV <b id="lv">1</b></span><span>BEST <b id="hi">0</b></span></div>
<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap;">
  <button id="t-l" class="tbtn">◀</button><button id="t-rot" class="tbtn">↻</button><button id="t-r" class="tbtn">▶</button><button id="t-d" class="tbtn">▼</button><button id="t-drop" class="tbtn">⤓</button>
</div>
<style>.tbtn{background:#1f1f1d;border:1px solid #3e3e3a;color:#e8e6e3;font-size:20px;width:52px;height:48px;border-radius:8px;cursor:pointer;}</style>'''
write("tetris", shell("tetris", "테트리스 게임",
    "블록을 쌓아 줄을 없애는 클래식 테트리스. 키보드·터치 버튼으로 조작하는 무료 웹게임.",
    "🟦 테트리스", "← → 이동 · ↑ 회전 · ↓ 내리기 · 스페이스 한 번에 · 모바일은 아래 버튼",
    TETRIS_BODY, TETRIS_JS))

# ─────────────────────────────────────────────────────────────
# 🎵 리듬 게임 (웹오디오 칩튠 = 저작권 프리)
# ─────────────────────────────────────────────────────────────
RHYTHM_JS = r'''
(function(){
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var W=cv.width,H=cv.height,LANES=5,LW=W/LANES,HITY=H-70,SPEED=0.52; // px per ms
var KEYS=['d','f',' ','j','k'];
var LANECOL=['#31c7ef','#f7d308','#ef7921','#ef2029','#42b642'];
var scE=document.getElementById('sc'),cbE=document.getElementById('cb'),acE=document.getElementById('ac'),hiE=document.getElementById('hi');
var ov=document.getElementById('overlay'),btn=document.getElementById('start');
var hi=+localStorage.getItem('rhythm_hi')||0;hiE.textContent=hi;
var AC,notes,active,score,combo,maxcombo,hitCnt,total,state='ready',t0,raf;
// ── 곡(펜타토닉 칩튠) 생성: [beat, lane, freq] ──
var BPM=148, BEAT=60000/BPM;
var SCALE=[523.25,587.33,659.25,783.99,880.0]; // C5 D5 E5 G5 A5
function buildSong(){
  var pat=[0,2,1,3,2,4,3,1, 4,3,2,0,1,2,3,4, 0,1,2,3,4,3,2,1, 3,2,4,2,1,3,0,2];
  var arr=[],b=0;
  for(var rep=0;rep<4;rep++){
    for(var i=0;i<pat.length;i++){
      var idx=pat[i], lane=idx%LANES, freq=SCALE[idx];
      arr.push({beat:b, lane:lane, freq:freq, hit:false});
      // 후반 반복일수록 동시(화음) 노트를 섞어 난이도 상승
      if(rep>=1 && i%8===4){var l2=(lane+2)%LANES;arr.push({beat:b, lane:l2, freq:SCALE[l2], hit:false});}
      b+= (i%4===3)?0.75:0.5;               // 더 촘촘한 리듬
    }
  }
  return arr;
}
function beep(freq,t,dur,type,gainv){
  var o=AC.createOscillator(),g=AC.createGain();
  o.type=type||'square';o.frequency.value=freq;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gainv||0.14,t+0.01);
  g.gain.exponentialRampToValueAtTime(0.0008,t+dur);
  o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+dur+0.02);
}
function schedule(){
  var base=AC.currentTime+0.15;
  // 멜로디는 자동재생 안 함 — 플레이어가 노트를 맞출 때 그 음이 울려서 곡이 완성됨.
  // 배경(베이스/드럼)만 가이드로 자동 재생.
  var lastBeat=notes[notes.length-1].beat;
  for(var b=0;b<=lastBeat;b+=1){beep(130.81,base+b*BEAT/1000,0.12,'triangle',0.16);}     // bass C3
  for(var b=0;b<=lastBeat;b+=0.5){beep(60,base+b*BEAT/1000,0.05,'sine',0.1);}             // kick
  t0=performance.now()+150;                 // 화면 노트 기준시각(오디오 base와 맞춤)
}
function start(){
  if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();
  if(AC.state==='suspended')AC.resume();
  ov.style.display='none';notes=buildSong();score=0;combo=0;maxcombo=0;hitCnt=0;total=notes.length;
  sync();schedule();state='play';raf=requestAnimationFrame(loop);
}
function sync(){scE.textContent=score;cbE.textContent=combo;acE.textContent=(total?Math.round(hitCnt/Math.max(1,judged())*100):100)+'%';}
var missCnt=0;function judged(){return hitCnt+missCnt;}
function loop(t){
  if(state!=='play')return;
  ctx.fillStyle='#0d0d10';ctx.fillRect(0,0,W,H);
  for(var i=0;i<LANES;i++){ctx.fillStyle=i%2?'#141418':'#101014';ctx.fillRect(i*LW,0,LW,H);}
  // 판정선 강조: 글로우 밴드 + 밝은 라인 + 레인별 타겟 링
  ctx.fillStyle='rgba(224,192,126,.10)';ctx.fillRect(0,HITY-22,W,44);
  ctx.strokeStyle='#e0c07e';ctx.lineWidth=4;ctx.shadowColor='#e0c07e';ctx.shadowBlur=14;ctx.beginPath();ctx.moveTo(0,HITY);ctx.lineTo(W,HITY);ctx.stroke();ctx.shadowBlur=0;
  for(var i=0;i<LANES;i++){ctx.strokeStyle=LANECOL[i];ctx.lineWidth=3;ctx.beginPath();ctx.arc(i*LW+LW/2,HITY,LW*0.34,0,7);ctx.stroke();}
  ctx.fillStyle='#e0c07e';ctx.font='11px monospace';ctx.textAlign='center';ctx.fillText('▼ 여기서 맞춰요 ▼',W/2,HITY-28);
  var now=t-t0, allDone=true;
  notes.forEach(function(n){
    var nt=n.beat*BEAT; var y=HITY-(nt-now)*SPEED;
    if(!n.hit&&now-nt>140){n.hit=true;combo=0;missCnt++;sync();}
    if(!n.hit&&y>-20&&y<H+20){allDone=false;ctx.fillStyle=LANECOL[n.lane];ctx.beginPath();ctx.roundRect?ctx.roundRect(n.lane*LW+8,y-9,LW-16,18,5):ctx.rect(n.lane*LW+8,y-9,LW-16,18);ctx.fill();}
    else if(!n.hit)allDone=false;
  });
  drawFx(t);drawPops(t);
  if(now>notes[notes.length-1].beat*BEAT+800){return finish();}
  raf=requestAnimationFrame(loop);
}
var fx=[];
function flash(lane,col){fx.push({lane:lane,col:col,t:performance.now()});}
function drawFx(t){ctx.textAlign='center';for(var i=fx.length-1;i>=0;i--){var f=fx[i],a=1-(t-f.t)/300;if(a<=0){fx.splice(i,1);continue;}ctx.globalAlpha=a*0.6;ctx.fillStyle=f.col;ctx.fillRect(f.lane*LW,HITY-40,LW,80);ctx.globalAlpha=1;}}
var pops=[];
function popup(txt,col){pops.push({txt:txt,col:col,t:performance.now()});}
function drawPops(t){ctx.textAlign='center';for(var i=pops.length-1;i>=0;i--){var p=pops[i],e=(t-p.t)/500;if(e>=1){pops.splice(i,1);continue;}ctx.globalAlpha=1-e;ctx.fillStyle=p.col;ctx.font='bold '+(30+e*16)+'px sans-serif';ctx.fillText(p.txt,W/2,H*0.42);ctx.globalAlpha=1;}}
function hitLane(lane){
  if(state!=='play')return;
  beep(SCALE[lane%SCALE.length],AC.currentTime,0.2,'square',0.2);  // 버튼 누르면 무조건 그 음이 남(악기처럼)
  var now=performance.now()-t0, best=null,bd=999;
  notes.forEach(function(n){if(n.hit||n.lane!==lane)return;var d=Math.abs(n.beat*BEAT-now);if(d<bd){bd=d;best=n;}});
  if(best&&bd<160){best.hit=true;hitCnt++;var pts=bd<60?100:bd<110?60:30;combo++;maxcombo=Math.max(maxcombo,combo);score+=pts*(1+((combo/10)|0));flash(lane,'#42b642');popup(bd<60?'PERFECT':'GOOD','#42b642');sync();}
  else{combo=0;flash(lane,'#ef2029');popup('MISS','#ef2029');sync();}
}
function finish(){state='over';cancelAnimationFrame(raf);
  var acc=Math.round(hitCnt/total*100);
  if(score>hi){hi=score;localStorage.setItem('rhythm_hi',hi);hiE.textContent=hi;}
  ov.style.display='flex';ov.querySelector('h2').textContent='CLEAR! 🎵';
  ov.querySelector('p').innerHTML='점수 <b style="color:#e0c07e">'+score+'</b> · 정확도 '+acc+'% · 최고콤보 '+maxcombo+'<br>최고기록 '+hi;
  var b=document.getElementById('g-share');if(!b){b=document.createElement('button');b.id='g-share';b.style.cssText='margin-top:10px;background:transparent;border:1px solid #3e3e3a;color:#e8e6e3;padding:9px 18px;border-radius:8px;cursor:pointer;font:inherit;';ov.appendChild(b);}
  b.textContent='📤 자랑하기';b.onclick=function(){var t='리듬게임 '+score+'점 (정확도 '+acc+'%)! 🎵 '+location.origin+location.pathname;if(navigator.share){navigator.share({text:t});}else{navigator.clipboard.writeText(t).then(function(){alert('복사됐어요!');});}};
  btn.textContent='다시 하기';
}
btn.onclick=start;
document.addEventListener('keydown',function(e){if(e.repeat)return;var k=(e.code==='Space'||e.key===' ')?' ':e.key.toLowerCase();var i=KEYS.indexOf(k);if(i>=0){e.preventDefault();if(state==='ready'||state==='over'){start();return;}hitLane(i);}});
function mkbtn(i){var b=document.getElementById('r'+i);if(b){var f=function(ev){ev.preventDefault();hitLane(i);};b.addEventListener('touchstart',f,{passive:false});b.addEventListener('mousedown',f);}}
for(var i=0;i<LANES;i++)mkbtn(i);
})();
'''
RHYTHM_BODY = '''<div id="wrap">
  <canvas id="cv" width="320" height="480"></canvas>
  <div id="overlay">
    <h2>RHYTHM</h2>
    <p>노트가 판정선에 닿을 때 <b>D · F · SPACE · J · K</b>(또는 버튼)를 눌러요!<br><b style="color:#e0c07e;">노트를 맞추면 그 음이 울려서 멜로디가 완성돼요.</b><br>많이 맞출수록 곡이 온전해지고 고득점 · 콤보!<br><span style="color:#7fb069;">배경 비트는 자동, 멜로디는 당신이 연주 (저작권 프리 🎶)</span></p>
    <button id="start">▶ 시작 (소리 켜기)</button>
  </div>
</div>
<div class="hud"><span>SCORE <b id="sc">0</b></span><span>COMBO <b id="cb">0</b></span><span>ACC <b id="ac">100%</b></span><span>BEST <b id="hi">0</b></span></div>
<div style="display:flex;gap:5px;justify-content:center;margin-top:12px;max-width:340px;margin-left:auto;margin-right:auto;">
  <button id="r0" class="rbtn" style="border-color:#31c7ef;">D</button><button id="r1" class="rbtn" style="border-color:#f7d308;">F</button><button id="r2" class="rbtn" style="border-color:#ef7921;font-size:12px;">SPACE</button><button id="r3" class="rbtn" style="border-color:#ef2029;">J</button><button id="r4" class="rbtn" style="border-color:#42b642;">K</button>
</div>
<style>.rbtn{flex:1;background:#1f1f1d;border:2px solid #3e3e3a;color:#e8e6e3;font-size:18px;font-weight:700;height:56px;border-radius:10px;cursor:pointer;}.rbtn:active{background:#33332f;}</style>'''
write("rhythm", shell("rhythm", "리듬 게임 (저작권 프리 음악)",
    "노트를 박자에 맞춰 두드리는 리듬 액션 게임. 음악을 브라우저가 직접 합성해 저작권 걱정 없는 무료 웹게임.",
    "🎵 리듬 게임", "D·F·SPACE·J·K 또는 버튼으로 박자 맞추기 · 음악은 브라우저가 직접 연주(저작권 프리)",
    RHYTHM_BODY, RHYTHM_JS))

if __name__=="__main__":
    pass
