import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: () => import('@/pages/Home/index.vue') },
  { name: 'detail', path: '/detail/:id', component: () => import('@/pages/Detail/index.vue') },
]

const router = createRouter({
  history: createWebHashHistory('/pre-test/'),
  routes,
})
export default router
