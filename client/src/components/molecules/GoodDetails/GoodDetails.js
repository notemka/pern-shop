import React, { useState } from 'react';
import styled from 'styled-components';
import AddGoodForm from '../../organisms/AddGoodForm';
import GoodActions from './GoodActions';
import GoodContainer from './GoodContainer';

const FormWrapper = styled.div`
  background-color: var(--second-color);
`;

const GoodDetails = ({ good }) => {
  const { id, name } = good;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <article data-testid="test-good-details">
      <h1>{isEditMode ? 'Редактирование товара' : name}</h1>
      <GoodActions
        goodId={id}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />

      {isEditMode ? (
        <FormWrapper>
          <AddGoodForm data={good} />
        </FormWrapper>
      ) : (
        <GoodContainer good={good} />
      )}
    </article>
  );
};

export default GoodDetails;
