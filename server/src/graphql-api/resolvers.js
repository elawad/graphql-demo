import DataLoader from 'dataloader';

import {
  fetchIds, fetchAssetById, sendUpVote, sendDnVote
} from '../api';

// Caching
const cache = new DataLoader(ids => (
  Promise.all(ids.map(fetchAssetById))
));
const updateCache = (asset) => {
  const { id } = asset;
  cache.clear(id).prime(id, asset);
  return asset;
};
const loadRelated = async (asset) => {
  const relatedImages = await cache.loadMany(asset.relatedIds);
  return Object.assign({}, asset, { relatedImages });
};

// Resolvers
const resolvers = {
  Query: {
    allImages: (root, { first, skip }) => (
      fetchIds(first, skip)
        .then(ids => cache.loadMany(ids))
        .then(images => images.map(loadRelated))
        // .then(images => images.map(updateCache))
    ),
    image: (root, { id }) => (
      cache.load(id)
        .then(loadRelated)
      // .then(updateCache)
    ),
  },

  Mutation: {
    upVote: (root, { id }) => (
      cache.load(id).then(sendUpVote).then(updateCache)
    ),
    downVote: (root, { id }) => (
      cache.load(id).then(sendDnVote).then(updateCache)
    ),
  },
};

export default resolvers;
