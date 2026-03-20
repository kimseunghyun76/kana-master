// ============================================================
//  문장 항목 — S1(인사·기본회화) ~ S5(식사·주문)
// ============================================================
const VOCAB_ITEMS_S1S5 = [

  // ── S1: 인사·기본 회화 (first_expressions) ──────────────
  { id:'s1_hajimemashite', japanese:'はじめまして',                      romaji:'hajimemashite',                     korean:'처음 뵙겠습니다',       tip:'첫 만남의 필수 인사말' },
  { id:'gr_modoichi',      japanese:'もう一度おねがいします',            kanji:'もう一度お願いします',                romaji:'mou ichido onegaishimasu', korean:'다시 한번 부탁드립니다' },
  { id:'gr_english',       japanese:'えいごはなせますか',               kanji:'英語話せますか',                      romaji:'eigo hanasemasu ka',       korean:'영어 하실 수 있어요?',  tip:'언어 장벽 돌파 비상용' },
  { id:'s1_yukkuri',       japanese:'ゆっくりはなしてください',          kanji:'ゆっくり話してください',              romaji:'yukkuri hanashite kudasai', korean:'천천히 말해주세요',     tip:'언어 장벽에서 가장 유용한 표현' },
  { id:'s1_chotto',        japanese:'ちょっとまってください',            kanji:'ちょっと待ってください',              romaji:'chotto matte kudasai',      korean:'잠깐 기다려주세요' },
  { id:'s1_sukoshi',       japanese:'にほんごがすこしわかります',        kanji:'日本語が少しわかります',              romaji:'nihongo ga sukoshi wakarimasu', korean:'일본어를 조금 알아요' },

  // ── S2: 자기소개 (self_intro) ────────────────────────────
  { id:'gr_kankoku',  japanese:'かんこくじんです',            kanji:'韓国人です',           romaji:'kankokujin desu',              korean:'한국인입니다' },
  { id:'gr_namae',    japanese:'〜と申します',                romaji:'~to moushimasu',       korean:'〜라고 합니다 (이름 소개)',     tip:'丁寧な自己紹介' },
  { id:'si_kara',     japanese:'〜からきました',              kanji:'〜から来ました',        romaji:'~kara kimashita',              korean:'〜에서 왔어요',        tip:'かんこくからきました = 한국에서 왔어요' },
  { id:'si_sai',      japanese:'〜さいです',                  kanji:'〜歳です',              romaji:'~sai desu',                    korean:'〜살이에요',           tip:'にじゅうさいです = 20살이에요' },
  { id:'si_shigoto',  japanese:'〜のしごとをしています',      kanji:'〜の仕事をしています',  romaji:'~no shigoto wo shite imasu',   korean:'〜 일을 하고 있어요',  tip:'がくせいです = 학생이에요' },
  { id:'si_travel',   japanese:'りょこうできました',          kanji:'旅行で来ました',        romaji:'ryokou de kimashita',          korean:'여행으로 왔어요' },
  { id:'si_nihongo',  japanese:'にほんごをべんきょうしています', kanji:'日本語を勉強しています', romaji:'nihongo wo benkyou shite imasu', korean:'일본어 공부 중이에요' },
  { id:'si_suki',     japanese:'〜がすきです',                kanji:'〜が好きです',          romaji:'~ga suki desu',                korean:'〜를 좋아해요',        tip:'アニメがすきです = 애니 좋아해요' },

  // ── S3: 기초 질문 패턴 (basic_questions) ────────────────
  { id:'q_nani',      japanese:'これはなんですか',    kanji:'これは何ですか',    romaji:'kore wa nan desu ka',        korean:'이게 뭐예요?',         tip:'메뉴·상품 이름 물을 때' },
  { id:'dir_doko',    japanese:'〜はどこですか',      romaji:'~wa doko desu ka', korean:'〜은 어디예요?',              tip:'〜에 장소를 넣으세요 (호텔、駅 등)' },
  { id:'dir_ikura',   japanese:'いくらですか',        romaji:'ikura desu ka',    korean:'얼마예요?',                   tip:'쇼핑·식당 필수 표현' },
  { id:'q_itsu',      japanese:'いつですか',          romaji:'itsu desu ka',     korean:'언제예요?',                   tip:'いつから = 언제부터, いつまで = 언제까지' },
  { id:'q_dare',      japanese:'〜はだれですか',      kanji:'〜は誰ですか',      romaji:'~wa dare desu ka',           korean:'〜은 누구예요?' },
  { id:'q_dore',      japanese:'どれがいいですか',    romaji:'dore ga ii desu ka', korean:'어떤 게 좋아요?',          tip:'どれ = 여러 개 중 어떤 것' },
  { id:'q_arimasu',   japanese:'〜はありますか',      romaji:'~wa arimasu ka',   korean:'〜 있나요?',                  tip:'サイズ/色 등 물건·서비스 확인 시' },
  { id:'q_dekimasu',  japanese:'〜はできますか',      romaji:'~wa dekimasu ka',  korean:'〜 가능한가요?',              tip:'英語はできますか = 영어 가능한가요?' },
  { id:'q_donogurai', japanese:'どのくらいかかりますか', romaji:'dono kurai kakarimasu ka', korean:'얼마나 걸려요?', tip:'시간·거리 물을 때' },
  { id:'q_naze',      japanese:'なぜですか',          romaji:'naze desu ka',     korean:'왜요?',                       tip:'どうして = 같은 뜻, 조금 가벼운 표현' },

  // ── S4: 길 찾기·방향 (directions) ───────────────────────
  { id:'dir_ikimasu',   japanese:'〜にいきたいです',            kanji:'〜に行きたいです',      romaji:'~ni ikitai desu',              korean:'〜에 가고 싶어요',  example:'東京タワーにいきたいです' },
  { id:'dir_chikaku',   japanese:'ちかくにありますか',          kanji:'近くにありますか',      romaji:'chikaku ni arimasu ka',        korean:'근처에 있나요?' },
  { id:'dir_aruite',    japanese:'あるいていけますか',          kanji:'歩いて行けますか',      romaji:'aruite ikemasu ka',            korean:'걸어서 갈 수 있나요?' },
  { id:'dir_made',      japanese:'〜までおねがいします',        romaji:'~made onegaishimasu',  korean:'〜까지 부탁합니다',            tip:'택시 탈 때 목적지 말하는 법' },
  { id:'dir_chizu',     japanese:'ちずをみせてください',        kanji:'地図を見せてください',  romaji:'chizu wo misete kudasai',      korean:'지도 보여 주세요' },
  { id:'dir_michi',     japanese:'みちにまよいました',          kanji:'道に迷いました',        romaji:'michi ni mayoimashita',        korean:'길을 잃었어요' },
  { id:'dir_toshokan',  japanese:'〜ぐちをでてください',        kanji:'〜口を出てください',    romaji:'~guchi wo dete kudasai',       korean:'〜번 출구로 나가세요', tip:'역에서 방향 안내할 때 자주 나옴' },
  { id:'dir_massugu',   japanese:'まっすぐいってください',      romaji:'massugu itte kudasai', korean:'직진하세요' },
  { id:'dir_migi_te',   japanese:'みぎにまがってください',      kanji:'右に曲がってください',  romaji:'migi ni magatte kudasai',      korean:'오른쪽으로 도세요' },
  { id:'dir_hidari_te', japanese:'ひだりにまがってください',    kanji:'左に曲がってください',  romaji:'hidari ni magatte kudasai',    korean:'왼쪽으로 도세요' },

  // ── S5: 식사·주문 (food_ordering) ───────────────────────
  { id:'res_kore',    japanese:'これをください',                romaji:'kore wo kudasai',              korean:'이것을 주세요',    tip:'メニューを指差しながら = 메뉴 가리키며' },
  { id:'res_hitotsu', japanese:'ひとつください',                romaji:'hitotsu kudasai',              korean:'하나 주세요' },
  { id:'res_futari',  japanese:'ふたりです',                    kanji:'二人です',                      romaji:'futari desu',     korean:'두 명이요',      tip:'何名様ですか？ 라고 물으면 답하는 표현' },
  { id:'res_yoyaku',  japanese:'よやく',                        kanji:'予約',                          romaji:'yoyaku',          korean:'예약',           example:'よやくしています = 예약했습니다' },
  { id:'res_okaikei', japanese:'おかいけい、おねがいします',    kanji:'お会計、お願いします',          romaji:'okaikei onegaishimasu', korean:'계산 부탁드립니다' },
  { id:'res_kaado',   japanese:'カードつかえますか',            romaji:'kaado tsukaemasu ka',          korean:'카드 쓸 수 있나요?', tip:'일본은 현금 중심 문화, 확인 필수' },

  // ── S1 추가 ①: 다시 묻기·양해 (pardon) ──────────────────
  { id:'par_imi',       japanese:'どういういみですか',            kanji:'どういう意味ですか',                romaji:'dou iu imi desu ka',              korean:'무슨 뜻이에요?',            tip:'모르는 단어를 만났을 때' },
  { id:'par_kaite',     japanese:'かいてもらえますか',            kanji:'書いてもらえますか',                romaji:'kaite moraemasu ka',              korean:'써 주실 수 있어요?',         tip:'발음을 몰라도 글자로 확인' },
  { id:'par_eigo2',     japanese:'えいごでいえますか',            kanji:'英語で言えますか',                  romaji:'eigo de iemasu ka',               korean:'영어로 말해주실 수 있어요?', tip:'언어 장벽 돌파 최후 수단' },
  { id:'par_wakatta',   japanese:'わかりました',                  romaji:'wakarimashita',                    korean:'알겠습니다',                        tip:'상대방 말을 이해했을 때' },
  { id:'par_wakaranai', japanese:'わかりません',                  romaji:'wakarimasen',                      korean:'모르겠어요',                        tip:'솔직하게 모른다고 할 때' },
  { id:'par_hon',       japanese:'ほんとうですか',                romaji:'hontou desu ka',                   korean:'정말이요?',                         tip:'놀람·확인할 때' },

  // ── S1 추가 ②: 기분·감정 기초 (feelings) ────────────────
  { id:'feel_ureshii',  japanese:'うれしいです',                  kanji:'嬉しいです',                        romaji:'ureshii desu',                    korean:'기뻐요',                    tip:'기쁠 때, 감사 표현 후에도' },
  { id:'feel_genki',    japanese:'げんきです',                    kanji:'元気です',                          romaji:'genki desu',                      korean:'건강해요 / 힘차요',         tip:'おかげさまでげんきです = 덕분에 잘 지내요' },
  { id:'feel_tsukareta',japanese:'つかれました',                  kanji:'疲れました',                        romaji:'tsukaremashita',                  korean:'피곤해요',                  tip:'여행 후 자주 쓰는 표현' },
  { id:'feel_hara',     japanese:'おなかがすきました',            kanji:'お腹が空きました',                  romaji:'onaka ga sukimashita',            korean:'배고파요' },
  { id:'feel_nemu',     japanese:'ねむいです',                    kanji:'眠いです',                          romaji:'nemui desu',                      korean:'졸려요' },
  { id:'feel_saiko',    japanese:'さいこうです！',                kanji:'最高です！',                        romaji:'saikou desu',                     korean:'최고예요!',                 tip:'음식·풍경·경험에 모두 사용 가능' },
  { id:'feel_zannen',   japanese:'ざんねんです',                  kanji:'残念です',                          romaji:'zannen desu',                     korean:'아쉬워요 / 유감이에요',     tip:'기대와 다를 때' },

  // ── S2 추가: 취미·관심사 소개 (hobbies) ─────────────────
  { id:'hob_shumi',     japanese:'しゅみは〜です',                kanji:'趣味は〜です',                      romaji:'shumi wa ~ desu',                 korean:'취미는 ~예요',              tip:'りょこう·おんがく·りょうり 등 넣어보세요' },
  { id:'hob_yoku',      japanese:'〜によくいきます',              kanji:'〜によく行きます',                  romaji:'~ ni yoku ikimasu',               korean:'〜에 자주 가요',            tip:'よく = 자주, たまに = 가끔' },
  { id:'hob_tokui',     japanese:'〜がとくいです',                kanji:'〜が得意です',                      romaji:'~ga tokui desu',                  korean:'〜을/를 잘해요',            tip:'にがて(苦手) = 잘 못해요' },
  { id:'hob_suki2',     japanese:'〜がだいすきです',              kanji:'〜が大好きです',                    romaji:'~ga daisuki desu',                korean:'〜을/를 매우 좋아해요',     tip:'すき보다 강조한 표현' },
  { id:'hob_oshiete',   japanese:'おしえてください',              kanji:'教えてください',                    romaji:'oshiete kudasai',                 korean:'알려주세요',                tip:'취미에 대해 배우고 싶을 때' },
  { id:'hob_issho2',    japanese:'いっしょにやってみませんか',    kanji:'一緒にやってみませんか',            romaji:'issho ni yatte mimasen ka',       korean:'같이 해볼래요?',            tip:'활동 권유 표현' },
  { id:'hob_omoshiro',  japanese:'おもしろいですね',              kanji:'面白いですね',                      romaji:'omoshiroi desu ne',               korean:'재미있네요!' },

  // ── S3 추가: 카페·음료 주문 (cafe) ──────────────────────
  { id:'cafe_hot',      japanese:'ホットでおねがいします',        romaji:'hotto de onegaishimasu',           korean:'핫으로 부탁합니다',             tip:'アイス(iced)·ホット 중 선택' },
  { id:'cafe_size',     japanese:'サイズはSとLどちらですか',      romaji:'saizu wa esu to eru dochira desu ka', korean:'사이즈는 S랑 L 중 어느 쪽인가요?' },
  { id:'cafe_nonsugar', japanese:'さとうなしでおねがいします',    kanji:'砂糖なしでお願いします',            romaji:'satou nashi de onegaishimasu',   korean:'설탕 없이 부탁합니다' },
  { id:'cafe_tomein',   japanese:'ここでのんでいいですか',        romaji:'koko de nonde ii desu ka',         korean:'여기서 마셔도 되나요?',          tip:'이트인이냐 테이크아웃이냐' },
  { id:'cafe_osusume2', japanese:'おすすめはなんですか',          kanji:'おすすめは何ですか',                romaji:'osusume wa nan desu ka',          korean:'추천 메뉴가 뭐예요?' },
  { id:'cafe_dengen',   japanese:'コンセントはありますか',        romaji:'konsento wa arimasu ka',           korean:'콘센트(충전) 있나요?',          tip:'일본어로 콘센트 = コンセント' },
  { id:'cafe_wifi',     japanese:'ワイファイはありますか',        romaji:'waifai wa arimasu ka',             korean:'와이파이 있나요?',              tip:'パスワードをおしえてください = 비번 알려주세요' },

  // ── S4 추가: 시각·시간 묻기 (time_asking) ────────────────
  { id:'time_nanji',    japanese:'いまなんじですか',              kanji:'今何時ですか',                      romaji:'ima nanji desu ka',               korean:'지금 몇 시예요?',           tip:'일본은 24시간제도 자주 쓰임' },
  { id:'time_goro',     japanese:'〜ごろにおねがいします',        romaji:'~ goro ni onegaishimasu',          korean:'〜시쯤으로 부탁합니다',          tip:'ごろ = 대략, 쯤' },
  { id:'time_aite',     japanese:'〜まであいていますか',          kanji:'〜まで開いていますか',              romaji:'~ made aite imasu ka',            korean:'〜까지 열려있나요?',         tip:'영업시간 확인할 때' },
  { id:'time_kara',     japanese:'〜じかんかかります',            kanji:'〜時間かかります',                  romaji:'~ jikan kakarimasu',              korean:'〜시간 걸려요' },
  { id:'time_hayai2',   japanese:'もっとはやいのはありますか',    kanji:'もっと早いのはありますか',          romaji:'motto hayai no wa arimasu ka',    korean:'더 빠른 게 있나요?' },
  { id:'time_osoi',     japanese:'おそくなってすみません',        kanji:'遅くなってすみません',              romaji:'osoku natte sumimasen',           korean:'늦어서 죄송합니다' },
  { id:'time_itsu2',    japanese:'いつごろですか',                romaji:'itsu goro desu ka',                korean:'언제쯤이에요?',                   tip:'いつ보다 부드러운 표현' },

  // ── S5 추가 ①: 관광·사진 (sightseeing) ──────────────────
  { id:'sight_osusume', japanese:'おすすめのかんこうちはどこですか', kanji:'おすすめの観光地はどこですか', romaji:'osusume no kankouchi wa doko desu ka', korean:'추천 관광지는 어디예요?' },
  { id:'sight_shashin', japanese:'しゃしんをとってもらえますか',  kanji:'写真を撮ってもらえますか',          romaji:'shashin o totte moraemasu ka',    korean:'사진 찍어주실 수 있나요?' },
  { id:'sight_issho2',  japanese:'いっしょにしゃしんをとってもいいですか', kanji:'一緒に写真を撮ってもいいですか', romaji:'issho ni shashin o totte mo ii desu ka', korean:'같이 사진 찍어도 되나요?' },
  { id:'sight_nyuujo',  japanese:'にゅうじょうりょうはいくらですか', kanji:'入場料はいくらですか',           romaji:'nyuujouryou wa ikura desu ka',    korean:'입장료는 얼마예요?' },
  { id:'sight_heiten',  japanese:'なんじからなんじまでですか',    kanji:'何時から何時までですか',            romaji:'nanji kara nanji made desu ka',  korean:'몇 시부터 몇 시까지예요?',  tip:'관광지·박물관 영업시간 확인' },
  { id:'sight_map',     japanese:'ちずをいただけますか',          kanji:'地図をいただけますか',              romaji:'chizu o itadakemasu ka',          korean:'지도 주실 수 있나요?' },
  { id:'sight_toire2',  japanese:'といれはどこですか',            kanji:'トイレはどこですか',                romaji:'toire wa doko desu ka',           korean:'화장실 어디예요?',          tip:'관광지에서 가장 많이 쓰는 표현' },

  // ── S5 추가 ②: 날씨·계절 (weather) ──────────────────────
  { id:'wthr_tenki',    japanese:'あしたのてんきはどうですか',    kanji:'明日の天気はどうですか',            romaji:'ashita no tenki wa dou desu ka', korean:'내일 날씨는 어때요?' },
  { id:'wthr_kasa',     japanese:'かさがひつようですか',          kanji:'傘が必要ですか',                    romaji:'kasa ga hitsuyou desu ka',        korean:'우산이 필요한가요?' },
  { id:'wthr_kisetsu',  japanese:'いましきはなんですか',          kanji:'今の季節は何ですか',                romaji:'ima no kisetsu wa nan desu ka',  korean:'지금 계절이 어떻게 돼요?',  tip:'はる·なつ·あき·ふゆ (봄·여름·가을·겨울)' },
  { id:'wthr_ame',      japanese:'あめがふりそうです',            kanji:'雨が降りそうです',                  romaji:'ame ga furisou desu',            korean:'비가 올 것 같아요' },
  { id:'wthr_yuki',     japanese:'ゆきがふっています',            kanji:'雪が降っています',                  romaji:'yuki ga futte imasu',            korean:'눈이 내리고 있어요' },
  { id:'wthr_suzushi',  japanese:'すずしいですね',               kanji:'涼しいですね',                      romaji:'suzushii desu ne',               korean:'시원하네요',                tip:'더운 여름날 바람이 불 때' },
  { id:'wthr_warm',     japanese:'あたたかいですね',              kanji:'暖かいですね',                      romaji:'atatakai desu ne',               korean:'따뜻하네요' },
];
