<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
            <i class="fa-solid fa-box text-xl text-(--color-secondary)"></i>
          </div>

          <div>
            <h2 class="text-xl font-semibold text-slate-800">Nuevo pedido</h2>
            <p class="text-sm text-slate-500">Rellena los datos para crear un pedido</p>
          </div>
        </div>

        <button
          @click="emit('close')"
          class="text-xl text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6 px-6 py-6">
        <!-- CLIENTE -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-slate-700">Información del cliente</h3>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="relative">
              <i
                class="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="cliente"
                type="text"
                placeholder="Nombre del cliente"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-(--color-secondary)"
              />
            </div>

            <div class="relative">
              <i
                class="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="telefono"
                type="text"
                placeholder="Teléfono"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-(--color-secondary)"
              />
            </div>
          </div>

          <div class="relative">
            <i
              class="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            ></i>
            <input
              v-model="direccion"
              type="addres"
              placeholder="Dirección de entrega"
              class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-(--color-secondary)"
            />
          </div>
        </div>

        <!-- DETALLES -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-slate-700">Detalles del pedido</h3>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="relative">
              <i
                class="fa-solid fa-euro-sign absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="precio"
                type="number"
                placeholder="Precio"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-(--color-secondary)"
              />
            </div>

            <div class="relative">
              <i
                class="fa-regular fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              ></i>
              <input
                v-model="hora"
                type="time"
                class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-(--color-secondary)"
              />
            </div>
          </div>
        </div>

        <!-- COMANDAS -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-slate-700">Comandas del pedido</h3>

          <div class="flex gap-3">
            <input
              v-model="producto"
              type="text"
              placeholder="Producto"
              class="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
            />

            <input
              v-model="cantidad"
              type="number"
              placeholder="Cant."
              class="w-24 rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-(--color-secondary)"
            />

            <button
              type="button"
              @click="addComanda"
              class="rounded-xl bg-(--color-secondary) px-4 text-white cursor-pointer"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <!-- Lista de comandas -->
          <div class="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <div v-if="comandas.length" class="space-y-2">
              <div
                v-for="(item, index) in comandas"
                :key="index"
                class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-sm"
              >
                <span>{{ item.producto }} x{{ item.cantidad }}</span>

                <button
                  @click="removeComanda(index)"
                  class="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <div v-else class="rounded-xl bg-slate-50 p-4 text-sm text-slate-400">
              No hay comandas añadidas
            </div>
          </div>
        </div>

        <!-- NOTAS -->
        <div>
          <h3 class="mb-2 text-sm font-semibold text-slate-700">Notas</h3>

          <textarea
            rows="3"
            placeholder="Observaciones..."
            class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-(--color-secondary)"
          ></textarea>
        </div>

        <!-- BOTONES -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="emit('close')"
            class="rounded-xl border border-slate-200 px-5 py-3 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-(--color-secondary) px-5 py-3 font-medium text-white hover:opacity-90 cursor-pointer"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            Crear pedido
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createOrder } from '@/services/ordersService'

const emit = defineEmits(['close', 'created'])

const cliente = ref('')
const telefono = ref('')
const direccion = ref('')
const precio = ref('')
const hora = ref('')
const notas = ref('')

const producto = ref('')
const cantidad = ref(1)
const comandas = ref([])

const error = ref('')

const addComanda = () => {
  if (!producto.value.trim() || cantidad.value <= 0) return

  comandas.value.push({
    producto: producto.value,
    cantidad: Number(cantidad.value),
  })

  producto.value = ''
  cantidad.value = 1
}

const removeComanda = (index) => {
  comandas.value.splice(index, 1)
}

const handleSubmit = async () => {
  error.value = ''

  if (!cliente.value || !telefono.value || !direccion.value) {
    error.value = 'Completa los campos obligatorios'
    return
  }

  if (comandas.value.length === 0) {
    error.value = 'Añade al menos una comanda'
    return
  }

  const newOrder = {
    cliente: cliente.value,
    telefono: telefono.value,
    direccion: direccion.value,
    precio: Number(precio.value) || 0,
    hora: hora.value,
    estado: 'pendiente',
    repartidorId: null,
    comandas: comandas.value,
    notas: notas.value,
  }

  try {
    await createOrder(newOrder)

    emit('created')
    emit('close')
  } catch (error) {
    error.value = 'Error al crear pedido'
  }
}
</script>
