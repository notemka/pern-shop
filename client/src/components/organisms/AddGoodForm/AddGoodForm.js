import React, { useEffect, useRef, useState } from 'react';
import useFetchTypesBrands from 'hooks/useFetchTypesBrands';

import CustomSelect from 'components/molecules/CustomSelect';

import { Form, Input } from 'components/atoms/formElements';
import { Button } from 'components/atoms/buttons';
import Loader from 'components/atoms/Loader';
import useGoodActions from 'hooks/useGoodActions';
import GoodInfoFields from './GoodInfoFields';
import FileField from './FileField';

const AddGoodForm = ({ data, isEditMode, refetchUpdatedData }) => {
  const initialFields = {
    name: data?.name || '',
    brandId: data?.brandId,
    typeId: data?.typeId,
    price: data?.price || 0,
    rating: data?.rating || 0,
    img: data?.img || null,
    info: data?.info || [],
  };

  if (isEditMode) {
    initialFields.id = data.id;
  }
  const [goodFields, setGoodFields] = useState(initialFields);
  const { name, brandId, typeId, price, rating, img, info } = goodFields;
  const { brands, types, typesBrandsLoading } = useFetchTypesBrands();
  const fileRef = useRef(null);

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

  const { updateGood, createGood, createLoading, updateLoading } = useGoodActions();
  const isSaving = createLoading || updateLoading;

  const changeFieldValue = (obj) => setGoodFields((fields) => ({ ...fields, ...obj }));

  const onChange = (selectName, value) => {
    const key = selectName === 'brand' ? 'brandId' : 'typeId';
    return changeFieldValue({ [key]: value });
  };

  const resetFields = () => {
    setGoodFields((fields) => {
      const emptyFields = {};

      Object.keys(fields).map((key) => {
        if (key === 'img') {
          fileRef.current.value = initialFields[key];
        }
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

      if (isEditMode) {
        await updateGood({ ...formData, id: initialFields.id });
        await refetchUpdatedData();
      } else {
        await createGood(formData);
      }

      resetFields();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {typesBrandsLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={onSubmit} id="form">
          <CustomSelect
            label="Категория"
            name="category"
            options={types}
            value={type}
            onChange={({ value }) => onChange('category', value)}
            required
          />
          <CustomSelect
            label="Бренд"
            name="brand"
            options={brands}
            value={brand}
            onChange={({ value }) => onChange('brand', value)}
            required
          />

          <Input
            label="Наименование товара"
            onChange={(event) => changeFieldValue({ name: event.target.value })}
            value={name}
            required
          />

          <Input
            type="number"
            label="Цена аренды"
            name="price"
            min="0"
            onChange={(event) => changeFieldValue({ price: event.target.value })}
            value={price}
            required
          />

          <GoodInfoFields goodInfo={info} setGoodFields={setGoodFields} />

          <FileField
            file={img}
            initialImage={initialFields.img}
            changeFieldValue={changeFieldValue}
            customRef={fileRef}
            isEditMode={isEditMode}
          />

          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader size="small" /> : `${isEditMode ? 'Редактировать' : 'Добавить'} товар`}
          </Button>
        </Form>
      )}
    </>
  );
};

export default AddGoodForm;
