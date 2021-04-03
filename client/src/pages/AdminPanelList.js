import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import RoundButton from '../components/atoms/buttons/RoundButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/atoms/Loader';
import MainTemplate from '../components/templates/MainTemplate';
import { deleteBrand, fetchBrands } from '../http/brandsAPI';
import { deleteType, fetchTypes } from '../http/typesAPI';
import breakpoints from '../styles/breakpoints';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let data = [];
      if (isTypesList) {
        data = await fetchTypes();
      } else {
        data = await fetchBrands();
      }

      setDataList(data);
      setLoading(false);
    };
    fetchData();
  }, [isTypesList]);

  const editItem = async (id) => {};

  const deleteItem = async (id) => {
    try {
      if (isTypesList) {
        await deleteType(id);
      } else {
        await deleteBrand(id);
      }
      alert(`${listItemName} успешно удален!`);
    } catch (error) {
      console.log(error.message);
    }
  };

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
                      onClick={() => editItem(id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </RoundButton>
                    <RoundButton title="Удалить" onClick={() => deleteItem(id)}>
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
