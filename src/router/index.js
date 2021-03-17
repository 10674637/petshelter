import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import Adoption from '../views/adoption/Adoption.vue'
import Donation from '../views/donation/Donation.vue'
import PostsAll from '../views/postsLostAndFound/PostsAll.vue'
import PostsCreate from '../views/postsLostAndFound/PostsCreate.vue'
import PostsEdit from '../views/postsLostAndFound/PostsEdit.vue'
import Contact from '../views/contact/Contact.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/posts',
    name: 'posts-all',
    component: PostsAll
  },

  {
    path: '/posts/new',
    name: 'posts-create',
    component: PostsCreate
  },

  {
    path: '/posts/:id',
    name: 'posts-edit',
    component: PostsEdit
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/adoption',
    name: 'adoption',
    component: Adoption
  },

  {
    path: '/donation',
    name: 'donation',
    component: Donation
  },

  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },

  {
    path: '*',
    redirect:'/'
  },

]

const router = new VueRouter({
  routes
})

export default router
