require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const schema = require('./graphql/schema');
const isAuth = require('./middleware/auth');

const mongoURI = `mongodb://${process.env.USER_DB}:${process.env.USER_DB_PASS}@127.0.0.1:27017/${process.env.USER_DB_NAME}`;
const port = process.env.API_SERVER_PORT;

const server = new ApolloServer({
  schema,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  context: ({ req }) => ({ isAuth: req.isAuth, userId: req.userId }),
});

const app = express();
app.use(isAuth);

// eslint-disable-next-line eqeqeq
const enableCors = process.env.ENABLE_CORS == true;

server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`API started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
