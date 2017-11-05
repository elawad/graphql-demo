import get from 'lodash.get';

import { API_URL } from './util';
import { fieldMap, fieldMulti } from './data';

const translateVxId = id => parseInt(id.replace('VX-', ''), 10);
const translateId = asset => translateVxId(asset.id);

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
    const values = fieldMulti.includes(name) ? valueList : valueList[0];
    const gqlName = fieldMap[name];
    asset[gqlName] = values;
  });

  return formatFields(asset);
};

const translateRelations = (id, response) => {
  const relations = get(response, 'relation');
  if (!relations) return [];

  const vxId = `VX-${id}`;

  const combinedIds = relations.reduce((ids, relation) => {
    const { source, target } = relation.direction;

    if (vxId === source) ids.push(target);
    else if (vxId === target) ids.push(source);

    return ids;
  }, []);

  return combinedIds.map(translateVxId);
};

export {
  translateId,
  translateAsset,
  translateRelations,
};
