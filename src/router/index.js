import { createRouter, createWebHistory } from 'vue-router'
import ReceiveParcelView from '../views/ReceiveParcelView.vue'
import PickupParcelView from '../views/PickupParcelView.vue'
import QrView from '../views/QrView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/receive_parcel',
      name: 'receive',
      component: ReceiveParcelView
    },
    {
      path: '/pickup_parcel',
      name: 'pickup',
      component: PickupParcelView
    },
    {
      path: '/qr/:qr',
      name: 'qr',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: QrView,
      props: true
    }
  ]
})

export default router
