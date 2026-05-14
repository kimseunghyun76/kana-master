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
      first_photo_greeting: [
        { id:'v3_fg_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 지나가는 사람에게 사진 부탁하기', english:'📍 At a tourist spot — asking someone to take a photo' },
        { id:'v3_fg_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_fg_2', speaker:'A', japanese:'写真をお願いします。', romaji:'shashin wo onegai shimasu', korean:'사진 부탁해요.', english:'A photo, please.' },
        { id:'v3_fg_3', speaker:'B', japanese:'いいですよ。', romaji:'ii desu yo', korean:'좋아요.', english:'Sure.' },
        { id:'v3_fg_4', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'자, 여기요.', english:'Here you go.' },
        { id:'v3_fg_5', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      first_origin_chat: [
        { id:'v3_ans_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 어디서 왔는지 짧게 답하기', english:'📍 At a cafe — answering where you are from' },
        { id:'v3_ans_1', speaker:'B', japanese:'どこから来ましたか？', romaji:'doko kara kimashita ka', korean:'어디서 왔어요?', english:'Where are you from?' },
        { id:'v3_ans_2', speaker:'A', japanese:'韓国から来ました。', romaji:'kankoku kara kimashita', korean:'한국에서 왔어요.', english:'I came from Korea.' },
        { id:'v3_ans_3', speaker:'B', japanese:'旅行ですか？', romaji:'ryokou desu ka', korean:'여행이에요?', english:'Are you traveling?' },
        { id:'v3_ans_4', speaker:'A', japanese:'はい、旅行です。', romaji:'hai, ryokou desu', korean:'네, 여행이에요.', english:'Yes, I am traveling.' },
        { id:'v3_ans_5', speaker:'B', japanese:'楽しんでください。', romaji:'tanoshinde kudasai', korean:'즐겁게 보내세요.', english:'Enjoy yourself.' },
        { id:'v3_ans_6', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      ask_again_help: [
        { id:'v3_q_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 가게에서 — 못 알아들었을 때 다시 부탁하기', english:'📍 At a shop — asking someone to repeat slowly' },
        { id:'v3_q_1', speaker:'B', japanese:'日本語、わかりますか？', romaji:'nihongo, wakarimasu ka', korean:'일본어 알아요?', english:'Do you understand Japanese?' },
        { id:'v3_q_2', speaker:'A', japanese:'すみません、少しだけです。', romaji:'sumimasen, sukoshi dake desu', korean:'미안해요, 조금만요.', english:'Sorry, only a little.' },
        { id:'v3_q_3', speaker:'A', japanese:'もう一度お願いします。', romaji:'mou ichido onegai shimasu', korean:'한 번 더 부탁해요.', english:'One more time, please.' },
        { id:'v3_q_4', speaker:'B', japanese:'はい、ゆっくり話します。', romaji:'hai, yukkuri hanashimasu', korean:'네, 천천히 말할게요.', english:'Sure, I will speak slowly.' },
        { id:'v3_q_5', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      immigration_short: [
        { id:'v3_im_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 입국 심사에서 — 목적과 기간 짧게 답하기', english:'📍 Immigration — answering purpose and stay' },
        { id:'v3_im_1', speaker:'B', japanese:'目的は何ですか？', romaji:'mokuteki wa nan desu ka', korean:'목적은 뭐예요?', english:'What is your purpose?' },
        { id:'v3_im_2', speaker:'A', japanese:'旅行です。', romaji:'ryokou desu', korean:'여행이에요.', english:'Travel.' },
        { id:'v3_im_3', speaker:'B', japanese:'何日ですか？', romaji:'nan nichi desu ka', korean:'며칠이에요?', english:'How many days?' },
        { id:'v3_im_4', speaker:'A', japanese:'三日です。', romaji:'mikka desu', korean:'3일이에요.', english:'Three days.' },
        { id:'v3_im_5', speaker:'B', japanese:'ホテルはどこですか？', romaji:'hoteru wa doko desu ka', korean:'호텔은 어디예요?', english:'Where is your hotel?' },
        { id:'v3_im_6', speaker:'A', japanese:'新宿のホテルです。', romaji:'shinjuku no hoteru desu', korean:'신주쿠 호텔이에요.', english:'A hotel in Shinjuku.' },
      ],
      airplane_request: [
        { id:'v3_plane_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 비행기 안에서 — 필요한 물건 부탁하기', english:'📍 On the plane — asking for what you need' },
        { id:'v3_plane_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_plane_2', speaker:'A', japanese:'水をください。', romaji:'mizu wo kudasai', korean:'물 주세요.', english:'Water, please.' },
        { id:'v3_plane_3', speaker:'B', japanese:'はい、どうぞ。', romaji:'hai, douzo', korean:'네, 여기요.', english:'Here you go.' },
        { id:'v3_plane_4', speaker:'A', japanese:'毛布はありますか？', romaji:'moufu wa arimasu ka', korean:'담요 있어요?', english:'Do you have a blanket?' },
        { id:'v3_plane_5', speaker:'B', japanese:'少々お待ちください。', romaji:'shoushou omachi kudasai', korean:'잠시 기다려 주세요.', english:'Please wait a moment.' },
      ],

      station_direction:    pick('tx_n1','tx_1','tx_2','tx_3','tx_4'),
      bus_ride: [
        { id:'v3_bus_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 버스 정류장에서 — 이 버스가 목적지에 가는지 확인하기', english:'📍 At a bus stop — checking the destination' },
        { id:'v3_bus_1', speaker:'A', japanese:'すみません、このバスは駅に行きますか？', romaji:'sumimasen, kono basu wa eki ni ikimasu ka', korean:'저기요, 이 버스는 역에 가요?', english:'Excuse me, does this bus go to the station?' },
        { id:'v3_bus_2', speaker:'B', japanese:'はい、行きます。', romaji:'hai, ikimasu', korean:'네, 가요.', english:'Yes, it does.' },
        { id:'v3_bus_3', speaker:'A', japanese:'いくらですか？', romaji:'ikura desu ka', korean:'얼마예요?', english:'How much is it?' },
        { id:'v3_bus_4', speaker:'B', japanese:'二百円です。', romaji:'nihyaku en desu', korean:'200엔이에요.', english:'It is 200 yen.' },
        { id:'v3_bus_5', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      taxi_ride: [
        { id:'v3_taxi_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 택시에서 — 호텔까지 가고 카드 결제 묻기', english:'📍 In a taxi — going to the hotel and asking about card payment' },
        { id:'v3_taxi_1', speaker:'A', japanese:'このホテルまでお願いします。', romaji:'kono hoteru made onegai shimasu', korean:'이 호텔까지 부탁해요.', english:'To this hotel, please.' },
        { id:'v3_taxi_2', speaker:'B', japanese:'はい、わかりました。', romaji:'hai, wakarimashita', korean:'네, 알겠습니다.', english:'Sure.' },
        { id:'v3_taxi_3', speaker:'A', japanese:'何分かかりますか？', romaji:'nan pun kakarimasu ka', korean:'몇 분 걸려요?', english:'How many minutes does it take?' },
        { id:'v3_taxi_4', speaker:'B', japanese:'十五分くらいです。', romaji:'juugo fun kurai desu', korean:'15분 정도예요.', english:'About 15 minutes.' },
        { id:'v3_taxi_5', speaker:'A', japanese:'カードは使えますか？', romaji:'kaado wa tsukaemasu ka', korean:'카드 쓸 수 있어요?', english:'Can I use a card?' },
        { id:'v3_taxi_6', speaker:'B', japanese:'はい、使えます。', romaji:'hai, tsukaemasu', korean:'네, 쓸 수 있어요.', english:'Yes, you can.' },
      ],
      konbini_bento:        pick('kd_n1','kd_1','kd_2','kd_3','kd_6','kd_7','kd_8','kd_9','kd_10'),
      cafe_breakfast: [
        { id:'v3_cafe_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 카페에서 — 아침 메뉴와 음료 주문하기', english:'📍 At a cafe — ordering breakfast and a drink' },
        { id:'v3_cafe_1', speaker:'A', japanese:'アイスコーヒーをください。', romaji:'aisu koohii wo kudasai', korean:'아이스커피 주세요.', english:'Iced coffee, please.' },
        { id:'v3_cafe_2', speaker:'B', japanese:'店内ですか？', romaji:'tennai desu ka', korean:'매장에서 드세요?', english:'For here?' },
        { id:'v3_cafe_3', speaker:'A', japanese:'はい、店内です。', romaji:'hai, tennai desu', korean:'네, 매장이요.', english:'Yes, for here.' },
        { id:'v3_cafe_4', speaker:'A', japanese:'トーストもお願いします。', romaji:'toosuto mo onegai shimasu', korean:'토스트도 부탁해요.', english:'Toast too, please.' },
        { id:'v3_cafe_5', speaker:'B', japanese:'かしこまりました。', romaji:'kashikomarimashita', korean:'알겠습니다.', english:'Certainly.' },
      ],
      restaurant_solo:      pick('rd_n1','rd_1','rd_2','rd_3','rd_6','rd_7','rd_8','rd_9','rd_10','rd_11','rd_12','rd_13'),
      izakaya_order: [
        { id:'v3_iz_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 이자카야에서 — 첫 잔과 추천 메뉴 주문하기', english:'📍 At an izakaya — ordering the first drink and a recommendation' },
        { id:'v3_iz_1', speaker:'B', japanese:'何名様ですか？', romaji:'nan mei sama desu ka', korean:'몇 분이세요?', english:'How many people?' },
        { id:'v3_iz_2', speaker:'A', japanese:'二人です。', romaji:'futari desu', korean:'두 명이에요.', english:'Two people.' },
        { id:'v3_iz_3', speaker:'A', japanese:'ビールを二つください。', romaji:'biiru wo futatsu kudasai', korean:'맥주 두 잔 주세요.', english:'Two beers, please.' },
        { id:'v3_iz_4', speaker:'A', japanese:'おすすめは何ですか？', romaji:'osusume wa nan desu ka', korean:'추천은 뭐예요?', english:'What do you recommend?' },
        { id:'v3_iz_5', speaker:'B', japanese:'焼き鳥がおすすめです。', romaji:'yakitori ga osusume desu', korean:'야키토리가 추천이에요.', english:'Yakitori is recommended.' },
        { id:'v3_iz_6', speaker:'A', japanese:'それをお願いします。', romaji:'sore wo onegai shimasu', korean:'그걸로 부탁해요.', english:'That, please.' },
      ],
      cafe_order:           by('cf_'),
      clothes_size:         pick('sd_n1','sd_1','sd_2','sd_3','sd_4','sd_5','sd_6','sd_7','sd_10','sd_11'),
      store_payment: [
        { id:'v3_pay_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 상점에서 — 카드 결제와 봉투 확인하기', english:'📍 At a shop — card payment and bag check' },
        { id:'v3_pay_1', speaker:'A', japanese:'これにします。', romaji:'kore ni shimasu', korean:'이걸로 할게요.', english:'I will take this.' },
        { id:'v3_pay_2', speaker:'B', japanese:'袋は要りますか？', romaji:'fukuro wa irimasu ka', korean:'봉투 필요하세요?', english:'Do you need a bag?' },
        { id:'v3_pay_3', speaker:'A', japanese:'大丈夫です。', romaji:'daijoubu desu', korean:'괜찮아요.', english:'No, thank you.' },
        { id:'v3_pay_4', speaker:'A', japanese:'カードでお願いします。', romaji:'kaado de onegai shimasu', korean:'카드로 부탁해요.', english:'By card, please.' },
        { id:'v3_pay_5', speaker:'B', japanese:'はい、こちらにお願いします。', romaji:'hai, kochira ni onegai shimasu', korean:'네, 여기에 부탁드려요.', english:'Here, please.' },
      ],
      duty_free_shop: [
        { id:'v3_df_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 면세점에서 — 선물 추천과 기내 반입 묻기', english:'📍 At duty-free — asking for a gift recommendation and carry-on rules' },
        { id:'v3_df_1', speaker:'A', japanese:'お土産を探しています。', romaji:'omiyage wo sagashite imasu', korean:'선물을 찾고 있어요.', english:'I am looking for a souvenir.' },
        { id:'v3_df_2', speaker:'B', japanese:'こちらが人気です。', romaji:'kochira ga ninki desu', korean:'이쪽이 인기예요.', english:'This one is popular.' },
        { id:'v3_df_3', speaker:'A', japanese:'機内に持ち込めますか？', romaji:'kinai ni mochikomemasu ka', korean:'기내에 가지고 탈 수 있어요?', english:'Can I bring it on the plane?' },
        { id:'v3_df_4', speaker:'B', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, it is fine.' },
        { id:'v3_df_5', speaker:'A', japanese:'これをください。', romaji:'kore wo kudasai', korean:'이거 주세요.', english:'This, please.' },
      ],
      hotel_checkin:        pick('hd_n1','hd_1','hd_2','hd_3','hd_4','hd_5','hd_6','hd_9','hd_11','hd_12'),
      hotel_request: [
        { id:'v3_hr_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 호텔 프런트에서 — 수건과 와이파이 부탁하기', english:'📍 At the hotel front desk — asking for towels and Wi-Fi' },
        { id:'v3_hr_1', speaker:'A', japanese:'すみません、タオルをください。', romaji:'sumimasen, taoru wo kudasai', korean:'저기요, 수건 주세요.', english:'Excuse me, towels please.' },
        { id:'v3_hr_2', speaker:'B', japanese:'はい、お部屋番号は？', romaji:'hai, oheya bangou wa', korean:'네, 방 번호는요?', english:'Sure, your room number?' },
        { id:'v3_hr_3', speaker:'A', japanese:'五〇二です。', romaji:'go maru ni desu', korean:'502호예요.', english:'It is 502.' },
        { id:'v3_hr_4', speaker:'A', japanese:'Wi-Fiのパスワードは何ですか？', romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호는 뭐예요?', english:'What is the Wi-Fi password?' },
        { id:'v3_hr_5', speaker:'B', japanese:'こちらです。', romaji:'kochira desu', korean:'여기예요.', english:'Here it is.' },
      ],
      onsen_rules: [
        { id:'v3_on_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 온천에서 — 이용 시간과 수건을 묻기', english:'📍 At an onsen — asking about hours and towels' },
        { id:'v3_on_1', speaker:'A', japanese:'温泉は何時までですか？', romaji:'onsen wa nan ji made desu ka', korean:'온천은 몇 시까지예요?', english:'Until what time is the onsen open?' },
        { id:'v3_on_2', speaker:'B', japanese:'夜十一時までです。', romaji:'yoru juuichi ji made desu', korean:'밤 11시까지예요.', english:'Until 11 p.m.' },
        { id:'v3_on_3', speaker:'A', japanese:'タオルはありますか？', romaji:'taoru wa arimasu ka', korean:'수건 있어요?', english:'Are there towels?' },
        { id:'v3_on_4', speaker:'B', japanese:'お部屋のタオルをお使いください。', romaji:'oheya no taoru wo otsukai kudasai', korean:'객실 수건을 사용해 주세요.', english:'Please use the towels in your room.' },
        { id:'v3_on_5', speaker:'A', japanese:'わかりました。', romaji:'wakarimashita', korean:'알겠어요.', english:'I understand.' },
      ],
      airport_checkin:      pick('ap_n1','ap_1','ap_2','ap_3','ap_4','ap_5','ap_6','ap_7','ap_8','ap_9'),
      health_help: [
        { id:'v3_hp_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 약국에서 — 배가 아프다고 말하고 약 받기', english:'📍 At a pharmacy — saying your stomach hurts and getting medicine' },
        { id:'v3_hp_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_hp_2', speaker:'A', japanese:'お腹が痛いです。', romaji:'onaka ga itai desu', korean:'배가 아파요.', english:'My stomach hurts.' },
        { id:'v3_hp_3', speaker:'B', japanese:'いつからですか？', romaji:'itsu kara desu ka', korean:'언제부터예요?', english:'Since when?' },
        { id:'v3_hp_4', speaker:'A', japanese:'今日の朝からです。', romaji:'kyou no asa kara desu', korean:'오늘 아침부터요.', english:'Since this morning.' },
        { id:'v3_hp_5', speaker:'B', japanese:'この薬を飲んでください。', romaji:'kono kusuri wo nonde kudasai', korean:'이 약을 드세요.', english:'Please take this medicine.' },
        { id:'v3_hp_6', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      lost_item_help: [
        { id:'v3_lost_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 역 안내소에서 — 가방을 잃어버렸다고 말하기', english:'📍 At a station desk — saying you lost your bag' },
        { id:'v3_lost_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_lost_2', speaker:'A', japanese:'かばんをなくしました。', romaji:'kaban wo nakushimashita', korean:'가방을 잃어버렸어요.', english:'I lost my bag.' },
        { id:'v3_lost_3', speaker:'B', japanese:'どこでなくしましたか？', romaji:'doko de nakushimashita ka', korean:'어디에서 잃어버렸어요?', english:'Where did you lose it?' },
        { id:'v3_lost_4', speaker:'A', japanese:'電車の中だと思います。', romaji:'densha no naka da to omoimasu', korean:'전철 안인 것 같아요.', english:'I think it was on the train.' },
        { id:'v3_lost_5', speaker:'B', japanese:'少し待ってください。', romaji:'sukoshi matte kudasai', korean:'잠깐 기다려 주세요.', english:'Please wait a moment.' },
        { id:'v3_lost_6', speaker:'A', japanese:'お願いします。', romaji:'onegai shimasu', korean:'부탁해요.', english:'Please.' },
      ],
      hospital_reception: [
        { id:'v3_hos_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 병원 접수에서 — 증상과 보험 여부 말하기', english:'📍 At hospital reception — explaining symptoms and insurance' },
        { id:'v3_hos_1', speaker:'A', japanese:'すみません、診てもらえますか？', romaji:'sumimasen, mite moraemasu ka', korean:'저기요, 진료 받을 수 있어요?', english:'Can I see a doctor?' },
        { id:'v3_hos_2', speaker:'B', japanese:'どうしましたか？', romaji:'dou shimashita ka', korean:'어디가 안 좋으세요?', english:'What is wrong?' },
        { id:'v3_hos_3', speaker:'A', japanese:'熱があります。', romaji:'netsu ga arimasu', korean:'열이 있어요.', english:'I have a fever.' },
        { id:'v3_hos_4', speaker:'A', japanese:'お腹も痛いです。', romaji:'onaka mo itai desu', korean:'배도 아파요.', english:'My stomach also hurts.' },
        { id:'v3_hos_5', speaker:'B', japanese:'保険証はありますか？', romaji:'hokenshou wa arimasu ka', korean:'보험증 있어요?', english:'Do you have insurance?' },
        { id:'v3_hos_6', speaker:'A', japanese:'旅行保険があります。', romaji:'ryokou hoken ga arimasu', korean:'여행자 보험이 있어요.', english:'I have travel insurance.' },
      ],
      rentacar_pickup: [
        { id:'v3_car_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 렌트카 가게에서 — 예약 확인과 반납 시간 묻기', english:'📍 At a rental car shop — confirming reservation and return time' },
        { id:'v3_car_1', speaker:'A', japanese:'予約しています。', romaji:'yoyaku shite imasu', korean:'예약했어요.', english:'I have a reservation.' },
        { id:'v3_car_2', speaker:'B', japanese:'お名前をお願いします。', romaji:'onamae wo onegai shimasu', korean:'이름 부탁드려요.', english:'Your name, please.' },
        { id:'v3_car_3', speaker:'A', japanese:'キムです。', romaji:'kimu desu', korean:'김입니다.', english:'Kim.' },
        { id:'v3_car_4', speaker:'B', japanese:'免許証をお願いします。', romaji:'menkyoshou wo onegai shimasu', korean:'면허증 부탁드려요.', english:'Your license, please.' },
        { id:'v3_car_5', speaker:'A', japanese:'返却は何時ですか？', romaji:'henkyaku wa nan ji desu ka', korean:'반납은 몇 시예요?', english:'What time is the return?' },
        { id:'v3_car_6', speaker:'B', japanese:'明日の六時です。', romaji:'ashita no roku ji desu', korean:'내일 6시예요.', english:'Tomorrow at 6.' },
      ],
      tourist_photo: [
        { id:'v3_photo_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 관광지에서 — 사진 한 장 부탁하기', english:'📍 At a tourist spot — asking for one photo' },
        { id:'v3_photo_1', speaker:'A', japanese:'すみません。', romaji:'sumimasen', korean:'저기요.', english:'Excuse me.' },
        { id:'v3_photo_2', speaker:'A', japanese:'写真を撮ってもらえますか？', romaji:'shashin wo totte moraemasu ka', korean:'사진 찍어 주실 수 있어요?', english:'Could you take a photo?' },
        { id:'v3_photo_3', speaker:'B', japanese:'いいですよ。', romaji:'ii desu yo', korean:'좋아요.', english:'Sure.' },
        { id:'v3_photo_4', speaker:'A', japanese:'ここでお願いします。', romaji:'koko de onegai shimasu', korean:'여기서 부탁해요.', english:'Here, please.' },
        { id:'v3_photo_5', speaker:'B', japanese:'はい、撮ります。', romaji:'hai, torimasu', korean:'네, 찍을게요.', english:'Okay, I will take it.' },
        { id:'v3_photo_6', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
      ],
      reservation_check: [
        { id:'v3_res_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 가게 앞에서 — 예약 이름과 시간을 확인하기', english:'📍 At a venue — confirming reservation name and time' },
        { id:'v3_res_1', speaker:'A', japanese:'予約しています。', romaji:'yoyaku shite imasu', korean:'예약했어요.', english:'I have a reservation.' },
        { id:'v3_res_2', speaker:'B', japanese:'お名前は？', romaji:'onamae wa', korean:'이름은요?', english:'Your name?' },
        { id:'v3_res_3', speaker:'A', japanese:'キムです。', romaji:'kimu desu', korean:'김입니다.', english:'Kim.' },
        { id:'v3_res_4', speaker:'B', japanese:'七時のご予約ですね。', romaji:'shichi ji no goyoyaku desu ne', korean:'7시 예약이네요.', english:'Your reservation is at 7.' },
        { id:'v3_res_5', speaker:'A', japanese:'はい、お願いします。', romaji:'hai, onegai shimasu', korean:'네, 부탁해요.', english:'Yes, please.' },
      ],
      weather_plan_change: [
        { id:'v3_weather_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 안내소에서 — 비 때문에 일정을 바꾸기', english:'📍 At an information desk — changing plans because of rain' },
        { id:'v3_weather_1', speaker:'A', japanese:'雨が降っています。', romaji:'ame ga futte imasu', korean:'비가 오고 있어요.', english:'It is raining.' },
        { id:'v3_weather_2', speaker:'A', japanese:'明日に変えられますか？', romaji:'ashita ni kaeraremasu ka', korean:'내일로 바꿀 수 있어요?', english:'Can I change it to tomorrow?' },
        { id:'v3_weather_3', speaker:'B', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, that is fine.' },
        { id:'v3_weather_4', speaker:'B', japanese:'時間は同じでいいですか？', romaji:'jikan wa onaji de ii desu ka', korean:'시간은 같아도 돼요?', english:'Is the same time okay?' },
        { id:'v3_weather_5', speaker:'A', japanese:'はい、同じ時間でお願いします。', romaji:'hai, onaji jikan de onegai shimasu', korean:'네, 같은 시간으로 부탁해요.', english:'Yes, the same time please.' },
      ],
      polite_wrapup: [
        { id:'v3_wrap_n1', speaker:'N', japanese:'', romaji:'', korean:'📍 도움받은 뒤 — 짧고 자연스럽게 마무리하기', english:'📍 After receiving help — closing naturally' },
        { id:'v3_wrap_1', speaker:'B', japanese:'こちらで大丈夫ですか？', romaji:'kochira de daijoubu desu ka', korean:'이걸로 괜찮아요?', english:'Is this okay?' },
        { id:'v3_wrap_2', speaker:'A', japanese:'はい、大丈夫です。', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요.', english:'Yes, it is fine.' },
        { id:'v3_wrap_3', speaker:'A', japanese:'助かりました。', romaji:'tasukarimashita', korean:'도움이 됐어요.', english:'That helped.' },
        { id:'v3_wrap_4', speaker:'A', japanese:'ありがとうございます。', romaji:'arigatou gozaimasu', korean:'고마워요.', english:'Thank you.' },
        { id:'v3_wrap_5', speaker:'B', japanese:'お気をつけて。', romaji:'oki wo tsukete', korean:'조심히 가세요.', english:'Take care.' },
      ],

      daily_chat:           by('dd_'),
      drama_reactions:      by('drama_'),
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
