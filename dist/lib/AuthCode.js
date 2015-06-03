'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _AccessToken = require('./AccessToken');

var _AccessToken2 = _interopRequireDefault(_AccessToken);

var AuthCode = (function () {
  function AuthCode(client) {
    _classCallCheck(this, AuthCode);

    this.client = client;
  }

  _createClass(AuthCode, [{
    key: 'getAuthorizeURL',
    value: function getAuthorizeURL(params) {
      var query = {
        response_type: 'code', // eslint-disable-line camelcase
        client_id: this.client.clientID // eslint-disable-line camelcase
      };
      _lodash2['default'].assign(query, params);

      if (this.client.authorizePath.startsWith('http')) {
        return this.client.authorizePath + '?' + _querystring2['default'].stringify(query);
      } else {
        return this.client.site + this.client.authorizePath + '?' + _querystring2['default'].stringify(query);
      }
    }
  }, {
    key: 'getToken',
    value: function getToken(code, params) {
      var _this = this;

      return new _promise2['default'](function (resolve, reject) {
        var form = {
          grant_type: 'authorization_code', // eslint-disable-line camelcase
          client_id: _this.client.clientID, // eslint-disable-line camelcase
          client_secret: _this.client.clientSecret, // eslint-disable-line camelcase
          code: code
        };
        _lodash2['default'].assign(form, params);

        var createAccessToken = function createAccessToken(err, res) {
          if (err) {
            reject(err);
          } else {
            if (res.type === 'text/plain') {
              resolve(new _AccessToken2['default'](_this.client, _querystring2['default'].parse(res.text)));
            } else {
              resolve(new _AccessToken2['default'](_this.client, res.body));
            }
          }
        };

        _this.client.http.post(_this.client.tokenPath).send(form).end(createAccessToken);
      });
    }
  }]);

  return AuthCode;
})();

exports['default'] = AuthCode;
module.exports = exports['default'];