#!/usr/bin/env node
/*
 * Content audit for commercial readiness.
 * Default mode reports issues but exits 0. Use --strict to fail on errors.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const strict = process.argv.includes('--strict');

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function listFiles(dir) {
  return fs.readdirSync(path.join(root, dir))
    .filter(name => name.endsWith('.js') && name !== 'index.js')
    .sort()
    .map(name => path.join(dir, name));
}

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

function loadRuntime() {
  const ctx = makeContext();
  [
    'js/data/vocab-items-w1w4.js',
    'js/data/vocab-items-w5w8.js',
    'js/data/vocab-items-w9w10.js',
    'js/data/vocab-items-s1s5.js',
    'js/data/vocab-items-s6sim.js',
    'js/data/vocab-items-it-sim.js',
    'js/data/vocab-dialogue.js',
    'js/data/vocab-categories.js',
    'js/v2/content-index.js',
    'js/v2/module-visuals.js',
  ].forEach(file => run(ctx, file));

  ctx.LECTURE_DATA = {};
  listFiles('js/data/lecture-data-v2').forEach(file => run(ctx, file));
  run(ctx, 'js/v2/curriculum.js', '\nthis.__curriculum = { STAGES, MODULES };');
  return ctx;
}

function itemSources(ctx) {
  return [
    ['VOCAB_ITEMS_W1W4', ctx.VOCAB_ITEMS_W1W4 || []],
    ['VOCAB_ITEMS_W5W8', ctx.VOCAB_ITEMS_W5W8 || []],
    ['VOCAB_ITEMS_W9W10', ctx.VOCAB_ITEMS_W9W10 || []],
    ['VOCAB_ITEMS_S1S5', ctx.VOCAB_ITEMS_S1S5 || []],
    ['VOCAB_ITEMS_S6SIM', ctx.VOCAB_ITEMS_S6SIM || []],
    ['VOCAB_ITEMS_IT_SIM', ctx.VOCAB_ITEMS_IT_SIM || []],
    ['VOCAB_ITEMS_DIALOGUE', ctx.VOCAB_ITEMS_DIALOGUE || []],
  ];
}

function addIssue(issues, level, code, message) {
  issues.push({ level, code, message });
}

function existsAsset(src) {
  if (!src || /^(?:https?:|data:)/.test(src)) return true;
  return fs.existsSync(path.join(root, src.replace(/^\//, '')));
}

function audit() {
  const ctx = loadRuntime();
  const { STAGES, MODULES } = ctx.__curriculum;
  const allVocab = itemSources(ctx).flatMap(([source, items]) => items.map(item => ({ ...item, source })));
  const lectureData = ctx.LECTURE_DATA || {};
  const categories = ctx.VOCAB_CATEGORIES || [];
  const issues = [];

  const ids = new Map();
  allVocab.forEach(item => {
    if (!item.id) {
      addIssue(issues, 'error', 'missing-id', `${item.source} has an item without id`);
      return;
    }
    if (ids.has(item.id)) addIssue(issues, 'error', 'duplicate-id', `${item.id} appears in ${ids.get(item.id)} and ${item.source}`);
    ids.set(item.id, item.source);
    if (!item.japanese && item.speaker !== 'N') addIssue(issues, 'warn', 'missing-japanese', `${item.id} has no Japanese text`);
    if (!item.korean) addIssue(issues, 'warn', 'missing-korean', `${item.id} has no Korean text`);
  });

  const phraseKeys = new Map();
  allVocab.forEach(item => {
    const key = `${item.japanese || ''}::${item.korean || ''}`.trim();
    if (!item.japanese || !item.korean) return;
    if (phraseKeys.has(key)) addIssue(issues, 'warn', 'duplicate-phrase', `${item.id} duplicates ${phraseKeys.get(key)}`);
    else phraseKeys.set(key, item.id);
  });

  categories.forEach(cat => {
    (cat.items || []).forEach(id => {
      if (!ids.has(id)) addIssue(issues, 'error', 'missing-category-item', `${cat.id} references missing item ${id}`);
    });
  });

  MODULES.forEach(mod => {
    if ((mod.steps || []).length < 4) addIssue(issues, 'warn', 'thin-module', `${mod.id} has only ${(mod.steps || []).length} steps`);
    (mod.steps || []).forEach((step, idx) => {
      if (step.type === 'lecture' && !lectureData[step.lectureKey]) {
        addIssue(issues, 'error', 'missing-lecture', `${mod.id} step ${idx} references ${step.lectureKey}`);
      }
      const categoryIds = [step.categoryId, ...(step.categoryIds || [])].filter(Boolean);
      categoryIds.forEach(categoryId => {
        const items = ctx.ContentIndex.getVocabItems({ categoryId });
        if (!items.length) addIssue(issues, 'error', 'empty-category', `${mod.id} step ${idx} has empty category ${categoryId}`);
        if (items.length > 0 && items.length < 5) addIssue(issues, 'warn', 'small-category', `${categoryId} has only ${items.length} resolved items`);
      });
      if (step.dialogueKey) {
        const lines = ctx.ContentIndex.getDialogue(step.dialogueKey) || [];
        if (!lines.length) addIssue(issues, 'error', 'missing-dialogue', `${mod.id} step ${idx} references ${step.dialogueKey}`);
        if (lines.length > 0 && lines.length < 6) addIssue(issues, 'warn', 'short-dialogue', `${step.dialogueKey} has only ${lines.length} lines`);
      }
    });
    if (mod.roleplay?.dialogueKey) {
      const lines = ctx.ContentIndex.getDialogue(mod.roleplay.dialogueKey) || [];
      if (!lines.length) addIssue(issues, 'error', 'missing-roleplay-dialogue', `${mod.id} roleplay references ${mod.roleplay.dialogueKey}`);
      if (lines.length > 0 && lines.length < 8) addIssue(issues, 'warn', 'short-roleplay', `${mod.id} roleplay has only ${lines.length} lines`);
    }
    const visual = ctx.ModuleVisuals.get(mod);
    ['image', 'coverImage', 'roleplayImage'].forEach(key => {
      if (visual[key] && !existsAsset(visual[key])) addIssue(issues, 'error', 'missing-visual', `${mod.id} visual ${key} missing: ${visual[key]}`);
    });
  });

  Object.entries(lectureData).forEach(([lectureKey, slides]) => {
    if (!Array.isArray(slides) || !slides.length) addIssue(issues, 'error', 'empty-lecture', `${lectureKey} has no slides`);
    (slides || []).forEach((slide, idx) => {
      if (!slide.main) addIssue(issues, 'warn', 'lecture-missing-main', `${lectureKey} slide ${idx} has no main text`);
      if (slide.image && !existsAsset(slide.image)) addIssue(issues, 'error', 'missing-lecture-image', `${lectureKey} slide ${idx} image missing: ${slide.image}`);
    });
  });

  const summary = {
    stages: STAGES.length,
    modules: MODULES.length,
    steps: MODULES.reduce((sum, mod) => sum + (mod.steps || []).length, 0),
    lectures: Object.keys(lectureData).length,
    roleplays: MODULES.filter(mod => mod.roleplay).length,
    vocabRecords: allVocab.length,
    categories: categories.length,
    issues: {
      errors: issues.filter(issue => issue.level === 'error').length,
      warnings: issues.filter(issue => issue.level === 'warn').length,
    },
  };

  return { summary, issues };
}

const result = audit();
console.log('\n-- Content Audit Summary --');
Object.entries(result.summary).forEach(([key, value]) => {
  console.log(`${String(key).padEnd(14)} ${typeof value === 'object' ? JSON.stringify(value) : value}`);
});

if (result.issues.length) {
  console.log('\n-- Issues --');
  result.issues.slice(0, 80).forEach(issue => {
    console.log(`[${issue.level}] ${issue.code}: ${issue.message}`);
  });
  if (result.issues.length > 80) console.log(`... ${result.issues.length - 80} more`);
}

if (strict && result.summary.issues.errors > 0) process.exit(1);
