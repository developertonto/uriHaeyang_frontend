<template>
  <div class="min-h-screen text-slate-800">
    <!-- 히어로 섹션 - 캐러셀 -->
    <section class="relative h-screen overflow-hidden">
      <!-- 캐러셀 컨테이너 -->
      <div class="relative w-full h-full">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
        >
          <div class="absolute inset-0 ocean-gradient opacity-95"></div>
          <div class="absolute inset-0 wave-pattern opacity-10 mix-blend-overlay"></div>
          <div class="relative z-10 h-full flex items-center justify-center">
            <div class="text-center text-white px-4">
              <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {{ slide.title }}
              </h1>
              <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                {{ slide.description }}
              </p>
              <router-link 
                :to="slide.link"
                class="inline-flex items-center justify-center bg-white/90 text-slate-900 px-10 py-3 rounded-full font-semibold shadow-[0_16px_40px_-32px_rgba(255,255,255,0.95)] hover:bg-white transition-colors duration-200 animate-fade-in-delay-2"
              >
                {{ slide.buttonText }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 캐러셀 네비게이션 -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="goToSlide(index)"
          class="w-2.5 h-2.5 rounded-full transition-all duration-200"
          :class="currentSlide === index ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)] scale-125' : 'bg-white/40 hover:bg-white/70'"
        ></button>
      </div>

      <!-- 캐러셀 방향 버튼 -->
      <button 
        @click="handlePrev"
        class="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 z-20 backdrop-blur"
        aria-label="이전 슬라이드"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="handleNext"
        class="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 z-20 backdrop-blur"
        aria-label="다음 슬라이드"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>

    <!-- 소개 섹션 -->
    <section class="py-20 bg-white/75 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
            해양 정보 제공 시스템
          </h2>
          <p class="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            실시간 해양 기상 정보와 AI 기반 챗봇을 통해 안전하고 효율적인 해상 활동을 지원합니다.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="card text-center hover:shadow-[0_28px_50px_-36px_rgba(15,23,42,0.35)] transition-all duration-300">
            <div class="w-16 h-16 ocean-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_40px_-32px_rgba(148,163,184,0.55)]">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">{{ feature.title }}</h3>
            <p class="text-slate-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 장점 섹션 -->
    <section class="py-20 bg-slate-100/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            우리해양의 서비스
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div v-for="(advantage, index) in advantages" :key="index" class="flex items-start mb-8">
              <div class="w-12 h-12 rounded-2xl border border-slate-200/70 bg-white flex items-center justify-center mr-4 flex-shrink-0 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.4)]">
                <svg class="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ advantage.title }}</h3>
                <p class="text-slate-500 leading-relaxed">{{ advantage.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="ocean-gradient rounded-2xl p-8 text-white shadow-[0_28px_60px_-32px_rgba(15,23,42,0.8)]">
              <h3 class="text-2xl font-semibold mb-4">실시간 데이터</h3>
              <p class="text-lg mb-6 text-slate-200">기상청과 해양수산부의 최신 데이터를 실시간으로 제공합니다.</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-3xl font-semibold">24/7</div>
                  <div class="text-xs uppercase text-slate-300 mt-2">실시간 모니터링</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-semibold">99.9%</div>
                  <div class="text-xs uppercase text-slate-300 mt-2">서비스 가용성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 문의하기 섹션 -->
    <section class="py-20 bg-white/75 backdrop-blur">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          문의하기
        </h2>
        <p class="text-lg text-slate-500 mb-12 leading-relaxed">
          궁금한 점이 있으시거나 서비스 이용에 도움이 필요하시면 언제든지 연락주세요.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.55)]">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">이메일</h3>
            <p class="text-slate-500">info@urihayang.co.kr</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.55)]">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">전화</h3>
            <p class="text-slate-500">02-1234-5678</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.55)]">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">주소</h3>
            <p class="text-slate-500">서울특별시 해양구</p>
          </div>
        </div>

        <div class="card max-w-2xl mx-auto">
          <form @submit.prevent="submitContact" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2 uppercase">이름</label>
                <input 
                  v-model="contactForm.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  placeholder="이름을 입력하세요"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-2 uppercase">이메일</label>
                <input 
                  v-model="contactForm.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  placeholder="이메일을 입력하세요"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2 uppercase">제목</label>
              <input 
                v-model="contactForm.subject"
                type="text" 
                required
                class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                placeholder="제목을 입력하세요"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2 uppercase">메시지</label>
              <textarea 
                v-model="contactForm.message"
                required
                rows="4"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/80 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                placeholder="메시지를 입력하세요"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="w-full btn-primary py-3 text-lg"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '전송 중...' : '문의하기' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 캐러셀 데이터
const slides = ref([
  {
    title: '실시간 해양 정보',
    description: '전국 해역의 실시간 기상 정보와 해상 데이터를 제공합니다.',
    buttonText: '날씨 확인하기',
    link: '/weather'
  },
  {
    title: '해상 관측 자료',
    description: '기상청 해양 관측소의 최신 해상 기상 데이터를 확인하세요.',
    buttonText: '해상 자료 보기',
    link: '/seain'
  },
  {
    title: 'AI 챗봇 서비스',
    description: '해양 관련 궁금한 점을 AI 챗봇에게 물어보세요.',
    buttonText: '챗봇 시작하기',
    link: '/aichat'
  }
])

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null

const advanceSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const retreatSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index: number) => {
  currentSlide.value = (index + slides.value.length) % slides.value.length
  restartSlideShow()
}

const handleNext = () => {
  advanceSlide()
  restartSlideShow()
}

const handlePrev = () => {
  retreatSlide()
  restartSlideShow()
}

const startSlideShow = () => {
  slideInterval = setInterval(advanceSlide, 5000)
}

const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

const restartSlideShow = () => {
  stopSlideShow()
  startSlideShow()
}

// 기능 소개 데이터
const features = ref([
  {
    title: '실시간 날씨',
    description: '전국 해역의 실시간 기상 정보를 지도와 함께 확인할 수 있습니다.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    title: '해상 관측 데이터',
    description: '기상청 해양 관측소의 풍향, 풍속, 해수면 온도 등 상세 정보를 제공합니다.',
    icon: 'M2 20V8h1.5v12H2zm5 20V5h1.5v15H7zm5 20V2h1.5v18H12zm5 20V12h1.5v8H17z'
  },
  {
    title: 'AI 챗봇',
    description: '해양 관련 질문에 즉시 답변하는 AI 챗봇 서비스를 제공합니다.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  }
])

// 장점 데이터
const advantages = ref([
  {
    title: '실시간 데이터 제공',
    description: '기상청과 해양수산부의 최신 데이터를 실시간으로 업데이트하여 제공합니다.'
  },
  {
    title: '직관적인 사용자 인터페이스',
    description: '복잡한 해양 정보를 쉽게 이해할 수 있도록 직관적인 UI/UX를 제공합니다.'
  },
  {
    title: 'AI 기반 맞춤 서비스',
    description: 'ChatGPT API를 활용한 지능형 챗봇으로 개인화된 해양 정보를 제공합니다.'
  },
  {
    title: '모바일 최적화',
    description: '스마트폰과 태블릿에서도 편리하게 사용할 수 있도록 반응형 디자인을 적용했습니다.'
  }
])

// 문의하기 폼
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitContact = async () => {
  isSubmitting.value = true
  
  try {
    // 실제 구현에서는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    
    // 폼 초기화
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  stopSlideShow()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 1s ease-out 0.4s both;
}
</style>
