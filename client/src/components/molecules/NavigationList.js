import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { publicRoutes, authRoutes } from 'routes';
import AppContext from 'contexts/AppContext';

import { Button } from 'components/atoms/buttons';

const NavList = styled.ul(
  ({ theme: { breakpoints } }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
    }
  `,
);

const NavItem = styled.li(
  ({ theme: { breakpoints } }) => css`
    margin-left: 30px;
    padding: 10px 0;

    a {
      display: block;
      text-align: center;
      text-decoration: none;
      word-break: break-word;
    }

    a.active,
    a:hover {
      text-decoration: underline;
    }

    @media (max-width: ${breakpoints.md}) {
      margin: 0 0 20px 0;
      font-size: 26px;
    }
  `,
);

const ExitButton = styled(Button)(
  ({ theme: { breakpoints } }) => css`
    border: 1px solid var(--white-color);
    margin-left: 30px;

    @media (max-width: ${breakpoints.md}) {
      background-color: transparent;
      margin-left: 0;
    }
  `,
);

const NavigationList = () => {
  const { user, setUser } = useContext(AppContext);

  const exit = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const renderLink = ({ title, path, inNavigation }) => {
    if (inNavigation) {
      return (
        <NavItem key={title}>
          <NavLink to={path} exact activeClassName="active">
            {title}
          </NavLink>
        </NavItem>
      );
    }
    return null;
  };

  return user ? (
    <>
      <NavList>{authRoutes(user).map((route) => renderLink(route))}</NavList>
      <ExitButton onClick={exit}>Выход</ExitButton>
    </>
  ) : (
    <NavList>{publicRoutes.map((route) => renderLink(route))}</NavList>
  );
};

export default NavigationList;
