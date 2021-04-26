const mongoose = require('mongoose');

const cidOne = mongoose.Types.ObjectId();
const cidTwo = mongoose.Types.ObjectId();

const testLocOne = {
  cid: cidOne,
  city: 'TestCity1',
  address: 'Test Address1',
  country: 'Test Country1',
  postcode: 'Test Postcode1',
};

const testLocTwo = {
  cid: cidOne,
  city: 'TestCity2',
  address: 'Test Address2',
  country: 'Test Country2',
  postcode: 'Test Postcode2',
};

const testLocThree = {
  cid: cidTwo,
  city: 'TestCity3',
  address: 'Test Address3',
  country: 'Test Country3',
  postcode: 'Test Postcode3',
};

module.exports = {
  testLocOne,
  testLocTwo,
  testLocThree,
  cidOne,
  cidTwo,
};
