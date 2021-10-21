import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  &:not(:empty) {
    display: block;
    margin-bottom: 10px;
  }
`;

const Label = ({ htmlFor, children, ...restProps }) => (
  <StyledLabel htmlFor={htmlFor} {...restProps}>
    {children}
  </StyledLabel>
);

export default Label;
