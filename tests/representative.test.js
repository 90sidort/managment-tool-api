const mongoose = require('mongoose');

const Representative = require('../model/representative.model');
const {
  cidOne,
  testRepOne,
  testRepTwo,
  testRepThree,
  validRepInput,
  invalidRepInput,
} = require('./fixtures/representative.fixture');
const { GET_REP, CREATE_REP, DELETE_REP, UPDATE_REP } = require('./queries/representative.queries');
const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test queries and mutations for representatives', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropTestDb();
  });
  afterAll(async () => {
    await closeDbConnection();
  });

  it('Should be able to get representative', async () => {
    await new Representative(testRepOne).save();
    await new Representative(testRepTwo).save();
    await new Representative(testRepThree).save();
    const response = await query({ query: GET_REP });
    expect(response.data.representative.length).toEqual(3);
    expect(response.data.representative[0]).toEqual(
      expect.objectContaining({
        cid: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to get representative by company', async () => {
    await dropTestDb();
    await new Representative(testRepOne).save();
    await new Representative(testRepTwo).save();
    await new Representative(testRepThree).save();
    const response = await query({
      query: GET_REP,
      variables: { cid: cidOne },
    });
    expect(response.data.representative.length).toEqual(2);
    expect(response.data.representative[0]).toEqual(
      expect.objectContaining({
        cid: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to get representative by id', async () => {
    await dropTestDb();
    const repOne = await new Representative(testRepOne).save();
    await new Representative(testRepTwo).save();
    await new Representative(testRepThree).save();
    const response = await query({
      query: GET_REP,
      variables: { _id: repOne._id },
    });
    expect(response.data.representative.length).toEqual(1);
    expect(response.data.representative[0]).toEqual({
      cid: expect.any(String),
      name: testRepOne.name,
      email: testRepOne.email,
      phone: testRepOne.phone,
      _id: expect.any(String),
    });
  });

  it('Should be able to create representative', async () => {
    await dropTestDb();
    const response = await mutate({ mutation: CREATE_REP, variables: validRepInput });
    expect(response.data.repAdd).toEqual({
      cid: expect.any(String),
      name: validRepInput.representative.name,
      email: validRepInput.representative.email,
      phone: validRepInput.representative.phone,
      _id: expect.any(String),
    });
  });

  it('Should be impossible to create representative with invalid data', async () => {
    const response = await mutate({ mutation: CREATE_REP, variables: invalidRepInput });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete representative', async () => {
    await dropTestDb();
    const repOne = await new Representative(testRepOne).save();
    const response = await mutate({
      mutation: DELETE_REP,
      variables: { _id: repOne._id },
    });
    expect(response.data.representativeDelete).toEqual(true);
  });

  it('Should not be able to delete representative that does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_REP,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.errors[0].message).toEqual(`Error: Couldn't find representative.`);
  });

  it('Should be able to update representative', async () => {
    await dropTestDb();
    const repOne = await new Representative(testRepOne).save();
    const response = await mutate({
      mutation: UPDATE_REP,
      variables: { _id: repOne._id, representative: testRepTwo },
    });
    expect(response.data.representativeUpdate).toEqual({
      cid: expect.any(String),
      name: testRepTwo.name,
      email: testRepTwo.email,
      phone: testRepTwo.phone,
      _id: expect.any(String),
    });
  });

  it('Should not be able to update representative with invalid id', async () => {
    await dropTestDb();
    const response = await mutate({
      mutation: UPDATE_REP,
      variables: { _id: mongoose.Types.ObjectId(), representative: testRepTwo },
    });
    expect(response.errors[0].message).toEqual(`Error: Representative not found.`);
  });

  it('Should not be able to update representative with invalid data', async () => {
    await dropTestDb();
    const repOne = await new Representative(testRepOne).save();
    testRepTwo.name = null;
    const response = await mutate({
      mutation: UPDATE_REP,
      variables: { _id: repOne._id, representative: testRepTwo },
    });
    expect(response).toHaveProperty('errors');
  });
});
