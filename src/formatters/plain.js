import _ from 'lodash';

const normalizeType = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return `${data}`;
};

const plain = (data) => {
  const iter = (currentValue, path) => {
    const result = currentValue.flatMap((obj) => {
      const { key } = obj;
      const { value } = obj;
      const { type } = obj;
      const meta = path.length === 0 ? `${key}` : `${path.concat(`.${key}`)}`;
      if (Array.isArray(value)) {
        return iter(value, meta);
      }
      if (type === 'added') {
        return `Property '${meta}' was added with value: ${normalizeType(value)}`;
      }
      if (type === 'deleted') {
        return `Property '${meta}' was removed`;
      }
      if (type === 'modified') {
        return `Property '${meta}' was updated. From ${normalizeType(obj.oldValue)} to ${normalizeType(obj.newValue)}`;
      }
      return [];
    });
    return result
      .filter((el) => el !== undefined)
      .join('\n');
  };
  return iter(data, '');
};

export default plain;
