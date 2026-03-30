// ============================================================
//  kana-data-extra.js
//  추가 어휘·카테고리 (VOCAB_ITEMS_* 배열과 VOCAB_CATEGORIES 배열에 삽입)
//  ID 접두사: 단어 nw_  /  문장 ns_
// ============================================================

// ─────────────────────────────────────────────────────────────
//  추가 단어 항목
// ─────────────────────────────────────────────────────────────
const VOCAB_ITEMS_EXTRA = [

  // ══════════════════════════════════════════════════════
  //  음식·요리 (Food & Cooking)
  // ══════════════════════════════════════════════════════
  { id:'nw_yakisoba',  japanese:'やきそば',    kanji:'焼(や)きそば',       korean:'볶음 국수 (야키소바)',     english:'Yakisoba (fried noodles)',     tip:'축제·야타이에서 필수 메뉴', examples:[{japanese:'やきそばをひとつください。',korean:'야키소바 하나 주세요.'},{japanese:'このやきそばはからいですか？',korean:'이 야키소바는 맵나요?'}] },
  { id:'nw_karaage',   japanese:'からあげ',    kanji:'唐揚(からあ)げ',     korean:'가라아게 (일본식 닭튀김)', english:'Karaage (Japanese fried chicken)', tip:'레몬을 뿌려 먹는 것이 정석', examples:[{japanese:'からあげとビールをください。',korean:'가라아게와 맥주 주세요.'},{japanese:'からあげはジューシーでおいしいです。',korean:'가라아게는 육즙이 풍부해서 맛있어요.'}] },
  { id:'nw_gyoza',     japanese:'ぎょうざ',    kanji:'餃子(ぎょうざ)',     korean:'교자 (만두)',              english:'Gyoza (Japanese dumplings)',    tip:'しょうゆ+ラー油で食べるのが定番', examples:[{japanese:'ぎょうざを６こください。',korean:'교자 6개 주세요.'},{japanese:'てつぱんぎょうざをたのみました。',korean:'철판 교자를 주문했어요.'}] },
  { id:'nw_tonkatsu',  japanese:'とんかつ',    kanji:'豚(とん)カツ',       korean:'돈가스',                  english:'Tonkatsu (pork cutlet)',        tip:'ソースかけ放題が多い', examples:[{japanese:'とんかつていしょくをひとつ。',korean:'돈가스 정식 하나요.'},{japanese:'とんかつソースはどこですか？',korean:'돈가스 소스는 어디에 있나요?'}] },
  { id:'nw_shabu',     japanese:'しゃぶしゃぶ', kanji:'しゃぶしゃぶ',      korean:'샤브샤브',                english:'Shabu-shabu (hot pot)',         tip:'うすきり肉をさっとくぐらせる鍋料理', examples:[{japanese:'しゃぶしゃぶはたかいですか？',korean:'샤브샤브는 비싼가요?'},{japanese:'しゃぶしゃぶのたれはふたつあります。',korean:'샤브샤브 소스는 두 가지가 있어요.'}] },
  { id:'nw_curry',     japanese:'カレー',                                   korean:'카레',                    english:'Curry (Japanese style)',        tip:'日本のカレーは甘め', examples:[{japanese:'カレーライスをください。',korean:'카레라이스 주세요.'},{japanese:'からさはどのくらいですか？',korean:'매운 정도는 어떤가요?'}] },
  { id:'nw_natto',     japanese:'なっとう',    kanji:'納豆(なっとう)',     korean:'낫토 (발효 콩)',           english:'Natto (fermented soybeans)',    tip:'くさいけどからだにいい！', examples:[{japanese:'なっとうはすきですか？',korean:'낫토 좋아하세요?'},{japanese:'なっとうはにおいがつよいです。',korean:'낫토는 냄새가 강해요.'}] },
  { id:'nw_takoyaki',  japanese:'たこやき',    kanji:'たこ焼(や)き',       korean:'타코야키 (문어빵)',        english:'Takoyaki (octopus balls)',      tip:'大阪名物！ソース+マヨネーズ+かつおぶし', examples:[{japanese:'たこやきをやっつください。',korean:'타코야키 8개 주세요.'},{japanese:'たこやきはあつあつでおいしい！',korean:'타코야키는 뜨끈뜨끈해서 맛있어!'}] },
  { id:'nw_okonomiyaki', japanese:'おこのみやき', kanji:'お好み焼(や)き',  korean:'오코노미야키 (일본 부침개)', english:'Okonomiyaki (savory pancake)', tip:'広島風 vs 大阪風 スタイルが違う', examples:[{japanese:'おこのみやきをじぶんでやきますか？',korean:'오코노미야키는 직접 굽나요?'},{japanese:'ひろしまふうとおおさかふうどちらがすきですか？',korean:'히로시마풍과 오사카풍 어느 쪽을 좋아해요?'}] },
  { id:'nw_chahan',    japanese:'チャーハン',   kanji:'炒飯(チャーハン)',   korean:'볶음밥',                  english:'Fried rice (Chinese style)',    tip:'餃子のセットメニューに多い', examples:[{japanese:'チャーハンとぎょうざのセットをください。',korean:'볶음밥과 교자 세트 주세요.'},{japanese:'チャーハンはパラパラでおいしいです。',korean:'볶음밥이 날알날알 맛있어요.'}] },
  { id:'nw_yakimono',  japanese:'やきもの',    kanji:'焼(や)き物(もの)',   korean:'구이 요리',               english:'Grilled food / Pottery',       tip:'魚の塩焼き·串焼き·炭火焼きなど', examples:[{japanese:'さかなのしおやきをたのみます。',korean:'생선 소금구이를 주문할게요.'},{japanese:'やきものはかんたんにつくれますか？',korean:'구이 요리는 쉽게 만들 수 있나요?'}] },
  { id:'nw_nimono',    japanese:'にもの',      kanji:'煮物(にもの)',        korean:'조림 (일본식)',            english:'Simmered dish',               tip:'だし+しょうゆ+みりんで煮る日本の家庭料理', examples:[{japanese:'にもののあじがやさしくておいしい。',korean:'조림의 맛이 순하고 맛있어.'},{japanese:'これはかぼちゃのにものです。',korean:'이건 단호박 조림이에요.'}] },
  { id:'nw_dashi',     japanese:'だし',        kanji:'出汁(だし)',          korean:'다시 (일본 육수)',         english:'Dashi (Japanese soup stock)',  tip:'かつお+こんぶが基本。和食の要', examples:[{japanese:'だしがきいていておいしいです。',korean:'다시 맛이 배어서 맛있어요.'},{japanese:'だしをとるのがにほんりょうりのきほんです。',korean:'다시를 우리는 것이 일본 요리의 기본이에요.'}] },

  // ══════════════════════════════════════════════════════
  //  날씨·계절 (Weather & Seasons)
  // ══════════════════════════════════════════════════════
  { id:'nw_hare',      japanese:'はれ',        kanji:'晴(は)れ',            korean:'맑음 (쾌청)',             english:'Sunny / Clear sky',            tip:'はれのひ = 맑은 날', examples:[{japanese:'あしたははれですか？',korean:'내일은 맑을까요?'},{japanese:'きょうははれでよかった！',korean:'오늘 맑아서 다행이야!'}] },
  { id:'nw_kumori',    japanese:'くもり',      kanji:'曇(くも)り',          korean:'흐림',                    english:'Cloudy',                       tip:'曇りがちな日 = 흐린 날', examples:[{japanese:'よほうではくもりのちあめです。',korean:'예보에서는 흐린 후 비라고 해요.'},{japanese:'くもりでもさんぽにいきました。',korean:'흐렸지만 산책하러 갔어요.'}] },
  { id:'nw_ame',       japanese:'あめ',        kanji:'雨(あめ)',             korean:'비',                      english:'Rain',                         tip:'ゲリラ豪雨 = 게릴라 호우', examples:[{japanese:'あめがふっていますね。',korean:'비가 오고 있네요.'},{japanese:'かさをもってきてよかった。',korean:'우산 가져와서 다행이야.'}] },
  { id:'nw_yuki',      japanese:'ゆき',        kanji:'雪(ゆき)',             korean:'눈',                      english:'Snow',                         tip:'ゆきだるま = 눈사람', examples:[{japanese:'はじめてゆきをみました！',korean:'처음으로 눈을 봤어요!'},{japanese:'ゆきがたくさんふりました。',korean:'눈이 많이 내렸어요.'}] },
  { id:'nw_kaze2',     japanese:'かぜ',        kanji:'風(かぜ)',             korean:'바람',                    english:'Wind',                         tip:'かぜがつよい = 바람이 강함 (風邪:감기와 구별)', examples:[{japanese:'きょうはかぜがつよいですね。',korean:'오늘은 바람이 강하네요.'},{japanese:'かぜがきもちいい！',korean:'바람이 기분 좋아!'}] },
  { id:'nw_taifuu',    japanese:'たいふう',    kanji:'台風(たいふう)',       korean:'태풍',                    english:'Typhoon',                      tip:'台風シーズンは9~10月', examples:[{japanese:'たいふうがきているのでそとにでないでください。',korean:'태풍이 오고 있으니 밖에 나가지 마세요.'},{japanese:'たいふうがすぎてからでかけます。',korean:'태풍이 지나간 후 외출할게요.'}] },
  { id:'nw_haru',      japanese:'はる',        kanji:'春(はる)',             korean:'봄',                      english:'Spring',                       tip:'桜の季節！3~4月', examples:[{japanese:'はるになるとさくらがさきます。',korean:'봄이 되면 벚꽃이 피어요.'},{japanese:'はるのきかんはあたたかいです。',korean:'봄 기간은 따뜻해요.'}] },
  { id:'nw_natsu',     japanese:'なつ',        kanji:'夏(なつ)',             korean:'여름',                    english:'Summer',                       tip:'むしあつい = 덥고 습한', examples:[{japanese:'なつはあつくてたいへん。',korean:'여름은 더워서 힘들어.'},{japanese:'なつまつりがたのしみです！',korean:'여름 축제가 기대돼요!'}] },
  { id:'nw_aki',       japanese:'あき',        kanji:'秋(あき)',             korean:'가을',                    english:'Autumn / Fall',                tip:'もみじ(紅葉)の季節', examples:[{japanese:'あきはすずしくてきもちいい。',korean:'가을은 선선하고 기분 좋아.'},{japanese:'あきはこうようがきれいですね。',korean:'가을은 단풍이 예쁘네요.'}] },
  { id:'nw_fuyu',      japanese:'ふゆ',        kanji:'冬(ふゆ)',             korean:'겨울',                    english:'Winter',                       tip:'こたつとみかん = 겨울 정석', examples:[{japanese:'ふゆはさむいので、あたたかくしてください。',korean:'겨울은 추우니까 따뜻하게 입으세요.'},{japanese:'ふゆはゆきがたのしい！',korean:'겨울에는 눈이 즐거워!'}] },
  { id:'nw_kishayoho', japanese:'てんきよほう', kanji:'天気(てんき)予報(よほう)', korean:'날씨 예보',           english:'Weather forecast',              tip:'天気予報をチェックしよう！', examples:[{japanese:'てんきよほうではあしたはあめです。',korean:'날씨 예보에서는 내일 비래요.'},{japanese:'てんきよほうをみましたか？',korean:'날씨 예보 봤어요?'}] },
  { id:'nw_mushiatsui',japanese:'むしあつい',  kanji:'蒸(む)し暑(あつ)い',  korean:'덥고 습하다 (무더움)',    english:'Hot and humid',                tip:'日本の夏の特徴的な暑さ', examples:[{japanese:'きょうはむしあつくてつらい。',korean:'오늘은 무더워서 힘들어.'},{japanese:'むしあつい日はクーラーがひつようです。',korean:'무더운 날은 에어컨이 필요해요.'}] },

  // ══════════════════════════════════════════════════════
  //  몸·건강 (Body & Health) — 추가 어휘
  // ══════════════════════════════════════════════════════
  { id:'nw_mune',      japanese:'むね',        kanji:'胸(むね)',             korean:'가슴',                   english:'Chest',                        tip:'むねがいたい = 가슴이 아파요', examples:[{japanese:'むねがどきどきします。',korean:'가슴이 두근거려요.'},{japanese:'むねにいたみがあります。',korean:'가슴에 통증이 있어요.'}] },
  { id:'nw_senaka',    japanese:'せなか',      kanji:'背中(せなか)',         korean:'등',                     english:'Back',                         tip:'せなかがいたい = 등이 아파요', examples:[{japanese:'せなかをもんでください。',korean:'등을 주물러 주세요.'},{japanese:'せなかがいたくてねむれません。',korean:'등이 아파서 잠을 못 자요.'}] },
  { id:'nw_nodo',      japanese:'のど',        kanji:'喉(のど)',             korean:'목 (인후)',               english:'Throat',                       tip:'のどがいたい = 목이 아파요', examples:[{japanese:'のどがいたくてものがたべられません。',korean:'목이 아파서 음식을 먹을 수 없어요.'},{japanese:'のどがかわきました。みずをください。',korean:'목이 말랐어요. 물 주세요.'}] },
  { id:'nw_mimi',      japanese:'みみ',        kanji:'耳(みみ)',             korean:'귀',                     english:'Ear',                          tip:'みみがいたい = 귀가 아파요', examples:[{japanese:'みみのおくがいたいです。',korean:'귀 안쪽이 아파요.'},{japanese:'ここすこしきこえにくいです。',korean:'귀가 좀 잘 안 들려요.'}] },
  { id:'nw_ha',        japanese:'は',          kanji:'歯(は)',               korean:'이 (치아)',               english:'Tooth',                        tip:'はがいたい = 이가 아파요', examples:[{japanese:'はがいたいです。はいしゃにいきたいです。',korean:'이가 아파요. 치과에 가고 싶어요.'},{japanese:'このは、たべるとしみます。',korean:'이 이가 먹을 때 시려요.'}] },
  { id:'nw_hiza',      japanese:'ひざ',        kanji:'膝(ひざ)',             korean:'무릎',                   english:'Knee',                         tip:'ひざがいたい = 무릎이 아파요', examples:[{japanese:'ひざをけがしました。',korean:'무릎을 다쳤어요.'},{japanese:'かいだんをのぼるとひざがいたい。',korean:'계단을 오르면 무릎이 아파요.'}] },
  { id:'nw_yubisaki',  japanese:'ゆびさき',    kanji:'指先(ゆびさき)',       korean:'손가락 끝',              english:'Fingertip',                    examples:[{japanese:'ゆびさきがかじかんでいます。',korean:'손가락 끝이 곱았어요.'},{japanese:'ゆびさきにけがをしました。',korean:'손가락 끝을 다쳤어요.'}] },
  { id:'nw_kenkou',    japanese:'けんこう',    kanji:'健康(けんこう)',       korean:'건강',                   english:'Health',                       tip:'けんこうにきをつけて = 건강 조심해요', examples:[{japanese:'けんこうのためにまいにちさんぽします。',korean:'건강을 위해 매일 산책해요.'},{japanese:'けんこうがいちばんたいせつです。',korean:'건강이 제일 중요해요.'}] },
  { id:'nw_undobusoku',japanese:'うんどうぶそく', kanji:'運動(うんどう)不足(ぶそく)', korean:'운동 부족',       english:'Lack of exercise',             examples:[{japanese:'さいきんうんどうぶそくです。',korean:'요즘 운동 부족이에요.'},{japanese:'うんどうぶそくかいしょうのためにじむにいきます。',korean:'운동 부족 해결을 위해 헬스장에 가요.'}] },
  { id:'nw_suimin',    japanese:'すいみん',    kanji:'睡眠(すいみん)',       korean:'수면',                   english:'Sleep',                        tip:'すいみんふそく = 수면 부족', examples:[{japanese:'じゅうぶんなすいみんをとってください。',korean:'충분한 수면을 취해 주세요.'},{japanese:'すいみんのしつがたいせつです。',korean:'수면의 질이 중요해요.'}] },
  { id:'nw_allergy',   japanese:'アレルギー',                                korean:'알레르기',               english:'Allergy',                      tip:'食物アレルギーは必ず伝える', examples:[{japanese:'えびアレルギーがあります。',korean:'새우 알레르기가 있어요.'},{japanese:'このりょうりにアレルギーのあるしょくざいはありますか？',korean:'이 요리에 알레르기 식재료가 있나요?'}] },

  // ══════════════════════════════════════════════════════
  //  감정·기분 (Emotions & Feelings)
  // ══════════════════════════════════════════════════════
  { id:'nw_odoroki',   japanese:'おどろき',    kanji:'驚(おどろ)き',        korean:'놀라움',                 english:'Surprise / Astonishment',      examples:[{japanese:'そのニュースにはおどろきました！',korean:'그 뉴스에는 놀랐어요!'},{japanese:'おどろきのあまりこえがでませんでした。',korean:'너무 놀라서 말이 안 나왔어요.'}] },
  { id:'nw_fuan',      japanese:'ふあん',      kanji:'不安(ふあん)',        korean:'불안',                   english:'Anxiety / Worry',              tip:'ふあんをかんじる = 불안함을 느끼다', examples:[{japanese:'はじめてのひとりたびはすこしふあんです。',korean:'첫 혼자 여행은 조금 불안해요.'},{japanese:'ふあんにならなくていいですよ。',korean:'불안해하지 않아도 돼요.'}] },
  { id:'nw_ikari',     japanese:'いかり',      kanji:'怒(いか)り',          korean:'분노',                   english:'Anger',                        tip:'おこる (怒る) = 화내다', examples:[{japanese:'そのことには、いかりをかんじました。',korean:'그 일에는 분노를 느꼈어요.'},{japanese:'いかりをおさえてください。',korean:'분노를 참아주세요.'}] },
  { id:'nw_haji',      japanese:'はずかしい',  kanji:'恥(はず)かしい',      korean:'부끄럽다',               english:'Embarrassed / Ashamed',        tip:'はずかしがりや = 수줍음 많은 사람', examples:[{japanese:'まちがえてはずかしかったです。',korean:'틀려서 부끄러웠어요.'},{japanese:'そんなにみないで、はずかしい！',korean:'그렇게 보지 마요, 부끄러워!'}] },
  { id:'nw_shimpai',   japanese:'しんぱい',    kanji:'心配(しんぱい)',      korean:'걱정',                   english:'Worry / Concern',              tip:'しんぱいする = 걱정하다', examples:[{japanese:'しんぱいしないでください。',korean:'걱정하지 마세요.'},{japanese:'かれのことがしんぱいです。',korean:'그 사람이 걱정돼요.'}] },
  { id:'nw_kofun',     japanese:'こうふん',    kanji:'興奮(こうふん)',      korean:'흥분',                   english:'Excitement',                   tip:'こうふんする = 흥분하다', examples:[{japanese:'はじめてのにほんでこうふんしています！',korean:'처음 일본이라 흥분돼요!'},{japanese:'こうふんしてねむれませんでした。',korean:'흥분해서 잠을 못 잤어요.'}] },
  { id:'nw_natsukashii', japanese:'なつかしい', kanji:'懐(なつ)かしい',    korean:'그립다 / 옛 생각이 난다', english:'Nostalgic / Miss (old memory)',tip:'なつかしいきもち = 향수의 감정', examples:[{japanese:'このきょくをきくとなつかしい気もちになります。',korean:'이 곡을 들으면 그리운 기분이 돼요.'},{japanese:'こどものころがなつかしいです。',korean:'어린 시절이 그립네요.'}] },
  { id:'nw_anshin',    japanese:'あんしん',    kanji:'安心(あんしん)',      korean:'안심',                   english:'Relief / Peace of mind',       tip:'あんしんする = 안심하다', examples:[{japanese:'なくしたさいふがみつかってあんしんしました。',korean:'잃어버린 지갑이 발견되어 안심했어요.'},{japanese:'あんしんしてください。だいじょうぶですよ。',korean:'안심하세요. 괜찮아요.'}] },
  { id:'nw_kyomi',     japanese:'きょうみ',    kanji:'興味(きょうみ)',      korean:'흥미 / 관심',            english:'Interest / Curiosity',         tip:'きょうみがある = 흥미가 있다', examples:[{japanese:'にほんごにきょうみがあります。',korean:'일본어에 흥미가 있어요.'},{japanese:'どんなことにきょうみがありますか？',korean:'어떤 것에 관심이 있어요?'}] },
  { id:'nw_kandou',    japanese:'かんどう',    kanji:'感動(かんどう)',      korean:'감동',                   english:'Moved / Deeply impressed',     tip:'かんどうする = 감동하다', examples:[{japanese:'そのえいがにはかんどうしました。',korean:'그 영화에 감동받았어요.'},{japanese:'かんどうしてなきそうになりました。',korean:'감동해서 울 뻔했어요.'}] },

  // ══════════════════════════════════════════════════════
  //  취미·여가 (Hobbies & Leisure)
  // ══════════════════════════════════════════════════════
  { id:'nw_dokusho',   japanese:'どくしょ',    kanji:'読書(どくしょ)',      korean:'독서',                   english:'Reading (books)',              tip:'どくしょするのがすき = 책 읽는 걸 좋아해', examples:[{japanese:'どくしょがしゅみです。',korean:'독서가 취미예요.'},{japanese:'まいにちすくなくとも３０ぷんはどくしょします。',korean:'매일 최소 30분은 독서해요.'}] },
  { id:'nw_ongaku',    japanese:'おんがく',    kanji:'音楽(おんがく)',      korean:'음악',                   english:'Music',                        tip:'おんがくをきく = 음악을 듣다', examples:[{japanese:'どんなおんがくがすきですか？',korean:'어떤 음악을 좋아해요?'},{japanese:'おんがくをきくとリラックスできます。',korean:'음악을 들으면 릴랙스할 수 있어요.'}] },
  { id:'nw_ryokou',    japanese:'りょこう',    kanji:'旅行(りょこう)',      korean:'여행',                   english:'Travel / Trip',                tip:'りょこうのけいかくをたてる = 여행 계획을 세우다', examples:[{japanese:'りょこうがだいすきです！',korean:'여행을 너무 좋아해요!'},{japanese:'ひとりりょこうにちょうせんしました。',korean:'혼자 여행에 도전했어요.'}] },
  { id:'nw_ryouri',    japanese:'りょうり',    kanji:'料理(りょうり)',      korean:'요리',                   english:'Cooking',                      tip:'りょうりをつくる = 요리를 만들다', examples:[{japanese:'しゅうまつにりょうりをつくるのがすきです。',korean:'주말에 요리 만드는 걸 좋아해요.'},{japanese:'にほんりょうりにちょうせんしてみました。',korean:'일본 요리에 도전해 봤어요.'}] },
  { id:'nw_sports',    japanese:'スポーツ',                                  korean:'스포츠',                 english:'Sports',                       tip:'スポーツをする = 스포츠를 하다', examples:[{japanese:'どんなスポーツがすきですか？',korean:'어떤 스포츠를 좋아해요?'},{japanese:'まいしゅうスポーツジムにいきます。',korean:'매주 스포츠 헬스장에 가요.'}] },
  { id:'nw_shashin',   japanese:'しゃしん',    kanji:'写真(しゃしん)',      korean:'사진',                   english:'Photo / Photography',          tip:'しゃしんをとる = 사진을 찍다', examples:[{japanese:'しゃしんをとってもいいですか？',korean:'사진 찍어도 괜찮나요?'},{japanese:'りょこうちでたくさんしゃしんをとりました。',korean:'여행지에서 사진을 많이 찍었어요.'}] },
  { id:'nw_anime',     japanese:'アニメ',                                    korean:'애니메이션',             english:'Anime (Japanese animation)',   tip:'アニメのせいちじゅんれい = 성지순례', examples:[{japanese:'どんなアニメがすきですか？',korean:'어떤 애니를 좋아해요?'},{japanese:'このアニメのせいちにきました！',korean:'이 애니의 성지에 왔어요!'}] },
  { id:'nw_manga',     japanese:'まんが',      kanji:'漫画(まんが)',        korean:'만화',                   english:'Manga (Japanese comics)',      tip:'こうにゅうか、まんがきっさで読む', examples:[{japanese:'このまんがはめちゃくちゃおもしろいです！',korean:'이 만화는 완전 재미있어요!'},{japanese:'まんがきっさにいったことがありますか？',korean:'만화카페에 가본 적 있어요?'}] },
  { id:'nw_onsen',     japanese:'おんせん',    kanji:'温泉(おんせん)',      korean:'온천',                   english:'Hot spring',                   tip:'入浴マナーに注意！タオルは頭に', examples:[{japanese:'おんせんにいきたいです！',korean:'온천에 가고 싶어요!'},{japanese:'おんせんのおゆはとてもあつかった。',korean:'온천 물이 매우 뜨거웠어요.'}] },
  { id:'nw_karaoke',   japanese:'カラオケ',                                  korean:'가라오케 (노래방)',      english:'Karaoke',                      tip:'一人カラオケ (ヒトカラ) も人気', examples:[{japanese:'カラオケにいきましょう！',korean:'가라오케 가요!'},{japanese:'カラオケでにほんごのきょくをうたいました。',korean:'가라오케에서 일본어 노래를 불렀어요.'}] },
  { id:'nw_gardening', japanese:'ガーデニング',                              korean:'가드닝 / 정원 가꾸기',   english:'Gardening',                    examples:[{japanese:'ガーデニングがしゅみです。',korean:'가드닝이 취미예요.'},{japanese:'まいあさはなにみずをやります。',korean:'매일 아침 꽃에 물을 줘요.'}] },

  // ══════════════════════════════════════════════════════
  //  쇼핑·물건 사기 (Shopping)
  // ══════════════════════════════════════════════════════
  { id:'nw_nedan',     japanese:'ねだん',      kanji:'値段(ねだん)',        korean:'가격 / 값',              english:'Price',                        tip:'ねだんはいくらですか = 가격이 얼마예요?', examples:[{japanese:'このねだんはたかいですか？',korean:'이 가격은 비싼가요?'},{japanese:'ねだんをおしえてください。',korean:'가격을 알려 주세요.'}] },
  { id:'nw_waribiki',  japanese:'わりびき',    kanji:'割引(わりびき)',      korean:'할인',                   english:'Discount',                     tip:'20%わりびき = 20% 할인', examples:[{japanese:'わりびきはありますか？',korean:'할인은 있나요?'},{japanese:'これ、わりびきしてもらえますか？',korean:'이거 할인해 주실 수 있나요?'}] },
  { id:'nw_menzei',    japanese:'めんぜい',    kanji:'免税(めんぜい)',      korean:'면세',                   english:'Tax exemption / Duty-free',    tip:'パスポートを提示すると免税に', examples:[{japanese:'めんぜいのてつづきをしてください。',korean:'면세 수속을 해주세요.'},{japanese:'めんぜいカウンターはどこですか？',korean:'면세 카운터는 어디에 있나요?'}] },
  { id:'nw_shichaku',  japanese:'しちゃく',    kanji:'試着(しちゃく)',      korean:'시착 (옷 입어보기)',     english:'Trying on (clothes)',          tip:'しちゃくしていいですか = 입어봐도 되나요?', examples:[{japanese:'しちゃくしてもいいですか？',korean:'입어봐도 되나요?'},{japanese:'しちゃくしつはどこですか？',korean:'피팅룸은 어디에 있나요?'}] },
  { id:'nw_iro',       japanese:'いろ',        kanji:'色(いろ)',             korean:'색 / 색깔',              english:'Color',                        tip:'べつのいろはありますか = 다른 색은 있나요?', examples:[{japanese:'ほかのいろはありますか？',korean:'다른 색은 있나요?'},{japanese:'どのいろがすきですか？',korean:'어떤 색을 좋아해요?'}] },
  { id:'nw_saizu',     japanese:'サイズ',                                    korean:'사이즈',                 english:'Size',                         tip:'SML など。日本サイズはやや小さめ', examples:[{japanese:'もうすこしおおきいサイズはありますか？',korean:'조금 더 큰 사이즈는 있나요?'},{japanese:'このサイズはわたしにあいますか？',korean:'이 사이즈가 나한테 맞을까요?'}] },
  { id:'nw_tsutsumi',  japanese:'つつみ',      kanji:'包(つつ)み',          korean:'포장',                   english:'Wrapping / Gift wrap',         tip:'プレゼント用にていねいにつつみます', examples:[{japanese:'プレゼントようにつつんでいただけますか？',korean:'선물용으로 포장해 주실 수 있나요?'},{japanese:'ギフトつつみはありますか？',korean:'선물 포장이 있나요?'}] },
  { id:'nw_reji',      japanese:'レジ',                                      korean:'계산대',                 english:'Cash register / Checkout',     tip:'レジはどこ？と聞こう', examples:[{japanese:'レジはどこですか？',korean:'계산대는 어디인가요?'},{japanese:'レジでポイントカードをつかいました。',korean:'계산대에서 포인트 카드를 사용했어요.'}] },
  { id:'nw_pointcard', japanese:'ポイントカード',                            korean:'포인트 카드',            english:'Points card / Loyalty card',   tip:'ポイントカードはお持ちですか？ = 포인트 카드 있으세요?', examples:[{japanese:'ポイントカードはありますか？',korean:'포인트 카드는 있나요?'},{japanese:'ポイントをつかうとやすくなります。',korean:'포인트를 쓰면 저렴해져요.'}] },
  { id:'nw_uriage',    japanese:'うりあげ',    kanji:'売(う)り場(ば)',      korean:'매장 / 판매장',          english:'Sales floor / Department',     examples:[{japanese:'かばんのうりばはなんかいですか？',korean:'가방 매장은 몇 층인가요?'},{japanese:'このうりばにはいろんなしょうひんがあります。',korean:'이 매장에는 다양한 상품이 있어요.'}] },
  { id:'nw_fukubukuro', japanese:'ふくぶくろ', kanji:'福袋(ふくぶくろ)',    korean:'복주머니 / 새해 선물 세트', english:'Lucky bag (New Year sale)',  tip:'お正月の初売りに人気！中身は秘密', examples:[{japanese:'ふくぶくろをかいました！なかみがたのしみ！',korean:'복주머니를 샀어요! 내용물이 기대돼요!'},{japanese:'ふくぶくろはおとくなことがおおい。',korean:'복주머니는 이득인 경우가 많아요.'}] },

  // ══════════════════════════════════════════════════════
  //  시간·날짜 (Time & Dates) — 추가
  // ══════════════════════════════════════════════════════
  { id:'nw_asa',       japanese:'あさ',        kanji:'朝(あさ)',             korean:'아침',                   english:'Morning',                      tip:'あさごはん = 아침밥', examples:[{japanese:'あさはやくおきました。',korean:'아침 일찍 일어났어요.'},{japanese:'あさのさんぽがすきです。',korean:'아침 산책을 좋아해요.'}] },
  { id:'nw_hiru',      japanese:'ひる',        kanji:'昼(ひる)',             korean:'낮',                     english:'Noon / Daytime',               tip:'ひるごはん = 점심', examples:[{japanese:'ひるにどこかでたべましょう。',korean:'낮에 어딘가에서 먹어요.'},{japanese:'ひるまはあついです。',korean:'낮에는 더워요.'}] },
  { id:'nw_yoru',      japanese:'よる',        kanji:'夜(よる)',             korean:'밤',                     english:'Night / Evening',              tip:'よるごはん = 저녁밥', examples:[{japanese:'よるはすずしくなります。',korean:'밤에는 서늘해져요.'},{japanese:'よるにまちをさんぽしました。',korean:'밤에 거리를 산책했어요.'}] },
  { id:'nw_raishu',    japanese:'らいしゅう',  kanji:'来週(らいしゅう)',    korean:'다음 주',                english:'Next week',                    examples:[{japanese:'らいしゅうまたあいましょう！',korean:'다음 주에 또 만나요!'},{japanese:'らいしゅうのよていはありますか？',korean:'다음 주 예정이 있어요?'}] },
  { id:'nw_senshuu',   japanese:'せんしゅう',  kanji:'先週(せんしゅう)',    korean:'지난 주',                english:'Last week',                    examples:[{japanese:'せんしゅうのにちようびはなにをしましたか？',korean:'지난 주 일요일에 무엇을 했나요?'},{japanese:'せんしゅうとうきょうにいきました。',korean:'지난 주에 도쿄에 갔어요.'}] },
  { id:'nw_kongetsu',  japanese:'こんげつ',    kanji:'今月(こんげつ)',      korean:'이번 달',                english:'This month',                   examples:[{japanese:'こんげつはいそがしいです。',korean:'이번 달은 바빠요.'},{japanese:'こんげつのよていをおしえてください。',korean:'이번 달 예정을 알려 주세요.'}] },
  { id:'nw_rainen',    japanese:'らいねん',    kanji:'来年(らいねん)',      korean:'내년',                   english:'Next year',                    examples:[{japanese:'らいねんもよろしくおねがいします。',korean:'내년에도 잘 부탁드려요.'},{japanese:'らいねんにまたにほんにきたいです。',korean:'내년에도 다시 일본에 오고 싶어요.'}] },
  { id:'nw_kyonen',    japanese:'きょねん',    kanji:'去年(きょねん)',      korean:'작년',                   english:'Last year',                    examples:[{japanese:'きょねんはじめてにほんにきました。',korean:'작년에 처음 일본에 왔어요.'},{japanese:'きょねんのふゆはさむかったです。',korean:'작년 겨울은 추웠어요.'}] },
  { id:'nw_gozen',     japanese:'ごぜん',      kanji:'午前(ごぜん)',        korean:'오전 (AM)',               english:'AM / Morning time',            examples:[{japanese:'ごぜんちゅうにしかんがあります。',korean:'오전 중에 시간이 있어요.'},{japanese:'ごぜん９じにしゅっぱつします。',korean:'오전 9시에 출발해요.'}] },
  { id:'nw_gogo',      japanese:'ごご',        kanji:'午後(ごご)',          korean:'오후 (PM)',               english:'PM / Afternoon time',          examples:[{japanese:'ごご２じにあいましょう。',korean:'오후 2시에 만나요.'},{japanese:'ごごはじゆうです。',korean:'오후는 자유에요.'}] },
  { id:'nw_yakusoku',  japanese:'やくそく',    kanji:'約束(やくそく)',      korean:'약속',                   english:'Promise / Appointment',        tip:'やくそくをまもる = 약속을 지키다', examples:[{japanese:'やくそくをわすれないでください。',korean:'약속 잊지 마세요.'},{japanese:'３じにやくそくがあります。',korean:'3시에 약속이 있어요.'}] },

  // ══════════════════════════════════════════════════════
  //  교통·이동 (Transportation) — 추가
  // ══════════════════════════════════════════════════════
  { id:'nw_hikoki',    japanese:'ひこうき',    kanji:'飛行機(ひこうき)',    korean:'비행기',                 english:'Airplane',                     tip:'ひこうきにのる = 비행기를 타다', examples:[{japanese:'ひこうきにはじめてのりました！',korean:'비행기를 처음 탔어요!'},{japanese:'ひこうきはなんじかんかかりますか？',korean:'비행기로 몇 시간 걸려요?'}] },
  { id:'nw_shinkansen',japanese:'しんかんせん', kanji:'新幹線(しんかんせん)', korean:'신칸센',                 english:'Bullet train / Shinkansen',   tip:'のぞみ·ひかり·こだま', examples:[{japanese:'しんかんせんはとてもはやいですね！',korean:'신칸센은 정말 빠르네요!'},{japanese:'しんかんせんのきっぷはどこでかいますか？',korean:'신칸센 표는 어디서 사나요?'}] },
  { id:'nw_chikatetsu',japanese:'ちかてつ',    kanji:'地下鉄(ちかてつ)',    korean:'지하철',                 english:'Subway / Underground',         tip:'東京メトロ·都営地下鉄など', examples:[{japanese:'ちかてつはべんりですね。',korean:'지하철은 편리하네요.'},{japanese:'ちかてつののりかたをおしえてください。',korean:'지하철 타는 방법을 알려주세요.'}] },
  { id:'nw_jitenshya', japanese:'じてんしゃ',  kanji:'自転車(じてんしゃ)',  korean:'자전거',                 english:'Bicycle',                      tip:'レンタサイクル = 렌탈 자전거', examples:[{japanese:'じてんしゃをかりることができますか？',korean:'자전거를 빌릴 수 있나요?'},{japanese:'じてんしゃでまちをまわりました。',korean:'자전거로 마을을 돌았어요.'}] },
  { id:'nw_tohoirifun', japanese:'とほ〜ふん', kanji:'徒歩(とほ)〜分(ふん)', korean:'도보 〜분',              english:'~ minutes on foot',            tip:'とほ５ふん = 도보 5분', examples:[{japanese:'えきからとほ５ふんです。',korean:'역에서 도보 5분이에요.'},{japanese:'ここからとほでいけますか？',korean:'여기서 걸어서 갈 수 있나요?'}] },
  { id:'nw_noriba',    japanese:'のりば',      kanji:'乗(の)り場(ば)',      korean:'탑승장 / 승강장',        english:'Boarding point / Platform',    examples:[{japanese:'バスのりばはどこですか？',korean:'버스 탑승장은 어디인가요?'},{japanese:'のりばをかくにんしてください。',korean:'탑승장을 확인해 주세요.'}] },
  { id:'nw_manshuu',   japanese:'まんいん',    kanji:'満員(まんいん)',      korean:'만원 (꽉 참)',            english:'Full capacity / Packed',       tip:'満員電車 = 만원 전철', examples:[{japanese:'でんしゃがまんいんです。',korean:'전철이 만원이에요.'},{japanese:'まんいんでのれませんでした。',korean:'만원이라서 못 탔어요.'}] },
  { id:'nw_hassya',    japanese:'はっしゃ',    kanji:'発車(はっしゃ)',      korean:'발차 (열차 출발)',        english:'Departure (of train)',         tip:'はっしゃじこく = 발차 시각', examples:[{japanese:'つぎのでんしゃのはっしゃはいつですか？',korean:'다음 열차 발차는 언제예요?'},{japanese:'はっしゃまであと３ふんです。',korean:'발차까지 3분 남았어요.'}] },
  { id:'nw_tochaku',   japanese:'とうちゃく',  kanji:'到着(とうちゃく)',    korean:'도착',                   english:'Arrival',                      tip:'とうちゃくよてい = 도착 예정', examples:[{japanese:'とうきょうにとうちゃくしました！',korean:'도쿄에 도착했어요!'},{japanese:'とうちゃくよていじこくはなんじですか？',korean:'도착 예정 시각은 몇 시예요?'}] },
  { id:'nw_pasmo',     japanese:'パスモ',                                   korean:'파스모 (IC 교통 카드)',   english:'PASMO (IC transit card)',      tip:'SuicaとPASMOは相互利用可能', examples:[{japanese:'パスモはSuicaとつかいかたはおなじですか？',korean:'파스모는 스이카와 사용법이 같아요?'},{japanese:'パスモにチャージしてください。',korean:'파스모를 충전해 주세요.'}] },

  // ══════════════════════════════════════════════════════
  //  직업·일 (Jobs & Work)
  // ══════════════════════════════════════════════════════
  { id:'nw_isha',      japanese:'いしゃ',      kanji:'医者(いしゃ)',        korean:'의사',                   english:'Doctor',                       tip:'かかりつけいしゃ = 주치의', examples:[{japanese:'わたしはいしゃです。',korean:'저는 의사예요.'},{japanese:'いしゃにみてもらいたいです。',korean:'의사한테 진찰 받고 싶어요.'}] },
  { id:'nw_kangoshi',  japanese:'かんごし',    kanji:'看護師(かんごし)',    korean:'간호사',                 english:'Nurse',                        examples:[{japanese:'かんごしさんがやさしくせつめいしてくれました。',korean:'간호사분이 친절하게 설명해 줬어요.'},{japanese:'かんごしになりたいです。',korean:'간호사가 되고 싶어요.'}] },
  { id:'nw_sensei',    japanese:'せんせい',    kanji:'先生(せんせい)',      korean:'선생님',                 english:'Teacher',                      tip:'학교 선생님 외에 의사·변호사도 せんせい라 부름', examples:[{japanese:'たなかせんせいはやさしいです。',korean:'다나카 선생님은 친절해요.'},{japanese:'にほんごのせんせいになりたいです。',korean:'일본어 선생님이 되고 싶어요.'}] },
  { id:'nw_gakusei',   japanese:'がくせい',    kanji:'学生(がくせい)',      korean:'학생',                   english:'Student',                      tip:'だいがくせい = 대학생', examples:[{japanese:'いまだいがくせいです。',korean:'지금 대학생이에요.'},{japanese:'がくせいわりびきはありますか？',korean:'학생 할인이 있나요?'}] },
  { id:'nw_kaisyain',  japanese:'かいしゃいん', kanji:'会社員(かいしゃいん)', korean:'회사원',               english:'Company employee / Office worker', tip:'サラリーマンとも言う', examples:[{japanese:'かいしゃいんとしてはたらいています。',korean:'회사원으로 일하고 있어요.'},{japanese:'かいしゃいんはいそがしいです。',korean:'회사원은 바빠요.'}] },
  { id:'nw_enginia',   japanese:'エンジニア',                               korean:'엔지니어',               english:'Engineer',                     examples:[{japanese:'ITエンジニアとしてはたらいています。',korean:'IT 엔지니어로 일하고 있어요.'},{japanese:'エンジニアにとってにほんごはやくにたちます。',korean:'엔지니어에게 일본어는 도움이 돼요.'}] },
  { id:'nw_dezainaa',  japanese:'デザイナー',                               korean:'디자이너',               english:'Designer',                     examples:[{japanese:'グラフィックデザイナーです。',korean:'그래픽 디자이너예요.'},{japanese:'デザイナーとしてのしごとをたのしんでいます。',korean:'디자이너로서 일을 즐기고 있어요.'}] },
  { id:'nw_tenin',     japanese:'てんいん',    kanji:'店員(てんいん)',      korean:'점원',                   english:'Shop staff / Clerk',           examples:[{japanese:'てんいんさんにきいてみましょう。',korean:'점원에게 물어봐요.'},{japanese:'てんいんさんがていねいにおしえてくれました。',korean:'점원이 친절하게 알려줬어요.'}] },
  { id:'nw_hisho',     japanese:'ひしょ',      kanji:'秘書(ひしょ)',        korean:'비서',                   english:'Secretary',                    examples:[{japanese:'しゃちょうのひしょをしています。',korean:'사장의 비서를 하고 있어요.'},{japanese:'ひしょはいつもいそがしいです。',korean:'비서는 항상 바빠요.'}] },
  { id:'nw_bengoshi',  japanese:'べんごし',    kanji:'弁護士(べんごし)',    korean:'변호사',                 english:'Lawyer / Attorney',            examples:[{japanese:'べんごしにそうだんしたいです。',korean:'변호사에게 상담하고 싶어요.'},{japanese:'かれはゆうめいなべんごしです。',korean:'그는 유명한 변호사예요.'}] },
  { id:'nw_ryorinin',  japanese:'りょうりにん', kanji:'料理人(りょうりにん)', korean:'요리사',               english:'Chef / Cook',                  examples:[{japanese:'プロのりょうりにんにりょうりをならいました。',korean:'프로 요리사에게 요리를 배웠어요.'},{japanese:'りょうりにんのゆめをかないたい。',korean:'요리사의 꿈을 이루고 싶어요.'}] },

  // ══════════════════════════════════════════════════════
  //  자연·환경 (Nature & Environment)
  // ══════════════════════════════════════════════════════
  { id:'nw_yama',      japanese:'やま',        kanji:'山(やま)',             korean:'산',                     english:'Mountain',                     tip:'やまのぼり = 등산', examples:[{japanese:'あのやまはなんですか？',korean:'저 산은 뭐예요?'},{japanese:'やまにのぼるのがすきです。',korean:'산에 오르는 걸 좋아해요.'}] },
  { id:'nw_umi',       japanese:'うみ',        kanji:'海(うみ)',             korean:'바다',                   english:'Sea / Ocean',                  tip:'うみにいこう = 바다 가자', examples:[{japanese:'うみがきれいですね！',korean:'바다가 예쁘네요!'},{japanese:'うみでおよぎたいです。',korean:'바다에서 수영하고 싶어요.'}] },
  { id:'nw_kawa',      japanese:'かわ',        kanji:'川(かわ)',             korean:'강',                     english:'River',                        tip:'かわべりさんぽ = 강변 산책', examples:[{japanese:'かわのながれがとてもきれいです。',korean:'강의 흐름이 매우 예뻐요.'},{japanese:'かわではなびがみえます。',korean:'강에서 불꽃놀이가 보여요.'}] },
  { id:'nw_mori',      japanese:'もり',        kanji:'森(もり)',             korean:'숲',                     english:'Forest',                       tip:'もりのなかをさんぽ = 숲속 산책', examples:[{japanese:'もりのなかはすずしいです。',korean:'숲속은 시원해요.'},{japanese:'もりでいろいろなとりをみました。',korean:'숲에서 다양한 새를 봤어요.'}] },
  { id:'nw_hana',      japanese:'はな',        kanji:'花(はな)',             korean:'꽃',                     english:'Flower',                       tip:'はなみ = 꽃구경 (벚꽃)', examples:[{japanese:'きれいなはながさいています！',korean:'예쁜 꽃이 피어 있어요!'},{japanese:'このはなのなまえはなんですか？',korean:'이 꽃의 이름은 뭐예요?'}] },
  { id:'nw_ki',        japanese:'き',          kanji:'木(き)',               korean:'나무',                   english:'Tree',                         tip:'いちょうのき = 은행나무', examples:[{japanese:'このきはなんのきですか？',korean:'이 나무는 무슨 나무예요?'},{japanese:'もみじのきのはがあかくなっています。',korean:'단풍나무 잎이 빨갛게 되어 있어요.'}] },
  { id:'nw_shizen',    japanese:'しぜん',      kanji:'自然(しぜん)',        korean:'자연',                   english:'Nature',                       examples:[{japanese:'にほんのしぜんはほんとうにうつくしいです。',korean:'일본의 자연은 정말 아름다워요.'},{japanese:'しぜんのなかでリラックスできます。',korean:'자연 속에서 릴랙스할 수 있어요.'}] },
  { id:'nw_taiyou',    japanese:'たいよう',    kanji:'太陽(たいよう)',      korean:'태양',                   english:'Sun / Sunlight',               tip:'たいようがつよい = 햇빛이 강하다', examples:[{japanese:'たいようがつよいので、ひやけどめをぬってください。',korean:'햇빛이 강하니까 자외선 차단제를 발라주세요.'},{japanese:'たいようがしずんでいく。',korean:'태양이 저물어 가요.'}] },
  { id:'nw_tsuki',     japanese:'つき',        kanji:'月(つき)',             korean:'달',                     english:'Moon',                         tip:'まんげつ = 보름달', examples:[{japanese:'きょうはまんげつですね。',korean:'오늘은 보름달이네요.'},{japanese:'つきがきれいだなあ。',korean:'달이 예쁘다.'}] },
  { id:'nw_hoshi',     japanese:'ほし',        kanji:'星(ほし)',             korean:'별',                     english:'Star',                         tip:'ほしぞらがきれい = 별 하늘이 예쁜', examples:[{japanese:'いなかにいくとほしがよくみえます。',korean:'시골에 가면 별이 잘 보여요.'},{japanese:'ながれぼしをみました！',korean:'유성을 봤어요!'}] },
  { id:'nw_kuuki',     japanese:'くうき',      kanji:'空気(くうき)',        korean:'공기',                   english:'Air',                          tip:'くうきがきれい = 공기가 깨끗해', examples:[{japanese:'やまのくうきはとてもきれいです。',korean:'산의 공기는 매우 깨끗해요.'},{japanese:'このまちのくうきはすこしわるいです。',korean:'이 도시의 공기는 조금 나빠요.'}] },

  // ══════════════════════════════════════════════════════
  //  문장 — 병원에서 (At the Hospital)
  // ══════════════════════════════════════════════════════
  { id:'ns_byoin1',    japanese:'〜がいたいです',          kanji:'〜が痛(いた)いです',      korean:'〜가 아파요',            english:'~ hurts / ~ is in pain',        tip:'のどがいたい·あたまがいたいなど自由に使う', examples:[{japanese:'のどがいたいです。',korean:'목이 아파요.'},{japanese:'おなかがいたくて、たべられません。',korean:'배가 아파서 먹을 수 없어요.'}] },
  { id:'ns_byoin2',    japanese:'ねつがあります',          kanji:'熱(ねつ)があります',      korean:'열이 있어요',            english:'I have a fever',                tip:'なんどですか = 몇 도예요?', examples:[{japanese:'ねつがあって、からだがだるいです。',korean:'열이 있고 몸이 나른해요.'},{japanese:'ねつがさがりません。',korean:'열이 안 내려요.'}] },
  { id:'ns_byoin3',    japanese:'せきがとまりません',                                        korean:'기침이 멈추지 않아요',   english:'My cough won\'t stop',          tip:'せき = 기침', examples:[{japanese:'せきがとまらなくてつらいです。',korean:'기침이 멈추지 않아서 힘들어요.'},{japanese:'かんのせきがでています。',korean:'마른 기침이 나고 있어요.'}] },
  { id:'ns_byoin4',    japanese:'きぶんがわるいです',      kanji:'気分(きぶん)が悪(わる)いです', korean:'기분이 안 좋아요 / 메스꺼워요', english:'I feel sick / I feel unwell', tip:'きもちがわるい와 같은 의미', examples:[{japanese:'バスにのったらきぶんがわるくなりました。',korean:'버스를 타니 기분이 나빠졌어요.'},{japanese:'きぶんがわるくて、たちあがれません。',korean:'기분이 안 좋아서 일어나지 못해요.'}] },
  { id:'ns_byoin5',    japanese:'ここにしんさつしてください',                                korean:'여기 진찰해 주세요',      english:'Please examine me here',        tip:'いたいところをゆびでさす', examples:[{japanese:'このあたりがいたいので、しんさつしてください。',korean:'이 근처가 아파서 진찰해 주세요.'},{japanese:'むねのしんさつをおねがいします。',korean:'가슴 진찰을 부탁드려요.'}] },
  { id:'ns_byoin6',    japanese:'アレルギーがあります',                                      korean:'알레르기가 있어요',       english:'I have an allergy',             tip:'どんなアレルギーですか？と聞かれる', examples:[{japanese:'えびとかにのアレルギーがあります。',korean:'새우와 게 알레르기가 있어요.'},{japanese:'かぶれのアレルギーがあります。',korean:'접촉성 알레르기가 있어요.'}] },
  { id:'ns_byoin7',    japanese:'にゅういんしなければなりませんか', kanji:'入院(にゅういん)しなければなりませんか', korean:'입원해야 하나요?', english:'Do I need to be hospitalized?', examples:[{japanese:'にゅういんひようはいくらくらいですか？',korean:'입원 비용은 얼마 정도예요?'},{japanese:'にゅういんしなくてすみましたよかった。',korean:'입원 안 해도 돼서 다행이에요.'}] },
  { id:'ns_byoin8',    japanese:'ほけんしょうをもっています',     kanji:'保険証(ほけんしょう)を持(も)っています', korean:'보험증을 가지고 있어요', english:'I have my insurance card',      tip:'海外旅行保険の英文書類が必要なことも', examples:[{japanese:'りょこうほけんにはいっています。',korean:'여행 보험에 가입되어 있어요.'},{japanese:'ほけんしょうをみせてください。',korean:'보험증을 보여주세요.'}] },
  { id:'ns_byoin9',    japanese:'くすりをしょほうしてください',   kanji:'薬(くすり)を処方(しょほう)してください', korean:'약을 처방해 주세요',  english:'Please prescribe medicine',     examples:[{japanese:'いたみどめをしょほうしていただけますか？',korean:'진통제를 처방해 주실 수 있나요?'},{japanese:'このくすりはいちにちにんかいのむのですか？',korean:'이 약은 하루에 두 번 먹는 건가요?'}] },
  { id:'ns_byoin10',   japanese:'にほんごがわかりますか',                                    korean:'일본어 할 수 있나요?',    english:'Do you understand Japanese?',  tip:'えいごのはなせるいしゃはいますか = 영어 가능한 의사 있나요?', examples:[{japanese:'えいごのはなせるいしゃはいますか？',korean:'영어를 할 수 있는 의사는 있나요?'},{japanese:'かんこくごのつうやくはいますか？',korean:'한국어 통역이 있나요?'}] },

  // ══════════════════════════════════════════════════════
  //  문장 — 쇼핑몰에서 (At the Mall)
  // ══════════════════════════════════════════════════════
  { id:'ns_mall1',     japanese:'これをかえますか',         kanji:'これを替(か)えますか',   korean:'이것을 교환할 수 있나요?',  english:'Can I exchange this?',         examples:[{japanese:'これをかえたいのですが、サイズがちがいます。',korean:'이것을 교환하고 싶은데요, 사이즈가 달라요.'},{japanese:'レシートがあればかえられますか？',korean:'영수증이 있으면 교환할 수 있나요?'}] },
  { id:'ns_mall2',     japanese:'へんぴんしたいのですが',   kanji:'返品(へんぴん)したいのですが', korean:'반품하고 싶은데요',      english:'I\'d like to return this',     tip:'ほかのいろ/サイズにかえたい = 다른 색/사이즈로 교환하고 싶어', examples:[{japanese:'これ、かいたばかりなのですがへんぴんできますか？',korean:'이거 방금 샀는데 반품 가능한가요?'},{japanese:'へんぴんのてつづきをおねがいします。',korean:'반품 수속을 부탁드려요.'}] },
  { id:'ns_mall3',     japanese:'めんぜいのてつづきをおしえてください', kanji:'免税(めんぜい)の手続(てつづ)きを教(おし)えてください', korean:'면세 수속을 알려 주세요', english:'Please explain the duty-free procedure', examples:[{japanese:'めんぜいカウンターはどこですか？',korean:'면세 카운터는 어디인가요?'},{japanese:'めんぜいにはパスポートがひつようです。',korean:'면세에는 여권이 필요해요.'}] },
  { id:'ns_mall4',     japanese:'ポイントをつかいたいです',                                  korean:'포인트를 사용하고 싶어요', english:'I\'d like to use my points',    examples:[{japanese:'ポイントをつかうといくらになりますか？',korean:'포인트를 쓰면 얼마가 되나요?'},{japanese:'ポイントがたりませんか？',korean:'포인트가 부족한가요?'}] },
  { id:'ns_mall5',     japanese:'クレジットカードはつかえますか',                            korean:'신용카드는 쓸 수 있나요?', english:'Can I use a credit card?',     tip:'ICチップ付きカードがあればOK', examples:[{japanese:'ビザカードはつかえますか？',korean:'비자카드는 쓸 수 있나요?'},{japanese:'タッチ決済はできますか？',korean:'탭 결제는 가능한가요?'}] },
  { id:'ns_mall6',     japanese:'レシートをください',                                         korean:'영수증을 주세요',          english:'Please give me a receipt',     examples:[{japanese:'レシートはいりますか？　はい、ください。',korean:'영수증 필요하세요? 네, 주세요.'},{japanese:'レシートをなくしました。もういちどもらえますか？',korean:'영수증을 잃어버렸어요. 다시 받을 수 있나요?'}] },
  { id:'ns_mall7',     japanese:'ラッピングをおねがいします',                                 korean:'포장을 부탁드려요',         english:'Gift wrapping please',         tip:'プレゼント用にどうぞ', examples:[{japanese:'ギフトようにラッピングをおねがいできますか？',korean:'선물용으로 포장을 부탁드릴 수 있나요?'},{japanese:'ラッピングはむりょうですか？',korean:'포장은 무료인가요?'}] },
  { id:'ns_mall8',     japanese:'ほかのみせはどこですか',   kanji:'他(ほか)の店(みせ)はどこですか', korean:'다른 매장은 어디인가요?', english:'Where is the other store?', examples:[{japanese:'このブランドのみせはほかにもありますか？',korean:'이 브랜드 가게가 다른 곳에도 있나요?'},{japanese:'ちかくにほかのかいてんがありますか？',korean:'근처에 다른 점포가 있나요?'}] },

  // ══════════════════════════════════════════════════════
  //  문장 — 카페에서 (At the Café)
  // ══════════════════════════════════════════════════════
  { id:'ns_cafe1',     japanese:'〜をひとつください',                                         korean:'〜를 하나 주세요',         english:'One ~ please',                 tip:'コーヒーをひとつ、ケーキをふたつ など', examples:[{japanese:'ラテをひとつください。',korean:'라테 하나 주세요.'},{japanese:'チーズケーキをふたつください。',korean:'치즈케이크 두 개 주세요.'}] },
  { id:'ns_cafe2',     japanese:'ホットとアイス、どちらにしますか',                            korean:'핫과 아이스, 어떤 것으로 하시겠어요?', english:'Hot or iced, which would you like?', examples:[{japanese:'ホットにします。',korean:'핫으로 할게요.'},{japanese:'アイスでおねがいします。',korean:'아이스로 부탁드려요.'}] },
  { id:'ns_cafe3',     japanese:'さとうとミルクはぬきで',                                     korean:'설탕과 밀크는 빼고요',      english:'Without sugar and milk',       tip:'ブラックでおねがいします = 블랙으로 주세요', examples:[{japanese:'さとうぬきでおねがいします。',korean:'설탕 빼고 부탁드려요.'},{japanese:'ミルクだけいれてください。',korean:'밀크만 넣어주세요.'}] },
  { id:'ns_cafe4',     japanese:'テイクアウトでおねがいします',                               korean:'테이크아웃으로 부탁드려요', english:'To go please / Takeaway',      tip:'もちかえり = 테이크아웃', examples:[{japanese:'テイクアウトですか、おてんですか？',korean:'테이크아웃인가요, 드시고 가세요?'},{japanese:'もちかえりにしてください。',korean:'테이크아웃으로 해주세요.'}] },
  { id:'ns_cafe5',     japanese:'あのせき、つかってもいいですか',                             korean:'저 자리, 써도 되나요?',     english:'Can I use that seat?',        tip:'せきはあいていますか = 자리 비어 있나요?', examples:[{japanese:'このせきはあいていますか？',korean:'이 자리 비어 있나요?'},{japanese:'よこにすわってもいいですか？',korean:'옆에 앉아도 되나요?'}] },
  { id:'ns_cafe6',     japanese:'コンセントはつかえますか',                                   korean:'콘센트는 쓸 수 있나요?',   english:'Can I use the outlet?',       tip:'充電したいときに必須', examples:[{japanese:'コンセントをつかわせていただけますか？',korean:'콘센트를 사용해도 될까요?'},{japanese:'コンセントのそばにすわりたいです。',korean:'콘센트 옆에 앉고 싶어요.'}] },
  { id:'ns_cafe7',     japanese:'Wi-Fiのパスワードをおしえてください',                        korean:'와이파이 비밀번호를 알려 주세요', english:'Please tell me the Wi-Fi password', examples:[{japanese:'Wi-Fiはつかえますか？',korean:'와이파이는 쓸 수 있나요?'},{japanese:'Wi-Fiがつながりません。',korean:'와이파이가 연결되지 않아요.'}] },
  { id:'ns_cafe8',     japanese:'おすすめはなんですか',                                       korean:'추천은 무엇인가요?',        english:'What do you recommend?',      tip:'いちおしメニュー = 추천 메뉴', examples:[{japanese:'おすすめのケーキはありますか？',korean:'추천 케이크가 있나요?'},{japanese:'このカフェのいちおしをおしえてください。',korean:'이 카페의 추천을 알려주세요.'}] },
  { id:'ns_cafe9',     japanese:'おかわりはできますか',     kanji:'おかわりは出来(でき)ますか', korean:'리필이 되나요?',            english:'Can I get a refill?',         tip:'コーヒーのおかわりが多い', examples:[{japanese:'コーヒーのおかわりはできますか？',korean:'커피 리필 되나요?'},{japanese:'おかわりは一杯いくらですか？',korean:'리필은 한 잔에 얼마예요?'}] },
  { id:'ns_cafe10',    japanese:'モバイルオーダーはできますか',                                korean:'모바일 주문이 되나요?',     english:'Can I order by mobile?',      examples:[{japanese:'アプリでちゅうもんできますか？',korean:'앱으로 주문할 수 있나요?'},{japanese:'QRコードをよみとってちゅうもんしてください。',korean:'QR코드를 스캔해서 주문해 주세요.'}] },

  // ══════════════════════════════════════════════════════
  //  문장 — 직장에서 (At Work)
  // ══════════════════════════════════════════════════════
  { id:'ns_work1',     japanese:'かいぎはなんじからですか', kanji:'会議(かいぎ)は何時(なんじ)からですか', korean:'회의는 몇 시부터예요?', english:'What time does the meeting start?', examples:[{japanese:'かいぎはごごさんじからです。',korean:'회의는 오후 3시부터예요.'},{japanese:'かいぎのじゅんびはできていますか？',korean:'회의 준비는 됐나요?'}] },
  { id:'ns_work2',     japanese:'しりょうをおくりました',   kanji:'資料(しりょう)を送(おく)りました',  korean:'자료를 보냈어요',              english:'I sent the documents',         examples:[{japanese:'しりょうをメールでおくりました。',korean:'자료를 이메일로 보냈어요.'},{japanese:'しりょうがとどきましたか？',korean:'자료가 도착했나요?'}] },
  { id:'ns_work3',     japanese:'しめきりはいつですか',     kanji:'締切(しめきり)はいつですか',        korean:'마감은 언제예요?',             english:'When is the deadline?',        tip:'しめきりはあすです = 마감은 내일이에요', examples:[{japanese:'しめきりにまにあいます。',korean:'마감에 맞출 수 있어요.'},{japanese:'しめきりをのばしてもらえますか？',korean:'마감을 연장해 주실 수 있나요?'}] },
  { id:'ns_work4',     japanese:'しょうちしました',         kanji:'承知(しょうち)しました',            korean:'알겠습니다 (공손)',             english:'Understood / I see (formal)',  tip:'ビジネス敬語の最重要表現', examples:[{japanese:'しょうちしました。すぐたいおうします。',korean:'알겠습니다. 바로 대응할게요.'},{japanese:'しょうちいたしました。',korean:'잘 알겠습니다. (더 공손한 표현)'}] },
  { id:'ns_work5',     japanese:'たしかにうけとりました',   kanji:'確(たし)かに受(う)け取(と)りました', korean:'확실히 수령했습니다',           english:'I have received it (confirmed)', examples:[{japanese:'しりょうをたしかにうけとりました。',korean:'자료를 확실히 수령했습니다.'},{japanese:'メールをたしかにかくにんしました。',korean:'이메일을 확실히 확인했습니다.'}] },
  { id:'ns_work6',     japanese:'てつだいましょうか',       kanji:'手伝(てつだ)いましょうか',           korean:'도와드릴까요?',                english:'Shall I help you?',            examples:[{japanese:'なにかてつだいましょうか？',korean:'뭔가 도와드릴까요?'},{japanese:'てつだってくれてありがとうございます。',korean:'도와줘서 감사해요.'}] },
  { id:'ns_work7',     japanese:'ほうこくします',           kanji:'報告(ほうこく)します',               korean:'보고할게요',                   english:'I will report',               tip:'ホウレンソウ(報告·連絡·相談) = 보고·연락·상담', examples:[{japanese:'しごとのじょうきょうをほうこくします。',korean:'일의 상황을 보고할게요.'},{japanese:'あとでほうこくしてください。',korean:'나중에 보고해 주세요.'}] },
  { id:'ns_work8',     japanese:'そうだんしてもいいですか', kanji:'相談(そうだん)してもいいですか',      korean:'상담해도 될까요?',             english:'Can I consult with you?',      examples:[{japanese:'すこしそうだんにのってもらえますか？',korean:'조금 상담에 응해 주실 수 있나요?'},{japanese:'いまそうだんしてもよろしいですか？',korean:'지금 상담해도 괜찮을까요?'}] },
  { id:'ns_work9',     japanese:'おつかれさまです',         kanji:'お疲(つか)れ様(さま)です',           korean:'수고하셨습니다',               english:'Good work / You\'ve worked hard', tip:'日本のビジネスで最も使う表現', examples:[{japanese:'きょうもおつかれさまです。',korean:'오늘도 수고하셨어요.'},{japanese:'おつかれさまでした！おさきにしつれいします。',korean:'수고하셨어요! 먼저 실례하겠습니다.'}] },
  { id:'ns_work10',    japanese:'よろしくおねがいいたします',                                  korean:'잘 부탁드립니다 (격식)',       english:'Please take care of it / Nice to meet you (formal)', tip:'メールの文末に必ず入れる', examples:[{japanese:'これからもよろしくおねがいいたします。',korean:'앞으로도 잘 부탁드립니다.'},{japanese:'プロジェクトをよろしくおねがいいたします。',korean:'프로젝트를 잘 부탁드립니다.'}] },

  // ══════════════════════════════════════════════════════
  //  문장 — 여행 계획 (Travel Planning)
  // ══════════════════════════════════════════════════════
  { id:'ns_travel1',   japanese:'〜のきっぷをかいたいです', kanji:'〜の切符(きっぷ)を買(か)いたいです', korean:'〜 표를 사고 싶어요',       english:'I\'d like to buy a ticket to ~', examples:[{japanese:'きょうとまでのきっぷをかいたいです。',korean:'교토까지 표를 사고 싶어요.'},{japanese:'おとなふたりとこどもひとりのきっぷをください。',korean:'어른 두 명, 어린이 한 명 표 주세요.'}] },
  { id:'ns_travel2',   japanese:'ホテルのよやくをしたいです', kanji:'ホテルの予約(よやく)をしたいです',   korean:'호텔 예약을 하고 싶어요',    english:'I\'d like to make a hotel reservation', examples:[{japanese:'いっぱくいくらですか？',korean:'1박에 얼마예요?'},{japanese:'あさごはんつきのへやをよやくしたいです。',korean:'조식 포함 방을 예약하고 싶어요.'}] },
  { id:'ns_travel3',   japanese:'〜にはどうやっていきますか',                                  korean:'〜에는 어떻게 가나요?',       english:'How do I get to ~?',           tip:'一番べんりな行き方を聞こう', examples:[{japanese:'きんかくじにはどうやっていきますか？',korean:'금각사에는 어떻게 가나요?'},{japanese:'バスとでんしゃどちらがべんりですか？',korean:'버스와 전철 중 어느 쪽이 편리해요?'}] },
  { id:'ns_travel4',   japanese:'おすすめのかんこうちをおしえてください', kanji:'おすすめの観光地(かんこうち)を教(おし)えてください', korean:'추천 관광지를 알려 주세요', english:'Please tell me recommended sightseeing spots', examples:[{japanese:'このきせつにおすすめのばしょはどこですか？',korean:'이 계절에 추천 장소는 어디인가요?'},{japanese:'にほんのひそかなかんこうちをしりたいです。',korean:'일본의 숨겨진 관광지를 알고 싶어요.'}] },
  { id:'ns_travel5',   japanese:'にゅうじょうりょうはいくらですか', kanji:'入場料(にゅうじょうりょう)はいくらですか', korean:'입장료는 얼마예요?',       english:'How much is the admission fee?', examples:[{japanese:'こどものにゅうじょうりょうはわりびきになりますか？',korean:'어린이 입장료는 할인이 되나요?'},{japanese:'にゅうじょうむりょうのかんこうちはありますか？',korean:'무료 입장 관광지가 있나요?'}] },
  { id:'ns_travel6',   japanese:'〜まで、どのくらいかかりますか',                             korean:'〜까지, 얼마나 걸려요?',      english:'How long does it take to ~?', tip:'じかんとりょうきん両方を聞こう', examples:[{japanese:'ここからなりたくうこうまでどのくらいかかりますか？',korean:'여기서 나리타 공항까지 얼마나 걸려요?'},{japanese:'でんしゃだとやく１じかんかかります。',korean:'전철로 약 1시간 걸려요.'}] },
  { id:'ns_travel7',   japanese:'レンタカーをかりたいです',                                    korean:'렌터카를 빌리고 싶어요',      english:'I\'d like to rent a car',     tip:'こくさいめんきょしょうはありますか = 국제 면허증 있나요?', examples:[{japanese:'レンタカーのりょうきんをおしえてください。',korean:'렌터카 요금을 알려 주세요.'},{japanese:'こくさいうんてんめんきょしょうをもってきました。',korean:'국제 운전 면허증을 가져왔어요.'}] },
  { id:'ns_travel8',   japanese:'このちずにばしょをかいてもらえますか', kanji:'この地図(ちず)に場所(ばしょ)を書(か)いてもらえますか', korean:'이 지도에 장소를 써 주실 수 있나요?', english:'Can you write the location on this map?', examples:[{japanese:'ここがホテルです、とかいてください。',korean:'여기가 호텔이에요, 라고 써 주세요.'},{japanese:'ちずにしるしをつけてもらえますか？',korean:'지도에 표시해 주실 수 있나요?'}] },
  { id:'ns_travel9',   japanese:'このへんにコインロッカーはありますか',                        korean:'이 근처에 코인 로커가 있나요?', english:'Is there a coin locker nearby?', tip:'駅構内に多い', examples:[{japanese:'にもつをコインロッカーにあずけたいです。',korean:'짐을 코인 로커에 맡기고 싶어요.'},{japanese:'コインロッカーがいっぱいです。',korean:'코인 로커가 꽉 찼어요.'}] },
  { id:'ns_travel10',  japanese:'しゃしんをとってもらえますか', kanji:'写真(しゃしん)を撮(と)ってもらえますか', korean:'사진을 찍어 주실 수 있나요?',  english:'Could you take a photo for me?', examples:[{japanese:'このばしょでしゃしんをとってもらえますか？',korean:'이 장소에서 사진을 찍어 주실 수 있나요?'},{japanese:'いいしゃしんをとってくれてありがとう！',korean:'좋은 사진 찍어줘서 고마워요!'}] },
];

