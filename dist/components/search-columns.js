'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderCheckbox(column, query, onCheckChange) {
  return column && column.property && column.checkbox ? _react2.default.createElement(_antd.Checkbox, {
    indeterminate: typeof query[column.property] === 'undefined',
    name: column.property,
    checked: query[column.property] || false,
    onChange: onCheckChange
  }) : '';
}

function renderDate(column, query, onMinDateChange, onMaxDateChange) {
  var queryVal = query[column.property] || {};
  return column && column.property && column.type === 'date' ? _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_antd.DatePicker, {
        size: 'small',
        style: { width: '100%' },
        value: queryVal.min,
        onChange: function onChange(date) {
          return onMinDateChange(column.property, date);
        }
      })
    ),
    _react2.default.createElement(
      'div',
      { style: { marginTop: 10 } },
      _react2.default.createElement(_antd.DatePicker, {
        size: 'small',
        style: { width: '100%' },
        value: queryVal.max,
        onChange: function onChange(date) {
          return onMaxDateChange(column.property, date);
        }
      })
    )
  ) : '';
}

function renderNumber(column, query, onMinNumberChange, onMaxNumberChange) {
  var queryVal = query[column.property] || {};
  return column && column.property && column.type === 'number' ? _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        type: 'number',
        className: 'column-filter-input',
        name: column.property,
        value: queryVal.min || '',
        onChange: onMinNumberChange
      })
    ),
    _react2.default.createElement(
      'div',
      { style: { marginTop: 10 } },
      _react2.default.createElement('input', {
        type: 'number',
        className: 'column-filter-input',
        name: column.property,
        value: queryVal.max || '',
        onChange: onMaxNumberChange
      })
    )
  ) : '';
}

function renderText(column, query, onQueryChange) {
  return column && column.property && !column.checkbox && column.type !== 'date' && column.type !== 'number' ? _react2.default.createElement('input', {
    onChange: onQueryChange,
    className: 'column-filter-input',
    name: column.property,
    placeholder: column.filterPlaceholder || '',
    value: query[column.property] || ''
  }) : '';
}

var SearchColumns = function SearchColumns(_ref) {
  var columns = _ref.columns,
      query = _ref.query,
      onChange = _ref.onChange;

  var onQueryChange = function onQueryChange(event) {
    onChange(_extends({}, query, _defineProperty({}, event.target.name, event.target.value)));
  };

  var onCheckChange = function onCheckChange(event) {
    onChange(_extends({}, query, _defineProperty({}, event.target.name, query[event.target.name] === false && event.target.checked ? undefined : event.target.checked)));
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

  var onMinNumberChange = function onMinNumberChange(event) {
    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;

    var rangeFilter = query[name] || {};
    rangeFilter.min = value;
    onChange(_extends({}, query, _defineProperty({}, name, rangeFilter)));
  };

  var onMaxNumberChange = function onMaxNumberChange(event) {
    var _event$target2 = event.target,
        name = _event$target2.name,
        value = _event$target2.value;

    var rangeFilter = query[name] || {};
    rangeFilter.max = value;
    onChange(_extends({}, query, _defineProperty({}, name, rangeFilter)));
  };

  return _react2.default.createElement(
    'tr',
    null,
    columns.map(function (column, i) {
      return _react2.default.createElement(
        'th',
        { key: (column.property || i) + '-column-filter', className: 'column-filter' },
        renderCheckbox(column, query, onCheckChange),
        renderDate(column, query, onMinDateChange, onMaxDateChange),
        renderNumber(column, query, onMinNumberChange, onMaxNumberChange),
        renderText(column, query, onQueryChange)
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