<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 text-slate-800">
    <div class="max-w-[1430px] mx-auto px-3 sm:px-4 lg:px-6">
      <!-- 헤더 -->
      <div class="text-center mb-10 space-y-3">
        <span class="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase text-slate-500 bg-white/80 border border-slate-200/70 rounded-full">
          Live Marine Observatory
        </span>
        <h1 class="text-4xl md:text-5xl font-semibold text-slate-900">
          해상 자료
        </h1>
        <p class="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
          기상청 해양 기상 종합 관측 API를 통해 실시간 해상 기상 정보를 확인하세요.
        </p>
      </div>

      <!-- API 호출 컨트롤 -->
      <div class="card mb-8 overflow-visible">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-slate-900 mb-2">해상 관측 데이터 조회</h2>
            <p class="text-sm text-slate-500">
              기상청 해양 기상 종합 관측소의 실시간 데이터를 조회합니다.
            </p>
          </div>
          <div class="flex space-x-3">
            <button 
              @click="fetchSeaData"
              :disabled="isLoading"
              class="btn-primary flex items-center space-x-2"
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
              <span>{{ isLoading ? '데이터 조회 중...' : '데이터 조회' }}</span>
            </button>
            <button 
              @click="clearData"
              class="btn-secondary"
            >
              데이터 지우기
            </button>
          </div>
        </div>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="card text-center py-12">
        <div class="w-12 h-12 border-4 border-slate-900/80 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-slate-500">해상 관측 데이터를 조회하고 있습니다...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="card bg-rose-50 border border-rose-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-rose-800">데이터 조회 실패</h3>
            <p class="text-rose-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- 데이터 테이블 -->
      <div v-else-if="seaData.length > 0" class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-slate-900">
            해상 관측 데이터 ({{ seaData.length }}개 관측소)
          </h2>
          <div class="text-xs uppercase text-slate-400">
            마지막 업데이트: {{ lastUpdated }}
          </div>
        </div>

        <!-- 모바일 대응을 위한 반응형 테이블 -->
        <div class="overflow-x-auto">
          <table class="min-w-[1100px] w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200/70 text-xs uppercase text-slate-500">
                <!-- <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">구분</th> -->
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">관측소명</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">관측 시각</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">위치 (위도/경도)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">파고 (m)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">풍향 (°)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">풍속 (m/s)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">돌풍 (m/s)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">해수면 온도 (°C)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">기온 (°C)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">해면기압 (hPa)</th>
                <th class="text-left py-3 px-3 font-semibold whitespace-nowrap">습도 (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="data in paginatedData" 
                :key="`${data.stationId}-${data.timestamp}`"
                class="border-b border-slate-200/40 hover:bg-slate-100/60 transition-colors duration-200"
              >
                <!-- <td class="py-3 px-3 text-center font-medium text-slate-900 whitespace-nowrap">{{ data.observationType || '-' }}</td> -->
                <td class="py-3 px-3 text-slate-500">
                  <div class="flex flex-col">
                    <span class="font-medium text-slate-700">{{ data.stationName || '-' }}</span>
                    <span class="text-xs text-slate-400">ID {{ data.stationId || '-' }}</span>
                  </div>
                </td>
                <td class="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{{ data.timestamp || '-' }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatLocation(data.latitude, data.longitude) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.waveHeight) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.windDirection, 0) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.windSpeed) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.gustSpeed) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.seaTemperature) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.airTemperature) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.pressure) }}</td>
                <td class="py-3 px-3 text-slate-500 whitespace-nowrap">{{ formatNumber(data.humidity, 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 데이터 요약 정보 -->
        <div class="mt-6 pt-6 border-t border-slate-200/70">
          <h3 class="text-lg font-semibold text-slate-900 mb-4">데이터 요약</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="rounded-xl border border-slate-200/80 bg-slate-100/70 p-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
              <h4 class="text-xs uppercase text-slate-500 mb-2">평균 해수면 온도</h4>
              <p class="text-2xl font-semibold text-slate-900">
                {{ calculateAverage('seaTemperature') }}°C
              </p>
            </div>
            <div class="rounded-xl border border-slate-200/80 bg-slate-100/70 p-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
              <h4 class="text-xs uppercase text-slate-500 mb-2">평균 풍속</h4>
              <p class="text-2xl font-semibold text-slate-900">
                {{ calculateAverage('windSpeed') }} m/s
              </p>
            </div>
            <div class="rounded-xl border border-slate-200/80 bg-slate-100/70 p-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
              <h4 class="text-xs uppercase text-slate-500 mb-2">평균 기압</h4>
              <p class="text-2xl font-semibold text-slate-900">
                {{ calculateAverage('pressure') }} hPa
              </p>
            </div>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <div
          v-if="seaData.length > itemsPerPage"
          class="mt-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm"
        >
          <div class="text-slate-500">
            총 {{ seaData.length.toLocaleString() }}건 중
            <span class="font-medium text-slate-800">
              {{ displayRangeStart.toLocaleString() }}-
              {{ displayRangeEnd.toLocaleString() }}
            </span>
            표시
          </div>
          <div class="flex items-center justify-end gap-2">
            <button
              class="px-3 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              @click="goToPrevPage"
              :disabled="currentPage === 1"
            >
              이전
            </button>
            <template v-for="page in totalPages" :key="page">
              <button
                class="w-9 h-9 rounded-full border transition-colors duration-150"
                :class="page === currentPage
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </template>
            <button
              class="px-3 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              @click="goToNextPage"
              :disabled="currentPage === totalPages"
            >
              다음
            </button>
          </div>
        </div>

        <!-- 관측 구분 설명 -->
        <!-- <div class="mt-10 bg-slate-100/80 border border-slate-200/80 rounded-2xl p-6 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
          <h3 class="text-sm font-semibold uppercase text-slate-500 mb-4">관측 구분 안내</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
            <div>
              <p class="font-semibold text-slate-800 mb-1">B (Buoy)</p>
              <p>해상 부표 관측소로 파고, 풍향/풍속, 수온을 중심으로 관측합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">C (Coastal Buoy)</p>
              <p>연안 부표 관측소로 연안 기상/해양 정보를 상세히 제공합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">D (Light Buoy)</p>
              <p>표지 부표 관측소로 야간 항로 등표 역할을 하며 기상 데이터를 수집합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">L (Light House)</p>
              <p>등대 관측소로 연안 기상 및 해상 안전 정보를 제공합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">N (National Station)</p>
              <p>국가 해양 관측소로 다항목 해양·기상 데이터를 측정합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">F (Fishery Station)</p>
              <p>어업 기상 관측소로 어업 활동과 관련된 해양 정보를 제공합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">G (Gauge)</p>
              <p>측정 계기 기반의 관측소로 수위 및 기상 데이터를 수집합니다.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 mb-1">J (Drifting Buoy)</p>
              <p>표류 부표 관측소로 해류 및 광역 해양 상태를 추적합니다.</p>
            </div>
          </div>
        </div> -->
      </div>

      <!-- 빈 상태 -->
      <div v-else class="card text-center py-12">
        <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)]">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-900 mb-2">데이터가 없습니다</h3>
        <p class="text-slate-500 mb-4">위의 '데이터 조회' 버튼을 클릭하여 해상 관측 데이터를 불러오세요.</p>
      </div>

      <!-- API 정보 -->       
      <div class="mt-8 card bg-slate-100/80">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">API 정보</h3>
        <div class="space-y-3 text-sm text-slate-600">
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-slate-600 uppercase min-w-0 md:w-32 text-xs">API 엔드포인트</span>
            <code class="bg-white/80 border border-slate-200 px-2 py-1 rounded text-xs break-all text-slate-700">
              https://apihub.kma.go.kr/api/typ01/url/sea_obs.php
            </code>
          </div>
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-slate-600 uppercase min-w-0 md:w-32 text-xs">제공 기관</span>
            <span class="text-slate-500">기상청</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-slate-600 uppercase min-w-0 md:w-32 text-xs">업데이트 주기</span>
            <span class="text-slate-500">실시간 (10분 간격)</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-start space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-slate-600 uppercase min-w-0 md:w-32 text-xs">제공 데이터</span>
            <div class="text-slate-500">
              <p>• 관측소명 (STN_KO)</p>
              <p>• 풍향 (WH), 풍속 (WS)</p>
              <p>• 해수면 온도 (TW), 기온 (TA)</p>
              <p>• 해면기압 (PA), 상대습도 (HM)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

interface SeaObservationData {
  observationType: string
  stationId: string
  stationName: string
  timestamp: string
  longitude: number | null
  latitude: number | null
  waveHeight: number | null
  windDirection: number | null
  windSpeed: number | null
  gustSpeed: number | null
  seaTemperature: number | null
  airTemperature: number | null
  pressure: number | null
  humidity: number | null
}

const isLoading = ref(false)
const error = ref('')
const seaData = ref<SeaObservationData[]>([])
const lastUpdated = ref('')
const itemsPerPage = 10
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(seaData.value.length / itemsPerPage))
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return seaData.value.slice(start, start + itemsPerPage)
})

