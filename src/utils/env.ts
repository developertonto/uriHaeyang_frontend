export const myopenAIkey = (): string => {
  const key = import.meta.env.VITE_OPENAI_API_KEY
  if (!key) {
    console.warn('VITE_OPENAI_API_KEY is not defined. AI 기능이 제한될 수 있습니다.')
  }
  return key ?? ''
}

export const getWeatherApiKey = (): string => {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  if (!key) {
    console.warn('VITE_WEATHER_API_KEY is not defined. 날씨 기능이 제한될 수 있습니다.')
  }
  return key ?? ''
}

