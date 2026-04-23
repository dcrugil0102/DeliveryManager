import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import OrdersView from '@/views/OrdersView.vue'
import DriversView from '@/views/DriversView.vue'
import TurnsView from '@/views/TurnsView.vue'

const routes = [
  {
    path: '/',
    component: DashboardView,
  },
  {
    path: '/pedidos',
    component: OrdersView,
  },
  {
    path: '/repartidores',
    component: DriversView,
  },
  {
    path: '/turnos',
    component: TurnsView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
