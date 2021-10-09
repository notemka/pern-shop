import React from 'react';
import styled from 'styled-components';

import breakpoints from 'styles/breakpoints';
import Button from 'components/atoms/buttons/Button';
import InfoText from 'components/atoms/InfoText';
import Loader from 'components/atoms/Loader';
import useGoodActions from 'hooks/useGoodActions';

const GoodItem = styled.li`
  display: grid;
  grid-template-columns: 150px 1fr auto;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;

  @media (max-width: ${breakpoints.screenMd}) {
    grid-template-columns: 1fr;
  }

  &:nth-child(odd) {
    background-color: var(--second-color);
  }

  figure {
    width: 120px;
    margin: 0;

    img {
      width: 100%;
    }
  }
`;

const BasketList = ({ goodList, setGoodList }) => {
  const { deleteFromBasket, deleteFromBasketLoading: loading } = useGoodActions();

  const deleteFromBasketList = async (id) => {
    await deleteFromBasket(id);
    setGoodList((list) => list.filter(({ id: goodId }) => +goodId !== +id));
  };

  if (!goodList.length) {
    return <InfoText>Корзина пуста</InfoText>;
  }

  return (
    <ul>
      {goodList.map(({ id, name, price, img }) => (
        <GoodItem key={id}>
          <figure>
            <img src={process.env.REACT_APP_API_URL + img} alt={name} />
          </figure>
          <div>
            <h3>{name}</h3>
            {price} руб.
          </div>

          <Button onClick={() => deleteFromBasketList(id)}>{loading ? <Loader size="small" /> : 'Удалить'}</Button>
        </GoodItem>
      ))}
    </ul>
  );
};

export default BasketList;
