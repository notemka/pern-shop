import React, { useEffect, useState } from 'react';
import { createGood, updateGood } from '../../../http/goodAPI';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import Button from '../../atoms/buttons/Button';
import Loader from '../../atoms/Loader';
import CategorySelect from '../../molecules/CategorySelect';
import GoodInfoFields from './GoodInfoFields';
import { useQuery } from '@apollo/client';
import { GET_ALL_TYPES } from '../../../graphql/queries/type';
import { GET_ALL_BRANDS } from '../../../graphql/queries/brand';

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

  const [isSaving, setIsSaving] = useState(false);
  const [goodFields, setGoodFields] = useState(initialFields);
  const { name, brand, type, price, file, info } = goodFields;
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const { data: typesData, loading: typesLoading } = useQuery(GET_ALL_TYPES);
  const { data: brandsData, loading: brandsLoading } = useQuery(GET_ALL_BRANDS);

  useEffect(() => {
    if (!typesLoading && !brandsLoading) {
      setTypes(typesData.getAllTypes);
      setBrands(brandsData.getAllBrands);
    }
  }, []);

  const changeFieldValue = (obj) =>
    setGoodFields((fields) => ({ ...fields, ...obj }));

  const onChange = (selectName, option) => {
    if (selectName === 'brands') {
      return changeFieldValue({ brand: option });
    }
    return changeFieldValue({ type: option });
  };

  const onFileChange = (event) =>
    changeFieldValue({ file: event.target.files[0] });

  const addProperty = () => {
    setGoodFields((fields) => ({
      ...fields,
      info: [...fields.info, { id: Date.now(), title: '', description: '' }],
    }));
  };

  const changeProperty = (key, value, id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.map((info) =>
        info.id === id ? { ...info, [key]: value } : info
      ),
    }));
  };

  const removeProperty = (id) => {
    setGoodFields((fields) => ({
      ...fields,
      info: fields.info.filter((info) => info.id !== id),
    }));
  };

  const resetFields = () => {
    setIsSaving(false);
    setGoodFields((fields) => {
      let emptyFields = {};

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
      {typesLoading && brandsLoading ? (
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
            onChange={(event) =>
              changeFieldValue({ price: event.target.value })
            }
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
            {isSaving ? (
              <Loader size="small" />
            ) : (
              `${isEditMode ? 'Редактировать' : 'Добавить'} товар`
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default AddGoodForm;
