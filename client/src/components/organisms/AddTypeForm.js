import React, { useState } from 'react';
import { createType } from '../../http/typesAPI';
import Form from '../atoms/Form';
import Input from '../atoms/Input';
import Button from '../atoms/buttons/Button';
import Loader from '../atoms/Loader';

const AddTypeForm = () => {
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const addNewBrand = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createType({ name: type }).then((data) => {
        setLoading(false);
        setType('');
        alert(`Категория "${data.name}" добавлена`);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={addNewBrand}>
      <Input
        label="Наименование категории"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <Button type="submit" disabled={!type || loading}>
        {loading ? <Loader size="small" /> : 'Добавить категорию'}
      </Button>
    </Form>
  );
};

export default AddTypeForm;
