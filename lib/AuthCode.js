import _ from 'lodash';
import querystring from 'querystring';
import AccessToken from './AccessToken';

class AuthCode {
  constructor(client) {
    this.client = client;
  }

  getAuthorizeURL(params) {
    const query = {
      response_type: 'code',          // eslint-disable-line camelcase
      client_id: this.client.clientID // eslint-disable-line camelcase
    };
    _.assign(query, params);

    if (this.client.authorizePath.startsWith('http')) {
      return this.client.authorizePath + '?' + querystring.stringify(query);
    } else {
      return this.client.site + this.client.authorizePath + '?' + querystring.stringify(query);
    }
  }

  getToken(code, params) {
    return new Promise((resolve, reject) => {
      const form = {
        grant_type: 'authorization_code',        // eslint-disable-line camelcase
        client_id: this.client.clientID,         // eslint-disable-line camelcase
        client_secret: this.client.clientSecret, // eslint-disable-line camelcase
        code: code
      };
      _.assign(form, params);

      const createAccessToken = (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.type === 'text/plain') {
            resolve(new AccessToken(this.client, querystring.parse(res.text)));
          } else {
            resolve(new AccessToken(this.client, res.body));
          }
        }
      };

      this.client.http.post(this.client.tokenPath)
                      .send(form)
                      .end(createAccessToken);
    });
  }
}

export default AuthCode;
