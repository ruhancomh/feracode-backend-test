// https://vuex.vuejs.org/en/getters.html

export default {
  IS_USER_LOGGED: (state) => {
    return state.user ? true : false
  },

  GET_USER: (state) => {
    return state.user
  },

  GET_ACCESS_TOKEN: (state) => {
    return state.access_token
  },

  GET_USER_PERMISSIONS: (state) => {
    return state.user_permissions
  }
}