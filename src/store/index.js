import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import whole from './modules/page'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    whole
  },
  getters
})

export default store
