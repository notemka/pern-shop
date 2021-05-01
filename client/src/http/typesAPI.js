import { $authHost, $host } from '.';

export const fetchTypes = async () => {
  const { data } = await $host.get('api/types');
  return data;
};

export const createType = async (type) => {
  const { data } = await $authHost.post('api/types', type);
  return data;
};

export const deleteType = async (id) => {
  const { data } = await $authHost.delete(`api/types/${id}`);
  return data;
};
