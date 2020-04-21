"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api.service"));

var _crud = _interopRequireDefault(require("./crud.service"));

var _jwt = _interopRequireDefault(require("./jwt.service"));

var _default = {
  ApiService: _api["default"],
  CrudService: _crud["default"],
  JwtService: _jwt["default"]
};
exports["default"] = _default;