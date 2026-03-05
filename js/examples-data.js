// ============================================================
//  KANA MASTER - 가나 문장 예시 데이터베이스
//  별도 파일로 관리 — 직접 수정·업로드하여 업데이트 가능
// ============================================================
//
//  형식:
//  EXAMPLES_DB['가나문자'] = {
//    sentences: [
//      { japanese: '일본어 문장', reading: '읽기 [점·구분]', meaning: '한국어 뜻' },
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
    { japanese: 'あそこに バス停が あります。', reading: 'a·so·ko·ni ba·su·te·i·ga a·ri·ma·su', meaning: '저기에 버스 정류장이 있습니다.' },
    { japanese: 'あの えいがは とても おもしろかった。', reading: 'a·no e·i·ga·wa to·te·mo o·mo·shi·ro·kat·ta', meaning: '저 영화는 정말 재미있었어요.' },
    { japanese: 'あさ 6時に おきます。', reading: 'a·sa ro·ku·ji·ni o·ki·ma·su', meaning: '아침 6시에 일어납니다.' },
    { japanese: 'あ、わすれた！', reading: 'a, wa·su·re·ta', meaning: '아, 잊어버렸어!' }
  ]},

  'い': { sentences: [
    { japanese: 'いえに かえって シャワーを あびます。', reading: 'i·e·ni ka·et·te sha·wā·wo a·bi·ma·su', meaning: '집에 돌아가서 샤워를 합니다.' },
    { japanese: 'いま なんじ ですか？', reading: 'i·ma nan·ji de·su·ka', meaning: '지금 몇 시입니까?' },
    { japanese: 'いいえ、ちがいます。', reading: 'ī·e, chi·ga·i·ma·su', meaning: '아니요, 다릅니다.' },
    { japanese: 'いちばん すきな たべものは なんですか？', reading: 'i·chi·ban su·ki·na ta·be·mo·no·wa nan·de·su·ka', meaning: '가장 좋아하는 음식은 무엇입니까?' }
  ]},

  'う': { sentences: [
    { japanese: 'うみで およいで たのしかった。', reading: 'u·mi·de o·yo·i·de ta·no·shi·kat·ta', meaning: '바다에서 수영해서 즐거웠어요.' },
    { japanese: 'うたを うたいながら あるきます。', reading: 'u·ta·wo u·ta·i·na·ga·ra a·ru·ki·ma·su', meaning: '노래를 부르면서 걷습니다.' },
    { japanese: 'うわ、すごい けしきだ！', reading: 'u·wa, su·go·i ke·shi·ki·da', meaning: '와, 멋진 경치다!' },
    { japanese: 'うちに あそびに きて ください。', reading: 'u·chi·ni a·so·bi·ni ki·te ku·da·sa·i', meaning: '우리 집에 놀러 오세요.' }
  ]},

  'え': { sentences: [
    { japanese: 'えきまで どうやって いきますか？', reading: 'e·ki·ma·de dō·yat·te i·ki·ma·su·ka', meaning: '역까지 어떻게 갑니까?' },
    { japanese: 'えいごで はなせますか？', reading: 'e·i·go·de ha·na·se·ma·su·ka', meaning: '영어로 말할 수 있나요?' },
    { japanese: 'えを かくのが すきです。', reading: 'e·wo ka·ku·no·ga su·ki·de·su', meaning: '그림 그리는 것을 좋아합니다.' },
    { japanese: 'え、ほんとうですか？', reading: 'e, hon·tō·de·su·ka', meaning: '어, 정말입니까?' }
  ]},

  'お': { sentences: [
    { japanese: 'おちゃを いっぱい いかがですか？', reading: 'o·cha·wo ip·pai i·ka·ga·de·su·ka', meaning: '차 한 잔 어떠세요?' },
    { japanese: 'おはよう ございます。きょうも がんばりましょう。', reading: 'o·ha·yō go·za·i·ma·su. kyō·mo gan·ba·ri·ma·shō', meaning: '안녕하세요. 오늘도 힘냅시다.' },
    { japanese: 'おかあさんに でんわを します。', reading: 'o·kā·san·ni den·wa·wo shi·ma·su', meaning: '어머니께 전화를 합니다.' },
    { japanese: 'おつかれさまでした。', reading: 'o·tsu·ka·re·sa·ma·de·shi·ta', meaning: '수고하셨습니다.' }
  ]},

  'か': { sentences: [
    { japanese: 'かれは まいにち かいしゃへ いきます。', reading: 'ka·re·wa ma·i·ni·chi ka·i·sha·e i·ki·ma·su', meaning: '그는 매일 회사에 갑니다.' },
    { japanese: 'かばんを なくして こまっています。', reading: 'ka·ban·wo na·ku·shi·te ko·mat·te·i·ma·su', meaning: '가방을 잃어버려 곤란합니다.' },
    { japanese: 'かようびに あいましょう。', reading: 'ka·yō·bi·ni a·i·ma·shō', meaning: '화요일에 만납시다.' },
    { japanese: 'かわいい ねこが いますね。', reading: 'ka·wa·ī ne·ko·ga i·ma·su·ne', meaning: '귀여운 고양이가 있네요.' }
  ]},

  'き': { sentences: [
    { japanese: 'きょうは てんきが いいですね。', reading: 'kyō·wa ten·ki·ga ī·de·su·ne', meaning: '오늘은 날씨가 좋네요.' },
    { japanese: 'きって10まいを ください。', reading: 'kit·te jū·mai·wo ku·da·sa·i', meaning: '우표 10장 주세요.' },
    { japanese: 'きみが すきだよ。', reading: 'ki·mi·ga su·ki·da·yo', meaning: '너를 좋아해.' },
    { japanese: 'きいろい はなが さいています。', reading: 'ki·i·ro·i ha·na·ga sa·i·te·i·ma·su', meaning: '노란 꽃이 피어 있습니다.' }
  ]},

  'く': { sentences: [
    { japanese: 'くるまで いきますか、でんしゃで いきますか？', reading: 'ku·ru·ma·de i·ki·ma·su·ka, den·sha·de i·ki·ma·su·ka', meaning: '차로 갑니까, 전철로 갑니까?' },
    { japanese: 'くだものを たくさん たべます。', reading: 'ku·da·mo·no·wo ta·ku·san ta·be·ma·su', meaning: '과일을 많이 먹습니다.' },
    { japanese: 'くつを はいて ください。', reading: 'ku·tsu·wo ha·i·te ku·da·sa·i', meaning: '신발을 신어 주세요.' },
    { japanese: 'くうきが きれいですね。', reading: 'kū·ki·ga ki·re·i·de·su·ne', meaning: '공기가 맑네요.' }
  ]},

  'け': { sentences: [
    { japanese: 'けがを しないように きを つけて ください。', reading: 'ke·ga·wo shi·na·i·yō·ni ki·wo tsu·ke·te ku·da·sa·i', meaning: '다치지 않도록 조심해 주세요.' },
    { japanese: 'けっこんしきは らいねんです。', reading: 'kek·kon·shi·ki·wa ra·i·nen·de·su', meaning: '결혼식은 내년입니다.' },
    { japanese: 'けいたいを わすれました。', reading: 'ke·i·ta·i·wo wa·su·re·ma·shi·ta', meaning: '핸드폰을 잊었습니다.' },
    { japanese: 'けっこうです。ありがとう。', reading: 'kek·kō·de·su. a·ri·ga·tō', meaning: '됐어요. 감사합니다.' }
  ]},

  'こ': { sentences: [
    { japanese: 'ここは どこですか？', reading: 'ko·ko·wa do·ko·de·su·ka', meaning: '여기는 어디입니까?' },
    { japanese: 'こどもたちが こうえんで あそんでいます。', reading: 'ko·do·mo·ta·chi·ga kō·en·de a·son·de·i·ma·su', meaning: '아이들이 공원에서 놀고 있습니다.' },
    { japanese: 'これは いくらですか？', reading: 'ko·re·wa i·ku·ra·de·su·ka', meaning: '이것은 얼마입니까?' },
    { japanese: 'こんにちは！おげんきですか？', reading: 'kon·ni·chi·wa! o·gen·ki·de·su·ka', meaning: '안녕하세요! 잘 지내시나요?' }
  ]},

  'さ': { sentences: [
    { japanese: 'さくらが きれいに さいています。', reading: 'sa·ku·ra·ga ki·re·i·ni sa·i·te·i·ma·su', meaning: '벚꽃이 예쁘게 피어 있습니다.' },
    { japanese: 'さいふを なくして こまっています。', reading: 'sa·i·fu·wo na·ku·shi·te ko·mat·te·i·ma·su', meaning: '지갑을 잃어버려 곤란합니다.' },
    { japanese: 'さあ、はじめましょう！', reading: 'sā, ha·ji·me·ma·shō', meaning: '자, 시작합시다!' },
    { japanese: 'さいきん にほんごが うまくなりました。', reading: 'sa·i·kin ni·hon·go·ga u·ma·ku·na·ri·ma·shi·ta', meaning: '최근 일본어가 늘었습니다.' }
  ]},

  'し': { sentences: [
    { japanese: 'しごとは なんですか？', reading: 'shi·go·to·wa nan·de·su·ka', meaning: '직업은 무엇입니까?' },
    { japanese: 'しずかに して ください。', reading: 'shi·zu·ka·ni shi·te ku·da·sa·i', meaning: '조용히 해주세요.' },
    { japanese: 'しゃしんを とっても いいですか？', reading: 'sha·shin·wo tot·te·mo ī·de·su·ka', meaning: '사진 찍어도 됩니까?' },
    { japanese: 'しんかんせんで きょうとへ いきます。', reading: 'shin·kan·sen·de kyō·to·e i·ki·ma·su', meaning: '신칸센으로 교토에 갑니다.' }
  ]},

  'す': { sentences: [
    { japanese: 'すしが だいすきです。', reading: 'su·shi·ga da·i·su·ki·de·su', meaning: '초밥을 매우 좋아합니다.' },
    { japanese: 'すみません、トイレは どこですか？', reading: 'su·mi·ma·sen, to·i·re·wa do·ko·de·su·ka', meaning: '실례합니다, 화장실은 어디입니까?' },
    { japanese: 'すぐ もどりますので、まって ください。', reading: 'su·gu mo·do·ri·ma·su·no·de, mat·te ku·da·sa·i', meaning: '금방 돌아오니 기다려 주세요.' },
    { japanese: 'すてきな いえですね。', reading: 'su·te·ki·na i·e·de·su·ne', meaning: '멋진 집이네요.' }
  ]},

  'せ': { sentences: [
    { japanese: 'せんせいに しつもんを します。', reading: 'sen·se·i·ni shi·tsu·mon·wo shi·ma·su', meaning: '선생님께 질문을 합니다.' },
    { japanese: 'せかいじゅうを りょこう したいです。', reading: 'se·ka·i·jū·wo ryo·kō shi·ta·i·de·su', meaning: '전 세계를 여행하고 싶습니다.' },
    { japanese: 'せんたくを するのを わすれました。', reading: 'sen·ta·ku·wo su·ru·no·wo wa·su·re·ma·shi·ta', meaning: '빨래 하는 것을 잊었습니다.' },
    { japanese: 'せんしゅうは いそがしかったです。', reading: 'sen·shū·wa i·so·ga·shi·kat·ta·de·su', meaning: '지난주는 바빴습니다.' }
  ]},

  'そ': { sentences: [
    { japanese: 'そこに すわって ください。', reading: 'so·ko·ni su·wat·te ku·da·sa·i', meaning: '거기에 앉아주세요.' },
    { japanese: 'それは なんですか？', reading: 'so·re·wa nan·de·su·ka', meaning: '그것은 무엇입니까?' },
    { japanese: 'そうですか。わかりました。', reading: 'sō·de·su·ka. wa·ka·ri·ma·shi·ta', meaning: '그렇군요. 알겠습니다.' },
    { japanese: 'そとは さむいですね。', reading: 'so·to·wa sa·mu·i·de·su·ne', meaning: '밖은 춥네요.' }
  ]},

  'た': { sentences: [
    { japanese: 'たべものが おいしかった！', reading: 'ta·be·mo·no·ga o·i·shi·kat·ta', meaning: '음식이 맛있었어요!' },
    { japanese: 'たのしい りょこうに なりましたね。', reading: 'ta·no·shi·i ryo·kō·ni na·ri·ma·shi·ta·ne', meaning: '즐거운 여행이 되었네요.' },
    { japanese: 'たくさん べんきょうして つかれました。', reading: 'ta·ku·san ben·kyō·shi·te tsu·ka·re·ma·shi·ta', meaning: '많이 공부해서 피곤합니다.' },
    { japanese: 'たいようが まぶしいですね。', reading: 'ta·i·yō·ga ma·bu·shi·i·de·su·ne', meaning: '태양이 눈부시네요.' }
  ]},

  'ち': { sentences: [
    { japanese: 'ちかてつで えきまで いきます。', reading: 'chi·ka·te·tsu·de e·ki·ma·de i·ki·ma·su', meaning: '지하철로 역까지 갑니다.' },
    { japanese: 'ちょっと まって ください。', reading: 'chot·to mat·te ku·da·sa·i', meaning: '잠깐 기다려 주세요.' },
    { japanese: 'ちがいます。これです。', reading: 'chi·ga·i·ma·su. ko·re·de·su', meaning: '다릅니다. 이것입니다.' },
    { japanese: 'ちずを みながら あるきました。', reading: 'chi·zu·wo mi·na·ga·ra a·ru·ki·ma·shi·ta', meaning: '지도를 보면서 걸었습니다.' }
  ]},

  'つ': { sentences: [
    { japanese: 'つぎの でんしゃは なんじですか？', reading: 'tsu·gi·no den·sha·wa nan·ji·de·su·ka', meaning: '다음 전철은 몇 시입니까?' },
    { japanese: 'つかれたので、すこし やすみます。', reading: 'tsu·ka·re·ta·no·de, su·ko·shi ya·su·mi·ma·su', meaning: '피곤해서 조금 쉽니다.' },
    { japanese: 'つくえの うえに ほんが あります。', reading: 'tsu·ku·e·no u·e·ni hon·ga a·ri·ma·su', meaning: '책상 위에 책이 있습니다.' },
    { japanese: 'つめたい みずを ください。', reading: 'tsu·me·ta·i mi·zu·wo ku·da·sa·i', meaning: '차가운 물을 주세요.' }
  ]},

  'て': { sentences: [
    { japanese: 'てを よく あらって ください。', reading: 'te·wo yo·ku a·rat·te ku·da·sa·i', meaning: '손을 잘 씻어주세요.' },
    { japanese: 'てんきが いいので、さんぽを します。', reading: 'ten·ki·ga ī·no·de, san·po·wo shi·ma·su', meaning: '날씨가 좋아서 산책을 합니다.' },
    { japanese: 'てがみを かいて おくります。', reading: 'te·ga·mi·wo ka·i·te o·ku·ri·ma·su', meaning: '편지를 써서 보냅니다.' },
    { japanese: 'てっぱんやきが たべたいです。', reading: 'tep·pan·ya·ki·ga ta·be·ta·i·de·su', meaning: '철판구이를 먹고 싶습니다.' }
  ]},

  'と': { sentences: [
    { japanese: 'ともだちと えいがを みに いきます。', reading: 'to·mo·da·chi·to e·i·ga·wo mi·ni i·ki·ma·su', meaning: '친구와 영화를 보러 갑니다.' },
    { japanese: 'とても きれいな けしきですね。', reading: 'to·te·mo ki·re·i·na ke·shi·ki·de·su·ne', meaning: '정말 아름다운 경치네요.' },
    { japanese: 'ときどき ひとりで りょこう します。', reading: 'to·ki·do·ki hi·to·ri·de ryo·kō shi·ma·su', meaning: '때때로 혼자 여행합니다.' },
    { japanese: 'とうきょうに いったことが ありますか？', reading: 'tō·kyō·ni it·ta ko·to·ga a·ri·ma·su·ka', meaning: '도쿄에 간 적이 있습니까?' }
  ]},

  'な': { sentences: [
    { japanese: 'なまえと でんわばんごうを おしえて ください。', reading: 'na·ma·e·to den·wa·ban·gō·wo o·shi·e·te ku·da·sa·i', meaning: '이름과 전화번호를 알려주세요.' },
    { japanese: 'なにを たべますか？おすすめは なんですか？', reading: 'na·ni·wo ta·be·ma·su·ka? o·su·su·me·wa nan·de·su·ka', meaning: '무엇을 드실 건가요? 추천이 뭔가요?' },
    { japanese: 'なつやすみに かいがいへ いきたいです。', reading: 'na·tsu·ya·su·mi·ni ka·i·ga·i·e i·ki·ta·i·de·su', meaning: '여름방학에 해외에 가고 싶습니다.' },
    { japanese: 'なにか おてつだいしましょうか？', reading: 'na·ni·ka o·te·tsu·da·i·shi·ma·shō·ka', meaning: '뭔가 도와드릴까요?' }
  ]},

  'に': { sentences: [
    { japanese: 'にほんに きて 3ねんに なります。', reading: 'ni·hon·ni ki·te san·nen·ni na·ri·ma·su', meaning: '일본에 온 지 3년이 됩니다.' },
    { japanese: 'にわに きれいな はなが さいています。', reading: 'ni·wa·ni ki·re·i·na ha·na·ga sa·i·te·i·ma·su', meaning: '정원에 예쁜 꽃이 피어 있습니다.' },
    { japanese: 'にちようびには かぞくと すごします。', reading: 'ni·chi·yō·bi·ni·wa ka·zo·ku·to su·go·shi·ma·su', meaning: '일요일에는 가족과 함께 지냅니다.' },
    { japanese: 'にもつを おくって ください。', reading: 'ni·mo·tsu·wo o·kut·te ku·da·sa·i', meaning: '짐을 보내주세요.' }
  ]},

  'ぬ': { sentences: [
    { japanese: 'ぬいぐるみを プレゼントに もらいました。', reading: 'nu·i·gu·ru·mi·wo pu·re·zen·to·ni mo·ra·i·ma·shi·ta', meaning: '봉제 인형을 선물로 받았습니다.' },
    { japanese: 'ぬれた ものを かわかします。', reading: 'nu·re·ta mo·no·wo ka·wa·ka·shi·ma·su', meaning: '젖은 것을 말립니다.' }
  ]},

  'ね': { sentences: [
    { japanese: 'ねこが そとで ないています。', reading: 'ne·ko·ga so·to·de na·i·te·i·ma·su', meaning: '고양이가 밖에서 울고 있습니다.' },
    { japanese: 'ねむいので、はやく ねます。', reading: 'ne·mu·i·no·de, ha·ya·ku ne·ma·su', meaning: '졸리니 일찍 자겠습니다.' },
    { japanese: 'ねだんを おしえて ください。', reading: 'ne·dan·wo o·shi·e·te ku·da·sa·i', meaning: '가격을 알려주세요.' },
    { japanese: 'ねんまつに かぞくと あいます。', reading: 'nen·ma·tsu·ni ka·zo·ku·to a·i·ma·su', meaning: '연말에 가족과 만납니다.' }
  ]},

  'の': { sentences: [
    { japanese: 'これは わたしの かばんです。', reading: 'ko·re·wa wa·ta·shi·no ka·ban·de·su', meaning: '이것은 내 가방입니다.' },
    { japanese: 'どのみちが いちばん ちかいですか？', reading: 'do·no mi·chi·ga i·chi·ban chi·ka·i·de·su·ka', meaning: '어느 길이 가장 가깝습니까?' },
    { japanese: 'のみものは なにが いいですか？', reading: 'no·mi·mo·no·wa na·ni·ga ī·de·su·ka', meaning: '마실 것은 무엇이 좋으세요?' },
    { japanese: 'のんびりと したいです。', reading: 'non·bi·ri·to shi·ta·i·de·su', meaning: '느긋하게 있고 싶습니다.' }
  ]},

  'は': { sentences: [
    { japanese: 'わたしは にほんごを べんきょうしています。', reading: 'wa·ta·shi·wa ni·hon·go·wo ben·kyō·shi·te·i·ma·su', meaning: '나는 일본어를 공부하고 있습니다.' },
    { japanese: 'きょうは あめが ふっています。', reading: 'kyō·wa a·me·ga fut·te·i·ma·su', meaning: '오늘은 비가 내리고 있습니다.' },
    { japanese: 'はなびが とても きれいでした。', reading: 'ha·na·bi·ga to·te·mo ki·re·i·de·shi·ta', meaning: '불꽃놀이가 정말 예뻤습니다.' },
    { japanese: 'はじめて にほんへ きました。', reading: 'ha·ji·me·te ni·hon·e ki·ma·shi·ta', meaning: '처음으로 일본에 왔습니다.' }
  ]},

  'ひ': { sentences: [
    { japanese: 'ひこうきで にほんへ いきます。', reading: 'hi·kō·ki·de ni·hon·e i·ki·ma·su', meaning: '비행기로 일본에 갑니다.' },
    { japanese: 'ひるごはんに ランチを たべました。', reading: 'hi·ru·go·han·ni ran·chi·wo ta·be·ma·shi·ta', meaning: '점심에 런치를 먹었습니다.' },
    { japanese: 'ひだりに まがって ください。', reading: 'hi·da·ri·ni ma·gat·te ku·da·sa·i', meaning: '왼쪽으로 돌아주세요.' },
    { japanese: 'ひとりで りょこうするのが すきです。', reading: 'hi·to·ri·de ryo·kō·su·ru·no·ga su·ki·de·su', meaning: '혼자 여행하는 것을 좋아합니다.' }
  ]},

  'ふ': { sentences: [
    { japanese: 'ふゆは とても さむいですね。', reading: 'fu·yu·wa to·te·mo sa·mu·i·de·su·ne', meaning: '겨울은 정말 춥네요.' },
    { japanese: 'ふじさんが みえますか？', reading: 'fu·ji·san·ga mi·e·ma·su·ka', meaning: '후지산이 보입니까?' },
    { japanese: 'ふつうの へやを おねがいします。', reading: 'fu·tsū·no he·ya·wo o·ne·ga·i·shi·ma·su', meaning: '일반 방을 부탁합니다.' },
    { japanese: 'ふろに はいって ゆっくり します。', reading: 'fu·ro·ni ha·it·te yuk·ku·ri shi·ma·su', meaning: '목욕을 하고 천천히 쉽니다.' }
  ]},

  'へ': { sentences: [
    { japanese: 'がっこうへ いきます。', reading: 'gak·kō·e i·ki·ma·su', meaning: '학교에 갑니다.' },
    { japanese: 'へやを かたづけて ください。', reading: 'he·ya·wo ka·ta·zu·ke·te ku·da·sa·i', meaning: '방을 정리해주세요.' },
    { japanese: 'えきへの みちを おしえて ください。', reading: 'e·ki·e·no mi·chi·wo o·shi·e·te ku·da·sa·i', meaning: '역으로 가는 길을 알려주세요.' }
  ]},

  'ほ': { sentences: [
    { japanese: 'ほんを よむのが すきです。', reading: 'hon·wo yo·mu·no·ga su·ki·de·su', meaning: '책 읽는 것을 좋아합니다.' },
    { japanese: 'ほてるを よやく しました。', reading: 'ho·te·ru·wo yo·ya·ku shi·ma·shi·ta', meaning: '호텔을 예약했습니다.' },
    { japanese: 'ほんとうに ありがとうございます。', reading: 'hon·tō·ni a·ri·ga·tō·go·za·i·ma·su', meaning: '정말로 감사합니다.' },
    { japanese: 'ほかに なにか ありますか？', reading: 'ho·ka·ni na·ni·ka a·ri·ma·su·ka', meaning: '그 밖에 뭔가 있습니까?' }
  ]},

  'ま': { sentences: [
    { japanese: 'まいにち にほんごを れんしゅう します。', reading: 'ma·i·ni·chi ni·hon·go·wo ren·shū shi·ma·su', meaning: '매일 일본어를 연습합니다.' },
    { japanese: 'まだ にほんごが じょうずでは ありません。', reading: 'ma·da ni·hon·go·ga jō·zu·de·wa a·ri·ma·sen', meaning: '아직 일본어가 능숙하지 않습니다.' },
    { japanese: 'またね！げんきでね。', reading: 'ma·ta·ne! gen·ki·de·ne', meaning: '또 봐요! 잘 지내요.' },
    { japanese: 'まどを あけて ください。', reading: 'ma·do·wo a·ke·te ku·da·sa·i', meaning: '창문을 열어주세요.' }
  ]},

  'み': { sentences: [
    { japanese: 'みずを いっぱい ください。', reading: 'mi·zu·wo ip·pai ku·da·sa·i', meaning: '물 한 잔 주세요.' },
    { japanese: 'みぎに まがって まっすぐ いきます。', reading: 'mi·gi·ni ma·gat·te mas·su·gu i·ki·ma·su', meaning: '오른쪽으로 돌아서 직진합니다.' },
    { japanese: 'みんなで しゃしんを とりましょう。', reading: 'min·na·de sha·shin·wo to·ri·ma·shō', meaning: '모두 함께 사진을 찍읍시다.' },
    { japanese: 'みせを さがして います。', reading: 'mi·se·wo sa·ga·shi·te i·ma·su', meaning: '가게를 찾고 있습니다.' }
  ]},

  'む': { sentences: [
    { japanese: 'むずかしい もんだいですが、がんばります。', reading: 'mu·zu·ka·shi·i mon·da·i·de·su·ga, gan·ba·ri·ma·su', meaning: '어려운 문제지만 열심히 하겠습니다.' },
    { japanese: 'むかしの にほんの まちが すきです。', reading: 'mu·ka·shi·no ni·hon·no ma·chi·ga su·ki·de·su', meaning: '옛날 일본 마을을 좋아합니다.' }
  ]},

  'め': { sentences: [
    { japanese: 'めを さまして ください。もう あさです。', reading: 'me·wo sa·ma·shi·te ku·da·sa·i. mō a·sa·de·su', meaning: '눈을 뜨세요. 이미 아침입니다.' },
    { japanese: 'めがねを かけると みえます。', reading: 'me·ga·ne·wo ka·ke·ru·to mi·e·ma·su', meaning: '안경을 쓰면 보입니다.' },
    { japanese: 'めにゅーを みせて ください。', reading: 'me·nyū·wo mi·se·te ku·da·sa·i', meaning: '메뉴를 보여주세요.' },
    { japanese: 'めにみえない むしが います。', reading: 'me·ni mi·e·na·i mu·shi·ga i·ma·su', meaning: '눈에 보이지 않는 벌레가 있습니다.' }
  ]},

  'も': { sentences: [
    { japanese: 'わたしも にほんに いったことが あります。', reading: 'wa·ta·shi·mo ni·hon·ni it·ta ko·to·ga a·ri·ma·su', meaning: '저도 일본에 간 적이 있습니다.' },
    { japanese: 'もっと ゆっくり はなして ください。', reading: 'mot·to yuk·ku·ri ha·na·shi·te ku·da·sa·i', meaning: '더 천천히 말씀해 주세요.' },
    { japanese: 'もう すこし まって ください。', reading: 'mō su·ko·shi mat·te ku·da·sa·i', meaning: '조금만 더 기다려 주세요.' },
    { japanese: 'もちろん、よろこんで！', reading: 'mo·chi·ron, yo·ro·kon·de', meaning: '물론이요, 기꺼이!' }
  ]},

  'や': { sentences: [
    { japanese: 'やすみの ひに どこへ いきますか？', reading: 'ya·su·mi·no hi·ni do·ko·e i·ki·ma·su·ka', meaning: '쉬는 날에 어디에 갑니까?' },
    { japanese: 'やさしく おしえて ください。', reading: 'ya·sa·shi·ku o·shi·e·te ku·da·sa·i', meaning: '친절하게 가르쳐 주세요.' },
    { japanese: 'やっと にほんごが わかりました！', reading: 'yat·to ni·hon·go·ga wa·ka·ri·ma·shi·ta', meaning: '드디어 일본어를 이해했습니다!' },
    { japanese: 'やまに のぼるのが すきです。', reading: 'ya·ma·ni no·bo·ru·no·ga su·ki·de·su', meaning: '산에 오르는 것을 좋아합니다.' }
  ]},

  'ゆ': { sentences: [
    { japanese: 'ゆっくり やすんで ください。', reading: 'yuk·ku·ri ya·sun·de ku·da·sa·i', meaning: '천천히 쉬세요.' },
    { japanese: 'ゆきが ふっているので、きを つけて。', reading: 'yu·ki·ga fut·te·i·ru·no·de, ki·wo tsu·ke·te', meaning: '눈이 내리고 있으니 조심해요.' },
    { japanese: 'ゆめを かなえるために がんばります。', reading: 'yu·me·wo ka·na·e·ru·ta·me·ni gan·ba·ri·ma·su', meaning: '꿈을 이루기 위해 열심히 합니다.' },
    { japanese: 'ゆうびんきょくは どこですか？', reading: 'yū·bin·kyo·ku·wa do·ko·de·su·ka', meaning: '우체국은 어디입니까?' }
  ]},

  'よ': { sentences: [
    { japanese: 'よるに ほしを みました。', reading: 'yo·ru·ni ho·shi·wo mi·ma·shi·ta', meaning: '밤에 별을 봤습니다.' },
    { japanese: 'よろしく おねがいします。', reading: 'yo·ro·shi·ku o·ne·ga·i·shi·ma·su', meaning: '잘 부탁드립니다.' },
    { japanese: 'よかった！うまく いきました。', reading: 'yo·kat·ta! u·ma·ku i·ki·ma·shi·ta', meaning: '잘됐어요! 잘 됐습니다.' },
    { japanese: 'よやくを したいのですが。', reading: 'yo·ya·ku·wo shi·ta·i·no·de·su·ga', meaning: '예약을 하고 싶은데요.' }
  ]},

  'ら': { sentences: [
    { japanese: 'らいねん にほんに べんきょうしに いきます。', reading: 'ra·i·nen ni·hon·ni ben·kyō·shi·ni i·ki·ma·su', meaning: '내년에 일본에 공부하러 갑니다.' },
    { japanese: 'らくに なりました。ありがとう。', reading: 'ra·ku·ni na·ri·ma·shi·ta. a·ri·ga·tō', meaning: '편해졌습니다. 감사합니다.' }
  ]},

  'り': { sentences: [
    { japanese: 'りょこうを するのが だいすきです。', reading: 'ryo·kō·wo su·ru·no·ga da·i·su·ki·de·su', meaning: '여행하는 것을 매우 좋아합니다.' },
    { japanese: 'りんごを ひとつ ください。', reading: 'rin·go·wo hi·to·tsu ku·da·sa·i', meaning: '사과 하나 주세요.' },
    { japanese: 'りゆうを おしえて もらえますか？', reading: 'ri·yū·wo o·shi·e·te mo·ra·e·ma·su·ka', meaning: '이유를 알려주실 수 있나요?' },
    { japanese: 'りっぱな たてものですね。', reading: 'rip·pa·na ta·te·mo·no·de·su·ne', meaning: '훌륭한 건물이네요.' }
  ]},

  'る': { sentences: [
    { japanese: 'るすに していますので、メッセージを どうぞ。', reading: 'ru·su·ni shi·te·i·ma·su·no·de, mes·sē·ji·wo dō·zo', meaning: '자리를 비우고 있으니 메시지를 남겨주세요.' },
    { japanese: 'るすばんを して もらえますか？', reading: 'ru·su·ban·wo shi·te mo·ra·e·ma·su·ka', meaning: '집 좀 봐줄 수 있나요?' }
  ]},

  'れ': { sentences: [
    { japanese: 'れいぞうこに ジュースが あります。', reading: 're·i·zō·ko·ni jū·su·ga a·ri·ma·su', meaning: '냉장고에 주스가 있습니다.' },
    { japanese: 'れんしゅうを つづければ うまくなります。', reading: 'ren·shū·wo tsu·zu·ke·re·ba u·ma·ku·na·ri·ma·su', meaning: '연습을 계속하면 잘하게 됩니다.' },
    { japanese: 'れきしてきな まちを あるきます。', reading: 're·ki·shi·te·ki·na ma·chi·wo a·ru·ki·ma·su', meaning: '역사적인 마을을 걷습니다.' },
    { japanese: 'れんらくを ください。', reading: 'ren·ra·ku·wo ku·da·sa·i', meaning: '연락해 주세요.' }
  ]},

  'ろ': { sentences: [
    { japanese: 'ろうかを まっすぐ いって ください。', reading: 'rō·ka·wo mas·su·gu it·te ku·da·sa·i', meaning: '복도를 직진해 주세요.' },
    { japanese: 'ろっぽんぎで かいものを します。', reading: 'rop·pon·gi·de ka·i·mo·no·wo shi·ma·su', meaning: '롯폰기에서 쇼핑을 합니다.' }
  ]},

  'わ': { sentences: [
    { japanese: 'わたしは かんこくから きました。', reading: 'wa·ta·shi·wa kan·ko·ku·ka·ra ki·ma·shi·ta', meaning: '나는 한국에서 왔습니다.' },
    { japanese: 'わからない ときは きいて ください。', reading: 'wa·ka·ra·na·i to·ki·wa ki·i·te ku·da·sa·i', meaning: '모를 때는 물어봐 주세요.' },
    { japanese: 'わあ、なんて きれいなんでしょう！', reading: 'wā, nan·te ki·re·i·nan·de·shō', meaning: '와, 얼마나 예쁜지요!' },
    { japanese: 'わすれものを しないように ちゅういして。', reading: 'wa·su·re·mo·no·wo shi·na·i·yō·ni chū·i·shi·te', meaning: '물건을 잊고 가지 않도록 주의해요.' }
  ]},

  'を': { sentences: [
    { japanese: 'みずを いっぱい のんで ください。', reading: 'mi·zu·wo ip·pai non·de ku·da·sa·i', meaning: '물을 많이 마셔주세요.' },
    { japanese: 'えいがを みながら ポップコーンを たべます。', reading: 'e·i·ga·wo mi·na·ga·ra pop·pu·kōn·wo ta·be·ma·su', meaning: '영화를 보면서 팝콘을 먹습니다.' }
  ]},

  'ん': { sentences: [
    { japanese: 'にほんごの べんきょうは たのしいです。', reading: 'ni·hon·go·no ben·kyō·wa ta·no·shi·i·de·su', meaning: '일본어 공부는 재미있습니다.' },
    { japanese: 'ほんとうに しんじられないです！', reading: 'hon·tō·ni shin·ji·ra·re·na·i·de·su', meaning: '정말 믿을 수가 없어요!' },
    { japanese: 'せんえんをください。', reading: 'sen·en·wo ku·da·sa·i', meaning: '천 엔 주세요.' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 기본 (ア단~ン)
  // ══════════════════════════════════════════

  'ア': { sentences: [
    { japanese: 'アイスを ふたつ ください。', reading: 'a·i·su·wo fu·ta·tsu ku·da·sa·i', meaning: '아이스크림 두 개 주세요.' },
    { japanese: 'アジアを りょこう するのが ゆめです。', reading: 'a·ji·a·wo ryo·kō su·ru·no·ga yu·me·de·su', meaning: '아시아를 여행하는 것이 꿈입니다.' }
  ]},

  'イ': { sentences: [
    { japanese: 'イタリアりょうりが だいすきです。', reading: 'i·ta·ri·a·ryō·ri·ga da·i·su·ki·de·su', meaning: '이탈리아 요리를 매우 좋아합니다.' },
    { japanese: 'イヤフォンを つかって おんがくを ききます。', reading: 'i·ya·fon·wo tsu·kat·te on·ga·ku·wo ki·ki·ma·su', meaning: '이어폰을 사용해서 음악을 듣습니다.' }
  ]},

  'ウ': { sentences: [
    { japanese: 'ウォーキングを まいにち します。', reading: 'u·ō·kin·gu·wo ma·i·ni·chi shi·ma·su', meaning: '워킹을 매일 합니다.' },
    { japanese: 'ウイスキーは のみません。', reading: 'u·i·su·kī·wa no·mi·ma·sen', meaning: '위스키는 마시지 않습니다.' }
  ]},

  'エ': { sentences: [
    { japanese: 'エレベーターで 3かいに あがります。', reading: 'e·re·bē·tā·de san·ga·i·ni a·ga·ri·ma·su', meaning: '엘리베이터로 3층에 올라갑니다.' },
    { japanese: 'エアコンが こわれて こまっています。', reading: 'e·a·kon·ga ko·wa·re·te ko·mat·te·i·ma·su', meaning: '에어컨이 고장나서 곤란합니다.' }
  ]},

  'オ': { sentences: [
    { japanese: 'オレンジジュースを ください。', reading: 'o·ren·ji·jū·su·wo ku·da·sa·i', meaning: '오렌지 주스 주세요.' },
    { japanese: 'オーストラリアに いきたいです。', reading: 'ō·su·to·ra·ri·a·ni i·ki·ta·i·de·su', meaning: '호주에 가고 싶습니다.' }
  ]},

  'カ': { sentences: [
    { japanese: 'カメラを かいたいのですが、おすすめは？', reading: 'ka·me·ra·wo ka·i·ta·i·no·de·su·ga, o·su·su·me·wa', meaning: '카메라를 사고 싶은데, 추천은요?' },
    { japanese: 'カフェで コーヒーを のみながら べんきょう します。', reading: 'ka·fe·de kō·hī·wo no·mi·na·ga·ra ben·kyō shi·ma·su', meaning: '카페에서 커피를 마시면서 공부합니다.' }
  ]},

  'キ': { sentences: [
    { japanese: 'キャンセルして ください。', reading: 'kyan·se·ru·shi·te ku·da·sa·i', meaning: '취소해 주세요.' },
    { japanese: 'キャンプに いくのが すきです。', reading: 'kyan·pu·ni i·ku·no·ga su·ki·de·su', meaning: '캠핑 가는 것을 좋아합니다.' }
  ]},

  'ク': { sentences: [
    { japanese: 'クレジットカードは つかえますか？', reading: 'ku·re·jit·to·kā·do·wa tsu·ka·e·ma·su·ka', meaning: '신용카드는 사용할 수 있나요?' },
    { japanese: 'クーラーを つけて ください。あついです。', reading: 'kū·rā·wo tsu·ke·te ku·da·sa·i. a·tsu·i·de·su', meaning: '에어컨 켜주세요. 덥습니다.' }
  ]},

  'ケ': { sentences: [
    { japanese: 'ケーキを かってきました。たべましょう。', reading: 'kē·ki·wo kat·te·ki·ma·shi·ta. ta·be·ma·shō', meaning: '케이크를 사왔습니다. 먹읍시다.' },
    { japanese: 'ケータイの バッテリーが きれました。', reading: 'kē·ta·i·no bat·te·rī·ga ki·re·ma·shi·ta', meaning: '핸드폰 배터리가 다됐습니다.' }
  ]},

  'コ': { sentences: [
    { japanese: 'コーヒーを いっぱい ください。', reading: 'kō·hī·wo ip·pai ku·da·sa·i', meaning: '커피 한 잔 주세요.' },
    { japanese: 'コンビニは あのかどを まがった ところです。', reading: 'kon·bi·ni·wa a·no ka·do·wo ma·gat·ta to·ko·ro·de·su', meaning: '편의점은 저 코너를 돈 곳에 있습니다.' }
  ]},

  'サ': { sentences: [
    { japanese: 'サービスが よくて、また きたいです。', reading: 'sā·bi·su·ga yo·ku·te, ma·ta ki·ta·i·de·su', meaning: '서비스가 좋아서 또 오고 싶습니다.' },
    { japanese: 'サッカーの しあいを みに いきます。', reading: 'sak·kā·no shi·a·i·wo mi·ni i·ki·ma·su', meaning: '축구 경기를 보러 갑니다.' }
  ]},

  'シ': { sentences: [
    { japanese: 'シャワーを あびて すっきりしました。', reading: 'sha·wā·wo a·bi·te suk·ki·ri·shi·ma·shi·ta', meaning: '샤워를 해서 개운합니다.' },
    { japanese: 'シーフードパスタを たべました。', reading: 'shī·fū·do·pa·su·ta·wo ta·be·ma·shi·ta', meaning: '해산물 파스타를 먹었습니다.' }
  ]},

  'ス': { sentences: [
    { japanese: 'スーパーで やさいを かいます。', reading: 'sū·pā·de ya·sa·i·wo ka·i·ma·su', meaning: '슈퍼마켓에서 채소를 삽니다.' },
    { japanese: 'スマートフォンで ちずを みます。', reading: 'su·mā·to·fon·de chi·zu·wo mi·ma·su', meaning: '스마트폰으로 지도를 봅니다.' }
  ]},

  'セ': { sentences: [
    { japanese: 'セールちゅうなので、やすく かえました。', reading: 'sē·ru·chū·na·no·de, ya·su·ku ka·e·ma·shi·ta', meaning: '세일 중이라 싸게 살 수 있었습니다.' },
    { japanese: 'セーターを きて でかけます。', reading: 'sē·tā·wo ki·te de·ka·ke·ma·su', meaning: '스웨터를 입고 외출합니다.' }
  ]},

  'ソ': { sentences: [
    { japanese: 'ソファーに すわって テレビを みます。', reading: 'so·fā·ni su·wat·te te·re·bi·wo mi·ma·su', meaning: '소파에 앉아서 TV를 봅니다.' },
    { japanese: 'ソースを かけて たべて ください。', reading: 'sō·su·wo ka·ke·te ta·be·te ku·da·sa·i', meaning: '소스를 뿌려서 드세요.' }
  ]},

  'タ': { sentences: [
    { japanese: 'タクシーを よんで ください。', reading: 'ta·ku·shī·wo yon·de ku·da·sa·i', meaning: '택시를 불러주세요.' },
    { japanese: 'タオルを もう いちまい ください。', reading: 'ta·o·ru·wo mō i·chi·mai ku·da·sa·i', meaning: '타올을 한 장 더 주세요.' }
  ]},

  'チ': { sentences: [
    { japanese: 'チケットを かいに いきます。', reading: 'chi·ket·to·wo ka·i·ni i·ki·ma·su', meaning: '티켓을 사러 갑니다.' },
    { japanese: 'チェックアウトは なんじまでですか？', reading: 'chek·ku·a·u·to·wa nan·ji·ma·de·de·su·ka', meaning: '체크아웃은 몇 시까지입니까?' }
  ]},

  'ツ': { sentences: [
    { japanese: 'ツアーに さんかして たのしかったです。', reading: 'tsu·ā·ni san·ka·shi·te ta·no·shi·kat·ta·de·su', meaning: '투어에 참가해서 즐거웠습니다.' },
    { japanese: 'ツインルームを よやく したいです。', reading: 'tsu·in·rū·mu·wo yo·ya·ku shi·ta·i·de·su', meaning: '트윈룸을 예약하고 싶습니다.' }
  ]},

  'テ': { sentences: [
    { japanese: 'テレビを みながら しょくじを します。', reading: 'te·re·bi·wo mi·na·ga·ra sho·ku·ji·wo shi·ma·su', meaning: 'TV를 보면서 식사를 합니다.' },
    { japanese: 'テーブルに おいて ください。', reading: 'tē·bu·ru·ni o·i·te ku·da·sa·i', meaning: '테이블에 놓아주세요.' }
  ]},

  'ト': { sentences: [
    { japanese: 'トイレは どこですか？', reading: 'to·i·re·wa do·ko·de·su·ka', meaning: '화장실은 어디입니까?' },
    { japanese: 'トーストと コーヒーで あさごはんを たべます。', reading: 'tō·su·to·to kō·hī·de a·sa·go·han·wo ta·be·ma·su', meaning: '토스트와 커피로 아침을 먹습니다.' }
  ]},

  'ナ': { sentences: [
    { japanese: 'ナイフと フォークを ください。', reading: 'na·i·fu·to fō·ku·wo ku·da·sa·i', meaning: '나이프와 포크 주세요.' },
    { japanese: 'ナビで みちを さがします。', reading: 'na·bi·de mi·chi·wo sa·ga·shi·ma·su', meaning: '내비게이션으로 길을 찾습니다.' }
  ]},

  'ニ': { sentences: [
    { japanese: 'ニュースを みて じょうほうを あつめます。', reading: 'nyū·su·wo mi·te jō·hō·wo a·tsu·me·ma·su', meaning: '뉴스를 보고 정보를 모읍니다.' },
    { japanese: 'ニホンゴは むずかしいですが、たのしいです。', reading: 'ni·hon·go·wa mu·zu·ka·shi·i·de·su·ga, ta·no·shi·i·de·su', meaning: '일본어는 어렵지만 즐겁습니다.' }
  ]},

  'ヌ': { sentences: [
    { japanese: 'ヌードルを たべました。おいしかったです。', reading: 'nū·do·ru·wo ta·be·ma·shi·ta. o·i·shi·kat·ta·de·su', meaning: '누들을 먹었습니다. 맛있었어요.' }
  ]},

  'ネ': { sentences: [
    { japanese: 'ネットで よやくを しました。', reading: 'net·to·de yo·ya·ku·wo shi·ma·shi·ta', meaning: '인터넷으로 예약을 했습니다.' },
    { japanese: 'ネクタイを して しごとに いきます。', reading: 'ne·ku·ta·i·wo shi·te shi·go·to·ni i·ki·ma·su', meaning: '넥타이를 하고 일하러 갑니다.' }
  ]},

  'ノ': { sentences: [
    { japanese: 'ノートに じゅぎょうの ないようを かきます。', reading: 'nō·to·ni jū·gyō·no na·i·yō·wo ka·ki·ma·su', meaning: '노트에 수업 내용을 씁니다.' },
    { japanese: 'ノックして はいって ください。', reading: 'nok·ku·shi·te ha·it·te ku·da·sa·i', meaning: '노크하고 들어오세요.' }
  ]},

  'ハ': { sentences: [
    { japanese: 'ハンバーガーと フライドポテトを ください。', reading: 'han·bā·gā·to fu·ra·i·do·po·te·to·wo ku·da·sa·i', meaning: '햄버거와 감자튀김 주세요.' },
    { japanese: 'ハワイに しんこんりょこうに いきました。', reading: 'ha·wa·i·ni shin·kon·ryo·kō·ni i·ki·ma·shi·ta', meaning: '하와이에 신혼여행을 갔습니다.' }
  ]},

  'ヒ': { sentences: [
    { japanese: 'ヒーターを つけて ください。さむいです。', reading: 'hī·tā·wo tsu·ke·te ku·da·sa·i. sa·mu·i·de·su', meaning: '히터 켜주세요. 춥습니다.' },
    { japanese: 'ヒントを くれますか？', reading: 'hin·to·wo ku·re·ma·su·ka', meaning: '힌트를 주시겠어요?' }
  ]},

  'フ': { sentences: [
    { japanese: 'フロントに もんだいを しらせます。', reading: 'fu·ron·to·ni mon·da·i·wo shi·ra·se·ma·su', meaning: '프런트에 문제를 알립니다.' },
    { japanese: 'フライトが えんちゃくして こまりました。', reading: 'fu·ra·i·to·ga en·cha·ku·shi·te ko·ma·ri·ma·shi·ta', meaning: '비행기가 연착해서 곤란했습니다.' }
  ]},

  'ヘ': { sentences: [
    { japanese: 'ヘルメットを かぶって じてんしゃに のります。', reading: 'he·ru·met·to·wo ka·but·te ji·ten·sha·ni no·ri·ma·su', meaning: '헬멧을 쓰고 자전거를 탑니다.' },
    { japanese: 'ヘアサロンで かみを きります。', reading: 'he·a·sa·ron·de ka·mi·wo ki·ri·ma·su', meaning: '헤어살롱에서 머리를 자릅니다.' }
  ]},

  'ホ': { sentences: [
    { japanese: 'ホテルに チェックインします。', reading: 'ho·te·ru·ni chek·ku·in·shi·ma·su', meaning: '호텔에 체크인합니다.' },
    { japanese: 'ホームで でんしゃを まちます。', reading: 'hō·mu·de den·sha·wo ma·chi·ma·su', meaning: '플랫폼에서 전철을 기다립니다.' }
  ]},

  'マ': { sentences: [
    { japanese: 'マップを みながら まちを あるきます。', reading: 'map·pu·wo mi·na·ga·ra ma·chi·wo a·ru·ki·ma·su', meaning: '지도를 보면서 마을을 걷습니다.' },
    { japanese: 'マスクを して がいしゅつします。', reading: 'ma·su·ku·wo shi·te ga·i·shu·tsu·shi·ma·su', meaning: '마스크를 하고 외출합니다.' }
  ]},

  'ミ': { sentences: [
    { japanese: 'ミルクを いれた コーヒーが すきです。', reading: 'mi·ru·ku·wo i·re·ta kō·hī·ga su·ki·de·su', meaning: '밀크를 넣은 커피를 좋아합니다.' },
    { japanese: 'ミーティングは なんじから ですか？', reading: 'mī·tin·gu·wa nan·ji·ka·ra de·su·ka', meaning: '미팅은 몇 시부터입니까?' }
  ]},

  'ム': { sentences: [
    { japanese: 'ムービーを みて かんどうしました。', reading: 'mū·bī·wo mi·te kan·dō·shi·ma·shi·ta', meaning: '영화를 보고 감동했습니다.' }
  ]},

  'メ': { sentences: [
    { japanese: 'メニューを みせて ください。', reading: 'me·nyū·wo mi·se·te ku·da·sa·i', meaning: '메뉴를 보여주세요.' },
    { japanese: 'メールで れんらくを します。', reading: 'mē·ru·de ren·ra·ku·wo shi·ma·su', meaning: '메일로 연락을 합니다.' }
  ]},

  'モ': { sentences: [
    { japanese: 'モデルが きれいな ふくを きています。', reading: 'mo·de·ru·ga ki·re·i·na fu·ku·wo ki·te·i·ma·su', meaning: '모델이 예쁜 옷을 입고 있습니다.' }
  ]},

  'ヤ': { sentences: [
    { japanese: 'ヤクルトを のんで おなかの ちょうしを ととのえます。', reading: 'ya·ku·ru·to·wo non·de o·na·ka·no chō·shi·wo to·to·no·e·ma·su', meaning: '야쿠르트를 마셔서 장 상태를 조정합니다.' }
  ]},

  'ユ': { sentences: [
    { japanese: 'ユニバーサルスタジオに いきたいです。', reading: 'yu·ni·bā·sa·ru·su·ta·ji·o·ni i·ki·ta·i·de·su', meaning: '유니버설 스튜디오에 가고 싶습니다.' },
    { japanese: 'ユーチューブで にほんごを べんきょうします。', reading: 'yū·chū·bu·de ni·hon·go·wo ben·kyō·shi·ma·su', meaning: '유튜브로 일본어를 공부합니다.' }
  ]},

  'ヨ': { sentences: [
    { japanese: 'ヨーロッパを りょこう するのが ゆめです。', reading: 'yō·rōp·pa·wo ryo·kō su·ru·no·ga yu·me·de·su', meaning: '유럽을 여행하는 것이 꿈입니다.' },
    { japanese: 'ヨガを して からだを きたえます。', reading: 'yo·ga·wo shi·te ka·ra·da·wo ki·ta·e·ma·su', meaning: '요가를 해서 몸을 단련합니다.' }
  ]},

  'ラ': { sentences: [
    { japanese: 'ラーメンが たべたいです。どこかに いい みせは？', reading: 'rā·men·ga ta·be·ta·i·de·su. do·ko·ka·ni ī mi·se·wa', meaning: '라멘이 먹고 싶습니다. 어디 좋은 가게는요?' },
    { japanese: 'ラジオを きいて にほんごを れんしゅうします。', reading: 'ra·ji·o·wo ki·i·te ni·hon·go·wo ren·shū·shi·ma·su', meaning: '라디오를 들으며 일본어를 연습합니다.' }
  ]},

  'リ': { sentences: [
    { japanese: 'リゾートで のんびり やすみます。', reading: 'ri·zō·to·de non·bi·ri ya·su·mi·ma·su', meaning: '리조트에서 느긋하게 쉽니다.' },
    { japanese: 'リュックを せおって ハイキングに いきます。', reading: 'ryuk·ku·wo se·ot·te ha·i·kin·gu·ni i·ki·ma·su', meaning: '백팩을 메고 하이킹을 갑니다.' }
  ]},

  'ル': { sentences: [
    { japanese: 'ルームサービスを たのんで へやで たべます。', reading: 'rū·mu·sā·bi·su·wo ta·non·de he·ya·de ta·be·ma·su', meaning: '룸서비스를 부탁하고 방에서 먹습니다.' }
  ]},

  'レ': { sentences: [
    { japanese: 'レストランを よやく したいのですが。', reading: 're·su·to·ran·wo yo·ya·ku shi·ta·i·no·de·su·ga', meaning: '레스토랑을 예약하고 싶은데요.' },
    { japanese: 'レシートを ください。', reading: 're·shī·to·wo ku·da·sa·i', meaning: '영수증 주세요.' }
  ]},

  'ロ': { sentences: [
    { japanese: 'ロビーで ともだちを まちます。', reading: 'ro·bī·de to·mo·da·chi·wo ma·chi·ma·su', meaning: '로비에서 친구를 기다립니다.' },
    { japanese: 'ロッカーに にもつを いれます。', reading: 'rok·kā·ni ni·mo·tsu·wo i·re·ma·su', meaning: '로커에 짐을 넣습니다.' }
  ]},

  'ワ': { sentences: [
    { japanese: 'ワインを いっぱい ください。', reading: 'wa·in·wo ip·pai ku·da·sa·i', meaning: '와인 한 잔 주세요.' },
    { japanese: 'ワンピースを きた ひとが かわいいです。', reading: 'wan·pī·su·wo ki·ta hi·to·ga ka·wa·ī·de·su', meaning: '원피스를 입은 사람이 귀엽습니다.' }
  ]},

  'ヲ': { sentences: [
    { japanese: 'これヲ みて ください。', reading: 'ko·re·wo mi·te ku·da·sa·i', meaning: '이것을 봐주세요.' }
  ]},

  'ン': { sentences: [
    { japanese: 'アンケートに こたえて ください。', reading: 'an·kē·to·ni ko·ta·e·te ku·da·sa·i', meaning: '앙케트에 답해주세요.' },
    { japanese: 'レストランに はいると、きれいな ないそうでした。', reading: 're·su·to·ran·ni ha·i·ru·to, ki·re·i·na na·i·sō·de·shi·ta', meaning: '레스토랑에 들어가니 예쁜 인테리어였습니다.' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 탁음 (が행~ぼ)
  // ══════════════════════════════════════════

  'が': { sentences: [
    { japanese: 'がっこうで にほんごを べんきょうしています。', reading: 'gak·kō·de ni·hon·go·wo ben·kyō·shi·te·i·ma·su', meaning: '학교에서 일본어를 공부하고 있습니다.' },
    { japanese: 'がんばって ください！', reading: 'gan·bat·te ku·da·sa·i', meaning: '열심히 하세요!' },
    { japanese: 'がいこくごが とくいです。', reading: 'ga·i·ko·ku·go·ga to·ku·i·de·su', meaning: '외국어를 잘합니다.' }
  ]},
  'ぎ': { sentences: [
    { japanese: 'ぎんこうは どこですか？', reading: 'gin·kō·wa do·ko·de·su·ka', meaning: '은행은 어디입니까?' },
    { japanese: 'ぎじゅつが すすんでいます。', reading: 'gi·ju·tsu·ga su·sun·de·i·ma·su', meaning: '기술이 발전하고 있습니다.' }
  ]},
  'ぐ': { sentences: [
    { japanese: 'ぐあいが わるいので、やすみます。', reading: 'gu·a·i·ga wa·ru·i·no·de, ya·su·mi·ma·su', meaning: '몸 상태가 안 좋아서 쉽니다.' },
    { japanese: 'ぐうぜん ともだちに あいました。', reading: 'gū·zen to·mo·da·chi·ni a·i·ma·shi·ta', meaning: '우연히 친구를 만났습니다.' }
  ]},
  'げ': { sentences: [
    { japanese: 'げんきですか？はい、げんきです！', reading: 'gen·ki·de·su·ka? ha·i, gen·ki·de·su', meaning: '잘 지내나요? 네, 잘 지내요!' },
    { japanese: 'げつようびから しごとが はじまります。', reading: 'ge·tsu·yō·bi·ka·ra shi·go·to·ga ha·ji·ma·ri·ma·su', meaning: '월요일부터 일이 시작됩니다.' }
  ]},
  'ご': { sentences: [
    { japanese: 'ごはんを たべましたか？', reading: 'go·han·wo ta·be·ma·shi·ta·ka', meaning: '밥을 먹었습니까?' },
    { japanese: 'ごめんなさい、おくれました。', reading: 'go·men·na·sa·i, o·ku·re·ma·shi·ta', meaning: '죄송합니다, 늦었습니다.' },
    { japanese: 'ごゆっくり どうぞ。', reading: 'go·yuk·ku·ri dō·zo', meaning: '천천히 편하게 계세요.' }
  ]},
  'ざ': { sentences: [
    { japanese: 'ざいりょうを かってきました。', reading: 'za·i·ryō·wo kat·te·ki·ma·shi·ta', meaning: '재료를 사왔습니다.' },
    { japanese: 'ざんねんながら いけません。', reading: 'zan·nen·na·ga·ra i·ke·ma·sen', meaning: '아쉽지만 갈 수 없습니다.' }
  ]},
  'じ': { sentences: [
    { japanese: 'じかんが ありません。いそいでください。', reading: 'ji·kan·ga a·ri·ma·sen. i·so·i·de ku·da·sa·i', meaning: '시간이 없습니다. 서주세요.' },
    { japanese: 'じゅうしょを おしえて ください。', reading: 'jū·sho·wo o·shi·e·te ku·da·sa·i', meaning: '주소를 알려주세요.' },
    { japanese: 'じぶんで できます。', reading: 'ji·bun·de de·ki·ma·su', meaning: '혼자서 할 수 있습니다.' }
  ]},
  'ず': { sentences: [
    { japanese: 'ずっと にほんごを れんしゅう しています。', reading: 'zut·to ni·hon·go·wo ren·shū shi·te·i·ma·su', meaning: '계속 일본어를 연습하고 있습니다.' },
    { japanese: 'ずいぶん うまくなりましたね。', reading: 'zu·i·bun u·ma·ku·na·ri·ma·shi·ta·ne', meaning: '꽤 능숙해졌네요.' }
  ]},
  'ぜ': { sentences: [
    { japanese: 'ぜひ あそびに きてください。', reading: 'ze·hi a·so·bi·ni ki·te ku·da·sa·i', meaning: '꼭 놀러 오세요.' },
    { japanese: 'ぜんぶ たべました。おいしかった！', reading: 'zen·bu ta·be·ma·shi·ta. o·i·shi·kat·ta', meaning: '다 먹었습니다. 맛있었어요!' }
  ]},
  'ぞ': { sentences: [
    { japanese: 'ぞうは おおきい どうぶつです。', reading: 'zō·wa ō·ki·i dō·bu·tsu·de·su', meaning: '코끼리는 큰 동물입니다.' },
    { japanese: 'ぞれぞれ かんがえかたが ちがいます。', reading: 'so·re·zo·re kan·ga·e·ka·ta·ga chi·ga·i·ma·su', meaning: '각자 생각하는 방식이 다릅니다.' }
  ]},
  'だ': { sentences: [
    { japanese: 'だいじょうぶですか？たすけましょうか？', reading: 'da·i·jō·bu·de·su·ka? ta·su·ke·ma·shō·ka', meaning: '괜찮으세요? 도와드릴까요?' },
    { japanese: 'だいすきな たべものは ラーメンです。', reading: 'da·i·su·ki·na ta·be·mo·no·wa rā·men·de·su', meaning: '가장 좋아하는 음식은 라멘입니다.' },
    { japanese: 'だれかが きています。', reading: 'da·re·ka·ga ki·te·i·ma·su', meaning: '누군가 오고 있습니다.' }
  ]},
  'ぢ': { sentences: [
    { japanese: 'はなぢが でました。', reading: 'ha·na·ji·ga de·ma·shi·ta', meaning: '코피가 났습니다.' }
  ]},
  'づ': { sentences: [
    { japanese: 'きずが あります。てあてして ください。', reading: 'ki·zu·ga a·ri·ma·su. te·a·te·shi·te ku·da·sa·i', meaning: '상처가 있습니다. 치료해 주세요.' }
  ]},
  'で': { sentences: [
    { japanese: 'でんしゃで えきまで いきます。', reading: 'den·sha·de e·ki·ma·de i·ki·ma·su', meaning: '전철로 역까지 갑니다.' },
    { japanese: 'でんわを かけても いいですか？', reading: 'den·wa·wo ka·ke·te·mo ī·de·su·ka', meaning: '전화해도 됩니까?' },
    { japanese: 'でかける まえに かぎを かけます。', reading: 'de·ka·ke·ru ma·e·ni ka·gi·wo ka·ke·ma·su', meaning: '외출하기 전에 자물쇠를 잠급니다.' }
  ]},
  'ど': { sentences: [
    { japanese: 'どうぞ、こちらへ。', reading: 'dō·zo, ko·chi·ra·e', meaning: '어서오세요, 이쪽으로.' },
    { japanese: 'どこかで あったことが ありますか？', reading: 'do·ko·ka·de at·ta ko·to·ga a·ri·ma·su·ka', meaning: '어딘가에서 만난 적이 있나요?' },
    { japanese: 'どうして にほんにきたんですか？', reading: 'dō·shi·te ni·hon·ni ki·tan·de·su·ka', meaning: '왜 일본에 오셨나요?' }
  ]},
  'ば': { sentences: [
    { japanese: 'バスていで まっています。', reading: 'ba·su·te·i·de mat·te·i·ma·su', meaning: '버스 정류장에서 기다리고 있습니다.' },
    { japanese: 'ばんごはんは なにを たべますか？', reading: 'ban·go·han·wa na·ni·wo ta·be·ma·su·ka', meaning: '저녁은 무엇을 먹습니까?' },
    { japanese: 'ばしょを おしえて ください。', reading: 'ba·sho·wo o·shi·e·te ku·da·sa·i', meaning: '장소를 알려주세요.' }
  ]},
  'び': { sentences: [
    { japanese: 'びじゅつかんに いったことが あります。', reading: 'bi·ju·tsu·kan·ni it·ta ko·to·ga a·ri·ma·su', meaning: '미술관에 간 적이 있습니다.' },
    { japanese: 'びょうきに なりました。くすりを のみます。', reading: 'byō·ki·ni na·ri·ma·shi·ta. ku·su·ri·wo no·mi·ma·su', meaning: '아프게 됐습니다. 약을 먹습니다.' }
  ]},
  'ぶ': { sentences: [
    { japanese: 'ぶんかさいが たのしみです。', reading: 'bun·ka·sa·i·ga ta·no·shi·mi·de·su', meaning: '문화제가 기대됩니다.' },
    { japanese: 'ぶどうが すきですか？', reading: 'bu·dō·ga su·ki·de·su·ka', meaning: '포도를 좋아합니까?' }
  ]},
  'べ': { sentences: [
    { japanese: 'べんきょうを がんばって います。', reading: 'ben·kyō·wo gan·bat·te i·ma·su', meaning: '공부를 열심히 하고 있습니다.' },
    { japanese: 'べつに もんだいは ありません。', reading: 'be·tsu·ni mon·da·i·wa a·ri·ma·sen', meaning: '별로 문제는 없습니다.' }
  ]},
  'ぼ': { sentences: [
    { japanese: 'ぼうしを かぶって でかけます。', reading: 'bō·shi·wo ka·but·te de·ka·ke·ma·su', meaning: '모자를 쓰고 외출합니다.' },
    { japanese: 'ぼランティアに さんかします。', reading: 'bo·ran·ti·a·ni san·ka·shi·ma·su', meaning: '봉사활동에 참가합니다.' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 반탁음 (ぱ행)
  // ══════════════════════════════════════════

  'ぱ': { sentences: [
    { japanese: 'パーティーに いきます。', reading: 'pā·tī·ni i·ki·ma·su', meaning: '파티에 갑니다.' },
    { japanese: 'ぱっと みて わかりました。', reading: 'pat·to mi·te wa·ka·ri·ma·shi·ta', meaning: '딱 보고 알았습니다.' }
  ]},
  'ぴ': { sentences: [
    { japanese: 'ピアノを ひくのが すきです。', reading: 'pi·a·no·wo hi·ku·no·ga su·ki·de·su', meaning: '피아노 치는 것을 좋아합니다.' },
    { japanese: 'ぴかぴかに みがきました。', reading: 'pi·ka·pi·ka·ni mi·ga·ki·ma·shi·ta', meaning: '반짝반짝하게 닦았습니다.' }
  ]},
  'ぷ': { sentences: [
    { japanese: 'プールで およぎます。', reading: 'pū·ru·de o·yo·gi·ma·su', meaning: '수영장에서 수영합니다.' }
  ]},
  'ぺ': { sentences: [
    { japanese: 'ペットを かっています。', reading: 'pet·to·wo kat·te·i·ma·su', meaning: '반려동물을 키우고 있습니다.' },
    { japanese: 'ぺらぺらに はなせるように なりたい。', reading: 'pe·ra·pe·ra·ni ha·na·se·ru·yō·ni na·ri·ta·i', meaning: '유창하게 말할 수 있게 되고 싶습니다.' }
  ]},
  'ぽ': { sentences: [
    { japanese: 'ポケットに いれます。', reading: 'po·ket·to·ni i·re·ma·su', meaning: '주머니에 넣습니다.' },
    { japanese: 'のんぽりと しています。', reading: 'non·bi·ri·to shi·te·i·ma·su', meaning: '느긋하게 있습니다.' }
  ]},

  // ══════════════════════════════════════════
  //  히라가나 요음 (きゃ, しゃ 등)
  // ══════════════════════════════════════════

  'きゃ': { sentences: [
    { japanese: 'きゃくさまが きました。', reading: 'kya·ku·sa·ma·ga ki·ma·shi·ta', meaning: '손님이 오셨습니다.' },
    { japanese: 'きゃんぷに いきましょう！', reading: 'kyan·pu·ni i·ki·ma·shō', meaning: '캠핑을 갑시다!' }
  ]},
  'きゅ': { sentences: [
    { japanese: 'きゅうりが すきです。', reading: 'kyū·ri·ga su·ki·de·su', meaning: '오이를 좋아합니다.' },
    { japanese: 'きゅうに さむくなりました。', reading: 'kyū·ni sa·mu·ku na·ri·ma·shi·ta', meaning: '갑자기 추워졌습니다.' }
  ]},
  'きょ': { sentences: [
    { japanese: 'きょうねんより ずっと うまくなった。', reading: 'kyo·nen·yo·ri zut·to u·ma·ku·nat·ta', meaning: '작년보다 훨씬 능숙해졌어요.' },
    { japanese: 'きょうしつで べんきょうします。', reading: 'kyō·shi·tsu·de ben·kyō·shi·ma·su', meaning: '교실에서 공부합니다.' }
  ]},
  'しゃ': { sentences: [
    { japanese: 'しゃしんを とって いいですか？', reading: 'sha·shin·wo tot·te ī·de·su·ka', meaning: '사진을 찍어도 됩니까?' },
    { japanese: 'しゃべるのが すきです。', reading: 'sha·be·ru·no·ga su·ki·de·su', meaning: '말하는 것을 좋아합니다.' }
  ]},
  'しゅ': { sentences: [
    { japanese: 'しゅみは なんですか？', reading: 'shu·mi·wa nan·de·su·ka', meaning: '취미는 무엇입니까?' },
    { japanese: 'しゅっぱつの じかんです。', reading: 'shup·pa·tsu·no ji·kan·de·su', meaning: '출발 시간입니다.' }
  ]},
  'しょ': { sentences: [
    { japanese: 'しょうらいは なにに なりたいですか？', reading: 'shō·ra·i·wa na·ni·ni na·ri·ta·i·de·su·ka', meaning: '장래에는 무엇이 되고 싶습니까?' },
    { japanese: 'しょくじは もう すみましたか？', reading: 'sho·ku·ji·wa mō su·mi·ma·shi·ta·ka', meaning: '식사는 이미 하셨습니까?' }
  ]},
  'ちゃ': { sentences: [
    { japanese: 'おちゃを いっぱい のみます。', reading: 'o·cha·wo ip·pai no·mi·ma·su', meaning: '차를 한 잔 마십니다.' },
    { japanese: 'ちゃんと べんきょうして ください。', reading: 'chan·to ben·kyō·shi·te ku·da·sa·i', meaning: '제대로 공부해 주세요.' }
  ]},
  'ちゅ': { sentences: [
    { japanese: 'ちゅうごくりょうりが すきです。', reading: 'chū·go·ku·ryō·ri·ga su·ki·de·su', meaning: '중국 요리를 좋아합니다.' },
    { japanese: 'ちゅういして ください。', reading: 'chū·i·shi·te ku·da·sa·i', meaning: '주의해 주세요.' }
  ]},
  'ちょ': { sentences: [
    { japanese: 'ちょっと まって ください。', reading: 'chot·to mat·te ku·da·sa·i', meaning: '잠깐 기다려 주세요.' },
    { japanese: 'ちょうど いい おおきさです。', reading: 'chō·do ī ō·ki·sa·de·su', meaning: '딱 좋은 크기입니다.' }
  ]},
  'にゃ': { sentences: [
    { japanese: 'にゃんこが かわいいです。', reading: 'nyan·ko·ga ka·wa·ī·de·su', meaning: '야옹이가 귀엽습니다.' }
  ]},
  'にゅ': { sentences: [
    { japanese: 'にゅうがくを おめでとうございます。', reading: 'nyū·ga·ku·wo o·me·de·tō·go·za·i·ma·su', meaning: '입학을 축하합니다.' }
  ]},
  'にょ': { sentences: [
    { japanese: 'にょろにょろと はが みえます。', reading: 'nyo·ro·nyo·ro·to ha·ga mi·e·ma·su', meaning: '구불구불한 뱀이 보입니다.' }
  ]},
  'ひゃ': { sentences: [
    { japanese: 'ひゃくえんで かえます。', reading: 'hya·ku·en·de ka·e·ma·su', meaning: '100엔으로 살 수 있습니다.' }
  ]},
  'ひゅ': { sentences: [
    { japanese: 'ひゅっと かぜが ふきました。', reading: 'hyut·to ka·ze·ga fu·ki·ma·shi·ta', meaning: '쌩하고 바람이 불었습니다.' }
  ]},
  'ひょ': { sentences: [
    { japanese: 'ひょうを みると わかりやすいです。', reading: 'hyō·wo mi·ru·to wa·ka·ri·ya·su·i·de·su', meaning: '표를 보면 이해하기 쉽습니다.' }
  ]},
  'みゃ': { sentences: [
    { japanese: 'みゃくを はかります。', reading: 'mya·ku·wo ha·ka·ri·ma·su', meaning: '맥박을 잽니다.' }
  ]},
  'みゅ': { sentences: [
    { japanese: 'ミュージックが すきです。', reading: 'myū·ji·kku·ga su·ki·de·su', meaning: '음악을 좋아합니다.' }
  ]},
  'みょ': { sentences: [
    { japanese: 'みょうなことが おきました。', reading: 'myō·na ko·to·ga o·ki·ma·shi·ta', meaning: '이상한 일이 일어났습니다.' }
  ]},
  'りゃ': { sentences: [
    { japanese: 'りゃくして かきます。', reading: 'rya·ku·shi·te ka·ki·ma·su', meaning: '줄여서 씁니다.' }
  ]},
  'りゅ': { sentences: [
    { japanese: 'りゅうこうの ファッションを きます。', reading: 'ryū·kō·no fas·shon·wo ki·ma·su', meaning: '유행하는 패션을 입습니다.' }
  ]},
  'りょ': { sentences: [
    { japanese: 'りょこうが だいすきです。', reading: 'ryo·kō·ga da·i·su·ki·de·su', meaning: '여행을 매우 좋아합니다.' },
    { japanese: 'りょうりを おしえて もらいました。', reading: 'ryō·ri·wo o·shi·e·te mo·ra·i·ma·shi·ta', meaning: '요리를 가르쳐 받았습니다.' }
  ]},
  'ぎゃ': { sentences: [
    { japanese: 'ぎゃくに かんがえると わかります。', reading: 'gya·ku·ni kan·ga·e·ru·to wa·ka·ri·ma·su', meaning: '반대로 생각하면 알 수 있습니다.' }
  ]},
  'ぎゅ': { sentences: [
    { japanese: 'ぎゅうにゅうを のみます。', reading: 'gyū·nyū·wo no·mi·ma·su', meaning: '우유를 마십니다.' }
  ]},
  'ぎょ': { sentences: [
    { japanese: 'ぎょうれつが ながいですね。', reading: 'gyō·re·tsu·ga na·ga·i·de·su·ne', meaning: '줄이 기네요.' }
  ]},
  'じゃ': { sentences: [
    { japanese: 'じゃあ、また あとで！', reading: 'jā, ma·ta a·to·de', meaning: '그럼, 나중에 또!' },
    { japanese: 'じゃがいもが すきです。', reading: 'ja·ga·i·mo·ga su·ki·de·su', meaning: '감자를 좋아합니다.' }
  ]},
  'じゅ': { sentences: [
    { japanese: 'じゅぎょうが はじまります。', reading: 'jū·gyō·ga ha·ji·ma·ri·ma·su', meaning: '수업이 시작됩니다.' },
    { japanese: 'じゅうしょを かいてください。', reading: 'jū·sho·wo ka·i·te ku·da·sa·i', meaning: '주소를 써주세요.' }
  ]},
  'じょ': { sentences: [
    { japanese: 'じょうずに なりたいです。', reading: 'jō·zu·ni na·ri·ta·i·de·su', meaning: '능숙해지고 싶습니다.' },
    { japanese: 'じょうほうを あつめています。', reading: 'jō·hō·wo a·tsu·me·te·i·ma·su', meaning: '정보를 모으고 있습니다.' }
  ]},
  'びゃ': { sentences: [
    { japanese: 'びゃくやのくに いってみたい。', reading: 'bya·ku·ya·no·ku·ni it·te·mi·ta·i', meaning: '백야의 나라에 가보고 싶어요.' }
  ]},
  'びゅ': { sentences: [
    { japanese: 'びゅっと はしります。', reading: 'byut·to ha·shi·ri·ma·su', meaning: '획 달립니다.' }
  ]},
  'びょ': { sentences: [
    { japanese: 'びょういんに いかなければ なりません。', reading: 'byō·in·ni i·ka·na·ke·re·ba na·ri·ma·sen', meaning: '병원에 가야 합니다.' }
  ]},
  'ぴゃ': { sentences: [
    { japanese: 'ぴゃっと おどろきました。', reading: 'pya·t·to o·do·ro·ki·ma·shi·ta', meaning: '깜짝 놀랐습니다.' }
  ]},
  'ぴゅ': { sentences: [
    { japanese: 'ぴゅっと とびだしました。', reading: 'pyut·to to·bi·da·shi·ma·shi·ta', meaning: '휙 튀어나왔습니다.' }
  ]},
  'ぴょ': { sentences: [
    { japanese: 'ぴょんぴょん とびます。', reading: 'pyon·pyon to·bi·ma·su', meaning: '깡충깡충 뜁니다.' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 탁음 (ガ행~ボ)
  // ══════════════════════════════════════════

  'ガ': { sentences: [
    { japanese: 'ガイドブックで しらべます。', reading: 'ga·i·do·buk·ku·de shi·ra·be·ma·su', meaning: '가이드북으로 조사합니다.' },
    { japanese: 'ガスを とめて ください。', reading: 'ga·su·wo to·me·te ku·da·sa·i', meaning: '가스를 잠가주세요.' }
  ]},
  'ギ': { sentences: [
    { japanese: 'ギターを ひきます。', reading: 'gi·tā·wo hi·ki·ma·su', meaning: '기타를 칩니다.' }
  ]},
  'グ': { sentences: [
    { japanese: 'グループで はなしあいます。', reading: 'gu·rū·pu·de ha·na·shi·a·i·ma·su', meaning: '그룹으로 토론합니다.' },
    { japanese: 'グラスに みずを いれます。', reading: 'gu·ra·su·ni mi·zu·wo i·re·ma·su', meaning: '잔에 물을 넣습니다.' }
  ]},
  'ゲ': { sentences: [
    { japanese: 'ゲームを するのが すきです。', reading: 'gē·mu·wo su·ru·no·ga su·ki·de·su', meaning: '게임하는 것을 좋아합니다.' }
  ]},
  'ゴ': { sentences: [
    { japanese: 'ゴルフを します。', reading: 'go·ru·fu·wo shi·ma·su', meaning: '골프를 칩니다.' },
    { japanese: 'ゴミを すてないで ください。', reading: 'go·mi·wo su·te·na·i·de ku·da·sa·i', meaning: '쓰레기를 버리지 마세요.' }
  ]},
  'ザ': { sentences: [
    { japanese: 'ザックに にもつを いれます。', reading: 'zak·ku·ni ni·mo·tsu·wo i·re·ma·su', meaning: '잭에 짐을 넣습니다.' }
  ]},
  'ジ': { sentences: [
    { japanese: 'ジュースを のみます。', reading: 'jū·su·wo no·mi·ma·su', meaning: '주스를 마십니다.' },
    { japanese: 'ジムで うんどうします。', reading: 'ji·mu·de un·dō·shi·ma·su', meaning: '헬스장에서 운동합니다.' }
  ]},
  'ズ': { sentences: [
    { japanese: 'ズボンを はきます。', reading: 'zu·bon·wo ha·ki·ma·su', meaning: '바지를 입습니다.' }
  ]},
  'ゼ': { sentences: [
    { japanese: 'ゼロから はじめます。', reading: 'ze·ro·ka·ra ha·ji·me·ma·su', meaning: '제로부터 시작합니다.' }
  ]},
  'ゾ': { sentences: [
    { japanese: 'ゾーンに はいって しゅうちゅうします。', reading: 'zōn·ni ha·it·te shū·chū·shi·ma·su', meaning: '존에 들어가서 집중합니다.' }
  ]},
  'ダ': { sentences: [
    { japanese: 'ダイエットを しています。', reading: 'da·i·et·to·wo shi·te·i·ma·su', meaning: '다이어트를 하고 있습니다.' },
    { japanese: 'ダウンロードに じかんが かかります。', reading: 'da·un·rō·do·ni ji·kan·ga ka·ka·ri·ma·su', meaning: '다운로드에 시간이 걸립니다.' }
  ]},
  'ヂ': { sentences: [
    { japanese: 'ヂストロフィーは びょうきです。', reading: 'ji·su·to·ro·fī·wa byō·ki·de·su', meaning: '이영양증은 병입니다.' }
  ]},
  'ヅ': { sentences: [
    { japanese: 'ヅカのこうえんを みました。', reading: 'du·ka·no kō·en·wo mi·ma·shi·ta', meaning: '다카라즈카 공연을 봤습니다.' }
  ]},
  'デ': { sentences: [
    { japanese: 'デパートで かいものします。', reading: 'de·pā·to·de ka·i·mo·no·shi·ma·su', meaning: '백화점에서 쇼핑합니다.' },
    { japanese: 'デザートを たべます。', reading: 'de·zā·to·wo ta·be·ma·su', meaning: '디저트를 먹습니다.' }
  ]},
  'ド': { sentences: [
    { japanese: 'ドアを しめて ください。', reading: 'do·a·wo shi·me·te ku·da·sa·i', meaning: '문을 닫아주세요.' },
    { japanese: 'ドライブに いきます。', reading: 'do·ra·i·bu·ni i·ki·ma·su', meaning: '드라이브를 갑니다.' }
  ]},
  'バ': { sentences: [
    { japanese: 'バスで いきます。', reading: 'ba·su·de i·ki·ma·su', meaning: '버스로 갑니다.' },
    { japanese: 'バーゲンで やすく かいました。', reading: 'bā·gen·de ya·su·ku ka·i·ma·shi·ta', meaning: '바겐세일에서 싸게 샀습니다.' }
  ]},
  'ビ': { sentences: [
    { japanese: 'ビールを いっぱい のみます。', reading: 'bī·ru·wo ip·pai no·mi·ma·su', meaning: '맥주 한 잔 마십니다.' },
    { japanese: 'ビジネスクラスは たかいです。', reading: 'bi·ji·ne·su·ku·ra·su·wa ta·ka·i·de·su', meaning: '비즈니스 클래스는 비쌉니다.' }
  ]},
  'ブ': { sentences: [
    { japanese: 'ブランドのバッグを かいました。', reading: 'bu·ran·do·no bag·gu·wo ka·i·ma·shi·ta', meaning: '브랜드 가방을 샀습니다.' }
  ]},
  'ベ': { sentences: [
    { japanese: 'ベッドで やすみます。', reading: 'bed·do·de ya·su·mi·ma·su', meaning: '침대에서 쉽니다.' },
    { japanese: 'べんりな アプリです。', reading: 'ben·ri·na a·pu·ri·de·su', meaning: '편리한 앱입니다.' }
  ]},
  'ボ': { sentences: [
    { japanese: 'ボランティアに さんかします。', reading: 'bo·ran·ti·a·ni san·ka·shi·ma·su', meaning: '봉사활동에 참가합니다.' },
    { japanese: 'ボタンを おして ください。', reading: 'bo·tan·wo o·shi·te ku·da·sa·i', meaning: '버튼을 눌러주세요.' }
  ]},
  'パ': { sentences: [
    { japanese: 'パスポートを みせて ください。', reading: 'pa·su·pō·to·wo mi·se·te ku·da·sa·i', meaning: '여권을 보여주세요.' },
    { japanese: 'パーティーに しょうたいされました。', reading: 'pā·tī·ni shō·ta·i·sa·re·ma·shi·ta', meaning: '파티에 초대받았습니다.' }
  ]},
  'ピ': { sentences: [
    { japanese: 'ピザを ちゅうもんします。', reading: 'pi·za·wo chū·mon·shi·ma·su', meaning: '피자를 주문합니다.' }
  ]},
  'プ': { sentences: [
    { japanese: 'プレゼントを かいます。', reading: 'pu·re·zen·to·wo ka·i·ma·su', meaning: '선물을 삽니다.' },
    { japanese: 'プールで およぎます。', reading: 'pū·ru·de o·yo·gi·ma·su', meaning: '수영장에서 수영합니다.' }
  ]},
  'ペ': { sentences: [
    { japanese: 'ペットボトルを リサイクルします。', reading: 'pet·to·bo·to·ru·wo ri·sa·i·ku·ru·shi·ma·su', meaning: '페트병을 재활용합니다.' }
  ]},
  'ポ': { sentences: [
    { japanese: 'ポイントカードを もっています。', reading: 'po·in·to·kā·do·wo mot·te·i·ma·su', meaning: '포인트 카드를 가지고 있습니다.' },
    { japanese: 'ポストに てがみを いれます。', reading: 'po·su·to·ni te·ga·mi·wo i·re·ma·su', meaning: '우편함에 편지를 넣습니다.' }
  ]},

  // ══════════════════════════════════════════
  //  가타카나 요음 (キャ, シャ 등)
  // ══════════════════════════════════════════

  'キャ': { sentences: [
    { japanese: 'キャッシュレスで はらいます。', reading: 'kyas·shū·re·su·de ha·ra·i·ma·su', meaning: '캐시리스로 지불합니다.' }
  ]},
  'キュ': { sentences: [
    { japanese: 'キュウリのサラダが すきです。', reading: 'kyū·ri·no sa·ra·da·ga su·ki·de·su', meaning: '오이 샐러드를 좋아합니다.' }
  ]},
  'キョ': { sentences: [
    { japanese: 'キョウトに いったことが あります。', reading: 'kyō·to·ni it·ta ko·to·ga a·ri·ma·su', meaning: '교토에 간 적이 있습니다.' }
  ]},
  'シャ': { sentences: [
    { japanese: 'シャワーを あびます。', reading: 'sha·wā·wo a·bi·ma·su', meaning: '샤워를 합니다.' }
  ]},
  'シュ': { sentences: [
    { japanese: 'シュークリームを たべます。', reading: 'shū·ku·rī·mu·wo ta·be·ma·su', meaning: '슈크림을 먹습니다.' }
  ]},
  'ショ': { sentences: [
    { japanese: 'ショッピングに いきます。', reading: 'shop·pin·gu·ni i·ki·ma·su', meaning: '쇼핑을 갑니다.' },
    { japanese: 'ショーを みました。きれいでした。', reading: 'shō·wo mi·ma·shi·ta. ki·re·i·de·shi·ta', meaning: '쇼를 봤습니다. 예뻤습니다.' }
  ]},
  'チャ': { sentences: [
    { japanese: 'チャンスを いかします。', reading: 'chan·su·wo i·ka·shi·ma·su', meaning: '기회를 살립니다.' }
  ]},
  'チュ': { sentences: [
    { japanese: 'チューブで みます。', reading: 'chū·bu·de mi·ma·su', meaning: '튜브로 봅니다.' }
  ]},
  'チョ': { sentences: [
    { japanese: 'チョコレートが だいすきです。', reading: 'cho·ko·rē·to·ga da·i·su·ki·de·su', meaning: '초콜릿을 매우 좋아합니다.' }
  ]},
  'ニャ': { sentences: [
    { japanese: 'ニャンコが かわいいです。', reading: 'nyan·ko·ga ka·wa·ī·de·su', meaning: '야옹이가 귀엽습니다.' }
  ]},
  'ニュ': { sentences: [
    { japanese: 'ニュースを よんで じょうほうを しります。', reading: 'nyū·su·wo yon·de jō·hō·wo shi·ri·ma·su', meaning: '뉴스를 읽고 정보를 알게 됩니다.' }
  ]},
  'ニョ': { sentences: [
    { japanese: 'ニョッキを たべました。', reading: 'nyok·ki·wo ta·be·ma·shi·ta', meaning: '뇨끼를 먹었습니다.' }
  ]},
  'ヒャ': { sentences: [
    { japanese: 'ヒャクえんショップは やすいです。', reading: 'hya·ku·en·shop·pu·wa ya·su·i·de·su', meaning: '100엔숍은 쌉니다.' }
  ]},
  'ヒュ': { sentences: [
    { japanese: 'ヒューズが とびました。', reading: 'hyū·zu·ga to·bi·ma·shi·ta', meaning: '퓨즈가 끊어졌습니다.' }
  ]},
  'ヒョ': { sentences: [
    { japanese: 'ヒョウが ふりました。', reading: 'hyō·ga fu·ri·ma·shi·ta', meaning: '우박이 내렸습니다.' }
  ]},
  'ミャ': { sentences: [
    { japanese: 'ミャンマーに いきたいです。', reading: 'myan·mā·ni i·ki·ta·i·de·su', meaning: '미얀마에 가고 싶습니다.' }
  ]},
  'ミュ': { sentences: [
    { japanese: 'ミュージカルを みました。', reading: 'myū·ji·ka·ru·wo mi·ma·shi·ta', meaning: '뮤지컬을 봤습니다.' }
  ]},
  'ミョ': { sentences: [
    { japanese: 'ミョウバンを つかいます。', reading: 'myō·ban·wo tsu·ka·i·ma·su', meaning: '명반을 사용합니다.' }
  ]},
  'リャ': { sentences: [
    { japanese: 'リャカーで はこびます。', reading: 'rya·kā·de ha·ko·bi·ma·su', meaning: '리어카로 운반합니다.' }
  ]},
  'リュ': { sentences: [
    { japanese: 'リュックを せおって でかけます。', reading: 'ryuk·ku·wo se·ot·te de·ka·ke·ma·su', meaning: '백팩을 메고 외출합니다.' }
  ]},
  'リョ': { sentences: [
    { japanese: 'リョカンに とまりたいです。', reading: 'ryo·kan·ni to·ma·ri·ta·i·de·su', meaning: '여관에 묵고 싶습니다.' }
  ]},
  'ギャ': { sentences: [
    { japanese: 'ギャラリーで えを みます。', reading: 'gya·ra·rī·de e·wo mi·ma·su', meaning: '갤러리에서 그림을 봅니다.' }
  ]},
  'ギュ': { sentences: [
    { japanese: 'ギュウニュウを まいにち のみます。', reading: 'gyū·nyū·wo ma·i·ni·chi no·mi·ma·su', meaning: '우유를 매일 마십니다.' }
  ]},
  'ギョ': { sentences: [
    { japanese: 'ギョウザが だいすきです。', reading: 'gyō·za·ga da·i·su·ki·de·su', meaning: '교자(군만두)를 매우 좋아합니다.' }
  ]},
  'ジャ': { sentences: [
    { japanese: 'ジャケットを きます。', reading: 'ja·ket·to·wo ki·ma·su', meaning: '자켓을 입습니다.' }
  ]},
  'ジュ': { sentences: [
    { japanese: 'ジュースを のみます。', reading: 'jū·su·wo no·mi·ma·su', meaning: '주스를 마십니다.' }
  ]},
  'ジョ': { sentences: [
    { japanese: 'ジョギングを まいあさ します。', reading: 'jo·gin·gu·wo ma·i·a·sa shi·ma·su', meaning: '조깅을 매일 아침 합니다.' }
  ]},
  'ビャ': { sentences: [
    { japanese: 'ビャクヤのくにに いきたい。', reading: 'bya·ku·ya·no·ku·ni·ni i·ki·ta·i', meaning: '백야의 나라에 가고 싶어요.' }
  ]},
  'ビュ': { sentences: [
    { japanese: 'ビュッフェを たのしみます。', reading: 'byuf·fe·wo ta·no·shi·mi·ma·su', meaning: '뷔페를 즐깁니다.' }
  ]},
  'ビョ': { sentences: [
    { japanese: 'ビョウインに いきます。', reading: 'byō·in·ni i·ki·ma·su', meaning: '병원에 갑니다.' }
  ]},
  'ピャ': { sentences: [
    { japanese: 'ピャノを ならっています。', reading: 'pya·no·wo na·rat·te·i·ma·su', meaning: '피아노를 배우고 있습니다.' }
  ]},
  'ピュ': { sentences: [
    { japanese: 'ピュアな こころが たいせつです。', reading: 'pyua·na ko·ko·ro·ga ta·i·se·tsu·de·su', meaning: '순수한 마음이 소중합니다.' }
  ]},
  'ピョ': { sentences: [
    { japanese: 'ピョンピョン とびます。', reading: 'pyon·pyon to·bi·ma·su', meaning: '깡충깡충 뜁니다.' }
  ]},

  // ══════════════════════════════════════════
  //  특수 박자 (Level 9)
  // ══════════════════════════════════════════

  'っ': { sentences: [
    { japanese: 'きって を 10まい ください。', reading: 'kit·te wo jū·ma·i ku·da·sa·i', meaning: '우표를 10장 주세요.' },
    { japanese: 'いっぱい たべて ください。', reading: 'ip·pa·i ta·be·te ku·da·sa·i', meaning: '많이 드세요.' },
    { japanese: 'ざっし を よみます。', reading: 'zas·shi wo yo·mi·ma·su', meaning: '잡지를 읽습니다.' }
  ]},
  'ッ': { sentences: [
    { japanese: 'バッグを かいました。', reading: 'bag·gu wo ka·i·ma·shi·ta', meaning: '가방을 샀습니다.' },
    { japanese: 'ベッドで ねます。', reading: 'bed·do de ne·ma·su', meaning: '침대에서 잡니다.' }
  ]},
  'ー': { sentences: [
    { japanese: 'コーヒーを のみます。', reading: 'kō·hī wo no·mi·ma·su', meaning: '커피를 마십니다.' },
    { japanese: 'ケーキを たべました。', reading: 'kē·ki wo ta·be·ma·shi·ta', meaning: '케이크를 먹었습니다.' },
    { japanese: 'スーパーで かいものを します。', reading: 'sū·pā de ka·i·mo·no wo shi·ma·su', meaning: '슈퍼마켓에서 쇼핑을 합니다.' }
  ]},
  'おう': { sentences: [
    { japanese: 'おとうさんは げんきですか？', reading: 'o·tō·san wa gen·ki de·su·ka', meaning: '아버지는 건강하세요? (おとう→おとー)' },
    { japanese: 'ゆっくり ほんを よみましょう。', reading: 'yuk·ku·ri hon wo yo·mi·ma·shō', meaning: '천천히 책을 읽읍시다. (よみましょう: ō 장음)' }
  ]},
  'えい': { sentences: [
    { japanese: 'えいがを みに いきます。', reading: 'e·i·ga wo mi·ni i·ki·ma·su', meaning: '영화를 보러 갑니다. (えいが: ei→ē)' },
    { japanese: 'せんせいに おしえて もらいました。', reading: 'sen·se·i ni o·shi·e·te mo·ra·i·ma·shi·ta', meaning: '선생님께 배웠습니다. (せんせい: ei→ē)' }
  ]},
  'ああ': { sentences: [
    { japanese: 'おかあさんは りょうりが じょうずです。', reading: 'o·kā·san wa ryō·ri ga jō·zu·de·su', meaning: '어머니는 요리를 잘합니다. (おかあさん: aa→ā)' }
  ]},
  'いい': { sentences: [
    { japanese: 'おにいさんは どこですか？', reading: 'o·nī·san wa do·ko·de·su·ka', meaning: '오빠/형은 어디입니까? (おにいさん: ii→ī)' }
  ]},
  'うう': { sentences: [
    { japanese: 'くうこうに むかいます。', reading: 'kū·kō ni mu·ka·i·ma·su', meaning: '공항으로 향합니다. (くうこう: uu→ū)' }
  ]},

  // ══════════════════════════════════════════
  //  조사 읽기 예외 (Level 11)
  // ══════════════════════════════════════════

  'は_p': { sentences: [
    { japanese: 'わたし は にほんじんです。', reading: 'wa·ta·shi·wa ni·hon·jin·de·su', meaning: '나는 일본인입니다. (は→wa 조사)' },
    { japanese: 'これ は いくらですか？', reading: 'ko·re·wa i·ku·ra·de·su·ka', meaning: '이것은 얼마입니까? (は→wa 조사)' }
  ]},
  'へ_p': { sentences: [
    { japanese: 'にほん へ いきます。', reading: 'ni·hon·e i·ki·ma·su', meaning: '일본으로 갑니다. (へ→e 조사)' },
    { japanese: 'えき へ の みちを おしえて。', reading: 'e·ki·e no mi·chi wo o·shi·e·te', meaning: '역으로 가는 길을 알려줘. (へ→e 조사)' }
  ]},
  'を_p': { sentences: [
    { japanese: 'みず を のみます。', reading: 'mi·zu·wo no·mi·ma·su', meaning: '물을 마십니다. (を→o 조사)' },
    { japanese: 'みち を あるきます。', reading: 'mi·chi·wo a·ru·ki·ma·su', meaning: '길을 걷습니다. (を→o 조사)' }
  ]},

  // ══════════════════════════════════════════
  //  외래어 가타카나 확장 (Level 10)
  // ══════════════════════════════════════════

  'ファ': { sentences: [
    { japanese: 'ファッションが すきです。', reading: 'fas·shon ga su·ki·de·su', meaning: '패션을 좋아합니다.' },
    { japanese: 'ファイルを おくります。', reading: 'fa·i·ru wo o·ku·ri·ma·su', meaning: '파일을 보냅니다.' }
  ]},
  'フィ': { sentences: [
    { japanese: 'フィットネスクラブに いきます。', reading: 'fit·to·ne·su·ku·ra·bu ni i·ki·ma·su', meaning: '피트니스 클럽에 갑니다.' }
  ]},
  'フェ': { sentences: [
    { japanese: 'フェリーで しまへ いきます。', reading: 'fe·rī de shi·ma·e i·ki·ma·su', meaning: '페리로 섬에 갑니다.' }
  ]},
  'フォ': { sentences: [
    { japanese: 'フォークで たべます。', reading: 'fō·ku de ta·be·ma·su', meaning: '포크로 먹습니다.' },
    { japanese: 'フォトを とります。', reading: 'fo·to wo to·ri·ma·su', meaning: '포토(사진)를 찍습니다.' }
  ]},
  'ティ': { sentences: [
    { japanese: 'パーティーに さんかします。', reading: 'pā·tī ni san·ka·shi·ma·su', meaning: '파티에 참가합니다.' }
  ]},
  'ディ': { sentences: [
    { japanese: 'ディズニーランドに いきたい。', reading: 'di·zu·nī·ran·do ni i·ki·ta·i', meaning: '디즈니랜드에 가고 싶어요.' }
  ]},
  'トゥ': { sentences: [
    { japanese: 'トゥーリストに やさしい まちです。', reading: 'tū·ri·su·to ni ya·sa·shi·i ma·chi·de·su', meaning: '관광객에게 친절한 도시입니다.' }
  ]},
  'ドゥ': { sentences: [
    { japanese: 'ドゥエットで うたいます。', reading: 'du·et·to de u·ta·i·ma·su', meaning: '듀엣으로 노래합니다.' }
  ]},
  'ウィ': { sentences: [
    { japanese: 'ウィンドウショッピングを します。', reading: 'win·dō·shop·pin·gu wo shi·ma·su', meaning: '윈도 쇼핑을 합니다.' }
  ]},
  'ウェ': { sentences: [
    { japanese: 'ウェブサイトを みます。', reading: 'we·bu·sa·i·to wo mi·ma·su', meaning: '웹사이트를 봅니다.' }
  ]},
  'ウォ': { sentences: [
    { japanese: 'ウォーキングを します。', reading: 'wō·kin·gu wo shi·ma·su', meaning: '워킹을 합니다.' }
  ]},
  'チェ': { sentences: [
    { japanese: 'チェックインを します。', reading: 'chek·ku·in wo shi·ma·su', meaning: '체크인을 합니다.' },
    { japanese: 'チェスを あそびます。', reading: 'che·su wo a·so·bi·ma·su', meaning: '체스를 합니다.' }
  ]},
  'シェ': { sentences: [
    { japanese: 'シェフの りょうりは おいしいです。', reading: 'she·fu no ryō·ri wa o·i·shi·i·de·su', meaning: '셰프의 요리는 맛있습니다.' }
  ]},
  'ジェ': { sentences: [
    { japanese: 'ジェットコースターに のります。', reading: 'jet·to·kō·su·tā ni no·ri·ma·su', meaning: '롤러코스터를 탑니다.' }
  ]},
  'ヴ': { sentences: [
    { japanese: 'ヴィオリンを えんそうします。', reading: 'vi·o·rin wo en·sō·shi·ma·su', meaning: '바이올린을 연주합니다.' }
  ]},
  'ヴァ': { sentences: [
    { japanese: 'ヴァイオリンの おんがくが きれいです。', reading: 'va·i·o·rin no on·ga·ku ga ki·re·i·de·su', meaning: '바이올린 음악이 아름답습니다.' }
  ]},
  'ヴィ': { sentences: [
    { japanese: 'ヴィラで やすみます。', reading: 'vi·ra de ya·su·mi·ma·su', meaning: '빌라에서 쉽니다.' }
  ]},
  'ヴェ': { sentences: [
    { japanese: 'ヴェネツィアを りょこうしました。', reading: 've·ne·tsi·a wo ryo·kō·shi·ma·shi·ta', meaning: '베네치아를 여행했습니다.' }
  ]},
  'ヴォ': { sentences: [
    { japanese: 'ヴォーカルが じょうずです。', reading: 'vō·ka·ru ga jō·zu·de·su', meaning: '보컬이 능숙합니다.' }
  ]},
  'イェ': { sentences: [
    { japanese: 'イェスと いってください。', reading: 'ye·su to it·te ku·da·sa·i', meaning: '예스라고 말해주세요.' }
  ]}

}; // end EXAMPLES_DB
