#!/usr/bin/env node
// KanjiVG SVG를 public/strokes/{hex}.svg로 사전 다운로드
// 단일 글자 가나(히라가나·가타가나·탁음·반탁음·확장 등)만 대상

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'strokes');
const KANA_FILES = ['js/kana-data-hiragana.js', 'js/kana-data.js', 'js/kana-data-extra.js'];

function loadKanaChars() {
  const sandbox = {};
  vm.createContext(sandbox);
  for (const f of KANA_FILES) {
    const fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) continue;
    try { vm.runInContext(fs.readFileSync(fp, 'utf8'), sandbox); } catch (_) {}
  }
  const m = sandbox.KANA_MAP || {};
  return Object.keys(m).filter(ch => Array.from(ch).length === 1);
}

async function pMap(items, fn, concurrency = 6) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      results[i] = await fn(items[i]);
    }
  }));
  return results;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const chars = loadKanaChars();
  console.log(`대상 가나: ${chars.length}개`);

  let done = 0, skip = 0, fail = 0;
  await pMap(chars, async (ch) => {
    const hex = ch.codePointAt(0).toString(16).padStart(5, '0');
    const out = path.join(OUT_DIR, `${hex}.svg`);
    if (fs.existsSync(out)) { skip++; return; }
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const text = await r.text();
      fs.writeFileSync(out, text, 'utf8');
      done++;
      if (done % 20 === 0) console.log(`  진행: ${done + skip} / ${chars.length}`);
    } catch (e) {
      fail++;
      console.warn(`  실패: ${ch} (${hex}) - ${e.message}`);
    }
  });

  console.log(`완료 — 신규: ${done}, 스킵(이미 존재): ${skip}, 실패: ${fail}`);
}

main().catch(e => { console.error(e); process.exit(1); });
