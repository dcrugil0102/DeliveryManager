<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Turnos</h1>
    </div>

    <TurnsCalendar :drivers="drivers" :turns="turns" @created="loadTurns" />
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

const loadTurns = async () => {
  turns.value = await getTurns()
}
</script>
