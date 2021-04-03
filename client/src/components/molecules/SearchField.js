import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(Input)`
  width: 100%;
  margin-bottom: 0;

  input {
    height: 38px;
  }
`;

const SearchField = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onHandleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="search"
        name="search"
        value={searchQuery}
        onChange={onHandleChange}
        placeholder="Введите, например: торцовочная пила"
      />
      <FontAwesomeIcon icon={faSearch} />
    </SearchWrapper>
  );
};

export default SearchField;
