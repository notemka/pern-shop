import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      me {
        id
        email
        role
      }
      accessToken
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!, $role: String!) {
    registerUser(email: $email, password: $password, role: $role) {
      me {
        id
        email
        role
      }
      accessToken
    }
  }
`;
