import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TapInView from '../views/TapInView.vue'
import TapOutView from '../views/TapOutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/tap-in',
      name: 'tapin',
      component: TapInView
    },
    {
      path: '/tap-out',
      name: 'tapout',
      component: TapOutView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token') && to.name !== 'login') {
    next('/login')
  } else if (
    localStorage.getItem('access_token') &&
    (to.name === 'login')
  ) {
    next('/tap-in')
  } else {
    next()
  }
})

export default router
