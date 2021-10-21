import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 15px;
`;

const Form = ({ onSubmit, children, ...restProps }) => (
  <StyledForm onSubmit={onSubmit} {...restProps}>
    {children}
  </StyledForm>
);

export default Form;
