import axios from 'axios'

const ApiService = {
    errorHandler: null,

    init (baseUrl, withCredentials) {
        axios.defaults.headers.common['Accept'] = 'application/json'
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        axios.defaults.withCredentials = withCredentials !== undefined ? withCredentials : true
        axios.defaults.baseURL = baseUrl
    },

    setAuthHeader (header) {
        axios.defaults.headers.common['Authorization'] = header
    },

    setHeaders (headers) {
        axios.defaults.headers.common = { ...axios.defaults.headers.common, ...headers }
    },

    axios () {
        return axios
    },

    onErrorHandler (callback) {
        if (typeof callback !== 'function') {
            return
        }

        ApiService.errorHandler = callback
    },

    onError (error) {
        if (ApiService.errorHandler && typeof ApiService.errorHandler === 'function') {
            ApiService.errorHandler(error)
        }

        return error
    },

    async get (resource, params = {}, config = {}) {
        return axios.get(resource, { ...config, ...{ params: params } }).catch(error => {
            return Promise.reject(ApiService.onError(error))
        })
    },

    async post (resource, data = {}, config = null) {
        return axios.post(resource, data, config).catch(error => {
            return Promise.reject(ApiService.onError(error))
        })
    },

    async create (resource, data = {}, config = null) {
        return this.post(resource, data, config)
    },

    async patch (resource, data = {}, config = null) {
        return axios.patch(resource, data, config).catch(error => {
            return Promise.reject(ApiService.onError(error))
        })
    },

    async update (resource, data, config) {
        return this.patch(resource, data, config)
    },

    async remove (resource, params = {}, config = {}) {
        return axios.delete(resource, { ...config, ...{ params: params } }).catch(error => {
            return Promise.reject(ApiService.onError(error))
        })
    }
}

export default ApiService
