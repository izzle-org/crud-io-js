import { ApiService, JwtService } from './index.mjs'

ApiService.init('https://jsonplaceholder.typicode.com')
ApiService.get('posts')
    .then(response => {
        console.log(response.data)
    })

ApiService.get('posts/1')
    .then(response => {
        console.log(response.data)
    })

ApiService.get('posts', { userId: 1 })
    .then(response => {
        console.log(response.data)
    })

ApiService.create('posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
})
    .then(response => {
        console.log(response.data)
    })

JwtService.secretKey = 'foobar'
JwtService.useMemoryStorage()
JwtService.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
const payload = JwtService.getPayload()
console.log(payload)
