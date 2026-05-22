/* ============================================================
   V3 CURRICULUM — question/answer travel roleplay beginner track
   Keeps v2 intact by providing a separate STAGES/MODULES set.
   ============================================================ */

'use strict';

const STAGES = [
  {
    id: 1, key: 'v3_letters',
    name: '문자 게임판',
    nameJp: '文字の地図',
    icon: '',
    color: '#8b5cf6',
    jlpt: null,
    desc: '오십음도, 모음 리듬, 히라가나·가타가나 역할을 게임판처럼 잡는 단계.',
    unlockXP: 0
  },
  {
    id: 3, key: 'v3_survival_words',
    name: '문장 전 준비',
    nameJp: '文の前の準備',
    icon: '',
    color: '#06b6d4',
    jlpt: 'N5',
    desc: '문장 구조, 조사, 대명사, 숫자, 질문·대답의 뼈대를 인사 전에 정리하는 단계.',
    unlockXP: 0
  },
  {
    id: 4, key: 'v3_sentence_engine',
    name: '공항·비행기',
    nameJp: '空港と飛行機',
    icon: '',
    color: '#10b981',
    jlpt: 'N5',
    desc: '체크인, 입국, 기내 요청, 면세점처럼 일본 도착 전후의 질문과 답변.',
    unlockXP: 0
  },
  {
    id: 5, key: 'v3_travel_move',
    name: '교통·길 찾기',
    nameJp: '交通と道案内',
    icon: '',
    color: '#f59e0b',
    jlpt: 'N5',
    desc: '지하철, 버스, 택시, 길 찾기에서 바로 외워 쓰는 질문과 답변.',
    unlockXP: 0
  },
  {
    id: 6, key: 'v3_travel_life',
    name: '먹고 마시기',
    nameJp: '食事と飲み物',
    icon: '',
    color: '#ef4444',
    jlpt: 'N5',
    desc: '편의점, 식당, 카페, 술집, 조식에서 반복되는 주문 질문과 답변.',
    unlockXP: 0
  },
  {
    id: 7, key: 'v3_trouble',
    name: '쇼핑·결제',
    nameJp: '買い物と会計',
    icon: '',
    color: '#64748b',
    jlpt: 'N5',
    desc: '옷가게, 상점, 면세, 교환, 결제에서 필요한 질문과 답변.',
    unlockXP: 0
  },
  {
    id: 8, key: 'v3_stay_onsen',
    name: '숙박·온천',
    nameJp: '宿泊と温泉',
    icon: '',
    color: '#14b8a6',
    jlpt: 'N5',
    desc: '호텔 체크인, 조식, 객실 요청, 온천 이용 규칙을 장면별로 외우는 단계.',
    unlockXP: 0
  },
  {
    id: 9, key: 'v3_health_trouble',
    name: '건강·문제 해결',
    nameJp: '健康とトラブル',
    icon: '',
    color: '#a855f7',
    jlpt: 'N5',
    desc: '약국, 병원, 분실물, 경찰/안내소에서 당황하지 않게 말하는 단계.',
    unlockXP: 0
  },
  {
    id: 10, key: 'v3_local_plus',
    name: '현지 확장',
    nameJp: '現地応用',
    icon: '',
    color: '#f43f5e',
    jlpt: 'N5',
    desc: '렌트카, 관광지, 예약, 사진 부탁처럼 여행 만족도를 올리는 실전 장면.',
    unlockXP: 0
  },
  {
    id: 11, key: 'v3_drama',
    name: '드라마 귀 트기',
    nameJp: 'ドラマ聞き取り',
    icon: '',
    color: '#f97316',
    jlpt: null,
    desc: '자막 속 짧은 반응, 감정 표현, 친구 말투를 알아듣는 콘텐츠 학습 입문.',
    unlockXP: 0
  }
];

const HIRAGANA_BASE = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'];
const KATAKANA_BASE = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン'];

const V3_PRE_SENTENCE_CARDS = [
  { id:'v3pre_01', japanese:'私は', romaji:'watashi wa', korean:'나는 / 저는' },
  { id:'v3pre_02', japanese:'これ', romaji:'kore', korean:'이것' },
  { id:'v3pre_03', japanese:'ここ', romaji:'koko', korean:'여기' },
  { id:'v3pre_04', japanese:'何ですか', romaji:'nan desu ka', korean:'뭐예요?' },
  { id:'v3pre_05', japanese:'どこですか', romaji:'doko desu ka', korean:'어디예요?' },
  { id:'v3pre_06', japanese:'ください', romaji:'kudasai', korean:'주세요' },
  { id:'v3pre_07', japanese:'お願いします', romaji:'onegai shimasu', korean:'부탁해요' },
  { id:'v3pre_08', japanese:'大丈夫です', romaji:'daijoubu desu', korean:'괜찮아요' },
  { id:'v3pre_09', japanese:'ありますか', romaji:'arimasu ka', korean:'있어요?' },
  { id:'v3pre_10', japanese:'できますか', romaji:'dekimasu ka', korean:'할 수 있어요?' },
  { id:'v3pre_11', japanese:'わかりません', romaji:'wakarimasen', korean:'모르겠어요' },
  { id:'v3pre_12', japanese:'もう一度', romaji:'mou ichido', korean:'한 번 더' },
];

const V3_KATAW_CARDS = [
  { id:'v3kataw_01', japanese:'ホテル', romaji:'hoteru', korean:'호텔' },
  { id:'v3kataw_02', japanese:'カード', romaji:'kaado', korean:'카드' },
  { id:'v3kataw_03', japanese:'コーヒー', romaji:'koohii', korean:'커피' },
  { id:'v3kataw_04', japanese:'タクシー', romaji:'takushii', korean:'택시' },
  { id:'v3kataw_05', japanese:'レストラン', romaji:'resutoran', korean:'레스토랑' },
  { id:'v3kataw_06', japanese:'トイレ', romaji:'toire', korean:'화장실' },
  { id:'v3kataw_07', japanese:'コンビニ', romaji:'konbini', korean:'편의점' },
  { id:'v3kataw_08', japanese:'ビール', romaji:'biiru', korean:'맥주' },
  { id:'v3kataw_09', japanese:'メニュー', romaji:'menyuu', korean:'메뉴' },
  { id:'v3kataw_10', japanese:'サービス', romaji:'saabisu', korean:'서비스' },
];

const V3_BASIC_STRUCTURE_CARDS = [
  { id:'v3str_01', japanese:'A は B です', romaji:'A wa B desu', korean:'A는 B예요' },
  { id:'v3str_02', japanese:'A は どこですか', romaji:'A wa doko desu ka', korean:'A는 어디예요?' },
  { id:'v3str_03', japanese:'A を ください', romaji:'A wo kudasai', korean:'A를 주세요' },
  { id:'v3str_04', japanese:'A に 行きます', romaji:'A ni ikimasu', korean:'A에 가요' },
  { id:'v3str_05', japanese:'A で お願いします', romaji:'A de onegai shimasu', korean:'A로 부탁해요' },
  { id:'v3str_06', japanese:'A は ありますか', romaji:'A wa arimasu ka', korean:'A는 있어요?' },
  { id:'v3str_07', japanese:'A は いくらですか', romaji:'A wa ikura desu ka', korean:'A는 얼마예요?' },
  { id:'v3str_08', japanese:'A まで お願いします', romaji:'A made onegai shimasu', korean:'A까지 부탁해요' },
  { id:'v3str_09', japanese:'ゆっくり お願いします', romaji:'yukkuri onegai shimasu', korean:'천천히 부탁해요' },
  { id:'v3str_10', japanese:'日本語は少しだけです', romaji:'nihongo wa sukoshi dake desu', korean:'일본어는 조금만 해요' },
];

const V3_TENSE_MATRIX_CARDS = [
  { id:'v3tense_01', japanese:'学生です', romaji:'gakusei desu', korean:'학생이에요' },
  { id:'v3tense_02', japanese:'学生ではありません', romaji:'gakusei dewa arimasen', korean:'학생이 아니에요' },
  { id:'v3tense_03', japanese:'学生でした', romaji:'gakusei deshita', korean:'학생이었어요' },
  { id:'v3tense_04', japanese:'学生ではありませんでした', romaji:'gakusei dewa arimasen deshita', korean:'학생이 아니었어요' },
  { id:'v3tense_05', japanese:'おいしいです', romaji:'oishii desu', korean:'맛있어요' },
  { id:'v3tense_06', japanese:'おいしくないです', romaji:'oishikunai desu', korean:'맛있지 않아요' },
  { id:'v3tense_07', japanese:'おいしかったです', romaji:'oishikatta desu', korean:'맛있었어요' },
  { id:'v3tense_08', japanese:'おいしくなかったです', romaji:'oishikunakatta desu', korean:'맛있지 않았어요' },
  { id:'v3tense_09', japanese:'食べます', romaji:'tabemasu', korean:'먹어요 / 먹습니다' },
  { id:'v3tense_10', japanese:'食べません', romaji:'tabemasen', korean:'먹지 않아요' },
  { id:'v3tense_11', japanese:'食べました', romaji:'tabemashita', korean:'먹었어요' },
  { id:'v3tense_12', japanese:'食べませんでした', romaji:'tabemasen deshita', korean:'먹지 않았어요' },
  { id:'v3tense_13', japanese:'行きます', romaji:'ikimasu', korean:'가요 / 갑니다' },
  { id:'v3tense_14', japanese:'行きません', romaji:'ikimasen', korean:'가지 않아요' },
  { id:'v3tense_15', japanese:'行きました', romaji:'ikimashita', korean:'갔어요' },
  { id:'v3tense_16', japanese:'行きませんでした', romaji:'ikimasen deshita', korean:'가지 않았어요' },
];

