import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import Loader from '../components/atoms/Loader';
import BasketList from '../components/molecules/BasketList';
import MainTemplate from '../components/templates/MainTemplate';
import { GET_ALL_BASKET_GOODS } from '../graphql/queries/basket';
import { Context } from '../App';
import { GET_ONE_GOOD } from '../graphql/queries/goods';

const Basket = () => {
  const [goodList, setGoodList] = useState([]);
  const { user } = useContext(Context);
  const { data, loading, error } = useQuery(GET_ALL_BASKET_GOODS, {
    variables: { id: user.id },
  });
  const [getOneGood, { loading: goodLoading }] = useLazyQuery(GET_ONE_GOOD, {
    onCompleted: (good) => {
      const goodData = good?.getOneGood;
      console.log(goodData);
      if (goodData) {
        setGoodList((prevData) => {
          console.log(prevData);
          return [...prevData, goodData];
        });
      }
    },
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const basketList = data.getAllBasketGoods;
      console.log(basketList);
      await basketList.map(({ goodId }) =>
        getOneGood({ variables: { id: goodId } })
      );
      // console.log(goodList);
      // if (!goodLoading && goodList.length > 0) setGoodList(goodList);
    };

    if (data) fetchDetails();
  }, [data, loading, getOneGood, goodLoading]);

  return (
    <MainTemplate>
      <div>
        <h1>Корзина</h1>

        {error && <p>{error.message}</p>}
        {loading ? <Loader /> : <BasketList goods={goodList} />}
      </div>
    </MainTemplate>
  );
};

export default Basket;
