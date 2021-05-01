import React, { useState, useMemo, createContext } from 'react';

export const Context = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState([]);
  const [brands, setBrands] = useState(true);
  const [types, setTypes] = useState(true);

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

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default AppContextProvider;
// import React from 'react';
// import AuthProvider from 'Auth/AuthProvider';
// import BrandsProvider from 'Brands/BrandsProvider';
// import GoodsProvider from 'Goods/GoodsProvider';
// import TypesProvider from 'Types/TypesProvider';

// const AppContextProvider = ({ children }) => {
//   return (
//     <AuthProvider>
//       <BrandsProvider>
//         <TypesProvider>
//           <GoodsProvider>{children}</GoodsProvider>
//         </TypesProvider>
//       </BrandsProvider>
//     </AuthProvider>
//   );
// };

// export default AppContextProvider;
