import React, { useEffect, useState, createContext, useMemo } from 'react';
import jwt_decode from 'jwt-decode';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import CHECK_USER from 'graphql/queries/user';

import Loader from 'components/atoms/Loader';
import { authRoutes, publicRoutes, detailsRoutes, SHOP_ROUTE } from 'routes';

export const Context = createContext({});

const App = () => {
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState([]);
  const [brands, setBrands] = useState(true);
  const [types, setTypes] = useState(true);
  const { data, loading } = useQuery(CHECK_USER);

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

  useEffect(() => {
    if (data) {
      const {
        checkUserAccess: { token },
      } = data;

      if (token) setUser(jwt_decode(token));
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Context.Provider value={providerValue}>
      <Switch>
        {user
          ? [...authRoutes(user), ...detailsRoutes].map(({ path, component }) => (
              <Route key={path} path={path} component={component} exact />
            ))
          : [...publicRoutes, ...detailsRoutes].map(({ path, component }) => (
              <Route key={path} path={path} component={component} exact />
            ))}
        <Redirect to={SHOP_ROUTE} />
      </Switch>
    </Context.Provider>
  );
};

export default App;
