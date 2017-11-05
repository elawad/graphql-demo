import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  # schema data type:
  type Image {
    id: Int!
    name: String!
    url: String!
    likes: Int
    personalities: [String]
    relatedIds: [Int]
    relatedImages: [Image]
  }

  # schema query:
  type Query {
    allImages(first: Int, skip: Int): [Image]
    image(id: Int!): Image
  }

  # schema mutation:
  type Mutation {
    upVote (id: Int!): Image
    downVote (id: Int!): Image
  }

  # schema subscription:
  #type Subscription {
  #  voteChanged: Image
  #}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
