import React from 'react';
import styled from 'styled-components';
import GlobalStyles from 'styles/globalStyles';
import breakpoints from 'styles/breakpoints';
import Header from '../organisms/Header';

const Container = styled.main`
  display: flex;
  flex-grow: 1;
  width: 100%;

  & > div {
    max-width: ${breakpoints.screenXl};
    width: 100%;
    padding: 30px 15px;
    margin: 0 auto;
  }
`;

const MainTemplate = ({ children }) => {
  return (
    <>
      <GlobalStyles />

      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default MainTemplate;
