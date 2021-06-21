import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

export default (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = path.extname(filepath);
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
