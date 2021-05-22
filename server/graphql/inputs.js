const inputs = `
  input UserInput {
    id: ID!
    email: String!
    role: String
  }

  input GoodInfoInput {
    title: String!
    description: String!
  }

  input FileInput {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input GoodInput {
    id: ID
    name: String!
    price: Float!
    rating: Int
    img: Upload
    typeId: ID!
    brandId: ID!
    info: String
  }

  input UpdatedGoodInput {
    id: ID!
    name: String!
    price: Float!
    rating: Int!
    img: Upload
    typeId: ID!
    brandId: ID!
    info: String
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
