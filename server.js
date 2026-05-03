// Kana Master — 웹서비스 정적 파일 서버
// 모바일 웹 + PC 브라우저 (Chrome/Safari/Firefox/Edge) 모두 지원
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const BASE = path.join(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp3':  'audio/mpeg',
  '.wav':  'audio/wav',
  '.webp': 'image/webp',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

function resolveExistingPath(requestPath) {
  const candidates = [
    requestPath,
    requestPath.normalize('NFC'),
    requestPath.normalize('NFD'),
  ];
  for (const candidate of candidates) {
    const fullPath = path.join(BASE, candidate);
    if (fullPath.startsWith(BASE) && fs.existsSync(fullPath)) return fullPath;
  }
  return path.join(BASE, requestPath);
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  try {
    urlPath = decodeURIComponent(urlPath);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = resolveExistingPath(urlPath);
  const ext = path.extname(filePath);

  // 경로 탈출 방지
  if (!filePath.startsWith(BASE)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found: ' + urlPath);
      return;
    }
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      // PWA Service Worker: 같은 출처에서만 등록 허용
      'Service-Worker-Allowed': '/',
    };
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log('');
  console.log('  🎌 Kana Master 웹서버 시작');
  console.log('  ─────────────────────────────────');
  console.log(`  PC 브라우저:   http://localhost:${PORT}`);
  if (HOST === '0.0.0.0') {
    console.log(`  모바일 (같은 WiFi): http://${localIP}:${PORT}`);
  }
  console.log('');
  console.log('  지원 브라우저: Chrome · Safari · Firefox · Edge');
  console.log('  종료: Ctrl+C');
  console.log('');
});

function getLocalIP() {
  const { networkInterfaces } = require('os');
  for (const iface of Object.values(networkInterfaces())) {
    for (const i of iface) {
      if (i.family === 'IPv4' && !i.internal) return i.address;
    }
  }
  return 'localhost';
}
