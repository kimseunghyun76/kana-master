// Kana Master — 웹서비스 정적 파일 서버
// 모바일 웹 + PC 브라우저 (Chrome/Safari/Firefox/Edge) 모두 지원
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
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

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/app.html';

  const filePath = path.join(BASE, urlPath);
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

server.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log('');
  console.log('  🎌 Kana Master 웹서버 시작');
  console.log('  ─────────────────────────────────');
  console.log(`  PC 브라우저:   http://localhost:${PORT}`);
  console.log(`  모바일 (같은 WiFi): http://${localIP}:${PORT}`);
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
