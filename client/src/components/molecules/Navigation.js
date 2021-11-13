import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'components/atoms/buttons';
import NavigationList from './NavigationList';

const Nav = styled.nav(
  ({ theme: { breakpoints } }) => css`
    display: flex;

    @media (max-width: ${breakpoints.md}) {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.7);
      visibility: hidden;
      opacity: 0;
      transition: visibility, opacity 0.4s;
      z-index: 10;

      &.active {
        opacity: 1;
        visibility: visible;
        overflow: hidden;
      }
    }
  `,
);

const MenuButton = styled(Button)(
  ({ theme: { breakpoints } }) => css`
    display: none;

    @media (max-width: ${breakpoints.md}) {
      display: inline-flex;
    }
  `,
);

const CloseButton = styled(Button)(
  ({ theme: { breakpoints } }) => css`
    position: fixed;
    top: 30px;
    right: 20px;
    display: none;
    padding: 10px;
    border: 0;
    background-color: transparent;
    font-size: 40px;
    line-height: 30px;

    &:not(:disabled):hover {
      background-color: transparent;
    }

    @media (max-width: ${breakpoints.md}) {
      display: inline-flex;
    }
  `,
);

const Navigation = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const user = true;
  const toggleMenuHandler = () => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <>
      {user ? (
        <>
          <Nav className={menuVisibility && 'active'}>
            <NavigationList exit={() => {}} />

            <CloseButton onClick={toggleMenuHandler}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </Nav>

          <MenuButton onClick={toggleMenuHandler}>
            <FontAwesomeIcon icon={faBars} />
          </MenuButton>
        </>
      ) : null}
    </>
  );
};

export default Navigation;
