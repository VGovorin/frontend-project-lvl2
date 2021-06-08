import { test, expect } from '@jest/globals';
import diff from '../src/diff.js';

test('diff', () => {
  const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  expect(diff('./__tests__/fixture/file1.json', './__tests__/fixture/file2.json')).toEqual(result);
});
