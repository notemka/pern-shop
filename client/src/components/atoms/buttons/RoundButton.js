import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledButton = styled(Button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 7px;
  box-shadow: 0 0 5px var(--white-color);
  ${(theme, customStyles) => customStyles && customStyles(theme)};
`;

const RoundButton = (props) => {
  const { children, type = 'button', customStyles, ...restProps } = props;

  return (
    <StyledButton type={type} {...restProps} customStyles={customStyles}>
      {children}
    </StyledButton>
  );
};

export default RoundButton;
