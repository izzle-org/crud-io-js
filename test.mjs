import { ApiService } from './index.mjs'

ApiService.init('https://jsonplaceholder.typicode.com')
ApiService.get('posts')
    .then(response => {
        console.log(response.data)
    })

ApiService.get('posts/1')
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
