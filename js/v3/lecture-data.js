/* ============================================================
   V3 LECTURE DATA — beginner-first course scripts
   ============================================================ */

'use strict';

window.LECTURE_DATA = window.LECTURE_DATA || {};

window.LECTURE_DATA.v3_kana_map = [
  {
    type: 'hook', label: '문자 지도', duration: 6000, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: '오십음도',
    sub: '일본어 글자는 무작정 외우는 표가 아니야.\n\n가로는 __모음__\n세로는 __자음 가족__\n\nあ い う え お\nか き く け こ\nさ し す せ そ\n\n→ 표의 위치를 알면 새 글자도 덜 낯설어져.',
    captionKo: '오십음도는 일본어 글자 전체를 한눈에 보는 지도야. 가로줄은 아, 이, 우, 에, 오처럼 입 모양이 바뀌고, 세로줄은 카행, 사행처럼 같은 자음 가족으로 묶여. 처음엔 예쁘게 쓰는 것보다 위치와 소리를 같이 기억하는 게 훨씬 빨라.',
    captionJp: '五十音表は、日本語の文字を覚えるための地図です。横は母音、縦は子音のグループです。位置と音を一緒に覚えると、ひらがなもカタカナもずっと覚えやすくなります。'
  },
  {
    type: 'mnemonic', label: '외우는 순서', duration: 7000, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: '행으로 외우기',
    sub: '처음 목표는 완벽한 필기가 아니야.\n\n1. あいうえお 리듬\n2. かさたなはまやらわ 행\n3. 헷갈리는 글자만 따로 묶기\n4. 단어에서 다시 보기\n\n→ __표 → 카드 → 단어__ 순서가 가장 빠르다.',
    captionKo: '가나는 한 글자씩 랜덤으로 외우면 금방 지쳐. 먼저 あいうえお 리듬으로 입을 풀고, 그다음 행 단위로 묶어. 마지막에는 단어 안에서 다시 보는 식으로 반복하면 기억이 오래 간다.',
    captionJp: 'ひとつずつバラバラに覚えるより、行ごとにリズムで覚える方が早いです。表、カード、単語の順番で進めましょう。'
  },
  {
    type: 'summary', label: '오늘의 기준', duration: 5000, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: '처음 합격선',
    sub: '오늘은 이것만 되면 성공.\n\n✓ あいうえお를 보고 읽기\n✓ 행과 단의 의미 알기\n✓ 히라가나와 가타가나가 왜 둘인지 알기\n✓ 모르는 글자는 표에서 찾기\n\n→ 암기는 다음 카드에서 완성한다.',
    captionKo: '오늘은 다 외우려고 하지 않아도 돼. 오십음도가 어떤 구조인지 알고, 모르는 글자를 표에서 찾을 수 있으면 출발은 끝난 거야. 다음 카드 학습에서 손과 귀로 붙이면 된다.',
    captionJp: '今日は全部覚えなくても大丈夫です。五十音表の仕組みが分かり、分からない文字を表で探せれば十分です。'
  }
];

window.LECTURE_DATA.v3_hiragana_intro = [
  {
    type: 'hook', label: '히라가나의 역할', duration: 6000, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: 'ひらがな',
    sub: '히라가나는 일본어의 __기본 손글씨__야.\n\n조사, 어미, 쉬운 단어에 자주 나와.\n\n예)\n  は / を / に\n  です / ます\n  ありがとう\n\n→ 일본어 문장의 뼈대.',
    captionKo: '히라가나는 일본어 문장의 기본 바탕이야. 조사, 동사 끝, 쉬운 단어에 계속 나오니까 히라가나를 읽기 시작하면 문장이 갑자기 덜 낯설어져.',
    captionJp: 'ひらがなは日本語の基本です。助詞、語尾、やさしい単語によく使われます。'
  },
  {
    type: 'mnemonic', label: '암기 팁', duration: 7000, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: '소리 먼저',
    sub: '예쁘게 쓰기보다 먼저 할 일.\n\n1. 보고 소리내기\n2. 듣고 고르기\n3. 헷갈리는 글자 비교\n4. 짧은 단어로 확인\n\n→ __읽기 속도__가 먼저 올라야 여행에서 쓸 수 있어.',
    captionKo: '처음부터 쓰기 모양에 너무 오래 매달리지 마. 여행 준비가 목표라면 먼저 읽고 알아보는 속도가 중요해. 쓰기는 카드와 퀴즈를 돌면서 자연스럽게 붙이면 된다.',
    captionJp: '最初はきれいに書くことより、見て読めることが大事です。読む速さを先に上げましょう。'
  }
];

window.LECTURE_DATA.v3_katakana_intro = [
  {
    type: 'hook', label: '가타가나의 역할', duration: 6000, audio: null,
    image: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp',
    main: 'カタカナ',
    sub: '가타가나는 __외래어 표지판__이야.\n\n커피, 호텔, 카드, 택시처럼\n여행에서 바로 만나는 단어가 많아.\n\nコーヒー\nホテル\nカード\nタクシー',
    captionKo: '가타가나는 외래어, 브랜드명, 메뉴판에서 엄청 자주 보여. 일본 여행을 빨리 준비하려면 히라가나만큼 가타가나도 중요해. 간판과 메뉴 읽기에서 바로 효과가 난다.',
    captionJp: 'カタカナは外来語、ブランド名、メニューでよく使われます。旅行ではとても役に立ちます。'
  },
  {
    type: 'mnemonic', label: '암기 팁', duration: 7000, audio: null,
    image: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp',
    main: '한국어 외래어와 연결',
    sub: 'カタカナ는 이미 아는 단어로 외우면 빨라.\n\nホテル = 호텔\nカード = 카드\nコーヒー = 커피\nタクシー = 택시\n\n→ 낯선 글자를 __아는 소리__에 붙인다.',
    captionKo: '가타가나는 한국어 외래어와 연결해서 외우면 속도가 빨라. 글자는 낯설지만 소리는 이미 아는 경우가 많다. 그래서 단어째로 읽는 연습이 효과적이야.',
    captionJp: 'カタカナは知っている外来語と一緒に覚えると早いです。文字を知っている音に結びつけましょう。'
  }
];

