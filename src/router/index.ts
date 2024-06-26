import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: () => import('@/pages/Home/index.vue') },
  { name: 'detail', path: '/detail', component: () => import('@/pages/Detail/index.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
