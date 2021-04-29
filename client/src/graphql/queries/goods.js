import { gql } from '@apollo/client';

export const GET_ALL_GOODS = gql`
  query {
    getAllGoods {
      id
      name
      price
      rating
      img
      brandId
      typeId
    }
  }
`;

export const GET_ONE_GOOD = gql`
  query getOneGood($id: ID!) {
    getOneGood(id: $id) {
      id
      name
      price
      rating
      img
      brandId
      typeId
      info {
        title
        description
        goodId
      }
    }
  }
`;
