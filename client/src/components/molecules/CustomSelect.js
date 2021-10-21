import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { FieldWrapper } from 'components/atoms/formElements';
import Label from 'components/atoms/formElements/Label';

const themeOptions = (theme) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    primary25: '#e3e3e3',
    primary50: '#f6f6f6',
    primary: '#42b983',
    neutral20: '#e3e3e3',
  },
});

const CustomSelect = ({ options = [], label, name, onChange, value }) => {
  const [currentValue, setCurrentValue] = useState(value || options[0]);
  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      boxShadow: '0 0 0',
      borderBottomLeftRadius: state.selectProps.menuIsOpen ? 0 : 4,
      borderBottomRightRadius: state.selectProps.menuIsOpen ? 0 : 4,
    }),
    container: (styles) => ({
      ...styles,
      flex: 1,
      boxShadow: 'none',
    }),
    dropdownIndicator: (styles, state) => ({
      ...styles,
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
    }),
  };

  const onChangeHandler = (option) => {
    setCurrentValue(option);
    onChange(option);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const renderSelect = () => (
    <Select
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

export default CustomSelect;
