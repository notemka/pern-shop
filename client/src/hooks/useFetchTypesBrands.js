import { useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_ALL_TYPES from 'graphql/queries/type';
import GET_ALL_BRANDS from 'graphql/queries/brand';

const useFetchTypesBrands = () => {
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  const onCompletedTypesLoading = (data) => {
    const typeDataForSelect = data?.getAllTypes?.map(({ id, name }) => ({ label: name, value: id }));
    setTypes(typeDataForSelect);
  };

  const onCompletedBrandsLoading = (data) => {
    const brandDataForSelect = data?.getAllBrands?.map(({ id, name }) => ({ label: name, value: id }));
    setBrands(brandDataForSelect);
  };

  const { loading: typesLoading } = useQuery(GET_ALL_TYPES, { onCompleted: onCompletedTypesLoading });
  const { loading: brandsLoading } = useQuery(GET_ALL_BRANDS, { onCompleted: onCompletedBrandsLoading });
  const typesBrandsLoading = typesLoading && brandsLoading;

  return { brands, types, typesBrandsLoading };
};

export default useFetchTypesBrands;
