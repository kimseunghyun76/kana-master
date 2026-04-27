/* ============================================================
   CURRICULUM DATA — Stage-based learning curriculum
   5 Stages with modules, each module has steps (vocab+quiz)
   and optional roleplay that unlocks after completing steps.
   ============================================================ */

'use strict';

// ── STAGES ─────────────────────────────────────────────────
const STAGES = [
  {
    id: 1, key: 's1',
    name: '문자 마스터',
    nameJp: '文字マスター',
    icon: '🔤',
    color: '#8b5cf6',
    jlpt: null,
    desc: '히라가나 · 가타가나 완전 정복. 일본어의 기초를 1~2주에 완성!',
    unlockXP: 0
  },
  {
    id: 2, key: 's2',
    name: '생존 일본어',
    nameJp: '生存日本語',
    icon: '🌱',
    color: '#3b82f6',
    jlpt: 'N5',
    desc: '여행 · 일상에서 살아남기! 인사, 숫자, 쇼핑, 식사 등 필수 표현.',
    unlockXP: 800
  },
  {
    id: 3, key: 's3',
    name: '일상 대화',
    nameJp: '日常会話',
    icon: '💬',
    color: '#10b981',
    jlpt: 'N4',
    desc: '일본인 친구와 자유롭게 대화! 감정·취미·약속 등 생생한 표현.',
    unlockXP: 2800
  },
  {
    id: 4, key: 's4',
    name: 'IT·비즈니스',
    nameJp: 'IT・ビジネス',
    icon: '💼',
    color: '#f59e0b',
    jlpt: 'N3',
    desc: 'IT 회사에서 일본인 동료와 소통! 업무·회의·개발 현장 표현.',
    unlockXP: 6000
  },
  {
    id: 5, key: 's5',
    name: '심화',
    nameJp: '上級',
    icon: '🏆',
    color: '#ef4444',
    jlpt: 'N2',
    desc: '자연스러운 일본어로 한 단계 업! 드라마·뉴스·경어 마스터.',
    unlockXP: 12000
  }
];

