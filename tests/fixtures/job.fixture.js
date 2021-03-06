const mongoose = require('mongoose');

const companyOneId = mongoose.Types.ObjectId();
const locationOneId = mongoose.Types.ObjectId();
const repOneId = mongoose.Types.ObjectId();
const skillOneId = mongoose.Types.ObjectId();

const mockedCompanyOne = {
  _id: companyOneId,
  name: 'Test Comp Name',
  description: 'Short test description',
  industry: 'Services',
};

const mockedLocationOne = {
  _id: locationOneId,
  cid: companyOneId,
  city: 'TestCity1',
  address: 'Test Address1',
  country: 'Test Country1',
  postcode: 'Test Postcode1',
};

const mockedRepOne = {
  _id: repOneId,
  cid: companyOneId,
  name: 'Test Rep1',
  email: 'test.rep@test.com',
  phone: '+48574498700',
};

const mockedSkillOne = {
  _id: skillOneId,
  name: 'Test skill',
};

const testJobOne = {
  personel: 10,
  location: mockedLocationOne._id,
  title: 'Test Title1',
  rate: 12.3,
  currency: 'PLN',
  description: 'Test description one test.',
  skills: [mockedSkillOne],
  agent: null,
  representative: mockedRepOne._id,
  company: mockedCompanyOne._id,
  start: new Date(),
  end: new Date(),
  status: 'New',
  created: new Date(),
};

const testJobTwo = {
  personel: 20,
  location: mockedLocationOne._id,
  title: 'Test Title2',
  rate: 12.35,
  currency: 'EUR',
  description: 'Test description two test.',
  skills: [mockedSkillOne],
  agent: null,
  representative: mockedRepOne._id,
  company: mockedCompanyOne._id,
  start: new Date(),
  end: new Date(),
  status: 'Ongoing',
  created: new Date(),
};

const validJobInput = {
  job: {
    personel: 100,
    location: mockedLocationOne._id,
    title: 'Test Title Valid',
    rate: 9.35,
    currency: 'GBP',
    description: 'Test description Valid.',
    skills: [mockedSkillOne],
    agent: null,
    representative: mockedRepOne._id,
    company: mockedCompanyOne._id,
    start: new Date(),
    end: new Date(),
    status: 'Negotiation',
    created: new Date(),
  },
};

const invalidJobInput = {
  job: {
    personel: 100,
    location: mockedLocationOne._id,
    title: null,
    rate: 9.35,
    currency: 'GBP',
    description: 'Test description Valid.',
    skills: [mockedSkillOne],
    agent: null,
    representative: mockedRepOne._id,
    company: mockedCompanyOne._id,
    start: new Date(),
    end: new Date(),
    status: 'Negotiation',
    created: new Date(),
  },
};

const changeData = {
  title: 'Zmieniony',
  personel: 20,
  rate: 10.2,
  company: mockedCompanyOne._id,
  representative: mockedRepOne._id,
  location: mockedLocationOne._id,
  currency: 'EUR',
  description: 'Nowy, lepszy opis',
  status: 'Negotiation',
  start: '2021-03-01T00:00:00.000Z',
  end: '2021-09-01T00:00:00.000Z',
  created: '2021-03-12T23:34:03.904Z',
  skills: null,
};

module.exports = {
  mockedCompanyOne,
  mockedLocationOne,
  mockedRepOne,
  mockedSkillOne,
  testJobOne,
  testJobTwo,
  validJobInput,
  invalidJobInput,
  changeData,
};
