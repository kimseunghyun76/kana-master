// ═══════════════════════════════════════
//  TTS / Audio Module
//  VOICEVOX + Edge TTS + Web Speech API
// ═══════════════════════════════════════
import { state, saveToStorage } from './state.js';
import { showToast } from './utils.js';

// ─── 오디오 ───

// ─── VOICEVOX 통합 ───
const VOICEVOX_URL = 'http://localhost:50021';

// VOICEVOX 화자 이름 한글 번역 테이블
const VV_NAME_KO = {
  // 캐릭터 이름
  '四国めたん':        '시코쿠 메탄',
  'ずんだもん':        '준다몬',
  '春日部つむぎ':      '카스카베 츠무기',
  '雨晴はう':          '아마하레 하우',
  '波音リツ':          '나나미 리츠',
  '玄野武宏':          '쿠로노 타케히로',
  '白上虎太郎':        '시라카미 코타로',
  '青山龍星':          '아오야마 류세이',
  '冥鳴ひまり':        '메이메이 히마리',
  '九州そら':          '큐슈 소라',
  'もち子さん':        '모치코상',
  '剣崎雌雄':          '켄자키 메스오',
  'ちび式じい':        '치비시키지이',
  '櫻歌ミコ':          '사쿠라카 미코',
  '小夜/SAYO':         '소요/SAYO',
  'ナースロボ＿タイプT':'너스로봇 타입T',
  '後鬼':              '고키',
  // 스타일 이름
  'ノーマル':  '기본',
  'あまあま':  '달콤',
  'ツンツン':  '쌀쌀',
  'セクシー':  '섹시',
  'ささやき':  '속삭임',
  'ヒソヒソ':  '귓속말',
  'クオリティ':'고품질',
  'ふつう':    '보통',
  'わーい':    '신남',
  'びくびく':  '긴장',
  'おこ':      '화남',
  'びえーん':  '울음',
  '喜び':      '기쁨',
  'ツンギレ':  '격노',
  '悲しみ':    '슬픔',
  'たのしい':  '즐거움',
  'かなしい':  '슬픔',
  'アナウンス':'아나운서',
  '読み聞かせ':'낭독',
  '人間ver.':  '인간형',
  'ロボットver.':'로봇형',
  '第1形態':   '1형태',
  '第2形態':   '2형태',
  'ロリ':      '로리',
  '楽しい':    '즐거움',
  '怒り':      '화남',
};

function translateVvName(jpName, jpStyle) {
  const koName  = VV_NAME_KO[jpName]  || jpName;
  const koStyle = VV_NAME_KO[jpStyle] || jpStyle;
  return `${koName} (${koStyle})`;
}
let voicevoxSpeakers = [];
let voicevoxAvailable = false;
// speakerId → { portrait: base64, icon: base64, charName, charNameJp }
const vvCharPortraits = {};

async function checkVoicevox() {
  try {
    const resp = await fetch(`${VOICEVOX_URL}/speakers`, {
      signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
    });
    if (resp.ok) {
      const data = await resp.json();
      voicevoxAvailable = true;
      voicevoxSpeakers = [];

      // 화자 목록 구성 + portrait 비동기 로드
      const speakerUuids = [];
      data.forEach(speaker => {
        speakerUuids.push({ uuid: speaker.speaker_uuid, name: speaker.name });
        (speaker.styles || []).forEach(style => {
          voicevoxSpeakers.push({
            id: style.id,
            name: translateVvName(speaker.name, style.name),
            nameJp: `${speaker.name} (${style.name})`,
            charName: translateVvName(speaker.name, ''),
            charNameJp: speaker.name,
            speakerUuid: speaker.speaker_uuid
          });
        });
      });

      // 캐릭터 portrait를 백그라운드에서 로드 (실패해도 OK)
      speakerUuids.forEach(async ({ uuid, name }) => {
        try {
          const r = await fetch(`${VOICEVOX_URL}/speaker_info?speaker_uuid=${uuid}`);
          if (!r.ok) return;
          const info = await r.json();
          // portrait (308x308) base64 png
          const portrait = info.portrait ? `data:image/png;base64,${info.portrait}` : null;
          const icon     = info.style_infos?.[0]?.icon ? `data:image/png;base64,${info.style_infos[0].icon}` : null;
          // 해당 uuid의 모든 스타일 ID에 이미지 매핑
          voicevoxSpeakers
            .filter(sp => sp.speakerUuid === uuid)
            .forEach(sp => {
              vvCharPortraits[sp.id] = { portrait, icon, charName: name };
              // style별 아이콘도 매핑
              const styleInfo = info.style_infos?.find(si => si.id === sp.id);
              if (styleInfo?.icon) {
                vvCharPortraits[sp.id].icon = `data:image/png;base64,${styleInfo.icon}`;
              }
            });
          // 화자 설정 UI 이미지 새로고침
          updateVvPortraitUI();
        } catch (e) { /* portrait 로드 실패 무시 */ }
      });

      return true;
    }
  } catch (e) { /* VOICEVOX 미실행 */ }
  voicevoxAvailable = false;
  return false;
}

function updateVvPortraitUI() {
  ['pref-voicevox-speaker1','pref-voicevox-speaker2'].forEach((selId, idx) => {
    const sel = document.getElementById(selId);
    const imgEl = document.getElementById(`vv-portrait-${idx + 1}`);
    if (!sel || !imgEl) return;
    const sid = parseInt(sel.value);
    const info = vvCharPortraits[sid];
    if (info?.icon) {
      imgEl.src = info.icon;
      imgEl.style.display = 'inline-block';
      imgEl.title = info.charName;
    } else {
      imgEl.style.display = 'none';
    }
  });
  // 현재 활성 화자 배지 갱신
  updateActiveSpeakerBadge();
}

// 음파 막대 HTML (3개)
function barsHtml() {
  return `<div class="vvb-bars"><div class="vvb-bar b1"></div><div class="vvb-bar b2"></div><div class="vvb-bar b3"></div></div>`;
}

// Web TTS 제공자 정보 (로고 색상·레이블)
function getVoiceProvider(voice) {
  if (!voice) return null;
  const n = voice.name.toLowerCase();
  if (n.includes('google'))    return { letter: 'G', bg: '#4285F4', label: 'Google' };
  if (n.includes('microsoft')) return { letter: 'M', bg: '#00A4EF', label: 'Microsoft' };
  if (n.includes('apple'))     return { letter: '',  bg: '#555555', label: 'Apple' };
  if (n.includes('samsung'))   return { letter: 'S', bg: '#1428A0', label: 'Samsung' };
  return { letter: '🔊', bg: '#718096', label: getVoiceDisplayName(voice) };
}

// 슬롯 아바타 HTML 생성
function buildSlotAvatarHtml(slot) {
  const useVV = state.prefs.useVoicevox && voicevoxAvailable;

  if (useVV) {
    // VOICEVOX 모드: 캐릭터 초상화
    const sid  = slot === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
    const info = vvCharPortraits[sid];
    const sp   = voicevoxSpeakers.find(s => s.id == sid);
    if (!sp) return null;  // 화자 미설정
    const name = sp.name;
    const avatarHtml = info?.icon
      ? `<img src="${info.icon}" class="vvb-avatar-img">`
      : `<div class="vvb-avatar-emoji">🎤</div>`;
    return { avatarHtml, name };
  } else {
    // Web TTS 모드: slot1=남자(voiceMale), slot2=여자(voiceFemale)
    const vIdx   = slot === 1 ? state.prefs.voiceMale : state.prefs.voiceFemale;
    const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : (state.prefs.charVoice2 || 'none');
    const cv     = CHARACTER_VOICES.find(c => c.id === charId) || CHARACTER_VOICES[0];
    const voice  = (vIdx !== 'none' && vIdx !== undefined && vIdx !== null)
                   ? allJaVoices[parseInt(vIdx)] : null;

    // 화자2 "사용 안함" 체크
    if (slot === 2 && (vIdx === 'none' || vIdx === undefined) && charId === 'none') return null;
    if (slot === 1 && !voice && charId === 'none') {
      // 기본값: 브라우저 TTS
      const avatarHtml = `<div class="vvb-avatar-emoji">🔊</div>`;
      return { avatarHtml, name: '브라우저 TTS' };
    }

    // 캐릭터 프리셋 있으면 이모지 우선
    if (charId !== 'none') {
      const emoji = cv.label.match(/\p{Emoji}/u)?.[0] || '🔊';
      const charName = cv.label.replace(/\p{Emoji}/gu, '').trim() || cv.label;
      const avatarHtml = `<div class="vvb-avatar-emoji">${emoji}</div>`;
      return { avatarHtml, name: charName };
    }

    // 음성 제공자 로고
    const prov = getVoiceProvider(voice);
    if (prov) {
      const avatarHtml = prov.letter.length === 1
        ? `<div class="vvb-avatar-letter" style="background:${prov.bg}">${prov.letter}</div>`
        : `<div class="vvb-avatar-emoji">${prov.letter}</div>`;
      const shortName = voice ? getVoiceDisplayName(voice) : prov.label;
      return { avatarHtml, name: shortName.length > 12 ? prov.label : shortName };
    }
    return null;
  }
}

