# urihaeyang

Vite + Vue 3를 활용하여 제작하였습니다.
cursor를 활용한 바이브코딩 및 공공데이터 api와 chatgpt ai를 활용하여 더 많은것을 꾸려나갈 계획입니다.

## 프로젝트 구조

이 프로젝트는 **Multi-package Repository** (다중 패키지 저장소) 구조를 사용합니다.
- 프론트엔드: Vue 3 + Vite (루트 디렉토리)
- 백엔드: Node.js + Express (`server/` 디렉토리)

## 🚀 배포

배포하고 싶으신가요? 간단한 가이드를 확인하세요:

- **[빠른 배포 가이드 (5분)](./DEPLOY_QUICK_START.md)** ⭐ 추천
- [상세 배포 가이드](./DEPLOYMENT.md)

## 빠른 시작

### 1. 의존성 설치

```bash
# 프론트엔드와 백엔드 모두 설치
npm run install:all
```

### 2. 환경변수 설정

백엔드 서버용 `.env` 파일을 `server/` 디렉토리에 생성하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. 개발 서버 실행

#### 방법 1: 동시 실행 (권장)
```bash
npm run dev
```
프론트엔드(포트 3000)와 백엔드(포트 3001)가 동시에 실행됩니다.

#### 방법 2: 개별 실행
```bash
# 프론트엔드만 (터미널 1)
npm run dev:frontend

# 백엔드만 (터미널 2)
npm run dev:backend
```

## 더 자세한 정보

- 프로젝트 구조: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- 구조 명명: [STRUCTURE_TERMINOLOGY.md](./STRUCTURE_TERMINOLOGY.md)
- 백엔드 설정: [README_BACKEND.md](./README_BACKEND.md)
