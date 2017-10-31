import get from 'lodash/get';

const FIELD_NAMES = {
  itemId: 'id',
  originalFilename: 'name',
  originalHeight: 'height',
  originalWidth: 'width',
  created: 'createdOn',

  t_personality: 'personalities',
};

const MULTI_VALUE = [
  't_personality',
];

const getFields = () => (
  Object.keys(FIELD_NAMES)
);

const translateAsset = (response) => {
  const data = { personalities: [] };

  const fields = get(response, 'metadata.timespan[0].field');

  if (!fields) return response;

  fields.forEach(({ name, value = [] }) => {
    const valueList = value.map(valObj => valObj.value);
    const values = MULTI_VALUE.includes(name) ? valueList : valueList[0];
    const gqlName = FIELD_NAMES[name];
    data[gqlName] = values;
  });

  data.id = data.id.replace('VX-', '');

  return data;
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
  translateAsset,
  translateRelations,
  getFields,
};
