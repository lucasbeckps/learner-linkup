import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Alunos from '@/pages/Students.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/alunos',
    name: 'Início'
  },
  {
    path: '/alunos',
    name: 'Alunos',
    component: Alunos
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

export default router
