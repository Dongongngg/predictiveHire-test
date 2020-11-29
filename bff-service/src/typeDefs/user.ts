import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    greeting2: String!
  }
`;

export default typeDefs;
