import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SEARCH_SOME_GOODS } from 'graphql/queries/goods';
import debounce from 'lodash.debounce';
import Input from 'components/atoms/Input';

const fieldWrapperCustomStyles = () => css`
  position: relative;
  width: 100%;
  margin-bottom: 0;

  input {
    padding-right: 36px;

    &:focus + svg > path {
      fill: var(--primary-color);
    }

    &::-ms-clear,
    &::-webkit-search-cancel-button {
      color: var(--primary-color);
    }
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
`;

const SearchField = ({ setFilteredGoods }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onCompleted = (data) => {
    if (data?.querySearch) {
      setFilteredGoods(data.querySearch);
    }
  };

  const [searchByQuery] = useLazyQuery(SEARCH_SOME_GOODS, { onCompleted });
  const getGoodsBySearchQuery = useCallback(
    debounce((query) => searchByQuery({ variables: { query } }), 250),
    [],
  );
  useEffect(() => {
    getGoodsBySearchQuery(searchQuery);
  }, [searchQuery]);

  const onChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Input
        type="search"
        name="search"
        value={searchQuery}
        onChange={onChange}
        placeholder="Введите, например: торцовочная пила"
        icon={<StyledIcon icon={faSearch} />}
        customStyles={fieldWrapperCustomStyles}
      />
    </>
  );
};

export default SearchField;
