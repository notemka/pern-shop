import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_GOODS } from 'graphql/queries/goods';

import Loader from 'components/atoms/Loader';
import InfoText from 'components/atoms/InfoText';
import GoodItem from 'components/molecules/GoodItem';
import List from './styled';

const GoodList = ({ goods, setGoods, searchQuery }) => {
  const { data, loading, error } = useQuery(GET_ALL_GOODS);

  useEffect(() => {
    if (!loading) {
      setGoods(data.getAllGoods);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (!goods?.length && error) {
    return <InfoText>Что-то пошло не так...</InfoText>;
  }

  if (goods?.length === 0 && searchQuery.length > 0) {
    return <InfoText>По вашему запросу ничего не найдено</InfoText>;
  }

  if (goods?.length) {
    return (
      <>
        <List data-testid="test-recipe-list">
          {goods.map((good) => (
            <GoodItem key={good.id} good={good} />
          ))}
        </List>
      </>
    );
  }
  return <InfoText>Товары отсутствуют, пожалуйста, обратитесь к администратору</InfoText>;
};

export default GoodList;
