import { login } from "@/services/AuthService"

export default {
    namespaced: true,
    state: {
        user: {},
        token: null,
    },
    getters: {
        /**
         * @param {Object} store
         * @returns {Object}
         */
        isAuthenticated(store) {
            return !!store.token
        },

        /**
         * @param {Object} store
         * @returns {Object}
         */
        user(store) {
            return store.user
        },

        /**
         * @param {Object} store
         * @returns {Object}
         */
        permissions(store) {
            return store.user.permissions
        },
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_TOKEN(state, payload) {
            state.token = payload
        },
    },
    actions: {
        /**
         * @param {String} commit
         * @param {String} email
         * @param {String} password
         */
        async login({ commit }, email, password) {
            const { data } = await login(email, password)

            commit("SET_USER", data.data.user)
            commit("SET_TOKEN", data.data.token)
        },

        /**
         * @param {String} commit
         */
        async logout({ commit }) {
            commit("SET_USER", {})
            commit("SET_TOKEN", "")
        },
    },
}