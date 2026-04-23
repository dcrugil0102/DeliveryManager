<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Turnos</h1>

      <button
        class="rounded-xl bg-(--color-secondary) px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Nuevo turno
      </button>
    </div>

    <TurnsCalendar :turns="turns" :drivers="drivers" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TurnsCalendar from '@/components/turns/TurnsCalendar.vue'
import { getTurns } from '@/services/turnsService'
import { getDrivers } from '@/services/driversService'

const turns = ref([])
const drivers = ref([])

onMounted(async () => {
  turns.value = await getTurns()
  drivers.value = await getDrivers()
})
</script>
