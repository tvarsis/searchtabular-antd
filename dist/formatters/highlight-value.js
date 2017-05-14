"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var highlightValue = function highlightValue(value, highlights) {
  if (!highlights) {
    return _react2.default.createElement(
      "span",
      null,
      value
    );
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
      children.push(_react2.default.createElement(
        "span",
        { key: x + "-nonmatch" },
        nonMatchingPrefix
      ));
    }
    children.push(_react2.default.createElement(
      "span",
      { className: "highlight", key: x + "-match" },
      matchingText
    ));
  }
  children.push(_react2.default.createElement(
    "span",
    { key: x + "-remainder" },
    val.slice(currentPosition)
  ));

  return _react2.default.createElement(
    "span",
    { className: "search-result" },
    children
  );
};

exports.default = highlightValue;