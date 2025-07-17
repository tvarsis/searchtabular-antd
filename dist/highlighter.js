"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function highlighter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    columns = _ref.columns,
    matches = _ref.matches,
    query = _ref.query;
  if (!columns) {
    throw new Error('highlighter - Missing columns!');
  }
  if (!matches) {
    throw new Error('highlighter - Missing matches!');
  }
  if (!query) {
    throw new Error('highlighter - Missing query!');
  }
  return function (rows) {
    return rows.map(function (row) {
      var ret = {
        _highlights: {}
      };
      columns.forEach(function (column) {
        var property = column.property;
        var value = row[property];
        // Pick resolved value by convention
        var resolvedValue = row["_".concat(property)] || value;
        if (typeof resolvedValue === 'undefined') {
          return;
        }
        ret[property] = value;

        // Retain possibly resolved value
        if (resolvedValue !== value) {
          ret["_".concat(property)] = resolvedValue;
        }
        if (typeof property === 'undefined') {
          return;
        }

        // Stash highlighted value based on index
        // so it can be extracted later for highlighting
        ret._highlights[property] = matches({
          value: resolvedValue,
          query: query[property] || query.all
        });
      });

      // Capture original row data too
      return _objectSpread(_objectSpread({}, row), ret);
    });
  };
}
var _default = exports["default"] = highlighter;