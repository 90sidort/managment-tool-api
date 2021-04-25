const mongoose = require('mongoose');

const cidOne = mongoose.Types.ObjectId();
const cidTwo = mongoose.Types.ObjectId();

const testRepOne = {
  cid: cidOne,
  name: 'Vadim Vamoschuck',
  email: 'vadim.vamoschuck@test.com',
  phone: '+48574498700',
};

const testRepTwo = {
  cid: cidOne,
  name: 'Anatoliy Artem',
  email: 'anatoliy.artem@test.com',
  phone: '+48574498701',
};

const testRepThree = {
  cid: cidTwo,
  name: 'Vitaliy Serhiei',
  email: 'vitaliy.serhiei@test.com',
  phone: '+48574498702',
};

const validRepInput = {
  representative: {
    cid: cidOne,
    name: 'Roman Malinowsky',
    email: 'roman.malinowsky@test.com',
    phone: '+48574498703',
  },
};

const invalidRepInput = {
  representative: {
    cid: null,
    name: 'Roman Malinowsky',
    email: 'roman.malinowsky@test.com',
    phone: '+48574498703',
  },
};

module.exports = {
  cidOne,
  cidTwo,
  testRepOne,
  testRepTwo,
  testRepThree,
  validRepInput,
  invalidRepInput,
};