window.LECTURE_DATA.v3_kana_sound_rules = [
  {
    type: 'hook', label: '소리 규칙', duration: 6500, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: '글자 다음은 소리',
    sub: '글자를 외워도 바로 막히는 이유가 있어.\n\nが / ぱ / きゃ\nちょっと\nコーヒー\n\n탁음, 요음, 촉음, 장음은\n단어 안에서 익혀야 귀에 붙는다.',
    captionKo: '히라가나와 가타가나를 외웠다면 다음 벽은 소리 규칙이야. が처럼 점이 붙는 소리, きゃ처럼 작은 글자가 붙는 소리, ちょっと의 작은 つ, コーヒー의 긴 소리를 따로 잡아야 실제 단어가 들린다.',
    captionJp: '文字を覚えたら、次は音のルールです。濁音、拗音、促音、長音を単語の中で覚えましょう。'
  },
  {
    type: 'practice', label: '조사 발음', duration: 6500, audio: null,
    image: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    main: 'は・へ・を',
    sub: '문장에서는 발음이 달라지는 글자가 있어.\n\n私は = わたしは, 소리는 わ\n駅へ = えきへ, 소리는 え\n水を = みずを, 소리는 お\n\n→ 글자와 문장 발음을 따로 기억해.',
    captionKo: '초보자가 자주 헷갈리는 게 は, へ, を야. 글자는 하, 헤, 오에 가깝게 배워도 조사로 쓰이면 は는 와, へ는 에, を는 오처럼 들린다. 이건 문장 안에서 반복해야 자연스럽다.',
    captionJp: '助詞の「は」「へ」「を」は、文の中で読み方が変わります。はは「わ」、へは「え」、をは「お」のように読みます。'
  }
];

window.LECTURE_DATA.v3_first_greetings = [
  {
    type: 'hook', label: '첫 말문', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp',
    main: '말문 트는 5개',
    sub: '처음엔 긴 문장 금지.\n바로 쓰는 말 5개만 잡자.\n\nこんにちは  안녕하세요\nありがとう  고마워요\nすみません    저기요 / 죄송해요\nはじめまして 처음이에요, 반가워요\nまたね        또 봐\n\n→ 이 정도면 여행 첫 대화는 시작된다.',
    captionKo: '첫 인사는 예절 수업처럼 딱딱하게 갈 필요 없어. 네가 일본에 도착해서 사람에게 말을 걸 수 있느냐가 핵심이야. 안녕하세요, 고마워요, 저기요, 처음 뵙겠습니다, 또 봐. 이 다섯 개만 입에 붙어도 첫날 말문은 열린다.',
    captionJp: '最初は長い文より、すぐ使える短い挨拶が大事です。こんにちは、ありがとう、すみません、はじめまして、またね。この五つから始めましょう。'
  },
  {
    type: 'practice', label: '만능 호출', duration: 7500, audio: 'すみません',
    image: 'images/lecture-scenes/wlevel1-sumimasen-restaurant-call.webp',
    main: 'すみません',
    sub: '이건 무조건 먼저 외워.\n\n1. 점원 부르기: 저기요\n2. 길에서 부딪힘: 죄송해요\n3. 도움 받음: 고마워요\n\n여행 중에는\n__すみません → 원하는 말__\n이 순서로 시작하면 된다.',
    captionKo: 'すみません은 초보자에게 제일 든든한 말이야. 식당에서 점원을 부를 때도 쓰고, 살짝 부딪혔을 때도 쓰고, 누가 도와줬을 때도 쓴다. 여행 중에 말문이 막히면 일단 すみません으로 시작해.',
    captionJp: 'すみませんは、呼びかけ、謝罪、軽い感謝に使えます。旅行ではとても便利です。'
  },
  {
    type: 'practice', label: '감사와 마무리', duration: 6500, audio: 'ありがとうございます',
    image: 'images/lecture-scenes/wlevel1-arigatou-kindness-scene.webp',
    main: 'ありがとう',
    sub: '도움 받으면 짧게 이렇게.\n\nありがとう       고마워\nありがとうございます 고마워요\n\n처음엔 긴 설명보다\n__웃으면서 ありがとうございます__\n이 제일 안전하다.',
    captionKo: '고맙다는 말은 짧게 해도 충분해. 친구에게는 ありがとう, 가게나 처음 보는 사람에게는 ありがとうございます가 안전하다. 일본어가 서툴러도 이 한마디를 바로 하면 분위기가 좋아진다.',
    captionJp: '友だちにはありがとう、店員さんや初対面の人にはありがとうございますが安心です。短くても気持ちは伝わります。'
  },
  {
    type: 'summary', label: '오늘의 사용법', duration: 6000, audio: null,
    image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp',
    main: '첫 대화 공식',
    sub: '외울 문장은 길지 않아도 돼.\n\nすみません\n→ 写真をお願いします\n→ ありがとうございます\n\n부르기 → 부탁하기 → 감사하기\n\n이 흐름 하나면\n사진 부탁, 길 묻기, 주문까지 확장된다.',
    captionKo: '오늘은 말 5개와 흐름 하나만 가져가면 돼. 사람을 부르고, 원하는 걸 말하고, 고맙다고 마무리한다. 이 구조가 사진 부탁, 길 묻기, 식당 주문까지 계속 이어진다.',
    captionJp: '呼びかけて、お願いして、お礼を言う。この流れを覚えると、写真を頼む時も、道を聞く時も、注文する時も使えます。'
  }
];

