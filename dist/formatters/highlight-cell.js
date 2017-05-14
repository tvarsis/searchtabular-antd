'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlightValue = require('./highlight-value');

var _highlightValue2 = _interopRequireDefault(_highlightValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var highlightCell = function highlightCell(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { rowData: { _highlights: {} } },
      rowData = _ref.rowData,
      property = _ref.property;

  return (0, _highlightValue2.default)(value, rowData._highlights && rowData._highlights[property]);
};

exports.default = highlightCell;