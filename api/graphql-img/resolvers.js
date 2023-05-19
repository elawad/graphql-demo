import { PubSub /* , withFilter */ } from 'graphql-subscriptions';

import { getImages, getAuthors, createImage, voteImage } from '../api-img/index.js';

const pubsub = new PubSub();
const Authors = getAuthors();
let Images;

async function init() {
  if (!Images) {
    Images = await getImages();
  }
}

const resolvers = {
  Image: {
    author: i => Authors.find(a => a.id === i.authorId)
  },

  Author: {
    images: async (a) => {
      await init();
      return Images.filter(i => i.authorId === a.id);
    }
  },

  Query: {
    images: async () => {
      await init();
      return Images.sort((a, b) => b.id - a.id);
    },

    image: async (root, { id }) => {
      await init();
      return Images.find(i => i.id === id);
    },

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
