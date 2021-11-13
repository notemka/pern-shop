import React, { useEffect } from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../buttons/Button';
import FieldWrapper from './FieldWrapper';
import Label from './Label';

const StyledInput = styled.input`
  &[type='file'] {
    padding: 0;
    border: 0;

    &:focus {
      box-shadow: none;

      &::file-selector-button {
        background-color: var(--border-button-focus);
      }
    }

    &::file-selector-button {
      ${buttonStyles()};
      overflow: hidden;
    }

    &::placeholder {
      opacity: 0;
    }
  }
`;

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
    additionalElement,
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
      <StyledInput
        ref={customRef}
        id={inputId}
        type={inputType}
        value={value}
        name={name}
        maxLength={maxLength}
        {...restProps}
      />
      {additionalElement && additionalElement}

      {maxLength && value && value.length === +maxLength ? (
        <span>Must be {maxLength} characters or less</span>
      ) : (
        errorMessage && <span>{errorMessage}</span>
      )}
    </FieldWrapper>
  );
};

export default Input;
