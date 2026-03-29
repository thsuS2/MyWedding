# 2026-02-18 YourWedding: RSVP 제거·메시지 테이블 분리·인트로 이미지

## 요구사항
- 참석의사 전달(RSVP) 제외, 축하 메시지만 유지.
- 동일 Supabase 프로젝트에 **별도 테이블** — `VITE_SUPABASE_MESSAGES_TABLE` 로 지정.
- 인트로 동영상 주석 처리 대신 **정지 이미지** `public/images/gallery/ChatGPT_wedding.png` 사용.

## 구현
- `App.jsx`: `RSVPModal` 및 상태 제거.
- `MapSection`: `onOpenRSVP`·참석의사 버튼 제거.
- `useSupabase.js`: `.from(table)` / Realtime `table` 동적화, 채널명 테이블별 유니크.
- `IntroSection.jsx`: 동영상·음소거 UI 제거, `<img src="/images/gallery/ChatGPT_wedding.png" />`, 인트로 날짜 `getFormattedDateEnglishShort()`.
- `wedding.js`: `getFormattedDateEnglishShort` 추가.
- `docs/MESSAGES_TABLE_YOURWEDDING.md`, `.env.example` 업데이트.
- `gallery.js`: `ChatGPT_wedding.png` 목록 추가 (갤러리 그리드에도 표시됨).

## 사용자 할 일
- Supabase에 `messages_your_wedding` 등 테이블 생성·RLS·Realtime.
- Vercel에 `VITE_SUPABASE_MESSAGES_TABLE` 설정 후 Redeploy.
