# URI HAEYANG (우리해양)

Vite + Vue 3를 활용하여 제작한 해양 정보 플랫폼입니다.
Cursor를 활용한 바이브코딩 및 공공데이터 API와 ChatGPT AI를 활용하여 더 많은 기능을 추가할 계획입니다.

## 프로젝트 구조

이 프로젝트는 **Multi-package Repository** (다중 패키지 저장소) 구조를 사용합니다.
- 프론트엔드: Vue 3 + Vite + TypeScript (`uriHaeyang_frontend/` 디렉토리)
- 백엔드: Node.js + Express (`uriHaeyang_backend/` 디렉토리)

## 🚀 배포

배포하고 싶으신가요? 간단한 가이드를 확인하세요:

- **[빠른 배포 가이드 (5분)](./DEPLOY_QUICK_START.md)** ⭐ 추천
- [상세 배포 가이드](./DEPLOYMENT.md)

## 빠른 시작

### 1. 의존성 설치

```bash
# 프론트엔드 디렉토리로 이동
cd uriHaeyang_frontend

# 프론트엔드 의존성 설치
npm install

# 백엔드 디렉토리로 이동하여 의존성 설치
cd ../uriHaeyang_backend
npm install
```

### 2. 환경변수 설정

#### 프론트엔드 환경변수 (선택사항)
`uriHaeyang_frontend/` 디렉토리에 `.env` 파일을 생성하세요:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_WEATHER_API_KEY=your_weather_api_key_here
VITE_API_BASE_URL=http://localhost:3001
```

#### 백엔드 환경변수 (필수)
`uriHaeyang_backend/` 디렉토리에 `.env` 파일을 생성하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. 개발 서버 실행

프론트엔드와 백엔드를 **별도의 터미널**에서 실행해야 합니다.

#### 터미널 1: 프론트엔드 실행
```bash
cd uriHaeyang_frontend
npm run dev
```
프론트엔드가 포트 3000에서 실행됩니다.

#### 터미널 2: 백엔드 실행
```bash
cd uriHaeyang_backend
npm run dev
```
백엔드가 포트 3001에서 실행됩니다.

### 4. 접속

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:3001

## 주요 기능

- 🌤️ **전국 날씨**: 기상청 API를 활용한 실시간 날씨 정보
- 🌊 **해상 자료**: 해양 환경 정보 제공
- 🤖 **AI 챗봇**: OpenAI GPT를 활용한 해양 정보 챗봇

## 기술 스택

### 프론트엔드
- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router
- Tailwind CSS
- Leaflet (지도)

### 백엔드
- Node.js
- Express
- OpenAI API
- CORS

## 더 자세한 정보

- 프로젝트 구조: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- 구조 명명: [STRUCTURE_TERMINOLOGY.md](./STRUCTURE_TERMINOLOGY.md)
- 백엔드 설정: [README_BACKEND.md](./README_BACKEND.md)
