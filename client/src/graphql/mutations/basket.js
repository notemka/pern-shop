import { gql } from '@apollo/client';

export const ADD_TO_BASKET = gql`
  mutation addToBasket($id: ID!, $basketId: ID!) {
    addToBasket(input: { id: $id, basketId: $basketId }) {
      id
    }
  }
`;

export const DELETE_FROM_BASKET = gql`
  mutation deleteFromBasket($id: ID!, $basketId: ID!) {
    deleteFromBasket(input: { id: $id, basketId: $basketId }) {
      id
    }
  }
`;
