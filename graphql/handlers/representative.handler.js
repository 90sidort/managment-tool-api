const Representative = require('../../model/representative.model');

function representativeList(_, { cid }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const query = cid ? { cid } : {};
    return Representative.find(query)
      .then((reps) => reps.map((rep) => ({ ...rep._doc })))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

function repAdd(_, { representative }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const newRep = new Representative({
      cid: representative.cid,
      name: representative.name,
      email: representative.email,
      phone: representative.phone,
    });
    return newRep
      .save()
      .then((res) => ({ ...res._doc }))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { representativeList, repAdd };
