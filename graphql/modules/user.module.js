const { getUsers, login, userAdd, deleteUser, updateUser } = require('../handlers/user.handler');

const typeDefUser = `
    extend type Query {
        user(_id: ID): [User!]
        login(password: String!, email:String!): AuthData!
    }
    extend type Mutation {
        userAdd(user: CreateUserInput!): User!
        updateUser(_id: ID, changes: UserInput!): User!
        deleteUser(_id: ID!): Boolean!
    }
    type User {
        _id: ID!
        name: String!
        surname: String!
        phone: String!
        position: String!
        email: String!
        password: String
    }
    input CreateUserInput {
        name: String!
        surname: String!
        phone: String!
        position: String!
        email: String!
        password: String!
    }
    input UserInput {
        name: String!
        surname: String!
        phone: String!
        position: String!
        email: String!
    }
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
`;

const resolversUser = {
  Query: {
    user: getUsers,
    login,
  },
  Mutation: {
    userAdd,
    updateUser,
    deleteUser,
  },
};

module.exports = { typeDefUser, resolversUser };
