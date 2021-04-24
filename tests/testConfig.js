/* eslint-disable node/no-unpublished-require */
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const schema = require('../graphql/schema');

const connectToDb = async () => {
  await mongoose
    // eslint-disable-next-line no-underscore-dangle
    .connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.error(error));
};

const dropTestDb = async () => {
  await mongoose.connection.db.dropDatabase().catch((error) => console.error(error));
};

const closeDbConnection = async () => {
  await mongoose.connection.close().catch((error) => console.error(error));
};

const isAuth = true;

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    req,
    res,
    isAuth,
  }),
});

module.exports = {
  testClient: createTestClient(server),
  connectToDb,
  dropTestDb,
  closeDbConnection,
};
