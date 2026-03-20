// ============================================================
//  롤플레이 다이얼로그 항목
//  speaker: 'A' = 학습자(나), 'B' = 상대방, 'N' = 장면 설명
// ============================================================
const VOCAB_ITEMS_DIALOGUE = [

  // ══════════════════════════════════════════════════════════
  //  만남 그룹 (simlevel:1)
  // ══════════════════════════════════════════════════════════

  // ── 씬1: 처음 만남 (sim_first_meeting) ──
  { id:'dm_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 사진을 부탁하며 대화 시작', tip:'' },
  { id:'dm_1',  speaker:'A', japanese:'すみません、写真を撮っていただけますか？', romaji:'sumimasen, shashin wo totte itadakemasu ka', korean:'저기요, 사진 찍어주실 수 있나요?' },
  { id:'dm_2',  speaker:'B', japanese:'もちろんです！はい、どうぞ。',            romaji:'mochiron desu! hai, douzo', korean:'물론이죠! 자, 여기요.' },
  { id:'dm_3',  speaker:'A', japanese:'ありがとうございます。日本は初めてなんです。', romaji:'arigatou gozaimasu. nihon wa hajimete nan desu', korean:'감사합니다. 일본은 처음이에요.' },
  { id:'dm_4',  speaker:'B', japanese:'そうですか！どちらから来ましたか？',       romaji:'sou desu ka! dochira kara kimashita ka', korean:'그래요! 어디서 오셨나요?' },
  { id:'dm_5',  speaker:'A', japanese:'韓国のソウルから来ました。',               romaji:'kankoku no souru kara kimashita', korean:'한국 서울에서 왔어요.' },
  { id:'dm_6',  speaker:'B', japanese:'いいですね！日本の印象はどうですか？',     romaji:'ii desu ne! nihon no inshou wa dou desu ka', korean:'좋네요! 일본 인상은 어때요?' },
  { id:'dm_7',  speaker:'A', japanese:'食べ物がおいしくて、みんな親切で大好きです。', romaji:'tabemono ga oishikute, minna shinsetsu de daisuki desu', korean:'음식도 맛있고 다들 친절해서 너무 좋아요.' },
  { id:'dm_8',  speaker:'B', japanese:'それはよかった！どこへ行く予定ですか？',   romaji:'sore wa yokatta! doko e iku yotei desu ka', korean:'다행이에요! 어디 갈 예정이에요?' },
  { id:'dm_9',  speaker:'A', japanese:'京都と大阪に行きたいです。',               romaji:'kyouto to oosaka ni ikitai desu', korean:'교토랑 오사카에 가고 싶어요.' },
  { id:'dm_10', speaker:'B', japanese:'楽しんでください！よい旅を！',             romaji:'tanoshinde kudasai! yoi tabi wo', korean:'즐기세요! 좋은 여행 되세요!' },
  { id:'dm_11', speaker:'A', japanese:'ありがとうございました！',                 romaji:'arigatou gozaimashita', korean:'감사합니다!' },

  // ── 씬2: 일상 스몰토크 (sim_daily_chat) ──
  { id:'dd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 일본인과 일상 대화', tip:'' },
  { id:'dd_1',  speaker:'B', japanese:'日本語、お上手ですね。どこで勉強しましたか？', romaji:'nihongo, ojouzu desu ne. doko de benkyou shimashita ka', korean:'일본어 잘 하시네요. 어디서 공부하셨어요?' },
  { id:'dd_2',  speaker:'A', japanese:'ありがとうございます。アプリで少し勉強しました。', romaji:'arigatou gozaimasu. apuri de sukoshi benkyou shimashita', korean:'감사해요. 앱으로 조금 공부했어요.' },
  { id:'dd_3',  speaker:'B', japanese:'すごいですね！日本語は難しいですか？',      romaji:'sugoi desu ne! nihongo wa muzukashii desu ka', korean:'대단해요! 일본어 어렵지 않나요?' },
  { id:'dd_4',  speaker:'A', japanese:'ひらがなは大丈夫ですが、漢字が難しいです。',romaji:'hiragana wa daijoubu desu ga, kanji ga muzukashii desu', korean:'히라가나는 괜찮은데 한자가 어려워요.' },
  { id:'dd_5',  speaker:'B', japanese:'わかります！趣味は何ですか？',             romaji:'wakarimasu! shumi wa nan desu ka', korean:'그렇겠네요! 취미가 뭐예요?' },
  { id:'dd_6',  speaker:'A', japanese:'旅行と日本のアニメが好きです。',            romaji:'ryokou to nihon no anime ga suki desu', korean:'여행이랑 일본 애니메이션을 좋아해요.' },
  { id:'dd_7',  speaker:'B', japanese:'いいですね！おすすめのアニメはありますか？', romaji:'ii desu ne! osusume no anime wa arimasu ka', korean:'좋네요! 추천 애니 있어요?' },
  { id:'dd_8',  speaker:'A', japanese:'「君の名は。」がとても好きです。',          romaji:'kimi no na wa ga totemo suki desu', korean:'「너의 이름은」을 정말 좋아해요.' },
  { id:'dd_9',  speaker:'B', japanese:'私も好きです！日本語、もっと頑張ってください。', romaji:'watashi mo suki desu! nihongo, motto ganbatte kudasai', korean:'저도 좋아해요! 일본어 더 열심히 하세요!' },
  { id:'dd_10', speaker:'A', japanese:'ありがとうございます！また話しましょう。',  romaji:'arigatou gozaimasu! mata hanashimashou', korean:'감사해요! 또 얘기해요.' },

  // ══════════════════════════════════════════════════════════
  //  방문 그룹 (simlevel:2)
  // ══════════════════════════════════════════════════════════

  // ── 씬3: 식당 (sim_restaurant_dlg) ──
  { id:'rd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 일본 식당 — 입장·주문·계산 전체 흐름', tip:'' },
  { id:'rd_1',  speaker:'B', japanese:'いらっしゃいませ！何名様ですか？',          romaji:'irasshaimase! nannmei sama desu ka', korean:'어서 오세요! 몇 분이세요?' },
  { id:'rd_2',  speaker:'A', japanese:'一人です。',                               romaji:'hitori desu', korean:'한 명이요.' },
  { id:'rd_3',  speaker:'B', japanese:'こちらへどうぞ。ご注文は決まりましたか？',   romaji:'kochira e douzo. gochuumon wa kimarimashita ka', korean:'이쪽으로 오세요. 주문 정하셨나요?' },
  { id:'rd_4',  speaker:'A', japanese:'これは何が入っていますか？',                romaji:'kore wa nani ga haitte imasu ka', korean:'이건 뭐가 들어 있나요?' },
  { id:'rd_5',  speaker:'B', japanese:'豚肉と野菜です。辛くないですよ。',          romaji:'butaniku to yasai desu. karakunai desu yo', korean:'돼지고기랑 채소예요. 안 맵습니다.' },
  { id:'rd_6',  speaker:'A', japanese:'じゃあ、これをください。ご飯は大盛りで。',  romaji:'jaa, kore wo kudasai. gohan wa oomori de', korean:'그럼 이걸로 주세요. 밥은 곱빼기로요.' },
  { id:'rd_7',  speaker:'B', japanese:'お飲み物は？',                             romaji:'onomimono wa', korean:'음료는요?' },
  { id:'rd_8',  speaker:'A', japanese:'お水をください。',                          romaji:'omizu wo kudasai', korean:'물 주세요.' },
  { id:'rd_9',  speaker:'B', japanese:'かしこまりました。少々お待ちください。',     romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만 기다려 주세요.' },
  { id:'rd_10', speaker:'A', japanese:'すみません、お会計をお願いします。',        romaji:'sumimasen, okaikei wo onegai shimasu', korean:'저기요, 계산 부탁드려요.' },
  { id:'rd_11', speaker:'B', japanese:'1,200円です。カードはご利用ですか？',       romaji:'sen nihyaku en desu. kaado wa goriyou desu ka', korean:'1,200엔이요. 카드 사용하시나요?' },
  { id:'rd_12', speaker:'A', japanese:'カードでお願いします。ごちそうさまでした！', romaji:'kaado de onegai shimasu. gochisousama deshita', korean:'카드로 할게요. 잘 먹었습니다!' },
  { id:'rd_13', speaker:'B', japanese:'ありがとうございました！またどうぞ。',      romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.' },

  // ── 씬4: 이자카야 (sim_izakaya) ──
  { id:'iz_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야 — 저녁 식사 겸 음주', tip:'' },
  { id:'iz_1',  speaker:'B', japanese:'いらっしゃいませ！何名様ですか？',          romaji:'irasshaimase! nannmei sama desu ka', korean:'어서 오세요! 몇 분이세요?' },
  { id:'iz_2',  speaker:'A', japanese:'二人です。',                               romaji:'futari desu', korean:'두 명이요.' },
  { id:'iz_3',  speaker:'B', japanese:'禁煙と喫煙、どちらがよろしいですか？',      romaji:'kinen to kitsuen, dochira ga yoroshii desu ka', korean:'금연석과 흡연석 중 어느 쪽으로 드릴까요?' },
  { id:'iz_4',  speaker:'A', japanese:'禁煙でお願いします。',                      romaji:'kinen de onegai shimasu', korean:'금연으로 주세요.' },
  { id:'iz_5',  speaker:'B', japanese:'こちらへどうぞ。ご注文はお決まりでしたらお呼びください。', romaji:'kochira e douzo. gochuumon wa okimari deshitara oyobi kudasai', korean:'이쪽이요. 주문 정하시면 불러 주세요.' },
  { id:'iz_6',  speaker:'A', japanese:'すみません、とりあえずビールを二つお願いします。', romaji:'sumimasen, toriaezu biiru wo futatsu onegai shimasu', korean:'저기요, 우선 맥주 두 잔 주세요.' },
  { id:'iz_7',  speaker:'B', japanese:'かしこまりました。おつまみはいかがですか？', romaji:'kashikomarimashita. otsumami wa ikaga desu ka', korean:'알겠습니다. 안주는 어떠세요?' },
  { id:'iz_8',  speaker:'A', japanese:'おすすめは何ですか？',                      romaji:'osusume wa nan desu ka', korean:'추천이 뭐예요?' },
  { id:'iz_9',  speaker:'B', japanese:'焼き鳥の盛り合わせと枝豆が人気ですよ。',    romaji:'yakitori no moriawase to edamame ga ninki desu yo', korean:'야키토리 모둠이랑 에다마메가 인기 있어요.' },
  { id:'iz_10', speaker:'A', japanese:'じゃあ、それを両方ください。',              romaji:'jaa, sore wo ryouhou kudasai', korean:'그럼 둘 다 주세요.' },
  { id:'iz_11', speaker:'A', japanese:'お会計をお願いします。カードで払えますか？', romaji:'okaikei wo onegai shimasu. kaado de haraemasu ka', korean:'계산 부탁드려요. 카드 되나요?' },
  { id:'iz_12', speaker:'B', japanese:'はい、もちろんです。ありがとうございました！', romaji:'hai, mochiron desu. arigatou gozaimashita', korean:'네, 물론이죠. 감사합니다!' },

  // ── 씬5: 편의점 (sim_konbini_dlg) ──
  { id:'kd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 — 도시락, 결제, 서비스 이용', tip:'' },
  { id:'kd_1',  speaker:'A', japanese:'すみません、このお弁当を温めてもらえますか？', romaji:'sumimasen, kono obentou wo atatamete moraemasu ka', korean:'저기요, 이 도시락 데워 주실 수 있나요?' },
  { id:'kd_2',  speaker:'B', japanese:'かしこまりました。少々お待ちください。',     romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만요.' },
  { id:'kd_3',  speaker:'B', japanese:'はい、どうぞ。お箸はおつけしますか？',      romaji:'hai, douzo. ohashi wa otsukeshimasu ka', korean:'자, 여기요. 젓가락 드릴까요?' },
  { id:'kd_4',  speaker:'A', japanese:'はい、一膳ください。ATMはどこですか？',     romaji:'hai, ichizen kudasai. eitiemu wa doko desu ka', korean:'네, 하나 주세요. ATM은 어디 있어요?' },
  { id:'kd_5',  speaker:'B', japanese:'入口の横にございます。',                   romaji:'iriguchi no yoko ni gozaimasu', korean:'입구 옆에 있어요.' },
  { id:'kd_6',  speaker:'A', japanese:'ありがとうございます。レジでお願いします。', romaji:'arigatou gozaimasu. reji de onegai shimasu', korean:'감사해요. 계산 부탁드려요.' },
  { id:'kd_7',  speaker:'B', japanese:'レジ袋はご利用ですか？3円になります。',     romaji:'rejibukuro wa goriyou desu ka? san en ni narimasu', korean:'봉투 사용하시겠어요? 3엔이에요.' },
  { id:'kd_8',  speaker:'A', japanese:'いりません。Suicaで払えますか？',           romaji:'irimasen. suika de haraemasu ka', korean:'필요 없어요. 스이카로 낼 수 있나요?' },
  { id:'kd_9',  speaker:'B', japanese:'はい、こちらへタッチしてください。820円です。', romaji:'hai, kochira e tatchi shite kudasai. happyaku nijuu en desu', korean:'네, 여기 터치해 주세요. 820엔이에요.' },
  { id:'kd_10', speaker:'B', japanese:'ありがとうございました！またどうぞ。',      romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.' },

  // ── 씬6: 쇼핑 (sim_shopping_dlg) ──
  { id:'sd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 옷가게 — 가격 문의·시착·결제', tip:'' },
  { id:'sd_1',  speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？',      romaji:'irasshaimase! nanika osagashi desu ka', korean:'어서 오세요! 찾으시는 게 있나요?' },
  { id:'sd_2',  speaker:'A', japanese:'見ているだけです。これ、試着してもいいですか？', romaji:'mite iru dake desu. kore, shichaku shite mo ii desu ka', korean:'그냥 보는 거예요. 이거 입어봐도 되나요?' },
  { id:'sd_3',  speaker:'B', japanese:'もちろんです。試着室はあちらです。',        romaji:'mochiron desu. shichakushitsu wa achira desu', korean:'물론이죠. 피팅룸은 저쪽이에요.' },
  { id:'sd_4',  speaker:'A', japanese:'Sサイズは少し小さいです。Mはありますか？', romaji:'esu saizu wa sukoshi chiisai desu. emu wa arimasu ka', korean:'S 사이즈는 좀 작네요. M 있나요?' },
  { id:'sd_5',  speaker:'B', japanese:'少々お待ちください。はい、こちらです。',    romaji:'shoushou omachi kudasai. hai, kochira desu', korean:'잠시만요. 네, 여기 있어요.' },
  { id:'sd_6',  speaker:'A', japanese:'これはいくらですか？',                      romaji:'kore wa ikura desu ka', korean:'이거 얼마예요?' },
  { id:'sd_7',  speaker:'B', japanese:'3,800円です。ただいまセール中です。',       romaji:'sanzen happyaku en desu. tadaima seeru chuu desu', korean:'3,800엔이에요. 지금 세일 중이에요.' },
  { id:'sd_8',  speaker:'A', japanese:'免税になりますか？',                        romaji:'menzei ni narimasu ka', korean:'면세 되나요?' },
  { id:'sd_9',  speaker:'B', japanese:'はい、パスポートをお見せください。',         romaji:'hai, pasupooto wo omise kudasai', korean:'네, 여권을 보여주세요.' },
  { id:'sd_10', speaker:'A', japanese:'じゃあ、これをください。カードで払えますか？', romaji:'jaa, kore wo kudasai. kaado de haraemasu ka', korean:'그럼 이걸로 할게요. 카드 되나요?' },
  { id:'sd_11', speaker:'B', japanese:'はい、大丈夫です。ありがとうございました！', romaji:'hai, daijoubu desu. arigatou gozaimashita', korean:'네, 괜찮아요. 감사합니다!' },

  // ══════════════════════════════════════════════════════════
  //  여행 그룹 (simlevel:3)
  // ══════════════════════════════════════════════════════════

  // ── 씬7: 공항 체크인 (sim_airport) ──
  { id:'ap_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 공항 체크인 카운터 — 탑승 수속', tip:'' },
  { id:'ap_1',  speaker:'B', japanese:'パスポートとご予約確認書をお願いします。',  romaji:'pasupooto to goyoyaku kakuninsho wo onegai shimasu', korean:'여권과 예약 확인서 주세요.' },
  { id:'ap_2',  speaker:'A', japanese:'はい、こちらです。',                       romaji:'hai, kochira desu', korean:'네, 여기 있어요.' },
  { id:'ap_3',  speaker:'B', japanese:'お席は窓側と通路側、どちらがよろしいですか？', romaji:'oseki wa madogawa to tsuurogawa, dochira ga yoroshii desu ka', korean:'좌석은 창가와 복도 중 어느 쪽으로 드릴까요?' },
  { id:'ap_4',  speaker:'A', japanese:'窓側でお願いします。',                     romaji:'madogawa de onegai shimasu', korean:'창가로 주세요.' },
  { id:'ap_5',  speaker:'B', japanese:'スーツケースをお預けになりますか？',         romaji:'suutsukeesu wo oazuke ni narimasu ka', korean:'캐리어 맡기시겠어요?' },
  { id:'ap_6',  speaker:'A', japanese:'はい、一個あります。手荷物は機内に持ちます。', romaji:'hai, ikko arimasu. tenimotsu wa kinai ni mochimasu', korean:'네, 하나요. 기내 수하물은 가지고 탈게요.' },
  { id:'ap_7',  speaker:'B', japanese:'重量は23キロです。搭乗ゲートは34番です。', romaji:'juuryou wa nijuusan kiro desu. toujourgeeto wa sanjuuyon ban desu', korean:'무게 23kg이에요. 탑승 게이트는 34번이에요.' },
  { id:'ap_8',  speaker:'A', japanese:'搭乗時刻は何時ですか？',                   romaji:'tojou jikoku wa nanji desu ka', korean:'탑승 시간이 언제예요?' },
  { id:'ap_9',  speaker:'B', japanese:'10時20分です。30分前にはゲートへどうぞ。', romaji:'juuji nijuppun desu. sanjuppun mae ni wa geeto e douzo', korean:'10시 20분이에요. 30분 전에는 게이트로 오세요.' },
  { id:'ap_10', speaker:'A', japanese:'両替はどこでできますか？',                  romaji:'ryougae wa doko de dekimasu ka', korean:'환전은 어디서 할 수 있어요?' },
  { id:'ap_11', speaker:'B', japanese:'セキュリティ手前の左側にございます。',      romaji:'sekyuriti temae no hidari gawa ni gozaimasu', korean:'보안검색대 앞 왼쪽에 있어요.' },
  { id:'ap_12', speaker:'A', japanese:'ありがとうございます。税関と入国審査はどこですか？', romaji:'arigatou gozaimasu. zeikan to nyuukoku shinsa wa doko desu ka', korean:'감사해요. 세관이랑 입국심사는 어디예요?' },
  { id:'ap_13', speaker:'B', japanese:'ゲートを通った先にございます。よいご旅行を！', romaji:'geeto wo tootta saki ni gozaimasu. yoi goryokou wo', korean:'게이트 지나서 있어요. 좋은 여행 되세요!' },

  // ── 씬8: 호텔 체크인 (sim_hotel_dlg) ──
  { id:'hd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트 — 체크인 전체 절차', tip:'' },
  { id:'hd_1',  speaker:'A', japanese:'チェックインをお願いします。',              romaji:'chekkuin wo onegai shimasu', korean:'체크인 부탁드립니다.' },
  { id:'hd_2',  speaker:'B', japanese:'お名前をお願いします。',                   romaji:'onamae wo onegai shimasu', korean:'성함을 알려주시겠어요?' },
  { id:'hd_3',  speaker:'A', japanese:'キム・ジウンと申します。',                 romaji:'kimu jiun to moushimasu', korean:'김지운이라고 합니다.' },
  { id:'hd_4',  speaker:'B', japanese:'ご予約確認しました。パスポートを拝見できますか？', romaji:'goyoyaku kakunin shimashita. pasupooto wo haiken dekimasu ka', korean:'예약 확인했어요. 여권 볼 수 있을까요?' },
  { id:'hd_5',  speaker:'A', japanese:'こちらです。朝食は付いていますか？',        romaji:'kochira desu. choushoku wa tsuite imasu ka', korean:'여기요. 조식 포함인가요?' },
  { id:'hd_6',  speaker:'B', japanese:'はい、朝食込みです。7時から10時まで1階です。', romaji:'hai, choushoku komi desu. shichiji kara juuji made ikkai desu', korean:'네, 조식 포함이에요. 7시~10시, 1층이에요.' },
  { id:'hd_7',  speaker:'A', japanese:'Wi-Fiのパスワードはどこにありますか？',     romaji:'waifai no pasuwaado wa doko ni arimasu ka', korean:'와이파이 비밀번호는 어디 있나요?' },
  { id:'hd_8',  speaker:'B', japanese:'お部屋のカードに書いてあります。',         romaji:'oheya no kaado ni kaite arimasu', korean:'방 카드에 적혀 있어요.' },
  { id:'hd_9',  speaker:'A', japanese:'チェックアウトは何時ですか？',              romaji:'chekkuauto wa nanji desu ka', korean:'체크아웃은 몇 시예요?' },
  { id:'hd_10', speaker:'B', japanese:'11時です。延長の場合はフロントへご連絡を。', romaji:'juuichiji desu. enchou no baai wa furonto e gorenraku wo', korean:'11시예요. 연장하시면 프런트에 연락 주세요.' },
  { id:'hd_11', speaker:'A', japanese:'わかりました。ありがとうございます。',      romaji:'wakarimashita. arigatou gozaimasu', korean:'알겠습니다. 감사합니다.' },
  { id:'hd_12', speaker:'B', japanese:'ごゆっくりどうぞ！何かあればお呼びください。', romaji:'goyukkuri douzo! nanika areba oyobi kudasai', korean:'편히 쉬세요! 무슨 일 있으면 불러 주세요.' },

  // ── 씬9: 택시 (sim_taxi_dlg) ──
  { id:'tx_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 앞에서 택시 탑승 — 목적지까지', tip:'' },
  { id:'tx_1',  speaker:'A', japanese:'すみません、浅草寺まで行ってください。',    romaji:'sumimasen, sensouji made itte kudasai', korean:'저기요, 아사쿠사사까지 가 주세요.' },
  { id:'tx_2',  speaker:'B', japanese:'かしこまりました。高速道路は使いますか？', romaji:'kashikomarimashita. kousoku douro wa tsukaimasu ka', korean:'알겠습니다. 고속도로 이용하시겠어요?' },
  { id:'tx_3',  speaker:'A', japanese:'一番早い道でお願いします。',               romaji:'ichiban hayai michi de onegai shimasu', korean:'제일 빠른 길로 가 주세요.' },
  { id:'tx_4',  speaker:'B', japanese:'大体20分くらいです。',                     romaji:'daitai nijuppun gurai desu', korean:'대략 20분 정도예요.' },
  { id:'tx_5',  speaker:'A', japanese:'この辺で降ろしてください。',               romaji:'kono hen de oroshite kudasai', korean:'이 근처에서 세워 주세요.' },
  { id:'tx_6',  speaker:'B', japanese:'1,850円です。',                            romaji:'sen happyakugojiuen desu', korean:'1,850엔이에요.' },
  { id:'tx_7',  speaker:'A', japanese:'カードで払えますか？',                     romaji:'kaado de haraemasu ka', korean:'카드로 낼 수 있어요?' },
  { id:'tx_8',  speaker:'B', japanese:'はい、こちらへどうぞ。領収書はいりますか？', romaji:'hai, kochira e douzo. ryoushuusho wa irimasu ka', korean:'네, 여기요. 영수증 필요하세요?' },
  { id:'tx_9',  speaker:'A', japanese:'はい、ください。ありがとうございました。',  romaji:'hai, kudasai. arigatou gozaimashita', korean:'네, 주세요. 감사합니다.' },
  { id:'tx_10', speaker:'B', japanese:'ありがとうございました！気をつけて。',      romaji:'arigatou gozaimashita! ki wo tsukete', korean:'감사합니다! 조심히 가세요.' },

  // ══════════════════════════════════════════════════════════
  //  방문 그룹 추가 (simlevel:2) — 가리키기 / 지하철 / 엘리베이터 / 화장실 / 흡연
  // ══════════════════════════════════════════════════════════

  // ── 가리키기 (sim_pointing) ─────────────────────────────
  { id:'pt_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 편의점·가게에서 — 말이 안 통할 때 손가락으로 해결!' },
  { id:'pt_1',   speaker:'A', japanese:'すみません、これをください。',         romaji:'sumimasen, kore wo kudasai',          korean:'저기요, 이거 주세요.',          tip:'메뉴나 진열대를 가리키며' },
  { id:'pt_2',   speaker:'B', japanese:'こちらですね。少々お待ちください。',    romaji:'kochira desu ne. shoushou omachi kudasai', korean:'이거 맞죠? 잠깐 기다려 주세요.' },
  { id:'pt_3',   speaker:'A', japanese:'それは何ですか？',                     romaji:'sore wa nan desu ka',                 korean:'그건 뭐예요?' },
  { id:'pt_4',   speaker:'B', japanese:'これはたこ焼きです。おすすめですよ！', romaji:'kore wa takoyaki desu. osusume desu yo', korean:'이건 타코야키예요. 추천해요!' },
  { id:'pt_5',   speaker:'A', japanese:'もう少し大きいのはありますか？',       romaji:'mou sukoshi ookii no wa arimasu ka', korean:'좀 더 큰 거 있나요?' },
  { id:'pt_6',   speaker:'B', japanese:'はい、こちらはいかがですか？',         romaji:'hai, kochira wa ikaga desu ka',       korean:'네, 이쪽은 어떠세요?' },
  { id:'pt_7',   speaker:'A', japanese:'これとこれをください。',               romaji:'kore to kore wo kudasai',             korean:'이거랑 이거 주세요.' },
  { id:'pt_8',   speaker:'B', japanese:'合計で１,２００円です。',              romaji:'goukei de sennihyakuen desu',         korean:'합계 1,200엔입니다.' },
  { id:'pt_9',   speaker:'A', japanese:'カードで払えますか？',                 romaji:'kaado de haraemasu ka',               korean:'카드로 결제 되나요?' },
  { id:'pt_10',  speaker:'B', japanese:'はい、こちらへどうぞ。ありがとうございました！', romaji:'hai, kochira e douzo. arigatou gozaimashita', korean:'네, 여기요. 감사합니다!' },
  { id:'pt_n2',  speaker:'N', japanese:'', romaji:'', korean:'💡 말이 안 통할 때 これ・それ・あれ + ください만 알면 OK!' },

  // ── 지하철 (sim_subway) ──────────────────────────────────
  { id:'sub_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 지하철역에서 — 역무원에게 길 찾기' },
  { id:'sub_1',  speaker:'A', japanese:'すみません、〜線はどこですか？',       romaji:'sumimasen, ~ sen wa doko desu ka',    korean:'저기요, ~호선은 어디예요?',     tip:'〜에 노선명을 넣으세요' },
  { id:'sub_2',  speaker:'B', japanese:'あちらの階段を降りてください。',       romaji:'achira no kaidan wo kudasai',         korean:'저쪽 계단으로 내려가세요.' },
  { id:'sub_3',  speaker:'A', japanese:'乗り換えはどこですか？',               romaji:'norikae wa doko desu ka',             korean:'환승은 어디서 하나요?' },
  { id:'sub_4',  speaker:'B', japanese:'２番出口の方向です。',                 romaji:'niban deguchi no houkou desu',        korean:'2번 출구 방향입니다.' },
  { id:'sub_5',  speaker:'A', japanese:'切符を買いたいのですが。',             romaji:'kippu wo kaitai no desu ga',          korean:'표를 사고 싶은데요.' },
  { id:'sub_6',  speaker:'B', japanese:'あの自動券売機でお買い求めください。', romaji:'ano jidou kenbaiki de okaimotome kudasai', korean:'저 자동발매기에서 구입해 주세요.' },
  { id:'sub_7',  speaker:'A', japanese:'この電車は渋谷に止まりますか？',      romaji:'kono densha wa shibuya ni tomarimasu ka', korean:'이 전철 시부야에 서나요?' },
  { id:'sub_8',  speaker:'B', japanese:'はい、次は渋谷です。',                romaji:'hai, tsugi wa shibuya desu',          korean:'네, 다음은 시부야입니다.' },
  { id:'sub_9',  speaker:'A', japanese:'終電は何時ですか？',                  romaji:'shuuden wa nanji desu ka',            korean:'막차가 몇 시예요?' },
  { id:'sub_10', speaker:'B', japanese:'終電は０時３０分です。お気をつけて。', romaji:'shuuden wa reiji sanjuppun desu. okitsukete', korean:'막차는 0시 30분입니다. 조심히 가세요.' },

  // ── 엘리베이터 (sim_elevator) ────────────────────────────
  { id:'elv_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 백화점 엘리베이터에서 — 층수 안내 받기' },
  { id:'elv_1',  speaker:'A', japanese:'すみません、何階ですか？',             romaji:'sumimasen, nankai desu ka',           korean:'저기요, 몇 층이에요?' },
  { id:'elv_2',  speaker:'B', japanese:'こちらは地下一階です。',               romaji:'kochira wa chika ikkai desu',         korean:'여기는 지하 1층입니다.' },
  { id:'elv_3',  speaker:'A', japanese:'レストランは何階ですか？',             romaji:'resutoran wa nankai desu ka',         korean:'레스토랑은 몇 층이에요?' },
  { id:'elv_4',  speaker:'B', japanese:'８階にございます。上に参ります。',     romaji:'hakkai ni gozaimasu. ue ni mairimasu', korean:'8층에 있습니다. 위로 올라갑니다.' },
  { id:'elv_5',  speaker:'A', japanese:'開けてください！',                     romaji:'akete kudasai',                       korean:'(문) 열어 주세요!',             tip:'닫히는 엘리베이터에' },
  { id:'elv_6',  speaker:'B', japanese:'失礼しました。どうぞお乗りください。', romaji:'shitsurei shimashita. douzo onori kudasai', korean:'실례했습니다. 어서 타세요.' },
  { id:'elv_7',  speaker:'A', japanese:'屋上はありますか？',                   romaji:'okujou wa arimasu ka',                korean:'옥상 있나요?' },
  { id:'elv_8',  speaker:'B', japanese:'申し訳ありません、屋上は立入禁止です。', romaji:'moushiwake arimasen, okujou wa tachiiri kinshi desu', korean:'죄송합니다, 옥상은 출입금지입니다.' },
  { id:'elv_9',  speaker:'A', japanese:'すみません、降ります。',               romaji:'sumimasen, orimasu',                  korean:'실례합니다, 내립니다.' },
  { id:'elv_10', speaker:'B', japanese:'ありがとうございました！',              romaji:'arigatou gozaimashita',               korean:'감사합니다!' },

  // ── 화장실 (sim_toilet) ──────────────────────────────────
  { id:'tlt_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지·가게에서 — 화장실 찾기' },
  { id:'tlt_1',  speaker:'A', japanese:'すみません、トイレはどこですか？',     romaji:'sumimasen, toire wa doko desu ka',    korean:'저기요, 화장실 어디예요?' },
  { id:'tlt_2',  speaker:'B', japanese:'突き当たりを左に曲がってください。',    romaji:'tsukiatari wo hidari ni magatte kudasai', korean:'막다른 곳에서 왼쪽으로 꺾으세요.' },
  { id:'tlt_3',  speaker:'A', japanese:'並んでいますか？',                     romaji:'narande imasu ka',                    korean:'줄 서 있는 건가요?' },
  { id:'tlt_4',  speaker:'B', japanese:'はい、少し並んでいます。',              romaji:'hai, sukoshi narande imasu',          korean:'네, 조금 줄 서 있어요.' },
  { id:'tlt_5',  speaker:'A', japanese:'多目的トイレはありますか？',           romaji:'tamokuteki toire wa arimasu ka',      korean:'다목적 화장실 있나요?' },
  { id:'tlt_6',  speaker:'B', japanese:'はい、エレベーターの隣にございます。', romaji:'hai, erebeetaa no tonari ni gozaimasu', korean:'네, 엘리베이터 옆에 있습니다.' },
  { id:'tlt_7',  speaker:'A', japanese:'ウォシュレットの使い方がわかりません。', romaji:'woshuretto no tsukaikata ga wakarimasen', korean:'비데 사용법을 모르겠어요.' },
  { id:'tlt_8',  speaker:'B', japanese:'このボタンで流せます。こちらが温水です。', romaji:'kono botan de nagasemasu. kochira ga onsui desu', korean:'이 버튼으로 내릴 수 있어요. 이쪽이 온수예요.' },
  { id:'tlt_n2', speaker:'N', japanese:'', romaji:'', korean:'💡 일본 화장실은 고급! 비데(ウォシュレット) 사용법도 익혀두세요.' },

  // ── 흡연실 (sim_smoking) ─────────────────────────────────
  { id:'smkd_n1',speaker:'N', japanese:'', romaji:'', korean:'📍 식당·호텔에서 — 흡연 공간 확인' },
  { id:'smkd_1', speaker:'A', japanese:'すみません、喫煙所はどこですか？',     romaji:'sumimasen, kitsuenjo wa doko desu ka', korean:'저기요, 흡연실 어디예요?' },
  { id:'smkd_2', speaker:'B', japanese:'建物の外にございます。',               romaji:'tatemono no soto ni gozaimasu',       korean:'건물 밖에 있습니다.' },
  { id:'smkd_3', speaker:'A', japanese:'喫煙席はありますか？',                 romaji:'kitsuen seki wa arimasu ka',          korean:'흡연석 있나요?' },
  { id:'smkd_4', speaker:'B', japanese:'申し訳ありませんが、当店は全席禁煙です。', romaji:'moushiwake arimasen ga, touten wa zenseki kinen desu', korean:'죄송하지만 저희 가게는 전석 금연입니다.' },
  { id:'smkd_5', speaker:'A', japanese:'加熱式タバコは使えますか？',           romaji:'kanetsu shiki tabako wa tsukaemasu ka', korean:'전자담배 사용 가능한가요?' },
  { id:'smkd_6', speaker:'B', japanese:'はい、喫煙所内でのみご使用いただけます。', romaji:'hai, kitsuenjo nai demo nomi goshiyou itadakemasu', korean:'네, 흡연실 내에서만 사용 가능합니다.' },
  { id:'smkd_7', speaker:'A', japanese:'外で吸ってきます。すぐ戻ります。',     romaji:'soto de sutte kimasu. sugu modorimasu', korean:'밖에서 피우고 올게요. 바로 돌아올게요.' },
  { id:'smkd_8', speaker:'B', japanese:'はい、どうぞ。灰皿はそちらにあります。', romaji:'hai, douzo. haizara wa sochira ni arimasu', korean:'네, 다녀오세요. 재떨이는 저쪽에 있어요.' },

  // ══════════════════════════════════════════════════════════
  //  여행 그룹 추가 (simlevel:3) — 버스 / 체크인 / 체크아웃 / 룸서비스 / 전화예약
  // ══════════════════════════════════════════════════════════

  // ── 버스 (sim_bus) ───────────────────────────────────────
  { id:'bus_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 버스 정류장에서 — 탑승·하차·요금 확인' },
  { id:'bus_1',  speaker:'A', japanese:'すみません、このバスは浅草に行きますか？', romaji:'sumimasen, kono basu wa asakusa ni ikimasu ka', korean:'저기요, 이 버스 아사쿠사 가나요?' },
  { id:'bus_2',  speaker:'B', japanese:'はい、行きます。次のバス停で乗れますよ。', romaji:'hai, ikimasu. tsugi no basutei de noremasu yo', korean:'네, 갑니다. 다음 정류장에서 타실 수 있어요.' },
  { id:'bus_3',  speaker:'A', japanese:'一日乗車券はありますか？',              romaji:'ichinichi joushaken wa arimasu ka',    korean:'1일 승차권 있나요?' },
  { id:'bus_4',  speaker:'B', japanese:'はい、８００円です。終日ご利用いただけます。', romaji:'hai, happyakuen desu. shujitsu goriyou itadakemasu', korean:'네, 800엔입니다. 하루 종일 이용 가능합니다.' },
  { id:'bus_5',  speaker:'A', japanese:'整理券を取ってください。',              romaji:'seiriken wo totte kudasai',           korean:'정리권을 뽑아주세요.',          tip:'뒷문 승차 버스의 경우' },
  { id:'bus_6',  speaker:'B', japanese:'こちらが整理券です。降りる時にお支払いください。', romaji:'kochira ga seiriken desu. oriru toki ni oshiharai kudasai', korean:'여기 정리권입니다. 내릴 때 내주세요.' },
  { id:'bus_7',  speaker:'A', japanese:'浅草に着いたら教えてもらえますか？',    romaji:'asakusa ni tsuitara oshiete moraemasu ka', korean:'아사쿠사에 도착하면 알려주실 수 있나요?' },
  { id:'bus_8',  speaker:'B', japanese:'もちろんです。次の停留所が浅草です。',  romaji:'mochiron desu. tsugi no teiryuujo ga asakusa desu', korean:'물론이죠. 다음 정류장이 아사쿠사입니다.' },
  { id:'bus_9',  speaker:'A', japanese:'次で降ります。ありがとうございます。',  romaji:'tsugi de orimasu. arigatou gozaimasu', korean:'다음에 내릴게요. 감사합니다.' },
  { id:'bus_10', speaker:'B', japanese:'お気をつけて！いい旅を！',              romaji:'okitsukete! ii tabi wo',              korean:'조심히 가세요! 좋은 여행 되세요!' },

  // ── 체크인 (sim_checkin) ─────────────────────────────────
  { id:'cin_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트 — 체크인 전체 절차' },
  { id:'cin_1',  speaker:'A', japanese:'チェックインお願いします。',            romaji:'chekku in onegai shimasu',            korean:'체크인 부탁합니다.' },
  { id:'cin_2',  speaker:'B', japanese:'ご予約のお名前をお聞かせください。',    romaji:'goyoyaku no onamae wo okikase kudasai', korean:'예약 성함을 말씀해 주세요.' },
  { id:'cin_3',  speaker:'A', japanese:'キム・ミンジュンです。パスポートはこちらです。', romaji:'kimu minjun desu. pasupooto wa kochira desu', korean:'김민준입니다. 여권 여기 있습니다.' },
  { id:'cin_4',  speaker:'B', japanese:'ありがとうございます。禁煙のお部屋でございますね。', romaji:'arigatou gozaimasu. kinen no oheya de gozaimasu ne', korean:'감사합니다. 금연 방이시죠.' },
  { id:'cin_5',  speaker:'A', japanese:'朝食は付いていますか？',               romaji:'choushoku wa tsuite imasu ka',        korean:'조식 포함인가요?' },
  { id:'cin_6',  speaker:'B', japanese:'はい、７時から１０時まで２階のレストランでお召し上がりいただけます。', romaji:'hai, shichiji kara juuji made nikai no resutoran de omeshiagari itadakemasu', korean:'네, 7시부터 10시까지 2층 레스토랑에서 드실 수 있습니다.' },
  { id:'cin_7',  speaker:'A', japanese:'荷物を先に預けられますか？',           romaji:'nimotsu wo saki ni azukeraremasu ka', korean:'짐을 먼저 맡길 수 있나요?' },
  { id:'cin_8',  speaker:'B', japanese:'はい、こちらでお預かりします。',       romaji:'hai, kochira de oazukari shimasu',    korean:'네, 여기서 맡아드리겠습니다.' },
  { id:'cin_9',  speaker:'A', japanese:'Wi-Fiのパスワードは何ですか？',        romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호 뭐예요?' },
  { id:'cin_10', speaker:'B', japanese:'こちらのカードに記載されています。お部屋は５０３号室です。', romaji:'kochira no kaado ni kisai sarete imasu. oheya wa gohyakusan goushitsu desu', korean:'이 카드에 적혀 있습니다. 방은 503호실입니다.' },
  { id:'cin_11', speaker:'A', japanese:'ありがとうございます。よろしくお願いします。', romaji:'arigatou gozaimasu. yoroshiku onegaishimasu', korean:'감사합니다. 잘 부탁드립니다.' },

  // ── 체크아웃 (sim_checkout) ──────────────────────────────
  { id:'cout_n1',speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크아웃 — 짐 맡기기·택시·영수증' },
  { id:'cout_1', speaker:'A', japanese:'チェックアウトお願いします。',          romaji:'chekku auto onegai shimasu',          korean:'체크아웃 부탁합니다.' },
  { id:'cout_2', speaker:'B', japanese:'お部屋番号をお聞かせください。',        romaji:'oheya bangou wo okikase kudasai',     korean:'방 번호 말씀해 주세요.' },
  { id:'cout_3', speaker:'A', japanese:'５０３号室です。',                      romaji:'gohyakusan goushitsu desu',           korean:'503호실입니다.' },
  { id:'cout_4', speaker:'B', japanese:'ご精算は２万３千円でございます。',      romaji:'goseisan wa niman sanzenen de gozaimasu', korean:'정산 금액은 23,000엔입니다.' },
  { id:'cout_5', speaker:'A', japanese:'荷物を預かってもらえますか？飛行機まで時間があります。', romaji:'nimotsu wo azukatte moraemasu ka. hikouki made jikan ga arimasu', korean:'짐 맡아주실 수 있나요? 비행기까지 시간이 있어서요.' },
  { id:'cout_6', speaker:'B', japanese:'もちろんです。こちらに番号を書いてください。', romaji:'mochiron desu. kochira ni bangou wo kaite kudasai', korean:'물론이죠. 여기에 번호를 써 주세요.' },
  { id:'cout_7', speaker:'A', japanese:'タクシーを呼んでいただけますか？空港まで。', romaji:'takushii wo yonde itadakemasu ka. kuukou made', korean:'택시 불러주실 수 있나요? 공항까지요.' },
  { id:'cout_8', speaker:'B', japanese:'はい、ただいまお呼びします。約１０分で参ります。', romaji:'hai, tadaima oyobi shimasu. yaku juppun de mairimasu', korean:'네, 지금 바로 부르겠습니다. 약 10분 후에 올 겁니다.' },
  { id:'cout_9', speaker:'A', japanese:'楽しかったです。ありがとうございました。', romaji:'tanoshikatta desu. arigatou gozaimashita', korean:'즐거웠어요. 감사합니다.' },
  { id:'cout_10',speaker:'B', japanese:'またのご来館をお待ちしております！',    romaji:'mata no goraikan wo omachi shite orimasu', korean:'다음에 또 방문해 주세요!' },

  // ── 룸서비스 (sim_roomservice) ───────────────────────────
  { id:'rs_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 방에서 — 전화로 룸서비스 요청' },
  { id:'rs_1',   speaker:'A', japanese:'もしもし、ルームサービスをお願いします。', romaji:'moshi moshi, ruumu saabisu wo onegai shimasu', korean:'여보세요, 룸서비스 부탁합니다.' },
  { id:'rs_2',   speaker:'B', japanese:'はい、フロントでございます。ご注文をどうぞ。', romaji:'hai, furonto de gozaimasu. gochuumon wo douzo', korean:'네, 프런트입니다. 주문하세요.' },
  { id:'rs_3',   speaker:'A', japanese:'タオルを２枚持ってきてください。',      romaji:'taoru wo nimai motte kite kudasai',    korean:'수건 두 장 가져다 주세요.' },
  { id:'rs_4',   speaker:'B', japanese:'承知しました。他にご要望はございますか。', romaji:'shouchi shimashita. hoka ni goyouhou wa gozaimasu ka', korean:'알겠습니다. 다른 요청사항 있으신가요?' },
  { id:'rs_5',   speaker:'A', japanese:'エアコンが効きません。直してもらえますか。', romaji:'eakon ga kikimasen. naoshite moraemasu ka', korean:'에어컨이 안 돼요. 고쳐주실 수 있나요?' },
  { id:'rs_6',   speaker:'B', japanese:'ただいまスタッフを向かわせます。１５分ほどお待ちください。', romaji:'tadaima sutaffu wo mukawasemasu. juugofun hodo omachi kudasai', korean:'지금 바로 직원을 보내겠습니다. 15분 정도 기다려 주세요.' },
  { id:'rs_7',   speaker:'A', japanese:'朝食は何時からですか？',               romaji:'choushoku wa nanji kara desu ka',     korean:'조식은 몇 시부터예요?' },
  { id:'rs_8',   speaker:'B', japanese:'７時から１０時まで、２階のレストランでお召し上がりいただけます。', romaji:'shichiji kara juuji made, nikai no resutoran de omeshiagari itadakemasu', korean:'7시부터 10시까지 2층 레스토랑에서 드실 수 있습니다.' },
  { id:'rs_9',   speaker:'A', japanese:'ありがとうございます。',               romaji:'arigatou gozaimasu',                  korean:'감사합니다.' },
  { id:'rs_10',  speaker:'B', japanese:'何かあればいつでもお申し付けください。', romaji:'nanika areba itsudemo omousitsuke kudasai', korean:'무슨 일이 있으면 언제든지 말씀해 주세요.' },

  // ── 전화 예약 (sim_phone) ────────────────────────────────
  { id:'ph_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 전화로 예약하기 — 식당·숙소 예약' },
  { id:'ph_1',   speaker:'A', japanese:'もしもし、予約をしたいのですが。',      romaji:'moshi moshi, yoyaku wo shitai no desu ga', korean:'여보세요, 예약을 하고 싶은데요.' },
  { id:'ph_2',   speaker:'B', japanese:'はい、何名様でしょうか？',              romaji:'hai, nanmei sama deshou ka',          korean:'네, 몇 분이세요?' },
  { id:'ph_3',   speaker:'A', japanese:'２名で、明日の７時はありますか？',      romaji:'futari de, ashita no shichiji wa arimasu ka', korean:'두 명이요, 내일 7시 가능한가요?' },
  { id:'ph_4',   speaker:'B', japanese:'少々お待ちください。…はい、ご用意できます。', romaji:'shoushou omachi kudasai. ... hai, goyoui dekimasu', korean:'잠깐만요. …네, 자리 있습니다.' },
  { id:'ph_5',   speaker:'A', japanese:'お名前とお電話番号をお願いします。',    romaji:'onamae to odenwa bangou wo onegai shimasu', korean:'성함과 전화번호 부탁드립니다.',  tip:'상대방(B)이 묻는 표현도 이해해야!' },
  { id:'ph_6',   speaker:'A', japanese:'キム・ミンジュンです。０９０－１２３４－５６７８です。', romaji:'kimu minjun desu. zero kyuu zero no ichi ni san yon no go roku nana hachi desu', korean:'김민준입니다. 090-1234-5678입니다.' },
  { id:'ph_7',   speaker:'B', japanese:'ありがとうございます。ご予約を承りました。', romaji:'arigatou gozaimasu. goyoyaku wo uketamawarimashita', korean:'감사합니다. 예약 접수했습니다.' },
  { id:'ph_8',   speaker:'A', japanese:'キャンセルの場合はどうすればいいですか？', romaji:'kyanseru no baai wa dou sureba ii desu ka', korean:'취소할 경우 어떻게 하면 되나요?' },
  { id:'ph_9',   speaker:'B', japanese:'前日までにお電話をいただければ大丈夫です。', romaji:'zenjitsu made ni odenwa wo itadakereba daijoubu desu', korean:'전날까지 전화 주시면 됩니다.' },
  { id:'ph_10',  speaker:'A', japanese:'わかりました。よろしくお願いします。',  romaji:'wakarimashita. yoroshiku onegaishimasu', korean:'알겠습니다. 잘 부탁드립니다.' },
  { id:'ph_11',  speaker:'B', japanese:'お待ちしております！',                  romaji:'omachi shite orimasu',                korean:'기다리겠습니다!' },

  // ══════════════════════════════════════════════════════════
  //  변형 대화 시나리오 (Variant Dialogues)
  // ══════════════════════════════════════════════════════════

  // ── 식당 변형 ②: 회전초밥 가게 ───────────────────────────
  { id:'rd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 회전초밥 가게 — 자리 안내·추가 주문·계산' },
  { id:'rd2_1',  speaker:'B', japanese:'いらっしゃいませ！カウンターとテーブル、どちらになさいますか？', romaji:'irasshaimase! kauntaa to teeburu, dochira ni nasaimasu ka', korean:'어서 오세요! 카운터와 테이블 중 어디로 하시겠어요?' },
  { id:'rd2_2',  speaker:'A', japanese:'テーブルをお願いします。', romaji:'teeburu wo onegai shimasu', korean:'테이블로 부탁드려요.' },
  { id:'rd2_3',  speaker:'B', japanese:'こちらへどうぞ。タッチパネルからご注文いただけます。', romaji:'kochira e douzo. tatchi paneru kara gochuumon itadakemasu', korean:'이쪽으로 오세요. 터치패널로 주문하실 수 있어요.' },
  { id:'rd2_4',  speaker:'A', japanese:'すみません、このネタは何ですか？', romaji:'sumimasen, kono neta wa nan desu ka', korean:'저기요, 이 재료는 뭐예요?' },
  { id:'rd2_5',  speaker:'B', japanese:'マグロです。本日のおすすめですよ。', romaji:'maguro desu. honjitsu no osusume desu yo', korean:'참치예요. 오늘의 추천이에요.' },
  { id:'rd2_6',  speaker:'A', japanese:'じゃあ、マグロを二皿とサーモンを一皿ください。', romaji:'jaa, maguro wo nisa ra to saamon wo hitosara kudasai', korean:'그럼 참치 두 접시랑 연어 한 접시 주세요.' },
  { id:'rd2_7',  speaker:'B', japanese:'かしこまりました。すぐにお持ちします。', romaji:'kashikomarimashita. sugu ni omochi shimasu', korean:'알겠습니다. 바로 가져다드릴게요.' },
  { id:'rd2_8',  speaker:'A', japanese:'お茶のおかわりをもらえますか？', romaji:'ocha no okawari wo moraemasu ka', korean:'차 리필 해주실 수 있나요?' },
  { id:'rd2_9',  speaker:'B', japanese:'はい、どうぞ。他にご注文はございますか？', romaji:'hai, douzo. hoka ni gochuumon wa gozaimasu ka', korean:'네, 여기요. 다른 주문 있으신가요?' },
  { id:'rd2_10', speaker:'A', japanese:'大丈夫です。お会計をお願いします。', romaji:'daijoubu desu. okaikei wo onegai shimasu', korean:'괜찮아요. 계산 부탁드려요.' },
  { id:'rd2_11', speaker:'B', japanese:'2,400円でございます。ありがとうございました！', romaji:'nisen yonhyaku en de gozaimasu. arigatou gozaimashita', korean:'2,400엔이에요. 감사합니다!' },

  // ── 식당 변형 ③: 라멘 가게 ──────────────────────────────
  { id:'rd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 라멘 가게 — 식권 구매·토핑 추가·퇴장' },
  { id:'rd3_1',  speaker:'A', japanese:'すみません、券売機の使い方が分からないんですが…', romaji:'sumimasen, kenbaiki no tsukaikata ga wakaranain desu ga', korean:'저기요, 자판기 사용법을 모르겠는데요…' },
  { id:'rd3_2',  speaker:'B', japanese:'食べたいメニューのボタンを押してから、お金を入れてください。', romaji:'tabetai menyuu no botan wo oshite kara, okane wo irete kudasai', korean:'먹고 싶은 메뉴 버튼을 누른 다음 돈을 넣어 주세요.' },
  { id:'rd3_3',  speaker:'A', japanese:'醤油と塩、どちらがおすすめですか？', romaji:'shouyu to shio, dochira ga osusume desu ka', korean:'간장이랑 소금 중 어느 게 추천이에요?' },
  { id:'rd3_4',  speaker:'B', japanese:'醤油が一番人気です。', romaji:'shouyu ga ichiban ninki desu', korean:'간장이 가장 인기 있어요.' },
  { id:'rd3_5',  speaker:'A', japanese:'じゃあ、醤油ラーメンにします。食券をどうぞ。', romaji:'jaa, shouyu raamen ni shimasu. shokken wo douzo', korean:'그럼 간장 라멘으로 할게요. 식권 여기요.' },
  { id:'rd3_6',  speaker:'B', japanese:'カウンターへお座りください。麺の固さはいかがですか？', romaji:'kauntaa e osuwari kudasai. men no katasa wa ikaga desu ka', korean:'카운터에 앉으세요. 면 굳기는 어떻게 하시겠어요?' },
  { id:'rd3_7',  speaker:'A', japanese:'普通でお願いします。ネギは多めにできますか？', romaji:'futsuu de onegai shimasu. negi wa oome ni dekimasu ka', korean:'보통으로 해주세요. 파는 많이 넣어주실 수 있나요?' },
  { id:'rd3_8',  speaker:'B', japanese:'かしこまりました。少々お待ちください。', romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만요.' },
  { id:'rd3_9',  speaker:'A', japanese:'ごちそうさまでした！とてもおいしかったです。', romaji:'gochisousama deshita! totemo oishikatta desu', korean:'잘 먹었습니다! 정말 맛있었어요.' },
  { id:'rd3_10', speaker:'B', japanese:'ありがとうございます！またお越しください。', romaji:'arigatou gozaimasu! mata okoshi kudasai', korean:'감사합니다! 또 오세요.' },

  // ── 처음 만남 변형 ②: 신칸센 안에서 ────────────────────
  { id:'dm2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 신칸센 안에서 — 옆 승객과 여행 이야기' },
  { id:'dm2_1',  speaker:'A', japanese:'あのう、ここは15Aですか？', romaji:'anou, koko wa juugo ei desu ka', korean:'저기요, 여기가 15A인가요?' },
  { id:'dm2_2',  speaker:'B', japanese:'はい、そうです。どうぞお座りください。', romaji:'hai, sou desu. douzo osuwari kudasai', korean:'네, 맞아요. 앉으세요.' },
  { id:'dm2_3',  speaker:'A', japanese:'ありがとうございます。どちらへ行かれるんですか？', romaji:'arigatou gozaimasu. dochira e ikareru n desu ka', korean:'감사합니다. 어디 가시는 거예요?' },
  { id:'dm2_4',  speaker:'B', japanese:'京都まで行きます。観光ですか？', romaji:'kyouto made ikimasu. kankou desu ka', korean:'교토까지 가요. 관광이세요?' },
  { id:'dm2_5',  speaker:'A', japanese:'ええ、初めてです。おすすめの場所はありますか？', romaji:'ee, hajimete desu. osusume no basho wa arimasu ka', korean:'네, 처음이에요. 추천하는 곳이 있나요?' },
  { id:'dm2_6',  speaker:'B', japanese:'金閣寺は絶対に行ってください！すごく綺麗ですよ。', romaji:'kinkakuji wa zettai ni itte kudasai! sugoku kirei desu yo', korean:'금각사는 꼭 가보세요! 정말 예뻐요.' },
  { id:'dm2_7',  speaker:'A', japanese:'食べ物でおすすめはありますか？', romaji:'tabemono de osusume wa arimasu ka', korean:'음식으로 추천은요?' },
  { id:'dm2_8',  speaker:'B', japanese:'京都は湯豆腐が有名です。ぜひ食べてみてください。', romaji:'kyouto wa yudoufu ga yuumei desu. zehi tabete mite kudasai', korean:'교토는 유두부가 유명해요. 꼭 먹어보세요.' },
  { id:'dm2_9',  speaker:'A', japanese:'いいですね！楽しみになってきました。', romaji:'ii desu ne! tanoshimi ni natte kimashita', korean:'좋네요! 기대되기 시작했어요.' },
  { id:'dm2_10', speaker:'B', japanese:'良い旅を！何か困ったら遠慮なく聞いてくださいね。', romaji:'yoi tabi wo! nanika komattara enryo naku kiite kudasai ne', korean:'좋은 여행 되세요! 곤란한 일 있으면 편하게 물어보세요.' },
  { id:'dm2_11', speaker:'A', japanese:'ありがとうございます。おかげで安心しました！', romaji:'arigatou gozaimasu. okage de anshin shimashita', korean:'감사합니다. 덕분에 안심했어요!' },

  // ── 처음 만남 변형 ③: 게스트하우스에서 ─────────────────
  { id:'dm3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 게스트하우스 라운지 — 여행자끼리 대화' },
  { id:'dm3_1',  speaker:'B', japanese:'こんにちは！日本語が上手ですね。', romaji:'konnichiwa! nihongo ga jouzu desu ne', korean:'안녕하세요! 일본어 잘하시네요.' },
  { id:'dm3_2',  speaker:'A', japanese:'ありがとうございます。まだまだ勉強中です。', romaji:'arigatou gozaimasu. madamada benkyouchuu desu', korean:'감사합니다. 아직 공부 중이에요.' },
  { id:'dm3_3',  speaker:'B', japanese:'どこから来ましたか？', romaji:'doko kara kimashita ka', korean:'어디서 오셨어요?' },
  { id:'dm3_4',  speaker:'A', japanese:'韓国から来ました。日本語を勉強して半年になります。', romaji:'kankoku kara kimashita. nihongo wo benkyou shite hantoshi ni narimasu', korean:'한국에서 왔어요. 일본어 공부한 지 반 년 됐어요.' },
  { id:'dm3_5',  speaker:'B', japanese:'すごい！日本はどこどこ行きましたか？', romaji:'sugoi! nihon wa doko doko ikimashita ka', korean:'대단해요! 일본 어디어디 가셨어요?' },
  { id:'dm3_6',  speaker:'A', japanese:'東京と大阪に行きました。今日は奈良に行くつもりです。', romaji:'toukyou to oosaka ni ikimashita. kyou wa nara ni iku tsumori desu', korean:'도쿄랑 오사카에 갔어요. 오늘은 나라에 갈 생각이에요.' },
  { id:'dm3_7',  speaker:'B', japanese:'奈良の鹿はかわいいですよ！鹿せんべいを買うといいですよ。', romaji:'nara no shika wa kawaii desu yo! shika senbei wo kau to ii desu yo', korean:'나라의 사슴은 귀여워요! 사슴 전병 사면 좋아요.' },
  { id:'dm3_8',  speaker:'A', japanese:'知りませんでした！ありがとうございます。', romaji:'shirimasen deshita! arigatou gozaimasu', korean:'몰랐어요! 감사해요.' },
  { id:'dm3_9',  speaker:'B', japanese:'夜はここで一緒に食事しませんか？', romaji:'yoru wa koko de issho ni shokuji shimasen ka', korean:'저녁에는 여기서 같이 밥 먹지 않겠어요?' },
  { id:'dm3_10', speaker:'A', japanese:'ぜひ！楽しみにしています。', romaji:'zehi! tanoshimi ni shite imasu', korean:'꼭 그래요! 기대할게요.' },

  // ── 편의점 변형 ②: 복사기 + 핫스낵 ─────────────────────
  { id:'kd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 — 복사기 사용 + 핫스낵 구매' },
  { id:'kd2_1',  speaker:'A', japanese:'すみません、コピー機の使い方を教えていただけますか？', romaji:'sumimasen, kopii ki no tsukaikata wo oshiete itadakemasu ka', korean:'저기요, 복사기 사용법을 알려주실 수 있나요?' },
  { id:'kd2_2',  speaker:'B', japanese:'はい。まずコインを入れてください。白黒1枚10円です。', romaji:'hai. mazu koin wo irete kudasai. shirokuro ichimai juuen desu', korean:'네. 먼저 동전을 넣어 주세요. 흑백 한 장에 10엔이에요.' },
  { id:'kd2_3',  speaker:'A', japanese:'ありがとうございます。ホットスナックはありますか？', romaji:'arigatou gozaimasu. hotto sunakku wa arimasu ka', korean:'감사합니다. 핫스낵이 있나요?' },
  { id:'kd2_4',  speaker:'B', japanese:'はい、レジ横にございます。今日はから揚げがおすすめです。', romaji:'hai, reji yoko ni gozaimasu. kyou wa karaage ga osusume desu', korean:'네, 계산대 옆에 있어요. 오늘은 닭튀김 추천이에요.' },
  { id:'kd2_5',  speaker:'A', japanese:'じゃあ、から揚げを二個ください。', romaji:'jaa, karaage wo niko kudasai', korean:'그럼 닭튀김 두 개 주세요.' },
  { id:'kd2_6',  speaker:'B', japanese:'少々お待ちください。温めますか？', romaji:'shoushou omachi kudasai. atatamemasu ka', korean:'잠시만요. 데울까요?' },
  { id:'kd2_7',  speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁드려요.' },
  { id:'kd2_8',  speaker:'B', japanese:'コピー代込みで350円になります。', romaji:'kopii dai komi de sanbyaku gojuuen ni narimasu', korean:'복사 비용 포함해서 350엔이에요.' },
  { id:'kd2_9',  speaker:'A', japanese:'Suicaで払います。ありがとうございました。', romaji:'suika de haraimasu. arigatou gozaimashita', korean:'스이카로 낼게요. 감사합니다.' },
  { id:'kd2_10', speaker:'B', japanese:'ありがとうございました！またどうぞ。', romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.' },

  // ── 편의점 변형 ③: 심야 공과금 납부 + 우산 ──────────────
  { id:'kd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 (심야) — 공과금 납부 + 우산 구매' },
  { id:'kd3_1',  speaker:'A', japanese:'すみません、電気代の支払いはできますか？', romaji:'sumimasen, denkidai no shiharai wa dekimasu ka', korean:'저기요, 전기세 납부 할 수 있나요?' },
  { id:'kd3_2',  speaker:'B', japanese:'はい、払込票をお持ちでしたらできます。', romaji:'hai, haraikomi hyou wo omochi deshitara dekimasu', korean:'네, 납부서를 가지고 오셨으면 할 수 있어요.' },
  { id:'kd3_3',  speaker:'A', japanese:'これです。お願いします。', romaji:'kore desu. onegai shimasu', korean:'이거요. 부탁드려요.' },
  { id:'kd3_4',  speaker:'B', japanese:'5,800円です。現金のみになります。', romaji:'gosen happyaku en desu. genkin nomi ni narimasu', korean:'5,800엔이에요. 현금만 가능해요.' },
  { id:'kd3_5',  speaker:'A', japanese:'わかりました。あと、傘はありますか？', romaji:'wakarimashita. ato, kasa wa arimasu ka', korean:'알겠어요. 그리고 우산이 있나요?' },
  { id:'kd3_6',  speaker:'B', japanese:'はい、入口の横にビニール傘がございます。500円です。', romaji:'hai, iriguchi no yoko ni biniru gasa ga gozaimasu. gohyaku en desu', korean:'네, 입구 옆에 비닐우산이 있어요. 500엔이에요.' },
  { id:'kd3_7',  speaker:'A', japanese:'一本ください。合計でいくらになりますか？', romaji:'ippon kudasai. goukei de ikura ni narimasu ka', korean:'한 개 주세요. 합계 얼마예요?' },
  { id:'kd3_8',  speaker:'B', japanese:'6,300円でございます。お釣りは200円です。', romaji:'rokusen sanbyaku en de gozaimasu. otsuri wa nihyaku en desu', korean:'6,300엔이에요. 거스름돈은 200엔이에요.' },
  { id:'kd3_9',  speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'감사합니다.' },
  { id:'kd3_10', speaker:'B', japanese:'お気をつけてどうぞ。', romaji:'okiotskete douzo', korean:'조심히 가세요.' },

  // ── 쇼핑 변형 ②: 전자제품 가게 ─────────────────────────
  { id:'sd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 전자제품 가게 — 이어폰 청음·보증·면세' },
  { id:'sd2_1',  speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？', romaji:'irasshaimase! nanika osagashi desu ka', korean:'어서 오세요! 찾으시는 게 있나요?' },
  { id:'sd2_2',  speaker:'A', japanese:'ワイヤレスイヤホンを探しています。おすすめはありますか？', romaji:'waiyaresu iyahon wo sagashite imasu. osusume wa arimasu ka', korean:'무선 이어폰을 찾고 있어요. 추천 있나요?' },
  { id:'sd2_3',  speaker:'B', japanese:'こちらのモデルが今一番売れています。試聴もできますよ。', romaji:'kochira no moderu ga ima ichiban urete imasu. shichou mo dekimasu yo', korean:'이 모델이 지금 제일 잘 팔려요. 청음도 할 수 있어요.' },
  { id:'sd2_4',  speaker:'A', japanese:'試してもいいですか？', romaji:'tameshite mo ii desu ka', korean:'해봐도 되나요?' },
  { id:'sd2_5',  speaker:'B', japanese:'もちろんです。こちらへどうぞ。', romaji:'mochiron desu. kochira e douzo', korean:'물론이죠. 이쪽으로 오세요.' },
  { id:'sd2_6',  speaker:'A', japanese:'音がいいですね。保証は何年ですか？', romaji:'oto ga ii desu ne. hoshou wa nannen desu ka', korean:'음질이 좋네요. 보증은 몇 년이에요?' },
  { id:'sd2_7',  speaker:'B', japanese:'一年保証です。延長保証もございます。', romaji:'ichinen hoshou desu. enchou hoshou mo gozaimasu', korean:'1년 보증이에요. 연장 보증도 있어요.' },
  { id:'sd2_8',  speaker:'A', japanese:'これにします。免税はできますか？', romaji:'kore ni shimasu. menzei wa dekimasu ka', korean:'이걸로 할게요. 면세 되나요?' },
  { id:'sd2_9',  speaker:'B', japanese:'5,500円以上のお買い上げで免税対象です。パスポートをお願いします。', romaji:'gosen gohyaku en ijou no okaiage de menzei taishou desu. pasupooto wo onegai shimasu', korean:'5,500엔 이상 구매 시 면세 대상이에요. 여권 부탁드려요.' },
  { id:'sd2_10', speaker:'A', japanese:'はい、こちらです。クレジットカードで払えますか？', romaji:'hai, kochira desu. kurejitto kaado de haraemasu ka', korean:'네, 여기요. 신용카드로 낼 수 있나요?' },
  { id:'sd2_11', speaker:'B', japanese:'はい、海外発行のカードも大丈夫ですよ。ありがとうございました！', romaji:'hai, kaigai hakkou no kaado mo daijoubu desu yo. arigatou gozaimashita', korean:'네, 해외 발행 카드도 괜찮아요. 감사합니다!' },

  // ── 쇼핑 변형 ③: 기념품 가게 ───────────────────────────
  { id:'sd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 기념품 가게 — 선물 포장·기내 반입 확인' },
  { id:'sd3_1',  speaker:'B', japanese:'いらっしゃいませ！ご贈答用ですか？', romaji:'irasshaimase! gozoutou you desu ka', korean:'어서 오세요! 선물용이세요?' },
  { id:'sd3_2',  speaker:'A', japanese:'はい、友達へのお土産を探しています。', romaji:'hai, tomodachi e no omiyage wo sagashite imasu', korean:'네, 친구한테 줄 기념품 찾고 있어요.' },
  { id:'sd3_3',  speaker:'B', japanese:'こちらの和菓子セットが人気ですよ。5個入りで800円です。', romaji:'kochira no wagashi setto ga ninki desu yo. itsutsu iri de happyaku en desu', korean:'이쪽 화과자 세트가 인기 있어요. 5개 들이에 800엔이에요.' },
  { id:'sd3_4',  speaker:'A', japanese:'いいですね。三箱ください。ラッピングはできますか？', romaji:'ii desu ne. mihako kudasai. rappingu wa dekimasu ka', korean:'좋네요. 세 박스 주세요. 포장 되나요?' },
  { id:'sd3_5',  speaker:'B', japanese:'もちろんです。無料でラッピングいたします。', romaji:'mochiron desu. muryou de rappingu itashimasu', korean:'물론이죠. 무료로 포장해 드릴게요.' },
  { id:'sd3_6',  speaker:'A', japanese:'ありがとうございます。これ、飛行機に持ち込めますか？', romaji:'arigatou gozaimasu. kore, hikouki ni mochikomemasu ka', korean:'감사합니다. 이거 비행기에 가지고 탈 수 있나요?' },
  { id:'sd3_7',  speaker:'B', japanese:'液体でなければ手荷物に入れられます。こちらは大丈夫です。', romaji:'ekitai de nakereba tenimotsu ni ireraremasu. kochira wa daijoubu desu', korean:'액체가 아니면 기내 수하물에 넣을 수 있어요. 이건 괜찮아요.' },
  { id:'sd3_8',  speaker:'A', japanese:'よかったです。全部でいくらですか？', romaji:'yokatta desu. zenbu de ikura desu ka', korean:'다행이네요. 전부 얼마예요?' },
  { id:'sd3_9',  speaker:'B', japanese:'2,400円です。袋はご利用ですか？', romaji:'nisen yonhyaku en desu. fukuro wa goriyou desu ka', korean:'2,400엔이에요. 봉투 사용하시겠어요?' },
  { id:'sd3_10', speaker:'A', japanese:'一枚だけください。カードで払います。', romaji:'ichimai dake kudasai. kaado de haraimasu', korean:'한 장만 주세요. 카드로 낼게요.' },
  { id:'sd3_11', speaker:'B', japanese:'ありがとうございました！いい旅を！', romaji:'arigatou gozaimashita! ii tabi wo', korean:'감사합니다! 좋은 여행 되세요!' },

  // ── 택시 변형 ②: 공항으로 (시간 촉박) ───────────────────
  { id:'tx2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 앞 — 공항까지 시간이 촉박한 상황' },
  { id:'tx2_1',  speaker:'A', japanese:'すみません！成田空港までいくらかかりますか？', romaji:'sumimasen! narita kuukou made ikura kakarimasu ka', korean:'저기요! 나리타 공항까지 얼마나 걸려요?' },
  { id:'tx2_2',  speaker:'B', japanese:'大体8,000円ほどです。今は渋滞があるかもしれません。', romaji:'daitai hassen en hodo desu. ima wa juutai ga aru kamo shiremasen', korean:'대략 8,000엔 정도요. 지금 막힐 수도 있어요.' },
  { id:'tx2_3',  speaker:'A', japanese:'飛行機が2時間後なんですが、間に合いますか？', romaji:'hikouki ga nijikan ato nan desu ga, maniaemasu ka', korean:'비행기가 2시간 후인데, 제 시간에 맞출 수 있을까요?' },
  { id:'tx2_4',  speaker:'B', japanese:'高速を使えば大丈夫だと思います。急ぎましょう！', romaji:'kousoku wo tsukaeba daijoubu da to omoimasu. isogimasyou', korean:'고속도로 이용하면 괜찮을 것 같아요. 서두릅시다!' },
  { id:'tx2_5',  speaker:'A', japanese:'お願いします。できるだけ急いでください。', romaji:'onegai shimasu. dekiru dake isoide kudasai', korean:'부탁드려요. 최대한 빨리 가주세요.' },
  { id:'tx2_6',  speaker:'B', japanese:'第一ターミナルですか、第二ですか？', romaji:'dai ichi taaminaru desu ka, daini desu ka', korean:'1터미널이에요, 2터미널이에요?' },
  { id:'tx2_7',  speaker:'A', japanese:'韓国エアラインなので第一です。', romaji:'kankoku earain nanode daichi desu', korean:'한국 항공사라서 1터미널이에요.' },
  { id:'tx2_8',  speaker:'B', japanese:'わかりました。出発ロビーの前で降ろしますね。', romaji:'wakarimashita. shuppatsu robii no mae de oroshimasu ne', korean:'알겠습니다. 출발 로비 앞에서 내려드릴게요.' },
  { id:'tx2_9',  speaker:'A', japanese:'ありがとうございます。カードで払えますか？', romaji:'arigatou gozaimasu. kaado de haraemasu ka', korean:'감사합니다. 카드로 낼 수 있나요?' },
  { id:'tx2_10', speaker:'B', japanese:'はい、到着したらお支払いください。もうすぐです！', romaji:'hai, touchaku shitara oshiharai kudasai. mousugu desu', korean:'네, 도착하면 결제해 주세요. 거의 다 왔어요!' },

  // ── 택시 변형 ③: 심야 이자카야 귀가 ─────────────────────
  { id:'tx3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야 앞 — 심야에 호텔로 귀가' },
  { id:'tx3_1',  speaker:'A', japanese:'すみません、新宿プリンスホテルまでお願いします。', romaji:'sumimasen, shinjuku purinsu hoteru made onegai shimasu', korean:'저기요, 신주쿠 프린스 호텔까지 부탁드려요.' },
  { id:'tx3_2',  speaker:'B', japanese:'かしこまりました。深夜料金になりますが、よろしいですか？', romaji:'kashikomarimashita. shinya ryoukin ni narimasu ga, yoroshii desu ka', korean:'알겠습니다. 심야 요금이 됩니다만, 괜찮으세요?' },
  { id:'tx3_3',  speaker:'A', japanese:'深夜料金とはどういう意味ですか？', romaji:'shinya ryoukin to wa dou iu imi desu ka', korean:'심야 요금이란 어떤 의미예요?' },
  { id:'tx3_4',  speaker:'B', japanese:'夜11時以降は2割増しになるんです。', romaji:'yoru juuichiji ikou wa niwari mashi ni naru n desu', korean:'밤 11시 이후는 20% 할증이 됩니다.' },
  { id:'tx3_5',  speaker:'A', japanese:'わかりました。大体いくらになりますか？', romaji:'wakarimashita. daitai ikura ni narimasu ka', korean:'알겠어요. 대략 얼마나 되나요?' },
  { id:'tx3_6',  speaker:'B', japanese:'1,500円くらいだと思います。', romaji:'sen gohyaku en kurai da to omoimasu', korean:'1,500엔 정도 될 것 같아요.' },
  { id:'tx3_7',  speaker:'A', japanese:'ありがとうございます。今日は楽しかったです！', romaji:'arigatou gozaimasu. kyou wa tanoshikatta desu', korean:'감사합니다. 오늘 즐거웠어요!' },
  { id:'tx3_8',  speaker:'B', japanese:'よかったですね！日本旅行はいつまでですか？', romaji:'yokatta desu ne! nihon ryokou wa itsu made desu ka', korean:'다행이에요! 일본 여행은 언제까지예요?' },
  { id:'tx3_9',  speaker:'A', japanese:'明日が最終日です。またいつか来たいです。', romaji:'ashita ga saishuubi desu. mata itsuka kitai desu', korean:'내일이 마지막 날이에요. 언젠가 또 오고 싶어요.' },
  { id:'tx3_10', speaker:'B', japanese:'ぜひまたどうぞ！着きましたよ。1,480円です。', romaji:'zehi mata douzo! tsukimashita yo. sen yonhyaku hachijuu en desu', korean:'꼭 또 오세요! 도착했어요. 1,480엔이에요.' },

  // ── 호텔 변형 ②: 체크인 + 방 문제 해결 ──────────────────
  { id:'hd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크인 — 체크인 후 방 문제 해결' },
  { id:'hd2_1',  speaker:'A', japanese:'チェックインをお願いします。Park Seoyeonと申します。', romaji:'chekkuin wo onegai shimasu. Paaku Seoyeon to moushimasu', korean:'체크인 부탁드려요. 박서연이라고 합니다.' },
  { id:'hd2_2',  speaker:'B', japanese:'ご予約確認いたしました。こちらが鍵になります。', romaji:'goyoyaku kakunin itashimashita. kochira ga kagi ni narimasu', korean:'예약 확인했어요. 이게 열쇠예요.' },
  { id:'hd2_3',  speaker:'A', japanese:'ありがとうございます。部屋に入ったら、エアコンが壊れていました。', romaji:'arigatou gozaimasu. heya ni haittara, eakon ga kowarete imashita', korean:'감사합니다. 방에 들어갔더니 에어컨이 고장났어요.' },
  { id:'hd2_4',  speaker:'B', japanese:'大変申し訳ございません。すぐに確認いたします。', romaji:'taihen moushiwake gozaimasen. sugu ni kakunin itashimasu', korean:'대단히 죄송합니다. 바로 확인해 드릴게요.' },
  { id:'hd2_5',  speaker:'A', japanese:'お湯も出ないんですが…', romaji:'oyu mo denai n desu ga', korean:'뜨거운 물도 안 나오는데요…' },
  { id:'hd2_6',  speaker:'B', japanese:'重ねてお詫び申し上げます。別のお部屋にご案内できますか？', romaji:'kasanete owabi moushiagemasu. betsu no oheya ni goannai dekimasu ka', korean:'거듭 사과드립니다. 다른 방으로 안내해 드릴 수 있을까요?' },
  { id:'hd2_7',  speaker:'A', japanese:'はい、お願いします。同じ料金で大丈夫ですか？', romaji:'hai, onegai shimasu. onaji ryoukin de daijoubu desu ka', korean:'네, 부탁드려요. 같은 가격으로 괜찮나요?' },
  { id:'hd2_8',  speaker:'B', japanese:'もちろんです。ご不便をおかけした分、朝食を無料でご提供します。', romaji:'mochiron desu. gofuben wo okake shita bun, choushoku wo muryou de goteikyo shimasu', korean:'물론이죠. 불편을 드린 만큼 조식을 무료로 제공해 드릴게요.' },
  { id:'hd2_9',  speaker:'A', japanese:'ありがとうございます。助かります。', romaji:'arigatou gozaimasu. tasukarimasu', korean:'감사합니다. 덕분에 살았어요.' },
  { id:'hd2_10', speaker:'B', japanese:'お荷物はお持ちしますか？', romaji:'onimotsu wa omochi shimasu ka', korean:'짐은 들어드릴까요?' },
  { id:'hd2_11', speaker:'A', japanese:'いいえ、大丈夫です。ありがとうございました。', romaji:'iie, daijoubu desu. arigatou gozaimashita', korean:'아니요, 괜찮아요. 감사합니다.' },

  // ── 호텔 변형 ③: 체크인 + 주변 맛집 추천 ────────────────
  { id:'hd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크인 — 주변 식당 · 조식 정보 확인' },
  { id:'hd3_1',  speaker:'A', japanese:'チェックインをお願いします。Choi Minwooと申します。', romaji:'chekkuin wo onegai shimasu. Choi Minwoo to moushimasu', korean:'체크인 부탁드려요. 최민우라고 합니다.' },
  { id:'hd3_2',  speaker:'B', japanese:'いらっしゃいませ！予約確認できました。', romaji:'irasshaimase! yoyaku kakunin dekimashita', korean:'어서 오세요! 예약 확인됐어요.' },
  { id:'hd3_3',  speaker:'A', japanese:'ありがとうございます。この辺でおすすめの食べ物屋さんはありますか？', romaji:'arigatou gozaimasu. kono hen de osusume no tabemonoya san wa arimasu ka', korean:'감사합니다. 이 근처에 추천하는 음식점이 있나요?' },
  { id:'hd3_4',  speaker:'B', japanese:'そうですね、徒歩3分のところに有名なラーメン屋があります。', romaji:'sou desu ne, toho sanpun no tokoro ni yuumei na raamen ya ga arimasu', korean:'음, 도보 3분 거리에 유명한 라멘 가게가 있어요.' },
  { id:'hd3_5',  speaker:'A', japanese:'何時まで開いていますか？', romaji:'nanji made aite imasu ka', korean:'몇 시까지 열어요?' },
  { id:'hd3_6',  speaker:'B', japanese:'夜11時まです。混むので早めに行かれたほうがいいですよ。', romaji:'yoru juuichiji made desu. komu node hayame ni ikareta hou ga ii desu yo', korean:'밤 11시까지예요. 붐비니까 일찍 가시는 게 좋아요.' },
  { id:'hd3_7',  speaker:'A', japanese:'わかりました。朝食の場所も教えてください。', romaji:'wakarimashita. choushoku no basho mo oshiete kudasai', korean:'알겠어요. 조식 장소도 알려주세요.' },
  { id:'hd3_8',  speaker:'B', japanese:'2階のレストランで、7時から10時まです。ビュッフェスタイルです。', romaji:'nikai no resutoran de, shichiji kara juuji made desu. byuffe sutairu desu', korean:'2층 레스토랑에서 7시부터 10시까지예요. 뷔페 형식이에요.' },
  { id:'hd3_9',  speaker:'A', japanese:'いいですね！チェックアウトは何時ですか？', romaji:'ii desu ne! chekkuauto wa nanji desu ka', korean:'좋네요! 체크아웃은 몇 시예요?' },
  { id:'hd3_10', speaker:'B', japanese:'11時です。ご不明な点があればいつでもフロントへ。', romaji:'juuichiji desu. gomei na ten ga areba itsudemo furonto e', korean:'11시예요. 궁금한 점이 있으면 언제든지 프런트로.' },
  { id:'hd3_11', speaker:'A', japanese:'とても助かりました。ありがとうございます。', romaji:'totemo tasukarimashita. arigatou gozaimasu', korean:'정말 도움이 됐어요. 감사합니다.' },

  // ══════════════════════════════════════════════════════════
  //  추가 카테고리 — 카페 · 약국·병원 · 지하철
  // ══════════════════════════════════════════════════════════

  // ── 카페 변형 ①: 일반 카페 ─────────────────────────────
  { id:'cf_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 일반 카페 — 커피·케이크 주문' },
  { id:'cf_1',   speaker:'B', japanese:'いらっしゃいませ！ご注文はお決まりですか？',         romaji:'irasshaimase! gochuumon wa okimari desu ka',        korean:'어서 오세요! 주문 정하셨나요?' },
  { id:'cf_2',   speaker:'A', japanese:'アメリカーノを一つください。',                       romaji:'amerikaano wo hitotsu kudasai',                     korean:'아메리카노 하나 주세요.' },
  { id:'cf_3',   speaker:'B', japanese:'ホットとアイス、どちらになさいますか？',              romaji:'hotto to aisu, dochira ni nasaimasu ka',            korean:'핫이요 아이스, 어떤 걸로 하시겠어요?' },
  { id:'cf_4',   speaker:'A', japanese:'ホットでお願いします。チーズケーキもください。',       romaji:'hotto de onegai shimasu. chiizukeeki mo kudasai',   korean:'핫으로 주세요. 치즈케이크도 주세요.' },
  { id:'cf_5',   speaker:'B', japanese:'お名前をお伺いできますか？',                         romaji:'onamae wo oukagai dekimasu ka',                     korean:'성함을 알 수 있을까요?' },
  { id:'cf_6',   speaker:'A', japanese:'「{F}」です。',                                  romaji:'{F} desu',                                       korean:'「{F}」이에요.' },
  { id:'cf_7',   speaker:'B', japanese:'{F}さん、全部で980円になります。',                 romaji:'{F} san, zenbu de kyuuhyaku hachijuu en ni narimasu', korean:'{F}씨, 전부 980엔이에요.' },
  { id:'cf_8',   speaker:'A', japanese:'PayPayで払えますか？',                              romaji:'peipei de haraemasu ka',                           korean:'페이페이로 결제할 수 있나요?' },
  { id:'cf_9',   speaker:'B', japanese:'はい、こちらにかざしてください。',                   romaji:'hai, kochira ni kazashite kudasai',                 korean:'네, 여기에 갖다 대세요.' },
  { id:'cf_10',  speaker:'A', japanese:'ありがとうございます。',                             romaji:'arigatou gozaimasu',                               korean:'감사합니다.' },

  // ── 카페 변형 ②: 스타벅스풍 커스텀 주문 ───────────────
  { id:'cf2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 스타벅스풍 카페 — 사이즈·옵션 커스텀' },
  { id:'cf2_1',  speaker:'B', japanese:'いらっしゃいませ！何になさいますか？',               romaji:'irasshaimase! nani ni nasaimasu ka',                korean:'어서 오세요! 무엇으로 드릴까요?' },
  { id:'cf2_2',  speaker:'A', japanese:'キャラメルラテをください。',                         romaji:'kyarameru raate wo kudasai',                        korean:'카라멜 라떼 주세요.' },
  { id:'cf2_3',  speaker:'B', japanese:'サイズはいかがですか？ショート・トール・グランデ・ベンティがあります。', romaji:'saizu wa ikaga desu ka? shooto tooru gurande benti ga arimasu', korean:'사이즈는요? 쇼트·톨·그란데·벤티가 있어요.' },
  { id:'cf2_4',  speaker:'A', japanese:'トールでお願いします。砂糖は少なめで。',              romaji:'tooru de onegai shimasu. satou wa sukuname de',     korean:'톨로 주세요. 설탕은 적게요.' },
  { id:'cf2_5',  speaker:'B', japanese:'豆乳に変更もできますよ。',                           romaji:'tounyuu ni henkou mo dekimasu yo',                  korean:'두유로 변경도 가능해요.' },
  { id:'cf2_6',  speaker:'A', japanese:'じゃあ豆乳でお願いします。ホイップも抜いてください。', romaji:'jaa tounyuu de onegai shimasu. hoippu mo nuite kudasai', korean:'그럼 두유로요. 휘핑크림도 빼주세요.' },
  { id:'cf2_7',  speaker:'B', japanese:'かしこまりました。こちらでお召し上がりですか？',      romaji:'kashikomarimashita. kochira de omeshiagari desu ka', korean:'알겠습니다. 매장에서 드시나요?' },
  { id:'cf2_8',  speaker:'A', japanese:'テイクアウトでお願いします。',                       romaji:'teiku auto de onegai shimasu',                      korean:'테이크아웃으로 주세요.' },
  { id:'cf2_9',  speaker:'B', japanese:'610円です。ポイントカードはお持ちですか？',            romaji:'roppyaku juu en desu. pointo kaado wa omochi desu ka', korean:'610엔이에요. 포인트 카드 있으세요?' },
  { id:'cf2_10', speaker:'A', japanese:'いいえ、ないです。カードでお願いします。',            romaji:'iie, nai desu. kaado de onegai shimasu',            korean:'아니요, 없어요. 카드로 할게요.' },

  // ── 카페 변형 ③: 전통 찻집 ────────────────────────────
  { id:'cf3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 전통 찻집 — 말차·화과자 주문' },
  { id:'cf3_1',  speaker:'B', japanese:'ようこそおいでくださいました。おひとりでございますか？', romaji:'youkoso oide kudasaimashita. ohitori de gozaimasu ka', korean:'어서 오세요. 혼자이신가요?' },
  { id:'cf3_2',  speaker:'A', japanese:'はい。抹茶をいただけますか？',                       romaji:'hai. maccha wo itadakemasu ka',                     korean:'네. 말차를 마실 수 있나요?' },
  { id:'cf3_3',  speaker:'B', japanese:'抹茶セット（和菓子付き）はいかがでしょうか？',         romaji:'maccha setto (wagashi tsuki) wa ikaga deshou ka',   korean:'말차 세트 (화과자 포함)는 어떠세요?' },
  { id:'cf3_4',  speaker:'A', japanese:'それをください。甘いお菓子ですか？',                  romaji:'sore wo kudasai. amai okashi desu ka',              korean:'그걸로 주세요. 달콤한 과자인가요?' },
  { id:'cf3_5',  speaker:'B', japanese:'季節の上生菓子です。今日はさくらもちです。',           romaji:'kisetsu no jyounamagashi desu. kyou wa sakuramochi desu', korean:'계절 생과자예요. 오늘은 사쿠라모치예요.' },
  { id:'cf3_6',  speaker:'A', japanese:'いいですね！お湯は熱いですか？',                     romaji:'ii desu ne! oyu wa atsui desu ka',                  korean:'좋네요! 물은 뜨거운가요?' },
  { id:'cf3_7',  speaker:'B', japanese:'80度ほどのお湯でお出しします。少し苦みがありますよ。',  romaji:'hachijuu do hodo no oyu de odashi shimasu. sukoshi nigami ga arimasu yo', korean:'약 80도 물로 드려요. 약간 쌉쌀해요.' },
  { id:'cf3_8',  speaker:'A', japanese:'ゆっくり楽しみます。雰囲気がいいですね。',             romaji:'yukkuri tanoshimimasu. fun iki ga ii desu ne',       korean:'천천히 즐길게요. 분위기 좋네요.' },
  { id:'cf3_9',  speaker:'B', japanese:'ありがとうございます。1,200円になります。',            romaji:'arigatou gozaimasu. sen nihyaku en ni narimasu',    korean:'감사합니다. 1,200엔이에요.' },
  { id:'cf3_10', speaker:'A', japanese:'現金でお願いします。とても美味しかったです！',          romaji:'genkin de onegai shimasu. totemo oishikatta desu',  korean:'현금으로 주세요. 정말 맛있었어요!' },

  // ── 약국 변형 ①: 일반 약국 (감기) ─────────────────────
  { id:'pk_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 일본 약국 — 감기 증상으로 약 구입' },
  { id:'pk_1',   speaker:'A', japanese:'すみません、風邪薬はありますか？',                   romaji:'sumimasen, kazegusuri wa arimasu ka',               korean:'저기요, 감기약 있나요?' },
  { id:'pk_2',   speaker:'B', japanese:'はい。どんな症状ですか？',                           romaji:'hai. donna shoujou desu ka',                        korean:'네. 어떤 증상이에요?' },
  { id:'pk_3',   speaker:'A', japanese:'のどが痛くて、鼻水が出ます。熱はないです。',           romaji:'nodo ga itakute, hanamizu ga demasu. netsu wa nai desu', korean:'목이 아프고 콧물이 나요. 열은 없어요.' },
  { id:'pk_4',   speaker:'B', japanese:'このPL顆粒がよく効きますよ。',                       romaji:'kono PL karyuu ga yoku kikimasu yo',                korean:'이 PL 과립이 잘 들어요.' },
  { id:'pk_5',   speaker:'A', japanese:'一日何回飲みますか？',                               romaji:'ichinichi nankai nomimasu ka',                      korean:'하루에 몇 번 먹나요?' },
  { id:'pk_6',   speaker:'B', japanese:'一日3回、食後に飲んでください。',                     romaji:'ichinichi sankai, shokugo ni nonde kudasai',        korean:'하루 3번, 식후에 드세요.' },
  { id:'pk_7',   speaker:'A', japanese:'子供も飲めますか？8歳です。',                         romaji:'kodomo mo nomemasu ka? hachisai desu',              korean:'아이도 먹을 수 있나요? 8살이에요.' },
  { id:'pk_8',   speaker:'B', japanese:'こちらの小児用をお使いください。580円です。',           romaji:'kochira no shouniiyou wo otsukai kudasai. gohyaku hachijuu en desu', korean:'이 소아용을 쓰세요. 580엔이에요.' },
  { id:'pk_9',   speaker:'A', japanese:'クレジットカードは使えますか？',                      romaji:'kurejitto kaado wa tsukaemasu ka',                  korean:'신용카드 사용할 수 있나요?' },
  { id:'pk_10',  speaker:'B', japanese:'もちろんです。こちらへどうぞ。',                      romaji:'mochiron desu. kochira e douzo',                    korean:'물론이죠. 이쪽으로 오세요.' },

  // ── 약국·병원 변형 ②: 내과 진찰 ─────────────────────
  { id:'hp_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 내과 — 복통으로 진찰 받기' },
  { id:'hp_1',   speaker:'A', japanese:'今日、診てもらえますか？お腹が痛くて…',               romaji:'kyou, mite moraemasu ka? onaka ga itakute',         korean:'오늘 진찰받을 수 있을까요? 배가 아파서요…' },
  { id:'hp_2',   speaker:'B', japanese:'はい。保険証はお持ちですか？',                        romaji:'hai. hokenshou wa omochi desu ka',                  korean:'네. 보험증 가지고 계세요?' },
  { id:'hp_3',   speaker:'A', japanese:'いいえ、外国人です。',                               romaji:'iie, gaikokujin desu',                             korean:'아니요, 외국인이에요.' },
  { id:'hp_4',   speaker:'B', japanese:'わかりました。こちらの問診票を記入してください。',       romaji:'wakarimashita. kochira no monshinkyou wo kinyuu shite kudasai', korean:'알겠어요. 이 진찰 설문지를 작성해 주세요.' },
  { id:'hp_5',   speaker:'A', japanese:'昨日の夜からずっと痛いです。',                        romaji:'kinou no yoru kara zutto itai desu',                korean:'어젯밤부터 계속 아파요.' },
  { id:'hp_6',   speaker:'B', japanese:'お腹のどこが痛いですか？',                            romaji:'onaka no doko ga itai desu ka',                     korean:'배 어디가 아파요?' },
  { id:'hp_7',   speaker:'A', japanese:'ここが特に痛いです。（お腹を指しながら）',             romaji:'koko ga tokuni itai desu. (onaka wo sashingara)',   korean:'여기가 특히 아파요. (배를 가리키며)' },
  { id:'hp_8',   speaker:'B', japanese:'食欲はありますか？',                                 romaji:'shokuyoku wa arimasu ka',                           korean:'식욕은 있나요?' },
  { id:'hp_9',   speaker:'A', japanese:'ほとんどないです。気持ち悪いです。',                   romaji:'hotondo nai desu. kimochi warui desu',              korean:'거의 없어요. 메스꺼워요.' },
  { id:'hp_10',  speaker:'B', japanese:'胃炎の可能性があります。薬を出しますね。お大事に。',    romaji:'ien no kanousei ga arimasu. kusuri wo dashimasu ne. odaiji ni', korean:'위염 가능성이 있어요. 약을 처방할게요. 쾌유 바랍니다.' },

  // ── 약국·병원 변형 ③: 치과 응급 ─────────────────────
  { id:'dk_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 치과 — 치통 응급 방문' },
  { id:'dk_1',   speaker:'A', japanese:'予約なしでも診てもらえますか？歯が痛くて…',            romaji:'yoyaku nashi demo mite moraemasu ka? ha ga itakute', korean:'예약 없이도 진찰받을 수 있나요? 이가 아파서요…' },
  { id:'dk_2',   speaker:'B', japanese:'はい。少しお待ちください。どの歯ですか？',              romaji:'hai. sukoshi omachi kudasai. dono ha desu ka',      korean:'네. 잠시 기다려 주세요. 어떤 이예요?' },
  { id:'dk_3',   speaker:'A', japanese:'右の奥歯です。昨日から激しく痛いです。',               romaji:'migi no okuba desu. kinou kara hageshiku itai desu', korean:'오른쪽 어금니요. 어제부터 심하게 아파요.' },
  { id:'dk_4',   speaker:'B', japanese:'レントゲンを撮りましょう。',                          romaji:'rentogen wo torimashou',                            korean:'엑스레이 찍어볼게요.' },
  { id:'dk_5',   speaker:'A', japanese:'痛み止めは飲んでいいですか？',                        romaji:'itamidome wa nonde ii desu ka',                     korean:'진통제 먹어도 되나요?' },
  { id:'dk_6',   speaker:'B', japanese:'飲んで構いません。虫歯が1本あります。',                romaji:'nonde kamaimasen. mushiba ga ippon arimasu',        korean:'드셔도 돼요. 충치가 하나 있어요.' },
  { id:'dk_7',   speaker:'A', japanese:'治療はすぐできますか？',                              romaji:'chiryou wa sugu dekimasu ka',                       korean:'치료를 바로 할 수 있나요?' },
  { id:'dk_8',   speaker:'B', japanese:'今日は応急処置だけです。次回予約をお取りください。',     romaji:'kyou wa oukyuushochi dake desu. jikai yoyaku wo otori kudasai', korean:'오늘은 응급처치만요. 다음 예약을 잡아 주세요.' },
  { id:'dk_9',   speaker:'A', japanese:'わかりました。費用はいくらですか？',                   romaji:'wakarimashita. hiyou wa ikura desu ka',             korean:'알겠어요. 비용은 얼마예요?' },
  { id:'dk_10',  speaker:'B', japanese:'自費診療で3,500円です。カードも使えます。',             romaji:'jihishinryou de sanzen gohyaku en desu. kaado mo tsukaemasu', korean:'자비 진료로 3,500엔이에요. 카드도 사용 가능해요.' },

  // ── 지하철 변형 ①: 방향·노선 문의 ─────────────────────
  { id:'sub_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 지하철역 — 노선·표 구입 안내' },
  { id:'sub_1',   speaker:'A', japanese:'すみません、新宿へ行きたいんですが、どの電車ですか？', romaji:'sumimasen, shinjuku e ikitai n desu ga, dono densha desu ka', korean:'저기요, 신주쿠에 가고 싶은데 어떤 전철인가요?' },
  { id:'sub_2',   speaker:'B', japanese:'山手線で行けますよ。ホームはこちらです。',             romaji:'yamanote sen de ikemasu yo. hoomu wa kochira desu', korean:'야마노테선으로 갈 수 있어요. 승강장은 이쪽이에요.' },
  { id:'sub_3',   speaker:'A', japanese:'何分ぐらいかかりますか？',                            romaji:'nanpun gurai kakarimasu ka',                        korean:'몇 분 정도 걸려요?' },
  { id:'sub_4',   speaker:'B', japanese:'だいたい15分ですよ。急行に乗るともっと早いです。',     romaji:'daitai juugofun desu yo. kyuukou ni noru to motto hayai desu', korean:'대략 15분이에요. 급행을 타면 더 빨라요.' },
  { id:'sub_5',   speaker:'A', japanese:'切符はどこで買えますか？',                            romaji:'kippu wa doko de kaemasu ka',                       korean:'표는 어디서 살 수 있나요?' },
  { id:'sub_6',   speaker:'B', japanese:'あちらの券売機で。SuicaかPASMOが便利ですよ。',        romaji:'achira no kenbaiki de. suika ka pasmo ga benri desu yo', korean:'저쪽 자동발매기에서요. 스이카나 파스모가 편해요.' },
  { id:'sub_7',   speaker:'A', japanese:'乗り越しの場合はどうしますか？',                      romaji:'norikoshi no baai wa dou shimasu ka',               korean:'초과 승차한 경우는 어떻게 해요?' },
  { id:'sub_8',   speaker:'B', japanese:'精算機で差額を払ってください。',                       romaji:'seisanki de sagaku wo haratte kudasai',             korean:'정산기에서 차액을 내세요.' },
  { id:'sub_9',   speaker:'A', japanese:'ありがとうございます。助かりました！',                 romaji:'arigatou gozaimasu. tasukarimashita',               korean:'감사합니다. 살았어요!' },
  { id:'sub_10',  speaker:'B', japanese:'お気をつけて！',                                     romaji:'oki wo tsukete',                                    korean:'조심히 가세요!' },

  // ── 지하철 변형 ②: 환승·막차·1일권 ────────────────────
  { id:'sub2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 지하철 — 환승·막차·1일권 문의' },
  { id:'sub2_1',  speaker:'A', japanese:'渋谷に行くには、どこで乗り換えればいいですか？',       romaji:'shibuya ni iku ni wa, doko de norikaereba ii desu ka', korean:'시부야에 가려면 어디서 갈아타야 해요?' },
  { id:'sub2_2',  speaker:'B', japanese:'次の駅で銀座線に乗り換えてください。',                 romaji:'tsugi no eki de ginzasen ni norikaetemite kudasai', korean:'다음 역에서 긴자선으로 갈아타세요.' },
  { id:'sub2_3',  speaker:'A', japanese:'終電は何時ですか？',                                  romaji:'shuuden wa nanji desu ka',                          korean:'막차는 몇 시예요?' },
  { id:'sub2_4',  speaker:'B', japanese:'この路線は0時15分が最終です。',                       romaji:'kono rosen wa reiji juugofun ga saishuu desu',      korean:'이 노선은 0시 15분이 막차예요.' },
  { id:'sub2_5',  speaker:'A', japanese:'一日乗車券はありますか？',                            romaji:'ichinichi joushaken wa arimasu ka',                 korean:'1일권이 있나요?' },
  { id:'sub2_6',  speaker:'B', japanese:'はい、600円で一日何度でも乗れます。',                  romaji:'hai, roppyaku en de ichinichi nandodemo noremasu',  korean:'네, 600엔에 하루에 몇 번이든 탈 수 있어요.' },
  { id:'sub2_7',  speaker:'A', japanese:'今日は観光なので一日乗車券にします。',                 romaji:'kyou wa kankou nanode ichinichi joushaken ni shimasu', korean:'오늘은 관광이라 1일권으로 할게요.' },
  { id:'sub2_8',  speaker:'B', japanese:'窓口またはアプリでも購入できます。',                   romaji:'madoguchi mata wa apuri demo kounyuu dekimasu',     korean:'창구나 앱에서도 살 수 있어요.' },
  { id:'sub2_9',  speaker:'A', japanese:'ありがとうございます。迷ったらまた聞きますね！',        romaji:'arigatou gozaimasu. mayottara mata kikimasu ne',    korean:'감사해요. 헷갈리면 또 물어볼게요!' },
  { id:'sub2_10', speaker:'B', japanese:'どうぞ！良い旅を。',                                  romaji:'douzo! yoi tabi wo',                                korean:'그러세요! 좋은 여행 되세요.' },

  // ── 지하철 변형 ③: 역 구내 길 안내 ─────────────────────
  { id:'sub3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 구내 — 출구·로커·화장실 안내' },
  { id:'sub3_1',  speaker:'A', japanese:'すみません、A出口はどこですか？',                     romaji:'sumimasen, A deguchi wa doko desu ka',              korean:'저기요, A 출구가 어디예요?' },
  { id:'sub3_2',  speaker:'B', japanese:'地下2階の階段を降りた右側です。',                      romaji:'chika nikai no kaidan wo kudatta migigawa desu',    korean:'지하 2층 계단 내려오면 오른쪽이에요.' },
  { id:'sub3_3',  speaker:'A', japanese:'エレベーターはありますか？',                           romaji:'erebeetaa wa arimasu ka',                           korean:'엘리베이터가 있나요?' },
  { id:'sub3_4',  speaker:'B', japanese:'あちらに1台あります。混んでいるかもしれません。',       romaji:'achira ni ichidai arimasu. konde iru kamo shiremasen', korean:'저쪽에 1대 있어요. 붐빌 수도 있어요.' },
  { id:'sub3_5',  speaker:'A', japanese:'コインロッカーはどこにありますか？',                   romaji:'koin rokkaa wa doko ni arimasu ka',                 korean:'코인 로커는 어디 있나요?' },
  { id:'sub3_6',  speaker:'B', japanese:'改札を出てすぐ左側にあります。',                       romaji:'kaisatsu wo dete sugu hidarigawa ni arimasu',       korean:'개찰구 나오자마자 왼쪽에 있어요.' },
  { id:'sub3_7',  speaker:'A', japanese:'トイレも近くにありますか？',                           romaji:'toire mo chikaku ni arimasu ka',                    korean:'화장실도 근처에 있나요?' },
  { id:'sub3_8',  speaker:'B', japanese:'B出口の横にあります。',                               romaji:'B deguchi no yoko ni arimasu',                      korean:'B 출구 옆에 있어요.' },
  { id:'sub3_9',  speaker:'A', japanese:'ありがとうございます。地図を見せていただけますか？',     romaji:'arigatou gozaimasu. chizu wo misete itadakemasu ka', korean:'감사합니다. 지도 보여주실 수 있나요?' },
  { id:'sub3_10', speaker:'B', japanese:'どうぞ。（スマホで案内地図を表示）',                   romaji:'douzo. (sumaho de annai chizu wo hyouji)',          korean:'여기요. (스마트폰으로 안내 지도 표시)' },

  // ══════════════════════════════════════════════════════════
  //  교통편 추가 — 비행기 안에서
  // ══════════════════════════════════════════════════════════

  // ── 비행기 안에서 (sim_airplane) ─────────────────────────
  { id:'air_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 비행기 안 — 승무원과 이코노미석 대화' },
  { id:'air_1',   speaker:'B', japanese:'いらっしゃいませ。お席はどちらですか？',                romaji:'irasshaimase. oseki wa dochira desu ka',                    korean:'어서 오세요. 좌석이 어디세요?' },
  { id:'air_2',   speaker:'A', japanese:'すみません、23Aなのですが、どこでしょうか？',           romaji:'sumimasen, nijuusan-ee na no desu ga, doko deshou ka',      korean:'저기요, 23A인데 어디예요?' },
  { id:'air_3',   speaker:'B', japanese:'こちらです。お荷物は上の棚にどうぞ。',                  romaji:'kochira desu. onimotsu wa ue no tana ni douzo',             korean:'여기예요. 짐은 위 선반에 넣어주세요.' },
  { id:'air_4',   speaker:'A', japanese:'ありがとうございます。毛布はいただけますか？',           romaji:'arigatou gozaimasu. moufu wa itadakemasu ka',               korean:'감사해요. 담요 받을 수 있나요?' },
  { id:'air_5',   speaker:'B', japanese:'はい、少々お待ちください。お飲み物は何になさいますか？', romaji:'hai, shoushou omachi kudasai. onomimono wa nani ni nasaimasu ka', korean:'네, 잠시만요. 음료는 뭘로 드릴까요?' },
  { id:'air_6',   speaker:'A', japanese:'オレンジジュースをください。イヤホンもありますか？',     romaji:'orenji juusu wo kudasai. iyahon mo arimasu ka',             korean:'오렌지 주스 주세요. 이어폰도 있나요?' },
  { id:'air_7',   speaker:'B', japanese:'はい、どうぞ。お食事はチキンとフィッシュ、どちらになさいますか？', romaji:'hai, douzo. oshokuji wa chikin to fisshu, dochira ni nasaimasu ka', korean:'네, 여기요. 식사는 치킨과 생선 중 어느 걸로?' },
  { id:'air_8',   speaker:'A', japanese:'チキンでお願いします。',                               romaji:'chikin de onegai shimasu',                                  korean:'치킨으로 할게요.' },
  { id:'air_9',   speaker:'B', japanese:'かしこまりました。着陸は現地時間の14時を予定しています。', romaji:'kashikomarimashita. chakuriku wa genchi jikan no juuyoji wo yotei shite imasu', korean:'알겠습니다. 착륙은 현지시각 14시 예정이에요.' },
  { id:'air_10',  speaker:'A', japanese:'ありがとうございます。お手洗いはどちらですか？',         romaji:'arigatou gozaimasu. otearai wa dochira desu ka',            korean:'감사해요. 화장실은 어느 쪽인가요?' },

  // ══════════════════════════════════════════════════════════
  //  숙박편 추가 — 온천에서
  // ══════════════════════════════════════════════════════════

  // ── 온천에서 (sim_onsen) ──────────────────────────────────
  { id:'ons_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 료칸 온천 — 탈의실에서 이용 방법 안내' },
  { id:'ons_1',   speaker:'B', japanese:'いらっしゃいませ。ご利用は初めてですか？',               romaji:'irasshaimase. goriyou wa hajimete desu ka',                 korean:'어서 오세요. 처음 이용하세요?' },
  { id:'ons_2',   speaker:'A', japanese:'はい、初めてです。使い方を教えていただけますか？',       romaji:'hai, hajimete desu. tsukaikata wo oshiete itadakemasu ka', korean:'네, 처음이에요. 사용법 알려주실 수 있나요?' },
  { id:'ons_3',   speaker:'B', japanese:'まずロッカーに荷物を入れて、体を洗ってから湯船に入ってください。', romaji:'mazu rokkaa ni nimotsu wo irete, karada wo aratte kara yubune ni haitte kudasai', korean:'먼저 사물함에 짐 넣고, 몸 씻은 후 욕조에 들어가세요.' },
  { id:'ons_4',   speaker:'A', japanese:'シャンプーはありますか？',                             romaji:'shanpuu wa arimasu ka',                                     korean:'샴푸 있나요?' },
  { id:'ons_5',   speaker:'B', japanese:'はい、洗い場にございます。バスタオルはロッカーの中にあります。', romaji:'hai, araiba ni gozaimasu. basu taoru wa rokkaa no naka ni arimasu', korean:'네, 세면대에 있어요. 바스타올은 사물함 안에 있어요.' },
  { id:'ons_6',   speaker:'A', japanese:'湯船の温度は何度ですか？',                             romaji:'yubune no ondo wa nandо desu ka',                            korean:'욕조 온도는 몇 도예요?' },
  { id:'ons_7',   speaker:'B', japanese:'内風呂は42度です。露天風呂はもう少しぬるいですよ。',    romaji:'uchifuro wa yonjuuni do desu. rotemburo wa mou sukoshi nurui desu yo', korean:'실내탕은 42도예요. 노천탕은 조금 더 미지근해요.' },
  { id:'ons_8',   speaker:'A', japanese:'露天風呂はどこですか？',                               romaji:'rotemburo wa doko desu ka',                                 korean:'노천탕은 어디예요?' },
  { id:'ons_9',   speaker:'B', japanese:'廊下を進んで突き当たりを右に曲がってください。',         romaji:'rouka wo susunde tsukiatari wo migi ni magatte kudasai',    korean:'복도를 따라 가다 막히는 곳에서 오른쪽으로 도세요.' },
  { id:'ons_10',  speaker:'A', japanese:'ありがとうございます。いい温泉でした！気持ちよかったです。', romaji:'arigatou gozaimasu. ii onsen deshita! kimochi yokatta desu', korean:'감사해요. 좋은 온천이었어요! 기분 좋았어요.' },

  // ══════════════════════════════════════════════════════════
  //  관광·문화 추가 — 야구장, 데이트
  // ══════════════════════════════════════════════════════════

  // ── 야구장에서 (sim_baseball) ─────────────────────────────
  { id:'bsb_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 야구장 — 입장권 구입부터 응원까지' },
  { id:'bsb_1',   speaker:'A', japanese:'チケットを買いたいのですが、今日の分はありますか？',     romaji:'chiketto wo kaitai no desu ga, kyou no bun wa arimasu ka',  korean:'티켓 사고 싶은데, 오늘 치 있나요?' },
  { id:'bsb_2',   speaker:'B', japanese:'外野自由席でしたら残っています。お一人様1,800円です。',  romaji:'gaiya jiyuuseki deshitara nokotte imasu. ohitori sama sen happyaku en desu', korean:'외야 자유석은 남아 있어요. 1인 1,800엔이에요.' },
  { id:'bsb_3',   speaker:'A', japanese:'二枚お願いします。',                                   romaji:'nimai onegai shimasu',                                      korean:'두 장 주세요.' },
  { id:'bsb_4',   speaker:'B', japanese:'3,600円です。応援グッズも入口近くで売っていますよ。',    romaji:'sanzennroppyaku en desu. ouen guzzu mo iriguchi chikaku de utte imasu yo', korean:'3,600엔이에요. 응원 용품도 입구 근처에서 팔아요.' },
  { id:'bsb_5',   speaker:'A', japanese:'（場内で）すみません、ビールと唐揚げをください。',       romaji:'(janai de) sumimasen, biiru to karaage wo kudasai',         korean:'(경기장 안에서) 저기요, 맥주랑 가라아게 주세요.' },
  { id:'bsb_6',   speaker:'B', japanese:'ビール中が800円、唐揚げが500円です。合わせて1,300円です。', romaji:'biiru chuu ga happyaku en, karaage ga gohyaku en desu. awasete senzannbyaku en desu', korean:'맥주 중이 800엔, 가라아게 500엔이에요. 합쳐서 1,300엔이에요.' },
  { id:'bsb_7',   speaker:'A', japanese:'ありがとうございます！',                               romaji:'arigatou gozaimasu',                                        korean:'감사해요!' },
  { id:'bsb_8',   speaker:'A', japanese:'（応援中）行けー！ホームランだ！',                      romaji:'(ouen chuu) ike! hoomuran da',                              korean:'(응원 중) 가라! 홈런이다!' },
  { id:'bsb_9',   speaker:'B', japanese:'すごいですね！日本の野球、楽しめましたか？',             romaji:'sugoi desu ne! nihon no yakyuu, tanoshimemashita ka',       korean:'대단하네요! 일본 야구 즐기셨나요?' },
  { id:'bsb_10',  speaker:'A', japanese:'はい、最高でした！また来ます！',                        romaji:'hai, saikou deshita! mata kimasu',                          korean:'네, 최고였어요! 또 올게요!' },

  // ── 일본인과 데이트 (sim_date) ───────────────────────────
  { id:'dt2_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 공원에서 — 일본인과 벚꽃 데이트' },
  { id:'dt2_1',   speaker:'B', japanese:'こんにちは！今日は天気がいいですね。',                  romaji:'konnichiwa! kyou wa tenki ga ii desu ne',                   korean:'안녕하세요! 오늘 날씨 좋네요.' },
  { id:'dt2_2',   speaker:'A', japanese:'ほんとうですね。桜がきれいですね！',                    romaji:'hontou desu ne. sakura ga kirei desu ne',                   korean:'정말이요. 벚꽃이 예쁘네요!' },
  { id:'dt2_3',   speaker:'B', japanese:'お花見は初めてですか？',                               romaji:'ohanami wa hajimete desu ka',                               korean:'꽃놀이는 처음이에요?' },
  { id:'dt2_4',   speaker:'A', japanese:'はい、ずっと来たかったんです。一緒に写真を撮ってもいいですか？', romaji:'hai, zutto kita katta n desu. issho ni shashin wo totte mo ii desu ka', korean:'네, 계속 오고 싶었어요. 같이 사진 찍어도 되나요?' },
  { id:'dt2_5',   speaker:'B', japanese:'もちろん！その後、近くのカフェに行きませんか？',         romaji:'mochiron! sono ato, chikaku no kafe ni ikimasen ka',        korean:'물론이요! 그 다음 근처 카페 갈까요?' },
  { id:'dt2_6',   speaker:'A', japanese:'ぜひ！どんなお店ですか？',                             romaji:'zehi! donna omise desu ka',                                 korean:'꼭요! 어떤 가게예요?' },
  { id:'dt2_7',   speaker:'B', japanese:'インスタに有名なラテアートのお店ですよ。',               romaji:'insuta ni yuumei na rate aato no omise desu yo',            korean:'인스타에서 유명한 라테아트 가게예요.' },
  { id:'dt2_8',   speaker:'A', japanese:'楽しみです！日本語まだまだですが、今日は楽しいです。',   romaji:'tanoshimi desu! nihongo mada mada desu ga, kyou wa tanoshii desu', korean:'기대돼요! 일본어 아직 부족하지만, 오늘 즐거워요.' },
  { id:'dt2_9',   speaker:'B', japanese:'日本語、上手ですよ！また一緒に出かけましょう。',         romaji:'nihongo, jouzu desu yo! mata issho ni dekakemashou',        korean:'일본어 잘 하세요! 또 같이 나가요.' },
  { id:'dt2_10',  speaker:'A', japanese:'ありがとうございます！連絡先を教えてもらえますか？',     romaji:'arigatou gozaimasu! renrakusaki wo oshiete moraemasu ka',   korean:'감사해요! 연락처 알려주실 수 있나요?' },

  // ── 조식 뷔페에서 (sim_breakfast) ────────────────────────
  { id:'bfr_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 조식 뷔페 — 직원과 대화' },
  { id:'bfr_1',   speaker:'B', japanese:'おはようございます。朝食ですか？お部屋番号をお願いします。', romaji:'ohayou gozaimasu. choushoku desu ka? oheya bangou wo onegai shimasu', korean:'좋은 아침이에요. 조식이세요? 방 번호 부탁드려요.' },
  { id:'bfr_2',   speaker:'A', japanese:'503号室です。',                                        romaji:'gohyaku san goushitsu desu',                                korean:'503호실이에요.' },
  { id:'bfr_3',   speaker:'B', japanese:'ありがとうございます。どちらのお席でも自由にどうぞ。',   romaji:'arigatou gozaimasu. dochira no oseki demo jiyuu ni douzo',  korean:'감사합니다. 원하시는 자리 어디든 앉으세요.' },
  { id:'bfr_4',   speaker:'A', japanese:'ありがとうございます。コーヒーはどこですか？',           romaji:'arigatou gozaimasu. koohii wa doko desu ka',                korean:'감사해요. 커피는 어디 있어요?' },
  { id:'bfr_5',   speaker:'B', japanese:'奥のドリンクコーナーにございます。',                    romaji:'oku no dorinku koonaa ni gozaimasu',                        korean:'안쪽 음료 코너에 있어요.' },
  { id:'bfr_6',   speaker:'A', japanese:'このスープは何ですか？',                               romaji:'kono suupu wa nan desu ka',                                 korean:'이 수프는 뭐예요?' },
  { id:'bfr_7',   speaker:'B', japanese:'お味噌汁です。和食も豊富にご用意しています。',          romaji:'omisoshiru desu. washoku mo houfu ni gouyoi shite imasu',   korean:'미소시루예요. 일식도 풍부하게 준비했어요.' },
  { id:'bfr_8',   speaker:'A', japanese:'アレルギーのメニュー表はありますか？',                  romaji:'arerugii no menyuu hyou wa arimasu ka',                     korean:'알레르기 메뉴판 있나요?' },
  { id:'bfr_9',   speaker:'B', japanese:'はい、こちらをご覧ください。ご不明な点はいつでもどうぞ。', romaji:'hai, kochira wo goran kudasai. go fumeina ten wa itsudemo douzo', korean:'네, 이걸 봐주세요. 모르는 점은 언제든지요.' },
  { id:'bfr_10',  speaker:'A', japanese:'とてもおいしかったです！ごちそうさまでした！',           romaji:'totemo oishikatta desu! gochisousama deshita',              korean:'너무 맛있었어요! 잘 먹었습니다!' },

  // ══════════════════════════════════════════════════════════
  //  쇼핑편 추가 — 편집샵, 돈키호테, 백화점
  // ══════════════════════════════════════════════════════════

  // ── 편집샵/옷가게에서 (sim_selectshop) ───────────────────
  { id:'sel_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 편집샵 — 캐주얼 패션 쇼핑' },
  { id:'sel_1',   speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？',                  romaji:'irasshaimase! nanika osagashi desu ka',                     korean:'어서 오세요! 찾는 게 있으세요?' },
  { id:'sel_2',   speaker:'A', japanese:'Tシャツを探しています。',                               romaji:'tii shatsu wo sagashite imasu',                             korean:'티셔츠를 찾고 있어요.' },
  { id:'sel_3',   speaker:'B', japanese:'こちらの新作はいかがですか？今季一番人気です。',         romaji:'kochira no shinsaku wa ikaga desu ka? konki ichiban ninki desu', korean:'이 신상품은 어떠세요? 이번 시즌 가장 인기 있어요.' },
  { id:'sel_4',   speaker:'A', japanese:'かわいいですね。試着してもいいですか？',                 romaji:'kawaii desu ne. shichaku shite mo ii desu ka',              korean:'귀엽네요. 입어봐도 되나요?' },
  { id:'sel_5',   speaker:'B', japanese:'もちろんです。試着室はこちらへどうぞ。Mサイズをお持ちします。', romaji:'mochiron desu. shichakushitsu wa kochira e douzo. emu saizu wo omochi shimasu', korean:'물론이죠. 피팅룸은 이쪽이요. M사이즈 가져다 드릴게요.' },
  { id:'sel_6',   speaker:'A', japanese:'少し大きいかもしれません。Sサイズはありますか？',         romaji:'sukoshi ookii kamo shiremasen. esu saizu wa arimasu ka',    korean:'조금 클 것 같아요. S사이즈 있나요?' },
  { id:'sel_7',   speaker:'B', japanese:'Sは今ちょうど在庫が一枚あります。他の色もございますよ。', romaji:'esu wa ima choudo zaiko ga ichimai arimasu. hoka no iro mo gozaimasu yo', korean:'S는 지금 딱 재고가 한 장 있어요. 다른 색도 있어요.' },
  { id:'sel_8',   speaker:'A', japanese:'白をください。これにします。',                          romaji:'shiro wo kudasai. kore ni shimasu',                         korean:'흰색 주세요. 이걸로 할게요.' },
  { id:'sel_9',   speaker:'B', japanese:'ありがとうございます。免税はご利用になりますか？',        romaji:'arigatou gozaimasu. menzei wa goriyou ni narimasu ka',      korean:'감사합니다. 면세 이용하시겠어요?' },
  { id:'sel_10',  speaker:'A', japanese:'はい、お願いします。カードで払えますか？',               romaji:'hai, onegai shimasu. kaado de haraemasu ka',               korean:'네, 부탁해요. 카드 되나요?' },

  // ── 돈키호테에서 (sim_donki) ──────────────────────────────
  { id:'dnq_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 돈키호테 — 화장품·과자·면세 쇼핑' },
  { id:'dnq_1',   speaker:'A', japanese:'すみません、化粧品はどこですか？',                      romaji:'sumimasen, keshouhin wa doko desu ka',                      korean:'저기요, 화장품은 어디예요?' },
  { id:'dnq_2',   speaker:'B', japanese:'二階にございます。エスカレーターをご利用ください。',      romaji:'nikai ni gozaimasu. esukareetaa wo goriyou kudasai',        korean:'2층에 있어요. 에스컬레이터 이용하세요.' },
  { id:'dnq_3',   speaker:'A', japanese:'この商品は免税になりますか？',                         romaji:'kono shouhin wa menzei ni narimasu ka',                     korean:'이 상품은 면세 되나요?' },
  { id:'dnq_4',   speaker:'B', japanese:'5,000円以上お買い上げで免税になります。パスポートをお持ちですか？', romaji:'gosen en ijou okaiage de menzei ni narimasu. pasupooto wo omochi desu ka', korean:'5,000엔 이상 구매 시 면세 돼요. 여권 가지고 계세요?' },
  { id:'dnq_5',   speaker:'A', japanese:'はい、こちらです。お菓子コーナーはどこですか？',         romaji:'hai, kochira desu. okashi koonaa wa doko desu ka',          korean:'네, 여기요. 과자 코너는 어디예요?' },
  { id:'dnq_6',   speaker:'B', japanese:'一階の右奥にございます。お土産にも人気のお菓子が揃っています。', romaji:'ikkai no migi oku ni gozaimasu. omiyage ni mo ninki no okashi ga sorotte imasu', korean:'1층 오른쪽 안쪽에 있어요. 선물용으로 인기인 과자도 갖춰져 있어요.' },
  { id:'dnq_7',   speaker:'A', japanese:'ドラッグストア商品も免税対象ですか？',                  romaji:'doraggu sutoa shouhin mo menzei taishou desu ka',           korean:'드러그스토어 상품도 면세 대상인가요?' },
  { id:'dnq_8',   speaker:'B', japanese:'医薬部外品は免税対象外ですが、化粧品や食品はOKです。',   romaji:'iyaku bugaihin wa menzei taishou gai desu ga, keshouhin ya shokuhin wa OK desu', korean:'의약외품은 면세 제외지만, 화장품이나 식품은 OK예요.' },
  { id:'dnq_9',   speaker:'A', japanese:'わかりました。まとめて買います。',                      romaji:'wakarimashita. matomete kaimasu',                           korean:'알겠어요. 한꺼번에 살게요.' },
  { id:'dnq_10',  speaker:'B', japanese:'免税カウンターは出口の横にあります。レシートをお持ちください。', romaji:'menzei kauntaa wa deguchi no yoko ni arimasu. reshiito wo omochi kudasai', korean:'면세 카운터는 출구 옆에 있어요. 영수증 가져오세요.' },

  // ── 백화점에서 (sim_department) ───────────────────────────
  { id:'dep_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 백화점 — 선물 구입·포장·식품관' },
  { id:'dep_1',   speaker:'B', japanese:'いらっしゃいませ。何かお探しでしょうか？',               romaji:'irasshaimase. nanika osagashi deshou ka',                   korean:'어서 오세요. 찾으시는 게 있으신가요?' },
  { id:'dep_2',   speaker:'A', japanese:'ハンカチを探しています。プレゼント用です。',             romaji:'hankachi wo sagashite imasu. purezento you desu',           korean:'손수건을 찾고 있어요. 선물용이에요.' },
  { id:'dep_3',   speaker:'B', japanese:'こちらのコーナーにございます。ご予算はおいくらですか？',  romaji:'kochira no koonaa ni gozaimasu. goyosan wa oikura desu ka', korean:'이 코너에 있어요. 예산은 얼마세요?' },
  { id:'dep_4',   speaker:'A', japanese:'3,000円くらいで考えています。',                         romaji:'sanzen en kurai de kangaete imasu',                         korean:'3,000엔 정도 생각하고 있어요.' },
  { id:'dep_5',   speaker:'B', japanese:'こちらはいかがでしょうか。人気のブランドです。',          romaji:'kochira wa ikaga deshou ka. ninki no burando desu',         korean:'이건 어떠세요? 인기 있는 브랜드예요.' },
  { id:'dep_6',   speaker:'A', japanese:'いいですね。包んでいただけますか？',                     romaji:'ii desu ne. tsutsunde itadakemasu ka',                      korean:'좋네요. 포장해 주실 수 있나요?' },
  { id:'dep_7',   speaker:'B', japanese:'かしこまりました。のし紙はおつけしますか？',             romaji:'kashikomarimashita. noshigami wa otsuke shimasu ka',        korean:'알겠습니다. 축의·증정 띠지 달아드릴까요?' },
  { id:'dep_8',   speaker:'A', japanese:'いいえ、プレゼント用の袋だけお願いします。地下の食品売り場はどこですか？', romaji:'iie, purezento you no fukuro dake onegai shimasu. chika no shokuhin uriba wa doko desu ka', korean:'아니요, 선물 봉투만 주세요. 지하 식품관은 어디예요?' },
  { id:'dep_9',   speaker:'B', japanese:'地下2階にございます。エレベーターは奥にありますよ。',     romaji:'chika nikai ni gozaimasu. erebeetaa wa oku ni arimasu yo',  korean:'지하 2층에 있어요. 엘리베이터는 안쪽에 있어요.' },
  { id:'dep_10',  speaker:'A', japanese:'ありがとうございました。丁寧に対応していただいて助かりました。', romaji:'arigatou gozaimashita. teinei ni taiou shite itadaite tasukarimashita', korean:'감사했습니다. 친절하게 대응해 주셔서 도움이 됐어요.' },

  // ══════════════════════════════════════════════════════════
  //  부부 여행편 — デニスと妻の旅
  //  A = 데니스(남편·학습자), B = 와이프
  // ══════════════════════════════════════════════════════════

  // ── cp1: 관광지에서 길을 잃은 부부 ───────────────────────
  { id:'cp1_n1', speaker:'N', japanese:'観光地で、二人はすっかり道に迷ってしまった。', romaji:'kankouichi de, futari wa sukkari michi ni mayotte shimatta.', korean:'📍 관광지에서 — 둘은 완전히 길을 잃어버렸다.' },
  { id:'cp1_a1', speaker:'A', japanese:'ねえ、どっちの道だったっけ？', romaji:'nee, docchi no michi datta kke?', korean:'야, 어느 쪽 길이었지?', tip:'〜だったっけ = ~였던 거 맞지? (기억 확인)' },
  { id:'cp1_b1', speaker:'B', japanese:'{M}が先に歩いたじゃない！', romaji:'{M} ga saki ni aruita ja nai!', korean:'{M}이 먼저 걸었잖아!', tip:'〜じゃない = ~잖아! (항의)' },
  { id:'cp1_a2', speaker:'A', japanese:'え？地図は{F}が持ってたでしょ？', romaji:'e? chizu wa {F} ga motteta desho?', korean:'어? 지도는 {F}가 갖고 있었잖아?', tip:'〜でしょ = ~잖아? (확인·항의)' },
  { id:'cp1_b2', speaker:'B', japanese:'スマホで見てたんだもん…バッテリーが切れちゃった。', romaji:'sumaho de mite tan damon... batterii ga kirechatta.', korean:'스마폰으로 보고 있었는데… 배터리가 다 됐어.', tip:'〜ちゃった = ~해버렸다 (실수·유감)' },
  { id:'cp1_a3', speaker:'A', japanese:'えーと、誰かに聞いてみよう。あの人に聞いてくる。', romaji:'eeto, dareka ni kiite miyou. ano hito ni kiite kuru.', korean:'음, 누군가한테 물어봐 보자. 저 사람한테 물어보고 올게.', tip:'〜てみよう = 한번 ~해보자' },
  { id:'cp1_b3', speaker:'B', japanese:'そうね。日本語の練習になるでしょ？がんばって！', romaji:'sou ne. nihongo no renshuu ni naru desho? ganbatte!', korean:'그렇네. 일본어 연습이 되잖아? 파이팅!', tip:'〜になるでしょ = ~가 되잖아' },
  { id:'cp1_a4', speaker:'A', japanese:'え、なんで俺が……すみません！〇〇はどこですか？', romaji:'e, nande ore ga... sumimasen! ○○ wa doko desu ka?', korean:'어, 왜 내가…… 실례합니다! ○○은 어디인가요?', tip:'すみません + 질문 = 일본에서 가장 쓸모 있는 조합' },
  { id:'cp1_b4', speaker:'B', japanese:'(小声で) うまく言えたじゃない！えらい！', romaji:'(kogoe de) umaku ieta ja nai! erai!', korean:'(작은 소리로) 잘 말했잖아! 대단해!', tip:'えらい = 대단해, 잘했어 (칭찬)' },
  { id:'cp1_a5', speaker:'A', japanese:'でしょ？才能あるかも。ふふ。', romaji:'desho? sainou aru kamo. fufu.', korean:'그렇지? 재능 있는 것 같은데. 후후.', tip:'才能(さいのう)あるかも = 재능 있는 것 같아' },
  { id:'cp1_b5', speaker:'B', japanese:'調子に乗らないの。ほら、あっちよ！', romaji:'choushi ni noranai no. hora, acchi yo!', korean:'우쭐대지 마. 자, 저쪽이야!', tip:'調子に乗る(ちょうしにのる) = 우쭐대다' },

  // ── cp2: 온천 탈의실 앞 실수 ──────────────────────────────
  { id:'cp2_n1', speaker:'N', japanese:'ホテルの温泉へ向かう途中、のれんの前で夫が止まった。', romaji:'hoteru no onsen e mukau tochuu, noren no mae de otto ga tomatta.', korean:'📍 호텔 온천 가는 길 — 노렌 앞에서 남편이 멈췄다.' },
  { id:'cp2_a1', speaker:'A', japanese:'ここだよね？入るよ。', romaji:'koko da yo ne? hairu yo.', korean:'여기지? 들어갈게.', tip:'〜よね = ~지? (확인)' },
  { id:'cp2_b1', speaker:'B', japanese:'ちょっと待って！そっちは女湯よ！！', romaji:'chotto matte! socchi wa onnayu yo!!', korean:'잠깐만! 거기 여탕이야!!', tip:'女湯(おんなゆ) = 여탕 / 男湯(おとこゆ) = 남탕' },
  { id:'cp2_a2', speaker:'A', japanese:'え？ほんとだ…あぶなかった。', romaji:'e? honto da... abunakatta.', korean:'어? 정말이네… 위험할 뻔했다.', tip:'あぶなかった = 위험할 뻔했어 (안도)' },
  { id:'cp2_b2', speaker:'B', japanese:'女の人たちに見られたらどうするの！', romaji:'onna no hito tachi ni miraretara dou suru no!', korean:'여자들한테 들켰으면 어쩔 뻔했어!', tip:'〜たらどうするの = ~면 어떡해' },
  { id:'cp2_a3', speaker:'A', japanese:'だって、のれんが似てたんだもん。ごめんごめん。', romaji:'datte, noren ga nitetan damon. gomen gomen.', korean:'근데, 노렌이 비슷하게 생겼잖아. 미안미안.', tip:'だって = 근데, 왜냐하면 (변명할 때)' },
  { id:'cp2_b3', speaker:'B', japanese:'「男」って書いてあるでしょ！ちゃんと読んで！', romaji:'"otoko" tte kaite aru desho! chanto yonde!', korean:'"男"라고 써있잖아! 제대로 읽어!', tip:'〜って書いてある = ~라고 쓰여있다' },
  { id:'cp2_a4', speaker:'A', japanese:'漢字、まだちょっと苦手で…これから勉強します。', romaji:'kanji, mada chotto nigate de... korekara benkyou shimasu.', korean:'한자를 아직 좀 못해서… 앞으로 공부할게요.', tip:'苦手(にがて) = 약한 것, 잘 못하는 것' },
  { id:'cp2_b4', speaker:'B', japanese:'ふふ、じゃあ今日から漢字も特訓ね。', romaji:'fufu, jaa kyou kara kanji mo tokkun ne.', korean:'후후, 그럼 오늘부터 한자도 특훈이야.', tip:'特訓(とっくん) = 특별 훈련, 특훈' },
  { id:'cp2_a5', speaker:'A', japanese:'はーい。じゃあ、ゆっくり楽しんできてね。', romaji:'haai. jaa, yukkuri tanoshinde kite ne.', korean:'네~. 그럼, 천천히 즐기고 와.', tip:'楽しんできてね = 즐겁게 다녀와 (배웅할 때)' },
  { id:'cp2_b5', speaker:'B', japanese:'{M}も男湯で迷子にならないでよ。', romaji:'{M} mo otokoyu de maigo ni naranai de yo.', korean:'{M}도 남탕에서 길 잃지 마.', tip:'迷子(まいご) = 미아, 길을 잃은 사람' },

  // ── cp3: 돈키호테 쇼핑 전쟁 ──────────────────────────────
  { id:'cp3_n1', speaker:'N', japanese:'ドン・キホーテに入った瞬間、妻の目がキラキラし始めた。', romaji:'donki hoote ni haitta shunkan, tsuma no me ga kirakira shi hajimeta.', korean:'📍 돈키호테 — 들어선 순간, 와이프 눈이 반짝이기 시작했다.' },
  { id:'cp3_b1', speaker:'B', japanese:'わあ！全部安い！これも欲しい！あれも欲しい！', romaji:'waa! zenbu yasui! kore mo hoshii! are mo hoshii!', korean:'와! 다 싸다! 이것도 갖고 싶어! 저것도 갖고 싶어!', tip:'〜も欲しい = ~도 갖고 싶어' },
  { id:'cp3_a1', speaker:'A', japanese:'ちょっとちょっと、スーツケース、もう満杯だよ？', romaji:'chotto chotto, suutsukeesu, mou manpai da yo?', korean:'잠깐잠깐, 캐리어 이미 꽉 찼잖아?', tip:'満杯(まんぱい) = 꽉 찼다, 가득 찼다' },
  { id:'cp3_b2', speaker:'B', japanese:'大丈夫、大丈夫。ちょっとだけよ。', romaji:'daijoubu, daijoubu. chotto dake yo.', korean:'괜찮아, 괜찮아. 조금만이야.', tip:'ちょっとだけ = 조금만 (항상 조금만이 많아짐)' },
  { id:'cp3_a2', speaker:'A', japanese:'「ちょっとだけ」って言って、もうカゴがいっぱいじゃないか！', romaji:'"chotto dake" tte itte, mou kago ga ippai ja nai ka!', korean:'"조금만"이라고 했는데 이미 바구니가 꽉 찼잖아!', tip:'〜って言って = ~라고 말하면서 (설명·항의)' },
  { id:'cp3_b3', speaker:'B', japanese:'これはプレゼント用。これは自分用。これは家用。', romaji:'kore wa purezento you. kore wa jibun you. kore wa ie you.', korean:'이건 선물용. 이건 내 것. 이건 집용.', tip:'〜用(よう) = ~용, ~을 위한' },
  { id:'cp3_a3', speaker:'A', japanese:'もう一個バッグ買う気？！', romaji:'mou ikko baggu kau ki?!', korean:'가방 하나 더 살 생각이야?!', tip:'もう一個(いっこ) = 하나 더' },
  { id:'cp3_b4', speaker:'B', japanese:'それいいアイデアね！さすがわかってる！', romaji:'sore ii aidea ne! sasuga wakatteru!', korean:'그거 좋은 생각이야! 역시 알아줘!', tip:'さすが = 역시 (칭찬)' },
  { id:'cp3_a4', speaker:'A', japanese:'そういう意味じゃなかったんだけど……', romaji:'sou iu imi ja nakattan da kedo...', korean:'그런 뜻이 아니었는데……', tip:'そういう意味じゃない = 그런 뜻이 아니야' },
  { id:'cp3_b5', speaker:'B', japanese:'じゃ、お会計お願いします！いっしょにね♪', romaji:'ja, okaikei onegai shimasu! issho ni ne♪', korean:'그럼, 계산 부탁해요! 같이 내자♪', tip:'お会計(おかいけい)お願いします = 계산 부탁드립니다' },
  { id:'cp3_a5', speaker:'A', japanese:'なんで俺が全部払うの…', romaji:'nande ore ga zenbu harau no...', korean:'왜 내가 다 내는 거야…', tip:'払う(はらう) = 지불하다, 내다' },

  // ── cp4: 메뉴 못 읽기 (채식 주문 실수) ───────────────────
  { id:'cp4_n1', speaker:'N', japanese:'二人は地元の定食屋に入った。メニューは漢字だらけだ。', romaji:'futari wa jimoto no teishoku ya ni haitta. menyuu wa kanji darake da.', korean:'📍 동네 정식집 — 메뉴는 한자투성이다.' },
  { id:'cp4_a1', speaker:'A', japanese:'えーと…ぜんぶ読めない。', romaji:'eeto... zenbu yomenai.', korean:'음… 다 못 읽겠어.', tip:'〜読めない = 읽지 못하다' },
  { id:'cp4_b1', speaker:'B', japanese:'わたしも。でも写真があるじゃない！これにしよ。', romaji:'watashi mo. demo shashin ga aru ja nai! kore ni shiyo.', korean:'나도. 근데 사진이 있잖아! 이걸로 하자.', tip:'〜にしよ = ~로 하자 (선택)' },
  { id:'cp4_a2', speaker:'A', japanese:'この写真のやつ、美味しそう！これにする！', romaji:'kono shashin no yatsu, oishisou! kore ni suru!', korean:'이 사진 것, 맛있어 보여! 이걸로 할게!', tip:'〜にする = ~로 할게 (선택 결정)' },
  { id:'cp4_b2', speaker:'B', japanese:'すみません！これとこれ、ください。', romaji:'sumimasen! kore to kore, kudasai.', korean:'저기요! 이거랑 이거 주세요.', tip:'これとこれ = 이거랑 이거 (가리키기만 해도 통함)' },
  { id:'cp4_a3', speaker:'A', japanese:'(料理が来て) …あれ、俺のやつ、全部野菜だ。', romaji:'(ryouri ga kite) ...are, ore no yatsu, zenbu yasai da.', korean:'(음식이 나와서) …어, 내 것 전부 채소네.', tip:'野菜(やさい) = 채소, 야채' },
  { id:'cp4_b3', speaker:'B', japanese:'ふふ、ベジタリアンメニューだったのね。', romaji:'fufu, bejitarian menyuu datta no ne.', korean:'후후, 채식 메뉴였구나.', tip:'〜だったのね = ~였던 거구나 (납득)' },
  { id:'cp4_a4', speaker:'A', japanese:'一口ちょうだい。{F}のが美味しそう。', romaji:'hitokuchi choudai. {F} no ga oishisou.', korean:'한 입 줘. {F} 것이 맛있어 보여.', tip:'一口(ひとくち)ちょうだい = 한 입 줘 (커플 필수 표현)' },
  { id:'cp4_b4', speaker:'B', japanese:'ダメ！自分のを食べなさい。笑', romaji:'dame! jibun no wo tabenasai. wara', korean:'안 돼! 자기 것 먹어. ㅋ', tip:'〜なさい = ~해라 (약한 명령, 애정 포함)' },
  { id:'cp4_a5', speaker:'A', japanese:'漢字、マジで勉強しなきゃ。美味しいけど。', romaji:'kanji, maji de benkyou shinakya. oishii kedo.', korean:'한자, 진짜 공부해야겠다. 맛있긴 한데.', tip:'〜しなきゃ = ~해야겠다 (반성)' },
  { id:'cp4_b5', speaker:'B', japanese:'ね。次からはちゃんと指さし確認ね。', romaji:'ne. tsugi kara wa chanto yubisashi kakunin ne.', korean:'그러게. 다음부터는 제대로 손가락으로 확인해.', tip:'指さし(ゆびさし) = 손가락으로 가리키기' },

  // ── cp5: 호텔 아침 기상 전쟁 ─────────────────────────────
  { id:'cp5_n1', speaker:'N', japanese:'朝7時。妻は準備を終えて、夫をなんとか起こそうとしている。', romaji:'asa shichi ji. tsuma wa junbi wo oete, otto wo nantoka okosou to shite iru.', korean:'📍 호텔 아침 7시 — 와이프는 준비를 마치고 남편을 어떻게든 깨우려 하고 있다.' },
  { id:'cp5_b1', speaker:'B', japanese:'ねえ、起きて！もう7時よ！', romaji:'nee, okite! mou shichi ji yo!', korean:'야, 일어나! 벌써 7시야!', tip:'起きて = 일어나 (명령형)' },
  { id:'cp5_a1', speaker:'A', japanese:'んー…あと5分…', romaji:'nnー... ato go fun...', korean:'음~… 5분만 더…', tip:'あと〜分 = ~분만 더 (세계 공통 핑계)' },
  { id:'cp5_b2', speaker:'B', japanese:'「5分」って言って、いつも30分になるじゃない！', romaji:'"go fun" tte itte, itsumo sanjuppun ni naru ja nai!', korean:'"5분"이라고 해놓고, 항상 30분이 되잖아!', tip:'〜って言って = ~라고 말해놓고 (비판)' },
  { id:'cp5_a2', speaker:'A', japanese:'今日は何の予定だっけ？', romaji:'kyou wa nani no yotei datta kke?', korean:'오늘 무슨 일정이었지?', tip:'予定(よてい) = 예정, 일정' },
  { id:'cp5_b3', speaker:'B', japanese:'浅草、上野、夜は渋谷！全部回るの！', romaji:'asakusa, ueno, yoru wa shibuya! zenbu mawaru no!', korean:'아사쿠사, 우에노, 저녁은 시부야! 다 돌 거야!', tip:'全部回る(ぜんぶまわる) = 전부 돌다' },
  { id:'cp5_a3', speaker:'A', japanese:'え、多くない？足、大丈夫かな…', romaji:'e, oukunai? ashi, daijoubu ka na...', korean:'어, 너무 많지 않아? 다리 괜찮을까…', tip:'〜かな = ~할까, ~일까 (혼잣말 걱정)' },
  { id:'cp5_b4', speaker:'B', japanese:'大丈夫！日本はどこ行っても楽しいから！ほら、早く！', romaji:'daijoubu! nihon wa doko itte mo tanoshii kara! hora, hayaku!', korean:'괜찮아! 일본은 어딜 가도 즐거우니까! 자, 빨리!', tip:'どこ行っても = 어딜 가도' },
  { id:'cp5_a4', speaker:'A', japanese:'わかった、わかった。起きます起きます。', romaji:'wakatta, wakatta. okimasu okimasu.', korean:'알겠어, 알겠어. 일어날게 일어날게.', tip:'繰り返し(くりかえし) = 같은 말 두 번 반복 → 체념' },
  { id:'cp5_b5', speaker:'B', japanese:'朝ごはん食べてから出発ね！今日も楽しい一日にしよ！', romaji:'asagohan tabete kara shuppatsu ne! kyou mo tanoshii ichinichi ni shiyo!', korean:'아침 먹고 출발이야! 오늘도 즐거운 하루 만들자!', tip:'〜てから = ~하고 나서 (순서)' },
  { id:'cp5_a5', speaker:'A', japanese:'うん。ありがとう、今日もよろしくね。', romaji:'un. arigatou, kyou mo yoroshiku ne.', korean:'응. 고마워, 오늘도 잘 부탁해.', tip:'今日もよろしくね = 오늘도 잘 부탁해 (커플·친구끼리)' },

  // ── cp6: 관광지 사진 촬영 대작전 ─────────────────────────
  { id:'cp6_n1', speaker:'N', japanese:'浅草寺の前。妻はカメラを構えて、夫をポーズさせようとしている。', romaji:'sensouji no mae. tsuma wa kamera wo kamaete, otto wo poozu sa seyou to shite iru.', korean:'📍 아사쿠사지 앞 — 와이프가 카메라를 들고 남편을 포즈 잡게 하려 한다.' },
  { id:'cp6_b1', speaker:'B', japanese:'ここに立って！でも、もうちょっと右！', romaji:'koko ni tatte! demo, mou chotto migi!', korean:'여기 서봐! 근데, 조금 더 오른쪽!', tip:'右(みぎ) = 오른쪽 / 左(ひだり) = 왼쪽' },
  { id:'cp6_a1', speaker:'A', japanese:'これ？こっち？どっち？', romaji:'kore? kocchi? docchi?', korean:'이렇게? 이쪽? 어느 쪽?', tip:'こっち = 이쪽 / どっち = 어느 쪽' },
  { id:'cp6_b2', speaker:'B', japanese:'もうちょっと笑って！自然に！自然に！', romaji:'mou chotto waratte! shizen ni! shizen ni!', korean:'조금 더 웃어봐! 자연스럽게! 자연스럽게!', tip:'自然(しぜん)に = 자연스럽게' },
  { id:'cp6_a2', speaker:'A', japanese:'何枚撮るの？もう50枚撮ったよ…', romaji:'nanmai toru no? mou gojuumai totta yo...', korean:'몇 장 찍는 거야? 벌써 50장 찍었잖아…', tip:'〜枚(まい) = ~장 (사진·종이 세는 단위)' },
  { id:'cp6_b3', speaker:'B', japanese:'いい写真が撮れるまで！あ、あの人に頼もう！{M}が聞いて！', romaji:'ii shashin ga toreru made! a, ano hito ni tanomu! {M} ga kiite!', korean:'좋은 사진 찍힐 때까지! 아, 저 사람한테 부탁하자! {M}이 물어봐!', tip:'〜まで = ~까지' },
  { id:'cp6_a3', speaker:'A', japanese:'え、また俺？わかった。すみません、写真を撮っていただけますか？', romaji:'e, mata ore? wakatta. sumimasen, shashin wo totte itadakemasu ka?', korean:'어, 또 나야? 알겠어. 실례합니다, 사진을 찍어주실 수 있나요?', tip:'〜ていただけますか = ~해주실 수 있나요? (공손한 부탁의 정석)' },
  { id:'cp6_b4', speaker:'B', japanese:'(小声で) うまい！さすが！', romaji:'(kogoe de) umai! sasuga!', korean:'(작은 소리로) 잘했어! 역시!', tip:'さすが = 역시, 과연' },
  { id:'cp6_a4', speaker:'A', japanese:'でしょ？ありがとうございました！', romaji:'desho? arigatou gozaimashita!', korean:'그렇지? 감사합니다!', tip:'でしょ？ = 그렇지? (자랑)' },
  { id:'cp6_b5', speaker:'B', japanese:'完璧！次は二人でセルフィー！', romaji:'kanpeki! tsugi wa futari de serufii!', korean:'완벽해! 다음은 둘이서 셀카!', tip:'セルフィー = 셀피, 셀카' },
  { id:'cp6_a5', speaker:'A', japanese:'え、まだ撮るの…腕が疲れてきた。', romaji:'e, mada toru no... ude ga tsukarete kita.', korean:'어, 아직 더 찍어? …팔이 지쳐가고 있는데.', tip:'疲れてきた(つかれてきた) = 지쳐가고 있다' },

  // ══════════════════════════════════════════════════════════
  //  cp1 추가 에피소드 — 길을 잃은 부부 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp1v2: 구글맵 보다가 더 헷갈린 부부 ─────────────────
  { id:'cp1v2_n', speaker:'N', japanese:'グーグルマップを開いたが、二人の意見が合わない。', romaji:'', korean:'📍 구글맵을 열었지만, 두 사람의 의견이 맞질 않는다.' },
  { id:'cp1v2_a1', speaker:'A', japanese:'見て！地図だとここから右に行けばいいんだよ。', romaji:'', korean:'봐! 지도로는 여기서 오른쪽으로 가면 돼.', tip:'〜ばいい = ~하면 된다' },
  { id:'cp1v2_b1', speaker:'B', japanese:'ちがう！青い点がこっちを向いてるじゃない！', romaji:'', korean:'아니야! 파란 점이 이쪽을 향하고 있잖아!', tip:'〜を向いてる = ~쪽을 보고 있다' },
  { id:'cp1v2_a2', speaker:'A', japanese:'それ、自分たちの位置だから。地図が回ってるんだよ。', romaji:'', korean:'그건 우리 위치니까. 지도가 돌아가고 있는 거야.', tip:'地図が回る = 지도가 회전하다 (나침반 모드)' },
  { id:'cp1v2_b2', speaker:'B', japanese:'えっ、そんな機能あるの！？知らなかった！', romaji:'', korean:'어, 그런 기능이 있어!? 몰랐어!', tip:'知らなかった = 몰랐어 (과거 부정)' },
  { id:'cp1v2_a3', speaker:'A', japanese:'だから、こっちが正しいって言ってたでしょ？', romaji:'', korean:'그러니까, 이쪽이 맞다고 했잖아?', tip:'〜って言ってたでしょ = ~라고 말했잖아' },
  { id:'cp1v2_b3', speaker:'B', japanese:'はいはい、{M}が正しかったです。さ、行きましょ。', romaji:'', korean:'응응, {M}이 맞았어요. 자, 가자.', tip:'はいはい = 네네 (마지못한 인정)' },
  { id:'cp1v2_a4', speaker:'A', japanese:'今の「はいはい」、ちょっと投げやりじゃない？', romaji:'', korean:'지금 그 "응응", 좀 건성이지 않아?', tip:'投げやり(なげやり) = 건성, 무성의함' },
  { id:'cp1v2_b4', speaker:'B', japanese:'ふふ、でも目的地に着いたらいいでしょ♪', romaji:'', korean:'후후, 그래도 목적지에 도착하면 됐잖아♪', tip:'目的地(もくてきち) = 목적지' },
  { id:'cp1v2_a5', speaker:'A', japanese:'…たしかに。じゃ、急ごう！', romaji:'', korean:'…그건 그렇네. 그럼, 서두르자!', tip:'急ぐ(いそぐ) = 서두르다' },

  // ── cp1v3: 편의점에서 점원한테 길 묻기 ──────────────────
  { id:'cp1v3_n', speaker:'N', japanese:'二人はコンビニに駆け込み、店員に道を聞くことにした。', romaji:'', korean:'📍 둘은 편의점으로 뛰어들어가 점원에게 길을 물어보기로 했다.' },
  { id:'cp1v3_a1', speaker:'A', japanese:'すみません！〇〇神社はこの近くですか？', romaji:'', korean:'실례합니다! ○○신사는 이 근처인가요?', tip:'近く(ちかく) = 근처' },
  { id:'cp1v3_b1', speaker:'B', japanese:'（小声で）発音、大丈夫？', romaji:'', korean:'(작은 소리로) 발음 괜찮아?', tip:'小声(こごえ) = 작은 소리, 속삭임' },
  { id:'cp1v3_a2', speaker:'A', japanese:'（小声で）黙ってて！', romaji:'', korean:'(작은 소리로) 조용히 해!', tip:'黙って(だまって) = 조용히 해, 입 다물어' },
  { id:'cp1v3_b2', speaker:'B', japanese:'（店員に）地図、見せていただけますか？', romaji:'', korean:'(점원에게) 지도 좀 보여주실 수 있나요?', tip:'〜ていただけますか = ~해주실 수 있나요?' },
  { id:'cp1v3_a3', speaker:'A', japanese:'（地図を見て）なるほど、ここを真っすぐ行けばいいんですね。', romaji:'', korean:'(지도를 보며) 그렇군요, 여기서 쭉 가면 되는 거네요.', tip:'真っすぐ(まっすぐ) = 쭉, 곧장' },
  { id:'cp1v3_b3', speaker:'B', japanese:'どのくらいかかりますか？', romaji:'', korean:'얼마나 걸려요?', tip:'どのくらいかかる = 얼마나 걸리다' },
  { id:'cp1v3_a4', speaker:'A', japanese:'ありがとうございます！助かりました！', romaji:'', korean:'감사합니다! 덕분에 살았어요!', tip:'助かりました(たすかりました) = 살았어요, 도움이 됐어요' },
  { id:'cp1v3_b4', speaker:'B', japanese:'ね、{M}の日本語ちゃんと通じたね！すごい！', romaji:'', korean:'봐, {M} 일본어 제대로 통했네! 대단해!', tip:'通じる(つうじる) = 통하다, 전달되다' },
  { id:'cp1v3_a5', speaker:'A', japanese:'でしょ。コンビニのお兄さん、めちゃ丁寧だった。', romaji:'', korean:'그렇지. 편의점 오빠 엄청 친절했어.', tip:'丁寧(ていねい) = 친절한, 정중한' },

  // ── cp1v4: 택시를 타려는 부부 ────────────────────────────
  { id:'cp1v4_n', speaker:'N', japanese:'歩くのを諦め、二人はタクシーを拾うことにした。', romaji:'', korean:'📍 걷는 것을 포기하고 둘은 택시를 잡기로 했다.' },
  { id:'cp1v4_b1', speaker:'B', japanese:'もう歩けない！タクシー乗ろう！', romaji:'', korean:'이제 못 걷겠어! 택시 타자!', tip:'〜乗ろう = ~타자 (권유)' },
  { id:'cp1v4_a1', speaker:'A', japanese:'わかった。えっと、どうやって止めるんだっけ？', romaji:'', korean:'알겠어. 음, 어떻게 세우는 거지?', tip:'止める(とめる) = 세우다, 멈추게 하다' },
  { id:'cp1v4_b2', speaker:'B', japanese:'手を上げるだけよ。ほら、来た来た！', romaji:'', korean:'손만 들면 돼. 자, 왔어왔어!', tip:'手を上げる(てをあげる) = 손을 들다' },
  { id:'cp1v4_a2', speaker:'A', japanese:'（運転手に）〇〇まで、お願いします。', romaji:'', korean:'(기사에게) ○○까지 부탁드립니다.', tip:'〜まで、お願いします = ~까지 부탁합니다 (택시 목적지 전달)' },
  { id:'cp1v4_b3', speaker:'B', japanese:'メーターって自動で上がるんだよね？', romaji:'', korean:'미터기는 자동으로 올라가는 거지?', tip:'メーター = 미터기' },
  { id:'cp1v4_a3', speaker:'A', japanese:'そう。チップとかいらないから楽だよ。', romaji:'', korean:'응. 팁 같은 게 없어서 편해.', tip:'チップ = 팁 (일본 택시는 불필요)' },
  { id:'cp1v4_b4', speaker:'B', japanese:'あ、着いた！いくらですか？', romaji:'', korean:'아, 도착했어! 얼마예요?', tip:'いくらですか = 얼마예요?' },
  { id:'cp1v4_a4', speaker:'A', japanese:'（支払いながら）交通系ICカードで払えますか？', romaji:'', korean:'(계산하며) 교통카드로 낼 수 있나요?', tip:'交通系ICカード = 교통계 IC카드 (스이카 등)' },
  { id:'cp1v4_a5', speaker:'A', japanese:'払えた！ありがとうございました！', romaji:'', korean:'됐어! 감사합니다!', tip:'払えた(はらえた) = 낼 수 있었다 (성공)' },

  // ══════════════════════════════════════════════════════════
  //  cp2 추가 에피소드 — 온천 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp2v2: 온천 물 온도 & 규칙 ────────────────────────────
  { id:'cp2v2_n', speaker:'N', japanese:'男湯に入ったデニス。しかし、湯温に驚いた。', romaji:'', korean:'📍 남탕에 들어간 데니스 — 그런데 물 온도에 깜짝 놀랐다.' },
  { id:'cp2v2_a1', speaker:'A', japanese:'うわっ、熱い！！何度あるんだ、これ！', romaji:'', korean:'와, 뜨거워!! 이거 몇 도야!', tip:'〜度(ど) = ~도 (온도)' },
  { id:'cp2v2_b1', speaker:'B', japanese:'（壁越しに）大丈夫ー？声が聞こえてるよ。', romaji:'', korean:'(벽 너머로) 괜찮아~? 목소리 들려.', tip:'壁越し(かべごし) = 벽 너머로' },
  { id:'cp2v2_a2', speaker:'A', japanese:'42度だって！日本人、どうやって入れるの！？', romaji:'', korean:'42도래! 일본인들 어떻게 들어가!?', tip:'〜だって = ~래 (전달)' },
  { id:'cp2v2_b2', speaker:'B', japanese:'慣れよ、慣れ！ゆっくり入ってみて。', romaji:'', korean:'익숙해진 거야, 익숙해! 천천히 들어가 봐.', tip:'慣れ(なれ) = 익숙함 (익숙해진 거야)' },
  { id:'cp2v2_a3', speaker:'A', japanese:'足だけならなんとか…全身は無理かも。', romaji:'', korean:'발만이라면 어떻게든… 전신은 무리일 것 같아.', tip:'なんとか = 어떻게든' },
  { id:'cp2v2_b3', speaker:'B', japanese:'女湯はぬるめでとっても気持ちいいわよ！', romaji:'', korean:'여탕은 미지근해서 너무 기분 좋아!', tip:'ぬるめ = 미지근한 편 (열탕의 반대)' },
  { id:'cp2v2_a4', speaker:'A', japanese:'うらやましい…出てから飲み物飲もう。', romaji:'', korean:'부럽다… 나와서 음료 마시자.', tip:'うらやましい = 부럽다' },
  { id:'cp2v2_b4', speaker:'B', japanese:'温泉上がりのコーヒー牛乳、最高よ。', romaji:'', korean:'온천 후 커피우유, 최고야.', tip:'コーヒー牛乳(ぎゅうにゅう) = 커피우유 (온천 후 정석)' },
  { id:'cp2v2_a5', speaker:'A', japanese:'それだけ楽しみにして、もう少しがんばる！', romaji:'', korean:'그것만 기대하고 좀 더 버텨볼게!', tip:'楽しみにして = 기대하고' },

  // ── cp2v3: 온천 후 마사지 예약 ────────────────────────────
  { id:'cp2v3_n', speaker:'N', japanese:'温泉を出た後、フロントにマッサージの案内があった。', romaji:'', korean:'📍 온천을 나온 후, 프론트에 마사지 안내가 있었다.' },
  { id:'cp2v3_b1', speaker:'B', japanese:'マッサージのメニュー見て！体全体60分コースがあるよ！', romaji:'', korean:'마사지 메뉴 봐! 전신 60분 코스가 있어!', tip:'体全体(からだぜんたい) = 전신' },
  { id:'cp2v3_a1', speaker:'A', japanese:'いくら？高くない？', romaji:'', korean:'얼마야? 비싸지 않아?', tip:'高い(たかい) = 비싸다 (가격)' },
  { id:'cp2v3_b2', speaker:'B', japanese:'8000円。でも旅行中だし、特別でしょ？', romaji:'', korean:'8000엔. 그래도 여행 중이니까, 특별하잖아?', tip:'特別(とくべつ) = 특별한' },
  { id:'cp2v3_a2', speaker:'A', japanese:'わかった。予約、お願いしてみよう。すみません！', romaji:'', korean:'알겠어. 예약 부탁해 보자. 실례합니다!', tip:'予約(よやく) = 예약' },
  { id:'cp2v3_b3', speaker:'B', japanese:'（フロントに）マッサージ、2名で予約できますか？', romaji:'', korean:'(프론트에) 마사지 두 명 예약할 수 있나요?', tip:'2名(にめい) = 2명' },
  { id:'cp2v3_a3', speaker:'A', japanese:'何時がいいですか？今から30分後はどうですか？', romaji:'', korean:'몇 시가 좋아요? 지금부터 30분 후는 어때요?', tip:'〜後(ご) = ~후' },
  { id:'cp2v3_b4', speaker:'B', japanese:'部屋番号は？〇〇号室です。', romaji:'', korean:'방 번호는? ○○호실이에요.', tip:'〇号室(ごうしつ) = ~호실' },
  { id:'cp2v3_a4', speaker:'A', japanese:'ありがとうございます。楽しみにしています。', romaji:'', korean:'감사합니다. 기대하고 있을게요.', tip:'楽しみにしています = 기대하고 있어요 (정중 표현)' },
  { id:'cp2v3_a5', speaker:'A', japanese:'これは正解だったかも。温泉＋マッサージ、最高。', romaji:'', korean:'이건 정답이었을 수도. 온천+마사지, 최고야.', tip:'正解(せいかい) = 정답, 올바른 선택' },

  // ── cp2v4: 온천 용품 빌리기 ───────────────────────────────
  { id:'cp2v4_n', speaker:'N', japanese:'温泉に持っていくタオルを忘れて、受付に借りに行った。', romaji:'', korean:'📍 온천에 가져갈 수건을 깜빡해서 프론트에 빌리러 갔다.' },
  { id:'cp2v4_a1', speaker:'A', japanese:'あ、タオル忘れた。フロントで借りられるかな？', romaji:'', korean:'아, 수건 잊었다. 프론트에서 빌릴 수 있을까?', tip:'借りる(かりる) = 빌리다' },
  { id:'cp2v4_b1', speaker:'B', japanese:'バスタオルとフェイスタオル、両方必要よ。', romaji:'', korean:'목욕 수건이랑 세안 수건, 둘 다 필요해.', tip:'バスタオル/フェイスタオル = 목욕/세안 수건' },
  { id:'cp2v4_a2', speaker:'A', japanese:'すみません、タオルを1枚借りられますか？', romaji:'', korean:'실례합니다, 수건 한 장 빌릴 수 있을까요?', tip:'1枚(いちまい) = 한 장 (얇은 것 세는 단위)' },
  { id:'cp2v4_b2', speaker:'B', japanese:'シャンプーとボディーソープは備え付けがあるの？', romaji:'', korean:'샴푸랑 바디워시는 비치되어 있어?', tip:'備え付け(そなえつけ) = 비치된 것, 구비품' },
  { id:'cp2v4_a3', speaker:'A', japanese:'（スタッフに）シャンプーは備え付けていますか？', romaji:'', korean:'(직원에게) 샴푸는 구비되어 있나요?', tip:'備え付けています = 구비하고 있어요' },
  { id:'cp2v4_b3', speaker:'B', japanese:'カミソリはどう？あったらうれしいんだけど。', romaji:'', korean:'면도기는 어때? 있으면 좋겠는데.', tip:'カミソリ = 면도기' },
  { id:'cp2v4_a4', speaker:'A', japanese:'もう何個借りるつもり？フロントの人、困ってるよ？', romaji:'', korean:'도대체 몇 개 빌릴 거야? 프론트 분 당황하고 있잖아?', tip:'困る(こまる) = 당황하다, 곤란하다' },
  { id:'cp2v4_b4', speaker:'B', japanese:'準備万端(ばんたん)が旅の基本でしょ！', romaji:'', korean:'완벽 준비가 여행의 기본이잖아!', tip:'準備万端(じゅんびばんたん) = 만반의 준비' },
  { id:'cp2v4_a5', speaker:'A', japanese:'ありがとうございました！（小声で）次は忘れないようにしよう…', romaji:'', korean:'감사합니다! (작은 소리로) 다음엔 잊지 않도록 해야지…', tip:'忘れないように = 잊지 않도록' },

  // ══════════════════════════════════════════════════════════
  //  cp3 추가 에피소드 — 돈키호테 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp3v2: 면세 신청 ──────────────────────────────────────
  { id:'cp3v2_n', speaker:'N', japanese:'会計が終わり、免税カウンターへ向かった。', romaji:'', korean:'📍 계산이 끝나고, 면세 카운터로 향했다.' },
  { id:'cp3v2_b1', speaker:'B', japanese:'免税、絶対やったほうがいいよ！お得でしょ！', romaji:'', korean:'면세, 꼭 해야 해! 이득이잖아!', tip:'免税(めんぜい) = 면세 / お得(おとく) = 이득, 이로운' },
  { id:'cp3v2_a1', speaker:'A', japanese:'そうだね。免税カウンターはどこだろう？', romaji:'', korean:'그렇지. 면세 카운터는 어디일까?', tip:'〜はどこだろう = ~는 어디일까 (혼자 생각하는 말투)' },
  { id:'cp3v2_b2', speaker:'B', japanese:'あった！すみません、免税の手続きをお願いします。', romaji:'', korean:'있었어! 실례합니다, 면세 수속 부탁드립니다.', tip:'手続き(てつづき) = 수속, 절차' },
  { id:'cp3v2_a2', speaker:'A', japanese:'パスポートが必要ですよね？持ってきてよかった。', romaji:'', korean:'여권이 필요하죠? 가져오길 잘했다.', tip:'パスポート = 여권 / 必要(ひつよう) = 필요' },
  { id:'cp3v2_b3', speaker:'B', japanese:'消費税が8%戻ってくるんでしょ？いくら戻る？', romaji:'', korean:'소비세 8%가 돌아오는 거잖아? 얼마나 돌아와?', tip:'消費税(しょうひぜい) = 소비세 (면세는 10%→0%)' },
  { id:'cp3v2_a3', speaker:'A', japanese:'（スタッフに）合計でいくら戻りますか？', romaji:'', korean:'(직원에게) 합계로 얼마 돌아오나요?', tip:'合計(ごうけい) = 합계' },
  { id:'cp3v2_b4', speaker:'B', japanese:'わあ！3000円も戻ってくる！これ、もう一個買えばよかった！', romaji:'', korean:'와! 3000엔이나 돌아와! 이거, 하나 더 살걸!', tip:'〜ばよかった = ~할걸 (후회)' },
  { id:'cp3v2_a4', speaker:'A', japanese:'もう！帰るよ！', romaji:'', korean:'이제 그만! 돌아가자!', tip:'もう！ = 이제 그만! (가벼운 불만)' },
  { id:'cp3v2_a5', speaker:'A', japanese:'（スタッフに）ありがとうございました。大変助かりました。', romaji:'', korean:'(직원에게) 감사합니다. 정말 도움이 됐어요.', tip:'大変助かりました(たいへんたすかりました) = 정말 도움이 됐습니다' },

  // ── cp3v3: 화장품 코너에서 ───────────────────────────────
  { id:'cp3v3_n', speaker:'N', japanese:'コスメコーナーに入った瞬間、妻が消えた。', romaji:'', korean:'📍 화장품 코너에 들어선 순간, 와이프가 사라졌다.' },
  { id:'cp3v3_b1', speaker:'B', japanese:'わあ！日本のコスメ、全部試したい！', romaji:'', korean:'와! 일본 화장품 다 써보고 싶어!', tip:'試す(ためす) = 해보다, 시도하다' },
  { id:'cp3v3_a1', speaker:'A', japanese:'どこ行った！？急にいなくなって！', romaji:'', korean:'어디 갔어!? 갑자기 없어져서!', tip:'いなくなる = 사라지다, 없어지다 (사람)' },
  { id:'cp3v3_b2', speaker:'B', japanese:'ここよ！このBBクリーム、韓国の半分の値段！', romaji:'', korean:'여기야! 이 BB크림, 한국 반 가격이야!', tip:'半分の値段(はんぶんのねだん) = 반 가격' },
  { id:'cp3v3_a2', speaker:'A', japanese:'どれくらいここにいるつもり？', romaji:'', korean:'여기 얼마나 있을 생각이야?', tip:'どれくらい〜つもり = 얼마나 ~할 생각이야' },
  { id:'cp3v3_b3', speaker:'B', japanese:'（テスターを塗りながら）これ、肌に合いそう！', romaji:'', korean:'(테스터 바르면서) 이거, 피부에 맞을 것 같아!', tip:'肌に合う(はだにあう) = 피부에 맞다' },
  { id:'cp3v3_a3', speaker:'A', japanese:'いくつ買う気なの、もう。カゴがまた…', romaji:'', korean:'몇 개 살 생각이야, 이제. 바구니가 또…', tip:'〜気なの = ~할 생각이야? (놀람·항의)' },
  { id:'cp3v3_b4', speaker:'B', japanese:'これは友達へのお土産だから！許して！', romaji:'', korean:'이건 친구한테 줄 기념품이니까! 용서해!', tip:'お土産(おみやげ) = 기념품, 선물' },
  { id:'cp3v3_a4', speaker:'A', japanese:'わかった、10分だけ。タイマーかけるよ。', romaji:'', korean:'알겠어, 10분만. 타이머 맞출게.', tip:'タイマーをかける = 타이머를 맞추다' },
  { id:'cp3v3_b5', speaker:'B', japanese:'10分でコスメコーナーは無理よ。ふふ。', romaji:'', korean:'10분으로 화장품 코너는 무리야. 후후.', tip:'無理(むり) = 무리 (불가능)' },

  // ── cp3v4: 쿠폰·이벤트 활용 ─────────────────────────────
  { id:'cp3v4_n', speaker:'N', japanese:'レジに並んでいると、店員からクーポンを手渡された。', romaji:'', korean:'📍 계산대에 줄 서 있는데 점원이 쿠폰을 건네줬다.' },
  { id:'cp3v4_b1', speaker:'B', japanese:'クーポン！？何て書いてるの？', romaji:'', korean:'쿠폰!? 뭐라고 써있어?', tip:'クーポン = 쿠폰' },
  { id:'cp3v4_a1', speaker:'A', japanese:'えっと…「5000円以上のお買い上げで500円引き」、かな。', romaji:'', korean:'음… "5000엔 이상 구매 시 500엔 할인"인 것 같아.', tip:'以上(いじょう) = 이상 / 〜引き(びき) = ~할인' },
  { id:'cp3v4_b2', speaker:'B', japanese:'あといくら買えば使えるの？', romaji:'', korean:'얼마 더 사면 쓸 수 있어?', tip:'あといくら〜ば = 얼마 더 ~하면' },
  { id:'cp3v4_a2', speaker:'A', japanese:'え、計算すると…あと200円だけ買えばいい！', romaji:'', korean:'어, 계산해보면… 200엔어치만 더 사면 돼!', tip:'計算する(けいさんする) = 계산하다' },
  { id:'cp3v4_b3', speaker:'B', japanese:'じゃあ、ガムでも買う？', romaji:'', korean:'그럼, 껌이라도 사?', tip:'〜でも = ~라도 (소극적 선택)' },
  { id:'cp3v4_a3', speaker:'A', japanese:'その発想はなかった！天才かも。', romaji:'', korean:'그 발상은 없었는데! 천재일지도.', tip:'発想(はっそう) = 발상 / 天才(てんさい) = 천재' },
  { id:'cp3v4_b4', speaker:'B', japanese:'（レジで）クーポン、使えますか？', romaji:'', korean:'(계산대에서) 쿠폰 쓸 수 있나요?', tip:'使えますか = 쓸 수 있나요? (사용 가능 여부 확인)' },
  { id:'cp3v4_a4', speaker:'A', japanese:'（スタッフに）ありがとうございます。お得でした！', romaji:'', korean:'(직원에게) 감사합니다. 이득이었어요!', tip:'お得でした(おとくでした) = 이득이었어요' },
  { id:'cp3v4_a5', speaker:'A', japanese:'ガム200円で500円引きって、すごくない？', romaji:'', korean:'껌 200엔으로 500엔 할인이라니, 대단하지 않아?', tip:'〜って、すごくない？= ~라니, 대단하지 않아? (감탄)' },

  // ══════════════════════════════════════════════════════════
  //  cp4 추가 에피소드 — 메뉴 못 읽기 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp4v2: 라멘집 토핑 주문 ───────────────────────────────
  { id:'cp4v2_n', speaker:'N', japanese:'ラーメン屋に入った。麺の硬さやスープの濃さを聞かれた。', romaji:'', korean:'📍 라멘집에 들어갔다. 면 경도와 국물 진하기를 물어봤다.' },
  { id:'cp4v2_b1', speaker:'B', japanese:'硬さはどうしますか？って書いてある…どれにする？', romaji:'', korean:'"경도는 어떻게 하시겠어요?"라고 써있는데… 어떤 거로 해?', tip:'硬さ(かたさ) = 경도, 단단함 정도' },
  { id:'cp4v2_a1', speaker:'A', japanese:'ふつうでいい。「普通」ってどう言えばいいんだろう。', romaji:'', korean:'보통으로 하면 돼. "普通"는 어떻게 말하면 좋을까.', tip:'普通(ふつう) = 보통 (라멘집 기본 표현)' },
  { id:'cp4v2_b2', speaker:'B', japanese:'普通って言えばいいんじゃない？そのまま。', romaji:'', korean:'그냥 "후쯔우"라고 하면 되지 않아? 그대로.', tip:'そのまま = 그대로, 있는 그대로' },
  { id:'cp4v2_a2', speaker:'A', japanese:'（店員に）麺の硬さ、普通でお願いします。スープは濃いめで。', romaji:'', korean:'(점원에게) 면 경도 보통으로 부탁드려요. 국물은 진하게로.', tip:'濃いめ(こいめ) = 진한 편으로' },
  { id:'cp4v2_b3', speaker:'B', japanese:'トッピングもつけよう！チャーシューと煮卵！', romaji:'', korean:'토핑도 추가하자! 차슈랑 조림 달걀!', tip:'チャーシュー = 차슈 / 煮卵(にたまご) = 조림 달걀' },
  { id:'cp4v2_a3', speaker:'A', japanese:'（店員に）チャーシューと煮卵のトッピング、追加できますか？', romaji:'', korean:'(점원에게) 차슈랑 조림 달걀 토핑 추가할 수 있나요?', tip:'追加できますか(ついかできますか) = 추가할 수 있나요?' },
  { id:'cp4v2_b4', speaker:'B', japanese:'ラーメン来た！美味しそう！スープ一口ちょうだい！', romaji:'', korean:'라멘 왔다! 맛있겠다! 국물 한 모금 줘!', tip:'一口(ひとくち) = 한 모금, 한 입' },
  { id:'cp4v2_a4', speaker:'A', japanese:'これが旅の醍醐味だよね。現地のラーメン！', romaji:'', korean:'이게 여행의 묘미지. 현지 라멘!', tip:'醍醐味(だいごみ) = 묘미, 진정한 맛' },
  { id:'cp4v2_a5', speaker:'A', japanese:'おいしい！また来よう、絶対。', romaji:'', korean:'맛있어! 또 오자, 꼭.', tip:'また来よう(またこよう) = 또 오자' },

  // ── cp4v3: 편의점 도시락 고르기 ───────────────────────────
  { id:'cp4v3_n', speaker:'N', japanese:'夜、コンビニでお弁当を選んでいる二人。', romaji:'', korean:'📍 밤, 편의점에서 도시락을 고르는 두 사람.' },
  { id:'cp4v3_b1', speaker:'B', japanese:'どれがいい？唐揚げ弁当、幕の内弁当、サーモン丼…', romaji:'', korean:'어떤 게 좋아? 가라아게 도시락, 마쿠노우치 도시락, 연어 덮밥…', tip:'唐揚げ(からあげ) = 가라아게 / 幕の内(まくのうち) = 마쿠노우치' },
  { id:'cp4v3_a1', speaker:'A', japanese:'漢字が多すぎて全然わからない。', romaji:'', korean:'한자가 너무 많아서 전혀 모르겠어.', tip:'全然(ぜんぜん)〜ない = 전혀 ~않다' },
  { id:'cp4v3_b2', speaker:'B', japanese:'これ！写真がおいしそうな方で選べばいいじゃない。', romaji:'', korean:'이거! 사진이 맛있어 보이는 걸로 고르면 되잖아.', tip:'〜そうな = ~처럼 보이는, ~일 것 같은' },
  { id:'cp4v3_a2', speaker:'A', japanese:'それは名案！じゃあこれ！一番美味しそう！', romaji:'', korean:'그거 명안이야! 그럼 이거! 제일 맛있어 보여!', tip:'名案(めいあん) = 명안, 좋은 생각' },
  { id:'cp4v3_b3', speaker:'B', japanese:'温めますか？って聞かれるよ、多分。', romaji:'', korean:'"데워드릴까요?"라고 물어볼 거야, 아마.', tip:'温める(あたためる) = 데우다' },
  { id:'cp4v3_a3', speaker:'A', japanese:'（レジで）温めてください。あ、お箸もください。', romaji:'', korean:'(계산대에서) 데워 주세요. 아, 젓가락도 주세요.', tip:'お箸(おはし) = 젓가락 (편의점에서는 직접 요청해야 할 때도 있음)' },
  { id:'cp4v3_b4', speaker:'B', japanese:'スプーンも必要だよ、カレー系は。', romaji:'', korean:'숟가락도 필요해, 카레 종류는.', tip:'スプーン = 숟가락' },
  { id:'cp4v3_a4', speaker:'A', japanese:'（店員に）すみません、スプーンもいただけますか？', romaji:'', korean:'(점원에게) 실례합니다, 숟가락도 주실 수 있을까요?', tip:'いただけますか = 주실 수 있나요? (공손)' },
  { id:'cp4v3_a5', speaker:'A', japanese:'コンビニ飯でも日本は美味しい。これ発見だわ。', romaji:'', korean:'편의점 밥도 일본은 맛있어. 이건 발견이야.', tip:'発見(はっけん) = 발견' },

  // ── cp4v4: 회전초밥집 ─────────────────────────────────────
  { id:'cp4v4_n', speaker:'N', japanese:'回転寿司に入った。タブレットで注文するタイプだった。', romaji:'', korean:'📍 회전초밥집에 들어갔다. 태블릿으로 주문하는 타입이었다.' },
  { id:'cp4v4_b1', speaker:'B', japanese:'わあ！回転寿司だ！何でも頼めるの？', romaji:'', korean:'와! 회전초밥이야! 뭐든 시킬 수 있어?', tip:'回転寿司(かいてんずし) = 회전초밥 / 頼む(たのむ) = 주문하다' },
  { id:'cp4v4_a1', speaker:'A', japanese:'タブレットで注文するみたい。日本語だけど…', romaji:'', korean:'태블릿으로 주문하는 것 같아. 일본어만 있는데…', tip:'タブレット = 태블릿' },
  { id:'cp4v4_b2', speaker:'B', japanese:'写真があるから、押せばいいじゃない！まぐろ、押す！', romaji:'', korean:'사진이 있으니까, 누르면 되잖아! 참치, 누를게!', tip:'まぐろ = 참치 (회전초밥 대표 메뉴)' },
  { id:'cp4v4_a2', speaker:'A', japanese:'サーモンはどこ？漢字で「鮭」かな。', romaji:'', korean:'연어는 어디야? 한자로 "鮭"인가.', tip:'鮭(さけ) = 연어 (한자 読み = さけ/しゃけ)' },
  { id:'cp4v4_b3', speaker:'B', japanese:'数量はどうする？とりあえず「1」にしといて。', romaji:'', korean:'수량은 어떻게 해? 일단 "1"로 해놔.', tip:'数量(すうりょう) = 수량 / とりあえず = 일단' },
  { id:'cp4v4_a3', speaker:'A', japanese:'注文完了！来るの楽しみ。', romaji:'', korean:'주문 완료! 오는 거 기대돼.', tip:'注文完了(ちゅうもんかんりょう) = 주문 완료' },
  { id:'cp4v4_b4', speaker:'B', japanese:'あ、来た来た！きれいだね！', romaji:'', korean:'아, 왔어 왔어! 예쁘다!', tip:'きれい = 예쁘다, 깔끔하다' },
  { id:'cp4v4_a4', speaker:'A', japanese:'（食べながら）日本の回転寿司、レベル高い！', romaji:'', korean:'(먹으면서) 일본 회전초밥, 수준이 높아!', tip:'レベルが高い = 수준이 높다' },
  { id:'cp4v4_a5', speaker:'A', japanese:'毎日来てもいいかな、これ。', romaji:'', korean:'매일 와도 될 것 같아, 이거.', tip:'毎日(まいにち) = 매일' },

  // ══════════════════════════════════════════════════════════
  //  cp5 추가 에피소드 — 기상전쟁 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp5v2: 조식 뷔페 ─────────────────────────────────────
  { id:'cp5v2_n', speaker:'N', japanese:'ホテルの朝食ビュッフェ。妻は元気いっぱい、夫はまだ眠そうだ。', romaji:'', korean:'📍 호텔 조식 뷔페. 와이프는 활기차고, 남편은 아직 졸려 보인다.' },
  { id:'cp5v2_b1', speaker:'B', japanese:'ビュッフェよ！何でも取ってきていいの！', romaji:'', korean:'뷔페야! 뭐든 가져와도 돼!', tip:'ビュッフェ = 뷔페 / 取ってくる(とってくる) = 가져오다' },
  { id:'cp5v2_a1', speaker:'A', japanese:'うん…コーヒーを先に飲まないと人間になれない。', romaji:'', korean:'응… 커피를 먼저 안 마시면 인간이 될 수 없어.', tip:'人間になれない = 인간이 될 수 없다 (아침형 인간 유머)' },
  { id:'cp5v2_b2', speaker:'B', japanese:'お粥(かゆ)もあるよ！和食と洋食どっちがいい？', romaji:'', korean:'죽도 있어! 일식이랑 양식 중에 어떤 게 좋아?', tip:'お粥(おかゆ) = 죽 / 和食(わしょく) = 일식 / 洋食(ようしょく) = 양식' },
  { id:'cp5v2_a2', speaker:'A', japanese:'和食！味噌汁と焼き魚がある！', romaji:'', korean:'일식! 된장국이랑 생선구이가 있어!', tip:'味噌汁(みそしる) = 된장국 / 焼き魚(やきざかな) = 생선구이' },
  { id:'cp5v2_b3', speaker:'B', japanese:'じゃ、私は洋食にする。クロワッサンが美味しそう！', romaji:'', korean:'그럼, 나는 양식으로 할게. 크루아상이 맛있겠다!', tip:'クロワッサン = 크루아상' },
  { id:'cp5v2_a3', speaker:'A', japanese:'（スタッフに）コーヒーのおかわりはできますか？', romaji:'', korean:'(직원에게) 커피 리필 되나요?', tip:'おかわり = 리필, 한 번 더' },
  { id:'cp5v2_b4', speaker:'B', japanese:'まだ飲むの？早く食べないと、もう8時よ！', romaji:'', korean:'아직도 마셔? 빨리 안 먹으면, 벌써 8시야!', tip:'早く(はやく) = 빨리' },
  { id:'cp5v2_a4', speaker:'A', japanese:'コーヒー2杯飲んでやっと起きた気がする。', romaji:'', korean:'커피 2잔 마시고 겨우 일어난 느낌이야.', tip:'やっと = 겨우, 드디어 / 〜気がする = ~느낌이 들다' },
  { id:'cp5v2_a5', speaker:'A', japanese:'ごちそうさまでした！さ、今日も行くよ！', romaji:'', korean:'잘 먹었습니다! 자, 오늘도 가자!', tip:'ごちそうさまでした = 잘 먹었습니다 (식후 인사)' },

  // ── cp5v3: 체크아웃 ──────────────────────────────────────
  { id:'cp5v3_n', speaker:'N', japanese:'チェックアウトの時間が近づいているのに、夫はのんびりしていた。', romaji:'', korean:'📍 체크아웃 시간이 다가오고 있는데, 남편은 느긋하게 있었다.' },
  { id:'cp5v3_b1', speaker:'B', japanese:'11時チェックアウトよ！もう10時40分！早く荷物まとめて！', romaji:'', korean:'11시 체크아웃이야! 벌써 10시 40분이야! 빨리 짐 챙겨!', tip:'荷物(にもつ) = 짐 / まとめる = 정리하다, 모으다' },
  { id:'cp5v3_a1', speaker:'A', japanese:'わかってる！あと20分あるでしょ！', romaji:'', korean:'알고 있어! 아직 20분 있잖아!', tip:'あと〜分 = 앞으로 ~분 (남은 시간)' },
  { id:'cp5v3_b2', speaker:'B', japanese:'忘れ物チェックした？充電器、洗面所に置きっぱなしじゃない？', romaji:'', korean:'잊은 물건 확인했어? 충전기 욕실에 그냥 두고 있지 않아?', tip:'置きっぱなし(おきっぱなし) = 그냥 둔 채로, 방치' },
  { id:'cp5v3_a2', speaker:'A', japanese:'あ、ほんとだ！危なかった！', romaji:'', korean:'아, 정말이네! 위험할 뻔했어!', tip:'危なかった(あぶなかった) = 위험할 뻔했어 (안도)' },
  { id:'cp5v3_b3', speaker:'B', japanese:'（フロントで）チェックアウトをお願いします。', romaji:'', korean:'(프론트에서) 체크아웃 부탁드립니다.', tip:'チェックアウト = 체크아웃' },
  { id:'cp5v3_a3', speaker:'A', japanese:'（スタッフに）荷物、少し預かっていただけますか？', romaji:'', korean:'(직원에게) 짐, 잠깐 맡아주실 수 있나요?', tip:'預かる(あずかる) = 맡다, 보관하다' },
  { id:'cp5v3_b4', speaker:'B', japanese:'午後3時まで預けられるって！ありがたい！', romaji:'', korean:'오후 3시까지 맡길 수 있대! 감사해라!', tip:'ありがたい = 감사하다, 고맙다' },
  { id:'cp5v3_a4', speaker:'A', japanese:'じゃ、身軽になって観光しよう！', romaji:'', korean:'그럼, 몸이 가벼워져서 관광하자!', tip:'身軽(みがる) = 몸이 가벼운, 짐 없이 편한 상태' },
  { id:'cp5v3_a5', speaker:'A', japanese:'次のホテルはもう少し早くチェックアウトの準備をするよ。', romaji:'', korean:'다음 호텔은 좀 더 일찍 체크아웃 준비할게.', tip:'〜準備をする = ~준비를 하다' },

  // ── cp5v4: 다음 여행지 이동 ───────────────────────────────
  { id:'cp5v4_n', speaker:'N', japanese:'新幹線の時間が迫っている。二人はホームへ急いでいた。', romaji:'', korean:'📍 신칸센 시간이 다가오고 있다. 둘은 플랫폼으로 서두르고 있었다.' },
  { id:'cp5v4_b1', speaker:'B', japanese:'新幹線、あと15分で出発よ！走って！', romaji:'', korean:'신칸센, 앞으로 15분 후 출발이야! 뛰어!', tip:'出発(しゅっぱつ) = 출발' },
  { id:'cp5v4_a1', speaker:'A', japanese:'キャリーケース引きながら走るの？！', romaji:'', korean:'캐리어 끌면서 뛰는 거야?!', tip:'キャリーケースを引く(ひく) = 캐리어를 끌다' },
  { id:'cp5v4_b2', speaker:'B', japanese:'乗り換え案内アプリ見て！何番ホームだっけ？', romaji:'', korean:'환승 안내 앱 봐! 몇 번 홈이었지?', tip:'乗り換え(のりかえ) = 환승 / ホーム = (기차) 플랫폼' },
  { id:'cp5v4_a2', speaker:'A', japanese:'14番ホーム！あそこの階段！', romaji:'', korean:'14번 플랫폼! 저기 계단!', tip:'番ホーム(ばんホーム) = ~번 플랫폼' },
  { id:'cp5v4_b3', speaker:'B', japanese:'（係員に）すみません！東京行きの新幹線はここですか？', romaji:'', korean:'(역무원에게) 실례합니다! 도쿄행 신칸센은 여기인가요?', tip:'〜行き(ゆき) = ~행 (도착지)' },
  { id:'cp5v4_a3', speaker:'A', japanese:'（係員に）指定席は何号車ですか？', romaji:'', korean:'(역무원에게) 지정석은 몇 호 차인가요?', tip:'指定席(していせき) = 지정석 / 〜号車(ごうしゃ) = ~호 차' },
  { id:'cp5v4_b4', speaker:'B', japanese:'乗れた！！ぎりぎりだった！！', romaji:'', korean:'탔어!! 아슬아슬했어!!', tip:'ぎりぎり = 아슬아슬하게, 간신히' },
  { id:'cp5v4_a4', speaker:'A', japanese:'ふー…心臓止まるかと思った。', romaji:'', korean:'휴… 심장 멎는 줄 알았어.', tip:'心臓が止まる(しんぞうがとまる) = 심장이 멎다 (놀람 표현)' },
  { id:'cp5v4_a5', speaker:'A', japanese:'次の旅行では、1時間前には駅に着くようにしよう。', romaji:'', korean:'다음 여행에서는 1시간 전에 역에 도착하도록 하자.', tip:'〜ようにしよう = ~하도록 하자 (결심)' },

  // ══════════════════════════════════════════════════════════
  //  cp6 추가 에피소드 — 사진 촬영 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp6v2: 사진 리뷰 배틀 ────────────────────────────────
  { id:'cp6v2_n', speaker:'N', japanese:'ベンチに座って、さっき撮った写真を二人でチェックしている。', romaji:'', korean:'📍 벤치에 앉아 방금 찍은 사진을 둘이서 확인하고 있다.' },
  { id:'cp6v2_b1', speaker:'B', japanese:'これ消して！目が半開きじゃない！', romaji:'', korean:'이거 지워! 눈이 반쯤 감겼잖아!', tip:'半開き(はんびらき) = 반 정도 열린 상태 (눈이 반쯤 감긴)' },
  { id:'cp6v2_a1', speaker:'A', japanese:'え、これ表情よくない？自然じゃない。', romaji:'', korean:'어, 이거 표정 좋지 않아? 자연스럽잖아.', tip:'表情(ひょうじょう) = 표정 / 自然(しぜん) = 자연스러운' },
  { id:'cp6v2_b2', speaker:'B', japanese:'全然よくない！もう一回撮り直して！', romaji:'', korean:'전혀 좋지 않아! 다시 찍어줘!', tip:'撮り直す(とりなおす) = 다시 찍다' },
  { id:'cp6v2_a2', speaker:'A', japanese:'（溜息をついて）わかった、わかった。どこで撮ろう？', romaji:'', korean:'(한숨을 쉬며) 알겠어, 알겠어. 어디서 찍을까?', tip:'溜息をつく(ためいきをつく) = 한숨을 쉬다' },
  { id:'cp6v2_b3', speaker:'B', japanese:'あの赤い鳥居の前！光がきれいだと思う！', romaji:'', korean:'저 빨간 도리이 앞! 빛이 예쁠 것 같아!', tip:'鳥居(とりい) = 도리이 (신사 입구의 붉은 문)' },
  { id:'cp6v2_a3', speaker:'A', japanese:'（撮りながら）はい、「チーズ」！', romaji:'', korean:'(찍으면서) 자, "치즈"!', tip:'チーズ = 치즈 (사진 찍을 때 하는 말)' },
  { id:'cp6v2_b4', speaker:'B', japanese:'今度はちゃんと撮れた？見せて！', romaji:'', korean:'이번엔 제대로 찍혔어? 보여줘!', tip:'ちゃんと = 제대로, 올바르게' },
  { id:'cp6v2_a4', speaker:'A', japanese:'どう？完璧じゃない？', romaji:'', korean:'어때? 완벽하지 않아?', tip:'完璧(かんぺき) = 완벽' },
  { id:'cp6v2_b5', speaker:'B', japanese:'…うん！これは合格！ありがとう。', romaji:'', korean:'…응! 이건 합격! 고마워.', tip:'合格(ごうかく) = 합격 (OK 표현으로도 사용)' },

  // ── cp6v3: 다른 관광객에게 가족사진 부탁 ─────────────────
  { id:'cp6v3_n', speaker:'N', japanese:'他の観光客に二人のツーショットを頼もうとしている。', romaji:'', korean:'📍 다른 관광객에게 둘이서 찍은 사진을 부탁하려 하고 있다.' },
  { id:'cp6v3_b1', speaker:'B', japanese:'あの外国人の方に頼もう！どう言えばいい？', romaji:'', korean:'저 외국인 분에게 부탁하자! 어떻게 말하면 돼?', tip:'外国人(がいこくじん) = 외국인' },
  { id:'cp6v3_a1', speaker:'A', japanese:'英語で言えばいいかな。「Could you take our photo?」', romaji:'', korean:'영어로 말하면 되려나. "Could you take our photo?"', tip:'海外でも通じる英語フレーズ = 해외에서도 통하는 영어' },
  { id:'cp6v3_b2', speaker:'B', japanese:'日本語でも言ってみたら？練習になるよ！', romaji:'', korean:'일본어로도 말해봐! 연습이 되잖아!', tip:'練習(れんしゅう)になる = 연습이 되다' },
  { id:'cp6v3_a2', speaker:'A', japanese:'（観光客に）すみません！写真を撮っていただけますか？', romaji:'', korean:'(관광객에게) 실례합니다! 사진 찍어주실 수 있나요?', tip:'〜ていただけますか = ~해주실 수 있나요? (공손한 부탁)' },
  { id:'cp6v3_b3', speaker:'B', japanese:'このボタンを押してください。って言って！', romaji:'', korean:'"이 버튼을 눌러주세요"라고 말해!', tip:'ボタンを押す(おす) = 버튼을 누르다' },
  { id:'cp6v3_a3', speaker:'A', japanese:'このボタンを押してください。あと、二人が全部入るようにお願いします。', romaji:'', korean:'이 버튼을 눌러주세요. 그리고 둘 다 다 들어오도록 부탁드려요.', tip:'〜が全部入るように = ~가 전부 들어오도록' },
  { id:'cp6v3_b4', speaker:'B', japanese:'ありがとうございます！きれいに撮れてる！', romaji:'', korean:'감사합니다! 예쁘게 찍혔어!', tip:'きれいに撮れる(とれる) = 예쁘게 찍히다' },
  { id:'cp6v3_a4', speaker:'A', japanese:'（観光客に）本当にありがとうございました！', romaji:'', korean:'(관광객에게) 정말로 감사합니다!', tip:'本当に(ほんとうに) = 정말로 (강조)' },
  { id:'cp6v3_a5', speaker:'A', japanese:'うまくお願いできたね。日本語、少し自信ついた。', romaji:'', korean:'부탁 잘 했네. 일본어, 조금 자신감이 생겼어.', tip:'自信がつく(じしんがつく) = 자신감이 생기다' },

  // ── cp6v4: SNS 릴스 촬영 부탁 ────────────────────────────
  { id:'cp6v4_n', speaker:'N', japanese:'妻がInstagramのリール用に動画を撮りたいと言い出した。', romaji:'', korean:'📍 와이프가 인스타그램 릴스용 동영상을 찍고 싶다고 하기 시작했다.' },
  { id:'cp6v4_b1', speaker:'B', japanese:'ここで動画撮りたい！歩いてくるところを撮って！', romaji:'', korean:'여기서 동영상 찍고 싶어! 걸어오는 장면 찍어줘!', tip:'動画(どうが) = 동영상 / 〜てくるところ = ~하며 오는 장면' },
  { id:'cp6v4_a1', speaker:'A', japanese:'動画？写真だけじゃダメなの？', romaji:'', korean:'동영상? 사진만으론 안 돼?', tip:'〜だけじゃダメ = ~만으론 안 돼' },
  { id:'cp6v4_b2', speaker:'B', japanese:'今はリールの時代よ！縦向きで撮って！', romaji:'', korean:'지금은 릴스의 시대야! 세로로 찍어!', tip:'縦向き(たてむき) = 세로 방향 / 横向き(よこむき) = 가로' },
  { id:'cp6v4_a2', speaker:'A', japanese:'スマホを縦にすればいい？こう？', romaji:'', korean:'스마폰을 세로로 하면 돼? 이렇게?', tip:'縦にする(たてにする) = 세로로 하다' },
  { id:'cp6v4_b3', speaker:'B', japanese:'そう！でもゆっくり歩いてね、自然に！', romaji:'', korean:'맞아! 근데 천천히 걸어, 자연스럽게!', tip:'ゆっくり = 천천히' },
  { id:'cp6v4_a3', speaker:'A', japanese:'（撮りながら）OKかな。もう一回？', romaji:'', korean:'(찍으면서) 괜찮으려나. 한 번 더?', tip:'OKかな = 괜찮으려나 (확인)' },
  { id:'cp6v4_b4', speaker:'B', japanese:'見せて！…あ、ちょっとブレてる。もう一回！', romaji:'', korean:'보여줘! …아, 좀 흔들렸어. 한 번 더!', tip:'ブレる = 흔들리다 (사진·동영상이)' },
  { id:'cp6v4_a4', speaker:'A', japanese:'何回撮るの…腕、プルプルしてきた。', romaji:'', korean:'몇 번 찍는 거야… 팔이 달달 떨리기 시작했어.', tip:'プルプル = 달달 떨리는 모양 (팔이 힘들 때)' },
  { id:'cp6v4_b5', speaker:'B', japanese:'最後にもう一回！今度こそ完璧なやつ！', romaji:'', korean:'마지막으로 한 번 더! 이번엔 완벽한 거 찍자!', tip:'今度こそ(こんどこそ) = 이번엔 정말로, 이번엔 꼭' },
];
