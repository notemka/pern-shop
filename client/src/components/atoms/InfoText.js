import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  padding: 15px;
  text-align: center;
`;

const InfoText = ({ children, className }) => (
  <StyledParagraph className={className}>{children}</StyledParagraph>
);

export default InfoText;
