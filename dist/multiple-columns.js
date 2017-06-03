'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _singleColumn = require('./single-column');

var _singleColumn2 = _interopRequireDefault(_singleColumn);

var _strategies = require('./strategies');

var _strategies2 = _interopRequireDefault(_strategies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multipleColumns = function multipleColumns(_ref) {
  var castingStrategy = _ref.castingStrategy,
      columns = _ref.columns,
      query = _ref.query,
      strategy = _ref.strategy,
      transform = _ref.transform;
  return function (data) {
    return query ? Object.keys(query).reduce(function (filteredData, searchColumn) {
      var column = columns.find(function (c) {
        return c.property === searchColumn;
      });
      var result = void 0;
      if (column.type === 'date') {
        result = (0, _singleColumn2.default)({
          castingStrategy: castingStrategy,
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies2.default.date,
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else if (column.type === 'number') {
        result = (0, _singleColumn2.default)({
          castingStrategy: function castingStrategy(t) {
            return t;
          },
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies2.default.number,
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else if (column.checkbox) {
        result = (0, _singleColumn2.default)({
          castingStrategy: function castingStrategy(t) {
            return t;
          },
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies2.default.boolean,
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else {
        result = (0, _singleColumn2.default)({
          castingStrategy: castingStrategy,
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: strategy,
          transform: transform
        })(filteredData);
      }
      return result;
    }, data) : data;
  };
};

exports.default = multipleColumns;