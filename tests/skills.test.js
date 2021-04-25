const mongoose = require('mongoose');

const Skill = require('../model/skill.model');
const { skillOne, skillTwo, skillThree, SkillInput } = require('./fixtures/skill.fixture');
const { GET_SKILLS, ADD_SKILL, UPDATE_SKILL, DELETE_SKILL } = require('./queries/skill.queries');
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

  it('Should be able to get skill list', async () => {
    await new Skill(skillOne).save();
    await new Skill(skillTwo).save();
    await new Skill(skillThree).save();
    const response = await query({ query: GET_SKILLS });
    expect(response.data.skill.length).toEqual(3);
    expect(response.data.skill[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        _id: expect.any(String),
      })
    );
  });

  it('Should be able to create skill', async () => {
    const response = await mutate({ mutation: ADD_SKILL, variables: SkillInput });
    expect(response.data.skillAdd).toEqual({
      name: 'Go',
      _id: expect.any(String),
    });
  });

  it('Should be impossible to create skill with invalid data', async () => {
    const response = await mutate({ mutation: ADD_SKILL, variables: { skill: { name: null } } });
    expect(response).toHaveProperty('errors');
  });

  it('Should be able to delete skill', async () => {
    await dropTestDb();
    const newSkill = await new Skill(skillOne).save();
    const response = await mutate({
      mutation: DELETE_SKILL,
      variables: { _id: newSkill._id },
    });
    expect(response.data.skillDelete).toEqual(true);
  });

  it('Should not be able to delete skill that does not exist', async () => {
    const response = await mutate({
      mutation: DELETE_SKILL,
      variables: { _id: mongoose.Types.ObjectId() },
    });
    expect(response.errors[0].message).toEqual('Error: Unable to find this skill');
  });

  it('Should be able to update skill', async () => {
    await dropTestDb();
    const newSkill = await new Skill(skillOne).save();
    const response = await mutate({
      mutation: UPDATE_SKILL,
      variables: { _id: newSkill._id, name: 'Python' },
    });
    expect(response.data.skillUpdate).toEqual({
      name: 'Python',
      _id: expect.any(String),
    });
  });

  it('Should not be able to update skill with invalid id', async () => {
    const response = await mutate({
      mutation: UPDATE_SKILL,
      variables: { _id: mongoose.Types.ObjectId(), name: 'Python' },
    });
    expect(response.errors[0].message).toEqual('Error: Unable to find this skill');
  });

  it('Should not be able to update skill with invalid name', async () => {
    await dropTestDb();
    const newSkill = await new Skill(skillOne).save();
    const response = await mutate({
      mutation: UPDATE_SKILL,
      variables: { _id: newSkill._id, name: null },
    });
    expect(response).toHaveProperty('errors');
  });
});
