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
    path: '/kontrak',
    name: 'Kontrak',
    component: () => import('../views/Kontrak.vue')
  },
  {
    path: '/data-penduduk',
    name: 'Penduduk',
    component: () => import('../views/Penduduk.vue')
  },
  {
    path: '/data-kontrak',
    name: 'Kartu_keluarga',
    component: () => import('../views/Family.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
