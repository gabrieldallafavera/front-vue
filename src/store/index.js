import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import Alert from "./modules/alert"
import Auth from "./modules/auth"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({ paths: ["Auth"] })],
    modules: {
        Auth,
        Alert,
    },
})
