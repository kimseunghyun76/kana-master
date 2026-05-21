#!/usr/bin/env node
/* Scan images/scenes/{stages,programs}/<key>/ and write images/scenes/manifest.json.
   For stage scenes (used in small ~66px map medals) we also generate 200px webp
   thumbnails under <key>/.thumbs/ so the browser decodes tiny images instead of
   full-size scene art — big memory/decode win on the home map.

   Run after adding scene images:  npm run scenes  */

'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SCENES_DIR = path.join(ROOT, 'images', 'scenes');
const IMAGE_RE = /\.(webp|png|jpe?g|gif|avif)$/i;
const THUMB_DIR = '.thumbs';
const THUMB_SIZE = 200; // covers 66px medal at up to 3x DPR

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => IMAGE_RE.test(f)).sort();
}

function scanGroup(groupName) {
  const groupDir = path.join(SCENES_DIR, groupName);
  const out = {};
  if (!fs.existsSync(groupDir)) return out;
  for (const key of fs.readdirSync(groupDir)) {
    const keyDir = path.join(groupDir, key);
    if (!fs.statSync(keyDir).isDirectory()) continue;
    const files = listImages(keyDir)
      .map(f => `images/scenes/${groupName}/${key}/${f}`.replace(/\\/g, '/'));
    if (files.length) out[key] = files;
  }
  return out;
}

async function buildStageThumbs() {
  const groupDir = path.join(SCENES_DIR, 'stages');
  const full = {};
  const thumbs = {};
  if (!fs.existsSync(groupDir)) return { full, thumbs };

  for (const key of fs.readdirSync(groupDir)) {
    const keyDir = path.join(groupDir, key);
    if (!fs.statSync(keyDir).isDirectory()) continue;
    const thumbOutDir = path.join(keyDir, THUMB_DIR);
    fs.mkdirSync(thumbOutDir, { recursive: true });

    const fullList = [];
    const thumbList = [];
    for (const f of listImages(keyDir)) {
      const src = path.join(keyDir, f);
      const thumbName = f.replace(IMAGE_RE, '.webp');
      const thumbAbs = path.join(thumbOutDir, thumbName);
      try {
        await sharp(src)
          .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'attention' })
          .webp({ quality: 78 })
          .toFile(thumbAbs);
        thumbList.push(`images/scenes/stages/${key}/${THUMB_DIR}/${thumbName}`.replace(/\\/g, '/'));
        fullList.push(`images/scenes/stages/${key}/${f}`.replace(/\\/g, '/'));
      } catch (e) {
        console.warn(`  thumb failed (${key}/${f}): ${e.message}`);
        // fall back to the full image so the medal still shows something
        fullList.push(`images/scenes/stages/${key}/${f}`.replace(/\\/g, '/'));
        thumbList.push(`images/scenes/stages/${key}/${f}`.replace(/\\/g, '/'));
      }
    }
    if (fullList.length) {
      full[key] = fullList;
      thumbs[key] = thumbList;
    }
  }
  return { full, thumbs };
}

(async () => {
  const { full: stagesFull, thumbs: stages } = await buildStageThumbs();

  const manifest = {
    generatedAt: new Date().toISOString(),
    stages,        // 200px thumbnails — used by map medals
    stagesFull,    // original scene art (kept for reference / larger surfaces)
    programs: scanGroup('programs'), // full art — used by larger poster cards
  };

  const outPath = path.join(SCENES_DIR, 'manifest.json');
  fs.mkdirSync(SCENES_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  const stageCount = Object.values(manifest.stages).reduce((n, a) => n + a.length, 0);
  const programCount = Object.values(manifest.programs).reduce((n, a) => n + a.length, 0);
  console.log(`scene manifest written: ${outPath}`);
  console.log(`  stages: ${Object.keys(manifest.stages).length} keys / ${stageCount} thumbnails (${THUMB_SIZE}px)`);
  console.log(`  programs: ${Object.keys(manifest.programs).length} keys / ${programCount} images`);
})();
