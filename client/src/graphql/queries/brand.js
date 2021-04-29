import { gql } from '@apollo/client';

export const GET_ALL_BRANDS = gql`
  query {
    getAllBrands {
      id
      name
    }
  }
`;
