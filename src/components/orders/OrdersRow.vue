<template>
  <tr class="hover:bg-slate-50 transition">
    <td class="px-6 py-4 font-medium text-slate-800">#{{ String(order.id).padStart(3, '0') }}</td>

    <td class="px-6 py-4 text-slate-700">
      {{ order.cliente }}
    </td>

    <td class="px-6 py-4 text-slate-600">
      {{ order.direccion }}
    </td>

    <td class="px-6 py-4 text-slate-600">
      {{ order.telefono }}
    </td>

    <!-- ESTADO -->
    <td class="px-6 py-4">
      <span
        class="rounded-full px-3 py-1 text-xs font-medium"
        :class="{
          'bg-yellow-100 text-yellow-700': order.estado === 'pendiente',
          'bg-blue-100 text-blue-700': order.estado === 'en reparto',
          'bg-green-100 text-green-700': order.estado === 'entregado',
        }"
      >
        {{ order.estado }}
      </span>
    </td>

    <td class="px-6 py-4 text-slate-700">
      {{ getDriverName(order.repartidorId) }}
    </td>

    <td class="px-6 py-4 text-slate-700 font-medium">{{ Number(order.precio).toFixed(2) }} €</td>

    <td class="px-6 py-4 text-slate-600">
      {{ order.hora }}
    </td>

    <!-- ACCIONES -->
    <td class="px-6 py-4 relative">
      <button
        @click="emit('toggle-menu', order.id)"
        class="text-slate-600 hover:text-black text-xl cursor-pointer"
      >
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <div
        v-if="open === order.id"
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
    </td>
  </tr>
</template>

<script setup>
const { order, deliveryDrivers } = defineProps({
  order: Object,
  deliveryDrivers: Array,
  open: Number,
})

const emit = defineEmits(['toggle-menu'])

const getDriverName = (id) => {
  const driver = deliveryDrivers.find((d) => Number(d.id) === Number(id))
  return driver ? driver.nombre : 'Sin asignar'
}

console.log(deliveryDrivers)
</script>