// 헤더 화자 슬롯 HTML 생성
function buildSlotItemHtml(slot) {
  const info = buildSlotAvatarHtml(slot);
  if (!info) return '';
  // slot1=남자(maleName), slot2=여자(femaleName)
  const roleName = slot === 1
    ? (state.prefs.maleName   || 'スンヒョン')
    : (state.prefs.femaleName || 'ジュヨン');
  const genderEmoji = slot === 1 ? '👨' : '👩';
  const avatarDisplay = info.avatarHtml || `<span>${genderEmoji}</span>`;
  return `
    <div class="hdr-slot" data-slot="${slot}">
      <div class="hdr-slot-avatar-wrap">
        <button class="hdr-slot-avatar" data-slot="${slot}" title="화자 변경 → 설정">${avatarDisplay}</button>
        <div class="hdr-slot-waves">
          <div class="hsw-bar b1"></div>
          <div class="hsw-bar b2"></div>
          <div class="hsw-bar b3"></div>
          <div class="hsw-bar b4"></div>
        </div>
      </div>
      <span class="hdr-slot-name">${roleName}</span>
      <button class="hdr-slot-tts" data-slot="${slot}" title="음성 일시정지/재개">⏸</button>
    </div>`;
}

function updateActiveSpeakerBadge() {
  const badge = document.getElementById('vv-active-badge');
  if (!badge) return;

  const slot1Html = buildSlotItemHtml(1);
  const slot2Html = buildSlotItemHtml(2);

  // 표시할 슬롯이 하나도 없으면 숨김
  if (!slot1Html && !slot2Html) {
    badge.style.display = 'none';
    return;
  }

  badge.innerHTML = slot1Html + slot2Html;
  badge.style.display = 'flex';

  // ─ 아바타 버튼 → 설정 모달 열기 (음성 탭) ─
  badge.querySelectorAll('.hdr-slot-avatar').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('settings-modal').style.display = 'flex';
      // 음성 탭으로 이동
      setTimeout(() => {
        const voiceTab = document.querySelector('.stab[data-tab="voice"]');
        if (voiceTab) voiceTab.click();
        const voiceSection = document.getElementById('webtts-settings') || document.getElementById('voicevox-speaker-rows');
        if (voiceSection) voiceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    });
  });

  // ─ TTS 버튼 → 일시정지 / 재개 ─
  badge.querySelectorAll('.hdr-slot-tts').forEach(btn => {
    btn.addEventListener('click', () => {
      if (_ttsPaused) {
        // 재개
        if (state.prefs.useVoicevox && state.currentVvAudio) {
          state.currentVvAudio.play().catch(() => {});
        }
        _ttsPaused = false;
        _syncTtsButtons();
      } else {
        // 일시정지
        if (state.prefs.useVoicevox && state.currentVvAudio) {
          state.currentVvAudio.pause();
        } else if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        _ttsPaused = true;
        _syncTtsButtons();
      }
    });
  });

  _syncTtsButtons();
}

// TTS 버튼 ⏸/▶ 상태 동기화
function _syncTtsButtons() {
  document.querySelectorAll('.hdr-slot-tts').forEach(btn => {
    btn.textContent = _ttsPaused ? '▶' : '⏸';
    btn.title = _ttsPaused ? '음성 재개' : '음성 일시정지';
    btn.classList.toggle('tts-paused', _ttsPaused);
  });
}

// ─── 대화 스플래시 화자 카드 실시간 갱신 ───
// 설정에서 음성이 변경될 때 스플래시 화면이 열려있으면 즉시 반영
function refreshSplashActors() {
  const splash = document.getElementById('dlg-splash');
  if (!splash) return;  // 스플래시가 표시되지 않은 상태면 무시

  const hasSlot1  = hasSpeakerConfigured(1);
  const hasSlot2  = hasSpeakerConfigured(2);
  const slot1Info = buildSlotAvatarHtml(1);
  const slot2Info = buildSlotAvatarHtml(2);

  // 화자 A 카드 업데이트
  const actorA = splash.querySelector('.dlg-actor-A');
  if (actorA) {
    actorA.querySelector('.dlg-actor-avatar').innerHTML =
      slot1Info ? slot1Info.avatarHtml : '<div class="vvb-avatar-emoji">🔊</div>';
    actorA.querySelector('.dlg-actor-name').textContent =
      slot1Info ? slot1Info.name : '기본 TTS';
  }

  // 화자 B 카드 업데이트
  const actorB = splash.querySelector('.dlg-actor-B');
  if (actorB) {
    actorB.querySelector('.dlg-actor-avatar').innerHTML =
      slot2Info ? slot2Info.avatarHtml : '<div class="vvb-avatar-emoji">🎙️</div>';
    actorB.querySelector('.dlg-actor-name').textContent =
      slot2Info ? slot2Info.name : (hasSlot1 ? '(A와 동일)' : '기본 TTS');
  }

  // 경고/안내 메모 갱신 (있으면 제거하고 재생성)
  splash.querySelector('.dlg-splash-warn')?.remove();
  splash.querySelector('.dlg-splash-note')?.remove();

  // 시작 버튼 앞에 삽입
  const startBtn = splash.querySelector('.dlg-start-btn');
  if (!hasSlot1) {
    const warn = document.createElement('div');
    warn.className = 'dlg-splash-warn';
    warn.innerHTML = `⚠️ 음성이 설정되지 않았습니다.<br>설정에서 음성을 선택하면 각 화자에게 다른 목소리가 할당됩니다.
      <br><button class="dlg-settings-btn" id="dlg-open-settings">⚙️ 설정 열기</button>`;
    warn.querySelector('#dlg-open-settings').onclick = () => {
      document.getElementById('settings-modal').style.display = 'flex';
    };
    splash.insertBefore(warn, startBtn);
  } else if (!hasSlot2) {
    const note = document.createElement('div');
    note.className = 'dlg-splash-note';
    note.textContent = '💡 두 번째 음성이 없으면 A/B 모두 같은 목소리로 재생됩니다.';
    splash.insertBefore(note, startBtn);
  }
}

