import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompanyComponent from '../views/company/CompanyComponent.vue'
import ListComponent from '../views/curso/ListComponent.vue'
import goTo from 'vuetify/lib/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/company',
    name: 'company',
    component: CompanyComponent
  },
  {
    path: '/list',
    name: 'list',
    component: ListComponent
  },
  { 
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  console.log(from)
  document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
  next()
})

router.afterEach((to, from) => {
  console.log("afterEach",to)
  goTo(0, { duration: 0 })
})

export default router
