const { UserInputError } = require('apollo-server-express');

const Job = require('../../model/job.model');
const cleanObject = require('../../utils/objectQueryClean');

async function jobsList(_, args) {
  const query = await cleanObject(args);
  if (query.personMin || query.personMax) {
    query.personel = {};
    if (query.personMin) query.personel.$gte = query.personMin;
    if (query.personMax) query.personel.$lte = query.personMax;
    delete query.personMin;
    delete query.personMax;
  }
  if (query.title) {
    const text = query.title;
    // eslint-disable-next-line prettier/prettier
    query.title = { "$regex": text, "$options": 'i' };
  }
  return Job.find(query)
    .populate('company')
    .populate('representative')
    .populate('location')
    .populate('skills')
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

async function jobDelete(_, { _id }) {
  const job = await Job.findById(_id);
  if (job) {
    job.remove();
    return true;
  }
  return false;
}

async function updateJob(_, args) {
  const updates = args.changes;
  jobValidate(updates);
  const job = await Job.findById(args._id);
  job.company = updates.company;
  job.representative = updates.representative;
  job.location = updates.location;
  job.title = updates.title;
  job.personel = updates.personel;
  job.rate = updates.rate;
  job.currency = updates.currency;
  job.description = updates.description;
  job.skills = updates.skills;
  job.status = updates.status;
  job.start = updates.start;
  job.end = updates.end;
  await job.save();
  return job;
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

module.exports = { jobsList, jobValidate, jobAdd, updateJob, jobDelete };
