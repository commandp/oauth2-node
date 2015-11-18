OAuth2 client for node.js
=========================

a simple port of https://github.com/intridea/oauth2.

## Usage

``` javascript
import OAuth2 from 'oauth2-node'

const clientConfig = {
  site: HOST
}

const client = new OAuth2.Client(APP_ID, SECRET, clientConfig)

const authURL = client.authCode().getAuthorizeURL({ redirect_uri: '/oauth/callback' })
client.authCode().getToken('code', redirect_uri).then(token => ...)

client.password().getToken('username', 'password').then(token => ...)

client.clientCredentials().getToken().then(token => ...)

client.assertion().getToken(params).then(token => ...)
```

## License

MIT
