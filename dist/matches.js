'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _strategies = require('./strategies');

var _strategies2 = _interopRequireDefault(_strategies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matches = function matches() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      value = _ref.value,
      query = _ref.query,
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === undefined ? _strategies2.default.infix : _ref$strategy,
      _ref$transform = _ref.transform,
      transform = _ref$transform === undefined ? function (v) {
    return v.toLowerCase();
  } : _ref$transform;

  if (!query) {
    return {};
  }

  var val = value && value.toString ? value.toString() : '';

  return strategy(transform(query)).matches(transform(val));
};

exports.default = matches;