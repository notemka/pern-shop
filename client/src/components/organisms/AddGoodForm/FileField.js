import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Input } from 'components/atoms/formElements';
import RoundButton from 'components/atoms/buttons/RoundButton';

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
  /* position: absolute;
  top: -17.5px;
  right: 5px; */
`;

const FileField = ({ isEditMode, file, initialImage, changeFieldValue, customRef }) => {
  const onFileChange = (event) => {
    changeFieldValue({ img: event.target.files[0] });
  };
  const isImageChanged = typeof file === 'object';
  const isImageNotChanged = typeof file === 'string' || typeof file === 'undefined';

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
            <RoundButton customStyles={buttonStyles}>
              <FontAwesomeIcon icon={faTrash} />
            </RoundButton>
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
