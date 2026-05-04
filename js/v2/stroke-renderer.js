/* ============================================================
   STROKE RENDERER — KanjiVG modal and inline kana strokes
   ============================================================ */

'use strict';

window.StrokeRenderer = (() => {
  let _strokeState = null;
  let _inlineStrokeState = null;

  function supports(kana) {
    const clean = stripFuri(kana || '');
    return Array.from(clean).length === 1;
  }

  async function showPanel(kana) {
    document.getElementById('strokeModal')?.remove();
    if (_strokeState?.animTimer) clearTimeout(_strokeState.animTimer);
    _strokeState = null;

    const info = (typeof KANA_MAP !== 'undefined') ? (KANA_MAP[kana] || {}) : {};
    const romaji = info.romaji ?? '';
    const korean = info.korean ?? '';

    const overlay = document.createElement('div');
    overlay.id = 'strokeModal';
    overlay.className = 'hw-overlay';
    overlay.innerHTML = `
      <div class="hw-backdrop" onclick="App._closeStrokePanel()"></div>
      <div class="hw-card">
        <button class="hw-close-btn" onclick="App._closeStrokePanel()">✕</button>
        <div class="hw-title-row">
          <span class="hw-kana-label">${escHtml(kana)}</span>
          <div class="hw-kana-meta">
            <span class="hw-romaji">${escHtml(romaji)}</span>
            <span class="hw-korean">${escHtml(korean)}</span>
          </div>
        </div>
        <div class="hw-canvas-wrap"><div id="hwTarget"></div></div>
        <div class="hw-stroke-counter" id="hwCounter">로딩 중…</div>
        <div class="hw-controls">
          <button class="hw-btn" id="hwPlayBtn" onclick="App._strokePlay()">▶ 처음부터</button>
          <button class="hw-btn hw-btn-outline" onclick="App._strokeStep(-1)">◀ 이전</button>
          <button class="hw-btn hw-btn-outline" onclick="App._strokeStep(1)">다음 ▶</button>
        </div>
        <div class="hw-hint">순서대로 획을 확인하거나 자동 재생하세요</div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));

    const hex = kana.codePointAt(0).toString(16).padStart(5, '0');
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svgText = await res.text();
      _renderKVGStrokes(svgText, kana);
    } catch {
      const el = document.getElementById('hwCounter');
      if (el) el.textContent = '획순 데이터 없음';
      const tgt = document.getElementById('hwTarget');
      if (tgt) tgt.innerHTML = `
        <div style="width:220px;height:220px;display:flex;align-items:center;
                    justify-content:center;font-size:130px;
                    font-family:'Noto Sans JP',serif;color:var(--text);opacity:.25">
          ${escHtml(kana)}</div>`;
    }
  }

  function _renderKVGStrokes(svgText, kana) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const strokePaths = _getStrokePaths(doc);

    if (!strokePaths.length) {
      const el = document.getElementById('hwCounter');
      if (el) el.textContent = '획순 데이터 없음';
      return;
    }

    const total = strokePaths.length;
    const ns = 'http://www.w3.org/2000/svg';
    const tgt = document.getElementById('hwTarget');
    if (!tgt) return;
    tgt.innerHTML = '';

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 109 109');
    svg.setAttribute('width', '220');
    svg.setAttribute('height', '220');
    svg.appendChild(_buildDefs(ns, 'kvgTipGlow', 'kvgInk', '2.5', '0.6'));
    svg.appendChild(_buildGuide(ns, 'rgba(99,102,241,.1)'));
    svg.appendChild(_buildOutline(ns, strokePaths, 'rgba(148,163,184,.22)'));

    const activeGroup = document.createElementNS(ns, 'g');
    const tipGroup = document.createElementNS(ns, 'g');
    svg.appendChild(activeGroup);
    svg.appendChild(tipGroup);
    tgt.appendChild(svg);

    _strokeState = {
      kana, total, stepIdx: -1, paths: strokePaths,
      activeGroup, tipGroup, ns, svg,
      animTimer: null, animFrame: null
    };
    _updateHwCounter();
    _strokeState.animTimer = setTimeout(() => play(), 500);
  }

  function play() {
    if (!_strokeState?.paths) return;
    const st = _strokeState;
    _clearStrokeTimers(st);
    st.stepIdx = -1;
    st.activeGroup.innerHTML = '';
    st.tipGroup.innerHTML = '';
    _updateHwCounter();

    const btn = document.getElementById('hwPlayBtn');
    if (btn) btn.textContent = '■ 재생 중';

    function drawStroke(i) {
      if (!_strokeState || _strokeState !== st) return;
      if (i >= st.total) {
        if (btn) btn.textContent = '▶ 처음부터';
        return;
      }
      st.stepIdx = i;
      _updateHwCounter();
      _kvgAddStroke(i, true, () => {
        if (!_strokeState || _strokeState !== st) return;
        st.animTimer = setTimeout(() => drawStroke(i + 1), 260);
      });
    }
    drawStroke(0);
  }

  function step(dir) {
    if (!_strokeState?.paths) return;
    const st = _strokeState;
    _clearStrokeTimers(st);

    const newIdx = Math.max(-1, Math.min(st.total - 1, st.stepIdx + dir));
    if (newIdx === st.stepIdx && newIdx !== -1) return;

    st.stepIdx = newIdx;
    st.activeGroup.innerHTML = '';
    st.tipGroup.innerHTML = '';

    if (newIdx >= 0) {
      for (let i = 0; i < newIdx; i++) _kvgAddStroke(i, false, null);
      _kvgAddStroke(newIdx, 'step', null);
    }
    _updateHwCounter();

    const btn = document.getElementById('hwPlayBtn');
    if (btn) btn.textContent = '▶ 처음부터';
  }

  function _kvgAddStroke(idx, animate, onComplete) {
    if (!_strokeState) return;
    const { paths, activeGroup, tipGroup, ns } = _strokeState;
    const srcPath = paths[idx];
    if (!srcPath) return;
    const path = _createStrokePath(ns, srcPath, animate !== false ? '#a78bfa' : '#6366f1', animate !== false ? '5.5' : '3.8');
    path.style.opacity = animate !== false ? '1' : '0.55';
    if (animate !== false) path.setAttribute('filter', 'url(#kvgInk)');
    activeGroup.appendChild(path);
    if (!animate) { if (onComplete) onComplete(); return; }

    _animateStroke({
      stateRef: () => _strokeState,
      state: _strokeState,
      path,
      tipGroup,
      ns,
      tipFilter: 'url(#kvgTipGlow)',
      duration: len => animate === true ? Math.max(420, Math.min(len * 5.5, 780)) : 260,
      tipRadius: '4.5',
      onComplete
    });
  }

  function _updateHwCounter() {
    const el = document.getElementById('hwCounter');
    if (!el || !_strokeState) return;
    const { total, stepIdx } = _strokeState;
    el.textContent = stepIdx < 0 ? `총 ${total}획` : `${stepIdx + 1} / ${total}획`;
  }

  function closePanel() {
    _clearStrokeTimers(_strokeState);
    _strokeState = null;
    const m = document.getElementById('strokeModal');
    if (m) {
      m.classList.remove('open');
      setTimeout(() => m.remove(), 250);
    }
  }

  async function startInline(kana) {
    stopInline();
    if (!supports(kana)) return;
    const tgt = document.getElementById('kanaStrokeInline');
    if (!tgt) return;

    const ctrl = new AbortController();
    _inlineStrokeState = { kana, ctrl, animTimer: null, animFrame: null };
    const hex = kana.codePointAt(0).toString(16).padStart(5, '0');
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;

    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svgText = await res.text();
      if (_inlineStrokeState?.kana !== kana) return;
      _renderInlineKVG(svgText, kana);
    } catch (e) {
      if (e.name === 'AbortError') return;
      const el = document.getElementById('kanaStrokeInline');
      if (el && _inlineStrokeState?.kana === kana) {
        el.innerHTML = `<div style="font-size:52px;font-family:'Noto Sans JP',serif;
          color:rgba(99,102,241,.2);line-height:1">${escHtml(kana)}</div>`;
      }
    }
  }

  function _renderInlineKVG(svgText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const strokePaths = _getStrokePaths(doc);
    const tgt = document.getElementById('kanaStrokeInline');
    if (!tgt || !strokePaths.length) return;
    tgt.innerHTML = '';

    const total = strokePaths.length;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 109 109');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(_buildDefs(ns, 'ilTipGlow', 'ilInk', '2', '0.5'));
    svg.appendChild(_buildGuide(ns, 'rgba(99,102,241,.12)'));
    svg.appendChild(_buildOutline(ns, strokePaths, 'rgba(148,163,184,.2)'));

    const activeG = document.createElementNS(ns, 'g');
    const tipG = document.createElementNS(ns, 'g');
    svg.appendChild(activeG);
    svg.appendChild(tipG);
    tgt.appendChild(svg);

    Object.assign(_inlineStrokeState, {
      total, stepIdx: -1,
      paths: strokePaths, activeG, tipG, ns
    });
    _inlineStrokeState.animTimer = setTimeout(() => _inlinePlay(), 150);
  }

  function _inlinePlay() {
    if (!_inlineStrokeState?.paths) return;
    const st = _inlineStrokeState;
    _clearStrokeTimers(st);
    st.stepIdx = -1;
    st.activeG.innerHTML = '';
    st.tipG.innerHTML = '';

    function drawStroke(i) {
      if (!_inlineStrokeState || _inlineStrokeState !== st) return;
      if (i >= st.total) return;
      st.stepIdx = i;
      _inlineAddStroke(i, () => {
        if (!_inlineStrokeState || _inlineStrokeState !== st) return;
        st.animTimer = setTimeout(() => drawStroke(i + 1), 220);
      });
    }
    drawStroke(0);
  }

  function replayInline() {
    if (!supports(_inlineStrokeState?.kana)) return;
    _inlinePlay();
  }

  function stopInline() {
    if (_inlineStrokeState?.ctrl) { try { _inlineStrokeState.ctrl.abort(); } catch {} }
    _clearStrokeTimers(_inlineStrokeState);
    _inlineStrokeState = null;
  }

  function _inlineAddStroke(idx, onComplete) {
    if (!_inlineStrokeState) return;
    const { paths, activeG, tipG, ns } = _inlineStrokeState;
    const srcPath = paths[idx];
    if (!srcPath) { if (onComplete) onComplete(); return; }
    const path = _createStrokePath(ns, srcPath, '#a78bfa', '5.5');
    path.setAttribute('filter', 'url(#ilInk)');
    activeG.appendChild(path);

    [...activeG.children].slice(0, -1).forEach(el => {
      el.setAttribute('stroke', '#6366f1');
      el.setAttribute('stroke-width', '4');
      el.style.opacity = '0.55';
      el.removeAttribute('filter');
    });

    _animateStroke({
      stateRef: () => _inlineStrokeState,
      state: _inlineStrokeState,
      path,
      tipGroup: tipG,
      ns,
      tipFilter: 'url(#ilTipGlow)',
      duration: len => Math.max(350, Math.min(len * 5.2, 700)),
      tipRadius: '3.5',
      onComplete
    });
  }

  function _getStrokePaths(doc) {
    return [...doc.querySelectorAll('path[id]')]
      .filter(p => /-s\d+$/.test(p.id))
      .sort((a, b) => parseInt(a.id.match(/-s(\d+)$/)[1]) - parseInt(b.id.match(/-s(\d+)$/)[1]));
  }

  function _buildDefs(ns, tipId, inkId, tipBlur, inkBlur) {
    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = `
      <filter id="${tipId}" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${tipBlur}" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="${inkId}" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${inkBlur}" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>`;
    return defs;
  }

  function _buildGuide(ns, color) {
    const guide = document.createElementNS(ns, 'g');
    [[54.5, 0, 54.5, 109], [0, 54.5, 109, 54.5]].forEach(([x1, y1, x2, y2]) => {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', x1); l.setAttribute('y1', y1);
      l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('stroke', color);
      l.setAttribute('stroke-width', '1');
      l.setAttribute('stroke-dasharray', '3 4');
      guide.appendChild(l);
    });
    return guide;
  }

  function _buildOutline(ns, strokePaths, color) {
    const outline = document.createElementNS(ns, 'g');
    strokePaths.forEach(p => {
      const o = _createStrokePath(ns, p, color, '3.5');
      outline.appendChild(o);
    });
    return outline;
  }

  function _createStrokePath(ns, srcPath, color, width) {
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', srcPath.getAttribute('d'));
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    return path;
  }

  function _animateStroke({ stateRef, state, path, tipGroup, ns, tipFilter, duration, tipRadius, onComplete }) {
    try {
      const len = path.getTotalLength();
      if (len <= 0) { if (onComplete) onComplete(); return; }
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      const DURATION = duration(len);

      const tip = document.createElementNS(ns, 'circle');
      tip.setAttribute('r', tipRadius);
      tip.setAttribute('fill', '#e9d5ff');
      tip.setAttribute('filter', tipFilter);
      const sp = path.getPointAtLength(0);
      tip.setAttribute('cx', sp.x);
      tip.setAttribute('cy', sp.y);
      tipGroup.appendChild(tip);

      const startTime = performance.now();
      function frame(now) {
        if (!stateRef() || stateRef() !== state) return;
        const raw = Math.min((now - startTime) / DURATION, 1);
        const drawn = len * _easeOutCubic(raw);
        path.style.strokeDashoffset = len - drawn;
        try {
          const pt = path.getPointAtLength(Math.min(drawn, len - 0.1));
          tip.setAttribute('cx', pt.x);
          tip.setAttribute('cy', pt.y);
        } catch { /* ignore */ }

        if (raw < 1) {
          state.animFrame = requestAnimationFrame(frame);
        } else {
          path.style.strokeDashoffset = '0';
          state.animFrame = null;
          tip.style.transition = 'opacity 0.22s';
          tip.style.opacity = '0';
          setTimeout(() => { try { tip.remove(); } catch {} }, 240);
          if (onComplete) onComplete();
        }
      }
      state.animFrame = requestAnimationFrame(frame);
    } catch {
      path.style.strokeDasharray = '';
      path.style.strokeDashoffset = '';
      if (onComplete) onComplete();
    }
  }

  function _clearStrokeTimers(st) {
    if (!st) return;
    if (st.animTimer) { clearTimeout(st.animTimer); st.animTimer = null; }
    if (st.animFrame) { cancelAnimationFrame(st.animFrame); st.animFrame = null; }
  }

  function _easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  return { supports, showPanel, play, step, closePanel, startInline, replayInline, stopInline };
})();
