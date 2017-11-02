import DataLoader from 'dataloader';

import {
  fetchIds, fetchAssetById, sendUpVote, sendDnVote
} from '../api';

// Caching
const assetLoader = new DataLoader(ids => (
  Promise.all(ids.map(fetchAssetById))
));

const updateCache = (asset) => {
  const { id } = asset;
  assetLoader.clear(id).prime(id, asset);
  return asset;
};

// Resolvers
const allImages = (root, { first, skip }) => (
  fetchIds(first, skip).then(ids => assetLoader.loadMany(ids))
);

const relatedImages = ({ relatedIds }) => (
  assetLoader.loadMany(relatedIds)
);

const image = (root, { id }) => (
  assetLoader.load(id)
);

const upVote = (roots, { id }) => (
  assetLoader.load(id).then(sendUpVote).then(updateCache)
);

const downVote = (root, { id }) => (
  assetLoader.load(id).then(sendDnVote).then(updateCache)
);

module.exports = {
  allImages,
  relatedImages,
  image,
  upVote,
  downVote,
};
