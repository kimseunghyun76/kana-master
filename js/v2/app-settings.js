/* ============================================================
   App Settings and Dev Tools
   ============================================================ */

'use strict';

function createAppSettings(deps = {}) {
  const refreshHome = deps.refreshHome || (() => {});
  const refreshLesson = deps.refreshLesson || (() => {});
  const refreshPractice = deps.refreshPractice || (() => {});
  const refreshProfile = deps.refreshProfile || (() => {});
  const getFlow = deps.getFlow || (() => null);
  const setFlowStep = deps.setFlowStep || (() => {});
  const runCurrentStep = deps.runCurrentStep || (() => {});

  function refreshAll() {
    refreshHome();
    refreshLesson();
    refreshPractice();
    refreshProfile();
  }

  function buildTTSSettingsHtml() {
    const engine  = TTS.getEngineName();
    const voices  = TTS.getAvailableVoices();
    const curDef  = TTS.getDefaultVoice();
    const curA    = TTS.getRoleVoice('A');
    const curB    = TTS.getRoleVoice('B');
    const curC    = TTS.getRoleVoice('C');
    const stats   = TTS.getStats();

    const makeRow = (label, color, currentKey, setterFn, testText) => {
      if (!voices.length) return '';
      return `
        <div style="margin-bottom:14px">
          <div style="font-size:12px;color:${color};margin-bottom:6px;font-weight:600">${escHtml(label)}</div>
          ${VoiceCharacters.picker(voices, currentKey, setterFn, { compact: true })}
          <button onclick="TTS.speak('${testText}', {voice:'${currentKey}'})"
            style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                   border-radius:8px;color:var(--text2);font-size:12px;cursor:pointer;margin-top:6px">
            🔊 테스트 재생
          </button>
        </div>
      `;
    };

    let html = `
      <div style="font-size:12px;color:var(--text3);margin-bottom:12px">
        엔진: <strong style="color:var(--accent2)">${escHtml(engine)}</strong>
        ${stats.manifestLoaded ? ` · 사전생성 ${stats.itemCount}개 단어` : ''}
      </div>
      ${makeRow('🎯 기본 발음 (단어/문장 듣기)',  'var(--accent2)', curDef, 'App.setVoiceDefault', 'おはようございます')}
      ${makeRow('🧑‍🎓 롤플레이 — 나 (학습자)',     '#34d399',         curA,   'App.setVoiceRoleA',  'よろしくお願いします')}
      ${makeRow('💬 롤플레이 — 상대방 (점원·친구)', '#fb923c',         curB,   'App.setVoiceRoleB',  'いらっしゃいませ。')}
      ${makeRow('🎭 롤플레이 — 제3자',             '#c084fc',         curC,   'App.setVoiceRoleC',  '少々お待ちください')}
    `;

    if (!stats.manifestLoaded) {
      html += `
        <div style="font-size:11px;color:var(--text3);padding:8px;background:var(--bg3);border-radius:8px;margin-top:8px">
          ⚠️ 사전 생성된 음성을 불러오지 못했습니다. 브라우저 기본(${escHtml(TTS.getWebSpeechVoiceName())})으로 재생됩니다.
        </div>
      `;
    }
    return html;
  }

  function setVoiceDefault(key) {
    TTS.setDefaultVoice(key);
    showToast('기본 발음 화자 변경');
    TTS.speak('おはようございます', { voice: key });
    refreshProfile();
  }

  function setVoiceRoleA(key) {
    setVoiceRole('A', key);
  }

  function setVoiceRoleB(key) {
    setVoiceRole('B', key);
  }

  function setVoiceRoleC(key) {
    setVoiceRole('C', key);
  }

  function setVoiceRole(role, key) {
    TTS.setRoleVoice(role, key);
    const labels = { A: '나(A)', B: '상대방(B)', C: '제3자(C)' };
    const tests = { A: 'よろしくお願いします', B: 'いらっしゃいませ', C: '少々お待ちください' };
    showToast(`${labels[role] || role} 화자 변경`);
    TTS.speak(tests[role] || 'よろしくお願いします', { voice: key });
    refreshProfile();
  }

  function devMenu() {
    const flow = getFlow();
    const xp = Store.get().xp;
    const modName = flow?.moduleId
      ? (MODULES.find(m => m.id === flow.moduleId)?.name || flow.moduleId)
      : '없음';
    const stepInfo = flow?.step >= 0 ? `단계 ${flow.step + 1}` : '인트로';

    const choice = prompt(
      `🛠 개발자 테스트 도구\n` +
      `현재 XP: ${xp} | 모듈: ${modName} | ${stepInfo}\n\n` +
      `1 → 현재 단계 스킵 (100점 통과)\n` +
      `2 → 현재 모듈 전체 완료\n` +
      `3 → XP +100\n` +
      `4 → XP +500\n` +
      `5 → XP +2000\n` +
      `6 → 진도 초기화 후 새로고침`,
      ''
    );

    switch (choice?.trim()) {
      case '1': devSkipCurrentStep(); break;
      case '2': devCompleteCurrentModule(); break;
      case '3': devAddXP(100); break;
      case '4': devAddXP(500); break;
      case '5': devAddXP(2000); break;
      case '6': resetProgress(); break;
      default: break;
    }
  }

  function devAddXP(amount) {
    Store.addXP(amount);
    showToast(`+${amount} XP 추가! 현재: ${Store.get().xp} XP`);
    refreshHome();
    refreshLesson();
    refreshProfile();
  }

  function devSkipCurrentStep() {
    const flow = getFlow();
    if (!flow || !flow.moduleId) {
      showToast('먼저 모듈을 열어주세요 (레슨 탭에서 모듈 선택)');
      return;
    }
    const mod = MODULES.find(m => m.id === flow.moduleId);
    if (!mod) return;
    const stepIndex = flow.step;
    if (stepIndex < 0 || stepIndex >= mod.steps.length) {
      showToast('스킵할 단계가 없습니다');
      return;
    }
    const step = mod.steps[stepIndex];
    Store.completeStep(flow.moduleId, stepIndex, 100);
    Store.addXP(80);
    showToast(`"${step.title}" 완료 처리 (100점)`);
    setFlowStep(stepIndex + 1);
    runCurrentStep();
  }

  function devCompleteCurrentModule() {
    const flow = getFlow();
    if (!flow || !flow.moduleId) {
      showToast('먼저 모듈을 열어주세요');
      return;
    }
    const mod = MODULES.find(m => m.id === flow.moduleId);
    if (!mod) return;
    mod.steps.forEach((_, i) => Store.completeStep(flow.moduleId, i, 100));
    Store.addXP(mod.xp || 200);
    showToast(`"${mod.name}" 모든 단계 완료 처리!`);
    setFlowStep(mod.steps.length);
    runCurrentStep();
  }

  function toggleFurigana() {
    const cur = Store.getSetting('furigana');
    Store.setSetting('furigana', !cur);
    showToast((!cur) ? '후리가나 ON' : '후리가나 OFF');
    refreshProfile();
  }

  function toggleTTS() {
    showToast('TTS 설정은 브라우저에서 관리됩니다');
  }

  function resetProgress() {
    if (!confirm('진도를 초기화할까요? 이 작업은 되돌릴 수 없습니다.')) return;
    localStorage.removeItem('jp_master_v2');
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.remove('jp_master_v2');
    }
    location.reload();
  }

  function exportProgress() {
    const payload = Store.exportProgress();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kana-master-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('진도 파일을 내보냈습니다');
  }

  function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const payload = JSON.parse(await file.text());
        if (!confirm('현재 진도를 가져온 파일로 바꿀까요?')) return;
        await Store.importProgress(payload);
        showToast('진도를 가져왔습니다');
        refreshAll();
      } catch (err) {
        console.warn('importProgress error:', err);
        showToast('진도 파일을 읽지 못했습니다');
      }
    };
    input.click();
  }

  return {
    buildTTSSettingsHtml,
    setVoiceDefault,
    setVoiceRoleA,
    setVoiceRoleB,
    setVoiceRoleC,
    setVoiceRole,
    devMenu,
    devAddXP,
    devSkipCurrentStep,
    devCompleteCurrentModule,
    toggleFurigana,
    toggleTTS,
    resetProgress,
    exportProgress,
    importProgress,
  };
}
