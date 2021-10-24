import React, { useContext } from 'react';
import styled from 'styled-components';
import NotifierContext from 'contexts/NotifierContext/NotifierContext';
import Notification from 'components/molecules/Notification';

const NotifierList = styled.ul`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
`;

const Notifier = () => {
  const { notifiers, removeNotifier } = useContext(NotifierContext);

  if (!notifiers?.length) {
    return null;
  }

  return (
    <NotifierList>
      {notifiers.map((notification) => {
        if (notification.type === 'error') document.documentElement.style.setProperty('--notifier', '#ff9b9b');

        return <Notification key={notification.id} notification={notification} removeNotifier={removeNotifier} />;
      })}
    </NotifierList>
  );
};

export default Notifier;
