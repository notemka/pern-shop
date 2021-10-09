import { useMutation } from '@apollo/client';
import { CREATE_GOOD, UPDATE_GOOD, DELETE_GOOD } from 'graphql/mutations/good';
import { ADD_TO_BASKET, DELETE_FROM_BASKET } from 'graphql/mutations/basket';
import { GET_ALL_GOODS } from 'graphql/queries/goods';

import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from 'routes';

const useGoodActions = () => {
  const mutationOptions = { refetchQueries: [{ query: GET_ALL_GOODS }] };
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_GOOD);
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_GOOD, mutationOptions);
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_GOOD, mutationOptions);

  const [addToBasket, { loading: basketLoading }] = useMutation(ADD_TO_BASKET);
  const [deleteFromBasketMutation, { loading: deleteFromBasketLoading }] = useMutation(DELETE_FROM_BASKET);
  const { push } = useHistory();

  const createGood = async (data) => {
    try {
      await createMutation({ variables: data });
      if (!updateLoading) {
        alert('Товар успешно создан!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateGood = async (data) => {
    try {
      await updateMutation({ variables: data });
      if (!updateLoading) {
        alert('Товар успешно обновлен!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeGood = async (id) => {
    try {
      await deleteMutation({ variables: { id } });
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

  const deleteFromBasket = async (id) => {
    try {
      await deleteFromBasketMutation({ variables: { goodId: id } });
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    createGood,
    createLoading,
    updateGood,
    updateLoading,
    removeGood,
    addGoodToBasket,
    deleteFromBasket,
    deleteFromBasketLoading,
  };
};

export default useGoodActions;
