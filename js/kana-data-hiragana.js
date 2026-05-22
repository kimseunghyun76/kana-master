// ============================================================
// KANA HIRAGANA DATA - basic, dakuten, handakuten, yoon
// ============================================================

'use strict';
var KANA_MAP = {
  // ─────────────────── 히라가나 기본 ───────────────────
  'あ': { romaji:'a',   korean:'아', english:'ah',    type:'hiragana', 
    tip:'알파벳 A를 살짝 눕히고 부드럽게 만든 모양! 입을 크게 "아~" 하고 벌릴 때 아래턱이 내려가는 정확한 형태입니다. "아~ 맛있어!" 하며 아이스크림이나 수박을 크게 베어 먹는 장면을 생생히 상상하세요. 공중에 A를 90도 회전시켜 그리며 "아~아~아" 7번 소리 내는 연습을 해보세요. 👄🍉',
    examples:[{word:'あか',meaning:'빨강'},{word:'あさ',meaning:'아침'},{word:'あに',meaning:'오빠/형'},{word:'あおい',meaning:'파랗다'}]},

  'い': { romaji:'i',   korean:'이', english:'ee',    type:'hiragana', 
    tip:'두 줄기 풀이 나란히 서 있는 모습! "이~!" 하면서 검지와 중지를 곧게 세우는 느낌입니다. "이~탈리아!"나 "이~쁘다!" 하며 크게 미소 짓는 장면을 상상하세요. 손가락 두 개로 공중에 い자를 그리며 "이~이~이" 반복하면 금방 외워집니다. 🌿😊',
    examples:[{word:'いぬ',meaning:'개'},{word:'いえ',meaning:'집'},{word:'いす',meaning:'의자'},{word:'いま',meaning:'지금'}]},

  'う': { romaji:'u',   korean:'우', english:'oo',    type:'hiragana', 
    tip:'입술을 앞으로 오므리며 "우~" 하는 정확한 모양! 우산을 들고 비 맞는 장면이나 우유를 빨대로 쭉 빨아먹을 때 입 모양을 떠올리세요. "우~산! 우~유!" 하며 소리 내 보세요. 💋☂️',
    examples:[{word:'うみ',meaning:'바다'},{word:'うた',meaning:'노래'},{word:'うさぎ',meaning:'토끼'},{word:'うれしい',meaning:'기쁘다'}]},

  'え': { romaji:'e',   korean:'에', english:'eh',    type:'hiragana', 
    tip:'팔을 좌우로 벌리고 "에~?" 하며 놀라는 사람 모양! 에어컨 바람을 맞거나 엘리베이터가 도착할 때 "에~!" 하는 표정을 지으며 상상하세요. 😲🛗',
    examples:[{word:'えき',meaning:'역'},{word:'えいが',meaning:'영화'},{word:'えほん',meaning:'그림책'},{word:'えいご',meaning:'영어'}]},

  'お': { romaji:'o',   korean:'오', english:'oh',    type:'hiragana', 
    tip:'입을 동그랗게 "오~" 하고 벌리는 모양! "오~!" 하며 놀라거나 오렌지를 한 입 베어 물 때 입이 커지는 장면을 강렬하게 상상하세요. 🙋‍♂️🍊',
    examples:[{word:'おかあさん',meaning:'어머니'},{word:'おとうさん',meaning:'아버지'},{word:'おちゃ',meaning:'녹차'},{word:'おはよう',meaning:'안녕하세요'}]},

  'か': { romaji:'ka',  korean:'카', english:'kah',   type:'hiragana', 
    tip:'칼(刀)에 한 획을 더해 "카!" 하고 힘차게 휘두르는 모양! ⚔️ "카~!" 하면서 칼로 채소 써는 장면이나 카메라 셔터 누르는 순간을 떠올리세요.',
    examples:[{word:'かさ',meaning:'우산'},{word:'かわ',meaning:'강'},{word:'かいもの',meaning:'쇼핑'}]},

  'き': { romaji:'ki',  korean:'키', english:'key',   type:'hiragana', 
    tip:'나무(木)가 하늘로 쭉쭉 자라는 모양! 🌲 "키~!" 하면서 키 큰 나무를 바라보거나 키보드를 두드리는 장면을 상상하세요.',
    examples:[{word:'きって',meaning:'우표'},{word:'きれい',meaning:'예쁘다'},{word:'きせつ',meaning:'계절'}]},

  'く': { romaji:'ku',  korean:'쿠', english:'koo',   type:'hiragana', 
    tip:'새 부리가 왼쪽으로 꺾여 "쿠~쿠~" 우는 모습! 🐦 쿠키를 쪼아먹는 참새를 생생히 떠올리며 "쿠~!" 소리 내 보세요.',
    examples:[{word:'くも',meaning:'구름'},{word:'くるま',meaning:'자동차'},{word:'くだもの',meaning:'과일'}]},

  'け': { romaji:'ke',  korean:'케', english:'keh',   type:'hiragana', 
    tip:'케이크를 자르는 칼처럼 각진 모양! 🍰 "케~" 하면서 케이크 위에 초를 꽂는 장면이나 케타이(휴대폰)을 들고 있는 손을 상상하세요.',
    examples:[{word:'けさ',meaning:'오늘 아침'},{word:'けっこん',meaning:'결혼'}]},

  'こ': { romaji:'ko',  korean:'코', english:'koh',   type:'hiragana', 
    tip:'코너(모서리)처럼 두 획이 나란히 있는 모양! 👃 "코~" 하면서 코를 만지거나 코너킥 하는 축구 장면을 떠올리세요.',
    examples:[{word:'こども',meaning:'어린이'},{word:'こうえん',meaning:'공원'},{word:'こたえ',meaning:'대답'}]},

  'さ': { romaji:'sa',  korean:'사', english:'sah',   type:'hiragana', 
    tip:'십자(十)에 부드러운 곡선이 더해진 모양! "사~" 하면서 사과 세 개를 나란히 놓거나 사랑(愛)을 쓰는 장면을 상상하세요. 🍎',
    examples:[{word:'さくら',meaning:'벚꽃'},{word:'さかな',meaning:'물고기'},{word:'さんぽ',meaning:'산책'}]},

  'し': { romaji:'shi', korean:'시', english:'shee',  type:'hiragana', 
    tip:'낚시 바늘이 물고기를 낚는 모양! 🎣 "시~!" 하면서 시원한 샤워를 받거나 미소 짓는 장면(시원해!)을 연결지으세요.',
    examples:[{word:'しろ',meaning:'하얀색'},{word:'しあわせ',meaning:'행복'},{word:'しぜん',meaning:'자연'}]},

  'す': { romaji:'su',  korean:'스', english:'soo',   type:'hiragana', 
    tip:'소용돌이처럼 빙글빙글 도는 모양! 🌀 "스~" 하면서 스시를 먹거나 수박을 도는 장면을 상상하세요.',
    examples:[{word:'すし',meaning:'초밥'},{word:'すき',meaning:'좋아함'},{word:'すいえい',meaning:'수영'}]},

  'せ': { romaji:'se',  korean:'세', english:'seh',   type:'hiragana', 
    tip:'세상(世界)을 가리키는 듯 삐죽 올라간 획! 🌍 "세~" 하면서 선생님(せんせい)이 가르치는 장면을 떠올리세요.',
    examples:[{word:'せかい',meaning:'세계'},{word:'せんせい',meaning:'선생님'},{word:'せつめい',meaning:'설명'}]},

  'そ': { romaji:'so',  korean:'소', english:'soh',   type:'hiragana', 
    tip:'S처럼 부드럽게 구부러진 모양! "소~" 하면서 소바 먹는 장면이나 소나기 내리는 하늘(そら)을 상상하세요. 🎵',
    examples:[{word:'そら',meaning:'하늘'},{word:'そば',meaning:'소바'},{word:'そして',meaning:'그리고'}]},

  'た': { romaji:'ta',  korean:'타', english:'tah',   type:'hiragana', 
    tip:'십자가에 꼬리가 달려 "타!" 하고 달리는 모양! 🏃 "타~" 하면서 택시 타는 장면이나 타코(문어) 잡는 장면을 떠올리세요.',
    examples:[{word:'たべもの',meaning:'음식'},{word:'たのしい',meaning:'즐겁다'},{word:'ともだち',meaning:'친구'}]},

  'ち': { romaji:'chi', korean:'치', english:'chee',  type:'hiragana', 
    tip:'물고기가 "치~!" 하며 헤엄치는 모양! 🐟 치즈를 길게 늘리거나 치킨 먹는 장면과 연결지으세요.',
    examples:[{word:'ちいさい',meaning:'작다'},{word:'ちかてつ',meaning:'지하철'},{word:'ちょっと',meaning:'잠깐'}]},

  'つ': { romaji:'tsu', korean:'츠', english:'tsoo',  type:'hiragana', 
    tip:'⚠️ 한국어에 없는 소리! "츠" — 파도(tsunami)가 부서지는 짧고 강한 소리. 🌊 "츠~" 하며 혀를 윗잇몸에 살짝 대고 튕기듯 발음 연습하세요.',
    examples:[{word:'つき',meaning:'달'},{word:'つよい',meaning:'강하다'},{word:'つかれた',meaning:'피곤하다'}]},

  'て': { romaji:'te',  korean:'테', english:'teh',   type:'hiragana', 
    tip:'알파벳 T처럼 테이블 위에 놓인 모양! 📝 "테~" 하면서 텐푸라 먹거나 테스트 보는 장면을 상상하세요.',
    examples:[{word:'てんき',meaning:'날씨'},{word:'てがみ',meaning:'편지'}]},

  'と': { romaji:'to',  korean:'토', english:'toh',   type:'hiragana', 
    tip:'토끼 귀를 쫑긋 세운 모양! 🐰 "토~" 하면서 토마토 따는 장면이나 시계(とけい) 보는 장면을 떠올리세요.',
    examples:[{word:'とり',meaning:'새'},{word:'としょかん',meaning:'도서관'},{word:'とんかつ',meaning:'돈가스'}]},

  'な': { romaji:'na',  korean:'나', english:'nah',   type:'hiragana', 
    tip:'"나~" 하며 손을 내미는 사람 모양! 🤲 "나~" 하면서 이름을 부르는 장면(なまえ)을 상상하세요.',
    examples:[{word:'なまえ',meaning:'이름'},{word:'なつ',meaning:'여름'},{word:'なに',meaning:'무엇'}]},

  'に': { romaji:'ni',  korean:'니', english:'nee',   type:'hiragana', 
    tip:'두 단 사다리처럼 두 획이 나란히! 🪜 "니~" 하면서 일본(にほん) 가는 장면이나 무지개(にじ)를 보는 장면을 떠올리세요.',
    examples:[{word:'にほん',meaning:'일본'},{word:'にわ',meaning:'정원'},{word:'にんじん',meaning:'당근'}]},

  'ぬ': { romaji:'nu',  korean:'누', english:'noo',   type:'hiragana', 
    tip:'국수나 누들이 구불구불한 모양! 🍜 "누~" 하면서 누들 먹는 장면을 강렬하게 상상하세요.',
    examples:[{word:'ぬいぐるみ',meaning:'봉제인형'},{word:'ぬれる',meaning:'젖다'}]},

  'ね': { romaji:'ne',  korean:'네', english:'neh',   type:'hiragana', 
    tip:'잠자는 고양이(ねこ) 모양! 🐱 "네~" 하면서 고양이가 웅크린 모습을 떠올리며 "네코~ 네~" 소리 내 보세요.',
    examples:[{word:'ねこ',meaning:'고양이'},{word:'ねむい',meaning:'졸리다'},{word:'ねだん',meaning:'가격'}]},

  'の': { romaji:'no',  korean:'노', english:'noh',   type:'hiragana', 
    tip:'NO 표시처럼 소용돌이 치는 모양! 🚫 "노~" 하면서 노트에 쓰거나 미끄럼틀 타는 장면을 상상하세요.',
    examples:[{word:'のみもの',meaning:'음료'},{word:'のぼる',meaning:'올라가다'}]},

  'は': { romaji:'ha',  korean:'하', english:'hah',   type:'hiragana', 
    tip:'"하하하!" 크게 웃는 소리와 모양! 😄 "하~" 하면서 꽃(はな)을 보며 웃는 장면을 떠올리세요.',
    examples:[{word:'はな',meaning:'꽃/코'},{word:'はる',meaning:'봄'},{word:'はやい',meaning:'빠르다'}]},

  'ひ': { romaji:'hi',  korean:'히', english:'hee',   type:'hiragana', 
    tip:'"히히" 낄낄 웃는 소리! 🤭 "히~" 하면서 빛(ひかり) 받는 장면이나 비행기(ひこうき) 타는 장면을 상상하세요.',
    examples:[{word:'ひと',meaning:'사람'},{word:'ひる',meaning:'낮'}]},

  'ふ': { romaji:'fu',  korean:'후', english:'foo',   type:'hiragana', 
    tip:'⚠️ 입술 살짝 오므리고 "후~" 바람 불 때 모양! (f와 u 중간) 후지산(ふじ산) 오르며 바람 부는 장면을 떠올리세요. 💨',
    examples:[{word:'ふじさん',meaning:'후지산'},{word:'ふゆ',meaning:'겨울'},{word:'ふね',meaning:'배'}]},

  'へ': { romaji:'he',  korean:'헤', english:'heh',   type:'hiragana', 
    tip:'산봉우리를 넘어가는 모양! 🏔️ "헤~" 하면서 산을 오르는 장면이나 방(へや)에 들어가는 장면을 상상하세요.',
    examples:[{word:'へや',meaning:'방'},{word:'へいわ',meaning:'평화'}]},

  'ほ': { romaji:'ho',  korean:'호', english:'hoh',   type:'hiragana', 
    tip:'"호호호" 산타처럼 웃는 모양! 🎅 "호~" 하면서 책(ほん)을 읽거나 별(ほし)을 보는 장면을 떠올리세요.',
    examples:[{word:'ほん',meaning:'책'},{word:'ほし',meaning:'별'}]},

  'ま': { romaji:'ma',  korean:'마', english:'mah',   type:'hiragana', 
    tip:'엄마(まま)를 부르는 모양! 👩 "마~" 하면서 마을(まち)이나 축제(まつり) 가는 장면을 상상하세요.',
    examples:[{word:'まち',meaning:'도시'},{word:'まいにち',meaning:'매일'}]},

  'み': { romaji:'mi',  korean:'미', english:'mee',   type:'hiragana', 
    tip:'구불구불 흐르는 강물처럼! 🌊 "미~" 하면서 물(みず) 마시거나 길(みち)을 걷는 장면을 떠올리세요.',
    examples:[{word:'みず',meaning:'물'},{word:'みんな',meaning:'모두'}]},

  'む': { romaji:'mu',  korean:'무', english:'moo',   type:'hiragana', 
    tip:'소(牛)가 "무~" 하고 우는 모양! 🐄 "무~" 하면서 벌레(むし)나 마을(むら)을 보는 장면을 상상하세요.',
    examples:[{word:'むし',meaning:'벌레'},{word:'むずかしい',meaning:'어렵다'}]},

  'め': { romaji:'me',  korean:'메', english:'meh',   type:'hiragana', 
    tip:'눈(め) 모양! 👁️ "메~" 하면서 안경(めがね) 쓰는 장면이나 메뉴 보는 장면을 떠올리세요.',
    examples:[{word:'めがね',meaning:'안경'},{word:'めずらしい',meaning:'드물다'}]},

  'も': { romaji:'mo',  korean:'모', english:'moh',   type:'hiragana', 
    tip:'낚시줄에 물고기 두 마리가 걸린 모양! 🎣 "모~" 하면서 숲(もり)이나 물건(もの)을 보는 장면을 상상하세요.',
    examples:[{word:'もり',meaning:'숲'},{word:'もっと',meaning:'더'}]},

  'や': { romaji:'ya',  korean:'야', english:'yah',   type:'hiragana', 
    tip:'알파벳 Y를 부드럽게 만든 모양! 🔤 "야~" 하면서 산(やま) 오르거나 채소(やさい) 사는 장면을 떠올리세요.',
    examples:[{word:'やま',meaning:'산'},{word:'やさしい',meaning:'상냥하다'}]},

  'ゆ': { romaji:'yu',  korean:'유', english:'yoo',   type:'hiragana', 
    tip:'유니콘 뿔처럼 구불구불! 🦄 "유~" 하면서 눈(ゆき) 내리는 장면이나 꿈(ゆめ)을 꾸는 장면을 상상하세요.',
    examples:[{word:'ゆき',meaning:'눈'},{word:'ゆめ',meaning:'꿈'}]},

  'よ': { romaji:'yo',  korean:'요', english:'yoh',   type:'hiragana', 
    tip:'요트 돛처럼 바람 받는 모양! ⛵ "요~" 하면서 밤(よる)이나 예정(よてい)을 생각하는 장면을 떠올리세요.',
    examples:[{word:'よる',meaning:'밤'},{word:'ようこそ',meaning:'어서 오세요'}]},

  'ら': { romaji:'ra',  korean:'라', english:'rah',   type:'hiragana', 
    tip:'⚠️ 혀끝을 윗잇몸에 살짝 튕기는 "라" (r+l 중간)! 👅 "라~" 하면서 라면 먹는 장면을 상상하며 발음 연습하세요.',
    examples:[{word:'らいねん',meaning:'내년'},{word:'らーめん',meaning:'라멘'}]},

  'り': { romaji:'ri',  korean:'리', english:'ree',   type:'hiragana', 
    tip:'⚠️ ら행과 마찬가지로 혀를 가볍게 튕기는 "리"! 사과(りんご)나 여행(りょこう) 가는 장면을 떠올리며 연습하세요.',
    examples:[{word:'りんご',meaning:'사과'},{word:'りょこう',meaning:'여행'}]},

  'る': { romaji:'ru',  korean:'루', english:'roo',   type:'hiragana', 
    tip:'루프(loop)처럼 동그랗게 도는 모양! 🔄 "루~" 하면서 규칙(るーる)을 지키는 장면을 상상하세요.',
    examples:[{word:'るす',meaning:'부재중'}]},

  'れ': { romaji:'re',  korean:'레', english:'reh',   type:'hiragana', 
    tip:'빗물이 "레~" 하고 내리는 모양! 🌧️ "레~" 하면서 레스토랑이나 역사(れきし)를 공부하는 장면을 떠올리세요.',
    examples:[{word:'れんしゅう',meaning:'연습'},{word:'れいぞうこ',meaning:'냉장고'}]},

  'ろ': { romaji:'ro',  korean:'로', english:'roh',   type:'hiragana', 
    tip:'로프(rope)처럼 구불구불한 모양! 🪢 "로~" 하면서 복도(ろうか)를 걷는 장면을 상상하세요.',
    examples:[{word:'ろうか',meaning:'복도'},{word:'ろく',meaning:'6'}]},

  'わ': { romaji:'wa',  korean:'와', english:'wah',   type:'hiragana', 
    tip:'"와!" 하고 놀랄 때 입 모양! W처럼 두 곡선. 🎉 "와~" 하면서 웃는(わらう) 장면이나 이해(わかる)하는 순간을 떠올리세요.',
    examples:[{word:'わたし',meaning:'나'},{word:'わかる',meaning:'이해하다'}]},

  'を': { romaji:'wo',  korean:'오', english:'oh',    type:'hiragana', 
    tip:'목적어 조사 "~을/를" 전용! 발음은 "오"와 같아요. "~をください(~을 주세요)"처럼 문장에서 자주 나오는 특별 글자 ⭐',
    examples:[{word:'〜を食べる',meaning:'~을 먹다'},{word:'〜を見る',meaning:'~을 보다'}]},

  'ん': { romaji:'n',   korean:'음', english:'n/m',   type:'hiragana', 
    tip:'코로 "응~" 하는 콧소리! 👃 뒤 글자에 따라 "음/은/응"으로 바뀝니다. 일본(にほん) 마지막 소리를 콧소리로 연습하세요.',
    examples:[{word:'にほん',meaning:'일본'},{word:'てんき',meaning:'날씨'}]},

  // ─────────────────── 히라가나 탁음 (濁音) ───────────────────
  'が': { romaji:'ga',  korean:'가', english:'gah',   type:'hiragana_dakuten', 
    tip:'か에 탁점(゛)을 붙여 목에 힘을 주고 "가!"라고 크게 외치는 모양! 🏫 학교(がっこう)에 가며 "がんばる!" 외치는 장면을 세게 상상하며 소리 내세요.',
    examples:[{word:'がっこう',meaning:'학교'},{word:'がんばる',meaning:'열심히 하다'},{word:'がいこく',meaning:'외국'}]},

  'ぎ': { romaji:'gi',  korean:'기', english:'gee',   type:'hiragana_dakuten', 
    tip:'き에 탁점(゛) → "기"! 기타를 세게 치거나 은행(ぎんこう)에 가는 장면을 상상하며 "기~!" 소리를 목에 힘주어 내세요. 🎸🏦',
    examples:[{word:'ぎんこう',meaning:'은행'},{word:'ぎゅうにゅう',meaning:'우유'},{word:'ぎじゅつ',meaning:'기술'}]},

  'ぐ': { romaji:'gu',  korean:'구', english:'goo',   type:'hiragana_dakuten', 
    tip:'く에 탁점(゛) → "구"! 구글 검색하거나 꾸물꾸물(ぐずぐず)하는 거북이처럼 "구~" 소리를 길게 내세요. 🐢🔍',
    examples:[{word:'ぐち',meaning:'불평'},{word:'ぐんたい',meaning:'군대'}]},

  'げ': { romaji:'ge',  korean:'게', english:'geh',   type:'hiragana_dakuten', 
    tip:'け에 탁점(゛) → "게"! 건강(げんき)하게 "게~" 하며 운동하는 장면을 상상하세요. 💪',
    examples:[{word:'げんき',meaning:'건강'},{word:'げいじゅつ',meaning:'예술'}]},

  'ご': { romaji:'go',  korean:'고', english:'goh',   type:'hiragana_dakuten', 
    tip:'こ에 탁점(゛) → "고"! 밥(ごはん)을 먹으며 "고~" 하는 장면을 강렬하게 상상하세요. 🍚',
    examples:[{word:'ごはん',meaning:'밥/식사'},{word:'ごご',meaning:'오후'},{word:'ごちそう',meaning:'대접'}]},

  'ざ': { romaji:'za',  korean:'자', english:'zah',   type:'hiragana_dakuten', 
    tip:'さ에 탁점(゛) → "자"! 잡지(ざっし)를 읽으며 "자~" 하는 느낌으로 목에 힘주세요. 📰',
    examples:[{word:'ざっし',meaning:'잡지'},{word:'ざんねん',meaning:'아쉽다'}]},

  'じ': { romaji:'ji',  korean:'지', english:'jee',   type:'hiragana_dakuten', 
    tip:'し에 탁점(゛) → "지"! ⚠️ 성대를 울리며 "지~" 하는 소리. 시간(じかん)을 확인하는 장면을 상상하며 연습하세요. ⏰',
    examples:[{word:'じかん',meaning:'시간'},{word:'じしん',meaning:'지진'},{word:'じどうしゃ',meaning:'자동차'}]},

  'ず': { romaji:'zu',  korean:'즈', english:'zoo',   type:'hiragana_dakuten', 
    tip:'す에 탁점(゛) → "즈"! 계속(ずっと) "즈~" 하며 이어지는 소리를 길게 내세요. 🔁',
    examples:[{word:'ずっと',meaning:'계속'},{word:'ずつう',meaning:'두통'}]},

  'ぜ': { romaji:'ze',  korean:'제', english:'zeh',   type:'hiragana_dakuten', 
    tip:'せ에 탁점(゛) → "제"! 전부(ぜんぶ) "제~" 하며 강하게 외치세요. ✅',
    examples:[{word:'ぜんぶ',meaning:'전부'},{word:'ぜったい',meaning:'절대'}]},

  'ぞ': { romaji:'zo',  korean:'조', english:'zoh',   type:'hiragana_dakuten', 
    tip:'そ에 탁점(゛) → "조"! 코끼리(ぞう)를 보며 "조~" 하는 장면을 상상하세요. 🐘',
    examples:[{word:'ぞう',meaning:'코끼리'},{word:'つづく',meaning:'계속되다'}]},

  'だ': { romaji:'da',  korean:'다', english:'dah',   type:'hiragana_dakuten', 
    tip:'た에 탁점(゛) → "다"! 괜찮아요(だいじょうぶ)라고 힘차게 말하는 장면을 상상하세요. 👍',
    examples:[{word:'だいがく',meaning:'대학교'},{word:'だいじょうぶ',meaning:'괜찮아요'},{word:'だれ',meaning:'누구'}]},

  'で': { romaji:'de',  korean:'데', english:'deh',   type:'hiragana_dakuten', 
    tip:'て에 탁점(゛) → "데"! 전철(でんしゃ)을 타며 "데~" 하는 장면을 떠올리세요. 🚃',
    examples:[{word:'でんしゃ',meaning:'전철'},{word:'でんわ',meaning:'전화'},{word:'でんき',meaning:'전기'}]},

  'ど': { romaji:'do',  korean:'도', english:'doh',   type:'hiragana_dakuten', 
    tip:'と에 탁점(゛) → "도"! 어디(どこ)에 가는지 "도~" 하며 묻는 장면을 상상하세요. ❓',
    examples:[{word:'どこ',meaning:'어디'},{word:'どうぶつ',meaning:'동물'},{word:'どうぞ',meaning:'어서요'}]},

  'ば': { romaji:'ba',  korean:'바', english:'bah',   type:'hiragana_dakuten', 
    tip:'は에 탁점(゛) → "바"! 저녁밥(ばんごはん)을 먹으며 "바~" 하는 장면을 떠올리세요. 🍽️',
    examples:[{word:'ばんごはん',meaning:'저녁밥'},{word:'ばしょ',meaning:'장소'}]},

  'び': { romaji:'bi',  korean:'비', english:'bee',   type:'hiragana_dakuten', 
    tip:'ひ에 탁점(゛) → "비"! 병원(びょういん)에 가는 장면을 상상하며 "비~" 하세요. 🏥',
    examples:[{word:'びょういん',meaning:'병원'},{word:'びっくり',meaning:'깜짝'}]},

  'ぶ': { romaji:'bu',  korean:'부', english:'boo',   type:'hiragana_dakuten', 
    tip:'ふ에 탁점(゛) → "부"! 돼지(ぶた)나 포도(ぶどう)를 보며 "부~" 소리를 내세요. 🐷',
    examples:[{word:'ぶた',meaning:'돼지'},{word:'ぶどう',meaning:'포도'}]},

  'べ': { romaji:'be',  korean:'베', english:'beh',   type:'hiragana_dakuten', 
    tip:'へ에 탁점(゛) → "베"! 공부(べんきょう)하며 "베~" 하는 장면을 상상하세요. 📖',
    examples:[{word:'べんきょう',meaning:'공부'},{word:'べんとう',meaning:'도시락'}]},

  'ぼ': { romaji:'bo',  korean:'보', english:'boh',   type:'hiragana_dakuten', 
    tip:'ほ에 탁점(゛) → "보"! 모자(ぼうし)를 쓰며 "보~" 하는 장면을 떠올리세요. 👦',
    examples:[{word:'ぼうし',meaning:'모자'},{word:'ぼく',meaning:'나(남성)'}]},

  // ─────────────────── 히라가나 반탁음 (半濁音) ───────────────────
  'ぱ': { romaji:'pa',  korean:'파', english:'pah',   type:'hiragana_handakuten', 
    tip:'は에 반탁점(゜) → "파"! 빵(パン)을 먹거나 파티(パーティー)에서 "파~" 하고 밝게 터지는 느낌을 상상하세요. ✨',
    examples:[{word:'パン',meaning:'빵'},{word:'パーティー',meaning:'파티'}]},

  'ぴ': { romaji:'pi',  korean:'피', english:'pee',   type:'hiragana_handakuten', 
    tip:'ひ에 반탁점(゜) → "피"! 피아노(ピアノ) 치거나 반짝반짝(ぴかぴか) 빛나는 장면을 떠올리세요. ✨🎹',
    examples:[{word:'ピアノ',meaning:'피아노'},{word:'ぴかぴか',meaning:'반짝반짝'}]},

  'ぷ': { romaji:'pu',  korean:'푸', english:'poo',   type:'hiragana_handakuten', 
    tip:'ふ에 반탁점(゜) → "푸"! 수영장(プール)에서 물장구치며 "푸~" 하는 장면을 상상하세요. 🏊',
    examples:[{word:'プール',meaning:'수영장'},{word:'プリン',meaning:'푸딩'}]},

  'ぺ': { romaji:'pe',  korean:'페', english:'peh',   type:'hiragana_handakuten', 
    tip:'へ에 반탁점(゜) → "페"! 펜(ペン)으로 쓰거나 펫(ペット)을 안는 장면을 떠올리세요. ✏️',
    examples:[{word:'ペン',meaning:'펜'},{word:'ペット',meaning:'반려동물'}]},

  'ぽ': { romaji:'po',  korean:'포', english:'poh',   type:'hiragana_handakuten', 
    tip:'ほ에 반탁점(゜) → "포"! 포켓(ポケット)에 손 넣고 따뜻(ぽかぽか)한 느낌을 상상하세요. ☀️',
    examples:[{word:'ポケット',meaning:'주머니'},{word:'ぽかぽか',meaning:'따뜻하다'}]},

  // ─────────────────── 히라가나 요음 (拗音) ───────────────────
  'きゃ': { romaji:'kya', korean:'캬', english:'kyah', type:'hiragana_yoon', 
    tip:'き + 작은ゃ = "캬!" 귀여운 손님(きゃく)이 "캬~" 하는 소리를 상상하며 귀엽게 소리 내세요. 🛎️',
    examples:[{word:'きゃく',meaning:'손님'},{word:'きゃっかん',meaning:'객관'}]},

  'きゅ': { romaji:'kyu', korean:'큐', english:'kyoo', type:'hiragana_yoon', 
    tip:'き + 작은ゅ = "큐!" 구급차(きゅうきゅうしゃ) 사이렌 소리처럼 "큐~" 하세요. 🚑',
    examples:[{word:'きゅうきゅうしゃ',meaning:'구급차'},{word:'きゅうり',meaning:'오이'}]},

  'きょ': { romaji:'kyo', korean:'쿄', english:'kyoh', type:'hiragana_yoon', 
    tip:'き + 작은ょ = "쿄!" 교토(きょうと) 사원에 가는 장면을 상상하세요. ⛩️',
    examples:[{word:'きょうと',meaning:'교토'},{word:'きょうしつ',meaning:'교실'}]},

  'しゃ': { romaji:'sha', korean:'샤', english:'shah', type:'hiragana_yoon', 
    tip:'し + 작은ゃ = "샤!" 사진(しゃしん)을 찍으며 "샤~" 하는 장면을 떠올리세요. 📸',
    examples:[{word:'しゃしん',meaning:'사진'},{word:'しゃかい',meaning:'사회'}]},

  'しゅ': { romaji:'shu', korean:'슈', english:'shoo', type:'hiragana_yoon', 
    tip:'し + 작은ゅ = "슈!" 취미(しゅみ)를 말할 때 "슈~" 하세요. 🎨',
    examples:[{word:'しゅみ',meaning:'취미'},{word:'しゅくだい',meaning:'숙제'}]},

  'しょ': { romaji:'sho', korean:'쇼', english:'shoh', type:'hiragana_yoon', 
    tip:'し + 작은ょ = "쇼!" 식사(しょくじ)하며 "쇼~" 하는 장면을 상상하세요. 🍜',
    examples:[{word:'しょくじ',meaning:'식사'},{word:'しょうがっこう',meaning:'초등학교'}]},

  'ちゃ': { romaji:'cha', korean:'차', english:'chah', type:'hiragana_yoon', 
    tip:'ち + 작은ゃ = "차!" 녹차(おちゃ)를 마시며 "차~" 하는 장면을 떠올리세요. 🍵',
    examples:[{word:'おちゃ',meaning:'녹차'},{word:'ちゃいろ',meaning:'갈색'}]},

  'ちゅ': { romaji:'chu', korean:'추', english:'choo', type:'hiragana_yoon', 
    tip:'ち + 작은ゅ = "추!" 주문(ちゅうもん)할 때 "추~" 하세요. 📋',
    examples:[{word:'ちゅうもん',meaning:'주문'},{word:'ちゅうい',meaning:'주의'}]},

  'ちょ': { romaji:'cho', korean:'쵸', english:'choh', type:'hiragana_yoon', 
    tip:'ち + 작은ょ = "쵸!" "ちょっと(잠깐)" 할 때 "쵸~" 하며 손을 들어 보세요. ✋',
    examples:[{word:'ちょっと',meaning:'잠깐'},{word:'ちょうど',meaning:'딱'}]},

  'にゃ': { romaji:'nya', korean:'냐', english:'nyah', type:'hiragana_yoon', 
    tip:'に + 작은ゃ = "냐!" 고양이(にゃんこ)가 "냐~" 우는 귀여운 소리를 상상하세요. 🐱',
    examples:[{word:'にゃんこ',meaning:'고양이'}]},

  'にゅ': { romaji:'nyu', korean:'뉴', english:'nyoo', type:'hiragana_yoon', 
    tip:'に + 작은ゅ = "뉴!" 뉴스(にゅうす)나 입학(にゅうがく) 장면을 떠올리세요. 📰',
    examples:[{word:'にゅうがく',meaning:'입학'},{word:'にゅうす',meaning:'뉴스'}]},

  'にょ': { romaji:'nyo', korean:'뇨', english:'nyoh', type:'hiragana_yoon', 
    tip:'に + 작은ょ = "뇨!" 쑥쑥(にょきにょき) 자라는 모습을 상상하세요. 🌱',
    examples:[{word:'にょきにょき',meaning:'쑥쑥'}]},

  'ひゃ': { romaji:'hya', korean:'햐', english:'hyah', type:'hiragana_yoon', 
    tip:'ひ + 작은ゃ = "햐!" 백(ひゃく)을 세며 "햐~" 하는 장면을 상상하세요. 💯',
    examples:[{word:'ひゃく',meaning:'100'}]},

  'ひゅ': { romaji:'hyu', korean:'휴', english:'hyoo', type:'hiragana_yoon', 
    tip:'ひ + 작은ゅ = "휴!" 바람이 "휴~휴~" 부는 소리를 떠올리세요. 🌬️',
    examples:[{word:'ひゅーひゅー',meaning:'바람 소리'}]},

  'ひょ': { romaji:'hyo', korean:'효', english:'hyoh', type:'hiragana_yoon', 
    tip:'ひ + 작은ょ = "효!" 우박(ひょう)이 떨어지는 장면을 상상하세요. 🌨️',
    examples:[{word:'ひょう',meaning:'우박'}]},

  'みゃ': { romaji:'mya', korean:'먀', english:'myah', type:'hiragana_yoon', 
    tip:'み + 작은ゃ = "먀!" 맥박(みゃく)이 뛰는 느낌을 상상하세요. 💓',
    examples:[{word:'みゃく',meaning:'맥박'}]},

  'みゅ': { romaji:'myu', korean:'뮤', english:'myoo', type:'hiragana_yoon', 
    tip:'み + 작은ゅ = "뮤!" 음악(みゅーじっく)을 들으며 "뮤~" 하세요. 🎵',
    examples:[{word:'みゅーじっく',meaning:'뮤직'}]},

  'みょ': { romaji:'myo', korean:'묘', english:'myoh', type:'hiragana_yoon', 
    tip:'み + 작은ょ = "묘!" 성(みょうじ)을 말할 때 "묘~" 하세요.',
    examples:[{word:'みょうじ',meaning:'성씨'}]},

  'りゃ': { romaji:'rya', korean:'랴', english:'ryah', type:'hiragana_yoon', 
    tip:'り + 작은ゃ = "랴!" 약어(りゃくご)를 쓸 때 "랴~" 하세요. 📝',
    examples:[{word:'りゃくご',meaning:'약어'}]},

  'りゅ': { romaji:'ryu', korean:'류', english:'ryoo', type:'hiragana_yoon', 
    tip:'り + 작은ゅ = "류!" 유학(りゅうがく) 가는 장면을 상상하세요. ✈️',
    examples:[{word:'りゅうがく',meaning:'유학'},{word:'りゅうこう',meaning:'유행'}]},

  'りょ': { romaji:'ryo', korean:'료', english:'ryoh', type:'hiragana_yoon', 
    tip:'り + 작은ょ = "료!" 여행(りょこう) 가는 장면을 떠올리세요. 🗺️',
    examples:[{word:'りょこう',meaning:'여행'},{word:'りょうり',meaning:'요리'}]},

  'ぎゃ': { romaji:'gya', korean:'갸', english:'gyah', type:'hiragana_yoon', 
    tip:'ぎ + 작은ゃ = "갸!" 역전(ぎゃくてん)이나 반대(ぎゃく) 상황을 상상하며 "갸~" 하세요. 😂',
    examples:[{word:'ぎゃく',meaning:'반대'}]},

  'ぎゅ': { romaji:'gyu', korean:'규', english:'gyoo', type:'hiragana_yoon', 
    tip:'ぎ + 작은ゅ = "규!" 소고기(ぎゅうにく)를 먹으며 "규~" 하세요. 🥩',
    examples:[{word:'ぎゅうにく',meaning:'소고기'},{word:'ぎゅうにゅう',meaning:'우유'}]},

  'ぎょ': { romaji:'gyo', korean:'교', english:'gyoh', type:'hiragana_yoon', 
    tip:'ぎ + 작은ょ = "교!" 교자(ぎょうざ=만두)를 먹으며 "교~" 하세요. 🥟',
    examples:[{word:'ぎょうざ',meaning:'만두'}]},

  'じゃ': { romaji:'ja',  korean:'자', english:'jah',  type:'hiragana_yoon', 
    tip:'じ + 작은ゃ = "자"! 감자(じゃがいも)나 가위바위보(じゃんけん) 할 때 "자~" 하세요. 🥔',
    examples:[{word:'じゃがいも',meaning:'감자'},{word:'じゃんけん',meaning:'가위바위보'}]},

  'じゅ': { romaji:'ju',  korean:'주', english:'joo',  type:'hiragana_yoon', 
    tip:'じ + 작은ゅ = "주!" 주소(じゅうしょ)나 수업(じゅぎょう)을 생각하며 "주~" 하세요. 📚',
    examples:[{word:'じゅうしょ',meaning:'주소'},{word:'じゅぎょう',meaning:'수업'}]},

  'じょ': { romaji:'jo',  korean:'조', english:'joh',  type:'hiragana_yoon', 
    tip:'じ + 작은ょ = "조"! 잘한다(じょうず)고 칭찬받는 장면을 상상하세요. 👏',
    examples:[{word:'じょうず',meaning:'잘한다'},{word:'じょせい',meaning:'여성'}]},

  'びゃ': { romaji:'bya', korean:'뱌', english:'byah', type:'hiragana_yoon', 
    tip:'び + 작은ゃ = "뱌!" (드물지만) 밝고 순수한 느낌으로 "뱌~" 하세요.',
    examples:[{word:'びゃく',meaning:'밝은/순백'}]},

  'びゅ': { romaji:'byu', korean:'뷰', english:'byoo', type:'hiragana_yoon', 
    tip:'び + 작은ゅ = "뷰!" 바람이 "뷰~뷰~" 부는 소리를 상상하세요. 💨',
    examples:[{word:'びゅーびゅー',meaning:'바람 소리'}]},

  'びょ': { romaji:'byo', korean:'뵤', english:'byoh', type:'hiragana_yoon', 
    tip:'び + 작은ょ = "뵤!" 병원(びょういん)에 가는 장면을 떠올리세요. 🏥',
    examples:[{word:'びょういん',meaning:'병원'}]},

  'ぴゃ': { romaji:'pya', korean:'퍄', english:'pyah', type:'hiragana_yoon', 
    tip:'ぴ + 작은ゃ = "퍄!" 새가 "퍄~퍄~" 우는 맑은 소리를 상상하세요. 🐦',
    examples:[{word:'ぴゃーぴゃー',meaning:'꽥꽥'}]},

  'ぴゅ': { romaji:'pyu', korean:'퓨', english:'pyoo', type:'hiragana_yoon', 
    tip:'ぴ + 작은ゅ = "퓨!" 쌩 하고 날아가는 소리 "퓨~" 💨',
    examples:[{word:'ぴゅーっと',meaning:'쌩 하고'}]},

  'ぴょ': { romaji:'pyo', korean:'표', english:'pyoh', type:'hiragana_yoon', 
    tip:'ぴ + 작은ょ = "표!" 토끼가 깡충깡충(ぴょんぴょん) 뛰는 장면을 상상하세요. 🐰',
    examples:[{word:'ぴょんぴょん',meaning:'깡충깡충'}]},
};