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

var _AccessToken = require('./AccessToken');

var _AccessToken2 = _interopRequireDefault(_AccessToken);

var ClientCredentials = (function () {
  function ClientCredentials(client) {
    _classCallCheck(this, ClientCredentials);

    this.client = client;
  }

  _createClass(ClientCredentials, [{
    key: 'getToken',
    value: function getToken(params) {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        var form = {
          grant_type: 'client_credentials', // eslint-disable-line camelcase
          client_id: _this.client.clientID, // eslint-disable-line camelcase
          client_secret: _this.client.clientSecret // eslint-disable-line camelcase
        };
        _lodash2['default'].assign(form, params);

        var createAccessToken = function createAccessToken(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(new _AccessToken2['default'](_this.client, res.body));
          }
        };

        _this.client.http.post(_this.client.tokenPath).send(form).end(createAccessToken);
      });
    }
  }]);

  return ClientCredentials;
})();

exports['default'] = ClientCredentials;
module.exports = exports['default'];