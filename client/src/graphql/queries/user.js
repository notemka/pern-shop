import { gql } from '@apollo/client';

const CHECK_USER = gql`
  query {
    checkUserAccess {
      token
    }
  }
`;

export default CHECK_USER;
