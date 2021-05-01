import React, { useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader';
import BasketList from 'components/molecules/BasketList';
import MainTemplate from 'components/templates/MainTemplate';
import { fetchBasketGoods } from 'http/basketAPI';
import { fetchOneGood } from 'http/goodAPI';

const Basket = () => {
  const [goodList, setGoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await fetchBasketGoods();
      const list = await Promise.all(data.map(({ goodId }) => fetchOneGood(goodId)));
      setGoodList(list);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <MainTemplate>
      <div>
        <h1>Корзина</h1>

        {loading ? <Loader /> : <BasketList goods={goodList} />}
      </div>
    </MainTemplate>
  );
};

export default Basket;
