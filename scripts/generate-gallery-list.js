import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryImagesDir = path.join(__dirname, '../public/images/gallery');
const outputFile = path.join(__dirname, '../src/constants/gallery.js');

// public/images/gallery 폴더에서 이미지 파일 목록 가져오기
// 정렬: a1,a2,…a10 → b1,b2,… (접두 알파벳 순, 같은 글자 안에서는 숫자 오름차순)
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// gallery 폴더가 없으면 생성
if (!fs.existsSync(galleryImagesDir)) {
  fs.mkdirSync(galleryImagesDir, { recursive: true });
}

/**
 * a1, a2, … a11 → b1, b2, … → c1 … 순 (같은 글자 접두어끼리 숫자 오름차순)
 * @param {string} filename
 * @returns {{ kind: 'series', prefix: string, num: number } | { kind: 'other', raw: string }}
 */
function gallerySortKey(filename) {
  const base = path.basename(filename, path.extname(filename));
  const m = base.match(/^([a-zA-Z]+)(\d+)$/);
  if (m) {
    return { kind: 'series', prefix: m[1].toLowerCase(), num: parseInt(m[2], 10) };
  }
  return { kind: 'other', raw: base.toLowerCase() };
}

const files = fs.readdirSync(galleryImagesDir)
  .filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && file !== '.DS_Store';
  })
  .sort((a, b) => {
    const ka = gallerySortKey(a);
    const kb = gallerySortKey(b);
    if (ka.kind === 'series' && kb.kind === 'series') {
      if (ka.prefix !== kb.prefix) return ka.prefix.localeCompare(kb.prefix);
      return ka.num - kb.num;
    }
    if (ka.kind === 'series' && kb.kind !== 'series') return -1;
    if (ka.kind !== 'series' && kb.kind === 'series') return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

// gallery.js 파일 생성
const content = `/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 정렬: a1,a2,… → b1,b2,… → c… (같은 접두어 안에서 숫자 오름차순)
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
  return \`/images/gallery/\${filename}\`;
};
`;

fs.writeFileSync(outputFile, content, 'utf-8');
console.log(`✅ 갤러리 이미지 목록 생성 완료: ${files.length}개 파일`);
console.log(`   출력 파일: ${outputFile}`);
