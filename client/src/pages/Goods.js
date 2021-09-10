import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Context } from 'App';
import { GET_ALL_GOODS } from 'graphql/queries/goods';

import MainTemplate from 'components/templates/MainTemplate';
import GoodList from 'components/molecules/GoodList';
import SearchField from 'components/molecules/SearchField';
import InfoText from 'components/atoms/InfoText';
import Loader from 'components/atoms/Loader';

const Goods = () => {
  const { goods, setGoods } = useContext(Context);
  const { data, loading, error } = useQuery(GET_ALL_GOODS);

  useEffect(() => {
    if (!loading) {
      setGoods(data.getAllGoods);
    }
  }, [data]);

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
          <InfoText>{error && 'Товары отсутствуют, пожалуйста, обратитесь к администратору'}</InfoText>
        )}
      </div>
    </MainTemplate>
  );
};

export default Goods;
