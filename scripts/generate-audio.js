#!/usr/bin/env node
// Azure Neural TTS로 어휘 mp3 일괄 생성
//
// 사용법:
//   node scripts/generate-audio.js                # 모든 vocab 파일
//   node scripts/generate-audio.js w1w4           # 특정 파일만
//   node scripts/generate-audio.js w1w4 --voice nanami
//   node scripts/generate-audio.js --dry          # 글자수만 집계, 호출 안 함
//
// 환경변수: AZURE_SPEECH_KEY, AZURE_SPEECH_REGION

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION || 'koreacentral';

const VOICES = {
  nanami: { name: 'ja-JP-NanamiNeural', label: '나나미 (따뜻·표준)',   gender: 'F' },
  aoi:    { name: 'ja-JP-AoiNeural',    label: '아오이 (밝은 톤)',      gender: 'F' },
  mayu:   { name: 'ja-JP-MayuNeural',   label: '마유 (정중·차분)',      gender: 'F' },
  keita:  { name: 'ja-JP-KeitaNeural',  label: '케이타 (표준 남성)',     gender: 'M' },
};

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'audio');
const DATA_DIR = path.join(ROOT, 'js', 'data');

const VOCAB_FILES = [
  'vocab-items-w1w4.js',
  'vocab-items-w5w8.js',
  'vocab-items-w9w10.js',
  'vocab-items-s1s5.js',
  'vocab-items-s6sim.js',
  'vocab-items-it-sim.js',
  'vocab-dialogue.js',  // 롤플레이 다이얼로그
];

const LECTURE_DIR = path.join(ROOT, 'js', 'data', 'lecture-data-v2');
const KANA_FILES = ['js/kana-data-hiragana.js', 'js/kana-data.js', 'js/kana-data-extra.js'];

// 인자 파싱
const args = process.argv.slice(2);
const dryRun = args.includes('--dry');
const voiceArg = (() => {
  const i = args.indexOf('--voice');
  return i >= 0 ? args[i + 1] : null;
})();
const filterArg = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--voice');

const targetVoices = voiceArg ? { [voiceArg]: VOICES[voiceArg] } : VOICES;
if (voiceArg && !VOICES[voiceArg]) {
  console.error(`알 수 없는 화자: ${voiceArg}. 사용 가능: ${Object.keys(VOICES).join(', ')}`);
  process.exit(1);
}

// 데이터 파일을 sandbox로 로드 (var 선언 캡처)
function loadVocab(file) {
  const fullPath = path.join(DATA_DIR, file);
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  for (const k of Object.keys(sandbox)) {
    if (Array.isArray(sandbox[k])) return { name: k, items: sandbox[k] };
  }
  return null;
}

// 강의 슬라이드 전체 captionJp 수집
function loadLectures() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of fs.readdirSync(LECTURE_DIR)) {
    if (f === 'index.js') continue;
    if (!f.endsWith('.js')) continue;
    const code = fs.readFileSync(path.join(LECTURE_DIR, f), 'utf8');
    try { vm.runInContext(code, sandbox); } catch (_) {}
  }
  const data = sandbox.window.LECTURE_DATA || {};
  const items = [];
  for (const key of Object.keys(data)) {
    const slides = data[key];
    if (!Array.isArray(slides)) continue;
    slides.forEach((slide, idx) => {
      if (!slide?.captionJp) return;
      // 후리가나(漢字(かな)) 제거 + 정제
      const text = cleanForTTS(stripFurigana(slide.captionJp));
      if (!text) return;
      items.push({ id: `lec_${key}_${idx}`, text, source: `lecture/${key}` });
    });
  }
  return items;
}

// 가나 문자 전체 수집
function loadKana() {
  const sandbox = {};
  vm.createContext(sandbox);
  for (const f of KANA_FILES) {
    const fullPath = path.join(ROOT, f);
    if (!fs.existsSync(fullPath)) continue;
    try { vm.runInContext(fs.readFileSync(fullPath, 'utf8'), sandbox); } catch (_) {}
  }
  const m = sandbox.KANA_MAP || {};
  const items = [];
  for (const [ch, v] of Object.entries(m)) {
    if (!v || typeof v !== 'object') continue;
    const type = v.type || 'unknown';
    const prefix = type.startsWith('hiragana') ? 'h'
                : type.startsWith('katakana') ? 'k'
                : type === 'particle'         ? 'p'
                : 's';
    const romaji = (v.romaji || '').replace(/[^a-z0-9]/gi, '_');
    if (!romaji) continue;
    items.push({ id: `kana_${prefix}_${romaji}`, text: ch, source: `kana/${type}` });
  }
  return items;
}

