<template>
  <div class="flex min-h-screen">
    <!-- SIDEBAR -->
    <AppSidebar />

    <!-- CONTENIDO -->
    <div class="flex flex-col flex-1">
      <!-- HEADER -->
      <AppTopbar />

      <!-- MAIN -->
      <main class="flex-1 bg-(--color-background) p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import { onMounted, onUnmounted } from 'vue'
import { syncTurnsStatus } from '@/services/turnsService'

let intervalId = null

onMounted(async () => {
  await syncTurnsStatus()

  intervalId = setInterval(async () => {
    await syncTurnsStatus()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
