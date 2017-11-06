import { PubSub /* , withFilter */ } from 'graphql-subscriptions';

import { createImages, createPersons, createImage } from '../api-img';

const pubsub = new PubSub();
let Images;
let Persons;

(async () => {
  Images = await createImages();
  Persons = await createPersons();
  console.log('\nImages Ready.');
})();

const resolvers = {
  Image: {
    persons: i => Persons.filter(p => p.imageId === i.id)
  },

  Person: {
    image: p => Images.find(i => i.id === p.imageId)
  },

  Query: {
    images: () => Images,
    image: (root, { id }) => Images.find(i => i.id === id),

    persons: () => Persons,
    person: (root, { id }) => Persons.find(p => p.id === id),
  },

  Mutation: {
    addImage: async (root, { name }) => {
      const image = await createImage(name);
      Images.push(image);
      return image;
    },
    upVote: (root, { id }) => {
      const index = Images.findIndex(i => i.id === id);
      const image = Images[index];
      image.likes += 1;
      Images[index] = image;

      pubsub.publish('voteChanged', { voteChanged: image, id: image.id });
      return image;
    },
    downVote: (root, { id }) => {
      const index = Images.findIndex(i => i.id === id);
      const image = Images[index];
      image.likes = (image.likes <= 0) ? 0 : image.likes - 1;
      Images[index] = image;

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
    }
  },
};

export default resolvers;
