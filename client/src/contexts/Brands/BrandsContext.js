import { createContext } from 'react';

const BrandsContext = createContext({
  brands: [],
  setBrands: () => {},
});

export default BrandsContext;
