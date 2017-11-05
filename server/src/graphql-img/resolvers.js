import { createImages, createPersons, createImage } from '../api-img';

let Images = createImages();
const Persons = createPersons();

const resolvers = {
  Image: {
    persons: image => Persons.filter(p => p.imageId === image.id),
  },
  Person: {
    image: person => Images.find(i => i.id === person.imageId),
  },

  Query: {
    images: async () => {
      Images = await createImages();
      return Images;
    },
    image: async (root, { id }) => {
      Images = await createImages();
      return Images.find(i => i.id === id);
    },

    persons: () => Persons,
    person: (root, { id }) => Persons.find(p => p.id === id),
  },

  Mutation: {
    addImage: async (root, { name }) => {
      const image = await createImage(name);
      await Images.push(image);
      return image;
    },
    upVote: (root, { id }) => {
      const index = Images.findIndex(i => i.id === id);
      const image = Images[index];
      image.likes += 1;
      Images[index] = image;
      return image;
    },
    downVote: (root, { id }) => {
      const index = Images.findIndex(i => i.id === id);
      const image = Images[index];
      image.likes = (image.likes <= 0) ? 0 : image.likes - 1;
      Images[index] = image;
      return image;
    },
  },
};

export default resolvers;
