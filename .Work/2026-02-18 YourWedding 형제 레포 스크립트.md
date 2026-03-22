# 2026-02-18 YourWedding 형제 레포 스크립트

## 요구사항
- MyWedding과 동일한 코드를 **다른 레포(YourWedding)**에 두고, **새 Vercel**로 배포할 수 있게 **편하게 관리**할 수 있는 형태로 구성.

## 구현 전략 (적용함)
1. **형제 폴더** `../YourWedding` — MyWedding과 **완전 분리**, `origin` 하나만 두어 실수 푸시 방지.
2. **`scripts/create-sibling-wedding-repo.sh`** — rsync로 복제 후 `git init` + 첫 커밋. `.env`, `.git`, `node_modules`, `.Work` 등 제외.
3. **`.env.example`** — Vite 환경 변수 목록 정리.
4. **`docs/DEPLOY_SIBLING_REPO.md`** — GitHub 빈 레포 연결, Vercel Import, 카카오 콘솔 도메인 추가 순서.

## 생성된 경로
- 로컬: `/Users/park/workspace/YourWedding` (이미 스크립트로 1회 생성됨, 커밋 `4351ad8`)

## 사용자 다음 단계
1. GitHub에서 빈 레포 `YourWedding` 생성.
2. `cd ../YourWedding` → `git remote add origin ...` → `git push -u origin main`
3. Vercel에서 해당 레포 Import, 환경 변수 설정.
4. `cp ../MyWedding/.env .env` 또는 `.env.example` 기반 입력.

## MyWedding에 추가된 파일
- `.env.example`
- `docs/DEPLOY_SIBLING_REPO.md`
- `scripts/create-sibling-wedding-repo.sh`
