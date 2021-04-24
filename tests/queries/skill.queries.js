const { gql } = require('apollo-server-express');

const GET_SKILLS = gql`
  query getSkills {
    skill {
      _id
      name
    }
  }
`;

const ADD_SKILL = gql`
  mutation addNewSkill($skill: SkillInput!) {
    skillAdd(skill: $skill) {
      name
      _id
    }
  }
`;

const UPDATE_SKILL = gql`
  mutation updateSkill($_id: ID!, $name: String!) {
    skillUpdate(_id: $_id, name: $name) {
      name
      _id
    }
  }
`;

const DELETE_SKILL = gql`
  mutation deletSkill($_id: ID!) {
    skillDelete(_id: $_id)
  }
`;

module.exports = {
  GET_SKILLS,
  ADD_SKILL,
  UPDATE_SKILL,
  DELETE_SKILL,
};
