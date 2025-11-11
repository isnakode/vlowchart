import Editor from '@/pages/Editor.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'
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
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, },
  ],
})

export default router
