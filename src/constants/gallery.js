/**
 * 갤러리 이미지 목록
 * 
 * 사용 방법:
 * 1. images/ 폴더에 이미지 파일 추가
 * 2. 아래 배열에 파일명 추가
 * 3. public/images/ 폴더에도 동일한 파일 복사 (또는 심볼릭 링크)
 * 
 * 파일명 형식은 자유롭게 사용 가능합니다.
 */

export const GALLERY_IMAGES = [
  'KakaoTalk_Photo_2025-12-11-20-03-34 001.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-34 002.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-34 003.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-34 004.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 005.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 006.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 007.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 008.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 009.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 010.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 011.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 012.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 013.jpeg',
  'KakaoTalk_Photo_2025-12-11-20-03-35 014.jpeg',
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/${filename}`;
};

