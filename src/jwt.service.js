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
                seconds = 300
            }

            return payload.exp - seconds <= Math.floor(Date.now() / 1000)
        }

        return false
    },

    verify (certificate, token) {
        let data = token !== undefined ? token : this.getToken()
        if (data === null) {
            return false
        }

        if (certificate === undefined || certificate == null) {
            return false
        }

        try {
            jwt.verify(data.access_token, certificate)

            return true
        } catch (e) {
            this.destroyToken()

            return false
        }
    }
}

export default JwtService
