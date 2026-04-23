<template>
  <div
    class="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    <div class="mb-4 flex items-start justify-between">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
      >
        <span class="h-2 w-2 rounded-full bg-green-500"></span>
        En servicio
      </span>

      <div class="relative">
        <button
          @click="emit('toggle-menu', driver.id)"
          class="cursor-pointer text-xl text-slate-600 hover:text-black"
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>

        <div
          v-if="openMenuId === driver.id"
          class="absolute right-0 mt-2 w-36 bg-slate-50 rounded-xl shadow-lg z-10"
        >
          <button
            class="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
          >
            <i class="fa-solid fa-eye"></i>
            Ver
          </button>

          <button
            class="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            Editar
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center text-center">
      <img :src="driver.foto || defaultAvatar" class="mb-4 h-24 w-24 rounded-full object-cover" />

      <h3 class="text-lg font-semibold text-slate-800">
        {{ driver.nombre }}
      </h3>

      <p class="mt-3 flex items-center gap-2 text-sm text-slate-500">
        <i class="fa-solid fa-phone text-slate-400"></i>
        {{ driver.telefono }}
      </p>

      <p class="mt-2 flex items-center gap-2 text-sm text-slate-500">
        <i class="fa-solid fa-motorcycle text-slate-400"></i>
        Moto · 1234 KLM
      </p>
    </div>

    <div
      class="mt-5 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
    >
      <i class="fa-solid fa-box text-green-600"></i>
      {{ activeOrders }} pedidos activos
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import defaultAvatar from '@/assets/no-user-image.png'

const { driver, orders, openMenuId } = defineProps({
  driver: Object,
  orders: Array,
  openMenuId: Number,
})

const emit = defineEmits(['toggle-menu'])

const activeOrders = computed(() => {
  return orders.filter(
    (order) => Number(order.repartidorId) === Number(driver.id) && order.estado === 'en reparto',
  ).length
})
</script>
