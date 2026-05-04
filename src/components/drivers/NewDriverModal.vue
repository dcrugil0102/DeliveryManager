<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
      <!-- HEADER -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <i class="fa-solid fa-user text-(--color-secondary)"></i>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-slate-800">Nuevo repartidor</h2>
            <p class="text-sm text-slate-400">Añade un nuevo repartidor</p>
          </div>
        </div>

        <button @click="emit('close')" class="text-slate-400 hover:text-slate-700 cursor-pointer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form class="space-y-5 px-6 py-6" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700"> Nombre </label>

          <div class="relative">
            <i class="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

            <input
              v-model="nombre"
              type="text"
              class="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:border-(--color-secondary) focus:ring-1 focus:ring-(--color-secondary)"
              placeholder="Ej: Juan Pérez"
            />
          </div>
        </div>

        <!-- TELEFONO -->
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700"> Teléfono </label>

          <div class="relative">
            <i
              class="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            ></i>

            <input
              v-model="telefono"
              type="text"
              class="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:border-(--color-secondary) focus:ring-1 focus:ring-(--color-secondary)"
              placeholder="600 123 456"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700"> Foto (opcional) </label>

          <label
            class="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-6 text-slate-500 cursor-pointer hover:border-(--color-secondary) hover:text-(--color-secondary) transition"
          >
            <i class="fa-solid fa-upload"></i>
            <span>Subir imagen</span>

            <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          </label>

          <div v-if="foto" class="mt-4 flex justify-center">
            <img :src="foto" class="h-24 w-24 rounded-full object-cover border" />
          </div>
        </div>

        <!-- ERROR -->
        <p v-if="error" class="text-sm font-medium text-red-500">
          {{ error }}
        </p>

        <!-- BOTONES -->
        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="rounded-xl border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-(--color-secondary) px-5 py-2 font-medium text-white hover:opacity-90 cursor-pointer"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createDriver } from '@/services/driversService'

const emit = defineEmits(['close', 'created'])

const nombre = ref('')
const telefono = ref('')
const foto = ref('')

const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  if (!nombre.value.trim() || !telefono.value.trim()) {
    error.value = 'Nombre y teléfono son obligatorios'
    return
  }

  const newDriver = {
    nombre: nombre.value,
    telefono: telefono.value,
    estado: '',
    foto: foto.value,
  }

  try {
    await createDriver(newDriver)
    emit('created')
    emit('close')
  } catch (error) {
    error.value = 'No se pudo crear el repartidor'
  }
}
</script>
