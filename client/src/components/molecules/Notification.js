import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { RoundButton } from 'components/atoms/buttons';

const NotifierItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px;
  max-width: 300px;
  color: var(--white-color);
  background-color: var(--notifier);
  word-break: break-word;
  animation: slideIn 0.3s ease-in-out;
  transition: transform 0.3s ease-out;

  &.error {
    --notifier: var(--error);
  }

  /* &.slideOut {
    transform: translateX(150%);
  } */

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0%);
    }
  }
`;

const StyledButton = styled(RoundButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 15px;
  color: var(--notifier);
  width: 20px;
  height: 20px;
  padding: 4px 5px;
  line-height: 0;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: none;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  &:focus {
    border-color: var(--white-color);
  }
`;

const Notification = ({ notification, removeNotifier }) => {
  const { id, type = 'success', text } = notification;
  let notifierTimer;
  const ref = useRef(null);

  const clearTimer = () => {
    if (notifierTimer) {
      clearTimeout(notifierTimer);
    }
  };

  const hideNotifierMessage = () => {
    // ref.current.classList.add('slideOut');
    removeNotifier(id);
    clearTimer();
  };

  useEffect(() => {
    notifierTimer = setTimeout(hideNotifierMessage, 4000);

    return () => clearTimer();
  }, [notification]);

  if (text?.length === 0) {
    return null;
  }

  return (
    <NotifierItem className={type} type={type} ref={ref}>
      <span>{text}</span>
      <StyledButton onClick={hideNotifierMessage} title="Close">
        &times;
      </StyledButton>
    </NotifierItem>
  );
};

export default Notification;
