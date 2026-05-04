<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
      <div class="mb-4 flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
          <i class="fa-solid fa-trash text-red-500"></i>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-slate-800">
            {{ title }}
          </h2>
          <p class="text-sm text-slate-500">
            {{ message }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="emit('cancel')"
          class="rounded-xl border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          Cancelar
        </button>

        <button
          @click="emit('confirm')"
          class="rounded-xl bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
})

const emit = defineEmits(['confirm', 'cancel'])
</script>
