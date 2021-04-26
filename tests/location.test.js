const mongoose = require('mongoose');

const Location = require('../model/location.model');
const { cidTwo, invalidLocInput } = require('./fixtures/location.fixture');
const {
  testLocOne,
  testLocTwo,
  testLocThree,
  validLocInput,
} = require('./fixtures/location.fixture');
const { GET_LOC, UPDATE_LOC, DELETE_LOC, CREATE_LOC } = require('./queries/location.queries');
const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test queries and mutations for locations', () => {
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
    const response = await mutate({ mutation: CREATE_LOC, variables: validLocInput });
    expect(response.data.locationAdd).toEqual({
      cid: expect.any(String),
      address: validLocInput.location.address,
      city: validLocInput.location.city,
      country: validLocInput.location.country,
      postcode: validLocInput.location.postcode,
      _id: expect.any(String),
    });
  });

  it('Should be impossible to create location with invalid data', async () => {
    const response = await mutate({ mutation: CREATE_LOC, variables: invalidLocInput });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete location', async () => {
    await dropTestDb();
    const locOne = await new Location(testLocOne).save();
    const response = await mutate({
      mutation: DELETE_LOC,
      variables: { _id: locOne._id },
    });
    expect(response.data.locationDelete).toEqual(true);
  });

  it('Should not be able to delete location that does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_LOC,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.errors[0].message).toEqual(`Error: Couldn't find location.`);
  });

  it('Should be able to update location', async () => {
    await dropTestDb();
    const locOne = await new Location(testLocOne).save();
    const response = await mutate({
      mutation: UPDATE_LOC,
      variables: { _id: locOne._id, location: testLocTwo },
    });
    expect(response.data.locationUpdate).toEqual({
      cid: expect.any(String),
      address: testLocTwo.address,
      city: testLocTwo.city,
      country: testLocTwo.country,
      postcode: testLocTwo.postcode,
      _id: expect.any(String),
    });
  });

  it('Should not be able to update location with invalid id', async () => {
    await dropTestDb();
    const response = await mutate({
      mutation: UPDATE_LOC,
      variables: { _id: mongoose.Types.ObjectId(), location: testLocThree },
    });
    expect(response.errors[0].message).toEqual(`Error: Location not found.`);
  });

  it('Should not be able to update location with invalid data', async () => {
    await dropTestDb();
    const locOne = await new Location(testLocOne).save();
    testLocThree.name = null;
    const response = await mutate({
      mutation: UPDATE_LOC,
      variables: { _id: locOne._id, representative: testLocThree },
    });
    expect(response).toHaveProperty('errors');
  });
});
