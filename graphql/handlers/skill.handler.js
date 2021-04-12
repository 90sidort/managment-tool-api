const Skill = require('../../model/skill.model');
const Job = require('../../model/job.model');

async function skillAdd(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const newSkill = new Skill({
      name: args.skill.name,
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

async function skillsList(_, args, context) {
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

async function skillUpdate(_, { _id, name }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const skill = await Skill.findById(_id);
    if (!skill) throw new Error(`Unable to find this skill`);
    skill.name = name;
    await skill.save();
    return skill;
  } catch (err) {
    throw new Error(err);
  }
}

async function skillDelete(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const skill = await Skill.findById(_id);
    if (!skill) throw new Error(`Unable to find this skill`);
    const skillUsed = await Job.exists({ skills: _id });
    if (skillUsed === false) await skill.remove();
    else return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { skillsList, skillAdd, skillUpdate, skillDelete };
