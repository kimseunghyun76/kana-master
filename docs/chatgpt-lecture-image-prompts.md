# ChatGPT Lecture Image Prompts

## Quick Start

이 문서는 **ChatGPT 이미지 생성창에 그대로 복사해서 쓰는 실전용 문서**입니다.

바로 쓰는 순서는 아래처럼 진행하면 됩니다.

1. 이 문서에서 원하는 장면 1개를 고릅니다.
2. 해당 프롬프트 블록만 복사해서 ChatGPT 이미지 생성에 붙여넣습니다.
3. 이미지가 생성되면 다운로드합니다.
4. 아래에 적힌 `저장 파일명` 그대로 저장합니다.
5. 아래에 적힌 `저장 위치` 폴더에 넣습니다.
6. 이미지가 준비되면 제가 앱에 바로 연결합니다.

## What ChatGPT Can And Cannot Do

- ChatGPT는 이미지를 생성할 수 있습니다.
- 하지만 사용자의 맥 로컬 폴더에 **자동으로 저장**하지는 못합니다.
- 따라서 `특정 폴더에 다운로드까지 해줘` 라는 문장을 프롬프트에 넣어도, 실제 로컬 저장은 사용자가 직접 해야 합니다.
- 대신 이 문서에서는 저장할 `파일명`과 `폴더 경로`를 미리 고정해 두었습니다.

## Purpose

이 문서는 **ChatGPT 이미지 생성 창에 바로 복사해서 넣을 수 있는 최종 프롬프트 모음**입니다.

목표는 다음 3가지입니다.

1. 강의가 텍스트 슬라이드가 아니라 `짧은 영상 장면`처럼 보이게 만들기
2. 이미지 스타일을 전부 통일하기
3. 생성 후 바로 프로젝트에 넣을 수 있도록 `파일명`과 `저장 위치`를 미리 정해두기

## Important

- ChatGPT가 사용자의 맥 로컬 폴더에 **자동 저장**해주지는 않습니다.
- 대신 아래 각 프롬프트에 대해 이미지를 생성한 뒤,
  - 다운로드
  - 지정된 파일명으로 저장
  - 지정된 폴더에 넣기
  를 하면 됩니다.

## Save Folders

아래 폴더를 기준으로 저장합니다.

- 강의 장면 배경:
  - `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`
- 강의 진행 캐릭터:
  - `/Users/dennis/kana-master/kana-master/images/lecture-characters/`

## Style Rules

모든 프롬프트에 공통으로 아래 기준을 유지합니다.

- 세로형 일러스트
- 프리미엄 교육 앱용
- 깔끔한 반실사 애니메이션 스타일
- 선명한 라인, 절제된 색감, 고급스러운 조명
- 모바일 화면에서 인물과 장면이 또렷하게 보일 것
- 텍스트, 워터마크, 로고 금지
- 지나치게 만화적이거나 유치한 느낌 금지
- 장면마다 화풍이 바뀌지 않도록 통일

## How To Use In ChatGPT

각 프롬프트는 **하나씩** 이미지 생성에 넣는 것을 권장합니다.

ChatGPT에 넣을 때는 아래처럼 짧게 덧붙여도 좋습니다.

```text
Please generate exactly one image based on the prompt below.
Keep the style consistent with a premium Japanese learning app.
Do not add any text, logo, or watermark.
```

추천 순서:

1. 진행 캐릭터 1장
2. `wlevel_1` 장면 4장
3. `wlevel_7b` 장면 3장

---

## Character

### 1. Mina Host Portrait

- 저장 파일명: `mina-host-portrait.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-characters/`

```text
Create a premium vertical illustration for a Japanese learning app.

Subject:
A warm and intelligent female lecture host named Mina for an in-app Japanese course.

Visual style:
Clean semi-realistic animation illustration, polished educational app visual, premium mobile product quality, consistent character design, subtle painterly shading, crisp linework.

Appearance:
Friendly smile, trustworthy and articulate presence, neat modern outfit, approachable but professional energy.

Composition:
Waist-up portrait, centered, enough breathing room around the character, optimized for mobile UI.

Lighting:
Soft cinematic light with gentle highlights, elegant and calm mood.

Color palette:
Indigo, navy, ivory, subtle sky-blue highlights.

Constraints:
No text, no watermark, no logo, no background clutter, no chibi proportions, no photorealism.
```

