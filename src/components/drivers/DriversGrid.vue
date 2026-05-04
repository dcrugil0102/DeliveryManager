<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <DriverCard
      v-for="driver in drivers"
      :key="driver.id"
      :driver="driver"
      :orders="orders"
      :openMenuId="open"
      @toggle-menu="toggleMenu"
      @request-delete="requestDelete"
    />

    <ConfirmModal
      v-if="driverToDelete"
      title="Eliminar repartidor"
      :message="`¿Seguro que quieres eliminar a ${driverToDelete.nombre}?`"
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import DriverCard from './DriverCard.vue'
import { ref } from 'vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { deleteDriver } from '@/services/driversService'

defineProps({
  drivers: Array,
  orders: Array,
})

const open = ref(null)

const toggleMenu = (id) => {
  open.value = open.value === id ? null : id
}

const driverToDelete = ref(null)

const requestDelete = (driver) => {
  driverToDelete.value = driver
}

const cancelDelete = () => {
  driverToDelete.value = null
}

const confirmDelete = async () => {
  await deleteDriver(driverToDelete.value.id)
  driverToDelete.value = null
}
</script>