const displayRangeStart = computed(() => {
  if (seaData.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const displayRangeEnd = computed(() => {
  if (seaData.value.length === 0) return 0
  return Math.min(currentPage.value * itemsPerPage, seaData.value.length)
})

// API 호출 함수
const fetchSeaData = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await axios.get<ArrayBuffer>('/api/kma/sea_obs.php', {
      params: {
        stn: 0,
        help: 1,
        authKey: 'NRYkCk8ERg-WJApPBJYPxA',
      },
      responseType: 'arraybuffer',
      timeout: 35000,
    })

    const decoded = decodeSeaData(response.data)
    const parsed = parseSeaData(decoded)

    if (parsed.length > 0) {
      seaData.value = parsed
      lastUpdated.value = new Date().toLocaleString('ko-KR')
      currentPage.value = 1
    } else {
      seaData.value = []
      lastUpdated.value = ''
      error.value = 'API 응답을 파싱할 수 없습니다. 잠시 후 다시 시도해주세요.'
    }
  } catch (err: any) {
    console.error('API 호출 실패:', err)
    seaData.value = []
    lastUpdated.value = ''

    if (err.code === 'ERR_NETWORK' || err.message?.includes?.('CORS')) {
      error.value = '네트워크 또는 CORS 문제로 데이터를 불러올 수 없습니다.'
    } else {
      error.value = err.message ? `데이터 조회 중 오류가 발생했습니다: ${err.message}` : '데이터 조회 중 알 수 없는 오류가 발생했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

// 데이터 지우기
const clearData = () => {
  seaData.value = []
  error.value = ''
  lastUpdated.value = ''
  currentPage.value = 1
}

const normalizeToken = (token: string | undefined): string => {
  if (!token) return ''
  return token.replace(/=+$/u, '').trim()
}

const parseNumericToken = (token: string | undefined): number | null => {
  const normalized = normalizeToken(token)
  if (!normalized || normalized === '-99' || normalized === '-99.0' || normalized === 'N/A') {
    return null
  }
  const numeric = Number(normalized)
  return Number.isFinite(numeric) ? numeric : null
}

const parseSeaData = (raw: string): SeaObservationData[] => {
  const lines = raw.split('\n')
  const records: SeaObservationData[] = []

  lines.forEach(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const sanitized = trimmed.replace(/,=\s*$/u, '')
    const tokens = sanitized.split(',').map(token => token.trim())

    if (tokens.length < 4) {
      return
    }

    const getToken = (idx: number) => tokens[idx] ?? ''

    const observationType = normalizeToken(getToken(0))
    const rawTimestamp = normalizeToken(getToken(1))
    const stationId = normalizeToken(getToken(2)) 
    const stationName = normalizeToken(getToken(3))

    if (!observationType || !stationId || !stationName) {
      return
    }

    records.push({
      observationType: normalizeToken(getToken(0)),
      timestamp: formatTimestamp(rawTimestamp),
      stationId,
      stationName,
      longitude: parseNumericToken(getToken(4)),
      latitude: parseNumericToken(getToken(5)),
      waveHeight: parseNumericToken(getToken(6)),
      windDirection: parseNumericToken(getToken(7)),
      windSpeed: parseNumericToken(getToken(8)),
      gustSpeed: parseNumericToken(getToken(9)),
      seaTemperature: parseNumericToken(getToken(10)),
      airTemperature: parseNumericToken(getToken(11)),
      pressure: parseNumericToken(getToken(12)),
      humidity: parseNumericToken(getToken(13))
    })
  })

  return records
}

const decodeSeaData = (buffer: ArrayBuffer): string => {
  try {
    const decoder = new TextDecoder('euc-kr')
    return decoder.decode(buffer)
  } catch (error) {
    console.warn('EUC-KR 디코딩 실패, UTF-8로 재시도합니다.', error)
    return new TextDecoder('utf-8').decode(buffer)
  }
}

const formatTimestamp = (value: string): string => {
  if (!value) return '-'
  const sanitized = value.replace(/\D/g, '')
  if (sanitized.length !== 12) return value

  const year = sanitized.slice(0, 4)
  const month = sanitized.slice(4, 6)
  const day = sanitized.slice(6, 8)
  const hour = sanitized.slice(8, 10)
  const minute = sanitized.slice(10, 12)

  return `${year}-${month}-${day} ${hour}:${minute}`
}

const formatNumber = (value: number | null, fractionDigits = 1): string => {
  if (value === null || value === undefined) {
    return '-'
  }
  return value.toFixed(fractionDigits)
}

const formatLocation = (latitude: number | null, longitude: number | null): string => {
  if (latitude === null || longitude === null) {
    return '-'
  }
  return `${latitude.toFixed(2)}° / ${longitude.toFixed(2)}°`
}

const calculateAverage = (field: keyof SeaObservationData, fractionDigits = 1): string => {
  const values = seaData.value
    .map((item: SeaObservationData) => item[field])
    .filter((value: SeaObservationData[keyof SeaObservationData]): value is number => typeof value === 'number' && !Number.isNaN(value))

  if (values.length === 0) {
    return '-'
  }

  const total = values.reduce((sum: number, value: number) => sum + value, 0)
  return (total / values.length).toFixed(fractionDigits)
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}
</script>
