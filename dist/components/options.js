"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _excluded = ["columns", "i18n", "onChange", "renderers", "value"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Options = function Options(_ref) {
  var columns = _ref.columns,
    i18n = _ref.i18n,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$renderers = _ref.renderers,
    renderers = _ref$renderers === void 0 ? {
      select: null,
      props: {
        select: {}
      }
    } : _ref$renderers,
    value = _ref.value,
    props = _objectWithoutProperties(_ref, _excluded);
  var componentBuilder = function componentBuilder() {
    if (!columns.length) {
      return null;
    }
    var opts = optionBuilder();
    return renderers.select ? getCustomComponent(renderers.select, opts) : /*#__PURE__*/_react["default"].createElement("select", _extends({
      onChange: onChange,
      value: value
    }, props), opts);
  };
  var getCustomComponent = function getCustomComponent(Custom, opts) {
    var _ref2 = renderers.props || {},
      _ref2$select = _ref2.select,
      select = _ref2$select === void 0 ? {} : _ref2$select;
    return /*#__PURE__*/_react["default"].createElement(Custom, _extends({
      onChange: onChange,
      value: value,
      options: opts
    }, props, select));
  };
  var optionBuilder = function optionBuilder() {
    return getOptions(columns, i18n).map(function (_ref3 // eslint-disable-line no-shadow, max-len
    ) {
      var name = _ref3.name,
        value = _ref3.value;
      return !renderers.select ? /*#__PURE__*/_react["default"].createElement("option", {
        key: "".concat(value, "-option"),
        value: value
      }, name) : {
        key: "".concat(value, "-option"),
        value: value,
        name: name
      };
    });
  };
  return componentBuilder();
};
Options.propTypes = {
  columns: _propTypes["default"].array,
  renderers: _propTypes["default"].object,
  i18n: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  value: _propTypes["default"].any
};
var getOptions = function getOptions(columns, i18n) {
  return (columns.length > 1 ? [{
    value: "all",
    name: i18n.all
  }] : []).concat(columns.map(function (column) {
    if (column.property && column.header && column.header.label) {
      return {
        value: column.property,
        name: column.header.label
      };
    }
    return null;
  }).filter(function (column) {
    return column;
  }));
};
var _default = exports["default"] = Options;