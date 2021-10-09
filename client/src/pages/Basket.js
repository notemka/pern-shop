import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { Context } from 'App';
import GET_ALL_BASKET_GOODS from 'graphql/queries/basket';
import { GET_GOODS_DATA_FOR_BASKET } from 'graphql/queries/goods';

import MainTemplate from 'components/templates/MainTemplate';
import Loader from 'components/atoms/Loader';
import BasketList from 'components/molecules/BasketList';

const Basket = () => {
  const { user } = useContext(Context);
  const { data, loading, error, refetch } = useQuery(GET_ALL_BASKET_GOODS, { variables: { id: user.id } });
  const [goodList, setGoodList] = useState([]);

  const onCompleted = (goods) => {
    const list = goods?.getGoodsDataForBasket;
    if (list) {
      setGoodList(list);
    }
  };
  const [getGoodsData, { loading: goodsLoading }] = useLazyQuery(GET_GOODS_DATA_FOR_BASKET, { onCompleted });

  useEffect(() => {
    const fetchDetails = async () => {
      const basketList = data.getAllBasketGoods.reduce((arr, { id, goodId }) => {
        if (goodId) {
          arr.push({ id, goodId });
        }
        return arr;
      }, []);
      await getGoodsData({ variables: { basketList } });
    };

    if (data) fetchDetails();
  }, [data, getGoodsData]);

  useEffect(() => {
    refetch();
  }, [goodList]);

  return (
    <MainTemplate>
      <div>
        <h1>Корзина</h1>

        {error && <p>{error.message}</p>}
        {loading && goodsLoading ? <Loader /> : <BasketList goodList={goodList} setGoodList={setGoodList} />}
      </div>
    </MainTemplate>
  );
};

export default Basket;
