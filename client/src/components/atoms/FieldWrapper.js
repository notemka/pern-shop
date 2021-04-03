import React from 'react';
import styled from 'styled-components';

const FieldWrap = styled.div`
  margin-bottom: 15px;
`;

const FieldWrapper = ({ className, children }) => (
  <FieldWrap className={className}>{children}</FieldWrap>
);

export default FieldWrapper;
