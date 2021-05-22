const { Upload } = require('graphql-upload');

const typeDefs = `
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
  }

  type Profile {
    id: ID
    email: String
    role: String
  }

  type User {
    token: String
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
    img: Upload
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
