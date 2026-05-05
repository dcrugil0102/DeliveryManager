<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Turnos</h1>

      <div class="mb-4 flex justify-end">
        <div class="flex items-center gap-3">
          <button
            @click="changeWeek(-1)"
            class="rounded-xl border border-gray-300 px-5 py-3 shadow-sm cursor-pointer bg-white"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <span class="text-sm font-medium text-slate-700">
            {{ formatRange(weekDays) }}
          </span>

          <button
            @click="changeWeek(1)"
            class="rounded-xl border border-gray-300 px-5 py-3 shadow-sm cursor-pointer bg-white"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <TurnsCalendar :drivers="drivers" :turns="turns" :week-days="weekDays" @created="loadTurns" />
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
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

const currentWeek = ref(new Date())

const getMonday = (date) => {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = day === 0 ? -6 : 1 - day

  newDate.setDate(newDate.getDate() + diff)

  return newDate
}

const formatDate = (date) => {
  return date.toLocaleDateString('en-CA')
}

const weekDays = computed(() => {
  const monday = getMonday(currentWeek.value)

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)

    return {
      label: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      date: formatDate(date),
    }
  })
})

const changeWeek = (direction) => {
  const newDate = new Date(currentWeek.value)
  newDate.setDate(newDate.getDate() + direction * 7)
  currentWeek.value = newDate
}

const formatRange = (days) => {
  const start = new Date(days[0].date)
  const end = new Date(days[6].date)

  const startDay = start.getDate()
  const endDay = end.getDate()
  const month = start.toLocaleDateString('es-ES', { month: 'long' })
  const year = start.getFullYear()

  return `${startDay} – ${endDay} ${month} ${year}`
}
</script>
