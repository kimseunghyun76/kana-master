/* ============================================================
   KANA SECTOR VIEW — 가나 마스터 전용 11레벨 학습 맵
   kana-levels.js의 LEVELS 배열을 직접 렌더링.
   진입: App.openKanaSector()  레벨 시작: App.openKanaLevel(id)
   ============================================================ */

'use strict';

window.createKanaSectorView = (ctx) => {
  const { Store, escHtml, uiIconSvg } = ctx;

  // ── 레벨 그룹 정의 (kana-levels.js와 일치) ─────────────────
  const GROUPS = [
    {
      key: 'hiragana',
      label: '히라가나',
      badge: 'あ',
      color: '#8b5cf6',
      ids: [1, 2, 3, 4, 5],
    },
    {
      key: 'katakana',
      label: '가타가나',
      badge: 'ア',
      color: '#3b82f6',
      ids: [6, 7],
    },
    {
      key: 'rules',
      label: '소리 변환 규칙',
      badge: '゛',
      color: '#06b6d4',
      ids: [8, 9, 10, 11],
    },
  ];

  // 타입별 배지 색상
  const TYPE_COLOR = {
    hiragana: '#8b5cf6',
    hiragana_advanced: '#a855f7',
    katakana: '#3b82f6',
    katakana_advanced: '#2563eb',
    katakana_extended: '#0ea5e9',
    special: '#06b6d4',
    review: '#10b981',
  };

  const TYPE_LABEL = {
    hiragana: '히라가나',
    hiragana_advanced: '히라가나 심화',
    katakana: '가타가나',
    katakana_advanced: '가타가나 심화',
    katakana_extended: '가타가나 확장',
    special: '특수 박자',
    review: '조사·복습',
  };

  // ── DOM 참조 ───────────────────────────────────────────────
  function _getOverlay() {
    return document.getElementById('kanaSectorOverlay');
  }

  // ── Public: open / close ───────────────────────────────────
  function open() {
    const el = _getOverlay();
    if (!el) return;
    _render();
    el.style.display = '';
    el.classList.add('ks-visible');
    // 스크롤 막기
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const el = _getOverlay();
    if (!el) return;
    el.classList.remove('ks-visible');
    document.body.style.overflow = '';
    setTimeout(() => { el.style.display = 'none'; }, 240);
  }

  // ── 전체 진행률 ────────────────────────────────────────────
  function _getProgress() {
    const prog = Store.get();
    const kp = prog.kanaProgress || {};
    const total = LEVELS.length;
    const done = LEVELS.filter(l => kp[l.id]?.learned).length;
    return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
  }

  // ── 레벨 카드 렌더 ─────────────────────────────────────────
  function _levelCard(level) {
    const prog = Store.get();
    const kp = prog.kanaProgress || {};
    const lp = kp[level.id] || {};
    const done = !!lp.learned;
    const score = lp.quizScore || 0;
    const charCount = level.chars ? level.chars.length : 0;
    const typeColor = TYPE_COLOR[level.type] || '#64748b';
    const typeLabel = TYPE_LABEL[level.type] || level.type;
    // 미리보기 문자 (앞 4개)
    const preview = (level.chars || []).slice(0, 4).join(' ');

    const statusClass = done ? 'ks-level-done' : 'ks-level-open';
    const statusBadge = done
      ? `<span class="ks-level-status done">${uiIconSvg('check', 'ks-status-icon')}</span>`
      : `<span class="ks-level-status open"></span>`;
    const scoreBadge = done
      ? `<span class="ks-level-score">${score}점</span>`
      : '';

    return `
      <button class="ks-level-card ${statusClass}"
              type="button"
              onclick="App.openKanaLevel(${level.id})"
              data-level="${level.id}">
        <span class="ks-level-num">${level.id}</span>
        <span class="ks-level-body">
          <span class="ks-level-title">${escHtml(level.title)}</span>
          <span class="ks-level-sub">${escHtml(level.subtitle)}</span>
          <span class="ks-level-chars">${escHtml(preview)}</span>
        </span>
        <span class="ks-level-meta">
          <span class="ks-level-type" style="background:${typeColor}20;color:${typeColor}">${typeLabel}</span>
          <span class="ks-level-charcount">${charCount}자</span>
          ${scoreBadge}
        </span>
        ${statusBadge}
      </button>
    `;
  }

  // ── 메인 렌더 ─────────────────────────────────────────────
  function _render() {
    const overlay = _getOverlay();
    if (!overlay) return;
    const { done, total, pct } = _getProgress();

    // 다음으로 학습할 레벨 (완료 안 된 첫 번째)
    const prog = Store.get();
    const kp = prog.kanaProgress || {};
    const nextLevel = LEVELS.find(l => !kp[l.id]?.learned);

    const groupsHtml = GROUPS.map(g => {
      const levels = LEVELS.filter(l => g.ids.includes(l.id));
      const groupDone = levels.filter(l => kp[l.id]?.learned).length;
      return `
        <div class="ks-group">
          <div class="ks-group-header">
            <span class="ks-group-badge" style="background:${g.color}">${g.badge}</span>
            <span class="ks-group-label">${g.label}</span>
            <span class="ks-group-pct">${groupDone}/${levels.length}</span>
          </div>
          <div class="ks-group-levels">
            ${levels.map(l => _levelCard(l)).join('')}
          </div>
        </div>
      `;
    }).join('');

    overlay.innerHTML = `
      <div class="ks-sheet">
        <div class="ks-header">
          <div class="ks-header-top">
            <div class="ks-header-title">
              <span class="ks-title-icon">あ ア</span>
              <span class="ks-title-text">가나 마스터</span>
            </div>
            <button class="ks-close-btn" type="button" onclick="App.closeKanaSector()" aria-label="닫기">
              ${uiIconSvg('close', 'ks-close-icon')}
            </button>
          </div>
          <div class="ks-progress-bar-wrap">
            <div class="ks-progress-bar-track">
              <div class="ks-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="ks-progress-text">${done}/${total} 레벨 완료 · ${pct}%</span>
          </div>
          ${nextLevel ? `
            <div class="ks-next-hint">
              ${uiIconSvg('arrow_right', 'ks-next-icon')}
              다음: <b>레벨 ${nextLevel.id} · ${escHtml(nextLevel.title)}</b>
              <button class="ks-next-btn" onclick="App.openKanaLevel(${nextLevel.id})">시작</button>
            </div>
          ` : `
            <div class="ks-next-hint ks-all-done">
              ${uiIconSvg('check', 'ks-next-icon')}
              <b>가나 마스터 완성!</b> 모든 레벨을 완료했습니다 🎉
            </div>
          `}
        </div>
        <div class="ks-body">
          ${groupsHtml}
        </div>
      </div>
    `;
  }

  // ── 레벨 완료 후 호출 (app.js에서 사용) ───────────────────
  function refresh() {
    const el = _getOverlay();
    if (el && el.classList.contains('ks-visible')) {
      _render();
    }
  }

  return { open, close, refresh };
};
