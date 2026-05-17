/* ============================================================
   V3 CONTENT INDEX — vocabulary/category/dialogue lookup layer
   Keeps content wiring out of the UI controller.
   ============================================================ */

'use strict';

window.ContentIndex = (() => {
  const CATEGORY_PATTERNS = {
    // W1W4 — vocab-items-w1w4.js
    basic_words:            ['w1_'],
    essential_phrases:      ['gr_'],
    numbers_basic:          ['num_', 'nap_'],
    dates_days:             ['dt_', 'dn_'],
    time_expressions:       ['dt_'],
    pronouns:               ['prn_'],
    pronouns_personal:      ['prn_1', 'prn_2', 'prn_3', 'prn_4', 'prn_5'],
    pronouns_thing:         ['prn_6', 'prn_7', 'prn_8', 'prn_12', 'prn_13', 'prn_14'],
    pronouns_place:         ['prn_9', 'prn_10', 'prn_11'],
    place_transport:        ['tr_'],

    // W5W8 — vocab-items-w5w8.js
    basic_verbs:            ['vb1_', 'vb2_', 'vb3_'],
    adjectives:             ['adj1_', 'adj2_', 'adj_'],
    places_food:            ['tr_', 'food_', 'pl_'],
    body_health:            ['bh_'],
    transport:              ['tr_'],
    food_restaurant:        ['food_'],
    youth_slang:            ['youth_'],

    // W9W10 — vocab-items-w9w10.js
    it_tech_basic:          ['it_program','it_code','it_bug','it_error','it_server','it_client','it_api','it_db','it_frontend','it_backend','it_infra','it_docker','it_git','it_github','it_slack','it_log','it_test','it_build','it_deploy','it_release'],
    it_dev_process:         ['it_sprint','it_task','it_ticket','it_issue','it_pr','it_review','it_merge','it_refactor','it_debug','it_spec','it_design','it_standup','it_retrospec','it_kpt','it_pipeline'],
    it_workplace:           ['it_engineer','it_designer','it_pm','it_po','it_qa','it_tl','it_ops','it_sre','it_deadline','it_priority','it_impact','it_release2','it_production','it_staging','it_local'],
    biz_greetings:          ['biz_otsu','biz_yoroshiku','biz_shochi','biz_ryokai','biz_kashiko','biz_osewa','biz_confirm','biz_taio','biz_kentou','biz_kyoyu','biz_kakunin','biz_renraku'],
    biz_hourensou:          ['biz_houkoku','biz_soudan','biz_shinchou','biz_yotei','biz_okure','biz_mondai','biz_kaichou','biz_tsuika','biz_ima','biz_ato'],
    biz_meeting:            ['biz_gidai','biz_gijiroku','biz_ikaga','biz_iken','biz_ossharu','biz_teian','biz_kansha','biz_imi','biz_jikan','biz_omakase','biz_wakarima','biz_matome'],

    // Dialogue-derived fallback groups.
    hotel_accommodation:    ['hd_','cin_','cout_','rs_'],
    shopping:               ['sd_','sel_','dnq_','dep_'],
  };

  function getAllVocabItems() {
    const sources = [
      typeof VOCAB_ITEMS_W1W4 !== 'undefined' ? VOCAB_ITEMS_W1W4 : [],
      typeof VOCAB_ITEMS_W5W8 !== 'undefined' ? VOCAB_ITEMS_W5W8 : [],
      typeof VOCAB_ITEMS_W9W10 !== 'undefined' ? VOCAB_ITEMS_W9W10 : [],
      typeof VOCAB_ITEMS_S1S5 !== 'undefined' ? VOCAB_ITEMS_S1S5 : [],
      typeof VOCAB_ITEMS_S6SIM !== 'undefined' ? VOCAB_ITEMS_S6SIM : [],
    ];
    return sources.flat();
  }

  function getVocabItems(step) {
    if (step?.items) return step.items;
    const all = getAllVocabItems();
    const byId = new Map(all.map(item => [item.id, item]));

    if (step?.categoryId) {
      const items = getCategoryItems(step.categoryId, byId, all);
      return normalizeVocabCards(uniqueItems(items), step, all);
    }

    if (step?.categoryIds) {
      const items = step.categoryIds.flatMap(cid => getCategoryItems(cid, byId, all));
      return normalizeVocabCards(uniqueItems(items), step, all);
    }

    return [];
  }

  function getCategoryItems(categoryId, byId, all) {
    const direct = getVocabItemsByCategory(categoryId, byId);
    if (direct.length) return direct;
    return all.filter(item => item.categoryId === categoryId || itemMatchesCategory(item, categoryId));
  }

  function getVocabItemsByCategory(categoryId, byId) {
    const cats = typeof VOCAB_CATEGORIES !== 'undefined' ? VOCAB_CATEGORIES : [];
    const cat = cats.find(c => c.id === categoryId);
    if (!cat?.items?.length) return [];
    return cat.items.map(id => byId.get(id)).filter(Boolean);
  }

  function uniqueItems(items) {
    const seen = new Set();
    return (items || []).filter(item => {
      const key = item?.id || item?.japanese;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function getCardLimit(step) {
    if (!step?.limit) return 999;
    if (!['vocab_learn', 'vocab_quiz'].includes(step.type)) return step.limit;
    return Math.max(10, Math.min(19, step.limit));
  }

  function normalizeVocabCards(items, step, all) {
    const limit = getCardLimit(step);
    if (!['vocab_learn', 'vocab_quiz'].includes(step?.type)) return items.slice(0, limit);
    const out = items.slice(0, limit);
    if (out.length >= 10) return out;

    const seen = new Set(out.map(item => item.id || item.japanese));
    const safeFillers = all.filter(item => isBeginnerSafeItem(item) && !seen.has(item.id || item.japanese));
    for (const item of safeFillers) {
      out.push(item);
      seen.add(item.id || item.japanese);
      if (out.length >= 10) break;
    }
    return out;
  }

  function isBeginnerSafeItem(item) {
    const id = item?.id || '';
    if (!id || /^(it_|biz_)/.test(id)) return false;
    return /^(w1_|gr_|num_|nap_|dt_|dn_|prn_|tr_|vb1_|vb2_|adj1_|food_|pl_|bh_|s\d_|k|ap_|tx_|kd_|rd_|sd_|hd_)/.test(id);
  }

  function itemMatchesCategory(item, categoryId) {
    const patterns = CATEGORY_PATTERNS[categoryId] || [];
    return patterns.some(p => item.id && item.id.startsWith(p));
  }

  function getDialogue(key) {
    if (!key) return null;
    const dialogue = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const itDialogue = typeof VOCAB_ITEMS_IT_SIM !== 'undefined' ? VOCAB_ITEMS_IT_SIM : [];
    const by = (...pres) => dialogue.filter(x => pres.some(p => x.id?.startsWith(p)));

    const pick = (...ids) => dialogue.filter(x => ids.includes(x.id));

    const keyMap = {
      kana_map_practice: [
        { id:'v3_kmap_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 첫 문자 수업 — 표를 보며 소리 위치를 찾기', english:'📍 First kana lesson — finding sounds on the chart' },
        { id:'v3_kmap_1', speaker:'B', japanese:'あ行を読んでください。', romaji:'a gyou wo yonde kudasai', korean:'あ행을 읽어 주세요.', english:'Please read the A row.' },
        { id:'v3_kmap_2', speaker:'A', japanese:'あ、い、う、え、お。', romaji:'a, i, u, e, o', korean:'아, 이, 우, 에, 오.', english:'A, i, u, e, o.' },
        { id:'v3_kmap_3', speaker:'B', japanese:'いいですね。次はか行です。', romaji:'ii desu ne. tsugi wa ka gyou desu', korean:'좋아요. 다음은 か행이에요.', english:'Good. Next is the KA row.' },
        { id:'v3_kmap_4', speaker:'A', japanese:'か、き、く、け、こ。', romaji:'ka, ki, ku, ke, ko', korean:'카, 키, 쿠, 케, 코.', english:'Ka, ki, ku, ke, ko.' },
        { id:'v3_kmap_5', speaker:'B', japanese:'「き」はどこですか？', romaji:'ki wa doko desu ka', korean:'き는 어디예요?', english:'Where is ki?' },
        { id:'v3_kmap_6', speaker:'A', japanese:'か行の二番目です。', romaji:'ka gyou no ni banme desu', korean:'か행 두 번째예요.', english:'It is second in the KA row.' },
        { id:'v3_kmap_7', speaker:'B', japanese:'そうです。口の形も見てください。', romaji:'sou desu. kuchi no katachi mo mite kudasai', korean:'맞아요. 입 모양도 봐 주세요.', english:'Correct. Watch the mouth shape too.' },
        { id:'v3_kmap_8', speaker:'A', japanese:'あ、か、さ、た、な。', romaji:'a, ka, sa, ta, na', korean:'아, 카, 사, 타, 나.', english:'A, ka, sa, ta, na.' },
        { id:'v3_kmap_9', speaker:'B', japanese:'縦の音も読めました。', romaji:'tate no oto mo yomemashita', korean:'세로 소리도 읽었어요.', english:'You read the vertical sounds too.' },
        { id:'v3_kmap_10', speaker:'A', japanese:'表の見方がわかりました。', romaji:'hyou no mikata ga wakarimashita', korean:'표 보는 법을 알았어요.', english:'I understand how to read the chart.' },
      ],
      hiragana_reading: [
        { id:'v3_hira_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 문자 카드 앞 — 히라가나를 보고 천천히 읽기', english:'📍 In front of kana cards — reading hiragana slowly' },
        { id:'v3_hira_1', speaker:'B', japanese:'この字を読んでください。', romaji:'kono ji wo yonde kudasai', korean:'이 글자를 읽어 주세요.', english:'Please read this character.' },
        { id:'v3_hira_2', speaker:'A', japanese:'あ、です。', romaji:'a, desu', korean:'あ예요.', english:'It is a.' },
        { id:'v3_hira_3', speaker:'B', japanese:'次は「い」です。', romaji:'tsugi wa i desu', korean:'다음은 い예요.', english:'Next is i.' },
        { id:'v3_hira_4', speaker:'A', japanese:'い。', romaji:'i', korean:'い.', english:'I.' },
        { id:'v3_hira_5', speaker:'B', japanese:'「あお」を読めますか？', romaji:'ao wo yomemasu ka', korean:'あお를 읽을 수 있어요?', english:'Can you read ao?' },
        { id:'v3_hira_6', speaker:'A', japanese:'あお。', romaji:'ao', korean:'아오.', english:'Ao.' },
        { id:'v3_hira_7', speaker:'B', japanese:'いいです。ゆっくりで大丈夫です。', romaji:'ii desu. yukkuri de daijoubu desu', korean:'좋아요. 천천히 해도 괜찮아요.', english:'Good. Slowly is fine.' },
        { id:'v3_hira_8', speaker:'A', japanese:'か、き、く。', romaji:'ka, ki, ku', korean:'카, 키, 쿠.', english:'Ka, ki, ku.' },
        { id:'v3_hira_9', speaker:'B', japanese:'よく読めました。', romaji:'yoku yomemashita', korean:'잘 읽었어요.', english:'You read well.' },
        { id:'v3_hira_10', speaker:'A', japanese:'もう一度練習します。', romaji:'mou ichido renshuu shimasu', korean:'한 번 더 연습할게요.', english:'I will practice once more.' },
      ],
      katakana_signs: [
        { id:'v3_kata_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 일본 거리 — 가타가나 간판을 읽어 보기', english:'📍 Japanese street — reading katakana signs' },
        { id:'v3_kata_1', speaker:'B', japanese:'この看板を読めますか？', romaji:'kono kanban wo yomemasu ka', korean:'이 간판 읽을 수 있어요?', english:'Can you read this sign?' },
        { id:'v3_kata_2', speaker:'A', japanese:'ホテル、です。', romaji:'hoteru, desu', korean:'ホテル예요. 호텔.', english:'It says hotel.' },
        { id:'v3_kata_3', speaker:'B', japanese:'そうです。次はこれです。', romaji:'sou desu. tsugi wa kore desu', korean:'맞아요. 다음은 이거예요.', english:'Correct. Next is this.' },
        { id:'v3_kata_4', speaker:'A', japanese:'カード。', romaji:'kaado', korean:'カード. 카드.', english:'Card.' },
        { id:'v3_kata_5', speaker:'B', japanese:'長い音がありますね。', romaji:'nagai oto ga arimasu ne', korean:'긴 소리가 있죠.', english:'There is a long sound.' },
        { id:'v3_kata_6', speaker:'A', japanese:'カー、ですね。', romaji:'kaa, desu ne', korean:'カー, 맞죠.', english:'Kaa, right?' },
        { id:'v3_kata_7', speaker:'B', japanese:'はい。コーヒーも読んでください。', romaji:'hai. koohii mo yonde kudasai', korean:'네. コーヒー도 읽어 주세요.', english:'Yes. Please read coffee too.' },
        { id:'v3_kata_8', speaker:'A', japanese:'コーヒー。', romaji:'koohii', korean:'コーヒー. 커피.', english:'Coffee.' },
        { id:'v3_kata_9', speaker:'B', japanese:'旅行でよく見ます。', romaji:'ryokou de yoku mimasu', korean:'여행에서 자주 봐요.', english:'You see it often while traveling.' },
        { id:'v3_kata_10', speaker:'A', japanese:'看板を見ながら覚えます。', romaji:'kanban wo minagara oboemasu', korean:'간판을 보면서 외울게요.', english:'I will memorize while looking at signs.' },
      ],
      sound_rules_counter: [
        { id:'v3_sound_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 발음 수업 — 바뀐 소리를 다시 확인하기', english:'📍 Pronunciation lesson — checking changed sounds' },
        { id:'v3_sound_1', speaker:'B', japanese:'「か」に点をつけると？', romaji:'ka ni ten wo tsukeru to', korean:'か에 점을 붙이면?', english:'If you add marks to ka?' },
        { id:'v3_sound_2', speaker:'A', japanese:'が、です。', romaji:'ga, desu', korean:'が예요.', english:'It becomes ga.' },
        { id:'v3_sound_3', speaker:'B', japanese:'いいです。「は」に丸をつけると？', romaji:'ii desu. ha ni maru wo tsukeru to', korean:'좋아요. は에 동그라미를 붙이면?', english:'Good. If you add a circle to ha?' },
        { id:'v3_sound_4', speaker:'A', japanese:'ぱ、です。', romaji:'pa, desu', korean:'ぱ예요.', english:'It becomes pa.' },
        { id:'v3_sound_5', speaker:'B', japanese:'コーヒーの長い音はどこですか？', romaji:'koohii no nagai oto wa doko desu ka', korean:'コーヒー의 긴 소리는 어디예요?', english:'Where is the long sound in coffee?' },
        { id:'v3_sound_6', speaker:'A', japanese:'コーとヒーです。', romaji:'koo to hii desu', korean:'コー와 ヒー예요.', english:'Koo and hii.' },
        { id:'v3_sound_7', speaker:'B', japanese:'きっての小さい「つ」は？', romaji:'kitte no chiisai tsu wa', korean:'きって의 작은 つ는요?', english:'What about the small tsu in kitte?' },
        { id:'v3_sound_8', speaker:'A', japanese:'少し止めます。', romaji:'sukoshi tomemasu', korean:'잠깐 멈춰요.', english:'You pause briefly.' },
        { id:'v3_sound_9', speaker:'B', japanese:'その感覚で大丈夫です。', romaji:'sono kankaku de daijoubu desu', korean:'그 감각이면 괜찮아요.', english:'That feel is fine.' },
        { id:'v3_sound_10', speaker:'A', japanese:'音で覚えます。', romaji:'oto de oboemasu', korean:'소리로 외울게요.', english:'I will learn by sound.' },
      ],
      pre_sentence_survival: [
        { id:'v3_pre_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 여행 첫날 — 단어만 알아도 버티는 연습', english:'📍 First travel day — surviving with small words' },
        { id:'v3_pre_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_pre_2', speaker:'A', japanese:'日本語は少しだけです。', romaji:'nihongo wa sukoshi dake desu', korean:'일본어는 조금만 해요.', english:'I speak only a little Japanese.' },
        { id:'v3_pre_3', speaker:'B', japanese:'大丈夫です。', romaji:'daijoubu desu', korean:'괜찮아요.', english:'That is okay.' },
        { id:'v3_pre_4', speaker:'A', japanese:'これは何ですか？', romaji:'kore wa nan desu ka', korean:'이건 뭐예요?', english:'What is this?' },
        { id:'v3_pre_5', speaker:'B', japanese:'これは水です。', romaji:'kore wa mizu desu', korean:'이건 물이에요.', english:'This is water.' },
        { id:'v3_pre_6', speaker:'A', japanese:'これをください。', romaji:'kore wo kudasai', korean:'이거 주세요.', english:'This, please.' },
        { id:'v3_pre_7', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_pre_8', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_pre_9', speaker:'B', japanese:'袋は必要ですか？', romaji:'fukuro wa hitsuyou desu ka', korean:'봉투 필요해요?', english:'Do you need a bag?' },
        { id:'v3_pre_10', speaker:'A', japanese:'大丈夫です。', romaji:'daijoubu desu', korean:'괜찮아요.', english:'I am fine.' },
      ],
      basic_structure_check: [
        { id:'v3_struct_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 근처 — は/を/に/で를 짧게 써 보기', english:'📍 Near a station — using basic particles briefly' },
        { id:'v3_struct_1', speaker:'A', japanese:'すみません、駅はどこですか？', romaji:'sumimasen, eki wa doko desu ka', korean:'저기요, 역은 어디예요?', english:'Excuse me, where is the station?' },
        { id:'v3_struct_2', speaker:'B', japanese:'駅はあそこです。', romaji:'eki wa asoko desu', korean:'역은 저기예요.', english:'The station is over there.' },
        { id:'v3_struct_3', speaker:'A', japanese:'ここから近いですか？', romaji:'koko kara chikai desu ka', korean:'여기서 가까워요?', english:'Is it close from here?' },
        { id:'v3_struct_4', speaker:'B', japanese:'はい、近いです。', romaji:'hai, chikai desu', korean:'네, 가까워요.', english:'Yes, it is close.' },
        { id:'v3_struct_5', speaker:'A', japanese:'駅に行きます。', romaji:'eki ni ikimasu', korean:'역에 가요.', english:'I am going to the station.' },
        { id:'v3_struct_6', speaker:'B', japanese:'まっすぐ行ってください。', romaji:'massugu itte kudasai', korean:'쭉 가세요.', english:'Please go straight.' },
        { id:'v3_struct_7', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_struct_8', speaker:'B', japanese:'信号を右です。', romaji:'shingou wo migi desu', korean:'신호에서 오른쪽이에요.', english:'Right at the traffic light.' },
        { id:'v3_struct_9', speaker:'A', japanese:'右ですね。', romaji:'migi desu ne', korean:'오른쪽이죠.', english:'Right, correct?' },
        { id:'v3_struct_10', speaker:'B', japanese:'はい、右です。', romaji:'hai, migi desu', korean:'네, 오른쪽이에요.', english:'Yes, right.' },
      ],
      tense_matrix_check: [
        { id:'v3_tense_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 먹었는지, 안 갔는지 짧게 말하기', english:'📍 At a cafe — saying did, did not, went, did not go' },
        { id:'v3_tense_1', speaker:'B', japanese:'朝ごはんは食べましたか？', romaji:'asagohan wa tabemashita ka', korean:'아침은 먹었어요?', english:'Did you eat breakfast?' },
        { id:'v3_tense_2', speaker:'A', japanese:'はい、食べました。', romaji:'hai, tabemashita', korean:'네, 먹었어요.', english:'Yes, I ate.' },
        { id:'v3_tense_3', speaker:'B', japanese:'コーヒーは飲みますか？', romaji:'koohii wa nomimasu ka', korean:'커피는 마셔요?', english:'Do you drink coffee?' },
        { id:'v3_tense_4', speaker:'A', japanese:'今日は飲みません。', romaji:'kyou wa nomimasen', korean:'오늘은 안 마셔요.', english:'I will not drink it today.' },
        { id:'v3_tense_5', speaker:'B', japanese:'昨日、浅草に行きましたか？', romaji:'kinou, asakusa ni ikimashita ka', korean:'어제 아사쿠사에 갔어요?', english:'Did you go to Asakusa yesterday?' },
        { id:'v3_tense_6', speaker:'A', japanese:'いいえ、行きませんでした。', romaji:'iie, ikimasen deshita', korean:'아니요, 가지 않았어요.', english:'No, I did not go.' },
        { id:'v3_tense_7', speaker:'B', japanese:'ラーメンはおいしかったですか？', romaji:'raamen wa oishikatta desu ka', korean:'라멘은 맛있었어요?', english:'Was the ramen good?' },
        { id:'v3_tense_8', speaker:'A', japanese:'はい、とてもおいしかったです。', romaji:'hai, totemo oishikatta desu', korean:'네, 정말 맛있었어요.', english:'Yes, it was very good.' },
        { id:'v3_tense_9', speaker:'B', japanese:'今日は忙しいですか？', romaji:'kyou wa isogashii desu ka', korean:'오늘 바빠요?', english:'Are you busy today?' },
        { id:'v3_tense_10', speaker:'A', japanese:'いいえ、忙しくないです。', romaji:'iie, isogashikunai desu', korean:'아니요, 바쁘지 않아요.', english:'No, I am not busy.' },
      ],
      pointing_pronouns: [
        { id:'v3_point_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 가게에서 — 이름을 몰라도 가리켜서 말하기', english:'📍 At a shop — pointing when you do not know the name' },
        { id:'v3_point_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_point_2', speaker:'A', japanese:'これは何ですか？', romaji:'kore wa nan desu ka', korean:'이건 뭐예요?', english:'What is this?' },
        { id:'v3_point_3', speaker:'B', japanese:'それはお茶です。', romaji:'sore wa ocha desu', korean:'그건 차예요.', english:'That is tea.' },
        { id:'v3_point_4', speaker:'A', japanese:'これをください。', romaji:'kore wo kudasai', korean:'이거 주세요.', english:'This, please.' },
        { id:'v3_point_5', speaker:'B', japanese:'一つですか？', romaji:'hitotsu desu ka', korean:'하나예요?', english:'One?' },
        { id:'v3_point_6', speaker:'A', japanese:'はい、一つです。', romaji:'hai, hitotsu desu', korean:'네, 하나예요.', english:'Yes, one.' },
        { id:'v3_point_7', speaker:'B', japanese:'こちらです。', romaji:'kochira desu', korean:'여기예요.', english:'Here it is.' },
        { id:'v3_point_8', speaker:'A', japanese:'あれも見てもいいですか？', romaji:'are mo mite mo ii desu ka', korean:'저것도 봐도 돼요?', english:'May I look at that too?' },
        { id:'v3_point_9', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 보세요.', english:'Yes, please.' },
        { id:'v3_point_10', speaker:'A', japanese:'では、これにします。', romaji:'dewa, kore ni shimasu', korean:'그럼 이걸로 할게요.', english:'Then I will take this.' },
      ],
      numbers_time_check: [
        { id:'v3_num_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 매표소에서 — 가격과 시간 알아듣기', english:'📍 At a ticket counter — price and time' },
        { id:'v3_num_1', speaker:'A', japanese:'すみません、いくらですか？', romaji:'sumimasen, ikura desu ka', korean:'저기요, 얼마예요?', english:'Excuse me, how much is it?' },
        { id:'v3_num_2', speaker:'B', japanese:'千二百円です。', romaji:'sen nihyaku en desu', korean:'1200엔이에요.', english:'It is 1,200 yen.' },
        { id:'v3_num_3', speaker:'A', japanese:'何時からですか？', romaji:'nan ji kara desu ka', korean:'몇 시부터예요?', english:'From what time?' },
        { id:'v3_num_4', speaker:'B', japanese:'三時からです。', romaji:'san ji kara desu', korean:'3시부터예요.', english:'From 3 o’clock.' },
        { id:'v3_num_5', speaker:'A', japanese:'今日ですか？', romaji:'kyou desu ka', korean:'오늘이에요?', english:'Is it today?' },
        { id:'v3_num_6', speaker:'B', japanese:'はい、今日です。', romaji:'hai, kyou desu', korean:'네, 오늘이에요.', english:'Yes, today.' },
        { id:'v3_num_7', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_num_8', speaker:'B', japanese:'二枚ですか？', romaji:'ni mai desu ka', korean:'두 장이에요?', english:'Two tickets?' },
        { id:'v3_num_9', speaker:'A', japanese:'はい、二枚お願いします。', romaji:'hai, ni mai onegai shimasu', korean:'네, 두 장 부탁해요.', english:'Yes, two tickets please.' },
        { id:'v3_num_10', speaker:'B', japanese:'では、二千四百円です。', romaji:'dewa, nisen yonhyaku en desu', korean:'그럼 2400엔이에요.', english:'Then it is 2,400 yen.' },
      ],
      direction_body_check: [
        { id:'v3_dir_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 안내소에서 — 방향을 묻고 몸 상태를 짧게 말하기', english:'📍 At an information desk — directions and body words' },
        { id:'v3_dir_1', speaker:'A', japanese:'すみません、トイレはどこですか？', romaji:'sumimasen, toire wa doko desu ka', korean:'저기요, 화장실은 어디예요?', english:'Where is the restroom?' },
        { id:'v3_dir_2', speaker:'B', japanese:'右にあります。', romaji:'migi ni arimasu', korean:'오른쪽에 있어요.', english:'It is on the right.' },
        { id:'v3_dir_3', speaker:'A', japanese:'近いですか？', romaji:'chikai desu ka', korean:'가까워요?', english:'Is it close?' },
        { id:'v3_dir_4', speaker:'B', japanese:'はい、近いです。', romaji:'hai, chikai desu', korean:'네, 가까워요.', english:'Yes, it is close.' },
        { id:'v3_dir_5', speaker:'A', japanese:'少しお腹が痛いです。', romaji:'sukoshi onaka ga itai desu', korean:'배가 조금 아파요.', english:'My stomach hurts a little.' },
        { id:'v3_dir_6', speaker:'B', japanese:'薬局も近くにあります。', romaji:'yakkyoku mo chikaku ni arimasu', korean:'약국도 근처에 있어요.', english:'There is also a pharmacy nearby.' },
        { id:'v3_dir_7', speaker:'A', japanese:'助かりました。', romaji:'tasukarimashita', korean:'도움이 됐어요.', english:'That helped.' },
        { id:'v3_dir_8', speaker:'B', japanese:'左の角を曲がってください。', romaji:'hidari no kado wo magatte kudasai', korean:'왼쪽 모퉁이를 도세요.', english:'Turn at the left corner.' },
        { id:'v3_dir_9', speaker:'A', japanese:'左の角ですね。', romaji:'hidari no kado desu ne', korean:'왼쪽 모퉁이죠.', english:'The left corner, right?' },
        { id:'v3_dir_10', speaker:'B', japanese:'はい、すぐ見えます。', romaji:'hai, sugu miemasu', korean:'네, 바로 보여요.', english:'Yes, you will see it soon.' },
      ],
      money_counting_check: [
        { id:'v3_money_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 기념품 가게 — 돈, 수량, 날짜를 한 번에 확인하기', english:'📍 Souvenir shop — checking money, quantity, and date' },
        { id:'v3_money_1', speaker:'A', japanese:'すみません、これはいくらですか？', romaji:'sumimasen, kore wa ikura desu ka', korean:'저기요, 이건 얼마예요?', english:'Excuse me, how much is this?' },
        { id:'v3_money_2', speaker:'B', japanese:'八百円です。', romaji:'happyaku en desu', korean:'800엔이에요.', english:'It is 800 yen.' },
        { id:'v3_money_3', speaker:'A', japanese:'二つください。', romaji:'futatsu kudasai', korean:'두 개 주세요.', english:'Two, please.' },
        { id:'v3_money_4', speaker:'B', japanese:'二つで千六百円です。', romaji:'futatsu de sen roppyaku en desu', korean:'두 개면 1600엔이에요.', english:'Two are 1,600 yen.' },
        { id:'v3_money_5', speaker:'A', japanese:'カードは使えますか？', romaji:'kaado wa tsukaemasu ka', korean:'카드 쓸 수 있어요?', english:'Can I use a card?' },
        { id:'v3_money_6', speaker:'B', japanese:'はい、使えます。', romaji:'hai, tsukaemasu', korean:'네, 쓸 수 있어요.', english:'Yes, you can.' },
        { id:'v3_money_7', speaker:'A', japanese:'今日は何日ですか？', romaji:'kyou wa nan nichi desu ka', korean:'오늘은 며칠이에요?', english:'What date is it today?' },
        { id:'v3_money_8', speaker:'B', japanese:'今日は十日です。', romaji:'kyou wa tooka desu', korean:'오늘은 10일이에요.', english:'Today is the 10th.' },
        { id:'v3_money_9', speaker:'A', japanese:'袋は一つお願いします。', romaji:'fukuro wa hitotsu onegai shimasu', korean:'봉투는 하나 부탁해요.', english:'One bag, please.' },
        { id:'v3_money_10', speaker:'B', japanese:'はい、ありがとうございます。', romaji:'hai, arigatou gozaimasu', korean:'네, 감사합니다.', english:'Yes, thank you.' },
      ],
      first_photo_greeting: [
        { id:'v3_fg_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 지나가는 사람에게 사진 부탁하기', english:'📍 At a tourist spot — asking someone to take a photo' },
        { id:'v3_fg_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_fg_2', speaker:'A', japanese:'写真をお願いします。', romaji:'shashin wo onegai shimasu', korean:'사진 부탁해요.', english:'A photo, please.' },
        { id:'v3_fg_3', speaker:'B', japanese:'いいですよ。', romaji:'ii desu yo', korean:'좋아요.', english:'Sure.' },
        { id:'v3_fg_4', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'자, 여기요.', english:'Here you go.' },
        { id:'v3_fg_5', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_fg_6', speaker:'B', japanese:'日本は初めてですか？', romaji:'nihon wa hajimete desu ka', korean:'일본은 처음이에요?', english:'Is this your first time in Japan?' },
        { id:'v3_fg_7', speaker:'A', japanese:'はい、初めてです。', romaji:'hai, hajimete desu', korean:'네, 처음이에요.', english:'Yes, it is my first time.' },
        { id:'v3_fg_8', speaker:'B', japanese:'楽しんでください。', romaji:'tanoshinde kudasai', korean:'즐겁게 보내세요.', english:'Enjoy your trip.' },
        { id:'v3_fg_9', speaker:'A', japanese:'はい、ありがとうございます。', romaji:'hai, arigatou gozaimasu', korean:'네, 고마워요.', english:'Yes, thank you.' },
        { id:'v3_fg_10', speaker:'B', japanese:'よい旅を。', romaji:'yoi tabi wo', korean:'좋은 여행 되세요.', english:'Have a good trip.' },
      ],
      first_origin_chat: [
        { id:'v3_ans_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 어디서 왔는지 짧게 답하기', english:'📍 At a cafe — answering where you are from' },
        { id:'v3_ans_1', speaker:'B', japanese:'どこから来ましたか？', romaji:'doko kara kimashita ka', korean:'어디서 왔어요?', english:'Where are you from?' },
        { id:'v3_ans_2', speaker:'A', japanese:'韓国から来ました。', romaji:'kankoku kara kimashita', korean:'한국에서 왔어요.', english:'I came from Korea.' },
        { id:'v3_ans_3', speaker:'B', japanese:'旅行ですか？', romaji:'ryokou desu ka', korean:'여행이에요?', english:'Are you traveling?' },
        { id:'v3_ans_4', speaker:'A', japanese:'はい、旅行です。', romaji:'hai, ryokou desu', korean:'네, 여행이에요.', english:'Yes, I am traveling.' },
        { id:'v3_ans_5', speaker:'B', japanese:'楽しんでください。', romaji:'tanoshinde kudasai', korean:'즐겁게 보내세요.', english:'Enjoy yourself.' },
        { id:'v3_ans_6', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_ans_7', speaker:'B', japanese:'日本語が上手ですね。', romaji:'nihongo ga jouzu desu ne', korean:'일본어 잘하시네요.', english:'Your Japanese is good.' },
        { id:'v3_ans_8', speaker:'A', japanese:'いえ、少しだけです。', romaji:'ie, sukoshi dake desu', korean:'아니에요, 조금만 해요.', english:'No, only a little.' },
        { id:'v3_ans_9', speaker:'B', japanese:'どこへ行きますか？', romaji:'doko e ikimasu ka', korean:'어디에 가요?', english:'Where are you going?' },
        { id:'v3_ans_10', speaker:'A', japanese:'今日は浅草に行きます。', romaji:'kyou wa asakusa ni ikimasu', korean:'오늘은 아사쿠사에 가요.', english:'Today I am going to Asakusa.' },
      ],
      ask_again_help: [
        { id:'v3_q_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 가게에서 — 못 알아들었을 때 다시 부탁하기', english:'📍 At a shop — asking someone to repeat slowly' },
        { id:'v3_q_1', speaker:'B', japanese:'日本語、わかりますか？', romaji:'nihongo, wakarimasu ka', korean:'일본어 알아요?', english:'Do you understand Japanese?' },
        { id:'v3_q_2', speaker:'A', japanese:'すみません、少しだけです。', romaji:'sumimasen, sukoshi dake desu', korean:'미안해요, 조금만요.', english:'Sorry, only a little.' },
        { id:'v3_q_3', speaker:'A', japanese:'もう一度お願いします。', romaji:'mou ichido onegai shimasu', korean:'한 번 더 부탁해요.', english:'One more time, please.' },
        { id:'v3_q_4', speaker:'B', japanese:'はい、ゆっくり話します。', romaji:'hai, yukkuri hanashimasu', korean:'네, 천천히 말할게요.', english:'Sure, I will speak slowly.' },
        { id:'v3_q_5', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_q_6', speaker:'B', japanese:'これはポイントカードです。', romaji:'kore wa pointo kaado desu', korean:'이건 포인트 카드예요.', english:'This is a point card.' },
        { id:'v3_q_7', speaker:'A', japanese:'ポイントカードはありません。', romaji:'pointo kaado wa arimasen', korean:'포인트 카드는 없어요.', english:'I do not have a point card.' },
        { id:'v3_q_8', speaker:'B', japanese:'袋はどうしますか？', romaji:'fukuro wa dou shimasu ka', korean:'봉투는 어떻게 할까요?', english:'What about a bag?' },
        { id:'v3_q_9', speaker:'A', japanese:'袋は大丈夫です。', romaji:'fukuro wa daijoubu desu', korean:'봉투는 괜찮아요.', english:'No bag is fine.' },
        { id:'v3_q_10', speaker:'B', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠습니다.', english:'Understood.' },
      ],
      reaction_shadowing: [
        { id:'v3_react_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 길에서 짧게 반응하기 — 대화를 끊기지 않게 이어가기', english:'📍 Reacting briefly — keeping the conversation going' },
        { id:'v3_react_1', speaker:'B', japanese:'この道をまっすぐです。', romaji:'kono michi wo massugu desu', korean:'이 길을 쭉 가면 돼요.', english:'Go straight on this road.' },
        { id:'v3_react_2', speaker:'A', japanese:'はい。', romaji:'hai', korean:'네.', english:'Yes.' },
        { id:'v3_react_3', speaker:'B', japanese:'信号を右です。', romaji:'shingou wo migi desu', korean:'신호에서 오른쪽이에요.', english:'Right at the traffic light.' },
        { id:'v3_react_4', speaker:'A', japanese:'右ですね。', romaji:'migi desu ne', korean:'오른쪽이죠.', english:'Right, correct?' },
        { id:'v3_react_5', speaker:'B', japanese:'はい、そうです。', romaji:'hai, sou desu', korean:'네, 맞아요.', english:'Yes, that is right.' },
        { id:'v3_react_6', speaker:'A', japanese:'すみません、もう一度お願いします。', romaji:'sumimasen, mou ichido onegai shimasu', korean:'죄송해요, 한 번 더 부탁해요.', english:'Sorry, one more time please.' },
        { id:'v3_react_7', speaker:'B', japanese:'ゆっくり言いますね。', romaji:'yukkuri iimasu ne', korean:'천천히 말할게요.', english:'I will say it slowly.' },
        { id:'v3_react_8', speaker:'A', japanese:'助かります。', romaji:'tasukarimasu', korean:'도움돼요.', english:'That helps.' },
        { id:'v3_react_9', speaker:'B', japanese:'気をつけてください。', romaji:'ki wo tsukete kudasai', korean:'조심하세요.', english:'Take care.' },
        { id:'v3_react_10', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      immigration_short: [
        { id:'v3_im_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 입국 심사에서 — 목적과 기간 짧게 답하기', english:'📍 Immigration — answering purpose and stay' },
        { id:'v3_im_1', speaker:'B', japanese:'目的は何ですか？', romaji:'mokuteki wa nan desu ka', korean:'목적은 뭐예요?', english:'What is your purpose?' },
        { id:'v3_im_2', speaker:'A', japanese:'旅行です。', romaji:'ryokou desu', korean:'여행이에요.', english:'Travel.' },
        { id:'v3_im_3', speaker:'B', japanese:'何日ですか？', romaji:'nan nichi desu ka', korean:'며칠이에요?', english:'How many days?' },
        { id:'v3_im_4', speaker:'A', japanese:'三日です。', romaji:'mikka desu', korean:'3일이에요.', english:'Three days.' },
        { id:'v3_im_5', speaker:'B', japanese:'ホテルはどこですか？', romaji:'hoteru wa doko desu ka', korean:'호텔은 어디예요?', english:'Where is your hotel?' },
        { id:'v3_im_6', speaker:'A', japanese:'新宿のホテルです。', romaji:'shinjuku no hoteru desu', korean:'신주쿠 호텔이에요.', english:'A hotel in Shinjuku.' },
        { id:'v3_im_7', speaker:'B', japanese:'帰りのチケットはありますか？', romaji:'kaeri no chiketto wa arimasu ka', korean:'돌아가는 티켓 있어요?', english:'Do you have a return ticket?' },
        { id:'v3_im_8', speaker:'A', japanese:'はい、あります。', romaji:'hai, arimasu', korean:'네, 있어요.', english:'Yes, I do.' },
        { id:'v3_im_9', speaker:'B', japanese:'一人ですか？', romaji:'hitori desu ka', korean:'혼자예요?', english:'Are you alone?' },
        { id:'v3_im_10', speaker:'A', japanese:'はい、一人です。', romaji:'hai, hitori desu', korean:'네, 혼자예요.', english:'Yes, alone.' },
        { id:'v3_im_11', speaker:'B', japanese:'どうぞ。', romaji:'douzo', korean:'가세요.', english:'Go ahead.' },
      ],
      airplane_request: [
        { id:'v3_plane_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 비행기 안에서 — 필요한 물건 부탁하기', english:'📍 On the plane — asking for what you need' },
        { id:'v3_plane_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_plane_2', speaker:'A', japanese:'水をください。', romaji:'mizu wo kudasai', korean:'물 주세요.', english:'Water, please.' },
        { id:'v3_plane_3', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_plane_4', speaker:'A', japanese:'毛布はありますか？', romaji:'moufu wa arimasu ka', korean:'담요 있어요?', english:'Do you have a blanket?' },
        { id:'v3_plane_5', speaker:'B', japanese:'少々お待ちください。', romaji:'shoushou omachi kudasai', korean:'잠시 기다려 주세요.', english:'Please wait a moment.' },
        { id:'v3_plane_6', speaker:'B', japanese:'こちらです。', romaji:'kochira desu', korean:'여기요.', english:'Here it is.' },
        { id:'v3_plane_7', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_plane_8', speaker:'A', japanese:'入国カードはありますか？', romaji:'nyuukoku kaado wa arimasu ka', korean:'입국 카드 있어요?', english:'Do you have an immigration card?' },
        { id:'v3_plane_9', speaker:'B', japanese:'はい、こちらにあります。', romaji:'hai, kochira ni arimasu', korean:'네, 여기에 있어요.', english:'Yes, it is here.' },
        { id:'v3_plane_10', speaker:'A', japanese:'ペンもお願いします。', romaji:'pen mo onegai shimasu', korean:'펜도 부탁해요.', english:'A pen too, please.' },
        { id:'v3_plane_11', speaker:'B', japanese:'どうぞ。', romaji:'douzo', korean:'여기요.', english:'Here you go.' },
      ],

      station_direction: [
        { id:'v3_station_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 앞에서 — 목적지와 환승을 묻기', english:'📍 In front of a station — asking for a destination and transfer' },
        { id:'v3_station_1', speaker:'A', japanese:'すみません、新宿駅はどこですか？', romaji:'sumimasen, shinjuku eki wa doko desu ka', korean:'저기요, 신주쿠역은 어디예요?', english:'Excuse me, where is Shinjuku Station?' },
        { id:'v3_station_2', speaker:'B', japanese:'この道をまっすぐです。', romaji:'kono michi wo massugu desu', korean:'이 길을 쭉 가면 돼요.', english:'Go straight on this road.' },
        { id:'v3_station_3', speaker:'A', japanese:'歩いて何分ですか？', romaji:'aruite nan pun desu ka', korean:'걸어서 몇 분이에요?', english:'How many minutes on foot?' },
        { id:'v3_station_4', speaker:'B', japanese:'十分くらいです。', romaji:'juppun kurai desu', korean:'10분 정도예요.', english:'About ten minutes.' },
        { id:'v3_station_5', speaker:'A', japanese:'乗り換えはありますか？', romaji:'norikae wa arimasu ka', korean:'환승 있어요?', english:'Is there a transfer?' },
        { id:'v3_station_6', speaker:'B', japanese:'山手線に乗ってください。', romaji:'yamanote sen ni notte kudasai', korean:'야마노테선을 타세요.', english:'Please take the Yamanote Line.' },
        { id:'v3_station_7', speaker:'A', japanese:'何番線ですか？', romaji:'nan bansen desu ka', korean:'몇 번 승강장이에요?', english:'Which platform?' },
        { id:'v3_station_8', speaker:'B', japanese:'二番線です。', romaji:'ni bansen desu', korean:'2번 승강장이에요.', english:'Platform two.' },
        { id:'v3_station_9', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_station_10', speaker:'B', japanese:'気をつけてください。', romaji:'ki wo tsukete kudasai', korean:'조심하세요.', english:'Please take care.' },
      ],
      bus_ride: [
        { id:'v3_bus_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 버스 정류장에서 — 이 버스가 목적지에 가는지 확인하기', english:'📍 At a bus stop — checking the destination' },
        { id:'v3_bus_1', speaker:'A', japanese:'すみません、このバスは浅草に行きますか？', romaji:'sumimasen, kono basu wa asakusa ni ikimasu ka', korean:'저기요, 이 버스는 아사쿠사에 가요?', english:'Excuse me, does this bus go to Asakusa?' },
        { id:'v3_bus_2', speaker:'B', japanese:'はい、行きます。', romaji:'hai, ikimasu', korean:'네, 가요.', english:'Yes, it does.' },
        { id:'v3_bus_3', speaker:'A', japanese:'料金はいくらですか？', romaji:'ryoukin wa ikura desu ka', korean:'요금은 얼마예요?', english:'How much is the fare?' },
        { id:'v3_bus_4', speaker:'B', japanese:'二百円です。', romaji:'nihyaku en desu', korean:'200엔이에요.', english:'It is 200 yen.' },
        { id:'v3_bus_5', speaker:'A', japanese:'ICカードは使えますか？', romaji:'IC kaado wa tsukaemasu ka', korean:'IC 카드 쓸 수 있어요?', english:'Can I use an IC card?' },
        { id:'v3_bus_6', speaker:'B', japanese:'はい、使えます。', romaji:'hai, tsukaemasu', korean:'네, 쓸 수 있어요.', english:'Yes, you can.' },
        { id:'v3_bus_7', speaker:'A', japanese:'どこで降りますか？', romaji:'doko de orimasu ka', korean:'어디에서 내려요?', english:'Where do I get off?' },
        { id:'v3_bus_8', speaker:'B', japanese:'次の次です。', romaji:'tsugi no tsugi desu', korean:'다음 다음이에요.', english:'The stop after next.' },
        { id:'v3_bus_9', speaker:'A', japanese:'降りる時にボタンを押しますか？', romaji:'oriru toki ni botan wo oshimasu ka', korean:'내릴 때 버튼을 눌러요?', english:'Do I press the button when getting off?' },
        { id:'v3_bus_10', speaker:'B', japanese:'はい、押してください。', romaji:'hai, oshite kudasai', korean:'네, 눌러 주세요.', english:'Yes, please press it.' },
        { id:'v3_bus_11', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      taxi_ride: [
        { id:'v3_taxi_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 택시에서 — 호텔까지 가고 카드 결제 묻기', english:'📍 In a taxi — going to the hotel and asking about card payment' },
        { id:'v3_taxi_1', speaker:'A', japanese:'このホテルまでお願いします。', romaji:'kono hoteru made onegai shimasu', korean:'이 호텔까지 부탁해요.', english:'To this hotel, please.' },
        { id:'v3_taxi_2', speaker:'B', japanese:'はい、わかりました。', romaji:'hai, wakarimashita', korean:'네, 알겠습니다.', english:'Sure.' },
        { id:'v3_taxi_3', speaker:'B', japanese:'高速道路を使いますか？', romaji:'kousoku douro wo tsukaimasu ka', korean:'고속도로를 이용할까요?', english:'Should I use the expressway?' },
        { id:'v3_taxi_4', speaker:'A', japanese:'使わないでお願いします。', romaji:'tsukawanaide onegai shimasu', korean:'쓰지 말아 주세요.', english:'Please do not use it.' },
        { id:'v3_taxi_5', speaker:'A', japanese:'何分かかりますか？', romaji:'nan pun kakarimasu ka', korean:'몇 분 걸려요?', english:'How many minutes does it take?' },
        { id:'v3_taxi_6', speaker:'B', japanese:'十五分くらいです。', romaji:'juugo fun kurai desu', korean:'15분 정도예요.', english:'About 15 minutes.' },
        { id:'v3_taxi_7', speaker:'A', japanese:'ここで大丈夫です。', romaji:'koko de daijoubu desu', korean:'여기서 괜찮아요.', english:'Here is fine.' },
        { id:'v3_taxi_8', speaker:'B', japanese:'料金は二千円です。', romaji:'ryoukin wa nisen en desu', korean:'요금은 2000엔이에요.', english:'The fare is 2,000 yen.' },
        { id:'v3_taxi_9', speaker:'A', japanese:'カードは使えますか？', romaji:'kaado wa tsukaemasu ka', korean:'카드 쓸 수 있어요?', english:'Can I use a card?' },
        { id:'v3_taxi_10', speaker:'B', japanese:'はい、使えます。', romaji:'hai, tsukaemasu', korean:'네, 쓸 수 있어요.', english:'Yes, you can.' },
        { id:'v3_taxi_11', speaker:'A', japanese:'領収書をください。', romaji:'ryoushuusho wo kudasai', korean:'영수증 주세요.', english:'Please give me a receipt.' },
        { id:'v3_taxi_12', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
      ],
      konbini_bento: [
        { id:'v3_kon_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 편의점에서 — 도시락 데우기, 젓가락, 봉투, 결제까지', english:'📍 At a convenience store — heating a bento, chopsticks, bag, payment' },
        { id:'v3_kon_1', speaker:'B', japanese:'いらっしゃいませ。', romaji:'irasshaimase', korean:'어서 오세요.', english:'Welcome.' },
        { id:'v3_kon_2', speaker:'A', japanese:'このお弁当をお願いします。', romaji:'kono obentou wo onegai shimasu', korean:'이 도시락 부탁해요.', english:'This bento, please.' },
        { id:'v3_kon_3', speaker:'B', japanese:'温めますか？', romaji:'atatamemasu ka', korean:'데워 드릴까요?', english:'Would you like it heated?' },
        { id:'v3_kon_4', speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁해요.', english:'Yes, please.' },
        { id:'v3_kon_5', speaker:'B', japanese:'お箸は要りますか？', romaji:'ohashi wa irimasu ka', korean:'젓가락 필요하세요?', english:'Do you need chopsticks?' },
        { id:'v3_kon_6', speaker:'A', japanese:'一つお願いします。', romaji:'hitotsu onegai shimasu', korean:'하나 부탁해요.', english:'One, please.' },
        { id:'v3_kon_7', speaker:'B', japanese:'袋は要りますか？', romaji:'fukuro wa irimasu ka', korean:'봉투 필요하세요?', english:'Do you need a bag?' },
        { id:'v3_kon_8', speaker:'A', japanese:'大丈夫です。', romaji:'daijoubu desu', korean:'괜찮아요.', english:'No, thank you.' },
        { id:'v3_kon_9', speaker:'B', japanese:'お会計は六百円です。', romaji:'okaikei wa roppyaku en desu', korean:'계산은 600엔이에요.', english:'The total is 600 yen.' },
        { id:'v3_kon_10', speaker:'A', japanese:'Suicaでお願いします。', romaji:'suika de onegai shimasu', korean:'스이카로 부탁해요.', english:'By Suica, please.' },
        { id:'v3_kon_11', speaker:'B', japanese:'ありがとうございました。', romaji:'arigatou gozaimashita', korean:'감사합니다.', english:'Thank you.' },
      ],
      cafe_breakfast: [
        { id:'v3_cafe_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 아침 메뉴와 음료 주문하기', english:'📍 At a cafe — ordering breakfast and a drink' },
        { id:'v3_cafe_1', speaker:'A', japanese:'モーニングセットをください。', romaji:'mooningu setto wo kudasai', korean:'모닝 세트 주세요.', english:'Morning set, please.' },
        { id:'v3_cafe_2', speaker:'B', japanese:'お飲み物は何にしますか？', romaji:'onomimono wa nani ni shimasu ka', korean:'음료는 뭘로 하시겠어요?', english:'What drink would you like?' },
        { id:'v3_cafe_3', speaker:'A', japanese:'アイスコーヒーでお願いします。', romaji:'aisu koohii de onegai shimasu', korean:'아이스커피로 부탁해요.', english:'Iced coffee, please.' },
        { id:'v3_cafe_4', speaker:'B', japanese:'店内ですか？', romaji:'tennai desu ka', korean:'매장이세요?', english:'For here?' },
        { id:'v3_cafe_5', speaker:'A', japanese:'はい、店内です。', romaji:'hai, tennai desu', korean:'네, 매장이요.', english:'Yes, for here.' },
        { id:'v3_cafe_6', speaker:'B', japanese:'席はあちらです。', romaji:'seki wa achira desu', korean:'자리는 저쪽이에요.', english:'Seats are over there.' },
        { id:'v3_cafe_7', speaker:'A', japanese:'何時までですか？', romaji:'nan ji made desu ka', korean:'몇 시까지예요?', english:'Until what time?' },
        { id:'v3_cafe_8', speaker:'B', japanese:'十一時までです。', romaji:'juuichi ji made desu', korean:'11시까지예요.', english:'Until eleven.' },
        { id:'v3_cafe_9', speaker:'A', japanese:'トーストもお願いします。', romaji:'toosuto mo onegai shimasu', korean:'토스트도 부탁해요.', english:'Toast too, please.' },
        { id:'v3_cafe_10', speaker:'B', japanese:'かしこまりました。', romaji:'kashikomarimashita', korean:'알겠습니다.', english:'Certainly.' },
      ],
      restaurant_solo:      pick('rd_n1','rd_1','rd_2','rd_3','rd_6','rd_7','rd_8','rd_9','rd_10','rd_11','rd_12','rd_13'),
      izakaya_order: [
        { id:'v3_iz_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야에서 — 첫 잔과 추천 메뉴 주문하기', english:'📍 At an izakaya — ordering the first drink and a recommendation' },
        { id:'v3_iz_1', speaker:'B', japanese:'何名様ですか？', romaji:'nan mei sama desu ka', korean:'몇 분이세요?', english:'How many people?' },
        { id:'v3_iz_2', speaker:'A', japanese:'二人です。', romaji:'futari desu', korean:'두 명이에요.', english:'Two people.' },
        { id:'v3_iz_3', speaker:'B', japanese:'禁煙席でよろしいですか？', romaji:'kinen seki de yoroshii desu ka', korean:'금연석 괜찮으세요?', english:'Is a non-smoking seat okay?' },
        { id:'v3_iz_4', speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁해요.', english:'Yes, please.' },
        { id:'v3_iz_5', speaker:'B', japanese:'お飲み物は？', romaji:'onomimono wa', korean:'음료는요?', english:'What would you like to drink?' },
        { id:'v3_iz_6', speaker:'A', japanese:'ビールを二つください。', romaji:'biiru wo futatsu kudasai', korean:'맥주 두 잔 주세요.', english:'Two beers, please.' },
        { id:'v3_iz_7', speaker:'A', japanese:'おすすめは何ですか？', romaji:'osusume wa nan desu ka', korean:'추천은 뭐예요?', english:'What do you recommend?' },
        { id:'v3_iz_8', speaker:'B', japanese:'焼き鳥がおすすめです。', romaji:'yakitori ga osusume desu', korean:'야키토리가 추천이에요.', english:'Yakitori is recommended.' },
        { id:'v3_iz_9', speaker:'A', japanese:'それもお願いします。', romaji:'sore mo onegai shimasu', korean:'그것도 부탁해요.', english:'That too, please.' },
        { id:'v3_iz_10', speaker:'A', japanese:'お水をください。', romaji:'omizu wo kudasai', korean:'물 주세요.', english:'Water, please.' },
        { id:'v3_iz_11', speaker:'B', japanese:'はい、少々お待ちください。', romaji:'hai, shoushou omachi kudasai', korean:'네, 잠시 기다려 주세요.', english:'Sure, please wait a moment.' },
        { id:'v3_iz_12', speaker:'A', japanese:'あとでお会計をお願いします。', romaji:'ato de okaikei wo onegai shimasu', korean:'나중에 계산 부탁해요.', english:'The check later, please.' },
      ],
      cafe_order:           by('cf_'),
      clothes_size: [
        { id:'v3_shop_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 옷가게에서 — 사이즈와 입어보기 묻기', english:'📍 At a clothing store — asking about size and trying on' },
        { id:'v3_shop_1', speaker:'B', japanese:'いらっしゃいませ。', romaji:'irasshaimase', korean:'어서 오세요.', english:'Welcome.' },
        { id:'v3_shop_2', speaker:'A', japanese:'見ているだけです。', romaji:'mite iru dake desu', korean:'그냥 보고 있어요.', english:'I am just looking.' },
        { id:'v3_shop_3', speaker:'A', japanese:'これを試着してもいいですか？', romaji:'kore wo shichaku shite mo ii desu ka', korean:'이거 입어봐도 돼요?', english:'May I try this on?' },
        { id:'v3_shop_4', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 그러세요.', english:'Yes, please.' },
        { id:'v3_shop_5', speaker:'A', japanese:'Mサイズはありますか？', romaji:'emu saizu wa arimasu ka', korean:'M 사이즈 있어요?', english:'Do you have size M?' },
        { id:'v3_shop_6', speaker:'B', japanese:'はい、あります。', romaji:'hai, arimasu', korean:'네, 있어요.', english:'Yes, we do.' },
        { id:'v3_shop_7', speaker:'A', japanese:'少し大きいです。', romaji:'sukoshi ookii desu', korean:'조금 커요.', english:'It is a little big.' },
        { id:'v3_shop_8', speaker:'B', japanese:'Sサイズもあります。', romaji:'esu saizu mo arimasu', korean:'S 사이즈도 있어요.', english:'We also have size S.' },
        { id:'v3_shop_9', speaker:'A', japanese:'いくらですか？', romaji:'ikura desu ka', korean:'얼마예요?', english:'How much is it?' },
        { id:'v3_shop_10', speaker:'B', japanese:'三千円です。', romaji:'sanzen en desu', korean:'3000엔이에요.', english:'It is 3,000 yen.' },
        { id:'v3_shop_11', speaker:'A', japanese:'これにします。', romaji:'kore ni shimasu', korean:'이걸로 할게요.', english:'I will take this.' },
      ],
      store_payment: [
        { id:'v3_pay_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 상점에서 — 카드 결제와 봉투 확인하기', english:'📍 At a shop — card payment and bag check' },
        { id:'v3_pay_1', speaker:'A', japanese:'これにします。', romaji:'kore ni shimasu', korean:'이걸로 할게요.', english:'I will take this.' },
        { id:'v3_pay_2', speaker:'B', japanese:'袋は要りますか？', romaji:'fukuro wa irimasu ka', korean:'봉투 필요하세요?', english:'Do you need a bag?' },
        { id:'v3_pay_3', speaker:'A', japanese:'大丈夫です。', romaji:'daijoubu desu', korean:'괜찮아요.', english:'No, thank you.' },
        { id:'v3_pay_4', speaker:'B', japanese:'お会計は三千円です。', romaji:'okaikei wa sanzen en desu', korean:'계산은 3000엔이에요.', english:'The total is 3,000 yen.' },
        { id:'v3_pay_5', speaker:'A', japanese:'カードでお願いします。', romaji:'kaado de onegai shimasu', korean:'카드로 부탁해요.', english:'By card, please.' },
        { id:'v3_pay_6', speaker:'B', japanese:'はい、こちらにお願いします。', romaji:'hai, kochira ni onegai shimasu', korean:'네, 여기에 부탁드려요.', english:'Here, please.' },
        { id:'v3_pay_7', speaker:'B', japanese:'暗証番号をお願いします。', romaji:'anshou bangou wo onegai shimasu', korean:'비밀번호 부탁드려요.', english:'Please enter your PIN.' },
        { id:'v3_pay_8', speaker:'A', japanese:'レシートをください。', romaji:'reshiito wo kudasai', korean:'영수증 주세요.', english:'Receipt, please.' },
        { id:'v3_pay_9', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_pay_10', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_pay_11', speaker:'B', japanese:'ありがとうございました。', romaji:'arigatou gozaimashita', korean:'감사합니다.', english:'Thank you.' },
      ],
      duty_free_shop: [
        { id:'v3_df_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 면세점에서 — 선물 추천과 기내 반입 묻기', english:'📍 At duty-free — asking for a gift recommendation and carry-on rules' },
        { id:'v3_df_1', speaker:'A', japanese:'お土産を探しています。', romaji:'omiyage wo sagashite imasu', korean:'선물을 찾고 있어요.', english:'I am looking for a souvenir.' },
        { id:'v3_df_2', speaker:'B', japanese:'こちらが人気です。', romaji:'kochira ga ninki desu', korean:'이쪽이 인기예요.', english:'This one is popular.' },
        { id:'v3_df_3', speaker:'A', japanese:'これはいくらですか？', romaji:'kore wa ikura desu ka', korean:'이건 얼마예요?', english:'How much is this?' },
        { id:'v3_df_4', speaker:'B', japanese:'二千五百円です。', romaji:'nisen gohyaku en desu', korean:'2500엔이에요.', english:'It is 2,500 yen.' },
        { id:'v3_df_5', speaker:'A', japanese:'機内に持ち込めますか？', romaji:'kinai ni mochikomemasu ka', korean:'기내에 가지고 탈 수 있어요?', english:'Can I bring it on the plane?' },
        { id:'v3_df_6', speaker:'B', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, it is fine.' },
        { id:'v3_df_7', speaker:'A', japanese:'これを二つください。', romaji:'kore wo futatsu kudasai', korean:'이거 두 개 주세요.', english:'Two of these, please.' },
        { id:'v3_df_8', speaker:'B', japanese:'パスポートをお願いします。', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요.', english:'Your passport, please.' },
        { id:'v3_df_9', speaker:'A', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_df_10', speaker:'B', japanese:'プレゼント用にしますか？', romaji:'purezento you ni shimasu ka', korean:'선물용으로 해드릴까요?', english:'Would you like it gift wrapped?' },
        { id:'v3_df_11', speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁해요.', english:'Yes, please.' },
      ],
      hotel_checkin: [
        { id:'v3_hotel_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트에서 — 예약 확인, 조식, 체크아웃 시간 묻기', english:'📍 At hotel reception — reservation, breakfast, checkout' },
        { id:'v3_hotel_1', speaker:'A', japanese:'チェックインをお願いします。', romaji:'chekku in wo onegai shimasu', korean:'체크인 부탁해요.', english:'Check-in, please.' },
        { id:'v3_hotel_2', speaker:'B', japanese:'ご予約のお名前は？', romaji:'goyoyaku no onamae wa', korean:'예약 이름은요?', english:'Name on the reservation?' },
        { id:'v3_hotel_3', speaker:'A', japanese:'キムです。', romaji:'kimu desu', korean:'김입니다.', english:'Kim.' },
        { id:'v3_hotel_4', speaker:'B', japanese:'パスポートをお願いします。', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요.', english:'Your passport, please.' },
        { id:'v3_hotel_5', speaker:'A', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_hotel_6', speaker:'B', japanese:'お部屋は八階です。', romaji:'oheya wa hachikai desu', korean:'객실은 8층이에요.', english:'Your room is on the eighth floor.' },
        { id:'v3_hotel_7', speaker:'A', japanese:'朝食は何時からですか？', romaji:'choushoku wa nan ji kara desu ka', korean:'조식은 몇 시부터예요?', english:'What time does breakfast start?' },
        { id:'v3_hotel_8', speaker:'B', japanese:'朝七時からです。', romaji:'asa shichi ji kara desu', korean:'아침 7시부터예요.', english:'From 7 a.m.' },
        { id:'v3_hotel_9', speaker:'A', japanese:'チェックアウトは何時ですか？', romaji:'chekku auto wa nan ji desu ka', korean:'체크아웃은 몇 시예요?', english:'What time is checkout?' },
        { id:'v3_hotel_10', speaker:'B', japanese:'十一時です。', romaji:'juuichi ji desu', korean:'11시예요.', english:'It is at eleven.' },
        { id:'v3_hotel_11', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      hotel_request: [
        { id:'v3_hr_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트에서 — 수건과 와이파이 부탁하기', english:'📍 At the hotel front desk — asking for towels and Wi-Fi' },
        { id:'v3_hr_1', speaker:'A', japanese:'すみません、タオルをください。', romaji:'sumimasen, taoru wo kudasai', korean:'저기요, 수건 주세요.', english:'Excuse me, towels please.' },
        { id:'v3_hr_2', speaker:'B', japanese:'はい、お部屋番号は？', romaji:'hai, oheya bangou wa', korean:'네, 방 번호는요?', english:'Sure, your room number?' },
        { id:'v3_hr_3', speaker:'A', japanese:'五〇二です。', romaji:'go maru ni desu', korean:'502호예요.', english:'It is 502.' },
        { id:'v3_hr_4', speaker:'B', japanese:'すぐお持ちします。', romaji:'sugu omochi shimasu', korean:'바로 가져다드릴게요.', english:'We will bring them right away.' },
        { id:'v3_hr_5', speaker:'A', japanese:'Wi-Fiのパスワードは何ですか？', romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호는 뭐예요?', english:'What is the Wi-Fi password?' },
        { id:'v3_hr_6', speaker:'B', japanese:'こちらです。', romaji:'kochira desu', korean:'여기예요.', english:'Here it is.' },
        { id:'v3_hr_7', speaker:'A', japanese:'エアコンが動きません。', romaji:'eakon ga ugokimasen', korean:'에어컨이 작동하지 않아요.', english:'The air conditioner is not working.' },
        { id:'v3_hr_8', speaker:'B', japanese:'確認します。', romaji:'kakunin shimasu', korean:'확인할게요.', english:'We will check it.' },
        { id:'v3_hr_9', speaker:'A', japanese:'少し待てばいいですか？', romaji:'sukoshi mateba ii desu ka', korean:'조금 기다리면 돼요?', english:'Should I wait a bit?' },
        { id:'v3_hr_10', speaker:'B', japanese:'はい、十分くらいです。', romaji:'hai, juppun kurai desu', korean:'네, 10분 정도예요.', english:'Yes, about ten minutes.' },
        { id:'v3_hr_11', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      onsen_rules: [
        { id:'v3_on_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 온천에서 — 이용 시간과 수건을 묻기', english:'📍 At an onsen — asking about hours and towels' },
        { id:'v3_on_1', speaker:'A', japanese:'温泉は何時までですか？', romaji:'onsen wa nan ji made desu ka', korean:'온천은 몇 시까지예요?', english:'Until what time is the onsen open?' },
        { id:'v3_on_2', speaker:'B', japanese:'夜十一時までです。', romaji:'yoru juuichi ji made desu', korean:'밤 11시까지예요.', english:'Until 11 p.m.' },
        { id:'v3_on_3', speaker:'A', japanese:'タオルはありますか？', romaji:'taoru wa arimasu ka', korean:'수건 있어요?', english:'Are there towels?' },
        { id:'v3_on_4', speaker:'B', japanese:'お部屋のタオルをお使いください。', romaji:'oheya no taoru wo otsukai kudasai', korean:'객실 수건을 사용해 주세요.', english:'Please use the towels in your room.' },
        { id:'v3_on_5', speaker:'A', japanese:'ここで靴を脱ぎますか？', romaji:'koko de kutsu wo nugimasu ka', korean:'여기서 신발 벗어요?', english:'Do I take off my shoes here?' },
        { id:'v3_on_6', speaker:'B', japanese:'はい、ここで脱いでください。', romaji:'hai, koko de nuide kudasai', korean:'네, 여기서 벗어 주세요.', english:'Yes, please take them off here.' },
        { id:'v3_on_7', speaker:'A', japanese:'ロッカーはどこですか？', romaji:'rokkaa wa doko desu ka', korean:'락커는 어디예요?', english:'Where are the lockers?' },
        { id:'v3_on_8', speaker:'B', japanese:'右にあります。', romaji:'migi ni arimasu', korean:'오른쪽에 있어요.', english:'They are on the right.' },
        { id:'v3_on_9', speaker:'B', japanese:'写真はだめです。', romaji:'shashin wa dame desu', korean:'사진은 안 돼요.', english:'Photos are not allowed.' },
        { id:'v3_on_10', speaker:'A', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠어요.', english:'I understand.' },
        { id:'v3_on_11', speaker:'B', japanese:'ゆっくりしてください。', romaji:'yukkuri shite kudasai', korean:'편히 쉬세요.', english:'Please relax.' },
      ],
      airport_checkin: [
        { id:'v3_air_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 공항 체크인 카운터에서 — 여권, 짐, 좌석, 탑승 시간을 확인하기', english:'📍 At airport check-in — passport, luggage, seat, boarding time' },
        { id:'v3_air_1', speaker:'B', japanese:'パスポートをお願いします。', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요.', english:'Your passport, please.' },
        { id:'v3_air_2', speaker:'A', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_air_3', speaker:'B', japanese:'お荷物はいくつですか？', romaji:'onimotsu wa ikutsu desu ka', korean:'짐은 몇 개예요?', english:'How many bags?' },
        { id:'v3_air_4', speaker:'A', japanese:'一つです。', romaji:'hitotsu desu', korean:'하나예요.', english:'One.' },
        { id:'v3_air_5', speaker:'B', japanese:'窓側と通路側、どちらがいいですか？', romaji:'madogawa to tsuuro gawa, dochira ga ii desu ka', korean:'창가와 통로 쪽, 어느 쪽이 좋아요?', english:'Window or aisle, which do you prefer?' },
        { id:'v3_air_6', speaker:'A', japanese:'通路側をお願いします。', romaji:'tsuuro gawa wo onegai shimasu', korean:'통로 쪽으로 부탁해요.', english:'Aisle, please.' },
        { id:'v3_air_7', speaker:'B', japanese:'搭乗口は二十番です。', romaji:'toujouguchi wa nijuu ban desu', korean:'탑승구는 20번이에요.', english:'The gate is number twenty.' },
        { id:'v3_air_8', speaker:'A', japanese:'何時から搭乗ですか？', romaji:'nan ji kara toujou desu ka', korean:'몇 시부터 탑승이에요?', english:'What time does boarding start?' },
        { id:'v3_air_9', speaker:'B', japanese:'十時二十分からです。', romaji:'juu ji nijuppun kara desu', korean:'10시 20분부터예요.', english:'From 10:20.' },
        { id:'v3_air_10', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      health_help: [
        { id:'v3_hp_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 약국에서 — 배가 아프다고 말하고 약 받기', english:'📍 At a pharmacy — saying your stomach hurts and getting medicine' },
        { id:'v3_hp_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_hp_2', speaker:'A', japanese:'お腹が痛いです。', romaji:'onaka ga itai desu', korean:'배가 아파요.', english:'My stomach hurts.' },
        { id:'v3_hp_3', speaker:'B', japanese:'いつからですか？', romaji:'itsu kara desu ka', korean:'언제부터예요?', english:'Since when?' },
        { id:'v3_hp_4', speaker:'A', japanese:'今日の朝からです。', romaji:'kyou no asa kara desu', korean:'오늘 아침부터요.', english:'Since this morning.' },
        { id:'v3_hp_5', speaker:'B', japanese:'熱はありますか？', romaji:'netsu wa arimasu ka', korean:'열은 있어요?', english:'Do you have a fever?' },
        { id:'v3_hp_6', speaker:'A', japanese:'少しあります。', romaji:'sukoshi arimasu', korean:'조금 있어요.', english:'A little.' },
        { id:'v3_hp_7', speaker:'B', japanese:'この薬を飲んでください。', romaji:'kono kusuri wo nonde kudasai', korean:'이 약을 드세요.', english:'Please take this medicine.' },
        { id:'v3_hp_8', speaker:'A', japanese:'いつ飲みますか？', romaji:'itsu nomimasu ka', korean:'언제 먹어요?', english:'When should I take it?' },
        { id:'v3_hp_9', speaker:'B', japanese:'食後に飲んでください。', romaji:'shokugo ni nonde kudasai', korean:'식후에 드세요.', english:'Take it after meals.' },
        { id:'v3_hp_10', speaker:'A', japanese:'一日何回ですか？', romaji:'ichinichi nan kai desu ka', korean:'하루 몇 번이에요?', english:'How many times a day?' },
        { id:'v3_hp_11', speaker:'B', japanese:'一日三回です。', romaji:'ichinichi sankai desu', korean:'하루 세 번이에요.', english:'Three times a day.' },
        { id:'v3_hp_12', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      lost_item_help: [
        { id:'v3_lost_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 안내소에서 — 가방을 잃어버렸다고 말하기', english:'📍 At a station desk — saying you lost your bag' },
        { id:'v3_lost_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_lost_2', speaker:'A', japanese:'かばんをなくしました。', romaji:'kaban wo nakushimashita', korean:'가방을 잃어버렸어요.', english:'I lost my bag.' },
        { id:'v3_lost_3', speaker:'B', japanese:'どこでなくしましたか？', romaji:'doko de nakushimashita ka', korean:'어디에서 잃어버렸어요?', english:'Where did you lose it?' },
        { id:'v3_lost_4', speaker:'A', japanese:'電車の中だと思います。', romaji:'densha no naka da to omoimasu', korean:'전철 안인 것 같아요.', english:'I think it was on the train.' },
        { id:'v3_lost_5', speaker:'B', japanese:'どんなかばんですか？', romaji:'donna kaban desu ka', korean:'어떤 가방이에요?', english:'What kind of bag is it?' },
        { id:'v3_lost_6', speaker:'A', japanese:'黒いかばんです。', romaji:'kuroi kaban desu', korean:'검은 가방이에요.', english:'It is a black bag.' },
        { id:'v3_lost_7', speaker:'B', japanese:'中に何がありますか？', romaji:'naka ni nani ga arimasu ka', korean:'안에 뭐가 있어요?', english:'What is inside?' },
        { id:'v3_lost_8', speaker:'A', japanese:'パスポートがあります。', romaji:'pasupooto ga arimasu', korean:'여권이 있어요.', english:'There is a passport.' },
        { id:'v3_lost_9', speaker:'B', japanese:'少し待ってください。', romaji:'sukoshi matte kudasai', korean:'잠깐 기다려 주세요.', english:'Please wait a moment.' },
        { id:'v3_lost_10', speaker:'A', japanese:'お願いします。', romaji:'onegai shimasu', korean:'부탁해요.', english:'Please.' },
        { id:'v3_lost_11', speaker:'B', japanese:'見つかったら連絡します。', romaji:'mitsukattara renraku shimasu', korean:'찾으면 연락할게요.', english:'We will contact you if it is found.' },
      ],
      hospital_reception: [
        { id:'v3_hos_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 병원 접수에서 — 증상과 보험 여부 말하기', english:'📍 At hospital reception — explaining symptoms and insurance' },
        { id:'v3_hos_1', speaker:'A', japanese:'すみません、診てもらえますか？', romaji:'sumimasen, mite moraemasu ka', korean:'저기요, 진료 받을 수 있어요?', english:'Can I see a doctor?' },
        { id:'v3_hos_2', speaker:'B', japanese:'どうしましたか？', romaji:'dou shimashita ka', korean:'어디가 안 좋으세요?', english:'What is wrong?' },
        { id:'v3_hos_3', speaker:'A', japanese:'熱があります。', romaji:'netsu ga arimasu', korean:'열이 있어요.', english:'I have a fever.' },
        { id:'v3_hos_4', speaker:'A', japanese:'お腹も痛いです。', romaji:'onaka mo itai desu', korean:'배도 아파요.', english:'My stomach also hurts.' },
        { id:'v3_hos_5', speaker:'B', japanese:'保険証はありますか？', romaji:'hokenshou wa arimasu ka', korean:'보험증 있어요?', english:'Do you have insurance?' },
        { id:'v3_hos_6', speaker:'A', japanese:'旅行保険があります。', romaji:'ryokou hoken ga arimasu', korean:'여행자 보험이 있어요.', english:'I have travel insurance.' },
        { id:'v3_hos_7', speaker:'B', japanese:'パスポートをお願いします。', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요.', english:'Your passport, please.' },
        { id:'v3_hos_8', speaker:'A', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_hos_9', speaker:'B', japanese:'この紙に書いてください。', romaji:'kono kami ni kaite kudasai', korean:'이 종이에 써 주세요.', english:'Please write on this form.' },
        { id:'v3_hos_10', speaker:'A', japanese:'どのくらい待ちますか？', romaji:'dono kurai machimasu ka', korean:'얼마나 기다려요?', english:'How long will I wait?' },
        { id:'v3_hos_11', speaker:'B', japanese:'三十分くらいです。', romaji:'sanjuppun kurai desu', korean:'30분 정도예요.', english:'About thirty minutes.' },
        { id:'v3_hos_12', speaker:'A', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠어요.', english:'I understand.' },
      ],
      rentacar_pickup: [
        { id:'v3_car_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 렌트카 가게에서 — 예약 확인과 반납 시간 묻기', english:'📍 At a rental car shop — confirming reservation and return time' },
        { id:'v3_car_1', speaker:'A', japanese:'予約しています。', romaji:'yoyaku shite imasu', korean:'예약했어요.', english:'I have a reservation.' },
        { id:'v3_car_2', speaker:'B', japanese:'お名前をお願いします。', romaji:'onamae wo onegai shimasu', korean:'이름 부탁드려요.', english:'Your name, please.' },
        { id:'v3_car_3', speaker:'A', japanese:'キムです。', romaji:'kimu desu', korean:'김입니다.', english:'Kim.' },
        { id:'v3_car_4', speaker:'B', japanese:'免許証をお願いします。', romaji:'menkyoshou wo onegai shimasu', korean:'면허증 부탁드려요.', english:'Your license, please.' },
        { id:'v3_car_5', speaker:'A', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_car_6', speaker:'B', japanese:'保険は入っています。', romaji:'hoken wa haitte imasu', korean:'보험은 들어 있어요.', english:'Insurance is included.' },
        { id:'v3_car_7', speaker:'A', japanese:'返却は何時ですか？', romaji:'henkyaku wa nan ji desu ka', korean:'반납은 몇 시예요?', english:'What time is the return?' },
        { id:'v3_car_8', speaker:'B', japanese:'明日の六時です。', romaji:'ashita no roku ji desu', korean:'내일 6시예요.', english:'Tomorrow at 6.' },
        { id:'v3_car_9', speaker:'A', japanese:'ガソリンは満タンで返しますか？', romaji:'gasorin wa mantan de kaeshimasu ka', korean:'기름은 가득 채워 반납해요?', english:'Should I return it with a full tank?' },
        { id:'v3_car_10', speaker:'B', japanese:'はい、満タンでお願いします。', romaji:'hai, mantan de onegai shimasu', korean:'네, 가득 채워 부탁드려요.', english:'Yes, full tank please.' },
        { id:'v3_car_11', speaker:'A', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠어요.', english:'I understand.' },
      ],
      tourist_photo: [
        { id:'v3_photo_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 사진 한 장 부탁하기', english:'📍 At a tourist spot — asking for one photo' },
        { id:'v3_photo_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_photo_2', speaker:'A', japanese:'写真を撮ってもらえますか？', romaji:'shashin wo totte moraemasu ka', korean:'사진 찍어 주실 수 있어요?', english:'Could you take a photo?' },
        { id:'v3_photo_3', speaker:'B', japanese:'いいですよ。', romaji:'ii desu yo', korean:'좋아요.', english:'Sure.' },
        { id:'v3_photo_4', speaker:'A', japanese:'ここでお願いします。', romaji:'koko de onegai shimasu', korean:'여기서 부탁해요.', english:'Here, please.' },
        { id:'v3_photo_5', speaker:'B', japanese:'はい、撮ります。', romaji:'hai, torimasu', korean:'네, 찍을게요.', english:'Okay, I will take it.' },
        { id:'v3_photo_6', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_photo_7', speaker:'A', japanese:'もう一枚お願いします。', romaji:'mou ichi mai onegai shimasu', korean:'한 장 더 부탁해요.', english:'One more, please.' },
        { id:'v3_photo_8', speaker:'B', japanese:'縦でいいですか？', romaji:'tate de ii desu ka', korean:'세로로 괜찮아요?', english:'Is vertical okay?' },
        { id:'v3_photo_9', speaker:'A', japanese:'はい、縦でお願いします。', romaji:'hai, tate de onegai shimasu', korean:'네, 세로로 부탁해요.', english:'Yes, vertical please.' },
        { id:'v3_photo_10', speaker:'B', japanese:'撮りました。', romaji:'torimashita', korean:'찍었어요.', english:'I took it.' },
        { id:'v3_photo_11', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      reservation_check: [
        { id:'v3_res_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 가게 앞에서 — 예약 이름과 시간을 확인하기', english:'📍 At a venue — confirming reservation name and time' },
        { id:'v3_res_1', speaker:'A', japanese:'予約しています。', romaji:'yoyaku shite imasu', korean:'예약했어요.', english:'I have a reservation.' },
        { id:'v3_res_2', speaker:'B', japanese:'お名前は？', romaji:'onamae wa', korean:'이름은요?', english:'Your name?' },
        { id:'v3_res_3', speaker:'A', japanese:'キムです。', romaji:'kimu desu', korean:'김입니다.', english:'Kim.' },
        { id:'v3_res_4', speaker:'B', japanese:'七時のご予約ですね。', romaji:'shichi ji no goyoyaku desu ne', korean:'7시 예약이네요.', english:'Your reservation is at 7.' },
        { id:'v3_res_5', speaker:'A', japanese:'はい、二人です。', romaji:'hai, futari desu', korean:'네, 두 명이에요.', english:'Yes, two people.' },
        { id:'v3_res_6', speaker:'B', japanese:'少々お待ちください。', romaji:'shoushou omachi kudasai', korean:'잠시 기다려 주세요.', english:'Please wait a moment.' },
        { id:'v3_res_7', speaker:'A', japanese:'時間を変えられますか？', romaji:'jikan wo kaeraremasu ka', korean:'시간을 바꿀 수 있어요?', english:'Can I change the time?' },
        { id:'v3_res_8', speaker:'B', japanese:'明日の同じ時間なら大丈夫です。', romaji:'ashita no onaji jikan nara daijoubu desu', korean:'내일 같은 시간이면 괜찮아요.', english:'Tomorrow at the same time is okay.' },
        { id:'v3_res_9', speaker:'A', japanese:'では、明日でお願いします。', romaji:'dewa, ashita de onegai shimasu', korean:'그럼 내일로 부탁해요.', english:'Then tomorrow, please.' },
        { id:'v3_res_10', speaker:'B', japanese:'変更しました。', romaji:'henkou shimashita', korean:'변경했습니다.', english:'It has been changed.' },
        { id:'v3_res_11', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      weather_plan_change: [
        { id:'v3_weather_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 안내소에서 — 비 때문에 일정을 바꾸기', english:'📍 At an information desk — changing plans because of rain' },
        { id:'v3_weather_1', speaker:'A', japanese:'雨が降っています。', romaji:'ame ga futte imasu', korean:'비가 오고 있어요.', english:'It is raining.' },
        { id:'v3_weather_2', speaker:'A', japanese:'明日に変えられますか？', romaji:'ashita ni kaeraremasu ka', korean:'내일로 바꿀 수 있어요?', english:'Can I change it to tomorrow?' },
        { id:'v3_weather_3', speaker:'B', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, that is fine.' },
        { id:'v3_weather_4', speaker:'B', japanese:'時間は同じでいいですか？', romaji:'jikan wa onaji de ii desu ka', korean:'시간은 같아도 돼요?', english:'Is the same time okay?' },
        { id:'v3_weather_5', speaker:'A', japanese:'はい、同じ時間でお願いします。', romaji:'hai, onaji jikan de onegai shimasu', korean:'네, 같은 시간으로 부탁해요.', english:'Yes, the same time please.' },
        { id:'v3_weather_6', speaker:'A', japanese:'キャンセルもできますか？', romaji:'kyanseru mo dekimasu ka', korean:'취소도 가능해요?', english:'Can I cancel too?' },
        { id:'v3_weather_7', speaker:'B', japanese:'はい、できます。', romaji:'hai, dekimasu', korean:'네, 가능해요.', english:'Yes, you can.' },
        { id:'v3_weather_8', speaker:'A', japanese:'返金はありますか？', romaji:'henkin wa arimasu ka', korean:'환불 있어요?', english:'Is there a refund?' },
        { id:'v3_weather_9', speaker:'B', japanese:'半分だけ返金できます。', romaji:'hanbun dake henkin dekimasu', korean:'절반만 환불 가능해요.', english:'We can refund half.' },
        { id:'v3_weather_10', speaker:'A', japanese:'では、明日にします。', romaji:'dewa, ashita ni shimasu', korean:'그럼 내일로 할게요.', english:'Then I will choose tomorrow.' },
        { id:'v3_weather_11', speaker:'B', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠습니다.', english:'Understood.' },
      ],
      polite_wrapup: [
        { id:'v3_wrap_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 도움받은 뒤 — 짧고 자연스럽게 마무리하기', english:'📍 After receiving help — closing naturally' },
        { id:'v3_wrap_1', speaker:'B', japanese:'こちらで大丈夫ですか？', romaji:'kochira de daijoubu desu ka', korean:'이걸로 괜찮아요?', english:'Is this okay?' },
        { id:'v3_wrap_2', speaker:'A', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, it is fine.' },
        { id:'v3_wrap_3', speaker:'A', japanese:'助かりました。', romaji:'tasukarimashita', korean:'도움이 됐어요.', english:'That helped.' },
        { id:'v3_wrap_4', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_wrap_5', speaker:'B', japanese:'こちらこそ。', romaji:'kochira koso', korean:'저야말로요.', english:'Likewise.' },
        { id:'v3_wrap_6', speaker:'A', japanese:'また来ます。', romaji:'mata kimasu', korean:'또 올게요.', english:'I will come again.' },
        { id:'v3_wrap_7', speaker:'B', japanese:'お待ちしています。', romaji:'omachi shite imasu', korean:'기다리고 있겠습니다.', english:'We will be waiting.' },
        { id:'v3_wrap_8', speaker:'A', japanese:'楽しかったです。', romaji:'tanoshikatta desu', korean:'즐거웠어요.', english:'It was fun.' },
        { id:'v3_wrap_9', speaker:'B', japanese:'よかったです。', romaji:'yokatta desu', korean:'다행이에요.', english:'I am glad.' },
        { id:'v3_wrap_10', speaker:'A', japanese:'では、失礼します。', romaji:'dewa, shitsurei shimasu', korean:'그럼 실례하겠습니다.', english:'Then, excuse me.' },
        { id:'v3_wrap_11', speaker:'B', japanese:'お気をつけて。', romaji:'oki wo tsukete', korean:'조심히 가세요.', english:'Take care.' },
      ],

      daily_chat:           by('dd_'),
      drama_reactions: [
        { id:'v3_drama_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 드라마 장면 — 짧은 반응어를 감정으로 받기', english:'📍 Drama scene — reacting with short emotional phrases' },
        { id:'v3_drama_1', speaker:'B', japanese:'え、ほんと？', romaji:'e, honto', korean:'어, 진짜?', english:'Huh, really?' },
        { id:'v3_drama_2', speaker:'A', japanese:'ほんと。', romaji:'honto', korean:'진짜야.', english:'Really.' },
        { id:'v3_drama_3', speaker:'B', japanese:'うそ。まじで？', romaji:'uso. majide', korean:'말도 안 돼. 진짜로?', english:'No way. Seriously?' },
        { id:'v3_drama_4', speaker:'A', japanese:'まじで。', romaji:'majide', korean:'진짜로.', english:'Seriously.' },
        { id:'v3_drama_5', speaker:'B', japanese:'なんで？', romaji:'nande', korean:'왜?', english:'Why?' },
        { id:'v3_drama_6', speaker:'A', japanese:'わからない。', romaji:'wakaranai', korean:'모르겠어.', english:'I do not know.' },
        { id:'v3_drama_7', speaker:'B', japanese:'大丈夫？', romaji:'daijoubu', korean:'괜찮아?', english:'Are you okay?' },
        { id:'v3_drama_8', speaker:'A', japanese:'大丈夫。', romaji:'daijoubu', korean:'괜찮아.', english:'I am okay.' },
        { id:'v3_drama_9', speaker:'B', japanese:'よかった。', romaji:'yokatta', korean:'다행이다.', english:'I am glad.' },
        { id:'v3_drama_10', speaker:'A', japanese:'ありがとう。', romaji:'arigatou', korean:'고마워.', english:'Thanks.' },
      ],
    };

    const result = keyMap[key] || [];
    return result.length ? ensureMinimumRoleplayTurns(key, result) : null;
  }

  function ensureMinimumRoleplayTurns(key, lines) {
    const out = [...lines];
    const nonNarratorCount = () => out.filter(line => line.speaker !== 'N').length;
    const pads = getRoleplayTurnPads(key);
    let idx = 0;
    while (nonNarratorCount() < 10) {
      const [speaker, japanese, romaji, korean, english] = pads[idx % pads.length];
      out.push({
        id: `v3_pad_${key}_${idx + 1}`,
        speaker,
        japanese,
        romaji,
        korean,
        english,
      });
      idx++;
    }
    return out;
  }

  function getRoleplayTurnPads(key) {
    if (/airport|immigration|airplane|duty/.test(key)) {
      return [
        ['B', 'パスポートをお願いします。', 'pasupooto wo onegai shimasu', '여권 부탁드려요.', 'Your passport, please.'],
        ['A', 'はい、どうぞ。', 'hai, douzo', '네, 여기요.', 'Here you go.'],
        ['B', '荷物は一つですか？', 'nimotsu wa hitotsu desu ka', '짐은 하나예요?', 'Is it one bag?'],
        ['A', 'はい、一つです。', 'hai, hitotsu desu', '네, 하나예요.', 'Yes, one.'],
        ['B', 'こちらへどうぞ。', 'kochira e douzo', '이쪽으로 오세요.', 'This way, please.'],
        ['A', 'ありがとうございます。', 'arigatou gozaimasu', '고마워요.', 'Thank you.'],
      ];
    }
    if (/station|bus|taxi|transport/.test(key)) {
      return [
        ['B', '目的地はどこですか？', 'mokutekichi wa doko desu ka', '목적지는 어디예요?', 'Where is your destination?'],
        ['A', 'ここまでお願いします。', 'koko made onegai shimasu', '여기까지 부탁해요.', 'To here, please.'],
        ['B', 'この道で大丈夫です。', 'kono michi de daijoubu desu', '이 길로 가면 괜찮아요.', 'This route is fine.'],
        ['A', 'あと何分ですか？', 'ato nan pun desu ka', '앞으로 몇 분이에요?', 'How many more minutes?'],
        ['B', 'あと五分くらいです。', 'ato go fun kurai desu', '앞으로 5분 정도예요.', 'About five more minutes.'],
        ['A', 'ここで大丈夫です。', 'koko de daijoubu desu', '여기서 괜찮아요.', 'Here is fine.'],
      ];
    }
    if (/konbini|cafe|restaurant|izakaya|order/.test(key)) {
      return [
        ['B', 'ご注文はお決まりですか？', 'gochuumon wa okimari desu ka', '주문 정하셨어요?', 'Are you ready to order?'],
        ['A', 'これをお願いします。', 'kore wo onegai shimasu', '이걸로 부탁해요.', 'This, please.'],
        ['B', '飲み物はいかがですか？', 'nomimono wa ikaga desu ka', '음료는 어떠세요?', 'Would you like a drink?'],
        ['A', '水をお願いします。', 'mizu wo onegai shimasu', '물 부탁해요.', 'Water, please.'],
        ['B', '以上でよろしいですか？', 'ijou de yoroshii desu ka', '이상으로 괜찮으세요?', 'Is that all?'],
        ['A', 'はい、以上です。', 'hai, ijou desu', '네, 이상이에요.', 'Yes, that is all.'],
      ];
    }
    if (/clothes|store|payment|shop/.test(key)) {
      return [
        ['B', 'サイズはいかがですか？', 'saizu wa ikaga desu ka', '사이즈는 어떠세요?', 'How is the size?'],
        ['A', '少し大きいです。', 'sukoshi ookii desu', '조금 커요.', 'It is a little big.'],
        ['B', '小さいサイズもあります。', 'chiisai saizu mo arimasu', '작은 사이즈도 있어요.', 'We also have a smaller size.'],
        ['A', '見てもいいですか？', 'mite mo ii desu ka', '봐도 돼요?', 'May I see it?'],
        ['B', 'はい、どうぞ。', 'hai, douzo', '네, 보세요.', 'Yes, please.'],
        ['A', 'カードでお願いします。', 'kaado de onegai shimasu', '카드로 부탁해요.', 'By card, please.'],
      ];
    }
    if (/hotel|onsen|reservation/.test(key)) {
      return [
        ['B', 'お名前をお願いします。', 'onamae wo onegai shimasu', '이름 부탁드려요.', 'Your name, please.'],
        ['A', 'キムです。', 'kimu desu', '김이에요.', 'Kim.'],
        ['B', '確認します。', 'kakunin shimasu', '확인할게요.', 'I will check.'],
        ['A', 'お願いします。', 'onegai shimasu', '부탁해요.', 'Please.'],
        ['B', 'こちらで大丈夫です。', 'kochira de daijoubu desu', '이걸로 괜찮아요.', 'This is fine.'],
        ['A', 'ありがとうございます。', 'arigatou gozaimasu', '고마워요.', 'Thank you.'],
      ];
    }
    if (/health|hospital|lost/.test(key)) {
      return [
        ['B', 'いつからですか？', 'itsu kara desu ka', '언제부터예요?', 'Since when?'],
        ['A', '今日の朝からです。', 'kyou no asa kara desu', '오늘 아침부터요.', 'Since this morning.'],
        ['B', '少し待ってください。', 'sukoshi matte kudasai', '잠깐 기다려 주세요.', 'Please wait a moment.'],
        ['A', 'お願いします。', 'onegai shimasu', '부탁해요.', 'Please.'],
        ['B', 'こちらに書いてください。', 'kochira ni kaite kudasai', '여기에 써 주세요.', 'Please write here.'],
        ['A', 'わかりました。', 'wakarimashita', '알겠어요.', 'I understand.'],
      ];
    }
    return [
      ['B', 'もう一度言います。', 'mou ichido iimasu', '한 번 더 말할게요.', 'I will say it again.'],
      ['A', 'ゆっくりお願いします。', 'yukkuri onegai shimasu', '천천히 부탁해요.', 'Slowly, please.'],
      ['B', '大丈夫です。', 'daijoubu desu', '괜찮아요.', 'It is fine.'],
      ['A', 'わかりました。', 'wakarimashita', '알겠어요.', 'I understand.'],
      ['B', '気をつけてください。', 'ki wo tsukete kudasai', '조심하세요.', 'Please take care.'],
      ['A', 'ありがとうございます。', 'arigatou gozaimasu', '고마워요.', 'Thank you.'],
    ];
  }

  return {
    getAllVocabItems,
    getVocabItems,
    getDialogue,
    getVocabItemsByCategory,
    itemMatchesCategory,
    uniqueItems,
  };
})();
