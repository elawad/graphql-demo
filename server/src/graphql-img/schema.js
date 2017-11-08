import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = /* GraphQL */`
  # schema data type:
  type Image {
    id: Int!
    name: String!
    url: String!
    likes: Int!
    persons: [Person]
  }

  type Person {
    id: Int!
    name: String!
    image: Image
  }

  # schema query:
  type Query {
    images: [Image]
    image(id: Int!): Image

    persons: [Person]
    person(id: Int!): Person
  }

  # schema mutation:
  type Mutation {
    addImage (name: String!): Image
    upVote (id: Int!): Image
    downVote (id: Int!): Image
  }

  # schema subscription:
  type Subscription {
    voteChanged(id: Int): Image
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
