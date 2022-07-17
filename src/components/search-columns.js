import React from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import DatePicker from "antd/lib/date-picker";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";
import intl from "react-intl-universal";
const { Option } = Select;
const NUMBER_MAX = 2147483647 - 47;
const NUMBER_MIN = -2147483648 + 48;
const TEXT_MAX_LENGTH = 300;

function renderCheckbox(column, query, onCheckChange) {
  return column && column.property && column.checkbox ? (
    <Select
      allowClear
      style={{ width: "100%" }}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      defaultValue={query[column.property] === undefined ? undefined : query[column.property]}
      value={query[column.property] === undefined ? undefined : query[column.property]}
      onChange={value => onCheckChange(column.property, value)}>
      <Option value={true}>{intl.get("shared.true")}</Option>
      <Option value={false}>{intl.get("shared.false")}</Option>
      <Option value={null}>{intl.get("shared.undefined")}</Option>
    </Select>
  ) : (
    ""
  );
}

function renderDropDown(column, query, onDropDownChange) {
  return column && column.property && column.type === "dropdown" ? (
    <Select
      allowClear
      style={{ width: "100%" }}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      value={query[column.property] === undefined ? undefined : query[column.property]}
      onChange={value => onDropDownChange(column.property, value)}>
      {column.options &&
        column.options.map((fieldTypeOption, index) => (
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
          placeholder={intl.get("shared.fromDate")}
          style={{ width: "100%" }}
          value={queryVal.min}
          onChange={date => onMinDateChange(column.property, date)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <DatePicker
          placeholder={intl.get("shared.toDate")}
          style={{ width: "100%" }}
          value={queryVal.max}
          onChange={date => onMaxDateChange(column.property, date)}
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

  return column && column.property && !column.custom && column.type === "number" ? (
    <div>
      <div>
        <InputNumber
          placeholder={intl.get("shared.from")}
          name={column.property}
          style={{ width: "100%" }}
          value={min}
          min={NUMBER_MIN}
          max={NUMBER_MAX}
          onChange={value => onMinNumberChange(column.property, value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <InputNumber
          placeholder={intl.get("shared.to")}
          name={column.property}
          style={{ width: "100%" }}
          value={max}
          min={NUMBER_MIN}
          max={NUMBER_MAX}
          onChange={value => onMaxNumberChange(column.property, value)}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

function renderText(column, query, onQueryChange) {
  return column &&
    ! column.custom &&
    column.property &&
    !column.checkbox &&
    column.type !== "reactElement" &&
    column.type !== "date" &&
    column.type !== "number" &&
    column.type !== "dropdown" ? (
    <Input
      onChange={onQueryChange}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      value={query[column.property] || ""}
      maxLength={TEXT_MAX_LENGTH}
    />
  ) : (
    ""
  );
}

function renderReactElement(column) {
  return column && column.property && column.type === "reactElement" ? <div>{column.reactElement}</div> : "";
}
function renderCustomDropDown(column, query, onCustomDropDownChange) {
 
  return column && column.property && column.custom && (!column.checkbox &&
    column.type !== "reactElement" &&
    column.type !== "date" &&
    column.type !== "dropdown" ) ? (
    <Select
      allowClear
      style={{ width: "100%" }}
      name={column.property}
      placeholder={column.filterPlaceholder || ""}
      value={query[column.property] === undefined ? undefined : query[column.property]}
      onChange={value => onCustomDropDownChange(column.property, value)}>
      <Option value={null}>{intl.get("shared.undefined")}</Option>
      {column.options &&
        column.options.map((fieldTypeOption, index) => (
          <Option key={index} value={fieldTypeOption}>
            {fieldTypeOption}
          </Option>
        ))}
    </Select>
  ) : (
    ""
  );
}

const SearchColumns = ({ columns, query, onChange }) => {
  const onQueryChange = event => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  const onCheckChange = (name, value) => {
    if (value) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if (value === false) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if (value === null) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if ((query[name] || query[name] === null || query[name] === false) && !value) {
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

  const isNumber = value => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    return (!isNaN(value) && reg.test(value)) || value === "" || value === "-";
  };

  const onMinNumberChange = (name, value) => {
    const rangeFilter = query[name] || {};
    rangeFilter.min = value;
    onChange({
      ...query,
      [name]: rangeFilter
    });
  };

  const onMaxNumberChange = (name, value) => {
    const rangeFilter = query[name] || {};
    rangeFilter.max = value;
    onChange({
      ...query,
      [name]: rangeFilter
    });
  };

  const onDropDownChange = (name, value) => {
    if (value) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if (query[name] && !value) {
      onChange({
        ...query,
        [name]: value
      });
    }
  };

  const onCustomDropDownChange = (name, value) => {
    if (value) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if (value === null) {
      onChange({
        ...query,
        [name]: value
      });
    }
    if ((query[name] || query[name] === null) && !value) {
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
          {renderCustomDropDown(column, query, onCustomDropDownChange)}
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
