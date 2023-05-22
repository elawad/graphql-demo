import axios from 'axios';
import { Authors, Collections, Sizes } from './data.js';

const IMG_API = 'https://source.unsplash.com/collection';
const IMAGES = [];

// Query
const images = () => init;
const imageById = (id) => IMAGES.find((i) => i.id === id);
const imagesByAuthor = (id) => IMAGES.filter((i) => i.authorId === id);

const authors = () => Authors;
const authorById = (id) => Authors.find((a) => a.id === id);

// Mutation
function imageVote(id, vote = +1) {
  const image = imageById(id);
  image.likes = Math.max(0, image.likes + vote);

  const index = IMAGES.findIndex((i) => i.id === id);
  IMAGES[index] = image;
  return image;
}

async function imageCreate(name) {
  const id = getId();
  const data = getData(id, name);
  const urls = await fetchUrl(id).catch(console.log);
  if (!urls) return;

  const image = { ...data, ...urls };
  IMAGES.unshift(image);
  return image;
}

// Setup
const getData = (id, name) => ({
  id,
  name: name || `Image ${id}`,
  likes: Math.floor(Math.random() * 4), // 0-3
  authorId: id % 4 === 0 ? null : Math.ceil(Math.random() * 3), // 1-3
});

function randomFilters(id) {
  const coll = Collections[id % Collections.length];
  const size = Sizes[id % Sizes.length];
  return { coll, size };
}

async function fetchUrl(id) {
  const { coll, size } = randomFilters(id);
  const response = await axios.get(`${IMG_API}/${coll}/${size}`);
  const urlSm = response.request.res.responseUrl;
  const urlMd = urlSm
    .replace(/fit=(\w+)/, 'fit=max')
    .replace(/w=(\d+)/, 'w=800')
    .replace(/h=(\d+)/, '');
  return { urlSm, urlMd };
}

const wait = (i) => new Promise((r) => setTimeout(r, i * 100));

const getId = (() => {
  let nextId = 0;
  return () => ++nextId;
})();

// Load initial images
const init = (async () => {
  const idx = [...Array(12).keys()];
  const calls = idx.map((i) => wait(i).then(imageCreate));
  await Promise.all(calls);
  return IMAGES.sort((a, b) => b.id - a.id);
})();

export {
  images, imageById, imagesByAuthor, authors, authorById,
  imageVote, imageCreate,
};
