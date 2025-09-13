import { createRouter, createWebHistory } from 'vue-router'
import Landing from './views/Landing.vue'
import Software from './views/Software.vue'
import Welding from './views/Welding.vue'
import Photography from './views/Photography.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Landing },
    { path: '/software', component: Software },
    { path: '/welding', component: Welding },
    { path: '/photography', component: Photography },
  ],
})

export default router
