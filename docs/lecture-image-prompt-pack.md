# Lecture Image Prompt Pack

## Use This With

실제 ChatGPT 이미지 생성에 바로 붙여넣을 문서는 아래 파일입니다.

- [docs/chatgpt-lecture-image-prompts.md](/Users/dennis/kana-master/kana-master/docs/chatgpt-lecture-image-prompts.md)

이 문서는 스타일 기준과 자산 설계 문서이고, 위 문서는 실전 복붙용 프롬프트 문서입니다.

## Goal

인앱 강의를 텍스트 중심 슬라이드에서 `세로형 숏폼 영상`처럼 보이게 만들기 위한 이미지 자산 규격과 생성 프롬프트 기준 문서입니다.

## Visual Direction

- 형식: 세로형 9:16 또는 4:5 일러스트
- 스타일: 깔끔한 반실사 애니메이션 일러스트
- 톤: 프리미엄, 선명한 라인, 통일된 캐릭터 디자인
- 금지: 사진풍과 만화풍을 섞지 않기, 장면마다 스타일이 달라지지 않기
- 사용 위치:
  - 강의 리얼 배경
  - 진행 캐릭터 아바타
  - 장면 전환용 대표 컷

## Character Set

### 1. Mina

- 역할: 기본 진행자
- 성격: 따뜻하고 또렷한 설명형
- 사용 장면: 입문, 요약, 훅

### 2. Yuki

- 역할: 문화 가이드
- 성격: 친근하고 관찰형
- 사용 장면: 일본 문화, 생활 팁, 여행 상황

### 3. Sato Sensei

- 역할: 문법/구조 설명
- 성격: 차분하고 신뢰감 있는 강사
- 사용 장면: 문형, 조사, 활용, 한자 설명

### 4. Aki

- 역할: 말하기 코치
- 성격: 에너지 있고 실전 중심
- 사용 장면: 롤플레이 진입, 따라 말하기, 주문/요청

### 5. Ren

- 역할: 비교/정리 보조
- 성격: 날렵하고 논리적인 설명
- 사용 장면: 표, 비교, 비즈니스/IT 요약

## Asset Buckets

### A. Character Portraits

- 해상도: 1024x1536
- 배경: 투명 또는 매우 단순한 그라디언트
- 용도: 강의 상단 진행 캐릭터 카드

### B. Scene Backgrounds

- 해상도: 1536x2048
- 용도: 강의 리얼 배경
- 예시:
  - 일본 교실
  - 아침 출근길 역 플랫폼
  - 카페 주문 카운터
  - 호텔 프런트
  - 회의실
  - 약국/병원 접수

### C. Story Moments

- 해상도: 1536x2048
- 용도: 특정 슬라이드의 핵심 컷
- 예시:
  - `おはようございます` 를 인사하는 직장 장면
  - `これをください` 로 주문하는 장면
  - `すみません` 으로 직원을 부르는 장면

## Prompt Template

```text
Use case: illustration-story
Asset type: in-app lecture visual
Primary request: premium vertical lecture illustration for a Japanese learning app
Scene/backdrop: [scene]
Subject: [character/action]
Style/medium: clean semi-realistic animation illustration, polished educational app visual
Composition/framing: vertical composition, strong focal subject, readable on mobile, safe margins
Lighting/mood: cinematic but soft, friendly and intelligent
Color palette: refined indigo, slate, warm ivory highlights
Materials/textures: crisp linework, subtle painterly shading, no noisy texture
Text (verbatim): none
Constraints: consistent character design across all assets, no watermark, no random props, no typography
Avoid: mixed art styles, chibi proportions, photorealism, muddy colors
```

## Starter Prompts

### Mina Portrait

```text
Use case: illustration-story
Asset type: in-app lecture character portrait
Primary request: a premium vertical portrait of Mina, the main lecture host for a Japanese learning app
Scene/backdrop: soft studio gradient background
Subject: Korean-friendly Japanese learning host, warm smile, smart and trustworthy presence
Style/medium: clean semi-realistic animation illustration
Composition/framing: waist-up portrait, centered, mobile-safe framing
Lighting/mood: soft cinematic light, polished and welcoming
Color palette: indigo, deep navy, ivory, subtle sky blue
Constraints: consistent reusable character design, no text, no watermark
Avoid: cartoon exaggeration, childish style, photorealism
```

### Greeting Scene

```text
Use case: illustration-story
Asset type: in-app lecture scene background
Primary request: a vertical scene for a Japanese greeting lesson
Scene/backdrop: Tokyo office lobby in the morning
Subject: two coworkers greeting each other politely near the entrance
Style/medium: clean semi-realistic animation illustration
Composition/framing: vertical, one character foreground, one midground, room for caption overlays
Lighting/mood: bright morning light, optimistic and professional
Constraints: no text, no watermark, unified premium app style
Avoid: cluttered background, heavy realism, inconsistent clothing style
```

### Cafe Ordering Scene

```text
Use case: illustration-story
Asset type: in-app lecture scene background
Primary request: a vertical cafe ordering scene for a beginner Japanese lesson
Scene/backdrop: modern Japanese cafe counter
Subject: learner pointing to a menu and politely ordering a drink from a barista
Style/medium: clean semi-realistic animation illustration
Composition/framing: vertical, strong foreground subject, readable silhouette, safe top and bottom margins
Lighting/mood: warm, lively, inviting
Constraints: no text, no watermark, coherent premium series style
Avoid: random extra customers as focal subjects, messy props, dark mood
```

## Integration Plan

1. `slide.characterImage`
   - 진행 캐릭터 카드에 사용
2. `slide.image`
   - 강의 리얼 배경으로 사용
3. 이미지가 없을 때
   - 현재 코드가 모듈 비주얼 SVG를 fallback 으로 사용
4. 향후 권장
   - Stage 1~3부터 장면 컷을 먼저 채우고 Stage 4~5로 확장

## Recommendation

가장 먼저 만들면 체감이 큰 자산은 아래 6개입니다.

1. Mina 진행자 portrait
2. Greeting office lobby scene
3. Cafe ordering counter scene
4. Hotel front desk scene
5. Clinic reception scene
6. Meeting room scene
