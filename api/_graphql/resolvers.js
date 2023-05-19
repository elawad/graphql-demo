import { PubSub /* , withFilter */ } from 'graphql-subscriptions';

import { getImages, getAuthors, createImage, voteImage } from './images.js';

const pubsub = new PubSub();
const Authors = getAuthors();
let Images = getImages();

async function init() {
  if (Array.isArray(Images)) return;
  Images = await Promise.resolve(Images);
};

init();

const resolvers = {
  Image: {
    author: i => Authors.find(a => a.id === i.authorId)
  },

  Author: {
    images: a => Images.filter(i => i.authorId === a.id)
  },

  Query: {
    images: async () => {
      await init();
      return Images.sort((a, b) => b.id - a.id);
    },
    image: (root, { id }) => Images.find(i => i.id === id),

    authors: () => Authors,
    author: (root, { id }) => Authors.find(a => a.id === id),
  },

  Mutation: {
    addImage: async (root, { name }) => {
      const image = await createImage(name);
      pubsub.publish('imageCreated', { imageCreated: image, id: image.id });
      return image;
    },
    upVote: async (root, { id }) => {
      const image = await voteImage(id, +1);
      pubsub.publish('voteChanged', { voteChanged: image, id: image.id });
      return image;
    },
    downVote: async (root, { id }) => {
      const image = await voteImage(id, -1);
      pubsub.publish('voteChanged', { voteChanged: image, id: image.id });
      return image;
    },
  },

  Subscription: {
    voteChanged: {
      subscribe: () => pubsub.asyncIterator('voteChanged'),
      // To Filter by id:
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator('voteChanged'),
      //   (payload, variables) => {
      //     if (!variables.id) return true;
      //     return (payload.id === variables.id);
      //   }
      // ),
    },
    imageCreated: {
      subscribe: () => pubsub.asyncIterator('imageCreated'),
    }
  },
};

export default resolvers;
