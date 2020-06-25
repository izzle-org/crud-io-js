import axios from 'axios'

const ApiService = {
    init (baseUrl) {
        axios.defaults.headers.common['Accept'] = 'application/json'
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        axios.defaults.baseURL = baseUrl
    },

    setAuthHeader (header) {
        axios.defaults.headers.common['Authorization'] = header
    },

    async get (resource, params = {}, config = {}) {
        return axios.get(resource, { ...config, ...{ params: params } }).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    async post (resource, data = {}, config = null) {
        return axios.post(resource, data, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    async create (resource, data = {}, config = null) {
        return this.post(resource, data, config)
    },

    async patch (resource, data = {}, config = null) {
        return axios.patch(resource, data, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    async update (resource, data, config) {
        return this.patch(resource, data, config)
    },

    async remove (resource, params = {}, config = {}) {
        return axios.delete(resource, { ...config, ...{ params: params } }).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    }
}

export default ApiService
