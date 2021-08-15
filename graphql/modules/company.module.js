const {
  companiesList,
  companyAdd,
  companyUpdate,
  companyDelete,
} = require('../handlers/company.handler');

const typeDefCompany = `
    extend type Query {
        company(_id: ID): [Company]
    }
    extend type Mutation {
        companyAdd(company: CompanyInput!): Company!
        companyUpdate(_id: ID!, company: CompanyInput!): Company!
        companyDelete(_id: ID!): Boolean!
    }
    type Company {
        _id: ID!
        name: String!
        description: String!
        industry: IndustryType!
    }
    input CompanyInput {
        name: String!
        description: String!
        description: String!
        industry: IndustryType!
    }
  `;

const resolversCompany = {
  Query: {
    company: companiesList,
  },
  Mutation: {
    companyAdd,
    companyUpdate,
    companyDelete,
  },
};
module.exports = { typeDefCompany, resolversCompany };
