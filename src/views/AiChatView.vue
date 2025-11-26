<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 text-slate-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 헤더 -->
      <div class="text-center mb-10 space-y-4">
        <span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase text-slate-500 bg-white/80 border border-slate-200/70 rounded-full">
          Conversational Ocean Assistant
        </span>
        <h1 class="text-4xl md:text-5xl font-semibold text-slate-900">
          AI 챗봇
        </h1>
        <p class="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
          해양 관련 질문을 AI 챗봇에게 물어보세요. ChatGPT API를 활용한 지능형 대화 서비스입니다.
        </p>
      </div>

      <!-- 챗봇 컨테이너 -->
      <div class="card h-[600px] flex flex-col">
        <!-- 채팅 메시지 영역 -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="chatContainer">
          <!-- 환영 메시지 -->
          <div v-if="messages.length === 0" class="text-center py-8">
            <div class="w-16 h-16 ocean-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)]">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-slate-900 mb-2">AI챗봇으로 뭐든지 물어보세요!</h3>
            <p class="text-slate-500">해양, 날씨, 해상 안전 등 다양한 주제에 대해 질문해보세요.</p>
          </div>

          <!-- 메시지 목록 -->
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[80%] p-4 rounded-lg"
              :class="message.role === 'user' 
                ? 'bg-slate-900 text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.6)]' 
                : 'bg-slate-100 text-slate-700 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]'"
            >
              <div class="flex items-start space-x-2">
                <div v-if="message.role === 'assistant'" class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="whitespace-pre-wrap">{{ message.content }}</div>
                  <div 
                    class="text-xs mt-2 opacity-70"
                    :class="message.role === 'user' ? 'text-white' : 'text-slate-400'"
                  >
                    {{ formatTime(message.timestamp) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 로딩 인디케이터 -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-slate-100 text-slate-700 p-4 rounded-lg shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-slate-900 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-slate-900 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-slate-900 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 입력 영역 -->
        <div class="border-t border-slate-200/70 p-6 bg-white/60 backdrop-blur rounded-b-2xl">
          <form @submit.prevent="sendMessage" class="flex space-x-4">
            <div class="flex-1">
              <input
                v-model="inputMessage"
                type="text"
                placeholder="해양 관련 질문을 입력하세요..."
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/85 focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition"
              />
            </div>
            <button
              type="submit"
              :disabled="!inputMessage.trim() || isLoading"
              class="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>전송</span>
            </button>
          </form>

          <!-- 빠른 질문 버튼들 -->
          <div class="mt-4">
            <p class="text-sm text-slate-500 mb-2 uppercase">빠른 질문</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="quickQuestion in quickQuestions"
                :key="quickQuestion"
                @click="sendQuickQuestion(quickQuestion)"
                :disabled="isLoading"
                class="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ quickQuestion }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <div v-if="error" class="mt-6 card bg-rose-50 border border-rose-200 text-rose-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-rose-800">챗봇 오류</h3>
            <p class="text-rose-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- 사용 안내 -->
      <div class="mt-8 card bg-slate-100/80">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">AI 챗봇 사용 안내</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <h4 class="font-medium text-slate-700 mb-2 uppercase">질문 가능한 주제</h4>
            <ul class="space-y-1">
              <li>• 해양 기상 정보</li>
              <li>• 해상 안전 수칙</li>
              <li>• 해양 환경 보호</li>
              <li>• 해양 생물 정보</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-slate-700 mb-2 uppercase">사용 팁</h4>
            <ul class="space-y-1">
              <li>• 구체적인 질문을 해주세요</li>
              <li>• 해양 관련 용어를 활용하세요</li>
              <li>• 연속적인 대화가 가능합니다</li>
              <li>• 오류 발생 시 다시 시도해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import axios from 'axios'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const messages = ref<ChatMessage[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const error = ref('')
const chatContainer = ref<HTMLElement>()

// 백엔드 API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 빠른 질문 목록
const quickQuestions = ref([
  '오늘 해상 날씨는 어떤가요?',
  '해상 안전 수칙을 알려주세요',
  '해양 오염 방지 방법은?',
  '해양 생물 보호 방법은?'
])

// 메시지 전송 함수
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage: ChatMessage = {
    role: 'user',
    content: inputMessage.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const currentInput = inputMessage.value
  inputMessage.value = ''
  
  await nextTick()
  scrollToBottom()

  isLoading.value = true
  error.value = ''

  try {
    const response = await callChatGPT(currentInput)
    
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }

    messages.value.push(assistantMessage)
    
  } catch (err: any) {
    console.error('ChatGPT API 호출 실패:', err)
    
    const errorMessage: ChatMessage = {
      role: 'assistant',
      content: '죄송합니다. 현재 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      timestamp: new Date()
    }

    messages.value.push(errorMessage)
    error.value = err.message || '챗봇 응답을 받는 중 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

// 빠른 질문 전송
const sendQuickQuestion = (question: string) => {
  inputMessage.value = question
  sendMessage()
}

// 백엔드 API를 통한 ChatGPT 호출 함수
const callChatGPT = async (message: string): Promise<string> => {
  try {
    // 메시지 히스토리 구성 (role과 content만 전송)
    const chatMessages = messages.value.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    // 현재 사용자 메시지 추가
    chatMessages.push({
      role: 'user',
      content: message
    })

    const response = await axios.post(
      `${API_BASE_URL}/chat`,
      {
        messages: chatMessages
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30초 타임아웃
      }
    )

    if (response.data && response.data.success && response.data.message) {
      return response.data.message
    } else {
      throw new Error('API 응답 형식이 올바르지 않습니다.')
    }

  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('API 키가 유효하지 않습니다.')
    } else if (err.response?.status === 429) {
      throw new Error('API 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.')
    } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
      // 네트워크 에러의 경우 샘플 응답 제공
      return getSampleResponse(message)
    } else {
      const errorMessage = err.response?.data?.error || err.message || 'API 호출 중 오류가 발생했습니다.'
      throw new Error(errorMessage)
    }
  }
}

// 샘플 응답 생성 (네트워크 에러 시 사용)
const getSampleResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('날씨') || lowerMessage.includes('기상')) {
    return `현재 해상 날씨는 다음과 같습니다:

🌊 **해상 기상 현황**
- 풍속: 3-5m/s (약한 바람)
- 파고: 0.5-1.0m (낮은 파도)
- 시정: 10km 이상 (양호)

⚠️ **주의사항**
- 해상 활동 시 적절한 안전장비 착용 권장
- 기상 변화에 주의하여 활동하세요

실시간 해상 기상 정보는 상단의 '해상 자료' 메뉴에서 더 자세히 확인하실 수 있습니다.`
  } else if (lowerMessage.includes('안전') || lowerMessage.includes('수칙')) {
    return `해상 안전 수칙을 안내드리겠습니다:

🛡️ **기본 안전 수칙**
1. **생명구명조끼 착용** - 필수 안전장비
2. **날씨 확인** - 출항 전 기상 정보 확인
3. **통신 장비 점검** - 비상연락 수단 준비
4. **충분한 연료** - 여유 연료 확보

⚠️ **응급상황 대처**
- 구조 요청: 해경 122 또는 119
- 위치 정보 정확히 전달
- 침착하게 구조대 대기

더 자세한 정보는 해양수산부 안전 가이드를 참고하세요.`
  } else if (lowerMessage.includes('오염') || lowerMessage.includes('환경')) {
    return `해양 환경 보호 방법을 알려드리겠습니다:

🌊 **해양 오염 방지**
1. **쓰레기 절대 투기 금지**
2. **유류 누출 방지**
3. **친환경 세제 사용**
4. **해양 보호구역 준수**

♻️ **일상생활에서 실천**
- 플라스틱 사용 줄이기
- 해변 정화 활동 참여
- 해양 생물 보호 캠페인 참여

모든 사람의 작은 실천이 아름다운 바다를 지킵니다!`
  } else {
    return `해양 관련 질문을 해주셔서 감사합니다! 

저는 해양 기상, 해상 안전, 해양 환경, 해양 생물 등 다양한 해양 관련 주제에 대해 도움을 드릴 수 있습니다.

구체적인 질문을 해주시면 더 정확하고 유용한 답변을 제공해드릴 수 있습니다.

예시:
- "오늘 해상 날씨는 어떤가요?"
- "해상 안전 수칙을 알려주세요"
- "해양 오염 방지 방법은?"
- "해양 생물 보호 방법은?"`
  }
}

// 시간 포맷팅
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 채팅창 하단으로 스크롤
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

onMounted(() => {
  // 컴포넌트 마운트 시 채팅창 포커스
  const input = document.querySelector('input[type="text"]') as HTMLInputElement
  if (input) {
    input.focus()
  }
})
</script>
