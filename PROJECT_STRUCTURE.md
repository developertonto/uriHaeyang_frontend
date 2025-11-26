# 프로젝트 구조 설명

## 현재 구조

```
urihaeyang-main/
├── package.json          # 프론트엔드 의존성 및 스크립트
├── src/                  # Vue.js 프론트엔드 소스
├── server/               # Node.js 백엔드 서버
│   ├── package.json      # 백엔드 의존성 및 스크립트
│   ├── index.js          # Express 서버 메인 파일
│   └── .env             # 백엔드 환경변수
└── vite.config.ts        # Vite 설정 (프록시 포함)
```

## 구조 선택 가이드

### ✅ 현재 구조 (현재 사용 중)
**장점:**
- 간단하고 직관적
- 각 디렉토리가 독립적으로 관리
- 작은~중간 규모 프로젝트에 적합

**단점:**
- 프론트/백엔드를 따로 실행해야 함
- 의존성 관리가 분리됨

### 🔄 Monorepo 구조 (개선 옵션)

```
urihaeyang-main/
├── package.json          # 루트 워크스페이스
├── frontend/             # 또는 현재 루트에 유지
│   └── package.json
└── backend/              # server 대신 backend
    └── package.json
```

**장점:**
- 통합된 의존성 관리
- 프론트/백엔드 동시 실행 편리
- 더 체계적인 구조

**단점:**
- 초기 설정이 복잡
- 구조 변경 필요

## 권장사항

현재 프로젝트 규모라면 **현재 구조도 충분히 좋습니다**. 다만 다음과 같은 개선을 권장합니다:

1. ✅ 루트 package.json에 통합 스크립트 추가 (완료)
2. ✅ 프론트/백엔드 동시 실행 스크립트 (완료)
3. ⚠️ 필요시 concurrently 패키지 추가 (Windows 호환성)

## 실행 방법

### 옵션 1: 개별 실행
```bash
# 백엔드 (터미널 1)
cd server
npm install
npm run dev

# 프론트엔드 (터미널 2)
npm install
npm run dev
```

### 옵션 2: 통합 스크립트
```bash
# 모든 의존성 설치
npm run install:all

# 프론트엔드만
npm run dev:frontend

# 백엔드만
npm run dev:backend
```

## 결론

**현재 구조(`server/` 서브디렉토리)는 유효한 선택입니다!**

- 작은~중간 규모 프로젝트에서 자주 사용됨
- Vue.js 공식 문서에서도 권장하는 방식
- 별도 저장소로 분리하기 전 단계로 적합

더 체계적인 구조가 필요하다면 Monorepo로 전환할 수 있지만, 현재 구조로도 충분히 관리 가능합니다.

