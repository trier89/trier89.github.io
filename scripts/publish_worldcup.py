#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
상황 선택 월드컵 — 일일 자동 발행 스크립트.

동작:
  - worldcup_themes.THEMES 를 위에서부터 순서대로 소비.
  - 아직 content/tests/<slug>/index.md 가 없는 첫 주제 1개를 오늘 날짜로 발행.
  - 이미 있으면 skip. 뱅크 소진 임박 시(<=3개 남음) 로그 경고, 소진 시 경고 후 종료.
  - 16강 단판 토너먼트 엔진(공용 JS/HTML)을 그 주제 데이터와 함께 페이지에 임베드.

사용:
  python3 publish_worldcup.py            # 오늘의 1개 발행(파일 생성)
  python3 publish_worldcup.py --dry      # 임시 폴더에 생성만(검토용, content/ 안 건드림)
  python3 publish_worldcup.py --slug X   # 특정 주제 강제 생성(첫 편 미리 생성용)
  python3 publish_worldcup.py --list     # 발행/미발행 현황만 출력

git 커밋/푸시는 이 스크립트가 하지 않는다 → 래퍼(publish_worldcup.sh)가 담당(기존 데일리 방식).
"""
import sys
import json
import datetime
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from worldcup_themes import THEMES  # noqa: E402

BLOG = Path(__file__).resolve().parent.parent
TESTS_DIR = BLOG / "content" / "tests"


# ── 공용 월드컵 엔진 (HTML + JS 템플릿) ────────────────────────────────
# 페이지의 데이터(__DATA_JSON__)만 바꾸면 어느 주제든 그대로 작동하도록 파라미터화.
ENGINE = r"""<div id="wc" style="max-width:640px;margin:0 auto;">
  <div id="wc-intro" style="text-align:center;padding:10px 0;">
    <div style="font-size:52px;line-height:1;margin-bottom:6px;">__EMOJI__</div>
    <p style="color:var(--dim);font-size:14px;margin:8px 0 18px;">16개의 상황이 1:1로 맞붙어요. 마음이 더 가는 쪽을 골라 최후의 1개를 뽑아보세요. (15번만 선택하면 끝!)</p>
    <button id="wc-start" style="padding:15px 42px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-size:17px;font-weight:800;cursor:pointer;">월드컵 시작하기</button>
  </div>
  <div id="wc-game" style="display:none;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span id="wc-round" style="font-size:13px;font-weight:700;color:var(--coral-soft);"></span>
      <span id="wc-count" style="font-size:12px;color:var(--dim);"></span>
    </div>
    <div style="height:8px;background:var(--line);border-radius:4px;margin-bottom:20px;overflow:hidden;">
      <div id="wc-bar" style="height:8px;width:0;background:var(--coral);border-radius:4px;transition:width .3s;"></div>
    </div>
    <div id="wc-prompt" style="text-align:center;font-size:16px;font-weight:700;color:var(--txt);margin-bottom:16px;"></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <button id="wc-a" class="wc-choice" style="padding:26px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:18px;font-weight:700;line-height:1.4;cursor:pointer;transition:all .12s;"></button>
      <div style="text-align:center;font-size:14px;font-weight:800;color:var(--coral);letter-spacing:1px;">VS</div>
      <button id="wc-b" class="wc-choice" style="padding:26px 18px;border:2px solid var(--line);border-radius:14px;background:var(--panel);color:var(--txt);font-size:18px;font-weight:700;line-height:1.4;cursor:pointer;transition:all .12s;"></button>
    </div>
  </div>
  <div id="wc-result" style="display:none;"></div>
</div>

