// ═══════════════════════════════════════════════════
//  SRS — Spaced Repetition System (SM-2 변형)
//  각 가나/어휘 카드에 복습 일정을 부여하고
//  다음에 복습해야 할 항목을 우선 제시합니다.
// ═══════════════════════════════════════════════════

/**
 * SM-2 알고리즘 기반 SRS
 *
 * state.progress[key] 구조 (SRS 필드 추가):
 *  {
 *    seen: 0, correct: 0, incorrect: 0, flipped: 0,
 *    // ── SRS 추가 필드 ──
 *    srsEasiness:  2.5,   // EF (Easiness Factor) 1.3 ~ 5.0
 *    srsInterval:  0,     // 현재 복습 간격 (일 단위)
 *    srsRepetitions: 0,   // 연속 정답 횟수
 *    srsDueDate:  null,   // 다음 복습 날짜 'YYYY-MM-DD'
 *    srsLastReview: null, // 마지막 복습 날짜 'YYYY-MM-DD'
 *  }
 *
 * grade: 0 (완전 오답) ~ 5 (완벽 정답)
 *   5 = 완벽 / 4 = 정답(약간 망설임) / 3 = 정답(어려움)
 *   2 = 오답(정답 보면 기억) / 1 = 오답 / 0 = 완전 망각
 */

const EASINESS_MIN = 1.3;
const EASINESS_MAX = 5.0;

function _today() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function _addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * 플래시카드 자가평가 → SRS 스케줄 업데이트
 * @param {object} p  state.progress[key]
 * @param {number} grade  0~5
 * @returns {object}  업데이트된 progress 객체
 */
export function srsReview(p, grade) {
  if (!p) p = {};

  // SRS 필드 초기화
  let ef   = p.srsEasiness    ?? 2.5;
  let n    = p.srsRepetitions ?? 0;
  let iv   = p.srsInterval    ?? 0;

  const today = _today();
  p.srsLastReview = today;

  if (grade >= 3) {
    // 정답 계열: 간격 연장
    if (n === 0)      iv = 1;
    else if (n === 1) iv = 6;
    else              iv = Math.round(iv * ef);
    n += 1;
  } else {
    // 오답 계열: 처음부터 재시작
    n  = 0;
    iv = 1;
  }

  // EF 업데이트: EF' = EF + (0.1 - (5-grade)*(0.08+(5-grade)*0.02))
  ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  ef = Math.max(EASINESS_MIN, Math.min(EASINESS_MAX, ef));

  p.srsEasiness    = Math.round(ef * 100) / 100;
  p.srsInterval    = iv;
  p.srsRepetitions = n;
  p.srsDueDate     = _addDays(today, iv);

  return p;
}

/**
 * 간단 2버튼 평가 → grade 변환
 * @param {boolean} correct   true=정답, false=오답
 * @param {boolean} wasHard   true=어렵게 정답 (선택적)
 */
export function gradeFromResult(correct, wasHard = false) {
  if (!correct) return 1;          // 오답
  if (wasHard)  return 3;          // 정답이지만 어렵게
  return 4;                        // 정상 정답
}

/**
 * 해당 진도 항목이 오늘 복습 대상인지 확인
 * @param {object} p  state.progress[key]
 */
export function isDue(p) {
  if (!p || !p.srsDueDate) return true;  // 미학습 → 우선 노출
  return p.srsDueDate <= _today();
}

/**
 * 카드 목록에서 SRS 우선순위 정렬
 * 순서: ① 오늘 복습 대상 (due) → ② 미학습 → ③ 복습 완료
 * @param {string[]} keys  카나/어휘 ID 목록
 * @param {object}   progress  state.progress
 */
export function sortBySRS(keys, progress) {
  const today = _today();

  return [...keys].sort((a, b) => {
    const pa = progress[a];
    const pb = progress[b];

    const dueA = !pa || !pa.srsDueDate ? '0000-00-00' : pa.srsDueDate;
    const dueB = !pb || !pb.srsDueDate ? '0000-00-00' : pb.srsDueDate;

    // 오늘 이하는 "due" → 앞으로
    const isDueA = dueA <= today;
    const isDueB = dueB <= today;

    if (isDueA !== isDueB) return isDueA ? -1 : 1;

    // 둘 다 due: 더 오래된 것 먼저
    if (isDueA && isDueB) return dueA < dueB ? -1 : 1;

    // 둘 다 미래: 더 가까운 것 먼저
    return dueA < dueB ? -1 : 1;
  });
}

/**
 * 오늘 복습해야 할 항목 수 계산
 * @param {string[]} keys
 * @param {object}   progress
 */
export function countDueToday(keys, progress) {
  return keys.filter(k => isDue(progress[k])).length;
}

/**
 * SRS 통계 요약
 * @param {string[]} keys
 * @param {object}   progress
 */
export function getSRSSummary(keys, progress) {
  let due = 0, learning = 0, mastered = 0, newCards = 0;
  const today = _today();

  keys.forEach(k => {
    const p = progress[k];
    if (!p || p.srsRepetitions === undefined) {
      newCards++;
    } else if (!p.srsDueDate || p.srsDueDate <= today) {
      due++;
    } else if (p.srsInterval >= 21) {
      mastered++;
    } else {
      learning++;
    }
  });

  return { due, learning, mastered, newCards, total: keys.length };
}
