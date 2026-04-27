#!/usr/bin/env node
// 배포용 ZIP 생성 — dist/kana-master-vX.X.X.zip
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));
const outDir = path.resolve(__dirname, '../dist');
const outFile = path.join(outDir, `kana-master-v${pkg.version}.zip`);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const output = fs.createWriteStream(outFile);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const kb = (archive.pointer() / 1024).toFixed(1);
  console.log(`\n✅ 빌드 완료: ${outFile} (${kb} KB)\n`);
});

archive.on('error', err => { throw err; });
archive.pipe(output);

const root = path.resolve(__dirname, '..');
const include = [
  'app.html', 'app.css',
  'manifest.json', 'manifest.webapp.json',
  'js/**/*.js',
  'icons/**',
  'audio/**',
];

include.forEach(pattern => {
  if (pattern.includes('**')) {
    const base = pattern.split('/**')[0];
    archive.directory(path.join(root, base), base);
  } else {
    const full = path.join(root, pattern);
    if (fs.existsSync(full)) archive.file(full, { name: pattern });
  }
});

// node_modules, .claude, scripts, dist 제외됨 (위 include 목록에 없으므로)
archive.finalize();
