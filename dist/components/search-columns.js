"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));
var _input = _interopRequireDefault(require("antd/lib/input"));
var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));
var _select = _interopRequireDefault(require("antd/lib/select"));
var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));
var _reactIntlUniversal = _interopRequireDefault(require("react-intl-universal"));
var _moment = _interopRequireDefault(require("rc-picker/lib/generate/moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AntDatePicker = _datePicker["default"].generatePicker(_moment["default"]);
var Option = _select["default"].Option;
var NUMBER_MAX = 2147483647 - 47;
var NUMBER_MIN = -2147483648 + 48;
var TEXT_MAX_LENGTH = 300;
function renderCheckbox(column, query, onCheckChange) {
  var _column$header;
  return column && column.property && column.checkbox ? /*#__PURE__*/_react["default"].createElement(_select["default"], {
    allowClear: true,
    style: {
      width: "100%"
    },
    name: column.property,
    placeholder: column.filterPlaceholder || "",
    "aria-label": ((_column$header = column.header) === null || _column$header === void 0 ? void 0 : _column$header.label) || column.property,
    defaultValue: query[column.property] === undefined ? undefined : query[column.property] === null ? "null" : query[column.property],
    value: query[column.property] === undefined ? undefined : query[column.property] === null ? "null" : query[column.property],
    onChange: function onChange(value) {
      return onCheckChange(column.property, value);
    }
  }, /*#__PURE__*/_react["default"].createElement(Option, {
    value: true
  }, _reactIntlUniversal["default"].get("shared.true")), /*#__PURE__*/_react["default"].createElement(Option, {
    value: false
  }, _reactIntlUniversal["default"].get("shared.false")), /*#__PURE__*/_react["default"].createElement(Option, {
    value: "null"
  }, _reactIntlUniversal["default"].get("shared.undefined"))) : "";
}
function renderDropDown(column, query, onDropDownChange) {
  var _column$header2;
  return column && column.property && column.type === "dropdown" ? /*#__PURE__*/_react["default"].createElement(_select["default"], {
    allowClear: true,
    style: {
      width: "100%"
    },
    name: column.property,
    placeholder: column.filterPlaceholder || "",
    "aria-label": ((_column$header2 = column.header) === null || _column$header2 === void 0 ? void 0 : _column$header2.label) || column.property,
    value: query[column.property] === undefined ? undefined : query[column.property] === null ? "null" : query[column.property],
    onChange: function onChange(value) {
      return onDropDownChange(column.property, value);
    }
  }, column.options && column.options.map(function (fieldTypeOption, index) {
    return /*#__PURE__*/_react["default"].createElement(Option, {
      key: index,
      value: fieldTypeOption.value
    }, fieldTypeOption.label);
  })) : "";
}
function renderDate(column, query, onMinDateChange, onMaxDateChange) {
  var queryVal = query[column.property] || {};
  return column && column.property && column.type === "date" ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(AntDatePicker, {
    placeholder: _reactIntlUniversal["default"].get("shared.fromDate"),
    style: {
      width: "100%"
    },
    value: queryVal.min,
    onChange: function onChange(date) {
      return onMinDateChange(column.property, date);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/_react["default"].createElement(AntDatePicker, {
    placeholder: _reactIntlUniversal["default"].get("shared.toDate"),
    style: {
      width: "100%"
    },
    value: queryVal.max,
    onChange: function onChange(date) {
      return onMaxDateChange(column.property, date);
    }
  }))) : "";
}
function renderNumber(column, query, onMinNumberChange, onMaxNumberChange) {
  var _column$header3, _column$header4;
  var queryVal = query[column.property] || {};
  var min = queryVal.min || queryVal.min === 0 ? queryVal.min : "";
  var max = queryVal.max || queryVal.max === 0 ? queryVal.max : "";
  return column && column.property && column.type === "number" ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], {
    placeholder: _reactIntlUniversal["default"].get("shared.from"),
    name: column.property,
    style: {
      width: "100%"
    },
    value: min,
    min: NUMBER_MIN,
    max: NUMBER_MAX,
    onChange: function onChange(value) {
      return onMinNumberChange(column.property, value);
    },
    "aria-label": ((_column$header3 = column.header) === null || _column$header3 === void 0 ? void 0 : _column$header3.label) || column.property
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], {
    placeholder: _reactIntlUniversal["default"].get("shared.to"),
    name: column.property,
    style: {
      width: "100%"
    },
    value: max,
    min: NUMBER_MIN,
    max: NUMBER_MAX,
    onChange: function onChange(value) {
      return onMaxNumberChange(column.property, value);
    },
    "aria-label": ((_column$header4 = column.header) === null || _column$header4 === void 0 ? void 0 : _column$header4.label) || column.property
  }))) : "";
}
function renderText(column, query, onQueryChange, tooltipTitle, shouldOpenTooltip) {
  var _column$header5;
  var showTooltip = shouldOpenTooltip(query[column.property]);
  return column && column.property && !column.checkbox && column.type !== "reactElement" && column.type !== "date" && column.type !== "number" && column.type !== "dropdown" ? /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    title: tooltipTitle,
    open: showTooltip
  }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
    onChange: onQueryChange,
    name: column.property,
    placeholder: column.filterPlaceholder || "",
    value: query[column.property] || "",
    maxLength: TEXT_MAX_LENGTH,
    "aria-label": ((_column$header5 = column.header) === null || _column$header5 === void 0 ? void 0 : _column$header5.label) || column.property
  })) : "";
}
function renderReactElement(column) {
  return column && column.property && column.type === "reactElement" ? /*#__PURE__*/_react["default"].createElement("div", null, column.reactElement) : "";
}
var SearchColumns = function SearchColumns(_ref) {
  var columns = _ref.columns,
    query = _ref.query,
    onChange = _ref.onChange,
    tooltipTitle = _ref.tooltipTitle,
    shouldOpenTooltip = _ref.shouldOpenTooltip;
  var onQueryChange = function onQueryChange(event) {
    onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, event.target.name, event.target.value)));
  };
  var onCheckChange = function onCheckChange(name, value) {
    if (value) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
    if (value === false) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
    if (value === null) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
    if ((query[name] || query[name] === null || query[name] === false) && !value) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
  };
  var onMinDateChange = function onMinDateChange(name, date) {
    var dateFilter = query[name] || {};
    dateFilter.min = date;
    onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, dateFilter)));
  };
  var onMaxDateChange = function onMaxDateChange(name, date) {
    var dateFilter = query[name] || {};
    dateFilter.max = date;
    onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, dateFilter)));
  };
  var isNumber = function isNumber(value) {
    var reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    return !isNaN(value) && reg.test(value) || value === "" || value === "-";
  };
  var onMinNumberChange = function onMinNumberChange(name, value) {
    var rangeFilter = query[name] || {};
    rangeFilter.min = value;
    onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, rangeFilter)));
  };
  var onMaxNumberChange = function onMaxNumberChange(name, value) {
    var rangeFilter = query[name] || {};
    rangeFilter.max = value;
    onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, rangeFilter)));
  };
  var onDropDownChange = function onDropDownChange(name, value) {
    if (value) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
    if (value === null) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
    if ((query[name] || query[name] === null) && !value) {
      onChange(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, name, value)));
    }
  };
  return /*#__PURE__*/_react["default"].createElement("tr", null, columns.map(function (column, i) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: "".concat(column.property || i, "-column-filter"),
      className: "column-filter"
    }, renderReactElement(column), renderCheckbox(column, query, onCheckChange), renderDate(column, query, onMinDateChange, onMaxDateChange), renderNumber(column, query, onMinNumberChange, onMaxNumberChange), renderText(column, query, onQueryChange, tooltipTitle, shouldOpenTooltip), renderDropDown(column, query, onDropDownChange));
  }));
};
SearchColumns.propTypes = {
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  query: _propTypes["default"].object,
  tooltipTitle: _propTypes["default"].string,
  shouldOpenTooltip: _propTypes["default"].func
};
SearchColumns.defaultProps = {
  query: {},
  shouldOpenTooltip: function shouldOpenTooltip() {
    return false;
  }
};
var _default = exports["default"] = SearchColumns;