import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TYPES } from 'graphql/queries/type';
import { GET_ALL_BRANDS } from 'graphql/queries/brand';

const useFetchTypesBrands = () => {
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const { data: typesData, loading: typesLoading } = useQuery(GET_ALL_TYPES);
  const { data: brandsData, loading: brandsLoading } = useQuery(GET_ALL_BRANDS);
  const typesBrandsLoading = typesLoading && brandsLoading;

  useEffect(() => {
    if (!typesLoading && !brandsLoading) {
      setTypes(typesData.getAllTypes);
      setBrands(brandsData.getAllBrands);
    }
  }, [typesData, brandsData, typesLoading, brandsLoading]);

  return { brands, types, typesBrandsLoading };
};

export default useFetchTypesBrands;
