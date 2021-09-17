import { gql } from '@apollo/client';
import goodDataFragment from '../fragments/goodDataFragment';

export const CREATE_GOOD = gql`
  mutation createGood(
    $name: String!
    $price: Float!
    $rating: Int
    $img: Upload!
    $typeId: ID!
    $brandId: ID!
    $info: String
  ) {
    createGood(
      input: { name: $name, price: $price, rating: $rating, img: $img, typeId: $typeId, brandId: $brandId, info: $info }
    ) {
      ...goodData
      info {
        title
        description
      }
    }
  }
  ${goodDataFragment}
`;

export const UPDATE_GOOD = gql`
  mutation updateGood(
    $id: ID!
    $name: String!
    $price: Float!
    $rating: Int!
    $img: Upload!
    $brandId: ID!
    $typeId: ID!
    $info: String
  ) {
    updateGood(
      input: {
        id: $id
        name: $name
        price: $price
        rating: $rating
        img: $img
        brandId: $brandId
        typeId: $typeId
        info: $info
      }
    ) {
      ...goodData
      info {
        title
        description
      }
    }
  }
  ${goodDataFragment}
`;

export const DELETE_GOOD = gql`
  mutation deleteGood($id: ID!) {
    deleteGood(id: $id) {
      id
      name
    }
  }
`;
