const GraphQLDate = require('./date.scalar');

const { skillsList, skillAdd } = require('./handlers/skill.handler');
const { companiesList, companyAdd } = require('./handlers/company.handler');
const { jobsList, jobAdd, updateJob, jobDelete, jobCount } = require('./handlers/job.handler');
const { locationsList, locationAdd } = require('./handlers/location.handler');
const { representativeList, repAdd } = require('./handlers/representative.handler');
const { userAdd, getUsers, updateUser, deleteUser, login } = require('./handlers/user.handler');

const resolvers = {
  Query: {
    job: jobsList,
    user: getUsers,
    location: locationsList,
    representative: representativeList,
    skill: skillsList,
    company: companiesList,
    jobCount: jobCount,
    login,
  },
  Mutation: {
    jobAdd,
    userAdd,
    skillAdd,
    companyAdd,
    locationAdd,
    repAdd,
    updateJob,
    updateUser,
    jobDelete,
    deleteUser,
  },
  GraphQLDate,
};

module.exports = resolvers;
