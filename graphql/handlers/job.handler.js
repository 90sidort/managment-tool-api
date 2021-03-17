const { UserInputError } = require('apollo-server-express');
const Job = require('../../model/job.model');

function jobsList(_, { id }) {
  const query = id ? { _id: id } : {};
  return Job.find(query)
    .populate('company')
    .populate('representative')
    .populate('location')
    .then((jobs) => jobs.map((job) => ({ ...job._doc })))
    .catch((err) => {
      throw err;
    });
}

function jobValidate(job) {
  const errors = [];
  if (job.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (job.personel < 1) {
    errors.push('Field "personel" cannot be smaller than 1.');
  }
  if (job.rate < 1) {
    errors.push('Field "rate" cannot be smaller than 1.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

function jobAdd(_, { job }) {
  jobValidate(job);
  const newJob = new Job({
    personel: job.personel,
    location: job.location,
    title: job.title,
    rate: job.rate,
    currency: job.currency,
    description: job.description,
    representative: job.representative,
    company: job.company,
    start: job.start,
    end: job.end,
    status: job.status,
    created: job.created,
  });
  return newJob
    .save()
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { jobsList, jobValidate, jobAdd };
