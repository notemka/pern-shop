import { createContext } from 'react';

const GoodsContext = createContext({
  goods: [],
  setGoods: () => {},
});

export default GoodsContext;
