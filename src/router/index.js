import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListadoEmpresas from '../views/ListadoEmpresas.vue'
import Empresa from '../views/Empresa.vue'
import ListadoOfertas from '../views/ListadoOfertas.vue'
import FormOfertas from '../views/FormOfertas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/empresas',
    name: 'ListadoEmpresas',
    component: ListadoEmpresas
  },
  {
    path: '/empresa/:id',
    name: 'Empresa',
    component: Empresa,
    props: true
  },
  {
    path: '/new',
    name: 'FormOfertas',
    component: FormOfertas
  },
  {
    path: '/edit/:id',
    name: 'EditOfertas',
    component: FormOfertas,
    props: true
  },
  {
    path: '/ofertas/:idEmpresa',
    name: 'ListadoOfertas',
    component: ListadoOfertas,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
