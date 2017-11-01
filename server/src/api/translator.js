import get from 'lodash/get';

import { API_URL } from './util';

const FIELD_NAMES = {
  itemId: 'id',
  originalFilename: 'name',
  originalHeight: 'height',
  originalWidth: 'width',
  created: 'createdOn',
  representativeThumbnail: 'url',
  t_season_num: 'likes',
  t_personality: 'personalities',
};

const MULTI_VALUE = ['t_personality'];

const getFields = () => (
  Object.keys(FIELD_NAMES)
);

const translateId = asset => (
  asset.id.replace('VX-', '')
);

const formatFields = (asset) => {
  const id = translateId(asset);
  let url = '';
  if (asset.url) {
    url = asset.url.replace('/API/', '');
    url = `${API_URL}/${url}`;
  }

  return Object.assign({}, asset, { id, url });
};

const translateAsset = (response) => {
  const asset = {
    // default for null fields
    likes: 0,
    personalities: [],
  };

  const fields = get(response, 'metadata.timespan[0].field');
  if (!fields) return response;

  fields.forEach(({ name, value = [] }) => {
    const valueList = value.map(valObj => valObj.value);
    const values = MULTI_VALUE.includes(name) ? valueList : valueList[0];
    const gqlName = FIELD_NAMES[name];
    asset[gqlName] = values;
  });

  return formatFields(asset);
};

const translateRelations = (id, response) => {
  const relations = get(response, 'relation', []);
  const vxId = `VX-${id}`;

  const data = relations
    .filter(r => r.direction.source === vxId)
    .map(r => r.direction.target)
    .map(i => i.replace('VX-', ''));

  return data;
};

export {
  translateId,
  translateAsset,
  translateRelations,
  getFields,
};
