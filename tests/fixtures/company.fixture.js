const testCompanyOne = {
  name: 'Test Company One',
  description: 'Test Description One',
  industry: 'Agriculture',
};

const testCompanyTwo = {
  name: 'Test Company Two',
  description: 'Test Description Two',
  industry: 'Manufacturing',
};

const testCompanyThree = {
  name: 'Test Company Three',
  description: 'Test Description Three',
  industry: 'Services',
};

const validCompanyInput = {
  company: {
    name: 'Valid Test Company',
    description: 'Valid Test Description',
    industry: 'Services',
  },
};

const invalidCompanyInput = {
  company: {
    name: 'Valid Test Company',
    description: 'Valid Test Description',
    industry: 'XYZ',
  },
};

module.exports = {
  testCompanyOne,
  testCompanyTwo,
  testCompanyThree,
  validCompanyInput,
  invalidCompanyInput,
};
