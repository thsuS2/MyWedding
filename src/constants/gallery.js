/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
  'a1.jpeg',
  'b1.jpeg',
  'c1.jpeg',
  'd1.jpeg',
  'e1.jpeg',
  'a2.jpeg',
  'b2.jpeg',
  'c2.jpeg',
  'd2.jpeg',
  'e2.jpeg',
  'a3.jpeg',
  'd3.jpeg',
  'e3.jpeg',
  'a4.jpeg',
  'e4.jpeg',
  'a5.jpeg',
  'a6.jpeg',
  'a7.jpeg',
  'a8.jpeg',
  'a9.jpeg',
  'a10.jpeg',
  'a11.jpeg'
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/gallery/${filename}`;
};
