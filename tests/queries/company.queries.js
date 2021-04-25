const { gql } = require('apollo-server-express');

const UPDATE_COMPANY = gql`
  mutation updateCompany($_id: ID!, $company: CompanyInput!) {
    companyUpdate(_id: $_id, company: $company) {
      _id
      name
      description
      industry
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation deleteCompany($_id: ID!) {
    companyDelete(_id: $_id)
  }
`;

const CREATE_COMPANY = gql`
  mutation addCompany($company: CompanyInput!) {
    companyAdd(company: $company) {
      name
      description
      industry
      _id
    }
  }
`;

const GET_COMPANY = gql`
  query getCompanies($_id: ID) {
    company(_id: $_id) {
      name
      _id
      description
      industry
    }
  }
`;

module.exports = {
  UPDATE_COMPANY,
  DELETE_COMPANY,
  CREATE_COMPANY,
  GET_COMPANY,
};
