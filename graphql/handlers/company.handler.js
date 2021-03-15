const Company = require('../../model/company.model');

function companiesList() {
  return Company.find()
    .then((companies) => companies.map((company) => ({ ...company._doc })))
    .catch((err) => {
      throw err;
    });
}
function companyAdd(_, { company }) {
  const newCompany = new Company({
    name: company.name,
  });
  return newCompany
    .save()
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { companiesList, companyAdd };
