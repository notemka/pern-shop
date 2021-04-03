import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledButton = styled(Button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 7px;
  box-shadow: 0 0 5px var(--white-color);
`;

const RoundButton = (props) => {
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

export default RoundButton;
