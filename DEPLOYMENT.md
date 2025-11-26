# 배포 가이드 (간단한 방법)

가장 간단하게 배포하는 방법: **Vercel (프론트엔드) + Railway (백엔드)**

## 🚀 배포 옵션

### 옵션 1: Vercel + Railway (추천 ⭐)

**장점:**
- ✅ 완전 무료 (개인 프로젝트)
- ✅ 자동 배포 (Git 연동)
- ✅ 매우 간단한 설정
- ✅ 각각 최적화된 플랫폼 사용

**단점:**
- 프론트엔드와 백엔드가 다른 도메인

---

## 📋 배포 단계

### 1단계: GitHub에 코드 업로드

1. GitHub 저장소 생성
2. 코드 푸시:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

### 2단계: 백엔드 배포 (Railway)

#### 2-1. Railway 가입 및 프로젝트 생성

1. https://railway.app 접속 및 로그인 (GitHub 계정으로 가능)
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. GitHub 저장소 선택
5. 설정:
   - **Root Directory**: `server` 선택
   - **Start Command**: 자동 감지됨 (또는 `npm start`)

#### 2-2. 환경변수 설정 (Railway)

Railway 대시보드에서:
1. 프로젝트 선택
2. "Variables" 탭 클릭
3. 다음 환경변수 추가:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app
```

**중요:** `FRONTEND_URL`은 나중에 프론트엔드 배포 후 업데이트 필요

#### 2-3. 도메인 확인

Railway가 자동으로 생성한 URL 확인:
- 예: `https://your-app.railway.app`
- 이 URL을 메모해두세요! (프론트엔드 설정에 필요)

---

### 3단계: 프론트엔드 배포 (Vercel)

#### 3-1. Vercel 가입 및 프로젝트 생성

1. https://vercel.com 접속 및 로그인 (GitHub 계정으로 가능)
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 설정:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 3-2. 환경변수 설정 (Vercel)

프로젝트 설정에서:
1. "Settings" → "Environment Variables" 클릭
2. 다음 환경변수 추가:

```
VITE_API_BASE_URL=https://your-backend.railway.app/api
```

**중요:** `your-backend.railway.app`은 Railway에서 받은 백엔드 URL

#### 3-3. CORS 설정 업데이트

Railway로 돌아가서:
1. "Variables" 탭
2. `FRONTEND_URL`을 Vercel URL로 업데이트:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Railway 서비스 재시작

---

## 🎉 완료!

이제 배포가 완료되었습니다!

- **프론트엔드**: `https://your-frontend.vercel.app`
- **백엔드**: `https://your-backend.railway.app`

---

## 🔄 업데이트 배포

코드를 수정하고 푸시하면 자동으로 재배포됩니다:

```bash
git add .
git commit -m "Update"
git push
```

---

## 💡 대안: Railway만 사용하기

**Railway에서 프론트엔드와 백엔드 모두 배포**하는 방법도 있습니다:

### Railway에서 프론트엔드 배포

1. Railway에 새 서비스 추가
2. 같은 GitHub 저장소 연결
3. 설정:
   - **Root Directory**: `./` (프론트엔드)
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview` (또는 정적 파일 서빙)
   - **Output Directory**: `dist`

### 단점

- Vercel보다 프론트엔드 배포 설정이 복잡함
- 정적 파일 서빙을 위한 추가 설정 필요

---

## 📝 배포 전 체크리스트

배포 전에 다음을 확인하세요:

- [ ] GitHub에 코드 푸시 완료
- [ ] `server/.env` 파일은 `.gitignore`에 포함 (Git에 커밋 안됨)
- [ ] 환경변수 모두 설정 완료
- [ ] 로컬에서 빌드 테스트: `npm run build`
- [ ] API 키 유효성 확인

---

## 🐛 문제 해결

### 프론트엔드에서 백엔드 연결 안됨

1. CORS 에러 확인:
   - Railway의 `FRONTEND_URL`이 올바른가?
   - Vercel URL과 일치하는가?

2. 환경변수 확인:
   - Vercel의 `VITE_API_BASE_URL`이 올바른가?
   - Railway URL이 정확한가? (끝에 `/api` 포함)

### Railway 배포 실패

1. Root Directory 확인: `server`로 설정되어 있는가?
2. Start Command 확인: `npm start` 또는 자동 감지
3. 환경변수 확인: `OPENAI_API_KEY` 설정되어 있는가?

### Vercel 빌드 실패

1. Build Command 확인: `npm run build`
2. Node.js 버전 확인: Vercel 설정에서 확인
3. 의존성 문제: `package.json` 확인

---

## 💰 비용

### 무료 티어

- **Vercel**: 무제한 (개인 프로젝트)
- **Railway**: $5 크레딧/월 (충분함)

### 유료 업그레이드

대규모 트래픽이나 상업적 용도 시:
- Vercel Pro: $20/월
- Railway Pro: $5/월부터

---

## 📚 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Railway 문서](https://docs.railway.app)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