// 후리가나 제거: 「漢字(かんじ)」 → 「漢字」 (괄호 안 가나만)
function stripFurigana(s) {
  if (!s) return '';
  // 일본어 한자/가나 뒤의 (가나) 만 제거
  return s.replace(/([一-龯々ぁ-んァ-ヶー]+)\(([ぁ-んァ-ヶー]+)\)/g, '$1');
}

// TTS 입력 텍스트 정제
// - 「し・よん」 같은 슬래시 표기는 첫 단어만 채택
// - 「〜じ」 의 〜 제거
// - 괄호 안 후리가나(ふりがな) 제거: 月曜日(げつようび) → 月曜日
function cleanForTTS(text) {
  if (!text) return '';
  let t = text;
  t = t.split('・')[0];               // 슬래시 변형 제거
  t = t.replace(/[〜~]/g, '');         // 물결 기호 제거
  t = t.replace(/\([^)]*\)/g, '');    // 괄호 후리가나 제거
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

// SSML 빌드
function buildSSML(text, voiceName) {
  const safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<speak version="1.0" xml:lang="ja-JP" xmlns="http://www.w3.org/2001/10/synthesis">
  <voice name="${voiceName}">
    <prosody rate="-5%">${safe}</prosody>
  </voice>
</speak>`;
}

// Azure REST 호출 (429 재시도 + 지수 백오프)
async function synth(text, voiceName, attempt = 1) {
  const url = `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'kana-master-tts',
    },
    body: buildSSML(text, voiceName),
  });
  if (res.status === 429 && attempt <= 10) {
    // F0 분당 20회 제한 — Retry-After 헤더 또는 지수 백오프 (최대 90s, 최대 10회)
    const ra = parseFloat(res.headers.get('retry-after') || '0');
    const wait = ra > 0 ? ra * 1000 : Math.min(90000, 5000 * Math.pow(1.5, attempt - 1));
    await new Promise(r => setTimeout(r, wait));
    return synth(text, voiceName, attempt + 1);
  }
  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${err.slice(0, 200)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

// 동시성 제한 실행
async function pMap(items, fn, concurrency = 4) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (true) {
      const idx = cursor++;
      if (idx >= items.length) return;
      results[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  if (!KEY && !dryRun) {
    console.error('AZURE_SPEECH_KEY 환경변수가 없습니다. 새 PowerShell 창에서 실행하세요.');
    process.exit(1);
  }

  // 모드: --lectures만 / --kana만 / 일반(어휘+대화) / --all (모두)
  const lecturesOnly = args.includes('--lectures');
  const kanaOnly = args.includes('--kana');
  const includeAll = args.includes('--all');
  const includeVocab = !lecturesOnly && !kanaOnly;
  const includeLectures = lecturesOnly || includeAll;
  const includeKana = kanaOnly || includeAll;

  // 어휘 대상 파일
  const files = filterArg
    ? VOCAB_FILES.filter(f => f.includes(filterArg))
    : VOCAB_FILES;

  // 모든 항목 수집
  const allItems = [];
  if (includeVocab) {
    if (files.length === 0) {
      console.error(`대상 파일 없음. 필터: ${filterArg}`);
      process.exit(1);
    }
    for (const file of files) {
      const loaded = loadVocab(file);
      if (!loaded) { console.warn(`스킵 (배열 못 찾음): ${file}`); continue; }
      for (const item of loaded.items) {
        const text = cleanForTTS(item.japanese);
        if (!text || !item.id) continue;
        allItems.push({ id: item.id, text, source: file });
      }
    }
  }
  if (includeLectures) {
    const lecItems = loadLectures();
    console.log(`강의 captionJp 수집: ${lecItems.length}개`);
    allItems.push(...lecItems);
  }
  if (includeKana) {
    const kanaItems = loadKana();
    console.log(`가나 문자 수집: ${kanaItems.length}개`);
    allItems.push(...kanaItems);
  }

  // 글자수 집계
  let totalChars = 0;
  for (const it of allItems) totalChars += it.text.length;
  const callsPerVoice = allItems.length;
  const totalVoices = Object.keys(targetVoices).length;
  const totalCalls = callsPerVoice * totalVoices;
  const billedChars = totalChars * totalVoices;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`대상 파일      : ${files.length}개 (${files.join(', ')})`);
  console.log(`아이템         : ${allItems.length}개`);
  console.log(`화자           : ${Object.entries(targetVoices).map(([k,v]) => `${k}(${v.label})`).join(', ')}`);
  console.log(`총 호출        : ${totalCalls}회`);
  console.log(`총 글자수      : ${billedChars.toLocaleString()}자 (Neural F0 무료 한도: 500,000자/월)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (dryRun) {
    console.log('[--dry] 호출하지 않고 종료');
    return;
  }

  // 출력 폴더 준비
  for (const v of Object.keys(targetVoices)) {
    fs.mkdirSync(path.join(OUT_DIR, v), { recursive: true });
  }

  // 매니페스트 (기존 + 갱신)
  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  let manifest = { generatedAt: null, voices: {}, items: {}, textIndex: {}, lectures: {} };
  if (fs.existsSync(manifestPath)) {
    try {
      const old = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest = { generatedAt: old.generatedAt || null,
                   voices: old.voices || {},
                   items: old.items || {},
                   textIndex: old.textIndex || {},
                   lectures: old.lectures || {} };
    } catch (_) {}
  }
  // 화자 메타 — 현재 VOICES로 완전 교체 (옛 화자 제거)
  manifest.voices = {};
  for (const [k, v] of Object.entries(VOICES)) {
    manifest.voices[k] = { name: v.name, label: v.label, gender: v.gender };
  }
  // 인덱스 갱신
  for (const item of allItems) {
    if (item.id.startsWith('lec_')) {
      // 강의: lec_<key>_<idx> → 클라이언트는 key+idx로 조회
      const m = item.id.match(/^lec_(.+)_(\d+)$/);
      if (m) manifest.lectures[`${m[1]}_${m[2]}`] = item.id;
    } else {
      manifest.textIndex[item.text] = item.id;
    }
  }

  // 작업 큐 생성 (이미 있는 파일은 스킵)
  const jobs = [];
  for (const item of allItems) {
    for (const [vKey, vDef] of Object.entries(targetVoices)) {
      const outPath = path.join(OUT_DIR, vKey, `${item.id}.mp3`);
      if (fs.existsSync(outPath)) continue;
      jobs.push({ item, vKey, vName: vDef.name, outPath });
    }
  }
  console.log(`신규 생성 대상: ${jobs.length}개 (이미 존재하는 항목은 스킵)`);

  let done = 0, failed = 0;
  const failures = [];
  const startTime = Date.now();

  await pMap(jobs, async (job) => {
    try {
      const buf = await synth(job.item.text, job.vName);
      fs.writeFileSync(job.outPath, buf);
      done++;
      if (done % 20 === 0 || done === jobs.length) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`  [${done}/${jobs.length}] ${elapsed}s 경과`);
      }
      // 매니페스트 기록
      const cur = manifest.items[job.item.id] || { text: job.item.text, voices: [] };
      if (!cur.voices.includes(job.vKey)) cur.voices.push(job.vKey);
      manifest.items[job.item.id] = cur;
    } catch (e) {
      failed++;
      failures.push({ id: job.item.id, voice: job.vKey, error: e.message });
      console.error(`  실패: ${job.item.id} (${job.vKey}) - ${e.message}`);
    }
  }, 8);

  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`완료: ${done}개 성공 / ${failed}개 실패`);
  console.log(`매니페스트: ${path.relative(ROOT, manifestPath)}`);
  if (failures.length) {
    console.log('\n실패 목록:');
    failures.slice(0, 10).forEach(f => console.log(`  - ${f.id} (${f.voice}): ${f.error}`));
    if (failures.length > 10) console.log(`  ... 외 ${failures.length - 10}개`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
