/* ============================================================
   YOUTUBE LECTURE CURATION
   모듈별 추천 YouTube 강의 데이터
   ============================================================ */

'use strict';

/*
  각 항목 필드:
  - title    : 영상·검색 제목
  - channel  : 채널명
  - url      : YouTube URL (영상 / 재생목록 / 검색 결과)
  - type     : 'video' | 'playlist' | 'search' | 'channel'
  - lang     : 'ko' | 'en' | 'ja'   (강의 언어)
  - duration : 예상 시청 시간 (문자열)
  - desc     : 한 줄 설명
*/
const YOUTUBE_LECTURES = {

  // ════ STAGE 1 : 문자 마스터 ════════════════════════════════

  kana_hira: [
    {
      title: '히라가나 오십음도 완전 정복',
      channel: '일본어공부TV',
      url: 'https://www.youtube.com/results?search_query=히라가나+오십음도+완전정복+강의',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '탁음·반탁음·요음까지 한국어 해설로 깔끔하게 정리'
    },
    {
      title: 'Learn ALL Hiragana in 1 Hour',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/watch?v=6p9Il_j0zjc',
      type: 'video', lang: 'en', duration: '50분',
      desc: '체계적인 히라가나 입문. 쓰기·발음·예문 총망라'
    },
    {
      title: 'ひらがな 歌で覚える (노래로 외우기)',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=hiragana+song+japanese+ammo+misa',
      type: 'search', lang: 'en', duration: '10분',
      desc: '리듬으로 히라가나를 자연스럽게 암기하는 비법'
    }
  ],

  kana_kata: [
    {
      title: '가타카나 완전 정복 — 외래어 표기 총정리',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=가타카나+완전정복+외래어+강의',
      type: 'search', lang: 'ko', duration: '~25분',
      desc: '히라가나와 모양이 비슷한 글자 헷갈림 집중 공략'
    },
    {
      title: 'Learn ALL Katakana in 1 Hour',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/watch?v=s6DKRgtVLGA',
      type: 'video', lang: 'en', duration: '50분',
      desc: '히라가나와 쌍으로 배우는 가타카나 완전 가이드'
    },
    {
      title: 'カタカナ 외래어 발음 룰 설명',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=katakana+foreign+words+pronunciation+japanese',
      type: 'search', lang: 'en', duration: '15분',
      desc: '영어·한국어 단어가 어떻게 가타카나가 되는지 규칙 학습'
    }
  ],

  first_phrases: [
    {
      title: '일본어 첫 인사 — すみません부터 시작하는 여행 일본어',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+첫인사+기초표현+입문강의',
      type: 'search', lang: 'ko', duration: '~15분',
      desc: '현지에서 바로 쓰는 첫 10개 인사 표현 마스터'
    },
    {
      title: 'Japanese Greetings & Introductions',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+greetings+phrases+beginners+JapanesePod101',
      type: 'search', lang: 'en', duration: '~12분',
      desc: 'おはようございます에서 よろしくお願いします까지 발음과 함께'
    }
  ],

  // ════ STAGE 2 : 생존 일본어 ════════════════════════════════

  survival_greet: [
    {
      title: '일본어 필수 표현 50 — 여행 생존 완전판',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+여행+필수표현+50개+완전판',
      type: 'search', lang: 'ko', duration: '~30분',
      desc: '인사·감사·사과·부탁 현장 표현 총정리'
    },
    {
      title: 'すみません の 魔法 — 만능 표현 완전 분석',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=sumimasen+explanation+japanese+ammo+misa',
      type: 'search', lang: 'en', duration: '~18분',
      desc: '인사·사과·호출까지 すみません 하나로 해결하는 법'
    },
    {
      title: '✈️ 공항·입국심사 실전 일본어',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+공항+입국심사+실전회화',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '롤플레이와 연계! 입국심사부터 짐 찾기까지 실전 표현'
    }
  ],

  survival_numbers: [
    {
      title: '일본어 숫자·날짜·시간 완전 정복',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+숫자+날짜+시간+완전정복+강의',
      type: 'search', lang: 'ko', duration: '~25분',
      desc: '1~10000까지 세는 법 + 요일·월·날짜 표현 전부'
    },
    {
      title: 'Japanese Numbers 1-10,000 (완전 가이드)',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+numbers+1+10000+complete+guide',
      type: 'search', lang: 'en', duration: '~20분',
      desc: '数字 + 助数詞(じょすうし) 셀 때 쓰는 단위까지 함께'
    }
  ],

  survival_transport: [
    {
      title: '일본 여행 교통 — 전철·버스 완전 가이드',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본+전철+버스+교통+회화+실전',
      type: 'search', lang: 'ko', duration: '~22분',
      desc: '역 안내소에서 티켓 사기·환승·길 묻기 시뮬레이션'
    },
    {
      title: '新幹線 예약·탑승 — 신칸센 실전 회화',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=japanese+train+shinkansen+conversation+travel',
      type: 'search', lang: 'en', duration: '~15분',
      desc: '신칸센 예약부터 좌석 찾기까지 완전 시뮬레이션'
    }
  ],

  survival_food: [
    {
      title: '일본 음식점 주문 — 완전 실전 회화',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+음식점+식당+주문+회화+실전',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '메뉴 고르기부터 お会計まで 전체 흐름 완전 정복'
    },
    {
      title: '居酒屋(いざかや) 주문 완전 가이드',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=izakaya+japanese+order+conversation+guide',
      type: 'search', lang: 'en', duration: '~18분',
      desc: '이자카야에서 음식·음료 주문, 乾杯까지 실전 롤플레이'
    }
  ],

  survival_shopping: [
    {
      title: '일본 편의점·쇼핑 완전 가이드',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+쇼핑+편의점+드럭스토어+회화',
      type: 'search', lang: 'ko', duration: '~18분',
      desc: '가격 물어보기·계산·봉투 거절·포인트 적립까지'
    },
    {
      title: 'Shopping Japanese — Size, Color, Price Phrases',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+shopping+phrases+size+color+price',
      type: 'search', lang: 'en', duration: '~15분',
      desc: '쇼핑에서 자주 쓰는 표현 완전 정리'
    }
  ],

  survival_hotel: [
    {
      title: '일본 호텔 체크인·아웃 완전 실전',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+호텔+체크인+체크아웃+실전회화',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '체크인부터 룸서비스·온천·레이트 체크아웃까지'
    },
    {
      title: 'Hotel Japanese — Complete Dialogue',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=japanese+hotel+check+in+out+dialogue+phrases',
      type: 'search', lang: 'en', duration: '~15분',
      desc: '호텔 직원과의 실전 회화 시뮬레이션'
    }
  ],

  // ════ STAGE 3 : 일상 대화 ════════════════════════════════

  daily_adjectives: [
    {
      title: '일본어 기본 동사 완전 정복 — て형·ます형',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=japanese+verb+conjugation+te+form+masu+form+misa',
      type: 'search', lang: 'en', duration: '~35분',
      desc: 'て형·ます형·ない형 활용 패턴을 문법적으로 완전 이해'
    },
    {
      title: 'い형용사·な형용사 완전 가이드',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+이형용사+나형용사+차이+활용+강의',
      type: 'search', lang: 'ko', duration: '~25분',
      desc: '어미 변화와 활용법을 쉬운 예문으로 마스터'
    },
    {
      title: 'Organic Japanese — Verb & Adjective Structure',
      channel: 'Organic Japanese with Cure Dolly',
      url: 'https://www.youtube.com/results?search_query=organic+japanese+cure+dolly+verb+adjective',
      type: 'search', lang: 'en', duration: '~20분',
      desc: '동사·형용사의 논리적 구조를 애니메이션으로 이해'
    }
  ],

  daily_places: [
    {
      title: '일본 관광지 회화 — 도쿄·교토·오사카',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+관광지+도쿄+교토+여행+회화',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '관광지·신사·온천에서 현지인과 자연스럽게 대화'
    },
    {
      title: 'Sightseeing Japanese — Temple, Shrine, Onsen',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=japanese+sightseeing+temple+shrine+onsen+conversation',
      type: 'search', lang: 'en', duration: '~15분',
      desc: '관광 명소에서 실제로 쓰이는 표현과 문화 배경'
    }
  ],

  daily_health: [
    {
      title: '일본 병원·약국 회화 — 증상 설명 완전판',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+병원+약국+증상+설명+회화',
      type: 'search', lang: 'ko', duration: '~22분',
      desc: '두통·복통·발열·알레르기 등 증상 설명 표현 총정리'
    },
    {
      title: 'Japanese at Hospital & Pharmacy',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+at+hospital+pharmacy+sick+symptoms',
      type: 'search', lang: 'en', duration: '~18분',
      desc: '해외에서 아플 때 꼭 필요한 신체·증상·의약품 표현'
    }
  ],

  // ════ STAGE 4 : IT·비즈니스 ════════════════════════════════

  it_tech_vocab: [
    {
      title: 'IT·개발 현장 일본어 — 엔지니어 필수 용어',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+IT+개발+프로그래밍+용어+비즈니스',
      type: 'search', lang: 'ko', duration: '~25분',
      desc: '일본 IT 기업 취업·파견에서 바로 쓰는 기술 용어 200+'
    },
    {
      title: 'Business Japanese for Tech — Vocab & Phrases',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=business+japanese+IT+tech+vocabulary+workplace',
      type: 'search', lang: 'en', duration: '~20분',
      desc: '실리콘밸리→일본 스타트업 환경에서 통하는 IT 표현'
    }
  ],

  it_workplace_vocab: [
    {
      title: '일본 직장 필수 표현 — 출퇴근부터 업무 보고까지',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+직장+업무+보고+회의+표현+비즈니스',
      type: 'search', lang: 'ko', duration: '~28분',
      desc: '일본 회사에서 살아남기 위한 조직·직함·업무 표현'
    },
    {
      title: 'Japanese Workplace Vocabulary & Phrases',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=japanese+workplace+office+vocabulary+job+phrases',
      type: 'search', lang: 'en', duration: '~20분',
      desc: '팀원 소개부터 업무 분담, 회식까지 직장 생활 전반'
    }
  ],

  biz_basic: [
    {
      title: 'ほうれんそう 완전 가이드 — 보고·연락·상담',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+ほうれんそう+보고+연락+상담+비즈니스',
      type: 'search', lang: 'ko', duration: '~22분',
      desc: '일본 직장 문화의 핵심 ほうれんそう 완전 이해 + 실전 표현'
    },
    {
      title: '경어(敬語) 기초 — 존경어·겸양어·정중어',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+경어+존경어+겸양어+기초+비즈니스',
      type: 'search', lang: 'ko', duration: '~30분',
      desc: 'いただく vs くださる 등 경어의 논리를 완전 이해'
    },
    {
      title: 'Keigo — Japanese Business Polite Language',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=keigo+japanese+business+polite+language+misa',
      type: 'search', lang: 'en', duration: '~25분',
      desc: '실제 비즈니스 상황별 경어 활용 완전 가이드'
    }
  ],

  biz_meeting: [
    {
      title: '일본어 회의 표현 완전판 — 의견 제시·동의·반대',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+회의+의견+동의+반대+발표+표현',
      type: 'search', lang: 'ko', duration: '~25분',
      desc: '회의 진행·발언·질문·정리까지 회의 전체 흐름 마스터'
    },
    {
      title: 'Japanese Meeting Phrases — Agree, Disagree, Propose',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+meeting+phrases+agree+disagree+propose+business',
      type: 'search', lang: 'en', duration: '~18분',
      desc: '회의에서 자신의 의견을 자연스럽게 전달하는 법'
    }
  ],

  biz_1on1: [
    {
      title: '일본어 1on1 미팅 — 상사와 대화 실전',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+1on1+미팅+상사+매니저+업무+회화',
      type: 'search', lang: 'ko', duration: '~20분',
      desc: '성과 보고·고민 상담·피드백 수용까지 1on1 완전 시뮬레이션'
    },
    {
      title: '仕様確認(사양 확인) — 기획자·클라이언트 히어링',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+사양확인+요구사항+히어링+IT+비즈니스',
      type: 'search', lang: 'ko', duration: '~18분',
      desc: '요구사항 확인·질문·재확인 흐름을 실전 대화로 마스터'
    }
  ],

  biz_intro: [
    {
      title: '일본 IT 기업 입사 첫날 — 자기소개 완전판',
      channel: '모모의 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+자기소개+비즈니스+첫출근+IT기업',
      type: 'search', lang: 'ko', duration: '~18분',
      desc: '팀 인사·자기소개·환경 설정 요청까지 첫날 완전 가이드'
    },
    {
      title: 'Japanese Self Introduction (Business)',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/results?search_query=japanese+self+introduction+business+formal',
      type: 'search', lang: 'en', duration: '~15분',
      desc: '비즈니스 첫 만남에서 인상적인 자기소개 방법'
    }
  ],

  biz_spec: [
    {
      title: '개발자를 위한 일본어 — 사양·요건 확인 실전',
      channel: '일본어 뱅크',
      url: 'https://www.youtube.com/results?search_query=일본어+개발자+사양+요건+확인+IT+회화',
      type: 'search', lang: 'ko', duration: '~22분',
      desc: '기획서 이해·질문·확인·수정 요청 흐름 완전 시뮬레이션'
    },
    {
      title: 'IT Japanese — Requirements & Specification Meeting',
      channel: 'Comprehensible Japanese',
      url: 'https://www.youtube.com/results?search_query=IT+japanese+requirements+specification+discussion',
      type: 'search', lang: 'en', duration: '~18분',
      desc: 'PdM·디자이너와 요구사항 협의하는 실전 IT 일본어'
    }
  ],

  // ════ STAGE 5 : 심화 ════════════════════════════════════

  adv_keigo: [
    {
      title: '경어 완전 정복 — 존경어·겸양어·정중어 총정리',
      channel: '나가혜 일본어',
      url: 'https://www.youtube.com/results?search_query=일본어+경어+완전정복+존경어+겸양어+정중어',
      type: 'search', lang: 'ko', duration: '~40분',
      desc: '일본어 학습자가 가장 어려워하는 경어를 완전 마스터'
    },
    {
      title: '尊敬語·謙譲語·丁寧語 — Complete Keigo Guide',
      channel: 'Japanese Ammo with Misa',
      url: 'https://www.youtube.com/results?search_query=japanese+keigo+sonkeigo+kenjougo+teineigo+complete',
      type: 'search', lang: 'en', duration: '~35분',
      desc: '실제 비즈니스·일상 상황에 맞는 경어 선택법 완전 마스터'
    },
    {
      title: 'JLPT N2 敬語 — 시험 & 실전 동시 대비',
      channel: '日本語の森 (nihongonomori)',
      url: 'https://www.youtube.com/results?search_query=JLPT+N2+경어+敬語+nihongonomori+일본어의숲',
      type: 'search', lang: 'ja', duration: '~30분',
      desc: 'N2 시험 경어 문제 유형 분석 + 실전 활용 패턴'
    }
  ]

};

// ── 언어 표시 헬퍼 ──────────────────────────────────────────
function getLangBadge(lang) {
  const map = { ko: '🇰🇷 한국어', en: '🇺🇸 English', ja: '🇯🇵 日本語' };
  return map[lang] || lang;
}

// ── 타입 아이콘 ───────────────────────────────────────────
function getLectureIcon(type) {
  const map = { video: '▶️', playlist: '📋', search: '🔍', channel: '📺' };
  return map[type] || '▶️';
}
