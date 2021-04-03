import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Navigation from '../molecules/Navigation';

const StyledHeader = styled.header`
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
