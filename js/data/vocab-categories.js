// ============================================================
//  커리큘럼 설계 (みんなの日本語 + JLPT N5 + 여행 실용 기준)
//  W1~W8  : 단어 학습 — 각 레벨 3개 카테고리
//  S1~S6  : 문장 학습 — 6단계 (인사→자기소개→쇼핑/식당→교통→여행→긴급)
//  Sim 3그룹: 만남 · 방문 · 여행
//    dialogue:true 카테고리 = 화자 A/B 대화 롤플레이
// ============================================================
var VOCAB_CATEGORIES = [

  // ══════════════════════════════════════════════════════════
  //  단어 학습 (Word) — W1 ~ W8  (레벨당 3카테고리)
  // ══════════════════════════════════════════════════════════

  // ── W1 ①②③ ───────────────────────────────────────────────
  {
    id:'basic_words', phase:1, type:'word', wlevel:1,
    name:'인사 단어', icon:'👋',
    title:'W1 인사·응답 단어 (挨拶)',
    subtitle:'おはよう·こんにちは·はい·いいえ',
    desc:'첫날부터 쓰는 인사 단어! 아침·낮·저녁·작별 + 네·아니요',
    items:['w1_ohayo','w1_konnichiwa','w1_konbanwa','w1_oyasumi','w1_sayonara','gr_hai','gr_iie']
  },
  {
    id:'essential_phrases', phase:1, type:'word', wlevel:1,
    name:'필수 표현어', icon:'🗣️',
    title:'W1 필수 고정 표현 (必須表現)',
    subtitle:'ありがとう·すみません·おねがい',
    desc:'외워두면 일본 어디서나 통하는 만능 표현 6가지',
    items:['gr_arigatou','gr_sumimasen','gr_onegai','gr_wakaran','gr_yoroshiku','gr_shitsurei']
  },
  {
    id:'w1_reactions', phase:1, type:'word', wlevel:1,
    name:'맞장구·반응어', icon:'💬',
    title:'W1 맞장구·반응 표현 (相槌)',
    subtitle:'そうですね·なるほど·わかりました',
    desc:'대화를 자연스럽게! 공감·납득·확인에 쓰는 반응 표현 5가지',
    items:['w1_sodesu','w1_naruhodo','w1_hontou','w1_wakarimashita','w1_daijoubu']
  },

  // ── W2 ①②③ ───────────────────────────────────────────────
  {
    id:'numbers_basic', phase:2, type:'word', wlevel:2,
    name:'숫자 기본', icon:'🔢',
    title:'W2 숫자 기본 (数字)',
    subtitle:'1~10, 百·千·万',
    desc:'가격·수량·시간의 기초! 일본어 숫자 완전 정복',
    items:['num_1','num_2','num_3','num_4','num_5','num_6','num_7','num_8','num_9','num_10','num_100','num_1000','num_10000']
  },
  {
    id:'numbers_applied', phase:2, type:'word', wlevel:2,
    name:'숫자 응용', icon:'💴',
    title:'W2 숫자 응용 (計算·単位)',
    subtitle:'11~99, 엔화, 세는 단위',
    desc:'실제 쇼핑·결제에 필요한 숫자 표현과 세는 단위',
    items:['nap_yen','nap_num11','nap_num20','nap_num21','nap_num50','nap_num99','nap_500','nap_mai','nap_hon','nap_ko']
  },
  {
    id:'num_dates', phase:2, type:'word', wlevel:2,
    name:'날짜 숫자·월일', icon:'📆',
    title:'W2 날짜 숫자·월일 (月日)',
    subtitle:'一月·五月·一日·十日·二十日',
    desc:'달(月)·날짜(日) 읽기 — 특수 읽기를 알면 달력이 보인다!',
    items:['dn_ichigatsu','dn_gogatsu','dn_juunigatsu','dn_tsuitachi','dn_tooka','dn_hatsuuka']
  },

  // ── W3 ①②③ ───────────────────────────────────────────────
  {
    id:'date_basic', phase:3, type:'word', wlevel:3,
    name:'날짜·기간', icon:'📅',
    title:'W3 날짜·기간 표현 (日付)',
    subtitle:'今日·明日·昨日·今·午前·午後',
    desc:'오늘, 내일, 어제 — 날짜와 때를 나타내는 기본 단어',
    items:['dt_today','dt_tmrw','dt_yest','dt_now','dt_am','dt_pm']
  },
  {
    id:'time_clock', phase:3, type:'word', wlevel:3,
    name:'시각 표현', icon:'🕐',
    title:'W3 시각 표현 (時刻)',
    subtitle:'〜時·〜分·半·午前·午後',
    desc:'몇 시? 몇 분? — 시각을 읽고 말하는 핵심 표현',
    items:['dt_ji','dt_fun','dt_han','dt_nan','dt_am','dt_pm']
  },
  {
    id:'days_of_week', phase:3, type:'word', wlevel:3,
    name:'요일·영업', icon:'🗓️',
    title:'W3 요일·영업 안내 (曜日)',
    subtitle:'月~日曜日·営業中',
    desc:'요일 7일 + 영업 중 표지판 — 일정 확인의 완성',
    items:['dt_mon','dt_tue','dt_wed','dt_thu','dt_fri','dt_sat','dt_sun','dt_open']
  },

  // ── W4 ①②③ ───────────────────────────────────────────────
  {
    id:'pronouns_personal', phase:4, type:'word', wlevel:4,
    name:'인칭 대명사', icon:'👤',
    title:'W4 인칭 대명사 (人称代名詞)',
    subtitle:'私·僕·あなた·彼·彼女',
    desc:'나, 너, 그, 그녀 — 사람을 가리키는 대명사 5가지',
    items:['prn_1','prn_2','prn_3','prn_4','prn_5']
  },
  {
    id:'pronouns_thing', phase:4, type:'word', wlevel:4,
    name:'지시어 (사물)', icon:'📦',
    title:'W4 사물 지시어 (指示語)',
    subtitle:'これ·それ·あれ·この·その·あの',
    desc:'이것·그것·저것 + 이 〜, 그 〜, 저 〜 — 가리키기의 기본',
    items:['prn_6','prn_7','prn_8','prn_12','prn_13','prn_14']
  },
  {
    id:'pronouns_place', phase:4, type:'word', wlevel:4,
    name:'지시어 (장소)', icon:'📍',
    title:'W4 장소 지시어 (場所指示語)',
    subtitle:'ここ·そこ·あそこ·こちら',
    desc:'여기·거기·저기 — 장소를 손가락으로 가리키며 말하는 방법',
    items:['prn_9','prn_10','prn_11','prn_15','prn_16','prn_17']
  },

  // ── W5 ①②③ ───────────────────────────────────────────────
  {
    id:'verbs_daily', phase:5, type:'word', wlevel:5,
    name:'기본 동사 I', icon:'🏃',
    title:'W5 기본 동사 I (動詞)',
    subtitle:'食べる·飲む·行く·見る',
    desc:'먹고 마시고 가고 보고 — 일상의 모든 행동',
    items:['vb1_1','vb1_2','vb1_3','vb1_4','vb1_5','vb1_6','vb1_7','vb1_8','vb1_9','vb1_10','vb1_11','vb1_12']
  },
  {
    id:'verbs_activity', phase:5, type:'word', wlevel:5,
    name:'기본 동사 II', icon:'✍️',
    title:'W5 기본 동사 II (動詞)',
    subtitle:'読む·書く·買う·歩く',
    desc:'읽고 쓰고 사고 걷고 — 활동 동사 완성',
    items:['vb2_1','vb2_2','vb2_3','vb2_4','vb2_5','vb2_6','vb2_7','vb2_8','vb2_9','vb2_10']
  },
  {
    id:'verbs_ability', phase:5, type:'word', wlevel:5,
    name:'능력·가능 동사', icon:'⚡',
    title:'W5 능력·가능 동사 (可能·知覚)',
    subtitle:'できる·わかる·見える·聞こえる',
    desc:'"할 수 있다" "보인다" "들린다" — 능력과 지각을 나타내는 핵심 동사',
    items:['vb3_1','vb3_2','vb3_3','vb3_4','vb3_5','vb3_6']
  },

  // ── W6 ①②③ ───────────────────────────────────────────────
  {
    id:'adj_physical', phase:6, type:'word', wlevel:6,
    name:'형용사 I 상태·감각', icon:'🌡️',
    title:'W6 형용사 I — 상태·감각 (形容詞)',
    subtitle:'暑い·寒い·高い·辛い',
    desc:'덥다 춥다 비싸다 맵다 — 여행에서 매일 쓰는 감각 형용사',
    items:['adj1_1','adj1_2','adj1_3','adj1_4','adj1_5','adj1_6','adj1_7','adj1_8','adj1_9','adj1_10','adj1_11','adj1_12']
  },
  {
    id:'adj_emotion', phase:6, type:'word', wlevel:6,
    name:'형용사 II 감정', icon:'😊',
    title:'W6 형용사 II — 감정·상태 (感情)',
    subtitle:'嬉しい·疲れた·お腹が空いた',
    desc:'기쁘다 피곤하다 배고프다 — 여행 중 느끼는 모든 감정',
    items:['adj2_1','adj2_2','adj2_3','adj2_4','adj2_5','adj2_6','adj2_7','adj2_8','adj2_9','adj2_10']
  },
  {
    id:'adjectives_n5', phase:6, type:'word', wlevel:6,
    name:'N5 핵심 형용사', icon:'💡',
    title:'W6 N5 핵심 형용사 (形容詞)',
    subtitle:'おいしい·かわいい·いい·だめ',
    desc:'감탄·평가 표현 — 쇼핑·식사에서 쓰는 핵심 형용사',
    items:['adj_oishi','adj1_9','adj1_10','adj_takai','adj_yasui','adj1_7','adj1_8','adj_kawaii','adj_ii','adj_dame']
  },

  // ── W7 ①②③ ───────────────────────────────────────────────
  {
    id:'place_transport', phase:7, type:'word', wlevel:7,
    name:'장소·교통 명사', icon:'🚃',
    title:'W7 장소·교통 명사 (場所·交通·空港)',
    subtitle:'駅·空港·搭乗口·両替·出発',
    desc:'이동·공항·역·방향까지 여행 교통 완전 정복',
    items:['tr_eki','tr_bus','tr_taxi','tr_densha','tr_shink','tr_airport','tr_hotel','tr_ryokan','tr_konbini','tr_toilet','tr_exit','tr_enter','tr_right','tr_left','tr_straight','tr_gate','tr_zeikan','tr_nyukoku','tr_tenimotsu','tr_ryougae','tr_shuppatsu','tr_touchaku']
  },
  {
    id:'food_nouns', phase:7, type:'word', wlevel:7,
    name:'음식·음료·식문화', icon:'🍜',
    title:'W7 음식·음료·식문화 (食べ物·居酒屋)',
    subtitle:'ラーメン·焼き鳥·いらっしゃいませ',
    desc:'메뉴판 읽기 + 식당·이자카야 필수 어휘',
    items:['food_ramen','food_sushi','food_tempura','food_udon','food_soba','food_onigiri','food_miso','food_sake','food_biru','food_mizu','food_ocha','food_menu','food_teishoku','food_ikura','food_okane','food_irashai','food_toriaezu','food_yakitori','food_moriawase','food_otsumami','food_edamame','food_izakaya']
  },
  {
    id:'place_sightseeing', phase:7, type:'word', wlevel:7,
    name:'관광·쇼핑 장소', icon:'🗺️',
    title:'W7 관광·쇼핑 장소 (観光·ショッピング)',
    subtitle:'デパート·薬局·神社·お寺',
    desc:'백화점·약국·슈퍼·신사·절·공원 — 여행 중 꼭 가는 장소들',
    items:['pl_depato','pl_yakkyoku','pl_superr','pl_jinja','pl_otera','pl_kouen','pl_omiyageten']
  },

  // ── W8 ①②③ ───────────────────────────────────────────────
  {
    id:'body_parts', phase:8, type:'word', wlevel:8,
    name:'신체 부위', icon:'🧍',
    title:'W8 신체 부위 (体の部位)',
    subtitle:'頭·目·鼻·口·手·足',
    desc:'머리부터 발끝까지 — 아픈 곳을 말할 수 있는 신체 단어',
    items:['bh_atama','bh_me','bh_hana','bh_kuchi','bh_te','bh_ashi','bh_onaka','bh_karada']
  },
  {
    id:'health_symptoms', phase:8, type:'word', wlevel:8,
    name:'증상·건강 상태', icon:'🤒',
    title:'W8 증상·건강 상태 (症状)',
    subtitle:'病気·熱·痛い·風邪·咳',
    desc:'몸이 좋지 않을 때 쓰는 증상 표현',
    items:['bh_byoki','bh_netsu','bh_itai','bh_kaze','bh_seki','bh_hakike']
  },
  {
    id:'medical_care', phase:8, type:'word', wlevel:8,
    name:'의료·병원', icon:'🏥',
    title:'W8 의료·병원 (医療)',
    subtitle:'薬·病院·お医者さん·救急車·薬局',
    desc:'약·병원·의사·구급차 — 긴급 상황에서 필요한 의료 단어',
    items:['bh_kusuri','bh_byoin','bh_isha','bh_kyuukyuu','bh_yakkyoku','bh_hoken']
  },

  // ── W9 ①②③ — IT·테크 어휘 ──────────────────────────────
  {
    id:'it_tech_basic', phase:9, type:'word', wlevel:9,
    name:'IT 기초 용어', icon:'💻',
    title:'W9 IT 기초 용어 (IT用語)',
    subtitle:'バグ·デプロイ·API·Git·Slack',
    desc:'일본 IT 회사 첫날부터 쓰는 용어 — 코드·버그·서버·배포·GitHub',
    items:['it_program','it_code','it_bug','it_error','it_server','it_client','it_api','it_db','it_frontend','it_backend','it_infra','it_docker','it_git','it_github','it_slack','it_log','it_test','it_build','it_deploy','it_release']
  },
  {
    id:'it_dev_process', phase:9, type:'word', wlevel:9,
    name:'개발 프로세스', icon:'🔄',
    title:'W9 개발 프로세스 용어 (開発プロセス)',
    subtitle:'スプリント·PR·レビュー·マージ·KPT',
    desc:'아자일 개발 현장에서 매일 쓰는 프로세스 용어 완전 정복',
    items:['it_sprint','it_task','it_ticket','it_issue','it_pr','it_review','it_merge','it_refactor','it_debug','it_spec','it_design','it_standup','it_retrospec','it_kpt','it_pipeline']
  },
  {
    id:'it_workplace', phase:9, type:'word', wlevel:9,
    name:'IT 직장·조직', icon:'🏢',
    title:'W9 IT 직장·조직 어휘 (職場·組織)',
    subtitle:'エンジニア·PM·PO·本番·締め切り',
    desc:'엔지니어·PM·QA·운영환경·우선순위 — 일본 IT 직장 생활의 핵심 어휘',
    items:['it_engineer','it_designer','it_pm','it_po','it_qa','it_tl','it_ops','it_sre','it_deadline','it_priority','it_impact','it_release2','it_production','it_staging','it_local']
  },

  // ── W10 ①②③ — 비즈니스 일본어 ──────────────────────────
  {
    id:'biz_greetings', phase:10, type:'word', wlevel:10,
    name:'비즈니스 기본 표현', icon:'🤝',
    title:'W10 비즈니스 기본 표현 (ビジネス表現)',
    subtitle:'お疲れ様·承知しました·ご確認ください',
    desc:'일본 직장에서 하루에도 수십 번 쓰는 비즈니스 표현 완전 정복',
    items:['biz_otsu','biz_yoroshiku','biz_shochi','biz_ryokai','biz_kashiko','biz_osewa','biz_confirm','biz_taio','biz_kentou','biz_kyoyu','biz_kakunin','biz_renraku']
  },
  {
    id:'biz_hourensou', phase:10, type:'word', wlevel:10,
    name:'보고·연락·상담', icon:'📢',
    title:'W10 ほうれんそう — 報告·連絡·相談',
    subtitle:'進捗報告·相談·遅れています·問題があります',
    desc:'일본 직장 최고의 미덕 ほうれんそう — 보고·연락·상담 표현 완전 정복',
    items:['biz_houkoku','biz_soudan','biz_shinchou','biz_yotei','biz_okure','biz_mondai','biz_kaichou','biz_tsuika','biz_ima','biz_ato']
  },
  {
    id:'biz_meeting', phase:10, type:'word', wlevel:10,
    name:'회의·의견 표현', icon:'💡',
    title:'W10 회의·의견·제안 표현 (会議·提案)',
    subtitle:'議題·いかがでしょうか·おっしゃる通り',
    desc:'회의에서 의견을 제안하고 동의하고 확인하는 비즈니스 일본어 완전 정복',
    items:['biz_gidai','biz_gijiroku','biz_ikaga','biz_iken','biz_ossharu','biz_teian','biz_kansha','biz_imi','biz_jikan','biz_omakase','biz_wakarima','biz_matome']
  },

  // ══════════════════════════════════════════════════════════
  //  문장 학습 (Sentence) — S1 ~ S6  (앞 단어들을 활용한 패턴 학습)
  //  S1 인사 → S2 자기소개 → S3 쇼핑/식당 → S4 교통 → S5 여행 → S6 긴급
  // ══════════════════════════════════════════════════════════

  // ── S1: 인사·기초 회화 ───────────────────────────────────
  {
    id:'first_expressions', phase:1, type:'sentence', slevel:1,
    name:'인사·기초 회화', icon:'🙏',
    title:'S1 인사·기초 회화 (挨拶)',
    subtitle:'はじめまして·ゆっくり·英語は？',
    desc:'첫 만남의 인사 + 언어 장벽 돌파 표현 (W1 단어 활용)',
    items:['s1_hajimemashite','gr_modoichi','gr_english','s1_yukkuri','s1_chotto','s1_sukoshi']
  },
  {
    id:'s1_pardon', phase:1, type:'sentence', slevel:1,
    name:'다시 묻기·양해', icon:'🔄',
    title:'S1 다시 묻기·양해 (聞き直し)',
    subtitle:'もう一度·書いて·どういう意味',
    desc:'못 알아들었을 때 당황하지 않는 법 — 재확인·양해 표현 완전 정복',
    items:['par_imi','par_kaite','par_eigo2','par_wakatta','par_wakaranai','par_hon']
  },
  {
    id:'s1_feelings', phase:1, type:'sentence', slevel:1,
    name:'기분·감정 기초', icon:'😊',
    title:'S1 기분·감정 기초 (気持ち)',
    subtitle:'嬉しい·疲れた·お腹空いた·最高',
    desc:'여행 중 느끼는 감정을 표현하자 — 기쁨·피로·배고픔·감탄까지',
    items:['feel_ureshii','feel_genki','feel_tsukareta','feel_hara','feel_nemu','feel_saiko','feel_zannen']
  },

  // ── S2: 자기소개·기초 질문 ───────────────────────────────
  {
    id:'self_intro', phase:2, type:'sentence', slevel:2,
    name:'자기소개', icon:'👤',
    title:'S2 자기소개 (自己紹介)',
    subtitle:'わたしは〜·〜から来ました',
    desc:'나를 소개하는 문장 패턴 (W1·W4 단어 활용)',
    items:['gr_kankoku','gr_namae','si_kara','si_sai','si_shigoto','si_travel','si_nihongo','si_suki']
  },
  {
    id:'basic_questions', phase:2, type:'sentence', slevel:2,
    name:'기초 질문 패턴', icon:'❓',
    title:'S2 기초 질문 패턴 (疑問文)',
    subtitle:'これは何？·どこ·いくら·いつ',
    desc:'5W1H 질문 패턴 — 모르는 것을 물어보는 필수 표현 (W4·W5 활용)',
    items:['q_nani','dir_doko','dir_ikura','q_itsu','q_dare','q_dore','q_arimasu','q_dekimasu','q_donogurai','q_naze']
  },
  {
    id:'s2_hobbies', phase:2, type:'sentence', slevel:2,
    name:'취미·관심사 소개', icon:'🎯',
    title:'S2 취미·관심사 소개 (趣味)',
    subtitle:'趣味は〜·得意·大好き·教えて',
    desc:'나의 관심사를 소개하고 상대 취미에 공감하는 표현 (W5·W6 동사·형용사 활용)',
    items:['hob_shumi','hob_yoku','hob_tokui','hob_suki2','hob_oshiete','hob_issho2','hob_omoshiro']
  },

  // ── S3: 쇼핑·식당 표현 ──────────────────────────────────
  {
    id:'food_ordering', phase:3, type:'sentence', slevel:3,
    name:'식당 주문', icon:'🍽️',
    title:'S3 식당 주문 표현 (食事·注文)',
    subtitle:'これをください·お会計·予約',
    desc:'레스토랑에서 주문하고 계산하는 표현 (W7 음식 어휘 활용)',
    items:['res_kore','res_hitotsu','res_futari','res_yoyaku','res_okaikei','res_kaado']
  },
  {
    id:'shopping_phrases', phase:3, type:'sentence', slevel:3,
    name:'쇼핑 표현', icon:'🛍️',
    title:'S3 쇼핑 표현 (ショッピング)',
    subtitle:'試着·割引·サイズ·免税',
    desc:'가격 문의, 사이즈, 면세까지 쇼핑 완전 정복 (W6 형용사 활용)',
    items:['res_baggu','res_omiyage','res_ikaga','res_nokori','res_saizu','res_discount','res_takai','res_yasuku']
  },
  {
    id:'s3_cafe', phase:3, type:'sentence', slevel:3,
    name:'카페·음료 주문', icon:'☕',
    title:'S3 카페·음료 주문 (カフェ)',
    subtitle:'ホット·アイス·砂糖なし·Wi-Fi',
    desc:'일본 카페에서 자연스럽게 주문하기 — 온도·설탕·자리·와이파이까지',
    items:['cafe_hot','cafe_size','cafe_nonsugar','cafe_tomein','cafe_osusume2','cafe_dengen','cafe_wifi']
  },

  // ── S4: 교통·길 찾기 ────────────────────────────────────
  {
    id:'directions', phase:4, type:'sentence', slevel:4,
    name:'길 찾기·방향', icon:'🗺️',
    title:'S4 길 찾기·방향 (道案内)',
    subtitle:'〜に行きたい·まっすぐ·右に曲がって',
    desc:'목적지 말하기, 방향 이해 (W7 교통·장소 명사 활용)',
    items:['dir_ikimasu','dir_chikaku','dir_aruite','dir_made','dir_chizu','dir_michi','dir_toshokan','dir_massugu','dir_migi_te','dir_hidari_te']
  },
  {
    id:'transport_phrases', phase:4, type:'sentence', slevel:4,
    name:'교통·이동', icon:'🚅',
    title:'S4 교통·이동 표현 (交通)',
    subtitle:'新幹線·乗り換え·スイカ·時刻表',
    desc:'신칸센·IC카드·환승까지 일본 교통 완전 정복 (W7 교통 활용)',
    items:['td_shink','td_jiyuuseki','td_suica','td_kippu','td_norikae','td_yuki','td_noriba','td_jikanhyo','td_maniau','td_taxi','td_teiryu','td_madogawa']
  },
  {
    id:'s4_time_asking', phase:4, type:'sentence', slevel:4,
    name:'시각·시간 묻기', icon:'⏰',
    title:'S4 시각·시간 묻기 (時間)',
    subtitle:'今何時·〜まで開いてる·どのくらい',
    desc:'시간 확인부터 소요시간·영업시간까지 — 일정 관리에 필수',
    items:['time_nanji','time_goro','time_aite','time_kara','time_hayai2','time_osoi','time_itsu2']
  },

  // ── S5: 여행·호텔 ────────────────────────────────────────
  {
    id:'hotel_phrases', phase:5, type:'sentence', slevel:5,
    name:'호텔·숙박', icon:'🏨',
    title:'S5 호텔·숙박 표현 (ホテル)',
    subtitle:'チェックイン·ルームサービス·延長',
    desc:'체크인·룸서비스·연장까지 숙박 완전 정복 (W7·W8 어휘 활용)',
    items:['ht_checkin','ht_checkout','ht_yoyaku','ht_goushitsu','ht_choshoku','ht_kagi','ht_taoru','ht_moningcall','ht_room','ht_elevator','ht_laundry','ht_lobby','ht_extend']
  },
  {
    id:'s5_sightseeing', phase:5, type:'sentence', slevel:5,
    name:'관광·사진', icon:'📸',
    title:'S5 관광·사진 표현 (観光)',
    subtitle:'観光地·写真·入場料·地図',
    desc:'관광지 즐기기 — 추천 관광지 묻기, 사진 요청, 입장료·영업시간 확인',
    items:['sight_osusume','sight_shashin','sight_issho2','sight_nyuujo','sight_heiten','sight_map','sight_toire2']
  },
  {
    id:'s5_weather', phase:5, type:'sentence', slevel:5,
    name:'날씨·계절', icon:'🌤️',
    title:'S5 날씨·계절 표현 (天気)',
    subtitle:'明日の天気·傘·雨·雪·涼しい',
    desc:'날씨 스몰토크 + 여행 준비 — 우산 필요 여부, 계절 표현',
    items:['wthr_tenki','wthr_kasa','wthr_kisetsu','wthr_ame','wthr_yuki','wthr_suzushi','wthr_warm']
  },

  // ── S6: 일상·긴급·스몰토크 ──────────────────────────────
  {
    id:'small_talk', phase:6, type:'sentence', slevel:6,
    name:'스몰토크·감정', icon:'💬',
    title:'S6 스몰토크·감정 표현 (会話)',
    subtitle:'날씨·취미·감탄·작별',
    desc:'친구 사귀기 — 날씨·취미·감탄·감정 일상 대화 (W6 감정 형용사 활용)',
    items:['st_hisashiburi','st_ogenki','st_tenki','st_atsui','st_samui','st_shumi','st_suki','st_tanoshii','st_sugoi','st_taihen','st_mata','st_omedetou','st_issho','st_nani','st_yoroshiku']
  },
  {
    id:'emergency_sos', phase:6, type:'sentence', slevel:6,
    name:'긴급·SOS', icon:'🚨',
    title:'S6 긴급·SOS (緊急)',
    subtitle:'たすけて·病院·警察·なくしました',
    desc:'만일을 대비한 긴급 표현 + 병원·경찰·분실 대응 (W8 의료 어휘 활용)',
    items:['emg_tasuke','emg_byouin','emg_keisatsu','emg_guai','emg_kusuri','emg_nakushi','emg_taishi','emg_hoken']
  },
  {
    id:'s6_health', phase:6, type:'sentence', slevel:6,
    name:'몸 상태·건강', icon:'💊',
    title:'S6 몸 상태·건강 표현 (健康)',
    subtitle:'〜が痛い·熱·風邪·救急車',
    desc:'아플 때 증상을 말하고 도움 요청 — 병원·응급 상황 대비 (W8 어휘 활용)',
    items:['hlth_itai','hlth_netsu','hlth_kaze','hlth_isha','hlth_daijob','hlth_suimin','hlth_kyuu']
  },

  // ══════════════════════════════════════════════════════════
  //  실전 롤플레이 (Sim) — 5그룹 재분류
  //  1:교통편 · 2:식사편 · 3:숙박편 · 4:쇼핑편 · 5:관광·문화
  //  dialogue:true  = 화자 A(나) / B(상대방) 대화 롤플레이
  // ══════════════════════════════════════════════════════════

  // ── 1. 교통편 (simlevel:1) ────────────────────────────────
  {
    id:'sim_airport', phase:9, type:'sim', simlevel:1, dialogue:true,
    name:'공항 체크인', icon:'✈️',
    title:'롤플레이: 공항 체크인',
    subtitle:'탑승 수속 → 좌석 → 게이트 → 환전',
    desc:'공항 체크인 카운터 — 여권 제출부터 탑승 게이트 확인까지',
    items:['ap_n1','ap_1','ap_2','ap_3','ap_4','ap_5','ap_6','ap_7','ap_8','ap_9','ap_10','ap_11','ap_12','ap_13']
  },
  {
    id:'sim_airplane', phase:9, type:'sim', simlevel:1, dialogue:true,
    name:'비행기 안', icon:'🛫',
    title:'롤플레이: 비행기 안에서',
    subtitle:'좌석 찾기 → 담요·음료 → 식사 선택',
    desc:'이코노미 좌석에서 승무원과 대화 — 탑승부터 착륙 안내까지',
    items:['air_n1','air_1','air_2','air_3','air_4','air_5','air_6','air_7','air_8','air_9','air_10']
  },
  {
    id:'sim_subway_dlg', phase:9, type:'sim', simlevel:1, dialogue:true,
    name:'지하철', icon:'🚇',
    title:'롤플레이: 지하철',
    subtitle:'노선 문의 → 환승 → 역 안내',
    desc:'일본 지하철에서 길 물어보기 — 노선 안내부터 역 구내 시설까지',
    items:['sub_n1','sub_1','sub_2','sub_3','sub_4','sub_5','sub_6','sub_7','sub_8','sub_9','sub_10'],
    variants:[
      { scene:'노선·표 구입', items:['sub_n1','sub_1','sub_2','sub_3','sub_4','sub_5','sub_6','sub_7','sub_8','sub_9','sub_10'] },
      { scene:'환승·막차·1일권', items:['sub2_n1','sub2_1','sub2_2','sub2_3','sub2_4','sub2_5','sub2_6','sub2_7','sub2_8','sub2_9','sub2_10'] },
      { scene:'역 구내 길 안내', items:['sub3_n1','sub3_1','sub3_2','sub3_3','sub3_4','sub3_5','sub3_6','sub3_7','sub3_8','sub3_9','sub3_10'] },
    ]
  },
  {
    id:'sim_bus', phase:9, type:'sim', simlevel:1, dialogue:true,
    name:'버스', icon:'🚌',
    title:'롤플레이: 버스',
    subtitle:'목적지 확인 → 1일권 → 정리권 → 하차',
    desc:'버스 탑승부터 하차까지 — 기사·승무원과의 완전한 대화 시나리오',
    items:['bus_n1','bus_1','bus_2','bus_3','bus_4','bus_5','bus_6','bus_7','bus_8','bus_9','bus_10'],
    variants:[
      { scene:'버스 탑승·하차', items:['bus_n1','bus_1','bus_2','bus_3','bus_4','bus_5','bus_6','bus_7','bus_8','bus_9','bus_10'] },
      { scene:'버스 기사에게 경로 확인 (3인)', items:['bus2_n','bus2_a1','bus2_c1','bus2_b1','bus2_a2','bus2_c2','bus2_b2','bus2_a3','bus2_c3','bus2_a4'] },
      { scene:'야간버스 예약 (3인)', items:['bus3_n','bus3_a1','bus3_c1','bus3_b1','bus3_c2','bus3_a2','bus3_c3','bus3_b2','bus3_a3','bus3_c4'] },
    ]
  },
  {
    id:'sim_taxi_dlg', phase:9, type:'sim', simlevel:1, dialogue:true,
    name:'택시·우버', icon:'🚕',
    title:'롤플레이: 택시·우버',
    subtitle:'목적지 → 요금 → 카드 결제 → 영수증',
    desc:'호텔 앞에서 택시 탑승 — 목적지부터 영수증까지 완전한 흐름',
    items:['tx_n1','tx_1','tx_2','tx_3','tx_4','tx_5','tx_6','tx_7','tx_8','tx_9','tx_10'],
    variants:[
      { scene:'관광지 이동', items:['tx_n1','tx_1','tx_2','tx_3','tx_4','tx_5','tx_6','tx_7','tx_8','tx_9','tx_10'] },
      { scene:'공항으로 (시간 촉박)', items:['tx2_n1','tx2_1','tx2_2','tx2_3','tx2_4','tx2_5','tx2_6','tx2_7','tx2_8','tx2_9','tx2_10'] },
      { scene:'심야 귀가', items:['tx3_n1','tx3_1','tx3_2','tx3_3','tx3_4','tx3_5','tx3_6','tx3_7','tx3_8','tx3_9','tx3_10'] },
    ]
  },

  // ── 2. 식사편 (simlevel:2) ────────────────────────────────
  {
    id:'sim_restaurant_dlg', phase:9, type:'sim', simlevel:2, dialogue:true,
    name:'식당', icon:'🍽️',
    title:'롤플레이: 식당',
    subtitle:'입장 → 주문 → 계산 전체 흐름',
    desc:'일본 식당에서 처음부터 끝까지 — 완전한 식사 시나리오',
    items:['rd_n1','rd_1','rd_2','rd_3','rd_4','rd_5','rd_6','rd_7','rd_8','rd_9','rd_10','rd_11','rd_12','rd_13'],
    variants:[
      { scene:'일반 식당', items:['rd_n1','rd_1','rd_2','rd_3','rd_4','rd_5','rd_6','rd_7','rd_8','rd_9','rd_10','rd_11','rd_12','rd_13'] },
      { scene:'회전초밥 가게', items:['rd2_n1','rd2_1','rd2_2','rd2_3','rd2_4','rd2_5','rd2_6','rd2_7','rd2_8','rd2_9','rd2_10','rd2_11'] },
      { scene:'라멘 가게', items:['rd3_n1','rd3_1','rd3_2','rd3_3','rd3_4','rd3_5','rd3_6','rd3_7','rd3_8','rd3_9','rd3_10'] },
    ]
  },
  {
    id:'sim_izakaya', phase:9, type:'sim', simlevel:2, dialogue:true,
    name:'이자카야', icon:'🍺',
    title:'롤플레이: 이자카야',
    subtitle:'입장 → 자리 → 맥주·야키토리 주문',
    desc:'일본 이자카야에서의 저녁 식사 — 금연석, 안주, 계산까지',
    items:['iz_n1','iz_1','iz_2','iz_3','iz_4','iz_5','iz_6','iz_7','iz_8','iz_9','iz_10','iz_11','iz_12'],
    variants:[
      { scene:'기본 이자카야', items:['iz_n1','iz_1','iz_2','iz_3','iz_4','iz_5','iz_6','iz_7','iz_8','iz_9','iz_10','iz_11','iz_12'] },
      { scene:'추천 요청 + 단품 주문 (3인)', items:['iza2_n','iza2_a1','iza2_c1','iza2_b1','iza2_a2','iza2_c2','iza2_b2','iza2_c3','iza2_a3','iza2_b3'] },
    ]
  },
  {
    id:'sim_cafe_dlg', phase:9, type:'sim', simlevel:2, dialogue:true,
    name:'카페', icon:'☕',
    title:'롤플레이: 카페',
    subtitle:'주문 → 커스텀 → 결제',
    desc:'일본 카페에서 커피·디저트 주문 — 스탠다드부터 커스텀·전통 찻집까지',
    items:['cf_n1','cf_1','cf_2','cf_3','cf_4','cf_5','cf_6','cf_7','cf_8','cf_9','cf_10'],
    variants:[
      { scene:'일반 카페', items:['cf_n1','cf_1','cf_2','cf_3','cf_4','cf_5','cf_6','cf_7','cf_8','cf_9','cf_10'] },
      { scene:'커스텀 주문', items:['cf2_n1','cf2_1','cf2_2','cf2_3','cf2_4','cf2_5','cf2_6','cf2_7','cf2_8','cf2_9','cf2_10'] },
      { scene:'전통 찻집', items:['cf3_n1','cf3_1','cf3_2','cf3_3','cf3_4','cf3_5','cf3_6','cf3_7','cf3_8','cf3_9','cf3_10'] },
    ]
  },
  {
    id:'sim_konbini_dlg', phase:9, type:'sim', simlevel:2, dialogue:true,
    name:'편의점', icon:'🏪',
    title:'롤플레이: 편의점',
    subtitle:'도시락 데우기 → ATM → Suica 결제',
    desc:'일본 편의점의 모든 서비스 — 데우기·젓가락·ATM·스이카 결제',
    items:['kd_n1','kd_1','kd_2','kd_3','kd_4','kd_5','kd_6','kd_7','kd_8','kd_9','kd_10'],
    variants:[
      { scene:'도시락·ATM', items:['kd_n1','kd_1','kd_2','kd_3','kd_4','kd_5','kd_6','kd_7','kd_8','kd_9','kd_10'] },
      { scene:'복사기·핫스낵', items:['kd2_n1','kd2_1','kd2_2','kd2_3','kd2_4','kd2_5','kd2_6','kd2_7','kd2_8','kd2_9','kd2_10'] },
      { scene:'공과금·우산', items:['kd3_n1','kd3_1','kd3_2','kd3_3','kd3_4','kd3_5','kd3_6','kd3_7','kd3_8','kd3_9','kd3_10'] },
      { scene:'택배 발송 서비스 (3인)', items:['kb2_n','kb2_a1','kb2_c1','kb2_b1','kb2_a2','kb2_c2','kb2_b2','kb2_a3','kb2_c3','kb2_a4','kb2_c4'] },
    ]
  },
  {
    id:'sim_breakfast', phase:9, type:'sim', simlevel:2, dialogue:true,
    name:'조식 뷔페', icon:'🍳',
    title:'롤플레이: 조식 뷔페에서',
    subtitle:'방 번호 확인 → 커피·미소시루 → 알레르기',
    desc:'호텔 조식 뷔페 — 자리 안내부터 메뉴 확인까지 아침 식사 완전 시나리오',
    items:['bfr_n1','bfr_1','bfr_2','bfr_3','bfr_4','bfr_5','bfr_6','bfr_7','bfr_8','bfr_9','bfr_10'],
    variants:[
      { scene:'기본 조식 뷔페', items:['bfr_n1','bfr_1','bfr_2','bfr_3','bfr_4','bfr_5','bfr_6','bfr_7','bfr_8','bfr_9','bfr_10'] },
      { scene:'카페 커스텀 주문 + 알레르기 (3인)', items:['cafe2_n','cafe2_a1','cafe2_c1','cafe2_b1','cafe2_c2','cafe2_b2','cafe2_c3','cafe2_a2','cafe2_c4','cafe2_b3'] },
    ]
  },

  // ── 3. 숙박편 (simlevel:3) ────────────────────────────────
  {
    id:'sim_hotel_dlg', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'호텔 체크인', icon:'🏨',
    title:'롤플레이: 호텔 체크인',
    subtitle:'예약 확인 → 조식 → Wi-Fi → 체크아웃',
    desc:'호텔 프런트 체크인 전체 절차 — 예약부터 방 안내까지',
    items:['hd_n1','hd_1','hd_2','hd_3','hd_4','hd_5','hd_6','hd_7','hd_8','hd_9','hd_10','hd_11','hd_12'],
    variants:[
      { scene:'기본 체크인', items:['hd_n1','hd_1','hd_2','hd_3','hd_4','hd_5','hd_6','hd_7','hd_8','hd_9','hd_10','hd_11','hd_12'] },
      { scene:'방 문제 해결', items:['hd2_n1','hd2_1','hd2_2','hd2_3','hd2_4','hd2_5','hd2_6','hd2_7','hd2_8','hd2_9','hd2_10','hd2_11'] },
      { scene:'맛집 정보 요청', items:['hd3_n1','hd3_1','hd3_2','hd3_3','hd3_4','hd3_5','hd3_6','hd3_7','hd3_8','hd3_9','hd3_10','hd3_11'] },
      { scene:'얼리 체크인 + 시설 문의 (3인)', items:['ht2_n','ht2_a1','ht2_c1','ht2_b1','ht2_a2','ht2_c2','ht2_b2','ht2_a3','ht2_c3','ht2_b3'] },
    ]
  },
  {
    id:'sim_checkin', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'체크인 심화', icon:'🛎️',
    title:'롤플레이: 호텔 체크인 심화',
    subtitle:'예약 확인 → 금연방 → 조식 → 짐 보관 → Wi-Fi',
    desc:'호텔 프런트 체크인 — 이름 확인부터 방 열쇠 받기까지 완전한 흐름',
    items:['cin_n1','cin_1','cin_2','cin_3','cin_4','cin_5','cin_6','cin_7','cin_8','cin_9','cin_10','cin_11'],
    variants:[
      { scene:'기본 체크인 심화', items:['cin_n1','cin_1','cin_2','cin_3','cin_4','cin_5','cin_6','cin_7','cin_8','cin_9','cin_10','cin_11'] },
      { scene:'얼리 체크인 + 베개 교체 (3인)', items:['ci2_n','ci2_a1','ci2_c1','ci2_b1','ci2_a2','ci2_c2','ci2_b2','ci2_a3','ci2_c3','ci2_a4'] },
    ]
  },
  {
    id:'sim_checkout', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'체크아웃', icon:'🧳',
    title:'롤플레이: 호텔 체크아웃',
    subtitle:'정산 → 짐 보관 → 택시 호출 → 작별',
    desc:'체크아웃 전체 절차 — 정산·짐 맡기기·택시 요청까지',
    items:['cout_n1','cout_1','cout_2','cout_3','cout_4','cout_5','cout_6','cout_7','cout_8','cout_9','cout_10'],
    variants:[
      { scene:'기본 체크아웃', items:['cout_n1','cout_1','cout_2','cout_3','cout_4','cout_5','cout_6','cout_7','cout_8','cout_9','cout_10'] },
      { scene:'레이트 체크아웃 + 짐 배송 (3인)', items:['cout2_n','cout2_a1','cout2_c1','cout2_b1','cout2_a2','cout2_c2','cout2_b2','cout2_c3','cout2_a3','cout2_c4'] },
    ]
  },
  {
    id:'sim_roomservice', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'룸서비스', icon:'☎️',
    title:'롤플레이: 룸서비스',
    subtitle:'전화 주문 → 수건 요청 → 에어컨 고장 → 조식 문의',
    desc:'호텔 방에서 전화로 룸서비스 요청 — 다양한 요청 시나리오',
    items:['rs_n1','rs_1','rs_2','rs_3','rs_4','rs_5','rs_6','rs_7','rs_8','rs_9','rs_10'],
    variants:[
      { scene:'기본 룸서비스', items:['rs_n1','rs_1','rs_2','rs_3','rs_4','rs_5','rs_6','rs_7','rs_8','rs_9','rs_10'] },
      { scene:'야간 룸서비스 추가 주문 (3인)', items:['rs2_n','rs2_a1','rs2_c1','rs2_b1','rs2_a2','rs2_c2','rs2_b2','rs2_a3','rs2_c3','rs2_a4'] },
    ]
  },
  {
    id:'sim_phone', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'전화 예약', icon:'📞',
    title:'롤플레이: 전화 예약',
    subtitle:'인원 확인 → 날짜 조율 → 이름·번호 → 취소 정책',
    desc:'전화로 식당·숙소 예약 — 예약부터 취소 정책 확인까지',
    items:['ph_n1','ph_1','ph_2','ph_3','ph_4','ph_5','ph_6','ph_7','ph_8','ph_9','ph_10','ph_11'],
    variants:[
      { scene:'식당·숙소 예약', items:['ph_n1','ph_1','ph_2','ph_3','ph_4','ph_5','ph_6','ph_7','ph_8','ph_9','ph_10','ph_11'] },
      { scene:'온천 료칸 예약 (3인)', items:['ph2_n','ph2_a1','ph2_c1','ph2_b1','ph2_a2','ph2_c2','ph2_b2','ph2_a3','ph2_c3','ph2_a4','ph2_c4'] },
    ]
  },
  {
    id:'sim_onsen', phase:10, type:'sim', simlevel:3, dialogue:true,
    name:'온천', icon:'♨️',
    title:'롤플레이: 온천에서',
    subtitle:'사용법 문의 → 샴푸·수건 → 노천탕 안내',
    desc:'료칸 대욕장 — 탈의실부터 노천탕까지, 온천 예절과 이용법 완전 시나리오',
    items:['ons_n1','ons_1','ons_2','ons_3','ons_4','ons_5','ons_6','ons_7','ons_8','ons_9','ons_10'],
    variants:[
      { scene:'기본 온천 이용', items:['ons_n1','ons_1','ons_2','ons_3','ons_4','ons_5','ons_6','ons_7','ons_8','ons_9','ons_10'] },
      { scene:'온천 규칙 + 수건 빌리기 (3인)', items:['ons2_n','ons2_a1','ons2_c1','ons2_b1','ons2_a2','ons2_c2','ons2_b2','ons2_a3','ons2_c3','ons2_b3'] },
    ]
  },

  // ── 4. 쇼핑편 (simlevel:4) ────────────────────────────────
  {
    id:'sim_selectshop', phase:10, type:'sim', simlevel:4, dialogue:true,
    name:'편집샵·옷가게', icon:'👗',
    title:'롤플레이: 편집샵·옷가게에서',
    subtitle:'신상 탐색 → 시착 → 사이즈 → 면세·카드',
    desc:'일본 패션 편집샵에서의 쇼핑 — 시착부터 면세 결제까지',
    items:['sel_n1','sel_1','sel_2','sel_3','sel_4','sel_5','sel_6','sel_7','sel_8','sel_9','sel_10'],
    variants:[
      { scene:'기본 편집샵', items:['sel_n1','sel_1','sel_2','sel_3','sel_4','sel_5','sel_6','sel_7','sel_8','sel_9','sel_10'] },
      { scene:'한정 컬러 + 회원 가입 (3인)', items:['sel2_n','sel2_a1','sel2_c1','sel2_b1','sel2_a2','sel2_c2','sel2_b2','sel2_a3','sel2_c3','sel2_b3','sel2_a4'] },
    ]
  },
  {
    id:'sim_donki', phase:10, type:'sim', simlevel:4, dialogue:true,
    name:'돈키호테', icon:'🛒',
    title:'롤플레이: 돈키호테에서',
    subtitle:'화장품 위치 → 면세 → 과자 코너 → 앱 포인트',
    desc:'돈키호테에서 화장품·과자·면세까지 — 쇼핑 완전 정복',
    items:['dnq_n1','dnq_1','dnq_2','dnq_3','dnq_4','dnq_5','dnq_6','dnq_7','dnq_8','dnq_9','dnq_10'],
    variants:[
      { scene:'기본 돈키호테', items:['dnq_n1','dnq_1','dnq_2','dnq_3','dnq_4','dnq_5','dnq_6','dnq_7','dnq_8','dnq_9','dnq_10'] },
      { scene:'직원 도움 + 할인 쿠폰 (3인)', items:['dnq2_n','dnq2_a1','dnq2_c1','dnq2_b1','dnq2_a2','dnq2_c2','dnq2_b2','dnq2_a3','dnq2_c3','dnq2_b3'] },
    ]
  },
  {
    id:'sim_department', phase:10, type:'sim', simlevel:4, dialogue:true,
    name:'백화점', icon:'🏬',
    title:'롤플레이: 백화점에서',
    subtitle:'선물 구입 → 포장 → 면세 → 식품관',
    desc:'일본 백화점에서 선물 쇼핑 — 포장·면세·식품관 완전 시나리오',
    items:['dep_n1','dep_1','dep_2','dep_3','dep_4','dep_5','dep_6','dep_7','dep_8','dep_9','dep_10'],
    variants:[
      { scene:'기본 백화점', items:['dep_n1','dep_1','dep_2','dep_3','dep_4','dep_5','dep_6','dep_7','dep_8','dep_9','dep_10'] },
      { scene:'선물 + 해외 배송 (3인)', items:['dep2_n','dep2_a1','dep2_c1','dep2_b1','dep2_a2','dep2_c2','dep2_b2','dep2_a3','dep2_c3','dep2_b3','dep2_a4','dep2_c4'] },
    ]
  },
  {
    id:'sim_shopping_dlg', phase:10, type:'sim', simlevel:4, dialogue:true,
    name:'옷가게·기념품', icon:'🛍️',
    title:'롤플레이: 쇼핑 (전자제품·기념품)',
    subtitle:'시착 → 사이즈 → 면세 → 카드 결제',
    desc:'전자제품·기념품 가게 쇼핑 — 브라우징부터 면세 결제까지',
    items:['sd_n1','sd_1','sd_2','sd_3','sd_4','sd_5','sd_6','sd_7','sd_8','sd_9','sd_10','sd_11'],
    variants:[
      { scene:'옷가게', items:['sd_n1','sd_1','sd_2','sd_3','sd_4','sd_5','sd_6','sd_7','sd_8','sd_9','sd_10','sd_11'] },
      { scene:'전자제품 가게', items:['sd2_n1','sd2_1','sd2_2','sd2_3','sd2_4','sd2_5','sd2_6','sd2_7','sd2_8','sd2_9','sd2_10','sd2_11'] },
      { scene:'기념품 가게', items:['sd3_n1','sd3_1','sd3_2','sd3_3','sd3_4','sd3_5','sd3_6','sd3_7','sd3_8','sd3_9','sd3_10','sd3_11'] },
    ]
  },

  // ── 5. 관광·문화편 (simlevel:5) ──────────────────────────
  {
    id:'sim_first_meeting', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'처음 만남', icon:'🤝',
    title:'롤플레이: 처음 만남',
    subtitle:'사진 부탁 → 대화 → 여행 계획',
    desc:'관광지에서 일본인과 처음 대화하는 완전한 시나리오',
    items:['dm_n1','dm_1','dm_2','dm_3','dm_4','dm_5','dm_6','dm_7','dm_8','dm_9','dm_10','dm_11'],
    variants:[
      { scene:'관광지에서', items:['dm_n1','dm_1','dm_2','dm_3','dm_4','dm_5','dm_6','dm_7','dm_8','dm_9','dm_10','dm_11'] },
      { scene:'신칸센 안에서', items:['dm2_n1','dm2_1','dm2_2','dm2_3','dm2_4','dm2_5','dm2_6','dm2_7','dm2_8','dm2_9','dm2_10','dm2_11'] },
      { scene:'게스트하우스에서', items:['dm3_n1','dm3_1','dm3_2','dm3_3','dm3_4','dm3_5','dm3_6','dm3_7','dm3_8','dm3_9','dm3_10'] },
    ]
  },
  {
    id:'sim_daily_chat', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'일상 스몰토크', icon:'💬',
    title:'롤플레이: 일상 스몰토크',
    subtitle:'카페에서 — 일본어 칭찬 → 취미 → 애니',
    desc:'카페에서 일본인과 자연스럽게 잡담하는 시나리오',
    items:['dd_n1','dd_1','dd_2','dd_3','dd_4','dd_5','dd_6','dd_7','dd_8','dd_9','dd_10']
  },
  {
    id:'sim_date', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'일본인과 데이트', icon:'🌸',
    title:'롤플레이: 일본인과 데이트',
    subtitle:'꽃구경 → 사진 → 카페 → 연락처 교환',
    desc:'공원 꽃구경 데이트 — 자연스러운 일상 대화와 감정 표현 시나리오',
    items:['dt2_n1','dt2_1','dt2_2','dt2_3','dt2_4','dt2_5','dt2_6','dt2_7','dt2_8','dt2_9','dt2_10']
  },
  {
    id:'sim_baseball', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'야구장', icon:'⚾',
    title:'롤플레이: 야구장에서',
    subtitle:'티켓 구입 → 응원 용품 → 맥주·가라아게 → 응원',
    desc:'일본 프로야구 관전 — 입장부터 응원까지 완전한 야구장 시나리오',
    items:['bsb_n1','bsb_1','bsb_2','bsb_3','bsb_4','bsb_5','bsb_6','bsb_7','bsb_8','bsb_9','bsb_10'],
    variants:[
      { scene:'기본 야구장', items:['bsb_n1','bsb_1','bsb_2','bsb_3','bsb_4','bsb_5','bsb_6','bsb_7','bsb_8','bsb_9','bsb_10'] },
      { scene:'매점 직원과 대화 (3인)', items:['bsb2_n','bsb2_a1','bsb2_c1','bsb2_b1','bsb2_a2','bsb2_c2','bsb2_b2','bsb2_a3','bsb2_c3','bsb2_a4','bsb2_b3'] },
    ]
  },
  {
    id:'sim_pointing', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'가리키기', icon:'👆',
    title:'롤플레이: 가리키기',
    subtitle:'これ·それ·あれ + ください — 편의점 실전',
    desc:'말이 안 통할 때 손가락으로 해결하는 편의점 쇼핑 시나리오',
    items:['pt_n1','pt_1','pt_2','pt_3','pt_4','pt_5','pt_6','pt_7','pt_8','pt_9','pt_10','pt_n2']
  },
  {
    id:'sim_elevator', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'엘리베이터', icon:'🛗',
    title:'롤플레이: 엘리베이터',
    subtitle:'층수 안내 → 문 열기 → 레스토랑 위치',
    desc:'백화점 엘리베이터에서 직원과 대화 — 층수·방향·안내 시나리오',
    items:['elv_n1','elv_1','elv_2','elv_3','elv_4','elv_5','elv_6','elv_7','elv_8','elv_9','elv_10']
  },
  {
    id:'sim_toilet', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'화장실', icon:'🚻',
    title:'롤플레이: 화장실',
    subtitle:'위치 묻기 → 비데 사용법 → 다목적 화장실',
    desc:'화장실 위치·사용법 문의 — 관광지·가게에서의 실전 시나리오',
    items:['tlt_n1','tlt_1','tlt_2','tlt_3','tlt_4','tlt_5','tlt_6','tlt_7','tlt_8','tlt_n2']
  },
  {
    id:'sim_smoking', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'흡연실', icon:'🚬',
    title:'롤플레이: 흡연실',
    subtitle:'흡연소 위치 → 전자담배 → 재떨이',
    desc:'식당·호텔에서 흡연 공간 확인 — 금연 안내·흡연구역 대화',
    items:['smkd_n1','smkd_1','smkd_2','smkd_3','smkd_4','smkd_5','smkd_6','smkd_7','smkd_8']
  },
  {
    id:'sim_pharmacy_dlg', phase:10, type:'sim', simlevel:5, dialogue:true,
    name:'약국·병원', icon:'💊',
    title:'롤플레이: 약국·병원',
    subtitle:'증상 설명 → 약 구입 → 진찰',
    desc:'약국에서 약 구입, 내과·치과 방문 — 일본 의료 현장 실전 대화',
    items:['pk_n1','pk_1','pk_2','pk_3','pk_4','pk_5','pk_6','pk_7','pk_8','pk_9','pk_10'],
    variants:[
      { scene:'약국 (감기약)', items:['pk_n1','pk_1','pk_2','pk_3','pk_4','pk_5','pk_6','pk_7','pk_8','pk_9','pk_10'] },
      { scene:'내과 진찰', items:['hp_n1','hp_1','hp_2','hp_3','hp_4','hp_5','hp_6','hp_7','hp_8','hp_9','hp_10'] },
      { scene:'치과 응급', items:['dk_n1','dk_1','dk_2','dk_3','dk_4','dk_5','dk_6','dk_7','dk_8','dk_9','dk_10'] },
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  simlevel 6 — 부부 여행편 (デニスと妻の旅)
  // ══════════════════════════════════════════════════════════
  {
    id:'sim_cp_lost', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'길을 잃은 부부', icon:'🗺️',
    title:'롤플레이: 길을 잃은 부부',
    subtitle:'道に迷った → 言い合い → 現地の人に質問',
    desc:'관광지에서 길을 잃은 데니스 부부 — 서로 탓하다가 결국 현지인한테 물어보는 실전 대화',
    items:['cp1_n1','cp1_a1','cp1_b1','cp1_a2','cp1_b2','cp1_a3','cp1_b3','cp1_a4','cp1_b4','cp1_a5','cp1_b5'],
    variants:[
      { scene:'탓하기 → 현지인 질문', items:['cp1_n1','cp1_a1','cp1_b1','cp1_a2','cp1_b2','cp1_a3','cp1_b3','cp1_a4','cp1_b4','cp1_a5','cp1_b5'] },
      { scene:'구글맵 보다가 더 헷갈린 부부', items:['cp1v2_n','cp1v2_a1','cp1v2_b1','cp1v2_a2','cp1v2_b2','cp1v2_a3','cp1v2_b3','cp1v2_a4','cp1v2_b4','cp1v2_a5'] },
      { scene:'편의점 점원한테 길 묻기', items:['cp1v3_n','cp1v3_a1','cp1v3_b1','cp1v3_a2','cp1v3_b2','cp1v3_a3','cp1v3_b3','cp1v3_a4','cp1v3_b4','cp1v3_a5'] },
      { scene:'택시 잡아서 이동하기', items:['cp1v4_n','cp1v4_b1','cp1v4_a1','cp1v4_b2','cp1v4_a2','cp1v4_b3','cp1v4_a3','cp1v4_b4','cp1v4_a4','cp1v4_a5'] },
    ]
  },
  {
    id:'sim_cp_onsen', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'온천 탈의실 실수', icon:'♨️',
    title:'롤플레이: 온천 탈의실 실수',
    subtitle:'のれん間違い → 漢字が読めない → 特訓宣言',
    desc:'호텔 온천에서 남탕·여탕 노렌을 착각한 데니스 — 와이프의 구조와 한자 특훈 선언',
    items:['cp2_n1','cp2_a1','cp2_b1','cp2_a2','cp2_b2','cp2_a3','cp2_b3','cp2_a4','cp2_b4','cp2_a5','cp2_b5'],
    variants:[
      { scene:'노렌 착각 → 한자 특훈', items:['cp2_n1','cp2_a1','cp2_b1','cp2_a2','cp2_b2','cp2_a3','cp2_b3','cp2_a4','cp2_b4','cp2_a5','cp2_b5'] },
      { scene:'물 온도에 쩔쩔매는 남편', items:['cp2v2_n','cp2v2_a1','cp2v2_b1','cp2v2_a2','cp2v2_b2','cp2v2_a3','cp2v2_b3','cp2v2_a4','cp2v2_b4','cp2v2_a5'] },
      { scene:'온천 후 마사지 예약', items:['cp2v3_n','cp2v3_b1','cp2v3_a1','cp2v3_b2','cp2v3_a2','cp2v3_b3','cp2v3_a3','cp2v3_b4','cp2v3_a4','cp2v3_a5'] },
      { scene:'온천 용품 빌리기', items:['cp2v4_n','cp2v4_a1','cp2v4_b1','cp2v4_a2','cp2v4_b2','cp2v4_a3','cp2v4_b3','cp2v4_a4','cp2v4_b4','cp2v4_a5'] },
    ]
  },
  {
    id:'sim_cp_donki', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'돈키호테 쇼핑 전쟁', icon:'🛒',
    title:'롤플레이: 돈키호테 쇼핑 전쟁',
    subtitle:'目がキラキラ → カゴいっぱい → 追加バッグ',
    desc:'돈키호테에서 와이프가 모든 것을 담기 시작하면 남편의 캐리어 걱정은 시작된다',
    items:['cp3_n1','cp3_b1','cp3_a1','cp3_b2','cp3_a2','cp3_b3','cp3_a3','cp3_b4','cp3_a4','cp3_b5','cp3_a5'],
    variants:[
      { scene:'눈이 반짝 → 캐리어 걱정', items:['cp3_n1','cp3_b1','cp3_a1','cp3_b2','cp3_a2','cp3_b3','cp3_a3','cp3_b4','cp3_a4','cp3_b5','cp3_a5'] },
      { scene:'면세 신청 대작전', items:['cp3v2_n','cp3v2_b1','cp3v2_a1','cp3v2_b2','cp3v2_a2','cp3v2_b3','cp3v2_a3','cp3v2_b4','cp3v2_a4','cp3v2_a5'] },
      { scene:'화장품 코너에서 사라진 와이프', items:['cp3v3_n','cp3v3_b1','cp3v3_a1','cp3v3_b2','cp3v3_a2','cp3v3_b3','cp3v3_a3','cp3v3_b4','cp3v3_a4','cp3v3_b5'] },
      { scene:'쿠폰으로 500엔 이득 작전', items:['cp3v4_n','cp3v4_b1','cp3v4_a1','cp3v4_b2','cp3v4_a2','cp3v4_b3','cp3v4_a3','cp3v4_b4','cp3v4_a4','cp3v4_a5'] },
    ]
  },
  {
    id:'sim_cp_menu', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'메뉴 못 읽기 사건', icon:'📋',
    title:'롤플레이: 메뉴 못 읽기 사건',
    subtitle:'漢字が読めない → 写真で注文 → ベジタリアン',
    desc:'정식집에서 한자를 못 읽어 사진만 보고 주문했더니 채식 메뉴가 나온 데니스',
    items:['cp4_n1','cp4_a1','cp4_b1','cp4_a2','cp4_b2','cp4_a3','cp4_b3','cp4_a4','cp4_b4','cp4_a5','cp4_b5'],
    variants:[
      { scene:'사진 보고 주문 → 채식 등장', items:['cp4_n1','cp4_a1','cp4_b1','cp4_a2','cp4_b2','cp4_a3','cp4_b3','cp4_a4','cp4_b4','cp4_a5','cp4_b5'] },
      { scene:'라멘집 토핑 완벽 주문', items:['cp4v2_n','cp4v2_b1','cp4v2_a1','cp4v2_b2','cp4v2_a2','cp4v2_b3','cp4v2_a3','cp4v2_b4','cp4v2_a4','cp4v2_a5'] },
      { scene:'편의점 도시락 고르기', items:['cp4v3_n','cp4v3_b1','cp4v3_a1','cp4v3_b2','cp4v3_a2','cp4v3_b3','cp4v3_a3','cp4v3_b4','cp4v3_a4','cp4v3_a5'] },
      { scene:'회전초밥 태블릿 주문', items:['cp4v4_n','cp4v4_b1','cp4v4_a1','cp4v4_b2','cp4v4_a2','cp4v4_b3','cp4v4_a3','cp4v4_b4','cp4v4_a4','cp4v4_a5'] },
    ]
  },
  {
    id:'sim_cp_morning', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'호텔 아침 기상 전쟁', icon:'⏰',
    title:'롤플레이: 호텔 아침 기상 전쟁',
    subtitle:'起きて！→ あと5分 → 浅草・上野・渋谷',
    desc:'아침 7시, 만반의 준비를 마친 와이프 vs 5분만 더 자고 싶은 데니스의 기상 전쟁',
    items:['cp5_n1','cp5_b1','cp5_a1','cp5_b2','cp5_a2','cp5_b3','cp5_a3','cp5_b4','cp5_a4','cp5_b5','cp5_a5'],
    variants:[
      { scene:'7시 기상 전쟁', items:['cp5_n1','cp5_b1','cp5_a1','cp5_b2','cp5_a2','cp5_b3','cp5_a3','cp5_b4','cp5_a4','cp5_b5','cp5_a5'] },
      { scene:'조식 뷔페 공략', items:['cp5v2_n','cp5v2_b1','cp5v2_a1','cp5v2_b2','cp5v2_a2','cp5v2_b3','cp5v2_a3','cp5v2_b4','cp5v2_a4','cp5v2_a5'] },
      { scene:'체크아웃 10분 전 허둥지둥', items:['cp5v3_n','cp5v3_b1','cp5v3_a1','cp5v3_b2','cp5v3_a2','cp5v3_b3','cp5v3_a3','cp5v3_b4','cp5v3_a4','cp5v3_a5'] },
      { scene:'신칸센 놓칠 뻔한 부부', items:['cp5v4_n','cp5v4_b1','cp5v4_a1','cp5v4_b2','cp5v4_a2','cp5v4_b3','cp5v4_a3','cp5v4_b4','cp5v4_a4','cp5v4_a5'] },
    ]
  },
  {
    id:'sim_cp_photo', phase:10, type:'sim', simlevel:6, dialogue:true,
    name:'관광지 사진 촬영 대작전', icon:'📸',
    title:'롤플레이: 관광지 사진 촬영 대작전',
    subtitle:'50枚撮影 → もっと笑って → 知らない人に頼む',
    desc:'아사쿠사에서 50장째 찍는 와이프와 팔이 지쳐가는 데니스, 현지인에게 사진 부탁',
    items:['cp6_n1','cp6_b1','cp6_a1','cp6_b2','cp6_a2','cp6_b3','cp6_a3','cp6_b4','cp6_a4','cp6_b5','cp6_a5'],
    variants:[
      { scene:'50장 → 현지인 사진 부탁', items:['cp6_n1','cp6_b1','cp6_a1','cp6_b2','cp6_a2','cp6_b3','cp6_a3','cp6_b4','cp6_a4','cp6_b5','cp6_a5'] },
      { scene:'사진 리뷰 배틀', items:['cp6v2_n','cp6v2_b1','cp6v2_a1','cp6v2_b2','cp6v2_a2','cp6v2_b3','cp6v2_a3','cp6v2_b4','cp6v2_a4','cp6v2_b5'] },
      { scene:'외국인한테 투샷 부탁', items:['cp6v3_n','cp6v3_b1','cp6v3_a1','cp6v3_b2','cp6v3_a2','cp6v3_b3','cp6v3_a3','cp6v3_b4','cp6v3_a4','cp6v3_a5'] },
      { scene:'SNS 릴스 촬영 고난', items:['cp6v4_n','cp6v4_b1','cp6v4_a1','cp6v4_b2','cp6v4_a2','cp6v4_b3','cp6v4_a3','cp6v4_b4','cp6v4_a4','cp6v4_b5'] },
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  승현 & 주영 시리즈 (sh1~sh9)
  // ══════════════════════════════════════════════════════════
  {
    id:'sim_sh_airport', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'대한항공 공항 체크인', icon:'✈️',
    title:'롤플레이: 대한항공 공항 체크인',
    subtitle:'非常口席 → 体重告白 → スーツケース超過',
    desc:'승현의 비상구 좌석 요청과 체중 고백, 수하물 초과까지 — 체크인부터 사건 사고',
    items:['sh1_n','sh1_c1','sh1_a1','sh1_c2','sh1_a2','sh1_b1','sh1_c3','sh1_a3','sh1_c4','sh1_b2','sh1_a4','sh1_c5','sh1_b3','sh1_a5','sh1_b4'],
    variants:[
      { scene:'비상구 좌석 + 수하물 초과', items:['sh1_n','sh1_c1','sh1_a1','sh1_c2','sh1_a2','sh1_b1','sh1_c3','sh1_a3','sh1_c4','sh1_b2','sh1_a4','sh1_c5','sh1_b3','sh1_a5','sh1_b4'] },
      { scene:'나리타 수하물 찾기 대소동', items:['sh1v2_n','sh1v2_a1','sh1v2_b1','sh1v2_a2','sh1v2_c1','sh1v2_a3','sh1v2_c2','sh1v2_b2','sh1v2_a4'] },
    ]
  },
  {
    id:'sim_sh_sushiro', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'스시로 회전초밥 20접시 도전', icon:'🍣',
    title:'롤플레이: 스시로 회전초밥 20접시 도전',
    subtitle:'20皿宣言 → アサヒ注文 → コスパ格差',
    desc:'승현의 20접시 선언과 아사히 맥주, 주영의 3접시 — 부부의 회전초밥 가성비 격차',
    items:['sh2_n','sh2_a1','sh2_b1','sh2_c1','sh2_a2','sh2_c2','sh2_a3','sh2_b2','sh2_a4','sh2_b3','sh2_a5','sh2_b4','sh2_a6','sh2_b5'],
    variants:[
      { scene:'20접시 도전 + 아사히', items:['sh2_n','sh2_a1','sh2_b1','sh2_c1','sh2_a2','sh2_c2','sh2_a3','sh2_b2','sh2_a4','sh2_b3','sh2_a5','sh2_b4','sh2_a6','sh2_b5'] },
      { scene:'터치패널 특별 주문 (성게알)', items:['sh2v2_n','sh2v2_a1','sh2v2_b1','sh2v2_a2','sh2v2_b2','sh2v2_a3','sh2v2_b3','sh2v2_a4'] },
    ]
  },
  {
    id:'sim_sh_uniqlo', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'긴자 유니클로 3XL 탐색', icon:'👕',
    title:'롤플레이: 긴자 유니클로 3XL 탐색',
    subtitle:'3XL探し → ちょっとキツい → ウエスト100',
    desc:'3XL 플리스를 찾아 긴자 유니클로를 헤매는 승현, 입어보면 "좀 빡빡한" 의례적 결말',
    items:['sh3_n','sh3_b1','sh3_a1','sh3_c1','sh3_a2','sh3_c2','sh3_a3','sh3_b2','sh3_a4','sh3_b3','sh3_a5','sh3_b4','sh3_a6'],
    variants:[
      { scene:'3XL 플리스 + 허리 100 청바지', items:['sh3_n','sh3_b1','sh3_a1','sh3_c1','sh3_a2','sh3_c2','sh3_a3','sh3_b2','sh3_a4','sh3_b3','sh3_a5','sh3_b4','sh3_a6'] },
      { scene:'30cm 신발 = ABC마트 작전', items:['sh3v2_n','sh3v2_a1','sh3v2_b1','sh3v2_a2','sh3v2_b2','sh3v2_a3'] },
    ]
  },
  {
    id:'sim_sh_iqos', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'패밀리마트 아이코스 구매', icon:'🚬',
    title:'롤플레이: 패밀리마트 아이코스 구매',
    subtitle:'HEETS購入 → 年齢確認 → 指定喫煙所',
    desc:'아이코스 스틱 사러 편의점에 들른 승현 — 50대가 연령 확인하는 웃긴 상황과 흡연 구역 탐색',
    items:['sh4_n','sh4_a1','sh4_b1','sh4_a2','sh4_c1','sh4_a3','sh4_b2','sh4_c2','sh4_a4','sh4_b3','sh4_a5','sh4_b4','sh4_a6'],
    variants:[
      { scene:'HEETS 구매 + 흡연 구역 찾기', items:['sh4_n','sh4_a1','sh4_b1','sh4_a2','sh4_c1','sh4_a3','sh4_b2','sh4_c2','sh4_a4','sh4_b3','sh4_a5','sh4_b4','sh4_a6'] },
    ]
  },
  {
    id:'sim_sh_izakaya', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'시부야 이자카야 (사쿠라와 함께)', icon:'🍶',
    title:'롤플레이: 시부야 이자카야',
    subtitle:'芋焼酎 vs ソジュ → LG狂の正体 → 横浜スタジアム作戦',
    desc:'주영의 일본인 친구 사쿠라와 셋이서 — 고구마 소주, LG 광팬의 정체, 다음 야구 약속',
    items:['sh5_n','sh5_c1','sh5_b1','sh5_a1','sh5_c2','sh5_a2','sh5_c3','sh5_a3','sh5_b2','sh5_c4','sh5_a4','sh5_b3','sh5_c5','sh5_b4','sh5_a5'],
    variants:[
      { scene:'이자카야 3인 대화', items:['sh5_n','sh5_c1','sh5_b1','sh5_a1','sh5_c2','sh5_a2','sh5_c3','sh5_a3','sh5_b2','sh5_c4','sh5_a4','sh5_b3','sh5_c5','sh5_b4','sh5_a5'] },
    ]
  },
  {
    id:'sim_sh_outlet', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'고템바 프리미엄 아울렛', icon:'🏔️',
    title:'롤플레이: 고템바 프리미엄 아울렛',
    subtitle:'富士山ビュー → ノースフェイス3XL → またキツい',
    desc:'후지산 뷰 아울렛에서 노스페이스 3XL을 찾았지만 결국 "좀 빡빡한" — 변하지 않는 진리',
    items:['sh6_n','sh6_b1','sh6_a1','sh6_b2','sh6_a2','sh6_b3','sh6_c1','sh6_a3','sh6_b4','sh6_a4','sh6_b5','sh6_a5'],
    variants:[
      { scene:'후지산 뷰 + 노스페이스 3XL', items:['sh6_n','sh6_b1','sh6_a1','sh6_b2','sh6_a2','sh6_b3','sh6_c1','sh6_a3','sh6_b4','sh6_a4','sh6_b5','sh6_a5'] },
    ]
  },
  {
    id:'sim_sh_baseball', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'도쿄돔 야구 관람', icon:'⚾',
    title:'롤플레이: 도쿄돔 야구 관람',
    subtitle:'LG狂がジャイアンツ応援 → アサヒ品切れ → バスケで埋め合わせ',
    desc:'LG 광팬인 주영이 도쿄돔에서 자이언츠를 응援하는 황당함, 아사히 품절 사태',
    items:['sh7_n','sh7_b1','sh7_a1','sh7_b2','sh7_a2','sh7_b3','sh7_a3','sh7_c1','sh7_a4','sh7_b4','sh7_a5','sh7_b5'],
    variants:[
      { scene:'도쿄돔 야구 + 아사히 품절', items:['sh7_n','sh7_b1','sh7_a1','sh7_b2','sh7_a2','sh7_b3','sh7_a3','sh7_c1','sh7_a4','sh7_b4','sh7_a5','sh7_b5'] },
    ]
  },
  {
    id:'sim_sh_bowling', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'이케부쿠로 볼링 (30cm 신발 없음)', icon:'🎳',
    title:'롤플레이: 이케부쿠로 볼링',
    subtitle:'30cm靴なし → 無理やり28cm → 力でストライク',
    desc:'볼링장에 30cm 신발이 없어 28cm를 억지로 신고 스트라이크를 낸 승현 — 힘 vs 컨트롤',
    items:['sh8_n','sh8_a1','sh8_b1','sh8_c1','sh8_a2','sh8_c2','sh8_b2','sh8_a3','sh8_b3','sh8_a4','sh8_b4','sh8_a5','sh8_b5'],
    variants:[
      { scene:'30cm 없음 + 억지 스트라이크', items:['sh8_n','sh8_a1','sh8_b1','sh8_c1','sh8_a2','sh8_c2','sh8_b2','sh8_a3','sh8_b3','sh8_a4','sh8_b4','sh8_a5','sh8_b5'] },
    ]
  },
  {
    id:'sim_sh_dutyfree', phase:11, type:'sim', simlevel:6, dialogue:true,
    name:'하네다 면세점 마지막 쇼핑', icon:'🥃',
    title:'롤플레이: 하네다 면세점 마지막 쇼핑',
    subtitle:'山崎品切れ → 白州NV → 抹茶キットカット100個',
    desc:'야마자키 품절 → 하쿠슈 NV 2병 + 말차 킷캣 100개 — 귀국 전 승현식 쇼핑 마무리',
    items:['sh9_n','sh9_b1','sh9_a1','sh9_b2','sh9_a2','sh9_c1','sh9_a3','sh9_c2','sh9_b3','sh9_a4','sh9_b4','sh9_a5','sh9_b5','sh9_a6','sh9_b6','sh9_a7'],
    variants:[
      { scene:'야마자키 품절 + 하쿠슈 구매', items:['sh9_n','sh9_b1','sh9_a1','sh9_b2','sh9_a2','sh9_c1','sh9_a3','sh9_c2','sh9_b3','sh9_a4','sh9_b4','sh9_a5','sh9_b5','sh9_a6','sh9_b6','sh9_a7'] },
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  simlevel 7 — IT 직장편 (일본 IT 회사에서 일하기)
  //  목표: 한국인 엔지니어가 일본 IT 회사에서 실제로 쓰는 대화 완전 정복
  // ══════════════════════════════════════════════════════════
  {
    id:'sim_it_standup', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'아침 조회(스탠드업)', icon:'🌅',
    title:'롤플레이: 아침 조회 · 스탠드업',
    subtitle:'어제 완료 → 오늘 계획 → 블로커 공유',
    desc:'매일 아침 팀 전체가 모이는 스탠드업 — 진행 상황 공유부터 장애 긴급 대응까지',
    items:['its_n1','its_1','its_2','its_3','its_4','its_5','its_6','its_7','its_8','its_9','its_10'],
    variants:[
      { scene:'정상 조회 — 태스크·블로커 공유', items:['its_n1','its_1','its_2','its_3','its_4','its_5','its_6','its_7','its_8','its_9','its_10'] },
      { scene:'긴급 장애 발생 — 롤백·사후 분석', items:['its2_n','its2_1','its2_2','its2_3','its2_4','its2_5','its2_6','its2_7','its2_8'] },
    ]
  },
  {
    id:'sim_it_codereview', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'코드 리뷰', icon:'🔍',
    title:'롤플레이: 코드 리뷰 요청·논의',
    subtitle:'PR 의뢰 → 테스트 확인 → 지적 수용 → 승인',
    desc:'GitHub PR에서 코드 리뷰 요청부터 지적 사항 논의, LGTM까지 — 엔지니어의 필수 소통',
    items:['itcr_n','itcr_1','itcr_2','itcr_3','itcr_4','itcr_5','itcr_6','itcr_7','itcr_8','itcr_9','itcr_10'],
    variants:[
      { scene:'코드 리뷰 요청 + LGTM', items:['itcr_n','itcr_1','itcr_2','itcr_3','itcr_4','itcr_5','itcr_6','itcr_7','itcr_8','itcr_9','itcr_10'] },
      { scene:'리뷰 코멘트 직접 논의 — N+1 문제', items:['itcr2_n','itcr2_1','itcr2_2','itcr2_3','itcr2_4','itcr2_5'] },
    ]
  },
  {
    id:'sim_it_1on1', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'1on1 미팅', icon:'🙋',
    title:'롤플레이: 1on1 미팅 — 상사와 개인 면담',
    subtitle:'근황 → 약점 공유 → 성장 계획 → 일본어 걱정',
    desc:'매월 상사와 하는 1on1 미팅 — 솔직한 고민 공유, 성장 기회 요청, 언어 걱정 상담까지',
    items:['it1_n','it1_1','it1_2','it1_3','it1_4','it1_5','it1_6','it1_7','it1_8','it1_9','it1_10']
  },
  {
    id:'sim_it_kickoff', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'프로젝트 킥오프', icon:'🚀',
    title:'롤플레이: 프로젝트 킥오프 미팅',
    subtitle:'목표 확인 → 담당 범위 → 스프린트 → 기술 스택',
    desc:'새 프로젝트 시작 — 목표·역할분담·스프린트·기술스택을 확인하는 완전한 킥오프 시나리오',
    items:['itk_n','itk_1','itk_2','itk_3','itk_4','itk_5','itk_6','itk_7','itk_8','itk_9','itk_10']
  },
  {
    id:'sim_it_spec', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'사양 확인·상담', icon:'📝',
    title:'롤플레이: 사양 확인 · 요건 상담',
    subtitle:'논리삭제 vs 물리삭제 → 권한 확인 → 설계서 공유',
    desc:'개발 시작 전 사양을 철저히 확인하는 대화 — 애매한 요건을 명확하게 만드는 실전 시나리오',
    items:['itsp_n','itsp_1','itsp_2','itsp_3','itsp_4','itsp_5','itsp_6','itsp_7','itsp_8','itsp_9','itsp_10']
  },
  {
    id:'sim_it_intro', phase:12, type:'sim', simlevel:7, dialogue:true,
    name:'입사 첫날 자기소개', icon:'👋',
    title:'롤플레이: 입사 첫날 자기소개',
    subtitle:'이름·출신 → 경력·기술 → 잘 부탁 → 환경 구축',
    desc:'일본 IT 회사 첫날 — 팀원 앞 자기소개부터 개발 환경 구축 시작까지 완전한 시나리오',
    items:['iti_n','iti_1','iti_2','iti_3','iti_4','iti_5','iti_6','iti_7','iti_8']
  },

  // ══════════════════════════════════════════════════════════
  //  Curriculum support categories — exact item lists for v2 modules
  // ══════════════════════════════════════════════════════════
  {
    id:'food_restaurant', phase:7, type:'word', wlevel:7,
    name:'음식·식당 어휘', icon:'🍜',
    title:'W7 음식·식당 어휘',
    subtitle:'ラーメン·寿司·お会計',
    desc:'주문과 계산에 바로 쓰는 음식·식당 핵심 어휘',
    items:['food_ramen','food_sushi','food_tempura','food_udon','food_soba','food_onigiri','food_miso','food_sake','food_biru','food_mizu','food_ocha','food_menu','food_teishoku','food_ikura','food_okane','food_irashai','food_toriaezu','food_yakitori','food_moriawase','food_otsumami','food_edamame','food_izakaya']
  },
  {
    id:'keigo_basics', phase:13, type:'word', wlevel:11,
    name:'경어 핵심 표현', icon:'🎌',
    title:'심화 경어 핵심 표현',
    subtitle:'承知しました·かしこまりました·ご確認ください',
    desc:'업무·서비스 상황에서 바로 쓰는 존중 표현과 격식 표현',
    items:['biz_shochi','biz_kashiko','biz_osewa','biz_confirm','biz_kakunin','biz_renraku','biz_ossharu','biz_ikaga','biz_iken','biz_wakarima','biz_kansha','gr_namae']
  },
];
