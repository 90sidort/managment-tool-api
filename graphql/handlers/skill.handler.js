const Skill = require('../../model/skill.model');

function skillsList(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    return Skill.find()
      .then((skills) => skills.map((skill) => ({ ...skill._doc })))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

function skillAdd(_, { skill }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const newSkill = new Skill({
      name: skill.name,
    });
    return newSkill
      .save()
      .then((res) => ({ ...res._doc }))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { skillsList, skillAdd };
