import { gql } from '@apollo/client';

export const CREATE_TYPE = gql`
  mutation createType($name: String!) {
    createType(name: $name) {
      name
    }
  }
`;

export const UPDATE_TYPE = gql`
  mutation updateType($id: ID!, $name: String!) {
    updateType(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_TYPE = gql`
  mutation deleteType($id: ID!) {
    deleteType(id: $id) {
      id
    }
  }
`;
