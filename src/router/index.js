import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/tambah-kamar',
    name: 'Kamar',
    component: () => import('../views/Kamar.vue')
  },
  {
    path: '/data-penduduk',
    name: 'Penduduk',
    component: () => import('../views/Penduduk.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
