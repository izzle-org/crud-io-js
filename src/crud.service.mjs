import ApiService from './api.service.mjs'

export default class CrudService {
    constructor (endpoint) {
        this.endpoint = endpoint
    }

    async one (id, config = {}) {
        return ApiService.get(this.endpoint + '/' + id, config)
    }

    async list (params, subUrl, config = {}) {
        params = typeof params === 'object' && params !== null ? params : {}
        let url = subUrl !== undefined ? this.endpoint + subUrl : this.endpoint

        return ApiService.get(url, params, config)
    }

    async save (payload, config = {}) {
        if (typeof payload !== 'object' ||
            payload === null ||
            payload.id === undefined) {

            throw new Error('CrudService error: Param payload must be type object with id and data property')
        }

        return payload.id > 0
            ? ApiService.update(this.endpoint + '/' + payload.id, payload, config)
            : ApiService.create(this.endpoint, payload, config)
    }

    async remove (payload, config = {}) {
        if (typeof payload !== 'object' ||
            payload === null ||
            payload.id === undefined ||
            payload.data === undefined) {

            throw new Error('CrudService error: Param payload must be type object with id and data property')
        }

        return ApiService.remove(this.endpoint + '/' + payload.id, payload.data, config)
    }
}
