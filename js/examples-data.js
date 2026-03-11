// ============================================================
//  KANA MASTER - 가나 문장 예시 데이터베이스
//  별도 파일로 관리 — 직접 수정·업로드하여 업데이트 가능
// ============================================================
//
//  형식:
//  EXAMPLES_DB['가나문자'] = {
//    sentences: [
//      { japanese: '일본어 문장', meaning: '한국어 뜻' },
//      ...
//    ]
//  }
//
//  앱에서는 sentences 중 무작위로 2개를 선택해 플래시카드 뒷면에 표시합니다.
// ============================================================

const EXAMPLES_DB = {

  // ══════════════════════════════════════════
  //  히라가나 기본 (あ단~ん)
  // ══════════════════════════════════════════

  'あ': { sentences: [
    { japanese: 'あそこに バス停が あります。', meaning: '저기에 버스 정류장이 있습니다.' },
    { japanese: 'あの えいがは とても おもしろかった。', meaning: '저 영화는 정말 재미있었어요.' },
    { japanese: 'あさ 6時に おきます。', meaning: '아침 6시에 일어납니다.' },
    { japanese: 'あ、わすれた！', meaning: '아, 잊어버렸어!' },
    { japanese: 'あした、ひま？', meaning: '내일 시간 있어?' },
    { japanese: 'あのさ、これやってくれる？', meaning: '저기, 이거 좀 해줄래?' },
    { japanese: 'ああ、びっくりした！', meaning: '아, 깜짝이야!' },
    { japanese: 'あついね、アイス食べたいな。', meaning: '덥다, 아이스크림 먹고 싶네.' }
  ]},

  'い': { sentences: [
    { japanese: 'いえに かえって シャワーを あびます。', meaning: '집에 돌아가서 샤워를 합니다.' },
    { japanese: 'いま なんじ ですか？', meaning: '지금 몇 시입니까?' },
    { japanese: 'いいえ、ちがいます。', meaning: '아니요, 다릅니다.' },
    { japanese: 'いちばん すきな たべものは なんですか？', meaning: '가장 좋아하는 음식은 무엇입니까?' },
    { japanese: 'いくら？これ、いくら？', meaning: '얼마? 이거 얼마야?' },
    { japanese: 'いつも ありがとうね！', meaning: '항상 고마워!' },
    { japanese: 'いいから、はやく来て！', meaning: '됐고, 빨리 와!' },
    { japanese: 'いえ、ぜんぜん！', meaning: '아니, 전혀!' }
  ]},

  'う': { sentences: [
    { japanese: 'うみで およと たのしかった。', meaning: '바다에서 수영해서 즐거웠어요.' },
    { japanese: 'うたを うたいながら あるきます。', meaning: '노래를 부르면서 걷습니다.' },
    { japanese: 'うわ、すごい けしきだ！', meaning: '와, 멋진 경치다!' },
    { japanese: 'うちに あそびに きて ください。', meaning: '우리 집에 놀러 오세요.' },
    { japanese: 'うん、わかった！', meaning: '응, 알았어!' },
    { japanese: 'うそでしょ？！', meaning: '거짓말이지?!' },
    { japanese: 'うしろに 気をつけてね。', meaning: '뒤 조심해.' },
    { japanese: 'うれしいなぁ、ありがとう！', meaning: '기쁘다, 고마워!' }
  ]},

  'え': { sentences: [
    { japanese: 'えきまで どうやって いきますか？', meaning: '역까지 어떻게 갑니까?' },
    { japanese: 'えいごで はなせますか？', meaning: '영어로 말할 수 있나요?' },
    { japanese: 'えを かくのが すきです。', meaning: '그림 그리는 것을 좋아합니다.' },
    { japanese: 'え、ほんとうですか？', meaning: '어, 정말입니까?' },
    { japanese: 'えっとね、たぶん…', meaning: '음, 아마도…' },
    { japanese: 'え？マジで？', meaning: '응? 진짜로?' },
    { japanese: 'えらんでいいよ。', meaning: '골라도 돼.' },
    { japanese: 'えがおが すてきだね。', meaning: '웃는 얼굴이 멋지네.' }
  ]},

  'お': { sentences: [
    { japanese: 'おちゃを いっぱい いかがですか？', meaning: '차 한 잔 어떠세요?' },
    { japanese: 'おはよう ございます。きょうも がんばりましょう。', meaning: '안녕하세요. 오늘도 힘냅시다.' },
    { japanese: 'おかあさんに でんわを します。', meaning: '어머니께 전화를 합니다.' },
    { japanese: 'おつかれさまでした。', meaning: '수고하셨습니다.' },
    { japanese: 'おなかすいた！', meaning: '배고파!' },
    { japanese: 'おつかれ！ゆっくり休んでね。', meaning: '수고했어! 푹 쉬어.' },
    { japanese: 'おもしろい 話ししてよ！', meaning: '재밌는 이야기 해줘!' },
    { japanese: 'おっと、危ない！', meaning: '아차, 위험해!' }
  ]},

  'か': { sentences: [
    { japanese: 'かれは まいにち かいしゃへ いきます。', meaning: '그는 매일 회사에 갑니다.' },
    { japanese: 'かばんを なくして こまっています。', meaning: '가방을 잃어버려 곤란합니다.' },
    { japanese: 'かようびに あいましょう。', meaning: '화요일에 만납시다.' },
    { japanese: 'かわいい ねこが いますね。', meaning: '귀여운 고양이가 있네요.' },
    { japanese: 'かれって、まじめだよね。', meaning: '그 애, 성실하지.' },
    { japanese: 'かいもの、つきあってくれる？', meaning: '쇼핑, 같이 가줄래?' },
    { japanese: 'かみがた、変えた？', meaning: '헤어스타일 바꿨어?' },
    { japanese: 'かわいい！どこで 買ったの？', meaning: '귀여워! 어디서 샀어?' }
  ]},

  'き': { sentences: [
    { japanese: 'きょうは てんきが いいですね。', meaning: '오늘은 날씨가 좋네요.' },
    { japanese: 'きって10まいを ください。', meaning: '우표 10장 주세요.' },
    { japanese: 'きみが すきだよ。', meaning: '너를 좋아해.' },
    { japanese: 'きいろい はなが さいています。', meaning: '노란 꽃이 피어 있습니다.' },
    { japanese: 'きょう、何する？', meaning: '오늘 뭐 해?' },
    { japanese: 'きらいな ものある？', meaning: '싫어하는 거 있어?' },
    { japanese: 'きのう、楽しかったよ！', meaning: '어제 즐거웠어!' },
    { japanese: 'きみは 最高だよ！', meaning: '너는 최고야!' }
  ]},

  'く': { sentences: [
    { japanese: 'くるまで いきますか、でんしゃで いきますか？', meaning: '차로 갑니까, 전철로 갑니까?' },
    { japanese: 'くだものを たくさん たべます。', meaning: '과일을 많이 먹습니다.' },
    { japanese: 'くつを はいて ください。', meaning: '신발을 신어 주세요.' },
    { japanese: 'くうきが きれいですね。', meaning: '공기가 맑네요.' },
    { japanese: 'くつろいでいってね。', meaning: '편히 쉬다가 가.' },
    { japanese: 'くさい！誰かおならした？', meaning: '냄새나! 누가 방귀 뀌었어?' },
    { japanese: 'くすり、飲んだ？', meaning: '약, 먹었어?' },
    { japanese: 'くうき、入れ替えない？', meaning: '공기 좀 갈아 넣을까?' }
  ]},

  'け': { sentences: [
    { japanese: 'けがを しないように きを つけて ください。', meaning: '다치지 않도록 조심해 주세요.' },
    { japanese: 'けっこんしきは らいねんです。', meaning: '결혼식은 내년입니다.' },
    { japanese: 'けいたいを わすれました。', meaning: '핸드폰을 잊었습니다.' },
    { japanese: 'けっこうです。ありがとう。', meaning: '됐어요. 감사합니다.' },
    { japanese: 'けっこう 疲れたな。', meaning: '꽤 피곤하네.' },
    { japanese: 'けーたい、どこ置いたっけ？', meaning: '핸드폰, 어디 뒀더라?' },
    { japanese: 'けーき、半分こしよ！', meaning: '케이크, 반씩 나눠 먹자!' },
    { japanese: 'けっか、どうだった？', meaning: '결과, 어땠어?' }
  ]},

  'こ': { sentences: [
    { japanese: 'ここは どこですか？', meaning: '여기는 어디입니까?' },
    { japanese: 'こどもたちが こうえんで あそんでいます。', meaning: '아이들이 공원에서 놀고 있습니다.' },
    { japanese: 'これは いくらですか？', meaning: '이것은 얼마입니까?' },
    { japanese: 'こんにちは！おげんきですか？', meaning: '안녕하세요! 잘 지내시나요?' },
    { japanese: 'ここ、座っていい？', meaning: '여기 앉아도 돼?' },
    { japanese: 'これ、おいしいよ！', meaning: '이거, 맛있어!' },
    { japanese: 'こどもみたいだね！', meaning: '어린애 같네!' },
    { japanese: 'こんにちは！元気だった？', meaning: '안녕! 잘 지냈어?' }
  ]},

  'さ': { sentences: [
    { japanese: 'さくらが きれいに さいています。', meaning: '벚꽃이 예쁘게 피어 있습니다.' },
    { japanese: 'さいふを なくして こまっています。', meaning: '지갑을 잃어버려 곤란합니다.' },
    { japanese: 'さあ、はじめましょう！', meaning: '자, 시작합시다!' },
    { japanese: 'さいきん にほんごが うまくなりました。', meaning: '최근 일본어가 늘었습니다.' },
    { japanese: 'さむい！何か羽織るものない？', meaning: '추워! 뭐 걸칠 거 없어?' },
    { japanese: 'さいこうだね！', meaning: '최고다!' },
    { japanese: 'さすがだね！', meaning: '역시 너답네!' },
    { japanese: 'さきに 行ってていいよ。', meaning: '먼저 가 있어도 돼.' }
  ]},

  'し': { sentences: [
    { japanese: 'しごとは なんですか？', meaning: '직업은 무엇입니까?' },
    { japanese: 'しずかに して ください。', meaning: '조용히 해주세요.' },
    { japanese: 'しゃしんを とっても いいですか？', meaning: '사진 찍어도 됩니까?' },
    { japanese: 'しんかんせんで きょうとへ いきます。', meaning: '신칸센으로 교토에 갑니다.' },
    { japanese: 'しあわせだね。', meaning: '행복하다.' },
    { japanese: 'しんぱいしないで、大丈夫。', meaning: '걱정 마, 괜찮아.' },
    { japanese: 'しつこいなぁ！', meaning: '끈질기네!' },
    { japanese: 'しんじてるよ。', meaning: '믿고 있어.' }
  ]},

  'す': { sentences: [
    { japanese: 'すしが だいすきです。', meaning: '초밥을 매우 좋아합니다.' },
    { japanese: 'すみません、トイレは どこですか？', meaning: '실례합니다, 화장실은 어디입니까?' },
    { japanese: 'すぐ もどりますので、まって ください。', meaning: '금방 돌아오니 기다려 주세요.' },
    { japanese: 'すてきな いえですね。', meaning: '멋진 집이네요.' },
    { japanese: 'すごいね！どうやったの？', meaning: '대단하다! 어떻게 했어?' },
    { japanese: 'すまないけど、手伝ってくれる？', meaning: '미안한데, 도와줄래?' },
    { japanese: 'すぐ行くから、待ってて！', meaning: '금방 갈게, 기다려줘!' },
    { japanese: 'すっきりした！', meaning: '개운하다!' }
  ]},

  'せ': { sentences: [
    { japanese: 'せんせいに しつもんを します。', meaning: '선생님께 질문을 합니다.' },
    { japanese: 'せかいじゅうを りょこう したいです。', meaning: '전 세계를 여행하고 싶습니다.' },
    { japanese: 'せんたくを するのを わすれました。', meaning: '빨래 하는 것을 잊었습니다.' },
    { japanese: 'せんしゅうは いそがしかったです。', meaning: '지난주는 바빴습니다.' },
    { japanese: 'せんせー、これ教えて！', meaning: '선생님, 이거 가르쳐줘!' },
    { japanese: 'せっかくだから、行ってみない？', meaning: '모처럼인데, 가보지 않을래?' },
    { japanese: 'ぜんぶ 食べちゃった！', meaning: '다 먹어버렸어!' },
    { japanese: 'せーの！で 始めよう！', meaning: '하나, 둘, 셋! 하고 시작하자!' }
  ]},

  'そ': { sentences: [
    { japanese: 'そこに すわって ください。', meaning: '거기에 앉아주세요.' },
    { japanese: 'それは なんですか？', meaning: '그것은 무엇입니까?' },
    { japanese: 'そうですか。わかりました。', meaning: '그렇군요. 알겠습니다.' },
    { japanese: 'そとは さむいですね。', meaning: '밖은 춥네요.' },
    { japanese: 'そっちの方がいいな。', meaning: '그쪽이 더 좋겠다.' },
    { japanese: 'それは そうと、元気？', meaning: '그건 그렇고, 잘 지내?' },
    { japanese: 'そうそう、それだよ！', meaning: '맞아 맞아, 그거야!' },
    { japanese: 'そっか、わかった。', meaning: '그렇구나, 알았어.' }
  ]},

  'た': { sentences: [
    { japanese: 'たべものが おいしかった！', meaning: '음식이 맛있었어요!' },
    { japanese: 'たのしい りょこうに なりましたね。', meaning: '즐거운 여행이 되었네요.' },
    { japanese: 'たくさん べんきょうして つかれました。', meaning: '많이 공부해서 피곤합니다.' },
    { japanese: 'たいようが まぶしいですね。', meaning: '태양이 눈부시네요.' },
    { japanese: 'ただいま！', meaning: '다녀왔습니다!' },
    { japanese: 'たいへんだったね。', meaning: '힘들었겠다.' },
    { japanese: 'たのしみだね！', meaning: '기대된다!' },
    { japanese: 'たべすぎたー！', meaning: '너무 많이 먹었다!' }
  ]},

  'ち': { sentences: [
    { japanese: 'ちかてつで えきまで いきます。', meaning: '지하철로 역까지 갑니다.' },
    { japanese: 'ちょっと まって ください。', meaning: '잠깐 기다려 주세요.' },
    { japanese: 'ちがいます。これです。', meaning: '다릅니다. 이것입니다.' },
    { japanese: 'ちずを みながら あるきました。', meaning: '지도를 보면서 걸었습니다.' },
    { japanese: 'ちがうよ！', meaning: '아니야!' },
    { japanese: 'ちょっと 待ってて。', meaning: '잠깐 기다려.' },
    { japanese: 'ちかくに お店ある？', meaning: '근처에 가게 있어?' },
    { japanese: 'ちっちゃくて かわいい！', meaning: '작고 귀여워!' }
  ]},

  'つ': { sentences: [
    { japanese: 'つぎの でんしゃは なんじですか？', meaning: '다음 전철은 몇 시입니까?' },
    { japanese: 'つかれたので、すこし やすみます。', meaning: '피곤해서 조금 쉽니다.' },
    { japanese: 'つくえの うえに ほんが あります。', meaning: '책상 위에 책이 있습니다.' },
    { japanese: 'つめたい みずを ください。', meaning: '차가운 물을 주세요.' },
    { japanese: 'つぎは 君の番だよ。', meaning: '다음은 네 차례야.' },
    { japanese: 'つかれちゃった。', meaning: '지쳐버렸어.' },
    { japanese: 'つくったの？すごい！', meaning: '네가 만들었어? 대단하다!' },
    { japanese: 'つまらないなー。', meaning: '시시하네.' }
  ]},

  'て': { sentences: [
    { japanese: 'てを よく あらって ください。', meaning: '손을 잘 씻어주세요.' },
    { japanese: 'てんきが いいので、さんぽを します。', meaning: '날씨가 좋아서 산책을 합니다.' },
    { japanese: 'てがみを かいて おくります。', meaning: '편지를 써서 보냅니다.' },
    { japanese: 'てっぱんやきが たべたいです。', meaning: '철판구이를 먹고 싶습니다.' },
    { japanese: 'てきとうで いいよ。', meaning: '대충 해도 돼.' },
    { japanese: 'テスト、どうだった？', meaning: '시험, 어땠어?' },
    { japanese: 'てつだってくれて、ありがとう。', meaning: '도와줘서 고마워.' },
    { japanese: 'てんぷら、食べたい！', meaning: '튀김, 먹고 싶어!' }
  ]},

  'と': { sentences: [
    { japanese: 'ともだちと えいがを みに いきます。', meaning: '친구와 영화를 보러 갑니다.' },
    { japanese: 'とても きれいな けしきですね。', meaning: '정말 아름다운 경치네요.' },
    { japanese: 'ときどき ひとりで りょこう します。', meaning: '때때로 혼자 여행합니다.' },
    { japanese: 'とうきょうに いったことが ありますか？', meaning: '도쿄에 간 적이 있습니까?' },
    { japanese: 'とにかく、やってみよう！', meaning: '어쨌든, 해보자!' },
    { japanese: 'トイレ、どこ？', meaning: '화장실, 어디야?' },
    { japanese: 'とけい、見てみて。', meaning: '시계, 봐봐.' },
    { japanese: 'とんだ ハプニングだね。', meaning: '엄청난 해프닝이네.' }
  ]},

  'な': { sentences: [
    { japanese: 'なまえと でんわばんごうを おしえて ください。', meaning: '이름과 전화번호를 알려주세요.' },
    { japanese: 'なにを たべますか？おすすめは なんですか？', meaning: '무엇을 드실 건가요? 추천이 뭔가요?' },
    { japanese: 'なつやすみに かいがいへ いきたいです。', meaning: '여름방학에 해외에 가고 싶습니다.' },
    { japanese: 'なにか おてつだいしましょうか？', meaning: '뭔가 도와드릴까요?' },
    { japanese: 'なにしてるの？', meaning: '뭐하고 있어?' },
    { japanese: 'なんとか なるよ！', meaning: '어떻게든 될 거야!' },
    { japanese: 'なつかしいね。', meaning: '그립네.' },
    { japanese: 'なんか、いい感じ！', meaning: '왠지, 좋은 느낌!' }
  ]},

  'に': { sentences: [
    { japanese: 'にほんに きて 3ねんに なります。', meaning: '일본에 온 지 3년이 됩니다.' },
    { japanese: 'にわに きれいな はなが さいています。', meaning: '정원에 예쁜 꽃이 피어 있습니다.' },
    { japanese: 'にちようびには かぞくと すごします。', meaning: '일요일에는 가족과 함께 지냅니다.' },
    { japanese: 'にもつを おくって ください。', meaning: '짐을 보내주세요.' },
    { japanese: 'にもつ、重い？', meaning: '짐, 무거워?' },
    { japanese: 'にらめっこしよ！', meaning: '눈싸움하자!' },
    { japanese: 'にほんご、上手になったね！', meaning: '일본어, 잘하게 됐네!' },
    { japanese: 'にがてなんだよね。', meaning: '잘 못 해.' }
  ]},

  'ぬ': { sentences: [
    { japanese: 'ぬいぐるみを プレゼントに もらいました。', meaning: '봉제 인형을 선물로 받았습니다.' },
    { japanese: 'ぬれた ものを かわかします。', meaning: '젖은 것을 말립니다.' },
    { japanese: 'ぬいぐるみが ほしいな。', meaning: '인형 갖고 싶다.' },
    { japanese: 'ぬるい お茶は嫌い。', meaning: '미지근한 차는 싫어.' }
  ]},

  'ね': { sentences: [
    { japanese: 'ねこが そとで ないています。', meaning: '고양이가 밖에서 울고 있습니다.' },
    { japanese: 'ねむいので、はやく ねます。', meaning: '졸리니 일찍 자겠습니다.' },
    { japanese: 'ねだんを おしえて ください。', meaning: '가격을 알려주세요.' },
    { japanese: 'ねんまつに かぞくと あいます。', meaning: '연말에 가족과 만납니다.' },
    { japanese: 'ねえねえ、聞いてよ！', meaning: '저기 저기, 들어봐!' },
    { japanese: 'ねるまえに 歯磨きしなきゃ。', meaning: '자기 전에 양치해야 해.' },
    { japanese: 'ねこ、飼ってるんだ。', meaning: '고양이, 키우고 있어.' },
    { japanese: 'ねだん、いくらだった？', meaning: '가격, 얼마였어?' }
  ]},

  'の': { sentences: [
    { japanese: 'これは わたしの かばんです。', meaning: '이것은 내 가방입니다.' },
    { japanese: 'どのみちが いちばん ちかいですか？', meaning: '어느 길이 가장 가깝습니까?' },
    { japanese: 'のみものは なにが いいですか？', meaning: '마실 것은 무엇이 좋으세요?' },
    { japanese: 'のんびりと したいです。', meaning: '느긋하게 있고 싶습니다.' },
    { japanese: 'のどかわいたー！', meaning: '목 마르다!' },
    { japanese: 'のんびりしようよ。', meaning: '느긋하게 쉬자.' },
    { japanese: 'のりこえるしかないね。', meaning: '극복할 수밖에 없네.' },
    { japanese: 'のむ？', meaning: '마실래?' }
  ]},

  'は': { sentences: [
    { japanese: 'わたしは にほんごを べんきょうしています。', meaning: '나는 일본어를 공부하고 있습니다.' },
    { japanese: 'きょうは あめが ふっています。', meaning: '오늘은 비가 내리고 있습니다.' },
    { japanese: 'はなびが とても きれいでした。', meaning: '불꽃놀이가 정말 예뻤습니다.' },
    { japanese: 'はじめて にほんへ きました。', meaning: '처음으로 일본에 왔습니다.' },
    { japanese: 'はやく 来てよー！', meaning: '빨리 와줘!' },
    { japanese: 'はなれてるけど、元気？', meaning: '떨어져 있지만, 잘 지내?' },
    { japanese: 'はずかしいな。', meaning: '부끄럽다.' },
    { japanese: 'はやく 終わらせたい！', meaning: '빨리 끝내고 싶다!' }
  ]},

  'ひ': { sentences: [
    { japanese: 'ひこうきで にほんへ いきます。', meaning: '비행기로 일본에 갑니다.' },
    { japanese: 'ひるごはんに ランチを たべました。', meaning: '점심에 런치를 먹었습니다.' },
    { japanese: 'ひだりに まがって ください。', meaning: '왼쪽으로 돌아주세요.' },
    { japanese: 'ひとりで りょこうするのが すきです。', meaning: '혼자 여행하는 것을 좋아합니다.' },
    { japanese: 'ひみつだよ。', meaning: '비밀이야.' },
    { japanese: 'ひまだから、何か見ようかな。', meaning: '심심하니까, 뭐 볼까.' },
    { japanese: 'ひるごはん、何食べた？', meaning: '점심, 뭐 먹었어?' },
    { japanese: 'ひどいこと 言わないで！', meaning: '심한 말 하지 마!' }
  ]},

  'ふ': { sentences: [
    { japanese: 'ふゆは とても さむいですね。', meaning: '겨울은 정말 춥네요.' },
    { japanese: 'ふじさんが みえますか？', meaning: '후지산이 보입니까?' },
    { japanese: 'ふつうの へやを おねがいします。', meaning: '일반 방을 부탁합니다.' },
    { japanese: 'ふろに はいって ゆっくり します。', meaning: '목욕을 하고 천천히 쉽니다.' },
    { japanese: 'ふく、着替えないと。', meaning: '옷, 갈아입어야 해.' },
    { japanese: 'ふざけないでよ！', meaning: '장난치지 마!' },
    { japanese: 'ふゆは こたつが 最高！', meaning: '겨울은 코타츠가 최고!' },
    { japanese: 'ふとん、干しといたよ。', meaning: '이불, 말려뒀어.' }
  ]},

  'へ': { sentences: [
    { japanese: 'がっこうへ いきます。', meaning: '학교에 갑니다.' },
    { japanese: 'へやを かたづけて ください。', meaning: '방을 정리해주세요.' },
    { japanese: 'えきへの みちを おしえて ください。', meaning: '역으로 가는 길을 알려주세요.' },
    { japanese: 'へんなの！', meaning: '이상해!' },
    { japanese: 'へや、きれいにしたよ。', meaning: '방, 깨끗하게 치웠어.' },
    { japanese: 'へー、そうなんだ！', meaning: '헤에, 그렇구나!' },
    { japanese: 'へこたれないでね。', meaning: '풀죽지 마.' }
  ]},

  'ほ': { sentences: [
    { japanese: 'ほんを よむのが すきです。', meaning: '책 읽는 것을 좋아합니다.' },
    { japanese: 'ほてるを よやく しました。', meaning: '호텔을 예약했습니다.' },
    { japanese: 'ほんとうに ありがとうございます。', meaning: '정말로 감사합니다.' },
    { japanese: 'ほかに なにか ありますか？', meaning: '그 밖에 뭔가 있습니까?' },
    { japanese: 'ほんと、助かる！', meaning: '정말, 도움이 돼!' },
    { japanese: 'ほら、見て！', meaning: '봐봐!' },
    { japanese: 'ほかに 意見ある？', meaning: '다른 의견 있어?' },
    { japanese: 'ほしいもの、たくさんある！', meaning: '갖고 싶은 거, 많이 있어!' }
  ]},

  'ま': { sentences: [
    { japanese: 'まいにち にほんごを れんしゅう します。', meaning: '매일 일본어를 연습합니다.' },
    { japanese: 'まだ にほんごが じょうずでは ありません。', meaning: '아직 일본어가 능숙하지 않습니다.' },
    { japanese: 'またね！げんきでね。', meaning: '또 봐요! 잘 지내요.' },
    { japanese: 'まどを あけて ください。', meaning: '창문을 열어주세요.' },
    { japanese: 'まじで？！', meaning: '진짜로?!' },
    { japanese: 'また あとでね！', meaning: '나중에 또 봐!' },
    { japanese: 'まっててね！', meaning: '기다려줘!' },
    { japanese: 'まんが、読みすぎた。', meaning: '만화, 너무 많이 읽었다.' }
  ]},

  'み': { sentences: [
    { japanese: 'みずを いっぱい ください。', meaning: '물 한 잔 주세요.' },
    { japanese: 'みぎに まがって まっすぐ いきます。', meaning: '오른쪽으로 돌아서 직진합니다.' },
    { japanese: 'みんなで しゃしんを とりましょう。', meaning: '모두 함께 사진을 찍읍시다.' },
    { japanese: 'みせを さがして います。', meaning: '가게를 찾고 있습니다.' },
    { japanese: 'みんなで 食べよう！', meaning: '다 같이 먹자!' },
    { japanese: 'みてみて！', meaning: '봐봐!' },
    { japanese: 'みず、飲んだ？', meaning: '물, 마셨어?' },
    { japanese: 'みらいが 楽しみだね。', meaning: '미래가 기대되네.' }
  ]},

  'む': { sentences: [
    { japanese: 'むずかしい もんだいですが、がんばります。', meaning: '어려운 문제지만 열심히 하겠습니다.' },
    { japanese: 'むかしの にほんの まちが すきです。', meaning: '옛날 일본 마을을 좋아합니다.' },
    { japanese: 'むずかしい 問題だね。', meaning: '어려운 문제네.' },
    { japanese: 'むかえに 行くよ。', meaning: '데리러 갈게.' }
  ]},

  'め': { sentences: [
    { japanese: 'めを さまして ください。もう あさです。', meaning: '눈을 뜨세요. 이미 아침입니다.' },
    { japanese: 'めがねを かけると みえます。', meaning: '안경을 쓰면 보입니다.' },
    { japanese: 'めにゅーを みせて ください。', meaning: '메뉴를 보여주세요.' },
    { japanese: 'めにみえない むしが います。', meaning: '눈에 보이지 않는 벌레가 있습니다.' },
    { japanese: 'めんどくさいなー。', meaning: '귀찮네.' },
    { japanese: 'めがね、どこいった？', meaning: '안경, 어디 갔지?' },
    { japanese: 'めに焼き付けとこ。', meaning: '눈에 새겨두자.' },
    { japanese: 'めったにないチャンスだよ。', meaning: '좀처럼 없는 기회야.' }
  ]},

  'も': { sentences: [
    { japanese: 'わたしも にほんに いったことが あります。', meaning: '저도 일본에 간 적이 있습니다.' },
    { japanese: 'もっと ゆっくり はなして ください。', meaning: '더 천천히 말씀해 주세요.' },
    { japanese: 'もう すこし まって ください。', meaning: '조금만 더 기다려 주세요.' },
    { japanese: 'もちろん、よろこんで！', meaning: '물론이요, 기꺼이!' },
    { japanese: 'もしもし？', meaning: '여보세요?' },
    { japanese: 'もっと ゆっくり話して！', meaning: '좀 더 천천히 말해줘!' },
    { japanese: 'もう 帰るの？', meaning: '벌써 가는 거야?' },
    { japanese: 'もちろん！', meaning: '물론이지!' }
  ]},

  'や': { sentences: [
    { japanese: 'やすみの ひに どこへ いきますか？', meaning: '쉬는 날에 어디에 갑니까?' },
    { japanese: 'やさしく おしえて ください。', meaning: '친절하게 가르쳐 주세요.' },
    { japanese: 'やっと にほんごが わかりました！', meaning: '드디어 일본어를 이해했습니다!' },
    { japanese: 'やまに のぼるのが すきです。', meaning: '산에 오르는 것을 좋아합니다.' },
    { japanese: 'やっぱりこれだね！', meaning: '역시 이거다!' },
    { japanese: 'やめてよ！', meaning: '그만해!' },
    { japanese: 'やっほー！', meaning: '야호!' },
    { japanese: 'やること、たくさんあるな。', meaning: '할 일, 많이 있네.' }
  ]},

  'ゆ': { sentences: [
    { japanese: 'ゆっくり やすんで ください。', meaning: '천천히 쉬세요.' },
    { japanese: 'ゆきが ふっているので、きを つけて。', meaning: '눈이 내리고 있으니 조심해요.' },
    { japanese: 'ゆめを かなえるために がんばります。', meaning: '꿈을 이루기 위해 열심히 합니다.' },
    { japanese: 'ゆうびんきょくは どこですか？', meaning: '우체국은 어디입니까?' },
    { japanese: 'ゆっくりでいいよ。', meaning: '천천히 해도 돼.' },
    { japanese: 'ゆびきりげんまんしよ！', meaning: '손가락 걸고 약속하자!' },
    { japanese: 'ゆうきだして！', meaning: '용기 내!' },
    { japanese: 'ゆめが かなうといいね。', meaning: '꿈이 이루어지면 좋겠다.' }
  ]},

  'よ': { sentences: [
    { japanese: 'よるに ほしを みました。', meaning: '밤에 별을 봤습니다.' },
    { japanese: 'よろしく おねがいします。', meaning: '잘 부탁드립니다.' },
    { japanese: 'よかった！うまく いきました。', meaning: '잘됐어요! 잘 됐습니다.' },
    { japanese: 'よやくを したいのですが。', meaning: '예약을 하고 싶은데요.' },
    { japanese: 'よかったね！', meaning: '잘됐다!' },
    { japanese: 'よるごはん、何にする？', meaning: '저녁, 뭐로 할까?' },
    { japanese: 'よろしくね！', meaning: '잘 부탁해!' },
    { japanese: 'よかったら、うち来る？', meaning: '괜찮으면, 우리 집 올래?' }
  ]},

  'ら': { sentences: [
    { japanese: 'らいねん にほんに べんきょうしに いきます。', meaning: '내년에 일본에 공부하러 갑니다.' },
    { japanese: 'らくに なりました。ありがとう。', meaning: '편해졌습니다. 감사합니다.' },
    { japanese: 'ラーメン、食べに行こう！', meaning: '라면, 먹으러 가자!' },
    { japanese: 'らくちんだね！', meaning: '편하다!' }
  ]},

  'り': { sentences: [
    { japanese: 'りょこうを するのが だいすきです。', meaning: '여행하는 것을 매우 좋아합니다.' },
    { japanese: 'りんごを ひとつ ください。', meaning: '사과 하나 주세요.' },
    { japanese: 'りゆうを おしえて もらえますか？', meaning: '이유를 알려주실 수 있나요?' },
    { japanese: 'りっぱな たてものですね。', meaning: '훌륭한 건물이네요.' },
    { japanese: 'りょうり、得意なの？', meaning: '요리, 잘 해?' },
    { japanese: 'りんご、剥いてあげる。', meaning: '사과, 깎아줄게.' },
    { japanese: 'りゅうこうに 敏感だね。', meaning: '유행에 민감하네.' },
    { japanese: 'りラックスしよう。', meaning: '릴랙스하자.' }
  ]},

  'る': { sentences: [
    { japanese: 'るすに していますので、メッセージを どうぞ。', meaning: '자리를 비우고 있으니 메시지를 남겨주세요.' },
    { japanese: 'るすばんを して もらえますか？', meaning: '집 좀 봐줄 수 있나요?' },
    { japanese: 'るすばん、お願いできる？', meaning: '집 좀 봐달라고 부탁할 수 있을까?' },
    { japanese: 'るーと、教えてあげる。', meaning: '경로, 가르쳐줄게.' }
  ]},

  'れ': { sentences: [
    { japanese: 'れいぞうこに ジュースが あります。', meaning: '냉장고에 주스가 있습니다.' },
    { japanese: 'れんしゅうを つづければ うまくなります。', meaning: '연습을 계속하면 잘하게 됩니다.' },
    { japanese: 'れきしてきな まちを あるきます。', meaning: '역사적인 마을을 걷습니다.' },
    { japanese: 'れんらくを ください。', meaning: '연락해 주세요.' },
    { japanese: 'れんらく、待ってるね！', meaning: '연락, 기다릴게!' },
    { japanese: 'れいぞうこ、空っぽだよ。', meaning: '냉장고, 텅 비었어.' },
    { japanese: 'レシート、いる？', meaning: '영수증, 필요해?' },
    { japanese: 'れんしゅう、がんばってね！', meaning: '연습, 힘내!' }
  ]},

  'ろ': { sentences: [
    { japanese: 'ろうかを まっすぐ いって ください。', meaning: '복도를 직진해 주세요.' },
    { japanese: 'ろっぽんぎで かいものを します。', meaning: '롯폰기에서 쇼핑을 합니다.' },
    { japanese: 'ろーどちゅうだよ。', meaning: '로딩 중이야.' },
    { japanese: 'ろくでもない！', meaning: '쓸모없어!' }
  ]},

  'わ': { sentences: [
    { japanese: 'わたしは かんこくから きました。', meaning: '나는 한국에서 왔습니다.' },
    { japanese: 'わからない ときは きいて ください。', meaning: '모를 때는 물어봐 주세요.' },
    { japanese: 'わあ、なんて きれいなんでしょう！', meaning: '와, 얼마나 예쁜지요!' },
    { japanese: 'わすれものを しないように ちゅういして。', meaning: '물건을 잊고 가지 않도록 주의해요.' },
    { japanese: 'わかる！それ！', meaning: '알아! 그거!' },
    { japanese: 'わすれないでね。', meaning: '잊지 마.' },
    { japanese: 'わーい！やったー！', meaning: '와아! 신난다!' },
    { japanese: 'わがまま、言わないで。', meaning: '고집 피우지 마.' }
  ]},

  'を': { sentences: [
    { japanese: 'みずを いっぱい のんで ください。', meaning: '물을 많이 마셔주세요.' },
    { japanese: 'えいがを みながら ポップコーンを たべます。', meaning: '영화를 보면서 팝콘을 먹습니다.' },
    { japanese: 'コーヒーを のむ？', meaning: '커피 마실래?' },
    { japanese: '何を するの？', meaning: '무엇을 하는 거야?' }
  ]},

  'ん': { sentences: [
    { japanese: 'にほんごの べんきょうは たのしいです。', meaning: '일본어 공부는 재미있습니다.' },
    { japanese: 'ほんとうに しんじられないです！', meaning: '정말 믿을 수가 없어요!' },
    { japanese: 'せんえんをください。', meaning: '천 엔 주세요.' },
    { japanese: 'んー、どうしようかな。', meaning: '음, 어떡할까.' },
    { japanese: 'ん？何か言った？', meaning: '응? 뭐랬어?' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 기본 (ア단~ン)
  // ══════════════════════════════════════════

  'ア': { sentences: [
    { japanese: 'アイスを ふたつ ください。', meaning: '아이스크림 두 개 주세요.' },
    { japanese: 'アジアを りょこう するのが ゆめです。', meaning: '아시아를 여행하는 것이 꿈입니다.' },
    { japanese: 'アイスコーヒー、お願いします！', meaning: '아이스 커피, 부탁합니다!' },
    { japanese: 'アニメ、最近見てる？', meaning: '애니, 요즘 보고 있어?' }
  ]},

  'イ': { sentences: [
    { japanese: 'イタリアりょうりが だいすきです。', meaning: '이탈리아 요리를 매우 좋아합니다.' },
    { japanese: 'イヤフォンを つかって おんがくを ききます。', meaning: '이어폰을 사용해서 음악을 듣습니다.' },
    { japanese: 'インスタ、やってる？', meaning: '인스타, 해?' },
    { japanese: 'イベント、いつだっけ？', meaning: '이벤트, 언제였더라?' }
  ]},

  'ウ': { sentences: [
    { japanese: 'ウォーキングを まいにち します。', meaning: '워킹을 매일 합니다.' },
    { japanese: 'ウイスキーは のみません。', meaning: '위스키는 마시지 않습니다.' },
    { japanese: 'うわー、すごい！', meaning: '우와, 대단해!' },
    { japanese: 'ウーバー、頼もうかな。', meaning: '우버, 시킬까.' }
  ]},

  'エ': { sentences: [
    { japanese: 'エレベーターで 3かいに あがります。', meaning: '엘리베이터로 3층에 올라갑니다.' },
    { japanese: 'エアコンが こわれて こまっています。', meaning: '에어컨이 고장나서 곤란합니다.' },
    { japanese: 'エコバッグ、持ってる？', meaning: '에코백, 가지고 있어?' },
    { japanese: 'エンジン、かかった？', meaning: '엔진, 걸렸어?' }
  ]},

  'オ': { sentences: [
    { japanese: 'オレンジジュースを ください。', meaning: '오렌지 주스 주세요.' },
    { japanese: 'オーストラリアに いきたいです。', meaning: '호주에 가고 싶습니다.' },
    { japanese: 'オフラインで 遊ぼう！', meaning: '오프라인으로 놀자!' },
    { japanese: 'おかわり、お願いします！', meaning: '더 주세요, 부탁합니다!' }
  ]},

  'カ': { sentences: [
    { japanese: 'カメラを かいたいのですが、おすすめは？', meaning: '카메라를 사고 싶은데, 추천은요?' },
    { japanese: 'カフェで コーヒーを のみながら べんきょう します。', meaning: '카페에서 커피를 마시면서 공부합니다.' },
    { japanese: 'カラオケ、行こうよ！', meaning: '노래방, 가자!' },
    { japanese: 'カフェラテ、ホットで。', meaning: '카페라떼, 따뜻한 걸로.' }
  ]},

  'キ': { sentences: [
    { japanese: 'キャンセルして ください。', meaning: '취소해 주세요.' },
    { japanese: 'キャンプに いくのが すきです。', meaning: '캠핑 가는 것을 좋아합니다.' },
    { japanese: 'キャンプ、いつ行く？', meaning: '캠핑, 언제 가?' },
    { japanese: 'キットカット、食べる？', meaning: '킷캣, 먹을래?' }
  ]},

  'ク': { sentences: [
    { japanese: 'クレジットカードは つかえますか？', meaning: '신용카드는 사용할 수 있나요?' },
    { japanese: 'クーラーを つけて ください。あついです。', meaning: '에어컨 켜주세요. 덥습니다.' },
    { japanese: 'クッキー、焼いたんだ。', meaning: '쿠키, 구웠어.' },
    { japanese: 'クラス、何組？', meaning: '반, 몇 반이야?' }
  ]},

  'ケ': { sentences: [
    { japanese: 'ケーキを かってきました。たべましょう。', meaning: '케이크를 사왔습니다. 먹읍시다.' },
    { japanese: 'ケータイの バッテリーが きれました。', meaning: '핸드폰 배터리가 다됐습니다.' },
    { japanese: 'ケーキ、一緒に食べよう！', meaning: '케이크, 같이 먹자!' },
    { japanese: 'ゲーム、やらない？', meaning: '게임, 안 할래?' }
  ]},

  'コ': { sentences: [
    { japanese: 'コーヒーを いっぱい ください。', meaning: '커피 한 잔 주세요.' },
    { japanese: 'コンビニは あのかどを まがった ところです。', meaning: '편의점은 저 코너를 돈 곳에 있습니다.' },
    { japanese: 'コンビニ、行かない？', meaning: '편의점, 안 갈래?' },
    { japanese: 'コーヒー、いる？', meaning: '커피, 필요해?' }
  ]},

  'サ': { sentences: [
    { japanese: 'サービスが よくて、また きたいです。', meaning: '서비스가 좋아서 또 오고 싶습니다.' },
    { japanese: 'サッカーの しあいを みに いきます。', meaning: '축구 경기를 보러 갑니다.' },
    { japanese: 'サイダー、飲みたい！', meaning: '사이다, 마시고 싶다!' },
    { japanese: 'サービスエリア、寄らない？', meaning: '휴게소, 들르지 않을래?' }
  ]},

  'シ': { sentences: [
    { japanese: 'シャワーを あびて すっきりしました。', meaning: '샤워를 해서 개운합니다.' },
    { japanese: 'シーフードパスタを たべました。', meaning: '해산물 파스타를 먹었습니다.' },
    { japanese: 'シャツ、新しいの買った？', meaning: '셔츠, 새 거 샀어?' },
    { japanese: 'シーソー、乗ろうよ！', meaning: '시소, 타자!' }
  ]},

  'ス': { sentences: [
    { japanese: 'スーパーで やさいを かいます。', meaning: '슈퍼마켓에서 채소를 삽니다.' },
    { japanese: 'スマートフォンで ちずを みます。', meaning: '스마트폰으로 지도를 봅니다.' },
    { japanese: 'スポーツ、何が好き？', meaning: '스포츠, 뭐 좋아해?' },
    { japanese: 'スーツ、似合ってるね！', meaning: '수트, 잘 어울리네!' }
  ]},

  'セ': { sentences: [
    { japanese: 'セールちゅうなので、やすく かえました。', meaning: '세일 중이라 싸게 살 수 있었습니다.' },
    { japanese: 'セーターを きて でかけます。', meaning: '스웨터를 입고 외출합니다.' },
    { japanese: 'セーター、着てきたよ。', meaning: '스웨터, 입고 왔어.' },
    { japanese: 'センスいいじゃん！', meaning: '센스 좋네!' }
  ]},

  'ソ': { sentences: [
    { japanese: 'ソファーに すわって テレビを みます。', meaning: '소파에 앉아서 TV를 봅니다.' },
    { japanese: 'ソースを かけて たべて ください。', meaning: '소스를 뿌려서 드세요.' },
    { japanese: 'ソフトクリーム、食べたい！', meaning: '소프트 아이스크림, 먹고 싶다!' },
    { japanese: 'ソファで ゴロゴロしよう。', meaning: '소파에서 뒹굴거리자.' }
  ]},

  'タ': { sentences: [
    { japanese: 'タクシーを よんで ください。', meaning: '택시를 불러주세요.' },
    { japanese: 'タオルを もう いちまい ください。', meaning: '타올을 한 장 더 주세요.' },
    { japanese: 'タクシー、拾おうか。', meaning: '택시, 잡을까?' },
    { japanese: 'タイマー、セットしといて。', meaning: '타이머, 맞춰놔.' }
  ]},

  'チ': { sentences: [
    { japanese: 'チケットを かいに いきます。', meaning: '티켓을 사러 갑니다.' },
    { japanese: 'チェックアウトは なんじまでですか？', meaning: '체크아웃은 몇 시까지입니까?' },
    { japanese: 'チーズ、食べる？', meaning: '치즈, 먹을래?' },
    { japanese: 'チョコレート、あげる！', meaning: '초콜릿, 줄게!' }
  ]},

  'ツ': { sentences: [
    { japanese: 'ツアーに さんかして たのしかったです。', meaning: '투어에 참가해서 즐거웠습니다.' },
    { japanese: 'ツインルームを よやく したいです。', meaning: '트윈룸을 예약하고 싶습니다.' },
    { japanese: 'ツアー、楽しかった？', meaning: '투어, 즐거웠어?' },
    { japanese: 'ツナ缶、ある？', meaning: '참치캔, 있어?' }
  ]},

  'テ': { sentences: [
    { japanese: 'テレビを みながら しょくじを します。', meaning: 'TV를 보면서 식사를 합니다.' },
    { japanese: 'テーブルに おいて ください。', meaning: '테이블에 놓아주세요.' },
    { japanese: 'テレビ、見ない？', meaning: 'TV, 안 볼래?' },
    { japanese: 'テニス、やろうよ！', meaning: '테니스, 하자!' }
  ]},

  'ト': { sentences: [
    { japanese: 'トイレは どこですか？', meaning: '화장실은 어디입니까?' },
    { japanese: 'トーストと コーヒーで あさごはんを たべます。', meaning: '토스트와 커피로 아침을 먹습니다.' },
    { japanese: 'トマト、苦手なんだ。', meaning: '토마토, 싫어해.' },
    { japanese: 'トレーニング、頑張ってるね！', meaning: '트레이닝, 열심히 하네!' }
  ]},

  'ナ': { sentences: [
    { japanese: 'ナイフと フォークを ください。', meaning: '나이프와 포크 주세요.' },
    { japanese: 'ナビで みちを さがします。', meaning: '내비게이션으로 길을 찾습니다.' },
    { japanese: 'ナイショだよ！', meaning: '비밀이야!' },
    { japanese: 'ナゲット、食べたい！', meaning: '너겟, 먹고 싶다!' }
  ]},

  'ニ': { sentences: [
    { japanese: 'ニュースを みて じょうほうを あつめます。', meaning: '뉴스를 보고 정보를 모읍니다.' },
    { japanese: 'ニホンゴは むずかしいですが、たのしいです。', meaning: '일본어는 어렵지만 즐겁습니다.' },
    { japanese: 'ニュース、見た？', meaning: '뉴스, 봤어?' },
    { japanese: 'ニート生活、最高！', meaning: '니트 생활, 최고!' }
  ]},

  'ヌ': { sentences: [
    { japanese: 'ヌードルを たべました。おいしかったです。', meaning: '누들을 먹었습니다. 맛있었어요.' },
    { japanese: 'ヌードル、どっちがいい？', meaning: '누들, 어떤 게 좋아?' }
  ]},

  'ネ': { sentences: [
    { japanese: 'ネットで よやくを しました。', meaning: '인터넷으로 예약을 했습니다.' },
    { japanese: 'ネクタイを して しごとに いきます。', meaning: '넥타이를 하고 일하러 갑니다.' },
    { japanese: 'ネットで 探してみよう。', meaning: '인터넷으로 찾아보자.' },
    { japanese: 'ネックレス、かわいい！', meaning: '목걸이, 귀여워!' }
  ]},

  'ノ': { sentences: [
    { japanese: 'ノートに じゅぎょうの ないようを かきます。', meaning: '노트에 수업 내용을 씁니다.' },
    { japanese: 'ノックして はいって ください。', meaning: '노크하고 들어오세요.' },
    { japanese: 'ノート、貸して！', meaning: '노트, 빌려줘!' },
    { japanese: 'ノーコメントで！', meaning: '노 코멘트!' }
  ]},

  'ハ': { sentences: [
    { japanese: 'ハンバーガーと フライドポテトを ください。', meaning: '햄버거와 감자튀김 주세요.' },
    { japanese: 'ハワイに しんこんりょこうに いきました。', meaning: '하와이에 신혼여행을 갔습니다.' },
    { japanese: 'ハンバーグ、食べたい！', meaning: '함박 스테이크, 먹고 싶다!' },
    { japanese: 'ハッピーバースデー！', meaning: '생일 축하해!' }
  ]},

  'ヒ': { sentences: [
    { japanese: 'ヒーターを つけて ください。さむいです。', meaning: '히터 켜주세요. 춥습니다.' },
    { japanese: 'ヒントを くれますか？', meaning: '힌트를 주시겠어요?' },
    { japanese: 'ビール、乾杯！', meaning: '맥주, 건배!' },
    { japanese: 'ヒール、高いね！', meaning: '힐, 높네!' }
  ]},

  'フ': { sentences: [
    { japanese: 'フロントに もんだいを しらせます。', meaning: '프런트에 문제를 알립니다.' },
    { japanese: 'フライトが えんちゃくして こまりました。', meaning: '비행기가 연착해서 곤란했습니다.' },
    { japanese: 'フルーツ、食べる？', meaning: '과일, 먹을래?' },
    { japanese: 'ファッション、決まってるね！', meaning: '패션, 멋지네!' }
  ]},

  'ヘ': { sentences: [
    { japanese: 'ヘルメットを かぶって じてんしゃに のります。', meaning: '헬멧을 쓰고 자전거를 탑니다.' },
    { japanese: 'ヘアサロンで かみを きります。', meaning: '헤어살롱에서 머리를 자릅니다.' },
    { japanese: 'ヘリコプター、乗ってみたい！', meaning: '헬리콥터, 타보고 싶다!' },
    { japanese: 'ヘッドホン、どこ？', meaning: '헤드폰, 어디?' }
  ]},

  'ホ': { sentences: [
    { japanese: 'ホテルに チェックインします。', meaning: '호텔에 체크인합니다.' },
    { japanese: 'ホームで でんしゃを まちます。', meaning: '플랫폼에서 전철을 기다립니다.' },
    { japanese: 'ホームパーティー、しよう！', meaning: '홈 파티, 하자!' },
    { japanese: 'ホットケーキ、焼こうか。', meaning: '핫케이크, 구울까.' }
  ]},

  'マ': { sentences: [
    { japanese: 'マップを みながら まちを あるきます。', meaning: '지도를 보면서 마을을 걷습니다.' },
    { japanese: 'マスクを して がいしゅつします。', meaning: '마스크를 하고 외출합니다.' },
    { japanese: 'マクドナルド、行く？', meaning: '맥도날드, 갈래?' },
    { japanese: 'マスク、忘れないでね。', meaning: '마스크, 잊지 마.' }
  ]},

  'ミ': { sentences: [
    { japanese: 'ミルクを いれた コーヒーが すきです。', meaning: '밀크를 넣은 커피를 좋아합니다.' },
    { japanese: 'ミーティングは なんじから ですか？', meaning: '미팅은 몇 시부터입니까?' },
    { japanese: 'ミニスカート、かわいいね！', meaning: '미니스커트, 귀엽네!' },
    { japanese: 'ミルクティー、頼もう。', meaning: '밀크티, 시키자.' }
  ]},

  'ム': { sentences: [
    { japanese: 'ムービーを みて かんどうしました。', meaning: '영화를 보고 감동했습니다.' },
    { japanese: 'ムーディーな音楽、いいね。', meaning: '분위기 있는 음악, 좋네.' }
  ]},

  'メ': { sentences: [
    { japanese: 'メニューを みせて ください。', meaning: '메뉴를 보여주세요.' },
    { japanese: 'メールで れんらくを します。', meaning: '메일로 연락을 합니다.' },
    { japanese: 'メール、チェックしといたよ。', meaning: '메일, 확인해뒀어.' },
    { japanese: 'メロン、大好き！', meaning: '멜론, 정말 좋아해!' }
  ]},

  'モ': { sentences: [
    { japanese: 'モデルが きれいな ふくを きています。', meaning: '모델이 예쁜 옷을 입고 있습니다.' },
    { japanese: 'モーニングコール、お願い！', meaning: '모닝콜, 부탁해!' }
  ]},

  'ヤ': { sentences: [
    { japanese: 'ヤクルトを のんで おなかの ちょうしを ととのえます。', meaning: '야쿠르트를 마셔서 장 상태를 조정합니다.' },
    { japanese: 'ヤクルト、飲もう！', meaning: '야쿠르트, 마시자!' }
  ]},

  'ユ': { sentences: [
    { japanese: 'ユニバーサルスタジオに いきたいです。', meaning: '유니버설 스튜디오에 가고 싶습니다.' },
    { japanese: 'ユーチューブで にほんごを べんきょうします。', meaning: '유튜브로 일본어를 공부합니다.' },
    { japanese: 'ユニフォーム、似合ってる！', meaning: '유니폼, 잘 어울려!' },
    { japanese: 'ユーモアあるね！', meaning: '유머 있네!' }
  ]},

  'ヨ': { sentences: [
    { japanese: 'ヨーロッパを りょこう するのが ゆめです。', meaning: '유럽을 여행하는 것이 꿈입니다.' },
    { japanese: 'ヨガを して からだを きたえます。', meaning: '요가를 해서 몸을 단련합니다.' },
    { japanese: 'ヨーグルト、食べる？', meaning: '요거트, 먹을래?' },
    { japanese: 'ヨーロッパ、また行きたいな。', meaning: '유럽, 또 가고 싶다.' }
  ]},

  'ラ': { sentences: [
    { japanese: 'ラーメンが たべたいです。どこかに いい みせは？', meaning: '라멘이 먹고 싶습니다. 어디 좋은 가게는요?' },
    { japanese: 'ラジオを きいて にほんごを れんしゅうします。', meaning: '라디오를 들으며 일본어를 연습합니다.' },
    { japanese: 'ラーメン、奢ってあげる！', meaning: '라면, 내가 쏠게!' },
    { japanese: 'ラジオ、つけてもいい？', meaning: '라디오, 켜도 돼?' }
  ]},

  'リ': { sentences: [
    { japanese: 'リゾートで のんびり やすみます。', meaning: '리조트에서 느긋하게 쉽니다.' },
    { japanese: 'リュックを せおって ハイキングに いきます。', meaning: '백팩을 메고 하이킹을 갑니다.' },
    { japanese: 'リップ、忘れた！', meaning: '립, 잊어버렸다!' },
    { japanese: 'リラックスしてね。', meaning: '편안하게 있어.' }
  ]},

  'ル': { sentences: [
    { japanese: 'ルームサービスを たのんで へやで たべます。', meaning: '룸서비스를 부탁하고 방에서 먹습니다.' },
    { japanese: 'ルーレット、回してみよう！', meaning: '룰렛, 돌려보자!' }
  ]},

  'レ': { sentences: [
    { japanese: 'レストランを よやく したいのですが。', meaning: '레스토랑을 예약하고 싶은데요.' },
    { japanese: 'レシートを ください。', meaning: '영수증 주세요.' },
    { japanese: 'レモン、絞って！', meaning: '레몬, 짜줘!' },
    { japanese: 'レストラン、予約しといたよ。', meaning: '레스토랑, 예약해뒀어.' }
  ]},

  'ロ': { sentences: [
    { japanese: 'ロビーで ともだちを まちます。', meaning: '로비에서 친구를 기다립니다.' },
    { japanese: 'ロッカーに にもつを いれます。', meaning: '로커에 짐을 넣습니다.' },
    { japanese: 'ローストビーフ、食べたい！', meaning: '로스트 비프, 먹고 싶다!' },
    { japanese: 'ロックンロール！', meaning: '록큰롤!' }
  ]},

  'ワ': { sentences: [
    { japanese: 'ワインを いっぱい ください。', meaning: '와인 한 잔 주세요.' },
    { japanese: 'ワンピースを きた ひとが かわいいです。', meaning: '원피스를 입은 사람이 귀엽습니다.' },
    { japanese: 'ワイン、飲もうよ。', meaning: '와인, 마시자.' },
    { japanese: 'ワンピース、新しく買ったんだ。', meaning: '원피스, 새로 샀어.' }
  ]},

  'ヲ': { sentences: [
    { japanese: 'これヲ みて ください。', meaning: '이것을 봐주세요.' },
    { japanese: '何を する？', meaning: '무엇을 할래?' }
  ]},

  'ン': { sentences: [
    { japanese: 'アンケートに こたえて ください。', meaning: '앙케트에 답해주세요.' },
    { japanese: 'レストランに はいると、きれいな ないそうでした。', meaning: '레스토랑에 들어가니 예쁜 인테리어였습니다.' },
    { japanese: 'んー、どうしようかな。', meaning: '음, 어떡할까.' },
    { japanese: 'ん？何か言った？', meaning: '응? 뭐랬어?' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 탁음 (が行~ぼ)
  // ══════════════════════════════════════════

  'が': { sentences: [
    { japanese: 'がっこうで にほんごを べんきょうしています。', meaning: '학교에서 일본어를 공부하고 있습니다.' },
    { japanese: 'がんばって ください！', meaning: '열심히 하세요!' },
    { japanese: 'がいこくごが とくいです。', meaning: '외국어를 잘합니다.' },
    { japanese: 'がんばろうね！', meaning: '힘내자!' },
    { japanese: 'がっかりさせないでね。', meaning: '실망시키지 마.' },
    { japanese: 'ガス代、高くない？', meaning: '가스비, 비싸지 않아?' },
    { japanese: 'がんばりすぎないでね。', meaning: '너무 무리하지 마.' }
  ]},
  'ぎ': { sentences: [
    { japanese: 'ぎんこうは どこですか？', meaning: '은행은 어디입니까?' },
    { japanese: 'ぎじゅつが すすんでいます。', meaning: '기술이 발전하고 있습니다.' },
    { japanese: 'ぎゅうどん、食べに行かない？', meaning: '규동, 먹으러 안 갈래?' },
    { japanese: 'ぎりぎり間に合った！', meaning: '겨우 시간에 맞췄다!' }
  ]},
  'ぐ': { sentences: [
    { japanese: 'ぐあいが わるいので、やすみます。', meaning: '몸 상태가 안 좋아서 쉽니다.' },
    { japanese: 'ぐうぜん ともだちに あいました。', meaning: '우연히 친구를 만났습니다.' },
    { japanese: 'ぐっすり眠れた？', meaning: '푹 잘 잤어?' },
    { japanese: 'ぐうたらしてたいな。', meaning: '게으름 피우고 싶네.' }
  ]},
  'げ': { sentences: [
    { japanese: 'げんきですか？はい、げんきです！', meaning: '잘 지내나요? 네, 잘 지내요!' },
    { japanese: 'げつようびから しごとが はじまります。', meaning: '월요일부터 일이 시작됩니다.' },
    { japanese: 'げんきにしてた？', meaning: '잘 지냈어?' },
    { japanese: 'ゲーム、新しいの出たよ！', meaning: '게임, 새로운 거 나왔어!' }
  ]},
  'ご': { sentences: [
    { japanese: 'ごはんを たべましたか？', meaning: '밥을 먹었습니까?' },
    { japanese: 'ごめんなさい、おくれました。', meaning: '죄송합니다, 늦었습니다.' },
    { japanese: 'ごゆっくり どうぞ。', meaning: '천천히 편하게 계세요.' },
    { japanese: 'ごはん、できたよ！', meaning: '밥, 다 됐어!' },
    { japanese: 'ごめん、遅れるかも。', meaning: '미안, 늦을지도.' },
    { japanese: 'ごゆっくりどうぞ！', meaning: '천천히 즐겨!' },
    { japanese: 'ごちそうさま！', meaning: '잘 먹었습니다!' }
  ]},
  'ざ': { sentences: [
    { japanese: 'ざいりょうを かってきました。', meaning: '재료를 사왔습니다.' },
    { japanese: 'ざんねんながら いけません。', meaning: '아쉽지만 갈 수 없습니다.' },
    { japanese: 'ざんねんだけど、無理かな。', meaning: '유감이지만, 무리일까.' },
    { japanese: 'ざっくばらんに話そうよ。', meaning: '솔직하게 이야기하자.' }
  ]},
  'じ': { sentences: [
    { japanese: 'じかんが ありません。いそいでください。', meaning: '시간이 없습니다. 서주세요.' },
    { japanese: 'じゅうしょを おしえて ください。', meaning: '주소를 알려주세요.' },
    { japanese: 'じぶんで できます。', meaning: '혼자서 할 수 있습니다.' },
    { japanese: 'じかん、もうないよ！', meaning: '시간, 이제 없어!' },
    { japanese: 'じっと見てて。', meaning: '가만히 보고 있어.' },
    { japanese: 'じょうだんでしょ？', meaning: '농담이지?' },
    { japanese: 'じゅんびできた？', meaning: '준비됐어?' }
  ]},
  'ず': { sentences: [
    { japanese: 'ずっと にほんごを れんしゅう しています。', meaning: '계속 일본어를 연습하고 있습니다.' },
    { japanese: 'ずいぶん うまくなりましたね。', meaning: '꽤 능숙해졌네요.' },
    { japanese: 'ずれてるよ。', meaning: '어긋나있어.' },
    { japanese: 'ずばり、何が言いたいの？', meaning: '솔직히, 뭘 말하고 싶은 거야?' }
  ]},
  'ぜ': { sentences: [
    { japanese: 'ぜひ あそびに きてください。', meaning: '꼭 놀러 오세요.' },
    { japanese: 'ぜんぶ たべました。おいしかった！', meaning: '다 먹었습니다. 맛있었어요!' },
    { japanese: 'ぜんぜん 気にしてないよ。', meaning: '전혀 신경 안 써.' },
    { japanese: 'ぜいたくしちゃった！', meaning: '사치 부려버렸다!' }
  ]},
  'ぞ': { sentences: [
    { japanese: 'ぞうは おおきい どうぶつです。', meaning: '코끼리는 큰 동물입니다.' },
    { japanese: 'ぞれぞれ かんがえかたが ちがいます。', meaning: '각자 생각하는 방식이 다릅니다.' },
    { japanese: 'ぞっとするね。', meaning: '소름 돋네.' },
    { japanese: 'ぞんぶんに 楽しんでね。', meaning: '마음껏 즐겨!' }
  ]},
  'だ': { sentences: [
    { japanese: 'だいじょうぶですか？たすけましょうか？', meaning: '괜찮으세요? 도와드릴까요?' },
    { japanese: 'だいすきな たべものは ラーメンです。', meaning: '가장 좋아하는 음식은 라멘입니다.' },
    { japanese: 'だれかが きています。', meaning: '누군가 오고 있습니다.' },
    { japanese: 'だまってて！', meaning: '닥쳐!' },
    { japanese: 'だいぶ よくなったね。', meaning: '많이 좋아졌네.' },
    { japanese: 'だから 言ったじゃん！', meaning: '그러니까 내가 말했잖아!' },
    { japanese: 'だらだら過ごそうよ。', meaning: '빈둥거리며 지내자.' }
  ]},
  'ぢ': { sentences: [
    { japanese: 'はなぢが でました。', meaning: '코피가 났습니다.' },
    { japanese: 'ちぢこまらないで！', meaning: '움츠러들지 마!' }
  ]},
  'づ': { sentences: [
    { japanese: 'きずが あります。てあてして ください。', meaning: '상처가 있습니다. 치료해 주세요.' },
    { japanese: 'つづきが 気になる！', meaning: '다음 이야기가 궁금해!' }
  ]},
  'で': { sentences: [
    { japanese: 'でんしゃで えきまで いきます。', meaning: '전철로 역까지 갑니다.' },
    { japanese: 'でんわを かけても いいですか？', meaning: '전화해도 됩니까?' },
    { japanese: 'でかける まえに かぎを かけます。', meaning: '외출하기 전에 자물쇠를 잠급니다.' },
    { japanese: 'できるかな？', meaning: '할 수 있을까?' },
    { japanese: 'でたらめ言わないで！', meaning: '엉터리 말 하지 마!' },
    { japanese: 'でんき、消して！', meaning: '불, 꺼줘!' },
    { japanese: 'でんわ、出ないな。', meaning: '전화, 안 받네.' }
  ]},
  'ど': { sentences: [
    { japanese: 'どうぞ、こちらへ。', meaning: '어서오세요, 이쪽으로.' },
    { japanese: 'どこかで あったことが ありますか？', meaning: '어딘가에서 만난 적이 있나요?' },
    { japanese: 'どうして にほんにきたんですか？', meaning: '왜 일본에 오셨나요?' },
    { japanese: 'どう？元気？', meaning: '어때? 잘 지내?' },
    { japanese: 'どっちでもいいよ。', meaning: '어느 쪽이든 상관없어.' },
    { japanese: 'どうしようもないね。', meaning: '어쩔 수 없네.' },
    { japanese: 'どきどきする！', meaning: '두근거린다!' }
  ]},
  'ば': { sentences: [
    { japanese: 'バスていで まっています。', meaning: '버스 정류장에서 기다리고 있습니다.' },
    { japanese: 'ばんごはんは なにを たべますか？', meaning: '저녁은 무엇을 먹습니까?' },
    { japanese: 'ばしょを おしえて ください。', meaning: '장소를 알려주세요.' },
    { japanese: 'ばかにしないで！', meaning: '놀리지 마!' },
    { japanese: 'ばっちりだよ！', meaning: '완벽해!' },
    { japanese: 'ばらばらになっちゃった。', meaning: '흩어져 버렸다.' },
    { japanese: 'ばれたらどうする？', meaning: '들키면 어떡할 거야?' }
  ]},
  'び': { sentences: [
    { japanese: 'びじゅつかんに いったことが あります。', meaning: '미술관에 간 적이 있습니다.' },
    { japanese: 'びょうきに なりました。くすりを のみます。', meaning: '아프게 됐습니다. 약을 먹습니다.' },
    { japanese: 'びっくりした！', meaning: '깜짝 놀랐다!' },
    { japanese: 'びんぼう生活だよ。', meaning: '가난한 생활이야.' }
  ]},
  'ぶ': { sentences: [
    { japanese: 'ぶんかさいが たのしみです。', meaning: '문화제가 기대됩니다.' },
    { japanese: 'ぶどうが すきですか？', meaning: '포도를 좋아합니까?' },
    { japanese: 'ぶっちゃけどう思う？', meaning: '솔직히 어떻게 생각해?' },
    { japanese: 'ぶつかるかと思った！', meaning: '부딪힐 뻔했어!' }
  ]},
  'べ': { sentences: [
    { japanese: 'べんきょうを がんばって います。', meaning: '공부를 열심히 하고 있습니다.' },
    { japanese: 'べつに もんだいは ありません。', meaning: '별로 문제는 없습니다.' },
    { japanese: 'べつに、いいけど？', meaning: '별로 상관없는데?' },
    { japanese: 'べらべら喋りすぎ！', meaning: '너무 재잘거려!' }
  ]},
  'ぼ': { sentences: [
    { japanese: 'ぼうしを かぶって でかけます。', meaning: '모자를 쓰고 외출합니다.' },
    { japanese: 'ぼランティアに さんかします。', meaning: '봉사활동에 참가합니다.' },
    { japanese: 'ぼく、手伝うよ！', meaning: '나, 도와줄게!' },
    { japanese: 'ぼーっとするね。', meaning: '멍하니 있게 되네.' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 반탁음 (ぱ행)
  // ══════════════════════════════════════════

  'ぱ': { sentences: [
    { japanese: 'パーティーに いきます。', meaning: '파티에 갑니다.' },
    { japanese: 'ぱっと みて わかりました。', meaning: '딱 보고 알았습니다.' },
    { japanese: 'ぱくぱく食べよう！', meaning: '냠냠 먹자!' },
    { japanese: 'ぱん、焼けたよ！', meaning: '빵, 구워졌어!' }
  ]},
  'ぴ': { sentences: [
    { japanese: 'ピアノを ひくのが すきです。', meaning: '피아노 치는 것을 좋아합니다.' },
    { japanese: 'ぴかぴかに みがきました。', meaning: '반짝반짝하게 닦았습니다.' },
    { japanese: 'ぴんち！', meaning: '위기!' },
    { japanese: 'ぴりぴりするね。', meaning: '따끔따끔하네.' }
  ]},
  'ぷ': { sentences: [
    { japanese: 'プールで およぎます。', meaning: '수영장에서 수영합니다.' },
    { japanese: 'ぷらす思考で行こう！', meaning: '긍정적으로 생각하자!' }
  ]},
  'ぺ': { sentences: [
    { japanese: 'ペットを かっています。', meaning: '반려동물을 키우고 있습니다.' },
    { japanese: 'ぺらぺらに はなせるように なりたい。', meaning: '유창하게 말할 수 있게 되고 싶습니다.' },
    { japanese: 'ぺこぺこだー！', meaning: '꼬르륵! (배고픔)' },
    { japanese: 'ぺったんこだね。', meaning: '납작하네.' }
  ]},
  'ぽ': { sentences: [
    { japanese: 'ポケットに いれます。', meaning: '주머니에 넣습니다.' },
    { japanese: 'のんぽりと しています。', meaning: '느긋하게 있습니다.' },
    { japanese: 'ぽかぽか陽気だね。', meaning: '포근한 날씨네.' },
    { japanese: 'ぽつんと一人。', meaning: '홀로 외로이.' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 요음 (きゃ, しゃ 등)
  // ══════════════════════════════════════════

  'きゃ': { sentences: [
    { japanese: 'きゃくさまが きました。', meaning: '손님이 오셨습니다.' },
    { japanese: 'きゃんぷに いきましょう！', meaning: '캠핑을 갑시다!' },
    { japanese: 'きゃー！やめて！', meaning: '꺄악! 그만해!' },
    { japanese: 'きゃらめる、あげる。', meaning: '캐러멜, 줄게.' }
  ]},
  'きゅ': { sentences: [
    { japanese: 'きゅうりが すきです。', meaning: '오이를 좋아합니다.' },
    { japanese: 'きゅうに さむくなりました。', meaning: '갑자기 추워졌습니다.' },
    { japanese: 'きゅうしょく、何かな？', meaning: '급식, 뭘까?' },
    { japanese: 'きゅうきょ、決まったんだ。', meaning: '급하게, 결정됐어.' }
  ]},
  'きょ': { sentences: [
    { japanese: 'きょうねんより ずっと うまくなった。', meaning: '작년보다 훨씬 능숙해졌어요.' },
    { japanese: 'きょうしつで べんきょうします。', meaning: '교실에서 공부합니다.' },
    { japanese: 'きょり、どれくらい？', meaning: '거리, 어느 정도야?' },
    { japanese: 'きょわしん？', meaning: '교정?', meaning: '(사투리) 교정?' } // 의도된 사투리 예시
  ]},
  'しゃ': { sentences: [
    { japanese: 'しゃしんを とって いいですか？', meaning: '사진을 찍어도 됩니까?' },
    { japanese: 'しゃべるのが すきです。', meaning: '말하는 것을 좋아합니다.' },
    { japanese: 'しゃっくりが 止まらない！', meaning: '딸꾹질이 멈추지 않아!' },
    { japanese: 'しゃーないな。', meaning: '어쩔 수 없네.' } // 사투리 예시
  ]},
  'しゅ': { sentences: [
    { japanese: 'しゅみは なんですか？', meaning: '취미는 무엇입습니까?' },
    { japanese: 'しゅっぱつの じかんです。', meaning: '출발 시간입니다.' },
    { japanese: 'しゅくだい、終わった？', meaning: '숙제, 끝났어?' },
    { japanese: 'しゅんかん移動できたらな。', meaning: '순간 이동할 수 있다면 좋겠다.' }
  ]},
  'しょ': { sentences: [
    { japanese: 'しょうらいは なにに なりたいですか？', meaning: '장래에는 무엇이 되고 싶습니까?' },
    { japanese: 'しょくじは もう すみましたか？', meaning: '식사는 이미 하셨습니까?' },
    { japanese: 'しょうがないね。', meaning: '어쩔 수 없네.' },
    { japanese: 'しょっぱくて おいしい！', meaning: '짭짤해서 맛있다!' }
  ]},
  'ちゃ': { sentences: [
    { japanese: 'おちゃを いっぱい のみます。', meaning: '차를 한 잔 마십니다.' },
    { japanese: 'ちゃんと べんきょうして ください。', meaning: '제대로 공부해 주세요.' },
    { japanese: 'ちゃかすなよ！', meaning: '놀리지 마!' },
    { japanese: 'ちゃちゃっと 終わらせよう！', meaning: '빨리 끝내버리자!' }
  ]},
  'ちゅ': { sentences: [
    { japanese: 'ちゅうごくりょうりが すきです。', meaning: '중국 요리를 좋아합니다.' },
    { japanese: 'ちゅういして ください。', meaning: '주의해 주세요.' },
    { japanese: 'ちゅーする？', meaning: '뽀뽀할래?' }, // 매우 비공식적/친근한 예시
    { japanese: 'ちゅうもくして！', meaning: '주목해!' }
  ]},
  'ちょ': { sentences: [
    { japanese: 'ちょっと まって ください。', meaning: '잠깐 기다려 주세요.' },
    { japanese: 'ちょうど いい おおきさです。', meaning: '딱 좋은 크기입니다.' },
    { japanese: 'ちょー、だるい。', meaning: '완전, 귀찮아.' }, // 매우 비공식적/젊은층 예시
    { japanese: 'ちょこっとだけね。', meaning: '조금만이야.' }
  ]},
  'にゃ': { sentences: [
    { japanese: 'にゃんこが かわいいです。', meaning: '야옹이가 귀엽습니다.' },
    { japanese: 'にゃー。', meaning: '야옹.' }
  ]},
  'にゅ': { sentences: [
    { japanese: 'にゅうがくを おめでとうございます。', meaning: '입학을 축하합니다.' },
    { japanese: 'にゅうりょくして ください。', meaning: '입력해 주세요.' }
  ]},
  'にょ': { sentences: [
    { japanese: 'にょろにょろと はが みえます。', meaning: '구불구불한 뱀이 보입니다.' },
    { japanese: 'にょきにょき 育ってるね。', meaning: '쑥쑥 자라고 있네.' }
  ]},
  'ひゃ': { sentences: [
    { japanese: 'ひゃくえんで かえます。', meaning: '100엔으로 살 수 있습니다.' },
    { japanese: 'ひゃくまんえん、ほしい！', meaning: '백만 엔, 갖고 싶어!' }
  ]},
  'ひゅ': { sentences: [
    { japanese: 'ひゅっと かぜが ふきました。', meaning: '쌩하고 바람이 불었습니다.' },
    { japanese: 'ひゅー、かっこいい！', meaning: '휴~ 멋지다!' }
  ]},
  'ひょ': { sentences: [
    { japanese: 'ひょうを みると わかりやすいです。', meaning: '표를 보면 이해하기 쉽습니다.' },
    { japanese: 'ひょうき、おかしいよ。', meaning: '표기가, 이상해.' }
  ]},
  'みゃ': { sentences: [
    { japanese: 'みゃくを はかります。', meaning: '맥박을 잽니다.' },
    { japanese: 'みゃー。', meaning: '먀~ (고양이 소리)' }
  ]},
  'みゅ': { sentences: [
    { japanese: 'ミュージックが すきです。', meaning: '음악을 좋아합니다.' },
    { japanese: 'みゅー、静かだね。', meaning: '뮤~ 조용하네.' }
  ]},
  'みょ': { sentences: [
    { japanese: 'みょうなことが おきました。', meaning: '이상한 일이 일어났습니다.' },
    { japanese: 'みょうじ、なんて読むの？', meaning: '성, 뭐라고 읽어?' }
  ]},
  'りゃ': { sentences: [
    { japanese: 'りゃくして かきます。', meaning: '줄여서 씁니다.' },
    { japanese: 'りゃくだつしない！', meaning: '약탈하지 마!' }
  ]},
  'りゅ': { sentences: [
    { japanese: 'りゅうこうの ファッションを きます。', meaning: '유행하는 패션을 입습니다.' },
    { japanese: 'りゅうちょうだね！', meaning: '유창하네!' }
  ]},
  'りょ': { sentences: [
    { japanese: 'りょこうが だいすきです。', meaning: '여행을 매우 좋아합니다.' },
    { japanese: 'りょうりを おしえて もらいました。', meaning: '요리를 가르쳐 받았습니다.' },
    { japanese: 'りょうしん、元気？', meaning: '부모님, 잘 지내?' },
    { japanese: 'りょくちゃ、飲む？', meaning: '녹차, 마실래?' }
  ]},
  'ぎゃ': { sentences: [
    { japanese: 'ぎゃくに かんがえると わかります。', meaning: '반대로 생각하면 알 수 있습니다.' },
    { japanese: 'ぎゃー！', meaning: '꺄악!' }
  ]},
  'ぎゅ': { sentences: [
    { japanese: 'ぎゅうにゅうを のみます。', meaning: '우유를 마십니다.' },
    { japanese: 'ぎゅっと 抱きしめて。', meaning: '꼬옥 안아줘.' }
  ]},
  'ぎょ': { sentences: [
    { japanese: 'ぎょうれつが ながいですね。', meaning: '줄이 기네요.' },
    { japanese: 'ぎょえー！', meaning: '꽥!' }
  ]},
  'じゃ': { sentences: [
    { japanese: 'じゃあ、また あとで！', meaning: '그럼, 나중에 또!' },
    { japanese: 'じゃがいもが すきです。', meaning: '감자를 좋아합니다.' },
    { japanese: 'じゃんけん、ポン！', meaning: '가위바위보!' },
    { japanese: 'じゃあ、またね！', meaning: '그럼, 또 봐!' }
  ]},
  'じゅ': { sentences: [
    { japanese: 'じゅぎょうが はじまります。', meaning: '수업이 시작됩니다.' },
    { japanese: 'じゅうしょを かいてください。', meaning: '주소를 써주세요.' },
    { japanese: 'じゅーす、飲もう！', meaning: '주스, 마시자!' },
    { japanese: 'じゅうじつした 一日だった。', meaning: '알찬 하루였다.' }
  ]},
  'じょ': { sentences: [
    { japanese: 'じょうずに なりたいです。', meaning: '능숙해지고 싶습니다.' },
    { japanese: 'じょうほうを あつめています。', meaning: '정보를 모으고 있습니다.' },
    { japanese: 'じょーずじゃん！', meaning: '잘하네!' },
    { japanese: 'じょしゅ、お願いします。', meaning: '조수, 부탁합니다.' }
  ]},
  'びゃ': { sentences: [
    { japanese: 'びゃくやのくに いってみたい。', meaning: '백야의 나라에 가보고 싶어요.' },
    { japanese: 'びゃー、って鳴く鳥。', meaning: '삐약, 하고 우는 새.' }
  ]},
  'びゅ': { sentences: [
    { japanese: 'びゅっと はしります。', meaning: '획 달립니다.' },
    { japanese: 'びゅんびゅん 飛ばそう！', meaning: '쌩쌩 날아가자!' }
  ]},
  'びょ': { sentences: [
    { japanese: 'びょういんに いかなければ なりません。', meaning: '병원에 가야 합니다.' },
    { japanese: 'びょーきじゃないよ。', meaning: '병 아니야.' }
  ]},
  'ぴゃ': { sentences: [
    { japanese: 'ぴゃっと おどろきました。', meaning: '깜짝 놀랐습니다.' },
    { japanese: 'ぴゃー！', meaning: '피야-!' }
  ]},
  'ぴゅ': { sentences: [
    { japanese: 'ぴゅっと とびだしました。', meaning: '휙 튀어나왔습니다.' },
    { japanese: 'ぴゅーって風が吹く。', meaning: '휙 하고 바람이 분다.' }
  ]},
  'ぴょ': { sentences: [
    { japanese: 'ぴょんぴょん とびます。', meaning: '깡충깡충 뜁니다.' },
    { japanese: 'ぴょこんと顔を出す。', meaning: '빼꼼 나타나다.' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 탁음 (ガ行~ボ)
  // ══════════════════════════════════════════

  'ガ': { sentences: [
    { japanese: 'ガイドブックで しらべます。', meaning: '가이드북으로 조사합니다.' },
    { japanese: 'ガスを とめて ください。', meaning: '가스를 잠가주세요.' },
    { japanese: 'ガイド、お願いできる？', meaning: '가이드, 부탁할 수 있을까?' },
    { japanese: 'ガム、食べる？', meaning: '껌, 먹을래?' }
  ]},
  'ギ': { sentences: [
    { japanese: 'ギターを ひきます。', meaning: '기타를 칩니다.' },
    { japanese: 'ギネス記録、見てみたい！', meaning: '기네스 기록, 보고 싶어!' }
  ]},
  'グ': { sentences: [
    { japanese: 'グループで はなしあいます。', meaning: '그룹으로 토론합니다.' },
    { japanese: 'グラスに みずを いれます。', meaning: '잔에 물을 넣습니다.' },
    { japanese: 'グーグルで 検索しよう。', meaning: '구글에서 검색하자.' },
    { japanese: 'グッズ、買っちゃった！', meaning: '굿즈, 사버렸다!' }
  ]},
  'ゲ': { sentences: [
    { japanese: 'ゲームを するのが すきです。', meaning: '게임하는 것을 좋아합니다.' },
    { japanese: 'ゲットだぜ！', meaning: '잡았다!' }
  ]},
  'ゴ': { sentences: [
    { japanese: 'ゴルフを します。', meaning: '골프를 칩니다.' },
    { japanese: 'ゴミを すてないで ください。', meaning: '쓰레기를 버리지 마세요.' },
    { japanese: 'ゴールまで あと少し！', meaning: '골까지 이제 조금!' },
    { japanese: 'ゴーグル、忘れた！', meaning: '고글, 잊어버렸다!' }
  ]},
  'ザ': { sentences: [
    { japanese: 'ザックに にもつを いれます。', meaning: '잭에 짐을 넣습니다.' },
    { japanese: 'ザーザー雨が降る。', meaning: '주룩주룩 비가 내린다.' }
  ]},
  'ジ': { sentences: [
    { japanese: 'ジュースを のみます。', meaning: '주스를 마십니다.' },
    { japanese: 'ジムで うんどうします。', meaning: '헬스장에서 운동합니다.' },
    { japanese: 'ジャム、塗って食べる？', meaning: '잼, 발라서 먹을래?' },
    { japanese: 'ジーパン、買いに行こう！', meaning: '청바지, 사러 가자!' }
  ]},
  'ズ': { sentences: [
    { japanese: 'ズボンを はきます。', meaning: '바지를 입습니다.' },
    { japanese: 'ズームイン！', meaning: '줌 인!' }
  ]},
  'ゼ': { sentences: [
    { japanese: 'ゼロから はじめます。', meaning: '제로부터 시작합니다.' },
    { japanese: 'ゼリー、冷やしといたよ。', meaning: '젤리, 차갑게 해뒀어.' }
  ]},
  'ゾ': { sentences: [
    { japanese: 'ゾーンに はいって しゅうちゅうします。', meaning: '존에 들어가서 집중합니다.' },
    { japanese: 'ぞろぞろと人が集まる。', meaning: '우르르 사람들이 모인다.' }
  ]},
  'ダ': { sentences: [
    { japanese: 'ダイエットを しています。', meaning: '다이어트를 하고 있습니다.' },
    { japanese: 'ダウンロードに じかんが かかります。', meaning: '다운로드에 시간이 걸립니다.' },
    { japanese: 'ダメだよ！', meaning: '안 돼!' },
    { japanese: 'ダイエット、頑張ろうね。', meaning: '다이어트, 힘내자.' }
  ]},
  'ヂ': { sentences: [
    { japanese: 'ヂストロフィーは びょうきです。', meaning: '이영양증은 병입니다.' },
    { japanese: 'ヂヂヂ…って音がする。', meaning: '지직… 하고 소리가 난다.' }
  ]},
  'ヅ': { sentences: [
    { japanese: 'ヅカのこうえんを みました。', meaning: '다카라즈카 공연을 봤습니다.' },
    { japanese: 'つづけて いい？', meaning: '계속해도 돼?' }
  ]},
  'デ': { sentences: [
    { japanese: 'デパートで かいものします。', meaning: '백화점에서 쇼핑합니다.' },
    { japanese: 'デザートを たべます。', meaning: '디저트를 먹습니다.' },
    { japanese: 'デート、楽しみだね！', meaning: '데이트, 기대된다!' },
    { japanese: 'デザートは 別腹！', meaning: '디저트는 딴 배!' }
  ]},
  'ド': { sentences: [
    { japanese: 'ドアを しめて ください。', meaning: '문을 닫아주세요.' },
    { japanese: 'ドライブに いきます。', meaning: '드라이브를 갑니다.' },
    { japanese: 'ドキドキする！', meaning: '두근거린다!' },
    { japanese: 'ドリンクバー、行かない？', meaning: '음료수바, 안 갈래?' }
  ]},
  'バ': { sentences: [
    { japanese: 'バスで いきます。', meaning: '버스로 갑니다.' },
    { japanese: 'バーゲンで やすく かいました。', meaning: '바겐세일에서 싸게 샀습니다.' },
    { japanese: 'バイト、いつ入ってる？', meaning: '알바, 언제 있어?' },
    { japanese: 'バッグ、持ってあげる。', meaning: '가방, 들어줄게.' }
  ]},
  'ビ': { sentences: [
    { japanese: 'ビールを いっぱい のみます。', meaning: '맥주 한 잔 마십니다.' },
    { japanese: 'ビジネスクラスは たかいです。', meaning: '비즈니스 클래스는 비쌉니다.' },
    { japanese: 'びっくり！', meaning: '깜짝이야!' },
    { japanese: 'ビール、奢るよ！', meaning: '맥주, 내가 쏠게!' }
  ]},
  'ブ': { sentences: [
    { japanese: 'ブランドのバッグを かいました。', meaning: '브랜드 가방을 샀습니다.' },
    { japanese: 'ブラジル料理、食べに行こう！', meaning: '브라질 요리, 먹으러 가자!' }
  ]},
  'ベ': { sentences: [
    { japanese: 'ベッドで やすみます。', meaning: '침대에서 쉽니다.' },
    { japanese: 'べんりな アプリです。', meaning: '편리한 앱입니다.' },
    { japanese: 'ベストな選択だね。', meaning: '최고의 선택이네.' },
    { japanese: 'ベンチで 休憩しよう。', meaning: '벤치에서 쉬자.' }
  ]},
  'ボ': { sentences: [
    { japanese: 'ボランティアに さんかします。', meaning: '봉사활동에 참가합니다.' },
    { japanese: 'ボタンを おして ください。', meaning: '버튼을 눌러주세요.' },
    { japanese: 'ボール、投げよう！', meaning: '공, 던지자!' },
    { japanese: 'ボロボロだね。', meaning: '너덜너덜하네.' }
  ]},
  'パ': { sentences: [
    { japanese: 'パスポートを みせて ください。', meaning: '여권을 보여주세요.' },
    { japanese: 'パーティーに しょうたいされました。', meaning: '파티에 초대받았습니다.' },
    { japanese: 'パンケーキ、食べに行こう！', meaning: '팬케이크, 먹으러 가자!' },
    { japanese: 'パソコン、調子どう？', meaning: '컴퓨터, 상태 어때?' }
  ]},
  'ピ': { sentences: [
    { japanese: 'ピザを ちゅうもんします。', meaning: '피자를 주문합니다.' },
    { japanese: 'ピーマン、嫌いなんだ。', meaning: '피망, 싫어해.' }
  ]},
  'プ': { sentences: [
    { japanese: 'プレゼントを かいます。', meaning: '선물을 삽니다.' },
    { japanese: 'プールで およぎます。', meaning: '수영장에서 수영합니다.' },
    { japanese: 'プリン、買ってきたよ！', meaning: '푸딩, 사왔어!' },
    { japanese: 'プロジェクト、頑張ろうね。', meaning: '프로젝트, 힘내자.' }
  ]},
  'ペ': { sentences: [
    { japanese: 'ペットボトルを リサイクルします。', meaning: '페트병을 재활용합니다.' },
    { japanese: 'ペン、貸して！', meaning: '펜, 빌려줘!' }
  ]},
  'ポ': { sentences: [
    { japanese: 'ポイントカードを もっています。', meaning: '포인트 카드를 가지고 있습니다.' },
    { japanese: 'ポストに てがみを いれます。', meaning: '우편함에 편지를 넣습니다.' },
    { japanese: 'ポテトチップス、食べる？', meaning: '포테이토 칩, 먹을래?' },
    { japanese: 'ポーズ、決めて！', meaning: '포즈, 잡아봐!' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 요음 (キャ, シャ 등)
  // ══════════════════════════════════════════

  'キャ': { sentences: [
    { japanese: 'キャッシュレスで はらいます。', meaning: '캐시리스로 지불합니다.' },
    { japanese: 'キャベツ、買ってきてくれる？', meaning: '양배추, 사다 줄래?' }
  ]},
  'キュ': { sentences: [
    { japanese: 'キュウリのサラダが すきです。', meaning: '오이 샐러드를 좋아합니다.' },
    { japanese: 'キュートだね！', meaning: '귀엽네!' }
  ]},
  'キョ': { sentences: [
    { japanese: 'キョウトに いったことが あります。', meaning: '교토에 간 적이 있습니다.' },
    { japanese: '今日の予定、教えて！', meaning: '오늘 예정, 알려줘!' }
  ]},
  'シャ': { sentences: [
    { japanese: 'シャワーを あびます。', meaning: '샤워를 합니다.' },
    { japanese: 'シャッターチャンス！', meaning: '셔터 찬스!' }
  ]},
  'シュ': { sentences: [
    { japanese: 'シュークリームを たべます。', meaning: '슈크림을 먹습니다.' },
    { japanese: 'シュート、決めろ！', meaning: '슛, 넣어라!' }
  ]},
  'ショ': { sentences: [
    { japanese: 'ショッピングに いきます。', meaning: '쇼핑을 갑니다.' },
    { japanese: 'ショーを みました。きれいでした。', meaning: '쇼를 봤습니다. 예뻤습니다.' },
    { japanese: 'ショックだね。', meaning: '충격이네.' },
    { japanese: 'ショートケーキ、美味しいね。', meaning: '쇼트케이크, 맛있네.' }
  ]},
  'チャ': { sentences: [
    { japanese: 'チャンスを いかします。', meaning: '기회를 살립니다.' },
    { japanese: 'チャージ、お願いします。', meaning: '충전, 부탁합니다.' }
  ]},
  'チュ': { sentences: [
    { japanese: 'チューブで みます。', meaning: '튜브로 봅니다.' },
    { japanese: 'チューリップ、咲いたね。', meaning: '튤립, 피었네.' }
  ]},
  'チョ': { sentences: [
    { japanese: 'チョコレートが だいすきです。', meaning: '초콜릿을 매우 좋아합니다.' },
    { japanese: 'ちょっと待ってね。', meaning: '잠깐 기다려줘.' }
  ]},
  'ニャ': { sentences: [
    { japanese: 'ニャンコが かわいいです。', meaning: '야옹이가 귀엽습니다.' },
    { japanese: 'ニャーゴ。', meaning: '야옹-.' }
  ]},
  'ニュ': { sentences: [
    { japanese: 'ニュースを よんで じょうほうを しります。', meaning: '뉴스를 읽고 정보를 알게 됩니다.' },
    { japanese: 'ニュアンスが 難しいね。', meaning: '뉘앙스가 어렵네.' }
  ]},
  'ニョ': { sentences: [
    { japanese: 'ニョッキを たべました。', meaning: '뇨끼를 먹었습니다.' },
    { japanese: 'ニョロニョロしてる。', meaning: '미끌미끌해.' }
  ]},
  'ヒャ': { sentences: [
    { japanese: 'ヒャクえんショップは やすいです。', meaning: '100엔숍은 쌉니다.' },
    { japanese: 'ヒャッハー！', meaning: '햐하!' }
  ]},
  'ヒュ': { sentences: [
    { japanese: 'ヒューズが とびました。', meaning: '퓨즈가 끊어졌습니다.' },
    { japanese: 'ヒューヒュー。', meaning: '휘유휘유 (휘파람 소리).' }
  ]},
  'ヒョ': { sentences: [
    { japanese: 'ヒョウが ふりました。', meaning: '우박이 내렸습니다.' },
    { japanese: 'ヒョコヒョコ歩く。', meaning: '총총 걷다.' }
  ]},
  'ミャ': { sentences: [
    { japanese: 'ミャンマーに いきたいです。', meaning: '미얀마에 가고 싶습니다.' },
    { japanese: 'ミャーオ。', meaning: '먀오 (고양이 소리).' }
  ]},
  'ミュ': { sentences: [
    { japanese: 'ミュージカルを みました。', meaning: '뮤지컬을 봤습니다.' },
    { japanese: 'ミュートして。', meaning: '뮤트해.' }
  ]},
  'ミョ': { sentences: [
    { japanese: 'ミョウバンを つかいます。', meaning: '명반을 사용합니다.' },
    { japanese: 'ミョーな感じ。', meaning: '묘한 느낌.' }
  ]},
  'リャ': { sentences: [
    { japanese: 'リャカーで はこびます。', meaning: '리어카로 운반합니다.' },
    { japanese: 'リャンメン待ち。', meaning: '양면 대기.' }
  ]},
  'リュ': { sentences: [
    { japanese: 'リュックを せおって でかけます。', meaning: '백팩을 메고 외출합니다.' },
    { japanese: 'リュック、重そう。', meaning: '백팩, 무거워 보여.' }
  ]},
  'リョ': { sentences: [
    { japanese: 'リョカンに とまりたいです。', meaning: '여관에 묵고 싶습니다.' },
    { japanese: '旅行、どこ行く？', meaning: '여행, 어디 갈 거야?' },
    { japanese: '寮生活、どう？', meaning: '기숙사 생활, 어때?' },
    { japanese: '了解！', meaning: '알겠어!' }
  ]},
  'ギャ': { sentences: [
    { japanese: 'ギャラリーで えを みます。', meaning: '갤러리에서 그림을 봅니다.' },
    { japanese: 'ギャグ、つまんない。', meaning: '개그, 재미없어.' }
  ]},
  'ギュ': { sentences: [
    { japanese: 'ギュウニュウを まいにち のみます。', meaning: '우유를 매일 마십니다.' },
    { japanese: 'ギュッと 抱きしめて。', meaning: '꼬옥 안아줘.' }
  ]},
  'ギョ': { sentences: [
    { japanese: 'ギョウザが だいすきです。', meaning: '교자(군만두)를 매우 좋아합니다.' },
    { japanese: 'ギョギョ！', meaning: '겻겻! (물고기 소리)' }
  ]},
  'ジャ': { sentences: [
    { japanese: 'ジャケットを きます。', meaning: '자켓을 입습니다.' },
    { japanese: 'ジャンプ、できる？', meaning: '점프, 할 수 있어?' }
  ]},
  'ジュ': { sentences: [
    { japanese: 'ジュースを のみます。', meaning: '주스를 마십니다.' },
    { japanese: 'ジュエリー、見に行こう！', meaning: '주얼리, 보러 가자!' }
  ]},
  'ジョ': { sentences: [
    { japanese: 'ジョギングを まいあさ します。', meaning: '조깅을 매일 아침 합니다.' },
    { japanese: 'ジョーク、言わないで。', meaning: '농담, 하지 마.' }
  ]},
  'ビャ': { sentences: [
    { japanese: 'ビャクヤのくにに いきたい。', meaning: '백야의 나라에 가고 싶어요.' },
    { japanese: 'ビャー。', meaning: '삐약.' }
  ]},
  'ビュ': { sentences: [
    { japanese: 'ビュッフェを たのしみます。', meaning: '뷔페를 즐깁니다.' },
    { japanese: 'ビュン！', meaning: '붕! (빠르게 날아가는 소리)' }
  ]},
  'ビョ': { sentences: [
    { japanese: 'ビョウインに いきます。', meaning: '병원에 갑니다.' },
    { japanese: 'ビョーって飛んでった。', meaning: '뿅 하고 날아갔다.' }
  ]},
  'ピャ': { sentences: [
    { japanese: 'ピャノを ならっています。', meaning: '피아노를 배우고 있습니다.' },
    { japanese: 'ピャ！', meaning: '피얏!' }
  ]},
  'ピュ': { sentences: [
    { japanese: 'ピュアな こころが たいせつです。', meaning: '순수한 마음이 소중합니다.' },
    { japanese: 'ピューって飛んでいった。', meaning: '휙 하고 바람이 분다.' }
  ]},
  'ピョ': { sentences: [
    { japanese: 'ピョンピョン とびます。', meaning: '깡충깡충 뜁니다.' },
    { japanese: 'ピョコッと顔を出す。', meaning: '빼꼼 나타나다.' }
  ]},

  // ══════════════════════════════════════════
  //  특수 박자 (Level 9)
  // ══════════════════════════════════════════

  'っ': { sentences: [
    { japanese: 'きって を 10まい ください。', meaning: '우표를 10장 주세요.' },
    { japanese: 'いっぱい たべて ください。', meaning: '많이 드세요.' },
    { japanese: 'ざっし を よみます。', meaning: '잡지를 읽습니다.' }
  ]},
  'ッ': { sentences: [
    { japanese: 'バッグを かいました。', meaning: '가방을 샀습니다.' },
    { japanese: 'ベッドで ねます。', meaning: '침대에서 잡니다.' }
  ]},
  'ー': { sentences: [
    { japanese: 'コーヒーを のみます。', meaning: '커피를 마십니다.' },
    { japanese: 'ケーキを たべました。', meaning: '케이크를 먹었습니다.' },
    { japanese: 'スーパーで かいものを します。', meaning: '슈퍼마켓에서 쇼핑을 합니다.' }
  ]},
  'おう': { sentences: [
    { japanese: 'おとうさんは げんきですか？', meaning: '아버지는 건강하세요? (おとう→おとー)' },
    { japanese: 'ゆっくり ほんを よみましょう。', meaning: '천천히 책을 읽읍시다. (よみましょう: ō 장음)' }
  ]},
  'えい': { sentences: [
    { japanese: 'えいがを みに いきます。', meaning: '영화를 보러 갑니다. (えいが: ei→ē)' },
    { japanese: 'せんせいに おしえて もらいました。', meaning: '선생님께 배웠습니다。 (せんせい: ei→ē)' }
  ]},
  'ああ': { sentences: [
    { japanese: 'おかあさんは りょうりが じょうずです。', meaning: '어머니는 요리를 잘합니다。 (おかあさん: aa→ā)' }
  ]},
  'いい': { sentences: [
    { japanese: 'おにいさんは どこですか？', meaning: '오빠/형은 어디입니까? (おにいさん: ii→ī)' }
  ]},
  'うう': { sentences: [
    { japanese: 'くうこうに むかいます。', meaning: '공항으로 향합니다。 (くうこう: uu→ū)' }
  ]},

  // ══════════════════════════════════════════
  //  조사 읽기 예외 (Level 11)
  // ══════════════════════════════════════════

  'は_p': { sentences: [
    { japanese: 'わたし は にほんじんです。', meaning: '나는 일본인입니다. (は→wa 조사)' },
    { japanese: 'これ は いくらですか？', meaning: '이것은 얼마입니까? (は→wa 조사)' }
  ]},
  'へ_p': { sentences: [
    { japanese: 'にほん へ いきます。', meaning: '일본으로 갑니다. (へ→e 조사)' },
    { japanese: 'えき へ の みちを おしえて。', meaning: '역으로 가는 길을 알려줘. (へ→e 조사)' }
  ]},
  'を_p': { sentences: [
    { japanese: 'みず を のみます。', meaning: '물을 마십니다. (を→o 조사)' },
    { japanese: 'みち を あるきます。', meaning: '길을 걷습니다. (を→o 조사)' }
  ]},

  // ══════════════════════════════════════════
  //  외래어 가타카나 확장 (Level 10)
  // ══════════════════════════════════════════

  'ファ': { sentences: [
    { japanese: 'ファッションが すきです。', meaning: '패션을 좋아합니다.' },
    { japanese: 'ファイルを おくります。', meaning: '파일을 보냅니다.' }
  ]},
  'フィ': { sentences: [
    { japanese: 'フィットネスクラブに いきます。', meaning: '피트니스 클럽에 갑니다.' }
  ]},
  'フェ': { sentences: [
    { japanese: 'フェリーで しまへ いきます。', meaning: '페리로 섬에 갑니다.' }
  ]},
  'フォ': { sentences: [
    { japanese: 'フォークで たべます。', meaning: '포크로 먹습니다.' },
    { japanese: 'フォトを とります。', meaning: '포토(사진)를 찍습니다.' }
  ]},
  'ティ': { sentences: [
    { japanese: 'パーティーに さんかします。', meaning: '파티에 참가합니다.' }
  ]},
  'ディ': { sentences: [
    { japanese: 'ディズニーランドに いきたい。', meaning: '디즈니랜드에 가고 싶어요.' }
  ]},
  'トゥ': { sentences: [
    { japanese: 'トゥーリストに やさしい まちです。', meaning: '관광객에게 친절한 도시입니다.' }
  ]},
  'ドゥ': { sentences: [
    { japanese: 'ドゥエットで うたいます。', meaning: '듀엣으로 노래합니다.' }
  ]},
  'ウィ': { sentences: [
    { japanese: 'ウィンドウショッピングを します。', meaning: '윈도 쇼핑을 합니다.' }
  ]},
  'ウェ': { sentences: [
    { japanese: 'ウェブサイトを みます。', meaning: '웹사이트를 봅니다.' }
  ]},
  'ウォ': { sentences: [
    { japanese: 'ウォーキングを します。', meaning: '워킹을 합니다.' }
  ]},
  'チェ': { sentences: [
    { japanese: 'チェックインを します。', meaning: '체크인을 합니다.' },
    { japanese: 'チェスを あそびます。', meaning: '체스를 합니다.' }
  ]},
  'シェ': { sentences: [
    { japanese: 'シェフの りょうりは おいしいです。', meaning: '셰프의 요리는 맛있습니다.' }
  ]},
  'ジェ': { sentences: [
    { japanese: 'ジェットコースターに のります。', meaning: '롤러코스터를 탑니다.' }
  ]},
  'ヴ': { sentences: [
    { japanese: 'ヴィオリンを えんそうします。', meaning: '바이올린을 연주합니다.' }
  ]},
  'ヴァ': { sentences: [
    { japanese: 'ヴァイオリンの おんがくが きれいです。', meaning: '바이올린 음악이 아름답습니다.' }
  ]},
  'ヴィ': { sentences: [
    { japanese: 'ヴィラで やすみます。', meaning: '빌라에서 쉽니다.' }
  ]},
  'ヴェ': { sentences: [
    { japanese: 'ヴェネツィアを りょこうしました。', meaning: '베네치아를 여행했습니다.' }
  ]},
  'ヴォ': { sentences: [
    { japanese: 'ヴォーカルが じょうずです。', meaning: '보컬이 능숙합니다.' }
  ]},
  'イェ': { sentences: [
    { japanese: 'イェスと いってください。', meaning: '예스라고 말해주세요.' }
  ]}

}; // end EXAMPLES_DB