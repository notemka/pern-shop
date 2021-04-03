import React, { useState, useMemo } from 'react';
import GoodsContext from './GoodsContext';

const GoodsProvider = ({ children }) => {
  const [goods, setGoods] = useState([]);
  const providerValue = useMemo(() => ({ goods, setGoods }), [goods, setGoods]);

  return (
    <GoodsContext.Provider value={providerValue}>
      {children}
    </GoodsContext.Provider>
  );
};

export default GoodsProvider;
