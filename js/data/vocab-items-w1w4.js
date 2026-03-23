// ============================================================
//  단어 항목 — W1(인사·표현어) / W2(숫자) / W3(날짜) / W4(대명사)
// ============================================================
const VOCAB_ITEMS_W1W4 = [

  // ── W1: 인사 단어 (basic_words) ─────────────────────────
  { id:'w1_ohayo',      japanese:'おはようございます',   korean:'안녕하세요 (아침)',      english:'Good morning',              tip:'おはよう = 친한 사이 가벼운 표현' },
  { id:'w1_konnichiwa', japanese:'こんにちは',           korean:'안녕하세요 (낮)',         english:'Hello / Good afternoon' },
  { id:'w1_konbanwa',   japanese:'こんばんは',           korean:'안녕하세요 (저녁)',       english:'Good evening' },
  { id:'w1_oyasumi',    japanese:'おやすみなさい',       korean:'잘 자요 / 안녕히 주무세요', english:'Good night',             tip:'친한 사이: おやすみ' },
  { id:'w1_sayonara',   japanese:'さようなら',           korean:'안녕히 가세요 (작별)',   english:'Goodbye (formal farewell)', tip:'またね = 또 봐요 (가벼운 표현)' },
  { id:'gr_hai',        japanese:'はい',                 korean:'네 / 예',               english:'Yes',                       tip:'いいえ = 아니요' },
  { id:'gr_iie',        japanese:'いいえ',               korean:'아니요',                 english:'No' },

  // ── W1: 필수 표현어 (essential_phrases) ─────────────────
  { id:'gr_arigatou',   japanese:'ありがとうございます',  korean:'감사합니다 (정중)',              english:'Thank you very much',            tip:'ありがとう만도 OK (가벼운 감사)' },
  { id:'gr_sumimasen',  japanese:'すみません',            korean:'실례합니다 / 저기요 / 미안해요', english:'Excuse me / Sorry',              tip:'점원 부를 때, 지나갈 때, 사과할 때 모두 사용' },
  { id:'gr_onegai',     japanese:'おねがいします',        korean:'부탁합니다',                    english:'Please (request)',               example:'〜をください、おねがいします' },
  { id:'gr_wakaran',    japanese:'わかりません',          korean:'모르겠습니다 / 이해 못 했습니다', english:"I don't understand" },
  { id:'gr_yoroshiku',  japanese:'よろしくおねがいします', korean:'잘 부탁드립니다',               english:'Nice to meet you / Please treat me well' },
  { id:'gr_shitsurei',  japanese:'しつれいします',        kanji:'失礼します',                     korean:'실례하겠습니다 (자리 뜰 때 등)',  english:'Excuse me (when leaving/entering)' },

  // ── W2: 숫자 기본 (numbers_basic) ───────────────────────
  { id:'num_1',     japanese:'いち',       kanji:'一',   korean:'일 (1)',        english:'One',              tip:'물건 셀 때: ひとつ (一つ)' },
  { id:'num_2',     japanese:'に',         kanji:'二',   korean:'이 (2)',        english:'Two',              tip:'물건 셀 때: ふたつ (二つ)' },
  { id:'num_3',     japanese:'さん',       kanji:'三',   korean:'삼 (3)',        english:'Three' },
  { id:'num_4',     japanese:'し・よん',   kanji:'四',   korean:'사 (4)',        english:'Four',             tip:'よん이 더 안전 (し는 死와 혼동)' },
  { id:'num_5',     japanese:'ご',         kanji:'五',   korean:'오 (5)',        english:'Five' },
  { id:'num_6',     japanese:'ろく',       kanji:'六',   korean:'육 (6)',        english:'Six' },
  { id:'num_7',     japanese:'なな・しち', kanji:'七',   korean:'칠 (7)',        english:'Seven',            tip:'なな가 더 명확 (しち는 혼동 주의)' },
  { id:'num_8',     japanese:'はち',       kanji:'八',   korean:'팔 (8)',        english:'Eight' },
  { id:'num_9',     japanese:'きゅう・く', kanji:'九',   korean:'구 (9)',        english:'Nine',             tip:'きゅう가 더 명확' },
  { id:'num_10',    japanese:'じゅう',     kanji:'十',   korean:'십 (10)',       english:'Ten' },
  { id:'num_100',   japanese:'ひゃく',     kanji:'百',   korean:'백 (100)',      english:'One hundred',      example:'さんびゃく = 300' },
  { id:'num_1000',  japanese:'せん',       kanji:'千',   korean:'천 (1000)',     english:'One thousand',     example:'ごせん = 5000' },
  { id:'num_10000', japanese:'まん',       kanji:'万',   korean:'만 (10,000)',   english:'Ten thousand',     tip:'일본 화폐 단위의 핵심! ¥10,000 = いちまんえん' },

  // ── W2: 숫자 응용 (numbers_applied) ─────────────────────
  { id:'nap_yen',   japanese:'えん',              kanji:'円',     korean:'엔 (¥)',                      english:'Yen (Japanese currency)',    example:'これはいくらですか？ (얼마예요?)' },
  { id:'nap_num11', japanese:'じゅういち',         kanji:'十一',   korean:'11',                         english:'Eleven',                     tip:'십의 자리 + 일의 자리 붙이면 됨' },
  { id:'nap_num20', japanese:'にじゅう',           kanji:'二十',   korean:'20',                         english:'Twenty' },
  { id:'nap_num21', japanese:'にじゅういち',       kanji:'二十一', korean:'21',                         english:'Twenty-one' },
  { id:'nap_num50', japanese:'ごじゅう',           kanji:'五十',   korean:'50',                         english:'Fifty' },
  { id:'nap_num99', japanese:'きゅうじゅうきゅう', kanji:'九十九', korean:'99',                         english:'Ninety-nine' },
  { id:'nap_500',   japanese:'ごひゃく',           kanji:'五百',   korean:'500',                        english:'Five hundred',               example:'ごひゃくえん = 500엔 (동전)' },
  { id:'nap_mai',   japanese:'まい',               kanji:'枚',     korean:'장 (평평한 물건 세는 단위)',  english:'Flat object counter (sheets/tickets)', example:'チケットにまい = 티켓 2장' },
  { id:'nap_hon',   japanese:'ほん',               kanji:'本',     korean:'자루/병 (가늘고 긴 물건)',   english:'Long/thin object counter (pens/bottles)', example:'ペンいっぽん = 펜 한 자루' },
  { id:'nap_ko',    japanese:'こ',                 kanji:'個',     korean:'개 (작고 둥근 물건)',         english:'Small round object counter', example:'りんごみっこ = 사과 3개' },

  // ── W3: 날짜·시간 (datetime) ────────────────────────────
  { id:'dt_today',  japanese:'きょう',      kanji:'今日',       korean:'오늘',        english:'Today' },
  { id:'dt_tmrw',   japanese:'あした',      kanji:'明日',       korean:'내일',        english:'Tomorrow' },
  { id:'dt_yest',   japanese:'きのう',      kanji:'昨日',       korean:'어제',        english:'Yesterday' },
  { id:'dt_now',    japanese:'いま',        kanji:'今',         korean:'지금',        english:'Now' },
  { id:'dt_ji',     japanese:'〜じ',        kanji:'〜時',       korean:'〜시 (시각)', english:'~ o\'clock',          example:'にじ = 2시' },
  { id:'dt_fun',    japanese:'〜ふん',      kanji:'〜分',       korean:'〜분',        english:'~ minutes',           tip:'1,6,8,10분은 っぷん 발음' },
  { id:'dt_han',    japanese:'はん',        kanji:'半',         korean:'반 (30분)',   english:'Half (past the hour)', example:'にじはん = 2시 반' },
  { id:'dt_mon',    japanese:'げつようび',  kanji:'月曜日(げつようび)', korean:'월요일', english:'Monday' },
  { id:'dt_tue',    japanese:'かようび',    kanji:'火曜日(かようび)',   korean:'화요일', english:'Tuesday' },
  { id:'dt_wed',    japanese:'すいようび',  kanji:'水曜日(すいようび)', korean:'수요일', english:'Wednesday' },
  { id:'dt_thu',    japanese:'もくようび',  kanji:'木曜日(もくようび)', korean:'목요일', english:'Thursday' },
  { id:'dt_fri',    japanese:'きんようび',  kanji:'金曜日(きんようび)', korean:'금요일', english:'Friday' },
  { id:'dt_sat',    japanese:'どようび',    kanji:'土曜日(どようび)',   korean:'토요일', english:'Saturday' },
  { id:'dt_sun',    japanese:'にちようび',  kanji:'日曜日(にちようび)', korean:'일요일', english:'Sunday' },
  { id:'dt_am',     japanese:'ごぜん',      kanji:'午前(ごぜん)',  korean:'오전 (AM)', english:'AM / Morning' },
  { id:'dt_pm',     japanese:'ごご',        kanji:'午後(ごご)',    korean:'오후 (PM)', english:'PM / Afternoon' },
  { id:'dt_nan',    japanese:'なんじですか', kanji:'何時(なんじ)ですか', korean:'몇 시예요?', english:'What time is it?', tip:'시간 물어볼 때 핵심 표현' },
  { id:'dt_open',   japanese:'えいぎょうちゅう', kanji:'営業中(えいぎょうちゅう)', korean:'영업 중 (OPEN)', english:'Open for business', tip:'가게/식당 문 앞에서 자주 봄' },

  // ── W4: 대명사·지시어 (pronouns_basic) ──────────────────
  { id:'prn_1',  japanese:'わたし',   kanji:'私',   korean:'나/저',          english:'I / Me (polite, gender-neutral)', tip:'남녀 공용 정중 표현. 「私、これにします」' },
  { id:'prn_2',  japanese:'ぼく',     kanji:'僕',   korean:'나 (남성)',       english:'I / Me (male, casual)',           tip:'남성 가벼운 표현. 「僕もそれ食べたい！」' },
  { id:'prn_3',  japanese:'あなた',                 korean:'당신/너',         english:'You (neutral/intimate)',           tip:'부부 사이에도 쓰임. 「あなたはどうする？」' },
  { id:'prn_4',  japanese:'かれ',     kanji:'彼',   korean:'그 (남성)',       english:'He / Boyfriend',                  tip:'남자친구·남편을 지칭. 「彼、日本語うまいね」' },
  { id:'prn_5',  japanese:'かのじょ', kanji:'彼女', korean:'그녀',            english:'She / Girlfriend',                tip:'여자친구·아내를 지칭. 「彼女はどこ？」' },
  { id:'prn_6',  japanese:'これ',                   korean:'이것 (바로 앞)',  english:'This (near speaker)',             tip:'손에 들거나 가까이 있는 것. 「これください」' },
  { id:'prn_7',  japanese:'それ',                   korean:'그것 (상대방 쪽)', english:'That (near listener)',           tip:'상대방 가까이 있는 것. 「それ、おいしそう！」' },
  { id:'prn_8',  japanese:'あれ',                   korean:'저것 (멀리)',     english:'That (far from both)',            tip:'둘 다 멀리 있는 것. 「あれ、何？」' },
  { id:'prn_9',  japanese:'ここ',                   korean:'여기',            english:'Here',                            tip:'말하는 사람 근처. 「ここ座れる？」' },
  { id:'prn_10', japanese:'そこ',                   korean:'거기',            english:'There (near listener)',           tip:'상대방 근처. 「そこで待ってて」' },
  { id:'prn_11', japanese:'あそこ',                 korean:'저기',            english:'Over there',                      tip:'둘 다에게서 먼 곳. 「あそこに出口がある」' },
  { id:'prn_12', japanese:'この',                   korean:'이 〜',           english:'This ~ (modifier)',               tip:'この+명사. 「このラーメン、辛い？」' },
  { id:'prn_13', japanese:'その',                   korean:'그 〜',           english:'That ~ (modifier, near listener)', tip:'その+명사. 「そのバッグ、かわいい！」' },
  { id:'prn_14', japanese:'あの',                   korean:'저 〜',           english:'That ~ (modifier, far)',          tip:'あの+명사. 「あのお店、入ろう」' },

  // ── W1: 맞장구·반응어 (w1_reactions) ─────────────────────
  { id:'w1_sodesu',        japanese:'そうですね',      korean:'그렇네요',              english:'I see / That\'s right (agreeing)',  tip:'끄덕이며 공감할 때. 일본 대화에서 가장 빈번한 표현' },
  { id:'w1_naruhodo',      japanese:'なるほど',         korean:'아 그렇구나 / 납득',    english:'I see / That makes sense',          tip:'이해·납득했을 때. 「なるほど、そういうことか」' },
  { id:'w1_hontou',        japanese:'ほんとうですか',   kanji:'本当(ほんとう)ですか',   korean:'정말이요? / 진짜요?',   english:'Really? / Is that true?',           tip:'놀람·확인 두루 사용. 가볍게는 ほんと？' },
  { id:'w1_wakarimashita', japanese:'わかりました',     kanji:'分(わ)かりました',       korean:'알겠습니다',             english:'I understand / Got it',             tip:'모를 땐 わかりません. OK도 통함' },
  { id:'w1_daijoubu',      japanese:'だいじょうぶです', kanji:'大丈夫(だいじょうぶ)です', korean:'괜찮아요',             english:'It\'s okay / No problem',           example:'大丈夫(だいじょうぶ)ですか？ = 괜찮아요? (질문형)' },

  // ── W2: 날짜 숫자·월일 (num_dates) ───────────────────────
  { id:'dn_ichigatsu',  japanese:'いちがつ',    kanji:'一月(いちがつ)',   korean:'1월',            english:'January',   tip:'2月=にがつ, 3月=さんがつ ... 月は「がつ」로 읽음' },
  { id:'dn_gogatsu',    japanese:'ごがつ',      kanji:'五月(ごがつ)',     korean:'5월',            english:'May',        tip:'ゴールデンウィーク (5/3~5) 대연휴!' },
  { id:'dn_juunigatsu', japanese:'じゅうにがつ', kanji:'十二月(じゅうにがつ)', korean:'12월',       english:'December',  tip:'お正月(おしょうがつ)シーズン. 12月は寒いです' },
  { id:'dn_tsuitachi',  japanese:'ついたち',    kanji:'一日(ついたち)',   korean:'1일 (초하루)',    english:'1st of the month', tip:'特殊な読み方 ついたち・ふつか・みっか・よっか...' },
  { id:'dn_tooka',      japanese:'とおか',      kanji:'十日(とおか)',     korean:'10일',           english:'10th of the month', tip:'1~10日까지 특수 읽기. 11日~는 〜にち로 OK' },
  { id:'dn_hatsuuka',   japanese:'はつか',      kanji:'二十日(はつか)',   korean:'20일',           english:'20th of the month', tip:'20日만 특수 읽기. 21日~=にじゅう〜にち' },
];
