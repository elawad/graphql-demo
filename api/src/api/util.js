import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const IP = process.env.VS_IP;
const PORT = process.env.VS_PORT;
const USER = process.env.VS_USER;
const PW = process.env.VS_PASSWORD;

const DEFAULT_OPTIONS = {
  url: `http://${IP}:${PORT}/API`,
  auth: { username: USER, password: PW },
  json: true,
};

const buildOptions = (endpoint = '', method = 'get', data = {}) => {
  const url = `${DEFAULT_OPTIONS.url}/${endpoint}`;
  const options = Object.assign({}, DEFAULT_OPTIONS, { url, method, data });
  return options;
};

const callApi = async (options) => {
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const get = async (url) => {
  const options = buildOptions(url);
  return callApi(options);
};

const put = async (url, payload) => {
  const options = buildOptions(url, 'put', payload);
  return callApi(options);
};

const API_URL = DEFAULT_OPTIONS.url;

export {
  get,
  put,
  API_URL,
};
