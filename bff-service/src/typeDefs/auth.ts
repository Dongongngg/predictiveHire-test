import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Mutation {
    login(input: LoginInput!): AuthRes
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type AuthRes {
    success: Boolean!
    data: Profile
  }
  type Profile {
    _id: ID
    username: String
    name: String
    companyId: ID
    roles: [String]
    token: String
  }
`;

export default typeDefs;
