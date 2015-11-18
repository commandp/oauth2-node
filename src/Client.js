import defaults from 'superagent-defaults';
import prefix from 'superagent-prefix';
import AuthCode from './AuthCode';
import ClientCredentials from './ClientCredentials';
import Password from './Password';
import Assertion from './Assertion';
import RefreshToken from './RefreshToken';
import AccessToken from './AccessToken';

class Client {
  constructor(clientID, clientSecret, { site, authorizePath, tokenPath, connectionBuild, accessTokenMixin } = {}) {
    this.site = site;
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.authorizePath = authorizePath || '/oauth/authorize';
    this.tokenPath = tokenPath || '/oauth/token';
    this.connectionBuild = connectionBuild;
    this.http = this.buildHTTP();
    this.accessTokenMixin = accessTokenMixin;
  }

  buildHTTP() {
    var http = defaults().use(prefix(this.site)).accept('json');
    if (this.connectionBuild) {
      http = this.connectionBuild(http);
    }
    return http;
  }

  authCode() {
    return new AuthCode(this);
  }

  clientCredentials() {
    return new ClientCredentials(this);
  }

  password() {
    return new Password(this);
  }

  assertion() {
    return new Assertion(this);
  }

  refreshToken() {
    return new RefreshToken(this);
  }

  deserializeToken(token) {
    return new AccessToken(this, token);
  }
}

export default Client;
