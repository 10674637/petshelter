import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: `${process.env.NODE_ENV === 'production' ? location.origin : 'http://localhost:3000'}/api`,
    username: null,
    userId: null,
    role: null
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if(state.isLoggedIn) {
        state.username = auth.getUsername();
        state.userId = auth.getUserId();
        state.role = auth.getUserRole();
      }
      else {
        state.userId = null;
        state.username = null;
        state.role = null;
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  },
  modules: {
  }
})
