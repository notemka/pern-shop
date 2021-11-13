import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SHOP_ROUTE } from 'routes';
import { NotifierContext } from 'contexts/NotifierContext';

import { CREATE_GOOD, UPDATE_GOOD, DELETE_GOOD } from 'graphql/mutations/good';
import { ADD_TO_BASKET, DELETE_FROM_BASKET } from 'graphql/mutations/basket';
import { GET_ALL_GOODS } from 'graphql/queries/goods';
import AppContext from 'contexts/AppContext';

const useGoodActions = () => {
  const mutationOptions = { refetchQueries: [{ query: GET_ALL_GOODS }] };
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_GOOD);
  const [createMutation, { data: createdData, loading: createLoading }] = useMutation(CREATE_GOOD, mutationOptions);
  const [deleteMutation, { data: deletedData, loading: deleteLoading }] = useMutation(DELETE_GOOD, mutationOptions);

  const [addToBasket, { loading: basketLoading }] = useMutation(ADD_TO_BASKET);
  const [deleteFromBasketMutation, { loading: deleteFromBasketLoading }] = useMutation(DELETE_FROM_BASKET);
  const { push } = useHistory();
  const { addNotifier } = useContext(NotifierContext);
  const { setGoods } = useContext(AppContext);

  useEffect(() => {
    if (createdData) {
      setGoods((prevList) => [...prevList, createdData.createGood]);
    }
    if (deletedData) {
      setGoods((prevList) => prevList.filter((item) => item.id !== deletedData.deleteGood));
    }
  }, [createdData, deletedData]);

  const createGood = async (data) => {
    try {
      await createMutation({ variables: data });
      if (!createLoading) {
        addNotifier({ text: 'Товар создан!' });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  const updateGood = async (data) => {
    try {
      await updateMutation({ variables: data });
      if (!updateLoading) {
        addNotifier({ text: 'Товар обновлен!' });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  const removeGood = async (id) => {
    try {
      await deleteMutation({ variables: { id } });
      if (!deleteLoading) {
        push(SHOP_ROUTE);
        addNotifier({ text: 'Товар удален!' });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  const addGoodToBasket = async (id) => {
    try {
      await addToBasket({ variables: { id } });
      if (!basketLoading) {
        addNotifier({ text: 'Товар добавлен в корзину!' });
      }
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
    }
  };

  const deleteFromBasket = async (id) => {
    try {
      await deleteFromBasketMutation({ variables: { goodId: id } });
    } catch (error) {
      addNotifier({ text: error.message, type: 'error' });
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
