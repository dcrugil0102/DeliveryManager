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
                {{ formatShortDate(day.date) }}
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
              <TurnCell
                :turn="getTurnForCell(driver.id, day.date)"
                :driver="driver"
                :date="day.date"
                @create-turn="handleCreateTurn"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex flex-wrap items-center gap-6 border border-gray-100 bg-white px-4 py-5 text-sm shadow-sm"
      >
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-green-500"></span>
          Programado
        </div>

        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-blue-500"></span>
          En curso
        </div>

        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-purple-500"></span>
          Descanso
        </div>

        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-slate-400"></span>
          Finalizado
        </div>

        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded border border-slate-300"></span>
          Sin turno
        </div>
      </div>
    </div>
  </div>

  <NewTurnModal
    v-if="selected"
    :driver="selected.driver"
    :date="selected.date"
    :turn="selected.turn"
    @close="selected = null"
    @created="emit('created')"
  />
</template>

<script setup>
import { ref } from 'vue'
import TurnCell from './TurnCell.vue'
import defaultAvatar from '@/assets/no-user-image.png'
import NewTurnModal from './NewTurnModal.vue'

const { drivers, turns, weekDays } = defineProps({
  drivers: Array,
  turns: Array,
  weekDays: Array,
})

const emit = defineEmits(['created'])

const formatShortDate = (date) => {
  return new Date(date)
    .toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    })
    .replace('.', '')
}

const getTurnForCell = (driverId, date) => {
  return turns.find((turn) => Number(turn.repartidorId) === Number(driverId) && turn.fecha === date)
}

const selected = ref(null)

const handleCreateTurn = (data) => {
  selected.value = data
}
</script>
