/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import router from './../router'

// Store functionality
import actions from './actions'
import getters from './getters'
// import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    user: state.user
  })
})

// Create a new store
const store = new Vuex.Store({
  actions,
  getters,
//  modules,
  mutations,
  state,
  plugins: [vuexLocal.plugin]
})

export default store