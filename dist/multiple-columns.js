"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _singleColumn = _interopRequireDefault(require("./single-column"));
var _strategies = _interopRequireDefault(require("./strategies"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
      var result;
      if (column.type === 'date') {
        result = (0, _singleColumn["default"])({
          castingStrategy: castingStrategy,
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies["default"].date,
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else if (column.type === 'number') {
        result = (0, _singleColumn["default"])({
          castingStrategy: function castingStrategy(t) {
            return t;
          },
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies["default"].number,
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else if (column.checkbox) {
        result = (0, _singleColumn["default"])({
          castingStrategy: function castingStrategy(t) {
            return t;
          },
          columns: columns,
          searchColumn: searchColumn,
          query: query[searchColumn],
          strategy: _strategies["default"]["boolean"],
          transform: function transform(t) {
            return t;
          }
        })(filteredData);
      } else {
        result = (0, _singleColumn["default"])({
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
var _default = exports["default"] = multipleColumns;