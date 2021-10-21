import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FieldWrapper, Input } from 'components/atoms/formElements';
import { Button, RoundButton } from 'components/atoms/buttons';

const StyledButton = styled(Button)`
  margin-bottom: 20px;

  span {
    margin-left: 5px;
  }
`;

const Fieldset = styled.fieldset`
  position: relative;
  margin-bottom: 20px;
  padding: 15px;
  border-color: var(--border-color);
`;

const DeleteButton = styled(RoundButton)`
  position: absolute;
  top: -17.55px;
  right: 5px;
`;

const GoodInfoFields = ({ goodInfo, setGoodFields }) => {
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
  return (
    <FieldWrapper>
      <StyledButton title="Добавить свойство" onClick={addProperty}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Добавить свойство</span>
      </StyledButton>

      {goodInfo.map(({ id, title, description }) => (
        <Fieldset key={id}>
          <DeleteButton title="Удалить свойство" aria-label="Удалить свойство" onClick={() => removeProperty(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </DeleteButton>

          <Input
            label="Наименование свойства"
            name="info-title"
            onChange={(event) => changeProperty('title', event.target.value, id)}
            value={title}
            required
          />
          <Input
            label="Значение свойства"
            name="info-description"
            onChange={(event) => changeProperty('description', event.target.value, id)}
            value={description}
            required
          />
        </Fieldset>
      ))}
    </FieldWrapper>
  );
};

export default GoodInfoFields;
