import React from 'react';
import styled, { css } from 'styled-components';

export const buttonStyles = () => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  color: var(--white-color);
  border: 1px solid transparent;
  border-radius: 4px;
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
`;

const StyledButton = styled.button(
  ({ theme, customStyles }) => css`
    ${buttonStyles(theme)}

    & + button {
      margin-left: 10px;
    }

    ${customStyles && customStyles(theme)}
  `,
);

const Button = (props) => {
  const { children, type = 'button', customStyles, ...restProps } = props;

  return (
    <StyledButton type={type} customStyles={customStyles} {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
