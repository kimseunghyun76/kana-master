// ============================================================
// KANA KATAKANA DATA - basic, dakuten, handakuten, yoon
// ============================================================

'use strict';
var KANA_MAP = typeof KANA_MAP !== 'undefined' ? KANA_MAP : {};

Object.assign(KANA_MAP, {
  // ─────────────────── 가타가나 기본 ───────────────────
  'ア': { romaji:'a',   korean:'아', english:'ah',    type:'katakana', 
    tip:'알파벳 A를 살짝 눕힌 모양! 입을 크게 "아~" 하고 벌릴 때 아래턱이 내려가면서 A 형태가 됩니다. "아~ 맛있어!" 하며 아이스크림을 크게 한 입 먹는 장면을 생생히 상상하세요. A → ア → "아"를 5번 크게 소리 내며 공중에 그리면 바로 기억됩니다. 🔤🍦',
    examples:[{word:'アイス',meaning:'아이스크림'},{word:'アメリカ',meaning:'미국'},{word:'アニメ',meaning:'애니메이션'}]},

  'イ': { romaji:'i',   korean:'이', english:'ee',    type:'katakana', 
    tip:'알파벳 I를 세로로 곧게 세운 모습! "이~!" 하면서 검지 손가락을 하늘로 쭉 세우는 느낌입니다. 이탈리아 국기처럼 날카롭고 곧은 이미지. "이~탈리아!" 하며 피자를 먹는 장면과 연결지으세요. 손가락으로 공중에 イ를 크게 7번 그리며 "이~이~이" 소리 내는 연습 강력 추천! 🔤🇮🇹',
    examples:[{word:'イタリア',meaning:'이탈리아'},{word:'インターネット',meaning:'인터넷'}]},

  'ウ': { romaji:'u',   korean:'우', english:'oo',    type:'katakana', 
    tip:'우산의 둥근 윗부분처럼 부드러운 곡선! 입을 오므리며 "우~" 소리 낼 때 나오는 모양입니다. 비 오는 날 우산 쓰고 "우~산!" 하며 외쳐보세요. 우쿨렐레를 치는 손가락 움직임과도 비슷합니다. ☂️🎸',
    examples:[{word:'ウイルス',meaning:'바이러스'},{word:'ウクレレ',meaning:'우쿨렐레'}]},

  'エ': { romaji:'e',   korean:'에', english:'eh',    type:'katakana', 
    tip:'공사장 H빔처럼 가로로 길게 뻗은 모양! "에~?" 하며 놀랄 때 입이 좌우로 벌어지는 모습입니다. 에어컨 바람이 가로로 세게 나오는 장면 + 엘리베이터 문이 열리는 순간을 같이 상상하세요. 🏗️🛗',
    examples:[{word:'エアコン',meaning:'에어컨'},{word:'エレベーター',meaning:'엘리베이터'}]},

  'オ': { romaji:'o',   korean:'오', english:'oh',    type:'katakana', 
    tip:'입을 동그랗게 "오~" 하고 벌릴 때 정확히 나오는 모양! 오렌지를 한 입 베어 물 때 입이 커지는 장면을 떠올리세요. "오~렌지 주스!" 하며 과일 먹는 표정을 지으며 외우면 오래갑니다. 🍊',
    examples:[{word:'オレンジ',meaning:'오렌지'},{word:'オーストラリア',meaning:'호주'}]},

  'カ': { romaji:'ka',  korean:'카', english:'kah',   type:'katakana', 
    tip:'알파벳 K를 각지게 변형한 모양. 카메라 삼각대처럼 두 다리가 땅에 단단히 꽂힌 모습! "카~!" 하면서 사진 찍는 포즈를 취해보세요. 카페에서 "카페라떼!" 외치는 장면과 강하게 연결. 📸☕',
    examples:[{word:'カメラ',meaning:'카메라'},{word:'カフェ',meaning:'카페'},{word:'カレー',meaning:'카레'}]},

  'キ': { romaji:'ki',  korean:'키', english:'key',   type:'katakana', 
    tip:'나무(木) 모양에 키보드처럼 작은 가지 두 개가 위로 뻗은 형태. "키~!" 하면서 키 큰 나무가 하늘로 쭉쭉 자라는 장면을 상상하세요. 농구 선수가 "키가 크다!" 점프하는 모습도 좋습니다. 🌳🏀',
    examples:[{word:'キッチン',meaning:'부엌'},{word:'キャンプ',meaning:'캠핑'}]},

  'ク': { romaji:'ku',  korean:'쿠', english:'koo',   type:'katakana', 
    tip:'새 부리가 왼쪽으로 꺾여 쿠키를 쪼는 모습! "쿠~쿠~" 하며 참새가 먹이를 먹는 장면을 생생히 떠올리세요. 크리스마스에 트리 위에 앉아있는 새를 상상하면 더 강렬합니다. 🐦🍪',
    examples:[{word:'クラス',meaning:'클래스'},{word:'クリスマス',meaning:'크리스마스'}]},

  'ケ': { romaji:'ke',  korean:'케', english:'keh',   type:'katakana', 
    tip:'케이크를 자르는 칼처럼 각지고 날카로운 모양! "케~" 하면서 케이크 위에 초를 꽂는 장면을 상상하세요. 🍰',
    examples:[{word:'ケーキ',meaning:'케이크'},{word:'ケータイ',meaning:'휴대폰'}]},

  'コ': { romaji:'ko',  korean:'코', english:'koh',   type:'katakana', 
    tip:'코너(모서리)처럼 두 직각이 만나는 모양! "코~" 하면서 코너킥 하는 축구 장면이나 코너에서 기다리는 모습을 떠올리세요. 📐⚽',
    examples:[{word:'コーヒー',meaning:'커피'},{word:'コンビニ',meaning:'편의점'}]},

  'サ': { romaji:'sa',  korean:'사', english:'sah',   type:'katakana', 
    tip:'세 획이 모여 삼(三)처럼 보이는 모양! "사~" 하면서 사랑의 세 글자(사랑)를 세 번 쓰는 느낌. 사과를 세 개 나란히 놓은 장면을 상상하세요. 3️⃣🍎',
    examples:[{word:'サラダ',meaning:'샐러드'},{word:'サッカー',meaning:'축구'}]},

  'シ': { romaji:'shi', korean:'시', english:'shee',  type:'katakana', 
    tip:'웃는 입 모양 :) 을 가로로 길게 만든 것! "시~원해!" 하면서 시원한 샤워를 받는 장면을 상상하세요. 😁🚿',
    examples:[{word:'シャツ',meaning:'셔츠'},{word:'システム',meaning:'시스템'}]},

  'ス': { romaji:'su',  korean:'스', english:'soo',   type:'katakana', 
    tip:'숟가락 손잡이가 길게 내려오는 모양! "스~" 하면서 스프를 떠먹는 장면을 떠올리세요. 🥄📱',
    examples:[{word:'スポーツ',meaning:'스포츠'},{word:'スマホ',meaning:'스마트폰'}]},

  'セ': { romaji:'se',  korean:'세', english:'seh',   type:'katakana', 
    tip:'"세"탁기처럼 단순하고 깔끔한 가로+세로 조합! "세~" 하면서 세탁기 돌아가는 소리를 내며 외우세요. 📝',
    examples:[{word:'セーター',meaning:'스웨터'},{word:'センター',meaning:'센터'}]},

  'ソ': { romaji:'so',  korean:'소', english:'soh',   type:'katakana', 
    tip:'소나기처럼 비스듬히 내려오는 긴 선! "소~" 하면서 소고기 구울 때 연기 올라오는 장면을 상상하세요. ↘️',
    examples:[{word:'ソファ',meaning:'소파'},{word:'ソフトウェア',meaning:'소프트웨어'}]},

  'タ': { romaji:'ta',  korean:'타', english:'tah',   type:'katakana', 
    tip:'타이어(바퀴)처럼 짧은 획 두 개가 붙은 모양! "타~" 하면서 택시를 세우는 손동작을 떠올리세요. 📌🚕',
    examples:[{word:'タクシー',meaning:'택시'},{word:'テーブル',meaning:'테이블'}]},

  'チ': { romaji:'chi', korean:'치', english:'chee',  type:'katakana', 
    tip:'치즈를 길게 늘릴 때 나오는 늘어지는 모양! "치~즈!" 하면서 치즈를 길게 당기는 장면을 강렬하게 상상하세요. 🧀',
    examples:[{word:'チーズ',meaning:'치즈'},{word:'チケット',meaning:'티켓'}]},

  'ツ': { romaji:'tsu', korean:'츠', english:'tsoo',  type:'katakana', 
    tip:'웃는 눈 :) 두 개를 가로로 누운 형태! "츠~" 하면서 크게 웃을 때 눈이 가늘어지는 모양. 😄',
    examples:[{word:'ツアー',meaning:'투어'},{word:'ツイッター',meaning:'트위터'}]},

  'テ': { romaji:'te',  korean:'테', english:'teh',   type:'katakana', 
    tip:'테이블 위에 T자를 올려놓은 모양! "테~" 하면서 TV를 보는 장면(テレビ)을 상상하세요. 📺',
    examples:[{word:'テレビ',meaning:'TV'},{word:'テスト',meaning:'시험'}]},

  'ト': { romaji:'to',  korean:'토', english:'toh',   type:'katakana', 
    tip:'토끼 귀를 쫑긋 세운 모양! 🐰 "토~" 하면서 토끼가 귀를 움직이는 귀여운 장면을 상상하세요.',
    examples:[{word:'トマト',meaning:'토마토'},{word:'トイレ',meaning:'화장실'}]},

  'ナ': { romaji:'na',  korean:'나', english:'nah',   type:'katakana', 
    tip:'나이프 칼날처럼 날카로운 모양! 🔪 "나~" 하면서 나이프로 과일을 자르는 장면을 떠올리세요.',
    examples:[{word:'ナイフ',meaning:'나이프'},{word:'ナンバー',meaning:'번호'}]},

  'ニ': { romaji:'ni',  korean:'니', english:'nee',   type:'katakana', 
    tip:'니가 웃을 때 입처럼 두 개의 가로선! "니~" 하면서 미소 짓는 장면을 상상하세요.',
    examples:[{word:'ニュース',meaning:'뉴스'},{word:'ニコニコ',meaning:'니코니코'}]},

  'ヌ': { romaji:'nu',  korean:'누', english:'noo',   type:'katakana', 
    tip:'누들(라면 면)처럼 구불구불한 모양! 숫자 7을 부드럽게 만든 느낌. "누~" 하며 누들 먹는 장면. 7️⃣🍜',
    examples:[{word:'ヌードル',meaning:'누들'},{word:'ヌード',meaning:'누드'}]},

  'ネ': { romaji:'ne',  korean:'네', english:'neh',   type:'katakana', 
    tip:'네트워크처럼 선들이 서로 연결된 모양! 🔗 "네~" 하면서 인터넷 연결되는 장면을 상상하세요.',
    examples:[{word:'ネット',meaning:'넷'},{word:'ネクタイ',meaning:'넥타이'}]},

  'ノ': { romaji:'no',  korean:'노', english:'noh',   type:'katakana', 
    tip:'노트에 그리는 슬래시(/)처럼 비스듬한 한 획! 미끄럼틀 타고 내려가는 느낌 🛝 "노~"',
    examples:[{word:'ノート',meaning:'노트'},{word:'ノック',meaning:'노크'}]},

  'ハ': { romaji:'ha',  korean:'하', english:'hah',   type:'katakana', 
    tip:'하트의 윗부분이나 알파벳 H의 아래 반쪽! "하~" 하면서 크게 웃는 장면(하하!)을 상상하세요.',
    examples:[{word:'ハンバーガー',meaning:'햄버거'},{word:'ハワイ',meaning:'하와이'}]},

  'ヒ': { romaji:'hi',  korean:'히', english:'hee',   type:'katakana', 
    tip:'히히 웃을 때 입+코 모양처럼 F를 변형! "히~" 하며 웃는 장면을 강하게 연상하세요.',
    examples:[{word:'ヒーロー',meaning:'히어로'},{word:'ヒント',meaning:'힌트'}]},

  'フ': { romaji:'fu',  korean:'후', english:'foo',   type:'katakana', 
    tip:'후 불 때 입 모양 + 후크(갈고리)! "후~" 하면서 바람 불거나 후 불는 장면 🪝',
    examples:[{word:'フランス',meaning:'프랑스'},{word:'フルーツ',meaning:'과일'}]},

  'ヘ': { romaji:'he',  korean:'헤', english:'heh',   type:'katakana', 
    tip:'산봉우리(🏔️)나 헤드폰 모양! "헤~" 하면서 산에 오르는 장면을 상상하세요.',
    examples:[{word:'ヘルメット',meaning:'헬멧'},{word:'ヘッドフォン',meaning:'헤드폰'}]},

  'ホ': { romaji:'ho',  korean:'호', english:'hoh',   type:'katakana', 
    tip:'호텔 문패처럼 십자(十)에 두 획 추가! "호~" 하면서 호텔에 체크인하는 장면 🏨',
    examples:[{word:'ホテル',meaning:'호텔'},{word:'ホームページ',meaning:'홈페이지'}]},

  'マ': { romaji:'ma',  korean:'마', english:'mah',   type:'katakana', 
    tip:'알파벳 M과 거의 똑같은 모양! "마~" 하면서 맥도날드 M 로고를 떠올리세요. 🔤',
    examples:[{word:'マクドナルド',meaning:'맥도날드'},{word:'マスク',meaning:'마스크'}]},

  'ミ': { romaji:'mi',  korean:'미', english:'mee',   type:'katakana', 
    tip:'미소 지을 때 눈을 가늘게 뜰 때 세 줄! ≡ "미~"',
    examples:[{word:'ミルク',meaning:'우유'},{word:'ミュージック',meaning:'음악'}]},

  'ム': { romaji:'mu',  korean:'무', english:'moo',   type:'katakana', 
    tip:'무(소) 뿔 두 개가 위로 솟은 모양! 🐄 "무~" 하면서 소 울음소리와 함께 기억하세요.',
    examples:[{word:'ムード',meaning:'무드'},{word:'ムービー',meaning:'영화'}]},

  'メ': { romaji:'me',  korean:'메', english:'meh',   type:'katakana', 
    tip:'메모장에 X 표시처럼 교차하는 획! ✖️ "메~"',
    examples:[{word:'メール',meaning:'이메일'},{word:'メニュー',meaning:'메뉴'}]},

  'モ': { romaji:'mo',  korean:'모', english:'moh',   type:'katakana', 
    tip:'모자 쓰고 머리카락이 내려오는 모양! 🌾 "모~"',
    examples:[{word:'モデル',meaning:'모델'},{word:'モバイル',meaning:'모바일'}]},

  'ヤ': { romaji:'ya',  korean:'야', english:'yah',   type:'katakana', 
    tip:'알파벳 Y를 각지게 만든 모양! "야~" 하면서 손 번쩍 들 때 느낌. Y → ヤ 🔤',
    examples:[{word:'ヤフー',meaning:'야후'},{word:'ヤード',meaning:'야드'}]},

  'ユ': { romaji:'yu',  korean:'유', english:'yoo',   type:'katakana', 
    tip:'유턴처럼 부드럽게 구부러진 U 모양! "유~" 하면서 유튜브 보는 장면 🎥',
    examples:[{word:'ユーチューブ',meaning:'유튜브'},{word:'ユニフォーム',meaning:'유니폼'}]},

  'ヨ': { romaji:'yo',  korean:'요', english:'yoh',   type:'katakana', 
    tip:'요가 하는 사람이 다리 꼬는 듯한 E 변형! "요~"',
    examples:[{word:'ヨーグルト',meaning:'요거트'},{word:'ヨーロッパ',meaning:'유럽'}]},

  'ラ': { romaji:'ra',  korean:'라', english:'rah',   type:'katakana', 
    tip:'라면 그릇 들 때 팔 모양처럼 7자! "라~" 7️⃣🍜',
    examples:[{word:'ラーメン',meaning:'라면'},{word:'ラジオ',meaning:'라디오'}]},

  'リ': { romaji:'ri',  korean:'리', english:'ree',   type:'katakana', 
    tip:'리본 두 줄이 나란히 내려오는 모양! 🌿 "리~"',
    examples:[{word:'リモコン',meaning:'리모컨'},{word:'リズム',meaning:'리듬'}]},

  'ル': { romaji:'ru',  korean:'루', english:'roo',   type:'katakana', 
    tip:'루프(고리)를 각지게 만든 모양! "루~"',
    examples:[{word:'ルール',meaning:'규칙'},{word:'ルーム',meaning:'룸'}]},

  'レ': { romaji:'re',  korean:'레', english:'reh',   type:'katakana', 
    tip:'레고 블록 L자처럼! L → レ 🔤 "레~"',
    examples:[{word:'レストラン',meaning:'레스토랑'},{word:'レポート',meaning:'리포트'}]},

  'ロ': { romaji:'ro',  korean:'로', english:'roh',   type:'katakana', 
    tip:'로봇 얼굴처럼 네모난 사각형! □ "로~" 🤖',
    examples:[{word:'ロボット',meaning:'로봇'},{word:'ロシア',meaning:'러시아'}]},

  'ワ': { romaji:'wa',  korean:'와', english:'wah',   type:'katakana', 
    tip:'와! 하고 놀랄 때 입 모양! W처럼 "와~"',
    examples:[{word:'ワイン',meaning:'와인'},{word:'ワールド',meaning:'월드'}]},

  'ヲ': { romaji:'wo',  korean:'오', english:'oh',    type:'katakana', 
    tip:'조사로만 쓰이는 특별 가타가나. 발음은 "오"지만 거의 안 쓰입니다. "오브젝트(목적어)" 표시로 기억하세요. ⭐',
    examples:[{word:'(조사용)',meaning:'particle'}]},

  'ン': { romaji:'n',   korean:'음', english:'n/ng',  type:'katakana', 
    tip:'코를 "응~" 할 때 코 모양! 👃 "응~ 맛있어!" 하며 라면 먹는 장면을 상상하면 강력하게 기억됩니다.',
    examples:[{word:'ランチ',meaning:'점심'}]},

  // ─────────────────── 가타가나 탁음 ───────────────────
  'ガ': { romaji:'ga',  korean:'가', english:'gah',   type:'katakana_dakuten', 
    tip:'カ에 탁점(゛) 두 개를 붙이면 목소리가 거칠어져 "가!"가 됩니다. 껌을 세게 씹으며 "가~!" 하는 느낌. 탁점 = 목에 힘주는 표시로 기억! 🍬',
    examples:[{word:'ガム',meaning:'껌'},{word:'ガレージ',meaning:'차고'}]},

  'ギ': { romaji:'gi',  korean:'기', english:'gee',   type:'katakana_dakuten', 
    tip:'キ에 탁점 → "기"! 기타를 세게 치는 장면 🎸 "기~!"',
    examples:[{word:'ギター',meaning:'기타'},{word:'ギリシャ',meaning:'그리스'}]},

  'グ': { romaji:'gu',  korean:'구', english:'goo',   type:'katakana_dakuten', 
    tip:'ク에 탁점 → "구"! 구글 검색하는 듯 "구~" 🔍',
    examples:[{word:'グーグル',meaning:'구글'},{word:'グラス',meaning:'글라스'}]},

  'ゲ': { romaji:'ge',  korean:'게', english:'geh',   type:'katakana_dakuten', 
    tip:'ケ에 탁점 → "게"! 게임기 잡고 "게~" 하는 장면 🎮',
    examples:[{word:'ゲーム',meaning:'게임'},{word:'ゲスト',meaning:'게스트'}]},

  'ゴ': { romaji:'go',  korean:'고', english:'goh',   type:'katakana_dakuten', 
    tip:'コ에 탁점 → "고"! 골프 스윙하며 "고!" ⛳',
    examples:[{word:'ゴルフ',meaning:'골프'},{word:'ゴール',meaning:'골'}]},

  'ザ': { romaji:'za',  korean:'자', english:'zah',   type:'katakana_dakuten', 
    tip:'サ에 탁점 → "자"! 채널 돌리며 "자~" 📺',
    examples:[{word:'ザッピング',meaning:'채널 돌리기'}]},

  'ジ': { romaji:'ji',  korean:'지', english:'jee',   type:'katakana_dakuten', 
    tip:'シ에 탁점 → "지"! 주스 마시며 "지~" 🧃',
    examples:[{word:'ジュース',meaning:'주스'},{word:'ジャケット',meaning:'재킷'}]},

  'ズ': { romaji:'zu',  korean:'즈', english:'zoo',   type:'katakana_dakuten', 
    tip:'ス에 탁점 → "즈"! 바지(ズボン) 입으며 "즈~" 👖',
    examples:[{word:'ズボン',meaning:'바지'},{word:'ズーム',meaning:'줌'}]},

  'ゼ': { romaji:'ze',  korean:'제', english:'zeh',   type:'katakana_dakuten', 
    tip:'セ에 탁점 → "제"! 젤리 먹으며 "제~" 🍮',
    examples:[{word:'ゼリー',meaning:'젤리'},{word:'ゼロ',meaning:'제로'}]},

  'ゾ': { romaji:'zo',  korean:'조', english:'zoh',   type:'katakana_dakuten', 
    tip:'ソ에 탁점 → "조"! 좀비 걸으며 "조~" 🧟',
    examples:[{word:'ゾンビ',meaning:'좀비'}]},

  'ダ': { romaji:'da',  korean:'다', english:'dah',   type:'katakana_dakuten', 
    tip:'タ에 탁점 → "다"! 댄스 추며 "다~" 💃',
    examples:[{word:'ダンス',meaning:'댄스'},{word:'ダイヤ',meaning:'다이아'}]},

  'デ': { romaji:'de',  korean:'데', english:'deh',   type:'katakana_dakuten', 
    tip:'テ에 탁점 → "데"! 디자인 그리며 "데~" 🎨',
    examples:[{word:'デザイン',meaning:'디자인'},{word:'デート',meaning:'데이트'}]},

  'ド': { romaji:'do',  korean:'도', english:'doh',   type:'katakana_dakuten', 
    tip:'ト에 탁점 → "도"! 문(ドア) 열 때 "도~" 🚪',
    examples:[{word:'ドア',meaning:'문'},{word:'ドラマ',meaning:'드라마'}]},

  'バ': { romaji:'ba',  korean:'바', english:'bah',   type:'katakana_dakuten', 
    tip:'ハ에 탁점 → "바"! 버스 타며 "바~" 🚌',
    examples:[{word:'バス',meaning:'버스'},{word:'バナナ',meaning:'바나나'}]},

  'ビ': { romaji:'bi',  korean:'비', english:'bee',   type:'katakana_dakuten', 
    tip:'ヒ에 탁점 → "비"! 맥주(ビール) 마시며 "비~" 🍺',
    examples:[{word:'ビール',meaning:'맥주'},{word:'ビデオ',meaning:'비디오'}]},

  'ブ': { romaji:'bu',  korean:'부', english:'boo',   type:'katakana_dakuten', 
    tip:'フ에 탁점 → "부"! 블로그 쓰며 "부~" 💻',
    examples:[{word:'ブログ',meaning:'블로그'},{word:'ブランド',meaning:'브랜드'}]},

  'ベ': { romaji:'be',  korean:'베', english:'beh',   type:'katakana_dakuten', 
    tip:'ヘ에 탁점 → "베"! 침대(ベッド)에 누우며 "베~" 🛏️',
    examples:[{word:'ベッド',meaning:'침대'},{word:'ベルト',meaning:'벨트'}]},

  'ボ': { romaji:'bo',  korean:'보', english:'boh',   type:'katakana_dakuten', 
    tip:'ホ에 탁점 → "보"! 공(ボール) 차며 "보~" ⚽',
    examples:[{word:'ボール',meaning:'공'},{word:'ボタン',meaning:'버튼'}]},

  // ─────────────────── 가타가나 반탁음 ───────────────────
  'パ': { romaji:'pa',  korean:'파', english:'pah',   type:'katakana_handakuten', 
    tip:'ハ에 반탁점(゜) → "파"! 여권(パスポート) 들고 "파~" 🛂',
    examples:[{word:'パスポート',meaning:'여권'},{word:'パーティー',meaning:'파티'}]},

  'ピ': { romaji:'pi',  korean:'피', english:'pee',   type:'katakana_handakuten', 
    tip:'ヒ에 반탁점 → "피"! 피자 먹으며 "피~" 🍕',
    examples:[{word:'ピザ',meaning:'피자'},{word:'ピアノ',meaning:'피아노'}]},

  'プ': { romaji:'pu',  korean:'푸', english:'poo',   type:'katakana_handakuten', 
    tip:'フ에 반탁점 → "푸"! 수영장(プール)에서 "푸~" 🏊',
    examples:[{word:'プール',meaning:'수영장'},{word:'プリンター',meaning:'프린터'}]},

  'ペ': { romaji:'pe',  korean:'페', english:'peh',   type:'katakana_handakuten', 
    tip:'ヘ에 반탁점 → "페"! 반려동물(ペット) 안으며 "페~" 🐾',
    examples:[{word:'ペット',meaning:'반려동물'},{word:'ペン',meaning:'펜'}]},

  'ポ': { romaji:'po',  korean:'포', english:'poh',   type:'katakana_handakuten', 
    tip:'ホ에 반탁점 → "포"! 포켓몬 잡으며 "포~" 🎮',
    examples:[{word:'ポケモン',meaning:'포켓몬'},{word:'ポスター',meaning:'포스터'}]},

  // ─────────────────── 가타가나 요음 (완전판) ───────────────────
  'キャ': { romaji:'kya', korean:'캬', english:'kyah', type:'katakana_yoon', 
    tip:'キ + 작은ャ = "캬!" 귀여운 캐릭터(キャラクター)가 "캬~" 하는 소리! 🎭🐱',
    examples:[{word:'キャラクター',meaning:'캐릭터'},{word:'キャンセル',meaning:'취소'}]},

  'キュ': { romaji:'kyu', korean:'큐', english:'kyoo', type:'katakana_yoon', 
    tip:'キ + 작은ュ = "큐!" 큐브를 돌리며 "큐~" 하는 느낌 🎲',
    examples:[{word:'キュート',meaning:'귀엽다'},{word:'キューブ',meaning:'큐브'}]},

  'キョ': { romaji:'kyo', korean:'쿄', english:'kyoh', type:'katakana_yoon', 
    tip:'キ + 작은ョ = "쿄!" 교토(キョウト) 절에 가는 장면 ⛩️',
    examples:[{word:'キョウト',meaning:'교토'}]},

  'シャ': { romaji:'sha', korean:'샤', english:'shah', type:'katakana_yoon', 
    tip:'シ + 작은ャ = "샤!" 샤워기 물 나오며 "샤~" 🚿',
    examples:[{word:'シャワー',meaning:'샤워'},{word:'シャンプー',meaning:'샴푸'}]},

  'シュ': { romaji:'shu', korean:'슈', english:'shoo', type:'katakana_yoon', 
    tip:'シ + 작은ュ = "슈!" 슈크림 먹으며 "슈~" 🍰',
    examples:[{word:'シュークリーム',meaning:'슈크림'},{word:'シュート',meaning:'슛'}]},

  'ショ': { romaji:'sho', korean:'쇼', english:'shoh', type:'katakana_yoon', 
    tip:'シ + 작은ョ = "쇼!" 쇼핑하며 "쇼~" 🛍️',
    examples:[{word:'ショッピング',meaning:'쇼핑'}]},

  'チャ': { romaji:'cha', korean:'차', english:'chah', type:'katakana_yoon', 
    tip:'チ + 작은ャ = "차!" 찬스 잡으며 "차~" 🎯',
    examples:[{word:'チャンス',meaning:'찬스'},{word:'チャンネル',meaning:'채널'}]},

  'チュ': { romaji:'chu', korean:'추', english:'choo', type:'katakana_yoon', 
    tip:'チ + 작은ュ = "추!" 튤립 향 맡으며 "추~" 🌷',
    examples:[{word:'チューリップ',meaning:'튤립'}]},

  'チョ': { romaji:'cho', korean:'쵸', english:'choh', type:'katakana_yoon', 
    tip:'チ + 작은ョ = "쵸!" 초콜릿 먹으며 "쵸~" 🍫',
    examples:[{word:'チョコレート',meaning:'초콜릿'}]},

  'ニャ': { romaji:'nya', korean:'냐', english:'nyah', type:'katakana_yoon', 
    tip:'ニ + 작은ャ = "냐!" 고양이가 "냐~" 우는 소리 🐱',
    examples:[{word:'ニャンコ',meaning:'고양이'}]},

  'ニュ': { romaji:'nyu', korean:'뉴', english:'nyoo', type:'katakana_yoon', 
    tip:'ニ + 작은ュ = "뉴!" 뉴스 보는 장면 📰',
    examples:[{word:'ニュース',meaning:'뉴스'},{word:'ニューヨーク',meaning:'뉴욕'}]},

  'ニョ': { romaji:'nyo', korean:'뇨', english:'nyoh', type:'katakana_yoon', 
    tip:'ニ + 작은ョ = "뇨!" 뇨키(gnocchi)를 먹는 장면 🍝',
    examples:[{word:'ニョッキ',meaning:'뇨키'}]},

  'ヒャ': { romaji:'hya', korean:'햐', english:'hyah', type:'katakana_yoon', 
    tip:'ヒ + 작은ャ = "햐!" 백(ヒャク=100)을 세는 장면 💯',
    examples:[{word:'ヒャク',meaning:'100'}]},

  'ヒュ': { romaji:'hyu', korean:'휴', english:'hyoo', type:'katakana_yoon', 
    tip:'ヒ + 작은ュ = "휴!" 퓨즈(ヒューズ)나 휴스턴을 생각하며 "휴~" 👤',
    examples:[{word:'ヒューズ',meaning:'퓨즈'},{word:'ヒューストン',meaning:'휴스턴'}]},

  'ヒョ': { romaji:'hyo', korean:'효', english:'hyoh', type:'katakana_yoon', 
    tip:'ヒ + 작은ョ = "효"! 표범(ヒョウ)이 으르렁거리는 강렬한 장면 🐆',
    examples:[{word:'ヒョウ',meaning:'표범'}]},

  'ミャ': { romaji:'mya', korean:'먀', english:'myah', type:'katakana_yoon', 
    tip:'ミ + 작은ャ = "먀"! 미얀마(ミャンマー)를 떠올리며 "먀~"',
    examples:[{word:'ミャンマー',meaning:'미얀마'}]},

  'ミュ': { romaji:'myu', korean:'뮤', english:'myoo', type:'katakana_yoon', 
    tip:'ミ + 작은ュ = "뮤!" 뮤직(ミュージック)을 들으며 "뮤~" 🎵',
    examples:[{word:'ミュージック',meaning:'뮤직'},{word:'ミュージアム',meaning:'뮤지엄'}]},

  'ミョ': { romaji:'myo', korean:'묘', english:'myoh', type:'katakana_yoon', 
    tip:'ミ + 작은ョ = "묘!" (드물지만) 묘한 느낌으로 기억하세요.',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},

  'リャ': { romaji:'rya', korean:'랴', english:'ryah', type:'katakana_yoon', 
    tip:'リ + 작은ャ = "랴!" (드물지만) 약어 등에서 사용.',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},

  'リュ': { romaji:'ryu', korean:'류', english:'ryoo', type:'katakana_yoon', 
    tip:'リ + 작은ュ = "류!" 배낭(リュック)을 메고 여행 가는 장면 🎒',
    examples:[{word:'リュック',meaning:'배낭'}]},

  'リョ': { romaji:'ryo', korean:'료', english:'ryoh', type:'katakana_yoon', 
    tip:'リ + 작은ョ = "료!" 여행(リョコウ) 가는 장면 ✈️',
    examples:[{word:'リョコウ',meaning:'여행'}]},

  'ギャ': { romaji:'gya', korean:'갸', english:'gyah', type:'katakana_yoon', 
    tip:'ギ + 작은ャ = "갸!" 개그(ギャグ) 하며 "갸~" 😂',
    examples:[{word:'ギャグ',meaning:'개그'},{word:'ギャップ',meaning:'갭'}]},

  'ギュ': { romaji:'gyu', korean:'규', english:'gyoo', type:'katakana_yoon', 
    tip:'ギ + 작은ュ = "규!" 꽉(ギュッと) 쥐는 느낌 💪',
    examples:[{word:'ギュっと',meaning:'꽉'}]},

  'ギョ': { romaji:'gyo', korean:'교', english:'gyoh', type:'katakana_yoon', 
    tip:'ギ + 작은ョ = "교"! 만두(ギョーザ)를 먹는 장면 🥟',
    examples:[{word:'ギョーザ',meaning:'만두'}]},

  'ジャ': { romaji:'ja',  korean:'자', english:'jah',  type:'katakana_yoon', 
    tip:'ジ + 작은ャ = "자"! 재즈(ジャズ)를 들으며 "자~" 🎷',
    examples:[{word:'ジャズ',meaning:'재즈'},{word:'ジャム',meaning:'잼'}]},

  'ジュ': { romaji:'ju',  korean:'주', english:'joo',  type:'katakana_yoon', 
    tip:'ジ + 작은ュ = "주!" 주스 마시며 "주~" 🧃',
    examples:[{word:'ジュース',meaning:'주스'},{word:'ジュエリー',meaning:'주얼리'}]},

  'ジョ': { romaji:'jo',  korean:'조', english:'joh',  type:'katakana_yoon', 
    tip:'ジ + 작은ョ = "조!" 조깅(ジョギング)하며 "조~" 🏃',
    examples:[{word:'ジョギング',meaning:'조깅'},{word:'ジョーク',meaning:'농담'}]},

  'ビャ': { romaji:'bya', korean:'뱌', english:'byah', type:'katakana_yoon', 
    tip:'ビ + 작은ャ = "뱌!" (드물지만) 뱀처럼 미끄러운 느낌으로 기억하세요.',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},

  'ビュ': { romaji:'byu', korean:'뷰', english:'byoo', type:'katakana_yoon', 
    tip:'ビ + 작은ュ = "뷰"! 뷰티(ビューティー)나 뷰(전망)를 보며 "뷰~" 💄',
    examples:[{word:'ビュッフェ',meaning:'뷔페'},{word:'ビュー',meaning:'뷰'}]},

  'ビョ': { romaji:'byo', korean:'뵤', english:'byoh', type:'katakana_yoon', 
    tip:'ビ + 작은ョ = "뵤!" 병원(ビョウイン) 느낌으로 "뵤~"',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},

  'ピャ': { romaji:'pya', korean:'퍄', english:'pyah', type:'katakana_yoon', 
    tip:'ピ + 작은ャ = "퍄!" (드물지만) 밝고 튀는 소리로 "퍄~"',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},

  'ピュ': { romaji:'pyu', korean:'퓨', english:'pyoo', type:'katakana_yoon', 
    tip:'ピ + 작은ュ = "퓨"! 퓨어(ピュア)한 느낌으로 "퓨~" 💧',
    examples:[{word:'ピュア',meaning:'퓨어'}]},

  'ピョ': { romaji:'pyo', korean:'표', english:'pyoh', type:'katakana_yoon', 
    tip:'ピ + 작은ョ = "표"! 토끼가 깡충깡충(ぴょんぴょん) 뛰는 장면 🐰',
    examples:[{word:'(드물게 사용)',meaning:'rarely used'}]},
});

if (typeof module !== 'undefined') {
  module.exports = { KANA_MAP };
}