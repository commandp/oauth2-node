import _ from 'lodash';

class AccessToken {
  constructor(client, { access_token, refresh_token, scope }) { // eslint-disable-line camelcase
    this.client = client;
    this.accessToken = access_token;   // eslint-disable-line camelcase
    this.refreshToken = refresh_token; // eslint-disable-line camelcase
    this.scope = scope;
    this.http = this.client.http.set('Authorization', `Bearer ${this.accessToken}`);
    _.assign(this, this.client.accessTokenMixin);
  }

  serialize() {
    return {
      access_token: this.accessToken,   // eslint-disable-line camelcase
      refresh_token: this.refreshToken, // eslint-disable-line camelcase
      scope: this.scope
    };
  }

  refresh() {
    if (this.refreshToken) {
      return this.client.refreshToken().getToken(this.refreshToken);
    } else {
      return this.client.clientCredentials().getToken(this.scope);
    }
  }

  get(path, params) {
    return new Promise((resolve, reject) => {
      const handler = (err, res) => err ? reject(err) : resolve(res.body);
      this.http.get(path).query(params).end(handler);
    });
  }

  post(path, params) {
    return new Promise((resolve, reject) => {
      const handler = (err, res) => err ? reject(err) : resolve(res.body);
      this.http.post(path).send(params).end(handler);
    });
  }

  patch(path, params) {
    return new Promise((resolve, reject) => {
      const handler = (err, res) => err ? reject(err) : resolve(res.body);
      this.http.patch(path).query(params).end(handler);
    });
  }

  put(path, params) {
    return new Promise((resolve, reject) => {
      const handler = (err, res) => err ? reject(err) : resolve(res.body);
      this.http.put(path).send(params).end(handler);
    });
  }

  delete(path, params) {
    return new Promise((resolve, reject) => {
      const handler = (err, res) => err ? reject(err) : resolve(res.body);
      this.http.del(path).query(params).end(handler);
    });
  }
}

export default AccessToken;
