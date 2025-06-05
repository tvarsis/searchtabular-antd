"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _strategies = _interopRequireDefault(require("./strategies"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var matches = function matches() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    value = _ref.value,
    query = _ref.query,
    _ref$strategy = _ref.strategy,
    strategy = _ref$strategy === void 0 ? _strategies["default"].infix : _ref$strategy,
    _ref$transform = _ref.transform,
    transform = _ref$transform === void 0 ? function (v) {
      return v.toLowerCase();
    } : _ref$transform;
  if (!query) {
    return {};
  }
  var val = value && value.toString ? value.toString() : '';
  return strategy(transform(query)).matches(transform(val));
};
var _default = exports["default"] = matches;