# Izzle Crud IO JS Lib

> Simple Crud Service Lib, based on OAuth2 Authorization and Axios Calls

## Installation

> Using npm:
 ```shell
 $ npm i -g npm
 $ npm i @izzle-org/crud-io
 ```

## Usage

> My Crud Service 'product.service.js'
```js
import { CrudService } from '@izzle-org/crud-io'

export default class extends CrudService {
    constructor () {
        super('products')
    }
}
```

> index.js
```js
import { ApiService, JwtService } from '@izzle-org/crud-io'

// Handle OAuth2
...
// JWT Config
JwtService.encrypt = true
JwtService.secretKey = 'foobar123'
JwtService.useSessionStorage()

JwtService.setToken({ access_token: 'foobar' })

// API Config
ApiService.init('https://api.foo.bar')
ApiService.setAuthHeader('Bearer ' + JwtService.getToken().access_token)

import ProductService from './product.service.js'

const service = new ProductService()

// GET https://api.foo.bar/products with Authorization Header (Bearer foobar)
let products = service.list()
```

## License

Copyright (c) 2020-present Daniel Böhmer

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
