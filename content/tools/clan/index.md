---
title: "본관 유명인 찾기 — 우리 집안(성씨·본관) 유명 인물"
description: "성씨와 본관을 고르면 같은 본관에서 나온 역사 속 유명 인물을 보여줘요. 우리 집안 시조와 대표 인물을 한눈에 확인하는 무료 도구."
date: 2026-08-17
slug: "clan"
categories: ["도구"]
tags: ["본관 찾기", "성씨 유명인", "본관 유명인", "족보", "시조", "집안 인물"]
toc: false
readingTime: false
---

성씨와 본관을 고르면 **같은 본관에서 나온 유명 인물**을 보여줘요. 우리 집안의 시조와 대표 인물을 확인해 보세요.

<div class="pf-tool" style="max-width:560px;margin:0 auto;">
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
    <select id="cl-sung" style="flex:1 1 45%;padding:11px;border:2px solid #059669;border-radius:10px;font-size:15px;background:#fff;"><option value="">성씨 선택</option></select>
    <select id="cl-bon" style="flex:1 1 45%;padding:11px;border:2px solid #ccc;border-radius:10px;font-size:15px;background:#fff;"><option value="">본관 선택</option></select>
  </div>
  <div id="cl-out"></div>
  <p style="margin-top:16px;font-size:12px;color:#999;line-height:1.6;">※ 본관·시조·대표 인물은 문헌과 족보에 기록된 인물 중심입니다. 같은 본관이라도 계파가 다를 수 있어요. 데이터는 계속 추가됩니다.</p>
</div>

