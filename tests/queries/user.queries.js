const { gql } = require('apollo-server-express');

const GET_USERS = gql`
  query getUser($_id: ID) {
    user(_id: $_id) {
      name
      phone
      _id
      surname
      position
      email
      password
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($user: CreateUserInput!) {
    userAdd(user: $user) {
      _id
      name
      surname
      password
      phone
      position
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($_id: ID, $changes: UserInput!) {
    updateUser(_id: $_id, changes: $changes) {
      name
      _id
      phone
      email
      surname
      position
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

const LOGIN = gql`
  query loginUser($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      tokenExpiration
      userId
    }
  }
`;

module.exports = {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  LOGIN,
};
