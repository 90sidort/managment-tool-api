const Location = require('../../model/location.model');

function locationsList(_, { cid }) {
  const query = cid ? { cid } : {};
  return Location.find(query)
    .then((locations) => locations.map((location) => ({ ...location._doc })))
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
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { locationsList, locationAdd };
