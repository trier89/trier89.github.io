/* ===== 신수 키우기 픽셀 스프라이트 (모노크롬 LCD, silhouette 중심) =====
   'X'=진한먹  'o'=연먹  '.'=투명  '~'=바닥그림자선  각 스프라이트는 문자행 배열.
   크기 다양(가로 최대 24). drawSprite가 중앙정렬+스케일 처리. */
window.SPR = {
/* 공통 */
egg: [
"........XXXX........",
".......XooooX.......",
"......XoooooooX.....",
".....XooXoooooX.....",
".....XoooooXoooX....",
"....XoooooooooooX...",
"....XoXooooooooX....",
"....XooooooXoooX....",
"....XoooooooooooX...",
"....XoooXoooooooX...",
".....XoooooooooX....",
".....XoooooooXX.....",
"......XoooooX.......",
".......XXXXX........"],
// 덩어리(부화 직후, 정체불명): 울퉁불퉁 블롭 + 눈 두 점
blob: [
"......ooooo......",
"....ooXXXXXoo....",
"...oXXXXXXXXXo...",
"..oXXXXXXXXXXXo..",
".oXXXXXXXXXXXXXo.",
".oXXXoXXXXXoXXXo.",
".oXXX@XXXXX@XXXo.",   // @ = 눈
".oXXXXXXXXXXXXXo.",
".oXXXXXXoXXXXXXo.",
"..oXXXXXXXXXXXo..",
"...oXXXXXXXXXo...",
"....ooXXXXXoo....",
"~~~~~~~~~~~~~~~~~"],

/* ---------------- 뱀 라인 ---------------- */
// 아기뱀 (작은 S자 + 머리)
snake_baby: [
"..........XXX...",
".........X@@oX..",   // 머리+눈
".........XoooX..",
"..........XXX...",
".......XXXX.....",
"......XX........",
".....XX.........",
"....XX..........",
"...XX...........",
"..XXX...........",
"...XXXXX........",
"......XXXXX.....",
"~~~~~~~~~~~~~~~~"],
// 청년A (상위: 코브라처럼 고개 든 우아한 자세)
snake_juvA: [
".......XXXX.....",
"......X@XX@X....",   // 넓은 후드 머리
"......XooooX....",
".......XooX.....",
".......XXXX.....",
"......XXoXX.....",
".....XXoooXX....",
"....XXooooXX....",
"...XXo...oXX....",
"..XXo.....oXX...",
".XXo.......oXX..",
"XXo.........XX..",
"~~~~~~~~~~~~~~~~"],
// 청년B (하위: 축 처진 자세)
snake_juvB: [
"...............",
"..XX@o.........",   // 낮게 깐 머리
".XooooX........",
"..XXXX.........",
"...XXXXX.......",
".....XXXXXX....",
"........XXXXX..",
"...........XX..",
".........XXX...",
"......XXXX.....",
"...XXXX........",
".XXX...........",
"~~~~~~~~~~~~~~~"],
// 신수: 히드라 (머리 3개 늘어선 목)
hydra: [
"..X@X...X@X...X@X",   // 3개 머리
".XoooX.XoooX.XoooX",
".XXXX...XXXX..XXXX",
"..Xo.....o....oX..",
"...Xo...o....oX...",
"....XoooXoooXo....",
"....XXXXXXXXX.....",
"...XXoooooooXX....",
"..XXooooooooXX....",
"..XXo......oXX....",
"...XXo....oXX.....",
"....XXooooXX......",
"~~~~~~~~~~~~~~~~~~"],
// 일반: 쌍두사 (머리 2개)
twinsnake: [
"...X@X.....X@X...",
"..XoooX...XoooX..",
"..XXXX.....XXXX..",
"...Xo.......oX...",
"....Xo.....oX....",
".....XoooooX.....",
".....XXXXXXX.....",
"....XXoooooXX....",
"...XXo.....oXX...",
"..XXo.......oXX..",
".XXo.........oXX.",
"XXo...........XX.",
"~~~~~~~~~~~~~~~~~~"],
// 일반: 방울뱀 (머리1 + 지그재그 꼬리 방울)
rattlesnake: [
".....XXX........",
"....X@@oX.......",
"....XoooX.......",
".....XXX........",
"....XXXXX.......",
"...XX...XX......",
"..XX.....XX.....",
".XX.......XXX...",
".X..........XX..",
"............XoX.",   // 방울
"...........XoXoX",
"............XoX.",
"~~~~~~~~~~~~~~~~"],
// 일반: 구렁이 (굵고 긴 몸통, 머리1)
python: [
"............XXX.",
"...........X@oX.",
"...........XooX.",
"............XX..",
".......XXXXXX...",
"....XXXXoooXX...",
"..XXXoooooXX....",
".XXoooooXXX.....",
".XXoooXXX.......",
".XXooXX.........",
"..XXXX..........",
"...XX...........",
"~~~~~~~~~~~~~~~~"],

/* ---------------- (다른 라인: 성체 신수형 위주, 나머지 단계 추후) ---------------- */
// 아테나 올빼미 (신수·새 라인 top)
owl_athena: [
"....X.....X....",
"...XXX...XXX...",
"..XXXXXXXXXXX..",
".XXoooooooooXX.",
".Xo@XoooX@ooX..",   // 큰 눈
".XoXXoXoXXoX...",
".Xo@XoooX@ooX..",
".XoooooXooooX..",   // 부리
".XXoooooooXX...",
"..XXoooooXX....",
"...XXXXXXX.....",
"...X.X.X.X.....",   // 발
"~~~~~~~~~~~~~~~"],
// 페가수스 (신수·말 라인 top, 옆모습 + 날개)
pegasus: [
"...........XXX..",
"..........X@oX..",   // 머리
"..........XooX..",
".....XX...XX....",   // 귀
"...XXXXXXXXX....",
"..XXWWWWooXX....",   // W=날개
".XWWWWWoooXX....",
"XWWWWWoooooX....",
".XWWWoooooXX....",
"...XoooooooX....",
"...Xo.o.o.oX....",   // 다리
"...X..X.X..X....",
"~~~~~~~~~~~~~~~~"],
// 키마이라 (신수·사자 라인 top: 사자머리+등염소+뱀꼬리+불)
chimera: [
"...XXX.....oo...",
"..XXXXX...oXXo..",   // 등 염소머리
".XXoooXX..XXX...",
"XXo@oo@oX.......",   // 사자 얼굴+눈
"Xoo^ooo oX......",   // 입
"fXooooooXX......",   // f=불
".XXooooooXXX....",
"..XXoooooooXXX..",
"...Xo.o.o.oXXsss",   // s=뱀꼬리
"...X..X.X..X....",
"~~~~~~~~~~~~~~~~~"],
// 디오니소스 표범 (신수·표범 라인 top: 점무늬 고양이 옆모습)
panther: [
"..XX.........XX.",   // 귀
".XooX.......XooX",
".XoooXXXXXXXoooX",
"..XoDoooDoooDoX.",   // D=점무늬
"..Xooo@oooooooX.",   // 눈
"..XoDoooDoooDoX.",
"..XooooooooooX..",
"..XoDooDooDooX..",
"..Xo.o.o.o.o.X..",   // 다리
"..X..X...X...X..",
"~~~~~~~~~~~~~~~~"],
// 일반동물 대표(간이): 그냥 말/사자/부엉이/삵 — 신수형에서 뿔/날개/불 등 뺀 형태로 추후 확장
plain_horse: [
"...........XXX..",
"..........X@oX..",
"..........XooX..",
".....XX...XX....",
"...XXXXXXXXX....",
"..XXoooooooXX...",
".XXoooooooooX...",
".XoooooooooXX...",
"...XoooooooX....",
"...Xo.o.o.oX....",
"...X..X.X..X....",
"~~~~~~~~~~~~~~~~"],
plain_owl: [
"...XXXXXXX.....",
"..XXoooooXX....",
".XXo@ooo@oXX...",
".XoXXoXoXXoX...",
".Xo@ooo@ooX....",
".XoooXoooooX...",
".XXoooooooXX...",
"..XXoooooXX....",
"...XXXXXXX.....",
"...X.X.X.X.....",
"~~~~~~~~~~~~~~~"]
};
/* 팔레트 확장(sprites.js 전용 문자) */
window.SPR_PAL = {'X':'#2b3a1a','o':'#5c7038','@':'#182410','^':'#182410','~':'#4a5c30',
  'W':'#3a4a24','D':'#182410','f':'#8a5a1e','s':'#3a5020'};
