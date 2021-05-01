import React, { useEffect, useState } from 'react';
import { createGood, updateGood } from 'http/goodAPI';
import { fetchBrands } from 'http/brandsAPI';
import { fetchTypes } from 'http/typesAPI';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/buttons/Button';
import Loader from 'components/atoms/Loader';
import CategorySelect from 'components/molecules/CategorySelect';
import GoodInfoFields from './GoodInfoFields';

const AddGoodForm = ({ data, isEditMode }) => {
  console.log(data);

  const initialFields = {
    name: data?.name || '',
    brand: data?.brandId || '',
    type: data?.typeId || '',
    price: data?.price || 0,
    file: data?.img || '',
    info: data?.info || [],
  };

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [goodFields, setGoodFields] = useState(initialFields);
  const { name, brand, type, price, file, info } = goodFields;
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const loadTypesBrands = async () => {
      const brandsData = await fetchBrands();
      const typesData = await fetchTypes();
      setBrands(brandsData);
      setTypes(typesData);
    };
    loadTypesBrands();
    setLoading(false);
  }, []);

  const changeFieldValue = (obj) => setGoodFields((fields) => ({ ...fields, ...obj }));

  const onChange = (selectName, option) => {
    if (selectName === 'brands') {
      return changeFieldValue({ brand: option });
    }
    return changeFieldValue({ type: option });
  };

  const onFileChange = (event) => changeFieldValue({ file: event.target.files[0] });

  const addProperty = () => {
    setGoodFields((fields) => ({
      ...fields,
      info: [...fields.info, { id: Date.now(), title: '', description: '' }],
    }));
  };

  const changeProperty = (key, value, id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
  };

  const removeProperty = (id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.filter((item) => item.id !== id),
    }));
  };

  const resetFields = () => {
    setIsSaving(false);
    setGoodFields((fields) => {
      const emptyFields = {};

      Object.keys(fields).map((key) => {
        emptyFields[key] = initialFields[key];
        return key;
      });

      return { ...fields, ...emptyFields };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('brandId', brand.id);
      formData.append('typeId', type.id);
      formData.append('price', price);
      formData.append('img', file);
      formData.append('info', JSON.stringify(info));

      setIsSaving(true);
      let goodData;
      let message;

      if (isEditMode) {
        goodData = await updateGood(formData);
        message = `Товар ${goodData.name} обнавлен`;
      } else {
        goodData = await createGood(formData);
        message = `Новый товар ${goodData.name} добавлен`;
      }

      resetFields();
      alert(message);
      setIsSaving(false);
    } catch (error) {
      console.error(error.message);
      setIsSaving(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={onSubmit}>
          <CategorySelect
            label="Категории"
            name="categories"
            options={types}
            onChange={(option) => onChange('categories', option)}
          />
          <CategorySelect
            label="Бренды"
            name="brands"
            options={brands}
            onChange={(option) => onChange('brands', option)}
          />

          <Input
            label="Наименование товара"
            onChange={(event) => changeFieldValue({ name: event.target.value })}
            value={name}
          />

          <Input
            type="number"
            label="Цена аренды"
            name="price"
            onChange={(event) => changeFieldValue({ price: event.target.value })}
            value={price}
          />

          <GoodInfoFields
            goodInfo={info}
            addProperty={addProperty}
            changeProperty={changeProperty}
            removeProperty={removeProperty}
          />

          <Input type="file" label="Изображение" onChange={onFileChange} />

          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader size="small" /> : `${isEditMode ? 'Редактировать' : 'Добавить'} товар`}
          </Button>
        </Form>
      )}
    </>
  );
};

export default AddGoodForm;
