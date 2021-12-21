export default {
    namespaced: true,
    state: {
        message: null,
        type: null,
    },
    getters: {

        /**
         * @param {Object} state
         * @returns {Object}
         */
        showAlert (state) {
            return state
        },
    },
    mutations: {
        SHOW_ALERT (state, payload) {
            state.message = payload.message,
            state.type = payload.type
        },
    },
    actions: {

        /**
         * @param {String} commit
         * @param {object} payload
         */
        showAlert ({ commit }, payload) {
            commit("SHOW_ALERT", payload)
        },
    },
}
