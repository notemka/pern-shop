import React, { useContext } from 'react';
import styled from 'styled-components';
import breakpoints from '../../../styles/breakpoints';
import { useHistory } from 'react-router-dom';
import { Context } from '../../../App';
import { deleteGood } from '../../../http/goodAPI';
import { addGoodToBasket } from '../../../http/basketAPI';
import { SHOP_ROUTE } from '../../../routes';

import Button from '../../atoms/buttons/Button';

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
  const { push } = useHistory();

  const removeGood = async (id) => {
    try {
      await deleteGood(id);
      push(SHOP_ROUTE);
      alert(`Товар успешно удален!`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Actions>
      {user?.role === 'ADMIN' && (
        <>
          <Button onClick={() => setIsEditMode((mode) => !mode)}>
            {isEditMode ? 'Отменить' : 'Редактировать'}
          </Button>
          <Button onClick={() => removeGood(goodId)}>Удалить</Button>
        </>
      )}
      <Button onClick={() => addGoodToBasket(goodId)}>Купить</Button>
    </Actions>
  );
};

export default GoodActions;
