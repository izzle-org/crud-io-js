process.env.API_BASE_URL = 'http://dummy.restapiexample.com/api/v1'

import { JwtService, ApiService } from '../build/crud-io'

JwtService.setToken({ access_token: 'huhu' })

console.log(JwtService.getToken())

ApiService.get('employee')
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
