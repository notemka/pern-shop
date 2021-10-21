import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  padding: 15px;
  text-align: center;
`;

const InfoText = ({ children, ...restProps }) => <StyledParagraph {...restProps}>{children}</StyledParagraph>;

export default InfoText;
