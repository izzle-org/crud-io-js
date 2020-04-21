"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var JWT_KEY = 'auth.jwt';
var JwtService = {
  getToken: function getToken() {
    return JSON.parse(localStorage.getItem(JWT_KEY));
  },
  setToken: function setToken(token) {
    localStorage.setItem(JWT_KEY, JSON.stringify(token));
  },
  destroyToken: function destroyToken() {
    localStorage.removeItem(JWT_KEY);
  },
  getPayload: function getPayload() {
    var data = this.getToken();

    if (data !== null) {
      var token = data.access_token;
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var payload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(payload);
    }

    return null;
  },
  willExpire: function willExpire(seconds) {
    var payload = this.getPayload();

    if (payload !== null) {
      if (seconds === undefined) {
        seconds = 300;
      }

      return payload.exp - seconds <= Math.floor(Date.now() / 1000);
    }

    return false;
  },
  verify: function verify(certificate, token) {
    var data = token !== undefined ? token : this.getToken();

    if (data === null) {
      return false;
    }

    if (certificate === undefined || certificate == null) {
      return false;
    }

    try {
      _jsonwebtoken["default"].verify(data.access_token, certificate);

      return true;
    } catch (e) {
      this.destroyToken();
      return false;
    }
  }
};
var _default = JwtService;
exports["default"] = _default;