window.LECTURE_DATA.v3_survival_objects = [
  {
    type: 'hook', label: '먼저 외울 단어', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: '가리킬 수 있는 것부터',
    sub: '단어는 어려운 명사보다\n여행에서 손으로 가리킬 수 있는 것부터.\n\n水 물\n駅 역\nトイレ 화장실\nホテル 호텔\nカード 카드\n\n→ 모르면 これ + 단어로 버틴다.',
    captionKo: '처음 단어장은 멋진 표현보다 당장 가리킬 수 있는 것부터 시작해야 해. 물, 역, 화장실, 호텔, 카드 같은 말은 여행 첫날 바로 나온다. 단어를 몰라도 これ와 같이 쓰면 말문이 열린다.',
    captionJp: '最初の単語は、旅行で指させる物から覚えましょう。水、駅、トイレ、ホテル、カードはすぐ使えます。'
  },
  {
    type: 'practice', label: '단어 붙이기', duration: 6500, audio: 'これは水です',
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: 'これは ___ です',
    sub: '단어를 문장에 붙여 보자.\n\nこれは水です\n이건 물이에요\n\nここは駅です\n여기는 역이에요\n\nトイレはどこですか\n화장실은 어디예요?',
    captionKo: '단어만 외우면 금방 잊어버려. これは水です, ここは駅です처럼 짧은 문장에 바로 붙이면 기억도 오래 가고 실제로 말할 수 있다.',
    captionJp: '単語だけでなく、短い文に入れて覚えましょう。これは水です。ここは駅です。'
  }
];

window.LECTURE_DATA.v3_pronouns_places = [
  {
    type: 'hook', label: '가리키기', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: 'こ・そ・あ・ど',
    sub: '일본어 대명사는 거리감이야.\n\nこ = 내 쪽\nそ = 상대 쪽\nあ = 둘 다 먼 곳\nど = 모를 때 질문\n\nこれ / それ / あれ / どれ\nここ / そこ / あそこ / どこ',
    captionKo: '대명사는 문법처럼 외우기보다 손가락으로 가리키는 감각으로 잡으면 빨라. 내 가까이는 こ, 상대 가까이는 そ, 둘 다 멀면 あ, 모르면 ど. 이 네 칸만 잡으면 이것, 저것, 여기, 어디가 한 번에 정리된다.',
    captionJp: 'こそあどは距離の感覚です。こは自分の近く、そは相手の近く、あは遠い場所、どは質問に使います。'
  },
  {
    type: 'practice', label: '여행 사용법', duration: 7000, audio: null,
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: 'これください',
    sub: '단어를 몰라도 괜찮아.\n\nこれください\n이거 주세요\n\nここはどこですか\n여기는 어디예요?\n\nあそこです\n저기예요\n\n→ 여행 초반엔 가리키기가 말보다 빠르다.',
    captionKo: '초보자는 물건 이름을 몰라도 괜찮아. 손가락으로 가리키고 これください라고 하면 주문이 된다. 길을 잃었을 때는 ここはどこですか, 안내를 들을 때는 あそこです 같은 말이 바로 도움이 된다.',
    captionJp: '名前が分からない時は、指でさして「これください」と言えば大丈夫です。場所は「ここ」「そこ」「あそこ」で表せます。'
  },
  {
    type: 'summary', label: '정리', duration: 5000, audio: null,
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: '거리 공식',
    sub: '오늘 공식은 하나야.\n\n내 쪽: これ / ここ\n상대 쪽: それ / そこ\n먼 곳: あれ / あそこ\n질문: どれ / どこ\n\n→ 다음부터 질문 만들기가 쉬워진다.',
    captionKo: '오늘은 거리 공식만 가져가면 돼. 이것과 여기는 내 쪽, 그것과 거기는 상대 쪽, 저것과 저기는 멀리, 어느 것과 어디는 질문. 이 틀이 다음 질문 수업의 바탕이 된다.',
    captionJp: 'これ、ここ。それ、そこ。あれ、あそこ。どれ、どこ。この組み合わせを覚えましょう。'
  }
];

window.LECTURE_DATA.v3_numbers_time = [
  {
    type: 'hook', label: '숫자의 목적', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp',
    main: '숫자는 안전장치',
    sub: '숫자를 외우는 이유는 시험만이 아니야.\n\n가격\n시간\n플랫폼 번호\n날짜\n인원수\n\n여행에서는 숫자를 못 들으면\n결제, 예약, 이동이 전부 흔들린다.',
    captionKo: '숫자는 여행의 안전장치야. 얼마인지, 몇 시인지, 몇 번 플랫폼인지, 며칠인지, 몇 명인지 알아들어야 움직일 수 있어. 그래서 예쁜 암기보다 실제로 듣고 고르는 연습이 중요하다.',
    captionJp: '数字は旅行の安全装置です。値段、時間、番線、日付、人数を聞き取れると、旅行がずっと楽になります。'
  },
  {
    type: 'practice', label: '먼저 외울 묶음', duration: 7000, audio: null,
    image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp',
    main: '1·10·100·1000·10000',
    sub: '처음엔 이 뼈대부터.\n\n1 いち\n10 じゅう\n100 ひゃく\n1000 せん\n10000 まん\n\n일본어 가격은 만 단위가 중요해.\nいちまんえん = 1만 엔',
    captionKo: '숫자는 1부터 10까지도 중요하지만, 여행에서는 100, 1000, 10000이 바로 나온다. 일본어도 한국어처럼 만 단위로 끊어서 말하니까 まん을 빨리 익히면 가격 듣기가 쉬워진다.',
    captionJp: '日本語の値段は、百、千、万がとても大事です。いちまんえんは一万円です。'
  },
  {
    type: 'practice', label: '시간과 요일', duration: 7000, audio: null,
    image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp',
    main: '何時ですか',
    sub: '시간 질문은 이렇게 시작해.\n\n今、何時ですか\n지금 몇 시예요?\n\n月曜日 / 火曜日 / 水曜日\n요일은 한국어와 순서가 같아.\n\n→ 숫자 + 요일 = 예약과 이동의 기본.',
    captionKo: '시간은 何時ですか 하나로 시작하면 돼. 요일은 월화수목금토일 순서가 한국어와 같아서 부담이 적다. 여행에서는 예약, 영업일, 열차 시간에 계속 나오니까 숫자와 같이 묶어야 한다.',
    captionJp: '時間は「何時ですか」から始めましょう。曜日の順番は韓国語と同じなので、セットで覚えやすいです。'
  }
];

