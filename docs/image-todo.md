# 이미지 / 배너 제작 요청 (외부 툴용 TODO)

이미지 생성은 외부 툴로 진행. 아래 목록대로 만들어 **지정 폴더에 파일명대로** 넣은 뒤
`npm run scenes`를 실행하면 자동으로 랜덤 풀에 합류한다(썸네일도 자동 생성).

## 공통 스타일 가이드
- 톤: 기존 자산과 동일하게 **밝고 귀여운 일러스트(파스텔, 일본 여행 분위기)**.
- 사람 등장 시 기존 화자/캐릭터 느낌(애니풍)과 위화감 없게.
- 텍스트(글자)는 이미지에 넣지 말 것(앱이 위에 올림).
- 포맷: **webp** 권장. (png/jpg도 허용 — `npm run scenes`가 webp 썸네일 생성)

## 두 가지 사용처
1. **홈 단계 카드 / 이어보기 / 포커스** → `images/scenes/stages/<단계번호>/`, `images/scenes/programs/<프로그램id>/`
   - 정사각형~가로형(약 1024×1024 또는 1280×800). 폴더에 여러 장 넣으면 방문 시 랜덤 노출.
2. **레슨 카드 / 강의 장면** → `images/lecture-scenes/<이름>.webp`
   - 가로형(약 1280×800). `module-visuals.js`가 모듈별로 직접 참조(파일명 고정).

---

## 우선순위 1 — 실제로 비어 있는 자리 (대체 이미지 사용 중)

### 1) 공항·비행기 (단계 4)
현재 단계4·여행 코스가 공항 배경 1장만 돌려쓰는 중.
- `images/scenes/stages/4/airport-checkin.webp` — 공항 체크인 카운터, 캐리어 끄는 여행자
- `images/scenes/stages/4/airplane-cabin.webp` — 기내 좌석, 승무원에게 요청하는 장면
- `images/scenes/stages/4/immigration.webp` — 입국 심사 부스

### 2) 드라마 귀 트기 (단계 11) — 가장 부족
현재 "감사 장면"으로 대체 중. 드라마/감정 테마 전용 필요.
- `images/scenes/stages/11/drama-sofa.webp` — 소파에서 일본 드라마 보는 장면(자막 느낌)
- `images/scenes/stages/11/emotion-reactions.webp` — 인물의 다양한 감정 표정(놀람·웃음·울상)
- `images/lecture-scenes/drama-watching-sofa.webp` — 레슨/강의 카드용 가로형(드라마 시청)
- `images/lecture-scenes/friends-casual-talk.webp` — 친구끼리 반말 대화(일상 대사 모듈용)

> 위 2개 lecture-scenes를 추가하면 `module-visuals.js`의 `v3_drama_reactions` /
> `v3_drama_daily` cover를 전용 이미지로 교체 예정(현재는 임시 매핑).

---

## 우선순위 2 — 중복 줄이기(다양성)

### 3) 같은 배경을 공유하는 모듈용 전용 장면 (가로형, `images/lecture-scenes/`)
- `taxi-ride-backseat.webp` — 택시 뒷좌석/기사와 대화 (v3_taxi_ride)
- `rentacar-counter.webp` — 렌터카 카운터/차 인수 (v3_rentacar)
- `restaurant-table-order.webp` — 식당 테이블 주문 (v3_restaurant, 현재 카페와 유사)
- `duty-free-shop.webp` — 면세점 진열대 (v3_duty_free)
- `onsen-ryokan-rules.webp` — 온천/료칸 이용 안내 (v3_onsen)

### 4) 단계 폴더 보강 (각 폴더에 1장씩 더 — 랜덤 다양성)
`images/scenes/stages/1` ~ `10` 각 폴더에 분위기 다른 대체 컷 1장씩(선택).

### 5) 목표별 코스 포스터 보강 (세로형 권장, `images/scenes/programs/<id>/`)
한 코스당 1장 더 넣으면 포스터가 랜덤으로 바뀜.
- `v3_letters_7_days/` (문자 학습)
- `v3_survival_21_days/` (생존 회화)
- `v3_travel_30_days/` (여행)
- `v3_local_plus_14_days/` (현지 확장)
- `v3_drama_starter/` (드라마)

---

## 우선순위 3 — 선택(있으면 좋음)
- **퀴즈 결과 마스코트 컷**: cat-shiba가 칭찬/격려하는 변형 2~3종
  `images/v3/mascot/cat-shiba-cheer.webp`, `cat-shiba-try-again.webp`
  (현재 결과 화면은 텍스트만 — 이모지 제거함)
- **첫 방문 환영 배너(가로)**: 홈 첫 진입 히어로 배경 전용 1장.

---

## 반영 방법 요약
- `images/scenes/...`에 넣은 경우 → **`npm run scenes`** 실행(매니페스트+썸네일 갱신).
- `images/lecture-scenes/...`에 넣은 경우 → 파일명을 알려주면 `module-visuals.js` 매핑을 연결.
- 이미지 추가 후 음성과 무관(이미지는 즉시 반영). 음성 재생성은 모든 콘텐츠 확정 후 마지막에 일괄.
