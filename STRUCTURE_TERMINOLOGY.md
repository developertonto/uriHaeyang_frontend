# 프로젝트 구조 명명 (Terminology)

## 현재 프로젝트 구조의 정확한 명명

현재 프로젝트 구조는 다음과 같이 명명할 수 있습니다:

### 1. **Multi-package Repository** (다중 패키지 저장소)
   - **정의**: 하나의 저장소 안에 여러 개의 독립적인 패키지가 있는 구조
   - **특징**: 각 패키지가 자체 `package.json`을 가짐
   - **예시**: 현재 프로젝트 (루트 + server/)

### 2. **Co-located Packages** (공동 위치 패키지)
   - **정의**: 프론트엔드와 백엔드가 같은 저장소에 위치하지만 독립적으로 관리됨
   - **특징**: 단일 저장소에서 관리하지만 완전히 분리된 패키지

### 3. **Hybrid Repository Structure** (하이브리드 저장소 구조)
   - **정의**: Monorepo와 Polyrepo의 중간 형태
   - **특징**: 완전한 monorepo 도구 없이 여러 패키지를 포함

### 4. **Single Repository with Separate Frontend/Backend**
   - **정의**: 하나의 저장소에 프론트엔드와 백엔드가 분리되어 있는 구조
   - **가장 정확한 명명**

## 구조 비교

### ❌ 현재는 **아닌 것들**:

1. **Monorepo (모노레포)**
   - ❌ npm/yarn workspace 설정 없음
   - ❌ Lerna, Nx, Turborepo 같은 도구 없음
   - ✅ 단일 저장소에 여러 패키지 (부분적으로만 해당)

2. **Polyrepo (폴리레포)**
   - ❌ 완전히 별도의 저장소
   - ✅ 각 패키지가 독립적 (부분적으로만 해당)

### ✅ 현재 구조의 정확한 분류:

**"Multi-package Single Repository"** 또는
**"Co-located Frontend/Backend Repository"**

## 구조 계층도

```
urihaeyang-main/                    ← Single Repository
├── package.json                    ← Root Package (Frontend)
├── src/                           ← Frontend Application
│   └── ...
└── server/                        ← Backend Package
    ├── package.json               ← Independent Package
    └── index.js
```

## 명명 규칙

### 영어 용어
- **Primary Term**: Multi-package Repository
- **Alternative**: Co-located Packages Structure
- **Descriptive**: Single Repository with Separate Frontend/Backend

### 한국어 용어
- **주요 용어**: 다중 패키지 저장소
- **대안**: 공동 위치 패키지 구조
- **설명형**: 프론트엔드/백엔드 분리 단일 저장소

## 일반적인 구조 유형

### 1. Monorepo (모노레포)
```
project/
├── packages/
│   ├── frontend/
│   └── backend/
└── package.json (workspace)
```
- **특징**: workspace 설정, 통합 빌드 도구
- **예시**: Nx, Turborepo, Lerna 프로젝트

### 2. Polyrepo (폴리레포)
```
project-frontend/  (별도 저장소)
project-backend/   (별도 저장소)
```
- **특징**: 완전히 독립적인 저장소들
- **예시**: 마이크로서비스 아키텍처

### 3. Multi-package Repository (현재 구조)
```
project/
├── src/           (frontend)
└── server/        (backend, 독립 패키지)
```
- **특징**: 단일 저장소, 독립 패키지, 간단한 구조
- **예시**: 현재 프로젝트 ⭐

## 결론

현재 프로젝트 구조는:
- **정확한 명명**: **"Multi-package Repository"** 또는 **"Co-located Packages Structure"**
- **한국어**: **"다중 패키지 저장소"** 또는 **"공동 위치 패키지 구조"**
- **설명**: 하나의 저장소에 프론트엔드와 백엔드가 독립적인 패키지로 존재하는 구조

이는 **작은~중간 규모 프로젝트에서 매우 일반적이고 권장되는 구조**입니다! ✅

