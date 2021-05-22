import { gql } from '@apollo/client';

export const ADD_TO_BASKET = gql`
  mutation addToBasket($id: ID!) {
    addToBasket(id: $id) {
      id
    }
  }
`;

export const DELETE_FROM_BASKET = gql`
  mutation deleteFromBasket($goodId: ID!) {
    deleteFromBasket(goodId: $goodId) {
      goodId
    }
  }
`;
