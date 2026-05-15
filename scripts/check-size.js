#!/usr/bin/env node
// 주요 파일 크기 점검 — 500KB 초과 시 경고
const fs = require('fs');
const path = require('path');

const WARN_KB = 500;
const root = path.resolve(__dirname, '..');

function walk(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, ext, out);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      out.push(path.relative(root, full));
    }
  }
  return out;
}

const targets = [
  'index.html',
  'index-v2.html',
  'index-v3.html',
  'server.js',
  ...walk(path.join(root, 'css'), '.css'),
  ...walk(path.join(root, 'js'), '.js'),
  ...walk(path.join(root, 'apps'), '.css'),
  ...walk(path.join(root, 'apps'), '.html'),
  ...walk(path.join(root, 'apps'), '.js'),
].sort();

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
