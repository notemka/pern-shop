const { buildSchema } = require('graphql');
const typeDefs = require('./typeDefs');
const inputs = require('./inputs');
const queries = require('./queries');
const mutations = require('./mutations');

// input - параметр для мутации юзера
const schema = buildSchema(`
  ${typeDefs}
  ${inputs}
  ${queries}
  ${mutations}
`);

module.exports = schema;
