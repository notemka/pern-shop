import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GOOD_ROUTE } from 'routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faHeart, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Context } from 'App';
import useGoodActions from 'hooks/useGoodActions';

import { RoundButton } from 'components/atoms/buttons';
import { Wrapper, Photo, Description, Text, Actions } from './styled';

const GoodItem = ({ good }) => {
  const { id, name, price, rating, img } = good;
  const { user } = useContext(Context);
  const { removeGood, addGoodToBasket } = useGoodActions();

  return (
    <li>
      <Wrapper>
        <Photo>
          {img ? <img src={process.env.REACT_APP_API_URL + img} alt="tool" /> : <FontAwesomeIcon icon={faTools} />}
        </Photo>

        <Description>
          <Link to={`${GOOD_ROUTE}/${id}`}>
            <h2>{name}</h2>
          </Link>

          <Text>
            <strong>Арендная цена:</strong>
            <span>{price} руб.</span>
          </Text>
          <Text>
            <strong>Рейтинг:</strong>
            <span>{rating}</span>
          </Text>

          <Actions>
            <RoundButton title="Добавить в избранное" onClick={() => {}}>
              <FontAwesomeIcon icon={faHeart} />
            </RoundButton>
            <RoundButton title="Купить" onClick={() => addGoodToBasket(id)}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </RoundButton>

            {user?.role === 'ADMIN' && (
              <>
                <RoundButton title="Удалить" onClick={() => removeGood(id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RoundButton>
              </>
            )}
          </Actions>
        </Description>
      </Wrapper>
    </li>
  );
};

export default GoodItem;
