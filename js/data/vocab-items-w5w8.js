// ============================================================
//  단어 항목 — W5(동사) / W6(형용사) / W7(명사) / W8(신체)
// ============================================================
const VOCAB_ITEMS_W5W8 = [

  // ── W5: 기본 동사 I (verbs_daily) ───────────────────────
  { id:'vb1_1',  japanese:'たべる', kanji:'食べる', romaji:'taberu',  korean:'먹다',          tip:'「二人で何食べようか？」' },
  { id:'vb1_2',  japanese:'のむ',   kanji:'飲む',   romaji:'nomu',    korean:'마시다',        tip:'「ビール飲む？」「うん、飲む！」' },
  { id:'vb1_3',  japanese:'ねる',   kanji:'寝る',   romaji:'neru',    korean:'자다',          tip:'「もう寝ようか」호텔에서 부부 대화' },
  { id:'vb1_4',  japanese:'おきる', kanji:'起きる', romaji:'okiru',   korean:'일어나다',      tip:'「何時に起きる？」' },
  { id:'vb1_5',  japanese:'いく',   kanji:'行く',   romaji:'iku',     korean:'가다',          tip:'「次、渋谷に行こう！」' },
  { id:'vb1_6',  japanese:'くる',   kanji:'来る',   romaji:'kuru',    korean:'오다',          tip:'「どこから来ましたか？」현지인이 묻는 말' },
  { id:'vb1_7',  japanese:'みる',   kanji:'見る',   romaji:'miru',    korean:'보다',          tip:'「あれ見て！すごいね！」' },
  { id:'vb1_8',  japanese:'きく',   kanji:'聞く',   romaji:'kiku',    korean:'듣다/묻다',    tip:'「店員さんに聞こう」모를 땐 물어보기' },
  { id:'vb1_9',  japanese:'あそぶ', kanji:'遊ぶ',   romaji:'asobu',   korean:'놀다',          tip:'「明日、どこで遊ぶ？」' },
  { id:'vb1_10', japanese:'する',                   romaji:'suru',    korean:'하다',          tip:'「何する？」「買い物する！」범용 동사' },
  { id:'vb1_11', japanese:'ある',                   romaji:'aru',     korean:'있다 (사물)',   tip:'「近くにコンビニある？」' },
  { id:'vb1_12', japanese:'いる',                   romaji:'iru',     korean:'있다 (사람·동물)', tip:'「駅員さん、いる？」' },

  // ── W5: 기본 동사 II (verbs_activity) ───────────────────
  { id:'vb2_1',  japanese:'よむ',   kanji:'読む',   romaji:'yomu',    korean:'읽다',          tip:'「このメニュー、読める？」' },
  { id:'vb2_2',  japanese:'かく',   kanji:'書く',   romaji:'kaku',    korean:'쓰다',          tip:'「名前を書いてください」' },
  { id:'vb2_3',  japanese:'はなす', kanji:'話す',   romaji:'hanasu',  korean:'말하다',        tip:'「ゆっくり話してください」' },
  { id:'vb2_4',  japanese:'かう',   kanji:'買う',   romaji:'kau',     korean:'사다',          tip:'「これ買う？どうする？」' },
  { id:'vb2_5',  japanese:'あるく', kanji:'歩く',   romaji:'aruku',   korean:'걷다',          tip:'「歩いて行ける？近い？」' },
  { id:'vb2_6',  japanese:'はしる', kanji:'走る',   romaji:'hashiru', korean:'달리다',        tip:'「走って！電車来るよ！」' },
  { id:'vb2_7',  japanese:'わらう', kanji:'笑う',   romaji:'warau',   korean:'웃다',          tip:'「なんで笑ってるの？」' },
  { id:'vb2_8',  japanese:'なく',   kanji:'泣く',   romaji:'naku',    korean:'울다',          tip:'「感動して泣いちゃった…」여행의 감동' },
  { id:'vb2_9',  japanese:'あらう', kanji:'洗う',   romaji:'arau',    korean:'씻다',          tip:'「手を洗ってきます」식사 전' },
  { id:'vb2_10', japanese:'つかう', kanji:'使う',   romaji:'tsukau',  korean:'쓰다/사용하다', tip:'「Suicaが使える？ここ」' },

  // ── W6: 형용사 I 상태·감각 (adj_physical) ───────────────
  { id:'adj1_1',  japanese:'あつい',   kanji:'暑い',   romaji:'atsui',     korean:'덥다 (날씨)',   tip:'「今日、暑い！アイス食べたい！」' },
  { id:'adj1_2',  japanese:'さむい',   kanji:'寒い',   romaji:'samui',     korean:'춥다',          tip:'「寒い！コートどこ？」' },
  { id:'adj1_3',  japanese:'あつい',   kanji:'熱い',   romaji:'atsui',     korean:'뜨겁다 (음식)', tip:'暑い(날씨)와 구별! 「スープ、熱いから気をつけて」' },
  { id:'adj1_4',  japanese:'つめたい', kanji:'冷たい', romaji:'tsumetai',  korean:'차갑다',        tip:'「このビール、冷たくて最高！」' },
  { id:'adj1_5',  japanese:'たかい',   kanji:'高い',   romaji:'takai',     korean:'비싸다·높다',   tip:'「これ高い…やめとこう」' },
  { id:'adj1_6',  japanese:'やすい',   kanji:'安い',   romaji:'yasui',     korean:'싸다',          tip:'「安い！買っちゃおう！」' },
  { id:'adj1_7',  japanese:'おおきい', kanji:'大きい', romaji:'ookii',     korean:'크다',          tip:'「大きいサイズある？」' },
  { id:'adj1_8',  japanese:'ちいさい', kanji:'小さい', romaji:'chiisai',   korean:'작다',          tip:'「ちょっと小さいかな…」' },
  { id:'adj1_9',  japanese:'からい',   kanji:'辛い',   romaji:'karai',     korean:'맵다',          tip:'「辛い！水ちょうだい！」' },
  { id:'adj1_10', japanese:'あまい',   kanji:'甘い',   romaji:'amai',      korean:'달다',          tip:'「甘い！これ好き！」' },
  { id:'adj1_11', japanese:'おもい',   kanji:'重い',   romaji:'omoi',      korean:'무겁다',        tip:'「荷物、重い…タクシーにしよう」' },
  { id:'adj1_12', japanese:'かるい',   kanji:'軽い',   romaji:'karui',     korean:'가볍다',        tip:'「これ、軽くて持ちやすい」' },

  // ── W6: 형용사 II 감정 (adj_emotion) ────────────────────
  { id:'adj2_1',  japanese:'うれしい',        kanji:'嬉しい',       romaji:'ureshii',   korean:'기쁘다',      tip:'「来れてうれしい！念願の日本！」' },
  { id:'adj2_2',  japanese:'かなしい',        kanji:'悲しい',       romaji:'kanashii',  korean:'슬프다',      tip:'「もう帰るの、悲しいね」' },
  { id:'adj2_3',  japanese:'たのしい',        kanji:'楽しい',       romaji:'tanoshii',  korean:'즐겁다',      tip:'「楽しいね！また来ようね」' },
  { id:'adj2_4',  japanese:'こわい',          kanji:'怖い',         romaji:'kowai',     korean:'무섭다',      tip:'「迷子になったら怖い…」' },
  { id:'adj2_5',  japanese:'ねむい',          kanji:'眠い',         romaji:'nemui',     korean:'졸리다',      tip:'「眠い…カフェ寄っていい？」' },
  { id:'adj2_6',  japanese:'おなかがすいた',  kanji:'お腹が空いた', romaji:'onaka ga suita', korean:'배고프다', tip:'「お腹空いた！何食べる？」' },
  { id:'adj2_7',  japanese:'つかれた',        kanji:'疲れた',       romaji:'tsukareta', korean:'피곤하다',    tip:'「疲れた！ちょっと休もう」' },
  { id:'adj2_8',  japanese:'すき',            kanji:'好き',         romaji:'suki',      korean:'좋아하다',    tip:'「この街、大好き！」' },
  { id:'adj2_9',  japanese:'きらい',          kanji:'嫌い',         romaji:'kirai',     korean:'싫다',        tip:'「納豆は嫌い…ごめんね」' },
  { id:'adj2_10', japanese:'いたい',          kanji:'痛い',         romaji:'itai',      korean:'아프다',      tip:'「足が痛い…靴買おうか」' },

  // ── W6: N5 핵심 형용사 (adjectives_n5) ──────────────────
  { id:'adj_oishi',   japanese:'おいしい',  kanji:'美味しい', romaji:'oishii',  korean:'맛있다',       tip:'食べ物の最高の褒め言葉' },
  { id:'adj_karai',   japanese:'からい',    kanji:'辛い',     romaji:'karai',   korean:'맵다',         example:'からくないですか = 맵지 않나요?' },
  { id:'adj_amai',    japanese:'あまい',    kanji:'甘い',     romaji:'amai',    korean:'달다' },
  { id:'adj_takai',   japanese:'たかい',    kanji:'高い',     romaji:'takai',   korean:'비싸다 / 높다' },
  { id:'adj_yasui',   japanese:'やすい',    kanji:'安い',     romaji:'yasui',   korean:'싸다 / 저렴하다' },
  { id:'adj_okii',    japanese:'おおきい',  kanji:'大きい',   romaji:'ookii',   korean:'크다' },
  { id:'adj_chiisai', japanese:'ちいさい',  kanji:'小さい',   romaji:'chiisai', korean:'작다' },
  { id:'adj_kawaii',  japanese:'かわいい',  kanji:'可愛い',   romaji:'kawaii',  korean:'귀엽다',        tip:'쇼핑할 때 가장 많이 쓰는 형용사' },
  { id:'adj_ii',      japanese:'いい',                        romaji:'ii',      korean:'좋다',         example:'いい！ = 좋아요!' },
  { id:'adj_dame',    japanese:'だめ',      kanji:'駄目',     romaji:'dame',    korean:'안 된다 / 불가', tip:'だめですか = 안 되나요?' },

  // ── W7: 장소·교통 명사 (place_transport) ────────────────
  { id:'tr_eki',      japanese:'えき',      kanji:'駅',    romaji:'eki',       korean:'역 (전철/기차역)' },
  { id:'tr_bus',      japanese:'バス',                     romaji:'basu',      korean:'버스' },
  { id:'tr_taxi',     japanese:'タクシー',                 romaji:'takushii',  korean:'택시' },
  { id:'tr_densha',   japanese:'でんしゃ',  kanji:'電車',  romaji:'densha',    korean:'전철 / 기차' },
  { id:'tr_shink',    japanese:'しんかんせん', kanji:'新幹線', romaji:'shinkansen', korean:'신칸센 (고속열차)' },
  { id:'tr_airport',  japanese:'くうこう',  kanji:'空港',  romaji:'kuukou',    korean:'공항' },
  { id:'tr_hotel',    japanese:'ホテル',                   romaji:'hoteru',    korean:'호텔' },
  { id:'tr_ryokan',   japanese:'りょかん',  kanji:'旅館',  romaji:'ryokan',    korean:'료칸 (일본 여관)' },
  { id:'tr_konbini',  japanese:'コンビニ',                 romaji:'konbini',   korean:'편의점',        tip:'일본 편의점은 거의 모든 걸 해결 가능!' },
  { id:'tr_toilet',   japanese:'トイレ',                   romaji:'toire',     korean:'화장실' },
  { id:'tr_exit',     japanese:'でぐち',    kanji:'出口',  romaji:'deguchi',   korean:'출구' },
  { id:'tr_enter',    japanese:'いりぐち',  kanji:'入口',  romaji:'iriguchi',  korean:'입구' },
  { id:'tr_right',    japanese:'みぎ',      kanji:'右',    romaji:'migi',      korean:'오른쪽' },
  { id:'tr_left',     japanese:'ひだり',    kanji:'左',    romaji:'hidari',    korean:'왼쪽' },
  { id:'tr_straight', japanese:'まっすぐ',                 romaji:'massugu',   korean:'직진 / 곧장' },

  // ── W7: 음식·음료 명사 (food_nouns) ─────────────────────
  { id:'food_ramen',   japanese:'ラーメン',   romaji:'ramen',     korean:'라면',         tip:'일본식 라멘, 한국 라면과 다름' },
  { id:'food_sushi',   japanese:'すし',       kanji:'寿司',   romaji:'sushi',     korean:'초밥' },
  { id:'food_tempura', japanese:'てんぷら',   kanji:'天ぷら', romaji:'tenpura',   korean:'튀김 (텐푸라)' },
  { id:'food_udon',    japanese:'うどん',                     romaji:'udon',      korean:'우동' },
  { id:'food_soba',    japanese:'そば',                       romaji:'soba',      korean:'소바 (메밀국수)' },
  { id:'food_onigiri', japanese:'おにぎり',                   romaji:'onigiri',   korean:'주먹밥' },
  { id:'food_miso',    japanese:'みそしる',   kanji:'味噌汁', romaji:'misoshiru', korean:'된장국' },
  { id:'food_sake',    japanese:'さけ・おさけ', kanji:'酒',  romaji:'sake',      korean:'술 (일본주)', tip:'お酒 = 정중한 표현' },
  { id:'food_biru',    japanese:'ビール',                     romaji:'biiru',     korean:'맥주' },
  { id:'food_mizu',    japanese:'みず',       kanji:'水',    romaji:'mizu',      korean:'물',           example:'おみず、おねがいします = 물 주세요' },
  { id:'food_ocha',    japanese:'おちゃ',     kanji:'お茶',  romaji:'ocha',      korean:'차 (녹차)',    tip:'무료 제공 식당 많음' },
  { id:'food_menu',    japanese:'メニュー',                   romaji:'menyu',     korean:'메뉴',         example:'メニューをください = 메뉴 주세요' },
  { id:'food_teishoku',japanese:'ていしょく', kanji:'定食',  romaji:'teishoku',  korean:'정식 (세트 메뉴)' },
  { id:'food_ikura',   japanese:'いくら',                     romaji:'ikura',     korean:'얼마 / 이크라(연어알)', tip:'いくらですか = 얼마예요?' },
  { id:'food_okane',   japanese:'おかいけい', kanji:'お会計', romaji:'okaikei',  korean:'계산서', example:'おかいけい、おねがいします' },

  // ── W8: 신체·건강 (body_health) ──────────────────────────
  { id:'bh_atama',  japanese:'あたま',    kanji:'頭',    romaji:'atama',    korean:'머리',         tip:'あたまがいたい = 머리가 아파요' },
  { id:'bh_me',     japanese:'め',        kanji:'目',    romaji:'me',       korean:'눈' },
  { id:'bh_hana',   japanese:'はな',      kanji:'鼻',    romaji:'hana',     korean:'코' },
  { id:'bh_kuchi',  japanese:'くち',      kanji:'口',    romaji:'kuchi',    korean:'입' },
  { id:'bh_te',     japanese:'て',        kanji:'手',    romaji:'te',       korean:'손',           tip:'てをあらう = 손을 씻다' },
  { id:'bh_ashi',   japanese:'あし',      kanji:'足',    romaji:'ashi',     korean:'발·다리' },
  { id:'bh_onaka',  japanese:'おなか',    kanji:'お腹',  romaji:'onaka',    korean:'배 (복부)',    tip:'おなかがいたい = 배가 아파요' },
  { id:'bh_karada', japanese:'からだ',    kanji:'体',    romaji:'karada',   korean:'몸·신체' },
  { id:'bh_byoki',  japanese:'びょうき',  kanji:'病気',  romaji:'byouki',   korean:'병·아픔',      tip:'びょうきです = 아파요' },
  { id:'bh_netsu',  japanese:'ねつ',      kanji:'熱',    romaji:'netsu',    korean:'열',           tip:'ねつがあります = 열이 있어요' },
  { id:'bh_itai',   japanese:'いたいです', kanji:'痛いです', romaji:'itai desu', korean:'아파요',  tip:'〜がいたいです = 〜가 아파요' },
  { id:'bh_kusuri', japanese:'くすり',    kanji:'薬',    romaji:'kusuri',   korean:'약',           tip:'くすりをください = 약 주세요' },
  { id:'bh_byoin',  japanese:'びょういん', kanji:'病院', romaji:'byouin',   korean:'병원',         tip:'びょういんにいきたいです = 병원에 가고 싶어요' },
  { id:'bh_kaze',   japanese:'かぜ',      kanji:'風邪',  romaji:'kaze',     korean:'감기',         tip:'かぜをひきました = 감기 걸렸어요' },

  // ── W5: 능력·가능 동사 (verbs_ability) ──────────────────
  { id:'vb3_1', japanese:'できる',   romaji:'dekiru',    korean:'할 수 있다',       tip:'「日本語できる？」「少しだけ！」범용 가능 표현' },
  { id:'vb3_2', japanese:'わかる',   romaji:'wakaru',    korean:'알다 / 이해하다',  tip:'「わかった！」「わからない…」いつでも使える' },
  { id:'vb3_3', japanese:'みえる',   kanji:'見える',    romaji:'mieru',     korean:'보이다',          tip:'「富士山が見えるよ！」자연스럽게 눈에 들어올 때' },
  { id:'vb3_4', japanese:'きこえる', kanji:'聞こえる',  romaji:'kikoeru',   korean:'들리다',          tip:'「聞こえる？もう少し大きく話して」' },
  { id:'vb3_5', japanese:'おわる',   kanji:'終わる',    romaji:'owaru',     korean:'끝나다',          tip:'「もう終わった？早い！」이벤트·식사·업무 모두 OK' },
  { id:'vb3_6', japanese:'はじまる', kanji:'始まる',    romaji:'hajimaru',  korean:'시작되다',        tip:'「ショーは何時に始まる？」' },

  // ── W7: 이자카야·식당 문화 (food_nouns 추가 어휘) ───────
  { id:'food_irashai',    japanese:'いらっしゃいませ',             romaji:'irasshaimase',      korean:'어서 오세요 (입장 인사)',  tip:'가게·식당 입장 시 직원이 하는 인사. 답하지 않아도 됨' },
  { id:'food_toriaezu',   japanese:'とりあえず',                   romaji:'toriaezu',           korean:'우선 / 일단 (먼저)',       example:'とりあえずビール = 일단 맥주 (이자카야 첫 주문)' },
  { id:'food_yakitori',   japanese:'やきとり',  kanji:'焼き鳥',    romaji:'yakitori',           korean:'야키토리 (닭꼬치)',        tip:'일본 이자카야 대표 안주' },
  { id:'food_moriawase',  japanese:'もりあわせ', kanji:'盛り合わせ', romaji:'moriawase',         korean:'모둠 / 모듬 세트',        example:'焼き鳥の盛り合わせ = 야키토리 모둠' },
  { id:'food_otsumami',   japanese:'おつまみ',                     romaji:'otsumami',           korean:'안주 (술과 함께 먹는)',    tip:'이자카야에서 음료와 함께 주문' },
  { id:'food_edamame',    japanese:'えだまめ',   kanji:'枝豆',      romaji:'edamame',            korean:'에다마메 (풋콩)',          tip:'이자카야 기본 안주. 소금에 삶은 풋콩' },
  { id:'food_izakaya',    japanese:'いざかや',   kanji:'居酒屋',    romaji:'izakaya',            korean:'이자카야 (일본식 술집)',   tip:'식사·음주 겸용. 일본 밤문화 핵심 장소' },

  // ── W7: 공항·여행 교통 어휘 (place_transport 추가 어휘) ─
  { id:'tr_gate',         japanese:'とうじょうぐち', kanji:'搭乗口',    romaji:'toujouriguchi',  korean:'탑승 게이트',             example:'34番ゲート = 34번 게이트' },
  { id:'tr_zeikan',       japanese:'ぜいかん',    kanji:'税関',       romaji:'zeikan',           korean:'세관',                    tip:'입국 시 짐 검사. 신고 물품 있으면 申告 필요' },
  { id:'tr_nyukoku',      japanese:'にゅうこくしんさ', kanji:'入国審査', romaji:'nyuukoku shinsa', korean:'입국 심사',              tip:'パスポートを見せてください = 여권 보여주세요' },
  { id:'tr_tenimotsu',    japanese:'てにもつ',    kanji:'手荷物',     romaji:'tenimotsu',        korean:'기내 수하물 / 휴대 짐',   tip:'機内持ち込み(きないもちこみ) = 기내 반입' },
  { id:'tr_ryougae',      japanese:'りょうがえ',  kanji:'両替',       romaji:'ryougae',          korean:'환전',                    example:'両替はどこですか = 환전은 어디서 해요?' },
  { id:'tr_shuppatsu',    japanese:'しゅっぱつ',  kanji:'出発',       romaji:'shuppatsu',        korean:'출발',                    tip:'出発ロビー = 출발 로비, 到着ロビー = 도착 로비' },
  { id:'tr_touchaku',     japanese:'とうちゃく',  kanji:'到着',       romaji:'touchaku',         korean:'도착',                    example:'到着ロビー = 도착 로비' },

  // ── W7: 관광·쇼핑 장소 (place_sightseeing) ──────────────
  { id:'pl_depato',     japanese:'デパート',            romaji:'depaato',          korean:'백화점',        tip:'地下食品売り場(ちかしょくひんうりば) = 지하 식품관 필수 방문!' },
  { id:'pl_yakkyoku',   japanese:'やっきょく', kanji:'薬局', romaji:'yakkyoku', korean:'약국',          tip:'ドラッグストア도 OK — OTC약·화장품·과자도 판매' },
  { id:'pl_superr',     japanese:'スーパー',            romaji:'suupaa',           korean:'슈퍼마켓',      tip:'현지 식재료·반찬·도시락 쇼핑에 최적' },
  { id:'pl_jinja',      japanese:'じんじゃ',  kanji:'神社', romaji:'jinja',    korean:'신사',          tip:'お賽銭(さいせん) = 새전 던지기, 二礼二拍手一礼' },
  { id:'pl_otera',      japanese:'おてら',    kanji:'お寺', romaji:'otera',    korean:'절 (사원)',     tip:'神社(신사)와 달리 불교 사원. 좌선 체험도 가능' },
  { id:'pl_kouen',      japanese:'こうえん',  kanji:'公園', romaji:'kouen',    korean:'공원',          example:'こうえんでお花見 = 공원에서 꽃구경' },
  { id:'pl_omiyageten', japanese:'おみやげてん', kanji:'お土産店', romaji:'omiyage-ten', korean:'기념품 가게' },

  // ── W8: 의료·병원 (medical_care 추가 항목) ───────────────
  { id:'bh_isha',      japanese:'おいしゃさん', kanji:'お医者さん', romaji:'o-isha-san',     korean:'의사 선생님',      example:'おいしゃさんをよんでください = 의사를 불러주세요' },
  { id:'bh_kyuukyuu',  japanese:'きゅうきゅうしゃ', kanji:'救急車',  romaji:'kyuukyuusha', korean:'구급차 (앰뷸런스)', tip:'일본 긴급번호: 구급·화재 → 119, 경찰 → 110' },
];
