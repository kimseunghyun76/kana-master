# Kana Master Education Audit

## Purpose

This document evaluates the current `master` branch from two perspectives:

- Japanese language pedagogy
- Real-world usefulness for Korean learners who want to function naturally in Japan

It is intended to guide the next full improvement pass of the product.

## Executive Summary

The current app has strong breadth but weak instructional sequencing.

What it does well:

- Covers many real-life scenarios
- Has large dialogue inventory
- Uses TTS, furigana, quizzes, and roleplay-style flows
- Has appealing stage-based motivation

What it does poorly:

- Allows progress without mastery
- Lacks a systematic grammar syllabus
- Uses "roleplay" mostly as playback, not performance
- Does not connect SRS strongly to the v2 learning flow
- Labels stages with JLPT levels that are not yet instructionally justified
- Has missing lecture content for Stage 4 and Stage 5

The app currently feels closer to a rich Japanese exposure app than a rigorously structured skill-building curriculum.

## Key Findings

### 1. Progression is not mastery-based

The biggest structural issue is that quiz failure does not stop progression.

- File: [js/v2/app.js](/Users/dennis/kana-master/kana-master/js/v2/app.js#L1490)
- Current behavior:
  - The app calculates pass/fail using `quizPassRate`
  - Even if the learner fails, `Store.completeStep(...)` is still called

Why this matters:

- Learners accumulate completion without stable recall
- XP becomes disconnected from actual competence
- The app rewards finishing rather than learning

Recommended change:

- Only complete the step when the learner passes
- Failed learners should enter retry mode, not completion mode
- Record best score, last score, and retry count separately

### 2. The grammar spine is too weak

The app has many vocabulary sets and many scenario dialogues, but not enough explicit control over grammar order.

Examples of essential beginner grammar that should be a structured sequence:

- `AはBです`
- `AはBではありません`
- `AはBですか`
- particles: `は / の / も / を / に / で / へ / と`
- existence: `あります / います`
- adjectives: present, past, negative
- verb polite forms
- `て-form`
- requests: `〜てください`
- desire: `〜たい`
- reason: `〜から`
- experience: `〜ことがある`
- obligation: `〜なければなりません`

Current issue:

- Grammar appears as flavor inside lectures or dialogue tips
- It is not the backbone of progression

Recommended change:

- Rebuild Stage 2 and Stage 3 around sentence patterns, not only vocabulary domains
- Each module should own one or two grammar targets

### 3. Roleplay is not true output training

Current roleplay flow:

- File: [js/v2/app.js](/Users/dennis/kana-master/kana-master/js/v2/app.js#L1926)
- Learner mostly watches lines, hears TTS, and can mark completion

Why this matters:

- Real speaking skill comes from retrieval and production
- Passive listening alone does not build interactive fluency

Recommended change:

- Split roleplay into 4 phases:
  - Listen
  - Repeat
  - Prompted response
  - Independent reconstruction
- Replace `완료 ✓` with completion conditions such as:
  - replayed all lines
  - completed speaking prompts
  - passed short response check

### 4. Stage unlocking order is educationally weak

Current issue:

- File: [js/v2/curriculum.js](/Users/dennis/kana-master/kana-master/js/v2/curriculum.js#L128)
- Stage 2 survival Japanese can open after hiragana only
- Katakana is not required before practical survival content

Why this matters:

- Real Japanese environments are saturated with katakana
- Korean learners quickly hit friction in menus, signs, station names, brand names, and loanwords

Recommended change:

- Require basic katakana completion before Stage 2
- Prefer:
  - Hiragana basics
  - Katakana basics
  - Basic greetings
  - Survival core

### 5. High-stage content is structurally incomplete

Current issue:

- File: [js/v2/curriculum.js](/Users/dennis/kana-master/kana-master/js/v2/curriculum.js#L335)
- Stage 4 and Stage 5 reference lecture keys:
  - `b_level_1` to `b_level_6`
  - `k_level_1`
- File: [js/data/lecture-data-v2/index.js](/Users/dennis/kana-master/kana-master/js/data/lecture-data-v2/index.js#L1)
- These lecture files do not exist in the current loader

Impact:

- Business and advanced stages are not instructionally complete
- Learners are offered a path that cannot deliver on its promise

Recommended change:

- Treat Stage 4 and 5 as incomplete curriculum until lecture content is added
- Do not market them internally as fully built N3/N2-equivalent phases yet

### 6. SRS exists, but v2 does not fully use it

Current issue:

- File: [js/modules/srs.js](/Users/dennis/kana-master/kana-master/js/modules/srs.js#L1)
- A useful SRS implementation exists
- But v2 practice mode uses mostly random review flows
- File: [js/v2/app.js](/Users/dennis/kana-master/kana-master/js/v2/app.js#L2294)

Why this matters:

- Long-term retention depends on timely review
- Random review is motivational, but inefficient

Recommended change:

- Add "Today's Due Review" as the default review path
- Separate:
  - due review
  - weak items
  - random practice
- Track mastery state per item visibly

### 7. Stage labels overclaim difficulty

Current issue:

- File: [js/v2/curriculum.js](/Users/dennis/kana-master/kana-master/js/v2/curriculum.js#L8)
- Stages are labeled with JLPT levels
- But the instructional scope does not yet justify those claims

Examples:

- Stage 5 says `N2`, but currently contains only one keigo-focused module
- Stage 4 says `N3`, but does not yet provide full intermediate grammar sequencing

Recommended change:

- Use softer labels for now:
  - "Beginner"
  - "Travel Survival"
  - "Daily Conversation"
  - "Business Communication"
  - "Advanced Politeness"
- Reintroduce JLPT labels only when content and assessment support them

## Content Breadth vs Depth

The app has substantial breadth:

- `VOCAB_ITEMS_DIALOGUE`: 1094 lines
- `VOCAB_CATEGORIES`: 98 categories
- Many travel and IT/business topics

However depth is uneven:

- Many categories are scenario-rich
- Few modules force repeated production of the same target pattern
- There is not enough deliberate recycling across modules

Recommended principle:

- Fewer targets per module
- More recurrence across modules
- More controlled output before free scenario use

## What "Correct Learning Flow" Should Look Like

For Korean learners aiming at functional spoken Japanese, the progression should be:

1. Script recognition and pronunciation
2. Core sentence patterns
3. High-frequency vocabulary attached to those patterns
4. Controlled output
5. Guided dialogue
6. Realistic roleplay
7. Spaced review and recycling
8. Free production

The current app is strongest at steps 3 and 5, but weakest at steps 2, 4, and 7.

## Non-Negotiable Fixes

These must be fixed before expanding content further:

1. Prevent failed quizzes from completing steps
2. Fill missing lecture content for Stage 4 and Stage 5
3. Rework roleplay into real output practice
4. Make SRS review central to v2
5. Rebuild Stage 2 and 3 around grammar + function, not only topic
6. Require katakana earlier

## Design Implications

The current app is text-heavy for beginner retention.

Educationally stronger alternatives:

- Scene illustrations
- comic-strip dialogues
- menu/sign/ticket/document simulations
- image-supported memory hooks
- icon-based situational prompts

This is especially effective for:

- travel Japanese
- service encounters
- katakana
- business etiquette
- emergency phrases

## Final Assessment

The app has enough raw material to become a strong Japanese learning product.

But before adding more content, it needs:

- a stronger instructional backbone
- stricter mastery logic
- deliberate review loops
- more meaningful output training

In short:

- Keep the breadth
- rebuild the progression
- enforce mastery
- make output and review central