// VOICEVOX 재생 (wait=true 시 재생 완료까지 대기)
async function playVoicevox(text, speakerId, wait = false) {
  if (speakerId === 'none' || speakerId === undefined || speakerId === null) return false;
  try {
    const qResp = await fetch(`${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`, { method: 'POST' });
    if (!qResp.ok) return false;
    const query = await qResp.json();
    const sResp = await fetch(`${VOICEVOX_URL}/synthesis?speaker=${speakerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });
    if (!sResp.ok) return false;
    const blob = await sResp.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    state.currentVvAudio = audio;
    if (wait) {
      return new Promise((resolve) => {
        audio.onended = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; resolve(true); };
        audio.onerror = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; resolve(false); };
        audio.play().catch(() => resolve(false));
      });
    } else {
      audio.onended = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; };
      await audio.play();
      return true;
    }
  } catch (e) { return false; }
}

function populateVoicevoxSelects() {
  const s1 = document.getElementById('pref-voicevox-speaker1');
  const s2 = document.getElementById('pref-voicevox-speaker2');
  if (!s1 || !s2 || !voicevoxSpeakers.length) return;
  s1.innerHTML = '';
  s2.innerHTML = '<option value="none">사용 안함</option>';
  voicevoxSpeakers.forEach(sp => {
    const o1 = document.createElement('option');
    o1.value = sp.id; o1.textContent = sp.name;
    s1.appendChild(o1);
    const o2 = document.createElement('option');
    o2.value = sp.id; o2.textContent = sp.name;
    s2.appendChild(o2);
  });
  s1.value = String(state.prefs.voicevoxSpeaker1);
  if (state.prefs.voicevoxSpeaker2 !== 'none') {
    s2.value = String(state.prefs.voicevoxSpeaker2);
  }
  // portrait 이미지 초기 표시
  updateVvPortraitUI();
  // 화자 변경 시 portrait 갱신
  s1.addEventListener('change', updateVvPortraitUI);
  s2.addEventListener('change', updateVvPortraitUI);
}

const NATURAL_VOICES    = ['kyoko', 'otoya', 'o-ren', 'haruka', 'ayumi', 'nanami', 'keita', 'ichiro', 'google 日本語'];
const MICROSOFT_VOICES  = ['nanami', 'keita', 'haruka', 'ichiro'];  // Edge/Azure 고품질
const TEST_PHRASE = 'こんにちは！私の声はこんな感じです。よろしくお願いします！';

// ─── 퀴즈 응원 문구 (화자가 1/3 볼륨으로 읽어줌) ───
const QUIZ_CHEERS_KO = {
  start:   ['자, 시작하자! 화이팅!', '좋아! 전력으로 가자!', '시작! 분명 할 수 있어!', '퀴즈 시작! 파이팅!'],
  correct: ['정답! 대단해!', '맞았어! 잘했어!', '딩동댕! 완벽!', '좋아! 역시 잘하네!', '정답! 훌륭해!'],
  wrong:   ['아쉬워! 다음엔 잘하자!', '아깝다! 조금만 더!', '괜찮아! 다음엔 할 수 있어!', '걱정 마, 다음엔 분명!', '신경 쓰지 마, 계속 가자!'],
  streak3: ['3연속 정답! 잘하고 있어!', '멈출 수 없어! 이 기세로!', '3연속! 대단해!'],
  streak5: ['5연속! 너무 잘해!', '완벽한 콤보! 멈출 수 없어!', '5연속 정답! 훌륭해!'],
  streak8: ['헐! 믿을 수 없어! 천재야!', '전설이야! 아무도 못 막아!', '너무 잘해! 천재 인정!'],
  perfect: ['만점! 정말 훌륭해! 천재인가!', '완벽! 이 이상은 없어! 최고!', '백점 만점! 정말 대단해!'],
  good:    ['잘했어! 이 기세로 힘내자!', '정말 잘했어! 계속하자!', '실력 좋은데! 더 연습하자!'],
  pass:    ['그럭저럭이네. 더 연습하자!', '다음엔 더 잘할 수 있어! 포기 마!', '점점 늘고 있어!'],
  poor:    ['어려웠지? 같이 힘내자!', '괜찮아, 연습하면 분명 할 수 있어!', '포기하지 마! 다시 도전하자!'],
};
const QUIZ_CHEERS_JP = {
  start:   ['さあ、始めましょう！頑張ってね！', 'よーし！全力でいこう！', 'じゃあスタート！きっとできる！', 'クイズ開始！ファイト！'],
  correct: ['正解！すごい！', 'その通り！よくできました！', 'ピンポン！完璧！', 'いいね！さすがだね！', '正解！素晴らしい！'],
  wrong:   ['残念！次は頑張ろう！', '惜しい！もう少し！', 'ドンマイ！次はできる！', '大丈夫、次はきっとできるよ！', '気にしないで、続けよう！'],
  streak3: ['三連続正解！調子いいね！', '止まらないね！この調子！', '三連続！すごい！'],
  streak5: ['五連続！すごすぎる！', '完璧なコンボ！止まらない！', '五連続正解！素晴らしい！'],
  streak8: ['えっ！信じられない！天才だ！', '伝説！もう誰も止められない！', 'すごすぎ！天才認定！'],
  perfect: ['満点！本当に素晴らしい！天才かも！', '完璧！これ以上ないよ！最高！', '百点満点！本当にすごい！'],
  good:    ['よくできました！この調子で頑張ろう！', 'すごく良かった！続けよう！', '上手だね！もっと練習しよう！'],
  pass:    ['まあまあかな。もっと練習しましょう！', '次はもっとできるよ！諦めないで！', 'だんだん上手になってるよ！'],
  poor:    ['難しかったね。一緒に頑張ろう！', '大丈夫、練習すれば絶対できる！', '諦めないで！また挑戦しよう！'],
};
function _getQuizCheers() { return _uiTier() === 'beginner' ? QUIZ_CHEERS_KO : QUIZ_CHEERS_JP; }

function _pickCheer(type) {
  const custom = state.prefs.quizCheers && state.prefs.quizCheers[type];
  const cheers = _getQuizCheers();
  const arr = (custom && custom.length > 0) ? custom : cheers[type];
  if (!arr || !arr.length) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

let _cheerBannerTimer = null;
function _showCheerBanner(text, type) {
  if (_cheerBannerTimer) { clearTimeout(_cheerBannerTimer); }
  document.querySelectorAll('.quiz-cheer-banner').forEach(el => el.remove());
  const banner = document.createElement('div');
  const cls = type && ['streak3','streak5','streak8'].includes(type) ? ' ' + type
            : type === 'result' ? ' result' : '';
  banner.className = 'quiz-cheer-banner' + cls;
  banner.textContent = text;
  document.body.appendChild(banner);
  _cheerBannerTimer = setTimeout(() => {
    banner.style.animation = 'cheerOut 0.3s ease forwards';
    setTimeout(() => banner.remove(), 300);
  }, 2200);
}

async function speakCheer(type) {
  if (!state.prefs.quizCheer) return;
  const text = _pickCheer(type);
  if (!text) return;
  const bannerType = type.startsWith('streak') ? type : (type === 'perfect' || type === 'good' || type === 'pass' || type === 'poor' ? 'result' : '');
  _showCheerBanner(text, bannerType);

  // VOICEVOX 모드: 별도 Audio 객체, volume = 0.33, 완료까지 대기
  if (state.prefs.useVoicevox && voicevoxAvailable) {
    const sid = state.prefs.voicevoxSpeaker1;
    if (sid !== 'none' && sid !== undefined && sid !== null) {
      try {
        const qResp = await fetch(`${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${sid}`, { method: 'POST' });
        if (qResp.ok) {
          const query = await qResp.json();
          const sResp = await fetch(`${VOICEVOX_URL}/synthesis?speaker=${sid}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(query)
          });
          if (sResp.ok) {
            const blob = await sResp.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.volume = 0.33;
            await new Promise(r => { audio.onended = () => { URL.revokeObjectURL(url); r(); }; audio.onerror = () => { URL.revokeObjectURL(url); r(); }; audio.play().catch(r); });
            return;
          }
        }
      } catch(e) {}
    }
  }

  // Web TTS: speaker 1, volume 0.33, 완료까지 대기
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const fIdx = state.prefs.voiceFemale;
  const voice1 = (fIdx !== 'none' && fIdx !== undefined && fIdx !== null) ? allJaVoices[parseInt(fIdx)] : (allJaVoices[0] || null);
  const cv1 = CHARACTER_VOICES.find(c => c.id === (state.prefs.charVoice1 || 'none')) || CHARACTER_VOICES[0];
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ja-JP';
  utter.volume = 0.33;
  if (voice1) utter.voice = voice1;
  utter.pitch = cv1.pitch;
  utter.rate = cv1.rate;
  await new Promise(r => { utter.onend = r; utter.onerror = r; window.speechSynthesis.speak(utter); });
}

