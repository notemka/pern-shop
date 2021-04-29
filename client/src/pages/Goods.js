import React, { useContext, useEffect, useState } from 'react';
import MainTemplate from '../components/templates/MainTemplate';
import GoodList from '../components/molecules/GoodList';
import InfoText from '../components/atoms/InfoText';
import SearchField from '../components/molecules/SearchField';
import Loader from '../components/atoms/Loader';
import { Context } from '../App';
import { useQuery } from '@apollo/client';
import { GET_ALL_GOODS } from '../graphql/queries/goods';

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
          <InfoText>
            {error
              ? error
              : 'Товары отсутствуют, пожалуйста, обратитесь к администратору'}
          </InfoText>
        )}
      </div>
    </MainTemplate>
  );
};

export default Goods;
