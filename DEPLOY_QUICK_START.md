# 🚀 빠른 배포 가이드 (5분 안에!)

가장 간단한 방법: **Vercel (프론트) + Railway (백엔드)**

---

## ⚡ 빠른 배포 (3단계)

### 1️⃣ GitHub에 업로드

```bash
git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

---

### 2️⃣ 백엔드 배포 (Railway) - 2분

1. https://railway.app 접속 → GitHub로 로그인
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택
4. **설정 변경:**
   - ⚙️ Settings → Root Directory: `server`
5. **환경변수 추가** (Variables 탭):
   ```
   OPENAI_API_KEY=여기에_API_키_입력
   PORT=3001
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
6. 🎉 **백엔드 URL 복사** (예: `https://xxx.railway.app`)

---

### 3️⃣ 프론트엔드 배포 (Vercel) - 2분

1. https://vercel.com 접속 → GitHub로 로그인
2. "Add New Project" → 저장소 선택
3. **설정 확인:**
   - Framework: Vite (자동 감지)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **환경변수 추가:**
   ```
   VITE_API_BASE_URL=https://xxx.railway.app/api
   ```
   (위에서 복사한 Railway URL 사용)
5. Deploy 클릭! 🎉

---

### ✅ 완료!

이제 사이트가 배포되었습니다!

- **프론트엔드**: Vercel이 제공하는 URL
- **백엔드**: Railway URL

---

## 🔄 백엔드 CORS 설정 업데이트

Railway로 돌아가서:
1. Variables 탭
2. `FRONTEND_URL`을 Vercel URL로 변경
3. 재배포

---

## 📝 중요 체크리스트

배포 전:
- [ ] `.env` 파일은 Git에 커밋 안됨 (.gitignore 확인)
- [ ] `npm run build` 로컬에서 성공하는지 확인
- [ ] API 키 준비됨

배포 후:
- [ ] 프론트엔드 URL 확인
- [ ] 백엔드 URL 확인
- [ ] Railway에서 `FRONTEND_URL` 업데이트

---

## 🆘 문제 해결

**CORS 에러?**
- Railway의 `FRONTEND_URL`이 Vercel URL과 일치하는지 확인

**API 연결 안됨?**
- Vercel 환경변수 `VITE_API_BASE_URL` 확인
- Railway URL이 맞는지 확인 (끝에 `/api` 포함)

**빌드 실패?**
- Railway: Root Directory가 `server`인지 확인
- Vercel: Build Command가 `npm run build`인지 확인

---

## 💡 팁

- 코드 수정 후 GitHub에 푸시하면 **자동 재배포**됨
- 무료 티어로 충분히 사용 가능
- 필요시 도메인 연결 가능

더 자세한 내용은 `DEPLOYMENT.md` 참고!