// ─────────────────────────────────────────────────────────────
//  추가 카테고리 항목
// ─────────────────────────────────────────────────────────────
const VOCAB_CATEGORIES_EXTRA = [

  // ─── 단어 카테고리 — 음식·요리 ───────────────────────────
  {
    id:'extra_food_cooking', phase:9, type:'word', wlevel:9,
    name:'음식·요리', icon:'🍳',
    title:'EX 음식·요리 (料理·食文化)',
    subtitle:'焼きそば·餃子·豚カツ·カレー·だし',
    desc:'야키소바·교자·돈가스·카레·가라아게 — 일본 식문화 심화 어휘',
    items:['nw_yakisoba','nw_karaage','nw_gyoza','nw_tonkatsu','nw_shabu','nw_curry','nw_natto','nw_takoyaki','nw_okonomiyaki','nw_chahan','nw_yakimono','nw_nimono','nw_dashi']
  },

  // ─── 단어 카테고리 — 날씨·계절 ───────────────────────────
  {
    id:'extra_weather_seasons', phase:9, type:'word', wlevel:9,
    name:'날씨·계절', icon:'🌤️',
    title:'EX 날씨·계절 (天気·季節)',
    subtitle:'晴れ·雨·雪·台風·春夏秋冬',
    desc:'맑음·비·눈·태풍부터 사계절까지 — 날씨·계절 어휘 완전 정복',
    items:['nw_hare','nw_kumori','nw_ame','nw_yuki','nw_kaze2','nw_taifuu','nw_haru','nw_natsu','nw_aki','nw_fuyu','nw_kishayoho','nw_mushiatsui']
  },

  // ─── 단어 카테고리 — 몸·건강 추가 ───────────────────────
  {
    id:'extra_body_health', phase:9, type:'word', wlevel:9,
    name:'몸·건강 추가', icon:'💪',
    title:'EX 몸·건강 추가 (体·健康)',
    subtitle:'胸·背中·喉·耳·歯·睡眠·アレルギー',
    desc:'가슴·등·목·귀·이·수면·알레르기 — 병원 방문 시 필요한 신체 어휘',
    items:['nw_mune','nw_senaka','nw_nodo','nw_mimi','nw_ha','nw_hiza','nw_yubisaki','nw_kenkou','nw_undobusoku','nw_suimin','nw_allergy']
  },

  // ─── 단어 카테고리 — 감정·기분 ───────────────────────────
  {
    id:'extra_emotions', phase:9, type:'word', wlevel:9,
    name:'감정·기분', icon:'😄',
    title:'EX 감정·기분 (感情·気持ち)',
    subtitle:'驚き·不安·怒り·懐かしい·感動',
    desc:'놀라움·불안·분노·그리움·감동 — 마음을 일본어로 표현하자',
    items:['nw_odoroki','nw_fuan','nw_ikari','nw_haji','nw_shimpai','nw_kofun','nw_natsukashii','nw_anshin','nw_kyomi','nw_kandou']
  },

  // ─── 단어 카테고리 — 취미·여가 ───────────────────────────
  {
    id:'extra_hobbies', phase:9, type:'word', wlevel:9,
    name:'취미·여가', icon:'🎯',
    title:'EX 취미·여가 (趣味·余暇)',
    subtitle:'読書·音楽·旅行·アニメ·温泉·カラオケ',
    desc:'독서·음악·여행·애니·온천·가라오케 — 취미를 일본어로 말하자',
    items:['nw_dokusho','nw_ongaku','nw_ryokou','nw_ryouri','nw_sports','nw_shashin','nw_anime','nw_manga','nw_onsen','nw_karaoke','nw_gardening']
  },

  // ─── 단어 카테고리 — 쇼핑·물건 사기 ─────────────────────
  {
    id:'extra_shopping', phase:9, type:'word', wlevel:9,
    name:'쇼핑·물건 사기', icon:'🛍️',
    title:'EX 쇼핑·물건 사기 (ショッピング)',
    subtitle:'値段·割引·免税·試着·色·サイズ',
    desc:'가격·할인·면세·시착·색·사이즈 — 쇼핑을 완벽하게 즐기자',
    items:['nw_nedan','nw_waribiki','nw_menzei','nw_shichaku','nw_iro','nw_saizu','nw_tsutsumi','nw_reji','nw_pointcard','nw_uriage','nw_fukubukuro']
  },

  // ─── 단어 카테고리 — 시간·날짜 추가 ─────────────────────
  {
    id:'extra_time_dates', phase:9, type:'word', wlevel:9,
    name:'시간·날짜 추가', icon:'⏰',
    title:'EX 시간·날짜 추가 (時間·日付)',
    subtitle:'朝·昼·夜·来週·今月·来年·約束',
    desc:'아침·낮·밤·다음 주·이번 달·내년·약속 — 일정 대화 완성',
    items:['nw_asa','nw_hiru','nw_yoru','nw_raishu','nw_senshuu','nw_kongetsu','nw_rainen','nw_kyonen','nw_gozen','nw_gogo','nw_yakusoku']
  },

  // ─── 단어 카테고리 — 교통·이동 추가 ─────────────────────
  {
    id:'extra_transport', phase:9, type:'word', wlevel:9,
    name:'교통·이동 추가', icon:'🚅',
    title:'EX 교통·이동 추가 (交通·移動)',
    subtitle:'飛行機·地下鉄·自転車·満員·到着',
    desc:'비행기·지하철·자전거·만원·도착까지 — 이동 어휘 심화',
    items:['nw_hikoki','nw_shinkansen','nw_chikatetsu','nw_jitenshya','nw_tohoirifun','nw_noriba','nw_manshuu','nw_hassya','nw_tochaku','nw_pasmo']
  },

  // ─── 단어 카테고리 — 직업·일 ─────────────────────────────
  {
    id:'extra_jobs', phase:9, type:'word', wlevel:9,
    name:'직업·일', icon:'💼',
    title:'EX 직업·일 (職業·仕事)',
    subtitle:'医者·看護師·先生·会社員·デザイナー',
    desc:'의사·간호사·선생님·회사원·디자이너 — 직업 어휘 완전 정복',
    items:['nw_isha','nw_kangoshi','nw_sensei','nw_gakusei','nw_kaisyain','nw_enginia','nw_dezainaa','nw_tenin','nw_hisho','nw_bengoshi','nw_ryorinin']
  },

  // ─── 단어 카테고리 — 자연·환경 ───────────────────────────
  {
    id:'extra_nature', phase:9, type:'word', wlevel:9,
    name:'자연·환경', icon:'🌿',
    title:'EX 자연·환경 (自然·環境)',
    subtitle:'山·海·川·花·木·太陽·月·星',
    desc:'산·바다·강·꽃·나무·태양·달·별 — 자연을 일본어로 표현하자',
    items:['nw_yama','nw_umi','nw_kawa','nw_mori','nw_hana','nw_ki','nw_shizen','nw_taiyou','nw_tsuki','nw_hoshi','nw_kuuki']
  },

  // ─── 문장 카테고리 — 병원에서 ───────────────────────────
  {
    id:'extra_at_hospital', phase:10, type:'sentence', slevel:7,
    name:'병원에서', icon:'🏥',
    title:'EX 병원에서 (病院で)',
    subtitle:'〜が痛い·熱·咳·アレルギー·保険証',
    desc:'증상 말하기부터 보험 확인까지 — 병원 상황 완전 대비',
    items:['ns_byoin1','ns_byoin2','ns_byoin3','ns_byoin4','ns_byoin5','ns_byoin6','ns_byoin7','ns_byoin8','ns_byoin9','ns_byoin10']
  },

  // ─── 문장 카테고리 — 쇼핑몰에서 ────────────────────────
  {
    id:'extra_at_mall', phase:10, type:'sentence', slevel:7,
    name:'쇼핑몰에서', icon:'🏬',
    title:'EX 쇼핑몰에서 (ショッピングモールで)',
    subtitle:'返品·免税·ポイント·ラッピング·レシート',
    desc:'교환·반품·면세·포인트·영수증까지 쇼핑몰 상황 완전 정복',
    items:['ns_mall1','ns_mall2','ns_mall3','ns_mall4','ns_mall5','ns_mall6','ns_mall7','ns_mall8']
  },

  // ─── 문장 카테고리 — 카페에서 ───────────────────────────
  {
    id:'extra_at_cafe', phase:10, type:'sentence', slevel:7,
    name:'카페에서', icon:'☕',
    title:'EX 카페에서 (カフェで)',
    subtitle:'ホット·アイス·砂糖なし·テイクアウト·Wi-Fi',
    desc:'주문·온도·설탕·테이크아웃·콘센트·와이파이까지 카페 완전 마스터',
    items:['ns_cafe1','ns_cafe2','ns_cafe3','ns_cafe4','ns_cafe5','ns_cafe6','ns_cafe7','ns_cafe8','ns_cafe9','ns_cafe10']
  },

  // ─── 문장 카테고리 — 직장에서 ───────────────────────────
  {
    id:'extra_at_work', phase:10, type:'sentence', slevel:7,
    name:'직장에서', icon:'🏢',
    title:'EX 직장에서 (職場で)',
    subtitle:'会議·資料·締切·承知·お疲れ様',
    desc:'회의·자료·마감·보고·수고 인사까지 일본 직장 표현 완전 정복',
    items:['ns_work1','ns_work2','ns_work3','ns_work4','ns_work5','ns_work6','ns_work7','ns_work8','ns_work9','ns_work10']
  },

  // ─── 문장 카테고리 — 여행 계획 ───────────────────────────
  {
    id:'extra_travel_plan', phase:10, type:'sentence', slevel:7,
    name:'여행 계획', icon:'✈️',
    title:'EX 여행 계획 (旅行計画)',
    subtitle:'切符·ホテル予約·観光地·レンタカー·写真',
    desc:'표 구입·호텔 예약·관광지·렌터카·사진 부탁까지 여행 준비 완전 대비',
    items:['ns_travel1','ns_travel2','ns_travel3','ns_travel4','ns_travel5','ns_travel6','ns_travel7','ns_travel8','ns_travel9','ns_travel10']
  },
];

// ─────────────────────────────────────────────────────────────
//  기존 배열에 삽입
//  (각 vocab-items 파일의 배열들은 app.js에서 VOCAB_ITEMS로 통합되거나
//   vocab-data.js의 VOCAB_ITEMS에 합쳐짐. 여기서는 두 방식 모두 지원)
// ─────────────────────────────────────────────────────────────

// VOCAB_ITEMS_W5W8 배열에 이 파일의 단어 항목을 추가 (배열이 존재할 경우)
if (typeof VOCAB_ITEMS_W5W8 !== 'undefined') {
  VOCAB_ITEMS_W5W8.push(...VOCAB_ITEMS_EXTRA);
}

// VOCAB_ITEMS 전역 배열에 직접 추가 (vocab-data.js 방식)
if (typeof VOCAB_ITEMS !== 'undefined') {
  VOCAB_ITEMS.push(...VOCAB_ITEMS_EXTRA);
}

// VOCAB_CATEGORIES 배열에 추가 카테고리 삽입
if (typeof VOCAB_CATEGORIES !== 'undefined') {
  VOCAB_CATEGORIES.push(...VOCAB_CATEGORIES_EXTRA);
}
