import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const JWT_KEY = 'auth.jwt'
const STORAGE_TYPE_LOCAL = 'local_storage'
const STORAGE_TYPE_SESSION = 'session_storage'

const JwtService = {
    encrypt: false,

    secretKey: null,

    storage: STORAGE_TYPE_LOCAL,

    getToken () {
        let data = this.getStorage().getItem(JWT_KEY)
        if (this.encrypt && this.checkEncryptKey()) {
            let bytes = CryptoJS.AES.decrypt(data, this.secretKey)

            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        }

        return JSON.parse(data)
    },

    setToken (token) {
        let data = JSON.stringify(token)
        if (this.encrypt && this.checkEncryptKey()) {
            data = CryptoJS.AES.encrypt(data, this.secretKey).toString()
        }

        this.getStorage().setItem(JWT_KEY, data)
    },

    destroyToken () {
        this.getStorage().removeItem(JWT_KEY)
    },

    getStorage () {
        switch (this.storage) {
            case STORAGE_TYPE_LOCAL:
                return localStorage
            case STORAGE_TYPE_SESSION:
                return sessionStorage
            default:
                return localStorage
        }
    },

    checkEncryptKey () {
        if (this.secretKey === null || this.secretKey.length === 0) {
            throw new Error('Encrypt key is null or empty')
        }

        return true
    },

    getPayload () {
        let data = this.getToken()
        if (data !== null) {
            let token = data.access_token
            let base64Url = token.split('.')[1]
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            let payload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))

            return JSON.parse(payload)
        }

        return null
    },

    willExpire (seconds) {
        let payload = this.getPayload()
        if (payload !== null) {
            if (seconds === undefined) {
                seconds = Math.min(300, payload.exp - payload.nbf) // If token expires in <= 300 seconds
            }

            return payload.exp - seconds <= Math.floor(Date.now() / 1000)
        }

        return false
    },

    verify (certificate, token) {
        let data = token !== undefined ? token : this.getToken()
        if (data === null) {
            throw new Error('Token verify: Token is null')
        }

        if (certificate === undefined || certificate == null) {
            throw new Error('Token verify: Certificate is undefined or null')
        }

        try {
            // NBF (not before) 5 minutes clock tolerance included
            jwt.verify(data.access_token, certificate, { clockTolerance: 300 })

            return true
        } catch (e) {
            this.destroyToken()

            throw e
        }
    },

    useLocalStorage () {
        this.storage = STORAGE_TYPE_LOCAL
    },

    useSessionStorage () {
        this.storage = STORAGE_TYPE_SESSION
    }
}

export default JwtService
