import { axios } from 'axios'

const ApiService = {
    init () {
        axios.defaults.baseURL = process.env.API_BASE_URL
    },

    setHeader () {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + JwtService.getToken().access_token
    },

    get (resource, params) {
        params = (params !== undefined)
            ? { params: params }
            : {}

        return axios.get(resource, params).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    post (resource, data) {
        if (data === undefined) {
            data = {}
        }

        return axios.post(resource, data).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    create (resource, data) {
        return this.post(resource, data)
    },

    patch (resource, data) {
        if (data === undefined) {
            data = {}
        }

        return axios.patch(resource, data).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    },

    update (resource, data) {
        return this.patch(resource, data)
    },

    remove (resource, params) {
        params = (params !== undefined)
            ? { params: params }
            : {}

        return axios.delete(resource, params).catch(error => {
            throw new Error('ApiService error: ' + error.message)
        })
    }
}

export default ApiService
