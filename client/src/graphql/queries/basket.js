import { gql } from '@apollo/client';

export const GET_ALL_BASKET_GOODS = gql`
  query getAllBasketGoods($id: ID!) {
    getAllBasketGoods(id: $id) {
      id
      goodId
    }
  }
`;