<script>
(function(){
var $=function(id){return document.getElementById(id);};
var D=__DATA_JSON__;
var TYPES=D.types, ITEMS=D.items, NOUN=D.noun, PROMPT=D.prompt;
var TOTAL=ITEMS.length-1; // 총 대결 수(16강=15)
var pool, nextPool, mi, pick, tally, champ;

function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function roundLabel(n){return n>=16?'16강':n>=8?'8강':n>=4?'4강':'결승';}

function start(){
  pool=shuffle(ITEMS.slice()); nextPool=[]; mi=0; pick=0; champ=null;
  tally={}; for(var k in TYPES)tally[k]=0;
  $('wc-intro').style.display='none';
  $('wc-result').style.display='none';
  $('wc-game').style.display='block';
  showMatch();
}

function showMatch(){
  $('wc-round').textContent=roundLabel(pool.length)+(pool.length>2?(' · '+(mi/2+1)+'경기'):'');
  $('wc-count').textContent=(pick+1)+' / '+TOTAL;
  $('wc-bar').style.width=(pick/TOTAL*100)+'%';
  $('wc-prompt').textContent=PROMPT;
  var a=pool[mi], b=pool[mi+1];
  var ba=$('wc-a'), bb=$('wc-b');
  ba.textContent=a.t; bb.textContent=b.t;
  ba.onclick=function(){pickWinner(a);};
  bb.onclick=function(){pickWinner(b);};
}

function pickWinner(item){
  tally[item.g]=(tally[item.g]||0)+1;
  nextPool.push(item);
  mi+=2; pick++;
  if(mi>=pool.length){ pool=nextPool; nextPool=[]; mi=0; }
  if(pool.length===1){ champ=pool[0]; showResult(); return; }
  showMatch();
}

function winnerType(){
  var best=null,mx=-1;
  for(var k in tally){ if(tally[k]>mx){mx=tally[k];best=k;} }
  if(champ && tally[champ.g]===mx) best=champ.g; // 동점이면 우승 상황의 성향 우선
  return best;
}

function render(typeKey, shared){
  var t=TYPES[typeKey]||TYPES[Object.keys(TYPES)[0]];
  $('wc-intro').style.display='none';
  $('wc-game').style.display='none';
  var champBlock = (!shared && champ)
    ? '<div style="margin:14px 0;padding:13px 16px;border-radius:12px;background:rgba(217,119,87,.10);border:1px solid var(--line);font-size:15px;">🏆 내가 뽑은 최고의 선택 &nbsp;<b style="color:var(--coral-soft);">'+champ.t+'</b></div>'
    : '';
  var sharedNote = shared
    ? '<div style="margin:10px 0;padding:11px;border-radius:10px;background:rgba(126,166,224,.10);color:var(--blue);font-size:14px;text-align:center;">친구가 공유한 결과예요 💌 당신은 어떤 유형일까요?</div>'
    : '';
  $('wc-result').innerHTML=
    '<div style="text-align:center;padding:26px 18px;border-radius:16px;background:var(--panel);border:1px solid var(--line);">'
     +'<div style="font-size:56px;line-height:1;">'+t.e+'</div>'
     +'<div style="font-size:26px;font-weight:800;color:var(--coral-soft);margin-top:8px;">'+t.n+'</div>'
    +'</div>'
    +sharedNote
    +'<p style="text-align:center;font-size:17px;line-height:1.7;margin:18px 6px;font-weight:600;">'+t.line+'</p>'
    +champBlock
    +'<div style="display:flex;gap:10px;margin-top:22px;">'
    +(shared
       ? '<button id="wc-mine" style="flex:1;padding:15px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:16px;cursor:pointer;">나도 해보기 →</button>'
       : '<button id="wc-again" style="flex:1;padding:14px;border:2px solid var(--coral);border-radius:12px;background:transparent;color:var(--coral-soft);font-weight:800;font-size:15px;cursor:pointer;">다시 하기</button>'
         +'<button id="wc-share" style="flex:1;padding:14px;border:0;border-radius:12px;background:var(--coral);color:#fff;font-weight:800;font-size:15px;cursor:pointer;">결과 공유하기</button>')
    +'</div>'
    +'<div style="margin-top:16px;padding:14px;border-radius:12px;background:var(--panel);border:1px solid var(--line);font-size:14px;color:var(--dim);">다른 테스트도 즐겨보세요 → <a href="/tests/">심리테스트 전체</a></div>';
  $('wc-result').style.display='block';

  if(shared){
    var mine=$('wc-mine'); if(mine)mine.onclick=start;
  } else {
    $('wc-again').onclick=start;
    $('wc-share').onclick=function(){
      var url=location.origin+location.pathname+'?r='+typeKey;
      var txt='나의 '+NOUN+' 결과: '+t.e+' '+t.n+'! 너도 해봐 👉 '+url;
      if(navigator.share){navigator.share({text:txt}).catch(function(){});}
      else{navigator.clipboard.writeText(txt).then(function(){alert('결과가 복사됐어요!');});}
    };
  }
  try{ window.scrollTo({top:$('wc').offsetTop-20,behavior:'smooth'}); }catch(e){}
}

function showResult(){ render(winnerType(), false); }

// 선택지 hover 효과
document.querySelectorAll('.wc-choice').forEach(function(b){
  b.onmouseover=function(){b.style.borderColor='var(--coral)';};
  b.onmouseout=function(){b.style.borderColor='var(--line)';};
});

$('wc-start').onclick=start;

// 공유 링크(?r=타입키)로 들어오면 해당 결과 먼저 보여주기
(function(){
  var m=location.search.match(/[?&]r=([a-zA-Z]+)/);
  if(m && TYPES[m[1]]){ render(m[1], true); }
})();
})();
</script>
"""


def build_markdown(theme, date):
    """주제 데이터 + 공용 엔진을 임베드한 index.md 문자열 생성."""
    data = {
        "noun": theme["noun"],
        "prompt": theme["prompt"],
        "types": theme["types"],
        "items": [{"t": txt, "g": key} for txt, key in theme["items"]],
    }
    data_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    engine = ENGINE.replace("__DATA_JSON__", data_json).replace("__EMOJI__", theme["emoji"])

    tags = "\n".join(f'  - "{t}"' for t in theme["tags"])
    type_names = " · ".join(v["n"] for v in theme["types"].values())

    front = (
        "---\n"
        f'title: "{theme["title"]} — 상황 선택 월드컵"\n'
        f'emoji: "{theme["emoji"]}"\n'
        f'description: "{theme["desc"]}"\n'
        f"date: {date:%Y-%m-%d}\n"
        f'slug: "{theme["slug"]}"\n'
        'categories: ["심리테스트"]\n'
        "tags:\n"
        f"{tags}\n"
        "toc: false\n"
        "readingTime: false\n"
        "---\n"
    )

    intro = (
        f"\n16개의 상황이 토너먼트로 맞붙는 **{theme['title']}**! "
        "마음이 더 가는 쪽을 하나씩 고르다 보면 최후의 1개와 함께 나의 성향 유형까지 알 수 있어요. "
        f"{theme['emoji']} (재미로 봐주세요)\n\n"
    )

    about = (
        f"\n## {theme['title']}에 대하여\n\n"
        f"16가지 상황을 1:1 토너먼트(16강→8강→4강→결승)로 골라내며 총 15번을 선택하면, "
        f"선택한 상황들의 성향을 모아 **{type_names}** 중 나에게 가장 가까운 유형을 알려드려요. "
        "재미와 자기이해를 위한 콘텐츠이며, 모든 선택은 저장되지 않고 브라우저에서만 처리됩니다.\n"
    )

    return front + intro + engine + about


def status():
    """(발행됨, 미발행) 슬러그 목록."""
    published, pending = [], []
    for t in THEMES:
        if (TESTS_DIR / t["slug"] / "index.md").exists():
            published.append(t["slug"])
        else:
            pending.append(t["slug"])
    return published, pending


def main():
    args = sys.argv[1:]
    dry = "--dry" in args
    do_list = "--list" in args
    forced_slug = None
    if "--slug" in args:
        forced_slug = args[args.index("--slug") + 1]

    published, pending = status()

    if do_list:
        print(f"발행됨({len(published)}): {', '.join(published) or '-'}")
        print(f"미발행({len(pending)}): {', '.join(pending) or '-'}")
        return 0

    # 발행할 주제 선택
    if forced_slug:
        theme = next((t for t in THEMES if t["slug"] == forced_slug), None)
        if theme is None:
            print(f"ERROR: slug '{forced_slug}' 뱅크에 없음"); return 1
    else:
        theme = next((t for t in THEMES if t["slug"] in pending), None)
        if theme is None:
            print("WARN: 뱅크 소진 — 모든 주제가 이미 발행됨. 새 주제를 worldcup_themes.py 에 추가하세요.")
            return 0

    date = datetime.date.today()
    out_dir = (Path(tempfile.mkdtemp(prefix="wc_dry_")) if dry
               else TESTS_DIR / theme["slug"])
    index = out_dir / "index.md"

    if not dry and index.exists() and not forced_slug:
        print(f"skip: {theme['slug']} 이미 존재")
        return 0

    md = build_markdown(theme, date)
    out_dir.mkdir(parents=True, exist_ok=True)
    index.write_text(md, encoding="utf-8")
    print(f"created: {theme['slug']} → {index}  ({len(md)} bytes)")

    remaining = len([s for s in pending if s != theme["slug"]])
    if not dry and not forced_slug:
        if remaining == 0:
            print("WARN: 이번 발행으로 뱅크 소진. 새 주제 추가 필요!")
        elif remaining <= 3:
            print(f"WARN: 뱅크 잔여 {remaining}개. 곧 소진되니 주제를 보충하세요.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
