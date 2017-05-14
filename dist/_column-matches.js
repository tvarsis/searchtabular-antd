'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _strategies = require('./strategies');

var _strategies2 = _interopRequireDefault(_strategies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTransform = function defaultTransform() {
  var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _isArray3.default)(v) ? v.map(function (v2) {
    return defaultTransform(v2);
  }) : v && v.toLowerCase && v.toLowerCase();
};
var defaultCastingStrategy = function defaultCastingStrategy(v) {
  return (0, _isArray3.default)(v) ? v : String(v);
};

var _columnMatches = function _columnMatches(_ref) {
  var query = _ref.query,
      _ref$castingStrategy = _ref.castingStrategy,
      castingStrategy = _ref$castingStrategy === undefined ? defaultCastingStrategy : _ref$castingStrategy,
      _ref$column = _ref.column,
      column = _ref$column === undefined ? {} : _ref$column,
      row = _ref.row,
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === undefined ? _strategies2.default.infix : _ref$strategy,
      _ref$transform = _ref.transform,
      transform = _ref$transform === undefined ? defaultTransform : _ref$transform;

  var property = column.property;
  if (!property) {
    return false;
  }
  var value = row['_' + property] || row[property];
  if (value == null) {
    return false;
  }
  // Pick resolved value by convention
  var resolvedValue = castingStrategy(value, column);

  return strategy(transform(query)).evaluate(transform(resolvedValue));
};

exports.default = _columnMatches;