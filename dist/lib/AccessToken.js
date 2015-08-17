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

var AccessToken = (function () {
  function AccessToken(client, _ref) {
    var access_token = _ref.access_token;
    var refresh_token = _ref.refresh_token;
    var created_at = _ref.created_at;
    var expires_in = _ref.expires_in;
    var scope = _ref.scope;

    _classCallCheck(this, AccessToken);

    // eslint-disable-line camelcase
    this.client = client;
    this.accessToken = access_token; // eslint-disable-line camelcase
    this.refreshToken = refresh_token; // eslint-disable-line camelcase
    this.createdAt = created_at; // eslint-disable-line camelcase
    this.expiresIn = expires_in; // eslint-disable-line camelcase
    this.scope = scope;
    this.http = this.client.buildHTTP().set('Authorization', 'Bearer ' + this.accessToken);
    _lodash2['default'].assign(this, this.client.accessTokenMixin);
  }

  _createClass(AccessToken, [{
    key: 'serialize',
    value: function serialize() {
      return {
        access_token: this.accessToken, // eslint-disable-line camelcase
        refresh_token: this.refreshToken, // eslint-disable-line camelcase
        created_at: this.createdAt, // eslint-disable-line camelcase
        expires_in: this.expiresIn, // eslint-disable-line camelcase
        scope: this.scope
      };
    }
  }, {
    key: 'isExpired',
    value: function isExpired() {
      var expiresAt = (this.createdAt + this.expiresIn) * 1000;
      var now = new Date().getTime();
      return expiresAt < now;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.refreshToken) {
        return this.client.refreshToken().getToken(this.refreshToken);
      } else {
        return this.client.clientCredentials().getToken(this.scope);
      }
    }
  }, {
    key: 'get',
    value: function get(path, params, headers) {
      var _this = this;

      return new _promise2['default'](function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this.http.get(path).set(headers).query(params).end(handler);
      });
    }
  }, {
    key: 'post',
    value: function post(path, params, headers) {
      var _this2 = this;

      return new _promise2['default'](function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this2.http.post(path).set(headers).send(params).end(handler);
      });
    }
  }, {
    key: 'patch',
    value: function patch(path, params, headers) {
      var _this3 = this;

      return new _promise2['default'](function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this3.http.patch(path).set(headers).query(params).end(handler);
      });
    }
  }, {
    key: 'put',
    value: function put(path, params, headers) {
      var _this4 = this;

      return new _promise2['default'](function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this4.http.put(path).set(headers).send(params).end(handler);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path, params, headers) {
      var _this5 = this;

      return new _promise2['default'](function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this5.http.del(path).set(headers).query(params).end(handler);
      });
    }
  }]);

  return AccessToken;
})();

exports['default'] = AccessToken;
module.exports = exports['default'];