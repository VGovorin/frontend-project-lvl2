import diff from './diff.js';
import parser from './parser.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = parser(file1);
  const data2 = parser(file2);
  const formatter = getFormatter(format);
  const data = diff(data1, data2);
  const result = formatter(data);
  return result;
};

export default genDiff;
