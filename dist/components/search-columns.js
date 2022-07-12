"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkbox = require("antd/lib/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _datePicker = require("antd/lib/date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _inputNumber = require("antd/lib/input-number");

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _reactIntlUniversal = require("react-intl-universal");

var _reactIntlUniversal2 = _interopRequireDefault(_reactIntlUniversal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option = _select2.default.Option;

var NUMBER_MAX = 2147483647 - 47;
var NUMBER_MIN = -2147483648 + 48;
var TEXT_MAX_LENGTH = 300;

function renderCheckbox(column, query, onCheckChange) {
  return column && column.property && column.checkbox ? _react2.default.createElement(
    _select2.default,
    {
      allowClear: true,
      style: { width: "100%" },
      name: column.property,
      placeholder: column.filterPlaceholder || "",
      defaultValue: query[column.property] === undefined ? undefined : query[column.property],
      value: query[column.property] === undefined ? undefined : query[column.property],
      onChange: function onChange(value) {
        return onCheckChange(column.property, value);
      } },
    _react2.default.createElement(
      Option,
      { value: true },
      _reactIntlUniversal2.default.get("shared.true")
    ),
    _react2.default.createElement(
      Option,
      { value: false },
      _reactIntlUniversal2.default.get("shared.false")
    ),
    _react2.default.createElement(
      Option,
      { value: null },
      _reactIntlUniversal2.default.get("shared.undefined")
    )
  ) : "";
}

function renderDropDown(column, query, onDropDownChange) {
  return column && column.property && column.type === "dropdown" ? _react2.default.createElement(
    _select2.default,
    {
      allowClear: true,
      style: { width: "100%" },
      name: column.property,
      placeholder: column.filterPlaceholder || "",
      value: query[column.property] === undefined ? undefined : query[column.property],
      onChange: function onChange(value) {
        return onDropDownChange(column.property, value);
      } },
    column.options && column.options.map(function (fieldTypeOption, index) {
      return _react2.default.createElement(
        Option,
        { key: index, value: fieldTypeOption.value },
        fieldTypeOption.label
      );
    })
  ) : "";
}

function renderDate(column, query, onMinDateChange, onMaxDateChange) {
  var queryVal = query[column.property] || {};
  return column && column.property && column.type === "date" ? _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_datePicker2.default, {
        placeholder: _reactIntlUniversal2.default.get("shared.fromDate"),
        style: { width: "100%" },
        value: queryVal.min,
        onChange: function onChange(date) {
          return onMinDateChange(column.property, date);
        }
      })
    ),
    _react2.default.createElement(
      "div",
      { style: { marginTop: 10 } },
      _react2.default.createElement(_datePicker2.default, {
        placeholder: _reactIntlUniversal2.default.get("shared.toDate"),
        style: { width: "100%" },
        value: queryVal.max,
        onChange: function onChange(date) {
          return onMaxDateChange(column.property, date);
        }
      })
    )
  ) : "";
}

function renderNumber(column, query, onMinNumberChange, onMaxNumberChange) {
  var queryVal = query[column.property] || {};
  var min = queryVal.min || queryVal.min === 0 ? queryVal.min : "";
  var max = queryVal.max || queryVal.max === 0 ? queryVal.max : "";

  return column && column.property && !column.custom && column.type === "number" ? _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_inputNumber2.default, {
        placeholder: _reactIntlUniversal2.default.get("shared.from"),
        name: column.property,
        style: { width: "100%" },
        value: min,
        min: NUMBER_MIN,
        max: NUMBER_MAX,
        onChange: function onChange(value) {
          return onMinNumberChange(column.property, value);
        }
      })
    ),
    _react2.default.createElement(
      "div",
      { style: { marginTop: 10 } },
      _react2.default.createElement(_inputNumber2.default, {
        placeholder: _reactIntlUniversal2.default.get("shared.to"),
        name: column.property,
        style: { width: "100%" },
        value: max,
        min: NUMBER_MIN,
        max: NUMBER_MAX,
        onChange: function onChange(value) {
          return onMaxNumberChange(column.property, value);
        }
      })
    )
  ) : "";
}

