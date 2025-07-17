"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _options = _interopRequireDefault(require("./options"));
var _excluded = ["query", "column", "columns", "renderers", "i18n", "onChange", "onColumnChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Field = function Field(_ref) {
  var query = _ref.query,
    column = _ref.column,
    columns = _ref.columns,
    renderers = _ref.renderers,
    i18n = _ref.i18n,
    onChange = _ref.onChange,
    onColumnChange = _ref.onColumnChange,
    props = _objectWithoutProperties(_ref, _excluded);
  var onOptionsChange = function onOptionsChange(_ref2) {
    var value = _ref2.target.value;
    onChange(_defineProperty({}, value, query[value]));
    onColumnChange(value);
  };
  var onQueryChange = function onQueryChange(_ref3) {
    var value = _ref3.target.value;
    return onChange(_defineProperty({}, column, value));
  };
  var filterInput = function filterInput() {
    var Custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "input";
    if (!columns.length) return null;
    var _ref4 = renderers.props || {},
      _ref4$filter = _ref4.filter,
      filter = _ref4$filter === void 0 ? {} : _ref4$filter;
    return /*#__PURE__*/_react["default"].createElement(Custom, _extends({
      onChange: onQueryChange,
      value: query[column] || ""
    }, filter));
  };
  return /*#__PURE__*/_react["default"].createElement("div", props, /*#__PURE__*/_react["default"].createElement(_options["default"], {
    value: column,
    onChange: onOptionsChange,
    columns: columns,
    i18n: i18n,
    renderers: renderers
  }), filterInput(renderers.filter || "input"));
};
Field.propTypes = {
  column: _propTypes["default"].string,
  columns: _propTypes["default"].array,
  renderers: _propTypes["default"].object,
  query: _propTypes["default"].object,
  i18n: _propTypes["default"].shape({
    all: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func,
  onColumnChange: _propTypes["default"].func
};
Field.defaultProps = {
  column: "all",
  columns: [],
  renderers: {
    filter: null,
    select: null,
    props: {
      filter: {},
      select: {}
    }
  },
  query: {},
  i18n: {
    all: "All"
  },
  onChange: function onChange() {},
  onColumnChange: function onColumnChange() {}
};
var _default = exports["default"] = Field;