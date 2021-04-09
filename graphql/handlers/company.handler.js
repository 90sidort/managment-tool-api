const Company = require('../../model/company.model');

function companiesList(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    return Company.find()
      .then((companies) => companies.map((company) => ({ ...company._doc })))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

function companyAdd(_, { company }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const newCompany = new Company({
      name: company.name,
    });
    return newCompany
      .save()
      .then((res) => ({ ...res._doc }))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { companiesList, companyAdd };
