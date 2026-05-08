#!/usr/bin/env node
// 일본어 텍스트 필드에 한글이 섞여 있는지 점검
// 영향: TTS 발음 실패 + 자막 시각 노이즈

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const LECTURE_DIR = path.join(DATA_DIR, 'lecture-data-v2');

// 한글 범위: AC00-D7A3 (음절), 1100-11FF (자모), 3130-318F (호환자모)
const KOREAN_RE = /[가-힣ᄀ-ᇿ㄰-㆏]/;

const VOCAB_FILES = [
  'vocab-items-w1w4.js',
  'vocab-items-w5w8.js',
  'vocab-items-w9w10.js',
  'vocab-items-s1s5.js',
  'vocab-items-s6sim.js',
  'vocab-items-it-sim.js',
  'vocab-dialogue.js',
];

// 일본어로 간주되는 필드 (한글 들어가면 문제)
// ⚠ main/sub는 강의 슬라이드의 시각 자막용 — 의도적으로 한국어인 경우가 많아 제외
const JP_FIELDS = ['japanese', 'kanji', 'captionJp', 'captionjp'];
// 참고용: 시각 필드 (오디오 영향 없음)
const VISUAL_FIELDS = ['main', 'sub'];

function loadVocabItems(file) {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return null;
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(fp, 'utf8'), sandbox);
  for (const k of Object.keys(sandbox)) {
    if (Array.isArray(sandbox[k])) return sandbox[k];
  }
  return null;
}

function loadLectureData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of fs.readdirSync(LECTURE_DIR)) {
    if (!f.endsWith('.js') || f === 'index.js') continue;
    try { vm.runInContext(fs.readFileSync(path.join(LECTURE_DIR, f), 'utf8'), sandbox); } catch (_) {}
  }
  return sandbox.window.LECTURE_DATA || {};
}

function highlightKorean(text) {
  // 한글 부분을 [[ ]]로 표시
  return text.replace(new RegExp(`(${KOREAN_RE.source}+)`, 'g'), '[[$1]]');
}

function checkItem(item, fileLabel, idHint) {
  const issues = [];
  for (const field of JP_FIELDS) {
    const v = item?.[field];
    if (typeof v !== 'string' || !v) continue;
    if (KOREAN_RE.test(v)) {
      issues.push({ file: fileLabel, id: idHint, field, text: v });
    }
  }
  return issues;
}

function main() {
  const allIssues = [];

  // 1) 어휘/대화 파일
  for (const f of VOCAB_FILES) {
    const items = loadVocabItems(f);
    if (!items) continue;
    items.forEach((it, i) => {
      const issues = checkItem(it, f, it.id || `idx${i}`);
      allIssues.push(...issues);
    });
  }

  // 2) 강의 슬라이드
  const lec = loadLectureData();
  for (const key of Object.keys(lec)) {
    const slides = lec[key];
    if (!Array.isArray(slides)) continue;
    slides.forEach((slide, idx) => {
      const issues = checkItem(slide, `lecture/${key}.js`, `${key}[${idx}]`);
      allIssues.push(...issues);
    });
  }

  // 3) 집계
  const byFile = {};
  for (const it of allIssues) {
    byFile[it.file] = (byFile[it.file] || 0) + 1;
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`총 문제 항목: ${allIssues.length}건`);
  console.log('파일별 분포:');
  Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => {
    console.log(`  ${n.toString().padStart(4)}  ${f}`);
  });
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 필드별 분포
  const byField = {};
  for (const it of allIssues) byField[it.field] = (byField[it.field] || 0) + 1;
  console.log('필드별 분포:');
  Object.entries(byField).forEach(([f, n]) => console.log(`  ${n.toString().padStart(4)}  ${f}`));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 샘플 5건 (가장 긴 한글 포함 항목 우선)
  console.log('샘플 (한글 부분 [[ ]] 표시):');
  const sorted = [...allIssues].sort((a, b) => {
    const aLen = (a.text.match(new RegExp(KOREAN_RE.source, 'g')) || []).length;
    const bLen = (b.text.match(new RegExp(KOREAN_RE.source, 'g')) || []).length;
    return bLen - aLen;
  });
  sorted.slice(0, 8).forEach(it => {
    console.log(`\n  [${it.file}] ${it.id} .${it.field}`);
    console.log(`    ${highlightKorean(it.text)}`);
  });

  // 옵션: --json 으로 전체 덤프
  if (process.argv.includes('--json')) {
    fs.writeFileSync('jp-text-audit.json', JSON.stringify(allIssues, null, 2));
    console.log('\n전체 결과: jp-text-audit.json');
  }
}

main();
