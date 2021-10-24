import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { NotifierContextProvider } from 'contexts/NotifierContext';
import GlobalStyles from 'styles/globalStyles';
import theme from 'styles/theme';

import Notifier from 'components/molecules/Notifier';
import Header from '../organisms/Header';

const Container = styled.main`
  display: flex;
  flex-grow: 1;
  width: 100%;

  & > div {
    max-width: ${theme.breakpoints.xl};
    width: 100%;
    padding: 30px 15px;
    margin: 0 auto;
  }
`;

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <NotifierContextProvider>
      <GlobalStyles />

      <Header />
      <Container>
        <Notifier />
        {children}
      </Container>
    </NotifierContextProvider>
  </ThemeProvider>
);

export default MainTemplate;
