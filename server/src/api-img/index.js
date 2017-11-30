import axios from 'axios';

const collections = [203782, 261936, 482366, 578066, 885319];
const sizes = ['225x150', '240x160', '255x170', '270x180'];
let allImages = [];
let allAuthors = [];
let nextId = 0;

const fetchUrl = async (id) => {
  const coll = collections[id % collections.length];
  const size = sizes[id % sizes.length];
  const url = `https://source.unsplash.com/collection/${coll}/${size}`;

  const response = await axios.get(url);
  return response.request.res.responseUrl;
};

const getData = (id, name) => ({
  id,
  name: name ? `${name}` : `Image ${id}`,
  likes: Math.floor(Math.random() * 4),
  authorId: (id % 4 === 0) ? null : Math.ceil(Math.random() * 3),
});

const createImage = async (name) => {
  nextId += 1;
  const id = nextId;
  const image = getData(id, name);
  const url = await fetchUrl(id);
  image.url = url;
  allImages[id] = image;

  return image;
};

const getImages = async (num = 12) => {
  if (allImages.length > 0) return allImages;

  const ids = Array(num).fill().map(() => {
    nextId += 1;
    return nextId;
  });

  const imageJobs = ids.map(async (id) => {
    const image = getData(id);
    image.url = await fetchUrl(id);
    return image;
  });

  allImages = await Promise.all(imageJobs);

  return allImages;
};

const getAuthors = () => {
  if (allAuthors.length > 0) return allAuthors;

  allAuthors = [
    { id: 1, firstName: 'J.R.R.', lastName: 'Tolkein', year: 1892 },
    { id: 2, firstName: 'Stephen', lastName: 'King', year: 1947 },
    { id: 3, firstName: 'J.K.', lastName: 'Rowling', year: 1965 }
  ];

  return allAuthors;
};

const voteImage = async (id, vote = +1) => {
  // synthetic delay
  await new Promise(resolve => setTimeout(resolve, 150));

  const index = allImages.findIndex(i => i.id === id);
  const image = allImages[index];
  const likes = image.likes + vote;
  image.likes = (likes > 0) ? likes : 0;
  allImages[index] = image;

  return image;
};

export {
  createImage,
  getImages,
  getAuthors,
  voteImage,
};
