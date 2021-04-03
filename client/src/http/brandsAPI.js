import { $authHost, $host } from '.';

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brands');
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brands', brand);
  return data;
};

export const deleteBrand = async (id) => {
  const { data } = await $authHost.delete('api/brands/' + id);
  return data;
};
