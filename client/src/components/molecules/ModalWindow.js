import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RoundButton from '../atoms/buttons/RoundButton';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const Dialog = styled.div`
  position: relative;
  max-width: 450px;
  width: 90%;
  padding: 15px;
  background: var(--white-color);
  z-index: 1000;
`;

const StyledButton = styled(RoundButton)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
`;

const ModalWindow = ({ closeModal, children }) => {
  return (
    <Wrapper>
      <Overlay onClick={closeModal} />
      <Dialog>
        <StyledButton onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledButton>
        {children}
      </Dialog>
    </Wrapper>
  );
};

export default ModalWindow;
