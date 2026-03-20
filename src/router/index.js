import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import OrdersView from '@/views/OrdersView.vue'

const routes = [
  {
    path: '/',
    component: DashboardView,
  },
  {
    path: '/pedidos',
    component: OrdersView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
