import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicImagesDir = path.join(__dirname, '../public/images');
const outputFile = path.join(__dirname, '../src/constants/gallery.js');

// public/images 폴더에서 이미지 파일 목록 가져오기
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const files = fs.readdirSync(publicImagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && file !== '.DS_Store';
  })
  .sort(); // 파일명 순서대로 정렬

// gallery.js 파일 생성
const content = `/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/ 폴더의 모든 이미지 파일을 자동으로 포함합니다.
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
${files.map(file => `  '${file}'`).join(',\n')}
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return \`/images/\${filename}\`;
};
`;

fs.writeFileSync(outputFile, content, 'utf-8');
console.log(`✅ 갤러리 이미지 목록 생성 완료: ${files.length}개 파일`);
console.log(`   출력 파일: ${outputFile}`);
