# 가나 학습 (Kana Master) — 프로젝트 가이드

## ⚠️ 음성 재생성이 필요한 변경 (필수)

**다음 파일/항목을 변경/추가/삭제하면 반드시 음성을 재생성해야 합니다.** 그러지 않으면 새 콘텐츠가 Web Speech 폴백으로 떨어져 음질이 떨어지고, 강의/롤플레이 화자 토글이 무효해집니다.

| 변경 대상 | 재생성 명령 |
|-----------|-------------|
| `js/data/vocab-items-*.js` (어휘 추가/수정) | `npm run audio` |
| `js/data/vocab-dialogue.js` (롤플레이 대화) | `npm run audio` |
| `js/data/lecture-data-v2/*.js` (강의 슬라이드 captionJp) | `npm run audio:lectures` |
| `js/kana-data*.js` (가나 문자 추가) | `npm run audio:kana` |
| `scripts/generate-audio.js`의 `VOICES` (화자 변경) | `npm run audio:all` (기존 mp3 폴더 먼저 삭제) |

### 한 번에 모두 재생성
```bash
npm run audio:all
```
- 기존 mp3 파일은 자동 스킵됨 (재실행 안전)
- 새 콘텐츠만 추가 호출

## 다른 머신에서 처음 작업 시

1. **레포 클론** 후 `public/audio/`, `public/strokes/`는 **이미 커밋되어 있음** (Git LFS 미사용 — 일반 binary).
2. **변경 작업 시작 전** Azure Speech 키 환경변수 설정:
   ```powershell
   [Environment]::SetEnvironmentVariable("AZURE_SPEECH_KEY", "<key>", "User")
   [Environment]::SetEnvironmentVariable("AZURE_SPEECH_REGION", "koreacentral", "User")
   ```
3. 콘텐츠 변경 후 위 표 따라 재생성 → 변경된 mp3와 `public/audio/manifest.json`을 함께 커밋

## Azure 가격 정책 메모

- **F0 무료**: 월 50만자, 분당 20회 제한 → 짧은 신규 분만 받을 때 OK
- **S0 종량제**: $16/1M chars, 분당 200/초 → 대량 재생성 시 임시로 전환 권장
- 재생성이 다 끝나면 즉시 F0로 돌리기 (앱은 사전 mp3만 사용하므로 평상시 Azure 호출 0)

## 아키텍처 핵심

```
js/v2/tts.js             # 사전 mp3 우선, Web Speech 폴백
js/v2/lecture-flow.js    # 강의: 슬라이드당 단일 mp3 (가갭리스 재생)
public/audio/manifest.json  # voices, items, textIndex, lectures 매핑
public/audio/{voice}/{id}.mp3  # 화자별 mp3
public/strokes/{hex}.svg     # KanjiVG 사전 다운로드 (네트워크 호출 0)
```

### 매니페스트 구조
```json
{
  "generatedAt": "ISO date",
  "voices": { "nanami": { "name": "ja-JP-NanamiNeural", "gender": "F", ... }, ... },
  "items": { "w1_ohayo": { "text": "おはようございます", "voices": ["nanami","keita",...] }, ... },
  "textIndex": { "おはようございます": "w1_ohayo", ... },
  "lectures": { "wlevel_1_0": "lec_wlevel_1_0", ... }
}
```

### 화자 ID와 변경
- 현재 화자: `nanami` (F), `aoi` (F), `mayu` (F), `keita` (M)
- 화자를 추가하면 `scripts/generate-audio.js`의 `VOICES`와 `js/v2/tts.js`의 `FALLBACK_VOICES` 둘 다 갱신
- 화자 제거 시 `public/audio/{voice}/` 폴더 삭제 + manifest.voices 항목 정리

## 자주 하는 실수

- ❌ 어휘만 추가하고 mp3 안 받음 → 새 단어가 Web Speech로 들림 (이질적)
- ❌ 강의 captionJp 수정 후 재생성 안 함 → 화자 토글 무효 + 끊김
- ❌ `cache: 'force-cache'` 같은 강한 캐시로 manifest 로드 → 갱신 안 됨 (현재는 `no-cache`로 매번 검증)
- ❌ Service Worker가 옛 manifest 잡고 있음 → DevTools → Application → Unregister + 새로고침

## 일반 명령

```bash
npm run dev               # 로컬 서버 (port 3000)
npm run lint              # JS 구문 검사
npm run audio             # 어휘+대화 mp3 생성 (변경된 항목만)
npm run audio:lectures    # 강의 captionJp mp3 생성
npm run audio:kana        # 가나 문자 mp3 생성
npm run audio:all         # 위 셋 모두
npm run zip               # 배포 zip
```
