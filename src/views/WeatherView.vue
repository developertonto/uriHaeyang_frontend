<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-12 text-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 헤더 -->
      <div class="text-center mb-12 space-y-3">
        <span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase text-slate-500 bg-white/80 border border-slate-200/80 rounded-full">
          Weather Insight
        </span>
        <h1 class="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
          전국 날씨
        </h1>
        <p class="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          대한민국 전국의 실시간 기상 정보를 확인하세요. 
          해양 관측소와 육상 기상 관측소의 데이터를 통합하여 제공합니다.
        </p>
      </div>

      <!-- 현재 위치의 날씨 -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">현재 위치의 날씨</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card modern-card">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-semibold uppercase text-slate-500 mb-2">현재 온도</p>
                <p class="text-3xl font-semibold text-slate-900">{{ currentLocationWeather.temperature }}°C</p>
              </div>
              <div class="w-12 h-12 bg-slate-100/80 border border-slate-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="card modern-card">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-semibold uppercase text-slate-500 mb-2">풍속</p>
                <p class="text-3xl font-semibold text-slate-900">{{ currentLocationWeather.windSpeed }} m/s</p>
              </div>
              <div class="w-12 h-12 bg-slate-100/80 border border-slate-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="card modern-card">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-semibold uppercase text-slate-500 mb-2">습도</p>
                <p class="text-3xl font-semibold text-slate-900">{{ currentLocationWeather.humidity }}%</p>
              </div>
              <div class="w-12 h-12 bg-slate-100/80 border border-slate-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="card modern-card">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-semibold uppercase text-slate-500 mb-2">기압</p>
                <p class="text-3xl font-semibold text-slate-900">{{ currentLocationWeather.pressure }} hPa</p>
              </div>
              <div class="w-12 h-12 bg-slate-100/80 border border-slate-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 지도 컨테이너 -->
      <div class="card modern-card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-slate-900">전국 기상 지도</h2>
          <button 
            @click="refreshWeatherData"
            :disabled="isLoading"
            class="refresh-button flex items-center space-x-2"
          >
            <svg 
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'animate-spin': isLoading }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isLoading ? '업데이트 중...' : '데이터 새로고침' }}</span>
          </button>
        </div>

        <!-- 지도 -->
        <div class="relative">
          <div 
            id="map" 
            class="w-full h-96 rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm"
          ></div>
          
          <!-- 지도 로딩 오버레이 -->
          <div 
            v-if="isLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-lg rounded-2xl flex items-center justify-center"
          >
            <div class="text-center">
              <div class="w-8 h-8 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p class="text-slate-500 text-sm font-medium tracking-tight">지도를 불러오는 중...</p>
            </div>
          </div>
        </div>

        <!-- 지도 범례 -->
        <div class="mt-6 p-5 bg-white/70 border border-slate-200/70 rounded-2xl shadow-sm">
          <h3 class="text-sm font-semibold text-slate-600 mb-3 uppercase">범례</h3>
          <div class="flex flex-wrap gap-5 text-xs text-slate-500">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-sky-400 shadow-sm ring-1 ring-white/80"></div>
              <span>0도 이하 (영하)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-red-500 shadow-sm ring-1 ring-white/80"></div>
              <span>0도 초과 (영상)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 지역별 날씨 정보 -->
      <div class="mt-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h2 class="text-2xl font-semibold text-slate-900">지역별 날씨 현황</h2>
          <p class="text-sm text-slate-500">지역별 세부 기상 데이터를 한눈에 확인하세요.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="region in regionalWeather" 
            :key="region.name"
            class="card modern-card hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900">{{ region.name }}</h3>
              <div class="text-right">
                <p class="text-2xl font-semibold text-slate-900">{{ region.temperature }}°C</p>
                <p class="text-sm text-slate-500">{{ region.condition }}</p>
              </div>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-500">풍속</span>
                <span class="font-medium text-slate-700">{{ region.windSpeed }} m/s</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">습도</span>
                <span class="font-medium text-slate-700">{{ region.humidity }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">기압</span>
                <span class="font-medium text-slate-700">{{ region.pressure }} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as L from 'leaflet'
import axios from 'axios'
import { getWeatherApiKey } from '@/utils/env'

// Leaflet CSS는 이미 index.html에서 로드됨

interface WeatherData {
  temperature: number
  windSpeed: number
  humidity: number
  pressure: number
  condition: string
}

interface RegionalWeather extends WeatherData {
  name: string
}

const isLoading = ref(false)
const map = ref<L.Map | null>(null)
const mapMarkers = ref<L.Marker[]>([])

// 현재 위치 날씨 데이터
const currentLocationWeather = ref<WeatherData>({
  temperature: 0,
  windSpeed: 0,
  humidity: 0,
  pressure: 0,
  condition: '로딩 중...'
})

// 지역별 날씨 데이터
const regionalWeather = ref<RegionalWeather[]>([
  {
    name: '서울',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '부산',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '제주',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '울산',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '인천',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '광주',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '대전',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  },
  {
    name: '천안',
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    pressure: 0,
    condition: '로딩 중...'
  }
])

// 지역별 좌표 정보
const regionCoordinates: { [key: string]: { lat: number; lng: number } } = {
  '서울': { lat: 37.5665, lng: 126.9780 },
  '부산': { lat: 35.1796, lng: 129.0756 },
  '제주': { lat: 33.4996, lng: 126.5312 },
  '울산': { lat: 35.5384, lng: 129.3114 },
  '인천': { lat: 37.4563, lng: 126.7052 },
  '광주': { lat: 35.1595, lng: 126.8526 },
  '대전': { lat: 36.3504, lng: 127.3845 },
  '천안': { lat: 36.8151, lng: 127.1139 }
}

// IP 위치 가져오기
const getCurrentLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await axios.get('https://ipapi.co/json/')
    if (response.data && response.data.latitude && response.data.longitude) {
      return {
        lat: response.data.latitude,
        lng: response.data.longitude
      }
    }
    // 기본값으로 서울 좌표 반환
    return { lat: 37.5665, lng: 126.9780 }
  } catch (error) {
    console.error('IP 위치 가져오기 실패:', error)
    // 기본값으로 서울 좌표 반환
    return { lat: 37.5665, lng: 126.9780 }
  }
}

