"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _options = require("./options");

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Field = function Field(_ref) {
  var query = _ref.query,
      column = _ref.column,
      columns = _ref.columns,
      renderers = _ref.renderers,
      i18n = _ref.i18n,
      onChange = _ref.onChange,
      onColumnChange = _ref.onColumnChange,
      props = _objectWithoutProperties(_ref, ["query", "column", "columns", "renderers", "i18n", "onChange", "onColumnChange"]);

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
        filter = _ref4$filter === undefined ? {} : _ref4$filter;

    return _react2.default.createElement(Custom, _extends({ onChange: onQueryChange, value: query[column] || "" }, filter));
  };

  return _react2.default.createElement(
    "div",
    props,
    _react2.default.createElement(_options2.default, { value: column, onChange: onOptionsChange, columns: columns, i18n: i18n, renderers: renderers }),
    filterInput(renderers.filter || "input")
  );
};
Field.propTypes = {
  column: _propTypes2.default.string,
  columns: _propTypes2.default.array,
  renderers: _propTypes2.default.object,
  query: _propTypes2.default.object,
  i18n: _propTypes2.default.shape({
    all: _propTypes2.default.string
  }),
  onChange: _propTypes2.default.func,
  onColumnChange: _propTypes2.default.func
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

exports.default = Field;