<template>
  <div class="bg-white p-4 rounded-xl shadow flex items-center gap-7">
    <i :class="icon + ' text-2xl text-(--color-secondary)'"></i>
    <div>
      <p class="text-xl text-gray-500">{{ title }}</p>
      <p class="text-2xl font-bold">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  icon: String,
})
</script>
