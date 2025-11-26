<template>
  <footer class="mt-24 bg-slate-950 text-slate-200 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_55%)] pointer-events-none"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- 로고 및 설명 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-11 h-11 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_18px_40px_-28px_rgba(148,163,184,0.6)] flex items-center justify-center">
              <svg class="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 7.5L12 3l8 4.5M4 7.5v9L12 21l8-4.5v-9M12 12l8-4.5M12 12v9M12 12L4 7.5"/>
              </svg>
            </div>
            <div>
              <p class="text-lg font-semibold tracking-tight text-white">URI HAEYANG</p>
              <p class="text-xs uppercase text-slate-400">Ocean Intelligence</p>
            </div>
          </div>
          <p class="text-slate-400 mb-6 max-w-md leading-relaxed">
            대한민국의 해양 환경과 기상 정보를 실시간으로 제공하여 
            안전하고 효율적인 해상 활동을 지원합니다.
          </p>
          <div class="flex items-center gap-3 text-xs uppercase text-slate-500">
            <span class="inline-flex px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium">since 2024</span>
            <span>지속가능한 해양 데이터 허브</span>
          </div>
        </div>

        <!-- 서비스 정보 -->
        <div>
          <h3 class="text-sm font-semibold uppercase text-slate-400 mb-5">서비스</h3>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/weather" class="text-slate-400 hover:text-slate-200 transition-colors duration-200">전국 날씨</router-link></li>
            <li><router-link to="/seain" class="text-slate-400 hover:text-slate-200 transition-colors duration-200">해상 자료</router-link></li>
            <li><router-link to="/aichat" class="text-slate-400 hover:text-slate-200 transition-colors duration-200">AI 챗봇</router-link></li>
          </ul>
        </div>

        <!-- 연락처 정보 -->
        <div>
          <h3 class="text-sm font-semibold uppercase text-slate-400 mb-5">연락처</h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li class="flex flex-col"><span class="text-xs uppercase text-slate-500 mb-1">이메일</span>info@urihayang.co.kr</li>
            <li class="flex flex-col"><span class="text-xs uppercase text-slate-500 mb-1">전화</span>02-1234-5678</li>
            <li class="flex flex-col"><span class="text-xs uppercase text-slate-500 mb-1">주소</span>서울특별시 해양구</li>
          </ul>
        </div>
      </div>

      <!-- 하단 구분선 -->
      <div class="border-t border-white/10 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-500 text-xs uppercase">
            © 2024 우리해양. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm">개인정보처리방침</a>
            <a href="#" class="text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm">이용약관</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 컴포넌트
</script>
