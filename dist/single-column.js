'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _columnMatches2 = require('./_column-matches');

var _columnMatches3 = _interopRequireDefault(_columnMatches2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleColumn = function singleColumn(_ref) {
  var castingStrategy = _ref.castingStrategy,
      columns = _ref.columns,
      _ref$searchColumn = _ref.searchColumn,
      searchColumn = _ref$searchColumn === undefined ? 'all' : _ref$searchColumn,
      query = _ref.query,
      strategy = _ref.strategy,
      transform = _ref.transform;
  return function (rows) {
    if (!query && query !== false) {
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
        return (0, _columnMatches3.default)({
          query: query, castingStrategy: castingStrategy, column: column, strategy: strategy, transform: transform, row: row
        });
      }).length > 0;
    });
  };
};

exports.default = singleColumn;