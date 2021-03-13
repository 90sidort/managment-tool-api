require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");

const mongoURI = `mongodb://${process.env.USER_DB}:${process.env.USER_DB_PASS}@127.0.0.1:27017/${process.env.USER_DB_NAME}`;

const port = process.env.API_SERVER_PORT;

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./graphql/schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, function () {
      console.log(`API started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
