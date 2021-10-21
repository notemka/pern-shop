import React, { useContext, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { useQuery } from '@apollo/client';
import CHECK_USER from 'graphql/queries/user';

import { AppContext } from 'contexts';
import Loader from 'components/atoms/Loader';
import { authRoutes, publicRoutes, SHOP_ROUTE } from '.';

const ContextRoutes = () => {
  const { data, loading } = useQuery(CHECK_USER);
  const { user, setUser } = useContext(AppContext);

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
    <Switch>
      {user
        ? authRoutes(user).map(({ path, component }) => <Route key={path} path={path} component={component} exact />)
        : publicRoutes.map(({ path, component }) => <Route key={path} path={path} component={component} exact />)}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};

export default ContextRoutes;
