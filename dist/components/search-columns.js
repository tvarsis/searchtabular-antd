'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderCheckbox(column, query, onQueryChange) {
  return column && column.property && column.checkbox ? _react2.default.createElement('input', {
    type: 'checkbox',
    className: 'column-filter-input',
    name: column.property,
    value: query[column.property] || false,
    onChange: onQueryChange
  }) : '';
}

function renderText(column, query, onQueryChange) {
  return column && column.property && !column.checkbox ? _react2.default.createElement('input', {
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

  return _react2.default.createElement(
    'tr',
    null,
    columns.map(function (column, i) {
      return _react2.default.createElement(
        'th',
        { key: (column.property || i) + '-column-filter', className: 'column-filter' },
        renderCheckbox(column, query, onQueryChange),
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