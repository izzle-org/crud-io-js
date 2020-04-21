import ApiService from './api.service'

export default class CrudService {
    constructor (endpoint) {
        this.baseUrl = process.env.API_BASE_URL + '/' + endpoint
    }

    async one (id) {
        return ApiService.get(this.baseUrl + '/' + id)
    }

    async list (params, subUrl) {
        const url = subUrl !== undefined ? this.baseUrl + subUrl : this.baseUrl

        return ApiService.get(url, params)
    }

    async save (payload) {
        return payload.id !== undefined && payload.id > 0
            ? ApiService.update(this.baseUrl + '/' + payload.id, payload)
            : ApiService.create(this.baseUrl, payload)
    }

    async remove (payload) {
        return ApiService.remove(this.baseUrl + '/' + payload.id, payload.data)
    }
}
