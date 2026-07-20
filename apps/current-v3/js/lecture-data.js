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
    sub: '오늘은 이것만 되면 성공.\n\nあいうえお를 보고 읽기\n행과 단의 의미 알기\n히라가나와 가타가나가 왜 둘인지 알기\n모르는 글자는 표에서 찾기\n\n→ 암기는 다음 카드에서 완성한다.',
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
    type: 'hook', label: '공항은 확인 대화', duration: 6500, audio: null,
    image: 'images/v3/backgrounds/portrait/airport/airport-checkin-01.webp',
    main: '공항은 확인 대화',
    sub: '공항에서는 새로운 말을 많이 만들 필요 없어.\n\nパスポート 여권\n荷物 짐 / 수하물\n座席 좌석\n\n질문을 듣고 짧게 확인하면 된다.',
    captionKo: '공항 대화는 대부분 확인이야. 여권, 수하물, 좌석, 탑승 시간 같은 단어를 듣고 네, 아니요, 부탁해요로 답하면 된다. 긴 설명보다 핵심 단어를 알아듣는 게 먼저다.',
    captionJp: '空港では、パスポート、荷物、座席、時間を聞き取ることが大事です。短く答えれば大丈夫です。'
  },
  {
    type: 'point', label: '핵심 단어', duration: 7000, audio: '搭乗券',
    image: 'images/v3/backgrounds/portrait/airport/airport-checkin-01.webp',
    main: '먼저 외울 단어',
    sub: '搭乗券 탑승권\n荷物を預ける 짐을 맡기다\n搭乗口 탑승구\n出発 / 到着 출발 / 도착\n\n→ 단어만 알아들으면 절반은 끝.',
    captionKo: '공항에서 가장 자주 듣는 단어부터 잡자. 탑승권, 짐을 맡기다, 탑승구, 출발과 도착. 이 단어들이 귀에 들어오면 안내 방송과 직원 질문의 절반은 이미 이해한 셈이다.',
    captionJp: '空港でよく聞く言葉から覚えましょう。搭乗券、荷物を預ける、搭乗口、出発と到着。これが分かれば半分は理解できます。'
  },
  {
    type: 'practice', label: '직원 질문 알아듣기', duration: 7500, audio: 'お荷物はおいくつですか',
    image: 'images/v3/backgrounds/portrait/airport/airport-checkin-01.webp',
    main: '직원이 자주 묻는 말',
    sub: 'お荷物はおいくつですか 짐은 몇 개예요?\n→ 一つです 하나예요\n\n窓側と通路側、どちらにしますか 창가? 통로?\n→ 窓側をお願いします 창가로 부탁해요',
    captionKo: '직원의 질문은 패턴이 정해져 있어. 짐이 몇 개인지, 창가와 통로 중 어디인지 묻는다. 미리 답을 알아두면 당황하지 않고 한 단어로 바로 답할 수 있다.',
    captionJp: '係員の質問は決まっています。荷物の数、窓側か通路側か。答えを用意しておけば、一言で返せます。'
  },
  {
    type: 'practice', label: '원하는 것 부탁하기', duration: 7000, audio: '窓側をお願いします',
    image: 'images/v3/backgrounds/portrait/airport/airport-checkin-01.webp',
    main: '○○をお願いします',
    sub: '窓側をお願いします 창가 자리 부탁해요\n通路側をお願いします 통로 자리 부탁해요\nこれです 이거예요\n\n→ 보여 주고 짧게 말하면 된다.',
    captionKo: '원하는 게 있으면 をお願いします만 붙이면 돼. 창가 자리, 통로 자리 모두 같은 공식이다. 여권이나 예약 화면은 これです라고 보여 주면 충분하다.',
    captionJp: '希望は「をお願いします」で伝わります。窓側、通路側も同じ形です。画面はこれですと見せれば十分です。'
  },
  {
    type: 'tip', label: '짧게가 안전', duration: 6000, audio: null,
    image: 'images/v3/backgrounds/portrait/airport/airport-checkin-01.webp',
    main: '길게 말하지 않기',
    sub: '질문이 어려우면\nこれです 이거예요 (보여 주기)\nはい / 大丈夫です 네 / 괜찮아요\n\n→ 정확한 단답이 가장 안전하다.',
    captionKo: '공항에서는 매끄러운 문장보다 정확한 단답이 안전해. 못 알아들으면 これです로 보여 주고, 확인이면 네, 거절이면 괜찮아요. 짧게 끊을수록 다음 질문도 쉬워진다.',
    captionJp: '空港では、長い文より短い返事が安全です。分からなければこれですと見せ、はい、大丈夫ですで十分です。'
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
    type: 'culture', label: '표 사기', duration: 7000, audio: '切符はどこですか',
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '표·IC카드부터',
    sub: '역에 들어가기 전 한 가지만 정하자.\n\n切符（きっぷ）はどこですか  표는 어디서 사요?\nICカード、使えますか  IC카드 되나요?\nチャージ、お願いします  충전해 주세요\n\n→ 표나 카드만 해결하면 절반은 끝.',
    captionKo: '전철은 표를 사거나 IC카드를 충전하는 것부터 시작이야. 표 어디서 사요, IC카드 되나요, 충전해 주세요만 알면 개찰구 앞에서 막히지 않는다.',
    captionJp: '電車はまず切符かICカードです。「切符はどこですか」「ICカード、使えますか」「チャージ、お願いします」。'
  },
  {
    type: 'practice', label: '시간 묻기', duration: 7000, audio: '何分かかりますか',
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '何分かかりますか',
    sub: '여행에서 자주 묻는 말.\n\n駅までお願いします\n역까지 부탁해요\n\n何分かかりますか\n몇 분 걸려요?\n\nここでいいです\n여기면 돼요\n\n→ 택시와 길 안내 둘 다 쓴다.',
    captionKo: '이동에서는 역까지 부탁해요, 몇 분 걸려요, 여기면 돼요를 자주 쓴다. 택시에서도 길 안내에서도 그대로 쓸 수 있어서 먼저 외워 둘 가치가 크다.',
    captionJp: '駅までお願いします。何分かかりますか。ここでいいです。この三つは移動でよく使います。'
  },
  {
    type: 'practice', label: '환승·출구', duration: 7000, audio: '乗り換えはどこですか',
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '환승과 출구 묻기',
    sub: '큰 역은 출구를 잘못 나오면 멀어진다.\n\n乗（の）り換（か）えはどこですか  환승은 어디서 해요?\n何番線ですか  몇 번 승강장이에요?\n○○出口はどこですか  ○○ 출구는 어디예요?\n\n→ 번호와 출구 이름만 들으면 된다.',
    captionKo: '큰 역에서는 환승 위치와 승강장 번호, 출구 이름만 잡으면 헤매지 않는다. 환승은 어디서 해요, 몇 번 승강장이에요, ○○ 출구는 어디예요를 짧게 물어보자.',
    captionJp: '大きな駅では「乗り換えはどこですか」「何番線ですか」「○○出口はどこですか」を聞けば迷いません。'
  },
  {
    type: 'summary', label: '이동 흐름', duration: 6000, audio: null,
    image: 'images/lecture-scenes/wlevel4b-station-location-help.webp',
    main: '표 → 타기 → 출구',
    sub: '전철 이동은 세 박자.\n\n1. 표·IC카드 해결\n2. ○○まで, 何分かかりますか\n3. 환승·출구 확인\n\n→ 모르면 駅員（えきいん）에게 물어보면 된다.',
    captionKo: '전철은 표를 해결하고, 목적지까지 얼마나 걸리는지 확인하며 타고, 환승과 출구를 묻는 흐름이다. 헷갈리면 역무원에게 물어보면 친절하게 알려 주니 너무 긴장하지 않아도 된다.',
    captionJp: '電車は、切符、目的地の確認、乗り換えと出口の流れです。困ったら駅員に聞けば大丈夫です。'
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

(() => {
  const imgDesk = 'images/lecture-scenes/kana-hiragana-study-desk.webp';
  const imgCafe = 'images/lecture-scenes/slevel2-cafe-self-intro.webp';
  const imgStation = 'images/lecture-scenes/wlevel4b-station-location-help.webp';
  const imgNumbers = 'images/lecture-scenes/wlevel2-elevator-number-culture.webp';
  const imgTrain = 'images/lecture-scenes/slevel4-train-station-transfer.webp';
  const imgCounter = 'images/lecture-scenes/wlevel7b-cafe-order-counter.webp';
  const imgIzakaya = 'images/lecture-scenes/wlevel7-izakaya-ordering-table.webp';
  const imgConvenience = 'images/lecture-scenes/slevel3-convenience-store-checkout.webp';
  const imgHotelFront = 'images/lecture-scenes/wlevel7b-hotel-front-request.webp';
  const imgRyokan = 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.webp';
  const imgClinic = 'images/lecture-scenes/wlevel8-clinic-health-help.webp';
  const imgSightseeing = 'images/lecture-scenes/slevel7-sightseeing-cultural-directions.webp';
  const imgMenuCheck = 'images/lecture-scenes/wlevel7b-menu-availability-check.webp';
  const imgCalendar = 'images/lecture-scenes/wlevel3-calendar-time-study.webp';
  const imgArigatou = 'images/lecture-scenes/wlevel1-arigatou-kindness-scene.webp';
  const imgKoban = 'images/lecture-scenes/slevel6-koban-lost-item-help.webp';

  const tip = (main, sub, captionKo, captionJp, image = imgDesk) => [{
    type: 'summary', label: '학습 팁', duration: 6500, audio: null,
    image, main, sub, captionKo, captionJp
  }];

  Object.assign(window.LECTURE_DATA, {
    /* v3_kana_map kept from literal definition above (3 slides) */
    v3_kana_map_tip: tip(
      '오늘은 20%만 성공해도 된다',
      '첫날 목표는 완벽한 암기가 아니야.\n\nあいうえお를 읽기\n행과 단의 뜻 알기\n모르는 글자를 표에서 찾기\n히라가나/가타가나 역할 구분\n\n이게 되면 다음 학습이 훨씬 빨라진다.',
      '문자 입문에서 가장 중요한 건 완벽하게 쓰는 게 아니야. 표의 길을 알고, 모르는 글자를 찾아낼 수 있으면 충분하다. 나머지는 카드, 퀴즈, 단어 반복에서 붙는다.',
      '今日は完璧に覚えなくても大丈夫です。表で文字を探せることが大切です。'
    ),
    /* v3_hiragana_intro kept from literal definition above */
    v3_hiragana_tip: tip(
      '매일 7분이 한 번 2시간보다 낫다',
      '히라가나는 벼락치기보다 짧은 반복이 강해.\n\n아침: あいうえお\n점심: 헷갈림 4개\n저녁: 단어 5개\n\n작게 자주 보면 글자가 얼굴처럼 익숙해진다.',
      '히라가나는 한 번에 오래 보는 것보다 매일 짧게 보는 게 낫다. 글자를 사람 얼굴처럼 자주 만나야 눈이 먼저 알아본다.',
      'ひらがなは短く何度も見る方が覚えやすいです。毎日少しずつ会いましょう。'
    ),
    v3_katakana_tip: tip(
      '가타가나는 간판으로 외운다',
      '가타가나는 글자표보다 단어가 빠르다.\n\nホテル\nカード\nコーヒー\nタクシー\nメニュー\n\n이미 아는 소리에 낯선 글자를 붙이면 된다.',
      '가타가나는 외래어가 많아서 단어째로 외우면 빠르다. 호텔, 카드, 커피, 택시처럼 이미 아는 소리에 글자를 붙이면 부담이 줄어든다.',
      'カタカナは知っている外来語で覚えると早いです。ホテル、カード、コーヒー、タクシー。'
    ),
    v3_kana_sound_tip: tip(
      '소리 규칙은 단어 안에서만 붙는다',
      'が・ぱ・きゃ・ちょっと・コーヒー\n\n규칙 이름을 외우는 것보다\n단어로 바로 듣는 게 빠르다.\n\n점, 동그라미, 작은 글자는\n__소리 변신 표시__라고 생각하자.',
      '탁음, 반탁음, 요음, 촉음, 장음은 이름을 먼저 외우면 딱딱해진다. 단어 안에서 소리가 어떻게 바뀌는지 반복해서 듣는 편이 훨씬 실용적이다.',
      '音のルールは単語の中で覚えましょう。名前より、実際の音が大切です。'
    ),
    /* v3_survival_objects kept from literal definition above */
    v3_survival_objects_tip: tip(
      '단어는 문장에 붙여야 기억난다',
      '水, 駅, トイレ처럼 단어만 외우지 말고\n바로 붙여 봐.\n\n水をください\n駅はどこですか\nトイレはありますか\n\n단어 하나가 문장 세 개가 된다.',
      '단어는 따로 외우면 금방 흩어진다. 물, 역, 화장실 같은 단어는 주세요, 어디예요, 있어요와 바로 붙여서 외우면 실전 문장이 된다.',
      '単語は文に入れて覚えましょう。水をください。駅はどこですか。トイレはありますか。',
      imgCafe
    ),
    /* v3_particle_basics kept from literal definition above */
    v3_particle_basics_tip: tip(
      '조사는 틀려도 대화가 멈추지 않는다',
      '처음부터 조사를 완벽하게 하려고 하지 마.\n\n목표는 정확도 100%가 아니라\n상대가 알아듣는 짧은 문장.\n\n水ください도 통하지만\n水をください로 조금씩 다듬으면 된다.',
      '조사는 중요하지만 초반에 완벽주의로 들어가면 말이 멈춘다. 먼저 짧게 말하고, 카드와 롤플레이에서 を, に, で를 조금씩 붙여 가면 된다.',
      '助詞は大切ですが、最初から完璧でなくても大丈夫です。短く言って、少しずつ直しましょう。',
      imgStation
    ),
    v3_tense_matrix: [
      {
        type: 'hook', label: '4칸 변환', duration: 7000, audio: null, image: imgCafe,
        main: '현재·부정·과거·과거부정',
        sub: '일본어 초급 문장은\n이 네 칸을 먼저 잡으면 빨라.\n\n食べます 먹어요\n食べません 안 먹어요\n食べました 먹었어요\n食べませんでした 안 먹었어요\n\n→ 어미가 바뀌면 시간이 바뀐다.',
        captionKo: '문장을 많이 외우기 전에 현재, 현재부정, 과거, 과거부정 네 칸을 익히면 표현이 갑자기 늘어난다. 먹어요, 안 먹어요, 먹었어요, 안 먹었어요처럼 어미만 바뀌는 느낌부터 잡자.',
        captionJp: '現在、否定、過去、過去否定の四つを先に覚えると、表現が一気に増えます。語尾の変化を見ましょう。'
      },
      {
        type: 'practice', label: '명사와 な형용사', duration: 7000, audio: '学生です', image: imgCafe,
        main: 'です 계열',
        sub: '명사와 な형용사는 です가 중심이야.\n\n学生です 학생이에요\n学生ではありません 학생이 아니에요\n学生でした 학생이었어요\n学生ではありませんでした 학생이 아니었어요\n\n→ でした가 과거 표시.',
        captionKo: '명사와 な형용사는 です 계열로 먼저 보면 된다. です, ではありません, でした, ではありませんでした. 길어 보여도 네 칸 표로 외우면 패턴이 보인다.',
        captionJp: '名詞とな形容詞は、です、ではありません、でした、ではありませんでしたで覚えましょう。'
      },
      {
        type: 'practice', label: 'い형용사', duration: 7000, audio: 'おいしかったです', image: imgCafe,
        main: 'い가 변한다',
        sub: 'い형용사는 끝의 い가 움직여.\n\nおいしいです 맛있어요\nおいしくないです 맛있지 않아요\nおいしかったです 맛있었어요\nおいしくなかったです 맛있지 않았어요\n\n→ くない / かった를 소리로 외워.',
        captionKo: 'い형용사는 です보다 앞의 형용사 끝이 변한다. おいしい, おいしくない, おいしかった, おいしくなかった를 통째로 말해 보면 감각이 빨리 붙는다.',
        captionJp: 'い形容詞は、いの前が変化します。おいしい、おいしくない、おいしかった、おいしくなかったを声に出しましょう。'
      },
      {
        type: 'practice', label: '동사 ます형', duration: 7000, audio: '食べませんでした', image: imgCafe,
        main: 'ます형 4칸',
        sub: '여행 회화는 ます형부터 가자.\n\n食べます 먹어요\n食べません 안 먹어요\n食べました 먹었어요\n食べませんでした 안 먹었어요\n\n行きます / 行きません / 行きました / 行きませんでした',
        captionKo: '동사는 초반에 사전형보다 ます형 네 칸이 여행에서 바로 쓸 수 있다. 食べます, 食べません, 食べました, 食べませんでした. 같은 방식으로 行きます도 바뀐다.',
        captionJp: '動詞はまずます形の四つです。食べます、食べません、食べました、食べませんでした。'
      },
    ],
    v3_tense_matrix_tip: tip(
      '문장을 늘리는 가장 빠른 표',
      '새 단어 하나를 배우면 네 문장으로 늘려.\n\n行きます\n行きません\n行きました\n行きませんでした\n\n단어 1개를 문장 4개로 바꾸는 연습이\nN5와 여행 회화 둘 다에 좋다.',
      '현재, 부정, 과거, 과거부정은 N5 문법이면서 여행 회화의 뼈대다. 단어를 하나 배울 때 네 칸으로 바로 바꿔 말하면 문장 생성 속도가 훨씬 빨라진다.',
      '新しい言葉を覚えたら、現在、否定、過去、過去否定の四つに変えて練習しましょう。',
      imgCafe
    ),
    v3_pronouns_places_tip: tip('こそあど는 거리감이다', '내 쪽은 こ, 상대 쪽은 そ, 먼 곳은 あ, 질문은 ど.\n\nこれ / それ / あれ / どれ\nここ / そこ / あそこ / どこ\n\n손가락 위치로 외우면 오래 간다.', 'こそあど는 표가 아니라 거리감이다. 손가락으로 내 앞, 상대 앞, 멀리, 질문 위치를 가리키면서 외우면 실제 대화에서 빨리 나온다.', 'こそあどは距離の感覚です。指で示しながら覚えましょう。', imgStation),
    v3_numbers_time_tip: tip('숫자는 귀로 먼저 잡기', '가격과 시간은 눈보다 귀가 먼저 필요해.\n\n千円\n三時\n二人\n五分\n\n짧은 숫자 덩어리를 반복해서 듣자.', '여행에서는 숫자를 보는 일보다 듣는 일이 더 당황스럽다. 가격, 시간, 인원, 소요시간을 짧은 덩어리로 자주 들어야 한다.', '数字は聞き取りが大切です。値段、時間、人数、分を短いかたまりで聞きましょう。', imgNumbers),
    v3_money_counting_tip: tip('가격은 엔화 단위로 외우기', '숫자만 외우지 말고 円과 같이 붙여.\n\n百円\n千円\n五千円\n一万円\n\n가격표를 보면 단위가 먼저 보여야 한다.', '돈 표현은 숫자와 円을 분리하지 말고 같이 외우는 게 좋다. 특히 千円, 五千円, 一万円은 여행에서 자주 보인다.', '値段は円と一緒に覚えましょう。千円、五千円、一万円。', imgNumbers),
    v3_directions_body_tip: tip('방향과 몸은 손으로 외우기', '右, 左, 前, 後ろ는 손으로 가리키고\n頭, お腹, 足는 몸을 짚어.\n\n몸을 쓰면 단어가 상황과 같이 저장된다.', '방향과 신체 부위는 책상에서 눈으로만 보면 잘 안 붙는다. 손과 몸을 같이 쓰면 길 찾기와 병원 표현까지 자연스럽게 연결된다.', '方向と体の言葉は、体を使って覚えると早いです。', imgStation),
    v3_question_engine_tip: tip('질문은 끝을 올리고 か를 붙이기', '초보 질문 공식은 짧다.\n\n何ですか\nどこですか\nいくらですか\nありますか\nできますか\n\n끝을 살짝 올리면 질문처럼 들린다.', '일본어 질문은 복잡한 문법보다 끝의 か와 억양이 먼저다. 뭐예요, 어디예요, 얼마예요, 있어요, 할 수 있어요를 통째로 외우자.', '質問は、何ですか、どこですか、いくらですか、ありますか、できますかから始めましょう。', imgStation),
    v3_answer_engine_tip: tip('대답은 짧아도 괜찮다', '질문을 받으면 길게 설명하지 않아도 돼.\n\nはい\n大丈夫です\n韓国から来ました\n旅行です\nわかりません\n\n짧은 답이 대화를 살린다.', '초보자는 긴 대답보다 짧고 정확한 대답이 훨씬 안전하다. 네, 괜찮아요, 한국에서 왔어요, 여행이에요, 모르겠어요만 있어도 많은 상황을 넘길 수 있다.', '短い返事で大丈夫です。はい、大丈夫です、韓国から来ました、旅行です、わかりません。', imgCafe),
    v3_first_greetings_tip: tip('인사는 세트로 외우기', '인사는 단어 하나가 아니라 흐름이야.\n\nすみません\n→ 부탁하기\n→ ありがとうございます\n\n부르기, 말하기, 감사하기를 한 덩어리로 외워.', '첫 인사는 예절 표현을 많이 아는 것보다 흐름이 중요하다. 사람을 부르고, 원하는 말을 하고, 고맙다고 마무리하는 세트를 몸에 붙이자.', '挨拶は流れで覚えましょう。すみません、お願い、ありがとうございます。', imgCafe),
    v3_reaction_shadowing_tip: tip('리액션은 자동으로 나와야 한다', '네, 괜찮아요, 잠깐만요, 다시 말해 주세요.\n\n이런 말은 생각하고 만드는 문장이 아니라\n바로 튀어나오는 안전장치야.\n\n짧게 듣고 바로 따라 말하자.', '리액션은 회화를 이어 주는 버튼이다. 의미를 분석하기보다 듣자마자 입으로 따라 하는 방식이 좋다.', 'リアクションは会話を続けるボタンです。聞いたらすぐまねしましょう。', imgCafe),

    /* ── Stage 4 ── */
    v3_immigration: [
      { type: 'hook', label: '입국 심사 공식', duration: 6500, audio: null, image: imgTrain,
        main: '목적·기간·숙소 3가지',
        sub: '입국 심사는 거의 같은 세 가지를 묻는다.\n\n目的は？ → 観光です\n何日ですか？ → 三日間です\nどこに泊まりますか？ → ホテルです\n\n__긴 문장보다 단어 하나가 안전__하다.',
        captionKo: '입국 심사관은 영어보다 단순한 일본어로 물을 때가 많아. 답도 길게 만들 필요가 없다. 관광이에요, 3일이에요, 호텔이에요 세 단어만 정확히 말하면 거의 끝난다.',
        captionJp: '入国審査では目的、日数、宿泊先の三つを聞かれます。短く答えて大丈夫です。観光です、三日間です、ホテルです。'
      },
      { type: 'culture', label: '질문 단어 듣기', duration: 7000, audio: '目的は何ですか', image: imgTrain,
        main: '질문 단어부터 잡기',
        sub: '문장 전체를 알아들으려 하지 말고\n__핵심 단어 하나__만 잡아라.\n\n目的（もくてき） 목적\n何日（なんにち） 며칠\nどこ 어디\n仕事（しごと） 일·직업\n\n→ 그 단어에 답을 맞추면 된다.',
        captionKo: '심사관의 말이 빨라도 당황하지 마. 文장 전체가 아니라 목적, 며칠, 어디, 일 같은 핵심 단어 하나만 들으면 된다. 그 단어에 맞춰 짧게 답하면 통과다.',
        captionJp: '全部聞き取らなくても大丈夫です。目的、何日、どこ、仕事など、キーワードを一つ聞けば答えられます。'
      },
      { type: 'practice', label: '듣기 포인트', duration: 7000, audio: '観光です', image: imgTrain,
        main: '필요한 답변 5문장',
        sub: '観光です  관광이에요\n三日間です  3일이에요\nホテル○○です  ○○ 호텔이에요\n初めてです  처음이에요\n友達と来ました  친구와 왔어요\n\n__질문 단어__를 먼저 잡고\n같은 단어로 짧게 답한다.',
        captionKo: '심사관이 물은 단어를 그대로 답에 쓰는 게 가장 빠르다. 観光? 観光です. 何日? 三日間です. 길게 만들수록 실수가 늘어난다.',
        captionJp: '質問の単語をそのまま答えに使うと安全です。観光ですか、はい観光です。'
      },
      { type: 'practice', label: '추가 질문 대응', duration: 7000, audio: '友達と来ました', image: imgTrain,
        main: '가끔 더 묻는 말',
        sub: '기본 3개 외에 가끔 더 물어본다.\n\n仕事は？ → 会社員です\n一人ですか？ → 友達と来ました\nいつ帰りますか？ → 金曜日です\n\n→ 모르면 すみません、もう一度お願いします.',
        captionKo: '목적, 기간, 숙소 외에 직업이나 동행, 돌아가는 날을 묻기도 해. 회사원이에요, 친구와 왔어요, 금요일이에요처럼 짧게 답하면 된다. 못 들었으면 다시 한 번 부탁한다고 말하면 돼.',
        captionJp: '仕事、同行者、帰る日を聞かれることもあります。会社員です、友達と来ました、金曜日です。聞き取れなければ、もう一度お願いしますと言いましょう。'
      },
      { type: 'summary', label: '통과 흐름', duration: 6000, audio: null, image: imgTrain,
        main: '인사 → 단답 → 감사',
        sub: '심사대 흐름은 항상 같다.\n\n1. こんにちは (여권 제출)\n2. 질문 → 단어로 짧게 답\n3. ありがとうございます\n\n→ 흐름만 알면 긴장이 줄어든다.',
        captionKo: '입국 심사는 인사하고, 묻는 말에 단어로 짧게 답하고, 마지막에 감사 인사로 끝나는 흐름이야. 이 순서를 미리 머릿속에 그려 두면 실제 심사대 앞에서 훨씬 덜 떨린다.',
        captionJp: '入国審査は、挨拶、短い返事、お礼の流れです。順番が分かっていれば緊張しません。'
      }
    ],
    v3_immigration_tip: tip('단답이 가장 안전하다', '입국 심사에서 길게 설명하면\n다음 질문이 더 어려워진다.\n\n観光です\n三日間です\nホテルです\n\n세 단어로 끝내자.', '입국 심사는 빠르게 통과하는 것이 목적이다. 매끄러운 설명보다 정확한 단답이 훨씬 안전하다.', '入国審査は短く答える方が早く通れます。', imgTrain),

    v3_airplane_request: [
      { type: 'hook', label: '기내 부탁 공식', duration: 6500, audio: null, image: imgCounter,
        main: '○○ + ください/お願いします',
        sub: '비행기 안에서는 부르고 짧게 부탁한다.\n\nすみません、水をください\n毛布、お願いします\n入国カードをください\n\n__단어 + ください__면 거의 다 통한다.',
        captionKo: '기내 승무원에게는 길게 말하지 않아도 된다. 부르는 すみません 뒤에 원하는 단어와 ください를 붙이면 끝이다. 물, 담요, 입국 카드 모두 같은 공식.',
        captionJp: '機内では、すみません、〇〇をください、で十分です。水、毛布、入国カードも同じ形です。'
      },
      { type: 'culture', label: '먼저 부르기', duration: 7000, audio: 'すみません', image: imgCounter,
        main: '부르는 한마디',
        sub: '버튼을 눌렀거나 승무원이 지나갈 때\n먼저 __부르는 말__부터.\n\nすみません 저기요\nお願いします 부탁합니다\n\n→ 부르고 나서 천천히 단어를 말하면 된다.',
        captionKo: '갑자기 단어부터 말하면 승무원이 못 알아들을 수 있어. 먼저 すみません으로 부르고, 눈이 마주친 다음 천천히 원하는 단어를 말하면 훨씬 잘 통한다.',
        captionJp: 'いきなり言うより、まずすみませんと呼びましょう。目が合ってからゆっくり伝えると通じやすいです。'
      },
      { type: 'practice', label: '자주 쓰는 부탁', duration: 7000, audio: '水をください', image: imgCounter,
        main: '기내 단어 5개',
        sub: '水（みず）をください  물 주세요\n毛布（もうふ）をください  담요 주세요\nお茶（ちゃ）をください  차 주세요\n入国（にゅうこく）カードをください  입국 카드 주세요\nヘッドホン、お願いします  헤드폰 부탁해요',
        captionKo: '기내에서 자주 쓰는 단어만 외워 두면 충분하다. 물, 담요, 차, 입국 카드, 헤드폰에 ください나 お願いします만 붙이면 그대로 부탁이 된다.',
        captionJp: 'よく使う言葉は、水、毛布、お茶、入国カード、ヘッドホンです。くださいかお願いしますを付けましょう。'
      },
      { type: 'practice', label: '추가 표현', duration: 7000, audio: 'もう一つお願いします', image: imgCounter,
        main: '바꿔치기·추가하기',
        sub: 'もう一つ、お願いします  하나 더 부탁해요\n少しゆっくり、お願いします  조금 천천히\nトイレに行きたいです  화장실 가고 싶어요\nすみません、ちょっと寒いです  좀 추워요\n\n__상태 + ます__만 잘 써도 된다.',
        captionKo: '추가 요청도 같은 공식이다. 하나 더, 천천히, 화장실 같은 단어에 お願いします나 ます를 붙이면 자연스럽다. 추워요, 더워요처럼 상태만 말해도 승무원이 알아서 도와준다.',
        captionJp: '追加のお願いも同じ形です。もう一つ、ゆっくり、トイレ、寒いに簡単な語尾を付ければ伝わります。'
      },
      { type: 'summary', label: '마무리 한마디', duration: 6000, audio: 'ありがとうございます', image: imgCounter,
        main: '받으면 감사 인사',
        sub: '부탁이 통하면 마무리도 짧게.\n\nありがとうございます 감사합니다\nすみません 죄송/실례합니다\n\n→ 부르기 → 부탁 → 감사,\n이 세 박자가 기내 회화의 전부다.',
        captionKo: '받은 다음에는 꼭 감사 인사로 마무리하자. 부르기, 부탁하기, 감사하기 이 세 박자만 익히면 기내에서 필요한 회화는 거의 다 해결된다.',
        captionJp: '受け取ったらお礼を言いましょう。呼ぶ、頼む、お礼を言う、この三つで機内会話は十分です。'
      }
    ],
    v3_airplane_request_tip: tip('상태만 말해도 된다', '寒いです、暑いです、痛いです\n\n상태 한 단어가\n승무원에게 가장 빠른 신호다.\n\n길게 설명하지 않아도\n도움이 온다.', '비행기 안에서 영어보다 빠른 건 상태 한 단어다. 추워요, 더워요, 아파요만 말해도 승무원이 다음 단계를 알아서 진행한다.', '機内では、状態の一言が一番早いです。寒いです、暑いです、痛いです。', imgCounter),

    /* ── Stage 5 ── */
    v3_bus_ride: [
      { type: 'hook', label: '버스 핵심', duration: 6500, audio: null, image: imgTrain,
        main: '이 버스 + 가나요?',
        sub: '버스는 잘못 타면 시간이 크다.\n타기 전에 한 문장만 던지자.\n\nこのバス、○○に行きますか\n이 버스, ○○에 가요?\n\nはい / いいえ만 들으면 된다.',
        captionKo: '버스는 노선이 비슷해 보여서 잘못 타기 쉽다. 타기 전에 이 버스가 목적지에 가는지 한 번만 확인하면 안전하다. 답은 보통 はい나 いいえ로 짧게 돌아온다.',
        captionJp: 'バスに乗る前に「このバス、〇〇に行きますか」と一言確認しましょう。返事は短いです。'
      },
      { type: 'culture', label: '요금 방식', duration: 7000, audio: 'いくらですか', image: imgTrain,
        main: '선불·후불 확인',
        sub: '일본 버스는 요금 내는 방식이 다르다.\n\n前払いですか、後払いですか\n선불인가요, 후불인가요?\nいくらですか  얼마예요?\nICカード、使えますか  IC카드 되나요?\n\n→ 탈 때 한 번만 확인하면 끝.',
        captionKo: '일본 버스는 지역마다 앞문 선불, 뒷문 후불이 갈린다. 탈 때 선불인지 후불인지, IC카드가 되는지만 확인하면 요금 때문에 당황할 일이 없다.',
        captionJp: 'バスは地域で前払いか後払いが違います。乗る時に「前払いですか」「ICカード、使えますか」と確認しましょう。'
      },
      { type: 'practice', label: '내릴 때', duration: 7000, audio: '次で降ります', image: imgTrain,
        main: '내리기 3문장',
        sub: '次で降ります  다음에서 내려요\nどこで降りますか  어디서 내리나요?\nここで大丈夫です  여기서 괜찮아요\n\n__내릴 때는 한 문장으로__\n버튼 누르듯 짧게.',
        captionKo: '버스에서 내릴 때 길게 말하면 늦는다. 다음에서 내려요, 여기서 괜찮아요처럼 한 문장이면 충분하다. 어디서 내리는지 모르면 미리 기사에게 물어 두자.',
        captionJp: '降りる時は「次で降ります」「ここで大丈夫です」と短く言いましょう。'
      },
      { type: 'practice', label: '못 들었을 때', duration: 7000, audio: 'もう一度お願いします', image: imgTrain,
        main: '안내방송 놓쳤을 때',
        sub: '정류장 이름을 못 들었을 때.\n\n○○は、まだですか  ○○은 아직인가요?\n着いたら、教えてください  도착하면 알려 주세요\nもう一度お願いします  다시 한 번 부탁해요\n\n→ 기사 옆자리에 앉으면 더 안전.',
        captionKo: '안내방송이 빠르거나 못 들었을 때를 대비하자. 도착하면 알려 달라고 미리 부탁하거나, 아직 멀었는지 물어보면 내릴 곳을 놓치지 않는다.',
        captionJp: '放送を聞き逃したら「着いたら教えてください」「○○はまだですか」と頼みましょう。'
      },
      { type: 'summary', label: '버스 흐름', duration: 6000, audio: null, image: imgTrain,
        main: '확인 → 타기 → 내리기',
        sub: '버스는 흐름이 단순하다.\n\n1. 行きますか (방향 확인)\n2. 요금 방식 확인하고 타기\n3. 次で降ります (내리기)\n\n→ 세 박자만 기억하면 된다.',
        captionKo: '버스는 방향을 확인하고, 요금 방식을 확인하며 타고, 내릴 때 한 문장으로 신호하는 흐름이다. 이 세 박자만 머릿속에 그려 두면 처음 타는 노선도 어렵지 않다.',
        captionJp: 'バスは、方向の確認、料金の確認、降りる合図の三つです。流れを覚えれば初めての路線も大丈夫です。'
      }
    ],
    v3_bus_ride_tip: tip('번호와 행선지를 같이 확인', '버스 번호만 보지 말고\n행선지도 함께 보자.\n\n12番、○○行き\n12번、○○행\n\n같은 번호라도 방향이 다를 수 있다.', '일본 버스는 번호만 같고 행선지가 정반대인 경우가 많다. 번호와 行き(목적지)를 같이 확인해야 잘못 타는 일이 없다.', 'バスは番号と行き先の両方を確認しましょう。', imgTrain),

    v3_taxi_ride: [
      { type: 'hook', label: '택시 핵심', duration: 6500, audio: null, image: imgTrain,
        main: '○○まで、お願いします',
        sub: '택시는 첫 문장이 90%다.\n\nホテル○○まで、お願いします\n○○ 호텔까지 부탁해요\n\n주소를 보여주면 더 안전.\n話さなくても OK.',
        captionKo: '택시 기사에게는 목적지까지 부탁해요 한 문장이면 충분하다. 발음이 자신 없으면 호텔 카드나 주소를 같이 보여주는 게 가장 안전하다.',
        captionJp: 'タクシーは「〇〇まで、お願いします」で大丈夫です。住所カードを見せれば安心です。'
      },
      { type: 'culture', label: '문은 자동', duration: 7000, audio: null, image: imgTrain,
        main: '뒷문은 손대지 않기',
        sub: '일본 택시는 뒷문이 __자동__이다.\n\n直接開けなくて大丈夫です\n직접 열지 않아도 돼요\n\n기사가 버튼으로 열고 닫는다.\n→ 문 앞에서 잠깐 기다리면 된다.',
        captionKo: '일본 택시는 뒷좌석 문이 자동으로 열리고 닫힌다. 직접 열거나 세게 닫으면 오히려 당황스러운 상황이 되니, 문 앞에서 잠깐 기다리는 게 매너다.',
        captionJp: '日本のタクシーは後ろのドアが自動です。自分で開けたり閉めたりしなくて大丈夫です。'
      },
      { type: 'practice', label: '가는 길', duration: 7000, audio: '急いでいます', image: imgTrain,
        main: '가는 중 한마디',
        sub: 'まっすぐ、お願いします  직진해 주세요\n次の信号で右です  다음 신호에서 우회전\n急いでいます  급해요\nゆっくりで大丈夫です  천천히 가도 돼요',
        captionKo: '가는 길에 방향을 보태고 싶을 때 쓰는 짧은 말들이다. 직진, 다음 신호에서 우회전, 급해요 정도만 알면 기사와 충분히 소통할 수 있다.',
        captionJp: '道中は「まっすぐ、お願いします」「次の信号で右です」「急いでいます」で十分伝わります。'
      },
      { type: 'practice', label: '도착·결제', duration: 7000, audio: 'カードでお願いします', image: imgTrain,
        main: '내릴 때·결제',
        sub: 'ここで大丈夫です  여기서 괜찮아요\n領収書、お願いします  영수증 부탁해요\nカードでお願いします  카드로 부탁해요\n現金です  현금이에요\n\n__한 문장씩__ 분리해서 말한다.',
        captionKo: '내릴 때 한 번에 다 말하지 말고 한 문장씩 분리하는 게 좋다. 여기서 내려요, 카드로 부탁해요, 영수증 부탁해요를 차례로 말하면 실수가 적다.',
        captionJp: '降りる時は「ここで大丈夫です」「カードでお願いします」「領収書、お願いします」と一文ずつ言いましょう。'
      },
      { type: 'summary', label: '택시 흐름', duration: 6000, audio: null, image: imgTrain,
        main: '목적지 → 가는 길 → 결제',
        sub: '택시 회화는 세 박자.\n\n1. ○○まで、お願いします\n2. (가는 중) 방향 한마디\n3. ここで・カードで、お願いします\n\n→ 발음이 막히면 화면을 보여주자.',
        captionKo: '택시는 목적지를 말하고, 가는 중 필요하면 방향을 보태고, 내릴 때 결제 방법을 말하는 흐름이다. 어떤 단계든 발음이 막히면 지도나 호텔 카드를 보여 주면 해결된다.',
        captionJp: 'タクシーは、目的地、道中の一言、支払いの三つです。困ったら画面を見せれば大丈夫です。'
      }
    ],
    v3_taxi_ride_tip: tip('주소 카드는 강력한 무기', '발음이 자신 없을 때\n호텔 카드, 메모, 지도를 보여주면\n오해가 사라진다.\n\n話す + 見せる\n두 가지를 같이 쓰자.', '택시에서 발음을 완벽하게 할 필요는 없다. 호텔 카드나 지도 화면을 같이 보여 주면 기사도 훨씬 빠르게 이해한다.', '話すだけでなく見せると、運転手にも早く伝わります。', imgTrain),

    /* ── Stage 6 ── */
    v3_cafe_breakfast: [
      { type: 'hook', label: '주문 한 줄', duration: 6500, audio: null, image: imgCounter,
        main: '메뉴 + ください',
        sub: '카페는 메뉴 이름만 정확히 발음하면 끝.\n\nアイスコーヒー、ください\nホットラテ、ください\nトースト、ひとつ、お願いします\n\n__매장? 포장?__만 더 답하면 된다.',
        captionKo: '카페 주문은 메뉴 이름과 ください가 본문이다. 메뉴 발음만 정확하면 직원이 매장이냐 포장이냐 같은 옵션만 더 물어볼 뿐이다.',
        captionJp: 'カフェの注文はメニュー名と「ください」が中心です。お店で食べるか持ち帰るかだけ追加で答えます。'
      },
      { type: 'culture', label: '사이즈·옵션', duration: 7000, audio: 'Mサイズで', image: imgCounter,
        main: '사이즈와 온도',
        sub: '카페는 보통 두 가지를 더 묻는다.\n\nサイズは？ → Mサイズで、お願いします\nホットですか、アイスですか → アイスで\n\n__사이즈 + 온도__만 답하면\n주문이 자연스럽게 끝난다.',
        captionKo: '음료를 주문하면 사이즈와 따뜻한지 차가운지를 거의 항상 물어본다. M사이즈로, 아이스로처럼 짧게 답하면 되니 미리 두 가지만 정해 두자.',
        captionJp: 'ドリンクはサイズと温度をよく聞かれます。「Mサイズで」「アイスで」と短く答えましょう。'
      },
      { type: 'practice', label: '매장/포장·조식', duration: 7000, audio: 'ここで食べます', image: imgCounter,
        main: '옵션 답변 4문장',
        sub: 'ここで食べます  여기서 먹어요\n持ち帰ります  포장이에요\n朝食は何時までですか  조식은 몇 시까지예요?\n窓側、お願いします  창가 쪽 부탁해요\n\n__한 문장 = 한 옵션__.',
        captionKo: '카페와 호텔 조식에서 가장 자주 나오는 옵션 답변이다. 매장/포장, 시간, 자리 위치 정도만 미리 잡아두면 당황할 일이 줄어든다.',
        captionJp: 'ここで食べます、持ち帰ります、朝食は何時までですか、窓側お願いします。'
      },
      { type: 'practice', label: '받을 때', duration: 7000, audio: 'お水、もらえますか', image: imgCounter,
        main: '받고 부탁하기',
        sub: 'お水、もらえますか  물 좀 받을 수 있을까요?\nおかわり、できますか  리필 되나요?\nWi-Fiはありますか  와이파이 있어요?\nコンセント、使えますか  콘센트 써도 되나요?',
        captionKo: '자리에 앉은 뒤 자주 쓰는 부탁들이다. 물, 리필, 와이파이, 콘센트는 카페에서 거의 매번 필요하니 ~もらえますか, ~できますか 형태로 외워 두자.',
        captionJp: '席についてからは「お水、もらえますか」「Wi-Fiはありますか」「コンセント、使えますか」をよく使います。'
      },
      { type: 'summary', label: '카페 흐름', duration: 6000, audio: null, image: imgCounter,
        main: '메뉴 → 옵션 → 자리',
        sub: '카페는 흐름이 짧다.\n\n1. メニュー、ください (주문)\n2. 사이즈·온도·매장/포장 답\n3. 자리에서 필요한 것 부탁\n\n→ 가타가나 메뉴만 읽으면 절반은 끝.',
        captionKo: '카페는 메뉴를 말하고, 사이즈와 매장/포장 옵션에 답하고, 자리에서 필요한 걸 부탁하는 흐름이다. 메뉴가 대부분 가타가나라 읽기만 되면 주문의 절반은 이미 해결된 셈이다.',
        captionJp: 'カフェは、注文、オプションの返事、席での頼みごとの流れです。カタカナのメニューが読めれば半分終わりです。'
      }
    ],
    v3_cafe_breakfast_tip: tip('가타가나 메뉴부터 외우기', '카페 메뉴는 거의 가타가나야.\n\nアイスコーヒー\nラテ\nトースト\nサンドイッチ\n\n읽기만 되면 주문은 거의 끝.', '카페 메뉴는 외래어가 많아서 가타가나만 빠르게 읽을 수 있으면 주문이 훨씬 쉬워진다.', 'カフェのメニューはほとんどカタカナです。読めると注文が早いです。', imgCounter),

    v3_izakaya: [
      { type: 'hook', label: '이자카야 흐름', duration: 6500, audio: null, image: imgIzakaya,
        main: '인원 → 첫 잔 → 추천',
        sub: '이자카야는 입구부터 흐름이 정해져 있다.\n\n二人です  두 명이에요\nとりあえずビール、お願いします  일단 맥주 부탁해요\nおすすめは何ですか  추천이 뭐예요?\n\n__순서만 알면 안 막힌다__.',
        captionKo: '이자카야에 들어가면 인원 → 첫 잔 → 추천 순서가 거의 정해져 있다. 흐름을 알면 문장 하나씩만 준비하면 된다.',
        captionJp: '居酒屋は人数、最初の一杯、おすすめの順で進みます。順番が分かれば一文ずつで大丈夫です。'
      },
      { type: 'culture', label: '주문 단어', duration: 7000, audio: '生ビール、お願いします', image: imgIzakaya,
        main: '첫 잔과 안주',
        sub: '메뉴 이름만 알면 주문이 쉬워진다.\n\n生（なま）ビール  생맥주\nレモンサワー  레몬 사와\n枝豆（えだまめ）  풋콩\n焼き鳥（やきとり）  꼬치구이\n\n→ 이름 + お願いします면 끝.',
        captionKo: '이자카야 단골 메뉴 이름만 알아도 주문이 편하다. 생맥주, 레몬 사와, 풋콩, 꼬치구이 같은 기본 단어에 お願いします만 붙이면 그대로 주문이 된다.',
        captionJp: '生ビール、レモンサワー、枝豆、焼き鳥など、定番の名前を覚えると注文が楽です。'
      },
      { type: 'practice', label: '못 먹는 것', duration: 7000, audio: '生ものは食べられません', image: imgIzakaya,
        main: '알레르기·못 먹는 것',
        sub: '안전을 위해 미리 말해 두자.\n\n○○アレルギーがあります  ○○ 알레르기가 있어요\n生（なま）ものは食べられません  날것은 못 먹어요\n辛いのは苦手です  매운 건 잘 못 먹어요\n\n→ 주문 전에 말하면 안심.',
        captionKo: '알레르기나 못 먹는 음식은 주문 전에 미리 말하는 게 안전하다. ○○ 알레르기가 있어요, 날것은 못 먹어요처럼 짧게 알려 두면 점원이 알아서 빼 준다.',
        captionJp: 'アレルギーや苦手なものは先に伝えましょう。「○○アレルギーがあります」「生ものは食べられません」。'
      },
      { type: 'practice', label: '추가·계산', duration: 7000, audio: 'お会計、お願いします', image: imgIzakaya,
        main: '추가와 마무리',
        sub: 'これ、もうひとつ、お願いします  이거 하나 더\n同じものを、お願いします  같은 거로 부탁해요\nお会計、お願いします  계산 부탁해요\n別々で、お願いします  따로 계산해 주세요\n\n__손가락 + 한 문장__이면 충분.',
        captionKo: '추가 주문은 메뉴를 손가락으로 가리키며 これ、もうひとつ만 말해도 통한다. 계산은 お会計, 더치페이는 別々で를 외워 두면 끝까지 자연스럽다.',
        captionJp: '追加は「これ、もうひとつ」、会計は「お会計、お願いします」、割り勘は「別々で、お願いします」。'
      },
      { type: 'summary', label: '이자카야 흐름', duration: 6000, audio: null, image: imgIzakaya,
        main: '입장 → 주문 → 계산',
        sub: '이자카야는 정해진 흐름이 든든하다.\n\n1. 인원 → 첫 잔\n2. 추천·메뉴 주문 (못 먹는 것 미리)\n3. お会計、お願いします\n\n→ お通し는 자리값, 놀라지 말기.',
        captionKo: '이자카야는 인원과 첫 잔, 추천 주문, 계산으로 흐름이 정해져 있다. お通し라는 기본 안주가 자리값처럼 나온다는 것만 알면 처음 가도 당황하지 않는다.',
        captionJp: '居酒屋は、人数と一杯目、注文、会計の流れです。お通しは席料だと知っていれば驚きません。'
      }
    ],
    v3_izakaya_tip: tip('お通し는 거절하지 않는다', 'お通し(おとおし)는\n자리값 같은 작은 안주야.\n\n주문 안 했어도 나온다.\n돈도 청구된다.\n당황하지 않으면 끝.', 'お通し는 일본 술집의 자리값 개념이다. 주문하지 않아도 나오고 청구된다는 점만 알면 놀라지 않는다.', 'お通しは席料のような小さな前菜で、注文しなくても出ます。', imgIzakaya),

    /* ── Stage 7 ── */
    v3_store_payment: [
      { type: 'hook', label: '결제 한 줄', duration: 6500, audio: null, image: imgConvenience,
        main: '카드 + でお願いします',
        sub: '결제는 한 문장이 표준이다.\n\nカードで、お願いします  카드로 부탁해요\n現金で、お願いします  현금으로 부탁해요\n袋、いりません  봉투, 필요 없어요\n\n__필요와 불필요__를 함께 외운다.',
        captionKo: '결제 한 줄은 카드인지 현금인지를 먼저 말하는 것이다. 봉투, 영수증 같은 작은 옵션은 필요/불필요만 답하면 된다.',
        captionJp: '会計では「カードで、お願いします」「現金で、お願いします」が基本です。袋や領収書は「要ります」「いりません」で答えます。'
      },
      { type: 'culture', label: '계산대 질문', duration: 7000, audio: '袋はいりません', image: imgConvenience,
        main: '점원이 던지는 말',
        sub: '계산대에서 자주 듣는 질문.\n\n袋はご利用ですか → いりません\nお箸は付けますか → お願いします\n温めますか → はい、お願いします\n\n→ 질문을 들으면 はい / いりません로 즉답.',
        captionKo: '편의점 계산대는 봉투, 젓가락, 데우기 같은 질문을 빠르게 던진다. 의미만 알면 はい나 いりません로 바로 답할 수 있으니 질문 패턴을 귀에 익혀 두자.',
        captionJp: 'レジでは「袋はご利用ですか」「温めますか」などをよく聞かれます。はい、いりませんで即答しましょう。'
      },
      { type: 'practice', label: '면세·영수증', duration: 7000, audio: '免税できますか', image: imgConvenience,
        main: '면세·영수증·포인트',
        sub: '免税できますか  면세 되나요?\n領収書、お願いします  영수증 부탁해요\nポイントカードは、ありません  포인트카드 없어요\n\n__질문 + 답__이 짝.\n외국인이라도 자연스럽다.',
        captionKo: '면세 가능 여부, 영수증, 포인트카드 질문은 거의 매번 나온다. 답을 미리 외워 두면 줄을 막지 않는다.',
        captionJp: '免税、領収書、ポイントカードは毎回聞かれるので、答えを覚えておきましょう。'
      },
      { type: 'practice', label: '문제가 생기면', duration: 7000, audio: 'これ、別々で', image: imgConvenience,
        main: '나눠 계산·취소',
        sub: 'これ、別々で、お願いします  이건 따로 계산해 주세요\nこれは、やめます  이건 뺄게요\nもう一度、お願いします  다시 한 번 부탁해요\n少し待ってください  잠깐만요',
        captionKo: '계산 중 따로 계산하거나 한 품목을 빼고 싶을 때, 또는 잘못 들었을 때 쓰는 표현이다. 짧게 말하면 점원이 바로 처리해 준다.',
        captionJp: '別々の会計や取り消しは「別々で、お願いします」「これは、やめます」、聞き直しは「もう一度、お願いします」。'
      },
      { type: 'summary', label: '결제 흐름', duration: 6000, audio: null, image: imgConvenience,
        main: '결제수단 → 옵션 → 마무리',
        sub: '계산대 흐름은 빠르지만 단순하다.\n\n1. カードで / 現金で\n2. 봉투·젓가락·데우기 즉답\n3. ありがとうございます\n\n→ 답을 먼저 떠올려 두면 줄이 안 막힌다.',
        captionKo: '결제는 결제수단을 말하고, 봉투나 데우기 같은 옵션에 즉답하고, 감사 인사로 끝나는 흐름이다. 줄이 길어도 답을 미리 준비해 두면 막힘없이 통과한다.',
        captionJp: '会計は、支払い方法、オプションの即答、お礼の流れです。答えを準備しておけば列で詰まりません。'
      }
    ],
    v3_store_payment_tip: tip('레지 앞에서는 답이 먼저', '계산대에서는\n질문이 빠르게 던져진다.\n\n袋は？ → いりません\n領収書は？ → お願いします\nポイントカードは？ → ありません\n\n답을 먼저 준비해두자.', '편의점·드럭스토어 계산대는 질문이 짧고 빠르다. 답을 미리 떠올려 두면 줄이 막히지 않는다.', 'レジでは質問が早いので、答えを準備しておきましょう。', imgConvenience),

    v3_duty_free: [
      { type: 'hook', label: '면세 핵심', duration: 6500, audio: null, image: imgConvenience,
        main: '여권 + 면세',
        sub: '면세점에서는 여권이 시작.\n\nパスポート、お願いします  여권 부탁드려요\n免税で、お願いします  면세로 부탁해요\n\n__면세 = 여권__ 한 묶음으로 기억.',
        captionKo: '공항·시내 면세점은 여권 없으면 면세 처리가 안 된다. パスポート와 免税는 한 묶음으로 같이 외우자.',
        captionJp: '免税はパスポートが必要です。「パスポート、お願いします」「免税で、お願いします」をセットで覚えましょう。'
      },
      { type: 'culture', label: '찾을 때', duration: 7000, audio: '探しています', image: imgConvenience,
        main: '물건 찾기',
        sub: '뭘 살지 정했다면 바로 물어보자.\n\n○○はどこですか  ○○은 어디예요?\n○○を探しています  ○○을 찾고 있어요\nこれ、見せてください  이거 보여 주세요\n\n→ 직원이 자리까지 안내해 준다.',
        captionKo: '면세점은 넓어서 직접 찾기 힘들다. ○○은 어디예요, ○○을 찾고 있어요처럼 물어보면 직원이 매대까지 안내해 주니 시간을 아낄 수 있다.',
        captionJp: '免税店は広いので「○○はどこですか」「○○を探しています」と聞くと、店員が案内してくれます。'
      },
      { type: 'practice', label: '추천·기내 반입', duration: 7000, audio: '機内に持ち込めますか', image: imgConvenience,
        main: '선물·반입 가능 여부',
        sub: 'おすすめは何ですか  추천이 뭐예요?\nプレゼント用に、お願いします  선물용으로 부탁해요\n機内に持ち込めますか  기내 반입 되나요?\n液体は大丈夫ですか  액체 괜찮나요?\n\n__질문 4개__가 거의 다 커버한다.',
        captionKo: '면세점에서 가장 자주 쓰는 네 가지 질문이다. 추천, 선물 포장, 기내 반입, 액체 여부만 미리 외우면 흐름이 끊기지 않는다.',
        captionJp: '免税店ではおすすめ、プレゼント、機内持ち込み、液体の四つをよく聞きます。'
      },
      { type: 'practice', label: '수령·환율', duration: 7000, audio: 'どこで受け取りますか', image: imgConvenience,
        main: '수령과 결제',
        sub: 'どこで受け取りますか  어디서 받나요?\n搭乗券、見せましょうか  탑승권 보여드릴까요?\nドルで払えますか  달러로 낼 수 있나요?\n別々に包んでください  따로 포장해 주세요',
        captionKo: '공항 면세점은 게이트에서 수령하는 경우가 많다. 어디서 받는지, 탑승권이 필요한지, 결제 통화는 무엇인지 미리 물어 두면 출국 직전에 헤매지 않는다.',
        captionJp: '空港の免税はゲートで受け取ることが多いです。「どこで受け取りますか」「ドルで払えますか」を確認しましょう。'
      },
      { type: 'summary', label: '면세 흐름', duration: 6000, audio: null, image: imgConvenience,
        main: '여권 → 고르기 → 수령',
        sub: '면세 쇼핑은 흐름이 정해져 있다.\n\n1. パスポート + 免税で\n2. 찾기·추천·기내 반입 확인\n3. 수령 장소·영수증 챙기기\n\n→ 영수증과 포장은 출국까지 보관.',
        captionKo: '면세는 여권을 내고, 물건을 고르며 기내 반입을 확인하고, 수령 장소와 영수증을 챙기는 흐름이다. 영수증과 포장은 출국 게이트에서 확인할 수 있으니 끝까지 보관하자.',
        captionJp: '免税は、パスポート、商品選びと持ち込み確認、受け取りの流れです。レシートは出国まで保管しましょう。'
      }
    ],
    v3_duty_free_tip: tip('영수증은 절대 잃지 말기', '면세 영수증은\n출국 때 검사 받을 수 있다.\n\n가방 잘 보이는 곳에\n포장 그대로 두는 게 안전.', '면세 영수증과 포장 비닐은 출국 게이트에서 확인하는 경우가 있다. 가방 안쪽에 잘 보관해 두자.', '免税のレシートは出国時に確認されることがあります。失くさないようにしましょう。', imgConvenience),

    /* ── Stage 8 ── */
    v3_hotel_request: [
      { type: 'hook', label: '프런트 요청', duration: 6500, audio: null, image: imgHotelFront,
        main: '○○がほしいです / お願いします',
        sub: '객실에서 부족한 것은 프런트에 짧게.\n\nタオルがもう一枚ほしいです  수건 한 장 더 필요해요\nWi-Fiのパスワード、お願いします  와이파이 비밀번호\nエアコンが効きません  에어컨이 안 돼요\n\n__무엇이 + 어떤 상태__.',
        captionKo: '프런트 요청은 어떤 물건이 필요한지, 어디가 문제인지 두 가지 패턴이면 된다. 길게 설명하지 않아도 호텔은 알아서 처리한다.',
        captionJp: 'フロントへは「〇〇がほしいです」「〇〇が効きません」など、欲しい物か困っている事を短く伝えれば大丈夫です。'
      },
      { type: 'practice', label: '시간·체크아웃', duration: 7000, audio: 'チェックアウトは何時までですか', image: imgHotelFront,
        main: '시간 질문 모음',
        sub: 'チェックアウトは何時までですか  체크아웃 몇 시까지?\nモーニングコールを6時にお願いします  6시에 모닝콜 부탁해요\n荷物を預けてもいいですか  짐을 맡겨도 돼요?\n\n__시간 + 부탁__이 표준 묶음.',
        captionKo: '체크아웃 시간, 모닝콜, 짐 보관은 자주 묻는 시간 관련 요청이다. 시간을 정확히 붙여 한 문장으로 마무리하면 직원이 바로 처리한다.',
        captionJp: 'チェックアウト、モーニングコール、荷物預けは時間を一緒に伝えると早いです。'
      }
    ],
    v3_hotel_request_tip: tip('내선·앱·LINE도 활용', '발음이 어려우면\n프런트 직접 가서 메모 보여주기.\n앱·LINE 채팅도 의외로 빠르다.\n\n전화보다 안전한 길이 많다.', '발음에 자신이 없을 때는 직접 프런트에 가거나 호텔 앱·LINE 채팅을 쓰면 오해 없이 정확하게 전달된다.', '発音に自信がない時は直接フロントに行くか、ホテルのアプリ・LINEを使うと確実です。', imgHotelFront),

    v3_onsen: [
      { type: 'hook', label: '온천 첫 규칙', duration: 6500, audio: null, image: imgRyokan,
        main: '들어가기 전 두 가지',
        sub: '온천은 첫 5분에 규칙이 있다.\n\nタトゥーは大丈夫ですか  문신 괜찮나요?\nタオルはどこで借りますか  수건은 어디서 빌리나요?\n初めてです、教えてください  처음이에요, 알려 주세요\n\n__처음입니다__만 말해도 친절해진다.',
        captionKo: '온천은 문신, 수건, 입욕 순서 등 첫 안내가 중요하다. 初めてです 한 마디만 해 두면 직원이 차근차근 알려 준다.',
        captionJp: '温泉ではタトゥー、タオル、初めてかどうかを最初に伝えると安心です。'
      },
      { type: 'practice', label: '시간·금지', duration: 7000, audio: '何時までですか', image: imgRyokan,
        main: '시간·금지·예의',
        sub: '何時までですか  몇 시까지예요?\n写真は禁止ですか  사진 금지인가요?\n泳いではいけません  수영 금지\n小さなタオルだけです  작은 수건만이에요\n\n__금지 + 시간__을 먼저 확인.',
        captionKo: '온천은 금지 사항과 운영 시간이 시설마다 다르다. 사진 금지, 수영 금지, 수건 사용 규칙을 미리 묻고 들어가면 실수가 없다.',
        captionJp: '温泉は施設ごとに禁止事項と時間が違います。先に確認しましょう。'
      }
    ],
    v3_onsen_tip: tip('탕 안에서는 정숙', '큰 소리, 사진, 핸드폰\n셋 다 거의 금지.\n\n조용히 몸을 풀고\n10분 단위로 쉬어가자.\n\n에티켓이 곧 안전이다.', '온천 안에서는 큰 소리, 사진, 핸드폰 사용이 거의 금지다. 조용히 몸을 담그는 게 곧 매너이자 안전이다.', '温泉では大きな声、写真、携帯はほぼ禁止です。静かに楽しみましょう。', imgRyokan),

    /* ── Stage 9 ── */
    v3_hospital: [
      { type: 'hook', label: '접수 순서', duration: 6500, audio: null, image: imgClinic,
        main: '보험 → 증상 → 시간',
        sub: '병원 접수는 항상 같은 순서.\n\n保険は持っていません  보험은 없어요\n旅行保険があります  여행자 보험 있어요\n熱があって、お腹が痛いです  열이 있고 배가 아파요\n\n__보험 + 증상__이 첫 두 문장.',
        captionKo: '여행 중 병원 접수는 보험 여부, 증상, 대기 시간 순으로 흐른다. 처음 두 문장만 잘 외우면 다음은 의료진이 이끌어 준다.',
        captionJp: '病院では保険、症状、待ち時間の順に進みます。最初の二文だけ覚えておけば大丈夫です。'
      },
      { type: 'practice', label: '대기·결제', duration: 7000, audio: 'どれくらい待ちますか', image: imgClinic,
        main: '대기·약·결제',
        sub: 'どれくらい待ちますか  얼마나 기다려요?\nお薬はありますか  약 있어요?\n領収書をお願いします  영수증 부탁해요\n保険のために書類が必要です  보험을 위해 서류가 필요해요\n\n__대기 + 약 + 서류__.',
        captionKo: '대기 시간, 처방 약, 보험 청구용 서류는 거의 항상 챙겨야 한다. 서류와 영수증은 귀국 후 보험 청구의 핵심.',
        captionJp: '待ち時間、薬、保険の書類は必ず確認しましょう。'
      }
    ],
    v3_hospital_tip: tip('통역 앱을 같이 쓰자', '증상 설명이 어려우면\n사진과 통역 앱을 같이 보여주자.\n\n口で説明 + アプリ\n둘이 합쳐야 정확하다.', '병원에서는 정확한 단어가 어렵다. 통역 앱과 사진을 같이 보여주면 의료진이 훨씬 빠르게 진단을 시작한다.', '病院では翻訳アプリと写真も使うと正確に伝わります。', imgClinic),

    /* ── Stage 10 ── */
    v3_rentacar: [
      { type: 'hook', label: '대여 순서', duration: 6500, audio: null, image: imgTrain,
        main: '예약 → 면허 → 보험',
        sub: '렌트카는 카운터에서 흐름이 정해져 있다.\n\n予約しています、○○です  예약했어요, ○○입니다\n国際免許証です  국제 면허증이에요\n保険、お願いします  보험 부탁해요\n\n__세 문장__이면 차 받기 직전까지.',
        captionKo: '렌트카는 예약자 이름, 면허증, 보험 선택의 순서가 거의 같다. 세 문장만 외우면 차 키 받기 직전까지 진행된다.',
        captionJp: 'レンタカーは予約名、免許証、保険の順で進みます。三文だけで十分です。'
      },
      { type: 'practice', label: '반납·연료', duration: 7000, audio: '満タンで返します', image: imgTrain,
        main: '반납·연료·내비',
        sub: '返却は何時までですか  반납 몇 시까지?\n満タンで返します  가득 채워 반납해요\nナビは英語に出来ますか  내비 영어로 돼요?\n高速道路、使っても大丈夫ですか  고속도로 써도 돼요?\n\n__시간 + 옵션__으로 끝.',
        captionKo: '반납 시간, 연료, 내비 언어, 고속도로 사용 가능 여부는 자주 묻는 옵션이다. 사고를 막는 마지막 확인.',
        captionJp: '返却時間、燃料、ナビ、高速道路の使用などは必ず確認しましょう。'
      }
    ],
    v3_rentacar_tip: tip('보험은 풀로 가는 게 안전', '한국 카드 보험만 믿지 말고\n현지 풀커버를 추가하자.\n\n사고 한 번이면\n여행 전부가 멈춘다.', '여행 중 사고는 한 번으로도 모든 일정이 무너진다. 현지 풀커버 보험을 추가하는 게 보통 가장 안전한 선택이다.', '保険はフルカバーが安心です。事故一回で旅行全体が止まることがあります。', imgTrain),

    v3_tourist_spot: [
      { type: 'hook', label: '사진 부탁 공식', duration: 6500, audio: null, image: imgSightseeing,
        main: 'すみません + 사진',
        sub: '사진 부탁은 거의 한 문장이다.\n\nすみません、写真をお願いできますか\n실례합니다, 사진 부탁드려도 될까요?\n\n→ ボタンはここです\n→ 버튼은 여기예요',
        captionKo: '관광지에서 사진을 부탁할 때는 すみません 한 마디로 시작한다. 그 다음은 사진 버튼 위치만 손으로 짚어 주면 끝이다.',
        captionJp: '写真をお願いする時は「すみません、写真をお願いできますか」で大丈夫です。ボタンの場所を指で示しましょう。'
      },
      { type: 'practice', label: '추천·입장', duration: 7000, audio: '入場料はいくらですか', image: imgSightseeing,
        main: '추천·입장·금지',
        sub: 'おすすめのスポットはありますか  추천 장소 있어요?\n入場料はいくらですか  입장료 얼마예요?\n写真を撮ってもいいですか  사진 찍어도 돼요?\n中で食べられますか  안에서 먹어도 돼요?\n\n__가능/금지__를 묻는 질문이 핵심.',
        captionKo: '관광지에서는 입장료, 사진 가능 여부, 음식 반입 등 가능/금지 질문이 중요하다. 먼저 묻고 들어가는 게 가장 안전하다.',
        captionJp: '観光地では入場料、写真、飲食など、できるかどうかを先に聞きましょう。'
      }
    ],
    v3_tourist_spot_tip: tip('찍은 뒤에는 한 마디', '사진을 받고 끝내지 말고\n작은 한 마디를 더하자.\n\nありがとうございます\n本当に助かりました\n\n관광지에서의 매너가\n다음 여행을 살린다.', '도움을 받은 뒤 한 마디 더하는 작은 매너가 일본 여행에서 의외로 중요하다. 다음 사람에게도 친절이 이어진다.', '助けてもらった後に「ありがとうございます」を一言加えましょう。', imgSightseeing),

    v3_reservation_call: [
      { type: 'hook', label: '예약 확인', duration: 6500, audio: null, image: imgMenuCheck,
        main: '예약했어요 + 이름',
        sub: '예약 확인은 한 줄이면 된다.\n\n予約しています、○○です  예약했어요, ○○입니다\n名前は○○です  이름은 ○○입니다\n何時の予約ですか  몇 시 예약이에요?\n\n__이름 + 시간__이 중심.',
        captionKo: '식당, 호텔, 관광지 예약은 이름과 시간만 정확하면 거의 다 해결된다. 발음이 어렵다면 예약 화면을 함께 보여 주자.',
        captionJp: '予約確認は名前と時間が中心です。発音が難しい時は画面を見せれば早いです。'
      },
      { type: 'practice', label: '변경·취소', duration: 7000, audio: '時間を変えたいです', image: imgMenuCheck,
        main: '변경·취소·인원 변경',
        sub: '時間を変えたいです  시간을 바꾸고 싶어요\nキャンセル、お願いします  취소 부탁해요\n人数が増えました、3人です  인원이 늘었어요, 3명이에요\n領収書、出せますか  영수증 가능해요?\n\n__변경 + 인원 + 영수증__.',
        captionKo: '예약 변경, 인원 조정, 취소, 영수증 요청 정도면 거의 모든 예약 상황을 처리할 수 있다.',
        captionJp: '変更、人数、取消、領収書まで覚えれば、予約のほとんどに対応できます。'
      }
    ],
    v3_reservation_call_tip: tip('취소는 가능한 빨리', '취소는 미리 알릴수록\n수수료가 줄어든다.\n\n못 가요 + 죄송해요\n한 줄이면 충분.\n\n약속한 시간을 지키는 것이\n여행자 매너의 시작이다.', '예약 취소는 빠를수록 가게에도 좋고 수수료도 줄어든다. 짧고 정중하게 알리자.', 'キャンセルは早めに伝えるとお店も助かります。', imgMenuCheck),

    v3_weather_plan: [
      { type: 'hook', label: '일정 변경 공식', duration: 6500, audio: null, image: imgCalendar,
        main: '날씨 + 변경 부탁',
        sub: '날씨가 나빠 일정을 옮길 때.\n\n雨で、明日に変えてもいいですか\n비 와서 내일로 바꿔도 돼요?\n台風で、行けません  태풍이라 못 가요\n\n__이유 + 부탁__이 한 묶음.',
        captionKo: '날씨 때문에 일정을 바꿀 때는 이유를 짧게 말하고 부탁을 붙이는 게 자연스럽다. 이유가 있으면 가게도 잘 받아 준다.',
        captionJp: '天気の理由を先に言い、そのあと変更や中止をお願いすると伝わりやすいです。'
      },
      { type: 'practice', label: '대안 묻기', duration: 7000, audio: '別の日は空いていますか', image: imgCalendar,
        main: '대안·환불·문의',
        sub: '別の日は空いていますか  다른 날 비어요?\n返金できますか  환불 되나요?\n中止になったら教えてください  취소되면 알려주세요\n\n__변경 → 환불 → 통보__ 순으로 묻기.',
        captionKo: '먼저 변경 가능한지 묻고, 안 되면 환불, 그래도 안 되면 통보를 부탁하는 순서가 부드럽다.',
        captionJp: '変更、返金、連絡の順で聞くと、相手も対応しやすいです。'
      }
    ],
    v3_weather_plan_tip: tip('날씨 앱을 같이 보여주자', '말로 설명하기 어려울 때\n날씨 앱 화면을 보여주면\n바로 이해된다.\n\n台風です\n+ アプリ画面\n= 즉시 해결.', '말이 막힐 때는 날씨 앱이나 뉴스 화면을 같이 보여주면 빠르게 통한다.', '言葉が難しい時は天気アプリの画面を見せると早いです。', imgCalendar),

    v3_polite_wrapup: [
      { type: 'hook', label: '감사 한 줄', duration: 6500, audio: null, image: imgArigatou,
        main: '도움받은 뒤 마무리',
        sub: '도움받은 뒤에는\n짧은 한 줄이 가장 좋다.\n\nありがとうございました  감사했습니다\n本当に助かりました  정말 큰 도움이 됐어요\nまた来ます  또 올게요\n\n__과거형__이 더 정중하게 들린다.',
        captionKo: '도움을 받은 뒤에는 길게 칭찬하지 않아도 된다. 감사했습니다, 큰 도움이 됐어요, 또 올게요 정도면 충분히 정중하다.',
        captionJp: 'お礼は短い方が自然です。「ありがとうございました」「本当に助かりました」「また来ます」で十分です。'
      },
      { type: 'practice', label: '거절·사과', duration: 7000, audio: '大丈夫です', image: imgArigatou,
        main: '거절·사과·인사',
        sub: '大丈夫です、ありがとうございます  괜찮아요, 감사해요\nすみませんでした  죄송했습니다\nお邪魔しました  실례했습니다\nまたお願いします  다음에도 부탁드려요\n\n__과한 말보다 짧고 정중__하게.',
        captionKo: '거절도 사과도 한 줄이면 자연스럽다. 일본은 짧고 정중한 마무리를 더 좋게 본다.',
        captionJp: '断りもお詫びも短くて大丈夫です。日本では短くて丁寧な締めが好まれます。'
      }
    ],
    v3_polite_wrapup_tip: tip('표정과 어조가 절반', '같은 ありがとう라도\n웃는 얼굴과 살짝 숙인 자세가\n진심을 전한다.\n\n말은 절반\n태도가 나머지 절반.', '말만큼 표정과 자세가 중요하다. 살짝 미소를 띠고 가볍게 고개를 숙이는 동작이 한 마디를 두 배로 만든다.', '言葉と同じくらい表情と姿勢が大切です。', imgArigatou),

    /* ── Stage 11 emotion ── */
    v3_drama_emotion: [
      { type: 'hook', label: '감정 한 줄', duration: 6500, audio: null, image: imgArigatou,
        main: '○○です로 던지기',
        sub: '감정은 길게 설명하지 않아도 된다.\n\n嬉しいです  기뻐요\n悲しいです  슬퍼요\n緊張しています  긴장돼요\n感動しました  감동했어요\nびっくりしました  깜짝 놀랐어요\n\n__형용사 + です/ました__만으로 통한다.',
        captionKo: '드라마 속 감정 표현은 거의 한 줄짜리다. 형용사 뒤에 です나 ました만 붙여도 자연스러운 일본어가 된다. 길게 만들면 오히려 어색해진다.',
        captionJp: '気持ちの表現は短い一文で大丈夫です。嬉しいです、悲しいです、緊張しています。'
      },
      { type: 'practice', label: '맞장구', duration: 7000, audio: 'わかります', image: imgArigatou,
        main: '상대 감정 받기',
        sub: '상대가 감정을 말하면 짧게 받는다.\n\nそうなんだ  그렇구나\nわかります  알아요\n大変でしたね  힘드셨겠어요\nよかったですね  잘 됐네요\nうらやましいです  부러워요\n\n__맞장구 한 줄__이 대화를 살린다.',
        captionKo: '감정을 듣고 가만히 있으면 어색하다. 그렇구나, 알아요, 잘 됐네요 같은 짧은 맞장구만 있어도 대화가 자연스럽게 이어진다.',
        captionJp: '相手の気持ちを聞いたら短く反応しましょう。そうなんだ、わかります、よかったですね。'
      }
    ],
    v3_drama_emotion_tip: tip('얼굴 표정이 절반', '감정 표현은 단어만큼\n얼굴이 중요하다.\n\n嬉しい + 미소\n悲しい + 약한 한숨\n緊張 + 어깨 올라감\n\n표정을 같이 쓰면 한 단어가 두 배 전해진다.', '드라마 속 인물의 감정 표현이 강렬한 건 표정과 톤 덕분이다. 같은 嬉しい라도 표정에 따라 전해지는 강도가 완전히 달라진다.', '気持ちの言葉は表情と一緒に伝えるとより自然です。', imgArigatou),
  });

  const scene = (type, label, image, main, sub, captionKo, captionJp, audio = null) => ({
    type, label, duration: 6500, audio, image, main, sub, captionKo, captionJp
  });

  const supplements = {
    v3_kana_map: [
      scene('practice', '표에서 찾기', imgDesk, '모르면 위치부터',
        '글자가 바로 안 떠올라도 괜찮아.\n\n1. 모음 칸 보기\n2. 자음 행 찾기\n3. 소리 내서 읽기\n\n예: け = か행 + え단\n→ ke',
        '처음부터 모든 글자를 외우려고 하지 말고 표에서 찾는 속도를 올리자. 위치를 찾고 소리를 내는 과정이 반복되면 글자가 자연스럽게 붙는다.',
        '最初から全部覚えようとせず、表で探す練習をしましょう。位置と音を一緒に確認します。'),
      scene('summary', '다음 학습 연결', imgDesk, '표는 길잡이',
        '오늘 배운 표는\n히라가나, 가타가나, 읽기 규칙의 길잡이야.\n\n표에서 찾기\n→ 카드로 익히기\n→ 단어에서 다시 보기\n\n이 순서로 간다.',
        '오십음도는 암기 시험지가 아니라 앞으로 볼 모든 글자의 길잡이다. 표, 카드, 단어 순서로 반복하면 초보자도 부담 없이 따라갈 수 있다.',
        '五十音表は暗記テストではなく、これから読む文字の案内図です。表、カード、単語の順で進みましょう。')
    ],
    v3_first_greetings: [
      scene('practice', '상황별 고르기', imgCafe, '누구에게 말하나',
        '같은 인사도 상대에 따라 톤이 달라.\n\n가게: すみません\n도움 받음: ありがとうございます\n처음 만남: はじめまして\n헤어질 때: またね\n\n상황을 먼저 고르자.',
        '인사는 단어를 많이 아는 것보다 상황에 맞게 고르는 힘이 중요하다. 점원을 부를 때, 도움을 받은 뒤, 처음 만났을 때를 따로 떠올려 보자.',
        '挨拶は数より場面が大切です。店で呼ぶ時、助けてもらった時、初めて会う時を分けて覚えましょう。')
    ],
    v3_survival_objects: [
      scene('practice', '보여 주기 공식', imgCafe, 'これです',
        '단어가 막히면 화면이나 물건을 보여 줘.\n\nこれです  이거예요\nこれをください  이거 주세요\nここです  여기예요\n\n말보다 보여 주기가 빠를 때가 많다.',
        '여행에서는 완벽한 단어보다 보여 주기가 더 빠른 경우가 많다. 예약 화면, 지도, 메뉴판을 가리키며 これです, ここです라고 말하면 된다.',
        '旅行では、言葉より見せる方が早いことがあります。これです、ここですを使いましょう。'),
      scene('practice', '필수 장소', imgStation, '場所 단어',
        '장소 단어는 길 찾기의 재료야.\n\n駅  역\nトイレ  화장실\nホテル  호텔\nコンビニ  편의점\n入口 / 出口  입구 / 출구\n\nどこですか와 붙인다.',
        '장소 단어는 어디예요와 바로 붙어야 쓸 수 있다. 역, 화장실, 호텔, 편의점, 입구와 출구를 먼저 잡으면 길 찾기가 쉬워진다.',
        '場所の言葉は「どこですか」と一緒に使います。駅、トイレ、ホテル、コンビニ、入口、出口を覚えましょう。'),
      scene('summary', '단어 운용법', imgCafe, '명사 + 짧은 말',
        '단어 하나를 배웠다면\n짧은 말 세 개에 붙여.\n\nください\nどこですか\nありますか\n\n水ください\nトイレはどこですか\nカードはありますか',
        '초급 단어는 단독 암기보다 짧은 말에 붙일 때 힘이 생긴다. 주세요, 어디예요, 있어요 세 틀만 있어도 단어가 바로 문장이 된다.',
        '単語は短い形につけると文になります。ください、どこですか、ありますかを使いましょう。')
    ],
    v3_pronouns_places: [
      scene('practice', '상대 쪽 말하기', imgStation, 'それ / そこ',
        '상대가 들고 있거나\n상대 근처에 있으면 そ.\n\nそれは何ですか\n그건 뭐예요?\n\nそこにありますか\n거기에 있어요?\n\n내 쪽 こ와 구분한다.',
        'そ는 상대 쪽 감각이다. 상대가 들고 있는 물건은 それ, 상대 쪽 장소는 そこ라고 생각하면 헷갈림이 줄어든다.',
        'そは相手の近くです。相手の物はそれ、相手の場所はそこです。'),
      scene('summary', '질문으로 연결', imgStation, 'どれ / どこ',
        '모르면 ど를 붙여 질문해.\n\nどれですか\n어느 거예요?\n\nどこですか\n어디예요?\n\n질문 단어가 있어야\n상대가 도와줄 수 있다.',
        'こそあど의 마지막은 질문이다. 어느 것인지 모르면 どれ, 장소를 모르면 どこ로 물어야 상대가 바로 안내할 수 있다.',
        '分からない時は、どれ、どこで質問します。質問できると相手が助けやすくなります。')
    ],
    v3_numbers_time: [
      scene('practice', '인원수 듣기', imgNumbers, '何名様ですか',
        '식당과 예약에서는 인원수를 듣는다.\n\n何名様ですか  몇 분이세요?\n一人です  한 명이에요\n二人です  두 명이에요\n\n숫자 + 人을 통째로 듣자.',
        '숫자는 가격뿐 아니라 인원수에도 바로 나온다. 식당에서 何名様ですか를 들으면 一人です, 二人です처럼 짧게 답하면 된다.',
        '数字は人数にも使います。何名様ですかと聞かれたら、一人です、二人ですと答えましょう。'),
      scene('summary', '숫자 확인 습관', imgNumbers, '다시 확인하기',
        '숫자가 불안하면 한 번 더 확인해.\n\nもう一度お願いします\n한 번 더 부탁해요\n\n三時ですか\n3시예요?\n\n숫자는 확인해도 실례가 아니다.',
        '숫자는 틀리면 일정이 흔들리기 때문에 다시 확인하는 게 자연스럽다. 못 들었을 때는 한 번 더 부탁하고, 들은 숫자를 되물어 보자.',
        '数字は大切なので確認して大丈夫です。もう一度お願いします、三時ですかを使いましょう。')
    ],
    v3_money_counting: [
      scene('practice', '몇 개와 몇 명', imgNumbers, '個 / 人',
        '수량은 단위와 같이 나온다.\n\n一個  하나\n二個  두 개\n一人  한 명\n二人  두 명\n\n숫자만 듣지 말고 뒤 단위까지 듣자.',
        '일본어 숫자는 뒤에 붙는 단위가 중요하다. 개수는 個, 사람 수는 人이 붙는다. 숫자와 단위를 한 덩어리로 들어야 한다.',
        '数字は助数詞と一緒に聞きます。個は物の数、人は人数です。'),
      scene('practice', '날짜와 기간', imgCalendar, '何日 / 何泊',
        '예약에서는 날짜와 기간이 나온다.\n\n何日ですか  며칠이에요?\n何泊ですか  몇 박이에요?\n三日間です  3일이에요\n二泊です  2박이에요',
        '호텔과 입국 심사에서는 며칠, 몇 박인지 자주 묻는다. 何日, 何泊을 들으면 기간 질문이라는 걸 바로 알아야 한다.',
        '予約では何日、何泊をよく聞きます。期間を答える練習をしましょう。'),
      scene('summary', '결제 전 확인', imgNumbers, '合っていますか',
        '결제 전에는 숫자를 눈으로 확인해.\n\nこれで合っていますか\n이걸로 맞나요?\n\nレシートをお願いします\n영수증 부탁해요\n\n가격은 보고 확인하면 안전하다.',
        '돈 표현은 듣기만 믿지 말고 화면이나 영수증으로 확인하는 습관이 좋다. 결제 전 한 번 확인하면 실수가 크게 줄어든다.',
        '支払いの前に画面やレシートで確認しましょう。これで合っていますかが便利です。')
    ],
    v3_directions_body: [
      scene('practice', '역 안 방향', imgStation, '出口はどこですか',
        '역에서는 방향 단어가 계속 나온다.\n\n出口  출구\n入口  입구\n右側  오른쪽\n左側  왼쪽\nまっすぐ  직진\n\n出口はどこですか와 붙인다.',
        '역 안에서 방향 단어를 알면 안내판과 직원 설명이 훨씬 쉬워진다. 출구, 입구, 오른쪽, 왼쪽, 직진을 먼저 익히자.',
        '駅では出口、入口、右側、左側、まっすぐをよく使います。'),
      scene('summary', '문장 공식', imgClinic, '부위 + 상태',
        '몸 단어는 상태와 같이 말해.\n\n頭が痛いです\n寒いです\n気分が悪いです\n\n위치와 상태를 짧게 말하면\n도움을 받기 쉽다.',
        '병원이나 약국에서는 어디가 어떤 상태인지가 핵심이다. 부위와 상태를 짧게 말하면 자세한 문법이 없어도 도움을 받을 수 있다.',
        '病院や薬局では、どこがどう悪いかを短く言うことが大切です。')
    ],
    v3_particle_basics: [
      scene('practice', 'は와 が', imgCafe, '처음엔 は부터',
        '처음 문장은 は로 시작해도 충분해.\n\n私は韓国人です\nこれは水です\nここは駅です\n\n주제를 먼저 꺼내면\n상대가 문장을 따라오기 쉽다.',
        'は와 が의 차이를 처음부터 완벽히 나눌 필요는 없다. 초보자는 주제를 꺼내는 は부터 익히면 문장을 시작하기 쉽다.',
        'はとがを最初から完璧に分けなくても大丈夫です。まずは、はで文を始めましょう。'),
      scene('practice', '조사 빼고 말하기', imgStation, '먼저 통하게',
        '급하면 조사를 잠깐 빼도 돼.\n\n水ください\n駅どこですか\nカード大丈夫ですか\n\n그다음 천천히\n水をください로 다듬는다.',
        '실전에서는 말이 멈추는 것보다 통하는 게 먼저다. 조사가 빠진 짧은 말로 시작하고, 익숙해지면 を, は, に를 붙여 다듬자.',
        '実際の会話では、まず伝えることが大事です。慣れたら助詞を足していきましょう。'),
      scene('summary', '오늘의 네 조사', imgCafe, 'は / を / に / で',
        '초반 조사는 네 개만 잡자.\n\nは 주제\nを 대상\nに 방향·시간\nで 장소·수단\n\n표보다 예문으로 기억한다.',
        '오늘은 は, を, に, で의 큰 역할만 알면 충분하다. 정의를 외우기보다 예문 안에서 반복하는 편이 오래 간다.',
        '今日は、は、を、に、での大きな役割だけで十分です。例文で覚えましょう。')
    ],
    v3_tense_matrix: [
      scene('summary', '여행 표현으로 쓰기', imgCafe, '네 칸을 바로 말하기',
        '하나의 동사를 네 칸으로 바꿔 봐.\n\n行きます\n行きません\n行きました\n行きませんでした\n\n여행에서는 行く, 食べる, 買う부터 시작한다.',
        '시제 표는 문법 문제보다 실제 말하기 속도를 올리기 위한 도구다. 자주 쓰는 동사부터 네 칸으로 바꿔 말해 보자.',
        'この四つの形は、話すための道具です。よく使う動詞から練習しましょう。')
    ],
    v3_question_engine: [
      scene('practice', '있어요 질문', imgStation, 'ありますか',
        '물건이나 장소가 있는지 물을 때.\n\nトイレはありますか\n화장실 있어요?\n\nWi-Fiはありますか\n와이파이 있어요?\n\nありますか는 여행 필수 질문이다.',
        'ありますか는 여행에서 매우 자주 쓰는 질문이다. 화장실, 와이파이, 메뉴, 자리처럼 필요한 것이 있는지 물을 때 바로 붙이면 된다.',
        'ありますかは旅行でよく使う質問です。トイレ、Wi-Fi、メニュー、席に使えます。'),
      scene('practice', '가능해요 질문', imgStation, 'できますか',
        '가능 여부는 できますか로 물어.\n\nカードで払えますか\n카드로 낼 수 있어요?\n\n予約できますか\n예약할 수 있어요?\n\nできる지 먼저 확인하면 안전하다.',
        '가능 여부를 먼저 묻는 습관이 있으면 실수가 줄어든다. 카드 결제, 예약, 사진 촬영처럼 가능한지 확인하고 움직이자.',
        'できるかどうかを先に聞くと安心です。カード、予約、写真などで使います。'),
      scene('summary', '질문 5개', imgStation, '초보 질문 세트',
        '여행 질문은 이 다섯 개로 시작해.\n\n何ですか\nどこですか\nいくらですか\nありますか\nできますか\n\n장면마다 단어만 바꾸면 된다.',
        '질문을 많이 만들려고 하기보다 기본 질문 다섯 개를 통째로 익히자. 단어만 바꿔도 대부분의 여행 상황에 적용된다.',
        '質問は五つから始めましょう。何ですか、どこですか、いくらですか、ありますか、できますか。')
    ],
    v3_answer_engine: [
      scene('practice', '긍정과 거절', imgCafe, 'はい / 大丈夫です',
        '받아들일 때와 거절할 때를 나누자.\n\nはい、お願いします\n네, 부탁해요\n\n大丈夫です\n괜찮아요 / 필요 없어요\n\n짧고 부드럽게 답한다.',
        '大丈夫です는 상황에 따라 괜찮아요, 필요 없어요처럼 부드러운 거절이 된다. 네라고 받을지, 괜찮다고 넘길지 구분해서 연습하자.',
        '大丈夫ですは、やさしい断りにも使えます。はい、お願いしますと分けて覚えましょう。'),
      scene('practice', '모를 때 답하기', imgCafe, 'わかりません',
        '모르면 솔직히 짧게 말해.\n\nわかりません\n모르겠어요\n\n日本語は少しだけです\n일본어는 조금만 해요\n\nゆっくりお願いします\n천천히 부탁해요',
        '모르는 척을 숨기려고 길게 말하면 더 어려워진다. 모르겠어요, 일본어는 조금만 해요, 천천히 부탁해요를 같이 쓰자.',
        '分からない時は短く伝えましょう。わかりません、日本語は少しだけです、ゆっくりお願いします。'),
      scene('summary', '답변 흐름', imgCafe, '짧게 답하고 확인',
        '답변은 세 단계면 충분해.\n\n1. はい / いいえ\n2. 필요한 한 단어\n3. ありがとうございます\n\n길이보다 정확도가 중요하다.',
        '초보 답변은 길지 않아도 된다. 네, 아니요로 방향을 정하고 필요한 단어 하나를 붙인 뒤 감사로 마무리하면 충분하다.',
        '返事は短くて大丈夫です。はい、いいえ、必要な一言、お礼で十分です。')
    ],
    v3_reaction_shadowing: [
      scene('practice', '듣기 버튼', imgCafe, '반응어 4개',
        '대화를 이어 주는 버튼을 외워.\n\nそうですか  그렇군요\nいいですね  좋네요\n大丈夫です  괜찮아요\nなるほど  그렇군요\n\n의미보다 타이밍이 중요하다.',
        '리액션은 정확한 설명보다 타이밍이 중요하다. 짧게 반응하면 상대가 대화를 계속 이어가기 쉽다.',
        'リアクションは意味だけでなくタイミングが大切です。短く反応しましょう。'),
      scene('practice', '속도 낮추기', imgCafe, '잠깐 멈추기',
        '대화가 빠르면 멈출 수 있어.\n\nちょっと待ってください\n잠깐만 기다려 주세요\n\nもう一度お願いします\n한 번 더 부탁해요\n\n초보자의 안전장치다.',
        '빠른 대화를 억지로 따라가려고 하지 말자. 잠깐 기다려 주세요, 한 번 더 부탁해요를 쓰면 속도를 다시 맞출 수 있다.',
        '会話が速い時は止めても大丈夫です。ちょっと待ってください、もう一度お願いしますを使いましょう。'),
      scene('summary', '입으로 자동화', imgCafe, '생각 전에 나오게',
        '리액션은 읽는 공부가 아니야.\n\n듣기\n따라 말하기\n눈 감고 말하기\n상황 떠올리기\n\n자동으로 나와야 실제로 쓴다.',
        '리액션 표현은 의미를 분석하기보다 입에서 자동으로 나오는 게 목표다. 짧게 듣고 바로 말하는 반복이 가장 효과적이다.',
        'リアクションは自動で出ることが目標です。短く聞いてすぐまねしましょう。')
    ],
    v3_konbini: [
      scene('practice', '결제 질문 듣기', imgConvenience, 'お支払いは？',
        '계산대에서 자주 듣는 말.\n\nお支払いは？  결제는요?\nカードです  카드예요\n現金です  현금이에요\nポイントカードはありますか  포인트 카드 있어요?',
        '편의점 결제는 빠르기 때문에 결제 수단 단어를 바로 꺼내야 한다. 카드, 현금, 포인트 카드 질문을 먼저 익히자.',
        'コンビニの会計は速いです。カード、現金、ポイントカードを聞き取れるようにしましょう。'),
      scene('practice', '거절 표현', imgConvenience, '大丈夫です',
        '필요 없으면 부드럽게 거절해.\n\n袋は大丈夫です\n봉투는 괜찮아요\n\nレシートは大丈夫です\n영수증은 괜찮아요\n\n大丈夫です 하나로 충분하다.',
        '편의점에서는 필요 없는 선택지를 많이 묻는다. 大丈夫です를 붙이면 짧고 자연스럽게 거절할 수 있다.',
        '必要ない時は大丈夫ですで自然に断れます。袋、レシートに使いましょう。'),
      scene('summary', '편의점 흐름', imgConvenience, '고르기 → 질문 → 결제',
        '편의점은 흐름이 빠르다.\n\n1. 물건 고르기\n2. 데울지, 봉투가 필요한지 답하기\n3. 카드/현금 말하기\n\n질문 단어만 잡으면 된다.',
        '편의점에서는 전체 문장을 다 듣기보다 温めますか, 袋, レシート, カード 같은 단어를 잡는 게 실전적이다.',
        'コンビニでは全部聞くより、温めますか、袋、レシート、カードなどの言葉を聞きましょう。')
    ],
    v3_restaurant: [
      scene('practice', '자리 안내', imgCounter, '何名様ですか',
        '입구에서 먼저 듣는 말.\n\n何名様ですか  몇 분이세요?\n一人です  한 명이에요\n禁煙席、お願いします  금연석 부탁해요\n\n자리부터 해결한다.',
        '식당 입구에서는 인원수와 좌석을 먼저 확인한다. 몇 명인지 짧게 답하고, 필요한 좌석이 있으면 お願いします를 붙이자.',
        'レストランでは人数と席を先に聞かれます。一人です、禁煙席お願いしますを使いましょう。'),
      scene('practice', '알레르기 말하기', imgIzakaya, '食べられません',
        '못 먹는 것이 있으면 짧게 말해.\n\nこれ、入っていますか\n이거 들어 있어요?\n\nえびは食べられません\n새우는 못 먹어요\n\nアレルギーがあります\n알레르기가 있어요',
        '음식 알레르기는 정확히 말해야 한다. 재료가 들어 있는지 묻고, 못 먹는 것을 짧게 말하는 표현을 준비하자.',
        'アレルギーは正確に伝えましょう。入っていますか、食べられませんを使います。'),
      scene('summary', '식당 마무리', imgCounter, 'お会計お願いします',
        '식사는 마지막까지 흐름이 있다.\n\nお水をください\n追加でお願いします\nお会計お願いします\n\n부탁과 계산만 알면\n혼자 식사가 가능하다.',
        '식당 회화는 주문하고, 필요한 것을 추가하고, 계산하는 흐름이다. 물 주세요, 추가 부탁해요, 계산 부탁해요를 묶어서 익히자.',
        '食事は注文、追加、会計の流れです。お水をください、追加でお願いします、お会計お願いします。')
    ],
    v3_shopping: [
      scene('practice', '색과 옵션', imgConvenience, '色違い',
        '색이나 옵션을 바꿔 묻자.\n\n他の色はありますか\n다른 색 있어요?\n\nこれの黒はありますか\n이거 검은색 있어요?\n\n在庫はありますか\n재고 있어요?',
        '쇼핑에서는 사이즈만큼 색과 재고 질문도 자주 나온다. 다른 색, 검은색, 재고를 물어보는 표현을 같이 익히자.',
        '買い物では色と在庫もよく聞きます。他の色、黒、在庫を覚えましょう。'),
      scene('practice', '계산 전 확인', imgConvenience, 'これにします',
        '결정했으면 짧게 말해.\n\nこれにします\n이걸로 할게요\n\nプレゼント用にできますか\n선물용 가능해요?\n\n袋をお願いします\n봉투 부탁해요',
        '쇼핑의 마지막은 선택, 포장, 봉투다. 이걸로 할게요를 먼저 말하면 결제 흐름으로 자연스럽게 넘어간다.',
        '買い物の最後は、選ぶ、包装、袋です。これにしますから始めましょう。'),
      scene('summary', '허락 질문', imgConvenience, 'てもいいですか',
        '쇼핑 질문은 허락 표현이 많아.\n\n見てもいいですか\n試着してもいいですか\n写真を撮ってもいいですか\n\n가능한지 먼저 묻는다.',
        '쇼핑에서는 마음대로 만지거나 입어보기보다 먼저 물어보는 편이 안전하다. てもいいですか를 통째로 익히자.',
        '買い物では先に許可を聞くと安心です。てもいいですかを使いましょう。')
    ],
    v3_hotel: [
      scene('practice', '예약 화면 보여주기', imgHotelFront, 'これです',
        '발음이 어려우면 예약 화면을 보여 줘.\n\n予約画面です\n예약 화면이에요\n\n名前はここです\n이름은 여기예요\n\nこれです\n이거예요',
        '호텔 이름이나 예약자 이름 발음이 어려우면 화면을 보여 주는 게 가장 정확하다. これです 한마디로 충분할 때가 많다.',
        '発音が難しい時は予約画面を見せましょう。これですで伝わります。'),
      scene('practice', '시설 질문', imgHotelFront, 'どこですか',
        '체크인 뒤에는 시설을 묻는다.\n\n朝食会場はどこですか\n조식 장소는 어디예요?\n\nエレベーターはどこですか\n엘리베이터는 어디예요?\n\n大浴場はありますか\n대욕장 있어요?',
        '숙소에서는 조식 장소, 엘리베이터, 대욕장 같은 시설 질문이 바로 필요하다. 어디예요와 있어요를 붙여 물어보자.',
        'ホテルでは朝食会場、エレベーター、大浴場をよく聞きます。どこですか、ありますかを使いましょう。'),
      scene('summary', '호텔 첫날 흐름', imgHotelFront, '예약 → 안내 → 질문',
        '호텔 첫날은 세 단계야.\n\n1. 예약 확인\n2. 여권·결제\n3. 조식·체크아웃 질문\n\n이름과 시간만 정확하면 된다.',
        '호텔 체크인은 정해진 흐름이라 겁낼 필요가 없다. 예약 확인 뒤 필요한 시간 정보만 챙기면 객실까지 자연스럽게 이어진다.',
        'ホテルのチェックインは流れが決まっています。予約確認、パスポート、時間の確認です。')
    ],
    v3_hotel_request: [
      scene('practice', '문제 말하기', imgHotelFront, '動きません',
        '고장이나 문제는 상태로 말해.\n\nWi-Fiがつながりません\n와이파이가 안 잡혀요\n\nお湯が出ません\n뜨거운 물이 안 나와요\n\n動きません\n작동하지 않아요',
        '객실 문제는 자세한 설명보다 어떤 것이 안 되는지 말하는 게 먼저다. 와이파이, 온수, 에어컨 같은 단어와 상태를 붙이자.',
        '部屋の問題は、何がどう悪いかを短く言いましょう。Wi-Fi、お湯、エアコンに使えます。'),
      scene('practice', '추가 요청', imgHotelFront, 'もう一枚',
        '추가 물건은 수량과 같이 말해.\n\nタオルをもう一枚お願いします\n수건 한 장 더 부탁해요\n\n水を二本お願いします\n물 두 병 부탁해요\n\n枕をお願いします\n베개 부탁해요',
        '호텔 요청은 물건 이름과 수량을 붙이면 정확하다. 수건 한 장 더, 물 두 병처럼 필요한 만큼을 같이 말하자.',
        'ホテルのお願いは物と数を一緒に言うと正確です。もう一枚、二本を使いましょう。'),
      scene('summary', '프런트 전달법', imgHotelFront, '짧고 정확하게',
        '프런트 요청은 세 가지 중 하나야.\n\n필요해요: ほしいです\n안 돼요: できません / 出ません\n부탁해요: お願いします\n\n전화가 어려우면 직접 보여 준다.',
        '객실 요청은 필요한 것, 안 되는 것, 부탁할 것을 짧게 나누면 된다. 전화가 어렵다면 프런트에 내려가 화면이나 메모를 보여 주자.',
        'フロントへのお願いは、欲しい物、できないこと、お願いを短く分けると伝わります。')
    ],
    v3_onsen: [
      scene('practice', '입욕 순서', imgRyokan, '先に洗います',
        '온천은 들어가기 전에 씻는다.\n\n先に体を洗います\n먼저 몸을 씻어요\n\n湯船に入ります\n탕에 들어가요\n\nタオルは入れません\n수건은 넣지 않아요',
        '온천 매너의 핵심은 먼저 씻고 탕에 들어가는 것이다. 수건을 탕에 넣지 않는 규칙도 같이 기억하자.',
        '温泉では先に体を洗ってから湯船に入ります。タオルは湯船に入れません。'),
      scene('practice', '직원에게 묻기', imgRyokan, '初めてです',
        '처음이면 바로 말해도 돼.\n\n初めてです\n처음이에요\n\nどうすればいいですか\n어떻게 하면 돼요?\n\n教えてください\n알려 주세요',
        '온천 규칙이 불안하면 초보라고 말하는 게 가장 빠르다. 직원은 보통 순서를 짧게 알려 준다.',
        '温泉が初めてなら、初めてです、教えてくださいと言えば大丈夫です。'),
      scene('summary', '온천 안전', imgRyokan, '무리하지 않기',
        '탕에는 오래 있지 않아도 돼.\n\n暑いです\n少し休みます\n水を飲みます\n\n몸이 불편하면 바로 나온다.',
        '온천은 매너만큼 안전도 중요하다. 더우면 쉬고, 물을 마시고, 어지러우면 바로 나오는 게 좋다.',
        '温泉では安全も大切です。暑い時は休んで、水を飲みましょう。')
    ],
    v3_health: [
      scene('practice', '증상 추가', imgClinic, '熱があります',
        '아픈 곳 말고 증상도 말해.\n\n熱があります\n열이 있어요\n\n咳が出ます\n기침이 나요\n\n気持ち悪いです\n속이 안 좋아요',
        '약국이나 병원에서는 아픈 부위와 증상을 같이 말하면 훨씬 정확하다. 열, 기침, 메스꺼움 표현을 준비하자.',
        '薬局や病院では、痛い場所と症状を一緒に言うと正確です。熱、咳、気持ち悪いを覚えましょう。'),
      scene('practice', '약 복용', imgClinic, '一日何回',
        '약을 받을 때는 복용법을 확인해.\n\n一日何回ですか\n하루 몇 번이에요?\n\n食後ですか\n식후예요?\n\n眠くなりますか\n졸려요?',
        '약을 받을 때는 먹는 횟수, 식전·식후, 졸림 여부가 중요하다. 복용법을 모르면 꼭 다시 물어보자.',
        '薬をもらう時は、回数、食後かどうか、眠くなるかを確認しましょう。'),
      scene('summary', '아플 때 흐름', imgClinic, '부위 → 증상 → 약',
        '건강 문제는 순서대로 말해.\n\n1. 어디가 아픈지\n2. 어떤 증상인지\n3. 약이나 병원 요청\n\n짧게 말할수록 정확하다.',
        '몸이 안 좋을 때는 당황해서 길게 설명하기 쉽다. 부위, 증상, 원하는 도움 순서로 짧게 말하면 된다.',
        '体調が悪い時は、場所、症状、必要な助けの順に短く伝えましょう。')
    ],
    v3_hospital: [
      scene('practice', '문진표', imgClinic, '書き方',
        '접수 뒤에는 문진표를 쓸 수 있어.\n\nここに書きますか\n여기에 쓰나요?\n\nわかりません\n모르겠어요\n\n翻訳アプリを使ってもいいですか\n번역 앱 써도 돼요?',
        '병원 문진표는 어려울 수 있다. 모르는 항목이 있으면 물어보고, 번역 앱을 써도 되는지 확인하자.',
        '病院の問診票は難しいことがあります。分からない時は聞いて、翻訳アプリも使いましょう。'),
      scene('practice', '진료 중', imgClinic, 'いつからですか',
        '의사가 물을 수 있는 말.\n\nいつからですか\n언제부터예요?\n\n昨日からです\n어제부터예요\n\n三日前からです\n3일 전부터예요',
        '진료 중에는 언제부터 아팠는지 자주 묻는다. 어제부터, 3일 전부터처럼 시작 시점을 말할 수 있어야 한다.',
        '診察では、いつからですかとよく聞かれます。昨日から、三日前からを練習しましょう。'),
      scene('summary', '서류 챙기기', imgClinic, '保険のために',
        '귀국 후 보험 청구를 생각해.\n\n領収書をお願いします\n영수증 부탁해요\n\n診断書はもらえますか\n진단서 받을 수 있어요?\n\n서류는 바로 챙긴다.',
        '여행자 보험이 있다면 병원에서 받은 영수증과 서류가 중요하다. 나중에 다시 받기 어려우니 현장에서 확인하자.',
        '旅行保険のために領収書や書類をその場で確認しましょう。')
    ],
    v3_lost_and_help: [
      scene('practice', '물건 설명', imgKoban, '色と形',
        '잃어버린 물건은 특징을 말해.\n\n黒いかばんです\n검은 가방이에요\n\n小さい財布です\n작은 지갑이에요\n\n中にパスポートがあります\n안에 여권이 있어요',
        '분실물은 물건 이름만으로 부족할 수 있다. 색, 크기, 안에 든 중요한 물건을 짧게 설명하자.',
        '落とし物は色、大きさ、中にある物を短く説明しましょう。'),
      scene('practice', '도움 받을 곳', imgKoban, '交番 / 案内所',
        '도움 받을 장소를 알아두자.\n\n交番はどこですか\n파출소는 어디예요?\n\n案内所はどこですか\n안내소는 어디예요?\n\n駅員さんに聞きます\n역무원에게 물어봐요',
        '문제가 생기면 아무에게나 길게 설명하기보다 파출소, 안내소, 역무원에게 연결되는 게 빠르다.',
        '困った時は交番、案内所、駅員さんに聞くと早いです。'),
      scene('summary', '침착한 순서', imgKoban, '잃어버림 대응',
        '당황했을 때 순서를 정해 둬.\n\n1. 무엇을 잃어버렸는지\n2. 어디였는지\n3. 연락처 남기기\n\n짧게 반복하면 된다.',
        '분실 상황에서는 같은 정보를 여러 번 말하게 된다. 물건, 장소, 연락처 순서를 정해 두면 덜 당황한다.',
        '落とし物では、物、場所、連絡先の順で伝えると落ち着いて話せます。')
    ],
    v3_rentacar: [
      scene('practice', '운전 전 확인', imgTrain, '傷があります',
        '차를 받기 전 상태를 확인해.\n\nここに傷があります\n여기에 흠집이 있어요\n\n写真を撮ってもいいですか\n사진 찍어도 돼요?\n\nガソリンは満タンですか\n기름은 가득인가요?',
        '렌트카는 출발 전 확인이 중요하다. 흠집, 사진, 연료 상태를 직원과 같이 확인하면 반납 때 분쟁을 줄일 수 있다.',
        'レンタカーは出発前の確認が大切です。傷、写真、ガソリンを確認しましょう。'),
      scene('practice', '사고 대응', imgTrain, '事故です',
        '사고나 문제가 생기면 짧게 말해.\n\n事故です\n사고예요\n\n車が動きません\n차가 움직이지 않아요\n\nどこに電話すればいいですか\n어디에 전화하면 돼요?',
        '렌트카 문제는 바로 연락하는 것이 중요하다. 사고, 차가 움직이지 않음, 연락처 확인 표현을 준비하자.',
        'レンタカーで困った時はすぐ連絡しましょう。事故です、車が動きませんを使います。'),
      scene('summary', '렌트카 핵심', imgTrain, '확인하고 기록하기',
        '렌트카는 기록이 안전장치야.\n\n예약 화면\n면허증\n보험\n차 상태 사진\n반납 시간\n\n말보다 확인 자료가 중요하다.',
        '렌트카는 회화 실력보다 확인 자료가 더 중요할 때가 많다. 화면, 서류, 사진을 남기며 짧게 확인하자.',
        'レンタカーでは会話だけでなく、画面、書類、写真で確認することが大切です。')
    ],
    v3_tourist_spot: [
      scene('practice', '사진 방향', imgSightseeing, '縦 / 横',
        '사진을 부탁한 뒤 방향도 말할 수 있어.\n\n縦でお願いします\n세로로 부탁해요\n\n横でお願いします\n가로로 부탁해요\n\nもう一枚お願いします\n한 장 더 부탁해요',
        '사진 부탁은 한 문장으로 끝나지 않을 때가 있다. 세로, 가로, 한 장 더 정도만 알아도 원하는 사진을 받을 가능성이 높아진다.',
        '写真を頼む時は、縦、横、もう一枚も使えると便利です。'),
      scene('practice', '금지 확인', imgSightseeing, '撮ってもいいですか',
        '관광지는 사진 규칙이 다르다.\n\nここで写真を撮ってもいいですか\n여기서 사진 찍어도 돼요?\n\nフラッシュは大丈夫ですか\n플래시는 괜찮아요?\n\n禁止ですか\n금지예요?',
        '관광지에서는 사진 가능 여부와 플래시 금지를 먼저 확인하는 게 안전하다. 규칙을 묻는 말은 짧아도 충분하다.',
        '観光地では写真とフラッシュのルールを先に確認しましょう。'),
      scene('summary', '관광지 대화', imgSightseeing, '부탁 → 확인 → 감사',
        '관광지에서는 이 흐름만 기억해.\n\nすみません\n写真をお願いします\n撮ってもいいですか\nありがとうございます\n\n짧고 예의 있게 끝낸다.',
        '관광지 대화는 부탁, 가능 여부 확인, 감사의 흐름이다. 짧게 말하고 웃으며 마무리하면 충분히 자연스럽다.',
        '観光地では、お願い、確認、お礼の流れを覚えましょう。')
    ],
    v3_reservation_call: [
      scene('practice', '전화 첫마디', imgMenuCheck, 'もしもし',
        '전화는 시작이 정해져 있어.\n\nもしもし\n여보세요\n\n予約したいです\n예약하고 싶어요\n\n韓国語はありますか\n한국어 가능해요?\n\n천천히 시작한다.',
        '전화 예약은 긴장되지만 첫마디는 정해져 있다. 여보세요, 예약하고 싶어요를 천천히 말하고 이름과 시간을 이어가면 된다.',
        '電話予約は、もしもし、予約したいですから始めましょう。'),
      scene('practice', '시간 확인', imgMenuCheck, '何時が空いていますか',
        '원하는 시간이 안 될 수 있어.\n\n何時が空いていますか\n몇 시가 비어요?\n\n7時は大丈夫ですか\n7시는 괜찮아요?\n\n少し遅れます\n조금 늦어요',
        '예약에서는 원하는 시간이 안 될 때 대안을 물어보는 표현이 필요하다. 몇 시가 비는지, 조금 늦는지도 말할 수 있어야 한다.',
        '予約では空いている時間を聞くことが大切です。何時が空いていますかを使いましょう。'),
      scene('summary', '예약 정보 4개', imgMenuCheck, '이름·날짜·시간·인원',
        '예약은 정보 네 개가 핵심.\n\n名前\n日にち\n時間\n人数\n\n이 네 개만 정확하면\n대부분의 예약이 진행된다.',
        '예약 대화는 복잡해 보여도 이름, 날짜, 시간, 인원 네 가지 정보로 정리된다. 이 순서로 준비하면 덜 막힌다.',
        '予約は名前、日にち、時間、人数の四つが中心です。この順番で準備しましょう。')
    ],
    v3_weather_plan: [
      scene('practice', '날씨 단어', imgCalendar, '雨 / 台風',
        '일정 변경 이유는 날씨 단어로 짧게.\n\n雨です  비예요\n雪です  눈이에요\n台風です  태풍이에요\n暑すぎます  너무 더워요\n\n이유가 있으면 부탁이 자연스럽다.',
        '날씨 때문에 일정을 바꿀 때는 이유를 먼저 말하면 상대가 이해하기 쉽다. 비, 눈, 태풍, 너무 더움 같은 단어를 준비하자.',
        '予定変更では理由を先に言うと伝わりやすいです。雨、雪、台風、暑すぎますを覚えましょう。'),
      scene('practice', '대체 일정', imgCalendar, '代わりに',
        '대안을 물어보면 대화가 부드러워.\n\n代わりに何ができますか\n대신 뭘 할 수 있어요?\n\n屋内の場所はありますか\n실내 장소 있어요?\n\n明日はどうですか\n내일은 어때요?',
        '날씨로 일정이 막히면 대안을 묻는 것이 좋다. 실내 장소, 내일 가능 여부처럼 선택지를 넓혀 보자.',
        '天気で予定が変わる時は、代わりの案を聞きましょう。屋内、明日などを使います。'),
      scene('summary', '변경 요청 순서', imgCalendar, '이유 → 부탁 → 확인',
        '일정 변경은 순서가 중요해.\n\n1. 雨です\n2. 明日に変えてもいいですか\n3. 大丈夫ですか\n\n짧게 이유를 말하고 허락을 묻는다.',
        '일정 변경은 이유, 부탁, 확인 순서로 말하면 자연스럽다. 길게 사과하기보다 정확한 정보가 먼저다.',
        '予定変更は、理由、お願い、確認の順で言うと自然です。')
    ],
    v3_polite_wrapup: [
      scene('practice', '가게 나갈 때', imgArigatou, 'ごちそうさまでした',
        '장면별 마무리 말을 붙이자.\n\nごちそうさまでした\n잘 먹었습니다\n\nありがとうございました\n감사했습니다\n\n失礼します\n실례합니다',
        '마무리 인사는 장면별로 짧게 다르다. 식당에서는 잘 먹었습니다, 도움을 받았을 때는 감사했습니다가 자연스럽다.',
        '場面ごとの締めの言葉を覚えましょう。ごちそうさまでした、ありがとうございました、失礼します。'),
      scene('practice', '칭찬 한 줄', imgArigatou, 'よかったです',
        '좋았던 점은 한 줄이면 충분해.\n\nおいしかったです\n맛있었어요\n\n楽しかったです\n즐거웠어요\n\nとてもよかったです\n정말 좋았어요',
        '칭찬은 길게 설명하지 않아도 된다. 맛있었어요, 즐거웠어요, 좋았어요 같은 짧은 과거형이 자연스럽다.',
        'ほめる時は短い過去形で大丈夫です。おいしかったです、楽しかったです、よかったです。'),
      scene('summary', '정중함의 기준', imgArigatou, '짧게 + 고개 숙이기',
        '정중함은 문장 길이가 아니야.\n\n짧은 말\n천천히 말하기\n눈 맞추기\n가볍게 고개 숙이기\n\n태도까지 같이 전달한다.',
        '초보자는 복잡한 경어보다 짧고 분명한 말, 천천히 말하는 태도, 감사 표현이 더 안전하다.',
        '丁寧さは長い文だけではありません。短く、ゆっくり、お礼を伝えましょう。')
    ],
    v3_drama_reactions: [
      scene('practice', '놀람 표현', imgArigatou, 'えっ / うそ',
        '놀랄 때 나오는 짧은 말.\n\nえっ  어?\nうそ  말도 안 돼\nほんと？  진짜?\nやばい  대박 / 큰일\n\n표정보다 먼저 귀에 걸린다.',
        '드라마 반응어는 감정을 먼저 알려 준다. 뜻을 하나로 고정하지 말고 장면과 톤을 같이 들어야 한다.',
        'ドラマの反応語は気持ちを先に伝えます。場面とトーンを一緒に聞きましょう。'),
      scene('practice', '동의 표현', imgArigatou, 'そうだね',
        '상대 말에 맞장구칠 때.\n\nそうだね  그러네\nたしかに  확실히\nわかる  알 것 같아\nいいね  좋네\n\n친구 말투에서는 짧게 나온다.',
        '드라마 친구 대화에서는 정중한 문장보다 짧은 동의 표현이 많다. そうだね, たしかに를 먼저 잡아 보자.',
        '友だち同士のドラマ会話では、そうだね、たしかに、わかるをよく聞きます。'),
      scene('summary', '반응어 듣기법', imgArigatou, '단어보다 감정',
        '드라마 초반 듣기는\n뜻보다 감정 흐름을 먼저 잡아.\n\n놀람\n동의\n거절\n걱정\n\n반응어가 장면의 방향을 알려 준다.',
        '드라마를 처음 들을 때는 모든 문장을 번역하려고 하지 말자. 반응어가 감정과 관계의 방향을 먼저 알려 준다.',
        'ドラマを聞く時は全部訳そうとせず、反応語で気持ちの流れをつかみましょう。')
    ],
    v3_drama_emotion: [
      scene('practice', '감정 이유', imgArigatou, 'どうして？',
        '감정을 들으면 이유가 이어질 수 있어.\n\nどうして？  왜?\n何があったの？  무슨 일 있었어?\n大丈夫？  괜찮아?\n\n감정 다음 질문을 준비한다.',
        '드라마에서는 감정 표현 뒤에 이유를 묻는 말이 자주 이어진다. 왜, 무슨 일 있었어, 괜찮아를 같이 들어 보자.',
        'ドラマでは気持ちのあとに理由を聞く言葉が続きます。どうして、何があったの、大丈夫を聞きましょう。'),
      scene('practice', '강한 감정', imgArigatou, 'びっくりした',
        '강한 감정은 짧게 튀어나와.\n\nびっくりした  깜짝 놀랐어\n信じられない  믿을 수 없어\nうれしい  기뻐\nつらい  힘들어\n\n톤이 뜻을 크게 바꾼다.',
        '감정 표현은 사전 뜻보다 톤과 표정이 중요하다. 같은 단어라도 낮게 말하면 걱정, 높게 말하면 놀람이 될 수 있다.',
        '気持ちの言葉はトーンと表情が大切です。同じ言葉でも聞こえ方が変わります。'),
      scene('summary', '드라마 감정 듣기', imgArigatou, '표정 + 말',
        '감정 표현은 화면과 같이 들어.\n\n표정\n숨소리\n말끝\n반응어\n\n자막 전에 장면이 먼저 이해된다.',
        '드라마 듣기는 귀만 쓰는 공부가 아니다. 표정, 숨소리, 말끝을 같이 보면 짧은 감정 표현이 더 잘 들린다.',
        'ドラマは耳だけでなく、表情、息、語尾も一緒に見ると気持ちが分かりやすいです。')
    ],
    v3_drama_daily: [
      scene('practice', '줄어든 말', imgCafe, '何してる？',
        '일상 대사는 자주 줄어든다.\n\n何してる？\n뭐 해?\n\nどこ行くの？\n어디 가?\n\nもういい\n이제 됐어\n\n끝이 짧게 떨어진다.',
        '드라마 일상 대화는 정중체보다 짧은 친구 말투가 많다. 줄어든 말투를 알아보면 자막 없이도 관계가 보인다.',
        '日常ドラマでは短い友だち言葉が多いです。何してる、どこ行くのを聞きましょう。'),
      scene('practice', '생활 동사', imgCafe, '行く / 来る / 見る',
        '일상 대사는 쉬운 동사가 반복돼.\n\n行く  가다\n来る  오다\n見る  보다\n食べる  먹다\n帰る  돌아가다\n\n쉬운 동사가 빠르게 들린다.',
        '드라마가 어렵게 느껴져도 실제로는 쉬운 동사가 자주 반복된다. 가다, 오다, 보다, 먹다, 돌아가다를 먼저 귀에 붙이자.',
        'ドラマでは基本動詞がよく出ます。行く、来る、見る、食べる、帰るを聞きましょう。'),
      scene('summary', '첫 귀 트기 목표', imgCafe, '전부 말고 덩어리',
        '첫 목표는 전체 번역이 아니야.\n\n짧은 질문\n감정 반응\n생활 동사\n말끝 톤\n\n네 덩어리만 잡아도 장면을 따라간다.',
        '드라마 첫 듣기의 목표는 전체 번역이 아니라 장면을 놓치지 않는 것이다. 질문, 반응, 동사, 톤을 덩어리로 잡자.',
        'ドラマを最初に聞く目標は全部訳すことではありません。質問、反応、動詞、トーンをつかみましょう。')
    ],
  };

  Object.entries(supplements).forEach(([key, slides]) => {
    const lecture = window.LECTURE_DATA[key];
    if (!Array.isArray(lecture) || lecture.length >= 5) return;
    lecture.push(...slides.slice(0, 5 - lecture.length));
  });
})();
