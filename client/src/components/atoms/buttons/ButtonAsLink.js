import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;

  &:focus,
  &:hover {
    color: var(--primary-color);
  }

  &:disabled {
    color: var(--grey-8e);
  }

  ${(theme, customStyles) => customStyles && customStyles(theme)};
`;

const ButtonAsLink = (props) => {
  const { children, type = 'button', customStyles, ...restProps } = props;

  return (
    <StyledButton type={type} {...restProps} customStyles={customStyles}>
      {children}
    </StyledButton>
  );
};

export default ButtonAsLink;
