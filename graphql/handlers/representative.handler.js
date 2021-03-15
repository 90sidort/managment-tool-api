const Representative = require('../../model/representative.model');

function representativeList(_, { cid }) {
  const query = cid ? { cid } : {};
  return Representative.find(query)
    .then((reps) => reps.map((rep) => ({ ...rep._doc })))
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
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { representativeList, repAdd };
