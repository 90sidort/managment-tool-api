const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');

const GraphQLDate = require('./date.scalar');
const Skill = require('../model/skill.model');
const Comapny = require('../model/company.model');
const Location = require('../model/location.model');
const Representative = require('../model/representative.model');
const Job = require('../model/job.model');

const { jobs } = require('./fixtures/fixtures');

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
  },
  GraphQLDate,
};

function locationsList(_, { cid }) {
  const query = cid ? { cid } : {};
  return Location.find(query)
    .then((locations) => {
      return locations.map((location) => {
        return { ...location._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function companiesList() {
  return Comapny.find()
    .then((companies) => {
      return companies.map((company) => {
        return { ...company._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function skillsList() {
  return Skill.find()
    .then((skills) => {
      return skills.map((skill) => {
        return { ...skill._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function representativeList(_, { cid }) {
  const query = cid ? { cid } : {};
  return Representative.find(query)
    .then((reps) => {
      return reps.map((rep) => {
        return { ...rep._doc };
      });
    })
    .catch((err) => {
      throw err;
    });
}

function jobsList() {
  return Job.find()
    .populate('company')
    .populate('representative')
    .populate('location')
    .then((jobs) => {
      return jobs.map((job) => {
        return { ...job._doc };
      });
    })
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
    .then((res) => {
      return { ...res._doc };
    })
    .catch((err) => {
      throw err;
    });
}

function repAdd(_, { representative }) {
  const newRep = new Representative({
    cid: representative.cid,
    name: representative.name,
    email: representative.email,
    phone: representative.phone,
  });
  return newRep
    .save()
    .then((res) => {
      return { ...res._doc };
    })
    .catch((err) => {
      throw err;
    });
}

function locationAdd(_, { location }) {
  const newLocation = new Location({
    city: location.city,
    cid: location.cid,
    address: location.address,
    country: location.country,
    postcode: location.postcode,
  });
  return newLocation
    .save()
    .then((res) => {
      return { ...res._doc };
    })
    .catch((err) => {
      throw err;
    });
}

function companyAdd(_, { company }) {
  const newCompany = new Comapny({
    name: company.name,
  });
  return newCompany
    .save()
    .then((res) => {
      return { ...res._doc };
    })
    .catch((err) => {
      throw err;
    });
}

function skillAdd(_, { skill }) {
  const newSkill = new Skill({
    name: skill.name,
  });
  return newSkill
    .save()
    .then((res) => {
      return { ...res._doc };
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = resolvers;
