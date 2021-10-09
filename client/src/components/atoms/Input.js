import React, { useEffect } from 'react';
import FieldWrapper from './FieldWrapper';
import Label from './Label';

const Input = (props) => {
  const {
    type,
    label,
    className,
    value,
    name,
    disabled,
    required,
    placeholder,
    accept,
    onChange,
    maxLength,
    errorMessage,
    autoFocus,
    customRef,
  } = props;
  const inputType = type || 'text';
  const inputId = `input-${name}`;

  useEffect(() => {
    if (autoFocus && customRef) {
      customRef.current.focus();
    }
  });

  return (
    <FieldWrapper className={className}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <input
        ref={customRef}
        id={inputId}
        type={inputType}
        value={value}
        name={name}
        accept={accept}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
      />

      {maxLength && value && value.length === +maxLength ? (
        <span>Must be {maxLength} characters or less</span>
      ) : (
        errorMessage && <span>{errorMessage}</span>
      )}
    </FieldWrapper>
  );
};

export default Input;
