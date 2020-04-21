import { JwtService } from '../build/crud-io'

JwtService.setToken({ access_token: 'huhu' })

console.log(JwtService.getToken())
