import { useMutation } from '@apollo/client';
import { DELETE_BRAND, UPDATE_BRAND } from '../graphql/mutations/brand';
import { DELETE_TYPE, UPDATE_TYPE } from '../graphql/mutations/type';

const useTypeBrandActions = (listName) => {
  const isType = listName == 'Категория';
  const deleteMutation = isType ? DELETE_TYPE : DELETE_BRAND;
  const updateMutation = isType ? UPDATE_TYPE : UPDATE_BRAND;
  const [deleteItem, { loading: deleteLoading }] = useMutation(deleteMutation);
  const [updateItem, { loading: updateLoading }] = useMutation(updateMutation);

  const removeItem = async (id) => {
    try {
      await deleteItem({ variables: { id } });
      if (!deleteLoading) {
        const msg = isType
          ? `${listName} успешно удалена!`
          : `${listName} успешно удален!`;
        alert(msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editItem = async (data) => {
    try {
      await updateItem({ variables: data });
      if (!updateLoading) {
        const msg = isType
          ? `${listName} успешно изменена!`
          : `${listName} успешно изменен!`;
        alert(msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return { removeItem, editItem };
};

export default useTypeBrandActions;