// 캐릭터 목소리 프리셋 (pitch + rate 조합으로 개성 표현)
const CHARACTER_VOICES = [
  { id: 'none',       label: '없음',         pitch: 1.0,  rate: 0.8  },
  { id: 'anime_girl', label: '🎌 애니 소녀', pitch: 1.85, rate: 1.0  },
  { id: 'child',      label: '🧒 어린이',    pitch: 1.55, rate: 1.1  },
  { id: 'hero',       label: '🦸 용사',      pitch: 0.72, rate: 0.82 },
  { id: 'wizard',     label: '🧙 마법사',    pitch: 0.82, rate: 0.70 },
  { id: 'robot',      label: '🤖 로봇',      pitch: 1.0,  rate: 1.45 },
  { id: 'grandma',    label: '👵 할머니',    pitch: 1.30, rate: 0.62 },
  { id: 'villain',    label: '😈 악당',      pitch: 0.52, rate: 0.80 },
  { id: 'ghost',      label: '👻 유령',      pitch: 1.45, rate: 0.72 },
  { id: 'narrator',   label: '📺 내레이터',  pitch: 0.88, rate: 0.68 },
];

let allJaVoices        = [];
let voicesCached       = false;
let _hasMicrosoftVoice = false;   // Edge/Azure 고품질 음성 보유 여부 (캐시)



function isNaturalVoice(name) {
  return NATURAL_VOICES.some(n => name.toLowerCase().includes(n));
}

function getVoiceDisplayName(v) {
  const name = v.name.toLowerCase();
  const isMicrosoft = MICROSOFT_VOICES.some(n => name.includes(n));
  const isNatural   = !isMicrosoft && isNaturalVoice(v.name);
  const badge = isMicrosoft ? ' 🏆Edge' : isNatural ? ' ⭐' : '';
  const displayName = v.name.replace(/\s*\(.*?\)\s*/g, '').trim();
  return `${displayName}${badge}`;
}

/** 최고 품질 일본어 음성 자동 선택 (Edge TTS 우선) */
function _autoSelectBestVoices() {
  if (!allJaVoices.length) return false;
  const PRIORITY = ['nanami', 'keita', 'haruka', 'ichiro', 'kyoko', 'otoya', 'google 日本語', 'ayumi'];

  const ranked = allJaVoices.map((v, i) => {
    const lc = v.name.toLowerCase();
    const rank = PRIORITY.findIndex(p => lc.includes(p));
    return { i, rank: rank === -1 ? PRIORITY.length : rank };
  }).sort((a, b) => a.rank - b.rank);

  const best  = ranked[0];
  const best2 = ranked.find(r => r.i !== best.i && r.rank <= 4);  // 두 번째 고품질

  if (!best) return false;

  state.prefs.voiceFemale = String(best.i);
  state.prefs.voiceMale   = best2 ? String(best2.i) : 'none';
  restoreVoiceSelects();
  updateActiveSpeakerBadge();
  saveToStorage();

  const v1name = allJaVoices[best.i]?.name || '';
  const v2name = best2 ? allJaVoices[best2.i]?.name || '' : '';
  const msg = v2name
    ? `✅ 화자 A: ${v1name}\n화자 B: ${v2name}`
    : `✅ 화자 A: ${v1name}\n화자 B: 사용 안함`;
  showToast(msg, 3000);
  return true;
}

function loadJapaneseVoices() {
  const voices = window.speechSynthesis.getVoices();
  const jaVoices = voices.filter(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
  if (jaVoices.length === 0) return;

  // 자연스러운 음성 우선, 그 다음 이름순
  allJaVoices = jaVoices.slice().sort((a, b) => {
    const aNat = isNaturalVoice(a.name) ? 0 : 1;
    const bNat = isNaturalVoice(b.name) ? 0 : 1;
    if (aNat !== bNat) return aNat - bNat;
    return a.name.localeCompare(b.name);
  });
  voicesCached       = true;
  _hasMicrosoftVoice = allJaVoices.some(v => MICROSOFT_VOICES.some(n => v.name.toLowerCase().includes(n)));
  populateVoiceSelects();
  updateActiveSpeakerBadge();

  // 처음 실행이고 음성이 설정 안 된 경우 자동 최적 선택
  if (state.prefs.voiceFemale === 'none' && !state.prefs.useVoicevox) {
    _autoSelectBestVoices();
  }
}

function populateVoiceSelects() {
  const femaleSelect = document.getElementById('pref-voice-female');
  const maleSelect = document.getElementById('pref-voice-male');
  if (!femaleSelect || !maleSelect || allJaVoices.length === 0) return;

  // 기존 옵션 제거 ("사용 안함" 유지)
  while (femaleSelect.options.length > 1) femaleSelect.remove(1);
  while (maleSelect.options.length > 1) maleSelect.remove(1);

  allJaVoices.forEach((v, i) => {
    const opt1 = document.createElement('option');
    opt1.value = String(i);
    opt1.textContent = getVoiceDisplayName(v);
    femaleSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = String(i);
    opt2.textContent = getVoiceDisplayName(v);
    maleSelect.appendChild(opt2);
  });

  // 저장된 설정 복원
  restoreVoiceSelects();

  // Edge TTS 배너 표시 여부 결정 (voicesCached 시 1회만 계산된 캐시 사용)
  const hasMicrosoft = _hasMicrosoftVoice;
  const edgeBanner   = document.getElementById('edge-tts-banner');
  const edgeMissing  = document.getElementById('edge-tts-missing');
  const autoRow      = document.getElementById('auto-voice-btn-row');
  if (edgeBanner) edgeBanner.style.display  = hasMicrosoft ? '' : 'none';
  if (edgeMissing) edgeMissing.style.display = hasMicrosoft ? 'none' : '';
  if (autoRow)     autoRow.style.display     = hasMicrosoft ? 'none' : '';
}

function restoreVoiceSelects() {
  const femaleSelect = document.getElementById('pref-voice-female');
  const maleSelect = document.getElementById('pref-voice-male');
  if (!femaleSelect || !maleSelect) return;

  const fv = state.prefs.voiceFemale;
  const mv = state.prefs.voiceMale;

  femaleSelect.value = (fv !== undefined && fv !== null && fv !== 'none') ? String(fv) : 'none';
  maleSelect.value = (mv !== undefined && mv !== null && mv !== 'none') ? String(mv) : 'none';

  // 선택값이 없으면 none으로 복원
  if (!femaleSelect.querySelector(`option[value="${fv}"]`)) femaleSelect.value = 'none';
  if (!maleSelect.querySelector(`option[value="${mv}"]`)) maleSelect.value = 'none';
}

// 음성 목록 로드 (비동기 대응 + 폴링 fallback)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadJapaneseVoices;
  loadJapaneseVoices();
  let voicePollCount = 0;
  const voicePoll = setInterval(() => {
    voicePollCount++;
    if (voicesCached || voicePollCount > 20) { clearInterval(voicePoll); return; }
    loadJapaneseVoices();
  }, 200);
}

// voiceIndex: 시스템 음성 인덱스
function playTestVoice(voiceIndex) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(TEST_PHRASE);
  utter.lang = 'ja-JP';
  utter.rate  = 0.82;
  utter.pitch = 1.0;
  if (voiceIndex !== 'none' && allJaVoices[parseInt(voiceIndex)]) {
    utter.voice = allJaVoices[parseInt(voiceIndex)];
  }
  window.speechSynthesis.speak(utter);
}

// 반환값: { voice, pitch, rate }  — Web TTS 전용
function getVoiceForPlayback() {
  if (!voicesCached) loadJapaneseVoices();

  const fIdx = state.prefs.voiceFemale;  // 첫번째 음성 (기존 필드명 유지)
  const mIdx = state.prefs.voiceMale;    // 두번째 음성

  const voice1 = (fIdx !== 'none' && fIdx !== undefined) ? allJaVoices[parseInt(fIdx)] : null;
  const voice2 = (mIdx !== 'none' && mIdx !== undefined) ? allJaVoices[parseInt(mIdx)] : null;

  // 두 음성 모두 설정된 경우 교대로 사용
  const slots = [];
  if (voice1) slots.push({ voice: voice1, pitch: 1.0, rate: 0.8 });
  if (voice2) slots.push({ voice: voice2, pitch: 1.0, rate: 0.8 });

  if (slots.length === 0) {
    return { voice: allJaVoices[0] || null, pitch: 1.0, rate: 0.8 };
  }
  const slot = slots[state.voiceCallCount % slots.length];
  state.voiceCallCount++;
  return slot;
}

