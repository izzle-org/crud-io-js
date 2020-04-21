"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = require("axios");

var ApiService = {
  init: function init() {
    _axios.axios.defaults.baseURL = process.env.API_BASE_URL;
  },
  setHeader: function setHeader() {
    _axios.axios.defaults.headers.common['Authorization'] = 'Bearer ' + JwtService.getToken().access_token;
  },
  get: function get(resource, params) {
    params = params !== undefined ? {
      params: params
    } : {};
    return _axios.axios.get(resource, params)["catch"](function (error) {
      throw new Error('ApiService error: ' + error.message);
    });
  },
  post: function post(resource, data) {
    if (data === undefined) {
      data = {};
    }

    return _axios.axios.post(resource, data)["catch"](function (error) {
      throw new Error('ApiService error: ' + error.message);
    });
  },
  create: function create(resource, data) {
    return this.post(resource, data);
  },
  patch: function patch(resource, data) {
    if (data === undefined) {
      data = {};
    }

    return _axios.axios.patch(resource, data)["catch"](function (error) {
      throw new Error('ApiService error: ' + error.message);
    });
  },
  update: function update(resource, data) {
    return this.patch(resource, data);
  },
  remove: function remove(resource, params) {
    params = params !== undefined ? {
      params: params
    } : {};
    return _axios.axios["delete"](resource, params)["catch"](function (error) {
      throw new Error('ApiService error: ' + error.message);
    });
  }
};
var _default = ApiService;
exports["default"] = _default;