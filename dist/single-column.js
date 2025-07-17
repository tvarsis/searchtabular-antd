"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _columnMatches2 = _interopRequireDefault(require("./_column-matches"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var singleColumn = function singleColumn(_ref) {
  var castingStrategy = _ref.castingStrategy,
    columns = _ref.columns,
    _ref$searchColumn = _ref.searchColumn,
    searchColumn = _ref$searchColumn === void 0 ? 'all' : _ref$searchColumn,
    query = _ref.query,
    strategy = _ref.strategy,
    transform = _ref.transform;
  return function (rows) {
    if (!query && query !== false && query !== null) {
      return rows;
    }
    var ret = columns;
    if (searchColumn !== 'all') {
      ret = ret.filter(function (col) {
        return col && col.property === searchColumn;
      });
    }
    return rows.filter(function (row) {
      return ret.filter(function (column) {
        return (0, _columnMatches2["default"])({
          query: query,
          castingStrategy: castingStrategy,
          column: column,
          strategy: strategy,
          transform: transform,
          row: row
        });
      }).length > 0;
    });
  };
};
var _default = exports["default"] = singleColumn;