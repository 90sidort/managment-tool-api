const Company = require('../../model/company.model');
const Job = require('../../model/job.model');

async function companyAdd(_, { company }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const newCompany = new Company({
      name: company.name,
      description: company.description,
      industry: company.industry,
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

async function companiesList(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  const query = _id ? { _id } : {};
  try {
    return Company.find(query)
      .then((companies) => companies.map((company) => ({ ...company._doc })))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

async function companyUpdate(_, { _id, company: { name, description, industry } }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const company = await Company.findById(_id);
    company.name = name;
    company.description = description;
    company.industry = industry;
    await company.save();
    return company;
  } catch (err) {
    throw new Error(err);
  }
}

async function companyDelete(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const company = await Company.findById(_id);
    if (!company) throw new Error("Couldn't find company.");
    const companyUsed = await Job.exists({ company: _id });
    if (companyUsed === false) await company.remove();
    else return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { companiesList, companyAdd, companyUpdate, companyDelete };
