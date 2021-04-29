const inputs = `
  input UserInput {
    id: ID!
    email: String!
    role: String
  }

  input GoodInput {
    id: ID!
    name: String!
    price: Float!
    rating: Int!
    img: String!
    typeId: ID!
    brandId: ID!
  }

  input BasketInput {
    id: ID!
    basketId: ID!
  }
`;

module.exports = inputs;
