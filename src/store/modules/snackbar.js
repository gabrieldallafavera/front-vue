export default {
    namespaced: true,
    state: {
        message: null,
        show: false,
    },
    getters: {
        /**
         * @param {Object} state
         * @returns {Object}
         */
         showSnackbar (state) {
            return state
        },
    },
    mutations: {
        SHOW_SNACKBAR (state, payload) {
            state.message = payload.message,
            state.show = payload.show
        },
    },
    actions: {
        /**
         * @param {String} commit
         * @param {object} payload
         */
        showSnackbar ({ commit }, payload) {
            commit("SHOW_SNACKBAR", payload)
        },
    },
}
