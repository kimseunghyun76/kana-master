# Master Improvement Roadmap

## Goal

Turn the current app from a broad Japanese exposure app into a structured, mastery-driven learning system for Korean learners.

This roadmap is ordered by educational impact, not just implementation ease.

## Phase 1: Structural Fixes

### 1. Stop false completion

Priority: Critical

Tasks:

- Change quiz result flow so failed quizzes do not complete the step
- Store:
  - last score
  - best score
  - pass/fail
  - retry count
- Add explicit retry flow after failure

Files:

- [js/v2/app.js](/Users/dennis/kana-master/kana-master/js/v2/app.js)
- [js/v2/store.js](/Users/dennis/kana-master/kana-master/js/v2/store.js)

Definition of done:

- No failed learner can advance a module step
- Completion screen changes depending on pass/fail

### 2. Connect SRS to v2 review

Priority: Critical

Tasks:

- Add a due-review mode in v2
- Connect vocab and kana review flows to due items first
- Distinguish:
  - due review
  - weak items
  - random review
- Display due counts on the practice screen

Files:

- [js/modules/srs.js](/Users/dennis/kana-master/kana-master/js/modules/srs.js)
- [js/v2/app.js](/Users/dennis/kana-master/kana-master/js/v2/app.js)
- [js/v2/store.js](/Users/dennis/kana-master/kana-master/js/v2/store.js)

Definition of done:

- The default review path prioritizes due items
- The learner can see what is due today

### 3. Fix stage gating

Priority: High

Tasks:

- Require basic katakana completion before Stage 2 survival modules
- Revisit unlock XP thresholds after restructuring

Files:

- [js/v2/curriculum.js](/Users/dennis/kana-master/kana-master/js/v2/curriculum.js)

Definition of done:

- Stage 2 feels readable in real-life contexts

## Phase 2: Curriculum Redesign

### 4. Rebuild Stage 2 as "N5 Core Grammar + Survival"

Priority: Critical

Target module structure:

1. Self-introduction and copula
2. Demonstratives and possession
3. Basic particles
4. Numbers, prices, time
5. Existence and location
6. Adjectives
7. Verb polite forms
8. Request and service language

Each module should include:

- short lecture
- 6 to 12 target items
- 1 grammar focus
- controlled practice
- guided output
- scenario wrap-up

Definition of done:

- Stage 2 can honestly serve as a practical N5 survival core

### 5. Rebuild Stage 3 as "Everyday Conversation Expansion"

Priority: High

Grammar targets to include:

- `て-form`
- sequencing
- desire `〜たい`
- reason `〜から`
- invitations
- experience `〜ことがある`
- obligation `〜なければなりません`

Definition of done:

- Stage 3 transitions the learner from phrase-user to sentence-builder

### 6. Reframe Stage labels

Priority: High

Tasks:

- Replace premature JLPT claims with functional labels until justified
- Reintroduce JLPT labels only when:
  - grammar scope is mapped
  - assessment exists
  - review loop exists

Definition of done:

- Stage expectations are honest and useful

## Phase 3: Missing Content Completion

### 7. Add missing business and advanced lectures

Priority: Critical

Missing keys:

- `b_level_1`
- `b_level_2`
- `b_level_3`
- `b_level_4`
- `b_level_5`
- `b_level_6`
- `k_level_1`

Tasks:

- Create lecture files under `js/data/lecture-data-v2/`
- Include narrative + cultural + grammar explanation + practical usage

Definition of done:

- All lecture references in curriculum resolve correctly

### 8. Audit dialogue naturalness

Priority: High

Tasks:

- Review dialogue lines for:
  - register consistency
  - realistic service phrasing
  - Korean-leaning unnatural translations
  - over-literal scenario writing
- Add context notes where expressions are situational

Definition of done:

- Each major dialogue set feels natural and teachable

## Phase 4: Output and Assessment Redesign

### 9. Convert roleplay into performance flow

Priority: Critical

Target sequence:

1. Preview the scenario
2. Listen to the full conversation
3. Repeat key lines
4. Fill missing responses
5. Produce selected lines with hints
6. Complete the conversation

Definition of done:

- Roleplay requires retrieval, not just playback

### 10. Add controlled output exercises

Priority: High

Exercise types:

- reorder the sentence
- choose the missing particle
- choose correct politeness level
- translate a short prompt into Japanese with hints
- rewrite the same pattern using different information

Definition of done:

- Every module includes at least one output-bearing exercise

## Phase 5: Visual and Fun Layer

### 11. Replace text-only heavy learning with visual anchors

Priority: High

Recommended assets:

- airport counter scenes
- restaurant menu boards
- station maps and exits
- hotel desk scenes
- convenience store checkout scenes
- clinic and pharmacy scenes
- Slack / PR / meeting mockups for IT modules

Recommended formats:

- scene card
- comic strip
- choice-based simulation
- document-reading challenge
- visual mnemonic cards

Definition of done:

- Beginners can understand context faster before decoding text

### 12. Image generation pipeline

Priority: Medium

Use image generation for:

- scenario illustrations
- recurring character set
- memory hooks
- UI background assets for modules

Guidelines:

- Keep a consistent visual identity
- Prefer reusable scene systems over one-off illustrations
- Tie images directly to learning actions

## Suggested Content Production Order

1. Stage 2 grammar rebuild
2. Stage 2 scenario visuals
3. Stage 3 grammar expansion
4. Roleplay redesign
5. Stage 4 business lectures
6. Stage 5 advanced politeness

## Concrete Next Sprint

The next implementation sprint should focus only on the following:

1. Fix quiz completion logic
2. Add due-review mode
3. Require katakana before survival stage
4. Add missing lecture placeholders for Stage 4 and 5
5. Draft new Stage 2 grammar-first module map

## Success Criteria

The redesign is working if:

- learners cannot progress through failure
- review feels scheduled, not random
- beginners can build sentences, not just recognize words
- roleplay requires output
- stage promises match real skill level
- visual learning improves engagement without weakening rigor
