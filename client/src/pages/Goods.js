import React, { useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import GoodList from 'components/molecules/GoodList/GoodList';
import SearchField from 'components/molecules/SearchField';

const Goods = () => {
  const [filteredGoods, setFilteredGoods] = useState(null);

  return (
    <MainTemplate>
      <div>
        <h1>Список всех товаров</h1>
        <SearchField setFilteredGoods={setFilteredGoods} />

        <GoodList filteredGoods={filteredGoods} />
      </div>
    </MainTemplate>
  );
};

export default Goods;
