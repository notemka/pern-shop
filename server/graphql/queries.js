const queries = `
  type Query {
    checkUserAccess(input: UserInput): User!

    getAllGoods(brandId: Int, typeId: Int, limit: Int, page: Int): [Good]
    getOneGood(id: ID!): Good

    getAllTypes: [Type]

    getAllBrands: [Brand]

    getAllBasketGoods(id: ID!): [BasketGood]
  }
`;

module.exports = queries;
