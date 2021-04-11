const Location = require('../../model/location.model');

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

async function locationUpdate(_, { _id, location: { city, address, country, postcode } }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const location = await Location.findById(_id);
    console.log(location);
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
    await location.remove();
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { locationsList, locationAdd, locationUpdate, locationDelete };
