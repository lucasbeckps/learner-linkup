// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Importe seus componentes de página
import Home from '@/pages/Home.vue'
import Alunos from '@/pages/Students.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/alunos',
    name: 'Alunos',
    component: Alunos
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: Home
  }
  // outras rotas...
]

export const navigationItems = [
  {
    title: 'Home',
    icon: 'mdi-home',
    to: '/'
  },
  {
    title: 'Alunos',
    icon: 'mdi-account-group',
    to: '/alunos'
  },
  {
    title: 'Configurações',
    icon: 'mdi-cog',
    to: '/configuracoes'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router