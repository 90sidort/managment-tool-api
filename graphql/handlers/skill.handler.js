const Skill = require('../../model/skill.model');

function skillsList() {
  return Skill.find()
    .then((skills) => skills.map((skill) => ({ ...skill._doc })))
    .catch((err) => {
      throw err;
    });
}

function skillAdd(_, { skill }) {
  const newSkill = new Skill({
    name: skill.name,
  });
  return newSkill
    .save()
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { skillsList, skillAdd };
