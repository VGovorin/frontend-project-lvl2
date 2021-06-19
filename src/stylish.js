import _ from 'lodash';

const types = {
  unchanged: ' ', deleted: '-', modified: '+', added: '+',
};

const bypassObject = (obj, replacer = ' ', spacesCount = 4, currentDepth = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return currentValue.toString();
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const braketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${braketIndent}}`,
    ].join('\n');
  };
  return iter(obj, currentDepth);
};

const stringify = (data) => {
  const iter = (currentValue, depth) => {
    const space = ' ';
    const spacesCount = 4;
    const lines = currentValue.map((obj) => {
      const indentSize = depth * spacesCount;
      const { key } = obj;
      const value = _.isPlainObject(obj.value)
        ? bypassObject(obj.value, space, spacesCount, depth + 1) : obj.value;
      const { type } = obj;
      const meta = `${types[type]} `;
      const indent = meta.padStart(indentSize);
      if (Array.isArray(value)) {
        return `${indent}${key}: ${iter(value, depth + 1)}`;
      }
      if (type === 'added') {
        return `${indent}${key}: ${value}`;
      }
      if (type === 'deleted') {
        return `${indent}${key}: ${value}`;
      }
      if (type === 'unchanged') {
        return `${indent}${key}: ${value}`;
      }
      const oldValue = _.isPlainObject(obj.oldValue)
        ? bypassObject(obj.oldValue, space, spacesCount, depth + 1) : obj.oldValue;
      const newValue = _.isPlainObject(obj.newValue)
        ? bypassObject(obj.newValue, space, spacesCount, depth + 1) : obj.newValue;
      const metaOldValue = '- ';
      const metaNewValue = '+ ';
      const indentOldValue = metaOldValue.padStart(indentSize);
      const indentNewValue = metaNewValue.padStart(indentSize);
      return `${indentOldValue}${key}: ${oldValue}\n${indentNewValue}${key}: ${newValue}`;
    });
    const indentBraket = depth * spacesCount - spacesCount;
    return [
      '{',
      ...lines,
      `${space.repeat(indentBraket)}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default stringify;
