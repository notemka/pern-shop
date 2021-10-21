import React from 'react';
import styled, { css } from 'styled-components';

const FieldWrap = styled.div(
  ({ customStyles }) => css`
    margin-bottom: 15px;
    ${customStyles && customStyles()}
  `,
);

const FieldWrapper = ({ className, children, customStyles }) => (
  <FieldWrap className={className} customStyles={customStyles}>
    {children}
  </FieldWrap>
);

export default FieldWrapper;
