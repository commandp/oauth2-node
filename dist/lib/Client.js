'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _superagentDefaults = require('superagent-defaults');

var _superagentDefaults2 = _interopRequireDefault(_superagentDefaults);

var _superagentPrefix = require('superagent-prefix');

var _superagentPrefix2 = _interopRequireDefault(_superagentPrefix);

var _AuthCode = require('./AuthCode');

var _AuthCode2 = _interopRequireDefault(_AuthCode);

var _ClientCredentials = require('./ClientCredentials');

var _ClientCredentials2 = _interopRequireDefault(_ClientCredentials);

var _Password = require('./Password');

var _Password2 = _interopRequireDefault(_Password);

var _Assertion = require('./Assertion');

var _Assertion2 = _interopRequireDefault(_Assertion);

var _RefreshToken = require('./RefreshToken');

var _RefreshToken2 = _interopRequireDefault(_RefreshToken);

var _AccessToken = require('./AccessToken');

var _AccessToken2 = _interopRequireDefault(_AccessToken);

var Client = (function () {
  function Client(clientID, clientSecret) {
    var _ref = arguments[2] === undefined ? {} : arguments[2];

    var site = _ref.site;
    var authorizePath = _ref.authorizePath;
    var tokenPath = _ref.tokenPath;
    var connectionBuild = _ref.connectionBuild;
    var accessTokenMixin = _ref.accessTokenMixin;

    _classCallCheck(this, Client);

    this.site = site;
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.authorizePath = authorizePath || '/oauth/authorize';
    this.tokenPath = tokenPath || '/oauth/token';
    this.http = (0, _superagentDefaults2['default'])().use((0, _superagentPrefix2['default'])(this.site)).accept('json');
    if (connectionBuild) {
      this.http = connectionBuild(this.http);
    }
    this.accessTokenMixin = accessTokenMixin;
  }

  _createClass(Client, [{
    key: 'authCode',
    value: function authCode() {
      return new _AuthCode2['default'](this);
    }
  }, {
    key: 'clientCredentials',
    value: function clientCredentials() {
      return new _ClientCredentials2['default'](this);
    }
  }, {
    key: 'password',
    value: function password() {
      return new _Password2['default'](this);
    }
  }, {
    key: 'assertion',
    value: function assertion() {
      return new _Assertion2['default'](this);
    }
  }, {
    key: 'refreshToken',
    value: function refreshToken() {
      return new _RefreshToken2['default'](this);
    }
  }, {
    key: 'deserializeToken',
    value: function deserializeToken(token) {
      return new _AccessToken2['default'](this, token);
    }
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];