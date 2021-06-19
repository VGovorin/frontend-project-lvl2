import _ from 'lodash';

const getUnionKeys = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2));

const diff = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const sortedKeys = _.sortBy(unionKeys);
  const result = sortedKeys.map((key) => {
    const valueObj1 = data1[key];
    const valueObj2 = data2[key];
    const isHaveObj1Value = _.has(data1, key);
    const isHaveObj2Value = _.has(data2, key);
    if (_.isPlainObject(valueObj1) && _.isPlainObject(valueObj2)) {
      return {
        key,
        value: diff(valueObj1, valueObj2),
        type: 'unchanged',
      };
    }
    if (valueObj1 === valueObj2) {
      return {
        key,
        value: valueObj1,
        type: 'unchanged',
      };
    }
    if (isHaveObj1Value && !isHaveObj2Value) {
      return {
        key,
        value: valueObj1,
        type: 'deleted',
      };
    }
    if (!isHaveObj1Value && isHaveObj2Value) {
      return {
        key,
        value: valueObj2,
        type: 'added',
      };
    }
    return {
      key,
      oldValue: valueObj1,
      newValue: valueObj2,
      type: 'modified',
    };
  });
  return result;
};

export default diff;
