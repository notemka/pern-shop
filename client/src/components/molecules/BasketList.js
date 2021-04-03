import React from 'react';
import styled from 'styled-components';
import { deleteBasketGood } from '../../http/basketAPI';
import breakpoints from '../../styles/breakpoints';
import Button from '../atoms/buttons/Button';

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
  return (
    <>
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

              <Button onClick={() => deleteBasketGood(id)}>Удалить</Button>
            </GoodItem>
          );
        })}
      </ul>
    </>
  );
};

export default BasketList;
