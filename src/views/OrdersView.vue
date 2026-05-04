<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-900">Pedidos</h1>

      <button
        @click="newOrderModalOpen = true"
        class="rounded-xl bg-(--color-secondary) px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90 cursor-pointer"
      >
        <i class="fa-solid fa-plus"></i>
        Nuevo pedido
      </button>
    </div>

    <NewOrderModal v-if="newOrderModalOpen" @close="newOrderModalOpen = false" />

    <div
      v-if="selectedOrder"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-slate-800">Asignar repartidor</h2>
            <p class="text-sm text-slate-500">
              Pedido #{{ selectedOrder.id }} · {{ selectedOrder.cliente }}
            </p>
          </div>

          <button
            @click="selectedOrder = null"
            class="cursor-pointer text-slate-400 hover:text-slate-700"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="space-y-3">
          <AvailableDriverCard
            v-for="driver in availableDrivers"
            :key="driver.id"
            :driver="driver"
            @select="assignDriver"
          />
        </div>
      </div>
    </div>

    <OrdersTable
      :orders="orders"
      :delivery-drivers="deliveryDrivers"
      @assign="handleAssign"
      @delivered="markAsDelivered"
    />
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import { getOrders, updateOrder } from '@/services/ordersService'
import { getDrivers } from '@/services/driversService'
import NewOrderModal from '@/components/orders/NewOrderModal.vue'
import AvailableDriverCard from '@/components/orders/AvailableDriverCard.vue'
import { updateDriver } from '@/services/driversService'

const orders = ref([])
const deliveryDrivers = ref([])
const newOrderModalOpen = ref(false)
const selectedOrder = ref(null)

onMounted(async () => {
  orders.value = await getOrders()
  deliveryDrivers.value = await getDrivers()
})

const availableDrivers = computed(() => {
  return deliveryDrivers.value.filter((driver) => driver.estado === 'disponible')
})

const handleAssign = (order) => {
  selectedOrder.value = order
}

const assignDriver = async (driver) => {
  await updateOrder(selectedOrder.value.id, {
    repartidorId: driver.id,
    estado: 'en reparto',
  })

  await updateDriver(driver.id, {
    ...driver,
    estado: 'ocupado',
  })

  orders.value = await getOrders()
  deliveryDrivers.value = await getDrivers()

  selectedOrder.value = null
}

const markAsDelivered = async (order) => {
  await updateOrder(order.id, {
    estado: 'entregado',
  })

  const stillBusy = orders.value.some(
    (o) => o.repartidorId === order.repartidorId && o.estado === 'en reparto' && o.id !== order.id,
  )

  if (!stillBusy) {
    const driver = deliveryDrivers.value.find((d) => d.id === order.repartidorId)

    await updateDriver(driver.id, {
      ...driver,
      estado: 'disponible',
    })
  }

  orders.value = await getOrders()
  deliveryDrivers.value = await getDrivers()
}
</script>
