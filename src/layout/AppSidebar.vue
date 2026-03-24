<template>
  <aside class="w-64 min-h-screen bg-(--color-primary-dark) text-white flex flex-col px-4 py-5">
    <!-- Logo -->
    <div class="flex items-center justify-center py-2">
      <img src="/logo.png" alt="DeliveryManager" class="w-44 object-contain" />
    </div>

    <div class="border-t border-white/10 my-5"></div>

    <!-- Cuenta tienda -->
    <div class="flex items-center gap-3 px-2">
      <img
        class="w-14 h-14 rounded-full object-cover bg-white/10"
        src="@/assets/no-user-image.png"
        alt="Cuenta tienda"
      />

      <div class="min-w-0">
        <p class="text-base font-semibold leading-tight truncate">Telepizza Antequera</p>
        <p class="text-sm text-white/70 leading-tight">Cuenta de Encargado</p>
      </div>
    </div>

    <div class="border-t border-white/10 my-5"></div>

    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-chart-pie"></i></span>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/pedidos"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/pedidos'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-box"></i></span>
            <span>Pedidos</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/repartidores"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/repartidores'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-motorcycle"></i></span>
            <span>Repartidores</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/turnos"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/turnos'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-clock"></i></span>
            <span>Turnos</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/estadisticas"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/estadisticas'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-chart-line"></i></span>
            <span>Estadísticas</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/config"
            :class="[
              'flex items-center gap-3 rounded-xl px-4 py-3 transition',
              route.path === '/config'
                ? 'bg-(--color-secondary) text-white font-medium shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <span><i class="fa-solid fa-gear"></i> </span>
            <span>Configuración</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="border-t border-white/10 mt-6 pt-4">
      <p class="text-xs text-white/50 text-center">DeliveryManager</p>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
