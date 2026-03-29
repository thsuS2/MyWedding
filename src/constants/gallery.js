/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 정렬: a1,a2,… → b1,b2,… → c… (같은 접두어 안에서 숫자 오름차순)
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
  'a1.jpeg',
  'a2.jpeg',
  'a3.jpeg',
  'a4.jpeg',
  'a5.jpeg',
  'a6.jpeg',
  'a7.jpeg',
  'a8.jpeg',
  'a9.jpeg',
  'a10.jpeg',
  'a11.jpeg',
  'a12.jpeg',
  'a13.jpeg',
  'b1.jpeg',
  'b2.jpeg',
  'b3.jpeg',
  'b4.jpeg',
  'b5.jpeg',
  'b6.jpeg',
  'b7.jpeg',
  'b8.jpeg',
  'b9.jpeg',
  'b10.jpeg',
  'c1.jpeg',
  'c2.jpeg',
  'c3.jpeg',
  'c4.jpeg',
  'd1.jpeg',
  'd2.jpeg',
  'd3.jpeg',
  'd4.jpeg',
  'e1.jpeg',
  'e2.jpeg',
  'e3.jpeg',
  'e4.jpeg',
  'e5.jpeg',
  'e6.jpeg',
  'e7.jpeg',
  'e8.jpeg',
  'e9.jpeg',
  'e10.jpeg',
  'e11.jpeg'
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/gallery/${filename}`;
};
