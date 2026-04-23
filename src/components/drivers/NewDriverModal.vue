<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-800">Nuevo repartidor</h2>

        <button @click="emit('close')" class="text-slate-400 hover:text-slate-700 cursor-pointer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
            placeholder="Nombre del repartidor"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
          <input
            v-model="telefono"
            type="text"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
            placeholder="600123456"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Estado</label>
          <select
            v-model="estado"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
          >
            <option value="disponible">Disponible</option>
            <option value="ocupado">Ocupado</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Foto (opcional)</label>
          <input
            v-model="foto"
            type="text"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
            placeholder="URL de la foto"
          />
        </div>

        <p v-if="error" class="text-sm font-medium text-red-500">
          {{ error }}
        </p>

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
            class="rounded-xl bg-(--color-secondary) px-4 py-2 font-medium text-white hover:opacity-90 cursor-pointer"
          >
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
const estado = ref('disponible')
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
    estado: estado.value,
    foto: foto.value,
  }

  try {
    await createDriver(newDriver)
    emit('created')
    emit('close')
  } catch (err) {
    err.value = 'No se pudo crear el repartidor'
  }
}
</script>
