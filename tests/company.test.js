const mongoose = require('mongoose');

const Company = require('../model/company.model');
const {
  testCompanyOne,
  testCompanyTwo,
  testCompanyThree,
  validCompanyInput,
  invalidCompanyInput,
} = require('./fixtures/company.fixture');
const {
  UPDATE_COMPANY,
  DELETE_COMPANY,
  CREATE_COMPANY,
  GET_COMPANY,
} = require('./queries/company.queries');
const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

describe('Test queries and mutations for companies', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropTestDb();
  });
  afterAll(async () => {
    await closeDbConnection();
  });

  it('Should be able to get companies', async () => {
    await new Company(testCompanyOne).save();
    await new Company(testCompanyTwo).save();
    await new Company(testCompanyThree).save();
    const response = await query({ query: GET_COMPANY });
    expect(response.data.company.length).toEqual(3);
    expect(response.data.company[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        industry: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to get single company', async () => {
    await dropTestDb();
    const newCompany = await new Company(testCompanyOne).save();
    const response = await query({
      query: GET_COMPANY,
      variables: { _id: newCompany._id },
    });
    expect(response.data.company[0]).toEqual(
      expect.objectContaining({
        name: newCompany.name,
        description: newCompany.description,
        industry: newCompany.industry,
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to create company', async () => {
    const response = await mutate({ mutation: CREATE_COMPANY, variables: validCompanyInput });
    expect(response.data.companyAdd).toEqual({
      name: validCompanyInput.company.name,
      _id: expect.any(String),
      description: validCompanyInput.company.description,
      industry: validCompanyInput.company.industry,
    });
  });

  it('Should be impossible to create company with invalid data', async () => {
    const response = await mutate({ mutation: CREATE_COMPANY, variables: invalidCompanyInput });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete company', async () => {
    await dropTestDb();
    const newCompany = await new Company(testCompanyOne).save();
    const response = await mutate({
      mutation: DELETE_COMPANY,
      variables: { _id: newCompany._id },
    });
    expect(response.data.companyDelete).toEqual(true);
  });

  it('Should not be able to delete company that does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_COMPANY,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.errors[0].message).toEqual(`Error: Couldn't find company.`);
  });

  it('Should be able to update company', async () => {
    await dropTestDb();
    const newCompany = await new Company(testCompanyOne).save();
    const response = await mutate({
      mutation: UPDATE_COMPANY,
      variables: { _id: newCompany._id, company: testCompanyTwo },
    });
    expect(response.data.companyUpdate).toEqual({
      name: testCompanyTwo.name,
      _id: expect.any(String),
      description: testCompanyTwo.description,
      industry: testCompanyTwo.industry,
    });
  });

  it('Should not be able to update company with invalid id', async () => {
    await dropTestDb();
    const response = await mutate({
      mutation: UPDATE_COMPANY,
      variables: { _id: mongoose.Types.ObjectId(), company: testCompanyTwo },
    });
    expect(response.errors[0].message).toEqual('Error: Company not found.');
  });

  it('Should not be able to update company with invalid data', async () => {
    await dropTestDb();
    const newCompany = await new Company(testCompanyOne).save();
    testCompanyTwo.name = null;
    const response = await mutate({
      mutation: UPDATE_COMPANY,
      variables: { _id: newCompany._id, company: testCompanyTwo },
    });
    expect(response).toHaveProperty('errors');
  });
});
