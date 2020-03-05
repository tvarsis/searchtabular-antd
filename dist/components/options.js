"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Options = function Options(_ref) {
  var columns = _ref.columns,
      i18n = _ref.i18n,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === undefined ? function () {} : _ref$onChange,
      _ref$renderers = _ref.renderers,
      renderers = _ref$renderers === undefined ? {
    select: null,
    props: {
      select: {}
    }
  } : _ref$renderers,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ["columns", "i18n", "onChange", "renderers", "value"]);

  var componentBuilder = function componentBuilder() {
    if (!columns.length) {
      return null;
    }

    var opts = optionBuilder();

    return renderers.select ? getCustomComponent(renderers.select, opts) : _react2.default.createElement(
      "select",
      _extends({ onChange: onChange, value: value }, props),
      opts
    );
  };

  var getCustomComponent = function getCustomComponent(Custom, opts) {
    var _ref2 = renderers.props || {},
        _ref2$select = _ref2.select,
        select = _ref2$select === undefined ? {} : _ref2$select;

    return _react2.default.createElement(Custom, _extends({ onChange: onChange, value: value, options: opts }, props, select));
  };

  var optionBuilder = function optionBuilder() {
    return getOptions(columns, i18n).map(function (_ref3 // eslint-disable-line no-shadow, max-len
    ) {
      var name = _ref3.name,
          value = _ref3.value;
      return !renderers.select ? _react2.default.createElement(
        "option",
        { key: value + "-option", value: value },
        name
      ) : { key: value + "-option", value: value, name: name };
    });
  };

  return componentBuilder();
};
Options.propTypes = {
  columns: _propTypes2.default.array,
  renderers: _propTypes2.default.object,
  i18n: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.any
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

exports.default = Options;