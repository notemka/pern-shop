import React from 'react';
import { useParams } from 'react-router-dom';

import MainTemplate from 'components/templates/MainTemplate';
import AdminList from 'components/organisms/AdminList';

const AdminPanelList = () => {
  const { list } = useParams();
  const isTypesList = list === 'types';
  const listName = isTypesList ? 'Категории' : 'Бренды';

  return (
    <MainTemplate>
      <div>
        <h1>{listName}</h1>
        <AdminList isTypesList={isTypesList} />
      </div>
    </MainTemplate>
  );
};

export default AdminPanelList;
