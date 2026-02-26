// ============================================================
// KANA DATA - 히라가나 + 가타가나 (탁음·반탁음·요음 포함)
// 각 항목: { kana, romaji, korean, english, type, examples[] }
// ============================================================

const LEVELS = [
  {
    id: 1,
    name: 'Level 1',
    title: '히라가나 기본 ①',
    subtitle: 'あ행 · か행 · さ행',
    desc: '가장 기본적인 15자. 일본어의 첫걸음!',
    type: 'hiragana',
    chars: ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ'],
    unlockXP: 0
  },
  {
    id: 2,
    name: 'Level 2',
    title: '히라가나 기본 ②',
    subtitle: 'た행 · な행 · は행',
    desc: '일상에서 자주 쓰이는 15자를 마스터!',
    type: 'hiragana',
    chars: ['た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ'],
    unlockXP: 150
  },
  {
    id: 3,
    name: 'Level 3',
    title: '히라가나 기본 ③',
    subtitle: 'ま행 · や행 · ら행 · わ행 · ん',
    desc: '나머지 히라가나를 완성하자!',
    type: 'hiragana',
    chars: ['ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'],
    unlockXP: 350
  },
  {
    id: 4,
    name: 'Level 4',
    title: '히라가나 탁음 (濁音)',
    subtitle: 'が·ざ·だ·ば행',
    desc: '탁점(゛)이 붙는 탁음 20자!',
    type: 'hiragana_dakuten',
    chars: ['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ'],
    unlockXP: 600
  },
  {
    id: 5,
    name: 'Level 5',
    title: '히라가나 반탁음 + 요음 ①',
    subtitle: 'ぱ행 + きゃ·しゃ·ちゃ',
    desc: '반탁점(゜) 5자와 요음 첫 그룹!',
    type: 'hiragana_handakuten',
    chars: ['ぱ','ぴ','ぷ','ぺ','ぽ','きゃ','きゅ','きょ','しゃ','しゅ','しょ','ちゃ','ちゅ','ちょ'],
    unlockXP: 900
  },
  {
    id: 6,
    name: 'Level 6',
    title: '히라가나 요음 ②',
    subtitle: 'にゃ·ひゃ·みゃ·りゃ + 탁음 요음',
    desc: '남은 요음과 탁음 요음을 완성!',
    type: 'hiragana_yoon',
    chars: ['にゃ','にゅ','にょ','ひゃ','ひゅ','ひょ','みゃ','みゅ','みょ','りゃ','りゅ','りょ','ぎゃ','ぎゅ','ぎょ','じゃ','じゅ','じょ','びゃ','びゅ','びょ','ぴゃ','ぴゅ','ぴょ'],
    unlockXP: 1200
  },
  {
    id: 7,
    name: 'Level 7',
    title: '가타가나 기본 ①',
    subtitle: 'ア행 · カ행 · サ행',
    desc: '외래어를 표기하는 가타가나 시작!',
    type: 'katakana',
    chars: ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ'],
    unlockXP: 1600
  },
  {
    id: 8,
    name: 'Level 8',
    title: '가타가나 기본 ②',
    subtitle: 'タ행 · ナ행 · ハ행',
    desc: '가타가나 중간 15자!',
    type: 'katakana',
    chars: ['タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ'],
    unlockXP: 2000
  },
  {
    id: 9,
    name: 'Level 9',
    title: '가타가나 기본 ③',
    subtitle: 'マ행 · ヤ행 · ラ행 · ワ행 · ン',
    desc: '가타가나 기본을 완성!',
    type: 'katakana',
    chars: ['マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン'],
    unlockXP: 2400
  },
  {
    id: 10,
    name: 'Level 10',
    title: '가타가나 탁음 + 반탁음',
    subtitle: 'ガ·ザ·ダ·バ·パ행',
    desc: '가타가나 탁음과 반탁음 25자!',
    type: 'katakana_dakuten',
    chars: ['ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'],
    unlockXP: 2900
  },
  {
    id: 11,
    name: 'Level 11',
    title: '가타가나 요음 + 종합',
    subtitle: 'キャ·シャ·チャ등 + 전체 복습',
    desc: '마지막 레벨! 요음 완성 후 전체 복습.',
    type: 'katakana_yoon',
    chars: ['キャ','キュ','キョ','シャ','シュ','ショ','チャ','チュ','チョ','ニャ','ニュ','ニョ','ヒャ','ヒュ','ヒョ','ミャ','ミュ','ミョ','リャ','リュ','リョ','ギャ','ギュ','ギョ','ジャ','ジュ','ジョ','ビャ','ビュ','ビョ','ピャ','ピュ','ピョ'],
    unlockXP: 3400
  }
];

