import { $authHost, $host } from '.';

export const fetchGoods = async () => {
  // запрос возвращает ответ с количеством всех элементов (count) и массивом всех элементов (rows)
  const { data } = await $host.get('api/goods');
  return data;
};

export const fetchOneGood = async (id) => {
  const { data } = await $host.get(`api/goods/${id}`);
  return data;
};

export const createGood = async (good) => {
  const { data } = await $authHost.post('api/goods', good);
  return data;
};

export const updateGood = async (id, updatedGood) => {
  const { data } = await $authHost.put(`api/goods/${id}`, updatedGood);
  return data;
};

export const deleteGood = async (id) => {
  const { data } = await $authHost.delete(`api/goods/${id}`);
  return data;
};
