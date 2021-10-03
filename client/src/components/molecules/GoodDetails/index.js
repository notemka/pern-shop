import React, { useState } from 'react';
import styled from 'styled-components';
import AddGoodForm from '../../organisms/AddGoodForm';
import GoodActions from './GoodActions';
import GoodContainer from './GoodContainer';

const FormWrapper = styled.div`
  background-color: var(--second-color);
`;

const GoodDetails = ({ good, refetch }) => {
  const { id, name } = good;
  const [isEditMode, setIsEditMode] = useState(false);

  const refetchUpdatedData = async () => {
    await refetch();
    setIsEditMode(false);
  };

  return (
    <article data-testid="test-good-details">
      <h1>{isEditMode ? 'Редактирование товара' : name}</h1>
      <GoodActions goodId={id} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

      {isEditMode ? (
        <FormWrapper>
          <AddGoodForm data={good} isEditMode={isEditMode} refetchUpdatedData={refetchUpdatedData} />
        </FormWrapper>
      ) : (
        <GoodContainer good={good} />
      )}
    </article>
  );
};

export default GoodDetails;
