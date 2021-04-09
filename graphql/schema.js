const { makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');
const { typeDefJob, resolversJob } = require('./modules/job.module');

const { typeDefUser, resolversUser } = require('./modules/user.module');

const Query = `
  type Query {
    _empty: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, typeDefUser, typeDefJob],
  resolvers: merge(resolvers, resolversUser, resolversJob),
});

module.exports = schema;
