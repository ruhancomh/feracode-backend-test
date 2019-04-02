/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

// Routes
import paths from './paths'

function route (path, view, name, children, meta) {
  return {
    name: name,
    path,
    meta: (meta && meta.layout) ? meta : {
      layout: 'the-layout-default',
      ...meta
    },
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle),
    children: children ? children.map(child => route(child.path, child.view, child.name, child.children, child.meta)): null
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.children, path.meta)),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('RESET_TOOLBAR_BACK_URL')

  const publicPages = ['/login']

  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !store.getters.IS_USER_LOGGED) {
    next('/login')
  } else {
    next()
  }

})

export default router