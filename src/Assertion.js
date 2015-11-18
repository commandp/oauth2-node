import _ from 'lodash';
import Promise from 'promise';
import AccessToken from './AccessToken';

class Assertion {
  constructor(client) {
    this.client = client;
  }

  getToken(params) {
    return new Promise((resolve, reject) => {
      const form = {
        grant_type: 'assertion',                // eslint-disable-line camelcase
        client_id: this.client.clientID,        // eslint-disable-line camelcase
        client_secret: this.client.clientSecret // eslint-disable-line camelcase
      };
      _.assign(form, params);

      const createAccessToken = (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(new AccessToken(this.client, res.body));
        }
      };

      this.client.http.post(this.client.tokenPath)
                      .send(form)
                      .end(createAccessToken);
    });
  }
}

export default Assertion;