// ── MODULES ─────────────────────────────────────────────────
// Each module has:
//   steps: sequential steps (kana/vocab/quiz)
//   roleplay: { id, name, ... } — unlocks after all steps done
const MODULES = [

  // ════ STAGE 1: 문자 마스터 ════════════════════════════════
  {
    id: 'kana_hira',
    stageId: 1,
    name: '히라가나',
    nameJp: 'ひらがな',
    icon: 'あ',
    iconIsText: true,
    desc: '46자 기본 + 탁음 + 요음',
    xp: 400,
    steps: [
      { type: 'kana_learn', title: '히라가나 기본 46자', kanaType: 'hiragana', levelId: 1 },
      { type: 'kana_quiz',  title: '히라가나 기본 퀴즈', kanaType: 'hiragana', levelId: 1 },
      { type: 'kana_learn', title: '히라가나 탁음', kanaType: 'hiragana_dakuten', levelId: 2 },
      { type: 'kana_quiz',  title: '히라가나 탁음 퀴즈', kanaType: 'hiragana_dakuten', levelId: 2 },
      { type: 'kana_learn', title: '히라가나 요음', kanaType: 'hiragana_yoon', levelId: 3 },
      { type: 'kana_quiz',  title: '히라가나 요음 퀴즈', kanaType: 'hiragana_yoon', levelId: 3 },
    ],
    roleplay: null
  },
  {
    id: 'kana_kata',
    stageId: 1,
    name: '가타가나',
    nameJp: 'カタカナ',
    icon: 'ア',
    iconIsText: true,
    desc: '46자 기본 + 탁음 + 요음',
    xp: 400,
    unlockAfter: ['kana_hira'],
    steps: [
      { type: 'kana_learn', title: '가타가나 기본 46자', kanaType: 'katakana', levelId: 4 },
      { type: 'kana_quiz',  title: '가타가나 기본 퀴즈', kanaType: 'katakana', levelId: 4 },
      { type: 'kana_learn', title: '가타가나 탁음', kanaType: 'katakana_dakuten', levelId: 5 },
      { type: 'kana_quiz',  title: '가타가나 탁음 퀴즈', kanaType: 'katakana_dakuten', levelId: 5 },
      { type: 'kana_learn', title: '가타가나 요음', kanaType: 'katakana_yoon', levelId: 6 },
      { type: 'kana_quiz',  title: '가타가나 요음 퀴즈', kanaType: 'katakana_yoon', levelId: 6 },
    ],
    roleplay: null
  },
  {
    id: 'first_phrases',
    stageId: 1,
    name: '첫 인사 10',
    nameJp: '最初の挨拶',
    icon: '👋',
    desc: '일본어 첫 10개 표현으로 바로 시작!',
    xp: 200,
    unlockAfter: ['kana_hira'],
    steps: [
      { type: 'lecture',    title: '🎬 はじめまして의 비밀', lectureKey: 'slevel_1' },
      { type: 'vocab_learn', title: '인사 필수 표현', categoryId: 'basic_words', limit: 10 },
      { type: 'vocab_quiz',  title: '인사 표현 퀴즈', categoryId: 'basic_words', limit: 10 },
    ],
    roleplay: null
  },

  // ════ STAGE 2: 생존 일본어 ════════════════════════════════
  {
    id: 'survival_greet',
    stageId: 2,
    name: '자기소개 · です',
    nameJp: '自己紹介・です',
    icon: '🙏',
    desc: 'AはBです, 인사, 이름, 출신 소개의 기초 문형',
    xp: 300,
    unlockAfter: ['kana_hira', 'kana_kata', 'first_phrases'],
    steps: [
      { type: 'lecture',    title: '🎬 완벽한 자기소개', lectureKey: 'slevel_2' },
      { type: 'vocab_learn', title: '인사·응답 어휘', categoryId: 'basic_words' },
      { type: 'vocab_learn', title: '필수 표현어', categoryId: 'essential_phrases' },
      { type: 'vocab_quiz',  title: '인사 퀴즈', categoryIds: ['basic_words', 'essential_phrases'] },
    ],
    roleplay: {
      id: 'rp_first_meeting',
      name: '처음 만남',
      nameJp: 'はじめての出会い',
      icon: '🤝',
      desc: '이름, 출신, 첫인상으로 대화 시작하기',
      dialogueKey: 'first_meeting'
    }
  },
  {
    id: 'survival_pointing',
    stageId: 2,
    name: '이것 · 저것 · 여기',
    nameJp: 'これ・それ・ここ',
    icon: '📍',
    desc: 'これ/それ/あれ, ここ/そこ/あそこ로 사물과 장소를 가리키기',
    xp: 320,
    unlockAfter: ['survival_greet'],
    steps: [
      { type: 'lecture',    title: '🎬 지시어 (こそあど)', lectureKey: 'wlevel_4' },
      { type: 'vocab_learn', title: '사물 지시어', categoryId: 'pronouns_thing' },
      { type: 'vocab_learn', title: '장소 지시어', categoryId: 'pronouns_place' },
      { type: 'vocab_quiz',  title: '지시어 퀴즈', categoryIds: ['pronouns_thing', 'pronouns_place'] },
    ],
    roleplay: {
      id: 'rp_shopping_choice',
      name: '물건 고르기',
      nameJp: 'これください',
      icon: '🛍️',
      desc: '원하는 물건을 가리키고 질문하기',
      dialogueKey: 'shopping'
    }
  },
  {
    id: 'survival_numbers',
    stageId: 2,
    name: '숫자·날짜·시간',
    nameJp: '数字・日付・時間',
    icon: '🔢',
    desc: '1~10000, 요일, 날짜, 시각 완전 정복',
    xp: 350,
    unlockAfter: ['survival_pointing'],
    steps: [
      { type: 'lecture',    title: '🎬 불길한 숫자의 비밀', lectureKey: 'wlevel_2' },
      { type: 'vocab_learn', title: '숫자 기본', categoryId: 'numbers_basic' },
      { type: 'vocab_learn', title: '날짜·요일', categoryId: 'dates_days' },
      { type: 'vocab_learn', title: '시각 표현', categoryId: 'time_expressions' },
      { type: 'vocab_quiz',  title: '숫자·시간 퀴즈', categoryIds: ['numbers_basic','dates_days','time_expressions'] },
    ],
    roleplay: {
      id: 'rp_schedule',
      name: '약속 잡기',
      nameJp: '約束をする',
      icon: '📅',
      desc: '날짜·시간을 정해 약속 만들기',
      dialogueKey: 'schedule'
    }
  },
  {
    id: 'survival_location',
    stageId: 2,
    name: '어디에 있어요?',
    nameJp: 'どこにありますか',
    icon: '🧭',
    desc: 'あります / います, 장소 + に, 시설 위치 묻기와 답하기',
    xp: 340,
    unlockAfter: ['survival_numbers'],
    steps: [
      { type: 'lecture',    title: '🎬 あります · います', lectureKey: 'wlevel_4b' },
      { type: 'vocab_learn', title: '장소 지시어', categoryId: 'pronouns_place' },
      { type: 'vocab_learn', title: '위치·교통 어휘', categoryId: 'transport' },
      { type: 'vocab_quiz',  title: '위치 표현 퀴즈', categoryIds: ['pronouns_place', 'transport'] },
      { type: 'dialogue_study', title: '시설 위치 미리보기', dialogueKey: 'facility_help' },
    ],
    roleplay: {
      id: 'rp_facility_help',
      name: '시설 찾기',
      nameJp: '場所を探す',
      icon: '🧭',
      desc: '화장실, 층수, 방향을 물어보고 안내받기',
      dialogueKey: 'facility_help'
    }
  },
  {
    id: 'survival_transport',
    stageId: 2,
    name: '위치·이동',
    nameJp: '場所・移動',
    icon: '🚆',
    desc: '어디에 있나요, 어디로 가나요, 길 묻기와 교통 이동',
    xp: 380,
    unlockAfter: ['survival_location'],
    steps: [
      { type: 'lecture',    title: '🎬 1초도 안 늦는 신칸센', lectureKey: 'slevel_4' },
      { type: 'vocab_learn', title: '교통 어휘', categoryId: 'transport' },
      { type: 'vocab_quiz',  title: '교통 어휘 퀴즈', categoryId: 'transport' },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'transport' },
    ],
    roleplay: {
      id: 'rp_transport',
      name: '교통편',
      nameJp: '交通편',
      icon: '🚆',
      desc: '역 안내 받기, 표 사기, 길 묻기',
      dialogueKey: 'transport'
    }
  },
  {
    id: 'survival_food',
    stageId: 2,
    name: '주문·부탁',
    nameJp: '注文・お願い',
    icon: '🍣',
    desc: '〜をください, お願いします, ありますか로 서비스 표현의 뼈대 만들기',
    xp: 380,
    unlockAfter: ['survival_location'],
    steps: [
      { type: 'lecture',    title: '🎬 주세요 · 부탁합니다', lectureKey: 'wlevel_7b' },
      { type: 'lecture',    title: '🍱 식사 문화 노트', lectureKey: 'wlevel_7' },
      { type: 'vocab_learn', title: '필수 부탁 표현', categoryId: 'essential_phrases' },
      { type: 'vocab_learn', title: '음식·식당 어휘', categoryId: 'food_restaurant' },
      { type: 'vocab_quiz',  title: '주문·부탁 퀴즈', categoryIds: ['essential_phrases', 'food_restaurant'] },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'food' },
    ],
    roleplay: {
      id: 'rp_restaurant',
      name: '식사편',
      nameJp: '食事편',
      icon: '🍣',
      desc: '음식점 입장부터 계산까지 완전 정복',
      dialogueKey: 'food'
    }
  },
  {
    id: 'survival_shopping',
    stageId: 2,
    name: '가격·비교·쇼핑',
    nameJp: '買い物・比較',
    icon: '🛍️',
    desc: '비싸다, 싸다, 이거 주세요, 가격 묻기와 비교 표현',
    xp: 300,
    unlockAfter: ['survival_food'],
    steps: [
      { type: 'lecture',    title: '🎬 いらっしゃいませ!', lectureKey: 'slevel_3' },
      { type: 'vocab_learn', title: '쇼핑 어휘', categoryId: 'shopping' },
      { type: 'vocab_quiz',  title: '쇼핑 퀴즈', categoryId: 'shopping' },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'shopping' },
    ],
    roleplay: {
      id: 'rp_shopping',
      name: '쇼핑편',
      nameJp: 'ショッピング편',
      icon: '🛍️',
      desc: '가격 물어보기, 계산, 환불',
      dialogueKey: 'shopping'
    }
  },
  {
    id: 'survival_hotel',
    stageId: 2,
    name: '숙박·요청',
    nameJp: '宿泊・依頼',
    icon: '🏨',
    desc: '체크인, 위치 확인, 요청, 와이파이·조식·체크아웃 묻기',
    xp: 300,
    unlockAfter: ['survival_transport', 'survival_food'],
    steps: [
      { type: 'lecture',    title: '🎬 료칸의 나라', lectureKey: 'slevel_5' },
      { type: 'vocab_learn', title: '숙박 어휘', categoryId: 'hotel_accommodation' },
      { type: 'vocab_quiz',  title: '숙박 퀴즈', categoryId: 'hotel_accommodation' },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'hotel' },
    ],
    roleplay: {
      id: 'rp_hotel',
      name: '숙박편',
      nameJp: '宿泊편',
      icon: '🏨',
      desc: '체크인부터 룸서비스까지',
      dialogueKey: 'hotel'
    }
  },

  // ════ STAGE 3: 일상 대화 ════════════════════════════════
  {
    id: 'daily_adjectives',
    stageId: 3,
    name: '동사 정중형·기본 활용',
    nameJp: '動詞ます形・基本活用',
    icon: '📝',
    desc: '〜ます, 〜ません, 〜ました와 초급 핵심 동사 자동화',
    xp: 500,
    steps: [
      { type: 'lecture',    title: '🎬 동사 3그룹과 ます형', lectureKey: 'wlevel_5' },
      { type: 'vocab_learn', title: '기본 동사 I', categoryId: 'verbs_daily' },
      { type: 'vocab_learn', title: '기본 동사 II', categoryId: 'verbs_activity' },
      { type: 'vocab_learn', title: '가능·지각 동사', categoryId: 'verbs_ability' },
      { type: 'vocab_quiz',  title: '동사 활용 퀴즈', categoryIds: ['verbs_daily','verbs_activity','verbs_ability'] },
    ],
    roleplay: null
  },
  {
    id: 'daily_feelings',
    stageId: 3,
    name: '형용사·상태 표현',
    nameJp: '形容詞・状態表現',
    icon: '🌈',
    desc: 'い형용사, な형용사, 좋다/나쁘다/비싸다/아프다 같은 상태 설명',
    xp: 480,
    unlockAfter: ['daily_adjectives'],
    steps: [
      { type: 'lecture',    title: '🎬 い형용사 · な형용사', lectureKey: 'wlevel_6' },
      { type: 'vocab_learn', title: '상태·감각 형용사', categoryId: 'adj_physical' },
      { type: 'vocab_learn', title: '감정·상태 형용사', categoryId: 'adj_emotion' },
      { type: 'vocab_learn', title: 'N5 핵심 평가 표현', categoryId: 'adjectives_n5' },
      { type: 'vocab_quiz',  title: '형용사 퀴즈', categoryIds: ['adj_physical','adj_emotion','adjectives_n5'] },
    ],
    roleplay: null
  },
  {
    id: 'daily_places',
    stageId: 3,
    name: '장소·상태 설명',
    nameJp: '場所・状態説明',
    icon: '🗺️',
    desc: '장소, 방향, 음식·관광 장소를 설명하고 추천하기',
    xp: 450,
    unlockAfter: ['daily_feelings'],
    steps: [
      { type: 'lecture',    title: '🎬 여행지에서 설명하기', lectureKey: 'slevel_6' },
      { type: 'vocab_learn', title: '장소·교통 명사', categoryId: 'place_transport' },
      { type: 'vocab_learn', title: '음식·식문화', categoryId: 'food_nouns' },
      { type: 'vocab_learn', title: '관광·쇼핑 장소', categoryId: 'place_sightseeing' },
      { type: 'vocab_quiz',  title: '장소·관광 퀴즈', categoryIds: ['place_transport','food_nouns','place_sightseeing'] },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'sightseeing' },
    ],
    roleplay: {
      id: 'rp_sightseeing',
      name: '관광·문화',
      nameJp: '観光・文化',
      icon: '⛩️',
      desc: '신사·온천·문화 체험 대화',
      dialogueKey: 'sightseeing'
    }
  },
  {
    id: 'daily_health',
    stageId: 3,
    name: '건강·증상·도움 요청',
    nameJp: '健康・症状・助け',
    icon: '🏥',
    desc: '어디가 아픈지 말하고, 증상을 설명하고, 병원·약국 도움 요청하기',
    xp: 400,
    unlockAfter: ['daily_feelings'],
    steps: [
      { type: 'lecture',    title: '🎬 お大事に — 건강 표현', lectureKey: 'wlevel_8' },
      { type: 'vocab_learn', title: '신체 부위', categoryId: 'body_parts' },
      { type: 'vocab_learn', title: '증상·건강 상태', categoryId: 'health_symptoms' },
      { type: 'vocab_learn', title: '의료·병원', categoryId: 'medical_care' },
      { type: 'vocab_quiz',  title: '건강·증상 퀴즈', categoryIds: ['body_parts','health_symptoms','medical_care'] },
      { type: 'dialogue_study', title: '대화 미리보기', dialogueKey: 'couple_travel' },
    ],
    roleplay: {
      id: 'rp_couple_travel',
      name: '부부 여행편',
      nameJp: '夫婦旅行편',
      icon: '💑',
      desc: '여행 중 갑작스러운 상황 대처',
      dialogueKey: 'couple_travel'
    }
  },

  // ════ STAGE 4: IT·비즈니스 ════════════════════════════════
  {
    id: 'it_tech_vocab',
    stageId: 4,
    name: 'IT 기초 용어',
    nameJp: 'IT基礎用語',
    icon: '💻',
    desc: '프로그래밍, 개발 프로세스, 인프라',
    xp: 600,
    steps: [
      { type: 'lecture',    title: '🎬 한일 IT 조직 문화 차이', lectureKey: 'b_level_1' },
      { type: 'vocab_learn', title: 'IT 기초 용어', categoryId: 'it_tech_basic' },
      { type: 'vocab_learn', title: '개발 프로세스', categoryId: 'it_dev_process' },
      { type: 'vocab_quiz',  title: 'IT 어휘 퀴즈', categoryIds: ['it_tech_basic','it_dev_process'] },
    ],
    roleplay: null
  },
  {
    id: 'it_workplace_vocab',
    stageId: 4,
    name: 'IT 직장·조직',
    nameJp: 'IT職場・組織',
    icon: '🏢',
    desc: '직함, 역할, 일정, 개발 환경',
    xp: 500,
    unlockAfter: ['it_tech_vocab'],
    steps: [
      { type: 'lecture',    title: '🎬 호렌소(報連相)의 모든 것', lectureKey: 'b_level_2' },
      { type: 'vocab_learn', title: 'IT 직장·조직 어휘', categoryId: 'it_workplace' },
      { type: 'vocab_quiz',  title: 'IT 직장 퀴즈', categoryId: 'it_workplace' },
    ],
    roleplay: {
      id: 'rp_it_standup',
      name: '아침 조회·스탠드업',
      nameJp: '朝のスタンドアップ',
      icon: '☀️',
      desc: '데일리 스크럼 참여, 진행 상황 보고',
      dialogueKey: 'it_standup'
    }
  },
  {
    id: 'biz_basic',
    stageId: 4,
    name: '비즈니스 기본',
    nameJp: 'ビジネス基本',
    icon: '🤝',
    desc: 'ほうれんそう, 경어, 회의 표현',
    xp: 600,
    unlockAfter: ['it_workplace_vocab'],
    steps: [
      { type: 'lecture',    title: '🎬 비즈니스 메일 작성법', lectureKey: 'b_level_3' },
      { type: 'vocab_learn', title: '비즈니스 기본 표현', categoryId: 'biz_greetings' },
      { type: 'vocab_learn', title: '보고·연락·상담', categoryId: 'biz_hourensou' },
      { type: 'vocab_quiz',  title: '비즈니스 표현 퀴즈', categoryIds: ['biz_greetings','biz_hourensou'] },
    ],
    roleplay: {
      id: 'rp_it_codereview',
      name: '코드 리뷰',
      nameJp: 'コードレビュー',
      icon: '🔍',
      desc: 'PR 요청, 피드백 주고받기',
      dialogueKey: 'it_codereview'
    }
  },
  {
    id: 'biz_meeting',
    stageId: 4,
    name: '회의·의견 표현',
    nameJp: '会議・意見',
    icon: '💡',
    desc: '회의 진행, 의견 제시, 킥오프',
    xp: 600,
    unlockAfter: ['biz_basic'],
    steps: [
      { type: 'lecture',    title: '🎬 일본식 회의 진행하기', lectureKey: 'b_level_4' },
      { type: 'vocab_learn', title: '회의·의견 어휘', categoryId: 'biz_meeting' },
      { type: 'vocab_quiz',  title: '회의 퀴즈', categoryId: 'biz_meeting' },
    ],
    roleplay: {
      id: 'rp_it_kickoff',
      name: '킥오프 미팅',
      nameJp: 'キックオフ',
      icon: '🚀',
      desc: '프로젝트 시작, 역할 분담 논의',
      dialogueKey: 'it_kickoff'
    }
  },
  {
    id: 'biz_1on1',
    stageId: 4,
    name: '1on1 · 사양 확인',
    nameJp: '1on1・仕様確認',
    icon: '🎯',
    desc: '매니저와 1on1, 사양 히어링',
    xp: 600,
    unlockAfter: ['biz_meeting'],
    steps: [
      { type: 'lecture',    title: '🎬 매니저와의 1on1', lectureKey: 'b_level_5' },
      { type: 'vocab_learn', title: '회의·의견 심화', categoryId: 'biz_meeting' },
      { type: 'vocab_quiz',  title: '심화 퀴즈', categoryId: 'biz_meeting' },
    ],
    roleplay: {
      id: 'rp_it_1on1',
      name: '1on1 미팅',
      nameJp: '1on1ミーティング',
      icon: '🎯',
      desc: '성과 공유, 과제 논의, 피드백',
      dialogueKey: 'it_1on1'
    }
  },
  {
    id: 'biz_intro',
    stageId: 4,
    name: '입사·자기소개',
    nameJp: '入社・自己紹介',
    icon: '🆕',
    desc: '첫 출근, 자기소개, 팀 인사',
    xp: 500,
    unlockAfter: ['biz_basic'],
    steps: [
      { type: 'lecture',    title: '🎬 완벽한 자기소개', lectureKey: 'slevel_2' },
      { type: 'vocab_learn', title: '비즈니스 기본 표현 복습', categoryId: 'biz_greetings' },
      { type: 'vocab_quiz',  title: '입사 표현 퀴즈', categoryId: 'biz_greetings' },
    ],
    roleplay: {
      id: 'rp_it_intro',
      name: '입사 첫날',
      nameJp: '入社初日',
      icon: '🆕',
      desc: '팀원 인사, 환경 설정, 첫 미팅',
      dialogueKey: 'it_intro'
    }
  },
  {
    id: 'biz_spec',
    stageId: 4,
    name: '사양·요구 확인',
    nameJp: '仕様・要件確認',
    icon: '📋',
    desc: '기획자와 요구사항 히어링',
    xp: 500,
    unlockAfter: ['biz_meeting'],
    steps: [
      { type: 'lecture',    title: '🎬 기획자와 사양 조율하기', lectureKey: 'b_level_6' },
      { type: 'vocab_learn', title: 'IT 기초 복습', categoryId: 'it_tech_basic' },
      { type: 'vocab_quiz',  title: '사양 확인 퀴즈', categoryId: 'it_tech_basic' },
    ],
    roleplay: {
      id: 'rp_it_spec',
      name: '사양 확인',
      nameJp: '仕様確認',
      icon: '📋',
      desc: '기획·디자인 팀과 요구사항 확인',
      dialogueKey: 'it_spec'
    }
  },

  // ════ STAGE 5: 심화 ════════════════════════════════════
  {
    id: 'adv_keigo',
    stageId: 5,
    name: '경어 마스터',
    nameJp: '敬語マスター',
    icon: '🎌',
    desc: '존경어·겸양어·정중어 완전 정복',
    xp: 800,
    steps: [
      { type: 'lecture',    title: '🎬 경어(敬語)의 체계', lectureKey: 'k_level_1' },
      { type: 'vocab_learn', title: '경어 표현', categoryId: 'keigo_basics' },
      { type: 'vocab_quiz',  title: '경어 퀴즈', categoryId: 'keigo_basics' },
    ],
    roleplay: null
  }
];

