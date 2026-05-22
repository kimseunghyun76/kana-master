// ============================================================
// KANA EXTRA DATA - special mora, extended katakana, particles
// ============================================================

'use strict';

Object.assign(KANA_MAP, {
  // ─────────────────── 특수 박자 (Special Mora) ───────────────────
  'っ': { romaji:'(tt/kk/ss/pp)', korean:'촉음', english:'dbl.cons.', type:'special', 
    tip:'다음 자음을 **살짝 막았다가 강하게 터뜨리는** 소리. 숨을 순간적으로 멈추는 느낌! 예: きっぷ → "킵-푸" (입술을 잠깐 막음). 한국어 된소리보다 가볍고 짧게 끊어집니다. ✋',
    examples:[{word:'きって',meaning:'우표'},{word:'ざっし',meaning:'잡지'},{word:'ちょっと',meaning:'잠깐'},{word:'きっぷ',meaning:'표'},{word:'がっこう',meaning:'학교'}]},

  'ッ': { romaji:'(TT/KK/SS)', korean:'촉음(가타)', english:'dbl.cons.', type:'special', 
    tip:'가타가나 촉음. ベッド → "베-또", ネット → "넷-토"처럼 강하게 끊어서 발음. 외래어 리듬을 살리는 핵심입니다. 🔥',
    examples:[{word:'コップ',meaning:'컵'},{word:'ベッド',meaning:'침대'},{word:'ネット',meaning:'인터넷'},{word:'バッグ',meaning:'가방'}]},

  'ー': { romaji:'ā/ī/ū/ē/ō', korean:'장음부', english:'long vowel', type:'special', 
    tip:'앞 모음을 **2배 길게** 늘려 발음. コーヒー → "코~히~", ラーメン → "라~멘". 노래 부르듯 길게 끌며 연습하세요. ☕',
    examples:[{word:'コーヒー',meaning:'커피'},{word:'スーパー',meaning:'슈퍼'},{word:'ケーキ',meaning:'케이크'},{word:'ラーメン',meaning:'라멘'}]},

  'おう': { romaji:'ō (오~)', korean:'お+う 장음', english:'long O', type:'special', 
    tip:'お + う = **"오~" 길게** 끌기. とうきょう → "토~쿄", おとうさん → "오~토~산". 일본 지명·단어에서 매우 자주 나오는 장음 패턴입니다. 🗼',
    examples:[{word:'とうきょう',meaning:'도쿄'},{word:'おとうさん',meaning:'아버지'},{word:'こうえん',meaning:'공원'}]},

  'えい': { romaji:'ē (エ~)', korean:'え+い 장음', english:'long E', type:'special', 
    tip:'え + い = **"에~" 길게** 끌기. せんせい → "센세~", えいが → "에~가". 사람 호칭과 외래어에서 자주 등장합니다. 📖',
    examples:[{word:'せんせい',meaning:'선생님'},{word:'えいが',meaning:'영화'},{word:'えいご',meaning:'영어'}]},

  'ああ': { romaji:'ā (아~)', korean:'あ+あ 장음', english:'long A', type:'special', 
    tip:'あ + あ = **"아~" 길게** 끌기. おかあさん → "오카~산". 가족 호칭에서 자주 사용됩니다. 👩',
    examples:[{word:'おかあさん',meaning:'어머니'},{word:'おばあさん',meaning:'할머니'}]},

  'いい': { romaji:'ī (이~)', korean:'い+い 장음', english:'long I', type:'special', 
    tip:'い + い = **"이~" 길게** 끌기. おにいさん → "오니~산". 친족 호칭에서 중요합니다. 👦',
    examples:[{word:'おにいさん',meaning:'오빠/형'},{word:'おじいさん',meaning:'할아버지'}]},

  'うう': { romaji:'ū (우~)', korean:'う+う 장음', english:'long U', type:'special', 
    tip:'う + う = **"우~" 길게** 끌기. ふうせん → "후~센". 길게 끌며 발음 연습이 필요합니다. 🎈',
    examples:[{word:'ふうせん',meaning:'풍선'},{word:'ゆうめい',meaning:'유명하다'}]},

  // ─────────────────── 가타가나 외래어 확장 ───────────────────
  'ファ': { romaji:'fa', korean:'파', english:'fah', type:'katakana_extended', 
    tip:'フ + ァ = **"파(fa)"**. 입술을 살짝 오므리고 F음처럼 아랫입술을 윗니로 가볍게 물며 발음. ファッション, ソファ 등에서 매우 자주 나옵니다. 👠',
    examples:[{word:'ファッション',meaning:'패션'},{word:'ソファ',meaning:'소파'},{word:'ファン',meaning:'팬'}]},

  'フィ': { romaji:'fi', korean:'피', english:'fee', type:'katakana_extended', 
    tip:'フ + ィ = **"피(fi)"**. "피" 소리를 낼 때 입을 살짝 모으고 영어 "fee"처럼 가볍게. 필름, 피트니스 등에서 사용.',
    examples:[{word:'フィルム',meaning:'필름'},{word:'フィットネス',meaning:'피트니스'}]},

  'フェ': { romaji:'fe', korean:'페', english:'feh', type:'katakana_extended', 
    tip:'フ + ェ = **"페(fe)"**. "페" 소리를 부드럽게. 카페, 페스티벌 등에서 흔합니다.',
    examples:[{word:'カフェ',meaning:'카페'},{word:'フェスティバル',meaning:'페스티벌'}]},

  'フォ': { romaji:'fo', korean:'포', english:'foh', type:'katakana_extended', 
    tip:'フ + ォ = **"포(fo)"**. "포" 소리를 입을 동그랗게 모으며. 포크, 폴더 등에서 사용.',
    examples:[{word:'フォーク',meaning:'포크'},{word:'フォルダ',meaning:'폴더'}]},

  'ティ': { romaji:'ti', korean:'티', english:'tee', type:'katakana_extended', 
    tip:'テ + ィ = **"티(ti)"**. 혀를 윗잇몸에 살짝 대고 "티" 소리. 파티, 티슈 등에서 자주 나옵니다.',
    examples:[{word:'パーティー',meaning:'파티'},{word:'ティッシュ',meaning:'티슈'}]},

  'ディ': { romaji:'di', korean:'디', english:'dee', type:'katakana_extended', 
    tip:'デ + ィ = **"디(di)"**. "디" 소리를 부드럽게. 디즈니, 미디어 등에서 흔합니다.',
    examples:[{word:'ディズニー',meaning:'디즈니'},{word:'メディア',meaning:'미디어'}]},

  'トゥ': { romaji:'tu', korean:'투', english:'too', type:'katakana_extended', 
    tip:'ト + ゥ = **"투(tu)"**. 입을 살짝 오므리고 "투" 소리. today, true 등을 표기할 때 사용.',
    examples:[{word:'トゥデイ',meaning:'투데이'},{word:'トゥルー',meaning:'트루'}]},

  'ウィ': { romaji:'wi', korean:'위', english:'wee', type:'katakana_extended', 
    tip:'ウ + ィ = **"위(wi)"**. "위" 소리를 가볍게. 윈도우, 위스키 등에서 사용.',
    examples:[{word:'ウィンドウ',meaning:'윈도우'},{word:'ウィスキー',meaning:'위스키'}]},

  'ヴ': { romaji:'vu', korean:'브(v)', english:'voo', type:'katakana_extended', 
    tip:'영어 **V음** 전용. 아랫입술을 윗니로 살짝 깨물며 "브" 소리를 냅니다. 바이올린, 베네치아 등에서 사용.',
    examples:[{word:'ヴァイオリン',meaning:'바이올린'},{word:'ヴェネチア',meaning:'베네치아'}]},

  // ─────────────────── 조사 읽기 예외 ───────────────────
  'は_p': { kana:'は', romaji:'wa', korean:'와 (주제조사)', english:'wa (topic)', type:'particle', 
    tip:'조사로 쓰일 때는 **"와"**로 발음! わたしは → "와타시와". 입을 살짝 벌리고 부드럽게 "와" 소리를 내세요. 일본어에서 가장 중요한 발음 예외입니다.',
    examples:[{word:'わたし は',meaning:'나는'},{word:'きょう は',meaning:'오늘은'}]},

  'へ_p': { kana:'へ', romaji:'e', korean:'에 (방향조사)', english:'e (direction)', type:'particle', 
    tip:'조사로 쓰일 때는 **"에"**로 발음! がっこうへ → "학교에". 방향을 나타낼 때 사용합니다. 🏫',
    examples:[{word:'がっこう へ',meaning:'학교로'},{word:'にほん へ',meaning:'일본으로'}]},

  'を_p': { kana:'を', romaji:'o', korean:'을/를 (목적조사)', english:'o (object)', type:'particle', 
    tip:'**항상 "오"로 발음**합니다. りんごを食べる → "링고오 타베루". 목적어를 표시하는 조사예요. 🍎',
    examples:[{word:'りんご を',meaning:'사과를'},{word:'にほんご を',meaning:'일본어를'}]}
});