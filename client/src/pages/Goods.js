import React, { useContext, useEffect, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import GoodList from 'components/molecules/GoodList';
import InfoText from 'components/atoms/InfoText';
import SearchField from 'components/molecules/SearchField';
import { fetchGoods } from 'http/goodAPI';
import Loader from 'components/atoms/Loader';
import { Context } from 'App';

const Goods = () => {
  const { goods, setGoods } = useContext(Context);
  const [loading, setLoading] = useState(true);
  // const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { rows } = await fetchGoods();
      setGoods(rows);
    };
    fetchData();
    setLoading(false);
  }, [setGoods]);

  return (
    <MainTemplate>
      <div>
        <h1>Список всех товаров</h1>
        <SearchField />

        {loading ? (
          <Loader />
        ) : goods.length ? (
          <GoodList goods={goods} />
        ) : (
          <InfoText>
            Товары отсутствуют, пожалуйста, обратитесь к администратору
          </InfoText>
        )}
      </div>
    </MainTemplate>
  );
};

export default Goods;
