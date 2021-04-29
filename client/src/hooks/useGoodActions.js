import { useMutation } from '@apollo/client';
import { DELETE_GOOD, UPDATE_GOOD } from '../graphql/mutations/good';
import { ADD_TO_BASKET } from '../graphql/mutations/basket';

const useGoodActions = () => {
  const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_GOOD);
  const [deleteGood, { loading: deleteLoading }] = useMutation(DELETE_GOOD);
  const [addToBasket, { loading: basketLoading }] = useMutation(ADD_TO_BASKET);

  const editGood = async (data) => {
    try {
      await updateGood({ variables: data });
      if (!updateLoading) {
        alert(`Товар успешно изменен!`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeGood = async (id) => {
    try {
      await deleteGood({ variables: { id } });
      if (!deleteLoading) {
        alert(`Товар успешно удален!`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addGoodToBasket = async (id) => {
    try {
      await addToBasket({ variables: { id } });
      if (!basketLoading) {
        alert(`Товар успешно добавлен в корзину!`);
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
