import { gql } from '@apollo/client';

export const CREATE_BRAND = gql`
  mutation createBrand($name: String!) {
    createType(name: $name) {
      name
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation updateBrand($id: ID!, $name: String!) {
    updateType(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation deleteBrand($id: ID!) {
    deleteType(id: $id) {
      id
    }
  }
`;
