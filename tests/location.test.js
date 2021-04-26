const mongoose = require('mongoose');

const Location = require('../model/location.model');
const { cidTwo } = require('./fixtures/location.fixture');
const { testLocOne, testLocTwo, testLocThree, cidOne } = require('./fixtures/location.fixture');
const { GET_LOC, UPDATE_LOC, DELETE_LOC, CREATE_LOC } = require('./queries/location.queries');
const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test queries and mutations for skills', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropTestDb();
  });
  afterAll(async () => {
    await closeDbConnection();
  });

  it('Should be able to get locations', async () => {
    await new Location(testLocOne).save();
    await new Location(testLocTwo).save();
    await new Location(testLocThree).save();
    const response = await query({ query: GET_LOC });
    expect(response.data.location.length).toEqual(3);
    expect(response.data.location[0]).toEqual(
      expect.objectContaining({
        cid: expect.any(String),
        address: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        postcode: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to get locations by company', async () => {
    await dropTestDb();
    await new Location(testLocOne).save();
    await new Location(testLocTwo).save();
    await new Location(testLocThree).save();
    const response = await query({
      query: GET_LOC,
      variables: { cid: cidTwo },
    });
    expect(response.data.location.length).toEqual(1);
    expect(response.data.location[0]).toEqual(
      expect.objectContaining({
        cid: expect.any(String),
        address: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        postcode: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to get location by id', async () => {
    await dropTestDb();
    const locOne = await new Location(testLocOne).save();
    await new Location(testLocTwo).save();
    await new Location(testLocThree).save();
    const response = await query({
      query: GET_LOC,
      variables: { _id: locOne._id },
    });
    expect(response.data.location.length).toEqual(1);
    expect(response.data.location[0]).toEqual({
      cid: expect.any(String),
      address: locOne.address,
      city: locOne.city,
      country: locOne.country,
      postcode: locOne.postcode,
      _id: expect.any(String),
    });
  });

  it('Should be able to create location', async () => {
    await dropTestDb();
    const response = await mutate({ mutation: CREATE_LOC, variables: validRepInput });
    expect(response.data.repAdd).toEqual({
      cid: expect.any(String),
      name: validRepInput.representative.name,
      email: validRepInput.representative.email,
      phone: validRepInput.representative.phone,
      _id: expect.any(String),
    });
  });

  //   it('Should be impossible to create location with invalid data', async () => {
  //     const response = await mutate({ mutation: CREATE_REP, variables: invalidRepInput });
  //     expect(response).toHaveProperty('errors');
  //   });

  //   it('Should be able to delete location', async () => {
  //     await dropTestDb();
  //     const repOne = await new Representative(testRepOne).save();
  //     const response = await mutate({
  //       mutation: DELETE_REP,
  //       variables: { _id: repOne._id },
  //     });
  //     expect(response.data.representativeDelete).toEqual(true);
  //   });

  //   it('Should not be able to delete location that does not exist', async () => {
  //     const response = await mutate({
  //       mutation: DELETE_REP,
  //       variables: { _id: mongoose.Types.ObjectId() },
  //     });
  //     expect(response.errors[0].message).toEqual(`Error: Couldn't find representative.`);
  //   });

  //   it('Should be able to update location', async () => {
  //     await dropTestDb();
  //     const repOne = await new Representative(testRepOne).save();
  //     const response = await mutate({
  //       mutation: UPDATE_REP,
  //       variables: { _id: repOne._id, representative: testRepTwo },
  //     });
  //     expect(response.data.representativeUpdate).toEqual({
  //       cid: expect.any(String),
  //       name: testRepTwo.name,
  //       email: testRepTwo.email,
  //       phone: testRepTwo.phone,
  //       _id: expect.any(String),
  //     });
  //   });

  //   it('Should not be able to update location with invalid id', async () => {
  //     await dropTestDb();
  //     const response = await mutate({
  //       mutation: UPDATE_REP,
  //       variables: { _id: mongoose.Types.ObjectId(), representative: testRepTwo },
  //     });
  //     expect(response.errors[0].message).toEqual(`Error: Representative not found.`);
  //   });

  //   it('Should not be able to update location with invalid data', async () => {
  //     await dropTestDb();
  //     const repOne = await new Representative(testRepOne).save();
  //     testRepTwo.name = null;
  //     const response = await mutate({
  //       mutation: UPDATE_REP,
  //       variables: { _id: repOne._id, representative: testRepTwo },
  //     });
  //     expect(response).toHaveProperty('errors');
  //   });
});
