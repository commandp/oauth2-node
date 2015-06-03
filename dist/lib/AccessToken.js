'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var AccessToken = (function () {
  function AccessToken(client, _ref) {
    var access_token = _ref.access_token;
    var refresh_token = _ref.refresh_token;
    var scope = _ref.scope;

    _classCallCheck(this, AccessToken);

    // eslint-disable-line camelcase
    this.client = client;
    this.accessToken = access_token; // eslint-disable-line camelcase
    this.refreshToken = refresh_token; // eslint-disable-line camelcase
    this.scope = scope;
    this.http = this.client.http.set('Authorization', 'Bearer ' + this.accessToken);
    _lodash2['default'].assign(this, this.client.accessTokenMixin);
  }

  _createClass(AccessToken, [{
    key: 'serialize',
    value: function serialize() {
      return {
        access_token: this.accessToken, // eslint-disable-line camelcase
        refresh_token: this.refreshToken, // eslint-disable-line camelcase
        scope: this.scope
      };
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
    value: function get(path, params) {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this.http.get(path).query(params).end(handler);
      });
    }
  }, {
    key: 'post',
    value: function post(path, params) {
      var _this2 = this;

      return new _Promise(function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this2.http.post(path).send(params).end(handler);
      });
    }
  }, {
    key: 'patch',
    value: function patch(path, params) {
      var _this3 = this;

      return new _Promise(function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this3.http.patch(path).query(params).end(handler);
      });
    }
  }, {
    key: 'put',
    value: function put(path, params) {
      var _this4 = this;

      return new _Promise(function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this4.http.put(path).send(params).end(handler);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(path, params) {
      var _this5 = this;

      return new _Promise(function (resolve, reject) {
        var handler = function handler(err, res) {
          return err ? reject(err) : resolve(res.body);
        };
        _this5.http.del(path).query(params).end(handler);
      });
    }
  }]);

  return AccessToken;
})();

exports['default'] = AccessToken;
module.exports = exports['default'];