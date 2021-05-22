import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import Loader from '../components/atoms/Loader';
import BasketList from '../components/molecules/BasketList';
import MainTemplate from '../components/templates/MainTemplate';
import { GET_ALL_BASKET_GOODS } from '../graphql/queries/basket';
import { Context } from '../App';
import { GET_ONE_GOOD } from '../graphql/queries/goods';
import InfoText from '../components/atoms/InfoText';

const Basket = () => {
  const [goodList, setGoodList] = useState([]);
  const { user } = useContext(Context);
  const { data, loading, error } = useQuery(GET_ALL_BASKET_GOODS, {
    variables: { id: user.id },
  });
  const [getOneGood, { loading: goodLoading }] = useLazyQuery(GET_ONE_GOOD);

  useEffect(() => {
    const fetchData = async () => {
      const basketList = data.getAllBasketGoods;
      const list = await Promise.all(
        basketList.filter(({ id }) => {
          const goodData = getOneGood({ variables: { id } });
          const good = goodData?.getOneGood;
          console.log(good);
          if (typeof good !== 'undefined') return good;
        })
      );
      console.log(list);
      if (list) setGoodList(list);
    };

    if (!loading && !goodLoading) {
      fetchData();
    }
  }, []);

  return (
    <MainTemplate>
      <div>
        <h1>Корзина</h1>

        {error && <p>{error.message}</p>}
        {loading ? (
          <Loader />
        ) : goodList ? (
          <BasketList goods={goodList} />
        ) : (
          <InfoText>Корзина пуста</InfoText>
        )}
      </div>
    </MainTemplate>
  );
};

export default Basket;
