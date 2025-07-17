"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var highlightValue = function highlightValue(value, highlights) {
  if (!highlights) {
    return /*#__PURE__*/_react["default"].createElement("span", null, value);
  }
  var val = String(value); // deals with arrays/numbers/...

  var children = [];
  var currentPosition = 0;
  var x = 0;
  for (x = 0; x < highlights.length; x += 1) {
    var nonMatchingPrefix = val.slice(currentPosition, highlights[x].startIndex);
    var matchingText = val.slice(highlights[x].startIndex, highlights[x].startIndex + highlights[x].length);
    currentPosition = highlights[x].startIndex + highlights[x].length;
    if (nonMatchingPrefix.length > 0) {
      children.push(/*#__PURE__*/_react["default"].createElement("span", {
        key: "".concat(x, "-nonmatch")
      }, nonMatchingPrefix));
    }
    children.push(/*#__PURE__*/_react["default"].createElement("span", {
      className: "highlight",
      key: "".concat(x, "-match")
    }, matchingText));
  }
  children.push(/*#__PURE__*/_react["default"].createElement("span", {
    key: "".concat(x, "-remainder")
  }, val.slice(currentPosition)));
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "search-result"
  }, children);
};
var _default = exports["default"] = highlightValue;