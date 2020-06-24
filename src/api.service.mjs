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

    get (resource, config = {}) {
        return axios.get(resource, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    post (resource, data = {}, config = null) {
        return axios.post(resource, data, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    create (resource, data = {}, config = null) {
        return this.post(resource, data, config)
    },

    patch (resource, data = {}, config = null) {
        return axios.patch(resource, data, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    update (resource, data, config) {
        return this.patch(resource, data, config)
    },

    remove (resource, config = {}) {
        return axios.delete(resource, config).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    }
}

export default ApiService
