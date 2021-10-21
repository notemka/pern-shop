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
      align-items: flex-start;
    }
  `,
);

const NavItem = styled.li(
  ({ theme: { breakpoints } }) => css`
    margin-left: 30px;

    a {
      text-decoration: none;
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

    @media (max-width: ${breakpoints.md}) {
      background-color: transparent;
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

  return (
    <NavList>
      {user ? (
        <>
          {authRoutes(user).map((route) => renderLink(route))}

          <NavItem>
            <ExitButton onClick={exit}>Выход</ExitButton>
          </NavItem>
        </>
      ) : (
        publicRoutes.map((route) => renderLink(route))
      )}
    </NavList>
  );
};

export default NavigationList;
