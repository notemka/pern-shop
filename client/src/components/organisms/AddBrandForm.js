import React, { useState } from 'react';
import { createBrand } from 'http/brandsAPI';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/buttons/Button';
import Loader from 'components/atoms/Loader';

const AddBrandForm = () => {
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);

  const addNewBrand = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBrand({ name: brand }).then((data) => {
        setLoading(false);
        setBrand('');
        alert(`Новый бренд ${data.name} добавлен`);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={addNewBrand}>
      <Input
        label="Наименование бренда"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <Button type="submit" disabled={!brand || loading}>
        {loading ? <Loader size="small" /> : 'Добавить бренд'}
      </Button>
    </Form>
  );
};

export default AddBrandForm;
