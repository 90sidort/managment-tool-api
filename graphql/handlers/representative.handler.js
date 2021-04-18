const Representative = require('../../model/representative.model');
const Job = require('../../model/job.model');

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

async function representativeUpdate(_, { _id, representative: { name, email, phone } }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const representative = await Representative.findById(_id);
    representative.name = name;
    representative.email = email;
    representative.phone = phone;
    await representative.save();
    return representative;
  } catch (err) {
    throw new Error(err);
  }
}

async function representativeDelete(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const representative = await Representative.findById(_id);
    if (!representative) throw new Error("Couldn't find representative.");
    const repUsed = await Job.exists({ representative: _id });
    if (repUsed === false) await representative.remove();
    else return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { representativeList, repAdd, representativeUpdate, representativeDelete };
