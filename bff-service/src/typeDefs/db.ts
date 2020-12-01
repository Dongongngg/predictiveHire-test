import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    test: String!
    test2: String!
    getVacancys: RestResArr
    getVacancy(_id: ID!): RestRes
  }

  type Mutation {
    createVacancy(input: VacancyInput!): RestRes
    updateVacancy(_id: ID!, input: VacancyInput!): RestRes
    deleteVacancy(_id: ID!): RestRes
  }

  input VacancyInput {
    title: String
    description: String
    expiredAt: String
  }

  type Vacancy {
    _id: ID!
    title: String!
    description: String!
    expiredAt: String!
  }
  # returns one document
  type RestRes {
    success: Boolean!
    data: Vacancy
  }
  # returns array document
  type RestResArr {
    success: Boolean!
    data: [Vacancy]
  }
`;

export default typeDefs;
