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
function reset(){snake=[{x:8,y:10},{x:7,y:10},{x:6,y:10}];dir={x:1,y:0};ndir=dir;score=0;speed=140;acc=0;place();sync();}
function sync(){scE.textContent=score;}
function step(){
  dir=ndir;
  var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  if(head.x<0||head.x>=N||head.y<0||head.y>=N||snake.some(function(s){return s.x===head.x&&s.y===head.y;})){return over();}
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){score+=10;sync();if(speed>65)speed-=3;place();}
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
var EMOJI=['🍎','🍌','🍇','🍒','🥝','🍑','🍉','🍓','🥥','🍍','🥑','🍋'];
var grid=document.getElementById('grid'),movesE=document.getElementById('mv'),hiE=document.getElementById('hi'),ov=document.getElementById('overlay'),btn=document.getElementById('start');
var hi=+localStorage.getItem('mem_hi')||0; hiE.textContent=hi?hi:'-';
var cards,first,lock,moves,matched,size=4;
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
    var a=first,b=c;setTimeout(function(){a.classList.remove('open');b.classList.remove('open');first=null;lock=false;},700);
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

if __name__=="__main__":
    pass
