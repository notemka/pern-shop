import { gql } from '@apollo/client';

const GET_ALL_BASKET_GOODS = gql`
  query getAllBasketGoods($id: ID!) {
    getAllBasketGoods(id: $id) {
      id
      goodId
    }
  }
`;

export default GET_ALL_BASKET_GOODS;
