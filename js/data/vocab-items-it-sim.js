// ============================================================
//  IT 직장 롤플레이 다이얼로그 항목 (simlevel:7)
//  speaker: 'A' = 학습자(나·한국인 엔지니어), 'B' = 일본인 동료/상사, 'N' = 장면 설명
//  목표: 일본 IT 회사에서 실제로 통하는 대화를 완전 정복
// ============================================================
var VOCAB_ITEMS_IT_SIM = [

  // ══════════════════════════════════════════════════════════
  //  씬1: 아침 조회 · 스탠드업 (it_standup)
  // ══════════════════════════════════════════════════════════
  { id:'its_n1', speaker:'N', japanese:'', korean:'📍 아침 조회(スタンドアップ) — 팀원들과 진행 상황 공유', english:'📍 Morning standup — sharing progress updates with the team', tip:'' },
  { id:'its_1',  speaker:'B', japanese:'おはようございます。では朝会を始めましょう。今日のタスクを共有してください。', korean:'안녕하세요. 그럼 조회를 시작하겠습니다. 오늘 태스크 공유해 주세요.', english:'Good morning. Let\'s start the standup. Please share today\'s tasks.', romaji:'' },
  { id:'its_2',  speaker:'A', japanese:'おはようございます。昨日はログイン画面のバグ修正を終わりました。今日はユーザーAPIの実装を進める予定です。', korean:'안녕하세요. 어제는 로그인 화면 버그 수정을 완료했습니다. 오늘은 유저 API 구현을 진행할 예정입니다.', english:'Good morning. Yesterday I finished fixing the login screen bug. Today I plan to work on implementing the user API.', tip:'昨日・今日・ブロッカーの3点が基本フォーマット' },
  { id:'its_3',  speaker:'B', japanese:'ありがとうございます。ブロッカーはありますか？', korean:'감사합니다. 블로커가 있나요?', english:'Thank you. Are there any blockers?', tip:'ブロッカー = 작업을 막는 장애물' },
  { id:'its_4',  speaker:'A', japanese:'DBのスキーマについて確認したいことがあります。後で山田さんに相談してもいいですか？', korean:'DB 스키마에 대해 확인하고 싶은 것이 있습니다. 나중에 야마다 씨에게 상담해도 될까요?', english:'I have something to check about the DB schema. Could I consult with Yamada-san later?', tip:'상사나 동료에게 상담 요청하는 방법' },
  { id:'its_5',  speaker:'B', japanese:'もちろんです。私も午後から空いています。', korean:'물론이죠. 저도 오후부터 비어 있어요.', english:'Of course. I\'m free from the afternoon too.', tip:'' },
  { id:'its_6',  speaker:'A', japanese:'ありがとうございます。あと、先週のPRがまだレビュー待ちなのですが…', korean:'감사합니다. 그리고 지난주 PR이 아직 리뷰 대기 중인데요…', english:'Thank you. Also, my PR from last week is still waiting for review…', tip:'リマインドも大事なコミュニケーション' },
  { id:'its_7',  speaker:'B', japanese:'あ、すみません！今日中に確認します。', korean:'아, 죄송해요! 오늘 중으로 확인할게요.', english:'Oh, I\'m sorry! I\'ll check it today.', tip:'' },
  { id:'its_8',  speaker:'A', japanese:'よろしくお願いします。進捗に影響が出そうだったので、念のため共有しました。', korean:'잘 부탁드립니다. 진행에 영향이 나올 것 같아서 혹시 몰라 공유했습니다.', english:'Thank you. I shared it just in case, as it might affect the schedule.', tip:'「念のため」= 혹시 몰라서. 보고 문화에서 중요' },
  { id:'its_9',  speaker:'B', japanese:'助かります！ではその他にブロッカーがある方はいますか？…では以上で朝会を終わります。', korean:'도움이 됩니다! 그 외에 블로커가 있으신 분은요? …그럼 이걸로 조회를 마칩니다.', english:'That\'s helpful! Any other blockers? …Alright, that\'s a wrap for the standup.', tip:'' },
  { id:'its_10', speaker:'A', japanese:'ありがとうございました。今日もよろしくお願いします！', korean:'감사했습니다. 오늘도 잘 부탁드립니다!', english:'Thank you. I\'m looking forward to working together today!', tip:'「今日もよろしくお願いします」毎朝使える万能フレーズ' },

  // ══════════════════════════════════════════════════════════
  //  씬1 변형: 장애 발생 긴급 조회
  // ══════════════════════════════════════════════════════════
  { id:'its2_n', speaker:'N', japanese:'', korean:'📍 긴급 장애 발생 — 팀 전체 대응 조율', english:'📍 Critical incident — coordinating team response', tip:'' },
  { id:'its2_1', speaker:'B', japanese:'緊急連絡です！本番でエラーが多発しています。影響範囲を確認してください。', korean:'긴급 연락입니다! 운영에서 에러가 대량 발생하고 있어요. 영향 범위를 확인해 주세요.', english:'Emergency! Errors are occurring frequently in production. Please check the scope of impact.', tip:'장애 발생 시 첫 번째 대응' },
  { id:'its2_2', speaker:'A', japanese:'承知しました。ログを確認します。どのエンドポイントで起きていますか？', korean:'알겠습니다. 로그 확인하겠습니다. 어느 엔드포인트에서 발생하고 있나요?', english:'Understood. I\'ll check the logs. Which endpoint is it occurring on?', tip:'「承知しました」は緊急時でも使えるプロの表現' },
  { id:'its2_3', speaker:'B', japanese:'/api/user に集中しています。500エラーが続いています。', korean:'/api/user에 집중되어 있습니다. 500 에러가 계속되고 있어요.', english:'It\'s concentrated at /api/user. 500 errors are continuing.', tip:'' },
  { id:'its2_4', speaker:'A', japanese:'確認しました。昨日のデプロイが原因かもしれません。一度ロールバックしましょうか？', korean:'확인했습니다. 어제 배포가 원인일 수도 있습니다. 한 번 롤백할까요?', english:'I checked. Yesterday\'s deploy might be the cause. Should we roll back once?', tip:'「ロールバック」= 이전 버전으로 되돌리기' },
  { id:'its2_5', speaker:'B', japanese:'そうしましょう。ロールバック後に状況を共有してください。影響ユーザー数も調べてもらえますか？', korean:'그렇게 합시다. 롤백 후 상황을 공유해 주세요. 영향받은 유저 수도 조사해 주실 수 있나요?', english:'Let\'s do that. Please share the status after rollback. Can you also check the number of affected users?', tip:'' },
  { id:'its2_6', speaker:'A', japanese:'はい、ロールバック完了しました。エラーが止まりました。影響ユーザーは約200名でした。', korean:'네, 롤백 완료했습니다. 에러가 멈췄습니다. 영향받은 유저는 약 200명이었습니다.', english:'Yes, rollback complete. The errors have stopped. Approximately 200 users were affected.', tip:'' },
  { id:'its2_7', speaker:'B', japanese:'ありがとうございます。原因究明と再発防止策をまとめて、明日共有してください。', korean:'감사합니다. 원인 규명과 재발 방지 대책을 정리해서 내일 공유해 주세요.', english:'Thank you. Please summarize the root cause and prevention measures and share them tomorrow.', tip:'障害後の「振り返り」문화가 중요' },
  { id:'its2_8', speaker:'A', japanese:'承知しました。ポストモーテムを作成して共有します。', korean:'알겠습니다. 포스트모템을 작성해서 공유하겠습니다.', english:'Understood. I\'ll create a post-mortem and share it.', tip:'「ポストモーテム」= 장애 사후 분석 문서' },

  // ══════════════════════════════════════════════════════════
  //  씬2: 코드 리뷰 요청 (it_code_review)
  // ══════════════════════════════════════════════════════════
  { id:'itcr_n', speaker:'N', japanese:'', korean:'📍 코드 리뷰 요청 — Slack에서 PR 리뷰를 부탁하는 상황', english:'📍 Code review request — asking for PR review on Slack', tip:'' },
  { id:'itcr_1', speaker:'A', japanese:'山田さん、少しよろしいですか？PRのレビューをお願いしたいのですが。', korean:'야마다 씨, 잠깐 괜찮으세요? PR 리뷰를 부탁드리고 싶은데요.', english:'Yamada-san, do you have a moment? I\'d like to ask you to review my PR.', tip:'「少しよろしいですか」는 말 걸 때 필수 표현' },
  { id:'itcr_2', speaker:'B', japanese:'もちろん！どんな内容ですか？', korean:'물론이죠! 어떤 내용인가요?', english:'Of course! What\'s it about?', tip:'' },
  { id:'itcr_3', speaker:'A', japanese:'ユーザー認証のロジックを修正したPRです。リンクをSlackに送りました。変更点はREADMEにまとめてあります。', korean:'유저 인증 로직을 수정한 PR입니다. 링크를 슬랙에 보냈습니다. 변경점은 README에 정리해 두었습니다.', english:'It\'s a PR fixing the user authentication logic. I sent the link on Slack. The changes are summarized in the README.', tip:'コードレビュー依頼の基本フォーマット' },
  { id:'itcr_4', speaker:'B', japanese:'見てみます。テストは書きましたか？', korean:'한 번 볼게요. 테스트는 작성했나요?', english:'I\'ll take a look. Did you write tests?', tip:'テストを書くのは日本のエンジニアも重視' },
  { id:'itcr_5', speaker:'A', japanese:'はい、ユニットテストを5件追加しました。全件パスしています。', korean:'네, 유닛 테스트를 5건 추가했습니다. 전부 통과하고 있습니다.', english:'Yes, I added 5 unit tests. All of them are passing.', tip:'「全件パス」= all tests passing' },
  { id:'itcr_6', speaker:'B', japanese:'いいですね。確認してみます。コメントはGitHubに書きますね。', korean:'좋네요. 확인해 볼게요. 코멘트는 GitHub에 쓸게요.', english:'Great. I\'ll check it. I\'ll leave comments on GitHub.', tip:'' },
  { id:'itcr_7', speaker:'A', japanese:'ありがとうございます。何か不明点があれば声をかけてください。', korean:'감사합니다. 불명확한 점이 있으면 말씀해 주세요.', english:'Thank you. If anything is unclear, please let me know.', tip:'コードレビューへの協力姿勢を示す' },
  { id:'itcr_8', speaker:'B', japanese:'ここのロジック、なぜこの方法にしましたか？別のアプローチの方が効率的かもしれません。', korean:'이 로직은 왜 이 방법으로 했나요? 다른 접근 방식이 더 효율적일 수도 있습니다.', english:'Why did you choose this approach for this logic? Another approach might be more efficient.', tip:'批判ではなく質問で改善提案するのが日本スタイル' },
  { id:'itcr_9', speaker:'A', japanese:'なるほど。ご指摘の通りです。おっしゃる通り修正します。ご提案ありがとうございます。', korean:'그렇군요. 말씀하신 게 맞습니다. 말씀대로 수정하겠습니다. 제안 감사합니다.', english:'I see. You\'re right. I\'ll fix it as you suggested. Thank you for the suggestion.', tip:'指摘を受けたときの自然な返し方。謙虚さが大事' },
  { id:'itcr_10',speaker:'B', japanese:'承認しました！マージしても大丈夫です。', korean:'승인했습니다! 머지해도 괜찮습니다.', english:'I\'ve approved it! You can merge it.', tip:'「LGTM (Looks Good To Me)」という英語表現も使われる' },

  // ══════════════════════════════════════════════════════════
  //  씬2 변형: 리뷰 지적 사항 논의
  // ══════════════════════════════════════════════════════════
  { id:'itcr2_n', speaker:'N', japanese:'', korean:'📍 리뷰 코멘트 논의 — GitHub 코멘트를 보고 직접 대화', english:'📍 Discussing review comments — direct conversation about GitHub feedback', tip:'' },
  { id:'itcr2_1',speaker:'A', japanese:'山田さん、先ほどのコードレビューのコメントについて確認したいのですが。', korean:'야마다 씨, 아까 코드 리뷰 코멘트에 대해 확인하고 싶은데요.', english:'Yamada-san, I\'d like to check about the code review comment from earlier.', tip:'' },
  { id:'itcr2_2',speaker:'B', japanese:'もちろん。どのコメントですか？', korean:'물론이죠. 어느 코멘트인가요?', english:'Of course. Which comment?', tip:'' },
  { id:'itcr2_3',speaker:'A', japanese:'「パフォーマンスを考慮してください」というコメントなのですが、具体的にどのような改善を考えていらっしゃいますか？', korean:'「퍼포먼스를 고려해 주세요」라는 코멘트인데요, 구체적으로 어떤 개선을 생각하고 계신가요?', english:'It\'s the comment "please consider performance." Specifically, what kind of improvement are you thinking of?', tip:'「〜という意味でしょうか？」形式の確認表現' },
  { id:'itcr2_4',speaker:'B', japanese:'N+1問題が発生しています。ループ内でDBを叩かずに、一括取得する方がいいと思います。', korean:'N+1 문제가 발생하고 있습니다. 루프 내에서 DB를 조회하지 않고 일괄 취득하는 편이 좋을 것 같습니다.', english:'There\'s an N+1 problem occurring. It would be better to fetch data in bulk rather than querying the DB inside a loop.', tip:'N+1問題はよくある性能問題' },
  { id:'itcr2_5',speaker:'A', japanese:'ありがとうございます！理解しました。eager loadingで対応します。修正したらもう一度レビューお願いします。', korean:'감사합니다! 이해했습니다. eager loading으로 대응하겠습니다. 수정하면 다시 한 번 리뷰 부탁드립니다.', english:'Thank you! I understand. I\'ll handle it with eager loading. Please review again once I\'ve fixed it.', tip:'理解を示してから具体的な対応策を伝える' },

  // ══════════════════════════════════════════════════════════
  //  씬3: 1on1 미팅 (it_one_on_one)
  // ══════════════════════════════════════════════════════════
  { id:'it1_n',  speaker:'N', japanese:'', korean:'📍 1on1 미팅 — 상사와 개인 면담', english:'📍 One-on-one meeting with your manager', tip:'' },
  { id:'it1_1',  speaker:'B', japanese:'今月の1on1です。最近どうですか？困っていることはありますか？', korean:'이번 달 1on1입니다. 최근 어떠세요? 어려운 점은 있나요?', english:'This month\'s 1on1. How have you been lately? Any difficulties?', tip:'1on1は部下の状況を確認するMTG' },
  { id:'it1_2',  speaker:'A', japanese:'おかげさまで順調です。ただ、設計の部分がまだ難しく感じていて、もう少し勉強が必要だと感じています。', korean:'덕분에 순조롭습니다. 다만 설계 부분이 아직 어렵게 느껴져서 좀 더 공부가 필요하다고 느끼고 있습니다.', english:'Thanks to you, things are going well. However, I still find the design phase difficult and feel I need to study more.', tip:'正直に弱点を伝えるのが日本の1on1での成長につながる' },
  { id:'it1_3',  speaker:'B', japanese:'正直に話してくれてありがとうございます。具体的にどの部分が難しいですか？', korean:'솔직하게 말해줘서 감사합니다. 구체적으로 어느 부분이 어려운가요?', english:'Thank you for being honest. What specifically is difficult for you?', tip:'' },
  { id:'it1_4',  speaker:'A', japanese:'データベースの設計と、APIの設計が特に難しいです。良い学習方法はありますか？', korean:'데이터베이스 설계와 API 설계가 특히 어렵습니다. 좋은 학습 방법이 있을까요?', english:'Database design and API design in particular. Are there any good learning methods?', tip:'具体的に質問することが大切' },
  { id:'it1_5',  speaker:'B', japanese:'いい本があります。あと、設計レビューに入ってもらってもいいですか？実践が一番早いです。', korean:'좋은 책이 있습니다. 그리고 설계 리뷰에 참여해도 될까요? 실전이 가장 빠릅니다.', english:'There\'s a good book. Also, could you join our design reviews? Hands-on practice is the fastest way to learn.', tip:'勉強の機会を提供してもらう良い流れ' },
  { id:'it1_6',  speaker:'A', japanese:'ぜひ参加させてください！ありがとうございます。もう一つ相談があるのですが…', korean:'꼭 참여하고 싶습니다! 감사합니다. 한 가지 더 상담이 있는데요…', english:'Please let me join! Thank you. I have one more thing I\'d like to discuss…', tip:'' },
  { id:'it1_7',  speaker:'B', japanese:'どうぞ。', korean:'말씀하세요.', english:'Go ahead.', tip:'' },
  { id:'it1_8',  speaker:'A', japanese:'チームのコミュニケーションについてなのですが、私の日本語がまだ不十分で、会議でうまく意見を伝えられないことがあります。', korean:'팀 소통에 대한 건데요, 제 일본어가 아직 부족해서 회의에서 잘 의견을 전달 못할 때가 있습니다.', english:'It\'s about team communication. My Japanese is still lacking, and sometimes I struggle to express my opinions in meetings.', tip:'語学の悩みも1on1で相談OK' },
  { id:'it1_9',  speaker:'B', japanese:'わかりました。会議では遠慮なく質問してください。チームもそれを理解しています。それに日本語、上手ですよ！', korean:'알겠습니다. 회의에서는 망설이지 말고 질문해 주세요. 팀도 그것을 이해하고 있어요. 게다가 일본어, 잘 하시잖아요!', english:'Understood. Please feel free to ask questions in meetings. The team understands that. Besides, your Japanese is good!', tip:'励ましの言葉を受け取るのも大切なコミュニケーション' },
  { id:'it1_10', speaker:'A', japanese:'ありがとうございます。これからも頑張ります。何かあればすぐに相談させてください。', korean:'감사합니다. 앞으로도 열심히 하겠습니다. 무슨 일이 있으면 바로 상담하겠습니다.', english:'Thank you. I\'ll keep working hard. I\'ll come to you right away if anything comes up.', tip:'「ほうれんそう」의 마지막 「そ」(상담)를 약속하는 표현' },

  // ══════════════════════════════════════════════════════════
  //  씬4: 프로젝트 킥오프 미팅 (it_kickoff)
  // ══════════════════════════════════════════════════════════
  { id:'itk_n',  speaker:'N', japanese:'', korean:'📍 프로젝트 킥오프 — 새 프로젝트 시작 회의', english:'📍 Project kickoff meeting — starting a new project', tip:'' },
  { id:'itk_1',  speaker:'B', japanese:'本日はキックオフミーティングにお集まりいただきありがとうございます。新しいプロジェクトについて説明します。', korean:'오늘 킥오프 미팅에 모여 주셔서 감사합니다. 새 프로젝트에 대해 설명드리겠습니다.', english:'Thank you for gathering for today\'s kickoff meeting. I\'ll explain the new project.', tip:'キックオフ = 프로젝트 시작 회의' },
  { id:'itk_2',  speaker:'B', japanese:'このプロジェクトのゴールは、ユーザー管理システムの刷新です。リリース目標は3ヶ月後です。', korean:'이 프로젝트의 목표는 유저 관리 시스템 쇄신입니다. 릴리스 목표는 3개월 후입니다.', english:'The goal of this project is to overhaul the user management system. The target release is 3 months from now.', tip:'「ゴール」「リリース目標」は必ずキックオフで確認' },
  { id:'itk_3',  speaker:'A', japanese:'ご質問があります。このプロジェクトでの私の担当範囲を確認させていただけますか？', korean:'질문이 있습니다. 이 프로젝트에서 제 담당 범위를 확인해도 될까요?', english:'I have a question. Could you confirm the scope of my responsibilities for this project?', tip:'役割分担を最初に確認することが重要' },
  { id:'itk_4',  speaker:'B', japanese:'はい、バックエンドAPIの設計と実装をお願いします。フロントエンドは田中さんが担当します。', korean:'네, 백엔드 API 설계와 구현을 부탁드립니다. 프론트엔드는 다나카 씨가 담당합니다.', english:'Yes, I\'d like you to handle the design and implementation of the backend API. Tanaka-san will handle the frontend.', tip:'' },
  { id:'itk_5',  speaker:'A', japanese:'承知しました。スプリントの期間はどのくらいを考えていますか？', korean:'알겠습니다. 스프린트 기간은 어느 정도로 생각하고 계신가요?', english:'Understood. How long are you planning each sprint to be?', tip:'アジャイル開発の基本確認' },
  { id:'itk_6',  speaker:'B', japanese:'2週間スプリントで進めます。毎週月曜日に朝会、金曜日にスプリントレビューです。', korean:'2주 스프린트로 진행합니다. 매주 월요일에 조회, 금요일에 스프린트 리뷰입니다.', english:'We\'ll proceed with 2-week sprints. Morning standup every Monday, sprint review every Friday.', tip:'' },
  { id:'itk_7',  speaker:'A', japanese:'わかりました。技術スタックについても確認させてください。何を使いますか？', korean:'알겠습니다. 기술 스택에 대해서도 확인해 주세요. 무엇을 사용하나요?', english:'I see. Could you also tell me about the tech stack? What will we be using?', tip:'「技術スタック」= 사용하는 기술의 조합' },
  { id:'itk_8',  speaker:'B', japanese:'バックエンドはRuby on Rails、フロントエンドはReact、DBはPostgreSQLを予定しています。', korean:'백엔드는 Ruby on Rails, 프론트엔드는 React, DB는 PostgreSQL 예정입니다.', english:'We\'re planning Ruby on Rails for the backend, React for the frontend, and PostgreSQL for the DB.', tip:'実際の日本IT企業でよく使われる構成' },
  { id:'itk_9',  speaker:'A', japanese:'ありがとうございます。不明な点が出たらすぐに相談します。よろしくお願いします。', korean:'감사합니다. 불명확한 점이 생기면 바로 상담하겠습니다. 잘 부탁드립니다.', english:'Thank you. I\'ll consult you right away if any questions come up. I\'m looking forward to working with you.', tip:'' },
  { id:'itk_10', speaker:'B', japanese:'こちらこそよろしくお願いします！いいプロジェクトにしましょう！', korean:'저도 잘 부탁드립니다! 좋은 프로젝트로 만들어 봅시다!', english:'Likewise! Let\'s make it a great project!', tip:'' },

  // ══════════════════════════════════════════════════════════
  //  씬5: 사양 확인 · 요건 상담 (it_spec)
  // ══════════════════════════════════════════════════════════
  { id:'itsp_n', speaker:'N', japanese:'', korean:'📍 사양 확인 — 개발 시작 전 요건 확인', english:'📍 Spec confirmation — clarifying requirements before development', tip:'' },
  { id:'itsp_1', speaker:'A', japanese:'田中さん、少しよろしいですか？実装を始める前に仕様を確認したいのですが。', korean:'다나카 씨, 잠깐 괜찮으세요? 구현을 시작하기 전에 사양을 확인하고 싶은데요.', english:'Tanaka-san, do you have a moment? I\'d like to confirm the specs before starting implementation.', tip:'「少しよろしいですか」는 말 걸 때 기본 공식' },
  { id:'itsp_2', speaker:'B', japanese:'はい、どうぞ。', korean:'네, 말씀하세요.', english:'Yes, go ahead.', tip:'' },
  { id:'itsp_3', speaker:'A', japanese:'ユーザー削除機能なのですが、「論理削除」と「物理削除」どちらを想定していますか？', korean:'유저 삭제 기능인데요, 「논리 삭제」와 「물리 삭제」중 어느 것을 상정하고 있나요?', english:'About the user deletion feature — are you thinking of soft delete or hard delete?', tip:'「論理削除」= soft delete, 「物理削除」= hard delete' },
  { id:'itsp_4', speaker:'B', japanese:'論理削除でお願いします。削除後も管理者が確認できるようにしたいです。', korean:'논리 삭제로 부탁드립니다. 삭제 후에도 관리자가 확인할 수 있도록 하고 싶습니다.', english:'Please use soft delete. I\'d like administrators to still be able to see the data after deletion.', tip:'' },
  { id:'itsp_5', speaker:'A', japanese:'わかりました。削除フラグをDBに追加して管理します。もう一点確認なのですが、削除できる権限はどのロールですか？', korean:'알겠습니다. 삭제 플래그를 DB에 추가해서 관리하겠습니다. 한 가지 더 확인인데요, 삭제 권한은 어느 롤인가요?', english:'Understood. I\'ll manage it by adding a delete flag to the DB. One more thing — which role has deletion permissions?', tip:'権限周りの仕様は必ず事前確認' },
  { id:'itsp_6', speaker:'B', japanese:'管理者権限（adminロール）のみです。一般ユーザーは削除できません。', korean:'관리자 권한(admin 롤)만입니다. 일반 유저는 삭제 못 합니다.', english:'Only administrator permissions (admin role). Regular users cannot delete.', tip:'' },
  { id:'itsp_7', speaker:'A', japanese:'承知しました。念のため確認ですが、削除後はログアウト処理も必要ですか？', korean:'알겠습니다. 혹시 몰라 확인인데요, 삭제 후 로그아웃 처리도 필요한가요?', english:'Understood. Just to confirm — is logout processing also necessary after deletion?', tip:'「念のため確認ですが」= 혹시 몰라 확인하는 공손한 표현' },
  { id:'itsp_8', speaker:'B', japanese:'そうですね、アクティブなセッションは全部無効化してください。', korean:'그렇네요, 활성 세션은 전부 무효화해 주세요.', english:'Yes, please invalidate all active sessions.', tip:'セッション管理も重要な実装ポイント' },
  { id:'itsp_9', speaker:'A', japanese:'わかりました。これで仕様が明確になりました。実装を進めます。詳細は設計書にまとめて共有します。', korean:'알겠습니다. 이것으로 사양이 명확해졌습니다. 구현을 진행하겠습니다. 세부 사항은 설계서에 정리해서 공유하겠습니다.', english:'I see. The specs are now clear. I\'ll proceed with implementation. I\'ll summarize the details in a design document and share it.', tip:'設計書で合意を取るのが日本のエンジニアリング文化' },
  { id:'itsp_10',speaker:'B', japanese:'ありがとうございます！設計書はレビューしますね。', korean:'감사합니다! 설계서는 리뷰할게요.', english:'Thank you! I\'ll review the design document.', tip:'' },

  // ══════════════════════════════════════════════════════════
  //  씬6: 입사 첫날 자기소개 (it_intro)
  // ══════════════════════════════════════════════════════════
  { id:'iti_n',  speaker:'N', japanese:'', korean:'📍 입사 첫날 — 팀원 앞에서 자기소개', english:'📍 First day at the company — self-introduction to the team', tip:'' },
  { id:'iti_1',  speaker:'B', japanese:'では、新しいメンバーの方に自己紹介していただきましょう。', korean:'그럼, 새 멤버분 자기소개 부탁드리겠습니다.', english:'Now, let\'s have our new member introduce themselves.', tip:'' },
  { id:'iti_2',  speaker:'A', japanese:'はじめまして。今日からお世話になります。韓国のソウル出身で、パクと申します。', korean:'처음 뵙겠습니다. 오늘부터 잘 부탁드립니다. 한국 서울 출신으로 박이라고 합니다.', english:'Nice to meet you. I\'ll be in your care starting today. I\'m Park, from Seoul, Korea.', tip:'「〜と申します」가 이름 소개의 정중한 형태' },
  { id:'iti_3',  speaker:'A', japanese:'バックエンドエンジニアとして5年の経験があります。主にRubyとPythonを使っています。', korean:'백엔드 엔지니어로서 5년 경험이 있습니다. 주로 Ruby와 Python을 사용하고 있습니다.', english:'I have 5 years of experience as a backend engineer. I mainly use Ruby and Python.', tip:'経験年数と技術スタックを明確に' },
  { id:'iti_4',  speaker:'A', japanese:'日本語の勉強中ですが、皆さんと一緒にいいプロダクトを作りたいと思っています。わからないことがあれば、遠慮なく教えてください。', korean:'일본어 공부 중이지만, 모두와 함께 좋은 프로덕트를 만들고 싶습니다. 모르는 것이 있으면 거리낌 없이 알려주세요.', english:'I\'m studying Japanese, but I want to create a great product together with everyone. Please don\'t hesitate to let me know if there\'s anything I\'m unsure about.', tip:'「遠慮なく」= 거리낌 없이. 谦虚な姿勢が好印象' },
  { id:'iti_5',  speaker:'A', japanese:'どうぞよろしくお願いします！', korean:'잘 부탁드립니다!', english:'I look forward to working with you all!', tip:'' },
  { id:'iti_6',  speaker:'B', japanese:'こちらこそよろしく！困ったことがあればすぐに聞いてくださいね。', korean:'저도 잘 부탁드려요! 어려운 점이 있으면 바로 물어보세요.', english:'Likewise! Please ask right away if you have any questions.', tip:'日本のチームは新人をサポートする文化が強い' },
  { id:'iti_7',  speaker:'A', japanese:'ありがとうございます。まず環境構築を進めても大丈夫ですか？', korean:'감사합니다. 우선 환경 구축을 진행해도 괜찮을까요?', english:'Thank you. Is it okay to start with setting up my development environment?', tip:'初日は環境構築から。「大丈夫ですか？」는 許可を求める丁寧な形' },
  { id:'iti_8',  speaker:'B', japanese:'はい！セットアップドキュメントをSlackに送ります。わからない点があれば声をかけてください。', korean:'네! 셋업 문서를 슬랙에 보낼게요. 모르는 점이 있으면 말씀해 주세요.', english:'Yes! I\'ll send the setup document on Slack. Let me know if anything is unclear.', tip:'' },

];
