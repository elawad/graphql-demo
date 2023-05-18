import {
  GraphQLInt, GraphQLString, GraphQLList,
  GraphQLObjectType, GraphQLNonNull, GraphQLSchema,
} from 'graphql';

import {
  allImages, image, relatedImages, upVote, downVote
} from './resolvers';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  description: 'Image with metadata',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    width: { type: new GraphQLNonNull(GraphQLInt) },
    height: { type: new GraphQLNonNull(GraphQLInt) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    personalities: { type: new GraphQLList(GraphQLString) },
    relatedImages: {
      type: new GraphQLList(ImageType),
      resolve: relatedImages
    },
  })
});

const QueryType = new GraphQLObjectType({
  name: 'ImageQuery',
  description: 'Root Query',
  fields: () => ({
    allImages: {
      type: new GraphQLList(ImageType),
      args: {
        first: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: allImages
    },
    image: {
      type: ImageType,
      args: { id: { type: GraphQLInt } },
      resolve: image
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'ImageMutation',
  description: 'Root Mutation',
  fields: () => ({
    upVote: {
      type: ImageType,
      args: { id: { type: GraphQLInt } },
      resolve: upVote
    },
    downVote: {
      type: ImageType,
      args: { id: { type: GraphQLInt } },
      resolve: downVote
    },
  }),
});

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default Schema;
