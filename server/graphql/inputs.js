const inputs = `
  input UserInput {
    id: ID!
    email: String!
    role: String
  }

  input GoodInfoInput {
    id: ID!
    title: String!
    description: String!
    goodId: ID!
  }

  input GoodInput {
    id: ID
    name: String!
    price: Float!
    rating: Int
    img: Upload!
    typeId: ID!
    brandId: ID!
    info: String
  }

  input UpdatedGoodInput {
    id: ID!
    name: String!
    price: Float!
    rating: Int!
    img: Upload!
    typeId: ID!
    brandId: ID!
    info: String
  }

  input BasketListInput {
    id: ID!
    goodId: ID!
  }

  input TypeInput {
    id: ID!
    name: String!
  }

  input BrandInput {
    id: ID!
    name: String!
  }
`;

module.exports = inputs;