// ── Helper: get modules for stage ──────────────────────────
function getModulesByStage(stageId) {
  return MODULES.filter(m => m.stageId === stageId);
}

// ── Helper: check if module is unlocked ───────────────────
function isModuleUnlocked(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return false;
  if (!mod.unlockAfter || mod.unlockAfter.length === 0) return true;
  return mod.unlockAfter.every(depId => {
    const dep = progress.modules[depId];
    return dep && dep.stepsCompleted >= (MODULES.find(m => m.id === depId)?.steps.length || 0);
  });
}

// ── Helper: check if roleplay is unlocked ─────────────────
function isRoleplayUnlocked(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod || !mod.roleplay) return false;
  const modProgress = progress.modules[moduleId];
  if (!modProgress) return false;
  return modProgress.stepsCompleted >= mod.steps.length;
}

// ── Helper: get module progress pct ───────────────────────
function getModuleProgressPct(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return 0;
  const total = mod.steps.length + (mod.roleplay ? 1 : 0);
  const done = (progress.modules[moduleId]?.stepsCompleted || 0) +
               (progress.modules[moduleId]?.roleplayDone ? 1 : 0);
  return Math.round((done / total) * 100);
}

// ── Helper: get stage progress pct ────────────────────────
function getStageProgressPct(stageId, progress) {
  const mods = getModulesByStage(stageId);
  if (!mods.length) return 0;
  const total = mods.reduce((s, m) => s + m.steps.length + (m.roleplay ? 1 : 0), 0);
  const done  = mods.reduce((s, m) => {
    const mp = progress.modules[m.id] || {};
    return s + (mp.stepsCompleted || 0) + (mp.roleplayDone ? 1 : 0);
  }, 0);
  return Math.round((done / total) * 100);
}

// ── Helper: get current/recommended next ──────────────────
function getNextModule(progress) {
  for (const stage of STAGES) {
    const mods = getModulesByStage(stage.id);
    for (const mod of mods) {
      if (!isModuleUnlocked(mod.id, progress)) continue;
      const mp = progress.modules[mod.id] || {};
      const totalSteps = mod.steps.length;
      if ((mp.stepsCompleted || 0) < totalSteps) return { mod, stage };
      if (mod.roleplay && !mp.roleplayDone) return { mod, stage, roleplay: true };
    }
  }
  return null;
}
