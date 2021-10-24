import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BRAND } from 'graphql/mutations/brand';

import { NotifierContext } from 'contexts/NotifierContext';

import { Form, Input } from 'components/atoms/formElements';
import { Button } from 'components/atoms/buttons';
import Loader from 'components/atoms/Loader';

const AddBrandForm = () => {
  const [brand, setBrand] = useState('');
  const [createBrand, { loading }] = useMutation(CREATE_BRAND);
  const { addNotifier } = useContext(NotifierContext);

  const addNewBrand = async (e) => {
    e.preventDefault();

    try {
      await createBrand({ variables: { name: brand } });
      if (!loading) {
        setBrand('');
        addNotifier({ text: `Новый бренд ${brand} добавлен` });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  return (
    <Form onSubmit={addNewBrand}>
      <Input label="Наименование бренда" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      <Button type="submit" disabled={!brand || loading}>
        {loading ? <Loader size="small" /> : 'Добавить бренд'}
      </Button>
    </Form>
  );
};

export default AddBrandForm;
