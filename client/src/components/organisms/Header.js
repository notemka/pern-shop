import React from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo';
import Navigation from 'components/molecules/Navigation';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: var(--primary-color);
  color: var(--white-color);

  a {
    color: var(--white-color);
  }
`;

const Header = () => (
  <StyledHeader>
    <Logo />
    <Navigation />
  </StyledHeader>
);

export default Header;
