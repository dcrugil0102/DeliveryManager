<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-0">
        <thead class="bg-slate-50">
          <tr>
            <th
              class="sticky left-0 bg-slate-50 px-6 py-4 text-left text-sm font-semibold text-slate-700"
            >
              Repartidor
            </th>

            <th
              v-for="day in weekDays"
              :key="day.date"
              class="min-w-42.5 px-4 py-4 text-center text-sm font-semibold text-slate-700"
            >
              <div>{{ day.label }}</div>
              <div class="text-xs font-normal text-slate-400">
                {{ day.date }}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="driver in drivers" :key="driver.id" class="border-t border-slate-100">
            <td class="sticky left-0 bg-white px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  :src="driver.foto || defaultAvatar"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium text-slate-800">
                    {{ driver.nombre }}
                  </p>
                  <p class="text-sm text-slate-400">
                    {{ driver.telefono }}
                  </p>
                </div>
              </div>
            </td>

            <td v-for="day in weekDays" :key="`${driver.id}-${day.date}`" class="px-3 py-3">
              <TurnCell :turn="getTurnForCell(driver.id, day.date)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TurnCell from './TurnCell.vue'
import defaultAvatar from '@/assets/no-user-image.png'

const { drivers, turns } = defineProps({
  drivers: Array,
  turns: Array,
})

const weekDays = computed(() => {
  return [
    { label: 'Lun', date: '2026-04-21' },
    { label: 'Mar', date: '2026-04-22' },
    { label: 'Mié', date: '2026-04-23' },
    { label: 'Jue', date: '2026-04-24' },
    { label: 'Vie', date: '2026-04-25' },
    { label: 'Sáb', date: '2026-04-26' },
    { label: 'Dom', date: '2026-04-27' },
  ]
})

const getTurnForCell = (driverId, date) => {
  return turns.find((turn) => Number(turn.repartidorId) === Number(driverId) && turn.fecha === date)
}
</script>
