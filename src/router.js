import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from './components/HomeApp.vue'
import ActividadesBigBox from './components/ActividadesBigBox.vue'
import ActividadDetalle from './components/ActividadDetalle.vue'

const routes = [
  { path: '/', name:'Home' , component: HomeApp },
  { path: '/actividades', name: 'actividades', component: ActividadesBigBox },
  {
    path: '/actividades/:id',
    name: 'actividad',
    component: ActividadDetalle
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router