const { gql } = require('apollo-server-express');

const GET_REP = gql`
  query getRep($cid: ID, $_id: ID) {
    representative(cid: $cid, _id: $_id) {
      cid
      _id
      email
      phone
      name
    }
  }
`;

const CREATE_REP = gql`
  mutation createRep($representative: RepresentativeInput!) {
    repAdd(representative: $representative) {
      _id
      cid
      name
      phone
      email
    }
  }
`;

const DELETE_REP = gql`
  mutation deleteRep($_id: ID!) {
    representativeDelete(_id: $_id)
  }
`;

const UPDATE_REP = gql`
  mutation repUpdate($_id: ID!, $representative: RepresentativeInput!) {
    representativeUpdate(_id: $_id, representative: $representative) {
      _id
      name
      cid
      email
      phone
    }
  }
`;

module.exports = {
  GET_REP,
  CREATE_REP,
  DELETE_REP,
  UPDATE_REP,
};
