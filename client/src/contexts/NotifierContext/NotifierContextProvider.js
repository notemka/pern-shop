import React, { useMemo, useState } from 'react';
import NotifierContext from './NotifierContext';

const NotifierContextProvider = ({ children }) => {
  const [notifiers, setNotifiers] = useState([]);

  const addNotifier = (data) => {
    setNotifiers((prevList) => [...prevList, { ...data, id: Date.now() }]);
  };

  const removeNotifier = (id) => {
    setNotifiers((prevList) => prevList.filter((notifier) => notifier.id !== id));
  };

  const providerValue = useMemo(
    () => ({
      notifiers,
      addNotifier,
      removeNotifier,
    }),
    [notifiers, addNotifier, removeNotifier],
  );

  return <NotifierContext.Provider value={providerValue}>{children}</NotifierContext.Provider>;
};

export default NotifierContextProvider;
