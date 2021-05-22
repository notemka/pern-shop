import { useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { DELETE_FROM_BASKET } from '../../graphql/mutations/basket';
import breakpoints from '../../styles/breakpoints';
import Button from '../atoms/buttons/Button';
import InfoText from '../atoms/InfoText';
import Loader from '../atoms/Loader';

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

const BasketList = ({ goods }) => {
  const [deleteFromBasket, { loading }] = useMutation(DELETE_FROM_BASKET);

  if (!goods.length) {
    return <InfoText>Корзина пуста</InfoText>;
  }

  return (
    <ul>
      {goods.map(({ id, name, price, img }) => {
        return (
          <GoodItem key={id}>
            <figure>
              <img src={process.env.REACT_APP_API_URL + img} alt={name} />
            </figure>
            <div>
              <h3>{name}</h3>
              {price} руб.
            </div>

            <Button
              onClick={() =>
                deleteFromBasket({
                  variables: { goodId: id },
                })
              }
            >
              {loading ? <Loader size="small" /> : 'Удалить'}
            </Button>
          </GoodItem>
        );
      })}
    </ul>
  );
};

export default BasketList;
