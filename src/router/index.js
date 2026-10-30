import {createRouter, createWebHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('../views/Person.vue')
  }
]
const router = createRouter({ 
  history: createWebHistory(),
  routes: routes       
})

export default router