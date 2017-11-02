import { fieldList, getSearch, getMetaUpdate } from './data';
import { get, put } from './util';
import { translateId, translateAsset, translateRelations
} from './translator';

const FIELDS = fieldList.join();
const QUERY = `content=metadata&field=${FIELDS}`;

const fetchRelatedIds = async (asset) => {
  if (!asset) return null;

  const { id } = asset;
  if (!id) return asset;

  const data = await get(`item/VX-${id}/relation`);
  const relatedIds = translateRelations(id, data);

  return Object.assign({}, asset, { relatedIds });
};

const fetchIds = async (first, skip) => {
  const take = (first > 0) ? first : 10;
  const skipA = (skip > 0) ? `first=${skip}` : '';
  const search = getSearch();
  const data = await put(`item;number=${take};${skipA}`, search);

  return data.item.map(translateId);
};

const fetchAssetById = async (id) => {
  if (!id) return null;

  const data = await get(`item/VX-${id}?${QUERY}`);
  const asset = translateAsset(data);

  return fetchRelatedIds(asset);
};

const sendVote = async (asset, num) => {
  const { id, likes } = asset;
  const metadata = getMetaUpdate(likes, num);

  const data = await put(`item/VX-${id}/metadata`, metadata);
  return translateAsset(data.item[0]);
};

const sendUpVote = async asset => sendVote(asset, +1);
const sendDnVote = asset => sendVote(asset, -1);

export {
  fetchIds,
  fetchAssetById,
  sendUpVote,
  sendDnVote,
};
