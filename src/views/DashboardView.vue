<template>
  <div class="space-y-6">
    <h1 class="font-bold text-3xl text-slate-900">Panel de control</h1>

    <!-- KPIs -->
    <section class="grid grid-cols-4 gap-6">
      <StatCard title="Pedidos Pendientes" value="12" icon="fa-solid fa-box" />
      <StatCard title="En Reparto" value="8" icon="fa-solid fa-motorcycle" />
      <StatCard title="Entregados Hoy" value="24" icon="fa-solid fa-check-circle" />
      <StatCard title="Tiempo Medio" value="25 min" icon="fa-solid fa-clock" />
    </section>

    <!-- CONTENIDO PRINCIPAL -->
    <section class="grid grid-cols-3 gap-6">
      <!-- Tabla -->
      <div class="col-span-2">
        <RecentOrders />
      </div>

      <!-- Repartidores -->
      <div>
        <ActiveDriversCard />
      </div>
    </section>

    <!-- GRÁFICA -->
    <section>
      <WeeklyOrdersChart />
    </section>
  </div>
</template>

<script setup>
import StatCard from '@/components/dashboard/StatCard.vue'
import RecentOrders from '@/components/dashboard/RecentOrders.vue'
// import ActiveDriversCard from '@/components/dashboard/ActiveDriversCard.vue'
// import WeeklyOrdersChart from '@/components/dashboard/WeeklyOrdersChart.vue'
</script>