---

## WLevel 1

### 2. Greeting Office Lobby Scene

- 추천 슬라이드: `wlevel_1` hook / culture
- 저장 파일명: `wlevel1-greeting-office-lobby.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical scene illustration for a Japanese learning app lesson about greetings.

Scene:
Tokyo office lobby in the morning.

Subject:
Two coworkers politely greeting each other near the entrance, one arriving early, the other returning the greeting warmly.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, consistent series look, refined and cinematic but friendly.

Composition:
Vertical composition, clear foreground and midground, strong focal point, safe space for caption overlays at the lower area.

Lighting:
Bright morning light coming through glass, optimistic and polished atmosphere.

Color palette:
Cool slate, indigo, warm morning gold, subtle ivory highlights.

Constraints:
No text, no watermark, no logo, no exaggerated cartoon style, no messy crowd.
```

### 3. Respectful Greeting Classroom / Mentor Scene

- 추천 슬라이드: `wlevel_1` grammar `~ございます`
- 저장 파일명: `wlevel1-polite-greeting-mentor.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about polite speech.

Scene:
Japanese language school or office hallway.

Subject:
A learner greeting a teacher or senior politely, showing a respectful morning greeting moment.

Visual style:
Clean semi-realistic animation illustration, premium educational app scene, elegant and trustworthy.

Composition:
Vertical framing, mentor figure and learner clearly visible, posture and politeness readable at a glance, room for subtitle overlays.

Lighting:
Soft indoor daylight, calm and refined.

Color palette:
Muted navy, ivory, warm beige, subtle emerald accents.

Constraints:
No text, no watermark, no logo, no childish style, no cluttered furniture.
```

### 4. Restaurant Staff Calling Scene

- 추천 슬라이드: `wlevel_1` story / culture `すみません`
- 저장 파일명: `wlevel1-sumimasen-restaurant-call.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about the expression sumimasen.

Scene:
A casual Japanese restaurant interior.

Subject:
A customer gently raising a hand to call a staff member with a polite apologetic expression, while the staff notices and approaches.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, cinematic but soft.

Composition:
Vertical mobile-friendly framing, customer foreground, staff midground, readable gesture and interaction, space for captions.

Lighting:
Warm restaurant light, comfortable and lively but not noisy.

Color palette:
Deep wood tones, indigo accents, soft amber lighting.

Constraints:
No text, no watermark, no logo, no exaggerated expressions, no messy crowded background.
```

### 5. Thank You / Kindness Scene

- 추천 슬라이드: `wlevel_1` mnemonic `ありがとうございます`
- 저장 파일명: `wlevel1-arigatou-kindness-scene.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about gratitude.

Scene:
A quiet city street or station entrance in Japan.

Subject:
One person helping another in a small but meaningful way, followed by a warm grateful exchange.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, emotionally warm, elegant and human.

Composition:
Vertical composition with clear emotional focus, helper and receiver both visible, readable gesture, space for subtitles.

Lighting:
Soft afternoon light, gentle and uplifting mood.

Color palette:
Muted blue, ivory, soft gold, calm urban neutrals.

Constraints:
No text, no watermark, no logo, no melodramatic acting, no photorealism.
```

### 6. Business Card / First Meeting Scene

- 추천 슬라이드: `wlevel_1` practice `よろしくお願いします`
- 저장 파일명: `wlevel1-first-meeting-yoroshiku.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about yoroshiku onegaishimasu.

Scene:
First meeting in a professional Japanese office setting.

Subject:
Two people introducing themselves politely, one slightly bowing while exchanging business cards or greeting respectfully.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, polished and modern.

Composition:
Vertical framing, clear polite body language, readable interaction, elegant office background, mobile-safe layout.

Lighting:
Bright, clean interior light with subtle cinematic depth.

Color palette:
Navy, charcoal, ivory, refined cool highlights.

Constraints:
No text, no watermark, no logo, no clutter, no caricature style.
```

