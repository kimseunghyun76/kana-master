/* ============================================================
   CONTENT INDEX — vocabulary/category/dialogue lookup layer
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
      return uniqueItems(items).slice(0, step.limit || 999);
    }

    if (step?.categoryIds) {
      const items = step.categoryIds.flatMap(cid => getCategoryItems(cid, byId, all));
      return uniqueItems(items).slice(0, step.limit || 999);
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

  function itemMatchesCategory(item, categoryId) {
    const patterns = CATEGORY_PATTERNS[categoryId] || [];
    return patterns.some(p => item.id && item.id.startsWith(p));
  }

  function getDialogue(key) {
    if (!key) return null;
    const dialogue = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const itDialogue = typeof VOCAB_ITEMS_IT_SIM !== 'undefined' ? VOCAB_ITEMS_IT_SIM : [];
    const by = (...pres) => dialogue.filter(x => pres.some(p => x.id?.startsWith(p)));

    const keyMap = {
      airport:       by('ap_'),
      schedule:      by('ph_'),
      transport:     [...by('sub_'), ...by('tx_'), ...by('bus_')],
      facility_help: [...by('tlt_'), ...by('elv_')],
      food:          [...by('rd_'), ...by('iz_'), ...by('cf_')],
      hotel:         [...by('hd_'), ...by('cin_'), ...by('cout_'), ...by('rs_')],
      shopping:      [...by('sd_'), ...by('sel_'), ...by('dnq_'), ...by('dep_')],

      first_meeting: by('dm_'),
      daily_chat:    by('dd_'),
      sightseeing:   [...by('ons_'), ...by('bsb_'), ...by('elv_')],
      couple_travel: [...by('hp_'), ...by('pk_'), ...by('dk_'), ...by('air_')],

      it_standup:    itDialogue.filter(x => x.id?.startsWith('its_')  || x.id?.startsWith('its2_')),
      it_codereview: itDialogue.filter(x => x.id?.startsWith('itcr_') || x.id?.startsWith('itcr2_')),
      it_1on1:       itDialogue.filter(x => x.id?.startsWith('it1_')),
      it_kickoff:    itDialogue.filter(x => x.id?.startsWith('itk_')),
      it_spec:       itDialogue.filter(x => x.id?.startsWith('itsp_')),
      it_intro:      itDialogue.filter(x => x.id?.startsWith('iti_')),
    };

    const result = keyMap[key] || [];
    return result.length ? result : null;
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
