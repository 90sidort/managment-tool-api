const Location = require('../../model/location.model');
const Job = require('../../model/job.model');

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

async function locationsList(_, { cid, _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    if (!_id) {
      const query = cid ? { cid } : {};
      return Location.find(query)
        .then((locations) => locations.map((location) => ({ ...location._doc })))
        .catch((err) => {
          throw err;
        });
    }
    const location = await Location.find({ _id });
    if (!location) throw new Error('Location not found.');
    return location;
  } catch (err) {
    throw new Error(err);
  }
}

async function locationUpdate(_, { _id, location: { city, address, country, postcode } }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const location = await Location.findById(_id);
    if (!location) throw new Error('Location not found.');
    location.city = city;
    location.address = address;
    location.country = country;
    location.postcode = postcode;
    await location.save();
    return location;
  } catch (err) {
    throw new Error(err);
  }
}

async function locationDelete(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const location = await Location.findById(_id);
    if (!location) throw new Error("Couldn't find location.");
    const locationUsed = await Job.exists({ location: _id });
    if (locationUsed === false) await location.remove();
    else return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { locationsList, locationAdd, locationUpdate, locationDelete };