window.LECTURE_DATA.v3_money_counting = [
  {
    type: 'hook', label: '숫자의 실전', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp',
    main: '돈·수량·날짜',
    sub: '숫자는 1부터 10까지로 끝나지 않아.\n\nいくらですか 얼마예요?\n何個ですか 몇 개예요?\n何人ですか 몇 명이에요?\n何日ですか 며칠이에요?\n\n→ 결제와 예약에서 완성된다.',
    captionKo: '숫자는 돈, 수량, 날짜에서 진짜 실력이 드러나. 얼마예요, 몇 개예요, 몇 명이에요, 며칠이에요를 같이 잡으면 편의점, 식당, 호텔 예약까지 연결된다.',
    captionJp: '数字は値段、数、人数、日にちでよく使います。いくらですか、何個ですか、何人ですか、何日ですか。'
  },
  {
    type: 'practice', label: '만 단위', duration: 6500, audio: '一万円です',
    image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp',
    main: '円과 万',
    sub: '일본 여행 숫자는 엔화로 익혀.\n\n千円  천 엔\n五千円  오천 엔\n一万円  만 엔\n\n가격표를 볼 때는\n숫자보다 단위가 먼저 보여야 한다.',
    captionKo: '일본 여행에서는 円과 万이 중요해. 천 엔, 오천 엔, 만 엔을 바로 읽을 수 있으면 가격표가 덜 무섭다. 숫자를 단독으로 외우지 말고 엔화 단위와 묶어 보자.',
    captionJp: '旅行では円と万が大事です。千円、五千円、一万円を見てすぐ読めるようにしましょう。'
  }
];

window.LECTURE_DATA.v3_directions_body = [
  {
    type: 'hook', label: '몸으로 외우기', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp',
    main: '方向と体',
    sub: '방향과 몸 단어는\n머리로만 외우면 잘 안 붙어.\n\n右 みぎ  오른쪽\n左 ひだり 왼쪽\n前 まえ   앞\n後ろ うしろ 뒤\n\n머리, 배, 다리는\n직접 가리키면서 외워.',
    captionKo: '방향과 신체부위는 몸을 쓰면서 외우는 게 제일 빨라. 오른쪽, 왼쪽, 앞, 뒤를 손으로 가리키고, 머리, 배, 다리를 직접 짚으면서 말해 봐. 여행에서도 병원에서도 바로 써먹는 단어다.',
    captionJp: '方向と体の言葉は、体を動かしながら覚えると早いです。右、左、前、後ろ。頭、お腹、足を指しながら練習しましょう。'
  },
  {
    type: 'practice', label: '길 찾기', duration: 7000, audio: null,
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '右に曲がってください',
    sub: '길 안내에서 많이 듣는 말.\n\nまっすぐ  직진\n右に       오른쪽으로\n左に       왼쪽으로\n近くに     근처에\n\nすみません、駅はどこですか\n저기요, 역은 어디예요?',
    captionKo: '길 찾기는 단어 몇 개만 알아도 큰 도움이 된다. まっすぐ는 직진, 右는 오른쪽, 左는 왼쪽, 近く는 근처. 질문은 すみません、駅はどこですか처럼 장소 이름만 바꿔 끼우면 된다.',
    captionJp: '道を聞く時は、まっすぐ、右、左、近くを先に覚えましょう。駅はどこですか、のように場所を入れ替えて使えます。'
  },
  {
    type: 'practice', label: '아플 때', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp',
    main: 'お腹が痛いです',
    sub: '몸이 안 좋을 때는\n부위 + が痛いです.\n\n頭が痛いです\n머리가 아파요\n\nお腹が痛いです\n배가 아파요\n\n足が痛いです\n다리가 아파요',
    captionKo: '신체부위는 여행 긴급 상황에서 중요해. 부위 이름 뒤에 が痛いです를 붙이면 어디가 아픈지 말할 수 있다. 머리가 아파요, 배가 아파요, 다리가 아파요. 이 정도면 약국이나 병원에서 시작할 수 있다.',
    captionJp: '体の部分に「が痛いです」をつけると、どこが痛いか伝えられます。頭が痛いです。お腹が痛いです。足が痛いです。'
  }
];

