#!/usr/bin/env node
/*
 * v3 product-readiness audit.
 * Reports curriculum wiring problems and beginner-flow risks without mutating data.
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

function run(ctx, rel, suffix = '') {
  vm.runInContext(`${read(rel)}\n${suffix}`, ctx, { filename: rel });
}

function makeContext() {
  const ctx = { console };
  ctx.window = ctx;
  ctx.document = { write() {} };
  vm.createContext(ctx);
  return ctx;
}

function loadRuntime() {
  const ctx = makeContext();
  [
    'js/kana-levels.js',
    'js/kana-data-hiragana.js',
    'js/kana-data.js',
    'js/kana-data-extra.js',
    'js/data/vocab-items-w1w4.js',
    'js/data/vocab-items-w5w8.js',
    'js/data/vocab-items-w9w10.js',
    'js/data/vocab-items-s1s5.js',
    'js/data/vocab-items-s6sim.js',
    'js/data/vocab-dialogue.js',
    'js/data/vocab-categories.js',
    'apps/current-v3/js/content-index.js',
    'apps/current-v3/js/curriculum.js',
  ].forEach(file => run(ctx, file, file.endsWith('curriculum.js') ? '\nthis.__curriculum = { STAGES, MODULES };' : ''));
  return ctx;
}

function issue(list, level, code, message) {
  list.push({ level, code, message });
}

function stepKanaChars(ctx, step) {
  if (step?.chars?.length) return step.chars;
  const level = ctx.LEVELS.find(item => item.id === step?.levelId);
  return level?.chars || [];
}

function audit() {
  const ctx = loadRuntime();
  const { STAGES, MODULES } = ctx.__curriculum;
  const issues = [];
  const knownStepTypes = new Set([
    'lecture',
    'kana_chart',
    'kana_learn',
    'kana_quiz',
    'kana_listening',
    'shadowing',
    'vocab_learn',
    'vocab_quiz',
    'dialogue_study',
  ]);

  const moduleIds = new Set();
  MODULES.forEach(mod => {
    if (moduleIds.has(mod.id)) issue(issues, 'error', 'duplicate-module', `${mod.id} is duplicated`);
    moduleIds.add(mod.id);
  });

  MODULES.forEach(mod => {
    if (!STAGES.some(stage => stage.id === mod.stageId)) {
      issue(issues, 'error', 'missing-stage', `${mod.id} references missing stage ${mod.stageId}`);
    }
    if ((mod.steps || []).length < 5) {
      issue(issues, 'warn', 'thin-module', `${mod.id} has only ${(mod.steps || []).length} steps`);
    }

    const learnedKana = new Set();
    (mod.steps || []).forEach((step, stepIndex) => {
      if (!knownStepTypes.has(step.type)) {
        issue(issues, 'error', 'unknown-step-type', `${mod.id} step ${stepIndex + 1} uses ${step.type}`);
      }

      if (step.type === 'kana_learn') {
        stepKanaChars(ctx, step).forEach(ch => learnedKana.add(ch));
      }

      if (['kana_quiz', 'kana_listening'].includes(step.type) && mod.stageId <= 2) {
        const chars = stepKanaChars(ctx, step);
        const unknown = chars.filter(ch => !learnedKana.has(ch));
        if (unknown.length) {
          issue(issues, 'error', 'premature-kana-test', `${mod.id} step ${stepIndex + 1} tests before teaching: ${unknown.slice(0, 12).join(' ')}`);
        }
      }

      if (['vocab_learn', 'vocab_quiz'].includes(step.type)) {
        const cards = ctx.ContentIndex.getVocabItems(step);
        if (cards.length < 10) {
          issue(issues, 'warn', 'small-card-set', `${mod.id} step ${stepIndex + 1} has ${cards.length} cards`);
        }
        if (cards.length > 19) {
          issue(issues, 'warn', 'large-card-set', `${mod.id} step ${stepIndex + 1} has ${cards.length} cards`);
        }
      }

      if (step.dialogueKey) {
        const dialogue = ctx.ContentIndex.getDialogue(step.dialogueKey) || [];
        const spoken = dialogue.filter(line => line.speaker !== 'N');
        const padded = dialogue.filter(line => /^v3_pad_/.test(line.id || ''));
        if (!dialogue.length) {
          issue(issues, 'error', 'missing-dialogue', `${mod.id} step ${stepIndex + 1} references ${step.dialogueKey}`);
        } else if (spoken.length < 10) {
          issue(issues, 'warn', 'short-dialogue', `${mod.id} step ${stepIndex + 1} ${step.dialogueKey} has ${spoken.length} spoken lines`);
        }
        if (padded.length) {
          issue(issues, 'warn', 'padded-dialogue', `${mod.id} step ${stepIndex + 1} ${step.dialogueKey} uses ${padded.length} generated filler lines`);
        }
      }
    });

    if (mod.roleplay?.dialogueKey) {
      const dialogue = ctx.ContentIndex.getDialogue(mod.roleplay.dialogueKey) || [];
      const spoken = dialogue.filter(line => line.speaker !== 'N');
      const padded = dialogue.filter(line => /^v3_pad_/.test(line.id || ''));
      if (!dialogue.length) {
        issue(issues, 'error', 'missing-roleplay', `${mod.id} roleplay references ${mod.roleplay.dialogueKey}`);
      } else if (spoken.length < 10) {
        issue(issues, 'warn', 'short-roleplay', `${mod.id} roleplay has ${spoken.length} spoken lines`);
      }
      if (padded.length) {
        issue(issues, 'warn', 'padded-roleplay', `${mod.id} roleplay uses ${padded.length} generated filler lines`);
      }
    }
  });

  return {
    summary: {
      stages: STAGES.length,
      modules: MODULES.length,
      steps: MODULES.reduce((sum, mod) => sum + (mod.steps || []).length, 0),
      roleplays: MODULES.filter(mod => mod.roleplay).length,
      errors: issues.filter(item => item.level === 'error').length,
      warnings: issues.filter(item => item.level === 'warn').length,
    },
    issues,
  };
}

const result = audit();
console.log('\n-- v3 Content Audit Summary --');
Object.entries(result.summary).forEach(([key, value]) => {
  console.log(`${key.padEnd(10)} ${value}`);
});

if (result.issues.length) {
  console.log('\n-- Issues --');
  result.issues.slice(0, 120).forEach(item => {
    console.log(`[${item.level}] ${item.code}: ${item.message}`);
  });
  if (result.issues.length > 120) console.log(`... ${result.issues.length - 120} more`);
}

if (strict && result.summary.errors > 0) process.exit(1);
