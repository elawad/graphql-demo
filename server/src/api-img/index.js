import axios from 'axios';

const collections = [203782, 261936, 482366, 578066, 885319];
const sizes = ['150x150', '200x200', '250x250', '300x300'];
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
});

const createImage = async (name) => {
  nextId += 1;
  const id = nextId;
  const image = getData(id, name);
  const url = await fetchUrl(id);
  image.url = url;

  return image;
};

let allImages = [];
const createImages = async (num = 12) => {
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

let allPersons = [];
const createPersons = () => {
  if (allPersons.length > 0) return allPersons;

  allPersons = [
    { id: 1, name: 'Person A', imageId: 4 },
    { id: 2, name: 'Person B', imageId: 1 },
    { id: 3, name: 'Person C', imageId: 4 }
  ];

  return allPersons;
};

export {
  createImage,
  createImages,
  createPersons,
};
