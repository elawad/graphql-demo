import { get, put } from './util';
import { translateAsset, translateRelations, getFields } from './translator';

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

const fetchAssets = async (first = 10) => {
  const data = await put(`item;number=${first}?${QUERY}`);
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
  fetchAssets,
  fetchAssetById,
};
