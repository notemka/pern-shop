import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_GOOD, UPDATE_GOOD } from 'graphql/mutations/good';
import useFetchTypesBrands from 'hooks/useFetchTypesBrands';

import CategorySelect from 'components/molecules/CategorySelect';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/buttons/Button';
import Loader from 'components/atoms/Loader';
import GoodInfoFields from './GoodInfoFields';

const AddGoodForm = ({ data, isEditMode }) => {
  const initialFields = {
    name: data?.name || '',
    brand: data?.brandId || '',
    type: data?.typeId || '',
    price: data?.price || 0,
    rating: data?.rating || 0,
    img: data?.img || {},
    info: data?.info || [],
  };

  if (isEditMode) {
    initialFields.id = data.id;
  }
  const [goodFields, setGoodFields] = useState(initialFields);
  const { name, brand, type, price, rating, img, info } = goodFields;
  const { brands, types, typesBrandsLoading } = useFetchTypesBrands();

  const [brandValue, setBrandValue] = useState(brands[0]);
  const [typeValue, setTypeValue] = useState(types[0]);

  useEffect(() => {
    if (isEditMode) {
      setTypeValue(types.find(({ id }) => id === goodFields.type));
      setBrandValue(brands.find(({ id }) => id === goodFields.brand));
    }
  }, [isEditMode, types, brands, goodFields]);

  const [createGood, { loading: createLoading }] = useMutation(CREATE_GOOD);
  const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_GOOD);
  const isSaving = createLoading || updateLoading;

  const changeFieldValue = (obj) => setGoodFields((fields) => ({ ...fields, ...obj }));

  const onChange = (selectName, option) => {
    if (selectName === 'brands') {
      return changeFieldValue({ brand: option });
    }
    return changeFieldValue({ type: option });
  };

  const onFileChange = (event) => changeFieldValue({ img: event.target.files[0] });

  const addProperty = () => {
    setGoodFields((fields) => ({
      ...fields,
      info: [...fields.info, { id: Date.now(), title: '', description: '' }],
    }));
  };

  const changeProperty = (key, value, id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.map((infoData) => (infoData.id === id ? { ...infoData, [key]: value } : infoData)),
    }));
  };

  const removeProperty = (id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.filter((infoData) => infoData.id !== id),
    }));
  };

  const resetFields = () => {
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
      const formData = {
        name,
        brandId: brand.id,
        typeId: type.id,
        price: +price,
        rating: +rating || 0,
        img,
        info: JSON.stringify(info),
      };

      let message;

      if (isEditMode) {
        await updateGood({
          variables: { ...formData, id: initialFields.id },
        });
        message = `Товар ${name} обнавлен`;
      } else {
        await createGood({ variables: formData });
        message = `Новый товар ${name} добавлен`;
      }

      resetFields();
      alert(message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {typesBrandsLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={onSubmit}>
          <CategorySelect
            label="Категории"
            name="categories"
            options={types}
            value={typeValue}
            onChange={(option) => onChange('categories', option)}
          />
          <CategorySelect
            label="Бренды"
            name="brands"
            options={brands}
            value={brandValue}
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
            min="0"
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
