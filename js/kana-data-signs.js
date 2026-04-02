// kana-data-signs.js — 일본 간판·표지판 읽기 데이터
'use strict';

var SIGN_CATEGORIES = [
  { id: 'station',    name: '역·전철',   icon: '🚉', color_class: 'sign-cat-station'    },
  { id: 'restaurant', name: '식당·카페', icon: '🍜', color_class: 'sign-cat-restaurant' },
  { id: 'shopping',   name: '쇼핑·가게', icon: '🛍️', color_class: 'sign-cat-shopping'   },
  { id: 'warning',    name: '주의·경고', icon: '⚠️', color_class: 'sign-cat-warning'    },
  { id: 'tourist',    name: '관광·안내', icon: '🗺️', color_class: 'sign-cat-tourist'    },
  { id: 'public',     name: '공공시설',  icon: '🏥', color_class: 'sign-cat-public'     },
];

var SIGN_ITEMS = [

  // ─────────────────────────────────────────────
  // STATION (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_s01',
    category: 'station',
    difficulty: 'N5',
    scene: '新宿駅 南改札',
    sign_style: 'station_blue',
    lines: [
      { text: '← 南口', ruby: 'みなみぐち', size: 'xl' },
      { text: '→ 北口', ruby: 'きたぐち',   size: 'xl' },
      { text: 'South Exit / North Exit', size: 'sm', muted: true },
    ],
    translation: '← 남쪽 출구 / → 북쪽 출구',
    vocab: [
      { word: '南口', reading: 'みなみぐち', meaning: '남쪽 출구' },
      { word: '北口', reading: 'きたぐち',   meaning: '북쪽 출구' },
      { word: '口',   reading: 'ぐち・くち', meaning: '출구·입구' },
    ],
    tip: '口(くち/ぐち)는 출입구를 뜻한다. 방위(東西南北)만 외워두면 어느 역의 출구 표지판도 읽을 수 있다!',
    quiz: {
      question: '이 표지판의 내용은?',
      choices: [
        '← 남쪽 출구 / → 북쪽 출구',
        '← 북쪽 출구 / → 남쪽 출구',
        '← 남쪽 입구 / → 북쪽 입구',
        '← 동쪽 출구 / → 서쪽 출구',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_s02',
    category: 'station',
    difficulty: 'N5',
    scene: '渋谷駅 構内',
    sign_style: 'station_blue',
    lines: [
      { text: '改札口', ruby: 'かいさつぐち', size: 'xl' },
      { text: '↑ 出口', ruby: 'でぐち',       size: 'lg' },
      { text: '↓ 入口', ruby: 'いりぐち',     size: 'lg' },
    ],
    translation: '개찰구 / ↑ 출구 / ↓ 입구',
    vocab: [
      { word: '改札口', reading: 'かいさつぐち', meaning: '개찰구' },
      { word: '出口',   reading: 'でぐち',       meaning: '출구' },
      { word: '入口',   reading: 'いりぐち',     meaning: '입구' },
    ],
    tip: '出(で)は出る、入(いり)は入る。改札(かいさつ)は改札機のある通路のこと。일본 역에서 가장 자주 보는 3단어다!',
    quiz: {
      question: '改札口(かいさつぐち)가 의미하는 것은?',
      choices: [
        '개찰구',
        '출구',
        '화장실',
        '안내소',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_s03',
    category: 'station',
    difficulty: 'N4',
    scene: '東京駅 乗換え案内',
    sign_style: 'station_green',
    lines: [
      { text: '乗換え', ruby: 'のりかえ', size: 'xl' },
      { text: '中央線  ← 5番線', ruby: 'ちゅうおうせん　ごばんせん', size: 'lg' },
      { text: '山手線  → 8番線', ruby: 'やまのてせん　はちばんせん',  size: 'lg' },
      { text: 'Transfer / Platform 5 · 8',  size: 'sm', muted: true },
    ],
    translation: '환승: 중앙선 ← 5번 플랫폼 / 야마노테선 → 8번 플랫폼',
    vocab: [
      { word: '乗換え', reading: 'のりかえ', meaning: '환승' },
      { word: '～番線', reading: '～ばんせん', meaning: '~번 플랫폼(선로)' },
      { word: '～線',   reading: '～せん',    meaning: '~선(노선)' },
    ],
    tip: '乗換え(のりかえ)는 "탑승을 바꾼다"는 뜻으로 환승을 의미한다. 何番線(なんばんせん)은 "몇 번 선?"이라고 물을 때 쓴다.',
    quiz: {
      question: '5番線(ごばんせん)의 의미는?',
      choices: [
        '5번 플랫폼',
        '5번 출구',
        '5번 개찰구',
        '5번 버스',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_s04',
    category: 'station',
    difficulty: 'N4',
    scene: '駅ホーム 注意書き',
    sign_style: 'warning_yellow',
    lines: [
      { text: '飲食禁止', ruby: 'いんしょくきんし', size: 'lg' },
      { text: '禁煙',     ruby: 'きんえん',         size: 'lg' },
      { text: 'ホームでは走らないでください', ruby: 'はしらないでください', size: 'md' },
      { text: 'No eating / No smoking / Do not run', size: 'sm', muted: true },
    ],
    translation: '음식물 섭취 금지 / 금연 / 플랫폼에서는 달리지 마세요',
    vocab: [
      { word: '飲食禁止', reading: 'いんしょくきんし', meaning: '음식물 섭취 금지' },
      { word: '禁煙',     reading: 'きんえん',         meaning: '금연' },
      { word: '走らないでください', reading: 'はしらないでください', meaning: '달리지 마세요' },
    ],
    tip: '禁(きん)은 금지를 나타낸다. 禁煙·禁止·禁入 등 禁이 붙으면 모두 "~금지"라는 신호!',
    quiz: {
      question: '禁煙(きんえん)의 의미는?',
      choices: [
        '금연',
        '금식',
        '출입금지',
        '촬영금지',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_s05',
    category: 'station',
    difficulty: 'N4',
    scene: '駅 時刻表',
    sign_style: 'station_blue',
    lines: [
      { text: '時刻表', ruby: 'じこくひょう', size: 'xl' },
      { text: '平日',   ruby: 'へいじつ',     size: 'lg' },
      { text: '土日祝', ruby: 'どにちしゅく', size: 'lg' },
      { text: 'Timetable  /  Weekday  /  Sat·Sun·Holiday', size: 'sm', muted: true },
    ],
    translation: '시각표 / 평일 / 토·일·공휴일',
    vocab: [
      { word: '時刻表', reading: 'じこくひょう', meaning: '시각표(시간표)' },
      { word: '平日',   reading: 'へいじつ',     meaning: '평일' },
      { word: '土日祝', reading: 'どにちしゅく', meaning: '토·일·공휴일' },
    ],
    tip: '발차시각을 확인할 때 平日(평일)과 土日祝(토·일·공휴일) 열을 구분해야 한다. 祝(しゅく/しゅう)는 공휴일을 뜻한다.',
    quiz: {
      question: '土日祝(どにちしゅく)가 가리키는 날은?',
      choices: [
        '토·일·공휴일',
        '평일',
        '월~금',
        '토요일만',
      ],
      answer: 0,
    },
  },

  // ─────────────────────────────────────────────
  // RESTAURANT (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_r01',
    category: 'restaurant',
    difficulty: 'N5',
    scene: '라멘 가게 입구',
    sign_style: 'restaurant_red',
    lines: [
      { text: '営業中', ruby: 'えいぎょうちゅう', size: 'xl' },
      { text: 'OPEN', size: 'md', muted: true },
    ],
    translation: '영업 중 (오픈)',
    vocab: [
      { word: '営業中', reading: 'えいぎょうちゅう', meaning: '영업 중' },
      { word: '準備中', reading: 'じゅんびちゅう',   meaning: '준비 중 (클로즈)' },
    ],
    tip: '営業中(えいぎょうちゅう)가 걸려 있으면 오픈, 準備中(じゅんびちゅう)가 걸려 있으면 아직 문을 열기 전이다.',
    quiz: {
      question: '가게 문에 準備中(じゅんびちゅう)이 걸려 있다면?',
      choices: [
        '아직 영업 준비 중 (닫힘)',
        '영업 중 (열려 있음)',
        '오늘 휴무',
        '만석',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_r02',
    category: 'restaurant',
    difficulty: 'N4',
    scene: '정식집 메뉴판',
    sign_style: 'restaurant_wood',
    lines: [
      { text: '本日のランチ', ruby: 'ほんじつのランチ', size: 'xl' },
      { text: '日替わり定食  ¥850', ruby: 'ひがわりていしょく', size: 'lg' },
      { text: 'スープ・ライス付き', ruby: 'スープ・ライスつき', size: 'md' },
      { text: "Today's Lunch  /  Daily Set  /  Soup & Rice included", size: 'sm', muted: true },
    ],
    translation: '오늘의 점심: 일일 정식 850엔 (수프·밥 포함)',
    vocab: [
      { word: '本日',   reading: 'ほんじつ',   meaning: '오늘 (격식체)' },
      { word: '日替わり', reading: 'ひがわり', meaning: '매일 바뀌는, 일일~' },
      { word: '定食',   reading: 'ていしょく', meaning: '정식 (세트 식사)' },
    ],
    tip: '本日(ほんじつ)는 今日(きょう)의 격식 표현으로 메뉴판·안내판에서 자주 쓰인다. 日替わり는 "하루마다 바뀐다"는 뜻이다.',
    quiz: {
      question: '日替わり定食(ひがわりていしょく)란?',
      choices: [
        '매일 바뀌는 정식',
        '고정 메뉴 정식',
        '어린이 정식',
        '오늘만 할인하는 정식',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_r03',
    category: 'restaurant',
    difficulty: 'N4',
    scene: '돈카츠 가게 메뉴',
    sign_style: 'restaurant_wood',
    lines: [
      { text: 'ロースかつ定食', ruby: 'ロースかつていしょく', size: 'lg' },
      { text: '一人前  ¥1,200', ruby: 'いちにんまえ',  size: 'lg' },
      { text: 'セット（みそ汁・漬物付）', ruby: 'セット（みそしる・つけものつき）', size: 'md' },
      { text: 'Pork Cutlet Set  /  Single serving', size: 'sm', muted: true },
    ],
    translation: '로스 돈카츠 정식 / 1인분 1,200엔 / 세트 (된장국·절임 포함)',
    vocab: [
      { word: '一人前', reading: 'いちにんまえ', meaning: '1인분' },
      { word: '定食',   reading: 'ていしょく',   meaning: '정식' },
      { word: '付き',   reading: 'つき',         meaning: '~포함, ~딸린' },
    ],
    tip: '一人前(いちにんまえ)·二人前(ににんまえ)로 인원수를 표시한다. 付き(つき)는 "~포함"으로, みそ汁付き는 "된장국 포함"이란 뜻이다.',
    quiz: {
      question: '二人前(ににんまえ)의 의미는?',
      choices: [
        '2인분',
        '2번째 메뉴',
        '두 가지 세트',
        '2층 좌석',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_r04',
    category: 'restaurant',
    difficulty: 'N3',
    scene: '야키니쿠 가게 안내판',
    sign_style: 'restaurant_red',
    lines: [
      { text: '食べ放題', ruby: 'たべほうだい', size: 'xl' },
      { text: '飲み放題', ruby: 'のみほうだい', size: 'xl' },
      { text: '90分  ¥3,980', size: 'lg' },
      { text: 'All-you-can-eat / All-you-can-drink  90 min', size: 'sm', muted: true },
    ],
    translation: '무한 리필 (음식) / 음료 무한 제공 / 90분 3,980엔',
    vocab: [
      { word: '食べ放題', reading: 'たべほうだい', meaning: '무한 리필 (음식)' },
      { word: '飲み放題', reading: 'のみほうだい', meaning: '음료 무한 제공' },
      { word: '放題',     reading: 'ほうだい',     meaning: '마음껏, 무제한' },
    ],
    tip: '放題(ほうだい)는 "마음껏, 무제한"이라는 뜻의 접미사. 食べ(たべ)+放題 = 무한 리필, 飲み(のみ)+放題 = 음료 무한. 패턴을 기억하자!',
    quiz: {
      question: '食べ放題(たべほうだい)의 의미는?',
      choices: [
        '무한 리필 (음식 마음껏)',
        '음료 무한 제공',
        '오늘의 추천 메뉴',
        '포장 가능',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_r05',
    category: 'restaurant',
    difficulty: 'N4',
    scene: '카페 좌석 안내',
    sign_style: 'notice_white',
    lines: [
      { text: '禁煙席', ruby: 'きんえんせき', size: 'xl' },
      { text: '喫煙席', ruby: 'きつえんせき', size: 'xl' },
      { text: '満席 / 空席', ruby: 'まんせき / くうせき', size: 'lg' },
      { text: 'Non-smoking / Smoking  /  Full / Available', size: 'sm', muted: true },
    ],
    translation: '금연석 / 흡연석 / 만석 / 빈 자리 있음',
    vocab: [
      { word: '禁煙席', reading: 'きんえんせき', meaning: '금연석' },
      { word: '喫煙席', reading: 'きつえんせき', meaning: '흡연석' },
      { word: '満席',   reading: 'まんせき',     meaning: '만석 (자리 없음)' },
      { word: '空席',   reading: 'くうせき',     meaning: '빈 자리' },
    ],
    tip: '満(まん)은 "가득 찼다", 空(くう/から)는 "비어 있다"는 뜻. 満席·空席은 식당·영화관 어디서든 쓰이는 핵심 어휘다.',
    quiz: {
      question: '満席(まんせき) 표시가 나와 있다면?',
      choices: [
        '자리가 모두 찼다',
        '예약이 필요하다',
        '빈 자리가 있다',
        '금연 구역이다',
      ],
      answer: 0,
    },
  },

  // ─────────────────────────────────────────────
  // SHOPPING (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_sh01',
    category: 'shopping',
    difficulty: 'N5',
    scene: '백화점 세일 배너',
    sign_style: 'shop_sale',
    lines: [
      { text: 'セール', size: 'xl' },
      { text: '全品  30% OFF', ruby: 'ぜんぴん', size: 'xl' },
      { text: '割引',  ruby: 'わりびき', size: 'lg' },
      { text: 'SALE  All items 30% off', size: 'sm', muted: true },
    ],
    translation: '세일 / 전 상품 30% 할인',
    vocab: [
      { word: '全品',  reading: 'ぜんぴん', meaning: '전 상품' },
      { word: '割引',  reading: 'わりびき', meaning: '할인' },
      { word: 'OFF',   reading: 'オフ',     meaning: '할인(% 단위)' },
    ],
    tip: '割引(わりびき)는 "할인"이고 OFF는 퍼센트 할인에 쓴다. 30% OFF = 30%할인. 全品(ぜんぴん)은 "전 상품", 一部(いちぶ)는 "일부 상품".',
    quiz: {
      question: '全品 30% OFF의 의미는?',
      choices: [
        '전 상품 30% 할인',
        '30개 한정 상품',
        '일부 상품 30% 할인',
        '30엔 균일가',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_sh02',
    category: 'shopping',
    difficulty: 'N4',
    scene: '의류 매장 내부',
    sign_style: 'shop_white',
    lines: [
      { text: '試着室', ruby: 'しちゃくしつ', size: 'xl' },
      { text: 'フィッティングルーム', size: 'lg' },
      { text: '更衣室', ruby: 'こういしつ',   size: 'lg' },
      { text: 'Fitting Room / Changing Room', size: 'sm', muted: true },
    ],
    translation: '피팅룸 / 탈의실',
    vocab: [
      { word: '試着室', reading: 'しちゃくしつ', meaning: '피팅룸 (시착실)' },
      { word: '試着',   reading: 'しちゃく',     meaning: '(옷 등을) 입어 보기' },
      { word: '更衣室', reading: 'こういしつ',   meaning: '탈의실' },
    ],
    tip: '試着(しちゃく)는 "시험 삼아 입어 본다"는 뜻. 옷 가게에서 入っていいですか？(はいっていいですか？)라고 하면 "들어가도 되나요?"라고 물어볼 수 있다.',
    quiz: {
      question: '試着室(しちゃくしつ)의 의미는?',
      choices: [
        '피팅룸 (옷을 입어 볼 수 있는 방)',
        '계산대',
        '화장실',
        '창고',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_sh03',
    category: 'shopping',
    difficulty: 'N5',
    scene: '쇼핑몰 계산대 안내',
    sign_style: 'shop_white',
    lines: [
      { text: 'レジ →', size: 'xl' },
      { text: 'お会計', ruby: 'おかいけい', size: 'lg' },
      { text: '出口', ruby: 'でぐち', size: 'lg' },
      { text: 'Cashier → / Payment / Exit', size: 'sm', muted: true },
    ],
    translation: '계산대 → / 계산 / 출구',
    vocab: [
      { word: 'レジ',   reading: 'レジ',       meaning: '계산대 (register)' },
      { word: 'お会計', reading: 'おかいけい', meaning: '계산, 결제' },
      { word: '出口',   reading: 'でぐち',     meaning: '출구' },
    ],
    tip: 'レジ는 영어 register의 줄임말. 식당에서 계산할 때 お会計をお願いします(おかいけいをおねがいします)라고 말하면 "계산해 주세요"가 된다.',
    quiz: {
      question: 'お会計をお願いします의 뜻은?',
      choices: [
        '계산해 주세요',
        '주문할게요',
        '영수증 주세요',
        '할인해 주세요',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_sh04',
    category: 'shopping',
    difficulty: 'N3',
    scene: '면세 코너 안내판',
    sign_style: 'shop_white',
    lines: [
      { text: '免税', ruby: 'めんぜい', size: 'xl' },
      { text: 'TAX FREE', size: 'xl' },
      { text: '免税手続きはこちら', ruby: 'めんぜいてつづきはこちら', size: 'md' },
      { text: 'Tax-free procedures here', size: 'sm', muted: true },
    ],
    translation: '면세 / 면세 수속은 이쪽',
    vocab: [
      { word: '免税',   reading: 'めんぜい',   meaning: '면세' },
      { word: '手続き', reading: 'てつづき',   meaning: '수속, 절차' },
      { word: 'こちら', reading: 'こちら',     meaning: '이쪽 (격식체)' },
    ],
    tip: '免税(めんぜい)는 세금(税/ぜい)을 면제(免/めん)한다는 뜻. 일본에서 외국인은 5,000엔 이상 구매 시 면세 수속이 가능하다.',
    quiz: {
      question: '免税(めんぜい)의 의미는?',
      choices: [
        '면세',
        '할인',
        '무료',
        '적립',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_sh05',
    category: 'shopping',
    difficulty: 'N3',
    scene: '전자제품 매장 품절 안내',
    sign_style: 'notice_white',
    lines: [
      { text: '在庫限り', ruby: 'ざいこかぎり', size: 'xl' },
      { text: '売り切れ', ruby: 'うりきれ',     size: 'xl' },
      { text: '入荷予定：未定', ruby: 'にゅうかよてい：みてい', size: 'md' },
      { text: 'Limited stock / Sold out / Restock: TBD', size: 'sm', muted: true },
    ],
    translation: '재고 한정 / 품절 / 입고 예정: 미정',
    vocab: [
      { word: '在庫限り', reading: 'ざいこかぎり', meaning: '재고 한정' },
      { word: '売り切れ', reading: 'うりきれ',     meaning: '품절, 매진' },
      { word: '入荷予定', reading: 'にゅうかよてい', meaning: '입고 예정' },
    ],
    tip: '売り切れ(うりきれ)는 "팔려서 없어진 것", 즉 품절·매진. 在庫(ざいこ)는 재고. 入荷(にゅうか)는 상품이 새로 들어오는 것(입고)을 뜻한다.',
    quiz: {
      question: '売り切れ(うりきれ)의 의미는?',
      choices: [
        '품절 (매진)',
        '재고 한정',
        '입고 예정',
        '할인 중',
      ],
      answer: 0,
    },
  },

  // ─────────────────────────────────────────────
  // WARNING (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_w01',
    category: 'warning',
    difficulty: 'N4',
    scene: '공사 현장 입구',
    sign_style: 'warning_red',
    lines: [
      { text: '立入禁止', ruby: 'たちいりきんし', size: 'xl' },
      { text: '関係者以外 立ち入り禁止', ruby: 'かんけいしゃいがい たちいりきんし', size: 'md' },
      { text: 'NO ENTRY / Authorized Personnel Only', size: 'sm', muted: true },
    ],
    translation: '출입금지 / 관계자 외 출입금지',
    vocab: [
      { word: '立入禁止', reading: 'たちいりきんし', meaning: '출입금지' },
      { word: '関係者',   reading: 'かんけいしゃ',   meaning: '관계자' },
      { word: '以外',     reading: 'いがい',         meaning: '~이외, ~외에는' },
    ],
    tip: '禁止(きんし)는 "금지". 関係者以外(かんけいしゃいがい)는 "관계자 외에는"으로 출입 제한 표지에서 자주 쓰인다.',
    quiz: {
      question: '関係者以外 立入禁止는 누가 들어갈 수 있다는 뜻인가?',
      choices: [
        '관계자만 출입 가능',
        '누구나 출입 가능',
        '관계자는 출입 불가',
        '어린이만 출입 가능',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_w02',
    category: 'warning',
    difficulty: 'N4',
    scene: '비 온 날 슈퍼마켓 입구',
    sign_style: 'warning_yellow',
    lines: [
      { text: '足元注意', ruby: 'あしもとちゅうい', size: 'xl' },
      { text: '滑りやすくなっています', ruby: 'すべりやすくなっています', size: 'lg' },
      { text: 'Watch your step / Slippery floor', size: 'sm', muted: true },
    ],
    translation: '발밑 주의 / 미끄러지기 쉽습니다',
    vocab: [
      { word: '足元注意', reading: 'あしもとちゅうい', meaning: '발밑 주의' },
      { word: '滑りやすい', reading: 'すべりやすい',   meaning: '미끄럽다, 미끄러지기 쉽다' },
      { word: '注意',     reading: 'ちゅうい',         meaning: '주의' },
    ],
    tip: '注意(ちゅうい)는 "주의"로 경고 표지에서 가장 많이 쓰이는 단어 중 하나다. 足元(あしもと)는 "발밑"을 뜻한다.',
    quiz: {
      question: '滑りやすい(すべりやすい)의 의미는?',
      choices: [
        '미끄러지기 쉽다',
        '발밑을 보세요',
        '조심하세요',
        '계단이 있습니다',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_w03',
    category: 'warning',
    difficulty: 'N4',
    scene: '미술관·박물관 내부',
    sign_style: 'warning_red',
    lines: [
      { text: '撮影禁止', ruby: 'さつえいきんし', size: 'xl' },
      { text: '写真撮影はご遠慮ください', ruby: 'しゃしんさつえいはごえんりょください', size: 'md' },
      { text: 'No Photography', size: 'sm', muted: true },
    ],
    translation: '촬영금지 / 사진 촬영은 삼가 주세요',
    vocab: [
      { word: '撮影禁止', reading: 'さつえいきんし',   meaning: '촬영금지' },
      { word: '撮影',     reading: 'さつえい',         meaning: '촬영' },
      { word: 'ご遠慮ください', reading: 'ごえんりょください', meaning: '삼가 주세요 (정중한 금지)' },
    ],
    tip: 'ご遠慮ください(ごえんりょください)는 직접적인 禁止보다 정중한 표현으로, "부디 자제해 주세요"라는 뜻. 일본의 완곡한 금지 표현이다.',
    quiz: {
      question: '写真撮影はご遠慮ください의 의미는?',
      choices: [
        '사진 촬영을 삼가 주세요',
        '사진 촬영 가능합니다',
        '플래시 사용을 자제해 주세요',
        '스마트폰 사용 금지',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_w04',
    category: 'warning',
    difficulty: 'N4',
    scene: '미술관 전시품 안내',
    sign_style: 'warning_yellow',
    lines: [
      { text: '触らないでください', ruby: 'さわらないでください', size: 'xl' },
      { text: '手を触れないこと', ruby: 'てをふれないこと',     size: 'lg' },
      { text: 'Do Not Touch', size: 'sm', muted: true },
    ],
    translation: '만지지 마세요 / 손을 대지 마세요',
    vocab: [
      { word: '触る',   reading: 'さわる',   meaning: '만지다' },
      { word: '触れる', reading: 'ふれる',   meaning: '닿다, 접촉하다' },
      { word: '～ないでください', reading: '～ないでください', meaning: '~하지 마세요' },
    ],
    tip: '～ないでください는 "~하지 마세요"라는 부드러운 금지 표현. 触らないで(さわらないで)와 触れないで(ふれないで)는 비슷한 의미지만 触れる가 더 격식적이다.',
    quiz: {
      question: '触らないでください의 의미는?',
      choices: [
        '만지지 마세요',
        '조용히 해 주세요',
        '사진을 찍지 마세요',
        '뛰지 마세요',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_w05',
    category: 'warning',
    difficulty: 'N4',
    scene: '건물 복도 비상구 표시',
    sign_style: 'warning_red',
    lines: [
      { text: '非常口', ruby: 'ひじょうぐち', size: 'xl' },
      { text: '非常階段 →', ruby: 'ひじょうかいだん', size: 'lg' },
      { text: '消火器', ruby: 'しょうかき',    size: 'lg' },
      { text: 'Emergency Exit / Emergency Stairs / Fire Extinguisher', size: 'sm', muted: true },
    ],
    translation: '비상구 / 비상계단 → / 소화기',
    vocab: [
      { word: '非常口',   reading: 'ひじょうぐち',   meaning: '비상구' },
      { word: '非常階段', reading: 'ひじょうかいだん', meaning: '비상계단' },
      { word: '消火器',   reading: 'しょうかき',     meaning: '소화기' },
    ],
    tip: '非常(ひじょう)는 "비상, 긴급"을 뜻한다. 非常口의 녹색 표지는 일본 어디서든 같은 디자인으로 사용되어 쉽게 알아볼 수 있다.',
    quiz: {
      question: '非常口(ひじょうぐち)의 의미는?',
      choices: [
        '비상구',
        '비상계단',
        '소화기',
        '출입구',
      ],
      answer: 0,
    },
  },

  // ─────────────────────────────────────────────
  // TOURIST (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_t01',
    category: 'tourist',
    difficulty: 'N4',
    scene: '관광 안내 표지판 (거리)',
    sign_style: 'tourist_green',
    lines: [
      { text: '浅草寺', ruby: 'せんそうじ',   size: 'xl' },
      { text: '徒歩 約5分', ruby: 'とほ やく5ふん', size: 'lg' },
      { text: 'Sensoji Temple  approx. 5 min walk', size: 'sm', muted: true },
    ],
    translation: '센소지 (아사쿠사 절) / 도보 약 5분',
    vocab: [
      { word: '徒歩',  reading: 'とほ',   meaning: '도보, 걷기' },
      { word: '約',    reading: 'やく',   meaning: '약, 대략' },
      { word: '～分',  reading: '～ふん', meaning: '~분' },
    ],
    tip: '徒歩(とほ)는 "걸어서"라는 뜻. 約(やく)~分(ふん) 패턴으로 목적지까지의 도보 시간을 표시한다. 5分(ごふん)·10分(じゅっぷん) 등 숫자 + 分을 외워두자.',
    quiz: {
      question: '徒歩 約5分의 의미는?',
      choices: [
        '도보로 약 5분',
        '버스로 5분',
        '5분마다 출발',
        '5분 기다려 주세요',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_t02',
    category: 'tourist',
    difficulty: 'N4',
    scene: '역 앞 관광 안내소',
    sign_style: 'tourist_green',
    lines: [
      { text: '観光案内所', ruby: 'かんこうあんないじょ', size: 'xl' },
      { text: 'インフォメーション', size: 'lg' },
      { text: 'Tourist Information', size: 'sm', muted: true },
    ],
    translation: '관광 안내소 / 인포메이션',
    vocab: [
      { word: '観光',   reading: 'かんこう', meaning: '관광' },
      { word: '案内所', reading: 'あんないじょ', meaning: '안내소' },
      { word: '案内',   reading: 'あんない', meaning: '안내' },
    ],
    tip: '案内(あんない)는 "안내"라는 뜻으로, 案内所·案内板·ご案内 등 관광·교통 표지에서 폭넓게 쓰인다.',
    quiz: {
      question: '観光案内所(かんこうあんないじょ)의 의미는?',
      choices: [
        '관광 안내소',
        '경찰서',
        '매표소',
        '우체국',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_t03',
    category: 'tourist',
    difficulty: 'N3',
    scene: '교토 신사 입구',
    sign_style: 'tourist_green',
    lines: [
      { text: '御朱印', ruby: 'ごしゅいん',   size: 'xl' },
      { text: '拝観料  500円', ruby: 'はいかんりょう', size: 'lg' },
      { text: '拝観時間  9:00〜17:00', ruby: 'はいかんじかん', size: 'md' },
      { text: 'Temple Seal / Admission / Hours', size: 'sm', muted: true },
    ],
    translation: '어주인 (절·신사 도장) / 참배료 500엔 / 참배 시간 9:00~17:00',
    vocab: [
      { word: '御朱印', reading: 'ごしゅいん',   meaning: '고주인 (절·신사의 인장)' },
      { word: '拝観料', reading: 'はいかんりょう', meaning: '참배료 (입장료)' },
      { word: '拝観時間', reading: 'はいかんじかん', meaning: '참배(관람) 시간' },
    ],
    tip: '御朱印(ごしゅいん)은 절이나 신사에서 방문 증명으로 받는 도장·묵서. 최근 관광객에게 인기가 높다. 拝観(はいかん)은 절·신사를 참배·관람하는 것을 뜻한다.',
    quiz: {
      question: '拝観料(はいかんりょう)의 의미는?',
      choices: [
        '참배료 (입장료)',
        '주차료',
        '기념품 가격',
        '음식 가격',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_t04',
    category: 'tourist',
    difficulty: 'N4',
    scene: '전망대 안내 표지',
    sign_style: 'tourist_green',
    lines: [
      { text: '写真撮影スポット', ruby: 'しゃしんさつえいスポット', size: 'lg' },
      { text: '展望台 →', ruby: 'てんぼうだい', size: 'xl' },
      { text: 'Photo Spot / Observatory →', size: 'sm', muted: true },
    ],
    translation: '사진 촬영 포인트 / 전망대 →',
    vocab: [
      { word: '写真撮影', reading: 'しゃしんさつえい', meaning: '사진 촬영' },
      { word: '展望台',   reading: 'てんぼうだい',     meaning: '전망대' },
      { word: 'スポット', reading: 'スポット',         meaning: '포인트, 장소' },
    ],
    tip: '展望(てんぼう)는 "멀리 바라보다"는 뜻으로 展望台(전망대)·展望室(전망실) 등에 쓰인다. 撮影(さつえい)는 "촬영"으로 写真撮影(사진 촬영)에서 자주 등장한다.',
    quiz: {
      question: '展望台(てんぼうだい)의 의미는?',
      choices: [
        '전망대',
        '사진 포인트',
        '안내소',
        '기념품 가게',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_t05',
    category: 'tourist',
    difficulty: 'N4',
    scene: '관광 명소 영업 안내',
    sign_style: 'notice_white',
    lines: [
      { text: '営業時間', ruby: 'えいぎょうじかん', size: 'xl' },
      { text: '10:00〜18:00', size: 'xl' },
      { text: '定休日：毎週月曜日', ruby: 'ていきゅうび：まいしゅうげつようび', size: 'md' },
      { text: 'Business Hours / Regular Holiday: Every Monday', size: 'sm', muted: true },
    ],
    translation: '영업 시간 10:00~18:00 / 정기 휴일: 매주 월요일',
    vocab: [
      { word: '営業時間', reading: 'えいぎょうじかん', meaning: '영업 시간' },
      { word: '定休日',   reading: 'ていきゅうび',     meaning: '정기 휴일' },
      { word: '毎週',     reading: 'まいしゅう',       meaning: '매주' },
    ],
    tip: '定休日(ていきゅうび)는 가게·시설의 정기 휴일. 월요일 휴무(月曜日休み)인 곳이 많으니 방문 전에 확인하자. 毎週(まいしゅう)는 "매주"를 뜻한다.',
    quiz: {
      question: '定休日(ていきゅうび)의 의미는?',
      choices: [
        '정기 휴일',
        '영업 시간',
        '임시 휴업',
        '예약 필수일',
      ],
      answer: 0,
    },
  },

  // ─────────────────────────────────────────────
  // PUBLIC (5)
  // ─────────────────────────────────────────────
  {
    id: 'sign_p01',
    category: 'public',
    difficulty: 'N4',
    scene: '내과 병원 입구',
    sign_style: 'public_blue',
    lines: [
      { text: '内科',     ruby: 'ないか',         size: 'xl' },
      { text: '診療時間', ruby: 'しんりょうじかん', size: 'lg' },
      { text: '9:00〜12:00  /  14:00〜18:00', size: 'lg' },
      { text: '受付',     ruby: 'うけつけ',        size: 'md' },
    ],
    translation: '내과 / 진료 시간 9:00~12:00 / 14:00~18:00 / 접수',
    vocab: [
      { word: '内科',     reading: 'ないか',         meaning: '내과' },
      { word: '診療時間', reading: 'しんりょうじかん', meaning: '진료 시간' },
      { word: '受付',     reading: 'うけつけ',        meaning: '접수처, 안내 데스크' },
    ],
    tip: '診療(しんりょう)는 "진료"로 병원에서 자주 보인다. 受付(うけつけ)는 접수처를 뜻하며 병원·호텔·관공서 어디서나 쓰인다.',
    quiz: {
      question: '受付(うけつけ)의 의미는?',
      choices: [
        '접수처',
        '진료실',
        '화장실',
        '약국',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_p02',
    category: 'public',
    difficulty: 'N4',
    scene: '파출소 외벽',
    sign_style: 'public_blue',
    lines: [
      { text: '交番', ruby: 'こうばん', size: 'xl' },
      { text: '警察署', ruby: 'けいさつしょ', size: 'lg' },
      { text: 'Police Box / Police Station', size: 'sm', muted: true },
    ],
    translation: '파출소 / 경찰서',
    vocab: [
      { word: '交番',   reading: 'こうばん',    meaning: '파출소' },
      { word: '警察署', reading: 'けいさつしょ', meaning: '경찰서' },
      { word: '警察',   reading: 'けいさつ',    meaning: '경찰' },
    ],
    tip: '交番(こうばん)은 일본의 소규모 지역 파출소. 길을 잃었을 때 交番に行けば教えてもらえる(파출소에 가면 알려준다)고 기억하면 좋다.',
    quiz: {
      question: '交番(こうばん)의 의미는?',
      choices: [
        '파출소',
        '소방서',
        '우체국',
        '병원',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_p03',
    category: 'public',
    difficulty: 'N4',
    scene: '거리 약국 간판',
    sign_style: 'public_blue',
    lines: [
      { text: '薬局', ruby: 'やっきょく', size: 'xl' },
      { text: 'ドラッグストア', size: 'xl' },
      { text: '処方箋受付', ruby: 'しょほうせんうけつけ', size: 'md' },
      { text: 'Pharmacy / Drug Store / Prescription accepted', size: 'sm', muted: true },
    ],
    translation: '약국 / 드럭스토어 / 처방전 접수',
    vocab: [
      { word: '薬局',   reading: 'やっきょく',   meaning: '약국' },
      { word: '処方箋', reading: 'しょほうせん', meaning: '처방전' },
      { word: '受付',   reading: 'うけつけ',     meaning: '접수' },
    ],
    tip: '薬局(やっきょく)는 처방전을 받는 정식 약국, ドラッグストア는 일반 의약품·화장품을 판매하는 드럭스토어로 구분된다. 처방약은 薬局으로 가야 한다.',
    quiz: {
      question: '処方箋(しょほうせん)의 의미는?',
      choices: [
        '처방전',
        '영수증',
        '보험증',
        '신분증',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_p04',
    category: 'public',
    difficulty: 'N4',
    scene: '우체국 외벽',
    sign_style: 'public_blue',
    lines: [
      { text: '〒 郵便局', ruby: 'ゆうびんきょく', size: 'xl' },
      { text: 'ポスト', size: 'lg' },
      { text: '切手・はがき販売', ruby: 'きって・はがきはんばい', size: 'md' },
      { text: 'Post Office / Post Box / Stamps & Postcards', size: 'sm', muted: true },
    ],
    translation: '우체국 / 우체통 / 우표·엽서 판매',
    vocab: [
      { word: '郵便局', reading: 'ゆうびんきょく', meaning: '우체국' },
      { word: 'ポスト', reading: 'ポスト',         meaning: '우체통' },
      { word: '切手',   reading: 'きって',          meaning: '우표' },
    ],
    tip: '〒는 일본 우편 번호를 나타내는 기호로, 우체국·우편물 관련 표지에 항상 등장한다. 切手(きって)는 우표, はがきは 엽서를 뜻한다.',
    quiz: {
      question: '切手(きって)의 의미는?',
      choices: [
        '우표',
        '엽서',
        '편지',
        '택배',
      ],
      answer: 0,
    },
  },

  {
    id: 'sign_p05',
    category: 'public',
    difficulty: 'N5',
    scene: '쇼핑몰 화장실 안내',
    sign_style: 'public_blue',
    lines: [
      { text: 'トイレ', size: 'xl' },
      { text: 'お手洗い', ruby: 'おてあらい', size: 'xl' },
      { text: '男  ♂ / 女  ♀', ruby: 'おとこ / おんな', size: 'lg' },
      { text: 'Restroom / Men / Women', size: 'sm', muted: true },
    ],
    translation: '화장실 / 남자 / 여자',
    vocab: [
      { word: 'トイレ',  reading: 'トイレ',    meaning: '화장실 (toilet)' },
      { word: 'お手洗い', reading: 'おてあらい', meaning: '화장실 (격식·완곡 표현)' },
      { word: '男 / 女', reading: 'おとこ / おんな', meaning: '남자 / 여자' },
    ],
    tip: 'トイレ와 お手洗い(おてあらい)는 모두 화장실을 뜻하지만, お手洗い가 더 격식 있는 표현이다. 男(だんせい/おとこ)·女(じょせい/おんな) 한자를 외워두면 어디서든 편리하다.',
    quiz: {
      question: 'お手洗い(おてあらい)의 의미는?',
      choices: [
        '화장실',
        '세면대',
        '주방',
        '목욕탕',
      ],
      answer: 0,
    },
  },

];

if (typeof window !== 'undefined') {
  window.SIGN_CATEGORIES = SIGN_CATEGORIES;
  window.SIGN_ITEMS      = SIGN_ITEMS;
}