window.LECTURE_DATA.v3_particle_basics = [
  {
    type: 'hook', label: '조사 감각', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: '단어 사이의 표지판',
    sub: '조사는 외우는 표가 아니라\n단어 사이에 붙는 표지판이야.\n\n私は 한국인です\n水を 주세요\n駅に 가요\nホテルで 만나요\n\n→ 위치와 역할로 기억하자.',
    captionKo: '조사는 초보자에게 어렵지만, 처음부터 문법표로 외우면 더 힘들어. は는 주제, を는 받는 대상, に는 방향이나 시간, で는 장소에서 하는 행동처럼 실제 문장 안 위치로 익히자.',
    captionJp: '助詞は単語と単語をつなぐ目印です。は、を、に、でを文の中で覚えましょう。'
  },
  {
    type: 'practice', label: '여행 문장', duration: 6500, audio: '駅に行きます',
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: 'に / で / を',
    sub: '여행 문장에 자주 붙어.\n\n駅に行きます\n역에 가요\n\nコンビニで買います\n편의점에서 사요\n\n水をください\n물 주세요\n\n→ 조사 하나가 문장을 움직인다.',
    captionKo: 'に, で, を만 잡아도 여행 문장이 많이 열린다. 역에 가요, 편의점에서 사요, 물 주세요. 조사를 단어와 같이 통째로 익히면 훨씬 덜 헷갈린다.',
    captionJp: '駅に行きます。コンビニで買います。水をください。助詞は文の動きを作ります。'
  }
];

window.LECTURE_DATA.v3_question_engine = [
  {
    type: 'hook', label: '질문의 뼈대', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '끝에 か',
    sub: '일본어 질문은 일단 이렇게 잡아.\n\nこれは何ですか\n이건 뭐예요?\n\n駅はどこですか\n역은 어디예요?\n\nいくらですか\n얼마예요?\n\n→ 끝에 か가 붙으면 질문 느낌이 난다.',
    captionKo: '질문은 어렵게 시작하지 않아도 돼. 이건 뭐예요, 역은 어디예요, 얼마예요처럼 끝에 か를 붙이는 감각부터 잡자. 여행에서는 이 세 문장만으로도 물건, 장소, 가격을 바로 물을 수 있다.',
    captionJp: '質問は「何ですか」「どこですか」「いくらですか」から始めましょう。文の最後に「か」をつけると質問になります。'
  },
  {
    type: 'practice', label: '못 알아들었을 때', duration: 7000, audio: 'もう一度お願いします',
    image: 'images/lecture-scenes/slevel3-help-me-phrase-airport.webp',
    main: 'もう一度お願いします',
    sub: '못 알아들으면 멈추면 돼.\n\nすみません\n저기요 / 미안해요\n\nもう一度お願いします\n한 번 더 부탁해요\n\nゆっくりお願いします\n천천히 부탁해요\n\n→ 이건 초보자의 생명줄이야.',
    captionKo: '초보자에게 제일 중요한 질문은 어려운 문법이 아니라 다시 말해 달라는 말이야. もう一度お願いします, ゆっくりお願いします를 알고 있으면 대화가 끊겨도 다시 이어갈 수 있다.',
    captionJp: '分からない時は、もう一度お願いします、ゆっくりお願いしますと言いましょう。会話をやり直せます。'
  }
];

window.LECTURE_DATA.v3_answer_engine = [
  {
    type: 'hook', label: '짧은 대답', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: 'はい / いいえ / 大丈夫です',
    sub: '대답은 길 필요 없어.\n\nはい  네\nいいえ  아니요\n大丈夫です  괜찮아요\nわかりません  모르겠어요\n\n짧게 말해도 대화는 충분히 이어진다.',
    captionKo: '대답을 길게 만들려고 하면 입이 막혀. 처음에는 네, 아니요, 괜찮아요, 모르겠어요부터 바로 꺼내면 돼. 이 네 개는 여행, 시험, 드라마 듣기 전부에서 계속 나온다.',
    captionJp: '返事は長くなくて大丈夫です。はい、いいえ、大丈夫です、わかりません。この四つを先に覚えましょう。'
  },
  {
    type: 'practice', label: '나를 말하기', duration: 7000, audio: '韓国から来ました',
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: '韓国から来ました',
    sub: '처음 만난 사람이 물으면 이렇게.\n\n韓国から来ました\n한국에서 왔어요\n\n旅行です\n여행이에요\n\n日本語は少しだけです\n일본어는 조금만 해요',
    captionKo: '자기소개도 짧게 가면 돼. 한국에서 왔어요, 여행이에요, 일본어는 조금만 해요. 이 정도면 상대가 네 수준에 맞춰 천천히 말해 줄 가능성이 높아진다.',
    captionJp: '自己紹介は短くて大丈夫です。韓国から来ました。旅行です。日本語は少しだけです。'
  }
];

window.LECTURE_DATA.v3_reaction_shadowing = [
  {
    type: 'hook', label: '회화 유지', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp',
    main: '리액션이 대화를 살린다',
    sub: '초보자는 긴 말보다\n대화를 끊지 않는 한마디가 중요해.\n\nはい 네\n大丈夫です 괜찮아요\nちょっと待ってください 잠깐만요\nもう一度お願いします 한 번 더 부탁해요',
    captionKo: '회화는 내가 긴 문장을 말해야만 이어지는 게 아니야. 네, 괜찮아요, 잠깐만요, 한 번 더 부탁해요 같은 리액션이 있으면 상대 말을 받아낼 수 있다.',
    captionJp: '会話では短い反応が大事です。はい、大丈夫です、ちょっと待ってください、もう一度お願いします。'
  },
  {
    type: 'practice', label: '따라 말하기', duration: 6500, audio: '大丈夫です',
    image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp',
    main: '듣고 바로 따라 하기',
    sub: '리액션은 눈으로 외우지 말고\n입으로 바로 꺼내야 해.\n\n짧게 듣기\n1초 멈춤\n따라 말하기\n다시 듣기\n\n→ 쉐도잉은 짧은 말부터 시작한다.',
    captionKo: '쉐도잉은 긴 드라마 대사로 시작하면 어렵다. 大丈夫です 같은 짧은 말부터 듣고 바로 따라 해 봐. 입에서 자동으로 나와야 여행에서 쓸 수 있다.',
    captionJp: 'シャドーイングは短い言葉から始めましょう。聞いて、少し止めて、すぐまねします。'
  }
];

