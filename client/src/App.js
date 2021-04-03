import { useEffect, useState, createContext, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from './components/atoms/Loader';
import { check } from './http/userAPI';
import { authRoutes, publicRoutes, detailsRoutes, SHOP_ROUTE } from './routes';

export const Context = createContext({});

const App = () => {
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState([]);
  const [brands, setBrands] = useState(true);
  const [types, setTypes] = useState(true);
  const [loading, setLoading] = useState(true);

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
    [user, setUser, goods, setGoods, brands, setBrands, types, setTypes]
  );

  useEffect(() => {
    const checkUser = async () => {
      const data = await check();
      setUser(data);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Context.Provider value={providerValue}>
      <Switch>
        {user
          ? [
              ...authRoutes(user),
              ...detailsRoutes,
            ].map(({ path, component }) => (
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
