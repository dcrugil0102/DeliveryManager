<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-(--color-border)">
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="text-lg font-semibold text-(--color-text-primary)">Pedidos recientes</h2>
        <p class="text-sm text-(--color-text-secondary)">
          Últimos pedidos registrados en el sistema
        </p>
      </div>

      <div class="flex gap-5">
        <select v-model="limit">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>

        <button
          class="bg-(--color-secondary) hover:bg-(--color-secondary-dark) text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <router-link to="/pedidos">Ver todos</router-link>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-(--color-border) text-(--color-text-secondary) text-sm">
            <th class="py-3 font-medium">Pedido</th>
            <th class="py-3 font-medium">Cliente</th>
            <th class="py-3 font-medium">Dirección</th>
            <th class="py-3 font-medium">Repartidor</th>
            <th class="py-3 font-medium">Estado</th>
            <th class="py-3 font-medium">Hora</th>
            <th class="py-3 font-medium text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-b border-(--color-border) last:border-b-0 hover:bg-(--color-primary-soft) transition"
          >
            <td class="py-4 font-medium text-(--color-text-primary)">#{{ order.id }}</td>

            <td class="py-4 text-(--color-text-primary)">
              {{ order.cliente }}
            </td>

            <td class="py-4 text-(--color-text-secondary)">
              {{ order.direccion }}
            </td>

            <td class="py-4 text-(--color-text-primary)">
              {{ getDriver(order.repartidorId) }}
            </td>

            <td class="py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="getStatusClass(order.estado)"
              >
                {{ order.estado }}
              </span>
            </td>

            <td class="py-4 text-(--color-text-secondary)">
              {{ order.hora }}
            </td>

            <td class="py-4">
              <div class="flex items-center justify-center gap-3 text-(--color-text-secondary)">
                <button class="hover:text-(--color-primary) transition">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button class="hover:text-(--color-secondary) transition">
                  <i class="fa-solid fa-pen"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getDrivers } from '@/services/driversService'
import { getOrders } from '@/services/ordersService'
import { computed, onMounted, ref } from 'vue'

const orders = ref([])
const deliveryDrivers = ref([])

onMounted(async () => {
  orders.value = await getOrders()
  deliveryDrivers.value = await getDrivers()
})
const limit = ref(5)

const filteredOrders = computed(() => {
  return orders.value.slice(-limit.value)
})

function getDriver(id) {
  return deliveryDrivers.value.find((r) => Number(r.id) === Number(id))?.nombre || 'Sin asignar'
}

const getStatusClass = (estado) => {
  if (estado === 'pendiente') {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (estado === 'en reparto') {
    return 'bg-blue-100 text-blue-700'
  }

  if (estado === 'entregado') {
    return 'bg-green-100 text-green-700'
  }

  return 'bg-gray-100 text-gray-700'
}
</script>
