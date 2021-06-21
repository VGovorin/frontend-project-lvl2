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
      let line;
      if (Array.isArray(value)) {
        line = iter(value, meta);
      }
      if (type === 'added') {
        line = `Property '${meta}' was added with value: ${normalizeType(value)}`;
      }
      if (type === 'deleted') {
        line = `Property '${meta}' was removed`;
      }
      if (type === 'modified') {
        line = `Property '${meta}' was updated. From ${normalizeType(obj.oldValue)} to ${normalizeType(obj.newValue)}`;
      }
      return line;
    });
    return result
      .filter((el) => el !== undefined)
      .join('\n');
  };
  return iter(data, '');
};

export default plain;
