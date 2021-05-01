import React from 'react';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from 'routes';

const Logo = () => (
  <NavLink to={SHOP_ROUTE}>
    <span>Бумеранг</span>
  </NavLink>
);

export default Logo;
