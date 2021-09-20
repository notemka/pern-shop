import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import FieldWrapper from 'components/atoms/FieldWrapper';
import Label from 'components/atoms/Label';

const StyledSelect = styled(Select)`
  > div {
    border-color: var(--border-color);
  }

  & > div:hover,
  & > div:focus {
    border-color: var(--border-color);
    box-shadow: 0 3px 5px 2px var(--border-color);
    outline: none;
  }
`;

const themeOptions = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: '#e3e3e3',
    primary50: '#f6f6f6',
    primary: '#42b983',
  },
});

const CategorySelect = ({ options = [], label, name, onChange, value }) => {
  const [currentValue, setCurrentValue] = useState(value || options[0]);
  const customStyles = { container: (styles) => ({ ...styles, flex: 1 }) };

  const onChangeHandler = (option) => {
    setCurrentValue(option);
    onChange(option);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const renderSelect = () => (
    <StyledSelect
      styles={customStyles}
      label={label}
      name={name}
      value={currentValue}
      options={options}
      onChange={onChangeHandler}
      theme={(theme) => themeOptions(theme)}
    />
  );

  if (label) {
    return (
      <FieldWrapper>
        <Label htmlFor={name}>{label}</Label>

        {renderSelect()}
      </FieldWrapper>
    );
  }

  return renderSelect();
};

export default CategorySelect;
