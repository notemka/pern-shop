import { $authHost } from '.';

export const fetchBasketGoods = async () => {
  const { data } = await $authHost.get('api/basket');
  return data;
};

export const addGoodToBasket = async (id) => {
  const { data } = await $authHost.post('api/basket/' + id);
  return data;
};

export const deleteBasketGood = async (id) => {
  const { data } = await $authHost.delete('api/basket/' + id);
  return data;
};
