import { gql } from '@apollo/client';

export default gql`
  fragment goodData on Good {
    id
    name
    price
    rating
    img
    brandId
    typeId
  }
`;
