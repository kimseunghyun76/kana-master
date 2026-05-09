// ============================================================
//  문장 항목 — S1(인사·기본회화) ~ S5(식사·주문)
// ============================================================
var VOCAB_ITEMS_S1S5 = [

  // ── S1: 인사·기본 회화 (first_expressions) ──────────────
  { id:'s1_hajimemashite', japanese:'はじめまして',                      korean:'처음 뵙겠습니다',       english:'Nice to meet you',
    tip:'첫 만남의 문을 여는 한마디예요. 말한 뒤 바로 이름을 붙이면 자기소개가 자연스럽게 이어집니다.',
    example:'はじめまして。キムです。' },
  { id:'gr_modoichi',      japanese:'もう一度(いちど)おねがいします',    kanji:'もう一度お願いします',   korean:'다시 한번 부탁드립니다',               english:'Please say that again',
    tip:'못 알아들었을 때 당황하지 않고 대화를 살리는 표현입니다. 손가락 하나를 살짝 들며 말하면 더 부드러워요.',
    example:'すみません、もう一度お願いします。' },
  { id:'gr_english',       japanese:'えいごはなせますか',               kanji:'英語(えいご)話(はな)せますか', korean:'영어 하실 수 있어요?',           english:'Can you speak English?',
    tip:'바로 영어로 바꾸기보다 먼저 일본어로 물어보면 훨씬 정중합니다. 앞에 すみません을 붙이면 안전해요.',
    example:'すみません、英語(えいご)話(はな)せますか。' },
  { id:'s1_yukkuri',       japanese:'ゆっくりはなしてください',          kanji:'ゆっくり話(はな)してください', korean:'천천히 말해주세요',              english:'Please speak slowly',
    tip:'상대 말이 빠를 때 가장 실전적인 구명줄입니다. ゆっくり만 또박또박 말해도 의도가 전해집니다.',
    example:'すみません、ゆっくり話(はな)してください。' },
  { id:'s1_chotto',        japanese:'ちょっとまってください',            kanji:'ちょっと待(ま)ってください', korean:'잠깐 기다려주세요',               english:'Please wait a moment',
    tip:'가방에서 여권을 찾거나 번역기를 켤 때 바로 쓰세요. ちょっと가 들어가면 부탁이 덜 딱딱해집니다.',
    example:'ちょっと待(ま)ってください。今(いま)見(み)ます。' },
  { id:'s1_sukoshi',       japanese:'にほんごがすこしわかります',        kanji:'日本語(にほんご)が少(すこ)しわかります', korean:'일본어를 조금 알아요', english:'I understand a little Japanese',
    tip:'완벽하지 않아도 대화를 시작하게 해주는 자기 방어 문장입니다. 少し를 넣으면 부담이 확 줄어요.',
    example:'日本語(にほんご)が少(すこ)しわかります。' },

  // ── S2: 자기소개 (self_intro) ────────────────────────────
  { id:'gr_kankoku',  japanese:'かんこくじんです',            kanji:'韓国人(かんこくじん)です',        korean:'한국인입니다',                        english:'I am Korean',
    tip:'国(くに) + 人(じん)은 “그 나라 사람”이라는 뜻입니다. 韓国人です는 짧지만, 처음 만난 사람이 바로 나를 이해하게 해주는 기본 정보예요.',
    example:'私は韓国人(かんこくじん)です。' },
  { id:'gr_namae',    japanese:'〜と申(もう)します',                                                   korean:'〜라고 합니다 (이름 소개)',            english:'My name is ~ (formal)',
    tip:'입니다보다 한 단계 더 공손한 이름 소개입니다. 회사, 가게, 처음 만난 어른 앞에서는 です보다 と申します가 더 안정적이에요.',
    example:'キムと申(もう)します。' },
  { id:'si_kara',     japanese:'〜からきました',              kanji:'〜から来(き)ました',              korean:'〜에서 왔어요',                        english:'I came from ~',
    tip:'から는 출발점입니다. 나라, 도시, 회사 이름을 넣으면 “어디서 온 사람인지”가 바로 정리됩니다.',
    example:'ソウルから来(き)ました。' },
  { id:'si_sai',      japanese:'〜さいです',                  kanji:'〜歳(さい)です',                  korean:'〜살이에요',                           english:'I am ~ years old',
    tip:'나이를 꼭 말해야 하는 것은 아니지만, 학교·동아리·친한 모임에서는 대화가 빨리 풀립니다. 숫자 뒤에 歳(さい)를 붙이면 됩니다.',
    example:'二十歳(はたち)です。' },
  { id:'si_shigoto',  japanese:'〜のしごとをしています',      kanji:'〜の仕事(しごと)をしています',   korean:'〜 일을 하고 있어요',                  english:'I work as a ~',
    tip:'仕事をしています는 “그 일을 하고 있다”는 자연스러운 표현입니다. 직업명만 모르면 学生です처럼 짧게 말해도 충분해요.',
    example:'ITの仕事(しごと)をしています。' },
  { id:'si_travel',   japanese:'りょこうできました',          kanji:'旅行(りょこう)で来(き)ました',   korean:'여행으로 왔어요',                      english:'I came here for travel',
    tip:'で는 이유나 목적을 말할 때 씁니다. 旅行で来ました라고 하면 “왜 일본에 왔는지”가 한 번에 설명됩니다.',
    example:'旅行(りょこう)で日本(にほん)に来(き)ました。' },
  { id:'si_nihongo',  japanese:'にほんごをべんきょうしています', kanji:'日本語(にほんご)を勉強(べんきょう)しています', korean:'일본어 공부 중이에요', english:'I am studying Japanese',
    tip:'공부 중이라고 먼저 말하면 상대가 속도와 단어를 맞춰주기 쉽습니다. 아직 서툴러도 대화를 계속하게 만드는 좋은 문장입니다.',
    example:'日本語(にほんご)を勉強(べんきょう)しています。' },
  { id:'si_suki',     japanese:'〜がすきです',                kanji:'〜が好(す)きです',               korean:'〜를 좋아해요',                        english:'I like ~',
    tip:'좋아하는 것을 하나 말하면 자기소개가 갑자기 사람다워집니다. 음식, 음악, 애니, 여행처럼 쉬운 단어를 넣어보세요.',
    example:'ラーメンが好(す)きです。' },

  // ── S3: 기초 질문 패턴 (basic_questions) ────────────────
  { id:'q_nani',      japanese:'これはなんですか',    kanji:'これは何(なん)ですか',      korean:'이게 뭐예요?',         english:'What is this?',                       tip:'메뉴·상품 이름 물을 때' },
  { id:'dir_doko',    japanese:'〜はどこですか',                                         korean:'〜은 어디예요?',        english:'Where is ~?',                         tip:'〜에 장소를 넣으세요 (호텔、駅(えき) 등)' },
  { id:'dir_ikura',   japanese:'いくらですか',                                           korean:'얼마예요?',             english:'How much is it?',                     tip:'쇼핑·식당 필수 표현' },
  { id:'q_itsu',      japanese:'いつですか',                                             korean:'언제예요?',             english:'When is it?',                         tip:'いつから = 언제부터, いつまで = 언제까지' },
  { id:'q_dare',      japanese:'〜はだれですか',      kanji:'〜は誰(だれ)ですか',        korean:'〜은 누구예요?',        english:'Who is ~?' },
  { id:'q_dore',      japanese:'どれがいいですか',                                       korean:'어떤 게 좋아요?',       english:'Which one is good?',                  tip:'どれ = 여러 개 중 어떤 것' },
  { id:'q_arimasu',   japanese:'〜はありますか',                                         korean:'〜 있나요?',            english:'Do you have ~? / Is there ~?',        tip:'サイズ/色(いろ) 등 물건·서비스 확인 시' },
  { id:'q_dekimasu',  japanese:'〜はできますか',                                         korean:'〜 가능한가요?',        english:'Can you do ~? / Is ~ possible?',      tip:'英語(えいご)はできますか = 영어 가능한가요?' },
  { id:'q_donogurai', japanese:'どのくらいかかりますか',                                 korean:'얼마나 걸려요?',        english:'How long does it take?',              tip:'시간·거리 물을 때' },
  { id:'q_naze',      japanese:'なぜですか',                                             korean:'왜요?',                 english:'Why?',                                tip:'どうして = 같은 뜻, 조금 가벼운 표현' },

  // ── S4: 길 찾기·방향 (directions) ───────────────────────
  { id:'dir_ikimasu',   japanese:'〜にいきたいです',            kanji:'〜に行(い)きたいです',         korean:'〜에 가고 싶어요',  english:'I want to go to ~',          example:'東京(とうきょう)タワーにいきたいです' },
  { id:'dir_chikaku',   japanese:'ちかくにありますか',          kanji:'近(ちか)くにありますか',       korean:'근처에 있나요?',    english:'Is it nearby?' },
  { id:'dir_aruite',    japanese:'あるいていけますか',          kanji:'歩(ある)いて行(い)けますか',   korean:'걸어서 갈 수 있나요?', english:'Can I walk there?' },
  { id:'dir_made',      japanese:'〜までおねがいします',                                              korean:'〜까지 부탁합니다', english:'Please take me to ~',        tip:'택시 탈 때 목적지 말하는 법' },
  { id:'dir_chizu',     japanese:'ちずをみせてください',        kanji:'地図(ちず)を見(み)せてください', korean:'지도 보여 주세요', english:'Please show me the map' },
  { id:'dir_michi',     japanese:'みちにまよいました',          kanji:'道(みち)に迷(まよ)いました',   korean:'길을 잃었어요',    english:'I got lost' },
  { id:'dir_toshokan',  japanese:'〜ぐちをでてください',        kanji:'〜口(ぐち)を出(で)てください', korean:'〜번 출구로 나가세요', english:'Exit from ~ gate', tip:'역에서 방향 안내할 때 자주 나옴' },
  { id:'dir_massugu',   japanese:'まっすぐいってください',                                            korean:'직진하세요',       english:'Please go straight' },
  { id:'dir_migi_te',   japanese:'みぎにまがってください',      kanji:'右(みぎ)に曲(ま)がってください', korean:'오른쪽으로 도세요', english:'Please turn right' },
  { id:'dir_hidari_te', japanese:'ひだりにまがってください',    kanji:'左(ひだり)に曲(ま)がってください', korean:'왼쪽으로 도세요', english:'Please turn left' },

  // ── S5: 식사·주문 (food_ordering) ───────────────────────
  { id:'res_kore',    japanese:'これをください',                                          korean:'이것을 주세요',    english:'I\'ll have this / Give me this', tip:'メニューを指差(ゆびさ)しながら = 메뉴 가리키며' },
  { id:'res_hitotsu', japanese:'ひとつください',                                          korean:'하나 주세요',      english:'One please' },
  { id:'res_futari',  japanese:'ふたりです',                    kanji:'二人(ふたり)です', korean:'두 명이요',        english:'Two people',                     tip:'何名様(なんめいさま)ですか？ 라고 물으면 답하는 표현' },
  { id:'res_yoyaku',  japanese:'よやく',                        kanji:'予約(よやく)',     korean:'예약',             english:'Reservation',                    example:'よやくしています = 예약했습니다' },
  { id:'res_okaikei', japanese:'おかいけい、おねがいします',    kanji:'お会計(かいけい)、お願(ねが)いします', korean:'계산 부탁드립니다', english:'Check please / Bill please' },
  { id:'res_kaado',   japanese:'カードつかえますか',                                      korean:'카드 쓸 수 있나요?', english:'Can I pay by card?',           tip:'일본은 현금 중심 문화, 확인 필수' },

  // ── S1 추가 ①: 다시 묻기·양해 (pardon) ──────────────────
  { id:'par_imi',       japanese:'どういういみですか',            kanji:'どういう意味(いみ)ですか',    korean:'무슨 뜻이에요?',            english:'What does that mean?',              tip:'모르는 단어를 만났을 때' },
  { id:'par_kaite',     japanese:'かいてもらえますか',            kanji:'書(か)いてもらえますか',      korean:'써 주실 수 있어요?',         english:'Could you write it down?',          tip:'발음을 몰라도 글자로 확인' },
  { id:'par_eigo2',     japanese:'えいごでいえますか',            kanji:'英語(えいご)で言(い)えますか', korean:'영어로 말해주실 수 있어요?', english:'Can you say it in English?',        tip:'언어 장벽 돌파 최후 수단' },
  { id:'par_wakatta',   japanese:'りょうかいしました',           kanji:'了解(りょうかい)しました',       korean:'알겠습니다 (확인했습니다)', english:'Got it / Understood',              tip:'가벼운 확인. 더 정중하게는 承知しました' },
  { id:'par_wakaranai', japanese:'わかりません',                                                       korean:'모르겠어요',                english:'I don\'t understand / I don\'t know', tip:'솔직하게 모른다고 할 때' },
  { id:'par_hon',       japanese:'ほんとうですか',                                                     korean:'정말이요?',                 english:'Really? / Is that true?',           tip:'놀람·확인할 때' },

  // ── S1 추가 ②: 기분·감정 기초 (feelings) ────────────────
  { id:'feel_ureshii',  japanese:'うれしいです',                  kanji:'嬉(うれ)しいです',            korean:'기뻐요',                    english:'I\'m happy / I\'m glad',            tip:'기쁠 때, 감사 표현 후에도' },
  { id:'feel_genki',    japanese:'げんきです',                    kanji:'元気(げんき)です',            korean:'건강해요 / 힘차요',          english:'I\'m well / I\'m fine',             tip:'おかげさまでげんきです = 덕분에 잘 지내요' },
  { id:'feel_tsukareta',japanese:'つかれました',                  kanji:'疲(つか)れました',            korean:'피곤해요',                  english:'I\'m tired',                        tip:'여행 후 자주 쓰는 표현' },
  { id:'feel_hara',     japanese:'おなかがすきました',            kanji:'お腹(なか)が空(す)きました',  korean:'배고파요',                  english:'I\'m hungry' },
  { id:'feel_nemu',     japanese:'ねむいです',                    kanji:'眠(ねむ)いです',              korean:'졸려요',                    english:'I\'m sleepy' },
  { id:'feel_saiko',    japanese:'さいこうです！',                kanji:'最高(さいこう)です！',        korean:'최고예요!',                 english:'It\'s the best! / Amazing!',        tip:'음식·풍경·경험에 모두 사용 가능' },
  { id:'feel_zannen',   japanese:'ざんねんです',                  kanji:'残念(ざんねん)です',          korean:'아쉬워요 / 유감이에요',     english:'That\'s a shame / What a pity',     tip:'기대와 다를 때' },

  // ── S2 추가: 취미·관심사 소개 (hobbies) ─────────────────
  { id:'hob_shumi',     japanese:'しゅみは〜です',                kanji:'趣味(しゅみ)は〜です',        korean:'취미는 ~예요',              english:'My hobby is ~',                     tip:'りょこう·おんがく·りょうり 등 넣어보세요' },
  { id:'hob_yoku',      japanese:'〜によくいきます',              kanji:'〜によく行(い)きます',        korean:'〜에 자주 가요',            english:'I often go to ~',                   tip:'よく = 자주, たまに = 가끔' },
  { id:'hob_tokui',     japanese:'〜がとくいです',                kanji:'〜が得意(とくい)です',        korean:'〜을/를 잘해요',            english:'I\'m good at ~',                    tip:'にがて(苦手(にがて)) = 잘 못해요' },
  { id:'hob_suki2',     japanese:'〜がだいすきです',              kanji:'〜が大好(だいす)きです',      korean:'〜을/를 매우 좋아해요',     english:'I love ~ / I really like ~',        tip:'すき보다 강조한 표현' },
  { id:'hob_oshiete',   japanese:'おしえてください',              kanji:'教(おし)えてください',        korean:'알려주세요',                english:'Please teach me / Please tell me',  tip:'취미에 대해 배우고 싶을 때' },
  { id:'hob_issho2',    japanese:'いっしょにやってみませんか',    kanji:'一緒(いっしょ)にやってみませんか', korean:'같이 해볼래요?',        english:'Shall we try it together?',         tip:'활동 권유 표현' },
  { id:'hob_omoshiro',  japanese:'おもしろいですね',              kanji:'面白(おもしろ)いですね',      korean:'재미있네요!',               english:'That\'s interesting / That\'s fun!' },

  // ── S3 추가: 카페·음료 주문 (cafe) ──────────────────────
  { id:'cafe_hot',      japanese:'ホットでおねがいします',                                             korean:'핫으로 부탁합니다',             english:'Hot please',                        tip:'アイス(iced)·ホット 중 선택' },
  { id:'cafe_size',     japanese:'サイズはSとLどちらですか',                                          korean:'사이즈는 S랑 L 중 어느 쪽인가요?', english:'Which size, S or L?' },
  { id:'cafe_nonsugar', japanese:'さとうなしでおねがいします',    kanji:'砂糖(さとう)なしでお願(ねが)いします', korean:'설탕 없이 부탁합니다',      english:'No sugar please' },
  { id:'cafe_tomein',   japanese:'ここでのんでいいですか',                                             korean:'여기서 마셔도 되나요?',          english:'Can I drink it here?',              tip:'이트인이냐 테이크아웃이냐' },
  { id:'cafe_osusume2', japanese:'おすすめはなんですか',          kanji:'おすすめは何(なん)ですか',    korean:'추천 메뉴가 뭐예요?',           english:'What do you recommend?' },
  { id:'cafe_dengen',   japanese:'コンセントはありますか',                                             korean:'콘센트(충전) 있나요?',           english:'Is there an electrical outlet?',    tip:'일본어로 콘센트 = コンセント' },
  { id:'cafe_wifi',     japanese:'ワイファイはありますか',                                             korean:'와이파이 있나요?',               english:'Is there Wi-Fi?',                   tip:'パスワードをおしえてください = 비번 알려주세요' },

  // ── S4 추가: 시각·시간 묻기 (time_asking) ────────────────
  { id:'time_nanji',    japanese:'いまなんじですか',              kanji:'今(いま)何時(なんじ)ですか', korean:'지금 몇 시예요?',           english:'What time is it now?',              tip:'일본은 24시간제도 자주 쓰임' },
  { id:'time_goro',     japanese:'〜ごろにおねがいします',                                            korean:'〜시쯤으로 부탁합니다',     english:'Around ~ o\'clock please',          tip:'ごろ = 대략, 쯤' },
  { id:'time_aite',     japanese:'〜まであいていますか',          kanji:'〜まで開(あ)いていますか',   korean:'〜까지 열려있나요?',        english:'Are you open until ~?',             tip:'영업시간 확인할 때' },
  { id:'time_kara',     japanese:'〜じかんかかります',            kanji:'〜時間(じかん)かかります',   korean:'〜시간 걸려요',             english:'It takes ~ hours' },
  { id:'time_hayai2',   japanese:'もっとはやいのはありますか',    kanji:'もっと早(はや)いのはありますか', korean:'더 빠른 게 있나요?',    english:'Is there a faster option?' },
  { id:'time_osoi',     japanese:'おそくなってすみません',        kanji:'遅(おそ)くなってすみません', korean:'늦어서 죄송합니다',         english:'I\'m sorry for being late' },
  { id:'time_itsu2',    japanese:'いつごろですか',                                                    korean:'언제쯤이에요?',             english:'About when? / Approximately when?', tip:'いつ보다 부드러운 표현' },

  // ── S5 추가 ①: 관광·사진 (sightseeing) ──────────────────
  { id:'sight_osusume', japanese:'おすすめのかんこうちはどこですか', kanji:'おすすめの観光地(かんこうち)はどこですか', korean:'추천 관광지는 어디예요?', english:'Where are the recommended tourist spots?' },
  { id:'sight_shashin', japanese:'しゃしんをとってもらえますか',  kanji:'写真(しゃしん)を撮(と)ってもらえますか', korean:'사진 찍어주실 수 있나요?', english:'Could you take a photo for me?' },
  { id:'sight_issho2',  japanese:'いっしょにしゃしんをとってもいいですか', kanji:'一緒(いっしょ)に写真(しゃしん)を撮(と)ってもいいですか', korean:'같이 사진 찍어도 되나요?', english:'May I take a photo together with you?' },
  { id:'sight_nyuujo',  japanese:'にゅうじょうりょうはいくらですか', kanji:'入場料(にゅうじょうりょう)はいくらですか', korean:'입장료는 얼마예요?', english:'How much is the admission fee?' },
  { id:'sight_heiten',  japanese:'なんじからなんじまでですか',    kanji:'何時(なんじ)から何時(なんじ)までですか', korean:'몇 시부터 몇 시까지예요?', english:'What are the opening hours?', tip:'관광지·박물관 영업시간 확인' },
  { id:'sight_map',     japanese:'ちずをいただけますか',          kanji:'地図(ちず)をいただけますか',              korean:'지도 주실 수 있나요?',     english:'Could I have a map?' },
  { id:'sight_toire2',  japanese:'といれはどこですか',            kanji:'トイレはどこですか',                      korean:'화장실 어디예요?',         english:'Where is the restroom?',           tip:'관광지에서 가장 많이 쓰는 표현' },

  // ── S5 추가 ②: 날씨·계절 (weather) ──────────────────────
  { id:'wthr_tenki',    japanese:'あしたのてんきはどうですか',    kanji:'明日(あした)の天気(てんき)はどうですか', korean:'내일 날씨는 어때요?', english:'What will the weather be like tomorrow?' },
  { id:'wthr_kasa',     japanese:'かさがひつようですか',          kanji:'傘(かさ)が必要(ひつよう)ですか',         korean:'우산이 필요한가요?',   english:'Do I need an umbrella?' },
  { id:'wthr_kisetsu',  japanese:'いましきはなんですか',          kanji:'今(いま)の季節(きせつ)は何(なん)ですか', korean:'지금 계절이 어떻게 돼요?', english:'What season is it now?', tip:'はる·なつ·あき·ふゆ (봄·여름·가을·겨울)' },
  { id:'wthr_ame',      japanese:'あめがふりそうです',            kanji:'雨(あめ)が降(ふ)りそうです',             korean:'비가 올 것 같아요',    english:'It looks like it\'s going to rain' },
  { id:'wthr_yuki',     japanese:'ゆきがふっています',            kanji:'雪(ゆき)が降(ふ)っています',             korean:'눈이 내리고 있어요',   english:'It is snowing' },
  { id:'wthr_suzushi',  japanese:'すずしいですね',               kanji:'涼(すず)しいですね',                     korean:'시원하네요',           english:'It\'s cool (weather), isn\'t it?',  tip:'더운 여름날 바람이 불 때' },
  { id:'wthr_warm',     japanese:'あたたかいですね',              kanji:'暖(あたた)かいですね',                   korean:'따뜻하네요',           english:'It\'s warm, isn\'t it?' },
];
