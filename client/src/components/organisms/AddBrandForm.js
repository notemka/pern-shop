import React, { useState } from 'react';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/buttons/Button';
import Loader from 'components/atoms/Loader';
import { useMutation } from '@apollo/client';
import { CREATE_BRAND } from '../../graphql/mutations/brand';

const AddBrandForm = () => {
  const [brand, setBrand] = useState('');
  const [createBrand, { loading }] = useMutation(CREATE_BRAND);

  const addNewBrand = async (e) => {
    e.preventDefault();

    try {
      await createBrand({ variables: { name: brand } });
      if (!loading) {
        setBrand('');
        alert(`Новый бренд ${brand} добавлен`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={addNewBrand}>
      <Input label="Наименование бренда" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <Button type="submit" disabled={!brand || loading}>
        {loading ? <Loader size="small" /> : 'Добавить бренд'}
      </Button>
    </Form>
  );
};

export default AddBrandForm;
