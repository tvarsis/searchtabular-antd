"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var infix = function infix(queryTerm) {
  return {
    evaluate: function evaluate() {
      var _this = this;
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return false;
      }
      if ((0, _isArray2["default"])(searchText)) {
        return searchText.some(function (v) {
          return _this.evaluate(v);
        });
      }
      return searchText.indexOf(queryTerm) !== -1;
    },
    matches: function matches() {
      var _this2 = this;
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return [];
      }
      if ((0, _isArray2["default"])(searchText)) {
        return searchText.reduce(function (result, text, index) {
          var search = _this2.matches(text);
          if (search.length) {
            result[index] = search; // eslint-disable-line no-param-reassign
          }
          return result;
        }, new Array(searchText.length));
      }
      var splitString = searchText.split(queryTerm);
      var result = [];
      var currentPosition = 0;
      for (var x = 0; x < splitString.length; x += 1) {
        result.push({
          startIndex: currentPosition + splitString[x].length,
          length: queryTerm.length
        });
        currentPosition += splitString[x].length + queryTerm.length;
      }
      result.pop();
      return result;
    }
  };
};
var prefix = function prefix(queryTerm) {
  return {
    evaluate: function evaluate() {
      var _this3 = this;
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return false;
      }
      if ((0, _isArray2["default"])(searchText)) {
        return searchText.some(function (v) {
          return _this3.evaluate(v);
        });
      }
      return searchText.indexOf(queryTerm) === 0;
    },
    matches: function matches() {
      var _this4 = this;
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return [];
      }
      if ((0, _isArray2["default"])(searchText)) {
        return searchText.reduce(function (result, text, index) {
          var search = _this4.matches(text);
          if (search.length) {
            result[index] = search; // eslint-disable-line no-param-reassign
          }
          return result;
        }, new Array(searchText.length));
      }
      var prefixIndex = searchText.indexOf(queryTerm);
      if (prefixIndex === 0) {
        return [{
          startIndex: 0,
          length: queryTerm.length
        }];
      }
      return [];
    }
  };
};
var date = function date(queryTerm) {
  return {
    evaluate: function evaluate() {
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return false;
      }
      var result = true;
      if (queryTerm.min) {
        if (queryTerm.max) {
          result = (0, _moment["default"])(searchText).isSameOrAfter(queryTerm.min) && (0, _moment["default"])(searchText).isSameOrBefore(queryTerm.max);
        } else {
          result = (0, _moment["default"])(searchText).isSameOrAfter(queryTerm.min);
        }
      } else if (queryTerm.max) {
        result = (0, _moment["default"])(searchText).isSameOrBefore(queryTerm.max);
      }
      return result;
    },
    matches: function matches() {
      return [];
    }
  };
};
var number = function number(queryTerm) {
  return {
    evaluate: function evaluate() {
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!searchText) {
        return false;
      }
      var result = true;
      if (queryTerm.min || queryTerm.min === 0) {
        if (queryTerm.max || queryTerm.max === 0) {
          result = searchText >= queryTerm.min && searchText <= queryTerm.max;
        } else {
          result = searchText >= queryTerm.min;
        }
      } else if (queryTerm.max || queryTerm.max === 0) {
        result = searchText <= queryTerm.max;
      }
      return result;
    },
    matches: function matches() {
      return [];
    }
  };
};
var _boolean = function _boolean(queryTerm) {
  return {
    evaluate: function evaluate() {
      var searchText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return queryTerm === searchText;
    },
    matches: function matches() {
      return [];
    }
  };
};
var _default = exports["default"] = {
  infix: infix,
  prefix: prefix,
  date: date,
  number: number,
  "boolean": _boolean
};