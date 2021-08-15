const { skillsList, skillAdd, skillUpdate, skillDelete } = require('../handlers/skill.handler');

const typeDefSkill = `
extend type Query {
    skill: [Skill]
}
extend type Mutation {
    skillAdd(skill: SkillInput!): Skill!
    skillUpdate(_id: ID!, name: String!): Skill!
    skillDelete(_id: ID!): Boolean!
}
type Skill {
    _id: ID!
    name: String!
}
input SkillInput {
    name: String!
}
`;

const resolversSkill = {
  Query: {
    skill: skillsList,
  },
  Mutation: {
    skillAdd,
    skillUpdate,
    skillDelete,
  },
};
module.exports = { typeDefSkill, resolversSkill };
