import React, { useEffect } from 'react';
import FieldWrapper from './FieldWrapper';
import Label from './Label';

const Input = (props) => {
  const {
    id,
    type,
    label,
    className,
    value,
    name,
    maxLength,
    errorMessage,
    autoFocus,
    icon,
    customRef,
    customStyles,
    ...restProps
  } = props;
  const inputType = type || 'text';
  const inputId = id || `input-${name}`;

  useEffect(() => {
    if (autoFocus && customRef) {
      customRef.current.focus();
    }
  });

  return (
    <FieldWrapper className={className} customStyles={customStyles}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <input
        ref={customRef}
        id={inputId}
        type={inputType}
        value={value}
        name={name}
        maxLength={maxLength}
        {...restProps}
      />
      {icon && icon}

      {maxLength && value && value.length === +maxLength ? (
        <span>Must be {maxLength} characters or less</span>
      ) : (
        errorMessage && <span>{errorMessage}</span>
      )}
    </FieldWrapper>
  );
};

export default Input;
