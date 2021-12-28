export default {
    namespaced: true,
    state: {
        show: false,
    },
    getters: {
        /**
         * @param {Object} state
         * @returns {Object}
         */
        showLoading (state) {
            return state
        },
    },
    mutations: {
        SHOW_LOADING (state, payload) {
            state.show = payload.show
        },
    },
    actions: {

        /**
         * @param {String} commit
         * @param {object} payload
         */
        showLoading ({ commit }, payload) {
            commit("SHOW_LOADING", payload)
        },
    },
}
