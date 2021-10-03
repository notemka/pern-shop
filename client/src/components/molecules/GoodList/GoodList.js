import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Context } from 'App';
import { GET_ALL_GOODS } from 'graphql/queries/goods';

import Loader from 'components/atoms/Loader';
import InfoText from 'components/atoms/InfoText';
import GoodItem from 'components/molecules/GoodItem';
import List from './styled';

const GoodList = () => {
  const { goods, setGoods } = useContext(Context);
  const { data, loading, error } = useQuery(GET_ALL_GOODS);

  useEffect(() => {
    if (!loading) {
      setGoods(data.getAllGoods);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (!goods.length && error) {
    <InfoText>Товары отсутствуют, пожалуйста, обратитесь к администратору</InfoText>;
  }

  if (goods.length) {
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
  return <InfoText>Товары этой категории отсутствуют</InfoText>;
};

export default GoodList;
