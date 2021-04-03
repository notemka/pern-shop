import { createContext } from 'react';

const TypesContext = createContext({
  types: [],
  setTypes: () => {},
});

export default TypesContext;