// ═══════════════════════════════════════════════════════════
//  배경음 — MP3 파일 기반 플레이어
// ═══════════════════════════════════════════════════════════
let _ambAudio      = null;   // 현재 재생 중인 Audio 객체
let _ambFadeId     = null;   // 페이드 인터벌 ID
let _ambTracks     = [];     // sounds/index.json 에서 로드한 파일 목록 (대화용)
let _ambQuizTracks = [];     // sounds/quiz/index.json 에서 로드한 파일 목록 (퀴즈용)
let _ambDucked     = false;  // TTS 발화 중 볼륨 낮춤 여부
let _ambCurrentMode  = 'dialogue'; // 현재 재생 모드 추적
let _ambDlgReduced   = false;      // 대화 진행 중 볼륨 축소 플래그
let _ttsPaused           = false;  // 화자 배지 클릭으로 TTS 일시정지 중
let _hideVoiceBadgeTimer = null;   // TTS 종료 후 배지 지연 숨김 타이머

// 앱 시작 시 1회 — 트랙 목록 로드 (대화 + 퀴즈 동시)
async function loadAmbientTracks() {
  const toUrl = path => (typeof chrome !== 'undefined' && chrome.runtime?.getURL)
                        ? chrome.runtime.getURL(path)
                        : path;
  try {
    const resp = await fetch(toUrl('sounds/index.json'));
    if (resp.ok) _ambTracks = await resp.json();
  } catch(e) { _ambTracks = []; }
  try {
    const resp = await fetch(toUrl('sounds/quiz/index.json'));
    if (resp.ok) _ambQuizTracks = await resp.json();
  } catch(e) { _ambQuizTracks = []; }
}

// 현재 재생 중인 트랙을 제외하고 랜덤 선택
// mode: 'quiz' → _ambQuizTracks (비어있으면 _ambTracks 폴백)
function _pickAmbTrack(mode) {
  const pool0 = (mode === 'quiz' && _ambQuizTracks.length) ? _ambQuizTracks : _ambTracks;
  if (!pool0.length) return null;
  const current = _ambAudio?._trackName;
  const pool    = pool0.length > 1 ? pool0.filter(t => t !== current) : pool0;
  return pool[Math.floor(Math.random() * pool.length)];
}

// 볼륨을 targetVol 까지 durationMs 동안 서서히 변경
function _ambFadeTo(audio, targetVol, durationMs, onDone) {
  if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }
  const startVol = audio.volume;
  const steps    = Math.max(1, Math.round(durationMs / 50));
  const delta    = (targetVol - startVol) / steps;
  let   n        = 0;
  _ambFadeId = setInterval(() => {
    if (!_ambAudio || _ambAudio !== audio) { clearInterval(_ambFadeId); _ambFadeId = null; return; }
    n++;
    audio.volume = Math.max(0, Math.min(1, startVol + delta * n));
    if (n >= steps) {
      clearInterval(_ambFadeId); _ambFadeId = null;
      audio.volume = targetVol;
      if (onDone) onDone();
    }
  }, 50);
}

// 현재 설정 볼륨 (0~1)
function _ambTargetVol() {
  return Math.max(0, Math.min(1, (state.prefs.ambientVolume ?? 0.18)));
}

// ── startAmbient: type = 'on' | 'none',  mode = 'dialogue' | 'quiz' ──
function startAmbient(type, mode = 'dialogue') {
  stopAmbient(0.4);
  const trackList = (mode === 'quiz' && _ambQuizTracks.length) ? _ambQuizTracks : _ambTracks;
  if (!type || type === 'none' || !trackList.length) return;

  const file = _pickAmbTrack(mode);
  if (!file) return;

  // 퀴즈 전용 폴더 사용 여부 결정
  const folder = (mode === 'quiz' && _ambQuizTracks.length) ? 'sounds/quiz/' : 'sounds/';
  const url    = (typeof chrome !== 'undefined' && chrome.runtime?.getURL)
                 ? chrome.runtime.getURL(folder + file)
                 : folder + file;

  const audio      = new Audio(url);
  audio._trackName = file;
  audio.loop       = true;
  audio.volume     = 0;
  _ambAudio        = audio;
  _ambDucked       = false;
  _ambCurrentMode  = mode;

  audio.play().catch(() => { if (_ambAudio === audio) _ambAudio = null; });
  // 인트로: 사용자 설정의 2.5배 볼륨으로 페이드인 (최대 0.65)
  const introVol = Math.min(0.65, _ambTargetVol() * 2.5);
  _ambFadeTo(audio, introVol, 2000);
  showAmbientBadge(mode, file);
}

// ── stopAmbient: fadeTime(초) 동안 페이드아웃 후 정지 ─────────
// showStopped=true 이면 정지 배지 표시(대화 완료시), false 이면 그냥 숨김(뷰 이동 시)
function stopAmbient(fadeTime = 2.0, showStopped = true) {
  if (!_ambAudio) return;
  const audio = _ambAudio;
  _ambAudio  = null;   // 즉시 null → 다음 startAmbient가 새 오디오 시작 가능
  _ambDucked = false;
  if (showStopped) showAmbientBadgeStopped(_ambCurrentMode);
  else hideAmbientBadge();

  // ★ _ambFadeTo는 _ambAudio가 null이면 즉시 멈추므로, 페이드아웃은 로컬 인터벌로 처리
  if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }
  const startVol = audio.volume;
  if (startVol <= 0 || fadeTime <= 0) { audio.pause(); return; }
  const steps = Math.max(1, Math.round((fadeTime * 1000) / 50));
  const delta = startVol / steps;   // 매 스텝 줄일 양
  let n = 0;
  const tid = setInterval(() => {
    n++;
    audio.volume = Math.max(0, startVol - delta * n);
    if (n >= steps) {
      clearInterval(tid);
      audio.volume = 0;
      audio.pause();
    }
  }, 50);
}

// ── 하단 바 표시/숨김 동기화 ────────────────────────────────
function syncSidebarVisibility() {
  // right-sidebar는 헤더로 이동됨 — 아이콘 버튼 토글만 수행
  syncHdrIconButtons();
}

// ── 화자 배지 표시 (TTS 발화 시작 시 호출) ───────────────────
// 헤더에 항상 표시이므로 TTS 버튼 상태만 업데이트
function showVoiceBadge() {
  clearTimeout(_hideVoiceBadgeTimer);
  _hideVoiceBadgeTimer = null;
  updateActiveSpeakerBadge();
  _syncTtsButtons();
}

// ── 화자 배지 지연 숨김 → 헤더 상시 표시이므로 버튼 상태만 갱신 ─
function scheduleHideVoiceBadge(delay = 1500) {
  clearTimeout(_hideVoiceBadgeTimer);
  _hideVoiceBadgeTimer = setTimeout(() => {
    _hideVoiceBadgeTimer = null;
    _syncTtsButtons();
  }, delay);
}

// ── 화자 배지 즉시 숨김 (명시적 중지) ────────────────
function hideVoiceBadgeNow() {
  clearTimeout(_hideVoiceBadgeTimer);
  _hideVoiceBadgeTimer = null;
  _ttsPaused = false;
  _syncTtsButtons();
}

