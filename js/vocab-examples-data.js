'use strict';
// ─────────────────────────────────────────────
//  VOCAB_EXAMPLES_DB
//  단어 플래시카드 뒷면에 표시할 관련 단어 & 예시 문장
//  키: vocab-data.js 의 item.id
//  수동으로 자유롭게 추가/수정 가능
// ─────────────────────────────────────────────
var VOCAB_EXAMPLES_DB = {

  // ── 숫자 ──
  'num_1': {
    compounds: [
      { japanese: '一枚ください', meaning: '한 장 주세요' },
      { japanese: '一番おすすめは何ですか', meaning: '가장 추천하는 건 뭔가요?' },
    ],
    sentences: [
      { japanese: '入場券、二枚ください。', meaning: '입장권 두 장 주세요.' },
    ],
  },

  // ── 숫자 기본 ──
  'num_2': {
    compounds: [
      { japanese: 'ふたつください', meaning: '두 개 주세요' },
      { japanese: '二人で', meaning: '두 명이서' },
    ],
    sentences: [
      { japanese: 'ふたつください！ひとつずつ食べよう。', meaning: '두 개 주세요! 하나씩 먹자.' },
    ],
  },
  'num_3': {
    compounds: [
      { japanese: 'さんにんです', meaning: '세 명이에요' },
      { japanese: 'みっつください', meaning: '세 개 주세요' },
    ],
    sentences: [
      { japanese: '三枚ください。家族の分ね。', meaning: '세 장 주세요. 가족 거예요.' },
    ],
  },
  'num_4': {
    compounds: [
      { japanese: 'よっつください', meaning: '네 개 주세요' },
      { japanese: 'よんにん', meaning: '네 명' },
    ],
    sentences: [
      { japanese: '四番ホームはどこですか？', meaning: '4번 홈은 어디인가요?' },
    ],
  },
  'num_5': {
    compounds: [
      { japanese: 'いつつください', meaning: '다섯 개 주세요' },
      { japanese: '五分後', meaning: '5분 후' },
    ],
    sentences: [
      { japanese: '五時に待ち合わせしよう！渋谷の出口で。', meaning: '5시에 만나자! 시부야 출구에서.' },
    ],
  },
  'num_6': {
    compounds: [
      { japanese: '六時に起きる', meaning: '6시에 일어나다' },
      { japanese: 'むっつください', meaning: '여섯 개 주세요' },
    ],
    sentences: [
      { japanese: '六番出口を出たらすぐ右ですよ。', meaning: '6번 출구 나오면 바로 오른쪽이에요.' },
    ],
  },
  'num_7': {
    compounds: [
      { japanese: '七時に出発', meaning: '7시에 출발' },
      { japanese: 'ななつください', meaning: '일곱 개 주세요' },
    ],
    sentences: [
      { japanese: '七日間、旅行楽しもう！', meaning: '7일간 여행 즐기자!' },
    ],
  },
  'num_8': {
    compounds: [
      { japanese: '八時に集合', meaning: '8시에 집합' },
      { japanese: 'やっつください', meaning: '여덟 개 주세요' },
    ],
    sentences: [
      { japanese: '八時のバスに乗ろう。遅れないでね。', meaning: '8시 버스 타자. 늦지 마.' },
    ],
  },
  'num_9': {
    compounds: [
      { japanese: '九時オープン', meaning: '9시 오픈' },
      { japanese: 'ここのつください', meaning: '아홉 개 주세요' },
    ],
    sentences: [
      { japanese: '九番のバスはここから乗れますか？', meaning: '9번 버스는 여기서 탈 수 있나요?' },
    ],
  },
  'num_10': {
    compounds: [
      { japanese: '十分後に来ます', meaning: '10분 후에 와요' },
      { japanese: '十人分お願いします', meaning: '10인분 부탁드려요' },
    ],
    sentences: [
      { japanese: '十時に開くって書いてあるよ。あと少し待とう。', meaning: '10시에 연다고 써 있어. 조금만 더 기다리자.' },
    ],
  },
  'num_100': {
    compounds: [
      { japanese: '百円ショップ', meaning: '100엔 숍 (다이소)' },
      { japanese: '三百円です', meaning: '300엔이에요' },
    ],
    sentences: [
      { japanese: '百円ショップ、品揃えがすごい！何でも買えるね！', meaning: '100엔 숍 품목이 엄청나! 다 살 수 있겠다!' },
    ],
  },
  'num_1000': {
    compounds: [
      { japanese: '千円でお釣りをください', meaning: '천 엔으로 거슬러 주세요' },
      { japanese: '五千円札', meaning: '5천 엔짜리 지폐' },
    ],
    sentences: [
      { japanese: '千円札しかないんだけど、大丈夫ですか？', meaning: '천 엔짜리 지폐밖에 없는데 괜찮나요?' },
    ],
  },
  'num_10000': {
    compounds: [
      { japanese: '一万円でいいですか', meaning: '만 엔으로 괜찮나요?' },
      { japanese: '一万円のお釣り', meaning: '만 엔 거스름돈' },
    ],
    sentences: [
      { japanese: '一万円で払います。お釣りをください。', meaning: '만 엔으로 낼게요. 거스름돈 주세요.' },
    ],
  },

  // ── 숫자 응용 ──
  'nap_yen': {
    compounds: [
      { japanese: '何円ですか', meaning: '얼마예요?' },
      { japanese: '千円でお願いします', meaning: '천 엔으로 주세요' },
    ],
    sentences: [
      { japanese: 'これ、何円ですか？えっ、安い！買います！', meaning: '이거 얼마예요? 어, 싸다! 살게요!' },
    ],
  },
  'nap_num11': {
    compounds: [
      { japanese: '十一時に集合', meaning: '11시에 집합' },
      { japanese: '十一番出口', meaning: '11번 출구' },
    ],
    sentences: [
      { japanese: '十一号車に乗ればいいよ。ここからすぐ。', meaning: '11호차 타면 돼. 여기서 바로야.' },
    ],
  },
  'nap_num20': {
    compounds: [
      { japanese: '二十歳', meaning: '20살 (성인)' },
      { japanese: '二十分待ちます', meaning: '20분 기다려요' },
    ],
    sentences: [
      { japanese: '二十分くらい歩けば着くよ。ゆっくり行こう。', meaning: '20분 정도 걸으면 도착해. 천천히 가자.' },
    ],
  },
  'nap_num21': {
    compounds: [
      { japanese: '二十一時発', meaning: '21시 출발' },
      { japanese: '二十一番', meaning: '21번' },
    ],
    sentences: [
      { japanese: '二十一番バスで行けるって！乗り場はどこ？', meaning: '21번 버스로 갈 수 있대! 정류장은 어디야?' },
    ],
  },
  'nap_num50': {
    compounds: [
      { japanese: '五十円玉', meaning: '50엔 동전' },
      { japanese: '五十分後', meaning: '50분 후' },
    ],
    sentences: [
      { japanese: '五十円玉、小銭あると便利だよね。', meaning: '50엔짜리 동전, 잔돈 있으면 편리하지.' },
    ],
  },
  'nap_num99': {
    compounds: [
      { japanese: '九十九円', meaning: '99엔' },
      { japanese: '九十九パーセント', meaning: '99%' },
    ],
    sentences: [
      { japanese: '九十九円！安すぎる！まとめ買いしよう！', meaning: '99엔! 너무 싸! 대량으로 사자!' },
    ],
  },
  'nap_500': {
    compounds: [
      { japanese: '五百円玉', meaning: '500엔 동전' },
      { japanese: '五百円でお願いします', meaning: '500엔으로 주세요' },
    ],
    sentences: [
      { japanese: '五百円玉一枚で払えます？ちょうどある！', meaning: '500엔 동전 한 개로 낼 수 있나요? 딱 있어!' },
    ],
  },
  'nap_mai': {
    compounds: [
      { japanese: 'チケット二枚ください', meaning: '티켓 두 장 주세요' },
      { japanese: '何枚ですか', meaning: '몇 장인가요?' },
    ],
    sentences: [
      { japanese: '入場券、二枚ください。大人二人分です。', meaning: '입장권 두 장 주세요. 어른 두 명 거예요.' },
    ],
  },
  'nap_hon': {
    compounds: [
      { japanese: 'ビール二本ください', meaning: '맥주 두 병 주세요' },
      { japanese: 'ペン一本貸してください', meaning: '펜 한 자루 빌려주세요' },
    ],
    sentences: [
      { japanese: 'ビール二本お願いします！かんぱい！', meaning: '맥주 두 병 주세요! 건배!' },
    ],
  },
  'nap_ko': {
    compounds: [
      { japanese: 'おにぎり三個ください', meaning: '주먹밥 세 개 주세요' },
      { japanese: 'りんご一個', meaning: '사과 한 개' },
    ],
    sentences: [
      { japanese: 'おにぎり三個と、お茶一本ください！', meaning: '주먹밥 세 개랑 차 한 병 주세요!' },
    ],
  },

  // ── 날짜/시간 ──
  'dt_today': {
    compounds: [
      { japanese: '今日の予定は？', meaning: '오늘 일정은?' },
      { japanese: '今日は晴れですね', meaning: '오늘은 맑네요' },
    ],
    sentences: [
      { japanese: '今日はどこ行く？計画してきた？', meaning: '오늘 어디 가? 계획 세워왔어?' },
    ],
  },
  'dt_tmrw': {
    compounds: [
      { japanese: '明日の天気は？', meaning: '내일 날씨는?' },
      { japanese: '明日また来ます', meaning: '내일 또 올게요' },
    ],
    sentences: [
      { japanese: '明日も晴れるといいね！また出かけよう！', meaning: '내일도 맑으면 좋겠다! 또 나가자!' },
    ],
  },
  'dt_yest': {
    compounds: [
      { japanese: '昨日はどうでしたか', meaning: '어제는 어땠나요?' },
      { japanese: '昨日行ったお店', meaning: '어제 간 가게' },
    ],
    sentences: [
      { japanese: '昨日のラーメン、最高だったね！また行こう！', meaning: '어제 라멘 최고였다! 또 가자!' },
    ],
  },
  'dt_now': {
    compounds: [
      { japanese: '今どこですか？', meaning: '지금 어디예요?' },
      { japanese: '今すぐ行きます', meaning: '지금 바로 갈게요' },
    ],
    sentences: [
      { japanese: '今どこ？もう着いた？こっちもうすぐだよ！', meaning: '지금 어디야? 벌써 도착했어? 이쪽도 곧이야!' },
    ],
  },
  'dt_ji': {
    compounds: [
      { japanese: '何時ですか', meaning: '몇 시예요?' },
      { japanese: '三時に待ち合わせ', meaning: '3시에 만나요' },
    ],
    sentences: [
      { japanese: '何時に出発する？九時のバス間に合う？', meaning: '몇 시에 출발해? 9시 버스 탈 수 있어?' },
    ],
  },
  'dt_fun': {
    compounds: [
      { japanese: '十分後に来ます', meaning: '10분 후에 와요' },
      { japanese: 'あと何分ですか', meaning: '앞으로 몇 분이에요?' },
    ],
    sentences: [
      { japanese: 'あと何分で着く？お腹空いてきた…', meaning: '앞으로 몇 분이면 도착해? 배고파지는데…' },
    ],
  },
  'dt_han': {
    compounds: [
      { japanese: '三時半に集合', meaning: '3시 반에 집합' },
      { japanese: '一時間半かかる', meaning: '한 시간 반 걸려' },
    ],
    sentences: [
      { japanese: '二時半に集合ね！忘れないでよ！', meaning: '2시 반에 집합이야! 잊지 마!' },
    ],
  },
  'dt_mon': {
    compounds: [
      { japanese: '月曜定休日', meaning: '월요일 휴무' },
      { japanese: '毎週月曜日', meaning: '매주 월요일' },
    ],
    sentences: [
      { japanese: '月曜日は定休日だって！明日また来よう。', meaning: '월요일은 휴무래! 내일 또 오자.' },
    ],
  },
  'dt_tue': {
    compounds: [
      { japanese: '火曜日から営業', meaning: '화요일부터 영업' },
      { japanese: '火曜日にまた来ます', meaning: '화요일에 또 올게요' },
    ],
    sentences: [
      { japanese: '火曜日にセールがあるって！また来ようよ！', meaning: '화요일에 세일 있대! 또 오자!' },
    ],
  },
  'dt_wed': {
    compounds: [
      { japanese: '水曜割引', meaning: '수요일 할인' },
      { japanese: '水曜日は混む', meaning: '수요일은 붐벼' },
    ],
    sentences: [
      { japanese: '水曜日は割引があるって！次来るとき狙おう！', meaning: '수요일은 할인 있대! 다음에 올 때 노리자!' },
    ],
  },
  'dt_thu': {
    compounds: [
      { japanese: '木曜日に予約', meaning: '목요일에 예약' },
      { japanese: '木曜の夜', meaning: '목요일 밤' },
    ],
    sentences: [
      { japanese: '木曜日にまた来れそう？一緒に来よう！', meaning: '목요일에 또 올 수 있을 것 같아? 같이 오자!' },
    ],
  },
  'dt_fri': {
    compounds: [
      { japanese: '金曜日は混んでいます', meaning: '금요일은 붐벼요' },
      { japanese: '金曜の夜', meaning: '금요일 밤' },
    ],
    sentences: [
      { japanese: '金曜の夜は混むから気をつけよう。', meaning: '금요일 밤은 붐비니까 조심하자.' },
    ],
  },
  'dt_sat': {
    compounds: [
      { japanese: '土曜日は混雑', meaning: '토요일은 혼잡' },
      { japanese: '土曜日特別メニュー', meaning: '토요일 특별 메뉴' },
    ],
    sentences: [
      { japanese: '土曜日は人が多い！早めに行こう！', meaning: '토요일은 사람이 많아! 일찍 가자!' },
    ],
  },
  'dt_sun': {
    compounds: [
      { japanese: '日曜日休み', meaning: '일요일 휴무' },
      { japanese: '日曜日は家族連れ多い', meaning: '일요일은 가족 동반 많아' },
    ],
    sentences: [
      { japanese: '日曜日、どこ行こうか？混むかな…', meaning: '일요일에 어디 갈까? 붐빌까…' },
    ],
  },
  'dt_am': {
    compounds: [
      { japanese: '午前十時開店', meaning: '오전 10시 개점' },
      { japanese: '午前中に行こう', meaning: '오전 중에 가자' },
    ],
    sentences: [
      { japanese: '午前中に行った方が空いてるよ！混む前に！', meaning: '오전에 가는 게 한산해! 붐비기 전에!' },
    ],
  },
  'dt_pm': {
    compounds: [
      { japanese: '午後三時から', meaning: '오후 3시부터' },
      { japanese: '午後は混む', meaning: '오후는 붐벼' },
    ],
    sentences: [
      { japanese: '午後になったら混んできたね。早めに来てよかった！', meaning: '오후 되니까 붐비기 시작했네. 일찍 와서 다행이야!' },
    ],
  },
  'dt_nan': {
    compounds: [
      { japanese: '今、何時ですか？', meaning: '지금 몇 시예요?' },
      { japanese: '何時に集合ですか', meaning: '몇 시에 집합인가요?' },
    ],
    sentences: [
      { japanese: 'すみません、今何時ですか？時計がなくて。', meaning: '저기요, 지금 몇 시예요? 시계가 없어서요.' },
    ],
  },
  'dt_open': {
    compounds: [
      { japanese: '営業中ですか', meaning: '영업 중인가요?' },
      { japanese: '何時まで営業ですか', meaning: '몇 시까지 영업해요?' },
    ],
    sentences: [
      { japanese: '営業中だ！入ろう！閉まる前に急いで！', meaning: '영업 중이다! 들어가자! 닫기 전에 서둘러!' },
    ],
  },

  // ── 음식 ──
  'food_tempura': {
    compounds: [
      { japanese: '天ぷら定食をください', meaning: '텐푸라 정식 주세요' },
      { japanese: 'えびの天ぷら', meaning: '새우 튀김' },
    ],
    sentences: [
      { japanese: '天ぷら、サクサクで最高！さつまいもが好き！', meaning: '텐푸라 바삭바삭 최고! 고구마가 좋아!' },
    ],
  },
  'food_udon': {
    compounds: [
      { japanese: 'うどんひとつください', meaning: '우동 하나 주세요' },
      { japanese: 'きつねうどん', meaning: '기쓰네 우동 (유부 우동)' },
    ],
    sentences: [
      { japanese: 'うどん、やわらかくておいしい！つゆも飲んじゃった！', meaning: '우동 부드럽고 맛있어! 국물도 다 마셔버렸어!' },
    ],
  },
  'food_soba': {
    compounds: [
      { japanese: 'もりそばください', meaning: '모리소바 주세요 (냉 소바)' },
      { japanese: 'かけそば', meaning: '가케소바 (온 소바)' },
    ],
    sentences: [
      { japanese: 'そば、こしがあっておいしい！ざるにしてよかった！', meaning: '소바 쫄깃쫄깃 맛있어! 자루로 한 게 잘했다!' },
    ],
  },
  'food_onigiri': {
    compounds: [
      { japanese: 'おにぎりを三つください', meaning: '주먹밥 세 개 주세요' },
      { japanese: 'ツナマヨのおにぎり', meaning: '참치마요 주먹밥' },
    ],
    sentences: [
      { japanese: 'コンビニのおにぎり、種類が多くて迷う！', meaning: '편의점 주먹밥 종류가 많아서 고민돼!' },
    ],
  },
  'food_miso': {
    compounds: [
      { japanese: '味噌汁をください', meaning: '된장국 주세요' },
      { japanese: '朝ごはんに味噌汁', meaning: '아침밥에 된장국' },
    ],
    sentences: [
      { japanese: '味噌汁、ホッとする味だね。日本の朝ごはんいいな。', meaning: '된장국 마음이 따뜻해지는 맛이네. 일본 아침밥 좋다.' },
    ],
  },
  'food_sake': {
    compounds: [
      { japanese: 'お酒をください', meaning: '술 주세요' },
      { japanese: '日本酒をひとつ', meaning: '일본주 하나요' },
    ],
    sentences: [
      { japanese: '日本酒、初めて飲んだけどおいしい！甘い！', meaning: '일본주 처음 마셨는데 맛있어! 달아!' },
    ],
  },
  'food_biru': {
    compounds: [
      { japanese: 'ビールをふたつください', meaning: '맥주 두 잔 주세요' },
      { japanese: '生ビール', meaning: '생맥주 (나마비루)' },
    ],
    sentences: [
      { japanese: '生ビール、最高！かんぱい！旅行に乾杯！', meaning: '생맥주 최고! 건배! 여행에 건배!' },
    ],
  },
  'food_mizu': {
    compounds: [
      { japanese: 'お水をください', meaning: '물 주세요' },
      { japanese: 'お冷やをください', meaning: '얼음물 주세요' },
    ],
    sentences: [
      { japanese: 'お水、ください！辛くて喉が渇いた！', meaning: '물 주세요! 매워서 목 말랐어!' },
    ],
  },
  'food_ocha': {
    compounds: [
      { japanese: 'お茶をください', meaning: '차 주세요' },
      { japanese: '温かいお茶', meaning: '따뜻한 차' },
    ],
    sentences: [
      { japanese: 'お茶、無料なの？！すごい、日本はすてきだね！', meaning: '차 무료야?! 대박, 일본은 멋지다!' },
    ],
  },
  'food_menu': {
    compounds: [
      { japanese: 'メニューをください', meaning: '메뉴 주세요' },
      { japanese: 'おすすめメニューは何ですか', meaning: '추천 메뉴는 뭔가요?' },
    ],
    sentences: [
      { japanese: 'メニュー、写真付きでよかった！これにする！', meaning: '메뉴 사진 있어서 다행이야! 이걸로 할게!' },
    ],
  },
  'food_teishoku': {
    compounds: [
      { japanese: '定食をひとつください', meaning: '정식 하나 주세요' },
      { japanese: 'ランチ定食', meaning: '런치 정식' },
    ],
    sentences: [
      { japanese: '定食にしよう！ご飯もみそ汁もついてくるよ！', meaning: '정식으로 하자! 밥도 된장국도 나와!' },
    ],
  },
  'food_ikura': {
    compounds: [
      { japanese: 'これはいくらですか', meaning: '이거 얼마예요?' },
      { japanese: '全部でいくらですか', meaning: '전부 얼마예요?' },
    ],
    sentences: [
      { japanese: 'いくら？予算内なら買おう！高くても記念にね！', meaning: '얼마야? 예산 안이면 사자! 비싸도 기념으로!' },
    ],
  },

  'food_ramen': {
    compounds: [
      { japanese: 'ラーメン二つください', meaning: '라멘 두 개 주세요' },
      { japanese: 'おすすめのラーメンは何ですか', meaning: '추천하는 라멘은 뭔가요?' },
    ],
    sentences: [
      { japanese: 'ここのラーメン、おいしいね！また来ようか？', meaning: '여기 라멘 맛있다! 또 올까?' },
    ],
  },
  'food_sushi': {
    compounds: [
      { japanese: 'おまかせでお願いします', meaning: '셰프 추천으로 부탁드려요' },
      { japanese: 'このネタは何ですか', meaning: '이 토핑은 뭔가요?' },
    ],
    sentences: [
      { japanese: 'お寿司、どれにする？好きなの頼もう！', meaning: '초밥 뭐로 할래? 좋아하는 거 시키자!' },
    ],
  },
  'food_okane': {
    compounds: [
      { japanese: 'お会計をお願いします', meaning: '계산해 주세요' },
      { japanese: 'カードで払えますか', meaning: '카드로 결제할 수 있나요?' },
    ],
    sentences: [
      { japanese: 'そろそろお会計にしようか。割り勘にする？', meaning: '슬슬 계산할까. 각자 낼까?' },
    ],
  },

  // ── 교통/장소 ──
  'tr_eki': {
    compounds: [
      { japanese: '駅はどこですか', meaning: '역은 어디인가요?' },
      { japanese: '駅まで歩けますか', meaning: '역까지 걸을 수 있나요?' },
    ],
    sentences: [
      { japanese: '駅まで何分？歩いて行ける？', meaning: '역까지 몇 분이야? 걸어갈 수 있어?' },
    ],
  },
  'tr_bus': {
    compounds: [
      { japanese: '何番バスに乗りますか', meaning: '몇 번 버스 타나요?' },
      { japanese: 'バス停はどこですか', meaning: '버스 정류장은 어디예요?' },
    ],
    sentences: [
      { japanese: 'バス、来た！乗ろう！お金は？Suicaある？', meaning: '버스 왔다! 타자! 돈은? 스이카 있어?' },
    ],
  },
  'tr_taxi': {
    compounds: [
      { japanese: 'タクシーを呼んでください', meaning: '택시 불러 주세요' },
      { japanese: 'ホテルまでお願いします', meaning: '호텔까지 가주세요' },
    ],
    sentences: [
      { japanese: 'タクシーにしよう！荷物重いし、足も痛いし。', meaning: '택시로 하자! 짐도 무겁고 발도 아프니까.' },
    ],
  },
  'tr_densha': {
    compounds: [
      { japanese: '電車は何時に来ますか', meaning: '전철은 몇 시에 오나요?' },
      { japanese: '電車で行こう', meaning: '전철로 가자' },
    ],
    sentences: [
      { japanese: '電車、乗り間違えた！次で戻ろう！', meaning: '전철 잘못 탔어! 다음에서 돌아가자!' },
    ],
  },
  'tr_shink': {
    compounds: [
      { japanese: '新幹線のチケットはどこで買えますか', meaning: '신칸센 티켓은 어디서 살 수 있나요?' },
      { japanese: '新幹線で東京へ', meaning: '신칸센으로 도쿄로' },
    ],
    sentences: [
      { japanese: '新幹線、速い！もうもう着いた？！すごい！', meaning: '신칸센 빠르다! 벌써 도착했어?! 대박!' },
    ],
  },
  'tr_airport': {
    compounds: [
      { japanese: '空港まで何時間かかりますか', meaning: '공항까지 몇 시간 걸려요?' },
      { japanese: '空港バスはありますか', meaning: '공항 버스 있나요?' },
    ],
    sentences: [
      { japanese: '空港、迷子になりそう！でっかい！', meaning: '공항 길 잃을 것 같아! 엄청 크다!' },
    ],
  },
  'tr_hotel': {
    compounds: [
      { japanese: 'ホテルはどこですか', meaning: '호텔은 어디예요?' },
      { japanese: 'このホテルまでお願いします', meaning: '이 호텔까지 가주세요' },
    ],
    sentences: [
      { japanese: 'ホテル、きれいで広い！テンション上がる！', meaning: '호텔 깨끗하고 넓어! 신난다!' },
    ],
  },
  'tr_ryokan': {
    compounds: [
      { japanese: '旅館に泊まりたい', meaning: '료칸에 묵고 싶어' },
      { japanese: '旅館の浴衣が着たい', meaning: '료칸 유카타 입고 싶어' },
    ],
    sentences: [
      { japanese: '旅館、初めて！温泉入って浴衣着よう！最高！', meaning: '료칸 처음이야! 온천 들어가고 유카타 입자! 최고!' },
    ],
  },
  'tr_konbini': {
    compounds: [
      { japanese: '近くにコンビニはありますか', meaning: '근처에 편의점 있나요?' },
      { japanese: 'コンビニで買ってくる', meaning: '편의점에서 사올게' },
    ],
    sentences: [
      { japanese: 'コンビニ、何でも揃ってる！日本最高すぎる！', meaning: '편의점 뭐든 다 있어! 일본 너무 최고야!' },
    ],
  },
  'tr_toilet': {
    compounds: [
      { japanese: 'トイレはどこですか', meaning: '화장실은 어디예요?' },
      { japanese: 'すみません、トイレを貸してください', meaning: '저기요, 화장실 좀 써도 될까요?' },
    ],
    sentences: [
      { japanese: 'トイレどこ？ちょっと待って！すぐ行ってくる！', meaning: '화장실 어디야? 잠깐만! 바로 갔다 올게!' },
    ],
  },
  'tr_exit': {
    compounds: [
      { japanese: '出口はどこですか', meaning: '출구는 어디예요?' },
      { japanese: '三番出口', meaning: '3번 출구' },
    ],
    sentences: [
      { japanese: '出口どこ？A出口から出るんだよ！案内板見て！', meaning: '출구 어디야? A출구로 나가는 거야! 안내판 봐!' },
    ],
  },
  'tr_enter': {
    compounds: [
      { japanese: '入口はどこですか', meaning: '입구는 어디예요?' },
      { japanese: '入口から入ってください', meaning: '입구로 들어오세요' },
    ],
    sentences: [
      { japanese: '入口、こっちだよ！あっちは出口！', meaning: '입구는 이쪽이야! 저쪽은 출구!' },
    ],
  },
  'tr_right': {
    compounds: [
      { japanese: '右に曲がってください', meaning: '오른쪽으로 도세요' },
      { japanese: '右側にあります', meaning: '오른쪽에 있어요' },
    ],
    sentences: [
      { japanese: '右に曲がって、すぐ左にあるよ！', meaning: '오른쪽으로 돌아서 바로 왼쪽에 있어!' },
    ],
  },
  'tr_left': {
    compounds: [
      { japanese: '左に曲がってください', meaning: '왼쪽으로 도세요' },
      { japanese: '左側にあります', meaning: '왼쪽에 있어요' },
    ],
    sentences: [
      { japanese: 'この角を左に曲がると駅があるよ。', meaning: '이 모퉁이를 왼쪽으로 돌면 역이 있어.' },
    ],
  },
  'tr_straight': {
    compounds: [
      { japanese: 'まっすぐ行ってください', meaning: '직진해 주세요' },
      { japanese: 'まっすぐ五分です', meaning: '직진으로 5분이에요' },
    ],
    sentences: [
      { japanese: 'まっすぐ行けばすぐだよ！曲がらないで！', meaning: '직진하면 바로야! 꺾지 마!' },
    ],
  },
  'dir_toshokan': {
    compounds: [
      { japanese: '三番口を出てください', meaning: '3번 출구로 나가세요' },
      { japanese: '南口を出てください', meaning: '남쪽 출구로 나가세요' },
    ],
    sentences: [
      { japanese: '東口を出てまっすぐ行けばすぐですよ。', meaning: '동쪽 출구 나와서 직진하면 바로예요.' },
    ],
  },

  // ── 교통 상세 ──
  'td_shink': {
    compounds: [
      { japanese: '新幹線のホームはどこですか', meaning: '신칸센 플랫폼은 어디예요?' },
      { japanese: 'のぞみに乗ります', meaning: '노조미를 탈게요' },
    ],
    sentences: [
      { japanese: '新幹線、初乗り！速い！富士山見えた！！', meaning: '신칸센 첫 탑승! 빠르다! 후지산 보였어!!' },
    ],
  },
  'td_jiyuuseki': {
    compounds: [
      { japanese: '自由席はどこですか', meaning: '자유석은 어디예요?' },
      { japanese: '自由席はありますか', meaning: '자유석은 있나요?' },
    ],
    sentences: [
      { japanese: '自由席にしよう。空いてるかな？早めに行こう！', meaning: '자유석으로 하자. 자리 있을까? 일찍 가자!' },
    ],
  },
  'td_suica': {
    compounds: [
      { japanese: 'Suicaで払えますか', meaning: '스이카로 낼 수 있나요?' },
      { japanese: 'Suicaにチャージしたい', meaning: '스이카에 충전하고 싶어' },
    ],
    sentences: [
      { japanese: 'Suica、コンビニでも使えるの？便利すぎる！', meaning: '스이카 편의점에서도 돼? 너무 편리해!' },
    ],
  },
  'td_kippu': {
    compounds: [
      { japanese: '切符を一枚ください', meaning: '표 한 장 주세요' },
      { japanese: 'どこで切符を買えますか', meaning: '어디서 표 살 수 있나요?' },
    ],
    sentences: [
      { japanese: '切符買い方わからない！駅員さんに聞こう！', meaning: '표 사는 방법 모르겠어! 역무원한테 물어보자!' },
    ],
  },
  'td_norikae': {
    compounds: [
      { japanese: '乗り換えはどこですか', meaning: '환승은 어디서 해요?' },
      { japanese: '山手線に乗り換えます', meaning: '야마노테선으로 환승해요' },
    ],
    sentences: [
      { japanese: '乗り換え、ここでいいの？路線図見てみよう。', meaning: '환승 여기서 맞아? 노선도 봐보자.' },
    ],
  },
  'td_yuki': {
    compounds: [
      { japanese: '新宿行きはどこですか', meaning: '신주쿠행은 어디예요?' },
      { japanese: '東京行きに乗ります', meaning: '도쿄행을 탈게요' },
    ],
    sentences: [
      { japanese: 'これ、新宿行き？乗り間違えてない？確認して！', meaning: '이거 신주쿠행 맞아? 잘못 탄 거 아니야? 확인해!' },
    ],
  },
  'td_noriba': {
    compounds: [
      { japanese: 'バスの乗り場はどこですか', meaning: '버스 승강장은 어디예요?' },
      { japanese: '何番乗り場ですか', meaning: '몇 번 승강장이에요?' },
    ],
    sentences: [
      { japanese: '乗り場どこ？案内板を見よう！あ、あそこだ！', meaning: '승강장 어디야? 안내판 보자! 아, 저기다!' },
    ],
  },
  'td_jikanhyo': {
    compounds: [
      { japanese: '時刻表を見てください', meaning: '시간표를 봐 주세요' },
      { japanese: '時刻表はどこにありますか', meaning: '시간표는 어디에 있나요?' },
    ],
    sentences: [
      { japanese: '時刻表確認して！次のバス何時？', meaning: '시간표 확인해! 다음 버스 몇 시야?' },
    ],
  },
  'td_maniau': {
    compounds: [
      { japanese: '間に合いますか？', meaning: '시간에 맞을까요?' },
      { japanese: 'まだ間に合う！', meaning: '아직 시간이 있어!' },
    ],
    sentences: [
      { japanese: '間に合う？走れば大丈夫！急いで！！', meaning: '시간 맞아? 뛰면 괜찮아! 서둘러!!' },
    ],
  },
  'td_taxi': {
    compounds: [
      { japanese: 'タクシーを呼んでください', meaning: '택시 불러 주세요' },
      { japanese: 'このホテルまでお願いします', meaning: '이 호텔까지 가주세요' },
    ],
    sentences: [
      { japanese: 'タクシー呼んでもらえますか？荷物が多くて。', meaning: '택시 불러주실 수 있나요? 짐이 많아서요.' },
    ],
  },
  'td_teiryu': {
    compounds: [
      { japanese: 'バス停はどこですか', meaning: '버스 정류장은 어디예요?' },
      { japanese: 'この停留所で降ります', meaning: '이 정류장에서 내려요' },
    ],
    sentences: [
      { japanese: 'この停留所でいい？降りる準備して！', meaning: '이 정류장에서 내리면 돼? 내릴 준비해!' },
    ],
  },
  'td_madogawa': {
    compounds: [
      { japanese: '窓側の席はありますか', meaning: '창가석은 있나요?' },
      { japanese: '窓側に座りたいです', meaning: '창가에 앉고 싶어요' },
    ],
    sentences: [
      { japanese: '窓側にしよう！富士山見えるかも！', meaning: '창가로 하자! 후지산 보일지도!' },
    ],
  },

  // ── 스몰토크 ──
  'st_hisashiburi': {
    compounds: [
      { japanese: 'お久しぶりです！', meaning: '오랜만이에요!' },
      { japanese: 'お久しぶりですね、お元気ですか', meaning: '오랜만이에요, 잘 지내셨어요?' },
    ],
    sentences: [
      { japanese: 'お久しぶりです！日本まで来てくれたんですね！', meaning: '오랜만이에요! 일본까지 와줬네요!' },
    ],
  },
  'st_ogenki': {
    compounds: [
      { japanese: 'お元気ですか？', meaning: '잘 지내세요?' },
      { japanese: 'はい、おかげさまで元気です', meaning: '네, 덕분에 잘 지냈어요' },
    ],
    sentences: [
      { japanese: 'お元気ですか？最近どうですか？', meaning: '잘 지내세요? 요즘 어떻게 지내요?' },
    ],
  },
  'st_tenki': {
    compounds: [
      { japanese: '今日はいい天気ですね', meaning: '오늘 날씨 좋죠?' },
      { japanese: 'いい天気だから散歩しましょう', meaning: '좋은 날씨니까 산책해요' },
    ],
    sentences: [
      { japanese: 'いい天気ですね！観光日和ですね！どこへ行きますか？', meaning: '날씨 좋죠! 관광하기 딱이네요! 어디 가세요?' },
    ],
  },
  'st_atsui': {
    compounds: [
      { japanese: '暑いですね！', meaning: '덥네요!' },
      { japanese: '今日は暑いから水分補給してね', meaning: '오늘 더우니까 수분 보충해요' },
    ],
    sentences: [
      { japanese: '暑いですね！かき氷食べませんか？', meaning: '덥네요! 빙수 안 드실래요?' },
    ],
  },
  'st_samui': {
    compounds: [
      { japanese: '寒いですね！', meaning: '춥네요!' },
      { japanese: '寒いので温かいものを飲みましょう', meaning: '추우니까 따뜻한 것 마셔요' },
    ],
    sentences: [
      { japanese: '寒いですね！温かいラーメンが食べたいですね！', meaning: '춥네요! 따뜻한 라멘 먹고 싶네요!' },
    ],
  },
  'st_shumi': {
    compounds: [
      { japanese: '趣味は何ですか？', meaning: '취미가 뭐예요?' },
      { japanese: '私の趣味は旅行です', meaning: '제 취미는 여행이에요' },
    ],
    sentences: [
      { japanese: '趣味は旅行です！日本は三回目です！', meaning: '취미가 여행이에요! 일본은 세 번째예요!' },
    ],
  },
  'st_suki': {
    compounds: [
      { japanese: '日本料理が好きです', meaning: '일본 음식을 좋아해요' },
      { japanese: 'どんな食べ物が好きですか', meaning: '어떤 음식 좋아해요?' },
    ],
    sentences: [
      { japanese: '日本の食べ物、全部好きです！特にラーメンが！', meaning: '일본 음식 전부 좋아요! 특히 라멘이요!' },
    ],
  },
  'st_tanoshii': {
    compounds: [
      { japanese: '楽しいですね！', meaning: '즐겁네요!' },
      { japanese: '一緒にいて楽しい', meaning: '같이 있어서 즐거워' },
    ],
    sentences: [
      { japanese: '楽しい！日本に来てよかった！また来ます！', meaning: '즐거워! 일본에 와서 다행이야! 또 올게요!' },
    ],
  },
  'st_sugoi': {
    compounds: [
      { japanese: 'すごいですね！', meaning: '대단하네요!' },
      { japanese: 'すごい景色！', meaning: '대단한 경치!' },
    ],
    sentences: [
      { japanese: 'すごい！こんなに大きいとは思わなかった！', meaning: '대박! 이렇게 클 줄은 몰랐어!' },
    ],
  },
  'st_taihen': {
    compounds: [
      { japanese: '大変でしたね', meaning: '힘드셨겠네요' },
      { japanese: '大変ですが、頑張ってください', meaning: '힘들겠지만 힘내세요' },
    ],
    sentences: [
      { japanese: '大変でしたね。でもよく来られましたね！', meaning: '힘드셨겠어요. 그래도 잘 오셨네요!' },
    ],
  },
  'st_mata': {
    compounds: [
      { japanese: 'また会いましょう！', meaning: '또 만나요!' },
      { japanese: 'また来てください', meaning: '또 와 주세요' },
    ],
    sentences: [
      { japanese: 'また会いましょう！今日は楽しかったです！', meaning: '또 만나요! 오늘 즐거웠어요!' },
    ],
  },
  'st_omedetou': {
    compounds: [
      { japanese: 'おめでとうございます！', meaning: '축하드려요!' },
      { japanese: 'お誕生日おめでとうございます', meaning: '생일 축하드려요' },
    ],
    sentences: [
      { japanese: 'おめでとうございます！乾杯しましょう！', meaning: '축하해요! 건배해요!' },
    ],
  },
  'st_issho': {
    compounds: [
      { japanese: '一緒に行きましょう！', meaning: '같이 가요!' },
      { japanese: '一緒に写真を撮りましょう', meaning: '같이 사진 찍어요' },
    ],
    sentences: [
      { japanese: '一緒に行きましょう！一人より楽しいから！', meaning: '같이 가요! 혼자보다 즐거우니까!' },
    ],
  },
  'st_nani': {
    compounds: [
      { japanese: '何が食べたいですか？', meaning: '뭐 먹고 싶어요?' },
      { japanese: '今日の夜、何食べましょうか', meaning: '오늘 저녁 뭐 먹을까요?' },
    ],
    sentences: [
      { japanese: '何が食べたいですか？おすすめを教えますよ！', meaning: '뭐 먹고 싶어요? 추천해드릴게요!' },
    ],
  },
  'st_yoroshiku': {
    compounds: [
      { japanese: 'よろしくお願いします', meaning: '잘 부탁드립니다' },
      { japanese: 'はじめまして、よろしくお願いします', meaning: '처음 뵙겠습니다, 잘 부탁드려요' },
    ],
    sentences: [
      { japanese: 'はじめまして！どうぞよろしくお願いします！', meaning: '처음 뵙겠습니다! 잘 부탁드려요!' },
    ],
  },

  // ── 호텔 ──
  'ht_checkin': {
    compounds: [
      { japanese: 'チェックインお願いします', meaning: '체크인 부탁드려요' },
      { japanese: '何時からチェックインできますか', meaning: '몇 시부터 체크인 가능한가요?' },
    ],
    sentences: [
      { japanese: 'チェックインをお願いします。田中で予約しました。', meaning: '체크인 부탁드려요. 다나카로 예약했어요.' },
    ],
  },
  'ht_checkout': {
    compounds: [
      { japanese: 'チェックアウトをお願いします', meaning: '체크아웃 부탁드려요' },
      { japanese: '何時までにチェックアウトですか', meaning: '몇 시까지 체크아웃인가요?' },
    ],
    sentences: [
      { japanese: 'チェックアウトをお願いします。荷物を預かってもらえますか？', meaning: '체크아웃 부탁드려요. 짐을 맡아주실 수 있나요?' },
    ],
  },
  'ht_yoyaku': {
    compounds: [
      { japanese: '予約をしています', meaning: '예약했어요' },
      { japanese: '予約の確認をお願いします', meaning: '예약 확인 부탁드려요' },
    ],
    sentences: [
      { japanese: '予約をしています。名前はキムです。', meaning: '예약했어요. 이름은 김입니다.' },
    ],
  },
  'ht_goushitsu': {
    compounds: [
      { japanese: '何号室ですか？', meaning: '몇 호실인가요?' },
      { japanese: '部屋番号を教えてください', meaning: '방 번호 알려주세요' },
    ],
    sentences: [
      { japanese: '何号室ですか？鍵をもらえますか？', meaning: '몇 호실인가요? 열쇠 받을 수 있나요?' },
    ],
  },
  'ht_choshoku': {
    compounds: [
      { japanese: '朝食はつきますか？', meaning: '조식 포함인가요?' },
      { japanese: '朝食は何時からですか', meaning: '조식은 몇 시부터예요?' },
    ],
    sentences: [
      { japanese: '朝食付きですか？何時から食べられますか？', meaning: '조식 포함인가요? 몇 시부터 먹을 수 있나요?' },
    ],
  },
  'ht_kagi': {
    compounds: [
      { japanese: '鍵をなくしました', meaning: '열쇠를 잃어버렸어요' },
      { japanese: '鍵が壊れています', meaning: '열쇠가 고장났어요' },
    ],
    sentences: [
      { japanese: '鍵をなくしました！どうしたらいいですか？', meaning: '열쇠 잃어버렸어요! 어떻게 하면 되나요?' },
    ],
  },
  'ht_taoru': {
    compounds: [
      { japanese: 'タオルをください', meaning: '수건 주세요' },
      { japanese: 'タオルをもう一枚ください', meaning: '수건 한 장 더 주세요' },
    ],
    sentences: [
      { japanese: 'タオルをもう二枚いただけますか？', meaning: '수건 두 장 더 받을 수 있을까요?' },
    ],
  },
  'ht_moningcall': {
    compounds: [
      { japanese: 'モーニングコールをお願いします', meaning: '모닝콜 부탁드려요' },
      { japanese: '六時にモーニングコールをください', meaning: '6시에 모닝콜 주세요' },
    ],
    sentences: [
      { japanese: '明日、六時にモーニングコールをお願いします。', meaning: '내일 6시에 모닝콜 부탁드려요.' },
    ],
  },
  'ht_room': {
    compounds: [
      { japanese: 'ルームサービスをお願いします', meaning: '룸서비스 부탁드려요' },
      { japanese: 'ルームサービスのメニューはありますか', meaning: '룸서비스 메뉴가 있나요?' },
    ],
    sentences: [
      { japanese: 'ルームサービスをお願いします。ビールを二本と、おつまみを。', meaning: '룸서비스 부탁드려요. 맥주 두 병과 안주요.' },
    ],
  },
  'ht_elevator': {
    compounds: [
      { japanese: 'エレベーターはどこですか', meaning: '엘리베이터는 어디예요?' },
      { japanese: '何階ですか', meaning: '몇 층이에요?' },
    ],
    sentences: [
      { japanese: 'エレベーターはどこですか？荷物が重くて…', meaning: '엘리베이터는 어디예요? 짐이 무거워서…' },
    ],
  },
  'ht_laundry': {
    compounds: [
      { japanese: 'コインランドリーはどこですか', meaning: '코인 세탁기는 어디예요?' },
      { japanese: '洗濯機は使えますか', meaning: '세탁기 쓸 수 있나요?' },
    ],
    sentences: [
      { japanese: 'コインランドリーはどこですか？洗濯物があって。', meaning: '코인 세탁기는 어디예요? 빨래가 있어서요.' },
    ],
  },
  'ht_lobby': {
    compounds: [
      { japanese: 'ロビーで待っています', meaning: '로비에서 기다릴게요' },
      { japanese: 'ロビーはどこですか', meaning: '로비는 어디예요?' },
    ],
    sentences: [
      { japanese: 'ロビーで待ち合わせしよう！フロントの前で！', meaning: '로비에서 만나자! 프론트 앞에서!' },
    ],
  },
  'ht_extend': {
    compounds: [
      { japanese: 'チェックアウトを延ばせますか', meaning: '체크아웃을 연장할 수 있나요?' },
      { japanese: 'もう一泊お願いできますか', meaning: '하룻밤 더 묵을 수 있나요?' },
    ],
    sentences: [
      { japanese: 'もう一泊延長できますか？まだいたいです！', meaning: '하룻밤 더 연장 가능한가요? 아직 있고 싶어요!' },
    ],
  },

  // ── 관광 인사 ──
  'gr_arigatou': {
    compounds: [
      { japanese: 'ありがとうございました', meaning: '감사했습니다 (과거)' },
      { japanese: 'どうもありがとうございます', meaning: '정말 감사합니다' },
    ],
    sentences: [
      { japanese: '案内してくれてありがとう、本当に助かった！', meaning: '안내해줘서 고마워, 정말 도움됐어!' },
    ],
  },
  'gr_sumimasen': {
    compounds: [
      { japanese: 'すみません、写真を撮ってもらえますか', meaning: '저기요, 사진 찍어주실 수 있나요?' },
      { japanese: 'すみません、道を教えてください', meaning: '저기요, 길을 알려주세요' },
    ],
    sentences: [
      { japanese: 'すみませんって言えばだいたい何とかなるよ！', meaning: '스미마센 하면 대부분 어떻게든 돼!' },
    ],
  },
  'gr_onegai': {
    compounds: [
      { japanese: 'これをお願いします', meaning: '이것 부탁드립니다' },
      { japanese: 'ゆっくりお願いします', meaning: '천천히 부탁드립니다' },
    ],
    sentences: [
      { japanese: 'わからないときはお願いしますって言えばOK！', meaning: '모를 때는 오네가이시마스 하면 OK!' },
    ],
  },
  'gr_hai': {
    compounds: [
      { japanese: 'はい、わかりました', meaning: '네, 알겠습니다' },
      { japanese: 'はい、そうです', meaning: '네, 맞아요' },
    ],
    sentences: [
      { japanese: '「はい」だけでも結構通じるよ、日本語。', meaning: '하이 하나만 해도 꽤 통해, 일본어.' },
    ],
  },
  'gr_iie': {
    compounds: [
      { japanese: 'いいえ、結構です', meaning: '아니요, 됐습니다' },
      { japanese: 'いいえ、大丈夫です', meaning: '아니요, 괜찮습니다' },
    ],
    sentences: [
      { japanese: '袋いりますかって聞かれたら「いいえ、大丈夫です」だよ。', meaning: '봉투 필요하냐고 물으면 괜찮습니다 라고 해.' },
    ],
  },
  'gr_wakaran': {
    compounds: [
      { japanese: '日本語がわかりません', meaning: '일본어를 모릅니다' },
      { japanese: 'もう少しゆっくり言ってもらえますか', meaning: '조금 더 천천히 말해주실 수 있나요?' },
    ],
    sentences: [
      { japanese: 'わからないときは素直に「わかりません」って言おう。', meaning: '모를 땐 솔직하게 와카리마센 하자.' },
    ],
  },
  'gr_modoichi': {
    compounds: [
      { japanese: 'もう一度お願いします', meaning: '한 번 더 부탁드립니다' },
      { japanese: 'もう少し大きい声でお願いします', meaning: '조금 더 큰 목소리로 부탁드립니다' },
    ],
    sentences: [
      { japanese: '聞き取れなかったら「もう一度」って言えばいいよ。', meaning: '못 들었으면 모우 이치도 하면 돼.' },
    ],
  },
  'gr_english': {
    compounds: [
      { japanese: '英語はできますか', meaning: '영어 할 수 있나요?' },
      { japanese: '英語のメニューはありますか', meaning: '영어 메뉴 있나요?' },
    ],
    sentences: [
      { japanese: '英語のメニューあるか聞いてみようか？', meaning: '영어 메뉴 있는지 물어볼까?' },
    ],
  },
  'gr_kankoku': {
    compounds: [
      { japanese: '韓国から来ました', meaning: '한국에서 왔습니다' },
      { japanese: '韓国語は話せますか', meaning: '한국어 할 수 있나요?' },
    ],
    sentences: [
      { japanese: '韓国から来ましたって言うと、親切にしてくれることが多い！', meaning: '한국에서 왔다고 하면 친절하게 해주는 경우가 많아!' },
    ],
  },
  'gr_namae': {
    compounds: [
      { japanese: 'お名前はなんですか', meaning: '이름이 뭔가요?' },
      { japanese: '予約した〜です', meaning: '〜로 예약했습니다' },
    ],
    sentences: [
      { japanese: 'チェックインのとき名前を言えばOKだよ。', meaning: '체크인할 때 이름 말하면 OK야.' },
    ],
  },
  'gr_yoroshiku': {
    compounds: [
      { japanese: 'よろしくお願いします', meaning: '잘 부탁드립니다' },
      { japanese: 'どうぞよろしく', meaning: '아무쪼록 잘 부탁해요' },
    ],
    sentences: [
      { japanese: '予約完了！あとはよろしくお願いしますって言えばいい。', meaning: '예약 완료! 이제 요로시쿠 오네가이시마스 하면 돼.' },
    ],
  },
  'gr_shitsurei': {
    compounds: [
      { japanese: '失礼します', meaning: '실례합니다 (자리 뜰 때)' },
      { japanese: '失礼しました', meaning: '실례했습니다' },
    ],
    sentences: [
      { japanese: 'お店を出るとき「ありがとうございました」か「失礼します」って言おう。', meaning: '가게 나올 때 감사했습니다 또는 실례합니다 해보자.' },
    ],
  },

  // ── 길·위치 ──
  'dir_doko': {
    compounds: [
      { japanese: 'トイレはどこですか', meaning: '화장실은 어디인가요?' },
      { japanese: '出口はどこですか', meaning: '출구는 어디인가요?' },
    ],
    sentences: [
      { japanese: '迷ったら「〜はどこですか」って聞けばいいよ！', meaning: '헤매면 어디예요? 하고 물어보면 돼!' },
    ],
  },
  'dir_ikura': {
    compounds: [
      { japanese: 'これはいくらですか', meaning: '이것은 얼마인가요?' },
      { japanese: '合計いくらですか', meaning: '합계 얼마인가요?' },
    ],
    sentences: [
      { japanese: '値段わからなかったらいくらですかって聞こう！', meaning: '가격 모르면 이쿠라데스카 물어보자!' },
    ],
  },
  'dir_ikimasu': {
    compounds: [
      { japanese: '〜まで行ってください', meaning: '〜까지 가 주세요' },
      { japanese: '歩いて行けますか', meaning: '걸어서 갈 수 있나요?' },
    ],
    sentences: [
      { japanese: 'タクシーで「〜まで行ってください」って言えばOK！', meaning: '택시에서 〜까지 가 주세요 하면 OK!' },
    ],
  },
  'dir_chikaku': {
    compounds: [
      { japanese: '近くにコンビニはありますか', meaning: '근처에 편의점이 있나요?' },
      { japanese: '近くの駅はどこですか', meaning: '근처 역은 어디인가요?' },
    ],
    sentences: [
      { japanese: 'ホテルの近くにコンビニある？夜食買いに行こう。', meaning: '호텔 근처에 편의점 있어? 야식 사러 가자.' },
    ],
  },
  'dir_aruite': {
    compounds: [
      { japanese: '歩いて何分ですか', meaning: '걸어서 몇 분인가요?' },
      { japanese: '歩いて行きましょう', meaning: '걸어서 가요' },
    ],
    sentences: [
      { japanese: '歩いて行ける距離？それとも電車？', meaning: '걸어갈 수 있는 거리야? 아니면 전철?' },
    ],
  },
  'dir_made': {
    compounds: [
      { japanese: '渋谷まで行ってください', meaning: '시부야까지 가 주세요' },
      { japanese: '空港まで行きたいです', meaning: '공항까지 가고 싶습니다' },
    ],
    sentences: [
      { japanese: '次の駅まで歩く？それとも乗る？', meaning: '다음 역까지 걸을래? 아니면 탈래?' },
    ],
  },
  'dir_chizu': {
    compounds: [
      { japanese: '地図を見せてください', meaning: '지도를 보여주세요' },
      { japanese: '地図アプリで確認します', meaning: '지도 앱으로 확인할게요' },
    ],
    sentences: [
      { japanese: 'Googleマップで確認して。ここで合ってる？', meaning: '구글맵으로 확인해봐. 여기 맞아?' },
    ],
  },
  'dir_michi': {
    compounds: [
      { japanese: '道を教えてください', meaning: '길을 알려주세요' },
      { japanese: '道に迷いました', meaning: '길을 잃었습니다' },
    ],
    sentences: [
      { japanese: '道に迷った！誰かに聞いてみよう。', meaning: '길 잃었어! 누군가에게 물어보자.' },
    ],
  },
  'dir_massugu': {
    compounds: [
      { japanese: 'まっすぐ行ってください', meaning: '직진해 주세요' },
      { japanese: 'まっすぐ2分ぐらいです', meaning: '직진으로 2분 정도입니다' },
    ],
    sentences: [
      { japanese: 'まっすぐ行ったら駅があるって。行ってみよう！', meaning: '직진하면 역이 있대. 가보자!' },
    ],
  },
  'dir_migi_te': {
    compounds: [
      { japanese: '右に曲がってください', meaning: '오른쪽으로 돌아주세요' },
      { japanese: '右側にあります', meaning: '오른쪽에 있습니다' },
    ],
    sentences: [
      { japanese: '角を右に曲がったらあるって言ってたよ！', meaning: '모퉁이를 오른쪽으로 돌면 있다고 했어!' },
    ],
  },
  'dir_hidari_te': {
    compounds: [
      { japanese: '左に曲がってください', meaning: '왼쪽으로 돌아주세요' },
      { japanese: '左側に出口があります', meaning: '왼쪽에 출구가 있습니다' },
    ],
    sentences: [
      { japanese: '左か右か、どっちだっけ？もう一回マップ見て。', meaning: '왼쪽이야 오른쪽이야, 어느 쪽이었지? 맵 다시 봐.' },
    ],
  },

  // ── 식당·쇼핑 ──
  'res_kore': {
    compounds: [
      { japanese: 'これをひとつください', meaning: '이것 하나 주세요' },
      { japanese: 'これと同じものをください', meaning: '이것과 같은 걸로 주세요' },
    ],
    sentences: [
      { japanese: '注文は「これ！」って指さすだけでも通じるよ。', meaning: '주문할 때 이거! 하고 가리키기만 해도 통해.' },
    ],
  },
  'res_hitotsu': {
    compounds: [
      { japanese: '二つください', meaning: '두 개 주세요' },
      { japanese: '一つで大丈夫です', meaning: '하나면 됩니다' },
    ],
    sentences: [
      { japanese: 'ひとつずつ頼む？それとも二人でシェアする？', meaning: '각자 하나씩 시킬까? 아니면 둘이 나눠 먹을까?' },
    ],
  },
  'res_futari': {
    compounds: [
      { japanese: '二人です', meaning: '두 명입니다' },
      { japanese: '二人で予約しています', meaning: '두 명으로 예약했습니다' },
    ],
    sentences: [
      { japanese: '何人ですかって聞かれたら「二人です」って言えばいいよ。', meaning: '몇 명이냐고 물으면 두 명이라고 하면 돼.' },
    ],
  },
  'res_yoyaku': {
    compounds: [
      { japanese: '予約をしたいです', meaning: '예약하고 싶습니다' },
      { japanese: '〜で予約しています', meaning: '〜로 예약했습니다' },
    ],
    sentences: [
      { japanese: 'このお店、予約しないといっぱいだって！予約しよう。', meaning: '이 가게 예약 안 하면 꽉 찬대! 예약하자.' },
    ],
  },
  'res_okaikei': {
    compounds: [
      { japanese: 'お会計をお願いします', meaning: '계산해 주세요' },
      { japanese: '一緒にお願いします', meaning: '같이 계산해 주세요' },
    ],
    sentences: [
      { japanese: 'お会計お願いしますって言う？それともレジで払う？', meaning: '계산 부탁해요 할까? 아니면 계산대에서 낼까?' },
    ],
  },
  'res_kaado': {
    compounds: [
      { japanese: 'カードで払えますか', meaning: '카드로 결제할 수 있나요?' },
      { japanese: 'クレジットカードは使えますか', meaning: '신용카드 사용 가능한가요?' },
    ],
    sentences: [
      { japanese: 'カード使える？現金ないから確認してみて。', meaning: '카드 쓸 수 있어? 현금 없으니까 확인해봐.' },
    ],
  },
  'res_baggu': {
    compounds: [
      { japanese: '袋はいりません', meaning: '봉투 필요 없습니다' },
      { japanese: '袋をください', meaning: '봉투 주세요' },
    ],
    sentences: [
      { japanese: '袋いる？エコバッグ持ってきたからいらないかな。', meaning: '봉투 필요해? 에코백 가져왔으니까 필요 없을 것 같은데.' },
    ],
  },
  'res_omiyage': {
    compounds: [
      { japanese: 'お土産を探しています', meaning: '기념품을 찾고 있습니다' },
      { japanese: 'おすすめのお土産はありますか', meaning: '추천 기념품이 있나요?' },
    ],
    sentences: [
      { japanese: 'お土産、何にしよう？実家に送るやつも買わないと。', meaning: '기념품 뭐 살까? 본가에 보낼 것도 사야 해.' },
    ],
  },
  'res_ikaga': {
    compounds: [
      { japanese: 'いかがですか', meaning: '어떠세요?' },
      { japanese: 'お味はいかがでしたか', meaning: '맛은 어떠셨나요?' },
    ],
    sentences: [
      { japanese: '店員さんに「いかがですか」って言われたら感想を言ってみよう！', meaning: '점원이 어떠세요? 하면 감상을 말해보자!' },
    ],
  },
  'res_nokori': {
    compounds: [
      { japanese: 'これはまだありますか', meaning: '이것은 아직 있나요?' },
      { japanese: '在庫はありますか', meaning: '재고 있나요?' },
    ],
    sentences: [
      { japanese: '残り一個！どうする？買う？', meaning: '남은 거 하나야! 어떻게 해? 살래?' },
    ],
  },
  'res_saizu': {
    compounds: [
      { japanese: 'Mサイズはありますか', meaning: 'M 사이즈 있나요?' },
      { japanese: '試着してもいいですか', meaning: '입어봐도 되나요?' },
    ],
    sentences: [
      { japanese: 'サイズどうだった？ちゃんと試着した？', meaning: '사이즈 어때? 제대로 입어봤어?' },
    ],
  },
  'res_discount': {
    compounds: [
      { japanese: '割引はありますか', meaning: '할인 있나요?' },
      { japanese: 'セール品はどこですか', meaning: '세일 상품은 어디인가요?' },
    ],
    sentences: [
      { japanese: 'セールやってる！少し安くなってるよ！', meaning: '세일 하고 있어! 조금 저렴해졌어!' },
    ],
  },
  'res_takai': {
    compounds: [
      { japanese: 'ちょっと高いですね', meaning: '조금 비싸네요' },
      { japanese: 'もっと安いものはありますか', meaning: '더 저렴한 것은 있나요?' },
    ],
    sentences: [
      { japanese: 'これ高いね…でもせっかくだから買っちゃう？', meaning: '이거 비싸네… 근데 어차피 왔으니까 살까?' },
    ],
  },
  'res_yasuku': {
    compounds: [
      { japanese: 'これは安いですね', meaning: '이것은 저렴하네요' },
      { japanese: 'もっと安くなりますか', meaning: '더 싸게 해줄 수 있나요?' },
    ],
    sentences: [
      { japanese: '安い！ドラッグストアで買うとかなり安いね。', meaning: '싸다! 드럭스토어에서 사면 꽤 저렴하네.' },
    ],
  },

  // ── 긴급·기타 ──
  'emg_tasuke': {
    compounds: [
      { japanese: '助けてください', meaning: '도와주세요' },
      { japanese: '緊急です', meaning: '긴급입니다' },
    ],
    sentences: [
      { japanese: '万が一のとき「助けてください」って大きな声で言おう！', meaning: '만일의 경우 크게 소리질러 도와주세요!' },
    ],
  },
  'emg_byouin': {
    compounds: [
      { japanese: '病院に連れて行ってください', meaning: '병원에 데려다 주세요' },
      { japanese: '近くに病院はありますか', meaning: '근처에 병원이 있나요?' },
    ],
    sentences: [
      { japanese: '気分悪くなったら迷わず病院行こう。海外旅行保険入ってるから大丈夫。', meaning: '몸이 안 좋아지면 바로 병원 가자. 해외여행보험 들었으니까 괜찮아.' },
    ],
  },
  'emg_keisatsu': {
    compounds: [
      { japanese: '警察を呼んでください', meaning: '경찰을 불러주세요' },
      { japanese: '警察署はどこですか', meaning: '경찰서는 어디인가요?' },
    ],
    sentences: [
      { japanese: 'スリにあったら迷わず警察を呼ぼう。', meaning: '소매치기 당하면 망설이지 말고 경찰 부르자.' },
    ],
  },
  'emg_guai': {
    compounds: [
      { japanese: '気分が悪いです', meaning: '기분이 안 좋습니다' },
      { japanese: 'お腹が痛いです', meaning: '배가 아픕니다' },
    ],
    sentences: [
      { japanese: '大丈夫？顔色悪いよ。少し休む？', meaning: '괜찮아? 안색이 안 좋아. 조금 쉴까?' },
    ],
  },
  'emg_kusuri': {
    compounds: [
      { japanese: '薬はありますか', meaning: '약이 있나요?' },
      { japanese: '頭痛薬をください', meaning: '두통약 주세요' },
    ],
    sentences: [
      { japanese: '頭痛い？ドラッグストアで薬買おうか。', meaning: '머리 아파? 드럭스토어에서 약 살까.' },
    ],
  },
  'emg_nakushi': {
    compounds: [
      { japanese: 'パスポートをなくしました', meaning: '여권을 잃어버렸습니다' },
      { japanese: 'カバンをなくしました', meaning: '가방을 잃어버렸습니다' },
    ],
    sentences: [
      { japanese: 'パスポートはちゃんとある？こういうときのためにコピーしといてよかった。', meaning: '여권 제대로 있어? 이럴 때를 위해 복사해둔 게 다행이야.' },
    ],
  },
  'emg_taishi': {
    compounds: [
      { japanese: '大使館に連絡したいです', meaning: '대사관에 연락하고 싶습니다' },
      { japanese: '韓国大使館はどこですか', meaning: '한국 대사관은 어디인가요?' },
    ],
    sentences: [
      { japanese: '緊急のときは大使館に連絡しよう。番号、メモしといて。', meaning: '긴급 시에는 대사관에 연락하자. 번호 메모해둬.' },
    ],
  },
  'emg_hoken': {
    compounds: [
      { japanese: '海外旅行保険に入っています', meaning: '해외여행보험에 가입했습니다' },
      { japanese: '保険証を見せてください', meaning: '보험증을 보여주세요' },
    ],
    sentences: [
      { japanese: '保険の連絡先、スマホに入れといて。いざというときのために。', meaning: '보험 연락처 스마폰에 저장해둬. 만일을 위해.' },
    ],
  },

  // ── Phase 3 기초 어휘 ──
  'prn_6': {
    compounds: [
      { japanese: 'これをください', meaning: '이것 주세요' },
      { japanese: 'これはいくらですか', meaning: '이것은 얼마인가요?' },
    ],
    sentences: [
      { japanese: 'これ！って指さすだけで大体通じるよ。', meaning: '이거! 하고 가리키기만 해도 대부분 통해.' },
    ],
  },
  'prn_9': {
    compounds: [
      { japanese: 'ここでいいですか', meaning: '여기면 될까요?' },
      { japanese: 'ここで写真を撮ってもいいですか', meaning: '여기서 사진 찍어도 되나요?' },
    ],
    sentences: [
      { japanese: 'ここがおすすめスポットだって！写真撮ろう！', meaning: '여기가 추천 스팟이래! 사진 찍자!' },
    ],
  },
  'vb1_1': {
    compounds: [
      { japanese: 'ここで食べてもいいですか', meaning: '여기서 먹어도 되나요?' },
      { japanese: 'テイクアウトで食べます', meaning: '테이크아웃으로 먹을게요' },
    ],
    sentences: [
      { japanese: '今日の夕飯、何食べようか？焼き鳥どう？', meaning: '오늘 저녁 뭐 먹을까? 야키토리 어때?' },
    ],
  },
  'vb1_2': {
    compounds: [
      { japanese: 'お水をください', meaning: '물 주세요' },
      { japanese: 'ビールをふたつください', meaning: '맥주 두 잔 주세요' },
    ],
    sentences: [
      { japanese: 'のどが渇いた！何か飲もう。ビールでいい？', meaning: '목 말라! 뭔가 마시자. 맥주면 돼?' },
    ],
  },
  'vb1_5': {
    compounds: [
      { japanese: '〜に行きたいです', meaning: '〜에 가고 싶습니다' },
      { japanese: '一緒に行きましょう', meaning: '같이 가요' },
    ],
    sentences: [
      { japanese: '明日はどこに行く？浅草と上野、どっちがいい？', meaning: '내일 어디 갈래? 아사쿠사랑 우에노 어디가 좋아?' },
    ],
  },
  'vb2_4': {
    compounds: [
      { japanese: 'これを買いたいです', meaning: '이것을 사고 싶습니다' },
      { japanese: 'どこで買えますか', meaning: '어디서 살 수 있나요?' },
    ],
    sentences: [
      { japanese: 'これ買う？かわいいけどちょっと高いね。', meaning: '이거 살래? 귀엽긴 한데 좀 비싸네.' },
    ],
  },
  'adj1_9': {
    compounds: [
      { japanese: '辛さは控えめにできますか', meaning: '맵기를 줄일 수 있나요?' },
      { japanese: '辛くないものはありますか', meaning: '맵지 않은 것은 있나요?' },
    ],
    sentences: [
      { japanese: '辛い！でもおいしい！もう一枚食べてもいいかな。', meaning: '매워! 근데 맛있어! 하나 더 먹어도 될까.' },
    ],
  },
  'adj2_6': {
    compounds: [
      { japanese: '何か食べましょうか', meaning: '뭔가 먹을까요?' },
      { japanese: 'おすすめのお店はありますか', meaning: '추천하는 가게가 있나요?' },
    ],
    sentences: [
      { japanese: 'お腹空いた！コンビニでもいいから何か食べよう。', meaning: '배고파! 편의점이라도 좋으니까 뭔가 먹자.' },
    ],
  },
  'adj2_7': {
    compounds: [
      { japanese: '少し休んでもいいですか', meaning: '조금 쉬어도 될까요?' },
      { japanese: 'カフェで休みましょう', meaning: '카페에서 쉬어요' },
    ],
    sentences: [
      { japanese: '疲れたね。カフェで一休みしようか。足も痛いし。', meaning: '피곤하네. 카페에서 잠깐 쉴까. 발도 아프고.' },
    ],
  },
  'adj1_5': {
    compounds: [
      { japanese: 'もう少し安くなりますか', meaning: '조금 더 싸게 해줄 수 있나요?' },
      { japanese: '高いですが、これにします', meaning: '비싸지만 이걸로 할게요' },
    ],
    sentences: [
      { japanese: 'ちょっと高いけど、旅行の記念に買っちゃおう！', meaning: '좀 비싸지만 여행 기념으로 사버리자!' },
    ],
  },

  // ── N5 형용사 ──
  'adj_oishi': {
    compounds: [
      { japanese: 'おいしいですね！', meaning: '맛있네요!' },
      { japanese: 'これ、おいしい！おすすめです', meaning: '이거 맛있어요! 추천이에요' },
    ],
    sentences: [
      { japanese: 'おいしい！また来ようよ、絶対！', meaning: '맛있어! 또 오자, 꼭!' },
    ],
  },
  'adj_karai': {
    compounds: [
      { japanese: '辛くないものはありますか', meaning: '맵지 않은 것 있나요?' },
      { japanese: '少し辛いです', meaning: '조금 매워요' },
    ],
    sentences: [
      { japanese: 'からい！でもやみつきになる味！', meaning: '매워! 근데 자꾸 먹고 싶어지는 맛!' },
    ],
  },
  'adj_amai': {
    compounds: [
      { japanese: '甘いものが好きです', meaning: '달달한 것을 좋아해요' },
      { japanese: '甘さは控えめにできますか', meaning: '달기를 줄일 수 있나요?' },
    ],
    sentences: [
      { japanese: 'あまい！このスイーツ最高！お土産に買って帰ろう！', meaning: '달아! 이 스위츠 최고! 기념품으로 사가자!' },
    ],
  },
  'adj_takai': {
    compounds: [
      { japanese: 'もう少し安くなりますか', meaning: '좀 더 싸게 해주실 수 있나요?' },
      { japanese: '高いですね…', meaning: '비싸네요…' },
    ],
    sentences: [
      { japanese: 'たかいけど記念に買っちゃおう！旅行だし！', meaning: '비싸지만 기념으로 사버리자! 여행이니까!' },
    ],
  },
  'adj_yasui': {
    compounds: [
      { japanese: '安くておいしいお店を教えてください', meaning: '저렴하고 맛있는 가게 알려주세요' },
      { japanese: 'こっちの方が安いですよ', meaning: '이쪽이 더 싸요' },
    ],
    sentences: [
      { japanese: 'やすい！これにする！こっちのほうがお得だよ！', meaning: '싸다! 이걸로 할게! 이쪽이 더 이득이야!' },
    ],
  },
  'adj_okii': {
    compounds: [
      { japanese: '大きいサイズはありますか', meaning: '큰 사이즈 있나요?' },
      { japanese: '大きくて食べきれない', meaning: '커서 다 못 먹겠어' },
    ],
    sentences: [
      { japanese: 'おおきい！ポーションが多い！シェアしよう！', meaning: '크다! 양이 많다! 나눠 먹자!' },
    ],
  },
  'adj_chiisai': {
    compounds: [
      { japanese: '小さいサイズはありますか', meaning: '작은 사이즈 있나요?' },
      { japanese: '少し小さいですね', meaning: '조금 작네요' },
    ],
    sentences: [
      { japanese: 'ちいさいけどかわいい！これにしよう！', meaning: '작지만 귀여워! 이걸로 하자!' },
    ],
  },
  'adj_kawaii': {
    compounds: [
      { japanese: 'かわいいですね！', meaning: '귀엽네요!' },
      { japanese: 'かわいいものが好きです', meaning: '귀여운 것을 좋아해요' },
    ],
    sentences: [
      { japanese: 'かわいい！これ絶対買う！迷わず即決！', meaning: '귀여워! 이거 무조건 산다! 고민 없이 즉결!' },
    ],
  },
  'adj_ii': {
    compounds: [
      { japanese: 'いいですね！', meaning: '좋네요!' },
      { japanese: 'それでいいです', meaning: '그걸로 괜찮아요' },
    ],
    sentences: [
      { japanese: 'いい！完璧！この旅行、最高すぎる！', meaning: '좋아! 완벽해! 이번 여행 너무 최고야!' },
    ],
  },
  'adj_dame': {
    compounds: [
      { japanese: 'だめですか？', meaning: '안 되나요?' },
      { japanese: 'ここは撮影だめですか', meaning: '여기는 촬영 안 되나요?' },
    ],
    sentences: [
      { japanese: 'だめ？じゃあ別の方法を考えよう。', meaning: '안 돼? 그럼 다른 방법을 생각해보자.' },
    ],
  },

  // ── Phase 3: 대명사·지시어 ──
  'prn_1': {
    compounds: [
      { japanese: '私はソウルから来ました', meaning: '저는 서울에서 왔어요' },
      { japanese: '私の名前は〜です', meaning: '제 이름은 〜입니다' },
    ],
    sentences: [
      { japanese: '私、これにします！おいしそう！', meaning: '저 이걸로 할게요! 맛있어 보여요!' },
    ],
  },
  'prn_2': {
    compounds: [
      { japanese: '僕もそれ食べたい', meaning: '나도 그거 먹고 싶어' },
      { japanese: '僕は大丈夫です', meaning: '저는 괜찮아요' },
    ],
    sentences: [
      { japanese: '僕もついて行っていい？一人は寂しいし。', meaning: '나도 따라가도 돼? 혼자는 쓸쓸하니까.' },
    ],
  },
  'prn_3': {
    compounds: [
      { japanese: 'あなたはどうしますか', meaning: '당신은 어떻게 하실 건가요?' },
      { japanese: 'あなたの国はどこですか', meaning: '당신 나라는 어디예요?' },
    ],
    sentences: [
      { japanese: 'あなた、どっちにする？私はラーメンにしようかな。', meaning: '당신은 뭐로 할래? 나는 라멘으로 할까.' },
    ],
  },
  'prn_4': {
    compounds: [
      { japanese: '彼はガイドさんです', meaning: '그분은 가이드예요' },
      { japanese: '彼に聞いてみよう', meaning: '그한테 물어봐요' },
    ],
    sentences: [
      { japanese: '彼、日本語うまいね。どこで覚えたんだろう？', meaning: '그 사람 일본어 잘하네. 어디서 배웠을까?' },
    ],
  },
  'prn_5': {
    compounds: [
      { japanese: '彼女に道を聞こう', meaning: '그분한테 길을 물어봐요' },
      { japanese: '彼女はどこにいますか', meaning: '그분은 어디 있나요?' },
    ],
    sentences: [
      { japanese: '彼女はどこ？さっきまでいたのに。', meaning: '그녀는 어디 갔어? 방금까지 있었는데.' },
    ],
  },
  'prn_7': {
    compounds: [
      { japanese: 'それをください', meaning: '그것 주세요' },
      { japanese: 'それは何ですか', meaning: '그것은 뭔가요?' },
    ],
    sentences: [
      { japanese: 'それ、おいしそう！一口もらっていい？', meaning: '그거 맛있어 보여! 한 입 먹어봐도 돼?' },
    ],
  },
  'prn_8': {
    compounds: [
      { japanese: 'あれは何ですか', meaning: '저것은 뭔가요?' },
      { japanese: 'あれを見てください', meaning: '저것을 봐 주세요' },
    ],
    sentences: [
      { japanese: 'あれ、富士山じゃない？すごい！写真撮ろう！', meaning: '저거 후지산 아니야? 대박! 사진 찍자!' },
    ],
  },
  'prn_10': {
    compounds: [
      { japanese: 'そこで待っていてください', meaning: '거기서 기다려 주세요' },
      { japanese: 'そこはどこですか', meaning: '거기는 어디예요?' },
    ],
    sentences: [
      { japanese: 'そこで待ってて、すぐ行くから！', meaning: '거기서 기다려, 바로 갈게!' },
    ],
  },
  'prn_11': {
    compounds: [
      { japanese: 'あそこに出口があります', meaning: '저기에 출구가 있어요' },
      { japanese: 'あそこまで歩けますか', meaning: '저기까지 걸어갈 수 있나요?' },
    ],
    sentences: [
      { japanese: 'あそこが有名なお寺だって！行ってみよう！', meaning: '저기가 유명한 절이래! 가보자!' },
    ],
  },
  'prn_12': {
    compounds: [
      { japanese: 'このラーメンは辛いですか', meaning: '이 라멘은 맵나요?' },
      { japanese: 'このバッグはいくらですか', meaning: '이 가방은 얼마예요?' },
    ],
    sentences: [
      { japanese: 'このお土産、かわいいね。買って帰ろう！', meaning: '이 기념품 귀엽다. 사서 돌아가자!' },
    ],
  },
  'prn_13': {
    compounds: [
      { japanese: 'そのバッグ、どこで買いましたか', meaning: '그 가방 어디서 샀어요?' },
      { japanese: 'そのメニューをください', meaning: '그 메뉴로 주세요' },
    ],
    sentences: [
      { japanese: 'そのお店、おいしそう！入ってみようよ！', meaning: '그 가게 맛있어 보여! 들어가 봐요!' },
    ],
  },
  'prn_14': {
    compounds: [
      { japanese: 'あのお店に入りたいです', meaning: '저 가게에 들어가고 싶어요' },
      { japanese: 'あの人は誰ですか', meaning: '저 사람은 누구예요?' },
    ],
    sentences: [
      { japanese: 'あのカフェ、さっきから気になってた！行こう！', meaning: '저 카페 아까부터 신경 쓰였어! 가자!' },
    ],
  },

  // ── Phase 3: 기본 동사 I ──
  'vb1_3': {
    compounds: [
      { japanese: 'ここで寝てもいいですか', meaning: '여기서 자도 되나요?' },
      { japanese: 'もう寝ます', meaning: '이제 잘게요' },
    ],
    sentences: [
      { japanese: 'もう寝ようか、明日も早いし。', meaning: '이제 잘까, 내일도 일찍이니까.' },
    ],
  },
  'vb1_4': {
    compounds: [
      { japanese: '何時に起きますか', meaning: '몇 시에 일어나요?' },
      { japanese: '早く起きなきゃ', meaning: '일찍 일어나야 해' },
    ],
    sentences: [
      { japanese: '明日、何時に起きる？バスが早いから気をつけて。', meaning: '내일 몇 시에 일어나? 버스가 일찍이니까 조심해.' },
    ],
  },
  'vb1_6': {
    compounds: [
      { japanese: 'いつ来ますか', meaning: '언제 오나요?' },
      { japanese: 'どこから来ましたか', meaning: '어디서 오셨나요?' },
    ],
    sentences: [
      { japanese: '友達が来るって！一緒に観光しようよ！', meaning: '친구가 온대! 같이 관광하자!' },
    ],
  },
  'vb1_7': {
    compounds: [
      { japanese: 'ちょっと見てもいいですか', meaning: '잠깐 봐도 될까요?' },
      { japanese: 'あれを見てください', meaning: '저것을 봐 주세요' },
    ],
    sentences: [
      { japanese: 'あれ見て！夕日がきれい！写真撮ろう！', meaning: '저거 봐봐! 저녁 노을이 예뻐! 사진 찍자!' },
    ],
  },
  'vb1_8': {
    compounds: [
      { japanese: 'すみません、聞いてもいいですか', meaning: '저기요, 여쭤봐도 될까요?' },
      { japanese: '店員さんに聞こう', meaning: '점원한테 물어봐요' },
    ],
    sentences: [
      { japanese: 'わからなければ聞けばいいよ！皆やさしいから。', meaning: '모르면 물어보면 돼! 다들 친절하니까.' },
    ],
  },
  'vb1_9': {
    compounds: [
      { japanese: 'どこで遊べますか', meaning: '어디서 놀 수 있나요?' },
      { japanese: '今日は遊びましょう', meaning: '오늘은 놀아요' },
    ],
    sentences: [
      { japanese: '今日は一日遊ぼう！どこ行きたい？', meaning: '오늘은 하루 종일 놀자! 어디 가고 싶어?' },
    ],
  },
  'vb1_10': {
    compounds: [
      { japanese: '何をしますか', meaning: '무엇을 하나요?' },
      { japanese: 'どうすればいいですか', meaning: '어떻게 하면 되나요?' },
    ],
    sentences: [
      { japanese: '今日何する？ショッピングする？観光する？', meaning: '오늘 뭐 해? 쇼핑 해? 관광 해?' },
    ],
  },
  'vb1_11': {
    compounds: [
      { japanese: '近くにコンビニはありますか', meaning: '근처에 편의점이 있나요?' },
      { japanese: 'この近くに何がありますか', meaning: '이 근처에 뭐가 있나요?' },
    ],
    sentences: [
      { japanese: 'このあたりにATMある？お金下ろしたい。', meaning: '이 근처에 ATM 있어? 돈 뽑아야 해.' },
    ],
  },
  'vb1_12': {
    compounds: [
      { japanese: '駅員さんはいますか', meaning: '역무원이 있나요?' },
      { japanese: 'ここに誰かいますか', meaning: '여기에 누군가 있나요?' },
    ],
    sentences: [
      { japanese: 'あのカウンターに店員さんいる？聞いてみよう。', meaning: '저 카운터에 점원 있어? 물어보자.' },
    ],
  },

  // ── Phase 3: 기본 동사 II ──
  'vb2_1': {
    compounds: [
      { japanese: 'このメニュー読めますか', meaning: '이 메뉴 읽을 수 있나요?' },
      { japanese: '地図を読む', meaning: '지도를 읽다' },
    ],
    sentences: [
      { japanese: 'メニュー読める？漢字が多くてわからないよ。', meaning: '메뉴 읽을 수 있어? 한자가 많아서 모르겠어.' },
    ],
  },
  'vb2_2': {
    compounds: [
      { japanese: 'お名前を書いてください', meaning: '성함을 써 주세요' },
      { japanese: 'ここに書いてください', meaning: '여기에 써 주세요' },
    ],
    sentences: [
      { japanese: 'ここに名前を書けばいいの？漢字でも大丈夫？', meaning: '여기에 이름 쓰면 되는 거야? 한자여도 괜찮아?' },
    ],
  },
  'vb2_3': {
    compounds: [
      { japanese: 'ゆっくり話してください', meaning: '천천히 말씀해 주세요' },
      { japanese: 'もう一度話してください', meaning: '다시 한 번 말씀해 주세요' },
    ],
    sentences: [
      { japanese: 'すみません、もう少しゆっくり話してもらえますか？', meaning: '저기요, 조금 더 천천히 말씀해 주실 수 있나요?' },
    ],
  },
  'vb2_5': {
    compounds: [
      { japanese: '歩いて行けますか', meaning: '걸어서 갈 수 있나요?' },
      { japanese: '何分歩きますか', meaning: '몇 분 걸어요?' },
    ],
    sentences: [
      { japanese: '歩いて行ける？地図だと近そうだけど。', meaning: '걸어갈 수 있어? 지도상으론 가까워 보이는데.' },
    ],
  },
  'vb2_6': {
    compounds: [
      { japanese: '走らないでください', meaning: '뛰지 마세요' },
      { japanese: '急いで走る', meaning: '서둘러 달리다' },
    ],
    sentences: [
      { japanese: '電車来るよ！走って！乗り遅れる！', meaning: '전철 온다! 뛰어! 놓친다!' },
    ],
  },
  'vb2_7': {
    compounds: [
      { japanese: 'なぜ笑っているんですか', meaning: '왜 웃고 있나요?' },
      { japanese: '笑顔がすてきですね', meaning: '웃는 얼굴이 멋지네요' },
    ],
    sentences: [
      { japanese: '笑ってる！何かあったの？教えて！', meaning: '웃고 있어! 뭔 일 있어? 알려줘!' },
    ],
  },
  'vb2_8': {
    compounds: [
      { japanese: '感動して泣いた', meaning: '감동해서 울었어' },
      { japanese: '泣かないでください', meaning: '울지 마세요' },
    ],
    sentences: [
      { japanese: '花火が綺麗すぎて泣きそうになっちゃった。', meaning: '불꽃놀이가 너무 예뻐서 울 뻔했어.' },
    ],
  },
  'vb2_9': {
    compounds: [
      { japanese: '手を洗ってください', meaning: '손을 씻어 주세요' },
      { japanese: '食べる前に手を洗う', meaning: '먹기 전에 손을 씻다' },
    ],
    sentences: [
      { japanese: '食べる前に手を洗おう。どこかに洗面所ある？', meaning: '먹기 전에 손 씻자. 어딘가에 세면실 있어?' },
    ],
  },
  'vb2_10': {
    compounds: [
      { japanese: 'Suicaが使えますか', meaning: '스이카를 사용할 수 있나요?' },
      { japanese: 'クレジットカードは使えますか', meaning: '신용카드 사용할 수 있나요?' },
    ],
    sentences: [
      { japanese: 'ここ、カード使える？現金ないんだけど…', meaning: '여기 카드 돼? 현금이 없는데…' },
    ],
  },

  // ── Phase 3: 기본 형용사 I ──
  'adj1_1': {
    compounds: [
      { japanese: '今日は暑いですね', meaning: '오늘은 덥네요' },
      { japanese: '暑いからアイスを食べよう', meaning: '더우니까 아이스크림 먹자' },
    ],
    sentences: [
      { japanese: '暑い！アイスクリーム食べたい！あそこで売ってるよ！', meaning: '더워! 아이스크림 먹고 싶어! 저기서 팔고 있어!' },
    ],
  },
  'adj1_2': {
    compounds: [
      { japanese: '今日は寒いですね', meaning: '오늘은 춥네요' },
      { japanese: '寒いからコートが必要ですね', meaning: '추우니까 코트가 필요하네요' },
    ],
    sentences: [
      { japanese: '寒い！ホットコーヒー飲もう。カフェ入ろうよ。', meaning: '추워! 따뜻한 커피 마시자. 카페 들어가자.' },
    ],
  },
  'adj1_3': {
    compounds: [
      { japanese: 'スープが熱いので気をつけてください', meaning: '수프가 뜨거우니 조심하세요' },
      { japanese: '熱いから少し待ってください', meaning: '뜨거우니까 잠깐 기다려 주세요' },
    ],
    sentences: [
      { japanese: '熱い！でもおいしい！ふーふーして食べよう。', meaning: '뜨거워! 근데 맛있어! 후후 불어서 먹자.' },
    ],
  },
  'adj1_4': {
    compounds: [
      { japanese: '冷たいビールをください', meaning: '차가운 맥주 주세요' },
      { japanese: 'このお茶は冷たいですか', meaning: '이 차는 차가운가요?' },
    ],
    sentences: [
      { japanese: '冷たいビール、最高！暑い日にはこれだね！', meaning: '차가운 맥주 최고! 더운 날에는 이거지!' },
    ],
  },
  'adj1_6': {
    compounds: [
      { japanese: 'もっと安いものはありますか', meaning: '더 저렴한 것은 있나요?' },
      { japanese: '安くておいしいお店', meaning: '저렴하고 맛있는 가게' },
    ],
    sentences: [
      { japanese: '安い！これで本当にいいの？お得すぎる！', meaning: '싸다! 이 가격에 진짜 돼? 너무 이득인데!' },
    ],
  },
  'adj1_7': {
    compounds: [
      { japanese: '大きいサイズはありますか', meaning: '큰 사이즈는 있나요?' },
      { japanese: 'もう少し大きいものがほしい', meaning: '좀 더 큰 것이 갖고 싶어' },
    ],
    sentences: [
      { japanese: 'このパフェ、大きい！食べきれるかな？', meaning: '이 파르페 크다! 다 먹을 수 있을까?' },
    ],
  },
  'adj1_8': {
    compounds: [
      { japanese: '小さいサイズはありますか', meaning: '작은 사이즈는 있나요?' },
      { japanese: 'もう少し小さいものがほしい', meaning: '좀 더 작은 것이 갖고 싶어' },
    ],
    sentences: [
      { japanese: 'ちょっと小さいかな…MじゃなくてんじゃなくてんじゃなくてLにする。', meaning: '좀 작은 것 같아… M이 아니라 L로 할게.' },
    ],
  },
  'adj1_10': {
    compounds: [
      { japanese: '甘いものが食べたい', meaning: '달달한 것이 먹고 싶어' },
      { japanese: '甘くておいしい', meaning: '달고 맛있어' },
    ],
    sentences: [
      { japanese: '甘い！これ好き！もう一個買っていい？', meaning: '달아! 이거 좋아! 하나 더 사도 돼?' },
    ],
  },
  'adj1_11': {
    compounds: [
      { japanese: '荷物が重いです', meaning: '짐이 무거워요' },
      { japanese: '重くて持てない', meaning: '무거워서 못 들겠어' },
    ],
    sentences: [
      { japanese: '荷物重い！タクシー使おうか？歩くのきつい。', meaning: '짐 무거워! 택시 탈까? 걷기 힘들어.' },
    ],
  },
  'adj1_12': {
    compounds: [
      { japanese: '軽くて持ちやすいですね', meaning: '가볍고 들기 편하네요' },
      { japanese: 'これは軽いですか', meaning: '이것은 가벼운가요?' },
    ],
    sentences: [
      { japanese: 'このバッグ、軽くていいね！旅行に最適じゃない？', meaning: '이 가방 가볍고 좋다! 여행에 딱이지 않아?' },
    ],
  },

  // ── Phase 3: 기본 형용사 II ──
  'adj2_1': {
    compounds: [
      { japanese: '来られてうれしいです', meaning: '와서 기쁩니다' },
      { japanese: 'うれしいお知らせ', meaning: '기쁜 소식' },
    ],
    sentences: [
      { japanese: 'ずっと来たかった場所！うれしい！テンション上がる！', meaning: '계속 오고 싶었던 곳! 기뻐! 신난다!' },
    ],
  },
  'adj2_2': {
    compounds: [
      { japanese: '悲しいですね', meaning: '슬프네요' },
      { japanese: '別れが悲しい', meaning: '이별이 슬프다' },
    ],
    sentences: [
      { japanese: 'もう帰るの、悲しいね。また絶対来よう！', meaning: '벌써 돌아가는 거야, 슬프네. 꼭 또 오자!' },
    ],
  },
  'adj2_3': {
    compounds: [
      { japanese: '楽しい旅行でしたね', meaning: '즐거운 여행이었네요' },
      { japanese: '一緒にいると楽しい', meaning: '같이 있으면 즐거워' },
    ],
    sentences: [
      { japanese: '楽しい！日本最高！また来たい！', meaning: '즐거워! 일본 최고! 또 오고 싶어!' },
    ],
  },
  'adj2_4': {
    compounds: [
      { japanese: '怖いですか', meaning: '무서운가요?' },
      { japanese: '怖くないですよ', meaning: '안 무서워요' },
    ],
    sentences: [
      { japanese: 'お化け屋敷、怖くて入れなかった…次は入る！', meaning: '귀신의 집 무서워서 못 들어갔어… 다음엔 들어간다!' },
    ],
  },
  'adj2_5': {
    compounds: [
      { japanese: '眠いので少し休みたいです', meaning: '졸리니까 좀 쉬고 싶어요' },
      { japanese: '眠くて歩けない', meaning: '졸려서 못 걷겠어' },
    ],
    sentences: [
      { japanese: '眠い…カフェでコーヒー飲もう。少し休もう。', meaning: '졸려… 카페에서 커피 마시자. 좀 쉬자.' },
    ],
  },
  'adj2_8': {
    compounds: [
      { japanese: 'このお店が大好きです', meaning: '이 가게를 엄청 좋아해요' },
      { japanese: '日本料理が好きです', meaning: '일본 음식을 좋아해요' },
    ],
    sentences: [
      { japanese: '日本食、大好き！毎日食べても飽きないよね。', meaning: '일본 음식 엄청 좋아해! 매일 먹어도 안 질리지.' },
    ],
  },
  'adj2_9': {
    compounds: [
      { japanese: '嫌いなものはありますか', meaning: '싫어하는 것은 있나요?' },
      { japanese: '苦手なものは避けましょう', meaning: '못 먹는 것은 피해요' },
    ],
    sentences: [
      { japanese: '納豆は嫌い？じゃあ他のものにしようよ。', meaning: '낫토 싫어해? 그럼 다른 걸로 하자.' },
    ],
  },
  'adj2_10': {
    compounds: [
      { japanese: '足が痛いです', meaning: '발이 아파요' },
      { japanese: '痛いので少し休みたいです', meaning: '아프니까 좀 쉬고 싶어요' },
    ],
    sentences: [
      { japanese: '足が痛い！ちょっとベンチで休んでもいい？', meaning: '발이 아파! 잠깐 벤치에서 쉬어도 돼?' },
    ],
  },

}; // end VOCAB_EXAMPLES_DB
