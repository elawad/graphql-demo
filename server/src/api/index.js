import { get, put } from './util';
import { translateId, translateAsset, translateRelations, getFields } from './translator';

const FIELDS = getFields().join();
const QUERY = `content=metadata&field=${FIELDS}`;

const fetchRelatedIds = async (asset) => {
  if (!asset) return null;

  const { id } = asset;
  if (!id) return asset;

  const data = await get(`item/VX-${id}/relation`);
  const relatedIds = translateRelations(id, data);
  return Object.assign({}, asset, { relatedIds });
};

const fetchIds = async (first) => {
  const take = (first > 0) ? first : 10;
  // const skipN = (skip > 0) ? `first=${skip}` : '';
  // ;${skipN}

  const maxDate = '2017-06-20T15:44:40';
  const search = { field: [{ name: 'created', range: [{ value: [{ minimum: true }, { value: maxDate }] }] }] };

  const data = await put(`item;number=${take}`, search);
  return data.item.map(translateId);
};
const fetchAssets = async (take = 10) => {
  const maxDate = '2017-06-20T15:44:40';
  const search = { field: [{ name: 'created', range: [{ value: [{ minimum: true }, { value: maxDate }] }] }] };

  const data = await put(`item;number=${take}?${QUERY}`, search);
  const assets = data.item.map(translateAsset);
  const relationCalls = assets.map(asset => fetchRelatedIds(asset));
  return Promise.all(relationCalls);
};

const fetchAssetById = async (id) => {
  if (!id) return null;

  const data = await get(`item/VX-${id}?${QUERY}`);
  const asset = translateAsset(data);
  return fetchRelatedIds(asset);
};

export {
  fetchIds,
  fetchAssets,
  fetchAssetById,
};
