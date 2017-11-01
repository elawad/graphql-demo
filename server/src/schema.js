import DataLoader from 'dataloader';
import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} from 'graphql';

import { fetchAssets, fetchAssetById } from './api';

// For Caching
const assetLoader = new DataLoader(ids => (
  Promise.all(ids.map(fetchAssetById))
));

const AssetType = new GraphQLObjectType({
  name: 'Asset',
  description: 'An asset with metadata',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    width: { type: new GraphQLNonNull(GraphQLInt) },
    height: { type: new GraphQLNonNull(GraphQLInt) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    // created
    personalities: { type: new GraphQLList(GraphQLString) },
    relatedAssets: {
      type: new GraphQLList(AssetType),
      resolve: asset => asset.relatedIds.map(id => assetLoader.load(id)),
    },
  })
});

const QueryType = new GraphQLObjectType({
  name: 'DemoSchema',
  description: 'Root Query',
  fields: () => ({
    allAssets: {
      type: new GraphQLList(AssetType),
      args: { first: { type: GraphQLInt } },
      resolve: (root, args) => (
        fetchAssets(args.first).then((assets) => {
          assets.map(asset => assetLoader.prime(asset.id, asset));
          return assets;
        })
      ),
    },
    asset: {
      type: AssetType,
      args: { id: { type: GraphQLInt } },
      resolve: (root, args) => assetLoader.load(args.id)
    }
  })
});

// const MutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root Mutation',
//   fields: () => ({}),
// });

// This is the schema declaration
const DemoSchema = new GraphQLSchema({
  query: QueryType,
  // If you need to create or updata a datasource,
  // you use mutations.
  // mutation: MutationType,
});

module.exports = DemoSchema;
