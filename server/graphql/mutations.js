const mutations = `
  type Mutation {
    registerUser(email: String!, password: String!, role: String): User
    loginUser(email: String!, password: String!): User

    createGood(input: GoodInput): Good
    updateGood(input: GoodInput): Good
    deleteGood(id: ID!): Good

    createType(name: String!): Type
    updateType(id: ID!, name: String!): Type
    deleteType(id: ID!): Type

    createBrand(name: String!): Brand
    updateBrand(id: ID!, name: String!): Brand
    deleteBrand(id: ID!): Brand

    addToBasket(input: BasketInput): Basket
    deleteFromBasket(input: BasketInput): Basket
  }
`;

module.exports = mutations;
