const Representative = require('../../model/representative.model');

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

function representativeUpdate(_, { cid, name, email, phone }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const representative = Representative.find({ cid });
    representative.name = name;
    representative.email = email;
    representative.phone = phone;
    representative.save();
    return representative;
  } catch (err) {
    throw new Error(err);
  }
}

function representativeDelete(_, { cid }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const representative = Representative.find({ cid });
    if (!representative) throw new Error("Couldn't find representative.");
    representative.remove();
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { representativeList, repAdd, representativeUpdate, representativeDelete };
