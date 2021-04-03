import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/buttons/Button';
import breakpoints from '../../styles/breakpoints';
import { LOGIN_ROUTE, publicRoutes, authRoutes } from '../../routes';
import { Context } from '../../App';

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${breakpoints.screenMd}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavItem = styled.li`
  margin-left: 30px;

  a {
    text-decoration: none;
  }

  a.active,
  a:hover {
    text-decoration: underline;
  }

  button {
    border: 1px solid var(--white-color);
  }

  @media (max-width: ${breakpoints.screenMd}) {
    margin: 0 0 20px 0;
    font-size: 26px;
  }
`;

const ExitButton = styled(Button)`
  @media (max-width: ${breakpoints.screenMd}) {
    background-color: transparent;
  }
`;

const NavigationList = () => {
  const { user, setUser } = useContext(Context);
  const history = useHistory();

  const exit = () => {
    history.push(LOGIN_ROUTE);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <NavList>
      {user ? (
        <>
          {authRoutes(user).map(({ title, path }) => (
            <NavItem key={title}>
              <NavLink to={path} exact activeClassName="active">
                {title}
              </NavLink>
            </NavItem>
          ))}

          <NavItem>
            <ExitButton onClick={exit}>Выход</ExitButton>
          </NavItem>
        </>
      ) : (
        <>
          {publicRoutes.map(({ title, path }) => (
            <NavItem key={title}>
              <NavLink to={path} exact activeClassName="active">
                {title}
              </NavLink>
            </NavItem>
          ))}
        </>
      )}
    </NavList>
  );
};

export default NavigationList;
