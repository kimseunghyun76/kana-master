// ============================================================
//  VOCAB DATA — 4단계(N5 단어/숫자) + 5단계(관광 회화)
//  관광 목표: 메뉴판·역명·표지판 읽기 + 기본 회화
// ============================================================

// ─── 개별 항목 ───
const VOCAB_ITEMS = [

  // ════════════════════════════════════
  //  [4단계] 숫자 기본 (numbers_basic) — 13개
  // ════════════════════════════════════
  { id:'num_1',     japanese:'いち',      kanji:'一',   romaji:'ichi',      korean:'일 (1)',        tip:'물건 셀 때: ひとつ (一つ)' },
  { id:'num_2',     japanese:'に',        kanji:'二',   romaji:'ni',        korean:'이 (2)',        tip:'물건 셀 때: ふたつ (二つ)' },
  { id:'num_3',     japanese:'さん',      kanji:'三',   romaji:'san',       korean:'삼 (3)' },
  { id:'num_4',     japanese:'し・よん',  kanji:'四',   romaji:'shi/yon',   korean:'사 (4)',        tip:'よん이 더 안전 (し는 死와 혼동)' },
  { id:'num_5',     japanese:'ご',        kanji:'五',   romaji:'go',        korean:'오 (5)' },
  { id:'num_6',     japanese:'ろく',      kanji:'六',   romaji:'roku',      korean:'육 (6)' },
  { id:'num_7',     japanese:'なな・しち', kanji:'七',  romaji:'nana/shichi', korean:'칠 (7)',      tip:'なな가 더 명확 (しち는 혼동 주의)' },
  { id:'num_8',     japanese:'はち',      kanji:'八',   romaji:'hachi',     korean:'팔 (8)' },
  { id:'num_9',     japanese:'きゅう・く', kanji:'九',  romaji:'kyu/ku',    korean:'구 (9)',        tip:'きゅう가 더 명확' },
  { id:'num_10',    japanese:'じゅう',    kanji:'十',   romaji:'juu',       korean:'십 (10)' },
  { id:'num_100',   japanese:'ひゃく',    kanji:'百',   romaji:'hyaku',     korean:'백 (100)',      example:'さんびゃく = 300' },
  { id:'num_1000',  japanese:'せん',      kanji:'千',   romaji:'sen',       korean:'천 (1000)',     example:'ごせん = 5000' },
  { id:'num_10000', japanese:'まん',      kanji:'万',   romaji:'man',       korean:'만 (10,000)',   tip:'일본 화폐 단위의 핵심! ¥10,000 = いちまんえん' },

  // ════════════════════════════════════
  //  [4단계] 숫자 응용 (numbers_applied) — 10개
  // ════════════════════════════════════
  { id:'nap_yen',   japanese:'えん',      kanji:'円',   romaji:'en',        korean:'엔 (¥)',        example:'これはいくらですか？ (얼마예요?)' },
  { id:'nap_num11', japanese:'じゅういち', kanji:'十一', romaji:'juu-ichi',  korean:'11',           tip:'십의 자리 + 일의 자리 붙이면 됨' },
  { id:'nap_num20', japanese:'にじゅう',  kanji:'二十', romaji:'ni-juu',    korean:'20' },
  { id:'nap_num21', japanese:'にじゅういち', kanji:'二十一', romaji:'ni-juu-ichi', korean:'21' },
  { id:'nap_num50', japanese:'ごじゅう',  kanji:'五十', romaji:'go-juu',    korean:'50' },
  { id:'nap_num99', japanese:'きゅうじゅうきゅう', kanji:'九十九', romaji:'kyu-juu-kyu', korean:'99' },
  { id:'nap_500',   japanese:'ごひゃく',  kanji:'五百', romaji:'go-hyaku',  korean:'500',          example:'ごひゃくえん = 500엔 (동전)' },
  { id:'nap_mai',   japanese:'まい',      kanji:'枚',   romaji:'mai',       korean:'장 (평평한 물건 세는 단위)', example:'チケットにまい = 티켓 2장' },
  { id:'nap_hon',   japanese:'ほん',      kanji:'本',   romaji:'hon',       korean:'자루/병 (가늘고 긴 물건)', example:'ペンいっぽん = 펜 한 자루' },
  { id:'nap_ko',    japanese:'こ',        kanji:'個',   romaji:'ko',        korean:'개 (작고 둥근 물건)',    example:'りんごみっこ = 사과 3개' },

  // ════════════════════════════════════
  //  [4단계] 날짜/시간 (datetime) — 18개
  // ════════════════════════════════════
  { id:'dt_today',  japanese:'きょう',    kanji:'今日', romaji:'kyou',      korean:'오늘' },
  { id:'dt_tmrw',   japanese:'あした',    kanji:'明日', romaji:'ashita',    korean:'내일' },
  { id:'dt_yest',   japanese:'きのう',    kanji:'昨日', romaji:'kinou',     korean:'어제' },
  { id:'dt_now',    japanese:'いま',      kanji:'今',   romaji:'ima',       korean:'지금' },
  { id:'dt_ji',     japanese:'〜じ',      kanji:'〜時', romaji:'~ji',       korean:'〜시 (시각)',   example:'にじ = 2시' },
  { id:'dt_fun',    japanese:'〜ふん',    kanji:'〜分', romaji:'~fun/pun',  korean:'〜분',          tip:'1,6,8,10분은 っぷん 발음' },
  { id:'dt_han',    japanese:'はん',      kanji:'半',   romaji:'han',       korean:'반 (30분)',     example:'にじはん = 2시 반' },
  { id:'dt_mon',    japanese:'げつようび', kanji:'月曜日', romaji:'getsuyoubi', korean:'월요일' },
  { id:'dt_tue',    japanese:'かようび',  kanji:'火曜日', romaji:'kayoubi',   korean:'화요일' },
  { id:'dt_wed',    japanese:'すいようび', kanji:'水曜日', romaji:'suiyoubi',  korean:'수요일' },
  { id:'dt_thu',    japanese:'もくようび', kanji:'木曜日', romaji:'mokuyoubi', korean:'목요일' },
  { id:'dt_fri',    japanese:'きんようび', kanji:'金曜日', romaji:'kinyoubi',  korean:'금요일' },
  { id:'dt_sat',    japanese:'どようび',  kanji:'土曜日', romaji:'doyoubi',   korean:'토요일' },
  { id:'dt_sun',    japanese:'にちようび', kanji:'日曜日', romaji:'nichiyoubi', korean:'일요일' },
  { id:'dt_am',     japanese:'ごぜん',    kanji:'午前', romaji:'gozen',     korean:'오전 (AM)' },
  { id:'dt_pm',     japanese:'ごご',      kanji:'午後', romaji:'gogo',      korean:'오후 (PM)' },
  { id:'dt_nan',    japanese:'なんじですか', kanji:'何時ですか', romaji:'nanji desu ka', korean:'몇 시예요?', tip:'시간 물어볼 때 핵심 표현' },
  { id:'dt_open',   japanese:'えいぎょうちゅう', kanji:'営業中', romaji:'eigyouchuu', korean:'영업 중 (OPEN)', tip:'가게/식당 문 앞에서 자주 봄' },

  // ════════════════════════════════════
  //  [4단계] N5 음식 단어 (food_n5) — 15개
  // ════════════════════════════════════
  { id:'food_ramen',  japanese:'ラーメン',   romaji:'ramen',     korean:'라면',         tip:'일본식 라멘, 한국 라면과 다름' },
  { id:'food_sushi',  japanese:'すし',       kanji:'寿司',   romaji:'sushi',     korean:'초밥' },
  { id:'food_tempura',japanese:'てんぷら',   kanji:'天ぷら', romaji:'tenpura',   korean:'튀김 (텐푸라)' },
  { id:'food_udon',   japanese:'うどん',                     romaji:'udon',      korean:'우동' },
  { id:'food_soba',   japanese:'そば',                       romaji:'soba',      korean:'소바 (메밀국수)' },
  { id:'food_onigiri',japanese:'おにぎり',                   romaji:'onigiri',   korean:'주먹밥' },
  { id:'food_miso',   japanese:'みそしる',   kanji:'味噌汁', romaji:'misoshiru', korean:'된장국' },
  { id:'food_sake',   japanese:'さけ・おさけ', kanji:'酒',  romaji:'sake',      korean:'술 (일본주)', tip:'お酒 = 정중한 표현' },
  { id:'food_biru',   japanese:'ビール',                     romaji:'biiru',     korean:'맥주' },
  { id:'food_mizu',   japanese:'みず',       kanji:'水',    romaji:'mizu',      korean:'물',           example:'おみず、おねがいします = 물 주세요' },
  { id:'food_ocha',   japanese:'おちゃ',     kanji:'お茶',  romaji:'ocha',      korean:'차 (녹차)',    tip:'무료 제공 식당 많음' },
  { id:'food_menu',   japanese:'メニュー',                   romaji:'menyu',     korean:'메뉴',         example:'メニューをください = 메뉴 주세요' },
  { id:'food_teishoku',japanese:'ていしょく', kanji:'定食', romaji:'teishoku',  korean:'정식 (세트 메뉴)' },
  { id:'food_ikura',  japanese:'いくら',                     romaji:'ikura',     korean:'얼마 / 이크라(연어알)', tip:'いくらですか = 얼마예요?' },
  { id:'food_okane',  japanese:'おかいけい', kanji:'お会計', romaji:'okaikei',  korean:'계산서 (계산해 주세요)', example:'おかいけい、おねがいします' },

  // ════════════════════════════════════
  //  [4단계] N5 교통/장소 (transport_n5) — 15개
  // ════════════════════════════════════
  { id:'tr_eki',      japanese:'えき',      kanji:'駅',   romaji:'eki',       korean:'역 (전철/기차역)' },
  { id:'tr_bus',      japanese:'バス',                     romaji:'basu',      korean:'버스' },
  { id:'tr_taxi',     japanese:'タクシー',                  romaji:'takushii',  korean:'택시' },
  { id:'tr_densha',   japanese:'でんしゃ',  kanji:'電車', romaji:'densha',    korean:'전철 / 기차' },
  { id:'tr_shink',    japanese:'しんかんせん', kanji:'新幹線', romaji:'shinkansen', korean:'신칸센 (고속열차)' },
  { id:'tr_airport',  japanese:'くうこう',  kanji:'空港', romaji:'kuukou',    korean:'공항' },
  { id:'tr_hotel',    japanese:'ホテル',                   romaji:'hoteru',    korean:'호텔' },
  { id:'tr_ryokan',   japanese:'りょかん',  kanji:'旅館', romaji:'ryokan',    korean:'료칸 (일본 여관)' },
  { id:'tr_konbini',  japanese:'コンビニ',                  romaji:'konbini',   korean:'편의점',       tip:'일본 편의점은 거의 모든 걸 해결 가능!' },
  { id:'tr_toilet',   japanese:'トイレ',                   romaji:'toire',     korean:'화장실' },
  { id:'tr_exit',     japanese:'でぐち',    kanji:'出口', romaji:'deguchi',   korean:'출구' },
  { id:'tr_enter',    japanese:'いりぐち',  kanji:'入口', romaji:'iriguchi',  korean:'입구' },
  { id:'tr_right',    japanese:'みぎ',      kanji:'右',   romaji:'migi',      korean:'오른쪽' },
  { id:'tr_left',     japanese:'ひだり',    kanji:'左',   romaji:'hidari',    korean:'왼쪽' },
  { id:'tr_straight', japanese:'まっすぐ',               romaji:'massugu',   korean:'직진 / 곧장' },

  // ════════════════════════════════════
  //  [4단계] N5 형용사 (adjectives_n5) — 10개
  // ════════════════════════════════════
  { id:'adj_oishi',   japanese:'おいしい',  kanji:'美味しい', romaji:'oishii',  korean:'맛있다',       tip:'食べ物の最高の褒め言葉' },
  { id:'adj_karai',   japanese:'からい',    kanji:'辛い',   romaji:'karai',    korean:'맵다',          example:'からくないですか = 맵지 않나요?' },
  { id:'adj_amai',    japanese:'あまい',    kanji:'甘い',   romaji:'amai',     korean:'달다' },
  { id:'adj_takai',   japanese:'たかい',    kanji:'高い',   romaji:'takai',    korean:'비싸다 / 높다' },
  { id:'adj_yasui',   japanese:'やすい',    kanji:'安い',   romaji:'yasui',    korean:'싸다 / 저렴하다' },
  { id:'adj_okii',    japanese:'おおきい',  kanji:'大きい', romaji:'ookii',    korean:'크다' },
  { id:'adj_chiisai', japanese:'ちいさい',  kanji:'小さい', romaji:'chiisai',  korean:'작다' },
  { id:'adj_kawaii',  japanese:'かわいい',  kanji:'可愛い', romaji:'kawaii',   korean:'귀엽다',        tip:'쇼핑할 때 가장 많이 쓰는 형용사' },
  { id:'adj_ii',      japanese:'いい',                      romaji:'ii',       korean:'좋다',          example:'いい！ = 좋아요!' },
  { id:'adj_dame',    japanese:'だめ',      kanji:'駄目',   romaji:'dame',     korean:'안 된다 / 불가',  tip:'だめですか = 안 되나요?' },

  // ════════════════════════════════════
  //  [5단계] 관광 인사/기본 (tourism_greetings) — 12개
  // ════════════════════════════════════
  { id:'gr_arigatou', japanese:'ありがとうございます',              romaji:'arigatou gozaimasu', korean:'감사합니다 (정중)', tip:'ありがとう만도 OK (가벼운 감사)' },
  { id:'gr_sumimasen',japanese:'すみません',                        romaji:'sumimasen',          korean:'실례합니다 / 저기요 / 미안해요', tip:'점원 부를 때, 지나갈 때, 사과할 때 모두 사용' },
  { id:'gr_onegai',   japanese:'おねがいします',                    romaji:'onegaishimasu',      korean:'부탁합니다',       example:'〜をください、おねがいします' },
  { id:'gr_hai',      japanese:'はい',                              romaji:'hai',                korean:'네 / 예',         tip:'いいえ = 아니요' },
  { id:'gr_iie',      japanese:'いいえ',                            romaji:'iie',                korean:'아니요' },
  { id:'gr_wakaran',  japanese:'わかりません',                      romaji:'wakarimasen',        korean:'모르겠습니다 / 이해 못 했습니다' },
  { id:'gr_modoichi', japanese:'もう一度おねがいします',            kanji:'もう一度お願いします', romaji:'mou ichido onegaishimasu', korean:'다시 한번 부탁드립니다' },
  { id:'gr_english',  japanese:'えいごはなせますか',               kanji:'英語話せますか',       romaji:'eigo hanasemasu ka', korean:'영어 하실 수 있어요?', tip:'언어 장벽 돌파 비상용' },
  { id:'gr_kankoku',  japanese:'かんこくじんです',                  kanji:'韓国人です',           romaji:'kankokujin desu', korean:'한국인입니다' },
  { id:'gr_namae',    japanese:'〜と申します',                      romaji:'~to moushimasu',     korean:'〜라고 합니다 (이름 소개)', tip:'丁寧な自己紹介' },
  { id:'gr_yoroshiku',japanese:'よろしくおねがいします',            romaji:'yoroshiku onegaishimasu', korean:'잘 부탁드립니다' },
  { id:'gr_shitsurei',japanese:'しつれいします',                    kanji:'失礼します',           romaji:'shitsurei shimasu', korean:'실례하겠습니다 (자리 뜰 때 등)' },

  // ════════════════════════════════════
  //  [5단계] 관광 위치 묻기 (tourism_directions) — 12개
  // ════════════════════════════════════
  { id:'dir_doko',    japanese:'〜はどこですか',                    romaji:'~wa doko desu ka',   korean:'〜은 어디예요?',   tip:'〜에 장소를 넣으세요 (호텔、駅 등)' },
  { id:'dir_ikura',   japanese:'いくらですか',                      romaji:'ikura desu ka',      korean:'얼마예요?',        tip:'쇼핑·식당 필수 표현' },
  { id:'dir_ikimasu', japanese:'〜にいきたいです',                  kanji:'〜に行きたいです',     romaji:'~ni ikitai desu', korean:'〜에 가고 싶어요',  example:'東京タワーにいきたいです' },
  { id:'dir_chikaku', japanese:'ちかくにありますか',               kanji:'近くにありますか',     romaji:'chikaku ni arimasu ka', korean:'근처에 있나요?' },
  { id:'dir_aruite',  japanese:'あるいていけますか',               kanji:'歩いて行けますか',     romaji:'aruite ikemasu ka',  korean:'걸어서 갈 수 있나요?' },
  { id:'dir_made',    japanese:'〜までおねがいします',              romaji:'~made onegaishimasu', korean:'〜까지 부탁합니다', tip:'택시 탈 때 목적지 말하는 법' },
  { id:'dir_chizu',   japanese:'ちずをみせてください',             kanji:'地図を見せてください', romaji:'chizu wo misete kudasai', korean:'지도 보여 주세요' },
  { id:'dir_michi',   japanese:'みちにまよいました',               kanji:'道に迷いました',       romaji:'michi ni mayoimashita', korean:'길을 잃었어요' },
  { id:'dir_toshokan',japanese:'〜ぐちをでてください',             kanji:'〜口を出てください',  romaji:'~guchi wo dete kudasai', korean:'〜번 출구로 나가세요', tip:'역에서 방향 안내할 때 자주 나옴' },
  { id:'dir_massugu', japanese:'まっすぐいってください',           romaji:'massugu itte kudasai', korean:'직진하세요' },
  { id:'dir_migi_te', japanese:'みぎにまがってください',           kanji:'右に曲がってください',  romaji:'migi ni magatte kudasai', korean:'오른쪽으로 도세요' },
  { id:'dir_hidari_te',japanese:'ひだりにまがってください',        kanji:'左に曲がってください',  romaji:'hidari ni magatte kudasai', korean:'왼쪽으로 도세요' },

  // ════════════════════════════════════
  //  [5단계] 관광 식당/쇼핑 (tourism_restaurant) — 14개
  // ════════════════════════════════════
  { id:'res_kore',    japanese:'これをください',                    romaji:'kore wo kudasai',    korean:'이것을 주세요',    tip:'メニューを指差しながら = 메뉴 가리키며' },
  { id:'res_hitotsu', japanese:'ひとつください',                    romaji:'hitotsu kudasai',    korean:'하나 주세요' },
  { id:'res_futari',  japanese:'ふたりです',                        kanji:'二人です',             romaji:'futari desu',     korean:'두 명이요',         tip:'何名様ですか？ 라고 물으면 답하는 표현' },
  { id:'res_yoyaku',  japanese:'よやく',                           kanji:'予約',                 romaji:'yoyaku',          korean:'예약',              example:'よやくしています = 예약했습니다' },
  { id:'res_okaikei', japanese:'おかいけい、おねがいします',       kanji:'お会計、お願いします', romaji:'okaikei onegaishimasu', korean:'계산 부탁드립니다' },
  { id:'res_kaado',   japanese:'カードつかえますか',               romaji:'kaado tsukaemasu ka', korean:'카드 쓸 수 있나요?', tip:'일본은 현금 중심 문화, 확인 필수' },
  { id:'res_baggu',   japanese:'ふくろ',                           kanji:'袋',                   romaji:'fukuro',          korean:'봉투 (가방)',       example:'ふくろいりますか = 봉투 필요하세요?' },
  { id:'res_omiyage', japanese:'おみやげ',                         kanji:'お土産',               romaji:'omiyage',         korean:'기념품 / 선물' },
  { id:'res_ikaga',   japanese:'〜はいかがですか',                 romaji:'~wa ikaga desu ka',   korean:'〜는 어떠세요? (권유)', tip:'점원이 자주 사용하는 표현' },
  { id:'res_nokori',  japanese:'これ、のこりはいくつですか',       romaji:'kore nokori wa ikutsu', korean:'이거 재고가 얼마나 남았어요?' },
  { id:'res_saizu',   japanese:'サイズ',                           romaji:'saizu',               korean:'사이즈 (치수)' },
  { id:'res_discount',japanese:'まけてもらえますか',              romaji:'makete moraemasu ka', korean:'깎아 주실 수 있어요?', tip:'백화점보다 시장에서 유효' },
  { id:'res_takai',   japanese:'すこしたかいですね',              romaji:'sukoshi takai desu ne', korean:'조금 비싸네요',   tip:'가격 흥정 첫 마디' },
  { id:'res_yasuku',  japanese:'もうすこしやすくなりますか',       romaji:'mou sukoshi yasuku narimasu ka', korean:'조금 더 싸게 될까요?' },

  // ════════════════════════════════════
  //  [5단계] 관광 긴급/기타 (tourism_emergency) — 8개
  // ════════════════════════════════════
  { id:'emg_tasuke',  japanese:'たすけてください',                  kanji:'助けてください',       romaji:'tasukete kudasai', korean:'도와주세요!',       tip:'위급상황 시 큰 소리로' },
  { id:'emg_byouin',  japanese:'びょういん',                        kanji:'病院',                 romaji:'byouin',          korean:'병원' },
  { id:'emg_keisatsu',japanese:'けいさつ',                          kanji:'警察',                 romaji:'keisatsu',        korean:'경찰' },
  { id:'emg_guai',    japanese:'きぶんがわるいです',               kanji:'気分が悪いです',       romaji:'kibun ga warui desu', korean:'몸이 안 좋아요' },
  { id:'emg_kusuri',  japanese:'くすり',                            kanji:'薬',                   romaji:'kusuri',          korean:'약',               example:'くすりはありますか = 약 있나요?' },
  { id:'emg_nakushi', japanese:'〜をなくしました',                  kanji:'〜をなくしました',     romaji:'~wo nakushimashita', korean:'〜을 잃어버렸어요', example:'パスポートをなくしました' },
  { id:'emg_taishi',  japanese:'たいしかん',                        kanji:'大使館',               romaji:'taishikan',       korean:'대사관 (한국대사관)' },
  { id:'emg_hoken',   japanese:'りょこうほけん',                    kanji:'旅行保険',             romaji:'ryokou hoken',    korean:'여행 보험',         tip:'해외여행 필수! 여행 전 가입 권장' },
];

