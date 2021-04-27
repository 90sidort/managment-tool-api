const { UserInputError } = require('apollo-server-express');

const Job = require('../../model/job.model');
const cleanObject = require('../../utils/objectQueryClean');

async function jobCount(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const counter = await Job.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    const stats = {};
    counter.forEach((result) => {
      const status = result._id;
      stats[status] = result.count;
    });
    return [stats];
  } catch (err) {
    throw new Error(err);
  }
}

async function jobsList(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const { page, records } = args;
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
    const jobsListing = await Job.find(query)
      .sort({ created: -1 })
      .skip(records * (page - 1))
      .limit(records)
      .populate('company')
      .populate('representative')
      .populate('location')
      .populate('skills')
      .then((jobs) => jobs.map((job) => ({ ...job._doc })))
      .catch((err) => {
        throw err;
      });
    const totalCount = await Job.count(query);
    const pages = Math.ceil(totalCount / records);
    return { jobs: jobsListing, pages, records };
  } catch (err) {
    throw new Error(err);
  }
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

async function jobDelete(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const job = await Job.findById(_id);
    if (job) {
      job.remove();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateJob(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const updates = args.changes;
    jobValidate(updates);
    const job = await Job.findById(args._id);
    if (!job) throw new Error('Job not found!');
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
  } catch (err) {
    throw new Error(err);
  }
}

function jobAdd(_, { job }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
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
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { jobsList, jobValidate, jobAdd, updateJob, jobDelete, jobCount };
