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
    brandId: data?.brandId,
    typeId: data?.typeId,
    price: data?.price || 0,
    rating: data?.rating || 0,
    img: data?.img || {},
    info: data?.info || [],
  };

  if (isEditMode) {
    initialFields.id = data.id;
  }
  const [goodFields, setGoodFields] = useState(initialFields);
  const { name, brandId, typeId, price, rating, img, info } = goodFields;
  const { brands, types, typesBrandsLoading } = useFetchTypesBrands();

  const [brand, setBrand] = useState({});
  const [type, setType] = useState({});

  useEffect(() => {
    if (isEditMode) {
      setType(types.find(({ value }) => value === typeId));
      setBrand(brands.find(({ value }) => value === brandId));
    } else {
      setType(types[0]);
      setBrand(brands[0]);
    }
  }, [isEditMode, types, brands]);

  const [createGood, { loading: createLoading }] = useMutation(CREATE_GOOD);
  const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_GOOD);
  const isSaving = createLoading || updateLoading;

  const changeFieldValue = (obj) => setGoodFields((fields) => ({ ...fields, ...obj }));

  const onChange = (selectName, value) => {
    const key = selectName === 'brands' ? 'brandId' : 'typeId';
    return changeFieldValue({ [key]: value });
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
        brandId: brandId || brand.value,
        typeId: typeId || type.value,
        price: +price,
        rating: +rating || 0,
        img,
        info: info.map(({ __typename, ...rest }) => ({ ...rest })),
      };

      const message = isEditMode ? `Товар ${name} обнавлен` : `Новый товар ${name} добавлен`;

      if (isEditMode) {
        await updateGood({ variables: { ...formData, id: initialFields.id } });
      } else {
        await createGood({ variables: formData });
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
            value={type}
            onChange={({ value }) => onChange('categories', value)}
          />
          <CategorySelect
            label="Бренды"
            name="brands"
            options={brands}
            value={brand}
            onChange={({ value }) => onChange('brands', value)}
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
