<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_-28px_rgba(15,23,42,0.65)] border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <div class="flex items-center space-x-3">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.6)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <!-- 배경 사각형 (남색) -->
                <rect x="0" y="0" width="64" height="64" fill="#323B4C" rx="8" ry="8"/>

                <!-- 테두리 프레임 -->
                <rect x="4" y="4" width="56" height="56" rx="6" ry="6"/>

                <!-- 파도 3줄 -->
                <path d="M7 44c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4 6-4 10-4"/>
                <path d="M7 50c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4 6-4 10-4" opacity="0.8"/>
                <path d="M7 56c4 0 6-4 10-4s6 4 10 4 6-4 10-4 6 4 10 4 6-4 10-4" opacity="0.6"/>

                <!-- 중심 마크 -->
                <circle cx="32" cy="22" r="6"/>
                <line x1="32" y1="12" x2="32" y2="7"/>
                <line x1="32" y1="37" x2="32" y2="32"/>
                <line x1="21" y1="21" x2="16" y2="21"/>
                <line x1="48" y1="21" x2="43" y2="21"/>
            </svg>
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-lg font-semibold tracking-tight text-slate-900">URI HAEYANG</span>
              <span class="text-xs uppercase tracking-[0.32em] text-slate-400">Ocean Information</span>
            </div>
          </router-link>
        </div>

        <!-- 네비게이션 메뉴 -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/weather" 
            class="inline-flex items-center h-10 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 border-b-2 border-transparent"
            :class="{ 'text-slate-900 border-slate-900': $route.path === '/weather' }"
          >
            전국 날씨
          </router-link>
          <router-link 
            to="/seain" 
            class="inline-flex items-center h-10 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 border-b-2 border-transparent"
            :class="{ 'text-slate-900 border-slate-900': $route.path === '/seain' }"
          >
            해상 자료
          </router-link>
          <router-link 
            to="/aichat" 
            class="inline-flex items-center h-10 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 border-b-2 border-transparent"
            :class="{ 'text-slate-900 border-slate-900': $route.path === '/aichat' }"
          >
            AI 챗봇
          </router-link>
        </nav>

        <!-- 모바일 메뉴 버튼 -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-slate-500 hover:text-slate-900 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 모바일 메뉴 -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-slate-200/80 py-4">
        <nav class="flex flex-col space-y-4">
          <router-link 
            to="/weather" 
            @click="closeMobileMenu"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
            :class="{ 'text-slate-900': $route.path === '/weather' }"
          >
            전국 날씨
          </router-link>
          <router-link 
            to="/seain" 
            @click="closeMobileMenu"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
            :class="{ 'text-slate-900': $route.path === '/seain' }"
          >
            해상 자료
          </router-link>
          <router-link 
            to="/aichat" 
            @click="closeMobileMenu"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
            :class="{ 'text-slate-900': $route.path === '/aichat' }"
          >
            AI 챗봇
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
