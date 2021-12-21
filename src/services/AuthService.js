import api from "./api/ApiClient"

/**
 * @param {String} email
 * @param {String} password
 * @returns {Promise<AxiosResponse<any>>}
 */
export function login (email, password) {
    return api.post("/login", { email, password })
}

/**
 * @param {Object} userData
 * @returns {Promise<AxiosResponse<any>>}
 */
export function register (userData) {
    return api.post("/register", userData)
}

/**
 * @param {String} email
 * @returns {Promise<AxiosResponse<any>>}
 */
export function forgot (email) {
    return api.post("/forgot", { email })
}

/**
 * @param {String} token
 * @param {Object} userData
 * @returns
 */
export function reset (token, userData) {
    return api.post(`/reset/${token}`, userData)
}