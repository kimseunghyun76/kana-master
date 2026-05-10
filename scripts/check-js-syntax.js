#!/usr/bin/env node
// JS 파일을 자동 탐색해 node --check로 문법을 검증한다.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const scanDirs = ['js', 'scripts'];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      out.push(path.relative(root, full));
    }
  }
  return out;
}

const files = scanDirs
  .flatMap(dir => walk(path.join(root, dir)))
  .sort();

let failed = false;
console.log('\n── JS 문법 점검 ──');
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status === 0) {
    console.log(`  ✅ ${file}`);
    continue;
  }
  failed = true;
  console.log(`  ❌ ${file}`);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.stdout) process.stdout.write(result.stdout);
}
console.log('');
if (failed) process.exit(1);