// ----------------------------------------------------------------
// 개별 가나 데이터
// ----------------------------------------------------------------
const KANA_MAP = {
  // ─────────────────── 히라가나 기본 ───────────────────
  'あ': { romaji:'a',   korean:'아', english:'ah',    type:'hiragana',
    examples:[{word:'あか',reading:'a·ka',meaning:'빨강 (red)'},{word:'あさ',reading:'a·sa',meaning:'아침 (morning)'},{word:'あに',reading:'a·ni',meaning:'오빠/형 (older brother)'}]},
  'い': { romaji:'i',   korean:'이', english:'ee',    type:'hiragana',
    examples:[{word:'いぬ',reading:'i·nu',meaning:'개 (dog)'},{word:'いえ',reading:'i·e',meaning:'집 (house)'},{word:'いち',reading:'i·chi',meaning:'1 (one)'}]},
  'う': { romaji:'u',   korean:'우', english:'oo',    type:'hiragana',
    examples:[{word:'うみ',reading:'u·mi',meaning:'바다 (sea)'},{word:'うた',reading:'u·ta',meaning:'노래 (song)'},{word:'うで',reading:'u·de',meaning:'팔 (arm)'}]},
  'え': { romaji:'e',   korean:'에', english:'eh',    type:'hiragana',
    examples:[{word:'えき',reading:'e·ki',meaning:'역 (station)'},{word:'えほん',reading:'e·hon',meaning:'그림책 (picture book)'},{word:'えいご',reading:'e·i·go',meaning:'영어 (English)'}]},
  'お': { romaji:'o',   korean:'오', english:'oh',    type:'hiragana',
    examples:[{word:'おかあさん',reading:'o·kā·san',meaning:'어머니 (mother)'},{word:'おとうさん',reading:'o·tō·san',meaning:'아버지 (father)'},{word:'おちゃ',reading:'o·cha',meaning:'녹차 (green tea)'}]},

  'か': { romaji:'ka',  korean:'카', english:'kah',   type:'hiragana',
    examples:[{word:'かさ',reading:'ka·sa',meaning:'우산 (umbrella)'},{word:'かわ',reading:'ka·wa',meaning:'강 (river)'},{word:'かお',reading:'ka·o',meaning:'얼굴 (face)'}]},
  'き': { romaji:'ki',  korean:'키', english:'key',   type:'hiragana',
    examples:[{word:'きって',reading:'kit·te',meaning:'우표 (stamp)'},{word:'きのこ',reading:'ki·no·ko',meaning:'버섯 (mushroom)'},{word:'きれい',reading:'ki·rē',meaning:'예쁘다 (beautiful)'}]},
  'く': { romaji:'ku',  korean:'쿠', english:'koo',   type:'hiragana',
    examples:[{word:'くも',reading:'ku·mo',meaning:'구름 (cloud)'},{word:'くち',reading:'ku·chi',meaning:'입 (mouth)'},{word:'くに',reading:'ku·ni',meaning:'나라 (country)'}]},
  'け': { romaji:'ke',  korean:'케', english:'keh',   type:'hiragana',
    examples:[{word:'けさ',reading:'ke·sa',meaning:'오늘 아침 (this morning)'},{word:'けむり',reading:'ke·mu·ri',meaning:'연기 (smoke)'},{word:'げんき',reading:'gen·ki',meaning:'건강 (healthy)'}]},
  'こ': { romaji:'ko',  korean:'코', english:'koh',   type:'hiragana',
    examples:[{word:'こえ',reading:'ko·e',meaning:'목소리 (voice)'},{word:'ここ',reading:'ko·ko',meaning:'여기 (here)'},{word:'こども',reading:'ko·do·mo',meaning:'어린이 (child)'}]},

  'さ': { romaji:'sa',  korean:'사', english:'sah',   type:'hiragana',
    examples:[{word:'さかな',reading:'sa·ka·na',meaning:'물고기 (fish)'},{word:'さくら',reading:'sa·ku·ra',meaning:'벚꽃 (cherry blossom)'},{word:'さとう',reading:'sa·tō',meaning:'설탕 (sugar)'}]},
  'し': { romaji:'shi', korean:'시', english:'shee',  type:'hiragana',
    examples:[{word:'しろ',reading:'shi·ro',meaning:'하얀색 (white)'},{word:'しごと',reading:'shi·go·to',meaning:'일 (work)'},{word:'しんかんせん',reading:'shin·kan·sen',meaning:'신칸센 (bullet train)'}]},
  'す': { romaji:'su',  korean:'스', english:'soo',   type:'hiragana',
    examples:[{word:'すし',reading:'su·shi',meaning:'초밥 (sushi)'},{word:'すいか',reading:'su·i·ka',meaning:'수박 (watermelon)'},{word:'すき',reading:'su·ki',meaning:'좋아함 (like)'}]},
  'せ': { romaji:'se',  korean:'세', english:'seh',   type:'hiragana',
    examples:[{word:'せかい',reading:'se·kai',meaning:'세계 (world)'},{word:'せんせい',reading:'sen·sē',meaning:'선생님 (teacher)'},{word:'せっけん',reading:'sek·ken',meaning:'비누 (soap)'}]},
  'そ': { romaji:'so',  korean:'소', english:'soh',   type:'hiragana',
    examples:[{word:'そら',reading:'so·ra',meaning:'하늘 (sky)'},{word:'そと',reading:'so·to',meaning:'바깥 (outside)'},{word:'そば',reading:'so·ba',meaning:'소바 (soba noodles)'}]},

  // ─── た행 ───
  'た': { romaji:'ta',  korean:'타', english:'tah',   type:'hiragana',
    examples:[{word:'たこ',reading:'ta·ko',meaning:'문어 (octopus)'},{word:'たまご',reading:'ta·ma·go',meaning:'계란 (egg)'},{word:'ともだち',reading:'to·mo·da·chi',meaning:'친구 (friend)'}]},
  'ち': { romaji:'chi', korean:'치', english:'chee',  type:'hiragana',
    examples:[{word:'ちず',reading:'chi·zu',meaning:'지도 (map)'},{word:'ちから',reading:'chi·ka·ra',meaning:'힘 (strength)'},{word:'ちかてつ',reading:'chi·ka·te·tsu',meaning:'지하철 (subway)'}]},
  'つ': { romaji:'tsu', korean:'츠', english:'tsoo',  type:'hiragana',
    examples:[{word:'つき',reading:'tsu·ki',meaning:'달 (moon)'},{word:'つくえ',reading:'tsu·ku·e',meaning:'책상 (desk)'},{word:'つり',reading:'tsu·ri',meaning:'낚시 (fishing)'}]},
  'て': { romaji:'te',  korean:'테', english:'teh',   type:'hiragana',
    examples:[{word:'てがみ',reading:'te·ga·mi',meaning:'편지 (letter)'},{word:'てんき',reading:'ten·ki',meaning:'날씨 (weather)'},{word:'てんぷら',reading:'ten·pu·ra',meaning:'튀김 (tempura)'}]},
  'と': { romaji:'to',  korean:'토', english:'toh',   type:'hiragana',
    examples:[{word:'とり',reading:'to·ri',meaning:'새 (bird)'},{word:'とけい',reading:'to·kē',meaning:'시계 (clock)'},{word:'としょかん',reading:'to·sho·kan',meaning:'도서관 (library)'}]},

  // ─── な행 ───
  'な': { romaji:'na',  korean:'나', english:'nah',   type:'hiragana',
    examples:[{word:'なまえ',reading:'na·ma·e',meaning:'이름 (name)'},{word:'なつ',reading:'na·tsu',meaning:'여름 (summer)'},{word:'なに',reading:'na·ni',meaning:'무엇 (what)'}]},
  'に': { romaji:'ni',  korean:'니', english:'nee',   type:'hiragana',
    examples:[{word:'にほん',reading:'ni·hon',meaning:'일본 (Japan)'},{word:'にわ',reading:'ni·wa',meaning:'정원 (garden)'},{word:'にじ',reading:'ni·ji',meaning:'무지개 (rainbow)'}]},
  'ぬ': { romaji:'nu',  korean:'누', english:'noo',   type:'hiragana',
    examples:[{word:'ぬの',reading:'nu·no',meaning:'천/옷감 (cloth)'},{word:'ぬりえ',reading:'nu·ri·e',meaning:'색칠 공부 (coloring book)'},{word:'ぬいぐるみ',reading:'nu·i·gu·ru·mi',meaning:'봉제 인형 (stuffed toy)'}]},
  'ね': { romaji:'ne',  korean:'네', english:'neh',   type:'hiragana',
    examples:[{word:'ねこ',reading:'ne·ko',meaning:'고양이 (cat)'},{word:'ねむい',reading:'ne·mu·i',meaning:'졸리다 (sleepy)'},{word:'ねつ',reading:'ne·tsu',meaning:'열 (fever)'}]},
  'の': { romaji:'no',  korean:'노', english:'noh',   type:'hiragana',
    examples:[{word:'のみもの',reading:'no·mi·mo·no',meaning:'음료 (drink)'},{word:'のり',reading:'no·ri',meaning:'김/풀 (seaweed/glue)'},{word:'のこり',reading:'no·ko·ri',meaning:'나머지 (remainder)'}]},

  // ─── は행 ───
  'は': { romaji:'ha',  korean:'하', english:'hah',   type:'hiragana',
    examples:[{word:'はな',reading:'ha·na',meaning:'꽃/코 (flower/nose)'},{word:'はる',reading:'ha·ru',meaning:'봄 (spring)'},{word:'はし',reading:'ha·shi',meaning:'젓가락/다리 (chopsticks/bridge)'}]},
  'ひ': { romaji:'hi',  korean:'히', english:'hee',   type:'hiragana',
    examples:[{word:'ひかり',reading:'hi·ka·ri',meaning:'빛 (light)'},{word:'ひと',reading:'hi·to',meaning:'사람 (person)'},{word:'ひこうき',reading:'hi·kō·ki',meaning:'비행기 (airplane)'}]},
  'ふ': { romaji:'fu',  korean:'후', english:'foo',   type:'hiragana',
    examples:[{word:'ふじさん',reading:'fu·ji·san',meaning:'후지산 (Mt. Fuji)'},{word:'ふゆ',reading:'fu·yu',meaning:'겨울 (winter)'},{word:'ふね',reading:'fu·ne',meaning:'배 (ship)'}]},
  'へ': { romaji:'he',  korean:'헤', english:'heh',   type:'hiragana',
    examples:[{word:'へや',reading:'he·ya',meaning:'방 (room)'},{word:'へいわ',reading:'hē·wa',meaning:'평화 (peace)'},{word:'へそ',reading:'he·so',meaning:'배꼽 (belly button)'}]},
  'ほ': { romaji:'ho',  korean:'호', english:'hoh',   type:'hiragana',
    examples:[{word:'ほん',reading:'hon',meaning:'책 (book)'},{word:'ほし',reading:'ho·shi',meaning:'별 (star)'},{word:'ほんとう',reading:'hon·tō',meaning:'정말 (really)'}]},

  // ─── ま행 ───
  'ま': { romaji:'ma',  korean:'마', english:'mah',   type:'hiragana',
    examples:[{word:'まち',reading:'ma·chi',meaning:'도시/마을 (town)'},{word:'まど',reading:'ma·do',meaning:'창문 (window)'},{word:'まつり',reading:'ma·tsu·ri',meaning:'축제 (festival)'}]},
  'み': { romaji:'mi',  korean:'미', english:'mee',   type:'hiragana',
    examples:[{word:'みず',reading:'mi·zu',meaning:'물 (water)'},{word:'みどり',reading:'mi·do·ri',meaning:'초록 (green)'},{word:'みち',reading:'mi·chi',meaning:'길 (road)'}]},
  'む': { romaji:'mu',  korean:'무', english:'moo',   type:'hiragana',
    examples:[{word:'むし',reading:'mu·shi',meaning:'벌레 (insect)'},{word:'むすめ',reading:'mu·su·me',meaning:'딸 (daughter)'},{word:'むら',reading:'mu·ra',meaning:'마을 (village)'}]},
  'め': { romaji:'me',  korean:'메', english:'meh',   type:'hiragana',
    examples:[{word:'めがね',reading:'me·ga·ne',meaning:'안경 (glasses)'},{word:'めだか',reading:'me·da·ka',meaning:'송사리 (killifish)'},{word:'めずらしい',reading:'me·zu·ra·shī',meaning:'드물다 (rare)'}]},
  'も': { romaji:'mo',  korean:'모', english:'moh',   type:'hiragana',
    examples:[{word:'もり',reading:'mo·ri',meaning:'숲 (forest)'},{word:'もの',reading:'mo·no',meaning:'물건 (thing)'},{word:'もち',reading:'mo·chi',meaning:'떡 (rice cake)'}]},

  // ─── や행 ───
  'や': { romaji:'ya',  korean:'야', english:'yah',   type:'hiragana',
    examples:[{word:'やま',reading:'ya·ma',meaning:'산 (mountain)'},{word:'やさい',reading:'ya·sa·i',meaning:'채소 (vegetable)'},{word:'やさしい',reading:'ya·sa·shī',meaning:'상냥하다 (kind)'}]},
  'ゆ': { romaji:'yu',  korean:'유', english:'yoo',   type:'hiragana',
    examples:[{word:'ゆき',reading:'yu·ki',meaning:'눈 (snow)'},{word:'ゆめ',reading:'yu·me',meaning:'꿈 (dream)'},{word:'ゆびわ',reading:'yu·bi·wa',meaning:'반지 (ring)'}]},
  'よ': { romaji:'yo',  korean:'요', english:'yoh',   type:'hiragana',
    examples:[{word:'よる',reading:'yo·ru',meaning:'밤 (night)'},{word:'よみかた',reading:'yo·mi·ka·ta',meaning:'읽는 법 (how to read)'},{word:'よてい',reading:'yo·tē',meaning:'예정 (schedule)'}]},

  // ─── ら행 ───
  'ら': { romaji:'ra',  korean:'라', english:'rah',   type:'hiragana',
    examples:[{word:'らいねん',reading:'rai·nen',meaning:'내년 (next year)'},{word:'らく',reading:'ra·ku',meaning:'편하다 (comfortable)'},{word:'らっぱ',reading:'rap·pa',meaning:'나팔 (trumpet)'}]},
  'り': { romaji:'ri',  korean:'리', english:'ree',   type:'hiragana',
    examples:[{word:'りんご',reading:'rin·go',meaning:'사과 (apple)'},{word:'りょこう',reading:'ryo·kō',meaning:'여행 (travel)'},{word:'りょうり',reading:'ryō·ri',meaning:'요리 (cooking)'}]},
  'る': { romaji:'ru',  korean:'루', english:'roo',   type:'hiragana',
    examples:[{word:'るすばん',reading:'ru·su·ban',meaning:'집 보기 (house-sitting)'},{word:'るいじ',reading:'ru·i·ji',meaning:'유사 (similar)'}]},
  'れ': { romaji:'re',  korean:'레', english:'reh',   type:'hiragana',
    examples:[{word:'れんしゅう',reading:'ren·shū',meaning:'연습 (practice)'},{word:'れきし',reading:'re·ki·shi',meaning:'역사 (history)'},{word:'れいぞうこ',reading:'rē·zō·ko',meaning:'냉장고 (refrigerator)'}]},
  'ろ': { romaji:'ro',  korean:'로', english:'roh',   type:'hiragana',
    examples:[{word:'ろうか',reading:'rō·ka',meaning:'복도 (hallway)'},{word:'ろく',reading:'ro·ku',meaning:'6 (six)'},{word:'ろうそく',reading:'rō·so·ku',meaning:'양초 (candle)'}]},

  // ─── わ·を·ん ───
  'わ': { romaji:'wa',  korean:'와', english:'wah',   type:'hiragana',
    examples:[{word:'わたし',reading:'wa·ta·shi',meaning:'나 (I/me)'},{word:'わに',reading:'wa·ni',meaning:'악어 (crocodile)'},{word:'わらう',reading:'wa·ra·u',meaning:'웃다 (laugh)'}]},
  'を': { romaji:'wo',  korean:'오', english:'oh',    type:'hiragana',
    examples:[{word:'〜を食べる',reading:'~wo ta·be·ru',meaning:'~을 먹다 (to eat ~)'},{word:'〜を見る',reading:'~wo mi·ru',meaning:'~을 보다 (to see ~)'}]},
  'ん': { romaji:'n',   korean:'음', english:'n/m',   type:'hiragana',
    examples:[{word:'にほん',reading:'ni·hon',meaning:'일본 (Japan)'},{word:'てんき',reading:'ten·ki',meaning:'날씨 (weather)'},{word:'さんぽ',reading:'san·po',meaning:'산책 (walk)'}]},

  // ─────────────────── 히라가나 탁음 (濁音) ───────────────────
  'が': { romaji:'ga',  korean:'가', english:'gah',   type:'hiragana_dakuten',
    examples:[{word:'がっこう',reading:'gak·kō',meaning:'학교 (school)'},{word:'がいこく',reading:'gai·ko·ku',meaning:'외국 (foreign country)'},{word:'がんばる',reading:'gan·ba·ru',meaning:'열심히 하다 (do one\'s best)'}]},
  'ぎ': { romaji:'gi',  korean:'기', english:'gee',   type:'hiragana_dakuten',
    examples:[{word:'ぎゅうにゅう',reading:'gyū·nyū',meaning:'우유 (milk)'},{word:'ぎんこう',reading:'gin·kō',meaning:'은행 (bank)'},{word:'ぎじゅつ',reading:'gi·ju·tsu',meaning:'기술 (technology)'}]},
  'ぐ': { romaji:'gu',  korean:'구', english:'goo',   type:'hiragana_dakuten',
    examples:[{word:'ぐち',reading:'gu·chi',meaning:'불평 (complaint)'},{word:'ぐんて',reading:'gun·te',meaning:'장갑 (work gloves)'},{word:'ぐたい',reading:'gu·tai',meaning:'구체적 (concrete)'}]},
  'げ': { romaji:'ge',  korean:'게', english:'geh',   type:'hiragana_dakuten',
    examples:[{word:'げんき',reading:'gen·ki',meaning:'건강함 (healthy)'},{word:'げいじゅつ',reading:'gē·ju·tsu',meaning:'예술 (art)'},{word:'げた',reading:'ge·ta',meaning:'나막신 (wooden clogs)'}]},
  'ご': { romaji:'go',  korean:'고', english:'goh',   type:'hiragana_dakuten',
    examples:[{word:'ごはん',reading:'go·han',meaning:'밥/식사 (meal/rice)'},{word:'ごご',reading:'go·go',meaning:'오후 (afternoon)'},{word:'ごちそう',reading:'go·chi·sō',meaning:'잔치 (feast)'}]},

  'ざ': { romaji:'za',  korean:'자', english:'zah',   type:'hiragana_dakuten',
    examples:[{word:'ざっし',reading:'zas·shi',meaning:'잡지 (magazine)'},{word:'ざいりょう',reading:'zai·ryō',meaning:'재료 (ingredient)'},{word:'ざんねん',reading:'zan·nen',meaning:'아쉽다 (unfortunate)'}]},
  'じ': { romaji:'ji',  korean:'지', english:'jee',   type:'hiragana_dakuten',
    examples:[{word:'じかん',reading:'ji·kan',meaning:'시간 (time)'},{word:'じしん',reading:'ji·shin',meaning:'지진 (earthquake)'},{word:'じどうしゃ',reading:'ji·dō·sha',meaning:'자동차 (car)'}]},
  'ず': { romaji:'zu',  korean:'즈', english:'zoo',   type:'hiragana_dakuten',
    examples:[{word:'ずっと',reading:'zut·to',meaning:'계속 (all the time)'},{word:'ずかん',reading:'zu·kan',meaning:'도감 (illustrated book)'},{word:'ずつう',reading:'zu·tsū',meaning:'두통 (headache)'}]},
  'ぜ': { romaji:'ze',  korean:'제', english:'zeh',   type:'hiragana_dakuten',
    examples:[{word:'ぜんぶ',reading:'zen·bu',meaning:'전부 (all)'},{word:'ぜったい',reading:'zet·tai',meaning:'절대 (absolutely)'},{word:'ぜいきん',reading:'zē·kin',meaning:'세금 (tax)'}]},
  'ぞ': { romaji:'zo',  korean:'조', english:'zoh',   type:'hiragana_dakuten',
    examples:[{word:'ぞう',reading:'zō',meaning:'코끼리 (elephant)'},{word:'ぞうきん',reading:'zō·kin',meaning:'걸레 (cleaning rag)'},{word:'ぞんざい',reading:'zon·za·i',meaning:'무례함 (rudeness)'}]},

  'だ': { romaji:'da',  korean:'다', english:'dah',   type:'hiragana_dakuten',
    examples:[{word:'だいがく',reading:'dai·ga·ku',meaning:'대학교 (university)'},{word:'だいじょうぶ',reading:'dai·jō·bu',meaning:'괜찮아요 (it\'s okay)'},{word:'だれ',reading:'da·re',meaning:'누구 (who)'}]},
  'ぢ': { romaji:'ji',  korean:'지', english:'jee',   type:'hiragana_dakuten',
    examples:[{word:'はなぢ',reading:'ha·na·ji',meaning:'코피 (nosebleed)'},{word:'ちぢむ',reading:'chi·ji·mu',meaning:'줄어들다 (shrink)'}]},
  'づ': { romaji:'zu',  korean:'즈', english:'zoo',   type:'hiragana_dakuten',
    examples:[{word:'つづく',reading:'tsu·zu·ku',meaning:'계속되다 (continue)'},{word:'こづかい',reading:'ko·zu·kai',meaning:'용돈 (pocket money)'}]},
  'で': { romaji:'de',  korean:'데', english:'deh',   type:'hiragana_dakuten',
    examples:[{word:'でんしゃ',reading:'den·sha',meaning:'전철 (train)'},{word:'でんわ',reading:'den·wa',meaning:'전화 (phone)'},{word:'でんき',reading:'den·ki',meaning:'전기/전등 (electricity/light)'}]},
  'ど': { romaji:'do',  korean:'도', english:'doh',   type:'hiragana_dakuten',
    examples:[{word:'どうぶつ',reading:'dō·bu·tsu',meaning:'동물 (animal)'},{word:'どうぞ',reading:'dō·zo',meaning:'어서요 (please/here you go)'},{word:'どこ',reading:'do·ko',meaning:'어디 (where)'}]},

  'ば': { romaji:'ba',  korean:'바', english:'bah',   type:'hiragana_dakuten',
    examples:[{word:'ばら',reading:'ba·ra',meaning:'장미 (rose)'},{word:'ばんごはん',reading:'ban·go·han',meaning:'저녁밥 (dinner)'},{word:'ばしょ',reading:'ba·sho',meaning:'장소 (place)'}]},
  'び': { romaji:'bi',  korean:'비', english:'bee',   type:'hiragana_dakuten',
    examples:[{word:'びっくり',reading:'bik·ku·ri',meaning:'깜짝 (surprised)'},{word:'びょうき',reading:'byō·ki',meaning:'병 (illness)'},{word:'びじゅつ',reading:'bi·ju·tsu',meaning:'미술 (fine art)'}]},
  'ぶ': { romaji:'bu',  korean:'부', english:'boo',   type:'hiragana_dakuten',
    examples:[{word:'ぶどう',reading:'bu·dō',meaning:'포도 (grapes)'},{word:'ぶた',reading:'bu·ta',meaning:'돼지 (pig)'},{word:'ぶんか',reading:'bun·ka',meaning:'문화 (culture)'}]},
  'べ': { romaji:'be',  korean:'베', english:'beh',   type:'hiragana_dakuten',
    examples:[{word:'べんきょう',reading:'ben·kyō',meaning:'공부 (study)'},{word:'べんとう',reading:'ben·tō',meaning:'도시락 (lunchbox)'},{word:'べつ',reading:'be·tsu',meaning:'별도 (separate)'}]},
  'ぼ': { romaji:'bo',  korean:'보', english:'boh',   type:'hiragana_dakuten',
    examples:[{word:'ぼうし',reading:'bō·shi',meaning:'모자 (hat)'},{word:'ぼく',reading:'bo·ku',meaning:'나(남성) (I - male)'},{word:'ぼんやり',reading:'bon·ya·ri',meaning:'멍하니 (absent-minded)'}]},

  // ─────────────────── 히라가나 반탁음 (半濁音) ───────────────────
  'ぱ': { romaji:'pa',  korean:'파', english:'pah',   type:'hiragana_handakuten',
    examples:[{word:'パン',reading:'pan',meaning:'빵 (bread)'},{word:'パパ',reading:'pa·pa',meaning:'아빠 (papa)'},{word:'ぱちぱち',reading:'pa·chi·pa·chi',meaning:'박수 소리 (clapping sound)'}]},
  'ぴ': { romaji:'pi',  korean:'피', english:'pee',   type:'hiragana_handakuten',
    examples:[{word:'ピアノ',reading:'pi·a·no',meaning:'피아노 (piano)'},{word:'ぴかぴか',reading:'pi·ka·pi·ka',meaning:'반짝반짝 (sparkling)'},{word:'ピンク',reading:'pin·ku',meaning:'분홍 (pink)'}]},
  'ぷ': { romaji:'pu',  korean:'푸', english:'poo',   type:'hiragana_handakuten',
    examples:[{word:'プール',reading:'pū·ru',meaning:'수영장 (pool)'},{word:'プリン',reading:'pu·rin',meaning:'푸딩 (pudding)'},{word:'プレゼント',reading:'pu·re·zen·to',meaning:'선물 (present)'}]},
  'ぺ': { romaji:'pe',  korean:'페', english:'peh',   type:'hiragana_handakuten',
    examples:[{word:'ペン',reading:'pen',meaning:'펜 (pen)'},{word:'ペット',reading:'pet·to',meaning:'반려동물 (pet)'},{word:'ぺらぺら',reading:'pe·ra·pe·ra',meaning:'유창하다 (fluent)'}]},
  'ぽ': { romaji:'po',  korean:'포', english:'poh',   type:'hiragana_handakuten',
    examples:[{word:'ポケット',reading:'po·ket·to',meaning:'주머니 (pocket)'},{word:'ぽかぽか',reading:'po·ka·po·ka',meaning:'따뜻하다 (warm)'},{word:'ポスト',reading:'pos·to',meaning:'우체통 (mailbox)'}]},

  // ─────────────────── 히라가나 요음 (拗音) ───────────────────
  'きゃ': { romaji:'kya', korean:'캬', english:'kyah', type:'hiragana_yoon',
    examples:[{word:'きゃく',reading:'kya·ku',meaning:'손님 (guest)'},{word:'きゃっかん',reading:'kyak·kan',meaning:'객관 (objective)'}]},
  'きゅ': { romaji:'kyu', korean:'큐', english:'kyoo', type:'hiragana_yoon',
    examples:[{word:'きゅうきゅうしゃ',reading:'kyū·kyū·sha',meaning:'구급차 (ambulance)'},{word:'きゅうり',reading:'kyū·ri',meaning:'오이 (cucumber)'}]},
  'きょ': { romaji:'kyo', korean:'쿄', english:'kyoh', type:'hiragana_yoon',
    examples:[{word:'きょうと',reading:'kyō·to',meaning:'교토 (Kyoto)'},{word:'きょうしつ',reading:'kyō·shi·tsu',meaning:'교실 (classroom)'}]},

  'しゃ': { romaji:'sha', korean:'샤', english:'shah', type:'hiragana_yoon',
    examples:[{word:'しゃしん',reading:'sha·shin',meaning:'사진 (photo)'},{word:'しゃかい',reading:'sha·kai',meaning:'사회 (society)'}]},
  'しゅ': { romaji:'shu', korean:'슈', english:'shoo', type:'hiragana_yoon',
    examples:[{word:'しゅみ',reading:'shu·mi',meaning:'취미 (hobby)'},{word:'しゅくだい',reading:'shu·ku·dai',meaning:'숙제 (homework)'}]},
  'しょ': { romaji:'sho', korean:'쇼', english:'shoh', type:'hiragana_yoon',
    examples:[{word:'しょうがっこう',reading:'shō·gak·kō',meaning:'초등학교 (elementary school)'},{word:'しょくじ',reading:'sho·ku·ji',meaning:'식사 (meal)'}]},

  'ちゃ': { romaji:'cha', korean:'차', english:'chah', type:'hiragana_yoon',
    examples:[{word:'おちゃ',reading:'o·cha',meaning:'녹차 (green tea)'},{word:'ちゃいろ',reading:'cha·i·ro',meaning:'갈색 (brown)'}]},
  'ちゅ': { romaji:'chu', korean:'추', english:'choo', type:'hiragana_yoon',
    examples:[{word:'ちゅうい',reading:'chū·i',meaning:'주의 (attention)'},{word:'ちゅうもん',reading:'chū·mon',meaning:'주문 (order)'}]},
  'ちょ': { romaji:'cho', korean:'쵸', english:'choh', type:'hiragana_yoon',
    examples:[{word:'ちょっと',reading:'chot·to',meaning:'잠깐/조금 (a little)'},{word:'ちょうど',reading:'chō·do',meaning:'딱/마침 (just right)'}]},

  'にゃ': { romaji:'nya', korean:'냐', english:'nyah', type:'hiragana_yoon',
    examples:[{word:'にゃんこ',reading:'nyan·ko',meaning:'고양이(애칭) (kitty)'},{word:'にゃー',reading:'nyā',meaning:'야옹 (meow)'}]},
  'にゅ': { romaji:'nyu', korean:'뉴', english:'nyoo', type:'hiragana_yoon',
    examples:[{word:'にゅうがく',reading:'nyū·ga·ku',meaning:'입학 (enrollment)'},{word:'にゅうす',reading:'nyū·su',meaning:'뉴스 (news)'}]},
  'にょ': { romaji:'nyo', korean:'뇨', english:'nyoh', type:'hiragana_yoon',
    examples:[{word:'にょきにょき',reading:'nyo·ki·nyo·ki',meaning:'쑥쑥 자라다 (growing rapidly)'}]},

  'ひゃ': { romaji:'hya', korean:'햐', english:'hyah', type:'hiragana_yoon',
    examples:[{word:'ひゃく',reading:'hya·ku',meaning:'100 (hundred)'},{word:'ひゃっかてん',reading:'hyak·ka·ten',meaning:'백화점 (department store)'}]},
  'ひゅ': { romaji:'hyu', korean:'휴', english:'hyoo', type:'hiragana_yoon',
    examples:[{word:'ひゅーひゅー',reading:'hyū·hyū',meaning:'바람 소리 (whistling wind)'}]},
  'ひょ': { romaji:'hyo', korean:'효', english:'hyoh', type:'hiragana_yoon',
    examples:[{word:'ひょう',reading:'hyō',meaning:'우박/표 (hail/chart)'},{word:'ひょうじ',reading:'hyō·ji',meaning:'표시 (display)'}]},

  'みゃ': { romaji:'mya', korean:'먀', english:'myah', type:'hiragana_yoon',
    examples:[{word:'みゃく',reading:'mya·ku',meaning:'맥박 (pulse)'}]},
  'みゅ': { romaji:'myu', korean:'뮤', english:'myoo', type:'hiragana_yoon',
    examples:[{word:'みゅーじっく',reading:'myū·jik·ku',meaning:'뮤직 (music)'}]},
  'みょ': { romaji:'myo', korean:'묘', english:'myoh', type:'hiragana_yoon',
    examples:[{word:'みょうじ',reading:'myō·ji',meaning:'성(씨) (last name)'}]},

  'りゃ': { romaji:'rya', korean:'랴', english:'ryah', type:'hiragana_yoon',
    examples:[{word:'りゃくご',reading:'rya·ku·go',meaning:'약어 (abbreviation)'}]},
  'りゅ': { romaji:'ryu', korean:'류', english:'ryoo', type:'hiragana_yoon',
    examples:[{word:'りゅうがく',reading:'ryū·ga·ku',meaning:'유학 (study abroad)'},{word:'りゅうこう',reading:'ryū·kō',meaning:'유행 (trend)'}]},
  'りょ': { romaji:'ryo', korean:'료', english:'ryoh', type:'hiragana_yoon',
    examples:[{word:'りょこう',reading:'ryo·kō',meaning:'여행 (travel)'},{word:'りょうり',reading:'ryō·ri',meaning:'요리 (cooking)'}]},

  'ぎゃ': { romaji:'gya', korean:'갸', english:'gyah', type:'hiragana_yoon',
    examples:[{word:'ぎゃく',reading:'gya·ku',meaning:'반대 (reverse)'},{word:'ぎゃくてん',reading:'gya·ku·ten',meaning:'역전 (reversal)'}]},
  'ぎゅ': { romaji:'gyu', korean:'규', english:'gyoo', type:'hiragana_yoon',
    examples:[{word:'ぎゅうにく',reading:'gyū·ni·ku',meaning:'소고기 (beef)'},{word:'ぎゅうにゅう',reading:'gyū·nyū',meaning:'우유 (milk)'}]},
  'ぎょ': { romaji:'gyo', korean:'교', english:'gyoh', type:'hiragana_yoon',
    examples:[{word:'ぎょうざ',reading:'gyō·za',meaning:'만두 (gyoza/dumplings)'},{word:'ぎょうじ',reading:'gyō·ji',meaning:'행사 (event)'}]},

  'じゃ': { romaji:'ja',  korean:'자', english:'jah',  type:'hiragana_yoon',
    examples:[{word:'じゃがいも',reading:'ja·ga·i·mo',meaning:'감자 (potato)'},{word:'じゃんけん',reading:'jan·ken',meaning:'가위바위보 (rock-paper-scissors)'}]},
  'じゅ': { romaji:'ju',  korean:'주', english:'joo',  type:'hiragana_yoon',
    examples:[{word:'じゅうしょ',reading:'jū·sho',meaning:'주소 (address)'},{word:'じゅぎょう',reading:'ju·gyō',meaning:'수업 (class/lesson)'}]},
  'じょ': { romaji:'jo',  korean:'조', english:'joh',  type:'hiragana_yoon',
    examples:[{word:'じょうず',reading:'jō·zu',meaning:'잘한다 (skillful)'},{word:'じょせい',reading:'jo·sē',meaning:'여성 (female)'}]},

  'びゃ': { romaji:'bya', korean:'뱌', english:'byah', type:'hiragana_yoon',
    examples:[{word:'びゃく',reading:'bya·ku',meaning:'밝은 (bright/pure)'}]},
  'びゅ': { romaji:'byu', korean:'뷰', english:'byoo', type:'hiragana_yoon',
    examples:[{word:'びゅーびゅー',reading:'byū·byū',meaning:'바람 소리 (whistling sound)'}]},
  'びょ': { romaji:'byo', korean:'뵤', english:'byoh', type:'hiragana_yoon',
    examples:[{word:'びょうき',reading:'byō·ki',meaning:'병 (illness)'},{word:'びょういん',reading:'byō·in',meaning:'병원 (hospital)'}]},

  'ぴゃ': { romaji:'pya', korean:'퍄', english:'pyah', type:'hiragana_yoon',
    examples:[{word:'ぴゃーぴゃー',reading:'pyā·pyā',meaning:'꽥꽥 소리 (squealing)'}]},
  'ぴゅ': { romaji:'pyu', korean:'퓨', english:'pyoo', type:'hiragana_yoon',
    examples:[{word:'ぴゅーっと',reading:'pyūt·to',meaning:'쌩 하고 (swoosh)'}]},
  'ぴょ': { romaji:'pyo', korean:'표', english:'pyoh', type:'hiragana_yoon',
    examples:[{word:'ぴょんぴょん',reading:'pyon·pyon',meaning:'깡충깡충 (hopping)'}]},

  // ─────────────────── 가타가나 기본 ───────────────────
  'ア': { romaji:'a',   korean:'아', english:'ah',    type:'katakana',
    examples:[{word:'アイス',reading:'a·i·su',meaning:'아이스크림 (ice cream)'},{word:'アメリカ',reading:'a·me·ri·ka',meaning:'미국 (America)'},{word:'アニメ',reading:'a·ni·me',meaning:'애니메이션 (anime)'}]},
  'イ': { romaji:'i',   korean:'이', english:'ee',    type:'katakana',
    examples:[{word:'イタリア',reading:'i·ta·ri·a',meaning:'이탈리아 (Italy)'},{word:'インターネット',reading:'in·tā·net·to',meaning:'인터넷 (internet)'}]},
  'ウ': { romaji:'u',   korean:'우', english:'oo',    type:'katakana',
    examples:[{word:'ウイルス',reading:'u·i·ru·su',meaning:'바이러스 (virus)'},{word:'ウクレレ',reading:'u·ku·re·re',meaning:'우쿨렐레 (ukulele)'}]},
  'エ': { romaji:'e',   korean:'에', english:'eh',    type:'katakana',
    examples:[{word:'エアコン',reading:'e·a·kon',meaning:'에어컨 (air conditioner)'},{word:'エレベーター',reading:'e·re·bē·tā',meaning:'엘리베이터 (elevator)'}]},
  'オ': { romaji:'o',   korean:'오', english:'oh',    type:'katakana',
    examples:[{word:'オレンジ',reading:'o·ren·ji',meaning:'오렌지 (orange)'},{word:'オーストラリア',reading:'ō·su·to·ra·ri·a',meaning:'호주 (Australia)'}]},

  'カ': { romaji:'ka',  korean:'카', english:'kah',   type:'katakana',
    examples:[{word:'カメラ',reading:'ka·me·ra',meaning:'카메라 (camera)'},{word:'カフェ',reading:'ka·fe',meaning:'카페 (cafe)'},{word:'カレー',reading:'ka·rē',meaning:'카레 (curry)'}]},
  'キ': { romaji:'ki',  korean:'키', english:'key',   type:'katakana',
    examples:[{word:'キッチン',reading:'kit·chin',meaning:'부엌 (kitchen)'},{word:'キャンプ',reading:'kyan·pu',meaning:'캠핑 (camping)'}]},
  'ク': { romaji:'ku',  korean:'쿠', english:'koo',   type:'katakana',
    examples:[{word:'クラス',reading:'ku·ra·su',meaning:'클래스 (class)'},{word:'クリスマス',reading:'ku·ri·su·ma·su',meaning:'크리스마스 (Christmas)'}]},
  'ケ': { romaji:'ke',  korean:'케', english:'keh',   type:'katakana',
    examples:[{word:'ケーキ',reading:'kē·ki',meaning:'케이크 (cake)'},{word:'ケータイ',reading:'kē·tai',meaning:'휴대폰 (mobile phone)'}]},
  'コ': { romaji:'ko',  korean:'코', english:'koh',   type:'katakana',
    examples:[{word:'コーヒー',reading:'kō·hī',meaning:'커피 (coffee)'},{word:'コンビニ',reading:'kon·bi·ni',meaning:'편의점 (convenience store)'}]},

  'サ': { romaji:'sa',  korean:'사', english:'sah',   type:'katakana',
    examples:[{word:'サラダ',reading:'sa·ra·da',meaning:'샐러드 (salad)'},{word:'サッカー',reading:'sak·kā',meaning:'축구 (soccer)'}]},
  'シ': { romaji:'shi', korean:'시', english:'shee',  type:'katakana',
    examples:[{word:'シャツ',reading:'sha·tsu',meaning:'셔츠 (shirt)'},{word:'システム',reading:'shi·su·te·mu',meaning:'시스템 (system)'}]},
  'ス': { romaji:'su',  korean:'스', english:'soo',   type:'katakana',
    examples:[{word:'スポーツ',reading:'su·pō·tsu',meaning:'스포츠 (sports)'},{word:'スマホ',reading:'su·ma·ho',meaning:'스마트폰 (smartphone)'}]},
  'セ': { romaji:'se',  korean:'세', english:'seh',   type:'katakana',
    examples:[{word:'セーター',reading:'sē·tā',meaning:'스웨터 (sweater)'},{word:'センター',reading:'sen·tā',meaning:'센터 (center)'}]},
  'ソ': { romaji:'so',  korean:'소', english:'soh',   type:'katakana',
    examples:[{word:'ソファ',reading:'so·fa',meaning:'소파 (sofa)'},{word:'ソフトウェア',reading:'so·fu·to·u·e·a',meaning:'소프트웨어 (software)'}]},

  'タ': { romaji:'ta',  korean:'타', english:'tah',   type:'katakana',
    examples:[{word:'タクシー',reading:'ta·ku·shī',meaning:'택시 (taxi)'},{word:'テーブル',reading:'tē·bu·ru',meaning:'테이블 (table)'}]},
  'チ': { romaji:'chi', korean:'치', english:'chee',  type:'katakana',
    examples:[{word:'チーズ',reading:'chī·zu',meaning:'치즈 (cheese)'},{word:'チケット',reading:'chi·ket·to',meaning:'티켓 (ticket)'}]},
  'ツ': { romaji:'tsu', korean:'츠', english:'tsoo',  type:'katakana',
    examples:[{word:'ツアー',reading:'tsu·ā',meaning:'투어 (tour)'},{word:'ツイッター',reading:'tsu·it·tā',meaning:'트위터 (Twitter)'}]},
  'テ': { romaji:'te',  korean:'테', english:'teh',   type:'katakana',
    examples:[{word:'テレビ',reading:'te·re·bi',meaning:'TV (television)'},{word:'テスト',reading:'tes·to',meaning:'시험 (test)'}]},
  'ト': { romaji:'to',  korean:'토', english:'toh',   type:'katakana',
    examples:[{word:'トマト',reading:'to·ma·to',meaning:'토마토 (tomato)'},{word:'トイレ',reading:'to·i·re',meaning:'화장실 (toilet)'}]},

  'ナ': { romaji:'na',  korean:'나', english:'nah',   type:'katakana',
    examples:[{word:'ナイフ',reading:'na·i·fu',meaning:'나이프 (knife)'},{word:'ナンバー',reading:'nan·bā',meaning:'번호 (number)'}]},
  'ニ': { romaji:'ni',  korean:'니', english:'nee',   type:'katakana',
    examples:[{word:'ニュース',reading:'nyū·su',meaning:'뉴스 (news)'},{word:'ニコニコ',reading:'ni·ko·ni·ko',meaning:'니코니코 (smiling)'}]},
  'ヌ': { romaji:'nu',  korean:'누', english:'noo',   type:'katakana',
    examples:[{word:'ヌードル',reading:'nū·do·ru',meaning:'누들 (noodle)'},{word:'ヌード',reading:'nū·do',meaning:'누드 (nude)'}]},
  'ネ': { romaji:'ne',  korean:'네', english:'neh',   type:'katakana',
    examples:[{word:'ネット',reading:'net·to',meaning:'인터넷/망 (net)'},{word:'ネクタイ',reading:'ne·ku·tai',meaning:'넥타이 (necktie)'}]},
  'ノ': { romaji:'no',  korean:'노', english:'noh',   type:'katakana',
    examples:[{word:'ノート',reading:'nō·to',meaning:'노트 (notebook)'},{word:'ノック',reading:'nok·ku',meaning:'노크 (knock)'}]},

  'ハ': { romaji:'ha',  korean:'하', english:'hah',   type:'katakana',
    examples:[{word:'ハンバーガー',reading:'han·bā·gā',meaning:'햄버거 (hamburger)'},{word:'ハワイ',reading:'ha·wai',meaning:'하와이 (Hawaii)'}]},
  'ヒ': { romaji:'hi',  korean:'히', english:'hee',   type:'katakana',
    examples:[{word:'ヒーロー',reading:'hī·rō',meaning:'히어로 (hero)'},{word:'ヒント',reading:'hin·to',meaning:'힌트 (hint)'}]},
  'フ': { romaji:'fu',  korean:'후', english:'foo',   type:'katakana',
    examples:[{word:'フランス',reading:'fu·ran·su',meaning:'프랑스 (France)'},{word:'フルーツ',reading:'fu·rū·tsu',meaning:'과일 (fruit)'}]},
  'ヘ': { romaji:'he',  korean:'헤', english:'heh',   type:'katakana',
    examples:[{word:'ヘルメット',reading:'he·ru·met·to',meaning:'헬멧 (helmet)'},{word:'ヘッドフォン',reading:'hed·do·fon',meaning:'헤드폰 (headphones)'}]},
  'ホ': { romaji:'ho',  korean:'호', english:'hoh',   type:'katakana',
    examples:[{word:'ホテル',reading:'ho·te·ru',meaning:'호텔 (hotel)'},{word:'ホームページ',reading:'hō·mu·pē·ji',meaning:'홈페이지 (homepage)'}]},

  'マ': { romaji:'ma',  korean:'마', english:'mah',   type:'katakana',
    examples:[{word:'マクドナルド',reading:'ma·ku·do·na·ru·do',meaning:'맥도날드 (McDonald\'s)'},{word:'マスク',reading:'ma·su·ku',meaning:'마스크 (mask)'}]},
  'ミ': { romaji:'mi',  korean:'미', english:'mee',   type:'katakana',
    examples:[{word:'ミルク',reading:'mi·ru·ku',meaning:'우유 (milk)'},{word:'ミュージック',reading:'myū·jik·ku',meaning:'음악 (music)'}]},
  'ム': { romaji:'mu',  korean:'무', english:'moo',   type:'katakana',
    examples:[{word:'ムード',reading:'mū·do',meaning:'무드 (mood)'},{word:'ムービー',reading:'mū·bī',meaning:'영화 (movie)'}]},
  'メ': { romaji:'me',  korean:'메', english:'meh',   type:'katakana',
    examples:[{word:'メール',reading:'mē·ru',meaning:'이메일 (email)'},{word:'メニュー',reading:'me·nyū',meaning:'메뉴 (menu)'}]},
  'モ': { romaji:'mo',  korean:'모', english:'moh',   type:'katakana',
    examples:[{word:'モデル',reading:'mo·de·ru',meaning:'모델 (model)'},{word:'モバイル',reading:'mo·bai·ru',meaning:'모바일 (mobile)'}]},

  'ヤ': { romaji:'ya',  korean:'야', english:'yah',   type:'katakana',
    examples:[{word:'ヤフー',reading:'ya·fū',meaning:'야후 (Yahoo)'},{word:'ヤード',reading:'yā·do',meaning:'야드 (yard)'}]},
  'ユ': { romaji:'yu',  korean:'유', english:'yoo',   type:'katakana',
    examples:[{word:'ユーチューブ',reading:'yū·chū·bu',meaning:'유튜브 (YouTube)'},{word:'ユニフォーム',reading:'yu·ni·fō·mu',meaning:'유니폼 (uniform)'}]},
  'ヨ': { romaji:'yo',  korean:'요', english:'yoh',   type:'katakana',
    examples:[{word:'ヨーグルト',reading:'yō·gu·ru·to',meaning:'요거트 (yogurt)'},{word:'ヨーロッパ',reading:'yō·rop·pa',meaning:'유럽 (Europe)'}]},

  'ラ': { romaji:'ra',  korean:'라', english:'rah',   type:'katakana',
    examples:[{word:'ラーメン',reading:'rā·men',meaning:'라면 (ramen)'},{word:'ラジオ',reading:'ra·ji·o',meaning:'라디오 (radio)'}]},
  'リ': { romaji:'ri',  korean:'리', english:'ree',   type:'katakana',
    examples:[{word:'リモコン',reading:'ri·mo·kon',meaning:'리모컨 (remote control)'},{word:'リズム',reading:'ri·zu·mu',meaning:'리듬 (rhythm)'}]},
  'ル': { romaji:'ru',  korean:'루', english:'roo',   type:'katakana',
    examples:[{word:'ルール',reading:'rū·ru',meaning:'규칙 (rule)'},{word:'ルーム',reading:'rū·mu',meaning:'룸 (room)'}]},
  'レ': { romaji:'re',  korean:'레', english:'reh',   type:'katakana',
    examples:[{word:'レストラン',reading:'res·to·ran',meaning:'레스토랑 (restaurant)'},{word:'レポート',reading:'re·pō·to',meaning:'리포트 (report)'}]},
  'ロ': { romaji:'ro',  korean:'로', english:'roh',   type:'katakana',
    examples:[{word:'ロボット',reading:'ro·bot·to',meaning:'로봇 (robot)'},{word:'ロシア',reading:'ro·shi·a',meaning:'러시아 (Russia)'}]},

  'ワ': { romaji:'wa',  korean:'와', english:'wah',   type:'katakana',
    examples:[{word:'ワイン',reading:'wain',meaning:'와인 (wine)'},{word:'ワールド',reading:'wā·ru·do',meaning:'월드 (world)'}]},
  'ヲ': { romaji:'wo',  korean:'오', english:'oh',    type:'katakana',
    examples:[{word:'(조사로만 사용)',reading:'',meaning:'particle (object marker)'}]},
  'ン': { romaji:'n',   korean:'음', english:'n/ng',  type:'katakana',
    examples:[{word:'テレビン',reading:'te·re·bin',meaning:'테레빈 (turpentine)'},{word:'ランチ',reading:'ran·chi',meaning:'점심 (lunch)'}]},

  // ─────────────────── 가타가나 탁음 (濁音) ───────────────────
  'ガ': { romaji:'ga',  korean:'가', english:'gah',   type:'katakana_dakuten',
    examples:[{word:'ガム',reading:'ga·mu',meaning:'껌 (gum)'},{word:'ガレージ',reading:'ga·rē·ji',meaning:'차고 (garage)'}]},
  'ギ': { romaji:'gi',  korean:'기', english:'gee',   type:'katakana_dakuten',
    examples:[{word:'ギター',reading:'gi·tā',meaning:'기타 (guitar)'},{word:'ギリシャ',reading:'gi·ri·sha',meaning:'그리스 (Greece)'}]},
  'グ': { romaji:'gu',  korean:'구', english:'goo',   type:'katakana_dakuten',
    examples:[{word:'グラス',reading:'gu·ra·su',meaning:'글라스/잔 (glass)'},{word:'グーグル',reading:'gū·gu·ru',meaning:'구글 (Google)'}]},
  'ゲ': { romaji:'ge',  korean:'게', english:'geh',   type:'katakana_dakuten',
    examples:[{word:'ゲーム',reading:'gē·mu',meaning:'게임 (game)'},{word:'ゲスト',reading:'ges·to',meaning:'게스트 (guest)'}]},
  'ゴ': { romaji:'go',  korean:'고', english:'goh',   type:'katakana_dakuten',
    examples:[{word:'ゴルフ',reading:'go·ru·fu',meaning:'골프 (golf)'},{word:'ゴール',reading:'gō·ru',meaning:'골 (goal)'}]},

  'ザ': { romaji:'za',  korean:'자', english:'zah',   type:'katakana_dakuten',
    examples:[{word:'ザッピング',reading:'zap·pin·gu',meaning:'채널 돌리기 (zapping)'},{word:'ザンビア',reading:'zan·bi·a',meaning:'잠비아 (Zambia)'}]},
  'ジ': { romaji:'ji',  korean:'지', english:'jee',   type:'katakana_dakuten',
    examples:[{word:'ジュース',reading:'jū·su',meaning:'주스 (juice)'},{word:'ジャケット',reading:'ja·ket·to',meaning:'재킷 (jacket)'}]},
  'ズ': { romaji:'zu',  korean:'즈', english:'zoo',   type:'katakana_dakuten',
    examples:[{word:'ズボン',reading:'zu·bon',meaning:'바지 (pants)'},{word:'ズーム',reading:'zū·mu',meaning:'줌 (zoom)'}]},
  'ゼ': { romaji:'ze',  korean:'제', english:'zeh',   type:'katakana_dakuten',
    examples:[{word:'ゼリー',reading:'ze·rī',meaning:'젤리 (jelly)'},{word:'ゼロ',reading:'ze·ro',meaning:'제로/0 (zero)'}]},
  'ゾ': { romaji:'zo',  korean:'조', english:'zoh',   type:'katakana_dakuten',
    examples:[{word:'ゾーン',reading:'zōn',meaning:'존/구역 (zone)'},{word:'ゾンビ',reading:'zon·bi',meaning:'좀비 (zombie)'}]},

  'ダ': { romaji:'da',  korean:'다', english:'dah',   type:'katakana_dakuten',
    examples:[{word:'ダンス',reading:'dan·su',meaning:'댄스 (dance)'},{word:'ダイヤ',reading:'dai·ya',meaning:'다이아 (diamond)'}]},
  'ヂ': { romaji:'ji',  korean:'지', english:'jee',   type:'katakana_dakuten',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used, same sound as ジ'}]},
  'ヅ': { romaji:'zu',  korean:'즈', english:'zoo',   type:'katakana_dakuten',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used, same sound as ズ'}]},
  'デ': { romaji:'de',  korean:'데', english:'deh',   type:'katakana_dakuten',
    examples:[{word:'デザイン',reading:'de·za·in',meaning:'디자인 (design)'},{word:'デート',reading:'dē·to',meaning:'데이트 (date)'}]},
  'ド': { romaji:'do',  korean:'도', english:'doh',   type:'katakana_dakuten',
    examples:[{word:'ドア',reading:'do·a',meaning:'문 (door)'},{word:'ドラマ',reading:'do·ra·ma',meaning:'드라마 (drama)'}]},

  'バ': { romaji:'ba',  korean:'바', english:'bah',   type:'katakana_dakuten',
    examples:[{word:'バス',reading:'ba·su',meaning:'버스 (bus)'},{word:'バナナ',reading:'ba·na·na',meaning:'바나나 (banana)'}]},
  'ビ': { romaji:'bi',  korean:'비', english:'bee',   type:'katakana_dakuten',
    examples:[{word:'ビール',reading:'bī·ru',meaning:'맥주 (beer)'},{word:'ビデオ',reading:'bi·de·o',meaning:'비디오 (video)'}]},
  'ブ': { romaji:'bu',  korean:'부', english:'boo',   type:'katakana_dakuten',
    examples:[{word:'ブログ',reading:'bu·ro·gu',meaning:'블로그 (blog)'},{word:'ブランド',reading:'bu·ran·do',meaning:'브랜드 (brand)'}]},
  'ベ': { romaji:'be',  korean:'베', english:'beh',   type:'katakana_dakuten',
    examples:[{word:'ベッド',reading:'bed·do',meaning:'침대 (bed)'},{word:'ベルト',reading:'be·ru·to',meaning:'벨트 (belt)'}]},
  'ボ': { romaji:'bo',  korean:'보', english:'boh',   type:'katakana_dakuten',
    examples:[{word:'ボール',reading:'bō·ru',meaning:'공 (ball)'},{word:'ボタン',reading:'bo·tan',meaning:'버튼 (button)'}]},

  // ─────────────────── 가타가나 반탁음 (半濁音) ───────────────────
  'パ': { romaji:'pa',  korean:'파', english:'pah',   type:'katakana_handakuten',
    examples:[{word:'パスポート',reading:'pa·su·pō·to',meaning:'여권 (passport)'},{word:'パーティー',reading:'pā·tī',meaning:'파티 (party)'}]},
  'ピ': { romaji:'pi',  korean:'피', english:'pee',   type:'katakana_handakuten',
    examples:[{word:'ピザ',reading:'pi·za',meaning:'피자 (pizza)'},{word:'ピアノ',reading:'pi·a·no',meaning:'피아노 (piano)'}]},
  'プ': { romaji:'pu',  korean:'푸', english:'poo',   type:'katakana_handakuten',
    examples:[{word:'プール',reading:'pū·ru',meaning:'수영장 (pool)'},{word:'プリンター',reading:'pu·rin·tā',meaning:'프린터 (printer)'}]},
  'ペ': { romaji:'pe',  korean:'페', english:'peh',   type:'katakana_handakuten',
    examples:[{word:'ペット',reading:'pet·to',meaning:'반려동물 (pet)'},{word:'ペン',reading:'pen',meaning:'펜 (pen)'}]},
  'ポ': { romaji:'po',  korean:'포', english:'poh',   type:'katakana_handakuten',
    examples:[{word:'ポケモン',reading:'po·ke·mon',meaning:'포켓몬 (Pokémon)'},{word:'ポスター',reading:'pos·tā',meaning:'포스터 (poster)'}]},

  // ─────────────────── 가타가나 요음 ───────────────────
  'キャ': { romaji:'kya', korean:'캬', english:'kyah', type:'katakana_yoon',
    examples:[{word:'キャラクター',reading:'kya·ra·ku·tā',meaning:'캐릭터 (character)'},{word:'キャンセル',reading:'kyan·se·ru',meaning:'취소 (cancel)'}]},
  'キュ': { romaji:'kyu', korean:'큐', english:'kyoo', type:'katakana_yoon',
    examples:[{word:'キュート',reading:'kyū·to',meaning:'귀엽다 (cute)'},{word:'キュービック',reading:'kyū·bik·ku',meaning:'큐빅 (cubic)'}]},
  'キョ': { romaji:'kyo', korean:'쿄', english:'kyoh', type:'katakana_yoon',
    examples:[{word:'キョウト(京都)',reading:'kyō·to',meaning:'교토 (Kyoto)'}]},

  'シャ': { romaji:'sha', korean:'샤', english:'shah', type:'katakana_yoon',
    examples:[{word:'シャワー',reading:'sha·wā',meaning:'샤워 (shower)'},{word:'シャンプー',reading:'shan·pū',meaning:'샴푸 (shampoo)'}]},
  'シュ': { romaji:'shu', korean:'슈', english:'shoo', type:'katakana_yoon',
    examples:[{word:'シュークリーム',reading:'shū·ku·rī·mu',meaning:'슈크림 (cream puff)'},{word:'シュート',reading:'shū·to',meaning:'슛 (shoot)'}]},
  'ショ': { romaji:'sho', korean:'쇼', english:'shoh', type:'katakana_yoon',
    examples:[{word:'ショッピング',reading:'shop·pin·gu',meaning:'쇼핑 (shopping)'},{word:'ショー',reading:'shō',meaning:'쇼 (show)'}]},

  'チャ': { romaji:'cha', korean:'차', english:'chah', type:'katakana_yoon',
    examples:[{word:'チャンス',reading:'chan·su',meaning:'찬스/기회 (chance)'},{word:'チャンネル',reading:'chan·ne·ru',meaning:'채널 (channel)'}]},
  'チュ': { romaji:'chu', korean:'추', english:'choo', type:'katakana_yoon',
    examples:[{word:'チューリップ',reading:'chū·rip·pu',meaning:'튤립 (tulip)'},{word:'チューブ',reading:'chū·bu',meaning:'튜브 (tube)'}]},
  'チョ': { romaji:'cho', korean:'쵸', english:'choh', type:'katakana_yoon',
    examples:[{word:'チョコレート',reading:'cho·ko·rē·to',meaning:'초콜릿 (chocolate)'},{word:'チョコ',reading:'cho·ko',meaning:'초코 (choco)'}]},

  'ニャ': { romaji:'nya', korean:'냐', english:'nyah', type:'katakana_yoon',
    examples:[{word:'ニャンコ',reading:'nyan·ko',meaning:'고양이(애칭) (kitty)'}]},
  'ニュ': { romaji:'nyu', korean:'뉴', english:'nyoo', type:'katakana_yoon',
    examples:[{word:'ニュース',reading:'nyū·su',meaning:'뉴스 (news)'},{word:'ニューヨーク',reading:'nyū·yō·ku',meaning:'뉴욕 (New York)'}]},
  'ニョ': { romaji:'nyo', korean:'뇨', english:'nyoh', type:'katakana_yoon',
    examples:[{word:'ニョッキ',reading:'nyok·ki',meaning:'뇨키 (gnocchi)'}]},

  'ヒャ': { romaji:'hya', korean:'햐', english:'hyah', type:'katakana_yoon',
    examples:[{word:'ヒャク',reading:'hya·ku',meaning:'100 (hundred)'}]},
  'ヒュ': { romaji:'hyu', korean:'휴', english:'hyoo', type:'katakana_yoon',
    examples:[{word:'ヒューズ',reading:'hyū·zu',meaning:'퓨즈 (fuse)'},{word:'ヒューストン',reading:'hyū·su·ton',meaning:'휴스턴 (Houston)'}]},
  'ヒョ': { romaji:'hyo', korean:'효', english:'hyoh', type:'katakana_yoon',
    examples:[{word:'ヒョウ',reading:'hyō',meaning:'표범 (leopard)'}]},

  'ミャ': { romaji:'mya', korean:'먀', english:'myah', type:'katakana_yoon',
    examples:[{word:'ミャンマー',reading:'myan·mā',meaning:'미얀마 (Myanmar)'}]},
  'ミュ': { romaji:'myu', korean:'뮤', english:'myoo', type:'katakana_yoon',
    examples:[{word:'ミュージック',reading:'myū·jik·ku',meaning:'뮤직 (music)'},{word:'ミュージアム',reading:'myū·ji·a·mu',meaning:'뮤지엄 (museum)'}]},
  'ミョ': { romaji:'myo', korean:'묘', english:'myoh', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]},

  'リャ': { romaji:'rya', korean:'랴', english:'ryah', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]},
  'リュ': { romaji:'ryu', korean:'류', english:'ryoo', type:'katakana_yoon',
    examples:[{word:'リュック',reading:'ryuk·ku',meaning:'배낭 (backpack)'},{word:'リュクサック',reading:'ryuk·ku·sak·ku',meaning:'배낭 (rucksack)'}]},
  'リョ': { romaji:'ryo', korean:'료', english:'ryoh', type:'katakana_yoon',
    examples:[{word:'リョーマ',reading:'ryō·ma',meaning:'료마 (proper name)'}]},

  'ギャ': { romaji:'gya', korean:'갸', english:'gyah', type:'katakana_yoon',
    examples:[{word:'ギャップ',reading:'gyap·pu',meaning:'갭/차이 (gap)'},{word:'ギャラリー',reading:'gya·ra·rī',meaning:'갤러리 (gallery)'}]},
  'ギュ': { romaji:'gyu', korean:'규', english:'gyoo', type:'katakana_yoon',
    examples:[{word:'ギュっと',reading:'gyut·to',meaning:'꽉 (tightly)'}]},
  'ギョ': { romaji:'gyo', korean:'교', english:'gyoh', type:'katakana_yoon',
    examples:[{word:'ギョーザ',reading:'gyō·za',meaning:'만두 (gyoza)'}]},

  'ジャ': { romaji:'ja',  korean:'자', english:'jah',  type:'katakana_yoon',
    examples:[{word:'ジャム',reading:'ja·mu',meaning:'잼 (jam)'},{word:'ジャズ',reading:'ja·zu',meaning:'재즈 (jazz)'}]},
  'ジュ': { romaji:'ju',  korean:'주', english:'joo',  type:'katakana_yoon',
    examples:[{word:'ジュース',reading:'jū·su',meaning:'주스 (juice)'},{word:'ジュエリー',reading:'jū·e·rī',meaning:'주얼리 (jewelry)'}]},
  'ジョ': { romaji:'jo',  korean:'조', english:'joh',  type:'katakana_yoon',
    examples:[{word:'ジョグ',reading:'jo·gu',meaning:'조깅 (jog)'},{word:'ジョーク',reading:'jō·ku',meaning:'농담 (joke)'}]},

  'ビャ': { romaji:'bya', korean:'뱌', english:'byah', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]},
  'ビュ': { romaji:'byu', korean:'뷰', english:'byoo', type:'katakana_yoon',
    examples:[{word:'ビュッフェ',reading:'byuf·fe',meaning:'뷔페 (buffet)'},{word:'ビュー',reading:'byū',meaning:'뷰/전망 (view)'}]},
  'ビョ': { romaji:'byo', korean:'뵤', english:'byoh', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]},

  'ピャ': { romaji:'pya', korean:'퍄', english:'pyah', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]},
  'ピュ': { romaji:'pyu', korean:'퓨', english:'pyoo', type:'katakana_yoon',
    examples:[{word:'ピュア',reading:'pyua',meaning:'순수 (pure)'},{word:'コンピュータ',reading:'kon·pyū·ta',meaning:'컴퓨터 (computer)'}]},
  'ピョ': { romaji:'pyo', korean:'표', english:'pyoh', type:'katakana_yoon',
    examples:[{word:'(드물게 사용)',reading:'',meaning:'rarely used in katakana'}]}
};

// 모든 가나를 타입별로 그룹화
function getCharsByType(type) {
  return Object.keys(KANA_MAP).filter(k => KANA_MAP[k].type === type);
}

// 레벨의 캐릭터 데이터 반환
function getLevelChars(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return [];
  return level.chars.map(k => ({ kana: k, ...KANA_MAP[k] })).filter(c => c.romaji);
}

// 퀴즈용 오답 선택지 생성 (같은 타입에서 랜덤)
function getWrongOptions(correctKana, count = 3, fieldType = 'romaji') {
  const info = KANA_MAP[correctKana];
  if (!info) return [];
  const sameType = Object.entries(KANA_MAP)
    .filter(([k, v]) => k !== correctKana && v.type === info.type && v[fieldType] !== info[fieldType]);
  const shuffled = sameType.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(([k, v]) => ({kana: k, ...v}));
}

if (typeof module !== 'undefined') {
  module.exports = { LEVELS, KANA_MAP, getLevelChars, getWrongOptions, getCharsByType };
}
