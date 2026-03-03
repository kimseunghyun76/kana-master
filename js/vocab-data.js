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

  // ════════════════════════════════════
  //  [6단계] 스몰토크 (small_talk) — 15개
  // ════════════════════════════════════
  { id:'st_hisashiburi', japanese:'おひさしぶりです',              kanji:'お久しぶりです',        romaji:'o hisashiburi desu',      korean:'오랜만이에요',        tip:'친구나 아는 사람을 오래만에 만났을 때' },
  { id:'st_ogenki',      japanese:'おげんきですか',                kanji:'お元気ですか',          romaji:'o genki desu ka',         korean:'잘 지내세요?',        example:'はい、げんきです = 네, 잘 지냈어요' },
  { id:'st_tenki',       japanese:'きょうはいいてんきですね',      kanji:'今日はいい天気ですね',  romaji:'kyou wa ii tenki desu ne', korean:'오늘 날씨 좋죠?',     tip:'일본에서 날씨 스몰토크는 기본!' },
  { id:'st_atsui',       japanese:'あついですね',                  kanji:'暑いですね',            romaji:'atsui desu ne',           korean:'덥네요',              tip:'さむいですね = 춥네요' },
  { id:'st_samui',       japanese:'さむいですね',                  kanji:'寒いですね',            romaji:'samui desu ne',           korean:'춥네요',              tip:'あついですね = 덥네요' },
  { id:'st_shumi',       japanese:'しゅみはなんですか',            kanji:'趣味は何ですか',        romaji:'shumi wa nan desu ka',    korean:'취미가 뭐예요?',      example:'わたしのしゅみはりょこうです = 취미는 여행이에요' },
  { id:'st_suki',        japanese:'〜がすきです',                  kanji:'〜が好きです',          romaji:'~ga suki desu',           korean:'〜을/를 좋아해요',     example:'にほんりょうりがすきです = 일본 요리 좋아해요' },
  { id:'st_tanoshii',    japanese:'たのしいですね！',              kanji:'楽しいですね！',        romaji:'tanoshii desu ne',        korean:'즐겁네요! 재미있어요!', tip:'여행·파티 등에서 자주 쓰임' },
  { id:'st_sugoi',       japanese:'すごいですね！',                kanji:'すごいですね！',        romaji:'sugoi desu ne',           korean:'대단하네요! 굉장해요!', tip:'칭찬할 때 만능 표현' },
  { id:'st_taihen',      japanese:'たいへんですね',                kanji:'大変ですね',            romaji:'taihen desu ne',          korean:'힘들겠네요 / 고생이에요', tip:'상대방을 위로할 때 사용' },
  { id:'st_mata',        japanese:'またあいましょう！',             kanji:'また会いましょう！',    romaji:'mata aimashou',           korean:'또 만나요!',           tip:'헤어질 때 자주 쓰는 인사' },
  { id:'st_omedetou',    japanese:'おめでとうございます',          kanji:'おめでとうございます',  romaji:'omedetou gozaimasu',      korean:'축하합니다!',          tip:'생일, 합격, 결혼 등에 사용' },
  { id:'st_issho',       japanese:'いっしょにいきましょう！',      kanji:'一緒に行きましょう！',  romaji:'issho ni ikimashou',      korean:'같이 가요!',           example:'しょくじにいきましょう = 식사하러 가요' },
  { id:'st_nani',        japanese:'なにがたべたいですか',          kanji:'何が食べたいですか',    romaji:'nani ga tabetai desu ka', korean:'뭐 먹고 싶어요?',      tip:'밥 먹기 전 자주 쓰는 표현' },
  { id:'st_yoroshiku',   japanese:'どうぞよろしくおねがいします',  kanji:'どうぞよろしくお願いします', romaji:'douzo yoroshiku onegaishimasu', korean:'잘 부탁드립니다 (처음 만남)', tip:'명함 교환 또는 첫 만남 시 필수' },

  // ════════════════════════════════════
  //  [6단계] 호텔 숙박 (hotel_stay) — 13개
  // ════════════════════════════════════
  { id:'ht_checkin',     japanese:'チェックイン',                  romaji:'chekku in',            korean:'체크인',              tip:'フロントでチェックインします = 프론트에서 체크인해요' },
  { id:'ht_checkout',    japanese:'チェックアウト',                romaji:'chekku auto',          korean:'체크아웃',            example:'なんじにチェックアウトですか = 몇 시에 체크아웃인가요?' },
  { id:'ht_yoyaku',      japanese:'よやくをしています',            kanji:'予約をしています',      romaji:'yoyaku wo shite imasu', korean:'예약하셨어요 (나)',   tip:'フロントで = 프론트에서 쓰는 표현' },
  { id:'ht_goushitsu',   japanese:'なんごうしつですか',            kanji:'何号室ですか',          romaji:'nan goushitsu desu ka', korean:'몇 호실인가요?',     example:'ごひゃくさんごうしつです = 503호실이에요' },
  { id:'ht_choshoku',    japanese:'あさごはんはつきますか',        kanji:'朝ごはんはつきますか',  romaji:'asagohan wa tsukimasu ka', korean:'조식 포함인가요?',  tip:'조식 포함=ちょうしょくつき, 미포함=なし' },
  { id:'ht_kagi',        japanese:'かぎをなくしました',            kanji:'鍵をなくしました',      romaji:'kagi wo nakushimashita', korean:'열쇠를 잃어버렸어요', tip:'カードキーも同じ表現 (카드키도 동일 표현)' },
  { id:'ht_taoru',       japanese:'タオルをください',              romaji:'taoru wo kudasai',     korean:'수건 주세요',          example:'もういちまいタオルをください = 수건 한 장 더 주세요' },
  { id:'ht_moningcall',  japanese:'モーニングコールをおねがいします', romaji:'mooningu kooru wo onegaishimasu', korean:'모닝콜 부탁드려요', example:'しちじにおねがいします = 7시로 부탁해요' },
  { id:'ht_room',        japanese:'ルームサービス',                romaji:'ruumu saabisu',        korean:'룸서비스',            tip:'メニューはテレビ横にあります = 메뉴는 TV 옆에 있어요' },
  { id:'ht_elevator',    japanese:'エレベーター',                  romaji:'erebeetaa',            korean:'엘리베이터',          tip:'계단 = かいだん, 비상계단 = ひじょうかいだん' },
  { id:'ht_laundry',     japanese:'コインランドリー',              romaji:'koin randorii',        korean:'코인 세탁기',         tip:'コインランドリーはどこですか = 코인세탁기 어디 있어요?' },
  { id:'ht_lobby',       japanese:'ロビー',                        romaji:'robii',                korean:'로비',                example:'ロビーでまっています = 로비에서 기다릴게요' },
  { id:'ht_extend',      japanese:'チェックアウトをのばせますか',  romaji:'chekku auto wo nobasemasu ka', korean:'체크아웃을 연장할 수 있나요?', tip:'もう一泊お願いしたい = 하룻밤 더 묵고 싶어요' },

  // ════════════════════════════════════
  //  [6단계] 교통 상세 (transport_detail) — 12개
  // ════════════════════════════════════
  { id:'td_shink',       japanese:'しんかんせん',                  kanji:'新幹線',                romaji:'shinkansen',         korean:'신칸센 (고속철도)',    tip:'のぞみ・ひかり・こだま 등 종류가 있음' },
  { id:'td_jiyuuseki',   japanese:'じゆうせき',                    kanji:'自由席',                romaji:'jiyuuseki',          korean:'자유석',              tip:'していせき(指定席) = 지정석, 요금 차이 있음' },
  { id:'td_suica',       japanese:'スイカ',                        romaji:'suika',                korean:'스이카 IC카드',       tip:'PASMO도 동일하게 사용 가능. 편의점도 OK!' },
  { id:'td_kippu',       japanese:'きっぷ',                        kanji:'切符',                  romaji:'kippu',              korean:'표 (승차권)',           example:'きっぷをかいたい = 표를 사고 싶어요' },
  { id:'td_norikae',     japanese:'のりかえ',                      kanji:'乗り換え',              romaji:'norikae',            korean:'환승',                 tip:'のりかえはどこですか = 환승은 어디서 해요?' },
  { id:'td_yuki',        japanese:'〜ゆき',                        kanji:'〜行き',                romaji:'~yuki',              korean:'〜행 (방향)',           example:'とうきょうゆき = 도쿄행' },
  { id:'td_noriba',      japanese:'のりば',                        kanji:'乗り場',                romaji:'noriba',             korean:'승강장 / 탑승장',       tip:'バスのりば = 버스 승강장' },
  { id:'td_jikanhyo',    japanese:'じかんひょう',                  kanji:'時刻表',                romaji:'jikanhyou',          korean:'시간표',               example:'しかんひょうをみてください = 시간표를 보세요' },
  { id:'td_maniau',      japanese:'まにあいますか',                kanji:'間に合いますか',        romaji:'maniau masu ka',     korean:'시간에 맞을까요? (제시간에 될까요?)', tip:'버스·기차 놓칠 것 같을 때' },
  { id:'td_taxi',        japanese:'タクシーをよんでください',       romaji:'takushii wo yonde kudasai', korean:'택시 불러 주세요',  example:'ホテルまでおねがいします = 호텔까지 가주세요' },
  { id:'td_teiryu',      japanese:'ていりゅうじょ',                kanji:'停留所',                romaji:'teiryuujo',          korean:'정류장 (버스 정류장)',  tip:'バスていりゅうじょはどこですか = 버스 정류장 어디예요?' },
  { id:'td_madogawa',    japanese:'まどがわのせき',                kanji:'窓側の席',              romaji:'madogawa no seki',   korean:'창가석',               tip:'つうろがわのせき(通路側の席) = 복도석' },

  // ════════════════════════════════════
  //  [7단계] 실전 시뮬레이션 ① — 음식주문·쇼핑·교통
  // ════════════════════════════════════

  // ── 음식 주문 (sim_order) — 10개 ──
  { id:'so_1',  japanese:'すみません、注文お願いします',          romaji:'sumimasen, chuumon onegai shimasu',    korean:'저기요, 주문할게요',             tip:'손을 살짝 들며 말하면 자연스러움' },
  { id:'so_2',  japanese:'メニューをください',                    romaji:'menyuu o kudasai',                     korean:'메뉴 주세요',                    tip:'お願いします로 대체 가능' },
  { id:'so_3',  japanese:'これをひとつお願いします',              romaji:'kore o hitotsu onegai shimasu',         korean:'이거 하나 주세요',               tip:'ふたつ(2개), みっつ(3개)로 수량 변경' },
  { id:'so_4',  japanese:'おすすめは何ですか',                    romaji:'osusume wa nan desu ka',                korean:'추천 메뉴는 뭐예요?',            tip:'인기있는 것: にんきがあるもの' },
  { id:'so_5',  japanese:'辛くしないでください',                  romaji:'karaku shinaide kudasai',               korean:'맵지 않게 해주세요',             tip:'アレルギーがあります = 알레르기가 있어요' },
  { id:'so_6',  japanese:'お水をください',                        romaji:'omizu o kudasai',                      korean:'물 주세요',                      tip:'일본 식당은 물이 보통 무료' },
  { id:'so_7',  japanese:'お会計お願いします',                    romaji:'okaikei onegai shimasu',                korean:'계산해 주세요',                  tip:'レジでお願いします = 카운터에서 계산' },
  { id:'so_8',  japanese:'別々にお願いします',                    romaji:'betsubetsu ni onegai shimasu',          korean:'따로따로 계산해 주세요',         tip:'一緒に(いっしょに) = 함께' },
  { id:'so_9',  japanese:'持ち帰りでお願いします',                romaji:'mochikaeri de onegai shimasu',          korean:'포장해 주세요',                  tip:'テイクアウト도 통함' },
  { id:'so_10', japanese:'ごちそうさまでした',                    romaji:'gochisousama deshita',                  korean:'잘 먹었습니다',                  tip:'식사 후 인사 — 가게 나갈 때 필수!' },

  // ── 쇼핑 (sim_shopping) — 10개 ──
  { id:'ss_1',  japanese:'これはいくらですか',                    romaji:'kore wa ikura desu ka',                 korean:'이거 얼마예요?',                 tip:'가장 기본적인 쇼핑 표현' },
  { id:'ss_2',  japanese:'見ているだけです',                      romaji:'mite iru dake desu',                    korean:'그냥 보는 중이에요',             tip:'점원이 말 걸 때 부담 없이' },
  { id:'ss_3',  japanese:'試着してもいいですか',                  romaji:'shichaku shite mo ii desu ka',          korean:'입어봐도 되나요?',               tip:'試食(ししょく) = 시식' },
  { id:'ss_4',  japanese:'もう少し安くなりますか',                romaji:'mou sukoshi yasuku narimasu ka',        korean:'좀 더 싸게 되나요?',             tip:'대형 전자상가에서 가능' },
  { id:'ss_5',  japanese:'カードで払えますか',                    romaji:'kaado de haraemasu ka',                 korean:'카드로 결제 되나요?',            tip:'現金(げんきん)のみ = 현금만' },
  { id:'ss_6',  japanese:'免税になりますか',                      romaji:'menzei ni narimasu ka',                 korean:'면세 되나요?',                   tip:'パスポートを見せてください = 여권 보여주세요' },
  { id:'ss_7',  japanese:'Sサイズはありますか',                   romaji:'esu saizu wa arimasu ka',               korean:'S사이즈 있나요?',                tip:'M/L/XL도 같은 패턴' },
  { id:'ss_8',  japanese:'色違いはありますか',                    romaji:'irochihai wa arimasu ka',                korean:'다른 색 있나요?',                tip:'色(いろ) = 색, 違い(ちがい) = 다른' },
  { id:'ss_9',  japanese:'プレゼント用に包んでください',          romaji:'purezento you ni tsutsunde kudasai',    korean:'선물용으로 포장해 주세요',       tip:'일본은 포장 문화가 발달' },
  { id:'ss_10', japanese:'袋をください',                          romaji:'fukuro o kudasai',                      korean:'봉투 주세요',                    tip:'일본은 봉투가 유료 (3~5엔)' },

  // ── 이것저것 가리키기 (sim_pointing) — 10개 ──
  { id:'sp_1',  japanese:'これをください',                        romaji:'kore o kudasai',                        korean:'이거 주세요',                    tip:'가장 만능인 쇼핑 표현!' },
  { id:'sp_2',  japanese:'それは何ですか',                        romaji:'sore wa nan desu ka',                   korean:'그건 뭐예요?',                   tip:'それ = 상대방 가까이 있는 것' },
  { id:'sp_3',  japanese:'あれをお願いします',                    romaji:'are o onegai shimasu',                  korean:'저거 부탁합니다',                tip:'あれ = 둘 다 멀리 있는 것' },
  { id:'sp_4',  japanese:'こっちの方がいいです',                  romaji:'kocchi no hou ga ii desu',              korean:'이쪽이 더 좋아요',               tip:'比較(ひかく)할 때 유용' },
  { id:'sp_5',  japanese:'どれがおすすめですか',                  romaji:'dore ga osusume desu ka',               korean:'어떤 게 추천이에요?',            tip:'どれ = 여러 개 중 어떤 것' },
  { id:'sp_6',  japanese:'もう少し大きいのはありますか',          romaji:'mou sukoshi ookii no wa arimasu ka',    korean:'좀 더 큰 거 있나요?',            tip:'小さい(ちいさい) = 작은' },
  { id:'sp_7',  japanese:'写真を撮ってもいいですか',              romaji:'shashin o totte mo ii desu ka',         korean:'사진 찍어도 되나요?',            tip:'촬영금지: 撮影禁止(さつえいきんし)' },
  { id:'sp_8',  japanese:'これとこれをください',                  romaji:'kore to kore o kudasai',                korean:'이거랑 이거 주세요',             tip:'と = ~와/과 (나열)' },
  { id:'sp_9',  japanese:'ここに書いてください',                  romaji:'koko ni kaite kudasai',                 korean:'여기에 써 주세요',               tip:'주소나 이름을 부탁할 때' },
  { id:'sp_10', japanese:'日本語がわかりません',                  romaji:'nihongo ga wakarimasen',                korean:'일본어를 모르겠어요',            tip:'英語を話せますか = 영어 할 수 있나요?' },

  // ── 택시 (sim_taxi) — 10개 ──
  { id:'st_1',  japanese:'ここまでお願いします',                  romaji:'koko made onegai shimasu',              korean:'여기까지 부탁합니다',            tip:'지도나 주소를 보여주며' },
  { id:'st_2',  japanese:'この住所までお願いします',              romaji:'kono juusho made onegai shimasu',       korean:'이 주소까지 부탁합니다',         tip:'住所(じゅうしょ) = 주소' },
  { id:'st_3',  japanese:'だいたいいくらぐらいですか',            romaji:'daitai ikura gurai desu ka',            korean:'대략 얼마 정도예요?',            tip:'乗る前(のるまえ)に確認 = 타기 전 확인' },
  { id:'st_4',  japanese:'急いでください',                        romaji:'isoide kudasai',                        korean:'서둘러 주세요',                  tip:'飛行機に間に合わない = 비행기 놓칠 것 같아요' },
  { id:'st_5',  japanese:'ここで降ろしてください',                romaji:'koko de oroshite kudasai',              korean:'여기서 내려 주세요',             tip:'次の角で(つぎのかどで) = 다음 모퉁이에서' },
  { id:'st_6',  japanese:'トランクを開けてください',              romaji:'toranku o akete kudasai',               korean:'트렁크 열어 주세요',             tip:'大きい荷物がある = 큰 짐이 있어요' },
  { id:'st_7',  japanese:'領収書をください',                      romaji:'ryoushuusho o kudasai',                 korean:'영수증 주세요',                  tip:'レシート도 같은 의미' },
  { id:'st_8',  japanese:'カードで支払えますか',                  romaji:'kaado de shiharaemasu ka',              korean:'카드로 결제 가능한가요?',        tip:'일본 택시는 카드 가능한 곳이 많음' },
  { id:'st_9',  japanese:'まっすぐ行ってください',                romaji:'massugu itte kudasai',                  korean:'직진해 주세요',                  tip:'右(みぎ) = 오른쪽, 左(ひだり) = 왼쪽' },
  { id:'st_10', japanese:'あそこで止めてください',                romaji:'asoko de tomete kudasai',               korean:'저기서 세워 주세요',             tip:'信号(しんごう)の前で = 신호등 앞에서' },

  // ── 버스 (sim_bus) — 10개 ──
  { id:'sb_1',  japanese:'このバスは〜に行きますか',              romaji:'kono basu wa ~ ni ikimasu ka',          korean:'이 버스 ~에 가나요?',            tip:'目的地(もくてきち) = 목적지' },
  { id:'sb_2',  japanese:'次の停留所で降ります',                  romaji:'tsugi no teiryuujo de orimasu',         korean:'다음 정류장에서 내릴게요',       tip:'降車ボタン(こうしゃボタン) = 하차 버튼' },
  { id:'sb_3',  japanese:'一日乗車券はありますか',                romaji:'ichinichi joushaken wa arimasu ka',     korean:'1일 승차권 있나요?',             tip:'お得(おとく) = 이득, 가성비' },
  { id:'sb_4',  japanese:'バス停はどこですか',                    romaji:'basutei wa doko desu ka',               korean:'버스 정류장 어디예요?',          tip:'近くの(ちかくの) = 근처의' },
  { id:'sb_5',  japanese:'何番のバスですか',                      romaji:'nanban no basu desu ka',                korean:'몇 번 버스예요?',                tip:'番(ばん) = 번호' },
  { id:'sb_6',  japanese:'整理券を取ってください',                romaji:'seiriken o totte kudasai',              korean:'정리권을 뽑아주세요',            tip:'후불 버스에서 번호표 같은 것' },
  { id:'sb_7',  japanese:'両替はできますか',                      romaji:'ryougae wa dekimasu ka',                korean:'환전/잔돈 교환 되나요?',         tip:'버스 안 양전기: 両替機(りょうがえき)' },
  { id:'sb_8',  japanese:'終点まで行きます',                      romaji:'shuuten made ikimasu',                  korean:'종점까지 갑니다',                tip:'終点(しゅうてん) = 종점' },
  { id:'sb_9',  japanese:'降りる時に払いますか',                  romaji:'oriru toki ni haraimasu ka',            korean:'내릴 때 내나요?',                tip:'前払い(まえばらい) = 선불' },
  { id:'sb_10', japanese:'このバスの時刻表はありますか',          romaji:'kono basu no jikokuhyou wa arimasu ka', korean:'이 버스 시간표 있나요?',          tip:'時刻表(じこくひょう) = 시간표' },

  // ── 지하철 (sim_subway) — 10개 ──
  { id:'sw_1',  japanese:'〜線はどこですか',                      romaji:'~ sen wa doko desu ka',                 korean:'~호선은 어디예요?',              tip:'路線図(ろせんず) = 노선도' },
  { id:'sw_2',  japanese:'乗り換えはどこですか',                  romaji:'norikae wa doko desu ka',               korean:'환승은 어디서 하나요?',          tip:'乗り換え(のりかえ) = 환승' },
  { id:'sw_3',  japanese:'切符を買いたいです',                    romaji:'kippu o kaitai desu',                   korean:'표를 사고 싶어요',               tip:'券売機(けんばいき) = 자동판매기' },
  { id:'sw_4',  japanese:'ICカードにチャージしたいです',          romaji:'ai shii kaado ni chaaji shitai desu',   korean:'IC카드 충전하고 싶어요',         tip:'スイカ, パスモ = 일본 교통카드' },
  { id:'sw_5',  japanese:'この電車は〜に止まりますか',            romaji:'kono densha wa ~ ni tomarimasu ka',     korean:'이 전철 ~에 서나요?',            tip:'快速(かいそく) = 쾌속 (일부역 통과)' },
  { id:'sw_6',  japanese:'急行と各停、どちらが早いですか',        romaji:'kyuukou to kakutei, dochira ga hayai desu ka', korean:'급행과 각역정차, 어느 게 빨라요?', tip:'急行(きゅうこう) = 급행' },
  { id:'sw_7',  japanese:'出口はどちらですか',                    romaji:'deguchi wa dochira desu ka',            korean:'출구는 어느 쪽인가요?',          tip:'北口(きたぐち)·南口(みなみぐち) 등' },
  { id:'sw_8',  japanese:'終電は何時ですか',                      romaji:'shuuden wa nanji desu ka',              korean:'막차가 몇 시예요?',              tip:'始発(しはつ) = 첫차' },
  { id:'sw_9',  japanese:'ホームはどこですか',                    romaji:'hoomu wa doko desu ka',                 korean:'플랫폼은 어디예요?',             tip:'番線(ばんせん) = ~번 플랫폼' },
  { id:'sw_10', japanese:'反対方向に乗ってしまいました',          romaji:'hantai houkou ni notte shimaimashita',  korean:'반대 방향으로 타버렸어요',       tip:'戻る(もどる) = 되돌아가다' },

  // ── 엘리베이터 (sim_elevator) — 8개 ──
  { id:'se_1',  japanese:'何階ですか',                            romaji:'nankai desu ka',                        korean:'몇 층이에요?',                   tip:'階(かい/がい) = 층' },
  { id:'se_2',  japanese:'開けてください',                        romaji:'akete kudasai',                         korean:'(문) 열어 주세요',               tip:'開(ひらく) = 열다' },
  { id:'se_3',  japanese:'閉めないでください',                    romaji:'shimenaide kudasai',                    korean:'닫지 마세요',                    tip:'ちょっと待って! = 잠깐만요!' },
  { id:'se_4',  japanese:'地下一階をお願いします',                romaji:'chika ikkai o onegai shimasu',          korean:'지하 1층 부탁합니다',            tip:'地下(ちか) = 지하, B1F' },
  { id:'se_5',  japanese:'屋上はありますか',                      romaji:'okujou wa arimasu ka',                  korean:'옥상 있나요?',                   tip:'展望台(てんぼうだい) = 전망대' },
  { id:'se_6',  japanese:'エスカレーターはどこですか',            romaji:'esukareetaa wa doko desu ka',           korean:'에스컬레이터 어디예요?',         tip:'階段(かいだん) = 계단' },
  { id:'se_7',  japanese:'上に行きます',                          romaji:'ue ni ikimasu',                         korean:'위로 올라갑니다',                tip:'下(した) = 아래' },
  { id:'se_8',  japanese:'すみません、降ります',                  romaji:'sumimasen, orimasu',                    korean:'실례합니다, 내립니다',           tip:'엘리베이터에서 내릴 때' },

  // ════════════════════════════════════
  //  [8단계] 실전 시뮬레이션 ② — 호텔·전화·편의점 등
  // ════════════════════════════════════

  // ── 룸서비스 (sim_roomservice) — 8개 ──
  { id:'sr_1',  japanese:'ルームサービスをお願いします',          romaji:'ruumu saabisu o onegai shimasu',         korean:'룸서비스 부탁합니다',            tip:'メニューを見せてください = 메뉴 보여주세요' },
  { id:'sr_2',  japanese:'部屋まで届けてください',                romaji:'heya made todokete kudasai',             korean:'방까지 배달해 주세요',           tip:'部屋番号(へやばんごう) = 방 번호' },
  { id:'sr_3',  japanese:'タオルを持ってきてください',            romaji:'taoru o motte kite kudasai',             korean:'수건 가져다 주세요',             tip:'枕(まくら) = 베개, 毛布(もうふ) = 담요' },
  { id:'sr_4',  japanese:'氷をお願いします',                      romaji:'koori o onegai shimasu',                 korean:'얼음 부탁합니다',                tip:'アイスペール = 얼음통' },
  { id:'sr_5',  japanese:'朝食は何時からですか',                  romaji:'choushoku wa nanji kara desu ka',        korean:'조식은 몇 시부터예요?',          tip:'朝食(ちょうしょく) = 조식' },
  { id:'sr_6',  japanese:'エアコンが効きません',                  romaji:'eakon ga kikimasen',                     korean:'에어컨이 안 돼요',               tip:'暖房(だんぼう) = 난방, 冷房(れいぼう) = 냉방' },
  { id:'sr_7',  japanese:'お湯が出ません',                        romaji:'oyu ga demasen',                         korean:'뜨거운 물이 안 나와요',          tip:'水(みず)が出ない = 물이 안 나와요' },
  { id:'sr_8',  japanese:'Wi-Fiのパスワードは何ですか',           romaji:'waifai no pasuwaado wa nan desu ka',     korean:'와이파이 비밀번호 뭐예요?',      tip:'接続(せつぞく) = 연결' },

  // ── 전화 (sim_phone) — 8개 ──
  { id:'sph_1', japanese:'もしもし',                              romaji:'moshi moshi',                            korean:'여보세요',                       tip:'전화 받을 때/걸 때 첫마디' },
  { id:'sph_2', japanese:'もう一度お願いします',                  romaji:'mou ichido onegai shimasu',              korean:'한 번 더 말씀해 주세요',         tip:'ゆっくり話してください = 천천히 말해주세요' },
  { id:'sph_3', japanese:'日本語があまり話せません',              romaji:'nihongo ga amari hanasemasen',           korean:'일본어를 잘 못해요',             tip:'英語は大丈夫ですか = 영어 괜찮으세요?' },
  { id:'sph_4', japanese:'予約をしたいのですが',                  romaji:'yoyaku o shitai no desu ga',             korean:'예약을 하고 싶은데요',           tip:'何名様ですか = 몇 분이세요?' },
  { id:'sph_5', japanese:'キャンセルしたいのですが',              romaji:'kyanseru shitai no desu ga',             korean:'취소하고 싶은데요',              tip:'変更(へんこう) = 변경' },
  { id:'sph_6', japanese:'電話番号を教えてください',              romaji:'denwa bangou o oshiete kudasai',         korean:'전화번호 알려주세요',            tip:'番号(ばんごう) = 번호' },
  { id:'sph_7', japanese:'少々お待ちください',                    romaji:'shoushou omachi kudasai',                korean:'잠시만 기다려 주세요',           tip:'상대방이 말하는 표현 (이해용)' },
  { id:'sph_8', japanese:'また電話します',                        romaji:'mata denwa shimasu',                     korean:'다시 전화할게요',                tip:'後で(あとで) = 나중에' },

  // ── 체크인 (sim_checkin) — 10개 ──
  { id:'sci_1',  japanese:'チェックインお願いします',              romaji:'chekku in onegai shimasu',               korean:'체크인 부탁합니다' },
  { id:'sci_2',  japanese:'予約した〜です',                        romaji:'yoyaku shita ~ desu',                    korean:'예약한 ~입니다',                 tip:'名前(なまえ) = 이름' },
  { id:'sci_3',  japanese:'パスポートはこちらです',                romaji:'pasupooto wa kochira desu',              korean:'여권 여기 있습니다' },
  { id:'sci_4',  japanese:'禁煙の部屋でお願いします',              romaji:'kinen no heya de onegai shimasu',        korean:'금연 방으로 부탁합니다',         tip:'喫煙(きつえん) = 흡연' },
  { id:'sci_5',  japanese:'もう少し上の階がいいのですが',          romaji:'mou sukoshi ue no kai ga ii no desu ga', korean:'좀 더 높은 층이면 좋겠는데요',   tip:'静かな部屋 = 조용한 방' },
  { id:'sci_6',  japanese:'朝食は付いていますか',                  romaji:'choushoku wa tsuite imasu ka',           korean:'조식 포함인가요?',               tip:'別料金(べつりょうきん) = 별도 요금' },
  { id:'sci_7',  japanese:'何時まで開いていますか',                romaji:'nanji made aite imasu ka',               korean:'몇 시까지 열려 있나요?',         tip:'フロント, 大浴場 등에 대해' },
  { id:'sci_8',  japanese:'荷物を先に預けられますか',              romaji:'nimotsu o saki ni azukeraremasu ka',     korean:'짐을 먼저 맡길 수 있나요?',      tip:'チェックイン前(まえ)に = 체크인 전에' },
  { id:'sci_9',  japanese:'近くにコンビニはありますか',            romaji:'chikaku ni konbini wa arimasu ka',       korean:'근처에 편의점 있나요?' },
  { id:'sci_10', japanese:'部屋の鍵をもらえますか',                romaji:'heya no kagi o moraemasu ka',            korean:'방 열쇠 받을 수 있나요?',        tip:'カードキー = 카드키' },

  // ── 체크아웃 (sim_checkout) — 8개 ──
  { id:'sco_1', japanese:'チェックアウトお願いします',             romaji:'chekku auto onegai shimasu',             korean:'체크아웃 부탁합니다' },
  { id:'sco_2', japanese:'荷物を預かってもらえますか',             romaji:'nimotsu o azukatte moraemasu ka',        korean:'짐 좀 맡아주실 수 있나요?',      tip:'ロッカー = 사물함(코인락커)' },
  { id:'sco_3', japanese:'レイトチェックアウトはできますか',       romaji:'reito chekku auto wa dekimasu ka',       korean:'늦은 체크아웃 가능한가요?',      tip:'追加料金(ついかりょうきん) = 추가 요금' },
  { id:'sco_4', japanese:'タクシーを呼んでいただけますか',         romaji:'takushii o yonde itadakemasu ka',        korean:'택시 불러주실 수 있나요?' },
  { id:'sco_5', japanese:'明細書をください',                       romaji:'meisaisho o kudasai',                    korean:'명세서 주세요',                  tip:'領収書(りょうしゅうしょ) = 영수증' },
  { id:'sco_6', japanese:'忘れ物をしました',                       romaji:'wasuremono o shimashita',                korean:'잊어버린 물건이 있어요',         tip:'部屋に忘れた = 방에 두고 왔어요' },
  { id:'sco_7', japanese:'空港までどのくらいかかりますか',         romaji:'kuukou made dono kurai kakarimasu ka',   korean:'공항까지 얼마나 걸려요?',        tip:'時間(じかん)と料金(りょうきん)' },
  { id:'sco_8', japanese:'楽しかったです、ありがとうございます',   romaji:'tanoshikatta desu, arigatou gozaimasu',  korean:'즐거웠어요, 감사합니다',         tip:'감사 인사로 마무리!' },

  // ── 화장실 (sim_toilet) — 8개 ──
  { id:'stl_1', japanese:'トイレはどこですか',                    romaji:'toire wa doko desu ka',                  korean:'화장실 어디예요?',               tip:'お手洗い(おてあらい) = 정중한 표현' },
  { id:'stl_2', japanese:'お手洗いをお借りできますか',            romaji:'otearai o okari dekimasu ka',             korean:'화장실 좀 빌릴 수 있나요?',      tip:'가게에서 정중하게 물을 때' },
  { id:'stl_3', japanese:'多目的トイレはありますか',              romaji:'tamokuteki toire wa arimasu ka',          korean:'다목적 화장실 있나요?',          tip:'車いす(くるまいす) = 휠체어' },
  { id:'stl_4', japanese:'トイレットペーパーがありません',        romaji:'toiretto peepaa ga arimasen',             korean:'화장지가 없어요',                tip:'직원에게 알릴 때' },
  { id:'stl_5', japanese:'水が流れません',                        romaji:'mizu ga nagaremasen',                     korean:'물이 안 내려가요',               tip:'故障(こしょう) = 고장' },
  { id:'stl_6', japanese:'ウォシュレットの使い方がわかりません',  romaji:'woshuretto no tsukaikata ga wakarimasen', korean:'비데 사용법을 모르겠어요',       tip:'止(と)める = 멈추다' },
  { id:'stl_7', japanese:'女性用はどちらですか',                  romaji:'josei you wa dochira desu ka',            korean:'여성용은 어느 쪽인가요?',        tip:'男性用(だんせいよう) = 남성용' },
  { id:'stl_8', japanese:'並んでいますか',                        romaji:'narande imasu ka',                        korean:'줄 서 있는 건가요?',             tip:'列(れつ) = 줄' },

  // ── 흡연/담배 (sim_smoking) — 8개 ──
  { id:'smk_1', japanese:'喫煙所はどこですか',                    romaji:'kitsuenjo wa doko desu ka',               korean:'흡연실 어디예요?',               tip:'喫煙所(きつえんじょ) = 흡연 장소' },
  { id:'smk_2', japanese:'ここで吸ってもいいですか',              romaji:'koko de sutte mo ii desu ka',             korean:'여기서 피워도 되나요?',          tip:'禁煙(きんえん) = 금연' },
  { id:'smk_3', japanese:'タバコをください',                      romaji:'tabako o kudasai',                        korean:'담배 주세요',                    tip:'편의점 카운터 뒤에 있음' },
  { id:'smk_4', japanese:'ライターはありますか',                  romaji:'raitaa wa arimasu ka',                    korean:'라이터 있나요?',                 tip:'マッチ = 성냥' },
  { id:'smk_5', japanese:'灰皿はありますか',                      romaji:'haizara wa arimasu ka',                   korean:'재떨이 있나요?',                 tip:'灰皿(はいざら) = 재떨이' },
  { id:'smk_6', japanese:'喫煙席はありますか',                    romaji:'kitsuen seki wa arimasu ka',              korean:'흡연석 있나요?',                 tip:'식당에서 물을 때' },
  { id:'smk_7', japanese:'加熱式タバコは使えますか',              romaji:'kanetsu shiki tabako wa tsukaemasu ka',   korean:'전자담배 사용 가능한가요?',      tip:'アイコス(IQOS) 등' },
  { id:'smk_8', japanese:'外で吸ってきます',                      romaji:'soto de sutte kimasu',                    korean:'밖에서 피우고 올게요',           tip:'ちょっと出てきます = 잠깐 나갔다 올게요' },

  // ── 편의점 (sim_conveni) — 10개 ──
  { id:'scv_1',  japanese:'温めてください',                        romaji:'atatamete kudasai',                      korean:'데워 주세요',                    tip:'お弁当(おべんとう) = 도시락' },
  { id:'scv_2',  japanese:'袋はいりません',                        romaji:'fukuro wa irimasen',                     korean:'봉투 필요 없어요',               tip:'エコバッグ = 에코백' },
  { id:'scv_3',  japanese:'お箸をください',                        romaji:'ohashi o kudasai',                       korean:'젓가락 주세요',                  tip:'フォーク = 포크, スプーン = 숟가락' },
  { id:'scv_4',  japanese:'ATMはどこですか',                       romaji:'eitiemu wa doko desu ka',                korean:'ATM 어디예요?',                  tip:'일본 편의점 ATM은 해외카드 사용 가능' },
  { id:'scv_5',  japanese:'チケットの支払いをしたいです',          romaji:'chiketto no shiharai o shitai desu',     korean:'티켓 결제를 하고 싶어요',        tip:'콘서트·이벤트 티켓 결제' },
  { id:'scv_6',  japanese:'コピーをしたいです',                    romaji:'kopii o shitai desu',                    korean:'복사를 하고 싶어요',             tip:'マルチコピー機 = 복합기' },
  { id:'scv_7',  japanese:'宅配便を送りたいです',                  romaji:'takuhaibin o okuritai desu',             korean:'택배를 보내고 싶어요',           tip:'ヤマト運輸, 佐川急便 = 일본 택배사' },
  { id:'scv_8',  japanese:'トイレを借りてもいいですか',            romaji:'toire o karite mo ii desu ka',           korean:'화장실 빌려도 되나요?',          tip:'편의점 화장실은 대부분 사용 가능' },
  { id:'scv_9',  japanese:'ポイントカードはお持ちですか',          romaji:'pointo kaado wa omochi desu ka',         korean:'포인트 카드 가지고 계세요?',     tip:'점원이 묻는 표현 (이해용). ないです = 없어요' },
  { id:'scv_10', japanese:'これは何味ですか',                      romaji:'kore wa nani aji desu ka',               korean:'이거 무슨 맛이에요?',            tip:'甘い(あまい)=달다, 辛い(からい)=맵다' },
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
  },
  {
    id: 'small_talk',
    phase: 6,
    name: '스몰토크',
    title: '스몰토크 (スモールトーク)',
    subtitle: '날씨·취미·감정·일상 대화',
    desc: '친구를 사귀는 첫걸음! 자연스러운 일상 대화 표현',
    icon: '💬',
    items: ['st_hisashiburi','st_ogenki','st_tenki','st_atsui','st_samui','st_shumi','st_suki','st_tanoshii','st_sugoi','st_taihen','st_mata','st_omedetou','st_issho','st_nani','st_yoroshiku']
  },
  {
    id: 'hotel_stay',
    phase: 6,
    name: '호텔 숙박',
    title: '호텔·숙박 표현',
    subtitle: 'チェックイン·ルームサービス',
    desc: '호텔 체크인부터 연장까지 — 숙박 필수 표현',
    icon: '🏨',
    items: ['ht_checkin','ht_checkout','ht_yoyaku','ht_goushitsu','ht_choshoku','ht_kagi','ht_taoru','ht_moningcall','ht_room','ht_elevator','ht_laundry','ht_lobby','ht_extend']
  },
  {
    id: 'transport_detail',
    phase: 6,
    name: '교통 상세',
    title: '교통 상세 표현',
    subtitle: '新幹線·スイカ·乗り換え',
    desc: '신칸센·IC카드·환승까지 일본 교통 완전 정복',
    icon: '🚅',
    items: ['td_shink','td_jiyuuseki','td_suica','td_kippu','td_norikae','td_yuki','td_noriba','td_jikanhyo','td_maniau','td_taxi','td_teiryu','td_madogawa']
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
