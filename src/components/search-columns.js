import React from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";
const { Option } = Select;


function renderCheckbox(column, query, onCheckChange) {
  return column && column.property && column.checkbox ? (
    <Select
      allowClear
      style={{ width: '100%' }}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      defaultValue={query[column.property] === undefined ? "" : query[column.property]}
      onChange={(value) => onCheckChange(column.property, value)}
    >
      <Option value={true}>True</Option>
      <Option value={false}>False</Option>
      <Option value={null}>Undefined</Option>
    </Select>
  ) : (
    ""
  );
}

function renderDropDown(column, query, onDropDownChange) {
  return column && column.property && column.type === "dropdown" ? (
    <Select
      allowClear
      style={{ width: '100%' }}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      value={query[column.property] || ""}
      onChange={(value) => onDropDownChange(column.property, value)}
    >
      {column.options && column.options.map((fieldTypeOption, index) => (
        <Option key={index} value={fieldTypeOption.value}>
            {fieldTypeOption.label}
        </Option>
      ))}
    </Select>
  ) : (
    ""
  );
}

function renderDate(column, query, onMinDateChange, onMaxDateChange) {
  const queryVal = query[column.property] || {};
  return column && column.property && column.type === "date" ? (
    <div>
      <div>
        <DatePicker
          placeholder="From date"
          style={{ width: "100%" }}
          value={queryVal.min}
          onChange={(date) => onMinDateChange(column.property, date)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <DatePicker
          placeholder="To date"
          style={{ width: "100%" }}
          value={queryVal.max}
          onChange={(date) => onMaxDateChange(column.property, date)}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

function renderNumber(column, query, onMinNumberChange, onMaxNumberChange) {
  const queryVal = query[column.property] || {};
  const min = queryVal.min || queryVal.min === 0 ? queryVal.min : "";
  const max = queryVal.max || queryVal.max === 0 ? queryVal.max : "";

  return column && column.property && column.type === "number" ? (
    <div>
      <div>
        <InputNumber
          placeholder="From"
          name={column.property}
          style={{ width: "100%" }}
          value={min}
          onChange={(value) => onMinNumberChange(column.property, value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <InputNumber
          placeholder="To"
          name={column.property}
          style={{ width: "100%" }}
          value={max}
          onChange={(value) => onMaxNumberChange(column.property, value)}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

function renderText(column, query, onQueryChange) {
  return column && column.property && !column.checkbox && column.type !== "reactElement" && column.type !== "date" && column.type !== "number" && column.type !== "dropdown" ? (
    <Input
      onChange={onQueryChange}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      value={query[column.property] || ""}
    />
  ) : (
    ""
  );
}

function renderReactElement(column) {
  return column && column.property && column.type === "reactElement" ? (
    <div>
      {column.reactElement}
    </div>
  ) : (
    ""
  );
}

const SearchColumns = ({ columns, query, onChange }) => {
  const onQueryChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  const onCheckChange = (name, value) => {
    if(value){
      onChange({
        ...query,
      [name]: value
      });
    }
    if(value === false){
      onChange({
        ...query,
      [name]: value
      });
    }
    if(value === null){
      onChange({
        ...query,
      [name]: value
      });
    }
    if((query[name] || query[name] === null || query[name] === false) && !value){
      onChange({
        ...query,
      [name]: value
      });
    }
  };


  const onMinDateChange = (name, date) => {
    const dateFilter = query[name] || {};
    dateFilter.min = date;
    onChange({
      ...query,
      [name]: dateFilter
    });
  };

  const onMaxDateChange = (name, date) => {
    const dateFilter = query[name] || {};
    dateFilter.max = date;
    onChange({
      ...query,
      [name]: dateFilter
    });
  };

  const isNumber = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    return (!isNaN(value) && reg.test(value)) || value === "" || value === "-";
  };

  const onMinNumberChange = (name, value) => {
    if (isNumber(value)) {
      const rangeFilter = query[name] || {};
      rangeFilter.min = value;
      onChange({
        ...query,
        [name]: rangeFilter
      });
    }
  };

  const onMaxNumberChange = (name, value) => {
    if (isNumber(value)) {
      const rangeFilter = query[name] || {};
      rangeFilter.max = value;
      onChange({
        ...query,
        [name]: rangeFilter
      });
    }
  };

  const onDropDownChange = (name, value) => {
    if(value){
      onChange({
        ...query,
      [name]: value
      });
    }
    if(query[name] && !value){
      onChange({
        ...query,
      [name]: value
      });
    }
  };

  return (
    <tr>
      {columns.map((column, i) => (
        <th key={`${column.property || i}-column-filter`} className="column-filter">
          {renderReactElement(column)}
          {renderCheckbox(column, query, onCheckChange)}
          {renderDate(column, query, onMinDateChange, onMaxDateChange)}
          {renderNumber(column, query, onMinNumberChange, onMaxNumberChange)}
          {renderText(column, query, onQueryChange)}
          {renderDropDown(column, query, onDropDownChange)}
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
