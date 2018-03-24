import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = /* GraphQL */`
  # Image with metadata
  type Image {
    id: Int!
    name: String
    url: String!
    smUrl: String!
    mdUrl: String!
    likes: Int
    author: Author
  }

  # Author of image(s)
  type Author {
    id: Int!
    firstName: String
    lastName: String
    year: Int
    images: [Image]
  }

  # Query Schema
  type Query {
    # List all Images
    images: [Image]
    # Get an Image
    image(id: Int!): Image
    # List all Authors
    authors: [Author]
    # Get an Author
    author(id: Int!): Author
  }

  # Mutation Schema
  type Mutation {
    # Create an image
    addImage (name: String!): Image
    # Like an image
    upVote (id: Int!): Image
    # Dislike an image
    downVote (id: Int!): Image
  }

  # Subscription Schema
  type Subscription {
    # An image's like count was changed
    voteChanged(id: Int): Image
    # An image was added
    imageCreated(id: Int): Image
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
