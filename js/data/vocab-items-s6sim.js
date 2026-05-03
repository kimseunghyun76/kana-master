// ============================================================
//  문장·시뮬레이션 항목 — S6~S10 + 모든 실전 시뮬레이션
// ============================================================
var VOCAB_ITEMS_S6SIM = [

  // ── S6: 교통·이동 (transport_phrases) ───────────────────
  { id:'td_shink',     japanese:'しんかんせん',    kanji:'新幹線(しんかんせん)',    korean:'신칸센 (고속철도)', english:'Shinkansen (bullet train)',             tip:'のぞみ·ひかり·こだま 등 종류가 있음' },
  { id:'td_jiyuuseki', japanese:'じゆうせき',      kanji:'自由席(じゆうせき)',      korean:'자유석',           english:'Unreserved seat',                       tip:'していせき(指定席(していせき)) = 지정석, 요금 차이 있음' },
  { id:'td_suica',     japanese:'スイカ',           korean:'스이카 IC카드',          english:'Suica (IC transit card)',                tip:'PASMO도 동일하게 사용 가능. 편의점도 OK!' },
  { id:'td_kippu',     japanese:'きっぷ',           kanji:'切符(きっぷ)',             korean:'표 (승차권)',       english:'Ticket',                                example:'きっぷをかいたい = 표를 사고 싶어요' },
  { id:'td_norikae',   japanese:'のりかえ',         kanji:'乗(の)り換(か)え',        korean:'환승',              english:'Transfer / Change (trains)',             tip:'のりかえはどこですか = 환승은 어디서 해요?' },
  { id:'td_yuki',      japanese:'〜ゆき',           kanji:'〜行(ゆ)き',              korean:'〜행 (방향)',        english:'Bound for ~ / ~ direction',             example:'とうきょうゆき = 도쿄행' },
  { id:'td_noriba',    japanese:'のりば',           kanji:'乗(の)り場(ば)',          korean:'승강장 / 탑승장',   english:'Boarding area / Platform',              tip:'バスのりば = 버스 승강장' },
  { id:'td_jikanhyo',  japanese:'じかんひょう',     kanji:'時刻表(じこくひょう)',    korean:'시간표',            english:'Timetable / Schedule',                  example:'じかんひょうをみてください = 시간표를 보세요' },
  { id:'td_maniau',    japanese:'まにあいますか',   kanji:'間(ま)に合(あ)いますか',  korean:'시간에 맞을까요?',  english:'Will we make it in time?',              tip:'버스·기차 놓칠 것 같을 때' },
  { id:'td_taxi',      japanese:'タクシーをよんでください',                           korean:'택시 불러 주세요',  english:'Please call a taxi',                    example:'ホテルまでおねがいします = 호텔까지 가주세요' },
  { id:'td_teiryu',    japanese:'ていりゅうじょ',   kanji:'停留所(ていりゅうじょ)', korean:'정류장 (버스)',      english:'Bus stop',                              tip:'バスていりゅうじょはどこですか = 버스 정류장 어디예요?' },
  { id:'td_madogawa',  japanese:'まどがわのせき',   kanji:'窓側(まどがわ)の席(せき)', korean:'창가석',          english:'Window seat',                           tip:'つうろがわのせき(通路側(つうろがわ)の席(せき)) = 복도석' },

  // ── S7: 쇼핑 (shopping_phrases) ─────────────────────────
  { id:'res_baggu',    japanese:'ふくろ',                       kanji:'袋(ふくろ)',    korean:'봉투 (가방)',       english:'Bag / Plastic bag',                 example:'ふくろいりますか = 봉투 필요하세요?' },
  { id:'res_omiyage',  japanese:'おみやげ',                     kanji:'お土産(みやげ)', korean:'기념품 / 선물',    english:'Souvenir / Gift' },
  { id:'res_ikaga',    japanese:'〜はいかがですか',                                     korean:'〜는 어떠세요? (권유)', english:'How about ~? / Would you like ~?', tip:'점원이 자주 사용하는 표현' },
  { id:'res_nokori',   japanese:'これ、のこりはいくつですか',                           korean:'이거 재고가 얼마나 남았어요?', english:'How many of these are left in stock?' },
  { id:'res_saizu',    japanese:'サイズ',                                                korean:'사이즈 (치수)',     english:'Size' },
  { id:'res_discount', japanese:'まけてもらえますか',                                   korean:'깎아 주실 수 있어요?', english:'Can you give me a discount?',      tip:'백화점보다 시장에서 유효' },
  { id:'res_takai',    japanese:'すこしたかいですね',                                   korean:'조금 비싸네요',       english:'It\'s a little expensive',         tip:'가격 흥정 첫 마디' },
  { id:'res_yasuku',   japanese:'もうすこしやすくなりますか',                           korean:'조금 더 싸게 될까요?', english:'Can you make it a bit cheaper?' },

  // ── S8: 호텔·숙박 (hotel_phrases) ───────────────────────
  { id:'ht_checkin',    japanese:'チェックイン',                                                      korean:'체크인',             english:'Check-in' },
  { id:'ht_checkout',   japanese:'チェックアウト',                                                    korean:'체크아웃',           english:'Check-out',                             example:'なんじにチェックアウトですか = 몇 시에 체크아웃인가요?' },
  { id:'ht_yoyaku',     japanese:'よやくをしています',            kanji:'予約(よやく)をしています',    korean:'예약하셨어요 (나)',   english:'I have a reservation',                  tip:'フロントで = 프론트에서 쓰는 표현' },
  { id:'ht_goushitsu',  japanese:'なんごうしつですか',            kanji:'何号室(なんごうしつ)ですか',  korean:'몇 호실인가요?',     english:'What room number?',                     example:'ごひゃくさんごうしつです = 503호실이에요' },
  { id:'ht_choshoku',   japanese:'あさごはんはつきますか',        kanji:'朝(あさ)ごはんはつきますか', korean:'조식 포함인가요?',   english:'Is breakfast included?',                tip:'조식 포함=ちょうしょくつき, 미포함=なし' },
  { id:'ht_kagi',       japanese:'かぎをなくしました',            kanji:'鍵(かぎ)をなくしました',     korean:'열쇠를 잃어버렸어요', english:'I lost my room key' },
  { id:'ht_taoru',      japanese:'タオルをください',                                                  korean:'수건 주세요',         english:'Please give me a towel',                example:'もういちまいタオルをください = 수건 한 장 더 주세요' },
  { id:'ht_moningcall', japanese:'モーニングコールをおねがいします',                                  korean:'모닝콜 부탁드려요',   english:'Please give me a wake-up call',         example:'しちじにおねがいします = 7시로 부탁해요' },
  { id:'ht_room',       japanese:'ルームサービス',                                                    korean:'룸서비스',            english:'Room service' },
  { id:'ht_elevator',   japanese:'エレベーター',                                                      korean:'엘리베이터',          english:'Elevator' },
  { id:'ht_laundry',    japanese:'コインランドリー',                                                  korean:'코인 세탁기',          english:'Coin laundry' },
  { id:'ht_lobby',      japanese:'ロビー',                                                            korean:'로비',                 english:'Lobby',                                example:'ロビーでまっています = 로비에서 기다릴게요' },
  { id:'ht_extend',     japanese:'チェックアウトをのばせますか',                                     korean:'체크아웃을 연장할 수 있나요?', english:'Can I extend my checkout time?', tip:'もう一泊(いっぱく)お願(ねが)いしたい = 하룻밤 더 묵고 싶어요' },

  // ── S9: 스몰토크·감정 (small_talk) ──────────────────────
  { id:'st_hisashiburi', japanese:'おひさしぶりです',             kanji:'お久(ひさ)しぶりです',              korean:'오랜만이에요',        english:'Long time no see',                      tip:'친구나 아는 사람을 오래만에 만났을 때' },
  { id:'st_ogenki',      japanese:'おげんきですか',               kanji:'お元気(げんき)ですか',              korean:'잘 지내세요?',        english:'How are you? / Are you well?',           example:'はい、げんきです = 네, 잘 지냈어요' },
  { id:'st_tenki',       japanese:'きょうはいいてんきですね',     kanji:'今日(きょう)はいい天気(てんき)ですね', korean:'오늘 날씨 좋죠?',  english:'Nice weather today, isn\'t it?',         tip:'일본에서 날씨 스몰토크는 기본!' },
  { id:'st_atsui',       japanese:'あついですね',                 kanji:'暑(あつ)いですね',                  korean:'덥네요',              english:'It\'s hot, isn\'t it?',                 tip:'さむいですね = 춥네요' },
  { id:'st_samui',       japanese:'さむいですね',                 kanji:'寒(さむ)いですね',                  korean:'춥네요',              english:'It\'s cold, isn\'t it?' },
  { id:'st_shumi',       japanese:'しゅみはなんですか',           kanji:'趣味(しゅみ)は何(なん)ですか',     korean:'취미가 뭐예요?',      english:'What are your hobbies?',                example:'わたしのしゅみはりょこうです = 취미는 여행이에요' },
  { id:'st_suki',        japanese:'〜がすきです',                 kanji:'〜が好(す)きです',                  korean:'〜을/를 좋아해요',    english:'I like ~' },
  { id:'st_tanoshii',    japanese:'たのしいですね！',             kanji:'楽(たの)しいですね！',              korean:'즐겁네요! 재미있어요!', english:'This is fun! / Enjoying it!',           tip:'여행·파티 등에서 자주 쓰임' },
  { id:'st_sugoi',       japanese:'すごいですね！',                                                          korean:'대단하네요! 굉장해요!', english:'That\'s amazing! / Wow!' },
  { id:'st_taihen',      japanese:'たいへんですね',               kanji:'大変(たいへん)ですね',              korean:'힘들겠네요 / 고생이에요', english:'That must be tough / That\'s rough',   tip:'상대방을 위로할 때 사용' },
  { id:'st_mata',        japanese:'またあいましょう！',            kanji:'また会(あ)いましょう！',            korean:'또 만나요!',           english:'Let\'s meet again!',                    tip:'헤어질 때 자주 쓰는 인사' },
  { id:'st_omedetou',    japanese:'おめでとうございます',                                                     korean:'축하합니다!',           english:'Congratulations!',                      tip:'생일, 합격, 결혼 등에 사용' },
  { id:'st_issho',       japanese:'いっしょにいきましょう！',      kanji:'一緒(いっしょ)に行(い)きましょう！', korean:'같이 가요!',          english:'Let\'s go together!',                   example:'しょくじにいきましょう = 식사하러 가요' },
  { id:'st_nani',        japanese:'なにがたべたいですか',          kanji:'何(なに)が食(た)べたいですか',      korean:'뭐 먹고 싶어요?',      english:'What do you want to eat?',              tip:'밥 먹기 전 자주 쓰는 표현' },
  { id:'st_yoroshiku',   japanese:'どうぞよろしくおねがいします',  kanji:'どうぞよろしくお願(ねが)いします',  korean:'잘 부탁드립니다 (처음 만남)', english:'I look forward to working with you', tip:'명함 교환 또는 첫 만남 시 필수' },

  // ── S10: 긴급·SOS (emergency_sos) ───────────────────────
  { id:'emg_tasuke',  japanese:'たすけてください',  kanji:'助(たす)けてください',  korean:'도와주세요!',           english:'Help me! / Help!',                      tip:'위급상황 시 큰 소리로' },
  { id:'emg_byouin',  japanese:'びょういんにいきたいです', kanji:'病院(びょういん)に行(い)きたいです', korean:'병원에 가고 싶어요', english:'I want to go to a hospital' },
  { id:'emg_keisatsu',japanese:'けいさつ',           kanji:'警察(けいさつ)',          korean:'경찰',                  english:'Police' },
  { id:'emg_guai',    japanese:'きぶんがわるいです', kanji:'気分(きぶん)が悪(わる)いです', korean:'몸이 안 좋아요',   english:'I feel sick / I don\'t feel well' },
  { id:'emg_kusuri',  japanese:'くすりはありますか', kanji:'薬(くすり)はありますか',  korean:'약이 있나요?',          english:'Do you have medicine?',                  example:'긴급 상황에서 약을 찾을 때' },
  { id:'emg_nakushi', japanese:'〜をなくしました',   kanji:'〜をなくしました',        korean:'〜을 잃어버렸어요',     english:'I lost my ~',                           example:'パスポートをなくしました' },
  { id:'emg_taishi',  japanese:'たいしかん',         kanji:'大使館(たいしかん)',      korean:'대사관 (한국대사관)',   english:'Embassy' },
  { id:'emg_hoken',   japanese:'りょこうほけん',     kanji:'旅行保険(りょこうほけん)', korean:'여행 보험',            english:'Travel insurance',                      tip:'해외여행 필수! 여행 전 가입 권장' },

  // ══════════════════════════════════════════════════════════
  //  실전 시뮬레이션 — 음식·쇼핑·교통·호텔·편의점
  // ══════════════════════════════════════════════════════════

  // ── 음식 주문 (sim_food_order) ──
  { id:'so_1',  japanese:'すみません、注文(ちゅうもん)お願(ねが)いします',  korean:'저기요, 주문할게요',         english:'Excuse me, I\'d like to order',     tip:'손을 살짝 들며 말하면 자연스러움' },
  { id:'so_2',  japanese:'メニューをください',                               korean:'메뉴 주세요',                english:'Could I have a menu please?' },
  { id:'so_3',  japanese:'これをひとつお願(ねが)いします',                  korean:'이거 하나 주세요',           english:'One of this please',               tip:'ふたつ(2개), みっつ(3개)로 수량 변경' },
  { id:'so_4',  japanese:'おすすめは何(なん)ですか',                        korean:'추천 메뉴는 뭐예요?',        english:'What do you recommend?' },
  { id:'so_5',  japanese:'辛(から)くしないでください',                      korean:'맵지 않게 해주세요',         english:'Please don\'t make it spicy',      tip:'アレルギーがあります = 알레르기가 있어요' },
  { id:'so_6',  japanese:'お水(みず)をください',                            korean:'물 주세요',                  english:'Water please',                     tip:'일본 식당은 물이 보통 무료' },
  { id:'so_7',  japanese:'お会計(かいけい)お願(ねが)いします',              korean:'계산해 주세요',              english:'Check please / Bill please' },
  { id:'so_8',  japanese:'別々(べつべつ)にお願(ねが)いします',             korean:'따로따로 계산해 주세요',     english:'Separate checks please' },
  { id:'so_9',  japanese:'持(も)ち帰(かえ)りでお願(ねが)いします',        korean:'포장해 주세요',              english:'To go please / Takeout please',    tip:'テイクアウト도 통함' },
  { id:'so_10', japanese:'ごちそうさまでした',                              korean:'잘 먹었습니다',              english:'Thank you for the meal (after eating)', tip:'식사 후 인사 — 가게 나갈 때 필수!' },

  // ── 쇼핑 (sim_shopping) ──
  { id:'ss_1',  japanese:'これはいくらですか',                              korean:'이거 얼마예요?',             english:'How much is this?' },
  { id:'ss_2',  japanese:'見(み)ているだけです',                            korean:'그냥 보는 중이에요',         english:'I\'m just looking',                tip:'점원이 말 걸 때 부담 없이' },
  { id:'ss_3',  japanese:'試着(しちゃく)してもいいですか',                  korean:'입어봐도 되나요?',           english:'May I try this on?' },
  { id:'ss_4',  japanese:'もう少(すこ)し安(やす)くなりますか',             korean:'좀 더 싸게 되나요?',         english:'Can you make it a little cheaper?' },
  { id:'ss_5',  japanese:'カードで払(はら)えますか',                        korean:'카드로 결제 되나요?',        english:'Can I pay by credit card?',        tip:'現金(げんきん)のみ = 현금만' },
  { id:'ss_6',  japanese:'免税(めんぜい)になりますか',                      korean:'면세 되나요?',               english:'Is this tax-free?',                tip:'パスポートを見(み)せてください = 여권 보여주세요' },
  { id:'ss_7',  japanese:'Sサイズはありますか',                             korean:'S사이즈 있나요?',             english:'Do you have size S?' },
  { id:'ss_8',  japanese:'色違(いろちが)いはありますか',                    korean:'다른 색 있나요?',             english:'Do you have it in another color?' },
  { id:'ss_9',  japanese:'プレゼント用(よう)に包(つつ)んでください',        korean:'선물용으로 포장해 주세요',   english:'Please wrap it as a gift',         tip:'일본은 포장 문화가 발달' },
  { id:'ss_10', japanese:'袋(ふくろ)をください',                            korean:'봉투 주세요',                english:'A bag please',                     tip:'일본은 봉투가 유료 (3~5엔)' },

  // ── 가리키기 (sim_pointing) ──
  { id:'sp_1',  japanese:'これをください',                                  korean:'이거 주세요',                english:'I\'ll take this / Give me this',   tip:'가장 만능인 쇼핑 표현!' },
  { id:'sp_2',  japanese:'それは何(なん)ですか',                            korean:'그건 뭐예요?',               english:'What is that?' },
  { id:'sp_3',  japanese:'あれをお願(ねが)いします',                        korean:'저거 부탁합니다',            english:'That one over there please' },
  { id:'sp_4',  japanese:'こっちの方(ほう)がいいです',                      korean:'이쪽이 더 좋아요',           english:'This one is better / I prefer this one' },
  { id:'sp_5',  japanese:'どれがおすすめですか',                            korean:'어떤 게 추천이에요?',        english:'Which one do you recommend?' },
  { id:'sp_6',  japanese:'もう少(すこ)し大(おお)きいのはありますか',        korean:'좀 더 큰 거 있나요?',        english:'Do you have a larger one?' },
  { id:'sp_7',  japanese:'写真(しゃしん)を撮(と)ってもいいですか',         korean:'사진 찍어도 되나요?',        english:'May I take a photo?' },
  { id:'sp_8',  japanese:'これとこれをください',                            korean:'이거랑 이거 주세요',         english:'I\'ll take this one and this one' },
  { id:'sp_9',  japanese:'ここに書(か)いてください',                        korean:'여기에 써 주세요',           english:'Please write it here' },
  { id:'sp_10', japanese:'日本語(にほんご)がわかりません',                  korean:'일본어를 모르겠어요',        english:'I don\'t understand Japanese' },

  // ── 택시 (sim_taxi) ──
  { id:'stx_1',  japanese:'ここまでお願(ねが)いします',                     korean:'여기까지 부탁합니다',        english:'Please take me here',              tip:'지도나 주소를 보여주며' },
  { id:'stx_2',  japanese:'この住所(じゅうしょ)までお願(ねが)いします',     korean:'이 주소까지 부탁합니다',     english:'Please take me to this address' },
  { id:'stx_3',  japanese:'だいたいいくらぐらいですか',                      korean:'대략 얼마 정도예요?',        english:'About how much will it cost?' },
  { id:'stx_4',  japanese:'急(いそ)いでください',                            korean:'서둘러 주세요',              english:'Please hurry' },
  { id:'stx_5',  japanese:'ここで降(お)ろしてください',                      korean:'여기서 내려 주세요',         english:'Please drop me off here' },
  { id:'stx_6',  japanese:'トランクを開(あ)けてください',                    korean:'트렁크 열어 주세요',         english:'Please open the trunk' },
  { id:'stx_7',  japanese:'領収書(りょうしゅうしょ)をください',              korean:'영수증 주세요',              english:'A receipt please' },
  { id:'stx_8',  japanese:'カードで支払(しはら)えますか',                    korean:'카드로 결제 가능한가요?',    english:'Can I pay by card?' },
  { id:'stx_9',  japanese:'まっすぐ行(い)ってください',                      korean:'직진해 주세요',              english:'Please go straight' },
  { id:'stx_10', japanese:'あそこで止(と)めてください',                      korean:'저기서 세워 주세요',         english:'Please stop over there' },

  // ── 버스 (sim_bus) ──
  { id:'sb_1',  japanese:'このバスは〜に行(い)きますか',                     korean:'이 버스 ~에 가나요?',        english:'Does this bus go to ~?' },
  { id:'sb_2',  japanese:'次(つぎ)の停留所(ていりゅうじょ)で降(お)ります', korean:'다음 정류장에서 내릴게요',    english:'I\'m getting off at the next stop' },
  { id:'sb_3',  japanese:'一日乗車券(いちにちじょうしゃけん)はありますか',  korean:'1일 승차권 있나요?',         english:'Do you have a one-day pass?' },
  { id:'sb_4',  japanese:'バス停(てい)はどこですか',                         korean:'버스 정류장 어디예요?',      english:'Where is the bus stop?' },
  { id:'sb_5',  japanese:'何番(なんばん)のバスですか',                       korean:'몇 번 버스예요?',            english:'Which bus number is it?' },
  { id:'sb_6',  japanese:'整理券(せいりけん)を取(と)ってください',           korean:'정리권을 뽑아주세요',        english:'Please take a numbered ticket' },
  { id:'sb_7',  japanese:'両替(りょうがえ)はできますか',                     korean:'환전/잔돈 교환 되나요?',     english:'Can you make change?' },
  { id:'sb_8',  japanese:'終点(しゅうてん)まで行(い)きます',                 korean:'종점까지 갑니다',            english:'Going to the last stop' },
  { id:'sb_9',  japanese:'降(お)りる時(とき)に払(はら)いますか',            korean:'내릴 때 내나요?',            english:'Do I pay when I get off?' },
  { id:'sb_10', japanese:'このバスの時刻表(じこくひょう)はありますか',       korean:'이 버스 시간표 있나요?',     english:'Is there a timetable for this bus?' },

  // ── 지하철 (sim_subway) ──
  { id:'sw_1',  japanese:'〜線(せん)はどこですか',                           korean:'~호선은 어디예요?',          english:'Where is the ~ line?' },
  { id:'sw_2',  japanese:'乗(の)り換(か)えはどこですか',                     korean:'환승은 어디서 하나요?',      english:'Where do I transfer?' },
  { id:'sw_3',  japanese:'切符(きっぷ)を買(か)いたいです',                   korean:'표를 사고 싶어요',           english:'I\'d like to buy a ticket' },
  { id:'sw_4',  japanese:'ICカードにチャージしたいです',                      korean:'IC카드 충전하고 싶어요',     english:'I\'d like to charge my IC card' },
  { id:'sw_5',  japanese:'この電車(でんしゃ)は〜に止(と)まりますか',         korean:'이 전철 ~에 서나요?',        english:'Does this train stop at ~?' },
  { id:'sw_6',  japanese:'急行(きゅうこう)と各停(かくてい)、どちらが早(はや)いですか', korean:'급행과 각역정차, 어느 게 빨라요?', english:'Which is faster, express or local?' },
  { id:'sw_7',  japanese:'出口(でぐち)はどちらですか',                        korean:'출구는 어느 쪽인가요?',     english:'Which way is the exit?' },
  { id:'sw_8',  japanese:'終電(しゅうでん)は何時(なんじ)ですか',             korean:'막차가 몇 시예요?',          english:'What time is the last train?' },
  { id:'sw_9',  japanese:'ホームはどこですか',                                korean:'플랫폼은 어디예요?',         english:'Where is the platform?' },
  { id:'sw_10', japanese:'反対方向(はんたいほうこう)に乗(の)ってしまいました', korean:'반대 방향으로 타버렸어요',  english:'I got on going the wrong direction' },

  // ── 엘리베이터 (sim_elevator) ──
  { id:'se_1',  japanese:'何階(なんがい)ですか',                             korean:'몇 층이에요?',               english:'What floor?' },
  { id:'se_2',  japanese:'開(あ)けてください',                               korean:'(문) 열어 주세요',           english:'Please open (the door)' },
  { id:'se_3',  japanese:'閉(し)めないでください',                           korean:'닫지 마세요',                english:'Please don\'t close it' },
  { id:'se_4',  japanese:'地下一階(ちかいっかい)をお願(ねが)いします',       korean:'지하 1층 부탁합니다',        english:'Basement level 1 please' },
  { id:'se_5',  japanese:'屋上(おくじょう)はありますか',                      korean:'옥상 있나요?',               english:'Is there a rooftop?' },
  { id:'se_6',  japanese:'エスカレーターはどこですか',                        korean:'에스컬레이터 어디예요?',     english:'Where is the escalator?' },
  { id:'se_7',  japanese:'上(うえ)に行(い)きます',                           korean:'위로 올라갑니다',            english:'Going up' },
  { id:'se_8',  japanese:'すみません、降(お)ります',                         korean:'실례합니다, 내립니다',       english:'Excuse me, I\'m getting off' },

  // ── 룸서비스 (sim_roomservice) ──
  { id:'sr_1',  japanese:'ルームサービスをお願(ねが)いします',               korean:'룸서비스 부탁합니다',        english:'Room service please' },
  { id:'sr_2',  japanese:'部屋(へや)まで届(とど)けてください',              korean:'방까지 배달해 주세요',       english:'Please deliver it to my room' },
  { id:'sr_3',  japanese:'タオルを持(も)ってきてください',                   korean:'수건 가져다 주세요',         english:'Please bring me a towel' },
  { id:'sr_4',  japanese:'氷(こおり)をお願(ねが)いします',                  korean:'얼음 부탁합니다',            english:'Ice please' },
  { id:'sr_5',  japanese:'朝食(ちょうしょく)は何時(なんじ)からですか',      korean:'조식은 몇 시부터예요?',     english:'What time does breakfast start?' },
  { id:'sr_6',  japanese:'エアコンが効(き)きません',                         korean:'에어컨이 안 돼요',           english:'The air conditioner isn\'t working' },
  { id:'sr_7',  japanese:'お湯(ゆ)が出(で)ません',                          korean:'뜨거운 물이 안 나와요',      english:'Hot water isn\'t coming out' },
  { id:'sr_8',  japanese:'Wi-Fiのパスワードは何(なん)ですか',               korean:'와이파이 비밀번호 뭐예요?',  english:'What is the Wi-Fi password?' },

  // ── 전화 (sim_phone) ──
  { id:'sph_1', japanese:'もしもし',                                          korean:'여보세요',                   english:'Hello (answering the phone)',       tip:'전화 받을 때/걸 때 첫마디' },
  { id:'sph_2', japanese:'もう一度(いちど)お願(ねが)いします',               korean:'한 번 더 말씀해 주세요',     english:'Could you say that again?' },
  { id:'sph_3', japanese:'日本語(にほんご)があまり話(はな)せません',         korean:'일본어를 잘 못해요',         english:'I can\'t speak much Japanese' },
  { id:'sph_4', japanese:'予約(よやく)をしたいのですが',                     korean:'예약을 하고 싶은데요',       english:'I\'d like to make a reservation' },
  { id:'sph_5', japanese:'キャンセルしたいのですが',                          korean:'취소하고 싶은데요',          english:'I\'d like to cancel' },
  { id:'sph_6', japanese:'電話番号(でんわばんごう)を教(おし)えてください',   korean:'전화번호 알려주세요',        english:'Please tell me your phone number' },
  { id:'sph_7', japanese:'少々(しょうしょう)お待(ま)ちください',             korean:'잠시만 기다려 주세요',       english:'Please hold on a moment',          tip:'상대방이 말하는 표현 (이해용)' },
  { id:'sph_8', japanese:'また電話(でんわ)します',                            korean:'다시 전화할게요',            english:'I\'ll call again' },

  // ── 체크인 (sim_checkin) ──
  { id:'sci_1',  japanese:'チェックインお願(ねが)いします',                  korean:'체크인 부탁합니다',          english:'I\'d like to check in' },
  { id:'sci_2',  japanese:'予約(よやく)した〜です',                           korean:'예약한 ~입니다',             english:'I have a reservation under ~ (name)' },
  { id:'sci_3',  japanese:'パスポートはこちらです',                           korean:'여권 여기 있습니다',         english:'Here is my passport' },
  { id:'sci_4',  japanese:'禁煙(きんえん)の部屋(へや)でお願(ねが)いします', korean:'금연 방으로 부탁합니다',     english:'A non-smoking room please' },
  { id:'sci_5',  japanese:'もう少(すこ)し上(うえ)の階(かい)がいいのですが', korean:'좀 더 높은 층이면 좋겠는데요', english:'I\'d prefer a higher floor if possible' },
  { id:'sci_6',  japanese:'朝食(ちょうしょく)は付(つ)いていますか',          korean:'조식 포함인가요?',           english:'Is breakfast included?' },
  { id:'sci_7',  japanese:'何時(なんじ)まで開(あ)いていますか',              korean:'몇 시까지 열려 있나요?',     english:'What time are you open until?' },
  { id:'sci_8',  japanese:'荷物(にもつ)を先(さき)に預(あず)けられますか',   korean:'짐을 먼저 맡길 수 있나요?', english:'Can I leave my luggage here first?' },
  { id:'sci_9',  japanese:'近(ちか)くにコンビニはありますか',                korean:'근처에 편의점 있나요?',      english:'Is there a convenience store nearby?' },
  { id:'sci_10', japanese:'部屋(へや)の鍵(かぎ)をもらえますか',             korean:'방 열쇠 받을 수 있나요?',    english:'Could I have my room key?' },

  // ── 체크아웃 (sim_checkout) ──
  { id:'sco_1', japanese:'チェックアウトお願(ねが)いします',                 korean:'체크아웃 부탁합니다',        english:'I\'d like to check out' },
  { id:'sco_2', japanese:'荷物(にもつ)を預(あず)かってもらえますか',         korean:'짐 좀 맡아주실 수 있나요?', english:'Could you store my luggage?' },
  { id:'sco_3', japanese:'レイトチェックアウトはできますか',                  korean:'늦은 체크아웃 가능한가요?', english:'Is late checkout possible?' },
  { id:'sco_4', japanese:'タクシーを呼(よ)んでいただけますか',               korean:'택시 불러주실 수 있나요?',   english:'Could you call a taxi for me?' },
  { id:'sco_5', japanese:'明細書(めいさいしょ)をください',                    korean:'명세서 주세요',              english:'Could I have the itemized bill?' },
  { id:'sco_6', japanese:'忘(わす)れ物(もの)をしました',                     korean:'잊어버린 물건이 있어요',     english:'I left something behind' },
  { id:'sco_7', japanese:'空港(くうこう)までどのくらいかかりますか',          korean:'공항까지 얼마나 걸려요?',    english:'How long does it take to the airport?' },
  { id:'sco_8', japanese:'楽(たの)しかったです、ありがとうございます',        korean:'즐거웠어요, 감사합니다',     english:'I had a great time, thank you' },

  // ── 화장실 (sim_toilet) ──
  { id:'stl_1', japanese:'トイレはどこですか',                               korean:'화장실 어디예요?',           english:'Where is the restroom?' },
  { id:'stl_2', japanese:'お手洗(てあら)いをお借(か)りできますか',           korean:'화장실 좀 빌릴 수 있나요?', english:'May I use your restroom?' },
  { id:'stl_3', japanese:'多目的(たもくてき)トイレはありますか',             korean:'다목적 화장실 있나요?',      english:'Is there an accessible/multipurpose restroom?' },
  { id:'stl_4', japanese:'トイレットペーパーがありません',                    korean:'화장지가 없어요',            english:'There is no toilet paper' },
  { id:'stl_5', japanese:'水(みず)が流(なが)れません',                       korean:'물이 안 내려가요',           english:'The water won\'t flush' },
  { id:'stl_6', japanese:'ウォシュレットの使(つか)い方(かた)がわかりません', korean:'비데 사용법을 모르겠어요',   english:'I don\'t know how to use the washlet (bidet)' },
  { id:'stl_7', japanese:'女性用(じょせいよう)はどちらですか',               korean:'여성용은 어느 쪽인가요?',    english:'Which one is for women?' },
  { id:'stl_8', japanese:'並(なら)んでいますか',                             korean:'줄 서 있는 건가요?',         english:'Is this a queue / Are you in line?' },

  // ── 흡연 (sim_smoking) ──
  { id:'smk_1', japanese:'喫煙所(きつえんじょ)はどこですか',                 korean:'흡연실 어디예요?',           english:'Where is the smoking area?' },
  { id:'smk_2', japanese:'ここで吸(す)ってもいいですか',                      korean:'여기서 피워도 되나요?',      english:'May I smoke here?' },
  { id:'smk_3', japanese:'タバコをください',                                  korean:'담배 주세요',                english:'Cigarettes please' },
  { id:'smk_4', japanese:'ライターはありますか',                              korean:'라이터 있나요?',             english:'Do you have a lighter?' },
  { id:'smk_5', japanese:'灰皿(はいざら)はありますか',                        korean:'재떨이 있나요?',             english:'Is there an ashtray?' },
  { id:'smk_6', japanese:'喫煙席(きつえんせき)はありますか',                  korean:'흡연석 있나요?',             english:'Do you have a smoking section?' },
  { id:'smk_7', japanese:'加熱式(かねつしき)タバコは使(つか)えますか',       korean:'전자담배 사용 가능한가요?',  english:'Can I use heated tobacco products here?' },
  { id:'smk_8', japanese:'外(そと)で吸(す)ってきます',                        korean:'밖에서 피우고 올게요',       english:'I\'ll go smoke outside' },

  // ── 편의점 (sim_conveni) ──
  { id:'scv_1',  japanese:'温(あたた)めてください',                           korean:'데워 주세요',                english:'Please heat this up',              tip:'お弁当(べんとう) = 도시락' },
  { id:'scv_2',  japanese:'袋(ふくろ)はいりません',                           korean:'봉투 필요 없어요',           english:'I don\'t need a bag' },
  { id:'scv_3',  japanese:'お箸(はし)をください',                             korean:'젓가락 주세요',              english:'Chopsticks please' },
  { id:'scv_4',  japanese:'ATMはどこですか',                                  korean:'ATM 어디예요?',              english:'Where is the ATM?',               tip:'일본 편의점 ATM은 해외카드 사용 가능' },
  { id:'scv_5',  japanese:'チケットの支払(しはら)いをしたいです',             korean:'티켓 결제를 하고 싶어요',    english:'I\'d like to pay for a ticket' },
  { id:'scv_6',  japanese:'コピーをしたいです',                               korean:'복사를 하고 싶어요',         english:'I\'d like to make a copy' },
  { id:'scv_7',  japanese:'宅配便(たくはいびん)を送(おく)りたいです',        korean:'택배를 보내고 싶어요',       english:'I\'d like to send a parcel' },
  { id:'scv_8',  japanese:'トイレを借(か)りてもいいですか',                   korean:'화장실 빌려도 되나요?',      english:'May I use the restroom?' },
  { id:'scv_9',  japanese:'ポイントカードはお持(も)ちですか',                 korean:'포인트 카드 가지고 계세요?', english:'Do you have a points card?',       tip:'점원이 묻는 표현. ないです = 없어요' },
  { id:'scv_10', japanese:'これは何味(なにあじ)ですか',                       korean:'이거 무슨 맛이에요?',        english:'What flavor is this?' },

  // ── S6 추가: 몸 상태·건강 (health) ──────────────────────
  { id:'hlth_itai',     japanese:'〜がいたいです',               kanji:'〜が痛(いた)いです',          korean:'〜가 아파요',             english:'My ~ hurts',                            tip:'あたまがいたい = 머리가 아파요' },
  { id:'hlth_netsu',    japanese:'ねつがあります',               kanji:'熱(ねつ)があります',          korean:'열이 있어요',             english:'I have a fever' },
  { id:'hlth_kaze',     japanese:'かぜをひきました',             kanji:'風邪(かぜ)を引(ひ)きました', korean:'감기에 걸렸어요',         english:'I caught a cold' },
  { id:'hlth_isha',     japanese:'いしゃにみてもらいたいです',   kanji:'医者(いしゃ)に見(み)てもらいたいです', korean:'의사에게 진찰받고 싶어요', english:'I\'d like to see a doctor' },
  { id:'hlth_daijob',   japanese:'だいじょうぶですか',           kanji:'大丈夫(だいじょうぶ)ですか', korean:'괜찮으세요?',             english:'Are you okay?',                         tip:'상대방 상태를 확인할 때' },
  { id:'hlth_suimin',   japanese:'よくねられません',             kanji:'よく眠(ね)られません',        korean:'잘 못자겠어요',          english:'I can\'t sleep well',                   tip:'시차 적응 중일 때 유용' },
  { id:'hlth_kyuu',     japanese:'きゅうきゅうしゃをよんでください', kanji:'救急車(きゅうきゅうしゃ)を呼(よ)んでください', korean:'구급차를 불러주세요', english:'Please call an ambulance', tip:'일본 응급번호 119' },

  // ── ドラマ・放送 頻出表現 (drama_broadcast) ─────────────
  //  드라마·방송 빈출 표현 (useful for watching Japanese media)
  { id:'drama_doiu',        japanese:'どういうこと？',                                          korean:'무슨 말이야? / 어떻게 된 거야?', english:'What does that mean? / What\'s going on?', tip:'드라마에서 혼란·충격 장면에 매우 자주 등장' },
  { id:'drama_shinjirarenai', japanese:'信(しん)じられない',                                    korean:'믿을 수 없어',                 english:'I can\'t believe it / Unbelievable',        tip:'배신·충격 장면의 핵심 대사. 여성 사용 多' },
  { id:'drama_daijoubu',    japanese:'大丈夫(だいじょうぶ)？',                                  korean:'괜찮아?',                      english:'Are you okay? / Are you alright?',          tip:'걱정·확인. 부드럽게 묻는 장면에서 자주 등장' },
  { id:'drama_kinishide',   japanese:'気(き)にしないで',                                        korean:'신경 쓰지 마',                 english:'Don\'t worry about it / Forget it',         tip:'상대를 위로하거나 사과를 받아줄 때' },
  { id:'drama_kimatteru',   japanese:'〜に決(き)まってる',                                      korean:'〜가 당연하지 / 〜임이 틀림없어', english:'It\'s obviously ~ / Of course it\'s ~',    tip:'확신·비꼬는 뉘앙스 모두 가능. 「そうに決まってる！」' },
  { id:'drama_hottoite',    japanese:'ほっといて',                                              korean:'내버려 둬 / 상관하지 마',       english:'Leave me alone / Stay out of it',           tip:'감정적 거부 표현. 「ほっといてよ！」여성 사용 多' },
  { id:'drama_nande',       japanese:'なんで？',                                                korean:'왜?',                          english:'Why? / How come?',                          tip:'캐주얼. 「なんでそんなこと言うの？」' },
  { id:'drama_shiranai',    japanese:'知(し)らない',                                            korean:'몰라 / 모르겠어 / 상관없어',   english:'I don\'t know / I don\'t care',             tip:'모른다는 뜻과 "알 바 아니야"는 뜻 모두 가능' },
  { id:'drama_uso',         japanese:'うそ！',                                                  korean:'말도 안 돼! / 설마!',          english:'No way! / Seriously? / You\'re kidding!',   tip:'놀람 표현. 「うそ！本当(ほんとう)に？」여성·남성 모두' },
  { id:'drama_sonakotona',  japanese:'そんなことない',                                          korean:'그런 거 아니야 / 아니에요',    english:'That\'s not true / Not at all',             tip:'부정·겸손 모두. 「そんなことないよ、すごいじゃん」' },
  { id:'drama_tekureru',    japanese:'〜てくれる？',                                            korean:'〜해 줄 수 있어?',             english:'Can you ~ for me? / Will you ~?',           tip:'부탁할 때 가장 자연스러운 표현. 「待(ま)っててくれる？」' },
  { id:'drama_tasukete',    japanese:'助(たす)けて！',                                          korean:'도와줘!',                      english:'Help me!',                                  tip:'긴급 상황 또는 감정적으로 구조 요청. 드라마 클라이맥스 표현' },
  { id:'drama_sukida',      japanese:'好(す)きだ',                                              korean:'좋아해 (고백)',                english:'I like you / I love you (confession)',       tip:'남성 직접 고백 표현. 여성은 好きです 또는 好きだよ를 더 많이 사용' },
  { id:'drama_wakareyou',   japanese:'別(わか)れよう',                                          korean:'헤어지자',                    english:'Let\'s break up',                           tip:'연인 관계 종료. 여성형: 別(わか)れましょう. 드라마 이별 장면 필수' },
  { id:'drama_aitai',       japanese:'会(あ)いたい',                                            korean:'보고 싶어',                   english:'I want to see you',                         tip:'그리움 표현. 「ずっと会いたかった」= 계속 보고 싶었어' },
];
