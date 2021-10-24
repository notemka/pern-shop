import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import AppContext from 'contexts/AppContext';
import useGoodActions from 'hooks/useGoodActions';
import { Button } from 'components/atoms/buttons';

const Actions = styled.div(
  ({ theme: { breakpoints } }) => css`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, auto);
    justify-content: end;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: 1fr;
    }

    button + button {
      @media (max-width: ${breakpoints.sm}) {
        margin-left: 0;
      }
    }
  `,
);

const GoodActions = ({ goodId, isEditMode, setIsEditMode }) => {
  const { user } = useContext(AppContext);
  const { removeGood, addGoodToBasket } = useGoodActions();

  return (
    <Actions>
      {user?.role === 'ADMIN' && (
        <>
          <Button onClick={() => setIsEditMode((mode) => !mode)}>{isEditMode ? 'Отменить' : 'Редактировать'}</Button>
          <Button onClick={() => removeGood(goodId)}>Удалить</Button>
        </>
      )}
      <Button onClick={() => addGoodToBasket(goodId)}>Купить</Button>
    </Actions>
  );
};

export default GoodActions;
