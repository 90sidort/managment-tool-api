const Location = require('../../model/location.model');

function locationsList(_, { cid }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const query = cid ? { cid } : {};
    return Location.find(query)
      .then((locations) => locations.map((location) => ({ ...location._doc })))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

function locationAdd(_, { location }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
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
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { locationsList, locationAdd };
