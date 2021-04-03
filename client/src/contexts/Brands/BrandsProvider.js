import React, { useState, useMemo } from 'react';
import BrandsContext from './BrandsContext';

const BrandsProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const providerValue = useMemo(() => ({ brands, setBrands }), [
    brands,
    setBrands,
  ]);

  return (
    <BrandsContext.Provider value={providerValue}>
      {children}
    </BrandsContext.Provider>
  );
};

export default BrandsProvider;
