import axios from "axios"
import store from "@/store"

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
})

api.interceptors.request.use(function (request) {
    request.headers.common.Authorization = `Bearer ${store.state.Auth.token}`
    return request
}, (error) => Promise.reject(error))

/**
 * @type {{ install: ApiPlugin.install }}
 */
export const ApiPlugin = {
    install: (Vue) => {
        Vue.prototype.$api = api
    },
}

export default api
