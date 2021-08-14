import { useMutation } from '@apollo/client';
import { DELETE_GOOD, UPDATE_GOOD } from 'graphql/mutations/good';
import { ADD_TO_BASKET } from 'graphql/mutations/basket';
import { GET_ALL_GOODS } from 'graphql/queries/goods';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from 'routes';

const useGoodActions = () => {
  const mutationOptions = { refetchQueries: [{ query: GET_ALL_GOODS }] };
  const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_GOOD, mutationOptions);
  const [deleteGood, { loading: deleteLoading }] = useMutation(DELETE_GOOD, mutationOptions);
  const { push } = useHistory();
  const [addToBasket, { loading: basketLoading }] = useMutation(ADD_TO_BASKET);

  const editGood = async (data) => {
    try {
      await updateGood({ variables: data });
      if (!updateLoading) {
        alert('Товар успешно изменен!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeGood = async (id) => {
    try {
      await deleteGood({ variables: { id } });
      if (!deleteLoading) {
        push(SHOP_ROUTE);
        alert('Товар успешно удален!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addGoodToBasket = async (id) => {
    try {
      await addToBasket({ variables: { id } });
      if (!basketLoading) {
        alert('Товар успешно добавлен в корзину!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    editGood,
    removeGood,
    addGoodToBasket,
  };
};

export default useGoodActions;
