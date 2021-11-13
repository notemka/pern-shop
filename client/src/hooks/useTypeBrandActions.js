import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_BRAND, UPDATE_BRAND } from 'graphql/mutations/brand';
import { DELETE_TYPE, UPDATE_TYPE } from 'graphql/mutations/type';

import { NotifierContext } from 'contexts/NotifierContext';
import { CATEGORY } from 'constants/goodFilters';

const useTypeBrandActions = (listName) => {
  const isType = listName === CATEGORY;
  const deleteMutation = isType ? DELETE_TYPE : DELETE_BRAND;
  const updateMutation = isType ? UPDATE_TYPE : UPDATE_BRAND;
  const [deleteItem, { loading: deleteLoading }] = useMutation(deleteMutation);
  const [updateItem, { loading: updateLoading }] = useMutation(updateMutation);
  const { addNotifier } = useContext(NotifierContext);

  const removeItem = async (id) => {
    try {
      await deleteItem({ variables: { id } });
      if (!deleteLoading) {
        const msg = isType ? `${listName} успешно удалена!` : `${listName} успешно удален!`;
        addNotifier({ text: msg });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  const editItem = async (data) => {
    try {
      await updateItem({ variables: data });
      if (!updateLoading) {
        const msg = isType ? `${listName} успешно изменена!` : `${listName} успешно изменен!`;
        addNotifier({ text: msg });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  return { removeItem, editItem };
};

export default useTypeBrandActions;
