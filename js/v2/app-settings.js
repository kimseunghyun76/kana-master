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
    const engine = TTS.getEngineName();
    let html = `
      <div style="font-size:12px;color:var(--text3);margin-bottom:10px">
        현재 엔진: <strong style="color:var(--accent2)">${escHtml(engine)}</strong>
      </div>
    `;

    if (TTS.isVoicevox()) {
      const speakers = TTS.getVoicevoxSpeakers();
      const curA = TTS.getVoicevoxSpeakerId();
      const curB = TTS.getVoicevoxSpeakerBId();
      const curC = TTS.getVoicevoxSpeakerCId();
      const opts = speakers.map(s => ({ id: s.id, name: s.name }));
      const makeSelect = (id, onChange, cur) =>
        `<select id="${id}" onchange="${onChange}(this.value)"
           style="width:100%;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);
                  border-radius:10px;color:var(--text);font-size:12px;cursor:pointer;margin-bottom:4px">
           ${opts.map(s => `<option value="${s.id}" ${s.id === cur ? 'selected' : ''}>${escHtml(s.name)}</option>`).join('')}
         </select>`;
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;color:var(--text2);margin-bottom:8px;font-weight:600">
            VOICEVOX 화자 (롤플레이 다화자)
          </div>
          <div style="display:grid;gap:8px">
            <div>
              <div style="font-size:11px;color:var(--accent2);margin-bottom:3px">화자 A — 나 (학습자)</div>
              ${makeSelect('vvSpeakerA', 'App.setVoicevoxSpeakerA', curA)}
              <button onclick="TTS.speak('よろしくお願いします', {speakerId:${curA}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
            </div>
            <div>
              <div style="font-size:11px;color:#34d399;margin-bottom:3px">화자 B — 상대방</div>
              ${makeSelect('vvSpeakerB', 'App.setVoicevoxSpeakerB', curB)}
              <button onclick="TTS.speak('いらっしゃいませ。', {speakerId:${curB}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
            </div>
            <div>
              <div style="font-size:11px;color:#fb923c;margin-bottom:3px">화자 C — 제3자/점원</div>
              ${makeSelect('vvSpeakerC', 'App.setVoicevoxSpeakerC', curC)}
              <button onclick="TTS.speak('かしこまりました。', {speakerId:${curC}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
            </div>
          </div>
        </div>
      `;
    } else if (TTS.isEdgeTts()) {
      const voices = TTS.getEdgeVoices();
      const curV = TTS.getEdgeVoice();
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;color:var(--text2);margin-bottom:6px;font-weight:600">
            Edge TTS 음성
          </div>
          <select id="edgeVoiceSelect" onchange="App.setEdgeTTSVoice(this.value)"
            style="width:100%;padding:10px 12px;background:var(--bg3);border:1px solid var(--border);
                   border-radius:10px;color:var(--text);font-size:13px;cursor:pointer">
            ${voices.map(v =>
              `<option value="${v.id}" ${v.id === curV ? 'selected' : ''}>${escHtml(v.name)}</option>`
            ).join('')}
          </select>
          <button onclick="TTS.speak('おはようございます')"
            style="margin-top:8px;width:100%;padding:9px;background:var(--bg3);
                   border:1px solid var(--border);border-radius:10px;color:var(--text);
                   font-size:13px;cursor:pointer">
            테스트 재생
          </button>
        </div>
      `;
    } else {
      html += `
        <div style="font-size:13px;color:var(--text3);padding:10px 0">
          브라우저 기본 음성: <strong>${escHtml(TTS.getWebSpeechVoiceName())}</strong><br>
          <span style="font-size:11px;margin-top:6px;display:block">
            더 좋은 음질을 원하면 VOICEVOX를 설치하세요.<br>
            <a href="https://voicevox.hiroshiba.jp" target="_blank"
               style="color:var(--accent)">voicevox.hiroshiba.jp</a>
          </span>
        </div>
      `;
    }
    return html;
  }

  function setVoicevoxSpeaker(id) {
    TTS.setVoicevoxSpeaker(id);
    showToast('화자 A 변경됨');
  }

  function setVoicevoxSpeakerA(id) {
    TTS.setVoicevoxSpeaker(id);
    showToast('화자 A 변경됨');
    TTS.speak('よろしくお願いします', { speakerId: parseInt(id) });
  }

  function setVoicevoxSpeakerB(id) {
    TTS.setVoicevoxSpeakerB(id);
    showToast('화자 B 변경됨');
    TTS.speak('いらっしゃいませ。', { speakerId: parseInt(id) });
  }

  function setVoicevoxSpeakerC(id) {
    TTS.setVoicevoxSpeakerC(id);
    showToast('화자 C 변경됨');
    TTS.speak('かしこまりました。', { speakerId: parseInt(id) });
  }

  function setEdgeTTSVoice(v) {
    TTS.setEdgeVoice(v);
    showToast('음성 변경됨');
    TTS.speak('はじめまして。よろしくお願いします。');
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
    setVoicevoxSpeaker,
    setVoicevoxSpeakerA,
    setVoicevoxSpeakerB,
    setVoicevoxSpeakerC,
    setEdgeTTSVoice,
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
