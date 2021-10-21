import React from 'react';
import styled, { css } from 'styled-components';

const FieldWrap = styled.div(
  ({ customStyles }) => css`
    margin-bottom: 15px;
    ${customStyles && customStyles()}
  `,
);

const FieldWrapper = ({ children, customStyles, ...restProps }) => (
  <FieldWrap customStyles={customStyles} {...restProps}>
    {children}
  </FieldWrap>
);

export default FieldWrapper;
