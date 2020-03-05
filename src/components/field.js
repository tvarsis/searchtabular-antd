import React from "react";
import PropTypes from "prop-types";
import SearchOptions from "./options";

const Field = ({ query, column, columns, renderers, i18n, onChange, onColumnChange, ...props }) => {
  const onOptionsChange = ({ target: { value } }) => {
    onChange({
      [value]: query[value]
    });
    onColumnChange(value);
  };
  const onQueryChange = ({ target: { value } }) =>
    onChange({
      [column]: value
    });
  const filterInput = (Custom = "input") => {
    if (!columns.length) return null;

    const { filter = {} } = renderers.props || {};
    return <Custom onChange={onQueryChange} value={query[column] || ""} {...filter} />;
  };

  return (
    <div {...props}>
      <SearchOptions value={column} onChange={onOptionsChange} columns={columns} i18n={i18n} renderers={renderers} />
      {filterInput(renderers.filter || "input")}
    </div>
  );
};
Field.propTypes = {
  column: PropTypes.string,
  columns: PropTypes.array,
  renderers: PropTypes.object,
  query: PropTypes.object,
  i18n: PropTypes.shape({
    all: PropTypes.string
  }),
  onChange: PropTypes.func,
  onColumnChange: PropTypes.func
};
Field.defaultProps = {
  column: "all",
  columns: [],
  renderers: {
    filter: null,
    select: null,
    props: {
      filter: {},
      select: {}
    }
  },
  query: {},
  i18n: {
    all: "All"
  },
  onChange: () => {},
  onColumnChange: () => {}
};

export default Field;
