const mongoose = require('mongoose');

const Company = require('../model/company.model');
const Job = require('../model/job.model');
const Representative = require('../model/representative.model');
const Location = require('../model/location.model');
const Skill = require('../model/skill.model');

const {
  mockedCompanyOne,
  mockedLocationOne,
  mockedRepOne,
  mockedSkillOne,
  testJobOne,
  testJobTwo,
  validJobInput,
  invalidJobInput,
  changeData,
} = require('./fixtures/job.fixture');

const { GET_JOB, DELETE_JOB, CREATE_JOB, UPDATE_JOB } = require('./queries/job.queries');

const { testClient, connectToDb, dropTestDb, closeDbConnection } = require('./testConfig');

const { query, mutate } = testClient;

let jobOne;
let jobTwo;
let companyOne;
let repOne;
let locOne;
let skillOne;

describe('Test queries and mutations for skills', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropTestDb();
  });

  beforeEach(async () => {
    companyOne = await new Company(mockedCompanyOne).save();
    repOne = await new Representative(mockedRepOne).save();
    locOne = await new Location(mockedLocationOne).save();
    skillOne = await new Skill(mockedSkillOne).save();
    jobOne = await new Job(testJobOne).save();
    jobTwo = await new Job(testJobTwo).save();
  });

  afterEach(async () => {
    await dropTestDb();
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  it('Should be able to get companies', async () => {
    const response = await query({ query: GET_JOB });
    expect(response.data.job.jobs.length).toEqual(2);
    expect(response.data.job.jobs[0]).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        personel: expect.any(Number),
        rate: expect.any(Number),
        currency: expect.any(String),
        description: expect.any(String),
        skills: expect.any(Array),
        agent: null,
        representative: expect.any(Object),
        location: expect.any(Object),
        title: expect.any(String),
        company: expect.any(Object),
        status: expect.any(String),
        start: expect.any(String),
        end: expect.any(String),
        created: expect.any(String),
      })
    );
  });

  it('Should be able to get company by id', async () => {
    const response = await query({ query: GET_JOB, variables: { _id: jobOne._id } });
    expect(response.data.job.jobs[0]).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        personel: expect.any(Number),
        rate: expect.any(Number),
        currency: expect.any(String),
        description: expect.any(String),
        skills: expect.any(Array),
        agent: null,
        representative: expect.any(Object),
        location: expect.any(Object),
        title: expect.any(String),
        company: expect.any(Object),
        status: expect.any(String),
        start: expect.any(String),
        end: expect.any(String),
        created: expect.any(String),
      })
    );
  });

  it('Should be able to get company with complex query', async () => {
    const response = await query({
      query: GET_JOB,
      variables: {
        title: jobTwo.title,
        currency: jobTwo.currency,
        status: jobTwo.status,
        company: jobTwo.company,
      },
    });
    expect(response.data.job.jobs[0].title).toEqual(jobTwo.title);
  });

  it('Should be possible to query jobs by min and max personel values', async () => {
    const response = await query({
      query: GET_JOB,
      variables: {
        personMin: 5,
        personMax: 15,
      },
    });
    expect(response.data.job.jobs[0].title).toEqual(jobOne.title);
  });

  it('Should be able to create job', async () => {
    const response = await mutate({ mutation: CREATE_JOB, variables: validJobInput });
    expect(response.data.jobAdd).toEqual({
      title: validJobInput.job.title,
      _id: expect.any(String),
    });
  });

  it('Should be impossible to create job with invalid data', async () => {
    const response = await mutate({ mutation: CREATE_JOB, variables: invalidJobInput });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete job', async () => {
    const response = await mutate({
      mutation: DELETE_JOB,
      variables: { _id: jobTwo._id },
    });
    expect(response.data.jobDelete).toEqual(true);
  });

  it('Should not be able to delete job that does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_JOB,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.data.jobDelete).toEqual(false);
  });

  it('Should be able to update job', async () => {
    const response = await mutate({
      mutation: UPDATE_JOB,
      variables: { _id: jobOne._id, changes: changeData },
    });
    expect(response.data.updateJob).toEqual(
      expect.objectContaining({
        title: expect.any(String),
      })
    );
  });

  it('Should not be able to update job with invalid id', async () => {
    const response = await mutate({
      mutation: UPDATE_JOB,
      variables: { _id: mongoose.Types.ObjectId(), changes: changeData },
    });
    expect(response.errors[0].message).toEqual(`Error: Job not found!`);
  });

  it('Should not be able to update job with invalid data', async () => {
    changeData.title = null;
    const response = await mutate({
      mutation: UPDATE_JOB,
      variables: { _id: locOne._id, representative: changeData },
    });
    expect(response).toHaveProperty('errors');
  });
});
