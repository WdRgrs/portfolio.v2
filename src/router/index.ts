import { createRouter, createWebHistory } from 'vue-router'
import Landing from './views/Landing.vue'
import Software from './views/Software.vue'
import Welding from './views/Welding.vue'
import Photography from './views/Photography.vue'
import Resume from './views/Resume.vue'
import DevLog from './views/DevLog.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Landing },
    { path: '/software', component: Software },
    { path: '/dev-log', component: DevLog },
    { path: '/welding', component: Welding },
    { path: '/photography', component: Photography },
    { path: '/resume', component: Resume },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    }
  ],
})

export default router