window.LECTURE_DATA.v3_airport = [
  {
    type: 'hook', label: '공항의 질문', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel3-help-me-phrase-airport.webp',
    main: '공항은 확인 대화',
    sub: '공항에서는 새로운 말을 많이 만들 필요 없어.\n\nパスポート\n여권\n\n荷物\n짐 / 수하물\n\n座席\n좌석\n\n질문을 듣고 짧게 확인하면 된다.',
    captionKo: '공항 대화는 대부분 확인이야. 여권, 수하물, 좌석, 탑승 시간 같은 단어를 듣고 네, 아니요, 부탁해요로 답하면 된다. 긴 설명보다 핵심 단어를 알아듣는 게 먼저다.',
    captionJp: '空港では、パスポート、荷物、座席、時間を聞き取ることが大事です。短く答えれば大丈夫です。'
  },
  {
    type: 'practice', label: '짧게 답하기', duration: 7000, audio: '窓側をお願いします',
    image: 'images/lecture-scenes/slevel3-help-me-phrase-airport.webp',
    main: '窓側をお願いします',
    sub: '원하는 게 있으면 이렇게.\n\n窓側をお願いします\n창가 자리 부탁해요\n\n通路側をお願いします\n통로 자리 부탁해요\n\nこれです\n이거예요\n\n→ 공항은 보여 주고 짧게 말하면 된다.',
    captionKo: '좌석처럼 원하는 게 있으면 をお願いします를 붙이면 돼. 창가 자리 부탁해요, 통로 자리 부탁해요. 여권이나 예약 화면은 これです라고 보여 주면 충분하다.',
    captionJp: '希望を言う時は「をお願いします」が便利です。窓側をお願いします。通路側をお願いします。'
  }
];

window.LECTURE_DATA.v3_transport = [
  {
    type: 'hook', label: '역에서 듣는 말', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: 'どこまでですか',
    sub: '이동에서는 목적지가 중심이야.\n\n駅  역\n電車  전철\n出口  출구\n乗り換え  환승\n\n가고 싶은 곳 + まで\n이 조합을 자주 쓴다.',
    captionKo: '전철과 길 찾기는 목적지가 중심이야. 어디까지 가는지, 어느 출구인지, 환승이 필요한지 듣게 된다. 장소 이름 뒤에 まで를 붙이는 감각을 잡으면 이동 표현이 쉬워진다.',
    captionJp: '移動では目的地が大事です。場所の名前に「まで」をつけると、どこまで行くか言えます。'
  },
  {
    type: 'practice', label: '시간 묻기', duration: 7000, audio: '何分かかりますか',
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '何分かかりますか',
    sub: '여행에서 자주 묻는 말.\n\n駅までお願いします\n역까지 부탁해요\n\n何分かかりますか\n몇 분 걸려요?\n\nここでいいです\n여기면 돼요\n\n→ 택시와 길 안내 둘 다 쓴다.',
    captionKo: '이동에서는 역까지 부탁해요, 몇 분 걸려요, 여기면 돼요를 자주 쓴다. 택시에서도 길 안내에서도 그대로 쓸 수 있어서 먼저 외워 둘 가치가 크다.',
    captionJp: '駅までお願いします。何分かかりますか。ここでいいです。この三つは移動でよく使います。'
  }
];

window.LECTURE_DATA.v3_konbini = [
  {
    type: 'hook', label: '편의점 선택지', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel7-food-ordering-ramen-shop.webp',
    main: '聞かれる 말은 정해져 있어',
    sub: '편의점에서는 질문이 거의 반복돼.\n\n温めますか\n데워 드릴까요?\n\n袋は要りますか\n봉투 필요해요?\n\nレシートは要りますか\n영수증 필요해요?\n\n→ はい / 大丈夫です로 충분하다.',
    captionKo: '편의점은 빠르지만 패턴이 정해져 있어. 데워 드릴까요, 봉투 필요해요, 영수증 필요해요. 질문을 다 못 알아들어도 단어 하나만 잡고 はい나 大丈夫です로 답하면 된다.',
    captionJp: 'コンビニでは、温めますか、袋は要りますか、レシートは要りますかをよく聞かれます。'
  },
  {
    type: 'practice', label: '부탁하기', duration: 7000, audio: '温めてください',
    image: 'images/lecture-scenes/wlevel7-food-ordering-ramen-shop.webp',
    main: '温めてください',
    sub: '도시락은 이렇게.\n\n温めてください\n데워 주세요\n\n袋は大丈夫です\n봉투는 괜찮아요\n\nカードでお願いします\n카드로 부탁해요\n\n→ 결제까지 한 번에 이어진다.',
    captionKo: '도시락 데워 주세요, 봉투는 괜찮아요, 카드로 부탁해요. 이 세 문장만 있어도 편의점 결제 흐름이 훨씬 덜 긴장된다.',
    captionJp: '温めてください。袋は大丈夫です。カードでお願いします。コンビニでそのまま使えます。'
  }
];

