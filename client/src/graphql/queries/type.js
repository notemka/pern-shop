import { gql } from '@apollo/client';

export const GET_ALL_TYPES = gql`
  query {
    getAllTypes {
      id
      name
    }
  }
`;
