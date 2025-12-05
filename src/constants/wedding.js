/**
 * 결혼식 정보 상수
 * 
 * 실제 데이터로 교체 필요:
 * - 부모님 성함
 * - 예식장 정보
 * - 계좌번호
 * - 교통 정보
 */

// 결혼식 기본 정보
export const WEDDING_DATE = {
  year: 2026,
  month: 5,
  day: 30,
  time: '오후 5시 30분',
  weekday: '토요일',
};

// 날짜 포맷팅 함수
export const getFormattedDate = () => {
  return `${WEDDING_DATE.year}년 ${WEDDING_DATE.month}월 ${WEDDING_DATE.day}일`;
};

export const getFormattedDateTime = () => {
  return `${getFormattedDate()} ${WEDDING_DATE.time}`;
};

export const getFormattedDateWithWeekday = () => {
  return `${getFormattedDate()} (${WEDDING_DATE.weekday}) ${WEDDING_DATE.time}`;
};

// 커플 정보
export const COUPLE = {
  bride: {
    name: '지수',
    fullName: '박지수',
    parents: {
      father: '박태규',
      mother: '김성옥',
    },
    position: '딸',
  },
  groom: {
    name: '유신',
    fullName: '김유신',
    parents: {
      father: '김남수',
      mother: '유영래',
    },
    position: '아들',
  },
};

// 예식장 정보
export const VENUE = {
  name: '보타닉파크웨딩',
  floor: 'B2F',
  hall: '카라홀',
  address: '서울특별시 강서구 마곡중앙5로 6 보타닉푸르지오시티 B2F',
  transportation: {
    subway: '마곡나루역 1번 출구 도보 3분', // 실제 정보 확인 필요
    bus: '마곡나루역 하차', // 실제 정보 확인 필요
    parking: '건물 내 주차장 이용', // 실제 정보 확인 필요
  },
};

// 계좌번호 정보
export const ACCOUNTS = [
  {
    name: '신랑',
    bank: '○○은행', // 실제 은행명으로 교체 필요
    number: '1234-5678-9012', // 실제 계좌번호로 교체 필요
    holder: COUPLE.groom.fullName,
  },
  {
    name: '신부',
    bank: '○○은행', // 실제 은행명으로 교체 필요
    number: '9876-5432-1098', // 실제 계좌번호로 교체 필요
    holder: COUPLE.bride.fullName,
  },
];

// 카카오톡 공유 정보
export const KAKAO_SHARE = {
  title: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다`,
  description: `${getFormattedDateTime()}\n봄날의 정원 속, 우리의 약속`,
  imageUrl: 'https://yourdomain.github.io/MyWedding/wedding-thumbnail.jpg', // 실제 배포 URL로 교체 필요
};

// 메타 정보
export const META = {
  title: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다 💐`,
  description: `${COUPLE.bride.name} ❤️ ${COUPLE.groom.name} 결혼식에 초대합니다 - ${getFormattedDate()} 봄날의 정원 속, 우리의 약속`,
  keywords: '모바일청첩장, 웹청첩장, 지수유신, 결혼식',
  author: `${COUPLE.bride.name} & ${COUPLE.groom.name}`,
  ogTitle: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다`,
  ogDescription: `${getFormattedDate()} - 봄날의 정원 속, 우리의 약속`,
  ogImage: '/wedding-thumbnail.jpg',
  ogUrl: 'https://yourdomain.github.io/MyWedding/', // 실제 배포 URL로 교체 필요
};

