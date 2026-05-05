#!/usr/bin/env node
// 주요 파일 크기 점검 — 500KB 초과 시 경고
const fs = require('fs');
const path = require('path');

const WARN_KB = 500;
const root = path.resolve(__dirname, '..');

const targets = [
  'index.html',
  'css/shell.css',
  'css/v2.css',
  'css/home.css',
  'css/lesson.css',
  'css/practice.css',
  'css/profile.css',
  'css/flow.css',
  'css/quiz.css',
  'css/roleplay.css',
  'css/lecture.css',
  'css/components.css',
  'css/detail-popup.css',
  'js/kana-levels.js',
  'js/kana-data-hiragana.js',
  'js/kana-data.js',
  'js/kana-data-extra.js',
  'js/kana-helpers.js',
  'js/v2/app-settings.js',
  'js/v2/app.js',
  'js/v2/content-index.js',
  'js/v2/curriculum.js',
  'js/v2/store.js',
  'js/v2/tts.js',
  'js/v2/utils.js',
  'js/v2/module-visuals.js',
  'js/v2/ui-icons.js',
  'js/v2/entitlements.js',
  'js/v2/home-view.js',
  'js/v2/kana-learn-flow.js',
  'js/v2/lecture-flow.js',
  'js/v2/lesson-view.js',
  'js/v2/practice-view.js',
  'js/v2/profile-view.js',
  'js/v2/programs.js',
  'js/v2/quiz-effects.js',
  'js/v2/quiz-result-flow.js',
  'js/v2/quiz-flow.js',
  'js/v2/roleplay-flow.js',
  'js/v2/stroke-renderer.js',
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
