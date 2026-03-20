// ============================================================
//  문장·시뮬레이션 항목 — S6~S10 + 모든 실전 시뮬레이션
// ============================================================
const VOCAB_ITEMS_S6SIM = [

  // ── S6: 교통·이동 (transport_phrases) ───────────────────
  { id:'td_shink',     japanese:'しんかんせん',    kanji:'新幹線',    romaji:'shinkansen',   korean:'신칸센 (고속철도)', tip:'のぞみ·ひかり·こだま 등 종류가 있음' },
  { id:'td_jiyuuseki', japanese:'じゆうせき',      kanji:'自由席',    romaji:'jiyuuseki',    korean:'자유석',           tip:'していせき(指定席) = 지정석, 요금 차이 있음' },
  { id:'td_suica',     japanese:'スイカ',           romaji:'suika',    korean:'스이카 IC카드',                            tip:'PASMO도 동일하게 사용 가능. 편의점도 OK!' },
  { id:'td_kippu',     japanese:'きっぷ',           kanji:'切符',      romaji:'kippu',        korean:'표 (승차권)',       example:'きっぷをかいたい = 표를 사고 싶어요' },
  { id:'td_norikae',   japanese:'のりかえ',         kanji:'乗り換え',  romaji:'norikae',      korean:'환승',              tip:'のりかえはどこですか = 환승은 어디서 해요?' },
  { id:'td_yuki',      japanese:'〜ゆき',           kanji:'〜行き',    romaji:'~yuki',        korean:'〜행 (방향)',        example:'とうきょうゆき = 도쿄행' },
  { id:'td_noriba',    japanese:'のりば',           kanji:'乗り場',    romaji:'noriba',       korean:'승강장 / 탑승장',   tip:'バスのりば = 버스 승강장' },
  { id:'td_jikanhyo',  japanese:'じかんひょう',     kanji:'時刻表',    romaji:'jikanhyou',    korean:'시간표',            example:'しかんひょうをみてください = 시간표를 보세요' },
  { id:'td_maniau',    japanese:'まにあいますか',   kanji:'間に合いますか', romaji:'maniau masu ka', korean:'시간에 맞을까요?', tip:'버스·기차 놓칠 것 같을 때' },
  { id:'td_taxi',      japanese:'タクシーをよんでください', romaji:'takushii wo yonde kudasai', korean:'택시 불러 주세요', example:'ホテルまでおねがいします = 호텔까지 가주세요' },
  { id:'td_teiryu',    japanese:'ていりゅうじょ',   kanji:'停留所',    romaji:'teiryuujo',    korean:'정류장 (버스)',      tip:'バスていりゅうじょはどこですか = 버스 정류장 어디예요?' },
  { id:'td_madogawa',  japanese:'まどがわのせき',   kanji:'窓側の席',  romaji:'madogawa no seki', korean:'창가석',        tip:'つうろがわのせき(通路側の席) = 복도석' },

  // ── S7: 쇼핑 (shopping_phrases) ─────────────────────────
  { id:'res_baggu',    japanese:'ふくろ',                       kanji:'袋',    romaji:'fukuro',               korean:'봉투 (가방)',       example:'ふくろいりますか = 봉투 필요하세요?' },
  { id:'res_omiyage',  japanese:'おみやげ',                     kanji:'お土産', romaji:'omiyage',              korean:'기념품 / 선물' },
  { id:'res_ikaga',    japanese:'〜はいかがですか',             romaji:'~wa ikaga desu ka',    korean:'〜는 어떠세요? (권유)', tip:'점원이 자주 사용하는 표현' },
  { id:'res_nokori',   japanese:'これ、のこりはいくつですか',   romaji:'kore nokori wa ikutsu', korean:'이거 재고가 얼마나 남았어요?' },
  { id:'res_saizu',    japanese:'サイズ',                        romaji:'saizu',                korean:'사이즈 (치수)' },
  { id:'res_discount', japanese:'まけてもらえますか',           romaji:'makete moraemasu ka',  korean:'깎아 주실 수 있어요?', tip:'백화점보다 시장에서 유효' },
  { id:'res_takai',    japanese:'すこしたかいですね',           romaji:'sukoshi takai desu ne', korean:'조금 비싸네요',       tip:'가격 흥정 첫 마디' },
  { id:'res_yasuku',   japanese:'もうすこしやすくなりますか',   romaji:'mou sukoshi yasuku narimasu ka', korean:'조금 더 싸게 될까요?' },

  // ── S8: 호텔·숙박 (hotel_phrases) ───────────────────────
  { id:'ht_checkin',    japanese:'チェックイン',                  romaji:'chekku in',                           korean:'체크인' },
  { id:'ht_checkout',   japanese:'チェックアウト',                romaji:'chekku auto',                         korean:'체크아웃',           example:'なんじにチェックアウトですか = 몇 시에 체크아웃인가요?' },
  { id:'ht_yoyaku',     japanese:'よやくをしています',            kanji:'予約をしています',                     romaji:'yoyaku wo shite imasu', korean:'예약하셨어요 (나)',   tip:'フロントで = 프론트에서 쓰는 표현' },
  { id:'ht_goushitsu',  japanese:'なんごうしつですか',            kanji:'何号室ですか',                         romaji:'nan goushitsu desu ka', korean:'몇 호실인가요?',     example:'ごひゃくさんごうしつです = 503호실이에요' },
  { id:'ht_choshoku',   japanese:'あさごはんはつきますか',        kanji:'朝ごはんはつきますか',                 romaji:'asagohan wa tsukimasu ka', korean:'조식 포함인가요?',  tip:'조식 포함=ちょうしょくつき, 미포함=なし' },
  { id:'ht_kagi',       japanese:'かぎをなくしました',            kanji:'鍵をなくしました',                     romaji:'kagi wo nakushimashita', korean:'열쇠를 잃어버렸어요' },
  { id:'ht_taoru',      japanese:'タオルをください',              romaji:'taoru wo kudasai',                    korean:'수건 주세요',          example:'もういちまいタオルをください = 수건 한 장 더 주세요' },
  { id:'ht_moningcall', japanese:'モーニングコールをおねがいします', romaji:'mooningu kooru wo onegaishimasu',  korean:'모닝콜 부탁드려요',     example:'しちじにおねがいします = 7시로 부탁해요' },
  { id:'ht_room',       japanese:'ルームサービス',                romaji:'ruumu saabisu',                       korean:'룸서비스' },
  { id:'ht_elevator',   japanese:'エレベーター',                  romaji:'erebeetaa',                           korean:'엘리베이터' },
  { id:'ht_laundry',    japanese:'コインランドリー',              romaji:'koin randorii',                       korean:'코인 세탁기' },
  { id:'ht_lobby',      japanese:'ロビー',                        romaji:'robii',                               korean:'로비',                  example:'ロビーでまっています = 로비에서 기다릴게요' },
  { id:'ht_extend',     japanese:'チェックアウトをのばせますか',  romaji:'chekku auto wo nobasemasu ka',        korean:'체크아웃을 연장할 수 있나요?', tip:'もう一泊お願いしたい = 하룻밤 더 묵고 싶어요' },

  // ── S9: 스몰토크·감정 (small_talk) ──────────────────────
  { id:'st_hisashiburi', japanese:'おひさしぶりです',             kanji:'お久しぶりです',              romaji:'o hisashiburi desu',           korean:'오랜만이에요',        tip:'친구나 아는 사람을 오래만에 만났을 때' },
  { id:'st_ogenki',      japanese:'おげんきですか',               kanji:'お元気ですか',                romaji:'o genki desu ka',              korean:'잘 지내세요?',        example:'はい、げんきです = 네, 잘 지냈어요' },
  { id:'st_tenki',       japanese:'きょうはいいてんきですね',     kanji:'今日はいい天気ですね',        romaji:'kyou wa ii tenki desu ne',     korean:'오늘 날씨 좋죠?',     tip:'일본에서 날씨 스몰토크는 기본!' },
  { id:'st_atsui',       japanese:'あついですね',                 kanji:'暑いですね',                  romaji:'atsui desu ne',                korean:'덥네요',              tip:'さむいですね = 춥네요' },
  { id:'st_samui',       japanese:'さむいですね',                 kanji:'寒いですね',                  romaji:'samui desu ne',                korean:'춥네요' },
  { id:'st_shumi',       japanese:'しゅみはなんですか',           kanji:'趣味は何ですか',              romaji:'shumi wa nan desu ka',         korean:'취미가 뭐예요?',      example:'わたしのしゅみはりょこうです = 취미는 여행이에요' },
  { id:'st_suki',        japanese:'〜がすきです',                 kanji:'〜が好きです',                romaji:'~ga suki desu',                korean:'〜을/를 좋아해요' },
  { id:'st_tanoshii',    japanese:'たのしいですね！',             kanji:'楽しいですね！',              romaji:'tanoshii desu ne',             korean:'즐겁네요! 재미있어요!', tip:'여행·파티 등에서 자주 쓰임' },
  { id:'st_sugoi',       japanese:'すごいですね！',                romaji:'sugoi desu ne',              korean:'대단하네요! 굉장해요!' },
  { id:'st_taihen',      japanese:'たいへんですね',               kanji:'大変ですね',                  romaji:'taihen desu ne',               korean:'힘들겠네요 / 고생이에요', tip:'상대방을 위로할 때 사용' },
  { id:'st_mata',        japanese:'またあいましょう！',            kanji:'また会いましょう！',          romaji:'mata aimashou',                korean:'또 만나요!',           tip:'헤어질 때 자주 쓰는 인사' },
  { id:'st_omedetou',    japanese:'おめでとうございます',          romaji:'omedetou gozaimasu',         korean:'축하합니다!',                   tip:'생일, 합격, 결혼 등에 사용' },
  { id:'st_issho',       japanese:'いっしょにいきましょう！',      kanji:'一緒に行きましょう！',        romaji:'issho ni ikimashou',           korean:'같이 가요!',           example:'しょくじにいきましょう = 식사하러 가요' },
  { id:'st_nani',        japanese:'なにがたべたいですか',          kanji:'何が食べたいですか',          romaji:'nani ga tabetai desu ka',      korean:'뭐 먹고 싶어요?',      tip:'밥 먹기 전 자주 쓰는 표현' },
  { id:'st_yoroshiku',   japanese:'どうぞよろしくおねがいします',  kanji:'どうぞよろしくお願いします', romaji:'douzo yoroshiku onegaishimasu', korean:'잘 부탁드립니다 (처음 만남)', tip:'명함 교환 또는 첫 만남 시 필수' },

  // ── S10: 긴급·SOS (emergency_sos) ───────────────────────
  { id:'emg_tasuke',  japanese:'たすけてください',  kanji:'助けてください',  romaji:'tasukete kudasai',     korean:'도와주세요!',           tip:'위급상황 시 큰 소리로' },
  { id:'emg_byouin',  japanese:'びょういん',         kanji:'病院',            romaji:'byouin',               korean:'병원' },
  { id:'emg_keisatsu',japanese:'けいさつ',           kanji:'警察',            romaji:'keisatsu',             korean:'경찰' },
  { id:'emg_guai',    japanese:'きぶんがわるいです', kanji:'気分が悪いです',  romaji:'kibun ga warui desu',  korean:'몸이 안 좋아요' },
  { id:'emg_kusuri',  japanese:'くすり',             kanji:'薬',              romaji:'kusuri',               korean:'약',                    example:'くすりはありますか = 약 있나요?' },
  { id:'emg_nakushi', japanese:'〜をなくしました',   kanji:'〜をなくしました', romaji:'~wo nakushimashita',  korean:'〜을 잃어버렸어요',     example:'パスポートをなくしました' },
  { id:'emg_taishi',  japanese:'たいしかん',         kanji:'大使館',          romaji:'taishikan',            korean:'대사관 (한국대사관)' },
  { id:'emg_hoken',   japanese:'りょこうほけん',     kanji:'旅行保険',        romaji:'ryokou hoken',         korean:'여행 보험',             tip:'해외여행 필수! 여행 전 가입 권장' },

  // ══════════════════════════════════════════════════════════
  //  실전 시뮬레이션 — 음식·쇼핑·교통·호텔·편의점
  // ══════════════════════════════════════════════════════════

  // ── 음식 주문 (sim_food_order) ──
  { id:'so_1',  japanese:'すみません、注文お願いします',      romaji:'sumimasen, chuumon onegai shimasu',  korean:'저기요, 주문할게요',         tip:'손을 살짝 들며 말하면 자연스러움' },
  { id:'so_2',  japanese:'メニューをください',                romaji:'menyuu o kudasai',                   korean:'메뉴 주세요' },
  { id:'so_3',  japanese:'これをひとつお願いします',          romaji:'kore o hitotsu onegai shimasu',      korean:'이거 하나 주세요',           tip:'ふたつ(2개), みっつ(3개)로 수량 변경' },
  { id:'so_4',  japanese:'おすすめは何ですか',                romaji:'osusume wa nan desu ka',             korean:'추천 메뉴는 뭐예요?' },
  { id:'so_5',  japanese:'辛くしないでください',              romaji:'karaku shinaide kudasai',            korean:'맵지 않게 해주세요',         tip:'アレルギーがあります = 알레르기가 있어요' },
  { id:'so_6',  japanese:'お水をください',                    romaji:'omizu o kudasai',                    korean:'물 주세요',                  tip:'일본 식당은 물이 보통 무료' },
  { id:'so_7',  japanese:'お会計お願いします',                romaji:'okaikei onegai shimasu',             korean:'계산해 주세요' },
  { id:'so_8',  japanese:'別々にお願いします',                romaji:'betsubetsu ni onegai shimasu',       korean:'따로따로 계산해 주세요' },
  { id:'so_9',  japanese:'持ち帰りでお願いします',            romaji:'mochikaeri de onegai shimasu',       korean:'포장해 주세요',              tip:'テイクアウト도 통함' },
  { id:'so_10', japanese:'ごちそうさまでした',                romaji:'gochisousama deshita',               korean:'잘 먹었습니다',              tip:'식사 후 인사 — 가게 나갈 때 필수!' },

  // ── 쇼핑 (sim_shopping) ──
  { id:'ss_1',  japanese:'これはいくらですか',                romaji:'kore wa ikura desu ka',              korean:'이거 얼마예요?' },
  { id:'ss_2',  japanese:'見ているだけです',                  romaji:'mite iru dake desu',                 korean:'그냥 보는 중이에요',         tip:'점원이 말 걸 때 부담 없이' },
  { id:'ss_3',  japanese:'試着してもいいですか',              romaji:'shichaku shite mo ii desu ka',       korean:'입어봐도 되나요?' },
  { id:'ss_4',  japanese:'もう少し安くなりますか',            romaji:'mou sukoshi yasuku narimasu ka',     korean:'좀 더 싸게 되나요?' },
  { id:'ss_5',  japanese:'カードで払えますか',                romaji:'kaado de haraemasu ka',              korean:'카드로 결제 되나요?',        tip:'現金(げんきん)のみ = 현금만' },
  { id:'ss_6',  japanese:'免税になりますか',                  romaji:'menzei ni narimasu ka',              korean:'면세 되나요?',               tip:'パスポートを見せてください = 여권 보여주세요' },
  { id:'ss_7',  japanese:'Sサイズはありますか',               romaji:'esu saizu wa arimasu ka',            korean:'S사이즈 있나요?' },
  { id:'ss_8',  japanese:'色違いはありますか',                romaji:'irochihai wa arimasu ka',            korean:'다른 색 있나요?' },
  { id:'ss_9',  japanese:'プレゼント用に包んでください',      romaji:'purezento you ni tsutsunde kudasai', korean:'선물용으로 포장해 주세요',   tip:'일본은 포장 문화가 발달' },
  { id:'ss_10', japanese:'袋をください',                      romaji:'fukuro o kudasai',                   korean:'봉투 주세요',                tip:'일본은 봉투가 유료 (3~5엔)' },

  // ── 가리키기 (sim_pointing) ──
  { id:'sp_1',  japanese:'これをください',                    romaji:'kore o kudasai',                     korean:'이거 주세요',                tip:'가장 만능인 쇼핑 표현!' },
  { id:'sp_2',  japanese:'それは何ですか',                    romaji:'sore wa nan desu ka',                korean:'그건 뭐예요?' },
  { id:'sp_3',  japanese:'あれをお願いします',                romaji:'are o onegai shimasu',               korean:'저거 부탁합니다' },
  { id:'sp_4',  japanese:'こっちの方がいいです',              romaji:'kocchi no hou ga ii desu',           korean:'이쪽이 더 좋아요' },
  { id:'sp_5',  japanese:'どれがおすすめですか',              romaji:'dore ga osusume desu ka',            korean:'어떤 게 추천이에요?' },
  { id:'sp_6',  japanese:'もう少し大きいのはありますか',      romaji:'mou sukoshi ookii no wa arimasu ka', korean:'좀 더 큰 거 있나요?' },
  { id:'sp_7',  japanese:'写真を撮ってもいいですか',          romaji:'shashin o totte mo ii desu ka',      korean:'사진 찍어도 되나요?' },
  { id:'sp_8',  japanese:'これとこれをください',              romaji:'kore to kore o kudasai',             korean:'이거랑 이거 주세요' },
  { id:'sp_9',  japanese:'ここに書いてください',              romaji:'koko ni kaite kudasai',              korean:'여기에 써 주세요' },
  { id:'sp_10', japanese:'日本語がわかりません',              romaji:'nihongo ga wakarimasen',              korean:'일본어를 모르겠어요' },

  // ── 택시 (sim_taxi) ──
  { id:'stx_1',  japanese:'ここまでお願いします',             romaji:'koko made onegai shimasu',           korean:'여기까지 부탁합니다',        tip:'지도나 주소를 보여주며' },
  { id:'stx_2',  japanese:'この住所までお願いします',         romaji:'kono juusho made onegai shimasu',    korean:'이 주소까지 부탁합니다' },
  { id:'stx_3',  japanese:'だいたいいくらぐらいですか',       romaji:'daitai ikura gurai desu ka',         korean:'대략 얼마 정도예요?' },
  { id:'stx_4',  japanese:'急いでください',                   romaji:'isoide kudasai',                     korean:'서둘러 주세요' },
  { id:'stx_5',  japanese:'ここで降ろしてください',           romaji:'koko de oroshite kudasai',           korean:'여기서 내려 주세요' },
  { id:'stx_6',  japanese:'トランクを開けてください',         romaji:'toranku o akete kudasai',            korean:'트렁크 열어 주세요' },
  { id:'stx_7',  japanese:'領収書をください',                 romaji:'ryoushuusho o kudasai',              korean:'영수증 주세요' },
  { id:'stx_8',  japanese:'カードで支払えますか',             romaji:'kaado de shiharaemasu ka',           korean:'카드로 결제 가능한가요?' },
  { id:'stx_9',  japanese:'まっすぐ行ってください',           romaji:'massugu itte kudasai',               korean:'직진해 주세요' },
  { id:'stx_10', japanese:'あそこで止めてください',           romaji:'asoko de tomete kudasai',            korean:'저기서 세워 주세요' },

  // ── 버스 (sim_bus) ──
  { id:'sb_1',  japanese:'このバスは〜に行きますか',          romaji:'kono basu wa ~ ni ikimasu ka',       korean:'이 버스 ~에 가나요?' },
  { id:'sb_2',  japanese:'次の停留所で降ります',              romaji:'tsugi no teiryuujo de orimasu',      korean:'다음 정류장에서 내릴게요' },
  { id:'sb_3',  japanese:'一日乗車券はありますか',            romaji:'ichinichi joushaken wa arimasu ka',  korean:'1일 승차권 있나요?' },
  { id:'sb_4',  japanese:'バス停はどこですか',                romaji:'basutei wa doko desu ka',            korean:'버스 정류장 어디예요?' },
  { id:'sb_5',  japanese:'何番のバスですか',                  romaji:'nanban no basu desu ka',             korean:'몇 번 버스예요?' },
  { id:'sb_6',  japanese:'整理券を取ってください',            romaji:'seiriken o totte kudasai',           korean:'정리권을 뽑아주세요' },
  { id:'sb_7',  japanese:'両替はできますか',                  romaji:'ryougae wa dekimasu ka',             korean:'환전/잔돈 교환 되나요?' },
  { id:'sb_8',  japanese:'終点まで行きます',                  romaji:'shuuten made ikimasu',               korean:'종점까지 갑니다' },
  { id:'sb_9',  japanese:'降りる時に払いますか',              romaji:'oriru toki ni haraimasu ka',         korean:'내릴 때 내나요?' },
  { id:'sb_10', japanese:'このバスの時刻表はありますか',      romaji:'kono basu no jikokuhyou wa arimasu ka', korean:'이 버스 시간표 있나요?' },

  // ── 지하철 (sim_subway) ──
  { id:'sw_1',  japanese:'〜線はどこですか',                  romaji:'~ sen wa doko desu ka',              korean:'~호선은 어디예요?' },
  { id:'sw_2',  japanese:'乗り換えはどこですか',              romaji:'norikae wa doko desu ka',            korean:'환승은 어디서 하나요?' },
  { id:'sw_3',  japanese:'切符を買いたいです',                romaji:'kippu o kaitai desu',                korean:'표를 사고 싶어요' },
  { id:'sw_4',  japanese:'ICカードにチャージしたいです',      romaji:'ai shii kaado ni chaaji shitai desu', korean:'IC카드 충전하고 싶어요' },
  { id:'sw_5',  japanese:'この電車は〜に止まりますか',        romaji:'kono densha wa ~ ni tomarimasu ka',  korean:'이 전철 ~에 서나요?' },
  { id:'sw_6',  japanese:'急行と各停、どちらが早いですか',    romaji:'kyuukou to kakutei, dochira ga hayai desu ka', korean:'급행과 각역정차, 어느 게 빨라요?' },
  { id:'sw_7',  japanese:'出口はどちらですか',                romaji:'deguchi wa dochira desu ka',         korean:'출구는 어느 쪽인가요?' },
  { id:'sw_8',  japanese:'終電は何時ですか',                  romaji:'shuuden wa nanji desu ka',           korean:'막차가 몇 시예요?' },
  { id:'sw_9',  japanese:'ホームはどこですか',                romaji:'hoomu wa doko desu ka',              korean:'플랫폼은 어디예요?' },
  { id:'sw_10', japanese:'反対方向に乗ってしまいました',      romaji:'hantai houkou ni notte shimaimashita', korean:'반대 방향으로 타버렸어요' },

  // ── 엘리베이터 (sim_elevator) ──
  { id:'se_1',  japanese:'何階ですか',                        romaji:'nankai desu ka',                     korean:'몇 층이에요?' },
  { id:'se_2',  japanese:'開けてください',                    romaji:'akete kudasai',                      korean:'(문) 열어 주세요' },
  { id:'se_3',  japanese:'閉めないでください',                romaji:'shimenaide kudasai',                 korean:'닫지 마세요' },
  { id:'se_4',  japanese:'地下一階をお願いします',            romaji:'chika ikkai o onegai shimasu',       korean:'지하 1층 부탁합니다' },
  { id:'se_5',  japanese:'屋上はありますか',                  romaji:'okujou wa arimasu ka',               korean:'옥상 있나요?' },
  { id:'se_6',  japanese:'エスカレーターはどこですか',        romaji:'esukareetaa wa doko desu ka',        korean:'에스컬레이터 어디예요?' },
  { id:'se_7',  japanese:'上に行きます',                      romaji:'ue ni ikimasu',                      korean:'위로 올라갑니다' },
  { id:'se_8',  japanese:'すみません、降ります',              romaji:'sumimasen, orimasu',                 korean:'실례합니다, 내립니다' },

  // ── 룸서비스 (sim_roomservice) ──
  { id:'sr_1',  japanese:'ルームサービスをお願いします',      romaji:'ruumu saabisu o onegai shimasu',     korean:'룸서비스 부탁합니다' },
  { id:'sr_2',  japanese:'部屋まで届けてください',            romaji:'heya made todokete kudasai',         korean:'방까지 배달해 주세요' },
  { id:'sr_3',  japanese:'タオルを持ってきてください',        romaji:'taoru o motte kite kudasai',         korean:'수건 가져다 주세요' },
  { id:'sr_4',  japanese:'氷をお願いします',                  romaji:'koori o onegai shimasu',             korean:'얼음 부탁합니다' },
  { id:'sr_5',  japanese:'朝食は何時からですか',              romaji:'choushoku wa nanji kara desu ka',    korean:'조식은 몇 시부터예요?' },
  { id:'sr_6',  japanese:'エアコンが効きません',              romaji:'eakon ga kikimasen',                 korean:'에어컨이 안 돼요' },
  { id:'sr_7',  japanese:'お湯が出ません',                    romaji:'oyu ga demasen',                     korean:'뜨거운 물이 안 나와요' },
  { id:'sr_8',  japanese:'Wi-Fiのパスワードは何ですか',       romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호 뭐예요?' },

  // ── 전화 (sim_phone) ──
  { id:'sph_1', japanese:'もしもし',                          romaji:'moshi moshi',                        korean:'여보세요',                   tip:'전화 받을 때/걸 때 첫마디' },
  { id:'sph_2', japanese:'もう一度お願いします',              romaji:'mou ichido onegai shimasu',          korean:'한 번 더 말씀해 주세요' },
  { id:'sph_3', japanese:'日本語があまり話せません',          romaji:'nihongo ga amari hanasemasen',       korean:'일본어를 잘 못해요' },
  { id:'sph_4', japanese:'予約をしたいのですが',              romaji:'yoyaku o shitai no desu ga',         korean:'예약을 하고 싶은데요' },
  { id:'sph_5', japanese:'キャンセルしたいのですが',          romaji:'kyanseru shitai no desu ga',         korean:'취소하고 싶은데요' },
  { id:'sph_6', japanese:'電話番号を教えてください',          romaji:'denwa bangou o oshiete kudasai',     korean:'전화번호 알려주세요' },
  { id:'sph_7', japanese:'少々お待ちください',                romaji:'shoushou omachi kudasai',            korean:'잠시만 기다려 주세요',        tip:'상대방이 말하는 표현 (이해용)' },
  { id:'sph_8', japanese:'また電話します',                    romaji:'mata denwa shimasu',                 korean:'다시 전화할게요' },

  // ── 체크인 (sim_checkin) ──
  { id:'sci_1',  japanese:'チェックインお願いします',         romaji:'chekku in onegai shimasu',           korean:'체크인 부탁합니다' },
  { id:'sci_2',  japanese:'予約した〜です',                   romaji:'yoyaku shita ~ desu',                korean:'예약한 ~입니다' },
  { id:'sci_3',  japanese:'パスポートはこちらです',           romaji:'pasupooto wa kochira desu',          korean:'여권 여기 있습니다' },
  { id:'sci_4',  japanese:'禁煙の部屋でお願いします',         romaji:'kinen no heya de onegai shimasu',    korean:'금연 방으로 부탁합니다' },
  { id:'sci_5',  japanese:'もう少し上の階がいいのですが',     romaji:'mou sukoshi ue no kai ga ii no desu ga', korean:'좀 더 높은 층이면 좋겠는데요' },
  { id:'sci_6',  japanese:'朝食は付いていますか',             romaji:'choushoku wa tsuite imasu ka',       korean:'조식 포함인가요?' },
  { id:'sci_7',  japanese:'何時まで開いていますか',           romaji:'nanji made aite imasu ka',           korean:'몇 시까지 열려 있나요?' },
  { id:'sci_8',  japanese:'荷物を先に預けられますか',         romaji:'nimotsu o saki ni azukeraremasu ka', korean:'짐을 먼저 맡길 수 있나요?' },
  { id:'sci_9',  japanese:'近くにコンビニはありますか',       romaji:'chikaku ni konbini wa arimasu ka',   korean:'근처에 편의점 있나요?' },
  { id:'sci_10', japanese:'部屋の鍵をもらえますか',           romaji:'heya no kagi o moraemasu ka',        korean:'방 열쇠 받을 수 있나요?' },

  // ── 체크아웃 (sim_checkout) ──
  { id:'sco_1', japanese:'チェックアウトお願いします',        romaji:'chekku auto onegai shimasu',         korean:'체크아웃 부탁합니다' },
  { id:'sco_2', japanese:'荷物を預かってもらえますか',        romaji:'nimotsu o azukatte moraemasu ka',    korean:'짐 좀 맡아주실 수 있나요?' },
  { id:'sco_3', japanese:'レイトチェックアウトはできますか',  romaji:'reito chekku auto wa dekimasu ka',   korean:'늦은 체크아웃 가능한가요?' },
  { id:'sco_4', japanese:'タクシーを呼んでいただけますか',    romaji:'takushii o yonde itadakemasu ka',    korean:'택시 불러주실 수 있나요?' },
  { id:'sco_5', japanese:'明細書をください',                  romaji:'meisaisho o kudasai',                korean:'명세서 주세요' },
  { id:'sco_6', japanese:'忘れ物をしました',                  romaji:'wasuremono o shimashita',            korean:'잊어버린 물건이 있어요' },
  { id:'sco_7', japanese:'空港までどのくらいかかりますか',    romaji:'kuukou made dono kurai kakarimasu ka', korean:'공항까지 얼마나 걸려요?' },
  { id:'sco_8', japanese:'楽しかったです、ありがとうございます', romaji:'tanoshikatta desu, arigatou gozaimasu', korean:'즐거웠어요, 감사합니다' },

  // ── 화장실 (sim_toilet) ──
  { id:'stl_1', japanese:'トイレはどこですか',                romaji:'toire wa doko desu ka',              korean:'화장실 어디예요?' },
  { id:'stl_2', japanese:'お手洗いをお借りできますか',        romaji:'otearai o okari dekimasu ka',        korean:'화장실 좀 빌릴 수 있나요?' },
  { id:'stl_3', japanese:'多目的トイレはありますか',          romaji:'tamokuteki toire wa arimasu ka',     korean:'다목적 화장실 있나요?' },
  { id:'stl_4', japanese:'トイレットペーパーがありません',    romaji:'toiretto peepaa ga arimasen',        korean:'화장지가 없어요' },
  { id:'stl_5', japanese:'水が流れません',                    romaji:'mizu ga nagaremasen',                korean:'물이 안 내려가요' },
  { id:'stl_6', japanese:'ウォシュレットの使い方がわかりません', romaji:'woshuretto no tsukaikata ga wakarimasen', korean:'비데 사용법을 모르겠어요' },
  { id:'stl_7', japanese:'女性用はどちらですか',              romaji:'josei you wa dochira desu ka',       korean:'여성용은 어느 쪽인가요?' },
  { id:'stl_8', japanese:'並んでいますか',                    romaji:'narande imasu ka',                   korean:'줄 서 있는 건가요?' },

  // ── 흡연 (sim_smoking) ──
  { id:'smk_1', japanese:'喫煙所はどこですか',                romaji:'kitsuenjo wa doko desu ka',          korean:'흡연실 어디예요?' },
  { id:'smk_2', japanese:'ここで吸ってもいいですか',          romaji:'koko de sutte mo ii desu ka',        korean:'여기서 피워도 되나요?' },
  { id:'smk_3', japanese:'タバコをください',                  romaji:'tabako o kudasai',                   korean:'담배 주세요' },
  { id:'smk_4', japanese:'ライターはありますか',              romaji:'raitaa wa arimasu ka',               korean:'라이터 있나요?' },
  { id:'smk_5', japanese:'灰皿はありますか',                  romaji:'haizara wa arimasu ka',              korean:'재떨이 있나요?' },
  { id:'smk_6', japanese:'喫煙席はありますか',                romaji:'kitsuen seki wa arimasu ka',         korean:'흡연석 있나요?' },
  { id:'smk_7', japanese:'加熱式タバコは使えますか',          romaji:'kanetsu shiki tabako wa tsukaemasu ka', korean:'전자담배 사용 가능한가요?' },
  { id:'smk_8', japanese:'外で吸ってきます',                  romaji:'soto de sutte kimasu',               korean:'밖에서 피우고 올게요' },

  // ── 편의점 (sim_conveni) ──
  { id:'scv_1',  japanese:'温めてください',                   romaji:'atatamete kudasai',                  korean:'데워 주세요',                tip:'お弁当(おべんとう) = 도시락' },
  { id:'scv_2',  japanese:'袋はいりません',                   romaji:'fukuro wa irimasen',                 korean:'봉투 필요 없어요' },
  { id:'scv_3',  japanese:'お箸をください',                   romaji:'ohashi o kudasai',                   korean:'젓가락 주세요' },
  { id:'scv_4',  japanese:'ATMはどこですか',                  romaji:'eitiemu wa doko desu ka',            korean:'ATM 어디예요?',              tip:'일본 편의점 ATM은 해외카드 사용 가능' },
  { id:'scv_5',  japanese:'チケットの支払いをしたいです',     romaji:'chiketto no shiharai o shitai desu', korean:'티켓 결제를 하고 싶어요' },
  { id:'scv_6',  japanese:'コピーをしたいです',               romaji:'kopii o shitai desu',                korean:'복사를 하고 싶어요' },
  { id:'scv_7',  japanese:'宅配便を送りたいです',             romaji:'takuhaibin o okuritai desu',         korean:'택배를 보내고 싶어요' },
  { id:'scv_8',  japanese:'トイレを借りてもいいですか',       romaji:'toire o karite mo ii desu ka',       korean:'화장실 빌려도 되나요?' },
  { id:'scv_9',  japanese:'ポイントカードはお持ちですか',     romaji:'pointo kaado wa omochi desu ka',     korean:'포인트 카드 가지고 계세요?',  tip:'점원이 묻는 표현. ないです = 없어요' },
  { id:'scv_10', japanese:'これは何味ですか',                 romaji:'kore wa nani aji desu ka',           korean:'이거 무슨 맛이에요?' },

  // ── S6 추가: 몸 상태·건강 (health) ──────────────────────
  { id:'hlth_itai',     japanese:'〜がいたいです',               kanji:'〜が痛いです',             romaji:'~ ga itai desu',               korean:'〜가 아파요',             tip:'あたまがいたい = 머리가 아파요' },
  { id:'hlth_netsu',    japanese:'ねつがあります',               kanji:'熱があります',             romaji:'netsu ga arimasu',             korean:'열이 있어요' },
  { id:'hlth_kaze',     japanese:'かぜをひきました',             kanji:'風邪を引きました',         romaji:'kaze wo hikimashita',          korean:'감기에 걸렸어요' },
  { id:'hlth_isha',     japanese:'いしゃにみてもらいたいです',   kanji:'医者に見てもらいたいです', romaji:'isha ni mite moraitai desu',   korean:'의사에게 진찰받고 싶어요' },
  { id:'hlth_daijob',   japanese:'だいじょうぶです',             kanji:'大丈夫です',               romaji:'daijoubu desu',                korean:'괜찮아요',               tip:'だいじょうぶですか = 괜찮으세요?' },
  { id:'hlth_suimin',   japanese:'よくねられません',             kanji:'よく眠れません',           romaji:'yoku neraremasen',             korean:'잘 못자겠어요',          tip:'시차 적응 중일 때 유용' },
  { id:'hlth_kyuu',     japanese:'きゅうきゅうしゃをよんでください', kanji:'救急車を呼んでください', romaji:'kyuukyuusha wo yonde kudasai', korean:'구급차를 불러주세요',   tip:'일본 응급번호 119' },
];
