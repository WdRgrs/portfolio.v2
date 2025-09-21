import { createRouter, createWebHistory } from 'vue-router'
import { LINKS, SITE_LINKS } from '@/constants'
import Landing from '@/views/Landing.vue'
import Development from '@/views/Developer.vue'
import Welding from '@/views/Welding.vue'
import Photography from '@/views/Photography.vue'
import Resume from '@/views/Resume.vue'
import DevLog from '@/views/DevLog.vue'
import NotFound from '@/views/NotFound.vue'

const { 
  LANDING,
  DEVELOPMENT,
  WELDING,
  PHOTOGRAPHY,
  DEV_LOG,
  RESUME
} = LINKS.SITE

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: LANDING, component: Landing },
    { path: DEVELOPMENT, component: Development },
    { path: WELDING, component: Welding },
    { path: PHOTOGRAPHY, component: Photography },
    { path: DEV_LOG, component: DevLog },
    { path: RESUME, component: Resume },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    }
  ],
})

export default router
