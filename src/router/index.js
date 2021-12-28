import Vue from "vue"
import Router from "vue-router"
import store from "@/store"
import { getInheritanceMetaAttribute, matchUserPermissions } from "@/router/tools/permissions"

import Auth from "./modules/auth"
import Home from "./modules/home"

Vue.use(Router)

const routes = [
  ...Auth,
  ...Home,
]

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return window.scrollTo({ top: 0 })
  },
})

/**
 * @param {String} routeTo
 * @param {String} routeFrom
 * @param {Vue} next
 */
router.beforeEach((routeTo, routeFrom, next) => {
  const isAuthenticated = store.getters["Auth/isAuthenticated"]
  const permissions = store.getters["Auth/permissions"]
  const isProtectedRoute = getInheritanceMetaAttribute("isProtected", routeTo.matched)
  const isOnlyGuestRoute = getInheritanceMetaAttribute("onlyGuest", routeTo.matched)

  if (isOnlyGuestRoute && isAuthenticated) {
    return next(routeFrom)
  }

  if (!isProtectedRoute) {
    return next()
  }

  if (isAuthenticated) {
    if (routeTo.meta.permissions) {
      const routePerm = getInheritanceMetaAttribute("permissions", routeTo.matched)
      const matchPerms = matchUserPermissions(routePerm, permissions)
      if (!matchPerms) {
        return next(routeFrom)
      }
    }
    return next()
  }

  return next({ name: "login" })
})

export default router
