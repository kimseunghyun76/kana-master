#!/usr/bin/env node
/*
 * Deep content audit — validates reference integrity that audit-v3 does not:
 *  - lecture steps resolve to real lecture slides (with captions)
 *  - vocab_learn / vocab_quiz steps resolve to real vocab items (jp + ko)
 *  - quiz steps have enough items for distractors
 *  - kana steps resolve to characters
 *  - every module/step/roleplay has the names/titles the UI prints
 * Read-only. Exits 1 on errors (use in `npm run check`).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const strict = process.argv.includes('--strict');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');

function makeContext() {
  const ctx = { console };
  ctx.window = ctx;
  ctx.document = { write() {} };
  vm.createContext(ctx);
  return ctx;
}
function run(ctx, rel, suffix = '') {
  vm.runInContext(`${read(rel)}\n${suffix}`, ctx, { filename: rel });
}

const ctx = makeContext();
[
  'js/kana-levels.js', 'js/kana-data-hiragana.js', 'js/kana-data.js', 'js/kana-data-extra.js',
  'js/data/vocab-items-w1w4.js', 'js/data/vocab-items-w5w8.js', 'js/data/vocab-items-w9w10.js',
  'js/data/vocab-items-s1s5.js', 'js/data/vocab-items-s6sim.js', 'js/data/vocab-items-it-sim.js',
  'js/data/vocab-dialogue.js', 'js/data/vocab-categories.js',
  'apps/current-v3/js/lecture-data.js',
  'apps/current-v3/js/content-index.js',
  'apps/current-v3/js/curriculum.js',
].forEach(f => run(ctx, f, f.endsWith('curriculum.js') ? '\nthis.__c = { STAGES, MODULES };' : ''));

const { STAGES, MODULES } = ctx.__c;
const LECTURE = ctx.LECTURE_DATA || {};
const CI = ctx.ContentIndex;
const LEVELS = ctx.LEVELS || [];
const errors = [];
const warns = [];
const E = m => errors.push(m);
const W = m => warns.push(m);

const VOCAB_LEARN = ['vocab_learn'];
const VOCAB_QUIZ = ['vocab_quiz'];
const KANA_TYPES = ['kana_learn', 'kana_quiz', 'kana_listening'];

let stepCount = 0, lectureSteps = 0, vocabSteps = 0, kanaSteps = 0;

for (const stage of STAGES) {
  if (!stage.name) E(`stage ${stage.id}: no name`);
}

for (const mod of MODULES) {
  if (!mod.name) E(`${mod.id}: module has no name`);
  if (!STAGES.find(s => s.id === mod.stageId)) E(`${mod.id}: references missing stage ${mod.stageId}`);
  const steps = mod.steps || [];
  if (!steps.length) E(`${mod.id}: no steps`);

  steps.forEach((step, i) => {
    stepCount++;
    const tag = `${mod.id} step ${i + 1} (${step.type})`;
    if (!step.title) W(`${tag}: no title`);

    if (step.type === 'lecture') {
      lectureSteps++;
      const slides = LECTURE[step.lectureKey];
      if (!step.lectureKey) E(`${tag}: lecture has no lectureKey`);
      else if (!Array.isArray(slides) || !slides.length) E(`${tag}: lectureKey '${step.lectureKey}' has no lecture data`);
      else {
        const empty = slides.filter(s => !(s.captionJp || s.caption || s.text || s.body || s.title));
        if (empty.length) W(`${tag}: lecture '${step.lectureKey}' ${empty.length}/${slides.length} slides have no caption/text`);
      }
    }

    if (VOCAB_LEARN.includes(step.type) || VOCAB_QUIZ.includes(step.type)) {
      vocabSteps++;
      let items = [];
      try { items = CI.getVocabItems(step) || []; } catch (e) { E(`${tag}: getVocabItems threw ${e.message}`); }
      if (!items.length) {
        E(`${tag}: resolves to 0 vocab items (categoryId='${step.categoryId || ''}' categoryIds='${(step.categoryIds || []).join(',')}')`);
      } else {
        const bad = items.filter(it => !it.japanese || !(it.korean || it.meaning || it.kr));
        if (bad.length) E(`${tag}: ${bad.length}/${items.length} items missing japanese/korean`);
        if (VOCAB_QUIZ.includes(step.type) && items.length < 4) W(`${tag}: only ${items.length} items (quiz needs >=4 for distractors)`);
      }
    }

    if (KANA_TYPES.includes(step.type)) {
      kanaSteps++;
      let chars = step.chars;
      if ((!chars || !chars.length) && step.levelId != null) {
        const lvl = LEVELS.find(l => l.id === step.levelId);
        chars = lvl && lvl.chars;
      }
      if ((!chars || !chars.length) && step.levelId == null && !step.kanaType) {
        E(`${tag}: no chars/levelId/kanaType resolved`);
      }
    }
  });

  if (mod.roleplay) {
    if (!mod.roleplay.name) W(`${mod.id}: roleplay has no name`);
  }
}

console.log('-- Deep Content Audit --');
console.log(`stages ${STAGES.length}  modules ${MODULES.length}  steps ${stepCount}`);
console.log(`lecture-steps ${lectureSteps}  vocab-steps ${vocabSteps}  kana-steps ${kanaSteps}  lecture-keys ${Object.keys(LECTURE).length}`);
console.log(`ERRORS ${errors.length}  WARNINGS ${warns.length}`);
if (errors.length) { console.log('\n== ERRORS =='); errors.forEach(m => console.log('  [E] ' + m)); }
if (warns.length) { console.log('\n== WARNINGS =='); warns.forEach(m => console.log('  [W] ' + m)); }

if (errors.length > 0 || (strict && warns.length > 0)) process.exit(1);
