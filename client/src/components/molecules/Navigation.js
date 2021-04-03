import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/buttons/Button';
import NavigationList from './NavigationList';
import breakpoints from '../../styles/breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  @media (max-width: ${breakpoints.screenMd}) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    visibility: hidden;
    opacity: 0;
    transition: visibility, opacity 0.4s;
    z-index: 100;

    &.active {
      opacity: 1;
      visibility: visible;
      overflow: hidden;
    }
  }
`;

const MenuButton = styled(Button)`
  display: none;

  @media (max-width: ${breakpoints.screenMd}) {
    display: inline-flex;
  }
`;

const CloseButton = styled(Button)`
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

  @media (max-width: ${breakpoints.screenMd}) {
    display: inline-flex;
  }
`;

const Navigation = (props) => {
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
