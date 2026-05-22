/* ============================================================
   V3 Admin - curriculum review and editable snapshot
   ============================================================ */

'use strict';

(() => {
  const SAVE_KEY = 'kana_v3_admin_curriculum_snapshot';
  const state = {
    data: null,
    selected: { type: 'overview', id: 'overview' },
    filter: '',
    dirty: false,
    serverPath: '',
  };

  const clone = value => JSON.parse(JSON.stringify(value));
  const qs = sel => document.querySelector(sel);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[c]));

  async function init() {
    state.data = buildSourceSnapshot();
    await loadServerSnapshot();
    loadLocalDraft();
    renderShell();
    renderAll();
  }

  function buildSourceSnapshot() {
    const allVocab = window.ContentIndex?.getAllVocabItems?.() || [];
    const dialogueGroups = groupDialogueItems(window.VOCAB_ITEMS_DIALOGUE || []);
    return {
      meta: {
        version: 1,
        source: 'runtime',
        updatedAt: new Date().toISOString(),
        note: 'Admin editable snapshot. Source JS is not overwritten automatically.',
      },
      stages: clone(typeof STAGES !== 'undefined' ? STAGES : []),
      modules: clone(typeof MODULES !== 'undefined' ? MODULES : []),
      lectures: clone(window.LECTURE_DATA || {}),
      vocab: {
        categories: clone(window.VOCAB_CATEGORIES || []),
        items: clone(allVocab),
      },
      roleplay: {
        dialogues: clone(dialogueGroups),
        rawItems: clone(window.VOCAB_ITEMS_DIALOGUE || []),
      },
    };
  }

  function groupDialogueItems(items) {
    const groups = {};
    items.forEach(item => {
      const prefix = String(item.id || 'misc').split('_')[0] || 'misc';
      groups[prefix] = groups[prefix] || [];
      groups[prefix].push(item);
    });
    return groups;
  }

  async function loadServerSnapshot() {
    try {
      const res = await fetch('/api/admin/curriculum', { cache: 'no-store' });
      if (!res.ok) return;
      const payload = await res.json();
      if (payload?.exists && payload.data) {
        state.data = payload.data;
        state.serverPath = 'apps/current-v3/admin-curriculum.json';
      }
    } catch {
      // Static hosting fallback: local draft/export still works.
    }
  }

  function loadLocalDraft() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft?.modules && confirm('브라우저에 저장된 관리자 수정본이 있습니다. 불러올까요?')) {
        state.data = draft;
      }
    } catch {
      localStorage.removeItem(SAVE_KEY);
    }
  }

  function renderShell() {
    qs('#adminApp').innerHTML = `
      <header class="admin-header">
        <div class="admin-title">
          <strong>KANA QUEST v3 관리자</strong>
          <span>스테이지, 모듈, 스텝, 강의, 카드, 롤플레이를 한 화면에서 검수/수정</span>
        </div>
        <div class="admin-actions">
          <span class="status-pill" id="saveStatus">초기화됨</span>
          <button type="button" onclick="Admin.reloadSource()">원본 다시 읽기</button>
          <button type="button" onclick="Admin.saveLocal()">브라우저 저장</button>
          <button type="button" class="primary" onclick="Admin.saveServer()">서버 저장</button>
          <button type="button" onclick="Admin.downloadJson()">JSON 다운로드</button>
        </div>
      </header>
      <div class="admin-layout">
        <section class="panel">
          <div class="panel-head">
            <h2>목차</h2>
          </div>
          <div style="padding:12px;border-bottom:1px solid var(--line)">
            <input class="search-box" id="treeSearch" placeholder="모듈, 강의, 카드 검색" oninput="Admin.setFilter(this.value)">
          </div>
          <div class="tree" id="tree"></div>
        </section>
        <section class="panel">
          <div class="panel-head">
            <h2>검수 보기</h2>
            <button type="button" onclick="Admin.select('overview','overview')">전체 요약</button>
          </div>
          <div class="detail" id="detail"></div>
        </section>
        <section class="panel editor-panel">
          <div class="panel-head">
            <h2>직접 수정</h2>
            <button type="button" class="danger" onclick="Admin.deleteSelected()">선택 항목 삭제</button>
          </div>
          <div class="editor">
            <div class="field-grid" id="quickFields"></div>
            <textarea id="jsonEditor" spellcheck="false"></textarea>
            <div class="editor-tools">
              <button type="button" class="primary" onclick="Admin.applyEditor()">JSON 적용</button>
              <button type="button" onclick="Admin.formatEditor()">정렬</button>
              <button type="button" onclick="Admin.addStep()">스텝 추가</button>
              <button type="button" onclick="Admin.addLectureSlide()">강의 카드 추가</button>
              <button type="button" onclick="Admin.addRoleplayLine()">롤플레이 대사 추가</button>
            </div>
            <p class="muted">서버 저장은 로컬 node 서버에서만 파일로 저장됩니다. 저장 파일: <code>apps/current-v3/admin-curriculum.json</code></p>
          </div>
        </section>
      </div>
    `;
  }

  function renderAll() {
    renderTree();
    renderDetail();
    renderEditor();
    updateStatus();
  }

  function getStats() {
    const modules = state.data.modules || [];
    const stages = state.data.stages || [];
    const steps = modules.reduce((sum, m) => sum + (m.steps?.length || 0), 0);
    const roleplays = modules.filter(m => m.roleplay).length;
    const lectureSlides = Object.values(state.data.lectures || {}).reduce((sum, rows) => sum + (rows?.length || 0), 0);
    const vocabItems = state.data.vocab?.items?.length || 0;
    return { stages: stages.length, modules: modules.length, steps, roleplays, lectureSlides, vocabItems };
  }

  function renderTree() {
    const filter = state.filter.trim().toLowerCase();
    const show = text => !filter || String(text || '').toLowerCase().includes(filter);
    const modules = state.data.modules || [];
    const lectures = state.data.lectures || {};
    const categories = state.data.vocab?.categories || [];
    const dialogues = state.data.roleplay?.dialogues || {};

    const stageHtml = (state.data.stages || []).map(stage => {
      const mods = modules.filter(m => m.stageId === stage.id);
      const visibleMods = mods.filter(m => show(`${m.id} ${m.name} ${m.desc}`) || show(stage.name));
      if (!visibleMods.length && !show(stage.name)) return '';
      return `
        <div class="tree-section">
          <div class="tree-section-title">Stage ${esc(stage.id)} · ${esc(stage.name)}</div>
          <button class="tree-item ${isActive('stage', stage.id)}" onclick="Admin.select('stage','${esc(stage.id)}')">
            ${esc(stage.name)}<small>${esc(stage.key)} · ${mods.length} modules</small>
          </button>
          ${visibleMods.map(m => `
            <button class="tree-item ${isActive('module', m.id)}" onclick="Admin.select('module','${esc(m.id)}')">
              ${esc(m.name)}<small>${esc(m.id)} · ${m.steps?.length || 0} steps · ${m.roleplay ? 'roleplay' : 'no roleplay'}</small>
            </button>
          `).join('')}
        </div>`;
    }).join('');

    const lectureHtml = Object.keys(lectures).filter(key => show(key)).slice(0, 180).map(key => `
      <button class="tree-item ${isActive('lecture', key)}" onclick="Admin.select('lecture','${esc(key)}')">
        ${esc(key)}<small>${lectures[key]?.length || 0} cards</small>
      </button>
    `).join('');

    const categoryHtml = categories.filter(c => show(`${c.id} ${c.title} ${c.name}`)).slice(0, 180).map(c => `
      <button class="tree-item ${isActive('category', c.id)}" onclick="Admin.select('category','${esc(c.id)}')">
        ${esc(c.title || c.name || c.id)}<small>${esc(c.id)} · ${c.items?.length || 0} cards</small>
      </button>
    `).join('');

    const dialogueHtml = Object.keys(dialogues).filter(key => show(key)).map(key => `
      <button class="tree-item ${isActive('dialogue', key)}" onclick="Admin.select('dialogue','${esc(key)}')">
        Dialogue ${esc(key)}<small>${dialogues[key]?.length || 0} lines</small>
      </button>
    `).join('');

    qs('#tree').innerHTML = `
      <button class="tree-item ${isActive('overview', 'overview')}" onclick="Admin.select('overview','overview')">전체 요약<small>커리큘럼 전체 통계</small></button>
      ${stageHtml}
      <div class="tree-section"><div class="tree-section-title">Lectures</div>${lectureHtml || '<p class="muted">검색 결과 없음</p>'}</div>
      <div class="tree-section"><div class="tree-section-title">Card Categories</div>${categoryHtml || '<p class="muted">검색 결과 없음</p>'}</div>
      <div class="tree-section"><div class="tree-section-title">Roleplay Dialogues</div>${dialogueHtml || '<p class="muted">검색 결과 없음</p>'}</div>
    `;
  }

  function isActive(type, id) {
    return state.selected.type === type && String(state.selected.id) === String(id) ? 'active' : '';
  }

  function renderDetail() {
    const { type, id } = state.selected;
    if (type === 'overview') return renderOverview();
    if (type === 'stage') return renderStage(Number(id));
    if (type === 'module') return renderModule(id);
    if (type === 'lecture') return renderLecture(id);
    if (type === 'category') return renderCategory(id);
    if (type === 'dialogue') return renderDialogue(id);
  }

  function renderOverview() {
    const s = getStats();
    const modules = state.data.modules || [];
    qs('#detail').innerHTML = `
      <h1>전체 커리큘럼</h1>
      <div class="detail-meta">마지막 수정: ${esc(state.data.meta?.updatedAt || '-')}</div>
      <div class="summary-grid">
        ${summary('Stages', s.stages)}
        ${summary('Modules', s.modules)}
        ${summary('Steps', s.steps)}
        ${summary('Roleplays', s.roleplays)}
        ${summary('Lecture Cards', s.lectureSlides)}
        ${summary('Vocab Cards', s.vocabItems)}
      </div>
      ${modules.map(m => moduleCard(m, true)).join('')}
    `;
  }

  const summary = (label, value) => `<div class="summary-card"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;

  function renderStage(stageId) {
    const stage = (state.data.stages || []).find(s => s.id === stageId);
    const mods = (state.data.modules || []).filter(m => m.stageId === stageId);
    qs('#detail').innerHTML = `
      <h1>${esc(stage?.name || 'Stage')}</h1>
      <div class="detail-meta">${esc(stage?.key)} · ${mods.length} modules</div>
      <p>${esc(stage?.desc || '')}</p>
      ${mods.map(m => moduleCard(m, false)).join('')}
    `;
  }

  function renderModule(moduleId) {
    const mod = (state.data.modules || []).find(m => m.id === moduleId);
    if (!mod) return;
    qs('#detail').innerHTML = `
      <h1>${esc(mod.name)}</h1>
      <div class="detail-meta">${esc(mod.id)} · stage ${esc(mod.stageId)} · ${mod.steps?.length || 0} steps</div>
      <p>${esc(mod.desc || '')}</p>
      ${mod.roleplay ? roleCard(mod.roleplay) : '<p class="muted">롤플레이 없음</p>'}
      ${(mod.steps || []).map((step, idx) => stepCard(step, idx)).join('')}
    `;
  }

  function moduleCard(mod, compact) {
    return `
      <div class="module-card">
        <h3>${esc(mod.name)} <span class="tag">${esc(mod.id)}</span></h3>
        <div class="muted">Stage ${esc(mod.stageId)} · ${mod.steps?.length || 0} steps · ${mod.roleplay ? esc(mod.roleplay.dialogueKey) : 'no roleplay'}</div>
        ${compact ? '' : `<p>${esc(mod.desc || '')}</p>`}
        <button type="button" onclick="Admin.select('module','${esc(mod.id)}')">열기</button>
      </div>
    `;
  }

  function stepCard(step, idx) {
    return `
      <div class="step-card">
        <h3>${idx + 1}. ${esc(step.title || step.type)} <span class="tag">${esc(step.type)}</span></h3>
        <div class="muted">${[
          step.lectureKey && `lecture: ${step.lectureKey}`,
          step.categoryId && `category: ${step.categoryId}`,
          step.dialogueKey && `dialogue: ${step.dialogueKey}`,
          step.limit && `limit: ${step.limit}`,
        ].filter(Boolean).map(esc).join(' · ')}</div>
      </div>
    `;
  }

  function roleCard(role) {
    return `
      <div class="role-card">
        <h3>롤플레이 <span class="tag">${esc(role.dialogueKey)}</span></h3>
        <p><strong>${esc(role.name)}</strong> · ${esc(role.nameJp || '')}</p>
        <p class="muted">${esc(role.desc || '')}</p>
      </div>
    `;
  }

  function renderLecture(key) {
    const rows = state.data.lectures?.[key] || [];
    qs('#detail').innerHTML = `
      <h1>Lecture: ${esc(key)}</h1>
      <div class="detail-meta">${rows.length} cards</div>
      ${rows.map((row, idx) => `
        <div class="lecture-card">
          <h3>${idx + 1}. ${esc(row.label || row.type)} <span class="tag">${esc(row.type)}</span></h3>
          <p><strong>${esc(row.main || '')}</strong></p>
          <p>${esc(row.sub || '').replace(/\n/g, '<br>')}</p>
          <p class="muted">${esc(row.captionKo || '')}</p>
        </div>
      `).join('')}
    `;
  }

  function renderCategory(categoryId) {
    const category = state.data.vocab?.categories?.find(c => c.id === categoryId);
    const byId = new Map((state.data.vocab?.items || []).map(item => [item.id, item]));
    const items = (category?.items || []).map(itemId => byId.get(itemId)).filter(Boolean);
    qs('#detail').innerHTML = `
      <h1>${esc(category?.title || category?.name || categoryId)}</h1>
      <div class="detail-meta">${esc(categoryId)} · ${items.length} cards</div>
      <p>${esc(category?.desc || '')}</p>
      ${items.map(item => `
        <div class="category-card">
          <strong>${esc(item.japanese)}</strong> <span class="muted">${esc(item.romaji || '')}</span>
          <div>${esc(item.korean || '')}</div>
          <div class="muted">${esc(item.id || '')}</div>
        </div>
      `).join('')}
    `;
  }

  function renderDialogue(key) {
    const lines = state.data.roleplay?.dialogues?.[key] || [];
    qs('#detail').innerHTML = `
      <h1>Dialogue ${esc(key)}</h1>
      <div class="detail-meta">${lines.length} lines</div>
      ${lines.map(line => `
        <div class="role-card">
          <span class="tag">${esc(line.speaker || '')}</span>
          <strong>${esc(line.japanese || line.korean || '')}</strong>
          <p>${esc(line.korean || '')}</p>
          <p class="muted">${esc(line.romaji || '')}</p>
        </div>
      `).join('')}
    `;
  }

  function getSelectedRef() {
    const { type, id } = state.selected;
    if (type === 'overview') return { parent: null, key: null, value: state.data };
    if (type === 'stage') {
      const i = state.data.stages.findIndex(x => String(x.id) === String(id));
      return { parent: state.data.stages, key: i, value: state.data.stages[i] };
    }
    if (type === 'module') {
      const i = state.data.modules.findIndex(x => x.id === id);
      return { parent: state.data.modules, key: i, value: state.data.modules[i] };
    }
    if (type === 'lecture') return { parent: state.data.lectures, key: id, value: state.data.lectures[id] };
    if (type === 'category') {
      const i = state.data.vocab.categories.findIndex(x => x.id === id);
      return { parent: state.data.vocab.categories, key: i, value: state.data.vocab.categories[i] };
    }
    if (type === 'dialogue') return { parent: state.data.roleplay.dialogues, key: id, value: state.data.roleplay.dialogues[id] };
    return { parent: null, key: null, value: null };
  }

  function renderEditor() {
    const ref = getSelectedRef();
    qs('#jsonEditor').value = JSON.stringify(ref.value, null, 2);
    renderQuickFields(ref.value);
  }

  function renderQuickFields(value) {
    const fields = [];
    if (value && !Array.isArray(value) && typeof value === 'object') {
      ['id', 'name', 'title', 'desc', 'stageId', 'type', 'lectureKey', 'categoryId', 'dialogueKey'].forEach(key => {
        if (Object.prototype.hasOwnProperty.call(value, key)) fields.push(key);
      });
    }
    qs('#quickFields').innerHTML = fields.map(key => `
      <label>${esc(key)}
        <input value="${esc(value[key])}" oninput="Admin.quickSet('${esc(key)}', this.value)">
      </label>
    `).join('');
  }

  function markDirty() {
    state.dirty = true;
    state.data.meta = state.data.meta || {};
    state.data.meta.updatedAt = new Date().toISOString();
    updateStatus();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state.data));
  }

  function updateStatus(text, mode) {
    const el = qs('#saveStatus');
    if (!el) return;
    el.className = `status-pill ${mode || (state.dirty ? 'bad' : 'ok')}`;
    el.textContent = text || (state.dirty ? '수정됨 · 저장 필요' : '저장됨');
  }

  function select(type, id) {
    state.selected = { type, id };
    renderAll();
  }

  function setFilter(value) {
    state.filter = value;
    renderTree();
  }

  function applyEditor() {
    const ref = getSelectedRef();
    let next;
    try {
      next = JSON.parse(qs('#jsonEditor').value);
    } catch (err) {
      updateStatus(`JSON 오류: ${err.message}`, 'bad');
      return;
    }
    if (!ref.parent) {
      state.data = next;
    } else {
      ref.parent[ref.key] = next;
    }
    markDirty();
    renderAll();
  }

  function formatEditor() {
    try {
      qs('#jsonEditor').value = JSON.stringify(JSON.parse(qs('#jsonEditor').value), null, 2);
    } catch (err) {
      updateStatus(`JSON 오류: ${err.message}`, 'bad');
    }
  }

  function quickSet(key, value) {
    const ref = getSelectedRef();
    if (!ref.value || Array.isArray(ref.value) || typeof ref.value !== 'object') return;
    ref.value[key] = key === 'stageId' ? Number(value) || value : value;
    markDirty();
    renderDetail();
    renderEditor();
  }

  function addStep() {
    const ref = getSelectedRef();
    const mod = state.selected.type === 'module' ? ref.value : null;
    if (!mod?.steps) {
      updateStatus('모듈을 선택해야 스텝을 추가할 수 있습니다.', 'bad');
      return;
    }
    mod.steps.push({ type: 'lecture', title: '새 강의', lectureKey: '' });
    markDirty();
    renderAll();
  }

  function addLectureSlide() {
    const ref = getSelectedRef();
    if (state.selected.type !== 'lecture' || !Array.isArray(ref.value)) {
      updateStatus('강의 키를 선택해야 강의 카드를 추가할 수 있습니다.', 'bad');
      return;
    }
    ref.value.push({ type: 'practice', label: '새 카드', duration: 6000, audio: null, image: '', main: '', sub: '', captionKo: '', captionJp: '' });
    markDirty();
    renderAll();
  }

  function addRoleplayLine() {
    const ref = getSelectedRef();
    if (state.selected.type !== 'dialogue' || !Array.isArray(ref.value)) {
      updateStatus('롤플레이 대화를 선택해야 대사를 추가할 수 있습니다.', 'bad');
      return;
    }
    const key = state.selected.id;
    ref.value.push({ id: `${key}_${Date.now()}`, speaker: 'A', japanese: '', romaji: '', korean: '', english: '', tip: '' });
    markDirty();
    renderAll();
  }

  function deleteSelected() {
    const ref = getSelectedRef();
    if (!ref.parent || !confirm('선택한 항목을 삭제할까요?')) return;
    if (Array.isArray(ref.parent)) ref.parent.splice(ref.key, 1);
    else delete ref.parent[ref.key];
    state.selected = { type: 'overview', id: 'overview' };
    markDirty();
    renderAll();
  }

  function saveLocal() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state.data));
    state.dirty = false;
    updateStatus('브라우저에 저장됨', 'ok');
  }

  async function saveServer() {
    try {
      const res = await fetch('/api/admin/curriculum', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: state.data }),
      });
      const payload = await res.json();
      if (!res.ok || !payload.ok) throw new Error(payload.error || '저장 실패');
      state.dirty = false;
      state.serverPath = payload.path;
      localStorage.setItem(SAVE_KEY, JSON.stringify(state.data));
      updateStatus(`서버 저장됨: ${payload.path}`, 'ok');
    } catch (err) {
      updateStatus(`서버 저장 실패: ${err.message}`, 'bad');
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kana-v3-admin-curriculum.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function reloadSource() {
    if (state.dirty && !confirm('저장하지 않은 수정이 있습니다. 원본을 다시 읽을까요?')) return;
    state.data = buildSourceSnapshot();
    state.selected = { type: 'overview', id: 'overview' };
    state.dirty = false;
    renderAll();
  }

  window.Admin = {
    select,
    setFilter,
    applyEditor,
    formatEditor,
    quickSet,
    addStep,
    addLectureSlide,
    addRoleplayLine,
    deleteSelected,
    saveLocal,
    saveServer,
    downloadJson,
    reloadSource,
  };

  init();
})();
