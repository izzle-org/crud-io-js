# Izzle Crud IO JS Lib

> Simple Crud Service Lib, based on OAuth2 Authorization and Axios Calls

## Installation

> Using npm:
 ```shell
 $ npm i -g npm
 $ npm i @izzle/crud-io
 ```

## Usage

> My Crud Service 'product.service.js'
```js
import { CrudService, ApiService } from '@izzle/crud-io'

export default class extends CrudService {
    constructor () {
        super('products')
    }
}
```

> index.js
```js
process.env.API_BASE_URL = 'https://api.foo.bar'

import { JwtService } from '@izzle/crud-io'

// Handle OAuth2
...
JwtService.setToken({ access_token: 'foobar' })

import ProductService from './product.service.js'

const service = new ProductService()
let products = service.list()
```

## License

Copyright (c) 2020-present Daniel Böhmer

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
