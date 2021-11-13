import React, { useContext, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import GoodList from 'components/molecules/GoodList/GoodList';
import SearchField from 'components/molecules/SearchField';
import AppContext from 'contexts/AppContext';

const Goods = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { goods, setGoods } = useContext(AppContext);

  return (
    <MainTemplate>
      <div>
        <h1>Список всех товаров</h1>
        <SearchField setGoods={setGoods} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <GoodList goods={goods} setGoods={setGoods} searchQuery={searchQuery} />
      </div>
    </MainTemplate>
  );
};

export default Goods;
