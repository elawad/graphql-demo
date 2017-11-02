const FIELD_MAP = {
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

const fieldMap = FIELD_MAP;
const fieldMulti = MULTI_VALUE;
const fieldList = Object.keys(FIELD_MAP);

const getSearch = (maxDate) => {
  const date = maxDate || process.env.MAX_DATE || '2017-06-20T15:44:40';

  return {
    field: [{
      name: 'created',
      range: [{ value: [{ minimum: true }, { value: date }] }]
    }, {
      name: 'representativeThumbnail',
      value: [{ value: '*' }]
    }]
  };
};

export {
  fieldMap,
  fieldMulti,
  fieldList,
  getSearch,
};

// const skipN = (skip > 0) ? `first=${skip}` : '';
// ;${skipN}

// const search = { field: [{ name: 'created',
// range: [{ value: [{ minimum: true }, { value: maxDate }] }] }] };

/*
// Deprecated
const fetchAssets = async (take = 10) => {
  const search = { field: [{ name: 'created',
  // range: [{ value: [{ minimum: true }, { value: MAX_DATE }] }] }] };

  const data = await put(`item;number=${take}?${QUERY}`, search);
  const assets = data.item.map(translateAsset);
  const relationCalls = assets.map(asset => fetchRelatedIds(asset));
  return Promise.all(relationCalls);
};
*/
