import _ from 'lodash';
import flat from './plain.js';
import stringfy from './stylish.js';
import json from './json.js';

const formatters = {
  plain: flat,
  stylish: stringfy,
  json: json,
};

export default (format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknow format: ${formatters}`);
  }
  return formatters[format];
};
