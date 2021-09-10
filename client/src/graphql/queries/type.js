import { gql } from '@apollo/client';

const GET_ALL_TYPES = gql`
  query {
    getAllTypes {
      id
      name
    }
  }
`;

export default GET_ALL_TYPES;
