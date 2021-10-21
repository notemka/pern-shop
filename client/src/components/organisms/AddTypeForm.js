import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TYPE } from 'graphql/mutations/type';

import { Form, Input } from 'components/atoms/formElements';
import { Button } from 'components/atoms/buttons';
import Loader from 'components/atoms/Loader';

const AddTypeForm = () => {
  const [type, setType] = useState('');
  const [createType, { loading }] = useMutation(CREATE_TYPE);

  const addNewType = async (e) => {
    e.preventDefault();

    try {
      await createType({ variables: { name: type } });
      if (!loading) {
        setType('');
        alert(`Новый бренд ${type} добавлен`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={addNewType}>
      <Input label="Наименование категории" value={type} onChange={(e) => setType(e.target.value)} required />
      <Button type="submit" disabled={!type || loading}>
        {loading ? <Loader size="small" /> : 'Добавить категорию'}
      </Button>
    </Form>
  );
};

export default AddTypeForm;
