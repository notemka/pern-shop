import React, { useState } from 'react';
import styled from 'styled-components';
import RoundButton from 'components/atoms/buttons/RoundButton';

const AlertList = styled.ul`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
`;

const AlertItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px;
  max-width: 300px;
  color: var(--white-color);
  background-color: var(--alert-success);
  word-break: break-word;

  &.error {
    background-color: var(--alert-error);

    button {
      color: var(--alert-error);
    }
  }
`;

const StyledButton = styled(RoundButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 15px;
  color: var(--alert-success);
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

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  const hideAlertMessage = (id) => {
    setAlerts((alertsMsgs) => alertsMsgs.filter((alert) => alert.id !== id));
  };

  // const showAlertMessage = (data) => {
  //   let timer;
  //   const time = 4000;
  //   const id = Date.now().toString(32);
  //   const alert = { id, ...data };
  //   clearTimeout(timer);

  //   setAlerts((alertsMsgs) => ({ ...alertsMsgs, alert }));

  //   timer = setTimeout(() => hideAlertMessage(alert.id), time);
  // };

  return (
    <AlertList>
      {alerts.map((alert) => (
        <AlertItem className={alert.type ? alert.type : ''}>
          <span>{alert.text}</span>
          <StyledButton onClick={() => hideAlertMessage(alert.id)}>&times;</StyledButton>
        </AlertItem>
      ))}
    </AlertList>
  );
};

export default Alert;
