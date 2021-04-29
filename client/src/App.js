import { useQuery } from '@apollo/client';
import { useEffect, useState, createContext, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from './components/atoms/Loader';
import { check } from './http/userAPI';
import { CHECK_USER } from './graphql/queries/user';
import { authRoutes, publicRoutes, detailsRoutes, SHOP_ROUTE } from './routes';

export const Context = createContext({});

const App = () => {
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState([]);
  const [brands, setBrands] = useState(true);
  const [types, setTypes] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [getUser, { data, loading }] = useQuery(CHECK_USER.checkUserAccess);

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
    console.log(user);
    // if (!loading) {
    //   const checkUser = async () => {
    //     const data = await getUser({
    //       variables: {
    //         id: user.me.id,
    //         email: user.me.email,
    //         role: user.me.role,
    //       },
    //     });
    //     console.log(data);
    //     setUser(data.checkUserAccess);
    //   };
    //   checkUser();
    // }
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
