"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _api = _interopRequireDefault(require("./api.service"));

var CrudService = /*#__PURE__*/function () {
  function CrudService(endpoint) {
    (0, _classCallCheck2["default"])(this, CrudService);
    this.baseUrl = process.env.API_BASE_URL + '/' + endpoint;
  }

  (0, _createClass2["default"])(CrudService, [{
    key: "one",
    value: function () {
      var _one = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _api["default"].get(this.baseUrl + '/' + id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function one(_x) {
        return _one.apply(this, arguments);
      }

      return one;
    }()
  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params, subUrl) {
        var url;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = subUrl !== undefined ? this.baseUrl + subUrl : this.baseUrl;
                return _context2.abrupt("return", _api["default"].get(url, params));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function list(_x2, _x3) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(payload) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", payload.id !== undefined && payload.id > 0 ? _api["default"].update(this.baseUrl + '/' + payload.id, payload) : _api["default"].create(this.baseUrl, payload));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save(_x4) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(payload) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _api["default"].remove(this.baseUrl + '/' + payload.id, payload.data));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function remove(_x5) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);
  return CrudService;
}();

exports["default"] = CrudService;