// ── 배경음악 재생 배지 표시/숨기기 ───────────────────────────
function showAmbientBadge(mode, file) {
  const badge = document.getElementById('ambient-music-badge');
  if (!badge) return;
  const isQuiz = mode === 'quiz';
  const color  = isQuiz ? '#6366f1' : '#10b981';
  const icon   = isQuiz ? '🎮' : '🎵';
  // 헤더 compact 버전: 이모지 + 파형 바
  badge.innerHTML = `
    <span style="font-size:13px">${icon}</span>
    <div class="amb-badge-waves" style="height:14px">
      <div class="amb-wave-bar w1" style="background:${color}"></div>
      <div class="amb-wave-bar w2" style="background:${color}"></div>
      <div class="amb-wave-bar w3" style="background:${color}"></div>
      <div class="amb-wave-bar w4" style="background:${color}"></div>
    </div>`;
  badge.classList.remove('stopping');
  badge.classList.add('playing');
  badge.style.display = 'flex';
  badge.style.borderColor = color + '88';
  badge.style.background = isQuiz ? 'rgba(237,233,254,.95)' : 'rgba(240,253,244,.95)';
  // 클릭 → 정지
  badge.onclick = () => stopAmbient(1.2);
  syncSidebarVisibility();
  updateHqAmbientLabel();
}

function hideAmbientBadge() {
  const badge = document.getElementById('ambient-music-badge');
  if (!badge) return;
  badge.classList.remove('stopping', 'playing');
  badge.innerHTML = `<span style="font-size:13px">🎵</span><span style="font-size:10px;color:var(--gray)">배경음</span>`;
  badge.style.display = 'flex'; // 항상 표시 유지
  badge.style.borderColor = '';
  badge.style.background = '';
  badge.onclick = () => startAmbient('on', 'dialogue');
  syncSidebarVisibility();
  updateHqAmbientLabel();
}

// ── 배경음 정지 상태 배지 (클릭 시 재시작 가능) ────────────
function showAmbientBadgeStopped(mode) {
  const badge = document.getElementById('ambient-music-badge');
  if (!badge) return;
  const icon = mode === 'quiz' ? '🎮' : '🎵';
  badge.classList.remove('stopping');
  badge.innerHTML = `<span style="font-size:13px">🎵</span><span style="font-size:10px;color:var(--gray)">배경음</span>`;
  badge.style.display = 'flex';
  badge.style.borderColor = 'var(--border)';
  badge.style.background = 'var(--gray-light)';
  badge.onclick = () => startAmbient('on', mode || 'dialogue');
  syncSidebarVisibility();
  updateHqAmbientLabel();
}

// ── duckAmbient: TTS 발화 시 배경음 낮추기 ───────────────────
function duckAmbient() {
  if (!_ambAudio || _ambDucked) return;
  _ambDucked = true;
  _ambFadeTo(_ambAudio, _ambTargetVol() * 0.20, 300);
}

// ── unduckAmbient: TTS 끝나면 원래 볼륨으로 복귀 ─────────────
function unduckAmbient() {
  if (!_ambAudio || !_ambDucked) return;
  _ambDucked = false;
  // 대화 진행 중이면 40% 수준으로 복귀, 아니면 100%
  const restoreVol = _ambDlgReduced ? _ambTargetVol() * 0.40 : _ambTargetVol();
  _ambFadeTo(_ambAudio, restoreVol, 700);
}

// ── 대화 모드 진입: 인트로 후 배경음 40%로 축소 ─────────────
function enterDialogueMode() {
  _ambDlgReduced = true;
  if (_ambAudio && !_ambDucked) {
    _ambFadeTo(_ambAudio, _ambTargetVol() * 0.40, 1500);
  }
}

// ── 대화 모드 종료: 볼륨 올렸다가 4초 페이드아웃 ───────────
function exitDialogueMode() {
  _ambDlgReduced = false;
  stopAmbientLoud();
}

// ── stopAmbientLoud: 인트로 볼륨까지 올린 뒤 4초 페이드아웃 ─
function stopAmbientLoud() {
  if (!_ambAudio) return;
  const audio = _ambAudio;
  _ambAudio  = null;  // 즉시 null → 새 startAmbient 허용
  _ambDucked = false;
  hideAmbientBadge();
  if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }

  const introVol  = Math.min(0.65, (state.prefs.ambientVolume ?? 0.18) * 2.5);
  const startVol  = audio.volume;
  const rampSteps = Math.max(1, Math.round(1200 / 50));
  const deltaUp   = (introVol - startVol) / rampSteps;
  let n = 0;
  // Phase 1: 볼륨 올리기 (1.2초)
  const tid1 = setInterval(() => {
    n++;
    audio.volume = Math.max(0, Math.min(1, startVol + deltaUp * n));
    if (n >= rampSteps) {
      clearInterval(tid1);
      // Phase 2: 4초 페이드아웃
      const outSteps = Math.max(1, Math.round(4000 / 50));
      const deltaOut = audio.volume / outSteps;
      let m = 0;
      const tid2 = setInterval(() => {
        m++;
        audio.volume = Math.max(0, audio.volume - deltaOut);
        if (m >= outSteps) { clearInterval(tid2); audio.volume = 0; audio.pause(); }
      }, 50);
    }
  }, 50);
}

// ── 퀴즈 결과 시 배경음: 크게 올렸다가 5초 유지 후 5초 페이드아웃 ──
function stopQuizAmbientLoud() {
  if (!_ambAudio) return;
  const audio = _ambAudio;
  _ambAudio  = null;
  _ambDucked = false;
  hideAmbientBadge();
  if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }

  const introVol  = Math.min(0.65, (state.prefs.ambientVolume ?? 0.18) * 2.5);
  const startVol  = audio.volume;
  const rampSteps = Math.max(1, Math.round(1000 / 50));
  const deltaUp   = (introVol - startVol) / rampSteps;
  let n = 0;
  // Phase 1: 볼륨 올리기 (1초)
  const tid1 = setInterval(() => {
    n++;
    audio.volume = Math.max(0, Math.min(1, startVol + deltaUp * n));
    if (n >= rampSteps) {
      clearInterval(tid1);
      // Phase 2: 5초 유지
      setTimeout(() => {
        // Phase 3: 5초 페이드아웃
        const outSteps = Math.max(1, Math.round(5000 / 50));
        const deltaOut = audio.volume / outSteps;
        let m = 0;
        const tid3 = setInterval(() => {
          m++;
          audio.volume = Math.max(0, audio.volume - deltaOut);
          if (m >= outSteps) { clearInterval(tid3); audio.volume = 0; audio.pause(); }
        }, 50);
      }, 5000);
    }
  }, 50);
}

