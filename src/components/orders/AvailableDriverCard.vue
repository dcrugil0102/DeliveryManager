<template>
  <button
    type="button"
    @click="emit('select', driver)"
    class="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-(--color-secondary) hover:shadow-md cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <img :src="driver.foto || defaultAvatar" class="h-12 w-12 rounded-full object-cover" />

      <div>
        <h3 class="font-semibold text-slate-800">
          {{ driver.nombre }}
        </h3>

        <p class="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <i class="fa-solid fa-phone text-slate-400"></i>
          {{ driver.telefono }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
      >
        <span class="h-2 w-2 rounded-full bg-green-500"></span>
        Disponible
      </span>

      <i class="fa-solid fa-chevron-right text-slate-300"></i>
    </div>
  </button>
</template>

<script setup>
import defaultAvatar from '@/assets/no-user-image.png'

defineProps({
  driver: Object,
})

const emit = defineEmits(['select'])
</script>
