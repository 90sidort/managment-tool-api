const { makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');
const { typeDefCompany, resolversCompany } = require('./modules/company.module');

const { typeDefJob, resolversJob } = require('./modules/job.module');
const { typeDefLocation, resolversLocation } = require('./modules/location.module');
const {
  typeDefRepresentative,
  resolversRepresentative,
} = require('./modules/representative.module');
const { typeDefSkill, resolversSkill } = require('./modules/skill.module');
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
  typeDefs: [
    Query,
    Mutation,
    typeDefUser,
    typeDefJob,
    typeDefSkill,
    typeDefLocation,
    typeDefRepresentative,
    typeDefCompany,
  ],
  resolvers: merge(
    resolvers,
    resolversUser,
    resolversJob,
    resolversSkill,
    resolversLocation,
    resolversRepresentative,
    resolversCompany
  ),
});

module.exports = schema;
