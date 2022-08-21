import _columnMatches from './_column-matches';

const singleColumn = ({
  castingStrategy, columns, searchColumn = 'all', query, strategy, transform
}) => (rows) => {
  if (!query && (query !== false) &&  (query !== null)) {
    return rows;
  }
  let ret = columns;
  if (searchColumn !== 'all') {
    ret = ret.filter(col => col && col.property === searchColumn);
  }
  return rows.filter(row => ret.filter(column => _columnMatches({
    query, castingStrategy, column, strategy, transform, row
  })).length > 0);
};

export default singleColumn;