function renderText(column, query, onQueryChange) {
  return column && !column.custom && column.property && !column.checkbox && column.type !== "reactElement" && column.type !== "date" && column.type !== "number" && column.type !== "dropdown" ? _react2.default.createElement(_input2.default, {
    onChange: onQueryChange,
    name: column.property,
    placeholder: column.filterPlaceholder || "",
    value: query[column.property] || "",
    maxLength: TEXT_MAX_LENGTH
  }) : "";
}

function renderReactElement(column) {
  return column && column.property && column.type === "reactElement" ? _react2.default.createElement(
    "div",
    null,
    column.reactElement
  ) : "";
}
function renderCustomDropDown(column, query, onCustomDropDownChange) {

  return column && column.property && column.custom && !column.checkbox && column.type !== "reactElement" && column.type !== "date" && column.type !== "dropdown" ? _react2.default.createElement(
    _select2.default,
    {
      allowClear: true,
      style: { width: "100%" },
      name: column.property,
      placeholder: column.filterPlaceholder || "",
      value: query[column.property] === undefined ? undefined : query[column.property],
      onChange: function onChange(value) {
        return onCustomDropDownChange(column.property, value);
      } },
    column.options && column.options.map(function (fieldTypeOption, index) {
      return _react2.default.createElement(
        Option,
        { key: index, value: fieldTypeOption },
        fieldTypeOption
      );
    }),
    !column.options && _react2.default.createElement(
      Option,
      { value: null },
      _reactIntlUniversal2.default.get("shared.undefined")
    )
  ) : "";
}

var SearchColumns = function SearchColumns(_ref) {
  var columns = _ref.columns,
      query = _ref.query,
      onChange = _ref.onChange;

  var onQueryChange = function onQueryChange(event) {
    onChange(_extends({}, query, _defineProperty({}, event.target.name, event.target.value)));
  };

  var onCheckChange = function onCheckChange(name, value) {
    if (value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if (value === false) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if (value === null) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if ((query[name] || query[name] === null || query[name] === false) && !value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
  };

  var onMinDateChange = function onMinDateChange(name, date) {
    var dateFilter = query[name] || {};
    dateFilter.min = date;
    onChange(_extends({}, query, _defineProperty({}, name, dateFilter)));
  };

  var onMaxDateChange = function onMaxDateChange(name, date) {
    var dateFilter = query[name] || {};
    dateFilter.max = date;
    onChange(_extends({}, query, _defineProperty({}, name, dateFilter)));
  };

  var isNumber = function isNumber(value) {
    var reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    return !isNaN(value) && reg.test(value) || value === "" || value === "-";
  };

  var onMinNumberChange = function onMinNumberChange(name, value) {
    var rangeFilter = query[name] || {};
    rangeFilter.min = value;
    onChange(_extends({}, query, _defineProperty({}, name, rangeFilter)));
  };

  var onMaxNumberChange = function onMaxNumberChange(name, value) {
    var rangeFilter = query[name] || {};
    rangeFilter.max = value;
    onChange(_extends({}, query, _defineProperty({}, name, rangeFilter)));
  };

  var onDropDownChange = function onDropDownChange(name, value) {
    if (value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if (query[name] && !value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
  };

  var onCustomDropDownChange = function onCustomDropDownChange(name, value) {
    if (value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if (value === null) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
    if ((query[name] || query[name] === null) && !value) {
      onChange(_extends({}, query, _defineProperty({}, name, value)));
    }
  };

  return _react2.default.createElement(
    "tr",
    null,
    columns.map(function (column, i) {
      return _react2.default.createElement(
        "th",
        { key: (column.property || i) + "-column-filter", className: "column-filter" },
        renderReactElement(column),
        renderCheckbox(column, query, onCheckChange),
        renderDate(column, query, onMinDateChange, onMaxDateChange),
        renderNumber(column, query, onMinNumberChange, onMaxNumberChange),
        renderText(column, query, onQueryChange),
        renderDropDown(column, query, onDropDownChange),
        renderCustomDropDown(column, query, onCustomDropDownChange)
      );
    })
  );
};

SearchColumns.propTypes = {
  columns: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  query: _propTypes2.default.object
};

SearchColumns.defaultProps = {
  query: {}
};

exports.default = SearchColumns;