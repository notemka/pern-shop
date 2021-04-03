import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  color: var(--white-color);
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: var(--primary-color);
  text-transform: uppercase;
  transition: background-color 0.4s;
  font-size: var(--font-size--small);
  font-weight: bold;

  &:not(:disabled):hover {
    background-color: var(--border-button-focus);
  }

  &:focus {
    border-color: var(--border-button-focus);
    outline: none;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }

  & + button {
    margin-left: 10px;
  }
`;

const Button = (props) => {
  const {
    children,
    disabled,
    className,
    onClick,
    type = 'button',
    title,
  } = props;

  return (
    <StyledButton
      type={type}
      className={className}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
