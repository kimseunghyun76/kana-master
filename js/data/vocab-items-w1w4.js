// ============================================================
//  단어 항목 — W1(인사·표현어) / W2(숫자) / W3(날짜) / W4(대명사)
// ============================================================
const VOCAB_ITEMS_W1W4 = [

  // ── W1: 인사 단어 (basic_words) ─────────────────────────
  { id:'w1_ohayo',      japanese:'おはようございます',  romaji:'ohayou gozaimasu',  korean:'안녕하세요 (아침)',      tip:'おはよう = 친한 사이 가벼운 표현' },
  { id:'w1_konnichiwa', japanese:'こんにちは',          romaji:'konnichiwa',        korean:'안녕하세요 (낮)' },
  { id:'w1_konbanwa',   japanese:'こんばんは',          romaji:'konbanwa',          korean:'안녕하세요 (저녁)' },
  { id:'w1_oyasumi',    japanese:'おやすみなさい',      romaji:'oyasuminasai',      korean:'잘 자요 / 안녕히 주무세요', tip:'친한 사이: おやすみ' },
  { id:'w1_sayonara',   japanese:'さようなら',          romaji:'sayounara',         korean:'안녕히 가세요 (작별)',   tip:'またね = 또 봐요 (가벼운 표현)' },
  { id:'gr_hai',        japanese:'はい',                romaji:'hai',               korean:'네 / 예',               tip:'いいえ = 아니요' },
  { id:'gr_iie',        japanese:'いいえ',              romaji:'iie',               korean:'아니요' },

  // ── W1: 필수 표현어 (essential_phrases) ─────────────────
  { id:'gr_arigatou',   japanese:'ありがとうございます',  romaji:'arigatou gozaimasu',       korean:'감사합니다 (정중)',              tip:'ありがとう만도 OK (가벼운 감사)' },
  { id:'gr_sumimasen',  japanese:'すみません',            romaji:'sumimasen',                 korean:'실례합니다 / 저기요 / 미안해요', tip:'점원 부를 때, 지나갈 때, 사과할 때 모두 사용' },
  { id:'gr_onegai',     japanese:'おねがいします',        romaji:'onegaishimasu',             korean:'부탁합니다',                    example:'〜をください、おねがいします' },
  { id:'gr_wakaran',    japanese:'わかりません',          romaji:'wakarimasen',               korean:'모르겠습니다 / 이해 못 했습니다' },
  { id:'gr_yoroshiku',  japanese:'よろしくおねがいします', romaji:'yoroshiku onegaishimasu',   korean:'잘 부탁드립니다' },
  { id:'gr_shitsurei',  japanese:'しつれいします',        kanji:'失礼します',                  romaji:'shitsurei shimasu',            korean:'실례하겠습니다 (자리 뜰 때 등)' },

  // ── W2: 숫자 기본 (numbers_basic) ───────────────────────
  { id:'num_1',     japanese:'いち',       kanji:'一',   romaji:'ichi',        korean:'일 (1)',        tip:'물건 셀 때: ひとつ (一つ)' },
  { id:'num_2',     japanese:'に',         kanji:'二',   romaji:'ni',          korean:'이 (2)',        tip:'물건 셀 때: ふたつ (二つ)' },
  { id:'num_3',     japanese:'さん',       kanji:'三',   romaji:'san',         korean:'삼 (3)' },
  { id:'num_4',     japanese:'し・よん',   kanji:'四',   romaji:'shi/yon',     korean:'사 (4)',        tip:'よん이 더 안전 (し는 死와 혼동)' },
  { id:'num_5',     japanese:'ご',         kanji:'五',   romaji:'go',          korean:'오 (5)' },
  { id:'num_6',     japanese:'ろく',       kanji:'六',   romaji:'roku',        korean:'육 (6)' },
  { id:'num_7',     japanese:'なな・しち', kanji:'七',   romaji:'nana/shichi', korean:'칠 (7)',        tip:'なな가 더 명확 (しち는 혼동 주의)' },
  { id:'num_8',     japanese:'はち',       kanji:'八',   romaji:'hachi',       korean:'팔 (8)' },
  { id:'num_9',     japanese:'きゅう・く', kanji:'九',   romaji:'kyu/ku',      korean:'구 (9)',        tip:'きゅう가 더 명확' },
  { id:'num_10',    japanese:'じゅう',     kanji:'十',   romaji:'juu',         korean:'십 (10)' },
  { id:'num_100',   japanese:'ひゃく',     kanji:'百',   romaji:'hyaku',       korean:'백 (100)',      example:'さんびゃく = 300' },
  { id:'num_1000',  japanese:'せん',       kanji:'千',   romaji:'sen',         korean:'천 (1000)',     example:'ごせん = 5000' },
  { id:'num_10000', japanese:'まん',       kanji:'万',   romaji:'man',         korean:'만 (10,000)',   tip:'일본 화폐 단위의 핵심! ¥10,000 = いちまんえん' },

  // ── W2: 숫자 응용 (numbers_applied) ─────────────────────
  { id:'nap_yen',   japanese:'えん',              kanji:'円',     romaji:'en',           korean:'엔 (¥)',                      example:'これはいくらですか？ (얼마예요?)' },
  { id:'nap_num11', japanese:'じゅういち',         kanji:'十一',   romaji:'juu-ichi',     korean:'11',                         tip:'십의 자리 + 일의 자리 붙이면 됨' },
  { id:'nap_num20', japanese:'にじゅう',           kanji:'二十',   romaji:'ni-juu',       korean:'20' },
  { id:'nap_num21', japanese:'にじゅういち',       kanji:'二十一', romaji:'ni-juu-ichi',  korean:'21' },
  { id:'nap_num50', japanese:'ごじゅう',           kanji:'五十',   romaji:'go-juu',       korean:'50' },
  { id:'nap_num99', japanese:'きゅうじゅうきゅう', kanji:'九十九', romaji:'kyu-juu-kyu',  korean:'99' },
  { id:'nap_500',   japanese:'ごひゃく',           kanji:'五百',   romaji:'go-hyaku',     korean:'500',                        example:'ごひゃくえん = 500엔 (동전)' },
  { id:'nap_mai',   japanese:'まい',               kanji:'枚',     romaji:'mai',          korean:'장 (평평한 물건 세는 단위)',  example:'チケットにまい = 티켓 2장' },
  { id:'nap_hon',   japanese:'ほん',               kanji:'本',     romaji:'hon',          korean:'자루/병 (가늘고 긴 물건)',   example:'ペンいっぽん = 펜 한 자루' },
  { id:'nap_ko',    japanese:'こ',                 kanji:'個',     romaji:'ko',           korean:'개 (작고 둥근 물건)',         example:'りんごみっこ = 사과 3개' },

  // ── W3: 날짜·시간 (datetime) ────────────────────────────
  { id:'dt_today',  japanese:'きょう',      kanji:'今日',  romaji:'kyou',      korean:'오늘' },
  { id:'dt_tmrw',   japanese:'あした',      kanji:'明日',  romaji:'ashita',    korean:'내일' },
  { id:'dt_yest',   japanese:'きのう',      kanji:'昨日',  romaji:'kinou',     korean:'어제' },
  { id:'dt_now',    japanese:'いま',        kanji:'今',    romaji:'ima',       korean:'지금' },
  { id:'dt_ji',     japanese:'〜じ',        kanji:'〜時',  romaji:'~ji',       korean:'〜시 (시각)',  example:'にじ = 2시' },
  { id:'dt_fun',    japanese:'〜ふん',      kanji:'〜分',  romaji:'~fun/pun',  korean:'〜분',         tip:'1,6,8,10분은 っぷん 발음' },
  { id:'dt_han',    japanese:'はん',        kanji:'半',    romaji:'han',       korean:'반 (30분)',    example:'にじはん = 2시 반' },
  { id:'dt_mon',    japanese:'げつようび',  kanji:'月曜日', romaji:'getsuyoubi', korean:'월요일' },
  { id:'dt_tue',    japanese:'かようび',    kanji:'火曜日', romaji:'kayoubi',   korean:'화요일' },
  { id:'dt_wed',    japanese:'すいようび',  kanji:'水曜日', romaji:'suiyoubi',  korean:'수요일' },
  { id:'dt_thu',    japanese:'もくようび',  kanji:'木曜日', romaji:'mokuyoubi', korean:'목요일' },
  { id:'dt_fri',    japanese:'きんようび',  kanji:'金曜日', romaji:'kinyoubi',  korean:'금요일' },
  { id:'dt_sat',    japanese:'どようび',    kanji:'土曜日', romaji:'doyoubi',   korean:'토요일' },
  { id:'dt_sun',    japanese:'にちようび',  kanji:'日曜日', romaji:'nichiyoubi', korean:'일요일' },
  { id:'dt_am',     japanese:'ごぜん',      kanji:'午前',  romaji:'gozen',     korean:'오전 (AM)' },
  { id:'dt_pm',     japanese:'ごご',        kanji:'午後',  romaji:'gogo',      korean:'오후 (PM)' },
  { id:'dt_nan',    japanese:'なんじですか', kanji:'何時ですか', romaji:'nanji desu ka', korean:'몇 시예요?', tip:'시간 물어볼 때 핵심 표현' },
  { id:'dt_open',   japanese:'えいぎょうちゅう', kanji:'営業中', romaji:'eigyouchuu', korean:'영업 중 (OPEN)', tip:'가게/식당 문 앞에서 자주 봄' },

  // ── W4: 대명사·지시어 (pronouns_basic) ──────────────────
  { id:'prn_1',  japanese:'わたし',  kanji:'私',  romaji:'watashi', korean:'나/저',          tip:'남녀 공용 정중 표현. 「私、これにします」' },
  { id:'prn_2',  japanese:'ぼく',    kanji:'僕',  romaji:'boku',    korean:'나 (남성)',       tip:'남성 가벼운 표현. 「僕もそれ食べたい！」' },
  { id:'prn_3',  japanese:'あなた',               romaji:'anata',   korean:'당신/너',         tip:'부부 사이에도 쓰임. 「あなたはどうする？」' },
  { id:'prn_4',  japanese:'かれ',    kanji:'彼',  romaji:'kare',    korean:'그 (남성)',        tip:'남자친구·남편을 지칭. 「彼、日本語うまいね」' },
  { id:'prn_5',  japanese:'かのじょ',kanji:'彼女', romaji:'kanojo', korean:'그녀',             tip:'여자친구·아내를 지칭. 「彼女はどこ？」' },
  { id:'prn_6',  japanese:'これ',                 romaji:'kore',    korean:'이것 (바로 앞)',   tip:'손에 들거나 가까이 있는 것. 「これください」' },
  { id:'prn_7',  japanese:'それ',                 romaji:'sore',    korean:'그것 (상대방 쪽)', tip:'상대방 가까이 있는 것. 「それ、おいしそう！」' },
  { id:'prn_8',  japanese:'あれ',                 romaji:'are',     korean:'저것 (멀리)',      tip:'둘 다 멀리 있는 것. 「あれ、何？」' },
  { id:'prn_9',  japanese:'ここ',                 romaji:'koko',    korean:'여기',             tip:'말하는 사람 근처. 「ここ座れる？」' },
  { id:'prn_10', japanese:'そこ',                 romaji:'soko',    korean:'거기',             tip:'상대방 근처. 「そこで待ってて」' },
  { id:'prn_11', japanese:'あそこ',               romaji:'asoko',   korean:'저기',             tip:'둘 다에게서 먼 곳. 「あそこに出口がある」' },
  { id:'prn_12', japanese:'この',                 romaji:'kono',    korean:'이 〜',            tip:'この+명사. 「このラーメン、辛い？」' },
  { id:'prn_13', japanese:'その',                 romaji:'sono',    korean:'그 〜',            tip:'その+명사. 「そのバッグ、かわいい！」' },
  { id:'prn_14', japanese:'あの',                 romaji:'ano',     korean:'저 〜',            tip:'あの+명사. 「あのお店、入ろう」' },

  // ── W1: 맞장구·반응어 (w1_reactions) ─────────────────────
  { id:'w1_sodesu',        japanese:'そうですね',      romaji:'sou desu ne',    korean:'그렇네요',              tip:'끄덕이며 공감할 때. 일본 대화에서 가장 빈번한 표현' },
  { id:'w1_naruhodo',      japanese:'なるほど',         romaji:'naruhodo',       korean:'아 그렇구나 / 납득',    tip:'이해·납득했을 때. 「なるほど、そういうことか」' },
  { id:'w1_hontou',        japanese:'ほんとうですか',   kanji:'本当ですか',       romaji:'hontou desu ka',       korean:'정말이요? / 진짜요?',   tip:'놀람·확인 두루 사용. 가볍게는 ほんと？' },
  { id:'w1_wakarimashita', japanese:'わかりました',     kanji:'分かりました',     romaji:'wakarimashita',        korean:'알겠습니다',             tip:'모를 땐 わかりません. OK도 통함' },
  { id:'w1_daijoubu',      japanese:'だいじょうぶです', kanji:'大丈夫です',       romaji:'daijoubu desu',        korean:'괜찮아요',               example:'大丈夫ですか？ = 괜찮아요? (질문형)' },

  // ── W2: 날짜 숫자·월일 (num_dates) ───────────────────────
  { id:'dn_ichigatsu',  japanese:'いちがつ',    kanji:'一月',   romaji:'ichi-gatsu',  korean:'1월',            tip:'2月=にがつ, 3月=さんがつ ... 月は「がつ」로 읽음' },
  { id:'dn_gogatsu',    japanese:'ごがつ',      kanji:'五月',   romaji:'go-gatsu',    korean:'5월',            tip:'ゴールデンウィーク (5/3~5) 대연휴!' },
  { id:'dn_juunigatsu', japanese:'じゅうにがつ', kanji:'十二月', romaji:'juuni-gatsu', korean:'12월',           tip:'お正月シーズン. 12月は寒いです' },
  { id:'dn_tsuitachi',  japanese:'ついたち',    kanji:'一日',   romaji:'tsuitachi',   korean:'1일 (초하루)',    tip:'特殊な読み方 ついたち・ふつか・みっか・よっか...' },
  { id:'dn_tooka',      japanese:'とおか',      kanji:'十日',   romaji:'tooka',       korean:'10일',           tip:'1~10日까지 특수 읽기. 11日~는 〜にち로 OK' },
  { id:'dn_hatsuuka',   japanese:'はつか',      kanji:'二十日', romaji:'hatsuka',     korean:'20일',           tip:'20日만 특수 읽기. 21日~=にじゅう〜にち' },
];
