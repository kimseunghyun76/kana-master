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

const ADMIN_SNAPSHOT = path.join(BASE, 'apps/current-v3/admin-curriculum.json');

function resolveExistingPath(requestPath) {
  const candidates = [
    requestPath,
    requestPath.normalize('NFC'),
    requestPath.normalize('NFD'),
  ];
  for (const candidate of candidates) {
    const fullPath = path.join(BASE, candidate);
    if (!fullPath.startsWith(BASE) || !fs.existsSync(fullPath)) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.html');
      if (indexPath.startsWith(BASE) && fs.existsSync(indexPath)) return indexPath;
    }
    return fullPath;
  }
  return path.join(BASE, requestPath);
}

// 캐시 정책: 불변 에셋(mp3, svg, webp, 폰트)은 1년, JS/CSS는 no-cache(항상 재검증), manifest.json은 no-store
const IMMUTABLE_EXTS = new Set(['.mp3', '.wav', '.svg', '.webp', '.png', '.woff2', '.woff', '.ico']);
const NO_CACHE_EXTS  = new Set(['.js', '.css', '.html']);

function getCacheControl(filePath, ext) {
  if (filePath.endsWith('manifest.json')) return 'no-store';
  if (IMMUTABLE_EXTS.has(ext)) return 'public, max-age=31536000, immutable';
  if (NO_CACHE_EXTS.has(ext)) return 'no-cache';
  return 'public, max-age=3600';
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

  if (urlPath === '/api/admin/curriculum') {
    handleAdminCurriculum(req, res);
    return;
  }

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
      'Cache-Control': getCacheControl(filePath, ext),
    };
    res.writeHead(200, headers);
    res.end(data);
  });
});

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function handleAdminCurriculum(req, res) {
  if (req.method === 'GET') {
    fs.readFile(ADMIN_SNAPSHOT, 'utf8', (err, data) => {
      if (err) {
        sendJson(res, 200, { ok: true, exists: false, data: null });
        return;
      }
      try {
        sendJson(res, 200, { ok: true, exists: true, data: JSON.parse(data) });
      } catch {
        sendJson(res, 500, { ok: false, error: 'Saved admin JSON is invalid.' });
      }
    });
    return;
  }

  if (req.method !== 'PUT') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > 20 * 1024 * 1024) req.destroy();
  });
  req.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(body || '{}');
    } catch {
      sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
      return;
    }
    const data = parsed?.data;
    if (!data || typeof data !== 'object') {
      sendJson(res, 400, { ok: false, error: 'Missing data object' });
      return;
    }
    const out = JSON.stringify(data, null, 2) + '\n';
    fs.mkdir(path.dirname(ADMIN_SNAPSHOT), { recursive: true }, err => {
      if (err) {
        sendJson(res, 500, { ok: false, error: err.message });
        return;
      }
      fs.writeFile(ADMIN_SNAPSHOT, out, 'utf8', err2 => {
        if (err2) {
          sendJson(res, 500, { ok: false, error: err2.message });
          return;
        }
        sendJson(res, 200, { ok: true, path: path.relative(BASE, ADMIN_SNAPSHOT) });
      });
    });
  });
  req.on('error', err => {
    sendJson(res, 500, { ok: false, error: err.message });
  });
}

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
