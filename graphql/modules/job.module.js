const { skillsList, skillAdd, skillUpdate, skillDelete } = require('../handlers/skill.handler');
const {
  companiesList,
  companyAdd,
  companyUpdate,
  companyDelete,
} = require('../handlers/company.handler');
const { jobsList, jobAdd, updateJob, jobDelete, jobCount } = require('../handlers/job.handler');
const {
  locationsList,
  locationAdd,
  locationUpdate,
  locationDelete,
} = require('../handlers/location.handler');
const {
  representativeList,
  repAdd,
  representativeUpdate,
  representativeDelete,
} = require('../handlers/representative.handler');
const GraphQLDate = require('../date.scalar');

const typeDefJob = `
    scalar GraphQLDate
    extend type Query {
        job(
            _id: ID,
            currency: String,
            status: String,
            company: ID,
            personMin: Int,
            personMax: Int,
            title: String,
            page: Int = 1,
            records: Int = 5
        ): JobsPagination
        location(cid: ID, _id: ID): [Location]
        representative(cid: ID, _id: ID): [Representative]
        company(_id: ID): [Company]
        skill: [Skill]
        jobCount(status: StatusType): [JobCount!]!
    }
    extend type Mutation {
        jobAdd(job: JobInput!): Job!
        skillAdd(skill: SkillInput!): Skill!
        companyAdd(company: CompanyInput!): Company!
        locationAdd(location: LocationInput!): Location!
        repAdd(representative: RepresentativeInput!): Representative!
        updateJob(_id: ID, changes: JobInput!): Job!
        jobDelete(_id: ID!): Boolean!
        skillUpdate(_id: ID!, name: String!): Skill!
        skillDelete(_id: ID!): Boolean!
        companyUpdate(_id: ID!, company: CompanyInput!): Company!
        companyDelete(_id: ID!): Boolean!
        locationUpdate(_id: ID!, location: LocationInput!): Location!,
        locationDelete(_id: ID!): Boolean!
        representativeUpdate(_id: ID!, representative: RepresentativeInput!): Representative!
        representativeDelete(_id: ID!): Boolean!
    }
    type Job {
        _id: ID!
        personel: Int!
        location: Location!
        title: String!
        rate: Float!
        currency: CurrencyType!
        description: String!
        skills: [Skill]
        agent: Representative
        representative: Representative!
        company: Company!
        start: GraphQLDate!
        end: GraphQLDate!
        status: StatusType!
        created: GraphQLDate!
    }
    input JobInput {
        personel: Int!
        location: String!
        title: String!
        rate: Float!
        currency: CurrencyType!
        description: String!
        skills: [String]
        agent: String
        representative: String!
        company: String!
        start: GraphQLDate!
        end: GraphQLDate!
        created: GraphQLDate!
        status: StatusType = New
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
    type Skill {
        _id: ID!
        name: String!
    }
    input SkillInput {
        name: String!
    }
    type JobCount {
        New: Int
        Assigned: Int
        Negotiation: Int
        Signed: Int
        Ongoing: Int
        Closed: Int
    }
    type JobsPagination {
        jobs: [Job!]!
        pages: Int
        records: Int
    }
    enum StatusType {
        New
        Assigned
        Negotiation
        Signed
        Ongoing
        Closed
    }
    enum CurrencyType {
        GBP
        PLN
        EUR
    }
    enum IndustryType{
        Agriculture
        Manufacturing
        Services
    }
`;

const resolversJob = {
  Query: {
    job: jobsList,
    location: locationsList,
    representative: representativeList,
    skill: skillsList,
    company: companiesList,
    jobCount: jobCount,
  },
  Mutation: {
    jobAdd,
    skillAdd,
    companyAdd,
    locationAdd,
    repAdd,
    updateJob,
    jobDelete,
    skillUpdate,
    skillDelete,
    companyUpdate,
    companyDelete,
    locationUpdate,
    locationDelete,
    representativeUpdate,
    representativeDelete,
  },
  GraphQLDate,
};

module.exports = { typeDefJob, resolversJob };
