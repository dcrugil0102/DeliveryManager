<template>
  <div class="overflow-hidden rounded-2xl bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full text-left">
        <thead class="bg-slate-50 text-sm text-slate-500">
          <tr>
            <th class="px-6 py-4 font-semibold">Pedido</th>
            <th class="px-6 py-4 font-semibold">Cliente</th>
            <th class="px-6 py-4 font-semibold">Dirección</th>
            <th class="px-6 py-4 font-semibold">Teléfono</th>
            <th class="px-6 py-4 font-semibold">Estado</th>
            <th class="px-6 py-4 font-semibold">Repartidor</th>
            <th class="px-6 py-4 font-semibold">Precio</th>
            <th class="px-6 py-4 font-semibold">Hora entrega</th>
            <th class="px-6 py-4 font-semibold">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <OrdersRow
            v-for="order in orders"
            :key="order.id"
            :order="order"
            :delivery-drivers="deliveryDrivers"
            :open="open"
            @toggle-menu="toggleMenu"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import OrdersRow from './OrdersRow.vue'
import { ref } from 'vue'

defineProps({
  orders: Array,
  deliveryDrivers: Array,
})

const open = ref(null)

const toggleMenu = (id) => {
  open.value = open.value === id ? null : id
}
</script>
