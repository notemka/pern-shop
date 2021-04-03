import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 15px;
`;

const Form = ({ onSubmit, className, children, ...args }) => (
  <StyledForm onSubmit={onSubmit} className={className} {...args}>
    {children}
  </StyledForm>
);

export default Form;
