const { gql } = require('apollo-server-express');

const GET_JOB = gql`
  query getJob(
    $_id: ID
    $title: String
    $currency: String
    $status: String
    $company: ID
    $personMin: Int
    $personMax: Int
    $page: Int
    $records: Int
  ) {
    job(
      _id: $_id
      title: $title
      currency: $currency
      status: $status
      company: $company
      personMin: $personMin
      personMax: $personMax
      page: $page
      records: $records
    ) {
      jobs {
        _id
        personel
        rate
        currency
        description
        skills {
          name
        }
        agent {
          name
        }
        representative {
          name
          _id
          cid
          email
          phone
        }
        location {
          country
          address
          postcode
          city
          cid
          _id
        }
        title
        company {
          name
        }
        status
        start
        end
        created
      }
      pages
      records
    }
  }
`;

const GET_SINGLE_JOB = gql`
  query getJob($_id: ID) {
    job(_id: $_id) {
      jobs {
        _id
        personel
        rate
        currency
        description
        skills {
          _id
          name
        }
        agent {
          name
          _id
          cid
          email
          phone
        }
        representative {
          name
          _id
          cid
          email
          phone
        }
        location {
          country
          address
          postcode
          city
          cid
          _id
        }
        title
        company {
          _id
          name
        }
        status
        start
        end
        created
      }
    }
  }
`;

const CREATE_JOB = gql`
  mutation addNewJob($job: JobInput!) {
    jobAdd(job: $job) {
      title
      _id
    }
  }
`;

const DELETE_JOB = gql`
  mutation deleteJob($_id: ID!) {
    jobDelete(_id: $_id)
  }
`;

const UPDATE_JOB = gql`
  mutation updateJob($_id: ID, $changes: JobInput!) {
    updateJob(_id: $_id, changes: $changes) {
      title
      rate
      currency
    }
  }
`;
module.exports = {
  GET_JOB,
  GET_SINGLE_JOB,
  DELETE_JOB,
  CREATE_JOB,
  UPDATE_JOB,
};
