import axios from 'axios'

// API 베이스 URL 설정
// 프로덕션: 환경변수에서 가져오거나 백엔드 서버 URL 사용
// 개발: Vite 프록시를 통해 /api 사용
const getApiBaseUrl = (): string => {
  // 환경변수가 설정되어 있으면 사용
  const envApiUrl = import.meta.env.VITE_API_BASE_URL
  
  if (envApiUrl) {
    // 환경변수가 있으면 그대로 사용 (프로덕션 백엔드 URL)
    return envApiUrl
  }
  
  // 개발 환경에서는 Vite 프록시를 통해 /api 사용
  // 프로덕션에서는 백엔드 서버 URL을 환경변수로 설정해야 함
  if (import.meta.env.DEV) {
    return '/api'
  }
  
  // 프로덕션에서 환경변수가 없으면 에러
  console.error('VITE_API_BASE_URL 환경변수가 설정되지 않았습니다.')
  return '/api' // fallback
}

// API 호출용 axios 인스턴스
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// KMA API 호출용 axios 인스턴스 (기상청 API는 백엔드를 통해 프록시)
export const kmaApiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 일반 axios (외부 API 호출용)
export { axios as defaultAxios }

