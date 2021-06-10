import _ from 'lodash';
import parser from './parser.js';

const getUnionKeys = (filePath1, filepath2) => {
  const obj1 = parser(filePath1);
  const obj2 = parser(filepath2);
  return _.union(Object.keys(obj1), Object.keys(obj2));
};

const diff = (filePath1, filepath2) => {
  const unionKeys = getUnionKeys(filePath1, filepath2);
  const sortedKeysByAlphabet = _.sortBy(unionKeys);
  const obj1 = parser(filePath1);
  const obj2 = parser(filepath2);
  const data = sortedKeysByAlphabet.reduce((acc, key) => {
    const valueObj1 = obj1[key];
    const valueObj2 = obj2[key];
    const isHaveObj1Value = _.has(obj1, key);
    const isHaveObj2Value = _.has(obj2, key);
    if (isHaveObj1Value && isHaveObj2Value) {
      return valueObj1 === valueObj2 ? acc.concat(`   ${key}: ${valueObj1}\n`)
        : acc.concat(` - ${key}: ${valueObj1}\n + ${key}: ${valueObj2}\n`);
    }
    return isHaveObj1Value ? acc.concat(` - ${key}: ${valueObj1}\n`)
      : acc.concat(` + ${key}: ${valueObj2}\n`);
  }, '');
  return `{\n${data}}`;
};

export default diff;
