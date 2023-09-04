import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'
import AddVehicleView from '../views/AddVehicleView.vue'
import ParkingVehicle from '../views/ParkingVehicleView.vue'
import ParkingRecordView from '../views/ParkingRecordView.vue'
import TransactionRecordView from '../views/TransactionRecordView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: SubscriptionView
    },
    {
      path: '/addVehicle',
      name: 'addVehicle',
      component: AddVehicleView
    },
    {
      path: '/parkingVehicle',
      name: 'parkingVehicle',
      component: ParkingVehicle
    },
    {
      path: '/parkingRecord',
      name: 'parkingRecord',
      component: ParkingRecordView
    },
    {
      path: '/transactionRecord',
      name: 'transactionRecord',
      component: TransactionRecordView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token') && to.name !== 'login' && to.name !== 'register') {
    next('/login')
  } else if (
    localStorage.getItem('access_token') &&
    (to.name === 'login' || to.name === 'register')
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
