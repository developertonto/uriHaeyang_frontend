<template>
  <div class="min-h-screen bg-gradient-to-br from-ocean-50 to-wave-100 flex items-center justify-center py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- 404 아이콘 -->
      <div class="mb-8">
        <div class="w-32 h-32 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <div class="mb-8">
        <h1 class="text-6xl md:text-8xl font-bold text-ocean-600 mb-4">404</h1>
        <h2 class="text-2xl md:text-3xl font-bold text-wave-800 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p class="text-lg text-wave-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br>
          아래 버튼을 통해 다른 페이지로 이동해보세요.
        </p>
      </div>

      <!-- 액션 버튼들 -->
      <div class="space-y-4 mb-8">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/" 
            class="btn-primary px-8 py-3 text-lg flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>홈으로 돌아가기</span>
          </router-link>
          
          <button 
            @click="goBack"
            class="btn-secondary px-8 py-3 text-lg flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>이전 페이지</span>
          </button>
        </div>
      </div>

      <!-- 서비스 링크 -->
      <div class="card bg-white/80 backdrop-blur-sm">
        <h3 class="text-lg font-semibold text-wave-800 mb-4">인기 서비스</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <router-link 
            to="/weather" 
            class="flex items-center space-x-3 p-4 bg-ocean-50 hover:bg-ocean-100 rounded-lg transition-colors duration-200 group"
          >
            <div class="w-10 h-10 bg-ocean-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-700 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="text-left">
              <h4 class="font-medium text-wave-800">전국 날씨</h4>
              <p class="text-sm text-wave-600">실시간 기상 정보</p>
            </div>
          </router-link>

          <router-link 
            to="/seain" 
            class="flex items-center space-x-3 p-4 bg-ocean-50 hover:bg-ocean-100 rounded-lg transition-colors duration-200 group"
          >
            <div class="w-10 h-10 bg-ocean-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-700 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div class="text-left">
              <h4 class="font-medium text-wave-800">해상 자료</h4>
              <p class="text-sm text-wave-600">해양 관측 데이터</p>
            </div>
          </router-link>

          <router-link 
            to="/aichat" 
            class="flex items-center space-x-3 p-4 bg-ocean-50 hover:bg-ocean-100 rounded-lg transition-colors duration-200 group"
          >
            <div class="w-10 h-10 bg-ocean-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-700 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="text-left">
              <h4 class="font-medium text-wave-800">AI 챗봇</h4>
              <p class="text-sm text-wave-600">해양 정보 상담</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 도움말 -->
      <div class="mt-8 text-center">
        <p class="text-sm text-wave-500 mb-2">
          계속해서 문제가 발생하시나요?
        </p>
        <a 
          href="mailto:info@urihayang.co.kr" 
          class="text-ocean-600 hover:text-ocean-700 font-medium text-sm transition-colors duration-200"
        >
          고객지원팀에 문의하기
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // 브라우저 히스토리가 있는 경우 이전 페이지로, 없는 경우 홈으로
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
