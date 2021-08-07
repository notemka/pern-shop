import { gql } from '@apollo/client';
import goodDataFragment from '../fragments/goodDataFragment';

export const GET_ALL_GOODS = gql`
  query {
    getAllGoods {
      ...goodData
    }
  }
  ${goodDataFragment}
`;

export const GET_ONE_GOOD = gql`
  query getOneGood($id: ID!) {
    getOneGood(id: $id) {
      ...goodData
      info {
        title
        description
        goodId
      }
    }
  }
  ${goodDataFragment}
`;

export const GET_GOODS_DATA_FOR_BASKET = gql`
  query getGoodsDataForBasket($basketList: [BasketListInput]!) {
    getGoodsDataForBasket(basketList: $basketList) {
      ...goodData
    }
  }
  ${goodDataFragment}
`;
