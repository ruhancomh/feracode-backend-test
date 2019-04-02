// https://vuex.vuejs.org/en/mutations.html
import { set, toggle } from '@/utils/vuex'

export default {
  SET_DRAWER: set('drawer'),
  TOGGLE_DRAWER: toggle('drawer'),
  
  SHOW_ALERT: (state, payload) => {
    state.alert.value = true
    state.alert.type = payload.type ? payload.type : 'success'
    if(payload.type == 'error' && !payload.timeout) {
      state.alert.timeout = 0
    } else {
      state.alert.timeout = payload.timeout ? payload.timeout : state.alert.defaultTimeout
    }
    state.alert.message = payload.message
  },

  CLOSE_ALERT: (state) => {
    state.alert.value = false
    state.alert.type = null
    state.alert.message = null
  },

  SHOW_LOADER: (state, payload) => {
    state.loader.value = true
    state.loader.text = (payload && payload.text) ? payload.text : null
  },

  CLOSE_LOADER: (state) => {
    state.loader.value = false
    state.loader.text = null
  },

  SET_TOOLBAR_BACK_URL: (state, payload) => {
    state.toolbarBackUrl = payload
    
  },

  RESET_TOOLBAR_BACK_URL: (state) => {
    state.toolbarBackUrl = null
  },

  SET_ACCESS_TOKEN: (state, payload) => {
    state.access_token = payload.access_token
  },

  SET_USER: (state, payload) => {
    state.user = payload.user
  },

  SET_USER_PERMISSIONS: (state, payload) => {
    state.user_permissions = payload
  }
}