window.LECTURE_DATA.v3_restaurant = [
  {
    type: 'hook', label: '식당 순서', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel7-food-ordering-ramen-shop.webp',
    main: '한 명 → 주문 → 계산',
    sub: '식당은 흐름이 중요해.\n\n一人です\n한 명이에요\n\nこれをください\n이거 주세요\n\nお会計お願いします\n계산 부탁해요\n\n→ 메뉴 이름을 몰라도 시작할 수 있다.',
    captionKo: '식당에서는 어려운 문장보다 순서가 중요해. 한 명이라고 말하고, 메뉴를 가리키며 이거 주세요, 마지막에 계산 부탁해요. 이 흐름이면 혼자 밥 먹기는 충분히 시작된다.',
    captionJp: 'レストランでは、一人です、これをください、お会計お願いします。この流れを覚えましょう。'
  },
  {
    type: 'practice', label: '주세요', duration: 7000, audio: 'これをください',
    image: 'images/lecture-scenes/wlevel7-food-ordering-ramen-shop.webp',
    main: 'これをください',
    sub: '메뉴판 앞에서는 이게 제일 강해.\n\nこれをください\n이거 주세요\n\n水をください\n물 주세요\n\nおすすめは何ですか\n추천은 뭐예요?\n\n→ 가리키기와 질문을 섞으면 된다.',
    captionKo: '메뉴 이름을 정확히 읽지 못해도 괜찮아. これをください로 주문하고, 필요하면 水をください, 궁금하면 おすすめは何ですか라고 물으면 된다.',
    captionJp: 'メニューの名前が読めなくても、これをくださいで注文できます。おすすめは何ですかも便利です。'
  }
];

window.LECTURE_DATA.v3_shopping = [
  {
    type: 'hook', label: '쇼핑 세 문장', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: '見てもいいですか',
    sub: '쇼핑은 부담 없이 물어보면 돼.\n\n見てもいいですか\n봐도 돼요?\n\n試着してもいいですか\n입어봐도 돼요?\n\nいくらですか\n얼마예요?\n\n→ 허락과 가격만 잡자.',
    captionKo: '쇼핑에서는 허락과 가격을 먼저 잡으면 돼. 봐도 돼요, 입어봐도 돼요, 얼마예요. 이 세 문장으로 옷가게, 잡화점, 기념품 가게를 거의 다 시작할 수 있다.',
    captionJp: '買い物では、見てもいいですか、試着してもいいですか、いくらですかを先に覚えましょう。'
  },
  {
    type: 'practice', label: '사이즈', duration: 7000, audio: '大きいサイズはありますか',
    image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp',
    main: 'サイズはありますか',
    sub: '사이즈는 이렇게 묻자.\n\n大きいサイズはありますか\n큰 사이즈 있어요?\n\n小さいサイズはありますか\n작은 사이즈 있어요?\n\nこれにします\n이걸로 할게요',
    captionKo: '옷가게에서는 큰 사이즈 있어요, 작은 사이즈 있어요가 바로 필요하다. 마음에 들면 これにします, 이걸로 할게요라고 말하면 결제로 넘어갈 수 있다.',
    captionJp: '服屋では、大きいサイズはありますか、小さいサイズはありますか、これにしますを使います。'
  }
];

window.LECTURE_DATA.v3_hotel = [
  {
    type: 'hook', label: '체크인 흐름', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel5-hotel-checkin-frontdesk.webp',
    main: '予約しています',
    sub: '호텔에서는 예약 확인부터.\n\nチェックインお願いします\n체크인 부탁해요\n\n予約しています\n예약했어요\n\n名前は ___ です\n이름은 ___ 예요\n\n→ 이름과 여권을 보여 주면 된다.',
    captionKo: '호텔 체크인은 예약 확인이 중심이야. 체크인 부탁해요, 예약했어요, 이름은 무엇입니다. 여권과 예약 화면을 보여 주면 긴 설명을 하지 않아도 진행된다.',
    captionJp: 'ホテルでは、チェックインお願いします、予約しています、名前は___ですを使います。'
  },
  {
    type: 'practice', label: '꼭 듣는 말', duration: 7000, audio: '朝食は何時からですか',
    image: 'images/lecture-scenes/slevel5-hotel-checkin-frontdesk.webp',
    main: '朝食は何時からですか',
    sub: '숙소에서 필요한 질문.\n\n朝食は何時からですか\n조식은 몇 시부터예요?\n\nチェックアウトは何時ですか\n체크아웃은 몇 시예요?\n\nWi-Fiはありますか\n와이파이 있어요?',
    captionKo: '체크인 뒤에는 조식, 체크아웃, 와이파이를 많이 물어본다. 朝食, チェックアウト, Wi-Fi 세 단어만 들어도 숙소 안내를 훨씬 잘 따라갈 수 있다.',
    captionJp: 'ホテルでは、朝食、チェックアウト、Wi-Fiをよく聞きます。何時ですかも一緒に使いましょう。'
  }
];

window.LECTURE_DATA.v3_health = [
  {
    type: 'hook', label: '아픈 곳 말하기', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp',
    main: '___ が痛いです',
    sub: '아플 때는 부위부터 말해.\n\n頭が痛いです\n머리가 아파요\n\nお腹が痛いです\n배가 아파요\n\n喉が痛いです\n목이 아파요\n\n→ 완벽한 문장보다 위치가 중요하다.',
    captionKo: '몸이 안 좋을 때는 문장을 예쁘게 만들 필요가 없어. 어디가 아픈지 먼저 말하면 된다. 머리, 배, 목 뒤에 が痛いです를 붙이면 약국이나 병원에서 시작할 수 있다.',
    captionJp: '体調が悪い時は、どこが痛いかを先に伝えましょう。頭が痛いです。お腹が痛いです。喉が痛いです。'
  },
  {
    type: 'practice', label: '약국에서', duration: 7000, audio: '薬はありますか',
    image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp',
    main: '薬はありますか',
    sub: '도움 요청은 짧게.\n\n薬はありますか\n약 있어요?\n\n病院はどこですか\n병원은 어디예요?\n\n助けてください\n도와주세요\n\n→ 긴급 상황 단어는 따로 외워 둔다.',
    captionKo: '약국에서는 약 있어요, 병원은 어디예요가 바로 필요하다. 정말 급하면 助けてください라고 말하면 된다. 이 표현은 여행 안전을 위해 꼭 따로 챙겨야 한다.',
    captionJp: '薬はありますか。病院はどこですか。助けてください。安全のために覚えておきましょう。'
  }
];

