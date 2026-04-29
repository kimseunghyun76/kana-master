// ============================================================
//  단어 항목 — W9(IT·테크 어휘) / W10(비즈니스 일본어)
//  목표: 일본 IT 회사에서 실제로 쓰는 언어를 완전 정복
// ============================================================
var VOCAB_ITEMS_W9W10 = [

  // ══════════════════════════════════════════════════════════
  //  W9 ① IT 기초 용어 (it_tech_basic)
  // ══════════════════════════════════════════════════════════
  { id:'it_program',   japanese:'プログラム',                                korean:'프로그램',           english:'Program',                   tip:'「このプログラム、動かない…」' },
  { id:'it_code',      japanese:'コード',                                    korean:'코드',               english:'Code',                      tip:'「コードを書く」「コードをレビューする」' },
  { id:'it_bug',       japanese:'バグ',                                      korean:'버그',               english:'Bug',                       tip:'「バグを見つけた！」「バグを修正する」' },
  { id:'it_error',     japanese:'エラー',                                    korean:'에러',               english:'Error',                     tip:'「エラーが出た」「エラーログを確認して」' },
  { id:'it_server',    japanese:'サーバー',                                  korean:'서버',               english:'Server',                    tip:'「サーバーが落ちた！」장애 상황의 핵심 단어' },
  { id:'it_client',    japanese:'クライアント',                              korean:'클라이언트',         english:'Client',                    tip:'「クライアント側の問題かも」' },
  { id:'it_api',       japanese:'API',          kanji:'API(エーピーアイ)',   korean:'API',                english:'API (Application Programming Interface)', tip:'「APIを叩く」「APIが返すデータ」' },
  { id:'it_db',        japanese:'データベース',                              korean:'데이터베이스',       english:'Database',                  tip:'略してDB。「DBに保存する」' },
  { id:'it_frontend',  japanese:'フロントエンド',                            korean:'프론트엔드',         english:'Front-end',                 tip:'ユーザーが見る画面側。略してフロント' },
  { id:'it_backend',   japanese:'バックエンド',                              korean:'백엔드',             english:'Back-end',                  tip:'サーバー・DB処理側。略してバック' },
  { id:'it_infra',     japanese:'インフラ',                                  korean:'인프라',             english:'Infrastructure',            tip:'「インフラ周りを見てもらえますか？」' },
  { id:'it_docker',    japanese:'ドッカー / Docker',                         korean:'도커',               english:'Docker (container platform)', tip:'「Dockerで動かしてみて」컨테이너 기술' },
  { id:'it_git',       japanese:'ギット / Git',                              korean:'깃',                 english:'Git (version control)',     tip:'「Gitにプッシュした？」버전 관리 필수' },
  { id:'it_github',    japanese:'ギットハブ / GitHub',                       korean:'깃허브',             english:'GitHub',                    tip:'「GitHubのリポジトリを見て」' },
  { id:'it_slack',     japanese:'スラック / Slack',                          korean:'슬랙',               english:'Slack (messaging)',         tip:'「Slackで連絡して」일본 IT 회사의 기본 소통 수단' },
  { id:'it_log',       japanese:'ログ',                                      korean:'로그',               english:'Log',                       tip:'「ログを見てみます」「エラーログを確認」' },
  { id:'it_test',      japanese:'テスト',                                    korean:'테스트',             english:'Test',                      tip:'「テストを書いて」「テストが落ちた」' },
  { id:'it_build',     japanese:'ビルド',                                    korean:'빌드',               english:'Build',                     tip:'「ビルドが通らない」CI/CDと一緒に使う' },
  { id:'it_deploy',    japanese:'デプロイ',                                  korean:'배포 / 디플로이',    english:'Deploy',                    tip:'「本番にデプロイした」「デプロイを止めて！」' },
  { id:'it_release',   japanese:'リリース',                                  korean:'릴리스',             english:'Release',                   tip:'「今日リリースが入ります」' },

  // ══════════════════════════════════════════════════════════
  //  W9 ② 개발 프로세스 용어 (it_dev_process)
  // ══════════════════════════════════════════════════════════
  { id:'it_sprint',    japanese:'スプリント',                                korean:'스프린트',           english:'Sprint (Agile)',             tip:'アジャイル開発の基本単位。通常2週間' },
  { id:'it_task',      japanese:'タスク',                                    korean:'태스크',             english:'Task',                      tip:'「このタスク、誰が担当？」' },
  { id:'it_ticket',    japanese:'チケット',                                  korean:'티켓',               english:'Ticket (issue tracker)',    tip:'Jiraなどで使う作業単位。「チケットを切る」' },
  { id:'it_issue',     japanese:'イシュー / issue',                          korean:'이슈',               english:'Issue (GitHub Issues)',     tip:'「このイシューを対応してもらえますか？」' },
  { id:'it_pr',        japanese:'プルリク / PR',                             korean:'풀리퀘 / PR',        english:'Pull Request',              tip:'「PRを出します」「PRのレビューお願いします」' },
  { id:'it_review',    japanese:'レビュー',                                  korean:'리뷰',               english:'Review / Code review',     tip:'「レビューしてもらえますか？」「レビュー中です」' },
  { id:'it_merge',     japanese:'マージ',                                    korean:'머지',               english:'Merge',                     tip:'「マージしていいですか？」「コンフリクトが出た」' },
  { id:'it_refactor',  japanese:'リファクタリング',                          korean:'리팩토링',           english:'Refactoring',               tip:'「リファクタリングのPRです」コードの整理' },
  { id:'it_debug',     japanese:'デバッグ',                                  korean:'디버그',             english:'Debugging',                 tip:'「今デバッグ中です」' },
  { id:'it_spec',      japanese:'仕様書',         kanji:'仕様書(しようしょ)', korean:'사양서 / 명세서',   english:'Specification document',    tip:'「仕様書を確認してください」' },
  { id:'it_design',    japanese:'設計書',         kanji:'設計書(せっけいしょ)', korean:'설계서',          english:'Design document',           tip:'「設計書を書いてから実装します」' },
  { id:'it_standup',   japanese:'朝会',           kanji:'朝会(あさかい)',     korean:'아침 회의 / 조회',  english:'Morning standup meeting',   tip:'「朝会で共有します」毎日短いMTG' },
  { id:'it_retrospec', japanese:'ふりかえり',     kanji:'振(ふ)り返(かえ)り',          korean:'회고',               english:'Retrospective',             tip:'スプリント終わりに行う改善会議' },
  { id:'it_kpt',       japanese:'KPT',                                       korean:'KPT',                english:'Keep/Problem/Try (retrospective)', tip:'「KPTでまとめます」회고 방식' },
  { id:'it_pipeline',  japanese:'パイプライン',                              korean:'파이프라인',         english:'CI/CD Pipeline',           tip:'「パイプラインが通らない」자동화 프로세스' },

  // ══════════════════════════════════════════════════════════
  //  W9 ③ IT 직장·조직 어휘 (it_workplace)
  // ══════════════════════════════════════════════════════════
  { id:'it_engineer',  japanese:'エンジニア',                                korean:'엔지니어',           english:'Engineer / Developer',     tip:'ITエンジニア全般。バックエンドエンジニアなど' },
  { id:'it_designer',  japanese:'デザイナー',                                korean:'디자이너',           english:'Designer',                  tip:'UIデザイナー、グラフィックデザイナーなど' },
  { id:'it_pm',        japanese:'PM',            kanji:'PM(ピーエム)',        korean:'PM / 프로젝트 매니저', english:'Project Manager',         tip:'「PMに確認してから進めます」' },
  { id:'it_po',        japanese:'PO',            kanji:'PO(ピーオー)',        korean:'PO / 프로덕트 오너', english:'Product Owner',             tip:'「POの判断を仰ぎます」제품 책임자' },
  { id:'it_qa',        japanese:'QA',            kanji:'QA(キューエー)',      korean:'QA / 품질 보증',     english:'Quality Assurance',         tip:'「QAチームに回します」' },
  { id:'it_tl',        japanese:'テックリード / TL',                         korean:'테크리드',           english:'Tech Lead',                 tip:'技術的な方向性をリードする役割' },
  { id:'it_ops',       japanese:'オペレーター / オペ',                       korean:'운영 담당',          english:'Operations / Operator',    tip:'「オペの人に確認して」インフラ運用担当' },
  { id:'it_sre',       japanese:'SRE',           kanji:'SRE(エスアールイー)', korean:'SRE',               english:'Site Reliability Engineer', tip:'サービスの信頼性を担当するエンジニア' },
  { id:'it_deadline',  japanese:'締め切り',      kanji:'締め切り(しめきり)', korean:'마감 / 데드라인',    english:'Deadline',                  tip:'「締め切りはいつですか？」' },
  { id:'it_priority',  japanese:'優先度',        kanji:'優先度(ゆうせんど)', korean:'우선순위 / 우선도',  english:'Priority',                  tip:'「優先度高めでお願いします」' },
  { id:'it_impact',    japanese:'影響範囲',      kanji:'影響範囲(えいきょうはんい)', korean:'영향 범위', english:'Scope of impact',           tip:'「影響範囲を確認してから修正します」' },
  { id:'it_release2',  japanese:'リリース日',    kanji:'リリース日(び)',     korean:'출시일 / 릴리스 날짜', english:'Release date',             tip:'「リリース日は来週月曜です」' },
  { id:'it_production',japanese:'本番',          kanji:'本番(ほんばん)',     korean:'프로덕션 / 운영 환경', english:'Production environment',   tip:'「本番に影響が出た！」장애 상황 표현' },
  { id:'it_staging',   japanese:'ステージング',                              korean:'스테이징',           english:'Staging environment',       tip:'「ステージングで確認してから本番へ」' },
  { id:'it_local',     japanese:'ローカル',                                  korean:'로컬 환경',          english:'Local environment',         tip:'「ローカルでは動くんですが…」' },

  // ══════════════════════════════════════════════════════════
  //  W10 ① 비즈니스 기본 표현 (biz_greetings)
  // ══════════════════════════════════════════════════════════
  { id:'biz_otsu',     japanese:'お疲れ様です', kanji:'お疲れ様(つかれさま)です', korean:'수고하세요 / 수고했어요', english:'Good work / Thanks for your work', tip:'日本職場で最も使う挨拶。出社·退社·メールでも使う' },
  { id:'biz_yoroshiku',japanese:'よろしくお願いします', kanji:'よろしくお願(ねが)いします', korean:'잘 부탁드립니다 (업무용)', english:'I\'m counting on you / Best regards', tip:'メール結語、会議開始など万能フレーズ' },
  { id:'biz_shochi',   japanese:'承知しました',  kanji:'承知(しょうち)しました', korean:'알겠습니다 (정중)', english:'Understood / Certainly (formal)', tip:'ビジネスでの「わかりました」。「了解しました」より丁寧' },
  { id:'biz_ryokai',   japanese:'了解しました',  kanji:'了解(りょうかい)しました', korean:'알겠습니다 (일반)',  english:'Got it / Understood (casual-formal)', tip:'上司には「承知しました」の方が適切' },
  { id:'biz_kashiko',  japanese:'かしこまりました',                          korean:'삼가 알겠습니다 (매우 정중)', english:'Certainly / Of course (very formal)', tip:'最上位の丁寧表現。顧客対応などで' },
  { id:'biz_osewa',    japanese:'お世話になっております', kanji:'お世話(せわ)になっております', korean:'항상 신세지고 있습니다', english:'Thank you for your continued support', tip:'メールの書き出しで必ず使う定型表現' },
  { id:'biz_confirm',  japanese:'ご確認ください', kanji:'ご確認(かくにん)ください', korean:'확인해 주세요', english:'Please confirm / Please review', tip:'「ご確認のほどよろしくお願いします」がより丁寧' },
  { id:'biz_taio',     japanese:'対応します',    kanji:'対応(たいお)します',     korean:'대응하겠습니다 / 처리하겠습니다', english:'I\'ll take care of it / I\'ll handle it', tip:'「すぐに対応します」장애 대응 시 필수' },
  { id:'biz_kentou',   japanese:'検討します',    kanji:'検討(けんとう)します',   korean:'검토하겠습니다',     english:'I\'ll consider it / I\'ll look into it', tip:'곧바로 답변하기 어려울 때 쓰는 표현' },
  { id:'biz_kyoyu',    japanese:'共有します',    kanji:'共有(きょうゆう)します', korean:'공유하겠습니다',     english:'I\'ll share / I\'ll update everyone', tip:'「情報を共有します」Slackでよく使う' },
  { id:'biz_kakunin',  japanese:'確認します',    kanji:'確認(かくにん)します',   korean:'확인하겠습니다',     english:'I\'ll check / I\'ll verify',        tip:'「確認してから連絡します」' },
  { id:'biz_renraku',  japanese:'ご連絡します',  kanji:'ご連絡(れんらく)します', korean:'연락드리겠습니다',   english:'I\'ll get in touch / I\'ll contact you', tip:'「確認次第ご連絡します」' },

  // ══════════════════════════════════════════════════════════
  //  W10 ② 보고·연락·상담 (biz_hourensou)
  //  ほうれんそう = 報告(ほうこく)·連絡(れんらく)·相談(そうだん)
  // ══════════════════════════════════════════════════════════
  { id:'biz_houkoku',  japanese:'報告します',   kanji:'報告(ほうこく)します',   korean:'보고드립니다',       english:'I\'d like to report / Here is my update', tip:'ほうれんそうの「ほ」。「進捗を報告します」' },
  { id:'biz_soudan',   japanese:'相談があります', kanji:'相談(そうだん)があります', korean:'상담드릴 것이 있습니다', english:'I\'d like to consult you / I need advice', tip:'「少しご相談があるのですが…」' },
  { id:'biz_shinchou', japanese:'進捗はいかがですか', kanji:'進捗(しんちょく)はいかがですか', korean:'진행 상황이 어떠세요?', english:'How is the progress? / What is the status?', tip:'「進捗を教えてください」라고도 함' },
  { id:'biz_yotei',    japanese:'予定通りです',  kanji:'予定(よてい)どおりです',  korean:'예정대로입니다',     english:'On schedule / As planned',          tip:'「リリースは予定通りです」' },
  { id:'biz_okure',    japanese:'遅れています',  kanji:'遅(おく)れています',    korean:'늦어지고 있습니다', english:'We are behind schedule / It\'s delayed', tip:'「少し遅れています。明日中には終わります」' },
  { id:'biz_mondai',   japanese:'問題があります', kanji:'問題(もんだい)があります', korean:'문제가 있습니다',   english:'There is an issue / There is a problem', tip:'「本番で問題が起きています！」장애 상황' },
  { id:'biz_kaichou',  japanese:'〜の件でご連絡しました', kanji:'〜の件(けん)でご連絡(れんらく)しました', korean:'〜건으로 연락드렸습니다', english:'I\'m contacting you regarding ~', tip:'메일·Slack 첫 문장으로 자주 사용' },
  { id:'biz_tsuika',   japanese:'追加で確認があります', kanji:'追加(ついか)で確認(かくにん)があります', korean:'추가로 확인할 것이 있습니다', english:'I have an additional question', tip:'「1点追加で確認があります」' },
  { id:'biz_ima',      japanese:'今手が離せないです', kanji:'今(いま)手(て)が離(はな)せないです', korean:'지금 손을 뗄 수 없어요 (바빠요)', english:'I\'m in the middle of something right now', tip:'「少し待ってもらえますか？」와 함께 사용' },
  { id:'biz_ato',      japanese:'後で確認します', kanji:'後(あと)で確認(かくにん)します', korean:'이따가 확인하겠습니다', english:'I\'ll check later / I\'ll get back to you', tip:'「確認次第連絡します」' },

  // ══════════════════════════════════════════════════════════
  //  W10 ③ 회의·의견 표현 (biz_meeting)
  // ══════════════════════════════════════════════════════════
  { id:'biz_gidai',    japanese:'議題',         kanji:'議題(ぎだい)',          korean:'의제 / 안건',        english:'Agenda item / Topic',               tip:'「本日の議題は3点です」' },
  { id:'biz_gijiroku', japanese:'議事録',       kanji:'議事録(ぎじろく)',      korean:'회의록',             english:'Meeting minutes',                   tip:'「議事録をまとめます」' },
  { id:'biz_ikaga',    japanese:'いかがでしょうか',                           korean:'어떻게 생각하십니까?', english:'What do you think? / How does that sound?', tip:'「この案はいかがでしょうか？」부드러운 제안' },
  { id:'biz_iken',     japanese:'ご意見をお聞かせください', kanji:'ご意見(いけん)をお聞(き)かせください', korean:'의견을 말씀해 주세요', english:'Please share your thoughts', tip:'「このポイントについてご意見を」' },
  { id:'biz_ossharu',  japanese:'おっしゃる通りです', kanji:'おっしゃる通(とお)りです', korean:'맞는 말씀입니다', english:'That\'s exactly right / You are correct', tip:'상대방의 의견에 동의할 때. 「仰る」は敬語' },
  { id:'biz_teian',    japanese:'提案があります', kanji:'提案(ていあん)があります', korean:'제안이 있습니다',  english:'I have a proposal / I\'d like to suggest', tip:'「改善案を提案させてください」' },
  { id:'biz_kansha',   japanese:'ご確認いただきありがとうございます', kanji:'ご確認(かくにん)いただきありがとうございます', korean:'확인해 주셔서 감사합니다', english:'Thank you for reviewing / Thank you for checking', tip:'코드 리뷰, 문서 검토 후 감사 표현' },
  { id:'biz_imi',      japanese:'〜という意味でしょうか', kanji:'〜という意味(いみ)でしょうか', korean:'〜라는 의미일까요?', english:'Do you mean ~? / Is that to say ~?', tip:'모를 때 확인하는 정중한 표현. 꼭 외울 것!' },
  { id:'biz_jikan',    japanese:'少々お時間よろしいですか', kanji:'少々(しょうしょう)お時間(じかん)よろしいですか', korean:'잠깐 시간 괜찮으세요?', english:'Do you have a moment? / Could you spare a minute?', tip:'상사나 동료에게 말 걸 때 필수 표현' },
  { id:'biz_omakase',  japanese:'お任せします',  kanji:'お任(まか)せします',   korean:'맡기겠습니다 / 일임합니다', english:'I\'ll leave it to you / I trust your judgment', tip:'「その部分はお任せします」' },
  { id:'biz_wakarima', japanese:'〜について、もう少し教えていただけますか', kanji:'〜について、もう少(すこ)し教(おし)えていただけますか', korean:'〜에 대해 조금 더 알려주실 수 있나요?', english:'Could you explain more about ~?', tip:'회의 중 이해 못 했을 때 쓰는 완벽한 표현' },
  { id:'biz_matome',   japanese:'まとめると〜ということですね', kanji:'まとめると〜ということですね', korean:'정리하면 〜라는 것이죠?', english:'To summarize, it means ~, right?', tip:'회의 종료 시 확인하는 표현. 의사소통 오류 방지' },

];
