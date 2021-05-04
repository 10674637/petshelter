import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import Donation from '../views/donation/Donation.vue'
import PostsAll from '../views/postsLostAndFound/PostsAll.vue'
import PostsCreate from '../views/postsLostAndFound/PostsCreate.vue'
import PostsEdit from '../views/postsLostAndFound/PostsEdit.vue'
import Contact from '../views/contact/Contact.vue'
import * as auth from '../services/AuthService'
import AllFoundPet from '../views/postsLostAndFound/AllFoundPets.vue'
import AllLostPet from '../views/postsLostAndFound/AllLostPets.vue'
import Adoption from '../views/adoption/Adoption.vue'
import AdoptionDetail from '../views/adoption/AdoptionDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/adoption/:id',
    name: 'adoptionDetail',
    component: AdoptionDetail
  },

  {
    path: '/posts',
    name: 'posts-all',
    component: PostsAll
  },

  {
    path: '/AllFoundPet',
    name: 'AllFoundPet',
    component: AllFoundPet
  },
  {
    path: '/Adoption',
    name: 'Adoption',
    component: Adoption
  },

  {
    path: '/AllLostPet',
    name: 'AllLostPet',
    component: AllLostPet
  },

  {
    path: '/posts/new',
    name: 'posts-create',
    component: PostsCreate,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },

  {
    path: '/posts/:id',
    name: 'posts-edit',
    component: PostsEdit,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next('/');
      }
    }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        console.log("NEXT")
        next();
      } else {
        console.log("slashes")
        next('/');
      }
    }
  },

  {
    path: '/adoption',
    name: 'adoption',
    component: Adoption
  },

  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) auth.logout();
      next({ name: 'home', replace: from.name === 'home' });
    }
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
    redirect: '/'
  },

]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history',
})

export default router
