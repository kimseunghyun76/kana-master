// ════════════════════════════════════════════════════════
//  Service Worker — Kana Master PWA
//  전략: Cache First (핵심 파일) + Network First (데이터)
// ════════════════════════════════════════════════════════

const APP_VERSION  = '2.8';                            // ← 배포 시 이 값만 올리면 캐시 자동 갱신
const CACHE_NAME   = `jp-master-v${APP_VERSION}`;
const STATIC_CACHE = `jp-static-v${APP_VERSION}`;

// v2 앱 핵심 파일
const CORE_FILES = [
  '/index.html',
  '/css/v2.css',
  '/js/kana-data.js',
  '/js/data/vocab-items-w1w4.js',
  '/js/data/vocab-items-w5w8.js',
  '/js/data/vocab-items-w9w10.js',
  '/js/data/vocab-items-s1s5.js',
  '/js/data/vocab-items-s6sim.js',
  '/js/data/vocab-items-it-sim.js',
  '/js/data/vocab-dialogue.js',
  '/js/v2/utils.js',
  '/js/v2/tts.js',
  '/js/v2/store.js',
  '/js/v2/curriculum.js',
  '/js/v2/app.js',
  // v1 (legacy)
  '/app.html',
  '/app.css',
];

// ── 설치: 핵심 파일 캐시 ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(CORE_FILES).catch(err => {
        console.warn('[SW] 일부 파일 캐시 실패:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── 활성화: 구버전 캐시 삭제 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== STATIC_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── 요청 가로채기 ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 외부 요청(localhost TTS 서버 등)은 캐시 안 함
  if (url.origin !== self.location.origin) return;

  // sounds/ 파일: Cache First (오디오 파일은 변경 없음)
  if (url.pathname.startsWith('/sounds/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // JS/CSS/HTML: Network First (개발 중 수정사항 즉시 반영)
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/'
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 나머지: Network First (온라인 우선, 실패 시 캐시)
  event.respondWith(networkFirst(request));
});

// Cache First: 캐시 → 없으면 네트워크 → 캐시에 저장
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('오프라인 상태입니다.', { status: 503 });
  }
}

// Network First: 네트워크 → 실패 시 캐시
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('오프라인 상태입니다.', { status: 503 });
  }
}
