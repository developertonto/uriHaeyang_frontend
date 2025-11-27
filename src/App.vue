<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900">
    <Header />
    <main class="pt-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
</script>
