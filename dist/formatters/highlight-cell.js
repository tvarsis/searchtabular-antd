"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _highlightValue = _interopRequireDefault(require("./highlight-value"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var highlightCell = function highlightCell(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      rowData: {
        _highlights: {}
      }
    },
    rowData = _ref.rowData,
    property = _ref.property;
  return (0, _highlightValue["default"])(value, rowData._highlights && rowData._highlights[property]);
};
var _default = exports["default"] = highlightCell;