// ─── 카테고리 정의 ───
const VOCAB_CATEGORIES = [
  {
    id: 'numbers_basic',
    phase: 4,
    name: '숫자 기본',
    title: '숫자 기본 (数字)',
    subtitle: '1~10, 百·千·万',
    desc: '일본어 숫자의 기초! 가격·수량 읽기',
    icon: '🔢',
    items: ['num_1','num_2','num_3','num_4','num_5','num_6','num_7','num_8','num_9','num_10','num_100','num_1000','num_10000']
  },
  {
    id: 'numbers_applied',
    phase: 4,
    name: '숫자 응용',
    title: '숫자 응용 (計算)',
    subtitle: '11~99, 엔화, 세는 단위',
    desc: '실제 쇼핑·결제에 필요한 숫자 표현',
    icon: '💴',
    items: ['nap_yen','nap_num11','nap_num20','nap_num21','nap_num50','nap_num99','nap_500','nap_mai','nap_hon','nap_ko']
  },
  {
    id: 'datetime',
    phase: 4,
    name: '날짜/시간',
    title: '날짜·시간 (日時)',
    subtitle: '오늘·내일·요일·시간',
    desc: '일정 확인, 영업시간 읽기에 필수',
    icon: '📅',
    items: ['dt_today','dt_tmrw','dt_yest','dt_now','dt_ji','dt_fun','dt_han','dt_mon','dt_tue','dt_wed','dt_thu','dt_fri','dt_sat','dt_sun','dt_am','dt_pm','dt_nan','dt_open']
  },
  {
    id: 'food_n5',
    phase: 4,
    name: 'N5 음식',
    title: 'N5 음식 단어 (食)',
    subtitle: '라멘·스시·우동·계산',
    desc: '메뉴판 읽기 + 식당 주문 표현',
    icon: '🍜',
    items: ['food_ramen','food_sushi','food_tempura','food_udon','food_soba','food_onigiri','food_miso','food_sake','food_biru','food_mizu','food_ocha','food_menu','food_teishoku','food_ikura','food_okane']
  },
  {
    id: 'transport_n5',
    phase: 4,
    name: 'N5 교통/장소',
    title: 'N5 교통·장소 (交通)',
    subtitle: '역·공항·호텔·출입구',
    desc: '이동할 때 필수! 역명·표지판 읽기',
    icon: '🚃',
    items: ['tr_eki','tr_bus','tr_taxi','tr_densha','tr_shink','tr_airport','tr_hotel','tr_ryokan','tr_konbini','tr_toilet','tr_exit','tr_enter','tr_right','tr_left','tr_straight']
  },
  {
    id: 'adjectives_n5',
    phase: 4,
    name: 'N5 형용사',
    title: 'N5 형용사 (形容詞)',
    subtitle: 'おいしい·たかい·かわいい',
    desc: '감탄·평가 표현 — 쇼핑·식사 필수',
    icon: '💡',
    items: ['adj_oishi','adj_karai','adj_amai','adj_takai','adj_yasui','adj_okii','adj_chiisai','adj_kawaii','adj_ii','adj_dame']
  },
  {
    id: 'tourism_greetings',
    phase: 5,
    name: '관광 인사',
    title: '관광 인사·기본 표현',
    subtitle: 'ありがとう·すみません',
    desc: '관광의 첫 걸음 — 기본 예의 표현',
    icon: '🙏',
    items: ['gr_arigatou','gr_sumimasen','gr_onegai','gr_hai','gr_iie','gr_wakaran','gr_modoichi','gr_english','gr_kankoku','gr_namae','gr_yoroshiku','gr_shitsurei']
  },
  {
    id: 'tourism_directions',
    phase: 5,
    name: '관광 위치',
    title: '관광 위치·길 묻기',
    subtitle: '〜はどこですか・まっすぐ',
    desc: '길 묻기, 택시 타기, 방향 이해하기',
    icon: '🗺️',
    items: ['dir_doko','dir_ikura','dir_ikimasu','dir_chikaku','dir_aruite','dir_made','dir_chizu','dir_michi','dir_toshokan','dir_massugu','dir_migi_te','dir_hidari_te']
  },
  {
    id: 'tourism_restaurant',
    phase: 5,
    name: '식당/쇼핑',
    title: '관광 식당·쇼핑 표현',
    subtitle: 'これをください·いくらですか',
    desc: '주문, 결제, 흥정까지 관광 쇼핑 완성',
    icon: '🍽️',
    items: ['res_kore','res_hitotsu','res_futari','res_yoyaku','res_okaikei','res_kaado','res_baggu','res_omiyage','res_ikaga','res_nokori','res_saizu','res_discount','res_takai','res_yasuku']
  },
  {
    id: 'tourism_emergency',
    phase: 5,
    name: '긴급/기타',
    title: '관광 긴급·기타 표현',
    subtitle: 'たすけて·병원·경찰',
    desc: '만일을 대비한 긴급 표현 + 여행 필수어',
    icon: '🚨',
    items: ['emg_tasuke','emg_byouin','emg_keisatsu','emg_guai','emg_kusuri','emg_nakushi','emg_taishi','emg_hoken']
  }
];

