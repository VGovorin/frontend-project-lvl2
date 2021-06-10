import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff', () => {
  const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(diff(file1, file2)).toEqual(result);
});

test('test yaml format', () => {
  const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  expect(diff(file1, file2)).toEqual(result);
});
