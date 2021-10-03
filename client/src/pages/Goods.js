import React from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import GoodList from 'components/molecules/GoodList/GoodList';
import SearchField from 'components/molecules/SearchField';

const Goods = () => (
  <MainTemplate>
    <div>
      <h1>Список всех товаров</h1>
      <SearchField />

      <GoodList />
    </div>
  </MainTemplate>
);

export default Goods;
