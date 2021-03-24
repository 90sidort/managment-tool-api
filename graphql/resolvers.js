const GraphQLDate = require('./date.scalar');

const { skillsList, skillAdd } = require('./handlers/skill.handler');
const { companiesList, companyAdd } = require('./handlers/company.handler');
const { jobsList, jobAdd, updateJob, jobDelete } = require('./handlers/job.handler');
const { locationsList, locationAdd } = require('./handlers/location.handler');
const { representativeList, repAdd } = require('./handlers/representative.handler');

const resolvers = {
  Query: {
    job: jobsList,
    location: locationsList,
    representative: representativeList,
    skill: skillsList,
    company: companiesList,
  },
  Mutation: {
    jobAdd,
    skillAdd,
    companyAdd,
    locationAdd,
    repAdd,
    updateJob,
    jobDelete,
  },
  GraphQLDate,
};

module.exports = resolvers;
