import { db } from '@/core/db'
import Editor from '@/pages/Editor.vue'
import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/editor/:id',
      component: Editor,
    },
    {
      path: '/editor/:id',
      component: Editor,
    },
  ],
})

export default router
