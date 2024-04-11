import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Alunos from '@frontend/pages/Students.vue'
import Login from '@frontend/pages/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/alunos',
    name: 'home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/alunos',
    name: 'students',
    component: Alunos,
    meta: {
      requiresAuth: true
    }
  }
]

export const navigationItems = [
  {
    title: 'Alunos',
    icon: 'mdi-account-group',
    to: '/alunos'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.matched.some((record) => record.meta.guestOnly) && isAuthenticated) {
    next({ name: 'home' }) // Redirecionar para home se tentar acessar login estando logado
  } else {
    next()
  }
})

export default router
