'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function highlighter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      columns = _ref.columns,
      matches = _ref.matches,
      query = _ref.query;

  if (!columns) {
    throw new Error('highlighter - Missing columns!');
  }
  if (!matches) {
    throw new Error('highlighter - Missing matches!');
  }
  if (!query) {
    throw new Error('highlighter - Missing query!');
  }

  return function (rows) {
    return rows.map(function (row) {
      var ret = {
        _highlights: {}
      };

      columns.forEach(function (column) {
        var property = column.property;
        var value = row[property];
        // Pick resolved value by convention
        var resolvedValue = row['_' + property] || value;

        if (typeof resolvedValue === 'undefined') {
          return;
        }

        ret[property] = value;

        // Retain possibly resolved value
        if (resolvedValue !== value) {
          ret['_' + property] = resolvedValue;
        }

        if (typeof property === 'undefined') {
          return;
        }

        // Stash highlighted value based on index
        // so it can be extracted later for highlighting
        ret._highlights[property] = matches({
          value: resolvedValue,
          query: query[property] || query.all
        });
      });

      // Capture original row data too
      return _extends({}, row, ret);
    });
  };
}

exports.default = highlighter;