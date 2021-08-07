const queries = `
  type Query {
    checkUserAccess: User

    getAllGoods(brandId: Int, typeId: Int, limit: Int, page: Int): [Good]
    getOneGood(id: ID!): Good
    getGoodsDataForBasket(basketList: [BasketListInput]): [Good]

    getAllTypes: [Type]

    getAllBrands: [Brand]

    getAllBasketGoods(id: ID!): [BasketGood]
  }
`;

module.exports = queries;
