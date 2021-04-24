const { gql } = require('apollo-server-express');
const { ObjectId } = require('mongodb');
const { testClient, connectToDb } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test', () => {
  beforeAll(async () => {
    await connectToDb();
  });

  it('check', async () => {
    const variables = {
      user: {
        name: 'Taras',
        surname: 'Shumowsky',
        phone: '+48574000001',
        position: 'Junior Customer Service Specialist',
        email: 'shumowski.taras@test.com',
        password: 'testtest882',
      },
    };
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
    const responseOne = await mutate({ mutation: ADD_USER, variables });
    console.log(responseOne.data.userAdd);
    expect(1).toEqual(1);
    const newVariable = await responseOne._id;
    const GET_USERS = gql`
      query getUser($_id: ID) {
        user(_id: $_id) {
          name
          phone
          _id
          surname
          position
          email
        }
      }
    `;
    const responseTwo = await query({ query: GET_USERS, variables: newVariable });
    console.log(responseTwo.data.user);
    expect(1).toEqual(1);
  });
});

// /* eslint-disable node/no-unpublished-require */
// const { createTestClient } = require('apollo-server-testing');
// const mongoose = require('mongoose');

// const User = require('../model/user.model');
// const createTestServer = require('./testServer');

// describe('Check tests', () => {
//   const testServer = createTestServer();
//   const { mutate, query } = createTestClient(testServer);

//   beforeAll(async () => {
//     await mongoose.connect(
//       global.__MONGO_URI__,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       (err) => {
//         if (err) {
//           console.error(err);
//           process.exit(1);
//         }
//       }
//     );
//     // await new User({
//     //   name: 'Test',
//     //   surname: 'Test',
//     //   phone: '+48574000001',
//     //   position: 'Junior Customer Service Specialist',
//     //   email: 'test.test@test.com',
//     //   password: 'testtest882',
//     // }).save();
//   });
//   it('Create and save user', async () => {
//     const variables = {
//       user: {
//         name: 'Taras',
//         surname: 'Shumowsky',
//         phone: '+48574000001',
//         position: 'Junior Customer Service Specialist',
//         email: 'shumowski.taras@test.com',
//         password: 'testtest882',
//       },
//     };

//     const CREATE_USER = `
//     mutation addUser($user: CreateUserInput!) {
//         userAdd(user: $user){
//         _id
//         name
//         surname
//         password
//         phone
//         position
//         email
//       }
//     }`;

//     const responseOne = await mutate({ mutation: CREATE_USER, variables });
//     console.log(responseOne.data.userAdd);
//     expect(1).toEqual(1);
//     const GET_USERS = `
//     query getUser($_id: ID){
//         user(_id: $_id) {
//           name
//           phone
//           _id
//           surname
//           position
//           email
//         }
//     }`;
//     const responseTwo = await query({ query: GET_USERS });
//     console.log(responseTwo.data);
//   });
//   // it('Query test', async () => {
//   //   const checkUser = await User.find();
//   //   console.log(checkUser);
//   //   const GET_USERS = `
//   //     query getUser($_id: ID){
//   //         user(_id: $_id) {
//   //           name
//   //           phone
//   //           _id
//   //           surname
//   //           position
//   //           email
//   //         }
//   //     }`;
//   //   const response = await query({ query: GET_USERS });
//   //   console.log(response.data);
//   // });
// });

// // test('Check', async () => {
// //   const testServer = createTestServer();
// //   const { query } = createTestClient(testServer);

// //   const GET_USERS = `
// //     query getUser($_id: ID){
// //         user(_id: $_id) {
// //           name
// //           phone
// //           _id
// //           surname
// //           position
// //           password
// //           email
// //         }
// //     }`;
// //   const response = await query({ query: GET_USERS });
// //   expect(response.data.user.length).toEqual(2);
// //   expect(response.data.user[0]).toEqual(
// //     expect.objectContaining({
// //       name: expect.any(String),
// //       phone: expect.any(String),
// //       _id: expect.any(String),
// //       surname: expect.any(String),
// //       position: expect.any(String),
// //       password: expect.any(String),
// //       email: expect.any(String),
// //     })
// //   );
// // });
