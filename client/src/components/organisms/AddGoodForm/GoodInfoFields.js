import React from 'react';
import FieldWrapper from 'components/molecules/FieldWrapper';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/buttons/Button';
import RoundButton from 'components/molecules/buttons/RoundButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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

const GoodInfoFields = ({ goodInfo, addProperty, changeProperty, removeProperty }) => (
  <FieldWrapper>
    <StyledButton title="Добавить свойство" onClick={addProperty}>
      <FontAwesomeIcon icon={faPlus} />
      <span>Добавить свойство</span>
    </StyledButton>

    {goodInfo.map(({ id, title, description }) => (
      <Fieldset key={id}>
        <Input
          label="Наименование свойства"
          name="info-title"
          onChange={(event) => changeProperty('title', event.target.value, id)}
          value={title}
        />
        <Input
          label="Значение свойства"
          name="info-description"
          onChange={(event) => changeProperty('description', event.target.value, id)}
          value={description}
        />
        <DeleteButton title="Удалить свойство" aria-label="Удалить свойство" onClick={() => removeProperty(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteButton>
      </Fieldset>
    ))}
  </FieldWrapper>
);

export default GoodInfoFields;
