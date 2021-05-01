import React, { useState, useMemo } from 'react';
import TypesContext from './TypesContext';

const TypesProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const providerValue = useMemo(() => ({ types, setTypes }), [types, setTypes]);

  return <TypesContext.Provider value={providerValue}>{children}</TypesContext.Provider>;
};

export default TypesProvider;
