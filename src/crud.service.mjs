import ApiService from './api.service.mjs'

export default class CrudService {
    constructor (endpoint) {
        this.endpoint = endpoint
    }

    async one (id, config = {}) {
        return ApiService.get(this.endpoint + '/' + id, config)
    }

    async list (params, subUrl, config = {}) {
        const url = subUrl !== undefined ? this.endpoint + subUrl : this.endpoint

        return ApiService.get(url, {
            ...config,
            ...{ params: params }
        })
    }

    async save (payload, config = {}) {
        return payload.id !== undefined && payload.id > 0
            ? ApiService.update(this.endpoint + '/' + payload.id, payload, config)
            : ApiService.create(this.endpoint, payload, config)
    }

    async remove (payload, config = {}) {
        return ApiService.remove(this.endpoint + '/' + payload.id, {
            ...config,
            ...{ params: payload.data }
        })
    }
}
