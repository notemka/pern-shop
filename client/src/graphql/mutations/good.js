import { gql } from '@apollo/client';

export const CREATE_GOOD = gql`
  mutation createGood(
    $id: ID!
    $name: String!
    $price: Float!
    $rating: Int!
    $img: String!
    $typeId: ID!
    $brandId: ID!
  ) {
    createGood(
      input: {
        id: $id
        name: $name
        price: $price
        rating: $rating
        img: $img
        typeId: $typeId
        brandId: $brandId
      }
    ) {
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

export const UPDATE_GOOD = gql`
  query updateGood(
    $id: ID!
    $name: String!
    $price: Float!
    $rating: Int
    $img: String
    $brandId: ID!
    $typeId: ID!
    $title: String
    $description: String
    $goodId: ID!
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
        title: $title
        description: $description
        goodId: $goodId
      }
    ) {
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

export const DELETE_GOOD = gql`
  query deleteGood($id: ID!) {
    updateGood(id: $id) {
      id
      name
    }
  }
`;
