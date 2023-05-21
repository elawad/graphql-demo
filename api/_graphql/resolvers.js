import { PubSub /* , withFilter */ } from 'graphql-subscriptions';

import {
  images, imageById, imagesByAuthor, authors, authorById,
  imageCreate, imageVote,
} from './images.js';

const pubsub = new PubSub();

const resolvers = {
  Image: {
    author: (i) => authorById(i.authorId),
  },

  Author: {
    images: (a) => imagesByAuthor(a.id),
  },

  Query: {
    images: () => images(),
    image: (root, { id }) => imageById(id),
    authors: () => authors(),
    author: (root, { id }) => authorById(id),
  },

  Mutation: {
    addImage: async (root, { name }) => {
      const image = await imageCreate(name);
      pubsub.publish('imageCreated', { imageCreated: image, id: image.id });
      return image;
    },
    upVote: (root, { id }) => {
      const image = imageVote(id, +1);
      pubsub.publish('voteChanged', { voteChanged: image, id: image.id });
      return image;
    },
    downVote: (root, { id }) => {
      const image = imageVote(id, -1);
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
    },
  },
};

export default resolvers;