const V3_AIRPORT_QA_CARDS = [
  { id:'v3air_01', japanese:'パスポートをお願いします', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요' },
  { id:'v3air_02', japanese:'はい、どうぞ', romaji:'hai, douzo', korean:'네, 여기요' },
  { id:'v3air_03', japanese:'荷物は一つです', romaji:'nimotsu wa hitotsu desu', korean:'짐은 하나예요' },
  { id:'v3air_04', japanese:'通路側をお願いします', romaji:'tsuuro gawa wo onegai shimasu', korean:'통로 쪽으로 부탁해요' },
  { id:'v3air_05', japanese:'窓側をお願いします', romaji:'madogawa wo onegai shimasu', korean:'창가 쪽으로 부탁해요' },
  { id:'v3air_06', japanese:'搭乗口はどこですか', romaji:'toujouguchi wa doko desu ka', korean:'탑승구는 어디예요?' },
  { id:'v3air_07', japanese:'何時から搭乗ですか', romaji:'nan ji kara toujou desu ka', korean:'몇 시부터 탑승이에요?' },
  { id:'v3air_08', japanese:'この荷物を預けたいです', romaji:'kono nimotsu wo azuketai desu', korean:'이 짐을 맡기고 싶어요' },
  { id:'v3air_09', japanese:'重さは大丈夫ですか', romaji:'omosa wa daijoubu desu ka', korean:'무게는 괜찮아요?' },
  { id:'v3air_10', japanese:'はい、大丈夫です', romaji:'hai, daijoubu desu', korean:'네, 괜찮아요' },
];

const V3_IMMIGRATION_QA_CARDS = [
  { id:'v3imm_01', japanese:'目的は何ですか', romaji:'mokuteki wa nan desu ka', korean:'목적은 뭐예요?' },
  { id:'v3imm_02', japanese:'旅行です', romaji:'ryokou desu', korean:'여행이에요' },
  { id:'v3imm_03', japanese:'何日滞在しますか', romaji:'nan nichi taizai shimasu ka', korean:'며칠 머물러요?' },
  { id:'v3imm_04', japanese:'三日です', romaji:'mikka desu', korean:'3일이에요' },
  { id:'v3imm_05', japanese:'どこに泊まりますか', romaji:'doko ni tomarimasu ka', korean:'어디에 묵어요?' },
  { id:'v3imm_06', japanese:'新宿のホテルです', romaji:'shinjuku no hoteru desu', korean:'신주쿠 호텔이에요' },
  { id:'v3imm_07', japanese:'帰りのチケットはありますか', romaji:'kaeri no chiketto wa arimasu ka', korean:'돌아가는 티켓 있어요?' },
  { id:'v3imm_08', japanese:'はい、あります', romaji:'hai, arimasu', korean:'네, 있어요' },
  { id:'v3imm_09', japanese:'一人です', romaji:'hitori desu', korean:'혼자예요' },
  { id:'v3imm_10', japanese:'観光です', romaji:'kankou desu', korean:'관광이에요' },
];

const V3_AIRPLANE_QA_CARDS = [
  { id:'v3plane_01', japanese:'水をください', romaji:'mizu wo kudasai', korean:'물 주세요' },
  { id:'v3plane_02', japanese:'毛布はありますか', romaji:'moufu wa arimasu ka', korean:'담요 있어요?' },
  { id:'v3plane_03', japanese:'入国カードはありますか', romaji:'nyuukoku kaado wa arimasu ka', korean:'입국 카드 있어요?' },
  { id:'v3plane_04', japanese:'ペンをお願いします', romaji:'pen wo onegai shimasu', korean:'펜 부탁해요' },
  { id:'v3plane_05', japanese:'席を変えられますか', romaji:'seki wo kaeraremasu ka', korean:'자리 바꿀 수 있어요?' },
  { id:'v3plane_06', japanese:'少々お待ちください', romaji:'shoushou omachi kudasai', korean:'잠시 기다려 주세요' },
  { id:'v3plane_07', japanese:'大丈夫です', romaji:'daijoubu desu', korean:'괜찮아요' },
  { id:'v3plane_08', japanese:'食事は何がありますか', romaji:'shokuji wa nani ga arimasu ka', korean:'식사는 뭐가 있어요?' },
  { id:'v3plane_09', japanese:'牛肉と魚があります', romaji:'gyuuniku to sakana ga arimasu', korean:'소고기와 생선이 있어요' },
  { id:'v3plane_10', japanese:'魚をお願いします', romaji:'sakana wo onegai shimasu', korean:'생선으로 부탁해요' },
];

const V3_STATION_QA_CARDS = [
  { id:'v3st_01', japanese:'新宿駅はどこですか', romaji:'shinjuku eki wa doko desu ka', korean:'신주쿠역은 어디예요?' },
  { id:'v3st_02', japanese:'この道をまっすぐです', romaji:'kono michi wo massugu desu', korean:'이 길을 쭉 가면 돼요' },
  { id:'v3st_03', japanese:'歩いて何分ですか', romaji:'aruite nan pun desu ka', korean:'걸어서 몇 분이에요?' },
  { id:'v3st_04', japanese:'十分くらいです', romaji:'juppun kurai desu', korean:'10분 정도예요' },
  { id:'v3st_05', japanese:'何番線ですか', romaji:'nan bansen desu ka', korean:'몇 번 승강장이에요?' },
  { id:'v3st_06', japanese:'二番線です', romaji:'ni bansen desu', korean:'2번 승강장이에요' },
  { id:'v3st_07', japanese:'乗り換えはありますか', romaji:'norikae wa arimasu ka', korean:'환승 있어요?' },
  { id:'v3st_08', japanese:'山手線に乗ってください', romaji:'yamanote sen ni notte kudasai', korean:'야마노테선을 타세요' },
  { id:'v3st_10', japanese:'気をつけてください', romaji:'ki wo tsukete kudasai', korean:'조심하세요' },
  { id:'v3st_11', japanese:'ありがとうございます', romaji:'arigatou gozaimasu', korean:'감사합니다' },
];

const V3_BUS_QA_CARDS = [
  { id:'v3bus_01', japanese:'このバスは浅草に行きますか', romaji:'kono basu wa asakusa ni ikimasu ka', korean:'이 버스는 아사쿠사에 가요?' },
  { id:'v3bus_02', japanese:'はい、行きます', romaji:'hai, ikimasu', korean:'네, 가요' },
  { id:'v3bus_03', japanese:'料金はいくらですか', romaji:'ryoukin wa ikura desu ka', korean:'요금은 얼마예요?' },
  { id:'v3bus_04', japanese:'二百円です', romaji:'nihyaku en desu', korean:'200엔이에요' },
  { id:'v3bus_05', japanese:'ICカードは使えますか', romaji:'IC kaado wa tsukaemasu ka', korean:'IC 카드 쓸 수 있어요?' },
  { id:'v3bus_06', japanese:'どこで降りますか', romaji:'doko de orimasu ka', korean:'어디에서 내려요?' },
  { id:'v3bus_07', japanese:'次の次です', romaji:'tsugi no tsugi desu', korean:'다음 다음이에요' },
  { id:'v3bus_08', japanese:'ボタンを押してください', romaji:'botan wo oshite kudasai', korean:'버튼을 눌러 주세요' },
  { id:'v3bus_09', japanese:'次で降ります', romaji:'tsugi de orimasu', korean:'다음에서 내려요' },
  { id:'v3bus_10', japanese:'ありがとうございました', romaji:'arigatou gozaimashita', korean:'감사했습니다' },
];

const V3_TAXI_QA_CARDS = [
  { id:'v3taxi_01', japanese:'このホテルまでお願いします', romaji:'kono hoteru made onegai shimasu', korean:'이 호텔까지 부탁해요' },
  { id:'v3taxi_02', japanese:'何分かかりますか', romaji:'nan pun kakarimasu ka', korean:'몇 분 걸려요?' },
  { id:'v3taxi_03', japanese:'十五分くらいです', romaji:'juugo fun kurai desu', korean:'15분 정도예요' },
  { id:'v3taxi_04', japanese:'ここで大丈夫です', romaji:'koko de daijoubu desu', korean:'여기서 괜찮아요' },
  { id:'v3taxi_05', japanese:'カードは使えますか', romaji:'kaado wa tsukaemasu ka', korean:'카드 쓸 수 있어요?' },
  { id:'v3taxi_06', japanese:'領収書をください', romaji:'ryoushuusho wo kudasai', korean:'영수증 주세요' },
  { id:'v3taxi_07', japanese:'高速道路は使わないでください', romaji:'kousoku douro wa tsukawanaide kudasai', korean:'고속도로는 쓰지 말아 주세요' },
  { id:'v3taxi_08', japanese:'はい、わかりました', romaji:'hai, wakarimashita', korean:'네, 알겠습니다' },
  { id:'v3taxi_09', japanese:'料金はいくらですか', romaji:'ryoukin wa ikura desu ka', korean:'요금은 얼마예요?' },
  { id:'v3taxi_10', japanese:'ありがとうございました', romaji:'arigatou gozaimashita', korean:'감사했습니다' },
];

const V3_KONBINI_QA_CARDS = [
  { id:'v3kon_01', japanese:'このお弁当をお願いします', romaji:'kono obentou wo onegai shimasu', korean:'이 도시락 부탁해요' },
  { id:'v3kon_02', japanese:'温めますか', romaji:'atatamemasu ka', korean:'데워 드릴까요?' },
  { id:'v3kon_03', japanese:'はい、お願いします', romaji:'hai, onegai shimasu', korean:'네, 부탁해요' },
  { id:'v3kon_04', japanese:'お箸は要りますか', romaji:'ohashi wa irimasu ka', korean:'젓가락 필요하세요?' },
  { id:'v3kon_05', japanese:'一つお願いします', romaji:'hitotsu onegai shimasu', korean:'하나 부탁해요' },
  { id:'v3kon_06', japanese:'袋は要りますか', romaji:'fukuro wa irimasu ka', korean:'봉투 필요하세요?' },
  { id:'v3kon_07', japanese:'大丈夫です', romaji:'daijoubu desu', korean:'괜찮아요' },
  { id:'v3kon_08', japanese:'Suicaでお願いします', romaji:'suika de onegai shimasu', korean:'스이카로 부탁해요' },
  { id:'v3kon_09', japanese:'六百円です', romaji:'roppyaku en desu', korean:'600엔이에요' },
  { id:'v3kon_10', japanese:'ありがとうございました', romaji:'arigatou gozaimashita', korean:'감사했습니다' },
];

const V3_CAFE_QA_CARDS = [
  { id:'v3cafe_01', japanese:'モーニングセットをください', romaji:'mooningu setto wo kudasai', korean:'모닝 세트 주세요' },
  { id:'v3cafe_02', japanese:'飲み物は何にしますか', romaji:'nomimono wa nani ni shimasu ka', korean:'음료는 뭘로 하시겠어요?' },
  { id:'v3cafe_03', japanese:'アイスコーヒーでお願いします', romaji:'aisu koohii de onegai shimasu', korean:'아이스커피로 부탁해요' },
  { id:'v3cafe_04', japanese:'店内ですか', romaji:'tennai desu ka', korean:'매장이세요?' },
  { id:'v3cafe_05', japanese:'はい、店内です', romaji:'hai, tennai desu', korean:'네, 매장이요' },
  { id:'v3cafe_06', japanese:'席はあちらです', romaji:'seki wa achira desu', korean:'자리는 저쪽이에요' },
  { id:'v3cafe_07', japanese:'何時までですか', romaji:'nan ji made desu ka', korean:'몇 시까지예요?' },
  { id:'v3cafe_08', japanese:'十一時までです', romaji:'juuichi ji made desu', korean:'11시까지예요' },
  { id:'v3cafe_09', japanese:'トーストもお願いします', romaji:'toosuto mo onegai shimasu', korean:'토스트도 부탁해요' },
  { id:'v3cafe_10', japanese:'かしこまりました', romaji:'kashikomarimashita', korean:'알겠습니다' },
];

const V3_IZAKAYA_QA_CARDS = [
  { id:'v3iz_01', japanese:'二人です', romaji:'futari desu', korean:'두 명이에요' },
  { id:'v3iz_02', japanese:'禁煙席でお願いします', romaji:'kinen seki de onegai shimasu', korean:'금연석으로 부탁해요' },
  { id:'v3iz_03', japanese:'ビールを二つください', romaji:'biiru wo futatsu kudasai', korean:'맥주 두 잔 주세요' },
  { id:'v3iz_04', japanese:'おすすめは何ですか', romaji:'osusume wa nan desu ka', korean:'추천은 뭐예요?' },
  { id:'v3iz_05', japanese:'焼き鳥がおすすめです', romaji:'yakitori ga osusume desu', korean:'야키토리가 추천이에요' },
  { id:'v3iz_06', japanese:'それもお願いします', romaji:'sore mo onegai shimasu', korean:'그것도 부탁해요' },
  { id:'v3iz_07', japanese:'お水をください', romaji:'omizu wo kudasai', korean:'물 주세요' },
  { id:'v3iz_08', japanese:'お会計をお願いします', romaji:'okaikei wo onegai shimasu', korean:'계산 부탁해요' },
  { id:'v3iz_09', japanese:'カードは使えますか', romaji:'kaado wa tsukaemasu ka', korean:'카드 쓸 수 있어요?' },
  { id:'v3iz_10', japanese:'ごちそうさまでした', romaji:'gochisou sama deshita', korean:'잘 먹었습니다' },
];

const V3_SHOPPING_QA_CARDS = [
  { id:'v3shop_01', japanese:'見ているだけです', romaji:'mite iru dake desu', korean:'그냥 보고 있어요' },
  { id:'v3shop_02', japanese:'これを試着してもいいですか', romaji:'kore wo shichaku shite mo ii desu ka', korean:'이거 입어봐도 돼요?' },
  { id:'v3shop_03', japanese:'Mサイズはありますか', romaji:'emu saizu wa arimasu ka', korean:'M 사이즈 있어요?' },
  { id:'v3shop_04', japanese:'少し大きいです', romaji:'sukoshi ookii desu', korean:'조금 커요' },
  { id:'v3shop_05', japanese:'少し小さいです', romaji:'sukoshi chiisai desu', korean:'조금 작아요' },
  { id:'v3shop_06', japanese:'色違いはありますか', romaji:'iro chigai wa arimasu ka', korean:'다른 색 있어요?' },
  { id:'v3shop_07', japanese:'いくらですか', romaji:'ikura desu ka', korean:'얼마예요?' },
  { id:'v3shop_08', japanese:'これにします', romaji:'kore ni shimasu', korean:'이걸로 할게요' },
  { id:'v3shop_09', japanese:'もう少し考えます', romaji:'mou sukoshi kangaemasu', korean:'조금 더 생각할게요' },
  { id:'v3shop_10', japanese:'これをください', romaji:'kore wo kudasai', korean:'이거 주세요' },
];

const V3_PAYMENT_QA_CARDS = [
  { id:'v3pay_01', japanese:'これにします', romaji:'kore ni shimasu', korean:'이걸로 할게요' },
  { id:'v3pay_02', japanese:'袋は要りますか', romaji:'fukuro wa irimasu ka', korean:'봉투 필요하세요?' },
  { id:'v3pay_03', japanese:'大丈夫です', romaji:'daijoubu desu', korean:'괜찮아요' },
  { id:'v3pay_04', japanese:'カードでお願いします', romaji:'kaado de onegai shimasu', korean:'카드로 부탁해요' },
  { id:'v3pay_05', japanese:'現金でお願いします', romaji:'genkin de onegai shimasu', korean:'현금으로 부탁해요' },
  { id:'v3pay_06', japanese:'レシートをください', romaji:'reshiito wo kudasai', korean:'영수증 주세요' },
  { id:'v3pay_07', japanese:'免税できますか', romaji:'menzei dekimasu ka', korean:'면세 가능해요?' },
  { id:'v3pay_08', japanese:'ここにサインをお願いします', romaji:'koko ni sain wo onegai shimasu', korean:'여기에 사인 부탁드려요' },
  { id:'v3pay_09', japanese:'暗証番号をお願いします', romaji:'anshou bangou wo onegai shimasu', korean:'비밀번호 눌러 주세요' },
  { id:'v3pay_10', japanese:'ありがとうございました', romaji:'arigatou gozaimashita', korean:'감사했습니다' },
];

const V3_DUTY_FREE_QA_CARDS = [
  { id:'v3df_01', japanese:'お土産を探しています', romaji:'omiyage wo sagashite imasu', korean:'선물을 찾고 있어요' },
  { id:'v3df_02', japanese:'人気のものはどれですか', romaji:'ninki no mono wa dore desu ka', korean:'인기 있는 건 뭐예요?' },
  { id:'v3df_03', japanese:'これはいくらですか', romaji:'kore wa ikura desu ka', korean:'이건 얼마예요?' },
  { id:'v3df_04', japanese:'機内に持ち込めますか', romaji:'kinai ni mochikomemasu ka', korean:'기내에 가지고 탈 수 있어요?' },
  { id:'v3df_05', japanese:'パスポートをお願いします', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요' },
  { id:'v3df_06', japanese:'搭乗券はありますか', romaji:'toujouken wa arimasu ka', korean:'탑승권 있어요?' },
  { id:'v3df_07', japanese:'これを二つください', romaji:'kore wo futatsu kudasai', korean:'이거 두 개 주세요' },
  { id:'v3df_08', japanese:'プレゼント用にできますか', romaji:'purezento you ni dekimasu ka', korean:'선물용으로 가능해요?' },
  { id:'v3df_09', japanese:'袋をください', romaji:'fukuro wo kudasai', korean:'봉투 주세요' },
  { id:'v3df_10', japanese:'ありがとうございます', romaji:'arigatou gozaimasu', korean:'감사합니다' },
];

const V3_HOTEL_QA_CARDS = [
  { id:'v3hotel_01', japanese:'チェックインをお願いします', romaji:'chekku in wo onegai shimasu', korean:'체크인 부탁해요' },
  { id:'v3hotel_02', japanese:'予約しています', romaji:'yoyaku shite imasu', korean:'예약했어요' },
  { id:'v3hotel_03', japanese:'名前はキムです', romaji:'namae wa kimu desu', korean:'이름은 김이에요' },
  { id:'v3hotel_04', japanese:'パスポートをお願いします', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요' },
  { id:'v3hotel_05', japanese:'朝食は何時からですか', romaji:'choushoku wa nan ji kara desu ka', korean:'조식은 몇 시부터예요?' },
  { id:'v3hotel_06', japanese:'チェックアウトは何時ですか', romaji:'chekku auto wa nan ji desu ka', korean:'체크아웃은 몇 시예요?' },
  { id:'v3hotel_07', japanese:'鍵はこちらです', romaji:'kagi wa kochira desu', korean:'열쇠는 여기예요' },
  { id:'v3hotel_08', japanese:'部屋は何階ですか', romaji:'heya wa nan gai desu ka', korean:'방은 몇 층이에요?' },
  { id:'v3hotel_09', japanese:'荷物を預かってもらえますか', romaji:'nimotsu wo azukatte moraemasu ka', korean:'짐을 맡길 수 있어요?' },
  { id:'v3hotel_10', japanese:'かしこまりました', romaji:'kashikomarimashita', korean:'알겠습니다' },
];

const V3_HOTEL_REQUEST_QA_CARDS = [
  { id:'v3hreq_01', japanese:'タオルをください', romaji:'taoru wo kudasai', korean:'수건 주세요' },
  { id:'v3hreq_02', japanese:'部屋番号は五〇二です', romaji:'heya bangou wa go maru ni desu', korean:'방 번호는 502호예요' },
  { id:'v3hreq_03', japanese:'Wi-Fiのパスワードは何ですか', romaji:'waifai no pasuwaado wa nan desu ka', korean:'와이파이 비밀번호는 뭐예요?' },
  { id:'v3hreq_04', japanese:'エアコンが動きません', romaji:'eakon ga ugokimasen', korean:'에어컨이 작동하지 않아요' },
  { id:'v3hreq_05', japanese:'確認します', romaji:'kakunin shimasu', korean:'확인할게요' },
  { id:'v3hreq_06', japanese:'少し待ってください', romaji:'sukoshi matte kudasai', korean:'잠깐 기다려 주세요' },
  { id:'v3hreq_07', japanese:'毛布はありますか', romaji:'moufu wa arimasu ka', korean:'담요 있어요?' },
  { id:'v3hreq_08', japanese:'鍵をなくしました', romaji:'kagi wo nakushimashita', korean:'열쇠를 잃어버렸어요' },
  { id:'v3hreq_09', japanese:'助かりました', romaji:'tasukarimashita', korean:'도움이 됐어요' },
  { id:'v3hreq_10', japanese:'すぐ持っていきます', romaji:'sugu motte ikimasu', korean:'바로 가져다 드릴게요' },
];

const V3_ONSEN_QA_CARDS = [
  { id:'v3onsen_01', japanese:'温泉は何時までですか', romaji:'onsen wa nan ji made desu ka', korean:'온천은 몇 시까지예요?' },
  { id:'v3onsen_02', japanese:'タオルはありますか', romaji:'taoru wa arimasu ka', korean:'수건 있어요?' },
  { id:'v3onsen_03', japanese:'部屋のタオルを使ってください', romaji:'heya no taoru wo tsukatte kudasai', korean:'객실 수건을 사용해 주세요' },
  { id:'v3onsen_04', japanese:'ここで靴を脱ぎますか', romaji:'koko de kutsu wo nugimasu ka', korean:'여기서 신발 벗어요?' },
  { id:'v3onsen_05', japanese:'写真はだめです', romaji:'shashin wa dame desu', korean:'사진은 안 돼요' },
  { id:'v3onsen_06', japanese:'ロッカーはどこですか', romaji:'rokkaa wa doko desu ka', korean:'락커는 어디예요?' },
  { id:'v3onsen_07', japanese:'この鍵を使ってください', romaji:'kono kagi wo tsukatte kudasai', korean:'이 열쇠를 사용해 주세요' },
  { id:'v3onsen_08', japanese:'飲み物はどこですか', romaji:'nomimono wa doko desu ka', korean:'음료는 어디 있어요?' },
  { id:'v3onsen_09', japanese:'あちらの自販機にあります', romaji:'achira no jihanki ni arimasu', korean:'저쪽 자판기에 있어요' },
  { id:'v3onsen_10', japanese:'ゆっくりしてください', romaji:'yukkuri shite kudasai', korean:'편히 쉬세요' },
];

const V3_HEALTH_QA_CARDS = [
  { id:'v3health_01', japanese:'お腹が痛いです', romaji:'onaka ga itai desu', korean:'배가 아파요' },
  { id:'v3health_02', japanese:'頭が痛いです', romaji:'atama ga itai desu', korean:'머리가 아파요' },
  { id:'v3health_03', japanese:'熱があります', romaji:'netsu ga arimasu', korean:'열이 있어요' },
  { id:'v3health_04', japanese:'今日の朝からです', romaji:'kyou no asa kara desu', korean:'오늘 아침부터요' },
  { id:'v3health_05', japanese:'薬はありますか', romaji:'kusuri wa arimasu ka', korean:'약 있어요?' },
  { id:'v3health_06', japanese:'食後に飲んでください', romaji:'shokugo ni nonde kudasai', korean:'식후에 드세요' },
  { id:'v3health_07', japanese:'一日三回です', romaji:'ichinichi sankai desu', korean:'하루 세 번이에요' },
  { id:'v3health_08', japanese:'病院は近くにありますか', romaji:'byouin wa chikaku ni arimasu ka', korean:'병원은 근처에 있어요?' },
  { id:'v3health_09', japanese:'水で飲んでください', romaji:'mizu de nonde kudasai', korean:'물과 함께 드세요' },
  { id:'v3health_10', japanese:'お大事に', romaji:'odaiji ni', korean:'몸조리 잘하세요' },
];

const V3_HOSPITAL_QA_CARDS = [
  { id:'v3hos_01', japanese:'診てもらえますか', romaji:'mite moraemasu ka', korean:'진료 받을 수 있어요?' },
  { id:'v3hos_02', japanese:'どうしましたか', romaji:'dou shimashita ka', korean:'어디가 안 좋으세요?' },
  { id:'v3hos_03', japanese:'熱があります', romaji:'netsu ga arimasu', korean:'열이 있어요' },
  { id:'v3hos_04', japanese:'お腹も痛いです', romaji:'onaka mo itai desu', korean:'배도 아파요' },
  { id:'v3hos_05', japanese:'旅行保険があります', romaji:'ryokou hoken ga arimasu', korean:'여행자 보험이 있어요' },
  { id:'v3hos_06', japanese:'パスポートをお願いします', romaji:'pasupooto wo onegai shimasu', korean:'여권 부탁드려요' },
  { id:'v3hos_07', japanese:'この紙に書いてください', romaji:'kono kami ni kaite kudasai', korean:'이 종이에 써 주세요' },
  { id:'v3hos_08', japanese:'どのくらい待ちますか', romaji:'dono kurai machimasu ka', korean:'얼마나 기다려요?' },
  { id:'v3hos_09', japanese:'三十分くらいです', romaji:'sanjuppun kurai desu', korean:'30분 정도예요' },
  { id:'v3hos_10', japanese:'お大事に', romaji:'odaiji ni', korean:'몸조리 잘하세요' },
];

const V3_LOST_QA_CARDS = [
  { id:'v3lost_01', japanese:'かばんをなくしました', romaji:'kaban wo nakushimashita', korean:'가방을 잃어버렸어요' },
  { id:'v3lost_02', japanese:'財布をなくしました', romaji:'saifu wo nakushimashita', korean:'지갑을 잃어버렸어요' },
  { id:'v3lost_03', japanese:'どこでなくしましたか', romaji:'doko de nakushimashita ka', korean:'어디에서 잃어버렸어요?' },
  { id:'v3lost_04', japanese:'電車の中だと思います', romaji:'densha no naka da to omoimasu', korean:'전철 안인 것 같아요' },
  { id:'v3lost_05', japanese:'黒いかばんです', romaji:'kuroi kaban desu', korean:'검은 가방이에요' },
  { id:'v3lost_06', japanese:'中にパスポートがあります', romaji:'naka ni pasupooto ga arimasu', korean:'안에 여권이 있어요' },
  { id:'v3lost_07', japanese:'少し待ってください', romaji:'sukoshi matte kudasai', korean:'잠깐 기다려 주세요' },
  { id:'v3lost_08', japanese:'連絡先を書いてください', romaji:'renrakusaki wo kaite kudasai', korean:'연락처를 써 주세요' },
  { id:'v3lost_09', japanese:'お願いします', romaji:'onegai shimasu', korean:'부탁해요' },
  { id:'v3lost_10', japanese:'見つかったら連絡します', romaji:'mitsukattara renraku shimasu', korean:'찾으면 연락할게요' },
];

const V3_RENTACAR_QA_CARDS = [
  { id:'v3car_01', japanese:'予約しています', romaji:'yoyaku shite imasu', korean:'예약했어요' },
  { id:'v3car_02', japanese:'名前はキムです', romaji:'namae wa kimu desu', korean:'이름은 김이에요' },
  { id:'v3car_03', japanese:'免許証をお願いします', romaji:'menkyoshou wo onegai shimasu', korean:'면허증 부탁드려요' },
  { id:'v3car_04', japanese:'保険は入っていますか', romaji:'hoken wa haitte imasu ka', korean:'보험은 들어 있어요?' },
  { id:'v3car_05', japanese:'返却は何時ですか', romaji:'henkyaku wa nan ji desu ka', korean:'반납은 몇 시예요?' },
  { id:'v3car_06', japanese:'ガソリンは満タンで返しますか', romaji:'gasorin wa mantan de kaeshimasu ka', korean:'기름은 가득 채워 반납해요?' },
  { id:'v3car_07', japanese:'ナビは日本語ですか', romaji:'nabi wa nihongo desu ka', korean:'내비는 일본어예요?' },
  { id:'v3car_08', japanese:'ここにサインをお願いします', romaji:'koko ni sain wo onegai shimasu', korean:'여기에 사인 부탁드려요' },
  { id:'v3car_09', japanese:'満タンで返してください', romaji:'mantan de kaeshite kudasai', korean:'가득 채워서 반납해 주세요' },
  { id:'v3car_10', japanese:'気をつけて運転してください', romaji:'ki wo tsukete unten shite kudasai', korean:'조심히 운전하세요' },
];

const V3_TOURIST_QA_CARDS = [
  { id:'v3photo_01', japanese:'写真を撮ってもらえますか', romaji:'shashin wo totte moraemasu ka', korean:'사진 찍어 주실 수 있어요?' },
  { id:'v3photo_02', japanese:'ここでお願いします', romaji:'koko de onegai shimasu', korean:'여기서 부탁해요' },
  { id:'v3photo_03', japanese:'もう一枚お願いします', romaji:'mou ichi mai onegai shimasu', korean:'한 장 더 부탁해요' },
  { id:'v3photo_04', japanese:'縦でお願いします', romaji:'tate de onegai shimasu', korean:'세로로 부탁해요' },
  { id:'v3photo_05', japanese:'横でお願いします', romaji:'yoko de onegai shimasu', korean:'가로로 부탁해요' },
  { id:'v3photo_06', japanese:'入場券はどこで買えますか', romaji:'nyuujouken wa doko de kaemasu ka', korean:'입장권은 어디서 살 수 있어요?' },
  { id:'v3photo_07', japanese:'おすすめの場所はありますか', romaji:'osusume no basho wa arimasu ka', korean:'추천 장소 있어요?' },
  { id:'v3photo_08', japanese:'助かりました', romaji:'tasukarimashita', korean:'도움이 됐어요' },
  { id:'v3photo_10', japanese:'楽しんでください', romaji:'tanoshinde kudasai', korean:'즐겁게 보내세요' },
  { id:'v3photo_11', japanese:'ありがとうございます', romaji:'arigatou gozaimasu', korean:'감사합니다' },
];

const V3_RESERVATION_QA_CARDS = [
  { id:'v3res_01', japanese:'予約しています', romaji:'yoyaku shite imasu', korean:'예약했어요' },
  { id:'v3res_02', japanese:'名前はキムです', romaji:'namae wa kimu desu', korean:'이름은 김이에요' },
  { id:'v3res_03', japanese:'七時の予約です', romaji:'shichi ji no yoyaku desu', korean:'7시 예약이에요' },
  { id:'v3res_04', japanese:'二人です', romaji:'futari desu', korean:'두 명이에요' },
  { id:'v3res_05', japanese:'時間を変えられますか', romaji:'jikan wo kaeraremasu ka', korean:'시간을 바꿀 수 있어요?' },
  { id:'v3res_06', japanese:'明日の同じ時間でお願いします', romaji:'ashita no onaji jikan de onegai shimasu', korean:'내일 같은 시간으로 부탁해요' },
  { id:'v3res_07', japanese:'電話番号はこれです', romaji:'denwa bangou wa kore desu', korean:'전화번호는 이거예요' },
  { id:'v3res_08', japanese:'確認しました', romaji:'kakunin shimashita', korean:'확인했습니다' },
  { id:'v3res_09', japanese:'窓側の席はありますか', romaji:'madogawa no seki wa arimasu ka', korean:'창가 자리 있어요?' },
  { id:'v3res_10', japanese:'ご用意します', romaji:'goyoui shimasu', korean:'준비해 드릴게요' },
];

const V3_WEATHER_QA_CARDS = [
  { id:'v3weather_01', japanese:'雨が降っています', romaji:'ame ga futte imasu', korean:'비가 오고 있어요' },
  { id:'v3weather_02', japanese:'明日に変えられますか', romaji:'ashita ni kaeraremasu ka', korean:'내일로 바꿀 수 있어요?' },
  { id:'v3weather_03', japanese:'時間は同じでいいですか', romaji:'jikan wa onaji de ii desu ka', korean:'시간은 같아도 돼요?' },
  { id:'v3weather_04', japanese:'同じ時間でお願いします', romaji:'onaji jikan de onegai shimasu', korean:'같은 시간으로 부탁해요' },
  { id:'v3weather_05', japanese:'キャンセルできますか', romaji:'kyanseru dekimasu ka', korean:'취소할 수 있어요?' },
  { id:'v3weather_06', japanese:'返金はありますか', romaji:'henkin wa arimasu ka', korean:'환불 있어요?' },
  { id:'v3weather_07', japanese:'晴れたら行きたいです', romaji:'haretara ikitai desu', korean:'맑으면 가고 싶어요' },
  { id:'v3weather_08', japanese:'室内のおすすめはありますか', romaji:'shitsunai no osusume wa arimasu ka', korean:'실내 추천 있어요?' },
  { id:'v3weather_09', japanese:'美術館はどうですか', romaji:'bijutsukan wa dou desu ka', korean:'미술관은 어때요?' },
  { id:'v3weather_10', japanese:'いいですね', romaji:'ii desu ne', korean:'좋네요' },
];

const V3_WRAPUP_QA_CARDS = [
  { id:'v3wrap_01', japanese:'大丈夫です', romaji:'daijoubu desu', korean:'괜찮아요' },
  { id:'v3wrap_02', japanese:'助かりました', romaji:'tasukarimashita', korean:'도움이 됐어요' },
  { id:'v3wrap_03', japanese:'ありがとうございます', romaji:'arigatou gozaimasu', korean:'고마워요' },
  { id:'v3wrap_04', japanese:'また来ます', romaji:'mata kimasu', korean:'또 올게요' },
  { id:'v3wrap_05', japanese:'楽しかったです', romaji:'tanoshikatta desu', korean:'즐거웠어요' },
  { id:'v3wrap_06', japanese:'気をつけてください', romaji:'ki wo tsukete kudasai', korean:'조심하세요' },
  { id:'v3wrap_07', japanese:'お気をつけて', romaji:'oki wo tsukete', korean:'조심히 가세요' },
  { id:'v3wrap_08', japanese:'こちらこそ', romaji:'kochira koso', korean:'저야말로요' },
  { id:'v3wrap_09', japanese:'失礼します', romaji:'shitsurei shimasu', korean:'실례하겠습니다' },
  { id:'v3wrap_10', japanese:'では、また', romaji:'dewa, mata', korean:'그럼 또 봐요' },
];

// ── 모듈 전용 단어/한자 카드 (STAGE 주제 한정) ──────────────────
const V3_AIRPORT_WORD_CARDS = [
  { id:'v3airw_01', japanese:'空港(くうこう)', romaji:'kuukou', korean:'공항' },
  { id:'v3airw_02', japanese:'飛行機(ひこうき)', romaji:'hikouki', korean:'비행기' },
  { id:'v3airw_03', japanese:'搭乗券(とうじょうけん)', romaji:'toujouken', korean:'탑승권' },
  { id:'v3airw_04', japanese:'荷物(にもつ)', romaji:'nimotsu', korean:'짐' },
  { id:'v3airw_05', japanese:'預(あず)ける', romaji:'azukeru', korean:'맡기다' },
  { id:'v3airw_06', japanese:'窓側(まどがわ)', romaji:'madogawa', korean:'창가 쪽' },
  { id:'v3airw_07', japanese:'通路側(つうろがわ)', romaji:'tsuurogawa', korean:'통로 쪽' },
  { id:'v3airw_08', japanese:'搭乗口(とうじょうぐち)', romaji:'toujouguchi', korean:'탑승구' },
  { id:'v3airw_09', japanese:'出発(しゅっぱつ)', romaji:'shuppatsu', korean:'출발' },
  { id:'v3airw_10', japanese:'到着(とうちゃく)', romaji:'touchaku', korean:'도착' },
];

const V3_IMMIGRATION_WORD_CARDS = [
  { id:'v3immw_01', japanese:'入国審査(にゅうこくしんさ)', romaji:'nyuukoku shinsa', korean:'입국 심사' },
  { id:'v3immw_02', japanese:'目的(もくてき)', romaji:'mokuteki', korean:'목적' },
  { id:'v3immw_03', japanese:'観光(かんこう)', romaji:'kankou', korean:'관광' },
  { id:'v3immw_04', japanese:'旅行(りょこう)', romaji:'ryokou', korean:'여행' },
  { id:'v3immw_05', japanese:'滞在(たいざい)', romaji:'taizai', korean:'체류' },
  { id:'v3immw_06', japanese:'期間(きかん)', romaji:'kikan', korean:'기간' },
  { id:'v3immw_07', japanese:'パスポート', romaji:'pasupooto', korean:'여권' },
  { id:'v3immw_08', japanese:'指紋(しもん)', romaji:'shimon', korean:'지문' },
  { id:'v3immw_09', japanese:'帰国(きこく)', romaji:'kikoku', korean:'귀국' },
  { id:'v3immw_10', japanese:'滞在先(たいざいさき)', romaji:'taizaisaki', korean:'머무는 곳' },
];

const V3_AIRPLANE_WORD_CARDS = [
  { id:'v3plw_01', japanese:'機内(きない)', romaji:'kinai', korean:'기내' },
  { id:'v3plw_02', japanese:'毛布(もうふ)', romaji:'moufu', korean:'담요' },
  { id:'v3plw_03', japanese:'水(みず)', romaji:'mizu', korean:'물' },
  { id:'v3plw_04', japanese:'お茶(ちゃ)', romaji:'ocha', korean:'차' },
  { id:'v3plw_05', japanese:'枕(まくら)', romaji:'makura', korean:'베개' },
  { id:'v3plw_06', japanese:'食事(しょくじ)', romaji:'shokuji', korean:'식사' },
  { id:'v3plw_07', japanese:'座席(ざせき)', romaji:'zaseki', korean:'좌석' },
  { id:'v3plw_08', japanese:'通路(つうろ)', romaji:'tsuuro', korean:'통로' },
  { id:'v3plw_09', japanese:'トイレ', romaji:'toire', korean:'화장실' },
  { id:'v3plw_10', japanese:'イヤホン', romaji:'iyahon', korean:'이어폰' },
];

/* ── Stage 5 모듈별 단어·한자 카드 (전철·버스·택시) ── */
const V3_TRANSPORT_WORD_CARDS = [
  { id:'v3trw_01', japanese:'駅(えき)', romaji:'eki', korean:'역' },
  { id:'v3trw_02', japanese:'電車(でんしゃ)', romaji:'densha', korean:'전철' },
  { id:'v3trw_03', japanese:'改札(かいさつ)', romaji:'kaisatsu', korean:'개찰구' },
  { id:'v3trw_04', japanese:'切符(きっぷ)', romaji:'kippu', korean:'표' },
  { id:'v3trw_05', japanese:'乗(の)り換(か)え', romaji:'norikae', korean:'환승' },
  { id:'v3trw_06', japanese:'路線(ろせん)', romaji:'rosen', korean:'노선' },
  { id:'v3trw_07', japanese:'出口(でぐち)', romaji:'deguchi', korean:'출구' },
  { id:'v3trw_08', japanese:'番線(ばんせん)', romaji:'bansen', korean:'~번 승강장' },
  { id:'v3trw_09', japanese:'各駅(かくえき)', romaji:'kakueki', korean:'각역(완행)' },
  { id:'v3trw_10', japanese:'急行(きゅうこう)', romaji:'kyuukou', korean:'급행' },
];

const V3_BUS_WORD_CARDS = [
  { id:'v3bsw_01', japanese:'バス', romaji:'basu', korean:'버스' },
  { id:'v3bsw_02', japanese:'停留所(ていりゅうじょ)', romaji:'teiryuujo', korean:'정류장' },
  { id:'v3bsw_03', japanese:'整理券(せいりけん)', romaji:'seiriken', korean:'정리권(승차권)' },
  { id:'v3bsw_04', japanese:'運賃(うんちん)', romaji:'unchin', korean:'운임' },
  { id:'v3bsw_05', japanese:'両替(りょうがえ)', romaji:'ryougae', korean:'잔돈 교환' },
  { id:'v3bsw_06', japanese:'後払(あとばら)い', romaji:'atobarai', korean:'후불' },
  { id:'v3bsw_07', japanese:'行(い)き先(さき)', romaji:'ikisaki', korean:'행선지' },
  { id:'v3bsw_08', japanese:'番号(ばんごう)', romaji:'bangou', korean:'번호' },
  { id:'v3bsw_09', japanese:'次(つぎ)', romaji:'tsugi', korean:'다음' },
  { id:'v3bsw_10', japanese:'降(お)りる', romaji:'oriru', korean:'내리다' },
];

const V3_TAXI_WORD_CARDS = [
  { id:'v3txw_01', japanese:'タクシー', romaji:'takushii', korean:'택시' },
  { id:'v3txw_02', japanese:'運転手(うんてんしゅ)', romaji:'untenshu', korean:'운전기사' },
  { id:'v3txw_03', japanese:'住所(じゅうしょ)', romaji:'juusho', korean:'주소' },
  { id:'v3txw_04', japanese:'目的地(もくてきち)', romaji:'mokutekichi', korean:'목적지' },
  { id:'v3txw_05', japanese:'料金(りょうきん)', romaji:'ryoukin', korean:'요금' },
  { id:'v3txw_06', japanese:'領収書(りょうしゅうしょ)', romaji:'ryoushuusho', korean:'영수증' },
  { id:'v3txw_07', japanese:'信号(しんごう)', romaji:'shingou', korean:'신호등' },
  { id:'v3txw_08', japanese:'現金(げんきん)', romaji:'genkin', korean:'현금' },
  { id:'v3txw_09', japanese:'荷物(にもつ)', romaji:'nimotsu', korean:'짐' },
  { id:'v3txw_10', japanese:'自動(じどう)ドア', romaji:'jidou doa', korean:'자동문' },
];

const MODULES = [
  {
    id: 'v3_kana_map',
    stageId: 1,
    accessTier: 'free',
    name: '오십음도 게임판',
    nameJp: '五十音図',
    icon: '五',
    iconIsText: true,
    desc: '가로는 입 모양, 세로는 자음 가족. 표를 게임판처럼 읽는 첫 강의',
    xp: 180,
    steps: [
      { type: 'lecture', title: '일본어 글자는 왜 50음도일까', lectureKey: 'v3_kana_map' },
      { type: 'kana_chart', title: '가로 5모음·세로 자음 가족 보기' },
      { type: 'kana_learn', title: 'あいうえお 리듬 카드', kanaType: 'hiragana', chars: ['あ','い','う','え','お'], customLabel: '입 모양 5개' },
      { type: 'kana_quiz', title: '모음 리듬 퀴즈', kanaType: 'hiragana', chars: ['あ','い','う','え','お'] },
      { type: 'kana_learn', title: 'かさたなは 첫 줄 찾기', kanaType: 'hiragana', chars: ['か','さ','た','な','は'], customLabel: '자음 가족 입구' },
      { type: 'lecture', title: '표를 외우지 말고 길을 찾기', lectureKey: 'v3_kana_map_tip' },
    ],
    roleplay: {
      id: 'rp_kana_map_practice',
      name: '오십음도 표 읽기',
      nameJp: '五十音図を読む',
      icon: '五',
      desc: 'あ행부터 か행까지 소리 위치를 묻고 답하기',
      dialogueKey: 'kana_map_practice'
    }
  },

  {
    id: 'v3_first_greetings',
    stageId: 3,
    accessTier: 'free',
    name: '첫 인사와 말 걸기',
    nameJp: '最初の挨拶',
    icon: '',
    desc: '사람을 부르고, 짧게 부탁하고, 고맙게 마무리하는 첫 대화',
    xp: 220,
    unlockAfter: ['v3_answer_engine'],
    steps: [
      { type: 'lecture', title: '여행 첫날 말문 트기', lectureKey: 'v3_first_greetings' },
      { type: 'vocab_learn', title: '인사 필수 단어', categoryId: 'basic_words', limit: 10 },
      { type: 'vocab_learn', title: '맞장구·반응 단어', categoryId: 'w1_reactions', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '인사·기초 회화 문장', categoryId: 'first_expressions', limit: 10, mode: 'sentence' },
      { type: 'dialogue_study', title: '사진 부탁 대화 미리보기', dialogueKey: 'first_photo_greeting' },
      { type: 'vocab_quiz', title: '첫 반응 퀴즈', categoryIds: ['basic_words', 'first_expressions', 'w1_reactions'], limit: 19 },
      { type: 'lecture', title: '인사는 세트로 외우기', lectureKey: 'v3_first_greetings_tip' },
    ],
    roleplay: {
      id: 'rp_first_photo_greeting',
      name: '사진 부탁하며 말 걸기',
      nameJp: '写真をお願いする',
      icon: '',
      desc: '저기요, 감사합니다, 일본은 처음이에요',
      dialogueKey: 'first_photo_greeting'
    }
  },
  {
    id: 'v3_survival_objects',
    stageId: 3,
    accessTier: 'free',
    name: '기본 물건·장소',
    nameJp: '基本の物と場所',
    icon: '',
    desc: '물, 화장실, 역, 호텔, 카드처럼 여행에서 손으로 가리킬 기본 단어',
    xp: 260,
    unlockAfter: ['v3_kana_map'],
    steps: [
      { type: 'lecture', title: '문장 전에 단어 재료부터', lectureKey: 'v3_survival_objects' },
      { type: 'vocab_learn', title: '문장 전 필수 재료 12개', items: V3_PRE_SENTENCE_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '기초 사물·장소 단어', categoryIds: ['pronouns_thing','place_transport','food_nouns'], limit: 19, mode: 'word' },
      { type: 'dialogue_study', title: '모르는 말 버티기 미리보기', dialogueKey: 'pre_sentence_survival' },
      { type: 'vocab_quiz', title: '문장 전 재료 퀴즈', items: V3_PRE_SENTENCE_CARDS },
      { type: 'lecture', title: '모르면 これ와 ここ로 버티기', lectureKey: 'v3_survival_objects_tip' },
    ],
    roleplay: {
      id: 'rp_pre_sentence_survival',
      name: '단어만으로 버티기',
      nameJp: '単語で伝える',
      icon: '',
      desc: '이거, 여기, 물, 괜찮아요로 첫 상황 버티기',
      dialogueKey: 'pre_sentence_survival'
    }
  },
  {
    id: 'v3_pronouns_places',
    stageId: 3,
    accessTier: 'free',
    name: '이것·저것·여기·저기',
    nameJp: 'これ・そこ・どこ',
    icon: '',
    desc: '사람, 사물, 장소 대명사로 가리키고 묻기',
    xp: 260,
    unlockAfter: ['v3_particle_basics'],
    steps: [
      { type: 'lecture', title: '대명사는 거리 감각', lectureKey: 'v3_pronouns_places' },
      { type: 'vocab_learn', title: '사물 대명사', categoryId: 'pronouns_thing' },
      { type: 'vocab_learn', title: '장소 대명사', categoryId: 'pronouns_place' },
      { type: 'vocab_learn', title: '사람 대명사', categoryId: 'pronouns_personal' },
      { type: 'dialogue_study', title: '손가락으로 가리키기 미리보기', dialogueKey: 'pointing_pronouns' },
      { type: 'vocab_quiz', title: '대명사 퀴즈', categoryIds: ['pronouns_thing','pronouns_place','pronouns_personal'], limit: 19 },
      { type: 'lecture', title: 'こそあど는 거리감이다', lectureKey: 'v3_pronouns_places_tip' },
    ],
    roleplay: {
      id: 'rp_pointing_pronouns',
      name: '손가락으로 가리키기',
      nameJp: 'これ・それ・あれ',
      icon: '',
      desc: '이것, 저것, 여기, 저기를 실제 가게에서 쓰기',
      dialogueKey: 'pointing_pronouns'
    }
  },
  {
    id: 'v3_numbers_time',
    stageId: 3,
    accessTier: 'free',
    name: '숫자·시간·요일',
    nameJp: '数字・時間・曜日',
    icon: '',
    desc: '가격, 수량, 시간, 요일, 날짜를 알아듣기',
    xp: 320,
    unlockAfter: ['v3_directions_body'],
    steps: [
      { type: 'lecture', title: '숫자는 여행의 안전장치', lectureKey: 'v3_numbers_time' },
      { type: 'vocab_learn', title: '숫자 기본', categoryId: 'numbers_basic', limit: 13 },
      { type: 'vocab_learn', title: '가격·수량 표현', categoryId: 'numbers_applied', limit: 10 },
      { type: 'vocab_learn', title: '날짜·시각·요일', categoryIds: ['date_basic','time_clock','days_of_week','num_dates'], limit: 19 },
      { type: 'dialogue_study', title: '가격과 시간 묻기 미리보기', dialogueKey: 'numbers_time_check' },
      { type: 'vocab_quiz', title: '숫자·시간·요일 퀴즈', categoryIds: ['numbers_basic','numbers_applied','date_basic','time_clock','days_of_week','num_dates'], limit: 19 },
      { type: 'lecture', title: '숫자는 귀로 먼저 잡기', lectureKey: 'v3_numbers_time_tip' },
    ],
    roleplay: {
      id: 'rp_numbers_time_check',
      name: '가격과 시간 확인',
      nameJp: '値段と時間',
      icon: '',
      desc: '얼마예요, 몇 시부터예요, 두 장 부탁해요',
      dialogueKey: 'numbers_time_check'
    }
  },
  {
    id: 'v3_money_counting',
    stageId: 3,
    accessTier: 'free',
    name: '돈·수량·날짜',
    nameJp: 'お金・数・日付',
    icon: '',
    desc: '엔화 가격, 몇 개, 며칠, 몇 명처럼 여행 결제와 예약에 필요한 숫자 확장',
    xp: 300,
    unlockAfter: ['v3_numbers_time'],
    steps: [
      { type: 'lecture', title: '숫자는 돈과 예약에서 완성된다', lectureKey: 'v3_money_counting' },
      { type: 'vocab_learn', title: '가격·수량 표현', categoryId: 'numbers_applied', limit: 14 },
      { type: 'vocab_learn', title: '날짜·요일·기간', categoryIds: ['date_basic','days_of_week','num_dates'], limit: 19 },
      { type: 'vocab_quiz', title: '돈·수량·날짜 퀴즈', categoryIds: ['numbers_basic','numbers_applied','date_basic','days_of_week','num_dates'], limit: 19 },
      { type: 'lecture', title: '가격은 엔화 단위로 외우기', lectureKey: 'v3_money_counting_tip' },
    ],
    roleplay: {
      id: 'rp_money_counting_check',
      name: '돈과 수량 확인',
      nameJp: 'お金と数',
      icon: '',
      desc: '몇 개, 며칠, 몇 명인지 결제 전에 확인하기',
      dialogueKey: 'money_counting_check'
    }
  },
  {
    id: 'v3_directions_body',
    stageId: 3,
    accessTier: 'free',
    name: '방향·장소·신체부위',
    nameJp: '方向・場所・体',
    icon: '',
    desc: '오른쪽/왼쪽, 가까워요/멀어요, 머리/배/다리처럼 꼭 필요한 기본어',
    xp: 300,
    unlockAfter: ['v3_pronouns_places'],
    steps: [
      { type: 'lecture', title: '방향과 몸은 직접 가리키기', lectureKey: 'v3_directions_body' },
      { type: 'vocab_learn', title: '길 찾기·방향', categoryId: 'directions', limit: 14 },
      { type: 'vocab_learn', title: '장소·교통 기본어', categoryId: 'place_transport', limit: 14 },
      { type: 'vocab_learn', title: '신체 부위', categoryId: 'body_parts', limit: 14 },
      { type: 'dialogue_study', title: '방향과 몸으로 설명하기 미리보기', dialogueKey: 'direction_body_check' },
      { type: 'vocab_quiz', title: '방향·장소·몸 퀴즈', categoryIds: ['directions','place_transport','body_parts'], limit: 19 },
      { type: 'lecture', title: '방향과 몸은 손으로 외우기', lectureKey: 'v3_directions_body_tip' },
    ],
    roleplay: {
      id: 'rp_direction_body_check',
      name: '방향과 몸 상태 말하기',
      nameJp: '方向と体',
      icon: '',
      desc: '오른쪽, 왼쪽, 배가 아파요를 안내소에서 쓰기',
      dialogueKey: 'direction_body_check'
    }
  },

  {
    id: 'v3_particle_basics',
    stageId: 3,
    accessTier: 'free',
    name: '조사 감각',
    nameJp: '助詞の感覚',
    icon: '',
    desc: 'は, を, に, で, へ를 외우기보다 여행 문장 안에서 위치로 익히기',
    xp: 320,
    unlockAfter: ['v3_survival_objects'],
    steps: [
      { type: 'lecture', title: '문장 전에 꼭 알아야 할 뼈대', lectureKey: 'v3_particle_basics' },
      { type: 'vocab_learn', title: '문장 구조 공식 10개', items: V3_BASIC_STRUCTURE_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '자기소개와 は/です', categoryId: 'self_intro', limit: 12 },
      { type: 'dialogue_study', title: '짧은 구조 응용 미리보기', dialogueKey: 'basic_structure_check' },
      { type: 'vocab_quiz', title: '문장 구조 퀴즈', items: V3_BASIC_STRUCTURE_CARDS },
      { type: 'lecture', title: '조사부터 완벽할 필요 없다', lectureKey: 'v3_particle_basics_tip' },
    ],
    roleplay: {
      id: 'rp_basic_structure_check',
      name: '짧은 문장 뼈대 쓰기',
      nameJp: '短い文を作る',
      icon: '',
      desc: 'は, を, に를 넣어 역 위치와 목적지를 말하기',
      dialogueKey: 'basic_structure_check'
    }
  },
  {
    id: 'v3_tense_matrix',
    stageId: 3,
    accessTier: 'free',
    name: '현재·부정·과거 4칸',
    nameJp: '現在・否定・過去',
    icon: '四',
    iconIsText: true,
    desc: '명사, 형용사, 동사를 현재·현재부정·과거·과거부정 네 칸으로 바꾸는 초급 핵심',
    xp: 320,
    unlockAfter: ['v3_particle_basics'],
    steps: [
      { type: 'lecture', title: '일본어 문장은 4칸으로 바뀐다', lectureKey: 'v3_tense_matrix' },
      { type: 'vocab_learn', title: '명사·형용사·동사 4칸 카드', items: V3_TENSE_MATRIX_CARDS, mode: 'sentence' },
      { type: 'dialogue_study', title: '먹었어요·안 갔어요 미리보기', dialogueKey: 'tense_matrix_check' },
      { type: 'vocab_quiz', title: '현재·부정·과거 변환 퀴즈', items: V3_TENSE_MATRIX_CARDS },
      { type: 'lecture', title: '어미만 바꾸면 말이 늘어난다', lectureKey: 'v3_tense_matrix_tip' },
    ],
    roleplay: {
      id: 'rp_tense_matrix_check',
      name: '먹었어요·안 갔어요',
      nameJp: '食べました・行きませんでした',
      icon: '四',
      desc: '여행 일정과 식사 경험을 현재, 부정, 과거로 말하기',
      dialogueKey: 'tense_matrix_check'
    }
  },
  {
    id: 'v3_question_engine',
    stageId: 3,
    accessTier: 'free',
    name: '질문하는 법',
    nameJp: '質問の作り方',
    icon: '',
    desc: '뭐예요, 어디예요, 얼마예요, 되나요, 있나요',
    xp: 300,
    unlockAfter: ['v3_tense_matrix'],
    steps: [
      { type: 'lecture', title: '질문은 끝에 か', lectureKey: 'v3_question_engine' },
      { type: 'vocab_learn', title: '기초 질문 패턴', categoryId: 'basic_questions', limit: 12 },
      { type: 'vocab_learn', title: '길 찾기 질문', categoryId: 'directions', limit: 10 },
      { type: 'dialogue_study', title: '못 알아들었을 때 미리보기', dialogueKey: 'ask_again_help' },
      { type: 'vocab_quiz', title: '질문 패턴 퀴즈', categoryIds: ['basic_questions','directions'], limit: 19 },
      { type: 'lecture', title: '질문은 끝을 올리고 か를 붙이기', lectureKey: 'v3_question_engine_tip' },
    ],
    roleplay: {
      id: 'rp_ask_again_help',
      name: '못 알아들었을 때',
      nameJp: '聞き返す',
      icon: '',
      desc: '천천히 말해 주세요, 조금 알아요',
      dialogueKey: 'ask_again_help'
    }
  },
  {
    id: 'v3_answer_engine',
    stageId: 3,
    accessTier: 'free',
    name: '대답하는 법',
    nameJp: '返事の作り方',
    icon: '',
    desc: '한국인이에요, 여행으로 왔어요, 괜찮아요, 잘 모르겠어요',
    xp: 300,
    unlockAfter: ['v3_question_engine'],
    steps: [
      { type: 'lecture', title: '짧게 답해도 대화는 이어진다', lectureKey: 'v3_answer_engine' },
      { type: 'vocab_learn', title: '자기소개 핵심 답변', categoryId: 'self_intro', limit: 10 },
      { type: 'vocab_learn', title: '리액션과 대답', categoryId: 'w1_reactions', limit: 10 },
      { type: 'dialogue_study', title: '어디서 왔어요 미리보기', dialogueKey: 'first_origin_chat' },
      { type: 'vocab_quiz', title: '대답 패턴 퀴즈', categoryIds: ['self_intro','w1_reactions'], limit: 19 },
      { type: 'lecture', title: '대답은 짧아도 괜찮다', lectureKey: 'v3_answer_engine_tip' },
    ],
    roleplay: {
      id: 'rp_first_origin_chat',
      name: '어디서 왔어요?',
      nameJp: 'どこから来ましたか',
      icon: '',
      desc: '한국에서 왔어요, 감사합니다',
      dialogueKey: 'first_origin_chat'
    }
  },
  {
    id: 'v3_reaction_shadowing',
    stageId: 3,
    accessTier: 'free',
    name: '리액션·쉐도잉',
    nameJp: 'リアクション練習',
    icon: '',
    desc: '네, 괜찮아요, 잠깐만요, 다시 부탁해요를 듣고 바로 따라 말하기',
    xp: 260,
    unlockAfter: ['v3_first_greetings'],
    steps: [
      { type: 'lecture', title: '회화는 리액션으로 이어진다', lectureKey: 'v3_reaction_shadowing' },
      { type: 'vocab_learn', title: '리액션 단어', categoryId: 'w1_reactions', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '리액션 문장', categoryId: 'first_expressions', limit: 10, mode: 'sentence' },
      { type: 'vocab_learn', title: '다시 묻고 확인하기', categoryIds: ['basic_questions','first_expressions'], limit: 12 },
      { type: 'vocab_quiz', title: '리액션 즉답 퀴즈', categoryIds: ['w1_reactions','first_expressions'], limit: 19 },
      { type: 'lecture', title: '리액션은 통째로 자동화하기', lectureKey: 'v3_reaction_shadowing_tip' },
    ],
    roleplay: {
      id: 'rp_reaction_shadowing',
      name: '리액션으로 이어가기',
      nameJp: 'リアクション',
      icon: '',
      desc: '네, 잠깐만요, 다시 부탁해요를 바로 말하기',
      dialogueKey: 'reaction_shadowing'
    }
  },

  {
    id: 'v3_airport',
    stageId: 4,
    accessTier: 'free',
    name: '공항과 입국',
    nameJp: '空港',
    icon: '',
    desc: '여권, 좌석, 수하물, 탑승 시간을 알아듣기',
    xp: 320,
    unlockAfter: ['v3_reaction_shadowing'],
    steps: [
      { type: 'lecture', title: '공항에서는 짧게 답하기', lectureKey: 'v3_airport' },
      { type: 'vocab_learn', title: '공항 단어·한자', items: V3_AIRPORT_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '체크인 질문·답변 문장', items: V3_AIRPORT_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '공항 통합 퀴즈', items: V3_AIRPORT_WORD_CARDS.concat(V3_AIRPORT_QA_CARDS) },
    ],
    roleplay: { id: 'rp_airport_checkin', name: '공항 체크인', nameJp: 'チェックイン', icon: '', desc: '좌석과 수하물 확인하기', dialogueKey: 'airport_checkin' }
  },
  {
    id: 'v3_immigration',
    stageId: 4,
    accessTier: 'free',
    name: '입국 심사',
    nameJp: '入国審査',
    icon: '',
    desc: '목적, 체류 기간, 숙소를 짧게 답하기',
    xp: 300,
    unlockAfter: ['v3_airport'],
    steps: [
      { type: 'lecture', title: '입국 심사는 단답이 정답', lectureKey: 'v3_immigration' },
      { type: 'vocab_learn', title: '입국 심사 단어·한자', items: V3_IMMIGRATION_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '입국 질문·답변 문장', items: V3_IMMIGRATION_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '입국 심사 통합 퀴즈', items: V3_IMMIGRATION_WORD_CARDS.concat(V3_IMMIGRATION_QA_CARDS) },
    ],
    roleplay: { id: 'rp_immigration_short', name: '입국 심사 답하기', nameJp: '入国審査', icon: '', desc: '여행이에요, 3일이에요, 호텔에 묵어요', dialogueKey: 'immigration_short' }
  },
  {
    id: 'v3_airplane_request',
    stageId: 4,
    accessTier: 'free',
    name: '기내 요청',
    nameJp: '機内でお願い',
    icon: '',
    desc: '물, 담요, 자리, 입국 카드처럼 비행기 안에서 부탁하기',
    xp: 280,
    unlockAfter: ['v3_immigration'],
    steps: [
      { type: 'lecture', title: '기내 부탁은 단어 + ください', lectureKey: 'v3_airplane_request' },
      { type: 'vocab_learn', title: '기내 단어·한자', items: V3_AIRPLANE_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '기내 요청 질문·답변 문장', items: V3_AIRPLANE_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '기내 요청 통합 퀴즈', items: V3_AIRPLANE_WORD_CARDS.concat(V3_AIRPLANE_QA_CARDS) },
    ],
    roleplay: { id: 'rp_airplane_request', name: '기내에서 부탁하기', nameJp: '機内でお願い', icon: '', desc: '물 주세요, 담요 있어요?', dialogueKey: 'airplane_request' }
  },
  {
    id: 'v3_transport',
    stageId: 5,
    accessTier: 'free',
    name: '전철·길 찾기',
    nameJp: '電車・道案内',
    icon: '',
    desc: '역, 환승, 목적지, 몇 분 걸리는지 묻기',
    xp: 340,
    unlockAfter: ['v3_airplane_request'],
    steps: [
      { type: 'lecture', title: '역에서 살아남기', lectureKey: 'v3_transport' },
      { type: 'vocab_learn', title: '전철·역 단어·한자', items: V3_TRANSPORT_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '역·환승 질문·답변 문장', items: V3_STATION_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '전철·길 찾기 통합 퀴즈', items: V3_TRANSPORT_WORD_CARDS.concat(V3_STATION_QA_CARDS) },
    ],
    roleplay: { id: 'rp_station_direction', name: '목적지까지 가기', nameJp: '目的地まで', icon: '', desc: '어디까지 가 주세요, 얼마나 걸려요', dialogueKey: 'station_direction' }
  },
  {
    id: 'v3_bus_ride',
    stageId: 5,
    accessTier: 'free',
    name: '버스 타기',
    nameJp: 'バスに乗る',
    icon: '',
    desc: '목적지 확인, 요금, 내릴 곳을 묻기',
    xp: 300,
    unlockAfter: ['v3_transport'],
    steps: [
      { type: 'lecture', title: '버스는 타기 전에 한 문장', lectureKey: 'v3_bus_ride' },
      { type: 'vocab_learn', title: '버스 단어·한자', items: V3_BUS_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '버스 질문·답변 문장', items: V3_BUS_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '버스 통합 퀴즈', items: V3_BUS_WORD_CARDS.concat(V3_BUS_QA_CARDS) },
    ],
    roleplay: { id: 'rp_bus_ride', name: '버스 목적지 확인', nameJp: 'バスの行き先', icon: '', desc: '이 버스가 역에 가나요?', dialogueKey: 'bus_ride' }
  },
  {
    id: 'v3_taxi_ride',
    stageId: 5,
    accessTier: 'free',
    name: '택시 타기',
    nameJp: 'タクシー',
    icon: '',
    desc: '호텔까지, 여기서 세워 주세요, 카드 되나요',
    xp: 300,
    unlockAfter: ['v3_bus_ride'],
    steps: [
      { type: 'lecture', title: '택시는 첫 한 줄이 90%', lectureKey: 'v3_taxi_ride' },
      { type: 'vocab_learn', title: '택시 단어·한자', items: V3_TAXI_WORD_CARDS, mode: 'word' },
      { type: 'vocab_learn', title: '택시 질문·답변 문장', items: V3_TAXI_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_quiz', title: '택시 통합 퀴즈', items: V3_TAXI_WORD_CARDS.concat(V3_TAXI_QA_CARDS) },
    ],
    roleplay: { id: 'rp_taxi_ride', name: '택시로 호텔 가기', nameJp: 'タクシーでホテルへ', icon: '', desc: '호텔까지 부탁해요, 여기서 괜찮아요', dialogueKey: 'taxi_ride' }
  },
  {
    id: 'v3_konbini',
    stageId: 6,
    accessTier: 'free',
    name: '편의점',
    nameJp: 'コンビニ',
    icon: '',
    desc: '도시락 데우기, 봉투, 결제, 교통카드',
    xp: 300,
    unlockAfter: ['v3_taxi_ride'],
    steps: [
      { type: 'lecture', title: '편의점은 선택지만 들으면 된다', lectureKey: 'v3_konbini' },
      { type: 'vocab_learn', title: '편의점·결제 표현', categoryId: 'shopping_phrases', limit: 12 },
      { type: 'vocab_learn', title: '도시락·봉투·결제 카드', items: V3_KONBINI_QA_CARDS, mode: 'sentence' },
      { type: 'dialogue_study', title: '편의점 대화 미리보기', dialogueKey: 'konbini_bento' },
      { type: 'vocab_quiz', title: '편의점 즉답 퀴즈', items: V3_KONBINI_QA_CARDS },
      { type: 'vocab_quiz', title: '편의점 표현 퀴즈', categoryId: 'shopping_phrases', limit: 16 },
    ],
    roleplay: { id: 'rp_konbini_bento', name: '도시락 데우기', nameJp: 'お弁当を温める', icon: '', desc: '데워 주세요, 봉투 필요 없어요', dialogueKey: 'konbini_bento' }
  },
  {
    id: 'v3_cafe_breakfast',
    stageId: 6,
    accessTier: 'free',
    name: '카페·조식',
    nameJp: 'カフェ・朝食',
    icon: '',
    desc: '커피 주문, 매장/포장, 조식 시간과 좌석 묻기',
    xp: 300,
    unlockAfter: ['v3_konbini'],
    steps: [
      { type: 'lecture', title: '카페는 메뉴 + ください', lectureKey: 'v3_cafe_breakfast' },
      { type: 'vocab_learn', title: '조식·카페 질문 카드', items: V3_CAFE_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '음식·식당 어휘', categoryId: 'food_restaurant', limit: 10, mode: 'word' },
      { type: 'vocab_learn', title: '주문·조식 문장', categoryIds: ['food_ordering','hotel_phrases'], limit: 16, mode: 'sentence' },
      { type: 'dialogue_study', title: '카페·조식 미리보기', dialogueKey: 'cafe_breakfast' },
      { type: 'vocab_quiz', title: '카페·조식 즉답 퀴즈', items: V3_CAFE_QA_CARDS },
      { type: 'vocab_quiz', title: '카페·조식 퀴즈', categoryIds: ['food_ordering','food_restaurant','hotel_phrases'], limit: 24 },
    ],
    roleplay: { id: 'rp_cafe_breakfast', name: '카페에서 아침 주문', nameJp: 'カフェで朝食', icon: '', desc: '아이스커피와 토스트를 주문하기', dialogueKey: 'cafe_breakfast' }
  },
  {
    id: 'v3_restaurant',
    stageId: 6,
    accessTier: 'free',
    name: '식당 주문',
    nameJp: 'レストラン',
    icon: '',
    desc: '한 명이에요, 이거 주세요, 계산 부탁해요',
    xp: 340,
    unlockAfter: ['v3_cafe_breakfast'],
    steps: [
      { type: 'lecture', title: '주세요와 부탁합니다', lectureKey: 'v3_restaurant' },
      { type: 'vocab_learn', title: '식당 주문 표현', categoryId: 'food_ordering', limit: 12 },
      { type: 'vocab_learn', title: '음식·식당 어휘', categoryId: 'food_restaurant', limit: 12 },
      { type: 'vocab_quiz', title: '식당 주문 퀴즈', categoryIds: ['food_ordering','food_restaurant'], limit: 24 },
      { type: 'dialogue_study', title: '혼밥 주문 미리보기', dialogueKey: 'restaurant_solo' },
    ],
    roleplay: { id: 'rp_restaurant_solo', name: '혼자 식당 주문', nameJp: '一人で注文', icon: '', desc: '입장부터 계산까지 한 상황만', dialogueKey: 'restaurant_solo' }
  },
  {
    id: 'v3_izakaya',
    stageId: 6,
    accessTier: 'free',
    name: '술집·이자카야',
    nameJp: '居酒屋',
    icon: '',
    desc: '몇 명인지, 첫 잔, 추천, 추가 주문, 계산',
    xp: 320,
    unlockAfter: ['v3_restaurant'],
    steps: [
      { type: 'lecture', title: '이자카야는 순서가 정해져 있다', lectureKey: 'v3_izakaya' },
      { type: 'vocab_learn', title: '첫 잔·추천 즉답 카드', items: V3_IZAKAYA_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '음식·식당 단어', categoryId: 'food_restaurant', limit: 10, mode: 'word' },
      { type: 'vocab_learn', title: '주문 문장', categoryId: 'food_ordering', limit: 10, mode: 'sentence' },
      { type: 'dialogue_study', title: '이자카야 미리보기', dialogueKey: 'izakaya_order' },
      { type: 'vocab_quiz', title: '이자카야 즉답 퀴즈', items: V3_IZAKAYA_QA_CARDS },
      { type: 'vocab_quiz', title: '술집 표현 퀴즈', categoryIds: ['food_ordering','food_restaurant'], limit: 24 },
    ],
    roleplay: { id: 'rp_izakaya_order', name: '이자카야 주문', nameJp: '居酒屋で注文', icon: '', desc: '맥주와 추천 메뉴 주문하기', dialogueKey: 'izakaya_order' }
  },
  {
    id: 'v3_shopping',
    stageId: 7,
    accessTier: 'free',
    name: '쇼핑·사이즈',
    nameJp: '買い物',
    icon: '',
    desc: '그냥 볼게요, 입어봐도 돼요, 얼마예요',
    xp: 320,
    unlockAfter: ['v3_izakaya'],
    steps: [
      { type: 'lecture', title: '쇼핑은 세 문장으로 시작', lectureKey: 'v3_shopping' },
      { type: 'vocab_learn', title: '사이즈·입어보기 즉답 카드', items: V3_SHOPPING_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '쇼핑 표현', categoryId: 'shopping_phrases', limit: 14 },
      { type: 'dialogue_study', title: '옷가게 미리보기', dialogueKey: 'clothes_size' },
      { type: 'vocab_quiz', title: '사이즈 즉답 퀴즈', items: V3_SHOPPING_QA_CARDS },
      { type: 'vocab_quiz', title: '쇼핑 퀴즈', categoryId: 'shopping_phrases', limit: 18 },
    ],
    roleplay: { id: 'rp_clothes_size', name: '사이즈 묻기', nameJp: 'サイズを聞く', icon: '', desc: '입어보기, 사이즈, 가격 묻기', dialogueKey: 'clothes_size' }
  },
  {
    id: 'v3_store_payment',
    stageId: 7,
    accessTier: 'free',
    name: '상점·결제',
    nameJp: 'お店と会計',
    icon: '',
    desc: '카드, 현금, 봉투, 영수증, 면세 가능 여부',
    xp: 300,
    unlockAfter: ['v3_shopping'],
    steps: [
      { type: 'lecture', title: '결제는 한 문장이 표준', lectureKey: 'v3_store_payment' },
      { type: 'vocab_learn', title: '카드·봉투·영수증 즉답 카드', items: V3_PAYMENT_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '결제·면세 표현', categoryId: 'shopping_phrases', limit: 18 },
      { type: 'dialogue_study', title: '상점 결제 미리보기', dialogueKey: 'store_payment' },
      { type: 'vocab_quiz', title: '결제 즉답 퀴즈', items: V3_PAYMENT_QA_CARDS },
      { type: 'vocab_quiz', title: '결제 표현 퀴즈', categoryId: 'shopping_phrases', limit: 22 },
    ],
    roleplay: { id: 'rp_store_payment', name: '상점에서 결제', nameJp: 'お店で会計', icon: '', desc: '카드 되나요, 봉투 필요 없어요', dialogueKey: 'store_payment' }
  },
  {
    id: 'v3_duty_free',
    stageId: 7,
    accessTier: 'free',
    name: '공항 상점·면세',
    nameJp: '免税店',
    icon: '',
    desc: '여권 제시, 선물 추천, 기내 반입 가능 여부',
    xp: 300,
    unlockAfter: ['v3_store_payment'],
    steps: [
      { type: 'lecture', title: '면세는 여권이 시작', lectureKey: 'v3_duty_free' },
      { type: 'vocab_learn', title: '선물·기내 반입 즉답 카드', items: V3_DUTY_FREE_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '상점·선물 표현', categoryIds: ['shopping_phrases','basic_questions'], limit: 22 },
      { type: 'dialogue_study', title: '면세점 미리보기', dialogueKey: 'duty_free_shop' },
      { type: 'vocab_quiz', title: '면세점 즉답 퀴즈', items: V3_DUTY_FREE_QA_CARDS },
      { type: 'vocab_quiz', title: '면세점 표현 퀴즈', categoryIds: ['shopping_phrases','basic_questions'], limit: 24 },
    ],
    roleplay: { id: 'rp_duty_free_shop', name: '면세점에서 선물 사기', nameJp: '免税店で買い物', icon: '', desc: '추천과 기내 반입 가능 여부 묻기', dialogueKey: 'duty_free_shop' }
  },
  {
    id: 'v3_hotel',
    stageId: 8,
    accessTier: 'free',
    name: '호텔 체크인',
    nameJp: 'ホテル',
    icon: '',
    desc: '체크인, 이름, 여권, 조식, 체크아웃 시간',
    xp: 320,
    unlockAfter: ['v3_duty_free'],
    steps: [
      { type: 'lecture', title: '숙소에서 듣는 말', lectureKey: 'v3_hotel' },
      { type: 'vocab_learn', title: '체크인 즉답 카드', items: V3_HOTEL_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '호텔·숙박 표현', categoryId: 'hotel_phrases', limit: 14 },
      { type: 'dialogue_study', title: '호텔 체크인 미리보기', dialogueKey: 'hotel_checkin' },
      { type: 'vocab_quiz', title: '체크인 즉답 퀴즈', items: V3_HOTEL_QA_CARDS },
      { type: 'vocab_quiz', title: '호텔 표현 퀴즈', categoryId: 'hotel_phrases', limit: 18 },
    ],
    roleplay: { id: 'rp_hotel_checkin', name: '체크인하기', nameJp: 'チェックイン', icon: '', desc: '예약 확인과 기본 질문', dialogueKey: 'hotel_checkin' }
  },
  {
    id: 'v3_hotel_request',
    stageId: 8,
    accessTier: 'free',
    name: '객실 요청',
    nameJp: '部屋のお願い',
    icon: '',
    desc: '수건, 와이파이, 에어컨, 체크아웃 시간 묻기',
    xp: 300,
    unlockAfter: ['v3_hotel'],
    steps: [
      { type: 'lecture', title: '객실 요청은 두 가지 패턴', lectureKey: 'v3_hotel_request' },
      { type: 'vocab_learn', title: '객실 요청 즉답 카드', items: V3_HOTEL_REQUEST_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '객실·시설 표현', categoryId: 'hotel_phrases', limit: 18 },
      { type: 'dialogue_study', title: '객실 요청 미리보기', dialogueKey: 'hotel_request' },
      { type: 'vocab_quiz', title: '객실 요청 즉답 퀴즈', items: V3_HOTEL_REQUEST_QA_CARDS },
      { type: 'vocab_quiz', title: '객실 요청 퀴즈', categoryId: 'hotel_phrases', limit: 22 },
    ],
    roleplay: { id: 'rp_hotel_request', name: '프런트에 요청하기', nameJp: 'フロントにお願い', icon: '', desc: '수건과 와이파이를 부탁하기', dialogueKey: 'hotel_request' }
  },
  {
    id: 'v3_onsen',
    stageId: 8,
    accessTier: 'free',
    name: '온천 이용',
    nameJp: '温泉',
    icon: '',
    desc: '입장, 수건, 문신, 이용 시간, 규칙 묻기',
    xp: 300,
    unlockAfter: ['v3_hotel_request'],
    steps: [
      { type: 'lecture', title: '온천은 첫 5분이 중요', lectureKey: 'v3_onsen' },
      { type: 'vocab_learn', title: '온천 규칙 즉답 카드', items: V3_ONSEN_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '온천·시설 표현', categoryIds: ['hotel_phrases','basic_questions'], limit: 22 },
      { type: 'dialogue_study', title: '온천 이용 미리보기', dialogueKey: 'onsen_rules' },
      { type: 'vocab_quiz', title: '온천 규칙 즉답 퀴즈', items: V3_ONSEN_QA_CARDS },
      { type: 'vocab_quiz', title: '온천 표현 퀴즈', categoryIds: ['hotel_phrases','basic_questions'], limit: 24 },
    ],
    roleplay: { id: 'rp_onsen_rules', name: '온천 규칙 묻기', nameJp: '温泉のルール', icon: '', desc: '수건과 이용 시간을 묻기', dialogueKey: 'onsen_rules' }
  },
  {
    id: 'v3_health',
    stageId: 9,
    accessTier: 'plus',
    name: '아플 때',
    nameJp: '体調が悪い時',
    icon: '',
    desc: '머리, 배, 약국, 병원, 도움 요청',
    xp: 300,
    unlockAfter: ['v3_onsen'],
    steps: [
      { type: 'lecture', title: '아픈 곳부터 말하기', lectureKey: 'v3_health' },
      { type: 'vocab_learn', title: '신체 부위', categoryId: 'body_parts', limit: 12 },
      { type: 'vocab_learn', title: '약국 증상 즉답 카드', items: V3_HEALTH_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '증상·의료 단어', categoryIds: ['health_symptoms','medical_care'], limit: 14, mode: 'word' },
      { type: 'vocab_learn', title: '긴급·도움 문장', categoryId: 'emergency_sos', limit: 8, mode: 'sentence' },
      { type: 'dialogue_study', title: '약국 증상 미리보기', dialogueKey: 'health_help' },
      { type: 'vocab_quiz', title: '약국 즉답 퀴즈', items: V3_HEALTH_QA_CARDS },
      { type: 'vocab_quiz', title: '건강·긴급 퀴즈', categoryIds: ['body_parts','health_symptoms','medical_care','emergency_sos'], limit: 28 },
    ],
    roleplay: { id: 'rp_health_help', name: '몸이 안 좋아요', nameJp: '体調が悪いです', icon: '', desc: '증상 말하고 도움 받기', dialogueKey: 'health_help' }
  },
  {
    id: 'v3_hospital',
    stageId: 9,
    accessTier: 'plus',
    name: '병원 접수',
    nameJp: '病院受付',
    icon: '',
    desc: '보험, 접수, 증상, 기다리는 시간 말하기',
    xp: 320,
    unlockAfter: ['v3_health'],
    steps: [
      { type: 'lecture', title: '병원 접수는 보험 → 증상', lectureKey: 'v3_hospital' },
      { type: 'vocab_learn', title: '병원 접수 즉답 카드', items: V3_HOSPITAL_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '병원·증상 표현', categoryIds: ['medical_care','health_symptoms','body_parts'], limit: 24 },
      { type: 'dialogue_study', title: '병원 접수 미리보기', dialogueKey: 'hospital_reception' },
      { type: 'vocab_quiz', title: '병원 접수 즉답 퀴즈', items: V3_HOSPITAL_QA_CARDS },
      { type: 'vocab_quiz', title: '병원 표현 퀴즈', categoryIds: ['medical_care','health_symptoms','body_parts'], limit: 26 },
    ],
    roleplay: { id: 'rp_hospital_reception', name: '병원에서 접수하기', nameJp: '病院で受付', icon: '', desc: '열이 있고 배가 아프다고 말하기', dialogueKey: 'hospital_reception' }
  },
  {
    id: 'v3_lost_and_help',
    stageId: 9,
    accessTier: 'plus',
    name: '분실·도움 요청',
    nameJp: '忘れ物・助けて',
    icon: '',
    desc: '물건을 잃어버렸을 때, 장소를 찾을 때, 직원에게 도움을 요청하는 표현',
    xp: 300,
    unlockAfter: ['v3_hospital'],
    steps: [
      { type: 'lecture', title: '당황했을 때는 잃어버린 것부터', lectureKey: 'v3_lost_and_help' },
      { type: 'vocab_learn', title: '분실물 즉답 카드', items: V3_LOST_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '도움 요청 표현', categoryIds: ['emergency_sos','basic_questions'], limit: 18 },
      { type: 'vocab_learn', title: '장소·교통 단어', categoryId: 'place_transport', limit: 12, mode: 'word' },
      { type: 'vocab_learn', title: '길 묻기 문장', categoryId: 'directions', limit: 10, mode: 'sentence' },
      { type: 'dialogue_study', title: '분실물 문의 미리보기', dialogueKey: 'lost_item_help' },
      { type: 'vocab_quiz', title: '분실물 즉답 퀴즈', items: V3_LOST_QA_CARDS },
      { type: 'vocab_quiz', title: '분실·도움 요청 퀴즈', categoryIds: ['emergency_sos','basic_questions','place_transport','directions'], limit: 28 },
    ],
    roleplay: { id: 'rp_lost_item_help', name: '물건을 잃어버렸어요', nameJp: '忘れ物をしました', icon: '', desc: '가방을 잃어버렸다고 말하고 안내받기', dialogueKey: 'lost_item_help' }
  },

  {
    id: 'v3_rentacar',
    stageId: 10,
    accessTier: 'plus',
    name: '렌트카',
    nameJp: 'レンタカー',
    icon: '',
    desc: '예약 확인, 면허증, 보험, 반납 시간 묻기',
    xp: 340,
    unlockAfter: ['v3_lost_and_help'],
    steps: [
      { type: 'lecture', title: '렌트카는 예약 → 면허 → 보험', lectureKey: 'v3_rentacar' },
      { type: 'vocab_learn', title: '렌트카 즉답 카드', items: V3_RENTACAR_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '교통·날짜 단어', categoryId: 'date_basic', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '교통·예약 문장', categoryIds: ['transport_phrases','basic_questions'], limit: 16, mode: 'sentence' },
      { type: 'dialogue_study', title: '렌트카 미리보기', dialogueKey: 'rentacar_pickup' },
      { type: 'vocab_quiz', title: '렌트카 즉답 퀴즈', items: V3_RENTACAR_QA_CARDS },
      { type: 'vocab_quiz', title: '렌트카 표현 퀴즈', categoryIds: ['transport_phrases','basic_questions','date_basic'], limit: 26 },
    ],
    roleplay: { id: 'rp_rentacar_pickup', name: '렌트카 빌리기', nameJp: 'レンタカーを借りる', icon: '', desc: '예약 확인과 반납 시간을 묻기', dialogueKey: 'rentacar_pickup' }
  },
  {
    id: 'v3_tourist_spot',
    stageId: 10,
    accessTier: 'plus',
    name: '관광지·사진',
    nameJp: '観光地と写真',
    icon: '',
    desc: '입장권, 사진 부탁, 추천 장소 묻기',
    xp: 320,
    unlockAfter: ['v3_rentacar'],
    steps: [
      { type: 'lecture', title: '사진 부탁은 한 문장', lectureKey: 'v3_tourist_spot' },
      { type: 'vocab_learn', title: '사진·관광 즉답 카드', items: V3_TOURIST_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '관광·사진 표현', categoryIds: ['basic_questions','directions','first_expressions'], limit: 24 },
      { type: 'dialogue_study', title: '관광지 대화 미리보기', dialogueKey: 'tourist_photo' },
      { type: 'vocab_quiz', title: '사진 부탁 즉답 퀴즈', items: V3_TOURIST_QA_CARDS },
      { type: 'vocab_quiz', title: '관광지 표현 퀴즈', categoryIds: ['basic_questions','directions','first_expressions'], limit: 26 },
    ],
    roleplay: { id: 'rp_tourist_photo', name: '사진 부탁하기', nameJp: '写真をお願いする', icon: '', desc: '사진 한 장 부탁하고 감사하기', dialogueKey: 'tourist_photo' }
  },
  {
    id: 'v3_reservation_call',
    stageId: 10,
    accessTier: 'plus',
    name: '예약 확인',
    nameJp: '予約確認',
    icon: '',
    desc: '예약했어요, 이름은 무엇입니다, 시간 변경 가능해요?',
    xp: 320,
    unlockAfter: ['v3_tourist_spot'],
    steps: [
      { type: 'lecture', title: '예약은 이름과 시간이 중심', lectureKey: 'v3_reservation_call' },
      { type: 'vocab_learn', title: '예약 확인 즉답 카드', items: V3_RESERVATION_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '날짜·시각 단어', categoryIds: ['date_basic','time_clock'], limit: 14, mode: 'word' },
      { type: 'vocab_learn', title: '예약·확인 문장', categoryIds: ['hotel_phrases','basic_questions'], limit: 14, mode: 'sentence' },
      { type: 'dialogue_study', title: '예약 확인 미리보기', dialogueKey: 'reservation_check' },
      { type: 'vocab_quiz', title: '예약 확인 즉답 퀴즈', items: V3_RESERVATION_QA_CARDS },
      { type: 'vocab_quiz', title: '예약 확인 퀴즈', categoryIds: ['hotel_phrases','date_basic','time_clock','basic_questions'], limit: 28 },
    ],
    roleplay: { id: 'rp_reservation_check', name: '예약 확인하기', nameJp: '予約を確認する', icon: '', desc: '예약 이름과 시간을 확인하기', dialogueKey: 'reservation_check' }
  },
  {
    id: 'v3_weather_plan',
    stageId: 10,
    accessTier: 'plus',
    name: '날씨·일정 변경',
    nameJp: '天気と予定変更',
    icon: '',
    desc: '비가 와요, 내일 가도 돼요?, 일정 바꾸고 싶어요',
    xp: 300,
    unlockAfter: ['v3_reservation_call'],
    steps: [
      { type: 'lecture', title: '일정 변경은 이유 + 부탁', lectureKey: 'v3_weather_plan' },
      { type: 'vocab_learn', title: '날씨·일정 변경 즉답 카드', items: V3_WEATHER_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '날짜·감정 단어', categoryIds: ['date_basic','adj_emotion'], limit: 14, mode: 'word' },
      { type: 'vocab_learn', title: '일정 변경 문장', categoryId: 'basic_questions', limit: 10, mode: 'sentence' },
      { type: 'dialogue_study', title: '일정 변경 미리보기', dialogueKey: 'weather_plan_change' },
      { type: 'vocab_quiz', title: '일정 변경 즉답 퀴즈', items: V3_WEATHER_QA_CARDS },
      { type: 'vocab_quiz', title: '일정 변경 퀴즈', categoryIds: ['date_basic','adj_emotion','basic_questions'], limit: 26 },
    ],
    roleplay: { id: 'rp_weather_plan_change', name: '비 와서 일정 바꾸기', nameJp: '予定を変える', icon: '', desc: '내일로 바꿀 수 있는지 묻기', dialogueKey: 'weather_plan_change' }
  },
  {
    id: 'v3_polite_wrapup',
    stageId: 10,
    accessTier: 'plus',
    name: '마무리·감사',
    nameJp: 'お礼と締め',
    icon: '',
    desc: '도움받은 뒤 감사, 괜찮아요, 또 올게요로 자연스럽게 끝내기',
    xp: 280,
    unlockAfter: ['v3_weather_plan'],
    steps: [
      { type: 'lecture', title: '감사는 짧을수록 정중', lectureKey: 'v3_polite_wrapup' },
      { type: 'vocab_learn', title: '마무리 즉답 카드', items: V3_WRAPUP_QA_CARDS, mode: 'sentence' },
      { type: 'vocab_learn', title: '맞장구 단어', categoryId: 'w1_reactions', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '감사·마무리 문장', categoryId: 'first_expressions', limit: 12, mode: 'sentence' },
      { type: 'dialogue_study', title: '감사 마무리 미리보기', dialogueKey: 'polite_wrapup' },
      { type: 'vocab_quiz', title: '마무리 즉답 퀴즈', items: V3_WRAPUP_QA_CARDS },
      { type: 'vocab_quiz', title: '마무리 표현 퀴즈', categoryIds: ['first_expressions','w1_reactions'], limit: 22 },
    ],
    roleplay: { id: 'rp_polite_wrapup', name: '도움받고 마무리하기', nameJp: 'お礼を言う', icon: '', desc: '정중하지만 길지 않게 감사하기', dialogueKey: 'polite_wrapup' }
  },

  {
    id: 'v3_drama_reactions',
    stageId: 11,
    accessTier: 'plus',
    name: '드라마 리액션',
    nameJp: 'ドラマの反応',
    icon: '',
    desc: 'え, うそ, まじで, なんで처럼 자막에서 계속 보이는 짧은 말',
    xp: 260,
    unlockAfter: ['v3_polite_wrapup'],
    steps: [
      { type: 'lecture', title: '자막보다 먼저 들리는 말', lectureKey: 'v3_drama_reactions' },
      { type: 'vocab_learn', title: '짧은 반응어', categoryIds: ['w1_reactions', 'youth_slang'], limit: 18 },
      { type: 'vocab_learn', title: '감정 형용사', categoryId: 'adj_emotion', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '스몰토크 문장', categoryId: 'small_talk', limit: 8, mode: 'sentence' },
      { type: 'vocab_quiz', title: '리액션 듣기 전 퀴즈', categoryIds: ['w1_reactions', 'youth_slang'], limit: 20 },
      { type: 'vocab_quiz', title: '감정 리액션 퀴즈', categoryIds: ['adj_emotion','small_talk'], limit: 16 },
    ],
    roleplay: {
      id: 'rp_drama_reactions',
      name: '드라마 짧은 반응',
      nameJp: 'ドラマの反応',
      icon: '',
      desc: 'え, うそ, まじで처럼 짧은 반응을 듣고 따라 하기',
      dialogueKey: 'drama_reactions'
    }
  },
  {
    id: 'v3_drama_emotion',
    stageId: 11,
    accessTier: 'free',
    name: '감정 표현',
    nameJp: '気持ちの表現',
    icon: '',
    desc: '기쁘다, 걱정돼요, 깜짝 놀랐어요처럼 짧은 감정 문장 익히기',
    xp: 260,
    unlockAfter: ['v3_drama_reactions'],
    steps: [
      { type: 'lecture', title: '감정은 짧은 문장으로 던지기', lectureKey: 'v3_drama_emotion' },
      { type: 'vocab_learn', title: '감정 형용사', categoryId: 'adj_emotion', limit: 14 },
      { type: 'vocab_learn', title: '맞장구 단어', categoryId: 'w1_reactions', limit: 8, mode: 'word' },
      { type: 'vocab_learn', title: '스몰토크 문장', categoryId: 'small_talk', limit: 8, mode: 'sentence' },
      { type: 'vocab_quiz', title: '감정 표현 퀴즈', categoryIds: ['adj_emotion','small_talk'], limit: 22 },
    ],
    roleplay: null
  },
  {
    id: 'v3_drama_daily',
    stageId: 11,
    accessTier: 'plus',
    name: '드라마 일상 대사',
    nameJp: '日常セリフ',
    icon: '',
    desc: '친구 말투, 감정 표현, 짧은 일상 문장',
    xp: 300,
    unlockAfter: ['v3_drama_emotion'],
    steps: [
      { type: 'lecture', title: '드라마 대사는 짧게 끊어 듣기', lectureKey: 'v3_drama_daily' },
      { type: 'vocab_learn', title: '감정·상태 단어', categoryId: 'adj_emotion', limit: 10, mode: 'word' },
      { type: 'vocab_learn', title: '드라마 일상 문장', categoryId: 'small_talk', limit: 10, mode: 'sentence' },
      { type: 'vocab_learn', title: '취미·관심사', categoryId: 's2_hobbies', limit: 10 },
      { type: 'vocab_quiz', title: '드라마 입문 퀴즈', categoryIds: ['adj_emotion','small_talk','s2_hobbies'], limit: 24 },
      { type: 'dialogue_study', title: '일상 대화 미리보기', dialogueKey: 'daily_chat' },
    ],
    roleplay: { id: 'rp_daily_chat', name: '짧은 일상 대화', nameJp: '日常会話', icon: '', desc: '일본어 공부와 취미 이야기', dialogueKey: 'daily_chat' }
  },
];

const MODULE_ORDER = [
  'v3_kana_map',
  'v3_survival_objects',
  'v3_particle_basics',
  'v3_pronouns_places',
  'v3_directions_body',
  'v3_numbers_time',
  'v3_money_counting',
  'v3_question_engine',
  'v3_answer_engine',
  'v3_first_greetings',
  'v3_reaction_shadowing',
];

function getModulesByStage(stageId) {
  return MODULES
    .filter(m => m.stageId === stageId)
    .sort((a, b) => moduleOrderIndex(a) - moduleOrderIndex(b));
}

function moduleOrderIndex(mod) {
  const index = MODULE_ORDER.indexOf(mod.id);
  return index >= 0 ? index : MODULE_ORDER.length + MODULES.indexOf(mod);
}

function isModuleUnlocked(moduleId, progress) {
  const mod = typeof moduleId === 'object'
    ? moduleId
    : MODULES.find(m => m.id === moduleId);
  return !!mod;
}

function isRoleplayUnlocked(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  return !!mod?.roleplay;
}

function getModuleProgressPct(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return 0;
  const total = mod.steps.length + (mod.roleplay ? 1 : 0);
  const mp = progress.modules?.[moduleId] || {};
  const done = Math.min(mp.stepsCompleted || 0, mod.steps.length) + (mp.roleplayDone ? 1 : 0);
  return total ? Math.round((done / total) * 100) : 0;
}

function getStageProgressPct(stageId, progress) {
  const mods = getModulesByStage(stageId);
  if (!mods.length) return 0;
  const total = mods.reduce((sum, mod) => sum + mod.steps.length + (mod.roleplay ? 1 : 0), 0);
  const done = mods.reduce((sum, mod) => {
    const mp = progress.modules?.[mod.id] || {};
    return sum + Math.min(mp.stepsCompleted || 0, mod.steps.length) + (mp.roleplayDone ? 1 : 0);
  }, 0);
  return Math.round((done / total) * 100);
}

function getNextModule(progress) {
  for (const stage of STAGES) {
    const mods = getModulesByStage(stage.id);
    for (const mod of mods) {
      if (!isModuleUnlocked(mod.id, progress)) continue;
      const mp = progress.modules?.[mod.id] || {};
      if ((mp.stepsCompleted || 0) < mod.steps.length) return { mod, roleplay: false };
      if (mod.roleplay && !mp.roleplayDone) return { mod, roleplay: true };
    }
  }
  return null;
}
