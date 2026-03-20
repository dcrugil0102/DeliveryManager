<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-(--color-border)">
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="text-lg font-semibold text-(--color-text-primary)">Pedidos recientes</h2>
        <p class="text-sm text-(--color-text-secondary)">
          Últimos pedidos registrados en el sistema
        </p>
      </div>

      <button
        class="bg-(--color-secondary) hover:bg-(--color-secondary-dark) text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        Ver todos
      </button>
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
            v-for="pedido in pedidos"
            :key="pedido.id"
            class="border-b border-(--color-border) last:border-b-0 hover:bg-(--color-primary-soft) transition"
          >
            <td class="py-4 font-medium text-(--color-text-primary)">#{{ pedido.id }}</td>

            <td class="py-4 text-(--color-text-primary)">
              {{ pedido.cliente }}
            </td>

            <td class="py-4 text-(--color-text-secondary)">
              {{ pedido.direccion }}
            </td>

            <td class="py-4 text-(--color-text-primary)">
              {{ pedido.repartidor }}
            </td>

            <td class="py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="getStatusClass(pedido.estado)"
              >
                {{ pedido.estado }}
              </span>
            </td>

            <td class="py-4 text-(--color-text-secondary)">
              {{ pedido.hora }}
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
const pedidos = [
  {
    id: 1043,
    cliente: 'Juan López',
    direccion: 'Calle Lucena 14',
    repartidor: 'Carlos',
    estado: 'Pendiente',
    hora: '21:05',
  },
  {
    id: 1044,
    cliente: 'María Ruiz',
    direccion: 'Av. Andalucía 22',
    repartidor: 'Marta',
    estado: 'En reparto',
    hora: '21:12',
  },
  {
    id: 1045,
    cliente: 'Pedro García',
    direccion: 'Calle Granada 8',
    repartidor: 'David',
    estado: 'Entregado',
    hora: '20:48',
  },
  {
    id: 1046,
    cliente: 'Laura Sánchez',
    direccion: 'Calle Comedias 3',
    repartidor: 'Sin asignar',
    estado: 'Pendiente',
    hora: '21:18',
  },
  {
    id: 1047,
    cliente: 'Damián Cruz',
    direccion: 'Calle Alhambra de Granada 121',
    repartidor: 'Sin asignar',
    estado: 'Pendiente',
    hora: '21:30',
  },
]

const getStatusClass = (estado) => {
  if (estado === 'Pendiente') {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (estado === 'En reparto') {
    return 'bg-blue-100 text-blue-700'
  }

  if (estado === 'Entregado') {
    return 'bg-green-100 text-green-700'
  }

  return 'bg-gray-100 text-gray-700'
}
</script>
