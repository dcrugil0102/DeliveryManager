<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <DriverCard
      v-for="driver in drivers"
      :key="driver.id"
      :driver="driver"
      :orders="orders"
      :openMenuId="open"
      @toggle-menu="toggleMenu"
    />
  </div>
</template>

<script setup>
import DriverCard from './DriverCard.vue'
import { ref } from 'vue'

defineProps({
  drivers: Array,
  orders: Array,
})

const open = ref(null)

const toggleMenu = (id) => {
  open.value = open.value === id ? null : id
}
</script>
