<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Repartidores</h1>
      </div>

      <button
        @click="isModalOpen = true"
        class="rounded-xl bg-(--color-secondary) px-5 py-3 font-medium text-white shadow-sm transition hover:opacity-90 cursor-pointer"
      >
        <i class="fa-solid fa-plus"></i>
        Nuevo repartidor
      </button>
    </div>

    <NewDriverModal v-if="isModalOpen" @close="isModalOpen = false" />

    <DriversGrid :drivers="drivers" :orders="orders" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DriversGrid from '@/components/drivers/DriversGrid.vue'
import { getDrivers } from '@/services/driversService'
import { getOrders } from '@/services/ordersService'
import NewDriverModal from '@/components/drivers/NewDriverModal.vue'

const drivers = ref([])
const orders = ref([])
const isModalOpen = ref(false)

onMounted(async () => {
  drivers.value = await getDrivers()
  orders.value = await getOrders()
})
</script>
