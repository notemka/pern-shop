import { gql } from '@apollo/client';

export const CHECK_USER = gql`
  query {
    checkUserAccess {
      token
    }
  }
`;
