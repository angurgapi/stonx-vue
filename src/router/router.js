import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import SignIn from '../pages/signin.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signin',
      component: SignIn
    }
  ],
  mode: 'history'
})

export default router