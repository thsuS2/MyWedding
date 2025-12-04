# Vercel 배포 검토 및 가이드

## ✅ 핵심 답변

### React로 다시 구현할 필요 없음! 🎉
현재 프로젝트는 **이미 React + Vite**로 구성되어 있어서, **그대로 Vercel에 배포 가능**합니다.

---

## 📊 GitHub Pages vs Vercel 비교

| 항목 | GitHub Pages | Vercel |
|------|-------------|--------|
| **설정 난이도** | ⭐⭐⭐ (복잡) | ⭐ (매우 쉬움) |
| **배포 속도** | 느림 (몇 분) | 빠름 (초 단위) |
| **자동 배포** | GitHub Actions 필요 | 자동 감지 |
| **환경 변수** | Secrets 설정 복잡 | 대시보드에서 쉽게 |
| **커스텀 도메인** | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ (자동) |
| **프리뷰 배포** | ❌ | ✅ (PR마다) |
| **base 경로** | `/리포지토리명/` 필수 | `/` 루트 가능 |
| **비용** | 무료 | 무료 (개인 프로젝트) |

---

## 🎯 Vercel의 장점

### 1. 설정이 매우 간단
- GitHub 연결만 하면 자동 배포
- 별도 워크플로우 파일 불필요
- 환경 변수 대시보드에서 관리

### 2. 더 나은 URL
- GitHub Pages: `https://username.github.io/MyWedding/`
- Vercel: `https://my-wedding.vercel.app` 또는 커스텀 도메인

### 3. 프리뷰 배포
- PR 생성 시 자동으로 프리뷰 URL 생성
- 배포 전 테스트 가능

### 4. 빠른 배포
- 변경사항 감지 즉시 배포
- Edge 네트워크로 빠른 로딩

### 5. 환경 변수 관리
- 대시보드에서 쉽게 추가/수정
- 프로덕션/프리뷰 환경 분리 가능

---

## 🔧 Vercel 배포를 위한 변경사항

### 1. vite.config.js 수정
**현재:**
```javascript
base: '/MyWedding/', // GitHub Pages용
```

**변경 후:**
```javascript
base: '/', // Vercel은 루트 도메인 사용
```

### 2. vercel.json 추가 (선택사항)
SPA 라우팅을 위한 설정:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3. GitHub Actions 제거 (선택사항)
Vercel이 자동 배포하므로 `.github/workflows/deploy.yml` 불필요

---

## 📝 Vercel 배포 단계별 가이드

### Step 1: Vercel 계정 생성
1. [vercel.com](https://vercel.com) 접속
2. "Sign Up" 클릭
3. GitHub 계정으로 로그인 (권장)

### Step 2: 프로젝트 연결
1. Vercel 대시보드 → "Add New Project"
2. GitHub 리포지토리 선택
3. 프로젝트 설정:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지)
   - **Output Directory**: `dist` (자동 감지)

### Step 3: 환경 변수 설정
Vercel 대시보드 → Settings → Environment Variables:
```
VITE_KAKAO_APP_KEY=your_key
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Step 4: 배포
- "Deploy" 클릭
- 자동으로 빌드 및 배포 시작
- 몇 초 후 배포 완료!

### Step 5: 자동 배포 설정
- GitHub의 `main` 브랜치에 push하면 자동 배포
- PR 생성 시 프리뷰 배포

---

## 🔄 마이그레이션 체크리스트

### 필수 변경사항
- [ ] `vite.config.js`의 `base` 경로를 `/`로 변경
- [ ] `vercel.json` 파일 생성 (SPA 라우팅용)
- [ ] Vercel 계정 생성 및 프로젝트 연결
- [ ] 환경 변수 Vercel 대시보드에 추가

### 선택적 변경사항
- [ ] GitHub Actions 워크플로우 제거 (Vercel 자동 배포 사용)
- [ ] `package.json`에서 `gh-pages` 제거 (불필요)
- [ ] `deploy` 스크립트 제거 또는 Vercel CLI로 변경

### 코드 변경 불필요
- ✅ React 코드 그대로 사용
- ✅ 컴포넌트 구조 그대로
- ✅ 모든 기능 그대로 작동

---

## 💡 Vercel 배포 후 장점

### 1. 더 간단한 URL
- **이전**: `https://username.github.io/MyWedding/`
- **이후**: `https://my-wedding.vercel.app`
- **커스텀 도메인**: `https://wedding.yourname.com` (무료)

### 2. 환경 변수 관리
- 대시보드에서 클릭 몇 번으로 수정
- GitHub Secrets 설정 불필요

### 3. 자동 배포
- 코드 push만 하면 자동 배포
- GitHub Actions 설정 불필요

### 4. 프리뷰 배포
- PR마다 자동으로 프리뷰 URL 생성
- 배포 전 테스트 가능

---

## 🆚 언제 어떤 것을 선택할까?

### GitHub Pages 선택 시
- ✅ 완전 무료 필요
- ✅ GitHub 생태계 선호
- ✅ 정적 사이트만 배포
- ⚠️ base 경로 설정 필요
- ⚠️ 환경 변수 관리 복잡

### Vercel 선택 시
- ✅ 더 간단한 설정
- ✅ 더 나은 개발 경험
- ✅ 프리뷰 배포 필요
- ✅ 커스텀 도메인 쉽게
- ✅ 환경 변수 관리 쉬움
- ✅ 루트 도메인 사용 가능

---

## 📌 결론

**Vercel 배포를 강력 추천합니다!** 🚀

이유:
1. **React 코드 변경 불필요** - 그대로 사용 가능
2. **설정이 훨씬 간단** - 몇 분이면 완료
3. **더 나은 개발 경험** - 프리뷰, 자동 배포 등
4. **무료** - 개인 프로젝트는 완전 무료

**변경 작업:**
- `vite.config.js`의 base 경로만 수정
- `vercel.json` 파일 추가
- Vercel에 프로젝트 연결

**예상 소요 시간:** 10분 이내

---

## 🎯 다음 단계

Vercel 배포를 원하시면:
1. `vite.config.js` 수정
2. `vercel.json` 생성
3. 배포 가이드 문서 작성

진행할까요?

