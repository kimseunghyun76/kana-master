// ============================================================
// KANA HELPERS - shared utilities for kana level and quiz data
// ============================================================

'use strict';

// 모든 가나를 타입별로 그룹화
function getCharsByType(type) {
  return Object.keys(KANA_MAP).filter(k => KANA_MAP[k].type === type);
}

// 레벨의 캐릭터 데이터 반환
function getLevelChars(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return [];
  return level.chars.map(k => ({ kana: k, ...KANA_MAP[k] })).filter(c => c.romaji);
}

// 퀴즈용 오답 선택지 생성 (같은 타입에서 랜덤)
function getWrongOptions(correctKana, count = 3, fieldType = 'romaji') {
  const info = KANA_MAP[correctKana];
  if (!info) return [];
  const sameType = Object.entries(KANA_MAP)
    .filter(([k, v]) => k !== correctKana && v.type === info.type && v[fieldType] !== info[fieldType]);
  const shuffled = sameType.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(([k, v]) => ({kana: k, ...v}));
}

if (typeof module !== 'undefined') {
  module.exports = { getLevelChars, getWrongOptions, getCharsByType };
}
