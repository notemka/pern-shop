import { gql } from '@apollo/client';

export const CHECK_USER = gql`
  query checkUserAccess($id: ID!, $email: String!, $role: String!) {
    checkUserAccess(input: { id: $id, email: $email, role: $role }) {
      me {
        id
        email
        role
      }
      accessToken
    }
  }
`;
