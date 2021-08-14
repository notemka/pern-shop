import React, { useContext } from 'react';
import styled from 'styled-components';
import breakpoints from 'styles/breakpoints';

import Button from 'components/molecules/buttons/Button';
import useGoodActions from 'hooks/useGoodActions';
import { Context } from '../../../App';

const Actions = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, auto);
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.screenMd}) {
    grid-template-columns: 1fr;
  }
`;

const GoodActions = ({ goodId, isEditMode, setIsEditMode }) => {
  const { user } = useContext(Context);
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
