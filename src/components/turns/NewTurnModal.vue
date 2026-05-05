<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
            <i class="fa-solid fa-calendar-days text-xl text-(--color-secondary)"></i>
          </div>

          <div>
            <h2 class="text-xl font-semibold text-slate-800">
              {{ turn ? 'Editar turno' : 'Nuevo turno' }}
            </h2>
            <p class="text-sm text-slate-500">Programa un turno para el repartidor</p>
          </div>
        </div>

        <button
          @click="emit('close')"
          class="cursor-pointer text-xl text-slate-400 transition hover:text-slate-700"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="px-6 py-5">
        <div class="flex items-center gap-4 rounded-2xl bg-blue-50 px-4 py-4">
          <img :src="driver.foto || defaultAvatar" class="h-12 w-12 rounded-full object-cover" />

          <div>
            <p class="font-semibold text-slate-800">{{ driver.nombre }}</p>
            <p class="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <i class="fa-solid fa-calendar-day"></i>
              {{ date }}
            </p>
          </div>
        </div>
      </div>

      <form class="space-y-5 px-6 pb-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Hora de inicio</label>
            <div class="relative">
              <i
                class="fa-regular fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="horaInicio"
                type="time"
                :disabled="esDescanso"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Hora de fin</label>
            <div class="relative">
              <i
                class="fa-regular fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="horaFin"
                type="time"
                :disabled="esDescanso"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Estado del turno</label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="esDescanso"
              class="h-4 w-4 accent-(--color-secondary)"
            />

            <span class="text-sm font-medium text-slate-700"> Marcar como descanso </span>
          </label>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Notas (opcional)</label>
          <textarea
            rows="3"
            class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
            placeholder="Añade alguna nota sobre este turno..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="cursor-pointer rounded-xl border border-slate-200 px-5 py-3 text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="flex cursor-pointer items-center gap-2 rounded-xl bg-(--color-secondary) px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            Guardar turno
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createTurn, updateTurn, syncTurnsStatus } from '@/services/turnsService'
import defaultAvatar from '@/assets/no-user-image.png'
import { watch } from 'vue'

const props = defineProps({
  driver: Object,
  date: String,
  turn: Object,
})

const emit = defineEmits(['close', 'created'])

const horaInicio = ref(props.turn?.horaInicio || '')
const horaFin = ref(props.turn?.horaFin || '')

const esDescanso = ref(props.turn?.estado === 'descanso')

watch(esDescanso, (val) => {
  if (val) {
    horaInicio.value = ''
    horaFin.value = ''
  }
})

const handleSubmit = async () => {
  const turnData = {
    repartidorId: props.driver.id,
    fecha: props.date,
    horaInicio: esDescanso.value ? '' : horaInicio.value,
    horaFin: esDescanso.value ? '' : horaFin.value,
    estado: esDescanso.value ? 'descanso' : 'programado',
  }

  if (props.turn) {
    await updateTurn(props.turn.id, turnData)
  } else {
    await createTurn(turnData)
  }

  await syncTurnsStatus()

  emit('created')
  emit('close')
}
</script>
