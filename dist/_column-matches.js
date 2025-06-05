"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var _strategies = _interopRequireDefault(require("./strategies"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _defaultTransform = function defaultTransform() {
  var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _isArray2["default"])(v) ? v.map(function (v2) {
    return _defaultTransform(v2);
  }) : v && v.toLowerCase && v.toLowerCase();
};
var defaultCastingStrategy = function defaultCastingStrategy(v) {
  return (0, _isArray2["default"])(v) ? v : String(v);
};
var _columnMatches = function _columnMatches(_ref) {
  var query = _ref.query,
    _ref$castingStrategy = _ref.castingStrategy,
    castingStrategy = _ref$castingStrategy === void 0 ? defaultCastingStrategy : _ref$castingStrategy,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? {} : _ref$column,
    row = _ref.row,
    _ref$strategy = _ref.strategy,
    strategy = _ref$strategy === void 0 ? _strategies["default"].infix : _ref$strategy,
    _ref$transform = _ref.transform,
    transform = _ref$transform === void 0 ? _defaultTransform : _ref$transform;
  var property = column.property;
  if (!property) {
    return false;
  }
  var value = row["_".concat(property)] || row[property];
  // handle the checkbox

  if (column && !column.checkbox && value == null) {
    return false;
  }
  // Pick resolved value by convention
  var resolvedValue = castingStrategy(value, column);
  return strategy(transform(query)).evaluate(transform(resolvedValue));
};
var _default = exports["default"] = _columnMatches;