window.LECTURE_DATA.v3_lost_and_help = [
  {
    type: 'hook', label: '당황했을 때', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel3-help-me-phrase-airport.webp',
    main: 'なくしました',
    sub: '문제가 생기면 설명을 길게 하지 마.\n\nかばんをなくしました\n가방을 잃어버렸어요\n\n財布をなくしました\n지갑을 잃어버렸어요\n\n助けてください\n도와주세요',
    captionKo: '여행 중 당황하면 문장이 길수록 더 막혀. 잃어버린 물건 이름에 をなくしました를 붙이면 된다. 가방을 잃어버렸어요, 지갑을 잃어버렸어요. 그리고 필요하면 도와주세요라고 말하면 된다.',
    captionJp: '困った時は短く伝えましょう。かばんをなくしました。財布をなくしました。助けてください。'
  },
  {
    type: 'practice', label: '장소 말하기', duration: 6500, audio: '電車の中だと思います',
    image: 'images/lecture-scenes/slevel3-help-me-phrase-airport.webp',
    main: 'どこで？',
    sub: '직원이 물어볼 말.\n\nどこでなくしましたか\n어디에서 잃어버렸어요?\n\n電車の中だと思います\n전철 안인 것 같아요\n\n少し待ってください\n잠깐 기다려 주세요',
    captionKo: '분실물 상황에서는 어디에서 잃어버렸는지 물어볼 가능성이 높아. 정확히 모르겠으면 전철 안인 것 같아요처럼 と思います를 붙이면 부담이 줄어든다.',
    captionJp: 'どこでなくしましたか、と聞かれることがあります。分からない時は、電車の中だと思います、と言えます。'
  }
];

window.LECTURE_DATA.v3_drama_reactions = [
  {
    type: 'hook', label: '짧은 반응', duration: 6500, audio: null,
    image: 'images/lecture-scenes/wlevel1-arigatou-kindness-scene.webp',
    main: 'え、うそ、まじで',
    sub: '드라마는 긴 문장보다\n짧은 반응이 먼저 들려.\n\nえ  어?\nうそ  말도 안 돼\nまじで  진짜로?\nなんで  왜?\n\n→ 자막보다 먼저 귀에 걸리는 말.',
    captionKo: '드라마를 볼 때 처음 귀에 걸리는 건 긴 문장이 아니라 짧은 반응어야. え, うそ, まじで, なんで 같은 말이 감정과 상황을 먼저 알려 준다.',
    captionJp: 'ドラマでは短い反応がよく聞こえます。え、うそ、まじで、なんで。気持ちをつかむ言葉です。'
  },
  {
    type: 'practice', label: '톤 듣기', duration: 7000, audio: 'まじで',
    image: 'images/lecture-scenes/wlevel1-arigatou-kindness-scene.webp',
    main: '같은 말, 다른 감정',
    sub: 'まじで 하나도 톤이 달라.\n\n놀람: まじで？\n확인: まじで？\n강조: まじでやばい\n\n→ 단어 뜻보다 감정 먼저 듣자.',
    captionKo: '드라마 듣기는 단어 뜻만 맞히는 게 아니야. 같은 まじで도 놀람, 확인, 강조로 톤이 달라진다. 짧은 반응어부터 감정을 같이 들어 보자.',
    captionJp: '同じ言葉でも感情で聞こえ方が変わります。まじで？のトーンを聞いてみましょう。'
  }
];

window.LECTURE_DATA.v3_drama_daily = [
  {
    type: 'hook', label: '짧게 끊어 듣기', duration: 6500, audio: null,
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: '드라마 대사는 덩어리',
    sub: '드라마를 전부 번역하려고 하지 마.\n\n今、何してる？\n지금 뭐 해?\n\n大丈夫？\n괜찮아?\n\nちょっと待って\n잠깐 기다려\n\n→ 짧은 덩어리로 먼저 듣는다.',
    captionKo: '드라마를 쉽게 보려면 문장 전체를 한 번에 해석하려고 하지 마. 지금 뭐 해, 괜찮아, 잠깐 기다려 같은 짧은 덩어리가 먼저 들리면 장면을 따라가기 쉬워진다.',
    captionJp: 'ドラマは短いかたまりで聞きましょう。今、何してる？大丈夫？ちょっと待って。'
  },
  {
    type: 'practice', label: '친구 말투', duration: 7000, audio: '大丈夫？',
    image: 'images/lecture-scenes/slevel2-cafe-self-intro.webp',
    main: 'です/ます가 빠질 수 있어',
    sub: '드라마 친구 말투는 짧아.\n\n大丈夫？\n괜찮아?\n\n何してる？\n뭐 해?\n\n行こう\n가자\n\n→ 정중체와 반말을 구분해서 듣자.',
    captionKo: '드라마에는 친구 말투가 많이 나와서 です, ます가 빠지는 경우가 많아. 여행에서는 정중하게 말하되, 드라마를 들을 때는 짧아진 말투를 알아보는 훈련이 필요하다.',
    captionJp: '友だち同士の会話では、です、ますがないことが多いです。聞き分ける練習をしましょう。'
  }
];
