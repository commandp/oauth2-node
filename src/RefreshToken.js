import AccessToken from './AccessToken';
import Promise from 'promise';

class RefreshToken {
  constructor(client) {
    this.client = client;
  }

  getToken(refreshToken) {
    return new Promise((resolve, reject) => {
      const form = {
        grant_type: 'refresh_token',             // eslint-disable-line camelcase
        client_id: this.client.clientID,         // eslint-disable-line camelcase
        client_secret: this.client.clientSecret, // eslint-disable-line camelcase
        refresh_token: refreshToken              // eslint-disable-line camelcase
      };

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

export default RefreshToken;
