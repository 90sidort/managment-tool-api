const {
  representativeList,
  repAdd,
  representativeUpdate,
  representativeDelete,
} = require('../handlers/representative.handler');

const typeDefRepresentative = `
  extend type Query {
    representative(cid: ID, _id: ID): [Representative]
  }
  extend type Mutation {
    repAdd(representative: RepresentativeInput!): Representative!
    representativeUpdate(_id: ID!, representative: RepresentativeInput!): Representative!
    representativeDelete(_id: ID!): Boolean!
  }
  type Representative {
    _id: ID!
    cid: ID!
    name: String!
    email: String!
    phone: String!
}
input RepresentativeInput {
    cid: ID!
    name: String!
    email: String!
    phone: String!
}
`;

const resolversRepresentative = {
  Query: {
    representative: representativeList,
  },
  Mutation: {
    repAdd,
    representativeUpdate,
    representativeDelete,
  },
};
module.exports = { typeDefRepresentative, resolversRepresentative };
