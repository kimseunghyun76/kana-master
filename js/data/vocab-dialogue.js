// ============================================================
//  롤플레이 다이얼로그 항목
//  speaker: 'A' = 학습자(나), 'B' = 상대방, 'N' = 장면 설명
// ============================================================
const VOCAB_ITEMS_DIALOGUE = [

  // ══════════════════════════════════════════════════════════
  //  만남 그룹 (simlevel:1)
  // ══════════════════════════════════════════════════════════

  // ── 씬1: 처음 만남 (sim_first_meeting) ──
  { id:'dm_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 사진을 부탁하며 대화 시작', english:'📍 At a tourist spot — starting a conversation by asking for a photo', tip:'' },
  { id:'dm_1',  speaker:'A', japanese:'すみません、写真を撮っていただけますか？', romaji:'sumimasen, shashin wo totte itadakemasu ka', korean:'저기요, 사진 찍어주실 수 있나요?', english:'Excuse me, could you take a photo for me?' },
  { id:'dm_2',  speaker:'B', japanese:'もちろんです！はい、どうぞ。',            romaji:'mochiron desu! hai, douzo', korean:'물론이죠! 자, 여기요.', english:'Of course! Here you go.' },
  { id:'dm_3',  speaker:'A', japanese:'ありがとうございます。日本は初めてなんです。', romaji:'arigatou gozaimasu. nihon wa hajimete nan desu', korean:'감사합니다. 일본은 처음이에요.', english:'Thank you. It\'s my first time in Japan.' },
  { id:'dm_4',  speaker:'B', japanese:'そうですか！どちらから来ましたか？',       romaji:'sou desu ka! dochira kara kimashita ka', korean:'그래요! 어디서 오셨나요?', english:'Oh really! Where are you from?' },
  { id:'dm_5',  speaker:'A', japanese:'韓国のソウルから来ました。',               romaji:'kankoku no souru kara kimashita', korean:'한국 서울에서 왔어요.', english:'I came from Seoul, Korea.' },
  { id:'dm_6',  speaker:'B', japanese:'いいですね！日本の印象はどうですか？',     romaji:'ii desu ne! nihon no inshou wa dou desu ka', korean:'좋네요! 일본 인상은 어때요?', english:'Nice! What do you think of Japan so far?' },
  { id:'dm_7',  speaker:'A', japanese:'食べ物がおいしくて、みんな親切で大好きです。', romaji:'tabemono ga oishikute, minna shinsetsu de daisuki desu', korean:'음식도 맛있고 다들 친절해서 너무 좋아요.', english:'The food is delicious and everyone is so kind — I love it!' },
  { id:'dm_8',  speaker:'B', japanese:'それはよかった！どこへ行く予定ですか？',   romaji:'sore wa yokatta! doko e iku yotei desu ka', korean:'다행이에요! 어디 갈 예정이에요?', english:'Glad to hear it! Where are you planning to go?' },
  { id:'dm_9',  speaker:'A', japanese:'京都と大阪に行きたいです。',               romaji:'kyouto to oosaka ni ikitai desu', korean:'교토랑 오사카에 가고 싶어요.', english:'I want to go to Kyoto and Osaka.' },
  { id:'dm_10', speaker:'B', japanese:'楽しんでください！よい旅を！',             romaji:'tanoshinde kudasai! yoi tabi wo', korean:'즐기세요! 좋은 여행 되세요!', english:'Enjoy yourself! Have a great trip!' },
  { id:'dm_11', speaker:'A', japanese:'ありがとうございました！',                 romaji:'arigatou gozaimashita', korean:'감사합니다!', english:'Thank you so much!' },

  // ── 씬2: 일상 스몰토크 (sim_daily_chat) ──
  { id:'dd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 일본인과 일상 대화', english:'📍 At a café — casual chat with a Japanese person', tip:'' },
  { id:'dd_1',  speaker:'B', japanese:'日本語、お上手ですね。どこで勉強しましたか？', romaji:'nihongo, ojouzu desu ne. doko de benkyou shimashita ka', korean:'일본어 잘 하시네요. 어디서 공부하셨어요?', english:'Your Japanese is great! Where did you study?' },
  { id:'dd_2',  speaker:'A', japanese:'ありがとうございます。アプリで少し勉強しました。', romaji:'arigatou gozaimasu. apuri de sukoshi benkyou shimashita', korean:'감사해요. 앱으로 조금 공부했어요.', english:'Thanks. I studied a little with an app.' },
  { id:'dd_3',  speaker:'B', japanese:'すごいですね！日本語は難しいですか？',      romaji:'sugoi desu ne! nihongo wa muzukashii desu ka', korean:'대단해요! 일본어 어렵지 않나요?', english:'That\'s amazing! Is Japanese hard?' },
  { id:'dd_4',  speaker:'A', japanese:'ひらがなは大丈夫ですが、漢字が難しいです。',romaji:'hiragana wa daijoubu desu ga, kanji ga muzukashii desu', korean:'히라가나는 괜찮은데 한자가 어려워요.', english:'Hiragana is fine, but kanji is tough.' },
  { id:'dd_5',  speaker:'B', japanese:'わかります！趣味は何ですか？',             romaji:'wakarimasu! shumi wa nan desu ka', korean:'그렇겠네요! 취미가 뭐예요?', english:'I get that! What are your hobbies?' },
  { id:'dd_6',  speaker:'A', japanese:'旅行と日本のアニメが好きです。',            romaji:'ryokou to nihon no anime ga suki desu', korean:'여행이랑 일본 애니메이션을 좋아해요.', english:'I like traveling and Japanese anime.' },
  { id:'dd_7',  speaker:'B', japanese:'いいですね！おすすめのアニメはありますか？', romaji:'ii desu ne! osusume no anime wa arimasu ka', korean:'좋네요! 추천 애니 있어요?', english:'Nice! Any anime you\'d recommend?' },
  { id:'dd_8',  speaker:'A', japanese:'「君の名は。」がとても好きです。',          romaji:'kimi no na wa ga totemo suki desu', korean:'「너의 이름은」을 정말 좋아해요.', english:'I really love "Your Name."' },
  { id:'dd_9',  speaker:'B', japanese:'私も好きです！日本語、もっと頑張ってください。', romaji:'watashi mo suki desu! nihongo, motto ganbatte kudasai', korean:'저도 좋아해요! 일본어 더 열심히 하세요!', english:'Me too! Keep up the great work with Japanese!' },
  { id:'dd_10', speaker:'A', japanese:'ありがとうございます！また話しましょう。',  romaji:'arigatou gozaimasu! mata hanashimashou', korean:'감사해요! 또 얘기해요.', english:'Thank you! Let\'s chat again sometime.' },

  // ══════════════════════════════════════════════════════════
  //  방문 그룹 (simlevel:2)
  // ══════════════════════════════════════════════════════════

  // ── 씬3: 식당 (sim_restaurant_dlg) ──
  { id:'rd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 일본 식당 — 입장·주문·계산 전체 흐름', english:'📍 Japanese restaurant — full flow from entry to ordering to paying', tip:'' },
  { id:'rd_1',  speaker:'B', japanese:'いらっしゃいませ！何名様ですか？',          romaji:'irasshaimase! nannmei sama desu ka', korean:'어서 오세요! 몇 분이세요?', english:'Welcome! How many in your party?' },
  { id:'rd_2',  speaker:'A', japanese:'一人です。',                               romaji:'hitori desu', korean:'한 명이요.', english:'Just one.' },
  { id:'rd_3',  speaker:'B', japanese:'こちらへどうぞ。ご注文は決まりましたか？',   romaji:'kochira e douzo. gochuumon wa kimarimashita ka', korean:'이쪽으로 오세요. 주문 정하셨나요?', english:'Right this way. Have you decided on your order?' },
  { id:'rd_4',  speaker:'A', japanese:'これは何が入っていますか？',                romaji:'kore wa nani ga haitte imasu ka', korean:'이건 뭐가 들어 있나요?', english:'What\'s in this one?' },
  { id:'rd_5',  speaker:'B', japanese:'豚肉と野菜です。辛くないですよ。',          romaji:'butaniku to yasai desu. karakunai desu yo', korean:'돼지고기랑 채소예요. 안 맵습니다.', english:'It\'s pork and vegetables. It\'s not spicy.' },
  { id:'rd_6',  speaker:'A', japanese:'じゃあ、これをください。ご飯は大盛りで。',  romaji:'jaa, kore wo kudasai. gohan wa oomori de', korean:'그럼 이걸로 주세요. 밥은 곱빼기로요.', english:'Then I\'ll have this one, please. Extra rice.' },
  { id:'rd_7',  speaker:'B', japanese:'お飲み物は？',                             romaji:'onomimono wa', korean:'음료는요?', english:'And to drink?' },
  { id:'rd_8',  speaker:'A', japanese:'お水をください。',                          romaji:'omizu wo kudasai', korean:'물 주세요.', english:'Water, please.' },
  { id:'rd_9',  speaker:'B', japanese:'かしこまりました。少々お待ちください。',     romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만 기다려 주세요.', english:'Got it. Please wait a moment.' },
  { id:'rd_10', speaker:'A', japanese:'すみません、お会計をお願いします。',        romaji:'sumimasen, okaikei wo onegai shimasu', korean:'저기요, 계산 부탁드려요.', english:'Excuse me, can I get the check please?' },
  { id:'rd_11', speaker:'B', japanese:'1,200円です。カードはご利用ですか？',       romaji:'sen nihyaku en desu. kaado wa goriyou desu ka', korean:'1,200엔이요. 카드 사용하시나요?', english:'That\'s 1,200 yen. Will you be paying by card?' },
  { id:'rd_12', speaker:'A', japanese:'カードでお願いします。ごちそうさまでした！', romaji:'kaado de onegai shimasu. gochisousama deshita', korean:'카드로 할게요. 잘 먹었습니다!', english:'Card, please. That was delicious!' },
  { id:'rd_13', speaker:'B', japanese:'ありがとうございました！またどうぞ。',      romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.', english:'Thank you! Please come again.' },

  // ── 씬4: 이자카야 (sim_izakaya) ──
  { id:'iz_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야 — 저녁 식사 겸 음주', english:'📍 Izakaya — dinner and drinks', tip:'' },
  { id:'iz_1',  speaker:'B', japanese:'いらっしゃいませ！何名様ですか？',          romaji:'irasshaimase! nannmei sama desu ka', korean:'어서 오세요! 몇 분이세요?', english:'Welcome! How many people?' },
  { id:'iz_2',  speaker:'A', japanese:'二人です。',                               romaji:'futari desu', korean:'두 명이요.', english:'Two of us.' },
  { id:'iz_3',  speaker:'B', japanese:'禁煙と喫煙、どちらがよろしいですか？',      romaji:'kinen to kitsuen, dochira ga yoroshii desu ka', korean:'금연석과 흡연석 중 어느 쪽으로 드릴까요?', english:'Would you prefer non-smoking or smoking?' },
  { id:'iz_4',  speaker:'A', japanese:'禁煙でお願いします。',                      romaji:'kinen de onegai shimasu', korean:'금연으로 주세요.', english:'Non-smoking, please.' },
  { id:'iz_5',  speaker:'B', japanese:'こちらへどうぞ。ご注文はお決まりでしたらお呼びください。', romaji:'kochira e douzo. gochuumon wa okimari deshitara oyobi kudasai', korean:'이쪽이요. 주문 정하시면 불러 주세요.', english:'Right this way. Just call us when you\'re ready to order.' },
  { id:'iz_6',  speaker:'A', japanese:'すみません、とりあえずビールを二つお願いします。', romaji:'sumimasen, toriaezu biiru wo futatsu onegai shimasu', korean:'저기요, 우선 맥주 두 잔 주세요.', english:'Excuse me, to start we\'ll have two beers please.' },
  { id:'iz_7',  speaker:'B', japanese:'かしこまりました。おつまみはいかがですか？', romaji:'kashikomarimashita. otsumami wa ikaga desu ka', korean:'알겠습니다. 안주는 어떠세요?', english:'Certainly. How about some snacks to go with that?' },
  { id:'iz_8',  speaker:'A', japanese:'おすすめは何ですか？',                      romaji:'osusume wa nan desu ka', korean:'추천이 뭐예요?', english:'What do you recommend?' },
  { id:'iz_9',  speaker:'B', japanese:'焼き鳥の盛り合わせと枝豆が人気ですよ。',    romaji:'yakitori no moriawase to edamame ga ninki desu yo', korean:'야키토리 모둠이랑 에다마메가 인기 있어요.', english:'The yakitori assortment and edamame are both popular.' },
  { id:'iz_10', speaker:'A', japanese:'じゃあ、それを両方ください。',              romaji:'jaa, sore wo ryouhou kudasai', korean:'그럼 둘 다 주세요.', english:'We\'ll take both of those then.' },
  { id:'iz_11', speaker:'A', japanese:'お会計をお願いします。カードで払えますか？', romaji:'okaikei wo onegai shimasu. kaado de haraemasu ka', korean:'계산 부탁드려요. 카드 되나요?', english:'Can we get the check? Do you take card?' },
  { id:'iz_12', speaker:'B', japanese:'はい、もちろんです。ありがとうございました！', romaji:'hai, mochiron desu. arigatou gozaimashita', korean:'네, 물론이죠. 감사합니다!', english:'Yes, of course. Thank you so much!' },

  // ── 씬5: 편의점 (sim_konbini_dlg) ──
  { id:'kd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 — 도시락, 결제, 서비스 이용', english:'📍 Convenience store — bento, payment, and services', tip:'' },
  { id:'kd_1',  speaker:'A', japanese:'すみません、このお弁当を温めてもらえますか？', romaji:'sumimasen, kono obentou wo atatamete moraemasu ka', korean:'저기요, 이 도시락 데워 주실 수 있나요?', english:'Excuse me, could you heat up this bento for me?' },
  { id:'kd_2',  speaker:'B', japanese:'かしこまりました。少々お待ちください。',     romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만요.', english:'Sure thing. Just a moment.' },
  { id:'kd_3',  speaker:'B', japanese:'はい、どうぞ。お箸はおつけしますか？',      romaji:'hai, douzo. ohashi wa otsukeshimasu ka', korean:'자, 여기요. 젓가락 드릴까요?', english:'Here you go. Would you like chopsticks?' },
  { id:'kd_4',  speaker:'A', japanese:'はい、一膳ください。ATMはどこですか？',     romaji:'hai, ichizen kudasai. eitiemu wa doko desu ka', korean:'네, 하나 주세요. ATM은 어디 있어요?', english:'Yes, one pair please. Where is the ATM?' },
  { id:'kd_5',  speaker:'B', japanese:'入口の横にございます。',                   romaji:'iriguchi no yoko ni gozaimasu', korean:'입구 옆에 있어요.', english:'It\'s right next to the entrance.' },
  { id:'kd_6',  speaker:'A', japanese:'ありがとうございます。レジでお願いします。', romaji:'arigatou gozaimasu. reji de onegai shimasu', korean:'감사해요. 계산 부탁드려요.', english:'Thank you. I\'d like to pay now.' },
  { id:'kd_7',  speaker:'B', japanese:'レジ袋はご利用ですか？3円になります。',     romaji:'rejibukuro wa goriyou desu ka? san en ni narimasu', korean:'봉투 사용하시겠어요? 3엔이에요.', english:'Would you like a bag? That\'s 3 yen.' },
  { id:'kd_8',  speaker:'A', japanese:'いりません。Suicaで払えますか？',           romaji:'irimasen. suika de haraemasu ka', korean:'필요 없어요. 스이카로 낼 수 있나요?', english:'No thanks. Can I pay with Suica?' },
  { id:'kd_9',  speaker:'B', japanese:'はい、こちらへタッチしてください。820円です。', romaji:'hai, kochira e tatchi shite kudasai. happyaku nijuu en desu', korean:'네, 여기 터치해 주세요. 820엔이에요.', english:'Yes, just tap here. That\'s 820 yen.' },
  { id:'kd_10', speaker:'B', japanese:'ありがとうございました！またどうぞ。',      romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.', english:'Thank you! Come again!' },

  // ── 씬6: 쇼핑 (sim_shopping_dlg) ──
  { id:'sd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 옷가게 — 가격 문의·시착·결제', english:'📍 Clothing store — asking about prices, trying on, and paying', tip:'' },
  { id:'sd_1',  speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？',      romaji:'irasshaimase! nanika osagashi desu ka', korean:'어서 오세요! 찾으시는 게 있나요?', english:'Welcome! Can I help you find something?' },
  { id:'sd_2',  speaker:'A', japanese:'見ているだけです。これ、試着してもいいですか？', romaji:'mite iru dake desu. kore, shichaku shite mo ii desu ka', korean:'그냥 보는 거예요. 이거 입어봐도 되나요?', english:'Just browsing. Can I try this on?' },
  { id:'sd_3',  speaker:'B', japanese:'もちろんです。試着室はあちらです。',        romaji:'mochiron desu. shichakushitsu wa achira desu', korean:'물론이죠. 피팅룸은 저쪽이에요.', english:'Of course. The fitting room is over there.' },
  { id:'sd_4',  speaker:'A', japanese:'Sサイズは少し小さいです。Mはありますか？', romaji:'esu saizu wa sukoshi chiisai desu. emu wa arimasu ka', korean:'S 사이즈는 좀 작네요. M 있나요?', english:'The size S is a little small. Do you have a medium?' },
  { id:'sd_5',  speaker:'B', japanese:'少々お待ちください。はい、こちらです。',    romaji:'shoushou omachi kudasai. hai, kochira desu', korean:'잠시만요. 네, 여기 있어요.', english:'One moment. Yes, here you go.' },
  { id:'sd_6',  speaker:'A', japanese:'これはいくらですか？',                      romaji:'kore wa ikura desu ka', korean:'이거 얼마예요?', english:'How much is this?' },
  { id:'sd_7',  speaker:'B', japanese:'3,800円です。ただいまセール中です。',       romaji:'sanzen happyaku en desu. tadaima seeru chuu desu', korean:'3,800엔이에요. 지금 세일 중이에요.', english:'It\'s 3,800 yen. We\'re having a sale right now.' },
  { id:'sd_8',  speaker:'A', japanese:'免税になりますか？',                        romaji:'menzei ni narimasu ka', korean:'면세 되나요?', english:'Is this tax-free?' },
  { id:'sd_9',  speaker:'B', japanese:'はい、パスポートをお見せください。',         romaji:'hai, pasupooto wo omise kudasai', korean:'네, 여권을 보여주세요.', english:'Yes, please show me your passport.' },
  { id:'sd_10', speaker:'A', japanese:'じゃあ、これをください。カードで払えますか？', romaji:'jaa, kore wo kudasai. kaado de haraemasu ka', korean:'그럼 이걸로 할게요. 카드 되나요?', english:'I\'ll take this one then. Can I pay by card?' },
  { id:'sd_11', speaker:'B', japanese:'はい、大丈夫です。ありがとうございました！', romaji:'hai, daijoubu desu. arigatou gozaimashita', korean:'네, 괜찮아요. 감사합니다!', english:'Yes, that\'s fine. Thank you!' },

  // ══════════════════════════════════════════════════════════
  //  여행 그룹 (simlevel:3)
  // ══════════════════════════════════════════════════════════

  // ── 씬7: 공항 체크인 (sim_airport) ──
  { id:'ap_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 공항 체크인 카운터 — 탑승 수속', english:'📍 Airport check-in counter — boarding procedures', tip:'' },
  { id:'ap_1',  speaker:'B', japanese:'パスポートとご予約確認書をお願いします。',  romaji:'pasupooto to goyoyaku kakuninsho wo onegai shimasu', korean:'여권과 예약 확인서 주세요.', english:'Your passport and booking confirmation, please.' },
  { id:'ap_2',  speaker:'A', japanese:'はい、こちらです。',                       romaji:'hai, kochira desu', korean:'네, 여기 있어요.', english:'Here you go.' },
  { id:'ap_3',  speaker:'B', japanese:'お席は窓側と通路側、どちらがよろしいですか？', romaji:'oseki wa madogawa to tsuurogawa, dochira ga yoroshii desu ka', korean:'좌석은 창가와 복도 중 어느 쪽으로 드릴까요?', english:'Would you prefer a window seat or an aisle seat?' },
  { id:'ap_4',  speaker:'A', japanese:'窓側でお願いします。',                     romaji:'madogawa de onegai shimasu', korean:'창가로 주세요.', english:'Window seat, please.' },
  { id:'ap_5',  speaker:'B', japanese:'スーツケースをお預けになりますか？',         romaji:'suutsukeesu wo oazuke ni narimasu ka', korean:'캐리어 맡기시겠어요?', english:'Would you like to check your suitcase?' },
  { id:'ap_6',  speaker:'A', japanese:'はい、一個あります。手荷物は機内に持ちます。', romaji:'hai, ikko arimasu. tenimotsu wa kinai ni mochimasu', korean:'네, 하나요. 기내 수하물은 가지고 탈게요.', english:'Yes, I have one. I\'ll keep my carry-on with me.' },
  { id:'ap_7',  speaker:'B', japanese:'重量は23キロです。搭乗ゲートは34番です。', romaji:'juuryou wa nijuusan kiro desu. toujourgeeto wa sanjuuyon ban desu', korean:'무게 23kg이에요. 탑승 게이트는 34번이에요.', english:'The weight is 23 kg. Your boarding gate is number 34.' },
  { id:'ap_8',  speaker:'A', japanese:'搭乗時刻は何時ですか？',                   romaji:'tojou jikoku wa nanji desu ka', korean:'탑승 시간이 언제예요?', english:'What time is boarding?' },
  { id:'ap_9',  speaker:'B', japanese:'10時20分です。30分前にはゲートへどうぞ。', romaji:'juuji nijuppun desu. sanjuppun mae ni wa geeto e douzo', korean:'10시 20분이에요. 30분 전에는 게이트로 오세요.', english:'10:20. Please be at the gate 30 minutes before.' },
  { id:'ap_10', speaker:'A', japanese:'両替はどこでできますか？',                  romaji:'ryougae wa doko de dekimasu ka', korean:'환전은 어디서 할 수 있어요?', english:'Where can I exchange currency?' },
  { id:'ap_11', speaker:'B', japanese:'セキュリティ手前の左側にございます。',      romaji:'sekyuriti temae no hidari gawa ni gozaimasu', korean:'보안검색대 앞 왼쪽에 있어요.', english:'It\'s on the left side before the security checkpoint.' },
  { id:'ap_12', speaker:'A', japanese:'ありがとうございます。税関と入国審査はどこですか？', romaji:'arigatou gozaimasu. zeikan to nyuukoku shinsa wa doko desu ka', korean:'감사해요. 세관이랑 입국심사는 어디예요?', english:'Thank you. Where are customs and immigration?' },
  { id:'ap_13', speaker:'B', japanese:'ゲートを通った先にございます。よいご旅行を！', romaji:'geeto wo tootta saki ni gozaimasu. yoi goryokou wo', korean:'게이트 지나서 있어요. 좋은 여행 되세요!', english:'They\'re just past the gate. Have a great trip!' },

  // ── 씬8: 호텔 체크인 (sim_hotel_dlg) ──
  { id:'hd_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트 — 체크인 전체 절차', english:'📍 Hotel front desk — full check-in process', tip:'' },
  { id:'hd_1',  speaker:'A', japanese:'チェックインをお願いします。',              romaji:'chekkuin wo onegai shimasu', korean:'체크인 부탁드립니다.', english:'I\'d like to check in, please.' },
  { id:'hd_2',  speaker:'B', japanese:'お名前をお願いします。',                   romaji:'onamae wo onegai shimasu', korean:'성함을 알려주시겠어요?', english:'May I have your name?' },
  { id:'hd_3',  speaker:'A', japanese:'キム・ジウンと申します。',                 romaji:'kimu jiun to moushimasu', korean:'김지운이라고 합니다.', english:'My name is Kim Ji-un.' },
  { id:'hd_4',  speaker:'B', japanese:'ご予約確認しました。パスポートを拝見できますか？', romaji:'goyoyaku kakunin shimashita. pasupooto wo haiken dekimasu ka', korean:'예약 확인했어요. 여권 볼 수 있을까요?', english:'I\'ve confirmed your reservation. May I see your passport?' },
  { id:'hd_5',  speaker:'A', japanese:'こちらです。朝食は付いていますか？',        romaji:'kochira desu. choushoku wa tsuite imasu ka', korean:'여기요. 조식 포함인가요?', english:'Here it is. Is breakfast included?' },
  { id:'hd_6',  speaker:'B', japanese:'はい、朝食込みです。7時から10時まで1階です。', romaji:'hai, choushoku komi desu. shichiji kara juuji made ikkai desu', korean:'네, 조식 포함이에요. 7시~10시, 1층이에요.', english:'Yes, breakfast is included. It\'s from 7 to 10 on the first floor.' },
  { id:'hd_7',  speaker:'A', japanese:'Wi-Fiのパスワードはどこにありますか？',     romaji:'waifai no pasuwaado wa doko ni arimasu ka', korean:'와이파이 비밀번호는 어디 있나요?', english:'Where can I find the Wi-Fi password?' },
  { id:'hd_8',  speaker:'B', japanese:'お部屋のカードに書いてあります。',         romaji:'oheya no kaado ni kaite arimasu', korean:'방 카드에 적혀 있어요.', english:'It\'s written on your room card.' },
  { id:'hd_9',  speaker:'A', japanese:'チェックアウトは何時ですか？',              romaji:'chekkuauto wa nanji desu ka', korean:'체크아웃은 몇 시예요?', english:'What time is check-out?' },
  { id:'hd_10', speaker:'B', japanese:'11時です。延長の場合はフロントへご連絡を。', romaji:'juuichiji desu. enchou no baai wa furonto e gorenraku wo', korean:'11시예요. 연장하시면 프런트에 연락 주세요.', english:'11 o\'clock. If you need a late check-out, please contact the front desk.' },
  { id:'hd_11', speaker:'A', japanese:'わかりました。ありがとうございます。',      romaji:'wakarimashita. arigatou gozaimasu', korean:'알겠습니다. 감사합니다.', english:'Got it. Thank you.' },
  { id:'hd_12', speaker:'B', japanese:'ごゆっくりどうぞ！何かあればお呼びください。', romaji:'goyukkuri douzo! nanika areba oyobi kudasai', korean:'편히 쉬세요! 무슨 일 있으면 불러 주세요.', english:'Please relax and enjoy your stay! Call us if you need anything.' },

  // ── 씬9: 택시 (sim_taxi_dlg) ──
  { id:'tx_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 앞에서 택시 탑승 — 목적지까지', english:'📍 Getting a taxi in front of the hotel — to the destination', tip:'' },
  { id:'tx_1',  speaker:'A', japanese:'すみません、浅草寺まで行ってください。',    romaji:'sumimasen, sensouji made itte kudasai', korean:'저기요, 아사쿠사사까지 가 주세요.', english:'Excuse me, please take me to Senso-ji.' },
  { id:'tx_2',  speaker:'B', japanese:'かしこまりました。高速道路は使いますか？', romaji:'kashikomarimashita. kousoku douro wa tsukaimasu ka', korean:'알겠습니다. 고속도로 이용하시겠어요?', english:'Understood. Would you like to take the highway?' },
  { id:'tx_3',  speaker:'A', japanese:'一番早い道でお願いします。',               romaji:'ichiban hayai michi de onegai shimasu', korean:'제일 빠른 길로 가 주세요.', english:'Please take the fastest route.' },
  { id:'tx_4',  speaker:'B', japanese:'大体20分くらいです。',                     romaji:'daitai nijuppun gurai desu', korean:'대략 20분 정도예요.', english:'It\'ll be about 20 minutes.' },
  { id:'tx_5',  speaker:'A', japanese:'この辺で降ろしてください。',               romaji:'kono hen de oroshite kudasai', korean:'이 근처에서 세워 주세요.', english:'Please drop me off around here.' },
  { id:'tx_6',  speaker:'B', japanese:'1,850円です。',                            romaji:'sen happyakugojiuen desu', korean:'1,850엔이에요.', english:'That\'s 1,850 yen.' },
  { id:'tx_7',  speaker:'A', japanese:'カードで払えますか？',                     romaji:'kaado de haraemasu ka', korean:'카드로 낼 수 있어요?', english:'Can I pay by card?' },
  { id:'tx_8',  speaker:'B', japanese:'はい、こちらへどうぞ。領収書はいりますか？', romaji:'hai, kochira e douzo. ryoushuusho wa irimasu ka', korean:'네, 여기요. 영수증 필요하세요?', english:'Yes, right here. Would you like a receipt?' },
  { id:'tx_9',  speaker:'A', japanese:'はい、ください。ありがとうございました。',  romaji:'hai, kudasai. arigatou gozaimashita', korean:'네, 주세요. 감사합니다.', english:'Yes please. Thank you.' },
  { id:'tx_10', speaker:'B', japanese:'ありがとうございました！気をつけて。',      romaji:'arigatou gozaimashita! ki wo tsukete', korean:'감사합니다! 조심히 가세요.', english:'Thank you! Take care.' },

  // ══════════════════════════════════════════════════════════
  //  방문 그룹 추가 (simlevel:2) — 가리키기 / 지하철 / 엘리베이터 / 화장실 / 흡연
  // ══════════════════════════════════════════════════════════

  // ── 가리키기 (sim_pointing) ─────────────────────────────
  { id:'pt_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 편의점·가게에서 — 말이 안 통할 때 손가락으로 해결!', english:'📍 At a convenience store or shop — pointing when words fail!' },
  { id:'pt_1',   speaker:'A', japanese:'すみません、これをください。',         romaji:'sumimasen, kore wo kudasai',          korean:'저기요, 이거 주세요.',          english:'Excuse me, I\'ll have this one.', tip:'메뉴나 진열대를 가리키며' },
  { id:'pt_2',   speaker:'B', japanese:'こちらですね。少々お待ちください。',    romaji:'kochira desu ne. shoushou omachi kudasai', korean:'이거 맞죠? 잠깐 기다려 주세요.', english:'This one, right? Just a moment.' },
  { id:'pt_3',   speaker:'A', japanese:'それは何ですか？',                     romaji:'sore wa nan desu ka',                 korean:'그건 뭐예요?', english:'What is that?' },
  { id:'pt_4',   speaker:'B', japanese:'これはたこ焼きです。おすすめですよ！', romaji:'kore wa takoyaki desu. osusume desu yo', korean:'이건 타코야키예요. 추천해요!', english:'This is takoyaki. I recommend it!' },
  { id:'pt_5',   speaker:'A', japanese:'もう少し大きいのはありますか？',       romaji:'mou sukoshi ookii no wa arimasu ka', korean:'좀 더 큰 거 있나요?', english:'Do you have a slightly bigger one?' },
  { id:'pt_6',   speaker:'B', japanese:'はい、こちらはいかがですか？',         romaji:'hai, kochira wa ikaga desu ka',       korean:'네, 이쪽은 어떠세요?', english:'Yes, how about this one?' },
  { id:'pt_7',   speaker:'A', japanese:'これとこれをください。',               romaji:'kore to kore wo kudasai',             korean:'이거랑 이거 주세요.', english:'I\'ll take this one and this one.' },
  { id:'pt_8',   speaker:'B', japanese:'合計で１,２００円です。',              romaji:'goukei de sennihyakuen desu',         korean:'합계 1,200엔입니다.', english:'That\'s 1,200 yen in total.' },
  { id:'pt_9',   speaker:'A', japanese:'カードで払えますか？',                 romaji:'kaado de haraemasu ka',               korean:'카드로 결제 되나요?', english:'Can I pay by card?' },
  { id:'pt_10',  speaker:'B', japanese:'はい、こちらへどうぞ。ありがとうございました！', romaji:'hai, kochira e douzo. arigatou gozaimashita', korean:'네, 여기요. 감사합니다!', english:'Yes, right here. Thank you!' },
  { id:'pt_n2',  speaker:'N', japanese:'', romaji:'', korean:'💡 말이 안 통할 때 これ・それ・あれ + ください만 알면 OK!', english:'💡 When words fail, just know これ・それ・あれ + ください and you\'re good!' },

  // ── 지하철 (sim_subway) ──────────────────────────────────
  { id:'sub_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 지하철역에서 — 역무원에게 길 찾기', english:'📍 At the subway station — asking a staff member for directions' },
  { id:'sub_1',  speaker:'A', japanese:'すみません、〜線はどこですか？',       romaji:'sumimasen, ~ sen wa doko desu ka',    korean:'저기요, ~호선은 어디예요?',     english:'Excuse me, where is the ~ line?', tip:'〜에 노선명을 넣으세요' },
  { id:'sub_2',  speaker:'B', japanese:'あちらの階段を降りてください。',       romaji:'achira no kaidan wo kudasai',         korean:'저쪽 계단으로 내려가세요.', english:'Go down the stairs over there.' },
  { id:'sub_3',  speaker:'A', japanese:'乗り換えはどこですか？',               romaji:'norikae wa doko desu ka',             korean:'환승은 어디서 하나요?', english:'Where do I transfer?' },
  { id:'sub_4',  speaker:'B', japanese:'２番出口の方向です。',                 romaji:'niban deguchi no houkou desu',        korean:'2번 출구 방향입니다.', english:'It\'s in the direction of exit 2.' },
  { id:'sub_5',  speaker:'A', japanese:'切符を買いたいのですが。',             romaji:'kippu wo kaitai no desu ga',          korean:'표를 사고 싶은데요.', english:'I\'d like to buy a ticket.' },
  { id:'sub_6',  speaker:'B', japanese:'あの自動券売機でお買い求めください。', romaji:'ano jidou kenbaiki de okaimotome kudasai', korean:'저 자동발매기에서 구입해 주세요.', english:'Please buy one at that ticket machine over there.' },
  { id:'sub_7',  speaker:'A', japanese:'この電車は渋谷に止まりますか？',      romaji:'kono densha wa shibuya ni tomarimasu ka', korean:'이 전철 시부야에 서나요?', english:'Does this train stop at Shibuya?' },
  { id:'sub_8',  speaker:'B', japanese:'はい、次は渋谷です。',                romaji:'hai, tsugi wa shibuya desu',          korean:'네, 다음은 시부야입니다.', english:'Yes, next stop is Shibuya.' },
  { id:'sub_9',  speaker:'A', japanese:'終電は何時ですか？',                  romaji:'shuuden wa nanji desu ka',            korean:'막차가 몇 시예요?', english:'What time is the last train?' },
  { id:'sub_10', speaker:'B', japanese:'終電は０時３０分です。お気をつけて。', romaji:'shuuden wa reiji sanjuppun desu. okitsukete', korean:'막차는 0시 30분입니다. 조심히 가세요.', english:'The last train is at 12:30 AM. Take care.' },

  // ── 엘리베이터 (sim_elevator) ────────────────────────────
  { id:'elv_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 백화점 엘리베이터에서 — 층수 안내 받기', english:'📍 In a department store elevator — getting floor information' },
  { id:'elv_1',  speaker:'A', japanese:'すみません、何階ですか？',             romaji:'sumimasen, nankai desu ka',           korean:'저기요, 몇 층이에요?', english:'Excuse me, what floor is this?' },
  { id:'elv_2',  speaker:'B', japanese:'こちらは地下一階です。',               romaji:'kochira wa chika ikkai desu',         korean:'여기는 지하 1층입니다.', english:'This is basement level 1.' },
  { id:'elv_3',  speaker:'A', japanese:'レストランは何階ですか？',             romaji:'resutoran wa nankai desu ka',         korean:'레스토랑은 몇 층이에요?', english:'What floor is the restaurant on?' },
  { id:'elv_4',  speaker:'B', japanese:'８階にございます。上に参ります。',     romaji:'hakkai ni gozaimasu. ue ni mairimasu', korean:'8층에 있습니다. 위로 올라갑니다.', english:'It\'s on the 8th floor. Going up.' },
  { id:'elv_5',  speaker:'A', japanese:'開けてください！',                     romaji:'akete kudasai',                       korean:'(문) 열어 주세요!',             english:'Hold the door, please!', tip:'닫히는 엘리베이터에' },
  { id:'elv_6',  speaker:'B', japanese:'失礼しました。どうぞお乗りください。', romaji:'shitsurei shimashita. douzo onori kudasai', korean:'실례했습니다. 어서 타세요.', english:'I\'m sorry about that. Please get on.' },
  { id:'elv_7',  speaker:'A', japanese:'屋上はありますか？',                   romaji:'okujou wa arimasu ka',                korean:'옥상 있나요?', english:'Is there a rooftop?' },
  { id:'elv_8',  speaker:'B', japanese:'申し訳ありません、屋上は立入禁止です。', romaji:'moushiwake arimasen, okujou wa tachiiri kinshi desu', korean:'죄송합니다, 옥상은 출입금지입니다.', english:'I\'m sorry, the rooftop is off-limits.' },
  { id:'elv_9',  speaker:'A', japanese:'すみません、降ります。',               romaji:'sumimasen, orimasu',                  korean:'실례합니다, 내립니다.', english:'Excuse me, getting off.' },
  { id:'elv_10', speaker:'B', japanese:'ありがとうございました！',              romaji:'arigatou gozaimashita',               korean:'감사합니다!', english:'Thank you!' },

  // ── 화장실 (sim_toilet) ──────────────────────────────────
  { id:'tlt_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지·가게에서 — 화장실 찾기', english:'📍 At a tourist spot or store — finding the bathroom' },
  { id:'tlt_1',  speaker:'A', japanese:'すみません、トイレはどこですか？',     romaji:'sumimasen, toire wa doko desu ka',    korean:'저기요, 화장실 어디예요?', english:'Excuse me, where is the restroom?' },
  { id:'tlt_2',  speaker:'B', japanese:'突き当たりを左に曲がってください。',    romaji:'tsukiatari wo hidari ni magatte kudasai', korean:'막다른 곳에서 왼쪽으로 꺾으세요.', english:'Turn left at the end of the hall.' },
  { id:'tlt_3',  speaker:'A', japanese:'並んでいますか？',                     romaji:'narande imasu ka',                    korean:'줄 서 있는 건가요?', english:'Is there a line?' },
  { id:'tlt_4',  speaker:'B', japanese:'はい、少し並んでいます。',              romaji:'hai, sukoshi narande imasu',          korean:'네, 조금 줄 서 있어요.', english:'Yes, there\'s a short wait.' },
  { id:'tlt_5',  speaker:'A', japanese:'多目的トイレはありますか？',           romaji:'tamokuteki toire wa arimasu ka',      korean:'다목적 화장실 있나요?', english:'Is there an accessible restroom?' },
  { id:'tlt_6',  speaker:'B', japanese:'はい、エレベーターの隣にございます。', romaji:'hai, erebeetaa no tonari ni gozaimasu', korean:'네, 엘리베이터 옆에 있습니다.', english:'Yes, it\'s next to the elevator.' },
  { id:'tlt_7',  speaker:'A', japanese:'ウォシュレットの使い方がわかりません。', romaji:'woshuretto no tsukaikata ga wakarimasen', korean:'비데 사용법을 모르겠어요.', english:'I\'m not sure how to use the bidet.' },
  { id:'tlt_8',  speaker:'B', japanese:'このボタンで流せます。こちらが温水です。', romaji:'kono botan de nagasemasu. kochira ga onsui desu', korean:'이 버튼으로 내릴 수 있어요. 이쪽이 온수예요.', english:'This button flushes. This one is warm water.' },
  { id:'tlt_n2', speaker:'N', japanese:'', romaji:'', korean:'💡 일본 화장실은 고급! 비데(ウォシュレット) 사용법도 익혀두세요.', english:'💡 Japanese toilets are next-level! Learn how to use the bidet (ウォシュレット) too.' },

  // ── 흡연실 (sim_smoking) ─────────────────────────────────
  { id:'smkd_n1',speaker:'N', japanese:'', romaji:'', korean:'📍 식당·호텔에서 — 흡연 공간 확인', english:'📍 At a restaurant or hotel — checking for smoking areas' },
  { id:'smkd_1', speaker:'A', japanese:'すみません、喫煙所はどこですか？',     romaji:'sumimasen, kitsuenjo wa doko desu ka', korean:'저기요, 흡연실 어디예요?', english:'Excuse me, where is the smoking area?' },
  { id:'smkd_2', speaker:'B', japanese:'建物の外にございます。',               romaji:'tatemono no soto ni gozaimasu',       korean:'건물 밖에 있습니다.', english:'It\'s outside the building.' },
  { id:'smkd_3', speaker:'A', japanese:'喫煙席はありますか？',                 romaji:'kitsuen seki wa arimasu ka',          korean:'흡연석 있나요?', english:'Do you have a smoking section?' },
  { id:'smkd_4', speaker:'B', japanese:'申し訳ありませんが、当店は全席禁煙です。', romaji:'moushiwake arimasen ga, touten wa zenseki kinen desu', korean:'죄송하지만 저희 가게는 전석 금연입니다.', english:'I\'m sorry, our entire restaurant is non-smoking.' },
  { id:'smkd_5', speaker:'A', japanese:'加熱式タバコは使えますか？',           romaji:'kanetsu shiki tabako wa tsukaemasu ka', korean:'전자담배 사용 가능한가요?', english:'Can I use a heated tobacco device?' },
  { id:'smkd_6', speaker:'B', japanese:'はい、喫煙所内でのみご使用いただけます。', romaji:'hai, kitsuenjo nai demo nomi goshiyou itadakemasu', korean:'네, 흡연실 내에서만 사용 가능합니다.', english:'Yes, but only inside the smoking area.' },
  { id:'smkd_7', speaker:'A', japanese:'外で吸ってきます。すぐ戻ります。',     romaji:'soto de sutte kimasu. sugu modorimasu', korean:'밖에서 피우고 올게요. 바로 돌아올게요.', english:'I\'ll step outside for a smoke. I\'ll be right back.' },
  { id:'smkd_8', speaker:'B', japanese:'はい、どうぞ。灰皿はそちらにあります。', romaji:'hai, douzo. haizara wa sochira ni arimasu', korean:'네, 다녀오세요. 재떨이는 저쪽에 있어요.', english:'Sure, go ahead. The ashtray is over there.' },

  // ══════════════════════════════════════════════════════════
  //  여행 그룹 추가 (simlevel:3) — 버스 / 체크인 / 체크아웃 / 룸서비스 / 전화예약
  // ══════════════════════════════════════════════════════════

  // ── 버스 (sim_bus) ───────────────────────────────────────
  { id:'bus_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 버스 정류장에서 — 탑승·하차·요금 확인', english:'📍 At the bus stop — boarding, getting off, and checking fares' },
  { id:'bus_1',  speaker:'A', japanese:'すみません、このバスは浅草に行きますか？', romaji:'sumimasen, kono basu wa asakusa ni ikimasu ka', korean:'저기요, 이 버스 아사쿠사 가나요?', english:'Excuse me, does this bus go to Asakusa?' },
  { id:'bus_2',  speaker:'B', japanese:'はい、行きます。次のバス停で乗れますよ。', romaji:'hai, ikimasu. tsugi no basutei de noremasu yo', korean:'네, 갑니다. 다음 정류장에서 타실 수 있어요.', english:'Yes, it does. You can board at the next stop.' },
  { id:'bus_3',  speaker:'A', japanese:'一日乗車券はありますか？',              romaji:'ichinichi joushaken wa arimasu ka',    korean:'1일 승차권 있나요?', english:'Do you have a day pass?' },
  { id:'bus_4',  speaker:'B', japanese:'はい、８００円です。終日ご利用いただけます。', romaji:'hai, happyakuen desu. shujitsu goriyou itadakemasu', korean:'네, 800엔입니다. 하루 종일 이용 가능합니다.', english:'Yes, it\'s 800 yen. You can ride all day.' },
  { id:'bus_5',  speaker:'A', japanese:'整理券を取ってください。',              romaji:'seiriken wo totte kudasai',           korean:'정리권을 뽑아주세요.',          english:'Please take a numbered ticket.', tip:'뒷문 승차 버스의 경우' },
  { id:'bus_6',  speaker:'B', japanese:'こちらが整理券です。降りる時にお支払いください。', romaji:'kochira ga seiriken desu. oriru toki ni oshiharai kudasai', korean:'여기 정리권입니다. 내릴 때 내주세요.', english:'Here\'s your ticket. Please pay when you get off.' },
  { id:'bus_7',  speaker:'A', japanese:'浅草に着いたら教えてもらえますか？',    romaji:'asakusa ni tsuitara oshiete moraemasu ka', korean:'아사쿠사에 도착하면 알려주실 수 있나요?', english:'Could you let me know when we reach Asakusa?' },
  { id:'bus_8',  speaker:'B', japanese:'もちろんです。次の停留所が浅草です。',  romaji:'mochiron desu. tsugi no teiryuujo ga asakusa desu', korean:'물론이죠. 다음 정류장이 아사쿠사입니다.', english:'Of course. The next stop is Asakusa.' },
  { id:'bus_9',  speaker:'A', japanese:'次で降ります。ありがとうございます。',  romaji:'tsugi de orimasu. arigatou gozaimasu', korean:'다음에 내릴게요. 감사합니다.', english:'I\'ll get off at the next stop. Thank you.' },
  { id:'bus_10', speaker:'B', japanese:'お気をつけて！いい旅を！',              romaji:'okitsukete! ii tabi wo',              korean:'조심히 가세요! 좋은 여행 되세요!', english:'Take care! Have a great trip!' },

  // ── 체크인 (sim_checkin) ─────────────────────────────────
  { id:'cin_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트 — 체크인 전체 절차', english:'📍 Hotel front desk — full check-in process' },
  { id:'cin_1',  speaker:'A', japanese:'チェックインお願いします。',            romaji:'chekku in onegai shimasu',            korean:'체크인 부탁합니다.', english:'I\'d like to check in, please.' },
  { id:'cin_2',  speaker:'B', japanese:'ご予約のお名前をお聞かせください。',    romaji:'goyoyaku no onamae wo okikase kudasai', korean:'예약 성함을 말씀해 주세요.', english:'Could I have the name on the reservation?' },
  { id:'cin_3',  speaker:'A', japanese:'キム・ミンジュンです。パスポートはこちらです。', romaji:'kimu minjun desu. pasupooto wa kochira desu', korean:'김민준입니다. 여권 여기 있습니다.', english:'Kim Min-jun. Here\'s my passport.' },
  { id:'cin_4',  speaker:'B', japanese:'ありがとうございます。禁煙のお部屋でございますね。', romaji:'arigatou gozaimasu. kinen no oheya de gozaimasu ne', korean:'감사합니다. 금연 방이시죠.', english:'Thank you. You have a non-smoking room, correct?' },
  { id:'cin_5',  speaker:'A', japanese:'朝食は付いていますか？',               romaji:'choushoku wa tsuite imasu ka',        korean:'조식 포함인가요?', english:'Is breakfast included?' },
  { id:'cin_6',  speaker:'B', japanese:'はい、７時から１０時まで２階のレストランでお召し上がりいただけます。', romaji:'hai, shichiji kara juuji made nikai no resutoran de omeshiagari itadakemasu', korean:'네, 7시부터 10시까지 2층 레스토랑에서 드실 수 있습니다.', english:'Yes, you can enjoy breakfast from 7 to 10 at the 2nd floor restaurant.' },
  { id:'cin_7',  speaker:'A', japanese:'荷物を先に預けられますか？',           romaji:'nimotsu wo saki ni azukeraremasu ka', korean:'짐을 먼저 맡길 수 있나요?', english:'Can I leave my luggage here first?' },
  { id:'cin_8',  speaker:'B', japanese:'はい、こちらでお預かりします。',       romaji:'hai, kochira de oazukari shimasu',    korean:'네, 여기서 맡아드리겠습니다.', english:'Yes, we can hold it for you right here.' },
  { id:'cin_9',  speaker:'A', japanese:'Wi-Fiのパスワードは何ですか？',        romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호 뭐예요?', english:'What\'s the Wi-Fi password?' },
  { id:'cin_10', speaker:'B', japanese:'こちらのカードに記載されています。お部屋は５０３号室です。', romaji:'kochira no kaado ni kisai sarete imasu. oheya wa gohyakusan goushitsu desu', korean:'이 카드에 적혀 있습니다. 방은 503호실입니다.', english:'It\'s written on this card. Your room is 503.' },
  { id:'cin_11', speaker:'A', japanese:'ありがとうございます。よろしくお願いします。', romaji:'arigatou gozaimasu. yoroshiku onegaishimasu', korean:'감사합니다. 잘 부탁드립니다.', english:'Thank you. I look forward to my stay.' },

  // ── 체크아웃 (sim_checkout) ──────────────────────────────
  { id:'cout_n1',speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크아웃 — 짐 맡기기·택시·영수증', english:'📍 Hotel check-out — storing luggage, getting a taxi, and the receipt' },
  { id:'cout_1', speaker:'A', japanese:'チェックアウトお願いします。',          romaji:'chekku auto onegai shimasu',          korean:'체크아웃 부탁합니다.', english:'I\'d like to check out, please.' },
  { id:'cout_2', speaker:'B', japanese:'お部屋番号をお聞かせください。',        romaji:'oheya bangou wo okikase kudasai',     korean:'방 번호 말씀해 주세요.', english:'Could I have your room number?' },
  { id:'cout_3', speaker:'A', japanese:'５０３号室です。',                      romaji:'gohyakusan goushitsu desu',           korean:'503호실입니다.', english:'Room 503.' },
  { id:'cout_4', speaker:'B', japanese:'ご精算は２万３千円でございます。',      romaji:'goseisan wa niman sanzenen de gozaimasu', korean:'정산 금액은 23,000엔입니다.', english:'Your total bill is 23,000 yen.' },
  { id:'cout_5', speaker:'A', japanese:'荷物を預かってもらえますか？飛行機まで時間があります。', romaji:'nimotsu wo azukatte moraemasu ka. hikouki made jikan ga arimasu', korean:'짐 맡아주실 수 있나요? 비행기까지 시간이 있어서요.', english:'Could you hold my luggage? I have some time before my flight.' },
  { id:'cout_6', speaker:'B', japanese:'もちろんです。こちらに番号を書いてください。', romaji:'mochiron desu. kochira ni bangou wo kaite kudasai', korean:'물론이죠. 여기에 번호를 써 주세요.', english:'Of course. Please write your number here.' },
  { id:'cout_7', speaker:'A', japanese:'タクシーを呼んでいただけますか？空港まで。', romaji:'takushii wo yonde itadakemasu ka. kuukou made', korean:'택시 불러주실 수 있나요? 공항까지요.', english:'Could you call a taxi for me? To the airport.' },
  { id:'cout_8', speaker:'B', japanese:'はい、ただいまお呼びします。約１０分で参ります。', romaji:'hai, tadaima oyobi shimasu. yaku juppun de mairimasu', korean:'네, 지금 바로 부르겠습니다. 약 10분 후에 올 겁니다.', english:'Yes, I\'ll call one now. It should arrive in about 10 minutes.' },
  { id:'cout_9', speaker:'A', japanese:'楽しかったです。ありがとうございました。', romaji:'tanoshikatta desu. arigatou gozaimashita', korean:'즐거웠어요. 감사합니다.', english:'I had a wonderful time. Thank you.' },
  { id:'cout_10',speaker:'B', japanese:'またのご来館をお待ちしております！',    romaji:'mata no goraikan wo omachi shite orimasu', korean:'다음에 또 방문해 주세요!', english:'We look forward to welcoming you back!' },

  // ── 룸서비스 (sim_roomservice) ───────────────────────────
  { id:'rs_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 방에서 — 전화로 룸서비스 요청', english:'📍 In the hotel room — requesting room service by phone' },
  { id:'rs_1',   speaker:'A', japanese:'もしもし、ルームサービスをお願いします。', romaji:'moshi moshi, ruumu saabisu wo onegai shimasu', korean:'여보세요, 룸서비스 부탁합니다.', english:'Hello, I\'d like room service please.' },
  { id:'rs_2',   speaker:'B', japanese:'はい、フロントでございます。ご注文をどうぞ。', romaji:'hai, furonto de gozaimasu. gochuumon wo douzo', korean:'네, 프런트입니다. 주문하세요.', english:'Yes, this is the front desk. Go ahead with your order.' },
  { id:'rs_3',   speaker:'A', japanese:'タオルを２枚持ってきてください。',      romaji:'taoru wo nimai motte kite kudasai',    korean:'수건 두 장 가져다 주세요.', english:'Could you bring me two towels?' },
  { id:'rs_4',   speaker:'B', japanese:'承知しました。他にご要望はございますか。', romaji:'shouchi shimashita. hoka ni goyouhou wa gozaimasu ka', korean:'알겠습니다. 다른 요청사항 있으신가요?', english:'Understood. Is there anything else you need?' },
  { id:'rs_5',   speaker:'A', japanese:'エアコンが効きません。直してもらえますか。', romaji:'eakon ga kikimasen. naoshite moraemasu ka', korean:'에어컨이 안 돼요. 고쳐주실 수 있나요?', english:'The air conditioning isn\'t working. Could someone fix it?' },
  { id:'rs_6',   speaker:'B', japanese:'ただいまスタッフを向かわせます。１５分ほどお待ちください。', romaji:'tadaima sutaffu wo mukawasemasu. juugofun hodo omachi kudasai', korean:'지금 바로 직원을 보내겠습니다. 15분 정도 기다려 주세요.', english:'I\'ll send someone right away. Please wait about 15 minutes.' },
  { id:'rs_7',   speaker:'A', japanese:'朝食は何時からですか？',               romaji:'choushoku wa nanji kara desu ka',     korean:'조식은 몇 시부터예요?', english:'What time does breakfast start?' },
  { id:'rs_8',   speaker:'B', japanese:'７時から１０時まで、２階のレストランでお召し上がりいただけます。', romaji:'shichiji kara juuji made, nikai no resutoran de omeshiagari itadakemasu', korean:'7시부터 10시까지 2층 레스토랑에서 드실 수 있습니다.', english:'From 7 to 10 at the 2nd floor restaurant.' },
  { id:'rs_9',   speaker:'A', japanese:'ありがとうございます。',               romaji:'arigatou gozaimasu',                  korean:'감사합니다.', english:'Thank you.' },
  { id:'rs_10',  speaker:'B', japanese:'何かあればいつでもお申し付けください。', romaji:'nanika areba itsudemo omousitsuke kudasai', korean:'무슨 일이 있으면 언제든지 말씀해 주세요.', english:'Please don\'t hesitate to call us anytime.' },

  // ── 전화 예약 (sim_phone) ────────────────────────────────
  { id:'ph_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 전화로 예약하기 — 식당·숙소 예약', english:'📍 Making a reservation by phone — restaurant or accommodation' },
  { id:'ph_1',   speaker:'A', japanese:'もしもし、予約をしたいのですが。',      romaji:'moshi moshi, yoyaku wo shitai no desu ga', korean:'여보세요, 예약을 하고 싶은데요.', english:'Hello, I\'d like to make a reservation.' },
  { id:'ph_2',   speaker:'B', japanese:'はい、何名様でしょうか？',              romaji:'hai, nanmei sama deshou ka',          korean:'네, 몇 분이세요?', english:'Sure, how many people?' },
  { id:'ph_3',   speaker:'A', japanese:'２名で、明日の７時はありますか？',      romaji:'futari de, ashita no shichiji wa arimasu ka', korean:'두 명이요, 내일 7시 가능한가요?', english:'Two people. Do you have availability tomorrow at 7?' },
  { id:'ph_4',   speaker:'B', japanese:'少々お待ちください。…はい、ご用意できます。', romaji:'shoushou omachi kudasai. ... hai, goyoui dekimasu', korean:'잠깐만요. …네, 자리 있습니다.', english:'One moment please. …Yes, we have a table available.' },
  { id:'ph_5',   speaker:'A', japanese:'お名前とお電話番号をお願いします。',    romaji:'onamae to odenwa bangou wo onegai shimasu', korean:'성함과 전화번호 부탁드립니다.',  english:'Your name and phone number, please.', tip:'상대방(B)이 묻는 표현도 이해해야!' },
  { id:'ph_6',   speaker:'A', japanese:'キム・ミンジュンです。０９０－１２３４－５６７８です。', romaji:'kimu minjun desu. zero kyuu zero no ichi ni san yon no go roku nana hachi desu', korean:'김민준입니다. 090-1234-5678입니다.', english:'Kim Min-jun. 090-1234-5678.' },
  { id:'ph_7',   speaker:'B', japanese:'ありがとうございます。ご予約を承りました。', romaji:'arigatou gozaimasu. goyoyaku wo uketamawarimashita', korean:'감사합니다. 예약 접수했습니다.', english:'Thank you. Your reservation is confirmed.' },
  { id:'ph_8',   speaker:'A', japanese:'キャンセルの場合はどうすればいいですか？', romaji:'kyanseru no baai wa dou sureba ii desu ka', korean:'취소할 경우 어떻게 하면 되나요?', english:'What should I do if I need to cancel?' },
  { id:'ph_9',   speaker:'B', japanese:'前日までにお電話をいただければ大丈夫です。', romaji:'zenjitsu made ni odenwa wo itadakereba daijoubu desu', korean:'전날까지 전화 주시면 됩니다.', english:'Just give us a call before the day of your reservation.' },
  { id:'ph_10',  speaker:'A', japanese:'わかりました。よろしくお願いします。',  romaji:'wakarimashita. yoroshiku onegaishimasu', korean:'알겠습니다. 잘 부탁드립니다.', english:'Got it. Thank you very much.' },
  { id:'ph_11',  speaker:'B', japanese:'お待ちしております！',                  romaji:'omachi shite orimasu',                korean:'기다리겠습니다!', english:'We look forward to seeing you!' },

  // ══════════════════════════════════════════════════════════
  //  변형 대화 시나리오 (Variant Dialogues)
  // ══════════════════════════════════════════════════════════

  // ── 식당 변형 ②: 회전초밥 가게 ───────────────────────────
  { id:'rd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 회전초밥 가게 — 자리 안내·추가 주문·계산', english:'📍 Conveyor belt sushi — seating, extra orders, and paying' },
  { id:'rd2_1',  speaker:'B', japanese:'いらっしゃいませ！カウンターとテーブル、どちらになさいますか？', romaji:'irasshaimase! kauntaa to teeburu, dochira ni nasaimasu ka', korean:'어서 오세요! 카운터와 테이블 중 어디로 하시겠어요?', english:'Welcome! Would you prefer the counter or a table?' },
  { id:'rd2_2',  speaker:'A', japanese:'テーブルをお願いします。', romaji:'teeburu wo onegai shimasu', korean:'테이블로 부탁드려요.', english:'A table, please.' },
  { id:'rd2_3',  speaker:'B', japanese:'こちらへどうぞ。タッチパネルからご注文いただけます。', romaji:'kochira e douzo. tatchi paneru kara gochuumon itadakemasu', korean:'이쪽으로 오세요. 터치패널로 주문하실 수 있어요.', english:'Right this way. You can order from the touch screen.' },
  { id:'rd2_4',  speaker:'A', japanese:'すみません、このネタは何ですか？', romaji:'sumimasen, kono neta wa nan desu ka', korean:'저기요, 이 재료는 뭐예요?', english:'Excuse me, what is this topping?' },
  { id:'rd2_5',  speaker:'B', japanese:'マグロです。本日のおすすめですよ。', romaji:'maguro desu. honjitsu no osusume desu yo', korean:'참치예요. 오늘의 추천이에요.', english:'It\'s tuna. That\'s today\'s recommendation.' },
  { id:'rd2_6',  speaker:'A', japanese:'じゃあ、マグロを二皿とサーモンを一皿ください。', romaji:'jaa, maguro wo nisa ra to saamon wo hitosara kudasai', korean:'그럼 참치 두 접시랑 연어 한 접시 주세요.', english:'Then I\'ll have two plates of tuna and one plate of salmon, please.' },
  { id:'rd2_7',  speaker:'B', japanese:'かしこまりました。すぐにお持ちします。', romaji:'kashikomarimashita. sugu ni omochi shimasu', korean:'알겠습니다. 바로 가져다드릴게요.', english:'Got it. I\'ll bring them right away.' },
  { id:'rd2_8',  speaker:'A', japanese:'お茶のおかわりをもらえますか？', romaji:'ocha no okawari wo moraemasu ka', korean:'차 리필 해주실 수 있나요?', english:'Could I get a refill on the tea?' },
  { id:'rd2_9',  speaker:'B', japanese:'はい、どうぞ。他にご注文はございますか？', romaji:'hai, douzo. hoka ni gochuumon wa gozaimasu ka', korean:'네, 여기요. 다른 주문 있으신가요?', english:'Here you go. Anything else?' },
  { id:'rd2_10', speaker:'A', japanese:'大丈夫です。お会計をお願いします。', romaji:'daijoubu desu. okaikei wo onegai shimasu', korean:'괜찮아요. 계산 부탁드려요.', english:'No thanks. Can I get the bill?' },
  { id:'rd2_11', speaker:'B', japanese:'2,400円でございます。ありがとうございました！', romaji:'nisen yonhyaku en de gozaimasu. arigatou gozaimashita', korean:'2,400엔이에요. 감사합니다!', english:'That\'s 2,400 yen. Thank you so much!' },

  // ── 식당 변형 ③: 라멘 가게 ──────────────────────────────
  { id:'rd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 라멘 가게 — 식권 구매·토핑 추가·퇴장', english:'📍 Ramen shop — buying a meal ticket, adding toppings, and leaving' },
  { id:'rd3_1',  speaker:'A', japanese:'すみません、券売機の使い方が分からないんですが…', romaji:'sumimasen, kenbaiki no tsukaikata ga wakaranain desu ga', korean:'저기요, 자판기 사용법을 모르겠는데요…', english:'Excuse me, I\'m not sure how to use the ticket machine…' },
  { id:'rd3_2',  speaker:'B', japanese:'食べたいメニューのボタンを押してから、お金を入れてください。', romaji:'tabetai menyuu no botan wo oshite kara, okane wo irete kudasai', korean:'먹고 싶은 메뉴 버튼을 누른 다음 돈을 넣어 주세요.', english:'Press the button for what you want to eat, then put in your money.' },
  { id:'rd3_3',  speaker:'A', japanese:'醤油と塩、どちらがおすすめですか？', romaji:'shouyu to shio, dochira ga osusume desu ka', korean:'간장이랑 소금 중 어느 게 추천이에요?', english:'Which do you recommend, soy sauce or salt broth?' },
  { id:'rd3_4',  speaker:'B', japanese:'醤油が一番人気です。', romaji:'shouyu ga ichiban ninki desu', korean:'간장이 가장 인기 있어요.', english:'Soy sauce is the most popular.' },
  { id:'rd3_5',  speaker:'A', japanese:'じゃあ、醤油ラーメンにします。食券をどうぞ。', romaji:'jaa, shouyu raamen ni shimasu. shokken wo douzo', korean:'그럼 간장 라멘으로 할게요. 식권 여기요.', english:'Then I\'ll go with the soy sauce ramen. Here\'s my ticket.' },
  { id:'rd3_6',  speaker:'B', japanese:'カウンターへお座りください。麺の固さはいかがですか？', romaji:'kauntaa e osuwari kudasai. men no katasa wa ikaga desu ka', korean:'카운터에 앉으세요. 면 굳기는 어떻게 하시겠어요?', english:'Please have a seat at the counter. How would you like your noodles?' },
  { id:'rd3_7',  speaker:'A', japanese:'普通でお願いします。ネギは多めにできますか？', romaji:'futsuu de onegai shimasu. negi wa oome ni dekimasu ka', korean:'보통으로 해주세요. 파는 많이 넣어주실 수 있나요?', english:'Regular firmness, please. Can I get extra green onions?' },
  { id:'rd3_8',  speaker:'B', japanese:'かしこまりました。少々お待ちください。', romaji:'kashikomarimashita. shoushou omachi kudasai', korean:'알겠습니다. 잠시만요.', english:'Sure. Please wait a moment.' },
  { id:'rd3_9',  speaker:'A', japanese:'ごちそうさまでした！とてもおいしかったです。', romaji:'gochisousama deshita! totemo oishikatta desu', korean:'잘 먹었습니다! 정말 맛있었어요.', english:'That was great! It was really delicious.' },
  { id:'rd3_10', speaker:'B', japanese:'ありがとうございます！またお越しください。', romaji:'arigatou gozaimasu! mata okoshi kudasai', korean:'감사합니다! 또 오세요.', english:'Thank you! Please come again.' },

  // ── 처음 만남 변형 ②: 신칸센 안에서 ────────────────────
  { id:'dm2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 신칸센 안에서 — 옆 승객과 여행 이야기', english:'📍 On the Shinkansen — chatting with the passenger next to you' },
  { id:'dm2_1',  speaker:'A', japanese:'あのう、ここは15Aですか？', romaji:'anou, koko wa juugo ei desu ka', korean:'저기요, 여기가 15A인가요?', english:'Excuse me, is this seat 15A?' },
  { id:'dm2_2',  speaker:'B', japanese:'はい、そうです。どうぞお座りください。', romaji:'hai, sou desu. douzo osuwari kudasai', korean:'네, 맞아요. 앉으세요.', english:'Yes, that\'s right. Please, have a seat.' },
  { id:'dm2_3',  speaker:'A', japanese:'ありがとうございます。どちらへ行かれるんですか？', romaji:'arigatou gozaimasu. dochira e ikareru n desu ka', korean:'감사합니다. 어디 가시는 거예요?', english:'Thank you. Where are you headed?' },
  { id:'dm2_4',  speaker:'B', japanese:'京都まで行きます。観光ですか？', romaji:'kyouto made ikimasu. kankou desu ka', korean:'교토까지 가요. 관광이세요?', english:'I\'m going to Kyoto. Are you sightseeing?' },
  { id:'dm2_5',  speaker:'A', japanese:'ええ、初めてです。おすすめの場所はありますか？', romaji:'ee, hajimete desu. osusume no basho wa arimasu ka', korean:'네, 처음이에요. 추천하는 곳이 있나요?', english:'Yes, it\'s my first time. Are there any places you recommend?' },
  { id:'dm2_6',  speaker:'B', japanese:'金閣寺は絶対に行ってください！すごく綺麗ですよ。', romaji:'kinkakuji wa zettai ni itte kudasai! sugoku kirei desu yo', korean:'금각사는 꼭 가보세요! 정말 예뻐요.', english:'You have to visit Kinkaku-ji! It\'s absolutely gorgeous.' },
  { id:'dm2_7',  speaker:'A', japanese:'食べ物でおすすめはありますか？', romaji:'tabemono de osusume wa arimasu ka', korean:'음식으로 추천은요?', english:'Any food recommendations?' },
  { id:'dm2_8',  speaker:'B', japanese:'京都は湯豆腐が有名です。ぜひ食べてみてください。', romaji:'kyouto wa yudoufu ga yuumei desu. zehi tabete mite kudasai', korean:'교토는 유두부가 유명해요. 꼭 먹어보세요.', english:'Kyoto is famous for yudofu — hot tofu. You should definitely try it.' },
  { id:'dm2_9',  speaker:'A', japanese:'いいですね！楽しみになってきました。', romaji:'ii desu ne! tanoshimi ni natte kimashita', korean:'좋네요! 기대되기 시작했어요.', english:'That sounds wonderful! I\'m getting excited now.' },
  { id:'dm2_10', speaker:'B', japanese:'良い旅を！何か困ったら遠慮なく聞いてくださいね。', romaji:'yoi tabi wo! nanika komattara enryo naku kiite kudasai ne', korean:'좋은 여행 되세요! 곤란한 일 있으면 편하게 물어보세요.', english:'Have a great trip! Feel free to ask if you ever need help.' },
  { id:'dm2_11', speaker:'A', japanese:'ありがとうございます。おかげで安心しました！', romaji:'arigatou gozaimasu. okage de anshin shimashita', korean:'감사합니다. 덕분에 안심했어요!', english:'Thank you so much. I feel much more at ease now!' },

  // ── 처음 만남 변형 ③: 게스트하우스에서 ─────────────────
  { id:'dm3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 게스트하우스 라운지 — 여행자끼리 대화', english:'📍 Guesthouse lounge — chatting with fellow travelers' },
  { id:'dm3_1',  speaker:'B', japanese:'こんにちは！日本語が上手ですね。', romaji:'konnichiwa! nihongo ga jouzu desu ne', korean:'안녕하세요! 일본어 잘하시네요.', english:'Hi! Your Japanese is really good.' },
  { id:'dm3_2',  speaker:'A', japanese:'ありがとうございます。まだまだ勉強中です。', romaji:'arigatou gozaimasu. madamada benkyouchuu desu', korean:'감사합니다. 아직 공부 중이에요.', english:'Thank you. I\'m still studying.' },
  { id:'dm3_3',  speaker:'B', japanese:'どこから来ましたか？', romaji:'doko kara kimashita ka', korean:'어디서 오셨어요?', english:'Where are you from?' },
  { id:'dm3_4',  speaker:'A', japanese:'韓国から来ました。日本語を勉強して半年になります。', romaji:'kankoku kara kimashita. nihongo wo benkyou shite hantoshi ni narimasu', korean:'한국에서 왔어요. 일본어 공부한 지 반 년 됐어요.', english:'I\'m from Korea. I\'ve been studying Japanese for about six months.' },
  { id:'dm3_5',  speaker:'B', japanese:'すごい！日本はどこどこ行きましたか？', romaji:'sugoi! nihon wa doko doko ikimashita ka', korean:'대단해요! 일본 어디어디 가셨어요?', english:'Impressive! Where have you been in Japan?' },
  { id:'dm3_6',  speaker:'A', japanese:'東京と大阪に行きました。今日は奈良に行くつもりです。', romaji:'toukyou to oosaka ni ikimashita. kyou wa nara ni iku tsumori desu', korean:'도쿄랑 오사카에 갔어요. 오늘은 나라에 갈 생각이에요.', english:'I went to Tokyo and Osaka. Today I\'m planning to go to Nara.' },
  { id:'dm3_7',  speaker:'B', japanese:'奈良の鹿はかわいいですよ！鹿せんべいを買うといいですよ。', romaji:'nara no shika wa kawaii desu yo! shika senbei wo kau to ii desu yo', korean:'나라의 사슴은 귀여워요! 사슴 전병 사면 좋아요.', english:'The deer in Nara are so cute! You should buy deer crackers to feed them.' },
  { id:'dm3_8',  speaker:'A', japanese:'知りませんでした！ありがとうございます。', romaji:'shirimasen deshita! arigatou gozaimasu', korean:'몰랐어요! 감사해요.', english:'I didn\'t know that! Thank you.' },
  { id:'dm3_9',  speaker:'B', japanese:'夜はここで一緒に食事しませんか？', romaji:'yoru wa koko de issho ni shokuji shimasen ka', korean:'저녁에는 여기서 같이 밥 먹지 않겠어요?', english:'Would you like to have dinner together here tonight?' },
  { id:'dm3_10', speaker:'A', japanese:'ぜひ！楽しみにしています。', romaji:'zehi! tanoshimi ni shite imasu', korean:'꼭 그래요! 기대할게요.', english:'Absolutely! I\'m looking forward to it.' },

  // ── 편의점 변형 ②: 복사기 + 핫스낵 ─────────────────────
  { id:'kd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 — 복사기 사용 + 핫스낵 구매', english:'📍 Convenience store — using the copy machine and buying hot snacks' },
  { id:'kd2_1',  speaker:'A', japanese:'すみません、コピー機の使い方を教えていただけますか？', romaji:'sumimasen, kopii ki no tsukaikata wo oshiete itadakemasu ka', korean:'저기요, 복사기 사용법을 알려주실 수 있나요?', english:'Excuse me, could you show me how to use the copy machine?' },
  { id:'kd2_2',  speaker:'B', japanese:'はい。まずコインを入れてください。白黒1枚10円です。', romaji:'hai. mazu koin wo irete kudasai. shirokuro ichimai juuen desu', korean:'네. 먼저 동전을 넣어 주세요. 흑백 한 장에 10엔이에요.', english:'Sure. First put in the coins. Black and white is 10 yen per page.' },
  { id:'kd2_3',  speaker:'A', japanese:'ありがとうございます。ホットスナックはありますか？', romaji:'arigatou gozaimasu. hotto sunakku wa arimasu ka', korean:'감사합니다. 핫스낵이 있나요?', english:'Thank you. Do you have any hot snacks?' },
  { id:'kd2_4',  speaker:'B', japanese:'はい、レジ横にございます。今日はから揚げがおすすめです。', romaji:'hai, reji yoko ni gozaimasu. kyou wa karaage ga osusume desu', korean:'네, 계산대 옆에 있어요. 오늘은 닭튀김 추천이에요.', english:'Yes, they\'re next to the register. Today I recommend the fried chicken.' },
  { id:'kd2_5',  speaker:'A', japanese:'じゃあ、から揚げを二個ください。', romaji:'jaa, karaage wo niko kudasai', korean:'그럼 닭튀김 두 개 주세요.', english:'I\'ll take two pieces of fried chicken then.' },
  { id:'kd2_6',  speaker:'B', japanese:'少々お待ちください。温めますか？', romaji:'shoushou omachi kudasai. atatamemasu ka', korean:'잠시만요. 데울까요?', english:'One moment. Would you like it heated up?' },
  { id:'kd2_7',  speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁드려요.', english:'Yes please.' },
  { id:'kd2_8',  speaker:'B', japanese:'コピー代込みで350円になります。', romaji:'kopii dai komi de sanbyaku gojuuen ni narimasu', korean:'복사 비용 포함해서 350엔이에요.', english:'Including the copying, that\'s 350 yen.' },
  { id:'kd2_9',  speaker:'A', japanese:'Suicaで払います。ありがとうございました。', romaji:'suika de haraimasu. arigatou gozaimashita', korean:'스이카로 낼게요. 감사합니다.', english:'I\'ll pay with Suica. Thank you.' },
  { id:'kd2_10', speaker:'B', japanese:'ありがとうございました！またどうぞ。', romaji:'arigatou gozaimashita! mata douzo', korean:'감사합니다! 또 오세요.', english:'Thank you! Come again!' },

  // ── 편의점 변형 ③: 심야 공과금 납부 + 우산 ──────────────
  { id:'kd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점 (심야) — 공과금 납부 + 우산 구매', english:'📍 Convenience store (late night) — paying a utility bill and buying an umbrella' },
  { id:'kd3_1',  speaker:'A', japanese:'すみません、電気代の支払いはできますか？', romaji:'sumimasen, denkidai no shiharai wa dekimasu ka', korean:'저기요, 전기세 납부 할 수 있나요?', english:'Excuse me, can I pay my electricity bill here?' },
  { id:'kd3_2',  speaker:'B', japanese:'はい、払込票をお持ちでしたらできます。', romaji:'hai, haraikomi hyou wo omochi deshitara dekimasu', korean:'네, 납부서를 가지고 오셨으면 할 수 있어요.', english:'Yes, as long as you have the payment slip.' },
  { id:'kd3_3',  speaker:'A', japanese:'これです。お願いします。', romaji:'kore desu. onegai shimasu', korean:'이거요. 부탁드려요.', english:'Here it is. Please.' },
  { id:'kd3_4',  speaker:'B', japanese:'5,800円です。現金のみになります。', romaji:'gosen happyaku en desu. genkin nomi ni narimasu', korean:'5,800엔이에요. 현금만 가능해요.', english:'That\'s 5,800 yen. Cash only for this.' },
  { id:'kd3_5',  speaker:'A', japanese:'わかりました。あと、傘はありますか？', romaji:'wakarimashita. ato, kasa wa arimasu ka', korean:'알겠어요. 그리고 우산이 있나요?', english:'Got it. Also, do you have any umbrellas?' },
  { id:'kd3_6',  speaker:'B', japanese:'はい、入口の横にビニール傘がございます。500円です。', romaji:'hai, iriguchi no yoko ni biniru gasa ga gozaimasu. gohyaku en desu', korean:'네, 입구 옆에 비닐우산이 있어요. 500엔이에요.', english:'Yes, there are clear vinyl umbrellas next to the entrance. 500 yen.' },
  { id:'kd3_7',  speaker:'A', japanese:'一本ください。合計でいくらになりますか？', romaji:'ippon kudasai. goukei de ikura ni narimasu ka', korean:'한 개 주세요. 합계 얼마예요?', english:'One please. What\'s the total?' },
  { id:'kd3_8',  speaker:'B', japanese:'6,300円でございます。お釣りは200円です。', romaji:'rokusen sanbyaku en de gozaimasu. otsuri wa nihyaku en desu', korean:'6,300엔이에요. 거스름돈은 200엔이에요.', english:'6,300 yen. Your change is 200 yen.' },
  { id:'kd3_9',  speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'감사합니다.', english:'Thank you.' },
  { id:'kd3_10', speaker:'B', japanese:'お気をつけてどうぞ。', romaji:'okiotskete douzo', korean:'조심히 가세요.', english:'Take care on your way home.' },

  // ── 쇼핑 변형 ②: 전자제품 가게 ─────────────────────────
  { id:'sd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 전자제품 가게 — 이어폰 청음·보증·면세', english:'📍 Electronics store — listening demo, warranty, and tax-free shopping' },
  { id:'sd2_1',  speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？', romaji:'irasshaimase! nanika osagashi desu ka', korean:'어서 오세요! 찾으시는 게 있나요?', english:'Welcome! Can I help you find something?' },
  { id:'sd2_2',  speaker:'A', japanese:'ワイヤレスイヤホンを探しています。おすすめはありますか？', romaji:'waiyaresu iyahon wo sagashite imasu. osusume wa arimasu ka', korean:'무선 이어폰을 찾고 있어요. 추천 있나요?', english:'I\'m looking for wireless earbuds. Any recommendations?' },
  { id:'sd2_3',  speaker:'B', japanese:'こちらのモデルが今一番売れています。試聴もできますよ。', romaji:'kochira no moderu ga ima ichiban urete imasu. shichou mo dekimasu yo', korean:'이 모델이 지금 제일 잘 팔려요. 청음도 할 수 있어요.', english:'This model is our bestseller right now. You can try it out too.' },
  { id:'sd2_4',  speaker:'A', japanese:'試してもいいですか？', romaji:'tameshite mo ii desu ka', korean:'해봐도 되나요?', english:'May I try them?' },
  { id:'sd2_5',  speaker:'B', japanese:'もちろんです。こちらへどうぞ。', romaji:'mochiron desu. kochira e douzo', korean:'물론이죠. 이쪽으로 오세요.', english:'Of course. Right this way.' },
  { id:'sd2_6',  speaker:'A', japanese:'音がいいですね。保証は何年ですか？', romaji:'oto ga ii desu ne. hoshou wa nannen desu ka', korean:'음질이 좋네요. 보증은 몇 년이에요?', english:'The sound is great. How many years is the warranty?' },
  { id:'sd2_7',  speaker:'B', japanese:'一年保証です。延長保証もございます。', romaji:'ichinen hoshou desu. enchou hoshou mo gozaimasu', korean:'1년 보증이에요. 연장 보증도 있어요.', english:'It comes with a one-year warranty. We also offer extended coverage.' },
  { id:'sd2_8',  speaker:'A', japanese:'これにします。免税はできますか？', romaji:'kore ni shimasu. menzei wa dekimasu ka', korean:'이걸로 할게요. 면세 되나요?', english:'I\'ll take this one. Is it tax-free?' },
  { id:'sd2_9',  speaker:'B', japanese:'5,500円以上のお買い上げで免税対象です。パスポートをお願いします。', romaji:'gosen gohyaku en ijou no okaiage de menzei taishou desu. pasupooto wo onegai shimasu', korean:'5,500엔 이상 구매 시 면세 대상이에요. 여권 부탁드려요.', english:'Purchases over 5,500 yen qualify for tax-free. May I see your passport?' },
  { id:'sd2_10', speaker:'A', japanese:'はい、こちらです。クレジットカードで払えますか？', romaji:'hai, kochira desu. kurejitto kaado de haraemasu ka', korean:'네, 여기요. 신용카드로 낼 수 있나요?', english:'Here you go. Can I pay by credit card?' },
  { id:'sd2_11', speaker:'B', japanese:'はい、海外発行のカードも大丈夫ですよ。ありがとうございました！', romaji:'hai, kaigai hakkou no kaado mo daijoubu desu yo. arigatou gozaimashita', korean:'네, 해외 발행 카드도 괜찮아요. 감사합니다!', english:'Yes, overseas cards are fine too. Thank you!' },

  // ── 쇼핑 변형 ③: 기념품 가게 ───────────────────────────
  { id:'sd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 기념품 가게 — 선물 포장·기내 반입 확인', english:'📍 Souvenir shop — gift wrapping and carry-on rules' },
  { id:'sd3_1',  speaker:'B', japanese:'いらっしゃいませ！ご贈答用ですか？', romaji:'irasshaimase! gozoutou you desu ka', korean:'어서 오세요! 선물용이세요?', english:'Welcome! Are you looking for a gift?' },
  { id:'sd3_2',  speaker:'A', japanese:'はい、友達へのお土産を探しています。', romaji:'hai, tomodachi e no omiyage wo sagashite imasu', korean:'네, 친구한테 줄 기념품 찾고 있어요.', english:'Yes, I\'m looking for souvenirs for my friends.' },
  { id:'sd3_3',  speaker:'B', japanese:'こちらの和菓子セットが人気ですよ。5個入りで800円です。', romaji:'kochira no wagashi setto ga ninki desu yo. itsutsu iri de happyaku en desu', korean:'이쪽 화과자 세트가 인기 있어요. 5개 들이에 800엔이에요.', english:'This Japanese sweets set is popular. It comes with 5 pieces for 800 yen.' },
  { id:'sd3_4',  speaker:'A', japanese:'いいですね。三箱ください。ラッピングはできますか？', romaji:'ii desu ne. mihako kudasai. rappingu wa dekimasu ka', korean:'좋네요. 세 박스 주세요. 포장 되나요?', english:'That looks great. Three boxes please. Can you gift wrap them?' },
  { id:'sd3_5',  speaker:'B', japanese:'もちろんです。無料でラッピングいたします。', romaji:'mochiron desu. muryou de rappingu itashimasu', korean:'물론이죠. 무료로 포장해 드릴게요.', english:'Of course. We\'ll wrap them for free.' },
  { id:'sd3_6',  speaker:'A', japanese:'ありがとうございます。これ、飛行機に持ち込めますか？', romaji:'arigatou gozaimasu. kore, hikouki ni mochikomemasu ka', korean:'감사합니다. 이거 비행기에 가지고 탈 수 있나요?', english:'Thank you. Can I bring this on the plane?' },
  { id:'sd3_7',  speaker:'B', japanese:'液体でなければ手荷物に入れられます。こちらは大丈夫です。', romaji:'ekitai de nakereba tenimotsu ni ireraremasu. kochira wa daijoubu desu', korean:'액체가 아니면 기내 수하물에 넣을 수 있어요. 이건 괜찮아요.', english:'As long as it\'s not liquid, you can carry it on. This is fine.' },
  { id:'sd3_8',  speaker:'A', japanese:'よかったです。全部でいくらですか？', romaji:'yokatta desu. zenbu de ikura desu ka', korean:'다행이네요. 전부 얼마예요?', english:'That\'s a relief. How much is everything?' },
  { id:'sd3_9',  speaker:'B', japanese:'2,400円です。袋はご利用ですか？', romaji:'nisen yonhyaku en desu. fukuro wa goriyou desu ka', korean:'2,400엔이에요. 봉투 사용하시겠어요?', english:'2,400 yen. Would you like a bag?' },
  { id:'sd3_10', speaker:'A', japanese:'一枚だけください。カードで払います。', romaji:'ichimai dake kudasai. kaado de haraimasu', korean:'한 장만 주세요. 카드로 낼게요.', english:'Just one bag please. I\'ll pay by card.' },
  { id:'sd3_11', speaker:'B', japanese:'ありがとうございました！いい旅を！', romaji:'arigatou gozaimashita! ii tabi wo', korean:'감사합니다! 좋은 여행 되세요!', english:'Thank you! Have a great trip!' },

  // ── 택시 변형 ②: 공항으로 (시간 촉박) ───────────────────
  { id:'tx2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 앞 — 공항까지 시간이 촉박한 상황', english:'📍 In front of the hotel — rushing to the airport' },
  { id:'tx2_1',  speaker:'A', japanese:'すみません！成田空港までいくらかかりますか？', romaji:'sumimasen! narita kuukou made ikura kakarimasu ka', korean:'저기요! 나리타 공항까지 얼마나 걸려요?', english:'Excuse me! How much to Narita Airport?' },
  { id:'tx2_2',  speaker:'B', japanese:'大体8,000円ほどです。今は渋滞があるかもしれません。', romaji:'daitai hassen en hodo desu. ima wa juutai ga aru kamo shiremasen', korean:'대략 8,000엔 정도요. 지금 막힐 수도 있어요.', english:'About 8,000 yen. There might be traffic right now.' },
  { id:'tx2_3',  speaker:'A', japanese:'飛行機が2時間後なんですが、間に合いますか？', romaji:'hikouki ga nijikan ato nan desu ga, maniaemasu ka', korean:'비행기가 2시간 후인데, 제 시간에 맞출 수 있을까요?', english:'My flight is in 2 hours — can we make it?' },
  { id:'tx2_4',  speaker:'B', japanese:'高速を使えば大丈夫だと思います。急ぎましょう！', romaji:'kousoku wo tsukaeba daijoubu da to omoimasu. isogimasyou', korean:'고속도로 이용하면 괜찮을 것 같아요. 서두릅시다!', english:'I think we\'ll be fine if we take the highway. Let\'s hurry!' },
  { id:'tx2_5',  speaker:'A', japanese:'お願いします。できるだけ急いでください。', romaji:'onegai shimasu. dekiru dake isoide kudasai', korean:'부탁드려요. 최대한 빨리 가주세요.', english:'Please. As fast as you can.' },
  { id:'tx2_6',  speaker:'B', japanese:'第一ターミナルですか、第二ですか？', romaji:'dai ichi taaminaru desu ka, daini desu ka', korean:'1터미널이에요, 2터미널이에요?', english:'Terminal 1 or Terminal 2?' },
  { id:'tx2_7',  speaker:'A', japanese:'韓国エアラインなので第一です。', romaji:'kankoku earain nanode daichi desu', korean:'한국 항공사라서 1터미널이에요.', english:'It\'s a Korean airline so Terminal 1.' },
  { id:'tx2_8',  speaker:'B', japanese:'わかりました。出発ロビーの前で降ろしますね。', romaji:'wakarimashita. shuppatsu robii no mae de oroshimasu ne', korean:'알겠습니다. 출발 로비 앞에서 내려드릴게요.', english:'Got it. I\'ll drop you off in front of the departure lobby.' },
  { id:'tx2_9',  speaker:'A', japanese:'ありがとうございます。カードで払えますか？', romaji:'arigatou gozaimasu. kaado de haraemasu ka', korean:'감사합니다. 카드로 낼 수 있나요?', english:'Thank you. Can I pay by card?' },
  { id:'tx2_10', speaker:'B', japanese:'はい、到着したらお支払いください。もうすぐです！', romaji:'hai, touchaku shitara oshiharai kudasai. mousugu desu', korean:'네, 도착하면 결제해 주세요. 거의 다 왔어요!', english:'Yes, just pay when we arrive. Almost there!' },

  // ── 택시 변형 ③: 심야 이자카야 귀가 ─────────────────────
  { id:'tx3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야 앞 — 심야에 호텔로 귀가', english:'📍 In front of an izakaya — heading back to the hotel late at night' },
  { id:'tx3_1',  speaker:'A', japanese:'すみません、新宿プリンスホテルまでお願いします。', romaji:'sumimasen, shinjuku purinsu hoteru made onegai shimasu', korean:'저기요, 신주쿠 프린스 호텔까지 부탁드려요.', english:'Excuse me, to the Shinjuku Prince Hotel please.' },
  { id:'tx3_2',  speaker:'B', japanese:'かしこまりました。深夜料金になりますが、よろしいですか？', romaji:'kashikomarimashita. shinya ryoukin ni narimasu ga, yoroshii desu ka', korean:'알겠습니다. 심야 요금이 됩니다만, 괜찮으세요?', english:'Understood. Late-night rates apply — is that okay?' },
  { id:'tx3_3',  speaker:'A', japanese:'深夜料金とはどういう意味ですか？', romaji:'shinya ryoukin to wa dou iu imi desu ka', korean:'심야 요금이란 어떤 의미예요?', english:'What does late-night rate mean?' },
  { id:'tx3_4',  speaker:'B', japanese:'夜11時以降は2割増しになるんです。', romaji:'yoru juuichiji ikou wa niwari mashi ni naru n desu', korean:'밤 11시 이후는 20% 할증이 됩니다.', english:'After 11 PM there\'s a 20% surcharge.' },
  { id:'tx3_5',  speaker:'A', japanese:'わかりました。大体いくらになりますか？', romaji:'wakarimashita. daitai ikura ni narimasu ka', korean:'알겠어요. 대략 얼마나 되나요?', english:'I see. About how much will it be?' },
  { id:'tx3_6',  speaker:'B', japanese:'1,500円くらいだと思います。', romaji:'sen gohyaku en kurai da to omoimasu', korean:'1,500엔 정도 될 것 같아요.', english:'I\'d say around 1,500 yen.' },
  { id:'tx3_7',  speaker:'A', japanese:'ありがとうございます。今日は楽しかったです！', romaji:'arigatou gozaimasu. kyou wa tanoshikatta desu', korean:'감사합니다. 오늘 즐거웠어요!', english:'Thank you. I had a great time today!' },
  { id:'tx3_8',  speaker:'B', japanese:'よかったですね！日本旅行はいつまでですか？', romaji:'yokatta desu ne! nihon ryokou wa itsu made desu ka', korean:'다행이에요! 일본 여행은 언제까지예요?', english:'That\'s great! How long are you traveling in Japan?' },
  { id:'tx3_9',  speaker:'A', japanese:'明日が最終日です。またいつか来たいです。', romaji:'ashita ga saishuubi desu. mata itsuka kitai desu', korean:'내일이 마지막 날이에요. 언젠가 또 오고 싶어요.', english:'Tomorrow is my last day. I hope to come back someday.' },
  { id:'tx3_10', speaker:'B', japanese:'ぜひまたどうぞ！着きましたよ。1,480円です。', romaji:'zehi mata douzo! tsukimashita yo. sen yonhyaku hachijuu en desu', korean:'꼭 또 오세요! 도착했어요. 1,480엔이에요.', english:'Please do come again! We\'ve arrived. That\'s 1,480 yen.' },

  // ── 호텔 변형 ②: 체크인 + 방 문제 해결 ──────────────────
  { id:'hd2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크인 — 체크인 후 방 문제 해결', english:'📍 Hotel check-in — dealing with room issues after checking in' },
  { id:'hd2_1',  speaker:'A', japanese:'チェックインをお願いします。Park Seoyeonと申します。', romaji:'chekkuin wo onegai shimasu. Paaku Seoyeon to moushimasu', korean:'체크인 부탁드려요. 박서연이라고 합니다.', english:'I\'d like to check in. My name is Park Seoyeon.' },
  { id:'hd2_2',  speaker:'B', japanese:'ご予約確認いたしました。こちらが鍵になります。', romaji:'goyoyaku kakunin itashimashita. kochira ga kagi ni narimasu', korean:'예약 확인했어요. 이게 열쇠예요.', english:'I\'ve confirmed your reservation. Here is your key.' },
  { id:'hd2_3',  speaker:'A', japanese:'ありがとうございます。部屋に入ったら、エアコンが壊れていました。', romaji:'arigatou gozaimasu. heya ni haittara, eakon ga kowarete imashita', korean:'감사합니다. 방에 들어갔더니 에어컨이 고장났어요.', english:'Thank you. When I got to the room, the air conditioning was broken.' },
  { id:'hd2_4',  speaker:'B', japanese:'大変申し訳ございません。すぐに確認いたします。', romaji:'taihen moushiwake gozaimasen. sugu ni kakunin itashimasu', korean:'대단히 죄송합니다. 바로 확인해 드릴게요.', english:'We sincerely apologize. We\'ll check on that right away.' },
  { id:'hd2_5',  speaker:'A', japanese:'お湯も出ないんですが…', romaji:'oyu mo denai n desu ga', korean:'뜨거운 물도 안 나오는데요…', english:'And there\'s no hot water either…' },
  { id:'hd2_6',  speaker:'B', japanese:'重ねてお詫び申し上げます。別のお部屋にご案内できますか？', romaji:'kasanete owabi moushiagemasu. betsu no oheya ni goannai dekimasu ka', korean:'거듭 사과드립니다. 다른 방으로 안내해 드릴 수 있을까요?', english:'We\'re so sorry for the trouble. May we move you to a different room?' },
  { id:'hd2_7',  speaker:'A', japanese:'はい、お願いします。同じ料金で大丈夫ですか？', romaji:'hai, onegai shimasu. onaji ryoukin de daijoubu desu ka', korean:'네, 부탁드려요. 같은 가격으로 괜찮나요?', english:'Yes please. Will it be at the same price?' },
  { id:'hd2_8',  speaker:'B', japanese:'もちろんです。ご不便をおかけした分、朝食を無料でご提供します。', romaji:'mochiron desu. gofuben wo okake shita bun, choushoku wo muryou de goteikyo shimasu', korean:'물론이죠. 불편을 드린 만큼 조식을 무료로 제공해 드릴게요.', english:'Of course. As an apology for the inconvenience, we\'ll include breakfast for free.' },
  { id:'hd2_9',  speaker:'A', japanese:'ありがとうございます。助かります。', romaji:'arigatou gozaimasu. tasukarimasu', korean:'감사합니다. 덕분에 살았어요.', english:'Thank you, that\'s really helpful.' },
  { id:'hd2_10', speaker:'B', japanese:'お荷物はお持ちしますか？', romaji:'onimotsu wa omochi shimasu ka', korean:'짐은 들어드릴까요?', english:'Can I carry your luggage for you?' },
  { id:'hd2_11', speaker:'A', japanese:'いいえ、大丈夫です。ありがとうございました。', romaji:'iie, daijoubu desu. arigatou gozaimashita', korean:'아니요, 괜찮아요. 감사합니다.', english:'No, I\'m fine. Thank you.' },

  // ── 호텔 변형 ③: 체크인 + 주변 맛집 추천 ────────────────
  { id:'hd3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 체크인 — 주변 식당 · 조식 정보 확인', english:'📍 Hotel check-in — asking about nearby restaurants & breakfast info' },
  { id:'hd3_1',  speaker:'A', japanese:'チェックインをお願いします。Choi Minwooと申します。', romaji:'chekkuin wo onegai shimasu. Choi Minwoo to moushimasu', korean:'체크인 부탁드려요. 최민우라고 합니다.', english:'I\'d like to check in. My name is Choi Minwoo.' },
  { id:'hd3_2',  speaker:'B', japanese:'いらっしゃいませ！予約確認できました。', romaji:'irasshaimase! yoyaku kakunin dekimashita', korean:'어서 오세요! 예약 확인됐어요.', english:'Welcome! I\'ve confirmed your reservation.' },
  { id:'hd3_3',  speaker:'A', japanese:'ありがとうございます。この辺でおすすめの食べ物屋さんはありますか？', romaji:'arigatou gozaimasu. kono hen de osusume no tabemonoya san wa arimasu ka', korean:'감사합니다. 이 근처에 추천하는 음식점이 있나요?', english:'Thank you. Are there any restaurants nearby you\'d recommend?' },
  { id:'hd3_4',  speaker:'B', japanese:'そうですね、徒歩3分のところに有名なラーメン屋があります。', romaji:'sou desu ne, toho sanpun no tokoro ni yuumei na raamen ya ga arimasu', korean:'음, 도보 3분 거리에 유명한 라멘 가게가 있어요.', english:'Let\'s see — there\'s a popular ramen place about a 3-minute walk away.' },
  { id:'hd3_5',  speaker:'A', japanese:'何時まで開いていますか？', romaji:'nanji made aite imasu ka', korean:'몇 시까지 열어요?', english:'What time are they open until?' },
  { id:'hd3_6',  speaker:'B', japanese:'夜11時まです。混むので早めに行かれたほうがいいですよ。', romaji:'yoru juuichiji made desu. komu node hayame ni ikareta hou ga ii desu yo', korean:'밤 11시까지예요. 붐비니까 일찍 가시는 게 좋아요.', english:'Until 11 PM. It gets crowded, so you\'d better go early.' },
  { id:'hd3_7',  speaker:'A', japanese:'わかりました。朝食の場所も教えてください。', romaji:'wakarimashita. choushoku no basho mo oshiete kudasai', korean:'알겠어요. 조식 장소도 알려주세요.', english:'Got it. Could you also tell me where breakfast is?' },
  { id:'hd3_8',  speaker:'B', japanese:'2階のレストランで、7時から10時まです。ビュッフェスタイルです。', romaji:'nikai no resutoran de, shichiji kara juuji made desu. byuffe sutairu desu', korean:'2층 레스토랑에서 7시부터 10시까지예요. 뷔페 형식이에요.', english:'It\'s in the 2nd floor restaurant, from 7 to 10 AM. It\'s a buffet.' },
  { id:'hd3_9',  speaker:'A', japanese:'いいですね！チェックアウトは何時ですか？', romaji:'ii desu ne! chekkuauto wa nanji desu ka', korean:'좋네요! 체크아웃은 몇 시예요?', english:'That\'s great! What time is checkout?' },
  { id:'hd3_10', speaker:'B', japanese:'11時です。ご不明な点があればいつでもフロントへ。', romaji:'juuichiji desu. gomei na ten ga areba itsudemo furonto e', korean:'11시예요. 궁금한 점이 있으면 언제든지 프런트로.', english:'11 AM. Feel free to come to the front desk anytime if you have questions.' },
  { id:'hd3_11', speaker:'A', japanese:'とても助かりました。ありがとうございます。', romaji:'totemo tasukarimashita. arigatou gozaimasu', korean:'정말 도움이 됐어요. 감사합니다.', english:'That was really helpful. Thank you!' },

  // ══════════════════════════════════════════════════════════
  //  추가 카테고리 — 카페 · 약국·병원 · 지하철
  // ══════════════════════════════════════════════════════════

  // ── 카페 변형 ①: 일반 카페 ─────────────────────────────
  { id:'cf_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 일반 카페 — 커피·케이크 주문', english:'📍 Regular café — ordering coffee & cake' },
  { id:'cf_1',   speaker:'B', japanese:'いらっしゃいませ！ご注文はお決まりですか？',         romaji:'irasshaimase! gochuumon wa okimari desu ka',        korean:'어서 오세요! 주문 정하셨나요?', english:'Welcome! Are you ready to order?' },
  { id:'cf_2',   speaker:'A', japanese:'アメリカーノを一つください。',                       romaji:'amerikaano wo hitotsu kudasai',                     korean:'아메리카노 하나 주세요.', english:'One Americano, please.' },
  { id:'cf_3',   speaker:'B', japanese:'ホットとアイス、どちらになさいますか？',              romaji:'hotto to aisu, dochira ni nasaimasu ka',            korean:'핫이요 아이스, 어떤 걸로 하시겠어요?', english:'Would you like it hot or iced?' },
  { id:'cf_4',   speaker:'A', japanese:'ホットでお願いします。チーズケーキもください。',       romaji:'hotto de onegai shimasu. chiizukeeki mo kudasai',   korean:'핫으로 주세요. 치즈케이크도 주세요.', english:'Hot, please. I\'ll have a slice of cheesecake too.' },
  { id:'cf_5',   speaker:'B', japanese:'お名前をお伺いできますか？',                         romaji:'onamae wo oukagai dekimasu ka',                     korean:'성함을 알 수 있을까요?', english:'Could I get your name?' },
  { id:'cf_6',   speaker:'A', japanese:'「{F}」です。',                                  romaji:'{F} desu',                                       korean:'「{F}」이에요.', english:'It\'s {F}.' },
  { id:'cf_7',   speaker:'B', japanese:'{F}さん、全部で980円になります。',                 romaji:'{F} san, zenbu de kyuuhyaku hachijuu en ni narimasu', korean:'{F}씨, 전부 980엔이에요.', english:'{F}, that\'ll be 980 yen in total.' },
  { id:'cf_8',   speaker:'A', japanese:'PayPayで払えますか？',                              romaji:'peipei de haraemasu ka',                           korean:'페이페이로 결제할 수 있나요?', english:'Can I pay with PayPay?' },
  { id:'cf_9',   speaker:'B', japanese:'はい、こちらにかざしてください。',                   romaji:'hai, kochira ni kazashite kudasai',                 korean:'네, 여기에 갖다 대세요.', english:'Yes, please hold it over here.' },
  { id:'cf_10',  speaker:'A', japanese:'ありがとうございます。',                             romaji:'arigatou gozaimasu',                               korean:'감사합니다.', english:'Thank you.' },

  // ── 카페 변형 ②: 스타벅스풍 커스텀 주문 ───────────────
  { id:'cf2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 스타벅스풍 카페 — 사이즈·옵션 커스텀', english:'📍 Starbucks-style café — customizing size & options' },
  { id:'cf2_1',  speaker:'B', japanese:'いらっしゃいませ！何になさいますか？',               romaji:'irasshaimase! nani ni nasaimasu ka',                korean:'어서 오세요! 무엇으로 드릴까요?', english:'Welcome! What can I get you?' },
  { id:'cf2_2',  speaker:'A', japanese:'キャラメルラテをください。',                         romaji:'kyarameru raate wo kudasai',                        korean:'카라멜 라떼 주세요.', english:'A caramel latte, please.' },
  { id:'cf2_3',  speaker:'B', japanese:'サイズはいかがですか？ショート・トール・グランデ・ベンティがあります。', romaji:'saizu wa ikaga desu ka? shooto tooru gurande benti ga arimasu', korean:'사이즈는요? 쇼트·톨·그란데·벤티가 있어요.', english:'What size? We have Short, Tall, Grande, and Venti.' },
  { id:'cf2_4',  speaker:'A', japanese:'トールでお願いします。砂糖は少なめで。',              romaji:'tooru de onegai shimasu. satou wa sukuname de',     korean:'톨로 주세요. 설탕은 적게요.', english:'Tall, please. Less sugar.' },
  { id:'cf2_5',  speaker:'B', japanese:'豆乳に変更もできますよ。',                           romaji:'tounyuu ni henkou mo dekimasu yo',                  korean:'두유로 변경도 가능해요.', english:'We can also swap to soy milk.' },
  { id:'cf2_6',  speaker:'A', japanese:'じゃあ豆乳でお願いします。ホイップも抜いてください。', romaji:'jaa tounyuu de onegai shimasu. hoippu mo nuite kudasai', korean:'그럼 두유로요. 휘핑크림도 빼주세요.', english:'Then soy milk, please. And no whipped cream.' },
  { id:'cf2_7',  speaker:'B', japanese:'かしこまりました。こちらでお召し上がりですか？',      romaji:'kashikomarimashita. kochira de omeshiagari desu ka', korean:'알겠습니다. 매장에서 드시나요?', english:'Got it. Will you be having it here?' },
  { id:'cf2_8',  speaker:'A', japanese:'テイクアウトでお願いします。',                       romaji:'teiku auto de onegai shimasu',                      korean:'테이크아웃으로 주세요.', english:'To go, please.' },
  { id:'cf2_9',  speaker:'B', japanese:'610円です。ポイントカードはお持ちですか？',            romaji:'roppyaku juu en desu. pointo kaado wa omochi desu ka', korean:'610엔이에요. 포인트 카드 있으세요?', english:'That\'s 610 yen. Do you have a points card?' },
  { id:'cf2_10', speaker:'A', japanese:'いいえ、ないです。カードでお願いします。',            romaji:'iie, nai desu. kaado de onegai shimasu',            korean:'아니요, 없어요. 카드로 할게요.', english:'No, I don\'t. I\'ll pay by card.' },

  // ── 카페 변형 ③: 전통 찻집 ────────────────────────────
  { id:'cf3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 전통 찻집 — 말차·화과자 주문', english:'📍 Traditional tea house — ordering matcha & Japanese sweets' },
  { id:'cf3_1',  speaker:'B', japanese:'ようこそおいでくださいました。おひとりでございますか？', romaji:'youkoso oide kudasaimashita. ohitori de gozaimasu ka', korean:'어서 오세요. 혼자이신가요?', english:'Welcome. Will you be dining alone today?' },
  { id:'cf3_2',  speaker:'A', japanese:'はい。抹茶をいただけますか？',                       romaji:'hai. maccha wo itadakemasu ka',                     korean:'네. 말차를 마실 수 있나요?', english:'Yes. Could I have some matcha?' },
  { id:'cf3_3',  speaker:'B', japanese:'抹茶セット（和菓子付き）はいかがでしょうか？',         romaji:'maccha setto (wagashi tsuki) wa ikaga deshou ka',   korean:'말차 세트 (화과자 포함)는 어떠세요?', english:'How about the matcha set, which comes with Japanese sweets?' },
  { id:'cf3_4',  speaker:'A', japanese:'それをください。甘いお菓子ですか？',                  romaji:'sore wo kudasai. amai okashi desu ka',              korean:'그걸로 주세요. 달콤한 과자인가요?', english:'I\'ll have that. Are the sweets sweet?' },
  { id:'cf3_5',  speaker:'B', japanese:'季節の上生菓子です。今日はさくらもちです。',           romaji:'kisetsu no jyounamagashi desu. kyou wa sakuramochi desu', korean:'계절 생과자예요. 오늘은 사쿠라모치예요.', english:'They\'re seasonal fresh wagashi. Today\'s is sakura mochi.' },
  { id:'cf3_6',  speaker:'A', japanese:'いいですね！お湯は熱いですか？',                     romaji:'ii desu ne! oyu wa atsui desu ka',                  korean:'좋네요! 물은 뜨거운가요?', english:'Lovely! Is the water very hot?' },
  { id:'cf3_7',  speaker:'B', japanese:'80度ほどのお湯でお出しします。少し苦みがありますよ。',  romaji:'hachijuu do hodo no oyu de odashi shimasu. sukoshi nigami ga arimasu yo', korean:'약 80도 물로 드려요. 약간 쌉쌀해요.', english:'We brew it at about 80°C. It has a slight bitterness.' },
  { id:'cf3_8',  speaker:'A', japanese:'ゆっくり楽しみます。雰囲気がいいですね。',             romaji:'yukkuri tanoshimimasu. fun iki ga ii desu ne',       korean:'천천히 즐길게요. 분위기 좋네요.', english:'I\'ll take my time and enjoy it. The atmosphere is really nice.' },
  { id:'cf3_9',  speaker:'B', japanese:'ありがとうございます。1,200円になります。',            romaji:'arigatou gozaimasu. sen nihyaku en ni narimasu',    korean:'감사합니다. 1,200엔이에요.', english:'Thank you. That\'ll be 1,200 yen.' },
  { id:'cf3_10', speaker:'A', japanese:'現金でお願いします。とても美味しかったです！',          romaji:'genkin de onegai shimasu. totemo oishikatta desu',  korean:'현금으로 주세요. 정말 맛있었어요!', english:'Cash, please. It was absolutely delicious!' },

  // ── 약국 변형 ①: 일반 약국 (감기) ─────────────────────
  { id:'pk_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 일본 약국 — 감기 증상으로 약 구입', english:'📍 Japanese pharmacy — buying cold medicine' },
  { id:'pk_1',   speaker:'A', japanese:'すみません、風邪薬はありますか？',                   romaji:'sumimasen, kazegusuri wa arimasu ka',               korean:'저기요, 감기약 있나요?', english:'Excuse me, do you have cold medicine?' },
  { id:'pk_2',   speaker:'B', japanese:'はい。どんな症状ですか？',                           romaji:'hai. donna shoujou desu ka',                        korean:'네. 어떤 증상이에요?', english:'Yes. What are your symptoms?' },
  { id:'pk_3',   speaker:'A', japanese:'のどが痛くて、鼻水が出ます。熱はないです。',           romaji:'nodo ga itakute, hanamizu ga demasu. netsu wa nai desu', korean:'목이 아프고 콧물이 나요. 열은 없어요.', english:'My throat hurts and I have a runny nose. No fever.' },
  { id:'pk_4',   speaker:'B', japanese:'このPL顆粒がよく効きますよ。',                       romaji:'kono PL karyuu ga yoku kikimasu yo',                korean:'이 PL 과립이 잘 들어요.', english:'These PL granules work really well.' },
  { id:'pk_5',   speaker:'A', japanese:'一日何回飲みますか？',                               romaji:'ichinichi nankai nomimasu ka',                      korean:'하루에 몇 번 먹나요?', english:'How many times a day do I take it?' },
  { id:'pk_6',   speaker:'B', japanese:'一日3回、食後に飲んでください。',                     romaji:'ichinichi sankai, shokugo ni nonde kudasai',        korean:'하루 3번, 식후에 드세요.', english:'Three times a day, after meals.' },
  { id:'pk_7',   speaker:'A', japanese:'子供も飲めますか？8歳です。',                         romaji:'kodomo mo nomemasu ka? hachisai desu',              korean:'아이도 먹을 수 있나요? 8살이에요.', english:'Can my child take it too? They\'re 8 years old.' },
  { id:'pk_8',   speaker:'B', japanese:'こちらの小児用をお使いください。580円です。',           romaji:'kochira no shouniiyou wo otsukai kudasai. gohyaku hachijuu en desu', korean:'이 소아용을 쓰세요. 580엔이에요.', english:'Please use this children\'s version. It\'s 580 yen.' },
  { id:'pk_9',   speaker:'A', japanese:'クレジットカードは使えますか？',                      romaji:'kurejitto kaado wa tsukaemasu ka',                  korean:'신용카드 사용할 수 있나요?', english:'Can I pay by credit card?' },
  { id:'pk_10',  speaker:'B', japanese:'もちろんです。こちらへどうぞ。',                      romaji:'mochiron desu. kochira e douzo',                    korean:'물론이죠. 이쪽으로 오세요.', english:'Of course. Right this way.' },

  // ── 약국·병원 변형 ②: 내과 진찰 ─────────────────────
  { id:'hp_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 내과 — 복통으로 진찰 받기', english:'📍 Internal medicine clinic — seeing a doctor for a stomachache' },
  { id:'hp_1',   speaker:'A', japanese:'今日、診てもらえますか？お腹が痛くて…',               romaji:'kyou, mite moraemasu ka? onaka ga itakute',         korean:'오늘 진찰받을 수 있을까요? 배가 아파서요…', english:'Can I see a doctor today? My stomach hurts…' },
  { id:'hp_2',   speaker:'B', japanese:'はい。保険証はお持ちですか？',                        romaji:'hai. hokenshou wa omochi desu ka',                  korean:'네. 보험증 가지고 계세요?', english:'Yes. Do you have your health insurance card?' },
  { id:'hp_3',   speaker:'A', japanese:'いいえ、外国人です。',                               romaji:'iie, gaikokujin desu',                             korean:'아니요, 외국인이에요.', english:'No, I\'m a foreigner.' },
  { id:'hp_4',   speaker:'B', japanese:'わかりました。こちらの問診票を記入してください。',       romaji:'wakarimashita. kochira no monshinkyou wo kinyuu shite kudasai', korean:'알겠어요. 이 진찰 설문지를 작성해 주세요.', english:'I see. Please fill out this patient form.' },
  { id:'hp_5',   speaker:'A', japanese:'昨日の夜からずっと痛いです。',                        romaji:'kinou no yoru kara zutto itai desu',                korean:'어젯밤부터 계속 아파요.', english:'It\'s been hurting since last night.' },
  { id:'hp_6',   speaker:'B', japanese:'お腹のどこが痛いですか？',                            romaji:'onaka no doko ga itai desu ka',                     korean:'배 어디가 아파요?', english:'Where exactly does your stomach hurt?' },
  { id:'hp_7',   speaker:'A', japanese:'ここが特に痛いです。（お腹を指しながら）',             romaji:'koko ga tokuni itai desu. (onaka wo sashingara)',   korean:'여기가 특히 아파요. (배를 가리키며)', english:'It especially hurts here. (pointing to stomach)' },
  { id:'hp_8',   speaker:'B', japanese:'食欲はありますか？',                                 romaji:'shokuyoku wa arimasu ka',                           korean:'식욕은 있나요?', english:'Do you have any appetite?' },
  { id:'hp_9',   speaker:'A', japanese:'ほとんどないです。気持ち悪いです。',                   romaji:'hotondo nai desu. kimochi warui desu',              korean:'거의 없어요. 메스꺼워요.', english:'Hardly any. I feel nauseous.' },
  { id:'hp_10',  speaker:'B', japanese:'胃炎の可能性があります。薬を出しますね。お大事に。',    romaji:'ien no kanousei ga arimasu. kusuri wo dashimasu ne. odaiji ni', korean:'위염 가능성이 있어요. 약을 처방할게요. 쾌유 바랍니다.', english:'It might be gastritis. I\'ll prescribe some medicine. Take care.' },

  // ── 약국·병원 변형 ③: 치과 응급 ─────────────────────
  { id:'dk_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 치과 — 치통 응급 방문', english:'📍 Dentist — emergency visit for a toothache' },
  { id:'dk_1',   speaker:'A', japanese:'予約なしでも診てもらえますか？歯が痛くて…',            romaji:'yoyaku nashi demo mite moraemasu ka? ha ga itakute', korean:'예약 없이도 진찰받을 수 있나요? 이가 아파서요…', english:'Can I see the dentist without an appointment? I have a toothache…' },
  { id:'dk_2',   speaker:'B', japanese:'はい。少しお待ちください。どの歯ですか？',              romaji:'hai. sukoshi omachi kudasai. dono ha desu ka',      korean:'네. 잠시 기다려 주세요. 어떤 이예요?', english:'Yes. Please wait a moment. Which tooth is it?' },
  { id:'dk_3',   speaker:'A', japanese:'右の奥歯です。昨日から激しく痛いです。',               romaji:'migi no okuba desu. kinou kara hageshiku itai desu', korean:'오른쪽 어금니요. 어제부터 심하게 아파요.', english:'My upper right molar. It\'s been hurting badly since yesterday.' },
  { id:'dk_4',   speaker:'B', japanese:'レントゲンを撮りましょう。',                          romaji:'rentogen wo torimashou',                            korean:'엑스레이 찍어볼게요.', english:'Let\'s take an X-ray.' },
  { id:'dk_5',   speaker:'A', japanese:'痛み止めは飲んでいいですか？',                        romaji:'itamidome wa nonde ii desu ka',                     korean:'진통제 먹어도 되나요?', english:'Is it okay to take a painkiller?' },
  { id:'dk_6',   speaker:'B', japanese:'飲んで構いません。虫歯が1本あります。',                romaji:'nonde kamaimasen. mushiba ga ippon arimasu',        korean:'드셔도 돼요. 충치가 하나 있어요.', english:'That\'s fine. You have one cavity.' },
  { id:'dk_7',   speaker:'A', japanese:'治療はすぐできますか？',                              romaji:'chiryou wa sugu dekimasu ka',                       korean:'치료를 바로 할 수 있나요?', english:'Can you treat it right away?' },
  { id:'dk_8',   speaker:'B', japanese:'今日は応急処置だけです。次回予約をお取りください。',     romaji:'kyou wa oukyuushochi dake desu. jikai yoyaku wo otori kudasai', korean:'오늘은 응급처치만요. 다음 예약을 잡아 주세요.', english:'Today we can only do emergency treatment. Please make a follow-up appointment.' },
  { id:'dk_9',   speaker:'A', japanese:'わかりました。費用はいくらですか？',                   romaji:'wakarimashita. hiyou wa ikura desu ka',             korean:'알겠어요. 비용은 얼마예요?', english:'I understand. How much will it cost?' },
  { id:'dk_10',  speaker:'B', japanese:'自費診療で3,500円です。カードも使えます。',             romaji:'jihishinryou de sanzen gohyaku en desu. kaado mo tsukaemasu', korean:'자비 진료로 3,500엔이에요. 카드도 사용 가능해요.', english:'It\'s 3,500 yen as a self-pay patient. Cards are accepted too.' },

  // ── 지하철 변형 ①: 방향·노선 문의 ─────────────────────
  { id:'sub_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 지하철역 — 노선·표 구입 안내', english:'📍 Subway station — asking about routes & buying tickets' },
  { id:'sub_1',   speaker:'A', japanese:'すみません、新宿へ行きたいんですが、どの電車ですか？', romaji:'sumimasen, shinjuku e ikitai n desu ga, dono densha desu ka', korean:'저기요, 신주쿠에 가고 싶은데 어떤 전철인가요?', english:'Excuse me, I want to get to Shinjuku — which train should I take?' },
  { id:'sub_2',   speaker:'B', japanese:'山手線で行けますよ。ホームはこちらです。',             romaji:'yamanote sen de ikemasu yo. hoomu wa kochira desu', korean:'야마노테선으로 갈 수 있어요. 승강장은 이쪽이에요.', english:'You can take the Yamanote Line. The platform is this way.' },
  { id:'sub_3',   speaker:'A', japanese:'何分ぐらいかかりますか？',                            romaji:'nanpun gurai kakarimasu ka',                        korean:'몇 분 정도 걸려요?', english:'About how long will it take?' },
  { id:'sub_4',   speaker:'B', japanese:'だいたい15分ですよ。急行に乗るともっと早いです。',     romaji:'daitai juugofun desu yo. kyuukou ni noru to motto hayai desu', korean:'대략 15분이에요. 급행을 타면 더 빨라요.', english:'About 15 minutes. It\'s faster if you take the express.' },
  { id:'sub_5',   speaker:'A', japanese:'切符はどこで買えますか？',                            romaji:'kippu wa doko de kaemasu ka',                       korean:'표는 어디서 살 수 있나요?', english:'Where can I buy a ticket?' },
  { id:'sub_6',   speaker:'B', japanese:'あちらの券売機で。SuicaかPASMOが便利ですよ。',        romaji:'achira no kenbaiki de. suika ka pasmo ga benri desu yo', korean:'저쪽 자동발매기에서요. 스이카나 파스모가 편해요.', english:'At the ticket machine over there. A Suica or PASMO card is very convenient.' },
  { id:'sub_7',   speaker:'A', japanese:'乗り越しの場合はどうしますか？',                      romaji:'norikoshi no baai wa dou shimasu ka',               korean:'초과 승차한 경우는 어떻게 해요?', english:'What do I do if I go past my stop?' },
  { id:'sub_8',   speaker:'B', japanese:'精算機で差額を払ってください。',                       romaji:'seisanki de sagaku wo haratte kudasai',             korean:'정산기에서 차액을 내세요.', english:'Pay the difference at the fare adjustment machine.' },
  { id:'sub_9',   speaker:'A', japanese:'ありがとうございます。助かりました！',                 romaji:'arigatou gozaimasu. tasukarimashita',               korean:'감사합니다. 살았어요!', english:'Thank you so much! You\'re a lifesaver!' },
  { id:'sub_10',  speaker:'B', japanese:'お気をつけて！',                                     romaji:'oki wo tsukete',                                    korean:'조심히 가세요!', english:'Take care!' },

  // ── 지하철 변형 ②: 환승·막차·1일권 ────────────────────
  { id:'sub2_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 지하철 — 환승·막차·1일권 문의', english:'📍 Subway — asking about transfers, last train & day pass' },
  { id:'sub2_1',  speaker:'A', japanese:'渋谷に行くには、どこで乗り換えればいいですか？',       romaji:'shibuya ni iku ni wa, doko de norikaereba ii desu ka', korean:'시부야에 가려면 어디서 갈아타야 해요?', english:'Where do I transfer to get to Shibuya?' },
  { id:'sub2_2',  speaker:'B', japanese:'次の駅で銀座線に乗り換えてください。',                 romaji:'tsugi no eki de ginzasen ni norikaetemite kudasai', korean:'다음 역에서 긴자선으로 갈아타세요.', english:'Transfer to the Ginza Line at the next station.' },
  { id:'sub2_3',  speaker:'A', japanese:'終電は何時ですか？',                                  romaji:'shuuden wa nanji desu ka',                          korean:'막차는 몇 시예요?', english:'What time is the last train?' },
  { id:'sub2_4',  speaker:'B', japanese:'この路線は0時15分が最終です。',                       romaji:'kono rosen wa reiji juugofun ga saishuu desu',      korean:'이 노선은 0시 15분이 막차예요.', english:'The last train on this line is at 12:15 AM.' },
  { id:'sub2_5',  speaker:'A', japanese:'一日乗車券はありますか？',                            romaji:'ichinichi joushaken wa arimasu ka',                 korean:'1일권이 있나요?', english:'Is there a day pass?' },
  { id:'sub2_6',  speaker:'B', japanese:'はい、600円で一日何度でも乗れます。',                  romaji:'hai, roppyaku en de ichinichi nandodemo noremasu',  korean:'네, 600엔에 하루에 몇 번이든 탈 수 있어요.', english:'Yes, for 600 yen you can ride as many times as you like in a day.' },
  { id:'sub2_7',  speaker:'A', japanese:'今日は観光なので一日乗車券にします。',                 romaji:'kyou wa kankou nanode ichinichi joushaken ni shimasu', korean:'오늘은 관광이라 1일권으로 할게요.', english:'I\'m sightseeing today, so I\'ll get the day pass.' },
  { id:'sub2_8',  speaker:'B', japanese:'窓口またはアプリでも購入できます。',                   romaji:'madoguchi mata wa apuri demo kounyuu dekimasu',     korean:'창구나 앱에서도 살 수 있어요.', english:'You can also buy it at the ticket window or through the app.' },
  { id:'sub2_9',  speaker:'A', japanese:'ありがとうございます。迷ったらまた聞きますね！',        romaji:'arigatou gozaimasu. mayottara mata kikimasu ne',    korean:'감사해요. 헷갈리면 또 물어볼게요!', english:'Thank you! I\'ll ask again if I get confused!' },
  { id:'sub2_10', speaker:'B', japanese:'どうぞ！良い旅を。',                                  romaji:'douzo! yoi tabi wo',                                korean:'그러세요! 좋은 여행 되세요.', english:'Sure! Have a great trip.' },

  // ── 지하철 변형 ③: 역 구내 길 안내 ─────────────────────
  { id:'sub3_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 구내 — 출구·로커·화장실 안내', english:'📍 Inside the station — finding exits, lockers & restrooms' },
  { id:'sub3_1',  speaker:'A', japanese:'すみません、A出口はどこですか？',                     romaji:'sumimasen, A deguchi wa doko desu ka',              korean:'저기요, A 출구가 어디예요?', english:'Excuse me, where is Exit A?' },
  { id:'sub3_2',  speaker:'B', japanese:'地下2階の階段を降りた右側です。',                      romaji:'chika nikai no kaidan wo kudatta migigawa desu',    korean:'지하 2층 계단 내려오면 오른쪽이에요.', english:'Go down the stairs to basement level 2 and it\'s on the right.' },
  { id:'sub3_3',  speaker:'A', japanese:'エレベーターはありますか？',                           romaji:'erebeetaa wa arimasu ka',                           korean:'엘리베이터가 있나요?', english:'Is there an elevator?' },
  { id:'sub3_4',  speaker:'B', japanese:'あちらに1台あります。混んでいるかもしれません。',       romaji:'achira ni ichidai arimasu. konde iru kamo shiremasen', korean:'저쪽에 1대 있어요. 붐빌 수도 있어요.', english:'There\'s one over there. It might be crowded though.' },
  { id:'sub3_5',  speaker:'A', japanese:'コインロッカーはどこにありますか？',                   romaji:'koin rokkaa wa doko ni arimasu ka',                 korean:'코인 로커는 어디 있나요?', english:'Where are the coin lockers?' },
  { id:'sub3_6',  speaker:'B', japanese:'改札を出てすぐ左側にあります。',                       romaji:'kaisatsu wo dete sugu hidarigawa ni arimasu',       korean:'개찰구 나오자마자 왼쪽에 있어요.', english:'Right after you exit the ticket gates, on the left.' },
  { id:'sub3_7',  speaker:'A', japanese:'トイレも近くにありますか？',                           romaji:'toire mo chikaku ni arimasu ka',                    korean:'화장실도 근처에 있나요?', english:'Is there a restroom nearby too?' },
  { id:'sub3_8',  speaker:'B', japanese:'B出口の横にあります。',                               romaji:'B deguchi no yoko ni arimasu',                      korean:'B 출구 옆에 있어요.', english:'It\'s right next to Exit B.' },
  { id:'sub3_9',  speaker:'A', japanese:'ありがとうございます。地図を見せていただけますか？',     romaji:'arigatou gozaimasu. chizu wo misete itadakemasu ka', korean:'감사합니다. 지도 보여주실 수 있나요?', english:'Thank you. Could you show me a map?' },
  { id:'sub3_10', speaker:'B', japanese:'どうぞ。（スマホで案内地図を表示）',                   romaji:'douzo. (sumaho de annai chizu wo hyouji)',          korean:'여기요. (스마트폰으로 안내 지도 표시)', english:'Here you go. (shows a map on their phone)' },

  // ══════════════════════════════════════════════════════════
  //  교통편 추가 — 비행기 안에서
  // ══════════════════════════════════════════════════════════

  // ── 비행기 안에서 (sim_airplane) ─────────────────────────
  { id:'air_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 비행기 안 — 승무원과 이코노미석 대화', english:'📍 On the plane — talking with the flight attendant in economy class' },
  { id:'air_1',   speaker:'B', japanese:'いらっしゃいませ。お席はどちらですか？',                romaji:'irasshaimase. oseki wa dochira desu ka',                    korean:'어서 오세요. 좌석이 어디세요?', english:'Welcome. Where is your seat?' },
  { id:'air_2',   speaker:'A', japanese:'すみません、23Aなのですが、どこでしょうか？',           romaji:'sumimasen, nijuusan-ee na no desu ga, doko deshou ka',      korean:'저기요, 23A인데 어디예요?', english:'Excuse me, I\'m in seat 23A — where is that?' },
  { id:'air_3',   speaker:'B', japanese:'こちらです。お荷物は上の棚にどうぞ。',                  romaji:'kochira desu. onimotsu wa ue no tana ni douzo',             korean:'여기예요. 짐은 위 선반에 넣어주세요.', english:'Right here. Please put your luggage in the overhead bin.' },
  { id:'air_4',   speaker:'A', japanese:'ありがとうございます。毛布はいただけますか？',           romaji:'arigatou gozaimasu. moufu wa itadakemasu ka',               korean:'감사해요. 담요 받을 수 있나요?', english:'Thank you. Could I have a blanket?' },
  { id:'air_5',   speaker:'B', japanese:'はい、少々お待ちください。お飲み物は何になさいますか？', romaji:'hai, shoushou omachi kudasai. onomimono wa nani ni nasaimasu ka', korean:'네, 잠시만요. 음료는 뭘로 드릴까요?', english:'Of course, one moment. What would you like to drink?' },
  { id:'air_6',   speaker:'A', japanese:'オレンジジュースをください。イヤホンもありますか？',     romaji:'orenji juusu wo kudasai. iyahon mo arimasu ka',             korean:'오렌지 주스 주세요. 이어폰도 있나요?', english:'Orange juice, please. Do you have earphones?' },
  { id:'air_7',   speaker:'B', japanese:'はい、どうぞ。お食事はチキンとフィッシュ、どちらになさいますか？', romaji:'hai, douzo. oshokuji wa chikin to fisshu, dochira ni nasaimasu ka', korean:'네, 여기요. 식사는 치킨과 생선 중 어느 걸로?', english:'Here you go. For your meal, would you like chicken or fish?' },
  { id:'air_8',   speaker:'A', japanese:'チキンでお願いします。',                               romaji:'chikin de onegai shimasu',                                  korean:'치킨으로 할게요.', english:'Chicken, please.' },
  { id:'air_9',   speaker:'B', japanese:'かしこまりました。着陸は現地時間の14時を予定しています。', romaji:'kashikomarimashita. chakuriku wa genchi jikan no juuyoji wo yotei shite imasu', korean:'알겠습니다. 착륙은 현지시각 14시 예정이에요.', english:'Understood. We are scheduled to land at 2:00 PM local time.' },
  { id:'air_10',  speaker:'A', japanese:'ありがとうございます。お手洗いはどちらですか？',         romaji:'arigatou gozaimasu. otearai wa dochira desu ka',            korean:'감사해요. 화장실은 어느 쪽인가요?', english:'Thank you. Where is the restroom?' },

  // ══════════════════════════════════════════════════════════
  //  숙박편 추가 — 온천에서
  // ══════════════════════════════════════════════════════════

  // ── 온천에서 (sim_onsen) ──────────────────────────────────
  { id:'ons_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 료칸 온천 — 탈의실에서 이용 방법 안내', english:'📍 Ryokan hot spring — getting instructions in the changing room' },
  { id:'ons_1',   speaker:'B', japanese:'いらっしゃいませ。ご利用は初めてですか？',               romaji:'irasshaimase. goriyou wa hajimete desu ka',                 korean:'어서 오세요. 처음 이용하세요?', english:'Welcome. Is this your first time using the onsen?' },
  { id:'ons_2',   speaker:'A', japanese:'はい、初めてです。使い方を教えていただけますか？',       romaji:'hai, hajimete desu. tsukaikata wo oshiete itadakemasu ka', korean:'네, 처음이에요. 사용법 알려주실 수 있나요?', english:'Yes, it\'s my first time. Could you explain how to use it?' },
  { id:'ons_3',   speaker:'B', japanese:'まずロッカーに荷物を入れて、体を洗ってから湯船に入ってください。', romaji:'mazu rokkaa ni nimotsu wo irete, karada wo aratte kara yubune ni haitte kudasai', korean:'먼저 사물함에 짐 넣고, 몸 씻은 후 욕조에 들어가세요.', english:'First, put your things in a locker, wash your body, then enter the bath.' },
  { id:'ons_4',   speaker:'A', japanese:'シャンプーはありますか？',                             romaji:'shanpuu wa arimasu ka',                                     korean:'샴푸 있나요?', english:'Is there shampoo?' },
  { id:'ons_5',   speaker:'B', japanese:'はい、洗い場にございます。バスタオルはロッカーの中にあります。', romaji:'hai, araiba ni gozaimasu. basu taoru wa rokkaa no naka ni arimasu', korean:'네, 세면대에 있어요. 바스타올은 사물함 안에 있어요.', english:'Yes, at the washing area. Your bath towel is inside the locker.' },
  { id:'ons_6',   speaker:'A', japanese:'湯船の温度は何度ですか？',                             romaji:'yubune no ondo wa nandо desu ka',                            korean:'욕조 온도는 몇 도예요?', english:'What temperature is the bath?' },
  { id:'ons_7',   speaker:'B', japanese:'内風呂は42度です。露天風呂はもう少しぬるいですよ。',    romaji:'uchifuro wa yonjuuni do desu. rotemburo wa mou sukoshi nurui desu yo', korean:'실내탕은 42도예요. 노천탕은 조금 더 미지근해요.', english:'The indoor bath is 42°C. The outdoor bath is a bit cooler.' },
  { id:'ons_8',   speaker:'A', japanese:'露天風呂はどこですか？',                               romaji:'rotemburo wa doko desu ka',                                 korean:'노천탕은 어디예요?', english:'Where is the outdoor bath?' },
  { id:'ons_9',   speaker:'B', japanese:'廊下を進んで突き当たりを右に曲がってください。',         romaji:'rouka wo susunde tsukiatari wo migi ni magatte kudasai',    korean:'복도를 따라 가다 막히는 곳에서 오른쪽으로 도세요.', english:'Go down the hallway and turn right at the end.' },
  { id:'ons_10',  speaker:'A', japanese:'ありがとうございます。いい温泉でした！気持ちよかったです。', romaji:'arigatou gozaimasu. ii onsen deshita! kimochi yokatta desu', korean:'감사해요. 좋은 온천이었어요! 기분 좋았어요.', english:'Thank you. It was a wonderful hot spring! I feel amazing.' },

  // ══════════════════════════════════════════════════════════
  //  관광·문화 추가 — 야구장, 데이트
  // ══════════════════════════════════════════════════════════

  // ── 야구장에서 (sim_baseball) ─────────────────────────────
  { id:'bsb_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 야구장 — 입장권 구입부터 응원까지', english:'📍 Baseball stadium — buying tickets to cheering in the stands' },
  { id:'bsb_1',   speaker:'A', japanese:'チケットを買いたいのですが、今日の分はありますか？',     romaji:'chiketto wo kaitai no desu ga, kyou no bun wa arimasu ka',  korean:'티켓 사고 싶은데, 오늘 치 있나요?', english:'I\'d like to buy tickets — are there any left for today?' },
  { id:'bsb_2',   speaker:'B', japanese:'外野自由席でしたら残っています。お一人様1,800円です。',  romaji:'gaiya jiyuuseki deshitara nokotte imasu. ohitori sama sen happyaku en desu', korean:'외야 자유석은 남아 있어요. 1인 1,800엔이에요.', english:'We have outfield general admission seats left. It\'s 1,800 yen per person.' },
  { id:'bsb_3',   speaker:'A', japanese:'二枚お願いします。',                                   romaji:'nimai onegai shimasu',                                      korean:'두 장 주세요.', english:'Two tickets, please.' },
  { id:'bsb_4',   speaker:'B', japanese:'3,600円です。応援グッズも入口近くで売っていますよ。',    romaji:'sanzennroppyaku en desu. ouen guzzu mo iriguchi chikaku de utte imasu yo', korean:'3,600엔이에요. 응원 용품도 입구 근처에서 팔아요.', english:'That\'s 3,600 yen. They also sell fan gear near the entrance.' },
  { id:'bsb_5',   speaker:'A', japanese:'（場内で）すみません、ビールと唐揚げをください。',       romaji:'(janai de) sumimasen, biiru to karaage wo kudasai',         korean:'(경기장 안에서) 저기요, 맥주랑 가라아게 주세요.', english:'(inside the stadium) Excuse me, a beer and some karaage, please.' },
  { id:'bsb_6',   speaker:'B', japanese:'ビール中が800円、唐揚げが500円です。合わせて1,300円です。', romaji:'biiru chuu ga happyaku en, karaage ga gohyaku en desu. awasete senzannbyaku en desu', korean:'맥주 중이 800엔, 가라아게 500엔이에요. 합쳐서 1,300엔이에요.', english:'A medium beer is 800 yen, karaage is 500 yen. That\'s 1,300 yen total.' },
  { id:'bsb_7',   speaker:'A', japanese:'ありがとうございます！',                               romaji:'arigatou gozaimasu',                                        korean:'감사해요!', english:'Thank you!' },
  { id:'bsb_8',   speaker:'A', japanese:'（応援中）行けー！ホームランだ！',                      romaji:'(ouen chuu) ike! hoomuran da',                              korean:'(응원 중) 가라! 홈런이다!', english:'(cheering) Go! It\'s a home run!' },
  { id:'bsb_9',   speaker:'B', japanese:'すごいですね！日本の野球、楽しめましたか？',             romaji:'sugoi desu ne! nihon no yakyuu, tanoshimemashita ka',       korean:'대단하네요! 일본 야구 즐기셨나요?', english:'Incredible! Did you enjoy Japanese baseball?' },
  { id:'bsb_10',  speaker:'A', japanese:'はい、最高でした！また来ます！',                        romaji:'hai, saikou deshita! mata kimasu',                          korean:'네, 최고였어요! 또 올게요!', english:'Yes, it was amazing! I\'ll definitely come back!' },

  // ── 일본인과 데이트 (sim_date) ───────────────────────────
  { id:'dt2_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 공원에서 — 일본인과 벚꽃 데이트', english:'📍 At the park — a cherry blossom date with a Japanese person' },
  { id:'dt2_1',   speaker:'B', japanese:'こんにちは！今日は天気がいいですね。',                  romaji:'konnichiwa! kyou wa tenki ga ii desu ne',                   korean:'안녕하세요! 오늘 날씨 좋네요.', english:'Hi! The weather is so nice today.' },
  { id:'dt2_2',   speaker:'A', japanese:'ほんとうですね。桜がきれいですね！',                    romaji:'hontou desu ne. sakura ga kirei desu ne',                   korean:'정말이요. 벚꽃이 예쁘네요!', english:'Isn\'t it! The cherry blossoms are beautiful!' },
  { id:'dt2_3',   speaker:'B', japanese:'お花見は初めてですか？',                               romaji:'ohanami wa hajimete desu ka',                               korean:'꽃놀이는 처음이에요?', english:'Is this your first hanami?' },
  { id:'dt2_4',   speaker:'A', japanese:'はい、ずっと来たかったんです。一緒に写真を撮ってもいいですか？', romaji:'hai, zutto kita katta n desu. issho ni shashin wo totte mo ii desu ka', korean:'네, 계속 오고 싶었어요. 같이 사진 찍어도 되나요?', english:'Yes, I\'ve always wanted to come. Can we take a photo together?' },
  { id:'dt2_5',   speaker:'B', japanese:'もちろん！その後、近くのカフェに行きませんか？',         romaji:'mochiron! sono ato, chikaku no kafe ni ikimasen ka',        korean:'물론이요! 그 다음 근처 카페 갈까요?', english:'Of course! Want to grab coffee at a nearby café after?' },
  { id:'dt2_6',   speaker:'A', japanese:'ぜひ！どんなお店ですか？',                             romaji:'zehi! donna omise desu ka',                                 korean:'꼭요! 어떤 가게예요?', english:'Absolutely! What\'s the place like?' },
  { id:'dt2_7',   speaker:'B', japanese:'インスタに有名なラテアートのお店ですよ。',               romaji:'insuta ni yuumei na rate aato no omise desu yo',            korean:'인스타에서 유명한 라테아트 가게예요.', english:'It\'s famous on Instagram for its latte art.' },
  { id:'dt2_8',   speaker:'A', japanese:'楽しみです！日本語まだまだですが、今日は楽しいです。',   romaji:'tanoshimi desu! nihongo mada mada desu ga, kyou wa tanoshii desu', korean:'기대돼요! 일본어 아직 부족하지만, 오늘 즐거워요.', english:'I can\'t wait! My Japanese is still shaky, but I\'m having so much fun today.' },
  { id:'dt2_9',   speaker:'B', japanese:'日本語、上手ですよ！また一緒に出かけましょう。',         romaji:'nihongo, jouzu desu yo! mata issho ni dekakemashou',        korean:'일본어 잘 하세요! 또 같이 나가요.', english:'Your Japanese is great! Let\'s hang out again.' },
  { id:'dt2_10',  speaker:'A', japanese:'ありがとうございます！連絡先を教えてもらえますか？',     romaji:'arigatou gozaimasu! renrakusaki wo oshiete moraemasu ka',   korean:'감사해요! 연락처 알려주실 수 있나요?', english:'Thank you! Could I get your contact info?' },

  // ── 조식 뷔페에서 (sim_breakfast) ────────────────────────
  { id:'bfr_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 조식 뷔페 — 직원과 대화', english:'📍 Hotel breakfast buffet — chatting with the staff' },
  { id:'bfr_1',   speaker:'B', japanese:'おはようございます。朝食ですか？お部屋番号をお願いします。', romaji:'ohayou gozaimasu. choushoku desu ka? oheya bangou wo onegai shimasu', korean:'좋은 아침이에요. 조식이세요? 방 번호 부탁드려요.', english:'Good morning. Here for breakfast? May I have your room number?' },
  { id:'bfr_2',   speaker:'A', japanese:'503号室です。',                                        romaji:'gohyaku san goushitsu desu',                                korean:'503호실이에요.', english:'Room 503.' },
  { id:'bfr_3',   speaker:'B', japanese:'ありがとうございます。どちらのお席でも自由にどうぞ。',   romaji:'arigatou gozaimasu. dochira no oseki demo jiyuu ni douzo',  korean:'감사합니다. 원하시는 자리 어디든 앉으세요.', english:'Thank you. Please feel free to sit wherever you like.' },
  { id:'bfr_4',   speaker:'A', japanese:'ありがとうございます。コーヒーはどこですか？',           romaji:'arigatou gozaimasu. koohii wa doko desu ka',                korean:'감사해요. 커피는 어디 있어요?', english:'Thank you. Where is the coffee?' },
  { id:'bfr_5',   speaker:'B', japanese:'奥のドリンクコーナーにございます。',                    romaji:'oku no dorinku koonaa ni gozaimasu',                        korean:'안쪽 음료 코너에 있어요.', english:'It\'s at the drinks station in the back.' },
  { id:'bfr_6',   speaker:'A', japanese:'このスープは何ですか？',                               romaji:'kono suupu wa nan desu ka',                                 korean:'이 수프는 뭐예요?', english:'What is this soup?' },
  { id:'bfr_7',   speaker:'B', japanese:'お味噌汁です。和食も豊富にご用意しています。',          romaji:'omisoshiru desu. washoku mo houfu ni gouyoi shite imasu',   korean:'미소시루예요. 일식도 풍부하게 준비했어요.', english:'It\'s miso soup. We have a wide selection of Japanese dishes too.' },
  { id:'bfr_8',   speaker:'A', japanese:'アレルギーのメニュー表はありますか？',                  romaji:'arerugii no menyuu hyou wa arimasu ka',                     korean:'알레르기 메뉴판 있나요?', english:'Do you have an allergen menu?' },
  { id:'bfr_9',   speaker:'B', japanese:'はい、こちらをご覧ください。ご不明な点はいつでもどうぞ。', romaji:'hai, kochira wo goran kudasai. go fumeina ten wa itsudemo douzo', korean:'네, 이걸 봐주세요. 모르는 점은 언제든지요.', english:'Yes, please take a look at this. Feel free to ask if you have any questions.' },
  { id:'bfr_10',  speaker:'A', japanese:'とてもおいしかったです！ごちそうさまでした！',           romaji:'totemo oishikatta desu! gochisousama deshita',              korean:'너무 맛있었어요! 잘 먹었습니다!', english:'Everything was delicious! Thank you for the meal!' },

  // ══════════════════════════════════════════════════════════
  //  쇼핑편 추가 — 편집샵, 돈키호테, 백화점
  // ══════════════════════════════════════════════════════════

  // ── 편집샵/옷가게에서 (sim_selectshop) ───────────────────
  { id:'sel_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 편집샵 — 캐주얼 패션 쇼핑', english:'📍 Select shop — casual fashion shopping' },
  { id:'sel_1',   speaker:'B', japanese:'いらっしゃいませ！何かお探しですか？',                  romaji:'irasshaimase! nanika osagashi desu ka',                     korean:'어서 오세요! 찾는 게 있으세요?', english:'Welcome! Are you looking for anything in particular?' },
  { id:'sel_2',   speaker:'A', japanese:'Tシャツを探しています。',                               romaji:'tii shatsu wo sagashite imasu',                             korean:'티셔츠를 찾고 있어요.', english:'I\'m looking for a T-shirt.' },
  { id:'sel_3',   speaker:'B', japanese:'こちらの新作はいかがですか？今季一番人気です。',         romaji:'kochira no shinsaku wa ikaga desu ka? konki ichiban ninki desu', korean:'이 신상품은 어떠세요? 이번 시즌 가장 인기 있어요.', english:'How about this new item? It\'s our most popular this season.' },
  { id:'sel_4',   speaker:'A', japanese:'かわいいですね。試着してもいいですか？',                 romaji:'kawaii desu ne. shichaku shite mo ii desu ka',              korean:'귀엽네요. 입어봐도 되나요?', english:'It\'s cute. Can I try it on?' },
  { id:'sel_5',   speaker:'B', japanese:'もちろんです。試着室はこちらへどうぞ。Mサイズをお持ちします。', romaji:'mochiron desu. shichakushitsu wa kochira e douzo. emu saizu wo omochi shimasu', korean:'물론이죠. 피팅룸은 이쪽이요. M사이즈 가져다 드릴게요.', english:'Of course. The fitting room is this way. I\'ll bring you a size M.' },
  { id:'sel_6',   speaker:'A', japanese:'少し大きいかもしれません。Sサイズはありますか？',         romaji:'sukoshi ookii kamo shiremasen. esu saizu wa arimasu ka',    korean:'조금 클 것 같아요. S사이즈 있나요?', english:'It might be a little big. Do you have a size S?' },
  { id:'sel_7',   speaker:'B', japanese:'Sは今ちょうど在庫が一枚あります。他の色もございますよ。', romaji:'esu wa ima choudo zaiko ga ichimai arimasu. hoka no iro mo gozaimasu yo', korean:'S는 지금 딱 재고가 한 장 있어요. 다른 색도 있어요.', english:'We have exactly one S in stock right now. We also have other colors.' },
  { id:'sel_8',   speaker:'A', japanese:'白をください。これにします。',                          romaji:'shiro wo kudasai. kore ni shimasu',                         korean:'흰색 주세요. 이걸로 할게요.', english:'White, please. I\'ll take this one.' },
  { id:'sel_9',   speaker:'B', japanese:'ありがとうございます。免税はご利用になりますか？',        romaji:'arigatou gozaimasu. menzei wa goriyou ni narimasu ka',      korean:'감사합니다. 면세 이용하시겠어요?', english:'Thank you. Would you like to use tax-free?' },
  { id:'sel_10',  speaker:'A', japanese:'はい、お願いします。カードで払えますか？',               romaji:'hai, onegai shimasu. kaado de haraemasu ka',               korean:'네, 부탁해요. 카드 되나요?', english:'Yes, please. Can I pay by card?' },

  // ── 돈키호테에서 (sim_donki) ──────────────────────────────
  { id:'dnq_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 돈키호테 — 화장품·과자·면세 쇼핑', english:'📍 Don Quijote — shopping for cosmetics, snacks & tax-free goods' },
  { id:'dnq_1',   speaker:'A', japanese:'すみません、化粧品はどこですか？',                      romaji:'sumimasen, keshouhin wa doko desu ka',                      korean:'저기요, 화장품은 어디예요?', english:'Excuse me, where are the cosmetics?' },
  { id:'dnq_2',   speaker:'B', japanese:'二階にございます。エスカレーターをご利用ください。',      romaji:'nikai ni gozaimasu. esukareetaa wo goriyou kudasai',        korean:'2층에 있어요. 에스컬레이터 이용하세요.', english:'They\'re on the second floor. Please use the escalator.' },
  { id:'dnq_3',   speaker:'A', japanese:'この商品は免税になりますか？',                         romaji:'kono shouhin wa menzei ni narimasu ka',                     korean:'이 상품은 면세 되나요?', english:'Is this item tax-free?' },
  { id:'dnq_4',   speaker:'B', japanese:'5,000円以上お買い上げで免税になります。パスポートをお持ちですか？', romaji:'gosen en ijou okaiage de menzei ni narimasu. pasupooto wo omochi desu ka', korean:'5,000엔 이상 구매 시 면세 돼요. 여권 가지고 계세요?', english:'It\'s tax-free on purchases of 5,000 yen or more. Do you have your passport?' },
  { id:'dnq_5',   speaker:'A', japanese:'はい、こちらです。お菓子コーナーはどこですか？',         romaji:'hai, kochira desu. okashi koonaa wa doko desu ka',          korean:'네, 여기요. 과자 코너는 어디예요?', english:'Yes, here it is. Where is the snack section?' },
  { id:'dnq_6',   speaker:'B', japanese:'一階の右奥にございます。お土産にも人気のお菓子が揃っています。', romaji:'ikkai no migi oku ni gozaimasu. omiyage ni mo ninki no okashi ga sorotte imasu', korean:'1층 오른쪽 안쪽에 있어요. 선물용으로 인기인 과자도 갖춰져 있어요.', english:'In the back right of the first floor. We have a great selection of popular souvenir sweets too.' },
  { id:'dnq_7',   speaker:'A', japanese:'ドラッグストア商品も免税対象ですか？',                  romaji:'doraggu sutoa shouhin mo menzei taishou desu ka',           korean:'드러그스토어 상품도 면세 대상인가요?', english:'Are drugstore products also eligible for tax-free?' },
  { id:'dnq_8',   speaker:'B', japanese:'医薬部外品は免税対象外ですが、化粧品や食品はOKです。',   romaji:'iyaku bugaihin wa menzei taishou gai desu ga, keshouhin ya shokuhin wa OK desu', korean:'의약외품은 면세 제외지만, 화장품이나 식품은 OK예요.', english:'Quasi-drugs are excluded, but cosmetics and food are fine.' },
  { id:'dnq_9',   speaker:'A', japanese:'わかりました。まとめて買います。',                      romaji:'wakarimashita. matomete kaimasu',                           korean:'알겠어요. 한꺼번에 살게요.', english:'Got it. I\'ll buy everything together.' },
  { id:'dnq_10',  speaker:'B', japanese:'免税カウンターは出口の横にあります。レシートをお持ちください。', romaji:'menzei kauntaa wa deguchi no yoko ni arimasu. reshiito wo omochi kudasai', korean:'면세 카운터는 출구 옆에 있어요. 영수증 가져오세요.', english:'The tax-free counter is next to the exit. Please bring your receipt.' },

  // ── 백화점에서 (sim_department) ───────────────────────────
  { id:'dep_n1',  speaker:'N', japanese:'', romaji:'', korean:'📍 백화점 — 선물 구입·포장·식품관', english:'📍 Department store — buying a gift, wrapping & the food basement' },
  { id:'dep_1',   speaker:'B', japanese:'いらっしゃいませ。何かお探しでしょうか？',               romaji:'irasshaimase. nanika osagashi deshou ka',                   korean:'어서 오세요. 찾으시는 게 있으신가요?', english:'Welcome. Is there something I can help you find?' },
  { id:'dep_2',   speaker:'A', japanese:'ハンカチを探しています。プレゼント用です。',             romaji:'hankachi wo sagashite imasu. purezento you desu',           korean:'손수건을 찾고 있어요. 선물용이에요.', english:'I\'m looking for a handkerchief. It\'s for a gift.' },
  { id:'dep_3',   speaker:'B', japanese:'こちらのコーナーにございます。ご予算はおいくらですか？',  romaji:'kochira no koonaa ni gozaimasu. goyosan wa oikura desu ka', korean:'이 코너에 있어요. 예산은 얼마세요?', english:'They\'re in this section. What is your budget?' },
  { id:'dep_4',   speaker:'A', japanese:'3,000円くらいで考えています。',                         romaji:'sanzen en kurai de kangaete imasu',                         korean:'3,000엔 정도 생각하고 있어요.', english:'Around 3,000 yen.' },
  { id:'dep_5',   speaker:'B', japanese:'こちらはいかがでしょうか。人気のブランドです。',          romaji:'kochira wa ikaga deshou ka. ninki no burando desu',         korean:'이건 어떠세요? 인기 있는 브랜드예요.', english:'How about this one? It\'s a popular brand.' },
  { id:'dep_6',   speaker:'A', japanese:'いいですね。包んでいただけますか？',                     romaji:'ii desu ne. tsutsunde itadakemasu ka',                      korean:'좋네요. 포장해 주실 수 있나요?', english:'That\'s nice. Could you wrap it?' },
  { id:'dep_7',   speaker:'B', japanese:'かしこまりました。のし紙はおつけしますか？',             romaji:'kashikomarimashita. noshigami wa otsuke shimasu ka',        korean:'알겠습니다. 축의·증정 띠지 달아드릴까요?', english:'Certainly. Would you like a noshi label attached?' },
  { id:'dep_8',   speaker:'A', japanese:'いいえ、プレゼント用の袋だけお願いします。地下の食品売り場はどこですか？', romaji:'iie, purezento you no fukuro dake onegai shimasu. chika no shokuhin uriba wa doko desu ka', korean:'아니요, 선물 봉투만 주세요. 지하 식품관은 어디예요?', english:'No thank you, just a gift bag please. Where is the food floor in the basement?' },
  { id:'dep_9',   speaker:'B', japanese:'地下2階にございます。エレベーターは奥にありますよ。',     romaji:'chika nikai ni gozaimasu. erebeetaa wa oku ni arimasu yo',  korean:'지하 2층에 있어요. 엘리베이터는 안쪽에 있어요.', english:'It\'s on basement level 2. The elevator is at the back.' },
  { id:'dep_10',  speaker:'A', japanese:'ありがとうございました。丁寧に対応していただいて助かりました。', romaji:'arigatou gozaimashita. teinei ni taiou shite itadaite tasukarimashita', korean:'감사했습니다. 친절하게 대응해 주셔서 도움이 됐어요.', english:'Thank you so much. Your attentive service was really helpful.' },

  // ══════════════════════════════════════════════════════════
  //  부부 여행편 — デニスと妻の旅
  //  A = 데니스(남편·학습자), B = 와이프
  // ══════════════════════════════════════════════════════════

  // ── cp1: 관광지에서 길을 잃은 부부 ───────────────────────
  { id:'cp1_n1', speaker:'N', japanese:'観光地で、二人はすっかり道に迷ってしまった。', romaji:'kankouichi de, futari wa sukkari michi ni mayotte shimatta.', korean:'📍 관광지에서 — 둘은 완전히 길을 잃어버렸다.', english:'📍 At a tourist spot — the two of them got completely lost.' },
  { id:'cp1_a1', speaker:'A', japanese:'ねえ、どっちの道だったっけ？', romaji:'nee, docchi no michi datta kke?', korean:'야, 어느 쪽 길이었지?', english:'Hey, which way was it again?', tip:'〜だったっけ = ~였던 거 맞지? (기억 확인)' },
  { id:'cp1_b1', speaker:'B', japanese:'{M}が先に歩いたじゃない！', romaji:'{M} ga saki ni aruita ja nai!', korean:'{M}이 먼저 걸었잖아!', english:'{M} was walking ahead!', tip:'〜じゃない = ~잖아! (항의)' },
  { id:'cp1_a2', speaker:'A', japanese:'え？地図は{F}が持ってたでしょ？', romaji:'e? chizu wa {F} ga motteta desho?', korean:'어? 지도는 {F}가 갖고 있었잖아?', english:'What? You had the map, {F}!', tip:'〜でしょ = ~잖아? (확인·항의)' },
  { id:'cp1_b2', speaker:'B', japanese:'スマホで見てたんだもん…バッテリーが切れちゃった。', romaji:'sumaho de mite tan damon... batterii ga kirechatta.', korean:'스마폰으로 보고 있었는데… 배터리가 다 됐어.', english:'I was using my phone… but the battery died.', tip:'〜ちゃった = ~해버렸다 (실수·유감)' },
  { id:'cp1_a3', speaker:'A', japanese:'えーと、誰かに聞いてみよう。あの人に聞いてくる。', romaji:'eeto, dareka ni kiite miyou. ano hito ni kiite kuru.', korean:'음, 누군가한테 물어봐 보자. 저 사람한테 물어보고 올게.', english:'Hmm, let\'s ask someone. I\'ll go ask that person.', tip:'〜てみよう = 한번 ~해보자' },
  { id:'cp1_b3', speaker:'B', japanese:'そうね。日本語の練習になるでしょ？がんばって！', romaji:'sou ne. nihongo no renshuu ni naru desho? ganbatte!', korean:'그렇네. 일본어 연습이 되잖아? 파이팅!', english:'True. Good Japanese practice, right? Go for it!', tip:'〜になるでしょ = ~가 되잖아' },
  { id:'cp1_a4', speaker:'A', japanese:'え、なんで俺が……すみません！〇〇はどこですか？', romaji:'e, nande ore ga... sumimasen! ○○ wa doko desu ka?', korean:'어, 왜 내가…… 실례합니다! ○○은 어디인가요?', english:'Why do I have to… Excuse me! Where is ○○?', tip:'すみません + 질문 = 일본에서 가장 쓸모 있는 조합' },
  { id:'cp1_b4', speaker:'B', japanese:'(小声で) うまく言えたじゃない！えらい！', romaji:'(kogoe de) umaku ieta ja nai! erai!', korean:'(작은 소리로) 잘 말했잖아! 대단해!', english:'(whispering) You said it so well! Good job!', tip:'えらい = 대단해, 잘했어 (칭찬)' },
  { id:'cp1_a5', speaker:'A', japanese:'でしょ？才能あるかも。ふふ。', romaji:'desho? sainou aru kamo. fufu.', korean:'그렇지? 재능 있는 것 같은데. 후후.', english:'Right? Maybe I\'m a natural. Heh.', tip:'才能(さいのう)あるかも = 재능 있는 것 같아' },
  { id:'cp1_b5', speaker:'B', japanese:'調子に乗らないの。ほら、あっちよ！', romaji:'choushi ni noranai no. hora, acchi yo!', korean:'우쭐대지 마. 자, 저쪽이야!', english:'Don\'t get ahead of yourself. Look, it\'s that way!', tip:'調子に乗る(ちょうしにのる) = 우쭐대다' },

  // ── cp2: 온천 탈의실 앞 실수 ──────────────────────────────
  { id:'cp2_n1', speaker:'N', japanese:'ホテルの温泉へ向かう途中、のれんの前で夫が止まった。', romaji:'hoteru no onsen e mukau tochuu, noren no mae de otto ga tomatta.', korean:'📍 호텔 온천 가는 길 — 노렌 앞에서 남편이 멈췄다.', english:'📍 On the way to the hotel hot spring — husband stops in front of the curtain.' },
  { id:'cp2_a1', speaker:'A', japanese:'ここだよね？入るよ。', romaji:'koko da yo ne? hairu yo.', korean:'여기지? 들어갈게.', english:'This is the place, right? I\'m going in.', tip:'〜よね = ~지? (확인)' },
  { id:'cp2_b1', speaker:'B', japanese:'ちょっと待って！そっちは女湯よ！！', romaji:'chotto matte! socchi wa onnayu yo!!', korean:'잠깐만! 거기 여탕이야!!', english:'Wait! That\'s the women\'s bath!!', tip:'女湯(おんなゆ) = 여탕 / 男湯(おとこゆ) = 남탕' },
  { id:'cp2_a2', speaker:'A', japanese:'え？ほんとだ…あぶなかった。', romaji:'e? honto da... abunakatta.', korean:'어? 정말이네… 위험할 뻔했다.', english:'What? You\'re right… that was close.', tip:'あぶなかった = 위험할 뻔했어 (안도)' },
  { id:'cp2_b2', speaker:'B', japanese:'女の人たちに見られたらどうするの！', romaji:'onna no hito tachi ni miraretara dou suru no!', korean:'여자들한테 들켰으면 어쩔 뻔했어!', english:'What would you have done if the women inside saw you!', tip:'〜たらどうするの = ~면 어떡해' },
  { id:'cp2_a3', speaker:'A', japanese:'だって、のれんが似てたんだもん。ごめんごめん。', romaji:'datte, noren ga nitetan damon. gomen gomen.', korean:'근데, 노렌이 비슷하게 생겼잖아. 미안미안.', english:'But the curtains looked the same! Sorry, sorry.', tip:'だって = 근데, 왜냐하면 (변명할 때)' },
  { id:'cp2_b3', speaker:'B', japanese:'「男」って書いてあるでしょ！ちゃんと読んで！', romaji:'"otoko" tte kaite aru desho! chanto yonde!', korean:'"男"라고 써있잖아! 제대로 읽어!', english:'It says "men" right there! Read the signs!', tip:'〜って書いてある = ~라고 쓰여있다' },
  { id:'cp2_a4', speaker:'A', japanese:'漢字、まだちょっと苦手で…これから勉強します。', romaji:'kanji, mada chotto nigate de... korekara benkyou shimasu.', korean:'한자를 아직 좀 못해서… 앞으로 공부할게요.', english:'I\'m still a bit weak with kanji… I\'ll study harder from now on.', tip:'苦手(にがて) = 약한 것, 잘 못하는 것' },
  { id:'cp2_b4', speaker:'B', japanese:'ふふ、じゃあ今日から漢字も特訓ね。', romaji:'fufu, jaa kyou kara kanji mo tokkun ne.', korean:'후후, 그럼 오늘부터 한자도 특훈이야.', english:'Ha, then starting today we\'re doing kanji boot camp.', tip:'特訓(とっくん) = 특별 훈련, 특훈' },
  { id:'cp2_a5', speaker:'A', japanese:'はーい。じゃあ、ゆっくり楽しんできてね。', romaji:'haai. jaa, yukkuri tanoshinde kite ne.', korean:'네~. 그럼, 천천히 즐기고 와.', english:'Yes, yes. Enjoy yourself in there.', tip:'楽しんできてね = 즐겁게 다녀와 (배웅할 때)' },
  { id:'cp2_b5', speaker:'B', japanese:'{M}も男湯で迷子にならないでよ。', romaji:'{M} mo otokoyu de maigo ni naranai de yo.', korean:'{M}도 남탕에서 길 잃지 마.', english:'Don\'t get lost in the men\'s bath, {M}.', tip:'迷子(まいご) = 미아, 길을 잃은 사람' },

  // ── cp3: 돈키호테 쇼핑 전쟁 ──────────────────────────────
  { id:'cp3_n1', speaker:'N', japanese:'ドン・キホーテに入った瞬間、妻の目がキラキラし始めた。', romaji:'donki hoote ni haitta shunkan, tsuma no me ga kirakira shi hajimeta.', korean:'📍 돈키호테 — 들어선 순간, 와이프 눈이 반짝이기 시작했다.', english:'📍 Don Quijote — the moment they walked in, wife\'s eyes lit up.' },
  { id:'cp3_b1', speaker:'B', japanese:'わあ！全部安い！これも欲しい！あれも欲しい！', romaji:'waa! zenbu yasui! kore mo hoshii! are mo hoshii!', korean:'와! 다 싸다! 이것도 갖고 싶어! 저것도 갖고 싶어!', english:'Wow! Everything is so cheap! I want this! I want that!', tip:'〜も欲しい = ~도 갖고 싶어' },
  { id:'cp3_a1', speaker:'A', japanese:'ちょっとちょっと、スーツケース、もう満杯だよ？', romaji:'chotto chotto, suutsukeesu, mou manpai da yo?', korean:'잠깐잠깐, 캐리어 이미 꽉 찼잖아?', english:'Hold on, hold on — the suitcase is already full, you know?', tip:'満杯(まんぱい) = 꽉 찼다, 가득 찼다' },
  { id:'cp3_b2', speaker:'B', japanese:'大丈夫、大丈夫。ちょっとだけよ。', romaji:'daijoubu, daijoubu. chotto dake yo.', korean:'괜찮아, 괜찮아. 조금만이야.', english:'It\'s fine, it\'s fine. Just a little.', tip:'ちょっとだけ = 조금만 (항상 조금만이 많아짐)' },
  { id:'cp3_a2', speaker:'A', japanese:'「ちょっとだけ」って言って、もうカゴがいっぱいじゃないか！', romaji:'"chotto dake" tte itte, mou kago ga ippai ja nai ka!', korean:'"조금만"이라고 했는데 이미 바구니가 꽉 찼잖아!', english:'You said "just a little" and the basket is already full!', tip:'〜って言って = ~라고 말하면서 (설명·항의)' },
  { id:'cp3_b3', speaker:'B', japanese:'これはプレゼント用。これは自分用。これは家用。', romaji:'kore wa purezento you. kore wa jibun you. kore wa ie you.', korean:'이건 선물용. 이건 내 것. 이건 집용.', english:'This one is a gift. This one is for me. This one is for home.', tip:'〜用(よう) = ~용, ~을 위한' },
  { id:'cp3_a3', speaker:'A', japanese:'もう一個バッグ買う気？！', romaji:'mou ikko baggu kau ki?!', korean:'가방 하나 더 살 생각이야?!', english:'Are you planning to buy another bag?!', tip:'もう一個(いっこ) = 하나 더' },
  { id:'cp3_b4', speaker:'B', japanese:'それいいアイデアね！さすがわかってる！', romaji:'sore ii aidea ne! sasuga wakatteru!', korean:'그거 좋은 생각이야! 역시 알아줘!', english:'That\'s a great idea! You always get me!', tip:'さすが = 역시 (칭찬)' },
  { id:'cp3_a4', speaker:'A', japanese:'そういう意味じゃなかったんだけど……', romaji:'sou iu imi ja nakattan da kedo...', korean:'그런 뜻이 아니었는데……', english:'That\'s not what I meant……', tip:'そういう意味じゃない = 그런 뜻이 아니야' },
  { id:'cp3_b5', speaker:'B', japanese:'じゃ、お会計お願いします！いっしょにね♪', romaji:'ja, okaikei onegai shimasu! issho ni ne♪', korean:'그럼, 계산 부탁해요! 같이 내자♪', english:'OK then, let\'s pay! Together, yeah?♪', tip:'お会計(おかいけい)お願いします = 계산 부탁드립니다' },
  { id:'cp3_a5', speaker:'A', japanese:'なんで俺が全部払うの…', romaji:'nande ore ga zenbu harau no...', korean:'왜 내가 다 내는 거야…', english:'Why am I paying for everything…', tip:'払う(はらう) = 지불하다, 내다' },

  // ── cp4: 메뉴 못 읽기 (채식 주문 실수) ───────────────────
  { id:'cp4_n1', speaker:'N', japanese:'二人は地元の定食屋に入った。メニューは漢字だらけだ。', romaji:'futari wa jimoto no teishoku ya ni haitta. menyuu wa kanji darake da.', korean:'📍 동네 정식집 — 메뉴는 한자투성이다.', english:'📍 A local set-meal restaurant — the menu is full of kanji.' },
  { id:'cp4_a1', speaker:'A', japanese:'えーと…ぜんぶ読めない。', romaji:'eeto... zenbu yomenai.', korean:'음… 다 못 읽겠어.', english:'Hmm… I can\'t read any of this.', tip:'〜読めない = 읽지 못하다' },
  { id:'cp4_b1', speaker:'B', japanese:'わたしも。でも写真があるじゃない！これにしよ。', romaji:'watashi mo. demo shashin ga aru ja nai! kore ni shiyo.', korean:'나도. 근데 사진이 있잖아! 이걸로 하자.', english:'Me neither. But there are photos! Let\'s go with this one.', tip:'〜にしよ = ~로 하자 (선택)' },
  { id:'cp4_a2', speaker:'A', japanese:'この写真のやつ、美味しそう！これにする！', romaji:'kono shashin no yatsu, oishisou! kore ni suru!', korean:'이 사진 것, 맛있어 보여! 이걸로 할게!', english:'That photo looks so good! I\'ll have this!', tip:'〜にする = ~로 할게 (선택 결정)' },
  { id:'cp4_b2', speaker:'B', japanese:'すみません！これとこれ、ください。', romaji:'sumimasen! kore to kore, kudasai.', korean:'저기요! 이거랑 이거 주세요.', english:'Excuse me! This one and this one, please.', tip:'これとこれ = 이거랑 이거 (가리키기만 해도 통함)' },
  { id:'cp4_a3', speaker:'A', japanese:'(料理が来て) …あれ、俺のやつ、全部野菜だ。', romaji:'(ryouri ga kite) ...are, ore no yatsu, zenbu yasai da.', korean:'(음식이 나와서) …어, 내 것 전부 채소네.', english:'(when the food arrives) …Huh, mine is all vegetables.', tip:'野菜(やさい) = 채소, 야채' },
  { id:'cp4_b3', speaker:'B', japanese:'ふふ、ベジタリアンメニューだったのね。', romaji:'fufu, bejitarian menyuu datta no ne.', korean:'후후, 채식 메뉴였구나.', english:'Ha, turns out it was a vegetarian menu.', tip:'〜だったのね = ~였던 거구나 (납득)' },
  { id:'cp4_a4', speaker:'A', japanese:'一口ちょうだい。{F}のが美味しそう。', romaji:'hitokuchi choudai. {F} no ga oishisou.', korean:'한 입 줘. {F} 것이 맛있어 보여.', english:'Can I have a bite? {F}\'s looks delicious.', tip:'一口(ひとくち)ちょうだい = 한 입 줘 (커플 필수 표현)' },
  { id:'cp4_b4', speaker:'B', japanese:'ダメ！自分のを食べなさい。笑', romaji:'dame! jibun no wo tabenasai. wara', korean:'안 돼! 자기 것 먹어. ㅋ', english:'No way! Eat your own. lol', tip:'〜なさい = ~해라 (약한 명령, 애정 포함)' },
  { id:'cp4_a5', speaker:'A', japanese:'漢字、マジで勉強しなきゃ。美味しいけど。', romaji:'kanji, maji de benkyou shinakya. oishii kedo.', korean:'한자, 진짜 공부해야겠다. 맛있긴 한데.', english:'I seriously need to study kanji. But it is tasty though.', tip:'〜しなきゃ = ~해야겠다 (반성)' },
  { id:'cp4_b5', speaker:'B', japanese:'ね。次からはちゃんと指さし確認ね。', romaji:'ne. tsugi kara wa chanto yubisashi kakunin ne.', korean:'그러게. 다음부터는 제대로 손가락으로 확인해.', english:'Right. From now on, point and confirm before ordering.', tip:'指さし(ゆびさし) = 손가락으로 가리키기' },

  // ── cp5: 호텔 아침 기상 전쟁 ─────────────────────────────
  { id:'cp5_n1', speaker:'N', japanese:'朝7時。妻は準備を終えて、夫をなんとか起こそうとしている。', romaji:'asa shichi ji. tsuma wa junbi wo oete, otto wo nantoka okosou to shite iru.', korean:'📍 호텔 아침 7시 — 와이프는 준비를 마치고 남편을 어떻게든 깨우려 하고 있다.', english:'📍 7 AM at the hotel — wife has finished getting ready and is trying to wake up her husband.' },
  { id:'cp5_b1', speaker:'B', japanese:'ねえ、起きて！もう7時よ！', romaji:'nee, okite! mou shichi ji yo!', korean:'야, 일어나! 벌써 7시야!', english:'Hey, wake up! It\'s already 7!', tip:'起きて = 일어나 (명령형)' },
  { id:'cp5_a1', speaker:'A', japanese:'んー…あと5分…', romaji:'nnー... ato go fun...', korean:'음~… 5분만 더…', english:'Mmm… just 5 more minutes…', tip:'あと〜分 = ~분만 더 (세계 공통 핑계)' },
  { id:'cp5_b2', speaker:'B', japanese:'「5分」って言って、いつも30分になるじゃない！', romaji:'"go fun" tte itte, itsumo sanjuppun ni naru ja nai!', korean:'"5분"이라고 해놓고, 항상 30분이 되잖아!', english:'You always say "5 minutes" and it turns into 30!', tip:'〜って言って = ~라고 말해놓고 (비판)' },
  { id:'cp5_a2', speaker:'A', japanese:'今日は何の予定だっけ？', romaji:'kyou wa nani no yotei datta kke?', korean:'오늘 무슨 일정이었지?', english:'What\'s the plan for today again?', tip:'予定(よてい) = 예정, 일정' },
  { id:'cp5_b3', speaker:'B', japanese:'浅草、上野、夜は渋谷！全部回るの！', romaji:'asakusa, ueno, yoru wa shibuya! zenbu mawaru no!', korean:'아사쿠사, 우에노, 저녁은 시부야! 다 돌 거야!', english:'Asakusa, Ueno, and Shibuya at night! We\'re hitting all of them!', tip:'全部回る(ぜんぶまわる) = 전부 돌다' },
  { id:'cp5_a3', speaker:'A', japanese:'え、多くない？足、大丈夫かな…', romaji:'e, oukunai? ashi, daijoubu ka na...', korean:'어, 너무 많지 않아? 다리 괜찮을까…', english:'Whoa, isn\'t that a lot? I wonder if my legs can take it…', tip:'〜かな = ~할까, ~일까 (혼잣말 걱정)' },
  { id:'cp5_b4', speaker:'B', japanese:'大丈夫！日本はどこ行っても楽しいから！ほら、早く！', romaji:'daijoubu! nihon wa doko itte mo tanoshii kara! hora, hayaku!', korean:'괜찮아! 일본은 어딜 가도 즐거우니까! 자, 빨리!', english:'You\'ll be fine! Japan is fun no matter where you go! Come on, hurry!', tip:'どこ行っても = 어딜 가도' },
  { id:'cp5_a4', speaker:'A', japanese:'わかった、わかった。起きます起きます。', romaji:'wakatta, wakatta. okimasu okimasu.', korean:'알겠어, 알겠어. 일어날게 일어날게.', english:'OK, OK. I\'m getting up, I\'m getting up.', tip:'繰り返し(くりかえし) = 같은 말 두 번 반복 → 체념' },
  { id:'cp5_b5', speaker:'B', japanese:'朝ごはん食べてから出発ね！今日も楽しい一日にしよ！', romaji:'asagohan tabete kara shuppatsu ne! kyou mo tanoshii ichinichi ni shiyo!', korean:'아침 먹고 출발이야! 오늘도 즐거운 하루 만들자!', english:'We eat breakfast first, then we head out! Let\'s make today another great day!', tip:'〜てから = ~하고 나서 (순서)' },
  { id:'cp5_a5', speaker:'A', japanese:'うん。ありがとう、今日もよろしくね。', romaji:'un. arigatou, kyou mo yoroshiku ne.', korean:'응. 고마워, 오늘도 잘 부탁해.', english:'Yeah. Thanks, let\'s have another good day.', tip:'今日もよろしくね = 오늘도 잘 부탁해 (커플·친구끼리)' },

  // ── cp6: 관광지 사진 촬영 대작전 ─────────────────────────
  { id:'cp6_n1', speaker:'N', japanese:'浅草寺の前。妻はカメラを構えて、夫をポーズさせようとしている。', romaji:'sensouji no mae. tsuma wa kamera wo kamaete, otto wo poozu sa seyou to shite iru.', korean:'📍 아사쿠사지 앞 — 와이프가 카메라를 들고 남편을 포즈 잡게 하려 한다.', english:'📍 In front of Senso-ji — wife has her camera out and is trying to get husband to pose.' },
  { id:'cp6_b1', speaker:'B', japanese:'ここに立って！でも、もうちょっと右！', romaji:'koko ni tatte! demo, mou chotto migi!', korean:'여기 서봐! 근데, 조금 더 오른쪽!', english:'Stand here! But move a little more to the right!', tip:'右(みぎ) = 오른쪽 / 左(ひだり) = 왼쪽' },
  { id:'cp6_a1', speaker:'A', japanese:'これ？こっち？どっち？', romaji:'kore? kocchi? docchi?', korean:'이렇게? 이쪽? 어느 쪽?', english:'Like this? This way? Which way?', tip:'こっち = 이쪽 / どっち = 어느 쪽' },
  { id:'cp6_b2', speaker:'B', japanese:'もうちょっと笑って！自然に！自然に！', romaji:'mou chotto waratte! shizen ni! shizen ni!', korean:'조금 더 웃어봐! 자연스럽게! 자연스럽게!', english:'Smile a bit more! Natural! Be natural!', tip:'自然(しぜん)に = 자연스럽게' },
  { id:'cp6_a2', speaker:'A', japanese:'何枚撮るの？もう50枚撮ったよ…', romaji:'nanmai toru no? mou gojuumai totta yo...', korean:'몇 장 찍는 거야? 벌써 50장 찍었잖아…', english:'How many shots are we taking? We\'ve already taken 50…', tip:'〜枚(まい) = ~장 (사진·종이 세는 단위)' },
  { id:'cp6_b3', speaker:'B', japanese:'いい写真が撮れるまで！あ、あの人に頼もう！{M}が聞いて！', romaji:'ii shashin ga toreru made! a, ano hito ni tanomu! {M} ga kiite!', korean:'좋은 사진 찍힐 때까지! 아, 저 사람한테 부탁하자! {M}이 물어봐!', english:'Until we get a good one! Oh, let\'s ask that person! {M}, you ask!', tip:'〜まで = ~까지' },
  { id:'cp6_a3', speaker:'A', japanese:'え、また俺？わかった。すみません、写真を撮っていただけますか？', romaji:'e, mata ore? wakatta. sumimasen, shashin wo totte itadakemasu ka?', korean:'어, 또 나야? 알겠어. 실례합니다, 사진을 찍어주실 수 있나요?', english:'Me again? Fine. Excuse me, would you mind taking our photo?', tip:'〜ていただけますか = ~해주실 수 있나요? (공손한 부탁의 정석)' },
  { id:'cp6_b4', speaker:'B', japanese:'(小声で) うまい！さすが！', romaji:'(kogoe de) umai! sasuga!', korean:'(작은 소리로) 잘했어! 역시!', english:'(whispering) Nicely done! As expected!', tip:'さすが = 역시, 과연' },
  { id:'cp6_a4', speaker:'A', japanese:'でしょ？ありがとうございました！', romaji:'desho? arigatou gozaimashita!', korean:'그렇지? 감사합니다!', english:'Right? Thank you so much!', tip:'でしょ？ = 그렇지? (자랑)' },
  { id:'cp6_b5', speaker:'B', japanese:'完璧！次は二人でセルフィー！', romaji:'kanpeki! tsugi wa futari de serufii!', korean:'완벽해! 다음은 둘이서 셀카!', english:'Perfect! Now a selfie of both of us!', tip:'セルフィー = 셀피, 셀카' },
  { id:'cp6_a5', speaker:'A', japanese:'え、まだ撮るの…腕が疲れてきた。', romaji:'e, mada toru no... ude ga tsukarete kita.', korean:'어, 아직 더 찍어? …팔이 지쳐가고 있는데.', english:'What, more photos?… My arm is getting tired.', tip:'疲れてきた(つかれてきた) = 지쳐가고 있다' },

  // ══════════════════════════════════════════════════════════
  //  cp1 추가 에피소드 — 길을 잃은 부부 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp1v2: 구글맵 보다가 더 헷갈린 부부 ─────────────────
  { id:'cp1v2_n', speaker:'N', japanese:'グーグルマップを開いたが、二人の意見が合わない。', romaji:'', korean:'📍 구글맵을 열었지만, 두 사람의 의견이 맞질 않는다.', english:'📍 They opened Google Maps, but they can\'t agree on which way to go.' },
  { id:'cp1v2_a1', speaker:'A', japanese:'見て！地図だとここから右に行けばいいんだよ。', romaji:'', korean:'봐! 지도로는 여기서 오른쪽으로 가면 돼.', english:'Look! According to the map, we just go right from here.', tip:'〜ばいい = ~하면 된다' },
  { id:'cp1v2_b1', speaker:'B', japanese:'ちがう！青い点がこっちを向いてるじゃない！', romaji:'', korean:'아니야! 파란 점이 이쪽을 향하고 있잖아!', english:'No! The blue dot is facing this way!', tip:'〜を向いてる = ~쪽을 보고 있다' },
  { id:'cp1v2_a2', speaker:'A', japanese:'それ、自分たちの位置だから。地図が回ってるんだよ。', romaji:'', korean:'그건 우리 위치니까. 지도가 돌아가고 있는 거야.', english:'That\'s our location. The map is rotating.', tip:'地図が回る = 지도가 회전하다 (나침반 모드)' },
  { id:'cp1v2_b2', speaker:'B', japanese:'えっ、そんな機能あるの！？知らなかった！', romaji:'', korean:'어, 그런 기능이 있어!? 몰랐어!', english:'Wait, it does that!? I had no idea!', tip:'知らなかった = 몰랐어 (과거 부정)' },
  { id:'cp1v2_a3', speaker:'A', japanese:'だから、こっちが正しいって言ってたでしょ？', romaji:'', korean:'그러니까, 이쪽이 맞다고 했잖아?', english:'So I was right that it\'s this way, wasn\'t I?', tip:'〜って言ってたでしょ = ~라고 말했잖아' },
  { id:'cp1v2_b3', speaker:'B', japanese:'はいはい、{M}が正しかったです。さ、行きましょ。', romaji:'', korean:'응응, {M}이 맞았어요. 자, 가자.', english:'Yes yes, {M} was right. Now let\'s go.', tip:'はいはい = 네네 (마지못한 인정)' },
  { id:'cp1v2_a4', speaker:'A', japanese:'今の「はいはい」、ちょっと投げやりじゃない？', romaji:'', korean:'지금 그 "응응", 좀 건성이지 않아?', english:'That "yes yes" just now sounded a bit half-hearted, no?', tip:'投げやり(なげやり) = 건성, 무성의함' },
  { id:'cp1v2_b4', speaker:'B', japanese:'ふふ、でも目的地に着いたらいいでしょ♪', romaji:'', korean:'후후, 그래도 목적지에 도착하면 됐잖아♪', english:'Ha, but as long as we get there, right?♪', tip:'目的地(もくてきち) = 목적지' },
  { id:'cp1v2_a5', speaker:'A', japanese:'…たしかに。じゃ、急ごう！', romaji:'', korean:'…그건 그렇네. 그럼, 서두르자!', english:'…Fair point. Let\'s hurry then!', tip:'急ぐ(いそぐ) = 서두르다' },

  // ── cp1v3: 편의점에서 점원한테 길 묻기 ──────────────────
  { id:'cp1v3_n', speaker:'N', japanese:'二人はコンビニに駆け込み、店員に道を聞くことにした。', romaji:'', korean:'📍 둘은 편의점으로 뛰어들어가 점원에게 길을 물어보기로 했다.', english:'📍 The two of them ran into a convenience store to ask the clerk for directions.' },
  { id:'cp1v3_a1', speaker:'A', japanese:'すみません！〇〇神社はこの近くですか？', romaji:'', korean:'실례합니다! ○○신사는 이 근처인가요?', english:'Excuse me! Is ○○ Shrine nearby?', tip:'近く(ちかく) = 근처' },
  { id:'cp1v3_b1', speaker:'B', japanese:'（小声で）発音、大丈夫？', romaji:'', korean:'(작은 소리로) 발음 괜찮아?', english:'(whispering) Your pronunciation OK?', tip:'小声(こごえ) = 작은 소리, 속삭임' },
  { id:'cp1v3_a2', speaker:'A', japanese:'（小声で）黙ってて！', romaji:'', korean:'(작은 소리로) 조용히 해!', english:'(whispering) Shh!', tip:'黙って(だまって) = 조용히 해, 입 다물어' },
  { id:'cp1v3_b2', speaker:'B', japanese:'（店員に）地図、見せていただけますか？', romaji:'', korean:'(점원에게) 지도 좀 보여주실 수 있나요?', english:'(to the clerk) Could you show us a map?', tip:'〜ていただけますか = ~해주실 수 있나요?' },
  { id:'cp1v3_a3', speaker:'A', japanese:'（地図を見て）なるほど、ここを真っすぐ行けばいいんですね。', romaji:'', korean:'(지도를 보며) 그렇군요, 여기서 쭉 가면 되는 거네요.', english:'(looking at the map) I see, so we just go straight from here.', tip:'真っすぐ(まっすぐ) = 쭉, 곧장' },
  { id:'cp1v3_b3', speaker:'B', japanese:'どのくらいかかりますか？', romaji:'', korean:'얼마나 걸려요?', english:'About how long does it take?', tip:'どのくらいかかる = 얼마나 걸리다' },
  { id:'cp1v3_a4', speaker:'A', japanese:'ありがとうございます！助かりました！', romaji:'', korean:'감사합니다! 덕분에 살았어요!', english:'Thank you! You\'re a real lifesaver!', tip:'助かりました(たすかりました) = 살았어요, 도움이 됐어요' },
  { id:'cp1v3_b4', speaker:'B', japanese:'ね、{M}の日本語ちゃんと通じたね！すごい！', romaji:'', korean:'봐, {M} 일본어 제대로 통했네! 대단해!', english:'See, your Japanese totally worked! Amazing!', tip:'通じる(つうじる) = 통하다, 전달되다' },
  { id:'cp1v3_a5', speaker:'A', japanese:'でしょ。コンビニのお兄さん、めちゃ丁寧だった。', romaji:'', korean:'그렇지. 편의점 오빠 엄청 친절했어.', english:'Right? The guy at the convenience store was super helpful.', tip:'丁寧(ていねい) = 친절한, 정중한' },

  // ── cp1v4: 택시를 타려는 부부 ────────────────────────────
  { id:'cp1v4_n', speaker:'N', japanese:'歩くのを諦め、二人はタクシーを拾うことにした。', romaji:'', korean:'📍 걷는 것을 포기하고 둘은 택시를 잡기로 했다.', english:'📍 Giving up on walking, they decided to hail a taxi.' },
  { id:'cp1v4_b1', speaker:'B', japanese:'もう歩けない！タクシー乗ろう！', romaji:'', korean:'이제 못 걷겠어! 택시 타자!', english:'I can\'t walk anymore! Let\'s take a taxi!', tip:'〜乗ろう = ~타자 (권유)' },
  { id:'cp1v4_a1', speaker:'A', japanese:'わかった。えっと、どうやって止めるんだっけ？', romaji:'', korean:'알겠어. 음, 어떻게 세우는 거지?', english:'OK. Hmm, how do you flag one down again?', tip:'止める(とめる) = 세우다, 멈추게 하다' },
  { id:'cp1v4_b2', speaker:'B', japanese:'手を上げるだけよ。ほら、来た来た！', romaji:'', korean:'손만 들면 돼. 자, 왔어왔어!', english:'Just raise your hand. Look, one\'s coming!', tip:'手を上げる(てをあげる) = 손을 들다' },
  { id:'cp1v4_a2', speaker:'A', japanese:'（運転手に）〇〇まで、お願いします。', romaji:'', korean:'(기사에게) ○○까지 부탁드립니다.', english:'(to the driver) To ○○, please.', tip:'〜まで、お願いします = ~까지 부탁합니다 (택시 목적지 전달)' },
  { id:'cp1v4_b3', speaker:'B', japanese:'メーターって自動で上がるんだよね？', romaji:'', korean:'미터기는 자동으로 올라가는 거지?', english:'The meter goes up automatically, right?', tip:'メーター = 미터기' },
  { id:'cp1v4_a3', speaker:'A', japanese:'そう。チップとかいらないから楽だよ。', romaji:'', korean:'응. 팁 같은 게 없어서 편해.', english:'Yep. No tipping required, which is nice.', tip:'チップ = 팁 (일본 택시는 불필요)' },
  { id:'cp1v4_b4', speaker:'B', japanese:'あ、着いた！いくらですか？', romaji:'', korean:'아, 도착했어! 얼마예요?', english:'Oh, we\'re here! How much is it?', tip:'いくらですか = 얼마예요?' },
  { id:'cp1v4_a4', speaker:'A', japanese:'（支払いながら）交通系ICカードで払えますか？', romaji:'', korean:'(계산하며) 교통카드로 낼 수 있나요?', english:'(while paying) Can I pay with an IC card?', tip:'交通系ICカード = 교통계 IC카드 (스이카 등)' },
  { id:'cp1v4_a5', speaker:'A', japanese:'払えた！ありがとうございました！', romaji:'', korean:'됐어! 감사합니다!', english:'It worked! Thank you!', tip:'払えた(はらえた) = 낼 수 있었다 (성공)' },

  // ══════════════════════════════════════════════════════════
  //  cp2 추가 에피소드 — 온천 시즌2~4
  // ══════════════════════════════════════════════════════════

  // ── cp2v2: 온천 물 온도 & 규칙 ────────────────────────────
  { id:'cp2v2_n', speaker:'N', japanese:'男湯に入ったデニス。しかし、湯温に驚いた。', romaji:'', korean:'📍 남탕에 들어간 데니스 — 그런데 물 온도에 깜짝 놀랐다.', english:'📍 Dennis enters the men\'s bath — only to be shocked by the temperature.' },
  { id:'cp2v2_a1', speaker:'A', japanese:'うわっ、熱い！！何度あるんだ、これ！', romaji:'', korean:'와, 뜨거워!! 이거 몇 도야!', english:'Whoa, it\'s boiling!! What temperature is this thing!', tip:'〜度(ど) = ~도 (온도)' },
  { id:'cp2v2_b1', speaker:'B', japanese:'（壁越しに）大丈夫ー？声が聞こえてるよ。', romaji:'', korean:'(벽 너머로) 괜찮아~? 목소리 들려.', english:'(through the wall) You OK~? I can hear you.', tip:'壁越し(かべごし) = 벽 너머로' },
  { id:'cp2v2_a2', speaker:'A', japanese:'42度だって！日本人、どうやって入れるの！？', romaji:'', korean:'42도래! 일본인들 어떻게 들어가!?', english:'It\'s 42 degrees! How do Japanese people get in this!?', tip:'〜だって = ~래 (전달)' },
  { id:'cp2v2_b2', speaker:'B', japanese:'慣れよ、慣れ！ゆっくり入ってみて。', romaji:'', korean:'익숙해진 거야, 익숙해! 천천히 들어가 봐.', english:'You get used to it! Try going in slowly.', tip:'慣れ(なれ) = 익숙함 (익숙해진 거야)' },
  { id:'cp2v2_a3', speaker:'A', japanese:'足だけならなんとか…全身は無理かも。', romaji:'', korean:'발만이라면 어떻게든… 전신은 무리일 것 같아.', english:'My feet are just barely manageable… full body might be too much.', tip:'なんとか = 어떻게든' },
  { id:'cp2v2_b3', speaker:'B', japanese:'女湯はぬるめでとっても気持ちいいわよ！', romaji:'', korean:'여탕은 미지근해서 너무 기분 좋아!', english:'The women\'s side is a bit cooler and feels amazing!', tip:'ぬるめ = 미지근한 편 (열탕의 반대)' },
  { id:'cp2v2_a4', speaker:'A', japanese:'うらやましい…出てから飲み物飲もう。', romaji:'', korean:'부럽다… 나와서 음료 마시자.', english:'So jealous… Let\'s grab a drink after we\'re out.', tip:'うらやましい = 부럽다' },
  { id:'cp2v2_b4', speaker:'B', japanese:'温泉上がりのコーヒー牛乳、最高よ。', romaji:'', korean:'온천 후 커피우유, 최고야.', english:'Coffee milk after an onsen is the best.', tip:'コーヒー牛乳(ぎゅうにゅう) = 커피우유 (온천 후 정석)' },
  { id:'cp2v2_a5', speaker:'A', japanese:'それだけ楽しみにして、もう少しがんばる！', romaji:'', korean:'그것만 기대하고 좀 더 버텨볼게!', english:'I\'ll hold out a little longer just for that!', tip:'楽しみにして = 기대하고' },

  // ── cp2v3: 온천 후 마사지 예약 ────────────────────────────
  { id:'cp2v3_n', speaker:'N', japanese:'温泉を出た後、フロントにマッサージの案内があった。', romaji:'', korean:'📍 온천을 나온 후, 프론트에 마사지 안내가 있었다.', english:'📍 After the hot spring, they spotted a massage menu at the front desk.' },
  { id:'cp2v3_b1', speaker:'B', japanese:'マッサージのメニュー見て！体全体60分コースがあるよ！', romaji:'', korean:'마사지 메뉴 봐! 전신 60분 코스가 있어!', english:'Look at the massage menu! There\'s a 60-minute full-body course!', tip:'体全体(からだぜんたい) = 전신' },
  { id:'cp2v3_a1', speaker:'A', japanese:'いくら？高くない？', romaji:'', korean:'얼마야? 비싸지 않아?', english:'How much? Isn\'t it expensive?', tip:'高い(たかい) = 비싸다 (가격)' },
  { id:'cp2v3_b2', speaker:'B', japanese:'8000円。でも旅行中だし、特別でしょ？', romaji:'', korean:'8000엔. 그래도 여행 중이니까, 특별하잖아?', english:'8,000 yen. But we\'re on vacation, so it\'s special, right?', tip:'特別(とくべつ) = 특별한' },
  { id:'cp2v3_a2', speaker:'A', japanese:'わかった。予約、お願いしてみよう。すみません！', romaji:'', korean:'알겠어. 예약 부탁해 보자. 실례합니다!', english:'OK. Let\'s try booking. Excuse me!', tip:'予約(よやく) = 예약' },
  { id:'cp2v3_b3', speaker:'B', japanese:'（フロントに）マッサージ、2名で予約できますか？', romaji:'', korean:'(프론트에) 마사지 두 명 예약할 수 있나요?', english:'(to the front desk) Can we book a massage for two?', tip:'2名(にめい) = 2명' },
  { id:'cp2v3_a3', speaker:'A', japanese:'何時がいいですか？今から30分後はどうですか？', romaji:'', korean:'몇 시가 좋아요? 지금부터 30분 후는 어때요?', english:'What time works? How about 30 minutes from now?', tip:'〜後(ご) = ~후' },
  { id:'cp2v3_b4', speaker:'B', japanese:'部屋番号は？〇〇号室です。', romaji:'', korean:'방 번호는? ○○호실이에요.', english:'Room number? It\'s room ○○.', tip:'〇号室(ごうしつ) = ~호실' },
  { id:'cp2v3_a4', speaker:'A', japanese:'ありがとうございます。楽しみにしています。', romaji:'', korean:'감사합니다. 기대하고 있을게요.', english:'Thank you. We\'re looking forward to it.', tip:'楽しみにしています = 기대하고 있어요 (정중 표현)' },
  { id:'cp2v3_a5', speaker:'A', japanese:'これは正解だったかも。温泉＋マッサージ、最高。', romaji:'', korean:'이건 정답이었을 수도. 온천+마사지, 최고야.', english:'This might have been the right call. Onsen + massage = perfection.', tip:'正解(せいかい) = 정답, 올바른 선택' },

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

  // ══════════════════════════════════════════════════════════
  //  승현 & 주영 시리즈 (sh1~sh9)
  //  A = 승현(남편, 프로그래머, 188cm/100kg+/3XL/발300)
  //  B = 주영(아내, IT기획자, 일본어 능통, LG팬)
  //  C = 제3자(점원·직원·친구 등)
  // ══════════════════════════════════════════════════════════

  // ── sh1: 대한항공 인천공항 체크인 ──────────────────────────
  { id:'sh1_n', speaker:'N', japanese:'仁川国際空港、大韓航空カウンター。スヒョンとジュヨンは成田行きのフライトにチェックインしようとしている。', romaji:'', korean:'📍 인천국제공항, 대한항공 카운터. 승현과 주영은 나리타행 항공편에 체크인하려 하고 있다.' },
  { id:'sh1_c1', speaker:'C', japanese:'いらっしゃいませ。パスポートとeチケットをご用意ください。', romaji:'', korean:'어서 오세요. 여권과 e티켓을 준비해주세요.', tip:'eチケット(イーチケット) = 전자 항공권' },
  { id:'sh1_a1', speaker:'A', japanese:'はい、どうぞ。あの、非常口の席は空いていますか？足が長くて…。', romaji:'', korean:'네, 여기요. 저기, 비상구 좌석은 비어 있나요? 다리가 길어서요….', tip:'非常口(ひじょうぐち) = 비상구 / 足が長い(あしがながい) = 다리가 길다' },
  { id:'sh1_c2', speaker:'C', japanese:'非常口席をご希望ですか。体重と身長をお聞きしてもよろしいでしょうか？', romaji:'', korean:'비상구 좌석을 원하시나요? 체중과 신장을 여쭤봐도 될까요?', tip:'体重(たいじゅう) = 체중 / 身長(しんちょう) = 신장·키' },
  { id:'sh1_a2', speaker:'A', japanese:'（小声で）188センチ、えーと…105キロです。（ジュヨンを見る）', romaji:'', korean:'(작은 소리로) 188센치, 음…105킬로그램입니다. (주영을 바라본다)', tip:'小声(こごえ) = 작은 소리 / えーと = 음… (망설이는 표현)' },
  { id:'sh1_b1', speaker:'B', japanese:'（笑いをこらえて）正直に言ったね。珍しい。', romaji:'', korean:'(웃음을 참으며) 솔직하게 말했네. 신기해라.', tip:'笑いをこらえる(わらいをこらえる) = 웃음을 참다 / 珍しい(めずらしい) = 신기하다' },
  { id:'sh1_c3', speaker:'C', japanese:'ありがとうございます。非常口席は14Aと14Cが空いております。通路側もご案内できます。', romaji:'', korean:'감사합니다. 비상구 좌석은 14A와 14C가 비어 있습니다. 통로 측도 안내해드릴 수 있어요.', tip:'通路側(つうろがわ) = 통로 측 / 窓側(まどがわ) = 창가 측' },
  { id:'sh1_a3', speaker:'A', japanese:'14Aをお願いします！隣も妻の席にしてもらえますか？', romaji:'', korean:'14A로 부탁드립니다! 옆자리도 아내 자리로 해주실 수 있나요?', tip:'隣(となり) = 옆, 이웃 / 妻(つま) = 아내' },
  { id:'sh1_c4', speaker:'C', japanese:'かしこまりました。お荷物はおいくつですか？', romaji:'', korean:'알겠습니다. 짐은 몇 개이신가요?', tip:'かしこまりました = 알겠습니다 (정중한 표현) / お荷物(おにもつ) = 짐' },
  { id:'sh1_b2', speaker:'B', japanese:'スーツケース2個です。あ、重さは大丈夫かな…돈키호테で買いすぎたかも。', romaji:'', korean:'캐리어 2개입니다. 아, 무게는 괜찮으려나… 돈키호테에서 너무 많이 샀을지도.', tip:'買いすぎる(かいすぎる) = 너무 많이 사다 / 〜かも = ~일지도' },
  { id:'sh1_a4', speaker:'A', japanese:'（ドキドキしながら）23キロ以内だよな？超えたら追加料金かかるぞ。', romaji:'', korean:'(두근두근하며) 23킬로 이하지? 초과하면 추가 요금이 생기는데.', tip:'超える(こえる) = 초과하다 / 追加料金(ついかりょうきん) = 추가 요금' },
  { id:'sh1_c5', speaker:'C', japanese:'（スケールで計測）24.5キロです。お客様、1.5キロオーバーしております。', romaji:'', korean:'(저울로 측정) 24.5킬로그램입니다. 고객님, 1.5킬로 초과하셨습니다.', tip:'オーバー = 오버, 초과 / 計測する(けいそくする) = 측정하다' },
  { id:'sh1_b3', speaker:'B', japanese:'（スヒョンに）だから言ったじゃない！あのラーメン鍋セット、絶対重かったのよ！', romaji:'', korean:'(승현에게) 그러니까 내가 말했잖아! 그 라면 냄비 세트, 확실히 무거웠던 거야!', tip:'だから = 그러니까 / 絶対(ぜったい) = 확실히, 반드시' },
  { id:'sh1_a5', speaker:'A', japanese:'（バッグからラーメンを取り出しながら）じゃあ、これを手荷物に移せばいい？', romaji:'', korean:'(가방에서 라면을 꺼내면서) 그럼, 이걸 기내 수하물로 옮기면 돼?', tip:'手荷物(てにもつ) = 기내 수하물 / 移す(うつす) = 옮기다' },
  { id:'sh1_b4', speaker:'B', japanese:'そういうことじゃないけど…まあいいか。ありがとうございます！', romaji:'', korean:'그런 게 아니긴 한데… 뭐 됐어. 감사합니다!', tip:'そういうことじゃない = 그런 게 아니야 / まあいいか = 뭐 됐어' },

  // ── sh1v2: 수하물 찾기 대소동 ────────────────────────────
  { id:'sh1v2_n', speaker:'N', japanese:'成田空港に到着。手荷物受取所でスヒョンのスーツケースがなかなか出てこない。', romaji:'', korean:'📍 나리타 공항 도착. 수하물 찾는 곳에서 승현의 캐리어가 좀처럼 나오지 않는다.' },
  { id:'sh1v2_a1', speaker:'A', japanese:'おかしいな、もう20分待ってる。他の人のは全部出てきたのに。', romaji:'', korean:'이상하다, 이미 20분 기다리고 있어. 다른 사람 건 다 나왔는데.', tip:'おかしい = 이상하다 / 〜のに = ~인데 (대조)' },
  { id:'sh1v2_b1', speaker:'B', japanese:'迷子荷物になったかも。カウンターに行って聞いてみよう。', romaji:'', korean:'미아 짐이 된 것 같아. 카운터에 가서 물어봐.', tip:'迷子(まいご) = 미아 / 荷物(にもつ) = 짐' },
  { id:'sh1v2_a2', speaker:'A', japanese:'（カウンターで）すみません、荷物がまだ出てきてないんですが…。', romaji:'', korean:'(카운터에서) 실례합니다, 짐이 아직 안 나왔는데요….', tip:'〜がまだ出てきていない = ~가 아직 나오지 않았다' },
  { id:'sh1v2_c1', speaker:'C', japanese:'タグ番号をお教えください。確認いたします。', romaji:'', korean:'태그 번호를 알려주세요. 확인해드리겠습니다.', tip:'タグ番号(たぐばんごう) = 태그 번호 / 確認(かくにん) = 확인' },
  { id:'sh1v2_a3', speaker:'A', japanese:'（タグを見せながら）これです。KE714便のソウル発です。', romaji:'', korean:'(태그를 보여주며) 이거예요. KE714편 서울 출발입니다.', tip:'〜便(びん) = ~편 (항공편) / 〜発(はつ) = ~발, 출발' },
  { id:'sh1v2_c2', speaker:'C', japanese:'少々お待ちください。…サイズが大きいため別ルートで搬送されています。まもなく到着します。', romaji:'', korean:'잠시만 기다려주세요. …사이즈가 크기 때문에 별도 경로로 운반되고 있습니다. 곧 도착합니다.', tip:'搬送(はんそう) = 운반 / まもなく = 곧, 이윽고' },
  { id:'sh1v2_b2', speaker:'B', japanese:'（スヒョンに）サイズが大きすぎたのよ！買いすぎだって言ったでしょ！', romaji:'', korean:'(승현에게) 사이즈가 너무 컸던 거야! 너무 많이 샀다고 했잖아!', tip:'〜すぎ = 너무 ~ / 言ったでしょ(いったでしょ) = 말했잖아' },
  { id:'sh1v2_a4', speaker:'A', japanese:'（そっと）もうラーメン鍋は持って帰らない…絶対。', romaji:'', korean:'(조용히) 다시는 라면 냄비는 들고 안 와… 절대.', tip:'そっと = 조용히, 살짝 / もう〜ない = 다시는 ~하지 않는다' },

  // ── sh2: 스시로 회전초밥 ─────────────────────────────────
  { id:'sh2_n', speaker:'N', japanese:'銀座のスシローに到着。回転ずしは久しぶりのスヒョン、目がキラキラしている。', romaji:'', korean:'📍 긴자 스시로 도착. 회전초밥이 오랜만인 승현, 눈이 반짝반짝하고 있다.' },
  { id:'sh2_a1', speaker:'A', japanese:'やった！スシローだ！何皿食べようかな。20皿は余裕だよね。', romaji:'', korean:'야호! 스시로다! 몇 접시 먹을까. 20접시는 여유지?', tip:'何皿(なんさら) = 몇 접시 / 余裕(よゆう) = 여유' },
  { id:'sh2_b1', speaker:'B', japanese:'20皿？！恥ずかしいから控えて！ほどほどにしなさい。', romaji:'', korean:'20접시?! 창피하니까 자중해! 적당히 해.', tip:'恥ずかしい(はずかしい) = 창피하다 / ほどほどに = 적당히' },
  { id:'sh2_c1', speaker:'C', japanese:'いらっしゃいませ！何名様ですか？', romaji:'', korean:'어서 오세요! 몇 분이세요?', tip:'何名様(なんめいさま) = 몇 분 (정중한 표현)' },
  { id:'sh2_a2', speaker:'A', japanese:'2名です。カウンター席でもいいですか？レーンが近い方がいいので。', romaji:'', korean:'2명입니다. 카운터 자리도 괜찮나요? 레인 가까운 게 좋아서요.', tip:'カウンター席(かうんたーせき) = 카운터 자리 / レーン = 레인, 레일' },
  { id:'sh2_c2', speaker:'C', japanese:'かしこまりました。こちらへどうぞ。タッチパネルで追加注文もできます。', romaji:'', korean:'알겠습니다. 이쪽으로 오세요. 터치패널로 추가 주문도 하실 수 있어요.', tip:'タッチパネル = 터치패널 / 追加注文(ついかちゅうもん) = 추가 주문' },
  { id:'sh2_a3', speaker:'A', japanese:'（目をキラキラさせて）まずサーモン！マグロ！えび！全部頼んでいい？', romaji:'', korean:'(눈을 반짝이며) 먼저 연어! 참치! 새우! 다 시켜도 돼?', tip:'サーモン = 연어 / マグロ = 참치 / えび = 새우' },
  { id:'sh2_b2', speaker:'B', japanese:'落ち着いて！一個ずつ食べてから次を頼みなさい。', romaji:'', korean:'진정해! 하나씩 먹고 나서 다음 걸 시켜.', tip:'落ち着く(おちつく) = 진정하다, 침착하다 / 一個ずつ(いっこずつ) = 하나씩' },
  { id:'sh2_a4', speaker:'A', japanese:'（5皿食べてアサヒを注文）やっぱり寿司にはアサヒだよな。', romaji:'', korean:'(5접시 먹고 아사히를 주문) 역시 초밥엔 아사히지.', tip:'やっぱり = 역시 / アサヒ = 아사히 (맥주 브랜드)' },
  { id:'sh2_b3', speaker:'B', japanese:'ビールも飲むの？じゃあ私が帰りの電車、チェックしとくね。', romaji:'', korean:'맥주도 마시는 거야? 그럼 내가 귀가 전철 체크해놓을게.', tip:'〜とく = ~해놓다 (て+おく의 축약형)' },
  { id:'sh2_a5', speaker:'A', japanese:'（17皿目を取りながら）あと3皿で20皿達成だ！', romaji:'', korean:'(17번째 접시를 집으며) 3접시 더 하면 20접시 달성이다!', tip:'達成(たっせい) = 달성 / 〜目(め) = ~번째' },
  { id:'sh2_b4', speaker:'B', japanese:'（呆れて）私は3皿しか食べてないのに…コスパの格差がすごい。', romaji:'', korean:'(어이없어하며) 나는 3접시밖에 안 먹었는데… 가성비 격차가 대단하네.', tip:'コスパ = 가성비 / 格差(かくさ) = 격차' },
  { id:'sh2_a6', speaker:'A', japanese:'（お会計）20皿食べたのに2人で5,200円か。最高だな！', romaji:'', korean:'(계산) 20접시 먹었는데 2인 5,200엔이네. 최고야!', tip:'お会計(おかいけい) = 계산 / 最高(さいこう) = 최고' },
  { id:'sh2_b5', speaker:'B', japanese:'私の3皿分は完全に損した気分…。次はもっと食べる！', romaji:'', korean:'내 3접시분은 완전히 손해 본 기분… 다음엔 더 먹을 거야!', tip:'損する(そんする) = 손해 보다 / もっと = 더' },

  // ── sh2v2: 스시로 태블릿 특별 주문 ─────────────────────────
  { id:'sh2v2_n', speaker:'N', japanese:'スシローで初めてタッチパネル注文に挑戦するスヒョン。', romaji:'', korean:'📍 스시로에서 처음으로 터치패널 주문에 도전하는 승현.' },
  { id:'sh2v2_a1', speaker:'A', japanese:'このパネル、どうやって使うの？日本語しか書いてない。', romaji:'', korean:'이 패널, 어떻게 사용해? 일본어만 써 있어.', tip:'パネル = 패널 / 〜しか書いてない = ~밖에 안 쓰여 있다' },
  { id:'sh2v2_b1', speaker:'B', japanese:'貸して。まず「にぎり」を選んで、ネタを選ぶの。', romaji:'', korean:'줘봐. 먼저 "니기리"를 선택하고, 재료를 고르는 거야.', tip:'ネタ = 스시 재료 (초밥 위에 올리는 것) / 〜を選ぶ(えらぶ) = ~을 선택하다' },
  { id:'sh2v2_a2', speaker:'A', japanese:'（パネルを見て）うにが2貫で480円か。高い！でも食べたい！', romaji:'', korean:'(패널을 보며) 성게알이 2개에 480엔이네. 비싸! 그래도 먹고 싶어!', tip:'うに = 성게알 / 〜貫(かん) = ~개 (초밥 세는 단위)' },
  { id:'sh2v2_b2', speaker:'B', japanese:'1皿だけね！それ以上は禁止。', romaji:'', korean:'1접시만! 그 이상은 금지.', tip:'禁止(きんし) = 금지 / 〜だけ = ~만' },
  { id:'sh2v2_a3', speaker:'A', japanese:'（注文完了）やった！来た来た！うん、やっぱりうまい！', romaji:'', korean:'(주문 완료) 야호! 왔다 왔다! 음, 역시 맛있어!', tip:'うまい = 맛있다 (남성이 주로 쓰는 구어) / やっぱり = 역시' },
  { id:'sh2v2_b3', speaker:'B', japanese:'ちょっと、せめて一個くれない？試食するくらい良いじゃない。', romaji:'', korean:'야, 적어도 하나는 줄 수 없어? 맛 보는 정도는 괜찮잖아.', tip:'せめて = 적어도, 최소한 / 試食(ししょく) = 시식' },
  { id:'sh2v2_a4', speaker:'A', japanese:'（渋々渡しながら）一個だけだよ！', romaji:'', korean:'(마지못해 주면서) 하나만이야!', tip:'渋々(しぶしぶ) = 마지못해, 억지로' },

  // ── sh3: 긴자 유니클로 3XL 탐색 ───────────────────────────
  { id:'sh3_n', speaker:'N', japanese:'銀座ユニクロ旗艦店。スヒョンは3XLサイズの服を探している。', romaji:'', korean:'📍 긴자 유니클로 플래그십 스토어. 승현은 3XL 사이즈 옷을 찾고 있다.' },
  { id:'sh3_b1', speaker:'B', japanese:'ここのユニクロ、大きいサイズも豊富なんだって！', romaji:'', korean:'여기 유니클로, 큰 사이즈도 풍부하대!', tip:'豊富(ほうふ) = 풍부함 / 大きいサイズ(おおきいさいず) = 큰 사이즈' },
  { id:'sh3_a1', speaker:'A', japanese:'本当に？いつも3XLが全然ないんだよね。期待しないようにしてる。', romaji:'', korean:'정말? 항상 3XL이 전혀 없거든. 기대 안 하려고 해.', tip:'全然(ぜんぜん) = 전혀 / 期待する(きたいする) = 기대하다' },
  { id:'sh3_c1', speaker:'C', japanese:'いらっしゃいませ。何かお探しですか？', romaji:'', korean:'어서 오세요. 뭔가 찾으시는 게 있나요?', tip:'何か(なにか) = 무언가 / お探し(おさがし) = 찾으시는 것' },
  { id:'sh3_a2', speaker:'A', japanese:'フリースジャケットの3XLはありますか？あと、パンツのウエスト100以上も。', romaji:'', korean:'플리스 재킷 3XL 있나요? 그리고 바지 허리 100 이상도요.', tip:'フリース = 플리스 / ウエスト = 허리 사이즈' },
  { id:'sh3_c2', speaker:'C', japanese:'3XLは今シーズン限定で3Fにございます。パンツは2Fの「ビッグサイズコーナー」へどうぞ。', romaji:'', korean:'3XL은 이번 시즌 한정으로 3층에 있습니다. 바지는 2층 "빅사이즈 코너"로 가세요.', tip:'今シーズン限定(こんしーずんげんてい) = 이번 시즌 한정 / ビッグサイズ = 빅사이즈' },
  { id:'sh3_a3', speaker:'A', japanese:'（3Fで）あった！3XLのフリース！色は黒しかないけど、まあいいか。', romaji:'', korean:'(3층에서) 있다! 3XL 플리스! 색은 검정밖에 없지만, 뭐 괜찮아.', tip:'〜しかない = ~밖에 없다 / まあいいか = 뭐 됐어' },
  { id:'sh3_b2', speaker:'B', japanese:'試着してみて。入口のフィッティングルームに案内してもらおう。', romaji:'', korean:'입어봐. 입구 피팅룸으로 안내받자.', tip:'試着(しちゃく) = 입어봄, 시착 / フィッティングルーム = 피팅룸' },
  { id:'sh3_a4', speaker:'A', japanese:'（試着後）ぴったり！でもチャックがちょっとキツいかも。', romaji:'', korean:'(착용 후) 딱 맞아! 근데 지퍼가 좀 빡빡한 것 같아.', tip:'ぴったり = 딱 맞다 / チャック = 지퍼' },
  { id:'sh3_b3', speaker:'B', japanese:'3XLでも胸まわりが少し小さいの？体形のせいだよ、筋肉だもん。', romaji:'', korean:'3XL도 가슴둘레가 조금 작은 거야? 체형 때문이야, 근육이잖아.', tip:'胸まわり(むねまわり) = 가슴둘레 / 筋肉(きんにく) = 근육' },
  { id:'sh3_a5', speaker:'A', japanese:'筋肉ね…。（2Fへ）ウエスト100のジーンズあった！足丈もちょうどいい。', romaji:'', korean:'근육이라고…. (2층에서) 허리 100 청바지 있다! 기장도 딱 맞아.', tip:'足丈(あしたけ) = 바짓단 길이 / ちょうどいい = 딱 알맞다' },
  { id:'sh3_b4', speaker:'B', japanese:'よかった！今日はフリースとジーンズだけにして。買いすぎダメよ。', romaji:'', korean:'다행이야! 오늘은 플리스랑 청바지만. 너무 많이 사면 안 돼.', tip:'〜だけにして = ~만으로 해 / 買いすぎ(かいすぎ) = 너무 많이 삼' },
  { id:'sh3_a6', speaker:'A', japanese:'（レジで）え、合計17,900円？日本で服買うのって安いな！', romaji:'', korean:'(계산대에서) 어, 합계 17,900엔? 일본에서 옷 사는 게 싸네!', tip:'合計(ごうけい) = 합계 / レジ = 계산대' },

  // ── sh3v2: 유니클로 신발 사이즈 문제 ─────────────────────
  { id:'sh3v2_n', speaker:'N', japanese:'ユニクロの靴コーナー。スヒョンは靴のサイズが心配だ。', romaji:'', korean:'📍 유니클로 신발 코너. 승현은 신발 사이즈가 걱정이다.' },
  { id:'sh3v2_a1', speaker:'A', japanese:'スニーカーもほしいな。30センチってあるかな？', romaji:'', korean:'스니커즈도 갖고 싶은데. 30센치 있으려나?', tip:'スニーカー = 스니커즈 / 〜センチ = ~센치미터' },
  { id:'sh3v2_b1', speaker:'B', japanese:'ユニクロに靴はないよ！GUに行けば？向こうに靴があるかも。', romaji:'', korean:'유니클로에 신발은 없어! GU 가봐? 저기에 신발이 있을지도.', tip:'GU = 지유 (유니클로 계열 브랜드) / 向こう(むこう) = 저쪽, 저기' },
  { id:'sh3v2_a2', speaker:'A', japanese:'GUか。30センチの靴って日本にほぼないよね。通販で買うしかないのかな。', romaji:'', korean:'GU구나. 30센치 신발은 일본에 거의 없잖아. 통판으로 살 수밖에 없는 건가.', tip:'通販(つうはん) = 통판, 인터넷 쇼핑 / 〜しかない = ~할 수밖에 없다' },
  { id:'sh3v2_b2', speaker:'B', japanese:'ABCマートに30センチがあったよ。前に調べた。新宿店なら在庫ありそう。', romaji:'', korean:'ABC마트에 30센치 있었어. 전에 찾아봤거든. 신주쿠점이면 재고 있을 것 같아.', tip:'在庫(ざいこ) = 재고 / ABCマート = ABC마트 (일본 신발 체인점)' },
  { id:'sh3v2_a3', speaker:'A', japanese:'さすが！よく調べてるね。じゃあ新宿に行ってみよう。', romaji:'', korean:'역시! 잘 알아봤네. 그럼 신주쿠에 가보자.', tip:'さすが = 역시, 과연 / よく調べる(しらべる) = 잘 알아보다' },

  // ── sh4: 패밀리마트 아이코스 구매 ────────────────────────────
  { id:'sh4_n', speaker:'N', japanese:'浅草のファミリーマート。スヒョンはIQOSのスティックを買いたい。', romaji:'', korean:'📍 아사쿠사 패밀리마트. 승현은 아이코스 스틱을 사고 싶다.' },
  { id:'sh4_a1', speaker:'A', japanese:'ちょっとコンビニ寄っていい？IQOSのスティックが切れちゃって。', romaji:'', korean:'잠깐 편의점 들러도 돼? 아이코스 스틱이 떨어져서.', tip:'〜が切れる(きれる) = ~이 떨어지다, 소진되다 / 寄る(よる) = 들르다' },
  { id:'sh4_b1', speaker:'B', japanese:'ここに煙草売ってるかな？日本、たしか年齢確認があるよね。', romaji:'', korean:'여기 담배 파나? 일본, 아마 연령 확인이 있잖아.', tip:'年齢確認(ねんれいかくにん) = 연령 확인 / たしか = 아마, 분명히' },
  { id:'sh4_a2', speaker:'A', japanese:'（レジで）すみません、IQOSのスティック、HEETSありますか？', romaji:'', korean:'(계산대에서) 실례합니다, 아이코스 스틱, HEETS 있나요?', tip:'IQOS(アイコス) = 아이코스 / HEETS(ヒーツ) = 히츠 (아이코스 전용 스틱)' },
  { id:'sh4_c1', speaker:'C', japanese:'はい、ございます。こちらのタブレットで年齢確認をお願いします。', romaji:'', korean:'네, 있습니다. 이쪽 태블릿에서 연령 확인을 해주세요.', tip:'タブレット = 태블릿 / 年齢確認(ねんれいかくにん) = 연령 확인' },
  { id:'sh4_a3', speaker:'A', japanese:'（タブレットをタップ）「成年ですか？」…「はい」を押せばいい？', romaji:'', korean:'(태블릿을 탭하며) "성인이십니까?"… "예"를 누르면 돼?', tip:'成年(せいねん) = 성년, 성인 / 〜を押す(おす) = ~을 누르다' },
  { id:'sh4_b2', speaker:'B', japanese:'（笑いながら）50代が成年確認するって、ちょっと面白いね。', romaji:'', korean:'(웃으며) 50대가 성년 확인하다니, 좀 웃기네.', tip:'50代(ごじゅうだい) = 50대 / 面白い(おもしろい) = 재미있다, 웃기다' },
  { id:'sh4_c2', speaker:'C', japanese:'HEETSはどのフレーバーにしますか？テリアブルー、アンバー、ターコイズがあります。', romaji:'', korean:'HEETS는 어떤 플레이버로 하시겠어요? 테리아 블루, 앰버, 터콰이즈가 있어요.', tip:'フレーバー = 플레이버, 맛 종류' },
  { id:'sh4_a4', speaker:'A', japanese:'テリアブルーを2箱ください。あ、あとアサヒも1缶！', romaji:'', korean:'테리아 블루 2갑 주세요. 아, 그리고 아사히도 1캔!', tip:'2箱(ふたはこ) = 2갑 / 1缶(いっかん) = 1캔' },
  { id:'sh4_b3', speaker:'B', japanese:'コンビニ寄っただけなのに、なんで缶ビールまで…。', romaji:'', korean:'편의점 잠깐 들른 건데, 왜 캔맥주까지….', tip:'〜だけなのに = ~뿐인데 / なんで = 왜 (구어)' },
  { id:'sh4_a5', speaker:'A', japanese:'（店を出て）吸う場所ってどこにあるんだろう？', romaji:'', korean:'(가게를 나오며) 피우는 곳은 어디에 있는 걸까?', tip:'吸う場所(すうばしょ) = 흡연 장소 / 〜だろう = ~일까 (추측)' },
  { id:'sh4_b4', speaker:'B', japanese:'日本、指定喫煙所じゃないと吸えないよ。地図見てみる。', romaji:'', korean:'일본, 지정 흡연 구역이 아니면 피울 수 없어. 지도 봐볼게.', tip:'指定喫煙所(していきつえんじょ) = 지정 흡연 구역 / 〜じゃないと = ~이 아니면' },
  { id:'sh4_a6', speaker:'A', japanese:'（ため息）韓国みたいに気軽に吸えないんだな。まあ、ルールはルールか。', romaji:'', korean:'(한숨) 한국처럼 편하게 피울 수 없구나. 뭐, 규칙은 규칙이지.', tip:'気軽に(きがるに) = 편하게, 부담 없이 / ルール = 규칙' },

  // ── sh5: 시부야 이자카야 (주영의 일본인 친구 사쿠라와) ──────
  { id:'sh5_n', speaker:'N', japanese:'渋谷の居酒屋。ジュヨンの日本人の友達、サクラさんと3人で飲んでいる。', romaji:'', korean:'📍 시부야 이자카야. 주영의 일본인 친구 사쿠라 씨와 셋이서 마시고 있다.' },
  { id:'sh5_c1', speaker:'C', japanese:'ジュヨンちゃん、久しぶり！今日はスヒョンさんも一緒なのね！', romaji:'', korean:'주영아, 오랜만이야! 오늘은 승현 씨도 같이네!', tip:'久しぶり(ひさしぶり) = 오랜만이야 / 〜も一緒に(いっしょに) = ~도 함께' },
  { id:'sh5_b1', speaker:'B', japanese:'サクラ！元気だった？スヒョンは日本語の練習中だから、たまに話しかけてあげて。', romaji:'', korean:'사쿠라! 잘 지냈어? 승현이는 일본어 연습 중이니까, 가끔 말 걸어줘.', tip:'練習中(れんしゅうちゅう) = 연습 중 / 話しかける(はなしかける) = 말을 걸다' },
  { id:'sh5_a1', speaker:'A', japanese:'（緊張気味に）よ、よろしくお願いします！日本語、まだ下手ですが…', romaji:'', korean:'(긴장하며) 저, 잘 부탁드립니다! 일본어, 아직 서투르지만….', tip:'下手(へた) = 서투른, 못하는 / 緊張(きんちょう) = 긴장' },
  { id:'sh5_c2', speaker:'C', japanese:'大丈夫！私、韓国語も少し話せるから。乾杯しましょう！', romaji:'', korean:'괜찮아! 나도 한국어 조금 할 수 있으니까. 건배하자!', tip:'乾杯(かんぱい) = 건배 / 〜も少し = ~도 조금' },
  { id:'sh5_a2', speaker:'A', japanese:'（焼酎を見て）これ、芋焼酎ですか？韓国のソジュとどう違うんですか？', romaji:'', korean:'(소주를 보며) 이거, 고구마 소주인가요? 한국 소주랑 어떻게 달라요?', tip:'芋焼酎(いもじょうちゅう) = 고구마 소주 / 〜と違う(ちがう) = ~와 다르다' },
  { id:'sh5_c3', speaker:'C', japanese:'韓国のソジュは甘めだけど、芋焼酎はもっと香りが強くて、コクがあるよ。', romaji:'', korean:'한국 소주는 좀 달지만, 고구마 소주는 향이 더 강하고 깊은 맛이 있어.', tip:'甘め(あまめ) = 좀 달다 / コク = 깊은 맛, 풍미' },
  { id:'sh5_a3', speaker:'A', japanese:'（一口飲んで）なるほど！これ、うまいな。もう一杯！', romaji:'', korean:'(한 모금 마시고) 그렇구나! 이거, 맛있다. 한 잔 더!', tip:'一口(ひとくち) = 한 모금 / なるほど = 그렇구나' },
  { id:'sh5_b2', speaker:'B', japanese:'（サクラに）彼は飲み始めると止まらないの。ご注意ください。', romaji:'', korean:'(사쿠라에게) 이 사람 마시기 시작하면 멈추질 않아. 주의하세요.', tip:'飲み始める(のみはじめる) = 마시기 시작하다 / 止まらない(とまらない) = 멈추지 않다' },
  { id:'sh5_c4', speaker:'C', japanese:'スヒョンさん、LGファンって聞いたんだけど、日本の野球も好きですか？', romaji:'', korean:'승현 씨, LG 팬이라고 들었는데, 일본 야구도 좋아해요?', tip:'LGファン = LG 팬 / 日本の野球(にほんのやきゅう) = 일본 야구' },
  { id:'sh5_a4', speaker:'A', japanese:'（ジュヨンを指して）LGファンはこっちです！私はバスケが好きで…。', romaji:'', korean:'(주영을 가리키며) LG 팬은 이쪽이에요! 저는 농구를 좋아해서요….', tip:'〜を指す(さす) = ~를 가리키다 / バスケ = 농구' },
  { id:'sh5_b3', speaker:'B', japanese:'（サクラに）そうなの。私がLG狂だから、東京ドームにDeNA戦見に行ったこともあるよ。', romaji:'', korean:'(사쿠라에게) 맞아. 내가 LG 광팬이라서, 도쿄돔에 DeNA 경기 보러 간 적도 있어.', tip:'〜狂(きょう) = ~광, 열성 팬 / 〜したことがある = ~한 적이 있다' },
  { id:'sh5_c5', speaker:'C', japanese:'すごい！じゃあ今度、横浜スタジアムに一緒に行こう！', romaji:'', korean:'대단해! 그럼 다음에, 요코하마 스타디움에 같이 가자!', tip:'横浜スタジアム(よこはまスタジアム) = 요코하마 스타디움 (DeNA 베이스타즈 홈구장)' },
  { id:'sh5_b4', speaker:'B', japanese:'行く行く！スヒョンはどう？一緒に来る？', romaji:'', korean:'갈게 갈게! 승현은 어때? 같이 올 거야?', tip:'どう = 어때 / 一緒に来る(いっしょにくる) = 함께 오다' },
  { id:'sh5_a5', speaker:'A', japanese:'（渋々）…わかった、行くよ。ビールさえあれば野球も楽しめる。', romaji:'', korean:'(마지못해) …알겠어, 갈게. 맥주만 있으면 야구도 즐길 수 있어.', tip:'渋々(しぶしぶ) = 마지못해 / 〜さえあれば = ~만 있으면' },

  // ── sh6: 고템바 프리미엄 아울렛 ──────────────────────────
  { id:'sh6_n', speaker:'N', japanese:'御殿場プレミアム・アウトレット。富士山が見える快晴の日。', romaji:'', korean:'📍 고템바 프리미엄 아울렛. 후지산이 보이는 맑은 날.' },
  { id:'sh6_b1', speaker:'B', japanese:'見て！富士山がくっきり見える！最高のショッピング日和だね！', romaji:'', korean:'봐! 후지산이 선명하게 보여! 최고의 쇼핑 날씨야!', tip:'くっきり = 선명하게 / 日和(びより) = 날씨, ~하기 좋은 날' },
  { id:'sh6_a1', speaker:'A', japanese:'富士山きれいだな。でも今日の目的は富士山じゃなくてノースフェイスだよな。', romaji:'', korean:'후지산 예쁘네. 근데 오늘 목적은 후지산이 아니라 노스페이스지.', tip:'目的(もくてき) = 목적 / ノースフェイス = 노스페이스 (브랜드)' },
  { id:'sh6_b2', speaker:'B', japanese:'私はCoachとかも見たいけど。あ、方向は分かる？地図見せて。', romaji:'', korean:'나는 코치도 보고 싶은데. 아, 방향은 알아? 지도 보여줘.', tip:'Coach(コーチ) = 코치 (브랜드) / 方向(ほうこう) = 방향' },
  { id:'sh6_a2', speaker:'A', japanese:'（地図を見て）ノースフェイスは東エリアだ。Coachは西エリア。完全に逆方向だな。', romaji:'', korean:'(지도를 보며) 노스페이스는 동쪽 구역이네. 코치는 서쪽 구역. 완전히 반대 방향이네.', tip:'東エリア(ひがしえりあ) = 동쪽 구역 / 逆方向(ぎゃくほうこう) = 반대 방향' },
  { id:'sh6_b3', speaker:'B', japanese:'じゃあ先にノースフェイス行って、後でCoach行こう。私も付き合うよ。', romaji:'', korean:'그럼 먼저 노스페이스 가고, 나중에 코치 가자. 나도 같이 갈게.', tip:'先に(さきに) = 먼저 / 付き合う(つきあう) = 같이 하다, 동행하다' },
  { id:'sh6_c1', speaker:'C', japanese:'いらっしゃいませ。3XLをお探しでしょうか？大きいサイズは奥のラックにあります。', romaji:'', korean:'어서 오세요. 3XL을 찾으시나요? 큰 사이즈는 안쪽 선반에 있어요.', tip:'奥(おく) = 안쪽, 깊은 곳 / ラック = 선반, 옷걸이' },
  { id:'sh6_a3', speaker:'A', japanese:'（見ながら）あった！ヌプシジャケットの3XL！定価の30%OFFだ！', romaji:'', korean:'(보면서) 있다! 눕시 재킷 3XL! 정가에서 30% 할인이다!', tip:'定価(ていか) = 정가 / 〜OFF = ~할인' },
  { id:'sh6_b4', speaker:'B', japanese:'試着して。でもまた「ちょっとキツい」って言わないでね。', romaji:'', korean:'입어봐. 근데 또 "좀 빡빡하다"고 하지 마.', tip:'キツい = 빡빡하다, 꽉 끼다' },
  { id:'sh6_a4', speaker:'A', japanese:'（試着後）…ちょっとキツいかも。', romaji:'', korean:'(착용 후) …좀 빡빡한 것 같아.', tip:'ちょっと = 조금, 좀' },
  { id:'sh6_b5', speaker:'B', japanese:'（予想通り）だから言ったじゃない！もう！', romaji:'', korean:'(예상대로) 그러니까 내가 말했잖아! 진짜!', tip:'予想通り(よそうどおり) = 예상대로 / もう = 진짜 (짜증 표현)' },
  { id:'sh6_a5', speaker:'A', japanese:'でも富士山見ながらショッピングって最高だよな。買い物はダメでも景色は100点。', romaji:'', korean:'근데 후지산 보면서 쇼핑하는 거 최고지. 쇼핑은 안 됐어도 경치는 100점.', tip:'景色(けしき) = 경치 / 〜はダメでも = ~은 안 됐어도' },

  // ── sh7: 도쿄돔 야구 ──────────────────────────────────────
  { id:'sh7_n', speaker:'N', japanese:'東京ドーム。読売ジャイアンツvsDeNAベイスターズ。ジュヨンはジャイアンツを応援している。', romaji:'', korean:'📍 도쿄돔. 요미우리 자이언츠 vs DeNA 베이스타즈. 주영은 자이언츠를 응원하고 있다.' },
  { id:'sh7_b1', speaker:'B', japanese:'ジャイアンツ頑張れ！ホームランだ！', romaji:'', korean:'자이언츠 힘내! 홈런이다!', tip:'頑張れ(がんばれ) = 힘내! (응원) / ホームラン = 홈런' },
  { id:'sh7_a1', speaker:'A', japanese:'（驚いて）え？ジュヨン、LGファンなのに、今日はジャイアンツを応援してるの？', romaji:'', korean:'(놀라며) 어? 주영아, LG 팬인데, 오늘은 자이언츠를 응援하는 거야?', tip:'〜のに = ~인데 (대조) / 応援(おうえん) = 응원' },
  { id:'sh7_b2', speaker:'B', japanese:'だって日本に来たらホームチームを応援するのが礼儀でしょ！', romaji:'', korean:'왜냐면 일본에 오면 홈팀을 응원하는 게 예의잖아!', tip:'礼儀(れいぎ) = 예의 / ホームチーム = 홈팀' },
  { id:'sh7_a2', speaker:'A', japanese:'LG狂がジャイアンツを応援するって、LGが聞いたら泣くぞ。', romaji:'', korean:'LG 광팬이 자이언츠를 응원하다니, LG가 들으면 울겠다.', tip:'〜狂(きょう) = ~광팬 / 聞いたら泣く(きいたらなく) = 들으면 울다' },
  { id:'sh7_b3', speaker:'B', japanese:'今日だけ！ドームで食べるから何か買ってきて！', romaji:'', korean:'오늘만! 돔에서 먹을 거 사와!', tip:'〜だけ = ~만 / 買ってきて(かってきて) = 사와' },
  { id:'sh7_a3', speaker:'A', japanese:'（売店で）すみません、唐揚げとビール2つください。アサヒありますか？', romaji:'', korean:'(매점에서) 실례합니다, 가라아게랑 맥주 2개 주세요. 아사히 있나요?', tip:'唐揚げ(からあげ) = 가라아게 (일본식 닭튀김) / 売店(ばいてん) = 매점' },
  { id:'sh7_c1', speaker:'C', japanese:'アサヒは今日品切れで、キリンだけになります。申し訳ありません。', romaji:'', korean:'아사히는 오늘 품절이고, 기린만 있습니다. 죄송합니다.', tip:'品切れ(しなぎれ) = 품절 / 申し訳ありません(もうしわけありません) = 죄송합니다' },
  { id:'sh7_a4', speaker:'A', japanese:'（戻って）アサヒなかった。キリンでいい？', romaji:'', korean:'(돌아와서) 아사히 없었어. 기린 괜찮아?', tip:'キリン = 기린 (맥주 브랜드) / 〜でいい = ~로 괜찮아' },
  { id:'sh7_b4', speaker:'B', japanese:'何でもいい！早く！3回ウラで1点取ったよ！', romaji:'', korean:'아무거나 좋아! 빨리! 3회 말에 1점 득점했어!', tip:'3回ウラ(さんかいうら) = 3회 말 / 得点(とくてん) = 득점' },
  { id:'sh7_a5', speaker:'A', japanese:'（座って乾杯）でも正直、野球よりドームの雰囲気が好きだよ。', romaji:'', korean:'(앉아서 건배) 근데 솔직히, 야구보다 돔 분위기가 좋아.', tip:'雰囲気(ふんいき) = 분위기 / 正直(しょうじき) = 솔직히' },
  { id:'sh7_b5', speaker:'B', japanese:'分かった、次は夫が好きなバスケでも行こう。試合あれば。', romaji:'', korean:'알겠어, 다음엔 남편이 좋아하는 농구라도 가자. 경기 있으면.', tip:'試合(しあい) = 경기 / 〜でも = ~라도' },

  // ── sh8: 이케부쿠로 볼링 ──────────────────────────────────
  { id:'sh8_n', speaker:'N', japanese:'池袋のボウリング場。スヒョンは久しぶりのボウリングに張り切っている。', romaji:'', korean:'📍 이케부쿠로 볼링장. 승현은 오랜만의 볼링에 잔뜩 들뜨고 있다.' },
  { id:'sh8_a1', speaker:'A', japanese:'ボウリング！久しぶりだな。俺、7連続ストライク出したことあるぞ！', romaji:'', korean:'볼링! 오랜만이다. 나, 7연속 스트라이크 낸 적 있어!', tip:'連続(れんぞく) = 연속 / ストライク = 스트라이크' },
  { id:'sh8_b1', speaker:'B', japanese:'10年前のね。今日は普通に楽しめればいいじゃない。', romaji:'', korean:'10년 전 얘기잖아. 오늘은 그냥 즐겁게 하면 되지.', tip:'10年前(じゅうねんまえ) = 10년 전 / 普通に(ふつうに) = 보통으로, 그냥' },
  { id:'sh8_c1', speaker:'C', japanese:'いらっしゃいませ！シューズのサイズは何センチですか？', romaji:'', korean:'어서 오세요! 신발 사이즈가 몇 센치이세요?', tip:'シューズ = 신발 / 〜センチ = ~센치' },
  { id:'sh8_a2', speaker:'A', japanese:'30センチなんですが、大丈夫ですか？', romaji:'', korean:'30센치인데요, 괜찮나요?', tip:'〜なんですが = ~인데요 (확인)' },
  { id:'sh8_c2', speaker:'C', japanese:'（困った顔）最大サイズは28センチなんです…。大変申し訳ありません。', romaji:'', korean:'(곤란한 표정) 최대 사이즈는 28센치입니다…. 정말 죄송합니다.', tip:'最大(さいだい) = 최대 / 申し訳ありません(もうしわけありません) = 죄송합니다' },
  { id:'sh8_b2', speaker:'B', japanese:'（笑いをこらえながら）あっそう。どうする？諦める？', romaji:'', korean:'(웃음을 참으며) 아 그래. 어쩔 거야? 포기해?', tip:'諦める(あきらめる) = 포기하다 / どうする = 어쩔 거야' },
  { id:'sh8_a3', speaker:'A', japanese:'諦めるわけない！靴下のまま、中で28を無理やり入れてみる。', romaji:'', korean:'포기할 리 없어! 양말 그대로, 안에서 28을 억지로 넣어볼게.', tip:'〜わけない = ~할 리 없다 / 無理やり(むりやり) = 억지로' },
  { id:'sh8_b3', speaker:'B', japanese:'（見て）足、はみ出してる！つま先が全然入ってないじゃない！', romaji:'', korean:'(보며) 발이 삐져나왔어! 발가락이 전혀 안 들어갔잖아!', tip:'はみ出す(はみだす) = 삐져나오다 / つま先(つまさき) = 발가락 끝' },
  { id:'sh8_a4', speaker:'A', japanese:'（それでも投げて）ストライク！力だけで勝てるよ、ボウリングは！', romaji:'', korean:'(그래도 던지며) 스트라이크! 힘으로만 이길 수 있어, 볼링은!', tip:'投げる(なげる) = 던지다 / 力(ちから) = 힘' },
  { id:'sh8_b4', speaker:'B', japanese:'（目が点になって）嘘！あの靴で入ったの？！', romaji:'', korean:'(눈이 동그래져서) 말도 안 돼! 그 신발로 쳤어?!', tip:'嘘(うそ) = 거짓말, 말도 안 돼 / 目が点(めがてん) = 눈이 동그래지다' },
  { id:'sh8_a5', speaker:'A', japanese:'コントロールより力だ！最終スコアは俺が勝つ！', romaji:'', korean:'컨트롤보다 힘이다! 최종 스코어는 내가 이긴다!', tip:'コントロール = 컨트롤 / 最終(さいしゅう) = 최종' },
  { id:'sh8_b5', speaker:'B', japanese:'（小声で）でも次のフレーム、ガター3連続だったけどね…。', romaji:'', korean:'(작은 소리로) 근데 다음 프레임, 거터 3연속이었잖아….', tip:'ガター = 거터 (볼링에서 레인 옆 홈으로 빠짐) / フレーム = 프레임' },

  // ── sh9: 하네다 국제선 면세점 ────────────────────────────
  { id:'sh9_n', speaker:'N', japanese:'羽田空港国際線ターミナル、免税エリア。帰国前の最後のショッピング。', romaji:'', korean:'📍 하네다 공항 국제선 터미널, 면세 구역. 귀국 전 마지막 쇼핑.' },
  { id:'sh9_b1', speaker:'B', japanese:'羽田の免税、品揃えがいい！お土産、全部ここで揃えちゃおう。', romaji:'', korean:'하네다 면세, 품목이 다양해! 기념품, 다 여기서 갖춰버리자.', tip:'品揃え(しなそろえ) = 품목 구성, 상품 구색 / 揃える(そろえる) = 갖추다' },
  { id:'sh9_a1', speaker:'A', japanese:'お土産より俺はウイスキーがほしい。山崎か白州、置いてるかな？', romaji:'', korean:'기념품보다 나는 위스키 갖고 싶어. 야마자키나 하쿠슈, 있을까?', tip:'山崎(やまざき) = 야마자키 (산토리 싱글 몰트) / 白州(はくしゅ) = 하쿠슈' },
  { id:'sh9_b2', speaker:'B', japanese:'ウイスキーって重くない？スーツケースまた超えそう。', romaji:'', korean:'위스키 무겁지 않아? 캐리어 또 초과할 것 같은데.', tip:'重い(おもい) = 무겁다 / 超えそう(こえそう) = 초과할 것 같다' },
  { id:'sh9_a2', speaker:'A', japanese:'（免税店で）すみません、山崎12年はありますか？', romaji:'', korean:'(면세점에서) 실례합니다, 야마자키 12년은 있나요?', tip:'12年(じゅうにねん) = 12년 (숙성 연도) / 免税店(めんぜいてん) = 면세점' },
  { id:'sh9_c1', speaker:'C', japanese:'山崎12年は現在品切れでして、山崎NV（ノンヴィンテージ）でしたらございます。', romaji:'', korean:'야마자키 12년은 현재 품절이고, 야마자키 NV(논빈티지)가 있습니다.', tip:'品切れ(しなぎれ) = 품절 / NV = 논빈티지 (연도 표기 없는 제품)' },
  { id:'sh9_a3', speaker:'A', japanese:'NVか…。白州NVはどうですか？', romaji:'', korean:'NV구나…. 하쿠슈 NV는요?', tip:'〜はどうですか = ~는 어떤가요?' },
  { id:'sh9_c2', speaker:'C', japanese:'白州NVはございます。1本7,800円（税免除）になります。', romaji:'', korean:'하쿠슈 NV는 있습니다. 1병 7,800엔(세금 면제)입니다.', tip:'税免除(ぜいめんじょ) = 세금 면제 / 1本(いっぽん) = 1병' },
  { id:'sh9_b3', speaker:'B', japanese:'（スヒョンに小声で）韓国で買うより安い！買っちゃえ！', romaji:'', korean:'(승현에게 작은 소리로) 한국에서 사는 것보다 싸! 사버려!', tip:'〜より安い(やすい) = ~보다 싸다 / 買っちゃえ(かっちゃえ) = 사버려' },
  { id:'sh9_a4', speaker:'A', japanese:'（迷わず）2本ください！あとは抹茶キットカットも100個！', romaji:'', korean:'(망설임 없이) 2병 주세요! 그리고 말차 킷캣도 100개!', tip:'迷わず(まよわず) = 망설임 없이 / 抹茶(まっちゃ) = 말차' },
  { id:'sh9_b4', speaker:'B', japanese:'100個？！誰に配るの？！', romaji:'', korean:'100개?! 누구한테 나눠줄 거야?!', tip:'配る(くばる) = 나눠주다' },
  { id:'sh9_a5', speaker:'A', japanese:'会社の人に！日本のお土産で評価上がるから。', romaji:'', korean:'회사 사람들한테! 일본 기념품으로 평가가 올라가니까.', tip:'評価(ひょうか) = 평가 / 〜から = ~이니까 (이유)' },
  { id:'sh9_b5', speaker:'B', japanese:'（ため息）…分かった。でもスーツケースに入らなかったら自分で持って帰ってよ。', romaji:'', korean:'(한숨) …알겠어. 근데 캐리어에 안 들어가면 본인이 들고 가.', tip:'自分で(じぶんで) = 스스로, 본인이 / 持って帰る(もってかえる) = 들고 돌아가다' },
  { id:'sh9_a6', speaker:'A', japanese:'（フライト直前）今回の旅行も最高だった！次はどこに行く？', romaji:'', korean:'(비행 직전) 이번 여행도 최고였어! 다음엔 어디 가?', tip:'フライト直前(ふらいとちょくぜん) = 비행 직전 / 次は(つぎは) = 다음엔' },
  { id:'sh9_b6', speaker:'B', japanese:'大阪はどう？スヒョンが食べたいもの全部あるよ。たこ焼き、串カツ、〆の牛丼！', romaji:'', korean:'오사카는 어때? 승현이 먹고 싶은 거 다 있잖아. 타코야키, 구시카츠, 마무리 규동!', tip:'たこ焼き(たこやき) = 타코야키 / 串カツ(くしかつ) = 구시카츠 / 〆(しめ) = 마무리' },
  { id:'sh9_a7', speaker:'A', japanese:'大阪最高！次のフライト、もう予約しよう！（スマホを取り出す）', romaji:'', korean:'오사카 최고! 다음 비행 바로 예약하자! (스마트폰을 꺼낸다)', tip:'予約する(よやくする) = 예약하다 / もう = 벌써, 바로' },

  // ══════════════════════════════════════════════════════════
  //  3인 대화 시나리오 (A=학습자, B=동행자, C=점원/직원/현지인)
  // ══════════════════════════════════════════════════════════

  // ── 버스 3인 ①: 버스 기사에게 경로 확인 ─────────────────
  { id:'bus2_n', speaker:'N', japanese:'渋谷行きのバスに乗りたいが、正しいバスか確信が持てない。', korean:'📍 시부야행 버스를 타고 싶은데 맞는 버스인지 확신이 없다.' },
  { id:'bus2_a1', speaker:'A', japanese:'すみません、このバスは渋谷に行きますか？', korean:'실례합니다, 이 버스는 시부야에 가나요?', tip:'〜に行く(いく) = ~에 가다' },
  { id:'bus2_c1', speaker:'C', japanese:'はい、渋谷駅まで行きます。終点です。', korean:'네, 시부야역까지 갑니다. 종점이에요.', tip:'終点(しゅうてん) = 종점' },
  { id:'bus2_b1', speaker:'B', japanese:'（小声で）よかった、合ってたね。', korean:'(작은 소리로) 다행이다, 맞았네.', tip:'小声(こごえ) = 작은 소리' },
  { id:'bus2_a2', speaker:'A', japanese:'料金はいくらですか？交通系ICカードは使えますか？', korean:'요금은 얼마인가요? 교통 IC카드 쓸 수 있나요?', tip:'交通系ICカード(こうつうけいアイシーカード) = 교통 IC카드 (Suica 등)' },
  { id:'bus2_c2', speaker:'C', japanese:'210円です。SuicaやPASMOは使えます。', korean:'210엔입니다. 스이카나 파스모 사용 가능해요.', tip:'Suica·PASMO = 일본 교통 IC카드' },
  { id:'bus2_b2', speaker:'B', japanese:'PASMOを使おう。チャージしてあるし。', korean:'파스모 쓰자. 충전해뒀으니까.', tip:'チャージ = 충전 / 〜してある = ~해 두다' },
  { id:'bus2_a3', speaker:'A', japanese:'（降りるとき）渋谷駅前、教えてもらえますか？', korean:'(내릴 때) 시부야역 앞, 알려주실 수 있나요?', tip:'〜を教えてもらえますか = ~를 알려주실 수 있나요?' },
  { id:'bus2_c3', speaker:'C', japanese:'次の停留所が渋谷駅前です！', korean:'다음 정류장이 시부야역 앞이에요!', tip:'停留所(ていりゅうじょ) = 정류장' },
  { id:'bus2_a4', speaker:'A', japanese:'ありがとうございます！（ボタンを押す）', korean:'감사합니다! (하차 버튼을 누른다)', tip:'降車ボタン(こうしゃぼたん) = 하차 버튼' },

  // ── 버스 3인 ②: 야간버스 예약 ───────────────────────────
  { id:'bus3_n', speaker:'N', japanese:'高速バスターミナル。大阪行きの夜行バスを予約しようとしている。', korean:'📍 고속버스 터미널. 오사카행 야간버스를 예약하려 하고 있다.' },
  { id:'bus3_a1', speaker:'A', japanese:'すみません、大阪行きの夜行バス、明日の夜はありますか？', korean:'실례합니다, 오사카행 야간버스, 내일 밤은 있나요?', tip:'夜行バス(やこうバス) = 야간버스' },
  { id:'bus3_c1', speaker:'C', japanese:'明日の夜は23時発の便がございます。2名様ですか？', korean:'내일 밤 23시 출발 편이 있습니다. 2분이신가요?', tip:'〜発(はつ) = ~발, 출발 / 便(びん) = 편' },
  { id:'bus3_b1', speaker:'B', japanese:'はい、2名で。3列シートで横になれる席はありますか？', korean:'네, 2명이요. 3열 시트로 누울 수 있는 좌석 있나요?', tip:'3列シート(さんれつシート) = 3열 시트 (야간버스 고급석)' },
  { id:'bus3_c2', speaker:'C', japanese:'プレミアムシートなら完全個室タイプがございます。お一人様6,500円です。', korean:'프리미엄 시트라면 완전 개인실 타입이 있습니다. 1인당 6,500엔입니다.', tip:'個室(こしつ) = 개인실 / お一人様(おひとりさま) = 1인당' },
  { id:'bus3_a2', speaker:'A', japanese:'じゃあ2席、プレミアムで。カードで払えますか？', korean:'그럼 2자리, 프리미엄으로요. 카드로 낼 수 있나요?', tip:'〜で払う(はらう) = ~로 내다' },
  { id:'bus3_c3', speaker:'C', japanese:'かしこまりました。合計13,000円になります。', korean:'알겠습니다. 합계 13,000엔입니다.', tip:'合計(ごうけい) = 합계' },
  { id:'bus3_b2', speaker:'B', japanese:'（小声で）夜行バスって意外と高いね。でも新幹線より断然安い！', korean:'(작은 소리로) 야간버스 의외로 비싸네. 근데 신칸센보다 훨씬 싸!', tip:'断然(だんぜん) = 단연, 훨씬' },
  { id:'bus3_a3', speaker:'A', japanese:'ありがとうございます。乗り場はどこですか？', korean:'감사합니다. 승차장은 어디예요?', tip:'乗り場(のりば) = 승차장' },
  { id:'bus3_c4', speaker:'C', japanese:'3番乗り場です。出発20分前にはお集まりください。', korean:'3번 승차장입니다. 출발 20분 전에는 모여 주세요.', tip:'〜番乗り場(ばんのりば) = ~번 승차장' },

  // ── 이자카야 3인: 추천 요청 + 단품 주문 ──────────────────
  { id:'iza2_n', speaker:'N', japanese:'いざかや。二人は初めての居酒屋で、何を頼むか迷っている。', korean:'📍 이자카야. 두 사람은 처음 온 이자카야에서 무엇을 시킬지 고민하고 있다.' },
  { id:'iza2_a1', speaker:'A', japanese:'すみません！おすすめを教えていただけますか？', korean:'저기요! 추천 메뉴를 알려주실 수 있나요?', tip:'おすすめ = 추천 / 〜を教えていただけますか = ~를 알려주실 수 있나요?' },
  { id:'iza2_c1', speaker:'C', japanese:'本日のおすすめは鰹のたたきと串カツの盛り合わせです！', korean:'오늘의 추천은 가다랑어 타타키와 꼬치튀김 모둠입니다!', tip:'鰹のたたき(かつおのたたき) = 가다랑어 타타키 / 串カツ(くしかつ) = 꼬치튀김' },
  { id:'iza2_b1', speaker:'B', japanese:'（Aに）串カツって何？揚げ物？', korean:'(A에게) 꼬치튀김이 뭐야? 튀김이야?', tip:'揚げ物(あげもの) = 튀김류' },
  { id:'iza2_a2', speaker:'A', japanese:'（Cに）串カツはどんな料理ですか？', korean:'(C에게) 꼬치튀김은 어떤 요리예요?', tip:'どんな料理(どんなりょうり) = 어떤 요리' },
  { id:'iza2_c2', speaker:'C', japanese:'肉や野菜に衣をつけて揚げたものです。ソースにつけて食べます。', korean:'고기나 채소에 튀김옷을 입혀 튀긴 거예요. 소스에 찍어 먹어요.', tip:'衣(ころも) = 튀김옷 / ソース = 소스' },
  { id:'iza2_b2', speaker:'B', japanese:'おいしそう！それにしよう！あと、生ビール2つお願いします！', korean:'맛있겠다! 그걸로 하자! 그리고 생맥주 2잔 부탁드려요!', tip:'生ビール(なまビール) = 생맥주' },
  { id:'iza2_c3', speaker:'C', japanese:'かしこまりました。少々お待ちください。', korean:'알겠습니다. 잠시만 기다려 주세요.', tip:'かしこまりました = 알겠습니다 (정중한 표현)' },
  { id:'iza2_a3', speaker:'A', japanese:'（Bに）居酒屋って最高だね。雰囲気もいいし。', korean:'(B에게) 이자카야 최고네. 분위기도 좋고.', tip:'雰囲気(ふんいき) = 분위기' },
  { id:'iza2_b3', speaker:'B', japanese:'ほんと！次から日本来たら毎晩居酒屋にしよう！', korean:'정말! 다음부터 일본 오면 매일 저녁 이자카야 가자!', tip:'毎晩(まいばん) = 매일 저녁' },

  // ── 카페 3인: 커스텀 주문 + 알레르기 문의 ────────────────
  { id:'cafe2_n', speaker:'N', japanese:'カフェ。二人は席に着き、メニューを見ながら話している。', korean:'📍 카페. 두 사람은 자리에 앉아 메뉴를 보며 이야기하고 있다.' },
  { id:'cafe2_a1', speaker:'A', japanese:'すみません、ラテをオーダーしたいんですが、豆乳に変えられますか？', korean:'저기요, 라떼를 주문하고 싶은데 두유로 바꿀 수 있나요?', tip:'〜に変える(かえる) = ~로 바꾸다' },
  { id:'cafe2_c1', speaker:'C', japanese:'はい、豆乳変更は+50円になります。', korean:'네, 두유 변경은 +50엔입니다.', tip:'+〜円(えん) = ~엔 추가' },
  { id:'cafe2_b1', speaker:'B', japanese:'（Cに）あの、私は乳製品アレルギーがあるんですが、このケーキは大丈夫ですか？', korean:'(C에게) 저, 저는 유제품 알레르기가 있는데 이 케이크는 괜찮나요?', tip:'乳製品アレルギー(にゅうせいひんアレルギー) = 유제품 알레르기' },
  { id:'cafe2_c2', speaker:'C', japanese:'少々お待ちください。確認してまいります。…チーズケーキには乳製品が含まれます。', korean:'잠시만요, 확인해 오겠습니다. …치즈케이크에는 유제품이 포함됩니다.', tip:'含まれる(ふくまれる) = 포함되다' },
  { id:'cafe2_b2', speaker:'B', japanese:'じゃあ、フルーツタルトはどうですか？', korean:'그럼, 과일타르트는 어떤가요?', tip:'フルーツタルト = 과일타르트' },
  { id:'cafe2_c3', speaker:'C', japanese:'フルーツタルトは乳製品不使用です。ご安心ください。', korean:'과일타르트는 유제품 미사용입니다. 안심하세요.', tip:'不使用(ふしよう) = 미사용 / ご安心ください(ごあんしんください) = 안심하세요' },
  { id:'cafe2_a2', speaker:'A', japanese:'よかった！じゃあ豆乳ラテとフルーツタルト、2つずつください。', korean:'다행이다! 그럼 두유 라떼랑 과일타르트, 2개씩 주세요.', tip:'〜ずつ = ~씩' },
  { id:'cafe2_c4', speaker:'C', japanese:'かしこまりました。合計1,760円です。', korean:'알겠습니다. 합계 1,760엔입니다.', tip:'合計(ごうけい) = 합계' },
  { id:'cafe2_b3', speaker:'B', japanese:'（Aに）アレルギー確認してくれてありがとう。助かった！', korean:'(A에게) 알레르기 확인해줘서 고마워. 살았다!', tip:'確認(かくにん) = 확인 / 助かった(たすかった) = 살았다, 도움됐다' },

  // ── 편의점 3인: 복권·택배 서비스 ────────────────────────
  { id:'kb2_n', speaker:'N', japanese:'コンビニ。Aはロッピーで宅配を依頼しようとしているが、操作がわからない。', korean:'📍 편의점. A는 Loppi(로피)로 택배를 보내려 하는데 조작을 모른다.' },
  { id:'kb2_a1', speaker:'A', japanese:'すみません、この端末で荷物を送れますか？操作がわからなくて…', korean:'저기요, 이 단말기로 짐을 보낼 수 있나요? 조작을 몰라서요…', tip:'端末(たんまつ) = 단말기 / 操作(そうさ) = 조작' },
  { id:'kb2_c1', speaker:'C', japanese:'はい、ロッピーですね。まず「宅配便」を選んでください。', korean:'네, 로피네요. 먼저 "택배"를 선택해 주세요.', tip:'宅配便(たくはいびん) = 택배 / ロッピー(Loppi) = 편의점 멀티 단말기' },
  { id:'kb2_b1', speaker:'B', japanese:'（Aに）荷物のサイズと重さって測った？', korean:'(A에게) 짐 사이즈랑 무게 쟀어?', tip:'サイズ = 사이즈 / 重さ(おもさ) = 무게' },
  { id:'kb2_a2', speaker:'A', japanese:'えっ、測ってないや。（Cに）サイズはどこで測ればいいですか？', korean:'어, 안 쟀네. (C에게) 사이즈는 어디서 재면 되나요?', tip:'測る(はかる) = 재다, 측정하다' },
  { id:'kb2_c2', speaker:'C', japanese:'あちらに計量台があります。測ってからレシートを発行してください。', korean:'저쪽에 계량대가 있어요. 재고 나서 영수증을 발행해 주세요.', tip:'計量台(けいりょうだい) = 계량대 / 発行(はっこう) = 발행' },
  { id:'kb2_b2', speaker:'B', japanese:'（計量後・Aに）60サイズだね。料金は画面に出てる？', korean:'(계량 후·A에게) 60 사이즈네. 요금이 화면에 나와 있어?', tip:'60サイズ = 60사이즈 (택배 규격)' },
  { id:'kb2_a3', speaker:'A', japanese:'うん。730円って書いてある。（Cに）これでいいですか？', korean:'응. 730엔이라고 써있어. (C에게) 이렇게 하면 되나요?', tip:'〜でいい = ~하면 된다' },
  { id:'kb2_c3', speaker:'C', japanese:'はい、レシートをレジに持ってきてください。そちらで受付します。', korean:'네, 영수증을 계산대에 가져오세요. 거기서 접수합니다.', tip:'受付(うけつけ) = 접수' },
  { id:'kb2_a4', speaker:'A', japanese:'ありがとうございます。着払いもできますか？', korean:'감사합니다. 착불도 가능한가요?', tip:'着払い(ちゃくばらい) = 착불 (받는 사람이 지불)' },
  { id:'kb2_c4', speaker:'C', japanese:'はい、できます。伝票に「着払い」とチェックしてください。', korean:'네, 가능해요. 전표에 "착불"을 체크해 주세요.', tip:'伝票(でんぴょう) = 전표' },

  // ── 호텔 3인: 시설 문의 + 얼리 체크인 ───────────────────
  { id:'ht2_n', speaker:'N', japanese:'ホテルフロント。二人はチェックインより早く到着して困っている。', korean:'📍 호텔 프런트. 두 사람은 체크인 시간보다 일찍 도착해서 곤란해하고 있다.' },
  { id:'ht2_a1', speaker:'A', japanese:'すみません、チェックインは3時からですよね？まだ11時なんですが…', korean:'실례합니다, 체크인은 3시부터죠? 아직 11시인데요…', tip:'チェックイン = 체크인 / まだ〜なんですが = 아직 ~인데요' },
  { id:'ht2_c1', speaker:'C', japanese:'はい、通常は15時からでございます。お荷物のお預かりは可能ですよ。', korean:'네, 통상 15시부터입니다. 짐 보관은 가능해요.', tip:'通常(つうじょう) = 통상, 보통 / お預かり(おあずかり) = 보관' },
  { id:'ht2_b1', speaker:'B', japanese:'（Aに）早めに入れるか聞いてみて。', korean:'(A에게) 일찍 들어갈 수 있는지 물어봐.', tip:'早め(はやめ) = 일찍, 조금 빨리' },
  { id:'ht2_a2', speaker:'A', japanese:'（Cに）アーリーチェックインはできますか？追加料金がかかりますか？', korean:'(C에게) 얼리 체크인 할 수 있나요? 추가 요금이 드나요?', tip:'アーリーチェックイン = 얼리 체크인 / 追加料金(ついかりょうきん) = 추가 요금' },
  { id:'ht2_c2', speaker:'C', japanese:'空き室があれば対応できます。今確認いたします。…12時からでしたら可能です。1,500円の追加料金になります。', korean:'빈 방이 있으면 대응 가능합니다. 지금 확인해 드릴게요. …12시부터라면 가능합니다. 1,500엔 추가 요금입니다.', tip:'空き室(あきしつ) = 빈 방 / 対応できる(たいおうできる) = 대응 가능하다' },
  { id:'ht2_b2', speaker:'B', japanese:'（Aに）1,500円なら払っちゃおう。荷物持ち歩くの大変だし。', korean:'(A에게) 1,500엔이면 내버리자. 짐 들고 다니는 것도 힘드니까.', tip:'払っちゃおう(はらっちゃおう) = 내버리자 (결단)' },
  { id:'ht2_a3', speaker:'A', japanese:'（Cに）お願いします。プールやジムの施設は使えますか？', korean:'(C에게) 부탁드려요. 수영장이나 헬스장 시설은 이용할 수 있나요?', tip:'施設(しせつ) = 시설 / プール = 수영장 / ジム = 헬스장' },
  { id:'ht2_c3', speaker:'C', japanese:'はい、宿泊のお客様は無料でご利用いただけます。タオルはフロントで貸し出しております。', korean:'네, 숙박 고객님은 무료로 이용하실 수 있습니다. 수건은 프런트에서 대여해 드립니다.', tip:'宿泊(しゅくはく) = 숙박 / 貸し出す(かしだす) = 대여하다' },
  { id:'ht2_b3', speaker:'B', japanese:'（Aに）よかった！チェックインしたらすぐプール行こう！', korean:'(A에게) 잘됐다! 체크인하면 바로 수영장 가자!', tip:'〜したらすぐ = ~하면 바로' },

  // ── 체크인 3인: 얼리 체크인 + 베개 교체 ─────────────────
  { id:'ci2_n', speaker:'N', japanese:'ホテルチェックイン。二人は無事に部屋に入ったが、Bが枕を替えてほしいと言っている。', korean:'📍 호텔 체크인. 두 사람은 무사히 방에 들어갔지만 B가 베개를 바꾸고 싶다고 한다.' },
  { id:'ci2_a1', speaker:'A', japanese:'チェックインありがとうございます。部屋はもう使えますか？', korean:'체크인 감사합니다. 방은 이제 사용할 수 있나요?', tip:'〜は〜できますか = ~는 ~할 수 있나요?' },
  { id:'ci2_c1', speaker:'C', japanese:'はい、お部屋の準備ができております。603号室です。こちらがカードキーです。', korean:'네, 방 준비가 됐습니다. 603호실입니다. 여기가 카드키예요.', tip:'カードキー = 카드키 / 準備ができる(じゅんびができる) = 준비가 되다' },
  { id:'ci2_b1', speaker:'B', japanese:'（Aに）低反発枕ってあるか聞いてみて。首が痛いんだよね。', korean:'(A에게) 저반발 베개 있는지 물어봐. 목이 아프잖아.', tip:'低反発枕(ていはんぱつまくら) = 저반발 베개 / 首(くび) = 목' },
  { id:'ci2_a2', speaker:'A', japanese:'（Cに）すみません、低反発枕はありますか？固い枕が苦手なんです。', korean:'(C에게) 실례합니다, 저반발 베개 있나요? 딱딱한 베개가 안 맞아서요.', tip:'固い(かたい) = 딱딱하다 / 苦手(にがて) = 잘 못하다, 안 맞다' },
  { id:'ci2_c2', speaker:'C', japanese:'はい、お持ちできます。他にご希望はございますか？', korean:'네, 가져다 드릴 수 있습니다. 다른 희망 사항 있으세요?', tip:'ご希望(ごきぼう) = 희망 사항' },
  { id:'ci2_b2', speaker:'B', japanese:'（Aに）加湿器も借りられるか聞いて。乾燥するから。', korean:'(A에게) 가습기도 빌릴 수 있는지 물어봐. 건조하니까.', tip:'加湿器(かしつき) = 가습기 / 乾燥(かんそう) = 건조' },
  { id:'ci2_a3', speaker:'A', japanese:'（Cに）加湿器のレンタルもお願いできますか？', korean:'(C에게) 가습기 렌탈도 부탁드릴 수 있나요?', tip:'レンタル = 렌탈, 대여' },
  { id:'ci2_c3', speaker:'C', japanese:'加湿器は数に限りがございますが、只今持参いたします。少々お待ちください。', korean:'가습기는 수량이 한정되어 있지만, 지금 바로 가져다 드릴게요. 잠시만요.', tip:'数に限りがある(かずにかぎりがある) = 수량이 한정되다' },
  { id:'ci2_a4', speaker:'A', japanese:'ありがとうございます。助かりました！', korean:'감사합니다. 살았어요!', tip:'助かりました(たすかりました) = 살았어요, 도움됐어요' },

  // ── 체크아웃 3인: 연장 체크아웃 + 짐 배송 ───────────────
  { id:'cout2_n', speaker:'N', japanese:'チェックアウト当日。二人はまだ観光したいと思っている。', korean:'📍 체크아웃 당일. 두 사람은 아직 더 관광하고 싶다고 생각하고 있다.' },
  { id:'cout2_a1', speaker:'A', japanese:'すみません、チェックアウトを少し延長することはできますか？', korean:'실례합니다, 체크아웃을 조금 연장할 수 있나요?', tip:'延長(えんちょう) = 연장' },
  { id:'cout2_c1', speaker:'C', japanese:'レイトチェックアウトですね。13時までなら1,000円、15時までなら2,000円になります。', korean:'레이트 체크아웃이군요. 13시까지라면 1,000엔, 15시까지라면 2,000엔입니다.', tip:'レイトチェックアウト = 레이트 체크아웃 (늦은 퇴실)' },
  { id:'cout2_b1', speaker:'B', japanese:'（Aに）15時でいいんじゃない？渋谷で買い物してから空港行けば間に合うし。', korean:'(A에게) 15시로 하면 되지 않아? 시부야에서 쇼핑하고 공항 가면 시간 맞으니까.', tip:'間に合う(まにあう) = 시간이 맞다, 제시간에 되다' },
  { id:'cout2_a2', speaker:'A', japanese:'（Cに）15時でお願いします。荷物を空港に直送することはできますか？', korean:'(C에게) 15시로 부탁드려요. 짐을 공항으로 직접 보낼 수 있나요?', tip:'直送(ちょくそう) = 직송 / 空港(くうこう) = 공항' },
  { id:'cout2_c2', speaker:'C', japanese:'宅配便の手配ができます。成田・羽田どちらですか？翌日お届けになります。', korean:'택배 수배가 가능합니다. 나리타·하네다 어느 쪽인가요? 다음날 도착입니다.', tip:'手配(てはい) = 수배, 준비 / 翌日(よくじつ) = 다음날' },
  { id:'cout2_b2', speaker:'B', japanese:'羽田です。一個でいくらですか？', korean:'하네다예요. 한 개에 얼마예요?', tip:'一個(いっこ) = 한 개' },
  { id:'cout2_c3', speaker:'C', japanese:'サイズによりますが、60サイズで1,500円ほどです。', korean:'사이즈에 따라 다르지만, 60사이즈로 1,500엔 정도입니다.', tip:'サイズによる = 사이즈에 따라 다르다' },
  { id:'cout2_a3', speaker:'A', japanese:'お願いします。では荷物はここに置いて行ってもいいですか？', korean:'부탁드려요. 그럼 짐은 여기 두고 가도 되나요?', tip:'置いて行く(おいていく) = 두고 가다' },
  { id:'cout2_c4', speaker:'C', japanese:'はい、こちらで保管いたします。お戻りの際はフロントへお声がけください。', korean:'네, 여기서 보관해 드릴게요. 돌아오실 때는 프런트에 말씀해 주세요.', tip:'保管(ほかん) = 보관 / お声がけください(おこえがけください) = 말씀해 주세요' },

  // ── 룸서비스 3인: 룸서비스 추가 주문 ────────────────────
  { id:'rs2_n', speaker:'N', japanese:'ホテルの部屋。夜、二人はお腹が空いてルームサービスを注文しようとしている。', korean:'📍 호텔 방. 밤에 두 사람은 배가 고파서 룸서비스를 주문하려 하고 있다.' },
  { id:'rs2_a1', speaker:'A', japanese:'もしもし、ルームサービスをお願いしたいんですが、まだ注文できますか？', korean:'여보세요, 룸서비스를 부탁하고 싶은데 아직 주문할 수 있나요?', tip:'まだ〜できますか = 아직 ~할 수 있나요?' },
  { id:'rs2_c1', speaker:'C', japanese:'はい、24時間承っております。ご注文をどうぞ。', korean:'네, 24시간 받고 있습니다. 주문하세요.', tip:'24時間承る(にじゅうよじかんうけたまわる) = 24시간 받다' },
  { id:'rs2_b1', speaker:'B', japanese:'（Aに）ラーメンとビールとアイスクリームをお願いして！', korean:'(A에게) 라멘이랑 맥주랑 아이스크림 부탁해!', tip:'アイスクリーム = 아이스크림' },
  { id:'rs2_a2', speaker:'A', japanese:'（Cに）醤油ラーメンが一つ、瓶ビールが二本、バニラアイスが二つください。', korean:'(C에게) 간장 라멘 하나, 병맥주 두 병, 바닐라 아이스 두 개 주세요.', tip:'瓶ビール(びんビール) = 병맥주 / 〜本(ほん) = ~병 (세는 단위)' },
  { id:'rs2_c2', speaker:'C', japanese:'かしこまりました。合計3,200円になります。30分ほどでお届けします。', korean:'알겠습니다. 합계 3,200엔입니다. 30분 정도면 배달해 드릴게요.', tip:'お届けする(おとどけする) = 배달하다, 전달하다' },
  { id:'rs2_b2', speaker:'B', japanese:'（Aに）ルームサービスって割高だよね。でも楽だから仕方ない。', korean:'(A에게) 룸서비스 좀 비싸지. 근데 편하니까 어쩔 수 없어.', tip:'割高(わりだか) = 값이 비싸다 / 仕方ない(しかたない) = 어쩔 수 없다' },
  { id:'rs2_a3', speaker:'A', japanese:'（Cに）あと、氷とグラスをいただけますか？', korean:'(C에게) 그리고, 얼음과 컵도 받을 수 있나요?', tip:'氷(こおり) = 얼음 / グラス = 컵, 유리잔' },
  { id:'rs2_c3', speaker:'C', japanese:'もちろんでございます。一緒にお持ちします。', korean:'물론입니다. 같이 가져다 드릴게요.', tip:'一緒に(いっしょに) = 같이' },
  { id:'rs2_a4', speaker:'A', japanese:'ありがとうございます。楽しみにしています！', korean:'감사합니다. 기대할게요!', tip:'楽しみにしています(たのしみにしています) = 기대하고 있습니다' },

  // ── 전화 예약 3인: 온천 료칸 예약 ──────────────────────
  { id:'ph2_n', speaker:'N', japanese:'二人で話し合いながら、温泉旅館に電話で予約を入れている。', korean:'📍 두 사람이 상의하면서 온천 료칸에 전화로 예약을 넣고 있다.' },
  { id:'ph2_a1', speaker:'A', japanese:'もしもし、温泉旅館の予約をしたいんですが。', korean:'여보세요, 온천 료칸 예약을 하고 싶은데요.', tip:'温泉旅館(おんせんりょかん) = 온천 료칸' },
  { id:'ph2_c1', speaker:'C', japanese:'はい、いつのご予約でしょうか？', korean:'네, 언제로 예약하시겠어요?', tip:'〜のご予約(よやく) = ~의 예약' },
  { id:'ph2_b1', speaker:'B', japanese:'（Aに）来月の3連休の最初の日がいいな。', korean:'(A에게) 다음 달 3일 연속 휴일의 첫날이 좋겠어.', tip:'3連休(さんれんきゅう) = 3일 연속 휴일 / 最初(さいしょ) = 최초, 첫날' },
  { id:'ph2_a2', speaker:'A', japanese:'（Cに）来月の土曜、2名で1泊お願いしたいんですが、空きはありますか？', korean:'(C에게) 다음 달 토요일, 2명으로 1박 부탁하고 싶은데 빈 자리 있나요?', tip:'1泊(いっぱく) = 1박 / 空き(あき) = 빈 자리' },
  { id:'ph2_c2', speaker:'C', japanese:'少々お待ちください。…はい、空きがございます。露天風呂付き客室はいかがでしょうか？', korean:'잠시만요. …네, 빈 자리 있습니다. 노천탕 딸린 객실은 어떠세요?', tip:'露天風呂付き(ろてんぶろつき) = 노천탕 딸린 / 客室(きゃくしつ) = 객실' },
  { id:'ph2_b2', speaker:'B', japanese:'（Aに）露天風呂付き！絶対それにしよう！', korean:'(A에게) 노천탕 딸린 것! 무조건 그걸로 하자!', tip:'絶対(ぜったい) = 절대, 무조건' },
  { id:'ph2_a3', speaker:'A', japanese:'（Cに）露天風呂付きで、食事付きのプランはありますか？', korean:'(C에게) 노천탕 딸린 거로, 식사 포함 플랜 있나요?', tip:'食事付き(しょくじつき) = 식사 포함' },
  { id:'ph2_c3', speaker:'C', japanese:'はい、夕食・朝食付きの「会席プラン」が1名様25,000円でございます。', korean:'네, 석식·조식 포함 "가이세키 플랜"이 1인 25,000엔입니다.', tip:'会席プラン(かいせきプラン) = 가이세키 플랜 (일본식 정통 코스 요리)' },
  { id:'ph2_a4', speaker:'A', japanese:'わかりました。そちらでお願いします。名前はキム・ジウンです。', korean:'알겠습니다. 그걸로 부탁드려요. 이름은 김지운입니다.', tip:'〜でお願いします = ~로 부탁합니다' },
  { id:'ph2_c4', speaker:'C', japanese:'ありがとうございます。前日のキャンセルは全額いただきます。お気をつけください。', korean:'감사합니다. 전날 취소는 전액 청구됩니다. 참고해 주세요.', tip:'全額(ぜんがく) = 전액 / キャンセル = 취소' },

  // ── 온천 3인: 온천 규칙 + 수건 빌리기 ────────────────────
  { id:'ons2_n', speaker:'N', japanese:'旅館の大浴場前。二人は初めての温泉で使い方がよくわからない。', korean:'📍 료칸 대욕장 앞. 두 사람은 처음 온천이라 이용법을 잘 모른다.' },
  { id:'ons2_a1', speaker:'A', japanese:'すみません、温泉の利用時間はいつですか？', korean:'실례합니다, 온천 이용 시간은 언제예요?', tip:'利用時間(りようじかん) = 이용 시간' },
  { id:'ons2_c1', speaker:'C', japanese:'男湯は午後3時から深夜0時まで、朝は6時から9時までです。', korean:'남탕은 오후 3시부터 자정 0시까지, 아침은 6시부터 9시까지입니다.', tip:'男湯(おとこゆ) = 남탕 / 深夜(しんや) = 심야, 자정' },
  { id:'ons2_b1', speaker:'B', japanese:'（Aに）タオル持ってこなかったんだけど、貸してもらえるか聞いて。', korean:'(A에게) 수건 안 가져왔는데, 빌릴 수 있는지 물어봐.', tip:'貸してもらう(かしてもらう) = 빌리다 (상대방이 빌려주는 것)' },
  { id:'ons2_a2', speaker:'A', japanese:'（Cに）バスタオルを借りることはできますか？持ってくるのを忘れて…', korean:'(C에게) 바스타올을 빌릴 수 있나요? 가져오는 것을 잊어서…', tip:'バスタオル = 바스타올 / 忘れる(わすれる) = 잊다' },
  { id:'ons2_c2', speaker:'C', japanese:'はい、フロントで貸し出しております。1枚200円です。', korean:'네, 프런트에서 대여해 드립니다. 1장 200엔입니다.', tip:'貸し出す(かしだす) = 대여하다 / 1枚(いちまい) = 1장' },
  { id:'ons2_b2', speaker:'B', japanese:'（Aに）200円なら全然OK！刺青ある人って入れるか聞いてみて。', korean:'(A에게) 200엔이면 완전 OK! 문신 있는 사람은 들어갈 수 있는지 물어봐.', tip:'刺青(いれずみ) = 문신 / 全然OK(ぜんぜんOK) = 완전 OK' },
  { id:'ons2_a3', speaker:'A', japanese:'（Cに）刺青がある場合は入浴できますか？', korean:'(C에게) 문신이 있는 경우 입욕할 수 있나요?', tip:'入浴(にゅうよく) = 입욕, 목욕' },
  { id:'ons2_c3', speaker:'C', japanese:'申し訳ございません、当館は刺青のある方のご入浴はお断りしております。', korean:'죄송합니다, 저희 시설에서는 문신이 있는 분의 입욕을 거절하고 있습니다.', tip:'お断りする(おことわりする) = 거절하다 / 当館(とうかん) = 당관 (이 시설)' },
  { id:'ons2_b3', speaker:'B', japanese:'（Aに）そうか…私はシールタイプだから大丈夫ね。', korean:'(A에게) 그렇구나… 나는 스티커 타입이니까 괜찮겠네.', tip:'シールタイプ = 스티커 타입 (가짜 문신)' },

  // ── 편집샵 3인: 한정 컬러 + 회원 가입 ────────────────────
  { id:'sel2_n', speaker:'N', japanese:'セレクトショップ。二人は服を選びながら、店員に相談している。', korean:'📍 편집샵. 두 사람은 옷을 고르면서 점원에게 상담하고 있다.' },
  { id:'sel2_a1', speaker:'A', japanese:'すみません、このジャケット、他のカラーはありますか？', korean:'실례합니다, 이 재킷 다른 색깔은 있나요?', tip:'カラー = 색깔, 컬러' },
  { id:'sel2_c1', speaker:'C', japanese:'こちらはネイビーとグリーンもございます。どちらがお好みですか？', korean:'여기 네이비와 그린도 있습니다. 어느 게 마음에 드세요?', tip:'ネイビー = 네이비 / グリーン = 그린 / お好み(おこのみ) = 취향' },
  { id:'sel2_b1', speaker:'B', japanese:'（Aに）グリーンかわいい！試着してみなよ。', korean:'(A에게) 그린 귀엽다! 입어봐.', tip:'試着(しちゃく) = 시착, 입어보기' },
  { id:'sel2_a2', speaker:'A', japanese:'（Cに）グリーンを試着してもいいですか？Mサイズで。', korean:'(C에게) 그린을 입어봐도 될까요? M사이즈로요.', tip:'〜を試着する = ~를 입어보다' },
  { id:'sel2_c2', speaker:'C', japanese:'もちろんでございます。こちらへどうぞ。Mサイズお持ちします。', korean:'물론이죠. 이쪽으로 오세요. M사이즈 가져다 드릴게요.', tip:'〜をお持ちします = ~를 가져다 드릴게요' },
  { id:'sel2_b2', speaker:'B', japanese:'（試着後・Aに）めちゃ似合う！買いなよ！', korean:'(시착 후·A에게) 엄청 잘 어울려! 사!', tip:'似合う(にあう) = 어울리다' },
  { id:'sel2_a3', speaker:'A', japanese:'（Cに）これにします。会員登録をすると割引になりますか？', korean:'(C에게) 이걸로 할게요. 회원 등록을 하면 할인이 되나요?', tip:'会員登録(かいいんとうろく) = 회원 등록 / 割引(わりびき) = 할인' },
  { id:'sel2_c3', speaker:'C', japanese:'はい、今なら入会で10%オフになります。アプリのダウンロードもお願いしております。', korean:'네, 지금 가입하시면 10% 할인입니다. 앱 다운로드도 부탁드려요.', tip:'入会(にゅうかい) = 가입 / 10%オフ = 10% 할인' },
  { id:'sel2_b3', speaker:'B', japanese:'（Aに）登録したほうがいいじゃない！私もしようかな。', korean:'(A에게) 등록하는 게 낫지! 나도 할까.', tip:'〜したほうがいい = ~하는 게 낫다' },
  { id:'sel2_a4', speaker:'A', japanese:'（Cに）では会員登録もお願いします。スマホで登録できますか？', korean:'(C에게) 그럼 회원 등록도 부탁드려요. 스마트폰으로 등록할 수 있나요?', tip:'スマホで登録(とうろく) = 스마트폰으로 등록' },

  // ── 돈키호테 3인: 직원 도움 + 할인 쿠폰 ────────────────
  { id:'dnq2_n', speaker:'N', japanese:'ドン・キホーテ。二人は広い店内で迷子になっている。', korean:'📍 돈키호테. 두 사람은 넓은 매장 안에서 길을 잃고 있다.' },
  { id:'dnq2_a1', speaker:'A', japanese:'すみません、スキンケアコーナーはどこですか？', korean:'실례합니다, 스킨케어 코너는 어디예요?', tip:'スキンケア = 스킨케어' },
  { id:'dnq2_c1', speaker:'C', japanese:'3階の奥にございます。エスカレーターで上がってください。', korean:'3층 안쪽에 있어요. 에스컬레이터로 올라가세요.', tip:'3階(さんかい) = 3층 / 奥(おく) = 안쪽' },
  { id:'dnq2_b1', speaker:'B', japanese:'（Aに）ロート製薬のV7って有名な目薬、在庫あるか確認してもらって。', korean:'(A에게) 로토 제약의 V7이라는 유명한 안약, 재고 있는지 확인해달라고 해.', tip:'目薬(めぐすり) = 안약 / 在庫(ざいこ) = 재고' },
  { id:'dnq2_a2', speaker:'A', japanese:'（Cに）ロートV7という目薬はありますか？', korean:'(C에게) 로트 V7이라는 안약 있나요?', tip:'ロートV7 = 로트 V7 (일본 유명 안약 브랜드)' },
  { id:'dnq2_c2', speaker:'C', japanese:'はい、ございます。只今セール中で15%OFFです。', korean:'네, 있습니다. 지금 세일 중으로 15% 할인이에요.', tip:'只今(ただいま) = 지금 / セール中(セールちゅう) = 세일 중' },
  { id:'dnq2_b2', speaker:'B', japanese:'（Aに）セールだって！まとめて買っちゃおうよ！5個くらい！', korean:'(A에게) 세일이래! 한꺼번에 사버리자! 5개 정도!', tip:'まとめて = 한꺼번에 / 買っちゃおう = 사버리자' },
  { id:'dnq2_a3', speaker:'A', japanese:'（Cに）5個ください。それと、ドンペン割引クーポンはまだ使えますか？', korean:'(C에게) 5개 주세요. 그리고 돈펜 할인 쿠폰 아직 사용할 수 있나요?', tip:'ドンペン = 돈키호테 마스코트 / クーポン = 쿠폰' },
  { id:'dnq2_c3', speaker:'C', japanese:'アプリのクーポンでしたら本日も有効です。レジでご提示ください。', korean:'앱 쿠폰이라면 오늘도 유효해요. 계산대에서 제시해 주세요.', tip:'有効(ゆうこう) = 유효 / 提示(ていじ) = 제시' },
  { id:'dnq2_b3', speaker:'B', japanese:'（Aに）やった！ダブル割引だね！', korean:'(A에게) 야호! 더블 할인이네!', tip:'ダブル割引(ダブルわりびき) = 더블 할인' },

  // ── 백화점 3인: 선물 + 배송 서비스 ─────────────────────
  { id:'dep2_n', speaker:'N', japanese:'百貨店。二人は友人への贈り物を選んでいる。', korean:'📍 백화점. 두 사람은 친구에게 줄 선물을 고르고 있다.' },
  { id:'dep2_a1', speaker:'A', japanese:'すみません、和菓子の詰め合わせを探しているんですが。', korean:'실례합니다, 화과자 모둠 세트를 찾고 있는데요.', tip:'詰め合わせ(つめあわせ) = 모둠 세트' },
  { id:'dep2_c1', speaker:'C', japanese:'こちらの売場にございます。ご予算はいくらくらいでしょうか？', korean:'이 매장에 있어요. 예산은 얼마 정도이세요?', tip:'売場(うりば) = 매장 / ご予算(ごよさん) = 예산' },
  { id:'dep2_b1', speaker:'B', japanese:'（Aに）3,000円くらいで、手提げ袋に入るサイズがいいな。', korean:'(A에게) 3,000엔 정도로, 손가방에 들어가는 사이즈가 좋겠어.', tip:'手提げ袋(てさげぶくろ) = 손가방 / サイズ = 사이즈' },
  { id:'dep2_a2', speaker:'A', japanese:'（Cに）3,000円前後で、コンパクトなものはありますか？', korean:'(C에게) 3,000엔 전후로, 작은 것 있나요?', tip:'前後(ぜんご) = 전후 / コンパクト = 콤팩트, 작은' },
  { id:'dep2_c2', speaker:'C', japanese:'こちらの「季節の和菓子セット」はいかがでしょうか。2,800円で6種類入っています。', korean:'이쪽 "계절 화과자 세트"는 어떠세요? 2,800엔에 6종류 들어있어요.', tip:'季節(きせつ) = 계절 / 〜種類(しゅるい) = ~종류' },
  { id:'dep2_b2', speaker:'B', japanese:'（Aに）いいじゃない！海外発送できるか聞いてみて。友達、海外住んでるから。', korean:'(A에게) 좋네! 해외 배송 가능한지 물어봐. 친구가 해외에 살거든.', tip:'海外発送(かいがいはっそう) = 해외 배송' },
  { id:'dep2_a3', speaker:'A', japanese:'（Cに）これにします。海外への発送サービスはありますか？', korean:'(C에게) 이걸로 할게요. 해외 발송 서비스가 있나요?', tip:'発送サービス(はっそうサービス) = 발송 서비스' },
  { id:'dep2_c3', speaker:'C', japanese:'はい、EMSや国際宅配便でお送りできます。お届け先の国をお聞かせください。', korean:'네, EMS나 국제 택배로 보내드릴 수 있습니다. 받으시는 분의 나라를 알려주세요.', tip:'EMS = EMS (국제우편 서비스) / お届け先(おとどけさき) = 수신처' },
  { id:'dep2_b3', speaker:'B', japanese:'（Aに）EMS！韓国まで何日かかるか聞いて！', korean:'(A에게) EMS! 한국까지 며칠 걸리는지 물어봐!', tip:'何日かかる(なんにちかかる) = 며칠 걸리다' },
  { id:'dep2_a4', speaker:'A', japanese:'（Cに）韓国まで何日かかりますか？', korean:'(C에게) 한국까지 며칠 걸려요?', tip:'〜まで何日 = ~까지 며칠' },
  { id:'dep2_c4', speaker:'C', japanese:'EMSで通常3〜5営業日です。年末年始は遅れる場合があります。', korean:'EMS로 보통 3~5 영업일입니다. 연말연시에는 늦어질 수 있어요.', tip:'営業日(えいぎょうび) = 영업일 / 年末年始(ねんまつねんし) = 연말연시' },

  // ── 야구장 3인: 매점 직원과 대화 ────────────────────────
  { id:'bsb2_n', speaker:'N', japanese:'野球場の売店。Aはビールと食べ物を買おうとしている。', korean:'📍 야구장 매점. A는 맥주와 음식을 사려 하고 있다.' },
  { id:'bsb2_a1', speaker:'A', japanese:'すみません、生ビールとメガホンはありますか？', korean:'실례합니다, 생맥주랑 메가폰은 있나요?', tip:'メガホン = 응원 메가폰 (야구장 응원 용품)' },
  { id:'bsb2_c1', speaker:'C', japanese:'生ビールは中サイズ700円です。メガホンはグッズ売り場でお求めください。', korean:'생맥주는 중 사이즈 700엔입니다. 메가폰은 상품 매장에서 구입하세요.', tip:'グッズ売り場(うりば) = 상품 매장 / お求めください(おもとめください) = 구입하세요' },
  { id:'bsb2_b1', speaker:'B', japanese:'（Aに）焼きそばも買って！試合中に食べよう！', korean:'(A에게) 야키소바도 사! 경기 중에 먹자!', tip:'焼きそば(やきそば) = 야키소바 (볶음면) / 試合中(しあいちゅう) = 경기 중' },
  { id:'bsb2_a2', speaker:'A', japanese:'（Cに）焼きそばと唐揚げ、それぞれ一つずつください。', korean:'(C에게) 야키소바랑 가라아게, 각각 하나씩 주세요.', tip:'それぞれ = 각각 / 〜ずつ = ~씩' },
  { id:'bsb2_c2', speaker:'C', japanese:'焼きそば600円、唐揚げ500円です。合計1,800円になります。', korean:'야키소바 600엔, 가라아게 500엔입니다. 합계 1,800엔입니다.', tip:'合計(ごうけい) = 합계' },
  { id:'bsb2_b2', speaker:'B', japanese:'（Aに）PayPayで払えるか聞いて！現金ないし。', korean:'(A에게) 페이페이로 낼 수 있는지 물어봐! 현금이 없어.', tip:'PayPay = 페이페이 (일본 스마트폰 결제 앱)' },
  { id:'bsb2_a3', speaker:'A', japanese:'（Cに）PayPayは使えますか？', korean:'(C에게) 페이페이 사용할 수 있나요?', tip:'PayPayは使えますか = 페이페이 쓸 수 있나요?' },
  { id:'bsb2_c3', speaker:'C', japanese:'はい、QRコードをかざしてください。こちらです。', korean:'네, QR코드를 갖다 대주세요. 여기예요.', tip:'QRコード = QR코드 / かざす = 갖다 대다' },
  { id:'bsb2_a4', speaker:'A', japanese:'ありがとうございます！（Bに）払えた！行こう！', korean:'감사합니다! (B에게) 됐어! 가자!', tip:'払えた(はらえた) = (결제) 됐어 (성공)' },
  { id:'bsb2_b3', speaker:'B', japanese:'よし！一緒に応援しよう！（メガホンを手に）がんばれー！', korean:'좋아! 같이 응원하자! (메가폰을 손에 들고) 힘내라!', tip:'がんばれー = 힘내라! (응원 표현)' },
];
