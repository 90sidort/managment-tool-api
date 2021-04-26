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
} = require('./fixtures/job.fixture');

const {
  GET_JOB,
  GET_SINGLE_JOB,
  DELETE_JOB,
  CREATE_JOB,
  UPDATE_JOB,
} = require('./queries/job.queries');

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

  it('Should be able to get companies', async () => {
    await new Company(mockedCompanyOne).save();
    await new Representative(mockedRepOne).save();
    await new Location(mockedLocationOne).save();
    await new Skill(mockedSkillOne).save();
    await new Job(testJobOne).save();
    await new Job(testJobTwo).save();
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
});
