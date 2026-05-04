<template>
  <div
    v-if="turn"
    @click="openModal"
    class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition"
  >
    <p class="font-medium text-slate-700">{{ turn.horaInicio }} - {{ turn.horaFin }}</p>

    <p
      class="mt-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium"
      :class="getStatusClasses(turn.estado)"
    >
      <span
        class="h-2 w-2 rounded-full"
        :class="{
          'bg-green-500': turn.estado === 'programado',
          'bg-blue-500': turn.estado === 'en curso',
          'bg-gray-400': turn.estado === 'finalizado',
          'bg-purple-500': turn.estado === 'descanso',
        }"
      ></span>
      {{ turn.estado.charAt(0).toUpperCase() + turn.estado.slice(1) }}
    </p>
  </div>

  <div
    v-else
    @click="openModal"
    class="flex min-h-19.5 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300 cursor-pointer hover:bg-slate-100 transition"
  >
    —
  </div>
</template>

<script setup>
const { turn, driver, date } = defineProps({
  turn: Object,
  driver: Object,
  date: String,
})

const emit = defineEmits(['create-turn'])

const openModal = () => {
  emit('create-turn', {
    driver,
    date,
    turn,
  })
}

const getStatusClasses = (status) => {
  if (status === 'programado') {
    return 'bg-green-50 text-green-700'
  }

  if (status === 'en curso') {
    return 'bg-blue-50 text-blue-700'
  }

  if (status === 'descanso') {
    return 'bg-violet-50 text-violet-700'
  }

  if (status === 'finalizado') {
    return 'bg-slate-100 text-slate-500'
  }

  return 'bg-slate-50 text-slate-400'
}
</script>
