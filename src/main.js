import Vue from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { ApiPlugin } from "./services/api/ApiClient"

import vuetify from "./plugins/vuetify"

import { extend, localize } from "vee-validate"
import ptBr from "vee-validate/dist/locale/pt_BR.json"
import * as rules from "vee-validate/dist/rules"

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize("pt_BR", ptBr)

Vue.use(ApiPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount("#app")