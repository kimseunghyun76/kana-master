#!/usr/bin/env node
// 주요 파일 크기 점검 — 500KB 초과 시 경고
const fs = require('fs');
const path = require('path');

const WARN_KB = 500;
const root = path.resolve(__dirname, '..');

const targets = [
  'app.html',
  'app.css',
  'js/app.js',
  'js/kana-data.js',
  'js/gamification.js',
  'js/modules/tts.js',
  'js/modules/state.js',
  'js/modules/srs.js',
  'js/modules/utils.js',
  'js/modules/stroke-data.js',
];

let anyWarn = false;
console.log('\n── 파일 크기 점검 ──');
targets.forEach(rel => {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { console.log(`  ⚠️  없음: ${rel}`); return; }
  const kb = (fs.statSync(full).size / 1024).toFixed(1);
  const warn = parseFloat(kb) > WARN_KB;
  if (warn) anyWarn = true;
  console.log(`  ${warn ? '⚠️ ' : '✅'} ${rel.padEnd(40)} ${kb} KB${warn ? '  ← 500KB 초과!' : ''}`);
});
console.log('');
if (anyWarn) process.exit(1);
