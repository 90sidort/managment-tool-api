const { jobsList, jobAdd, updateJob, jobDelete, jobCount } = require('../handlers/job.handler');

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
        jobCount(status: StatusType): [JobCount!]!
    }
    extend type Mutation {
        jobAdd(job: JobInput!): Job!
        updateJob(_id: ID, changes: JobInput!): Job!
        jobDelete(_id: ID!): Boolean!
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
    jobCount: jobCount,
  },
  Mutation: {
    jobAdd,
    updateJob,
    jobDelete,
  },
  GraphQLDate,
};

module.exports = { typeDefJob, resolversJob };
