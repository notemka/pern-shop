import Good from './pages/Good';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import Goods from './pages/Goods';
import Admin from './pages/Admin';
import Favorites from './pages/Favorites';
import AdminPanelList from './pages/AdminPanelList';

export const REGISTRATION_ROUTE = '/registration';
export const LOGIN_ROUTE = '/login';
export const ADMIN_ROUTE = '/admin';
export const SHOP_ROUTE = '/';
export const GOOD_ROUTE = '/goods';
export const BASKET_ROUTE = '/basket';
export const FAVORITES_ROUTE = '/favorites';

const commonRoutes = [
  {
    title: 'Товары',
    path: SHOP_ROUTE,
    component: Goods,
  },
];

export const detailsRoutes = [
  {
    title: 'Товар',
    path: `${GOOD_ROUTE}/:id`,
    component: Good,
  },
  {
    title: 'Список',
    path: `${ADMIN_ROUTE}/:list`,
    component: AdminPanelList,
  },
];

export const userRoutes = [
  ...commonRoutes,
  {
    title: 'Корзина',
    path: BASKET_ROUTE,
    component: Basket,
  },
  {
    title: 'Избранное',
    path: FAVORITES_ROUTE,
    component: Favorites,
  },
];

export const adminRoutes = [
  ...userRoutes,
  {
    title: 'Админка',
    path: ADMIN_ROUTE,
    component: Admin,
  },
];

export const authRoutes = (user) =>
  user?.role === 'ADMIN' ? adminRoutes : userRoutes;

export const publicRoutes = [
  ...commonRoutes,
  {
    title: 'Регистрация',
    path: REGISTRATION_ROUTE,
    component: Auth,
  },
  {
    title: 'Вход',
    path: LOGIN_ROUTE,
    component: Auth,
  },
];
