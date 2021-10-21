import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      goods,
      setGoods,
      brands,
      setBrands,
      types,
      setTypes,
    }),
    [user, setUser, goods, setGoods, brands, setBrands, types, setTypes],
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