// ─── O(1) 조회용 맵 생성 ───
const VOCAB_MAP = {};
VOCAB_ITEMS.forEach(item => { VOCAB_MAP[item.id] = item; });

// ─── 카테고리별 항목 가져오기 ───
function getVocabCategoryItems(categoryId) {
  const cat = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return [];
  return cat.items.map(id => VOCAB_MAP[id]).filter(Boolean);
}

// ─── 퀴즈 오답 보기 생성 ───
function getVocabWrongOptions(correctId, categoryId, count = 3) {
  const sameCategory = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  const samePhase    = VOCAB_CATEGORIES.filter(c => {
    const cat = VOCAB_CATEGORIES.find(x => x.id === categoryId);
    return cat && c.phase === cat.phase && c.id !== categoryId;
  });

  // 동일 카테고리 → 동일 phase → 전체 pool
  let pool = [];
  if (sameCategory) {
    pool = sameCategory.items.filter(id => id !== correctId).map(id => VOCAB_MAP[id]).filter(Boolean);
  }
  if (pool.length < count) {
    samePhase.forEach(cat => {
      cat.items.forEach(id => {
        if (id !== correctId && !pool.find(p => p.id === id)) {
          pool.push(VOCAB_MAP[id]);
        }
      });
    });
  }
  if (pool.length < count) {
    VOCAB_ITEMS.forEach(item => {
      if (item.id !== correctId && !pool.find(p => p.id === item.id)) {
        pool.push(item);
      }
    });
  }

  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

if (typeof module !== 'undefined') {
  module.exports = { VOCAB_CATEGORIES, VOCAB_ITEMS, VOCAB_MAP, getVocabCategoryItems, getVocabWrongOptions };
}
