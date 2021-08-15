const {
  locationsList,
  locationAdd,
  locationUpdate,
  locationDelete,
} = require('../handlers/location.handler');

const typeDefLocation = `
extend type Query {
    location(cid: ID, _id: ID): [Location]
}
extend type Mutation {
    locationAdd(location: LocationInput!): Location!
    locationUpdate(_id: ID!, location: LocationInput!): Location!,
    locationDelete(_id: ID!): Boolean!
}
type Location {
    _id: ID!
    cid: ID!
    city: String!
    address: String!
    country: String!
    postcode: String!
}
input LocationInput {
    cid: ID!
    city: String!
    address: String!
    country: String!
    postcode: String!
}
`;

const resolversLocation = {
  Query: {
    location: locationsList,
  },
  Mutation: {
    locationAdd,
    locationUpdate,
    locationDelete,
  },
};
module.exports = { typeDefLocation, resolversLocation };
