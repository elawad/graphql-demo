import axios from 'axios';
import { Authors, Collections, Sizes } from './data';

const API_URL = 'https://source.unsplash.com/collection';
let allImages = [];
let allAuthors = [];
let nextId = 0;

const delay = (t = 250) => (
  new Promise(resolve => setTimeout(resolve, t))
);

const parseUrls = (url) => {
  const n = url.indexOf('?');
  const baseUrl = url.substring(0, n);

  const regExp = /w=(\d+)&h=(\d+)&fit=(\w+)/;
  const smParam = url.match(regExp)[0];
  const smUrl = `${baseUrl}?${smParam}`;

  const mdParam = 'w=800&fit=max';
  const mdUrl = `${baseUrl}?${mdParam}`;

  return { url, smUrl, mdUrl };
};

const fetchUrl = async (id) => {
  const coll = Collections[id % Collections.length];
  const size = Sizes[id % Sizes.length];

  const response = await axios.get(`${API_URL}/${coll}/${size}`);
  const url = response.request.res.responseUrl;
  const urls = parseUrls(url);

  return urls;
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

  const imgData = getData(id, name);
  const urls = await fetchUrl(id);

  const image = Object.assign({}, imgData, urls);
  allImages.unshift(image);

  return image;
};

const getImages = async (num = 12) => {
  if (allImages.length > 0) return allImages;

  const ids = Array(num).fill().map(() => {
    nextId += 1;

    return nextId;
  });

  const imageJobs = ids.map(async (id) => {
    await delay(id * 100);

    const imgData = getData(id);
    let urls = {};

    try {
      urls = await fetchUrl(id);
    } catch (e) {
      console.error(e.message);
      return null;
    }

    const image = Object.assign({}, imgData, urls);

    return image;
  });

  allImages = await Promise.all(imageJobs).then(images => images.filter(i => i));

  return allImages;
};

const getAuthors = () => {
  if (allAuthors.length > 0) return allAuthors;

  allAuthors = [...Authors];

  return allAuthors;
};

const voteImage = async (id, vote = +1) => {
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
