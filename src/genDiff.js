import diff from './diff.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const formatter = getFormatter(format);
  const data = diff(file1, file2);
  const result = formatter(data);
  return result;
};

export default genDiff;
