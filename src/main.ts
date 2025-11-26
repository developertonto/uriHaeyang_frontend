import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Views
import HomeView from './views/HomeView.vue'
import WeatherView from './views/WeatherView.vue'
import SeaInfoView from './views/SeaInfoView.vue'
import AiChatView from './views/AiChatView.vue'
import NotFoundView from './views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/weather', name: 'weather', component: WeatherView },
  { path: '/seain', name: 'seain', component: SeaInfoView },
  { path: '/aichat', name: 'aichat', component: AiChatView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
