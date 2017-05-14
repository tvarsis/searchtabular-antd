'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _singleColumn = require('./single-column');

var _singleColumn2 = _interopRequireDefault(_singleColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multipleColumns = function multipleColumns(_ref) {
  var castingStrategy = _ref.castingStrategy,
      columns = _ref.columns,
      query = _ref.query,
      strategy = _ref.strategy,
      transform = _ref.transform;
  return function (data) {
    return query ? Object.keys(query).reduce(function (filteredData, searchColumn) {
      return (0, _singleColumn2.default)({
        castingStrategy: castingStrategy,
        columns: columns,
        searchColumn: searchColumn,
        query: query[searchColumn],
        strategy: strategy,
        transform: transform
      })(filteredData);
    }, data) : data;
  };
};

exports.default = multipleColumns;