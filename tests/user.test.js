const mongoose = require('mongoose');
const User = require('../model/user.model');
const {
  UserInput,
  newUserOne,
  newUserTwo,
  newUserThree,
  newUserFour,
  UserInputUpdate,
  userDeleted,
} = require('./fixtures/user.fixture');
const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER, LOGIN } = require('./queries/user.queries');
const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test queries and mutations for users', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropTestDb();
  });
  afterAll(async () => {
    await closeDbConnection();
  });

  it('Should be able to return all users', async () => {
    await new User(newUserOne).save();
    await new User(newUserTwo).save();
    const response = await query({ query: GET_USERS });
    expect(response.data.user.length).toEqual(2);
    expect(response.data.user[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        phone: expect.any(String),
        _id: expect.any(String),
        surname: expect.any(String),
        position: expect.any(String),
        password: null,
        email: expect.any(String),
      })
    );
  });

  it('Should be able to return user by ID', async () => {
    const userTest = await new User(newUserThree).save();
    const response = await query({ query: GET_USERS, variables: userTest._id });
    expect(response.data.user.length).toEqual(1);
    expect(response.data.user[0]).toEqual(
      expect.objectContaining({
        name: 'TestThree',
        phone: '+48574000003',
        _id: expect.any(String),
        surname: 'TestThree',
        position: 'Junior Customer Service Specialist',
        password: null,
        email: 'testthree.testthree@test.com',
      })
    );
  });

  it('Should return no user if ID does not match', async () => {
    const response = await query({ query: GET_USERS, variables: mongoose.Types.ObjectId() });
    expect(response.data.user).toEqual([]);
  });

  it('Should be able to create new user', async () => {
    const response = await mutate({ mutation: ADD_USER, variables: UserInput });
    expect(response.data.userAdd).toEqual(
      expect.objectContaining({
        name: 'Taras',
        phone: '+48574000001',
        _id: expect.any(String),
        surname: 'Shumowsky',
        position: 'Junior Customer Service Specialist',
        password: null,
        email: 'shumowski.taras@test.com',
      })
    );
  });

  it('Should not be able to create user with existing email', async () => {
    const response = await mutate({ mutation: ADD_USER, variables: UserInput });
    expect(response.errors[0].message).toEqual('Error: User already exists!');
  });

  it('Should not be able to create user with invalid data', async () => {
    UserInput.user.email = null;
    UserInput.user.password = null;
    const response = await mutate({ mutation: ADD_USER, variables: UserInput });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete existing user', async () => {
    const deleteUser = await new User(userDeleted).save();
    const response = await mutate({
      mutation: DELETE_USER,
      variables: { _id: deleteUser._id },
    });
    expect(response.data.deleteUser).toEqual(true);
  });

  it('Should return false if user does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_USER,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.data.deleteUser).toEqual(false);
  });

  it('Should be possible to update user data', async () => {
    const userTest = await new User(newUserFour).save();
    const response = await mutate({
      mutation: UPDATE_USER,
      variables: { _id: userTest._id, changes: UserInputUpdate },
    });
    expect(response.data.updateUser).toEqual(
      expect.objectContaining({
        name: 'Four',
        phone: '+48574000014',
        _id: expect.any(String),
        surname: 'Four',
        position: 'Regular Customer Service Specialist',
        email: 'four.four@test.com',
      })
    );
  });

  it('Should notify if user to be updated does not exist', async () => {
    const response = await mutate({
      mutation: UPDATE_USER,
      variables: { _id: mongoose.Types.ObjectId(), changes: UserInputUpdate },
    });
    expect(response.errors[0].message).toEqual('Error: User does not exist!');
  });

  it('Should notify if update data is invalid', async () => {
    UserInputUpdate.name = null;
    const userTest = await new User(newUserFour).save();
    const response = await mutate({
      mutation: UPDATE_USER,
      variables: { _id: userTest._id, changes: UserInputUpdate },
    });
    expect(response).toHaveProperty('errors');
  });

  it('Should be possible to log in', async () => {
    await dropTestDb();
    UserInput.user.password = 'testtest882';
    UserInput.user.email = 'shumowski.taras@test.com';
    await mutate({ mutation: ADD_USER, variables: UserInput });
    const response = await query({
      query: LOGIN,
      variables: { password: UserInput.user.password, email: UserInput.user.email },
    });
    expect(response.data.login).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        tokenExpiration: expect.any(Number),
        userId: expect.any(String),
      })
    );
  });

  it('Should notify when user does not exist', async () => {
    const response = await query({
      query: LOGIN,
      variables: { password: 'invalid', email: 'invalid' },
    });
    expect(response.errors[0].message).toEqual('Error: User does not exists!');
  });

  it('Should notify when password invalid', async () => {
    await dropTestDb();
    await mutate({ mutation: ADD_USER, variables: UserInput });
    const response = await query({
      query: LOGIN,
      variables: { password: 'invalid', email: UserInput.user.email },
    });
    expect(response.errors[0].message).toEqual('Error: Invalid password.');
  });
});
