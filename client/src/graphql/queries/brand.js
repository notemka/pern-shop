import { gql } from '@apollo/client';

const GET_ALL_BRANDS = gql`
  query {
    getAllBrands {
      id
      name
    }
  }
`;
export default GET_ALL_BRANDS;
