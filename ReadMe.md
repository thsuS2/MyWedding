# 💐 지수 🫶 유신 - Botanical Flow Minimal 청첩장

> **"봄날의 정원 속, 우리의 약속"**  
> 화이트톤의 밝은 보타니컬 가든 컨셉으로 제작한  
> 심플하고 특별한 감성의 모바일 청첩장 🌸

---

## 🌸 프로젝트 소개

**Botanical Flow Minimal**은 개발자 커플이 직접 만든 웹 청첩장입니다.

- 🎨 **디자인**: White + Greenery + Blush Pink
- 📱 **반응형**: 모든 모바일 브라우저 최적화
- ⚡ **기술**: React + Vite + Supabase
- 🚀 **배포**: GitHub Pages

---

## ✨ 주요 기능

### 1. 🎯 고정 내비게이션
- 상단 고정 메뉴로 섹션 간 부드러운 이동
- 스크롤 시 반투명 blur 효과

### 2. 🌸 흩날리는 꽃잎 애니메이션
- Canvas API 기반 꽃잎 애니메이션
- 봄바람처럼 부드러운 모션

### 3. 🖼️ 갤러리 (3x3 그리드)
- 이미지 클릭 시 전체화면 모달
- 좌우 화살표/키보드로 네비게이션
- Lazy Loading으로 성능 최적화

### 4. 💌 실시간 축하 메시지
- Supabase 연동으로 실시간 메시지 표시
- 관계별 필터 (가족/친구/동료/기타)
- 즉시 반영되는 축하 메시지

### 5. 📱 카카오톡 공유
- Kakao SDK 연동
- 모바일 친화적 공유 기능

### 6. 🗺️ 오시는 길
- 지도 바로가기 (카카오맵/네이버지도)
- 계좌번호 원클릭 복사

---

## 🛠️ 기술 스택

| 분야 | 기술 |
|------|------|
| **Frontend** | React 19, Vite |
| **Database** | Supabase (PostgreSQL) |
| **Animation** | Canvas API, CSS Keyframes |
| **API** | Kakao SDK |
| **Deployment** | GitHub Pages, GitHub Actions |

---

## 🚀 시작하기

### 1. 클론 및 설치

```bash
git clone https://github.com/yourusername/MyWedding.git
cd MyWedding
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# Kakao SDK
VITE_KAKAO_APP_KEY=your_kakao_javascript_key

# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```


### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

### 5. GitHub Pages 배포

```bash
npm run deploy
```

또는 GitHub Actions로 자동 배포 (main 브랜치 push 시)

---

## 📁 프로젝트 구조

```
/Users/park/workspace/MyWedding/
├── public/                # 정적 파일
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Navigation.jsx
│   │   ├── PetalAnimation.jsx
│   │   ├── IntroSection.jsx
│   │   ├── MainSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── MapSection.jsx
│   │   ├── MessageBoard.jsx
│   │   ├── Footer.jsx
│   │   └── LazyImage.jsx
│   ├── hooks/             # Custom Hooks
│   │   └── useSupabase.js
│   ├── lib/               # 라이브러리 설정
│   │   └── supabase.js
│   ├── utils/             # 유틸리티 함수
│   │   ├── kakaoShare.js
│   │   └── clipboard.js
│   ├── styles/            # 글로벌 스타일
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml
├── .Work/                 # 작업 일지
├── SETUP_GUIDE.md         # 설정 가이드
├── package.json
└── vite.config.js
```

---

## 🎨 커스터마이징

### 실제 데이터로 교체하기

1. **날짜 및 장소 정보**
   - `src/components/IntroSection.jsx`
   - `src/components/MainSection.jsx`
   - `src/components/MapSection.jsx`

2. **이미지 교체**
   - 커플 사진: `public/main-couple.jpg`
   - 갤러리: `public/gallery-1.jpg ~ gallery-9.jpg`
   - 썸네일: `public/wedding-thumbnail.jpg`

3. **계좌번호**
   - `src/components/MapSection.jsx`

자세한 체크리스트는 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 참고

---

## 🔐 보안 주의사항

### GitHub Secrets 설정 (GitHub Actions 사용 시)

1. GitHub 리포지토리 → Settings → Secrets and variables → Actions
2. 다음 secrets 추가:
   - `VITE_KAKAO_APP_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

⚠️ **중요**: `.env` 파일은 절대 GitHub에 커밋하지 마세요!

---

## 📱 모바일 브라우저 지원

- ✅ Safari (iOS)
- ✅ Chrome (Android)
- ✅ Samsung Internet
- ✅ Kakao In-App Browser
- ✅ Naver In-App Browser

---

## 🎯 성능 최적화

- ⚡ Lazy Loading (이미지)
- ⚡ Code Splitting (React.lazy - 필요시)
- ⚡ Canvas Animation Optimization
- ⚡ Supabase Realtime Channels

---

## 📄 라이선스

이 프로젝트는 개인 청첩장 용도로 제작되었습니다.

---

## 💕 Special Thanks

Made with 💕 by 지수 & 유신

---

## 📞 문의

문제가 발생하거나 질문이 있으시면 Issues를 남겨주세요.

---

## 🎉 결혼식 정보

**일시:** 2025년 00월 00일 오후 0시  
**장소:** ○○웨딩홀 ○층 ○○홀

---

_"봄날의 정원 속, 우리의 약속"_ 🌸
