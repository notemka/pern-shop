import { gql } from '@apollo/client';

export const CREATE_BRAND = gql`
  mutation createBrand($name: String!) {
    createBrand(name: $name) {
      name
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation updateBrand($id: ID!, $name: String!) {
    updateBrand(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation deleteBrand($id: ID!) {
    deleteBrand(id: $id) {
      id
    }
  }
`;
