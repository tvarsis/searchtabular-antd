import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

function renderCheckbox(column, query, onCheckChange) {
  return column && column.property && column.checkbox ?
   <Checkbox
      indeterminate={typeof query[column.property] === 'undefined'}
      name={column.property}
      checked={query[column.property] || false}
      onChange={onCheckChange}
    /> :
    '';
}

function renderText(column, query, onQueryChange) {
  return column && column.property && !column.checkbox ?
    <input
      onChange={onQueryChange}
      className="column-filter-input"
      name={column.property}
      placeholder={column.filterPlaceholder || ''}
      value={query[column.property] || ''}
    /> :
    '';
}

const SearchColumns = ({ columns, query, onChange }) => {
  const onQueryChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  const onCheckChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: ((query[event.target.name] === false) && event.target.checked) ? undefined : event.target.checked
    });
  };

  return (
    <tr>
      {columns.map((column, i) => (
        <th key={`${column.property || i}-column-filter`} className="column-filter">
          {renderCheckbox(column, query, onCheckChange)}
          {renderText(column, query, onQueryChange)}
        </th>
      ))}
    </tr>
  );
};

SearchColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object
};

SearchColumns.defaultProps = {
  query: {}
};

export default SearchColumns;
