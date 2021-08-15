const { ApolloError } = require('apollo-server-express');

const validIndustries = ['Agriculture', 'Manufacturing', 'Services'];

const companyValidate = function (company) {
  const errors = [];
  if (company.name.length < 2) {
    errors.push('Field "Name" must be at least 2 characters long.');
  }
  if (company.name.length > 300) {
    errors.push('Field "Name" must be at most 300 characters long.');
  }
  if (company.description.length < 5) {
    errors.push('Field "description" must be at least 5 characters long.');
  }
  if (company.description.length > 2000) {
    errors.push('Field "description" must be at most 2000 characters long.');
  }
  if (!validIndustries.includes(String(company.industry))) {
    errors.push('Field "industry" must be of valid type.');
  }
  if (errors.length > 0) {
    throw new ApolloError(errors);
  }
};

module.exports = companyValidate;