// ── 시간 초과 시 일본어로 TTS ──
function _speakTimeoutJa() {
  const text = '時間切れです';
  if (state.prefs.useVoicevox && voicevoxAvailable) {
    const sid = state.prefs.voicevoxSpeaker1;
    if (sid !== 'none' && sid !== undefined && sid !== null) {
      fetch(`${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${sid}`, { method: 'POST' })
        .then(r => r.ok ? r.json() : null)
        .then(query => query ? fetch(`${VOICEVOX_URL}/synthesis?speaker=${sid}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(query)
        }) : null)
        .then(r => r && r.ok ? r.blob() : null)
        .then(blob => { if (blob) { const a = new Audio(URL.createObjectURL(blob)); a.volume = 0.55; a.play().catch(()=>{}); } })
        .catch(() => {});
      return;
    }
  }
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const fIdx = state.prefs.voiceFemale;
  const voice = (fIdx !== 'none' && fIdx !== undefined && fIdx !== null)
    ? allJaVoices[parseInt(fIdx)]
    : (allJaVoices[0] || null);
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ja-JP'; utter.volume = 0.6; utter.rate = 0.9;
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

// playAudio: 모든 발음이 완전히 끝날 때까지 대기하는 Promise 반환
async function playAudio(kana) {
  if (!kana) return;
  duckAmbient();

  // ── Edge TTS 서버 (최우선) ──
  if (state.prefs.useEdgeTTS && typeof EdgeTTSModule !== 'undefined' && EdgeTTSModule.isAvailable()) {
    const ok = await EdgeTTSModule.speak(kana, 1, 1.0);
    if (ok) { unduckAmbient(); return; }
  }

  // ── VOICEVOX: 화자1 완전히 끝난 후 → 800ms → 화자2 완전히 끝난 후 resolve ──
  if (state.prefs.useVoicevox && voicevoxAvailable) {
    const s1 = state.prefs.voicevoxSpeaker1;
    const s2 = state.prefs.voicevoxSpeaker2;
    const hasS1 = s1 !== 'none' && s1 !== undefined && s1 !== null;
    const hasS2 = s2 !== 'none' && s2 !== undefined && s2 !== null;

    if (hasS1) {
      showSpeakingIndicator(s1, 1);
      const ok = await playVoicevox(kana, s1, /* wait= */ true); // 항상 완료 대기
      hideSpeakingIndicator();

      if (ok && hasS2 && !state.audioStopped) {
        await new Promise(r => setTimeout(r, 800));
        if (!state.audioStopped) {
          showSpeakingIndicator(s2, 2);
          await playVoicevox(kana, s2, /* wait= */ true); // 화자2도 완료 대기
          hideSpeakingIndicator();
        }
      }
      if (ok) return;
      // VOICEVOX 실패 → Web TTS fallback
    }
  }

  // ── Web Speech API: Promise로 감싸 완전히 끝날 때까지 대기 ──
  if (!window.speechSynthesis) {
    showToast('이 브라우저는 음성 합성을 지원하지 않습니다.');
    return;
  }
  window.speechSynthesis.cancel();

  const fIdx = state.prefs.voiceFemale;
  const mIdx = state.prefs.voiceMale;
  const voice1 = (fIdx !== 'none' && fIdx !== undefined) ? allJaVoices[parseInt(fIdx)] : null;
  const voice2 = (mIdx !== 'none' && mIdx !== undefined) ? allJaVoices[parseInt(mIdx)] : null;
  const charPref1 = state.prefs.charVoice1 || 'none';
  const charPref2 = state.prefs.charVoice2 || 'none';
  const cv1 = CHARACTER_VOICES.find(c => c.id === charPref1) || CHARACTER_VOICES[0];
  const cv2 = CHARACTER_VOICES.find(c => c.id === charPref2) || CHARACTER_VOICES[0];
  const webName1 = voice1 ? getVoiceDisplayName(voice1) : (cv1.id !== 'none' ? cv1.label : '음성1');
  const webName2 = voice2 ? getVoiceDisplayName(voice2) : (cv2.id !== 'none' ? cv2.label : '음성2');
  const hasWebV2 = voice2 || (charPref2 && charPref2 !== 'none');

  // Promise로 발음 완료까지 대기
  function speakAndWait(voice, pitch, rate, label, slot) {
    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(kana);
      utter.lang  = 'ja-JP';
      if (voice) utter.voice = voice;
      utter.pitch = pitch;
      utter.rate  = rate;
      utter.onstart = () => showSpeakingIndicatorWeb(label, slot);
      utter.onend   = () => { hideSpeakingIndicator(); resolve(); };
      utter.onerror = () => { hideSpeakingIndicator(); resolve(); };
      window.speechSynthesis.speak(utter);
    });
  }

  await speakAndWait(voice1 || allJaVoices[0] || null, cv1.pitch, cv1.rate, webName1, 1);

  if (hasWebV2 && !state.audioStopped) {
    await new Promise(r => setTimeout(r, 800));
    if (!state.audioStopped) {
      await speakAndWait(voice2 || allJaVoices[0] || null, cv2.pitch, cv2.rate, webName2, 2);
    }
  }
  unduckAmbient();
}

// ─── 단일 화자 슬롯으로만 재생 (대화 모드 전용) ───
// slot 1 = A (학습자), slot 2 = B (상대방)
async function playAudioSlot(text, slot) {
  if (!text || state.audioStopped) return;
  duckAmbient();

  // Edge TTS 서버 (최우선)
  if (state.prefs.useEdgeTTS && typeof EdgeTTSModule !== 'undefined' && EdgeTTSModule.isAvailable()) {
    const ok = await EdgeTTSModule.speak(text, slot, 1.0);
    if (ok) { unduckAmbient(); return; }
  }

  // VOICEVOX 모드
  if (state.prefs.useVoicevox && voicevoxAvailable) {
    let sid;
    if (slot === 1) {
      sid = state.prefs.voicevoxSpeaker1;
    } else if (slot === 2) {
      sid = state.prefs.voicevoxSpeaker2;
    } else {
      // 슬롯3 (C 화자): speaker1/2와 다른 화자 자동 선택
      const s1 = state.prefs.voicevoxSpeaker1;
      const s2 = state.prefs.voicevoxSpeaker2;
      const other = voicevoxSpeakers.find(sp => sp.id != s1 && sp.id != s2);
      sid = other ? other.id : s1;
    }
    // 슬롯2 미설정 시 슬롯1로 폴백
    const useSid = (sid === 'none' || sid === undefined || sid === null)
                   ? state.prefs.voicevoxSpeaker1 : sid;
    if (useSid !== 'none' && useSid !== undefined && useSid !== null) {
      showSpeakingIndicator(useSid, slot);
      await playVoicevox(text, useSid, true);
      hideSpeakingIndicator();
      unduckAmbient();
      return;
    }
  }

  // Web TTS 모드
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // slot1=남자(voiceMale), slot2=여자(voiceFemale), slot3=직원(voiceFemale)
  const vIdx   = slot === 1 ? state.prefs.voiceMale : slot === 2 ? state.prefs.voiceFemale : state.prefs.voiceFemale;
  const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : slot === 2 ? (state.prefs.charVoice2 || 'none') : (state.prefs.charVoice2 || 'none');
  const cv     = CHARACTER_VOICES.find(c => c.id === charId) || CHARACTER_VOICES[0];

  // 슬롯2 미설정이면 슬롯1 설정으로 폴백
  const useVIdx   = (slot >= 2 && (vIdx === 'none' || vIdx === undefined) && charId === 'none')
                    ? state.prefs.voiceFemale : vIdx;
  const useCv     = (slot === 2 && charId === 'none')
                    ? (CHARACTER_VOICES.find(c => c.id === (state.prefs.charVoice1||'none')) || CHARACTER_VOICES[0])
                    : cv;

  // 슬롯3(C)는 다른 목소리로 구분: 두번째 ja 음성 or 피치 1.25
  const voice = slot === 3
    ? (allJaVoices[1] || allJaVoices[0] || null)
    : (useVIdx !== 'none' && useVIdx !== undefined)
      ? allJaVoices[parseInt(useVIdx)] : (allJaVoices[0] || null);

  const avatarInfo = slot < 3 ? buildSlotAvatarHtml(slot) : null;
  const label = avatarInfo?.name || (slot === 1 ? 'A' : slot === 2 ? 'B' : '주변인');

  await new Promise((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'ja-JP';
    if (voice) utter.voice = voice;
    // 슬롯3(C): 피치를 살짝 높여 A/B와 구분
    utter.pitch = slot === 3 ? 1.25 : (useCv.pitch || 1.0);
    utter.rate  = slot === 3 ? 0.82 : (useCv.rate  || 0.8);
    utter.onstart = () => showSpeakingIndicatorWeb(label, slot);
    utter.onend   = () => { hideSpeakingIndicator(); unduckAmbient(); resolve(); };
    utter.onerror = () => { hideSpeakingIndicator(); unduckAmbient(); resolve(); };
    window.speechSynthesis.speak(utter);
  });
}

// 화자 슬롯 설정 여부 확인
function hasSpeakerConfigured(slot) {
  if (state.prefs.useVoicevox && voicevoxAvailable) {
    const sid = slot === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
    return sid !== 'none' && sid !== undefined && sid !== null;
  }
  // slot1=남자(voiceMale), slot2=여자(voiceFemale)
  const vIdx   = slot === 1 ? state.prefs.voiceMale : state.prefs.voiceFemale;
  const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : (state.prefs.charVoice2 || 'none');
  if (slot === 1) return true; // 슬롯1은 항상 브라우저 기본 TTS라도 사용 가능
  return (vIdx !== 'none' && vIdx !== undefined) || charId !== 'none';
}

// ─── 발화 인디케이터 (어떤 캐릭터가 지금 말하는지) ───
// 우측 배지 — 발음 중인 슬롯 애니메이션

function highlightBadgeSlot(slot) {
  const badge = document.getElementById('vv-active-badge');
  if (!badge) return;
  // 모든 슬롯 초기화 (.vvb-item + .hdr-slot 모두)
  badge.querySelectorAll('.vvb-item, .hdr-slot').forEach(el => {
    el.classList.remove('speaking', 'speaking-2');
  });
  // 해당 슬롯만 강조
  const target = badge.querySelector(`[data-slot="${slot}"]`);
  if (target) target.classList.add(slot === 2 ? 'speaking-2' : 'speaking');
}

function clearBadgeSlot() {
  const badge = document.getElementById('vv-active-badge');
  if (!badge) return;
  badge.querySelectorAll('.vvb-item, .hdr-slot').forEach(el => {
    el.classList.remove('speaking', 'speaking-2');
  });
}

// 발음 시작 — 배지 표시 + 슬롯 애니메이션
function showSpeakingIndicator(speakerId, slot) {
  showVoiceBadge();         // 배지 표시 (이미 표시 중이면 타이머 취소만)
  highlightBadgeSlot(slot);
}

function showSpeakingIndicatorWeb(label, slot) {
  showVoiceBadge();
  highlightBadgeSlot(slot);
}

// 발음 종료 — 슬롯 애니메이션 해제 + 배지 지연 숨김 (1.5s 디바운스)
function hideSpeakingIndicator() {
  clearBadgeSlot();
  scheduleHideVoiceBadge(1500);  // 다음 문장이 오면 타이머가 취소됨
}

// ─── stopAllAudio / startReadAll (오디오 관련 유틸) ───
function stopAllAudio() {
  // 사용자 중지 플래그 세팅 (playAudio 내 2번째 화자 차단용)
  state.audioStopped = true;
  setTimeout(() => { state.audioStopped = false; }, 200); // 짧은 시간 후 리셋

  // 전체 듣기 타이머 취소
  clearTimeout(ss.readAllTimer);
  ss.readAllTimer = null;
  state.isReadingAll = false;

  // Web TTS 중지
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // VOICEVOX 오디오 중지
  if (state.currentVvAudio) {
    try { state.currentVvAudio.pause(); state.currentVvAudio.src = ''; } catch(e) {}
    state.currentVvAudio = null;
  }

  // 발화 인디케이터 + 화자 배지 즉시 숨김 (일시정지 상태도 해제)
  hideVoiceBadgeNow();
  hideSpeakingIndicator();

  // 버튼 복원 (kana 일람 + vocab 일람)
  const btn = document.getElementById('bc-readall-btn');
  if (btn) { btn.textContent = '🔊 전체 듣기'; btn.classList.remove('bc-active'); }
  const vbtn = document.getElementById('vbc-readall-btn');
  if (vbtn) { vbtn.textContent = '🔊 전체 듣기'; vbtn.classList.remove('bc-active'); }

  // 플로팅 중지 버튼 숨김
  const fab = document.getElementById('stop-audio-fab');
  if (fab) fab.style.display = 'none';
}

// ─── 전체 듣기 (순서대로 TTS 재생) ───
function startReadAll(chars) {
  stopAllAudio();
  state.isReadingAll = true;

  // 버튼 상태 → 중지
  const btn = document.getElementById('bc-readall-btn');
  if (btn) { btn.textContent = '⏹ 중지'; btn.classList.add('bc-active'); }

  // 플로팅 중지 버튼 표시
  const fab = document.getElementById('stop-audio-fab');
  if (fab) fab.style.display = 'flex';

  // 화자 2명이면 번갈아 읽기, 1명이면 순서대로
  const hasDualSpeaker = hasSpeakerConfigured(2);

  let i = 0;
  function next() {
    if (!state.isReadingAll || i >= chars.length) {
      if (i >= chars.length) showToast('번갈아 듣기 완료! ✓');
      stopAllAudio();
      return;
    }
    const slot = hasDualSpeaker ? (i % 2 === 0 ? 1 : 2) : 1;
    playAudioSlot(chars[i].kana, slot).then(() => {
      i++;
      if (state.isReadingAll) ss.readAllTimer = setTimeout(next, 400);
    });
  }
  showToast(hasDualSpeaker
    ? `🎤 번갈아 듣기 (${chars.length}자) — 버튼을 다시 누르면 중지`
    : `🔊 전체 ${chars.length}자 듣기 시작 — 버튼을 다시 누르면 중지`);
  next();
}

// ─── buildSplashSpeakerPicker
// 원본에서 renderSimDialogue 내부 중첩 함수로 정의됨.
// splash 엘리먼트와 refreshActorDisplay 콜백을 파라미터로 받도록 추출.
function buildSplashSpeakerPicker(slotNum, splash, refreshActorDisplay) {
  const sel = slotNum === 1 ? '.dlg-actor-A' : '.dlg-actor-B';
  const actorEl = splash.querySelector(sel);
  if (!actorEl) return;
  const useVV = state.prefs.useVoicevox && voicevoxAvailable;
  const picker = document.createElement('select');
  picker.className = 'dlg-speaker-pick';

  if (useVV && voicevoxSpeakers.length) {
    const curId = slotNum === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
    if (slotNum === 2) {
      const nOpt = document.createElement('option');
      nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
      if (curId === 'none') nOpt.selected = true;
      picker.appendChild(nOpt);
    }
    voicevoxSpeakers.forEach(sp => {
      const opt = document.createElement('option');
      opt.value = sp.id; opt.textContent = sp.name;
      if (String(sp.id) === String(curId)) opt.selected = true;
      picker.appendChild(opt);
    });
    picker.onchange = () => {
      const val = picker.value === 'none' ? 'none' : parseInt(picker.value);
      if (slotNum === 1) state.prefs.voicevoxSpeaker1 = val;
      else               state.prefs.voicevoxSpeaker2 = val;
      saveToStorage();
      refreshActorDisplay(slotNum);
    };
  } else if (allJaVoices.length) {
    const curV = slotNum === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
    const nOpt = document.createElement('option');
    nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
    if (!curV || curV === 'none') nOpt.selected = true;
    picker.appendChild(nOpt);
    allJaVoices.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = String(i); opt.textContent = getVoiceDisplayName(v);
      if (String(i) === String(curV)) opt.selected = true;
      picker.appendChild(opt);
    });
    picker.onchange = () => {
      if (slotNum === 1) state.prefs.voiceFemale = picker.value;
      else               state.prefs.voiceMale   = picker.value;
      saveToStorage();
      refreshActorDisplay(slotNum);
    };
  } else {
    return; // 선택할 화자 없음
  }
  actorEl.appendChild(picker);
}

// ─── 내보내기 ───
export {
  // VOICEVOX
  checkVoicevox, voicevoxAvailable, voicevoxSpeakers, vvCharPortraits,
  updateVvPortraitUI, populateVoicevoxSelects, refreshSplashActors,
  buildSlotAvatarHtml, buildSlotItemHtml, updateActiveSpeakerBadge,
  // Web TTS
  allJaVoices, voicesCached, CHARACTER_VOICES, NATURAL_VOICES, MICROSOFT_VOICES,
  loadJapaneseVoices, populateVoiceSelects, restoreVoiceSelects,
  playTestVoice, getVoiceForPlayback, getVoiceDisplayName,
  _autoSelectBestVoices, _hasMicrosoftVoice,
  // Playback
  playAudio, playAudioSlot, playVoicevox, hasSpeakerConfigured,
  stopAllAudio, startReadAll,
  // Ambient
  loadAmbientTracks, startAmbient, stopAmbient, syncSidebarVisibility,
  duckAmbient, unduckAmbient, enterDialogueMode, exitDialogueMode,
  stopAmbientLoud, stopQuizAmbientLoud,
  // Indicators
  showVoiceBadge, hideVoiceBadgeNow, showAmbientBadge, hideAmbientBadge,
  showSpeakingIndicator, showSpeakingIndicatorWeb, hideSpeakingIndicator,
  // Quiz cheers
  speakCheer, QUIZ_CHEERS_KO, QUIZ_CHEERS_JP,
  // Splash/speaker picker
  buildSplashSpeakerPicker,
};