<script>
(function(){
var D={"김":{"김해":{"시조":"수로왕","유래":"가락국 시조 김수로왕","인물":["김유신 (신라 삼국통일 명장)","김대건 (한국 최초 천주교 신부)"]},"경주":{"시조":"김알지","유래":"신라 왕성, 김알지 후손","인물":["태종무열왕 김춘추 (삼국통일 기틀)","경순왕 김부 (신라 마지막 임금)"]},"광산":{"시조":"김흥광","유래":"신라 신무왕 후손","인물":["김장생 (예학의 대가)","김만중 (구운몽·사씨남정기 저자)"]},"안동":{"시조":"김방경","유래":"고려 명장 김방경 후손 (신·구 안동)","인물":["김방경 (고려 명장)","김상헌 (병자호란 척화신)","김구 (백범, 임시정부 주석)","김좌진 (청산리대첩 장군)"]}},"이":{"전주":{"시조":"이한","유래":"조선 왕조의 본관","인물":["이성계 (조선 태조)","세종대왕 (이도)","이승만 (초대 대통령, 양녕대군파)"]},"경주":{"시조":"이알평","유래":"신라 6부촌장 알평 후손","인물":["이제현 (고려 문신·학자)","이항복 (오성대감)","이명박 (제17대 대통령)"]},"덕수":{"시조":"이돈수","유래":"고려 중랑장 이돈수 후손","인물":["이순신 (충무공)","이이 (율곡)"]},"한산":{"시조":"이윤경","유래":"고려 호장 계통","인물":["이색 (목은, 삼은의 한 사람)","이산해 (조선 영의정)"]}},"박":{"밀양":{"시조":"박언침","유래":"신라 시조 박혁거세 후손","인물":["박연 (조선 3대 악성)","박은식 (독립운동가, 임정 2대 대통령)"]},"반남":{"시조":"박응주","유래":"고려 호장 박응주 후손","인물":["박지원 (연암, 열하일기 저자)","박영효 (개화파, 철종의 부마)"]}},"최":{"경주":{"시조":"최치원","유래":"신라 6부촌장 소벌도리 후손","인물":["최치원 (신라 대학자)","경주 최부자집 (12대 만석꾼)"]},"해주":{"시조":"최온","유래":"고려 문헌공 최충 계통","인물":["최충 (해동공자, 구재학당 창설)"]}},"정":{"동래":{"시조":"정회문","유래":"동래 정씨","인물":["정광필 (조선 영의정)"]},"나주":{"시조":"정해","유래":"나주 정씨","인물":["정약용 (다산, 목민심서 저자)","정약전 (자산어보 저자)"]},"연일":{"시조":"정종은","유래":"영일(연일) 정씨","인물":["정몽주 (포은, 단심가)","정철 (송강, 관동별곡)"]}},"강":{"진주":{"시조":"강이식","유래":"고구려 병마도원수 강이식 후손","인물":["강희안 (조선 문신·화가)","강희맹 (조선 문신·농학자)"]}},"윤":{"파평":{"시조":"윤신달","유래":"고려 개국공신 윤신달 후손","인물":["윤관 (여진 정벌 명장)","윤봉길 (독립운동가)","윤석열 (제20대 대통령)"]}},"신":{"평산":{"시조":"신숭겸","유래":"고려 개국공신 신숭겸 후손","인물":["신숭겸 (고려 개국공신)","신사임당 (율곡의 어머니)","신립 (조선 명장)"]},"고령":{"시조":"신성용","유래":"고령 신씨","인물":["신숙주 (집현전 학자, 한글 창제 참여)"]}},"황":{"장수":{"시조":"황경","유래":"장수 황씨","인물":["황희 (조선 명재상, 18년 영의정)"]}},"안":{"순흥":{"시조":"안자미","유래":"순흥 안씨","인물":["안향 (성리학 도입)","안중근 (독립운동가)","안창호 (도산)"]}},"권":{"안동":{"시조":"권행","유래":"고려 삼한벽상공신 권행 후손","인물":["권율 (임진왜란 행주대첩)","권근 (조선 개국공신·학자)"]}},"한":{"청주":{"시조":"한란","유래":"고려 개국공신 한란 후손","인물":["한명회 (세조의 책사)","한확 (조선 문신)"]}},"송":{"은진":{"시조":"송대원","유래":"은진 송씨","인물":["송시열 (우암, 노론 영수)","송준길 (동춘당)"]}},"문":{"남평":{"시조":"문다성","유래":"남평 문씨","인물":["문익점 (목화씨 전래)","문재인 (제19대 대통령)"]}}};
var s=document.getElementById("cl-sung"),b=document.getElementById("cl-bon"),o=document.getElementById("cl-out");
Object.keys(D).forEach(function(k){var op=document.createElement("option");op.value=k;op.textContent=k+"씨";s.appendChild(op);});
function fillBon(){b.innerHTML="<option value=\"\">본관 선택</option>";o.innerHTML="";var k=s.value;if(!k)return;Object.keys(D[k]).forEach(function(bk){var op=document.createElement("option");op.value=bk;op.textContent=bk+" "+k+"씨";b.appendChild(op);});}
function show(){o.innerHTML="";var k=s.value,bk=b.value;if(!k||!bk)return;var c=D[k][bk];var h="";h+="<div style=\"border:2px solid #059669;border-radius:14px;padding:18px;background:#f0fdf4;\">";h+="<div style=\"font-size:19px;font-weight:800;color:#065f46;margin-bottom:4px;\">"+bk+" "+k+"씨</div>";h+="<div style=\"font-size:13px;color:#059669;margin-bottom:2px;\">시조 · "+c["시조"]+"</div>";h+="<div style=\"font-size:12.5px;color:#666;margin-bottom:14px;\">"+c["유래"]+"</div>";h+="<div style=\"font-size:13px;font-weight:700;color:#333;margin-bottom:8px;\">📜 이 본관의 대표 인물</div>";c["인물"].forEach(function(p){h+="<div style=\"background:#fff;border:1px solid #d1fae5;border-radius:9px;padding:10px 12px;margin-bottom:7px;font-size:14px;color:#222;\">"+p+"</div>";});h+="</div>";o.innerHTML=h;}
s.addEventListener("change",fillBon);b.addEventListener("change",show);
})();
</script>
