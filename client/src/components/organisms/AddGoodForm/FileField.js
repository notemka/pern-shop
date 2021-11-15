import React from 'react';
import styled, { css } from 'styled-components';

import { Input } from 'components/atoms/formElements';
import { ButtonAsLink } from 'components/atoms/buttons';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  padding: 15px;
  border: 2px solid var(--border-color);
`;

const Photo = styled.figure(
  () => css`
    display: flex;
    flex-direction: column;
    width: 150px;
    margin: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
);

const buttonStyles = () => css`
  margin: 10px 0;
`;

const FileField = ({ isEditMode, file, initialImage, changeFieldValue, customRef }) => {
  const onFileChange = (event) => {
    changeFieldValue({ img: event.target.files[0] });
  };
  const isImageChanged = typeof file === 'object';
  const isImageNotChanged = typeof file === 'string' || typeof file === 'undefined';

  const resetField = () => {
    customRef.current.value = null;
    if (initialImage) {
      changeFieldValue({ img: initialImage });
    }
  };

  return (
    <Wrapper>
      <Input
        type="file"
        customRef={customRef}
        label="Изображение"
        onChange={onFileChange}
        required={!isEditMode}
        accept="image/*"
        additionalElement={
          isEditMode &&
          isImageChanged && (
            <ButtonAsLink customStyles={buttonStyles} onClick={resetField}>
              Удалить выбранный файл
            </ButtonAsLink>
          )
        }
      />

      {isEditMode && isImageNotChanged && (
        <Photo>
          <img src={process.env.REACT_APP_API_URL + initialImage} alt="товар" />
        </Photo>
      )}
    </Wrapper>
  );
};

export default FileField;
