'use strict';
// ─────────────────────────────────────────────
//  VOCAB_EXAMPLES_DB
//  단어 플래시카드 뒷면에 표시할 관련 단어 & 예시 문장
//  키: vocab-data.js 의 item.id
//  수동으로 자유롭게 추가/수정 가능
// ─────────────────────────────────────────────
const VOCAB_EXAMPLES_DB = {

  // ══════════════════════════════════
  //  숫자 (Numbers)
  // ══════════════════════════════════
  'num_1': {
    compounds: [
      { japanese: 'いちにち', meaning: '하루 (一日)' },
      { japanese: 'いちど', meaning: '한 번 (一度)' },
      { japanese: 'いちばん', meaning: '가장, 1번 (一番)' },
    ],
    sentences: [
      { japanese: 'いちまいください。', meaning: '한 장 주세요.' },
    ],
  },
  'num_2': {
    compounds: [
      { japanese: 'にほん', meaning: '일본 (日本)' },
      { japanese: 'ふたつ', meaning: '두 개 (二つ)' },
    ],
    sentences: [
      { japanese: 'ふたつください。', meaning: '두 개 주세요.' },
    ],
  },
  'num_3': {
    compounds: [
      { japanese: 'さんにん', meaning: '3명 (三人)' },
      { japanese: 'みっつ', meaning: '세 개 (三つ)' },
    ],
    sentences: [
      { japanese: 'さんにんです。', meaning: '3명이에요.' },
    ],
  },
  'num_10': {
    compounds: [
      { japanese: 'じゅっぷん', meaning: '10분 (十分)' },
      { japanese: 'じゅうにん', meaning: '10명 (十人)' },
    ],
    sentences: [
      { japanese: 'じゅうじにあいます。', meaning: '10시에 만나요.' },
    ],
  },
  'num_100': {
    compounds: [
      { japanese: 'ひゃくえん', meaning: '100엔 (百円)' },
      { japanese: 'さんびゃく', meaning: '300 (三百)' },
      { japanese: 'ろっぴゃく', meaning: '600 (六百)' },
    ],
    sentences: [
      { japanese: 'ひゃくえんです。', meaning: '100엔이에요.' },
    ],
  },
  'num_1000': {
    compounds: [
      { japanese: 'いっせん', meaning: '1,000 (一千)' },
      { japanese: 'ごせんえん', meaning: '5,000엔 (五千円)' },
    ],
    sentences: [
      { japanese: 'せんえんさつ', meaning: '1,000엔 지폐' },
    ],
  },
  'num_10000': {
    compounds: [
      { japanese: 'いちまんえん', meaning: '10,000엔 (一万円)' },
      { japanese: 'まんにん', meaning: '10,000명 (万人)' },
    ],
    sentences: [
      { japanese: 'いちまんえんさつはありますか？', meaning: '만 엔짜리 지폐 있어요?' },
    ],
  },

  // ══════════════════════════════════
  //  날짜·시간 (Date & Time)
  // ══════════════════════════════════
  'dt_today': {
    compounds: [
      { japanese: 'きょうは', meaning: '오늘은 (주제 조사 포함)' },
      { japanese: 'きょうじゅう', meaning: '오늘 중으로 (今日中)' },
    ],
    sentences: [
      { japanese: 'きょうはなんようびですか？', meaning: '오늘은 무슨 요일이에요?' },
      { japanese: 'きょうはいいてんきですね。', meaning: '오늘 날씨 좋죠.' },
    ],
  },
  'dt_tmrw': {
    compounds: [
      { japanese: 'あしたから', meaning: '내일부터' },
      { japanese: 'あしたまで', meaning: '내일까지' },
    ],
    sentences: [
      { japanese: 'あしたあいましょう。', meaning: '내일 만나요.' },
    ],
  },
  'dt_now': {
    compounds: [
      { japanese: 'いまから', meaning: '지금부터 (今から)' },
      { japanese: 'いますぐ', meaning: '지금 당장 (今すぐ)' },
    ],
    sentences: [
      { japanese: 'いまなんじですか？', meaning: '지금 몇 시예요?' },
    ],
  },
  'dt_ji': {
    compounds: [
      { japanese: 'さんじ', meaning: '3시 (三時)' },
      { japanese: 'なんじ', meaning: '몇 시 (何時)' },
      { japanese: 'じかん', meaning: '시간 (時間)' },
    ],
    sentences: [
      { japanese: 'ごじにあいましょう。', meaning: '5시에 만나요.' },
      { japanese: 'なんじですか？', meaning: '몇 시예요?' },
    ],
  },
  'dt_fun': {
    compounds: [
      { japanese: 'ごふん', meaning: '5분 (五分)' },
      { japanese: 'じゅっぷん', meaning: '10분 (十分, っぷん 발음)' },
      { japanese: 'さんじゅっぷん', meaning: '30분 (三十分)' },
    ],
    sentences: [
      { japanese: 'じゅっぷんまってください。', meaning: '10분 기다려 주세요.' },
    ],
  },
  'dt_han': {
    compounds: [
      { japanese: 'にじはん', meaning: '2시 반 (二時半)' },
      { japanese: 'はんぶん', meaning: '반, 절반 (半分)' },
    ],
    sentences: [
      { japanese: 'さんじはんにきてください。', meaning: '3시 반에 와 주세요.' },
    ],
  },
  'dt_mon': {
    compounds: [
      { japanese: 'まいげつようび', meaning: '매주 월요일' },
    ],
    sentences: [
      { japanese: 'げつようびはやすみです。', meaning: '월요일은 쉬어요.' },
    ],
  },
  'dt_fri': {
    compounds: [
      { japanese: 'きんようびのよる', meaning: '금요일 밤' },
    ],
    sentences: [
      { japanese: 'きんようびにパーティーがあります。', meaning: '금요일에 파티가 있어요.' },
    ],
  },

  // ══════════════════════════════════
  //  음식·식당 (Food & Restaurant)
  // ══════════════════════════════════
  'food_ramen': {
    compounds: [
      { japanese: 'ラーメンや', meaning: '라멘 가게 (ラーメン屋)' },
      { japanese: 'とんこつラーメン', meaning: '돼지뼈 라멘' },
      { japanese: 'しょうゆラーメン', meaning: '간장 라멘' },
    ],
    sentences: [
      { japanese: 'ラーメンをたべましょう。', meaning: '라멘 먹어요.' },
    ],
  },
  'food_sushi': {
    compounds: [
      { japanese: 'すしや', meaning: '초밥 가게 (寿司屋)' },
      { japanese: 'まぐろ', meaning: '참치 (鮪)' },
      { japanese: 'かいてんすし', meaning: '회전초밥 (回転寿司)' },
    ],
    sentences: [
      { japanese: 'すしがたべたいです。', meaning: '초밥이 먹고 싶어요.' },
    ],
  },
  'food_udon': {
    compounds: [
      { japanese: 'うどんや', meaning: '우동 가게 (うどん屋)' },
      { japanese: 'きつねうどん', meaning: '유부우동 (きつねうどん)' },
      { japanese: 'たぬきうどん', meaning: '튀김부스러기 우동' },
    ],
    sentences: [
      { japanese: 'うどんをひとつください。', meaning: '우동 하나 주세요.' },
    ],
  },
  'food_onigiri': {
    compounds: [
      { japanese: 'ツナおにぎり', meaning: '참치 주먹밥' },
      { japanese: 'さけおにぎり', meaning: '연어 주먹밥' },
      { japanese: 'コンビニおにぎり', meaning: '편의점 주먹밥' },
    ],
    sentences: [
      { japanese: 'おにぎりをふたつかいました。', meaning: '주먹밥을 두 개 샀어요.' },
    ],
  },
  'food_mizu': {
    compounds: [
      { japanese: 'おみず', meaning: '물 (정중한 표현)' },
      { japanese: 'みずわり', meaning: '물 타기 (水割り)' },
    ],
    sentences: [
      { japanese: 'おみず、おねがいします。', meaning: '물 주세요.' },
    ],
  },
  'food_ocha': {
    compounds: [
      { japanese: 'りょくちゃ', meaning: '녹차 (緑茶)' },
      { japanese: 'むりょう', meaning: '무료 (無料)' },
      { japanese: 'おちゃわん', meaning: '찻잔, 밥공기 (お茶碗)' },
    ],
    sentences: [
      { japanese: 'おちゃはむりょうです。', meaning: '차는 무료예요.' },
    ],
  },
  'food_ikura': {
    compounds: [
      { japanese: 'おいくら', meaning: '얼마 (정중한 표현)' },
      { japanese: 'ぜんぶで', meaning: '전부 해서, 합계' },
    ],
    sentences: [
      { japanese: 'これはいくらですか？', meaning: '이거 얼마예요?' },
      { japanese: 'ぜんぶでいくらですか？', meaning: '전부 해서 얼마예요?' },
    ],
  },
  'food_okane': {
    compounds: [
      { japanese: 'べつべつに', meaning: '따로따로 (계산)' },
      { japanese: 'いっしょに', meaning: '같이 (계산)' },
    ],
    sentences: [
      { japanese: 'おかいけい、おねがいします。', meaning: '계산 부탁드려요.' },
    ],
  },
  'food_menu': {
    compounds: [
      { japanese: 'メニューをみせてください', meaning: '메뉴 보여 주세요' },
      { japanese: 'えいごのメニュー', meaning: '영어 메뉴' },
    ],
    sentences: [
      { japanese: 'メニューをください。', meaning: '메뉴 주세요.' },
    ],
  },

  // ══════════════════════════════════
  //  이동·장소 (Transport & Places)
  // ══════════════════════════════════
  'tr_eki': {
    compounds: [
      { japanese: 'えきまえ', meaning: '역 앞 (駅前)' },
      { japanese: 'えきいん', meaning: '역무원 (駅員)' },
      { japanese: 'ちかてつのえき', meaning: '지하철역' },
    ],
    sentences: [
      { japanese: 'えきはどこですか？', meaning: '역은 어디예요?' },
    ],
  },
  'tr_densha': {
    compounds: [
      { japanese: 'でんしゃちん', meaning: '전철 요금 (電車賃)' },
      { japanese: 'さいしゅうでんしゃ', meaning: '막차 (最終電車)' },
    ],
    sentences: [
      { japanese: 'でんしゃでいきます。', meaning: '전철로 가요.' },
    ],
  },
  'tr_taxi': {
    compounds: [
      { japanese: 'タクシーのりば', meaning: '택시 승강장 (タクシー乗り場)' },
      { japanese: 'タクシーをよぶ', meaning: '택시를 부르다' },
    ],
    sentences: [
      { japanese: 'タクシーをよんでください。', meaning: '택시를 불러 주세요.' },
    ],
  },
  'tr_konbini': {
    compounds: [
      { japanese: 'コンビニATM', meaning: '편의점 ATM' },
      { japanese: 'コンビニべんとう', meaning: '편의점 도시락' },
    ],
    sentences: [
      { japanese: 'ちかくにコンビニはありますか？', meaning: '근처에 편의점 있어요?' },
    ],
  },
  'tr_toilet': {
    compounds: [
      { japanese: 'だんしトイレ', meaning: '남자 화장실' },
      { japanese: 'じょしトイレ', meaning: '여자 화장실' },
      { japanese: 'トイレのかぎ', meaning: '화장실 열쇠' },
    ],
    sentences: [
      { japanese: 'トイレはどこですか？', meaning: '화장실은 어디예요?' },
    ],
  },
  'tr_exit': {
    compounds: [
      { japanese: 'きたぐち', meaning: '북쪽 출구 (北口)' },
      { japanese: 'みなみぐち', meaning: '남쪽 출구 (南口)' },
      { japanese: 'ひがしぐち', meaning: '동쪽 출구 (東口)' },
    ],
    sentences: [
      { japanese: 'でぐちはどこですか？', meaning: '출구는 어디예요?' },
    ],
  },
  'tr_enter': {
    compounds: [
      { japanese: 'ひがしいりぐち', meaning: '동쪽 입구 (東入口)' },
    ],
    sentences: [
      { japanese: 'いりぐちはどこですか？', meaning: '입구는 어디예요?' },
    ],
  },
  'tr_right': {
    compounds: [
      { japanese: 'みぎて', meaning: '오른손 (右手)' },
      { japanese: 'みぎがわ', meaning: '오른쪽 (右側)' },
    ],
    sentences: [
      { japanese: 'みぎにまがってください。', meaning: '오른쪽으로 도세요.' },
    ],
  },
  'tr_left': {
    compounds: [
      { japanese: 'ひだりて', meaning: '왼손 (左手)' },
      { japanese: 'ひだりがわ', meaning: '왼쪽 (左側)' },
    ],
    sentences: [
      { japanese: 'ひだりにまがってください。', meaning: '왼쪽으로 도세요.' },
    ],
  },

  // ══════════════════════════════════
  //  형용사 (Adjectives)
  // ══════════════════════════════════
  'adj_oishi': {
    compounds: [
      { japanese: 'おいしそう', meaning: '맛있어 보여 (美味しそう)' },
      { japanese: 'とてもおいしい', meaning: '정말 맛있다' },
    ],
    sentences: [
      { japanese: 'これはとてもおいしいです！', meaning: '이거 정말 맛있어요!' },
    ],
  },
  'adj_karai': {
    compounds: [
      { japanese: 'からくない', meaning: '맵지 않다' },
      { japanese: 'からさ', meaning: '매운 정도 (辛さ)' },
    ],
    sentences: [
      { japanese: 'からくないですか？', meaning: '맵지 않나요?' },
      { japanese: 'すこしからいです。', meaning: '조금 매워요.' },
    ],
  },
  'adj_takai': {
    compounds: [
      { japanese: 'たかすぎる', meaning: '너무 비싸다' },
      { japanese: 'たかいビル', meaning: '높은 빌딩' },
    ],
    sentences: [
      { japanese: 'すこしたかいですね。', meaning: '조금 비싸네요.' },
      { japanese: 'もっとやすいのはありますか？', meaning: '더 저렴한 건 있어요?' },
    ],
  },
  'adj_yasui': {
    compounds: [
      { japanese: 'やすいみせ', meaning: '저렴한 가게' },
      { japanese: 'やすくする', meaning: '싸게 하다' },
    ],
    sentences: [
      { japanese: 'これはやすいですか？', meaning: '이거 싸요?' },
    ],
  },
  'adj_okii': {
    compounds: [
      { japanese: 'おおきいサイズ', meaning: '큰 사이즈 (L 사이즈)' },
      { japanese: 'おおきなこえ', meaning: '큰 목소리 (大きな声)' },
    ],
    sentences: [
      { japanese: 'もっとおおきいのはありますか？', meaning: '더 큰 건 있어요?' },
    ],
  },
  'adj_chiisai': {
    compounds: [
      { japanese: 'ちいさいサイズ', meaning: '작은 사이즈 (S 사이즈)' },
      { japanese: 'ちいさいこえ', meaning: '작은 목소리' },
    ],
    sentences: [
      { japanese: 'すこしちいさいですね。', meaning: '조금 작네요.' },
    ],
  },
  'adj_kawaii': {
    compounds: [
      { japanese: 'かわいいね', meaning: '귀엽네 (반말)' },
      { japanese: 'かわいいデザイン', meaning: '귀여운 디자인' },
    ],
    sentences: [
      { japanese: 'これ、かわいいですね！', meaning: '이거 귀엽네요!' },
    ],
  },
  'adj_ii': {
    compounds: [
      { japanese: 'いいですよ', meaning: '괜찮아요, 좋아요' },
      { japanese: 'よくない', meaning: '좋지 않다 (いい의 부정은 よくない)' },
    ],
    sentences: [
      { japanese: 'それはいいですね！', meaning: '그거 좋네요!' },
      { japanese: 'はい、いいですよ。', meaning: '네, 괜찮아요.' },
    ],
  },

  // ══════════════════════════════════
  //  인사·표현 (Greetings & Phrases)
  // ══════════════════════════════════
  'gr_arigatou': {
    compounds: [
      { japanese: 'どうもありがとう', meaning: '정말 감사해요' },
      { japanese: 'ありがとうございました', meaning: '감사했습니다 (과거형)' },
    ],
    sentences: [
      { japanese: 'いろいろありがとうございます。', meaning: '여러모로 감사합니다.' },
    ],
  },
  'gr_sumimasen': {
    compounds: [
      { japanese: 'すみませんが', meaning: '실례지만, 죄송한데요' },
      { japanese: 'まことにすみません', meaning: '정말 죄송합니다' },
    ],
    sentences: [
      { japanese: 'すみません、えきはどこですか？', meaning: '저기요, 역은 어디예요?' },
      { japanese: 'すみません、とおってください。', meaning: '죄송해요, 지나갈게요.' },
    ],
  },
  'gr_onegai': {
    compounds: [
      { japanese: 'どうぞよろしく', meaning: '잘 부탁해요' },
      { japanese: 'おねがいがあります', meaning: '부탁이 있어요' },
    ],
    sentences: [
      { japanese: 'みずをおねがいします。', meaning: '물 부탁드려요.' },
      { japanese: 'ゆっくりおねがいします。', meaning: '천천히 부탁드려요.' },
    ],
  },
  'gr_hai': {
    compounds: [
      { japanese: 'はい、そうです', meaning: '네, 그래요' },
      { japanese: 'はい、わかりました', meaning: '네, 알겠어요' },
    ],
    sentences: [
      { japanese: 'はい、おねがいします。', meaning: '네, 부탁드려요.' },
    ],
  },
  'gr_wakaran': {
    compounds: [
      { japanese: 'にほんごがわかりません', meaning: '일본어를 모릅니다' },
      { japanese: 'わかりました', meaning: '알겠어요 (알아들었어요)' },
    ],
    sentences: [
      { japanese: 'すみません、わかりません。', meaning: '죄송해요, 모르겠어요.' },
      { japanese: 'もうすこしゆっくりおねがいします。', meaning: '좀 더 천천히 부탁드려요.' },
    ],
  },
  'gr_modoichi': {
    compounds: [
      { japanese: 'もういちど', meaning: '다시 한번 (もう一度)' },
      { japanese: 'ゆっくりはなす', meaning: '천천히 말하다' },
    ],
    sentences: [
      { japanese: 'もういちど、おねがいします。', meaning: '다시 한번, 부탁드려요.' },
    ],
  },
  'gr_yoroshiku': {
    compounds: [
      { japanese: 'よろしくおねがいします', meaning: '잘 부탁드려요' },
      { japanese: 'どうぞよろしく', meaning: '아무쪼록 잘 부탁해요' },
    ],
    sentences: [
      { japanese: 'はじめまして。よろしくおねがいします。', meaning: '처음 뵙겠어요. 잘 부탁드려요.' },
    ],
  },

  // ══════════════════════════════════
  //  방향·위치 (Directions)
  // ══════════════════════════════════
  'dir_doko': {
    compounds: [
      { japanese: 'どこにありますか', meaning: '어디에 있어요?' },
      { japanese: 'どこかで', meaning: '어딘가에서' },
    ],
    sentences: [
      { japanese: 'トイレはどこですか？', meaning: '화장실은 어디예요?' },
      { japanese: 'えきはどこですか？', meaning: '역은 어디예요?' },
    ],
  },
  'dir_ikura': {
    compounds: [
      { japanese: 'おいくらですか', meaning: '얼마예요? (정중)' },
    ],
    sentences: [
      { japanese: 'これはいくらですか？', meaning: '이거 얼마예요?' },
      { japanese: 'ぜんぶでいくらですか？', meaning: '전부 다 해서 얼마예요?' },
    ],
  },
  'dir_ikimasu': {
    compounds: [
      { japanese: 'どこへいきますか', meaning: '어디에 가요?' },
      { japanese: 'いきたいです', meaning: '가고 싶어요' },
    ],
    sentences: [
      { japanese: 'とうきょうタワーにいきたいです。', meaning: '도쿄타워에 가고 싶어요.' },
    ],
  },
  'dir_chikaku': {
    compounds: [
      { japanese: 'ちかく', meaning: '근처, 가까운 곳 (近く)' },
      { japanese: 'ちかいです', meaning: '가까워요' },
    ],
    sentences: [
      { japanese: 'ちかくにコンビニはありますか？', meaning: '근처에 편의점 있어요?' },
    ],
  },
  'dir_michi': {
    compounds: [
      { japanese: 'みちがわからない', meaning: '길을 모르다' },
      { japanese: 'みちあんない', meaning: '길 안내 (道案内)' },
    ],
    sentences: [
      { japanese: 'すみません、みちにまよいました。', meaning: '죄송해요, 길을 잃었어요.' },
    ],
  },

  // ══════════════════════════════════
  //  쇼핑 (Shopping)
  // ══════════════════════════════════
  'res_kore': {
    compounds: [
      { japanese: 'これとそれ', meaning: '이것과 그것' },
      { japanese: 'これでいい', meaning: '이걸로 됐어요' },
    ],
    sentences: [
      { japanese: 'これをください。', meaning: '이걸 주세요.' },
      { japanese: 'これとこれをください。', meaning: '이거랑 이거 주세요.' },
    ],
  },
  'res_hitotsu': {
    compounds: [
      { japanese: 'ひとつだけ', meaning: '하나만' },
      { japanese: 'もうひとつ', meaning: '하나 더' },
    ],
    sentences: [
      { japanese: 'ひとつください。', meaning: '하나 주세요.' },
      { japanese: 'もうひとつください。', meaning: '하나 더 주세요.' },
    ],
  },
  'res_yoyaku': {
    compounds: [
      { japanese: 'よやくをする', meaning: '예약을 하다' },
      { japanese: 'よやくずみ', meaning: '예약 완료 (予約済み)' },
    ],
    sentences: [
      { japanese: 'よやくしています。たなかです。', meaning: '예약했어요. 다나카입니다.' },
    ],
  },
  'res_okaikei': {
    compounds: [
      { japanese: 'いっかいで', meaning: '한 번에 (일시불)' },
      { japanese: 'わりかん', meaning: '더치페이 (割り勘)' },
    ],
    sentences: [
      { japanese: 'おかいけい、おねがいします。', meaning: '계산 부탁드려요.' },
    ],
  },
  'res_kaado': {
    compounds: [
      { japanese: 'クレジットカード', meaning: '신용카드' },
      { japanese: 'カードがつかえる', meaning: '카드를 쓸 수 있다' },
    ],
    sentences: [
      { japanese: 'カードつかえますか？', meaning: '카드 쓸 수 있나요?' },
    ],
  },
  'res_saizu': {
    compounds: [
      { japanese: 'エスサイズ', meaning: 'S 사이즈 (Small)' },
      { japanese: 'エムサイズ', meaning: 'M 사이즈 (Medium)' },
      { japanese: 'エルサイズ', meaning: 'L 사이즈 (Large)' },
    ],
    sentences: [
      { japanese: 'エムサイズはありますか？', meaning: 'M 사이즈 있어요?' },
    ],
  },
  'res_takai': {
    compounds: [
      { japanese: 'たかすぎます', meaning: '너무 비싸요' },
    ],
    sentences: [
      { japanese: 'すこしたかいですね。まけてもらえますか？', meaning: '조금 비싸네요. 깎아 주실 수 있어요?' },
    ],
  },

  // ══════════════════════════════════
  //  긴급 (Emergency)
  // ══════════════════════════════════
  'emg_tasuke': {
    compounds: [
      { japanese: 'たすけて！', meaning: '살려줘! (반말·긴급)' },
      { japanese: 'きゅうきゅうしゃ', meaning: '구급차 (救急車)' },
    ],
    sentences: [
      { japanese: 'たすけてください！', meaning: '도와주세요!' },
      { japanese: 'きゅうきゅうしゃをよんでください！', meaning: '구급차를 불러 주세요!' },
    ],
  },
  'emg_byouin': {
    compounds: [
      { japanese: 'きゅうきゅうびょういん', meaning: '응급병원 (救急病院)' },
      { japanese: 'びょういんにいく', meaning: '병원에 가다' },
    ],
    sentences: [
      { japanese: 'びょういんにつれていってください。', meaning: '병원에 데려가 주세요.' },
    ],
  },
  'emg_keisatsu': {
    compounds: [
      { japanese: 'けいさつかん', meaning: '경찰관 (警察官)' },
      { japanese: 'けいさつしょ', meaning: '경찰서 (警察署)' },
    ],
    sentences: [
      { japanese: 'けいさつをよんでください。', meaning: '경찰을 불러 주세요.' },
    ],
  },
  'emg_kusuri': {
    compounds: [
      { japanese: 'くすりや・やっきょく', meaning: '약국 (薬屋·薬局)' },
      { japanese: 'いたみどめ', meaning: '진통제 (痛み止め)' },
      { japanese: 'ねつさまし', meaning: '해열제 (熱冷まし)' },
    ],
    sentences: [
      { japanese: 'くすりはどこでかえますか？', meaning: '약은 어디서 살 수 있어요?' },
    ],
  },
  'emg_nakushi': {
    compounds: [
      { japanese: 'パスポートをなくした', meaning: '여권을 잃어버렸다' },
      { japanese: 'さいふをなくした', meaning: '지갑을 잃어버렸다' },
    ],
    sentences: [
      { japanese: 'パスポートをなくしました。', meaning: '여권을 잃어버렸어요.' },
      { japanese: 'たいしかんはどこですか？', meaning: '대사관은 어디예요?' },
    ],
  },

  // ══════════════════════════════════
  //  호텔 (Hotel)
  // ══════════════════════════════════
  'ht_checkin': {
    compounds: [
      { japanese: 'チェックインする', meaning: '체크인하다' },
      { japanese: 'チェックインじかん', meaning: '체크인 시간' },
    ],
    sentences: [
      { japanese: 'チェックインをおねがいします。', meaning: '체크인 부탁드려요.' },
      { japanese: 'なんじからチェックインできますか？', meaning: '몇 시부터 체크인 가능해요?' },
    ],
  },
  'ht_checkout': {
    compounds: [
      { japanese: 'チェックアウトじかん', meaning: '체크아웃 시간' },
      { japanese: 'おくれてチェックアウト', meaning: '레이트 체크아웃' },
    ],
    sentences: [
      { japanese: 'なんじにチェックアウトですか？', meaning: '몇 시에 체크아웃인가요?' },
    ],
  },
  'ht_yoyaku': {
    compounds: [
      { japanese: 'よやくばんごう', meaning: '예약 번호 (予約番号)' },
    ],
    sentences: [
      { japanese: 'よやくをしています。たなかです。', meaning: '예약했어요. 다나카입니다.' },
    ],
  },
  'ht_kagi': {
    compounds: [
      { japanese: 'カードキー', meaning: '카드 키' },
      { japanese: 'かぎをなくす', meaning: '열쇠를 잃어버리다' },
    ],
    sentences: [
      { japanese: 'かぎをなくしました。あたらしいかぎをください。', meaning: '열쇠를 잃어버렸어요. 새 열쇠 주세요.' },
    ],
  },
  'ht_taoru': {
    compounds: [
      { japanese: 'バスタオル', meaning: '배스 타올' },
      { japanese: 'フェイスタオル', meaning: '페이스 타올' },
    ],
    sentences: [
      { japanese: 'タオルをもういちまいください。', meaning: '수건을 한 장 더 주세요.' },
    ],
  },

  // ══════════════════════════════════
  //  여행·교통 (Travel)
  // ══════════════════════════════════
  'td_shink': {
    compounds: [
      { japanese: 'のぞみ', meaning: 'JR 노조미호 (최고속)' },
      { japanese: 'していせき', meaning: '지정석 (指定席)' },
      { japanese: 'じゆうせき', meaning: '자유석 (自由席)' },
    ],
    sentences: [
      { japanese: 'しんかんせんのきっぷをかいたいです。', meaning: '신칸센 표를 사고 싶어요.' },
    ],
  },
  'td_jiyuuseki': {
    compounds: [
      { japanese: 'していせき', meaning: '지정석 (指定席)' },
      { japanese: 'グリーンしゃ', meaning: '그린카 (1등석)' },
    ],
    sentences: [
      { japanese: 'じゆうせきはありますか？', meaning: '자유석 있어요?' },
    ],
  },
  'td_suica': {
    compounds: [
      { japanese: 'スイカをチャージ', meaning: '스이카를 충전하다' },
      { japanese: 'パスモ', meaning: 'PASMO (다른 IC카드)' },
    ],
    sentences: [
      { japanese: 'スイカはコンビニでもつかえます。', meaning: '스이카는 편의점에서도 쓸 수 있어요.' },
    ],
  },
  'td_kippu': {
    compounds: [
      { japanese: 'かえりのきっぷ', meaning: '돌아가는 표 (귀로)' },
      { japanese: 'きっぷうりば', meaning: '매표소 (切符売り場)' },
    ],
    sentences: [
      { japanese: 'きっぷをかいたいです。', meaning: '표를 사고 싶어요.' },
    ],
  },
  'td_norikae': {
    compounds: [
      { japanese: 'のりかえなし', meaning: '직통 (환승 없음)' },
      { japanese: 'のりかえせん', meaning: '환승 노선 (乗り換え線)' },
    ],
    sentences: [
      { japanese: 'のりかえはどこですか？', meaning: '환승은 어디서 해요?' },
    ],
  },

  // ══════════════════════════════════
  //  스몰토크 (Small Talk)
  // ══════════════════════════════════
  'st_ogenki': {
    compounds: [
      { japanese: 'げんきです', meaning: '잘 지내요 (元気です)' },
      { japanese: 'おかげさまで', meaning: '덕분에 (よく지내요)' },
    ],
    sentences: [
      { japanese: 'おげんきですか？はい、げんきです！', meaning: '잘 지내세요? 네, 잘 지내요!' },
    ],
  },
  'st_tenki': {
    compounds: [
      { japanese: 'いいてんき', meaning: '좋은 날씨 (いい天気)' },
      { japanese: 'わるいてんき', meaning: '나쁜 날씨' },
      { japanese: 'てんきよほう', meaning: '날씨 예보 (天気予報)' },
    ],
    sentences: [
      { japanese: 'きょうはいいてんきですね。', meaning: '오늘 날씨 좋죠.' },
    ],
  },
  'st_suki': {
    compounds: [
      { japanese: 'すきなたべもの', meaning: '좋아하는 음식 (好きな食べ物)' },
      { japanese: 'だいすき', meaning: '매우 좋아해요 (大好き)' },
    ],
    sentences: [
      { japanese: 'にほんりょうりがすきです。', meaning: '일본 요리를 좋아해요.' },
      { japanese: 'どんなおんがくがすきですか？', meaning: '어떤 음악을 좋아해요?' },
    ],
  },
  'st_sugoi': {
    compounds: [
      { japanese: 'すごく', meaning: '매우, 굉장히' },
      { japanese: 'すごいですね', meaning: '대단하네요!' },
    ],
    sentences: [
      { japanese: 'それはすごいですね！', meaning: '그건 대단하네요!' },
    ],
  },
  'st_tanoshii': {
    compounds: [
      { japanese: 'たのしかった', meaning: '즐거웠어요 (과거형)' },
      { japanese: 'たのしみにしています', meaning: '기대하고 있어요 (楽しみにしています)' },
    ],
    sentences: [
      { japanese: 'にほんりょこう、たのしいですね！', meaning: '일본 여행, 즐겁죠!' },
    ],
  },
  'st_issho': {
    compounds: [
      { japanese: 'いっしょに', meaning: '함께, 같이 (一緒に)' },
      { japanese: 'いっしょにいく', meaning: '함께 가다' },
    ],
    sentences: [
      { japanese: 'いっしょにたべましょう！', meaning: '같이 먹어요!' },
    ],
  },
  'st_omedetou': {
    compounds: [
      { japanese: 'たんじょうびおめでとう', meaning: '생일 축하해요' },
      { japanese: 'おめでとうございます', meaning: '축하합니다 (정중)' },
    ],
    sentences: [
      { japanese: 'たんじょうびおめでとうございます！', meaning: '생일 축하합니다!' },
    ],
  },

}; // end VOCAB_EXAMPLES_DB
