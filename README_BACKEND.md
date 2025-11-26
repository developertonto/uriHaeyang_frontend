# 백엔드 서버 설정 가이드

## 개요
프론트엔드에서 직접 호출하던 OpenAI API를 Node.js 백엔드 서버로 이동했습니다.

## 설치 및 실행

### 1. 백엔드 의존성 설치
```bash
cd server
npm install
```

### 2. 환경변수 설정
`server` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. 백엔드 서버 실행
```bash
npm run dev
```

서버가 포트 3001에서 실행됩니다.

## API 엔드포인트

### POST /api/chat
AI 챗봇 메시지 전송

**요청:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "오늘 해상 날씨는 어떤가요?"
    }
  ]
}
```

**응답:**
```json
{
  "success": true,
  "message": "AI 응답 메시지..."
}
```

### GET /api/health
서버 상태 확인

**응답:**
```json
{
  "status": "ok",
  "message": "서버가 정상적으로 동작 중입니다."
}
```

## 프로젝트 구조

```
urihaeyang-main/
├── server/              # 백엔드 서버
│   ├── index.js        # Express 서버 메인 파일
│   ├── package.json    # 백엔드 의존성
│   └── .env           # 환경변수 (gitignore)
├── src/               # 프론트엔드
│   └── views/
│       └── AiChatView.vue  # AI 챗봇 화면
└── vite.config.ts     # Vite 설정 (프록시 포함)
```

## 개발 워크플로우

1. **백엔드 서버 시작**: `cd server && npm run dev`
2. **프론트엔드 시작**: 루트 디렉토리에서 `npm run dev`
3. 프론트엔드의 `/api/chat` 요청은 자동으로 백엔드 서버로 프록시됩니다.

## 주의사항

- OpenAI API 키는 절대 프론트엔드에 노출되지 않습니다.
- 백엔드 서버는 별도의 포트(3001)에서 실행됩니다.
- CORS 설정으로 프론트엔드에서만 접근 가능합니다.

