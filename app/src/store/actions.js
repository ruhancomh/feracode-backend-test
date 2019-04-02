import router from "../router";

// https://vuex.vuejs.org/en/actions.html

export default {
  USER_LOGIN: (context, payload) => {

    return new Promise((resolve) => {
      context.commit('SET_ACCESS_TOKEN', {
        access_token: payload.access_token
      })
  
      context.commit('SET_USER', {
        user: payload.user
      })

      resolve()
    })
  },

  USER_LOGOUT: (context) => {
    context.commit('SET_ACCESS_TOKEN', {
      access_token: null
    })

    context.commit('SET_USER', {
      user: null
    })

    context.dispatch('USER_CLEAR_PERMISSIONS')
  },

  FORCE_USER_LOGOUT: (context, payload) => {
    router.push({ path: '/login' })
    context.dispatch('USER_LOGOUT')
    context.dispatch('USER_CLEAR_PERMISSIONS')
    context.commit('SHOW_ALERT',{
      type: 'error',
      message: payload.message
    })
  },

  USER_LOAD_PERMISSIONS: (context, payload) => {
    return new Promise((resolve) => {
      context.commit('SET_USER_PERMISSIONS', payload.user_permissions)

      resolve()
    })
  },

  USER_CLEAR_PERMISSIONS: (context) => {
    return new Promise((resolve) => {
      context.commit('SET_USER_PERMISSIONS', null)

      resolve()
    })
  }
}