import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

export default (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = path.extname(filepath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  }
  if (format === '.yaml' || format === '.yml') {
    parse = yaml.load;
  }
  return parse(data);
};
