const typeDefs = `
  type Profile {
    id: ID
    email: String
    role: String
  }

  type User {
    me: Profile
    accessToken: String
  }

  type Type {
    id: ID
    name: String
  }

  type Brand {
    id: ID
    name: String
  }

  type GoodInfo {
    id: ID
    title: String
    description: String
    goodId: ID
  }

  type Good {
    id: ID
    name: String
    price: Float
    rating: Int
    img: String
    typeId: ID
    brandId: ID
    info: [GoodInfo]
  }

  type Basket {
    id: ID
  }

  type BasketGood {
    id: ID
  }
`;

module.exports = typeDefs;