// OpenWeatherMap API로 날씨 가져오기
const getWeatherByCoordinates = async (lat: number, lng: number): Promise<WeatherData | null> => {
  const apiKey = getWeatherApiKey()
  if (!apiKey) {
    console.warn('날씨 API 키가 없습니다. 샘플 데이터를 사용합니다.')
    return {
      temperature: Math.round(15 + Math.random() * 10),
      windSpeed: Math.round((1 + Math.random() * 5) * 10) / 10,
      humidity: Math.round(50 + Math.random() * 30),
      pressure: Math.round(1000 + Math.random() * 30),
      condition: ['맑음', '구름많음', '흐림', '비'][Math.floor(Math.random() * 4)]
    }
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=kr`
    )
    
    if (response.data) {
      return {
        temperature: Math.round(response.data.main.temp),
        windSpeed: Math.round(response.data.wind?.speed * 10) / 10 || 0,
        humidity: response.data.main.humidity || 0,
        pressure: response.data.main.pressure || 0,
        condition: response.data.weather[0]?.description || '알 수 없음'
      }
    }
    return null
  } catch (error) {
    console.error('날씨 API 호출 실패:', error)
    return null
  }
}

// 현재 위치 날씨 가져오기
const fetchCurrentLocationWeather = async () => {
  const location = await getCurrentLocation()
  if (location) {
    const weather = await getWeatherByCoordinates(location.lat, location.lng)
    if (weather) {
      currentLocationWeather.value = weather
    }
  }
}

// 지역별 날씨 가져오기
const fetchRegionalWeather = async () => {
  const promises = regionalWeather.value.map(async (region) => {
    const coords = regionCoordinates[region.name]
    if (coords) {
      const weather = await getWeatherByCoordinates(coords.lat, coords.lng)
      if (weather) {
        region.temperature = weather.temperature
        region.windSpeed = weather.windSpeed
        region.humidity = weather.humidity
        region.pressure = weather.pressure
        region.condition = weather.condition
      }
    }
  })
  await Promise.all(promises)
  // 지도 업데이트
  updateMapMarkers()
}

// 지도 마커 업데이트
const updateMapMarkers = () => {
  // 기존 마커 제거
  mapMarkers.value.forEach(marker => {
    if (map.value && marker) {
      try {
        map.value.removeLayer(marker as any)
      } catch (e) {
        // 마커가 이미 제거된 경우 무시
      }
    }
  })
  mapMarkers.value = []

  // 지역별 마커 추가
  regionalWeather.value.forEach(region => {
    const coords = regionCoordinates[region.name]
    if (coords && map.value) {
      const temperature = region.temperature
      const color = temperature <= 0 ? '#60a5fa' : '#ef4444' // 하늘색 또는 빨간색
      
      const icon = new L.DivIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${temperature}°</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })

      const marker = L.marker([coords.lat, coords.lng], { icon })
        .addTo(map.value as L.Map)
        .bindPopup(`<b>${region.name}</b><br>${temperature}°C<br>${region.condition}`)
      
      mapMarkers.value.push(marker)
    }
  })
}

// 지도 초기화
const initMap = () => {
  if (map.value) {
    map.value.remove()
  }

  // Leaflet 아이콘 설정 (TypeScript에서 필요한 설정)
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })

  // 지도 생성 (한국 중심)
  map.value = L.map('map').setView([36.5, 127.5], 7)

  // OpenStreetMap 타일 레이어 추가
  if (map.value) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map.value as L.Map)
  }

  // 마커 업데이트
  updateMapMarkers()
}

// 날씨 데이터 새로고침
const refreshWeatherData = async () => {
  isLoading.value = true
  
  try {
    await Promise.all([
      fetchCurrentLocationWeather(),
      fetchRegionalWeather()
    ])
  } catch (error) {
    console.error('날씨 데이터 업데이트 실패:', error)
    alert('날씨 데이터를 업데이트하는 중 오류가 발생했습니다.')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  // 지도 초기화 (약간의 지연을 두어 DOM이 완전히 로드된 후 실행)
  setTimeout(() => {
    initMap()
  }, 100)
  
  // 날씨 데이터 로드
  await refreshWeatherData()
})

onUnmounted(() => {
  // 마커 제거
  mapMarkers.value.forEach(marker => {
    if (map.value && marker) {
      try {
        map.value.removeLayer(marker as any)
      } catch (e) {
        // 마커가 이미 제거된 경우 무시
      }
    }
  })
  mapMarkers.value = []
  
  // 지도 제거
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.custom-div-icon {
  background: transparent !important;
  border: none !important;
}

.modern-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 60px -30px rgba(15, 23, 42, 0.35);
  border-color: rgba(148, 163, 184, 0.35);
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  color: #0f172a;
  background: linear-gradient(135deg, rgba(226, 232, 240, 0.85), rgba(248, 250, 252, 0.95));
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 12px 20px -18px rgba(15, 23, 42, 0.65);
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.refresh-button:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: rgba(148, 163, 184, 0.5);
  box-shadow: 0 24px 38px -28px rgba(15, 23, 42, 0.45);
}

.refresh-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 14px 24px -18px rgba(15, 23, 42, 0.45);
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
