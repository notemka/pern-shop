import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import RoundButton from '../components/atoms/buttons/RoundButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/atoms/Loader';
import MainTemplate from '../components/templates/MainTemplate';
import breakpoints from '../styles/breakpoints';

import { useQuery } from '@apollo/client';
import { GET_ALL_BRANDS } from '../graphql/queries/brand';
import { GET_ALL_TYPES } from '../graphql/queries/type';
import useTypeBrandActions from '../hooks/useTypeBrandActions';

const List = styled.ul`
  max-width: 900px;
  margin: auto;
  list-style: none;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: var(--second-color);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: ${breakpoints.screenMd}) {
    grid-template-columns: 1fr;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const AdminPanelList = () => {
  const { list } = useParams();
  const isTypesList = list === 'types';
  const listItemName = isTypesList ? 'Категория' : 'Бренд';
  const listName = isTypesList ? 'Категории' : 'Бренды';
  const [dataList, setDataList] = useState([]);
  const fetchQuery = isTypesList ? GET_ALL_TYPES : GET_ALL_BRANDS;
  const { data, loading } = useQuery(fetchQuery);
  const { editItem, removeItem } = useTypeBrandActions(listItemName);

  useEffect(() => {
    if (!loading) {
      setDataList(isTypesList ? data.getAllTypes : data.getAllBrands);
    }
  }, []);

  return (
    <MainTemplate>
      <div>
        <h1>{listName}</h1>
        {loading ? (
          <Loader />
        ) : (
          <List>
            {dataList.map(({ id, name }) => {
              return (
                <Item key={id}>
                  <span>{name}</span>

                  <Actions>
                    <RoundButton
                      title="Редактировать"
                      onClick={() => editItem({ id, name })}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </RoundButton>
                    <RoundButton title="Удалить" onClick={() => removeItem(id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </RoundButton>
                  </Actions>
                </Item>
              );
            })}
          </List>
        )}
      </div>
    </MainTemplate>
  );
};

export default AdminPanelList;
