import jwt from 'jsonwebtoken'

const JWT_KEY = 'auth.jwt'

const JwtService = {
    getToken () {
        return JSON.parse(localStorage.getItem(JWT_KEY))
    },

    setToken (token) {
        localStorage.setItem(JWT_KEY, JSON.stringify(token))
    },

    destroyToken () {
        localStorage.removeItem(JWT_KEY)
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
    }
}

export default JwtService
