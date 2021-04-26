const { gql } = require('apollo-server-express');

const CREATE_LOC = gql`
  mutation createLocation($location: LocationInput!) {
    locationAdd(location: $location) {
      cid
      _id
      city
      address
      country
      postcode
    }
  }
`;

const DELETE_LOC = gql`
  mutation deleteLocation($_id: ID!) {
    locationDelete(_id: $_id)
  }
`;

const UPDATE_LOC = gql`
  mutation updateLocation($_id: ID!, $location: LocationInput!) {
    locationUpdate(_id: $_id, location: $location) {
      country
      address
      postcode
      cid
      city
      _id
    }
  }
`;

const GET_LOC = gql`
  query getLocations($cid: ID, $_id: ID) {
    location(cid: $cid, _id: $_id) {
      cid
      city
      country
      address
      postcode
      _id
    }
  }
`;

module.exports = {
  GET_LOC,
  UPDATE_LOC,
  DELETE_LOC,
  CREATE_LOC,
};