---

## WLevel 7B

### 7. Cafe Ordering Counter Scene

- 추천 슬라이드: `wlevel_7b` hook / grammar
- 저장 파일명: `wlevel7b-cafe-order-counter.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about beginner service expressions like kudasai and onegaishimasu.

Scene:
Modern Japanese cafe counter.

Subject:
A learner politely ordering a drink from a barista while pointing at the menu or item.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, consistent with a refined mobile course.

Composition:
Vertical composition, strong foreground subject, readable ordering gesture, safe margins for captions and overlays.

Lighting:
Warm and inviting cafe lighting, lively but elegant.

Color palette:
Warm wood, dark slate, soft cream, subtle blue accents.

Constraints:
No text, no watermark, no logo, no messy props, no over-crowded shop.
```

### 8. Hotel Front Desk Request Scene

- 추천 슬라이드: `wlevel_7b` `お願いします`
- 저장 파일명: `wlevel7b-hotel-front-request.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about polite service requests in Japanese.

Scene:
Modern Japanese hotel front desk.

Subject:
A traveler politely asking the receptionist for help, such as check-in or assistance, showing a respectful request moment.

Visual style:
Clean semi-realistic animation illustration, premium educational app visual, sophisticated and clear.

Composition:
Vertical mobile-first framing, receptionist and traveler both visible, professional counter environment, room for captions.

Lighting:
Soft warm hotel lighting, upscale and calm.

Color palette:
Deep navy, bronze accents, ivory lighting, subtle slate background.

Constraints:
No text, no watermark, no logo, no exaggerated poses, no overly busy lobby.
```

### 9. Menu / Availability Check Scene

- 추천 슬라이드: `wlevel_7b` `ありますか`
- 저장 파일명: `wlevel7b-menu-availability-check.png`
- 저장 위치: `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`

```text
Create a premium vertical illustration for a Japanese learning app lesson about asking whether something is available.

Scene:
A restaurant or cafe table-side service moment in Japan.

Subject:
A learner politely asking whether an English menu or an item is available, while staff responds helpfully.

Visual style:
Clean semi-realistic animation illustration, premium educational app scene, clear communication-focused visual.

Composition:
Vertical composition, readable question-and-response moment, mobile-safe framing, balanced foreground and background.

Lighting:
Warm indoor lighting with calm cinematic polish.

Color palette:
Soft amber, charcoal, indigo accents, ivory highlights.

Constraints:
No text, no watermark, no logo, no crowd as main focus, no inconsistent art style.
```

---

## Recommended First Batch

가장 먼저 생성하면 좋은 6장은 아래입니다.

1. `mina-host-portrait.png`
2. `wlevel1-greeting-office-lobby.png`
3. `wlevel1-sumimasen-restaurant-call.png`
4. `wlevel1-first-meeting-yoroshiku.png`
5. `wlevel7b-cafe-order-counter.png`
6. `wlevel7b-hotel-front-request.png`

## After Saving

이미지를 저장한 뒤 다음 단계는 이렇습니다.

1. 위 파일명을 유지
2. 지정된 폴더에 저장
3. 필요하면 제가 [js/data/lecture-data-v2/wlevel_1.js](/Users/dennis/kana-master/kana-master/js/data/lecture-data-v2/wlevel_1.js), [js/data/lecture-data-v2/wlevel_7b.js](/Users/dennis/kana-master/kana-master/js/data/lecture-data-v2/wlevel_7b.js) 에 연결 경로를 반영

## Suggested Local Save Layout

아래 두 폴더만 사용하면 정리가 깔끔합니다.

- `/Users/dennis/kana-master/kana-master/images/lecture-scenes/`
- `/Users/dennis/kana-master/kana-master/images/lecture-characters/`

## Notes

- ChatGPT에 한 번에 너무 많은 프롬프트를 넣기보다, 한 장면씩 생성하는 편이 품질이 안정적입니다.
- 같은 캐릭터를 반복해서 쓸 경우, 첫 생성 이미지를 기준 이미지로 삼아 후속 생성에 참조시키는 것이 좋습니다.
