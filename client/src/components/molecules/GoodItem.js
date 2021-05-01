import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GOOD_ROUTE } from 'routes';
import { Context } from 'App';
import { deleteGood } from 'http/goodAPI';
import { addGoodToBasket } from 'http/basketAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import RoundButton from 'components/atoms/buttons/RoundButton';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Photo = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  margin: 0;

  svg {
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 40px;
    color: var(--white-color);
    background: var(--image-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  position: relative;
  padding: 20px 15px;
`;

const Text = styled.div`
  position: relative;
  margin: 0 0 15px;
  white-space: pre-line;
  word-break: break-all;

  strong + span {
    margin-left: 10px;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%);
`;

const GoodItem = ({ good }) => {
  const { id, name, price, rating, img } = good;
  const { user } = useContext(Context);

  const removeGood = async () => {
    try {
      await deleteGood(id);
      alert('Товар успешно удален!');
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToBasket = async () => {
    try {
      await addGoodToBasket(id);
      alert('Товар добавлен в корзину!');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <li>
      <Wrapper>
        <Photo>{img ? <img src={process.env.REACT_APP_API_URL + img} alt="tool" /> : 'Фото отсутствует'}</Photo>

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
            <RoundButton title="Купить" onClick={addToBasket}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </RoundButton>

            {user?.role === 'ADMIN' && (
              <>
                <RoundButton title="Удалить" onClick={removeGood}>
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
